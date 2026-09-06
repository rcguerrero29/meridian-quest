#!/usr/bin/env node
/* R3 — a PR's "Closes" list is checked against the issues it names (docs/REGRESSION.md).
   On 2026-09-05 a PR body said "Closes #24" and closed the error-log issue instead of the
   storage-keys one; nothing read the number back. This does, in CI, before a merge can:
   every `Closes|Fixes|Resolves #N` in the PR body must name an OPEN ISSUE (not a PR) whose
   title is echoed in the PR body or its diff, or whose number is mentioned again outside the
   closing line. A number that names a closed issue, a pull request, or an issue the PR never
   otherwise talks about fails the build.

   CI:   PR_BODY, GITHUB_REPOSITORY, GITHUB_TOKEN in the env; the diff on stdin or --diff-file.
   Local: node test/closes.js --selftest   (no network — a fake ledger, the cases below). */
const fs = require('fs');

const CLOSE_RE = /\b(?:close|closes|closed|fix|fixes|fixed|resolve|resolves|resolved)\s+#(\d+)/gi;

/* the words of a title that matter: no ❗, no punctuation, lowercase, the first four */
function keyWords(title) {
  return String(title || '').replace(/[❗"“”‘’'`*_—–-]/g, ' ').toLowerCase().split(/[^a-z0-9áéíóúñü]+/).filter(w => w.length > 2).slice(0, 4);
}

async function check(body, diff, fetchIssue) {
  const problems = [], seen = new Set();
  const text = (body + '\n' + diff).toLowerCase();
  let m;
  while ((m = CLOSE_RE.exec(body))) {
    const n = m[1];
    if (seen.has(n)) continue; seen.add(n);
    let issue;
    try { issue = await fetchIssue(n); } catch (e) { problems.push(`#${n}: could not be read (${e.message})`); continue; }
    if (!issue) { problems.push(`#${n}: no such issue`); continue; }
    if (issue.pull_request) { problems.push(`#${n} is a pull request, not an issue — "Closes" would close the wrong thing`); continue; }
    if (issue.state !== 'open') { problems.push(`#${n} is already ${issue.state} ("${issue.title}")`); continue; }
    const words = keyWords(issue.title);
    const titled = words.length >= 2 && words.every(w => text.includes(w));
    const bodyWithoutClosers = body.replace(CLOSE_RE, ' ');
    const mentionedAgain = new RegExp('#' + n + '\\b').test(bodyWithoutClosers);
    if (!titled && !mentionedAgain)
      problems.push(`#${n} ("${issue.title}") is closed by this PR but neither its title nor its number appears anywhere else in the PR body or diff — is it the right issue?`);
  }
  return problems;
}

async function ghIssue(repo, token, n) {
  const r = await fetch(`https://api.github.com/repos/${repo}/issues/${n}`, {
    headers: Object.assign({ Accept: 'application/vnd.github+json', 'User-Agent': 'meridian-quest-closes-check' }, token ? { Authorization: 'Bearer ' + token } : {}) });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error('HTTP ' + r.status);
  return r.json();
}

async function selftest() {
  const ledger = {
    24: { state: 'open', title: 'Error log — 3D failure is swallowed in four places and leaves no trace' },
    26: { state: 'open', title: 'Storage keys — every localStorage key goes through one prefix' },
    30: { state: 'closed', title: 'The portability guard\'s NAMES list omits "meridian"' },
    35: { state: 'open', title: 'Part 1 — los cimientos', pull_request: { url: 'x' } }
  };
  const fake = async n => ledger[n] || null;
  const cases = [
    ['the 2026-09-05 mistake: Closes #24 in a PR about storage keys', 'Closes #24\n\nEvery localStorage key now goes through SK().', '+const SK=k=>...', 1],
    ['the right number: the title is echoed in the body', 'Closes #26\n\nStorage keys: every localStorage key goes through one prefix now.', '', 0],
    ['the right number: mentioned again outside the closing line', 'Closes #24\n\nSee #24 for the four places the error log was swallowed.', '', 0],
    ['a closed issue', 'Fixes #30\n\nthe portability guard NAMES list', '', 1],
    ['a pull request', 'Resolves #35\n\npart 1 los cimientos', '', 1],
    ['no such issue', 'Closes #999', '', 1],
    ['no closers at all', 'A PR that closes nothing.', '', 0],
    ['title words found in the diff, not the body', 'Closes #26', '+/* storage keys: every localStorage key goes through one prefix */', 0]
  ];
  let bad = 0;
  for (const [name, body, diff, want] of cases) {
    const got = (await check(body, diff, fake)).length;
    const ok = (want === 0) === (got === 0);
    console.log((ok ? 'ok   ' : 'FAIL ') + name + (ok ? '' : ` — wanted ${want ? 'a problem' : 'no problem'}, got ${got}`));
    if (!ok) bad++;
  }
  if (bad) { console.log('FAIL — ' + bad + ' selftest case(s)'); process.exit(1); }
  console.log('OK — the Closes check tells the right issue from the wrong one');
}

(async () => {
  const args = process.argv.slice(2);
  if (args.includes('--selftest')) return selftest();
  const body = process.env.PR_BODY || '';
  const df = args[args.indexOf('--diff-file') + 1];
  const diff = args.includes('--diff-file') && df ? fs.readFileSync(df, 'utf8') : (process.stdin.isTTY ? '' : fs.readFileSync(0, 'utf8'));
  const repo = process.env.GITHUB_REPOSITORY, token = process.env.GITHUB_TOKEN || '';
  if (!repo) { console.error('GITHUB_REPOSITORY is not set'); process.exit(2); }
  const problems = await check(body, diff, n => ghIssue(repo, token, n));
  if (problems.length) { console.log('FAIL\n- ' + problems.join('\n- ')); process.exit(1); }
  console.log('OK — every issue this PR closes is open, is an issue, and is the one the PR talks about');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
