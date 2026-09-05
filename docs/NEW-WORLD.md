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

**Required — the engine reads these bare and dies without them** (verified: no `typeof` guard):

| global | file | what it is |
|---|---|---|
| `WORLD_DEFS` | maps.js | every room, as rows of glyphs |
| `PORTALS` | maps.js | which glyph in which world leads where |
| `WNPC` | maps.js/npcs.js | which glyph in which world is which person |
| `NPCE` `NPCN` `NPCLOOK` | npcs.js | emoji, names (en/es), and the look of every person |
| `QEN` `QES` `FQEN` `FQES` | quests.*.js | the quests, both languages |
| `UI` | strings.js | every UI string |
| `MAXXP` `LEVELS` | config.js | how far the game goes and the level bands |

**Optional — guarded by `typeof`, the engine simply does less without them:**
`GAMEV CAMDEF STAKES GROWTH SEASONS CHAPTERS INTERVIEW CRITTERS EGGS CHATTER CHILL NPCACT TRV
DECOR DECOART READS DOCS DOCUI BUILDTPL BUILDS TILEART TILEART_SIDE TILEMETA MAPCOL MAPDOT
TOWNLBL DOORS DOORLOOK SOLIDX` — and, since `mq-v65`, **`STOREPFX`** (config.js): the prefix on
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

- **Sixty-two hardcoded world ids in `engine/engine.js`** (`"pk"` ×20, `"hq"` ×16, `"st"` ×13,
  `"lc"` ×7, `"lo"` ×4, `"f2"`, `"me"`, `"no"`). They mean roles — home base, the park, the
  street, the first shop. A new world either **reuses those ids as roles** (cheapest, and
  fine for a second cozy town) or the engine gets a `ROLES` map first (a sitting; the honest
  fix). Decide before drawing the first map.
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
  `content/`. Nothing is copied, one CI covers both, and the first world's index is untouched.
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
