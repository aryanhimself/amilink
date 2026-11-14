import { describe, expect, it } from 'vitest';
import { AmiMessage, AmiParser, AmiProtocolError, type ParsedItem } from '../src/index';

function messages(items: ParsedItem[]): AmiMessage[] {
  return items.flatMap((item) => (item.kind === 'message' ? [item.message] : []));
}

const BANNER = 'Asterisk Call Manager/12.0.0\r\n';

describe('AmiParser', () => {
  it('reads the greeting and its version', () => {
    const [item] = new AmiParser().feed(BANNER);
    expect(item).toEqual({ kind: 'banner', line: 'Asterisk Call Manager/12.0.0', version: '12.0.0' });
  });

  it('reads the greeting and a message that arrive in one chunk', () => {
    const items = new AmiParser().feed(`${BANNER}Response: Success\r\nActionID: 1\r\n\r\n`);
    expect(items.map((item) => item.kind)).toEqual(['banner', 'message']);
    expect(messages(items)[0]?.get('ActionID')).toBe('1');
  });

  it('gives the same result however the bytes are split', () => {
    const wire = Buffer.from(
      `${BANNER}Event: Newchannel\r\nChannel: PJSIP/101-00000001\r\nCallerIDName: राम बहादुर\r\n\r\n` +
        `Event: Hangup\r\nCause: 16\r\n\r\n`,
      'utf8',
    );
    const whole = messages(new AmiParser().feed(wire)).map((message) => message.headers);
    for (const size of [1, 2, 3, 7, 16]) {
      const parser = new AmiParser();
      const got: AmiMessage[] = [];
      for (let offset = 0; offset < wire.length; offset += size) {
        got.push(...messages(parser.feed(wire.subarray(offset, offset + size))));
      }
      expect(got.map((message) => message.headers)).toEqual(whole);
    }
    expect(whole[0]).toContainEqual(['CallerIDName', 'राम बहादुर']);
  });

  it('keeps every value of a repeated header, in order', () => {
    const [message] = messages(
      new AmiParser({ expectBanner: false }).feed(
        'Response: Success\r\nOutput: first\r\nOutput: second\r\nOutput: third\r\n\r\n',
      ),
    );
    expect(message?.getAll('Output')).toEqual(['first', 'second', 'third']);
    expect(message?.get('Output')).toBe('first');
    expect(message?.output).toEqual(['first', 'second', 'third']);
  });

  it('keeps a value that itself contains a colon and a space', () => {
    const [message] = messages(
      new AmiParser({ expectBanner: false }).feed('Event: UserEvent\r\nPayload: {"a": 1, "b": "x: y"}\r\n\r\n'),
    );
    expect(message?.get('Payload')).toBe('{"a": 1, "b": "x: y"}');
  });

  it('keeps an empty value and leading spaces of a value', () => {
    const [message] = messages(
      new AmiParser({ expectBanner: false }).feed('Event: X\r\nEmpty: \r\nBare:\r\nOutput:   indented\r\n\r\n'),
    );
    expect(message?.get('Empty')).toBe('');
    expect(message?.get('Bare')).toBe('');
    expect(message?.get('Output')).toBe('  indented');
  });

  it('finds headers whatever their case', () => {
    const [message] = messages(new AmiParser({ expectBanner: false }).feed('event: Hangup\r\nUNIQUEID: 1.2\r\n\r\n'));
    expect(message?.isEvent).toBe(true);
    expect(message?.event).toBe('Hangup');
    expect(message?.get('uniqueid')).toBe('1.2');
    expect(message?.is('Hangup')).toBe(true);
  });

  it('accepts bare line feeds as line endings', () => {
    const [message] = messages(new AmiParser({ expectBanner: false }).feed('Event: Hangup\nCause: 16\n\n'));
    expect(message?.get('Cause')).toBe('16');
  });

  it('keeps a line that is not a header instead of dropping it', () => {
    const [message] = messages(
      new AmiParser({ expectBanner: false }).feed('Event: UserEvent\r\nfree text here\r\nKey: v\r\n\r\n'),
    );
    expect(message?.body).toEqual(['free text here']);
    expect(message?.get('Key')).toBe('v');
  });

  it('reads the command output format of Asterisk 13 and earlier', () => {
    const wire =
      'Response: Follows\r\nPrivilege: Command\r\nActionID: 7\r\n' +
      'Name/username    Host\n101/101          192.0.2.10\n\nNote: 2 peers\n--END COMMAND--\r\n\r\n' +
      'Event: Hangup\r\nCause: 16\r\n\r\n';
    const [response, event] = messages(new AmiParser({ expectBanner: false }).feed(wire));
    expect(response?.response).toBe('Follows');
    expect(response?.actionId).toBe('7');
    expect(response?.output).toEqual(['Name/username    Host', '101/101          192.0.2.10', '', 'Note: 2 peers']);
    expect(event?.event).toBe('Hangup');
  });

  it('reads old-format output with no lines at all', () => {
    const [response] = messages(
      new AmiParser({ expectBanner: false }).feed('Response: Follows\r\nActionID: 9\r\n--END COMMAND--\r\n\r\n'),
    );
    expect(response?.output).toEqual([]);
    expect(response?.actionId).toBe('9');
  });

  it('ignores extra blank lines between messages', () => {
    const got = messages(new AmiParser({ expectBanner: false }).feed('\r\n\r\nEvent: A\r\n\r\n\r\n\r\nEvent: B\r\n\r\n'));
    expect(got.map((message) => message.event)).toEqual(['A', 'B']);
  });

  it('starts with a message when the stream has no greeting', () => {
    const [message] = messages(new AmiParser().feed('Response: Success\r\nMessage: hi\r\n\r\n'));
    expect(message?.get('Message')).toBe('hi');
  });

  it('refuses a message that never ends', () => {
    const parser = new AmiParser({ expectBanner: false, maxMessageBytes: 1024 });
    expect(() => {
      for (let i = 0; i < 100; i += 1) parser.feed(`Header${i}: ${'x'.repeat(40)}\r\n`);
    }).toThrow(AmiProtocolError);
  });

  it('refuses a single line with no end', () => {
    const parser = new AmiParser({ expectBanner: false, maxMessageBytes: 1024 });
    expect(() => {
      for (let i = 0; i < 100; i += 1) parser.feed('x'.repeat(64));
    }).toThrow(AmiProtocolError);
  });

  it('turns undecodable bytes into replacement characters, without failing', () => {
    const wire = Buffer.concat([Buffer.from('Event: X\r\nName: '), Buffer.from([0xff, 0xfe]), Buffer.from('\r\n\r\n')]);
    const [message] = messages(new AmiParser({ expectBanner: false }).feed(wire));
    expect(message?.get('Name')).toBe('��');
  });

  it('can decode another encoding', () => {
    const wire = Buffer.concat([Buffer.from('Event: X\r\nName: '), Buffer.from([0xe9]), Buffer.from('\r\n\r\n')]);
    const [message] = messages(new AmiParser({ expectBanner: false, encoding: 'latin1' }).feed(wire));
    expect(message?.get('Name')).toBe('é');
  });
});

describe('AmiMessage', () => {
  it('reads channel variables', () => {
    const message = new AmiMessage([
      ['Event', 'Newchannel'],
      ['ChanVariable(PJSIP/101-1)', 'LANG=ne'],
      ['ChanVariable(PJSIP/102-2)', 'LANG=en'],
      ['Variable', 'A=1=2'],
    ]);
    expect(message.variables()).toEqual({ LANG: 'en', A: '1=2' });
    expect(message.variables('PJSIP/101-1')).toEqual({ LANG: 'ne' });
  });

  it('gives fields by name and a plain object', () => {
    const message = new AmiMessage([
      ['Event', 'X'],
      ['Output', 'a'],
      ['Output', 'b'],
    ]);
    expect(message.fields.Output).toBe('a');
    expect(message.fields.Missing).toBeUndefined();
    expect(message.toObject()).toEqual({ Event: 'X', Output: ['a', 'b'] });
  });
});
