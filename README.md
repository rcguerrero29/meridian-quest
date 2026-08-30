# Meridian Quest ⚔️

A bilingual (EN/ES) top-down mini-RPG that teaches practical AI delivery judgment.
You play the new AI lead at Meridian Labs: roam the office and the barrio, take quests
from coworkers (and one very good dog), and make the calls — RAG vs fine-tuning,
human-in-the-loop thresholds, agent guardrails, build vs buy — with XP, reputation
hearts, and consequences.

Everything is one self-contained static page: canvas engine, 6 maps, 16 NPCs,
15 quests + a secret side quest, full English/Spanish localization, mobile controls
(swipe / joystick / d-pad), localStorage saves, and an in-game map editor.

## Play / develop

- **Run locally:** open `index.html` in a browser. No build, no dependencies
  (Google Fonts is the only external fetch, with system-font fallbacks).
- **Hosting:** designed for GitHub Pages or any static host.
- **Install as an app:** when served from a host (not `file://`), the game ships a
  web-app manifest and a cache-first service worker (`sw.js`), so it can be added
  to a phone's home screen and played fully offline. Bump the cache name in
  `sw.js` (`mq-v2` → `mq-v3`, …) when shipping a new version.

## Why a repo instead of a chat artifact?

See [docs/APPROACH.md](docs/APPROACH.md) — the decision record covering why the game
moved out of the artifact workflow and how this repo is meant to grow into a template
for future personalized "gifted games" (shared engine + per-game content packs).
