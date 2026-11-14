#!/usr/bin/env node
// Checks the built library against a real Asterisk.
//
//   npm run build
//   AMI_HOST=127.0.0.1 AMI_PORT=5038 AMI_USERNAME=... AMI_SECRET=... node scripts/live-check.mjs
//
// The manager user needs read and write `all` (or at least system, command,
// call, originate, reporting) and the Asterisk needs a `Local` channel driver.
// Nothing is changed on the server; one short call to the Echo application is made.

import { AmiActionError, AmiAuthError, AmiClient } from '../dist/index.js';

const base = {
  host: process.env.AMI_HOST ?? '127.0.0.1',
  port: Number(process.env.AMI_PORT ?? 5038),
  username: process.env.AMI_USERNAME ?? '',
  secret: process.env.AMI_SECRET ?? '',
};
if (!base.username || !base.secret) {
  console.error('Set AMI_USERNAME and AMI_SECRET.');
  process.exit(2);
}

let failed = 0;
async function check(name, run) {
  try {
    const detail = await run();
    console.log(`ok    ${name}${detail ? `  (${detail})` : ''}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL  ${name}: ${error?.message ?? error}`);
  }
}
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};

const ami = new AmiClient({ ...base, reconnect: { minDelayMs: 200, maxDelayMs: 1000 } });
const errors = [];
ami.on('error', (error) => errors.push(error));

await check('plain login', async () => {
  await ami.connect(10_000);
  expect(ami.connected, 'not connected');
  return `AMI ${ami.amiVersion}`;
});

await check('ping', async () => `${await ami.ping()} ms`);

await check('CoreSettings', async () => {
  const response = await ami.action({ Action: 'CoreSettings' });
  expect(response.get('AsteriskVersion'), 'no AsteriskVersion header');
  return `Asterisk ${response.get('AsteriskVersion')}, AMI ${response.get('AMIversion')}`;
});

await check('command output arrives as lines', async () => {
  const lines = await ami.command('core show version');
  expect(lines.length >= 1 && /Asterisk/.test(lines[0]), `unexpected output: ${JSON.stringify(lines)}`);
  return lines[0].slice(0, 40);
});

await check('long command output is complete', async () => {
  const lines = await ami.command('core show applications');
  expect(lines.length > 20, `only ${lines.length} lines`);
  return `${lines.length} lines`;
});

await check('unknown action is rejected with the server message', async () => {
  const error = await ami.rawAction({ Action: 'NoSuchActionAtAll' }).catch((reason) => reason);
  expect(error instanceof AmiActionError, 'did not reject');
  return error.response.get('Message');
});

await check('list reply: CoreShowChannels', async () => {
  const result = await ami.list({ Action: 'CoreShowChannels' });
  expect(result.complete?.get('EventList')?.toLowerCase() === 'complete', 'no completion event');
  expect(Number(result.complete.get('ListItems')) === result.events.length, 'ListItems does not match');
  return `${result.events.length} channels`;
});

await check('list reply: Status with no channels', async () => {
  const result = await ami.list({ Action: 'Status' });
  expect(result.complete?.event === 'StatusComplete', `ended with ${result.complete?.event}`);
  return `${result.events.length} items`;
});

await check('20 actions at once all get their own answer', async () => {
  const answers = await Promise.all(
    Array.from({ length: 20 }, (_, index) =>
      ami.action({ Action: 'Getvar', Variable: `AMILINK_${index}` }).then((response) => response.get('Variable')),
    ),
  );
  answers.forEach((variable, index) => expect(variable === `AMILINK_${index}`, `answer ${index} was ${variable}`));
});

await check('a call produces typed events in order', async () => {
  const seen = [];
  const off = ami.onEvent(
    (event) => /^Local\/amilink@/.test(event.get('Channel') ?? ''),
    (event) => seen.push(event),
  );
  const done = new Promise((resolve) => {
    const stop = ami.onEvent('Hangup', (event) => {
      if (/^Local\/amilink@/.test(event.fields.Channel ?? '')) {
        stop();
        resolve();
      }
    });
  });
  const result = await ami.list(
    {
      Action: 'Originate',
      Channel: 'Local/amilink@amilink-live',
      Application: 'Wait',
      Data: '1',
      Async: 'true',
      Variable: { AMILINK_A: 'one', AMILINK_B: 'two' },
    },
    { completeEvent: 'OriginateResponse', timeoutMs: 15_000 },
  );
  expect(result.complete?.event === 'OriginateResponse', 'no OriginateResponse');
  await Promise.race([done, new Promise((_, reject) => setTimeout(() => reject(new Error('no Hangup seen')), 15_000))]);
  off();
  const names = seen.map((event) => event.event);
  expect(names.includes('Newchannel'), `no Newchannel in ${names.join(',')}`);
  expect(names.indexOf('Newchannel') < names.lastIndexOf('Hangup'), 'Newchannel came after Hangup');
  const first = seen.find((event) => event.is('Newchannel'));
  expect(first.fields.Uniqueid && first.fields.ChannelStateDesc, 'typed fields are empty');
  return `${result.complete.get('Response')}; ${names.length} events: ${[...new Set(names)].join(', ')}`;
});

await check('a value with a line break is refused before it is sent', async () => {
  const error = await ami
    .action({ Action: 'Setvar', Variable: 'X', Value: 'a\r\nAction: Command' })
    .catch((reason) => reason);
  expect(error instanceof TypeError, 'was not refused');
});

await check('MD5 login', async () => {
  const md5 = new AmiClient({ ...base, authType: 'md5', reconnect: false });
  await md5.connect(10_000);
  const ms = await md5.ping();
  await md5.close();
  return `${ms} ms`;
});

await check('events off: no events arrive', async () => {
  const quiet = new AmiClient({ ...base, events: false, reconnect: false });
  let count = 0;
  quiet.on('event', () => (count += 1));
  await quiet.connect(10_000);
  await ami.rawAction({ Action: 'UserEvent', UserEvent: 'AmilinkProbe' });
  await new Promise((resolve) => setTimeout(resolve, 500));
  await quiet.close();
  expect(count === 0, `${count} events arrived`);
});

await check('user event round trip', async () => {
  const got = new Promise((resolve, reject) => {
    const off = ami.onEvent('UserEvent', (event) => {
      if (event.fields.UserEvent === 'AmilinkRoundTrip') {
        off();
        resolve(event);
      }
    });
    setTimeout(() => reject(new Error('event not received')), 5000);
  });
  got.catch(() => {});
  await ami.action({ Action: 'UserEvent', UserEvent: 'AmilinkRoundTrip', Note: 'नमस्ते: ok' });
  const event = await got;
  expect(event.get('Note') === 'नमस्ते: ok', `Note was ${event.get('Note')}`);
});

await check('wrong secret stops with AmiAuthError', async () => {
  const wrong = new AmiClient({ ...base, secret: `${base.secret}-wrong` });
  const error = await wrong.connect(15_000).catch((reason) => reason);
  expect(error instanceof AmiAuthError, `got ${error?.name}: ${error?.message}`);
  expect(wrong.state === 'closed', `state is ${wrong.state}`);
});

await check('close logs off cleanly', async () => {
  await ami.close();
  expect(ami.state === 'closed', `state is ${ami.state}`);
});

const unexpected = errors.filter((error) => !/closed|lost/i.test(error.message));
if (unexpected.length > 0) {
  failed += 1;
  console.log(`FAIL  unexpected error events: ${unexpected.map((error) => error.message).join(' | ')}`);
}
console.log(failed === 0 ? '\nall live checks passed' : `\n${failed} live check(s) failed`);
process.exit(failed === 0 ? 0 : 1);
