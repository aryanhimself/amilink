#!/usr/bin/env node
// A thorough check of the built library against a real Asterisk running the
// lab configuration in lab/asterisk (start it with lab/run.sh).
//
//   npm run build
//   AMI_HOST=127.0.0.1 AMI_PORT=5038 AMI_USERNAME=amilink AMI_SECRET=... node scripts/live-conformance.mjs
//
// It CHANGES the server: it places calls, adds and removes queue members,
// writes the Asterisk database and finally restarts Asterisk. Use the lab only.
//
// Four kinds of result:
//   ok / FAIL   the library behaved correctly or not
//   skip        the server lacks what the check needs (a module, an action)
//   finding     a difference between this Asterisk and the library's types:
//               not a library bug, but something the types could say better
//
// A JSON report is written to RESULT_FILE (default lab/results/<version>.json).

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { AMI_ACTION_NAMES, AMI_EVENT_NAMES, AmiActionError, AmiClient, AmiConnectionError } from '../dist/index.js';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
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
const CONTEXT = 'amilink-conf';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// ---- results ---------------------------------------------------------------------
const results = [];
const findings = [];
function record(status, name, detail = '') {
  results.push({ status, name, detail });
  console.log(`${status.padEnd(5)} ${name}${detail ? `  (${detail})` : ''}`);
}
class Skip extends Error {}
async function check(name, run) {
  try {
    record('ok', name, (await run()) ?? '');
  } catch (error) {
    if (error instanceof Skip) record('skip', name, error.message);
    else record('FAIL', name, error?.message ?? String(error));
  }
}
const expect = (condition, message) => {
  if (!condition) throw new Error(message);
};
function finding(topic, detail) {
  findings.push({ topic, detail });
}

// ---- what the library's types say ---------------------------------------------------
// The typed fields of every event, read from the generated declarations.
function typedEventFields() {
  const source = readFileSync(join(root, 'src/generated/events.ts'), 'utf8');
  const fields = new Map();
  const common = new Set();
  const blocks = source.split(/\nexport interface /);
  for (const block of blocks) {
    const header = /^(\w+)(?: extends [\w, ]+)? \{/.exec(block);
    if (!header) continue;
    const body = block.slice(0, block.indexOf('\n}'));
    const names = [...body.matchAll(/^\s+readonly (?:'([^']+)'|(\w+))\??:/gm)].map((m) => m[1] ?? m[2]);
    if (header[1] === 'AmiEventCommonFields') {
      names.forEach((name) => common.add(name));
      continue;
    }
    const event = /readonly Event: '([^']+)'/.exec(body)?.[1];
    if (event) fields.set(event, new Set(names));
  }
  return { fields, common };
}
const { fields: TYPED_FIELDS, common: COMMON_FIELDS } = typedEventFields();
const EVENT_NAMES = new Set(AMI_EVENT_NAMES.map((name) => name.toLowerCase()));
const ACTION_NAMES = new Set(AMI_ACTION_NAMES.map((name) => name.toLowerCase()));
// Headers an event may carry that no event type lists on purpose.
const ALWAYS_ALLOWED = new Set(['event', 'privilege', 'timestamp', 'systemname', 'actionid']);

// ---- every event the server sends during the whole run --------------------------------
const seen = new Map(); // event name -> { count, headers: Map(name -> example count) }
let firstEventAt = 0;
function observe(message) {
  const name = message.event;
  if (!name) return;
  firstEventAt ||= Date.now();
  let entry = seen.get(name);
  if (!entry) seen.set(name, (entry = { count: 0, headers: new Set() }));
  entry.count += 1;
  for (const [header] of message.headers) entry.headers.add(header);
}

const ami = new AmiClient({ ...base, reconnect: { minDelayMs: 300, maxDelayMs: 1500, retryOnAuthFailure: false } });
const clientErrors = [];
ami.on('error', (error) => clientErrors.push(error.message));
ami.on('event', observe);

// Events that carry an ActionID of a finished list: a list Asterisk did not announce.
const leaked = [];
const finishedListIds = new Set();
ami.on('event', (message) => {
  const id = message.actionId;
  if (id && finishedListIds.has(id)) leaked.push(`${message.event} (${id})`);
});

/** Wait for an event matching `test`, or fail after `ms`. */
function waitFor(test, ms, what) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      off();
      reject(new Error(`timed out waiting for ${what}`));
    }, ms);
    const off = ami.onEvent(test, (event) => {
      clearTimeout(timer);
      off();
      resolve(event);
    });
  });
}

/** Collect every event for the duration of `run`, plus `tailMs` after it. */
async function during(run, tailMs = 800) {
  const events = [];
  const off = ami.onEvent('*', (event) => events.push(event));
  try {
    await run();
    await sleep(tailMs);
  } finally {
    off();
  }
  return events;
}

/** Place a call through Local/<exten>@amilink-conf; the far half runs `application`. Resolves when it has hung up. */
async function call(exten, application = 'Wait', data = '1', timeoutMs = 25_000, answered = true) {
  const channelPrefix = `Local/${exten}@${CONTEXT}`;
  const hungUp = waitFor(
    (event) => event.event === 'Hangup' && (event.get('Channel') ?? '').startsWith(channelPrefix) && (event.get('Channel') ?? '').endsWith(';2'),
    timeoutMs,
    `the hangup of ${exten}`,
  );
  const reply = await ami.list(
    { Action: 'Originate', Channel: channelPrefix, Application: application, Data: data, Async: 'true' },
    { completeEvent: 'OriginateResponse', timeoutMs },
  );
  const response = reply.complete?.get('Response');
  if (answered) expect(response === 'Success', `originate ${exten}: ${reply.complete?.get('Reason') ?? 'no answer'}`);
  else expect(response === 'Failure', `originate ${exten} should not be answered, got ${response}`);
  await hungUp;
  return reply.complete;
}

let version = 'unknown';
let modules = new Set();
let serverActions = new Set();
async function hasModule(name) {
  if (modules.has(name)) return true;
  try {
    await ami.action({ Action: 'ModuleCheck', Module: name });
    modules.add(name);
    return true;
  } catch {
    return false;
  }
}
function needAction(name) {
  if (!serverActions.has(name.toLowerCase())) throw new Skip(`this Asterisk has no ${name} action`);
}

// =======================================================================================
// 1. Connection and server facts
// =======================================================================================
await check('connect and log in', async () => {
  await ami.connect(15_000);
  const settings = await ami.action({ Action: 'CoreSettings' });
  version = settings.get('AsteriskVersion') ?? 'unknown';
  return `Asterisk ${version}, AMI ${ami.amiVersion}`;
});
const major = Number.parseInt(version, 10);

// =======================================================================================
// 2. Every action the server has, compared with the library's types
// =======================================================================================
await check('ListCommands: every action the server offers', async () => {
  const reply = await ami.action({ Action: 'ListCommands' });
  const skip = new Set(['response', 'actionid', 'message', 'eventlist']);
  serverActions = new Set(reply.headers.map(([name]) => name.toLowerCase()).filter((name) => !skip.has(name)));
  expect(serverActions.size > 50, `only ${serverActions.size} actions listed`);
  const missingTypes = [...serverActions].filter((name) => !ACTION_NAMES.has(name));
  const notOnServer = AMI_ACTION_NAMES.filter((name) => !serverActions.has(name.toLowerCase()));
  if (missingTypes.length) finding('actions this server has that the library has no type for', missingTypes.sort());
  finding('typed actions this server does not have (module not loaded or another version)', notOnServer.length);
  return `${serverActions.size} on the server, ${missingTypes.length} without a type`;
});

// =======================================================================================
// 3. Every read-only action answers, lists are complete, nothing leaks
// =======================================================================================
const READ_ONLY = [
  ['Ping', {}], ['CoreSettings', {}], ['CoreStatus', {}], ['CoreShowChannels', {}],
  ['Status', {}], ['Agents', {}], ['BridgeList', {}], ['BridgeTechnologyList', {}],
  ['ConfbridgeListRooms', {}], ['DeviceStateList', {}], ['ExtensionStateList', {}],
  ['PresenceStateList', {}], ['ExtensionState', { Exten: 'lab-hint', Context: CONTEXT }],
  ['Getvar', { Variable: 'EPOCH' }], ['ListCategories', { Filename: 'queues.conf' }],
  ['GetConfig', { Filename: 'queues.conf' }], ['GetConfigJSON', { Filename: 'queues.conf' }],
  ['MailboxCount', { Mailbox: '100@default' }], ['MailboxStatus', { Mailbox: '100@default' }],
  ['ModuleCheck', { Module: 'app_queue' }], ['Parkinglots', {}], ['ParkedCalls', {}],
  ['QueueStatus', {}], ['QueueSummary', {}], ['QueueRule', {}], ['ShowDialPlan', { Context: CONTEXT }],
  ['VoicemailUsersList', {}], ['MWIGet', { Mailbox: '100@default' }], ['DBGetTree', { Family: 'amilinklab' }],
  ['PJSIPShowEndpoints', {}], ['PJSIPShowAors', {}], ['PJSIPShowAuths', {}], ['PJSIPShowContacts', {}],
  ['PJSIPShowRegistrationsInbound', {}], ['PJSIPShowRegistrationsOutbound', {}],
  ['PJSIPShowSubscriptionsInbound', {}], ['PJSIPShowSubscriptionsOutbound', {}], ['PJSIPShowResourceLists', {}],
  ['PJSIPShowMaintenance', {}], ['SIPpeers', {}], ['SIPshowregistry', {}], ['IAXpeerlist', {}],
  ['FAXSessions', {}], ['FAXStats', {}], ['CoreShowChannelMap', { Channel: 'none' }],
];
for (const [name, params] of READ_ONLY) {
  await check(`read-only: ${name}`, async () => {
    needAction(name);
    let result;
    try {
      result = await ami.rawList({ Action: name, ...params }, { timeoutMs: 8000 });
    } catch (error) {
      // An Error answer is a correct, complete reply: the library matched it to the action.
      if (error instanceof AmiActionError) return `answered: ${error.response.get('Message') ?? 'Error'}`;
      throw error;
    }
    const id = result.response.actionId;
    if (id) finishedListIds.add(id);
    const announced = result.complete?.get('ListItems');
    if (announced !== undefined) {
      expect(Number(announced) === result.events.length, `ListItems says ${announced}, got ${result.events.length}`);
    }
    return result.complete ? `${result.events.length} items, ended by ${result.complete.event}` : 'single reply';
  });
}
await check('no list event arrived after its list was complete', async () => {
  await sleep(500);
  expect(leaked.length === 0, `leaked: ${leaked.slice(0, 5).join(', ')}`);
  return `${finishedListIds.size} lists checked`;
});

// =======================================================================================
// 4. Calls that make Asterisk send many kinds of events
// =======================================================================================
const SCENARIOS = [
  { exten: 'queue', expect: ['QueueCallerJoin', 'AgentCalled', 'AgentConnect', 'AgentComplete', 'QueueCallerLeave'], module: 'app_queue' },
  { exten: 'abandon', expect: ['QueueCallerJoin', 'QueueCallerAbandon'], module: 'app_queue', far: ['Wait', '1'] },
  { exten: 'dial', expect: ['DialBegin', 'DialEnd', 'BridgeCreate', 'BridgeEnter', 'BridgeLeave', 'BridgeDestroy'] },
  { exten: 'busy', expect: ['Hangup'], unanswered: true, cause: '17' },
  { exten: 'cause', expect: ['Hangup'], unanswered: true, cause: '17' },
  { exten: 'dtmf', expect: ['DTMFBegin', 'DTMFEnd'] },
  { exten: 'vars', expect: ['UserEvent', 'NewCallerid', 'NewAccountCode'] },
  // The far half waits longer than the recording, so the dialplan reaches StopMixMonitor:
  // a recording ended by a hangup sends no MixMonitorStop.
  { exten: 'record', expect: ['MixMonitorStart', 'MixMonitorStop'], module: 'app_mixmonitor', far: ['Wait', '4'] },
  { exten: 'moh', expect: ['MusicOnHoldStart', 'MusicOnHoldStop'], module: 'res_musiconhold', optional: true },
  { exten: 'conf', expect: ['ConfbridgeStart', 'ConfbridgeJoin', 'ConfbridgeLeave', 'ConfbridgeEnd'], module: 'app_confbridge', far: ['Wait', '2'] },
  { exten: 'park', expect: ['ParkedCall'], module: 'res_parking', far: ['Wait', '1'] },
];
for (const scenario of SCENARIOS) {
  await check(`call: ${scenario.exten} sends ${scenario.expect.join(', ')}`, async () => {
    if (scenario.module && !(await hasModule(scenario.module))) throw new Skip(`${scenario.module} not loaded`);
    const [application, data] = scenario.far ?? ['Wait', '1'];
    const events = await during(() => call(scenario.exten, application, data, 25_000, !scenario.unanswered), scenario.tail ?? 800);
    const names = new Set(events.map((event) => event.event));
    const missing = scenario.expect.filter((name) => !names.has(name));
    if (missing.length && scenario.optional) throw new Skip(`not sent here: ${missing.join(', ')}`);
    expect(missing.length === 0, `missing ${missing.join(', ')}; got ${[...names].join(', ')}`);
    if (scenario.cause) {
      const hangup = events.find((event) => event.event === 'Hangup' && (event.get('Channel') ?? '').startsWith(`Local/${scenario.exten}@`) && (event.get('Channel') ?? '').endsWith(';2'));
      expect(hangup?.get('Cause') === scenario.cause, `Hangup Cause=${hangup?.get('Cause')} (${hangup?.get('Cause-txt')})`);
    }
    // The typed view of each event must agree with its raw headers.
    for (const event of events) {
      for (const [header, value] of event.headers) {
        if (event.fields[header] === undefined) throw new Error(`${event.event}: fields.${header} is undefined but the header is "${value}"`);
      }
    }
    return `${events.length} events, ${names.size} kinds`;
  });
}

await check('a call: events of one channel arrive in the order Asterisk sent them', async () => {
  const events = await during(() => call('dial', 'Wait', '1'));
  // CEL and Cdr records are a separate stream: Asterisk may send CHAN_START before Newchannel.
  const own = events.filter((event) => !['CEL', 'Cdr'].includes(event.event) && (event.get('Channel') ?? '').startsWith(`Local/dial@${CONTEXT}`) && (event.get('Channel') ?? '').endsWith(';2'));
  const names = own.map((event) => event.event);
  const at = (name) => names.indexOf(name);
  expect(at('Newchannel') === 0, `first event was ${names[0]}`);
  expect(at('DialBegin') > 0 && at('DialEnd') > at('DialBegin'), `dial order: ${names.join(',')}`);
  expect(names.lastIndexOf('Hangup') > at('DialEnd'), 'Hangup before DialEnd');
  return `${names.length} events on the channel`;
});

// =======================================================================================
// 5. Actions that change state, each with its round trip
// =======================================================================================
await check('Setvar and Getvar on a global variable', async () => {
  const value = `v${Date.now()}`;
  await ami.action({ Action: 'Setvar', Variable: 'AMILINK_LAB', Value: value });
  const reply = await ami.action({ Action: 'Getvar', Variable: 'AMILINK_LAB' });
  expect(reply.get('Value') === value, `got ${reply.get('Value')}`);
});

await check('Asterisk database: DBPut, DBGet, DBDel', async () => {
  needAction('DBPut');
  const value = 'value with spaces, commas; and : colons';
  await ami.action({ Action: 'DBPut', Family: 'amilinklab', Key: 'k1', Val: value });
  const got = await ami.list({ Action: 'DBGet', Family: 'amilinklab', Key: 'k1' });
  const read = got.events.find((event) => event.event === 'DBGetResponse')?.get('Val') ?? got.response.get('Val');
  expect(read === value, `read back ${JSON.stringify(read)}`);
  await ami.action({ Action: 'DBDel', Family: 'amilinklab', Key: 'k1' });
  const gone = await ami.list({ Action: 'DBGet', Family: 'amilinklab', Key: 'k1' }).then(() => false, (error) => error instanceof AmiActionError);
  expect(gone, 'the key is still there after DBDel');
  return got.events.length ? 'value came as a DBGetResponse event' : 'value came in the response';
});

await check('queue members: QueueAdd, QueuePause, QueuePenalty, QueueStatus, QueueRemove', async () => {
  if (!(await hasModule('app_queue'))) throw new Skip('app_queue not loaded');
  const iface = 'Local/101@amilink-conf/n';
  const added = waitFor((event) => event.event === 'QueueMemberAdded' && event.get('Interface') === iface, 5000, 'QueueMemberAdded');
  await ami.action({ Action: 'QueueAdd', Queue: 'amilink-dyn', Interface: iface, MemberName: 'Lab Member', Penalty: '1' });
  await added;
  const paused = waitFor((event) => event.event === 'QueueMemberPause' && event.get('Interface') === iface, 5000, 'QueueMemberPause');
  await ami.action({ Action: 'QueuePause', Queue: 'amilink-dyn', Interface: iface, Paused: 'true', Reason: 'lunch break' });
  const pause = await paused;
  expect(pause.get('Paused') === '1', `Paused=${pause.get('Paused')}`);
  const reason = pause.get('PausedReason') ?? pause.get('Reason');
  expect(reason === 'lunch break', `reason ${reason}`);
  const penalty = waitFor((event) => event.event === 'QueueMemberPenalty' && event.get('Interface') === iface, 5000, 'QueueMemberPenalty');
  await ami.action({ Action: 'QueuePenalty', Interface: iface, Penalty: '3', Queue: 'amilink-dyn' });
  expect((await penalty).get('Penalty') === '3', 'penalty not 3');
  const status = await ami.list({ Action: 'QueueStatus', Queue: 'amilink-dyn' });
  const member = status.events.find((event) => event.event === 'QueueMember' && (event.get('Location') ?? event.get('Interface')) === iface);
  expect(member, 'member missing from QueueStatus');
  expect(member.get('Paused') === '1' && member.get('Penalty') === '3', `QueueStatus shows Paused=${member.get('Paused')} Penalty=${member.get('Penalty')}`);
  const removed = waitFor((event) => event.event === 'QueueMemberRemoved' && event.get('Interface') === iface, 5000, 'QueueMemberRemoved');
  await ami.action({ Action: 'QueueRemove', Queue: 'amilink-dyn', Interface: iface });
  await removed;
});

await check('custom device state: DeviceStateChange and ExtensionStatus events', async () => {
  // The DeviceStateChange action exists only with some modules; setting the
  // DEVICE_STATE function through Setvar does the same on every version.
  const set = (state) => serverActions.has('devicestatechange')
    ? ami.action({ Action: 'DeviceStateChange', Device: 'Custom:amilink', State: state })
    : ami.action({ Action: 'Setvar', Variable: 'DEVICE_STATE(Custom:amilink)', Value: state });
  const device = waitFor((event) => event.event === 'DeviceStateChange' && event.get('Device') === 'Custom:amilink' && event.get('State') === 'INUSE', 5000, 'DeviceStateChange');
  const hint = waitFor((event) => event.event === 'ExtensionStatus' && event.get('Exten') === 'lab-hint', 5000, 'ExtensionStatus');
  await set('INUSE');
  await device;
  const status = await hint;
  await set('NOT_INUSE');
  return `ExtensionStatus ${status.get('StatusText') ?? status.get('Status')}`;
});

await check('UserEvent action: headers come back as sent', async () => {
  const back = waitFor((event) => event.event === 'UserEvent' && event.get('UserEvent') === 'AmilinkAction', 5000, 'the UserEvent');
  await ami.rawAction({ Action: 'UserEvent', UserEvent: 'AmilinkAction', Kind: 'round trip', Unicode: 'नमस्ते' });
  const event = await back;
  expect(event.get('Kind') === 'round trip', `Kind=${event.get('Kind')}`);
  expect(event.get('Unicode') === 'नमस्ते', `Unicode=${event.get('Unicode')}`);
});

await check('actions on a live channel: Status, Getvar, Setvar, PlayDTMF, MixMonitor, Redirect, Hangup', async () => {
  const hungUp = waitFor((event) => event.event === 'Hangup' && (event.get('Channel') ?? '').startsWith(`Local/hold@${CONTEXT}`) && (event.get('Channel') ?? '').endsWith(';2'), 30_000, 'the hangup');
  const answered = waitFor((event) => event.event === 'Newexten' && (event.get('Channel') ?? '').startsWith(`Local/hold@${CONTEXT}`) && event.get('Application') === 'Wait', 10_000, 'the call to reach Wait');
  await ami.list({ Action: 'Originate', Channel: `Local/hold@${CONTEXT}`, Application: 'Wait', Data: '30', Async: 'true' }, { completeEvent: 'OriginateResponse', timeoutMs: 15_000 });
  const channel = (await answered).get('Channel');
  const status = await ami.list({ Action: 'Status', Channel: channel });
  expect(status.events.some((event) => event.get('Channel') === channel), 'Status does not show the channel');
  await ami.action({ Action: 'Setvar', Channel: channel, Variable: 'AMILINK_CH', Value: 'on the channel' });
  const got = await ami.action({ Action: 'Getvar', Channel: channel, Variable: 'AMILINK_CH' });
  expect(got.get('Value') === 'on the channel', `Getvar gave ${got.get('Value')}`);
  const dtmf = waitFor((event) => event.event === 'DTMFEnd' && event.get('Digit') === '7', 5000, 'DTMFEnd 7');
  await ami.action({ Action: 'PlayDTMF', Channel: channel, Digit: '7' });
  await dtmf;
  if (await hasModule('app_mixmonitor')) {
    const started = waitFor((event) => event.event === 'MixMonitorStart', 5000, 'MixMonitorStart');
    await ami.action({ Action: 'MixMonitor', Channel: channel, File: '/tmp/amilink-action.wav' });
    await started;
    await ami.action({ Action: 'StopMixMonitor', Channel: channel });
  }
  const moved = waitFor((event) => event.event === 'Newexten' && event.get('Channel') === channel && event.get('Exten') === 'agent', 5000, 'the redirect');
  await ami.action({ Action: 'Redirect', Channel: channel, Context: CONTEXT, Exten: 'agent', Priority: '1' });
  await moved;
  await ami.action({ Action: 'Hangup', Channel: channel, Cause: '16' }).catch((error) => {
    // The redirected call may already have hung up by itself (agent waits 2 s).
    if (!(error instanceof AmiActionError)) throw error;
  });
  await hungUp;
});

await check('Originate to a missing extension fails with a reason', async () => {
  const reply = await ami
    .list({ Action: 'Originate', Channel: `Local/nosuchexten@${CONTEXT}`, Application: 'Wait', Data: '1', Async: 'true' }, { completeEvent: 'OriginateResponse', timeoutMs: 15_000 })
    .catch((error) => error);
  if (reply instanceof AmiActionError) return `refused: ${reply.response.get('Message')}`;
  expect(reply.complete?.get('Response') === 'Failure', `Response=${reply.complete?.get('Response')}`);
  return `OriginateResponse Failure, Reason ${reply.complete.get('Reason')}`;
});

await check('Reload of one module answers', async () => {
  await ami.action({ Action: 'Reload', Module: 'app_queue' });
});

// =======================================================================================
// 6. Load and edge cases
// =======================================================================================
await check('5,000 events in a burst: none lost, all in order', async () => {
  let next = 0;
  let disorder = 0;
  const done = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`only ${next} of 5000 arrived`)), 60_000);
    const off = ami.onEvent('UserEvent', (event) => {
      if (event.get('UserEvent') !== 'AmilinkBurst') return;
      if (Number(event.get('N')) !== next) disorder += 1;
      next = Number(event.get('N')) + 1;
      if (next === 5000) {
        clearTimeout(timer);
        off();
        resolve();
      }
    });
  });
  const started = Date.now();
  await ami.list({ Action: 'Originate', Channel: `Local/burst@${CONTEXT}`, Application: 'Wait', Data: '30', Async: 'true' }, { completeEvent: 'OriginateResponse', timeoutMs: 15_000 });
  await done;
  expect(disorder === 0, `${disorder} events out of order or missing`);
  return `${Math.round(5000 / ((Date.now() - started) / 1000))} events a second`;
});

/**
 * Run the 5,000-event burst while a client in ANOTHER process blocks its event
 * loop for `blockMs` on the first event. Its own process, so only that client
 * stops reading; this process keeps reading and places the call.
 */
async function blockedBurst(username, blockMs) {
  const { spawn } = await import('node:child_process');
  const child = spawn(process.execPath, [join(root, 'lab', 'blocked-client.mjs')], {
    env: { ...process.env, AMI_HOST: base.host, AMI_PORT: String(base.port), AMI_USERNAME: username, AMI_SECRET: base.secret, BLOCK_MS: String(blockMs) },
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  let output = '';
  const lines = new Promise((resolve) => {
    child.stdout.on('data', (chunk) => {
      output += chunk;
      if (output.includes('ready\n')) resolve();
    });
  });
  const exited = new Promise((resolve) => child.on('exit', resolve));
  await Promise.race([lines, sleep(15_000).then(() => { throw new Error('the blocking client did not log in'); })]);
  await ami.list({ Action: 'Originate', Channel: `Local/burst@${CONTEXT}`, Application: 'Wait', Data: '30', Async: 'true' }, { completeEvent: 'OriginateResponse', timeoutMs: 15_000 });
  await Promise.race([exited, sleep(100_000).then(() => { child.kill(); throw new Error('the blocking client did not finish'); })]);
  const last = output.trim().split('\n').at(-1);
  return JSON.parse(last);
}

await check('a handler that blocks for 2 s loses nothing when writetimeout allows it (5 s)', async () => {
  const { count, disconnected } = await blockedBurst('amilink-patient', 2000);
  expect(count === 5000 && !disconnected, `${count} of 5000 arrived; ${disconnected ? 'disconnected' : 'still connected'}`);
});

await check('a handler that blocks for 2 s with the default writetimeout (100 ms): what Asterisk does', async () => {
  const { count, disconnected } = await blockedBurst(base.username, 2000);
  if (count < 5000 || disconnected) {
    finding('with the default writetimeout Asterisk drops events to a client that stops reading', `${5000 - count} of 5000 lost during a 2 s block; Asterisk ${disconnected ? 'closed the connection' : 'kept the connection'}`);
  }
  return `${count} of 5000 arrived; Asterisk ${disconnected ? 'closed the connection' : 'kept the connection'}`;
});

await check('very long command output arrives whole (3,000 database rows)', async () => {
  // 3,000 writes sent at once, then one command whose output is all of them.
  await Promise.all(Array.from({ length: 3000 }, (_, index) => ami.action({ Action: 'DBPut', Family: 'amilinkbig', Key: `key${String(index).padStart(5, '0')}`, Val: `value number ${index} with some padding to make the line longer` })));
  const lines = await ami.command('database show amilinkbig', { timeoutMs: 30_000 });
  const rows = lines.filter((line) => line.startsWith('/amilinkbig/'));
  const bytes = lines.join('\n').length;
  expect(rows.length === 3000, `${rows.length} of 3000 rows in the output`);
  expect(rows.at(-1).includes('key02999') && rows.at(-1).includes('value number 2999'), `last row: ${rows.at(-1)}`);
  await ami.action({ Action: 'DBDelTree', Family: 'amilinkbig' });
  const functions = await ami.command('core show functions', { timeoutMs: 15_000 });
  const last = functions.filter(Boolean).at(-1) ?? '';
  expect(/\d+ (custom )?functions? installed/i.test(last), `last line of core show functions: ${last}`);
  return `${lines.length} lines, ${bytes} bytes`;
});

await check('500 actions sent at once each get their own answer', async () => {
  const answers = await Promise.all(Array.from({ length: 500 }, (_, index) => ami.action({ Action: 'Getvar', Variable: `AMILINK_N${index}` }).then((reply) => reply.get('Variable'))));
  const wrong = answers.filter((name, index) => name !== `AMILINK_N${index}`).length;
  expect(wrong === 0, `${wrong} answers went to the wrong action`);
});

await check('ten clients at once', async () => {
  const clients = Array.from({ length: 10 }, () => new AmiClient({ ...base, reconnect: false }));
  try {
    await Promise.all(clients.map((client) => client.connect(10_000)));
    const times = await Promise.all(clients.map(async (client) => {
      for (let index = 0; index < 20; index += 1) await client.ping();
      return true;
    }));
    expect(times.every(Boolean), 'a client failed');
  } finally {
    await Promise.all(clients.map((client) => client.close()));
  }
});

// =======================================================================================
// 7. Asterisk restarts under the client
// =======================================================================================
await check('Asterisk restart: in-flight action fails, client reconnects, filters come back', async () => {
  const filtered = new AmiClient({ ...base, filters: [{ event: 'UserEvent' }], reconnect: { minDelayMs: 300, maxDelayMs: 1500 } });
  filtered.on('error', () => {});
  const filteredSeen = [];
  filtered.on('event', (event) => filteredSeen.push(event.event));
  await filtered.connect(10_000);
  expect(ami.connected, 'the main client is not connected before the restart');
  const disconnected = new Promise((resolve) => ami.once('disconnect', resolve));
  let loggedInAt = 0;
  const readyAgain = new Promise((resolve) => {
    ami.once('disconnect', () => ami.once('ready', () => {
      loggedInAt = Date.now();
      resolve();
    }));
  });
  // Asterisk accepts manager logins before its dialplan and modules have
  // loaded, and says when it is done with a FullyBooted event (sent at login
  // too, when it is already done). Calls placed before that can fail.
  let bootedAt = 0;
  const booted = new Promise((resolve) => {
    ami.once('disconnect', () => {
      const off = ami.onEvent('FullyBooted', () => {
        off();
        bootedAt = Date.now();
        resolve();
      });
    });
  });
  const filteredBack = new Promise((resolve) => {
    filtered.once('disconnect', () => filtered.once('ready', resolve));
  });
  // A slow action in flight when the server goes away must fail, not hang.
  const inFlight = ami.command('core restart now', { timeoutMs: 30_000 }).then(() => 'answered', (error) => error);
  await Promise.race([disconnected, sleep(30_000).then(() => { throw new Error('Asterisk did not go away within 30 s'); })]);
  const outcome = await inFlight;
  expect(outcome === 'answered' || outcome instanceof AmiConnectionError, `in-flight action ended with ${outcome}`);
  const restartAt = Date.now();
  await Promise.race([readyAgain, sleep(90_000).then(() => { throw new Error('no reconnect within 90 s'); })]);
  await Promise.race([filteredBack, sleep(30_000).then(() => { throw new Error('filtered client did not reconnect'); })]);
  await Promise.race([booted, sleep(90_000).then(() => { throw new Error('no FullyBooted after the restart'); })]);
  await ami.ping();
  filteredSeen.length = 0;
  await call('vars', 'Wait', '1');
  await sleep(500);
  await filtered.close();
  const others = filteredSeen.filter((name) => name !== 'UserEvent');
  expect(filteredSeen.includes('UserEvent'), 'the filtered client got no UserEvent after the restart');
  expect(others.length === 0, `the filter was lost: also got ${[...new Set(others)].join(', ')}`);
  return `logged in again after ${loggedInAt - restartAt} ms, FullyBooted after ${bootedAt - restartAt} ms; in-flight action: ${outcome === 'answered' ? 'answered before the restart' : 'rejected'}`;
});

// =======================================================================================
// 8. Every event seen, compared with the library's types
// =======================================================================================
await check('every event seen has a name the library knows', async () => {
  const unknown = [...seen.keys()].filter((name) => !EVENT_NAMES.has(name.toLowerCase()));
  if (unknown.length) finding('events this server sent that the library has no type for', unknown.sort());
  return `${seen.size} kinds seen, ${[...seen.values()].reduce((sum, entry) => sum + entry.count, 0)} events; ${unknown.length} unknown`;
});
await check('fields: headers real events carry that their type does not list', async () => {
  const gaps = {};
  for (const [name, entry] of seen) {
    if (name === 'UserEvent') continue; // carries whatever the dialplan put in it
    const typed = TYPED_FIELDS.get(name);
    if (!typed) continue;
    const typedLower = new Set([...typed, ...COMMON_FIELDS].map((field) => field.toLowerCase()));
    const missing = [...entry.headers].filter((header) => !ALWAYS_ALLOWED.has(header.toLowerCase()) && !typedLower.has(header.toLowerCase()));
    if (missing.length) gaps[name] = missing.sort();
  }
  const count = Object.keys(gaps).length;
  if (count) finding('event headers seen that the event type does not list', gaps);
  return `${count} event types with untyped headers`;
});

await ami.close();

// ---- report ---------------------------------------------------------------------------
const counts = results.reduce((sum, result) => ({ ...sum, [result.status]: (sum[result.status] ?? 0) + 1 }), {});
console.log(`\n${counts.ok ?? 0} ok, ${counts.FAIL ?? 0} failed, ${counts.skip ?? 0} skipped, ${findings.length} findings`);
for (const item of findings) console.log(`finding: ${item.topic}: ${JSON.stringify(item.detail)}`);
if (clientErrors.length) console.log(`client 'error' events: ${clientErrors.length} (first: ${clientErrors[0]})`);
const file = process.env.RESULT_FILE ?? join(root, 'lab', 'results', `asterisk-${version}.json`);
mkdirSync(dirname(file), { recursive: true });
writeFileSync(file, `${JSON.stringify({
  asterisk: version,
  major,
  amiVersion: ami.amiVersion,
  when: new Date().toISOString(),
  results,
  findings,
  eventsSeen: Object.fromEntries([...seen].map(([name, entry]) => [name, { count: entry.count, headers: [...entry.headers].sort() }])),
}, null, 1)}\n`);
console.log(`report: ${file}`);
process.exit(counts.FAIL ? 1 : 0);
