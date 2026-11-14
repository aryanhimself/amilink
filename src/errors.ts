import type { AmiMessage } from './message';

/** Base class of every error this library creates. */
export class AmiError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = new.target.name;
  }
}

/** The peer sent something that is not AMI, or a message over the size limit. */
export class AmiProtocolError extends AmiError {}

/** Asterisk refused the login. Reconnecting will not help, so by default the client stops. */
export class AmiAuthError extends AmiError {
  readonly response: AmiMessage | undefined;
  constructor(message: string, response?: AmiMessage) {
    super(message);
    this.response = response;
  }
}

/** No answer arrived in time: to an action, to a keep-alive ping, or while connecting. */
export class AmiTimeoutError extends AmiError {}

/** The connection is not usable: not connected yet, lost, or closed by the caller. */
export class AmiConnectionError extends AmiError {}

/** Asterisk answered an action with `Response: Error`. */
export class AmiActionError extends AmiError {
  readonly response: AmiMessage;
  readonly action: string;
  constructor(action: string, response: AmiMessage) {
    super(`AMI action ${action} failed: ${response.get('Message') ?? 'no message'}`);
    this.action = action;
    this.response = response;
  }
}

/** An event queue grew past its limit because its consumer was too slow. */
export class AmiOverflowError extends AmiError {}
