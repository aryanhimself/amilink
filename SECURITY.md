# Security

## Reporting a problem

Please do not open a public issue for a security problem. Use GitHub's private reporting on this repository: the **Security** tab, then **Report a vulnerability**. You should get an answer within a week.

## Using AMI safely

AMI gives wide control over an Asterisk server. A user with `write = all` can place calls, run console commands and change configuration.

- Do not expose port 5038 to the internet. Keep it on a private network or tunnel, and set `permit` / `deny` for each user in `manager.conf`.
- Give each program its own manager user with only the read and write classes it needs.
- On a network you do not fully trust, use TLS (`tls: true`, port 5039). Without TLS, `authType: 'md5'` keeps the secret off the wire, but everything else is still readable.
- Keep the secret out of source code. Read it from the environment or a secret store.

## What the library does

- It refuses a line break in any header name or value, so text from a user cannot add headers or a second action to what you send.
- It refuses lines longer than Asterisk reads and messages with more headers than Asterisk accepts.
- It limits the size of a message it will read, 8 MiB by default.
- It never logs. Errors carry the server's message, never the secret.

Values you receive in events come from the network and from callers (a caller name, a dialled number, a variable). Treat them as untrusted input in your own code.
