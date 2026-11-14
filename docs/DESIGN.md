# Design

This library was designed after reading the source of the AMI clients people use today, in
six languages, and Asterisk's own `main/manager.c`. This file records what was learned and
the decision each finding led to.

The other libraries were read on 2026-11-14 from their default branches. Nothing below is
meant as criticism of them; most are old, widely used and have served people well. The
point is to not repeat problems their issue trackers already document.

## What was read

| Language | Libraries |
|---|---|
| Node.js | asterisk-manager, asterisk-ami-client (and its three parts), yana, ami-io, nami, asterisk-ami, asterisk.io, cfware/ami, and four smaller TypeScript packages |
| Python | panoramisk, pyst2, python-ami (`asterisk-ami`), pyami-asterisk |
| PHP | PAMI |
| Go | heltonmarx/goami, ivahaev/amigo, staskobzar/goami2 |
| Ruby | ruby_ami |
| Java | asterisk-java |
| .NET | AsterNET |
| C | Asterisk `main/manager.c`, `doc/appdocsxml.xslt`, and every documentation block in the source of versions 20, 22, 23 and 24 |

## Findings and decisions

### Reading the stream

| Seen in the wild | Decision |
|---|---|
| A repeated header (`Output`, `Variable`, `ChanVariable`) overwrites the earlier one, so command output and variables are lost. Reported against at least seven libraries. | Headers are an ordered list of pairs. `get` returns the first value, `getAll` returns all. |
| A header is a string when it appears once and an array when it repeats, so code breaks depending on the data. | `get` is always `string | undefined`; `getAll` is always an array. Only `toObject()`, meant for logging, mixes the two. |
| Each TCP chunk is decoded on its own, or as ASCII, so a multi-byte character cut by a chunk boundary is corrupted. | The parser works on bytes and decodes one complete line at a time. |
| The greeting, or the login answer, is assumed to arrive in exactly one read. | The parser is fully incremental. A test feeds every message one byte at a time. |
| `split(': ', 2)` cuts a value at its second colon. | Only the first colon ends the name. |
| A line without a colon throws, or is dropped silently. | It is kept in `message.body`. |
| Header names are matched with a strict grammar that rejects digits, brackets or lower case. | Any text before the first colon is a name. Lookups ignore case, as Asterisk does. |
| An error in the read loop ends the listener for good. | A parse error drops the connection and reconnects with a fresh parser. Nothing thrown by a handler reaches the reader. |
| No library limits the size of a message. | 8 MiB by default. Larger is a protocol error. |
| Command output of Asterisk 13 and earlier (`Response: Follows`, raw text, `--END COMMAND--`) is mishandled when the output has blank lines or colons. | Header lines end in CRLF and output lines in a bare LF; the parser uses that to tell them apart. `message.output` gives the lines in both formats. |

### Actions

| Seen in the wild | Decision |
|---|---|
| Answers are handed out in arrival order, with no ActionID, so an event or another answer is taken for the reply. | Every action gets an ActionID; answers are matched by it only. |
| ActionIDs from the clock or a random number collide. | A random prefix per client plus a counter. |
| No timeout, so a lost answer leaks a listener for ever. | Every action has a timeout and is forgotten when it fires. A late answer is emitted as `unmatched`. |
| Waiting actions hang after a disconnect. | They are rejected the moment the connection closes. |
| A list reply is guessed from the words in `Message` ("follow"), which broke every `Command` on Asterisk 14 and hung `QueueAdd`. | Only `EventList: start` makes a reply a list, and `EventList: Complete` ends it. The caller can name the ending event for the few actions without the marker. |
| `Response: Error` resolves like a success. | It rejects with `AmiActionError`, which carries the response. |
| Timed-out actions are re-sent, which can place a call twice. | Nothing is ever re-sent or queued by the library. |
| A value with a line break can inject a second action. | The encoder refuses CR and LF in names and values, and lines longer than Asterisk reads. |
| Some events (`OriginateResponse`) carry both `Event` and `Response`. | A message with an `Event` header is always an event. Found by this project's own tests. |

### Connection

| Seen in the wild | Decision |
|---|---|
| A ping is sent but its answer is never checked, so a dead link is not noticed. | The ping has its own deadline. A miss drops the link. It is sent only after silence, so a busy link is not pinged. |
| One timeout serves both "idle read" and "action answer", so a quiet server kills the connection. | Separate settings. |
| Reconnect at a fixed interval, or recursion that deepens on every attempt. | Exponential waits with random spread, driven by timers. |
| Endless reconnect on a wrong password. | An auth failure stops the client unless told otherwise. |
| Login errors swallowed; or a closed socket surfaces as an unhandled `error` that crashes the process. | Errors are always emitted and never thrown. The emitter is the library's own, so an `error` with no listener is harmless. |
| `disconnect` emitted twice; `removeAllListeners()` on close. | A generation counter makes each socket's callbacks single-use. Listeners belong to the caller and are never removed. |

### Events

| Seen in the wild | Decision |
|---|---|
| A task or thread per event loses ordering. | Handlers are called in arrival order. For slow work there is an ordered async stream. |
| A full queue blocks the reader, or drops events silently. | The stream has a limit and ends with an error when passed. |
| Unknown events are dropped, or crash a typed mapper. | Typing is a compile-time layer over a generic message. Any event passes through. |
| Typed classes written by hand fall behind Asterisk. | Types are generated from Asterisk's source for each supported version. |
| Values are converted to numbers, so `Status: -1` or a phone number is damaged. | Values stay strings. |

### Filters

| Seen in the wild | Decision |
|---|---|
| A filter added with the `Filter` action is forgotten when the connection drops, and no library reviewed adds it again. | Filters are part of the client's settings and are sent again after every login. |
| Events arrive between the login and the first filter. | With filters, the login asks for no events; they are turned on after the filters are in place. Checked on a real Asterisk: `FullyBooted`, which follows a normal login at once, does not arrive. |
| A filter text of `Event: Hangup` also matches `HangupRequest`, and any header that contains that text. | The object form anchors the name to the start of the event and ends it at the line break. |

## What comes from Asterisk itself

From `main/manager.c` (line numbers move between versions, so functions are named):

- The greeting is one line with no blank line after it (`session_do`).
- Lines end in CRLF; a bare LF is accepted on input (`get_input`).
- A line is read into a 1025-byte buffer and a message holds at most 128 headers. The encoder enforces both.
- Header names are compared without case (`__astman_get_header`).
- A failed login is answered after a one-second pause and then the socket is closed.
- `EventList: start` on the response, `EventList: Complete` and `ListItems` on the last event (`astman_send_listack`, `astman_send_list_complete_start`).
- Asterisk drops a client that does not read for `writetimeout` (100 ms by default). Node keeps reading while handlers run asynchronously, so this is met as long as handlers do not block the event loop.

## Not done

- No pool of connections and no built-in action queue.
- No AMI over HTTP.
- Events removed before Asterisk 20 are not typed.
- Responses are not typed per action; Asterisk's documentation does not describe them well enough to generate from.
