#!/usr/bin/env node
/* What we are about to publish is only the public game (R7, docs/story/el-changarrito.md §5).
   This exists because the deploy used to be a DENYLIST of three names — .git, .github,
   node_modules — which shipped the entire repository to GitHub Pages, including changarrito/:
   the owner's private backlog tool, with a GitHub sign-in, a "make a new token" flow, and calls to
   api.github.com. CLAUDE.md says the town is run from his laptop and never linked from the public
   game. Not linked is not the same as not published — it was reachable at /changarrito/ by anyone
   who guessed the path, for as long as the site has been up.
   test/smoke.js's guarantee scan forbids exactly those strings in the public build and never saw
   this, because it scans what index.html LOADS and the town loads nothing from there. So the guard
   has to be on the ARTIFACT, not on the source tree: the only honest question is what is inside
   the box we upload.
   Run:  node test/public.js _site        */
const fs = require('fs'), path = require('path');
const site = process.argv[2];
if (!site) { console.error('usage: node test/public.js <site dir>'); process.exit(2); }
const fails = [];

const walk = (d, base = '') => { let out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const rel = base ? base + '/' + e.name : e.name;
    out = out.concat(e.isDirectory() ? walk(path.join(d, e.name), rel) : [rel]);
  } return out; };

let files = [];
try { files = walk(site); }
catch (e) { console.error('FAIL — there is no site to check at ' + site + ': ' + e.message); process.exit(1); }

// 1. nothing whose very presence is private
const FORBIDDEN_DIRS = ['changarrito', 'docs', 'test', '.github', '.git', 'node_modules'];
FORBIDDEN_DIRS.forEach(d => {
  const hit = files.filter(f => f === d || f.startsWith(d + '/'));
  if (hit.length) fails.push('the upload contains ' + d + '/ (' + hit.length + ' file(s), e.g. ' + hit[0] + ') — that is not part of the public game');
});
if (files.some(f => /^CLAUDE\.md$|^README\.md$|^install-skills\.sh$/.test(f)))
  fails.push('the upload contains the repository\'s own paperwork, which is nobody else\'s business');

// 2. and nothing anywhere in it may carry a credential surface — the scan test/smoke.js
//    runs over the SOURCE, run here over what is actually shipped
const WORDS = ['api.github.com', 'net.local', 'github_pat', 'Authorization'];
files.filter(f => /\.(js|html|json|webmanifest|md)$/.test(f)).forEach(f => {
  const src = fs.readFileSync(path.join(site, f), 'utf8');
  WORDS.forEach(w => { if (src.includes(w)) fails.push('the upload\'s ' + f + ' mentions "' + w + '" — the public build must not'); });
});

// 3. the game must still actually be there — an allowlist that drops a file is the other failure
['index.html', 'sw.js', 'engine/engine.js', 'content/meridian/config.js', 'vendor/three.min.js']
  .forEach(f => { if (!files.includes(f)) fails.push('the upload is MISSING ' + f + ' — the allowlist has dropped part of the game'); });

if (fails.length) { console.log('FAIL — what we are about to publish is not only the public game\n- ' + fails.join('\n- ')); process.exit(1); }
console.log('OK — the upload is the public game and nothing else: ' + files.length + ' files, no private tool, no registers, no credential surface.');
