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

## Queue (owner-set, 2026-08-30)

1. **Build Phase 1 — El Mercado Robles.** Don Güero already planned it (see CITY.md "Phase 1 plan"); ALL FOUR DECISIONS ARE SIGNED (see CITY.md decision log — all 5 roles in order, all 5 quests, interior + extraction, memo export, Week Two framing). Build: `me` interior + st storefront rows, 4 NPCs, quests 16-20 EN+ES, the DOORS/TOWNLBL/MAPDOT engine extraction, MAXXP bump, smoke green, sw CACHE bump. Originally: The skill spawns the Don Güero
   planner agent (pinned to Opus 5), which drafts the growth phase and returns
   decisions as ❗ side quests for the owner. Expected Phase 1 shape: develop the
   El Mercado lot as the first **Hispanic-business practice pack**. Deliverables:
   signed ledger + built content if tokens allow.
2. **Hispanic-business brainstorm, for real.** Owner wants: businesses that give
   them working experience in AI roles they'd like to be hired in (implementation
   lead, AI PM, solutions engineer, automation consultant, AI ops analyst — have
   the owner RANK these, it's a pending side quest in CITY.md). Each business =
   quests written as that role's real judgment calls. Candidate list is in
   CITY.md → Pending proposals.
3. **Graphics prep refactor** (IDEAS §7 steps 1-2): tile-renderer registry +
   frame-clock consolidation. Pure refactor, no visual change, unlocks the
   shading/animation waves AJ wants.
4. **AJ's picks**: fandom eggs round 2 + mechanics (IDEAS §9 — Grogu lunchbox,
   birthday calendar magic, streak memory…). Blocked on AJ choosing.
5. **Music v2** (IDEAS §8) when music gets its own session.
6. **AINPC** (IDEAS §6) — designed, owner said *not yet*. Don't build until asked.

## State snapshot (2026-08-30)

- `main` = deployed = everything through "Music, chill townsfolk, a character
  creator, and 39 name eggs" (sw `mq-v16`). CI green.
- Default-branch setting on GitHub still points at an old `claude/...` branch —
  owner intends to flip it to `main` (repo Settings → General → Default branch).
- Engine/content split holds: engine untouched by content work. New seams since:
  `CRITTERS`, `CHILL`, `EGGS`, `CHATTER`, `MUSIC`, tile glyphs `J b g`.
- Skills in repo: `/playtest` (guided testing + triage), `/don-guero` (city
  planning on Opus 5, decisions as side quests).
- Owner's meta-goal: keep practicing AI delivery across industries; the city is
  the gym. Fun is a requirement.
