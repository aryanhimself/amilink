#!/usr/bin/env node
// Finds AMI events that Asterisk sends but does not document.
//
// The XML documentation misses a number of real events, mostly the items and
// the "...Complete" terminators of list actions. This script scans the C source
// for the calls that emit an event and reports every event name that
// catalog/catalog.json does not already have, with the header names it can
// read from the format strings next to the call.
//
// The result is a best effort: header names built at run time are not seen.
//
//   node scripts/collect-undocumented.mjs --repo ../asterisk --ref origin/20=20 --ref origin/23=23

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

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
  console.error('usage: collect-undocumented.mjs --repo <asterisk clone> --ref <git ref>=<label> [--ref ...]');
  process.exit(2);
}

const git = (...gitArgs) =>
  execFileSync('git', ['-C', repo, ...gitArgs], { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });

const catalog = JSON.parse(readFileSync(join(root, 'catalog', 'catalog.json'), 'utf8'));
const documented = new Set(Object.keys(catalog.events).map((name) => name.toLowerCase()));

// Calls that name the event as a string literal. Group 1 is the event name.
const EMITTERS = [
  /\bmanager_event\s*\(\s*[A-Z_|\s]+,\s*"(\w+)"/g,
  /\bast_manager_event(?:_multichan)?\s*\(\s*[^,;"]+,\s*[A-Z_|\s]+,\s*"(\w+)"/g,
  /\bast_manager_event_blob_create\s*\(\s*[A-Z_|\s]+,\s*"(\w+)"/g,
  /\bast_manager_publish_event\s*\(\s*"(\w+)"/g,
  /\bast_sip_create_ami_event\s*\(\s*"(\w+)"/g,
  /\bastman_send_list_complete_start\s*\(\s*[^,;"]+,\s*[^,;"]+,\s*"(\w+)"/g,
  /\bastman_append\s*\(\s*[^,;"]+,\s*"Event:\s*(\w+)\\r\\n/g,
  /"Event:\s*(\w+)\\r\\n/g,
];

/** Header names found in the string literals of the statement that starts at `from`. */
function headersNear(text, from, eventName) {
  const end = text.indexOf(';', from);
  const statement = text.slice(from, end === -1 ? from + 2000 : Math.min(end, from + 4000));
  const literal = [...statement.matchAll(/"((?:[^"\\]|\\.)*)"/g)]
    .map((m) => m[1])
    // The event name is its own literal in most calls; joined to the next one
    // it would glue itself onto the first header name.
    .filter((piece) => piece !== eventName)
    .join('');
  const names = [];
  for (const piece of literal.split(/\\r\\n|\\n/)) {
    const match = /^([A-Za-z][\w-]*(?:\([^)%]*\))?):/.exec(piece.trim());
    if (match && match[1].toLowerCase() !== 'event' && !names.includes(match[1])) names.push(match[1]);
  }
  return names;
}

const found = {};
for (const { ref, label } of refs) {
  const files = git('grep', '-l', '-E', '-e', 'manager_event|astman_|ast_sip_create_ami_event|Event: ', ref, '--', '*.c')
    .split('\n')
    .filter(Boolean)
    .map((line) => line.slice(ref.length + 1))
    .filter((file) => !file.startsWith('tests/') && file !== 'main/test.c');
  for (const file of files) {
    const text = git('show', `${ref}:${file}`);
    for (const pattern of EMITTERS) {
      for (const match of text.matchAll(pattern)) {
        const name = match[1];
        if (documented.has(name.toLowerCase())) continue;
        const entry = (found[name] ??= { versions: [], files: [], fields: [], listComplete: false });
        if (!entry.versions.includes(label)) entry.versions.push(label);
        if (!entry.files.includes(file)) entry.files.push(file);
        if (pattern.source.includes('list_complete_start')) entry.listComplete = true;
        for (const header of headersNear(text, match.index, name)) {
          if (!entry.fields.some((field) => field.toLowerCase() === header.toLowerCase())) entry.fields.push(header);
        }
      }
    }
  }
}

const sorted = Object.fromEntries(Object.entries(found).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(join(root, 'catalog', 'undocumented-events.json'), JSON.stringify(sorted, null, 2) + '\n');
console.log(`${Object.keys(sorted).length} undocumented events written to catalog/undocumented-events.json`);
for (const [name, entry] of Object.entries(sorted)) {
  console.log(`  ${name} [${entry.versions.join(',')}] ${entry.files[0]} :: ${entry.fields.join(', ')}`);
}
