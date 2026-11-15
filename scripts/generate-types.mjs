#!/usr/bin/env node
// Writes src/generated/events.ts and src/generated/actions.ts from the
// catalogue in catalog/. Run `npm run catalog` first when Asterisk changes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const catalog = JSON.parse(readFileSync(join(root, 'catalog', 'catalog.json'), 'utf8'));
const undocumented = JSON.parse(readFileSync(join(root, 'catalog', 'undocumented-events.json'), 'utf8'));
// Headers real Asterisk sends that its documentation leaves out (found by scripts/live-conformance.mjs).
const observed = JSON.parse(readFileSync(join(root, 'catalog', 'observed-fields.json'), 'utf8')).events;

const allVersions = catalog.versions.map((version) => version.asterisk);
const latest = allVersions[allVersions.length - 1];

// Sent inside Asterisk only, or by its test suite; never seen by a client.
const NOT_CLIENT_EVENTS = new Set(['CloseSession', 'FakeMI', 'TestEvent']);
// Present on every event, depending on the server's settings.
const COMMON_EVENT_FIELDS = new Set(['event', 'privilege', 'timestamp', 'systemname', 'actionid']);

const HEADER = `// GENERATED FILE. Do not edit by hand.
// Source: catalog/*.json, collected from the Asterisk source by scripts/collect-catalog.mjs.
// Asterisk versions covered: ${catalog.versions.map((v) => `${v.asterisk} (AMI ${v.amiVersion})`).join(', ')}.
/* eslint-disable */
`;

const isIdentifier = (name) => /^[A-Za-z_$][\w$]*$/.test(name);
const quote = (text) => `'${text.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const typeName = (name) => name.replace(/[^A-Za-z0-9_]/g, '_');

/** `Var-000000` and `UnitAmount(0)` stand for a numbered family of headers. */
function familyPattern(name) {
  let match = /^(.*)-0{2,}$/.exec(name);
  if (match) return `\`${match[1]}-\${string}\``;
  match = /^(.*)\((\d+)\)$/.exec(name);
  if (match) return `\`${match[1]}(\${number})\``;
  return undefined;
}

function versionNote(versions) {
  if (versions.length === allVersions.length) return undefined;
  if (versions.length === 1) return `Asterisk ${versions[0]} only.`;
  const first = allVersions.indexOf(versions[0]);
  const contiguous = versions.every((version, index) => version === allVersions[first + index]);
  if (contiguous && versions[versions.length - 1] === latest) return `Asterisk ${versions[0]} and later.`;
  if (contiguous && first === 0) return `Asterisk ${versions[versions.length - 1]} and earlier.`;
  return `Asterisk ${versions.join(', ')}.`;
}

function docUrl(kind, name, versions) {
  const section = kind === 'event' ? 'AMI_Events' : 'AMI_Actions';
  const book = versions.includes(latest) ? 'Latest_API' : `Asterisk_${versions[versions.length - 1]}_Documentation`;
  return `https://docs.asterisk.org/${book}/API_Documentation/${section}/${name}/`;
}

/**
 * Asterisk's documentation sometimes lists a description where a value should
 * be: `<event_name>`, `system,call,log,...`, `action(include|exclude)`. Those
 * are not values anyone can send or receive, so they are left out.
 */
function realValues(values) {
  return (values ?? [])
    .map((value) =>
      value
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&'),
    )
    .filter((value) => !/[<>|]|\.\.\./.test(value));
}

function literalUnion(values, tail) {
  const literals = [...new Set(values)].map(quote);
  return [...literals, ...tail].join(' | ');
}

// ---- events ---------------------------------------------------------------------

function eventsFile() {
  const out = [HEADER];
  out.push(`/** Headers Asterisk may add to any event, depending on its settings. */
export interface AmiEventCommonFields {
  /** The manager classes the event belongs to, for example \`call,all\`. */
  readonly Privilege?: string;
  /** Seconds since 1970 with microseconds. Sent when \`timestampevents=yes\` in manager.conf. */
  readonly Timestamp?: string;
  /** Sent when a system name is set in asterisk.conf. */
  readonly SystemName?: string;
  /** Present when the event was caused by an action this client sent. */
  readonly ActionID?: string;
}
`);

  const names = [];
  const classes = {};

  const emit = (name, fields, doc, extra = []) => {
    const lines = [`/**`, ...doc.map((line) => ` * ${line}`), ` */`];
    lines.push(`export interface ${typeName(name)}EventFields extends AmiEventCommonFields {`);
    lines.push(`  readonly Event: ${quote(name)};`);
    const patterns = [];
    const seen = new Set();
    for (const field of fields) {
      const key = field.name.toLowerCase();
      if (COMMON_EVENT_FIELDS.has(key) || seen.has(key)) continue;
      seen.add(key);
      const pattern = familyPattern(field.name);
      if (pattern) {
        patterns.push(pattern);
        continue;
      }
      const note = field.observed
        ? `Sent by Asterisk although its documentation does not list it (seen on ${field.observed.join(', ')}).`
        : field.versions ? versionNote(field.versions) : undefined;
      if (note) lines.push(`  /** ${note} */`);
      const values = realValues(field.values);
      const type = values.length ? literalUnion(values, ['(string & {})']) : 'string';
      lines.push(`  readonly ${isIdentifier(field.name) ? field.name : quote(field.name)}?: ${type};`);
    }
    for (const line of extra) lines.push(line);
    for (const pattern of [...new Set(patterns)]) lines.push(`  readonly [header: ${pattern}]: string | undefined;`);
    lines.push(`}`, '');
    out.push(lines.join('\n'));
    names.push(name);
  };

  for (const [name, event] of Object.entries(catalog.events)) {
    const note = versionNote(event.versions);
    const doc = [`The \`${name}\` event.`];
    if (note) doc.push(note);
    doc.push(`@see ${docUrl('event', name, event.versions)}`);
    if (!event.versions.includes(latest)) doc.push(`@deprecated Not sent by Asterisk ${latest}.`);
    const seenOnly = (observed[name] ?? []).map((field) => ({ name: field.name, observed: field.seenOn }));
    emit(name, [...event.fields, ...seenOnly], doc);
    classes[name] = event.classes.map((cls) => cls.replace(/^EVENT_FLAG_/, '').toLowerCase());
  }

  const documented = new Set(Object.keys(catalog.events).map((name) => name.toLowerCase()));
  for (const [name, event] of Object.entries(undocumented)) {
    if (NOT_CLIENT_EVENTS.has(name) || documented.has(name.toLowerCase())) continue;
    const note = versionNote(event.versions);
    const doc = [
      `The \`${name}\` event${event.listComplete ? ', which ends a list reply' : ''}.`,
      `Asterisk does not document this event. The fields were read from its source code (${event.files[0]}) and may be incomplete.`,
    ];
    if (note) doc.push(note);
    if (!event.versions.includes(latest)) doc.push(`@deprecated Not sent by Asterisk ${latest}.`);
    const extra = event.listComplete
      ? [`  readonly EventList?: 'Complete' | (string & {});`, `  /** How many items the list held. */`, `  readonly ListItems?: string;`]
      : [];
    const skip = new Set(['eventlist', 'listitems']);
    emit(
      name,
      event.fields.filter((field) => !skip.has(field.toLowerCase())).map((field) => ({ name: field })),
      doc,
      extra,
    );
    classes[name] = [];
  }

  names.sort((a, b) => a.localeCompare(b));
  out.push(`/** Every event this library knows, by name. */`);
  out.push(`export interface AmiEventMap {`);
  for (const name of names) out.push(`  ${isIdentifier(name) ? name : quote(name)}: ${typeName(name)}EventFields;`);
  out.push(`}`, '');
  out.push(`export type AmiEventName = keyof AmiEventMap;`, '');
  out.push(`export const AMI_EVENT_NAMES = [`);
  for (const name of names) out.push(`  ${quote(name)},`);
  out.push(`] as const satisfies readonly AmiEventName[];`, '');
  out.push(`/** The manager.conf read classes that deliver each event. Empty when Asterisk does not state one. */`);
  out.push(`export const AMI_EVENT_CLASSES: { readonly [N in AmiEventName]: readonly string[] } = {`);
  for (const name of names) {
    out.push(`  ${isIdentifier(name) ? name : quote(name)}: [${(classes[name] ?? []).map(quote).join(', ')}],`);
  }
  out.push(`};`, '');
  return { text: out.join('\n'), count: names.length };
}

// ---- actions --------------------------------------------------------------------

function actionsFile() {
  const out = [HEADER];
  out.push(`import type { HeaderValue } from '../encode';`, '');
  out.push(`/** A single header value. */`);
  out.push(`export type AmiScalar = string | number | boolean;`, '');

  const names = [];
  for (const [name, action] of Object.entries(catalog.actions)) {
    const note = versionNote(action.versions);
    const doc = [`Parameters of the \`${name}\` action.`];
    if (note) doc.push(note);
    doc.push(`@see ${docUrl('action', name, action.versions)}`);
    if (!action.versions.includes(latest)) doc.push(`@deprecated Not available in Asterisk ${latest}.`);
    const lines = [`/**`, ...doc.map((line) => ` * ${line}`), ` */`];
    lines.push(`export interface ${typeName(name)}ActionParams {`);
    lines.push(`  readonly Action: ${quote(name)};`);
    const patterns = [];
    const seen = new Set(['action', 'actionid']);
    for (const param of action.params) {
      const key = param.name.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      const pattern = familyPattern(param.name);
      if (pattern) {
        patterns.push(pattern);
        continue;
      }
      const paramNote = versionNote(param.versions);
      if (paramNote) lines.push(`  /** ${paramNote} */`);
      let type;
      if (key === 'variable') type = 'HeaderValue';
      else if (realValues(param.values).length) type = literalUnion(realValues(param.values), ['(string & {})', 'number', 'boolean']);
      else type = 'AmiScalar';
      const optional = param.required ? '' : '?';
      lines.push(`  readonly ${isIdentifier(param.name) ? param.name : quote(param.name)}${optional}: ${type};`);
    }
    for (const pattern of [...new Set(patterns)]) lines.push(`  readonly [header: ${pattern}]: AmiScalar | undefined;`);
    lines.push(`}`, '');
    out.push(lines.join('\n'));
    names.push(name);
  }

  names.sort((a, b) => a.localeCompare(b));
  out.push(`/** Every action this library knows, by name. */`);
  out.push(`export interface AmiActionMap {`);
  for (const name of names) out.push(`  ${isIdentifier(name) ? name : quote(name)}: ${typeName(name)}ActionParams;`);
  out.push(`}`, '');
  out.push(`export type AmiActionName = keyof AmiActionMap;`, '');
  out.push(`/** Any documented action, picked by its \`Action\` name. */`);
  out.push(`export type AmiTypedAction = AmiActionMap[AmiActionName];`, '');
  out.push(`export const AMI_ACTION_NAMES = [`);
  for (const name of names) out.push(`  ${quote(name)},`);
  out.push(`] as const satisfies readonly AmiActionName[];`, '');
  return { text: out.join('\n'), count: names.length };
}

mkdirSync(join(root, 'src', 'generated'), { recursive: true });
const events = eventsFile();
const actions = actionsFile();
writeFileSync(join(root, 'src', 'generated', 'events.ts'), events.text);
writeFileSync(join(root, 'src', 'generated', 'actions.ts'), actions.text);
console.log(`generated ${events.count} events and ${actions.count} actions`);
