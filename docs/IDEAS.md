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
2. **Per-kind art wave**: lit windows on `facade` tiles at night, awning shadows,
   fence posts at run ends, door frames casting onto the floor. A session.
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

- **What it is:** a standalone pet-caring game — Sonny's program grown into a whole
  loop (feed, fetch, walks, grooming, the janitor economy) — published as its own
  free PWA that points people at Meridian Quest and the studio.
- **Why the architecture is ready:** the engine/content split means this is a new
  content pack, not a fork — `content/petcare/` with its own maps, strings, config,
  and the beagle/ball/decal systems already engine-generic. Same $0 hosting model.
- **Sequencing:** after AJ's game gets its pack (she's first in line for a split-off),
  and worth a `/nacho` + `/don-guero` sitting of its own for loop and cast.
  A name, a star dog (Sonny, presumably), and the marketing hook are owner decisions
  for that sitting — nothing signed yet.
