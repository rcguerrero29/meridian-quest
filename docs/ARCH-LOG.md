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

### A3½ · Where the line actually is — 2026-09-17

**Owner: *"we can set a destination to remember where we meant to go."*** The engine had already
decided he could not: the comment above `mapDest` reads *"never saved … a saved one is the list A3
bans, wearing a compass."*

**That comment overreached and A3 never said it.** The banned thing above is *a list of what you have
not done yet* — generated by the game, ranked, growing. **One destination that you set yourself is
none of those.** It is not produced by the game, it does not grow, and `destCheck` spends it the
moment you arrive. It is a bookmark, not a backlog.

**So the boundary, written down now rather than argued again later:**

> **One pin, yours, saved. The day a second pin is wanted, that is a NEW decision — not an extension
> of this one.**

And the reason the line sits exactly there is not taste. `[WEB]` The ToCHI survey of game cartography
interfaces (`docs/research/2026-09-17-the-map-again.md` R1) says persistence is precisely what turns a
map you *consume* into a surface you **plan** on — and a planning surface with several pins on it is
the list above with a nicer name. **The character of the interface changes at the second pin**, which
is where A3's ban now starts.

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

### A13½ · His answer to the driver problem, and it is better than mine · 2026-09-12

> **"why dont you make the characters smaller? its not like we dont do that already where buildings
> are larger in the inside. this is the vehicle looks smaller on the outside but looking in the
> characters look smaller."**

**Take this one. It is right, it is cheaper than every option in A13, and it is already law here.**

#### Why it is already law

Doña Cuca found the same fact from the other end on 2026-09-12 and filed it as a contradiction she
had been carrying without noticing: **every house in this town is ONE tile of frontage with a
twenty-by-seventeen room behind it.** The interior is bigger than the block it stands in and nobody
has ever complained, because a player reads an interior on its own terms.

**He is pointing out that this is a SCALE SEAM, not a bug, and it runs in both directions.** A
building is bigger inside than out. A vehicle is smaller inside than out. Both are the same rule:
*what you see through an opening is drawn at the scale that lets you read it, not at the scale of the
opening.*

That is worth naming, because it is a rule a second game gets for free and nobody had written it
down:

> **THE APERTURE RULE.** The scale of what is behind an opening is a property of the *view*, not of
> the *world*. A room may be larger than its door. A passenger may be smaller than the car. The
> player never compares the two and will not thank you for making them agree.

#### What it does to A13

A13 listed three options for the driver and recommended *widening the cab*, which would have changed
the proportions of a tram on a street the owner had already signed off. **Withdraw that.** The cab is
0.15 tiles; the answer is not a bigger cab, it is **a smaller person in it**, drawn at a reduced
scale so that a WHOLE figure fits — head, shoulders, torso, a hand on something — instead of a
head-and-shoulders cropped into five pixels.

**A whole small person reads. A cropped normal one does not.** That is the same finding as the window
sill's ledge, stated about figures instead of stone: a complete silhouette survives being small; a
fragment of a big thing does not.

The same applies to the rider. At a reduced scale the hero fits *inside* the car with the rail in
front of him, instead of being a full-size sprite lying across the roof.

#### The seam this needs, and it is one number

Not a special case for the tram. **A `ride` scale on the vehicle, read by whatever draws a person who
is in it** — the same shape as `lift` on a tile. A pack that wants a bus, a boat or a lift declares
its own and gets the same behaviour; a pack that declares nothing draws people at full size and is
byte-for-byte unchanged.

Open: whether it belongs on the vehicle (`TROLLEYAT[].ride`) or is an engine constant like
`TRO_SPEED`. **Toño decides that one** — it is exactly his question, and `docs/TAGS.md` L16 says
declaring nothing is safe and declaring half is what hurts.

---

### A13¾ · The pivot: who is riding · 2026-09-12

> **"we may have others ride the tram one day but me for now. can we architecture this pivot one
> day?"**

**Yes, and it costs nothing today if the seam is put in the right place now.** The whole of the
change is that the engine currently knows *the hero is on the tram* when what it should know is
*there is a list of who is on the tram, and today it has one entry*.

#### What exists now

`RIDE = {on, phase, t, held, to, fromW, fromX, fromY}` — a single object, and the rider is implicit:
`troTick` sets `fx`/`fy` to the car and everything follows from that.

#### What the pivot needs, stated so it can be costed

| | Today | After the pivot |
|---|---|---|
| who is aboard | implicit — it is you | `RIDE.aboard = [{who, seat}]`, and you are `aboard[0]` |
| where they are drawn | `fx`/`fy` follow the car | each rider drawn at their `seat` along the car, at the ride scale |
| who may board | only `rideStart` | anything that can be told to board — an NPC waiting at a stop, a dog that follows you |
| what a rider does on arrival | `worldArrived()` for the hero | the hero arrives; a passenger gets off and goes back to being an NPC |

**The seat is the only genuinely new idea**, and it is small: a position along the car, 0..1, so two
riders do not stand in each other. A car has three windows already; three seats is the obvious first
answer and Rigo should say whether it is the right one.

#### What NOT to do now

**Do not build the list today.** A one-entry list with no second case is four mechanisms for one job
waiting to happen — the exact mistake `A5`/`A7` records. What to do *today*, when the near side is
built, is smaller and sufficient:

> **Draw the rider from a `who`, not from the hero's globals.** One function, `rideDraw(who, seat)`,
> called once with the hero. The day a second passenger exists it is called twice and nothing else
> changes. That is the entire pivot, bought for the price of a parameter.

---

### The follow-up questions, which are his and are genuinely blocking

*He asked to be asked. These are the ones where two different answers produce two different builds,
so guessing costs a rebuild rather than a tweak.*

| # | Question | Why it changes the build | My recommendation |
|---|---|---|---|
| 1 | **Is a ride seen from OUTSIDE the car or from INSIDE it?** Outside: you watch a small figure at a rail go past. Inside: the rail is in the foreground, close, and the town goes past behind it | This decides everything drawn on the near side, and the two share almost no art | **Outside**, for now. It is the camera the game already has, and "inside" is a second camera that would need its own everything |
| 2 | **Does the rest of the town shrink too?** If the passenger is drawn small, is that scale only for people inside vehicles, or is it a general aperture scale that a shop interior could also use? | One is a tram feature; the other is the engine rule named above, and a second game inherits it | **The general rule**, named and documented, used in one place. Rules are cheaper than special cases and we have the evidence |
| 3 | **Does anything happen on the ride, or is it purely to look at?** He has said *"a bit of an animation and eventually something to do"* — this asks how long *eventually* is | If something happens later, the near side may want to be a surface things can appear on | **Nothing yet.** Build the beat; let it be boring on purpose for a while and see whether you miss it |
| 4 | **Who is the second passenger, when there is one?** A named neighbour going somewhere, a stranger, or your dog? | It decides whether a passenger needs a reason to be aboard — a neighbour needs somewhere to be going | **Your dog first.** He already follows you through doors; the tram is the one door he cannot follow you through, and that is a bug shaped like a feature |
| 5 | **Is the driver a person we know?** | If he is somebody, he wants a name, a face in `NPCLOOK`, and eventually a line. If he is nobody, he is a silhouette and stays one | **Ask Nacho before drawing him.** Rigo has already established what he DOES; whether he is anyone is a story question |

### A13 — SIGNED, 2026-09-13. The five answers, in his words.

*He answered all five the next morning. They are recorded here as decisions, not as preferences, and
the build order underneath them follows from the answers rather than from what is interesting.*

| # | Question | **His answer** | What it settles |
|---|---|---|---|
| 1 | inside the car or outside it | **"for now, from outside the car"** | The near side is a rail seen from OUTSIDE. One camera, not two. A small figure at a rail goes past you — you are not sitting in it looking out. **Do not draw an interior.** |
| 2 | vehicle-only scale, or the general rule | **"general rule sounds good"** | **THE APERTURE RULE is law.** Named, documented, used in one place today. A second game inherits it. A room may be larger than its door; a passenger may be smaller than the car |
| 3 | does anything happen on the ride | **"not yet"** | The ride is a held beat and stays one. **No quest node, no conversation, nothing to press.** Build it and let it be boring on purpose for a while |
| 4 | who is the second passenger | **"sure the dog first"** | When the pivot happens, it is **your dog**. He follows you through every door except this one, which is a bug shaped like a feature. It also means the second passenger needs no reason to be aboard, no name and no dialogue — the cheapest possible proof the seam works |
| 5 | is the driver anyone | **"yeah ask nacho please"** → **NACHO ANSWERED 2026-09-13: nobody, on purpose** | **He is a uniform, not a neighbour.** No name, no `NPCLOOK` entry, no line, no ❗. See `docs/STORY.md` ❗El chofer for the three structural reasons — the strongest being that **he is the only person in Meridian who would have been to Barrio Norte**, and the window is signed as the only surface for that promise |

#### The build order these answers produce

1. **The tram joins the depth pass** (A13 item 1). Fixes *"laying down on it"* and *"a rail in front
   of him"* as one change, in every 2D camera. Unaffected by all five answers — do this first.
2. **The aperture rule**, as one number read by whatever draws a person in a vehicle (A13½). Answer 2
   makes it a rule rather than a tram special case; answer 1 means it only ever has to look right
   from outside, which is much easier than making an interior read.
3. **The near side is drawn** — rail, mullions, lower panel — with Pili directing and Rigo saying what
   a real car carries at waist height. Answer 3 means it does not have to support anything appearing
   on it later, so it may be solid.
4. **`rideDraw(who, seat)`** — one function, called once with the hero (A13¾). Answer 4 names the
   second caller when it comes, and it is a dog, which needs no seat semantics beyond standing still.
5. **The driver**, after Nacho answers. Answer 5.

#### ❗El chofer — what to draw, and the one thing to fix before drawing it

Nacho's answer is *nobody*, and nobody here means **a livery**, not a blank. Three parts, in the
order of how much each buys:

| What | Why it reads at five pixels | State today |
|---|---|---|
| **The cap brim** — a hard horizontal edge over a head | A13's own finding about the sill's ledge, restated: *a hard horizontal edge survives what a small shape does not.* A brim reads; a face does not | **Already built** (`engine3d.js`, the cap box above the head) — the right idea, never made legible |
| **A gold band at chest height**, the same `#E0A430` as the car's trim and the door lamp | You read *"the tram has its crew on it"*, not *"a person in a tram"* | not there — the shoulders are one flat colour |
| **The hand comes off the power when something alive is on the rails** | Rigo's canon as animation instead of prose: *"I wrote them up for sounding and not coming off the power."* The states already exist — `TRO.state` is `run`, `dwell`, `hold` | not there, and **it is the cheapest storytelling on this vehicle.** A player on their fifth ride notices the hand move before they notice why |

**Two things the livery must not include:** no fleet number (one car on the line is signed, and a
number implies siblings that will never exist), and **no face detail at any scale** — A13's trap 1 is
that the driver's problem was never a dimension, and a face is exactly what will tempt the next four
attempts.

> **ITEM ZERO of the sitting that draws him, before a line of art is written.**
> `engine/engine3d.js` carries a comment saying the driver *"turns round with it when it reverses"*.
> **The tram does not reverse** — the direction is computed once a pass and never flips. **It is the
> same wrong belief that produced the two decorative cabs**, it is sitting in the exact file the next
> session will open to draw this driver, and it will re-teach the mistake. Nacho found it and asked
> for it to be corrected in that sitting rather than as its own ticket. Do that.

*(Not corrected today because the owner said plan, not build, and a comment in `engine/` still costs a
version bump in both packs. It is two lines and it goes first.)*

#### What these answers take OFF the table, which is the more useful half

- an interior camera for the tram
- a tram-only scale hack
- a quest, a conversation, a minigame or a button on the ride
- a passenger list, seats, boarding rules or a queue at the stop
- a named driver, a driver's face, or a line from the driver — until Nacho says otherwise

**Five decisions, and four of the five say "less".** Worth noticing: every one of them makes the build
smaller than the version I had planned.

## A14 · The tram livery — a wardrobe for the car, chosen at the mechanic shop · 2026-09-13
**Status: designed, not built, and two questions are the owner's.** Raw returns: `docs/meetings/2026-09-13-la-cuadrilla-disena.md` (Beto, Rigo, Pili, Tavo). The owner's words: *"lets fix the design of the trolley further. give it customization abilities, maybe at the mechanic shop for meridian and figure out how to tie that into our engine."* — with a photograph of a heritage car: maroon below, a cream band around the windows, brass lamps, a pole.

### The finding that reorders the job (Rigo, Pili, Beto — independently)
**The car has one colour.** Body `#B0563A` and "trim" `#8E4230` are the same hue, about Δ23 of 255 in luminance — invisible at the 64 × 32 px the car ships at. His photograph's maroon-to-cream is Δ123. **The band was never missing from the menu; it is missing from the tram.** Of the seven things in the photograph the car has two, and the two draws have already drifted (a gold bar only in 2D, two wheels in 2D and four in 3D, end glazing only in 3D, two wheel colours). A livery table with keys nobody reads is the "loud word" fault the engine already guards against one screen away. **The paint goes on after the parts exist** — and the parts are A13's build order, none of which is built.

### The seam (Beto) — the wardrobe's shape, exactly
- **RULE, engine:** the car's colours come from one table and every camera reads it (`troCol`), with the engine's default byte-identical per camera to today (two wheel keys, because they differ today). `save()` gains `tl`; `sanitizeSave` gains a nullable livery, null meaning the default, so an old save and a `#save=` link from before the feature render as today's car. Enum keys are enforced in the draw, not the sanitiser (the house pattern).
- **CHOICE, pack:** `TROLOOK` in `config.js`, shaped like `WEAR`: `def`, the option lists, and **`badge` as a painter, never a string** — the letters MQT were moved out of the engine on 2026-09-04 for breaking the portability law, and a text field is also how you get "Car 2".
- **Unlock like the wardrobe:** `GROWTH.liveryQuest`, `GROWTH.liveryNpc`, `T().trHint`, `T().trUnlockToast`, attempt-gated; the engine never learns the word *taller*. Three NPCs owning a panel (barber, wardrobe, livery) is where the hardcoded chain earns a `PANELS` table — the one place this job may touch code A13 did not send it to.
- **The gauge:** `typeof`-guarded, listed as optional in `docs/NEW-WORLD.md`; no check may fail a pack for having no tram; no new *required* `UI` key.
- **What breaks in six months:** the 3D car is built once under `if(!T3.tram)` and **`t3Invalidate` cannot reach it** — a runtime repaint needs material handles kept on `T3`. The ride. The depth pass that is not built.

### What the menu may carry (Rigo), and what reads at five pixels (Pili)
| Option | Reads at 64 × 32? | Note |
|---|---|---|
| **Body panel** — the dark below the waist | yes, the largest field | must stay dark; a pale body on a pale road is a hole |
| **The band** — the light colour around the windows, full length | **yes, the strongest mark available** | a value step ≥ 100 running the whole length is why every real tram has a waistline |
| **Roof colour** | yes, as the band's top edge | our camera looks down; the roof is one of the largest surfaces a player sees |
| Route board / destination blind | as a lit rectangle, never as letters | **not "BARRIO NORTE" until the track is laid** (`docs/STORY.md`) |
| Gold lining, scrollwork, lamp rims, fender, doors, a second body tone within Δ40 | **invisible** | the last is what ships today |
**Structure is never on the menu:** the pole, the fender, the doors and where they are, the bogie (wheel size is a gear ratio), length (the safety envelope), the number of cabs, the driver beyond A13's two signed pieces. **The menu must refuse:** a second cab as ornament, a face, a fleet number, **painting the signal lamp** (red *I stopped for you*, amber *doors open*, white *the bell* — the only sentence this car can say), removing the fender or the pole.

**The one rule that makes customisation safe (Pili):** a livery picks **hues, never the value structure** — the engine enforces `|luma(band) − luma(body)| ≥ 90` and `luma(roof) ≤ luma(body)`; the pack and the player pick which cream and which dark. **The one default livery, from colours the project already owns:** body `#B0563A`, roof and skirt `#8E4230`, and a continuous cream band `#F2E8D8` (the bakery's cream) at window height, full length, the glazing inside it.

**The one thing the car lacks (Rigo):** the **trolley pole** — about 14 px of ink, a diagonal (the rarest shape in this game, it reads before the body does), which *trails* away from the direction of travel and so answers the double-ended problem without a face or a number. The mount is already drawn (an 8 × 2 gold mark at roof centre) and nothing rises from it. A pole needs a wire; that is Chema's question.

### Is it worth a player's attention (Tavo)
Yes — but not the version asked for, and not yet. **Three named cars, not swatches** (the owner sent a scheme, not a colour). **Unlock at quest 28, "The sound"** — Tacho's own, the trolley is in its first line, fifth of eight so the reward lands while the district is still open; not 31 (already ends on a cosmetic), not 24 (Tacho does not trust you yet). **The picker lives in the gear menu, with Tacho as a second door** — making the player walk to the taller to change it is R9 busywork. No paint bay, no tram entering the shop, no unlock ladder, no name field. A13 answer 3 is untouched: the livery is chosen off the ride and observed on it. **If only one tram ticket fits this week, the second stop outranks the livery.**

### The build order this produces
1. A13 items 1–3 (the depth pass, the aperture rule, the near side) — a livery on the car we draw today is lipstick on five `fillRect`s.
2. In the sitting that draws the near side: the band and the pole as parts; one `LIVERY` table both draws read; the value rule; the default above.
3. Then the seam: `TROLOOK`, `tl` in the save, the unlock at 28, the panel from the gear menu and from Tacho. One sitting on top of 2.

### The owner's, before anything is built
1. **Whose car is it?** (a) **A commission** — you did the work for Don Tacho and the line, the repaint is the payment, chosen once and kept; the shop is the fiction and the picker is in the gear menu (Tavo and Rigo both recommend this). (b) **A settings screen with swatches** — cheaper, re-picked eleven times in the first minute and never again. (c) **Seeing the tram in the shop** — a bay, a new room, and it fights *never nonsense*: the car cannot leave its rails.
2. **Does the season repaint the tram?** Día de Muertos may *dress* the world; a car in marigold is dressing or rebuilding depending on who you ask (Beto's question; both sides in the raw file).

---

## A15 · ~~A pack cannot design its own paper~~ — **BUILT 2026-09-16** · the gap that made every mock look like a form · 2026-09-15

**How it was found.** A day was spent improving the *art* in a mock of Simmer's recipe-book page. The
owner's verdicts, in order: *"fairly slop shloppy"* · *"the stew looks circular but we are looking at
the pot from an angle"* · *"the latest look broken now"* · and then, on a render that three agents had
measured, cold-read and corrected: **"it still looks like a bad attempt at UI."**

He was right, and the fault was never the illustration. **Every one of those pictures was the game's
document reader with a drawing dropped into it** — the reader's monospace field labels, its key/value
table, its dashed rules, its three grey buttons. A form. The same content, laid out as a designed
page, stopped being a form immediately: `https://claude.ai/artifact/DAenYKRcrwbL6fvGFrrpmD`.

**The architectural fact underneath it, checked rather than assumed.**

| | |
|---|---|
| What a pack ships | **nine JavaScript files and no CSS** (`index.html`, the pack script tags) |
| Who owns type, size, colour, spacing | **the shell**, for every document in every world, in one `<style>` block |
| What the reader's blocks are | fixed classes — `dp` `dnote` `dkv` `dblank` `dform` `dq` `ddocs` `dsel` `dred` |
| What a pack may therefore choose | **which blocks to use, and nothing about how they look** |

**So Meridian's paperwork look is hardcoded into the engine for every world that will ever run on
it.** A pack whose documents are a recipe book, a ship's log, a child's sticker album or a court
filing gets Meridian's civic-form typography, and the only lever it has is which blocks to stack.

**Why this is a RULE question and not a CHOICE somebody can make today.** `docs/TAGS.md`'s standing
test is *name the geometry, not the noun*. The reader's blocks pass that test — a key/value pair is a
shape, not a subject. **Their styling does not**: "IBM Plex Mono, uppercase, letter-spaced, grey" is
Meridian's voice wearing the engine's clothes, and a second world inherits it with no way to decline.

**The seam, costed, not built.** A pack declares one stylesheet — `content/<pack>/paper.css`, loaded
by the shell after its own block and scoped to the reader — or a small token set (two faces, a scale,
four colours) the reader's classes read from. The stylesheet is simpler, honest about what it is, and
carries the whole of what was missing. **What it must not become:** a hole a pack can reach through to
restyle the game's chrome, the HUD or the world. Scope it to the reader's own subtree and say so in
the register, or it is a new edge for `docs/BOUNDARY.md`.

**What it would have prevented, and this is the measure of it:** an entire day of improving food
drawings inside a surface that could not be designed, while the thing making the page look cheap was
never the food. **Three specialist agents measured, cold-read and corrected that art and not one of
them said the surface was a form — because they were all pointed at the picture.**

**Two questions were being conflated, and the register should keep them apart forever:**
- *"Can the engine's reader draw this?"* — answer it by rendering in the reader. It was answered, and
  the answer was genuinely useful to the build.
- *"Would the person this is for want to open it?"* — **never answer this one with the reader.** Design
  the surface, then judge.

**~~Open for the owner.~~ CLOSED 2026-09-16 — the owner: "ok go for the seam."**

**What was built, and the one place it differs from the costing above.** A pack declares `PAPER`, a
string of CSS. The costing offered a stylesheet *or* a token set; it is the stylesheet, because a
token set can only answer questions somebody anticipated — two faces and four colours would not have
let the Simmer book set an ingredient list as a dotted-leader table, which is the actual thing that
was missing. **But it is not a `.css` file.** A pack still ships JavaScript and only JavaScript:
`content/<pack>/paper.css` would have meant a fetch, a new origin question, a `sw.js` asset, a CSP
line and a gauge script list — five edges bought for a file extension. A string in the pack's own
config is the same expressive power and no new edge at all.

**The scoping is enforced, not requested**, which is the half A15 warned about ("what it must not
become"). Four mechanisms — the browser parses it, every selector is re-rooted at `.paper`, an
allow-list drops everything that registers a global name or fetches, and `position:fixed` is stripped
while `.paper` becomes a stacking context. Written up in full in `docs/BOUNDARY.md`, "The paper seam",
with six violations planted at it.

**Meridian declares no `PAPER` and is byte-identical**, which is what the repo's rule requires of any
engine change. The gauge declares one, and half of that declaration is a live attack, so the seam is
exercised on every CI push by the smallest world that is a world rather than by a test that writes
its own input.

**And the seam's own first run found a bug this entry could not have predicted:** the shell's 34KB
stylesheet lives in `<body>`, not `<head>`, so appending the pack's paper to `document.head` put it
*first* and the engine won every tie at equal specificity. A seam that is perfectly safe and silently
does nothing is still broken. The gauge caught it; the guard now asks the `.paper` element what
colour it actually is, rather than asking the stylesheet what it says.

## A16 · A door at the top of a staircase — the climb nobody walks · 2026-09-17

**The owner, and he called it the harshest directive of the day:** *"then that door right there to the
top of a staircase. until you figure out how to teleport in my side of the screen - then tell me how
it can be done."*

He is right, and the code says so in its own comment. `content/meridian/maps.js:205`:

```js
PORTALS.st["$"]={to:"no",x:21,y:4,dir:"left"};
/* the avenue door is the foot of Nolasco's stairs: you appear at the top, in the stair room */
```

You walk into a door at street level and you are upstairs. There are two of these in the city — this
one, and `PORTALS.hq["▲"] → f2`, which the table itself calls *"the only flight in the city that
CLIMBS"*. Neither is climbed.

**What actually happens, measured.** `tryPortal` (`engine/engine.js:3521`) is four assignments in one
frame: `world=p.to; px=fx=p.x; py=fy=p.y`. There is no transition of any kind. Then `worldArrived`
sets `warpT=performance.now()+450` — **input is blocked for 450 milliseconds and nothing is drawn in
that window.** So today the player gets the worst pairing available: an instant cut, followed by
standing frozen somewhere they did not walk to. **There is already a transition slot. It is empty.**

And in the stair room the fiction is half-built and reads as broken, which is what he is looking at.
Screenshotted at `no(18,4)`: you stand on a flat deck with a glass rail around a well and a **down
arrow** beside you. There is no flight. The rail promises a descent; the arrow is a teleport; nothing
between them exists. *A railing around a hole that nothing goes down is a stronger lie than no railing
at all* — the same species as the sugar skull on a sill that was never drawn, one floor up.

### The three ways it can be done, costed

**A · The cut becomes a climb you can read.** Draw into the 450ms that already exists and is already
blank: the screen closes from the bottom as the door shuts behind you, and opens at the top with the
landing under your feet. Nothing about the maps, the portals or the 3D builder changes. **Cost: a
sitting.** Fixes *every* door in both games at once, including the four parcel doors and the park.
**It does not make the traversal real — it makes the cut legible.** A cut with a reason reads as a
cut; a cut with nothing in it reads as a bug.

**B · Build the flight, for the one staircase he is pointing at.** The engine can already do this and
does: `engine3d.js:365` puts a tile's lid at `−STAIRH*(i+1)` and `:413` builds the shaft walls down to
the deepest point of the well, so a descending run of treads renders today. What is missing is only
that `▼` sits at the *top* of the run instead of the *bottom*. Extend the stair room south, lay the
treads as sunken tiles, and put the portal on the last one — so the player walks down the steps they
can see and opens the avenue door at the bottom. **Cost: a map edit, a portal move, and the two flat
cameras taught to draw a descent (they draw a stair mass, not a run).** Risk: the flat cameras are
where this has gone wrong twice already; it needs Chema measuring before and after.

**C · One building, one world.** The real reason the climb cannot be walked is that each floor is a
separate `WORLDS` entry and the engine draws exactly one world. The two ends of a staircase are never
on screen together, so no staircase in this city can ever be climbed. Merging `hq`/`f2` into one taller
world means levels in the grid, a second storey in the 3D builder, and every camera taught about
height. **Cost: more than a sitting; it is a rewrite of what a world is.**

**Recommended: A now, B for Nolasco's stairs, and C never** — A is what makes every door in the city
honest for one sitting's work, B makes the one he is pointing at true, and C is a different game from
the one that is about practising AI roles. **His call; nothing is built until he takes it.**

### A16 — **B SIGNED AND BUILT, 2026-09-17.** *"ok lets do b."*

**What shipped, and none of it is an engine rule change — it is the engine's own numbers finally
being read by the cameras that draw them.**

- **The flight is five treads, not three.** `wellDepth` at the `▼` is `STAIRH×6 = 0.96` against a wall
  of 1.1, so the well is now a storey. Three treads dropped 0.64 and read as a dip in the floor. The
  rails follow the run for its whole length, which they did not before.
- **You arrive at the foot and walk up.** `PORTALS.st["$"]` lands you on the bottom tread facing the
  climb, with the avenue door behind you. One tile east of the `▼` rather than on it: `portalHold`
  would have made a spawn on the portal tile safe, but the bottom step is the truer place to put
  somebody who has just opened a street door, and it costs no argument with the engine's own warning.
- **And the three flat cameras stopped lying about height.** This is the part the costing under-sold.
  `wellDepth` and `stairLift` had existed for two versions and **only `engine3d.js` ever read them**,
  so in top, front and iso the hole was painted as ordinary floor with a chevron on it and the hero
  stood on top of it at full height. The front camera looks along the row and Nolasco's flight runs
  *across* one, so sinking each tread by its own drop gives a genuine staircase in profile for free.
  Iso gets the two far walls of the shaft and the tread at the bottom, drawn in the depth pass rather
  than the floor pass because a sunken lid reaches half a diamond past its own tile. Top-down gets
  nothing on purpose: you cannot see a drop from directly above, and the tread art already ramps its
  value as it descends.

**What is NOT done, named rather than left to be discovered:** a CLIMBING flight still does not lift
anyone in the flat cameras (`hq`'s three treads up to `f2`), and neither does the park bridge's deck,
which has `BRIDGEH` plus an arch and rails that would all have to move together. Both are the same
one-line hook; both need their own look, and the bridge has its own history.

**Two constants, neither of them picked:** `UNITPX=12`, because a facade is `lift:13` and stands 1.1
units; `ISOUNITPX=18`, because `izh` already converts a lift with `Math.round(lift*1.5)`.

**Planted three ways** in copies outside the repo: the avenue door back on the landing, the flat
cameras forgetting the drop, and the three-tread flight restored. All three named. **The first draft
of the portal check let the landing plant straight through** — it asked whether the arrival was the
deepest tread of its run, and the landing is not *on* the run, it is the tile past the end of it.
That hole was the entire bug. It now asks the question that also lets `hq↔f2` through for the right
reason rather than by luck: there you leave standing *on* a flight and the two halves add up to one
storey across the landing; what may never happen is leaving flat ground and arriving at a head.

**And the gauge caught the guard inventing a requirement** — *"NEW demand on every future game: no
world has a well any more"*. A five-tile world that never digs a hole owes this nothing. The demand
that a flight EXIST moved to Meridian's own suite, where it belongs; the engine's suite says out loud
that it measured nothing rather than passing quietly.

**A and C are still open and still his.** A (drawing the climb into the 450ms that already exists and
is already blank) would make every *other* door in both games legible, and is unaffected by B.

### A16 — **A SIGNED AND BUILT, 2026-09-17.** *"i think i want that option A."*

**The world now changes behind a shut door**, and the door opens in the direction you travelled — up
a flight, down a well, or apart like a door on the flat. Three decisions worth keeping:

- **It is a DIV over the viewport, not paint on a canvas.** The 3D camera renders to its own WebGL
  surface, so anything drawn into the 2D context is invisible there — one overlay covers all four
  cameras and cannot drift between them. `curtain()` had already proved the shape on the growth
  change; this is the same idea at a door, and faster, because you are walking.
- **Which way you went is read off the map, not off a label.** `▲` is the head of a climbing flight,
  `▼` is the foot of a well, everything else is flat — including the avenue door into Nolasco's stair
  room, which is right: you have walked in off the street and not climbed anything. The climb is the
  five treads in front of you and it is yours to walk.
- **The new place is built while the door is still shut.** There is one 3D scene (`T3.builtKey`) and
  changing world throws it away and makes another. Traced: in the flat cameras the leaves slide the
  whole way at frame rate; in 3D there was a **237ms hole right after the swap** in which the top leaf
  jumped from −5 to −154 — the door did not open, it vanished. The stall is real work. What it must
  not do is eat the animation, so it happens behind a closed door, which is the only job a closed door
  has ever had. **That hole is also the measurement behind the memory question:** cache the built
  scenes and it goes away. A and "spend some memory" are the same piece of work.

**110ms to shut, 35 to settle, 330 to open**, and input comes back when the door is actually open
rather than when a guess says it should be — the old `warpT` of 450 outlasted the (absent) animation
by a third of a second of standing still.

**Two bugs found by the guard and not by reading**, both invisible in the code:
- `translateY(-102%)` moved the *bottom* leaf into the top half rather than off the screen, because a
  percentage is of the LEAF and a leaf anchored to the far edge has to cross the whole viewport to
  leave by the near one. A black band across every new place, forever.
- Dropping the class re-armed the transition, so a door that had finished opening sent its bottom leaf
  **sliding back down across the viewport** a third of a second after you arrived.

**Four plants, four catches** — the pre-A `tryPortal` restored exactly, the half-travelling leaf, the
re-armed reset, and the `#door` element removed from the shell. The third went through the first
version of the guard, which held the door still and so could never see a move that happens on the way
back to rest; it is caught now by reading the cause (the reset's transition duration) rather than the
symptom. **And the gauge objected twice in one day** — no well, then no portal — both correct, both
turned into notes rather than demands on a one-room world.

**C is the only part still open**, and the recommendation against it stands.

## A17 · The 3D scenes are kept, and what a cache owes the player · 2026-09-17

**Owner: "3. ok go for it."** Costed inside A16's option A, built the same day.

There was exactly **one** built 3D scene (`T3.builtKey`). Walking through a door threw it away and
made another, and the first frame after that had to upload the new geometry as well as draw it.
Measured per world: **1.4ms for the smallest room, 18.4 for Calle Principal, 111ms for all fifteen**
— and, with the upload counted, a **237ms hole** right after a portal swap, which is what made the
new doorway *pop* instead of open.

**Kept now. Measured, six worlds:** first visit **50.5ms** total, return visit **0.1ms**. A door back
into a room you have been in is free.

**What a built scene owns is four things**, not one — the group, and the three lists the frame loop
walks (`tintables` for the time-of-day wash, `glows` for the door lights, `pinatas` for the sway).
Parking the group without its lists would leave the wash writing colour into a scene nobody is
looking at.

**Eviction, because a cache with no ceiling is a leak with a nicer name.** The key carries
`T3.dirty`, which growth and a theme edit bump, so every entry from a previous `dirty` is stale the
moment one lands and is disposed first; then LRU down to eight. The active group is never evicted.

**The half a cache always gets wrong is the second one**, and it is the half nobody notices until
somebody buys a building and it does not appear: *a world that has CHANGED must be rebuilt.* It is
planted — `t3Trim` made blind to `T3.dirty` — and the guard says `37 scene(s) from before the change
are still held`.

**And one lesson about the guard itself, which is the register's oldest shape.** The ceiling check
first compared `T3CACHE.size` against `T3CACHE_MAX` — **the code's own constant**. Raising that
constant to 999 turns the cache off and the guard still passed. A ceiling is a fact about behaviour,
not a number to read back: what it now asks is *after walking the whole city, are you holding the
whole city?* Planted, and named: `after walking all 15 worlds the cache holds 15 scenes`.

---

## A18 · What the six map asks touch, area by area · 2026-09-17

**Owner: *"document areas that will be affected in architecture."*** He asked for this before
anything is built, which is the right order and the first time it has been asked for in that order.
The plan itself is `docs/plans/2026-09-17-the-map.md`; **this is the area list only.** Nothing here
is built.

### The six, in his words

1. *"it should always be interactive"* · 2. *"set a destination to remember where we meant to go"* ·
3. *"expanded for the second floors"* · 4. *"the label about doors as gold is wrong for the calle
dos"* · 5. *"a small light path"* · 6. *"make the map a better image from what you learned to do
with AJ's mocks"*.

### The areas

| Area | What changes | Whose | Behaviour-identical for the town? |
|---|---|---|---|
| **`planMarks` / `markOf` / `MARKS`** | **nothing.** The mark work from 2026-09-14/16 is untouched; a mark stays *who is waiting* | engine | yes |
| **`planPlaces` (new)** | *what can be picked*, split off from *what is marked*: portal tiles, world anchors, transit tiles, `MAPDOT` | engine | **yes, and this is the one to prove** — the town declares no `MAPMARK`, so it has no marks today; the day places exist it gets pickable doors it never had. That is a behaviour change for the town and it needs his word or a pack opt-in |
| **`mapPick`** | reads places, not marks | engine | follows the row above |
| **`mapDest`** | gains a saved life; loses its `gx,gy` as stored state (recomputed every load) | engine | yes |
| **`save()` / `sanitizeSave` / `load()`** | one new field `d:{w,x,y,who}` **crossing a trust boundary** — `docs/BOUNDARY.md`, the same door Trolley Pass links arrive through. World must be a real world, x/y clamp, `who` must be a declared person | engine | yes |
| **`docs/ARCH-LOG.md` A3** | gains the boundary it never wrote: *one pin, yours, saved — a second pin is a new decision.* The `let mapDest` comment that claimed A3 banned this is wrong and gets corrected | decision | — |
| **`planPlace`** | returns the **route**, not only the endpoint — the same recursion, one more thing kept. And a hop that crossed a `mark:"up"` portal is flagged as a **level**, not a neighbour | engine | yes |
| **The chooser (new)** | one target that resolves to two or more places — the second floors AND the shared anchors M6 filed in crew run 8 | engine | yes |
| **`drawTown`'s caption** | deleted as an engine claim; becomes `plan.caption`, per panel; later derived from what `planTile` actually painted | engine → pack | **the town gets no caption unless it writes one** — correct, and it is A15's fault in a second place |
| **`MAPCOL`** | `@`, `*`, `$` gain colours they never had; `▲ ▼ ≡` gain a decision about whether a stair is gold | **pack** (Meridian only) | yes |
| **`TOWNLBL`** | two hand-written `⇧` become redundant once a level is structural | pack | yes |
| **`plan:` strings** | `caption`, the chooser's two lines, the route's name if it needs one — both languages | pack | yes |
| **`docs/BEAUTIFY.md`** | the plan's tiles enter the register: `planTile`'s last branch is painting **two shop doors and a stair tread** as the generic grey box | register | — |
| **The mock loop** | one render pass at ×4 on both panels before any redraw, the Simmer method | process | — |

### The three that are NOT affected, said out loud

- **`destAim` / `bearingUI` / the street.** el-mapa §7.3 stands: the street carries a **bearing and
  nothing else**. The route is drawn on the paper. Nothing in the world gets a lit line.
- **`engine3d.js`.** The plan is a 2D canvas overlay in every camera. No scene, no cache, no `dirty`.
- **`GAMEV` / `CACHE`.** They still bump together the moment any of this lands in `engine/` — this
  row is here because it is the one that gets forgotten, not because it is exempt.

### The one that is the real risk

**`planPlaces` changes what the TOWN does.** Every other row is engine-neutral or pack-local. The
town (`changarrito/`) declares no `MAPMARK`, so its plan has no marks and today a tap does nothing;
the day places exist, its doors become pickable. That is not a regression, but it **is** a behaviour
change in the second game, and this repo's rule is that an engine change is behaviour-identical for
both or it is not an engine change. **So `planPlaces` needs either the owner's word or a pack opt-in
(`PLANPICK`, defaulting off), and the second is the cheaper honest answer.**
