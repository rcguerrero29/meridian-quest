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
telemetry). `NET.enabled` stays false unless a specific game turns it on.

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
