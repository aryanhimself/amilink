/**
 * A header value. An array sends the header once per item. An object sends it
 * once per entry as `name=value`, which is how `Variable` is written:
 * `{ Variable: { CALLER: '101', LANG: 'ne' } }`.
 */
export type HeaderValue =
  | string
  | number
  | boolean
  | readonly (string | number)[]
  | Readonly<Record<string, string | number>>;

/** An action to send. `Action` is required; a header set to `undefined` is left out. */
export type AmiAction = { Action: string } & { [header: string]: HeaderValue | undefined };

// Asterisk reads a line into a 1025-byte buffer and accepts 128 headers per message.
const MAX_LINE_BYTES = 1022;
const MAX_HEADERS = 128;

function line(name: string, value: string): string {
  if (name === '' || /[\r\n:]/.test(name)) {
    throw new TypeError(`Invalid AMI header name: ${JSON.stringify(name)}`);
  }
  // A line break in a value would end the header and let the rest be read as
  // new headers, or as a whole new action.
  if (/[\r\n]/.test(value)) {
    throw new TypeError(`AMI header ${name} contains a line break`);
  }
  const text = `${name}: ${value}`;
  if (Buffer.byteLength(text, 'utf8') > MAX_LINE_BYTES) {
    throw new RangeError(`AMI header ${name} is longer than ${MAX_LINE_BYTES} bytes`);
  }
  return text;
}

/** Turn an action into the bytes to write. Throws on values Asterisk would misread. */
export function encodeAction(action: AmiAction): Buffer {
  const lines: string[] = [];
  for (const [name, value] of Object.entries(action)) {
    if (value === undefined) continue;
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      lines.push(line(name, String(value)));
    } else if (Array.isArray(value)) {
      for (const item of value as readonly (string | number)[]) lines.push(line(name, String(item)));
    } else {
      for (const [key, item] of Object.entries(value)) lines.push(line(name, `${key}=${String(item)}`));
    }
  }
  if (lines.length > MAX_HEADERS) {
    throw new RangeError(`An AMI action can carry at most ${MAX_HEADERS} headers`);
  }
  return Buffer.from(lines.join('\r\n') + '\r\n\r\n', 'utf8');
}
