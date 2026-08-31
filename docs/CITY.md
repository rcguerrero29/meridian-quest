# The City Ledger 🏗️

Don Güero's single source of truth. The `/don-guero` skill reads this, plans the
next phase on Opus 5, and brings open decisions to the owner as side quests. Every
signed decision gets logged here — a recorded decision is a permit, not a suggestion.

**Phase: 1 (BUILT & SHIPPED 2026-08-31)** · Phase 2 planning next · Ledger opened 2026-08-30.

## Purpose

The city is a career gym. Every new business is **Hispanic-owned** and doubles as a
**practice pack for an AI role the owner wants to be hired in**:
AI implementation lead · AI product manager · AI solutions/prompt engineer ·
automation consultant · AI ops analyst. Quests = that industry's real AI judgment
calls, in the game's codex style (bilingual EN/ES, retry-until-correct).

## Districts (built)

| District | Map | What's there |
|---|---|---|
| Meridian Labs HQ + Floor 2 | `hq`, `f2` | The office. 8 quest NPCs, Frederick. |
| Calle Principal | `st` | La Cocina storefronts, La Obra site → **finished Studio** (`lo`), trolley west terminus, jacarandas, flower beds. |
| La Cocina | `lc` | Doña Rosa's restaurant. 2 quests, Canela. |
| The Studio | `lo` | Xochi's design studio (unlocks after La Obra quests). |
| Calle Dos | `ex` | Construction crew pen (Beto, Kike, Mari), Yola's cart, canal trees, street cat, trolley east terminus. |
| El Mercado Robles | `me` | Doña Chelo's abarrotes on the st SW lot. 8 AI-PM quests (16-23), 4 NPCs, Frijol the bodega cat. Opens Monday of Week Two. |

## Open parcels

- ~~**st southwest lot**~~ — **built 2026-08-31**: El Mercado Robles.
- **st southeast lot** — signposted "RESERVED LOT". Unassigned. Next obvious parcel.
- **Calle Dos frontage** (`ex` rows 0/9) — room for small storefronts along the canal.
- **New maps** — the engine takes new worlds as data (`WORLD_DEFS` + portal); a
  bigger business can be its own interior, like La Cocina.

## Growth history

- 2026-08-31 — Hearts stopped wiping the city (owner ask): zero hearts now ends the
  chapter instead of the run, restart moved to Settings behind a confirm, and the
  save is never deleted out from under a player.
- 2026-08-31 — Replay fixed (owner ask): the city is now a pure function of progress.
  "New game +" rewinds Calle Principal to its shipped map and rebuilds only what the
  run has earned — no Studio you did not raise, Lupe back at her post. Predates
  Phase 1; El Mercado made it visible.
- 2026-08-31 — **Phase 1 built**: El Mercado Robles opened on the SW lot (`me` interior,
  storefront ribbon, Chelo/Nando/Perla/Chava + Frijol), 8 AI-PM quests EN+ES (16-23,
  5 needed to close), chapters became data, the Week Two handover shipped, the
  decision-report export landed, and the DOORS/TOWNLBL/MAPDOT/MAPCOL/SOLIDX seam moved
  the city's buildings out of the engine. MAXXP 230 → 350, sw `mq-v17`.
- 2026-08-30 — La Obra completed: two-stage construction (quests 12+13) raised the
  Studio; Lupe moved streetside; Xochi's quest + wardrobe opened.
- 2026-08-30 — Nature pass: jacarandas, flower beds, grass, butterflies, colibrí,
  street cat; themes now reach the world; ambient particles.
- 2026-08-30 — Townsfolk: Nacho (muralist) and Yola (paletera) moved in; owner can
  create up to 12 chill characters (admin 🧍); 39 name eggs live.

## Growth history (append)

- 2026-08-31 — **World upgrade wave 1**: draw() tile chain became the TILEDRAW
  registry (28 glyphs + doors as data; content packs override via TILEART) — the
  entities-as-data law now covers ART. Visible: per-tile floor variation, walls cast
  shadows, walk-cycle arm swing, per-person blinking, doors glow underneath. Plus:
  /nacho story director, tune picker, NPC activity emotes, NPC edit panel.

## Pending proposals (⏳ = needs an owner decision via side quest)

- ✅ **El Mercado** — signed 2026-08-31. Full build + engine seam, AI PM pack.
  See "Phase 1 plan (SIGNED)" below.
- ✅ **Which AI role first** — signed 2026-08-31: **AI product manager** leads.
  Full ranking in the decision log.
- **Hispanic-business brainstorm** (owner ask, 2026-08-30): panadería, salon/barbería,
  auto shop, landscaping, cleaning company, real-estate/property mgmt, trucking,
  dental/clinic, event planning/quinceañeras, tax prep/notario. Don Güero curates
  per phase — one at a time.
- ✅ **Week Two** — signed 2026-08-31: El Mercado *is* chapter one. The arc now
  has a Monday; later phases extend it rather than inventing it.
- Fandom eggs round 2 + mechanics (IDEAS §9) — waiting on AJ's picks.
- **Full tile registry** — DOORS/SOLIDX/MAPCOL are the seam Phase 1 needed; the
  per-glyph `TILES` table (solid + colour + renderer, all as data) belongs with the
  queued graphics-prep refactor, not a second content pass.

## Decision log

*(format: date · quest title · choice · one-line why — append only)*

- 2026-08-30 · Cartridge model · saves stay on-device, Trolley Pass is the link
  cable · zero-maintenance rule. *(imported from HANDOFF)*
- 2026-08-30 · Retry-until-correct · quests complete only on the right answer ·
  teaching game, not a quiz show. *(imported from HANDOFF)*
- 2026-08-31 · ❗Permiso: which trade first · **AI product manager** leads; then
  automation/solutions consultant, AI ops analyst, implementation lead, prompt
  engineer · owner chose the role they want next, not the one they already do.
- 2026-08-31 · ❗Obra: how much mercado · **full build + engine seam** — storefront
  ribbon, `me` interior, and the DOORS/TOWNLBL/MAPDOT extraction · pay the seam
  once so every future shop is data, not code.
- 2026-08-31 · ❗Planos: quest depth · **write the full pack, don't skimp; gate
  completion on fewer** — required-to-complete count lives in config as data ·
  this mercado is the open-world template, so the threshold must be tunable later.
- 2026-08-31 · ❗Papeles: decision-report export · **build it in Phase 1, first,
  accept a longer session** · the portfolio artifact is the point of the gym.
- 2026-08-31 · ❗Semana: when is the mercado · **Monday of Week Two — chapter one**
  · the epilogues already promise Week Two; this cashes that check.
- 2026-08-31 · ❗Corazones: what zero hearts costs · **the week, not the city** — the
  chapter ends where it stands, unanswered quests stay unanswered and close for good,
  Monday comes with three fresh hearts · a teaching game must never delete the gym.
- 2026-08-31 · ❗Botón: where restart lives · **⚙️ Settings, behind a two-tap confirm**
  · the story never sends you there; it is a testing tool, so it stops sitting next to
  the button that continues the story.
- 2026-08-31 · ❗Entrada: a staging area for new players · **skipped — Meridian Labs HQ
  is the onboarding** · Priya, Frederick and the early quests already do that job.

## Phase 1 plan (drafted 2026-08-30 · **SIGNED 2026-08-31**)

**El Mercado Robles** on the st SW lot + interior world `me`. Cast: Doña Chelo
(owner), Nando (receiving, half-automates everything), Perla (counter, accidental
analyst), Chava (carnicero, chat-only, rings everything as "chile"), optional
bodega cat Frijol. Role: **AI ops analyst**. Quests 16-20: "Everything is chile"
(data quality at source), "Tamal season" (drift + actionable alerting), "The
abuela test" (proxy vs guardrail metrics), "The camera guy" (root-cause before
tooling; consent), "The Monday number" (business KPI vs model metric; honest
review). Core = 1,2,5 (MAXXP→290); stretch 3,4 (→330). Full build notes incl. map
rows, portals (`M` door), stations s/n/u/v, and the DOORS/TOWNLBL/MAPDOT engine
extraction are in this session's Don Güero plan — reproduce via /don-guero if lost.

**Owner directives given 2026-08-30 (recorded verbatim intent):**
- Balance built-out vs player-built; mix per business; expand via quests.
- **Standing law — entities as data**: every character/critter/tile/building is
  declared as data (type, look, placement, behavior) so graphics can be re-rendered
  wholesale (2D today → richer/3D someday) without changing what things are. AJ's
  upgrade waves depend on this.

**As signed 2026-08-31 — these override the 2026-08-30 draft above:**
- **Role: AI product manager**, not ops analyst. The mercado's quests become PM
  judgment calls — scoping, prioritization, saying no, shipping the small version —
  with Doña Chelo wanting everything at once and the player deciding what actually
  gets built. The drafted ops-analyst beats are not discarded: they stay in the pack
  as the operational half of the same story.
- **Quest depth: full pack, lower bar.** Write every quest properly; the number
  required to "complete" El Mercado is smaller than the number available, and that
  threshold is **data in config**, not a constant in code — this business is the
  template for the open world, so a later phase retunes it without a rewrite.
- **Build: full** — storefront ribbon on the st SW lot, `me` interior world, the
  full cast, AND the DOORS/TOWNLBL/MAPDOT engine extraction. Growth registry queued
  so Phase 2+ parcels can be player-built.
- **Decision-report export: in Phase 1, built first.** Owner accepted a longer
  session for it. Prints the player's quest answers as a portfolio artifact.
- **Week framing: Monday of Week Two, chapter one.** The epilogues' promise gets
  kept. Content-only — the calendar lives in quest text and signage, not the engine.

## Merge note (2026-08-31)

Two sessions built Phase 1 in parallel; the owner's /don-guero session signed later
(AI-PM pack, 8 quests, chapters-as-data, export built, hearts-end-the-week) and WINS.
This session's 5-quest **AI ops analyst pack** ("Everything is chile" ... "The Monday
number") is preserved in git history (commit 00fc1aa) and returns with a future
ops-analyst business — the concepts don't expire. Also landed in the merge: theme
editor edits the visible variant, every animal interactive, door under-glow, activity
ticker, music chirp + denser melody, admin NPC editing (rename / re-roll look / move
out), Calle Dos got its south fence.
