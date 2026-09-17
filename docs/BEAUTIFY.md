# What the city looks like, and what to fix first

*Opened 2026-09-09 at the owner's word: "use the different agents and perspectives of the personas to
test the game so they can catch objects we can beautify and log all the ones we can render better
instead of cubed images."*

Two people made this, in parallel, deliberately not talking to each other. **Pili** audited the code
— every glyph, what it renders as, what it should be. **Chava** played the game, walked all fifteen
worlds at all four camera stops, and never opened a source file. His evidence is 65 screenshots; hers
is `file:line`. Where they agree, act. Where only he sees it, it is still real — he is the only one
who looked at it the way a player does.

Every test run already prints the raw count, and nobody has ever acted on it:

    Still flat in 3D (#39): 3×1 4×1 5×1 7×3 9×1 A×4 C×4 H×8 I×4 J×12 P×20 W×2 X×5 Y×2

**That list is wrong in both directions.** Some of those are correctly flat. Some things that are
NOT on it are badly wrong. This file is the corrected version.

---

## The lever nobody had written down

```js
const t3Boxy=(g,m)=>!!(m.box||m.kind==="furniture"||m.kind==="appliance") && !!TILESIDE[g];
```
`engine/engine3d.js:259` (2026-09-14; this line said `:241`)

**A glyph becomes a real box the moment a side drawing exists.** Six of the twelve real offenders
are already tagged correctly and are missing exactly one drawing each in `content/meridian/art.js`.
That is **free art** — no engine change, no `GAMEV` bump, no `sw.js` bump, no risk.

The counterpart, which decides everything else: **`kind` has never set walkability** (`docs/TAGS.md`
L14). `SOLID`/`SOLIDX` does. The renderer knows exactly five shapes — box, billboard panel, trunk +
canopy, freestanding box, floor paint — and everything else falls through to a cardboard cutout.

---

## The register — ranked by what it costs the player to look at

| glyph | what it is | renders as today | should be | art or engine | cost |
|---|---|---|---|---|---|
| **rug** | a floor rug, six rooms | four blank lavender squares, no thickness, no border, visible seam | a rug: border, pattern, one piece | **art** | one drawing |
| **the ❗** | the quest marker, ~20 people | a solid red bar through the top of the skull | anything that is not a spike | **art** | one drawing |
| **H ×8** | produce crate, El Mercado | cutout, no side drawing | box — the most box-shaped object in the game | **art** | one drawing |
| **I ×4** | counter + scale, El Mercado | cutout, four identical pictures in a row | box; the run reads as one counter | **art** | one drawing |
| **`g` grass** | grass tufts, every outdoor world | the letter "Λ" printed flat on the pavement | standing tufts with height, or honest ground cover | **art** | one drawing |
| **bushes** | park, street, Calle Dos, barbershop | a flat brown oval with dots — reads as a cowpat | a shrub with volume | **art** | one drawing |
| **X ×5** | construction sign | cutout, **drawn with the emoji 🚧** (`engine.js:730`) | a world-fixed panel on a post; and no emoji | **art + retag** (`kind:"fence"` gives the panel path) | data + redraw |
| **S shelf** | six worlds, sometimes four in a row | a brown box with a Rubik's-cube grid on the front | produce in a market, books in a library | **art** | one drawing, maybe two |
| **the tables** | La Cocina ×8, bakery, salon, casa | black top, checkered skirt, big red-and-white disc — **a pizza** | a table | **art** | one drawing |
| **A ×4** | drafting table, La Obra | cutout | box (already `kind:"furniture"`) | **art** | one drawing |
| **W ×2** | fridge | cutout | box (already `kind:"appliance"`) | **art** | one drawing |
| **P ×20** | potted plant | cutout — **correct shape** — but all 20 pixel-identical (`engine.js:785` ignores `x,y`) | still a cutout; vary by tile parity, which the baker already supports | **art** | half a drawing |
| **9 ×1** | doghouse | cutout | box + pitched lid | **art** | one drawing |
| **F fences** | site hoarding, st and ex | disconnected panels at different heights, some crossing at 90° in mid-air | one continuous hoarding | **engine** | `engine3d.js:415–431` |
| **the bridge** | the park canal | a stack of striped beach towels, split down the middle, touching neither bank | a bridge | **engine** | `engine3d.js:334–368` |
| **Y ×2** | trolley stop | walkable cutout (`engine3d.js:293`) | pole billboard + a real bench box | **engine** | see below |
| **3 4 5** | agility gear | walkable cutouts | hurdle and poles fine; the tunnel wants an arch | **engine**, low value | — |

### Correctly flat — do NOT "fix" these

**P** (round foliage), **C** the cones (a cone is a cone from any angle, and it has a contact
shadow), **J**'s canopy (foliage on a real trunk), **7** the car lift (two thin posts), **3** and
**5** (a bar between posts; five thin poles). Boxing any of these gives you a cardboard cube with
leaves printed on it. **Their presence on the #39 list is the list being wrong, not the art.**

### Marks that mean something — and the one shape that is already spoken for

*Pili, 2026-09-13; re-verified against the code 2026-09-14.*

**A diagonal bar across a coloured field reads as "crossed out" in this project specifically.** The
owner said it of the first striped alebrije and it cost that pass a re-cut (`engine/engine.js`, grep
`owner called it "crossed out"`). The town's claim sash is exactly that shape — a white diagonal
stroked corner to corner across the shirt (`changarrito/content/record.js`, grep `SHIRT_PATTERNS.taken`)
— and it survives only because the hard hat beside it changes the **outline** (grep `lk.hat="hard"`,
drawn at `engine/engine.js`, grep `lk.hat==="hard"`). **That rescue is a claim about meaning and it has
never been cold-read by anybody who had not already been told what it means.**

At the size these games are played, a body is about fourteen pixels across and **the outline is the
only thing that can carry a new meaning**. A new mark goes to the head, the hands or the height —
never to the shirt. And the price of this one is written into the code that sets it: the hard hat
covers the hair, so two claimed people are harder to tell apart from **each other**, which is the
owner's own 2026-09-03 complaint accepted on purpose, because his question is *which are taken*, not
*which is #41*.

### The reverse failure — boxes that should not be

`content/meridian/art.js:165` — `const TILEART_SIDE=Object.assign({},TILE_PROPS);` — a blanket copy
that hands a side drawing to **every** prop at once. Combined with `t3Boxy`, it silently boxed two
things nobody chose to box:

- **`ʘ` Doña Meche's tamal cart** — a round pot on two wheels, now a solid cube.
- **`⊔` the guest chair** — legs, a gap under the seat, a back. **A chair is air.** Now a block.

Both also wear their front on all four faces (`engine3d.js:253` uses one `side` material six times),
so you see the cart's ladle from behind it.

---

## What Chava found that nobody asked about

He is the only one who looked at the whole game as a person. These are not on anybody's list:

- **The Front 2.5D camera does not draw walls.** La Cocina in Front camera has no room at all — a tan
  checkerboard past every screen edge with furniture floating on it. The 3D camera draws clear walls
  in the same room. And the street pavement is **grey in 3D and brown in Front** — same tile, two
  colours.
- **The Isometric camera loses about 90% of the art.** Trees become a brown box with three green
  circles glued on the top face. The bridge, the playground props and the doghouse **disappear
  entirely**. A player who taps ◆ out of curiosity gets a poorer city than the one they left.
- **Held items float beside people's heads, unattached** — a banana by a baker's shoulder, an orange
  flame beside a woman that makes her look like she is on fire — and they **pop in and out between
  frames**.
- **A solid black triangle in the middle of the HQ reception desk.** Hard-edged, unshaded. Looks more
  like a missing texture than anything else in the game.
- **The MQT sign reads "MOT"** — the first letter is clipped by the sign edge. Both stops.
- **Every outdoor world has a pure black sky**, including on the Fairy theme where everything else
  goes lavender. `ex` reads as a slab floating in a void.
- **Every outdoor object stands on its own floating pale slab**, and neighbouring tiles are sometimes
  visibly lower, so the pavement has square holes in it.
- **The yellow door arrow draws on top of the player's face**, and in the barbershop it floats over
  blank wall with no door under it.
- **The kitchen counters have black holes in them** (presumably sinks) and are broken into islands
  with gaps, so La Cocina's kitchen is five office desks in a line.
- **HQ Floor 2 is an empty beige plain** — at one camera stop you can see nothing but floor.

### And the interaction faults, which are not art at all

- **Three copies of the same sentence on screen at boot** — a ticker box with two lines and a black
  speech bubble repeating the second. Together they cover about half the play area on a phone, and
  neither goes away on its own.
- **Walking into a wall gets a joke. Walking up to a person and pressing Talk gets silence.** He
  stood beside a quest-giver, pressed Enter, and got no dialogue, no "nobody there", no nudge. The
  person was diagonal, which is invisible in 3D.
- **Four fast taps on ↻ looks exactly like a dead button** — four taps is a full circle and the
  eased turn is slower than the tapping.

---

## Where the city looks GOOD

Said plainly, because a report that is all complaints is not a report, and because **these are what
everything else should be built to sit next to**:

- **The people.** The chunky bodies, the hair, the skin tones, the shirts, the soft drop shadow that
  grounds them. The best-drawn thing in the game and the thing you look at most.
- **The animals** — the office cat, the tabby, the corgi on the site, the chicken in the mercado.
  Small, instantly readable, and they move between frames. This is what makes the world feel alive.
- **The trees in 3D.** Three overlapping green blobs with jacaranda dots on a real trunk. Reads at
  every angle, and the blossoms animate. Best prop in the game.
- **The fridge and stove in La Cocina.** A proper white fridge with a handle; a black range with four
  burners and a control strip. **Exactly what a good prop looks like — copy these.**
- **HQ's cubicle maze**, the stairs, the doghouse, the robot in the caseta, the water shimmer, and
  the fact that the Fairy theme really does repaint the world.

---

## The build order

1. **The rug.** Six rooms, dead centre of the first room of the game, and it reads as a texture that
   failed to load. One drawing.
2. **The crates and the counter.** Twelve objects in the room the player lives in for a whole
   district. Two drawings, no engine risk. *(Pili's own first pick.)*
3. **The quest marker.** It is on twenty people and it is how you know where to go, so you look at it
   constantly, and it is a red spike through the head.
4. **The grass, the bushes, the tables, the shelves.** All art, all repeated across many worlds.
5. **The site fence.** Engine. It is the worst-looking single structure in the city.
6. **The bridge.** Engine, and the money shot — the one frame that shows nine problems at once.

**Everything in 1–4 is art alone.** No engine change, no version bump. The whole top of this list
can ship as content.

**The rule under all of it, from Chava, who did not know he was restating Pili:** *the game paints
things on the ground instead of building them.* The rug, the grass, the bushes, the power cords and
the pale slabs are one bug wearing five hats.

---

## Contradictions found, reported rather than absorbed

1. **`docs/3D-LOG.md`** promises "nothing that stands is a flat picture pretending otherwise" and
   `test/engine.smoke.js:416` promises the known-flat list "only ever shrinks." **For `3 4 5 C Y`
   that is impossible today** — `engine3d.js:293` builds a sprite for every `stand:true` tile
   *before* `kind` or `box` is read, so no pack-side flag can reach them. The test enforces a rule
   against tiles the engine gives no path to.
2. **`docs/IDEAS.md` §15.11** lists H, I, A, W, 9, X as "still drawn from above and stood up, and
   judged acceptable." That judgment is dated 2026-09-02; **boxes did not exist until 2026-09-03.**
   The doc reads as settled and is stale.
3. **`docs/TAGS.md` L7/L14** says `site`, `nature`, `gear`, `transit`, `prop` are inert labels;
   `test/engine.smoke.js:415` treats them as shape classes. That test is the only place those seven
   dead kinds still mean anything.

---

## The surface carries the screen — 2026-09-15

*Added after a day spent making a drawing better inside a page that was never designed. The owner's
last word on it was **"it still looks like a bad attempt at UI"**, and he was right about every
render before that one too.*

**The lesson, in one line:** *when the page is designed, the illustration stops having to be excellent
— and when the page is not designed, no illustration can rescue it.*

What actually changed between "a bad attempt at UI" and a page worth showing, in order of how much
each was worth:

1. **Typography, not art.** The old pages used the reader's monospace field labels — `Drawn`,
   `How it went` — which makes any content read as a settings panel no matter what is above it. Two
   real faces and a type scale did more for the page than every fix to the food put together.
2. **Set the content the way its own world sets it.** A recipe gets dot leaders and right-aligned
   quantities in tabular figures, because that is how a recipe card is set. A key/value table is how a
   *form* is set. Same data, different claim about what the thing is.
3. **Honour the mode the pack chose.** Every mock that day was on cream paper; the owner had chosen
   **night** three days earlier and nobody had noticed. **Check the pack's own settled decisions before
   drawing anything — the register is faster than the argument.**
4. **Put the mechanic on the page.** The designed version made the game's one decision a control you
   press instead of a paragraph describing it. That single change is most of the difference between a
   document about a game and a piece of a game.
5. **Only then, the art.** It was the same drawing.

**The trap, named so it is not walked into again:** rendering a mock through the game's own document
reader is the right way to answer *"can the engine draw this?"* and **the wrong way to answer
*"would anybody want to open this?"*** The reader is a paperwork surface; it will make anything look
like paperwork, which is exactly its job in Meridian and exactly the wrong frame for judging a design.
The architectural half of this is `docs/ARCH-LOG.md` **A15**: a pack ships nine JavaScript files and no
CSS, so today it *cannot* design its own paper even if it wants to.

**And the part that is about how we work.** Three specialist agents measured that art, cold-read it and
corrected it — all correctly, all usefully — and **not one said the surface was a form, because every
brief pointed at the picture.** More eyes on the wrong question return more answers to the wrong
question. When something "looks off" and successive fixes do not fix it, **stop improving the thing
inside the frame and ask what the frame is claiming to be.**

## The process is the shape — 2026-09-16

*Added after four attempts at a slice of gimbap, three of which corrected the object and none of
which was the problem. The owner: "think about how it is made too right? ... thats why rarely are
they displayed like you did or if it close it is in a pile and they have more congruence."*

**Six slices of one roll are siblings, not strangers.** The fillings were laid in a line on a flat
sheet of nori, rolled once, and cut — so the cross-section is identical the whole length of the
cylinder. Six slices differ only in where the knife fell and how they landed. The drawing had six
independently randomised arrangements, which is a picture of six different rolls with one slice
each, and no correction to the filling was ever going to fix it.

**The rule, which is general:** *variation enters at the step it actually entered, and nowhere
earlier.* Anything decided before the copies were separated is shared by all of them; anything after
is what differs. Backwards, and the result reads as **generated** — and nobody can say why, because
every individual object is correct.

**And things come to rest against each other.** A cut cylinder standing on its face topples into its
neighbour: slices shingle, lean, pile and touch. Evenly spaced, upright, not touching, is the
signature of a loop that ran `n` times. If nothing is holding an arrangement in place, it is a
diagram.

Written up as the `how-its-made` skill, and carried by `pili` and `chema` — it is step **0** of
Chema's four, ahead of measuring, because measuring the object cannot find this class of fault.

## When a thing can't be fixed, the material is the thing that's wrong — 2026-09-16

*Added after the owner looked at the stairs through the office divider and said: "looks abstract
artish but clearly fucked up stairs — want to spicy it up and make it a glass divider."*

The stairs were not broken. The engine's rail is **deliberately see-through** — it draws a rail and
not a wall so a player can see the floor beyond and understand there is a way up there. What reached
the screen was a solid balustrade with the flight showing through it, which is not a rendering bug,
it is **a solid material drawn with a transparent rule**. Every fix available inside "make the
stairs read correctly" was a fight with the engine: close the rail and the far floor disappears, keep
it open and the timber looks broken.

**The rule: when the drawing contradicts itself, check whether the material is claiming something
the code is not doing.** Then change the material rather than the code. Glass is the material whose
real-world behaviour *is* the engine's rule — you are supposed to see through a glass divider, so the
transparency stops being a fault and becomes the point, and the same pixels now read as an office
that has one. Nothing in `engine/` moved; `◺` is redrawn in `content/meridian/art.js`, so the
engine's timber rail and every other world are exactly as they were.

**Why it belongs in this file and not in a bug list:** it is the cheapest beautify there is. No new
system, no engine seam, no risk to a second world — one pack tile, and a fault becomes a feature. Ask
it before costing the fix: *is there a material for which this behaviour is correct?*

## Occlusion can be right and the drawing still wrong — 2026-09-16

*Same round. The owner: "i see building line overlapping with the exclamation mark animation."*

**Measured before touching anything**, which is the only reason the fix was one line instead of a
layering rewrite: the person spans y=4..36 of the sprite, the mark spans y=−7..8, so the mark
overlaps the head by four pixels and is drawn over it — **correct**. The storefront line behind it is
at the same luma as the mark's fill. The fault was never depth; it was **contrast**, and every
plausible fix aimed at draw order would have been wrong and expensive.

So the mark got a pale halo outside its dark keyline — it now separates from whatever is behind it
without moving in z at all. **When something "overlaps", measure the overlap before you believe the
word.** Half the time the geometry is right and what failed is separation.

## Two coordinate systems, one field — 2026-09-16

*The owner, from play: "im shown the other street map on calle 2." He was standing on Calle Dos and
the plan drew Calle Principal, with a pin in the corner captioned CALLE DOS — **the caption knew
where he was while the picture showed somewhere else.***

The cause was one word — `WORLDS[PL.street]` — and the fix is a seam, `TOWNPLAN`. That part is
ordinary. **The part worth writing down is what the fix nearly broke.**

A mark on the plan had one pair of numbers doing two unrelated jobs: *where the thing is in its
world* (which `destAim()` compares against the player's position and hands to the street arrow) and
*where it is drawn on the paper*. Those were the same numbers **only because there was one panel at
0,0** — an accident of there being one street. Add a second panel at `oy:17` and they silently
diverge: the plan looks perfect, every mark is in the right place, and the arrow in the street sends
you seventeen tiles north of where you asked to go.

**The rule: when two meanings share a field because their values happen to be equal, they are one
bug away from being two meanings sharing a wrong field.** Split them *before* the day they differ,
not after — the day they differ, nothing is red and nothing looks wrong.

**And the guard for it had the same fault in miniature, twice.** Its first draft found no mark on
Calle Dos and reported the offset arithmetic as *"untested this run"* — honest, and still a silent
zero, because on Meridian that would have been true on every CI run forever (nobody on Calle Dos
ever carries a quest; the mark that lands there is the bakery's, three chapters in). It walks the
chapters to a real state now. Its second draft checked the mark data and never asked what the
PAINTER did with it, so a plant that drew at the world position instead of the paper position piled
every mark onto the first street with every assertion still green. It stubs `drawMark` and reads
back the coordinates the call site actually used.

## Nothing looks down — 2026-09-16

*The owner, about the loft's stairwell, twice. The second time was a correction to me, not to the
code: "i still think the stair railing screenshot i sent is wrong, even if it were a seethrough wall
thats not right. i dont like when you are so dismissive."*

**He was right, and the first answer was me defending the engine.** I had told him the see-through
rail was deliberate and the stairs were fine. They were not fine, and the reason took three wrong
fixes to find.

**What it actually was.** The 3D scene carries an *apron*: a dark plane laid past the edge of the map
so the city carries on into the dark instead of ending at a cliff. Its comment says it sits "a hair
below the ground and **well outside it**". Its geometry was `w.W*3+60` by `w.H*3+60`, **centred on the
world**, at `y = -0.05` — a sheet, not a frame. So it was five hundredths of a tile under the floor
of the entire map, and **every sunken thing in either game had been under a dark lid since the day it
was added.** The loft's stairwell treads sit at −0.16 to −0.64. A player looking down the stairs saw a
black rectangle, which is exactly the phrase he used: *clearly fucked up stairs.*

**Three fixes that were not the fix, and what each one cost:**

1. *Re-colour the risers.* They were `#5E5852` in a hole, which is genuinely too dark. Changed, and
   the render came back **byte-identical**.
2. *Re-light the tread tops, and switch them off Lambert*, since a vertical face under an overhead
   light keeps almost nothing. Also true, also correct, **byte-identical again**.
3. *Build the shaft* — the floor is cleared for a well and nothing ever closed the cut, so the
   opening really did open onto the void. Real bug, real fix, and the picture still did not change.

**Two byte-identical renders are the finding.** A change that is obviously right and provably
invisible means you are not looking at the thing you think you are looking at. Firing one ray from
the game's own camera through the opening ended it in a second: fence → cleared ground → **apron**.
Never a tread, never a step, never a shaft.

**The rule: when a fix that must work does nothing, stop fixing and find out what is actually on
screen.** A hash of the render is a cheaper oracle than another opinion about the art, and a ray
through the pixel you are arguing about will name the object in one call.

**And the rule the apron itself leaves:** *nothing may roof over the world.* Scenery that exists to
be seen past the edge of the map must be a frame with the map in the hole, because anything laid
under the floor is a ceiling for everything below it, and **nothing in this engine ever looks down**.
`test/engine.smoke.js` now asks, of the built scene, whether any piece of scenery overlaps the
world's own footprint below `y=0`, and whether a well has anything inside it at all. Planted with the
apron exactly as it shipped: fires on both games.

**The other two faults found on the way, both real:**
- **The stair mass was a second staircase.** `⊓` drew a complete flight — treads, risers, nosings —
  one tile north of the real one, at a rake it invented (`22/n`) rather than the flight's own
  (`STAIRH`), so the screen showed the same stairs twice, a tile apart and not even parallel. It is a
  wall now, with a skirting that rakes with the real flight and a handrail mounted on it.
- **And that drawing was painted on the block's TOP face too**, because `⊓` had no `TILESIDE` entry
  and one painter served both. A flight in profile, lying flat on the roof of the mass.

## A map is symbols, not a heat map — 2026-09-16

*The owner, on the plan: "the map says tap a mark, but cannot tell if a mark is tapped. also... the
squares/dots for people are garbage, we really cant improve this so i can tell what things are?"*

**Both halves were true, and counting the tiles said why.** Of 29 glyphs on Meridian's plan:

| | |
|---|---|
| 133 tiles | `F` — each a solid `#B0895B` square, so the crew pen and every hoarding came out as a **mass** with no shape to it |
| 9 tiles | `J` — trees, as green squares, indistinguishable from any other green square |
| **7 glyphs** | a desk, a chair, a stove, a counter — **no map colour at all**, falling through to the open-ground fill. **Painted as floor. Invisible, silently, for as long as the plan has existed.** |

A tile was one flat fill and nothing else, which is a data visualisation of a city and not a map of
one — the same fault this file records about the paper, one layer in.

**The rule that fixed it is a distinction, not a symbol set.** An **area** the pack has already
decided how to show — water, road, pavement, a building — keeps its fill. A **thing** gets a shape:
a tree is a canopy and a trunk, a fence is **a line, not a block** (that one change is what turned a
yard back into a yard), a site is hazard stripes, an appliance is a small object. Symbols are read
off `TILES[g].kind`, never off the glyph, so a second world gets them free.

**And the first draft of that got it backwards**, which is worth recording: everything without a
handled kind drew an object, and Meridian's canal is 75 tiles of `≈` with no kind at all, so a river
came out as **seventy-five little grey boxes**. Worse than the squares it replaced. *Having a colour
is what makes a glyph an area* — the pack already answered the question.

**The marks: at nine pixels, silhouette is the only thing that survives.** `r` is `s*0.45` on a
ten-pixel tile, so the "somebody has work for you" mark was a nine-pixel disc carrying an exclamation
mark **one and a half pixels wide**. Two of the three were the same idea — a coloured blob with a
tiny tick. The interior detail is gone and the outline carries the meaning: **a person**, **a speech
bubble**, **a card**. Three shapes you could tell apart in greyscale, which is the repo's own rule
(colour never alone) finally being worth something. The colours are untouched; they were measured.

**And a tap now answers on the map.** It was a two-pixel ring in the *same purple as the you-are-here
dot*, plus a caption under the canvas he was not looking at. Now: a flag on a pole, a filled disc, and
**every other mark dimmed** — the last one being the cheap half of legibility and the half always
forgotten. *"This one" is only visible against "not those."*

### Three faults in the guard for it, and they are the register's own greatest hits

1. **It exited early.** `return` inside a `for` loop nested in a `forEach` walks out of the whole
   panel — at Meridian's tile (0,0), which is open ground. It compared four glyphs instead of
   twenty-nine and passed the plant it was written for.
2. **It supplied its own input.** It called `planTile` directly, so a plant that changed the *call
   site* and left the painter alone sailed through. It renders the plan twice now — once as it is,
   once with every tile replaced by open ground — so paper, grain, folds, vignette and labels are
   identical in both and whatever differs is exactly the tile's own contribution.
3. **It measured something standing in front of the thing.** A mark is ~11px across on a 10px tile,
   so it covers its tile completely, and Meridian's `e` has one instance with a person standing on
   it. The guard called the tile invisible for a reason that had nothing to do with the tile. The
   mark painter is stubbed for the measurement — take out what you are not measuring rather than
   subtract it afterwards.

**And the threshold is measured, not picked.** The confirmation *as it shipped* moves 18% of the
pixels around a mark, and 18% is precisely what the owner described as not being able to tell. The
flag, disc and dimming move 36%. The floor sits at 28 — between them, nearer the thing that failed.

## A person is weather, not masonry — 2026-09-16

*The owner, on R11: "why doesnt r11 walk around?"*

**The answer is that there is nothing to walk around.** A person is stamped into the grid as the
literal character `"N"`, and every reader that matters treats `"N"` exactly as it treats a wall —
`isSolid`, `isSolidAt`, the reachability auditor, and (found on the way) the trolley-seam check.
None of them has ever looked at a person. So when somebody wanders into a corridor **one tile
wide**, the map is genuinely cut in two: it is not a pathfinding failure, it is a gap with somebody
in it.

**Measured before anything was written**, which is what made the fix small:

| world | walkable | tiles that cut it | people who wander there |
|---|---|---|---|
| **`ex` Calle Dos** | 176 | **35** | **4** |
| `hq` | 208 | 17 | 0 |
| `st` | 356 | 14 | 0 |
| every other world | — | some | **0** |

**The whole of R11 lives on one street.** Every other world with a chokepoint has nobody walking in
it. That turned "an engine decision about whether people block" into "a wander filter that asks one
more question", which is what shipped: *a person does not stand in the only way through* — the same
manners that already stop them stepping in front of a tram.

**And the auditor now tells the difference between the two kinds of person.** A wanderer is passable,
because they will not be there in four seconds. Somebody `still` is not, because they never move and
the map really does have to work around them. The grid only says `"N"`, so it asks the pack who is
standing there.

**The rule, and it generalises past people:** *when a check means terrain, read the terrain.* The
flake that survived the fix was the trolley-seam check asking "does this world have somewhere a tram
could run" — a question about the map — off `grid`, which is the map **plus whoever is on it**. One
neighbour in a five-tile world's only four-in-a-row, and the check reported it could not run at all.
`rows` is what was authored; `grid` is what is authored plus weather. The check reads `rows` now and
the flake is gone.

**What it cost to leave it:** three days in the register, a suite reddening about one run in
twenty-five, and — the part nobody was counting — a player occasionally walled out of thirty-five
tiles of Calle Dos by somebody standing in a doorway with their back to them.

## The data was right for two years and nobody drew it — 2026-09-17

**Owner, and this is the fifth time he has raised it:** *"the skull on a non existing or visible
window sill overlaps a store front that was initially a placeholder for a mural. this isnt about
whether your work is good or not. you understand that right? its about trying to meet the requirement
of being realistic… if there were a window sill there, it should be drawn and then a skull can be
included and then the store front icon or mural can go around it."*

Four previous answers, `2026-09-08` through `2026-09-12`, all changed the **size of the sugar skull**:
8px, then 5px, then 0.85 of the pane, then the pane lit behind it. Each was measured. Each was
defensible. He came back every time.

**Rendered the tile at 8× before touching anything, and the cause was plain in one look:**

| what the data says | what was drawn |
|---|---|
| `TILES.B.win = [[5,10,8,9],[19,10,8,9]]` — two windows | two flat rectangles, `#8E7A80`, one shade off the wall |
| a sill at `win[1]+win[3]` — `propSill` computes it, `drawSillLedge` draws it for the candy | nothing under the window, because there was no window |
| a mural panel painted on that wall | plaster over the whole 32×32, erasing even the rectangles |

So what he was looking at is a lit pane, a sugar skull and a stone ledge **floating in the middle of
a blank wall**. Every one of them was in exactly the right place. The `win` rect is read by three
things — the sill props, the ledge, and the dusk lighting — and **not one of them drew it**.

**The rule, and it is the general one:** *a rectangle in the data is not a thing on the screen.* When
several drawings position themselves off one number and nobody paints the number itself, every one of
them is correct and the picture is wrong — and the fault is invisible in the code, because each
drawing reads right on its own. **Grep who draws the field before you tune anything that is placed by
it.** It is `gradeOf` and `d.sub` again, pointed at geometry: the same shape of mistake, the third
register to record it.

**What shipped.** One `drawPane` — a reveal, glass with four panes and a reflection, a lintel, and
`drawSillLedge`, *the same function the candy's ledge already used, at coordinates proved identical*
— called from the tile art of every front that declares a window: `B`, `Q`, `Z`, `=`, `!`, and the
town's `I`. Three declared rects were moved to where the art actually paints (`Q`, `Z`, the town's
`I`): **a window declared where the glass is not is a sill where the wall is.** `&` is deliberately
left alone and says so in the code — a round *ojo de buey* has no sill.

**And a mural does not erase a window.** A `DECOS` row now says which windows it leaves
(`wins:[1]`), and three readers go through that one list — the decor's own art, `propSill`, and the
dusk lighting, *which would otherwise have lit a window that is not there any more, at night, on a
wall nobody would think to check*. The other window is plastered over, which is what a muralist does
with a pane that is in the way, and it hands the shop's emblem a clear field: with both windows kept,
the basket and the wrench came out as **ribbons between the panes** — rendered, looked at, rejected.

**Still open, and it is the owner's own call** (*"whats square? well right now it can be the icon
while we figure it out"*): the emblem drawn **around** the window rather than beside it, with the
skull on the sill as part of the picture. That is six drawings, one per business. It is design, not
plumbing, and he deferred it himself.
