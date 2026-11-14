import { createHash } from 'node:crypto';
import { createServer, type AddressInfo, type Server, type Socket } from 'node:net';
import { AmiMessage, AmiParser } from '../../src/index';

type Headers = Record<string, string | string[]>;

/** One client connected to the fake server. */
export class FakeConnection {
  readonly actions: AmiMessage[] = [];
  loggedIn = false;
  private readonly parser = new AmiParser({ expectBanner: false });

  constructor(
    readonly socket: Socket,
    private readonly server: FakeAmi,
  ) {
    socket.on('error', () => {});
    socket.on('data', (chunk) => {
      for (const item of this.parser.feed(chunk)) {
        if (item.kind !== 'message') continue;
        this.actions.push(item.message);
        this.server.handle(item.message, this);
      }
    });
  }

  /** Send one message. */
  send(headers: Headers): void {
    const lines: string[] = [];
    for (const [name, value] of Object.entries(headers)) {
      for (const item of Array.isArray(value) ? value : [value]) lines.push(`${name}: ${item}`);
    }
    this.socket.write(lines.join('\r\n') + '\r\n\r\n');
  }

  /** Send bytes exactly as given. */
  raw(text: string | Buffer): void {
    this.socket.write(text);
  }

  /** Answer an action, echoing its ActionID as Asterisk does. */
  reply(action: AmiMessage, headers: Headers): void {
    const { Response, ...rest } = headers;
    this.send({ Response: Response ?? 'Success', ActionID: action.actionId ?? '', ...rest });
  }

  close(): void {
    this.socket.destroy();
  }
}

/**
 * A small AMI server for tests. It greets, checks the login (plain or MD5),
 * answers Ping, Logoff and Command, and hands every other action to `onAction`.
 */
export class FakeAmi {
  readonly connections: FakeConnection[] = [];
  banner: string | null = 'Asterisk Call Manager/12.0.0';
  username = 'admin';
  secret = 'secret';
  challenge = '840415273';
  /** When true the server reads actions but answers nothing. */
  silent = false;
  /** Return true to say the action was handled. */
  onAction: ((action: AmiMessage, connection: FakeConnection) => boolean | void) | undefined;
  private readonly server: Server;

  constructor() {
    this.server = createServer((socket) => {
      const connection = new FakeConnection(socket, this);
      this.connections.push(connection);
      if (this.banner !== null) socket.write(`${this.banner}\r\n`);
    });
  }

  get port(): number {
    return (this.server.address() as AddressInfo).port;
  }

  /** The connection opened most recently. */
  get last(): FakeConnection {
    const connection = this.connections[this.connections.length - 1];
    if (!connection) throw new Error('no client has connected');
    return connection;
  }

  listen(port = 0): Promise<void> {
    return new Promise((resolve) => this.server.listen(port, '127.0.0.1', resolve));
  }

  async close(): Promise<void> {
    for (const connection of this.connections) connection.close();
    await new Promise<void>((resolve) => this.server.close(() => resolve()));
  }

  /** Drop every client but keep listening. */
  dropClients(): void {
    for (const connection of this.connections) connection.close();
  }

  handle(action: AmiMessage, connection: FakeConnection): void {
    if (this.silent) return;
    if (this.onAction?.(action, connection)) return;
    const name = action.get('Action')?.toLowerCase();
    if (name === 'challenge') {
      connection.reply(action, { Challenge: this.challenge });
    } else if (name === 'login') {
      const key = createHash('md5').update(this.challenge + this.secret).digest('hex');
      const ok =
        action.get('Username') === this.username &&
        (action.get('AuthType')?.toLowerCase() === 'md5'
          ? action.get('Key') === key
          : action.get('Secret') === this.secret);
      if (ok) {
        connection.loggedIn = true;
        connection.reply(action, { Message: 'Authentication accepted' });
      } else {
        connection.reply(action, { Response: 'Error', Message: 'Authentication failed' });
        connection.socket.end();
      }
    } else if (name === 'ping') {
      connection.reply(action, { Ping: 'Pong', Timestamp: '1700000000.000000' });
    } else if (name === 'logoff') {
      connection.reply(action, { Response: 'Goodbye', Message: 'Thanks for all the fish.' });
      connection.socket.end();
    } else if (name === 'command') {
      connection.reply(action, { Message: 'Command output follows', Output: ['line one', '  line two', 'line three'] });
    } else {
      connection.reply(action, { Response: 'Error', Message: 'Invalid/unknown command' });
    }
  }
}

export const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/** Wait until `check` returns true, or fail after `timeoutMs`. */
export async function until(check: () => boolean, timeoutMs = 2000): Promise<void> {
  const started = Date.now();
  while (!check()) {
    if (Date.now() - started > timeoutMs) throw new Error('condition not met in time');
    await sleep(5);
  }
}
