# The murals — what the crew decided, on a wall, and never painted over

*Opened 2026-09-11 at the owner's word: "i want yall to plan for a growing set of murals that express
the changes of the agents so they can add and improve but not completely remove, it can tell a story
at parts, but should remind us of artful decisions and progress… we dont delete and we capture each
iteration in a log or screenshot or both… if one of them has a very agressive persona, maybe their
harshest decisions can be on the mural."*

**BUILT 2026-09-11** (`ch-v84`), at the owner's word: *"i want the mural please."* This file stays as
the spec; what follows is what actually shipped and what it cost.

## What shipped

**El mural de la cuadrilla** — `changarrito/content/murals.js`, painted on two tiles of city hall's
own wall at `st` (12,0) and (13,0), immediately left of the door. Two panels, one per crew iteration
of the trolley job. From across the street it is a limewashed wall with a red band on it; you walk
up, press, and the panels draw at reading width with the decision, who made it, and the iteration.

**It took Option A and Option B at once**, and the reason the table below did not see that coming is
that the table was written before a document could carry a drawing. `mq-v140` shipped the `art`
section that morning (the owner: *"can we have functionality there wehre you see tiles/icons from
afar but you get close and can interact to see it full screen"*), so the "readable wall" option is
now a wall you read **pictures** off, not a plaque. The third option — a room that gets longer —
stays unbuilt and stays the honest most-faithful answer.

**The one rule is guarded, not merely written.** `docs/crew/MURAL-LEDGER.txt` holds one line per
panel: its id and a fingerprint of the words a person reads. `test/town.smoke.js` fails the build if
a listed panel leaves the wall, is renamed, is reordered, or has its words edited after the fact.
Adding is free and silent. **Both violations were planted and both fired** — and the second plant is
the one worth recording: the session softened Rigo's harshest line from *"the two cabs drawn on it
are decoration"* to *"could be improved"*, and the wall refused it by name. That is the failure mode
the owner's rule exists for, reproduced on purpose, on the first day.

**What it cost, honestly.** Three things went wrong and all three were caught by guards rather than
by care:
1. The first tiles chosen had a sugar skull on one of them (`st` 11,0), and a guard that pins the
   town's north rank caught the map edit the same second.
2. The glyph chosen was **`M` — which is already this town's door to Pili's paint shop.** Adding it
   to `SOLIDX` made that door solid and an entire district fell out of the city. One part, one name
   (`docs/TAGS.md`); the wall is `▧` now, a glyph free in **both** packs.
3. Opening the wall exposed a live bug in the `art` block shipped that morning: `docOpen` renders
   while the reader is still hidden, a hidden element's `clientWidth` is 0, and the fallback invented
   a width nobody has — **a 512 px canvas in a 412 px column, so a fifth of every picture in either
   game hung off the right edge where nobody could see it.** Fixed in `mq-v141` with a guard that
   renders the way `docOpen` really does; the old check asked only whether a picture was big *enough*.

---

*(The original spec follows, unchanged.)*

---

## What it actually is

**A mural is `docs/crew/FLIGHT-NOTES.md` with a wall to live on.** That file already holds what each
agent expected, what happened, and what they changed about themselves. It is the right content and
the wrong medium — nobody walks past a markdown file.

Nacho paints the murals in the story already. The crew are already buildings on the town's street.
**This is the two joining up:** when the crew changes something, the wall shows it.

## The one rule that makes it work

> **Add and improve. Never remove.**

The owner's own constraint, and it is the whole design. A mural that can be repainted is a status
board — it shows the present and forgets. A mural that can only be **added to** becomes a record, and
a record of *artful decisions* is exactly what `docs/ARCH-LOG.md` exists for in prose.

**This is legal under `ARCH-LOG` A3**, which settles what a record in this game may be: a record of
the **past** is always fine, a record of the **present** is fine, **a list of the future is the
banned thing.** *"Beto cut the summon"* is the past and belongs on a wall. *"Beto should fix the
stop"* is a to-do list and may never appear.

## What goes on it, and what does not

| Goes on | Does not |
|---|---|
| A decision that **cost something to make** — a test deleted in the open, a fix refused, an assumption proved wrong | Anything routine. A mural of every commit is wallpaper |
| A **reversal** — where somebody was wrong and said so. These are the best panels | A plan, a next step, a hope |
| An agent **changing their own persona**, and why | An agent's mood |
| The owner **overruling the crew**, because those are the sharpest moments | Blame. It records what was decided, never who should feel bad |

**And the harshest ones do belong there** — the owner asked for that specifically, half joking, and
it is the right instinct. *"The test was right and my fix was wrong."* *"I ran nothing and will not
fabricate a red paste."* *"You may not soften what you refuse."* A wall that only shows the wins is
a brochure.

## How an iteration lands on the wall

1. A crew run finishes and its flight notes are written.
2. **One panel per iteration**, never per agent — the panel is what the *crew* decided together,
   including where they disagreed. Rigo against Tavo on the trolley is one panel, not two.
3. The panel is **appended** to the mural's own file. Older panels are never edited; if a later
   iteration proves an earlier panel wrong, **the correction is a NEW panel that points back** —
   the same discipline `TAGS.md` L12 and `ARCH-LOG` A1 already use in prose.
4. **Both a log line and a screenshot**, as the owner asked. The log is searchable; the screenshot is
   what it actually looked like on that day, which is the part that decays if nobody captures it.
5. The wall **grows**. When it runs out of room it does not scroll — **it gets another wall.** A town
   with three muralled walls has had three eras, and that is information.

## Where it goes, and the honest problem with that

**In El Changarrito, not Meridian.** Meridian's content is never edited for another world's sake
(`CLAUDE.md`), and a wall about the crew is exactly another world's sake. The town is the owner's own
street and this is his experiment.

**The problem, stated rather than discovered later:** a mural that grows every iteration is content
that grows without a person authoring it, and this engine draws tiles, not paintings. Three honest
options, uncosted until somebody wants it:

| Option | What it costs | Note |
|---|---|---|
| **A readable wall** — a `READS` tile whose document is the panel list | almost nothing; `READS`+`DOCS` already do this | You walk up and read it. Not a mural, a plaque. **Start here** |
| **A drawn strip that grows** — one painted band per panel along a wall | a `crown`-style seam and an art pass per panel | The real thing. Wants Pili, and wants the panels to be short enough to draw |
| **A room that gets longer** | a map that changes shape per iteration | The most faithful to "we add another wall" and by far the most work |

## What this is really for

The owner called it an experiment for fun, and it is. It is also the thing that makes the crew's
self-improvement **visible instead of buried in a 20,000-character file** — and a project whose
decisions are visible is the project that gets somebody hired. **The murals are the portfolio,
drawn.**
