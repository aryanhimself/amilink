// GENERATED FILE. Do not edit by hand.
// Source: catalog/*.json, collected from the Asterisk source by scripts/collect-catalog.mjs.
// Asterisk versions covered: 20 (AMI 9.0.0), 22 (AMI 11.0.0), 23 (AMI 12.0.0), 24 (AMI 14.0.0).
/* eslint-disable */

/** Headers Asterisk may add to any event, depending on its settings. */
export interface AmiEventCommonFields {
  /** The manager classes the event belongs to, for example `call,all`. */
  readonly Privilege?: string;
  /** Seconds since 1970 with microseconds. Sent when `timestampevents=yes` in manager.conf. */
  readonly Timestamp?: string;
  /** Sent when a system name is set in asterisk.conf. */
  readonly SystemName?: string;
  /** Present when the event was caused by an action this client sent. */
  readonly ActionID?: string;
}

/**
 * The `AgentCalled` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentCalled/
 */
export interface AgentCalledEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentCalled';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
}

/**
 * The `AgentComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentComplete/
 */
export interface AgentCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentComplete';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly HoldTime?: string;
  readonly TalkTime?: string;
  readonly Reason?: 'caller' | 'agent' | 'transfer' | (string & {});
}

/**
 * The `AgentConnect` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentConnect/
 */
export interface AgentConnectEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentConnect';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly RingTime?: string;
  readonly HoldTime?: string;
}

/**
 * The `AgentDump` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentDump/
 */
export interface AgentDumpEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentDump';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
}

/**
 * The `AgentLogin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentLogin/
 */
export interface AgentLoginEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentLogin';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Agent?: string;
}

/**
 * The `AgentLogoff` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentLogoff/
 */
export interface AgentLogoffEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentLogoff';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Agent?: string;
  readonly Logintime?: string;
}

/**
 * The `AgentRingNoAnswer` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentRingNoAnswer/
 */
export interface AgentRingNoAnswerEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentRingNoAnswer';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly RingTime?: string;
}

/**
 * The `Agents` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Agents/
 */
export interface AgentsEventFields extends AmiEventCommonFields {
  readonly Event: 'Agents';
  readonly Agent?: string;
  readonly Name?: string;
  readonly Status?: 'AGENT_LOGGEDOFF' | 'AGENT_IDLE' | 'AGENT_ONCALL' | (string & {});
  readonly TalkingToChan?: string;
  readonly CallStarted?: string;
  readonly LoggedInTime?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `AgentsComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AgentsComplete/
 */
export interface AgentsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'AgentsComplete';
}

/**
 * The `AGIExecEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AGIExecEnd/
 */
export interface AGIExecEndEventFields extends AmiEventCommonFields {
  readonly Event: 'AGIExecEnd';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Command?: string;
  readonly CommandId?: string;
  readonly ResultCode?: string;
  readonly Result?: string;
}

/**
 * The `AGIExecStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AGIExecStart/
 */
export interface AGIExecStartEventFields extends AmiEventCommonFields {
  readonly Event: 'AGIExecStart';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Command?: string;
  readonly CommandId?: string;
}

/**
 * The `Alarm` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Alarm/
 */
export interface AlarmEventFields extends AmiEventCommonFields {
  readonly Event: 'Alarm';
  readonly DAHDIChannel?: string;
  readonly Alarm?: string;
}

/**
 * The `AlarmClear` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AlarmClear/
 */
export interface AlarmClearEventFields extends AmiEventCommonFields {
  readonly Event: 'AlarmClear';
  readonly DAHDIChannel?: string;
}

/**
 * The `AOC-D` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AOC-D/
 */
export interface AOC_DEventFields extends AmiEventCommonFields {
  readonly Event: 'AOC-D';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Charge?: string;
  readonly Type?: 'NotAvailable' | 'Free' | 'Currency' | 'Units' | (string & {});
  readonly BillingID?: 'Normal' | 'Reverse' | 'CreditCard' | 'CallForwardingUnconditional' | 'CallForwardingBusy' | 'CallForwardingNoReply' | 'CallDeflection' | 'CallTransfer' | 'NotAvailable' | (string & {});
  readonly TotalType?: 'SubTotal' | 'Total' | (string & {});
  readonly Currency?: string;
  readonly Name?: string;
  readonly Cost?: string;
  readonly Multiplier?: '1/1000' | '1/100' | '1/10' | '1' | '10' | '100' | '1000' | (string & {});
  readonly Units?: string;
  readonly NumberOf?: string;
  readonly TypeOf?: string;
}

/**
 * The `AOC-E` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AOC-E/
 */
export interface AOC_EEventFields extends AmiEventCommonFields {
  readonly Event: 'AOC-E';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly ChargingAssociation?: string;
  readonly Number?: string;
  readonly Plan?: string;
  readonly ID?: string;
  readonly Charge?: string;
  readonly Type?: 'NotAvailable' | 'Free' | 'Currency' | 'Units' | (string & {});
  readonly BillingID?: 'Normal' | 'Reverse' | 'CreditCard' | 'CallForwardingUnconditional' | 'CallForwardingBusy' | 'CallForwardingNoReply' | 'CallDeflection' | 'CallTransfer' | 'NotAvailable' | (string & {});
  readonly TotalType?: 'SubTotal' | 'Total' | (string & {});
  readonly Currency?: string;
  readonly Name?: string;
  readonly Cost?: string;
  readonly Multiplier?: '1/1000' | '1/100' | '1/10' | '1' | '10' | '100' | '1000' | (string & {});
  readonly Units?: string;
  readonly NumberOf?: string;
  readonly TypeOf?: string;
}

/**
 * The `AOC-S` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AOC-S/
 */
export interface AOC_SEventFields extends AmiEventCommonFields {
  readonly Event: 'AOC-S';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Chargeable?: string;
  readonly RateType?: 'NotAvailable' | 'Free' | 'FreeFromBeginning' | 'Duration' | 'Flag' | 'Volume' | 'SpecialCode' | (string & {});
  readonly Currency?: string;
  readonly Name?: string;
  readonly Cost?: string;
  readonly Multiplier?: '1/1000' | '1/100' | '1/10' | '1' | '10' | '100' | '1000' | (string & {});
  readonly ChargingType?: string;
  readonly StepFunction?: string;
  readonly Granularity?: string;
  readonly Length?: string;
  readonly Scale?: string;
  readonly Unit?: 'Octet' | 'Segment' | 'Message' | (string & {});
  readonly SpecialCode?: string;
}

/**
 * The `AorDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AorDetail/
 */
export interface AorDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'AorDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly MinimumExpiration?: string;
  readonly MaximumExpiration?: string;
  readonly DefaultExpiration?: string;
  readonly QualifyFrequency?: string;
  readonly AuthenticateQualify?: string;
  readonly MaxContacts?: string;
  readonly RemoveExisting?: string;
  readonly RemoveUnavailable?: string;
  readonly Mailboxes?: string;
  readonly OutboundProxy?: string;
  readonly SupportPath?: string;
  readonly Qualify2xxOnly?: string;
  readonly QualifyTimeout?: string;
  readonly VoicemailExtension?: string;
  readonly Contacts?: string;
  readonly TotalContacts?: string;
  readonly ContactsRegistered?: string;
  readonly EndpointName?: string;
}

/**
 * The `AorList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AorList/
 */
export interface AorListEventFields extends AmiEventCommonFields {
  readonly Event: 'AorList';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly MinimumExpiration?: string;
  readonly MaximumExpiration?: string;
  readonly DefaultExpiration?: string;
  readonly QualifyFrequency?: string;
  readonly QualifyTimeout?: string;
  readonly Qualify2xxOnly?: string;
  readonly AuthenticateQualify?: string;
  readonly MaxContacts?: string;
  readonly RemoveExisting?: string;
  readonly RemoveUnavailable?: string;
  readonly Mailboxes?: string;
  readonly VoicemailExtension?: string;
  readonly OutboundProxy?: string;
  readonly SupportPath?: string;
  readonly Contacts?: string;
}

/**
 * The `AorListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AorListComplete/
 */
export interface AorListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'AorListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `AsyncAGIEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AsyncAGIEnd/
 */
export interface AsyncAGIEndEventFields extends AmiEventCommonFields {
  readonly Event: 'AsyncAGIEnd';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `AsyncAGIExec` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AsyncAGIExec/
 */
export interface AsyncAGIExecEventFields extends AmiEventCommonFields {
  readonly Event: 'AsyncAGIExec';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly CommandID?: string;
  readonly Result?: string;
}

/**
 * The `AsyncAGIStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AsyncAGIStart/
 */
export interface AsyncAGIStartEventFields extends AmiEventCommonFields {
  readonly Event: 'AsyncAGIStart';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Env?: string;
}

/**
 * The `AttendedTransfer` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AttendedTransfer/
 */
export interface AttendedTransferEventFields extends AmiEventCommonFields {
  readonly Event: 'AttendedTransfer';
  readonly Result?: 'Fail' | 'Invalid' | 'Not Permitted' | 'Success' | (string & {});
  readonly OrigTransfererChannel?: string;
  readonly OrigTransfererChannelState?: string;
  readonly OrigTransfererChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly OrigTransfererCallerIDNum?: string;
  readonly OrigTransfererCallerIDName?: string;
  readonly OrigTransfererConnectedLineNum?: string;
  readonly OrigTransfererConnectedLineName?: string;
  readonly OrigTransfererLanguage?: string;
  readonly OrigTransfererAccountCode?: string;
  readonly OrigTransfererContext?: string;
  readonly OrigTransfererExten?: string;
  readonly OrigTransfererPriority?: string;
  readonly OrigTransfererUniqueid?: string;
  readonly OrigTransfererLinkedid?: string;
  readonly OrigBridgeUniqueid?: string;
  readonly OrigBridgeType?: string;
  readonly OrigBridgeTechnology?: string;
  readonly OrigBridgeCreator?: string;
  readonly OrigBridgeName?: string;
  readonly OrigBridgeNumChannels?: string;
  readonly OrigBridgeVideoSourceMode?: string;
  readonly OrigBridgeVideoSource?: string;
  readonly SecondTransfererChannel?: string;
  readonly SecondTransfererChannelState?: string;
  readonly SecondTransfererChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SecondTransfererCallerIDNum?: string;
  readonly SecondTransfererCallerIDName?: string;
  readonly SecondTransfererConnectedLineNum?: string;
  readonly SecondTransfererConnectedLineName?: string;
  readonly SecondTransfererLanguage?: string;
  readonly SecondTransfererAccountCode?: string;
  readonly SecondTransfererContext?: string;
  readonly SecondTransfererExten?: string;
  readonly SecondTransfererPriority?: string;
  readonly SecondTransfererUniqueid?: string;
  readonly SecondTransfererLinkedid?: string;
  readonly SecondBridgeUniqueid?: string;
  readonly SecondBridgeType?: string;
  readonly SecondBridgeTechnology?: string;
  readonly SecondBridgeCreator?: string;
  readonly SecondBridgeName?: string;
  readonly SecondBridgeNumChannels?: string;
  readonly SecondBridgeVideoSourceMode?: string;
  readonly SecondBridgeVideoSource?: string;
  readonly DestType?: 'Bridge' | 'App' | 'Link' | 'Threeway' | 'Fail' | (string & {});
  readonly DestBridgeUniqueid?: string;
  readonly DestApp?: string;
  readonly LocalOneChannel?: string;
  readonly LocalOneChannelState?: string;
  readonly LocalOneChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalOneCallerIDNum?: string;
  readonly LocalOneCallerIDName?: string;
  readonly LocalOneConnectedLineNum?: string;
  readonly LocalOneConnectedLineName?: string;
  readonly LocalOneLanguage?: string;
  readonly LocalOneAccountCode?: string;
  readonly LocalOneContext?: string;
  readonly LocalOneExten?: string;
  readonly LocalOnePriority?: string;
  readonly LocalOneUniqueid?: string;
  readonly LocalOneLinkedid?: string;
  readonly LocalTwoChannel?: string;
  readonly LocalTwoChannelState?: string;
  readonly LocalTwoChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalTwoCallerIDNum?: string;
  readonly LocalTwoCallerIDName?: string;
  readonly LocalTwoConnectedLineNum?: string;
  readonly LocalTwoConnectedLineName?: string;
  readonly LocalTwoLanguage?: string;
  readonly LocalTwoAccountCode?: string;
  readonly LocalTwoContext?: string;
  readonly LocalTwoExten?: string;
  readonly LocalTwoPriority?: string;
  readonly LocalTwoUniqueid?: string;
  readonly LocalTwoLinkedid?: string;
  readonly DestTransfererChannel?: string;
  readonly TransfereeChannel?: string;
  readonly TransfereeChannelState?: string;
  readonly TransfereeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly TransfereeCallerIDNum?: string;
  readonly TransfereeCallerIDName?: string;
  readonly TransfereeConnectedLineNum?: string;
  readonly TransfereeConnectedLineName?: string;
  readonly TransfereeLanguage?: string;
  readonly TransfereeAccountCode?: string;
  readonly TransfereeContext?: string;
  readonly TransfereeExten?: string;
  readonly TransfereePriority?: string;
  readonly TransfereeUniqueid?: string;
  readonly TransfereeLinkedid?: string;
  readonly TransferTargetChannel?: string;
  readonly TransferTargetChannelState?: string;
  readonly TransferTargetChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly TransferTargetCallerIDNum?: string;
  readonly TransferTargetCallerIDName?: string;
  readonly TransferTargetConnectedLineNum?: string;
  readonly TransferTargetConnectedLineName?: string;
  readonly TransferTargetLanguage?: string;
  readonly TransferTargetAccountCode?: string;
  readonly TransferTargetContext?: string;
  readonly TransferTargetExten?: string;
  readonly TransferTargetPriority?: string;
  readonly TransferTargetUniqueid?: string;
  readonly TransferTargetLinkedid?: string;
}

/**
 * The `AuthDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AuthDetail/
 */
export interface AuthDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'AuthDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Username?: string;
  readonly Password?: string;
  readonly Md5Cred?: string;
  readonly Realm?: string;
  readonly NonceLifetime?: string;
  readonly AuthType?: string;
  readonly EndpointName?: string;
  readonly OauthClientid?: string;
  readonly OauthSecret?: string;
  readonly PasswordDigest?: string;
  readonly RefreshToken?: string;
  readonly SupportedAlgorithmsUac?: string;
  readonly SupportedAlgorithmsUas?: string;
}

/**
 * The `AuthList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AuthList/
 */
export interface AuthListEventFields extends AmiEventCommonFields {
  readonly Event: 'AuthList';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Username?: string;
  readonly Md5Cred?: string;
  readonly Realm?: string;
  readonly AuthType?: string;
  readonly Password?: string;
  readonly NonceLifetime?: string;
  readonly OauthClientid?: string;
  readonly OauthSecret?: string;
  readonly PasswordDigest?: string;
  readonly RefreshToken?: string;
  readonly SupportedAlgorithmsUac?: string;
  readonly SupportedAlgorithmsUas?: string;
}

/**
 * The `AuthListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AuthListComplete/
 */
export interface AuthListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'AuthListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `AuthMethodNotAllowed` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/AuthMethodNotAllowed/
 */
export interface AuthMethodNotAllowedEventFields extends AmiEventCommonFields {
  readonly Event: 'AuthMethodNotAllowed';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly AuthMethod?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `BlindTransfer` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BlindTransfer/
 */
export interface BlindTransferEventFields extends AmiEventCommonFields {
  readonly Event: 'BlindTransfer';
  readonly Result?: 'Fail' | 'Invalid' | 'Not Permitted' | 'Success' | (string & {});
  readonly TransfererChannel?: string;
  readonly TransfererChannelState?: string;
  readonly TransfererChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly TransfererCallerIDNum?: string;
  readonly TransfererCallerIDName?: string;
  readonly TransfererConnectedLineNum?: string;
  readonly TransfererConnectedLineName?: string;
  readonly TransfererLanguage?: string;
  readonly TransfererAccountCode?: string;
  readonly TransfererContext?: string;
  readonly TransfererExten?: string;
  readonly TransfererPriority?: string;
  readonly TransfererUniqueid?: string;
  readonly TransfererLinkedid?: string;
  readonly TransfereeChannel?: string;
  readonly TransfereeChannelState?: string;
  readonly TransfereeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly TransfereeCallerIDNum?: string;
  readonly TransfereeCallerIDName?: string;
  readonly TransfereeConnectedLineNum?: string;
  readonly TransfereeConnectedLineName?: string;
  readonly TransfereeLanguage?: string;
  readonly TransfereeAccountCode?: string;
  readonly TransfereeContext?: string;
  readonly TransfereeExten?: string;
  readonly TransfereePriority?: string;
  readonly TransfereeUniqueid?: string;
  readonly TransfereeLinkedid?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly IsExternal?: 'Yes' | 'No' | (string & {});
  readonly Context?: string;
  readonly Extension?: string;
}

/**
 * The `BridgeCreate` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeCreate/
 */
export interface BridgeCreateEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeCreate';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `BridgeDestroy` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeDestroy/
 */
export interface BridgeDestroyEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeDestroy';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `BridgeEnter` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeEnter/
 */
export interface BridgeEnterEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeEnter';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly SwapUniqueid?: string;
}

/**
 * The `BridgeInfoChannel` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeInfoChannel/
 */
export interface BridgeInfoChannelEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeInfoChannel';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `BridgeInfoComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeInfoComplete/
 */
export interface BridgeInfoCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeInfoComplete';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `BridgeLeave` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeLeave/
 */
export interface BridgeLeaveEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeLeave';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `BridgeMerge` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeMerge/
 */
export interface BridgeMergeEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeMerge';
  readonly ToBridgeUniqueid?: string;
  readonly ToBridgeType?: string;
  readonly ToBridgeTechnology?: string;
  readonly ToBridgeCreator?: string;
  readonly ToBridgeName?: string;
  readonly ToBridgeNumChannels?: string;
  readonly ToBridgeVideoSourceMode?: string;
  readonly ToBridgeVideoSource?: string;
  readonly FromBridgeUniqueid?: string;
  readonly FromBridgeType?: string;
  readonly FromBridgeTechnology?: string;
  readonly FromBridgeCreator?: string;
  readonly FromBridgeName?: string;
  readonly FromBridgeNumChannels?: string;
  readonly FromBridgeVideoSourceMode?: string;
  readonly FromBridgeVideoSource?: string;
}

/**
 * The `BridgeVideoSourceUpdate` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/BridgeVideoSourceUpdate/
 */
export interface BridgeVideoSourceUpdateEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeVideoSourceUpdate';
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly BridgePreviousVideoSource?: string;
}

/**
 * The `Cdr` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Cdr/
 */
export interface CdrEventFields extends AmiEventCommonFields {
  readonly Event: 'Cdr';
  readonly AccountCode?: string;
  readonly Source?: string;
  readonly Destination?: string;
  readonly DestinationContext?: string;
  readonly CallerID?: string;
  readonly Channel?: string;
  readonly DestinationChannel?: string;
  readonly LastApplication?: string;
  readonly LastData?: string;
  readonly StartTime?: string;
  readonly AnswerTime?: string;
  readonly EndTime?: string;
  readonly Duration?: string;
  readonly BillableSeconds?: string;
  readonly Disposition?: 'NO ANSWER' | 'FAILED' | 'BUSY' | 'ANSWERED' | 'CONGESTION' | (string & {});
  readonly AMAFlags?: 'OMIT' | 'BILLING' | 'DOCUMENTATION' | (string & {});
  readonly UniqueID?: string;
  readonly UserField?: string;
}

/**
 * The `CEL` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/CEL/
 */
export interface CELEventFields extends AmiEventCommonFields {
  readonly Event: 'CEL';
  readonly EventName?: 'CHAN_START' | 'CHAN_END' | 'ANSWER' | 'HANGUP' | 'BRIDGE_ENTER' | 'BRIDGE_EXIT' | 'APP_START' | 'APP_END' | 'PARK_START' | 'PARK_END' | 'BLINDTRANSFER' | 'ATTENDEDTRANSFER' | 'PICKUP' | 'FORWARD' | 'LINKEDID_END' | 'LOCAL_OPTIMIZE_BEGIN' | 'LOCAL_OPTIMIZE' | 'STREAM_BEGIN' | 'STREAM_END' | 'DTMF' | 'USER_DEFINED' | (string & {});
  readonly AccountCode?: string;
  readonly CallerIDnum?: string;
  readonly CallerIDname?: string;
  readonly CallerIDani?: string;
  readonly CallerIDrdnis?: string;
  readonly CallerIDdnid?: string;
  readonly Exten?: string;
  readonly Context?: string;
  readonly Application?: string;
  readonly AppData?: string;
  readonly EventTime?: string;
  readonly AMAFlags?: 'OMIT' | 'BILLING' | 'DOCUMENTATION' | (string & {});
  readonly UniqueID?: string;
  readonly LinkedID?: string;
  readonly UserField?: string;
  readonly Peer?: string;
  readonly PeerAccount?: string;
  readonly Extra?: string;
}

/**
 * The `ChallengeResponseFailed` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChallengeResponseFailed/
 */
export interface ChallengeResponseFailedEventFields extends AmiEventCommonFields {
  readonly Event: 'ChallengeResponseFailed';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Challenge?: string;
  readonly Response?: string;
  readonly ExpectedResponse?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `ChallengeSent` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChallengeSent/
 */
export interface ChallengeSentEventFields extends AmiEventCommonFields {
  readonly Event: 'ChallengeSent';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Challenge?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `ChannelTalkingStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChannelTalkingStart/
 */
export interface ChannelTalkingStartEventFields extends AmiEventCommonFields {
  readonly Event: 'ChannelTalkingStart';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `ChannelTalkingStop` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChannelTalkingStop/
 */
export interface ChannelTalkingStopEventFields extends AmiEventCommonFields {
  readonly Event: 'ChannelTalkingStop';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Duration?: string;
}

/**
 * The `ChanSpyStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChanSpyStart/
 */
export interface ChanSpyStartEventFields extends AmiEventCommonFields {
  readonly Event: 'ChanSpyStart';
  readonly SpyerChannel?: string;
  readonly SpyerChannelState?: string;
  readonly SpyerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SpyerCallerIDNum?: string;
  readonly SpyerCallerIDName?: string;
  readonly SpyerConnectedLineNum?: string;
  readonly SpyerConnectedLineName?: string;
  readonly SpyerLanguage?: string;
  readonly SpyerAccountCode?: string;
  readonly SpyerContext?: string;
  readonly SpyerExten?: string;
  readonly SpyerPriority?: string;
  readonly SpyerUniqueid?: string;
  readonly SpyerLinkedid?: string;
  readonly SpyeeChannel?: string;
  readonly SpyeeChannelState?: string;
  readonly SpyeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SpyeeCallerIDNum?: string;
  readonly SpyeeCallerIDName?: string;
  readonly SpyeeConnectedLineNum?: string;
  readonly SpyeeConnectedLineName?: string;
  readonly SpyeeLanguage?: string;
  readonly SpyeeAccountCode?: string;
  readonly SpyeeContext?: string;
  readonly SpyeeExten?: string;
  readonly SpyeePriority?: string;
  readonly SpyeeUniqueid?: string;
  readonly SpyeeLinkedid?: string;
}

/**
 * The `ChanSpyStop` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ChanSpyStop/
 */
export interface ChanSpyStopEventFields extends AmiEventCommonFields {
  readonly Event: 'ChanSpyStop';
  readonly SpyerChannel?: string;
  readonly SpyerChannelState?: string;
  readonly SpyerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SpyerCallerIDNum?: string;
  readonly SpyerCallerIDName?: string;
  readonly SpyerConnectedLineNum?: string;
  readonly SpyerConnectedLineName?: string;
  readonly SpyerLanguage?: string;
  readonly SpyerAccountCode?: string;
  readonly SpyerContext?: string;
  readonly SpyerExten?: string;
  readonly SpyerPriority?: string;
  readonly SpyerUniqueid?: string;
  readonly SpyerLinkedid?: string;
  readonly SpyeeChannel?: string;
  readonly SpyeeChannelState?: string;
  readonly SpyeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SpyeeCallerIDNum?: string;
  readonly SpyeeCallerIDName?: string;
  readonly SpyeeConnectedLineNum?: string;
  readonly SpyeeConnectedLineName?: string;
  readonly SpyeeLanguage?: string;
  readonly SpyeeAccountCode?: string;
  readonly SpyeeContext?: string;
  readonly SpyeeExten?: string;
  readonly SpyeePriority?: string;
  readonly SpyeeUniqueid?: string;
  readonly SpyeeLinkedid?: string;
}

/**
 * The `ConfbridgeEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeEnd/
 */
export interface ConfbridgeEndEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeEnd';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `ConfbridgeJoin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeJoin/
 */
export interface ConfbridgeJoinEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeJoin';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Admin?: 'Yes' | 'No' | (string & {});
  readonly Muted?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ConfbridgeLeave` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeLeave/
 */
export interface ConfbridgeLeaveEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeLeave';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Admin?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ConfbridgeList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeList/
 */
export interface ConfbridgeListEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeList';
  readonly Conference?: string;
  readonly Admin?: 'Yes' | 'No' | (string & {});
  readonly MarkedUser?: 'Yes' | 'No' | (string & {});
  readonly WaitMarked?: 'Yes' | 'No' | (string & {});
  readonly EndMarked?: 'Yes' | 'No' | (string & {});
  readonly Waiting?: 'Yes' | 'No' | (string & {});
  readonly Muted?: 'Yes' | 'No' | (string & {});
  readonly Talking?: 'Yes' | 'No' | (string & {});
  readonly AnsweredTime?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `ConfbridgeListRooms` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeListRooms/
 */
export interface ConfbridgeListRoomsEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeListRooms';
  readonly Conference?: string;
  readonly Parties?: string;
  readonly Marked?: string;
  readonly Locked?: 'Yes' | 'No' | (string & {});
  readonly Muted?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ConfbridgeMute` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeMute/
 */
export interface ConfbridgeMuteEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeMute';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Admin?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ConfbridgeRecord` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeRecord/
 */
export interface ConfbridgeRecordEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeRecord';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `ConfbridgeStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeStart/
 */
export interface ConfbridgeStartEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeStart';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `ConfbridgeStopRecord` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeStopRecord/
 */
export interface ConfbridgeStopRecordEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeStopRecord';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
}

/**
 * The `ConfbridgeTalking` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeTalking/
 */
export interface ConfbridgeTalkingEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeTalking';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly TalkingStatus?: 'on' | 'off' | (string & {});
  readonly Admin?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ConfbridgeUnmute` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ConfbridgeUnmute/
 */
export interface ConfbridgeUnmuteEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeUnmute';
  readonly Conference?: string;
  readonly BridgeUniqueid?: string;
  readonly BridgeType?: string;
  readonly BridgeTechnology?: string;
  readonly BridgeCreator?: string;
  readonly BridgeName?: string;
  readonly BridgeNumChannels?: string;
  readonly BridgeVideoSourceMode?: string;
  readonly BridgeVideoSource?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Admin?: 'Yes' | 'No' | (string & {});
}

/**
 * The `ContactList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ContactList/
 */
export interface ContactListEventFields extends AmiEventCommonFields {
  readonly Event: 'ContactList';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly ViaAddr?: string;
  readonly ViaPort?: string;
  readonly QualifyTimeout?: string;
  readonly CallId?: string;
  readonly RegServer?: string;
  readonly PruneOnBoot?: string;
  readonly Path?: string;
  readonly Endpoint?: string;
  readonly AuthenticateQualify?: string;
  readonly Uri?: string;
  readonly QualifyFrequency?: string;
  readonly UserAgent?: string;
  readonly ExpirationTime?: string;
  readonly OutboundProxy?: string;
  readonly Status?: 'Reachable' | 'Unreachable' | 'NonQualified' | 'Unknown' | (string & {});
  readonly RoundtripUsec?: string;
  readonly Qualify2xxOnly?: string;
}

/**
 * The `ContactListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ContactListComplete/
 */
export interface ContactListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ContactListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `ContactStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ContactStatus/
 */
export interface ContactStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'ContactStatus';
  readonly URI?: string;
  readonly ContactStatus?: 'Unknown' | 'Unreachable' | 'Reachable' | 'Unqualified' | 'Removed' | 'Updated' | (string & {});
  readonly AOR?: string;
  readonly EndpointName?: string;
  readonly RoundtripUsec?: string;
}

/**
 * The `ContactStatusDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ContactStatusDetail/
 */
export interface ContactStatusDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'ContactStatusDetail';
  readonly AOR?: string;
  readonly URI?: string;
  readonly Status?: 'Reachable' | 'Unreachable' | 'NonQualified' | 'Unknown' | (string & {});
  readonly RoundtripUsec?: string;
  readonly EndpointName?: string;
  readonly UserAgent?: string;
  readonly RegExpire?: string;
  readonly ViaAddress?: string;
  readonly CallID?: string;
  readonly ID?: string;
  readonly AuthenticateQualify?: string;
  readonly OutboundProxy?: string;
  readonly Path?: string;
  readonly QualifyFrequency?: string;
  readonly QualifyTimeout?: string;
  readonly Qualify2xxOnly?: string;
}

/**
 * The `CoreShowChannel` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/CoreShowChannel/
 */
export interface CoreShowChannelEventFields extends AmiEventCommonFields {
  readonly Event: 'CoreShowChannel';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly BridgeId?: string;
  readonly Application?: string;
  readonly ApplicationData?: string;
  readonly Duration?: string;
}

/**
 * The `CoreShowChannelMapComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/CoreShowChannelMapComplete/
 */
export interface CoreShowChannelMapCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'CoreShowChannelMapComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `CoreShowChannelsComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/CoreShowChannelsComplete/
 */
export interface CoreShowChannelsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'CoreShowChannelsComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `DAHDIChannel` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DAHDIChannel/
 */
export interface DAHDIChannelEventFields extends AmiEventCommonFields {
  readonly Event: 'DAHDIChannel';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DAHDIGroup?: string;
  readonly DAHDISpan?: string;
  readonly DAHDIChannel?: string;
}

/**
 * The `DeadlockStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DeadlockStart/
 */
export interface DeadlockStartEventFields extends AmiEventCommonFields {
  readonly Event: 'DeadlockStart';
  readonly Mutex?: string;
}

/**
 * The `DeviceStateChange` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DeviceStateChange/
 */
export interface DeviceStateChangeEventFields extends AmiEventCommonFields {
  readonly Event: 'DeviceStateChange';
  readonly Device?: string;
  readonly State?: string;
}

/**
 * The `DeviceStateListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DeviceStateListComplete/
 */
export interface DeviceStateListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DeviceStateListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `DialBegin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DialBegin/
 */
export interface DialBeginEventFields extends AmiEventCommonFields {
  readonly Event: 'DialBegin';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly DialString?: string;
}

/**
 * The `DialEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DialEnd/
 */
export interface DialEndEventFields extends AmiEventCommonFields {
  readonly Event: 'DialEnd';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly DialStatus?: 'ABORT' | 'ANSWER' | 'BUSY' | 'CANCEL' | 'CHANUNAVAIL' | 'CONGESTION' | 'CONTINUE' | 'GOTO' | 'NOANSWER' | (string & {});
  readonly Forward?: string;
}

/**
 * The `DialState` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DialState/
 */
export interface DialStateEventFields extends AmiEventCommonFields {
  readonly Event: 'DialState';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly DestChannel?: string;
  readonly DestChannelState?: string;
  readonly DestChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly DestCallerIDNum?: string;
  readonly DestCallerIDName?: string;
  readonly DestConnectedLineNum?: string;
  readonly DestConnectedLineName?: string;
  readonly DestLanguage?: string;
  readonly DestAccountCode?: string;
  readonly DestContext?: string;
  readonly DestExten?: string;
  readonly DestPriority?: string;
  readonly DestUniqueid?: string;
  readonly DestLinkedid?: string;
  readonly DialStatus?: 'RINGING' | 'PROCEEDING' | 'PROGRESS' | (string & {});
  readonly Forward?: string;
}

/**
 * The `DNDState` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DNDState/
 */
export interface DNDStateEventFields extends AmiEventCommonFields {
  readonly Event: 'DNDState';
  readonly DAHDIChannel?: string;
  readonly Status?: 'enabled' | 'disabled' | (string & {});
}

/**
 * The `DTMFBegin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DTMFBegin/
 */
export interface DTMFBeginEventFields extends AmiEventCommonFields {
  readonly Event: 'DTMFBegin';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Digit?: string;
  readonly Direction?: 'Received' | 'Sent' | (string & {});
}

/**
 * The `DTMFEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/DTMFEnd/
 */
export interface DTMFEndEventFields extends AmiEventCommonFields {
  readonly Event: 'DTMFEnd';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Digit?: string;
  readonly DurationMs?: string;
  readonly Direction?: 'Received' | 'Sent' | (string & {});
}

/**
 * The `EndpointDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/EndpointDetail/
 */
export interface EndpointDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'EndpointDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Context?: string;
  readonly Allow?: string;
  readonly DtmfMode?: string;
  readonly RtpIpv6?: string;
  readonly RtpSymmetric?: string;
  readonly IceSupport?: string;
  readonly UsePtime?: string;
  readonly ForceRport?: string;
  readonly RewriteContact?: string;
  readonly Transport?: string;
  readonly OutboundProxy?: string;
  readonly MohSuggest?: string;
  readonly '100rel'?: string;
  readonly Timers?: string;
  readonly TimersMinSe?: string;
  readonly TimersSessExpires?: string;
  readonly Auth?: string;
  readonly OutboundAuth?: string;
  readonly Aors?: string;
  readonly MediaAddress?: string;
  readonly IdentifyBy?: string;
  readonly DirectMedia?: string;
  readonly DirectMediaMethod?: string;
  readonly TrustConnectedLine?: string;
  readonly SendConnectedLine?: string;
  readonly ConnectedLineMethod?: string;
  readonly DirectMediaGlareMitigation?: string;
  readonly DisableDirectMediaOnNat?: string;
  readonly Callerid?: string;
  readonly CalleridPrivacy?: string;
  readonly CalleridTag?: string;
  readonly TrustIdInbound?: string;
  readonly TrustIdOutbound?: string;
  readonly SendPai?: string;
  readonly SendRpid?: string;
  readonly SendDiversion?: string;
  readonly Mailboxes?: string;
  readonly AggregateMwi?: string;
  readonly MediaEncryption?: string;
  readonly MediaEncryptionOptimistic?: string;
  readonly UseAvpf?: string;
  readonly ForceAvp?: string;
  readonly MediaUseReceivedTransport?: string;
  readonly OneTouchRecording?: string;
  readonly InbandProgress?: string;
  readonly CallGroup?: string;
  readonly PickupGroup?: string;
  readonly NamedCallGroup?: string;
  readonly NamedPickupGroup?: string;
  readonly DeviceStateBusyAt?: string;
  readonly T38Udptl?: string;
  readonly T38UdptlEc?: string;
  readonly T38UdptlMaxdatagram?: string;
  readonly FaxDetect?: string;
  readonly T38UdptlNat?: string;
  readonly T38UdptlIpv6?: string;
  readonly T38BindUdptlToMediaAddress?: string;
  readonly ToneZone?: string;
  readonly Language?: string;
  readonly RecordOnFeature?: string;
  readonly RecordOffFeature?: string;
  readonly AllowTransfer?: string;
  readonly UserEqPhone?: string;
  readonly MohPassthrough?: string;
  readonly SdpOwner?: string;
  readonly SdpSession?: string;
  readonly TosAudio?: string;
  readonly TosVideo?: string;
  readonly CosAudio?: string;
  readonly CosVideo?: string;
  readonly AllowSubscribe?: string;
  readonly SubMinExpiry?: string;
  readonly FromUser?: string;
  readonly FromDomain?: string;
  readonly MwiFromUser?: string;
  readonly RtpEngine?: string;
  readonly DtlsVerify?: string;
  readonly DtlsRekey?: string;
  readonly DtlsCertFile?: string;
  readonly DtlsPrivateKey?: string;
  readonly DtlsCipher?: string;
  readonly DtlsCaFile?: string;
  readonly DtlsCaPath?: string;
  readonly DtlsSetup?: string;
  readonly SrtpTag32?: string;
  readonly RedirectMethod?: string;
  readonly SetVar?: string;
  readonly MessageContext?: string;
  readonly Accountcode?: string;
  readonly PreferredCodecOnly?: string;
  readonly DeviceState?: string;
  readonly ActiveChannels?: string;
  readonly SubscribeContext?: string;
  readonly AllowOverlap?: string;
  readonly OverlapContext?: string;
  readonly AcceptMultipleSdpAnswers?: string;
  readonly Acl?: string;
  readonly AllowUnauthenticatedOptions?: string;
  readonly AsymmetricRtpCodec?: string;
  readonly BindRtpToMediaAddress?: string;
  readonly Bundle?: string;
  readonly CodecPrefsIncomingAnswer?: string;
  readonly CodecPrefsIncomingOffer?: string;
  readonly CodecPrefsOutgoingAnswer?: string;
  readonly CodecPrefsOutgoingOffer?: string;
  readonly ContactAcl?: string;
  readonly DtlsAutoGenerateCert?: string;
  readonly DtlsFingerprint?: string;
  readonly FaxDetectTimeout?: string;
  readonly FollowEarlyMediaFork?: string;
  readonly G726NonStandard?: string;
  readonly GeolocIncomingCallProfile?: string;
  readonly GeolocOutgoingCallProfile?: string;
  readonly Ignore183WithoutSdp?: string;
  readonly IncomingCallOfferPref?: string;
  readonly IncomingMwiMailbox?: string;
  readonly MaxAudioStreams?: string;
  readonly MaxVideoStreams?: string;
  readonly MwiSubscribeReplacesUnsolicited?: string;
  readonly NotifyEarlyInuseRinging?: string;
  readonly OutgoingCallOfferPref?: string;
  readonly ReferBlindProgress?: string;
  readonly RpidImmediate?: string;
  readonly RtcpMux?: string;
  readonly RtpKeepalive?: string;
  readonly RtpTimeout?: string;
  readonly RtpTimeoutHold?: string;
  readonly RtpPortStart?: string;
  readonly RtpPortEnd?: string;
  readonly SecurityNegotiation?: string;
  readonly SendAoc?: string;
  readonly SendHistoryInfo?: string;
  readonly StirShaken?: string;
  readonly StirShakenProfile?: string;
  readonly SuppressMohOnSendonly?: string;
  readonly SuppressQ850ReasonHeaders?: string;
  readonly Tenantid?: string;
  readonly VoicemailExtension?: string;
  readonly Webrtc?: string;
}

/**
 * The `EndpointDetailComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/EndpointDetailComplete/
 */
export interface EndpointDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'EndpointDetailComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `EndpointList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/EndpointList/
 */
export interface EndpointListEventFields extends AmiEventCommonFields {
  readonly Event: 'EndpointList';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Transport?: string;
  readonly Aor?: string;
  readonly Auths?: string;
  readonly OutboundAuths?: string;
  readonly DeviceState?: string;
  readonly ActiveChannels?: string;
  readonly Contacts?: string;
}

/**
 * The `EndpointListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/EndpointListComplete/
 */
export interface EndpointListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'EndpointListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `ExtensionStateListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ExtensionStateListComplete/
 */
export interface ExtensionStateListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ExtensionStateListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `ExtensionStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ExtensionStatus/
 */
export interface ExtensionStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'ExtensionStatus';
  readonly Exten?: string;
  readonly Context?: string;
  readonly Hint?: string;
  readonly Status?: '-2' | '-1' | '0' | '1' | '2' | '4' | '8' | '9' | '16' | '17' | (string & {});
  readonly StatusText?: 'Idle' | 'InUse' | 'Busy' | 'Unavailable' | 'Ringing' | 'InUse&Ringing' | 'Hold' | 'InUse&Hold' | 'Unknown' | (string & {});
}

/**
 * The `FailedACL` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FailedACL/
 */
export interface FailedACLEventFields extends AmiEventCommonFields {
  readonly Event: 'FailedACL';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly ACLName?: string;
  readonly SessionTV?: string;
}

/**
 * The `FAXSession` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FAXSession/
 */
export interface FAXSessionEventFields extends AmiEventCommonFields {
  readonly Event: 'FAXSession';
  readonly SessionNumber?: string;
  readonly Operation?: 'gateway' | 'V.21' | 'send' | 'receive' | 'none' | (string & {});
  readonly State?: 'Uninitialized' | 'Initialized' | 'Open' | 'Active' | 'Complete' | 'Reserved' | 'Inactive' | 'Unknown' | (string & {});
  readonly ErrorCorrectionMode?: 'yes' | 'no' | (string & {});
  readonly DataRate?: string;
  readonly ImageResolution?: string;
  readonly PageNumber?: string;
  readonly FileName?: string;
  readonly PagesTransmitted?: string;
  readonly PagesReceived?: string;
  readonly TotalBadLines?: string;
}

/**
 * The `FAXSessionsComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FAXSessionsComplete/
 */
export interface FAXSessionsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'FAXSessionsComplete';
  readonly Total?: string;
}

/**
 * The `FAXSessionsEntry` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FAXSessionsEntry/
 */
export interface FAXSessionsEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'FAXSessionsEntry';
  readonly Channel?: string;
  readonly Technology?: string;
  readonly SessionNumber?: string;
  readonly SessionType?: 'G.711' | 'T.38' | (string & {});
  readonly Operation?: 'gateway' | 'V.21' | 'send' | 'receive' | 'none' | (string & {});
  readonly State?: 'Uninitialized' | 'Initialized' | 'Open' | 'Active' | 'Complete' | 'Reserved' | 'Inactive' | 'Unknown' | (string & {});
  readonly Files?: string;
}

/**
 * The `FAXStats` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FAXStats/
 */
export interface FAXStatsEventFields extends AmiEventCommonFields {
  readonly Event: 'FAXStats';
  readonly CurrentSessions?: string;
  readonly ReservedSessions?: string;
  readonly TransmitAttempts?: string;
  readonly ReceiveAttempts?: string;
  readonly CompletedFAXes?: string;
  readonly FailedFAXes?: string;
}

/**
 * The `FAXStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FAXStatus/
 */
export interface FAXStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'FAXStatus';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Operation?: 'gateway' | 'receive' | 'send' | (string & {});
  readonly Status?: string;
  readonly LocalStationID?: string;
  readonly FileName?: string;
}

/**
 * The `Flash` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Flash/
 */
export interface FlashEventFields extends AmiEventCommonFields {
  readonly Event: 'Flash';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `FullyBooted` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/FullyBooted/
 */
export interface FullyBootedEventFields extends AmiEventCommonFields {
  readonly Event: 'FullyBooted';
  readonly Status?: string;
  readonly Uptime?: string;
  readonly LastReload?: string;
}

/**
 * The `Hangup` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Hangup/
 */
export interface HangupEventFields extends AmiEventCommonFields {
  readonly Event: 'Hangup';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Cause?: string;
  readonly 'Cause-txt'?: string;
  readonly TechCause?: string;
}

/**
 * The `HangupHandlerPop` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/HangupHandlerPop/
 */
export interface HangupHandlerPopEventFields extends AmiEventCommonFields {
  readonly Event: 'HangupHandlerPop';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Handler?: string;
}

/**
 * The `HangupHandlerPush` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/HangupHandlerPush/
 */
export interface HangupHandlerPushEventFields extends AmiEventCommonFields {
  readonly Event: 'HangupHandlerPush';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Handler?: string;
}

/**
 * The `HangupHandlerRun` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/HangupHandlerRun/
 */
export interface HangupHandlerRunEventFields extends AmiEventCommonFields {
  readonly Event: 'HangupHandlerRun';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Handler?: string;
}

/**
 * The `HangupRequest` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/HangupRequest/
 */
export interface HangupRequestEventFields extends AmiEventCommonFields {
  readonly Event: 'HangupRequest';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Cause?: string;
}

/**
 * The `Hold` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Hold/
 */
export interface HoldEventFields extends AmiEventCommonFields {
  readonly Event: 'Hold';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly MusicClass?: string;
}

/**
 * The `IdentifyDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/IdentifyDetail/
 */
export interface IdentifyDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'IdentifyDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Endpoint?: string;
  readonly SrvLookups?: string;
  readonly Match?: string;
  readonly MatchHeader?: string;
  readonly MatchRequestUri?: string;
  readonly EndpointName?: string;
}

/**
 * The `InboundRegistrationDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/InboundRegistrationDetail/
 */
export interface InboundRegistrationDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'InboundRegistrationDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly MinimumExpiration?: string;
  readonly DefaultExpiration?: string;
  readonly QualifyTimeout?: string;
  readonly Qualify2xxOnly?: string;
  readonly Mailboxes?: string;
  readonly SupportPath?: string;
  readonly RemoveUnavailable?: string;
  readonly VoicemailExtension?: string;
  readonly MaxContacts?: string;
  readonly AuthenticateQualify?: string;
  readonly MaximumExpiration?: string;
  readonly QualifyFrequency?: string;
  readonly RemoveExisting?: string;
  readonly OutboundProxy?: string;
  readonly Contacts?: string;
  readonly Contact?: string;
}

/**
 * The `InboundSubscriptionDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/InboundSubscriptionDetail/
 */
export interface InboundSubscriptionDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'InboundSubscriptionDetail';
  readonly Role?: string;
  readonly Endpoint?: string;
  readonly Callid?: string;
  readonly State?: string;
  readonly Callerid?: string;
  readonly SubscriptionType?: 'mwi' | 'extension_state' | (string & {});
  readonly Extension?: string;
  readonly ExtensionStates?: 'Idle' | 'InUse' | 'Busy' | 'Unavailable' | 'Ringing' | 'InUse&Ringing' | 'Hold' | 'InUse&Hold' | 'Unknown' | (string & {});
  readonly Mailboxes?: string;
}

/**
 * The `InvalidAccountID` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/InvalidAccountID/
 */
export interface InvalidAccountIDEventFields extends AmiEventCommonFields {
  readonly Event: 'InvalidAccountID';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `InvalidPassword` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/InvalidPassword/
 */
export interface InvalidPasswordEventFields extends AmiEventCommonFields {
  readonly Event: 'InvalidPassword';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
  readonly Challenge?: string;
  readonly ReceivedChallenge?: string;
  readonly ReceivedHash?: string;
}

/**
 * The `InvalidTransport` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/InvalidTransport/
 */
export interface InvalidTransportEventFields extends AmiEventCommonFields {
  readonly Event: 'InvalidTransport';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly AttemptedTransport?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `Load` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Load/
 */
export interface LoadEventFields extends AmiEventCommonFields {
  readonly Event: 'Load';
  readonly Module?: string;
  readonly Status?: 'Failure' | 'Success' | 'Decline' | (string & {});
}

/**
 * The `LoadAverageLimit` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/LoadAverageLimit/
 */
export interface LoadAverageLimitEventFields extends AmiEventCommonFields {
  readonly Event: 'LoadAverageLimit';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `LocalBridge` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/LocalBridge/
 */
export interface LocalBridgeEventFields extends AmiEventCommonFields {
  readonly Event: 'LocalBridge';
  readonly LocalOneChannel?: string;
  readonly LocalOneChannelState?: string;
  readonly LocalOneChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalOneCallerIDNum?: string;
  readonly LocalOneCallerIDName?: string;
  readonly LocalOneConnectedLineNum?: string;
  readonly LocalOneConnectedLineName?: string;
  readonly LocalOneLanguage?: string;
  readonly LocalOneAccountCode?: string;
  readonly LocalOneContext?: string;
  readonly LocalOneExten?: string;
  readonly LocalOnePriority?: string;
  readonly LocalOneUniqueid?: string;
  readonly LocalOneLinkedid?: string;
  readonly LocalTwoChannel?: string;
  readonly LocalTwoChannelState?: string;
  readonly LocalTwoChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalTwoCallerIDNum?: string;
  readonly LocalTwoCallerIDName?: string;
  readonly LocalTwoConnectedLineNum?: string;
  readonly LocalTwoConnectedLineName?: string;
  readonly LocalTwoLanguage?: string;
  readonly LocalTwoAccountCode?: string;
  readonly LocalTwoContext?: string;
  readonly LocalTwoExten?: string;
  readonly LocalTwoPriority?: string;
  readonly LocalTwoUniqueid?: string;
  readonly LocalTwoLinkedid?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly LocalOptimization?: 'Yes' | 'No' | (string & {});
}

/**
 * The `LocalOptimizationBegin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/LocalOptimizationBegin/
 */
export interface LocalOptimizationBeginEventFields extends AmiEventCommonFields {
  readonly Event: 'LocalOptimizationBegin';
  readonly LocalOneChannel?: string;
  readonly LocalOneChannelState?: string;
  readonly LocalOneChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalOneCallerIDNum?: string;
  readonly LocalOneCallerIDName?: string;
  readonly LocalOneConnectedLineNum?: string;
  readonly LocalOneConnectedLineName?: string;
  readonly LocalOneLanguage?: string;
  readonly LocalOneAccountCode?: string;
  readonly LocalOneContext?: string;
  readonly LocalOneExten?: string;
  readonly LocalOnePriority?: string;
  readonly LocalOneUniqueid?: string;
  readonly LocalOneLinkedid?: string;
  readonly LocalTwoChannel?: string;
  readonly LocalTwoChannelState?: string;
  readonly LocalTwoChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalTwoCallerIDNum?: string;
  readonly LocalTwoCallerIDName?: string;
  readonly LocalTwoConnectedLineNum?: string;
  readonly LocalTwoConnectedLineName?: string;
  readonly LocalTwoLanguage?: string;
  readonly LocalTwoAccountCode?: string;
  readonly LocalTwoContext?: string;
  readonly LocalTwoExten?: string;
  readonly LocalTwoPriority?: string;
  readonly LocalTwoUniqueid?: string;
  readonly LocalTwoLinkedid?: string;
  readonly SourceChannel?: string;
  readonly SourceChannelState?: string;
  readonly SourceChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly SourceCallerIDNum?: string;
  readonly SourceCallerIDName?: string;
  readonly SourceConnectedLineNum?: string;
  readonly SourceConnectedLineName?: string;
  readonly SourceLanguage?: string;
  readonly SourceAccountCode?: string;
  readonly SourceContext?: string;
  readonly SourceExten?: string;
  readonly SourcePriority?: string;
  readonly SourceUniqueid?: string;
  readonly SourceLinkedid?: string;
  readonly DestUniqueId?: string;
  readonly Id?: string;
}

/**
 * The `LocalOptimizationEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/LocalOptimizationEnd/
 */
export interface LocalOptimizationEndEventFields extends AmiEventCommonFields {
  readonly Event: 'LocalOptimizationEnd';
  readonly LocalOneChannel?: string;
  readonly LocalOneChannelState?: string;
  readonly LocalOneChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalOneCallerIDNum?: string;
  readonly LocalOneCallerIDName?: string;
  readonly LocalOneConnectedLineNum?: string;
  readonly LocalOneConnectedLineName?: string;
  readonly LocalOneLanguage?: string;
  readonly LocalOneAccountCode?: string;
  readonly LocalOneContext?: string;
  readonly LocalOneExten?: string;
  readonly LocalOnePriority?: string;
  readonly LocalOneUniqueid?: string;
  readonly LocalOneLinkedid?: string;
  readonly LocalTwoChannel?: string;
  readonly LocalTwoChannelState?: string;
  readonly LocalTwoChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly LocalTwoCallerIDNum?: string;
  readonly LocalTwoCallerIDName?: string;
  readonly LocalTwoConnectedLineNum?: string;
  readonly LocalTwoConnectedLineName?: string;
  readonly LocalTwoLanguage?: string;
  readonly LocalTwoAccountCode?: string;
  readonly LocalTwoContext?: string;
  readonly LocalTwoExten?: string;
  readonly LocalTwoPriority?: string;
  readonly LocalTwoUniqueid?: string;
  readonly LocalTwoLinkedid?: string;
  readonly Success?: string;
  readonly Id?: string;
}

/**
 * The `LogChannel` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/LogChannel/
 */
export interface LogChannelEventFields extends AmiEventCommonFields {
  readonly Event: 'LogChannel';
  readonly Channel?: string;
}

/**
 * The `MCID` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MCID/
 */
export interface MCIDEventFields extends AmiEventCommonFields {
  readonly Event: 'MCID';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly MCallerIDNumValid?: string;
  readonly MCallerIDNum?: string;
  readonly MCallerIDton?: string;
  readonly MCallerIDNumPlan?: string;
  readonly MCallerIDNumPres?: string;
  readonly MCallerIDNameValid?: string;
  readonly MCallerIDName?: string;
  readonly MCallerIDNameCharSet?: string;
  readonly MCallerIDNamePres?: string;
  readonly MCallerIDSubaddr?: string;
  readonly MCallerIDSubaddrType?: string;
  readonly MCallerIDSubaddrOdd?: string;
  readonly MCallerIDPres?: string;
  readonly MConnectedIDNumValid?: string;
  readonly MConnectedIDNum?: string;
  readonly MConnectedIDton?: string;
  readonly MConnectedIDNumPlan?: string;
  readonly MConnectedIDNumPres?: string;
  readonly MConnectedIDNameValid?: string;
  readonly MConnectedIDName?: string;
  readonly MConnectedIDNameCharSet?: string;
  readonly MConnectedIDNamePres?: string;
  readonly MConnectedIDSubaddr?: string;
  readonly MConnectedIDSubaddrType?: string;
  readonly MConnectedIDSubaddrOdd?: string;
  readonly MConnectedIDPres?: string;
}

/**
 * The `MeetmeEnd` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeEnd/
 */
export interface MeetmeEndEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeEnd';
  readonly Meetme?: string;
}

/**
 * The `MeetmeJoin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeJoin/
 */
export interface MeetmeJoinEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeJoin';
  readonly Meetme?: string;
  readonly User?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `MeetmeLeave` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeLeave/
 */
export interface MeetmeLeaveEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeLeave';
  readonly Meetme?: string;
  readonly User?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Duration?: string;
}

/**
 * The `MeetmeList` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeList/
 */
export interface MeetmeListEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeList';
  readonly Conference?: string;
  readonly UserNumber?: string;
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Channel?: string;
  readonly Admin?: string;
  readonly Role?: string;
  readonly MarkedUser?: string;
  readonly Muted?: string;
  readonly Talking?: string;
}

/**
 * The `MeetmeListRooms` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeListRooms/
 */
export interface MeetmeListRoomsEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeListRooms';
  readonly Conference?: string;
  readonly Parties?: string;
  readonly Marked?: string;
  readonly Activity?: string;
  readonly Creation?: string;
  readonly Locked?: string;
}

/**
 * The `MeetmeMute` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeMute/
 */
export interface MeetmeMuteEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeMute';
  readonly Meetme?: string;
  readonly User?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Duration?: string;
  readonly Status?: 'on' | 'off' | (string & {});
}

/**
 * The `MeetmeTalking` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeTalking/
 */
export interface MeetmeTalkingEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeTalking';
  readonly Meetme?: string;
  readonly User?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Duration?: string;
  readonly Status?: 'on' | 'off' | (string & {});
}

/**
 * The `MeetmeTalkRequest` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MeetmeTalkRequest/
 */
export interface MeetmeTalkRequestEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeTalkRequest';
  readonly Meetme?: string;
  readonly User?: string;
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Duration?: string;
  readonly Status?: 'on' | 'off' | (string & {});
}

/**
 * The `MemoryLimit` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MemoryLimit/
 */
export interface MemoryLimitEventFields extends AmiEventCommonFields {
  readonly Event: 'MemoryLimit';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `MessageWaiting` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MessageWaiting/
 */
export interface MessageWaitingEventFields extends AmiEventCommonFields {
  readonly Event: 'MessageWaiting';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Mailbox?: string;
  readonly Waiting?: string;
  readonly New?: string;
  readonly Old?: string;
}

/**
 * The `MiniVoiceMail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MiniVoiceMail/
 */
export interface MiniVoiceMailEventFields extends AmiEventCommonFields {
  readonly Event: 'MiniVoiceMail';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Action?: string;
  readonly Mailbox?: string;
  readonly Counter?: string;
}

/**
 * The `MixMonitorMute` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MixMonitorMute/
 */
export interface MixMonitorMuteEventFields extends AmiEventCommonFields {
  readonly Event: 'MixMonitorMute';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Direction?: string;
  readonly State?: string;
}

/**
 * The `MixMonitorStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MixMonitorStart/
 */
export interface MixMonitorStartEventFields extends AmiEventCommonFields {
  readonly Event: 'MixMonitorStart';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `MixMonitorStop` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MixMonitorStop/
 */
export interface MixMonitorStopEventFields extends AmiEventCommonFields {
  readonly Event: 'MixMonitorStop';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `MonitorStart` event.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Events/MonitorStart/
 * @deprecated Not sent by Asterisk 24.
 */
export interface MonitorStartEventFields extends AmiEventCommonFields {
  readonly Event: 'MonitorStart';
  /** Asterisk 20 only. */
  readonly Channel?: string;
  /** Asterisk 20 only. */
  readonly ChannelState?: string;
  /** Asterisk 20 only. */
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  /** Asterisk 20 only. */
  readonly CallerIDNum?: string;
  /** Asterisk 20 only. */
  readonly CallerIDName?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineNum?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineName?: string;
  /** Asterisk 20 only. */
  readonly Language?: string;
  /** Asterisk 20 only. */
  readonly AccountCode?: string;
  /** Asterisk 20 only. */
  readonly Context?: string;
  /** Asterisk 20 only. */
  readonly Exten?: string;
  /** Asterisk 20 only. */
  readonly Priority?: string;
  /** Asterisk 20 only. */
  readonly Uniqueid?: string;
  /** Asterisk 20 only. */
  readonly Linkedid?: string;
}

/**
 * The `MonitorStop` event.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Events/MonitorStop/
 * @deprecated Not sent by Asterisk 24.
 */
export interface MonitorStopEventFields extends AmiEventCommonFields {
  readonly Event: 'MonitorStop';
  /** Asterisk 20 only. */
  readonly Channel?: string;
  /** Asterisk 20 only. */
  readonly ChannelState?: string;
  /** Asterisk 20 only. */
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  /** Asterisk 20 only. */
  readonly CallerIDNum?: string;
  /** Asterisk 20 only. */
  readonly CallerIDName?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineNum?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineName?: string;
  /** Asterisk 20 only. */
  readonly Language?: string;
  /** Asterisk 20 only. */
  readonly AccountCode?: string;
  /** Asterisk 20 only. */
  readonly Context?: string;
  /** Asterisk 20 only. */
  readonly Exten?: string;
  /** Asterisk 20 only. */
  readonly Priority?: string;
  /** Asterisk 20 only. */
  readonly Uniqueid?: string;
  /** Asterisk 20 only. */
  readonly Linkedid?: string;
}

/**
 * The `MusicOnHoldStart` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MusicOnHoldStart/
 */
export interface MusicOnHoldStartEventFields extends AmiEventCommonFields {
  readonly Event: 'MusicOnHoldStart';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Class?: string;
}

/**
 * The `MusicOnHoldStop` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MusicOnHoldStop/
 */
export interface MusicOnHoldStopEventFields extends AmiEventCommonFields {
  readonly Event: 'MusicOnHoldStop';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `MWIGet` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MWIGet/
 */
export interface MWIGetEventFields extends AmiEventCommonFields {
  readonly Event: 'MWIGet';
  readonly Mailbox?: string;
  readonly OldMessages?: string;
  readonly NewMessages?: string;
}

/**
 * The `MWIGetComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/MWIGetComplete/
 */
export interface MWIGetCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'MWIGetComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `NewAccountCode` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/NewAccountCode/
 */
export interface NewAccountCodeEventFields extends AmiEventCommonFields {
  readonly Event: 'NewAccountCode';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly OldAccountCode?: string;
}

/**
 * The `NewCallerid` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/NewCallerid/
 */
export interface NewCalleridEventFields extends AmiEventCommonFields {
  readonly Event: 'NewCallerid';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly 'CID-CallingPres'?: string;
}

/**
 * The `Newchannel` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Newchannel/
 */
export interface NewchannelEventFields extends AmiEventCommonFields {
  readonly Event: 'Newchannel';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `NewConnectedLine` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/NewConnectedLine/
 */
export interface NewConnectedLineEventFields extends AmiEventCommonFields {
  readonly Event: 'NewConnectedLine';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `NewExten` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/NewExten/
 */
export interface NewExtenEventFields extends AmiEventCommonFields {
  readonly Event: 'NewExten';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Extension?: string;
  readonly Application?: string;
  readonly AppData?: string;
}

/**
 * The `Newstate` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Newstate/
 */
export interface NewstateEventFields extends AmiEventCommonFields {
  readonly Event: 'Newstate';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `OriginateResponse` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/OriginateResponse/
 */
export interface OriginateResponseEventFields extends AmiEventCommonFields {
  readonly Event: 'OriginateResponse';
  readonly Response?: 'Failure' | 'Success' | (string & {});
  readonly Channel?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Application?: string;
  readonly Data?: string;
  readonly Reason?: string;
  readonly Uniqueid?: string;
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
}

/**
 * The `OutboundRegistrationDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/OutboundRegistrationDetail/
 */
export interface OutboundRegistrationDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'OutboundRegistrationDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly MaxRetries?: string;
  readonly ClientUri?: string;
  readonly SecurityNegotiation?: string;
  readonly AuthRejectionPermanent?: string;
  readonly ServerUri?: string;
  readonly MaxRandomInitialDelay?: string;
  readonly SupportPath?: string;
  readonly RetryInterval?: string;
  readonly ContactHeaderParams?: string;
  readonly Expiration?: string;
  readonly Transport?: string;
  readonly Line?: string;
  readonly ContactUser?: string;
  readonly Endpoint?: string;
  readonly ForbiddenRetryInterval?: string;
  readonly OutboundAuth?: string;
  readonly OutboundProxy?: string;
  readonly FatalRetryInterval?: string;
  readonly SupportOutbound?: string;
  readonly Status?: 'Registered' | 'Unregistered' | 'Rejected' | (string & {});
  readonly NextReg?: string;
  /** Asterisk 22 and later. */
  readonly UserAgent?: string;
}

/**
 * The `OutboundSubscriptionDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/OutboundSubscriptionDetail/
 */
export interface OutboundSubscriptionDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'OutboundSubscriptionDetail';
  readonly Role?: string;
  readonly Endpoint?: string;
  readonly Callid?: string;
  readonly State?: string;
  readonly Callerid?: string;
  readonly SubscriptionType?: 'mwi' | 'extension_state' | (string & {});
  readonly Extension?: string;
  readonly ExtensionStates?: 'Idle' | 'InUse' | 'Busy' | 'Unavailable' | 'Ringing' | 'InUse&Ringing' | 'Hold' | 'InUse&Hold' | 'Unknown' | (string & {});
  readonly Mailboxes?: string;
}

/**
 * The `ParkedCall` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ParkedCall/
 */
export interface ParkedCallEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkedCall';
  readonly ParkeeChannel?: string;
  readonly ParkeeChannelState?: string;
  readonly ParkeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkeeCallerIDNum?: string;
  readonly ParkeeCallerIDName?: string;
  readonly ParkeeConnectedLineNum?: string;
  readonly ParkeeConnectedLineName?: string;
  readonly ParkeeLanguage?: string;
  readonly ParkeeAccountCode?: string;
  readonly ParkeeContext?: string;
  readonly ParkeeExten?: string;
  readonly ParkeePriority?: string;
  readonly ParkeeUniqueid?: string;
  readonly ParkeeLinkedid?: string;
  readonly ParkerDialString?: string;
  readonly Parkinglot?: string;
  readonly ParkingSpace?: string;
  readonly ParkingTimeout?: string;
  readonly ParkingDuration?: string;
}

/**
 * The `ParkedCallGiveUp` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ParkedCallGiveUp/
 */
export interface ParkedCallGiveUpEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkedCallGiveUp';
  readonly ParkeeChannel?: string;
  readonly ParkeeChannelState?: string;
  readonly ParkeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkeeCallerIDNum?: string;
  readonly ParkeeCallerIDName?: string;
  readonly ParkeeConnectedLineNum?: string;
  readonly ParkeeConnectedLineName?: string;
  readonly ParkeeLanguage?: string;
  readonly ParkeeAccountCode?: string;
  readonly ParkeeContext?: string;
  readonly ParkeeExten?: string;
  readonly ParkeePriority?: string;
  readonly ParkeeUniqueid?: string;
  readonly ParkeeLinkedid?: string;
  readonly ParkerChannel?: string;
  readonly ParkerChannelState?: string;
  readonly ParkerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkerCallerIDNum?: string;
  readonly ParkerCallerIDName?: string;
  readonly ParkerConnectedLineNum?: string;
  readonly ParkerConnectedLineName?: string;
  readonly ParkerLanguage?: string;
  readonly ParkerAccountCode?: string;
  readonly ParkerContext?: string;
  readonly ParkerExten?: string;
  readonly ParkerPriority?: string;
  readonly ParkerUniqueid?: string;
  readonly ParkerLinkedid?: string;
  readonly ParkerDialString?: string;
  readonly Parkinglot?: string;
  readonly ParkingSpace?: string;
  readonly ParkingTimeout?: string;
  readonly ParkingDuration?: string;
}

/**
 * The `ParkedCallSwap` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ParkedCallSwap/
 */
export interface ParkedCallSwapEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkedCallSwap';
  readonly ParkeeChannel?: string;
  readonly ParkeeChannelState?: string;
  readonly ParkeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkeeCallerIDNum?: string;
  readonly ParkeeCallerIDName?: string;
  readonly ParkeeConnectedLineNum?: string;
  readonly ParkeeConnectedLineName?: string;
  readonly ParkeeLanguage?: string;
  readonly ParkeeAccountCode?: string;
  readonly ParkeeContext?: string;
  readonly ParkeeExten?: string;
  readonly ParkeePriority?: string;
  readonly ParkeeUniqueid?: string;
  readonly ParkeeLinkedid?: string;
  readonly ParkerChannel?: string;
  readonly ParkerChannelState?: string;
  readonly ParkerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkerCallerIDNum?: string;
  readonly ParkerCallerIDName?: string;
  readonly ParkerConnectedLineNum?: string;
  readonly ParkerConnectedLineName?: string;
  readonly ParkerLanguage?: string;
  readonly ParkerAccountCode?: string;
  readonly ParkerContext?: string;
  readonly ParkerExten?: string;
  readonly ParkerPriority?: string;
  readonly ParkerUniqueid?: string;
  readonly ParkerLinkedid?: string;
  readonly ParkerDialString?: string;
  readonly Parkinglot?: string;
  readonly ParkingSpace?: string;
  readonly ParkingTimeout?: string;
  readonly ParkingDuration?: string;
}

/**
 * The `ParkedCallTimeOut` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ParkedCallTimeOut/
 */
export interface ParkedCallTimeOutEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkedCallTimeOut';
  readonly ParkeeChannel?: string;
  readonly ParkeeChannelState?: string;
  readonly ParkeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkeeCallerIDNum?: string;
  readonly ParkeeCallerIDName?: string;
  readonly ParkeeConnectedLineNum?: string;
  readonly ParkeeConnectedLineName?: string;
  readonly ParkeeLanguage?: string;
  readonly ParkeeAccountCode?: string;
  readonly ParkeeContext?: string;
  readonly ParkeeExten?: string;
  readonly ParkeePriority?: string;
  readonly ParkeeUniqueid?: string;
  readonly ParkeeLinkedid?: string;
  readonly ParkerChannel?: string;
  readonly ParkerChannelState?: string;
  readonly ParkerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkerCallerIDNum?: string;
  readonly ParkerCallerIDName?: string;
  readonly ParkerConnectedLineNum?: string;
  readonly ParkerConnectedLineName?: string;
  readonly ParkerLanguage?: string;
  readonly ParkerAccountCode?: string;
  readonly ParkerContext?: string;
  readonly ParkerExten?: string;
  readonly ParkerPriority?: string;
  readonly ParkerUniqueid?: string;
  readonly ParkerLinkedid?: string;
  readonly ParkerDialString?: string;
  readonly Parkinglot?: string;
  readonly ParkingSpace?: string;
  readonly ParkingTimeout?: string;
  readonly ParkingDuration?: string;
}

/**
 * The `PeerStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/PeerStatus/
 */
export interface PeerStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'PeerStatus';
  readonly ChannelType?: string;
  readonly Peer?: string;
  readonly PeerStatus?: 'Unknown' | 'Registered' | 'Unregistered' | 'Rejected' | 'Lagged' | (string & {});
  readonly Cause?: string;
  readonly Address?: string;
  readonly Port?: string;
  readonly Time?: string;
}

/**
 * The `Pickup` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Pickup/
 */
export interface PickupEventFields extends AmiEventCommonFields {
  readonly Event: 'Pickup';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly TargetChannel?: string;
  readonly TargetChannelState?: string;
  readonly TargetChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly TargetCallerIDNum?: string;
  readonly TargetCallerIDName?: string;
  readonly TargetConnectedLineNum?: string;
  readonly TargetConnectedLineName?: string;
  readonly TargetLanguage?: string;
  readonly TargetAccountCode?: string;
  readonly TargetContext?: string;
  readonly TargetExten?: string;
  readonly TargetPriority?: string;
  readonly TargetUniqueid?: string;
  readonly TargetLinkedid?: string;
}

/**
 * The `PJSIPMaintenanceStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/PJSIPMaintenanceStatus/
 */
export interface PJSIPMaintenanceStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'PJSIPMaintenanceStatus';
  readonly Endpoint?: string;
  readonly Status?: 'enabled' | 'disabled' | (string & {});
}

/**
 * The `PresenceStateChange` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/PresenceStateChange/
 */
export interface PresenceStateChangeEventFields extends AmiEventCommonFields {
  readonly Event: 'PresenceStateChange';
  readonly Presentity?: string;
  readonly Status?: string;
  readonly Subtype?: string;
  readonly Message?: string;
}

/**
 * The `PresenceStateListComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/PresenceStateListComplete/
 */
export interface PresenceStateListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'PresenceStateListComplete';
  readonly EventList?: string;
  readonly ListItems?: string;
}

/**
 * The `PresenceStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/PresenceStatus/
 */
export interface PresenceStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'PresenceStatus';
  readonly Exten?: string;
  readonly Context?: string;
  readonly Hint?: string;
  readonly Status?: string;
  readonly Subtype?: string;
  readonly Message?: string;
}

/**
 * The `QueueCallerAbandon` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueCallerAbandon/
 */
export interface QueueCallerAbandonEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueCallerAbandon';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Queue?: string;
  readonly Position?: string;
  readonly OriginalPosition?: string;
  readonly HoldTime?: string;
}

/**
 * The `QueueCallerJoin` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueCallerJoin/
 */
export interface QueueCallerJoinEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueCallerJoin';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Queue?: string;
  readonly Position?: string;
  readonly Count?: string;
}

/**
 * The `QueueCallerLeave` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueCallerLeave/
 */
export interface QueueCallerLeaveEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueCallerLeave';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Queue?: string;
  readonly Count?: string;
  readonly Position?: string;
}

/**
 * The `QueueEntry` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueEntry/
 */
export interface QueueEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueEntry';
  readonly Queue?: string;
  readonly Position?: string;
  readonly Channel?: string;
  readonly Uniqueid?: string;
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Wait?: string;
  readonly Priority?: string;
}

/**
 * The `QueueMemberAdded` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberAdded/
 */
export interface QueueMemberAddedEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberAdded';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueMemberPause` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberPause/
 */
export interface QueueMemberPauseEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberPause';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueMemberPenalty` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberPenalty/
 */
export interface QueueMemberPenaltyEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberPenalty';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueMemberRemoved` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberRemoved/
 */
export interface QueueMemberRemovedEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberRemoved';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueMemberRinginuse` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberRinginuse/
 */
export interface QueueMemberRinginuseEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberRinginuse';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueMemberStatus` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueMemberStatus/
 */
export interface QueueMemberStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMemberStatus';
  readonly Queue?: string;
  readonly MemberName?: string;
  readonly Interface?: string;
  readonly StateInterface?: string;
  readonly Membership?: 'dynamic' | 'realtime' | 'static' | (string & {});
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: '0' | '1' | (string & {});
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | (string & {});
  readonly Paused?: '0' | '1' | (string & {});
  readonly PausedReason?: string;
  readonly Ringinuse?: '0' | '1' | (string & {});
  readonly Wrapuptime?: string;
}

/**
 * The `QueueParams` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/QueueParams/
 */
export interface QueueParamsEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueParams';
  readonly Max?: string;
  readonly Strategy?: string;
  readonly Calls?: string;
  readonly Holdtime?: string;
  readonly TalkTime?: string;
  readonly Completed?: string;
  readonly Abandoned?: string;
  readonly ServiceLevelPerf?: string;
  readonly ServiceLevelPerf2?: string;
}

/**
 * The `ReceiveFAX` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ReceiveFAX/
 */
export interface ReceiveFAXEventFields extends AmiEventCommonFields {
  readonly Event: 'ReceiveFAX';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly LocalStationID?: string;
  readonly RemoteStationID?: string;
  readonly PagesTransferred?: string;
  readonly Resolution?: string;
  readonly TransferRate?: string;
  readonly FileName?: string;
}

/**
 * The `Registry` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Registry/
 */
export interface RegistryEventFields extends AmiEventCommonFields {
  readonly Event: 'Registry';
  readonly ChannelType?: string;
  readonly Username?: string;
  readonly Domain?: string;
  readonly Status?: 'Registered' | 'Unregistered' | 'Rejected' | 'Failed' | (string & {});
  readonly Cause?: string;
}

/**
 * The `Reload` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Reload/
 */
export interface ReloadEventFields extends AmiEventCommonFields {
  readonly Event: 'Reload';
  readonly Module?: string;
  readonly Status?: '0' | '1' | '2' | '3' | '4' | '5' | '6' | (string & {});
}

/**
 * The `Rename` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Rename/
 */
export interface RenameEventFields extends AmiEventCommonFields {
  readonly Event: 'Rename';
}

/**
 * The `RequestBadFormat` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/RequestBadFormat/
 */
export interface RequestBadFormatEventFields extends AmiEventCommonFields {
  readonly Event: 'RequestBadFormat';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly RequestType?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
  readonly RequestParams?: string;
}

/**
 * The `RequestNotAllowed` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/RequestNotAllowed/
 */
export interface RequestNotAllowedEventFields extends AmiEventCommonFields {
  readonly Event: 'RequestNotAllowed';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly RequestType?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
  readonly RequestParams?: string;
}

/**
 * The `RequestNotSupported` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/RequestNotSupported/
 */
export interface RequestNotSupportedEventFields extends AmiEventCommonFields {
  readonly Event: 'RequestNotSupported';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly RequestType?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `ResourceListDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/ResourceListDetail/
 */
export interface ResourceListDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'ResourceListDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly FullState?: string;
  readonly ListItem?: string;
  readonly NotificationBatchInterval?: string;
  readonly ResourceDisplayName?: string;
}

/**
 * The `RTCPReceived` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/RTCPReceived/
 */
export interface RTCPReceivedEventFields extends AmiEventCommonFields {
  readonly Event: 'RTCPReceived';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly SSRC?: string;
  readonly PT?: '200(SR)' | '201(RR)' | (string & {});
  readonly From?: string;
  readonly RTT?: string;
  readonly ReportCount?: string;
  readonly SentNTP?: string;
  readonly SentRTP?: string;
  readonly SentPackets?: string;
  readonly SentOctets?: string;
  readonly To?: string;
  readonly ReportXSourceSSRC?: string;
  readonly ReportXFractionLost?: string;
  readonly ReportXCumulativeLost?: string;
  readonly ReportXHighestSequence?: string;
  readonly ReportXSequenceNumberCycles?: string;
  readonly ReportXIAJitter?: string;
  readonly ReportXLSR?: string;
  readonly ReportXDLSR?: string;
}

/**
 * The `RTCPSent` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/RTCPSent/
 */
export interface RTCPSentEventFields extends AmiEventCommonFields {
  readonly Event: 'RTCPSent';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly SSRC?: string;
  readonly PT?: '200(SR)' | '201(RR)' | (string & {});
  readonly To?: string;
  readonly ReportCount?: string;
  readonly SentNTP?: string;
  readonly SentRTP?: string;
  readonly SentPackets?: string;
  readonly SentOctets?: string;
  readonly ReportXSourceSSRC?: string;
  readonly ReportXFractionLost?: string;
  readonly ReportXCumulativeLost?: string;
  readonly ReportXHighestSequence?: string;
  readonly ReportXSequenceNumberCycles?: string;
  readonly ReportXIAJitter?: string;
  readonly ReportXLSR?: string;
  readonly ReportXDLSR?: string;
}

/**
 * The `SendFAX` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SendFAX/
 */
export interface SendFAXEventFields extends AmiEventCommonFields {
  readonly Event: 'SendFAX';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly LocalStationID?: string;
  readonly RemoteStationID?: string;
  readonly PagesTransferred?: string;
  readonly Resolution?: string;
  readonly TransferRate?: string;
  readonly FileName?: string;
}

/**
 * The `SessionLimit` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SessionLimit/
 */
export interface SessionLimitEventFields extends AmiEventCommonFields {
  readonly Event: 'SessionLimit';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `SessionTimeout` event.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Events/SessionTimeout/
 * @deprecated Not sent by Asterisk 24.
 */
export interface SessionTimeoutEventFields extends AmiEventCommonFields {
  readonly Event: 'SessionTimeout';
  /** Asterisk 20 only. */
  readonly Channel?: string;
  /** Asterisk 20 only. */
  readonly ChannelState?: string;
  /** Asterisk 20 only. */
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  /** Asterisk 20 only. */
  readonly CallerIDNum?: string;
  /** Asterisk 20 only. */
  readonly CallerIDName?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineNum?: string;
  /** Asterisk 20 only. */
  readonly ConnectedLineName?: string;
  /** Asterisk 20 only. */
  readonly Language?: string;
  /** Asterisk 20 only. */
  readonly AccountCode?: string;
  /** Asterisk 20 only. */
  readonly Context?: string;
  /** Asterisk 20 only. */
  readonly Exten?: string;
  /** Asterisk 20 only. */
  readonly Priority?: string;
  /** Asterisk 20 only. */
  readonly Uniqueid?: string;
  /** Asterisk 20 only. */
  readonly Linkedid?: string;
  /** Asterisk 20 only. */
  readonly Source?: 'RTPTimeout' | 'SIPSessionTimer' | (string & {});
}

/**
 * The `Shutdown` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Shutdown/
 */
export interface ShutdownEventFields extends AmiEventCommonFields {
  readonly Event: 'Shutdown';
  readonly Shutdown?: 'Uncleanly' | 'Cleanly' | (string & {});
  readonly Restart?: 'True' | 'False' | (string & {});
}

/**
 * The `SIPQualifyPeerDone` event.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Events/SIPQualifyPeerDone/
 * @deprecated Not sent by Asterisk 24.
 */
export interface SIPQualifyPeerDoneEventFields extends AmiEventCommonFields {
  readonly Event: 'SIPQualifyPeerDone';
  /** Asterisk 20 only. */
  readonly Peer?: string;
}

/**
 * The `SoftHangupRequest` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SoftHangupRequest/
 */
export interface SoftHangupRequestEventFields extends AmiEventCommonFields {
  readonly Event: 'SoftHangupRequest';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Cause?: string;
}

/**
 * The `SpanAlarm` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SpanAlarm/
 */
export interface SpanAlarmEventFields extends AmiEventCommonFields {
  readonly Event: 'SpanAlarm';
  readonly Span?: string;
  readonly Alarm?: string;
}

/**
 * The `SpanAlarmClear` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SpanAlarmClear/
 */
export interface SpanAlarmClearEventFields extends AmiEventCommonFields {
  readonly Event: 'SpanAlarmClear';
  readonly Span?: string;
}

/**
 * The `Status` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Status/
 */
export interface StatusEventFields extends AmiEventCommonFields {
  readonly Event: 'Status';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Type?: string;
  readonly DNID?: string;
  readonly EffectiveConnectedLineNum?: string;
  readonly EffectiveConnectedLineName?: string;
  readonly TimeToHangup?: string;
  readonly BridgeID?: string;
  readonly Application?: string;
  readonly Data?: string;
  readonly Nativeformats?: string;
  readonly Readformat?: string;
  readonly Readtrans?: string;
  readonly Writeformat?: string;
  readonly Writetrans?: string;
  readonly Callgroup?: string;
  readonly Pickupgroup?: string;
  readonly Seconds?: string;
}

/**
 * The `StatusComplete` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/StatusComplete/
 */
export interface StatusCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'StatusComplete';
  readonly Items?: string;
}

/**
 * The `SuccessfulAuth` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/SuccessfulAuth/
 */
export interface SuccessfulAuthEventFields extends AmiEventCommonFields {
  readonly Event: 'SuccessfulAuth';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly UsingPassword?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `TransportDetail` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/TransportDetail/
 */
export interface TransportDetailEventFields extends AmiEventCommonFields {
  readonly Event: 'TransportDetail';
  readonly ObjectType?: string;
  readonly ObjectName?: string;
  readonly Protocol?: string;
  readonly Bind?: string;
  readonly AsycOperations?: string;
  readonly CaListFile?: string;
  readonly CaListPath?: string;
  readonly CertFile?: string;
  readonly PrivKeyFile?: string;
  readonly Password?: string;
  readonly ExternalSignalingAddress?: string;
  readonly ExternalSignalingPort?: string;
  readonly ExternalSignalingHostname?: string;
  readonly ExternalMediaAddress?: string;
  readonly Domain?: string;
  readonly VerifyServer?: string;
  readonly VerifyClient?: string;
  readonly RequireClientCert?: string;
  readonly Method?: string;
  readonly Cipher?: string;
  readonly LocalNet?: string;
  readonly Tos?: string;
  readonly Cos?: string;
  readonly WebsocketWriteTimeout?: string;
  readonly AllowReload?: string;
  readonly AllowWildcardCerts?: string;
  readonly SymmetricTransport?: string;
  readonly TcpKeepaliveEnable?: string;
  readonly TcpKeepaliveIdleTime?: string;
  readonly TcpKeepaliveIntervalTime?: string;
  readonly TcpKeepaliveProbeCount?: string;
  readonly EndpointName?: string;
}

/**
 * The `UnexpectedAddress` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/UnexpectedAddress/
 */
export interface UnexpectedAddressEventFields extends AmiEventCommonFields {
  readonly Event: 'UnexpectedAddress';
  readonly EventTV?: string;
  readonly Severity?: 'Informational' | 'Error' | (string & {});
  readonly Service?: string;
  readonly EventVersion?: string;
  readonly AccountID?: string;
  readonly SessionID?: string;
  readonly LocalAddress?: string;
  readonly RemoteAddress?: string;
  readonly ExpectedAddress?: string;
  readonly Module?: string;
  readonly SessionTV?: string;
}

/**
 * The `Unhold` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Unhold/
 */
export interface UnholdEventFields extends AmiEventCommonFields {
  readonly Event: 'Unhold';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `Unload` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Unload/
 */
export interface UnloadEventFields extends AmiEventCommonFields {
  readonly Event: 'Unload';
  readonly Module?: string;
  readonly Status?: 'Success' | (string & {});
}

/**
 * The `UnParkedCall` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/UnParkedCall/
 */
export interface UnParkedCallEventFields extends AmiEventCommonFields {
  readonly Event: 'UnParkedCall';
  readonly ParkeeChannel?: string;
  readonly ParkeeChannelState?: string;
  readonly ParkeeChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkeeCallerIDNum?: string;
  readonly ParkeeCallerIDName?: string;
  readonly ParkeeConnectedLineNum?: string;
  readonly ParkeeConnectedLineName?: string;
  readonly ParkeeLanguage?: string;
  readonly ParkeeAccountCode?: string;
  readonly ParkeeContext?: string;
  readonly ParkeeExten?: string;
  readonly ParkeePriority?: string;
  readonly ParkeeUniqueid?: string;
  readonly ParkeeLinkedid?: string;
  readonly ParkerChannel?: string;
  readonly ParkerChannelState?: string;
  readonly ParkerChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly ParkerCallerIDNum?: string;
  readonly ParkerCallerIDName?: string;
  readonly ParkerConnectedLineNum?: string;
  readonly ParkerConnectedLineName?: string;
  readonly ParkerLanguage?: string;
  readonly ParkerAccountCode?: string;
  readonly ParkerContext?: string;
  readonly ParkerExten?: string;
  readonly ParkerPriority?: string;
  readonly ParkerUniqueid?: string;
  readonly ParkerLinkedid?: string;
  readonly ParkerDialString?: string;
  readonly Parkinglot?: string;
  readonly ParkingSpace?: string;
  readonly ParkingTimeout?: string;
  readonly ParkingDuration?: string;
  readonly RetrieverChannel?: string;
  readonly RetrieverChannelState?: string;
  readonly RetrieverChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly RetrieverCallerIDNum?: string;
  readonly RetrieverCallerIDName?: string;
  readonly RetrieverConnectedLineNum?: string;
  readonly RetrieverConnectedLineName?: string;
  readonly RetrieverLanguage?: string;
  readonly RetrieverAccountCode?: string;
  readonly RetrieverContext?: string;
  readonly RetrieverExten?: string;
  readonly RetrieverPriority?: string;
  readonly RetrieverUniqueid?: string;
  readonly RetrieverLinkedid?: string;
}

/**
 * The `UserEvent` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/UserEvent/
 */
export interface UserEventEventFields extends AmiEventCommonFields {
  readonly Event: 'UserEvent';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly UserEvent?: string;
}

/**
 * The `VarSet` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/VarSet/
 */
export interface VarSetEventFields extends AmiEventCommonFields {
  readonly Event: 'VarSet';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
  readonly Variable?: string;
  readonly Value?: string;
}

/**
 * The `VoicemailPasswordChange` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/VoicemailPasswordChange/
 */
export interface VoicemailPasswordChangeEventFields extends AmiEventCommonFields {
  readonly Event: 'VoicemailPasswordChange';
  readonly Context?: string;
  readonly Mailbox?: string;
  readonly NewPassword?: string;
}

/**
 * The `Wink` event.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Events/Wink/
 */
export interface WinkEventFields extends AmiEventCommonFields {
  readonly Event: 'Wink';
  readonly Channel?: string;
  readonly ChannelState?: string;
  readonly ChannelStateDesc?: 'Down' | 'Rsrvd' | 'OffHook' | 'Dialing' | 'Ring' | 'Ringing' | 'Up' | 'Busy' | 'Dialing Offhook' | 'Pre-ring' | 'Unknown' | (string & {});
  readonly CallerIDNum?: string;
  readonly CallerIDName?: string;
  readonly ConnectedLineNum?: string;
  readonly ConnectedLineName?: string;
  readonly Language?: string;
  readonly AccountCode?: string;
  readonly Context?: string;
  readonly Exten?: string;
  readonly Priority?: string;
  readonly Uniqueid?: string;
  readonly Linkedid?: string;
}

/**
 * The `BridgeListComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (main/manager_bridges.c) and may be incomplete.
 */
export interface BridgeListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeListComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `BridgeListItem` event.
 * Asterisk does not document this event. The fields were read from its source code (main/manager_bridges.c) and may be incomplete.
 */
export interface BridgeListItemEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeListItem';
}

/**
 * The `BridgeTechnologyListComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (main/bridge.c) and may be incomplete.
 */
export interface BridgeTechnologyListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeTechnologyListComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `BridgeTechnologyListItem` event.
 * Asterisk does not document this event. The fields were read from its source code (main/bridge.c) and may be incomplete.
 */
export interface BridgeTechnologyListItemEventFields extends AmiEventCommonFields {
  readonly Event: 'BridgeTechnologyListItem';
  readonly BridgeTechnology?: string;
  readonly BridgeType?: string;
  readonly BridgePriority?: string;
  readonly BridgeSuspended?: string;
}

/**
 * The `CCAvailable` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCAvailableEventFields extends AmiEventCommonFields {
  readonly Event: 'CCAvailable';
  readonly CoreID?: string;
  readonly Callee?: string;
  readonly Service?: string;
}

/**
 * The `CCCallerRecalling` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCCallerRecallingEventFields extends AmiEventCommonFields {
  readonly Event: 'CCCallerRecalling';
  readonly CoreID?: string;
  readonly Caller?: string;
}

/**
 * The `CCCallerStartMonitoring` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCCallerStartMonitoringEventFields extends AmiEventCommonFields {
  readonly Event: 'CCCallerStartMonitoring';
  readonly CoreID?: string;
  readonly Caller?: string;
}

/**
 * The `CCCallerStopMonitoring` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCCallerStopMonitoringEventFields extends AmiEventCommonFields {
  readonly Event: 'CCCallerStopMonitoring';
  readonly CoreID?: string;
  readonly Caller?: string;
}

/**
 * The `CCFailure` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCFailureEventFields extends AmiEventCommonFields {
  readonly Event: 'CCFailure';
  readonly CoreID?: string;
  readonly Caller?: string;
  readonly Reason?: string;
}

/**
 * The `CCMonitorFailed` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCMonitorFailedEventFields extends AmiEventCommonFields {
  readonly Event: 'CCMonitorFailed';
  readonly CoreID?: string;
  readonly Callee?: string;
}

/**
 * The `CCOfferTimerStart` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCOfferTimerStartEventFields extends AmiEventCommonFields {
  readonly Event: 'CCOfferTimerStart';
  readonly CoreID?: string;
  readonly Caller?: string;
  readonly Expires?: string;
}

/**
 * The `CCRecallComplete` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCRecallCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'CCRecallComplete';
  readonly CoreID?: string;
  readonly Caller?: string;
}

/**
 * The `CCRequestAcknowledged` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCRequestAcknowledgedEventFields extends AmiEventCommonFields {
  readonly Event: 'CCRequestAcknowledged';
  readonly CoreID?: string;
  readonly Caller?: string;
}

/**
 * The `CCRequested` event.
 * Asterisk does not document this event. The fields were read from its source code (main/stasis_system.c) and may be incomplete.
 */
export interface CCRequestedEventFields extends AmiEventCommonFields {
  readonly Event: 'CCRequested';
  readonly CoreID?: string;
  readonly Caller?: string;
  readonly Callee?: string;
}

/**
 * The `ChannelHungup` event.
 * Asterisk does not document this event. The fields were read from its source code (main/manager.c) and may be incomplete.
 */
export interface ChannelHungupEventFields extends AmiEventCommonFields {
  readonly Event: 'ChannelHungup';
  readonly Channel?: string;
}

/**
 * The `ConfbridgeListComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_confbridge.c) and may be incomplete.
 */
export interface ConfbridgeListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeListComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `ConfbridgeListRoomsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_confbridge.c) and may be incomplete.
 */
export interface ConfbridgeListRoomsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ConfbridgeListRoomsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `ContactStatusDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_registrar.c) and may be incomplete.
 */
export interface ContactStatusDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ContactStatusDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `CoreShowChannelMap` event.
 * Asterisk does not document this event. The fields were read from its source code (main/manager.c) and may be incomplete.
 */
export interface CoreShowChannelMapEventFields extends AmiEventCommonFields {
  readonly Event: 'CoreShowChannelMap';
  readonly ConnectedChannel?: string;
}

/**
 * The `DAHDIShowChannels` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_dahdi.c) and may be incomplete.
 */
export interface DAHDIShowChannelsEventFields extends AmiEventCommonFields {
  readonly Event: 'DAHDIShowChannels';
  readonly DAHDIChannel?: string;
  readonly Channel?: string;
  readonly Uniqueid?: string;
  readonly AccountCode?: string;
  readonly Signalling?: string;
  readonly SignallingCode?: string;
  readonly Context?: string;
  readonly DND?: string;
  readonly Alarm?: string;
  readonly Description?: string;
}

/**
 * The `DAHDIShowChannelsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_dahdi.c) and may be incomplete.
 */
export interface DAHDIShowChannelsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DAHDIShowChannelsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `DAHDIShowStatus` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_dahdi.c) and may be incomplete.
 */
export interface DAHDIShowStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'DAHDIShowStatus';
  readonly Span?: string;
  readonly Description?: string;
  readonly Alarms?: string;
  readonly IRQ?: string;
  readonly bpviol?: string;
  readonly CRC?: string;
  readonly Framing?: string;
  readonly Coding?: string;
  readonly Options?: string;
  readonly LBO?: string;
}

/**
 * The `DAHDIShowStatusComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_dahdi.c) and may be incomplete.
 */
export interface DAHDIShowStatusCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DAHDIShowStatusComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `DBGetComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (main/db.c) and may be incomplete.
 */
export interface DBGetCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DBGetComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `DBGetResponse` event.
 * Asterisk does not document this event. The fields were read from its source code (main/db.c) and may be incomplete.
 */
export interface DBGetResponseEventFields extends AmiEventCommonFields {
  readonly Event: 'DBGetResponse';
  readonly Family?: string;
  readonly Key?: string;
  readonly Val?: string;
}

/**
 * The `DBGetTreeComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (main/db.c) and may be incomplete.
 */
export interface DBGetTreeCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DBGetTreeComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `DBGetTreeResponse` event.
 * Asterisk does not document this event. The fields were read from its source code (main/db.c) and may be incomplete.
 */
export interface DBGetTreeResponseEventFields extends AmiEventCommonFields {
  readonly Event: 'DBGetTreeResponse';
  readonly Key?: string;
  readonly Val?: string;
}

/**
 * The `DeviceEntry` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_skinny.c) and may be incomplete.
 * Asterisk 20 only.
 * @deprecated Not sent by Asterisk 24.
 */
export interface DeviceEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'DeviceEntry';
  readonly ObjectName?: string;
  readonly ChannelObjectType?: string;
  readonly DeviceId?: string;
  readonly IPaddress?: string;
  readonly Type?: string;
  readonly Devicestatus?: string;
  readonly NumberOfLines?: string;
}

/**
 * The `DevicelistComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_skinny.c) and may be incomplete.
 * Asterisk 20 only.
 * @deprecated Not sent by Asterisk 24.
 */
export interface DevicelistCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'DevicelistComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `InboundRegistrationDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_registrar.c) and may be incomplete.
 */
export interface InboundRegistrationDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'InboundRegistrationDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `InboundSubscriptionDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_pubsub.c) and may be incomplete.
 */
export interface InboundSubscriptionDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'InboundSubscriptionDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `JabberStatus` event.
 * Asterisk does not document this event. The fields were read from its source code (res/res_xmpp.c) and may be incomplete.
 */
export interface JabberStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'JabberStatus';
  readonly Account?: string;
  readonly JID?: string;
  readonly Resource?: string;
  readonly Status?: string;
  readonly Priority?: string;
  readonly Description?: string;
}

/**
 * The `LineEntry` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_skinny.c) and may be incomplete.
 * Asterisk 20 only.
 * @deprecated Not sent by Asterisk 24.
 */
export interface LineEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'LineEntry';
  readonly ObjectName?: string;
  readonly ChannelObjectType?: string;
  readonly Device?: string;
  readonly Instance?: string;
  readonly Label?: string;
}

/**
 * The `LinelistComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_skinny.c) and may be incomplete.
 * Asterisk 20 only.
 * @deprecated Not sent by Asterisk 24.
 */
export interface LinelistCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'LinelistComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `ListDialplan` event.
 * Asterisk does not document this event. The fields were read from its source code (main/pbx.c) and may be incomplete.
 */
export interface ListDialplanEventFields extends AmiEventCommonFields {
  readonly Event: 'ListDialplan';
}

/**
 * The `MeetmeListComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_meetme.c) and may be incomplete.
 */
export interface MeetmeListCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeListComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `MeetmeListRoomsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_meetme.c) and may be incomplete.
 */
export interface MeetmeListRoomsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'MeetmeListRoomsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `MobileStatus` event.
 * Asterisk does not document this event. The fields were read from its source code (addons/chan_mobile.c) and may be incomplete.
 */
export interface MobileStatusEventFields extends AmiEventCommonFields {
  readonly Event: 'MobileStatus';
  readonly Status?: string;
  readonly Device?: string;
}

/**
 * The `OutboundRegistrationDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_outbound_registration.c) and may be incomplete.
 */
export interface OutboundRegistrationDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'OutboundRegistrationDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `OutboundSubscriptionDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_pubsub.c) and may be incomplete.
 */
export interface OutboundSubscriptionDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'OutboundSubscriptionDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `ParkedCallsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/parking/parking_manager.c) and may be incomplete.
 */
export interface ParkedCallsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkedCallsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `Parkinglot` event.
 * Asterisk does not document this event. The fields were read from its source code (res/parking/parking_manager.c) and may be incomplete.
 */
export interface ParkinglotEventFields extends AmiEventCommonFields {
  readonly Event: 'Parkinglot';
  readonly StartSpace?: string;
  readonly StopSpace?: string;
  readonly Timeout?: string;
}

/**
 * The `ParkinglotsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/parking/parking_manager.c) and may be incomplete.
 */
export interface ParkinglotsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ParkinglotsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `PeerEntry` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_iax2.c) and may be incomplete.
 */
export interface PeerEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'PeerEntry';
  readonly ObjectName?: string;
  readonly ChanObjectType?: string;
  readonly peeruserIPaddress?: string;
  readonly IPport?: string;
  readonly Dynamic?: string;
  readonly AutoForcerport?: string;
  readonly Forcerport?: string;
  readonly AutoComedia?: string;
  readonly Comedia?: string;
  readonly VideoSupport?: string;
  readonly TextSupport?: string;
  readonly ACL?: string;
  readonly Status?: string;
  readonly RealtimeDevice?: string;
  readonly Description?: string;
  readonly Accountcode?: string;
}

/**
 * The `PeerlistComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_iax2.c) and may be incomplete.
 */
export interface PeerlistCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'PeerlistComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `PJSIPMaintenanceStatusComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_maintenance.c) and may be incomplete.
 */
export interface PJSIPMaintenanceStatusCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'PJSIPMaintenanceStatusComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `PRIShowSpansComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_dahdi.c) and may be incomplete.
 */
export interface PRIShowSpansCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'PRIShowSpansComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `QueueMember` event.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_queue.c) and may be incomplete.
 */
export interface QueueMemberEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueMember';
  readonly Queue?: string;
  readonly Name?: string;
  readonly Location?: string;
  readonly StateInterface?: string;
  readonly Membership?: string;
  readonly Penalty?: string;
  readonly CallsTaken?: string;
  readonly LastCall?: string;
  readonly LastPause?: string;
  readonly LoginTime?: string;
  readonly InCall?: string;
  readonly Status?: string;
  readonly Paused?: string;
  readonly PausedReason?: string;
  readonly Wrapuptime?: string;
}

/**
 * The `QueueStatusComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_queue.c) and may be incomplete.
 */
export interface QueueStatusCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueStatusComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `QueueSummary` event.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_queue.c) and may be incomplete.
 */
export interface QueueSummaryEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueSummary';
  readonly Queue?: string;
  readonly LoggedIn?: string;
  readonly Available?: string;
  readonly Callers?: string;
  readonly HoldTime?: string;
  readonly TalkTime?: string;
  readonly LongestHoldTime?: string;
}

/**
 * The `QueueSummaryComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_queue.c) and may be incomplete.
 */
export interface QueueSummaryCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'QueueSummaryComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `RegistrationsComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_iax2.c) and may be incomplete.
 */
export interface RegistrationsCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'RegistrationsComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `RegistryEntry` event.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_iax2.c) and may be incomplete.
 */
export interface RegistryEntryEventFields extends AmiEventCommonFields {
  readonly Event: 'RegistryEntry';
  readonly DNSmanager?: string;
  readonly Username?: string;
  readonly Perceived?: string;
  readonly Refresh?: string;
  readonly State?: string;
  readonly Port?: string;
  readonly Domain?: string;
  readonly DomainPort?: string;
  readonly RegistrationTime?: string;
}

/**
 * The `ResourceListDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (res/res_pjsip_pubsub.c) and may be incomplete.
 */
export interface ResourceListDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ResourceListDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `ShowDialPlanComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (main/pbx.c) and may be incomplete.
 */
export interface ShowDialPlanCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'ShowDialPlanComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `SIPpeerstatusComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (channels/chan_sip.c) and may be incomplete.
 * Asterisk 20 only.
 * @deprecated Not sent by Asterisk 24.
 */
export interface SIPpeerstatusCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'SIPpeerstatusComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `VoicemailBoxDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_voicemail.c) and may be incomplete.
 */
export interface VoicemailBoxDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'VoicemailBoxDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `VoicemailUserDetailComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_voicemail.c) and may be incomplete.
 */
export interface VoicemailUserDetailCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'VoicemailUserDetailComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `VoicemailUserEntryComplete` event, which ends a list reply.
 * Asterisk does not document this event. The fields were read from its source code (apps/app_voicemail.c) and may be incomplete.
 */
export interface VoicemailUserEntryCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'VoicemailUserEntryComplete';
  readonly EventList?: 'Complete' | (string & {});
  /** How many items the list held. */
  readonly ListItems?: string;
}

/**
 * The `WaitEventComplete` event.
 * Asterisk does not document this event. The fields were read from its source code (main/manager.c) and may be incomplete.
 */
export interface WaitEventCompleteEventFields extends AmiEventCommonFields {
  readonly Event: 'WaitEventComplete';
}

/** Every event this library knows, by name. */
export interface AmiEventMap {
  AgentCalled: AgentCalledEventFields;
  AgentComplete: AgentCompleteEventFields;
  AgentConnect: AgentConnectEventFields;
  AgentDump: AgentDumpEventFields;
  AgentLogin: AgentLoginEventFields;
  AgentLogoff: AgentLogoffEventFields;
  AgentRingNoAnswer: AgentRingNoAnswerEventFields;
  Agents: AgentsEventFields;
  AgentsComplete: AgentsCompleteEventFields;
  AGIExecEnd: AGIExecEndEventFields;
  AGIExecStart: AGIExecStartEventFields;
  Alarm: AlarmEventFields;
  AlarmClear: AlarmClearEventFields;
  'AOC-D': AOC_DEventFields;
  'AOC-E': AOC_EEventFields;
  'AOC-S': AOC_SEventFields;
  AorDetail: AorDetailEventFields;
  AorList: AorListEventFields;
  AorListComplete: AorListCompleteEventFields;
  AsyncAGIEnd: AsyncAGIEndEventFields;
  AsyncAGIExec: AsyncAGIExecEventFields;
  AsyncAGIStart: AsyncAGIStartEventFields;
  AttendedTransfer: AttendedTransferEventFields;
  AuthDetail: AuthDetailEventFields;
  AuthList: AuthListEventFields;
  AuthListComplete: AuthListCompleteEventFields;
  AuthMethodNotAllowed: AuthMethodNotAllowedEventFields;
  BlindTransfer: BlindTransferEventFields;
  BridgeCreate: BridgeCreateEventFields;
  BridgeDestroy: BridgeDestroyEventFields;
  BridgeEnter: BridgeEnterEventFields;
  BridgeInfoChannel: BridgeInfoChannelEventFields;
  BridgeInfoComplete: BridgeInfoCompleteEventFields;
  BridgeLeave: BridgeLeaveEventFields;
  BridgeListComplete: BridgeListCompleteEventFields;
  BridgeListItem: BridgeListItemEventFields;
  BridgeMerge: BridgeMergeEventFields;
  BridgeTechnologyListComplete: BridgeTechnologyListCompleteEventFields;
  BridgeTechnologyListItem: BridgeTechnologyListItemEventFields;
  BridgeVideoSourceUpdate: BridgeVideoSourceUpdateEventFields;
  CCAvailable: CCAvailableEventFields;
  CCCallerRecalling: CCCallerRecallingEventFields;
  CCCallerStartMonitoring: CCCallerStartMonitoringEventFields;
  CCCallerStopMonitoring: CCCallerStopMonitoringEventFields;
  CCFailure: CCFailureEventFields;
  CCMonitorFailed: CCMonitorFailedEventFields;
  CCOfferTimerStart: CCOfferTimerStartEventFields;
  CCRecallComplete: CCRecallCompleteEventFields;
  CCRequestAcknowledged: CCRequestAcknowledgedEventFields;
  CCRequested: CCRequestedEventFields;
  Cdr: CdrEventFields;
  CEL: CELEventFields;
  ChallengeResponseFailed: ChallengeResponseFailedEventFields;
  ChallengeSent: ChallengeSentEventFields;
  ChannelHungup: ChannelHungupEventFields;
  ChannelTalkingStart: ChannelTalkingStartEventFields;
  ChannelTalkingStop: ChannelTalkingStopEventFields;
  ChanSpyStart: ChanSpyStartEventFields;
  ChanSpyStop: ChanSpyStopEventFields;
  ConfbridgeEnd: ConfbridgeEndEventFields;
  ConfbridgeJoin: ConfbridgeJoinEventFields;
  ConfbridgeLeave: ConfbridgeLeaveEventFields;
  ConfbridgeList: ConfbridgeListEventFields;
  ConfbridgeListComplete: ConfbridgeListCompleteEventFields;
  ConfbridgeListRooms: ConfbridgeListRoomsEventFields;
  ConfbridgeListRoomsComplete: ConfbridgeListRoomsCompleteEventFields;
  ConfbridgeMute: ConfbridgeMuteEventFields;
  ConfbridgeRecord: ConfbridgeRecordEventFields;
  ConfbridgeStart: ConfbridgeStartEventFields;
  ConfbridgeStopRecord: ConfbridgeStopRecordEventFields;
  ConfbridgeTalking: ConfbridgeTalkingEventFields;
  ConfbridgeUnmute: ConfbridgeUnmuteEventFields;
  ContactList: ContactListEventFields;
  ContactListComplete: ContactListCompleteEventFields;
  ContactStatus: ContactStatusEventFields;
  ContactStatusDetail: ContactStatusDetailEventFields;
  ContactStatusDetailComplete: ContactStatusDetailCompleteEventFields;
  CoreShowChannel: CoreShowChannelEventFields;
  CoreShowChannelMap: CoreShowChannelMapEventFields;
  CoreShowChannelMapComplete: CoreShowChannelMapCompleteEventFields;
  CoreShowChannelsComplete: CoreShowChannelsCompleteEventFields;
  DAHDIChannel: DAHDIChannelEventFields;
  DAHDIShowChannels: DAHDIShowChannelsEventFields;
  DAHDIShowChannelsComplete: DAHDIShowChannelsCompleteEventFields;
  DAHDIShowStatus: DAHDIShowStatusEventFields;
  DAHDIShowStatusComplete: DAHDIShowStatusCompleteEventFields;
  DBGetComplete: DBGetCompleteEventFields;
  DBGetResponse: DBGetResponseEventFields;
  DBGetTreeComplete: DBGetTreeCompleteEventFields;
  DBGetTreeResponse: DBGetTreeResponseEventFields;
  DeadlockStart: DeadlockStartEventFields;
  DeviceEntry: DeviceEntryEventFields;
  DevicelistComplete: DevicelistCompleteEventFields;
  DeviceStateChange: DeviceStateChangeEventFields;
  DeviceStateListComplete: DeviceStateListCompleteEventFields;
  DialBegin: DialBeginEventFields;
  DialEnd: DialEndEventFields;
  DialState: DialStateEventFields;
  DNDState: DNDStateEventFields;
  DTMFBegin: DTMFBeginEventFields;
  DTMFEnd: DTMFEndEventFields;
  EndpointDetail: EndpointDetailEventFields;
  EndpointDetailComplete: EndpointDetailCompleteEventFields;
  EndpointList: EndpointListEventFields;
  EndpointListComplete: EndpointListCompleteEventFields;
  ExtensionStateListComplete: ExtensionStateListCompleteEventFields;
  ExtensionStatus: ExtensionStatusEventFields;
  FailedACL: FailedACLEventFields;
  FAXSession: FAXSessionEventFields;
  FAXSessionsComplete: FAXSessionsCompleteEventFields;
  FAXSessionsEntry: FAXSessionsEntryEventFields;
  FAXStats: FAXStatsEventFields;
  FAXStatus: FAXStatusEventFields;
  Flash: FlashEventFields;
  FullyBooted: FullyBootedEventFields;
  Hangup: HangupEventFields;
  HangupHandlerPop: HangupHandlerPopEventFields;
  HangupHandlerPush: HangupHandlerPushEventFields;
  HangupHandlerRun: HangupHandlerRunEventFields;
  HangupRequest: HangupRequestEventFields;
  Hold: HoldEventFields;
  IdentifyDetail: IdentifyDetailEventFields;
  InboundRegistrationDetail: InboundRegistrationDetailEventFields;
  InboundRegistrationDetailComplete: InboundRegistrationDetailCompleteEventFields;
  InboundSubscriptionDetail: InboundSubscriptionDetailEventFields;
  InboundSubscriptionDetailComplete: InboundSubscriptionDetailCompleteEventFields;
  InvalidAccountID: InvalidAccountIDEventFields;
  InvalidPassword: InvalidPasswordEventFields;
  InvalidTransport: InvalidTransportEventFields;
  JabberStatus: JabberStatusEventFields;
  LineEntry: LineEntryEventFields;
  LinelistComplete: LinelistCompleteEventFields;
  ListDialplan: ListDialplanEventFields;
  Load: LoadEventFields;
  LoadAverageLimit: LoadAverageLimitEventFields;
  LocalBridge: LocalBridgeEventFields;
  LocalOptimizationBegin: LocalOptimizationBeginEventFields;
  LocalOptimizationEnd: LocalOptimizationEndEventFields;
  LogChannel: LogChannelEventFields;
  MCID: MCIDEventFields;
  MeetmeEnd: MeetmeEndEventFields;
  MeetmeJoin: MeetmeJoinEventFields;
  MeetmeLeave: MeetmeLeaveEventFields;
  MeetmeList: MeetmeListEventFields;
  MeetmeListComplete: MeetmeListCompleteEventFields;
  MeetmeListRooms: MeetmeListRoomsEventFields;
  MeetmeListRoomsComplete: MeetmeListRoomsCompleteEventFields;
  MeetmeMute: MeetmeMuteEventFields;
  MeetmeTalking: MeetmeTalkingEventFields;
  MeetmeTalkRequest: MeetmeTalkRequestEventFields;
  MemoryLimit: MemoryLimitEventFields;
  MessageWaiting: MessageWaitingEventFields;
  MiniVoiceMail: MiniVoiceMailEventFields;
  MixMonitorMute: MixMonitorMuteEventFields;
  MixMonitorStart: MixMonitorStartEventFields;
  MixMonitorStop: MixMonitorStopEventFields;
  MobileStatus: MobileStatusEventFields;
  MonitorStart: MonitorStartEventFields;
  MonitorStop: MonitorStopEventFields;
  MusicOnHoldStart: MusicOnHoldStartEventFields;
  MusicOnHoldStop: MusicOnHoldStopEventFields;
  MWIGet: MWIGetEventFields;
  MWIGetComplete: MWIGetCompleteEventFields;
  NewAccountCode: NewAccountCodeEventFields;
  NewCallerid: NewCalleridEventFields;
  Newchannel: NewchannelEventFields;
  NewConnectedLine: NewConnectedLineEventFields;
  NewExten: NewExtenEventFields;
  Newstate: NewstateEventFields;
  OriginateResponse: OriginateResponseEventFields;
  OutboundRegistrationDetail: OutboundRegistrationDetailEventFields;
  OutboundRegistrationDetailComplete: OutboundRegistrationDetailCompleteEventFields;
  OutboundSubscriptionDetail: OutboundSubscriptionDetailEventFields;
  OutboundSubscriptionDetailComplete: OutboundSubscriptionDetailCompleteEventFields;
  ParkedCall: ParkedCallEventFields;
  ParkedCallGiveUp: ParkedCallGiveUpEventFields;
  ParkedCallsComplete: ParkedCallsCompleteEventFields;
  ParkedCallSwap: ParkedCallSwapEventFields;
  ParkedCallTimeOut: ParkedCallTimeOutEventFields;
  Parkinglot: ParkinglotEventFields;
  ParkinglotsComplete: ParkinglotsCompleteEventFields;
  PeerEntry: PeerEntryEventFields;
  PeerlistComplete: PeerlistCompleteEventFields;
  PeerStatus: PeerStatusEventFields;
  Pickup: PickupEventFields;
  PJSIPMaintenanceStatus: PJSIPMaintenanceStatusEventFields;
  PJSIPMaintenanceStatusComplete: PJSIPMaintenanceStatusCompleteEventFields;
  PresenceStateChange: PresenceStateChangeEventFields;
  PresenceStateListComplete: PresenceStateListCompleteEventFields;
  PresenceStatus: PresenceStatusEventFields;
  PRIShowSpansComplete: PRIShowSpansCompleteEventFields;
  QueueCallerAbandon: QueueCallerAbandonEventFields;
  QueueCallerJoin: QueueCallerJoinEventFields;
  QueueCallerLeave: QueueCallerLeaveEventFields;
  QueueEntry: QueueEntryEventFields;
  QueueMember: QueueMemberEventFields;
  QueueMemberAdded: QueueMemberAddedEventFields;
  QueueMemberPause: QueueMemberPauseEventFields;
  QueueMemberPenalty: QueueMemberPenaltyEventFields;
  QueueMemberRemoved: QueueMemberRemovedEventFields;
  QueueMemberRinginuse: QueueMemberRinginuseEventFields;
  QueueMemberStatus: QueueMemberStatusEventFields;
  QueueParams: QueueParamsEventFields;
  QueueStatusComplete: QueueStatusCompleteEventFields;
  QueueSummary: QueueSummaryEventFields;
  QueueSummaryComplete: QueueSummaryCompleteEventFields;
  ReceiveFAX: ReceiveFAXEventFields;
  RegistrationsComplete: RegistrationsCompleteEventFields;
  Registry: RegistryEventFields;
  RegistryEntry: RegistryEntryEventFields;
  Reload: ReloadEventFields;
  Rename: RenameEventFields;
  RequestBadFormat: RequestBadFormatEventFields;
  RequestNotAllowed: RequestNotAllowedEventFields;
  RequestNotSupported: RequestNotSupportedEventFields;
  ResourceListDetail: ResourceListDetailEventFields;
  ResourceListDetailComplete: ResourceListDetailCompleteEventFields;
  RTCPReceived: RTCPReceivedEventFields;
  RTCPSent: RTCPSentEventFields;
  SendFAX: SendFAXEventFields;
  SessionLimit: SessionLimitEventFields;
  SessionTimeout: SessionTimeoutEventFields;
  ShowDialPlanComplete: ShowDialPlanCompleteEventFields;
  Shutdown: ShutdownEventFields;
  SIPpeerstatusComplete: SIPpeerstatusCompleteEventFields;
  SIPQualifyPeerDone: SIPQualifyPeerDoneEventFields;
  SoftHangupRequest: SoftHangupRequestEventFields;
  SpanAlarm: SpanAlarmEventFields;
  SpanAlarmClear: SpanAlarmClearEventFields;
  Status: StatusEventFields;
  StatusComplete: StatusCompleteEventFields;
  SuccessfulAuth: SuccessfulAuthEventFields;
  TransportDetail: TransportDetailEventFields;
  UnexpectedAddress: UnexpectedAddressEventFields;
  Unhold: UnholdEventFields;
  Unload: UnloadEventFields;
  UnParkedCall: UnParkedCallEventFields;
  UserEvent: UserEventEventFields;
  VarSet: VarSetEventFields;
  VoicemailBoxDetailComplete: VoicemailBoxDetailCompleteEventFields;
  VoicemailPasswordChange: VoicemailPasswordChangeEventFields;
  VoicemailUserDetailComplete: VoicemailUserDetailCompleteEventFields;
  VoicemailUserEntryComplete: VoicemailUserEntryCompleteEventFields;
  WaitEventComplete: WaitEventCompleteEventFields;
  Wink: WinkEventFields;
}

export type AmiEventName = keyof AmiEventMap;

export const AMI_EVENT_NAMES = [
  'AgentCalled',
  'AgentComplete',
  'AgentConnect',
  'AgentDump',
  'AgentLogin',
  'AgentLogoff',
  'AgentRingNoAnswer',
  'Agents',
  'AgentsComplete',
  'AGIExecEnd',
  'AGIExecStart',
  'Alarm',
  'AlarmClear',
  'AOC-D',
  'AOC-E',
  'AOC-S',
  'AorDetail',
  'AorList',
  'AorListComplete',
  'AsyncAGIEnd',
  'AsyncAGIExec',
  'AsyncAGIStart',
  'AttendedTransfer',
  'AuthDetail',
  'AuthList',
  'AuthListComplete',
  'AuthMethodNotAllowed',
  'BlindTransfer',
  'BridgeCreate',
  'BridgeDestroy',
  'BridgeEnter',
  'BridgeInfoChannel',
  'BridgeInfoComplete',
  'BridgeLeave',
  'BridgeListComplete',
  'BridgeListItem',
  'BridgeMerge',
  'BridgeTechnologyListComplete',
  'BridgeTechnologyListItem',
  'BridgeVideoSourceUpdate',
  'CCAvailable',
  'CCCallerRecalling',
  'CCCallerStartMonitoring',
  'CCCallerStopMonitoring',
  'CCFailure',
  'CCMonitorFailed',
  'CCOfferTimerStart',
  'CCRecallComplete',
  'CCRequestAcknowledged',
  'CCRequested',
  'Cdr',
  'CEL',
  'ChallengeResponseFailed',
  'ChallengeSent',
  'ChannelHungup',
  'ChannelTalkingStart',
  'ChannelTalkingStop',
  'ChanSpyStart',
  'ChanSpyStop',
  'ConfbridgeEnd',
  'ConfbridgeJoin',
  'ConfbridgeLeave',
  'ConfbridgeList',
  'ConfbridgeListComplete',
  'ConfbridgeListRooms',
  'ConfbridgeListRoomsComplete',
  'ConfbridgeMute',
  'ConfbridgeRecord',
  'ConfbridgeStart',
  'ConfbridgeStopRecord',
  'ConfbridgeTalking',
  'ConfbridgeUnmute',
  'ContactList',
  'ContactListComplete',
  'ContactStatus',
  'ContactStatusDetail',
  'ContactStatusDetailComplete',
  'CoreShowChannel',
  'CoreShowChannelMap',
  'CoreShowChannelMapComplete',
  'CoreShowChannelsComplete',
  'DAHDIChannel',
  'DAHDIShowChannels',
  'DAHDIShowChannelsComplete',
  'DAHDIShowStatus',
  'DAHDIShowStatusComplete',
  'DBGetComplete',
  'DBGetResponse',
  'DBGetTreeComplete',
  'DBGetTreeResponse',
  'DeadlockStart',
  'DeviceEntry',
  'DevicelistComplete',
  'DeviceStateChange',
  'DeviceStateListComplete',
  'DialBegin',
  'DialEnd',
  'DialState',
  'DNDState',
  'DTMFBegin',
  'DTMFEnd',
  'EndpointDetail',
  'EndpointDetailComplete',
  'EndpointList',
  'EndpointListComplete',
  'ExtensionStateListComplete',
  'ExtensionStatus',
  'FailedACL',
  'FAXSession',
  'FAXSessionsComplete',
  'FAXSessionsEntry',
  'FAXStats',
  'FAXStatus',
  'Flash',
  'FullyBooted',
  'Hangup',
  'HangupHandlerPop',
  'HangupHandlerPush',
  'HangupHandlerRun',
  'HangupRequest',
  'Hold',
  'IdentifyDetail',
  'InboundRegistrationDetail',
  'InboundRegistrationDetailComplete',
  'InboundSubscriptionDetail',
  'InboundSubscriptionDetailComplete',
  'InvalidAccountID',
  'InvalidPassword',
  'InvalidTransport',
  'JabberStatus',
  'LineEntry',
  'LinelistComplete',
  'ListDialplan',
  'Load',
  'LoadAverageLimit',
  'LocalBridge',
  'LocalOptimizationBegin',
  'LocalOptimizationEnd',
  'LogChannel',
  'MCID',
  'MeetmeEnd',
  'MeetmeJoin',
  'MeetmeLeave',
  'MeetmeList',
  'MeetmeListComplete',
  'MeetmeListRooms',
  'MeetmeListRoomsComplete',
  'MeetmeMute',
  'MeetmeTalking',
  'MeetmeTalkRequest',
  'MemoryLimit',
  'MessageWaiting',
  'MiniVoiceMail',
  'MixMonitorMute',
  'MixMonitorStart',
  'MixMonitorStop',
  'MobileStatus',
  'MonitorStart',
  'MonitorStop',
  'MusicOnHoldStart',
  'MusicOnHoldStop',
  'MWIGet',
  'MWIGetComplete',
  'NewAccountCode',
  'NewCallerid',
  'Newchannel',
  'NewConnectedLine',
  'NewExten',
  'Newstate',
  'OriginateResponse',
  'OutboundRegistrationDetail',
  'OutboundRegistrationDetailComplete',
  'OutboundSubscriptionDetail',
  'OutboundSubscriptionDetailComplete',
  'ParkedCall',
  'ParkedCallGiveUp',
  'ParkedCallsComplete',
  'ParkedCallSwap',
  'ParkedCallTimeOut',
  'Parkinglot',
  'ParkinglotsComplete',
  'PeerEntry',
  'PeerlistComplete',
  'PeerStatus',
  'Pickup',
  'PJSIPMaintenanceStatus',
  'PJSIPMaintenanceStatusComplete',
  'PresenceStateChange',
  'PresenceStateListComplete',
  'PresenceStatus',
  'PRIShowSpansComplete',
  'QueueCallerAbandon',
  'QueueCallerJoin',
  'QueueCallerLeave',
  'QueueEntry',
  'QueueMember',
  'QueueMemberAdded',
  'QueueMemberPause',
  'QueueMemberPenalty',
  'QueueMemberRemoved',
  'QueueMemberRinginuse',
  'QueueMemberStatus',
  'QueueParams',
  'QueueStatusComplete',
  'QueueSummary',
  'QueueSummaryComplete',
  'ReceiveFAX',
  'RegistrationsComplete',
  'Registry',
  'RegistryEntry',
  'Reload',
  'Rename',
  'RequestBadFormat',
  'RequestNotAllowed',
  'RequestNotSupported',
  'ResourceListDetail',
  'ResourceListDetailComplete',
  'RTCPReceived',
  'RTCPSent',
  'SendFAX',
  'SessionLimit',
  'SessionTimeout',
  'ShowDialPlanComplete',
  'Shutdown',
  'SIPpeerstatusComplete',
  'SIPQualifyPeerDone',
  'SoftHangupRequest',
  'SpanAlarm',
  'SpanAlarmClear',
  'Status',
  'StatusComplete',
  'SuccessfulAuth',
  'TransportDetail',
  'UnexpectedAddress',
  'Unhold',
  'Unload',
  'UnParkedCall',
  'UserEvent',
  'VarSet',
  'VoicemailBoxDetailComplete',
  'VoicemailPasswordChange',
  'VoicemailUserDetailComplete',
  'VoicemailUserEntryComplete',
  'WaitEventComplete',
  'Wink',
] as const satisfies readonly AmiEventName[];

/** The manager.conf read classes that deliver each event. Empty when Asterisk does not state one. */
export const AMI_EVENT_CLASSES: { readonly [N in AmiEventName]: readonly string[] } = {
  AgentCalled: ['agent'],
  AgentComplete: ['agent'],
  AgentConnect: ['agent'],
  AgentDump: ['agent'],
  AgentLogin: ['agent'],
  AgentLogoff: ['agent'],
  AgentRingNoAnswer: ['agent'],
  Agents: ['agent'],
  AgentsComplete: ['agent'],
  AGIExecEnd: ['agi'],
  AGIExecStart: ['agi'],
  Alarm: ['system'],
  AlarmClear: ['system'],
  'AOC-D': ['aoc'],
  'AOC-E': ['aoc'],
  'AOC-S': ['aoc'],
  AorDetail: ['command'],
  AorList: ['command'],
  AorListComplete: ['command'],
  AsyncAGIEnd: ['agi'],
  AsyncAGIExec: ['agi'],
  AsyncAGIStart: ['agi'],
  AttendedTransfer: ['call'],
  AuthDetail: ['command'],
  AuthList: ['command'],
  AuthListComplete: ['command'],
  AuthMethodNotAllowed: ['security'],
  BlindTransfer: ['call'],
  BridgeCreate: ['call'],
  BridgeDestroy: ['call'],
  BridgeEnter: ['call'],
  BridgeInfoChannel: ['command'],
  BridgeInfoComplete: ['command'],
  BridgeLeave: ['call'],
  BridgeListComplete: [],
  BridgeListItem: [],
  BridgeMerge: ['call'],
  BridgeTechnologyListComplete: [],
  BridgeTechnologyListItem: [],
  BridgeVideoSourceUpdate: ['call'],
  CCAvailable: [],
  CCCallerRecalling: [],
  CCCallerStartMonitoring: [],
  CCCallerStopMonitoring: [],
  CCFailure: [],
  CCMonitorFailed: [],
  CCOfferTimerStart: [],
  CCRecallComplete: [],
  CCRequestAcknowledged: [],
  CCRequested: [],
  Cdr: ['cdr'],
  CEL: ['call'],
  ChallengeResponseFailed: ['security'],
  ChallengeSent: ['security'],
  ChannelHungup: [],
  ChannelTalkingStart: ['class'],
  ChannelTalkingStop: ['class'],
  ChanSpyStart: ['call'],
  ChanSpyStop: ['call'],
  ConfbridgeEnd: ['call'],
  ConfbridgeJoin: ['call'],
  ConfbridgeLeave: ['call'],
  ConfbridgeList: ['reporting'],
  ConfbridgeListComplete: [],
  ConfbridgeListRooms: ['reporting'],
  ConfbridgeListRoomsComplete: [],
  ConfbridgeMute: ['call'],
  ConfbridgeRecord: ['call'],
  ConfbridgeStart: ['call'],
  ConfbridgeStopRecord: ['call'],
  ConfbridgeTalking: ['call'],
  ConfbridgeUnmute: ['call'],
  ContactList: ['command'],
  ContactListComplete: ['command'],
  ContactStatus: ['system'],
  ContactStatusDetail: ['command'],
  ContactStatusDetailComplete: [],
  CoreShowChannel: ['call'],
  CoreShowChannelMap: [],
  CoreShowChannelMapComplete: ['call'],
  CoreShowChannelsComplete: ['call'],
  DAHDIChannel: ['call'],
  DAHDIShowChannels: [],
  DAHDIShowChannelsComplete: [],
  DAHDIShowStatus: [],
  DAHDIShowStatusComplete: [],
  DBGetComplete: [],
  DBGetResponse: [],
  DBGetTreeComplete: [],
  DBGetTreeResponse: [],
  DeadlockStart: ['system'],
  DeviceEntry: [],
  DevicelistComplete: [],
  DeviceStateChange: ['call'],
  DeviceStateListComplete: ['command'],
  DialBegin: ['call'],
  DialEnd: ['call'],
  DialState: ['call'],
  DNDState: ['system'],
  DTMFBegin: ['dtmf'],
  DTMFEnd: ['dtmf'],
  EndpointDetail: ['command'],
  EndpointDetailComplete: ['command'],
  EndpointList: ['command'],
  EndpointListComplete: ['command'],
  ExtensionStateListComplete: ['command'],
  ExtensionStatus: ['call'],
  FailedACL: ['security'],
  FAXSession: ['reporting'],
  FAXSessionsComplete: ['call'],
  FAXSessionsEntry: ['reporting'],
  FAXStats: ['reporting'],
  FAXStatus: ['call'],
  Flash: ['call'],
  FullyBooted: ['system'],
  Hangup: ['call'],
  HangupHandlerPop: ['dialplan'],
  HangupHandlerPush: ['dialplan'],
  HangupHandlerRun: ['dialplan'],
  HangupRequest: ['call'],
  Hold: ['call'],
  IdentifyDetail: ['command'],
  InboundRegistrationDetail: ['command'],
  InboundRegistrationDetailComplete: [],
  InboundSubscriptionDetail: ['command'],
  InboundSubscriptionDetailComplete: [],
  InvalidAccountID: ['security'],
  InvalidPassword: ['security'],
  InvalidTransport: ['security'],
  JabberStatus: [],
  LineEntry: [],
  LinelistComplete: [],
  ListDialplan: [],
  Load: ['system'],
  LoadAverageLimit: ['security'],
  LocalBridge: ['call'],
  LocalOptimizationBegin: ['call'],
  LocalOptimizationEnd: ['call'],
  LogChannel: ['system'],
  MCID: ['call'],
  MeetmeEnd: ['call'],
  MeetmeJoin: ['call'],
  MeetmeLeave: ['call'],
  MeetmeList: ['call'],
  MeetmeListComplete: [],
  MeetmeListRooms: ['call'],
  MeetmeListRoomsComplete: [],
  MeetmeMute: ['call'],
  MeetmeTalking: ['call'],
  MeetmeTalkRequest: ['call'],
  MemoryLimit: ['security'],
  MessageWaiting: ['call'],
  MiniVoiceMail: ['call'],
  MixMonitorMute: ['call'],
  MixMonitorStart: ['call'],
  MixMonitorStop: ['call'],
  MobileStatus: [],
  MonitorStart: ['call'],
  MonitorStop: ['call'],
  MusicOnHoldStart: ['call'],
  MusicOnHoldStop: ['call'],
  MWIGet: ['reporting'],
  MWIGetComplete: ['reporting'],
  NewAccountCode: ['call'],
  NewCallerid: ['call'],
  Newchannel: ['call'],
  NewConnectedLine: ['call'],
  NewExten: ['dialplan'],
  Newstate: ['call'],
  OriginateResponse: ['call'],
  OutboundRegistrationDetail: ['command'],
  OutboundRegistrationDetailComplete: [],
  OutboundSubscriptionDetail: ['command'],
  OutboundSubscriptionDetailComplete: [],
  ParkedCall: ['call'],
  ParkedCallGiveUp: ['call'],
  ParkedCallsComplete: [],
  ParkedCallSwap: ['call'],
  ParkedCallTimeOut: ['call'],
  Parkinglot: [],
  ParkinglotsComplete: [],
  PeerEntry: [],
  PeerlistComplete: [],
  PeerStatus: ['system'],
  Pickup: ['call'],
  PJSIPMaintenanceStatus: ['system'],
  PJSIPMaintenanceStatusComplete: [],
  PresenceStateChange: ['call'],
  PresenceStateListComplete: ['command'],
  PresenceStatus: ['call'],
  PRIShowSpansComplete: [],
  QueueCallerAbandon: ['agent'],
  QueueCallerJoin: ['agent'],
  QueueCallerLeave: ['agent'],
  QueueEntry: ['agent'],
  QueueMember: [],
  QueueMemberAdded: ['agent'],
  QueueMemberPause: ['agent'],
  QueueMemberPenalty: ['agent'],
  QueueMemberRemoved: ['agent'],
  QueueMemberRinginuse: ['agent'],
  QueueMemberStatus: ['agent'],
  QueueParams: ['agent'],
  QueueStatusComplete: [],
  QueueSummary: [],
  QueueSummaryComplete: [],
  ReceiveFAX: ['call'],
  RegistrationsComplete: [],
  Registry: ['system'],
  RegistryEntry: [],
  Reload: ['system'],
  Rename: ['call'],
  RequestBadFormat: ['security'],
  RequestNotAllowed: ['security'],
  RequestNotSupported: ['security'],
  ResourceListDetail: ['command'],
  ResourceListDetailComplete: [],
  RTCPReceived: ['reporting'],
  RTCPSent: ['reporting'],
  SendFAX: ['call'],
  SessionLimit: ['security'],
  SessionTimeout: ['call'],
  ShowDialPlanComplete: [],
  Shutdown: ['system'],
  SIPpeerstatusComplete: [],
  SIPQualifyPeerDone: ['call'],
  SoftHangupRequest: ['call'],
  SpanAlarm: ['system'],
  SpanAlarmClear: ['system'],
  Status: ['call'],
  StatusComplete: ['call'],
  SuccessfulAuth: ['security'],
  TransportDetail: ['command'],
  UnexpectedAddress: ['security'],
  Unhold: ['call'],
  Unload: ['system'],
  UnParkedCall: ['call'],
  UserEvent: ['user'],
  VarSet: ['dialplan'],
  VoicemailBoxDetailComplete: [],
  VoicemailPasswordChange: ['user'],
  VoicemailUserDetailComplete: [],
  VoicemailUserEntryComplete: [],
  WaitEventComplete: [],
  Wink: ['call'],
};
