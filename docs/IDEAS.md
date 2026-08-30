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

**Phase 1 — Trolley Pass (build as roadmap #3; $0, no backend):**
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
