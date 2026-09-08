# Meridian Quest ⚔️

A bilingual (EN/ES) mini-RPG that teaches practical AI delivery judgment.
You play the new AI lead at Meridian Labs: roam the office and the barrio, take quests
from coworkers (and one very good dog), and make the calls — RAG vs fine-tuning,
human-in-the-loop thresholds, agent guardrails, build vs buy — with XP, reputation
hearts, and consequences.

Everything is static files with no build step (plus a thin PWA shell): 15 worlds,
37 people, 56 quests plus a secret side quest, 15 documents a character puts in your
hands mid-quest, retry-until-correct progression, a pet wardrobe (dress Frederick and
Canela), a barber's chair that changes your look after the start, full English/Spanish
localization, mobile controls (swipe / joystick / d-pad), continuous localStorage saves,
a 🎫 Trolley Pass to carry a save between devices (QR / share sheet), and an in-game
map editor.

**Four cameras, one world.** Top-down, front elevation, isometric, and a real 3D view
(three.js) — the same maps and the same 2D artists, drawn four ways. The 3D view builds
boxes and cutouts from the tile art it bakes; `test/engine.smoke.js` fails the build if a
new object ships as a flat picture.

**Seasons.** A content pack can dress its world by date or by name without rebuilding it —
Día de Muertos and Noche de alebrijes ship today (marigold petals, papel picado, sugar
skulls on window sills, an ofrenda, calavera face paint, alebrije looks). The rule is in
`docs/OWNER.md`: a season may dress the world, never rebuild it.

The code is split into a shared **engine** and per-game **content packs** — the
gifted-games template (see `docs/APPROACH.md` §3):

```
index.html            ← the shell: CSS, DOM chrome, script tags
engine/engine.js      ← renderer, movement, saves, validators, NET seam (shared)
engine/engine3d.js    ← the 3D camera, built from the same tile art (shared)
content/meridian/     ← this game as data: strings, quests (EN/ES), npcs, maps, art, config
sw.js                 ← service worker (bump CACHE when shipping!)
```

A new game = a new `content/<game>/` folder + a copy of `index.html` pointing its
content script tags at it. The engine stays untouched. `docs/NEW-WORLD.md` is the
step-by-step, including the seams a second world will hit.

## Play / develop

- **Run locally:** open `index.html` in a browser. No build, no dependencies
  (Google Fonts is the only external fetch, with system-font fallbacks).
- **Hosting:** designed for GitHub Pages or any static host.
- **Install as an app:** when served from a host (not `file://`), the game ships a
  web-app manifest and a cache-first service worker (`sw.js`), so it can be added
  to a phone's home screen and played fully offline.
- **Versions:** `GAMEV` in a pack's `config.js` and `CACHE` in `sw.js` are bumped
  **together**, every time `engine/` changes. The smoke fails the build if they drift.

## Test before shipping

`npm install playwright-core`, then (set `CHROMIUM_PATH` if Chromium isn't in a
standard spot):

```
node test/smoke.js                                  # Meridian's own content
node test/town.smoke.js                             # El Changarrito's
node test/engine.smoke.js --index index.html        # the engine, against any pack
node test/engine.smoke.js --index changarrito/index.html
```

They boot the real game headless and check map integrity, reachability, EN/ES parity,
XP math, the retry rules, the wardrobe, every camera drawing every world, and the rules
that are easy to lose (nothing flat in 3D, nothing sampled through a linear filter,
no two sugar skulls in one window). CI runs all four on every PR.

## Where the work is written down

- `docs/NEXT-SESSION.md` — the state of play, rewritten at the end of every session.
- `docs/ASKS.md` — every owner ask, verbatim, and what happened to it.
- `docs/OWNER.md` — the settled rules. `docs/BACKLOG.md` — the ranked index.
- `docs/CITY.md` — the city ledger and the open decisions waiting on the owner.
- GitHub issues — the ledger since 2026-09-05; an open one is a thing to do.

## Why a repo instead of a chat artifact?

See [docs/APPROACH.md](docs/APPROACH.md) — the decision record covering why the game
moved out of the artifact workflow and how this repo is meant to grow into a template
for future personalized "gifted games" (shared engine + per-game content packs).

**El Changarrito** — the owner's backlog as a street, a second world on the same engine, run from
`localhost` only: `changarrito/README.md`.

**For a Claude session:** `CLAUDE.md` is read automatically and says where the instructions
live — `docs/NEXT-SESSION.md` first, then `docs/ASKS.md`, then the GitHub issues.
