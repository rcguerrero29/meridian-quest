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
    [...src.matchAll(/^[ \t]+([a-z-]+)\s*:\s*write\b/gm)].forEach(m => writes.push(m[1]));
    [...src.matchAll(/permissions:\s*\{([^}]*)\}/g)].forEach(m => [...m[1].matchAll(/([a-z-]+)\s*:\s*write\b/g)].forEach(x => writes.push(x[1])));
    writes.forEach(scope => { if (!(WRITE_OK[f] || []).includes(scope))
      P.push(rel + ' asks for "' + scope + ': write" — CI never writes to this repository; the only write scopes ' +
             'allowed are the deploy\'s own (pages, id-token) in pages.yml, and this is not one of them'); });
    /* triggers live under `on:` and nowhere else — `permissions:` also has an `issues:` line, and the
       first run of this check read that one as a trigger. Read the block the noun lives in. */
    /* Melo, 2026-09-13: yamllint's truthy rule pushes people to write `"on":`, and `/^on:/` then reads
       nothing and prints a sentence claiming the opposite. The key may be quoted. */
    const on = (src.match(/^["']?on["']?:\n((?:[ \t]+.*\n?|\n)*)/m) || [])[1] || (/^["']?on["']?:\s*\[?([^\n]*)/m.exec(src) || [])[1] || '';
    if (!/^["']?on["']?:/m.test(src)) P.push(rel + ' has no on: key this check can read — a workflow with no trigger it can see is not a workflow it has checked');
    const trig = on.match(/(?:^|[\s\[,])(pull_request_target|issue_comment|issues|label|discussion_comment)(?=\s*[:\],]|$)/m);
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
  return P.concat(workflows(root));
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
    const m = src.match(/^\s*for f in ([^;\n]+);/m);
    (m ? m[1].trim().split(/\s+/) : []).forEach(p => need(p, 'scripts/build-site.sh copies it into the public build'));
    [...src.matchAll(/cp -r "\$ROOT\/([A-Za-z0-9_./-]+)"/g)].forEach(x => need(x[1].replace(/\/?$/, '/'), 'scripts/build-site.sh copies it into the public build'));
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
module.exports = { consistency, touched, rows, changedFiles, workflows };
