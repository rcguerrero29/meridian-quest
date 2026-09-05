# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## STATE OF PLAY — read this first (2026-09-05)

**Deployed:** whatever `CACHE` in `sw.js` says — `mq-v65` at the time of writing (Part 1 of El
Changarrito: engine hygiene, behaviour-identical; `docs/story/el-changarrito.md` §7); that file is
the truth, this line is not. **The ledger is GitHub issues #3–#34 from 2026-09-05** — read them
before this file. `main` and `claude/career-training-story-plot-tj707h` are in sync.
Working tree clean. Smoke green across five consecutive runs.

### What shipped this session, newest first (2026-09-04 → 05)

- **`mq-v64` — the dog comes with you, the stop stands, the cone gets kicked.** Sonny follows
  through any door he was near, and through the trolley; sit / lie / stay make him hold and you
  leave without him; off duty he tags along ~1 in 5 from right at your heel. The MQT trolley
  stop and the traffic cone had each other's properties swapped (the stop was a decal, the cone
  was a wall) — both are `stand` tiles now. The cone is `light`: walk into it and it skitters
  ahead of your foot; Sonny rips one ~1 in 25 whims; everything resets when you leave the room
  (no save key — the owner's own scope, *"for now"*). Two ways the world could change and only
  one arrived: `openTravel` (the trolley) skipped every arrival step until both routes were
  made to call one `worldArrived()`. The trolley stop's art moved out of the engine — it
  spelled this pack's brand in engine code — and a test now forbids it coming back.
  **The mistake undone:** making the cone non-solid deleted it from the iso camera; the first
  fix routed stand tiles into `isoBlock()`, which paints flat faces and never the art — a
  featureless pillar that every metadata check waved through. Replaced with a billboard pass;
  smoke now counts *which drawing* each camera calls (IDEAS §15.28–29).
- **`mq-v63` — the stairs stand up, and a building has faces.** The stairs were never badly
  drawn; they were *lying down* — walkable, so three of four cameras painted the top-down art
  flat on the floor. A third tile category, `stand:true` (walkable, but an object), fixed it
  and retired a hardcoded `"345"` glyph list from engine3d.js. Pili redrew the stairs in plan
  and profile; HQ's arrow now points *up*. And two numbers meant no building had faces: 3D
  ambient 0.95 / sun 0.5 clipped three of five faces to white; now 0.66/0.42 plus a baked
  contact shadow, held by arithmetic in smoke §32 (IDEAS §15.25–26).
- **`mq-v62` — paper a neighbour puts in your hands.** Six documents characters hand over
  mid-quest at the nodes where the answer is *in* the paper: Chelo's eleven-item list, the
  invoice evaluation run, the incident transcript with "be helpful" as the root cause, ten
  weeks of bakery forecast, the old lead's glovebox rollout plan, Bere's fifty-two. `doc:"id"`
  on a node → the stapled-paper reader with Copy/Download. Handed paper is recorded (save key
  `hd`) and listed in the office file under *What people handed you*. Three real bugs found by
  measuring, not trusting flags — the reader opened at 0×0 inside a hidden panel.
- **Ledger corrections**, each verified against code before changing a word: `CITY.md` header
  and open-parcels list (three of four "open" lots had businesses on them), `HANDOFF.md`
  (claimed 24 quests / MAXXP 350 against 56 / 830), `maps.js` DECOR comment, `IDEAS.md` §15.8
  and §15.11 on the stairs, `templates/README.md` (undersold six of seven generated templates),
  `ASKS.md`'s "FitCheck: nothing to inherit" row (true when written, false when asked).
  Then la junta's A4 batch closed (2026-09-05): the ventanilla deferral dated in `STORY.md`,
  `OWNER.md` and `IDEAS.md` now say 3D is the default camera, `config.js`'s gifts comment
  matches the five gifts, and `PLAYTEST.md` no longer grades the ending by hearts.

### Decisions the owner made this session (verbatim, in `docs/ASKS.md`)

- **Office:** *"ok for now we are ok with the office. i think we can def improve but for now
  its ok"* — parked, not dropped.
- **Staircase:** *"i think that we can make the building bigger, fit in a proper staircase.
  move it out of a tiny room if needed."* — supersedes "its own hall"; enlarge HQ. **Not
  built** (*"dont build"*). Recorded in `CITY.md` ❗La caja de escalera.
- **House template:** the casita's door `▦` is a solid wall drawn as a door — in `SOLIDX`, in
  no `DOORS`, in no `PORTALS` — which is the whole of *"i cant enter the houses."* Agreed
  direction (Don Güero and the session independently): close it honestly as a reja, and give
  `buildSafe()` teeth — a build may not draw a door it cannot open. Not built.
- **The other session's recommendations** (FitCheck Salvage Manifest, Bones to Meshes): read,
  assessed in IDEAS §15.27 — the SDF prop forge is *not now* for a pixel-art game with no mesh
  pipeline; the stale-docs rule from the manifest was adopted.

### Open, and waiting on the owner

- ❗La caja de escalera — where the enlarged HQ puts a proper flight (Don Güero sites it).
- ❗El escalón de Dana — Legal stands in the stair hall; leave her (recommended).
- ❗El solar de la Calle Dos — `ex` row 10, the last real frontage; leave on the shelf (recommended).
- ❗El zaguán — Nolasco: up through a door, down through stairs.
- ❗El portero — what a refused build says, and to whom.
- **The four newest districts have never been human-played.** Still the real gate.

### Written this session, no code

- `docs/NEW-WORLD.md` — the template for starting another world/town/city: the nine files,
  which globals are required vs optional (verified by `typeof` guards), the three hardcoded
  switch points, the engine debt a second world hits (62 hardcoded world ids), the rules
  that travel, a build order.
- `docs/PROMPTS.md` — the three smallest prompts that make a better version of this exercise,
  each tied to the failure its absence caused here.
- `docs/meetings/2026-09-05-el-experto.md` — the second meeting: Don Güero and Nacho briefed
  a gaming expert (a guest with no lane to defend); two verifiers cross-examined his top six
  against the engine and the owner's rules. One call per item, a build order, 23 reported
  contradictions, and the learning: *a queue is a gate with a face; write every quest as if
  it could come last; every solid piece wears its drawing on all four sides; a staircase is
  length, enclosure and the same footprint on both floors — never height.*
- `docs/IDEAS.md` §15.25–15.29 — the stand tile, the light ladder, the salvage review, the
  iso slab mistake, and "two ways the world changes, one arrived".

### The lessons that outlive the session

1. **Measure, never trust a flag.** `.hidden=false` at 0×0 passed every assertion.
2. **A test that calls the function proves the function, not the wiring.** Drive `tryStep`,
   `tryPortal`, or a real click; break the wire and watch it fail.
3. **When a thing reads wrong in some cameras and right in one, it is plumbing, not art.**
4. **"It appears in all four cameras" ≠ "it is drawn right in all four."** Count the calls.
5. **A doc that records a version or a built/not-built state must name where the truth
   lives**, or it goes stale silently — twice now.
6. **Every ask is quoted verbatim before building.** Paraphrase is how requirements die.

---

## STATE OF PLAY — earlier state of play (2026-09-02, late)

**NEWEST — 2026-09-03, `mq-v60`: templates, and two process fixes the owner asked for.**
Owner: *"i keep seeing you miss testing opportunities and requirements are falling through."*
Both were true, and both now have machinery rather than good intentions:
- **`docs/ASKS.md`** — every ask, quoted verbatim, with where it landed. Fill it in BEFORE
  building. An ask answered in conversation and never built is still open.
- **Smoke §28, the discoverability audit** — for every world, from every way in, everything
  readable is marked, the place names itself in both languages, and a door with somebody
  waiting behind it says so. This is the general form of the two bugs that shipped on
  2026-09-03 (the invisible stairs, the invisible posters).

**And the feature:** `BUILDTPL` / `BUILDS` — Don Güero builds from a template with seeded
variation (IDEAS §15.22). Deterministic, picks pinned in the save, parts that read each
other, and every build validated before a tile lands — which immediately refused to build
the first casita on top of Yola the paletera. **No casita stands on the street** — both came
back off at `mq-v61`, owner: *"noone asked me to make them i was saying it is just an ability"*
and *"i cant enter the houses."* `BUILDS` is an empty array with the restore lines in a
comment; the ability is tested and unbuilt, which is where it stays until a house can be
entered.

**NEWEST — 2026-09-03, `mq-v56`:** settings became four drawers that remember what you keep
open (actions stay outside them, guarded by a test); decor is drawn in ALL FOUR cameras, with a
mural on a solid tile treated as paint on that wall's open face in 3D; and
`node test/shots.js --cams` sweeps every spot in every camera. **Left from la junta:** the grade
seam (small — `gradeOf` and the `flags` object both already exist) and then the mural's six
panels. See IDEAS §15.17.

**NEWEST — 2026-09-03 late, `mq-v55`: the city produces paper you can read.** A new pack file
`content/meridian/docs.js` (READS + DOCS), a cream breathing marker that never clears, a Read
button that always answers, and a full-screen stapled-paper reader with Copy and Download as
markdown. Six blank sheets hang in the office from day one; each district's Saturday pins its
real document over one, filled from the player's actual answers. The old lead's desk is the
machine: the note in the lid, the complete file, and the glossary. **The meeting was wrong that
the record could not fill a memo** — `logDecision` has always stored the pick. See IDEAS §15.16.
**Still open from la junta:** settings folding into four groups, the four-camera screenshot loop,
decor in iso and 3D, the grade seam, and the mural.

**NEWEST — 2026-09-03, la junta.** First `/meeting-of-da-minds`: Nacho, Don Güero, **Pili
la piñatera** (new standing expert, 3D and readability) and two guests answered the owner's
six open questions; an engine-loyal reader cross-examined; a critic found four real errors in
the chair's plan, all verified in the code by the session. **Read
`docs/meetings/2026-09-03-la-junta.md` corrections section before building any of it** — the
build order in `docs/BACKLOG.md` §7 is the corrected one. Headlines: the stair arrow alone does
NOT solve wayfinding (`doorMarks` only reaches 3 tiles; the answer is `roomInvite()` asked about
a portal's destination); the grade seam is three-quarters built already; the office gifts empty
the room instead of filling it; and **the engine hardcodes 35 world ids**, so no pack-safety
claim in this project has ever been audited. Nothing was built — the owner sees the readout first.

**NEWEST — 2026-09-03: six playtest reports fixed, `mq-v52` on `main`** (IDEAS §15.13).
The big one: `sanitizeSave()` dropped the district counter and the grades, so every
Continue reset `chSeen` to zero — the last Saturday replayed on the next open, and the boot
path into an ending never sized the canvas (a blank street under the control hint). Fixed,
with damaged saves repaired at Continue and a smoke section that plays the whole sequence.
Also: laptop keys (capitals, key codes), the growth curtain, 3D furniture as boxes when a
side view exists, animals painted for the camera stop (Sonny's ball), and a one-time toast
for a lot that opened while the phone was away. **The owner's own save will play the
mercado's Saturday once more** (its counter was reset by the bug); after "Out to the
street" the taller's toast points at the southeast lot. Then play the taller.

**NEWEST — 2026-09-02, night: the rest of the story is written and wired, `mq-v51` on
`main`.** Owner: *"i want the rest of the story for my ai practice... now please if
possible."* Nacho planned all four districts (`docs/story/las-cuatro-puertas.md` — the
plan, and at its top the four calls made with his picks); four writer agents drafted the
32 quests (24-55) EN+ES against a validator that enforces the mercado's shape; CHAPTERS
now carries six districts, each with its own three endings, burnout and next-lot toast;
`MAXXP` is 830; the report prints *industry · role*; templates 06 and 07 exist; the cats
are Tuerca, Bolillo, Pelusa, Timbre. **Not built, on purpose and written down:** ❗El
recado (a quest played away from its lot), any world change keyed to a grade, the window's
view advancing. **The next gate is a human playing the mercado** — the four new packs copy
its shape and will be revised against what the owner says after playing it. Then S6.

**MERGED TO `main` at `mq-v46`.** The branch carried the whole **S0 sitting (el 3D y el
mundo, `mq-v45`)** and then **S2 v1 — the room upstairs**; the owner said *"merge
everything once you have the first version of the room work"*, so both are live. A phone
that has the game installed picks up `mq-v46` on its next open. **The version now shows
on the opening page** (and still in Settings), so nobody has to guess what a phone loaded.

**What the room work shipped, each with a test that was red first:** Floor 2 opens
bare — one desk under the north wall, the stairs, nothing else (as signed). Nacho and
Don Güero stand a few steps from the stairs, with a ❗ while they still have a question.
Between them they ask nine questions with no wrong answers, no XP, nothing in the
career report: Nacho asks how the room should feel, Güero asks what has to be built.
Answers live on the phone (`mqroom`), never in the save, never touched by restart. After
the last question the sheet appears on the card with **Copy the sheet**, and it is also
under Settings → Export → *The room*. Everything with a name is in
`content/meridian/room.js`; the engine reads only shapes, and a pack with no `room.js`
gets no people, no tab and no storage key (tested with the file blocked). Nacho no longer
stands on the street — one Nacho, upstairs.

**How the back-and-forth works, with no API:** AJ answers on her phone → the owner taps
*Copy the sheet* → pastes it to Claude with `/room-design` → the build session furnishes
the room from her words. Spec, cold read and the four open owner calls:
`docs/rooms/aj-office.md`.

**Later the same day (on the branch at `mq-v47`, not merged):** the owner handed the
window to Nacho and Don Güero together. Built: three panes in the north wall over the old
desk, the pack's first tile file (`content/meridian/art.js`), the view north toward
Barrio Norte, the sky taking the season. And "who is the room for" became Don Güero's
first question (ten questions now); his last question was sharpened to seating so the two
bookend instead of repeating. Nacho's closing line pins the sheet to the window frame.
A player who finished the interview before gets the ❗ back over Güero — he has a new
question, which is the badge meaning what it always means.

**And later still (branch, `mq-v48`):** the owner chose MID-MOVE — four taped boxes on the
pack's second glyph (`□`, cold-read clean), Don Güero's cone, a plant in its pot; the
sight line from the stairs to the window and the arrival tile stay clear, under test.
Don Güero's furniture catalogue with per-piece estimates is `docs/BACKLOG.md` §6; his
four follow-up questions are `docs/rooms/aj-office.md` §10. The two limits the owner
thought were fixed (the 200-entry record, one storefront) are fixed now.

**Also on this branch (`mq-v49`):** the owner's two visual reports answered — doors in 3D
get a light frame and a bigger light pool; furniture gets side views (`TILESIDE`, IDEAS
§15.11) starting with the table, the counter and the stove, and the barricade no longer
reads as a ladder. Any other prop the owner names gets a side view the same way.

**Also (branch, `mq-v50`):** four reports from the owner's phone fixed (IDEAS §15.12): the
pigeon no longer steals the tap meant for Don Güero, a marker floats over doors you are
near, construction fences stand along their run in 3D. And two more ceiling items fell
for the four new districts: per-district ending strings (`CHAPTERS[i].epi/go/open`) and
looks keyed by npc id. **The rest of the story is in production** — Nacho's four-district
plan and Don Güero's four lots were commissioned this sitting; see the state of the
branch and `docs/story/` when they land.

**Deliberately not yet:** nothing changes in the room while she answers (the deliveries —
an eighth of a sitting of engine work, the rest is drawing); the window's view advancing a
stage per finished business (content-only, but not testable until districts close).

**Still true and still the trap:** several models work this repo at once. Do the
divergence check in step 1b below before reading a single line of engine code, and never
quote a version number to the owner without checking what `main` actually serves. This
session's own resume summary lost the S0 sitting once — the branch knew, the summary did
not. `git log` first, always.

**Three of the ceiling's seven items fell on 2026-09-02** because the owner asked ("I
thought we fixed this 200 entries thing and not stopping at a certain amount of store
fronts"): the record keeps every decision, storefronts are a list (`ribbons[]`, the old
singular still works), and each storefront declares its own handover doorstep. Still
standing, and still what a THIRD district needs before it can end: per-district epilogues
(`finish()` has two sets), the `NPCLOOK` letter collision, and `GROWTH` reading a grade.

**Next is S1 — la cimentación** (backlog §1), now smaller. Nothing visible ships from it
and that is said out loud. It is also what the office furniture waits on.

## The backlog lives in `docs/BACKLOG.md`

*El changarrito de Don Güero* — one ranked list of everything queued, with costs, so
nobody has to reconcile `IDEAS.md`, `CITY.md` and this file to find out what is next.
Opened 2026-09-02 at the owner's ask. **Read it before planning; update it when
something ships or a decision lands.**

## Resume ritual

0. **Read `docs/OWNER.md`** — the owner's standing rules (settled decisions, taste,
   how to bring them a choice, and the referee → browse-and-approve ladder). New
   2026-08-31; both planner skills now read it before planning.
1. Read `docs/HANDOFF.md` (state + shipping rules), `docs/CITY.md` (city ledger),
   and this queue. Skim `docs/IDEAS.md` §6-9 for the designed-but-unbuilt backlog.
1b. **DIVERGENCE CHECK — do this before reading a single line of engine code.**
   Other models are working this repo at the same time (docs/OWNER.md → Settled).
   Run all three, every session:
   ```
   git fetch origin
   git log --oneline HEAD..origin/main     # landed without you — merge it in FIRST
   git log --oneline origin/main..HEAD     # yours, and NOT deployed yet
   git branch -r                           # who else is mid-flight
   ```
   If the first command prints anything, **merge `origin/main` before investigating**.
   On 2026-09-01 a session spent a round root-causing a 3D bug from a base that
   predated two fixes for it already sitting on `main`. Stale reading is worse than
   no reading. Expect `mq-vN` pins to collide on the merge; resolve FORWARD.
1c. **THE 3D/WORLD SESSION is queued and fully specced — `docs/IDEAS.md` §15.**
   Do it as ONE sitting, in this order: ~~the doorway re-entry bug~~ (**done 2026-09-02**,
   §15.6a — `tryPortal()` + `portalHold`, test in smoke) → ~~doors facing the
   wrong way in 3D and the orientation-blind walls behind them~~ (**done 2026-09-02**,
   §15.3 — one new finding logged there: a wall between you and the camera) → ~~the blur bake
   at device resolution~~ (**done 2026-09-02**, §15.1 — K at every bake site) → the rainbow bridge
   arch + Day of the Dead palette (§15.4, needs an owner sign-off on the palette).
   Use `node test/shots.js` before AND after — it is the only check that can see a door
   lying on the floor.
   **Ride-alongs the owner assigned to this same sitting:** ~~the storefront legibility
   fixes~~ (**done 2026-09-02**, §15.8 — bowl in La Cocina's window, `DOORLOOK` per door,
   desk/table/scale redrawn; all re-read cold) and the `SEASONS` seam (§15.9 — one
   autumn season on the Día de Muertos palette, auto by date with a Settings override,
   bridge only as the proving run — **seam done 2026-09-02**, palette awaiting sign-off).
   Elevation (§15.10) is NOT in this sitting — it waits
   for a second thing that needs it.
   **After this sitting the cold read is permanent**, not a one-off: it is step 2b of
   the shipping checklist in `docs/HANDOFF.md` and a Settled rule in `docs/OWNER.md`.
2. Work on a `claude/...` session branch; merge to `main` only when the owner says
   (main auto-deploys to GitHub Pages; installed PWAs update after one refresh).
   **The owner sees `main` and nothing else** — if work is not merged, say so plainly
   rather than reporting a version number they cannot load.
3. Every ship: `npm install playwright-core` once, `node test/smoke.js` green,
   EN/ES in lockstep, bump `CACHE` in `sw.js`.

## Today in review (2026-08-31, the marathon session)

Shipped to `main`, in order: engine/content split verified → nature pass (canvas
theming, flora, critters) → music + townsfolk + 39 name eggs + character creator →
Don Güero (city planner, Opus 5) + city ledger → Phase 1 signed → El Mercado built
(superseded by the parallel don-guero session's AI-PM build — merged, its newer
signatures win) → theme-editor dark-variant fix → every-animal interactions →
activity ticker → NPC edit panel → door glow → Nacho (story director, Opus 5) +
story bible → tune picker → activity emotes → **world upgrade wave 1** (TILEDRAW
registry + TILEART seam, floor variation, wall shadows, walk cycle, blinking) →
**wave 2 lighting** (time-of-day wash, night light spills from doors/storefronts,
sunset theme keeps golden hour) → **palette wardrobe** (up to 8 named custom
palettes: clone-from-preset saves-as-new, rename, ▲▼ reorder, evict; per-device).
Deployed at sw `mq-v22`. Smoke suite green throughout (24 quests, maxXP 350).

## The skills (the team, documented)

- **`/don-guero`** — city planner. Opus 5 agent reads `docs/CITY.md` (districts,
  parcels, decision log), drafts the growth phase, returns owner decisions as
  ❗ side quests. Signed answers are permits.
- **`/nacho`** — story director. Opus 5 agent reads `docs/STORY.md` (premise,
  principles, arc, open threads), plans chapters/arcs/endings, side-quests the
  owner on story forks. Teaching mode IS story mode.
- **`/playtest`** — walks the owner through the tour (docs/PLAYTEST.md, 14 stops)
  and maps "stop N broke" to the right file.
- Loop for any phase: `/nacho` (plot) → `/don-guero` (parcel) → owner signs both →
  build → smoke green → bump sw CACHE → merge on owner's word.

## Queue (owner-set, rewritten end of 2026-09-01 — the Sonny marathon session)

**What this session shipped (mq-v27 → mq-v40):** the stakes/grade review+merge;
front-profile 2.5D camera (now DEFAULT via CAMDEF); TILES/DECOR/DECALS seams;
lit windows/awnings/fence posts; TRUE 3D as camera #4 (three.js vendored, HD-2D,
blur root-caused twice: pixel-art pipeline + resolution); El Parque 🌈 (leash →
rainbow bridge → chill session → recap card); Sonny canon (face heart tip-to-nose,
lemon tail white tip, blue collar+leash, minimal digging, real howls, food-driven
6/7 fetch, BFS fetch); breeds (lab/chihuahua + coats); 🎓 training (sit/down/stay/
come/follow with reps + treat bonus); agility course; dog society (sniff/chase);
NPC best friends + city roaming; rename/rehome (no limit, nobody deleted); the
always-on 🐾 paw menu with the cross-city whistle; WASD-vs-typing fix.

1. **Playtest everything** — the mercado chapter AND today's upgrades (lighting at
   night, palette wardrobe, tune picker, NPC editing) have not been human-played.
   `/playtest` guides; quest copy and feel are the deliverables.
2. **Phase 2 — `/nacho` is DONE (2026-09-01); `/don-guero` is next.** The arc past
   the mercado is planned and four story decisions are SIGNED into `docs/STORY.md`:
   ❗La vía (the trolley brings customers *and* a franchise scouting the north end),
   ❗La carta (**referrals** — Chelo phones ahead and what she says is the grade you
   earned; the barrio is the player's reference letter and every business is a job
   interview), ❗Tacho (the old mechanic never comes around, and that's the win),
   ❗El listón + ❗El día (la inauguración plays in the world in five diegetic
   seconds; the day turns over while the player is away and the street remembers).
   Three of those graduated to `docs/OWNER.md` → Settled. Taller Herrera is cast,
   escalated across 8 quests, given three grade endings and a voice guide — a build
   session can write EN+ES from `docs/STORY.md` → "Phase 2 — Taller Herrera".
   **Run `/don-guero` for the parcel half before building** (st southeast lot, `ta`).
   Nacho's finding worth carrying: the quests train the roles, the arc did not —
   the role was a label in `config.js` nobody in the world ever said. Referrals,
   naming the role out of a character's mouth, and giving the decision report a
   reader in the world are the three fixes, now canon.
2a. **DONE 2026-09-01 — the open city shipped, and so did the story canon it needed.**
   `qOpen` fixed (districts open and stay open), `week1` `need` 16 → 12, nine strings
   rewritten EN+ES, 24 `late` reframe lines added, nine continuity breaks fixed, the
   world-tag ❗ un-hardcoded. sw + GAMEV `mq-v40`, smoke extended and green.
   **What is left for the customization pass is written up in `docs/STORY.md` →
   "Bible vs. game text — OPEN"** — four items, each with options: the burnout
   epilogues belong to a mode that ships off; which calendar survives into the
   reusable template (the `week1` ID half is DONE — renamed `principal`; the words in the
   fiction remain open); ambient chat has no
   state; and Nacho's preferred Week One split (office 0-9 / barrio 10-15 as two
   districts with two Saturdays) which would make the barrio floor structural instead
   of arithmetic — queued for the Taller Herrera session.
2b-old. **Story canon the shipped game contradicts** (`docs/STORY.md` → "🚩 Bible vs.
   game text — signed, NOT BUILT"). Three, in cost order: `qOpen` at
   `engine/engine.js:146` still gates on `chSeen` so districts close behind the
   player (highest story cost — the barrio takes things away); "Roll credits" ends
   all three mercado epilogues against Settled "the city has no credits"
   (**replacement copy EN+ES is written and ready to drop in**); and `in3` still
   threatens "the week resets" while `STAKES.mode` ships as `none` (copy not yet
   written — Nacho's lane).
2b. **Phase 2 detail is already planned** (added by the /don-guero session, see
   CITY.md → "The open city — Phases 2-5"): weeks are retired, `CHAPTERS` becomes
   districts that do NOT close behind the player, and all four remaining businesses
   are cast and scoped — Taller Herrera (automation consultant, st southeast lot),
   Panadería La Espiga (ops analyst), Limpieza Velázquez (implementation lead),
   Nolasco Tax & Notario (prompt engineer). One per sitting. **Correction 2026-09-01:
   the stakes layer and the per-business grade DID ship** (`STAKES={mode:"none"}` in
   config, `gradeOf()` at `engine/engine.js:131`) — earlier queue text calling them
   signed-not-built was wrong. The one real gap left is **the open city itself**:
   `qOpen` at `engine/engine.js:146` still gates on `chSeen`, so districts close
   behind the player. Do that refactor before the taller; the taller depends on it,
   and Nacho's referral spine assumes every door stays open.
2c. **MERGE NOTE 2026-09-01.** This branch (story/open-city) and the pet/3D lineage
   both bumped to mq-v40 independently and were merged here; the merged tree is
   **mq-v42**. Nothing was dropped from either side. The story branch was cut from
   1774116, i.e. BEFORE the two 3D blur fixes, so any 3D reading taken on that
   branch alone was stale — check `engine/engine3d.js` on the merged tree.

1. **Playtest sweep with AJ** — the whole park loop, 3D on their real phones
   (sharpness verdict!), the paw menu, roaming dogs at their friends' sides.
   Triage with /playtest. Kisses: PENDING owner canon check (IDEAS §11) — build
   into the 💗 button only when confirmed.
2. **Dress dogs via Xochi** (planned, IDEAS §11): pet wardrobe generalizes to
   named dogs; one short sitting.
3. **THE CAREER GAME NEEDS LOVE.** This session was all Sonny; the AI-role
   practice packs are the actual product (OWNER.md). Next: the open-city refactor
   (clients-not-chapters, CITY.md Phases 2-5), then Taller Herrera (automation
   consultant pack) via /nacho + /don-guero. The janitor business (sanitation +
   ops-scheduling practice, Sonny's 💩 economy) is a natural Don Güero phase that
   BRIDGES the dog world and the career game — pitch it to the owner.
4. **Graphics rung ③** — 2× sprite detail, people + dogs first (IDEAS §10);
   those sprites become the 3D billboards for free.
5. **3D sitting 3** (IDEAS §14): drag-to-orbit, emissive night windows, DECOR +
   decals in 3D, input remap under rotation, iso retirement decision.
6. **Pet spin-off split** (IDEAS §13): content/petcare/ cartridge — after AJ's
   pack; the park is its starting map; Sonny fronts the preview.
7. **AJ's picks** (IDEAS §9 fandom round 2) and **Music v2** (IDEAS §8) when
   their turns come. **AINPC** (§6) stays owner-gated.

## Resume ritual additions for this queue
- Sonny is CANON now — read IDEAS §11 before touching any dog code.
- Dog persistence lives in `mqpark` (dogs, bandanas, training, friends, rehomed).
- Cameras: top / front (default) / iso / 3d — engine3d.js requires
  vendor/three.min.js; sw ASSETS lists both. Version lockstep now spans 3 files'
  worth of caution: sw.js CACHE == config.js GAMEV, smoke-enforced.

## State snapshot (2026-09-01)

- `main` = deployed through **`mq-v61`** (2026-09-03). Nothing waits on a branch.
- **Anything in this file that records a version, a count, or a built/not-built state must say
  where the truth lives** — a doc that states a fact without naming its source goes stale
  silently, and this one has done it twice. For the version, the source is `CACHE` in `sw.js`.
  For what is built, the source is the code, not the plan. (Borrowed 2026-09-04 from the
  FitCheck salvage manifest, which caught the same failure in another repo: a doc claiming 41
  tests against a reality of 169. IDEAS §15.27.)
  *(This line has now been stale twice: it said `mq-v40` when the truth was v44, caught in
  the 2026-09-01 sweep, and said `v44` when the truth was v61, caught 2026-09-04. The
  version of record is `CACHE` in `sw.js`; when those two disagree, `sw.js` is right.)*
- Pet-care spin-off shape signed (IDEAS §13): Sonny fronts the preview mini game
  inside Meridian, some customization there, full customization in the standalone.
- The 3D plan is written and signed off as PLAN ONLY: IDEAS §14.
- Default-branch setting on GitHub still points at an old `claude/...` branch —
  owner intends to flip it to `main` (repo Settings → General → Default branch).
- Engine/content split holds. Seams: `CRITTERS`, `CHILL`, `EGGS`, `CHATTER`, `MUSIC`,
  and (Phase 1) `DOORS`, `SOLIDX`, `MAPCOL`, `TOWNLBL`, `MAPDOT`, `MERCADO`, `CHAPTERS`.
  Tile glyphs added: `Z S H I` + stations `s n u v`.
- **Chapters are data**: `CHAPTERS` in config.js decides how many quests close a
  district. `need` is deliberately below the pack size (mercado: 5 of 8) — the smoke
  test asserts that, so keep it true when adding packs.
- Skills in repo: `/playtest` (testing + triage), `/don-guero` (city planning,
  Opus 5), `/nacho` (story direction, Opus 5 — docs/STORY.md).
- Owner's meta-goal: keep practicing AI delivery across industries; the city is
  the gym. Fun is a requirement.
