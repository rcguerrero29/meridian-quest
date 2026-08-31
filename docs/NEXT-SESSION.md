# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## Resume ritual

1. Read `docs/HANDOFF.md` (state + shipping rules), `docs/CITY.md` (city ledger),
   and this queue. Skim `docs/IDEAS.md` §6-9 for the designed-but-unbuilt backlog.
2. Work on a `claude/...` session branch; merge to `main` only when the owner says
   (main auto-deploys to GitHub Pages; installed PWAs update after one refresh).
3. Every ship: `npm install playwright-core` once, `node test/smoke.js` green,
   EN/ES in lockstep, bump `CACHE` in `sw.js`.

## Queue (owner-set, 2026-08-31)

1. **Playtest Phase 1.** El Mercado Robles is live but has never been played by a
   human. Walk Week One to its close, take the Monday handover, and work the eight
   mercado quests — `/playtest` has the tour. Report anything that reads wrong; the
   quest copy is the deliverable here, not the plumbing.
2. **Phase 2 — run `/don-guero` again.** The SW lot is built; the ledger's next
   obvious parcel is the **st southeast "RESERVED LOT"**. Owner's role ranking is
   signed (AI PM first, then automation consultant, ops analyst, implementation
   lead, prompt engineer) — Phase 2 picks the next business off the brainstorm list
   in CITY.md and the next role down.
3. **Graphics prep refactor** (IDEAS §7 steps 1-2): tile-renderer registry +
   frame-clock consolidation. Now carries the queued **full `TILES` table** — Phase 1
   moved doors, solids and map colours into content (DOORS/SOLIDX/MAPCOL); the
   per-glyph registry finishes the job.
4. **AJ's picks**: fandom eggs round 2 + mechanics (IDEAS §9 — Grogu lunchbox,
   birthday calendar magic, streak memory…). Blocked on AJ choosing.
5. **Music v2** (IDEAS §8) when music gets its own session.
6. **AINPC** (IDEAS §6) — designed, owner said *not yet*. Don't build until asked.

## State snapshot (2026-08-31)

- `main` = deployed through the Phase 1 ledger signing. The El Mercado build lives on
  `claude/don-guero-bct8tx` (sw `mq-v17`, smoke green) — merge when the owner says.
- Default-branch setting on GitHub still points at an old `claude/...` branch —
  owner intends to flip it to `main` (repo Settings → General → Default branch).
- Engine/content split holds. Seams: `CRITTERS`, `CHILL`, `EGGS`, `CHATTER`, `MUSIC`,
  and (Phase 1) `DOORS`, `SOLIDX`, `MAPCOL`, `TOWNLBL`, `MAPDOT`, `MERCADO`, `CHAPTERS`.
  Tile glyphs added: `Z S H I` + stations `s n u v`.
- **Chapters are data**: `CHAPTERS` in config.js decides how many quests close a
  district. `need` is deliberately below the pack size (mercado: 5 of 8) — the smoke
  test asserts that, so keep it true when adding packs.
- Skills in repo: `/playtest` (guided testing + triage), `/don-guero` (city
  planning on Opus 5, decisions as side quests).
- Owner's meta-goal: keep practicing AI delivery across industries; the city is
  the gym. Fun is a requirement.
