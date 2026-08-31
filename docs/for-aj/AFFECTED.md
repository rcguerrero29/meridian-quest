# What AJ's answers change

*The map from each question tag in [QUESTIONS.md](QUESTIONS.md) to the files that
actually move. Written so nobody has to guess how big an ask is — and so AJ can see
that most of her answers are small, because the engine was built to take them.*

**The rule that makes this cheap:** the engine (`engine/engine.js`) never changes for
AJ's game. Everything below is a new `content/<aj>/` folder plus a copy of
`index.html` pointing its script tags at it. Meridian's pack is a lending library —
copy any file out of `content/meridian/` and edit it freely.

---

| Tag | Question | Files that change | Size |
|---|---|---|---|
| `[world]` | 1, 2, 15 | `content/<aj>/maps.js` — `WORLD_DEFS` (the map as rows of characters), `PORTALS`, `MAPDOT`, `TOWNLBL`. `strings.js` — `locs`, `arrive` | **Small.** Maps are text. A room is twelve lines of characters |
| `[cast]` | 4, 5, 6 | `content/<aj>/npcs.js` — `NPCE` (emoji), `NPCN` (names), `NPCLOOK` (hair/skin/shirt/style), `WNPC` (where they stand), `CHILL` (people with no quests), `CRITTERS` (animals) | **Small.** Every person is one line of data |
| `[quests]` | 7, 8 | `content/<aj>/quests.en.js` (+ `.es.js`). `config.js` — `CHAPTERS`, `MAXXP` | **The big one.** Writing is the real work; everything else is fast |
| `[story]` | 9 | A `STORY.md` for her game; quest and epilogue text | **Medium.** `/nacho` plans this |
| `[art]` | 2, 10 | `THEMES` (palettes), `MUSIC`, ambient particles, `CRITTERS`, tile art in `TILEDRAW` | **Small–medium.** Palettes are data; new tile art is a small function each |
| `[loop]` | 3, 6, 10, 11 | Possibly engine — this is the one place an answer might reach past content | **Depends.** Flagged loudly on purpose |
| `[stakes]` | 11, 12, 12b | `content/<aj>/config.js` — `STAKES` mode: `none` / `hearts` / `budget`, per pack and per district | **Small once the layer is built.** Picking a mode is one line |
| `[eggs]` | 13, 14 | `content/<aj>/npcs.js` — `EGGS`. Jokes already written in `docs/IDEAS.md` §9 | **Tiny.** Picking from the list is nearly free |
| `[i18n]` | 16 | Whether `quests.es.js` exists and whether `strings.js` carries an `es` block. The test suite checks EN/ES stay matched | **Doubles the writing.** Nothing else |
| `[career]` | 8 | The decision-report export and `docs/templates/`. **Fully removable** — drop it and no other feature breaks | **Free to skip** |
| `[meta]` | 15, 17 | `manifest.webmanifest`, `sw.js`, icons, the game's title | **Tiny** |
| `[wildcard]` | 18 | Unknown by definition | **Ask and find out** |

---

## The two answers that could cost real work

**`[loop]` — "what's the first thing you'd do?"** Everything else on this list is
content. If AJ's answer is "water my plants and see if they grew," that is a *system*
the engine does not have (things changing while you're away). Not hard, but it is
engine work, and it would be shared with Meridian rather than hers alone. Worth
knowing early rather than discovering in month two.

**`[stakes]` — "should anything ever go wrong?"** The engine is getting a stakes layer
so this is a setting, not an argument: `none` (wander freely), `hearts` (lives), or
`budget` (money you spend — designed but deliberately not built). Declared per game AND per district, so a relaxed town
can still hold one scored mini-game. Underneath any mode, every quest earns a
**grade** — first try / took a retry / took a few — that never blocks anything and is
never switched off. **Nothing any stakes mode does can take your progress, your town,
or your save — and nothing can hurt a character or ruin their business.** AJ picks her mode; Meridian picks its own; neither constrains the other.

## What is already portable, at no cost

Free to inherit, nothing to build: the character creator, the wardrobe, day-and-night
lighting, the theme system with contrast auto-fixing, the trolley, saves that live on
the device, the offline/installable phone app, the QR save-transfer, procedural music,
name easter eggs, pettable animals, and the admin tools for placing new townsfolk by
hand.

## What is Meridian's alone

The AI-role practice packs, the deliverable templates, the decision report, Don Güero
and Nacho as planners, and the Hispanic-owned-business rule. All of it optional; none
of it load-bearing for anyone else's game.
