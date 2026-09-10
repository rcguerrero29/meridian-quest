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

**Why it was deferred:** `chSeen` is in every save. Changing it to a set is a save migration, and it
is the *same class of problem* as `docs/TAGS.md` L9 (quests are array indices) — both should be paid
for once, together, or not at all.

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
**Status: open, and it gates the beautify work. 2026-09-09.**

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
**Status: registered 2026-09-09, and it is now the first step of the structural goal.**

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
