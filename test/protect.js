#!/usr/bin/env node
/* THE LOCK ON MAIN — is it still on?
   The owner, 2026-09-24: "cybersecurity should be key always."

   docs/SECURITY.md §3 step 1 — a ruleset on `main` — was written on 2026-09-21 as the first thing to do,
   and it sat undone for three days because nothing read the live setting; every document said what
   SHOULD be on. It went on that night (ruleset `main-lock`). This reads GitHub's live answer for the
   branch, so the day it is switched off or weakened, a check goes red on every push and every PR.

   Run:  node test/protect.js                  live: GET /repos/<repo>/rules/branches/main
         node test/protect.js --rules <file>   judge a saved answer instead (how a plant is run)
         node test/protect.js --selftest       the red cases, on fixtures, no network

   In CI the live read is its own job, `protection`, and is deliberately NOT a required check: a GitHub
   API hiccup must not be able to block the owner's merges. The self-test runs inside `smoke`, which
   is required, because it needs no network.

   WHAT THIS CANNOT SEE, said once and plainly: the ruleset's bypass list is not shown to a reader
   without admin rights, and the rules endpoint does not return it. An empty bypass list is checked by
   the owner in Settings → Rules, and by nothing here. */
const fs = require('fs');
const path = require('path');

/* GitHub Actions' own app id. Read off this repository's check runs on 2026-09-24 (`smoke`, app
   `github-actions`, 15368), not assumed. Pinning the required check to it is what stops anything with
   a write token from reporting `smoke = success` by itself (docs/SECURITY.md §3). */
const ACTIONS_APP = 15368;

/* The check main must wait for is the CI job that runs every suite. Its name is READ from ci.yml,
   never typed here: rename the job and the ruleset waits for a check that never reports, and a guard
   holding its own copy of the name would stay green while that happened (the guard skill, "it
   supplies its own inputs"). */
function requiredJob(root) {
  let src;
  try { src = fs.readFileSync(path.join(root, '.github/workflows/ci.yml'), 'utf8'); } catch (e) { return null; }
  const m = src.match(/^jobs:\s*\n(?:\s*#.*\n)*\s+([A-Za-z0-9_-]+):/m);
  return m ? m[1] : null;
}

function judge(rules, job) {
  const P = [];
  const say = s => P.push(s);
  if (!Array.isArray(rules)) {
    say('GitHub did not answer with a list of rules for main, so this check cannot tell a protected main from a bare one — that is a red, not a pass');
    return P;
  }
  if (!job) {
    say('could not read the first job in .github/workflows/ci.yml, so this check does not know which CI check main must wait for — that is a red, not a pass');
    return P;
  }
  if (!rules.length) {
    say('main has no protection at all: anyone with write access can push straight to it, rewrite it or delete it, and nothing waits for CI. Switch it back on — docs/SECURITY.md §3 step 1');
    return P;
  }
  const of = t => rules.filter(r => r && r.type === t);
  if (!of('deletion').length) say('main can be deleted — the "restrict deletions" rule is gone');
  if (!of('non_fast_forward').length) say('main can be force-pushed, so its history can be rewritten — the "block force pushes" rule is gone');
  const pr = of('pull_request');
  if (!pr.length) say('a change can reach main without a pull request — the "require a pull request" rule is gone');
  else if (pr.some(r => (((r.parameters || {}).required_approving_review_count) | 0) > 0))
    say('main now requires an approving review. Every PR here is authored under the owner\'s account and GitHub will not let him approve his own, so this locks him out of every merge — docs/SECURITY.md §3, "the one-human trap"');
  const sc = of('required_status_checks');
  if (!sc.length) { say('main no longer waits for CI — the "require status checks" rule is gone, so a red build can merge'); return P; }
  const checks = [].concat(...sc.map(r => ((r.parameters || {}).required_status_checks) || []));
  const mine = checks.filter(c => c && c.context === job);
  if (!mine.length)
    say('main waits for ' + (checks.length ? checks.map(c => '"' + c.context + '"').join(', ') : 'no check at all') + ' but not for "' + job + '", the CI job that runs every suite — so a red suite can merge');
  else if (!mine.some(c => c.integration_id === ACTIONS_APP))
    say('the "' + job + '" check main waits for is not pinned to GitHub Actions, so anything holding a write token could report it green by itself — docs/SECURITY.md §3');
  if (!sc.some(r => (r.parameters || {}).strict_required_status_checks_policy === true))
    say('main no longer requires a branch to be up to date before merging, so CI passes on each PR alone and never on what two of them make together');
  return P;
}

async function live(repo, token) {
  const url = 'https://api.github.com/repos/' + repo + '/rules/branches/main';
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'meridian-quest-protect' };
  if (token) headers.Authorization = 'Bearer ' + token;   // the workflow's own read-only token; never printed
  let res = await fetch(url, { headers });
  /* The rules of a public repository are public. If the token is refused (a stand-in token in a
     container, a scope GitHub does not accept here), ask once without it — and if that fails too, red. */
  if ((res.status === 401 || res.status === 403) && headers.Authorization) {
    delete headers.Authorization;
    res = await fetch(url, { headers });
  }
  if (!res.ok) throw new Error('GitHub answered HTTP ' + res.status + ' for the rules of main');
  return res.json();
}

function selftest() {
  const GOOD = [
    { type: 'deletion' },
    { type: 'non_fast_forward' },
    { type: 'pull_request', parameters: { required_approving_review_count: 0 } },
    { type: 'required_status_checks', parameters: { strict_required_status_checks_policy: true,
      required_status_checks: [{ context: 'smoke', integration_id: ACTIONS_APP }] } },
  ];
  const without = t => GOOD.filter(r => r.type !== t);
  const withParams = (t, p) => GOOD.map(r => r.type === t ? Object.assign({}, r, { parameters: Object.assign({}, r.parameters, p) }) : r);
  const cases = [
    ['the lock as it was switched on is green', GOOD, 'smoke', 0],
    ['an extra rule on top is still green', GOOD.concat([{ type: 'required_linear_history' }]), 'smoke', 0],
    ['no rules at all', [], 'smoke', 1],
    ['GitHub answered something that is not a list', { message: 'Not Found' }, 'smoke', 1],
    ['the CI job could not be read', GOOD, null, 1],
    ['deletion allowed', without('deletion'), 'smoke', 1],
    ['force-push allowed', without('non_fast_forward'), 'smoke', 1],
    ['no pull request required', without('pull_request'), 'smoke', 1],
    ['one approval required — the owner is locked out', withParams('pull_request', { required_approving_review_count: 1 }), 'smoke', 1],
    ['CI not required at all', without('required_status_checks'), 'smoke', 1],
    ['the required check is not pinned to GitHub Actions', withParams('required_status_checks', { required_status_checks: [{ context: 'smoke' }] }), 'smoke', 1],
    ['the required check is pinned to some other app', withParams('required_status_checks', { required_status_checks: [{ context: 'smoke', integration_id: 1 }] }), 'smoke', 1],
    ['up to date no longer required', withParams('required_status_checks', { strict_required_status_checks_policy: false }), 'smoke', 1],
    ['the CI job was renamed and the rule still names the old one', GOOD, 'build', 1],
  ];
  const bad = [];
  cases.forEach(([what, rules, job, want]) => {
    const got = judge(rules, job).length ? 1 : 0;
    const ok = got === want;
    console.log((ok ? '  ok   ' : '  FAIL ') + what + (ok ? '' : '  (wanted ' + (want ? 'red' : 'green') + ', got ' + (got ? 'red' : 'green') + ')'));
    if (!ok) bad.push(what);
  });
  /* and the job name really is read from the file: this repository's own ci.yml must yield one */
  const job = requiredJob(path.join(__dirname, '..'));
  if (!job) { console.log('  FAIL ci.yml yields no job name'); bad.push('ci.yml'); }
  else console.log('  ok   the job main must wait for, read from ci.yml: "' + job + '"');
  if (bad.length) { console.log('FAIL — ' + bad.length + ' of ' + (cases.length + 1)); process.exit(1); }
  console.log('OK — ' + (cases.length + 1) + ' cases, on fixtures, no network.');
  process.exit(0);
}

if (require.main === module) {
  if (process.argv.includes('--selftest')) selftest();
  const root = path.join(__dirname, '..');
  const job = requiredJob(root);
  const i = process.argv.indexOf('--rules');
  const report = rules => {
    const P = judge(rules, job);
    if (P.length) { console.log('FAIL'); P.forEach(p => console.log('- ' + p)); process.exit(1); }
    console.log('OK — main is locked: no deletion, no force-push, every change through a pull request with no approval that could lock the owner out, and "' + job + '" from GitHub Actions required on an up-to-date branch. (The bypass list is not visible to this check; the owner sees it in Settings → Rules.)');
    process.exit(0);
  };
  if (i > 0) {
    let rules;
    try { rules = JSON.parse(fs.readFileSync(process.argv[i + 1], 'utf8')); }
    catch (e) { console.log('FAIL\n- could not read the saved rules file (' + e.message + ') — that is a red, not a pass'); process.exit(1); }
    report(rules);
  } else {
    const repo = process.env.GITHUB_REPOSITORY || 'rcguerrero29/meridian-quest';
    live(repo, process.env.GITHUB_TOKEN).then(report, e => {
      console.log('FAIL\n- could not read main\'s rules from GitHub (' + e.message + '), so this check cannot say main is protected — that is a red, not a pass');
      process.exit(1);
    });
  }
}

module.exports = { judge, requiredJob };
