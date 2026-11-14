import { describe, expectTypeOf, it } from 'vitest';
import {
  AMI_ACTION_NAMES,
  AMI_EVENT_NAMES,
  type AmiActionName,
  type AmiClient,
  type AmiEvent,
  type AmiEventName,
  type AmiMessage,
} from '../src/index';

// These checks run in the type checker (`npm run typecheck`), not at run time.
declare const ami: AmiClient;
declare const message: AmiMessage;

describe('types', () => {
  it('types an event handler from the event name', () => {
    const typed = (): void => {
      ami.onEvent('QueueMemberPause', (event) => {
        expectTypeOf(event).toEqualTypeOf<AmiEvent<'QueueMemberPause'>>();
        expectTypeOf(event.fields.Event).toEqualTypeOf<'QueueMemberPause'>();
        expectTypeOf(event.fields.Interface).toEqualTypeOf<string | undefined>();
        expectTypeOf(event.fields.Paused).toEqualTypeOf<'0' | '1' | (string & {}) | undefined>();
        // A header the catalogue does not list is still readable.
        expectTypeOf(event.fields.SomethingNew).toEqualTypeOf<string | undefined>();
      });
      ami.onEvent('MyCustomEvent', (event) => {
        expectTypeOf(event).toEqualTypeOf<AmiMessage>();
      });
      ami.onEvent(/^Queue/, (event) => {
        expectTypeOf(event).toEqualTypeOf<AmiMessage>();
      });
    };
    expectTypeOf(typed).toBeFunction();
  });

  it('narrows a message with is()', () => {
    const typed = (): void => {
      if (message.is('Hangup')) {
        expectTypeOf(message.fields.Cause).toEqualTypeOf<string | undefined>();
        expectTypeOf(message.event).toEqualTypeOf<'Hangup'>();
      }
    };
    expectTypeOf(typed).toBeFunction();
  });

  it('types a stream from the event name', () => {
    const typed = (): void => {
      expectTypeOf(ami.events('Newchannel')).toEqualTypeOf<AsyncIterableIterator<AmiEvent<'Newchannel'>>>();
      expectTypeOf(ami.events()).toEqualTypeOf<AsyncIterableIterator<AmiMessage>>();
    };
    expectTypeOf(typed).toBeFunction();
  });

  it('checks the parameters of a documented action', () => {
    const typed = (): void => {
      void ami.action({ Action: 'QueuePause', Interface: 'PJSIP/101', Paused: true, Reason: 'lunch' });
      void ami.action({ Action: 'Originate', Channel: 'PJSIP/101', Variable: { A: '1' }, Async: 'true' });
      void ami.action({ Action: 'UpdateConfig', SrcFilename: 'a.conf', DstFilename: 'a.conf', 'Action-000000': 'NewCat' });
      // @ts-expect-error Interface and Paused are required
      void ami.action({ Action: 'QueuePause' });
      // @ts-expect-error not a parameter of QueuePause
      void ami.action({ Action: 'QueuePause', Interface: 'PJSIP/101', Paused: true, Colour: 'red' });
      // @ts-expect-error not a documented action; rawAction takes anything
      void ami.action({ Action: 'NotAnAction' });
      void ami.rawAction({ Action: 'NotAnAction', Anything: 1 });
    };
    expectTypeOf(typed).toBeFunction();
  });

  it('lists every name', () => {
    expectTypeOf<(typeof AMI_EVENT_NAMES)[number]>().toEqualTypeOf<AmiEventName>();
    expectTypeOf<(typeof AMI_ACTION_NAMES)[number]>().toEqualTypeOf<AmiActionName>();
  });
});
