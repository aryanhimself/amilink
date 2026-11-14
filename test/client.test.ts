import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  AmiActionError,
  AmiAuthError,
  AmiClient,
  AmiConnectionError,
  AmiOverflowError,
  AmiProtocolError,
  AmiTimeoutError,
  type AmiClientOptions,
  type AmiMessage,
} from '../src/index';
import { FakeAmi, sleep, until } from './support/fake-ami';

let server: FakeAmi;
const clients: AmiClient[] = [];

function client(options: Partial<AmiClientOptions> = {}): AmiClient {
  const created = new AmiClient({
    host: '127.0.0.1',
    port: server.port,
    username: 'admin',
    secret: 'secret',
    reconnect: { minDelayMs: 10, maxDelayMs: 40 },
    ...options,
  });
  clients.push(created);
  return created;
}

beforeEach(async () => {
  server = new FakeAmi();
  await server.listen();
});

afterEach(async () => {
  for (const created of clients.splice(0)) await created.close();
  await server.close();
});

describe('connecting', () => {
  it('logs in and reports the AMI version', async () => {
    const ami = client();
    const ready: unknown[] = [];
    ami.on('ready', (info) => ready.push(info));
    await ami.connect();
    expect(ami.state).toBe('ready');
    expect(ami.connected).toBe(true);
    expect(ami.amiVersion).toBe('12.0.0');
    expect(ready).toEqual([{ amiVersion: '12.0.0' }]);
    expect(server.last.actions[0]?.get('Events')).toBe('on');
  });

  it('logs in with an MD5 challenge without sending the secret', async () => {
    const ami = client({ authType: 'md5' });
    await ami.connect();
    const sent = server.last.actions.map((action) => action.toObject());
    expect(sent.map((action) => action.Action)).toEqual(['Challenge', 'Login']);
    expect(JSON.stringify(sent)).not.toContain('secret');
    expect(server.last.loggedIn).toBe(true);
  });

  it('sends the chosen event classes', async () => {
    const ami = client({ events: ['call', 'agent'] });
    await ami.connect();
    expect(server.last.actions[0]?.get('Events')).toBe('call,agent');
    await ami.close();
    const quiet = client({ events: false });
    await quiet.connect();
    expect(server.last.actions[0]?.get('Events')).toBe('off');
  });

  it('stops, and does not retry, when the login is refused', async () => {
    const ami = client({ secret: 'wrong' });
    const errors: Error[] = [];
    ami.on('error', (error) => errors.push(error));
    await expect(ami.connect()).rejects.toBeInstanceOf(AmiAuthError);
    await sleep(100);
    expect(ami.state).toBe('closed');
    expect(server.connections).toHaveLength(1);
    expect(errors.some((error) => error instanceof AmiAuthError)).toBe(true);
  });

  it('rejects at once when reconnection is off and nothing listens', async () => {
    const port = server.port;
    await server.close();
    const ami = new AmiClient({ host: '127.0.0.1', port, username: 'a', secret: 'b', reconnect: false });
    clients.push(ami);
    await expect(ami.connect()).rejects.toBeInstanceOf(Error);
    expect(ami.state).toBe('closed');
    server = new FakeAmi();
    await server.listen();
  });

  it('gives up after the allowed number of attempts', async () => {
    const port = server.port;
    await server.close();
    const ami = new AmiClient({
      host: '127.0.0.1',
      port,
      username: 'a',
      secret: 'b',
      reconnect: { minDelayMs: 5, maxDelayMs: 10, maxAttempts: 3 },
    });
    clients.push(ami);
    const attempts: number[] = [];
    ami.on('reconnecting', (info) => attempts.push(info.attempt));
    await expect(ami.connect()).rejects.toBeInstanceOf(AmiConnectionError);
    expect(attempts).toEqual([1, 2, 3]);
    server = new FakeAmi();
    await server.listen();
  });

  it('times out when the server accepts but never greets', async () => {
    server.banner = null;
    server.silent = true;
    const ami = client({ connectTimeoutMs: 60, reconnect: false });
    await expect(ami.connect()).rejects.toBeInstanceOf(AmiTimeoutError);
  });

  it('does not throw when an error has no listener', async () => {
    const ami = client({ secret: 'wrong' });
    await expect(ami.connect()).rejects.toBeInstanceOf(AmiAuthError);
  });
});

describe('actions', () => {
  it('resolves with the response', async () => {
    const ami = client();
    await ami.connect();
    const response = await ami.action({ Action: 'Ping' });
    expect(response.get('Ping')).toBe('Pong');
    expect(await ami.ping()).toBeGreaterThanOrEqual(0);
  });

  it('rejects with the response when Asterisk answers Error', async () => {
    const ami = client();
    await ami.connect();
    const failure = await ami.rawAction({ Action: 'NoSuchThing' }).catch((error: unknown) => error);
    expect(failure).toBeInstanceOf(AmiActionError);
    expect((failure as AmiActionError).response.get('Message')).toBe('Invalid/unknown command');
    expect((failure as AmiActionError).action).toBe('NoSuchThing');
  });

  it('matches answers to actions by ActionID, with events in between', async () => {
    server.onAction = (action, connection) => {
      if (action.get('Action') !== 'Getvar') return false;
      // Answer in the opposite order, with an unrelated event in between.
      setTimeout(
        () => {
          connection.send({ Event: 'Newchannel', Channel: 'PJSIP/1' });
          connection.reply(action, { Variable: action.get('Variable') ?? '', Value: `value-of-${action.get('Variable')}` });
        },
        action.get('Variable') === 'FIRST' ? 40 : 5,
      );
      return true;
    };
    const ami = client();
    await ami.connect();
    const [first, second] = await Promise.all([
      ami.action({ Action: 'Getvar', Variable: 'FIRST' }),
      ami.action({ Action: 'Getvar', Variable: 'SECOND' }),
    ]);
    expect(first.get('Value')).toBe('value-of-FIRST');
    expect(second.get('Value')).toBe('value-of-SECOND');
  });

  it('times out an action, and forgets it', async () => {
    server.onAction = (action) => action.get('Action') === 'Getvar';
    const ami = client();
    await ami.connect();
    await expect(ami.action({ Action: 'Getvar', Variable: 'X' }, { timeoutMs: 40 })).rejects.toBeInstanceOf(
      AmiTimeoutError,
    );
    expect(ami.connected).toBe(true);
    expect((await ami.action({ Action: 'Ping' })).response).toBe('Success');
  });

  it('reports a late answer as unmatched and stays healthy', async () => {
    server.onAction = (action, connection) => {
      if (action.get('Action') !== 'Getvar') return false;
      setTimeout(() => connection.reply(action, { Value: 'late' }), 80);
      return true;
    };
    const ami = client();
    const unmatched: AmiMessage[] = [];
    ami.on('unmatched', (message) => unmatched.push(message));
    await ami.connect();
    await expect(ami.action({ Action: 'Getvar', Variable: 'X' }, { timeoutMs: 20 })).rejects.toBeInstanceOf(
      AmiTimeoutError,
    );
    await until(() => unmatched.length === 1);
    expect(unmatched[0]?.get('Value')).toBe('late');
  });

  it('refuses to send before it is connected', async () => {
    const ami = client();
    await expect(ami.action({ Action: 'Ping' })).rejects.toBeInstanceOf(AmiConnectionError);
  });

  it('refuses a caller-supplied ActionID', async () => {
    const ami = client();
    await ami.connect();
    await expect(ami.rawAction({ Action: 'Ping', ActionID: 'mine' })).rejects.toBeInstanceOf(TypeError);
  });

  it('refuses a value that would inject a second action', async () => {
    const ami = client();
    await ami.connect();
    const before = server.last.actions.length;
    await expect(
      ami.action({ Action: 'Setvar', Variable: 'X', Value: 'v\r\n\r\nAction: Command\r\nCommand: core stop now' }),
    ).rejects.toBeInstanceOf(TypeError);
    await sleep(20);
    expect(server.last.actions.length).toBe(before);
  });

  it('returns command output as lines', async () => {
    const ami = client();
    await ami.connect();
    expect(await ami.command('core show uptime')).toEqual(['line one', '  line two', 'line three']);
  });

  it('fails waiting actions the moment the connection drops', async () => {
    server.onAction = (action) => action.get('Action') === 'Getvar';
    const ami = client();
    await ami.connect();
    const waiting = ami.action({ Action: 'Getvar', Variable: 'X' }, { timeoutMs: 5000 });
    const started = Date.now();
    server.dropClients();
    await expect(waiting).rejects.toBeInstanceOf(AmiConnectionError);
    expect(Date.now() - started).toBeLessThan(1000);
  });
});

describe('lists', () => {
  const queueStatus = (action: AmiMessage, connection: FakeAmi['last']): boolean => {
    if (action.get('Action') !== 'QueueStatus') return false;
    const id = action.actionId ?? '';
    connection.reply(action, { EventList: 'start', Message: 'Queue status will follow' });
    connection.send({ Event: 'QueueParams', Queue: 'support', ActionID: id });
    connection.send({ Event: 'Newchannel', Channel: 'PJSIP/9' });
    connection.send({ Event: 'QueueMember', Queue: 'support', Name: 'PJSIP/101', Paused: '1', ActionID: id });
    connection.send({ Event: 'QueueMember', Queue: 'support', Name: 'PJSIP/102', Paused: '0', ActionID: id });
    connection.send({ Event: 'QueueStatusComplete', ActionID: id, EventList: 'Complete', ListItems: '3' });
    return true;
  };

  it('collects the items and leaves other events alone', async () => {
    server.onAction = queueStatus;
    const ami = client();
    const seen: string[] = [];
    ami.on('event', (event) => seen.push(event.event ?? ''));
    await ami.connect();
    const result = await ami.list({ Action: 'QueueStatus' });
    expect(result.response.get('EventList')).toBe('start');
    expect(result.events.map((event) => event.event)).toEqual(['QueueParams', 'QueueMember', 'QueueMember']);
    expect(result.complete?.get('ListItems')).toBe('3');
    expect(seen).toEqual(['Newchannel']);
  });

  it('returns an empty list when the action is not a list', async () => {
    const ami = client();
    await ami.connect();
    const result = await ami.list({ Action: 'Ping' });
    expect(result.events).toEqual([]);
    expect(result.complete).toBeUndefined();
    expect(result.response.get('Ping')).toBe('Pong');
  });

  it('does not take "Command output follows" for a list', async () => {
    const ami = client();
    await ami.connect();
    const result = await ami.list({ Action: 'Command', Command: 'core show uptime' }, { timeoutMs: 200 });
    expect(result.response.output).toHaveLength(3);
  });

  it('rejects when the list action fails', async () => {
    const ami = client();
    await ami.connect();
    await expect(ami.rawList({ Action: 'NoSuchList' })).rejects.toBeInstanceOf(AmiActionError);
  });

  it('waits for a named event when the reply is not marked as a list', async () => {
    server.onAction = (action, connection) => {
      if (action.get('Action') !== 'Originate') return false;
      connection.reply(action, { Message: 'Originate successfully queued' });
      setTimeout(
        () => connection.send({ Event: 'OriginateResponse', ActionID: action.actionId ?? '', Response: 'Success', Uniqueid: '1.5' }),
        20,
      );
      return true;
    };
    const ami = client();
    await ami.connect();
    const result = await ami.list(
      { Action: 'Originate', Channel: 'PJSIP/101', Application: 'Playback', Data: 'beep', Async: 'true' },
      { completeEvent: 'OriginateResponse' },
    );
    expect(result.complete?.get('Uniqueid')).toBe('1.5');
  });
});

describe('events', () => {
  it('delivers events in order, by name whatever the case', async () => {
    const ami = client();
    await ami.connect();
    const all: string[] = [];
    const pauses: string[] = [];
    ami.onEvent('*', (event) => all.push(event.event ?? ''));
    const off = ami.onEvent('QueueMemberPause', (event) => pauses.push(`${event.fields.Interface}:${event.fields.Paused}`));
    server.last.send({ Event: 'QueueMemberPause', Interface: 'PJSIP/101', Paused: '1' });
    server.last.send({ Event: 'Hangup', Cause: '16' });
    server.last.send({ Event: 'queuememberpause', Interface: 'PJSIP/101', Paused: '0' });
    await until(() => all.length === 3);
    expect(all).toEqual(['QueueMemberPause', 'Hangup', 'queuememberpause']);
    expect(pauses).toEqual(['PJSIP/101:1', 'PJSIP/101:0']);
    off();
    server.last.send({ Event: 'QueueMemberPause', Interface: 'PJSIP/101', Paused: '1' });
    await until(() => all.length === 4);
    expect(pauses).toHaveLength(2);
  });

  it('matches by pattern and by test function', async () => {
    const ami = client();
    await ami.connect();
    const byPattern: string[] = [];
    const byTest: string[] = [];
    ami.onEvent(/^Queue/, (event) => byPattern.push(event.event ?? ''));
    ami.onEvent(
      (event) => event.get('Queue') === 'support',
      (event) => byTest.push(event.event ?? ''),
    );
    server.last.send({ Event: 'QueueCallerJoin', Queue: 'sales' });
    server.last.send({ Event: 'AgentCalled', Queue: 'support' });
    server.last.send({ Event: 'Hangup' });
    await sleep(40);
    expect(byPattern).toEqual(['QueueCallerJoin']);
    expect(byTest).toEqual(['AgentCalled']);
  });

  it('keeps going when a listener throws or rejects', async () => {
    const ami = client();
    await ami.connect();
    const errors: string[] = [];
    const seen: string[] = [];
    ami.on('error', (error) => errors.push(error.message));
    ami.onEvent('*', () => {
      throw new Error('sync failure');
    });
    ami.onEvent('*', async () => {
      throw new Error('async failure');
    });
    ami.onEvent('*', (event) => seen.push(event.event ?? ''));
    server.last.send({ Event: 'A' });
    server.last.send({ Event: 'B' });
    await until(() => seen.length === 2 && errors.length === 4);
    expect(seen).toEqual(['A', 'B']);
    expect(errors.sort()).toEqual(['async failure', 'async failure', 'sync failure', 'sync failure']);
    expect(ami.connected).toBe(true);
  });

  it('streams events one at a time, in order, to a slow consumer', async () => {
    const ami = client();
    await ami.connect();
    const stream = ami.events('Hangup');
    for (let i = 0; i < 5; i += 1) server.last.send({ Event: 'Hangup', Cause: String(i) });
    server.last.send({ Event: 'Newchannel' });
    const causes: string[] = [];
    for await (const event of stream) {
      await sleep(5);
      causes.push(event.fields.Cause ?? '');
      if (causes.length === 5) break;
    }
    expect(causes).toEqual(['0', '1', '2', '3', '4']);
  });

  it('ends a stream with an error when the consumer falls too far behind', async () => {
    const ami = client();
    await ami.connect();
    const stream = ami.events('*', { maxQueue: 3 });
    for (let i = 0; i < 10; i += 1) server.last.send({ Event: 'Hangup', Cause: String(i) });
    await sleep(50);
    const got: string[] = [];
    const failure = await (async () => {
      try {
        for await (const event of stream) got.push(event.get('Cause') ?? '');
      } catch (error) {
        return error;
      }
      return undefined;
    })();
    expect(got).toEqual(['0', '1', '2']);
    expect(failure).toBeInstanceOf(AmiOverflowError);
  });

  it('ends a stream when the client closes', async () => {
    const ami = client();
    await ami.connect();
    const stream = ami.events();
    const next = stream.next();
    await ami.close();
    expect(await next).toEqual({ value: undefined, done: true });
  });
});

describe('staying connected', () => {
  it('reconnects after the server drops the link, and is usable again', async () => {
    const ami = client();
    const log: string[] = [];
    ami.on('disconnect', () => log.push('disconnect'));
    ami.on('reconnecting', () => log.push('reconnecting'));
    ami.on('ready', () => log.push('ready'));
    await ami.connect();
    server.dropClients();
    await until(() => log.filter((entry) => entry === 'ready').length === 2);
    expect(log).toEqual(['ready', 'disconnect', 'reconnecting', 'ready']);
    expect(server.connections).toHaveLength(2);
    expect((await ami.action({ Action: 'Ping' })).get('Ping')).toBe('Pong');
  });

  it('keeps listeners across a reconnect', async () => {
    const ami = client();
    const seen: string[] = [];
    ami.onEvent('Hangup', (event) => seen.push(event.fields.Cause ?? ''));
    await ami.connect();
    server.last.send({ Event: 'Hangup', Cause: '1' });
    await until(() => seen.length === 1);
    server.dropClients();
    await until(() => server.connections.length === 2 && ami.connected);
    server.last.send({ Event: 'Hangup', Cause: '2' });
    await until(() => seen.length === 2);
    expect(seen).toEqual(['1', '2']);
  });

  it('notices a link that has gone silent and reconnects', async () => {
    const ami = client({ keepAlive: { intervalMs: 40, timeoutMs: 40 }, connectTimeoutMs: 100 });
    const errors: Error[] = [];
    ami.on('error', (error) => errors.push(error));
    await ami.connect();
    server.silent = true;
    await until(() => server.connections.length >= 2, 3000);
    expect(errors.some((error) => error instanceof AmiTimeoutError)).toBe(true);
    server.silent = false;
    await until(() => ami.connected, 3000);
  });

  it('does not ping while traffic is flowing', async () => {
    const ami = client({ keepAlive: { intervalMs: 60, timeoutMs: 60 } });
    await ami.connect();
    const timer = setInterval(() => server.last.send({ Event: 'Tick' }), 10);
    await sleep(250);
    clearInterval(timer);
    expect(server.last.actions.filter((action) => action.get('Action') === 'Ping')).toHaveLength(0);
  });

  it('drops the link and reconnects when the server sends something too large', async () => {
    const ami = client({ maxMessageBytes: 512 });
    const errors: Error[] = [];
    ami.on('error', (error) => errors.push(error));
    await ami.connect();
    server.last.raw(`Event: Huge\r\nData: ${'x'.repeat(4096)}\r\n\r\n`);
    await until(() => server.connections.length === 2 && ami.connected);
    expect(errors.some((error) => error instanceof AmiProtocolError)).toBe(true);
  });

  it('logs off and stops when closed, and can be started again', async () => {
    const ami = client();
    const closed: unknown[] = [];
    ami.on('close', (reason) => closed.push(reason));
    await ami.connect();
    await ami.close();
    expect(ami.state).toBe('closed');
    expect(closed).toEqual([undefined]);
    expect(server.last.actions.at(-1)?.get('Action')).toBe('Logoff');
    await sleep(60);
    expect(server.connections).toHaveLength(1);
    await ami.connect();
    expect(ami.connected).toBe(true);
    expect(server.connections).toHaveLength(2);
  });

  it('works when the greeting and login answer arrive byte by byte', async () => {
    server.banner = null;
    server.onAction = (action, connection) => {
      if (action.get('Action') !== 'Login') return false;
      const text = `Response: Success\r\nActionID: ${action.actionId}\r\nMessage: Authentication accepted\r\n\r\n`;
      void (async () => {
        for (const byte of Buffer.from(text)) {
          connection.raw(Buffer.from([byte]));
          await sleep(0);
        }
      })();
      return true;
    };
    const ami = client();
    const connecting = ami.connect();
    await until(() => server.connections.length === 1);
    for (const byte of Buffer.from('Asterisk Call Manager/9.0.0\r\n')) {
      server.last.raw(Buffer.from([byte]));
      await sleep(0);
    }
    await connecting;
    expect(ami.amiVersion).toBe('9.0.0');
  });
});
