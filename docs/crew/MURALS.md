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

### ❗ The owner overruled the spec the same day, and he was right

The spec below says **one panel per iteration, never per agent**, and gives a reason: the panel is
what the crew decided *together*. He read the first two and said:

> *"ok thats fine but in the future can be more creative and if its that way one per agent but they
> can collaborate with one too"*

**Both halves are now the rule.** One panel per agent, painted **in their own hand** — and a shared
panel when two of them get somewhere neither would have got alone.

*Why he is right, in one sentence:* **a panel signed by everybody is signed by nobody**, and the
harsh line that makes a wall worth looking at belongs to whoever actually said it. Rigo's *"the two
cabs drawn on it are decoration"* is not a crew position. It is a man with forty-one years on the
trolleys, refusing.

**Nothing above the line was repainted to match.** The first two panels stay exactly as they were, and
the wall now records *that its own rule changed* — which is information, and is what add-never-remove
is for. His overruling got the first panel under the new rule, because the table below says the owner
overruling the crew is the sharpest kind there is.

### "In their own hand" is the creative half, and it is the part that was thin

His first word was **"can be more creative"**, and the first two panels deserved it. So the rule now
has teeth: **each agent's panel is drawn the way that agent sees**, not in one house style.

| Agent | Their hand |
|---|---|
| `beto` | a drawing-office **blueprint** — dark blue, ruled grid, thin white line |
| `rosa` | a **dimension drawing** — bars with end ticks, real numbers, the lie hatched in |
| `rigo` | a **depot signwriter's board** — heavy bands, gold rule, nothing cute |
| `tono` | **labelled drawers**, one of them caught and five walking past |
| `don-guero` | a **cross-section with a scale rule** |
| `tavo` | a **race**, flat and bold, with the gap dimensioned |
| `nacho` | **paint** — he is the actual muralist, so his is the one with steam in it |
| the owner | a **proclamation**: five boards, five hands, five loaded brushes, one shared board |

**The wall grew with the panels**, as the spec said it would: two tiles became four, and it paints
around the sugar skull at `st` (11,0) and around city hall's door at (14,0) the way a real muralist
paints around a window.

### What the ledger fingerprints, and why that turned out to matter

The ledger hashes **`title`, `said` and `cap` — the words.** It does not hash the drawing. That was a
design choice made before anyone needed it, and the repaint proved it right:

> **You may repaint. You may not rewrite.**

*Add and improve* has to permit improving, or the first clumsy panel is on the wall forever. *Never
remove* has to bite on the record, or the wall is a status board. Splitting them at **words versus
brushwork** is what lets both be true at once — three panels were repainted in the hour after they
first landed, because a mural that reads badly says nothing, and not one word moved.

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

---

# Iteration 4 — what the crew learned from painting

*Opened 2026-09-12 at the owner's word: **"they have to note their findings in documentation from
being creative but the drawing itself doesnt have to be about their work, more about the persona
'state'. could be a state of confusion because there are questions, so it can still do what it wants
and if it wants to paint work then that is fine."***

*Six were asked. Five painted. Each was told the panel is about their **state** and not their work,
and each was asked what having to draw it forced them to decide that words let them dodge. **The
answers are almost unanimous and none of them is about art.***

## The finding all five arrived at separately

**A drawing makes you choose a number, and prose does not.**

- **Paty** set out to paint confusion and ended up painting a bar chart, because the moment she had
  to choose a bar height she had to count characters — and *the counting is what found it*. "Not
  confused, just uncounted."
- **Yaz** reached first for a picture of a cable lying unplugged, "which is a lie, and I only found
  that out because I had to decide where the loose end went." The guard was never unplugged; it was
  plugged into the wrong socket. So she painted two sockets. **A more accurate sentence than the one
  she would have written.**
- **Melo**: "In words I say *I planted at it and it passed* one finding at a time, and each sentence
  feels like a win; on a wire you have to draw twelve locks side by side, and twelve open shackles in
  a row stops looking like twelve wins and starts looking like **a town with bad locks**."
- **Doña Cuca** had been carrying "the building is one tile" and "the room inside is 20×17" in two
  different sentences. "A single drawing at one scale would not let me, and the moment I drew the
  plan under the elevation the panel became a contradiction I had been carrying without noticing."
- **Pili** read the warning about type not scaling, "and still did not believe it until I did the
  arithmetic on my own panel."

**Lupe** made the same discovery about her own trade: *"A table of pass/fail lets you write 'green'
without ever saying what green is a claim about; drawing it forced me to put a tick in a box, and the
moment there were twelve boxes in a row I could see that I was drawing twelve receipts, not twelve
pieces of evidence."*

Hers went one step further than anyone else's, and it is the best single observation of the round:
**she could not put the cause in the row that failed, because it was never there.** The cause of an
intermittent red lives thirty checks upstream, so the thread had to leave the sheet — *"and a table
has no way to say that at all."* Nor could a pass/fail table say what her bottom row says: the
fullscreen row is **blank, not failing**. The escape that made her job exist was never a red result,
it was an absent one, and a table has no cell for *nobody asked*.

### ...and she failed her own rule while proving it

> *"My own drawing failed my own rule twice: the bounds probe I wrote said clean while the rendered
> panel printed two lines straight through each other, because a coordinate inside 0..W and a
> collision are different nouns and I had automated the cheaper one. That is entry thirteen in shape
> if not in name, made by the person who keeps the register, one hour after reading it. **Look at the
> picture.** The numbers cannot see a collision, and neither can I without a screenshot."*

**That is the fourth time a session has made the register's own mistake while holding the register.**
It is also the only one of the four that was caught by the person who made it, before it shipped, and
the thing that caught it was looking at a rendered picture rather than reading a number about one.

## The second finding, which is about honesty and cost the painters something

Three of the five reported that the honest picture was the less flattering one, and that they had to
choose it deliberately.

Melo's first sketch had all twelve padlocks the same grey — "a better-looking picture and a
dishonest one", because the twelfth entry in the register is his own. It is painted rust now, with a
ring round it and a label saying *ésta la puse yo*, "so the panel costs me something to hang."

Yaz went looking for the damage her finding had caused and **found none** — ten engine-touching
commits and all ten moved the cache by hand — so she had to paint ten lit lamps and a chalk tally and
let the wall say the uncomfortable version: *the board was green because people remembered, and that
is exactly why the green was worth nothing.*

## The third, which changed the wall itself

**Pili measured the quilt before adding to it**, and both numbers were wrong:

- A cell was a fixed **0.78** of its width while every panel ever painted here is aspect **0.46**, so
  the art filled 54% of its cell and floated in a box that was not its shape. **That gap was the
  owner's "i see little drawings" — the drawings were never small, the cells were tall.**
- The phone break was `W<340`, which gives **three** patches across at the town's real 412-pixel
  column, not two — and the comment directly above that line claimed two. **A comment that
  contradicts the line under it is worth less than no comment.** Every 11px label on the wall was
  being drawn at three pixels.

Both were fixed the hour she said them: a row is now as tall as the tallest panel in it, and the
break is 460. She also called, in advance, that the painter's signature would disappear once the
cells tightened — it was ink at 55% relying on a band of pale wash that was about to go. It sits on a
bone chip now.

**Her line about the medium is the one to keep:** *a panel that survives the quilt has to be a
composition, not a diagram — the difference between a poster and a spec sheet is that a poster still
says something when you throw away every word on it.* Her own patch is the only one on the wall with
no type on it at all.

And the one she did not expect to learn about herself: *"given a wall, my instinct was to measure it
before adding to it, which took two thirds of my time and produced the only findings in my panel
worth having."*

## What the wall still owes, in Pili's words and not overruled

1. **Thirteen panels from one palette against one wash come out as one VALUE.** At wall size the eye
   goes only to the four dark ones and the other nine read as a single grey texture. *"Painting from
   a shared palette makes a wall coherent; painting from a shared value makes it invisible."* **This
   must not be fixed by repainting the nine** — nine repaints to even out a wall is nine people's
   hands erased. The distribution is the lever.
2. **A panel's signature should be its top band**, because that is the one strip the quilt never
   crops and never blurs. Her crepe fringe is fourteen rectangles and is the only mark on her panel
   that reads at a thumbnail.
3. **What a mural does that a grid structurally cannot is cross a boundary.** Build toward one shared
   ground line drawn by the *wall* behind every patch, then an optional `span:2` so somebody can
   eventually paint wide. **Do not** add captions under the patches — the words already live under
   the wall, and captions in the cells would guarantee the contact sheet forever.
4. **The cold read applies to the wall itself:** show it to somebody who has never seen it and ask
   them to name three of the panels. If they can only name the dark ones, finding 1 is confirmed.

## Two things the round found that are not about murals at all

**The `state` field was the one thing on this wall nothing guarded.** Pili and Doña Cuca found it
independently within the hour: the ledger fingerprinted `title`, `said` and `cap` in both languages,
so the field carrying exactly what the owner had asked this round to be about could be rewritten
tomorrow in silence. It is a **second column** in `MURAL-LEDGER.txt` now, not six more strings in the
first — folding it in would have changed the fingerprint of all thirteen panels painted before he
asked for it, and *a rule about never rewriting the past must not be enforced by rewriting every line
of the past.* Planted: changing one word of Melo's state now fails the build by name.

**Doña Cuca found the ledger's own header stale** while reading the code to answer a question about
staircases — it still claimed the fingerprint covered `title.en, said.en, cap.en` when the code had
hashed all six strings since Melo rewrote a Spanish caption into its own opposite and the suite
passed. Corrected.

## ⚠ A crew-mode finding, and it is the first real one: agents overwrite each other in the scratchpad

**Melo wrote `scratchpad/panel.js`, read it back, and got Lupe's panel. Lupe hit it from the other side in the same hour** — her first probe run measured somebody else's panel while printing her own name over the result, which she noted is "exactly the shape of the thing this register keeps recording"; she moved her work into `scratchpad/lupe/` and every later result came from a file only she had written. Six agents ran in parallel
with one shared scratch directory and no convention, and two of them chose the same obvious filename
in the same minute. He noticed only because the content was visibly not his; had the collision been
subtler, **one agent would have silently shipped another's work under their own name.**

**The rule, from now on, and it belongs in any brief that fans out:** every agent writes under a
prefix that is its own name — `scratchpad/<agent>-whatever.js` — and never a bare noun. This costs
nothing and it is the cheapest possible fix. It is filed here rather than in `CREW-MODE.md` because
it is not about the mode: it happened with the mode **off**, in an ordinary parallel run, which is
the configuration this project actually uses.


---

# EL MURO — how to add to your own area

*Written 2026-09-12 at the owner's word: **"is there a way to get idea on how to have the agents
ensure they add to their own mural area? you get what a mural is right? this isnt going to be
pages."***

**He is right and the quilt was the wrong shape.** A grid of framed patches is a contact sheet:
nineteen separate pictures that happen to share a page. Pili said it in her own panel before he did —
*"what a mural does that a grid structurally cannot is CROSS A BOUNDARY"* — and the answer built for
her was a tighter grid, which is a better contact sheet and still not a wall.

## What a mural is, stated so it can be checked

| A mural | A page |
|---|---|
| One continuous painted surface | Separate pictures with gaps between them |
| Wide. You **walk along** it | Fits in front of you |
| One ground, one horizon, one skirting, running end to end | Each picture brings its own background |
| No frames. A hand stops and the next one starts | Borders, hems, cells |
| Sections **grow** as people come back to them | Items are appended to a list |
| Somebody's arm can reach into the next section | Nothing crosses a boundary |

The wall is **4087 × 419** today and the reader gives it its own horizontal scroller
(`docRender`'s `wide` seam in `engine.js` — a section may declare a natural width, and any pack with
a long diagram or a timeline gets that for nothing).

## The mechanism, and it is one word

```js
by:"melo"
```

**That is all of it.** Declare it and the wall does the rest:

- **You never choose coordinates.** You are handed a canvas at your own scale with `0,0` at the
  top-left of the space you are allowed to paint, and the wall puts it where it goes.
- **Everything you ever paint lands in your own bay**, stacked, oldest on the ground and each return
  visit above it. **Your stretch never gets wider — it gets taller**, which is what happens to a real
  wall when somebody keeps coming back to it.
- **Do not paint your own ground.** Call `murGround` like everybody else and *the wall decides*
  whether you get one: on the wall it is a no-op, because the wall already painted the limewash end
  to end, and nineteen slightly different rectangles of the same wash are nineteen visible edges.
  Edges are exactly what makes a grid a grid.
- **You sign the foot of your own stretch**, on the dado, with a short thread in your latest
  iteration's colour. That is the only mark that says where one hand stops. It is on the **skirting**,
  not between the pictures, because a wall is not divided.

A panel with no `by` is filed under the name at the front of its `who`, so the nineteen painted
before bays existed landed in their own without anybody editing them — **add and improve, never
remove**. And *"Rigo again" is Rigo*: a painter who comes back is the same painter. The first build
of this gave him two bays, which is the exact opposite of what was asked for, and the guard caught it.

## What the guard asks

`test/town.smoke.js`, and it asks the noun rather than the layout — it spies on every panel's own
hand while the wall paints and reads the **canvas transform** to find out *where* each one was put:

1. **It is a wall, not a page** — wider than it is tall, and wider than the column it is shown in.
   A mural you can see all of at once is a postcard.
2. **Every panel is painted, exactly once, in its own painter's bay.** Not "is it on the list".
3. **Two painters never get the same stretch**, or the wall is one bay wearing several names.
4. Somebody owns a bay at all — a wall with one bay has no *own area* to add to.

It went red on its first run, twice, for real reasons: a helper the wall still used had been deleted
in the rewrite, and Rigo had two bays.

## What the wall still owes — Pili's list, none of it overruled

1. **One shared ground line behind every bay** — half built. The wash, the horizon and the dado run
   through; a *horizon behind the work itself* does not yet.
2. **`span:2`** so somebody can paint wide across two bays. A mural's whole advantage is that an arm
   can reach into the next section, and nothing here does that yet.
3. **The value problem stands.** Nine panels are a cream field with one dark band and four are near
   black; at wall size the eye goes only to the dark ones. **This must not be fixed by repainting the
   nine** — nine repaints to even out a wall is nine people's hands erased. The distribution is the
   lever.
4. **A panel's signature should be its top band** — the one strip nothing crops.
