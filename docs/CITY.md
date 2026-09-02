# The City Ledger 🏗️

Don Güero's single source of truth. **Read `docs/OWNER.md` first** — the owner's
standing rules; anything Settled there is a permit, not a question. The `/don-guero` skill reads this, plans the
next phase on Opus 5, and brings open decisions to the owner as side quests. Every
signed decision gets logged here — a recorded decision is a permit, not a suggestion.

**Phase: 2 — Taller Herrera (parcel planned 2026-09-01, three decisions signed, NOT built)** · Ledger
opened 2026-08-30. **Deployed: `mq-v46` on `main`, 2026-09-02** (S0 + S2 v1).

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

- 2026-09-02 — **The room upstairs (S2 v1)**: Floor 2 relaid bare; the room-interview
  seam (`INTERVIEW` in `content/meridian/room.js`, read by the engine as shapes only);
  Nacho moved upstairs; the ❗ rule extended to "has something to say" in every camera;
  Export gained *The room*; the version on the opening page. Shipped with S0 at `mq-v46`.
- 2026-09-02 — **La ventana del norte**: `f2` got its window. Three panes of a new `|`
  glyph in `f2` row 0 above the old lead's desk, declared pack-side in the FIRST
  `content/meridian/art.js` (TILEART + TILEMETA + SOLIDX + MAPCOL) — no engine change for
  the tile, and a pack that ships no art.js gets no window. The pane looks north: the back
  lot, the road out of the barrio and the graded line on the horizon — Barrio Norte stays
  a promise you can now SEE. Sky takes the season through `art()`. Güero's `window` step
  stopped promising and started asking what you want framed, and its "the street" option
  — impossible on a north wall — was replaced. "Who is the room for" opens his form. On
  the branch at `mq-v47`.
- 2026-09-02 — **La mudanza (`f2` a medio mudar)**: the office stopped opening bare.
  Four taped moving boxes (`□`, the pack's SECOND glyph, `content/meridian/art.js` — one
  drawing, two silhouettes by tile parity), one of Don Güero's cones (`C`) and a plant
  still in its pot (`P`). The desk, the stairs and the three panes never moved. The sight
  line from the stairs to the window stays clear (Nacho's "nothing in the way" is an
  answer a player can pick, so it has to be true), the arrival tile (17,11) stays clear,
  and every walkable tile stays reachable. Owner: *"i think for the move it should be
  mid and we can have don guero provide estimates and possible furniture to furnish"* —
  the furniture catalogue with per-piece estimates is `docs/BACKLOG.md` §6.
- 2026-09-02 — **Se acabó el tope**: the city stopped stopping at one storefront and
  the record stopped forgetting. `GROWTH.ribbons[]` with a shim so the singular `ribbon`
  still works, each storefront carrying its own `doorstep`; and the play log keeps EVERY
  decision instead of its last 200. Owner: *"I thought we fixed this 200 entries thing
  and not stopping at a certain amount of store fronts"* — it was not fixed when they
  said it; it is now. Both under test.
- 2026-09-02 — **Muebles de frente**: the front and 3D cameras stop standing top-down art
  up like cardboard signs. `TILESIDE` holds a second drawing per prop for the cameras that
  see it standing (table, counter with a coffee machine every third tile, stove), the
  barricade `G` is an orange board with white stripes instead of a ladder, and every door
  in 3D wears a light frame with a bigger pool of light under it. Owner's report:
  "hard to see some doors" and "the table and fences and the coffee machine". IDEAS §15.11.
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

- 2026-09-01 — **Phase 2 parcel planned: Taller Herrera**, `st` southeast lot. Ribbon
  row 13 x18-28 with a roll-up door `%` at x23, apron props on row 14 (Tacho's Caprice
  at x19, tires at x25 — positions forced by the reachability audit, not taste).
  Interior `ta` 20x12: three lift bays, a parts wall, Yesenia's counter two steps inside
  the door, the office nook, a waiting corner. Cast `t`/`y`/`m`, Tuerca moved in from
  Calle Dos. Quests 24-31, `need` 5, role: automation / solutions consultant. Seven new
  glyphs (`= % 6 7 8 0 i`), all pack-side in a NEW `content/meridian/art.js` — the first
  real use of the TILEART/TILEMETA seam.

## ⚠️ THE CEILING — the roadmap promises four more businesses; the code holds two

Verified in the engine on 2026-09-01, not inferred. The ledger's "one business per
phase, Phases 2-5" cannot run as written until three things generalize:

- ~~**`finish()` has exactly two epilogue sets.**~~ **Lifted 2026-09-02:** a district declares
  `epi`/`go`/`open` in CHAPTERS; the old two-set rule is the fallback. Was `engine/engine.js:2000` —
  `const E=last?[t.mepi1,t.mepi2,t.mepi3]:[t.epi1,t.epi2,t.epi3]`. Add a third district
  and the taller prints the mercado's ending while the mercado prints Week One's.
  → every district declares its own `epi:[k3,k2,k1]` and `open:"<toastKey>"`.
- ~~**The handover doorstep is hardcoded to the mercado's front step.**~~ **Lifted 2026-09-02:**
  each ribbon declares its `doorstep`; the engine walks you nowhere of its own choosing.
- ~~**`GROWTH.ribbon` is singular.**~~ **Lifted 2026-09-02:** `ribbons[]`, one per storefront,
  each rising on its own district, with the `g.ribbons||(g.ribbon?[g.ribbon]:[])` shim so
  AJ's pack and older declarations keep working. The record's 200-entry cap went the same day.
- **STILL OPEN, new (Don Güero, 2026-09-02):** the town plan's `flags` carry ONE boolean for
  all storefronts, so a second lot cannot have its own label until each storefront carries
  an `id`. A sixteenth of a sitting. Anchor by the function, not the line — they drift.

None of these name the taller, so they stay legal under "the engine may never name a
pack's content" — they are the seam that has to be paid once, exactly like the
DOORS/TOWNLBL extraction was for El Mercado. **This is the real cost of Phase 2, and it
is bigger than the shop.**

Also from the same measuring pass, smaller but real: the uppercase tile alphabet is
**fully consumed** (A-Z), so new glyphs are digits and symbols from here; and `NPCLOOK`
is keyed by station **letter, globally**, with 20 of 23 usable letters spent — Phase 3
would have none left unless looks key by npc instead.

## Pending proposals (⏳ = needs an owner decision via side quest)

- ✅ **❗La oficina** — signed 2026-09-02: the barrio furnishes it, one piece per
  business. Built the same day (S2 v1), with the interview. ⚠️ **AMENDED 2026-09-02 by
  the owner: the office opens MID-MOVE, not bare** (*"i think for the move it should be
  mid"*). The furnishing rule is untouched; only the day-one state changed. Retires owner
  call #2 in `docs/rooms/aj-office.md` §8.
- ✅ **La vía que se acerca** — approved in principle 2026-09-02 (owner: *"I do like the
  idea of seeing a neighborhood incoming"*). Content-only on top of the built window, a
  third of a sitting; still **waits on S1**, because it cannot be tested until districts
  close.
- ✅ **Furniture deliveries may be GROUPS** — answered by architecture, not by a build: a
  storefront's `tiles` has always been a list. What remains open is ART for a piece wider
  than one tile (❗El sillón).
- ⏳ **❗El reparto** — which business sends which piece: assign all nine now (Don Güero's
  pick; the catalogue in `docs/BACKLOG.md` §6 is the proposal) or let each pack pick.
- ⏳ **❗El sillón** — the couch: one tile (a loveseat, an eighth) or two (a real one, a
  quarter, and the city's first group delivery).
- ⏳ **❗La caja** — gifts land ON the box tiles as the room fills (Don Güero's pick; free).
- ✅ **❗La ventana** — signed and built 2026-09-02. ⚠️ The ❗La oficina entry in the
  decision log read "a north window onto the trolley line"; the trolley runs SOUTH of HQ.
  Amended in place with a dated note.
- ⏳ **La vía que se acerca** — the window's view advancing a stage per finished business
  (the second progress bar beside Nacho's mural). Content-only on top of the built tile;
  a third of a sitting. **Waits on S1**, because it is not testable until districts close.
- ⏳ **Furniture deliveries may be GROUPS, not single tiles** — surfaced by "who is the
  room for": ❗La oficina's "one piece per business" is a *set* for a team room (a table
  and its chairs). One line in S1's furniture registry; expensive to retrofit after five
  packs have declared their piece.
- ✅ **❗La palabra** — signed 2026-09-02: the word is the reward. Under ❗El giro the five
  terms become the TRADE's vocabulary, not the role's.
- ✅ **❗El papel** — signed 2026-09-02: template **06 Process & Exception Map** gets
  written. ⚠️ `docs/templates/README.md` already assigns template 01 to the taller's
  process map — **two templates would claim one artifact.** Nacho's read is that they are
  genuinely different documents (01 is what you write BEFORE you understand the work; 06
  is what you hand over AFTER) and both should exist, but the README's "Taught by" column
  must be corrected and 06 given a row. **Flagged, not guessed.**
- ✅ **❗La despedida** — signed 2026-09-02 (owner deferred the call to /nacho): a
  district's Saturday is a goodbye at the door, declared per district as
  `ending:{mode:"doorstep"|"panel"|"quiet"}`. `panel` is kept so nothing regresses.
  **Hard build-order dependency: needs the office. No office, no doorstep.**
- ✅ **❗El giro** — signed 2026-09-02: **industry leads, role follows.** `industry:` is
  ADDED beside `role:`. This dissolves the `principal`/Limpieza collision rather than
  patching it — the same craft appearing in two very different rooms is PROOF the skill
  transfers, which is the most valuable thing a portfolio can show.

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

- 2026-09-02 · ❗El cuarto de arriba: what stands in Floor 2 on day one · **bare, as
  signed** — one desk, the stairs, and Nacho and Don Güero placed by content, not by a
  map letter · Don Güero's moving-in debris was declined for now because the only crate
  tile is El Mercado's produce crate (it reads as groceries), and the window because no
  window tile exists; both are owner calls in `docs/rooms/aj-office.md` §8. His geography
  correction stands: the trolley runs south of HQ, so a north window cannot look "onto
  the trolley line".
- 2026-09-02 · ❗La ventana: how much window on the north wall · **three panes, season
  sky** (Don Güero's pick, Nacho agreed; owner delegated: "maybe /nacho and /don-guero can
  work something cool out") · one pane is invisible from the stairs and the staged version
  cannot be tested until districts close — the band grows into it later as a content edit,
  with no new glyph and no redraw. The floor light under it was skipped: content cannot
  wrap the engine's floor drawing without a seam for it.
- 2026-09-02 · ❗Quién sube: whose room is it · **Don Güero asks it, first line of his
  form** (owner: "that should be a question in the creation - who is the room for") · the
  answer changes the furniture math, not the mood, so it belongs to the builder — and it
  RETIRES owner call #4 in docs/rooms/aj-office.md §8, because the sheet now states whose
  room it is instead of the build session guessing.
- 2026-09-02 · ❗La mudanza: bare or mid-move · **MID-MOVE, and Don Güero prices the
  furniture** (owner: *"i think for the move it should be mid and we can have don guero
  provide estimates and possible furniture to furnish"*) · supersedes the "opens bare"
  half of ❗La oficina and retires owner call #2. One new glyph `□` (the taller's
  reservations `0 6 7 8 = % i` are NOT spent), four boxes, a cone, a plant; the window
  sight line and the arrival tile stay clear. Nacho's talk title became *Before you
  unpack* (Güero's suggestion; Nacho may rename).
- 2026-09-02 · ❗Quién sube (asked again): whose office is it · **the owner's own room —
  and still a template** (owner: *"In this case it is mine but of course this is to be a
  template for the skill"*) · `f2` is the owner's office in Meridian's pack;
  `content/<pack>/room.js` stays the copyable interview so AJ's pack asks its own person.
- 2026-09-02 · ❗La vía que se acerca: the window's view advancing · **approved in
  principle** (owner: *"I do like the idea of seeing a neighborhood incoming"*) · four
  drawings, four cold reads, content-only; held until districts close so it can be tested.
- 2026-09-01 · ❗El taller: the shop's footprint · **shop plus an apron** — one door and
  one interior like the mercado, and the ribbon also drops the Caprice and a tire stack
  on the sidewalk · it reads as an auto shop before you open anything, and the sitting
  stays spent on the eight quests.
- 2026-09-01 · ❗El recado: do the taller's jobs leave the shop · **six inside, two out**
  — the parts run to Calle Dos, the cousin's software demo where Doña Chelo can overhear
  · uses maps that already exist and makes the referral run both ways: she vouched for
  you, now she is watching.
- 2026-09-01 · ❗El papel: the document the taller hands you · **a process-and-exception
  map** — how work flows, where a human must sign, which step cannot be taken back ·
  it carries "never automate the irreversible step" out of the game and into a meeting,
  and no other business in the city teaches it.
- 2026-09-02 · ❗La oficina · **SIGNED — the office opens bare and the barrio furnishes
  it.** `f2` (20x14, portal already wired from HQ) opens with two things: the old AI
  lead's empty desk and a north window onto the road out of the barrio *(amended
  2026-09-02: it was signed as "onto the trolley line", but the trolley runs SOUTH of HQ —
  Don Güero's correction; the decision-log entry of that date is the record)*. Each business then ships
  ONE piece of furniture with its own pack, declared in that district's own data so
  nobody re-opens `f2`'s map five times. Supersedes the counter-proposal below.
- 2026-09-01 · ❗La pared: where the record lives · **counter-proposal, now SIGNED above
  as ❗La oficina.** Original note kept: Owner: *"i think an office should become mine
  somewhere so i can access these."* Supersedes the mural-wall-only option. For whoever
  specs it: **`f2` already exists** — "Floor 2 · Expansion", portal wired from HQ at
  `PORTALS.hq["1"]`, arrive text *"Quiet up here… for now."* An empty floor with a door,
  waiting for a purpose. Fits Settled "HQ is the onboarding", and gives the terminology
  work (glossary, filled deliverable drafts) a room rather than a menu. Nacho's mural
  keeps the CITY's record; the office is the player's own. **Needs a parcel spec from
  /don-guero before it can be built.**
- 2026-09-01 · ❗Orden (Don Güero's call, not a survey) · **the 3D/world sitting ships
  BEFORE Taller Herrera** · new storefront art must not be judged against a renderer
  that lays doors on the floor, and two branches repainting tiles at once is a merge
  that eats a session.
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
