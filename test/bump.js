#!/usr/bin/env node
/* An engine change that never reaches a returning player is not shipped (R? — this file's reason).
   test/smoke.js already checks that sw.js's CACHE EQUALS the pack's GAMEV. That is a lockstep test,
   and lockstep is not the same as movement: leave both untouched while editing engine/ and the two
   strings still match, the suite stays green, and every device that already installed the app keeps
   serving the OLD engine out of its cache. Cache-first means those players never find out.
   Verified against this repo's own history rather than assumed — two commits on main changed
   engine/ and left CACHE where it was:
     f9a2e71  The world takes a share of the screen, and the camera holds its width
     689e93d  The bubble says what the chair changes; patterns on the shirt
   Both go red against this check, which is what makes it evidence rather than a test that passes
   on unchanged code.
   Run:  node test/bump.js <base-ref> [head-ref]     e.g. node test/bump.js origin/main
   The optional head lets it be pointed at any pair, which is how the two commits above were
   proved red rather than asserted red. */
const { execFileSync } = require('child_process');
const base = process.argv[2], head = process.argv[3] || 'HEAD';
if (!base) { console.error('usage: node test/bump.js <base-ref>'); process.exit(2); }
const git = (...a) => execFileSync('git', a, { encoding: 'utf8' });

let changed;
try { changed = git('diff', '--name-only', base + '...' + head).split('\n').filter(Boolean); }
catch (e) { changed = git('diff', '--name-only', base, head).split('\n').filter(Boolean); }

const touchedEngine = changed.filter(f => f.startsWith('engine/'));
if (!touchedEngine.length) { console.log('OK — this change does not touch engine/, so no cache bump is owed.'); process.exit(0); }

const cacheOf = (src) => (src.match(/CACHE\s*=\s*"([^"]+)"/) || [])[1] || null;
const was = cacheOf(git('show', base + ':sw.js'));
const now = cacheOf(head === 'HEAD' ? require('fs').readFileSync('sw.js', 'utf8') : git('show', head + ':sw.js'));

if (!now) { console.log('FAIL — sw.js no longer declares a CACHE this check can read.'); process.exit(1); }
if (was === now) {
  console.log('FAIL — this change edits the engine and every returning player would keep the old one.\n' +
    '- it touches ' + touchedEngine.join(', ') + '\n' +
    '- and sw.js CACHE is still "' + now + '"\n' +
    '- the service worker is cache-first, so an installed device serves what it already has and never\n' +
    '  learns there is anything newer. Bump CACHE in sw.js and GAMEV in every pack config together.');
  process.exit(1);
}
console.log('OK — engine/ changed and the cache moved with it: "' + was + '" → "' + now + '".');
