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
| **S0** | El 3D y el mundo | one long | doors that stand up, sharp 3D, a real bridge, La Cocina reads as a restaurant, autumn arrives on its own |
| **S1** | **La cimentación** | one | **nothing** — and that is said out loud. The whole engine seam, paid once |
| **S2** | La oficina (`f2`) | one | the room upstairs becomes yours and starts filling |
| **S3** | Taller Herrera | one | the southeast lot opens; the first pack on the new machinery |
| **S4** | La Espiga + Velázquez | one long | *two* storefronts on Calle Dos in one sitting |
| **S5** | Nolasco Tax & Notario | one | the walkup opens; the man who reads your report |
| **S6** | La inauguración + la mañana siguiente | one | the street dressed, the mural full, the day turning over while you sleep |
| **S7** | La segunda vuelta | half | five neighbours phone *you* |

**Playtest gates:** `/playtest` after S2, S3 and S6. **S4 does not begin until the
mercado has been human-played** — nobody has played it yet, and it is the shape every
later pack copies.

---

## 1 · Blocking everything — the engine ceiling

**The roadmap promises four more businesses. The code holds two.** All verified in the
engine, all landing in **S1**, none of them naming a business.

| What | Where | Why it blocks |
|---|---|---|
| `finish()` has exactly two epilogue sets | `engine.js:1821` | a third district prints the wrong ending — the taller would play the mercado's Saturday |
| the handover doorstep is hardcoded | `engine.js:1834` | `px=fx=6;py=fy=12` is the mercado's front step, sitting in the engine |
| `GROWTH.ribbon` is singular | `engine.js:162`, `:3032` | one storefront, full stop |
| `NPCLOOK` is one flat global table | `npcs.js:14`, `engine.js:1949` | the taller's cast collides with Tovar, Chuy and Marcus — Don Tacho would wear Tovar's colours |
| `GROWTH` cannot read a grade | `engine.js:3004`, `:3031` | the taller's endings change the world (cat on the Caprice, assistant switched off) and the code has no idea how well you did |
| the report truncates at 200 entries | `engine.js:2273` | a five-district city is ~85 decision points before retries; restart never clears it. **Your earliest districts vanish from the portfolio, silently** |
| the uppercase tile alphabet is spent | `engine.js:10` | new glyphs must be digits and symbols from here |

---

## 2 · Signed, waiting on a sitting

| Item | Cost | Notes |
|---|---|---|
| **The office (`f2`)** — opens bare with the old lead's desk and a north window; the barrio furnishes it one piece per business | S2 | furniture declared in each district's own data, or the map gets re-opened five times |
| **The word is the reward** — a term enters through whoever *needs* it, in the beat after you get it right; pins to the office wall | S1 registries + content | retrofitting Week One and El Mercado is **a third of a sitting**, not free |
| **Template 06 — Process & Exception Map** | small | the taller's deliverable; not one of the existing five |
| **La sombra** — the franchise offers *you* a job; nobody's business is harmed | S6/S7 | ships as content a pack may omit entirely |
| **Spot-the-flaw** — the one new quest format | S1 | one format only, and the owner sees it before anything is mass-produced |
| ~~**Seasons** — one autumn season on a Día de Muertos palette, auto by date with an override~~ | **seam shipped 2026-09-02** | bridge only, as signed. **Palette is a draft — owner signs it off** (one line in `config.js`). Widening to jacaranda/awnings/light is the next `art()` keys |
| **`/room-design` skill** — interview a person about ONE room, produce a build-ready spec | drafted 2026-09-02 | the bridge between `game-brief` (asks about a whole game) and `game-world-expansion` (builds a place). First job: `f2`. Owner wants AJ using it, and a virtual office for the team |
| **`/role-pack` skill** — turns a role into a district: curriculum, words, quests, paper, and a coverage report | before S4 | Nacho and Don Güero proposed it independently. Built with `skill-creator`, measured against the hand-written taller |

---

## 3 · Bugs and gaps, ranked by what they cost the player

| # | Thing | Cost | Detail |
|---|---|---|---|
| 1 | ~~**3D blur** — every texture baked at 1× while the screen renders at up to 3×~~ | **shipped 2026-09-02** | S0 item 3. One factor K at every bake site, re-bakes on a DPR change; test in `smoke.js`. §15.1 |
| 2 | ~~**Doors lie flat in 3D** — 6 of 16 face the wrong way, all in HQ~~ | **shipped 2026-09-02** | S0 item 2. Doors turned to their wall, thin boxes with a lintel and a breathing floor light; walls textured on all four sides. §15.3 |
| 3 | ~~**The doorway ignores you** for ~900ms after you come through, and never re-checks~~ | **shipped 2026-09-02** | S0 item 1. A standing check with an anti-ping-pong hold; test in `smoke.js`. §15.6 |
| 4 | **La Cocina does not read as a restaurant** — a red building, an awning, two blank windows, no food cue | minutes | the mercado reads correctly *because* it has produce. §15.8 |
| 5 | **All five doors are pixel-identical** | ~1h | nothing tells you which door leads somewhere |
| 6 | **The rainbow bridge is a flat stripe** that does not span the river | a sitting | there is no bridge object in any camera. §15.4 |
| 7 | Desk reads as a cardboard box; table reads as a dartboard; the mercado scale is illegible | minutes each | §15.8 |
| 8 | **`LEVELS` saturates at 120 XP** while MAXXP is 350 → ~470 | small | you hit "AI Legend" a third of the way through Week One |
| 9 | **Error log** — 3D failure is swallowed in four places and leaves no trace | ~55 lines | designed in full. §15.5 |
| 10 | **A wall between you and the camera hides you** — stand just north of an interior wall in 3D and only your head shows | ~1h | found 2026-09-02 by the eyeball pass, pre-existing. Fade the wall, lower walls, or raise the camera — not chosen. §15.3 |

---

## 4 · Open questions for the owner

| Question | Who is waiting |
|---|---|
| **How does a district's Saturday present itself?** Deferred to /nacho; must be content-declared so a pack can choose differently | blocks S1's ending refactor |
| **Industries vs roles** — should the industry lead and the job role follow? | reframes what every pack owes |
| **The city's record to a government NPC** — separating the player's portfolio from the city's memory | new, a story surface |
| **The Día de Muertos palette** — six bridge colours in `config.js` are a draft; say yes or change them | S0 shipped the seam with them in |
| **Elevation** — walking *over* the bridge needs actors to have a height | deliberately deferred: build it when a *second* thing needs it (stairs, rooftops, the trolley platform), not for one park tile |

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
