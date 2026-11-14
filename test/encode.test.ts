import { describe, expect, it } from 'vitest';
import { encodeAction } from '../src/index';

describe('encodeAction', () => {
  it('writes headers in order and ends with a blank line', () => {
    expect(encodeAction({ Action: 'Ping', ActionID: 'a-1' }).toString()).toBe('Action: Ping\r\nActionID: a-1\r\n\r\n');
  });

  it('repeats a header for an array and writes an object as name=value', () => {
    const text = encodeAction({
      Action: 'Originate',
      Channel: 'PJSIP/101',
      Async: true,
      Timeout: 30000,
      Variable: { CALLER: '101', LANG: 'ne' },
      Codecs: ['ulaw', 'alaw'],
      Skipped: undefined,
    }).toString();
    expect(text).toBe(
      'Action: Originate\r\nChannel: PJSIP/101\r\nAsync: true\r\nTimeout: 30000\r\n' +
        'Variable: CALLER=101\r\nVariable: LANG=ne\r\nCodecs: ulaw\r\nCodecs: alaw\r\n\r\n',
    );
  });

  it('refuses a line break in a value, which would smuggle in another header', () => {
    expect(() => encodeAction({ Action: 'Setvar', Value: 'x\r\nAction: Command' })).toThrow(TypeError);
    expect(() => encodeAction({ Action: 'Setvar', Variable: { a: 'b\nc' } })).toThrow(TypeError);
  });

  it('refuses a header name with a colon or line break', () => {
    expect(() => encodeAction({ Action: 'X', 'Bad: Name': '1' })).toThrow(TypeError);
  });

  it('refuses a line Asterisk would not read', () => {
    expect(() => encodeAction({ Action: 'Setvar', Value: 'x'.repeat(2000) })).toThrow(RangeError);
  });
});
