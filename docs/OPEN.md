# The open sheet — every question, where to look, what happens next

*Opened 2026-09-09 at the owner's word: "put together a q and a sheet so you can also review and know
where to look for more information on open topics, questions and possible next steps."*

**This is the index, not the content.** Every row points somewhere. If a row's answer is not in the
file it names, the row is wrong and should be fixed rather than worked around — this project has
already lost time twice to a ledger that described a city we do not have.

**How to use it at the start of a session:** read the STATE OF PLAY block in `docs/NEXT-SESSION.md`,
then this sheet, then the open GitHub issues. Nothing else is required reading.

---

## 0 · The two newest, added 2026-09-12 — one answered, one still his

| Question | Why it is blocking | Where it is written |
|---|---|---|
| ~~**The ride: a picture, or something to do?**~~ **ANSWERED 2026-09-12/13** — *"a bit of an animation and eventually something to do"*, then all five follow-ups signed | — | `docs/ARCH-LOG.md` **A13 — SIGNED**: outside the car, the aperture rule is law, nothing happens on the ride yet, the dog is the second passenger, the driver is with Nacho. **Planned, not built** |
| **Two visible storeys: a picture, a room, or the two joined?** | This repo already has a room upstairs and nothing ties it to the street facade. Joining them is a third thing and nobody has costed it | `docs/rooms/2026-09-12-two-visible-storeys.md` — possible with no engine change, and the camera takes most of it back. **No to skyscrapers** |

## 1 · Waiting on the owner — nothing moves until he answers

| Question | Why it is blocking | Where it is written |
|---|---|---|
| **The second world about eating well — AJ's answers, the second video, the pantry photos.** The owner answered all fifteen on 2026-09-14 (`docs/la-sobremesa.md` §12). What is still owed: AJ's eight (`docs/for-aj/LA-SOBREMESA.md`); the Cookingdom recording; photos of his pantry; his pick on grading's shape and on one-pantry-two-phones; two scope lines for `docs/OWNER.md` (§12.4) | **Nothing is built until AJ answers 1, 2 and 6** — the merge board is her favourite part and the biggest piece, and the pantry's whole design depends on whether she would keep a list | `docs/la-sobremesa.md` §12 |
| **The tram livery — whose car is it?** (a) a commission: the repaint is Don Tacho's payment at quest 28, chosen once, the picker in the gear menu — Tavo and Rigo recommend this; (b) a settings screen with swatches; (c) seeing the car in the shop, a new room that fights *never nonsense* | It decides the shape of the seam; nothing in A14 is built until he picks, and the parts (band, pole) come before the paint either way | `docs/ARCH-LOG.md` **A14** |
| **Does the season repaint the tram?** Día de Muertos may *dress* the world; a car in marigold is dressing or rebuilding depending on who you ask | One line in the season table, either way, and it should not be decided by whoever builds the livery | `docs/ARCH-LOG.md` A14, Beto's question; `docs/OWNER.md` the season rule |
| **Two storeys: a taller wall inside the document, or a taller building on the street?** The mural already grows upward per visit; a taller building takes the painting away in 3D. If the street: Meridian x19–x23 first, after the sill sprite's height scales with the wall | Cuca recommends the document (one sitting); Don Güero has the parcel if he wants the street | `docs/rooms/2026-09-13-two-storeys-with-a-mural.md` |
| **GitHub → Settings → Pages → Source: what does it say?** Nothing in this repository can read it. If it says "deploy from a branch", every guard on the public build is inert and `/changarrito/` is live regardless of what merges | It is the most expensive row in `docs/BOUNDARY.md` and it costs him thirty seconds; the alternative is G1 there, a check that asks from outside | `docs/BOUNDARY.md` row 1 and G1 |
| **Should a town-only change be forced to bump `ch-v`?** The town's `GAMEV` is the only thing that tells his laptop to `git pull`; nothing guards that it moved. A guard means a bump on every town commit, comment-only ones included | Claiming by label shipped at `ch-v102` by somebody remembering, which is the state `docs/REGRESSION.md` #11½ calls worth nothing | `docs/BOUNDARY.md` row 5; Yaz's note in `docs/crew/FLIGHT-NOTES.md` iteration 5 |
| **Should a claimed `tier: low` issue stand up on the street?** Today a low issue is a note on the board, so a claim on one shows only on the house board's *Taken* list. One line makes it a body, and puts low-tier work back on the street he deliberately cleared | Only matters once the crew claims low-tier work; built as-is until he says | `changarrito/content/record.js` `place()` — `eligible`; Beto's question in `docs/crew/FLIGHT-NOTES.md` iteration 5 |
| **Should Meridian itself become endless?** He called it "open world"; I read that as how it *plays*, not an instruction. Flipping the flag deletes six chapters' worth of endings. | It is a product decision about the shipped game, not a code decision | `docs/NEW-WORLD.md` §0½ |
| **Is the 3D standing goal right?** *"A pixel world that obeys real light and real depth, without ever stopping being a pixel world."* I inferred it from what he has signed; he has never said it in those words. | Everything Chema measures is measured against it | `docs/3D-LOG.md`, top |
| **Does the plaque's content survive contact with the game?** He answered: goals, life, AI-for-good, and guidance an agent can read while building. That is four jobs for one object. | Nacho has to write it before anyone builds it | `docs/CITY.md`, Phase 6 |
| **How wide is "wide"?** The rule of twelve is in as changeable, because a game with a pitch needs wide empty ground. Nobody has said what the exception looks like. | It is the first thing a second game will hit | `docs/OWNER.md` |

## 2 · Decided, not built — the queue

| What | Signed | Where the plan is |
|---|---|---|
| **Split `ENDLESS`** into "does an ending panel play" and "how does the world open its next district" | 2026-09-09, "split, ok go for it" | `docs/TAGS.md` L12 · **the landmine is real: an endless pack with 2+ districts is locked in district one, silently** |
| **El Zócalo** — the fountain, benches, planting, and *la placa* | 2026-09-09 | `docs/CITY.md`, Phase 6 proposal |
| **Upgrade, do not cut**, the five objects Don Güero placed | 2026-09-09 — *he reversed his own planner and was right: a cone that is wrong is a cone in the wrong place, not a cone too many* | same |
| **Townsfolk and animals with no story part** you can talk to and make requests of | 2026-09-09 | this file, §5 |
| **The beautify list** — rug, crates, counter, quest marker, grass, bushes, tables, shelves | 2026-09-09 | `docs/BEAUTIFY.md` — **the top four are art alone, no engine, no version bump** |
| **Interactive and liftable objects**, with real dimensions, reusable by other games | 2026-09-09 | this file, §5 |
| **Find-quest mode on the map** | 2026-09-09 | this file, §5 |
| **A comfort-and-crowding pass at fullscreen** | 2026-09-09 | `docs/QA-PASS.md` |
| The ungraded station seam | 2026-09-09 | GitHub #157 |
| `ENDLESS` in the template + the world-that-does-not-end lane | 2026-09-09 | GitHub #156 |
| Quests get names instead of array positions | 2026-09-09 | GitHub #153 — **the largest single blocker to a template** |
| The town's career ladder ("AI LEGEND") in a pack that disclaims one — **half built, and this row did not say so.** The **strip** is fixed: `HUDFACT` ships (`engine/engine.js:401-411`) and the town prints a fact instead of rank-and-XP (`changarrito/content/record.js:638-648`). **The door is not:** the town still asks you to pick The Architect / The Diplomat / The Operator (`changarrito/index.html:384-388`) and still carries `levels:[…,"AI LEGEND"]` in its own strings (`changarrito/content/strings.js:32`, `:240`). A pack **cannot** drop the three careers today — that is `docs/TAGS.md` L17, confirmed by `docs/GAUGE.md`. Verified against the code 2026-09-10 | 2026-09-09 | GitHub #154 · `docs/decisions/0001-the-strip-carries-a-fact.md` |
| The city ledger's wrong lines + four small map faults | 2026-09-09 | GitHub #158 |
| ❗El espejo option B — Naye's three quests | 2026-09-09 | `docs/CITY.md` |
| Nacho's 35 door lines | earlier | `docs/changarrito/DOOR-nacho.md` |

## 3 · The registers — where knowledge lives now

**Twelve now** — the count said "six" for a day after the table had nine rows, and "ten" for two days after it had eleven; `GAUGE.md` was also listed
twice; both corrected 2026-09-11. Each has the same discipline: **they grow from what actually
happened, never from imagination.** Read the relevant one before proposing anything in its area.
**Twelve is the count of the table below only** — the working papers under it are raw material, not
registers, and they are listed because a thing the index cannot reach is a thing nobody reads.
**Every count in this section was re-checked against the files on 2026-09-14**; two were wrong (the
leak register said 18 and held 22, the regression map said R1–R10 and held R11), which is the third
time a count in this file has gone stale and the reason the counts now name what they counted.

| File | What it holds | Read it before |
|---|---|---|
| `docs/TAGS.md` | The tag vocabulary, and **23 leaks, L1–L23** — tags that look universal and are not. L15 and L20 closed, L12 half-closed; **L16-L18 added 2026-09-10 by building a real pack and measuring**, L19-L22 by the tram work, **L23 on 2026-09-13: a look is write-once per id, so a pack cannot change anybody already standing** | proposing any tag, kind, glyph or seam |
| `docs/3D-LOG.md` | Every 3D attempt with its measurement, **and every rejected approach with its reason** | proposing anything about the 3D view |
| `docs/QA-PASS.md` | The test checklist and the **escape register** — what reached the owner that should have been caught | shipping anything |
| `docs/BEAUTIFY.md` | What every object renders as, what it should be, and which are correctly flat | touching any art |
| `docs/GAUGE.md` | What the engine demands of a brand-new world — **measured by building one**, not inferred | starting a pack, or changing the shared suite |
| **`docs/GENRE-RULES.md`** | **What other games already proved, as a RULE with its TRAP — two pages, `[WEB]`-sourced.** The five things that survive removing a timer, the eight things a mistake can mean with no fail state, and the line that stops a calm game being an empty one. The long sweeps live in `docs/research/` | **proposing any mechanic, and before saying the word "chill", "cozy" or "relaxing" about anything** |
| `docs/GIFTED-GAMES.md` | Sourced research on genres, physics, difficulty, multiplayer and occasion design, and **what this engine already ships** for each | proposing a mini-game or a new seam |
| `docs/REGRESSION.md` | The regression map, **R1–R11** (R11 opened 2026-09-13 and **not fixed**: a standing person is a wall, and `test/smoke.js` is red about one run in twenty-five because of it), the suites and where each runs, and **the proxy register — 23 rows** — with the rule they were bought with: **a guard has to read the noun it actually means** | writing any test |
| **`docs/POSTMORTEM.md`** | **Every way the sessions have actually got it wrong — the expensive ones and the silly ones — with what each cost.** Opened 2026-09-12 at the owner's word: *"give them a post mortem and to learn from it so it is ready for them for next time they build"* | **building ANYTHING.** It is the shortest register here and the one most likely to save you an afternoon |
| `docs/SECURITY-NOTE-2026-09-10.md` | What the El Changarrito exposure **was and was not**, what the token can actually do, and the four things to check | any question about what leaked, or before touching the deploy |
| **`docs/BOUNDARY.md`** | **Every edge of the project — what leaves town, what we promised there with `file:line`, which guard reads that exact noun or the word nobody, and when it was last planted against.** Opened 2026-09-13; Zeni's ledger, Melo's list. `test/leaves.js` reads its path table | any change to a workflow, a shell, the service worker, a sanitiser, a token, a fetch, or the deploy |
| `docs/decisions/` | One file per settled decision: the ask verbatim, the answer, **and the options that were rejected, with reasons**. Opened 2026-09-10; three filed (`0001`–`0003`), and `docs/ASKS.md` is still where most decisions actually live | re-proposing anything that sounds already-answered |

### The working papers — not registers, and reachable from nowhere else

*Added 2026-09-14, because four of these were written this week and the index did not know they
existed. A register is distilled; these are the raw material it was distilled from, and none of them
is re-checked against the code after the day it was written.*

| Folder or file | What is in it |
|---|---|
| `docs/NEXT-SESSION-ARCHIVE.md` | **History, not instructions.** Every superseded STATE OF PLAY, newest first, moved out verbatim on 2026-09-13 when `docs/NEXT-SESSION.md` had reached 924 lines and only its first hundred were current. **A fact you find here is a fact about that date** |
| `docs/crew/` | How the crew actually ran: `FLIGHT-NOTES.md` (pre- and post-flight per agent, and the ledger of persona-edit proposals with verdicts), `MURALS.md` and `MURAL-LEDGER.txt` (the wall and its fingerprints), `TOWN-STATE.md`, the crew-mode HTML sheets, and **`POSTMORTEM-2026-09-13-lessons-raw.md`** — the six agents' lessons as returned, before Chuy consolidated them into `docs/POSTMORTEM.md` §13 |
| `docs/meetings/` | Seven dated notes where a decision was argued rather than announced — *la junta*, *el experto*, *la caja de escalera*, *la junta de la ciudad*, *el mandado*, *la parada*, *la cuadrilla diseña*. Read one before re-opening an argument it already had |
| `docs/research/` | The long `[WEB]`-sourced sweeps with tags and URLs intact (cooking games, critters in play, healthy-eating game). **The transferable rule out of each one lives in `docs/GENRE-RULES.md`**, which is what an agent actually opens |
| `docs/rooms/` | Per-room design notes, including the costed answer to "two visible storeys" |

## 4 · The traps — things that have already bitten, written so they bite nobody twice

- **A test that pins current behaviour can pin a bug.** One asserted a sprite was 40px and passed the
  entire time the sprite was wrong. **Make the old code fail first.**
- **The #39 flat list is wrong in both directions.** Some things on it are correctly flat; some
  things badly wrong are not on it at all.
- **`kind` has never set walkability.** `SOLIDX` does. Anyone planning by `kind` is planning against
  nothing for half the vocabulary.
- **A glyph becomes a box the moment a side drawing exists** (`engine3d.js:241`) — which is why a
  blanket `TILEART_SIDE=Object.assign({},TILE_PROPS)` silently boxed a round cart and a chair.
- **Quests are array indices.** Inserting one renumbers a world *and every save*.
- **Scratch reaches `main`.** Four times in one day, every time by somebody who had been told and was
  being careful. Explicit `git add` paths, always. Instructions did not work; the hook did.
- **`docs/CITY.md` cannot be trusted** until GitHub #158 lands. Verify against the maps.
- **Fixing one cause does not clear the symptom.** The blur had two causes. And a cure can overshoot:
  the sugar skulls were not hidden, they were shrunk by the fix for the opposite fault.

## 5 · The four asks with no home yet — these need tickets before they need code

**Interactive and liftable objects.** *"we can take advantage of the realistic dimensions of objects
to one day grab them by a character and give us functionality for other games as well as art and
components."* This is the largest idea currently open and it lands on top of `docs/BEAUTIFY.md`:
**an object cannot be picked up until it has an honest body**, so the beautify work is the
prerequisite, not a parallel track. It also needs a decision on where "held" lives — the engine
already floats held items beside people's heads, unattached, and Chava reports they pop in and out
between frames.

**Townsfolk with no story part.** *"lets have some agents who dont have story parts at the moment
there. we can chat or even make requests."* Tavo's ungraded station (#157) is the mechanism —
already built, hardwired to one conversation. **"we have artists?"** is an open question: nobody in
Meridian currently makes anything you can watch them make.

**Find-quest mode on the map.** *"lets put a find quest mode in the map. lets review the map and make
it realistic."* Two asks in one sentence: a mode that shows where the ❗ are, and a pass on whether
the map reads as a real place. The first is small. The second is Don Güero and Cuca.

**Comfort and crowding, at fullscreen.** *"one test has to be an agent taking screenshots on full
screen and ensuring that it is a comfort game and experience as well as things arent too crowded."*
Lupe owns the fullscreen row and it is **not automated yet** — that gap is already written in
`docs/QA-PASS.md`. Chava's walk is the template for the rest of it.

## 6 · What the game is, for a session that has never seen it

Six districts, 56 quests, 15 worlds. You start in HQ; **fourteen people have a ❗ on a fresh save**,
eight of them in the room you start in. District 1 needs 12 of its 16 quests to open El Mercado.
Nothing is buried. The ❗ means one thing forever, and it is the only thing that says "here is what
is next" — which is itself a finding, because the street has one person on it and nothing to read.

**The two games:** Meridian Quest is public and teaches AI delivery judgment. El Changarrito is the
owner's backlog as a street, localhost only, never linked from the public game. One engine, and
**every engine change must be behaviour-identical for both, proven the same day by every suite CI
runs — see `README.md` "Test before shipping".**
