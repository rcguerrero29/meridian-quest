# The ledger at La Aduana — every edge, what we promised at it, and who reads that noun

*Opened 2026-09-13, at the calling session's review of this morning's handoff and under the owner's
word of the same day: **"lets update the points you mention so crew fix and crew mode will work."**
Two personas (`.claude/agents/zeni.md:73,90` and `.claude/agents/melo.md`) have been telling agents to
read this file since 2026-09-11. For two days it did not exist. This is the file they were reading.*

**What this register is.** One row per edge, ranked by what it costs when it goes wrong. Each row
answers two questions and nothing else:

> **¿Qué se va?** — what leaves town, on one of four lines: **nothing** · **the public build** ·
> **a person's browser** · **a key**.
>
> **¿Y eso, quién lo revisa?** — what reads *that exact noun*? File and line, or the word **nobody**.

**What this register is not.** It is not a statement that anything is safe. A row with a guard says
what has a guard and when somebody last made that guard's noun false on purpose. A row that says
**nobody** is not a failure — it is a promise written down in the same hand as the rest, with a date.

**On the dates.** The column is *the day somebody last made the guard's noun false and watched what
happened* — a plant, in the sense of `docs/REGRESSION.md` §3. **Every date in this first edition was
read out of a document that records the plant, not out of `git log`:** the session that opened this
file had `Read`/`Grep`/`Glob` and no shell. A date here therefore means *"a register says this was
planted at on that day"*. **never** means no document in this repository records a plant at that
guard, and that is the most useful word on the page.

---

## The ledger, most costly first

### 1 · What a stranger actually receives from GitHub Pages
**Line: the public build.**
**Promise.** Pages serves Meridian and Meridian only; the town is "run from the owner's laptop only…
never linked from the public game" (`CLAUDE.md:35-36`); "the public build knows nothing about the
town" (`docs/story/el-changarrito.md:309-311`).
**Guard: nobody.** Nothing in this repository reads the bytes a visitor is served. `test/public.js`
reads the directory we *upload*; whether that upload is what gets served is the **Settings → Pages →
Source** dropdown, which is a setting in a web UI and is recorded in this repo only as a comment
(`.github/workflows/pages.yml:5-6`) and a runbook step (`docs/SECURITY-NOTE-2026-09-10.md:30-33`,
`:118-127`). Worse: the deploy steps carry `continue-on-error`
(`.github/workflows/pages.yml:59,66`), so — in that file's own words at `:5-6` and the note's at
`:215` — **a green Pages run does not prove anything was published.**
**Last planted against: never.**
**Why it is row one.** This is the only row that changes how urgent every other row is. If Source
says "Deploy from a branch", every artifact-side guard in this repository is inert and `/changarrito/`
and `/docs/` are live regardless of what merges (`docs/SECURITY-NOTE-2026-09-10.md:121`).

### 2 · What is inside the box we upload
**Line: the public build.**
**Promise.** An allowlist: `index.html sw.js qr.js manifest.webmanifest icon-192.png icon-512.png`,
`engine/`, `vendor/`, `content/meridian/` — and nothing else (`scripts/build-site.sh:18-20`); anything
added to the repo tomorrow is private by default (`.github/workflows/pages.yml:28-38`).
**Guard.** `test/public.js:44` — a named NEVER list (`changarrito`, `docs`, `test`, `.github`, `.git`,
`node_modules`, `.claude`, `scripts`) — plus `:47-50` (dotfiles, `.sh`, build leftovers) and
`:103-105` (the game is actually complete). Run **before merge** at
`.github/workflows/ci.yml:37-38` and **again after the last file is written into the box** at
`.github/workflows/pages.yml:55-56`.
**Last planted against: 2026-09-10** — proven red against the old deploy, thirteen findings, first
line `changarrito/` (`docs/QA-PASS.md:138-139`; `docs/REGRESSION.md:142`).
**Read the shape.** The NEVER list is *named rather than derived* on purpose (`test/public.js:42-43`)
— deriving is what failed as R8. But the positive half, the allowlist in `scripts/build-site.sh:18`,
is the file that decides what becomes public, and **adding a line to it is a decision, not a chore**
(`scripts/build-site.sh:12-14`). That file is itself kept out of the box by being on the NEVER list
and off the allowlist (`scripts/build-site.sh:9-10`).

### 3 · A credential surface inside the box
**Line: the public build.**
**Promise.** No API host, no token, nothing that looks like a key, in what we publish
(`docs/story/el-changarrito.md:176`, R7).
**Guard.** `test/public.js:55-57` — the four words `api.github.com`, `net.local`, `github_pat`,
`Authorization`, asked of every shipped text file — and `:60-62`, four *shapes* (`gh[pousr]_…`,
`AKIA…`, `-----BEGIN … PRIVATE KEY-----`, `xox[baprs]-…`).
**Last planted against: 2026-09-10** (`docs/REGRESSION.md:142`, "each proved by planting a real
violation").
**Read the shape. Both halves are denylists, and a denylist can only name yesterday's mistake.** Four
words and four shapes. A GitLab token, a Slack webhook URL, an `.npmrc` line, a bearer written
`authorization` in lowercase — `test/public.js:57` uses `src.includes(w)`, which is
case-**sensitive** — none of them are named here and none would be caught. This is not an argument
for a longer list; it is the reason row 1 exists.

### 4 · The owner's key, in the owner's browser
**Line: a key.**
**Promise.** The town is served from an origin nothing else uses — `http://127.0.0.1:8765/changarrito/`
— never Pages, never `file://` (`docs/story/el-changarrito.md:170`, `:181-187`;
`changarrito/README.md:23,34,37,39`). The key is fine-grained, this repository only, Issues read and
write, 30 days (`changarrito/README.md:146-148`). It lives under the town's own prefix and goes with
sign-out (`changarrito/content/record.js:338-341`).
**Guards, and they are the densest set in the repo.**
- a write with no token never reaches the wire — `test/town.smoke.js:348`
- a write carries the token — `:353`
- **the token never enters a save** — `:374`
- sign-out leaves no `tokenAt`/`tokenExp` behind — `:439`
- a signed-**out** read carries no `Authorization` — `:459`; a signed-in read does — `:453`
- a refused signed read retries **unsigned** rather than giving up — `:456`
  (`changarrito/content/record.js:274`)
- the new-token link goes to GitHub's own settings page — `:440`
- the town's own how-to sheet, the one el pregonero carries, must contain the literal
  `python3 -m http.server 8765 --bind 127.0.0.1` and `127.0.0.1:8765/changarrito` —
  `test/town.smoke.js:299`. **That is the origin promise, read as the exact noun, inside the game.**
**Last planted against: 2026-09-06**, the day the writes were built (`docs/story/el-changarrito.md:251`,
Part 3). The suite stubs `window.fetch` and inspects the calls, which is the behaviour and not a proxy.
**What has no guard in this row:** the token's **scope**. Nothing can read what permissions a token
was minted with; `changarrito/README.md:146-148` is an instruction. See gap **G3** below for the
half of it that *is* mechanical.

### 5 · What a returning player's device keeps serving
**Line: a person's browser.**
**Promise.** "Bump `GAMEV` in `content/meridian/config.js` and `CACHE` in `sw.js` together whenever
`engine/` changes" (`CLAUDE.md:42-43`). The worker is cache-first (`sw.js:37-42`), so an unbumped
change reaches nobody who already installed the app.
**Guards.** `test/bump.js` — the diff against the base, intersected with **`engine/` plus every path
`sw.js` actually precaches, read out of `sw.js` itself** (`test/bump.js:50-52`), then `CACHE` must have
*moved* (`:61-68`). Wired at `.github/workflows/ci.yml:48-52` (pull request) **and `:61-70` (push),
because most of this repository's history never saw a PR**. The weaker lockstep check —
`CACHE === GAMEV` — is `test/smoke.js:41-47`, and `test/public.js:96-98` asks the same of the two
strings **as shipped**.
**Last planted against: 2026-09-12** — an engine change with the `CACHE` string reverted, sitting in
the working tree, against which the guard printed *"this change touches nothing the offline app has
already cached"* (`test/bump.js:21-30`; `docs/REGRESSION.md:56`, proxy #11). Before that,
**2026-09-10**, red against two real historical commits (`test/bump.js:9-11`; `docs/QA-PASS.md:154-156`).
**Not planted:** the push-branch step at `.github/workflows/ci.yml:61-70` itself. `docs/REGRESSION.md:57`
(#11½) records that the hole it closed was real and that ten engine commits had crossed it green
**because people remembered** — which is precisely why a green board was worth nothing there.

### 6 · `status.json` — the one file in the box that is written from the API
**Line: the public build.**
**Promise.** "Version and permits, nothing more" (`.github/scripts/city-record.js:1-8`); titles
clamped to 120 characters (`:29`); only the owner's own open PRs (`:24`).
**Guard.** `test/record.js:17-18` — an **allowlist of top-level keys** (`v`, `written`, `deployed`,
`permits`, `note`), failing on anything else, plus a per-permit shape check at `:16`. Run at
`.github/workflows/pages.yml:49-50`. And `test/public.js` runs **after** it
(`.github/workflows/pages.yml:51-56`), so `status.json` is inside the box when the box is checked —
that ordering is itself a recorded fix: *"check the box after the last thing is put in it, or you are
checking a different box."*
**Last planted against: never.** Neither the key allowlist nor the ordering has a recorded plant.
**Read the shape.** The key allowlist is the right noun (it is an allowlist, so a field added
tomorrow fails rather than ships). The **content** of `title` is not read by anything except the
four-word scan in `test/public.js:55-57` — which means a PR title containing the string
`api.github.com` would **fail the deploy**. That is a footgun, not a hole, and it belongs in the
ledger rather than in somebody's afternoon.

### 7 · The `#save=` link — one person's blob arriving in another person's browser
**Line: a person's browser.**
**Promise.** "Every save that crosses a trust boundary… is coerced to known-good shapes here"
(`engine/engine.js:512-515`); "a `#save=` link may not reach the prototype" (`:549`); boarding needs
a tap and never overwrites silently (`:5650`).
**Guard.** `test/smoke.js:687-727` — a genuinely hostile payload (`:691-695`) fed through the real
`#save=` hash and `readPass()`, with eleven assertions on what comes out. Plus
`test/engine.smoke.js:241-248` for the hair-version clause, run against **both** shells
(`.github/workflows/ci.yml:28-31`).
**Last planted against:** the hostile payload is a standing plant and has been there since Part 1
(`docs/story/el-changarrito.md:248`, 2026-09-05). **No date verified from history.**
**But read the extraction step, because this is the one that surprised me.** The payload at
`test/smoke.js:691-695` puts `__proto__` in **`qa`** — which is filtered by numeric coercion at
`engine/engine.js:534-535` and would be filtered with the prototype clause deleted. **The payload
contains no `bl` key at all**, and `bl` is the loop the prototype clause at `engine/engine.js:549`
actually guards — the one line `docs/story/el-changarrito.md:179` (R3) was opened to buy. And
`test/smoke.js:705` asserts `protoClean`: that `Object.prototype` has no `polluted` key and `({}).x`
is undefined — **neither of which anything in the payload ever tries to set.** It is green because
nothing was attempted. That is the shape this repository names in `docs/QA-PASS.md:98-100`: *the
blindness looks exactly like the pass.* See gap **G2**.

### 8 · Where the public page is allowed to talk
**Line: a person's browser.**
**Promise.** `index.html:10` — `connect-src 'self'`, `object-src 'none'`, `form-action 'none'`,
`base-uri 'self'`. The engine's server seam is deliberately dead: `NET={enabled:false,…}`
(`engine/engine.js:458`), and the pack-side record seam is off unless a pack declares one
(`:473` — "the public build's CSP allows neither, by test").
**Guards.** Three, reading three different nouns:
- the **source** CSP must equal a pinned literal — `test/smoke.js:3720-3723`
- the **shipped** CSP must exist and must not name `api.github.com` — `test/public.js:66-70`
- **every way the shipped page reaches out** — `src` *and* `href`, script, link, img, iframe, font —
  against a declared allowlist of exactly two hosts — `test/public.js:77-87`
**Last planted against: 2026-09-10** for the artifact-side checks (`docs/REGRESSION.md:142`). **never**
for the pinned literal at `test/smoke.js:3722`.
**Read the shape, and read the comment above it.** `test/public.js:71-76` records that the first
version of the reach check read `<script src>` alone — and `index.html:19` pulls a stylesheet from
`fonts.googleapis.com`, "so every visitor's IP and User-Agent went to Google on every load and this
check said nothing." That is the R8 mistake made *inside the guard written to fix the R8 mistake*.
The fix is the right one: an off-origin host is not forbidden, it is a **declared decision**
(`test/public.js:77-80`), and Google Fonts is the only one.

### 9 · The public build knowing anything about the private one
**Line: the public build.**
**Promise.** `docs/story/el-changarrito.md:309-311` (§7½ rule 4) and `CLAUDE.md:44-45`: no API host,
no token, no URL-driven behaviour, a pinned CSP.
**Guards.** `test/smoke.js:3685-3736`: the four words over a derived shell (`:3700-3705`); no
`location.search`/`URLSearchParams` anywhere in `engine/` (`:3710-3712`); every storage key through
`SK()` (`:3713-3714`); no `${}` into `innerHTML` (`:3715-3718`); the worker checks `res.ok`
(`:3725`), stays on its own origin (`:3726`), and deletes only caches it owns (`:3727`); and a live
load with `?dev=1&admin=1#admin=1` that must leave `admin === false` (`:3728-3735`).
**Last planted against: never** for the four-word scan. **This is the guard that did not fire on
2026-09-10** — not because it was wrong about its words, but because its file set is derived from
what `index.html` loads (`test/smoke.js:3691-3698`) and the town loads nothing from there
(`docs/QA-PASS.md:131-136`). It is kept because for the shell it *is* scanning it is the right
question; it is no longer the guard that answers row 2 or row 3.
**One live note, verified today:** the shell set at `test/smoke.js:3696-3698` includes every tracked
file under `content/` — so a second *public* pack is scanned the day it lands. It still cannot see
`changarrito/`, and after `test/public.js` that is correct rather than broken.

### 10 · A deliberately broken line reaching a commit
**Line: the public build.**
**Promise.** `docs/QA-PASS.md:170-172`: no `engine/` or `content/` line carries `MUTANT` or
`DELIBERATELY BROKEN`; agents return patches as text.
**Guard.** `test/smoke.js:2254-2263`, testing **raw** lines.
**Last planted against: 2026-09-10** (`docs/QA-PASS.md:173-176`; `docs/REGRESSION.md:47`, proxy #2)
— and the plant is the whole story: the first version blanked comments before testing each line, and
**a marker is a comment**, so it caught nothing and looked correct.

### 11 · What CI itself is allowed to do
**Line: a key** (the one GitHub hands the workflow).
**Promise.** "CI still never pushes a commit" (`.github/workflows/pages.yml:4`); `contents: read`
(`.github/workflows/ci.yml:2-5`, `.github/workflows/pages.yml:7-12`); and the standing rule —
**unacceptable, ever: a `contents: write` or `pull_requests: write` token in any browser**, and no
agent auto-started on an issue by anyone but the owner, or gated on a label
(`docs/story/el-changarrito.md:216-219`, R4a at `:172`).
**Guard: nobody.** No test reads a `permissions:` block; no test asserts the absence of an
`issue_comment` or `pull_request_target` trigger. I verified by hand today that `.github/workflows/`
contains exactly two workflows, both triggered on `push`/`pull_request`/`workflow_dispatch`, and that
`pages.yml`'s only write scopes are `pages: write` and `id-token: write`, which are the deploy's own.
**Last planted against: never.**
**Why this rises as crew mode approaches.** `docs/CITY-AS-MEMORY.md:76-86` makes **a label the lock**
for claiming an issue. `docs/story/el-changarrito.md:172` (R4a) says a trigger gates on
`issue.user.login == owner`, **never a label**, and `:206-208` refuses a label-gated merge action for
the same reason. Those two are not in conflict today — a claim label that nothing automated reads is
a note on a door, not a trigger — **but they become the same sentence the moment anything runs on a
label.** That is question Q1 below.

### 12 · The service worker's reach on the owner's own machine
**Line: a person's browser** — his.
**Promise.** "The town registers **no service worker**" (`docs/story/el-changarrito.md:175`, R6) —
so no API answer with private data is frozen in a cache.
**Guards.** `test/town.smoke.js:17` (the town's index registers none); `sw.js:29` (cross-origin
requests are not handled at all, so `api.github.com` can never be cached); `test/smoke.js:3726` reads
that exact line.
**Last planted against: never.**
**The part with no guard.** The public shell registers its worker at `index.html:789-790` as
`register("./sw.js")` — default scope, which at the repo root is `/`. The owner serves the repo root
from `127.0.0.1:8765`. **If he ever opens `http://127.0.0.1:8765/` (Meridian) on that server, the
worker takes scope `/` on that origin and `sw.js:38-41` will cache-first anything under
`/changarrito/` he then visits** — same origin, so `sw.js:29` lets it through. No token is at risk
(`sw.js:29` still blocks `api.github.com`), but it is the same sentence
`docs/SECURITY-NOTE-2026-09-10.md:50` records as having actually happened on Pages: *"the town is
separate" was never true at the browser level.* See gap **G6**.

### 13 · What reaches a commit at all
**Line: nothing** — and keeping it that way.
**Promise.** `CLAUDE.md:44-45`: never commit a token, a `?dev=` flag, or anything naming a personal
build in the public shell. `docs/QA-PASS.md:81-84`: scratch goes in the scratchpad; every commit
stages explicit paths.
**Guards.** `.gitignore:12-19` — by **shape**, not by name (`*.tmp/`, `*.scratch/`, `*.tmp.*`,
`/*.png` with `!/icon-*.png`) — and the stop hook.
**Last planted against: 2026-09-11**, when `shots.tmp/` walked past `shots/` and the hook, not the
rule, caught it (`docs/QA-PASS.md:86-104`, E3½; `docs/REGRESSION.md:53`, proxy #8).
**One correction to the promise as written.** `CLAUDE.md:44-45` says *"`test/smoke.js` fails the
build if you do."* For a `?dev=` flag that is true (`test/smoke.js:3710-3712`, `:3728-3735`). **For a
token it is not.** `test/smoke.js:3702` looks for the literal `github_pat` and three other words; a
`ghp_…` token pasted into `engine/engine.js` is caught only later, by `test/public.js:60`, because
`engine/` ships. A `ghp_…` token committed into `changarrito/` or `docs/` is caught by **nothing**,
because those never reach the box. The promise holds where it is scoped ("in the public shell"); the
guard it names is the wrong one.

### 14 · The crew's own files
**Line: nothing** (they never ship) — **and the public build.**
**Promise.** `.claude/` is not on the allowlist (`scripts/build-site.sh:18-20`) and is on the NEVER
list (`test/public.js:44`).
**Guard.** `test/public.js:44-46`. **Last planted against: 2026-09-10** (with the rest of section 1).
**The part that had no guard until this file was written.** The nineteen personas open with a block
that is meant to be byte-identical, and until 2026-09-13 nothing read that. `test/town.smoke.js` now
does — the block must be first in every file, appear exactly once, name exactly one person, be identical
across all nineteen, and name `docs/POSTMORTEM.md` and `docs/REGRESSION.md`. Its first run against the
tree found Rigo's file carrying Toño's whole persona below a second copy of the block. `test/town.smoke.js:1080-1093` reads `.claude/agents/<name>.md`
paths out of mural proposals — that is a different noun. See gap **G5**.

---

## The promises with no guard

*Plainly, and each with the smallest thing that would become a guard, and what that thing would have
caught in the past. "Smallest" means smallest — if it needs a sitting, it is not on this list.*

### G1 · Nobody reads what a stranger is actually served *(row 1)*
**Smallest guard.** A scheduled workflow, or one step in `pages.yml` after the deploy, that fetches
`https://rcguerrero29.github.io/meridian-quest/changarrito/` and `…/docs/OWNER.md` and **fails unless
both are 404**, and fetches `…/` and fails unless it is 200. Three `curl`s and an `if`.
**What it would have caught.** E5, on the day it started rather than months later
(`docs/QA-PASS.md:123-144`). It would also catch the Pages Source dropdown being flipped back by
hand, a deploy silently skipped by `continue-on-error`
(`.github/workflows/pages.yml:59,66`), and a cached edge serving the old tree.
**It reads the noun exactly** — the noun is *what a stranger receives*, and this asks a stranger's
question from outside. It is the only check on this page that does.

### G2 · The `#save=` prototype clause has never been planted at *(row 7)*
**Smallest guard.** Three lines inside the payload that already exists at `test/smoke.js:691-695`:
add `bl: { __proto__: { a: 'b' }, ok: { part: 'opt' } }`, then assert
`Object.getPrototypeOf(p.s.bl) === Object.prototype` and `p.s.bl.ok.part === 'opt'`. Delete
`engine/engine.js:549` and watch it go red first.
**What it would have caught.** The clause being dropped by any refactor of `sanitizeSave` — it is
one `if` in a loop with no test behind it, and it is the exact line
`docs/story/el-changarrito.md:179` was opened to buy. And it retires `test/smoke.js:705`, which
today asserts that a pollution nobody attempted did not occur.

### G3 · Nothing holds the town's writes to `/issues`
**Smallest guard.** In `test/town.smoke.js`, over the source of `changarrito/content/record.js`:
every string literal passed as the second argument of `this.write(` must start `"/issues"`. Today all
six do — `:384` (PATCH close), `:387` and `:391` (comments), `:393` and `:394` (labels), `:405`
(file a request) — so it is green on arrival, which means **it must be planted at**: change one to
`"/merges"` and watch it print.
**What it would have caught.** The v2 that `docs/story/el-changarrito.md:177` refuses outright
("Merge from the game… **do not build**", Critical) the day somebody typed it, rather than at review.
It is also the only mechanical half of the token-scope promise: a key minted wider than Issues is
invisible to us, but a *town* that asks for more than Issues is not.

### G4 · Nothing reads a workflow's `permissions:` block, or its triggers *(row 11)*
**Smallest guard.** A dozen lines of Node over `.github/workflows/*.yml`: every file declares a
`permissions:` block; no `write` scope outside an allowlist of `{pages, id-token}` in `pages.yml`;
no `pull_request_target` and no `issue_comment` trigger anywhere.
**What it would have caught.** The state this repo was actually in — `ci.yml` with no `permissions:`
at all and an unpinned install (`docs/story/el-changarrito.md:235`, R9b, Medium: *"a bad dependency in
CI with a write token can push to `main`"*). And it is the row that will matter on the day crew mode
tempts somebody to automate a label.

### G5 · The shared block in the nineteen personas is guarded by nobody *(row 14)*
**Smallest guard.** Read the block between the front-matter and the first `You are **…**` line out of
every `.claude/agents/*.md` and fail if any two differ byte for byte.
**What it would have caught.** This morning: the block named neither `docs/POSTMORTEM.md` (0 of 19)
nor `docs/REGRESSION.md` (2 of 19), while `.claude/skills/crew-fix/SKILL.md` tells every agent to read
the post-mortem first. Nineteen copies with no mechanism holding them equal is a register waiting to
drift, and drift in this particular text is drift in what every agent knows before it starts.

### G6 · The local origin's service worker *(row 12)*
**Smallest guard.** In `sw.js`'s fetch handler, decline any same-origin request whose path is not
`ASSETS`-shaped — i.e. add the town's directory to what the worker refuses, the way `:29` already
refuses another origin — and assert it in `test/smoke.js` beside `:3725-3727`.
**What it would have caught.** Consequence #2 of the one real exposure
(`docs/SECURITY-NOTE-2026-09-10.md:50`): the root worker caching the private tool's files, including
its token-handling code, into the *game's* cache. That is recorded as having happened.
**Honest note.** The cheaper version of this is a sentence in `changarrito/README.md` telling the
owner not to open the root URL on that server. A sentence is not a guard — `docs/QA-PASS.md:82-84`
is this project's own evidence that instructions did not work and the hook did.

### G7 · Only one of the two copies of the `--bind 127.0.0.1` command is guarded
**Smallest guard.** Extend the assertion that already exists at `test/town.smoke.js:299` to
`changarrito/README.md:34`, which carries the same command for the same reason
(`changarrito/README.md:39`: *"a bare `http.server` listens to the whole network"*).
**What it would have caught.** Nothing yet. It is here because the repo already knows what two
hand-maintained copies of one decision cost — `scripts/build-site.sh:4-7` exists because the six
copy lines were pasted twice.

### G8 · The four-word scan and the pinned CSP literal have never been planted at
**Smallest guard.** Ten minutes, no new file: put `Authorization` in a `content/meridian/` file and
run `node test/smoke.js`; change one character of `index.html:10` and run it again. Write the two
sentences it printed into `docs/REGRESSION.md` §3 and the date into this ledger.
**What it would have caught.** Unknown, and that is the point —
`docs/REGRESSION.md:92-98`: *a green guard is not evidence; the only thing that distinguishes a
working guard from a decorative one is a planted violation.* Fifteen entries in that register say so.

---

## The BOUNDARY list, for `test/leaves.js`

*One row per path. A change to any of these means something may leave town, so a change to any of
these owes a row above. `test/leaves.js` PARSES this table — it is the only copy of the list, on
purpose (`scripts/build-site.sh:4-7` says why two copies are the fault). `path` is a literal repo path
or a prefix ending in `/`; `who must see it` is one or more crew names with a persona file; `since` is
the day the row was written. The guard fails if a path does not exist, a name has no persona, or a row
has no date.*

| path | who must see it | what it lets out | since |
|---|---|---|---|
| `scripts/build-site.sh` | zeni, yaz | the public build — what goes in the box | 2026-09-13 |
| `.github/workflows/pages.yml` | zeni, yaz | the public build — whether and what we upload, and when it is checked | 2026-09-13 |
| `.github/workflows/ci.yml` | zeni, yaz | the public build — the gate that runs before a merge, and CI's own permissions | 2026-09-13 |
| `.github/scripts/city-record.js` | zeni | the public build — the one file written from the API into the box | 2026-09-13 |
| `test/public.js` | melo, zeni | the public build — the guard that reads the box | 2026-09-13 |
| `test/record.js` | melo | the public build — the guard that reads status.json | 2026-09-13 |
| `index.html` | zeni | a person's browser — where the public page may talk, and what it loads | 2026-09-13 |
| `sw.js` | zeni, yaz | a person's browser — what is stored on a device and for how long | 2026-09-13 |
| `manifest.webmanifest` | yaz | a person's browser — the installed app's identity and start url | 2026-09-13 |
| `qr.js` | zeni | the public build — third-party code in every player's browser | 2026-09-13 |
| `vendor/three.min.js` | zeni | the public build — third-party code in every player's browser | 2026-09-13 |
| `engine/` | zeni, beto | a person's browser — both games' shared code; every trust boundary | 2026-09-13 |
| `content/meridian/` | zeni | the public build — the public game's own words and data | 2026-09-13 |
| `changarrito/index.html` | zeni | a key — the CSP that lets a token-bearing page reach GitHub | 2026-09-13 |
| `changarrito/content/record.js` | zeni | a key — where the token is kept, what carries it, what it writes | 2026-09-13 |
| `changarrito/README.md` | zeni | a key — the origin the key is allowed to exist on | 2026-09-13 |
| `.gitignore` | zeni | nothing — what reaches a commit | 2026-09-13 |
| `CLAUDE.md` | chuy | nothing — where the promises are written down | 2026-09-13 |

### Does that script read a noun or a proxy? — a proxy, and here is exactly which

A script that (a) lists those paths, (b) fails when a listed path has no row in this ledger, and
(c) prints which listed paths a diff touches does **two different things, and only one of them reads
a noun.**

- **(b) reads a real noun, and the noun is the ledger's completeness** — *"is every path we said we
  watch actually written up here?"* That is answerable from two files and it is exactly true. Keep it.
- **(a) and (c) read a proxy.** The noun is *did something leave town*. What they read is *did a file
  whose name somebody already thought of change*. That is a **denylist wearing an allowlist's coat**,
  and by this project's own rule it can only name yesterday's edges (`docs/QA-PASS.md:140-142`). It
  cannot see:
  - a **new** file that becomes an edge — a third workflow, a second public pack, a new fetch in a
    file not on the list. `scripts/build-site.sh:18` copies `engine/` and `vendor/` wholesale, so a
    new file under either ships without any listed path changing;
  - **anything that is not a file**: the Pages Source dropdown (row 1), a repository secret, a
    token's scope, a branch protection rule. Row 1 — the most costly row on this page — is
    structurally invisible to this script;
  - a change whose *meaning* moved while its bytes did not: `docs/REGRESSION.md:48` (proxy #3) is the
    same species — *lockstep is not movement*.

**So say it in the file rather than in a commit message:** `test/leaves.js` is an **announcer, not a
gate**. Its honest output is *"these edges moved; go read their rows"*, plus a hard failure when a
listed path has no row. It must never print a sentence of the shape "nothing left town", because it
cannot know that — and `OK` printed by a check that matched nothing is the most expensive line of
output in this repository (`docs/QA-PASS.md:98-100`). The check it must **also** carry, or it joins
the register at `docs/REGRESSION.md:37` as proxy sixteen: **if its extraction finds zero listed paths
in the diff, it says so out loud with the count**, because "zero paths matched" and "the list is
broken" are the same printout otherwise — which is precisely how boot-warning filter #7 matched zero
characters, ever.

---

## What this file did not read

Named so it is counted rather than assumed. The session that opened this ledger had `Read`, `Grep`
and `Glob` and **no shell**, and therefore:

- **`git log`, `git log -S` and `git blame` were not run at all.** Every date above comes from a
  document claiming a plant. No date here is verified against history, including the two in row 5.
- **Nothing was executed.** Not `node test/smoke.js`, not `test/public.js`, not `bash
  scripts/build-site.sh`. Every guard above was read as source, never watched running, and never
  planted at by me. By this repository's own standard that makes every row on this page a *claim
  about a guard*, not evidence about one.
- **The live site was not fetched.** Row 1 is written from the repository's own documents; nobody in
  this session opened `rcguerrero29.github.io` in any window.
- **Not read in full:** `test/engine.smoke.js` (only `:232-248`), `test/gauge.js`, `test/closes.js`,
  `test/shots.js`, `docs/templates/build-branded.js`, the rest of `test/town.smoke.js` beyond the
  grepped lines, `changarrito/content/record.js` outside `:230-405`, `engine/engine3d.js`,
  `vendor/three.min.js` (never opened — it is third-party code we ship to every player and nothing in
  this repository reads a single byte of it), `qr.js`, and the icons.
- **Not read:** `docs/ASKS.md`, `docs/OWNER.md`, `docs/POSTMORTEM.md` in full (only the rules quoted
  in this session's brief), `docs/NEXT-SESSION.md`, `docs/BACKLOG.md`, `.claude/skills/crew-fix/SKILL.md`,
  and eighteen of the nineteen persona files — so **G5's claim about the block is the calling
  session's finding, relayed, not mine.** It is the one claim on this page I did not check, and it is
  marked here rather than absorbed. *(The calling session verified it the same day by hashing the block
  in all nineteen files, and the guard G5 asks for now runs in `test/town.smoke.js` — see the row for
  `.claude/` above.)*
