# Meridian Quest — state of the world & next steps

**Updated:** 2026-08-30 · everything below is live on `main` (deployed via GitHub Pages + PWA).
This is the pick-up-where-we-left-off doc for future sessions. Companion docs:
`APPROACH.md` (why this is a repo; the gifted-games thesis — historical record, numbers
are as of the port), `IDEAS.md` (feature designs not yet built), and `PLAYTEST.md`
(the guided "Week One tour" for testing — the `/playtest` skill walks the owner
through it and maps reports to code). Session-to-session: `CITY.md` is the city
ledger behind the `/don-guero` planning skill (Opus 5), and `NEXT-SESSION.md` is
the live queue — read it first, rewrite it before signing off.

## What the game is right now

Static files, no build, no backend, no dependencies. Installable on a phone, fully
offline after first load. Since the engine/content split (2026-08-30) the game is:

- `index.html` — the shell: CSS, DOM chrome, and the script tags that load a
  content pack + the engine (plus the tiny inline service-worker registration).
- `engine/engine.js` — renderer, movement, portals, saves, validators, animals,
  themes, admin tools, the NET seam. **Shared and stable; a new game never edits it.**
- `content/meridian/` — this game as data: `strings.js` (all UI copy, EN+ES),
  `quests.en.js` / `quests.es.js` (kept in lockstep), `npcs.js` (roster, looks,
  placement), `maps.js` (worlds, portals, construction stages, trolley stops),
  `config.js` (LEVELS, MAXXP).
- PWA shell: `sw.js` (precaches engine + content), `manifest.webmanifest`,
  `icon-192/512.png`.

Load order matters and is fixed in `index.html`: `qr.js` → content pack → engine.
Everything is plain `<script>` tags sharing the global scope — content files are pure
`const` data, the engine reads them. **A new gifted game = a new `content/<game>/`
folder + a copy of `index.html` pointing its six content script tags at it.**

- **21 quests** (indices 0–20; 16–20 are El Mercado's Week Two ops-analyst pack) +
  Frederick's secret side quest, fully bilingual EN/ES. MAXXP = 330 (10 per node).
- **21 NPCs** across 7 maps (hq, f2, st, ex, lc, lo, me — El Mercado Robles). The Studio (`lo`) and its
  designer **Xochi** (quest 15, "The collar drop") unlock only after both La Obra
  quests (12, 13) are answered correctly.
- **Retry-until-correct** (owner decision, 2026-08-30): a quest completes only on the
  right answer. Wrong/mid picks show the verdict + codex but never reveal the correct
  choice; the NPC keeps the ❗ and the quest can be retried. Bad picks cost a heart
  every attempt; 0 hearts still resets the week. XP is farm-proof: `qa` records the
  best XP already paid per quest and retries pay only the difference; the verdict
  header shows the actual delta (and no XP claim when nothing new was earned).
- **Endings key off hearts** (3 = flawless / 2 = strong / ≤1 = survived) because every
  finished week now ends at full XP.
- **Wardrobe** (the one exception to correctness-gating, by owner decision: cosmetics
  are extra): ANY attempt at Xochi's quest reveals a 🧵 Wardrobe button in ⚙️ Settings;
  beating the quest also makes talking to Xochi open it. Dresses **Frederick**
  (bandana/collar/cape) and **Canela** (bandana/collar — no cape for the cat). State
  in `wear` / `wearCat`, rendered by accessory passes in `drawDog` / `drawCat`,
  registry in `WEAR`. The Frederick-quest red bandana auto-equips on his quest's
  completion.
- **Frederick's care pack** (Export → 🐾 tab, unlocks with his side quest at 3 treats):
  bilingual care sheet + downloadable `.ics` of five recurring reminders.
- **Saves**: continuous localStorage (`mq1`) — every step, every pick, tab close.
  Fields: `n c lk xp he d px py tr fq w wr wc qa`. All loads are
  backward-compatible (missing fields get defaults; pre-retry saves keep their
  completed quests).
- **Update flow**: cache-first service worker; the page auto-reloads once when a new
  version takes control, so one manual refresh always lands on the latest deploy.
- **🎫 Trolley Pass** (cross-device saves, Phase 1 — shipped 2026-08-30): ⚙️ Settings →
  Trolley Pass shows the save as a QR (vendored `qr.js`, MIT, qrcode-generator) plus a
  native share button (and a copy-link fallback). Opening a pass URL (`#save=…`) on any
  device shows a boarding banner on the intro screen — name, XP, quests, and an explicit
  warning if boarding replaces a local save; it never imports without the tap.
- **Care pack personalization** (shipped 2026-08-30): the care tab has pet name +
  breakfast/dinner time fields (persisted in `mqpet`); the sheet, the `.ics` events,
  and the download filename all follow the pet.
- **CI** (shipped 2026-08-30): `.github/workflows/ci.yml` runs `test/smoke.js` on
  every push and PR.

## The save model — decided: the cartridge model (owner, 2026-08-30)

Like a Game Boy: **the phone is the device, the installed PWA is the cartridge, and
localStorage is the battery save** — the save lives on-device, full stop. The Trolley
Pass is the link cable for moving a save between devices. Phase 2 (pair-once auto-sync
via a tiny Worker) was judged **too risky for now** — it adds a service to own, contra
the zero-maintenance rule. ⚠️ **OPTIMIZE LATER**: if gifted games grow real users or
completion/interaction data worth tracking across devices, revisit Phase 2 in
`IDEAS.md` §3 — the pass UI was built so sync can slot in with no UI change.

## Shipping checklist (every change)

1. Edit — game data in `content/meridian/`, mechanics in `engine/engine.js`, chrome
   in `index.html`; keep EN and ES in lockstep (the test fails otherwise).
2. `npm install playwright-core` once, then `node test/smoke.js` — must print OK.
   It runs the real game headless: boot errors, world/portal validators, BFS
   reachability (boot AND post-construction), EN/ES parity, XP math, retry
   invariants, wardrobe for both pets. Set `CHROMIUM_PATH` if needed.
3. **Bump `CACHE` in `sw.js`** (`mq-v8` → `mq-v9` → …) or installed PWAs won't
   update. This is the most forgettable step; the README warns about it too.
4. Commit, push `main` (Pages deploys from it, ~a minute of lag).

## The cross-device save question (answered 2026-08-30)

There is **no free way to get automatic cross-device sync without a backend** — sync
needs a server that both devices talk to, and accounts to say whose save is whose.
Options, ranked:

1. **Share-link save (chosen, not yet built — roadmap #3).** A button packs the save
   into a URL (`#save=…`, saves are a few hundred bytes); on mobile it opens the
   native share sheet (AirDrop / text it to yourself). Opening the link on another
   device prompts "Found a traveling save: Rookie, 80 XP, 7/16 — continue here?"
   No copy-paste, no typing, $0, no backend. One-shot transfer, not live sync.
2. Free-tier backends (Cloudflare Workers KV, Supabase, Firebase) could do real sync
   "free-ish", but add accounts, ops, quotas, and a service that can die — breaking
   the $0-forever, zero-maintenance rule in APPROACH.md. Revisit only if gifted
   games grow a paid tier.

## Server-pivot readiness (shipped 2026-08-30)

The engine has exactly one place a backend can attach: the **`NET` seam**
(`NET={enabled:false,boot(),sync(state)}` near the top of the script) — `boot()`
at startup, `sync()` with the full save blob after every save. A 🌐 Multiplayer 🚧
button in Settings opens an under-construction panel, so the affordance exists in
the product/template today. Full pivot recipe (PartyKit / Durable Objects,
presence-first) in `IDEAS.md` §4. Rule: no other code may touch a network;
`NET.enabled` stays false for single-player games.

Hardening that ships with it (all covered by the smoke test): the **`PEERS`
draw pass** (co-presence hook — peers render like NPCs, names as canvas text
only, never DOM); **`sanitizeSave()`** guarding every trust boundary (Trolley
Pass links, corrupted localStorage, future NET payloads — numbers clamp, colors
must be hex, hostile keys drop); and a **CSP meta** (scripts self-only,
`connect-src 'self'` — a future server origin gets added there deliberately).
The split must keep PEERS, sanitizeSave, and the CSP in `engine/` territory.

## Roadmap

1. ~~CI~~ — **shipped** (`.github/workflows/ci.yml`).
2. ~~Engine/content split~~ — **shipped** (2026-08-30, its own dedicated session as
   planned): `engine/engine.js` + `content/meridian/{strings,quests.en,quests.es,
   npcs,maps,config}.js`, loaded as plain script tags (no build, no modules), with
   `index.html` as the shell. Byte-for-byte the same game — the split moved lines,
   the smoke test held throughout. The gifted-games template is real now.
   Known seams left in the engine on purpose (move when they next matter):
   `SOLID`/tile glyph semantics, `SHIRTS` + class ids, the animals' spawn worlds
   (goes with critters-as-data, roadmap #5), and the CSS/DOM chrome in
   `index.html` (per-game shell anyway).
3. ~~Trolley Pass~~ — **shipped** (Phase 1). Phase 2 (auto-sync) parked; see the
   cartridge-model note above.
4. ~~Care-pack personalization~~ — **shipped**.
5. ~~Graphics/nature pass~~ — **shipped** (2026-08-30, owner ask: "theme should
   change the game colors everywhere + more trees and animals"):
   - **Canvas theming**: `setCanvasTint()` + `tc()` mix big-surface tile colors
     (floors, walls, water, fences, furniture bulk) toward the active theme's
     accent — light 16% / dark 22%; landmark props (doors, cones, storefronts)
     keep their identity for wayfinding. Custom themes tint too (via accent).
   - **Whimsy clothing** (owner-approved): NPC shirts mix 40% toward the accent
     via `npcWhimsy()`; the player's chosen look, all skin/hair, and animal fur
     never change.
   - **Ambient layer**: `drawAmbient()` — fairy motes / forest petals / sunset
     fireflies, ~14 world-anchored particles; none on Meridian.
   - **Flora tiles**: `J` jacaranda (solid; canopy-overhang pass + blooms + EN/ES
     bump lines), `b` flower bed, `g` grass tuft (walkable) — placed in st + ex.
   - **Critters as data**: `CRITTERS` in the content pack (kind/world/spawn/color),
     kinds in the engine — butterfly ×2, colibrí, and a pettable street cat
     (`petGato`/`gato` strings). **Left for later**: folding DOG/CAT/PIG/LORO
     into the same registry (they carry special interactions — treats, wardrobe,
     quest hooks), koi for a game with water.
   - **Construction hardening**: `applyObra`'s rescue now also fires if growth
     cuts off (not just covers) the hero's tile (`obraReach` BFS), and Paloma
     gets relocated instead of bricked into the Studio.
   Comfort themes, the admin theme editor, and CI contrast/tap-target audits had
   already shipped earlier the same day.
6. **More wardrobe / Week Two** — extra items are data (`WEAR` + a draw snippet);
   the epilogues already tease "Week Two" content.
7. ~~Music~~ — **shipped** (2026-08-30): procedural WebAudio (`MUSIC` in the engine) —
   generative pentatonic melody + pad + bass, voiced/tempoed per theme, zero assets,
   zero licensing, works offline. Starts on first gesture (autoplay rules), sleeps
   when hidden. 🎵 volume slider + mute in Settings, persisted (`mqvol`/`mqmus`).
   No AI-music connector existed in the registry (checked 2026-08-30); if the owner
   later wants authored tracks, Suno-class tools need a licensing review first —
   procedural stays the $0-forever default.
8. ~~Chill townsfolk + character creator + name eggs~~ — **shipped** (2026-08-30):
   chat-only characters from the content pack (`CHILL`) and owner-created ones via
   admin 🧍 brush (tap tile → name them; tap again to remove; 12 max, stored
   per-device in `mqnpcs`, sanitized like every trust boundary). `EGGS` maps
   lowercase name triggers → original homage reaction lines (EN/ES); `dog:true`
   eggs (e.g. **Sonny**) join as a lemon beagle critter instead. Egg checks run on
   created characters, the hero's name, and the care-pack pet name. All lines are
   original allusions — never franchise quotes.
9. **AI-as-NPC** — future seam only, per owner ("not yet"): design notes in
   `IDEAS.md`; nothing may touch a network until it rides the NET rules.

## Known quirks (accepted, not bugs)

- A toast can float over an open settings-style panel briefly (z-index 6 vs 5).
- The Google Fonts fetch fails offline/sandboxed by design; system fonts cover it.
- Admin-mode map edits persist per-browser (`mqedits`) and replay at boot; portal
  tiles and the trolley stop are paint-proof.
- `APPROACH.md`'s counts (15 quests / 16 NPCs / ~1,800 lines) are as of the original
  port — it's a dated decision record, left unedited on purpose.
