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

## Queue (owner-set; rewritten 2026-08-30 after Phase 1 shipped)

1. **Decision-report export** ("el acta") — SIGNED, deferred only for budget:
   export tab that turns the player's logged quest decisions into an interview-ready
   memo (situation → call → tradeoff → concept), EN/ES. Needs logDecision to also
   store the chosen option text. IDEAS §2 has the seed.
2. **Phase 2 — run `/don-guero`.** Next parcel (st SE "RESERVED LOT" or Calle Dos
   frontage), next business off the brainstorm list, voiced for role #1 in the
   owner's ranking: **Automation/Solutions Consultant**. The growth-registry and
   player-built options are ⏳ in CITY.md.
3. **Graphics prep refactor** (IDEAS §7 steps 1-2) + **palette wardrobe** (named
   custom palettes, favorites, drag-to-reorder — CITY.md feedback log).
4. **AJ's fandom picks** (IDEAS §9) · **Music v2** (IDEAS §8) · **AINPC** (§6, only
   when the owner says go).

## State snapshot (2026-08-30)

- `main` = deployed = everything through "Phase 1 built: El Mercado Robles opens"
  (sw `mq-v18`, 21 quests, MAXXP 330). CI green.
- Default-branch setting on GitHub still points at an old `claude/...` branch —
  owner intends to flip it to `main` (repo Settings → General → Default branch).
- Engine/content split holds: engine untouched by content work. New seams since:
  `CRITTERS`, `CHILL`, `EGGS`, `CHATTER`, `MUSIC`, tile glyphs `J b g`.
- Skills in repo: `/playtest` (guided testing + triage), `/don-guero` (city
  planning on Opus 5, decisions as side quests).
- Owner's meta-goal: keep practicing AI delivery across industries; the city is
  the gym. Fun is a requirement.
