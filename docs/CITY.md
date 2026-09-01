# The City Ledger 🏗️

Don Güero's single source of truth. **Read `docs/OWNER.md` first** — the owner's
standing rules; anything Settled there is a permit, not a question. The `/don-guero` skill reads this, plans the
next phase on Opus 5, and brings open decisions to the owner as side quests. Every
signed decision gets logged here — a recorded decision is a permit, not a suggestion.

**Phase: 2 (planned 2026-08-31 — parcel NOT yet planned, pack NOT built)** · Ledger
opened 2026-08-30. **Deployed: `mq-v44` on `main`, 2026-09-01.**

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

- 2026-09-01 — **The open city SHIPPED, and the story caught up with it.** `qOpen`
  had `c>=chSeen`, which closed every district behind the player; it is now `c<=chSeen`
  — districts open and stay open, forever. `need` for the first district dropped 16→12
  so its Saturday plays with quests still on the board. 24 `late` reframe lines (EN+ES)
  give a neighbour one line when you answer them long after. Nine continuity breaks
  fixed; nine strings rewritten (the three "Roll credits" and the intro card that
  threatened a reset that cannot happen). **`GROWTH` moved Meridian's names OUT of the
  engine** — quests 12/13 raising La Obra, quest 15 opening the wardrobe and "district 1
  is El Mercado" were all hardcoded, so AJ's pack would have inherited them; a smoke
  guard now fails the build if any content name reappears in `engine/`. 3D is the
  default camera; movement follows the camera when you rotate (it never consulted it
  before); the mercado's produce is identifiable; the ticker keeps two messages.
  Three test tools now exist: `smoke.js`, `shots.js` (scene screenshots) and
  `tilesheet.js` (**the cold read** — every tile alone, labelled only by its glyph).

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
- ✅ **What zero hearts costs in an open city** — signed 2026-08-31, lands with the
  open-city refactor in Phase 2. See the decision log.
- **Full tile registry** — DOORS/SOLIDX/MAPCOL are the seam Phase 1 needed; the
  per-glyph `TILES` table (solid + colour + renderer, all as data) belongs with the
  queued graphics-prep refactor, not a second content pass.

## The open city — Phases 2-5 (planned 2026-08-31)

Owner retired weeks as the organizing principle ("we dont have to follow weeks any
longer") and asked for all four remaining businesses planned at once. Weeks One and
Two stay in the fiction — they are written and shipped — but nothing new is gated
behind a calendar.

**The model.** `CHAPTERS` becomes **districts**: each declares its quests, a `need`
below its pack size, the AI role it trains, and what opens its lot. Districts do
**not** close behind you — every opened business stays available and the player
roams. Closing a district plays its own ending beat and breaks ground on the next
lot (Don Güero's job, in fiction). The city itself has no credits; it keeps growing.

**One business per phase.** Four packs of ~8 quests is ~32 quests of writing — that
is four sittings, not one. Order follows the owner's signed role ranking.

| Phase | Business | Parcel · map | Role trained | Cast |
|---|---|---|---|---|
| 2 | **Taller Herrera** (auto shop) | st southeast lot · `ta` | Automation / solutions consultant | Don Tacho (master mechanic, refuses the tablet), Yesenia (service writer, runs a paper book), Moy (apprentice, already using AI on his phone) |
| 3 | **Panadería La Espiga** | Calle Dos frontage west · `pa` | AI ops analyst | Doña Licha (baker), Tito (night baker), Sol (counter) |
| 4 | **Limpieza Velázquez** | Calle Dos frontage east · `li` | Implementation lead | Doña Vero (owner), Chente (crew lead), Karla (scheduler) |
| 5 | **Nolasco Tax & Notario** | walkup off Calle Principal · `no` | Prompt / solutions engineer | Lic. Nolasco, Bere (intake) |

**What each pack teaches**

- **Taller Herrera — automation consultant.** Where automation actually pays and
  where it must not go. Intake and estimates from a photo; parts ordering; the
  master mechanic who will not touch the tablet (the lever is the workflow, not the
  person); what an AI estimate commits you to when it is wrong; and the one thing
  that stays human — diagnosis. The counterweight to El Mercado: there the answer
  was usually "build the small thing", here it is often "do not automate this".
- **Panadería La Espiga — AI ops analyst.** The forecast El Mercado could not
  build yet, now that invoice data exists. Waste against stockout, the 4am
  decision, holiday spikes, drift when a competitor opens, and measuring a model
  against the pan dulce that did not sell.
- **Limpieza Velázquez — implementation lead.** Rolling a tool out to crews who do
  not sit at desks: phased pilots, training, the crew that quietly ignores the app,
  and measuring adoption rather than logins.
- **Nolasco Tax & Notario — prompt / solutions engineer.** Designing what a system
  must refuse. Grounding answers in the actual form instructions, PII in document
  intake, escalation paths, and the **notario false-friend** — in Mexico a notario
  público is a senior lawyer; in the US a notary is not, and the confusion has cost
  real families real money. A quest about an assistant that must refuse to give
  immigration advice and hand off to a human is the sharpest "know the limits of
  the tool" lesson in the city.

**Hearts, in one sentence (signed 2026-08-31).** *Hearts are the grade on a
business's ending, scoped per business, and they never block anything.* Three at
each business; bad calls spend them; the count remaining picks which ending that
business plays (flawless / strong / survived / burned through their patience).
Zero stops nothing — you keep answering, you have simply already earned your
ending. Walk into another business and you start fresh at three.

This is deliberately a **template rule, not a Meridian rule**: it is one sentence,
it never takes anything away, and it reads the same in any story the engine is
reused for. It replaces "zero hearts ends the week" — which is what ships today and
stays live until the Phase 2 refactor lands.

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
- 2026-08-31 · ❗Corazones: what zero hearts costs · ~~the week, not the city — the
  chapter ends where it stands, unanswered quests stay unanswered and close for good~~
  · **SUPERSEDED 2026-09-01 by "no practice is ever missed"** (docs/OWNER.md → Settled):
  ending a district's arc never closes its quests. Only the "never delete the gym" half
  survives, and it is now absolute.
- 2026-08-31 · ❗Botón: where restart lives · **⚙️ Settings, behind a two-tap confirm**
  · the story never sends you there; it is a testing tool, so it stops sitting next to
  the button that continues the story.
- 2026-08-31 · ❗Negocio: the southeast lot · **plan all four remaining businesses**
  — taller, panadería, limpieza, tax/notario, one per phase · the owner wants the
  city grown, not a single storefront.
- 2026-08-31 · ❗Semana: weekly chapters · **retired** — "we dont have to follow weeks
  any longer" · districts open and stay open; the city has no credits, it grows.
- 2026-08-31 · ❗Reporte: two jobs in one report · **role summary on top, chronological
  detail underneath** · a hiring manager reads the job they are hiring for. BUILT.
- 2026-08-31 · ❗Corazones (open city): what three bad calls cost · **hearts are the
  grade on a business's ending, scoped per business, and never block anything** ·
  owner: "this is for story mode so no big deal just so i learn, and we can reuse the
  same for other stories" — so the rule is one sentence and takes nothing away.
- 2026-08-31 · ❗Siguiente: build order · **front-profile 2.5D first, then close the
  signed-not-built gap (open-city refactor + per-business hearts), then build the four
  packs** · owner set the order directly.
- 2026-08-31 · ❗Mando: who wins when Nacho and Don Güero disagree · **the owner
  referees, every time — for now** · with a stated goal of graduating to browse-and-
  approve, so every standing preference now gets written to `docs/OWNER.md`.
- 2026-08-31 · ❗Orden: what to build now · **the plan only** · roadmap signed, report
  shipped, no new district this session.
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

## Owner playtest feedback — iso round (2026-08-31, logged for next session)

Diamond-iso v1 verdict: generic surfaces, hidden entrance, doors/walls/fences/
trolley-stop all lost identity, emotes missing. Owner steer: front profile, not
angled. Full plans: IDEAS §10 (TILES+DECOR metadata architecture, front-profile
renderer, camera rotate/wall fade), §11 (Sonny's program — fetch 4/7, feed, howl,
lay, dig, 💩→ future janitor pack), §12 (emote regression). Only plans were made,
per owner instruction — nothing built this round.
