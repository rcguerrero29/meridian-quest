# El Changarrito — a second world for one player, where the backlog is the street

*A plan, not a build. Opened 2026-09-05 at the owner's ask: "maybe we split out as a
version to help me have fun managing backlogs" and "sure do this plan, but take into
account that no npc/character/animal/dog should have complex tasks unless specifically
associated with, lets say, Sonny." Two expert reviews were run against the code before a
word was written — an engineering feasibility pass and a security threat model. Where
they disagree the disagreement is shown and resolved. Every claim below cites a file and
a line as it stood at `mq-v64`.*

**The one-line version:** the same engine, a second content pack, one street. Every open
GitHub issue you wrote is a person with something to say; every open PR is a permit at
la ventanilla's window; closing an issue is the goodbye. It runs on your laptop, reads
GitHub with a token that lives only in your browser, and never touches the public game.

**The honest headline:** feasible, about **five sittings** for v1, not the two guessed
before the reviews — and the first sitting is engine hygiene that Meridian needs anyway.

---

## 1 · The rule of weight (the owner's law, written in)

A character carries only what its weight allows. This is decided by a label on the issue,
and the label picks the body:

| Label | Who carries it | What they can do | Engine path |
|---|---|---|---|
| `tier: high` | a **named person** with a look and a title | stands still at a declared tile, wears ❗, opens a document (title, body, labels, age) with a **Done** button | `addChill()` + a `doc` + one button section (§4 B2) |
| `tier: normal` | **townsfolk** — a face from the shared pool, first name only | wears ❗, says the title in one line, Done from the card | `addChill()` with `chat` |
| `tier: low` | **nobody** — a pinned note on the board at the window | listed, read, closed from the board | a `READ` whose `DOC` is built from the record |
| animals | **never a task** | a butterfly, a cat, the pigeon carry nothing. **Sonny is the exception the owner named on the first walk** (2026-09-05, §9): he comes with his whole mini game — follows you, sit / lie / stay, the ball, the cone — and may carry a *note*, never a task | `CRITTERS` in the town's pack; a `pk` room so the leash warp has somewhere to go |

~~Sonny only gets more if a game is built around him.~~ **Amended by the owner after the first
walk (§9): "include sonny... he has a whole mini game already."** He comes as he is. The engine's animals are pinned to Meridian's world ids anyway (`DOG` in `hq`,
`CAT` in `lc`, the pigeon and parrot in `st`, `engine.js:1153, 1208, 1252, 1284`): if the
Changarrito names a street `st`, Paloma and the parrot show up uninvited unless their
coordinates are solid there. That is a quirk to place around, not a feature to design on.

**Capacity is part of the rule.** Meridian's street is 30×16 with ~356 walkable tiles;
each person takes a tile and needs a free neighbour. Past **10–12 people** the street
reads as a queue. Overflow goes to the board as notes, or to a second block. A backlog
with forty open items is not forty people; it is a street with a dozen and a board.

---

## 2 · What it is, concretely

- **One spawn room + one street.** NEW-WORLD's minimum. The spawn room must be named `hq`
  with (10,11) walkable and the street `st` — the engine hardcodes both (§4 B4). Names on
  the map are the pack's; the ids are the engine's.
- **La ventanilla stands here first.** Her window on this street, her laws unchanged
  (`la-ventanilla.md` §1): ask-only, past tense, filed things only. Here she also keeps
  the board of `tier: low` notes and the permits (open PRs).
- **The record is GitHub**, not the markdown. Issues and PRs of `rcguerrero29/meridian-quest`,
  read through `api.github.com`. `docs/ASKS.md` and `docs/BACKLOG.md` stay as narrative;
  issues become the machine-readable ledger. **Day one the street is empty:** the repo has
  zero real open issues and no `tier:*` labels (checked live 2026-09-05). Labelling is the
  prerequisite, not a follow-up (§7, step 0).
- **The loop.** Walk up, read, do the thing in the real world, come back, press Done.
  Done is `PATCH /issues/{n} {state:"closed"}`; the person says goodbye and leaves; the
  street refetches. XP per close, a grade for how long it sat — free, the engine does it.
- **File a request.** A second READ at the window: the free-text step the office interview
  already has (`room.js`, `roomSheet` `engine.js:2462`) → `POST /issues` with a label. This
  is how a session, or you, creates a character: **a labelled issue is a person.** No code
  per character, no art per character.
- **Not in v1:** merging a PR from inside the game. See §5, and both reviews agree it
  should not be built the way it was first imagined.

**A design tension the engineering review surfaced, kept on purpose:** the engine itself
pushes "somebody has something to say" at you (`worldPending` `engine.js:294`,
`portalNudge` `2130`). In Meridian that is the to-do list `OWNER.md` forbids. Here it is
the point. The Changarrito is allowed to nag; Meridian never is.

---

## 3 · Memory — the owner's question, three layers

**Between sessions.** I remember nothing. The repo is the memory: `NEXT-SESSION.md`,
`ASKS.md`, `CITY.md`, and from now on GitHub issues. That is why this session spent its
time correcting stale claims — a wrong line in those files is a wrong memory the next
session inherits. Issues make the ledger machine-readable and give it a state GitHub keeps
honest (open/closed, dated, labelled). **The Changarrito is a reader of that memory, not
a second copy of it.**

**The game's save.** Tiny: a typical Meridian save is ~420 bytes; the theoretical maximum
after `sanitizeSave()`'s clamps is ~474 KB (`engine.js:301-334`); `localStorage` allows
~5 MB per origin. **Size is not the problem. Key collision is** (§4 B3): both games use
the literal key `"mq1"` and nineteen more, and `localStorage` is per-origin, not per-path.
Nothing about issues goes into the save — the save clamps quest indexes to 0..98
(`engine.js:316-324`) and issue numbers grow forever. GitHub is the record; **closed is
seen.** (This retires the `vt` save key from `la-ventanilla.md` §4 seam 8.)

**The issues cache.** Raw GitHub JSON is 2–4 KB per issue; keep only
`{number, title, labels, body ≤ 2000 chars, updated_at}` → ~30 KB for a hundred. Stored
under the pack's own key prefix with the `ETag` and a `fetchedAt`; boot from it, refetch
conditionally (a `304` costs nothing against the rate limit). Offline, the street is the
last good record and the clerk says "filed as of Tuesday." **The service worker is never in
this path** (§5 R6).

---

## 4 · Feasibility — the engineering review, condensed

**Verdict:** v1 (read + people + file-a-request) is feasible, ~5 sittings. **Not with
`PEERS`, and not before two engine changes that Meridian ships too.**

**B1 · `PEERS` is render-only — do not use it.** Bodies are drawn in front, top and 3D
(`engine.js:958, 1048`, `engine3d.js:344`) and **not in iso** (`drawIso` has no loop). No ❗
(the marker comes only from `w.npcs` passes via `hasSay()`, `engine.js:367`), and
`checkTalk()` (`2150`) searches only `CW().npcs`. The comment at `271-273` claiming looks
are validated is false in code. **Use `addChill()` instead** (`engine.js:103-114`): it
pushes a real npc into `WORLDS[w].npcs`, registers name and look, renders in all four
cameras, gets the talk button, survives `rebuildWorld()`. `spawnCustom()` (`3518-3535`)
is the exact template for "a person from an untrusted record" — `sanName`, `hexOK`,
`randLook`.

**B2 · Five small hooks so a data-driven person carries a document and a Done** (~15
lines, each behind a hook a pack may omit, each with a red-first test):
1. `hasSay()` (`367`): also true when `n.say` is a function that returns text.
2. `wanders()` (`39-40`): a person with something to say stands still — otherwise the ❗
   drifts up to three tiles and chases you.
3. The talk click (`2213`): if the npc has a `doc`, `docOpen(n.doc)` — it already accepts
   an inline document and renders everything through `textContent`. Issue bodies are safe
   there.
4. `docOpen()`'s section renderer (`2043-2062`): one new section kind, a button. That is
   Done.
5. `removeChill(key)`: the inverse `addChill()` never had — splice the npc, restore the
   tile from `w.rows` (not `"."`), drop the name and look.

**B3 · Shared-origin storage collision — the top blocker, whichever host wins.** All
GitHub Pages project sites on one account share the origin `rcguerrero29.github.io`. Both
games would run the same engine with the same literal keys — `"mq1"` (`engine.js:288,
336`), `mqlang`, `mqadmin`, `mqroom`, `mqnpcs`, `mqcam`, `mqtheme`, `mqpark`… twenty of
them. Opening the Changarrito would load the Meridian hero, clamp the world to `hq`, then
overwrite Meridian's save. **Fix:** a pack-declared prefix (`STOREPFX`, default `"mq"`),
every literal replaced, and a smoke assertion that `engine/` contains no `"mq1"`. The
service worker has the same bug: `sw.js:14-16` deletes every cache whose name is not its
own, and `caches.match` searches the whole origin.

**B4 · The hardcoded world ids — which bite.** Crash or silent reset without a world
literally named `hq` with (10,11) walkable: `engine.js:17, 157, 174, 2529, 2571, 2585,
3453, 3500, 4035, 4038`. `drawTown` (`3259-3276`) throws without `st`. `sanitizeSave`
clamps world ids to **4 characters** (`333`). The rest are cosmetic but leaky (animals,
floor tints, the `f2` stair glyph, the park block). Also outside the portability guard:
`"Meridian Quest"` printed at `4062`, `3391`, `3191`, `2697` — the NAMES list in
`test/smoke.js:1674-1679` does not contain `meridian`.

**B5 · The service worker poisons API calls.** `sw.js:24` is cache-first for every GET of
any origin; `:25-27` stores the response **without checking `res.ok`**, so a 403 or a
bad-token 401 becomes the permanent answer; `:28` returns `index.html` for a failed JSON
fetch. `Vary: Authorization` makes a poisoned entry stick until the token rotates. Fix:
`if(method!=="GET"||origin!==location.origin)return;` and `if(!res.ok)return res;` before
the put. `sw.js` has no runtime tests (it cannot register from `file://`), so this gets a
Node unit test on its source.

**Live API facts (checked 2026-09-05).** Repo public. Unauthenticated: 60 requests/hour —
enough for reads (one fetch at launch plus a five-minute poll is 13). Fine-grained PAT:
5,000/hour. `ETag` and CORS (`Access-Control-Allow-Origin: *`) are there. `GET /issues`
includes PRs — filter items carrying a `pull_request` key. `mergeable` is per-PR and lazy;
"green" is a check-runs call per head — the clerk's permits cost N+1 requests.

---

## 5 · The threat model — the security review, condensed

The repo is **public** and issues are open. That one fact shapes everything.

| # | Threat | Severity | Rule that answers it | v1 blocker |
|---|---|---|---|---|
| R1b | The token on the shared Pages origin — every present and future public-game bug, and every other Pages site on the account, can read `localStorage` | **High** | **serve the town from an origin nothing else uses: `localhost` on a reserved port.** Never Pages, never `file://` | yes |
| R1a | Token theft via XSS: `script-src 'unsafe-inline'` (`index.html:10`) is no defence. One live `innerHTML` sink takes content strings unescaped — the quest verdict card, `engine.js:2359` | High | issue text reaches only `textContent`/canvas paths; the town's CSP drops `'unsafe-inline'`; rebuild `2359` with `textContent` regardless | yes |
| R4a | **Prompt injection.** Anyone can open an issue; if anything starts a Claude session on `issues: opened`, anyone can put instructions in front of an agent with repo write | **Critical if automated** | any trigger gates on **`issue.user.login == owner`**, never a label; no `pull_request_target`/`issue_comment` triggers; sessions keep their permission prompts; the prompt says issue text is data | yes |
| R2a | Untrusted titles/bodies as names and dialogue: 256-char titles, 64 KB Markdown bodies, bidi and zero-width characters | Medium | fetch `?creator=<owner>`, drop the rest client-side (comments and fork PRs too); `sanName()` (`3507`) for titles, a `sanLine`-style clamp for bodies; **plain text only, never Markdown-to-HTML** | yes |
| R1e | `issues: write` is more than "open issues": edit, close, label, comment as you — and start agents, if R4a is not held | High | read-only token for v1 (`issues: read`, `pull_requests: read`); `issues: write` only when file-a-request ships | partly |
| R6 | The SW caching `api.github.com` responses with private data at rest | Medium | the town registers **no service worker** | yes |
| R7 | The public-build guarantee has no test, and a naive grep for `changarrito` already fails on `docs/` | Medium | smoke assertions over `git ls-files`: no `api.github.com`, `net.local`, `github_pat`, `Authorization` in tracked engine/content/index; no `location.search`; CSP equals a pinned literal; `?dev=1&admin=1` leaves `admin === false` | yes |
| R8 | **Merge from the game (v2).** Needs `contents: write`; Pages serves `main` → that token is "publish JavaScript to every player, cached by their SW" | **Critical** | **do not build.** Merge from GitHub behind 2FA | v2 must not exist |
| R9b | CI: `npm install playwright` unpinned, no `permissions:` block, so `GITHUB_TOKEN` may be read-write | Medium | `permissions: contents: read` at the top of `ci.yml`; pin playwright | no |
| R3 | The `#save=` share link — checked: parsed through `sanitizeSave`, never touches `innerHTML`, needs a tap. No injection path today. One nit: `bl` keys are not filtered (`__proto__`) | Low | one `if` in the `bl` loop (`3325-3330`) | no |

**How it is served, exactly — the one place a local server bites.** `localhost` is not
reachable from the internet; publishing this plan exposes nothing. But a local server
started carelessly listens on *every* interface, and on a café or hotel network that is
the whole room. So: **bind to the loopback address explicitly** —
`python3 -m http.server 8765 --bind 127.0.0.1` (bare `python3 -m http.server` binds
`0.0.0.0`). Never a tunnel (ngrok and friends) in front of it. Nothing in the repo links to
it, and the port number is not a secret — every developer runs one.

**What *is* public: the issues.** The town writes to a public repo. Anything typed into
"file a request" is on the internet the moment it is filed — a client's name, a password
pasted by mistake, a private note. That is the normal risk of this design, and the rule is
simple: the town is for the game's backlog, not for private notes. If private notes are
ever wanted, the security review's alternative stands: a **private ledger repo** the town
writes to and sessions read, where outsiders cannot write at all.

**On hosting, the two reviews disagreed, and both are right about different things.**
Engineering: a `changarrito/` folder in this repo, because a separate repo gives no
isolation (same origin either way), the engine loads by path with no copy drift, one CI
covers both packs, and a gitignored file is not servable. Security: `localhost` on a
reserved port, because the *token* must never sit on the shared origin. **Resolved:** the
town's files live committed in a `changarrito/` folder — they hold no secret — and the
owner **runs it from `localhost`**. It is never linked from the public game. A Pages copy
is possible later only as a **read-only viewer with no token** (unauthenticated reads are
enough), and only after B3 and B5 land in Meridian's engine.

**On v2, they also disagreed.** Engineering proposed the game applies a label and an
Action merges with `GITHUB_TOKEN`. Security's R1e answers it: a label-gated action is
defeated by the same leaked token that can apply labels. **v2 is not built.**

**Must be true before v1** — the short list: the town on its own origin, no SW; owner-only
reads; plain-text rendering through the existing sanitizers; the town's CSP is
`script-src 'self'; connect-src 'self' https://api.github.com`; token read-only,
30-day, this repo; any session trigger checks the author; the R7 smoke assertions land in
the same commit as the folder; `ci.yml` gets its two hygiene lines.

**Unacceptable, ever:** a `contents: write` or `pull_requests: write` token in any
browser; an agent auto-started on an issue by anyone but the owner, or gated on a label;
hosting a token-bearing build on `rcguerrero29.github.io`; rendering issue Markdown to
HTML; any `?dev=` handling in the public engine.

---

## 6 · Found on the way — engine findings that stand on their own

These are Meridian's, whether or not the Changarrito is ever built. Rows added to
`BACKLOG.md` §8.

| Finding | Where | Why it matters now |
|---|---|---|
| the quest verdict card is an `innerHTML` sink for content strings | `engine.js:2359` | trusted content today; the only DOM sink that takes pack text unescaped |
| the SW stores non-ok responses and answers a failed JSON fetch with `index.html` | `sw.js:25-28` | the `status.json` seam in `la-ventanilla.md` hits this first |
| twenty literal storage keys in the engine | `engine.js:288` and around | any second pack on the same origin clobbers Meridian's save |
| `PEERS` looks are not validated, contrary to the comment | `engine.js:271-273, 958, 1048` | dormant, but the comment lies |
| the portability guard's NAMES list omits `meridian` | `test/smoke.js:1674-1679`; `engine.js:4062, 3391, 3191, 2697` | the guard misses the one word it exists for |
| `ci.yml` has no `permissions:` and an unpinned install | `.github/workflows/ci.yml:14` | a bad dependency in CI with a write token can push to `main` |
| `bl` keys unfiltered in the loader | `engine.js:3325-3330` | contained (a local object), one line |
| `auditReach()` runs once at boot, not after a runtime spawn | `engine.js:174` | any runtime person can wall the hero |

---

## 7 · Build order — three parts (the owner's ask, 2026-09-05: "break it up in 3 parts")

*Nine steps folded into three deliverables. Each part ends green, merged, and playable to
the extent it claims. Cost in sittings is the reviews' figure.*

| Part | Name | What ships | Ships to Meridian? | Cost |
|---|---|---|---|---|
| **1** | **Los cimientos** — the foundations | `STOREPFX` and `SK()` for every storage key (B3); the service worker serves only its own origin, never caches a non-ok response, deletes only its own caches (B5); the verdict card renders pack text with `textContent` (R1a); the loader refuses prototype keys (R3); `ci.yml` gets `permissions: contents: read` and a pinned playwright (R9b); **the public build's guarantee becomes a test** (R7: no API host, no token, no URL query read, pinned CSP, no literal keys, no innerHTML interpolation, no URL flag turns admin on). Version `mq-v65` | **yes** — behaviour-identical for players; the smoke suite proves 56 quests / 830 XP / every invariant before and after | 1 |
| ~~**2a**~~ | **BUILT 2026-09-05 (mq-v66).** El pueblo, quieto — the town, still | the `changarrito/` folder: its own `index.html` (CSP `script-src 'self'; connect-src 'self' https://api.github.com`, **no service worker**), `content/changarrito/` per NEW-WORLD (`hq` + `st`, empty quest tables, its own `UI`, `STOREPFX="ch"`, its own version `CHV`), **`changarrito/README.md` with the one command to run it**; the `RECORD` seam beside `NET`; owner-only reads of open issues with `ETag` and a last-good copy; **issues → people** by tier (`tier: high` a named person with a document, `tier: normal` townsfolk) through `addChill()` with B2's hooks, `removeChill`, reach re-audited after placement. Read-only; **no token**. *You can walk your backlog.* | the `RECORD` seam, B2 hooks 1–3, `removeChill`, the reach re-audit — all behind typeof guards. **`mq-v66`** | 1 |
| ~~**2b**~~ | **BUILT 2026-09-05 (content only; engine unchanged, still mq-v66).** La ventanilla y los permisos — the clerk and the permits, plus the first walk's four (§9) | la ventanilla's window as a READ: the board of `tier: low` notes and the **permits** (open PRs with green/mergeable, the N+1 fetch); the refetch loop with add/remove diff (a closed issue's person leaves); her lines EN+ES; `test/shots.js` spots for the town in four cameras; a light town smoke in CI. *The street changes while you watch.* | B2 hooks 4–5 if any engine change is needed; otherwise none. `mq-v67` **only if `engine/` changed** | 1 |
| **3** | **La ventanilla habla** — the clerk talks back | *File a request* (the interview's free-text step → `POST /issues` with a label) and **Done** (`PATCH` close) — the first day a token exists, read + `issues: write`, 30-day, this repo, typed once into the town's own storage; the engine smoke split from Meridian's (NEW-WORLD §3), a second smoke pointed at the town, a second `run:` in `ci.yml`, both packs' names in the portability guard, `meridian` added to it and the four engine-printed names moved into content (#27) | the test split and the guard | 2 |

**Step 0 (labels, the ledger in issues #3–#34) is done. Part 1 built 2026-09-05 (PR #35).**
Part 2 split in two at the owner's ask ("just in case"). Nine steps, if the owner wants
them finer: 1a keys + SW, 1b verdict card + loader + CI, 1c the guarantee test; 2a the
folder and pack, 2b `RECORD` + fetch, 2c issues → people + the window; 3a file-a-request,
3b Done + the token, 3c tests and CI. Each is a PR on its own.

---

## 7¼ · How and when you get to it — and how versions move

**When.** The first thing you can walk around in lands with **Part 2a**. Part 1 is invisible
on purpose. After 2a merges, every later part is a `git pull` away.

**How — one command, from the repo folder on your laptop:**

```
git pull
python3 -m http.server 8765 --bind 127.0.0.1
```

then open **`http://127.0.0.1:8765/changarrito/`**. That is the whole procedure; 2a ships it
in `changarrito/README.md` so it is next to the thing it runs. `--bind 127.0.0.1` keeps it on
your machine (a bare `http.server` listens to the whole network). Meridian stays where it is,
at its Pages link, untouched. Nothing links from one to the other.

**What you will see, by part.** 2a: your open issues as people on one street, the `tier:`
label picking who is who; walk up, read, that's it. 2b: la ventanilla at her window with the
board and the permits (open PRs), and people leaving when their issue closes. 3: file a
request from her window, press Done — the day a token is typed in, once.

**Versions.** Meridian's version (`GAMEV` in `config.js` = `CACHE` in `sw.js`, held in
lockstep by the smoke suite) **bumps on every merged part that touches `engine/`** — that is
how players' phones fetch the new engine. Part 1 → `mq-v65`, 2a → `mq-v66`, 2b and 3 only if
the engine changed. The town carries its own version `CHV` (no service worker, so no cache to
bust) and prints, on its title screen, its own version and the engine version it runs on —
`ch-v1 · engine mq-v66` — so a mismatch is visible, not remembered. `NEXT-SESSION.md`'s
"Deployed" line repeats: `sw.js` is the truth, the docs are not.

---

## 7½ · What the town must never do to Meridian

*The owner, 2026-09-05: "ensure we maintain the original mq AI role and implementation
practice goal." Written as rules the tests can hold.*

1. **Meridian's purpose is unchanged: practice for AI roles — the calls a product manager,
   an implementation lead, a prompt engineer makes — in a barrio that phones you back.**
   The Changarrito is tooling for one person. It trains no role, carries no curriculum,
   awards no grade that means anything about the player. It is never a district of
   Meridian and never a chapter in its story.
2. **Every engine change the town needs is behaviour-identical for Meridian's players**, and
   the smoke suite proves it the same day: same quest count, same MAXXP, every invariant,
   the four cameras, the save round-trip. A change that alters what a Meridian player sees
   is a Meridian change and goes through Meridian's own gates (`/playtest`, the owner).
3. **Meridian's content is never edited for the town's sake.** `content/meridian/` is
   Meridian's. The town has its own pack; what it shares is `engine/`.
4. **The public build knows nothing about the town.** Enforced by the guarantee test in
   `test/smoke.js` from Part 1 on: no API host, no token, no URL-driven behaviour, a pinned
   CSP. The town is never linked from Meridian.
5. **Sittings are ranked by the owner, not by the town.** The four newer districts still
   want their first human play; the town does not jump that queue by being fun to build.

---

## 8 · Open decisions — side quests

1. **Go on step 0?** Labels are one click each; the ❗ asks become issues. Say the word.
2. **The name.** "El Changarrito" is the backlog file's name, not necessarily the town's.
   Nacho's call.
3. **Tier names.** `tier: high / normal / low` is a placeholder. The game could use its
   own words — `permiso / recado / nota`.
4. **Who else lives here?** Don Güero at his stall pricing things in sittings is the
   obvious second resident. He is a planner, not a task-carrier — he keeps his weight.
5. **A read-only Pages copy, ever?** Only after step 1. Default: no; the laptop is enough
   for an audience of one.

---

## 9 · The first walk — playtest of 2a, 2026-09-05, planned not built

*The owner ran the town from `localhost` an hour after 2a merged and came back with four
things. Each is written here first, at their ask ("only write that into the plans first").
None is built. Where a finding changes an earlier rule, the rule is amended above and the
amendment is theirs.*

### 9.1 · "There are no buildings other than the first"

True. The street is a road with plants, because 2a was *el pueblo quieto* — people first.
A street with nothing standing on it reads as a lot, not a town. **Change to 2b:** the street
gets facades before it gets the clerk.

- **Buildings are data the engine already draws.** `B` is a solid building face, `E` a door;
  the pack's `DOORLOOK` colours each door; `DECOR` hangs a sign or a mural; `TILEART` paints a
  window. Meridian's street is built from exactly these glyphs. The town's `st` rows change;
  the engine does not.
- **What stands there, in order of when it earns its walls:** la ventanilla's window (2b, the
  clerk's building — the first one with a door); Don Güero's stall as a proper storefront at
  the top of the street instead of a room you wake up in; **a park** (§9.4) as the second block
  through the east door; and one facade per *label* — `ask`, `decision`, `bug` — so a person
  stands in front of the building that matches what they carry. The last is the cheap, honest
  way to give the street a skyline that means something: three facades, no interiors, and a
  person's tier still picks the body.
- **What it must not become:** interiors for their own sake. A door the player cannot open is
  the rule ❗La reja exists for (#9). Every door on the street either opens or is a window.
- **Cost:** a quarter sitting for the rows, doors and signs; the owner doubts it ships — it is
  smaller than that doubt. Art for a facade that is not Meridian's is the only new drawing.

### 9.2 · "Have a human friendly explanation and ability to request more context"

The reader opens the issue as filed: a heading, the body as paragraphs, the facts. The body is
written for the repo, not for a person standing in a street. **Two changes.**

- **A plain-words paragraph first, by convention.** Every issue a session files starts its
  body with one paragraph under the line `In plain words:` — what this is, why it matters,
  what "done" looks like — in the language of the street, no file names. The reader shows that
  paragraph as the person's first line and the rest under *the paperwork*. Issues #3–#34 get
  the paragraph added when 2b ships (an edit to the body, no code). The convention goes into
  `CLAUDE.md` so every future session writes it.
- **"Ask for more context" is the first thing the town ever writes.** A button on the person's
  document: *Pídeme más contexto*. It files a comment on the issue — `más contexto, por favor`
  — which needs `issues: write`, so it lands in **Part 3** with the token. The next session
  finds the comment and answers it *as a comment*, in plain words; the town reads comments the
  same way it reads issues — **author-filtered** (the answer is posted by the owner's account,
  so it passes; a stranger's comment does not) — and the person says the answer the next time
  you talk. Until Part 3, the same ask is a sheet: *Copy* the person's document and paste it
  into a session with "explain this to me."

### 9.3 · "Allow these characters to talk more than once since their quest is ongoing"

Today a person opens their document every time you press Talk — repeatable, but the same
thing each time. An ongoing quest should sound ongoing. **Change to 2b:** a person has three
lines and cycles through them, and the document stays one button away.

1. **The plain words** (§9.2) — what this is.
2. **The paperwork** — number, labels, how long it has stood there ("filed twelve days ago").
3. **What's next** — the last comment on the issue if there is one (author-filtered), else
   "nobody has answered yet — ask me for more context."

Then back to 1. The cycle is per person and per visit, kept in the town's own storage under
its prefix, never in the save. This is the `CHATTER`/`chillLines` shape the engine already
has for townsfolk, fed from the record instead of a static list; the hook is content, not
engine.

### 9.4 · "Include Sonny — he has a whole mini game already"

The owner reverses the earlier rule, and the reversal is theirs (§1, amended). Sonny comes
as he is: he follows you through doors and the trolley, sit / lie / stay hold him, off duty
he tags along, he rips the cone (`mq-v64`). He carries **no task** — the rule of weight holds
for him too — but he may carry a *note*, and the street is livelier for a dog on it.

- **How:** one `CRITTERS` entry in the town's pack — `{kind:"beagle", world:"st", name:"Sonny",
  egg:"sonny"}` — the same declaration Meridian makes. No engine change.
- **The one thing that needs a room:** the leash warps the world to `pk` (`engine.js` ~3595),
  and the town has no `pk`. Either Sonny is never leashed here (the leash button hidden when
  the pack declares no `pk`), or **the town gets a park** — which §9.1 wanted anyway. The park
  is the second block: through the east door, a `pk` room with the dog society's rules already
  in the engine. Recommended: the park. It answers two findings with one room.
- **What he is for, here:** a walk between people is nicer with a dog. If the owner wants
  more — Sonny finds a note, Sonny sits by the person whose issue is oldest — those are
  *notes*, and they come after the board exists.

**Sonny is the owner's dog, not the engine's** (owner, 2026-09-05: "sonny is the recurring dog
for me, in new custom games it can be different"). He recurs in the owner's worlds — Meridian,
this town — by the owner's choice each time. A new world for someone else gets its own dog, or
none. **Until that is a setting, a session asks the owner "keep Sonny?" before drawing a new
world's animals.** Written into `NEW-WORLD.md` §0.

### 9.5 · What changes in the parts

| Part | Was | Now |
|---|---|---|
| **2b** | the window, the board, the permits, the refetch loop, shots, a town smoke | **plus:** facades on the street (9.1); the plain-words paragraph shown first and added to #3–#34 (9.2); three lines per person, cycling (9.3); Sonny on the street and the park through the east door (9.4). Cost: one sitting becomes **one and a half** |
| **3** | file a request, Done, the token, the test split | **plus:** *ask for more context* as a comment (9.2), and people say the last comment as their third line (9.3) |
| `CLAUDE.md` | — | the `In plain words:` convention for every issue a session files (9.2) |

---

## 10 · The second walk — playtest of 2b, 2026-09-05, planned not built

*The owner walked 2b and came back with five things. Written first, built later. Where a
finding is a class of bug, the plan names the class and the test that would have caught it.*

### 10.1 · "Lorenzo is floating"

Lorenzo is the parrot. The engine pins him to tile (17,5) of **any** world named `st`
(`LORO` in `engine.js`, the same pinning as the pigeon at (4,1) and Frederick at (12,5) in
`hq`). In Meridian there is a perch under that tile; in the town it is bare road, and a parrot
drawn at perch height over nothing floats. **The class:** engine-owned animals with hardcoded
coordinates and no test that the tile under them carries what they need (#25's family).

- **Fix, engine (the honest one):** pinned animals become content — a pack declares
  `CRITTERS` for the parrot and the pigeon the way it already does for Sonny; a pack that
  declares none gets none. `DOG` (Frederick) is Meridian's story and moves to Meridian's
  pack too. Behaviour-identical for Meridian: its pack declares all three where they are.
- **Fix, content (the stopgap the town can ship alone):** a sign post at (17,5) so he has a
  perch, and `.` stays under the pigeon.
- **The test (`docs/REGRESSION.md` R1):** every animal the engine draws must stand on a tile
  whose declared `lift` matches the animal's drawn height, in all four cameras; and no
  animal may be drawn in a world whose pack did not declare it. Red first on the town.

### 10.2 · "Make sure regression tests are updated — for Meridian and for the templates"

Done as a map, not a promise: `docs/REGRESSION.md` lists what every suite holds today,
what each finding of the last five days should have been caught by, and the gaps. The short
version of the gaps: the animal-perch class (10.1); the engine smoke has never been split
from Meridian's (NEW-WORLD §3, still true — the town got its own suite instead of a shared
one); the branded templates check (`build-branded.js --check`) covers the docs templates and
nothing checks that a **generated** template (07 for Nolasco, 06 for the taller) still matches
the quest that hands it over; a four-camera pixel check exists only as `shots.js`, which no
CI runs; and nothing asserts the town's index stays a known-diff of the public one beyond a
line count. Each gap has a proposed assertion and a cost in the doc.

### 10.3 · "The teller plans bug triage and tracking presentations for future clients"

La ventanilla becomes the reporting surface. She already builds documents live from the
record and the reader already exports Markdown (Copy / Download). **Part 4 — La ventanilla
presenta:**

- **Two documents at her window, generated from the record:** *Bug triage* — open `bug`
  issues by tier, age, and what's next, with a recommended order; *Tracking* — what closed
  since a date, what merged (permits), what is waiting on the owner, what is waiting on a
  session. Both Copy/Download as Markdown today; a session turns either into a deck with the
  repo's own `deliverable` / `pptx` skills (the Pelaez brand exists there).
- **For clients:** the record's `owner/repo` is one line in the town's config. A **client
  town** is the same folder pointed at their repo — read-only with no token if public, a
  per-repo token if private, never a token that can write to code. The rule of weight and
  the author filter travel unchanged. One town per client, each on its own port, each with
  its own storage prefix (`STOREPFX` per client), so their saves never meet.
- **Reports and presentations, to the standard of the trade** (owner, 2026-09-05: "using the
  best practices for ppts, xcel, charts, cycle time, etc"). The record is the data; the
  outputs are: a **spreadsheet** (one row per issue and per PR: number, title, labels, tier,
  opened, closed, age, first-response time, cycle time, merge lead time — built with the
  repo's `xlsx` skill, formulas not pasted numbers); **charts** built to the `dataviz` skill's
  rules (one system, readable in light and dark, no chartjunk): cycle time over time, age
  distribution of what is open, throughput per week, open-vs-closed by label, PR lead time;
  a **deck** built with the `pptx` / `deliverable` skills in the Pelaez brand, one message per
  slide, the chart on the slide and the table in the appendix; and the **Markdown** she
  already exports. **The metrics, defined once:** *cycle time* = opened → closed;
  *lead time* (PRs) = opened → merged; *first response* = opened → the owner's first comment;
  *age* = opened → today for what is still open; *throughput* = closed per week. Each report
  states its date range and the count of filed things it was built from.
- **What she must never do:** speak about what is not filed. A presentation is a document
  of filed things with dates; the recommendation lines are labelled as the session's, not
  the record's.

### 10.4 · "The request has areas to add notes, questions, things to consider, areas affected"

The issue body gets a shape, and the form in Part 3 fills it. **The template, top to bottom:**

```
In plain words: <what this is, why it matters, what done looks like — no file names>
Notes: <the owner's, in their words>
Questions to consider: <a session writes these; the owner answers in comments>
Areas affected: <files, worlds, characters — a session fills this from the code>
Done when: <one line>
```

- The reader shows each heading as a section; the three-line cycle (§9.3) reads *In plain
  words* first, then *the paperwork*, then *what's next* — and a fourth line, *Questions*,
  appears only when the section is non-empty.
- **Who writes what:** the owner writes *In plain words*, *Notes* and *Done when* from the
  form; a session fills *Questions to consider* and *Areas affected* when it first reads the
  issue, as an edit to the body under those headings (never above the owner's words), and
  says so in a comment. `CLAUDE.md` gets the template.
- **Part 3's form** has the four owner fields and a label picker (10.5). The sheet it posts
  is the template verbatim.

### 10.5 · "Buildings organised by labels; choose any and find; a search to include or tag the tags"

The street already stands people in front of the face that matches their first label
(§9.1). Three more steps:

- **A facade per label the owner adds.** Today three faces (ask / decision / bug) are
  hand-placed. Next: the town reads the repo's label list and gives each label a face and a
  colour from a small palette, in label order, so a new label is a new building the next
  refetch. Capacity rule: past six faces the street gets a second block, not a seventh face.
- **Choose any and find.** At la ventanilla's window, a *filter*: pick one or more labels
  and only those people stand; everyone else waits on the board. Plus a text search over
  titles. Both are read-only and live in the town's own storage under its prefix; they
  ship in **Part 3** with the form, because the window is being built then anyway.
- **Tag the tags.** Adding or removing a label from the game is a write (`issues: write`) —
  Part 3, with the token. A person's document gets *+ label / − label* under the paperwork;
  the street re-stands them the next refetch.

### 10.6 · What changes in the parts

| Part | Was | Now |
|---|---|---|
| **3** | file a request, Done, *ask for more context*, the token, the test split | **plus:** the request form with the four owner fields and a label picker (10.4); the filter and the search at the window (10.5); *+ label / − label* (10.5); Lorenzo's perch as content (10.1 stopgap). Cost: two sittings becomes **two and a half** |
| **4 — La ventanilla presenta** | — | the triage and tracking documents; the client-town config; the deck path through the repo's own skills (10.3). **One sitting** |
| **Engine, its own PR** | — | pinned animals become content, with the perch test (10.1). Behaviour-identical for Meridian. **Half a sitting**, and it closes a piece of #25 |
| **Tests, its own PR** | — | the gaps in `docs/REGRESSION.md`, each red first. **One sitting** |
