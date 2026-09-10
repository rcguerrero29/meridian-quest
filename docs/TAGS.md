# The vocabulary — Toño's ledger

*Opened 2026-09-09 at the owner's word: "a new character persona who ensures all the tags for all
aspects of the stories, buildings and graphics can be reuseable for custom games — i guess this to be
more specific is an open world template."*

**This file is the register of the words**, not of the code. A tag — a tile `kind`, a glyph, a
chapter field, a seam name — is the joint between the shared `engine/` and a per-game content pack.
If the vocabulary is Meridian's, the template is a lie however good the engine is.

Read it before proposing any tag. Append to it whenever you find a word that does not travel,
**whether or not anyone is going to fix it today** — the register is the deliverable; a fix is a
ticket.

Everything below was verified against the code on 2026-09-09 by three agents working in parallel,
and the sharpest claims were re-checked by hand. Line numbers are as of that day.

---

## The two rules

They came from two people who never spoke to each other, about opposite halves of the problem, and
they turned out to be the same rule: **describe the mechanism, not the meaning.**

**1 · Name the geometry, not the noun** — for anything that gets drawn. It is a `kind` only if you
can finish this about every tile that will ever carry it, without using the object's name:

> *"This is a **box / billboard / floor paint**, it stands **N tiles** tall from its feet, it is
> **solid / walkable**, and it shows art on **four faces / two / one**."*

Four answers, one tag. If you cannot answer all four it is a **label**, not a kind — put it in a
different field, because `kind` is what the renderer obeys and a label it silently ignores.

**2 · Write it for a world with no lesson and no career** — for anything with words. Fill the field
in for a game about something else entirely. **If the honest value is blank, or a borrowed lie, the
tag is Meridian's word, not the template's.**

| Passes rule 2 | Fails rule 2 |
|---|---|
| `tags` · `chapter` · `need` · `late` · `season` · `ok/mid/bad` | `role` · `industry` · `concept` · `codex` |

**3 · One part, one name; one name, one part.** See *Collisions* below. This is not a style
complaint: it is why nobody can write a validator, a form, or a document that says what a tag *is*.

---

## The inventory

| Category | Defined in | Size |
|---|---|---|
| Solid glyphs | `engine/engine.js:48` `SOLID`, extended by pack `SOLIDX` | 17 + 24 Meridian + 5 town |
| Door glyphs | `engine/engine.js:51` `DOORSET` (default `"+ELO"`), pack `DOORS` | 4 / 9 / 8 |
| Tile `kind` | `engine/engine.js:1327–1355`, merged with pack `TILEMETA` at `:1356` | 16 |
| Tile flags | same block | `lift` `stand` `light` `win` `awn` `vary` `box` |
| Critter `kind` | `engine/engine.js:639–644` (+`1491`, `1590`) | 6, **closed** |
| Animal slots | `engine/engine.js:1684` `ANIDEF` | 4, **closed** |
| Dog commands | `engine/engine.js:4599–4612` | 5, **closed** |
| Decal `kind` | `engine/engine.js:1398–1403` | 2, **closed** |
| Decor `deco` | `DECODRAW` + pack `DECOART` | 2 + 8 |
| Fiesta prop `kind` | `content/meridian/config.js:147–152` | 3, **closed** |
| Portal `mark` | `engine/engine.js:2919` | 1 named |
| Chapter ids | `content/meridian/config.js:209–248` | 6 |
| World ids | `content/meridian/maps.js:3` | 12 |
| Answer grade `r` | `engine/engine.js:3174–3189` | `ok` `mid` `bad` |
| Hair `style` | `engine/engine.js:2426–2527` | 18 (a pack uses 7) |
| Doc `tmpl` | `content/meridian/docs.js` | 7 bare numbers, no registry |
| Pack seams | 40 `typeof X!=="undefined"` guards in `engine/engine.js` | see NEW-WORLD.md |

### What is genuinely reusable

Glyph→meaning really is data. `SOLIDX`, `DOORS`, `DOORLOOK`, `TILEMETA` (`lift`/`kind`/`win`/`awn`),
`MAPCOL`, `MAPDOT`, `TOWNLBL`, `TILEART`/`TILEART_SIDE`, `DECOART`, world ids, portal keys, NPC
letters, `PLACES`, `STOREPFX`, the `SEASONS` key set, `BUILDTPL` part ids, and the `ok/mid/bad`
grade. **The town proves it:** `changarrito/content/art.js:6` adds one glyph with a `TILEMETA` row
and no engine change at all.

---

## The leak register — tags that look universal and are not

*This is the part of the file that earns its keep. A second game breaks on exactly these.*

### L1 · The engine carries Meridian's alphabet
`engine/engine.js:1329–1355` pre-assigns about **thirty glyphs** — `# B Q Z D K T A S H I W V F G C
X P J ~ ^ 1 ⊓ ≡ ▲ ▼ ◺ 3 4 5` — each with a kind, a height, window rectangles. A new game inherits
thirty opinions before writing a line.
**The file says so about itself.** Inside that block a comment explains that a hardcoded `"345"`
glyph list was removed from `engine3d.js` because *"engine code naming a pack's glyphs is the
portability law wearing a different hat"* — three lines above `"3"`, `"4"`, `"5"` being named in
engine code. The rule was seen, written down, applied once, and the surrounding table never held to
it. `test/smoke.js` scans for business and NPC names, not glyphs, so this passes CI today.

### L2 · The merge is a spread, not a replacement
`engine/engine.js:1356` — `TILES[g]={...(TILES[g]||{}),...m}`. A pack that redeclares a glyph the
engine pre-owns **inherits fields it never asked for**. Redeclare `C` as a facade and you keep
`stand:true, light:true` — a storefront you walk through and kick. Redeclare `B` as furniture and
`win:[[5,10,8,9],[19,10,8,9]]` rides along. No warning.

### L3 · Six enums are closed engine if-chains
Critter species, animal slots, dog commands, decal types, fiesta props, hair styles. They look like
data and are hardcoded branches. A new game gets butterflies and beagles or nothing — and
`beagle`/`lab`/`chi` exist because of one dog, `gato`/`colibri`/`loro` are Spanish words in engine
code.

### L4 · `ANIDEF` bakes Meridian's map into the engine
`engine/engine.js:1684` — `dog:{world:"hq",x:12,y:5}, cat:{world:"lc",x:16,y:9},
pig:{world:"st",x:4,y:1}, loro:{world:"st",x:17,y:5}`. World **ids and coordinates**, as engine
defaults. There is a pack seam (`ANIMALS`) to override it, which is not a defence: a new game
inherits Meridian's geography until it discovers it needs to.

### L5 · Five glyphs are known by literal
`⊓ ≡ ▲ ▼ ◺` appear about **29 times as string literals** across `engine.js` and `engine3d.js`.
`docs/NEW-WORLD.md:127` already admits this ("The engine owns five glyphs") — registered here so it
is counted, not re-discovered.

### L6 · `"N"` is the hardcoded NPC glyph
About 20 places in `engine/engine.js`. A pack cannot rename it. `"9"` (a doghouse) is likewise
hardcoded in engine walkability.

### L7 · Half the tile kinds do nothing
Eight drive geometry — `wall facade fence tree water bridge furniture appliance`. Seven are inert
labels no renderer reads — `prop marker site nature gear transit stair` — surviving only in
`test/engine.smoke.js`'s allow-list. `"site"` means *La Obra, the construction site*: Meridian's
noun in what claims to be a class. Stair geometry does not come from `kind:"stair"` at all; it comes
from the glyph literals of L5.

### L8 · `bridge` and `water` are one specific bridge and one specific river
`engine.js:1004–1011`, `1242–1255`, `engine3d.js:334–368` — the geometry is the rainbow bridge, and a
comment cites the owner asking for it. `kind:"water"` is floor paint, a blue rug: the mechanism for
real depth exists but is welded to the well glyphs. `light:true` on `C` means *the ball you kick*.

### L9 · Quests have no identifiers
They are **array indices**, everywhere: `CHAPTERS[].quests:[24,25…]`, `GROWTH.staged.quests:[12,13]`,
`wardrobeQuest:15`, `WNPC` `q:[24,28,30]`. Insert a quest in the middle and you renumber a world.
Meridian never noticed because its quest list is finished; a template's never is. **This is the
single largest blocker to an open-world template.**

### L10 · The town already fails the test, visibly
`changarrito/content/config.js:1–3` declares the pack *"trains no role, carries no curriculum and
awards no grade that means anything about the player."* `changarrito/content/strings.js:32` ships
`levels:["Junior","Delivery Lead","Senior Lead","AI LEGEND"]` and `:76` ships
`repL.roles:"Roles practiced"`. Meridian's career ladder, copied whole into a world that explicitly
disclaims having one. Nobody decided it; it rode along in a copied file. **The config is the true
side.**

### L11 · Retry-until-correct is compiled in
`engine.js:3195` completes a quest only when `o.r==="ok"`. An open world's choices are often
preferences, not answers. The only ungraded conversation today is `INTERVIEW`, which is not a quest
and pays nothing.

### L12 · `ENDLESS` is the district-advance switch, not a story flag
`engine/engine.js:303`, `:3439`, `changarrito/content/config.js:10`. It reads as "skip the epilogue."
It is not. `chDue()` returns false when `ENDLESS` is set, so the ending panel never opens — and
`$("endGo")`'s click handler is the **only** writer of `chSeen` in the engine. `chSeen` gates which
quests are on offer (`:291`), which storefronts are up (`ribbonUp`, `:305`) and `GROWTH` staging.
**An endless pack with two or more districts never opens the second, silently.** El Changarrito is
immune only because it declares no `CHAPTERS` and receives one synthesised district.
It is two settings wearing one coat — *"does an ending panel play"* and *"how does this world open
its next district"* — and the second has no tag at all. The recommendation on the register is to
**split, not rename**: `ENDING:false` for the panel, and give the advance its own trigger, which is
also what `docs/OWNER.md`'s *"a day may end, it may never close anything"* has been asking for.

### L13 · `flat` does not exist, and `water` is doing its job under a noun
`engine/engine3d.js:401` is the only path that renders a **solid tile with no standing geometry**,
and it is reached by `kind==="water"`. A pack wanting a flower bed, a plot, a puddle or a rug either
walks through it or gets a cardboard cutout (`:461`). The honest kind is `flat` — *drawn into the
ground plane, zero height, no standing geometry* — which is `water` with the noun taken out;
solidity keeps coming from `SOLIDX`, because **`kind` has never set walkability.**
Register the coupling too: `kind:"water"` triggers Meridian's marigold petal spill (`engine.js:585`,
`:1427`) and the bridge's orientation test (`:1005`), so `~` keeps `water` as an alias until those
move to a flag. That is the migration.

### L14 · `kind` does not decide walkability, and half the vocabulary assumes it does
`SOLID`/`SOLIDX` decides. `engine3d.js:399` skips every non-solid glyph **before `kind` is ever
read**. The renderer knows exactly five shapes — box (`wall`/`facade`), billboard panel (`fence`),
trunk-plus-canopy (`tree`), freestanding box (`box:true`, and only with a `TILEART_SIDE` drawing),
and floor paint (`water`) — and everything else falls through to a cardboard cutout. Anyone planning
by `kind` alone is planning against nothing. This is the mechanism behind L7 and the reason the seven
inert kinds went unnoticed for so long.

### L15 · A game cannot choose which cameras it has — **CLOSED 2026-09-10**
> **Built.** `CAMERAS` is a pack seam: a camera a game does not declare has no button and cannot be
> reached, even by a stale saved choice. **And the art half closed with it** — `TILEART` now takes
> `{top, side, crown, iso}`, so a pack can draw its own tree and its own isometric view.
> **Still open, deliberately:** Meridian's jacaranda is still the engine's *default* crown. The seam
> exists and nothing is forced through it yet; moving that drawing into the pack is step two, in
> `docs/ARCH-LOG.md` A5.
`engine/engine.js:575` — `const CAMS=["top","front","iso","3d"];` — **hardcoded in the engine.**
`CAMDEF` lets a pack pick its *default* camera (`:576`), and that is all: every pack ships all four,
and the button row offers all four whether or not the game wants them.

**The owner found this, 2026-09-09:** *"why do we have to lose the art for the isometric? cant it
switch out depending on the goal? maybe a game doesnt need 3d."* Both halves are right and they are
one fault.

A 2D-only game still ships the whole 3D renderer, still shows a ⛰ button, and still exposes ◆
isometric — which `docs/BEAUTIFY.md` records as losing about **90% of the art**: trees become a
brown box with three green circles glued on the top face, and the bridge, the playground props and
the doghouse **disappear entirely**. A pack has no way to say *"this game is played from above"* and
be spared all of it.

**The seam is two things, not one.** *Which cameras does this game offer* (a list, defaulting to all
four so nothing changes for either shipping game), and *what does this glyph look like in each*
(already half-solved — `TILEART` and `TILEART_SIDE` exist; there is no third for iso, which is
exactly why iso falls back to extruding a box and losing the drawing).

**Why it matters beyond tidiness:** it is the cheapest possible answer to "maybe a game does not need
3D." A pack that declares `top` and `front` only never pays for `engine3d.js`, never has an iso
button to be disappointed by, and never has to answer for art in a camera it does not use.

---

## Collisions — one word, several jobs

| Word | How many meanings | Where |
|---|---|---|
| `kind` | **six** — tile class, critter species, decal type, fiesta prop, dog command, sign subtype | `engine.js:1329`, `:1839`, `:1398`, `config.js:148`, `:4599`, `changarrito/content/maps.js:192` |
| `mark` | **four** — portal direction, calavera accent colour, per-quest attempt tally, `kind:"marker"` | `maps.js:185`, `engine.js:2345`, `:261`, `:1338` |
| one district | **four names** — chapter id `mercado`, world id `me`, ribbon id `me`, DOCS key `mercado`, plus a 1-based `district:` number inferred from array position | `config.js:213/66/78`, `docs.js:119` |
| walkability | **three overlapping tags** — `SOLID`, `stand`, `standsUp`, plus `kind:"door"` duplicating `DOORSET` | `engine.js:1359–1360`, `:4882` |
| `box` | **three spellings of one geometry** — `m.box \|\| m.kind==="furniture" \|\| m.kind==="appliance"`, and the only one named for the geometry is the flag. `furniture` and `appliance` are Meridian's nouns for the same box and no renderer can tell them apart | `engine3d.js:241` |

---

## Gaps — what a new game needs and cannot say

- **An id on a quest** (L9). Everything else here is smaller than this one.
- **A tag a pack can invent** for a critter, decal, dog command, fiesta prop, or animal — all six are
  closed engine enums (L3).
- **Metadata on `deco`.** It has art but no height, no solidity, no kind — so decor never occludes
  correctly.
- **Tile kinds that do not exist:** a vehicle (the tram is hand-built boxes driven by `TRO`), a thing
  that hangs at a height (piñatas are welded to a seasonal seam), a thing you climb, a roof or
  ceiling, a liquid other than water, a window in a floor.
- **A cast vocabulary.** The town had to invent "named person / townsfolk / note / animal" in prose
  (`docs/story/el-changarrito.md` §1) because no field says what a person *is*.
- **A choice that sets world state.** The only thing an answer can change is index-keyed `GROWTH`.
  No flags: nothing can remember that you took the money.
- **Declared unlock relations.** Meridian's order lives in *prose* — Chelo phones Tacho inside a
  quest node. A second world needs the graph as data.
- **Ambient lines with a `when`.** `docs/STORY.md` open item 4 is filed as Meridian-only; with a
  second world it is a template blocker.
- **A named `tmpl`.** `"01"`–`"07"` are bare numbers with no registry.
- `STAKES.mode:"budget"` is a declared tag with **no implementation** (`config.js:45`).

---

## Contradictions found on the way, reported rather than absorbed

1. `docs/OWNER.md` says *"the engine may never name a pack's content."* L1, L4, L5 and L6 are the
   engine naming a pack's content. The rule is right; the code has not been held to it.
2. `docs/NEW-WORLD.md` §1's nine-file list is stale — the town has no `room.js` and adds `record.js`.
3. `docs/IDEAS.md` §15.25 declares three tile categories; the code has three *walkability* categories
   and **eight** *shape* behaviours, and no document states the second list. This file is now the
   first place it is written down.
4. `test/smoke.js`'s portability blocklist is still Meridian's proper nouns. **A vocabulary role
   cannot enforce anything until that scan is generic** — that is the first thing to build if this
   register is ever to become a test.
