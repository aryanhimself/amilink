# Contributing

Thank you for helping. Bug reports with a way to reproduce them are the most useful thing you can send.

## Setup

```bash
npm install
npm run typecheck
npm test
npm run build
```

Node.js 18 or later.

## Reporting a bug

Please include:

- the Asterisk version (`asterisk -rx "core show version"`) and the AMI version from the greeting,
- the amilink version and the Node.js version,
- the raw AMI text of the message involved, if you can capture it. Remove secrets and phone numbers first.

A failing test is the best report. The tests in `test/client.test.ts` use a small fake AMI server (`test/support/fake-ami.ts`) that can send any bytes you need.

## Changing code

- Every behaviour change needs a test.
- `src/generated/` is generated. Do not edit it by hand; change `scripts/generate-types.mjs` or the catalogue.
- The library has no runtime dependencies. Please keep it that way.
- Values from Asterisk stay strings. The library does not convert them.
- Nothing may throw out of the read loop, and the library never re-sends an action.

Before opening a pull request, run `npm run typecheck && npm test && npm run build`.

## Updating the catalogue for a new Asterisk version

You need a clone of the Asterisk source. Nothing is compiled.

```bash
git clone https://github.com/asterisk/asterisk ../asterisk

node scripts/collect-catalog.mjs --repo ../asterisk \
  --ref origin/20=20 --ref origin/22=22 --ref origin/23=23 --ref origin/master=24

node scripts/collect-undocumented.mjs --repo ../asterisk \
  --ref origin/20=20 --ref origin/22=22 --ref origin/23=23 --ref origin/master=24

npm run generate
npm run typecheck && npm test
```

List the versions oldest first; the last one is treated as the newest. Commit the changed `catalog/` and `src/generated/` files together.

Only names, required flags, listed values and event classes are taken from Asterisk. Do not copy the text of its documentation into this repository: it is under a different licence.

## Checking against a real Asterisk

The full check runs Asterisk 18, 20, 22 and 23 in Docker with the configuration in
`lab/asterisk` and writes results to `lab/results/` (not committed):

```bash
npm run build
lab/run.sh
IMAGES="andrius/asterisk:23" lab/run.sh     # one version
```

`scripts/live-conformance.mjs` changes the server and restarts it: use it only on the lab.
When it reports a header that an event's type does not list, add it to
`catalog/observed-fields.json` with the versions it was seen on, run `npm run generate`,
and commit both. Update `lab/RESULTS.md` after a full run.

Against a server of your own, `scripts/live-check.mjs` is read-only apart from one short call:

```bash
npm run build
AMI_HOST=127.0.0.1 AMI_PORT=5038 AMI_USERNAME=... AMI_SECRET=... node scripts/live-check.mjs
```

The manager user needs read and write `all`. The script places one short `Local` channel call to a context named `amilink-live` with an extension `amilink`:

```ini
[amilink-live]
exten => amilink,1,Answer()
 same => n,Wait(1)
 same => n,Hangup()
```

If you run it on a version the README lists as not yet checked, please say so in your pull request.

## Licence

By contributing you agree that your work is released under the MIT licence of this project.
