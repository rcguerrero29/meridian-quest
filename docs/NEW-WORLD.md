# Starting a new world — the template

*Opened 2026-09-05. Owner: "i want to make sure we have a template for any other custom game in
case we want to start a new 'world'/town/city." Everything below was read off the tree at
`mq-v64`, not from memory; where the engine is not yet ready for a second world, it says so.*

A world is **a folder**. The engine never changes. Meridian is the worked example sitting next
to you — copy any file out of `content/meridian/` and edit it.

---

## 0 · Before a single file: the interview

Run `/game-brief` for the person whose world it is. It produces `docs/for-<name>/` — a README
written *to* them, `QUESTIONS.md`, and `AFFECTED.md` (which answer moves which file, and how
big the ask is). `docs/for-aj/` is the reference. **Do not skip this to "just start building":**
every expensive reversal in Meridian's history was a thing nobody had asked for.

Then open a bible and a ledger on day one, empty:
- `docs/<name>/STORY.md` — who the player is, what the town wants from them, endings.
- `docs/<name>/CITY.md` — districts, open parcels, pending ❗ decisions, decision log.
- `docs/ASKS.md` — **every owner ask, quoted verbatim, logged before building.** This is the
  single practice that stopped requirements from falling through here.
- `docs/OWNER.md` — the owner's standing rules. Meridian's are a good default; the ones that
  travel to any story are marked *(travels)* below.

**One question the interview must ask the owner, every time (2026-09-05): "keep Sonny?"** He is
the owner's recurring dog, not the engine's; he appears in the owner's worlds by choice, and a
world for someone else gets its own dog, or none. Ask before declaring a new world's `CRITTERS`.

## 0½ · Does your world END? — ask this before anything else (2026-09-09)

**The owner's decision, signed:** whether a world ends is the pack's choice, and **the template's
default is that it ends.** A pack that says nothing gets a last day, an epilogue and a grade.

    const ENDLESS = true;    // in the pack's config.js — this world never ends

Ask it first, because every later answer depends on it, and because getting it wrong is not a
setting you notice — it is Meridian's goodbye speech printing itself into somebody else's game.
That already happened to El Changarrito before this flag existed.

| | **A world that ENDS** (the default) | **A world that does not** |
|---|---|---|
| Declares | `CHAPTERS`, and nothing else | `ENDLESS = true`, and **no** `CHAPTERS` |
| Has | a last day, an epilogue panel, a grade | none of those |
| Story shape | an arc with a Saturday | people you keep returning to |
| Good for | a course, an engagement, a season | a place you inhabit; a backlog; a comfort world |

**Do not keep the chapter skeleton with the lesson removed.** Nacho's warning, and it is the whole
trap: *a Saturday with nothing to graduate from is a countdown to nothing.* Pick one shape.

**✅ The fault this section used to warn about is FIXED — the warning itself had gone stale, which
is why it is rewritten rather than deleted.** `ENDLESS = true` once froze district progression: the
ending ceremony and the city's growth were the same switch, so an endless pack with two or more
districts sat in district one forever with no error. The two were **split** (`chOpenDue()` at
`engine/engine.js:311` is the city, `chDue()` at `:312` is the ceremony, and `chAdvance()` at `:315`
runs from the Next handler whether or not the world ends). L12's own recommendation — *split, not
rename* — is what shipped.

**This paragraph spent an unknown number of days telling a new world a fixed bug was unfixed, with
two line numbers that no longer pointed at anything.** That is the failure mode this whole file
exists to prevent, and it is recorded rather than quietly corrected: a doc that describes a game we
do not have has now cost this project time three times.

**❗ What IS still true, and it is a different fault.** The *engine* now handles endless-with-districts;
the **shared suite still forbids shipping it.** `test/engine.smoke.js:741` fails any pack that
declares `ENDLESS` and `CHAPTERS` together — *"a world that does not end cannot also have a last
day"* — which was right before the split and is wrong after it, because `CHAPTERS` does double duty:
it is both **the endings** and **the districts**. A world that never ends may still have a second
neighbourhood. Until that assertion is corrected, the table below stands as written, not because the
engine cannot do it but because the gate will not let it out. Registered as L12 in `docs/TAGS.md`.

## 0¾ · How do people SEE your world? — the second question (2026-09-10)

Ask this right after *does your world end?*. Those two decide more downstream than anything else:
one shapes the story, the other shapes everything you will ever draw. **Ask it as a feel question,
never a technical one** — "which cameras do you want" is unanswerable before somebody has seen their
game, and it invites *all of them, why not*.

> **How do you want people to see your world?**
>
> **a — Face to face.** You walk up to someone and see their face. Rooms have walls you look past,
> things stand up and cast shadows. Warmer, and more to draw.
>
> **b — From above.** You see the whole room at once, laid out like a board. Clearer, calmer, less
> to build — and you still see people's faces here, they just do not turn to you.
>
> **c — Both, and let the player pick.** What Meridian does.

Then the follow-up that does the real work:

> **Is there anything in your world you would want somebody to lean in and look at?**

Yes means depth. No means the board. That question gets a true answer out of somebody who has never
thought about cameras, which is the point. **Tell them it can change later — it costs art, not
architecture.**

    const CAMERAS = ["top","front"];   // in the pack's config.js — say nothing and you get all four

A camera a pack does not declare has **no button** and cannot be reached, however it is asked for —
including by a saved choice from before a pack dropped one.

### And what a glyph looks like — one entry, four slots

A glyph has four views. It used to be describable in two, with two holes: the leafy top of a tree
was hardcoded in the engine, and there was nowhere at all to describe the isometric view.

    TILEART["J"] = { top: fn, side: fn, crown: fn, iso: fn }

Fill in the views you care about; the rest come back empty and the renderer decides. **A bare
function still means `top`**, so nothing already written changes. `crown` is what stands *above* the
tile — a tree's canopy, a lamp globe, a market umbrella.

**A layer costs nothing to have.** It costs one drawing wherever you want to differ, and partial is
normal: El Changarrito runs a whole world on **nine drawings** across 45 glyphs, and Meridian has
18 solid glyphs with no side drawing at all.

## 0⅞ · If the world is meant to be CALM, say what replaces the pressure — before you build (2026-09-11)

**This is the third question, and it is the one a new world is most likely to skip**, because
"relaxing" sounds like a description of a mood rather than a specification.

`[WEB]` Cook, Serve, Delicious! 3 shipped a Chill Mode that removed customer impatience and walkouts
entirely. The studio — a decade into the genre — **could find nothing to put in the hole, so it
capped the medal at silver instead.** That is an admission that the score was the content.
(https://www.thexboxhub.com/cook-serve-delicious-3-review/)

**So a world briefed as calm owes an answer to one question before a file is written: *what now
generates interest?* "The player enjoys the freedom" is not an answer.** The five that other games
have shipped are in `docs/GENRE-RULES.md` R1–R5, each with its trap: **comprehension** (the thing is
incomplete and you reconstruct it), **reading a person** (what you make is the reply, and it changes
what they say next), **fit** (a light constraint that yields instead of punishing — the expensive
one, it needs an inventory this engine does not have), **unrushable duration with abundance**, and
**tactility** (spend it last, on two or three objects).

Three rules that travel with this, and each is cheap to honour and expensive to retrofit:

- **`[CODE]` A pack that declares nothing inherits no stakes.** `STK()` defaults to `{mode:"none"}`
  (`engine/engine.js:330`) and `stakesCfg()` reads stakes **per chapter** (`:333`), so *"a calm world
  with exactly one scored thing in one district"* is already a seam. **The calm version is the cheap
  version here, which is unusual — do not spend engine work buying it.**
- **Never build a day budget.** `[WEB]` It is how a timer comes back wearing cozy clothes: it never
  counts down in front of you, it just makes every action cost something scarce. `[CODE]` The engine
  reads the real clock for light only (`drawDaylight`) and nothing in it spends a day. **That is a
  property to preserve, not an omission to fix.**
- **Decide what a mistake MEANS, and write it down.** Eight shipped answers are in
  `docs/research/2026-09-11-cooking-games.md` §3. The two cheapest: *the mistake becomes dialogue you
  would not otherwise have seen*, and *a named, blameless skip* ("Let It Be"). **A mistake is only a
  punishment if it SUBTRACTS.**

## 1 · The folder — nine files, and which ones the engine actually needs

```
content/<name>/
  strings.js     UI            — every word on screen, en + es (or one language)
  quests.en.js   QEN, FQEN     — the quests; FQ* is the pet's side quest
  quests.es.js   QES, FQES     — the mirror; the test suite holds them in lockstep
  npcs.js        NPCE NPCN NPCLOOK WNPC …   — who lives there, what they look like, where they stand
  maps.js        WORLD_DEFS PORTALS …       — the town as rows of characters
  art.js         TILEART TILEART_SIDE TILEMETA DECOART BUILDTPL …  — the pack's own drawings
  config.js      GAMEV MAXXP LEVELS CHAPTERS …  — version, progression, districts
  room.js        INTERVIEW     — the office intake (Meridian-specific; optional)
  docs.js        DOCS READS DOCUI  — the paper the world produces (optional)
```

**Nine is Meridian's number, not the engine's.** A pack may drop files and add its own — El
Changarrito has no `room.js` and adds `record.js` (its `RECORDSRC`, §9). Two rules that only
became visible once a second world existed:

- **Dropping a file means dropping its `<script>` tag too.** `changarrito/index.html:782` still
  loads `content/room.js`, and `changarrito/content/room.js` does not exist: a 404 on every load
  of the town since the folder was made. It is harmless — `INTERVIEW` stays undefined and the
  engine does less, which is the intended off state — but nothing catches it. `test/town.smoke.js`
  aborts every non-`file://` request and only records `pageerror`, and a `<script>` that 404s is
  neither (`test/town.smoke.js:33-36`). **A new world's smoke should assert that every path its
  shell loads exists on disk.** That check does not exist yet in any suite.
- **A file the shell loads before `engine/engine.js` may reference nothing from the engine at load
  time.** The town's `record.js` is loaded last of the content files and still only *defines* an
  object; everything that touches `WORLDS`, `SK()` or `docOpen` runs inside `boot()`, which the
  engine calls (`engine/engine.js:5129`).

**Required — the engine reads these bare and dies without them** (verified: no `typeof` guard):

| global | file | what it is |
|---|---|---|
| `WORLD_DEFS` | maps.js | every room, as rows of glyphs |
| `PORTALS` | maps.js | which glyph in which world leads where |
| `WNPC` | maps.js/npcs.js | which glyph in which world is which person |
| `NPCE` `NPCN` `NPCLOOK` | npcs.js | emoji, names (en/es), and the look of every person |
| `QEN` `QES` `FQEN` `FQES` | quests.*.js | the quests, both languages |
| `UI` | strings.js | every UI string — **about eighty keys, not one line.** `applyLang()` bare-dereferences ~82 of them; a missing key is a crash on the title screen, not a blank label. Copy Meridian's file whole and edit the words (measured 2026-09-10, `docs/GAUGE.md`) |
| `MAXXP` `LEVELS` | config.js | how far the game goes and the level bands |
| `GAMENAME` `GAMEV` | config.js | the name and the version. **Both are required by the shared suite** — `test/engine.smoke.js:64-65` fails the build without either, and `:67` fails if the title screen does not print `GAMEV`. This file listed `GAMEV` as optional until 2026-09-10; it was wrong |

**Optional — guarded by `typeof`, the engine simply does less without them:**
`CAMDEF CAMERAS STAKES GROWTH SEASONS CHAPTERS ENDLESS INTERVIEW CRITTERS EGGS CHATTER CHILL NPCACT TRV
DECOR DECOART READS DOCS DOCUI BUILDTPL BUILDS TILEART TILEART_SIDE TILEMETA MAPCOL MAPDOT
TOWNLBL DOORS DOORLOOK SOLIDX PLACES FLOORS ANIMALS READERLOOK RECORDSRC HUDFACT` — and a template part's `link`
(`{door:[dy,dx], landing:[x,y], exit:[x,y], interior:{rows, people, locs, arrive}}`, #10): the
build stamps the interior as a world named after the lot and keys both doors by place
(`PORTALSAT`), so one template can be stamped on many lots and every door opens — and, since `mq-v65`, **`STOREPFX`** (config.js): the prefix on
every storage key. Optional in the engine, **required in practice for any second world served
from the same origin**, or it loads the first world's save and overwrites it (§8). A world with none of these is a walkable town with people and
quests. Everything else is a layer you add when its answer arrives.

## 2 · The switch — honest state: there is no pack selector

The pack is hardcoded in **three places**, and a new world means touching all three:

1. `index.html` lines ~604–612 — nine `<script src="content/meridian/…">` tags.
2. `sw.js` — `ASSETS` lists the same nine paths, and `CACHE` must equal `GAMEV`
   (the suite enforces the lockstep).
3. `manifest.webmanifest` — `name`, `short_name`, icons, colours.

Today the honest procedure is **copy the repo** (or a branch) and edit those three. A `?pack=`
switch or a build step that stamps them is a real piece of work nobody has asked for; log it
the day two worlds need to live in one deploy.

## 3 · The engine debt a second world will hit — say it now, not in month two

- ~~**Sixty-two hardcoded world ids in `engine/engine.js`.**~~ **Paid 2026-09-06 (`mq-v71`, #25).**
  The engine reads its rooms as ROLES from the pack's `PLACES` table: `home` and `spawn`
  (where a new game and a broken save land), `street` (the map dot follows you there), `park`
  with `parkIn` / `parkDog` / `parkDogHome` / `parkAdopt` (the leash, the dogs), `friends` (the
  worlds whose people a dog may befriend — only worlds you have), `upstairs` (the map's ⇧).
  Pavement colours per world come from `FLOORS`. A pack that declares neither gets Meridian's
  table byte for byte; a pack with its own names declares its own (`changarrito/content/config.js`
  is the worked example). The smoke fails the build if a world id is ever spelled in `engine/`
  again, and `test/engine.smoke.js` checks that every role a pack declares points at a real,
  walkable place. **The full table, every role the engine reads** (owner, 2026-09-07: *"update
  here and meridian and template so we have a good amount of metadata that includes these"*;
  both packs carry it with a note per line, and Meridian's must equal the defaults key for key):

  | role | type | the engine uses it for | default (Meridian) |
  |---|---|---|---|
  | `home` | world id | where a new game and a broken save land | `hq` |
  | `spawn` | `[x,y]` | the tile in `home` you land on — must be walkable | `[10,11]` |
  | `street` | world id | the map's world; the 📍 dot follows you only here | `st` |
  | `park` | world id | the room the leash leads to; the park recap plays when you leave it | `pk` |
  | `parkIn` | `[x,y,dir]` | where you arrive in the park and which way you face | `[2,6,"right"]` |
  | `parkDog` | `[x,y]` | where the dog you brought stands on arrival | `[3,6]` |
  | `parkDogHome` | `[x,y]` | where that dog drifts back to while you play | `[8,6]` |
  | `parkAdopt` | `[[x,y],…]` | free spots an adopted dog may take, tried in order | six spots |
  | `friends` | world ids | the worlds whose people a dog may befriend; a world you do not have is skipped | `st me lc lo` |
  | `upstairs` | world id | the floor the map marks ⇧ | `f2` |

  A role you leave out falls back to the default. Declare all ten anyway: the table is the
  world's metadata, and a reader should not have to open the engine to learn what the engine
  will assume. Everything a pack may declare is listed in §2 (`PLACES FLOORS ANIMALS …`).
- **The name blocklist** in `test/smoke.js` (the portability guard) is Meridian's proper nouns.
  A new world adds its own list, or the guard becomes generic (scan the pack for capitalised
  names and forbid them in `engine/`).
- **The smoke suite is Meridian's**: 33 sections, ~113 lines naming Meridian people and
  places, ~101 hardcoded world ids. Roughly a third of it is *engine* invariants that every
  world wants (portability, the four cameras, stand tiles, the light ladder, the reader's
  geometry, EN/ES lockstep, reachability, discoverability). **Separating those into
  `test/engine.smoke.js` is the first task of a second world**, so the second pack gets a
  suite it didn't have to write.
- `room.js` (the office intake) and `docs.js` (deliverables, templates) are Meridian's
  career layer. Fully removable; drop them and nothing else breaks (`docs/for-aj/AFFECTED.md`).

### 3¾ · A staircase — the template (#4, 2026-09-07)

The engine owns five glyphs for a flight that runs EAST: `⊓` the stair mass (solid, wall-height,
wears the flight in profile — bake per tile), `≡` a tread (walkable), `▲` the head, the way up
(a portal, `mark:"up"`), `▼` the way down (a portal, the deepest tile of a well), `◺` a rail
(solid, knee-high; beside a well it stands on the lip and faces it). A climbing flight's treads
rise toward `▲` and lift whoever stands on them; a well's treads sink toward `▼`, the floor is
cut away over them, and you sink as you go down (`stairRun`, `wellDepth`, `stairLift`). Lay them
as these four rows at the bottom of a 20-wide floor and its upstairs; nothing above them moves:

```
ground  ##########+⊓⊓⊓⊓#####     the door into the room at x10 · the mass x11–14 behind the flight
        #..........≡≡≡▲#####     the landing x10 · treads 11–13 · the head ▲ at x14 → upstairs (14, same row)
        #..................#     a lobby
        ##########E#########     the front door; the street lands you on the landing
upstairs #.........◺◺◺◺.....#    the rail, north side
        #........◺▼≡≡≡.....#     the rail at the head of the well · ▼ → ground (10, same row) · treads · (14,row) is the floor you step off onto
        #.........◺◺◺◺.....#     the rail, south side
        ####################
```

`PORTALS`: ground `"▲":{to:up,x:14,y:R,dir:"left",mark:"up"}`, upstairs `"▼":{to:ground,x:10,y:R,dir:"right"}`,
and the street's door lands on `(10,R)`. Meridian's HQ/f2 and the town's stall/loft carry exactly
this; `test/engine.smoke.js` checks the portals land on walkable tiles in any pack.

### 3⅞ · Seasons — the template (2026-09-08, owner: "we should have in both and template")

A season is ONE block in `SEASONS` in the pack's config. The engine reads its keys and does less without any of
them; nothing else in the engine knows a holiday's name. Two packs carry the same two seasons today (Día de
Muertos with dates, Noche de alebrijes by name only); a third holiday is a third block, placed on the new
world's own maps, no engine change. The keys, all optional:

| Key | What the engine does with it |
|---|---|
| `label:{en,es}`, `from:[m,d]`, `to:[m,d]` | the Settings → Season button; the dates make it automatic ("By the calendar"); no dates = by name only |
| `bridge:[6 hexes, dark first]`, `bridgeStyle:"petals"` | the park's crossing: six bands year-round, a heap of cempasúchil in season (`^` tiles; the trail and the spill are the bridge's) |
| `papel:[hexes]`, `papelBridge:[hexes]` | the cut paper's palette; the marigold cut over the crossing |
| `swags:[{world,from:[x,y],to:[x,y]}]` | a string of cut paper by place — five to nine tiles, a gap between, tied to walls or trees, a pole where it ends on open ground; never over a door |
| `hangs:[{world,x,y,kind:"pinata"}]` | a piñata over open ground |
| `props:[{world,x,y,kind:"calaverita",sill:true,w,foil}]`, `[{world,x,y,kind:"ofrenda"}]` | sugar skulls on a facade's own window (`TILEMETA[g].win`; `w` picks the second window); the ofrenda at the foot of the bridge and on a table (it stands on a solid's top) |
| `bloom:"#hex"` | every planter and the jacarandas bloom |
| `sky:"#hex"` | the north window's dusk |
| `facepaint:true` or `{looks:[5]}` | calavera paint on everyone (the engine's five, or the pack's) |
| `alebrije:{looks:[5]}` | every animal tinted, marked and (the wingless) winged, keeping its silhouette |

Copy the town's `muertos` block from `changarrito/content/config.js`, keep the palettes, and re-place every
`world/x/y` on your maps. A `props` entry with `sill:true` lands on a window of the facade it names: the
engine picks which window (`w` in the entry names one; without it, several candies on one front take
that front's windows in turn) and cuts the candy to two thirds of the pane, so it never covers the glass
(#131). A facade with narrow windows therefore gets a smaller sweet for free — nothing to hand-size. The smoke proves: every base world strung, every calaverita on a window, an ofrenda at
the bridge and on a table, the planters bloom, the bridge two tiles wide, and the ofrenda standing in 3D.

### 3⅚ · The world's height, and what `fov` costs you (2026-09-08)

The world used to be **width × 0.8** in every camera — the 2D tile grid's 5:4. Nobody chose that;
it fell out of ten-by-eight tiles, and on a phone it left the world 266px tall, **31% of the
screen**, with every panel and button hand-placed against it. A 3D camera has no picture to
protect, so when it is running the world takes a **share of the screen** instead (`svh`, so it does
not jump when the address bar slides away) — about 45%. The flat cameras keep their 5:4: they draw
a fixed bitmap, and stretching or letterboxing it would be worse than the crowding.

**The trap:** three.js's `fov` is the **vertical** angle. Make the box taller and narrower and you
get the same up-and-down and **less left-and-right** — measured here, 10.9 tiles of street across
became 7.7, which reads as the camera zooming in. Below the game's own aspect the vertical angle
must widen to hold the width. Above it, leave it alone: a wide screen already gains width.

**The apron.** Past the edge of the map the ground stopped and the background showed through. A
taller frame shows far more of that, so a dim plane in the world's floor colour sits a hair below
the ground and well outside it: the city carries on into the dark rather than ending at a cliff.

### 3¾½ · A bar that floats over a sheet (Rosa, 2026-09-08)

`position:sticky; bottom:0` on a bar at the foot of a scrolling panel does **not** merely sit at the
end of the paper. It hovers over whatever content happens to be in that band, so *which* control is
unreachable depends only on where the reader has scrolled. On a laptop the sheet fits and nothing
happens; on a phone it parked Copy/Download/Close on top of the town's three write buttons, and a
tap went to Copy with no sign anything was wrong.

Reserving space at the foot does not fix it — the overlap moves with the scroll. The panel has to be
a **column**: the content scrolls in its own box (`flex:1; min-height:0; overflow-y:auto` — without
`min-height:0` a flex child refuses to shrink and the column just grows past the screen), and the bar
sits under it in normal flow, where it cannot be on top of anything.

The same shape is the cure for a panel taller than the window generally — it is what §3⅝'s sibling
fix did for the barber's chair (#126). `test/engine.smoke.js` opens every document a pack declares at
390×560 and asks the browser what is on top of each visible button, so a new world gets the guard for
free.

### 3⅔ · What gets out of your way, and how (#140/#149, 2026-09-09)

A third-person camera has to answer one question over and over: *the player is behind that thing —
now what?* This template answers it twice, because a wall and a tree are not the same kind of thing.

**A wall is a plane you are meant to see over.** The nearest wall that hides you drops to a knee-high
stub in its own top colour. That reads as a cutaway. It has been the rule since #65, and the owner
signed it: only the nearest one, never automatically turning the camera.

**A tree, a lamp, a piñata is an object.** Half a tree is not a cutaway, it is a missing tree, and the
room stops making sense. A tall object that hides you turns to glass instead: still there, still in
its place, drawn at `T3GHOST` (0.55) with `depthWrite` off and a render order above the people, so
the crown is painted *over* you at 55% and one pixel holds both of you.

Two things this depends on, both easy to lose:

- **Ask about height, never about kind.** The old rule listed kinds — walls, facades, lintels, doors,
  window pieces — so a tree crown could never be considered no matter how much of you it covered.
  Worse, it read `geometry.parameters.height`, which a billboard does not have. `t3Top(o)` answers
  for a box and for a sprite; use it, and the list of kinds only ever decides *which cure*, not
  *whether*.
- **A see-through pixel must not write depth.** Every prop in 3D is a picture on a card and most of
  that card is empty. Empty pixels that still write depth punch holes in whatever is drawn after
  them — which is people. Every baked billboard carries `alphaTest: T3ALPHA` for that reason. A new
  world that bakes its own billboard and forgets it will lose quest marks near furniture and never
  work out why; `test/engine.smoke.js` fails the build instead.

Materials can be shared between pieces of one glyph, so the glass copy is made once **per piece** and
kept beside the solid one. Edit a material in place and one tree will fog its whole row.

### 3⅝ · How 3D samples a pixel grid — free, and easy to lose (#134, 2026-09-08)

A new world inherits this from `engine/engine3d.js` and never sets it; it is written down because it
is the kind of thing a later change quietly undoes.

The art is a pixel grid. **Nothing may be sampled through a linear filter** — not between texels
(`magFilter`, `minFilter`), not between mip levels. Linear blending is what "blurry" means here; the
owner reported it and a measurement confirmed it (mean absolute Laplacian of a rendered street:
2.26 blurred, 2.72 fixed).

The **mip pyramid stays**. It was never the blur; drop it and the far half of the street crawls as you
walk. `NearestMipmapNearestFilter` plus max anisotropy gets both: the texel grid intact up close, a
smaller level chosen honestly at distance.

Ask for the pyramid **only under WebGL2** (`renderer.capabilities.isWebGL2`). Every texture here is
sized to its world, never to a power of two, and a non-power-of-two texture with mipmaps renders
**black** on a WebGL1 fallback.

A texture repainted every frame (the actor sprites) carries **no** pyramid — rebuilding one per frame
costs more than it buys — but it is still nearest at both ends.

`test/engine.smoke.js` holds all of this for any pack, so a new world gets the guard for free.

### 3½ · Two looks for the reader

`READERLOOK="night"` in a pack's config turns the reader's cream paper purple-dark (the town's
choice, 2026-09-06); leave it out and the paper stays cream (Meridian's). Both shells carry both
looks in CSS; the engine adds one class to the sheet. A new world picks either in one line.

## 4 · The rules that travel to any story *(from `docs/OWNER.md`)*

- **Nothing is ever taken away from the player.** No progress, no city, no save, no access.
- **Never a quest log or a to-do list that finds the player.** Markers in the world, yes.
- **Nothing goes into the world the player cannot use.** A house you cannot enter is scenery
  pretending to be a place — and now the engine's `buildSafe()` is meant to enforce it.
- **The world must be realistic — "not perfect but so if needed it can be upgraded."**
- **Four cameras or it doesn't exist.** Top, front, iso, 3D. A test counts which drawing each
  camera calls.
- **Build the ability, not the thing — unless the thing was asked for.**
- **Every ask is quoted verbatim before building.** Paraphrase is how requirements die.
- **Contradictions are reported, never absorbed.**
- **Every new test assertion is proven to fail against broken code before it is kept.**

## 5 · Build order for a new world, smallest first

| step | what lands | proves |
|---|---|---|
| 1 | `docs/for-<name>/` from `/game-brief`; empty bible, ledger, ASKS | you know what they want, in their words |
| 2 | `content/<name>/` with only the **required** globals: one map, three people, one quest in one language; the three switch files | the engine boots a world that is not Meridian |
| 3 | `test/engine.smoke.js` split out; a new-world smoke with its own name list and invariants | the gate is real before anything is built on it |
| 4 | `node test/tilesheet.js` on any new glyph — the cold read | a stranger can name every tile |
| 5 | the second language, held in lockstep by the test | EN/ES cannot drift |
| 6 | the optional layers, one at a time, each with its answer from the interview: critters, growth, docs, decor, templates | each layer is a decision, not a default |
| 7 | `node test/shots.js --cams` on three spots; look at them | four cameras, actually looked at |
| 8 | a human plays it | the only gate that counts — Meridian's four newest districts have never passed it |

## 6 · The people you bring

`/nacho` (story), `/don-guero` (city), `/pili` (readability) and `/meeting-of-da-minds` are
written for Meridian, but the shape is the template: **one agent per discipline, each reading
the same bible and ledger, each returning ONE recommendation with a file it touched, never
writing code.** A new world either gives them a new bible to read or gets its own trio with
the same rules. The meeting skill's procedure — ground truth first, positions in parallel,
feasibility by someone loyal only to the code, synthesis, learning — is world-agnostic.

## 7 · What is free

The character creator, the wardrobe, day-and-night light, themes with contrast auto-fix, the
trolley, device saves, the offline installable app, QR save transfer, procedural music, name
easter eggs, pettable animals, a dog who follows you through doors, light props you can kick,
the stapled-paper reader, build templates with seeded variation, and the admin tools for
placing townsfolk by hand. None of it needs a line written for a second world.

## 8 · What 2026-09-05 added to this template *(El Changarrito, the first world built from it)*

The backlog town — `docs/story/el-changarrito.md` — is the first second world, and building
its foundations changed four answers above. A world started after this date inherits them.

- **`STOREPFX` is the first line of a new `config.js`.** `mq-v65` put every storage key the
  engine touches (51 sites) behind `SK()`. Meridian's prefix is `"mq"`; a second world
  declares its own (`"ch"` for the town) or, on the same origin, it opens the first world's
  hero and then overwrites that save. GitHub Pages serves every project site on an account
  from **one origin**; `localStorage` is per-origin. The guarantee test fails a literal key.
- **The switch is a folder.** §2 said there is no pack selector; the chosen answer is a
  second `index.html` in its own folder (`changarrito/`) that loads `../engine/` and its own
  `content/`. One CI covers both, and the first world's index is untouched.

  **⚠️ "Nothing is copied" was written of the engine and the content, and it is false of the
  shell.** Corrected 2026-09-10 by reading both files. `changarrito/index.html` is 791 lines
  against the public shell's 803, and roughly 770 of them are the same CSS and markup —
  including the comments that record *why* each rule is there (Rosa's findings, #126, #127, #130
  appear verbatim in both). The differences are real but small: the CSP allows `api.github.com`
  (`changarrito/index.html:10`), there is no manifest and no service worker (`:788`), the title
  and script paths change, and the town adds `.dred` / `#toast.crit` for the red category (#8).

  **The only guard on those 770 lines is a line count**, one-directional:
  `test/town.smoke.js:23` fails when the town's index is more than 20 lines *shorter* than the
  public one. A CSS rule fixed in one shell and not the other changes no line count and is not
  detected. This is the exact rot `docs/GAUGE.md:53-58` describes, and the gauge pack chose the
  other answer for the same reason: **generate the shell from `index.html` and assert that every
  edit actually matched**, because "a `String.replace` that stops matching returns the input
  unchanged and would otherwise print success while testing the wrong thing." A third world
  should generate its shell. The town predates that decision and has not been converted;
  converting it is a real piece of work, not a documentation fix.
- **A service worker is per world, and optional.** A world that ships to players carries its
  own `sw.js` with its own `CACHE` name and its own `PFX` — the worker now deletes only caches
  it owns, serves only its own origin, and never stores a non-ok response. A world that runs
  only on `localhost` for one person **registers no worker at all**.
- **The public build's guarantee is a test, and it is the first world's.** `test/smoke.js`
  asserts the tracked shell of the *public* game mentions no API host or token, reads no URL
  query, keeps a pinned CSP, and that no URL flag turns admin on. A second world that widens
  its own CSP (to read GitHub, say) does it in **its** index, never the public one.
- **Three parts, not nine steps, when the world is tooling.** Foundations that ship to the
  first world behaviour-identical → the world itself, read-only → the world talks back. Each
  part is a PR that ends green. The nine steps of §5 still apply inside part two.
- **The rule of weight travels.** If the world reads a ledger (issues, a task list), a label
  picks the body: a named person carries a real task, townsfolk a small one, a note on a board
  the rest, and animals nothing. `el-changarrito.md` §1.
- **What a second world must never do to the first** — five rules, `el-changarrito.md` §7½:
  the first world's purpose is fixed; every engine change is behaviour-identical for it and
  proven the same day; its content is never edited for another world's sake; its public build
  knows nothing about a personal one; sittings are ranked by the owner, not by the new world.
- **Two reviews before a word of code.** An engineering feasibility pass and a threat model,
  both against the real code with file:line, both adversarial to the plan. They found the
  storage collision, the cache poisoning and the hosting mistake the plan had written in. Run
  them for any world that touches a network.

---

## 9 · A world that is not a story — the five seams the town runs on *(added 2026-09-10)*

*Written after an audit that did the exercise the owner asked for: pretend El Changarrito does not
exist and rebuild it from this file alone. Everything in §0–§8 was reachable. **Nothing below was.**
Every one of these is a real, guarded, tested engine seam that a stranger following this template
could only have found by reading `engine/engine.js`.*

**This is the shape of the gap.** §0–§8 describe a *story* world: districts, quests, chapters,
seasons, cameras. El Changarrito is not a story, it is **a live view of something outside the game**,
and the engine already has seams for exactly that — they were simply never written down here.

### 9.1 · `RECORDSRC` — where a world's people come from something that is not a map

> `engine/engine.js:376-383`. A pack may declare `RECORDSRC = {enabled, boot()}`. The engine calls
> `boot()` **once**, after `NET`, and never again (`engine.js:5129`, inside a `try`). What the record
> holds and where it comes from is entirely the pack's business — a same-origin file, or an API the
> **pack's own** `index.html` allows in its CSP. The public build's CSP allows neither, by test.

This is the whole of El Changarrito: `changarrito/content/record.js:9` declares it, and everything
else in that 649-line file hangs off `boot()`. Without this seam in the template, a second world that
wants to show live data has no idea the engine will hand it a starting gun at the right moment, and
would try to run at script-load time — before `WORLDS` exists.

**The ask this seam answers is not in §0's interview.** Add two questions to it:
*"Does your world show something that changes when you are not playing?"* and, if yes,
*"Can the player change it back?"* The first is `RECORDSRC`; the second is a token, a CSP entry, and
the two reviews above.

### 9.2 · `HUDFACT` — a world with no score

> `engine/engine.js:393-411`. A pack may declare `HUDFACT()`, a function returning a string. When it
> exists, the strip at the door prints that string instead of `NAME · RANK` and `N XP`, the XP bar is
> hidden (`:405`, and `:3468` / `:5102` hide the wrapper at boot and after a chapter), and the chip in
> the corner of the world carries the same fact. Return `""` and the strip stays **empty** rather than
> lying.

The reasoning is the part worth keeping, and it lives only in a code comment today
(`engine.js:393-400`, and again at `changarrito/content/record.js:630-637`): *whatever XP counts, it
teaches* — and in a backlog neither filing more nor closing more is reliably good, while a permanent
`0 XP` is a verdict delivered at the door every session. **The rule: a fact must be able to go DOWN as
well as up, and neither direction is praised.** The town's is `HUDFACT()` at `record.js:638-648` —
*"14 waiting · 3 moved"*.

**Pair this with §0½.** A world that answers *"it does not end"* almost certainly also wants
`HUDFACT`, because the same argument applies: a place you inhabit does not grade you. §0½ never says
so, and the town shipped Meridian's rank ladder — Rookie to AI LEGEND — on its front door until
somebody looked (GitHub #154).

### 9.3 · The reader is an application surface, not a sheet of paper

§1 gives `DOCS READS DOCUI` one line — *"the paper the world produces (optional)"*. That is true of
Meridian and badly incomplete. The reader renders **twelve** block kinds
(`h p note red blank kv t q btn sel form docs`, `engine.js:2919-2979`), and four of them are live:

| block | what it is | engine |
|---|---|---|
| `{btn, run}` | a button. The reader never learns what it does; content does | `engine.js:2939-2943` |
| `{sel, opts, value, run}` | a dropdown, options optionally grouped by `o.g` | `:2944-2953` |
| `{form:{fields, submit, cancel, onCancel, run, noFocus}}` | a whole form — `text`, `password`, `area`, `select`, `checks` — every field on one screen beside the paperwork. The reader collects the values and hands them to `run(v)` | `:2954-2975` |
| `{red}` | a line in red, for what is critical | `:2923` |

And the two that make it composable:

- **A document may be an object, not an id.** `docDef()` returns `id` itself when `id` is an object
  (`engine.js:2883`), so `docOpen(self.commentDoc(i))` opens a sheet that was built one line earlier
  and never registered in `DOCS`. That is how the town gets a comment box per person
  (`record.js:434-436`).
- **`build()` runs on every open** (`engine.js:2884-2885`), so a document is *live*: the town's
  people cycle through three lines because `doc(i).build()` advances a counter each time
  (`record.js:503-506`).

**Why this matters more than it looks:** `docMarkdown()` (`engine.js:2887`) exports `h p note blank
kv t q docs` and deliberately **not** `btn sel form red`. So the Copy/Download buttons on any sheet
silently drop every interactive part. That is correct — a button is not text — but a new world that
promises "copy this document" has to know its form will not be in the copy.

### 9.4 · People who arrive and leave while the game is running

> `addChill(c)` → `engine.js:154`, returns a key or `null`. `removeChill(key)` → `:166`, *"the
> inverse `addChill` never had"*. §1 lists `CHILL` as an optional global — a **static** list read once
> at `:172` — and never says the pair exists.

Four rules the town paid for, none of them in this file until now:

1. **A placed person may carry a `doc`, and then behaves differently**: they wear the mark, stand
   still instead of wandering, and open the document when talked to (`engine.js:376-382`, and
   `changarrito/content/record.js:616-618` sets `n.doc`, `n.tier`, `n.issue`).
2. **Placing a person writes `"N"` into the grid, and removing them must give the tile back.** Get
   this wrong and the map grows permanent invisible walls. `test/town.smoke.js:76` walks every tile of
   every world and fails on any `"N"` with nobody on it — **that check belongs in the shared suite,
   not the town's**, because it is a property of `addChill`/`removeChill` and not of a backlog.
3. **Anything you place at runtime can wall the player in, and there is a function that says so.**
   `auditReach(grown)` (`engine.js:219`) returns the places you can no longer reach; the engine runs
   it once at boot (`:252`) and the town runs it again after every placement
   (`record.js:624`). A world that adds people, props or buildings after boot **must** call it.
4. **Check the tile first.** `record.js:616` refuses to place on a solid or on an existing `"N"`.
   `addChill` does not do this for you.

### 9.5 · Decor is baked in 3D — changing content data does nothing until you say so

The engine draws `DECOR` entries through `DECODRAW`; `sign` prints `d.text`, **capped at four
characters** (`engine.js:1480-1484`). A pack may mutate `d.text` at runtime — the town's signs count
the open issues of each house (`record.js:182-186`).

**The trap, and it is a whole class of bug:** the 3D scene bakes its decor at build time, so the
mutation is invisible until `t3Invalidate()` is called. The town calls it, guarded, and only when
something actually changed (`record.js:184-186`, and again in `goBeside` at `:149`). A new world that
animates any content data and forgets this will see it work in three cameras and not in the fourth,
which reads as "3D is broken" rather than "the scene is stale".

### 9.6 · What this audit could NOT settle

Named rather than smoothed over, per the rule at the top of `docs/OPEN.md`:

- **Whether these five should stay pack seams or become template defaults.** `HUDFACT` in particular
  looks like it wants to be the default for `ENDLESS` worlds. That is a design decision nobody has
  made; it is not written down here as if it had been.
- **Whether the town's shell should be generated like the gauge's** (§8). Costed at "a real piece of
  work", not costed in hours.
- **Whether a pack that stores a credential needs an engine rule.** The town keeps a GitHub token
  under `SK("token")` (`record.js:338`), and it is kept out of the save by construction — `save()`
  enumerates fixed fields (`engine.js:413`) and the QR pass carries `loadSave()` only (`:4341`). The
  *test* for it exists but is the town's own (`test/town.smoke.js:329`, *"the token leaked into the
  save"*). Nothing in the engine or the shared suite would stop a third world getting it wrong.
