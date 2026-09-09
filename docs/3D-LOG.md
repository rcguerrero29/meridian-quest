# The 3D log — Chema's contact sheet

*Opened 2026-09-09 at the owner's word: "we should make sure that they document everything possible
so they can recreate it if needed and try to continuously improve depending on goal and past builds."*

**This file is the record of every attempt, not the record of the rules.** The rules — what the
engine does today and why — live in `docs/NEW-WORLD.md` §3⅝, §3⅚ and §3⅔. This file says what was
*tried*, what it *measured*, and above all **what was rejected and for what reason**, because a
rejected approach nobody wrote down gets tried again in three months by someone honest.

Read it before proposing anything about the 3D view. Append to it before moving on.

---

## The standing goal

> **A pixel world that obeys real light and real depth — without ever stopping being a pixel world.**

**And the second half of the goal, in the owner's words (2026-09-09):** *"the standing goal is also
supposed to keep in mind the customizeable and ability to use as template for other games with
technology."* Realism here is never Meridian's realism. Every rendering improvement must arrive as
one of two things and nothing else:

- **a RULE** — it belongs in `engine/`, it is behaviour-identical for Meridian, El Changarrito and
  any world built from the template, and it is proven the same day by all four suites; or
- **a SEAM** — the engine asks, the content pack answers, and a pack that says nothing gets a sane
  default. `PLACES · GROWTH · SEASONS · CHAPTERS · ENDLESS · HUDFACT · TILEART · DECOART · CRITTERS ·
  BUILDTPL · BUILDS · READS · DOCS · INTERVIEW · TOWNLBL` is the existing list; a new one joins it.

A realism change that only makes sense for Meridian's art, Meridian's palette or Meridian's maps is
**not a realism change** — it is Meridian content wearing an engine's clothes, and it is refused.
Test for it: *could a game about something else entirely turn this on, turn it off, or set it to a
different value without touching the engine?* If not, find the seam before you find the fix. Every
rule in this log passes that test — nearest filtering, `alphaTest`, `t3Top`, the stub, the glass —
which is why they are engine rules and not Meridian's.

Three more sentences that follow from it, all of them already settled by shipped decisions:

1. **The grid is never softened.** Everything is sampled nearest. Realism here means correct
   *behaviour* — occlusion, depth, light, camera — never smoother pixels. Any proposal whose result
   is a blurrier frame is refused on sight.
2. **Nothing that stands is a flat picture pretending otherwise.** `test/engine.smoke.js` fails the
   build if a new object ships as a flat picture (#39). Billboards are for round, leggy, organic
   things; boxes are for things with corners (Pili's rule).
3. **A person can always tell where they are.** Every occlusion cure — the wall stub, the glass —
   exists so that your own position stays legible. A cure that loses the player is not a cure.

**❗Open, needs the owner's word:** the goal above is my reading of what has already been signed
rather than something the owner has stated in those words. If it is wrong, everything measured
against it is measured against the wrong thing. — *Chema, 2026-09-09*

---

## How things are measured here

| What | Method | Why not the obvious thing |
|---|---|---|
| Sharpness | mean absolute Laplacian over a rendered frame | "Looks blurry to me" cannot be compared to last week |
| Occlusion | render twice, difference the buffers, count changed pixels | **Raycasting was tried and passes clean straight over a knee-high desk** |
| Screen share | rendered box height ÷ `innerHeight`, at 390×844 | At 560px tall the old rule already filled half the window; the fault only appears on a tall screen |
| World extent | `2·d·tan(fov/2)`, then × aspect | `fov` is the VERTICAL angle — a taller frame *costs* horizontal world |
| Loop cost | count the loop's `draw()` decisions | Headless throttles rAF to ~2 frames/500ms; a WebGL frame count proves nothing |
| Anything at all | **and then look at a screenshot** | A prototype here passed every pixel test while putting teeth along every wall in HQ |

---

## The log

### 2026-09-08 · #134 — "things are looking a bit blurry"
- **Goal served:** the grid is never softened.
- **Measured before:** edge energy of a rendered street **2.26**.
- **Diagnosis:** every texture was sampled through a linear filter somewhere. Linear *blending* is
  what "blurry" means for a pixel grid. The mip pyramid was **not** the cause.
- **Shipped:** nearest between texels *and* between mip levels; the pyramid kept.
- **Measured after:** **2.72**.
- **Rejected — dropping the mip pyramid.** It removes the blend between levels, but the far half of
  the street then crawls as you walk. Do not try this again.
- **Rejected — mipmaps unconditionally.** A non-power-of-two texture with mipmaps renders **black**
  on a WebGL1 fallback, and every texture here is sized to its world. Mipmaps are asked for only
  under WebGL2.
- **Also found:** the live sprites lost their 36×48 shape when the device pixel ratio changed, and
  the pool resize used `40*K` where the sprites are `48*K` tall.

### 2026-09-08 · fullscreen was a second, unrelated blur
- **Measured:** **0.885** fullscreen against **2.24** windowed — same build, same content.
- **Diagnosis:** the 3D buffer kept the game's 10:8 while fullscreen gave the element the screen's
  shape, so the browser rescaled and letterboxed a 2880×2304 render.
- **Shipped:** it renders the box it is given.
- **Lesson worth keeping:** two faults with the same symptom. Fixing #134 did not fix this, and the
  owner reported it again — correctly. *A symptom is not a cause; measure in the state the person
  was actually in.*

### 2026-09-08 · the world's share of the screen, and what `fov` costs
- **Measured before:** the world was **31%** of a 390×844 phone screen.
- **The repercussion, measured BEFORE building rather than after:** `fov` is the *vertical* angle,
  so a taller box would have shown the same up-and-down and **less** left-and-right — **10.9 tiles
  of street across would have become 7.7**. The angle widens below 10:8 to hold the width.
- **Shipped:** **46%** of the screen, and more world in both directions.
- **Second fault found by doing it:** at a map corner the ground stopped and the background showed
  through. An apron in the world's floor colour now carries the city into the dark.

### 2026-09-08 · the render loop behind a panel
- **Measured:** **215 frames in six seconds**, at full device resolution, with a document covering
  the world — none of them visible to anyone.
- **Shipped:** the loop stops *drawing* behind a panel and never stops *thinking*, so nothing jumps
  when the paper goes down; anything the street said while you were reading is held and delivered.
- **Note:** the test threshold was wrong at first (`< 5` frames) because headless throttles rAF to
  about two frames per 500ms. It asks *some vs none* now.

### 2026-09-08 · the camera turn
- **Shipped:** 300ms ease-in-out, offered as a setting (`instant / quick / easy / slow` =
  0 / 150 / 300 / 520ms). `instant` is exactly the old behaviour.
- **Reasoning worth keeping:** AJ called the old *automatic* turn "too confusing" (#65) and the cure
  then was to make it manual. But the confusion was never that it turned — it was that the turn had
  no motion to follow, so the eye had to re-find the whole street from scratch. **A move you can
  watch is a move you can follow.**

### 2026-09-09 · #149 — a prop's empty margin was hiding people
- **Goal served:** a person can always tell where they are.
- **Measured before:** **76 pictures** across Meridian counted their see-through corners as solid.
- **Diagnosis:** every prop is a picture on a card and most of the card is empty. An empty pixel
  that still writes depth punches a hole in whatever is drawn after it — which is people. A quest
  mark beside a desk simply went missing and nothing on screen explained it.
- **Shipped:** `alphaTest` (0.25) on every baked billboard.
- **Proof used:** two renders of the HQ doorway, before and after. Three quest marks return.

### 2026-09-09 · #140 — "i seem to walk on them"
- **Goal served:** a person can always tell where they are.
- **Diagnosis, and the real lesson:** the near-wall rule was written as a list of *kinds* — walls,
  facades, lintels, doors, window pieces — and it measured height with `geometry.parameters.height`,
  **which a sprite does not have**. So a tree crown, a lamp or a piñata was never once considered no
  matter how much of you it covered. *A kind list cannot answer a question about height.*
- **Shipped:** `t3Top(o)` answers for a box and for a sprite alike; the rule asks about height, of
  everything with a footprint. A wall still becomes a knee-high stub; a tall **object** turns to
  glass at `T3GHOST` = 0.55, `depthWrite` off, drawn after the people.
- **Rejected — cutting a tree to a stub the way a wall is cut.** Half a tree is not a cutaway, it is
  a missing tree, and the room stops making sense.
- **Rejected — removing the hero's depth exemption.** It is the obvious fix and it is worse than the
  bug: the tree simply eats you. Shown to the owner as the middle of three panels. Drawing the glass
  *after* the people gives a pixel-identical result — 0.55·crown + 0.45·hero either way — and #22
  and #92 survive untouched.
- **Rejected — raycasting as the test.** Proven to pass clean over a knee-high desk. Silhouette
  diffing instead.
- **Watch out:** materials are shared per glyph. The glass copy is made once per PIECE and kept
  beside the solid one; edit one in place and a single tree fogs its whole row.

---

## Still open, in the order I would take them

1. **The trolley's art** — the owner: *"make the trolley more realistic, even the old one seemed cute
   and realistic though 2d."* The structural half of #125 shipped; this is the half that is a
   judgment about how it reads, and it wants Pili beside me.
2. **Rosa's remaining 3D notes**, chiefly her call that the world's height should stop being derived
   from the 2D tile grid — partly addressed by the screen-share change, not finished.
3. **Light.** Day/dusk/night tints exist. **Correction, 2026-09-09 (Pili, and she is right): contact
   shadows DO exist** — `engine3d.js:203–214` darkens a walkable tile that touches a solid neighbour,
   and this log said otherwise, which is the log being behind the code. What that mechanism reveals
   is sharper than the gap it filled: **a tile with no solid neighbour gets no gradient at all**, so
   an open plaza is one flat value edge to edge, and the eye reads a single flat value as absence.
   Still untouched: whether the sun should rake, and any lighting a pack can ask for.
4. **A named baseline.** Every number above was taken ad hoc. A `test/` script that renders the same
   six frames and prints the same six numbers would make "continuously improve" mean something
   arithmetic rather than something remembered.
