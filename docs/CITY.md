# The City Ledger 🏗️

Don Güero's single source of truth. The `/don-guero` skill reads this, plans the
next phase on Opus 5, and brings open decisions to the owner as side quests. Every
signed decision gets logged here — a recorded decision is a permit, not a suggestion.

**Phase: 1 (planning next)** · Ledger opened 2026-08-30.

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

## Open parcels

- **st southwest lot** — signposted "LOT: EL MERCADO" on the mini-map (drawTown).
  The obvious phase-1 candidate: a family abarrotes/mercado.
- **st southeast lot** — signposted "RESERVED LOT". Unassigned.
- **Calle Dos frontage** (`ex` rows 0/9) — room for small storefronts along the canal.
- **New maps** — the engine takes new worlds as data (`WORLD_DEFS` + portal); a
  bigger business can be its own interior, like La Cocina.

## Growth history

- 2026-08-30 — La Obra completed: two-stage construction (quests 12+13) raised the
  Studio; Lupe moved streetside; Xochi's quest + wardrobe opened.
- 2026-08-30 — Nature pass: jacarandas, flower beds, grass, butterflies, colibrí,
  street cat; themes now reach the world; ambient particles.
- 2026-08-30 — Townsfolk: Nacho (muralist) and Yola (paletera) moved in; owner can
  create up to 12 chill characters (admin 🧍); 39 name eggs live.

## Pending proposals (⏳ = needs an owner decision via side quest)

- ⏳ **El Mercado** (st southwest lot): Hispanic family grocery. Natural first
  practice pack — candidate roles: AI ops analyst (inventory/demand) or automation
  consultant (ordering, supplier WhatsApp bot). Don Güero to propose in Phase 1.
- ⏳ **Which AI role first**: the owner should rank the roles in Purpose (side quest
  material for Phase 1).
- **Hispanic-business brainstorm** (owner ask, 2026-08-30): panadería, salon/barbería,
  auto shop, landscaping, cleaning company, real-estate/property mgmt, trucking,
  dental/clinic, event planning/quinceañeras, tax prep/notario. Don Güero curates
  per phase — one at a time.
- **Week Two** (endings tease it) — narrative arc for a later phase.
- Fandom eggs round 2 + mechanics (IDEAS §9) — waiting on AJ's picks.

## Decision log

*(format: date · quest title · choice · one-line why — append only)*

- 2026-08-30 · Cartridge model · saves stay on-device, Trolley Pass is the link
  cable · zero-maintenance rule. *(imported from HANDOFF)*
- 2026-08-30 · Retry-until-correct · quests complete only on the right answer ·
  teaching game, not a quiz show. *(imported from HANDOFF)*

## Phase 1 plan (drafted by Don Güero, SIGNED by the owner 2026-08-30)

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

**Signed 2026-08-30 (see decision log):**
- Role ranking: 1 Automation/Solutions Consultant (headline — matches owner's
  existing SMB AI-audit work), 2 AI Ops Analyst (the resume gap; Phase 1 trains it),
  3 Implementation Lead, 4 AI PM, 5 Prompt/Solutions Engineer.
- El Mercado: ribbon + `me` interior, WITH the content-seam extraction; growth
  registry queued so Phase 2+ can be player-built.
- Decision-report export: next phase.
- Week framing: "Week Two, chapter one" (content-only reframe).

**Decision log — Phase 1 signatures (2026-08-30):**
- Role ranking · ALL FIVE, in order: 1 Automation/Solutions Consultant, 2 AI Ops
  Analyst, 3 Implementation Lead, 4 AI PM, 5 Prompt/Solutions Engineer · "reach for
  the sky" — the city trains every role, one business each; Phase 1 = ops analyst.
- El Mercado build · ribbon + `me` interior + DOORS/TOWNLBL/MAPDOT extraction ·
  balance now, pure-content businesses forever; growth registry queued for
  player-built later. Entities-as-data law affirmed.
- Quest scope · all 5 mercado quests (core 1,2,5 first; stretch 3,4 same session if
  budget holds) · MAXXP target 330.
- Decision-report export · SHIP IT — with Phase 1 if budget holds, else immediately
  next · the owner wants the interview-ready artifact of their in-game calls.
- Week framing · "Week Two, chapter one" (content-only reframe) · same feeling,
  zero engine surgery.

## Owner feedback log (2026-08-30, playtest round 2)

- Theme editor "colors don't change" — **root-caused & fixed**: editor opened on the
  Light variant while the phone displayed Dark; now opens on the visible variant, and
  closing the editor confirms "✨ Custom theme saved."
- ⏳ **Palette wardrobe** (owner ask): NAME each custom palette, keep several saved
  ("favorites"), and drag to reorder/swap them in Settings. Design: mqcustom becomes
  a list [{name, light, dark}] with a picker row; drag-reorder; cap ~8. Queue after
  Phase 1 build, pairs with the graphics prep refactor session.
