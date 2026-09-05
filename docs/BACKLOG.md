# El changarrito de Don Güero — the backlog

*Don Güero's stall. One list, ranked, so the owner can see what is queued and what it
costs without opening three files.*

**Opened 2026-09-02**, because the owner asked: *"why dont you have a backlog don guero?
i hope you do at least."* Fair question — the answer was "sort of": items lived in
`docs/IDEAS.md` (15 sections), `docs/CITY.md` (pending proposals) and
`docs/NEXT-SESSION.md` (a numbered queue), and **nothing told you what was next across
all three.** This file is the single ranked view. The other three stay as the detail;
this one is the index.

**How to read it.** Everything here is **planned and not built** unless it says
otherwise. Cost is in *sittings* — a sitting is one working session, the unit Don Güero
prices in. "Blocks" means the thing cannot start until that is done.

---

## The shape of the rollout (Don Güero + Nacho, summit 2026-09-01)

Eight sittings, not the four the ledger used to promise. The old estimate priced the
quest packs and forgot the engine seam, the office, the ceremony and the second lap.

| # | Sitting | Cost | What you would see |
|---|---|---|---|
| **S0** | ~~El 3D y el mundo~~ | **shipped 2026-09-02** (merged at `mq-v46`) | doors that stand up, sharp 3D, La Cocina reads as a restaurant, autumn arrives on its own. *Not* the bridge arch — that waits on elevation |
| **S1** | **La cimentación** | one | **nothing** — and that is said out loud. The whole engine seam, paid once |
| **S2** | ~~La oficina (`f2`)~~ | **shipped 2026-09-02** (v1 at `mq-v46`; window, mid-move and the tenth question the same day) | the room opens mid-move, Nacho and Don Güero ask ten questions with no wrong answers, the sheet is the player's — `docs/rooms/aj-office.md`. *Not yet:* the furniture arriving (§6 below; the engine part is an eighth of a sitting) |
| **S3** | ~~Taller Herrera~~ | **written and wired 2026-09-02** (`mq-v51`) | the southeast lot opens on the mercado's Saturday; quests 24-31; template 06 |
| **S4** | ~~La Espiga + Velázquez~~ | **written and wired 2026-09-02** (`mq-v51`) | Calle Dos opens one door at a time — the bakery on the taller's Saturday, the cleaners on the bakery's; quests 32-47 |
| **S5** | ~~Nolasco Tax & Notario~~ | **written and wired 2026-09-02** (`mq-v51`) | the walkup opens on the cleaners' Saturday; quests 48-55; template 07. His Saturday opens nothing — S6 is next |
| **S6** | La inauguración + la mañana siguiente | one | the street dressed, the mural full, the day turning over while you sleep |
| **S7** | La segunda vuelta | half | five neighbours phone *you* |

**Playtest gates:** `/playtest` after S2, S3 and S6. ~~**S4 does not begin until the
mercado has been human-played**~~ — waived for the *writing* by the owner on 2026-09-02
("now please"). **Corrected 2026-09-05:** the owner HAD played the mercado — the save bug
fixed at `mq-v52` dropped the district counter and the grades on every Continue, so the game
itself lost the record (IDEAS §15.13). What has never happened is a *graded* run (marks only
survive from `mq-v52` on) and any human play of the four newer packs: **the first human play
of the taller, La Espiga, Velázquez and Nolasco is the next gate**, and they get revised
against it.

---

## 1 · Blocking everything — the engine ceiling

**The roadmap promises four more businesses. The code holds two.** All verified in the
engine, all landing in **S1**, none of them naming a business.

| What | Where | Why it blocks |
|---|---|---|
| ~~`finish()` has exactly two epilogue sets~~ | **shipped 2026-09-02** | a district declares `epi`/`go`/`open` — its own three endings, burnout line and next-lot toast; the old rule is the fallback |
| ~~the handover doorstep is hardcoded~~ | **shipped 2026-09-02** | each storefront declares its own `doorstep`; with none declared you stay where you were |
| ~~`GROWTH.ribbon` is singular~~ | **shipped 2026-09-02** | `ribbons[]`, one per storefront, each rising on its own district; the old singular still works. Owner: "I thought we fixed this" — it was not, now it is |
| ~~`NPCLOOK` is one flat global table~~ | **shipped 2026-09-02** | a look is keyed by npc id first (`NPCLOOK.tacho`), map letter second — the taller's cast wears its own colours |
| `GROWTH` cannot read a grade | the growth code in `engine.js` (anchor by function, the lines drift) | the taller's endings change the world (cat on the Caprice, assistant switched off) and the code has no idea how well you did. **Written around it 2026-09-02:** all four packs' endings are words only; the world looks the same at every grade (Nacho's contradiction H) |
| ~~the report truncates at 200 entries~~ | **shipped 2026-09-02** | the record keeps every decision; if the phone refuses the write it says so once instead of dropping the oldest. Owner: "I thought we fixed this 200 entries thing" — it was not, now it is |
| the uppercase tile alphabet is spent | `engine.js:10` | new glyphs must be digits and symbols from here — the first, `\|` the window, lives in `content/meridian/art.js` (2026-09-02) |
| ~~a delivery is one tile~~ | **answered by the architecture** (Don Güero, later the same day) | a storefront's `tiles` has always been a list, and a furniture delivery IS a storefront aimed at `f2` — a group costs nothing extra. What remains is ART for a piece wider than one tile (the couch) |
| **the engine hardcodes 35 world ids** (`world===\"st\"` ×11, `\"pk\"` ×11, `\"lc\"` ×5, `\"hq\"` ×5, `\"lo\"` ×3, `f2`, `ex`) plus the dog/cat/pigeon pinned to `hq`/`lc`/`st` | `engine/engine.js` throughout | AJ's pack inherits Meridian's world ids. The portability guard (`test/smoke.js:1664`) is a 39-proper-noun blocklist: it catches \"chelo\" and misses \"hq\", so every pack-safety claim to date is unaudited. Found by the completeness critic, la junta 2026-09-03 |
\1 | **shipped 2026-09-02** | each storefront carries an `id` and the town plan reads `f.up.<id>`; the four parcels label themselves |

---

## 2 · Signed, waiting on a sitting

| Item | Cost | Notes |
|---|---|---|
| **The office (`f2`)** — opens bare with the old lead's desk; the barrio furnishes it one piece per business | **bare + the interview shipped (S2 v1)**; furniture waits on S1 | furniture declared in each district's own data, or the map gets re-opened five times. The north window is a promise in Don Güero's mouth until a window tile passes the cold read |
| **The word is the reward** — a term enters through whoever *needs* it, in the beat after you get it right; pins to the office wall | S1 registries + content | retrofitting Week One and El Mercado is **a third of a sitting**, not free |
| ~~**Template 06 — Process & Exception Map**~~ | **written 2026-09-02** | the taller's deliverable, plus **07 — What it answers, what it refuses, who it hands to** for Nolasco; 01 assigned to the panadería, 04 shared with the cleaners (`docs/templates/README.md`) |
| **La sombra** — the franchise offers *you* a job; nobody's business is harmed | S6/S7 | ships as content a pack may omit entirely |
| **Spot-the-flaw** — the one new quest format | S1 | one format only, and the owner sees it before anything is mass-produced |
| ~~**Seasons** — one autumn season on a Día de Muertos palette, auto by date with an override~~ | **seam shipped 2026-09-02** | bridge only, as signed. **Palette is a draft — owner signs it off** (one line in `config.js`). Widening to jacaranda/awnings/light is the next `art()` keys |
| **`/room-design` skill** — interview a person about ONE room, produce a build-ready spec | drafted 2026-09-02; **first job done** (`docs/rooms/aj-office.md`) | the bridge between `game-brief` (asks about a whole game) and `game-world-expansion` (builds a place). The interview now also runs IN the game (`content/<pack>/room.js`): AJ answers on her phone, the owner copies the sheet, the build session reads it. A virtual office for the team is the second use |
| **Meridian's storefront art out of the engine** — `Q`, `Z`, `I`, the produce helper and the DOORLOOK colours are Meridian's, drawn in `engine/engine.js`; the `TILEART` seam exists and Meridian does not use it | S1 | found 2026-09-02 while fixing legibility. Not a bug for the player; a bug for AJ's pack |
| **`/role-pack` skill** — turns a role into a district: curriculum, words, quests, paper, and a coverage report | before S4 | Nacho and Don Güero proposed it independently. Built with `skill-creator`, measured against the hand-written taller |

---

## 3 · Bugs and gaps, ranked by what they cost the player

| # | Thing | Cost | Detail |
|---|---|---|---|
| 1 | ~~**3D blur** — every texture baked at 1× while the screen renders at up to 3×~~ | **shipped 2026-09-02** | S0 item 3. One factor K at every bake site, re-bakes on a DPR change; test in `smoke.js`. §15.1 |
| 2 | ~~**Doors lie flat in 3D** — 6 of 16 face the wrong way, all in HQ~~ | **shipped 2026-09-02** | S0 item 2. Doors turned to their wall, thin boxes with a lintel and a breathing floor light; walls textured on all four sides. §15.3 |
| 3 | ~~**The doorway ignores you** for ~900ms after you come through, and never re-checks~~ | **shipped 2026-09-02** | S0 item 1. A standing check with an anti-ping-pong hold; test in `smoke.js`. §15.6 |
| 4 | ~~**La Cocina does not read as a restaurant**~~ | **shipped 2026-09-02** | a steaming bowl and a chile in one window. §15.8 |
| 5 | ~~**All five doors are pixel-identical**~~ | **shipped 2026-09-02** | `DOORLOOK` in the pack colours each door for its destination; shop doors get glass. Smoke test bakes every door and fails on a twin. §15.8 |
| 6 | **The rainbow bridge is a flat stripe** that does not span the river | a sitting | there is no bridge object in any camera. §15.4 |
| 7 | ~~Desk reads as a cardboard box; table reads as a dartboard; the mercado scale is illegible~~ | **shipped 2026-09-02** | desk with a monitor; gingham table with plates and chairs; a dial-and-tray scale. §15.8 |
| 8 | **`LEVELS` saturates at 120 XP** while MAXXP is now 830 | small, but a trap | you hit "AI Legend" a third of the way through Week One. **Not retuned on 2026-09-02 on purpose:** raising a threshold demotes a saved player from AI Legend, and nothing is ever taken away — add levels above, never move the ones below, and the names are the pack's (`levels` in strings.js) |
| 9 | **Error log** — 3D failure is swallowed in four places and leaves no trace | ~55 lines | designed in full. §15.5 |
| 10 | **Lit windows never light in 3D** — the night glow on facades runs only in the flat cameras, and 3D is the default | small | found by Don Güero while pricing the office window (2026-09-02); the window deliberately does not use it. Build it in 3D or write it down as known |
| 11 | ~~**Doors hard to see in 3D**~~ | **shipped 2026-09-02** | a light frame baked around every door face and on the jamb, a bigger pool of light under it, and a bouncing marker over any door that leads somewhere when you are within three steps (owner: "i think we should have a marker"). §15.11, §15.12 |
| 13 | ~~**The pigeon steals the tap** meant for Don Güero~~ | **shipped 2026-09-02** | a person with a quest beside you hides the animal buttons. §15.12 |
| 14 | ~~**Construction fences lie sideways in 3D**~~ | **shipped 2026-09-02** | a fence panel stands along its run; corners get two. §15.12 |
| 12 | ~~**Furniture stood up as cutouts** — the table read as a dartboard, the counter as a grey sign, the barricade as a ladder~~ | **first slice shipped 2026-09-02** | `TILESIDE`: a second drawing per prop for the cameras that see it standing; table, counter, stove done, barricade redrawn. The rest read acceptably in the frames and get a side view the moment the owner reports one. §15.11 |
| 10 | **A wall between you and the camera hides you** — stand just north of an interior wall in 3D and only your head shows | ~1h | found 2026-09-02 by the eyeball pass, pre-existing. Fade the wall, lower walls, or raise the camera — not chosen. §15.3 |
| 15 | ~~**The Saturday replays on every open; the street is blank after it**~~ | **shipped 2026-09-03** | the save loader dropped the district counter and the grades; the boot-into-ending path never sized the canvas. Damaged saves repaired at Continue. §15.13 |
| 16 | ~~**Keys on a laptop** (caps lock, non-QWERTY)~~ | **shipped 2026-09-03** | `keyDir()` reads key then code. §15.13 |
| 17 | ~~**The building pops in after the permits quest**~~ | **shipped 2026-09-03** | the stage lands behind a short curtain after the card closes. §15.13 |
| 18 | ~~**Furniture shows one face from every direction in 3D**~~ | **first slice shipped 2026-09-03** | boxes for furniture with a side view; the HQ desk and `A H I S W` still need a side drawing to stand as boxes. §15.13 |
| 19 | ~~**Sonny carries the ball behind him at the north stop**~~ | **shipped 2026-09-03** | animals and the hero are painted for the camera stop, not the map. §15.13 |
| 20 | **Grades lost by the save bug cannot be rebuilt** | none | marks made after `mq-v52` persist; a report written before it may show fewer clean calls than were made |

---

## 4 · Open questions for the owner

| Question | Who is waiting |
|---|---|
| **The four story calls were made with Nacho's picks** (`docs/story/las-cuatro-puertas.md`, top): Tuerca a she; the franchise unnamed; paper 06/01/04/07; Calle Dos one door at a time. Any to flip? | one line each; the packs are written |
| **Play the taller**, then Calle Dos and Nolasco — written before anyone played them. *(The mercado was played; the `mq-v52` save bug ate the grades, so a graded run of it is still worth one sitting of yours)* | the four new packs, for revision |
| **The room upstairs — one call left** (`docs/rooms/aj-office.md` §8): Nacho off the street. *(Window: built. Whose room: the interview asks it. Mid-move: chosen and built 2026-09-02.)* Plus Don Güero's four after the build (§10 there): gifts land on the boxes; the couch one tile or two; assign who-sends-what now; Nacho's talk title | shipped with a pick on each; one word flips any |
| **How does a district's Saturday present itself?** Deferred to /nacho; must be content-declared so a pack can choose differently | blocks S1's ending refactor |
| ~~**Industries vs roles**~~ — built 2026-09-02: `industry:` beside `role:`, the report prints *industry · role* | Week One is still one industry (Enterprise IT) until the Week One split is decided |
| **The city's record to a government NPC** — separating the player's portfolio from the city's memory | new, a story surface |
| **The Día de Muertos palette** — six bridge colours in `config.js` are a draft; say yes or change them | S0 shipped the seam with them in |
| **Merge S0 to `main`** — seven engine/content commits on the branch at `mq-v45`; nothing is playable for the owner until this | the owner's word |
| **Elevation** — walking *over* the bridge needs actors to have a height | deliberately deferred: build it when a *second* thing needs it (stairs, rooftops, the trolley platform), not for one park tile |

---

## 6 · El catálogo de muebles — what each business could send upstairs, priced

*Don Güero, 2026-09-02, at the owner's ask: "we can have don guero provide estimates and
possible furniture to furnish." One piece per business is signed; this is what the pieces
could be and what each costs. Nothing here is built. Two rules decide every row: one
glyph per tile, nothing sits on top of anything; and the game cannot read the sheet at
runtime — the build session reads it and writes the pack's data.*

**How a delivery works, in the engine that exists today:** a delivery IS a storefront
aimed at Floor 2 — *"when district N's goodbye is acknowledged, write these tiles into
`f2`."* Same machinery as El Mercado's ribbon, one number different. A group (a table and
its chairs) is just more entries in the same list. The whole city's deliveries cost about
**an eighth of a sitting in engine work**; everything else is drawing, paid by whichever
business sends the piece inside its own sitting.

| Business (trade) | Candidate piece | Art today? | One tile or a group | Where in `f2` | Estimate |
|---|---|---|---|---|---|
| **Meridian Labs** (corporate IT) | Your own desk — a second desk, so the old one stops being the only one | `D` exists | one | (12,2), east of the old desk | a sixteenth |
| Meridian Labs (alt) | The glossary wall — the words you learned, pinned | new wall-kind glyph | group of 2 | north wall, west of the panes | three sixteenths |
| **Tovar** (restaurant chain) | The couch — a chain remodel, and one lands upstairs | new | **the group case:** one tile = a loveseat, two = one you can lie on | west wall; or under the window if the sheet says the old desk goes | an eighth (1) / a quarter (2) |
| **La Cocina** (Doña Rosa) | The big table — "spread it all out" | `T` exists (gingham, plates, a chair) | one | (10,7), dead centre, off the sight line | a sixteenth |
| **La Obra / the Studio** | The deliverables wall — plans pinned where you can see them | `U` exists (blueprint panel, wall-kind) | group of 2 | north wall run | a sixteenth |
| The Studio (Xochi, alt) | The rug | `R` exists, walkable | group of 2–4 | in front of the couch, never under the table | a sixteenth |
| **El Mercado** (Doña Chelo) | The coffee corner — with something to eat, because it's Chelo | `K` exists | group of 2 | southwest corner | a sixteenth |
| **Taller Herrera** (Don Tacho) | The dog bed — the shop dog's spare, hauled up | new | one | (14,11) — a box becomes it | three sixteenths |
| **Panadería La Espiga** (Doña Licha) | The guest chair — answers "somebody else needs a seat" | new — the most reusable glyph in this list | one | (11,2), beside the desk | three sixteenths |
| **Limpieza Velázquez** (Doña Vero) | They haul the empties — the last boxes go, the floor is clean | no art: the delivery writes floor over the box tiles | group of 2 | (15,5) and (18,10) | a sixteenth, and the best feeling per peso here |
| **Nolasco Tax & Notario** | The file cabinet where the report lives — the paperwork man gives the record a body | new | one | (17,10) — the box by the stairs becomes it | three sixteenths |
| anybody, the cheap gift | Plants | `P` exists | one each | (1,1), (18,1) | a thirty-second |
| anybody, honest warning | Bookshelf | `S` exists, but it reads as store shelving | one | (2,1) | a sixteenth as-is; three sixteenths for real books |

**Totals, honestly:** every business delivering = four to five new drawings, about half a
sitting of art in all, plus roughly a third of a sitting of placement and hooks — but
nobody pays that as a lump. Each business pays an eighth to a quarter inside its own
sitting. **Standing rule:** nothing taller than a plant in the corridor from the stairs to
the window; wall pieces go on the north wall outside the panes and on the west wall.

**Ledger correction carried:** Nolasco is a walkup off Calle Principal, not Calle Dos.
Calle Dos holds two parcels: La Espiga west, Velázquez east.

---

## 5 · Deliberately not doing

- **`budget` stakes mode** — declared in config, marked ARCHITECTURE ONLY. Not an
  oversight; do not "fix" it.
- **Barrio Norte as a place you can visit** — it stays a promise. The moment you can
  ride north, Meridian stops being one street where you know everybody.
- **A second quest format** — one at a time, and the owner sees it first.
- **A quest log** — a list of undone things is a backlog; a person with something to
  tell you is an invitation. (Ironic in this file, deliberate in the game.)

---

*Detail lives in `docs/IDEAS.md` (§15 especially), `docs/CITY.md` (the ledger and the
decision log) and `docs/STORY.md` (the bible). This file is the index — if it disagrees
with those, they are right and this needs updating.*

---

## 7 · La junta 2026-09-03 — the queue the meeting produced

Full minutes and evidence: `docs/meetings/2026-09-03-la-junta.md`. Order corrected after the
session verified the critic against the code; costs are the cross-examined ones.

| # | Batch | Cost | What the owner would see |
|---|---|---|---|
| ~~A1~~ | **SHIPPED 2026-09-03 (mq-v54).** **The stairwell speaks.** `roomInvite()` asked about a portal's DESTINATION when you stand beside it | an hour or two | Walk past the stairs in HQ and the game says "Nacho and Don Güero are waiting" — the real fix for "hard knowing where to go" |
| ~~A2~~ | **SHIPPED 2026-09-03.** Door arrow stops excluding stairs (drop `DOORSET.has(ch)` in `doorMarks`) · stairs painted gold on the plan (one `MAPCOL` line) · flavour lines for the office's stairs, boxes and window | minutes | The staircase wears the same gold arrow every door has; the office stops being the only silent room |
| ~~A3~~ | **SHIPPED 2026-09-03 — and the meeting overstated it.** Only Nolasco's cabinet was misplaced; the mercado and panadería gifts were never meant to sit on boxes, and Limpieza hauling two away is the signed beat (`BACKLOG` §6) | minutes | The file cabinet becomes the box by the stairs |
| ~~A4~~ | **SHIPPED 2026-09-05.** Ventanilla deferral dated in `STORY.md`; the decor comment had been fixed 09-05 already; the ideas-log camera line and `OWNER.md`'s camera permit amended to say 3D (default since 09-01); the gifts comment in `config.js` stops claiming every gift lands on a box; `PLAYTEST.md` stops pricing wrong picks in hearts and grading the ending by them | minutes | Nothing visible; the docs stop lying to the next planner |
| ~~B~~ | **SHIPPED 2026-09-03.** **The barrio picks its tools back up:** draw the job emoji BESIDE the ❗ instead of instead of it (4 sites), widen the window, shirt tint 0.4 → 0.15 | minutes | 31 people get their trade back. **Then look before drawing anything** — this is the control experiment for the whole "tell people apart" problem |
| ~~C~~ | **SHIPPED 2026-09-03 (mq-v56).** Four-camera screenshot loop in `test/shots.js` · decor drawn in iso and 3D | an hour or two | Retires the whole class of "invisible in the camera you play in" bug |
| ~~D~~ | **SHIPPED 2026-09-03 (mq-v55).** **Readable objects**: a persistent cream marker (never ❗), a Read button, a panel — plus the old lead's laptop, EN+ES | a sitting | You walk to a machine and find out what "the assistant" actually is |
| ~~E~~ | **SHIPPED 2026-09-03 — posters at mq-v55, the settings drawers at mq-v56.** Six posters as wall glyphs delivered by ribbons · settings folded into four groups | a sitting | Tacho's signed repair order hangs itself on your office wall |
| ~~F~~ | **SHIPPED 2026-09-04 (mq-v57), struck 2026-09-05.** `worldFlags()` hands content `grade[id]` per district — 0 until you begin, never a phantom 3 — and the mural reads it through `muralGrade()`. Landed in the same commit as G and was never struck | an hour or two | The mural brightens with how well you did |
| ~~G~~ | **SHIPPED 2026-09-03 (mq-v57)** — seven tiles: Nacho's own MERIDIAN piece plus one panel per business, **baby blue** plaster until begun (the owner changed blank to baby blue), colour brightening with the grade | a sitting | The record became a room |

