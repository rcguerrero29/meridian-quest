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

### 15.1 THE BLUR — root cause found, fix specified, NOT BUILT

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

### 15.3 DOORS — planned, NOT built (owner: "i dont want to build that yet")

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

### 15.6 THE DOORWAY BUG — reproduced 2026-09-01, NOT fixed

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
- ⚠️ **The activity ticker and the toast show the same text at the same time**, and the
  ticker is a large translucent block over roughly a third of the view. Both cameras.
  The ticker is a deliberate owner-requested feature (mirror the last message so it can
  be re-read after the toast fades) — so this is a design call, not a bug: either make
  the ticker one clipped line, or suppress it while the toast is still showing the same
  string.
