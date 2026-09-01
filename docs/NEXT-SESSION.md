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

## Queue (owner-set, rewritten end of 2026-09-01 — the Sonny marathon session)

**What this session shipped (mq-v27 → mq-v40):** the stakes/grade review+merge;
front-profile 2.5D camera (now DEFAULT via CAMDEF); TILES/DECOR/DECALS seams;
lit windows/awnings/fence posts; TRUE 3D as camera #4 (three.js vendored, HD-2D,
blur root-caused twice: pixel-art pipeline + resolution); El Parque 🌈 (leash →
rainbow bridge → chill session → recap card); Sonny canon (face heart tip-to-nose,
lemon tail white tip, blue collar+leash, minimal digging, real howls, food-driven
6/7 fetch, BFS fetch); breeds (lab/chihuahua + coats); 🎓 training (sit/down/stay/
come/follow with reps + treat bonus); agility course; dog society (sniff/chase);
NPC best friends + city roaming; rename/rehome (no limit, nobody deleted); the
always-on 🐾 paw menu with the cross-city whistle; WASD-vs-typing fix.

1. **Playtest sweep with AJ** — the whole park loop, 3D on their real phones
   (sharpness verdict!), the paw menu, roaming dogs at their friends' sides.
   Triage with /playtest. Kisses: PENDING owner canon check (IDEAS §11) — build
   into the 💗 button only when confirmed.
2. **Dress dogs via Xochi** (planned, IDEAS §11): pet wardrobe generalizes to
   named dogs; one short sitting.
3. **THE CAREER GAME NEEDS LOVE.** This session was all Sonny; the AI-role
   practice packs are the actual product (OWNER.md). Next: the open-city refactor
   (clients-not-chapters, CITY.md Phases 2-5), then Taller Herrera (automation
   consultant pack) via /nacho + /don-guero. The janitor business (sanitation +
   ops-scheduling practice, Sonny's 💩 economy) is a natural Don Güero phase that
   BRIDGES the dog world and the career game — pitch it to the owner.
4. **Graphics rung ③** — 2× sprite detail, people + dogs first (IDEAS §10);
   those sprites become the 3D billboards for free.
5. **3D sitting 3** (IDEAS §14): drag-to-orbit, emissive night windows, DECOR +
   decals in 3D, input remap under rotation, iso retirement decision.
6. **Pet spin-off split** (IDEAS §13): content/petcare/ cartridge — after AJ's
   pack; the park is its starting map; Sonny fronts the preview.
7. **AJ's picks** (IDEAS §9 fandom round 2) and **Music v2** (IDEAS §8) when
   their turns come. **AINPC** (§6) stays owner-gated.

## Resume ritual additions for this queue
- Sonny is CANON now — read IDEAS §11 before touching any dog code.
- Dog persistence lives in `mqpark` (dogs, bandanas, training, friends, rehomed).
- Cameras: top / front (default) / iso / 3d — engine3d.js requires
  vendor/three.min.js; sw ASSETS lists both. Version lockstep now spans 3 files'
  worth of caution: sw.js CACHE == config.js GAMEV, smoke-enforced.

## State snapshot (2026-09-01)

- `main` = deployed through `mq-v40` (everything in the shipped list above).
  Nothing waits on a branch.
- Pet-care spin-off shape signed (IDEAS §13): Sonny fronts the preview mini game
  inside Meridian, some customization there, full customization in the standalone.
- The 3D plan is written and signed off as PLAN ONLY: IDEAS §14.
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
