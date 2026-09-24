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

**And a date is worth what re-runs it** *(added 2026-09-13 by Zeni, from `docs/POSTMORTEM.md` §13h)*.
A plant proves a guard fired **once**, against **one draft**, on **one afternoon**; the only thing that
keeps it true is a step that runs on every push. So a date here is half an answer: read it with **what
re-runs it** beside it, or with the word **unrepeated**. The freshest date on this page — row 11's
2026-09-13 — is the one that taught us this, and its six plants were re-run by nothing until `smoke` took
them on 2026-09-20.

---

## The paper seam — a pack's CSS in a player's browser · added 2026-09-16

**Line: a person's browser.**

**What is new.** Until today a pack shipped nine JavaScript files and no CSS, and that was, by
accident, a security property: **a pack could not write a single line of style.** `ARCH-LOG.md` A15
is the cost of that accident — Meridian's civic-form typography was hardcoded for every world that
will ever run on this engine, and a whole day went into improving drawings inside a surface that
could not be designed. Closing it means a pack's own text now becomes CSS in a player's browser,
which is a new edge and belongs here.

**Promise.** A pack's `PAPER` may restyle the inside of the reader's sheet and **nothing else** —
not the chrome, not the HUD, not the world canvas, not the page. A pack may not fetch, and may not
register a global name.

**How it is kept — enforced, not requested.** Four mechanisms, because any one of them alone leaks:

| | Mechanism | What it stops |
|---|---|---|
| 1 | the **browser** parses the pack's text in a `media="not all"` style; we walk the CSSOM it built | a quoting trick that fools a hand-written parser. There is no hand-written parser |
| 2 | every selector is **re-rooted** at `.paper` | selecting anything outside the reader. A CSS selector always selects its *rightmost* element, so `html`, `body` and `:root` need no special case — `.paper html` matches nothing, which is the right answer |
| 3 | an **allow-list**: only a style rule and a conditional group (`@media`/`@supports`/`@container`) pass | `@import` (a fetch) and `@font-face`/`@keyframes`/`@property` (global names). A name is not a subtree. An allow-list also drops at-rules CSS has not invented yet — the first draft was a deny-list keyed on `CSSRule.type`, and `@property` returns `0` from that deprecated field and walked straight past it |
| 4 | `position:fixed` is stripped, and `.paper` carries `isolation:isolate` | painting over the HUD from *inside* the reader. Fixed positioning escapes the containing block; a stacking context stops a legitimately-styled descendant raising itself out. Scoping the selector stops neither |

**Guard: `test/engine.smoke.js`, the paper block — and it asks both halves.** A seam that is merely
safe is a seam nobody can use, so it asserts that the pack's paper *arrived* (the sheet exists, parses
to real rules, sits after the shell's block, and **the `.paper` element actually wears the colour the
pack asked for**) as well as that every escape came to nothing. The last of those is the one that
matters: everything else reads the stylesheet, which is a proxy, and `docs/REGRESSION.md` is a
register of guards that stopped at exactly that point.

**Planted at: 2026-09-16, six violations, in a copy outside the repository.** Re-rooting removed
(`.dkv b`, `html`, `body` all escaped) · the allow-list removed (`@import`, `@font-face`,
`@keyframes`, `@property` all survived) · `position:fixed` kept · `isolation:isolate` removed from
the shell · the sheet injected into `<head>`, where it loses every tie. All six printed. **Re-run
by:** `test/engine.smoke.js` against `content/gauge/index.html`, on every push, via `test/gauge.js`.

**And the attack is a fixture, not a memory.** Half of `content/gauge/config.js`'s `PAPER` is a real
attempt to reach the page, the HUD and the world canvas, so the scoping is exercised by a live pack
on every CI run rather than by a test that writes its own input — register fault **A**. Do not tidy
those lines away: they are the test. The sixth plant above was not a plant at all — the gauge caught
it for real, on the seam's first run, because `document.head` is not where the shell's stylesheet
lives.

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
`engine/`, `vendor/`, `content/meridian/`, **and `content/horno/`** — and nothing else
(`scripts/build-site.sh`); anything added to the repo tomorrow is private by default
(`.github/workflows/pages.yml`).

**`content/horno/` joined the box on 2026-09-22**, at the owner's word (*"lets build/ship it"*,
`docs/ASKS.md`). It is a second world — one room, one tray, one verb — and it shares the engine and
nothing else: no service worker, no manifest, and it never reads `content/meridian/`. **Its shell is
GENERATED and is not in git** (`.gitignore`), so `scripts/build-site.sh` runs `node test/horno.js
--build-only` before the copy and then fails if no shell landed; a folder published without the one
page that opens it is a public link to nothing. The generator asserts every edit it makes against
`index.html` matched, so a change to the public shell that silently stops matching turns CI red
instead of shipping a broken page.
**Guard.** `test/public.js` — a named NEVER list (`changarrito`, `docs`, `test`, `.github`, `.git`,
`node_modules`, `.claude`, `scripts`), plus dotfiles, `.sh` and build leftovers, plus a check that the
game is actually complete — **and, from 2026-09-22, `PUBLIC_WORLDS`, which names every pack allowed
in the box.** That half was missing and it is the half this row is about: everything else here is a
BLOCKLIST of eight folder names, so **a whole new world could be added to the packing script and R10
would still print "the upload is the public game and nothing else"** — which is what it did say, once,
about a box holding two games. The old comment reasoned it away (*"a directory added tomorrow is
private by default: it is not on the allowlist in pages.yml"*), which is a statement about the recipe
and not a check on the box, and this row's own rule is to check the box. Now a pack under `content/`
that nobody named is red in both directions: unnamed-but-shipped, and named-but-dropped. Run **before merge** at
`.github/workflows/ci.yml:37-38` and **again after the last file is written into the box** at
`.github/workflows/pages.yml:55-56`.
**Last planted against: 2026-09-22** — `PUBLIC_WORLDS` planted both ways against a real built box:
a `content/sobremesa/` dropped into the upload printed *"the upload publishes the world "sobremesa"
and nobody put it on the public list"*, and deleting `content/horno/` from the upload printed *"the
public list names the world "horno" and the upload does not contain it"*. Before that, **2026-09-10**
— proven red against the old deploy, thirteen findings, first line `changarrito/`
(`docs/QA-PASS.md:138-139`; `docs/REGRESSION.md:146`).
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
**Last planted against: 2026-09-10** (`docs/REGRESSION.md:146`, "each proved by planting a real
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
sign-out (`changarrito/content/record.js:353-356`).
**Guards, and they are the densest set in the repo.**
- a write with no token never reaches the wire — `test/town.smoke.js:382`
- a write carries the token — `:387`
- **the token never enters a save** — `:408`
- sign-out leaves no `tokenAt`/`tokenExp` behind — `:473`
- a signed-**out** read carries no `Authorization` — `:493`; a signed-in read does — `:487`
- a refused signed read retries **unsigned** rather than giving up — `:490`
  (`changarrito/content/record.js:289`)
- the new-token link goes to GitHub's own settings page — `:474`
- the town's own how-to sheet, the one el pregonero carries, must contain the literal
  `python3 -m http.server 8765 --bind 127.0.0.1` and `127.0.0.1:8765/changarrito` —
  `test/town.smoke.js:333`. **That is the origin promise, read as the exact noun, inside the game.**
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
already cached"* (`test/bump.js:21-30`; `docs/REGRESSION.md:57`, proxy #11). Before that,
**2026-09-10**, red against two real historical commits (`test/bump.js:9-11`; `docs/QA-PASS.md:154-156`).
**Not planted:** the push-branch step at `.github/workflows/ci.yml:61-70` itself. `docs/REGRESSION.md:58`
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
nothing was attempted. That is the shape this file's own keeper names (`.claude/agents/zeni.md`, *the blindness looks
exactly like the pass*). See gap **G2**.

### 8 · Where the public page is allowed to talk
**Line: a person's browser.**
**Promise.** `index.html:10` — `connect-src 'self'`, `object-src 'none'`, `form-action 'none'`,
`base-uri 'self'`. The engine's server seam is deliberately dead: `NET={enabled:false,…}`
(`engine/engine.js:458`), and the pack-side record seam is off unless a pack declares one
(`:469-473` — "the public build's CSP allows neither, by test").
**Guards.** Three, reading three different nouns:
- the **source** CSP must equal a pinned literal — `test/smoke.js:3720-3723`
- the **shipped** CSP must exist and must not name `api.github.com` — `test/public.js:66-70`
- **every way the shipped page reaches out** — `src` *and* `href`, script, link, img, iframe, font —
  against a declared allowlist of exactly two hosts — `test/public.js:77-87`
**Last planted against: 2026-09-10** for the artifact-side checks (`docs/REGRESSION.md:146`). **never**
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
**Last planted against: 2026-09-10** (`docs/QA-PASS.md:173-176`; `docs/REGRESSION.md:48`, proxy #2)
— and the plant is the whole story: the first version blanked comments before testing each line, and
**a marker is a comment**, so it caught nothing and looked correct.

### 11 · What CI itself is allowed to do
**Line: a key** (the one GitHub hands the workflow).
**Promise.** "CI still never pushes a commit" (`.github/workflows/pages.yml:4`); `contents: read`
(`.github/workflows/ci.yml:2-5`, `.github/workflows/pages.yml:7-12`); and the standing rule —
**unacceptable, ever: a `contents: write` or `pull_requests: write` token in any browser**, and no
agent auto-started on an issue by anyone but the owner, or gated on a label
(`docs/story/el-changarrito.md:216-219`, R4a at `:172`).
**Guard, since the afternoon this file was written: `test/leaves.js`** (grep `function workflows`) — every
workflow declares `permissions:`; no `write` scope outside the deploy's own `pages`/`id-token` in
`pages.yml`, in any syntax (`write-all`, a block at any indent, `{flow}`); no `pull_request_target`,
`issue_comment`, `issues`, `label`, `discussion_comment`, `workflow_run` or `repository_dispatch` under `on:`, quoted or not. Run inside
`test/town.smoke.js` on every push and PR. **Last planted against: 2026-09-13**, by Melo: `write-all`,
a trailing comment and `"on":` all walked past the first draft. **The six plants are preserved as
fixtures** — `node test/leaves.js --selftest`, thirty-five cases on 2026-09-24 (grep `--selftest` in `test/leaves.js`)
— **and since 2026-09-20 (#217) `smoke` runs them on every push and PR**, in the step *The guards' own red
cases* (`.github/workflows/ci.yml`, grep `--selftest`), beside the self-tests of `runs.js`, `issue.js` and
`protect.js`. **Re-run by: that step.** *(Until 2026-09-24 this paragraph still said "nothing invokes them";
Zeni found it contradicting ci.yml while reviewing the `protection` job. The code was right.)* On 2026-09-13 I
verified by hand that `.github/workflows/` held exactly two workflows, both triggered on
`push`/`pull_request`/`workflow_dispatch`, and that `pages.yml`'s only write scopes are `pages: write` and
`id-token: write`, which are the deploy's own. **Today (2026-09-24) there are three:** `ci.yml` (`push`,
`pull_request`), `pages.yml` (`push` to `main` only — `workflow_dispatch` came off on 2026-09-21) and
`protect.yml` (`push` to `main`, `pull_request`, and a daily `schedule`); the write scopes are unchanged.
**Why this rises as crew mode approaches.** `docs/CITY-AS-MEMORY.md:76-86` makes **a label the lock**
for claiming an issue. `docs/story/el-changarrito.md:172` (R4a) says a trigger gates on
`issue.user.login == owner`, **never a label**, and `:206-208` refuses a label-gated merge action for
the same reason. Those two are not in conflict today — a claim label that nothing automated reads is
a note on a door, not a trigger — **but they become the same sentence the moment anything runs on a
label.** That is question Q1 below.

**Added 2026-09-24 — a third workflow, `protect.yml`, and what it sends out.** Its one job, `protection`,
reads GitHub's live rules for `main` (`GET /repos/<repo>/rules/branches/main`) on every PR, every push to
`main`, and **once a day** — so a lock switched off on a quiet day is red by the next morning, not at the
next push. It sends the workflow's own token — `contents: read` and nothing else, declared in the file;
issued by GitHub, sent only to `api.github.com`, never printed — and retries once without it, because the
rules of a public repository are public. The checkout does not keep the token (`persist-credentials:
false`). **Nothing leaves town but a read.** It is deliberately not a required check, so a GitHub hiccup
cannot block a merge. **What it cannot see, said in `test/protect.js`'s header:** the bypass list; an edit
to itself (a PR runs its own copy, fixtures and all, so only a person reading the diff stands between —
until *Require review from Code Owners* is on, docs/SECURITY.md §3 step 4); what the required job runs,
only its name; and any branch but `main`. **Last planted against: 2026-09-24**, twice — GitHub's real answer,
saved outside the repository, with deletion allowed, the check unpinned, up-to-date off, one approval on
the lock, a code owner's review on the lock, no rules at all, and a renamed job: all red, each in a sentence;
the real answer green, and green again with the plan's step-4 ruleset added beside it. Then five edits to
`test/protect.js` itself (the retry keeping the token, no retry, a refused answer read anyway, code-owner
review ignored, any approval anywhere read as a lockout): the self-test went red on every one. **Re-run by:**
the fixtures and the stubbed network cases, twenty-four in all, in `smoke` on every push and PR
(`test/protect.js --selftest`); the read of GitHub's real answer, in `protect.yml` daily. **Unrepeated:** the
plants against the saved real answer.

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
**Guards.** `.gitignore:12-20` — by **shape**, not by name (`*.tmp/`, `*.scratch/`, `*.tmp.*`,
`/*.png` with `!/icon-*.png`) — and the stop hook.
**Last planted against: 2026-09-11**, when `shots.tmp/` walked past `shots/` and the hook, not the
rule, caught it (`docs/QA-PASS.md:86-104`, E3½; `docs/REGRESSION.md:54`, proxy #8).
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
does, and what it reads is worth stating exactly, because two halves of it were bought with a plant the
same afternoon (grep the strings in `test/town.smoke.js`): the block must be **first** in every file
(grep `not the shared block — it says "before you answer anything"`) and appear **exactly once** (grep
`carries the shared block`); the front matter's `name:` must be the filename and the `You are **…**`
line must carry that name, accents folded (grep `the person it hands the model is somebody else`) —
**the count of identity lines was the first draft's noun, and one swapped name walked past it**; the
block must **hash identically** across all nineteen (grep `the shared memory block is not the same in
every persona`); and it must contain `docs/POSTMORTEM.md`, `docs/REGRESSION.md` and **eight pinned
spine strings** (grep `no longer carries`), because identity across nineteen files is satisfied
perfectly by editing nineteen files. Its first run against the
tree found Rigo's file carrying Toño's whole persona below a second copy of the block. `test/town.smoke.js` (grep `\.claude\/agents\/`) reads `.claude/agents/<name>.md`
paths out of persona-edit proposals in `docs/crew/FLIGHT-NOTES.md` — that is a different noun. See gap **G5**.

---

## The promises with no guard

*Plainly, and each with the smallest thing that would become a guard, and what that thing would have
caught in the past. "Smallest" means smallest — if it needs a sitting, it is not on this list.*

**A gap is struck out by a plant, never by a guard existing** *(added 2026-09-13 by Zeni, from
`docs/POSTMORTEM.md` §13i)*. Two of the gaps below were struck through on the day they were written, on
the strength of the guard having been built; **both guards were walked past within the hour** by
somebody trying to, and both had to be widened. Until something has been made false on purpose and has
printed a sentence a person would say, the honest mark is ***guard written, not yet planted***.

### 15 · What the owner's own laptop keeps running
**Line: the owner's machine, pulling from `main`.**
**Promise.** The town tells him there is something to pull exactly one way: `behind()` fetches main's
`changarrito/content/config.js`, reads its `GAMEV`, and compares **the whole string** against its own
(`changarrito/content/record.js`, grep `behind()`). Nothing else on his laptop knows a version exists.
**Guard.** `test/bump.js` — the town half: a change to a file under `changarrito/` that the town
actually **serves** (by extension, so a `.md` there is not one) must move that string. The noun is the
one `behind()` reads — *did the string move* — and not `ch-v` as a number: the town's version carries
the engine it was built on (`"ch-v105 · engine mq-v160"`), so a legitimate engine bump moves the string
without moving the town's own count, and a number guard would red it. Written 2026-09-15 at the owner's
word, on Yaz's measurement.
**Last planted against: 2026-09-15**, and not with a synthetic edit — **against this repository's own
history**. Of 71 commits touching `changarrito/`, ten left `GAMEV` standing still and **every one of
the ten changed code the town runs; none was documentation-only**, which is what killed the standing
objection that a guard would demand a bump on comment-only commits. Run over the last 25 town commits
the new guard goes red on six and green on nineteen; `cdcf4ee` — *"The claim moves to the outline"*,
a real change to how a claimed person is drawn, shipped at `ch-v102` with `record.js` edited and the
version standing still — prints the sentence a person would say.
**Not guarded.** That the signal *arrives*: `behind()` returns false whenever `mainVersion` is null,
so a laptop with no network, or a failed fetch, is silently never behind. The guard proves the string
moved, which is all it claims.

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

### G2 · The `#save=` prototype clause has never been planted at *(row 7)* — and the first recipe here could not fire
**Smallest guard.** The payload in `test/smoke.js` (grep `const evil =`) is a JS object literal and goes
on the wire through `JSON.stringify` — and **`__proto__:` in a literal is the prototype setter, not a
key**, so it never reaches the wire; the recipe this file first carried (add `bl: { __proto__: … }` to
the literal) would have printed green with the clause deleted. Build the plant **as text**: put a
literal JSON string carrying `"bl":{"__proto__":{"a":"b"},"ok":{"part":"opt"}}` through the `#save=`
hash, then assert `Object.getPrototypeOf(p.s.bl) === Object.prototype` and `p.s.bl.ok.part === 'opt'`.
Delete the clause in `engine/engine.js` (grep `a #save= link may not reach the prototype`) and watch it
go red first. The same reading condemns the payload already there: `qa: { __proto__: 9, … }` assigns a
primitive and creates no key at all.
**What it would have caught.** The clause being dropped by any refactor of `sanitizeSave`. And it retires
the `protoClean` assertion, which today asserts that a pollution nobody attempted did not occur
(`docs/POSTMORTEM.md` §13a).

### G3 · Nothing holds the town's writes to `/issues`
**Smallest guard.** In `test/town.smoke.js`, over the source of `changarrito/content/record.js`:
every string literal passed as the second argument of `this.write(` must start `"/issues"`. Today all
six do — `:399` (PATCH close), `:402` and `:406` (comments), `:408` and `:409` (labels), `:420`
(file a request) — so it is green on arrival, which means **it must be planted at**: change one to
`"/merges"` and watch it print.
**What it would have caught.** The v2 that `docs/story/el-changarrito.md:177` refuses outright
("Merge from the game… **do not build**", Critical) the day somebody typed it, rather than at review.
It is also the only mechanical half of the token-scope promise: a key minted wider than Issues is
invisible to us, but a *town* that asks for more than Issues is not.

### G4 · ~~Nothing reads a workflow's `permissions:` block, or its triggers~~ — guard built **and planted at** the same day, see row 11 *(row 11)*
**Smallest guard.** A dozen lines of Node over `.github/workflows/*.yml`: every file declares a
`permissions:` block; no `write` scope outside an allowlist of `{pages, id-token}` in `pages.yml`;
no `pull_request_target` and no `issue_comment` trigger anywhere.
**What it would have caught.** The state this repo was actually in — `ci.yml` with no `permissions:`
at all and an unpinned install (`docs/story/el-changarrito.md:235`, R9b, Medium: *"a bad dependency in
CI with a write token can push to `main`"*). And it is the row that will matter on the day crew mode
tempts somebody to automate a label.

### G5 · ~~The shared block in the nineteen personas is guarded by nobody~~ — guard built **and planted at** the same day, see row 14 *(row 14)*
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
**Smallest guard.** Extend the assertion that already exists at `test/town.smoke.js:333` to
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
working guard from a decorative one is a planted violation.* Every entry in that register says so.

### G9 · The plants are kept as fixtures and no runner invokes them *(row 11)*
**Half closed, 2026-09-20 (#217):** `smoke` runs `node test/leaves.js --selftest` on every push and PR
(`.github/workflows/ci.yml`, grep `--selftest`). **Still open:** `node test/closes.js --selftest` runs in no
workflow. *(Noted 2026-09-24; the entry below is as it was written.)*
**Smallest guard.** One line in `.github/workflows/ci.yml` beside the town step:
`node test/leaves.js --selftest` — and `node test/closes.js --selftest`, which is invoked by nothing
either (grep `--selftest` in `test/closes.js`).
**What it would have caught.** Reverting `test/leaves.js`'s permissions pattern to the first draft's
`^\s+scope: write$` — **the exact regression bought by a plant on 2026-09-13** — which the half that
*does* run (`consistency()`, called from `test/town.smoke.js`) cannot see on a clean tree, because the
real workflows carry no `write-all` for it to miss. Nothing else on the board would print a word. The
same is true of the other five spellings Melo walked past, and of the three citation cases that were
genuinely red on `main` that morning.
**Honest note.** A self-test is a guard about a guard, and its own extraction can go blind the same
way: `completeness()` returns silently when `git ls-files` throws (`test/leaves.js`, grep
`catch (e) { return P; }`), so on a box without git the third derivable set is skipped and **nothing
says so** — which is this file's own rule (*nothing to look at is not a pass*) applied to itself.

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
| `.github/workflows/protect.yml` | zeni, yaz, melo | a key — the workflow's `contents: read` token, sent to GitHub alone, daily and on every PR, to read whether `main` is still locked | 2026-09-24 |
| `.github/CODEOWNERS` | zeni | who must open a diff before it merges — the list of paths a second agent's PR cannot land on green alone, once the owner turns on code-owner review | 2026-09-21 |
| `.github/scripts/city-record.js` | zeni | the public build — the one file written from the API into the box | 2026-09-13 |
| `test/public.js` | melo, zeni | the public build — the guard that reads the box | 2026-09-13 |
| `test/record.js` | melo | the public build — the guard that reads status.json | 2026-09-13 |
| `index.html` | zeni | a person's browser — where the public page may talk, and what it loads | 2026-09-13 |
| `sw.js` | zeni, yaz | a person's browser — what is stored on a device and for how long | 2026-09-13 |
| `manifest.webmanifest` | yaz | a person's browser — the installed app's identity and start url | 2026-09-13 |
| `icon-192.png` | yaz | a person's home screen — the installed app's face; found 2026-09-21 by the rewritten copy-line reader in `test/leaves.js`, which had derived zero shipped paths until then | 2026-09-21 |
| `icon-512.png` | yaz | a person's home screen — the same, at the size the splash uses | 2026-09-21 |
| `qr.js` | zeni | the public build — third-party code in every player's browser | 2026-09-13 |
| `vendor/three.min.js` | zeni | the public build — third-party code in every player's browser | 2026-09-13 |
| `engine/` | zeni, beto | a person's browser — both games' shared code; every trust boundary | 2026-09-13 |
| `content/meridian/` | zeni | the public build — the public game's own words and data | 2026-09-13 |
| `content/horno/` | zeni | the public build — a second world, one room and one tray, shipped at the owner's word; its shell is generated at build time and is not in git | 2026-09-22 |
| `content/gauge/` | zeni, melo | a person's browser — the paper seam's live attack: a pack that tries to reach out of the reader, run on every push | 2026-09-16 |
| `changarrito/index.html` | zeni | a key — the CSP that lets a token-bearing page reach GitHub | 2026-09-13 |
| `changarrito/content/record.js` | zeni | a key — where the token is kept, what carries it, what it writes | 2026-09-13 |
| `changarrito/README.md` | zeni | a key — the origin the key is allowed to exist on | 2026-09-13 |
| `.gitignore` | zeni | nothing — what reaches a commit | 2026-09-13 |
| `test/protect.js` | zeni, melo | a key — the workflow's `contents: read` token (by hand: whatever `GITHUB_TOKEN` the shell holds), sent to `api.github.com` alone, to read whether `main` is still locked | 2026-09-24 |
| `CLAUDE.md` | chuy | nothing — where the promises are written down | 2026-09-13 |

### Does that script read a noun or a proxy? — a proxy, and here is exactly which

A script that (a) lists those paths, (b) fails when a listed path has no row in this ledger, and
(c) prints which listed paths a diff touches does **two different things, and only one of them reads
a noun.**

- **(b) reads a real noun, and the noun is the ledger's soundness and its completeness on three
  derivable sets** — every path in the table exists and is routed to a persona that exists; and every
  file under `.github/`, every path `scripts/build-site.sh` copies, and every source file naming the API
  host or an `Authorization` header has a row. *(The first draft read soundness only and called it
  completeness; Melo deleted the row for the file that holds the owner's key and it printed OK.)*
- **(a) and (c) read a proxy.** The noun is *did something leave town*. What they read is *did a file
  whose name somebody already thought of change*. That is a **denylist wearing an allowlist's coat**,
  and by this project's own rule it can only name yesterday's edges (`docs/QA-PASS.md:140-142`). It
  cannot see:
  - a **new** file that becomes an edge — a third workflow, a second public pack, a new fetch in a
    file not on the list. `scripts/build-site.sh:19` copies `engine/` and `vendor/` wholesale, so a
    new file under either ships without any listed path changing;
  - **anything that is not a file**: the Pages Source dropdown (row 1), a repository secret, a
    token's scope, a branch protection rule. Row 1 — the most costly row on this page — is
    structurally invisible to this script;
  - a change whose *meaning* moved while its bytes did not: `docs/REGRESSION.md:49` (proxy #3) is the
    same species — *lockstep is not movement*.

**So say it in the file rather than in a commit message:** `test/leaves.js` is an **announcer, not a
gate**. Its honest output is *"these edges moved; go read their rows"*, plus a hard failure when a
listed path has no row. It must never print a sentence of the shape "nothing left town", because it
cannot know that — and `OK` printed by a check that matched nothing is the most expensive line of
output in this repository (`.claude/agents/zeni.md`, *what you hold to*). The check it must **also** carry, or it joins
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
