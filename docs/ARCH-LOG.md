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
