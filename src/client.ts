import { createHash, randomBytes } from 'node:crypto';
import { connect as netConnect, type Socket } from 'node:net';
import { connect as tlsConnect, type ConnectionOptions as TlsOptions } from 'node:tls';
import { Emitter } from './emitter';
import { encodeAction, type AmiAction } from './encode';
import {
  AmiActionError,
  AmiAuthError,
  AmiConnectionError,
  AmiError,
  AmiOverflowError,
  AmiTimeoutError,
} from './errors';
import type { AmiTypedAction } from './generated/actions';
import type { AmiEventName } from './generated/events';
import type { AmiEvent, AmiMessage } from './message';
import { AmiParser, type ParsedItem } from './parser';

export type AmiClientState = 'idle' | 'connecting' | 'authenticating' | 'ready' | 'reconnecting' | 'closed';

export interface AmiReconnectOptions {
  /** First wait before reconnecting. Default 500 ms. */
  minDelayMs?: number;
  /** Longest wait between attempts. Default 30 000 ms. */
  maxDelayMs?: number;
  /** The wait is multiplied by this after each failed attempt. Default 2. */
  factor?: number;
  /** Give up after this many failed attempts in a row. Default: never. */
  maxAttempts?: number;
  /**
   * Keep reconnecting after Asterisk refuses the login. Default false: a wrong
   * secret does not fix itself, and retrying it forever only fills the server's log.
   */
  retryOnAuthFailure?: boolean;
}

export interface AmiKeepAliveOptions {
  /** After this long with nothing received, a Ping is sent. Default 15 000 ms. */
  intervalMs?: number;
  /** How long to wait for the Ping's answer before dropping the link. Default 5 000 ms. */
  timeoutMs?: number;
}

/** The parts of a socket the client uses. `net.Socket` and `tls.TLSSocket` both fit. */
export interface AmiSocket {
  on(event: 'data', listener: (chunk: Buffer | string) => void): unknown;
  on(event: 'error', listener: (error: Error) => void): unknown;
  on(event: 'close', listener: () => void): unknown;
  write(data: Uint8Array): boolean;
  destroy(): unknown;
  setKeepAlive?(enable: boolean, initialDelayMs?: number): unknown;
  setNoDelay?(noDelay: boolean): unknown;
}

export interface AmiClientOptions {
  /** Default `127.0.0.1`. */
  host?: string;
  /** Default 5038, or 5039 with `tls`. */
  port?: number;
  username: string;
  secret: string;
  /** Connect over TLS. Pass `true`, or the options for `tls.connect`. */
  tls?: boolean | TlsOptions;
  /**
   * `plain` sends the secret as it is. `md5` asks Asterisk for a challenge and
   * sends a hash, so the secret never crosses the wire. Default `plain`.
   */
  authType?: 'plain' | 'md5';
  /**
   * Which events to receive. `true` for all the user may see, `false` for
   * none (a connection that only sends actions), or a list of manager classes
   * such as `['call', 'agent']`. Default `true`.
   */
  events?: boolean | string | readonly string[];
  /** Time allowed to connect and log in. Default 10 000 ms. */
  connectTimeoutMs?: number;
  /** Time allowed for an action's answer. Default 10 000 ms. */
  actionTimeoutMs?: number;
  /** `false` turns the keep-alive check off. */
  keepAlive?: false | AmiKeepAliveOptions;
  /** `false` turns automatic reconnection off. */
  reconnect?: false | AmiReconnectOptions;
  /** A message larger than this drops the connection. Default 8 MiB. */
  maxMessageBytes?: number;
  /** Text encoding of the stream. Default `utf-8`. */
  encoding?: string;
  /** Supply the socket yourself: for tests, a proxy, or a transport of your own. */
  socketFactory?: () => AmiSocket;
}

export interface AmiActionOptions {
  /** Overrides `actionTimeoutMs` for this action. An Originate that waits for an answer needs more. */
  timeoutMs?: number;
}

export interface AmiListOptions extends AmiActionOptions {
  /**
   * The event that ends the reply, for the few actions that do not mark their
   * reply with `EventList`. Example: `OriginateResponse` for an async Originate.
   */
  completeEvent?: string;
}

/** The whole reply to a list action. */
export interface AmiListResult {
  /** The first response. */
  response: AmiMessage;
  /** The item events, in order. */
  events: AmiMessage[];
  /** The event that ended the list. Absent when the action turned out not to be a list. */
  complete: AmiMessage | undefined;
}

export type AmiEventMatcher = string | RegExp | ((message: AmiMessage) => boolean);

export interface AmiEventStreamOptions {
  /**
   * How many events may wait for the consumer. Past this the stream ends with
   * `AmiOverflowError`, so a slow consumer is seen and not silently behind. Default 10 000.
   */
  maxQueue?: number;
}

export type AmiClientEvents = {
  /** Logged in and usable. Also emitted after every successful reconnect. */
  ready: [info: { amiVersion: string | undefined }];
  /** A usable connection was lost. */
  disconnect: [reason: Error];
  /** A new attempt has been scheduled. */
  reconnecting: [info: { attempt: number; delayMs: number; reason: Error }];
  /** The client has stopped for good: closed by the caller, login refused, or attempts used up. */
  close: [reason: Error | undefined];
  /** Something went wrong. Never thrown, even with no listener. */
  error: [error: Error];
  /** Every event Asterisk sends, in the order received. */
  event: [message: AmiMessage];
  /** A message that is neither an event nor the answer to a waiting action. */
  unmatched: [message: AmiMessage];
  state: [state: AmiClientState, previous: AmiClientState];
};

interface Pending {
  action: string;
  resolve: (value: never) => void;
  reject: (error: Error) => void;
  timer: NodeJS.Timeout;
  list?: { response: AmiMessage | undefined; events: AmiMessage[]; completeEvent: string | undefined };
}

interface Subscription {
  matches: (message: AmiMessage) => boolean;
  handler: (message: AmiMessage) => unknown;
}

function toMatcher(matcher: AmiEventMatcher): (message: AmiMessage) => boolean {
  if (typeof matcher === 'function') return matcher;
  if (matcher instanceof RegExp) return (message) => matcher.test(message.event ?? '');
  if (matcher === '*') return () => true;
  const wanted = matcher.toLowerCase();
  return (message) => message.event?.toLowerCase() === wanted;
}

function asError(value: unknown): Error {
  return value instanceof Error ? value : new Error(String(value));
}

/**
 * A connection to the Asterisk Manager Interface.
 *
 * It logs in, keeps the link alive, reconnects with growing waits, matches
 * every answer to its action by ActionID, and delivers events in the order
 * Asterisk sent them.
 */
export class AmiClient extends Emitter<AmiClientEvents> {
  private readonly options: AmiClientOptions;
  private currentState: AmiClientState = 'idle';
  private socket: AmiSocket | null = null;
  private parser = new AmiParser();
  /** Counts sockets, so a late callback from an old one is ignored. */
  private generation = 0;
  private stopped = true;
  private loginStarted = false;
  private version: string | undefined;
  private attempt = 0;
  private lastError: Error | undefined;
  private authFailure: AmiAuthError | undefined;
  private lastDataAt = 0;
  private pingInFlight = false;
  private connectTimer: NodeJS.Timeout | undefined;
  private reconnectTimer: NodeJS.Timeout | undefined;
  private keepAliveTimer: NodeJS.Timeout | undefined;
  private readonly idPrefix = randomBytes(4).toString('hex');
  private idCounter = 0;
  private readonly pending = new Map<string, Pending>();
  private readonly subscriptions = new Set<Subscription>();
  private readonly readyWaiters = new Set<{ resolve: () => void; reject: (error: Error) => void }>();
  private readonly streams = new Set<{ end: (error?: Error) => void }>();

  constructor(options: AmiClientOptions) {
    super();
    this.options = options;
  }

  get state(): AmiClientState {
    return this.currentState;
  }

  /** True while logged in. */
  get connected(): boolean {
    return this.currentState === 'ready';
  }

  /** The AMI version from Asterisk's greeting, for example `12.0.0`. */
  get amiVersion(): string | undefined {
    return this.version;
  }

  // ---- lifecycle ----------------------------------------------------------------

  /** Begin connecting. Returns at once; listen for `ready`, or use `connect()`. */
  start(): void {
    if (!this.stopped) return;
    this.stopped = false;
    this.attempt = 0;
    this.authFailure = undefined;
    this.open();
  }

  /**
   * Connect and wait until logged in.
   *
   * Rejects when the login is refused, or when reconnection is off (or used
   * up) and the connection fails. With reconnection on, a server that is
   * simply down keeps this pending while the client retries; pass `timeoutMs`
   * to stop waiting. The client keeps trying in the background either way.
   */
  connect(timeoutMs?: number): Promise<void> {
    this.start();
    return this.whenReady(timeoutMs);
  }

  /** Resolves once logged in. Rejects if the client closes first. */
  whenReady(timeoutMs?: number): Promise<void> {
    if (this.currentState === 'ready') return Promise.resolve();
    if (this.stopped) return Promise.reject(new AmiConnectionError('AMI client is not started'));
    return new Promise<void>((resolve, reject) => {
      let timer: NodeJS.Timeout | undefined;
      const waiter = {
        resolve: () => {
          if (timer) clearTimeout(timer);
          resolve();
        },
        reject: (error: Error) => {
          if (timer) clearTimeout(timer);
          reject(error);
        },
      };
      this.readyWaiters.add(waiter);
      if (timeoutMs !== undefined) {
        timer = setTimeout(() => {
          this.readyWaiters.delete(waiter);
          reject(new AmiTimeoutError(`AMI not ready after ${timeoutMs} ms`));
        }, timeoutMs);
      }
    });
  }

  /** Log off and stop. Waiting actions are rejected. The client can be started again. */
  async close(): Promise<void> {
    if (this.stopped && this.currentState !== 'ready') {
      if (this.currentState !== 'closed' && this.currentState !== 'idle') this.finish(undefined);
      return;
    }
    this.stopped = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = undefined;
    const socket = this.socket;
    if (!socket) {
      this.finish(undefined);
      return;
    }
    if (this.currentState === 'ready') {
      try {
        await this.send({ Action: 'Logoff' }, 1000);
      } catch {
        // The link is going away either way.
      }
    }
    if (this.socket === socket) {
      const closed = new Promise<void>((resolve) => this.once('close', () => resolve()));
      socket.destroy();
      await closed;
    }
  }

  private setState(next: AmiClientState): void {
    const previous = this.currentState;
    if (previous === next) return;
    this.currentState = next;
    this.emit('state', next, previous);
  }

  private open(): void {
    const { options } = this;
    const generation = ++this.generation;
    this.setState(this.attempt === 0 ? 'connecting' : 'reconnecting');
    this.parser = new AmiParser({ maxMessageBytes: options.maxMessageBytes, encoding: options.encoding });
    this.loginStarted = false;
    this.lastError = undefined;
    this.version = undefined;

    let socket: AmiSocket;
    try {
      socket = this.createSocket();
    } catch (error) {
      this.lastError = asError(error);
      this.emit('error', this.lastError);
      this.closed(generation);
      return;
    }
    this.socket = socket;
    this.lastDataAt = Date.now();
    socket.setNoDelay?.(true);
    socket.setKeepAlive?.(true, 30_000);

    const timeoutMs = options.connectTimeoutMs ?? 10_000;
    this.connectTimer = setTimeout(() => {
      this.drop(new AmiTimeoutError(`AMI connect and login took longer than ${timeoutMs} ms`), generation);
    }, timeoutMs);

    socket.on('data', (chunk) => {
      if (generation !== this.generation) return;
      this.lastDataAt = Date.now();
      let items: ParsedItem[];
      try {
        items = this.parser.feed(chunk);
      } catch (error) {
        // The stream can no longer be trusted to line up again: start clean.
        this.drop(asError(error), generation);
        return;
      }
      for (const item of items) {
        if (generation !== this.generation) return;
        this.handle(item, generation);
      }
    });
    socket.on('error', (error) => {
      if (generation !== this.generation) return;
      this.lastError = error;
      this.emit('error', error);
    });
    socket.on('close', () => this.closed(generation));
  }

  private createSocket(): AmiSocket {
    const { options } = this;
    if (options.socketFactory) return options.socketFactory();
    const host = options.host ?? '127.0.0.1';
    if (options.tls) {
      const extra = options.tls === true ? {} : options.tls;
      return tlsConnect({ host, port: options.port ?? 5039, ...extra });
    }
    const socket: Socket = netConnect({ host, port: options.port ?? 5038 });
    return socket;
  }

  /** Report an error and drop the current connection. Reconnection follows from `close`. */
  private drop(error: Error, generation: number): void {
    if (generation !== this.generation || !this.socket) return;
    this.lastError = error;
    this.emit('error', error);
    this.socket.destroy();
  }

  private handle(item: ParsedItem, generation: number): void {
    if (item.kind === 'banner') {
      this.version = item.version;
      this.beginLogin(generation);
      return;
    }
    // A proxy may not pass the greeting on. The first message means the link is up.
    if (!this.loginStarted) this.beginLogin(generation);
    this.dispatch(item.message);
  }

  private beginLogin(generation: number): void {
    if (this.loginStarted) return;
    this.loginStarted = true;
    this.setState('authenticating');
    void this.login(generation);
  }

  private async login(generation: number): Promise<void> {
    const { options } = this;
    const timeoutMs = options.connectTimeoutMs ?? 10_000;
    const events =
      options.events === undefined || options.events === true
        ? 'on'
        : options.events === false
          ? 'off'
          : typeof options.events === 'string'
            ? options.events
            : options.events.join(',');
    try {
      if (options.authType === 'md5') {
        const challenge = (await this.send<AmiMessage>({ Action: 'Challenge', AuthType: 'MD5' }, timeoutMs)).get(
          'Challenge',
        );
        if (challenge === undefined) throw new AmiAuthError('Asterisk sent no challenge for MD5 login');
        const key = createHash('md5').update(challenge + options.secret).digest('hex');
        await this.send({ Action: 'Login', AuthType: 'MD5', Username: options.username, Key: key, Events: events }, timeoutMs);
      } else {
        await this.send(
          { Action: 'Login', Username: options.username, Secret: options.secret, Events: events },
          timeoutMs,
        );
      }
    } catch (error) {
      if (generation !== this.generation) return;
      if (error instanceof AmiActionError) {
        this.authFailure = new AmiAuthError(
          `AMI login refused: ${error.response.get('Message') ?? 'no reason given'}`,
          error.response,
        );
        this.drop(this.authFailure, generation);
      } else if (error instanceof AmiAuthError) {
        this.authFailure = error;
        this.drop(error, generation);
      } else if (!(error instanceof AmiConnectionError)) {
        this.drop(asError(error), generation);
      }
      return;
    }
    if (generation !== this.generation) return;
    if (this.connectTimer) clearTimeout(this.connectTimer);
    this.connectTimer = undefined;
    this.attempt = 0;
    this.setState('ready');
    this.startKeepAlive(generation);
    this.emit('ready', { amiVersion: this.version });
    for (const waiter of [...this.readyWaiters]) waiter.resolve();
    this.readyWaiters.clear();
  }

  private closed(generation: number): void {
    if (generation !== this.generation) return;
    this.generation += 1;
    if (this.connectTimer) clearTimeout(this.connectTimer);
    this.connectTimer = undefined;
    this.stopKeepAlive();
    const wasReady = this.currentState === 'ready';
    this.socket = null;

    const reason =
      this.authFailure ?? this.lastError ?? new AmiConnectionError('AMI connection closed by the server');
    // Nothing will ever answer these on this connection: fail them now.
    this.rejectPending(new AmiConnectionError('AMI connection lost', { cause: reason }));
    if (wasReady) this.emit('disconnect', reason);

    if (this.stopped) {
      this.finish(undefined);
      return;
    }
    const reconnect = this.options.reconnect;
    if (this.authFailure && !(reconnect && reconnect.retryOnAuthFailure)) {
      this.finish(this.authFailure);
      return;
    }
    if (reconnect === false) {
      this.finish(reason);
      return;
    }
    const settings = reconnect ?? {};
    if (this.attempt >= (settings.maxAttempts ?? Infinity)) {
      const gaveUp = new AmiConnectionError(`AMI reconnect gave up after ${this.attempt} attempts`, { cause: reason });
      this.emit('error', gaveUp);
      this.finish(gaveUp);
      return;
    }
    const min = settings.minDelayMs ?? 500;
    const max = settings.maxDelayMs ?? 30_000;
    const ceiling = Math.min(max, min * (settings.factor ?? 2) ** this.attempt);
    // Half fixed, half random: many clients cut off together do not return together.
    const delayMs = Math.round(ceiling / 2 + Math.random() * (ceiling / 2));
    this.attempt += 1;
    this.setState('reconnecting');
    this.emit('reconnecting', { attempt: this.attempt, delayMs, reason });
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined;
      if (!this.stopped) this.open();
    }, delayMs);
  }

  /** The client has stopped for good. */
  private finish(reason: Error | undefined): void {
    this.stopped = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.reconnectTimer = undefined;
    this.setState('closed');
    const error = reason ?? new AmiConnectionError('AMI client closed');
    for (const waiter of [...this.readyWaiters]) waiter.reject(error);
    this.readyWaiters.clear();
    for (const stream of [...this.streams]) stream.end();
    this.emit('close', reason);
  }

  // ---- keep-alive ---------------------------------------------------------------

  private startKeepAlive(generation: number): void {
    const settings = this.options.keepAlive;
    if (settings === false) return;
    const intervalMs = settings?.intervalMs ?? 15_000;
    const timeoutMs = settings?.timeoutMs ?? 5_000;
    if (intervalMs <= 0) return;
    this.keepAliveTimer = setInterval(
      () => {
        if (generation !== this.generation || this.currentState !== 'ready' || this.pingInFlight) return;
        if (Date.now() - this.lastDataAt < intervalMs) return;
        this.pingInFlight = true;
        this.send({ Action: 'Ping' }, timeoutMs)
          .catch((error: unknown) => {
            // The socket still says open, but nothing answers: the link is dead.
            if (error instanceof AmiTimeoutError) {
              this.drop(new AmiTimeoutError(`AMI link is silent: no answer to Ping in ${timeoutMs} ms`), generation);
            }
          })
          .finally(() => {
            this.pingInFlight = false;
          });
      },
      Math.max(20, Math.floor(intervalMs / 2)),
    );
    this.keepAliveTimer.unref();
  }

  private stopKeepAlive(): void {
    if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = undefined;
    this.pingInFlight = false;
  }

  // ---- actions ------------------------------------------------------------------

  /**
   * Send a documented action and wait for its response. The action name and
   * its parameters are checked and completed by the editor.
   * Rejects with `AmiActionError` when Asterisk answers `Response: Error`.
   */
  action(action: AmiTypedAction, options?: AmiActionOptions): Promise<AmiMessage> {
    return this.rawAction(action as unknown as AmiAction, options);
  }

  /** Like `action`, for anything not in the catalogue: a custom module, or a newer Asterisk. */
  rawAction(action: AmiAction, options: AmiActionOptions = {}): Promise<AmiMessage> {
    if (this.currentState !== 'ready') return Promise.reject(this.notReady());
    return this.send(action, options.timeoutMs ?? this.options.actionTimeoutMs ?? 10_000);
  }

  /**
   * Send an action whose reply is a list of events (QueueStatus,
   * CoreShowChannels, PJSIPShowEndpoints...) and wait for the whole list.
   * The list events are returned here and are not emitted as ordinary events.
   */
  list(action: AmiTypedAction, options?: AmiListOptions): Promise<AmiListResult> {
    return this.rawList(action as unknown as AmiAction, options);
  }

  /** Like `list`, for anything not in the catalogue. */
  rawList(action: AmiAction, options: AmiListOptions = {}): Promise<AmiListResult> {
    if (this.currentState !== 'ready') return Promise.reject(this.notReady());
    return this.send(action, options.timeoutMs ?? this.options.actionTimeoutMs ?? 10_000, {
      response: undefined,
      events: [],
      completeEvent: options.completeEvent?.toLowerCase(),
    });
  }

  /** Run an Asterisk console command and return its output, one entry per line. */
  async command(command: string, options?: AmiActionOptions): Promise<string[]> {
    return (await this.rawAction({ Action: 'Command', Command: command }, options)).output;
  }

  /** Check the link. Resolves with the round-trip time in milliseconds. */
  async ping(options?: AmiActionOptions): Promise<number> {
    const started = Date.now();
    await this.rawAction({ Action: 'Ping' }, options);
    return Date.now() - started;
  }

  private notReady(): AmiConnectionError {
    return new AmiConnectionError(`AMI is not connected (state: ${this.currentState})`);
  }

  private send<T = AmiMessage>(action: AmiAction, timeoutMs: number, list?: Pending['list']): Promise<T> {
    const socket = this.socket;
    if (!socket) return Promise.reject(this.notReady());
    if ('ActionID' in action || 'actionid' in action) {
      return Promise.reject(new TypeError('ActionID is set by the client; do not pass one'));
    }
    const id = `${this.idPrefix}-${++this.idCounter}`;
    let bytes: Buffer;
    try {
      bytes = encodeAction({ ...action, ActionID: id });
    } catch (error) {
      return Promise.reject(asError(error));
    }
    return new Promise<T>((resolve, reject) => {
      const timer = setTimeout(() => {
        this.pending.delete(id);
        reject(new AmiTimeoutError(`AMI action ${action.Action} got no answer in ${timeoutMs} ms`));
      }, timeoutMs);
      this.pending.set(id, { action: action.Action, resolve: resolve as (value: never) => void, reject, timer, list });
      socket.write(bytes);
    });
  }

  private settle(id: string): Pending | undefined {
    const entry = this.pending.get(id);
    if (!entry) return undefined;
    clearTimeout(entry.timer);
    this.pending.delete(id);
    return entry;
  }

  private rejectPending(error: Error): void {
    for (const id of [...this.pending.keys()]) this.settle(id)?.reject(error);
  }

  private dispatch(message: AmiMessage): void {
    const id = message.actionId;
    const entry = id === undefined ? undefined : this.pending.get(id);

    // Checked before `Response`: some events carry both headers (OriginateResponse).
    if (message.isEvent) {
      if (entry?.list && id !== undefined) {
        const marker = message.get('EventList')?.toLowerCase();
        const ends =
          marker === 'complete' ||
          marker === 'cancelled' ||
          (entry.list.completeEvent !== undefined && message.event?.toLowerCase() === entry.list.completeEvent);
        if (!ends) {
          entry.list.events.push(message);
          return;
        }
        const { response, events } = entry.list;
        const result: AmiListResult = { response: response ?? message, events, complete: message };
        (this.settle(id)?.resolve as ((value: AmiListResult) => void) | undefined)?.(result);
        return;
      }
      this.emit('event', message);
      for (const subscription of [...this.subscriptions]) {
        let wanted = false;
        try {
          wanted = subscription.matches(message);
        } catch (error) {
          this.emit('error', asError(error));
        }
        if (wanted) this.run('event', subscription.handler, [message]);
      }
      return;
    }

    if (message.isResponse) {
      if (!entry || id === undefined) {
        this.emit('unmatched', message);
        return;
      }
      const status = message.response?.toLowerCase();
      if (status === 'error' || status === 'fail' || status === 'failure') {
        this.settle(id)?.reject(new AmiActionError(entry.action, message));
        return;
      }
      if (!entry.list) {
        (this.settle(id)?.resolve as ((value: AmiMessage) => void) | undefined)?.(message);
        return;
      }
      entry.list.response = message;
      const marker = message.get('EventList')?.toLowerCase();
      // Only Asterisk's own marker, or the caller's word, makes this a list.
      // Guessing from the Message text is what breaks other clients.
      if (marker === 'start' || entry.list.completeEvent !== undefined) return;
      const result: AmiListResult = { response: message, events: [], complete: undefined };
      (this.settle(id)?.resolve as ((value: AmiListResult) => void) | undefined)?.(result);
      return;
    }

    this.emit('unmatched', message);
  }

  // ---- events -------------------------------------------------------------------

  /**
   * Listen for one event by name. The name is completed by the editor, and the
   * handler's `event.fields` is typed for that event. Names ignore case.
   * Returns a function that removes the listener.
   */
  onEvent<N extends AmiEventName>(name: N, handler: (event: AmiEvent<N>) => unknown): () => void;
  /** Listen for events by any name (`'*'` for all), a pattern, or a test function. */
  onEvent(matcher: AmiEventMatcher, handler: (event: AmiMessage) => unknown): () => void;
  onEvent(matcher: AmiEventMatcher, handler: (event: never) => unknown): () => void {
    const subscription: Subscription = {
      matches: toMatcher(matcher),
      handler: handler as (message: AmiMessage) => unknown,
    };
    this.subscriptions.add(subscription);
    return () => {
      this.subscriptions.delete(subscription);
    };
  }

  /**
   * Events as an async stream: `for await (const event of client.events('Hangup'))`.
   *
   * Use this when handling an event takes time. Events are handed over one at
   * a time and in order, however long each takes. The stream lives across
   * reconnects and ends when the client closes.
   */
  events<N extends AmiEventName>(name: N, options?: AmiEventStreamOptions): AsyncIterableIterator<AmiEvent<N>>;
  events(matcher?: AmiEventMatcher, options?: AmiEventStreamOptions): AsyncIterableIterator<AmiMessage>;
  events(matcher: AmiEventMatcher = '*', options: AmiEventStreamOptions = {}): AsyncIterableIterator<AmiMessage> {
    const maxQueue = options.maxQueue ?? 10_000;
    const queue: AmiMessage[] = [];
    let waiting: { resolve: (result: IteratorResult<AmiMessage>) => void; reject: (error: Error) => void } | undefined;
    let ended = false;
    let failure: Error | undefined;

    const stream = {
      end: (error?: Error): void => {
        if (ended) return;
        ended = true;
        failure = error;
        unsubscribe();
        this.streams.delete(stream);
        if (!waiting) return;
        const { resolve, reject } = waiting;
        waiting = undefined;
        if (error) reject(error);
        else resolve({ value: undefined, done: true });
      },
    };
    const unsubscribe = this.onEvent(matcher, (message: AmiMessage) => {
      if (waiting) {
        const { resolve } = waiting;
        waiting = undefined;
        resolve({ value: message, done: false });
        return;
      }
      if (queue.length >= maxQueue) {
        stream.end(new AmiOverflowError(`AMI event stream fell more than ${maxQueue} events behind`));
        return;
      }
      queue.push(message);
    });
    this.streams.add(stream);

    const iterator: AsyncIterableIterator<AmiMessage> = {
      next: () => {
        const message = queue.shift();
        if (message) return Promise.resolve({ value: message, done: false });
        if (ended) {
          if (failure) {
            const error = failure;
            failure = undefined;
            return Promise.reject(error);
          }
          return Promise.resolve({ value: undefined, done: true });
        }
        return new Promise((resolve, reject) => {
          waiting = { resolve, reject };
        });
      },
      return: () => {
        queue.length = 0;
        stream.end();
        return Promise.resolve({ value: undefined, done: true });
      },
      [Symbol.asyncIterator]() {
        return iterator;
      },
    };
    return iterator;
  }
}

export { AmiError };
