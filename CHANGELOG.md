# Changelog

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
