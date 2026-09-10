#!/usr/bin/env node
/* R10 — WHAT WE ARE ABOUT TO PUBLISH. The security gate, run on the built artifact.
   (docs/REGRESSION.md §3. Registered 2026-09-10 after El Changarrito was found on the public
   internet. Owner: "this is a major risk and it could keep ya healthy too.")

   WHY THIS EXISTS AND WHY IT IS NOT R8. R8 was built on 2026-09-06 to close exactly this class —
   its stated gap was "a second public pack would go unscanned" — and the mechanism it chose was
   "derive the shell from the public index's script tags." That mechanism is what made it blind:
   changarrito/ is not loaded by index.html, so it was never in the scanned set, and the town's
   GitHub sign-in and "make a new token" flow shipped to GitHub Pages behind a green suite.
   **The fix for the last exposure was the cause of this one.** So R10 does not derive anything.
   It reads the directory we are about to upload and asks what is in it.

   THE RULE THIS FILE ENFORCES, in one line: the only honest question is what is inside the box,
   so check the box — never the recipe for packing it, and never the source tree it came from.

   Run:  node test/public.js _site
   Build the box first (the same commands .github/workflows/pages.yml runs):
     mkdir -p _site
     cp index.html sw.js qr.js manifest.webmanifest icon-192.png icon-512.png _site/
     cp -r engine vendor _site/
     mkdir -p _site/content && cp -r content/meridian _site/content/                              */
const fs = require('fs'), path = require('path');
const site = process.argv[2];
if (!site) { console.error('usage: node test/public.js <site dir>'); process.exit(2); }
const fails = [], notes = [];

const walk = (d, base = '') => { let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const rel = base ? base + '/' + e.name : e.name;
    out = out.concat(e.isDirectory() ? walk(path.join(d, e.name), rel) : [rel]);
  } return out; };

let files = [];
try { files = walk(site); }
catch (e) { console.error('FAIL — there is no site to check at ' + site + ': ' + e.message); process.exit(1); }
const has = f => files.includes(f);
const read = f => fs.readFileSync(path.join(site, f), 'utf8');
const textFiles = files.filter(f => /\.(js|html|json|webmanifest|md|txt|css|svg)$/.test(f));

/* ---- 1 · nothing whose PRESENCE is private ------------------------------------------------- */
// Named rather than derived, because deriving is what failed. A directory added to this repo
// tomorrow is private by default: it is not on the allowlist in pages.yml, so it never arrives.
const NEVER = ['changarrito', 'docs', 'test', '.github', '.git', 'node_modules', '.claude', 'scripts'];
NEVER.forEach(d => { const hit = files.filter(f => f === d || f.startsWith(d + '/'));
  if (hit.length) fails.push('the upload contains ' + d + '/ — ' + hit.length + ' file(s), e.g. ' + hit[0]); });
files.filter(f => /^(CLAUDE|README|AGENTS)\.md$|\.sh$|^\.env|(^|\/)\.[^/]+$/.test(f))
  .forEach(f => fails.push('the upload contains ' + f + ', which is the repository\'s business and nobody else\'s'));
files.filter(f => /\.map$|\.bak$|\.tmp|~$|\.orig$/.test(f))
  .forEach(f => fails.push('the upload contains ' + f + ' — a build leftover has no business on a public site'));

/* ---- 2 · nothing that CARRIES a credential surface ------------------------------------------ */
// The same four words test/smoke.js scans the source for, asked of what actually ships. A guard on
// the source cannot vouch for the artifact; that difference is the whole of E5.
const WORDS = ['api.github.com', 'net.local', 'github_pat', 'Authorization'];
textFiles.forEach(f => { const src = read(f);
  WORDS.forEach(w => { if (src.includes(w)) fails.push('the upload\'s ' + f + ' mentions "' + w + '" — the public build must not'); }); });
// and nothing that LOOKS like a secret even if it is not one of those four
textFiles.forEach(f => { const src = read(f);
  [[/gh[pousr]_[A-Za-z0-9]{20,}/, 'a GitHub token'], [/AKIA[0-9A-Z]{12,}/, 'an AWS key id'],
   [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, 'a private key'], [/xox[baprs]-[A-Za-z0-9-]{10,}/, 'a Slack token']]
    .forEach(([re, what]) => { if (re.test(src)) fails.push('the upload\'s ' + f + ' contains what looks like ' + what); }); });

/* ---- 3 · the page may not REACH anywhere it should not -------------------------------------- */
// A page with no token in it can still be a door. The public shell's CSP is the wall.
if (has('index.html')) { const html = read('index.html');
  const csp = (html.match(/<meta[^>]+Content-Security-Policy[^>]*>/i) || [])[0];
  if (!csp) fails.push('the public index declares no Content-Security-Policy — nothing limits where the page may talk to');
  else { if (/api\.github\.com/.test(csp)) fails.push('the public index\'s CSP allows api.github.com — that belongs to the private town, not the game');
         if (!/connect-src/.test(csp)) notes.push('the CSP names no connect-src, so fetch/XHR falls back to default-src — check that is deliberate'); }
  [...html.matchAll(/<script src="([^"]+)"/g)].map(m => m[1]).forEach(s => {
    if (/^https?:/.test(s)) fails.push('the public index loads a script from off-origin: ' + s);
    else if (!has(s.replace(/^\.\//, ''))) fails.push('the public index loads "' + s + '" and it is not in the upload — every visitor gets a 404'); });
}

/* ---- 4 · the offline app must actually install --------------------------------------------- */
// sw.js addAll() is ALL-OR-NOTHING: one missing path and the install rejects, the worker never
// activates, and every already-installed device stays pinned to the version it has, silently.
if (has('sw.js')) { const sw = read('sw.js');
  const listed = [...sw.matchAll(/"\.\/([^"]*)"/g)].map(m => m[1]).filter(Boolean);
  listed.forEach(a => { if (!has(a)) fails.push('sw.js caches "' + a + '" and it is not in the upload — addAll is all-or-nothing, so the app would never install'); });
  const cache = (sw.match(/CACHE\s*=\s*"([^"]+)"/) || [])[1];
  if (has('content/meridian/config.js')) { const v = (read('content/meridian/config.js').match(/GAMEV\s*=\s*"([^"]+)"/) || [])[1];
    if (cache && v && cache !== v) fails.push('the shipped sw.js caches "' + cache + '" while the shipped game says it is "' + v + '" — they must be the same string'); }
}

/* ---- 5 · and the game is actually there ----------------------------------------------------- */
// An allowlist that drops a file is the other way to fail, and it is silent too.
['index.html', 'sw.js', 'qr.js', 'manifest.webmanifest', 'engine/engine.js', 'engine/engine3d.js',
 'vendor/three.min.js', 'content/meridian/config.js', 'content/meridian/maps.js', 'content/meridian/strings.js']
  .forEach(f => { if (!has(f)) fails.push('the upload is MISSING ' + f + ' — the allowlist has dropped part of the game'); });

if (notes.length) notes.forEach(n => console.log('note: ' + n));
if (fails.length) { console.log('FAIL — what we are about to publish is not only the public game\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('OK — R10: the upload is the public game and nothing else. ' + files.length + ' files; no private tool, no registers, ' +
            'no credential surface, no off-origin script, the worker\'s asset list resolves, and the game is complete.');
