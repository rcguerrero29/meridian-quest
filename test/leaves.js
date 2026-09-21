#!/usr/bin/env node
/* test/leaves.js — "what does this change let out?" (/crew-fix step 5½, .claude/skills/crew-fix/SKILL.md).
   Written 2026-09-13, the day docs/BOUNDARY.md was written: .claude/agents/zeni.md and
   .claude/agents/melo.md had sent every reader of those two personas to both files since 2026-09-11,
   and neither had ever existed. Two halves, and they have different right answers.

     node test/leaves.js                the register is SOUND: every path docs/BOUNDARY.md names is a
                                        real file, every reviewer it names is a persona that exists,
                                        every row has a date, nothing in .claude/ sends an agent to a
                                        file that was never written, and the workflows declare their
                                        permissions and carry no trigger a label or a comment can pull.
                                        EXIT 1 on a broken row — these are facts.
     node test/leaves.js <base>         the WORKING TREE against <base> (the desk: what is about to
     node test/leaves.js <base> <head>  ship), or two commits (what CI has). Prints which boundary
                                        paths the change touches and who must see it.
                                        ALWAYS EXIT 0 — this half is a judgement, not a fact.
     node test/leaves.js --selftest     the red cases, on a fixture, no repo and no network.

   WHY THE DIFF HALF NEVER FAILS THE BUILD. "You touched a boundary path" is not a state the author
   can clear. There is no edit that turns it green except not doing the work, and a gate nobody can
   satisfy is a gate people learn to force past. The first thing that costs is the credibility of the
   reds that CAN be satisfied: test/bump.js going red means "every installed player keeps the old
   engine and never finds out", and it is worth exactly as much as the least meaningful red on the
   same board. Routing a change to a reviewer is what the pull request is for.

   WHY IT NEVER SAYS "NOTHING LEFT TOWN". The list is a denylist wearing an allowlist's coat: it can
   only name yesterday's edges. A new workflow, a second public pack, a new fetch in a file not on the
   list, the Pages "Source" dropdown — none of those is a listed path. So a quiet diff prints the two
   counts (paths touched, rows read) and never a reassurance, because "zero matched" and "the list is
   broken" are the same printout otherwise — which is how boot-warning filter #7 in docs/REGRESSION.md
   matched zero characters, ever.

   The list lives in docs/BOUNDARY.md and is PARSED, never copied here. scripts/build-site.sh:4-7 says
   why: two hand-kept copies of "what matters" is the shape of the fault that put the town on the
   internet — the thing that decides is somewhere nobody looks, and there is more than one of it.

   docs/BOUNDARY.md rows, pipe table, four columns:
     | path | who must see it | what it lets out | since |
   `path` is a literal repo path or a prefix ending in `/`. */
const fs = require('fs'), path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const REG = path.join(ROOT, 'docs', 'BOUNDARY.md');

function rows(src) {
  return src.split('\n').map(l => l.trim())
    .filter(l => l.startsWith('|') && !/^\|[\s|:-]*$/.test(l))
    .map(l => l.replace(/^\||\|$/g, '').split('|').map(c => c.trim().replace(/^`|`$/g, '')))
    .filter(c => c.length >= 3 && /^[A-Za-z0-9_.].*[/\w]$/.test(c[0]) && !/^path$/i.test(c[0]) && !/ /.test(c[0]))
    .map(c => ({ path: c[0], who: c[1], lets: c[2], since: c[3] || '' }));
}

/* every path any persona or skill file names, whether or not it is in backticks — melo.md:3 said
   "the BOUNDARY list in test/leaves.js" with no backticks, and a check that only reads backticks
   would have walked past the one citation that named this very file. Globs are skipped: SKILL.md
   legitimately writes `.claude/agents/*.md` as a set, not a file. The extension list is longest
   first: `.json` before `.js`, or `test/spots.json` reads as `test/spots.js` — a ghost the first
   draft of this file invented and then reported as missing. */
const CITE = /(?:docs|test|engine|content|changarrito|scripts|vendor|\.github|\.claude)\/[A-Za-z0-9_./*-]*\.(?:json|html|yaml|yml|txt|md|js|sh)(?![A-Za-z0-9])/g;

/* the workflows: what CI itself is allowed to do (docs/BOUNDARY.md row 11, gap G4). A `taken:` label
   is crew mode's lock, and docs/story/el-changarrito.md R4a says nothing automated may ever gate on a
   label or a comment. Those two sentences are the same sentence the day a trigger reads one. */
const WRITE_OK = { 'pages.yml': ['pages', 'id-token'] };
function workflows(root) {
  const P = [];
  const dir = path.join(root, '.github', 'workflows');
  if (!fs.existsSync(dir)) return P;
  const files = fs.readdirSync(dir).filter(f => /\.ya?ml$/.test(f)).sort();
  if (!files.length) P.push('.github/workflows/ exists and holds no workflow — nothing to read is not a pass');
  files.forEach(f => {
    const src = fs.readFileSync(path.join(dir, f), 'utf8');
    const rel = '.github/workflows/' + f;
    if (!/^permissions:/m.test(src))
      P.push(rel + ' declares no permissions: block, so it runs with whatever GitHub hands it by default — ' +
             'a bad dependency in CI with a write token can push to main (docs/story/el-changarrito.md R9b)');
    /* Melo, 2026-09-13: the first draft read `^\s+scope: write$` and printed OK on `permissions: write-all`
       (no indent, no scope name) and on `contents: write  # to push the tag` (a trailing comment). Read
       every syntax GitHub accepts for saying what a workflow may write: the two words, the block form
       at any indent (job-level too), and the flow form `{contents: write}`. */
    const writes = [];
    if (/^\s*permissions:\s*write-all\b/m.test(src)) writes.push('write-all (every scope)');
    [...src.replace(/["']/g, '').matchAll(/^[ \t]+([a-z-]+)\s*:\s*write\b/gm)].forEach(m => writes.push(m[1]));
    [...src.matchAll(/permissions:\s*\{([^}]*)\}/g)].forEach(m => [...m[1].matchAll(/([a-z-]+)\s*:\s*write\b/g)].forEach(x => writes.push(x[1])));
    writes.forEach(scope => { if (!(WRITE_OK[f] || []).includes(scope))
      P.push(rel + ' asks for "' + scope + ': write" — CI never writes to this repository; the only write scopes ' +
             'allowed are the deploy\'s own (pages, id-token) in pages.yml, and this is not one of them'); });
    /* triggers live under `on:` and nowhere else — `permissions:` also has an `issues:` line, and the
       first run of this check read that one as a trigger. Read the block the noun lives in. */
    /* Melo, 2026-09-13: yamllint's truthy rule pushes people to write `"on":`, and `/^on:/` then reads
       nothing and prints a sentence claiming the opposite. The key may be quoted. */
    const on = (src.match(/^["']?on["']?:\n((?:[ \t]+.*\n?|\n)*)/m) || [])[1] || (/^["']?on["']?:\s*\[?\{?([^\n]*)/m.exec(src) || [])[1] || '';
    if (!/^["']?on["']?:/m.test(src)) P.push(rel + ' has no on: key this check can read — a workflow with no trigger it can see is not a workflow it has checked');
    /* Planted 2026-09-21 (finding CI-5), five shapes this missed: `on: {issue_comment: …}` (flow form, a
       brace before the name), `"pull_request_target":` (a quoted key), `workflow_run:` (runs in the
       base repo after a stranger's fork CI finishes), `repository_dispatch:`, and `contents: "write"`
       (a quoted value). Strip quotes before reading, and let a brace count as a word boundary. */
    const onBare = on.replace(/["']/g, '');
    /* GH-6 (2026-09-21): `${{ github.ref_name }}` spliced into a `run:` line is expanded BEFORE the
       shell parses it, and a git refname may carry `;` `$` and backticks. Every workflow value belongs
       in `env:` and is read as "$NAME". The R3 step already did it right; two others did not. */
    /* A block scalar (`run: |`) owns every following line indented DEEPER than the `run:` key; the
       first line at the key's indent or shallower ends it. The first draft ended it only at indent <6
       and so read the next step's env: lines as part of the previous run — three false reds. */
    let runIndent = -1;
    src.split('\n').forEach((line, i) => {
      const ind = (line.match(/^[ \t]*/) || [''])[0].length, blank = !line.trim();
      if (runIndent >= 0 && !blank && ind <= runIndent) runIndent = -1;
      const isRun = /^\s*-?\s*run:/.test(line);   /* `- run:` (a step that is only a run) and `run:` under a name */
      if ((isRun || runIndent >= 0) && /\$\{\{/.test(line))
        P.push(rel + ':' + (i + 1) + ' puts a ${{ }} expression inside a run: line — it is expanded before the shell reads it; put it under env: and use "$NAME"');
      if (isRun && /^\s*-?\s*run:\s*[|>][-+]?\s*$/.test(line)) runIndent = ind + (/^\s*-/.test(line) ? 2 : 0);
    });
    /* CI-3 / GH-4 (2026-09-21): an action named by a moving tag (`@v4`) is whatever that tag points at
       the day the job runs. pages.yml holds pages:write and id-token:write, so a retagged action there
       deploys whatever it likes. Pin to the 40-hex commit and keep the tag as a comment for humans. */
    [...src.matchAll(/^\s*-?\s*uses:\s*([^\s#]+)/gm)].forEach(m => {
      const ref = m[1], at = ref.split('@')[1] || '';
      if (!/^[0-9a-f]{40}$/.test(at)) P.push(rel + ' uses "' + ref + '" by a moving tag — pin it to the commit SHA (`git ls-remote --tags https://github.com/<action> <tag>`) and keep the tag in a trailing comment');
    });
    const trig = onBare.match(/(?:^|[\s\[,{])(pull_request_target|issue_comment|issues|label|discussion_comment|workflow_run|repository_dispatch)(?=\s*[:\],}]|$)/m);
    if (trig)
      P.push(rel + ' can be started by "' + trig[1] + '" — a trigger a label, a comment or an issue can pull. ' +
             'The claim label is a note for people and agents, never a trigger (docs/story/el-changarrito.md R4a)');
  });
  return P;
}

function consistency(root) {
  root = root || ROOT;
  const P = [];
  const reg = path.join(root, 'docs', 'BOUNDARY.md');
  const cites = [];
  const dirs = [path.join(root, '.claude', 'agents'), path.join(root, '.claude', 'skills')];
  const walk = d => { if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const f = path.join(d, e.name);
      if (e.isDirectory()) walk(f);
      else if (e.name.endsWith('.md')) (fs.readFileSync(f, 'utf8').match(CITE) || [])
        .forEach(p => { if (!p.includes('*')) cites.push({ p, f: path.relative(root, f) }); });
    } };
  dirs.forEach(walk);
  const seen = new Set();
  cites.forEach(({ p, f }) => { const k = p + '<' + f; if (seen.has(k)) return; seen.add(k);
    if (!fs.existsSync(path.join(root, p)))
      P.push(f + ' sends its reader to ' + p + ', and there is no such file in this repository — ' +
             'the step it names is one every reader of that persona has silently skipped'); });

  if (!fs.existsSync(reg)) {
    /* a missing register is only a failure if something claims it exists. Nothing to look at is not
       a pass (docs/GAUGE.md), so say which half of that we are in rather than exiting silently. */
    if (!cites.some(c => c.p === 'docs/BOUNDARY.md'))
      P.push('docs/BOUNDARY.md does not exist and this check has nothing to read — ' +
             'a boundary list nobody wrote cannot route anything to anybody');
    return P.concat(workflows(root));
  }
  const R = rows(fs.readFileSync(reg, 'utf8'));
  if (!R.length) P.push('docs/BOUNDARY.md has no rows a machine can read — the table is prose, so nothing routes');
  R.forEach(r => {
    const abs = path.join(root, r.path);
    if (!fs.existsSync(abs))
      P.push('docs/BOUNDARY.md guards "' + r.path + '" and there is no such file — ' +
             'a boundary that names a path nobody can touch protects nothing');
    r.who.split(/[,/]| and /).map(s => s.trim().toLowerCase().replace(/[`*]/g, '')).filter(Boolean)
      .forEach(w => { if (!fs.existsSync(path.join(root, '.claude', 'agents', w + '.md')))
        P.push('docs/BOUNDARY.md sends "' + r.path + '" to ' + w + ', and there is no .claude/agents/' + w + '.md to send it to'); });
    if (!/^\d{4}-\d{2}-\d{2}$/.test(r.since))
      P.push('the row for "' + r.path + '" carries no date — a guard is a promise and a promise has a date on it (.claude/agents/zeni.md)');
  });
  P.push(...completeness(root, R));
  P.push(...indexed(root));
  P.push(...secrets(root));
  P.push(...vendored(root));
  return P.concat(workflows(root));
}

/* ---- SEC-3 (2026-09-21): a token pasted ANYWHERE in a public repository is world-readable the moment it
   is pushed, and the run ledger asks every agent to paste "what was run and what it printed" into
   docs/runs/. test/public.js scans the built box and test/smoke.js R8 scans the public shell; docs/,
   test/, .github/ and scripts/ were scanned by nothing. This is detection after exposure — GitHub's
   push protection is the wire-level stop and only the owner can confirm it is on — but a red build is
   how the owner learns to rotate. Reads every tracked text file from `git ls-files`; reports the path
   and the shape, NEVER the value. */
const SECRET_SHAPES = [
  [/\bgh[pousr]_[A-Za-z0-9]{20,}/, 'a GitHub token'], [/\bgithub_pat_[A-Za-z0-9_]{20,}/, 'a fine-grained GitHub token'],
  [/\bsk-(?:ant-|proj-)?[A-Za-z0-9_-]{20,}/, 'an API key'], [/\bAKIA[0-9A-Z]{16}\b/, 'an AWS access key'],
  [/-----BEGIN (?:RSA |EC |OPENSSH |PGP )?PRIVATE KEY-----/, 'a private key'], [/\bxox[baprs]-[A-Za-z0-9-]{10,}/, 'a Slack token'],
  [/\bAIza[0-9A-Za-z_-]{35}\b/, 'a Google API key'],
];
function secrets(root) {
  root = root || ROOT; const P = [], tracked = [];
  /* the filesystem, not `git ls-files`: a fixture is not a repository, and a file that is not yet
     committed is a leak the moment somebody pushes it */
  const walk = d => { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['.git', 'node_modules', 'vendor', 'scratchpad', '_site'].includes(e.name)) continue;
    const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else tracked.push(path.relative(root, f)); } };
  try { walk(root); } catch (e) { return P; }
  tracked.filter(f => /\.(md|js|mjs|json|ya?ml|sh|html|css|txt|svg)$/.test(f) && f !== 'test/leaves.js').forEach(f => {
    let src; try { src = fs.readFileSync(path.join(root, f), 'utf8'); } catch (e) { return; }
    SECRET_SHAPES.forEach(([re, what]) => { const m = re.exec(src); if (m) {
      const line = src.slice(0, m.index).split('\n').length;
      P.push(f + ':' + line + ' holds what looks like ' + what + ' — this repository is public, so it is already readable: rotate it, then remove it'); } });
  });
  return P;
}

/* ---- CI-4 (2026-09-21): vendor/three.min.js is 608 KB of minified code and qr.js runs in every
   player's browser; a one-line change in either is invisible in a diff. test/vendor.sha256 is the
   thing a reviewer can check, and this recomputes it. It lives under test/ and not vendor/ because
   scripts/build-site.sh copies vendor/ whole into the public box — the first draft shipped a README
   and a hash file to every player (21 files in the box, not 19).
   Updating a library: replace the file, `sha256sum vendor/three.min.js qr.js > test/vendor.sha256`,
   and say in the commit where the new bytes came from. */
function vendored(root) {
  root = root || ROOT; const P = [], sums = path.join(root, 'test', 'vendor.sha256');
  if (!fs.existsSync(path.join(root, 'vendor')) && !fs.existsSync(path.join(root, 'qr.js'))) return P;   /* nothing vendored here (a fixture) */
  if (!fs.existsSync(sums)) { P.push('test/vendor.sha256 is missing — the two third-party files every player runs have no recorded hash'); return P; }
  const crypto = require('crypto');
  fs.readFileSync(sums, 'utf8').split('\n').filter(Boolean).forEach(line => {
    const [want, rel] = line.trim().split(/\s+/); if (!want || !rel) return;
    const abs = path.join(root, rel);
    if (!fs.existsSync(abs)) { P.push('test/vendor.sha256 names ' + rel + ' and there is no such file'); return; }
    const got = crypto.createHash('sha256').update(fs.readFileSync(abs)).digest('hex');
    if (got !== want) P.push(rel + ' does not match test/vendor.sha256 — the vendored bytes changed; if that was meant, re-run sha256sum and say in the commit where the new bytes came from');
  });
  return P;
}

/* ---- AND THE HALF THE OWNER ASKED FOR, 2026-09-20 ----
   "i was trying to find the project documents on my machine, can we make sure we have access to all
   these so i can review when you are offline/out of tokens?" The documents were already in his
   clone; what was missing was any page saying which of thirty-four files answers a given question.
   docs/INDEX.md is that page, and a hand-kept index is worthless the first time somebody writes a
   document and forgets it — the reader then believes they have seen everything, which is worse than
   no index at all.

   SO THE NOUN THIS READS IS THE FOLDER, NOT THE INDEX. Not "the index has N links" — a count whose
   noun is a line in a file is docs/REGRESSION.md §3's commonest shape, and it passes for ever while
   the newest document stays invisible. It walks docs/ and asks of each thing found: can he reach
   this from the index. A directory counts as reached when any link goes into it, because the index
   may point at one document inside a folder rather than the folder.

   Runs on every CI build: test/town.smoke.js requires consistency() (grep leaves.js').consistency). */
function indexed(root) {
  const P = [], D = path.join(root, 'docs'), idx = path.join(D, 'INDEX.md');
  if (!fs.existsSync(D)) return P;
  if (!fs.existsSync(idx)) {
    P.push('docs/INDEX.md does not exist, so nothing tells the owner which of these files answers his ' +
           'question — he asked for exactly this on 2026-09-20 and a folder listing is not an answer');
    return P;
  }
  const links = [...fs.readFileSync(idx, 'utf8').matchAll(/\]\(([^)\s#]+)/g)]
    .map(m => m[1]).filter(t => !/^[a-z]+:/i.test(t)).map(t => t.replace(/^\.\//, ''));
  const want = fs.readdirSync(D, { withFileTypes: true })
    .filter(e => e.name !== 'INDEX.md' && (e.isDirectory() || e.name.endsWith('.md')))
    .map(e => e.isDirectory() ? e.name + '/' : e.name);
  if (!want.length) {
    P.push('docs/ holds no documents at all — this check measured nothing, which docs/GAUGE.md says is not a pass');
    return P;
  }
  want.forEach(w => {
    const hit = w.endsWith('/') ? links.some(l => l === w || l.startsWith(w)) : links.includes(w);
    if (!hit) P.push('docs/' + w + ' exists and docs/INDEX.md does not reach it — the owner reads that index ' +
                     'when no session is running, so a document it leaves out is a document he will never open');
  });
  return P;
}

/* Melo, 2026-09-13: docs/BOUNDARY.md said the check reads the ledger's COMPLETENESS and it read only
   its soundness — delete the row for the file that holds the owner's token and it printed OK; add a
   new script that POSTs to api.github.com with a bearer and it printed OK. A denylist cannot know
   every edge, but three sets are nouns and can be derived: every file under .github/ (what CI runs),
   every path scripts/build-site.sh copies (what ships), and every source file that names the API host
   or an Authorization header (what carries a key). Each must be covered by a row. */
function completeness(root, R) {
  const P = [];
  const covered = p => R.some(r => r.path.endsWith('/') ? p.startsWith(r.path) : (p === r.path || (p.endsWith('/') && r.path.startsWith(p))));
  const need = (p, why) => { if (!covered(p)) P.push('docs/BOUNDARY.md has no row for ' + p + ' — ' + why); };
  const gh = path.join(root, '.github');
  const walk = d => { if (!fs.existsSync(d)) return; for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name); if (e.isDirectory()) walk(f); else need(path.relative(root, f), 'it runs in CI or writes into the deploy, and nothing routes a change to it'); } };
  walk(gh);
  const bs = path.join(root, 'scripts', 'build-site.sh');
  if (fs.existsSync(bs)) {
    const src = fs.readFileSync(bs, 'utf8');
    /* Finding SEC-6 (2026-09-21): the two regexes this used to carry — `for f in …;` and
       `cp -r "$ROOT/…"` — matched NOTHING in the script as written (`cp index.html sw.js … "$OUT/"`,
       `cp -r engine vendor "$OUT/"`), so zero paths were derived and a new private directory added to
       both the script and the tree would have needed no row. Read every cp line: every argument but
       the last is a thing that ships. Planted: adding `changarrito` to the cp -r line goes red. */
    src.split('\n').forEach(line => {
      const m = /^\s*cp\s+(?:-[a-zA-Z]+\s+)*(.+)$/.exec(line); if (!m) return;
      const args = m[1].trim().split(/\s+/).filter(a => !/^-/.test(a)); args.pop();
      args.forEach(a => { const p = a.replace(/^["']|["']$/g, ''); if (!p || /\$/.test(p)) return;
        const isDir = fs.existsSync(path.join(root, p)) && fs.statSync(path.join(root, p)).isDirectory();
        need(isDir ? p.replace(/\/?$/, '/') : p, 'scripts/build-site.sh copies it into the public build'); });
    });
  }
  let tracked = [];
  try { tracked = execFileSync('git', ['ls-files'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).split('\n').filter(Boolean); } catch (e) { return P; }
  tracked.filter(f => !/^(docs|test|node_modules|\.claude)\//.test(f) && /\.(js|html|sh|yml|yaml|json)$/.test(f)).forEach(f => {
    let src = ''; try { src = fs.readFileSync(path.join(root, f), 'utf8'); } catch (e) { return; }
    if (/api\.github\.com|\bAuthorization\b/.test(src)) need(f, 'it names the API host or an Authorization header, so it carries a key or reaches one'); });
  return P;
}

/* the same shape as test/bump.js, and for the same reason it was changed on 2026-09-12:
   on the desk the question is "what is about to ship", which is the working tree including
   untracked files; in CI the checkout is clean and the question really is what these commits did. */
function changedFiles(base, head) {
  const git = (...a) => execFileSync('git', a, { cwd: ROOT, encoding: 'utf8' });
  if (head && head !== 'HEAD') {
    try { return git('diff', '--name-only', base + '...' + head).split('\n').filter(Boolean); }
    catch (e) { return git('diff', '--name-only', base, head).split('\n').filter(Boolean); }
  }
  let from = base;
  try { from = git('merge-base', base, 'HEAD').trim() || base; } catch (e) {}
  const tracked = git('diff', '--name-only', from).split('\n').filter(Boolean);
  let untracked = [];
  try { untracked = git('ls-files', '--others', '--exclude-standard').split('\n').filter(Boolean); } catch (e) {}
  return [...new Set([...tracked, ...untracked])];
}

function touched(files, R) {
  const hit = [];
  R.forEach(r => { const m = files.filter(f => r.path.endsWith('/') ? f.startsWith(r.path) : f === r.path);
    if (m.length) hit.push({ row: r, files: m }); });
  return hit;
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args[0] === '--selftest') {
    const os = require('os'), t = fs.mkdtempSync(path.join(os.tmpdir(), 'leaves-'));
    const W = (p, s) => { fs.mkdirSync(path.dirname(path.join(t, p)), { recursive: true }); fs.writeFileSync(path.join(t, p), s); };
    const TABLE = (who, extra) => '| path | who | what it lets out | since |\n|---|---|---|---|\n| sw.js | ' + who + ' | every installed player | 2026-09-13 |\n' + (extra || '');
    const WF = '| .github/workflows/ci.yml | zeni | what CI runs | 2026-09-13 |\n| .github/workflows/pages.yml | zeni | the deploy | 2026-09-13 |\n';
    W('.claude/agents/zeni.md', 'Read docs/BOUNDARY.md and docs/GHOST.md and test/spots.json before you touch anything.\n');
    W('test/spots.json', '{}\n');
    let out = consistency(t);
    const cases = [];
    cases.push(['a persona citing a file that was never written', out.some(s => /GHOST\.md/.test(s))]);
    cases.push(['a .json citation is not read as a .js ghost', !out.some(s => /spots\.js\b/.test(s))]);
    W('docs/GHOST.md', 'x\n');
    W('docs/INDEX.md', '[GHOST.md](GHOST.md) [BOUNDARY.md](BOUNDARY.md)\n');   /* indexed(): a sound fixture lists what it has */
    W('docs/BOUNDARY.md', TABLE('zeni'));
    out = consistency(t);
    cases.push(['a row naming a path that is not in the repo', out.some(s => /guards "sw\.js"/.test(s))]);
    W('sw.js', 'x\n');
    W('docs/BOUNDARY.md', TABLE('nadie'));
    out = consistency(t);
    cases.push(['a row routed to an agent that does not exist', out.some(s => /nadie/.test(s))]);
    W('docs/BOUNDARY.md', '| path | who | what it lets out | since |\n|---|---|---|---|\n| sw.js | zeni | every installed player |  |\n');
    out = consistency(t);
    cases.push(['a row with no date', out.some(s => /no date/.test(s))]);
    W('docs/BOUNDARY.md', TABLE('zeni'));
    out = consistency(t);
    cases.push(['a sound register says nothing', out.length === 0]);
    W('docs/BOUNDARY.md', TABLE('zeni', WF));
    W('.github/workflows/ci.yml', 'name: CI\non:\n  push:\n  pull_request:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a workflow with no permissions block', out.some(s => /declares no permissions/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions:\n  contents: write\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a workflow asking for contents: write', out.some(s => /contents: write/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions:\n  contents: read\non:\n  push:\n  issue_comment:\n    types: [created]\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a workflow a comment can start', out.some(s => /issue_comment/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions: write-all\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['permissions: write-all', out.some(s => /write-all/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions:\n  contents: write   # to push the release tag\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a write scope followed by a comment', out.some(s => /contents: write/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions: {contents: write}\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a write scope in flow form', out.some(s => /contents: write/.test(s))]);
    W('.github/workflows/ci.yml', 'name: CI\npermissions:\n  contents: read\n"on":\n  push:\n  issue_comment:\n    types: [created]\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['a comment trigger under a quoted on: key', out.some(s => /issue_comment/.test(s))]);
    W('.github/workflows/pages.yml', 'name: Pages\npermissions:\n  contents: read\n  pages: write\n  id-token: write\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    W('.github/workflows/ci.yml', 'name: CI\npermissions:\n  contents: read\non:\n  push:\n  pull_request:\njobs:\n  x:\n    runs-on: ubuntu-latest\n');
    out = consistency(t);
    cases.push(['the deploy\'s own write scopes are allowed, and only in pages.yml', out.length === 0]);
    /* 2026-09-21 — the shapes finding CI-5 planted and this missed, each now red on a fixture */
    const OKWF = 'name: CI\npermissions:\n  contents: read\non:\n  push:\njobs:\n  x:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4\n';
    W('.github/workflows/ci.yml', OKWF.replace('on:\n  push:\n', 'on: {issue_comment: {types: [created]}}\n'));
    out = consistency(t); cases.push(['a comment trigger in flow form with braces', out.some(s => /issue_comment/.test(s))]);
    W('.github/workflows/ci.yml', OKWF.replace('  push:\n', '  "pull_request_target":\n'));
    out = consistency(t); cases.push(['a quoted pull_request_target key', out.some(s => /pull_request_target/.test(s))]);
    W('.github/workflows/ci.yml', OKWF.replace('  push:\n', '  workflow_run:\n    workflows: [CI]\n'));
    out = consistency(t); cases.push(['workflow_run — runs in the base repo after a stranger\'s fork CI', out.some(s => /workflow_run/.test(s))]);
    W('.github/workflows/ci.yml', OKWF.replace('  push:\n', '  repository_dispatch:\n'));
    out = consistency(t); cases.push(['repository_dispatch', out.some(s => /repository_dispatch/.test(s))]);
    W('.github/workflows/ci.yml', OKWF.replace('contents: read', 'contents: "write"'));
    out = consistency(t); cases.push(['a quoted write value', out.some(s => /contents: write/.test(s))]);
    /* GH-6: an expression spliced into a run: line, block form and single line; and an env: line is fine */
    W('.github/workflows/ci.yml', OKWF + '      - run: |\n          git fetch origin "${{ github.base_ref }}"\n');
    out = consistency(t); cases.push(['${{ }} inside a run: | block', out.some(s => /inside a run: line/.test(s))]);
    W('.github/workflows/ci.yml', OKWF + '      - run: echo "${{ github.ref_name }}"\n');
    out = consistency(t); cases.push(['${{ }} on a single run: line', out.some(s => /inside a run: line/.test(s))]);
    W('.github/workflows/ci.yml', OKWF + '      - env:\n          REF: ${{ github.ref_name }}\n        run: |\n          echo "$REF"\n      - name: next\n        env:\n          X: ${{ github.sha }}\n        run: echo ok\n');
    out = consistency(t); cases.push(['an expression under env: is not a run: line, even right after a block', !out.some(s => /inside a run: line/.test(s))]);
    /* CI-3: a moving tag; and a pinned SHA with a trailing comment is fine */
    W('.github/workflows/ci.yml', OKWF.replace('actions/checkout@11d5960a326750d5838078e36cf38b85af677262  # v4', 'actions/checkout@v4'));
    out = consistency(t); cases.push(['an action used by a moving tag', out.some(s => /moving tag/.test(s))]);
    W('.github/workflows/ci.yml', OKWF);
    out = consistency(t); cases.push(['a SHA-pinned action with its tag in a comment is green', !out.some(s => /moving tag/.test(s))]);
    /* SEC-3: a token shape in a file that never ships */
    W('docs/runs/2026-09-21-x-0000.md', 'Evidence: curl -H "Authorization: Bearer ghp_' + 'a'.repeat(30) + '"\n');
    W('docs/INDEX.md', '[GHOST.md](GHOST.md) [BOUNDARY.md](BOUNDARY.md) [runs/](runs/)\n');
    out = consistency(t); cases.push(['a GitHub token pasted into a run ledger', out.some(s => /looks like a GitHub token/.test(s))]);
    cases.push(['…and the value itself is never printed', !out.some(s => /ghp_a{30}/.test(s))]);
    fs.unlinkSync(path.join(t, 'docs/runs/2026-09-21-x-0000.md'));
    /* CI-4: the vendored bytes drift from the recorded hash */
    W('test/vendor.sha256', 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855  qr.js\n');
    W('qr.js', 'not empty\n');
    out = consistency(t); cases.push(['a vendored file whose hash moved', out.some(s => /does not match test\/vendor\.sha256/.test(s))]);
    W('qr.js', ''); out = consistency(t); cases.push(['…and the same file matching is green', !out.some(s => /vendor\.sha256/.test(s))]);
    /* SEC-6: build-site.sh read as written — a private directory added to the cp line needs a row */
    W('scripts/build-site.sh', 'cp index.html sw.js "$OUT/"\ncp -r engine changarrito "$OUT/"\n');
    W('changarrito/index.html', 'x\n'); W('engine/engine.js', 'x\n'); W('index.html', 'x\n');
    out = consistency(t); cases.push(['a directory added to the copy line with no boundary row', out.some(s => /no row for changarrito\//.test(s))]);
    fs.unlinkSync(path.join(t, 'scripts/build-site.sh'));
    /* completeness: the three derivable sets must each be covered by a row */
    W('.github/scripts/post-status.js', 'fetch("https://api.github.com/x",{headers:{Authorization:"Bearer x"}})\n');
    out = consistency(t);
    cases.push(['a new file under .github/ with no row', out.some(s => /post-status\.js/.test(s))]);
    fs.rmSync(path.join(t, '.github', 'scripts'), { recursive: true, force: true });
    W('tool/poster.js', 'fetch("https://api.github.com/x",{headers:{Authorization:"Bearer x"}})\n');
    const q = { cwd: t, stdio: ['ignore', 'ignore', 'ignore'] };
    try { execFileSync('git', ['init', '-q'], q); execFileSync('git', ['add', '-A'], q); } catch (e) {}
    out = consistency(t);
    cases.push(['a tracked source file that reaches the API with no row', out.some(s => /tool\/poster\.js/.test(s))]);
    fs.rmSync(path.join(t, 'tool'), { recursive: true, force: true }); try { execFileSync('git', ['add', '-A'], q); } catch (e) {}
    const R = rows(fs.readFileSync(path.join(t, 'docs', 'BOUNDARY.md'), 'utf8'));
    cases.push(['a diff that touches the row is seen', touched(['sw.js', 'docs/OPEN.md'], R).length === 1]);
    cases.push(['a diff that touches nothing on the list is quiet', touched(['docs/OPEN.md'], R).length === 0]);
    fs.rmSync(t, { recursive: true, force: true });
    const bad = cases.filter(c => !c[1]);
    bad.forEach(c => console.log('SELFTEST FAIL — ' + c[0]));
    if (bad.length) process.exit(1);
    console.log('OK — ' + cases.length + ' cases, including the three that were red on main the day this was written and the six Melo walked past that afternoon.');
    process.exit(0);
  }
  if (!args.length) {
    const P = consistency();
    if (P.length) { console.log('FAIL\n- ' + P.join('\n- ')); process.exit(1); }
    console.log('OK — every path the boundary register names is real, every reviewer it names exists, nothing in .claude/ points at a file that was never written, and no workflow can be started by a label or a comment.');
    process.exit(0);
  }
  const R = fs.existsSync(REG) ? rows(fs.readFileSync(REG, 'utf8')) : [];
  if (!R.length) { console.log('docs/BOUNDARY.md has no rows a machine can read, so this cannot say which edges moved. Run `node test/leaves.js` for why.'); process.exit(0); }
  const files = changedFiles(args[0], args[1]);
  const hit = touched(files, R);
  if (!hit.length) {
    console.log('0 of ' + R.length + ' boundary paths touched, across ' + files.length + ' changed file(s). That is not "nothing left town" — ' +
                'the list can only name yesterday\'s edges. Step 5½ is still three questions; this answers one of them.');
    process.exit(0);
  }
  console.log('This change touches ' + hit.length + ' of ' + R.length + ' paths on the boundary list:');
  hit.forEach(h => console.log('- ' + h.files.join(', ') + ' — ' + h.row.lets + ' → ' + h.row.who + ' must see this'));
  console.log('Not a failure. Nobody can edit their way out of this sentence; it is a routing slip, and the review is the gate. Melo plants against whatever guard you add.');
  process.exit(0);
}
module.exports = { consistency, touched, rows, changedFiles, workflows, indexed, secrets, vendored };
