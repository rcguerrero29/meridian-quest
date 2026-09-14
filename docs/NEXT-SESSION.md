# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

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
  applied (`docs/crew/FLIGHT-NOTES.md` rows 47–61); run 9's are the last thing this sitting did — check
  the ledger rows 62–69 landed.
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
