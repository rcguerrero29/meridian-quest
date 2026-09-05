# La ventanilla — the clerk with the city's record

*A plan, not a build. Opened 2026-09-05 at the owner's ask: "keep planning this little
character, but dont build, just make sure to point out places where we need tags or
something in case we would like to track those." Everything below is designed against the
code as it stands at `mq-v64`; every seam names a real file and a real function.*

**The one-line version:** she is the only character in the city who knows what the *repo*
has on file — a permit awaiting your signature (an open PR), the version the city is running
(`sw.js` `CACHE`), the asks still on the wall — and she says it in her own voice, ask-only,
past tense, filed things only. In the public game she reads a small file the deploy writes.
In the owner's personal build she can also read GitHub directly and *file* a request back.

---

## 1 · Who she is (unchanged from `STORY.md`, Nacho's three laws + the owner's relaxation)

- **Not a villain and not an obstacle.** A *ventanilla* clerk on the barrio's side, bound
  by paperwork. The comedy is she needs the form; the warmth is she wants you to pass.
- **Speaks only about what is filed.** Past tense. Never "you should"; only "the city has
  on record that…". Relaxed by the owner (2026-09-02): she MAY speak about what is
  missing, **but only when you walk to her window and ask.** Nothing pushes a list at you.
- **Droppable, like the franchise.** A pack that declares no record gets no clerk, no
  window, no marker — the same rule `READS`/`DOCS` already follow (engine.js ~2076).
- **Government is not a trade the city trains.** She is not a district and trains no role.
- **The named exception to "never build a quest log"** (`OWNER.md`). The rule bans a list
  that *finds* you; she is a clerk you *choose* to visit.

She has no name yet. Bere plants her only as a place: *"the window at city hall."*

---

## 2 · What she reads — two records, deliberately separate

| Record | Who keeps it | Exists? | She reads it as |
|---|---|---|---|
| **The player's** — grades per district, what's closed, what was handed to you | `worldFlags()` in `engine.js` (~3249) and `handedDocs` | **yes** | "The city has your mercado memo on file. Filed clean." |
| **The city's** — what the repo has on paper: open PRs, deployed version, open asks | `status.json` beside the game, written by the deploy, never by the game | **no** | "A permit (#2) is awaiting your signature. Filed today." |

**`status.json`, proposed shape.** Small on purpose; every field is something she can say
in the past tense.

```json
{ "v": 1, "written": "2026-09-05T17:40:00Z",
  "deployed": "mq-v64",
  "permits": [ { "n": 2, "title": "Correct the mercado gate…", "green": true, "mergeable": true } ],
  "asks":    [ { "name": "La caja de escalera", "since": "2026-09-05" } ],
  "branches": [ "claude/small-remaining-updates-58xsy6" ] }
```

The engine never learns what a permit is. Content maps fields to lines (§4, "her words").

---

## 3 · Where she stands — a decision, not a plan

There is no city hall. Three candidate sites, Don Güero's call (**❗El solar de la
ventanilla**, logged in `ASKS.md`):

1. A window on Calle Principal (`st`) — she is *of* the street, like the mural.
2. The Nolasco walkup — paperwork lives with the paperwork man; risks reading as his staff.
3. HQ ground floor — closest to where you spawn; risks becoming a to-do list at the door.

Whatever the site, the window is a **tile with a glyph**, and the uppercase alphabet is
spent (`BACKLOG.md` §1): the glyph must be a digit or symbol not yet in `TILES`. The
tilesheet test in `test/smoke.js` lists what is free.

---

## 4 · The seams — every place she touches, with the tag that finds it

**Tagging rule.** In *content* and *docs* the word is `ventanilla`. In the *engine*,
`sw.js` and CI the word is `city record` — the portability guard in `test/smoke.js`
(~1670) fails the build if a Meridian name appears in `engine/`, and she is Meridian's.
Two greps find everything: `grep -rn ventanilla content docs` and
`grep -rn "city record" engine sw.js .github`.

| # | Seam | File · anchor | What changes | Tag |
|---|---|---|---|---|
| 1 | **Her person** | `content/meridian/npcs.js` — `NPCE` (emoji), `NPCLOOK` (look, keyed by id), the EN/ES title tables | one entry each; site from §3 | `ventanilla` |
| 2 | **Her words** | `content/meridian/npcs.js` say-lines, EN+ES in lockstep | a small function of the record → lines, never a static list. Past tense only | `ventanilla` |
| 3 | **The record source** | `engine/engine.js` beside the `NET` seam (~265) | a sibling seam: `RECORD={enabled:false,fetch(){}}`; content declares `RECORDSRC="./status.json"`. Same rule as `NET`: this is THE place the engine reads a file, nowhere else | `city record` |
| 4 | **Her window is a readable thing** | `engine/engine.js` READS/DOCS (~2076, ~2162) | one engine change: a `DOCS` entry may be a **function of the record**, not only a string. The marker, Read button and panel already exist | `city record` |
| 5 | **Fetching it** | `index.html` line 10, the CSP | **no change in the public build** — `status.json` is same-origin, `connect-src 'self'` already allows it | — |
| 6 | **Caching it** | `sw.js` (`CACHE`, the fetch handler ~21) | the worker is cache-first; `status.json` must be **network-first with cache fallback** or she is stale forever. One path carved out | `city record` |
| 7 | **Writing it** | `.github/workflows/` | today Pages serves branch `main`; CI cannot add a file without a commit. Switch Pages to an **Actions deploy** (`upload-pages-artifact`) and write `status.json` in that job from the GitHub API. Name the step "write the city record" | `city record` |
| 8 | **What she has told you** | `engine/engine.js` `save()` (~287), `sanitizeSave()` | a seen-once set `vt`, like `so`. **The `mq-v52` lesson:** a key the loader does not carry is a key that is lost — add it to the loader in the same commit | `city record` |
| 9 | **The outbound sheet** (you → the build session) | `content/meridian/room.js` pattern; `docs.js` Copy/Download | a second READ at her window: *File a request* → pick from the open side quests + free text → **Copy the sheet**, paste into a session. No network | `ventanilla` |
| 10 | **Tests** | `test/smoke.js`, `test/shots.js` + `spots.json` | (a) a pack with no `RECORDSRC` gets no clerk, no window, no marker; (b) the loader round-trips `vt`; (c) the portability guard still passes; (d) her window in all four cameras | `city record` |
| 11 | **The ledger** | `CITY.md`, `ASKS.md`, `BACKLOG.md` §2, `STORY.md` open thread | rows point here | `ventanilla` |

---

## 5 · The personal build — "a sole backdoor for us" answered

*Rewritten 2026-09-05 after a security review against the code. The first draft said
"risk: low." It was low for the token in isolation and wrong about everything the token
feeds. The corrections are marked.*

**What game developers actually do.** Debug menus are compiled *out* of release builds;
live-ops consoles are separate apps behind real auth. Nobody hides a channel in the shipped
client, because the shipped client is the one thing every player has a copy of. A static
site makes that literal: there is no hidden anything — view source.

**What this engine already has for it:** the `NET` seam (`engine.js` ~265, `IDEAS.md` §4):
*"a future game plugs a backend in HERE and nowhere else."* Empty on purpose, waiting.
~~Admin mode is the other half~~ — **corrected:** admin mode is a Settings button any
player can press (`index.html` ~403, `engine.js` ~3405). It is per-device tooling, not
auth, and nothing sensitive may ever be gated on it.

**The design — seven rules, then what "connected" means.**

0. **The personal build is served from an origin nothing else uses.** `localhost` on a
   port reserved for it, from a gitignored folder. **Never `rcguerrero29.github.io`** —
   every project site on the account shares that one origin, so a token stored there is
   readable by the public game and by every future Pages project; every future DOM bug in
   the public game would become a token-theft bug. Never `file://` (Chrome shares
   `localStorage` across all local files). *This rule was missing from the first draft and
   is the one that makes the others hold.*
1. **The public build never changes.** CSP stays `connect-src 'self'`. Not one branch of
   engine or content behaves differently for you. No `?dev=1`, no `?admin=1` — the engine
   reads `location` only for `#save=` today, and a smoke assertion keeps it that way.
2. **No secret ever enters the repo.** Not in code, not in a comment, not in CI. A token
   is never a save key (`sanitizeSave()` whitelists keys, so a `#save=` link can never
   carry it) and never rides `NET.sync()`.
3. **The personal build is two gitignored files and no service worker.**
   `index.local.html` — a copy of `index.html` whose CSP is
   `script-src 'self'` (the `'unsafe-inline'` exists only for the SW-registration
   snippet, and there is no SW here) and `connect-src 'self' https://api.github.com`, plus
   one extra script tag; and `content/meridian/net.local.js`, which fills `NET` and
   `RECORD`. **No `sw.js`:** the public worker caches every GET from any origin
   (`sw.js` ~22-29) and would freeze the town at first load with private data at rest.
4. **The token is read-only until the day it isn't.** Fine-grained PAT, **this repo
   only**, 30-day expiry: `pull_requests: read` + `issues: read` for v1. Add
   `issues: write` only when "file a request" ships. **Corrected blast radius:**
   `issues: write` also edits, closes, labels and comments as you — and if anything starts
   an agent from an issue, a leaked token starts agents. That is why rule 5 exists.
5. **Nothing starts a session from an issue unless the issue's author is you.** Gate on
   `issue.user.login == owner`, never on a label (a label is one API call away for anyone
   holding the token). No `pull_request_target` or `issue_comment` triggers. Sessions run
   with their normal permission prompts. The prompt says issue text is data. *The repo is
   public and issues are open: without this rule, anyone on the internet can put
   instructions in front of an agent that has repo write.*
6. **The town only reads what you wrote.** Fetch with `?creator=<owner>` and drop anything
   else client-side, comments and fork PRs included. Titles through `sanName()`
   (`engine.js` ~3507), bodies through a `sanLine()`-style clamp with bidi and zero-width
   characters stripped; rendered as plain text via `textContent` or canvas only; **never
   Markdown-to-HTML, and never through the one `innerHTML` sink that takes content strings
   (`engine.js` ~2359, the quest verdict card)** — that sink is trusted-content-only today
   and should be rebuilt with `textContent` regardless.

**What "connected to you" honestly means.**
- **You → Claude.** The personal build files a GitHub issue from her window. A routine or
  a job starts a session on it **only under rule 5**. That session has the repo, the docs
  and this plan.
- **Claude → you.** Sessions already write to the repo; CI writes `status.json`; sessions
  comment on the issue; outside the game a scheduled routine pushes a phone notification
  when a PR is green.
- **Merging a PR from inside the game (v2) — do not build.** Merging needs
  `contents: write`, and Pages serves `main`: that token would mean "publish JavaScript to
  every player, cached by their service worker." Merge from GitHub, behind 2FA.
- **A live chat box with Claude inside the game** is a different product: the Claude API
  behind a relay *you host*. Not now, and not required for any of the above.

**Risk verdict — corrected.** *Medium as first drafted; low only with rules 0–6, and
rule 0 and rule 5 do most of the work.* The risk was never the token. It is (a) where the
token lives, and (b) the pipeline the token feeds — a public repo's issues in front of a
write-capable agent. **Cost:** a quarter sitting for the two files and the local server,
plus a quarter for the smoke assertions (rule 1, rule 3, rule 6) and two CI hygiene lines
(`permissions: contents: read` at the top of `ci.yml`; pin `playwright`).

**The smoke assertions the guarantee needs** (over `git ls-files`, so a gitignored file
cannot satisfy them): tracked `index.html`, `engine/`, `content/`, `sw.js`, `qr.js` and
the manifest contain none of `api.github.com`, `net.local`, `github_pat`, `Authorization`;
`engine/` contains no `location.search` or `URLSearchParams`; the public CSP equals a
pinned literal; loading `index.html?dev=1&admin=1#admin=1` leaves `admin === false`;
`.gitignore` lists both personal files. The grep must exclude `docs/`.

---

## 6 · The tags — three places to track her

| Where | The tag | How to find everything |
|---|---|---|
| **In code** | `ventanilla` in content and docs; `city record` in `engine/`, `sw.js`, `.github/` | the two greps in §4 |
| **In the ledger** | ❗La ventanilla (exists) and three sub-asks: **❗El solar de la ventanilla** (where she stands), **❗El expediente** (what `status.json` holds), **❗La puerta trasera** (the personal build, rules 1–4) | `grep -n "❗" docs/ASKS.md docs/CITY.md` |
| **On GitHub** | a label `ventanilla` on every issue and PR that touches her | one click to create when the owner says |

---

## 7 · Cost, in sittings

| Piece | Cost | Blocks on |
|---|---|---|
| Actions deploy + `status.json` (seams 6, 7) | a quarter | nothing |
| `RECORD` seam + DOC-as-function + `vt` + tests (3, 4, 8, 10) | half | nothing |
| Her person, words EN/ES, the window tile (1, 2, §3) | half | Don Güero siting her; Nacho naming her |
| The outbound sheet (9) | a quarter | nothing |
| The personal build (§5) | a quarter | nothing |
| **Total** | **1¾ sittings** | — |

**None of it before the four newer districts have been played** — the owner's own ranking.
She is a feature for an audience of one until the game has an audience.

---

## 8 · Open decisions — side quests for the owner

1. **Where does she stand?** §3 — Don Güero sites; the owner signs.
2. **What does the record hold?** PRs only, or asks and branches too? Recommended: PRs and
   the deployed version first; asks once `ASKS.md` has a machine-readable shape.
3. **Public or personal?** Does she exist in the public build at all? Recommended: yes —
   she is a character; the personal build only makes her know more.
4. **Her name.** Nacho's.
5. **Build the free half now?** The phone reminder (a routine, zero game code) needs none
   of the above and can be set up today.
