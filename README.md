# Meridian Quest ⚔️

A bilingual (EN/ES) top-down mini-RPG that teaches practical AI delivery judgment.
You play the new AI lead at Meridian Labs: roam the office and the barrio, take quests
from coworkers (and one very good dog), and make the calls — RAG vs fine-tuning,
human-in-the-loop thresholds, agent guardrails, build vs buy — with XP, reputation
hearts, and consequences.

Everything is static files with no build step (plus a thin PWA shell): canvas engine,
6 maps, 17 NPCs, 16 quests + a secret side quest, retry-until-correct progression,
a pet wardrobe (dress Frederick and Canela), full English/Spanish localization,
mobile controls (swipe / joystick / d-pad), continuous localStorage saves, a
🎫 Trolley Pass to carry a save between devices (QR / share sheet), and an
in-game map editor.

The code is split into a shared **engine** and per-game **content packs** — the
gifted-games template (see `docs/APPROACH.md` §3):

```
index.html            ← the shell: CSS, DOM chrome, script tags
engine/engine.js      ← renderer, movement, saves, validators, NET seam (shared)
content/meridian/     ← this game as data: strings, quests (EN/ES), npcs, maps, config
sw.js                 ← service worker (bump CACHE when shipping!)
```

A new game = a new `content/<game>/` folder + a copy of `index.html` pointing its
content script tags at it. The engine stays untouched.

## Play / develop

- **Run locally:** open `index.html` in a browser. No build, no dependencies
  (Google Fonts is the only external fetch, with system-font fallbacks).
- **Hosting:** designed for GitHub Pages or any static host.
- **Install as an app:** when served from a host (not `file://`), the game ships a
  web-app manifest and a cache-first service worker (`sw.js`), so it can be added
  to a phone's home screen and played fully offline. Bump the cache name in
  `sw.js` (`mq-v2` → `mq-v3`, …) when shipping a new version.

## Test before shipping

`npm install playwright-core`, then `node test/smoke.js` (set `CHROMIUM_PATH` if
Chromium isn't in a standard spot). It boots the real game headless and checks map
integrity, reachability, EN/ES parity, XP math, the retry rules, and the wardrobe.
Current state, decisions, and the roadmap live in [docs/HANDOFF.md](docs/HANDOFF.md).

## Why a repo instead of a chat artifact?

See [docs/APPROACH.md](docs/APPROACH.md) — the decision record covering why the game
moved out of the artifact workflow and how this repo is meant to grow into a template
for future personalized "gifted games" (shared engine + per-game content packs).
