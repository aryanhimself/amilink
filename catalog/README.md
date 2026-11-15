# Catalogue

The data the types in `src/generated/` are built from. These files are generated; see [CONTRIBUTING.md](../CONTRIBUTING.md) for how.

| File | Contents |
|---|---|
| `asterisk-<version>.json` | Every event and action one Asterisk version documents, with the AMI version and the source commit it was read from. |
| `catalog.json` | All versions merged. Each event, action and field lists the versions it appears in. |
| `observed-fields.json` | Headers seen on a real Asterisk that its documentation does not list for that event, with the versions they were seen on. Written by hand from the reports of `scripts/live-conformance.mjs`. |
| `undocumented-events.json` | Events found in Asterisk's C source that its documentation does not describe, with the file they came from. The field lists are a best effort. |

Shape of one event in `catalog.json`:

```json
"QueueMemberPause": {
  "versions": ["20", "22", "23", "24"],
  "classes": ["EVENT_FLAG_AGENT"],
  "fields": [
    { "name": "Queue", "versions": ["20", "22", "23", "24"] },
    { "name": "Paused", "values": ["0", "1"], "versions": ["20", "22", "23", "24"] }
  ]
}
```

Actions have `params` in place of `fields`, and a parameter may carry `"required": true`.

Only names, required flags, listed values and event classes are recorded. The text of Asterisk's documentation is not copied.

These files are not part of the published npm package.
