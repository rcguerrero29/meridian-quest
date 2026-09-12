# The architecture log — decisions deferred, with their options kept

*Opened 2026-09-09 at the owner's word: "for the not on the list, record the options and start for
that and keep architecture logs for future implementations."*

**This file holds the changes we decided NOT to make yet, and why, with the options still on the
table.** It exists because the expensive thing is not making a decision — it is making the same
decision three times because nobody wrote down the reasoning of the first two.

Sibling registers: `docs/TAGS.md` (vocabulary leaks) · `docs/3D-LOG.md` (rendering attempts and
rejections) · `docs/QA-PASS.md` (what escaped) · `docs/BEAUTIFY.md` (what renders badly) ·
`docs/SOURCES.md` (how a claim is tagged) · `docs/OPEN.md` (the index to all of it).

A row leaves this file in one of two ways: **it gets built**, and moves to a commit and a ticket; or
**it gets refused**, and the refusal is written here with the reason so it stops being re-proposed.

---

## A1 · `chSeen` should be a set, not a high-water mark
**Status: deferred, 2026-09-09. Cost is a save migration.**

`[CODE]` `const qOpen=qi=>{const c=qChapter(qi);return c<0||c<=chSeen;}` (`engine/engine.js:312`),
`let chSeen=0` (`:330`), persisted as `SV.cs` (`:4986`).

`chSeen` is a **single number**. District 3 can only be open if 0, 1 and 2 are, so districts open in
strict array order and **there is no way to express "the mercado is open but the taller is not."**

**Why it came up:** the owner's pulled-story idea — walk into a business and ask for work — requires
districts to open in whatever order the player finds them.

**Why it was deferred:** `chSeen` is in every save. Changing it to a set is a save migration.

> **CORRECTION, 2026-09-10 — the second half of that sentence was wrong, and it was holding up #153.**
> This row used to say L9 (quests are array indices) is *"the same class of problem"* and that both
> *"should be paid for once, together, or not at all."* **They are not the same class.** `chSeen` is a
> scalar whose **meaning** changes — a high-water number becoming a set — and no amount of mapping
> helps that; it genuinely needs a migration. Quest indices are **positions whose meaning is stable**,
> so identity can be fitted *forward* for nothing.
>
> `[CODE]` Verified in this repo's own history, not assumed: `ab1e519` shipped 24 quests, `27429f2`
> shipped 56, and the first 24 titles are byte-identical **in the same order**. Nothing has ever been
> inserted or reordered. **Every save ever written still means, index for index, exactly what it meant
> the day it was written.** There is nothing to repair — only something to guarantee going forward.
>
> **So L9 does not have to wait for A1**, and waiting is not free: the append-only guarantee lasts
> only until somebody inserts a quest. See A9 below. A1 itself stays deferred on its own merits.

| Option | What it costs | Note |
|---|---|---|
| **Leave it** ← *taken 2026-09-09* | nothing | Districts open in order. Nothing in either shipping game needs otherwise |
| `chSeen` becomes `Set` of district ids | save migration; `qOpen`, `ribbonUp`, `GROWTH` all read it | Do it **with** L9, not before |
| A parallel `opened` set, `chSeen` kept as a derived max | no migration; two sources of truth | `[TRAINING]` Two sources of truth for one fact is how the doorstep and the ledger drifted |

**What was built instead:** the ceremony was decoupled from the advance (`chAdvance`, `chOpenDue`,
`chDue`), which fixes the endless block without touching the shape of `chSeen`. That was Tavo's and
Nacho's shared recommendation and it is the whole reason A1 could wait.

---

## A2 · Asking a business for work — the pulled story
**Status: refused as an advancement rule, kept as a story idea. 2026-09-09.**

`[OWNER]` *"a person can have the drive to ask for quests from businesses, somewhat realistic no?"*

**Refused because** `[CODE]` a business's *building* is what opening its district constructs
(`GROWTH.ribbons`, `content/meridian/config.js:66–71`) — **on a fresh save there is no El Mercado to
walk into**, so asking cannot be how a district opens. And `[CODE]` a fresh save already offers
fourteen ❗ with eight in the starting room: the player's problem at hour one is triage, not hunger.

**Kept because** the instinct pointed at something real, and it was `[CODE]` **25 of 31
quest-carriers have no `chat` lines**, so finishing someone's quests deletes the Talk button from
them permanently. `[WEB]` That is the Fallout 4 Garvey problem inverted — givers who run dry
*invisibly* — and the documented cure is the same: let a giver run dry **visibly, and in character**.
[Garvey](https://steamcommunity.com/app/377160/discussions/0/412447331651937092/)

**The story version survives as *el mandado*** — the shopkeeper asks *you* for a favour first and the
favour is the diagnosis. `[WEB]` It is the Yakuza substory shape
([wiki](https://yakuza.fandom.com/wiki/Substories)), and Nacho arrived at it independently. Full
reasoning: `docs/meetings/2026-09-09-el-mandado.md`.

---

## A3 · The record — of people AND of tasks
**Status: half built, half open. 2026-09-09.**

`[WEB]` The rule from the research: **pull the quest, never pull the record.** Outer Wilds motivates
exploration without assigning missions and pays for it with the Ship Log
([GDC](https://gdcvault.com/play/1027008/Independent-Games-Summit-Sparking-Curiosity)); Majora's Mask
does it socially with the Bombers' Notebook
([wiki](https://zelda.fandom.com/wiki/Bombers'_Notebook)).

**The owner asked whether both halves are wanted. They are, and one already exists.**

| Half | State | Where |
|---|---|---|
| **A record of TASKS** | `[CODE]` **built** — `dlog` records every quest and node with its verdict (`engine.js:3983`), and the report renders it grouped, graded and exportable (`:4008`) | `dlog`, the report, `roomSheet()` |
| **A record of PEOPLE** | **missing** — the ❗ is live and local; nothing says who you know, who you helped, or who is waiting two streets away | ticket #160 |

**The line that keeps it legal** under `docs/OWNER.md`'s *never a to-do list*:

- A record of the **past** — what you did, who you met — is always fine. That is `dlog`.
- A record of the **present** — who is waiting *right now* — is fine. That is the ❗, made visible
  beyond the room you are standing in.
- A record of the **future** — a list of what you have not done yet — is the banned thing.

`[WEB]` This is exactly Outer Wilds' shape: the Ship Log records what you **found** and flags *"more
to explore"* where something is unfinished. **It never lists what you have not found.**

---

## A4 · The verb table — what an object answers to
**Status: model agreed, not built. 2026-09-09.**

`[OWNER]` The owner corrected an earlier framing that had "liftable" as the top of a ladder: *"a wall
shouldnt be liftable but one day we may want to touch and open a door or customize it and replace
it. the mural may need changing."*

**It is not a ladder. It is a table, and "nothing" is a legitimate row.**

| | lift | open | replace / repaint | build on |
|---|---|---|---|---|
| crate, cone, ball | ✓ | | | |
| door | | ✓ | ✓ | |
| mural, sign | | | ✓ | |
| patch of grass, empty lot | | | | ✓ |
| wall | | | ✓ eventually | |
| mountain | | | | — and that is a fine answer |

**The prerequisite, which is why nothing was built:** `[CODE]` most objects have no body — they are
pictures standing on air (`docs/BEAUTIFY.md`). **You cannot pick up a picture.** The beautify work is
not a parallel track, it is the foundation. Ticket #159.

`[WEB]` And the *build on* row has a proven shape — Tarrey Town, where Hudson keeps asking for wood
and a town assembles from your deliveries
([Nintendo Wire](https://nintendowire.com/guides/the-legend-of-zelda-breath-of-the-wild/tarrey-town/)),
with Terraria's lesson that **rules beat freeform**
([Terraria](https://terraria.wiki.gg/wiki/Guide:NPC_Happiness)). `[CODE]` This engine already has
that validation: `buildSafe` refuses a build whose door opens onto nothing.

---

## A5 · The tree cannot be drawn by a content pack
**Status: seam BUILT 2026-09-10. The move is step two.**

> **What shipped.** `TILEART["J"] = {top, side, crown, iso}` — one entry per glyph with slots, rather
> than the two tables and two holes it was. `crown` is what stands above a tile, so a pack can draw
> its own tree, lamp globe or market umbrella. A bare function still means `top`, so nothing already
> written changed, and both games render identically.
>
> **What did NOT ship, on purpose:** Meridian's jacaranda is still the engine's default crown. A pack
> can now override it; nothing is forced through the seam yet. Moving the drawing out is a separate,
> visible change to two games and it deserves its own ticket rather than riding along on a seam.
>
> **The owner's framing, which was better than mine** (2026-09-10): *"why cant we have like a pack
> can draw its own tree and layer for art? maybe im mixing but just trying ot reuse what we can."*
> He was not mixing them up. A5 and A7 were both *a pack cannot describe a view of a thing*, and my
> plan had been two more globals on top of the two that existed — four mechanisms for one job.

`[CODE]` The canopy is built inside `engine/engine3d.js:437–447` with a hardcoded green. A pack gets
Meridian's jacaranda or nothing.

**Why it matters more than it looks:** improving Meridian's tree as *Meridian art* would make the
game prettier and **the template worse** — it would deepen a rule already broken. Pili's proposed
seam is a **crown**: a pack-declared second drawing standing above a tile, with a height and a
scale. The same seam then gives a lamp globe, a market umbrella and a fountain jet.

**Consequence for the build order:** the tree is done *before* the crates, even though the crates are
cheaper, because the crates are pure content and the tree is a template fault wearing art's clothes.

---

## A6 · The seven inert tile kinds, and `flat`
**Status: registered, deferred. See `docs/TAGS.md` L7, L13, L14.**

`[CODE]` Eight kinds drive geometry; seven — `prop marker site nature gear transit stair` — are
labels no renderer reads. And there is no `flat` kind, so `water` is doing that job under a noun.

Deferred because renaming a kind is a migration across two packs and the tests, and nothing shipping
is blocked. **The reason it is written here rather than only in TAGS:** the next person to add a
"flower bed" will reach for `nature`, get a cardboard cutout, and spend an afternoon finding out why.

---

## A7 · The camera set should be a pack's choice
**Status: BUILT 2026-09-10.**

> `CAMERAS` in a pack's config. Say nothing and you get all four, so neither shipping game changed.
> Declare fewer and the others have no button and cannot be reached — `camSet` refuses a camera the
> game does not have, which is what makes a *saved* choice safe when a pack later drops one.
> The expensive half — a third art layer for isometric — was **not** built, and that was the point:
> **let a pack turn iso off before anyone spends a week making iso good.** The slot exists in
> `TILEART` for whoever wants it.

`[OWNER]` *"why do we have to lose the art for the isometric? cant it switch out depending on the
goal? maybe a game doesnt need 3d."*

`[CODE]` `engine/engine.js:575` hardcodes all four cameras. `CAMDEF` picks a default and nothing
more. See `docs/TAGS.md` L15.

| Option | What it costs | Note |
|---|---|---|
| **`CAMS` becomes a pack seam** ← *recommended* | small; default to all four so neither shipping game changes | A pack declaring `["top","front"]` never pays for the 3D renderer at all |
| Also add a third art layer for iso | real art work per glyph | `[TRAINING]` Do not do this first — most packs would rather **drop** iso than draw for it |
| Leave it | nothing | Every future game inherits four cameras and one of them loses 90% of its art |

**The order matters:** offering the choice is cheap and immediately useful; drawing for a camera
nobody has to ship is expensive and might be wasted. Let a pack turn iso *off* before anyone spends
a week making iso *good*.

---

## A8 · The interview should branch, and one day an agent should run it
**Status: recorded 2026-09-10. Not built.**

`[OWNER]` *"one day maybe let it be able to support an agent to ask the questions depending on
initial answers."*

Today `docs/NEW-WORLD.md` §0 is a flat list of questions a person reads. What is wanted is a
**branching interview**: answer *from above* and it never asks about 3D lighting; answer *the world
does not end* and it stops asking about endings and starts asking who you keep coming back to.

The two questions that must lead it are settled and written (§0½ *does your world end?* and §0¾ *how
do people see your world?*), because between them they decide the story shape and every drawing.

**What makes this different from everything else on this board:** it is the first thing here where an
agent would be talking to **somebody who is not the owner** — a person who wants a game and has never
heard of this repository. Different job, different care. `docs/SOURCES.md`'s tagging and the plain-
words rule matter more there, not less.

| Option | What it costs |
|---|---|
| **Leave it as a doc** ← *today* | nothing. A person reads a list and answers what applies |
| A written decision tree in the doc | small; a human can follow it, and it is what an agent would need anyway |
| An agent that runs the interview and writes the pack skeleton | real work, and it wants the decision tree first |

---

## A9 · Quests have no identifiers — the options, costed
**Status: options costed 2026-09-10, recommendation taken, nothing built yet.**
**GitHub #153 · `docs/TAGS.md` L9 · `docs/OPEN.md` calls it "the largest single blocker to a template."**

`[OWNER]` *"ok try the proof pack sure and start naming quests"* (2026-09-10).

`[CODE]` Ground truth, every line verified against the code and this repo's git history rather than
inferred — several long-standing assumptions turned out to be wrong:

- **56 quests**, `content/meridian/quests.en.js` / `.es.js`. A quest object carries exactly five keys:
  `npc, title, late, start, nodes`. There is no id, and the key set never varies across all 56.
- **Adding a field is 56 line-heads per language, not a re-authoring.** Each file has exactly 56 lines
  beginning `` {npc:``. This is the single most important cost fact here and it has been assumed the
  other way round every time this came up — "180 KB per language" is the file size, not the edit.
- **The array has only ever grown by append.** Verified: `ab1e519` = 24 quests, `27429f2` = 56, and the
  first 24 titles are identical in the same order. Nothing has ever been inserted or reordered.
- **EN and ES titles share no slug — 0 of 56 match**, and titles are **player-editable at runtime**
  (`labData`/`applyText`, `engine/engine.js:4006–4011`, persisted to `SK("text_"+lang)`).
- **Three** stores are keyed by array position, not one: the save (`d`, `qa`, `mk`, `:413`), the record
  (`dlog[].qi`, `:4043`, in its own key `clearSave()` never touches), and the Text Lab's overrides.
- **A ceiling nobody had named:** `sanitizeSave` clamps quest indices to **0–98** (`:442`, `:445`,
  `:452`). Registered separately as `docs/TAGS.md` L18 — it is its own problem.

| Option | What it costs | Note |
|---|---|---|
| **A · A parallel id table** (index → name), arrays untouched | one content array; no engine change; no save change | Names positions without owning them. An insertion still renumbers the table *and* every save — a vocabulary, not a fix. `[TRAINING]` It is the shape A1 already refused: two sources of truth for one fact |
| **B · `id:` on each quest, arrays kept, ids resolved at boot** ← *recommended* | 56 mechanical line edits per language; one resolver; `shape()` extended; one new save field | **The only option that ships red-first in one change with no migration.** Content refs (`CHAPTERS[].quests`, `GROWTH.staged.quests`, `wardrobeQuest`, `WNPC[].q`) take ids *or* numbers, normalised once at boot, so all 17 index-consuming engine sites keep receiving numbers and are never touched |
| **C · Quests become an object keyed by id** | both files restructure in lockstep; ~17 engine sites and ~10 test literals break at once; `gradeAll`'s `Object.keys(marks).map(Number)` (`:291`) silently yields `NaN`; a real save migration | Its genuine advantage: EN/ES key drift becomes **structurally impossible**. Worth having — not worth having *first*. It is B plus a migration, and B is what unblocks the template |
| **D · Ids generated from the title slug** | nothing up front, then everything | **Refused, and the refusal is the point of writing it down.** `[CODE]` 0 of 56 EN slugs equal their ES slug, so the two languages would carry two different id sets for the same quests — and `applyText` lets a *player* rewrite any title at boot. **An id that changes when a player edits text is not an id.** Slugging the EN title once, by hand, frozen as a literal, is Option B with a naming convention |
| **E · Do nothing; enforce append-only with a test** | one test | It would have been green for the entire history, so it proves nothing new — but it costs nothing and it guards B's key assumption. **Worth doing as B's guard rail, not as B's alternative** |

### Why this ships in one change with no migration

Because of the history above: every save ever written already means what an id map would say it means.
That turns the change from a **backward repair** into a **forward guarantee**:

1. **Red first.** Extend `shape()` (`test/smoke.js:183`) to require `q.id`, plus missing / duplicate /
   EN≠ES checks. It fails on today's code — which is what `docs/OPEN.md` §4 demands.
2. `id:"…"` on 56 lines per language, same ids both sides. Mechanical.
3. One resolver; the four content reference lists accept ids or numbers, normalised once at boot.
4. The save keeps `d`/`qa`/`mk` as indices. **Nothing migrates.** The 0–98 clamps stay as they are.
5. One new save field — `qo`, the id order this save was written against — and on load, remap only if
   it is present and differs. Every save that exists has no `qo` and is read exactly as today, which
   is **correct**. `[CODE]` The precedent is in the file already: the `SV.v===undefined` block (`:5055`).

**The caveats, on the row and not in a footnote:** saves written before this ships are index-safe only
until the first insertion — an argument for shipping it **before the next quest is written**, not for
making it bigger. `dlog` (`:4043`) and the Text Lab overrides (`:4010`) are two more positional stores;
each is one line and each is its own row, not this one.

---

## A10 · Why this is plain JavaScript and not Unreal
**Status: answered 2026-09-11. The decision was never written down, which is why it keeps being asked.**

`[OWNER]` *"also how come we dont use a tool like the unreal engine again?"* — and the *again* is the
point: this has been decided by accretion and never recorded, so nobody could look it up.

### The fact that decides it

`[WEB]` **Unreal has no supported web export.** Epic dropped HTML5/WebGL after **UE 4.24** and UE5
has never shipped a browser target; what exists is experimental community work over WebGPU/WASM.
Epic's own framing was commercial — they did not want to fund it.
([Epic forums](https://forums.unrealengine.com/t/does-html5-export-work-for-unreal-4-27-and-5/503734) ·
[the deprecation thread](https://forums.unrealengine.com/t/html5-deprecation-sadness/130748) ·
[The New Stack, on third-party tools](https://thenewstack.io/a-new-tool-for-unreal-engine-developers-to-export-to-the-web/))

**That single fact ends it**, because the distribution *is* the product here. `[CODE]` This game is
**18 files, 1.8 MB** — and 596 KB of that is three.js, so the game itself is about 1.2 MB. It is a
link you open on a phone, it installs as an app, and it runs on a plane. An Unreal build is a
download and an install, per platform. **You cannot give somebody a gift they have to install a
launcher for.**

### The three reasons that would still hold even if web export came back

| | |
|---|---|
| **A pack is a folder of text files** | The whole product is that a second game is *content*, not a fork. `docs/GAUGE.md` measures that; `docs/TAGS.md` guards it. In Unreal a level is a binary `.umap`, and "your gift is an afternoon of filling in a pack" stops being true |
| **An LLM can read all of it** | `[CODE]` 6,135 lines of plain JS. Claude reads the whole engine, edits it, runs the suites, takes the screenshot and looks at it. Unreal's assets are binary `.uasset` and Blueprints are binary graphs. **Everything built this week — `/crew-fix`, Melo planting violations, the gauge, red-before-green — would be impossible.** The stack was chosen before that mattered and it is now the reason the method works |
| **It is the wrong thing to be good at** | `[OWNER]` The stated goal is AI-delivery work. What is employable in this repo is the **judgment**: the registers, the decision log, the security write-up, red-before-green. Unreal would make him a junior Unreal dev competing with people who have ten years in it |

### What Unreal would genuinely win, said plainly rather than dismissed

Real lighting, shadows and materials — which is `docs/3D-LOG.md`'s standing goal, pursued by hand at
the moment. Physics for free, which `docs/GIFTED-GAMES.md` lists as a gap. Animation tooling. If the
ambition were ever a downloadable premium title rather than a link, the maths changes.

### The honest alternative is not Unreal

| Option | What it costs | Note |
|---|---|---|
| **Stay** ← *taken* | nothing | 18 files, a link, offline, and an engine an AI can read end to end |
| **Push three.js further** | real work, no migration | Already vendored and running. Shadows, better materials and lighting are available **without leaving the web** — this is where `3D-LOG.md`'s goal actually lives |
| **Godot**, if this is ever outgrown | a rewrite | The real door: a *working* HTML5 export, small builds, open source, and **scene files are text** (`.tscn`), so the AI-readable property survives. `[TRAINING]` This is the one to look at first if the answer ever changes — not Unreal |
| **Unreal** | the product | No web target, binary assets, a download to install. It would buy rendering and cost the thing that makes this giftable |

**The rule underneath, and it is the same one this project keeps rediscovering:** the constraint that
decides an architecture is rarely the one people argue about. Everybody argues rendering. **The
constraint here is that somebody must be able to open it on their phone from a message.**

---

### A10½ · What moving to Godot would actually take
*Asked 2026-09-11: "what would it take to use godot and what would be the steps and benefits, and downfalls?"*

`[WEB]` Godot 4 does have a real web export — `index.html` plus `.wasm`, `.pck` and `.js` — and it
generates a **service worker and an offline page**, so the installable-PWA property survives. Any
browser with WebAssembly and WebGL 2.0 runs it.
([Godot web export docs](https://godotengine-godot-47.mintlify.app/deployment/web) ·
[export guide](https://www.summerengine.com/blog/godot-web-export-guide))

#### The steps, honestly ordered

1. Install Godot 4.x and the web export templates. *(an afternoon)*
2. **Rebuild the world model.** `WORLD_DEFS` is rows of glyph strings; Godot wants a `TileSet` and
   `TileMap` nodes. Every map in both packs is re-authored. *(days)*
3. **Rewrite the engine.** ~6,100 lines of JS → GDScript: movement, quests, chapters, growth,
   seasons, the reader, the character creator, the record, the trolley. *(weeks)*
4. **Redo the save layer** — `sanitizeSave`, `STOREPFX`, and the QR transfer, which is bespoke.
5. **Rebuild every test.** See the downfall below; this is the one people underestimate.
6. **Re-establish the pack seam** so a second game is still content and not a fork.

#### What you would genuinely gain

Real physics without writing any. Animation, tilemap and scene tooling instead of hand-drawn
canvas. A proper scene graph. **And the AI-readable property survives** — `.tscn` scene files and
GDScript are both text, which is why Godot is the honest door and Unreal is not.

#### The downfalls, and the first two are decisive

**1. The renderer you would be moving FOR is the one web export does not give you.**
`[WEB]` Godot 4 ships three renderers and they are **not tiers of one thing** — Compatibility is the
Godot 3 renderer forward-ported, a separate code path, not a "lite mode". Web builds get
Compatibility. What lives only in Forward+, and therefore **cannot reach a browser**:

| Forward+ only | what it is |
|---|---|
| **SDFGI / VoxelGI** | real-time global illumination — light bouncing off surfaces |
| **Volumetric fog** | light you can see the shape of |
| **SSR** | screen-space reflections |

And the one that bites hardest for a world with a day/night cycle: `[WEB]` **Compatibility is limited
to ONE directional light, and a maximum of eight omni or spot lights affecting any single object**,
because it uses a UBO rather than Forward+'s clustered light grid — which carries hundreds of lights
with no per-object limit.
([Godot renderer docs](https://docs.godotengine.org/en/stable/tutorials/rendering/renderers.html) ·
[a technical comparison](https://slicker.me/godot/renderers.html) ·
[the Compatibility issue tracker](https://github.com/godotengine/godot/issues/66458))

So `docs/3D-LOG.md`'s standing goal — *"a pixel world that obeys real light and real depth"* — is
asking for exactly the bucket that stops at the browser door. **That is the case collapsing on its
own terms.** `[TRAINING]` One caveat stated rather than hidden: sources disagree about whether SSAO
survives in Compatibility, so do not plan around it either way without checking the version you would
actually ship.

**2. Every test you own would have to be rewritten, and the method with them.**
`[CODE]` All seven suites drive the real game through `page.evaluate()` and read its own globals —
`WORLDS`, `TRO`, `T3`, `camSet()`, `sanitizeSave()`. **A wasm build has no JS globals to read.**
The gauge, R10, `test/bump.js`, Melo planting violations, Chava riding the trolley, every "I measured
it rather than reasoned about it" in this repo — all of it rests on the game being readable text that
an agent can poke at from outside. That is not a port. **It is starting the quality practice again
from nothing**, and the practice is the part that is worth something.

**3. Size — and it is a first-impression problem, not a technical one.** `[WEB]` A stock Godot web
build ships a **~33 MB `.wasm`**; the ~2.4 MB figure people quote needs a custom engine build with
modules stripped, which is its own project.
([size optimisation write-up](https://amann.dev/blog/2025/godot_web_size/)) `[CODE]` This game is
**1.8 MB total, 18 files.**

Nothing *breaks* at 33 MB. GitHub Pages' limits are far above it, the browser will cache it, and on a
laptop nobody notices. **What breaks is the gift.** `docs/GIFTED-GAMES.md` measured the whole product
at forty minutes of attention across its entire life, opened from a message on a phone. Ten or twenty
seconds of blank screen and a progress bar, on someone else's data, before anything appears — **that
is where a present dies, and it is the one moment the format cannot afford.** `[TRAINING]` The wasm
compresses substantially over the wire and this has not been measured for a real build; the argument
does not rest on the exact number, it rests on there being a wait at all where today there is none.

#### The answer

**Not now, and the trigger is specific rather than a feeling.** Move if — and only if — the product
becomes one where *physics and animation are the point* and a 2.4 MB download is acceptable. A gifted
game that opens from a message is not that product.

**And there is a cheaper 80%.** `[CODE]` three.js is already vendored and running; shadows, better
materials and real lighting are available inside it, at a fraction of the cost, without touching the
tests or the packs. `docs/3D-LOG.md`'s goal lives there. **Before anyone prices a migration, price
that.**

---

## A11 · What replaces the pressure in a calm game — undecided, and the options are costed
**Status: deferred, 2026-09-11. Nobody has decided this and nothing is being built from it.**

**Why it is here and not in a plan:** the owner asked for a *"chiller"* cooking game
(`docs/ASKS.md` 2026-09-11) and then asked for the research to be filed rather than built. So this
row exists to stop the same question being answered from taste three times.

**The evidence that makes it a real decision rather than a preference.** `[WEB]` Cook, Serve,
Delicious! 3 shipped a Chill Mode that removes customer impatience and walkouts — and the studio, a
decade into the genre, **could find nothing to put in the hole and capped the medal at silver
instead.** That is an admission that the score was the content.
(https://www.thexboxhub.com/cook-serve-delicious-3-review/) **Removing a timer is half a design; the
other half is not optional.**

**The options, from `docs/GENRE-RULES.md` R1–R5, cheapest first for THIS engine:**

| Option | What it costs us |
|---|---|
| **Reading a person** — the made thing IS the reply, and what you made changes what they say next | `[CODE]` Cheapest. `INTERVIEW` is already *"questions with no right answer"* (`engine/engine.js:208`, `:214`). A pack-level table mapping made-thing → line. **No RULE.** |
| **Comprehension** — the recipe is incomplete and you reconstruct it | Cheap. The reader already draws a labelled blank and takes real forms (`docSections` `engine/engine.js:2962`, `docOpen` `:3082`). **No RULE.** The cost is writing and research, which is not small |
| **Unrushable duration with abundance** — a thing that takes as long as it takes, and there is always more | A content rule and a trigger. Nearly free; `petalMomentTick` (`engine/engine.js:1224`) is the primitive and is welded to petals — the same unwelding `docs/GIFTED-GAMES.md` §5 already ranked cheapest |
| **Fit** — a light spatial constraint that yields instead of punishing | **Expensive. Needs the inventory we do not have** (`[CODE]` grep "inventory" in `engine/engine.js` → 0 hits). Same gap `GIFTED-GAMES` §4 ranked first. Only buy it if the owner's answers point at it |
| **Tactility** — the stroke, the pour, judged on two or three objects | The 3D half of the owner's own ask. Spend it LAST. `[WEB]` Nour is the control case: remove the timer, add only tactility, and you get twenty beautiful minutes |

**Refused in advance, and the refusals are the useful half:**
- **A day budget.** `[WEB]` Chef RPG is the case — warm art over a clock that never counts down in
  front of you, it just makes every action cost something scarce. This is the most likely way we fail
  because we can produce the warm half convincingly.
- **A collection / unlock ladder as the reward.** `[TRAINING]` The sweep's decoy; it is what turns a
  calm game into a chore list.
- **Reaching for the hearts toggle.** `[CODE]` `STK()` (`engine/engine.js:330`) defaults to
  `{mode:"none"}` and `stakesCfg()` (`:333`) reads stakes **per chapter**, so *"a calm world with
  exactly one scored thing in one district"* is **already a seam, not a rule change**. That makes it
  easy to reach for and it is not an answer to this question — it is a way of not answering it.

**What would settle it:** the owner's own answers to the six cooking questions in
`docs/research/2026-09-11-cooking-games.md` §6 — in particular *"what's the nicest part of cooking
for you — the chopping, the smell, the waiting, or the face they make when they eat it?"*, which
selects between five games that look identical in a one-line pitch. **Nobody should pick for him.**

---

## A12 · The ride is one function and a shape, and it is meant to be replaced — 2026-09-12

*The owner, having ridden it: **"well its ok, i dont see anything about me riding it other than
selecting another stop. for now it is ok, but architecture should be ready to edit again. we will
prepare for next reset with that."***

**He is right and the verdict is fair.** What shipped is a cut with a bell on it: you pick a
destination, the car you are standing at takes you, the street goes past at `RIDE_ZIP` and the world
changes at the end of the line. From the seat, that is a slightly longer menu. Nothing asks anything
of you between boarding and arriving, which is the whole of what "riding" would mean.

**This entry exists so the next session does not have to re-derive where the seams are.** Nothing
below is built.

### What the ride is today, precisely

| Piece | Where | What it decides |
|---|---|---|
| `RIDE` | `engine/engine.js` | one object: `{on, phase, t, held, to, fromW, fromX, fromY}` |
| `rideCan()` | same | may this world ride at all — a line with platforms |
| `rideStart(d)` | same | the bell, the car snapped to your platform, `RIDE.to` = where you asked for |
| `rideUpdate(dt)` | same | the phases: `bell` → `zip`, the brake, `RIDE_STUCK` |
| `troTick(dt)` | same | THE ONE ENTRY POINT. `loop()` calls only this; it chooses between the timetable and a ride |
| `rideArrive()` | same | the world change, through `worldArrived()` like every other arrival |
| the hero | `troTick` | `fx`/`fy` ride the car, `px`/`py` never move — the draw position and the grid position are different things and that is what makes the whole thing cheap |

**The three lines that would have to change and no others**, for any version of a richer ride:

1. `rideUpdate`'s phase machine — `bell` and `zip` are two strings in one `if`. A third phase costs
   a branch.
2. `troTick`'s two-line body — everything a ride does to the world happens there.
3. `rideArrive()` — the only writer of the world change.

### What is deliberately NOT a seam yet, and why that is the honest state

- **The ride always runs to the END of the line.** A line does not know which of its stops answers to
  which `TRV` destination. That needs one more fact in the pack — a stop that names a world — and it
  is the first thing to put to the owner, because it changes the shape of `stops`.
- **`RIDE_ZIP`, `RIDE_BELL`, `RIDE_STUCK` are engine constants.** Not pack keys, because `troAudit`
  refuses a line that declares a word no reader exists for, and a `ride:` key with no seam behind it
  would be a promise the engine does not keep (`docs/TAGS.md` L16).
- **There is no `onRide` hook.** Adding one before anybody knows what would hang off it is how this
  repository got four mechanisms for one job the last time (`A5`/`A7`).

### The options, ranked by what they cost the owner

| Option | What it costs | What it buys |
|---|---|---|
| **Leave it.** A ride is transport with a bell | nothing | it already works and he said "for now it is ok" |
| **Something to look at** — the street named as it goes by, a stop called out, the conductor's line | one phase and two strings a pack declares | it stops being a menu without becoming a mechanic |
| **Something to do** — a quest node that only exists on the tram | a `RIDE` phase that can open a card, and a rule about what happens if you arrive mid-conversation | his own earlier idea: *"itd be fun to ride it and have a quest or game inside it"* |
| **Stop at the destination's platform** | a new fact in the pack — see above | the ride becomes a journey with a destination rather than a line with an end |

**The recommendation, when he comes back to it:** the second row. It is one phase, it is reversible,
and it answers the actual complaint — *"i dont see anything about me riding it"* — without inventing
a mechanic nobody has asked to play twice.

---

## A13 · The ride, part two — the rider reads as luggage, and the driver is five pixels wide · 2026-09-12

*The owner, having ridden it again: **"i think its a bit of an animation and eventually something to
do. does that make sense yet? so like now it looks fine except it appears as if the character is just
laying down on it. there should be a rail infront of him. i still cant see the driver. dont build,
just plan."***

**NOTHING HERE IS BUILT.** This is the plan and its causes, so the next session does not spend an
afternoon rediscovering them.

### First: A12's open question is answered

> **"a bit of an animation and eventually something to do"**

That is A12's option 2 now and option 3 later, in his own words, and it settles a question that had
been open since the ride shipped. **Build the animation. Do not build a mechanic.** The quest-on-the-
tram idea stays filed and stays unbuilt until he asks for it by name.

*"Does that make sense yet"* — yes, and it is a better answer than the one I recommended, because it
says what the ride is FOR. A ride is a held beat. It is not a menu with a delay and it is not a
mini-game; it is the thirty seconds where the town goes past and you are not steering. Everything
below serves that and nothing below adds a verb.

### The three faults, with the cause read rather than guessed

| # | What he saw | The actual cause | Where |
|---|---|---|---|
| 1 | *"the character is just laying down on it"* | `troDraw2D` is called **before the actor depth pass** — a flat layer under everything. So the hero, a standing figure, is painted over the whole car body on the same tile. Nothing is in front of him because nothing ever can be | `engine.js`, the two `troDraw2D(world,…)` call sites, and the `R.push({d:…})` depth loop under them |
| 2 | *"there should be a rail infront of him"* | there is no near side to the tram at all — `drawTram` paints body, trim, three windows, a strip, wheels, a lamp, and stops | `drawTram` |
| 3 | *"i still cant see the driver"* | **two different answers, and the first one is the embarrassing one.** In the 2D cameras *there is no driver* — `drawTram` has no figure in it. In 3D there is one, correctly placed at the leading end, standing on an open cab **0.15 tiles wide — about five screen pixels** between the body box and the end glazing | `drawTram`; `engine3d.js` `T3.tramDriver` |

**Fault 3 is the sugar skull again, exactly.** A thing that is really there, correctly placed, and a
handful of pixels wide in a recess. That took four attempts because three of them changed its size.
**Do not change the driver's size.** See the traps below.

### The plan, in order, and the first item fixes two of the three

**1 · The tram joins the depth pass instead of being a layer under it.** *(the structural one)*

This repo already does exactly this for a shopfront: la ventanilla's counter is pushed at depth
`y+0.7` so that it lands **after** the person at `y+0.55` and her legs are behind it. The tram wants
the same treatment — a far half at the row's depth and a **near half after the actors**.

Then fault 1 and fault 2 are one change: the near side *is* the rail. The rider stops being painted
over the car and starts being inside it, in every 2D camera, for free.

Cost: one sitting. Risk: the tram is currently drawn by one function called from two places; splitting
it into far/near is the whole job and it is mechanical.

**2 · The near side is the thing you see, so it is what should be worth looking at.** A waist-high
rail, the window mullions, and the lower body panel. A hand on the rail if the rider is the hero.
This is the "animation" half of his answer: a ride is a held beat, so the one thing in front of you
for those seconds should reward looking at it.

Cost: one sitting of art. **Pili should direct this and Rigo should say what a real car has at waist
height**, because between them they already established that the cabs are decoration and the bell is
the warning, and both facts constrain what may be drawn here.

**3 · The driver becomes visible by being given somewhere to stand, not by being made bigger.** The
cab is 0.15 tiles. The options, and only the first is likely right:
- **widen the cab** — move the body box in, so the platform he stands on is a real platform. Changes
  the tram's proportions, which is a Pili and Rigo question, not a programmer's;
- put him **in the end glazing** rather than behind it;
- give him a **silhouette that survives five pixels** — a cap brim and a shoulder line, the same
  trick the window sill's ledge used: a hard horizontal edge survives what a small shape does not.

And in 2D he has to exist at all. One figure at the leading end of `drawTram`, mirrored with
`TRO.dir` — Rigo's canon is one driver at one end and no reversing, and the mural's `murTram` helper
already has `driverAt` doing precisely this, so the shape is settled and only the drawing is missing.

### The traps, written down because two of them have already cost days here

1. **Do not fix the driver by resizing him.** That is the sugar-skull loop: four rounds, all measured,
   all defensible, all wrong, because the fault was never a dimension. He needs a *place*, or an
   *edge* — a cap brim reads at five pixels and a face does not.
2. **Do not fix the rider by moving him up the tile.** It would look better and it would still be a
   figure painted over a vehicle. The noun is *occlusion*, not *position*.
3. **Do not add a verb.** He asked for an animation and said the something-to-do comes later. A quest
   node on the tram is A12 option 3 and is still unbuilt on purpose.
4. **Whatever is built, look at it.** Every fault in this entry was found by rendering the thing and
   looking at it, and every one of them passed a suite that was green at the time.

### What is still his

- **Does the tram get wider?** Widening the cab so the driver has a platform changes the car's
  proportions on a street he has already signed off. That is a look decision and it is his, via Pili.
- **Whose ride is it?** The rider is drawn as the hero. If a ride is eventually *something to do*,
  the person at the rail might be somebody else's back and the hero's hand on the rail in the
  foreground — a different camera entirely. Worth knowing before the near side is drawn, because it
  decides whether the near side is a rail seen from outside or from inside.
