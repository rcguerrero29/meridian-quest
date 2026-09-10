# The open sheet — every question, where to look, what happens next

*Opened 2026-09-09 at the owner's word: "put together a q and a sheet so you can also review and know
where to look for more information on open topics, questions and possible next steps."*

**This is the index, not the content.** Every row points somewhere. If a row's answer is not in the
file it names, the row is wrong and should be fixed rather than worked around — this project has
already lost time twice to a ledger that described a city we do not have.

**How to use it at the start of a session:** read the STATE OF PLAY block in `docs/NEXT-SESSION.md`,
then this sheet, then the open GitHub issues. Nothing else is required reading.

---

## 1 · Waiting on the owner — nothing moves until he answers

| Question | Why it is blocking | Where it is written |
|---|---|---|
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

Six files now, each opened this week, each with the same discipline: **they grow from what actually
happened, never from imagination.** Read the relevant one before proposing anything in its area.

| File | What it holds | Read it before |
|---|---|---|
| `docs/TAGS.md` | The tag vocabulary, and **18 leaks** — tags that look universal and are not. L15 closed, L12 half-closed, **L16-L18 added 2026-09-10 by building a real pack and measuring** | proposing any tag, kind, glyph or seam |
| `docs/3D-LOG.md` | Every 3D attempt with its measurement, **and every rejected approach with its reason** | proposing anything about the 3D view |
| `docs/QA-PASS.md` | The test checklist and the **escape register** — what reached the owner that should have been caught | shipping anything |
| `docs/BEAUTIFY.md` | What every object renders as, what it should be, and which are correctly flat | touching any art |
| `docs/GAUGE.md` | What the engine demands of a brand-new world, **measured by building one** (2026-09-10) | proposing anything about a second world |
| `docs/decisions/` | One file per settled decision: the ask verbatim, the answer, **and the options that were rejected, with reasons**. Opened 2026-09-10; three filed, and `docs/ASKS.md` is still where most decisions actually live | re-proposing anything that sounds already-answered |

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
**every engine change must be behaviour-identical for both, proven the same day by all four
suites.**
