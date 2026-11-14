# amilink

[![npm](https://img.shields.io/npm/v/amilink.svg)](https://www.npmjs.com/package/amilink)
[![CI](https://github.com/aryanhimself/amilink/actions/workflows/ci.yml/badge.svg)](https://github.com/aryanhimself/amilink/actions/workflows/ci.yml)
[![licence: MIT](https://img.shields.io/badge/licence-MIT-blue.svg)](LICENSE)

A dependable, fully typed client for the Asterisk Manager Interface (AMI), for Node.js.

- **Fully typed.** All 245 events and 171 actions of Asterisk 20, 22, 23 and 24, generated from Asterisk's own source. Your editor completes event names, action names, parameters and known values.
- **Stays connected.** Reconnects with growing waits, notices a silent dead link within seconds, and never leaves an action waiting for ever.
- **Reads AMI correctly.** Repeated headers, values with colons, characters split across packets, old and new command output, and messages of any chunking.
- **Zero runtime dependencies.** Node.js 18 or later. ESM and CommonJS.

```bash
npm install amilink
```

**Documentation:** [API reference](docs/API.md) · [Design and research](docs/DESIGN.md) · [Examples](examples) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

## Quick start

```ts
import { AmiClient } from 'amilink';

const ami = new AmiClient({ host: '127.0.0.1', username: 'admin', secret: 'secret' });

ami.on('error', (error) => console.error(error.message));
ami.on('disconnect', () => console.log('link lost, reconnecting'));
ami.on('ready', ({ amiVersion }) => console.log(`connected, AMI ${amiVersion}`));

await ami.connect();

// Events: the name is completed, and `event.fields` is typed for that event.
ami.onEvent('QueueMemberPause', (event) => {
  console.log(event.fields.Interface, event.fields.Paused === '1' ? 'paused' : 'available');
});

// Actions: the name and its parameters are completed and checked.
await ami.action({ Action: 'QueuePause', Interface: 'PJSIP/101', Paused: true, Reason: 'lunch' });

// A list reply comes back whole.
const { events } = await ami.list({ Action: 'QueueStatus', Queue: 'support' });

// Console commands return their output as lines.
const lines = await ami.command('core show uptime');

await ami.close();
```

## Events

Three ways to receive events. All keep the order Asterisk sent them in.

```ts
// 1. One event by name, typed.
const off = ami.onEvent('Hangup', (event) => console.log(event.fields.Channel, event.fields.Cause));
off(); // stop listening

// 2. Every event, or a pattern, or a test of your own.
ami.onEvent('*', (event) => {
  if (event.is('Newchannel')) console.log(event.fields.Uniqueid); // typed inside the if
});
ami.onEvent(/^Queue/, (event) => console.log(event.event));
ami.onEvent((event) => event.get('Queue') === 'support', (event) => console.log(event.event));

// 3. A stream, for work that takes time. One event at a time, in order.
for await (const event of ami.events('AgentConnect')) {
  await saveToDatabase(event.fields);
}
```

Use the stream when a handler awaits something. Plain handlers are called one after another, but an `async` handler returns at its first `await`, so two of them can overlap and finish out of order. The stream waits for each step. If the consumer falls more than `maxQueue` events behind (default 10 000), the stream ends with `AmiOverflowError`, so falling behind is seen and not silent.

A message gives you its headers several ways:

| | |
|---|---|
| `event.fields.Channel` | By name, typed. First value when a header repeats. |
| `event.get('channel')` | By name, any case. `undefined` when absent. |
| `event.getAll('Output')` | Every value of a repeated header, in order. |
| `event.variables()` | `Variable` and `ChanVariable(...)` headers as one object. |
| `event.headers` | The ordered list of `[name, value]` pairs, exactly as sent. |

All values are strings, as Asterisk sends them. Nothing is converted to numbers or booleans.

Events not in the catalogue (a custom module, a newer Asterisk, your own `UserEvent`) work the same way with any name: `ami.onEvent('MyEvent', ...)`.

## Actions

```ts
// Rejects with AmiActionError when Asterisk answers "Response: Error".
try {
  await ami.action({ Action: 'QueueAdd', Queue: 'support', Interface: 'PJSIP/101' });
} catch (error) {
  if (error instanceof AmiActionError) console.log(error.response.get('Message'));
}

// A longer wait for one action.
await ami.action({ Action: 'Originate', Channel: 'PJSIP/101', Exten: '200', Context: 'internal', Priority: 1 }, { timeoutMs: 45_000 });

// Channel variables as an object; a repeated header as an array.
await ami.action({
  Action: 'Originate',
  Channel: 'PJSIP/101',
  Application: 'Playback',
  Data: 'hello-world',
  Async: 'true',
  Variable: { CAMPAIGN: '42', LANG: 'ne' },
});

// An async Originate answers twice. Ask for the event that ends it.
const { complete } = await ami.list(
  { Action: 'Originate', Channel: 'PJSIP/101', Application: 'Echo', Async: 'true' },
  { completeEvent: 'OriginateResponse', timeoutMs: 45_000 },
);
console.log(complete?.get('Response'));

// Anything not in the catalogue.
await ami.rawAction({ Action: 'MyModuleAction', Anything: 'goes' });
```

The client sets the `ActionID` itself and matches every answer by it, so any number of actions can be in flight together.

## Staying connected

| What happens | What the client does |
|---|---|
| The server closes the link, or the network drops | Emits `disconnect`, rejects waiting actions at once, reconnects with waits growing from 0.5 s to 30 s, emits `ready` again. Listeners and streams are kept. |
| The link goes silent without closing | After 15 s of silence it sends a `Ping`. No answer in 5 s: the link is dropped and reconnected. |
| The login is refused | Stops with `AmiAuthError`. A wrong secret is not retried for ever. |
| Asterisk does not answer an action | The action rejects with `AmiTimeoutError` after 10 s (configurable). |
| The server sends something that is not AMI, or a message over 8 MiB | The link is dropped and reconnected; the error is emitted. |
| A handler throws | The error is emitted as `error`. Other handlers and the connection carry on. |
| No `error` listener is attached | Nothing is thrown. The process is never taken down by an unhandled `error`. |

Actions are not queued while disconnected and are never re-sent. An `Originate` sent twice is two calls, so that decision stays with you: an action sent while not connected rejects with `AmiConnectionError`.

## Options

```ts
new AmiClient({
  host: '127.0.0.1',          // default
  port: 5038,                 // default; 5039 with tls
  username: 'admin',
  secret: 'secret',
  tls: false,                 // true, or options for tls.connect
  authType: 'plain',          // 'md5' sends a hash, never the secret
  events: true,               // false for none, or ['call', 'agent']
  connectTimeoutMs: 10_000,
  actionTimeoutMs: 10_000,
  keepAlive: { intervalMs: 15_000, timeoutMs: 5_000 },   // or false
  reconnect: { minDelayMs: 500, maxDelayMs: 30_000, factor: 2, maxAttempts: Infinity }, // or false
  maxMessageBytes: 8 * 1024 * 1024,
  encoding: 'utf-8',
});
```

A connection that only sends actions should set `events: false`, so Asterisk does not stream every call event to a socket nobody reads.

## Supported Asterisk versions

| Asterisk | AMI | How it was checked |
|---|---|---|
| 20 | 9.0.0 | Types generated from its source. Not run against a live server yet. |
| 22 | 11.0.0 | Types generated from its source. Not run against a live server yet. |
| 23 | 12.0.0 | Types generated from its source. `scripts/live-check.mjs` passes on 23.5.0. |
| 24 | 14.0.0 | Types generated from its source. Not run against a live server yet. |

The command output format of Asterisk 13 and earlier is also parsed, from the protocol description; it has not been run against such a server.

## What is in the catalogue

The types are generated, not written by hand:

1. `npm run catalog` reads the XML documentation inside a clone of the Asterisk source and writes `catalog/*.json`: every event and action with its fields, listed values and versions.
2. `scripts/collect-undocumented.mjs` scans the C source for events Asterisk sends but does not document, mostly the items and end markers of list replies.
3. `npm run generate` turns both into `src/generated/`.

Only names and listed values are taken from Asterisk. Its documentation text is not copied; each type links to the page on docs.asterisk.org.

Events that Asterisk removed before version 20 (`Dial`, `Bridge`, `Link`, `Join`, `Leave` and others from Asterisk 11 and earlier) and events of third-party modules are not in the catalogue. They still arrive and can be handled by name.

## Development

```bash
npm install
npm run typecheck
npm test
npm run build
```

To check against a real Asterisk:

```bash
AMI_HOST=127.0.0.1 AMI_PORT=5038 AMI_USERNAME=admin AMI_SECRET=secret node scripts/live-check.mjs
```

The design, and the study of other AMI libraries it is based on, is in [docs/DESIGN.md](docs/DESIGN.md).

## Licence

MIT. See [LICENSE](LICENSE).

Asterisk is a registered trademark of Sangoma Technologies. This project is not affiliated with or endorsed by Sangoma.
