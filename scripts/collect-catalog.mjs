#!/usr/bin/env node
// Collects every AMI event and action that Asterisk documents in its own
// source, for one or more versions, and writes them to catalog/*.json.
//
// Asterisk describes each event and action in XML: in `*.xml` files and in
// `/*** DOCUMENTATION ... ***/` comments inside the C files. This script reads
// that XML straight from a git clone of https://github.com/asterisk/asterisk,
// so nothing has to be compiled.
//
//   node scripts/collect-catalog.mjs --repo ../asterisk --ref origin/20=20 --ref origin/22=22
//
// Only names, required flags, listed values and the event class are kept. The
// prose of Asterisk's documentation is not copied.

import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { XMLParser } from 'fast-xml-parser';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
let repo = '';
const refs = [];
for (let i = 0; i < args.length; i += 1) {
  if (args[i] === '--repo') repo = args[++i];
  else if (args[i] === '--ref') {
    const [ref, label] = args[++i].split('=');
    refs.push({ ref, label: label ?? ref });
  }
}
if (!repo || refs.length === 0) {
  console.error('usage: collect-catalog.mjs --repo <asterisk clone> --ref <git ref>=<label> [--ref ...]');
  process.exit(2);
}

const git = (...gitArgs) =>
  execFileSync('git', ['-C', repo, ...gitArgs], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  preserveOrder: true,
  allowBooleanAttributes: true,
  processEntities: false,
  trimValues: true,
});

// ---- helpers over fast-xml-parser's ordered output --------------------------

const tagOf = (node) => Object.keys(node).find((key) => key !== ':@' && key !== '#text');
const attrsOf = (node) => node[':@'] ?? {};
const childrenOf = (node) => {
  const tag = tagOf(node);
  return tag && Array.isArray(node[tag]) ? node[tag] : [];
};
const elements = (nodes, tag) => nodes.filter((node) => tagOf(node) === tag);

function walk(nodes, visit) {
  for (const node of nodes) {
    const tag = tagOf(node);
    if (!tag) continue;
    visit(node, tag);
    walk(childrenOf(node), visit);
  }
}

// The two shared field groups, as doc/appdocsxml.xslt expands them.
const CHANNEL_STATES = [
  'Down', 'Rsrvd', 'OffHook', 'Dialing', 'Ring', 'Ringing', 'Up', 'Busy', 'Dialing Offhook', 'Pre-ring', 'Unknown',
];
const CHANNEL_SNAPSHOT = [
  'Channel', 'ChannelState', 'ChannelStateDesc', 'CallerIDNum', 'CallerIDName', 'ConnectedLineNum',
  'ConnectedLineName', 'Language', 'AccountCode', 'Context', 'Exten', 'Priority', 'Uniqueid', 'Linkedid',
];
const BRIDGE_SNAPSHOT = [
  'BridgeUniqueid', 'BridgeType', 'BridgeTechnology', 'BridgeCreator', 'BridgeName', 'BridgeNumChannels',
  'BridgeVideoSourceMode', 'BridgeVideoSource',
];

// ---- reading one version ------------------------------------------------------

function documentationOf(ref) {
  const docs = [];
  const cFiles = git('grep', '-l', '-e', '/\\*\\*\\* DOCUMENTATION', ref, '--', '*.c', '*.h', '*.cc')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(ref.length + 1));
  for (const file of cFiles) {
    const text = git('show', `${ref}:${file}`);
    for (const match of text.matchAll(/\/\*\*\* DOCUMENTATION([\s\S]*?)\*\*\*\//g)) {
      docs.push({ file, xml: `<docs>${match[1]}</docs>` });
    }
  }
  const xmlFiles = git('grep', '-l', '-e', '<managerEvent', '-e', '<manager ', ref, '--', '*.xml')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(ref.length + 1));
  for (const file of xmlFiles) docs.push({ file, xml: git('show', `${ref}:${file}`) });
  return docs;
}

function collect(ref) {
  const top = []; // every element directly under a <docs> root, across all files
  for (const { file, xml } of documentationOf(ref)) {
    let parsed;
    try {
      parsed = parser.parse(xml);
    } catch (error) {
      console.error(`  cannot parse ${file}: ${error.message}`);
      continue;
    }
    for (const rootNode of elements(parsed, 'docs')) {
      for (const node of childrenOf(rootNode)) {
        if (tagOf(node)) top.push({ node, file });
      }
    }
  }

  const unresolved = new Set();

  // A tiny XPath: /docs/tag[@name='x']/tag/... with optional `or` in a predicate.
  function resolve(xpointer) {
    const path = /xpointer\((.*)\)\s*$/.exec(xpointer)?.[1];
    const inner = path?.replace(/^\//, '');
    if (!inner || !inner.startsWith('docs/')) return undefined;
    const segments = inner.slice('docs/'.length).match(/[^/[\]]+(\[[^\]]*\])*/g) ?? [];
    let current = top.map((entry) => entry.node);
    for (const [index, segment] of segments.entries()) {
      const tag = /^[^[]+/.exec(segment)[0];
      const predicates = [...segment.matchAll(/\[([^\]]*)\]/g)].map((m) => m[1]);
      const pool = index === 0 ? current : current.flatMap((node) => childrenOf(node));
      current = elements(pool, tag).filter((node) =>
        predicates.every((predicate) => {
          const tests = [...predicate.matchAll(/@([\w-]+)\s*=\s*'([^']*)'/g)];
          if (tests.length === 0) return true;
          return tests.some(([, attr, value]) => attrsOf(node)[attr] === value);
        }),
      );
    }
    return current;
  }

  function enumsOf(parameter) {
    const values = [];
    for (const list of elements(childrenOf(parameter), 'enumlist')) {
      for (const item of elements(childrenOf(list), 'enum')) {
        const name = attrsOf(item).name;
        if (typeof name === 'string' && name !== '') values.push(name);
      }
    }
    return values;
  }

  function expand(nodes, depth = 0) {
    const fields = [];
    if (depth > 6) return fields;
    for (const node of nodes) {
      const tag = tagOf(node);
      const attrs = attrsOf(node);
      if (tag === 'parameter') {
        if (typeof attrs.name !== 'string' || attrs.name === '') continue;
        const required = attrs.required === 'true' || attrs.required === 'yes';
        const values = enumsOf(node);
        fields.push({ name: attrs.name, ...(required ? { required } : {}), ...(values.length ? { values } : {}) });
      } else if (tag === 'channel_snapshot') {
        const prefix = attrs.prefix ?? '';
        for (const name of CHANNEL_SNAPSHOT) {
          fields.push({
            name: prefix + name,
            ...(name === 'ChannelStateDesc' ? { values: CHANNEL_STATES } : {}),
          });
        }
      } else if (tag === 'bridge_snapshot') {
        const prefix = attrs.prefix ?? '';
        for (const name of BRIDGE_SNAPSHOT) fields.push({ name: prefix + name });
      } else if (tag === 'xi:include') {
        const target = resolve(attrs.xpointer ?? '');
        if (!target || target.length === 0) unresolved.add(attrs.xpointer);
        else fields.push(...expand(target, depth + 1));
      }
    }
    return fields;
  }

  function merge(into, fields) {
    for (const field of fields) {
      const existing = into.find((item) => item.name.toLowerCase() === field.name.toLowerCase());
      if (!existing) {
        into.push({ ...field });
        continue;
      }
      if (field.required) existing.required = true;
      if (field.values) existing.values = [...new Set([...(existing.values ?? []), ...field.values])];
    }
  }

  const events = {};
  const actions = {};
  walk(
    top.map((entry) => entry.node),
    (node, tag) => {
      const name = attrsOf(node).name;
      if (typeof name !== 'string' || name === '') return;
      if (tag === 'managerEvent') {
        const event = (events[name] ??= { classes: [], fields: [] });
        for (const instance of elements(childrenOf(node), 'managerEventInstance')) {
          const cls = attrsOf(instance).class;
          if (cls && !event.classes.includes(cls)) event.classes.push(cls);
          for (const syntax of elements(childrenOf(instance), 'syntax')) {
            merge(event.fields, expand(childrenOf(syntax)));
          }
        }
      } else if (tag === 'manager') {
        const action = (actions[name] ??= { params: [] });
        const module = attrsOf(node).module;
        if (module) action.module = module;
        for (const syntax of elements(childrenOf(node), 'syntax')) {
          merge(action.params, expand(childrenOf(syntax)));
        }
      }
    },
  );

  const sorted = (object) => Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));
  return { events: sorted(events), actions: sorted(actions), unresolved: [...unresolved] };
}

// ---- main ---------------------------------------------------------------------

mkdirSync(join(root, 'catalog'), { recursive: true });
const merged = { versions: [], events: {}, actions: {} };

for (const { ref, label } of refs) {
  const amiVersion = /AMI_VERSION\s+"([^"]+)"/.exec(git('show', `${ref}:include/asterisk/manager.h`))?.[1];
  const commit = git('rev-parse', ref).trim();
  const { events, actions, unresolved } = collect(ref);
  console.log(
    `Asterisk ${label} (AMI ${amiVersion}): ${Object.keys(events).length} events, ` +
      `${Object.keys(actions).length} actions, ${unresolved.length} unresolved includes`,
  );
  for (const pointer of unresolved) console.log(`  unresolved: ${pointer}`);
  writeFileSync(
    join(root, 'catalog', `asterisk-${label}.json`),
    JSON.stringify({ asterisk: label, amiVersion, commit, events, actions }, null, 2) + '\n',
  );

  merged.versions.push({ asterisk: label, amiVersion, commit });
  for (const [kind, key] of [['events', 'fields'], ['actions', 'params']]) {
    const source = kind === 'events' ? events : actions;
    for (const [name, entry] of Object.entries(source)) {
      const target = (merged[kind][name] ??= { versions: [], ...(kind === 'events' ? { classes: [] } : {}), [key]: [] });
      target.versions.push(label);
      if (kind === 'events') {
        for (const cls of entry.classes) if (!target.classes.includes(cls)) target.classes.push(cls);
      }
      for (const field of entry[key]) {
        const existing = target[key].find((item) => item.name.toLowerCase() === field.name.toLowerCase());
        if (!existing) {
          target[key].push({ ...field, versions: [label] });
          continue;
        }
        existing.versions.push(label);
        if (field.required) existing.required = true;
        if (field.values) existing.values = [...new Set([...(existing.values ?? []), ...field.values])];
      }
    }
  }
}

const sortKeys = (object) => Object.fromEntries(Object.entries(object).sort(([a], [b]) => a.localeCompare(b)));
merged.events = sortKeys(merged.events);
merged.actions = sortKeys(merged.actions);
writeFileSync(join(root, 'catalog', 'catalog.json'), JSON.stringify(merged, null, 2) + '\n');
console.log(
  `catalog.json: ${Object.keys(merged.events).length} events, ${Object.keys(merged.actions).length} actions ` +
    `across ${merged.versions.length} versions`,
);
