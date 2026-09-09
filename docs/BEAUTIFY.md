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
`engine/engine3d.js:241`

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
