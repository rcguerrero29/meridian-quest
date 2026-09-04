# Design backlog

Feature designs agreed in conversation but not yet built. When one ships, move its
section into the commit message and delete it here.

---

## 1. The Designer quest — SHIPPED

Built as designed: **Xochi · Designer** (`d`) in La Obra's Studio, quest 15
("The collar drop" / "El drop de collares", two nodes: AI-assisted design + IP,
then curation-as-QA), and the wardrobe — bandana/collar/cape registry (`WEAR`),
accessory pass in `drawDog`, `wr` field in the save, equip picker via talking to
Xochi after the quest. The Frederick-quest red bandana migrated into the system.
MAXXP 210 → 230.

**Canela shipped too** (2026-08-30): pet tabs in the wardrobe panel, bandana +
collar for the cat (`wearCat`, saved as `wc`), accessory pass in `drawCat`.

### Later / bigger

- Dress the remaining animals (Paloma, Lorenzo) — the accessory pass generalizes.
- If we ever want *player-designed* garments (typed descriptions → generated art),
  that needs an image model at runtime — out of scope for a $0 static page. The
  static-page version of that idea: a palette/pattern editor (like the character
  creator) whose output is data, not pixels — same lesson, no backend.

---

## 3. The Trolley Pass — productized cross-device saves (brainstormed 2026-08-30)

**Problem:** cross-device saves must feel like a product, not a manual chore
(owner: no copy-paste, "imports automatically"). Hard constraint: automatic sync
needs a server; free-and-serverless can only be a very smooth one-shot transfer.

**Phase 1 — Trolley Pass: SHIPPED 2026-08-30** (as specified below, plus a copy-link
fallback; QR via vendored `qr.js`). Owner decision, same day: stay on the **cartridge
model** — phone = device, PWA = cartridge, localStorage = battery save, pass = link
cable. Phase 2 judged too risky for now; revisit when there's completion/interaction
data worth syncing (note to optimize later).

**Phase 1 spec ($0, no backend):**
- One button (⚙️ Settings): **🎫 Take your Trolley Pass** — the save as an
  in-fiction transit pass, serialized base64url into `index.html#save=…`.
- Phone: opens the native share sheet (Web Share API) — AirDrop / message it.
- Desktop: renders the pass as a **QR code** (small inline QR lib, ~2KB, vendored)
  — scan with the phone camera.
- Opening the link: "🎫 Trolley Pass found — <name>, <xp> XP, <n>/16. Continue
  this run here?" Confirm imports; NEVER auto-overwrite an existing local save;
  strip the hash after handling.
- Skipped alternatives: File System Access + synced folder (no mobile Safari),
  WebRTC p2p (needs signaling + both devices online), browser sync (doesn't cover
  localStorage), GitHub-as-storage (players lack tokens).

**Phase 2 — pair-once auto-sync (only if gifted games become a product):**
- ~100-line Cloudflare Worker + KV (free tier: ~1k writes/day). No accounts:
  device A generates a random 128-bit slot ID; device B joins by scanning the same
  Trolley Pass QR once; thereafter both devices push saves on change and pull on
  boot (last-write-wins with a timestamp; prompt on conflict).
- Same button, same fiction — pairing rides the existing pass, so shipping Phase 2
  changes no UI, just upgrades "transfer" to "sync".
- Cost is not money but a broken rule: it adds a service to own and maintain,
  contra APPROACH.md's zero-maintenance promise. Decision deferred until there's
  a product reason.

---

## 4. Multiplayer & the server pivot (seam shipped 2026-08-30; feature not built)

**What shipped:** a 🌐 Multiplayer 🚧 button in ⚙️ Settings opening an
"under construction" panel (fiction: the MQT is laying track to Barrio Norte), and
the **`NET` seam** in the engine — `NET={enabled:false,boot(),sync(state)}`.
`boot()` runs once at startup when enabled; `sync(state)` receives the full save
blob after every save. This is THE place a backend attaches; nothing else in the
engine may talk to a network. The engine/content split must keep `NET` in `engine/`.

**How a future game (e.g. AJ's) pivots to multiplayer on this template:**
1. Pick the transport: a WebSocket room server — PartyKit or a Cloudflare Worker
   with Durable Objects are the natural fits (free tiers, one file of server code).
2. Fill in `NET`: `boot()` opens the socket and joins a room (room id = the game's
   content-pack name or an invite code); `sync()` throttles and pushes
   `{name, look, wear, world, px, py, dir}` — presence data, not the whole save.
3. Render peers: the engine's `draw()` already draws NPCs from a list; peers are
   just entries in a `peers` array drawn with `drawPerson`. Toasts for
   "AJ entered Meridian HQ." Co-presence first (see each other roam, dressed pets
   visible); shared quests/state come much later, if ever.
4. Flip the button: the Multiplayer panel swaps "under construction" for a
   room-code UI. The button already exists so the product never changes shape.

**Scope guard:** single-player games stay pure cartridge-model (no server, no
telemetry). Network access lives ONLY in the named seams — `NET`, and later
`AINPC` (§6). `NET.enabled` stays false unless a specific game turns it on.

**Security rules for the pivot (enforced/prepared 2026-08-30):**
- Every payload crossing a trust boundary goes through `sanitizeSave()` (numbers
  clamp, strings trim, colors must be hex, non-numeric keys drop). NET payloads
  MUST use it or an equivalent typed coercion — never trust the wire.
- Peer data is hostile by default: names length-clamped, rendered ONLY as canvas
  text (the `PEERS` draw pass — never innerHTML/DOM); looks pass color validation.
- The page ships a CSP meta (scripts self-only, `connect-src 'self'`) — a NET
  server's origin must be explicitly added to `connect-src`, which doubles as the
  checklist reminder that networking was consciously enabled.
- Server side (when it exists): wss only, unguessable room ids (128-bit), validate
  message schema and size, rate-limit per connection, hold no PII (names are
  player-typed display strings, nothing else), and the server is authoritative
  about nothing in v1 — presence is display-only, so a hostile client can at
  worst draw itself somewhere silly.

---

## 5. Comfort & graphics (AJ's feedback, 2026-08-30)

**Shipped same day:** the theme system — ⚙️ Settings → Color theme, four curated
palettes (Meridian / Forest 🌿 / Fairy 🧚 / Sunset 🌇), each with light+dark
variants, persisted per device. Adding a theme = one data object in `THEMES`;
CI enforces comfort automatically: every theme variant must pass a **WCAG
contrast audit** (≥ 4.5:1 on all text pairs) and every visible button a
**≥ 24px tap-target check** — a template palette that hurts eyes or thumbs
cannot ship. Presets stay the default because comfort needs coherent
combinations — but customization shipped the same day (owner + AJ ask): the
**admin theme editor** (⚙️ Settings → 🎨 Theme editor, admin mode only) clones
any preset into a ✨ Custom theme, exposes all ten color keys per light/dark
variant as color pickers with live preview, and a **🪄 Auto-fix contrast**
button repairs lazy changes — backgrounds stay as the designer set them, text
colors take the smallest nudge toward black or white that clears 4.5:1 on
every pair (the same WCAG math CI runs). CI verifies the fixer itself: a
sabotaged palette (ink = background) must come out passing.

**Graphics/nature pass — SHIPPED 2026-08-30** (canvas theming via `tc()` accent
mixing, NPC whimsy shirts, ambient particles, `J`/`b`/`g` flora tiles, and the
`CRITTERS` registry with butterflies, a colibrí, and a pettable street cat —
details in `HANDOFF.md` roadmap #5).

### Later / bigger

- **Fold the named animals into `CRITTERS`**: DOG/CAT/PIG/LORO are still bespoke
  copies of the same wander logic — they carry special interactions (treats,
  wardrobe, quest hooks), so the fold needs an interaction hook on the registry.
  Then: koi for a game with water, window boxes and vines for the flora set.
- **Per-theme world palettes**: `tc()` mixes toward the accent, which reads as a
  wash; a game that wants full art direction per theme could declare explicit
  tile palettes in its content pack instead.

> Current roadmap and shipping process live in `HANDOFF.md`.

---

## 2. Care pack follow-ups (v1 shipped)

The Frederick care pack (Export → 🐾) ships a copyable care sheet + recurring
reminders as `.ics`. Possible next steps:

- Let the player rename the pet and set feeding times before export (a tiny form
  above the textarea — the text-lab pattern).
- A printable one-page PDF version.
- The decision report export (`decision-report.docx` in `futureExportTypes`) using
  the logged `decisions` array — the work-side twin of the care pack.

---

## 7. Graphics upgrade path (scouted 2026-08-30; **step 1 SHIPPED 2026-08-31**)

> **Status:** step 1 (the tile-renderer registry) shipped as `TILEDRAW` in
> `engine/engine.js` — 31 glyphs, each `TILEDRAW[ch](rc)`. The content-side per-glyph
> `TILES`/`DECOR` metadata table is NOT built and now lives in §10 (the front-profile
> pivot). Read §10 before touching this section.

**Recommendation:** Stay 2D canvas and go all-in on procedural upgrades, but FIRST refactor the tile if/else chain into a tile-renderer registry that content packs can extend/override. Why: it is the only path that costs $0, keeps offline/CSP/no-build intact, preserves the flat-color charm AJ responded to, and compounds with what already exists (tc() theming, ambient particles, parametric people). Sprites are rejected for Meridian itself because the game's identity features (creator, wardrobe, theme-mixed shirts, AJ-named townsfolk with data-driven looks) are parametric and would fight raster art — but the registry seam deliberately leaves a sprite escape hatch: a future gift pack could register a drawImage-based tile from a committed same-origin PNG without touching the engine, turning "sprite art" into a per-content-pack choice instead of an engine rewrite.

**Plan (ordered):**
1. PREP NOW (no visual change, engine-only): extract the tile branches in draw() (engine/engine.js ~lines 186-275) into a TILE_DRAW registry keyed by map char — each entry a fn(g, rc) where rc={sx,sy,x,y,now,tc,rand,queueCanopy}; draw() becomes ground pass → TILE_DRAW lookup → canopy queue → actors → overlay hook. Support an optional content-pack global TILEART (guarded typeof, like CRITTERS/EGGS) whose entries override/extend the defaults — this closes the engine/content seam gap.
2. PREP NOW: consolidate the frame clock — compute now=performance.now() once per frame in loop() and pass it down (Date.now() is currently called dozens of times per frame in canopy/critter/person draws); add rand = deterministic per-tile hash h(x,y,worldId) to rc for stable variation. Run node test/smoke.js, bump CACHE in sw.js, ship — this is the pure-refactor PR.
3. LATER wave 1 (first visible upgrade, one PR): hash-driven floor variation (speckles/tone shifts on the checkerboard), south-face wall shadows (rgba(0,0,0,.12) strip on the tile below any solid), thin dark rim outlines on solid props to pop them off the floor, and 2-frame walk cycle + true left/right leg-arm swing + occasional blink in drawPerson (it already takes {dir,moving,bob} — extend, don't re-sign).
4. LATER wave 2: time-of-day lighting as the overlay-pass hook's first tenant — a low-alpha full-viewport tint (golden-hour for sunset theme, cool dusk after local sunset if the content config opts in), plus warm light pools under windows/doors at night; keep quest ❗ markers and peer name labels drawn after the overlay; cap overlay alpha ≤0.25 so themes stay comfortable.
5. LATER wave 3 (per IDEAS.md §5 'later'): per-theme/per-pack explicit tile palettes — the registry makes this a content/config schema addition (optional, backward-compatible) replacing the tc() accent wash for games that want full art direction; plus window boxes/vines as new registry tiles.
6. LATER, only if a specific gift wants raster art: document the sprite path — committed PNG in the content folder (img-src 'self' already allows it), add to sw.js precache list, CC0 source (e.g. Kenney) noted in README, registered as a TILEART entry using drawImage. Never for people/animals — those stay procedural.

---

## 8. Music v2 refinements (v1 SHIPPED 2026-08-30 — procedural WebAudio, per-theme,
volume/mute; the iOS poke-unlock, interruption recovery, and squared volume taper
from this scout landed with v1. The rest waits for a dedicated music session):

1. Prep now: adopt path (a) procedural WebAudio; record the decision (and the AI-tier licensing findings, marked verify-before-use) in docs/HANDOFF.md so nobody later commits Suno/Udio free-tier tracks into the public repo.
2. Prep now: confirm the v1 seam points in /home/user/meridian-quest/engine/engine.js — replace lines 1072–1141, keep the applyTheme() hook at line 1005, keep localStorage keys mqmus/mqvol and the #musMute/#musVol wiring; no index.html, strings.js, or CSP changes.
3. Later (build, ~1 session): implement v2 per the spec — MUSDEF with prog/density/swing/voice fields, persistent bus graph (mel/pad/bass -> master -> compressor, one echo delay), 100ms lookahead scheduler with 0.25s horizon, per-theme voice recipes (lo-fi triangle+swing+echo, bell sine+2.76x partial, marimba fast-decay triangle+grace notes, dusk detuned sine pair).
4. Later (build, same session): replace the once-listeners with the persistent musPoke unlock (pointerdown/touchend/keydown) plus onstatechange recovery, add pagehide/pageshow to the visibility pause, and switch volume to squared taper with setTargetAtTime ramps and mute->suspend after 250ms.
5. Later (polish): wire musDuck(0.35) into quest-card open/close; set customTheme.base in cloneTheme() so custom palettes inherit the right soundtrack.
6. Later (verify): extend test/smoke.js with the MUSDEF structural checks and the gesture->ctx/timer assertion; on-device pass on iOS Safari (lock/unlock, phone-call interruption, home-screen PWA, silent switch) and Android Chrome; listen to each theme for 3+ minutes for annoyance/fatigue and tune density/peaks.
7. Later (ship): bump the sw.js CACHE name and deploy to GitHub Pages.

**Licensing note (researched):** no free AI-music route is clean for a public game —
free tiers of Suno-class tools are non-commercial or service-owned; do NOT commit
AI-generated tracks. If authored tracks are ever wanted, use verified CC0 loops
(Kenney/Junkala) behind the same bus graph.

---

## 9. More fandoms & egg mechanics (brainstormed 2026-08-30 — awaiting AJ's picks;
each shipped one becomes EGGS/engine data and leaves this list)

**Fandom candidates:**
- **Twilight** — Sister fandom to Vampire Diaries — brooding vampire romance. Egg: type 'Bella' or 'Edward' and the paletera fans herself: 'That pale boy from the mercado only shops after sundown... and yesterday I swear he glittered.'
- **Stranger Things** — Nerdy sci-fi with a cozy friend-group heart, huge overlap with Marvel/PLL fans. Egg: 'Eleven' makes the taco shop's string lights blink one bulb at a time while the cook mutters that the walkie-talkies are acting up again — and a waffle special appears on the menu.
- **Gilmore Girls** — The patron saint of cozy small-town comfort TV. Egg: 'Lorelai' or 'Rory' makes the La Cocina abuela pour a fourth cup of coffee and declare that caffeine is a personality, mija.
- **Bridgerton** — Romantic drama royalty with a gossip engine PLL fans adore. Egg: 'Penelope' or 'Daphne' spawns an anonymous barrio gossip zine on the trolley bench; the muralist quietly adds a little bee to the mural.
- **Grey's Anatomy** — Long-arc romantic drama — the classic companion watch to TVD/PLL. Egg: 'Meredith' makes the curandera sigh that after a hard shift you either cry in the supply closet or dance it out in the kitchen — she recommends the kitchen.
- **Star Wars / The Mandalorian** — Marvel-adjacent nerd canon with a cozy found-family angle. Egg: 'Grogu' puts a tiny green napper inside a lunchbox at La Obra; the foreman complains the little guy already ate two workers' tortas.
- **Doctor Who** — Cozy-nerdy sci-fi comfort show. Egg: 'Doctor' turns one La Obra portapotty blue, and a worker swears on his abuela that it's bigger on the inside — nobody believes him.
- **Percy Jackson** — Nerdy YA mythology with humor, right in the HP fan pipeline. Egg: 'Percy' makes the taco shop debut blue horchata, and the plaza fountain bubbles suspiciously whenever you walk past.
- **The Hunger Games** — YA romance-drama with a fierce heroine, core HP-fan adjacency. Egg: 'Katniss' makes the panadero 'accidentally' burn a loaf and slip it to a girl he likes, while a bird on the trolley wire whistles back any tune the parrot starts.
- **Studio Ghibli** — Peak cozy aesthetic — matches the game's warm pixel-town soul. Egg: 'Totoro' spawns drifting soot-mote particles at the trolley stop (the ambient layer already exists), and a kid insists the last trolley purred at her.
- **Animal Crossing / Stardew Valley** — Cozy-game canon; Meridian Quest is basically their cousin. Egg: 'Nook' makes a tianguis vendor grumble about a raccoon who'd charge rent on a park bench; 'Junimo' adds tiny fruit-colored motes bobbing over the garden plots.
- **Outer Banks / Riverdale** — Teen mystery-drama in the PLL lane. Egg: 'JJ' or 'Sarah' makes chalk treasure-map arrows appear near La Obra, and the foreman insists there is absolutely no gold under the cement, please stop digging.

**Mechanics beyond name triggers:**
- Calendar magic (real-date triggers): the barrio decorates itself by the device clock — marigold particles and papel picado for Día de Muertos week, chalk hearts on Feb 14, and a Settings field for 'special dates' so the owner can set AJ's birthday: that day the whole town strings up lights, the paletera hands out a free paleta, and townsfolk lines swap to celebration variants. Zero network needed, pure Date().
- Date-seeded ambient weather: since the CSP forbids weather APIs, hash today's date into a deterministic forecast (sunny/drizzle/golden-hour). Rain days get puddle tiles, umbrella-carrying NPCs, and small-talk changes ('good day for pozole'); everyone on any device sees the same 'weather' that day, which makes it feel real and shareable.
- Streak memory (townsfolk who remember you): count consecutive real days played in localStorage. At 3 days the street cat starts trailing you; at 7 the taco cook has 'your usual' ready and greetings shift from formal to nickname warmth. Ambient characters earning familiarity is the coziest mechanic a cozy game can have.
- Matching-outfit reactions: the wardrobe system (player shirt colors + pet bandana/collar/cape registry) enables combo detection — dress yourself and Frederick in matching colors and the muralist begs to paint you both; specific palettes read as homage fits (red+gold formal gets 'you look ready to save the block, jefe' — a Marvel wink with no name typed).
- Pet choreography chains: petting the animals in a secret order (dog, then parrot, then cat, within a minute) makes Lorenzo the loro squawk a parade announcement and all the pets follow you in a conga line for one lap of the plaza. Hidden orders can unlock more formations — discoverable by pure play, no text input.
- Trolley Pass gift tickets: the save-link plumbing (index.html#save=...) can carry a second kind of hash — #ticket=... codes the owner crafts and texts to AJ. Opening one plays a small scene at the trolley stop (a firework, a serenade by the trio, a banner with her townsfolk's name), turning the existing QR/deep-link system into a love-note delivery service.

---

## 6. AINPC — a townsperson played by a live model (designed 2026-08-30; NOT built)

**Wish:** talk to one NPC that is actually Claude roleplaying that character, with a small task. Everything below is shaped so it attaches later without breaking $0 / zero-maintenance / static / offline.

### The seam (mirrors NET; ships as dead code whenever we are ready)

```js
/* AINPC seam — the ONLY other place (besides NET) that may touch a network.
   Deliberately empty: a cartridge that wants a live townsperson fills it;
   every other game stays pure cartridge-model. See docs/IDEAS.md §6. */
const AINPC={
  enabled:false,
  cast:[],                    /* npc keys handed to the model, e.g. ["consul"] */
  boot(){},                   /* once at startup: read config; must NOT hit the network */
  online(){return false;},    /* cheap gate: config present && navigator.onLine */
  ask(req,onLine){},          /* req={npc,text,lang,ctx}; onLine(text) called once with the reply */
  stop(){}                    /* abort in-flight (player walked away / closed the card) */
};
```

**Engine-side contract** (written once, works for every transport):
- Gate: the live-chat affordance ("Ask <name> anything") appears only for `AINPC.cast` NPCs, only when `enabled && online()`. Otherwise the NPC is 100% its scripted self — the existing `chillLines`/`T().chat` path IS the offline fallback. No error states; degradation is silent and in-fiction.
- Input: one text box on the talk card; clamp to 280 chars before send; `lang` follows the game language.
- Output: every reply passes `sanitizeLine()` (below) and renders ONLY via `textContent` on the dialog card or `ctx.fillText` bubble — same posture as PEERS names.
- Context (`req.ctx`): minimal and PII-free — `{npcKey, role, world, lang, questsDone, heroName}` (heroName is already a clamped player-typed display string). Up to 6 prior turns kept in memory only; never written to the save; wiped when the card closes.
- Timeout 10s, then scripted line + fiction toast ("the line to the capital is busy"). `stop()` fires on walk-away.

### Transports, judged

1. **Bring-your-own-llave (recommended v1 — family mode).** Owner/AJ pastes their own Anthropic API key into a Settings field (localStorage, this device only). The browser calls the Messages API directly (Anthropic supports CORS via the direct-browser-access opt-in header). $0 to the game, no server, zero-maintenance intact — and the audience for this feature is literally the household. Cheapest model, `max_tokens` ~160. Key hygiene: a dedicated key with a hard monthly spend cap set in the Anthropic console; the game never displays it back.
2. **Tiny proxy Worker (v2 — only if gifted games become a product).** ~80-line Cloudflare Worker holds the key, pins the system prompt server-side, enforces per-IP rate limits plus a KV daily token budget, clamps `max_tokens`, returns plain text. Players need nothing. The price is not money (pennies of tokens) but the same broken rule as Trolley Pass Phase 2: a service to own. Seam-compatible: upgrading 1→2 changes only what `boot()` reads (endpoint, no key) — `ask()` is untouched.
3. **Claude-artifact companion — rejected as transport.** The PWA cannot sanely call an artifact page: foreign origin in connect-src, no stable public runtime contract, requires a claude.ai login, dies offline. Keep the idea only as a possible "pen-pal" gag: the NPC offers a link that opens a claude.ai chat pre-briefed to roleplay them — fun and $0, but there is no return channel into the game, so it is a postcard, not a conversation.

### CSP + service worker implications

- `connect-src` names the transport explicitly: v1 adds `https://api.anthropic.com`; v2 replaces that with the Worker origin. Editing the CSP meta remains the conscious "networking is now on" act (same rule as NET).
- sw.js ignores non-GET requests and the Messages API is POST, so AI calls bypass the cache untouched. Standing rule for any future transport: POST only — a GET endpoint would be poisoned by the cache-first handler.

### Safety rules (kid-safe; transport-independent)

- **The model has no authority.** Replies are flavor text only: no state changes, no XP, no tools, no quest verdicts. If a live-guided task is ever wanted, the model may only choose among engine-defined outcome IDs, validated the way `sanitizeSave` validates keys — never free-form effects. Prompt-injection worst case stays "a weird line of dialog."
- **`sanitizeLine()` — client-side, always, even behind a trusted Worker:** coerce to string; strip control and zero-width chars; collapse whitespace; drop any reply containing `http`/`www` (townsfolk do not hand out links); clamp to ~220 chars; if empty after cleaning, use a scripted fallback line. Rendered only as `textContent`/canvas text — never innerHTML, never parsed as markdown. Wire data is hostile.
- **Pinned system prompt** (server-side in v2; client-side is acceptable in v1 because the player IS the household): stay in character as this barrio neighbor; PG and warm; at most 2 short sentences; reply in the player's language (EN or Mexican ES); never ask for or repeat personal info beyond the hero's name; no links, code, instructions, or real-world advice; steer off-topic questions gently back to the barrio; deflect anything not kid-appropriate in character.
- **Player text is data:** sent as untrusted user content, never concatenated into the system prompt.
- **Nothing persists:** no transcripts in the save, no content logging anywhere (v1 has nowhere to log; the v2 Worker keeps counters, never content).

### Cost controls

- v1: dedicated spend-capped key; cheapest model; `max_tokens` clamp; localStorage daily soft cap (~50 exchanges) after which the NPC "gets sleepy" in-fiction.
- v2: Worker KV daily budget with a hard stop, per-IP rate limit, same clamps. Budget exhaustion is a character beat ("the antenna is resting"), never an error dialog.

**Scope guard:** like NET, `AINPC.enabled` stays false for every cartridge that does not explicitly opt in; network access in the engine remains confined to exactly two named seams: NET and AINPC.

---

## 10. The 2.5D question — REDIRECTED by owner playtest (2026-08-31)

**Owner verdict on diamond-iso v1** (toggle stays as an experiment, default stays
top-down): tables/surfaces went generic; one building entrance is hard to see
(occlusion); doors don't read as doors; walls too thick; the street lost details,
decoration, doors and fences; the trolley stop became "a square"; and the NPC
activity emotes don't render in iso (bug — the billboard path skips them). Verbatim
steer: **"we don't want an angled profile — show us a profile from the front."**

### The architecture the owner asked for: describe the world, don't just draw it

1. **`TILES` — glyph-class metadata** (engine defaults + content overrides, one
   row per glyph): `{solid, height, thin, baseColor, kind, top, face, label}`.
   Renderers derive drawing from meaning: a counter KNOWS it's a counter. Absorbs
   today's SOLID/SOLIDX/IZH/BASECOL/MAPCOL/TILEDRAW into one table — this was
   already queued as "full tile registry"; the iso feedback proves why.
2. **`DECOR` — instance metadata** (content): one-off place descriptions
   `{world,x,y,deco:"awning-red-cream"|"trolley-sign"|"mural"}` — the trolley
   stop squared off because its identity lived in hand-drawn pixels, not data.
3. Every future renderer (front-profile, iso, someday 3D) reads TILES+DECOR.
   Never again a camera that loses meaning.

### The revised direction: FRONT-PROFILE 2.5D (not diamond)

Key insight from the owner's note: the existing art is ALREADY front-profile —
La Cocina's awning, the mercado window, the trolley sign are painted as building
FRONTS. So the right 2.5D keeps the square grid and a straight-on, slightly-high
camera, and draws solids as tall FACADES facing the player (Pokémon/EarthBound/
Stardew school):
- Keeps every pixel of existing facade detail; doors read as doors (you look AT
  them); entrances can't hide; walls read thin; fences stay fences.
- Implementation: rows render back-to-front; a solid run draws its top strip +
  a front face of `height` px; walkable rows draw flat. Actors already fit.
- Occlusion fallbacks (plan): (a) camera rotate N/E/S/W as a HUD control (iso and
  front-profile both benefit), (b) hero-proximity wall fade (alpha on faces that
  cover the hero), (c) door markers always drawn on top.
- Diamond-iso v1 fixes IF it stays: thin wall slabs via neighbor-aware
  orientation, door faces on blocks, emotes in billboards, TILES-driven tops.

**Order of work (next graphics session):** ① TILES+DECOR consolidation →
② front-profile renderer as a third camera option → ③ owner picks the default
with AJ → ④ retire or polish diamond-iso accordingly.

**①② SHIPPED 2026-08-31 (mq-v29):** `TILES` glyph-metadata table in the engine
(every solid glyph carries `{lift,kind}`; content overrides via `TILEMETA`),
`DECOR` instance seam (content rows `{world,x,y,deco}` drawn by the engine's
`DECODRAW` vocabulary — sign, mural — extendable via `DECOART`; Nacho's mural on
the avenue is the first), and `drawFront()` — the front-profile camera as a third
Settings option (`mqcam:"front"`). Square grid, straight-on view; solids keep every
painted facade pixel and grow a per-glyph roof strip; rows render back-to-front so
walls occlude what stands behind them; decor and actors interleave by row. Doors,
awnings, fences and the trolley stop all read exactly as drawn. Painting works in
front mode (tap→tile math is unchanged). Smoke covers: TILES rows for all solids,
a front-camera frame, persistence, DECOR art references.
**Remaining: ③ owner + AJ pick the default camera, ④ iso verdict**, and a future
art wave if wanted: per-`kind` facade treatments (e.g. windows lit at night on
`facade` tiles) now trivial because kind is data.

**AJ playtest round 2 (2026-08-31, on mq-v29) — polish SHIPPED mq-v30:** tables and
potted plants floated (they were getting building roof-slabs) → objects now draw a
contact shadow and stand on the floor, no slab; walls were clunky (every row of a
building drew its own roof strip = banding) → the strip draws only where a run
starts, so building interiors connect cleanly. **The ladder to "even better",
in order of cost, for when AJ wants the next rung:**
1. *(shipped)* grounding + clean rooflines — this wave.
2. *(SHIPPED mq-v31)* **Per-kind art wave**: lit windows on `facade` tiles at
   dusk/night (TILES `win` rects; a hashed few stay dark; punches through the
   night wash; shared `drawWindows` pass runs in top-down AND front), awning
   shadows (TILES `awn`), fence posts at run ends. Door light spills already
   existed in `drawDaylight` and work in the front camera unchanged. Same
   commit: **front-profile is now the default camera** via the new `CAMDEF`
   content seam (owner + AJ pick — see OWNER.md Settled).
3. **2× sprite detail**: keep TS=32 but draw at double internal resolution
   (crisper curves, outlines, dithered shading) — renderer-only, art-heavy.
4. **Real sprite sheets**: hand-drawn PNG tiles/actors replacing canvas-drawn art.
   The TILEDRAW/TILES seams take PNGs today; the cost is pure art time, and it is
   the big one. Decide with AJ only when rung 2 stops being enough.

**v1 shipped:** `drawIso()` in the engine — projection core, painter''s-sort depth,
floors as diamonds with inlays (water, rugs, blooms, grass), solids as extruded
blocks colored from BASECOL/MAPCOL with per-glyph heights, jacarandas with canopy,
door glow, people/animals as upright billboards, shared time-of-day wash. Settings →
Camera toggle (persisted `mqcam`); admin painting stays top-down. REMAINING from the
plan below: the per-glyph TILEART-ISO art pack (step 2 — richer facades), input
remap for swipe, night door-spills in iso, and the TILES-table prereq.

**What it is:** the true "between 2D and 3D" — the camera tilts to three-quarter
view, tiles become diamonds, buildings get visible height. Stardew/Hades-adjacent
feel without any 3D engine.

**Why we're READY (and why nothing before this was wasted):** the entities-as-data
law means the world model never changes — maps stay glyph grids, NPCs/critters stay
data, portals/quests/saves untouched. Isometric is a RENDERER swap, and the TILEDRAW
registry (shipped 2026-08-31) is exactly the seam it swaps through.

**The plan, in order:**
1. **Projection core** (engine, ~1 session): `iso(x,y) = ((x-y)*TSW/2, (x+y)*TSH/2)`
   with TSW=64, TSH=32; camera follows the hero in iso space; draw order becomes
   painter's algorithm (sort by x+y, then layer) — the existing canopy/actor passes
   already separate layers, so this generalizes them.
2. **TILEART-ISO pack** (content, the big cost): every glyph redrawn as a diamond
   tile + optional wall piece with height. ~35 glyphs today. Start with floors/walls
   (the 80% of pixels), keep props as billboarded sprites (drawn upright at the iso
   anchor) — this halves the art cost and looks correct.
3. **Actors as billboards:** drawPerson/animals render unchanged, anchored to iso
   feet positions — pixel people in an iso world is a beloved style (see classic
   RPG maker / Habbo). Walk input stays 4-directional.
4. **Toggle, not migration:** ship as a Settings option ("Camera: Top-down / Iso")
   reading the same world — the top-down renderer stays, so nothing breaks and AJ
   can compare live. Per-content-pack default via config.
5. **Costs & risks:** the art pack is the real bill (every tile touched); occlusion
   bugs (actor behind tall wall) need the painter's sort done right; small phones
   lose some viewport to the diagonal. Mitigation: prototype ONE world (`ex`, the
   simplest) end-to-end before committing the rest.

**Prereqs before starting:** frame-clock consolidation + per-glyph TILES table
(solid/colour/renderer in one data row) — the remaining IDEAS §7 step-2 work — so
the iso pack overrides one table, not three.

**Decision for the owner (when ready):** commit an art session to the iso pack, or
spend the same budget on top-down waves (animated water, seasonal foliage, night
windows)? Both ride the registry; iso is the bigger wow, top-down is the safer
compounding.


---

## 11. Sonny's program (owner-signed wishes, 2026-08-31 — **SHIPPED v1 2026-08-31, mq-v29**)

**Shipped:** engine-generic for every beagle (any dog named into the world gets it).
🎾 Throw-the-ball button next to the treat button when standing by a dog; he fetches
**exactly 4 of every 7 throws** via a shuffled per-dog 7-cycle (`fetchRoll` —
smoke-tested at 4/7 and 8/14); a miss is canon: he looks at the ball, looks at you,
and sits. Fetch runs a real task loop (leash off, greedy pathing, gives up gracefully
if wedged). On his own clock: lies down (eyes closed, tail slows), howls (♪ + AWOO
toast + a real note through the music engine), digs (dirt flies, leaves a hole decal
that fades in ~34s), and infrequently 💩 (fades in ~45s — the janitor business quest
stays open for Don Güero). Treats get dedicated bilingual lines and a visible tail
liftoff. Ground decals are a generic engine system (`DECALS`), drawn in top-down and
front cameras. Original wish list below, kept for the record:

**v1.1 (2026-08-31/09-01, mq-v32) — owner playtest round:**
- **FIXED: "sometimes sonny cant get the ball."** Greedy stepping wedged on walls.
  Fetch now runs real BFS pathfinding (`bfsStep`), and throws only target tiles the
  dog can actually reach (`dogReach` flood) — a throw is never a trap.
- **Sonny canon look signed & shipped** *(corrected by the owner same day —
  mq-v33)*: the WHITE HEART is ON HIS FACE, right above and between the eyes,
  set in a lemon crown over the brow; white freckles across the lemon coat and
  ear; white tail. This is the default beagle look, engine-wide.
- **Food-driven fetch shipped:** a treat fuels him for ~4 minutes — the next fetch
  cycle rolls at **6 of 7** instead of 4 of 7 (baseline 4/7 stays canon when
  unfed). Feeding restarts the cycle so the fuel applies immediately.

**v1.2 (2026-09-01, mq-v37) — owner canon round 2:**
- **Digging is minimal** — "he apparently mostly dug when younger." It stays in the
  repertoire as a rare puppy tribute (~8% of whims, was ~25%).
- **Tail: lemon with a white tip.** Collar: **blue by default**, and the drawn
  leash line (now actually rendered, player→dog, top-down and front cameras) is
  the same blue.
- **💗 I love you** — a button whenever you're beside a dog. He sits, hearts rise,
  a soft note plays, and one of three lines answers (EN/ES). "Tail thump. Slow
  blink. I love you too, says the dog."
- **Kisses: PENDING owner verification** ("he did give kisses often but ill check
  it for now") — do not build until the owner confirms the canon.

**v2 (2026-09-01, mq-v38) — owner playtest round 3, all shipped:**
- **Breeds at the doghouse:** beagle, lab (yellow/chocolate/black), chihuahua
  (tan/cream/black/white) — coat picker in the adopt panel; every breed runs the
  full dog program. Duplicate names refused, and the double-Sonny bug is dead
  (a player-named egg Sonny no longer spawns beside the content Sonny).
- **🎓 Training:** Sit / Down / Stay / Come / Follow-me from a commands panel in
  the park. Every successful rep raises the odds of the next (stored per dog in
  `mqpark.train`); a recent treat adds a big bonus — recall lands "most of the
  time, especially after a treat" (owner spec). Come works from across the park.
- **Agility course** (hurdle, tunnel, weave poles) on the east lawn — dogs
  sometimes take it at full commitment on their own clock; it stands upright in
  the 3D camera.
- **Dogs being dogs:** butt-sniffing (the ancient greeting) and chase bursts
  between park dogs.
- **Off-leash park (owner canon):** the leash line shows for the bridge crossing
  (~6s), then he's loose but follows most of the time (10% "something smelled
  important"); Follow-me toggles it, Come recalls. Leash line renders in 2D,
  front AND 3D now.
- **3D fixes:** sharper (antialias, full pixel ratio, mipmaps + anisotropy on the
  ground), billboard heads no longer sink into walls (sprites pulled toward the
  camera), swipe controls now work on the 3D canvas (they were attached only to
  the 2D one — the "movement not working" bug).
- **The face heart is smaller**, still tip-to-nose.

**v2.1 (2026-09-01, mq-v39) — owner playtest round 4, all shipped:**
- **3D blur ROOT-CAUSED and fixed:** the 3D canvas was inheriting the 2D pixel-art
  pipeline — a tiny backing store stretched by CSS with `image-rendering:pixelated`.
  3D now renders at the element's true on-screen size at device pixel ratio with
  smooth scaling (`t3Resize`, re-run on viewport changes). Night street verified
  crisp at dpr 2.
- **Dogs roam the city:** every adopted dog gets ONE particular NPC friend
  (assigned at adoption, persisted). Each time you take a door, unseen dogs may
  drift between the park and their friend's side; beside their person they mostly
  sit and adore them (hearts). Legacy dogs get friends assigned at boot.
- **Rename** any adopted dog (never Sonny) — records (bandana, training) migrate
  with the name; duplicates refused.
- **No adoption limit.** The 4-dog cap is gone (24 sanity ceiling in storage).
  **Rehome instead of delete (owner law):** the dog moves in with its NPC friend
  permanently, stays in the world and the save, and can still be visited, walked,
  and un-rehomed by leashing it back to the park. Nobody is ever deleted.

**PLANNED — dress Sonny via Xochi (owner ask, next build):** the wardrobe already
does pets (Frederick's bandana/collar/cape via `WEAR`; Canela's tab and `wearCat`).
Generalize it to named beagles: a `wr` field on the critter's stored record
(`mqnpcs`), an accessory pass in `drawBeagle` (bandana at the neck, collar, tiny
cape over the saddle — drawn to spare the heart), and Xochi's fitting room grows a
tab per named dog present in the world. Persistence rides the existing custom-NPC
records; AJ's game inherits it for any pet. Estimated one short sitting.

Frederick's beagle colleague earns a real life. All data-driven (CRITTERS gains
behavior flags), all engine-generic so any dog can opt in:

- **Fetch**: throw a ball (new item/button near Sonny); he fetches it **exactly
  4 out of 7 times** (owner-specified ratio — a seeded 7-cycle so it FEELS like
  4/7, not a coin). The misses: he looks at the ball, looks at you, sits.
- **Feed & treats**: a treat/feed interaction like Frederick's (shared treat
  system; per-pet counters).
- **Behaviors on his own clock**: howl (little musical note + AWOO toast), lay
  down (sprite state), dig holes (temporary dirt-patch tile decal that fades),
  and infrequently 💩 — which disappears on its own... until the day the city
  hires **janitors** (logged as a future business/quest concept: sanitation +
  ops-scheduling practice pack — Don Güero will love the permit jokes).
- **Activity emotes for animals** ride the same pass as the humans'.

## 12. Regressions & polish logged from owner playtest (2026-08-31)

- ~~NPC activity emotes missing in iso view~~ — **FIXED 2026-08-31**: emote drawing
  extracted into shared `drawEmote()`, called by both cameras. (Found by the
  owner's regression testing.)
- Iso list from §10 (doors, thin walls, trolley stop, street detail) — subsumed
  by the front-profile direction.

## 13. The pet-care spin-off game (owner wish, 2026-08-31 — logged, not built)

Owner, verbatim: *"we will want a mini game one day to split off and be free
marketting for a new game for pet caring only."*

**Shape signed by the owner, 2026-08-31:**
- **Sonny stars in the PREVIEW.** The mini game inside Meridian Quest is the
  marketing hook, and its intro runs *via Sonny* — he is the face that pulls
  players toward the new game.
- **The preview mini game has SOME customization** (a taste of it — scope to be
  decided at its design sitting: likely the pet's name, look, an accessory).
- **The spin-off becomes its own game and grows FULLY customizable eventually** —
  your own pet, not just Sonny. Customization depth is the product ladder:
  preview = a taste, standalone v1 = more, eventually = your pet entirely.
- **What it is:** a standalone pet-caring game — Sonny's program grown into a whole
  loop (feed, fetch, walks, grooming, the janitor economy) — published as its own
  free PWA that points people at Meridian Quest and the studio.
- **Why the architecture is ready:** the engine/content split means this is a new
  content pack, not a fork — `content/petcare/` with its own maps, strings, config,
  and the beagle/ball/decal systems already engine-generic. The wardrobe/creator
  systems are the customization seams. Same $0 hosting model.
- **Sequencing:** after AJ's game gets its pack (she's first in line for a
  split-off), and worth a `/nacho` + `/don-guero` sitting of its own for loop and
  cast. Still open for that sitting: the game's name, where the preview lives in
  the city (Sonny's own corner? a parcel?), and exactly which customizations the
  preview offers vs. holds back for the standalone.

## 14. The 3D plan (owner-requested 2026-08-31 — **v1 SHIPPED 2026-09-01, mq-v36**)

**Shipped as planned** (sittings 1-2 merged into one): three.js r149 vendored at
`vendor/three.min.js` (owner said "go ahead" — the confirm gate below is
satisfied); `engine/engine3d.js` is the fourth camera (⛰ 3D in Settings, `mqcam
"3d"`). The ground is the whole 2D floor pass baked to one texture; walls and
facades are boxes wearing their TILEDRAW art (facade texture on both long faces);
fences are cutout planes; doors stand upright and you walk through them;
furniture/props are standing cutouts; trees are trunk + canopy sprite; every
actor is a live billboard repainted each frame by the same drawPerson/drawDog/
drawBeagle code — emotes, ❗ markers, bandanas and the face heart included. The
↻ button (3D only) orbits the camera in eight stops — the "flip the camera"
wish from the iso playtest. Time-of-day drives ambient/sun/sprite tint and the
sky color. No WebGL → automatic fall back to the front camera. Smoke asserts a
3D frame actually renders headless.
**Remaining (sitting 3):** drag-to-orbit, emissive window quads at night, DECOR/
decals in 3D, input remap when the camera is rotated, and the iso retirement
decision. Original plan below, kept for the record:

### Original plan (2026-08-31)

**The strategy in one line:** we do not rebuild the art for 3D — we put the
existing 2D art INSIDE 3D. The school is "HD-2D" (Octopath Traveler, Don't
Starve): a true-3D world of extruded blocks wearing our tile art as textures,
with the people and animals as flat pixel-art billboards standing in it. Every
pixel AJ knows survives; the camera finally moves.

**Why this codebase is unusually ready (nothing so far was wasted):**
- Entities-as-data is the whole ballgame: maps are glyph grids, actors are data,
  TILES already says each glyph's `lift` (height), `kind`, and `win`dows.
  A 3D renderer is one more reader of the same model — like drawFront was.
- TILEDRAW already renders any glyph to canvas — pointed at an offscreen canvas,
  that IS the texture factory. Zero new art required for v1.
- The renderer seam exists: `camMode` dispatch + `CAMDEF`. 3D ships as camera #4.
- Game logic (input, saves, quests, collision) never changes. 4-direction walking
  in a 3D world is the charm of the genre, not a limitation.

**The library decision (the only new dependency this project has ever taken):**
vendor **three.js** (single minified file, ~170KB gzipped) into `vendor/`, listed
in sw.js ASSETS so it caches offline. Still $0, still no build step, still one
`<script>` tag. Raw WebGL is out (a month of work for less); CSS-3D is out
(janky at this scale). Decision to CONFIRM with the owner at build time.

**Build order (2-3 sittings, each ends walkable):**
1. **Texture bridge + world mesh.** Offscreen canvas per glyph → `CanvasTexture`
   (NearestFilter — crisp pixels), rebuilt on theme change so `tc()` theming still
   works. Ground = textured plane per world; solids = instanced boxes, height
   from `TILES.lift` (13px ≈ 1.2 units), facade texture on the south face, roof
   color from `roofCol` on top. End state: fly-through of Meridian Street.
2. **Actors + camera.** People/animals render to small canvases (the existing
   drawPerson/drawDog/drawBeagle calls, unchanged) → billboarded sprites anchored
   at their feet; hero input untouched. Camera: low orbit behind/above the hero
   (~40°), smooth follow, drag-to-orbit — the "flip the camera" wish from the iso
   playtest, finally real. WebGL missing → fall back to the front camera.
3. **Lighting + polish.** Ambient + one directional light driven by the same
   time-of-day clock; `TILES.win` rects become emissive window quads at night;
   door spills become a few point lights (capped); themes tint ambient/fog.
   Decals (Sonny's holes), DECOR, emotes and ❗ ride the sprite pass.
   Then the iso verdict: 3D subsumes it — likely retire the diamond.

**Costs & risks, honestly:** three.js is the repo's biggest asset ever (~170KB gz
— fine on Pages, but the first real payload cost); old-phone perf needs the
instanced path (our maps are small — 30×16 — so headroom is large); battery use
rises in 3D; and depth bugs move from painter's-sort (our problem) to the z-buffer
(the GPU's problem — an upgrade). Sprite-in-3D can look "cardboard" from steep
angles — capping camera pitch fixes that, same as the genre does.

**Sequencing (recommended):** rung ③ of the graphics ladder FIRST (2× sprite
detail — visible immediately in every camera, and those better sprites become the
3D billboards for free), then 3D per this plan. The pet-care spin-off inherits 3D
automatically the day it lands, since it's the same engine.

## 15. The 3D deep dive — root causes, and what is planned but NOT built (2026-09-01)

Owner asked for a deep dive on "still super blurry" (AJ agrees), for the broken swipe
directions under rotation, and for the rainbow bridge and doors to be **planned, not
built**. A 33-agent investigation ran with adversarial verification of every causal
claim: 27 findings survived, 17 were refuted. Only the two smallest were built.

**BUILT already (mq-v43):** the rotation bug (see §15.2 — movement never consulted the
camera; ↻ now steps 90° and swipes are rotated into world space) and the camera-default
persistence bug (three drifted whitelists, two omitting `"3d"`).

**Honest note on the investigation itself:** the adversarial-verify prompt was written
around the blur question, so it judged the rotation findings against the wrong
criterion and labelled them "red herring" while confirming every code citation as
exact. The findings were right; the label was the session's error. If a future round
reuses that workflow, give each dimension its own verify criterion.

---

### 15.1 THE BLUR — BUILT 2026-09-02 (S0 item 3), exactly as specified below

**Shipped:** `t3Factor()` in `engine/engine3d.js` picks `K` from the renderer's real
pixel ratio (1–3), clamped so the largest world's ground fits `maxTextureSize` and a
6M-texel budget (~24 MB before mipmaps). Every bake site — glyph, ground, canopy, the
actor billboards — is `K×` with a `setTransform(K,0,0,K,0,0)` so the 2D artists are
untouched. `t3CheckK()` runs every frame: a DPR change (fullscreen, a window dragged to
another monitor) re-bakes the world and resizes the billboard canvases — the "baked
once and never re-baked" note at the bottom is closed too. Test in `smoke.js` (*3D
textures are baked at the screen's resolution, not at 1x*): headless is 1× where the
old bake was accidentally right, so the test tells the renderer it draws at 2×, checks
every texture and billboard re-baked at 2×, then goes back to 1× and checks again.
Before/after at 2×: `shots/` — the pigeon becomes a bird, the jacaranda becomes leaves.

*The original record, kept as written:*


**This is the answer.** Every 3D texture is baked at **1x logical resolution** (32 px
per tile) while the renderer outputs at device pixel ratio up to 3x. That is a hard
**2.9x–4.0x magnification of the source art**, measured:

| what | source | on screen (dpr 3 phone) | magnification |
|---|---|---|---|
| ground at the hero | 32 texels | ~94 device px | **2.95x** |
| wall / facade face | 32 texels | ~94 px | **2.95x** |
| door plane | 32 texels | ~94 px | **2.95x** |
| prop sprite | 32 texels | ~99 px | **3.10x** |
| actor billboard | 36x40 texels | ~119x132 px | **3.30x** |
| tree canopy | 40x40 texels | ~161 px | **4.01x** |

The 3D view is effectively a 320x256-class image on a retina display, while the 2D
camera beside it renders the *same art* at a genuine 960x768 (`sizeCanvas()` already
multiplies by devicePixelRatio — engine.js:257-263). That is exactly the "3D looks
softer than 2D" complaint, and it is measurable, not aesthetic.

**Why the two fixes already on `main` could not have fixed it — this is the key
insight, and it explains "we fixed it twice and it's still blurry":**
- The canvas-sizing fix raised the *output* resolution. That is what makes the deficit
  visible; before it, the canvas was as coarse as the textures. On a high-DPR phone it
  was only a **~12% linear gain**.
- The mipmap/anisotropy fix only helps **minification**. A magnified texture is, by
  definition, beyond its reach. And the ground is magnified across the bottom ~68% of
  the frame — it is only minified in the top ~32%, so that fix addressed a third of
  the screen.

**The fix (≈1 hour).** Introduce one factor `K = clamp(round(devicePixelRatio),1,3)`
and bake at K× everywhere, with a `ctx.setTransform(K,0,0,K,0,0)` so the existing
drawing code is untouched:

| site | now | becomes |
|---|---|---|
| `engine3d.js:13` glyph bake | `c.width=32;c.height=32` | `32*K`, then setTransform |
| `engine3d.js:69` world ground | `gc.width=w.W*32` | `w.W*32*K`, then setTransform |
| `engine3d.js:135` canopy | `cc.width=40` | `40*K` + `g2.scale(K,K)` |
| `engine3d.js:162` actor | `c.width=36;c.height=40` | `36*K` / `40*K` |
| `engine3d.js:198` actor redraw | `setTransform(1,0,0,1,0,0)` | `setTransform(K,0,0,K,0,0)` |

No world-unit scale changes — every `scale.set(...)` is in world units and stays.
This is safe because `TILEDRAW` and `drawPerson` only issue logical 2D drawing calls;
they never read `canvas.width` or touch pixel data, so a ctx transform scales them
cleanly.

**Memory guard, required:** the largest ground is `st` at 30x16 tiles = 960x512 today.
K=2 → 1920x1024 (7.9 MB RGBA); K=3 → 2880x1536 (17.7 MB + ~6 MB mipmaps). Clamp with
`K = Math.min(K, Math.floor(maxTextureSize / (w.W*32)))`. **K=2 is the safe default**;
K=3 only where `capabilities.maxTextureSize` allows. Also re-bake on a devicePixelRatio
change (a window dragged between monitors), which nothing currently does.

**Ruled out — do not re-investigate.** The drawing buffer is an exact 1:1 match for
displayed device pixels at dpr ≤ 3 (measured). setPixelRatio-before-setSize ordering is
correct in the vendored three.js. There is no path where the renderer keeps a stale
small buffer, and the `clientWidth`-before-layout / 360 fallback never sticks.

**Also true, smaller:** billboards are baked once and never re-baked — not on resize,
not on fullscreen, not on DPR change — so entering fullscreen makes actors measurably
softer than the world around them.

---

### 15.2 Rotation — BUILT 2026-09-01, recorded for the record

`grep -c "T3" engine/engine.js` was **0**: movement was pure world-space and never
consulted the camera. At yaw 0 that is an exact identity, which is why it felt fine
un-rotated and the bug looked intermittent. And ↻ stepped **45°** — a 4-way grid cannot
be driven from a 45°-rotated camera, so at four of the eight stops *no* swipe
corresponded to a straight on-screen move. That is why "some directions" broke rather
than all. Fixed: quarter turns (N/E/S/W, as docs/IDEAS.md §14 originally specified) and
screen intent rotated into world space inside `tryStep`, before `dir` is set — it must
be there, because `dir` feeds both sprite facing and the move interpolation.

---

### 15.3 DOORS — BUILT 2026-09-02 (S0 item 2); one new finding logged below

**Shipped, all in `engine/engine3d.js` `t3Build()`, test in `smoke.js` (*in 3D a door
stands in its wall, and a wall has a face on every side*), before/after in `shots/`:**
1. A door is turned to match its wall — walls north and south of it → it faces east-west.
2. A `wall` box wears its art on all four sides; a `facade` keeps plain ends (a
   building's corners are not its front). Every north-south wall in HQ has a face now.
3. The door is a thin box (1 × 1 × 0.14), art on both broad faces, frame colour on the
   edges, with a **lintel** above it cut from the neighbouring wall — the slot is gone,
   and because the door is thinner than the wall, the wall's side shows as a recess.
4. The "this one opens" light is a floor strip under the door, breathing on the same
   clock as the 2D art (`t3Glow`). The bake itself is pinned to one frame via `rc.t`,
   so a door bakes identically every build and shots are comparable.
5. Edge-on at the two side stops a box shows its jamb instead of vanishing.
6. The door bakes on an untinted base, so the 2px theme-coloured border is gone.

**New finding from the eyeball pass (pre-existing, NOT this change):** stand on the
north side of an interior wall — HQ (8,12), the wall is row 13 — and at the default
stop the wall hides everything but your head. The camera is 6.2 high at 7.4 back, so
its line to your feet crosses the wall's top (1.1) at about 0.94. The 0.34 pull toward
the camera does not clear it. Options, cheapest first: fade any wall box between the
camera and the hero; lower walls to ~0.9; raise the camera. None chosen — it is a
separate item (backlog §3).

*The original record, kept as written:*


The maps are **not** the problem — the smoke suite now proves every shipped door is
structurally sound. The wrongness is entirely in `engine3d.js:98-124`.

1. **The 3D door plane has no rotation, so 6 of 16 doors face 90° away from their
   wall.** Every one of them is in HQ — the starting map, the first thing anyone sees.
   *(minutes)*
2. **The deeper cause: wall boxes are orientation-blind too** — every N-S wall in HQ is
   an untextured dark-purple slab. Fixing doors properly means fixing this. *(a sitting)*
3. **No recess, no jamb, no lintel — and a see-through slot above every door.** *(an hour)*
4. **The "this one opens" pulse is frozen in 3D** at a random brightness, sometimes
   near-invisible. *(an hour)*
5. Doors vanish or mirror at 2 of the (previously 8) camera stops. *(minutes)*
6. Cosmetic: a 2px theme-tinted border frames every 3D door, because the bake base is
   `tc()`'d and the art is not. *(minutes)*

**Suggested order:** 1 → 2 → 3, since 1 is minutes and 2 is the real cause.

---

### 15.4 THE RAINBOW BRIDGE — planned, NOT built

**Fact base:** the rainbow bridge is **2 tiles of flat floor art**. There is no bridge
object, in any camera. The owner wants "an arch and even some day of the dead theme
colors".

- **The tile grid is not the constraint** — the flat ground plane and the `y=0` actor
  pin are. An arch means actors need a height, which is a real engine change, not art.
- **Day of the Dead colours cannot come from `THEMES`**: the bridge is deliberately
  theme-immune and only one theme key reaches the canvas. Options: a new named theme, a
  per-prop palette, or a seasonal override — each costed differently, none chosen.
- **This is culturally specific — the owner should sign off on the palette**, and it
  touches El Parque, which is the pet spin-off's shop window.

---

### 15.5 ERROR LOG — designed, NOT built (owner: "efficient and low storage")

**Blind spot it must close first:** 3D failure is swallowed in four places and leaves
zero trace (`engine3d.js:228, :242, :200` and `engine.js:263`), and the boot audits
already `console.warn` real diagnostics that are invisible on a phone. That is why "is
3D even running?" could not be answered from the field.

- **Buffer:** key `mqerr`, 30 entries, dedup by `kind|message|source` with a count and
  last-seen instead of N copies, **16 KB hard ceiling** — worst case ~14 KB, typical
  ~4 KB. Follows the existing `slice(-N)` ring-buffer and terse-key conventions.
- **Capture:** `window.onerror` + `unhandledrejection` + one `mqwarn()` that upgrades
  the five `console.warn` sites already in the engine. Four swallowing catches each get
  one call and no control-flow change.
- **Storage failure:** existing try/catch-and-carry-on convention, with a halve-once
  retry and an in-memory fallback (private mode must not break the game).
- **Surface:** a 4th tab in the existing Exporter — **zero new UI, zero new copy code**,
  four taps from the gear.
- **Never log:** every player-entered free-text field, scrubbed out of exception
  messages too (clamping alone does not close this).
- **Footprint:** ~55 new lines, ~12 modified, 4 files, no new file, no new dependency.

**Related, worth doing with it:** there is no at-a-glance build stamp — the version is
buried behind the gear, so "am I on the new build?" cannot be answered in the field.
And CI's version lockstep proves `sw.js` and `config.js` *agree*, never that the number
*moved* — a fix shipped without a bump strands every installed PWA and CI stays green.

---

### 15.6 THE DOORWAY BUG — (a) FIXED 2026-09-02, (b) settled as design

**(a) shipped 2026-09-02, first item of the S0 sitting.** Option 1 below, generalised:
`tryPortal(ts)` in `engine/engine.js` checks the tile under your feet on BOTH the
step-completion path and the standing path of `loop()`, so a door whose cooldown runs
out while you stand on it simply fires. Ping-pong stays impossible: every warp records
the tile it set you down on in `portalHold`, and that tile is inert until you leave it —
which also covers a future pack whose doorstep IS a portal (today that is only a boot
warning). `Y`, the trolley stop, deliberately stays step-only: a menu you dismissed must
not reopen under your feet. The test that was "deliberately NOT committed" is now in
`test/smoke.js` (*a door you walk straight back into must let you back in*), with two
guards: the hold, and the stop. It reproduced the bug a second way by accident — a warp
from the park section 700ms earlier swallowed the control step — which is the same bug
wearing a different hat, and the standing check fixes both.

*The original record, kept as written:*


Owner: *"what also happens when the character doesnt quite move but turn in place or
close to it infront of an entrance, this was also behaving weird."* Two separate real
things, both reproduced with a scripted probe, neither guessed at.

**(a) A door you just came through ignores you for ~900ms — and never re-checks.**

Reproduction, exactly: walk out of Meridian HQ into the street. You arrive at (14,1).
Turn around and step straight back onto the door at (14,0). **Nothing happens.** You are
standing on the door and it does nothing. Waiting does not help. You have to step off
and step back on.

Mechanism, confirmed by waiting out the window and retrying the *same* door (it then
worked): `portalT = performance.now()+900` at `engine/engine.js` blocks re-triggering
after a warp. The portal check lives inside `if(mt>=1)` — the move-completion branch of
`loop()`. So if you *arrive* on a portal tile while the window is still open, the portal
is skipped, and because standing still never completes another move, **it is never
re-checked**. The door is not broken; the guard is swallowing a legitimate entry.

Do not just delete the guard — its comment says it "kills door ping-pong", and that is
real: without it you would bounce between two doors forever. The fix has to keep that.
Options, cheapest first:
1. **Re-check on arrival, once the window closes.** Keep a `pendingPortal` flag when a
   portal is skipped, and fire it the moment `performance.now() > portalT` while the
   hero is still standing on it. Preserves ping-pong protection exactly.
2. **Scope the guard to the portal you just used**, not all portals — remember the
   destination tile and only suppress *that* one.
3. Shorten the window (weakest — it just makes the dead zone smaller).

**A test exists for this and is deliberately NOT committed**, because it fails today: it
walks the hero out and straight back in, and asserts the world changed. Add it with the
fix, in the same commit.

**DECIDED 2026-09-01:** (a) is **planned, not fixed** — it goes in with the doors,
walls and bridge so one session does all the 3D/world work together. (b) is **settled:
movement stays one press, one step** (now in `docs/OWNER.md` → Settled). So the doorway
feel is expected to come entirely from fixing (a).

**(b) There is no turn-in-place. One press always steps.**

Verified on open ground with the post-warp input freeze cleared (the first measurement
was contaminated by that freeze — noting it so the next session does not repeat the
mistake). `tryStep()` sets `dir` and moves in the same call, so **you cannot face a door
without walking into it**, and you cannot face anything without stepping onto it. In
front of an entrance that means every press toward the door is a warp — there is no
"stand and look at it" state at all. That is very likely what "doesn't quite move but
turn in place" is describing.

This is a **design decision, not a bug** — Zelda/Pokémon-style "first press turns, second
press walks" is a real option but it changes the feel of every single step in the game,
so it is the owner's call, not a fix to slip in. Note that nothing needs facing today:
`checkTalk()` and every animal interaction use Manhattan distance only, so adding
turn-in-place would cost a step everywhere and buy nothing mechanically — its only
benefit is that doorways stop feeling twitchy.

---

### 15.7 THE EYEBALL PASS — `node test/shots.js` (built 2026-09-01)

Owner's ask: *"can you run basic 'manual' smoke tests like oh this looks like a door or
store or restaurant."* `node test/smoke.js` proves the maps are structurally sound; it
cannot see that a door is lying on the floor. So `test/shots.js` + `test/spots.json`
drop the hero at a list of spots and screenshot the viewport per camera into `shots/`
(gitignored). What the first pass actually showed:

- ✅ **Calle Principal reads correctly in 3D.** The terracotta facade with a striped
  awning and lit windows reads as a restaurant; the green storefront with produce
  crates reads as a grocery. Awnings, trees, jacaranda blossoms and the trolley track
  all land. This is the best-looking part of the game.
- ✅ **Doors in the FRONT camera are excellent** — panelled, handled, upright, properly
  set into the wall.
- ❌ **Doors in 3D are lying flat / rotated 90°**, confirming §15.3 finding 1 *visually*
  rather than by code reading. In HQ — the first room anyone sees — several doors read
  as brown rectangles on the floor.
- ❌ **HQ's walls in 3D are flat untextured purple slabs** (§15.3 finding 2). The room
  reads as an empty gallery rather than an office.
- ❌ **The rainbow bridge is a flat rainbow stripe painted on the ground** that does not
  even span the river — it reads as a smear on the floor, not a crossing. Confirms
  §15.4: there is no bridge object in any camera.
- ✅ **FIXED at mq-v44** — the ticker held ONE message for a flat 10s, so it sat there
  showing the same words as the live toast. It now keeps the last TWO (older dimmed) and
  expires with the toast plus 1.8s. Original finding kept below for the record:
- ~~⚠️ **The activity ticker and the toast show the same text at the same time**, and the
  ticker is a large translucent block over roughly a third of the view. Both cameras.
  The ticker is a deliberate owner-requested feature (mirror the last message so it can
  be re-read after the toast fades) — so this is a design call, not a bug: either make
  the ticker one clipped line, or suppress it while the toast is still showing the same
  string.

---

### 15.8 THE COLD-READ PASS — `node test/tilesheet.js` (built 2026-09-01)

Owner named the gap: *"the test we are missing is acting as a person new to videogames
going through the store fronts or building fronts."* `smoke.js` checks structure;
`shots.js` shows scenes in context, **where the surroundings give the answer away**.
This renders every tile at 4x labelled ONLY by its glyph, so the art has to carry the
meaning alone. Findings from the first pass, judged cold before checking intent:

**Reads instantly — leave alone:** agility hurdle, tunnel, weave poles, doghouse,
fence, traffic cone, the yellow/black construction barrier, the MQT stop (pole + sign +
bench), coffee cup, potted plant, fridge, stove, shelving, drafting table, blueprint
wall, river, ~~stairs~~, flower bed, scaffolding — and the produce crate, now that the
fruit has silhouettes instead of coloured dots.

**All five FIXED 2026-09-02 (S0 item 5 — the owner assigned the legibility pass to the
3D/world sitting).** Re-read cold on the new sheet: `Q` a red building with a steaming
bowl and a chile in the window; `D` a desk with a monitor and a sheet of paper; `T` a
round gingham table with two plates and a chair either side (without the chairs it could
pass for a pizza — so the chairs); `I` a dial-and-tray scale weighing a tomato; the five
doors are five different doors, and the four shop doors have glass. The door seam is
`DOORLOOK` in `content/meridian/maps.js` — the engine draws one body, the pack colours
it for where it leads — guarded by a smoke test that bakes every door glyph and fails
if any two are pixel-identical. Note for S1: `Q`, `Z`, `I` and friends are Meridian's
own storefront art living in `engine/engine.js`; the `TILEART` seam exists for a pack
to own them and Meridian does not use it yet (backlog §2).

*The findings as first written:*


1. **`Q` — La Cocina's storefront does not say "restaurant".** A red building, an
   awning, two blank cream windows. No food cue anywhere. The mercado (`Z`) now reads
   correctly *because it has produce in the window*; La Cocina has nothing equivalent.
   **Biggest one — a whole business nobody can identify.** Fix shape: give the window
   something edible or a hanging sign (a bowl, a comal, pan dulce), the way `Z` got
   produce. *(minutes)*
2. **All five door glyphs are pixel-identical** (`+ E L O M`). An interior office door,
   a shop entrance and the mercado's door are the same brown double doors, so nothing
   tells a newcomer which one leads somewhere. Fix shape: keep the shared door body,
   vary the frame/colour per destination class. Note this compounds §15.3 — in 3D six
   of them also face the wrong way. *(an hour)*
3. **`D` — the desk reads as a cardboard box.** Brown box, small white label. *(minutes)*
4. **`T` — the dining table reads as a dartboard.** Round, cream, red dot centred.
   *(minutes)*
5. **`I` — the mercado counter's scale is illegible** at tile size; another brown box
   with a grey smudge. *(minutes)*

**Ambiguous but arguably fine** (they are floor/infrastructure, and context does carry
them): `R` plain lilac, `≈` dark grey, `-` grey with three bars, `2` a small chevron.

**Open question put to the owner and not yet answered:** whether this storefront
legibility pass is its own sitting or rides along with the 3D/world session in §15.

---

### 15.9 SEASONS — SEAM BUILT 2026-09-02 (S0 item 4), bridge as the proving run

**Shipped:** `SEASONS` in `content/meridian/config.js` (one season, `muertos`, Oct 18 –
Nov 3, a DRAFT palette the owner signs off); in the engine `art(key, fallback)`,
`seasonNow()` (by the calendar, read once a day, turning over at midnight re-bakes 3D),
`seasonSet()` (persists as `mqseason`, re-bakes 3D) and a Settings row built from
content — *by the calendar · year-round · Día de Muertos*. `TILEDRAW["^"]` paints its
six bands through `art("bridge", BRIDGE_BANDS)`; planks and rails stay design. The
portability guard now also bans `muertos`/`otono` from the engine. Test in `smoke.js`
(*a season changes colour, never design*): off → fallback; forced → the pack palette
reaches the bridge pixel; auto → first and last day in, mid-June out; persists; 3D
rebuilds; the row has the season's button. **Not yet widened** — jacaranda, awnings and
the light wash are the next `art()` keys once the owner has seen the bridge.

*The original record, kept as written:*


Owner's answer to the bridge-palette question, and it is better than any of the three
options I offered: *"add another mode for fall/halloween and thats where the rainbow
bridge colors are accurate to the dia de los muertos colors, then if someone changes
the palette, it can change but keep the general design."*

**The rule, which travels to any pack and any story:** **a season changes colour, never
design.** The arch, the abutments, the deck, the plank rails — all constant. Only the
six band colours, and whatever else a season declares, are swapped. That also settles
the cultural-specificity worry cleanly: Día de Muertos becomes a *season the player
enters*, not the game's permanent default.

**Why it needs new machinery.** `THEMES` (engine.js:1892) is a **UI-chrome** palette —
`bg / surface / ink / muted / line / accent / chip / bubble`. It never reaches tile art.
That is precisely why the bridge is theme-immune today: `TILEDRAW["^"]` (engine.js:525)
hardcodes its six stripes as literal hex. So seasons are a **second, separate** palette
layer for WORLD ART, and the two must not be merged — a player choosing the "forest" UI
theme should not repaint the barrio.

**Shape (content-declared, per the entities-as-data and engine-never-names-content
laws):**

```
/* content/meridian/config.js */
const SEASONS={
  default:{},                                  /* the year-round look */
  otono:{ label:{en:"Autumn",es:"Otoño"},
          art:{ bridge:["#E0483C","#F07C24","#F2B705","#E8478F","#7B4BA8","#2FA5A0"],
                jacaranda:"#C8721F", ... } }
};
```

- Engine gains one accessor — `art(key, fallback)` — and every hardcoded world-art hex
  moves behind it. `TILEDRAW["^"]` becomes `art("bridge",DEFAULT_BRIDGE).forEach(...)`.
  A pack that declares no seasons behaves exactly as today.
- **The engine must not know the season NAMES** (§ the portability guard). It knows
  "there is a current season and it may override art keys"; content names them.
- The bake caches must invalidate on a season change — both `TILEART`/`TILEDRAW`
  consumers and `t3Invalidate()`.

**SIGNED 2026-09-01 — all three answered:**

1. **ONE season, named for Día de Muertos.** The owner asked why two might ever be
   worth it; the honest answer is that it would not be about the palette. Halloween and
   Día de Muertos share a week and share almost no visual language — Halloween is
   pumpkins, black and orange, cobwebs; Día de Muertos is marigold, papel picado,
   candles and altars. Splitting only pays if the game wants Halloween's *props* as
   well, which is a content pack, not a palette. One season it is, and it takes the
   Día de Muertos palette — which is also the right fit for a bridge that is a memorial
   crossing.
2. **Auto by date, with a manual override in Settings.** The season arriving on its own
   is the north star ("log in to see what is different in town"); the override is for
   testing and for anyone who wants it year-round.
3. **Bridge first, then widen.** Ship the seam with the bridge alone as the proving
   run; jacarandas, awnings and the lighting wash come after it is shown to work.

**For the record, the original three questions:**

1. **Halloween and Día de Muertos are different traditions** (Oct 31 vs Nov 1–2; one is
   costumes and scares, the other is remembrance, marigolds and altars). Merging them
   into one "fall" mode is a real choice and worth making deliberately, not by default.
   Options: one autumn season carrying both; two distinct seasons a few days apart;
   or one season named for Día de Muertos alone, with no Halloween framing. **Ask the
   owner — this is theirs, and the bridge is a memorial crossing, which points at
   remembrance rather than Halloween.**
2. **Auto by date, or a manual pick?** Recommendation: auto by date with a manual
   override in Settings — "log in to see what is different in town" is the north star,
   and a season arriving on its own is exactly that. A pure toggle makes it a costume.
3. **How far does a season reach?** Bridge only (cheap, contained) or the whole city —
   jacarandas, awnings, the lighting wash? Recommendation: ship the seam with the
   bridge only, then widen once it is proven. Wide is where the cost is.

---

### 15.10 ELEVATION — the maths for walking over the arch (owner: "worth taking the
time to figure out the maths"; PLAN ONLY)

Today every actor is pinned to the floor: `engine3d.js:207` sets a sprite's position
to `(ax, 0, az)` — the y is a literal zero — and the world is one flat
`PlaneGeometry(W,H)` at y=0. That pin, not the tile grid, is what stops you walking
over anything.

**The cheap version first, so it is on the record:** draw the arch as a prop *behind*
the walkway and leave the hero on the flat tiles. From the front camera nobody can
tell. If the answer to "is the arch worth an engine change?" is ever no, this is the
fallback and it costs an afternoon.

**The real version — a height field.** Four pieces:

1. **`ELEV`, content-declared.** A list of spans: `{world, from:[x,y], to:[x,y],
   rise:0.9}`. The engine derives a per-tile height; content never writes a curve by
   hand.
2. **The curve.** For a span of `n` tiles, with `t` the normalised position along it
   (0 at one bank, 1 at the other): **`h(t) = rise · sin(π·t)`**. It is zero at both
   ends, peaks at the middle, and its slope is continuous, so the walk has no visible
   kink where the bridge meets the bank. A true circular arc
   (`h = √(r² − (t−½)²·span²) − (r − rise)`) is marginally more "bridge-like" and needs
   a radius solve; the sine is the right first choice.
3. **Actor height = bilinear sample.** The hero sits at fractional `(fx, fy)` during a
   step, so sampling the nearest tile would make the walk stair-step. Bilinearly
   interpolate the four surrounding tile heights — that is what makes the climb read as
   a slope instead of a lift.
4. **Per camera:**
   - **3D:** `spr.position.set(ax, h, az)`. The arch itself is a **separate mesh**, not
     a displaced world plane — re-meshing the whole ground to raise two tiles is waste,
     and a separate mesh keeps depth-sorting honest so the hero passes in front of the
     bands below and behind the ones above, for free.
   - **Front / 2.5D:** offset the sprite's screen y by `−h · PX_PER_UNIT`. This is the
     camera the owner plays in most — get this one right first.
   - **Top-down:** elevation is invisible by definition. Leave it; optionally a small
     shadow offset so the hero reads as "above" the deck.

**What it costs beyond the bridge.** This is the honest part: a height field touches
movement, both 2D renderers and the 3D renderer, and every future prop has to decide
whether it has a height. That is exactly why it is worth doing *once, properly* — it is
also the thing that unlocks stairs, rooftops, the trolley platform and any future
bridge. Do not build it for one park tile alone; build it when a second thing needs it,
or when the owner says the arch is worth it on its own.

**Not a blocker for §15.9.** Seasons are pure colour and can ship without any of this.

### 15.11 PROPS DRAWN FOR THE CAMERA THAT SEES THEM — BUILT 2026-09-02 (first slice)

**The owner's report:** *"some furniture still looks bad like the table and fences and
the coffee machine"*, and *"it is now hard to see some doors"*.

**Root cause, from the frames (`shots/14-cocina-3d.png` before the fix):** every prop is
drawn once, from ABOVE, and the front-profile and 3D cameras stood that same picture up
like a cardboard sign. A gingham table from above is a disc; stood up it is a dartboard.
A counter from above is a grey square with a cup on it; stood up it is a grey sign.

**How the professionals do it:** HD-2D games (Octopath Traveler and its family) never
draw an object from above. Every object has ONE sprite drawn from the front, at a slight
three-quarter, and the camera is pitched so that sprite reads as standing in the world.
Doors get three things: a frame that contrasts with the wall, light spilling out of the
doorway onto the floor, and a marker or label when you are near.

**Built:** `TILESIDE` — a second drawing per prop for the cameras that see it standing.
`sideArt(g)` returns the side view or falls back to the top-down art. The front camera
and the 3D cutouts (and fence planes) use it; walls and facades keep their face art. A
pack adds or overrides with `TILEART_SIDE`. The cold-read sheet now writes a second
image, `shots/13b-side-tiles.png`. First slice: the table `T`, the counter `K` (a coffee
machine every third tile — fourteen in a row was not a counter), the stove `V`. The
barricade `G` was redrawn in both views (an orange board with white stripes on two legs;
it was an orange frame that stood up as a ladder). Doors in 3D: a warm sand frame baked
around the door face and on the jamb, and the light pool under the door grown from
0.72×0.44 at 35% to 1.0×0.6 at 50%.

**Still drawn from above and stood up, and judged acceptable in the frames:** `D` desk
(already three-quarter since S0), `P` plant, `C` cone, `X` site sign, `H` crate, `S`
shelves, `I` scale, `A` drafting table, `U` panel, `9` doghouse, `□` box, `W` fridge,
`F` picket fence (reads as a fence in the park, `shots/18-park-fence-3d.png`).
Any of these the owner reports gets a side view the same way — one drawing, one cold read.

**`1` stairs was on that list and did not belong there (struck 2026-09-04).** It was never
stood up in any camera, because it *cannot be* today: `"1"` is in neither `SOLID`
(`engine/engine.js`) nor the pack's `SOLIDX`, and a non-solid glyph never reaches `sideArt()`.
The front camera and the 3D ground bake both paint its top-down art flat onto the floor, and
the iso pass skips it and draws a gold lozenge — so `IZH["1"]=10` has never once been read.
Every other glyph in the list above is solid; the stairs were the one exception and the doc
did not say so. Owner, 2026-09-04: *"those stairs are trash. not realistic."* He was cold-
reading a tile that three of four cameras were drawing as a rug.

**Not done:** a marker or label over a door when you stand near it (the third door
affordance). The talk bar already names people; a door could get the same treatment.

### 15.12 FOUR REPORTS FROM THE OWNER'S PHONE — BUILT 2026-09-02

- **"logs of the crosswalk while im trying to talk to who i thought was don guero."** The
  crosswalk line is the pigeon's ("The pigeon judges your crosswalk technique"). She
  wanders the street; when she stepped beside the player at Don Güero's side, her pet
  button appeared next to Talk and took the tap. **Fix:** a person with a quest beside you
  hides the animal buttons. Step away to pet her.
- **"i think we should have a marker."** The third door affordance: within three steps of
  a door that leads somewhere, a bouncing arrow floats over it, in every camera
  (`doorMarks()` / `drawDoorMark()`; the 3D one rides the actor-sprite pool). Interior
  doors that go nowhere get nothing.
- **"the fences in the construction … are sideways … laying around."** Every fence
  panel in 3D faced south, so a north-south run showed as edge-on slats. **Fix:** a panel
  stands along its run; a corner gets two panels. Under test on the street map.
- **Two of the engine ceiling's remaining items fell** because the next four districts
  need them: a district names its own ending strings and its own "next lot" toast
  (`CHAPTERS[i].epi/go/open`, with the old two-set rule as the fallback), and a person's
  look is keyed by who they are (`lookOf(n)`: npc id first, map letter second).

### 15.13 SIX REPORTS FROM THE OWNER'S LAPTOP AND PHONE — BUILT 2026-09-03

Owner, playing `mq-v51` on a Mac browser and a phone: *"upon the completion of the first
part and it says out on the street again … stuck in the initial page … 'Joystick or arrow
keys to roam'"* · *"on a laptop i would like to use the keys"* · *"a building appears after
finishing the permits conversation but it is not a smooth switch"* · *"most art only have
one display from any direction"* · *"Sonny is picking up the ball with his butt"* · *"at
370xp there isn't anyone to talk to"*. Every one reproduced in headless Chromium first;
every fix has a test that was red before it.

1. **The Saturday played again, then the street was blank.** Two bugs under one report.
   `sanitizeSave()` — the loader every Continue and every Trolley Pass goes through —
   never carried `cs` (districts claimed) or `mk` (the grades). So every Continue reset
   the district counter to zero: with Week One's twelve done, `chDue()` was true again and
   the ending replayed ("out on the street **again**"). Then the boot path that goes
   straight into an ending never called `sizeCanvas()`, so after "Out to the street" the
   canvas kept its hidden-time height of **0px**: the HUD and the control hint showed over
   nothing. Fixed: the loader carries `cs`, `mk` and `so`; every return to the street goes
   through `showWorld()`, which sizes the canvas; the boot-into-ending path applies the
   control scheme. **Saves damaged by the bug are repaired at Continue:** a save with no
   version stamp (`v`) rebuilds the counter from what was played — a district counts as
   claimed when its need is met AND the next district was started, so a Saturday never
   seen still plays once and one already seen does not replay. The owner's own save will
   play the mercado's Saturday once more (its counter was reset), and that Saturday now
   ends with Chelo phoning Tacho and the toast that opens the taller. **Grades already lost
   cannot be rebuilt** — the report starts marking again from here.
2. **Keys on a laptop.** Arrows and WASD already walked; capitals (caps lock, shift) and
   physical key codes (a non-QWERTY layout) did not. `keyDir()` reads `key` then `code`.
   Enter still talks to the person in front of you.
3. **The building popped in.** The staged build was applied the instant the pick landed,
   while the card covered the street, so the site had already changed when the card closed.
   Now the change waits for the card and lands behind a short dark curtain (`#veil`, 0.42s
   each way) with the "taking shape" toast after — `growthPend` + `curtain()`. If the same
   pick closes the district, the ending's own scene cut takes over and the curtain is
   skipped.
4. **One face from every direction.** In 3D, furniture stood as camera-facing cutouts —
   a billboard by definition shows one face. Best practice in 2.5D pixel games: **billboards
   for round and organic things, boxes for boxy ones.** Furniture, appliances and anything
   content marks `box:true` now stand as a box when the pack drew a side view (`TILESIDE`):
   the side art wraps all four faces, measured to the drawn height so nothing floats, and
   the top-down art is the lid. Tables, counters, the stove, the pack's shelves, cabinet,
   bench, coffee machine and the moving boxes are boxes; a plant, a cone, a pile of tires
   stay cutouts, which is the right shape for them. Shots `26`–`28` walk around La Cocina
   and Floor 2. **Still one-faced, on purpose:** the HQ desk `D` and the other engine
   furniture without a side view (`A H I S W`) — draw the side and they stand up as boxes
   with no further code.
5. **Sonny's ball.** The 2D painters mirror an animal by its WORLD facing (`face` = ±x);
   a billboard always shows its painted face to the camera. Turn the camera to the north
   stop and a dog trotting to world +x was painted facing screen-right while +x was now
   screen-LEFT — so the ball he carries, placed at world +x, sat behind him. Facing is a
   screen-space fact: `t3ScreenFace()` derives it from the camera stop and the actor's
   velocity, and the hero's direction goes through `t3ScreenDir()` so a hero walking toward
   the north camera shows their face, not their back.
6. **"Nobody to talk to at 370 XP."** 370 = everything `mq-v50` had (Week One 230, the
   mercado 120, Frederick's side quest 20). `mq-v51` added the four districts, but a lot
   that opened while the phone was away was never announced. Now `lateOpenToast()` says it
   once at Continue — the toast the district would have played — only while nobody there
   has been talked to; seen toasts persist as `so`.

### 15.14 THE RECORD HOLDS, AND EVERY SPOKEN LINE IS SIGNED — BUILT 2026-09-03

Owner: *"the activity record should only delete after two activities, the timer is too
fast and i dont see a reason that if it is on the other side- left that it isnt crowding
the screen"* and *"its hard to tell people apart, should they have their name when they
speak?"*

- **The record has no timer.** It kept the last two lines already (signed 2026-09-01) but
  a timer wiped both ~4.5s after the last message, which is what read as "too fast". A
  line now leaves only when two newer lines push it out, or when the player taps the
  record away (tapping to dismiss was already there). It moved to the **left rail** at
  `top:44px`, tucked under the XP pill, where the owner judged it does not crowd — the
  right side carries the map, fullscreen, theme and rotate buttons.
- **Every spoken line carries its speaker.** `sayAs()` prefixes an ambient line with the
  person's short name (`💬 Chelo: …`), in whichever language is running. The Talk button
  already named them; the line that came back did not, so a barrio of people who sound
  alike on a phone screen was unattributable. **Tile flavour stays unsigned on purpose** —
  the crosswalk is not a person, and that distinction is now what tells the two apart.
  Visual distinctiveness (silhouette, colour, who reads as who at ten tiles) is a separate
  problem, and it goes to the 2026-09-03 *meeting of the minds*.

### 15.15 LA JUNTA, BATCH A+B — THE STAIRWELL SPEAKS AND THE BARRIO PICKS ITS TOOLS BACK UP — BUILT 2026-09-03

The first build out of `/meeting-of-da-minds`. Owner: *"ok start with what you would build."*

- **The doorstep nudge** (`portalNudge()`, engine.js). The engine has always been able to
  answer *"is somebody waiting in that room?"* for ANY room — `worldPending(id)` — but it had
  only ever been asked about the room the player was already standing in. Asked about the
  room on the OTHER SIDE of a door you are standing beside, the stairwell says
  *"Nacho and Don Güero are waiting"* — the pack's own `INTERVIEW.invite` when the waiting
  person is a room host, otherwise the pack's generic `waitingAt(place)` line with the
  place's own name. **Said once per room per visit**: a thing said once is a doorway, a
  thing said every time is the to-do list the owner banned.
- **The stair arrow.** `doorMarks()` asked two questions — *is this glyph in `DOORS`* and
  *does this tile lead somewhere*. The second is the whole question; the first is what left
  the stairs, the only way to the office, as the one portal in the city wearing no marker.
  Deleted. **Adding the stair glyphs to `DOORS` instead** — the obvious fix — would have
  repainted them as a brown door in five places and stood a door slab in the stairwell.
- **Not enough on its own, and this is the lesson.** `doorMarks()` only reaches three tiles;
  HQ spawns you thirteen from the stairs. The arrow alone would have changed nothing from
  where the owner actually stood. Found by the meeting's completeness critic, verified in the
  code, and the reason the nudge exists.
- **The barrio picks its tools back up.** Every camera drew a person's trade emoji only in
  the `else` of *"does this person have something to say"* (engine.js ×3, engine3d.js ×1), so
  the 28 people who give you work were exactly the people whose job you never saw. Drawn
  beside the mark now. The window widened from 2.4s of every 13 to 6s — this icon is
  identity, not decoration — and the theme's shirt tint dropped 0.4 → 0.15, because mixing
  nearly half the theme colour into every shirt in town erased the one difference twenty
  neighbours had. **Look at this before drawing anything: it is the control experiment for
  the whole "tell people apart" problem.**
- **Three small truths repaired.** The plan paints the stairs the gold its own legend has
  always promised (one `MAPCOL` line). Nolasco's file cabinet lands ON the box by the stairs,
  as `BACKLOG` §6 signed, instead of on bare floor while clearing the box. The office's boxes
  and window got flavour lines in both languages — it was the only silent room in the city.
- **A correction to the meeting's own minutes.** The panel reported *"the config says each
  gift lands on a moving box; exactly one of five does."* Checked against Don Güero's
  catalogue: only three deliveries were ever meant to touch a box (the taller's dog bed, the
  cleaners hauling the empties away, Nolasco's cabinet). The mercado's coffee corner and the
  panadería's guest chair were always placed elsewhere by design. **One gift was wrong, not
  four** — and Limpieza clearing two boxes is the signed beat, not a bug.

### 15.16 THE PAPER THIS CITY PRODUCES — READABLE OBJECTS, THE WALL, THE MACHINE — BUILT 2026-09-03

Owner: *"we should be able to keep names on people and give us a way to interact with things
even if they just say an npc line that way we know the button or key is working"* · *"it
should mimic a stapled poster template of things we produced"* · *"this is just like a tile i
zoom in into and fills my page like a pdf, in fact thats what it can be just one that looks
like it got stapled"* · *"so the laptop then becomes for the overflow"* · *"make sure we also
create realistic docs so we can export for ai consulting"*.

**The structural problem it fixes:** Meridian could only ever be read by talking to somebody.
The engine had a function that finds people and a function that finds animals; nothing found a
thing. Every explanation the city owned was locked inside a person.

- **A new pack file, `content/meridian/docs.js`.** `READS` says where a readable thing stands;
  `DOCS` says what it holds — a title, a template number, and `build(R)` turning the play
  record into sections. The engine renders the sections and knows nothing about bakeries.
  A pack that declares neither gets no marker, no button and no panel.
- **The marker is a cream card that BREATHES**, never the bouncing ❗, drawn in all four
  cameras. **It does not clear once read.** A mark that disappears when you tick it is a
  checklist painted on the world; a thing you can read is a place, not a task. (The critic's
  catch at la junta, and it is now a project law.)
- **The Read button answers every press**, even on blank paper — silence reads as a broken
  control, which is what the owner actually asked for.
- **The reader is a page, not a tile.** Full-screen paper: a staple at the top-left, the
  template number, the client header, and the body — the same `.md` the Copy and Download
  buttons produce, so one description drives the page and the export. Two renderers that can
  disagree are two documents.
- **Documents are filled from your real play.** `logDecision` has always stored the exact
  answer you picked, the question, the concept and the reasoning — **the meeting was wrong
  that it did not**, and nothing had to be added. The answer of record is the LAST time you
  answered a question, with the retry count shown, because the second try is where the
  learning is. A field you never answered is left blank, which is the templates' own rule.
- **Six sheets of blank paper hang on the office wall from day one**, unlabelled (the owner's
  call over an empty frame: a labelled empty frame is a to-do list in your own office). Each
  district's Saturday pins its own document over one, through the same ribbon machinery that
  delivers the furniture. Labs → 05 Decision Log · El Mercado → 02 Recommendation Memo ·
  Taller Herrera → 06 Process & Exception Map · La Espiga → 01 Discovery Notes · Limpieza
  Velázquez → 04 Pilot Review · Nolasco → 07 Answers/Refuses/Hands to.
- **The old lead's desk is the machine.** It already had a monitor and it already sat under
  the window, so no second object was invented. It holds the note taped inside the lid, the
  complete file (every document, including the ones on the wall), 03 Acceptance Criteria, and
  **the glossary** — the trade words the city taught you, in one place you can look up twice.
  That is the repair for 85 codex lines that were written once, shown once and destroyed.
- **Export for real work:** every document copies and downloads as markdown that mirrors
  `docs/templates/` section for section, so a filled one goes straight into a client folder.

**Two engine bugs found while building it, worth remembering.** `.settings` is declared after
the reader's own rule in the stylesheet, so it silently overrode `position:fixed` with
`absolute` — and because the reader lives inside `#vp`, hiding the world collapsed its parent
to 0×0 and the panel rendered at zero size with all its content present. **A panel that is
"open" and invisible is a stacking-context bug, not a content bug.**

### 15.17 DRAWERS, AND DECOR THAT EXISTS IN EVERY CAMERA — BUILT 2026-09-03

- **Settings became four drawers** (Controls · Picture · Sound · Game), each opening and
  closing, and the phone remembers which ones you keep open (`mqdrawers`). Controls opens by
  default because it is the one a new player needs. **The buttons that DO something — Export,
  the tile lab, the Trolley Pass, multiplayer, wipe — are actions, not settings, and stay
  visible below the drawers**; a test guards that nobody buries them later. Owner: *"each
  setting can also just expand or close like a drawer — you use best gaming practices"*.
- **Decor is drawn in all four cameras.** It was drawn top-down and front only, so every
  landmark the pack declares was invisible in iso and in the 3D the game boots into — which is
  why the mural read as "four stripes nobody noticed". In 3D a decor declared on a **solid**
  tile is treated as *paint*: a plane on that box's open face, so a mural stays on its wall
  from every camera stop. A decor on open ground gets a billboard, because it is an object
  that stands. (Pili's rule: flat things on walls, billboards for things that stand.)
- **`node test/shots.js --cams`** shoots every spot in all four cameras instead of the one it
  names — 29 spots × 4. The mural sat unseen for days precisely because each spot was only ever
  photographed in one camera. A new spot watches the mural from Calle Principal.

**The rule this makes permanent: FOUR CAMERAS OR IT DOES NOT EXIST.** Anything drawn for some
cameras is invisible where it counts, and the sweep is how that is caught instead of
rediscovered in a meeting.

### 15.18 THE MURAL, THE HONEST GRADE, AND PEOPLE WHO WALK — BUILT 2026-09-03

- **`worldFlags()`** is now the one place the world learns about your play: how far the
  construction got, which storefronts are up, and **per district: how many quests you have
  answered, whether it closed, and its grade**. The town plan's labels and the mural both
  read it, and a pack gets the facts without reaching into engine internals.
- **`grade` is 0 until you have answered something.** `gradeOf()` alone returns **3** for a
  district with nothing answered — it is a clean rate over zero calls — so a world reading it
  raw would paint an untouched city as flawless work. **Not begun is not the same as done
  well.** This was the session's question to decide, not the owner's; it has one right answer.
- **The mural is seven tiles on the avenue wall**, east of HQ's door: Nacho's own MERIDIAN
  piece (a sun and three stripes, never earned, always there) and one panel per business.
  A district you have not begun is **baby blue plaster** — the owner's call, 2026-09-03:
  comforting, part of the painting, and it can never read as a list of things you have not
  done. Begin a district and its panel takes colour; **how bright it is comes from the
  grade** — pale at 1, solid at 2, full with a highlight at 3. Paint only ever goes on.
  All seven are content (`DECOART` in `art.js`, `DECOR` in `maps.js`); the engine draws decor
  in four cameras and knows nothing about bakeries.
- **Townsfolk walk.** Anyone with **no quests** drifts within three tiles of where the pack
  put them, one step at a time, interpolated. **A quest-giver never moves** — a person you are
  looking for has to be where you left them, which is the whole reason the doorstep nudge
  exists — and neither do room hosts. A wanderer never steps onto a door, never onto the tile
  you are standing on, and holds still while you are beside them so a conversation is never a
  chase. The grid bookkeeping moves with them, so they stay solid and never share a tile.
- **The owner's "they can test our world for free" idea, made deterministic.** A random walk
  only notices a bad map if it happens to wander that way. `auditWander()` runs at boot and
  warns if anyone the pack placed has **nowhere to step at all** — and the smoke test already
  fails the build on a `WORLD:` warning. Same insight, caught every run instead of by luck.
  (The stronger check the project already had, `auditReach()`, still walks every tile.)

### 15.19 ONE DON GÜERO — BUILT 2026-09-03

Owner: *"ok give it to lupe and just let her introduce/talk about him right away."*

He stood on the street (quest 12) and upstairs in the office at the same time. Removing the
street body would have orphaned a quest, which breaks the owner's own rule that nothing is
ever taken away — so the quest moved with him instead of being deleted.

- **Lupe carries both La Obra quests now** (12 and 13). She is *Lupe · Estimator & Permits*,
  so *The estimate* was arguably always hers to write; Don Güero is the man who sends her
  everything he does not want to write down.
- **She introduces him in her first breath**, EN and ES: *"The man up the ladder in the yellow
  shirt is Don Güero, he runs this site, and he sends me everything he does not want to write
  down."* He is present in the fiction and absent from the tile — the same treatment Nacho got
  when his street body came down and his mural stayed.
- The second node keeps him in the room too: *"Don Güero already told her yes — he tells
  everybody yes, that is why he is not allowed to answer the phone."*
- His map letter `f` at st(4,7) is plain pavement now. `NPCLOOK.f` stays: room.js still reads
  it for his colours upstairs.
- **The office joined the Trolley Pass list** so the two people who help you design this place
  are a couple of taps from anywhere with a stop (owner: *"i want both nacho and don guero at
  my beck and call"*). A test checks every travel destination drops you somewhere you can
  actually stand, and that the office landing is beside the pair.

**The rule this makes explicit: a character can leave a tile without leaving the story.** Take
their quest with them and give it to somebody who would plausibly have written it, then let
that person name them out loud. Deleting the quest is what "nothing is ever taken away" forbids.

### 15.20 THE OWNER COULD NOT FIND HIS OWN POSTERS — BUILT 2026-09-03

*"i still couldnt find my posters and laptop... ive achieved things in the game."*

**Reproduced before touching anything, with a save shaped like his** (Week One and the mercado
played, two Saturdays claimed). The result: **two posters were correctly pinned to the wall and
the whole system worked — and standing on the arrival tile by the stairs, `readMarks()` returned
ZERO.** Nothing in the room said any of it existed.

The cause was a number I copied from the door marker without thinking: readable things wore
their mark only within **three tiles**. The office is 20 wide and the game drops you in the
far corner, so the wall was eleven tiles away and silent. **A marker that only appears once you
are already touching the thing is not a marker.**

- **Every readable in the room you are standing in wears its mark now**, no distance limit.
  Paper on a wall is visible from the doorway; that is what a wall is for. The door arrow keeps
  its three tiles on purpose — a door is a place you walk to, not a thing you read.
- **The room says what is in it when you walk in.** `arrive.f2` now names the wall where your
  work goes and the machine still logged in on the desk, in both languages.
- A test stands on the arrival tile and fails if any readable thing in the office is unmarked.

**The lesson, and it is the second time this exact shape has bitten:** *check the feature from
the tile the game actually puts the player on.* The stairs bug was this. This was this. Build a
thing, then walk in from the door like a stranger and see whether it announces itself.

### 15.21 A TROLLEY DOES NOT STOP ON THE SECOND FLOOR — REVERSED 2026-09-03

The office was added to the Trolley Pass list to make Nacho and Don Güero quick to reach.
Owner: *"i dont like that i go from a train to a floor. dont do that. i asked to make the world
realistic. not perfect but so if needed it can be upgraded."* Removed the same day, and the rule
is now in `docs/OWNER.md` as settled. The test is data-driven rather than a promise: **every
trolley destination must be a world that actually contains a trolley tile.** Rails or no stop.

### 15.22 EL MAESTRO CONSTRUCTOR — BUILDING FROM A TEMPLATE — BUILT 2026-09-03

Owner: *"one day we want to assign him a house template that he can build and just add some
random customizations"* and *"design it but make sure the architecture is able to handle more
complexity in the future."*

A **template** is content (`BUILDTPL`); a **lot** is content (`BUILDS`); the engine only
resolves choices and stamps tiles. No network, no model — the thing the owner actually wanted
was never a chatbot.

    template  {id, size:{w,h}, parts:[Part]}
    Part      {id, when?(ctx), tiles?:[[dy,dx,glyph]], reads?:[{x,y,doc}], pick?:[Option]}
    Option    {id, w?:weight, tiles?, reads?}

**The four commitments that make it carry weight later:**

1. **Deterministic.** Variation comes from a seeded generator (FNV-1a → xorshift), never
   `Math.random`. The same lot builds the same house on every device and every reload — the
   only way saves, screenshots and any future multiplayer can agree what the city looks like.
2. **Resolved picks are pinned in the save** (`bl`). Add options to a template next year and
   houses somebody already lives beside keep their faces; only new lots get the new options.
3. **Parts resolve in order and see each other.** A part declares `when(ctx)` and reads
   `ctx.pick` (what earlier parts chose) and `ctx.flags` (`worldFlags()` — district grades and
   all). The casita already uses it: no pot goes where the door swings. That is the hook for
   "the roof depends on the door" and "this block is richer once the taller opens", with no
   engine change.
4. **Nothing is stamped that breaks the city.** `buildSafe()` runs first: inside the map, never
   over a person, never over a portal, and no door in that world may lose its last standable
   neighbour. A refusal is announced, never silent. **It earned its keep on the first run** —
   it refused to build the west casita because Yola the paletera has stood on that corner
   since August. The lot moved; she stayed.

**Shipped with it:** three casita glyphs (door, window, blank wall with a lamp), one `casita`
template, and two lots at the ends of Calle Dos that visibly differ — one with the door in the
middle and a plant out front, one with the door on the left, a lamp on the end, and no yard
(because the door swings there). A test asserts the same seed always builds the same house,
that different seeds build different houses, that the `when` rule is actually exercised, that a
pinned pick survives, and that sealing a door, standing on a person or leaving the map are all
refused.

**Not yet, and named so nobody assumes otherwise:** builds emit tiles and readables, not decor;
storefront growth is still hand-written tile lists rather than templates; and Don Güero cannot
yet *talk about* what he built.

### 15.23 A DELIVERY THAT LANDS SILENTLY IS A DELIVERY NOBODY FINDS — BUILT 2026-09-03

*"also, i am confused.. where are these posters..."* — **the third time this was asked.** Twice
I answered with directions. The third time is not a comprehension problem, it is a design bug,
and here it is:

**Nothing in the city ever announced its own deliveries.** A district's Saturday plays, its
toast says a new lot opened on the street, and meanwhile a page is pinned to a wall on a floor
the player is not standing on. The pinning was correct, the reading worked, the marker was
right — and there was **no moment at which the game said it had happened**.

- **A ribbon may now declare `say:{en,es}`**, one line, spoken once ever (the seen list is
  saved), when it first lands. Deliveries name the room: *"Your memo for El Mercado went up on
  the office wall — second sheet from the left, upstairs."*
- Spoken after the Saturday's own toast, and also at Continue for anything that arrived while
  the phone was away.
- **The test is the rule, generically stated:** a ribbon WITH a `doorstep` walks you to what it
  built, so its district's toast covers it; a ribbon WITHOUT one lands somewhere you are not
  standing, and it **must** say where, in both languages. All six posters and all five office
  gifts now do. The suite fails if a future delivery is added silently.

**The habit this belongs to** (with §15.20's "walk in from the door"): *if a feature changes a
room the player is not in, the game has to tell them at the moment it happens.* A marker only
helps somebody already in the room.

### 15.24 THE HOUSES CAME BACK OFF THE STREET — 2026-09-03

*"noone asked me to make them i was saying it is just an ability but they look cute."* Correct
on both counts, and there was a second problem: **you cannot walk into them.** A house with a
door that does not open is the same unrealistic shortcut as a trolley stopping on a second
floor, which the owner had rejected an hour earlier.

`BUILDS` is empty. The template, the three casita glyphs, the resolver, the safety check and
every test stay — **the ability was the ask**. Restoring the two lots is two commented lines in
`art.js`. The standing rule when a parcel is genuinely developed: **the interior and the portal
come first, then the house goes on the list.**

