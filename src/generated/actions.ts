// GENERATED FILE. Do not edit by hand.
// Source: catalog/*.json, collected from the Asterisk source by scripts/collect-catalog.mjs.
// Asterisk versions covered: 20 (AMI 9.0.0), 22 (AMI 11.0.0), 23 (AMI 12.0.0), 24 (AMI 14.0.0).
/* eslint-disable */

import type { HeaderValue } from '../encode';

/** A single header value. */
export type AmiScalar = string | number | boolean;

/**
 * Parameters of the `AbsoluteTimeout` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/AbsoluteTimeout/
 */
export interface AbsoluteTimeoutActionParams {
  readonly Action: 'AbsoluteTimeout';
  readonly Channel: AmiScalar;
  readonly Timeout: AmiScalar;
}

/**
 * Parameters of the `AgentLogoff` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/AgentLogoff/
 */
export interface AgentLogoffActionParams {
  readonly Action: 'AgentLogoff';
  readonly Agent: AmiScalar;
  readonly Soft?: AmiScalar;
}

/**
 * Parameters of the `Agents` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Agents/
 */
export interface AgentsActionParams {
  readonly Action: 'Agents';
}

/**
 * Parameters of the `AGI` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/AGI/
 */
export interface AGIActionParams {
  readonly Action: 'AGI';
  readonly Channel: AmiScalar;
  readonly Command: AmiScalar;
  readonly CommandID?: AmiScalar;
}

/**
 * Parameters of the `AOCMessage` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/AOCMessage/
 */
export interface AOCMessageActionParams {
  readonly Action: 'AOCMessage';
  readonly Channel?: AmiScalar;
  readonly ChannelPrefix?: AmiScalar;
  readonly MsgType: 'S' | 'D' | 'E' | (string & {}) | number | boolean;
  readonly ChargeType?: 'NA' | 'FREE' | 'Currency' | 'Unit' | (string & {}) | number | boolean;
  readonly CurrencyName?: AmiScalar;
  readonly CurrencyAmount?: AmiScalar;
  readonly CurrencyMultiplier?: 'OneThousandth' | 'OneHundredth' | 'OneTenth' | 'One' | 'Ten' | 'Hundred' | 'Thousand' | (string & {}) | number | boolean;
  readonly TotalType?: 'Total' | 'SubTotal' | (string & {}) | number | boolean;
  readonly AOCBillingId?: 'Normal' | 'ReverseCharge' | 'CreditCard' | 'CallFwdUnconditional' | 'CallFwdBusy' | 'CallFwdNoReply' | 'CallDeflection' | 'CallTransfer' | (string & {}) | number | boolean;
  readonly ChargingAssociationId?: AmiScalar;
  readonly ChargingAssociationNumber?: AmiScalar;
  readonly ChargingAssociationPlan?: AmiScalar;
  readonly ChargedItem?: 'NA' | 'SpecialArrangement' | 'BasicCommunication' | 'CallAttempt' | 'CallSetup' | 'UserUserInfo' | 'SupplementaryService' | (string & {}) | number | boolean;
  readonly RateType?: 'NA' | 'Free' | 'FreeFromBeginning' | 'Duration' | 'Flat' | 'Volume' | 'SpecialCode' | (string & {}) | number | boolean;
  readonly Time?: AmiScalar;
  readonly TimeScale?: 'OneHundredthSecond' | 'OneTenthSecond' | 'Second' | 'TenSeconds' | 'Minute' | 'Hour' | 'Day' | (string & {}) | number | boolean;
  readonly Granularity?: AmiScalar;
  readonly GranularityTimeScale?: 'OneHundredthSecond' | 'OneTenthSecond' | 'Second' | 'TenSeconds' | 'Minute' | 'Hour' | 'Day' | (string & {}) | number | boolean;
  readonly ChargingType?: 'ContinuousCharging' | 'StepFunction' | (string & {}) | number | boolean;
  readonly VolumeUnit?: 'Octet' | 'Segment' | 'Message' | (string & {}) | number | boolean;
  readonly Code?: AmiScalar;
  readonly [header: `UnitAmount(${number})`]: AmiScalar | undefined;
  readonly [header: `UnitType(${number})`]: AmiScalar | undefined;
}

/**
 * Parameters of the `Atxfer` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Atxfer/
 */
export interface AtxferActionParams {
  readonly Action: 'Atxfer';
  readonly Channel: AmiScalar;
  readonly Exten: AmiScalar;
  readonly Context?: AmiScalar;
}

/**
 * Parameters of the `BlindTransfer` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BlindTransfer/
 */
export interface BlindTransferActionParams {
  readonly Action: 'BlindTransfer';
  readonly Channel: AmiScalar;
  readonly Context?: AmiScalar;
  readonly Exten?: AmiScalar;
}

/**
 * Parameters of the `Bridge` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Bridge/
 */
export interface BridgeActionParams {
  readonly Action: 'Bridge';
  readonly Channel1: AmiScalar;
  readonly Channel2: AmiScalar;
  readonly Tone?: 'no' | 'Channel1' | 'Channel2' | 'Both' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `BridgeDestroy` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeDestroy/
 */
export interface BridgeDestroyActionParams {
  readonly Action: 'BridgeDestroy';
  readonly BridgeUniqueid: AmiScalar;
}

/**
 * Parameters of the `BridgeInfo` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeInfo/
 */
export interface BridgeInfoActionParams {
  readonly Action: 'BridgeInfo';
  readonly BridgeUniqueid: AmiScalar;
}

/**
 * Parameters of the `BridgeKick` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeKick/
 */
export interface BridgeKickActionParams {
  readonly Action: 'BridgeKick';
  readonly BridgeUniqueid?: AmiScalar;
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `BridgeList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeList/
 */
export interface BridgeListActionParams {
  readonly Action: 'BridgeList';
  readonly BridgeType?: AmiScalar;
}

/**
 * Parameters of the `BridgeTechnologyList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeTechnologyList/
 */
export interface BridgeTechnologyListActionParams {
  readonly Action: 'BridgeTechnologyList';
}

/**
 * Parameters of the `BridgeTechnologySuspend` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeTechnologySuspend/
 */
export interface BridgeTechnologySuspendActionParams {
  readonly Action: 'BridgeTechnologySuspend';
  readonly BridgeTechnology: AmiScalar;
}

/**
 * Parameters of the `BridgeTechnologyUnsuspend` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/BridgeTechnologyUnsuspend/
 */
export interface BridgeTechnologyUnsuspendActionParams {
  readonly Action: 'BridgeTechnologyUnsuspend';
  readonly BridgeTechnology: AmiScalar;
}

/**
 * Parameters of the `CancelAtxfer` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CancelAtxfer/
 */
export interface CancelAtxferActionParams {
  readonly Action: 'CancelAtxfer';
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `Challenge` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Challenge/
 */
export interface ChallengeActionParams {
  readonly Action: 'Challenge';
  readonly AuthType: 'MD5' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `ChangeMonitor` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/ChangeMonitor/
 * @deprecated Not available in Asterisk 24.
 */
export interface ChangeMonitorActionParams {
  readonly Action: 'ChangeMonitor';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
  /** Asterisk 20 only. */
  readonly File: AmiScalar;
}

/**
 * Parameters of the `Command` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Command/
 */
export interface CommandActionParams {
  readonly Action: 'Command';
  readonly Command: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeKick` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeKick/
 */
export interface ConfbridgeKickActionParams {
  readonly Action: 'ConfbridgeKick';
  readonly Conference: AmiScalar;
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeList/
 */
export interface ConfbridgeListActionParams {
  readonly Action: 'ConfbridgeList';
  readonly Conference: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeListRooms` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeListRooms/
 */
export interface ConfbridgeListRoomsActionParams {
  readonly Action: 'ConfbridgeListRooms';
}

/**
 * Parameters of the `ConfbridgeLock` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeLock/
 */
export interface ConfbridgeLockActionParams {
  readonly Action: 'ConfbridgeLock';
  readonly Conference: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeMute` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeMute/
 */
export interface ConfbridgeMuteActionParams {
  readonly Action: 'ConfbridgeMute';
  readonly Conference: AmiScalar;
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeSetSingleVideoSrc` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeSetSingleVideoSrc/
 */
export interface ConfbridgeSetSingleVideoSrcActionParams {
  readonly Action: 'ConfbridgeSetSingleVideoSrc';
  readonly Conference: AmiScalar;
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeStartRecord` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeStartRecord/
 */
export interface ConfbridgeStartRecordActionParams {
  readonly Action: 'ConfbridgeStartRecord';
  readonly Conference: AmiScalar;
  readonly RecordFile?: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeStopRecord` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeStopRecord/
 */
export interface ConfbridgeStopRecordActionParams {
  readonly Action: 'ConfbridgeStopRecord';
  readonly Conference: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeUnlock` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeUnlock/
 */
export interface ConfbridgeUnlockActionParams {
  readonly Action: 'ConfbridgeUnlock';
  readonly Conference: AmiScalar;
}

/**
 * Parameters of the `ConfbridgeUnmute` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ConfbridgeUnmute/
 */
export interface ConfbridgeUnmuteActionParams {
  readonly Action: 'ConfbridgeUnmute';
  readonly Conference: AmiScalar;
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `ControlPlayback` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ControlPlayback/
 */
export interface ControlPlaybackActionParams {
  readonly Action: 'ControlPlayback';
  readonly Channel: AmiScalar;
  readonly Control: 'stop' | 'forward' | 'reverse' | 'pause' | 'restart' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `CoreSettings` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CoreSettings/
 */
export interface CoreSettingsActionParams {
  readonly Action: 'CoreSettings';
}

/**
 * Parameters of the `CoreShowChannelMap` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CoreShowChannelMap/
 */
export interface CoreShowChannelMapActionParams {
  readonly Action: 'CoreShowChannelMap';
  readonly Channel?: AmiScalar;
}

/**
 * Parameters of the `CoreShowChannels` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CoreShowChannels/
 */
export interface CoreShowChannelsActionParams {
  readonly Action: 'CoreShowChannels';
}

/**
 * Parameters of the `CoreStatus` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CoreStatus/
 */
export interface CoreStatusActionParams {
  readonly Action: 'CoreStatus';
}

/**
 * Parameters of the `CreateConfig` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/CreateConfig/
 */
export interface CreateConfigActionParams {
  readonly Action: 'CreateConfig';
  readonly Filename: AmiScalar;
}

/**
 * Parameters of the `DAHDIDialOffhook` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIDialOffhook/
 */
export interface DAHDIDialOffhookActionParams {
  readonly Action: 'DAHDIDialOffhook';
  readonly DAHDIChannel: AmiScalar;
  readonly Number: AmiScalar;
}

/**
 * Parameters of the `DAHDIDNDoff` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIDNDoff/
 */
export interface DAHDIDNDoffActionParams {
  readonly Action: 'DAHDIDNDoff';
  readonly DAHDIChannel: AmiScalar;
}

/**
 * Parameters of the `DAHDIDNDon` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIDNDon/
 */
export interface DAHDIDNDonActionParams {
  readonly Action: 'DAHDIDNDon';
  readonly DAHDIChannel: AmiScalar;
}

/**
 * Parameters of the `DAHDIHangup` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIHangup/
 */
export interface DAHDIHangupActionParams {
  readonly Action: 'DAHDIHangup';
  readonly DAHDIChannel: AmiScalar;
}

/**
 * Parameters of the `DAHDIRestart` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIRestart/
 */
export interface DAHDIRestartActionParams {
  readonly Action: 'DAHDIRestart';
}

/**
 * Parameters of the `DAHDIShowChannels` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIShowChannels/
 */
export interface DAHDIShowChannelsActionParams {
  readonly Action: 'DAHDIShowChannels';
  readonly DAHDIChannel?: AmiScalar;
}

/**
 * Parameters of the `DAHDIShowStatus` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDIShowStatus/
 */
export interface DAHDIShowStatusActionParams {
  readonly Action: 'DAHDIShowStatus';
}

/**
 * Parameters of the `DAHDITransfer` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DAHDITransfer/
 */
export interface DAHDITransferActionParams {
  readonly Action: 'DAHDITransfer';
  readonly DAHDIChannel: AmiScalar;
}

/**
 * Parameters of the `DBDel` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DBDel/
 */
export interface DBDelActionParams {
  readonly Action: 'DBDel';
  readonly Family: AmiScalar;
  readonly Key: AmiScalar;
}

/**
 * Parameters of the `DBDelTree` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DBDelTree/
 */
export interface DBDelTreeActionParams {
  readonly Action: 'DBDelTree';
  readonly Family: AmiScalar;
  readonly Key?: AmiScalar;
}

/**
 * Parameters of the `DBGet` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DBGet/
 */
export interface DBGetActionParams {
  readonly Action: 'DBGet';
  readonly Family: AmiScalar;
  readonly Key: AmiScalar;
}

/**
 * Parameters of the `DBGetTree` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DBGetTree/
 */
export interface DBGetTreeActionParams {
  readonly Action: 'DBGetTree';
  readonly Family?: AmiScalar;
  readonly Key?: AmiScalar;
}

/**
 * Parameters of the `DBPut` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DBPut/
 */
export interface DBPutActionParams {
  readonly Action: 'DBPut';
  readonly Family: AmiScalar;
  readonly Key: AmiScalar;
  readonly Val?: AmiScalar;
}

/**
 * Parameters of the `DeviceStateChange` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DeviceStateChange/
 */
export interface DeviceStateChangeActionParams {
  readonly Action: 'DeviceStateChange';
  readonly Device: AmiScalar;
  readonly State: AmiScalar;
  readonly Cachable?: AmiScalar;
  readonly EntityID: AmiScalar;
}

/**
 * Parameters of the `DeviceStateList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DeviceStateList/
 */
export interface DeviceStateListActionParams {
  readonly Action: 'DeviceStateList';
}

/**
 * Parameters of the `DialplanExtensionAdd` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DialplanExtensionAdd/
 */
export interface DialplanExtensionAddActionParams {
  readonly Action: 'DialplanExtensionAdd';
  readonly Context: AmiScalar;
  readonly Extension: AmiScalar;
  readonly Priority: AmiScalar;
  readonly Application: AmiScalar;
  readonly ApplicationData?: AmiScalar;
  readonly Replace?: AmiScalar;
}

/**
 * Parameters of the `DialplanExtensionRemove` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/DialplanExtensionRemove/
 */
export interface DialplanExtensionRemoveActionParams {
  readonly Action: 'DialplanExtensionRemove';
  readonly Context: AmiScalar;
  readonly Extension: AmiScalar;
  readonly Priority?: AmiScalar;
}

/**
 * Parameters of the `Events` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Events/
 */
export interface EventsActionParams {
  readonly Action: 'Events';
  readonly EventMask: 'on' | 'off' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `ExtensionState` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ExtensionState/
 */
export interface ExtensionStateActionParams {
  readonly Action: 'ExtensionState';
  readonly Exten: AmiScalar;
  readonly Context: AmiScalar;
}

/**
 * Parameters of the `ExtensionStateList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ExtensionStateList/
 */
export interface ExtensionStateListActionParams {
  readonly Action: 'ExtensionStateList';
}

/**
 * Parameters of the `FAXSession` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/FAXSession/
 */
export interface FAXSessionActionParams {
  readonly Action: 'FAXSession';
  readonly SessionNumber: AmiScalar;
}

/**
 * Parameters of the `FAXSessions` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/FAXSessions/
 */
export interface FAXSessionsActionParams {
  readonly Action: 'FAXSessions';
}

/**
 * Parameters of the `FAXStats` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/FAXStats/
 */
export interface FAXStatsActionParams {
  readonly Action: 'FAXStats';
}

/**
 * Parameters of the `Filter` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Filter/
 */
export interface FilterActionParams {
  readonly Action: 'Filter';
  readonly Operation?: 'Add' | (string & {}) | number | boolean;
  readonly MatchCriteria?: AmiScalar;
  readonly Filter?: AmiScalar;
}

/**
 * Parameters of the `GetConfig` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/GetConfig/
 */
export interface GetConfigActionParams {
  readonly Action: 'GetConfig';
  readonly Filename: AmiScalar;
  readonly Category?: AmiScalar;
  readonly Filter?: AmiScalar;
}

/**
 * Parameters of the `GetConfigJSON` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/GetConfigJSON/
 */
export interface GetConfigJSONActionParams {
  readonly Action: 'GetConfigJSON';
  readonly Filename: AmiScalar;
  readonly Category?: AmiScalar;
  readonly Filter?: AmiScalar;
}

/**
 * Parameters of the `Getvar` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Getvar/
 */
export interface GetvarActionParams {
  readonly Action: 'Getvar';
  readonly Channel?: AmiScalar;
  readonly Variable: HeaderValue;
}

/**
 * Parameters of the `Hangup` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Hangup/
 */
export interface HangupActionParams {
  readonly Action: 'Hangup';
  readonly Channel: AmiScalar;
  readonly Cause?: AmiScalar;
}

/**
 * Parameters of the `IAXnetstats` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/IAXnetstats/
 */
export interface IAXnetstatsActionParams {
  readonly Action: 'IAXnetstats';
}

/**
 * Parameters of the `IAXpeerlist` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/IAXpeerlist/
 */
export interface IAXpeerlistActionParams {
  readonly Action: 'IAXpeerlist';
}

/**
 * Parameters of the `IAXpeers` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/IAXpeers/
 */
export interface IAXpeersActionParams {
  readonly Action: 'IAXpeers';
}

/**
 * Parameters of the `IAXregistry` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/IAXregistry/
 */
export interface IAXregistryActionParams {
  readonly Action: 'IAXregistry';
}

/**
 * Parameters of the `JabberSend` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/JabberSend/
 */
export interface JabberSendActionParams {
  readonly Action: 'JabberSend';
  readonly Jabber: AmiScalar;
  readonly JID: AmiScalar;
  readonly Message: AmiScalar;
}

/**
 * Parameters of the `ListCategories` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ListCategories/
 */
export interface ListCategoriesActionParams {
  readonly Action: 'ListCategories';
  readonly Filename: AmiScalar;
}

/**
 * Parameters of the `ListCommands` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ListCommands/
 */
export interface ListCommandsActionParams {
  readonly Action: 'ListCommands';
}

/**
 * Parameters of the `LocalOptimizeAway` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/LocalOptimizeAway/
 */
export interface LocalOptimizeAwayActionParams {
  readonly Action: 'LocalOptimizeAway';
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `LoggerRotate` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/LoggerRotate/
 */
export interface LoggerRotateActionParams {
  readonly Action: 'LoggerRotate';
}

/**
 * Parameters of the `Login` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Login/
 */
export interface LoginActionParams {
  readonly Action: 'Login';
  readonly Username: AmiScalar;
  readonly AuthType?: 'plain' | 'MD5' | (string & {}) | number | boolean;
  readonly Secret?: AmiScalar;
  readonly Key?: AmiScalar;
  readonly Events?: AmiScalar;
}

/**
 * Parameters of the `Logoff` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Logoff/
 */
export interface LogoffActionParams {
  readonly Action: 'Logoff';
}

/**
 * Parameters of the `MailboxCount` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MailboxCount/
 */
export interface MailboxCountActionParams {
  readonly Action: 'MailboxCount';
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `MailboxStateChange` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MailboxStateChange/
 */
export interface MailboxStateChangeActionParams {
  readonly Action: 'MailboxStateChange';
  readonly Mailbox: AmiScalar;
  readonly NewMessages: AmiScalar;
  readonly OldMessages: AmiScalar;
  readonly EntityID: AmiScalar;
}

/**
 * Parameters of the `MailboxStatus` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MailboxStatus/
 */
export interface MailboxStatusActionParams {
  readonly Action: 'MailboxStatus';
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `MeetmeList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MeetmeList/
 */
export interface MeetmeListActionParams {
  readonly Action: 'MeetmeList';
  readonly Conference?: AmiScalar;
}

/**
 * Parameters of the `MeetmeListRooms` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MeetmeListRooms/
 */
export interface MeetmeListRoomsActionParams {
  readonly Action: 'MeetmeListRooms';
}

/**
 * Parameters of the `MeetmeMute` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MeetmeMute/
 */
export interface MeetmeMuteActionParams {
  readonly Action: 'MeetmeMute';
  readonly Meetme: AmiScalar;
  readonly Usernum: AmiScalar;
}

/**
 * Parameters of the `MeetmeUnmute` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MeetmeUnmute/
 */
export interface MeetmeUnmuteActionParams {
  readonly Action: 'MeetmeUnmute';
  readonly Meetme: AmiScalar;
  readonly Usernum: AmiScalar;
}

/**
 * Parameters of the `MessageSend` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MessageSend/
 */
export interface MessageSendActionParams {
  readonly Action: 'MessageSend';
  readonly Destination?: AmiScalar;
  readonly To?: AmiScalar;
  readonly From?: AmiScalar;
  readonly Body?: AmiScalar;
  readonly Base64Body?: AmiScalar;
  readonly Variable?: HeaderValue;
}

/**
 * Parameters of the `MixMonitor` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MixMonitor/
 */
export interface MixMonitorActionParams {
  readonly Action: 'MixMonitor';
  readonly Channel: AmiScalar;
  readonly File?: AmiScalar;
  readonly Options?: AmiScalar;
  readonly Command?: AmiScalar;
}

/**
 * Parameters of the `MixMonitorMute` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MixMonitorMute/
 */
export interface MixMonitorMuteActionParams {
  readonly Action: 'MixMonitorMute';
  readonly Channel: AmiScalar;
  readonly Direction?: AmiScalar;
  readonly State?: AmiScalar;
}

/**
 * Parameters of the `ModuleCheck` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ModuleCheck/
 */
export interface ModuleCheckActionParams {
  readonly Action: 'ModuleCheck';
  readonly Module: AmiScalar;
}

/**
 * Parameters of the `ModuleLoad` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ModuleLoad/
 */
export interface ModuleLoadActionParams {
  readonly Action: 'ModuleLoad';
  readonly Module?: 'cdr' | 'dnsmgr' | 'extconfig' | 'enum' | 'acl' | 'manager' | 'http' | 'logger' | 'features' | 'dsp' | 'udptl' | 'indications' | 'cel' | 'plc' | (string & {}) | number | boolean;
  readonly LoadType: 'load' | 'unload' | 'reload' | 'refresh' | (string & {}) | number | boolean;
  readonly Recursive?: AmiScalar;
}

/**
 * Parameters of the `Monitor` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/Monitor/
 * @deprecated Not available in Asterisk 24.
 */
export interface MonitorActionParams {
  readonly Action: 'Monitor';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
  /** Asterisk 20 only. */
  readonly File?: AmiScalar;
  /** Asterisk 20 only. */
  readonly Format?: AmiScalar;
  /** Asterisk 20 only. */
  readonly Mix?: AmiScalar;
}

/**
 * Parameters of the `MuteAudio` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MuteAudio/
 */
export interface MuteAudioActionParams {
  readonly Action: 'MuteAudio';
  readonly Channel: AmiScalar;
  readonly Direction: 'in' | 'out' | 'all' | (string & {}) | number | boolean;
  readonly State: 'on' | 'off' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `MWIDelete` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MWIDelete/
 */
export interface MWIDeleteActionParams {
  readonly Action: 'MWIDelete';
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `MWIGet` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MWIGet/
 */
export interface MWIGetActionParams {
  readonly Action: 'MWIGet';
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `MWIUpdate` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/MWIUpdate/
 */
export interface MWIUpdateActionParams {
  readonly Action: 'MWIUpdate';
  readonly Mailbox: AmiScalar;
  readonly OldMessages?: AmiScalar;
  readonly NewMessages?: AmiScalar;
}

/**
 * Parameters of the `Originate` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Originate/
 */
export interface OriginateActionParams {
  readonly Action: 'Originate';
  readonly Channel: AmiScalar;
  readonly Exten?: AmiScalar;
  readonly Context?: AmiScalar;
  readonly Priority?: AmiScalar;
  readonly Application?: AmiScalar;
  readonly Data?: AmiScalar;
  readonly Timeout?: AmiScalar;
  readonly CallerID?: AmiScalar;
  readonly Variable?: HeaderValue;
  readonly Account?: AmiScalar;
  readonly EarlyMedia?: AmiScalar;
  readonly Async?: AmiScalar;
  readonly Codecs?: AmiScalar;
  readonly ChannelId?: AmiScalar;
  readonly OtherChannelId?: AmiScalar;
  readonly PreDialGoSub?: AmiScalar;
}

/**
 * Parameters of the `Park` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Park/
 */
export interface ParkActionParams {
  readonly Action: 'Park';
  readonly Channel: AmiScalar;
  readonly TimeoutChannel?: AmiScalar;
  readonly AnnounceChannel?: AmiScalar;
  readonly Timeout?: AmiScalar;
  readonly Parkinglot?: AmiScalar;
  readonly ParkingSpace?: AmiScalar;
}

/**
 * Parameters of the `ParkedCalls` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ParkedCalls/
 */
export interface ParkedCallsActionParams {
  readonly Action: 'ParkedCalls';
  readonly ParkingLot?: AmiScalar;
}

/**
 * Parameters of the `Parkinglots` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Parkinglots/
 */
export interface ParkinglotsActionParams {
  readonly Action: 'Parkinglots';
}

/**
 * Parameters of the `PauseMonitor` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/PauseMonitor/
 * @deprecated Not available in Asterisk 24.
 */
export interface PauseMonitorActionParams {
  readonly Action: 'PauseMonitor';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `Ping` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Ping/
 */
export interface PingActionParams {
  readonly Action: 'Ping';
}

/**
 * Parameters of the `PJSIPHangup` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPHangup/
 */
export interface PJSIPHangupActionParams {
  readonly Action: 'PJSIPHangup';
  readonly Channel: AmiScalar;
  readonly Cause: 'Response code' | 'Response code name' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `PJSIPNotify` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPNotify/
 */
export interface PJSIPNotifyActionParams {
  readonly Action: 'PJSIPNotify';
  readonly Endpoint?: AmiScalar;
  readonly URI?: AmiScalar;
  readonly channel?: AmiScalar;
  readonly Option?: AmiScalar;
  readonly Variable?: HeaderValue;
}

/**
 * Parameters of the `PJSIPQualify` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPQualify/
 */
export interface PJSIPQualifyActionParams {
  readonly Action: 'PJSIPQualify';
  readonly Endpoint: AmiScalar;
}

/**
 * Parameters of the `PJSIPRegister` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPRegister/
 */
export interface PJSIPRegisterActionParams {
  readonly Action: 'PJSIPRegister';
  readonly Registration: AmiScalar;
}

/**
 * Parameters of the `PJSIPSetMaintenance` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPSetMaintenance/
 */
export interface PJSIPSetMaintenanceActionParams {
  readonly Action: 'PJSIPSetMaintenance';
  readonly Endpoint: AmiScalar;
  readonly State: 'on' | 'off' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `PJSIPShowAors` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowAors/
 */
export interface PJSIPShowAorsActionParams {
  readonly Action: 'PJSIPShowAors';
}

/**
 * Parameters of the `PJSIPShowAuths` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowAuths/
 */
export interface PJSIPShowAuthsActionParams {
  readonly Action: 'PJSIPShowAuths';
}

/**
 * Parameters of the `PJSIPShowContacts` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowContacts/
 */
export interface PJSIPShowContactsActionParams {
  readonly Action: 'PJSIPShowContacts';
}

/**
 * Parameters of the `PJSIPShowEndpoint` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowEndpoint/
 */
export interface PJSIPShowEndpointActionParams {
  readonly Action: 'PJSIPShowEndpoint';
  readonly Endpoint: AmiScalar;
}

/**
 * Parameters of the `PJSIPShowEndpoints` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowEndpoints/
 */
export interface PJSIPShowEndpointsActionParams {
  readonly Action: 'PJSIPShowEndpoints';
}

/**
 * Parameters of the `PJSIPShowMaintenance` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowMaintenance/
 */
export interface PJSIPShowMaintenanceActionParams {
  readonly Action: 'PJSIPShowMaintenance';
  readonly Endpoint?: AmiScalar;
}

/**
 * Parameters of the `PJSIPShowRegistrationInboundContactStatuses` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowRegistrationInboundContactStatuses/
 */
export interface PJSIPShowRegistrationInboundContactStatusesActionParams {
  readonly Action: 'PJSIPShowRegistrationInboundContactStatuses';
}

/**
 * Parameters of the `PJSIPShowRegistrationsInbound` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowRegistrationsInbound/
 */
export interface PJSIPShowRegistrationsInboundActionParams {
  readonly Action: 'PJSIPShowRegistrationsInbound';
}

/**
 * Parameters of the `PJSIPShowRegistrationsOutbound` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowRegistrationsOutbound/
 */
export interface PJSIPShowRegistrationsOutboundActionParams {
  readonly Action: 'PJSIPShowRegistrationsOutbound';
}

/**
 * Parameters of the `PJSIPShowResourceLists` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowResourceLists/
 */
export interface PJSIPShowResourceListsActionParams {
  readonly Action: 'PJSIPShowResourceLists';
}

/**
 * Parameters of the `PJSIPShowSubscriptionsInbound` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowSubscriptionsInbound/
 */
export interface PJSIPShowSubscriptionsInboundActionParams {
  readonly Action: 'PJSIPShowSubscriptionsInbound';
}

/**
 * Parameters of the `PJSIPShowSubscriptionsOutbound` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPShowSubscriptionsOutbound/
 */
export interface PJSIPShowSubscriptionsOutboundActionParams {
  readonly Action: 'PJSIPShowSubscriptionsOutbound';
}

/**
 * Parameters of the `PJSIPUnregister` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PJSIPUnregister/
 */
export interface PJSIPUnregisterActionParams {
  readonly Action: 'PJSIPUnregister';
  readonly Registration: AmiScalar;
}

/**
 * Parameters of the `PlayDTMF` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PlayDTMF/
 */
export interface PlayDTMFActionParams {
  readonly Action: 'PlayDTMF';
  readonly Channel: AmiScalar;
  readonly Digit: AmiScalar;
  readonly Duration?: AmiScalar;
  readonly Receive?: AmiScalar;
}

/**
 * Parameters of the `PlayMF` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PlayMF/
 */
export interface PlayMFActionParams {
  readonly Action: 'PlayMF';
  readonly Channel: AmiScalar;
  readonly Digit: AmiScalar;
  readonly Duration?: AmiScalar;
}

/**
 * Parameters of the `PresenceState` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PresenceState/
 */
export interface PresenceStateActionParams {
  readonly Action: 'PresenceState';
  readonly Provider: AmiScalar;
}

/**
 * Parameters of the `PresenceStateList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PresenceStateList/
 */
export interface PresenceStateListActionParams {
  readonly Action: 'PresenceStateList';
}

/**
 * Parameters of the `PRIDebugFileSet` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PRIDebugFileSet/
 */
export interface PRIDebugFileSetActionParams {
  readonly Action: 'PRIDebugFileSet';
  readonly File: AmiScalar;
}

/**
 * Parameters of the `PRIDebugFileUnset` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PRIDebugFileUnset/
 */
export interface PRIDebugFileUnsetActionParams {
  readonly Action: 'PRIDebugFileUnset';
}

/**
 * Parameters of the `PRIDebugSet` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PRIDebugSet/
 */
export interface PRIDebugSetActionParams {
  readonly Action: 'PRIDebugSet';
  readonly Span: AmiScalar;
  readonly Level: 'off' | 'on' | 'hex' | 'intense' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `PRIShowSpans` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/PRIShowSpans/
 */
export interface PRIShowSpansActionParams {
  readonly Action: 'PRIShowSpans';
  readonly Span?: AmiScalar;
}

/**
 * Parameters of the `QueueAdd` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueAdd/
 */
export interface QueueAddActionParams {
  readonly Action: 'QueueAdd';
  readonly Queue: AmiScalar;
  readonly Interface: AmiScalar;
  readonly Penalty?: AmiScalar;
  readonly Paused?: AmiScalar;
  readonly Reason?: AmiScalar;
  readonly MemberName?: AmiScalar;
  readonly StateInterface?: AmiScalar;
}

/**
 * Parameters of the `QueueChangePriorityCaller` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueChangePriorityCaller/
 */
export interface QueueChangePriorityCallerActionParams {
  readonly Action: 'QueueChangePriorityCaller';
  readonly Queue: AmiScalar;
  readonly Caller: AmiScalar;
  readonly Priority: AmiScalar;
  readonly Immediate?: AmiScalar;
}

/**
 * Parameters of the `QueueLog` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueLog/
 */
export interface QueueLogActionParams {
  readonly Action: 'QueueLog';
  readonly Queue: AmiScalar;
  readonly Event: AmiScalar;
  readonly Uniqueid?: AmiScalar;
  readonly Interface?: AmiScalar;
  readonly Message?: AmiScalar;
}

/**
 * Parameters of the `QueueMemberRingInUse` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueMemberRingInUse/
 */
export interface QueueMemberRingInUseActionParams {
  readonly Action: 'QueueMemberRingInUse';
  readonly Interface: AmiScalar;
  readonly RingInUse: AmiScalar;
  readonly Queue?: AmiScalar;
}

/**
 * Parameters of the `QueuePause` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueuePause/
 */
export interface QueuePauseActionParams {
  readonly Action: 'QueuePause';
  readonly Interface: AmiScalar;
  readonly Paused: AmiScalar;
  readonly Queue?: AmiScalar;
  readonly Reason?: AmiScalar;
}

/**
 * Parameters of the `QueuePenalty` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueuePenalty/
 */
export interface QueuePenaltyActionParams {
  readonly Action: 'QueuePenalty';
  readonly Interface: AmiScalar;
  readonly Penalty: AmiScalar;
  readonly Queue?: AmiScalar;
}

/**
 * Parameters of the `QueueReload` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueReload/
 */
export interface QueueReloadActionParams {
  readonly Action: 'QueueReload';
  readonly Queue?: AmiScalar;
  readonly Members?: 'yes' | 'no' | (string & {}) | number | boolean;
  readonly Rules?: 'yes' | 'no' | (string & {}) | number | boolean;
  readonly Parameters?: 'yes' | 'no' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `QueueRemove` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueRemove/
 */
export interface QueueRemoveActionParams {
  readonly Action: 'QueueRemove';
  readonly Queue: AmiScalar;
  readonly Interface: AmiScalar;
}

/**
 * Parameters of the `QueueReset` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueReset/
 */
export interface QueueResetActionParams {
  readonly Action: 'QueueReset';
  readonly Queue?: AmiScalar;
}

/**
 * Parameters of the `QueueRule` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueRule/
 */
export interface QueueRuleActionParams {
  readonly Action: 'QueueRule';
  readonly Rule?: AmiScalar;
}

/**
 * Parameters of the `QueueStatus` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueStatus/
 */
export interface QueueStatusActionParams {
  readonly Action: 'QueueStatus';
  readonly Queue?: AmiScalar;
  readonly Member?: AmiScalar;
}

/**
 * Parameters of the `QueueSummary` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueSummary/
 */
export interface QueueSummaryActionParams {
  readonly Action: 'QueueSummary';
  readonly Queue?: AmiScalar;
}

/**
 * Parameters of the `QueueWithdrawCaller` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/QueueWithdrawCaller/
 */
export interface QueueWithdrawCallerActionParams {
  readonly Action: 'QueueWithdrawCaller';
  readonly Queue: AmiScalar;
  readonly Caller: AmiScalar;
  readonly WithdrawInfo?: AmiScalar;
}

/**
 * Parameters of the `Redirect` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Redirect/
 */
export interface RedirectActionParams {
  readonly Action: 'Redirect';
  readonly Channel: AmiScalar;
  readonly ExtraChannel?: AmiScalar;
  readonly Exten: AmiScalar;
  readonly ExtraExten?: AmiScalar;
  readonly Context: AmiScalar;
  readonly ExtraContext?: AmiScalar;
  readonly Priority: AmiScalar;
  readonly ExtraPriority?: AmiScalar;
}

/**
 * Parameters of the `Reload` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Reload/
 */
export interface ReloadActionParams {
  readonly Action: 'Reload';
  readonly Module?: AmiScalar;
}

/**
 * Parameters of the `SendFlash` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SendFlash/
 */
export interface SendFlashActionParams {
  readonly Action: 'SendFlash';
  readonly Channel: AmiScalar;
  readonly Receive?: AmiScalar;
}

/**
 * Parameters of the `SendText` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SendText/
 */
export interface SendTextActionParams {
  readonly Action: 'SendText';
  readonly Channel: AmiScalar;
  readonly Message: AmiScalar;
  readonly 'Content-Type'?: AmiScalar;
}

/**
 * Parameters of the `Setvar` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Setvar/
 */
export interface SetvarActionParams {
  readonly Action: 'Setvar';
  readonly Channel?: AmiScalar;
  readonly Variable: HeaderValue;
  readonly Value: AmiScalar;
}

/**
 * Parameters of the `ShowDialPlan` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/ShowDialPlan/
 */
export interface ShowDialPlanActionParams {
  readonly Action: 'ShowDialPlan';
  readonly Extension?: AmiScalar;
  readonly Context?: AmiScalar;
}

/**
 * Parameters of the `SIPnotify` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPnotify/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPnotifyActionParams {
  readonly Action: 'SIPnotify';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
  /** Asterisk 20 only. */
  readonly Variable: HeaderValue;
  /** Asterisk 20 only. */
  readonly 'Call-ID'?: AmiScalar;
}

/**
 * Parameters of the `SIPpeers` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPpeers/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPpeersActionParams {
  readonly Action: 'SIPpeers';
}

/**
 * Parameters of the `SIPpeerstatus` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPpeerstatus/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPpeerstatusActionParams {
  readonly Action: 'SIPpeerstatus';
  /** Asterisk 20 only. */
  readonly Peer?: AmiScalar;
}

/**
 * Parameters of the `SIPqualifypeer` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPqualifypeer/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPqualifypeerActionParams {
  readonly Action: 'SIPqualifypeer';
  /** Asterisk 20 only. */
  readonly Peer: AmiScalar;
}

/**
 * Parameters of the `SIPshowpeer` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPshowpeer/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPshowpeerActionParams {
  readonly Action: 'SIPshowpeer';
  /** Asterisk 20 only. */
  readonly Peer: AmiScalar;
}

/**
 * Parameters of the `SIPshowregistry` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SIPshowregistry/
 * @deprecated Not available in Asterisk 24.
 */
export interface SIPshowregistryActionParams {
  readonly Action: 'SIPshowregistry';
}

/**
 * Parameters of the `SKINNYdevices` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SKINNYdevices/
 * @deprecated Not available in Asterisk 24.
 */
export interface SKINNYdevicesActionParams {
  readonly Action: 'SKINNYdevices';
}

/**
 * Parameters of the `SKINNYlines` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SKINNYlines/
 * @deprecated Not available in Asterisk 24.
 */
export interface SKINNYlinesActionParams {
  readonly Action: 'SKINNYlines';
}

/**
 * Parameters of the `SKINNYshowdevice` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SKINNYshowdevice/
 * @deprecated Not available in Asterisk 24.
 */
export interface SKINNYshowdeviceActionParams {
  readonly Action: 'SKINNYshowdevice';
  /** Asterisk 20 only. */
  readonly Device: AmiScalar;
}

/**
 * Parameters of the `SKINNYshowline` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/SKINNYshowline/
 * @deprecated Not available in Asterisk 24.
 */
export interface SKINNYshowlineActionParams {
  readonly Action: 'SKINNYshowline';
  /** Asterisk 20 only. */
  readonly Line: AmiScalar;
}

/**
 * Parameters of the `SorceryMemoryCacheExpire` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SorceryMemoryCacheExpire/
 */
export interface SorceryMemoryCacheExpireActionParams {
  readonly Action: 'SorceryMemoryCacheExpire';
  readonly Cache: AmiScalar;
}

/**
 * Parameters of the `SorceryMemoryCacheExpireObject` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SorceryMemoryCacheExpireObject/
 */
export interface SorceryMemoryCacheExpireObjectActionParams {
  readonly Action: 'SorceryMemoryCacheExpireObject';
  readonly Cache: AmiScalar;
  readonly Object: AmiScalar;
}

/**
 * Parameters of the `SorceryMemoryCachePopulate` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SorceryMemoryCachePopulate/
 */
export interface SorceryMemoryCachePopulateActionParams {
  readonly Action: 'SorceryMemoryCachePopulate';
  readonly Cache: AmiScalar;
}

/**
 * Parameters of the `SorceryMemoryCacheStale` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SorceryMemoryCacheStale/
 */
export interface SorceryMemoryCacheStaleActionParams {
  readonly Action: 'SorceryMemoryCacheStale';
  readonly Cache: AmiScalar;
}

/**
 * Parameters of the `SorceryMemoryCacheStaleObject` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/SorceryMemoryCacheStaleObject/
 */
export interface SorceryMemoryCacheStaleObjectActionParams {
  readonly Action: 'SorceryMemoryCacheStaleObject';
  readonly Cache: AmiScalar;
  readonly Object: AmiScalar;
  readonly Reload?: AmiScalar;
}

/**
 * Parameters of the `Status` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/Status/
 */
export interface StatusActionParams {
  readonly Action: 'Status';
  readonly Channel?: AmiScalar;
  readonly Variables?: AmiScalar;
  readonly AllVariables?: 'true' | 'false' | (string & {}) | number | boolean;
}

/**
 * Parameters of the `StopMixMonitor` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/StopMixMonitor/
 */
export interface StopMixMonitorActionParams {
  readonly Action: 'StopMixMonitor';
  readonly Channel: AmiScalar;
  readonly MixMonitorID?: AmiScalar;
}

/**
 * Parameters of the `StopMonitor` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/StopMonitor/
 * @deprecated Not available in Asterisk 24.
 */
export interface StopMonitorActionParams {
  readonly Action: 'StopMonitor';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `UnpauseMonitor` action.
 * Asterisk 20 only.
 * @see https://docs.asterisk.org/Asterisk_20_Documentation/API_Documentation/AMI_Actions/UnpauseMonitor/
 * @deprecated Not available in Asterisk 24.
 */
export interface UnpauseMonitorActionParams {
  readonly Action: 'UnpauseMonitor';
  /** Asterisk 20 only. */
  readonly Channel: AmiScalar;
}

/**
 * Parameters of the `UpdateConfig` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/UpdateConfig/
 */
export interface UpdateConfigActionParams {
  readonly Action: 'UpdateConfig';
  readonly SrcFilename: AmiScalar;
  readonly DstFilename: AmiScalar;
  readonly Reload?: AmiScalar;
  readonly PreserveEffectiveContext?: AmiScalar;
  readonly [header: `Action-${string}`]: AmiScalar | undefined;
  readonly [header: `Cat-${string}`]: AmiScalar | undefined;
  readonly [header: `Var-${string}`]: AmiScalar | undefined;
  readonly [header: `Value-${string}`]: AmiScalar | undefined;
  readonly [header: `Match-${string}`]: AmiScalar | undefined;
  readonly [header: `Line-${string}`]: AmiScalar | undefined;
  readonly [header: `Options-${string}`]: AmiScalar | undefined;
}

/**
 * Parameters of the `UserEvent` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/UserEvent/
 */
export interface UserEventActionParams {
  readonly Action: 'UserEvent';
  readonly UserEvent: AmiScalar;
  readonly Header1?: AmiScalar;
  readonly HeaderN?: AmiScalar;
}

/**
 * Parameters of the `VoicemailBoxSummary` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailBoxSummary/
 */
export interface VoicemailBoxSummaryActionParams {
  readonly Action: 'VoicemailBoxSummary';
  readonly Context: AmiScalar;
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `VoicemailForward` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailForward/
 */
export interface VoicemailForwardActionParams {
  readonly Action: 'VoicemailForward';
  readonly Context: AmiScalar;
  readonly Mailbox: AmiScalar;
  readonly Folder: AmiScalar;
  readonly ID: AmiScalar;
  readonly ToContext: AmiScalar;
  readonly ToMailbox: AmiScalar;
  readonly ToFolder: AmiScalar;
}

/**
 * Parameters of the `VoicemailMove` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailMove/
 */
export interface VoicemailMoveActionParams {
  readonly Action: 'VoicemailMove';
  readonly Context: AmiScalar;
  readonly Mailbox: AmiScalar;
  readonly Folder: AmiScalar;
  readonly ID: AmiScalar;
  readonly ToFolder: AmiScalar;
}

/**
 * Parameters of the `VoicemailRefresh` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailRefresh/
 */
export interface VoicemailRefreshActionParams {
  readonly Action: 'VoicemailRefresh';
  readonly Context?: AmiScalar;
  readonly Mailbox?: AmiScalar;
}

/**
 * Parameters of the `VoicemailRemove` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailRemove/
 */
export interface VoicemailRemoveActionParams {
  readonly Action: 'VoicemailRemove';
  readonly Context: AmiScalar;
  readonly Mailbox: AmiScalar;
  readonly Folder: AmiScalar;
  readonly ID: AmiScalar;
}

/**
 * Parameters of the `VoicemailUsersList` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailUsersList/
 */
export interface VoicemailUsersListActionParams {
  readonly Action: 'VoicemailUsersList';
}

/**
 * Parameters of the `VoicemailUserStatus` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/VoicemailUserStatus/
 */
export interface VoicemailUserStatusActionParams {
  readonly Action: 'VoicemailUserStatus';
  readonly Context: AmiScalar;
  readonly Mailbox: AmiScalar;
}

/**
 * Parameters of the `WaitEvent` action.
 * @see https://docs.asterisk.org/Latest_API/API_Documentation/AMI_Actions/WaitEvent/
 */
export interface WaitEventActionParams {
  readonly Action: 'WaitEvent';
  readonly Timeout: AmiScalar;
}

/** Every action this library knows, by name. */
export interface AmiActionMap {
  AbsoluteTimeout: AbsoluteTimeoutActionParams;
  AgentLogoff: AgentLogoffActionParams;
  Agents: AgentsActionParams;
  AGI: AGIActionParams;
  AOCMessage: AOCMessageActionParams;
  Atxfer: AtxferActionParams;
  BlindTransfer: BlindTransferActionParams;
  Bridge: BridgeActionParams;
  BridgeDestroy: BridgeDestroyActionParams;
  BridgeInfo: BridgeInfoActionParams;
  BridgeKick: BridgeKickActionParams;
  BridgeList: BridgeListActionParams;
  BridgeTechnologyList: BridgeTechnologyListActionParams;
  BridgeTechnologySuspend: BridgeTechnologySuspendActionParams;
  BridgeTechnologyUnsuspend: BridgeTechnologyUnsuspendActionParams;
  CancelAtxfer: CancelAtxferActionParams;
  Challenge: ChallengeActionParams;
  ChangeMonitor: ChangeMonitorActionParams;
  Command: CommandActionParams;
  ConfbridgeKick: ConfbridgeKickActionParams;
  ConfbridgeList: ConfbridgeListActionParams;
  ConfbridgeListRooms: ConfbridgeListRoomsActionParams;
  ConfbridgeLock: ConfbridgeLockActionParams;
  ConfbridgeMute: ConfbridgeMuteActionParams;
  ConfbridgeSetSingleVideoSrc: ConfbridgeSetSingleVideoSrcActionParams;
  ConfbridgeStartRecord: ConfbridgeStartRecordActionParams;
  ConfbridgeStopRecord: ConfbridgeStopRecordActionParams;
  ConfbridgeUnlock: ConfbridgeUnlockActionParams;
  ConfbridgeUnmute: ConfbridgeUnmuteActionParams;
  ControlPlayback: ControlPlaybackActionParams;
  CoreSettings: CoreSettingsActionParams;
  CoreShowChannelMap: CoreShowChannelMapActionParams;
  CoreShowChannels: CoreShowChannelsActionParams;
  CoreStatus: CoreStatusActionParams;
  CreateConfig: CreateConfigActionParams;
  DAHDIDialOffhook: DAHDIDialOffhookActionParams;
  DAHDIDNDoff: DAHDIDNDoffActionParams;
  DAHDIDNDon: DAHDIDNDonActionParams;
  DAHDIHangup: DAHDIHangupActionParams;
  DAHDIRestart: DAHDIRestartActionParams;
  DAHDIShowChannels: DAHDIShowChannelsActionParams;
  DAHDIShowStatus: DAHDIShowStatusActionParams;
  DAHDITransfer: DAHDITransferActionParams;
  DBDel: DBDelActionParams;
  DBDelTree: DBDelTreeActionParams;
  DBGet: DBGetActionParams;
  DBGetTree: DBGetTreeActionParams;
  DBPut: DBPutActionParams;
  DeviceStateChange: DeviceStateChangeActionParams;
  DeviceStateList: DeviceStateListActionParams;
  DialplanExtensionAdd: DialplanExtensionAddActionParams;
  DialplanExtensionRemove: DialplanExtensionRemoveActionParams;
  Events: EventsActionParams;
  ExtensionState: ExtensionStateActionParams;
  ExtensionStateList: ExtensionStateListActionParams;
  FAXSession: FAXSessionActionParams;
  FAXSessions: FAXSessionsActionParams;
  FAXStats: FAXStatsActionParams;
  Filter: FilterActionParams;
  GetConfig: GetConfigActionParams;
  GetConfigJSON: GetConfigJSONActionParams;
  Getvar: GetvarActionParams;
  Hangup: HangupActionParams;
  IAXnetstats: IAXnetstatsActionParams;
  IAXpeerlist: IAXpeerlistActionParams;
  IAXpeers: IAXpeersActionParams;
  IAXregistry: IAXregistryActionParams;
  JabberSend: JabberSendActionParams;
  ListCategories: ListCategoriesActionParams;
  ListCommands: ListCommandsActionParams;
  LocalOptimizeAway: LocalOptimizeAwayActionParams;
  LoggerRotate: LoggerRotateActionParams;
  Login: LoginActionParams;
  Logoff: LogoffActionParams;
  MailboxCount: MailboxCountActionParams;
  MailboxStateChange: MailboxStateChangeActionParams;
  MailboxStatus: MailboxStatusActionParams;
  MeetmeList: MeetmeListActionParams;
  MeetmeListRooms: MeetmeListRoomsActionParams;
  MeetmeMute: MeetmeMuteActionParams;
  MeetmeUnmute: MeetmeUnmuteActionParams;
  MessageSend: MessageSendActionParams;
  MixMonitor: MixMonitorActionParams;
  MixMonitorMute: MixMonitorMuteActionParams;
  ModuleCheck: ModuleCheckActionParams;
  ModuleLoad: ModuleLoadActionParams;
  Monitor: MonitorActionParams;
  MuteAudio: MuteAudioActionParams;
  MWIDelete: MWIDeleteActionParams;
  MWIGet: MWIGetActionParams;
  MWIUpdate: MWIUpdateActionParams;
  Originate: OriginateActionParams;
  Park: ParkActionParams;
  ParkedCalls: ParkedCallsActionParams;
  Parkinglots: ParkinglotsActionParams;
  PauseMonitor: PauseMonitorActionParams;
  Ping: PingActionParams;
  PJSIPHangup: PJSIPHangupActionParams;
  PJSIPNotify: PJSIPNotifyActionParams;
  PJSIPQualify: PJSIPQualifyActionParams;
  PJSIPRegister: PJSIPRegisterActionParams;
  PJSIPSetMaintenance: PJSIPSetMaintenanceActionParams;
  PJSIPShowAors: PJSIPShowAorsActionParams;
  PJSIPShowAuths: PJSIPShowAuthsActionParams;
  PJSIPShowContacts: PJSIPShowContactsActionParams;
  PJSIPShowEndpoint: PJSIPShowEndpointActionParams;
  PJSIPShowEndpoints: PJSIPShowEndpointsActionParams;
  PJSIPShowMaintenance: PJSIPShowMaintenanceActionParams;
  PJSIPShowRegistrationInboundContactStatuses: PJSIPShowRegistrationInboundContactStatusesActionParams;
  PJSIPShowRegistrationsInbound: PJSIPShowRegistrationsInboundActionParams;
  PJSIPShowRegistrationsOutbound: PJSIPShowRegistrationsOutboundActionParams;
  PJSIPShowResourceLists: PJSIPShowResourceListsActionParams;
  PJSIPShowSubscriptionsInbound: PJSIPShowSubscriptionsInboundActionParams;
  PJSIPShowSubscriptionsOutbound: PJSIPShowSubscriptionsOutboundActionParams;
  PJSIPUnregister: PJSIPUnregisterActionParams;
  PlayDTMF: PlayDTMFActionParams;
  PlayMF: PlayMFActionParams;
  PresenceState: PresenceStateActionParams;
  PresenceStateList: PresenceStateListActionParams;
  PRIDebugFileSet: PRIDebugFileSetActionParams;
  PRIDebugFileUnset: PRIDebugFileUnsetActionParams;
  PRIDebugSet: PRIDebugSetActionParams;
  PRIShowSpans: PRIShowSpansActionParams;
  QueueAdd: QueueAddActionParams;
  QueueChangePriorityCaller: QueueChangePriorityCallerActionParams;
  QueueLog: QueueLogActionParams;
  QueueMemberRingInUse: QueueMemberRingInUseActionParams;
  QueuePause: QueuePauseActionParams;
  QueuePenalty: QueuePenaltyActionParams;
  QueueReload: QueueReloadActionParams;
  QueueRemove: QueueRemoveActionParams;
  QueueReset: QueueResetActionParams;
  QueueRule: QueueRuleActionParams;
  QueueStatus: QueueStatusActionParams;
  QueueSummary: QueueSummaryActionParams;
  QueueWithdrawCaller: QueueWithdrawCallerActionParams;
  Redirect: RedirectActionParams;
  Reload: ReloadActionParams;
  SendFlash: SendFlashActionParams;
  SendText: SendTextActionParams;
  Setvar: SetvarActionParams;
  ShowDialPlan: ShowDialPlanActionParams;
  SIPnotify: SIPnotifyActionParams;
  SIPpeers: SIPpeersActionParams;
  SIPpeerstatus: SIPpeerstatusActionParams;
  SIPqualifypeer: SIPqualifypeerActionParams;
  SIPshowpeer: SIPshowpeerActionParams;
  SIPshowregistry: SIPshowregistryActionParams;
  SKINNYdevices: SKINNYdevicesActionParams;
  SKINNYlines: SKINNYlinesActionParams;
  SKINNYshowdevice: SKINNYshowdeviceActionParams;
  SKINNYshowline: SKINNYshowlineActionParams;
  SorceryMemoryCacheExpire: SorceryMemoryCacheExpireActionParams;
  SorceryMemoryCacheExpireObject: SorceryMemoryCacheExpireObjectActionParams;
  SorceryMemoryCachePopulate: SorceryMemoryCachePopulateActionParams;
  SorceryMemoryCacheStale: SorceryMemoryCacheStaleActionParams;
  SorceryMemoryCacheStaleObject: SorceryMemoryCacheStaleObjectActionParams;
  Status: StatusActionParams;
  StopMixMonitor: StopMixMonitorActionParams;
  StopMonitor: StopMonitorActionParams;
  UnpauseMonitor: UnpauseMonitorActionParams;
  UpdateConfig: UpdateConfigActionParams;
  UserEvent: UserEventActionParams;
  VoicemailBoxSummary: VoicemailBoxSummaryActionParams;
  VoicemailForward: VoicemailForwardActionParams;
  VoicemailMove: VoicemailMoveActionParams;
  VoicemailRefresh: VoicemailRefreshActionParams;
  VoicemailRemove: VoicemailRemoveActionParams;
  VoicemailUsersList: VoicemailUsersListActionParams;
  VoicemailUserStatus: VoicemailUserStatusActionParams;
  WaitEvent: WaitEventActionParams;
}

export type AmiActionName = keyof AmiActionMap;

/** Any documented action, picked by its `Action` name. */
export type AmiTypedAction = AmiActionMap[AmiActionName];

export const AMI_ACTION_NAMES = [
  'AbsoluteTimeout',
  'AgentLogoff',
  'Agents',
  'AGI',
  'AOCMessage',
  'Atxfer',
  'BlindTransfer',
  'Bridge',
  'BridgeDestroy',
  'BridgeInfo',
  'BridgeKick',
  'BridgeList',
  'BridgeTechnologyList',
  'BridgeTechnologySuspend',
  'BridgeTechnologyUnsuspend',
  'CancelAtxfer',
  'Challenge',
  'ChangeMonitor',
  'Command',
  'ConfbridgeKick',
  'ConfbridgeList',
  'ConfbridgeListRooms',
  'ConfbridgeLock',
  'ConfbridgeMute',
  'ConfbridgeSetSingleVideoSrc',
  'ConfbridgeStartRecord',
  'ConfbridgeStopRecord',
  'ConfbridgeUnlock',
  'ConfbridgeUnmute',
  'ControlPlayback',
  'CoreSettings',
  'CoreShowChannelMap',
  'CoreShowChannels',
  'CoreStatus',
  'CreateConfig',
  'DAHDIDialOffhook',
  'DAHDIDNDoff',
  'DAHDIDNDon',
  'DAHDIHangup',
  'DAHDIRestart',
  'DAHDIShowChannels',
  'DAHDIShowStatus',
  'DAHDITransfer',
  'DBDel',
  'DBDelTree',
  'DBGet',
  'DBGetTree',
  'DBPut',
  'DeviceStateChange',
  'DeviceStateList',
  'DialplanExtensionAdd',
  'DialplanExtensionRemove',
  'Events',
  'ExtensionState',
  'ExtensionStateList',
  'FAXSession',
  'FAXSessions',
  'FAXStats',
  'Filter',
  'GetConfig',
  'GetConfigJSON',
  'Getvar',
  'Hangup',
  'IAXnetstats',
  'IAXpeerlist',
  'IAXpeers',
  'IAXregistry',
  'JabberSend',
  'ListCategories',
  'ListCommands',
  'LocalOptimizeAway',
  'LoggerRotate',
  'Login',
  'Logoff',
  'MailboxCount',
  'MailboxStateChange',
  'MailboxStatus',
  'MeetmeList',
  'MeetmeListRooms',
  'MeetmeMute',
  'MeetmeUnmute',
  'MessageSend',
  'MixMonitor',
  'MixMonitorMute',
  'ModuleCheck',
  'ModuleLoad',
  'Monitor',
  'MuteAudio',
  'MWIDelete',
  'MWIGet',
  'MWIUpdate',
  'Originate',
  'Park',
  'ParkedCalls',
  'Parkinglots',
  'PauseMonitor',
  'Ping',
  'PJSIPHangup',
  'PJSIPNotify',
  'PJSIPQualify',
  'PJSIPRegister',
  'PJSIPSetMaintenance',
  'PJSIPShowAors',
  'PJSIPShowAuths',
  'PJSIPShowContacts',
  'PJSIPShowEndpoint',
  'PJSIPShowEndpoints',
  'PJSIPShowMaintenance',
  'PJSIPShowRegistrationInboundContactStatuses',
  'PJSIPShowRegistrationsInbound',
  'PJSIPShowRegistrationsOutbound',
  'PJSIPShowResourceLists',
  'PJSIPShowSubscriptionsInbound',
  'PJSIPShowSubscriptionsOutbound',
  'PJSIPUnregister',
  'PlayDTMF',
  'PlayMF',
  'PresenceState',
  'PresenceStateList',
  'PRIDebugFileSet',
  'PRIDebugFileUnset',
  'PRIDebugSet',
  'PRIShowSpans',
  'QueueAdd',
  'QueueChangePriorityCaller',
  'QueueLog',
  'QueueMemberRingInUse',
  'QueuePause',
  'QueuePenalty',
  'QueueReload',
  'QueueRemove',
  'QueueReset',
  'QueueRule',
  'QueueStatus',
  'QueueSummary',
  'QueueWithdrawCaller',
  'Redirect',
  'Reload',
  'SendFlash',
  'SendText',
  'Setvar',
  'ShowDialPlan',
  'SIPnotify',
  'SIPpeers',
  'SIPpeerstatus',
  'SIPqualifypeer',
  'SIPshowpeer',
  'SIPshowregistry',
  'SKINNYdevices',
  'SKINNYlines',
  'SKINNYshowdevice',
  'SKINNYshowline',
  'SorceryMemoryCacheExpire',
  'SorceryMemoryCacheExpireObject',
  'SorceryMemoryCachePopulate',
  'SorceryMemoryCacheStale',
  'SorceryMemoryCacheStaleObject',
  'Status',
  'StopMixMonitor',
  'StopMonitor',
  'UnpauseMonitor',
  'UpdateConfig',
  'UserEvent',
  'VoicemailBoxSummary',
  'VoicemailForward',
  'VoicemailMove',
  'VoicemailRefresh',
  'VoicemailRemove',
  'VoicemailUsersList',
  'VoicemailUserStatus',
  'WaitEvent',
] as const satisfies readonly AmiActionName[];
