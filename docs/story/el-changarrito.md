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
| animals | **never** | a butterfly, a cat, the pigeon carry no task. They may carry a *note* ("Sonny found a permit under the bench") only if the owner asks | engine-owned critters, unchanged |

Sonny only gets more if a game is built around him — his own world, his own rules. Not
here. The engine's animals are pinned to Meridian's world ids anyway (`DOG` in `hq`,
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

## 7 · Build order and cost

| Step | What | Cost | Ships to Meridian? |
|---|---|---|---|
| ~~0~~ | **DONE 2026-09-05.** Labels `tier: high / normal / low`, `ask`, `decision`, `bug`, `ventanilla`, `changarrito`; the open ❗ asks, the standing bugs and the nine engine findings are issues #3–#34. The street has its first residents | minutes | no (GitHub only) |
| 1 | **Engine hygiene:** `STOREPFX` (B3), the SW carve-out (B5), the `innerHTML` rebuild at `2359`, the R7 smoke assertions, `ci.yml` hygiene. Each with a red-first test | 1 | **yes** — behaviour-identical for players, and the public build's guarantee gets its first tests |
| 2 | **The pack**, NEW-WORLD's build order: `hq` spawn room, `st` street, empty quest tables, `UI`, names/emoji/looks, levels | 1 | no |
| 3 | **`RECORD` seam + GitHub fetch**: conditional requests, last-good copy, `pull_request` filter, owner filter, rate-limit readout | ½ | the seam yes, the fetch no |
| 4 | **Issues → people**: label → tier → body; placement on declared stand tiles; add/remove diff on refetch; Done → close; B2's five hooks; `removeChill` | ½–1 | the hooks yes |
| 5 | **File a request**: the interview's free-text step → `POST /issues` with a label. Needs `issues: write` — the token upgrade happens here, not before | ½ | no |
| 6 | **Tests and CI**: split the engine smoke from Meridian's (NEW-WORLD §3); a second smoke pointed at the town; a second `run:` in `ci.yml`; both packs' names in the guard | 1 | yes |
| | **v1 total** | **~5 sittings** | |

**The owner's ranking still holds:** none of steps 2–6 before the four newer districts
have been played. Step 0 costs minutes and makes the ledger better either way. Step 1 is
Meridian's own debt and can go whenever a sitting is free.

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
