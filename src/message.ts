import type { AmiEventMap, AmiEventName } from './generated/events';

export type HeaderPair = readonly [name: string, value: string];

/** Header values by name. A header that is absent reads as `undefined`. */
export type AmiFields = { readonly [header: string]: string | undefined };

/**
 * A message known to be the event `N`. `fields` then lists that event's
 * headers with their known values, so an editor can complete them.
 */
export type AmiEvent<N extends AmiEventName = AmiEventName> = AmiMessage & {
  readonly event: N;
  readonly fields: AmiEventMap[N] & AmiFields;
};

/**
 * One AMI message: an event, or the response to an action.
 *
 * Headers are kept as an ordered list because AMI allows the same name more
 * than once (`Output`, `Variable`, `ChanVariable(...)`), and the order matters.
 * Lookups ignore case, as Asterisk itself does.
 */
export class AmiMessage {
  readonly headers: readonly HeaderPair[];
  /**
   * Lines that are not `Name: value` headers. This is the command output of
   * Asterisk 13 and earlier (`Response: Follows`), or free text some modules send.
   */
  readonly body: readonly string[];
  /** `Date.now()` when the last byte of the message was read. */
  readonly receivedAt: number;
  private index: Map<string, string[]> | undefined;
  private fieldsCache: AmiFields | undefined;

  constructor(headers: readonly HeaderPair[], body: readonly string[] = [], receivedAt: number = Date.now()) {
    this.headers = headers;
    this.body = body;
    this.receivedAt = receivedAt;
  }

  private lookup(): Map<string, string[]> {
    if (!this.index) {
      const index = new Map<string, string[]>();
      for (const [name, value] of this.headers) {
        const key = name.toLowerCase();
        const values = index.get(key);
        if (values) values.push(value);
        else index.set(key, [value]);
      }
      this.index = index;
    }
    return this.index;
  }

  /** The first value of a header, or `undefined`. */
  get(name: string): string | undefined {
    return this.lookup().get(name.toLowerCase())?.[0];
  }

  /** Every value of a header, in the order received. Empty when absent. */
  getAll(name: string): string[] {
    return [...(this.lookup().get(name.toLowerCase()) ?? [])];
  }

  has(name: string): boolean {
    return this.lookup().has(name.toLowerCase());
  }

  /**
   * The headers as an object, with the names exactly as Asterisk sent them.
   * When a header repeats, this holds its first value; use `getAll` for the rest.
   */
  get fields(): AmiFields {
    if (!this.fieldsCache) {
      const fields: Record<string, string> = {};
      for (const [name, value] of this.headers) {
        if (!(name in fields)) fields[name] = value;
      }
      this.fieldsCache = Object.freeze(fields);
    }
    return this.fieldsCache;
  }

  /**
   * True when this message is the named event. Inside the `if`, `fields` is
   * typed for that event: `if (message.is('Hangup')) message.fields.Cause`.
   */
  is<N extends AmiEventName>(name: N): this is AmiEvent<N> {
    return this.get('Event')?.toLowerCase() === name.toLowerCase();
  }

  /** The event name, when this message is an event. */
  get event(): string | undefined {
    return this.get('Event');
  }

  /** `Success`, `Error`, `Follows` or `Goodbye`, when this message is a response. */
  get response(): string | undefined {
    return this.get('Response');
  }

  get actionId(): string | undefined {
    return this.get('ActionID');
  }

  get isEvent(): boolean {
    return this.has('Event');
  }

  get isResponse(): boolean {
    return this.has('Response');
  }

  /**
   * Command output, one entry per line, whichever way Asterisk sent it:
   * `Output:` headers (Asterisk 14 and later) or a raw body (13 and earlier).
   */
  get output(): string[] {
    const lines = this.getAll('Output');
    return lines.length > 0 ? lines : [...this.body];
  }

  /**
   * Channel variables carried as `Variable: name=value` or
   * `ChanVariable(channel): name=value` headers, as one object.
   * Pass a channel name to read only that channel's `ChanVariable` headers.
   */
  variables(channel?: string): Record<string, string> {
    const result: Record<string, string> = {};
    const wanted = channel === undefined ? undefined : `chanvariable(${channel.toLowerCase()})`;
    for (const [name, value] of this.headers) {
      const key = name.toLowerCase();
      const match = wanted === undefined ? key === 'variable' || key.startsWith('chanvariable') : key === wanted;
      if (!match) continue;
      const eq = value.indexOf('=');
      if (eq === -1) result[value] = '';
      else result[value.slice(0, eq)] = value.slice(eq + 1);
    }
    return result;
  }

  /**
   * A plain object, for logging or JSON. A header that appears once is a
   * string; one that repeats is an array. Prefer `get` / `getAll` in code, so
   * the type does not change with the data.
   */
  toObject(): Record<string, string | string[]> {
    const result: Record<string, string | string[]> = {};
    for (const [name, value] of this.headers) {
      const existing = result[name];
      if (existing === undefined) result[name] = value;
      else if (Array.isArray(existing)) existing.push(value);
      else result[name] = [existing, value];
    }
    return result;
  }

  toJSON(): { headers: Record<string, string | string[]>; body: readonly string[] } {
    return { headers: this.toObject(), body: this.body };
  }
}
