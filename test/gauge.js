#!/usr/bin/env node
/* The gauge — the smallest thing that can be a world, run against the shared suite.
   Every leak in docs/TAGS.md was found by READING the engine. Nobody had ever built a second
   world to find out which one a real pack hits FIRST, so this is that world: five tiles, two
   people, one room, in content/gauge/. It is not a game and is never linked from one. Its only
   job is to fail in the places a new game would fail, out loud, on every CI run.
   The shell is GENERATED from the public index rather than copied, because ~770 of its ~800
   lines must be identical (the shared suite reads about twenty element ids straight out of it)
   and a copy would rot silently the first time index.html changed. Every edit below asserts it
   actually matched: a String.replace that stops matching returns the input unchanged and would
   otherwise print success while testing the wrong thing.
   Run:  node test/gauge.js          */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const SCRIPTS = ['strings', 'quests.en', 'quests.es', 'npcs', 'maps', 'art', 'config'];

let h = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const edit = (what, re, to) => {
  const before = h;
  h = h.replace(re, to);
  if (h === before) throw new Error('the gauge shell can no longer be built from index.html: the "' + what + '" edit matched nothing. index.html changed shape — fix this generator, do not commit a hand-made copy.');
};

// the pack's own scripts, in the order the public shell loads Meridian's
edit('script tags',
  /<script src="content\/meridian\/strings\.js"><\/script>[\s\S]*?<script src="content\/meridian\/docs\.js"><\/script>/,
  SCRIPTS.map(s => '<script src="' + s + '.js"></script>').join('\n'));
// depth: content/gauge/index.html is two folders down from the root the public shell sits in
edit('engine paths', /<script src="(engine\/|vendor\/|qr\.js)/g, '<script src="../../$1');
edit('title', /<title>[^<]*<\/title>/, '<title>El Faro — the gauge pack</title>');
// a fixture must not claim to be an installable app, and must not fight the real one for a cache
edit('manifest', /<link rel="manifest"[^>]*>/, '<!-- no manifest: the gauge is a fixture, not an app -->');
edit('service worker', /navigator\.serviceWorker\.register\([^)]*\)/, 'Promise.reject(new Error("the gauge never installs a service worker"))');

if (h.includes('content/meridian/')) throw new Error('the generated gauge shell still loads Meridian content');
SCRIPTS.forEach(s => { if (!h.includes('"' + s + '.js"')) throw new Error('the generated gauge shell never loads ' + s + '.js'); });

const shellPath = path.join(root, 'content', 'gauge', 'index.html');
fs.writeFileSync(shellPath, h);
console.log('gauge shell built from index.html (' + h.split('\n').length + ' lines, ' + SCRIPTS.length + ' pack scripts)');

/* The gauge does NOT chase green, and that is the whole point of it.
   Six of the shared suite's checks fail this pack for being SMALL rather than for being WRONG —
   "no facade has two windows", "no tall piece was found", "the check never ran". They are honest
   about it and they fail the build anyway, which means the suite advertised as runnable against
   ANY pack cannot be passed by the smallest pack that is a world. docs/NEW-WORLD.md §5 makes the
   shared suite step 3 and a minimal pack step 2, so today the gate rejects the thing the step
   before it produces.
   So this records what a new world is up against and fails when that CHANGES. A line that
   disappears means the template got easier — good, delete it here and say so. A line that appears
   means somebody made the engine harder to write a second game for, and it says so on the day it
   happens instead of in somebody's month two. */
const expectedPath = path.join(root, 'content', 'gauge', 'expected.txt');
let out = '';
try {
  out = execFileSync('node', [path.join(root, 'test', 'engine.smoke.js'), '--index', 'content/gauge/index.html'],
    { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
} catch (e) { out = (e.stdout || '') + (e.stderr || ''); }

const got = out.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim())
  // one line carries a live frame count; the number is noise, the fact is not
  .map(l => l.replace(/drawn \d+ time\(s\)/, 'drawn N time(s)')).sort();

if (!fs.existsSync(expectedPath)) {
  fs.writeFileSync(expectedPath, got.join('\n') + '\n');
  console.log('gauge: first run — recorded ' + got.length + ' standing demands in content/gauge/expected.txt');
  process.exit(0);
}
const want = fs.readFileSync(expectedPath, 'utf8').split('\n').map(l => l.trim()).filter(Boolean).sort();
const gone = want.filter(l => !got.includes(l)), fresh = got.filter(l => !want.includes(l));

if (!gone.length && !fresh.length) {
  console.log('OK — the gauge: a five-tile, two-person, one-room world still boots, plays and meets the engine on the same ' + want.length + ' terms as before.');
  process.exit(0);
}
console.log('FAIL — what the engine demands of a brand-new world has CHANGED.');
fresh.forEach(l => console.log('  NEW demand on every future game: ' + l));
gone.forEach(l => console.log('  no longer demanded (the template got easier — delete this line from content/gauge/expected.txt and say so in the commit): ' + l));
process.exit(1);
