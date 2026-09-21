# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## STATE OF PLAY — read this first (2026-09-20, night — the pending list)

### ⇢ 2026-09-21, latest — the second try: ruffled marigolds, a dress of flags, tables, poles, the altar.

Owner: *"the marigolds can use another try and same with the decor … tables too, poles with the paper
picado … more detail to the altar … the cone … paints tiles."* Done, `mq-v180` (`docs/3D-LOG.md`, the
third entry of the date). Two helpers in the pack now — `meshMarigold`, `meshPapel` — and one engine
rule: a string hangs from something at its own height, or from a pole. **Triangles went up by 3–4×
where the marigolds are (park 33,502; altar frame 81,464); draw calls did not move; no phone has been
measured** — if one stutters, a cheaper head for distant beds is the fix. **Still open:** the hero
behind a mesh crown; the iso camera; row 6, whose shelf; `docs/SECURITY.md` §3 step 1.

### ⇢ 2026-09-21, latest — five more shapes; the flat list is eight leggy or boxy things.

Owner: *"lets try the grass and the cones, dog house, and altar … the tree with its decor?"* Done,
`mq-v179` (`docs/3D-LOG.md`, second entry of the date): grass stands as blades, the cone, the doghouse,
the tree with blossoms and its Día de Muertos dress, the altar as `"prop:ofrenda"` — a season prop
asked for by kind through the same `mesh` table (`engine/engine3d.js`, the fiesta-prop pass) — and the
bed's marigolds as a mound. **He is on a plan: plan by tokens, not dollars.** The short-turn experiment
ran: two small turns moved the session meter by 5,986 out, so the counter is sane for small turns and
the 3.5M belonged to the long working turn — most likely reasoning tokens the live meter never shows;
`docs/RUNS.md` §3½ says so now. **Left on purpose:** the hero behind a mesh crown is hidden by it (the
stub and the glass are the precedents); the iso camera (row 5); row 6, whose shelf. **The flat list
now:** `3 4 5 7 A W X Y`. **Measured at the next turn's start:** the session meter moved 962,408 out for
that sitting against a live meter of ~66,000 — a factor of about 15, the mesh sitting's was 30; the
session meter is what spends his plan, the live meter is what predicts the work (run `a3c2`).

### ⇢ 2026-09-21, later that night — the `mesh` view is in: shapes, not pictures.

Owner, after playing: *"i still see squares and not polygonal shapes … can we not try this finally?"*
Done, `mq-v178`: `TILEART[g].mesh` / `TILEART_MESH[g]` — a list of primitives per tile the 3D camera
merges into one mesh (`engine/engine3d.js`, `t3MeshOf`; `docs/3D-LOG.md` 2026-09-21 has the seam,
the numbers and the rule it changed). The bed, the potted plant and the shelf are shapes; `P` is
off the known-flat list. **Next, if he wants more shapes:** the cone (one part, off the list), the
doghouse (two parts), then the trees only with Pili beside — the crown is the best prop in the game.
**Still his:** row 6 of the sheet (whose shelf), `docs/SECURITY.md` §3 step 1, and the acceptance
boxes in runs `c4a9` and this sitting's file. **The measured cost landed and does not reconcile:** the session meter moved 3,506,400 out
across the six turns that held this sitting, against a live meter of ~124,000 — a factor of 30, where
the previous sitting's two meters agreed within 1.5. Written into run `e1f7` as read. **A next session
that reads `get_session` at the start and end of a single short turn with no work in it would settle
whether the counter is charging reasoning or summarisation; until then, plan with the live meter.**

### ⇢ 2026-09-21, night — the first beautify sitting is DONE; the next one is engine.

Owner: *"start with the ones you mention and let me know how accurate you were."* Rows 1–3 of the
sheet's list are drawn (`content/meridian/art.js`, BEAUTIFY, FIRST SITTING; `mq-v177`): the shelf is a
bookcase, grass is a tuft in a crack, the bed is a raised bed and SOLID (`ASSUMED:` in `maps.js`).
Estimate and measurement are in run `2026-09-21-claude-c4a9`. **Two corrections to the day-old list
are struck in place in `docs/BEAUTIFY.md`:** standing a walkable thing up makes a sprite, and #39 refuses
a new sprite; a box needs a SOLID tile. **Next in order:** (a) his answer to row 6 — one shelf glyph
per business or one glyph dressed per world; (b) the first engine sitting, row 5, `isoBlock` painting
`sideArt` on its faces — one function, both games, bump; (c) row 4 is Chema's to measure before any
camera moves. Ultracode was off for all of it; crew mode is for many builders on many issues and was
not used. **Measured at the next turn's start, as `docs/RUNS.md` §3½ now says: the sitting cost
65,418 out, $6.90, against an estimate of 60,000 out, $9** — output within 9%, cost over by 30%;
the rate is about $0.105 per 1,000 output tokens for a sitting of this shape (three drawings, two
render passes, seven looks, six suites). Run `b7d3`'s number was an in-turn read and is marked a floor.

### ⇢ 2026-09-21, later — the beautify contact sheet exists; the first sitting is three drawings.

Owner: *"can we consider beautifying across the worlds?"* — considered the register's way: **sheet,
list, then redraw, and nothing was redrawn.** Twelve strips in `docs/mocks/2026-09-21-contact-sheet/`
(top · front · iso · 3d per world), the ten-row list at the end of `docs/BEAUTIFY.md`, ranked by who
sees it times how wrong it is. **The first sitting is content only — the shelf, grass stood up, the
flower bed as a planter — three drawings through `TILEART_SIDE` and `TILEMETA`, no engine, no bump.**
The first engine sitting after that is the iso camera's faceless blocks (`isoBlock`, one function).
Row 4 — a 3D interior is a strip between two bands of nothing — is Chema's to measure before anyone
moves the camera. The register's top four rows were stale since #203 and are struck in place.

### ⇢ 2026-09-21 — START HERE. **`docs/SECURITY.md` exists; the first thing on it is his.**

**The security review ran** (91 agents across two workflows, one session limit, 42 findings, 22
verified by two skeptics each, a critic with eighteen corrections — `docs/runs/2026-09-21-claude-9e2b.md`
has the cost). **Its one sentence: `main` is unprotected, so every "the owner merges" rule in this
repository is a sentence, not a mechanism.** The rule has been obeyed — every commit on `main` is his
merge — and never enforced. `docs/SECURITY.md` §3 step 1 is the five-minute ruleset that enforces it,
with the one detail that matters: **the `smoke` check must be sourced from GitHub Actions**, or a
classic token can forge it.

**Twelve guards landed** in this branch, each planted before it was believed — the list is
`docs/SECURITY.md` §4. Two of them found things on their first honest run: the rewritten copy-line
reader found two shipped files with no boundary row, and running `--selftest` in CI found that
`indexed()` had broken the fixture a day earlier and nothing noticed.

**The recommendation for the second AI changed:** **no write credential at first** — it works from a
fork, its PRs run CI read-only, he merges. A fine-grained token *cannot be minted* for this repo on a
machine account (user-owned repo; GitHub's own limitation), which is why the earlier row asking for one
was wrong. When it has earned write: one machine account, classic token, `public_repo` only, no
`workflow`. `docs/SECURITY.md` §3 step 5.

**Not wired, on purpose:** a docs-wide citation check. 17 dead paths live in dated meeting and
research records that honestly name things planned and never built. The order channel — the files a
session takes orders from — is checked; history is left alone.

### ⇢ 2026-09-20, night — the pending list, in the order it should go.

Owner: *"give me a list of the next or pending steps, next."* Everything below is either his or
mine, and it says which.

**HIS — nothing below the line moves until these do**

| | What | Why it is first |
|---|---|---|
| 1 | **Protect `main`** — Settings → **Rules → Rulesets** (not the older Branches page: its admin bypass skips status checks silently). `docs/SECURITY.md` §3 step 1 has the exact clicks, including the one that stops a forged `smoke` check | `main` is **unprotected** ([FACT], read from the API 2026-09-20). Every "the owner merges" rule in this repository is a sentence, not a mechanism: any write credential can push straight to it. Nothing else on this list matters until this is done |
| 2 | **Merge #215** (the two-AI protocol) and read `docs/SECURITY.md` when it lands | |
| 3 | **Tick or reject the six acceptance criteria** in `docs/runs/2026-09-20-claude-7c41.md` | the first run in the ledger; the one that matters is *would you let a second AI near the engine on `AGENTS.md` alone?* |
| 4 | **Pick the second AI's short name** (`gemini`, `codex`, `grok`) | it becomes its branch namespace, its `taken:` label and the word inside its run IDs |
| 5 | **Decide the second AI's credential** — the review's recommendation is **none at first**: it works from a fork, its PRs run CI with the read-only token, you merge. When it earns write, a machine account (not a token on yours — `docs/SECURITY.md` §3 step 5 says why a fine-grained one cannot even be minted for this repo) | a credential per agent is what makes *"i may change it depending on their performance"* a one-click revoke |
| 6 | **The `PLANPICK` call** — does every place on the map become tappable in the town too? | step 4 of the map build order cannot start before it (`docs/ARCH-LOG.md` A18, last row) |
| 7 | Say whether the second AI's first job is docs/content (recommended) or engine | lowest blast radius while you learn how it behaves |

**MINE, ONCE HE SAYS GO — in this order**

| | What | Cost | From |
|---|---|---|---|
| 8 | The map caption stops lying — `plan.caption` as a pack string | minutes | `docs/plans/2026-09-17-the-map.md` §10 |
| 9 | Calle Dos's doors get their colours — `@ * $` into `MAPCOL` | minutes | same |
| 10 | A destination is remembered — `d:` in `save()`, through `sanitizeSave` | half a sitting | same |
| 11 | Every place on the map is tappable — `planPlaces()` | a sitting | same — **waits on his #6** |
| 12 | The level chooser (Floor 2 + the shared-anchor fault) | a sitting | same |
| 13 | The route on the paper | a sitting | same |
| 14 | The render pass on the plan, then the redraw | a sitting + | same |
| 15 | The caption derives itself from what was painted | minutes | same |
| 16 | #210 — the sugar skull is too big for the small windows (the general test: a thing inside a thing is a fixed share of it) | a sitting | issue #210 |
| 17 | #175 — a neighbour in a doorway walls off a third of a street | ? | the one `tier: high` issue open |

**PARKED, NAMED SO THEY ARE NOT HIDDEN**

- **The map junta** — agenda written (`docs/plans/2026-09-17-the-map.md` §9), waiting on tokens.
- **`in3` advertises the rank ladder** and the top arrives at twelve of eighty-eight — la junta's
  balance question, untaken since 2026-09-17.
- **Raised TILE art does not lift in the iso camera** — #190 is the same family.
- **Nothing serialises `engine/`** between two agents (`docs/RUNS.md` §8) — a rule to write the day
  it bites, not before.
- **The Simmer world** — waits on AJ's answers (#200), and that wait is hers to end.
- **His weekly Idea Scout routine failed its last run** (2026-09-18) — not this repo, noticed while
  cleaning up triggers.

### ⇢ 2026-09-20, later — the two-AI protocol.

### ⇢ 2026-09-20, later — START HERE.

**`main` is at `81fb4cf`** — #212, #213 and #214 all merged. Still **`mq-v176` / `ch-v126`**:
nothing has been built in the game since the map plan, by his instruction.

**A second AI is coming onto this engine, and the protocol for it is written.** Owner: *"i also
want to be able to handle another AI to use our engine, how can we make sure that you can work
together."*

- **[`AGENTS.md`](../AGENTS.md) at the root is now the contract every agent works under**, whoever
  built it. It is the cross-vendor convention (`agents.md`, Linux Foundation's Agentic AI
  Foundation; OpenAI Codex, Cursor, Jules, Amp, Factory all read it), so one file governs every
  agent instead of each vendor reading its own dialect. **`CLAUDE.md` now points at it, and where
  the two overlap they must say the same thing — a disagreement is a bug to report, not a choice.**
- **[`RUNS.md`](RUNS.md) is the run ledger.** A run ID carries its agent's name
  (`2026-09-20-claude-7c41`) so two agents cannot collide on one, and **one file per run** — a
  shared ledger conflicts every time two agents finish in the same window, which is the exact
  failure the protocol exists to survive. Same reason the claim is a **label**, not a lockfile.
- **`accepted` and `rejected` are the owner's two words.** `verified` is the furthest any agent may
  take anything. `test/runs.js` enforces it by the agent's own `Co-Authored-By` trailer — **and says
  out loud that this is a tripwire, not a vault**; the binding record is the issue he closes. On a
  shallow checkout it reports that the check could not run rather than passing silently.
- **`test/overlap.js`** answers *"review prs for conflicts"* before there are any: which other
  branch is holding a file this one touches. **Git alone, no token** — `test/leaves.js` forbids any
  workflow a `write` scope, so nothing in CI can comment on a PR, and that rule is right.
- **Persona learning goes to `docs/personas/proposed/`**, never into the approved persona.

**First real run in the ledger: `docs/runs/2026-09-20-claude-7c41.md`, status `verified`** — six
acceptance criteria waiting on him, including the one that actually matters: *would you let a second
AI near the engine on the strength of `AGENTS.md` alone?*

**Not solved, and said in `RUNS.md` §8 rather than discovered later:** nothing serialises `engine/`.
Two agents can both change shared engine code in the same window and both be green alone;
`overlap.js` will say so and nothing forces them apart. The next step if it bites is *one in-flight
engine PR at a time* — a rule, not a tool.

**The map build order is unchanged and still queued** — see the block below.

### ⇢ 2026-09-20, earlier — the map plan merged.

### ⇢ 2026-09-20 — START HERE.

**PR #212 is merged.** `main` is at **`72a2dd3`** — the map plan, the research, A18, A3½ and
`docs/BEAUTIFY.md`'s *The art we can reach*. **Still `mq-v176` / `ch-v126`: nothing was built**, by
his instruction, and the version did not move because no line of `engine/` or `content/` did.

**The next sitting is written and waiting on nothing but his go.**
`docs/plans/2026-09-17-the-map.md` §10 is the order, smallest first:

1. **The caption stops lying** — `plan.caption` as a pack string, the engine's hardcoded
   `es?` claim deleted. *(minutes)*
2. **Calle Dos's doors get their colours** — `@`, `*`, `$` into `MAPCOL`. Content only. *(minutes)*
3. **A destination is remembered** — `d:{w,x,y,who}` into `save()`, through `sanitizeSave`,
   `gx,gy` **recomputed** on load, never stored. *(half a sitting)*
4. **Every place is tappable** — `planPlaces()`, `mapPick` reads places, marks stay an overlay.
5. **The level chooser** — Floor 2, and the shared-anchor fault from crew run 8, in one control.
6. **The route on the paper.**  7. **The render pass, then the redraw.**  8. **The caption derives itself.**

**1 and 2 are minutes and fix something he can see.** That is the honest first sitting.

**The one call that is still his, and step 4 must not start before it:** `planPlaces` changes what
the **town** does — it declares no `MAPMARK`, so a tap does nothing there today, and the day places
exist its doors become pickable. An engine change must be behaviour-identical for both games.
**A pack opt-in (`PLANPICK`, default off) is the cheap honest answer — but it is his to take**
(`docs/ARCH-LOG.md` A18, last row).

**Also still open, named and not hidden:** `in3` advertises the rank ladder on the first screen and
the top of it arrives at twelve clean answers of eighty-eight — la junta's balance question, nobody
has taken it. Raised TILE art still does not lift in the iso camera. **C** from A16 (one building,
one world) is costed and recommended against. And **the junta's agenda is written**
(`docs/plans/2026-09-17-the-map.md` §9) — seven items, cast named, waiting on tokens.

**Landed 2026-09-20, after the merge:** **`docs/INDEX.md`** — the owner could not find the project
documents on his machine. They were always there; what was missing was a page saying which of
thirty-four files answers a given question. The index maps all of it, says how to read them with no
session running, and **cannot go stale**: `indexed()` in `test/leaves.js` (run on every CI build
through `test/town.smoke.js`) fails the build if anything in `docs/` is unreachable from it. It
reads the FOLDER, not the index's link count — the count is the version that would have passed for
ever. **Write a new document, list it there, or you cannot merge.**

### ⇢ 2026-09-17, the map-planning sitting — history from here down.


### ⇢ 2026-09-17, last — START HERE. **PLANNING ONLY. Nothing was built.**

> *"we are about to hit a limit so planning only for now"* — and that is exactly what this sitting is.
> **Not one line of `engine/` or `content/` changed.** Docs only, five suites green, ready to merge.

**He gave six things about the map, and the plan for all six is
`docs/plans/2026-09-17-the-map.md`.** Areas of the architecture it touches: **`docs/ARCH-LOG.md`
A18**. The basic research he allowed (no junta — he deferred it):
`docs/research/2026-09-17-the-map-again.md`.

**The four findings worth knowing before you open anything:**

1. **He is right that the map goes dead.** `markOf` returns a kind only when somebody has work, a
   room question or a document. Answer the city and `planMarks()` returns `[]` — and `mapPick`
   iterates `planMarks()`, so **a tap can no longer hit anything anywhere on the paper.** The map is
   interactive exactly as long as there is homework, which is backwards.
2. **Floor 2 cannot be chosen at all.** `planPlace`'s rule *a world behind a world shares its
   address* puts `f2` on **hq's exact pixel**, and `planMarks`' dedupe folds them into one anchor
   carrying one mark. The `⇧` in `TOWNLBL` is a label doing a structure's job.
3. **The gold-doors caption is worse than he said, and it was measured.** On the Calle Dos panel the
   **only** gold tile is the link back to Calle Principal — La Espiga's `@`, Velázquez's `*` and
   Nolasco's `$` have no colour in `MAPCOL` or `BASECOL` at all, so `planTile` paints them the
   generic grey box its own comment calls *"a thing nobody ever thought about on this map."* And
   **"stairs" is wrong on both streets**: `▲` is near-black, `▼` is pale stone, `≡` is another grey
   box. The caption is also hardcoded with an `es?` ternary, so a second world inherits Meridian's
   sentence — A15 in a second place.
4. **A destination is not saved** (`save()` has no field for it), and the comment claiming A3 forbids
   it **overreached**. A3 bans a list of what you have **not done**; one pin you set yourself is a
   bookmark. `docs/ARCH-LOG.md` **A3½** now draws the line: *one pin, yours, saved — a second pin is
   a new decision.*

**Three contradictions reported rather than absorbed**, each with a dated line in the file it
belongs to: the 09-14 research's *"content faults, not engine ones"* (no longer true), the
`let mapDest` comment (wrong), and el-mapa **§7.3** *"a direction, never a lit path"* (he has now
asked for a path; §8 there says what changed and what did not).

**The one call that is genuinely his**, and nothing should be built past it: **`planPlaces` changes
what the TOWN does.** Every other row in A18 is engine-neutral or pack-local. The town declares no
`MAPMARK`, so its plan has no marks and a tap does nothing today; the day places exist, its doors
become pickable. That is a behaviour change in the second game, and this repo's rule is that an
engine change is behaviour-identical for both. **A pack opt-in (`PLANPICK`, default off) is the
cheap honest answer — but it is his to take.**

**The build order, smallest first** (plan §10): the caption stops lying *(minutes)* → Calle Dos's
doors get their colours *(minutes)* → a destination is remembered *(half a sitting)* → every place is
tappable *(a sitting)* → the level chooser, which also closes the shared-anchor fault from run 8 → the
route on the paper → the render pass, then the redraw → the caption derives itself.

**Also written down, because he asked for it in those words:** `docs/BEAUTIFY.md` — **The art we can
reach**. Nobody is being hired, AJ's time is unknown and not waited on, and the art we can make here
is worth making *"to at least learn and have a backup."* The Simmer mock loop is the standing method,
and its first job is the plan's own tiles.

**The junta he deferred has its agenda ready to run** — plan §9, seven items, cast named, with the
question no session should answer alone: *what is the plan FOR, now that it is two streets, fifteen
worlds and a tram?*

### ⇢ 2026-09-17 — the stairs-and-doors sitting, history from here down.


### ⇢ 2026-09-17, later — START HERE.

**PR #209 merged.** `main` is at `mq-v174`. This branch carries three more commits and is at
**`mq-v176` / `ch-v126`**, pushed, not merged. Five suites green on both games at every commit.

**The four the owner signed off, in the order he took them:**
- **T3 — the last visit is not a trophy.** It printed `🏆 AI LEGEND` over the closing scene of a
  bakery. It prints the trade now: *Street food · AI Product Manager*.
- **#208 — CLOSED.** An ending may pay off a scene; it may not stage one again. It was never only La
  Espiga: twelve strings across six districts, both languages. Both halves fixed — the prose, and
  `chClose` (a district closes on its count AND on the visit that ends it).
- **T2 — the first screen.** Stopped opening on "fine-tuned", names the city as it actually is, and
  the street finally has ONE name (`locs.st` said Meridian Street while every toast said Calle
  Principal).
- **T4 — no two places end the same way.** *"Saturday."* opened nine endings. Fourteen openers
  rewritten, the burnout endings too, Tacho stops learning on Chelo's floor, and the panel's ranking
  is inverted so the story is the biggest thing on it.

**Open, and named rather than hidden:** `in3` still advertises the rank ladder on the first screen
and the top of it arrives at twelve clean answers of eighty-eight — the balance question la junta
raised and nobody has taken. Raised TILE art in the iso camera still does not lift. **C** from A16
(one building, one world) is costed and recommended against.

### ⇢ 2026-09-17 — history from here down.

**This branch (`claude/upbeat-planck-0718c6`) is at `mq-v174` / `ch-v124`, pushed, not merged.**
Merge is the owner's word. Five suites green on both games at every commit.

**What this sitting did, in the order he asked for it:**

- **The window the sill was always standing on.** His fifth report of one bug, and the first answer
  that looked instead of arguing: `TILES.win` is a rect that the sill props, the ledge and the dusk
  lighting are ALL positioned from, and **nothing had ever drawn it**. Now `drawPane` — reveal,
  glass, mullions, lintel and the same `drawSillLedge` the candy already used. A mural no longer
  erases a window (`wins:[1]` on a DECOS row; `winsKept` is the one reader).
- **Doña Meche's wall**, which had no drawing at all and was blank plaster at every grade. The
  legibility guard written for it then caught **La Espiga** too: 69 luma from its own plaster.
- **A16 — the staircase.** Costed as A/B/C, he took B then A. **B:** Nolasco's flight is five treads
  (0.96 against a wall of 1.1), you arrive at its FOOT and walk up, and the three flat cameras
  stopped lying about height — `wellDepth`/`stairLift` had existed for two versions and only
  `engine3d.js` ever read them. **A:** the world changes behind a shut door that opens the way you
  travelled, and the new place is BUILT while it is still shut.
- **A17 — the 3D scenes are kept.** 50.5ms of rebuilding over six worlds became 0.1ms. LRU to eight,
  and stale on `t3Dirty`.
- **A world that declines 3D stops paying for it** — `engine/boot.js`, `CAMERAS` decides, 149KB
  gzipped saved for a pack that says no. Meridian and the town are byte-identical.
- **"A map implies this"** — every one of fifteen worlds is placed on the plan now, six of which had
  no place in any form, the park among them. `planPlace` follows the doors recursively; `MAPDOT` went
  from seven hand-typed copies to `{pk}` (Meridian) and `{}` (the town).
- **The guards got smarter instead of taking notes** — his correction, and the best line of the day.
  Both `NOTE-ONLY` shrugs became demands derived from what the pack itself declares, cross-checked by
  a cruder question that cannot break the same way, with `COUNT-ONLY:` printing what was seen.
- **`.claude/skills/stairs/`** opened, and the drawing lessons copied out of `BEAUTIFY.md` (Meridian's
  own register) into `docs/NEW-WORLD.md`, which is what a second world actually reads.

**Waiting on him, by his own word — "we will come to those once we have more tokens next week":**
#208 (La Espiga's ending and its last quest describe the same afternoon out of order), **T2** (the
intro copy), **T4** (the ending repairs and the `finale:` seam). **T3** — `🏆 AI LEGEND` printed over
a story about a bakery — is still open and not started.

**Open and named rather than hidden:** raised TILE art in the iso camera (the person lifts, the
planks stay flat); **C** from A16 (one building, one world) costed and recommended against.

### ⇢ 2026-09-16, later — history from here down.

**`main` is at `mq-v161`.** This branch (`claude/upbeat-planck-0718c6`) carries three commits and is
at **`mq-v164` / `ch-v114`**, pushed, not merged. **Merge is the owner's word** — and note that the
quest-marker halo, the glass divider and the silent-save fix are all sitting here unmerged, so the
live site does not have them and the owner reporting them as "still happening" is expected.

**Run the suites with `export CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome`** —
see the block below for why.

**What this sitting added on top of the previous block:**
- **The paper seam (`ARCH-LOG` A15, closed).** A pack declares `PAPER`, a string of CSS; the engine
  re-roots every selector at `.paper`, allow-lists what can be scoped, strips `position:fixed` and
  makes the reader a stacking context. Meridian declares none and is byte-identical; the gauge
  declares one and **half of it is a live attack**. Six plants. `docs/BOUNDARY.md` has the row.
- **`TOWNPLAN` — the plan draws every street.** He hit this in play: standing on Calle Dos, shown
  Calle Principal. The trap it opened is the thing to read: a mark had one coordinate pair doing two
  jobs, and they were only ever the same number because there was one panel at 0,0. Marks now carry
  `x,y,w` (where it is) and `gx,gy` (where it is drawn), and **nothing may use one for the other**.
  Four plants. `docs/BEAUTIFY.md`, "Two coordinate systems, one field".
- **La foto settled** — and the owner's answer dissolved the question instead of picking one of the
  four options I put to him. The photo never touches browser storage: it is composed with the
  recipe's own art as **stickers** and saved **full size to her phone**. `la-sobremesa.md` §18.1.
- **Music asked** — `docs/for-aj/SOUND.md`, three questions with lettered answers, on his correction
  that she should be given options rather than an open question.

**Open, and the owner's to call:**
- **The quest marker collides with a neighbouring prop.** The halo fixed the contrast; the shot in
  that session shows the mark also sharing space with a prop painted after it. A draw-order fault,
  reported, not fixed.
- **Nobody on Calle Dos ever carries a quest mark, in any chapter.** Found while building the guard:
  `ex` has six people (rigo, meche, beto, kike, mari, ~c0) and not one of them ever has anything to
  say. The street is walkable, dressed and now on the map, and it never needs you. Not a bug — a
  design hole, and his to decide.
- **The photo/sticker build itself** is specified and not built.
- `la-sobremesa.md` §16/§17 want a re-read now that the book is not Simmer's spine.

## STATE OF PLAY — read this first (2026-09-16, end of the fourth-page sitting)

### ⇢ 2026-09-16 — START HERE. Everything below this line is history.

**`main` is at `mq-v162` / `ch-v112`** after PR #204. This branch (`claude/upbeat-planck-0718c6`)
carries the sitting below and is pushed, not merged. **Merge is the owner's word.**

**Run the suites like this.** The container's Chromium is a version behind what `playwright-core`
resolves, so every browser suite dies at launch unless you say where the binary is:

    export CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome

`ls /opt/pw-browsers/` if that path is stale. Without it `smoke`, `engine.smoke`, `town.smoke` and
`gauge` all fail for a reason that has nothing to do with the code. **The gauge used to report this
as good news** — see below.

**What shipped this sitting:**
- **The silent save fixed.** Nineteen `try{localStorage.setItem()}catch(e){}` in `engine/engine.js`
  are now one writer, `mqStore(k,v,critical)`: it tells *out of room* from *not allowed to write*,
  drops the debug log and retries once before it bothers anybody, and throttles the message to once
  per 180s. `SAVE_FALLBACK` lives in the engine, so a pack with no `save:` strings still warns — the
  gauge forced that. Four assertions in `test/engine.smoke.js`, red first against the original
  swallowed catch planted in a copy outside the repo. Write-up: `docs/REGRESSION.md`, "The empty catch".
- **The quest marker reads against the storefront line.** Measured first: the occlusion was already
  correct and the fault was contrast, so it got a pale halo outside its dark keyline, not a layering
  change. `SAYBAKE.lift` 11.7 → 11.0. The guard's "may only darken" rule was designing the art, so it
  is a budget of 12 lightened pixels now; the original bug still fires at 32.
- **The broken stairs are a glass divider.** Pack art only (`content/meridian/art.js`, `◺`) — the
  engine's rail is deliberately see-through, so glass is the material for which that is correct.
  Lesson in `docs/BEAUTIFY.md`.
- **The gauge no longer calls a broken run good news.** When the shared suite produces zero findings
  that is a run that did not happen, not a template that got easier; it now fails differently and
  prints what the inner run actually said. Red first by unsetting `CHROMIUM_PATH`.
- **A fourth book page** — 떡볶이, in the Simmer book artifact (version 8). The tteok were redrawn
  against `how-its-made`: one extruder die so diameter is shared and only length varies, stirred into
  a loose alignment instead of a starburst, half-sunk with the sauce climbing them, drawn back to
  front so the cast shadows land on something already painted. A `__SWAP__` token was reaching the
  page as literal text; the renderer now refuses to print plumbing when a page has no two-cooks row.

**Open, and the owner's to call:** the paper seam (`docs/ARCH-LOG.md` **A15** — he said fix it, not
started; needs a `docs/BOUNDARY.md` row and a guard first, because an unscoped pack stylesheet could
restyle the chrome and the HUD). La foto (re-asked in plain words, unanswered). How to ask AJ about
music. `docs/la-sobremesa.md` §16/§17 want a re-read now that the book is not Simmer's spine.

## STATE OF PLAY — read this first (2026-09-13, end of the crew-mode sitting)

### ⇢ 2026-09-14, night — START HERE. Everything below this block is history.

**`main` is still at `mq-v159` / `ch-v104`; the branch `claude/happy-ritchie-84qbbc` carries this
sitting (documents, the wall at `ch-v105`, no engine change) and is pushed, not merged.** Merge is
the owner's word.

**What the owner asked (third reply, then "Try again" after the session limit cut the crew twice —
`docs/ASKS.md`):** the questionnaire for AJ as a night-mode app with a comment on every choice; full
mock-ups of the journey and the app feel; a UI review process (engineers, agents, UI, story, QA) run on
the mock-ups; the map revamped so a person can find the next quest; the murals creative and completed;
the backlog put together while AJ takes her time.

**What shipped this sitting, and where:**
- **AJ's questionnaire, v4** — the artifact he forwards (source: the session's scratchpad
  `aj-questionnaire.html`; script `docs/for-aj/LA-SOBREMESA.md`). Thirteen questions, a comment box
  under every choice, night; her answers stay with him (Zeni) and are never copied into this repo. v3
  fixed Rosa's run-9 finding (held sideways, the bottom bar sat on the third answer); v4 Nacho's (two
  opposite promises on one screen). **He still owes one
  check before forwarding: open the link logged out once (Zeni's "private by link").**
- **The journey** — the artifact *La Sobremesa, the journey*
  (https://claude.ai/code/artifact/5a2858ba-51ca-49c6-ba7e-3e10170aab0c): thirteen screens on a phone at
  night, each labelled real game / real reader / drawing, every picture with Lupe's admission ticket.
  Documents `docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js`, camera `render2.js`, tickets
  `manifest.json`. Two of five matrix rows (390×844, 844×390); ES at 390×844 only — said on the page.
- **The UI review process** — `docs/UI-REVIEW.md` (Lupe's, run 8), first ledger block opened for the
  journey; **crew run 9 signed it** (`docs/meetings/2026-09-14-la-cuadrilla-run-9.md`, returns
  verbatim; §6 block 1 carries the verdicts).
- **The map plan** — `docs/meetings/2026-09-14-el-mapa.md`; #160 raised to high with the recommendation
  (presence marks on the plan, a `TOWNPLAN` seam so Calle Dos exists, no list, no done tick; **the ring
  on "next" is his call**). Built after his look at screen 12 of the journey page.
- **The backlog** — issues #173–#201 filed from Remedios's run-8 triage (her pick: #173, the phone held
  sideways), comments on #154 and #156, `docs/BACKLOG.md` §0 re-ranked onto the ledger.
- **The wall** — iterations 8 and 9: fifteen and then eight panels, each in its own material
  (`docs/crew/MURALS.md`); fifty-six panels, twenty-one bays, `ch-v105`. Run 8's twelve persona edits
  applied (`docs/crew/FLIGHT-NOTES.md` rows 47–61) and run 9's seven (rows 62–69; Remedios: none, and
  why) — both suites and the leaves guard green on the result.
- **Registers**: `docs/la-sobremesa.md` §13 (run 8 consolidated; §10's palette superseded by Pili's
  night palette and re-cut kitchens, machine-checked), `docs/GENRE-RULES.md` R18, the research sweeps in
  `docs/research/2026-09-14-map-and-questionnaires.md`, QA-PASS E13, three stale citations corrected.

**What is owed, in order:**
1. The owner: the seven decisions on the journey page (Tuesday's first screen · restaurants as people or
   a board · one house or two halves · grades switch on the card or in the gear · merge board or by hand,
   and which first · names · the ring on "next"); his look at the map pictures; the logged-out check.
2. Chava's two cold plays (the mocked map, the journey) — cut by the limit twice; run 9's Chava return
   covers the journey if it landed (see the run-9 file).
3. The review's open notes: the reader's own faults (19-px select, 13-px checkboxes, blue ticks, violet
   labels, submit/cancel twins, no end-of-document affordance, scroll reset) are engine work with a red
   first, all listed in `docs/UI-REVIEW.md` block 1; the three missing matrix rows (480×900, 1280×800,
   fullscreen) for the next camera pass.
4. Nothing on the second world is built, and nothing should be until AJ answers (#200).

---

### 2026-09-14, late — the morning and afternoon (history from here down)

**`main` is at `mq-v159` / `ch-v104`: [PR #172](https://github.com/rcguerrero29/meridian-quest/pull/172)
merged the whole of 2026-09-13/14 at the owner's word ("merge please"). The branch
`claude/happy-ritchie-84qbbc` was restarted from that `main`; this pass on it is documents only.**

**The owner's morning message, in `docs/ASKS.md` (thirty-two rows, "2026-09-14 (late)"):** he sees
the skulls; the mural looks better but *agents need to be more creative* and *any crew mode creates
a mural entry* (rules written: crew-fix skill, `docs/CREW-MODE.md` row 6, `docs/crew/MURALS.md` 5–7,
and a guard in `test/town.smoke.js` from iteration 8 on); he answered **all fifteen** food-game
decisions and added six requests — a home level with **his pantry rebuilt as an object (three
drawers, from photos he will send)** that marks *have/missing* on every recipe; **shifts at
restaurants' kitchens instead of the week, no time limit**; product images (answered: licensed or our
own, never scraped, never fetched at play); print recipes; AJ's raw-vegetable allergies; more
contrast in the kitchens, then animations. **All of it is `docs/la-sobremesa.md` §12**, his answers
in 12.1, the new requests with sketches in 12.3, the questions back to him in 12.4, and what his
answers overrule in 12.5. He sent recordings of both games AJ plays, the merge game and Cookingdom; both are read frame by frame in
12.2 — two kinds of play, two surfaces this engine does not have; her script asks which she would miss more. The brief for AJ is `docs/for-aj/LA-SOBREMESA.md`. Lessons of the sitting are
`docs/POSTMORTEM.md` §13p–13t.

**Nothing on the second world is built, and nothing should be until:** AJ answers her eight (1, 2 and
6 gate the merge board, the making surface and the pantry); the pantry photos arrive; he confirms the merge board
goes first and says where the household's sync lives (§12.6 — his seven follow-ups are answered:
a shift pays leftovers, grading pays recipe offers, no timer anywhere, sync by itself later and the
pass while testing). **Then** a crew run turns §12 into a build order —
and every agent on it paints.

**The queue below is unchanged:** row 8 (the rail), 8½, 8¾ (the wall's feet), Pili's socket redraw and
a cold read of the skulls in the flat cameras, Chava's deferred panel and edit (flight-notes row 46).

---


**`main` is at `mq-v158` / `ch-v101`. Branch `claude/happy-ritchie-84qbbc` carries the whole of
2026-09-13 and takes the town to `ch-v102`; it is pushed, all seven suites and `test/leaves.js` were
green on it **on one run each — and see "Found, not fixed" below: `test/smoke.js` is red about one run
in twenty-five on a real bug older than the branch** — and no PR has been opened — the owner asked for the work, not for the PR yet.** Nothing
touched `engine/`, so `mq-v158` and `sw.js` did not move (`test/bump.js` confirms).

### What shipped on that branch, in the order the owner will meet it

| | |
|---|---|
| **Claiming by label** | `taken: <name>` on an issue is crew mode's lock. The town reads it (`takenBy`, `record.js`): the person wears a **hard hat and a white sash**, Talk's third line says who has them, the house board lists *Taken*. The claim rides in the body's id (a look is baked at spawn; a mark that only changes `look()` lands on nobody until a reload — measured). The form never offers or copies a `taken:` label. Create each label once with `gh label create` |
| **`docs/BOUNDARY.md` + `test/leaves.js`** | Zeni's ledger of every edge (what leaves town, the promise with `file:line`, which guard reads that noun, when last planted) and the script that reads it: soundness, completeness on three derivable sets (what CI runs, what ships, what carries a key), the workflows' permissions and triggers, and a routing slip (`node test/leaves.js origin/main`, exit 0 always). Two personas had cited both files since 2026-09-11; neither existed |
| **The personas guard** | `test/town.smoke.js`: nineteen files, one shared block, first, once, one person per file, byte-identical, and it must still say the four paid-for rules, ASK HIM, and name the post-mortem and the proxy register. Its first run found `rigo.md` carrying Toño's whole persona under a second copy of the block. Repaired |
| **The wall, iteration 5** | Six panels (Beto, Zeni, Chuy, Yaz, Melo, Lupe); `by:"beto"` used on a real panel for the first time, which opened a second bay — fixed; `murBody` width follows height (was 5px at any height); three panels repainted at Pili's word, words untouched |
| **The wall, iteration 6** | Seven return visits painted from the design run's raw file (Beto, Rigo, Pili, Tavo, Doña Cuca, Don Güero, Chema), words verbatim, thirty-two panels in eighteen bays. `by:"cuca"` and `by:"don-guero"` each opened a second bay beside the person's own — the stretch guard groups by `murPainter` on both sides and could not see it. A person's key on the wall is their first name now (`murKey`), and a second guard folds every bay's *name* the same way (`docs/REGRESSION.md` row 24; three plants in a lab copy, all printed). Three drawings adjusted by the session, words untouched (Chema's readings were below the wall's course height; Beto's ghost car lay under his chart; Pili's label ran into her struck line). **Pili has not seen these seven** |
| **Seven persona edits** | Flight-notes rows 32–38 applied (Tavo's wrong constant replaced, Rigo's paint rule, Pili's stands-on check, Cuca's "which room", Beto's readers-of-a-seam, Don Güero's third thing to check, Chema's blank-one-painter). Line numbers replaced by greps where the proposals carried them |
| **The healthy-eating game** | Research consolidated, plan filed, three genre rules, seven persona edits, five tag-register leaks, one town copy fix. Two agents found their own persona lying to them (Pili's `drawPerson` line 435 lines stale; Paty's `chatSay` does not exist). **Nobody was asked for a mural panel** — a fault of the brief, recorded in flight-notes iteration 7 |
| **The mocks** | Six of Pili's seven surfaces plus the cream/night pair, four of them rendered by the shipped reader from real documents (`docs/mocks/2026-09-14-la-sobremesa/mockdocs.js`, `render.js`), two drawn in canvas on the review page; mock 2 (3D) honestly not drawn. The plate is vessels on a petate; the week strip has four unmarked bays; the badge exists to be refused |
| **Docs** | roster of nineteen; counts agree with the files; `OPEN.md` merged and pointing at `BOUNDARY.md`; this file is one block, history in `docs/NEXT-SESSION-ARCHIVE.md`; `CREW-MODE.md` has "Where the switch stands" and "What running many agents teaches" |

### What the design run settled (2026-09-14, 03:00 UTC) — read these before the queue

- **The tram livery** → `docs/ARCH-LOG.md` **A14**: the car has one colour, the band is missing from the tram, the paint goes on after A13's parts exist; the seam is the wardrobe's shape; three named cars, unlock at quest 28, picker in the gear menu with Tacho as a second door. **Two questions are his** (whose car; does the season repaint it).
- **Two storeys** → `docs/rooms/2026-09-13-two-storeys-with-a-mural.md`: the mural already grows upward in the document; a taller building takes the painting away in 3D; if the street, Meridian x19–x23 first, after the sill sprite's height scales with the wall. **One question is his** (taller wall in the document, or taller building on the street).
- **The skulls and the rail** → rows 7 and 8 of the queue below, red first.
- **Seven persona proposals** from that run are applied (`docs/crew/FLIGHT-NOTES.md` rows 32–38) and **seven mural panels** are painted (`docs/crew/MURALS.md`, iteration 6). What is still owed: Pili's look at the seven, at the next crew-fix run's step 4.

### IN FLIGHT when this block was written (2026-09-14, 03:00 UTC) — pick these up first

Four runs were launched after the rate limit reset, all advisers, mode off, one pen. Their returns
land as JSON under `/tmp/claude-0/…/tasks/<id>.output` on the box that ran them; on any other box
the work is re-run from the briefs, which are in the workflow scripts committed nowhere — so the
substance of each brief is in `docs/ASKS.md` (the seven rows of 2026-09-13, late) and below.

1. **The agents' post-mortem — done except the document updates.** Six lessons are in
   `docs/POSTMORTEM.md` §13 (Chuy wrote it before the limit); their DOCUMENTS TO UPDATE lists are in
   `docs/crew/POSTMORTEM-2026-09-13-lessons-raw.md`, and **a fresh Chuy pass (`a1b75e1abe909fe95`) was
   applying them, `docs/` only.** When it lands: `git status`, read the diff, run `node test/town.smoke.js`,
   commit with explicit paths.
2. **Chava at the wall, cold — landed.** `docs/meetings/2026-09-14-chava-en-el-muro.md`, verbatim.
   **Eight findings, worst first, none fixed yet:** (1) twelve of nineteen signed captions on the dado
   are cut mid-word at the bay's edge with no ellipsis — Melo's reads *"two plan"* for *"two plants"*
   on a wall that forbids plans; `murWall` must fit the foot to the bay (wrap, or three words and a
   mark), and a guard that measures every caption against its bay is the red; (2) a name on the dado
   cannot be followed to its panels — the reader lists panels by date, and Zeni is only ever "the
   customs clerk" below; (3) 7.5% of the wall on a phone, sixteen swipes, no arrow, no fade, and the
   "walk along it" sentence is below the fold; (4) the gutter between two painters (~14 px) is ten
   times narrower than the gap between one painter's visits (~150 px), so proximity says the wrong
   thing, and a caption floats nearer the next panel than its own; (5) 79.9% of the wall above the
   dado is blank because every bay is as tall as the busiest; (6) text over text on Chema's iteration-3
   panel (two labels on one baseline) and Chuy's stamp over the line it stamps; (7) reopening keeps
   the vertical scroll and resets the horizontal one to 0; (8) in the isometric camera the facade row
   is featureless. **Rows 8¾ in the queue.** His persona edit and panel are row 46, deferred to the
   next sitting.
3. **Chema, the skulls measured — landed.** His entry is in `docs/3D-LOG.md` (2026-09-14) and queue
   row 7 is rewritten from it: the front camera renders zero skull pixels (draw order), the 3D pane is
   swallowed at its anchor's depth (+0.09), light and value rejected by measurement, and
   `engine/engine.js:1081–1122` is a dead duplicate. His persona edit is flight-notes row 38; his panel
   (*La copia en blanco*) is in the raw file with the other six — seven to paint.
4. **The healthy-eating game — landed.** Twelve agents, none cut off. `docs/la-sobremesa.md` is the
   plan (Mari's title; eleven sections, each signed; **§9 is the fifteen decisions the owner owes**);
   `docs/research/2026-09-13-healthy-eating-game.md` is the consolidated sweep (the raw four-lens dump
   is in git history at that path); `docs/GENRE-RULES.md` gained R15 (count up, never to zero), R16
   (the marks go on the logistics, never on the person — `gradeOf` returns 3 when nothing was ever
   answered) and R17 (a maintained model decays); `docs/OPEN.md` §1 has the row. The seven designers'
   returns are verbatim in `docs/meetings/2026-09-14-la-sobremesa-disena.md`; their seven persona
   edits are applied (flight-notes rows 39–45); Toño's five leaks are `docs/TAGS.md` L24–L28. Paty's
   live finding is fixed (three English strings inside the town's Spanish block: `hq`, `arrive.hq`,
   `vmHQ` → *El changarro*). **The mocks are drawn** — `docs/la-sobremesa.md` §10 "Drawn", the pictures
   in `docs/mocks/2026-09-14-la-sobremesa/`, and the owner's review page
   `https://claude.ai/code/artifact/01d868ff-32b6-4715-8831-ef42c6cf0f6c`. Nothing more happens on this
   world until he answers §9 — the first two questions decide which game it is.

**The owner also asked** (all in `docs/ASKS.md`): a security triple-check — done, in the reply of that
hour: R10 clean, the town bound to `127.0.0.1`, CSPs pinned, workflows read-only, no lockfile so
`npm audit` cannot run; **the terminal failures he saw were never pasted — ask again.**

### The calling session's own mistakes, for §13 if Chuy did not get them

A hash of the shared block proved nineteen copies identical and could not see that one file held it
twice and another not first · the first workflow-trigger check read `permissions: issues: read` as a
trigger · the first run of the personas guard crashed the suite on a `crypto` reference in the wrong
scope · a doc-correction script asserted on a stale anchor after applying eleven edits · two ledger
lines were appended by a script that had already failed · a claim that GitHub creates a missing label
on first use was written unverified (egress blocked) and rewritten · 31 of 172 citations in the new
register had slid within the hour because the session inserted a test above them.

### Waiting on the owner (also in `docs/OPEN.md` §1)

- **GitHub → Settings → Pages → Source** — nobody here can read it; if it says "deploy from a
  branch", every guard on the public build is inert (`docs/BOUNDARY.md` row 1, G1).
- **Force a `ch-v` bump on every town commit?** The town's `GAMEV` is the only thing that tells his
  laptop to pull, and nothing guards that it moved.
- **A claimed `tier: low` issue — a body on the street, or the board only?** Built as board-only.
- **The tablet rows** Lupe ran are not in `docs/QA-PASS.md`'s matrix; her rule says the list grows
  from escapes only. Left off.

### Found, not fixed — older than the branch (Lupe, 2026-09-13)

- **`applyText()` copies pasted JSON with `Object.assign`** (`engine/engine.js`, grep `function applyText`): a `__proto__` key in the admin text lab's paste reaches the prototype setter of `NPCN[lang]`. Local-only and self-inflicted (the owner pasting into his own lab), so low tier; the fix is a key copier that skips `__proto__`, and it is an engine change, so it bumps. Beto, 2026-09-14, `docs/la-sobremesa.md` §5.
- **`docOpen` scrolls every document to the top on open** (G4 in `docs/la-sobremesa.md` §5) — reasoned from the code, not reproduced; a forty-item pantry with a button halfway down would be bitten on the first press. Four lines, red first, when a pack needs it.
- **`docs/BEAUTIFY.md`'s `t3Boxy` quote** drops the `TILESIDE` clause the shipped line carries (`engine/engine3d.js:259`); the advice is still true. `docs/GAUGE.md`'s `SHIRTS` row said `:341`; corrected to `:431`.
- **`test/smoke.js` goes red about one run in twenty-five**: a wandering neighbour in the one-tile
  gap by the barbería (`ex` (19,1)) walls off 35 tiles from Doña Meche; `auditReach` and `isSolid`
  both treat a standing person as a wall, so it blocks the player too. Repro: occupy `(19,1)`.
- **Phone landscape**: the joystick and Talk sit 100–120 px below the fold in both games until you
  scroll or go fullscreen.

### The next sitting, in order

1. Land the in-flight items above; open the PR for `claude/happy-ritchie-84qbbc` when he says so.
2. The queue below is unchanged: the tram depth pass first (A13 item 1), then the aperture rule.

## The five minutes that save you an afternoon

**Read, in this order, before you touch anything:**

1. **`docs/POSTMORTEM.md`** — new, and the shortest register here. Every way the recent sessions
   actually got it wrong, with what each cost, including the silly ones. **Three of its entries were
   made by the session that was writing up the previous one.** If you write a guard, break it on
   purpose in a copy outside the repo before you believe it. Ten minutes; never once wasted.
2. **`docs/REGRESSION.md`** — the proxy register (its table holds the count): *a guard has to read the noun it
   actually means.*
3. **`docs/OPEN.md`** — the index to every open question.

**The three instruments that actually work here**, and everything else is a special case of failing
to use one: **plant a real violation and read what it prints · render it and look · re-read what the
owner actually wrote, without your summary in between.**

## What is built and settled — do not re-litigate

| | |
|---|---|
| **El tranvía** | One lane, one car. Stops for anything alive. **Waits at its platform** ~3 s for somebody walking up, then goes. Critters and townsfolk keep off the rails themselves (`troDanger`); the brake is the backstop |
| **El paseo** | Picking a destination in the Barrio Pass **rides** you: bell, then the line at `RIDE_ZIP`, world changes at the end of the line. The hero's *draw* position rides; his *grid* position stays on the kerb, which is why the tram does not brake for its own passenger |
| **Window sills** | There is a **ledge** now, in 2D and 3D. Four attempts; the first three changed a size and the fault was never a size |
| **El muro** | The crew's mural is **a wall** that measures itself from its painters (4598 × 464 after iteration 5), one surface you walk along. **Every painter owns a bay** (`by:"beto"` — lowercase, and since 2026-09-13 it joins the bay `who` already named; before that `by` had never been used on a real panel and opened a second bay); returning makes your area *deeper*, not wider. A return visit must differ in what they said, what state they were in, and what they drew |
| **Rigo** | Ambient at Calle Dos `(19,3)`, under the MQT sign. Chat only, four lines EN+ES. **He never mentions the sale** — chat has no state and quest 30 has four endings |

## What is DECIDED and NOT BUILT — this is the queue

**`docs/ARCH-LOG.md` A13, A13½, A13¾ are all signed by the owner. Nothing in the tram list is a
design question any more; the build order is in there.**

1. **The tram joins the depth pass.** Fixes *"the character is just laying down on it"* and *"there
   should be a rail in front of him"* **as one change**, in every 2D camera. The move already exists
   here — la ventanilla's counter is pushed at depth `y+0.7` so her legs go behind it. **Do this
   first; it is unaffected by every other decision.**
2. **The aperture rule**, as one number. *The scale of what is behind an opening is a property of the
   VIEW, not of the world.* A room may be larger than its door; a passenger smaller than the car.
   The owner's own idea, and it is law.
3. **The near side** — rail, mullions, lower panel. Pili directs; Rigo says what a real car carries at
   waist height. It may be **solid**: nothing has to appear on it later.
4. **`rideDraw(who, seat)`** — one function, called once with the hero. **Do NOT build a passenger
   list with one entry.** The second caller is the dog, when it comes.
5. **The driver.** ❗El chofer: he is **nobody, on purpose — a uniform, not a neighbour.** No name, no
   look entry, no line, no ❗. He gets the MQT cap brim, a gold band matching the car's trim, and one
   gesture: **the hand comes off the power when something alive is on the rails.**

> **ITEM ZERO of that sitting, before a line of art:** `engine/engine3d.js` carries a comment saying
> the driver *"turns round with it when it reverses"*. **It does not reverse.** It is the same wrong
> belief that produced the two decorative cabs, sitting in the file you will open to draw him.

**Also decided, not built:** two visible storeys in El Changarrito
(`docs/rooms/2026-09-12-two-visible-storeys.md`). **Still his to answer: a picture, a room, or the
two joined?**

## Ready to build, cheapest first — none needs a design round

| | What | Cost |
|---|---|---|
| 1 | **`docs/BEAUTIFY.md`'s top four** — rug, crates, counter, quest marker | **art only.** No engine, no bump |
| 2 | **#21 — lit windows never light in 3D.** The night pass is 2D-only | one sitting, and the code is warm from the sills |
| 3 | **#158 — the city ledger describes a city we do not have** | one sitting, docs |
| 4 | **#153 — quests have no names, only array positions** | *the largest single blocker to a template* |
| 5 | **#155/#156 — the `ENDLESS` split** and its landmine: an endless pack with 2+ districts is silently locked in district one | one sitting each |
| 6 | **#161 — the comfort pass at fullscreen** | the one row in `QA-PASS.md` nobody has ever run |
| 7 | **The skulls — SHIPPED mq-v159, 2026-09-14** (`docs/3D-LOG.md`, the last entry): the front camera hands every prop on a solid tile to its row of the depth queue (`fiestaDraw2D`'s `defer`), the 3D pane and ledge stand 0.09 proud (`SILL_PROUD`), the dead duplicate block is gone, and `test/smoke.js` has a red-first check that blanks `drawSillBox` in the front camera and insists the frame changes (0 px before, 3,864 after; clocks frozen, control 0). **Still open:** Pili's socket redraw for the flat cameras; a cold read; a look at the proud pane beside a person on the pavement. Chema never saw the owner's image — ask which camera it was | done; a cold read is owed |
| 8¾ | **The wall's feet, and the wall's width** (Chava, `docs/meetings/2026-09-14-chava-en-el-muro.md`): (a) `murWall` cuts twelve of nineteen dado captions mid-word at the bay's edge — **red first: a guard that measures every caption's width against its bay**, then wrap to two lines or cut at a word with a mark; (b) a bay's name must lead somewhere — group the reader's panels by painter under the wall, or make the dado name scroll the list; (c) an arrow or fade at the strip's right edge and the "walk along it" line above the strip, not below; (d) the gutter between painters wider than the gap between one painter's visits; (e) reopening restores `scrollLeft` as well as `scrollTop`; (f) Chema's iteration-3 labels on one baseline and Chuy's stamp over its own line — art only, words untouched. Town content and `murals.js` only; bump `ch-v` | one sitting |
| 8½ | **Two code findings Chuy could only write down** (his pen is docs): the comment over `murBody` in `changarrito/content/murals.js` still says "five pixels wide" above a body whose width now follows its height; and `engine/engine.js` restores `"."` at one glyph-restore site and `w.rows[y][x]` in `removeChill` — two answers to "what was under a person" | minutes; the second is an engine change and bumps |
| 8 | **The one-sided rail — it is the `hq` climbing flight, not the loft** (Cuca): the stair mass walls the north side and row 15 has nothing. The class is *a run whose two long sides are treated differently*, with three homes (the map; the 3D build's chained ternary that gives a rail tile with wells on two sides one panel; front-camera fence posts tested in X only). **Guard G-RAIL-1 is red on unchanged code in both packs** — write it first. The fix: `◺` on `hq` row 15 x11–14 **and wall x15–18**, or four tiles are orphaned. Don Güero owns row 15 losing four tiles in both games | one sitting |

## Three things about working with this owner

- **He plays it, and that is where the real bugs come from.** Four of the last five genuine faults
  came from him walking around, not from the suites. The tests ask whether it works; they still do
  not ask whether it feels good. That is what #161 is for.
- **He is usually right when he pushes back, and often for a reason you have not got.** *"Make the
  characters smaller"* beat widening the tram. *"This isn't going to be pages"* was the whole mural.
  *"Showing the window SILLS"*, read literally, was the fix after three misses.
- **`docs/ASKS.md` is his words, verbatim, logged before the work.** When a brief tells you what he
  decided, go and read what he actually said. An agent refused a brief on those grounds this month
  and was right.

## Standing practices

- **Mocks as goals to fix** — render the thing before building it, in the real game. It has caught a
  bug in a fix before the fix shipped.
- **Every agent writes under its own name in the scratchpad** (`scratchpad/<you>-thing.js`). Two
  agents picked the same filename in the same minute and one read back the other's work.
- **Never the bare word "leak"** — say *a content leak* or *a persona leak*. The bare word has an
  incident report attached to it here, and it alarmed the owner over a non-event.
- **`grep -i` on a short name is not a measurement.** Use `-w`, drop `-i` for proper nouns, print the
  matches. The check that "proved" nothing had leaked was finding **"marigold"**.

---

## The history

Every earlier block — six of them, back to 2026-08-30, three carrying their own "START HERE"
heading — is in **`docs/NEXT-SESSION-ARCHIVE.md`**, newest first, moved there on 2026-09-13 without
a word changed. **You almost certainly do not need it.** Read it only to answer *"why did we do it
that way"*, and verify anything you take from it against the code before you act on it.

**The ritual is unchanged and now has a second half:** at the end of a session, the outgoing STATE
OF PLAY block is cut to the **top** of the archive under its own date, and this file is rewritten to
hold exactly one block — the current one. That is what keeps this file the five-minute read it
claims to be.
