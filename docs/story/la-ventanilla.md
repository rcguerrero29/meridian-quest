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

**What game developers actually do.** Debug menus are compiled *out* of release builds;
live-ops consoles are separate apps behind real auth. Nobody hides a channel in the shipped
client, because the shipped client is the one thing every player has a copy of. A static
site makes that literal: there is no hidden anything — view source.

**This game already has both halves of the right pattern:**
- **Admin mode** (`engine.js` ~3396): per device, in `localStorage` (`mqadmin`), never in
  the save, never in the URL. A flag that lives only on your phone.
- **The `NET` seam** (`engine.js` ~265, `IDEAS.md` §4): *"a future game plugs a backend in
  HERE and nowhere else."* Empty on purpose, waiting.

**The design — four rules, then the mechanics.**

1. **The public build never changes.** CSP stays `connect-src 'self'`. Not one branch of
   engine or content behaves differently for you. No `?dev=1`. That is the actual risk here
   — not the token, the temptation to make the public build *know about* the private one.
2. **No secret ever enters the repo.** Not in code, not in a comment, not in CI variables
   the game can read.
3. **The personal build is two gitignored files.** `index.local.html` — a copy of
   `index.html` with `connect-src` widened to exactly `https://api.github.com` and one extra
   script tag; and `content/meridian/net.local.js`, which fills `NET` and `RECORD`:
   `boot()` reads a token you typed once into `localStorage`, `RECORD.fetch()` reads GitHub
   directly (open PRs, issues) instead of `status.json`. Both files in `.gitignore`; a smoke
   assertion fails if any *tracked* file references `net.local`.
4. **The token is the smallest one that works.** A GitHub fine-grained PAT, **this repo
   only**, permissions `issues: write` + `pull_requests: read`, 30-day expiry, revocable in
   one click. If it leaks, the whole blast radius is: someone can open issues on this repo.

**What "connected to you" honestly means.**
- **You → Claude.** The personal build files a GitHub issue from her window ("side quest:
  …"). A routine on this account, or a `claude-code-action` job on `issues: opened`, starts
  a session on it. That session has the repo, the docs and this plan — it is the real thing.
- **Claude → you.** Sessions already write to the repo; CI writes `status.json`; sessions
  can comment on the issue, and in the personal build she reads the issue thread too.
  Outside the game, a scheduled routine pushes a phone notification when a PR is green.
- **A live chat box with Claude inside the game** is a different product: the Claude API
  behind a relay *you host* that holds the key, with a monthly cost and its own auth. Not
  now, and not required for any of the above.

**Risk verdict: low**, and the risk is not where it looks. Rules 1 and 3 are what keep it
low; rule 4 is what makes the worst case boring. **Cost:** a quarter sitting, most of it
writing rules 1–4 into `OWNER.md` and the smoke assertion; `NET` already exists.

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
