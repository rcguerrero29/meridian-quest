#!/usr/bin/env node
/* THE CLEAN COPY'S MURAL LEDGER — re-fingerprint only what the privacy map translated.
   docs/crew/MURAL-LEDGER.txt fingerprints every panel on the town's crew wall so a panel can never be
   rewritten after the fact (test/town.smoke.js). The clean copy (scripts/clean-copy.js) translates personal
   details in some panels' words by rule — a name to its stand-in — which changes their fingerprints. That is
   a translation, not a rewrite, and the copy's ledger has to say so rather than go red forever.

   So, for each panel in the ORIGINAL ledger:
   - the original panel must still match its original fingerprint — if it does not, the source was already
     tampered with, and this refuses to launder it (red, and the line is left alone);
   - if the copy's panel differs from the original, the copy's line gets the copy's fingerprints;
   - every re-fingerprinted panel is named in a comment at the top of the copy's ledger, with the date.
   The fingerprints are the town test's own (sha1 over the six reader strings; the state in its own column),
   computed the same way; the town test then reads the copy's ledger exactly as it reads the original's.

   Run:  node scripts/clean-copy-ledger.js --out <the clean copy's folder> */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const crypto = require('crypto');
const ROOT = path.join(__dirname, '..');
const SEP = String.fromCharCode(31);
const LEDGER = path.join('docs', 'crew', 'MURAL-LEDGER.txt');
const MURALS = path.join('changarrito', 'content', 'murals.js');

const fp = m => crypto.createHash('sha1').update([m.title.en, m.title.es, m.said.en, m.said.es, m.cap.en, m.cap.es].join(SEP)).digest('hex').slice(0, 12);
const sfp = m => (m.state && m.state.en) ? crypto.createHash('sha1').update([m.state.en, m.state.es || ''].join(SEP)).digest('hex').slice(0, 12) : '';

function load(root) {
  const src = fs.readFileSync(path.join(root, MURALS), 'utf8');
  const ctx = vm.createContext({ console, Math, String, Array, Object, JSON });
  vm.runInContext(src + '\n;this.__M = (typeof MURALS !== "undefined") ? MURALS : null;', ctx, { filename: MURALS });
  if (!Array.isArray(ctx.__M) || !ctx.__M.length) throw new Error('no MURALS read from ' + path.join(root, MURALS) + ' — nothing to measure is a red');
  return new Map(ctx.__M.map(m => [m.id, m]));
}

function run(out) {
  if (!out) throw new Error('usage: --out <the clean copy folder>');
  const orig = load(ROOT), copy = load(out);
  const lines = fs.readFileSync(path.join(ROOT, LEDGER), 'utf8').split('\n');
  const redone = [], problems = [];
  const next = lines.map(line => {
    const t = line.trim();
    if (!t || t[0] === '#') return line;
    const [id, h, s = ''] = t.split('|');
    const o = orig.get(id), c = copy.get(id);
    if (!o || !c) { problems.push('panel "' + id + '" is missing from ' + (!o ? 'the original' : 'the copy')); return line; }
    if (fp(o) !== h || sfp(o) !== s) { problems.push('panel "' + id + '" no longer matches its fingerprint in the ORIGINAL — not re-signed; that is a real change to look at, not a translation'); return line; }
    if (fp(c) === h && sfp(c) === s) return line;
    redone.push(id);
    return [id, fp(c), sfp(c)].filter((x, i) => i < 2 || x || s).join('|');
  });
  const note = ['# ' + new Date().toISOString().slice(0, 10) + ' — this is the CLEAN COPY of the wall. ' + redone.length + ' panel(s) were re-fingerprinted because the',
    '# privacy map translated a personal detail in their words to its stand-in (scripts/clean-copy.js). That is a',
    '# translation by rule, not a rewrite; the original words and fingerprints are kept in the private repository.',
    '# Re-fingerprinted: ' + (redone.join(', ') || 'none'), '#'];
  fs.writeFileSync(path.join(out, LEDGER), note.concat(next).join('\n'));
  return { redone, problems };
}

if (require.main === module) {
  const i = process.argv.indexOf('--out');
  let res;
  try { res = run(i > 0 ? process.argv[i + 1] : null); }
  catch (e) { console.log('FAIL\n- ' + e.message); process.exit(1); }
  if (res.problems.length) { console.log('FAIL'); res.problems.forEach(p => console.log('- ' + p)); process.exit(1); }
  console.log('OK — ' + res.redone.length + ' panel(s) re-fingerprinted in the copy\'s ledger, each named at its top; every other line is the original\'s.');
}

module.exports = { fp, sfp };
