# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## Resume ritual

0. **Read `docs/OWNER.md`** — the owner's standing rules (settled decisions, taste,
   how to bring them a choice, and the referee → browse-and-approve ladder). New
   2026-08-31; both planner skills now read it before planning.
1. Read `docs/HANDOFF.md` (state + shipping rules), `docs/CITY.md` (city ledger),
   and this queue. Skim `docs/IDEAS.md` §6-9 for the designed-but-unbuilt backlog.
2. Work on a `claude/...` session branch; merge to `main` only when the owner says
   (main auto-deploys to GitHub Pages; installed PWAs update after one refresh).
3. Every ship: `npm install playwright-core` once, `node test/smoke.js` green,
   EN/ES in lockstep, bump `CACHE` in `sw.js`.

## Today in review (2026-08-31, the marathon session)

Shipped to `main`, in order: engine/content split verified → nature pass (canvas
theming, flora, critters) → music + townsfolk + 39 name eggs + character creator →
Don Güero (city planner, Opus 5) + city ledger → Phase 1 signed → El Mercado built
(superseded by the parallel don-guero session's AI-PM build — merged, its newer
signatures win) → theme-editor dark-variant fix → every-animal interactions →
activity ticker → NPC edit panel → door glow → Nacho (story director, Opus 5) +
story bible → tune picker → activity emotes → **world upgrade wave 1** (TILEDRAW
registry + TILEART seam, floor variation, wall shadows, walk cycle, blinking) →
**wave 2 lighting** (time-of-day wash, night light spills from doors/storefronts,
sunset theme keeps golden hour) → **palette wardrobe** (up to 8 named custom
palettes: clone-from-preset saves-as-new, rename, ▲▼ reorder, evict; per-device).
Deployed at sw `mq-v22`. Smoke suite green throughout (24 quests, maxXP 350).

## The skills (the team, documented)

- **`/don-guero`** — city planner. Opus 5 agent reads `docs/CITY.md` (districts,
  parcels, decision log), drafts the growth phase, returns owner decisions as
  ❗ side quests. Signed answers are permits.
- **`/nacho`** — story director. Opus 5 agent reads `docs/STORY.md` (premise,
  principles, arc, open threads), plans chapters/arcs/endings, side-quests the
  owner on story forks. Teaching mode IS story mode.
- **`/playtest`** — walks the owner through the tour (docs/PLAYTEST.md, 14 stops)
  and maps "stop N broke" to the right file.
- Loop for any phase: `/nacho` (plot) → `/don-guero` (parcel) → owner signs both →
  build → smoke green → bump sw CACHE → merge on owner's word.

## Queue (owner-set, rewritten end of 2026-08-31)

1. **Playtest everything** — the mercado chapter AND today's upgrades (lighting at
   night, palette wardrobe, tune picker, NPC editing) have not been human-played.
   `/playtest` guides; quest copy and feel are the deliverables.
2. **Phase 2 — run `/nacho` then `/don-guero`.** NEW: /nacho (Opus 5 story director, docs/STORY.md is his bible) plans the arc past the mercado chapter — the story currently ENDS there and the owner noticed. Story beats and the parcel plan land together.
   Original queue text: **run `/don-guero` again.** The SW lot is built; the ledger's next
   obvious parcel is the **st southeast "RESERVED LOT"**. Owner's role ranking is
   signed (AI PM first, then automation consultant, ops analyst, implementation
   lead, prompt engineer) — Phase 2 picks the next business off the brainstorm list
   in CITY.md and the next role down.
2b. **Phase 2 detail is already planned** (added by the /don-guero session, see
   CITY.md → "The open city — Phases 2-5"): weeks are retired, `CHAPTERS` becomes
   districts that do NOT close behind the player, and all four remaining businesses
   are cast and scoped — Taller Herrera (automation consultant, st southeast lot),
   Panadería La Espiga (ops analyst), Limpieza Velázquez (implementation lead),
   Nolasco Tax & Notario (prompt engineer). One per sitting. **Hearts are signed but
   NOT built**: the rule is now "the grade on a business's ending, scoped per
   business, never blocks anything" — what ships today still ends the chapter at
   zero. Do the open-city refactor before the taller; the taller depends on it.

**Game shape signed 2026-08-31** (`docs/OWNER.md` → "The shape of the game"): north
star is *"a barrio that grows because you helped it"*; the record becomes a room you
walk into, not a menu; clients-not-chapters replaces week gating. Signed "for now",
explicitly revisable after real play, and every piece must ship as a content-pack seam
so **AJ's game can swap or drop it**. Deliverable templates for real client work live
in `docs/templates/` (written; only the decision log is game-generated so far).

**Owner-set build order (2026-08-31): front-profile 2.5D first → close the
signed-not-built gap (open-city refactor + per-business hearts) → then the four
business packs.** Item 3 below is therefore the head of the queue.

3. **Graphics next: the front-profile pivot** (owner-redirected 2026-08-31, plans
   in IDEAS §10): ① consolidate TILES glyph metadata + DECOR instance metadata
   (describe the world, don't just draw it), ② build the FRONT-PROFILE 2.5D
   renderer (square grid, facades facing the player — keeps all existing detail;
   what the owner actually wants instead of diamond-iso), ③ camera-rotate +
   wall-fade occlusion fallbacks, ④ owner+AJ pick the default. (Emote-in-iso
   regression: FIXED same session it was reported — drawEmote is shared by both cameras.)
3b. **Sonny's program** (IDEAS §11): ball fetch at exactly 4/7, feed/treats,
   howl, lay down, dig, the disappearing 💩, and the future janitor practice pack.
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
- Skills in repo: `/playtest` (testing + triage), `/don-guero` (city planning,
  Opus 5), `/nacho` (story direction, Opus 5 — docs/STORY.md).
- Owner's meta-goal: keep practicing AI delivery across industries; the city is
  the gym. Fun is a requirement.
