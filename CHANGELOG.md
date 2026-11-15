# Changelog

## 0.2.1 (2026-11-15)

- **Tested against real Asterisk 18, 20, 22 and 23.** A new script, `scripts/live-conformance.mjs`, and a Docker lab, `lab/run.sh`, place real calls, run every read-only action the server offers, do round trips that change state, send 5,000-event bursts and restart Asterisk under the client. Results: `lab/RESULTS.md`.
- Generated types: the `CEL` event now has `Channel`. Asterisk sends it on every version tested, but its documentation does not list it. Such headers are now kept in `catalog/observed-fields.json` and merged by the generator.
- Documented two Asterisk behaviours the lab showed: after a restart Asterisk accepts logins before it is ready (wait for `FullyBooted`), and with the default `writetimeout` of 100 ms it drops events to a client that stops reading, and closes the connection when the client is far behind, without reporting either.

## 0.2.0 (2026-11-14)

- **Filters on the Asterisk side.** The new `filters` option and `addFilter()` have Asterisk send only matching events, by event name, by header value, or by a regular expression of your own. They are applied again after every reconnect. With filters, the client logs in with events off, adds the filters, then turns events on, so no unfiltered event arrives in between.
- `filterSpec()` is exported for anyone who wants the filter text itself.
- Generated types: the value `InUse&Ringing` (and `InUse&Hold`) was written with an escaped `&amp;` and never matched; fixed. Placeholder text from Asterisk's documentation is no longer offered as a value (`Events.EventMask`, `Filter.MatchCriteria`).
- Tests no longer depend on fixed delays.

## 0.1.0 (2026-11-14)

First version.

- `AmiClient`: login (plain or MD5 challenge), TLS, reconnect with growing waits, keep-alive with a deadline, actions matched by ActionID with timeouts, list replies, console commands.
- `AmiParser`: incremental, byte-safe, size-limited; reads both command output formats.
- Typed events (245) and actions (171) for Asterisk 20, 22, 23 and 24, generated from the Asterisk source.
- Ordered event delivery, by listener or by async stream.
