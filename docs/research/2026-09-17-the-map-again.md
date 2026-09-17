# Research — the map, second pass · 2026-09-17

> *"maybe research best practices for all of the above … meeting of the minds may take too many
> tokens, plan for one once we get more tokens and for now just do some basic research"*
> — the owner, `docs/ASKS.md`, 2026-09-17

**This is the BASIC pass he asked for, not a sweep.** The full sweep already exists —
`docs/research/2026-09-14-map-and-questionnaires.md`, which catalogued Elden Ring, BotW, Tsushima,
Firewatch, Genshin, TLOU2, WCAG 2.5.8 and ten rules M1–M10. **This file does not repeat it.** It
covers only the four things that sweep did not have a question for, because he had not asked them
yet: an always-interactive map, a destination that persists, floors, and a lit path.

Tags are `docs/SOURCES.md`'s: `[WEB]` cited with a URL · `[CODE]` grep the identifier · `[TRAINING]`
an opinion with no citation · `[OWNER]` his words, in `docs/ASKS.md`.

---

## R1 · Read-only map vs cartography interface — the distinction that carries asks 1 and 2

`[WEB]` Toups, LaLone, Alharthi, Sharma & Webb, **"Making Maps Available for Play: Analyzing the
Design of Game Cartography Interfaces"**, *ACM Transactions on Computer-Human Interaction* 26(5),
2019 — https://dl.acm.org/doi/10.1145/3336144 (record:
https://research.monash.edu/en/publications/making-maps-available-for-play-analyzing-the-design-of-game-carto).

> *"Read-only map interfaces enable players to **consume** maps, which is sufficient for wayfinding,
> while game cartography interfaces enable players to **persistently modify** maps, expanding the
> range of activity to support **planning** and coordination."*

The paper's property set for such an interface is **symbol support, waypoint support, drawing
support, text support, alignment assistance, map construction**; the play activities it names are
*marking repeated events, identifying areas for exploration, tracking remote information,
collaborative planning*.

**Why it matters here.** The owner's two sentences are this distinction word for word: *"we can t do
anything but view it"* is **consume**; *"set a destination to remember where we meant to go"* is
**persistently modify**. Meridian's plan is read-only by this taxonomy and he is asking for the
smallest possible step across the line — **waypoint support, one waypoint.**

**And the same sentence names the slope.** Persistence is what buys **planning**, and a planning
surface with several pins on it is `docs/ARCH-LOG.md` A3's banned list. So the boundary the plan
draws — *one pin, yours, saved; a second pin is a new decision* — is drawn at the exact place the
paper says the character of the interface changes.

> ⚠ **HONEST ABOUT THIS SOURCE.** `dl.acm.org` is **blocked by this environment's egress proxy**
> (`EGRESS_BLOCKED`, tried today). Everything above is **abstract-level**, from the publisher's
> record and search summaries, not from the full text. The 2026-09-14 sweep predicted this exact
> refusal in its own opening paragraph. **No count or percentage from this paper is cited here,
> because none could be read.** If the full text ever opens, the first thing to check is how many
> of the catalogued games persist a player-placed waypoint across sessions.

---

## R2 · Player-placed waypoints — what the field actually does

`[WEB]` Game UI Database's waypoints-and-markers shelf — https://www.gameuidatabase.com/index.php?scrn=163
— and the summaries around the ToCHI paper:

- **Multiple waypoints are uncommon**, and the named reason is not technical: it is that the UI then
  has to present several pieces of wayfinding information at once *and* let the player tell them
  apart. Where games do it, the usual shape is **a second screen** carrying any number of pins.
- **Breath of the Wild's pins** are the standard reference for the multi-pin case: several symbols in
  several colours, *"easy to tell apart"*.
- **Persistence is normal where it exists** — waypoints are held per world/area and survive the
  session.

`[TRAINING]` The reading for Meridian: the *hard* part of multi-pin is disambiguation, and this plan
is 9.39 CSS px per tile on a phone. **One pin is not a compromise here, it is the only pin this
surface can afford**, which is a second and independent reason to hold A3's line.

---

## R3 · Floors — and why the standard control is the wrong one here

`[WEB]` Map UI Patterns, **floor selector** — https://mapuipatterns.com/floor-selector/ ·
Mappedin's stacked/multi-floor view — https://developer.mappedin.com/web-sdk/stacked-maps ·
mapme on multi-floor interactive maps — https://mapme.com/blog/multi-floor-interactive-maps/

The pattern, stated consistently across all three:

- A selector sits **in a corner**, arranged **vertically**, so the control's order matches the
  building's — the correspondence is the whole point.
- Its height is **capped**; roughly **five buttons** before it needs a scroll, so it never becomes a
  list.
- In the stacked view the **active floor renders fully and the others show as semi-transparent
  footprints** — the building's vertical structure stays visible while one floor is live.
- It can be **shown on demand**: hidden until a building is selected, or until the zoom is close
  enough for floor plans to make sense.

`[TRAINING]` **Meridian should not take the control, and should take the last bullet.** A `1 | 2`
selector for the whole city is a control that is wrong on every tile but two — Meridian has exactly
two upstairs worlds in fifteen. But *"shown on demand, once a building is selected"* is precisely the
chooser the plan recommends, and it is the same chooser WCAG-revised rule **M6** already demanded for
a shared anchor. One control, two faults, both already filed.

---

## R4 · The lit path — the decision this repo already signed, and the evidence for it

`[CODE]` `docs/meetings/2026-09-14-el-mapa.md` §7.3 and the comment above `BEARS` in
`engine/engine.js`: *"a DIRECTION, never a lit path — Elden Ring's Guidance of Grace is the shape
of it."*

`[WEB]` **Fable's Glowing Trail** — https://fable.fandom.com/wiki/Glowing_Trail — introduced in
Fable II, a golden trail to the next objective, with the game's own advice being *not to follow it
too closely* so you still find things. The player critique it drew, in the contemporary threads:
the trail *"very clearly denotes 'for story go this way, to fuck around go anywhere else'"*, and one
player's line that names the cost exactly — they *"never got a sense of location in Fable 2 in the
same way as in Ocarina of Time"*, because the golden path just leads you to the next thing
(https://www.neogaf.com/threads/breadcrumb-trail-mechanic-ownz-pop-fable2-dead-space.346874/page-2).

`[WEB]` **Dead Space's line** is the contrast case in the same discussion and the one players
preferred, for one named reason: *it was there only when you wanted it* — held on a button, and
integrated into the world rather than laid over it.

`[WEB]` The Level Design Book's wayfinding chapter — https://book.leveldesignbook.com/process/blockout/wayfinding
— for the general form: guidance that replaces the environment's own legibility costs you the
environment.

`[TRAINING]` **The synthesis, and it is not a compromise.** The two halves of the Dead Space finding
— *on demand* and *short* — are already inside the owner's own sentence: *"when you select"* and
*"a small light path"*. He asked for Dead Space's line, in his words, without having read either.
And moving it **onto the paper** rather than into the street gives up nothing §7.3 was protecting:
a line on a map is what maps are for; a line painted on the ground is what Fable did. The street
keeps the bearing and only the bearing.

---

## R5 · What this pass did NOT do

- **No measured study** on waypoint persistence and player behaviour was reachable. The one source
  that would have counted was blocked (R1).
- **No junta.** He deferred it; its agenda is `docs/plans/2026-09-17-the-map.md` §9, ready to run.
- **The 2026-09-14 sweep is not repeated.** Elden Ring, BotW, Tsushima, Firewatch, Genshin, TLOU2,
  WCAG 2.5.8, M1–M10 — all still stand and none was re-checked today.
- **One thing in that sweep has gone stale and is corrected there**, not here: its finding that the
  shared anchors are *"content faults in `MAPDOT`/`TOWNLBL`, not engine ones"* stopped being true on
  2026-09-17, when `planPlace` began deriving them.
