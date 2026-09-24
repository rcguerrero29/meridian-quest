# Security — settings over sentences

> *"ensure we take into account cybersecurity best practices ma frend even with agents- i know yall
> are all knowing but this needs to be tight locked so other random agents cant come into our show
> and ruin it yo!"* — the owner, `docs/ASKS.md`, 2026-09-20

*Written 2026-09-21 from a review run as a workflow: five lenses over the real repository produced
42 findings; each was sent to two skeptics whose job was to refute it. **22 survived both** and are
the spine of this page; one (GH-9) was refuted; 19 were never checked because the run hit the
account's session limit, and each of those was re-read against the file it cites before anything from
it appears here, marked **[unverified]**. A critic then read the plan and found eighteen things wrong
or missing; every one is folded in. Tags per `docs/SOURCES.md`: `[CODE]` names a path and the
identifier to grep, never a line number; `[FACT]` is what the GitHub API returned on 2026-09-20/21;
`[WEB]` carries its URL; `[TRAINING]` is opinion.*

---

## 1 · The one sentence

**`main` is unprotected, so every "the owner merges" rule in this repository is a sentence, not a
mechanism.** `[FACT]` `protected: false`, required status checks `off`, no ruleset, no CODEOWNERS in
force, one collaborator (the owner, admin).

What that means today: any credential with write can `git push origin HEAD:main` and nothing on
GitHub's side refuses it. `pages.yml` fires on `push: branches: [main]` with no dependency on CI
`[CODE]` `.github/workflows/pages.yml` `on:` — the five suites in `ci.yml` run *beside* the deploy,
not before it, so a push that fails every suite still publishes to every player within a minute, and
`sw.js` carries it to installed devices on the next bump. The credential that can do this is not
hypothetical: **every Claude Code session already pushes under the owner's own grant** — every push
actor and PR author on this repository is `rcguerrero29` while most recent commits are authored
`Claude` `[CODE]` `git log --format='%an|%cn'`. A prompt-injected Claude session could do it now; a
future Gemini or ChatGPT could do it the day it gets a token.

The skeptics moved this from *critical* to **high** for one honest reason: the history shows he has
in fact always merged through a pull request (`git log --first-parent origin/main` — every commit on
`main` is his merge). **The rule has been obeyed. It has never been enforced.** This page is the
difference.

---

## 2 · Three attackers, and what each can do today

### A stranger with no credential

| | |
|---|---|
| **Can do** | Fork the repo and open a pull request whose diff, body, commit messages and files are theirs. **Comment on any issue, including yours** — `CLAUDE.md` tells a session to read and answer a *"más contexto"* comment and, until today, said nothing about who wrote it. Open issues nobody may act on. |
| **Already stops them** | `ci.yml` runs a fork's PR with a read-only token and no repository secrets `[CODE]` `permissions:`. `test/leaves.js` fails the build on the five triggers that would hand a stranger a real token, and since today on `workflow_run` and `repository_dispatch` too. The town filters twice: `record.js` `mine()` keeps only your issues and comments; `loadPulls` drops any PR from another repo. `pages.yml` never runs for a fork. |
| **Does not stop them** | An *agent* reading the stranger's comment or fork diff as instructions. That is closed today by `test/issue.js` (§4) and two lines in `AGENTS.md` (§5). A green check on a fork PR is the stranger's own green — CI and the tests run from the PR's head — so it buys nothing but your trust. |

### An authorised second agent, careless or injected, holding write

| | |
|---|---|
| **Can do** | Push straight to `main` and deploy (§1). Merge its own PR — write may merge when no rule requires review. Force-push or delete any branch, `claude/*` included; `AGENTS.md` §3 forbids it and a token has never heard of a namespace. Edit `ci.yml`, `test/leaves.js` and `scripts/build-site.sh` **in the same commit** that widens what ships — every guard here runs *from the commit it is judging*. Edit `AGENTS.md`, `CLAUDE.md`, the personas, `docs/ASKS.md`, `docs/NEXT-SESSION.md` — ordinary files. With issues write: close, relabel or rewrite every issue, and **edit the body of one you wrote** while `user.login` stays yours. Paste a token into `docs/runs/…` under *Evidence*. Change one line inside 608 KB of `vendor/three.min.js` — unreadable in a diff, green in every suite. Put a script in `changarrito/` or `engine/` that spends your Issues key the next time you `git pull` and open the town. **And if its token was minted on your account, all of that reads as you** — to `city-record.js`, to the town's `mine()`, to *"act only on issues whose author is rcguerrero29"*, to *"the binding record is the issue he closes"*. |
| **Already stops them** | Nothing mechanical on `main`. `test/leaves.js` keeps **CI's own** token read-only, which is a different attacker. `test/runs.js` reads the agent's `Co-Authored-By` trailer and calls itself a tripwire, not a vault. |
| **Does not stop them** | Everything above, until §3 exists. |

### A compromised CI dependency

| | |
|---|---|
| **Can do** | In `ci.yml`: `npm install playwright@1.63.0` with no lockfile — a poisoned package runs with a read-only token on public source and can do one thing: print OK on a broken build. In `pages.yml`: until today five GitHub-authored actions were named by moving tag while that job holds `pages: write`; a moved tag ran *after* the box was checked and could publish anything. |
| **Already stops them** | Read-only permissions in `ci.yml`; `leaves.js` `WRITE_OK`; only `actions/*` is used; no third-party secret exists; **all five actions are now pinned to commit SHAs** (§4). |
| **Does not stop them** | `test/public.js` checks the box for *private* things, not for a trojaned `engine/`. The composite `upload-pages-artifact` pins its own inner `upload-artifact` by tag and this repo cannot reach it. Low, and said so. |

---

## 3 · What you flip, in order

*GitHub settings. Only you can change any of these; no token in this plan can. **Until step 1 is
done nothing else on this page matters** — not the guards, not the token, not the contract.*

### Step 1 · A ruleset on `main` with no bypass — five minutes

**✅ Done 2026-09-24** (ruleset `main-lock`, switched on by the owner with one `gh api` call and read back from the
live rules endpoint: no bypass, deletion and force-push blocked, a PR with 0 approvals, `smoke` pinned to GitHub
Actions on an up-to-date branch). **Guarded since the same night by `test/protect.js`** — CI job `protection`,
live, not required; its red cases inside `smoke`. It sat undone for three days before that because nothing
read the live setting.

**Settings → Rules → Rulesets → New ruleset → New branch ruleset.** *Not* the older *Settings →
Branches* page: there, leaving *Do not allow bypassing* unticked lets an admin skip **everything,
status checks included, silently.* A ruleset records every bypass and you choose per ruleset who may.

- Name `main-lock`. Enforcement **Active**. **Bypass list: empty.** That is the whole point.
- Target: **Include default branch**.
- Tick exactly: **Restrict deletions** · **Block force pushes** · **Require a pull request before
  merging** with required approvals **0** · **Require status checks to pass** → add `smoke`.
- **When you add `smoke`, set its source to *GitHub Actions*.** The critic's first finding: a classic
  token with `repo` scope includes *Commit statuses: write*, and GitHub's own docs say any write
  credential *"can set the state of any status check"* if the required check's source is *any*
  `[WEB]` https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/troubleshooting-required-status-checks — a machine
  user could POST `smoke = success` and satisfy this ruleset by itself. Pin the source.
- **Tick *Require branches to be up to date before merging*.** The plan first left it off as friction;
  the critic is right that without it `smoke` ran on the PR head and never on the merge result, so two
  individually green PRs could deploy an untested combination. One extra "Update branch" click per
  PR is the price.

The check is named `smoke` because that is the job id in `ci.yml` and the job has no `name:`
`[CODE]` `jobs: smoke:`. Rename the job and the rule requires a check that never reports — it fails
**closed**, blocking every merge rather than opening one.

**What it closes:** a push to `main`, a force-push, a deletion, and a merge on red — **from everyone,
you and Claude included.** The five suites stop being a shared truth by contract and become the thing
the merge button waits for.

**The one-human trap, precisely.** Do **not** put *required approvals: 1* in this ruleset. Every PR
on this repository is authored `rcguerrero29` (#209–#215 `[FACT]`) because Claude sessions push under
your grant, and **an author cannot approve their own pull request**. With one human and no bypass,
approvals: 1 locks you out of every PR you have. Approval lives in a *second* ruleset that carries a
bypass (step 4); this one carries none. Bypass is per-ruleset, which is why there are two.

### Step 2 · Secret scanning and push protection — one minute to confirm

**Settings → Code security → Secret scanning: Enable → Push protection: Enable.** Both free on public
repositories and on by default since 2024 `[TRAINING]`; the unauthenticated API cannot see the
setting `[FACT]`, so look. Push protection is the one control here that acts *before* a pasted key
lands. **What it does not do:** on a user-owned repository the pusher can clear the block themselves
(*"false positive"*, *"used in tests"*) — delegated bypass is org-only — so it stops a careless agent,
not a determined one; and it knows the shapes it knows. The `secrets()` guard in §4 turns a leak that
got through into a red build, and by then the repository is public and the key must be rotated.

### Step 3 · The `github-pages` environment — two minutes, *after* this PR merges

**Settings → Environments → `github-pages`.**

- **Deployment protection rules → Required reviewers → add `rcguerrero29`.** Do **not** tick *Prevent
  self-review*: you trigger every deploy by merging, so that box would let nobody approve.
- **Deployment branches and tags → Selected → add `main`.** Stops `workflow_dispatch` or a branch
  deploying an unmerged tree.

**Why after this PR:** an environment rule gates only *"a job that references an environment"*
`[WEB]` https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments — and `pages.yml`'s job declared no `environment:` in any of its versions `[CODE]`
`git log -- .github/workflows/pages.yml`. Both CI-2 skeptics caught this; this PR adds the key. Flip
the setting before it merges and it gates nothing; after, the very next deploy waits for your click
under *Actions → Review deployments*. Honest scope: you approve a ref before the box is built — it
keeps a bad push off the internet; it is not a review of the artifact.

### Step 4 · The second ruleset, `owner-merges`, with CODEOWNERS — five minutes, **before step 5**

**Settings → Rules → Rulesets → New branch ruleset**, target default branch, Active:

- **Bypass list → Repository admin.** That is you, and only you.
- **Require a pull request before merging** · required approvals **1** · **Dismiss stale approvals
  when new commits are pushed** · **Require review from Code Owners** · **Require approval of the
  most recent reviewable push.**

It reads `.github/CODEOWNERS`, in this PR. **Its first line is `* @rcguerrero29`** — the critic's
finding 5: with only explicit paths, two machine users could approve each other on any path the file
forgot. With `*`, the only account that can satisfy this ruleset is yours. The explicit lines below it
are documentation of *why* each path matters; the star is the lock. Net effect: a machine user's PR
merges only after you approved it and nobody pushed to it since; **your own PRs — which is every
Claude PR — show *Bypass rules and merge*, one extra click, recorded.** That is the shape a one-human
repository can actually run.

**Order matters:** this ruleset's only precondition is CODEOWNERS on `main` (this PR). Create it
*before* adding any collaborator — the gap between the two is the window in which a write account
could merge its own green PR.

### Step 5 · The second AI's credential — and the recommendation is *none, at first*

**Option A — recommended for the first weeks: no write credential at all.** The second AI forks the
repository, opens pull requests, and its PRs run `ci.yml` with the read-only token GitHub gives every
fork. You merge. **The only thing this loses is the `taken:` label** (it cannot label your issues) —
it claims by opening its PR early with the issue number in the title, and its run file still goes in
the PR. GH-1's fix skeptic proposed this and the critic found it never weighed: it makes the
machine-account trap, the status-forgery trap, the mutual-approval trap and the branch-namespace trap
all disappear. Try the vendor here; give it write when it has earned it.

**Option B — when it has earned write: its own GitHub account, never a token minted on yours.** Three
findings and two skeptics say why (§2): a token from `github.com/settings/personal-access-tokens` —
the only recipe this repo ever wrote down, in `changarrito/README.md` — makes the agent *be*
`rcguerrero29` to every check that reads a login, and the audit log can never separate the two again.

1. **One machine account** — GitHub's terms allow one machine account per person `[TRAINING]`, so
   it is `mq-agent`, not one per vendor. Swapping vendors is rotating its token, not deleting the
   account; its branches, `taken:` label and run files carry the *vendor's* name (`AGENTS.md` §3, §6),
   so the record still says who did what.
2. **Settings → Collaborators → Add people → `mq-agent`.** On a personal repository there is no role
   picker: a collaborator gets write, full stop `[TRAINING]`. Write is the ceiling — no settings, no
   rulesets, no environments, no collaborators.
3. **On that account: Settings → Developer settings → Personal access tokens → Tokens (classic).**
   Scope **`public_repo` only** — not `repo` (it carries *Actions: write*, enough to cancel a deploy
   or dispatch `pages.yml`), not `workflow`, not `admin:*`. Expiration 30 days. **Why classic and not
   fine-grained:** a fine-grained token *"is limited to access resources owned by a single user or
   organization"* and GitHub lists *"contribute to repositories where the user is an outside or
   repository collaborator"* as a current limitation `[WEB]` https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens — this repository is
   owned by a personal account, so the machine user's fine-grained token **cannot name it**. Both CI-1
   and GH-2 skeptics hit the same wall; `docs/NEXT-SESSION.md`'s earlier row asking for a fine-grained
   token was wrong and is corrected. **If the vendor arrives as a GitHub App** (Codex and Jules do,
   acting as `name[bot]`): install it on this one repository, read the permission list, refuse it if
   the list includes *Workflows* or *Administration*. An App is its own identity and every rule here
   applies unchanged.
4. What `public_repo` without `workflow` means: it can push a branch, open a PR, label an issue; **GitHub
   refuses any push from it that touches `.github/workflows/`** — the one lock beneath
   `test/leaves.js` that does not run from the commit under test. Put **no SSH key** on the account:
   the refusal applies to token pushes.
5. Hand over the token by the vendor's own secret store — never an issue, a doc, a commit.
6. **Revoke = Settings → Collaborators → Remove.** One click.

Known side-effect: `city-record.js` and the town's `mine()` filter to your login, so the second
agent's PRs will not appear in `status.json` or on the street; you read them on GitHub. Its issues
are proposals to every session, which is correct.

### Step 6 · Actions settings — two minutes

**Settings → Actions → General.**

- *Actions permissions* → **Allow `rcguerrero29`, and select non-`rcguerrero29`, actions** → tick
  **Allow actions created by GitHub**. A fence against a third-party action tomorrow.
- *Fork pull request workflows from outside collaborators* → **Require approval for all external
  contributors.** The default requires it only for first-time contributors.
- *Workflow permissions* → **Read repository contents and packages.** `leaves.js` already demands an
  explicit `permissions:` block in every workflow; this is the default beneath the guard.

### Step 7 · Vigilant mode — one minute

**github.com/settings/keys → Vigilant mode → Flag unsigned commits.** Eighteen of the last 200
commits on `main` carry a `Co-Authored-By: Claude` trailer under your name and e-mail `[CODE]`
`git log -200 --format='%an|%ae'`; on GitHub they wear your avatar with no badge. With vigilant mode
your web-UI merges show *Verified* and those show *Unverified* — the forgery `test/runs.js` calls out
becomes visible on the page. Do **not** add *Require signed commits* to a ruleset: a second vendor may
not sign and the rule would block it.

### Step 8 · A ruleset on the agents' branches — optional, two minutes

The critic's finding 6: you merge your own PRs by bypass, and *dismiss stale approvals* does not
touch a bypass. So an agent could push onto a `claude/*` branch in the moment before you click.
**New branch ruleset**, target `claude/**` and `mq-agent/**` (each namespace), rule **Restrict
updates**, bypass **Repository admin**. Then only you can move an agent's branch after it opens its
PR. Not recommended until a second agent exists; it costs honest agents their own rebases.

### Do not flip

**Automatically delete head branches** — GH-9 was refuted: `test/overlap.js` already drops merged
branches, and this repository runs one long-lived session branch across many PRs; the toggle would
delete it after every merge.

---

## 4 · What an agent builds — done in this PR, each planted before it was believed

*Every guard here runs from the commit under test. `docs/BOUNDARY.md` calls `test/leaves.js` "an
announcer, not a gate" and that stays true; what these buy is that a change you could not see
becomes one line you can. The rulesets in §3 are what decide who may put that commit on `main`.*

| | Guard | Noun it reads | The plant | Why a count would have fooled it |
|---|---|---|---|---|
| 1 | **Actions pinned by commit SHA**, and `leaves.js` refuses a moving tag | the ref after `@` in every `uses:` | a fixture `uses: actions/checkout@v4` | a count of `uses:` lines passes a retagged action forever |
| 2 | **`test/vendor.sha256`** for `three.min.js` and `qr.js`; `leaves.js` recomputes | the sha256 of the bytes on disk | one byte flipped in a copy | `test/public.js` asked only *is the file present*. Lives under `test/`, not `vendor/` — the first draft shipped a hash file to every player |
| 3 | **Five YAML shapes** the workflow guard missed, and **`--selftest` now runs in CI** | quotes stripped, `{` a boundary, `workflow_run` + `repository_dispatch` refused | each of the five, as fixtures | its selftest was never run by anything — `indexed()` had broken the fixture a day earlier and nothing noticed |
| 4 | **No `${{ }}` inside a `run:` block** | the expression inside the block, whose end is the first line at the key's indent | a `run: \|` holding `${{ github.ref_name }}` | the first draft ended the block at indent < 6 and read the *next* step's `env:` as part of it |
| 5 | **Repo-wide secret-shape scan** including `docs/runs/` | seven shapes over every text file in the tree; the path is printed, never the value | a fake `github_pat_` in `docs/runs/` | `public.js` scans the box and R8 scans the shell; `docs/` was scanned by nothing |
| 6 | **`build-site.sh` read as written** | every argument of every `cp` line but the last | `changarrito` added to the copy line | the old regexes matched nothing — zero paths derived, ever. First honest run found `icon-192.png` and `icon-512.png` shipped with no boundary row |
| 7 | **`runs.js` refuses a shallow checkout** instead of reading HEAD; `ci.yml` checks out `fetch-depth: 0` | `git rev-parse --is-shallow-repository` | a depth-1 clone: `git log -1 -- file` returned HEAD for `docs/OWNER.md` | the first draft assumed an empty answer meant shallow; it would have gone red on your first accepted run |
| 8 | **The town's CSP pinned byte for byte** | the literal | a host added to `script-src` in a copy | two substrings passed a widened policy |
| 9 | **`pages.yml` declares `environment: github-pages`** and the deploy step has an id | — | — | without the key, step 3's reviewer gate does nothing |
| 10 | **`test/issue.js`** — an issue's owner-authored text and nobody else's, and an owner issue **edited by another account is withheld** | `user.login` on each object; `edited` events on the timeline | seven fixture cases, including a stranger's comment that must not reach the render | the town had `mine()`; the agents had a sentence |
| 11 | **`.github/CODEOWNERS`** — `*` first, then why each path | — | inert until step 4 | — |
| 12 | The lock label is `taken:` everywhere — the town renders it, the contract said `in-flight:` | — | — | a lock nobody renders is a lock nobody can see (my error, PI-8) |

**Not built, with the verdicts.** A grep guard over `changarrito/` for token strings (SEC-4): hollow,
because `RECORDSRC` is a global any same-origin script can call — what holds instead is the pinned
CSP, `changarrito/` and `engine/` under CODEOWNERS, and the key's own shape (Issues-only, 30 days). A
committed lockfile for Playwright (CI-7): the repo's no-dependency stance stands and the token is
read-only.

---

## 5 · What went into `AGENTS.md`

Verbatim, in this PR: §1 names untrusted text (any issue, any comment *including on your own issue*,
any PR body, every file on a fork) and says an issue is read only through `test/issue.js` and a
sentence in `docs/` is a proposal until it points at an issue you authored or a dated `docs/ASKS.md`
row. **§1½** says the credential is the agent's own, never a token on your account, and that the
recommended first posture is no write at all. §4 says a fork PR is yours to read and an agent reads
nothing inside it. §7 gains three rows: no push to `main` or outside its namespace; no change to a
CODEOWNERS path inside a PR about something else; no closing or relabelling an issue it did not open.
`CLAUDE.md` mirrors the overlap.

---

## 6 · Assume injection

Take it as given that the second agent *will* be injected — by an issue comment, a doc it read, a
fork PR it was asked about. What must be true so that it cannot cause loss:

- **It cannot reach `main` alone.** Ruleset 1 wants a PR and a green `smoke` from GitHub Actions;
  ruleset 2 wants your approval of the exact commits it would merge. Its only path runs through
  your eyes.
- **It cannot reach the public site.** `pages.yml` runs on `main` only, the environment's branch
  policy says `main` only, and the deploy waits for your click.
- **It cannot rewrite the referee.** No `workflow` scope means GitHub refuses a push touching
  `.github/workflows/`. It can still edit `test/leaves.js` in its branch — and that is a diff under
  CODEOWNERS that ruleset 2 will not merge without you.
- **It cannot be you.** Its own login means its issues are proposals, its closes are not acceptance,
  its PRs are not permits, its `taken:` is its own. And under Option A it has no login here at all.
- **What it writes is visible before it lands.** A vendored byte becomes a hash line; a pasted key a
  red build; a widened CSP a pinned-literal failure; an edit to the contract a file you must open.
- **What it can still do** is bounded and reversible: fill issues with noise, rewrite its own
  branches, waste your time, spend the town's Issues key if a change to `changarrito/` or `engine/`
  got past your read (30 days, issues only).

The argument for settings over sentences is short. **Every sentence in `AGENTS.md` is read by the
model under the injection, and an injection is exactly a sentence that claims to outrank it.** A
ruleset is read by GitHub, which does not read prompts. Every guard in `test/` runs from the commit
it is judging, so an agent that can edit the commit can edit the guard — only a ruleset decides who
may put that commit on `main`. The sentences stay, because an honest agent obeys them and a careless
one is caught by them; they were never the lock. And today's injected-agent case is not Gemini; **it
is any Claude session, which pushes as you.** The rulesets bind it first.

---

## 7 · What this does not solve

- **Claude is already you to GitHub.** Sessions push, open PRs, file and close issues under your
  grant. The rulesets bind that credential like any other; they do not give Claude its own name. The
  day you want a Claude PR not to be yours, step 5's recipe applies to Claude too.
- **Your read of the diff is the last gate.** The guards make the invisible visible; they do not read
  it for you. CODEOWNERS makes you open the file, not read it.
- **Every repo-side guard runs from the commit under test.** They announce; the rulesets lock.
- **Agent branches are unprotected** until step 8, and step 8 is optional.
- **The town's key can be spent by any same-origin script** and the CSP cannot forbid the one host
  the town exists to reach. Bounded by Issues-only and 30 days, and by CODEOWNERS on `changarrito/`
  and `engine/`.
- **An owner-authored issue edited by another account** is caught by `test/issue.js` for agents that
  use it; the town's `mine()` does not read the timeline.
- **Two green PRs can still combine badly** if *up to date* is left off in step 1. Leave it on.
- **Secret scanning knows shapes it knows**, and on a personal repo its block is self-clearable.
- **A compromise of GitHub's own `actions/` org** is narrowed by the SHA pins, not closed.
- **Settings are invisible to every guard.** Nothing in the repo can tell a session whether step 1
  was done — except the public API: `GET /repos/rcguerrero29/meridian-quest/rulesets` returned `[]`
  on 2026-09-20 `[FACT]`. After each flip, a session reads it and writes the date beside the step
  here.
- **The second vendor's platform holds the token.** What Gemini's or OpenAI's harness does with a
  credential is outside this repository.

---

## 8 · The order

1. **You — ruleset 1 `main-lock`** (§3 step 1), with `smoke` sourced from GitHub Actions and
   *up to date* on. Five minutes. Nothing below matters until this is done.
2. **Merge this PR** — it is the first to merge under ruleset 1, so `smoke` must be green on it.
3. **You — confirm secret scanning and push protection** (step 2). One minute.
4. **You — the `github-pages` environment** (step 3): required reviewer, branch policy `main`. After 2.
5. **You — Actions settings and vigilant mode** (steps 6 and 7). Three minutes.
6. **You — ruleset 2 `owner-merges`** (step 4). Before any collaborator exists.
7. **You — decide Option A or B for the second AI** (step 5). A is recommended and needs no account.
8. **If B: the machine account, then the token** — only after 6. Its first job is docs/content
   (`docs/NEXT-SESSION.md` row 7): lowest blast radius while you learn how it behaves.
9. **You, later — a machine account for Claude** by the same recipe, the day you want Claude's PRs
   to stop being yours.
