#!/usr/bin/env node
/* THE CLEAN COPY — every committed document made from the original by a private map.
   The owner, 2026-09-24: "create another internal document that maps the verbatim, thus we basically
   just duplicate it, and programatically replace ... and for other personal details dont mention them
   if not needed and summarize ... that way you keep the originals in my machine with mapping".

   The originals stay where they are. This writes a COPY of every tracked file into a folder outside the
   repository, with each personal detail the map names either replaced by its stand-in ("replace"), or its
   sentence taken out and a one-line note left in its place saying why it mattered ("drop"), so a reader of
   the copy can still see why a design choice was made. Then it reads the whole copy back and fails if any
   mapped detail survived.

   THE MAP IS THE MOST SENSITIVE FILE THERE IS, so: it is read from a path OUTSIDE the repository and this
   refuses one inside it; the output folder must be outside the repository too; and nothing here prints a
   mapped term — only a rule's id and kind, a file and a line. No term is written in this file; its self-test
   builds its own made-up ones.

   Run:  node scripts/clean-copy.js --map <file outside the repo> --out <folder outside the repo>
         node scripts/clean-copy.js --selftest

   The map is JSON (or a markdown file holding one ```json block): a list of rules,
     {"id":3, "kind":"partner", "rule":"replace", "find":["..."], "to":"[partner]", "path":{"old-dir":"new-dir"}}
     {"id":4, "kind":"health",  "rule":"drop",    "find":["..."], "note":"A household food restriction was raised..."}
     {"id":9, "kind":"schedule","rule":"drop",    "pattern":["<regex>"]}
     {"id":1, "kind":"pet-name","rule":"keep",    "find":["..."]}
   "replace" matches whole words, case-sensitively as written (list each spelling). "drop" matches anywhere,
   case-insensitively, and takes out the sentence around it — a sentence ends at . ! ? or at a table cell's |,
   and in a .js file also at a quote, so a string is never cut open. "keep" rules do nothing and are listed so
   the map says what was decided. */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const inside = (p, root) => { const r = path.relative(root, path.resolve(p)); return r === '' || (!r.startsWith('..') && !path.isAbsolute(r)); };

function readMap(file) {
  const src = fs.readFileSync(file, 'utf8');
  const m = src.match(/```json\s*\n([\s\S]*?)```/);
  const rules = JSON.parse(m ? m[1] : src);
  if (!Array.isArray(rules) || !rules.length) throw new Error('the map holds no rules');
  rules.forEach((r, i) => {
    if (!['keep', 'replace', 'drop'].includes(r.rule)) throw new Error('rule #' + (r.id || i) + ' has no known rule (keep, replace, drop)');
    if (r.rule === 'replace' && (!Array.isArray(r.find) || typeof r.to !== 'string')) throw new Error('replace rule #' + r.id + ' needs find[] and to');
    if (r.rule === 'drop' && !(Array.isArray(r.find) || Array.isArray(r.pattern))) throw new Error('drop rule #' + r.id + ' needs find[] or pattern[]');
  });
  return rules;
}

/* "with": a drop that applies only when one of these words sits in the same sentence — for a detail that is
   ordinary design talk in general and personal only when it is about a named person (whole words, case as written) */
/* "files": a regex of paths the rule may touch — a time-stamp rule meant for notes must never reach a test fixture */
const filesRe = r => r.files ? new RegExp(r.files) : null;
const withRe = r => Array.isArray(r.with) && r.with.length ? new RegExp('(?<![A-Za-z0-9_])(?:' + r.with.map(esc).join('|') + ')(?![A-Za-z0-9_])') : null;

/* compile once: longest spelling first, so "for-x" is replaced before "x" */
function compile(rules) {
  const reps = [], drops = [];
  rules.forEach(r => {
    /* a folder name the map renames is replaced by its new name, not the stand-in; a possessive keeps its 's */
    if (r.rule === 'replace') (r.find || []).forEach(f => {
      const to = (r.path && r.path[f]) || (/'s$/.test(f) && !/'s$/.test(r.to) ? r.to + "'s" : r.to);
      reps.push({ r, f, to, files: filesRe(r), re: new RegExp('(?<![A-Za-z0-9_])' + esc(f) + '(?![A-Za-z0-9_])', 'g') });
    });
    if (r.rule === 'drop') {
      (r.find || []).forEach(f => drops.push({ r, re: new RegExp(esc(f), 'i'), with: withRe(r), files: filesRe(r) }));
      (r.pattern || []).forEach(p => drops.push({ r, re: new RegExp(p, 'i'), with: withRe(r), files: filesRe(r) }));
    }
  });
  reps.sort((a, b) => b.f.length - a.f.length);
  return { reps, drops };
}

/* take out the sentence around index i on one line; bounds: . ! ? then space, a table cell's |, a quote in js */
function sentenceSpan(line, i, js) {
  const stop = js ? /[|"'`]/ : /[|]/;
  let a = i;
  while (a > 0) {
    const c = line[a - 1];
    if (stop.test(c)) break;
    if (/[.!?]/.test(c) && /\s/.test(line[a] || ' ')) break;
    a--;
  }
  let b = i;
  while (b < line.length) {
    const c = line[b];
    if (stop.test(c)) break;
    if (/[.!?]/.test(c) && (b + 1 >= line.length || /\s/.test(line[b + 1]))) { b++; break; }
    b++;
  }
  return [a, b];
}

function cleanText(text, file, C0, tally) {
  const js = /\.(js|mjs|cjs|json)$/.test(file);
  const C = { reps: C0.reps.filter(x => !x.files || x.files.test(file)), drops: C0.drops.filter(x => !x.files || x.files.test(file)) };
  const lines = text.split('\n').map(line => {
    for (let guard = 0; guard < 50; guard++) {
      let hit = null, a = 0, b = 0;
      for (const d of C.drops) {
        const re = new RegExp(d.re.source, 'gi');
        let m;
        while ((m = re.exec(line))) {
          const [x, y] = sentenceSpan(line, m.index, js);
          if (!d.with || d.with.test(line.slice(x, y))) { hit = { d, m }; a = x; b = y; break; }
        }
        if (hit) break;
      }
      if (!hit) break;
      const note = hit.d.r.note ? (js ? hit.d.r.note : '*' + hit.d.r.note + '*') : '';
      const lead = a > 0 && !/\s$/.test(line.slice(0, a)) ? ' ' : '';
      const trail = b < line.length && !/^\s/.test(line.slice(b)) ? ' ' : '';
      line = line.slice(0, a) + (note ? lead + note + trail : lead + trail) + line.slice(b);
      tally(hit.d.r, 'dropped');
    }
    C.reps.forEach(x => { line = line.replace(x.re, () => { tally(x.r, 'replaced'); return x.to; }); });
    return line;
  });
  return lines.join('\n');
}

function renamePath(rel, rules) {
  let out = rel;
  rules.filter(r => r.path).forEach(r => Object.entries(r.path).forEach(([from, to]) => {
    out = out.split('/').map(seg => seg === from ? to : seg).join('/');
  }));
  return out;
}

/* the read-back: every replace/drop term and pattern, anywhere in the copy — case-insensitive, no bounds for
   drop terms; replace terms whole-word — reported as rule id + kind + file:line, never the term */
function survivors(files, rules) {
  const checks = [];
  rules.forEach(r => {
    if (r.rule === 'replace') (r.find || []).forEach(f => checks.push({ r, re: new RegExp('(?<![A-Za-z0-9_])' + esc(f) + '(?![A-Za-z0-9_])'), files: filesRe(r) }));
    if (r.rule === 'drop') {
      (r.find || []).forEach(f => checks.push({ r, re: new RegExp(esc(f), 'i'), with: withRe(r), files: filesRe(r) }));
      (r.pattern || []).forEach(p => checks.push({ r, re: new RegExp(p, 'i'), with: withRe(r), files: filesRe(r) }));
    }
    if (r.path) Object.keys(r.path).forEach(k => checks.push({ r, re: new RegExp('(?<![A-Za-z0-9_])' + esc(k) + '(?![A-Za-z0-9_])'), pathOnly: true }));
  });
  const P = [];
  files.forEach(({ file, text }) => {
    checks.forEach(c => { if (c.pathOnly && c.re.test(file)) P.push('rule #' + c.r.id + ' (' + c.r.kind + '): a path still carries it — ' + file.replace(c.re, '…')); });
    if (text == null) return;
    text.split('\n').forEach((line, i) => checks.forEach(c => {
      if (c.files && !c.files.test(file)) return;
      if (!c.pathOnly && c.re.test(line) && (!c.with || c.with.test(line))) P.push('rule #' + c.r.id + ' (' + c.r.kind + ') survives at ' + file + ':' + (i + 1));
    }));
  });
  return P;
}

function run(mapFile, outDir) {
  if (!mapFile || !outDir) throw new Error('usage: --map <file outside the repo> --out <folder outside the repo>');
  if (inside(mapFile, ROOT)) throw new Error('the map is inside the repository — it must never be, not even untracked');
  if (inside(outDir, ROOT)) throw new Error('the output folder is inside the repository — put it outside');
  const rules = readMap(mapFile);
  const C = compile(rules);
  const counts = {};
  const tally = (r, what) => { const k = '#' + r.id + ' ' + r.kind + ' ' + what; counts[k] = (counts[k] || 0) + 1; };
  const list = execFileSync('git', ['ls-files', '-z'], { cwd: ROOT, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).split('\0').filter(Boolean);
  fs.rmSync(outDir, { recursive: true, force: true });
  const written = [];
  let binaries = 0, changed = 0;
  list.forEach(rel => {
    let buf; try { buf = fs.readFileSync(path.join(ROOT, rel)); } catch (e) { return; }
    const dest = renamePath(rel, rules);
    fs.mkdirSync(path.dirname(path.join(outDir, dest)), { recursive: true });
    if (buf.subarray(0, 8000).includes(0)) { fs.writeFileSync(path.join(outDir, dest), buf); binaries++; written.push({ file: dest, text: null }); return; }
    const src = buf.toString('utf8');
    const out = cleanText(src, rel, C, tally);
    if (out !== src || dest !== rel) changed++;
    fs.writeFileSync(path.join(outDir, dest), out);
    try { fs.chmodSync(path.join(outDir, dest), fs.statSync(path.join(ROOT, rel)).mode); } catch (e) {}
    written.push({ file: dest, text: out });
  });
  return { rules, counts, files: list.length, changed, binaries, left: survivors(written, rules) };
}

function selftest() {
  const bad = [];
  const mark = (ok, what, why) => { console.log((ok ? '  ok   ' : '  FAIL ') + what + (ok ? '' : '  (' + why + ')')); if (!ok) bad.push(what); };
  /* made-up terms, assembled here so no real one is ever in this file */
  const T = { who: 'Zo' + 'rblax', town: 'Qwerty' + 'ville', sick: 'glim' + 'pox', pet: 'Bis' + 'cuit' };
  const rules = [
    { id: 1, kind: 'pet-name', rule: 'keep', find: [T.pet] },
    { id: 3, kind: 'partner', rule: 'replace', find: [T.who, T.who + "'s", 'for-' + T.who.toLowerCase()], to: '[partner]', path: { ['for-' + T.who.toLowerCase()]: 'for-partner' } },
    { id: 4, kind: 'health', rule: 'drop', find: [T.sick], note: 'A household restriction was raised as an example.' },
    { id: 5, kind: 'place', rule: 'replace', find: [T.town], to: '[city]' },
    { id: 9, kind: 'schedule', rule: 'drop', pattern: ['\\b\\d{1,2}:\\d{2} ?UTC\\b'] },
  ];
  const C = compile(rules);
  const n = {}; const tally = (r, w) => { n[r.id + w] = (n[r.id + w] || 0) + 1; };
  const clean = (s, f) => cleanText(s, f || 'a.md', C, tally);
  mark(clean('We met ' + T.who + ' in ' + T.town + '.') === 'We met [partner] in [city].', 'a name and a place become their stand-ins', clean('We met ' + T.who + ' in ' + T.town + '.'));
  mark(clean(T.who + "'s idea") === "[partner]'s idea", 'a possessive keeps its shape', clean(T.who + "'s idea"));
  mark(clean('Mega' + T.who + 'X stays') === 'Mega' + T.who + 'X stays', 'a replace matches whole words only', 'it cut into a longer word');
  const d = clean('Good start. She has ' + T.sick + ' so avoid it. Then more.');
  mark(d === 'Good start. *A household restriction was raised as an example.* Then more.', 'a drop takes out only its sentence and leaves the note', d);
  const row = clean('| 2026 | she has ' + T.sick + ' | done |');
  mark(row === '| 2026 |*A household restriction was raised as an example.*| done |' || row === '| 2026 | *A household restriction was raised as an example.* | done |', 'a drop inside a table stays inside its cell', row);
  const js = clean('say:{en:"We avoid ' + T.sick + ' here.", es:"Hola."}', 'x.js');
  mark(js.split('"').length === 5 && !new RegExp(T.sick, 'i').test(js), 'in a .js string a drop never cuts the string open', js);
  const R2 = [{ id: 41, kind: 'health', rule: 'drop', find: [T.sick], with: [T.who, 'she'], note: 'N.' }];
  const C2 = compile(R2), c2 = s => cleanText(s, 'a.md', C2, () => {});
  mark(c2('Packs list ' + T.sick + ' for players.') === 'Packs list ' + T.sick + ' for players.', 'a conditional drop leaves general design talk alone', c2('Packs list ' + T.sick + ' for players.'));
  mark(c2('Intro. And she has ' + T.sick + ' at home. End.') === 'Intro. *N.* End.', 'a conditional drop takes the sentence about the person', c2('Intro. And she has ' + T.sick + ' at home. End.'));
  mark(survivors([{ file: 'r.md', text: 'Packs list ' + T.sick + '.' }], R2).length === 0 && survivors([{ file: 'r.md', text: 'she has ' + T.sick }], R2).length === 1, 'the read-back applies the same condition', 'it disagreed with the drop');
  const R3 = [{ id: 9, kind: 'schedule', rule: 'drop', pattern: ['\\b\\d{1,2}:\\d{2} ?UTC\\b'], files: '^docs/.*\\.md$' }];
  const C3 = compile(R3), fx = "exp: '2026-09-16 15:26:57 UTC'";
  mark(cleanText(fx, 'test/x.js', C3, () => {}) === fx && survivors([{ file: 'test/x.js', text: fx }], R3).length === 0, 'a rule scoped to notes never touches a test fixture', cleanText(fx, 'test/x.js', C3, () => {}));
  mark(cleanText('At 03:48 UTC we met. Ok.', 'docs/a.md', C3, () => {}) === 'Ok.' || cleanText('At 03:48 UTC we met. Ok.', 'docs/a.md', C3, () => {}).indexOf('UTC') < 0, 'and still cleans the notes it is scoped to', cleanText('At 03:48 UTC we met. Ok.', 'docs/a.md', C3, () => {}));
  mark(clean('seen at 03:48 UTC, fine.') .indexOf('UTC') < 0, 'a pattern drop takes out a time stamp', clean('seen at 03:48 UTC, fine.'));
  mark(clean('the pet ' + T.pet + ' stays') === 'the pet ' + T.pet + ' stays', 'a keep rule changes nothing', 'it changed a kept term');
  mark(renamePath('docs/for-' + T.who.toLowerCase() + '/A.md', rules) === 'docs/for-partner/A.md', 'a folder is renamed by the map', renamePath('docs/for-' + T.who.toLowerCase() + '/A.md', rules));
  mark(clean('see docs/for-' + T.who.toLowerCase() + '/A.md') === 'see docs/for-partner/A.md', 'a link to the renamed folder follows it', clean('see docs/for-' + T.who.toLowerCase() + '/A.md'));
  /* the read-back finds a survivor, and says where without saying what */
  const left = survivors([{ file: 'a.md', text: 'fine' }, { file: 'b.md', text: 'x\n' + T.town.toUpperCase() + ' y' }], rules);
  mark(left.length === 0, 'the read-back is case-true for replace terms (an upper-case copy is a different spelling to list)', JSON.stringify(left));
  const left2 = survivors([{ file: 'b.md', text: 'x\nabout ' + T.sick + ' y' }], rules);
  mark(left2.length === 1 && left2[0].indexOf('b.md:2') > 0 && left2[0].indexOf(T.sick) < 0, 'a surviving detail is named by rule and line, never by the term', JSON.stringify(left2));
  const left3 = survivors([{ file: 'docs/for-' + T.who.toLowerCase() + '/A.md', text: null }], rules);
  mark(left3.length === 1 && left3[0].indexOf(T.who) < 0, 'a path that still carries a mapped name is red, and not printed whole', JSON.stringify(left3));
  /* and the two refusals that keep the map and the copy out of the repository */
  let e1 = ''; try { run(path.join(ROOT, 'map.json'), '/tmp/x'); } catch (e) { e1 = e.message; }
  mark(/inside the repository/.test(e1), 'a map inside the repository is refused', e1);
  let e2 = ''; try { run('/tmp/map.json', path.join(ROOT, 'out')); } catch (e) { e2 = e.message; }
  mark(/inside the repository/.test(e2), 'an output folder inside the repository is refused', e2);
  const total = 20;
  if (bad.length) { console.log('FAIL — ' + bad.length + ' of ' + total); process.exit(1); }
  console.log('OK — ' + total + ' cases, made-up terms only, no map read.');
  process.exit(0);
}

if (require.main === module) {
  if (process.argv.includes('--selftest')) return void selftest();
  const arg = k => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
  let res;
  try { res = run(arg('--map'), arg('--out')); }
  catch (e) { console.log('FAIL\n- ' + e.message); process.exit(1); }
  console.log('Copied ' + res.files + ' files (' + res.binaries + ' binary, copied as they are; images are not read), ' + res.changed + ' changed.');
  Object.keys(res.counts).sort().forEach(k => console.log('  ' + k + ': ' + res.counts[k]));
  if (res.left.length) { console.log('FAIL — ' + res.left.length + ' mapped detail(s) survived:'); res.left.slice(0, 50).forEach(p => console.log('- ' + p)); process.exit(1); }
  console.log('OK — no mapped detail survives in the copy.');
  process.exit(0);
}

module.exports = { readMap, compile, cleanText, renamePath, survivors };
