# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## STATE OF PLAY — read this first (2026-09-13, end of the crew-mode sitting)

### ⇢ 2026-09-14 — START HERE. Everything below this block is history.

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
| **Docs** | roster of nineteen; counts agree with the files; `OPEN.md` merged and pointing at `BOUNDARY.md`; this file is one block, history in `docs/NEXT-SESSION-ARCHIVE.md`; `CREW-MODE.md` has "Where the switch stands" and "What running many agents teaches" |

### What the design run settled (2026-09-14, 03:00 UTC) — read these before the queue

- **The tram livery** → `docs/ARCH-LOG.md` **A14**: the car has one colour, the band is missing from the tram, the paint goes on after A13's parts exist; the seam is the wardrobe's shape; three named cars, unlock at quest 28, picker in the gear menu with Tacho as a second door. **Two questions are his** (whose car; does the season repaint it).
- **Two storeys** → `docs/rooms/2026-09-13-two-storeys-with-a-mural.md`: the mural already grows upward in the document; a taller building takes the painting away in 3D; if the street, Meridian x19–x23 first, after the sill sprite's height scales with the wall. **One question is his** (taller wall in the document, or taller building on the street).
- **The skulls and the rail** → rows 7 and 8 of the queue below, red first.
- **Six persona proposals** from that run are in `docs/crew/FLIGHT-NOTES.md` iteration 6 with verdicts; **six mural panels** are in the raw file and not yet painted — the next sitting paints them (return visits for Beto, Rigo, Pili, Tavo; Cuca's and Don Güero's are seconds too).

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
2. **Chava at the wall, cold** (`a258b45ddfc859a74`, third attempt — two were cut off by the limit).
3. **Chema, the skulls measured** (design run resumed as `wcodhipdc`): his numbers go into
   `docs/3D-LOG.md` and beside queue row 7.
4. **The healthy-eating game** (resumed as `w720r0ok9`): the four research sweeps are filed raw in
   `docs/research/2026-09-13-healthy-eating-game.md`; the seven designers and Chuy's consolidation
   (a plan file named from Mari's title, a rule in `docs/GENRE-RULES.md`, a row in `docs/OPEN.md` §1)
   were re-running. **Then the mocks**: the `design` skill for the surfaces Pili names, and the real
   engine for whatever the reader can already show. No build.

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
| 7 | **The skulls, fifth report — not a size** (Pili, `docs/meetings/2026-09-13-la-cuadrilla-disena.md`): the sweet `#F6F2E8` and the ledge `#F7F2E2` differ by 0.4 of 255, so skull and shelf are one pale mass, and eight identical marks in a row read as cornice. **The one change: redraw `drawCalaverita` with sockets a third of the face each, dark** (ours are 2 × 2 in 8 × 8), fold the halo into the drawing; five call sites inherit it. **Red first:** a guard that counts dark socket runs on the scanline at 35 % of the projected sprite's height (≥ 2), red on `main` today. Then a cold read. Chema's measurement was still running when this was written | half a day |
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
