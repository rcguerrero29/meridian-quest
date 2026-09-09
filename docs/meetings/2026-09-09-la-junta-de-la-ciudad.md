# La junta de la ciudad — 2026-09-09

*Four agents, in parallel, on the owner's ask: "i feel like the architecture got a bit out of hand
for him and we need a better layout of the streets and the city — but if they all find they agree
with him and nacho, then we good. who would help? software engineer, UI expert, gaming expert, etc."
Plus, in the same message: what guides a player when there is no career, and storytelling best
practice for a world that is not Meridian.*

**Who sat:** Tavo (game design) · Nacho (story) · Doña Cuca (rooms and movement) · Beto Bujía (the
engine). Don Güero did not sit — the point was to review his written plan, which he has already
put on paper, and he was reviewed rather than consulted. **Every claim repeated below was
re-verified by hand against the code before it was written down.**

---

## The verdict the owner asked for

> *"if they all find they agree with him and nacho, then we good."*

**They mostly do, and the disagreement is not where anyone expected.**

**Cuca: the city is not out of hand — the ledger is.** The portal graph is a two-hub star; `st`
carries seven doors, `ex` six, and **nowhere in fifteen worlds is more than two doors from the
street**. Nobody gets lost in that. What is out of hand is `docs/CITY.md`, which calls `ex` row 10
"canal-side" when it is the south fence, says Naye's door opens onto the trolley bed when the code
pours pavement. **Don Güero catalogued four
wrong lines himself on 2026-09-08 and they are still wrong today.** A planner reading that file
builds on top of a business that already exists — which the file also records happening twice.

> **CORRECTION, same day.** This review also claimed CITY.md "puts Yola at (17,0) when the map has
> her at (20,2)." **CITY.md was right and the reviewer was wrong** — `content/meridian/npcs.js:54`
> puts Yola at `ex (17,0)`, exactly as the ledger says. (20,2) is the glyph `Y`, the trolley stop:
> a tile was read as a person, and I repeated it to the owner before checking. Caught by Don Güero,
> verified, corrected here rather than quietly dropped. Her other three findings hold.

**Beto: neither.** Not merely undocumented, and not unable to take another district. There is real
structural debt (below), and the district *is* data, and `buildInterior` proves a room can be
created at load. His measured verdict: *"The city will take another district. What it will not take
is a mistake while adding one."*

**Both defend the spine.** One axis from HQ's door through the crossing to the gap, aligned to the
tile. Cuca: *"I would defend that against anyone."*

---

## The finding that outranks everything else

**`auditReach()` cannot see a district fall off the map** — `engine/engine.js:221–228`:

```js
if(seen[id].size===0)return;   /* world locked behind a not-yet-built portal — audited once it opens */
```

Beto measured it rather than argued it. Delete one line — `PORTALS.st["%"]` at `maps.js:201` —
and **Taller Herrera** leaves the city: 161 walkable tiles, Tacho, Moy and Yesenia, quests 24–31.
`auditReach()` returns `[]`. The run is silent and green.

Sever the door *tile* instead and it reports `"st: 5 walkable tiles unreachable"` — the leftover
pocket of pavement, **not the missing district**.

The early return is legitimate — the Studio really is locked before completion — and it swallows
the failure case with it. This is the same shape as the test that pinned a sprite bug at 40px and
passed the whole time: a check written for the true case that is silent on the false one.

**This is the first thing to fix, and it is an engine rule, not a layout change.**

> **BUILT the same day — `mq-v130`.** `auditReach(grown)` reports it in the words a person would use
> and names who is stranded; `test/engine.smoke.js` severs a door and proves the audit says so; and
> writing the test found a second fault — the walk seeded only from the spawn, so the park, which has
> no portal because the leash carries you there, was never audited at all. **This paragraph is left
> standing rather than deleted, because Don Güero read it four hours later and reported it as stale
> — which is precisely the disease this junta convened to diagnose, committed by the note that
> diagnosed it.**

---

## What is actually wrong, in the order it costs

### Structural — Beto

- **A door is stated five times, in three coordinate conventions.** "The mercado's door is at
  st (6,13)" appears in `MERCADO` (`maps.js:226`), `PORTALS.st.M` (`:187`), `MAPDOT.me` (`:269`),
  `TOWNLBL` (`:260`) and `ribbons[].doorstep` (`config.js:67`). Nothing correlates them. `maps.js`
  alone uses `[y,x,g]` for overlays, `{x,y}` for portals and `[x,y]` for `MAPDOT`.
- **The `SEASONS` block is byte-identical twice.** `config.js:131–146` and `:168–183` — 1312
  characters each, verified identical after comment-stripping.
- **The overlay arrays are a workaround repeated until it looked like a pattern.** The *mechanism*
  (`applyRibbon`) is the right seam; the hand-transcribed tile lists are not. The better mechanism
  already exists in the repo — `BUILDTPL` + `buildInterior`, where `buildSafe` refuses a door onto
  nothing, and Doña Chelo's casa is already built that way. **Do not rewrite the six existing
  ribbons.** The win is that the seventh district does not add a seventh array.
- **`test/smoke.js:2980` hardcodes Meridian's spawn** (`add('hq',10,11)`) instead of `PL.spawn` —
  the one check that catches an orphan world is pinned to one game's coordinates.
- **You can only ever append a district, never insert one**, and a district's position in `CHAPTERS`
  *is* its unlock order. That is `docs/TAGS.md` L9 — quests are array indices — and it makes
  "give La Espiga one more quest" a **save migration**, not a content edit.

### Movement — Cuca

- **The one exit you cannot see.** `st` row 5 is open at (13,5) and (14,5) only. From the plaza the
  3D camera shows one continuous wall-height mass from x0 to x29. A two-tile notch in a thirty-tile
  wall, at a grazing angle, twelve tiles out, is not a door. **The engine's cutaway fires on a wall
  hiding *you*, never one hiding *your exit*.** Same disease as the chair and the below-the-fold
  panel, at city scale.
- **Two district doorsteps stand in the tram lane** — `ex` (6,1) and (12,1), on `TROLLEYAT`'s line.
  The goodbye-at-the-door beat plays on the tracks and the trolley stops dead, because it waits for
  anyone on the line. Don Güero's own option A fixes it.
- **`$` and a mural panel share a tile.** `NOLASCO=[[0,25,"$"]]` and
  `{world:"st",x:25,y:0,deco:"panel",id:"velazquez"}` — Nolasco's front door wears Velázquez's
  progress panel. *(Verified.)*
- **`PLACES.friends:["st","me","lc","lo"]`** — Sonny cannot befriend anyone in `ex`, `ta`, `pa`,
  `li` or `no`. Five worlds, including the entire second street. *(Verified.)*
- **The plaza is the biggest room in the city and the emptiest** — ninety walkable tiles, four
  objects, crossed every single time you go anywhere.

### Template — Nacho

- **`ENDLESS` appears zero times in `docs/NEW-WORLD.md`.** It is the flag that says a world does not
  end; it is live in the engine and the town declares it. **A stranger following the template today
  builds a world that ends**, and then gets Meridian's last-day epilogue printed into it — which is
  exactly what happened to the town before `ENDLESS` existed. *(Verified: zero occurrences.)*
- **The doorstep goodbye is signed canon and does not exist.** `docs/STORY.md` narrates it in past
  tense, `docs/CITY.md` marks it ✅ signed, and there is no `ending:` key in `config.js` and no
  `doorstep` in `engine.js`. Every district plays the same panel. *(Verified.)*

---

## What guides a player when there is no grade

**Tavo's answer is mostly "you already built it."** `engine.js:3210` opens:

> *"the room interview: a card with no right answer — same card the quests use, none of their
> machinery: no `pick()`, no XP, no marks, no play log, no verdict, no shuffle"*

And `hasSay` (`engine.js:480`) already counts `roomPending`, so **a person with nothing to grade
already gets the same ❗ as a quest.** The card, the persistence, the history that appends rather
than overwrites, and the copyable sheet all ship today — hardwired to one conversation instead of
being something a pack can declare.

**On mini-games, plainly:** *"A mini-game with a score is a career ladder with a costume on. It
teaches 'there is a way to be wrong in this room,' which is the one thing a comfort world must not
teach. And a reskinned quiz is still a quiz."* The shape that works is the one already shipped by
accident — **the petal moment**: stand still 2.2 seconds, the hero picks up a petal and says a line.
No score, no fail, no repeat. **A mini-game with no verb but attention.** Anything needing a win
condition: cut.

**Do not touch `engine.js:3195`.** `if(solved){done.add(cur);…}` — `done` is read in nine places:
chapter closing, the pending marks, the report, the ribbons, the growth toasts. Completing a quest
on a non-`ok` answer would silently redefine Meridian's grade, its endings *and* its city growth.
Ungraded play does not go through that line at all.

**The five mechanisms, by whether they survive the tenth time:** the world visibly changed because
you were here (≈90% built, welded to quest indices) · someone notices you specifically · **custody —
something is yours and stays** (fully shipped: the dogs, the chair, the wardrobe) · **testimony — you
say something and it comes back as paper** (built, ungraded) · ritual (a calendar; cannot carry a
game alone).

---

## Storytelling — Nacho's six rules, each with a test somebody else can run

1. **Every room is somebody's opinion.** Name its owner and what they want from you in ten words, or
   it is scenery pretending to be a place.
2. **One person, one open ask.** Two ❗ on one head turns a street into a to-do list.
3. **Every ambient line must be true forever.** Read it aloud *after* its quest is solved. If it
   lies, rewrite it.
4. **Foreshadow as law, never as history.** Read the two scenes in reverse order — both must parse.
5. **Escalation lives inside one person, never between two.** Draw the dependency arrow; if it
   crosses a name, it will break.
6. **Every exchange pays a pixel.** After the beat, name the thing on screen that is different.

**What Meridian is silently providing that a second game will not have:** every exchange is a
question with a right answer, so a conversation knows when it is over; every judgment call arrives
with a wrong answer and a joke attached; the grade is always on, so the player behaves because the
fiction says they have a job; and *an engagement has a Saturday because work ends — a place you
inhabit has no Saturday.*

**His one thing not to do:** do not keep the chapter/`need` skeleton with the lesson removed. *A
Saturday with nothing to graduate from is a countdown to nothing.*

---

## The build order this junta agrees on

1. **`auditReach()`'s blind spot.** An engine rule, behaviour-identical for both games. Red first:
   with every lot raised, remove one portal and assert the boot says *"Taller Herrera is on the map
   and no door leads to it — three people are waiting in a room nobody can walk into."* Must stay
   green for `pk`, which is warp-only by design, so the assertion is **no arrival of any kind**.
2. **The ledger.** `docs/CITY.md`'s wrong lines, and the two signed-not-built entries. Pure
   documentation, no code, and it is what the owner's instinct said the problem was.
3. **`ENDLESS` in `docs/NEW-WORLD.md`**, plus Nacho's second template lane — *the world that does
   not end*. One doc ticket, no engine work, and it stops the next world inheriting a Saturday.
4. **The ungraded station seam.** Tavo's only recommendation: generalise `ROOMS`/`roomHosts` from
   one interview to any pack-declared conversation. A seam, not an engine rule.
5. **The small map bugs** — `$` under the panel, `PLACES.friends`, the two doorsteps in the tram
   lane, the row-5 gate.

**Not on the list, deliberately:** reordering districts (quests are array indices — that is a save
migration), rewriting the six existing ribbons, and any leaderboard, streak or completion
percentage.
