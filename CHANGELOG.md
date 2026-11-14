# Changelog

## 0.1.0 (unreleased)

First version.

- `AmiClient`: login (plain or MD5 challenge), TLS, reconnect with growing waits, keep-alive with a deadline, actions matched by ActionID with timeouts, list replies, console commands.
- `AmiParser`: incremental, byte-safe, size-limited; reads both command output formats.
- Typed events (245) and actions (171) for Asterisk 20, 22, 23 and 24, generated from the Asterisk source.
- Ordered event delivery, by listener or by async stream.
