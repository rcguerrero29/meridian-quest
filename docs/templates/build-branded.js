#!/usr/bin/env node
/* Regenerate docs/templates/branded/ from neutral/ + brand.yml.
 *
 * Why a generator instead of two hand-kept copies: the branded and neutral drafts
 * must never drift. The BODY of every template is identical by design — the brand
 * changes the letterhead, the front matter a renderer reads, and the footer. Edit
 * the neutral template or brand.yml, run this, and both stay true.
 *
 *   node docs/templates/build-branded.js
 *   node docs/templates/build-branded.js --check   (CI-safe: fails if out of date)
 */
const fs = require('fs'), path = require('path');
const DIR = __dirname, NEU = path.join(DIR, 'neutral'), BRA = path.join(DIR, 'branded');

/* brand.yml is a flat, hand-written file — a five-line reader beats a dependency */
/* strip a trailing comment, but never one inside quotes — hex colours start with # */
function stripComment(line) {
  let q = null;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === q) q = null; }
    else if (c === '"' || c === "'") q = c;
    else if (c === '#') return line.slice(0, i);
  }
  return line;
}
function readBrand(file) {
  const out = {}; let section = null;
  for (const raw of fs.readFileSync(file, 'utf8').split('\n')) {
    const line = stripComment(raw).trimEnd();
    if (!line.trim()) continue;
    const m = line.match(/^(\s*)([\w-]+):\s*(.*)$/);
    if (!m) continue;
    const [, indent, key, val] = m;
    const v = val.trim().replace(/^["']|["']$/g, '');
    if (!indent) { section = v ? null : key; if (v) out[key] = v; else out[key] = {}; }
    else if (section) out[section][key] = v;
  }
  return out;
}

const b = readBrand(path.join(DIR, 'brand.yml'));
const P = b.palette || {}, F = b.fonts || {}, V = b.voice || {};

function brandify(src, name) {
  const title = (src.match(/^#\s+(.+)$/m) || [, name])[1];
  const front = [
    '---',
    `brand: ${b.name}`,
    `title: ${title}`,
    'client: ""',
    'date: ""',
    'palette:',
    `  teal: "${P.teal}"`,
    `  cream: "${P.cream}"`,
    `  coral: "${P.coral}"`,
    'fonts:',
    `  headings: "${F.headings}"`,
    `  body: "${F.body}"`,
    '---',
    '',
    `<!-- ${b.name} · letterhead. Headings ${F.headings} in ${P.teal} on ${P.cream};`,
    `     ${P.coral} for the accent rule and emphasis only. ${V.cta_rule}. -->`,
    '',
    `**${b.name}**  ·  *${V.tagline}*`,
    '',
    '---',
    '',
  ].join('\n');
  const footer = ['', '---', '', `*${(b.footer || '').replace('{date}', '___')}*`, ''].join('\n');
  return front + src.trimEnd() + '\n' + footer;
}

const files = fs.readdirSync(NEU).filter(f => f.endsWith('.md')).sort();
const check = process.argv.includes('--check');
let stale = [];
fs.mkdirSync(BRA, { recursive: true });
for (const f of files) {
  const out = brandify(fs.readFileSync(path.join(NEU, f), 'utf8'), f);
  const dest = path.join(BRA, f);
  const cur = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
  if (cur === out) continue;
  if (check) { stale.push(f); continue; }
  fs.writeFileSync(dest, out);
  console.log('wrote branded/' + f);
}
if (check && stale.length) {
  console.error('branded/ is out of date with neutral/ + brand.yml: ' + stale.join(', '));
  console.error('run: node docs/templates/build-branded.js');
  process.exit(1);
}
console.log(check ? 'branded/ is up to date' : `done — ${files.length} branded templates`);
