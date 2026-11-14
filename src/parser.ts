import { TextDecoder } from 'node:util';
import { AmiProtocolError } from './errors';
import { AmiMessage, type HeaderPair } from './message';

/** Largest message accepted by default. Real messages are a few hundred bytes. */
export const DEFAULT_MAX_MESSAGE_BYTES = 8 * 1024 * 1024;

const LF = 0x0a;
const CR = 0x0d;
const END_COMMAND = '--END COMMAND--';
const EMPTY = Buffer.alloc(0);

// Where the parser is inside a `Response: Follows` message (Asterisk 13 and earlier).
const NONE = 0;
const FOLLOWS_HEADERS = 1;
const FOLLOWS_BODY = 2;
const FOLLOWS_DONE = 3;

export interface AmiParserOptions {
  /** A message larger than this throws `AmiProtocolError`. Default 8 MiB. */
  maxMessageBytes?: number;
  /** Any label `TextDecoder` accepts. Default `utf-8`; undecodable bytes become U+FFFD. */
  encoding?: string;
  /** Set to false when the stream has no greeting line (parsing the client side of a link). */
  expectBanner?: boolean;
}

export type ParsedItem =
  | { kind: 'banner'; line: string; version: string | undefined }
  | { kind: 'message'; message: AmiMessage };

/** Index of the colon that ends a header name, or -1 when the line is not a header. */
function headerColon(line: string): number {
  const colon = line.indexOf(':');
  if (colon <= 0) return -1;
  const first = line.charCodeAt(0);
  if (first === 0x20 || first === 0x09) return -1;
  return colon;
}

/**
 * Incremental AMI parser. Feed it bytes exactly as they arrive from the
 * socket, in any chunking; it returns the complete messages found so far.
 *
 * It works on bytes and decodes one complete line at a time, so a character
 * that is several bytes long is never cut in half by a chunk boundary.
 */
export class AmiParser {
  private pending: Buffer = EMPTY;
  private headers: HeaderPair[] = [];
  private body: string[] = [];
  private follows = NONE;
  private messageBytes = 0;
  private bannerSeen: boolean;
  private readonly decoder: TextDecoder;
  private readonly maxMessageBytes: number;

  constructor(options: AmiParserOptions = {}) {
    this.maxMessageBytes = options.maxMessageBytes ?? DEFAULT_MAX_MESSAGE_BYTES;
    this.decoder = new TextDecoder(options.encoding ?? 'utf-8');
    this.bannerSeen = options.expectBanner === false;
  }

  feed(chunk: Uint8Array | string): ParsedItem[] {
    const incoming =
      typeof chunk === 'string'
        ? Buffer.from(chunk, 'utf8')
        : Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
    // The part of `pending` already searched holds no line feed: skip it.
    let searchFrom = this.pending.length;
    const data = this.pending.length === 0 ? incoming : Buffer.concat([this.pending, incoming]);
    const items: ParsedItem[] = [];
    let start = 0;

    for (;;) {
      const end = data.indexOf(LF, Math.max(start, searchFrom));
      if (end === -1) break;
      searchFrom = 0;
      const crlf = end > start && data[end - 1] === CR;
      this.messageBytes += end + 1 - start;
      if (this.messageBytes > this.maxMessageBytes) throw this.tooLarge();
      const line = this.decoder.decode(data.subarray(start, crlf ? end - 1 : end));
      start = end + 1;
      this.line(line, crlf, items);
    }

    const rest = data.subarray(start);
    if (this.messageBytes + rest.length > this.maxMessageBytes) throw this.tooLarge();
    // Copy the tail so a large chunk is not kept alive by a few leftover bytes.
    this.pending = rest.length === 0 ? EMPTY : Buffer.from(rest);
    return items;
  }

  private tooLarge(): AmiProtocolError {
    return new AmiProtocolError(`AMI message larger than ${this.maxMessageBytes} bytes`);
  }

  private line(text: string, crlf: boolean, out: ParsedItem[]): void {
    if (!this.bannerSeen) {
      if (text === '') {
        this.messageBytes = 0;
        return;
      }
      this.bannerSeen = true;
      if (headerColon(text) === -1) {
        // "Asterisk Call Manager/9.0.0"
        const version = /\/(\S+)\s*$/.exec(text)?.[1];
        out.push({ kind: 'banner', line: text, version });
        this.messageBytes = 0;
        return;
      }
    }

    if (this.follows === FOLLOWS_BODY) {
      this.bodyLine(text);
      return;
    }

    if (text === '') {
      // Inside old-style command output a bare "\n" is an empty output line,
      // not the end of the message.
      if (this.follows === FOLLOWS_HEADERS && !crlf) {
        this.follows = FOLLOWS_BODY;
        this.body.push('');
        return;
      }
      this.flush(out);
      return;
    }

    const colon = headerColon(text);
    // Old-style output lines end in a bare "\n"; headers end in "\r\n".
    if (this.follows === FOLLOWS_HEADERS && (!crlf || colon === -1)) {
      this.follows = FOLLOWS_BODY;
      this.bodyLine(text);
      return;
    }
    if (this.follows === FOLLOWS_DONE) return;

    if (colon === -1) {
      this.body.push(text);
      return;
    }
    const name = text.slice(0, colon);
    let value = text.slice(colon + 1);
    if (value.charCodeAt(0) === 0x20) value = value.slice(1);
    this.headers.push([name, value]);
    if (this.follows === NONE && name.toLowerCase() === 'response' && value.trim().toLowerCase() === 'follows') {
      this.follows = FOLLOWS_HEADERS;
    }
  }

  private bodyLine(text: string): void {
    if (text.endsWith(END_COMMAND)) {
      const rest = text.slice(0, -END_COMMAND.length);
      if (rest !== '') this.body.push(rest);
      this.follows = FOLLOWS_DONE;
      return;
    }
    this.body.push(text);
  }

  private flush(out: ParsedItem[]): void {
    if (this.headers.length > 0 || this.body.length > 0) {
      out.push({ kind: 'message', message: new AmiMessage(this.headers, this.body) });
    }
    this.headers = [];
    this.body = [];
    this.follows = NONE;
    this.messageBytes = 0;
  }
}
