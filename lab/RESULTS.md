# Live test results

Run on 2026-11-15 with `lab/run.sh`: each Asterisk in Docker, the configuration in
`lab/asterisk`, both scripts against the built library. Every result below was measured
in that run; nothing is copied from elsewhere.

| Asterisk | AMI | `live-check.mjs` | `live-conformance.mjs` | Event kinds seen | Events received |
|---|---|---|---|---|---|
| 18.10.0 | 7.0.1 | 22 of 22 | 72 ok, 0 failed, 5 skipped | 49 | 90,821 |
| 20.21.0 | 9.0.0 | 22 of 22 | 73 ok, 0 failed, 4 skipped | 49 | 90,858 |
| 22.12.0 | 11.0.0 | 22 of 22 | 72 ok, 0 failed, 5 skipped | 49 | 90,864 |
| 23.5.0 | 12.0.0 | 22 of 22 | 73 ok, 0 failed, 4 skipped | 49 | 90,857 |

Asterisk 18 ran as an x86 image under emulation on an ARM machine, so its speeds below
are much lower than a real server's.

## What the conformance script covers

- **Every action the server offers** (`ListCommands`) has a type in the library, on all four
  versions, Asterisk 18 included.
- **45 read-only actions**: each gets its own answer (a reply, a complete list, or an
  error message), list item counts match `ListItems`, and no list event arrives after its
  list was complete.
- **Calls that produce events**: queue, abandoned queue, dial and bridge, busy, hangup
  cause, DTMF, caller id and account code, mixing monitor, music on hold, conference,
  parking. Every expected event arrived, and every header of every event is readable
  through the typed `fields`.
- **Round trips**: global and channel variables, the Asterisk database, queue members
  (add, pause with reason, penalty, status, remove), custom device state and its hint,
  user events with Unicode, PlayDTMF, MixMonitor, Redirect and Hangup on a live call,
  an Originate that fails, a module reload.
- **Load and edge cases**: 5,000 events in a burst with none lost and all in order (about
  5,100 to 6,400 a second; 221 under emulation), 3,000 writes sent at once followed by one
  335 KB command output, 500 actions in flight at once, ten clients at once.
- **A client that stops reading**: a second process, receiving every event like a real
  listener, holds its event loop for 2 s during the burst. Run twice: once as a manager
  user with `writetimeout = 5000` (must lose nothing), once with Asterisk's default of
  100 ms (to record what Asterisk does).
- **Asterisk restart**: an action in flight is rejected (not left hanging), the client logs
  in again within a second, and a filter set at start is in force again afterwards.
- **Types against reality**: every event seen has a type, and every header seen is listed
  by its type.

## Skipped checks

Actions the server did not offer in that configuration: `MWIGet`, `IAXpeerlist` (module
not loaded), `SIPpeers` and `SIPshowregistry` (chan_sip is gone from 20 on), `DBGetTree`,
`PJSIPShowMaintenance` and `CoreShowChannelMap` (not in 18), `Agents` (app_agent_pool not
loaded in the 22 image).

## A client that stops reading for 2 s

| Asterisk | `writetimeout = 5000` | Default `writetimeout` (100 ms) |
|---|---|---|
| 18.10.0 | 5,000 of 5,000, connected | 4,999 of 5,000, connection kept |
| 20.21.0 | 5,000 of 5,000, connected | 2,627 of 5,000, **Asterisk closed the connection** |
| 22.12.0 | 5,000 of 5,000, connected | 3,907 of 5,000, **Asterisk closed the connection** |
| 23.5.0 | 5,000 of 5,000, connected | 2,409 of 5,000, **Asterisk closed the connection** |

Asterisk logged no warning in any case, only an ordinary "logged off" line. How much is
lost depends on how many bytes pile up while the client is frozen; Asterisk 18 under
emulation produced the burst far more slowly, so little piled up.

## What the run found

1. **The `CEL` event carries a `Channel` header that Asterisk's documentation does not
   list.** Seen on all four versions. Added through `catalog/observed-fields.json`; the type
   now has it.
2. **After a restart, Asterisk accepts manager logins before its dialplan and modules have
   loaded.** Calls placed in that gap can fail. Asterisk sends `FullyBooted` when it is
   ready, also at login when it already is. The README now says so.
3. **With the default `writetimeout`, a client that falls behind loses events and is often
   disconnected, with nothing reported** (table above). AMI has no sequence numbers, so no
   client can tell which events are missing. The README, the API reference and the design
   notes now say to keep handlers quick and to raise `writetimeout` for connections that
   must not miss events.

Mistakes found in the new test itself while writing it (calls placed so that the
event under test could not happen) are not listed.

## Not covered

PJSIP or SIP phones and trunks (no registrations, no RTP), TLS to the manager port,
Asterisk 24, and long-running soak.
