# API reference

Everything is exported from the package root:

```ts
import { AmiClient, AmiMessage, AmiParser, AmiActionError /* ... */ } from 'amilink';
```

- [AmiClient](#amiclient)
- [AmiMessage](#amimessage)
- [Errors](#errors)
- [Typed names](#typed-names)
- [AmiParser and encodeAction](#amiparser-and-encodeaction)

## AmiClient

```ts
const ami = new AmiClient(options);
```

### Options

| Option | Type | Default | Meaning |
|---|---|---|---|
| `username` | `string` | required | The manager user from `manager.conf`. |
| `secret` | `string` | required | That user's secret. |
| `host` | `string` | `127.0.0.1` | |
| `port` | `number` | `5038`, or `5039` with `tls` | |
| `tls` | `boolean` or `tls.ConnectionOptions` | off | Connect over TLS. |
| `authType` | `'plain'` or `'md5'` | `'plain'` | `md5` asks for a challenge and sends a hash, so the secret is never sent. |
| `events` | `boolean`, `string` or `string[]` | `true` | `false` for none, or manager classes such as `['call', 'agent']`. |
| `connectTimeoutMs` | `number` | `10000` | Time allowed to connect and log in. |
| `actionTimeoutMs` | `number` | `10000` | Time allowed for an action's answer. |
| `keepAlive` | `false` or `{ intervalMs, timeoutMs }` | `{ 15000, 5000 }` | After `intervalMs` of silence a Ping is sent; no answer in `timeoutMs` drops the link. |
| `reconnect` | `false` or object | on | See below. |
| `maxMessageBytes` | `number` | `8388608` | A larger message drops the link. |
| `encoding` | `string` | `utf-8` | Any label `TextDecoder` accepts. |
| `socketFactory` | `() => AmiSocket` | none | Supply the socket yourself. |

`reconnect` fields:

| Field | Default | Meaning |
|---|---|---|
| `minDelayMs` | `500` | First wait. |
| `maxDelayMs` | `30000` | Longest wait. |
| `factor` | `2` | The wait is multiplied by this after each failed attempt. |
| `maxAttempts` | `Infinity` | Give up after this many failures in a row. |
| `retryOnAuthFailure` | `false` | Keep trying after the login is refused. |

Each wait is half fixed and half random, so many clients cut off together do not all return together.

### Connecting

| Member | Returns | Meaning |
|---|---|---|
| `start()` | `void` | Begin connecting and return at once. |
| `connect(timeoutMs?)` | `Promise<void>` | `start()`, then wait until logged in. |
| `whenReady(timeoutMs?)` | `Promise<void>` | Wait until logged in. |
| `close()` | `Promise<void>` | Log off and stop. Waiting actions are rejected. The client can be started again. |
| `state` | `AmiClientState` | `idle`, `connecting`, `authenticating`, `ready`, `reconnecting` or `closed`. |
| `connected` | `boolean` | True while `state` is `ready`. |
| `amiVersion` | `string` or `undefined` | From the greeting, for example `12.0.0`. |

`connect()` rejects when the login is refused (`AmiAuthError`), or when reconnection is off or used up and the connection fails. With reconnection on and the server simply down, it stays pending while the client retries; pass `timeoutMs` to stop waiting. The client keeps trying in the background either way.

### Actions

| Method | Returns |
|---|---|
| `action(action, options?)` | `Promise<AmiMessage>` |
| `rawAction(action, options?)` | `Promise<AmiMessage>` |
| `list(action, options?)` | `Promise<AmiListResult>` |
| `rawList(action, options?)` | `Promise<AmiListResult>` |
| `command(text, options?)` | `Promise<string[]>` |
| `ping(options?)` | `Promise<number>`, the round trip in milliseconds |

- `action` and `list` accept only documented actions, checked by the compiler. `rawAction` and `rawList` accept any headers.
- `options.timeoutMs` overrides `actionTimeoutMs` for one call.
- An answer of `Response: Error` rejects with `AmiActionError`.
- Calling any of them while not connected rejects with `AmiConnectionError`. Nothing is queued or re-sent.
- Do not pass `ActionID`; the client sets it.

Header values may be a string, number or boolean. An array sends the header once per item. An object sends it once per entry as `name=value`, which is how `Variable` is written.

**Lists.** `list` waits for the whole reply:

```ts
interface AmiListResult {
  response: AmiMessage;            // the first response
  events: AmiMessage[];            // the items, in order
  complete: AmiMessage | undefined; // the event that ended the list
}
```

A reply is a list only when Asterisk marks it with `EventList: start`; it ends at `EventList: Complete`. If the action turns out not to be a list, `events` is empty and `complete` is `undefined`. For the few actions that answer in two parts without that marker, name the ending event: `{ completeEvent: 'OriginateResponse' }`. List items are returned in the result and are not emitted as ordinary events.

### Events from Asterisk

| Method | Meaning |
|---|---|
| `onEvent(name, handler)` | One event by name. A documented name gives a typed `event.fields`. Names ignore case. |
| `onEvent('*', handler)` | Every event. |
| `onEvent(regexp, handler)` | Events whose name matches. |
| `onEvent(test, handler)` | Events for which `test(message)` is true. |
| `events(matcher?, { maxQueue? })` | The same matchers, as an async stream. |

`onEvent` returns a function that removes the listener. Listeners and streams stay in place across reconnects.

The stream hands events over one at a time, in order, however long each step takes. If more than `maxQueue` events (default 10 000) are waiting, it ends with `AmiOverflowError`. It ends normally when the client closes, or when you `break` out of the loop.

### Client events

`ami.on(name, listener)` returns a function that removes the listener. `once` and `off` also exist.

| Name | Arguments | When |
|---|---|---|
| `ready` | `{ amiVersion }` | Logged in. Emitted again after every reconnect. |
| `disconnect` | `reason: Error` | A usable connection was lost. |
| `reconnecting` | `{ attempt, delayMs, reason }` | A new attempt is scheduled. |
| `close` | `reason: Error` or `undefined` | Stopped for good: closed by you, login refused, or attempts used up. |
| `error` | `error: Error` | Anything that went wrong. Never thrown, even with no listener. |
| `event` | `message: AmiMessage` | Every event from Asterisk, in order. |
| `unmatched` | `message: AmiMessage` | A message that is neither an event nor the answer to a waiting action, for example an answer that arrived after its timeout. |
| `state` | `state, previous` | The state changed. |

A listener that throws, or returns a promise that rejects, does not stop other listeners or the connection. The failure is emitted as `error`.

## AmiMessage

One event or response.

| Member | Type | Meaning |
|---|---|---|
| `headers` | `readonly [name, value][]` | Every header, in order, exactly as sent. |
| `body` | `readonly string[]` | Lines that were not headers: old-format command output, or free text. |
| `receivedAt` | `number` | `Date.now()` when the message was complete. |
| `get(name)` | `string` or `undefined` | First value. The name ignores case. |
| `getAll(name)` | `string[]` | Every value, in order. |
| `has(name)` | `boolean` | |
| `fields` | object | Headers by name, with the names as sent. First value when a header repeats. |
| `is(name)` | type guard | True when this is the named event; narrows `fields` to that event's type. |
| `event` | `string` or `undefined` | The `Event` header. |
| `response` | `string` or `undefined` | The `Response` header. |
| `actionId` | `string` or `undefined` | The `ActionID` header. |
| `isEvent`, `isResponse` | `boolean` | A message with an `Event` header is an event, even if it also has `Response`. |
| `output` | `string[]` | Command output as lines, in either format Asterisk uses. |
| `variables(channel?)` | `Record<string, string>` | `Variable` and `ChanVariable(...)` headers as one object. |
| `toObject()`, `toJSON()` | plain object | For logging. A repeated header becomes an array here. |

All values are strings. Nothing is converted.

## Errors

All extend `AmiError`, which extends `Error`.

| Class | Meaning | Extra members |
|---|---|---|
| `AmiActionError` | Asterisk answered `Response: Error`. | `action`, `response` |
| `AmiAuthError` | The login was refused. | `response` |
| `AmiTimeoutError` | No answer in time: to an action, a keep-alive Ping, or while connecting. | |
| `AmiConnectionError` | Not connected, connection lost, or closed. | `cause` |
| `AmiProtocolError` | The server sent something that is not AMI, or a message over the size limit. | |
| `AmiOverflowError` | An event stream's consumer fell too far behind. | |

Invalid input to an action is reported with the standard `TypeError` (a line break in a value, a bad header name, a caller-supplied `ActionID`) or `RangeError` (a line longer than Asterisk reads, more than 128 headers).

## Typed names

| Export | Meaning |
|---|---|
| `AmiEventName` | Union of the 245 event names. |
| `AmiEventMap` | Event name to its fields type. |
| `AmiEvent<N>` | An `AmiMessage` known to be event `N`. |
| `<Name>EventFields` | The fields of one event, for example `HangupEventFields`. |
| `AMI_EVENT_NAMES` | The event names as an array. |
| `AMI_EVENT_CLASSES` | Event name to the `manager.conf` read classes that deliver it. |
| `AmiActionName` | Union of the 171 action names. |
| `AmiActionMap` | Action name to its parameters type. |
| `AmiTypedAction` | Any documented action. |
| `<Name>ActionParams` | The parameters of one action, for example `OriginateActionParams`. |
| `AMI_ACTION_NAMES` | The action names as an array. |

Every event field is optional, because Asterisk omits fields depending on the call and the version. Where Asterisk lists the possible values, the type offers them and still accepts any string: `'0' | '1' | (string & {})`. Fields that exist only in some versions say so in their documentation comment.

## AmiParser and encodeAction

The pieces the client is built from, for anyone working with AMI bytes directly.

```ts
const parser = new AmiParser({ maxMessageBytes, encoding, expectBanner });
for (const item of parser.feed(chunk)) {
  if (item.kind === 'banner') console.log(item.version);
  else console.log(item.message.event);
}

const bytes = encodeAction({ Action: 'Ping', ActionID: 'my-1' });
```

`feed` accepts bytes in any chunking and returns the items completed so far. It throws `AmiProtocolError` when a message passes the size limit; after that the parser must be thrown away. Set `expectBanner: false` to parse a stream that has no greeting line, such as the client's side of a connection.
