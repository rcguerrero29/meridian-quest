# Research — the map, and questionnaires people finish — 2026-09-14

*Two outside-sourced sweeps from crew run 8, filed whole so they can be read again: the map (two
passes — the second after the limit re-ran it against the real game) and the questionnaire. Tags and
URLs as returned; `(read)` marks a source actually opened, everything else is an extract. The rule
they produced is `docs/GENRE-RULES.md` R18. The plan they fed is `docs/meetings/2026-09-14-el-mapa.md`.*

# The map research sweep, second pass (after the limit)

*Filed verbatim, 2026-09-14, from the resumed workflow.*

PRE-FLIGHT
This is my second visit on the same brief today — my first return is already in the record at `docs/meetings/2026-09-14-la-cuadrilla-run-8.md:4097-4217` (rules M1–M10, three questions, a catalogue-card panel that is not on the wall: `grep research changarrito/content/murals.js docs/crew/MURAL-LEDGER.txt` → nothing) — so I intend to read that return as my flight notes, not repeat it, and spend this visit on the two things it confessed it lacked: sources that *measured* something, and the one code fact it left unchecked (`f2: ["~c1","~c2"]`), by running the real game forward through every state it can be in and reading the engine's own nouns at each. A persona-less lens is equipped to tag evidence honestly and to measure without a stake in the answer, and it now has a prior self to check against, which `docs/crew/FLIGHT-NOTES.md` ledger row 5 says is worth more than any finding. Where I expect to fall short, named now: the proxy will refuse the measured sources exactly as it refused the opinion ones, so my "measured" column will be thin unless something opens on `raw.githubusercontent.com` or arrives as a PDF I can actually read this time; and having no trade of my own, my panel risks being a second card in a different colour rather than a different material.

THE DELIVERABLE

**0 · Sourcing this visit, and what changed since the morning.** Three pages **read whole**: the WCAG 2.5.8 *Understanding* document, the WCAG 1.4.1 *Understanding* document (both `raw.githubusercontent.com/w3c/wcag/main/understanding/…`), and **Duolingo Research Report DRR-24-04 (Jiang, Hopman, Reuveni, Kittredge, 26 April 2024, 17 pages)** — the PDF my first visit could not open; `pypdf` installed but its import died inside a broken system `cryptography`, so I shadowed that module with a one-line stub that raises `ImportError` and pypdf fell back to its own provider (61,803 characters extracted; text at `scratchpad/research-map-duolingo-text.txt`). **Nine hosts refused** this visit (androidcentral, gameaccessibilityguidelines, blog.duolingo, dl.acm.org, book.leveldesignbook, gmtk.substack, sciendo, arxiv, biorxiv). About twenty search extracts. Everything `[WEB]` below is `(extract)` unless marked `(read)`.

**1 · What the code does — `[CODE]`, grepped this hour, and one measurement nobody had made.**

- The map: `drawTown()` `engine/engine.js:4751-4770` (tiles from `BASECOL`+`MAPCOL` at `s=10`; `TOWNLBL` gated by `when(flags)` :4761-4764; fixed legend `600 8px` :4765-4766; one dot from `MAPDOT` :4767-4770); `openMap()` :4772-4776; `#mapbtn` :4778 / `index.html:438`; `#mapov` `index.html:625-632`; `openTravel()` :4780-4796. `worldFlags()` :4741-4750. Meridian's tables: `MAPCOL` `content/meridian/maps.js:253`, `TOWNLBL` :260-270, `MAPDOT` :274. The town: `MAPDOT` only, nine entries for eight tiles (`changarrito/content/maps.js:170`), no `TOWNLBL`.
- The state: `qOpen` :415 (open by chapter, no order inside one), `AQ` :477, `worldPending` :510 with the comment at :506-509 (*"Never a count, never an age (docs/OWNER.md…)"*), `setWorldTag` :511, `pendingAt` :608, `hasSay` :611 — three clauses: an open quest, `roomPending` (:229, the office interview's hosts from `RM().hosts`, :222-227), or `!!(n&&n.doc)`. The in-world ❗ is `700 13px` gold at :769, driven by `hasSay`.
- **The unchecked item from the morning, closed:** `~c1`/`~c2` are the two **room hosts** upstairs (`roomHosts`, :222-229), pending because the office interview's steps are unanswered (`roomAns`) — not documents. **No person in Meridian carries `doc:`** (`grep -c doc content/meridian/npcs.js` → 0; the `doc:` hits are on *quests* — `quests.es.js:183,233,330,406,465,593` — and on readable objects — `art.js:456`, `docs.js:31`). So `hasSay`'s third clause never fires in Meridian today. **In the town it fires on people**: `changarrito/content/maps.js:178-179` (`an:{r:{npc:"remedios",q:[],chat:1,` · `mo:{b:{npc:"beto",q:[],chat:1,doc:`), and the record hangs a `doc` on every issue-person (`docs/POSTMORTEM.md` §13m, grep `n.doc=this.doc(i)`). That is the RULE/CHOICE seam for this whole job — see M1.
- **Real game measured, every state (mock order 2):** `scratchpad/research-map-progression.js` sets `done` to the quests of chapters `< k`, `chSeen=k`, `applyGrowth()`, then reads `worldPending` for every world, `hasSay` on the street, and counts marks anchored per world through `MAPDOT` plus per person on the street. JSON at `research-map-progression.json`; the picture, painted by the real `drawTown()` with a disc stamped per pending anchor, is `research-map-C-progression-strip.png` (eight plans, two columns).

| state | `chSeen` | done | open, not done | pending worlds | marks a presence-only plan carries |
|---|---|---|---|---|---|
| fresh save | 0 | 0 | 16 | hq f2 st lo lc | **4** — [14,0] (hq **and** f2), [21,5] lo, [6,5] lc, + one person on the street |
| ch 1 done | 1 | 16 | 8 | f2 me | **2** |
| ch 2 done | 2 | 24 | 8 | f2 ta | **2** |
| ch 3 done | 3 | 32 | 8 | f2 pa | **2** — pa's anchor is [29,1], the "CALLE DOS →" doorway |
| ch 4 done | 4 | 40 | 8 | f2 li | **2** — same tile [29,1] |
| ch 5 done | 5 | 48 | 8 | f2 no | **2** — [25,0], under the "NOTARIO ⇧" label |
| ch 6 done | 6 | 56 | 0 | f2 | **1** — the office interview, until its steps are answered |
| everything done | 6 | 56 | 0 | f2 | **1** |

**Two things fall out of that table and neither was in anybody's return this run.** (a) The 2026-09-03 junta deferred map pins because *"a mark on every place with open work is ten gold marks on one small map"* (`docs/meetings/2026-09-03-la-junta.md:162`). Measured across every state Meridian can be in: **never more than four, and from chapter one onward exactly two — the office and one door.** (b) **From chapter one on there is exactly one district with anything open.** Meridian's content is already a path at district granularity (`qOpen` opens by chapter, `CHAPTERS` `content/meridian/config.js:216`), so "find the next quest" needs no ranking, no pulse and no list: **presence and next are the same picture** here, and the one door lit *is* the answer. The two marks that share a tile ([14,0] hq/f2; [29,1] pa/li/ex — Tavo's 2.2 at run-8.md:465-473, Rosa's finding 2 at :799) and the two that land on labels (NOTARIO, CALLE DOS; plus the morning's HQ and MERCADO) are content faults in `MAPDOT`/`TOWNLBL`, not engine ones.

- **Re-measured at a 390-px phone (mock order 1, `research-map-A-fresh-390.png`, `-B-ch1done-390.png`, `-B-phone-390.png`):** backing 300×174 (30×16 tiles at 10 px + 14 for the legend) displayed at 281.8×163.4 CSS → **9.39 CSS px per tile**; the you-are-here dot 9.4 CSS px across; labels 7.5–9.4 CSS px; 11 people pending and 16 open quests on a fresh save.

**2 · The sweep — what measured something, first; design intent second.**

*Measured.*
- **Duolingo DRR-24-04 `(read)`** https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_write_speak_2024.pdf — *"In the tree design, learners could choose which content to complete next. In the linear path, learners complete content in the order it is presented. Based on internal research showing that learners were not always sure how to navigate the tree, this change was made to clarify to learners what they should do next."* Spanish course, STAMP 4S: reading tree 4.30 (SD 1.34) → path 6.90 (1.17), +2.60 (two sublevels); listening 2.80 (1.54) → 5.77 (1.49), +2.97. **The paper's own caveats:** *"participants took a significantly longer time to reach the end of the A2 content in the path compared to the tree"*, and *"due to the use of different tests in the tree and path studies"* the comparison is called *tentative*. Vendor research, N not quoted here because I did not extract the sample table.
- **Navigation assistance in 3D games, CHI PLAY 2017 (extract)** https://dl.acm.org/doi/10.1145/3116595.3116602 — two online studies; assistance (mini-map, markers, glowing trails) improved training performance and *"no harmful effect of assistance on performance after it was removed, even when comparing… glowing trails… and… no assistance."* **IJHCS 2023, Johanson et al., "Trails, rails, and over-reliance" (extract)** https://www.sciencedirect.com/science/article/abs/pii/S1071581923001064 — study 1 no difference with the assist off; study 2 a reduction *"much smaller than the improvement provided during training"*; *"even when the navigation assist was extreme (e.g., pressing a button to be automatically taken in the correct direction), participants were still able to navigate the trained routes."* **This reverses the trap I wrote under M8 this morning** — see M8.
- **Piątek & Gołębiowska 2022, Polish Cartographical Review (extract)** https://reference-global.com/article/10.2478/pcr-2022-0003 — n = 127; navigation-app users use maps *without* legends (not shown by default) and *"only intuitive symbols are read correctly."*
- **Levine 1982, "You-Are-Here Maps: Psychological Considerations" (extract)** https://www.semanticscholar.org/paper/You-Are-Here-Maps-Levine/825db54811d7f1bee6f56d598c7e395d76d12231 — a YAH map must be *aligned* (forward-up); misaligned maps cost time and produce errors; the **Two-Point Theorem**: to orient you need your own position plus two known points. `[TRAINING]` for the theorem's name; the extract carries it.
- **WCAG 2.5.8 Understanding `(read)`** https://raw.githubusercontent.com/w3c/wcag/main/understanding/22/target-size-minimum.html — intent: *"targets can be easily activated without accidentally activating an adjacent target"*; and the sentence that matters for a plan: *"In digital maps, the position of pins is analogous to the position of places shown on the map. If there are many pins close together, the spacing between pins and neighboring pins will often be below 24 CSS pixels. It is essential to show the pins at the correct map location, therefore the Essential exception applies."* — **spacing is exempt for pins; size is not.**
- **WCAG 1.4.1 Understanding `(read)`** https://raw.githubusercontent.com/w3c/wcag/main/understanding/20/use-of-color.html — *"Color is not used as the only visual means of conveying information."* Prevalence, `[WEB]` (extract, Colour Blind Awareness) https://www.colourblindawareness.org/colour-blindness/ — about 1 in 12 men, 1 in 200 women.
- **Valve (extract)** https://www.jeizzon.com/writings/playtesting-like-valve — 100+ playtesters per Half-Life 2 level; supply caches as *one-directional* guidance. Method, not a result.
- **Eye-tracking (extract, weak)** https://tryevidence.com/blog/eye-tracking-and-video-games-research/ — an unnamed stealth-game study with *"nearly 50%"* of attention in the minimap–centre corridor. Unverifiable from here; cited only for the shape of the risk.

*Design intent (none measured).* WoW: gold `!` available, gold `?` complete, silver `?` in progress https://wowpedia.fandom.com/wiki/Quest_giver. BotW: Nintendo first placed towers with events between and *"players felt they were being guided… too linear"*; the triangle rule replaced it https://www.nintendolife.com/news/2017/10/zelda_breath_of_the_wilds_ingenious_design_is_all_about_triangles_apparently; undiscovered regions as a textured grid, revealed per tower, 100 unlabelled stamps https://stamen.com/cartographers-play-video-games-a-review-of-the-map-in-the-legend-of-zelda-breath-of-the-wild/. Tsushima: no waypoints or minimap, *"lost in nature, not in menus"*, the wind working in about a week https://www.androidcentral.com/ghost-tsushima-creative-director-interview. Elden Ring: Guidance of Grace is a *direction*, not a destination, and there is no quest log by design https://gamerant.com/elden-ring-how-track-quests/. AC Odyssey Exploration mode: region plus bearing https://www.pcgamer.com/assassins-creed-odysseys-exploration-mode-culls-the-map-markers/. Firewatch: the "You Are Here" dot can be switched off; no markers, no lit path https://www.gamedeveloper.com/design/how-firewatch-s-ui-enhances-player-immersion. Genshin: teleport only to waypoints you have walked to — and the named cost that once unlocked *"there is little reason to explore… by foot"* https://www.kellielu.com/blog/redesigning-genshin-impacts-open-world-exploration-waypoints-amp-currency. Candy Crush: one linear path of pins https://candycrush.fandom.com/wiki/Map. Weenies — Disney's landmark, Journey's mountain always in view https://www.gamedeveloper.com/design/what-mario-learned-from-mickey-mouse---part-3-decision-making-and-weenies. Fog: *static* (revealed stays revealed) vs *dynamic* https://www.designthegame.com/learning/tutorial/the-art-science-fog-war-systems-video-games. TLOU2: high-contrast mode paints important objects yellow; Navigation Assistance https://www.naughtydog.com/blog/the_last_of_us_part_ii_accessibility_features_detailed.

**3 · The ten rules — M1–M10 as filed this morning (run-8.md:4127-4142), each marked UNCHANGED / REVISED, with what this visit adds. Trap and A3 line on every one.**

**M1 · The mark on the plan is the mark in the world, one meaning: somebody here has something to say. — REVISED in its seam.** `[CODE]` :510-511, :611, :769. The *predicate* is the engine's; **which of `hasSay`'s three clauses a plan counts is the pack's** — in Meridian the `doc` clause never fires (0 people carry one); in the town it fires on every person (`changarrito/content/maps.js:178-179`, §13m), so a behaviour-identical engine rule would light every district of the town permanently. A pack that declares nothing draws no marks and is byte-identical. **Measured bound:** 4 / 2 / 2 / 2 / 2 / 2 / 1 across Meridian's whole life. **Trap:** WoW's second glyph for "done" — nobody here carries done (`docs/OWNER.md:141-145`). **A3:** presence is the present; the first mark that says "later" is the list.

**M2 · Never a count, colour or age — on the mark, the button, the district. — UNCHANGED**, now with WCAG 1.4.1 `(read)` and 1-in-12 behind it. `[CODE]` :506-509; `worldFlags` hands the plan `grade` (:4741-4750) and its own comment warns *not begun is not done well* (R16's tell). **Trap:** colour-by-state arrives as a one-line improvement. **A3:** a count is a list with the names removed.

**M3 · "Next" is a place the content already ordered, never a rank the map invents. — REVISED by the measurement.** Meridian *has* an order at district level — one district open at a time from chapter one — so presence gives "next" for free; the `path`/`open` seam I proposed this morning is only needed *inside* a district, where `qOpen` has no order. Duolingo `(read)` is the evidence that a single visible next removes *"not sure what to do next"*, with its own caveat that the path took longer and was scored on a different test. **Trap:** manufacturing an order inside a district so something can pulse — a to-do list with a heartbeat. **A3:** the one lit door is the present; "and then the bakery" is the future and may not be drawn.

**M4 · Fog the place, never the person; static, never re-hidden. — UNCHANGED.** `TOWNLBL.when` already does it ("LOT: EL MERCADO" → "EL MERCADO ROBLES", `maps.js:265-266`); R11. **Trap:** dynamic fog, or hiding a ❗ inside an unopened district (a `chat:1` host with a `doc` *can* be pending there — the town case). **A3:** "LOT" is what the parcel is; "COMING: TALLER" is the future.

**M5 · No legend on a phone; the mark is its own legend and a tap names the place. — UNCHANGED**, plus Levine's two points: the dot and one named landmark are the minimum for a person to orient, so the tap-name is not decoration. `[CODE]` today's legend renders at 7.5 CSS px (:4765-4766). **Trap:** replacing a legend with a longer one. **A3:** none.

**M6 · A target is a place, not a tile: each mark ≥ 24×24 CSS px; spacing between marks may be tighter, because the standard exempts map pins for position, not for size. — REVISED by WCAG 2.5.8 `(read)`.** `[CODE]` 9.39 CSS px per tile; two anchors are shared by several worlds ([14,0], [29,1]), so one target must open a two-line chooser or the pack must split the anchor (content). **Trap:** hit-testing the grid; leaning on the "essential" exception to ship 9-px marks. **A3:** none.

**M7 · Tap-to-travel drives the real path and only to places you have walked. — UNCHANGED**, Genshin's convention added with its cost named. `[CODE]` the same `rideCan()&&rideStart(d)` / `worldArrived` as :4780-4796; `TRV` two stops (`maps.js:288`); never train→floor (`maps.js:276-278`). **Trap:** a second travel path (REGRESSION §3 #12). **A3:** a tap on a place is present tense; a "go to next" button is a list of one.

**M8 · The plan lives behind a button and never in a corner; the world guides first. — REVISED, and it is a reversal.** This morning I wrote the trap as *"the GPS effect"* — a plan good enough to be opened first. The two measured studies say that cost is small or absent; what the eye-tracking extract and Far Cry's own reasoning point at is **attention**, not memory: a corner minimap takes the eyes off the street, a modal plan cannot. `#mapov` is `hidden` until `openMap()` (`index.html:625`) — the shipped shape is already the right one. **Trap:** the opposite failure, which is today's: a plan with nothing on it. **A3:** a plan opened *first* every session behaves like a checklist; behaviour is what A3 is about.

**M9 · Say the place, not the route — and only a place you can reach. — UNCHANGED.** `[CODE]` a wanderer walls 35 tiles one run in twenty-five (`docs/BACKLOG.md:226`, REGRESSION R11). **Trap:** naming a place the player cannot walk to now. **A3:** none.

**M10 · Labels and marks are laid out together; nothing covers the you-are-here; one anchor, one world. — UNCHANGED**, two more collisions measured: the `no` mark sits under "NOTARIO ⇧" (`MAPDOT.no [25,0]` vs `TOWNLBL` x 25.5, y 0.75) and `pa`/`li` marks land on "CALLE DOS →". **Trap:** `TOWNLBL.y` is a baseline and `MAPDOT.y` a row — two meanings of `y` in one file (`maps.js:260-274`). **A3:** none.

QUESTIONS FOR THE OWNER
1. **You said "find the next quest". Measured, from chapter one on there is only ever ONE door with anything behind it. Is the one lit door the whole answer, or do you want more than that?** *For more:* your words (`docs/ASKS.md:250`), Rosa's finding 1 this run — a list under the plan naming El Mercado *with a count* (run-8.md:787-797) — and Duolingo `(read)`: a single visible next removed "not sure what to do next" and scored higher (on a different test, taking longer). *Against:* `docs/OWNER.md:144` *never build a quest log… the ❗ carries no count, colour or age*; the 2026-09-03 junta (`la-junta.md:162`); Tavo's 2.4–2.5 (run-8.md:494-519, no list, no next); and the measurement itself — a list would have one row, and a count would say "1". I would build presence only. Your call, and Rosa and Tavo disagree, so it is not mine to average.
2. **The town.** The same engine rule, applied identically, lights every district of El Changarrito for ever — its people carry documents and every issue is a person (`changarrito/content/maps.js:178-179`, §13m). *Side A:* a RULE is behaviour-identical, and Rosa's finding 6 (run-8.md:847-857) says the town's map wants *counts of open and taken per district* — the board's language. *Side B:* the mark means "somebody has something to say", which in the town is everybody always, so it says nothing; the town should declare which clauses count, or declare no marks. Which: a pack seam, or the town opts out?
3. **Two still open from the morning** (run-8.md:4143-4146), restated because you have not answered them: does the map *button* carry a dot (present-tense, no number) or nothing; and is tap-to-travel trolley-stops-only (your 2026-09-03 *"i dont like that i go from a train to a floor"*, `maps.js:276-278`) with the plan naming the nearest stop for everything else?

WHAT I DID NOT CHECK
- The town's plan was not rendered with real issues (it boots to its creator and its people come from GitHub); "every district lights for ever" is read off `hasSay` and `maps.js:178-179`, not measured.
- Nobody cold-read the discs on the strip; "legible" is my eye (§13j). Landscape not shot (§13o).
- The Duolingo table for French and the sample sizes were not extracted; Figure 1 (the two home screens) was not seen — text only.
- The "nearly 50% of attention on the minimap" figure is an unnamed study in a blog extract.
- That the office mark clears when the interview is answered is read off `roomPending` (:229), not played.
- I did not run `test/smoke.js` or `test/town.smoke.js`; nothing I did touches the tree. The `cryptography` stub was on `PYTHONPATH` for one process and only affects encrypted PDFs; this one is not.
- CHI PLAY 2017 and IJHCS 2023 are extracts; their designs are 3D corridor tasks, not a town plan opened from a menu — transfer is my inference.

POST-FLIGHT
Having a prior self to check got the only new thing this run: the morning's return had written *"I did not find out what those two are"* under its unchecked list, and going back for them is what turned into running the whole game forward and finding that the junta's ten marks are never more than four — the moment was the JSON coming back with `f2` pending in all eight rows for the same two names. Where the lens got in the way: it has no trade, so my first draft of the rules this morning was a catalogue of what games *do*, and it took a second visit and a stubbed Python module before a single measured source with numbers sat behind any of them; and it was silent on the town until I asked whether `hasSay`'s third clause had ever fired anywhere, which is the question a builder would have asked first. The gap I predicted appeared in half: nine hosts refused, but the two that opened — a standards body's source tree and a PDF read by shadowing a broken library — were the two that mattered, and the panel risk I named did not appear, because an orienteering sheet is a different object from a card and not a recoloured one. Persona edit: there is no `.claude/agents/research-map.md`; if the calling session ever creates one, the EXACT TEXT for its first line under the shared block is — *"You have a prior self on every run: find your last return before you read the web, and go first to the line under its WHAT I DID NOT CHECK; the measurement that closes it is usually the one nobody else made."* — otherwise none.

MURAL PANEL
```
id:     research-map-una-sola-puerta
by:     "research-map"
title:  {en:"One door only", es:"Una sola puerta"}
said:   {en:"The junta feared ten marks on one small plan. I ran every state the game can be in: four on the first morning, two from then on, one at the end. There is no next to rank — there is one lit door.",
         es:"La junta temió diez marcas en un plano chico. Corrí cada estado en que el juego puede estar: cuatro la primera mañana, dos desde entonces, una al final. No hay siguiente que ordenar — hay una sola puerta encendida."}
state:  {en:"Holding that in this game presence already is 'next' — one district open at a time, by the chapter's own hand — and that a rank, a colour or a count would invent a choice the content never offers.",
         es:"Sostengo que en este juego la presencia ya es el 'siguiente' — un distrito abierto a la vez, por mano del propio capítulo — y que un orden, un color o una cuenta inventarían una elección que el contenido nunca ofrece."}
who:    {en:"research-map, a lens with no persona, back the same day with a count instead of a catalogue",
         es:"research-map, un lente sin persona, de vuelta el mismo día con una cuenta en vez de un catálogo"}
cap:    {en:"My first visit this morning filed the genre's colours on a card and left one thing unchecked: two names pending upstairs that I could not explain. Going back for them meant running the whole game forward, chapter by chapter, and reading the engine's own word for somebody-here-has-something-to-say at every step. The two names were the office interview, not a document, and the count that fell out answered a fear the junta wrote down eleven days ago.",
         es:"Mi primera visita esta mañana fichó los colores del género en una tarjeta y dejó una cosa sin revisar: dos nombres pendientes arriba que no supe explicar. Volver por ellos fue correr el juego entero hacia adelante, capítulo por capítulo, leyendo a cada paso la propia palabra del motor para alguien-aquí-tiene-algo-que-decir. Los dos nombres eran la entrevista de la oficina, no un documento, y la cuenta que salió respondió un miedo que la junta dejó escrito hace once días."}
aspect: 0.46
art:    (g,W,H)=>{murGround(g,W,H);
  /* RESEARCH-MAP'S HAND, SECOND VISIT — an orienteering map. My first card was a library card;
     this is the other paper my trade reads: an ISOM sheet, where yellow is open ground, white is
     runnable forest, brown is the contour, grey is pavement, black is a building, and the course
     is overprinted in magenta. A score course marks WHERE the controls are, in no order, with no
     numbers — you go to any, the sheet never tells you which. Punched controls are the past. */
  const O={yellow:"#F3CB5C",white:"#FBFAF4",green:"#7DBF6C",brown:"#B5702C",blue:"#8CBDE0",grey:"#C2C2BE",
           black:"#232323",mag:"#E10098",ink:"#2A2A2A"};
  const mw=W*0.66, mh=H*0.80, mx=W*0.03, my=H*0.05;
  g.save(); g.translate(mx+mw/2,my+mh/2); g.rotate(-0.018); g.translate(-mw/2,-mh/2);
  g.fillStyle="rgba(30,25,20,0.22)"; g.fillRect(4,5,mw,mh);                     /* the sheet's shadow */
  g.fillStyle=O.white; g.fillRect(0,0,mw,mh);                                    /* runnable forest */
  g.save(); g.beginPath(); g.rect(0,0,mw,mh); g.clip();
  g.fillStyle=O.yellow;                                                          /* open ground */
  g.beginPath(); g.moveTo(0,mh*0.55); g.bezierCurveTo(mw*0.2,mh*0.35,mw*0.45,mh*0.75,mw*0.7,mh*0.5);
  g.bezierCurveTo(mw*0.85,mh*0.35,mw*0.95,mh*0.7,mw,mh*0.6); g.lineTo(mw,mh); g.lineTo(0,mh); g.closePath(); g.fill();
  g.fillStyle=O.green;                                                           /* a thicket */
  g.beginPath(); g.ellipse(mw*0.84,mh*0.22,mw*0.11,mh*0.13,0.3,0,7); g.fill();
  g.fillStyle=O.blue;                                                            /* the pond */
  g.beginPath(); g.ellipse(mw*0.5,mh*0.86,mw*0.09,mh*0.06,0,0,7); g.fill();
  g.strokeStyle=O.brown; g.lineWidth=1;                                          /* contours */
  for(let i=0;i<5;i++){const yy=mh*(0.12+i*0.16); g.beginPath(); g.moveTo(0,yy);
    g.bezierCurveTo(mw*0.25,yy-mh*0.1,mw*0.5,yy+mh*0.12,mw*0.75,yy-mh*0.06); g.bezierCurveTo(mw*0.85,yy-mh*0.1,mw*0.95,yy+mh*0.02,mw,yy-mh*0.02); g.stroke();}
  g.fillStyle=O.grey; g.fillRect(0,mh*0.40,mw,mh*0.12);                          /* the street, paved */
  g.fillStyle=O.black;                                                           /* the buildings */
  const B=[[0.10,0.20,0.20,0.20],[0.40,0.16,0.14,0.24],[0.62,0.24,0.10,0.16],[0.08,0.58,0.16,0.16],[0.32,0.60,0.12,0.14],[0.70,0.58,0.18,0.18]];
  B.forEach(b=>g.fillRect(mw*b[0],mh*b[1],mw*b[2],mh*b[3]));
  g.restore();
  /* the course overprint: a start triangle at HQ, five punched circles (the past), ONE live circle */
  g.strokeStyle=O.mag; g.lineWidth=2.2; g.lineJoin="round";
  const tri=(x,y,r)=>{g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*0.87,y+r*0.5);g.lineTo(x-r*0.87,y+r*0.5);g.closePath();g.stroke();};
  tri(mw*0.47,mh*0.28,10);
  const punched=[[0.20,0.30],[0.67,0.32],[0.16,0.66],[0.38,0.67],[0.79,0.67]];
  punched.forEach(([x,y])=>{const cx=mw*x,cy=mh*y; g.save(); g.setLineDash([3,3]); g.globalAlpha=.55;
    g.beginPath(); g.arc(cx,cy,10,0,7); g.stroke(); g.restore();
    g.fillStyle=O.mag; g.globalAlpha=.55; [[-3,-2],[0,-4],[3,-2],[-2,2],[2,2],[0,0]].forEach(([dx,dy])=>{g.beginPath();g.arc(cx+dx,cy+dy,1,0,7);g.fill();}); g.globalAlpha=1;});
  const live=[mw*0.79,mh*0.67];                                                  /* the one lit door, solid over its punched twin */
  g.beginPath(); g.arc(live[0],live[1],11,0,7); g.stroke();
  g.fillStyle=O.white; g.beginPath(); g.arc(live[0],live[1],9,0,7); g.fill();
  g.fillStyle=O.black; g.fillRect(mw*0.70,mh*0.58,mw*0.18,mh*0.18);                /* the building back on top */
  g.strokeStyle=O.mag; g.lineWidth=2.6; g.beginPath(); g.arc(live[0],live[1],11,0,7); g.stroke();
  g.fillStyle=O.mag; g.font="bold 11px ui-monospace,monospace"; g.textAlign="left";
  g.fillText("SCORE-O",6,mh-6); g.textAlign="right"; g.fillText("no numbers",mw-6,mh-6);
  g.restore();
  /* the control-description card, at the right: seven states of the real game, tallied as circles */
  const cx=W*0.72, cy=H*0.06, cw=W*0.26, ch=H*0.78;
  g.fillStyle="rgba(30,25,20,0.18)"; g.fillRect(cx+3,cy+4,cw,ch);
  g.fillStyle=O.white; g.fillRect(cx,cy,cw,ch); g.strokeStyle=O.ink; g.lineWidth=1; g.strokeRect(cx+.5,cy+.5,cw-1,ch-1);
  g.fillStyle=O.ink; g.font="bold 11px ui-monospace,monospace"; g.textAlign="left";
  g.fillText("controls out",cx+6,cy+13);
  g.strokeStyle=O.ink; g.beginPath(); g.moveTo(cx,cy+17.5); g.lineTo(cx+cw,cy+17.5); g.stroke();
  const rows=[["start",4],["ch 1",2],["ch 2",2],["ch 3",2],["ch 4",2],["ch 5",2],["end",1]];
  const rh=(ch-42)/rows.length;
  rows.forEach((r,i)=>{const y=cy+22+i*rh; g.fillStyle=O.ink; g.font="11px ui-monospace,monospace"; g.fillText(r[0],cx+6,y+rh*0.62);
    g.strokeStyle=O.mag; g.lineWidth=1.6; for(let k=0;k<r[1];k++){g.beginPath(); g.arc(cx+cw*0.48+k*11,y+rh*0.5,4,0,7); g.stroke();}
    g.strokeStyle="rgba(42,42,42,.25)"; g.lineWidth=1; g.beginPath(); g.moveTo(cx,y+rh+.5); g.lineTo(cx+cw,y+rh+.5); g.stroke();});
  g.strokeStyle=O.ink; g.lineWidth=1; g.beginPath(); g.moveTo(cx,cy+ch-18.5); g.lineTo(cx+cw,cy+ch-18.5); g.stroke();
  g.fillStyle=O.mag; g.font="bold 12px ui-monospace,monospace"; g.textAlign="right";
  g.fillText("never ten",cx+cw-6,cy+ch-5); g.textAlign="left";}
```
Material: an ISOM orienteering sheet — open-ground yellow `#F3CB5C`, forest white `#FBFAF4`, contour brown `#B5702C`, pavement grey `#C2C2BE`, building black `#232323`, overprint magenta `#E10098` — `MURPAL` used for the ground only; `murKey` folds `by:"research-map"` to one bay exactly as `don-guero` (`changarrito/content/murals.js:1959-1961`). Rendered through the wall's own helpers at 412×190, bottom 6% clear (mock order: canvas drawing, and I say so): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/research-map-panel2.png`; the strip that the tally comes from is `research-map-C-progression-strip.png` beside it. This differs from the morning's *La ficha sin color* (run-8.md:4160-4216, not yet painted) in material (a map sheet, not a card), in subject (a count, not a catalogue) and in the state it holds; if the wall takes one panel per painter per iteration, paint this one — it carries a measurement, the other carried a filing.


---

# The questionnaire research sweep (research-form)

*Filed verbatim, 2026-09-14, from the resumed workflow.*

PRE-FLIGHT — I intend to work this as a sweep against a page that already exists: read the thirteen returns already in run 8 for what they claim about the form, pull the survey-methodology primaries on paging, progress, open-ends, forced response, length and tone, and land each rule as a confirm-or-contradict with a line on the built page rather than as advice in the air. I am a research lens with no persona file and web access the named crew lacks (`docs/SOURCES.md`, "What the crew can actually reach"), so what I am equipped for is exactly the `[WEB]` half nobody else on this run can produce. Where I expect to fall short: the proxy blocked ~100 primaries on the last sweep and only GitHub opened, so I expect every `[WEB]` claim below to be a search extract and not a page read, and I expect to be unable to answer "over time" questions (does she come back in three days) with anything but design-for-the-worst.

THE DELIVERABLE

**Sourcing, first, because it governs everything.** Sixteen fetches to fifteen hosts were refused by the egress proxy (openaccess.city.ac.uk, psc.isr.umich.edu, papers.ssrn.com, surveymonkey.com, pewresearch.org, dl.acm.org, verstaresearch.com, soundrocket.com, soominkim.github.io, scb.se, measuringu.com, surveypractice.org, surveyinsights.org, lirias.kuleuven.be, arxiv.org). **Every `[WEB]` claim below reached me as a search-result extract. None is a page read.** Numbers are as the search tool returned them and must be re-verified before anything leaves this repo (`docs/SOURCES.md` rule 4). `[CODE]` claims are grepped tonight; the page itself is the calling session's build at `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/aj-questionnaire.html` (not in the repo; cited as `page:line`).

**Three measurements of my own, real browser, not mocks:**
- `[MEASURED]` `localStorage` **throws** under Playwright `setContent` (origin `null`, `about:blank`: *"SecurityError: Failed to read the 'localStorage' property"*) and **works** under `file://`. `docs/mocks/2026-09-14-la-sobremesa/journey/render2.js:96` loads the questionnaire with `setContent`, so **both published questionnaire screenshots in the repo (`j-questionnaire-intro…png`, `j-questionnaire-q1…png`) show the gold "This browser is not remembering" state — a harness artefact, not the page.** The manifest's order line ("the published page, untouched (fonts fell back: no network)") does not say so. Any UI review of those two pictures is reviewing the failure state.
- `[CODE]` the bar is by step, not by answers: `page:161` `f=(state.step+0.5)/n` — a constant indicator with a sliver on card one; `page:164` the count `done+" of "+n+" answered"` counts up. Both are the right shape (below).
- `[CODE]` Next is greyed until answered: `page:208` `next.disabled=!q.optional&&!answered(q)`, `page:57` `[disabled]{opacity:.45}`; the Skip exists (`page:211`) but its sentence *"Skip — that's an answer too"* is a `title=` attribute — a tooltip, invisible on a phone.

**The eight rules, each with its trap.**

**F1 · One question per screen buys place-keeping, not completion.** `[WEB]` Paging vs scrolling on desktop: ~21,000 students, no difference in response, completion or breakoff (Peytchev, Couper, McCabe & Crawford 2006, https://www.researchgate.net/publication/237377880_Web_Survey_Design_Paging_Versus_Scrolling ; SurveyMonkey's own summary agrees, https://www.surveymonkey.com/curiosity/pros-cons-of-scrolling-and-multiple-pages-in-surveys/). On mobile, scrolling was *faster*, had fewer technical problems and higher ratings, breakoff lower but not significantly (Mavletova & Couper 2014, https://academic.oup.com/jssam/article/2/4/498/2937094 ; Versta's reading, https://verstaresearch.com/blog/scrolling-vs-paging-on-mobile-surveys/). So the honest reason for one-per-screen here is Rosa's measured one, not a completion rate: a textarea opening mid-scroll moves her place (`docs/meetings/2026-09-14-la-cuadrilla-run-8.md:712-714`). **Trap:** paging charges a tap and a Next per question; if a screen *also* scrolls to reach Next you pay both prices — Rosa measured Q1 at 643 px in a 627 px pane at 360×780 (`run-8.md:712`). Rule: a question screen fits at 360×780 or its option list is cut.

**F2 · A progress bar does not keep her; the *speed* of it can lose her.** `[WEB]` Villar, Callegaro & Yang 2013, 32 randomized experiments: a constant indicator does not significantly reduce drop-off; fast-to-slow reduced it, slow-to-fast increased it (https://journals.sagepub.com/doi/10.1177/0894439313497468). Conrad, Couper, Tourangeau & Peytchev 2010: 3,179 starts, 14.4% breakoff, *"knowledge can cut both ways"* (https://pubmed.ncbi.nlm.nih.gov/20676386/). Liu & Wronski 2018, 25,080 real surveys: surveys *without* a bar completed more often (observational, confounded with length; https://journals.sagepub.com/doi/10.1177/0894439317695581). The page's bar (`page:161`) is per-question-constant with the typed questions last, which is fast-to-slow in effort-time — the good kind — and the count (`page:164`) counts up, which is R15 applied to our own form. **Trap:** any change that makes the bar move by *answered* instead of *seen* turns five skips into a bar stuck at zero on screen six — slow-to-fast by accident. Recommendation: keep the count, keep the bar only while it is by step; if in doubt drop the bar and keep "3 of 13 answered".

**F3 · The comment box beside a closed question is the one feature in this brief the evidence says raises breakoff — so it stays folded, optional, small, and never first.** `[WEB]` Hadler 2025, between-subjects: embedding open-ended probes → *higher survey breakoff, more backtracking and answer changes*, and no effect on how the closed questions were answered (https://journals.sagepub.com/doi/10.1177/00491241231176846). Peytchev 2009: open-ended and long questions → more breakoffs (https://academic.oup.com/poq/article-abstract/73/1/74/1868871). OzCHI 2023: withdrawal highest when open-ends come *first* (https://dl.acm.org/doi/10.1145/3638380.3638419). Pew 2021: open-end item nonresponse 3%–50%+ by question (https://www.pewresearch.org/decoded/2021/10/14/why-do-some-open-ended-survey-questions-result-in-higher-item-nonresponse-rates-than-others/). Behr et al. 2014: an oversized box draws the wrong kind of answer — size the box to the answer wanted (https://ucrisportal.univie.ac.at/en/publications/cognitive-probes-in-web-surveys-on-the-effect-of-different-text-b/). `[CODE]` the page does all of it: `+ Add a note` collapsed (`page:219-221`), labelled "Say more (optional)" (`page:215`), `minHeight 72px` (`page:216`), Q1 is a `multi` with the note shut. **Trap:** the open-field load is 3 typed questions (`plate`, `dish`, `else`; `page:100,103,115`) plus 13 optional notes; the vendor line is completion falls after >3 open-text questions (Qualtrics, vendor extract, https://www.qualtrics.com/articles/strategy-research/4-tips-for-preventing-drop-offs-in-surveys/). Hold typed questions at three; the free-text one stays last (`else` is #13, optional — correct).

**F4 · Never grey the way forward.** `[WEB]` Forced response raises dropout and reactance (Stieger, Reips & Voracek 2007, https://www.researchgate.net/publication/224008095_Forced-response_in_online_surveys_Bias_from_reactance_and_an_increase_in_sex-specific_dropout ; Décieux et al. 2015, https://www.researchgate.net/publication/283896520_Implementation_of_the_forced_answering_option_within_online_surveys_Do_higher_item_response_rates_come_at_the_expense_of_participation_and_answer_quality ; MeasuringU's summary, https://measuringu.com/requiring-responses/). `[CODE]` the page is not forced — Skip exists — but the primary is at 45% on every fresh screen (`page:57`, `:208`) and the small button is the way past. Rule: Next always live; pressing it on a blank records a blank (Nacho's "a blank is an answer too", `run-8.md:34`); one button, not two. **Trap:** the sentence that makes Skip humane is in `skip.title` (`page:211`) — no phone shows a tooltip. Put it in the button or drop the button.

**F5 · State the length as a true count, on the cover.** `[WEB]` Galesic & Bosnjak 2009: stated 10/20/30 min → 75/65/62% started, 68/57/47% completed (https://academic.oup.com/poq/article-abstract/73/2/349/1939196). SurveyMonkey: 10 questions ≈ 89% completion, 40 ≈ 79%; abandonment climbs past ~7–8 minutes; ~5 min for 10 questions (vendor, https://www.surveymonkey.com/curiosity/survey_completion_times/). `[TRAINING]` Yan, Conrad, Tourangeau & Couper 2011 (IJPOR 23:131–147): promising *less* time than it takes raises breakoff later — so the number must be true. Thirteen closed-ish questions plus three typed ≈ 5–7 min: inside the window, at its edge; the cost is the typed three, not the thirteen. **Trap:** three counts are in play tonight — Rosa's 8 (`run-8.md:720`), Nacho's 11 (`run-8.md:29`), the page's 13 — and the cover's "Thirteen questions" is a literal string (`page:227`), not `Q.length`; cut one question and the cover lies.

**F6 · "Saved" is a promise with three states, and it belongs where people leave — the first screen.** `[WEB]` Breakoffs concentrate at the start (one study: 83 broke off on the first screen vs 218 on all others; Statistics Canada, https://www150.statcan.gc.ca/n1/pub/12-001-x/2013002/article/11885/section4-eng.htm ; topic and placement shape breakoff, Chen, Cernat, Shlomo & Eckman 2022, https://doi.org/10.1177/14707853211068008). **No controlled study on autosave reassurance and breakoff was found** — save-and-continue is vendor practice (QuestionPro https://www.questionpro.com/features/save-and-continue.html ; SurveyJS https://surveyjs.io/form-library/documentation/how-to-save-and-restore-incomplete-survey ; OpinionX's survey of tools https://www.opinionx.co/blog/incomplete-surveys-partial-submissions-survey-tools) and `[TRAINING]` from there. `[CODE]` the page has the three states (`page:128-131`: shared record / this phone / not remembering) plus a fourth for a failed shared write (`page:140`), and persists on every input (`page:132-134`). **Trap:** the only two pictures of it in the repo show state three (the harness measurement above); the review will judge a warning that AJ will not see.

**F7 · The tone for one person is a signed ask, not a survey.** `[WEB]` Personalised salutation raised response significantly with a small rise in social desirability on sensitive items (Heerwegh, Vanhove, Matthijs & Loosveldt 2005, https://www.tandfonline.com/doi/abs/10.1080/1364557042000203107 ; Heerwegh 2005 on salutation and sender, https://www.sciencedirect.com/science/article/abs/pii/S0747563204002304). Kim, Lee & Gweon 2019 (CHI): a conversational, casual-styled instrument produced more differentiated, less satisficed answers than a web form, 2×2 design (https://dl.acm.org/doi/10.1145/3290605.3300316). `[TRAINING]` Dillman's tailored design: say who is asking, why, and what happens to the answer. `[CODE]` the cover says "He asked…" and never names him (`page:227`); Nacho's draft did ("Ricardo", `run-8.md:29`). **Trap:** personalisation nudges pleasing answers exactly on the sensitive two — `plate` (allergies) and `missed` (you didn't cook) — so "no wrong answer, blank is fine" belongs beside those two, not only on the cover.

**F8 · Design for the phone she has: short lists, no grids.** `[WEB]` Antoun, Katz, Argueta & Wang 2018 (systematic review 2007–2016): fit to width, single/multi-choice and text over grids, drop-downs and sliders (https://journals.sagepub.com/doi/10.1177/0894439317727072). Mavletova & Couper 2015 meta-analysis: mobile-optimised, shorter, simpler designs cut breakoff (https://www.researchgate.net/publication/282653453_A_Meta-Analysis_of_Breakoff_Rates_in_Mobile_Web_Surveys). `[CODE]` the `name` question is `grid:true` with 15 options (12 names + Sobremesa + "Mix two" + "None"; `page:113-114`) — the one format the heuristics warn against, on the hardest question. **Trap:** Rosa's number says 7 options already overflow at 360×780 (`run-8.md:712`). Cap at 6–7 a screen; the names become "pick from six, or type one".

**One-line verdict on the page as built:** on F2, F3, F5 and F6 it is on the right side of the evidence; F4 (greyed Next, tooltip Skip), F7 (unsigned cover), F8 (a 15-cell grid) are the three to change; and the two published screenshots must be re-shot from `file://`.

QUESTIONS FOR THE OWNER

1. **A note under every question, or under the ones that change the build?** His side, verbatim: *"give her comment options on any multiple choice questions"* (`docs/ASKS.md:248`); for one trusted person the note is where the real answer lives, and the page already folds it. The evidence's side: Hadler 2025 and Peytchev 2009 (extracts) say an open box beside a closed question is where more people leave, and this page already carries three typed questions. Both are real; nobody here should average them.
2. **Bar, count, or both?** Nacho asked for *"a progress row that fills"* (`run-8.md:34`) and the page has a bar and a count (`page:161-164`). Villar 2013 says a constant bar does nothing measurable and Liu & Wronski 2018 found surveys without bars complete more (extracts). The count alone is R15-clean; the bar is harmless only while it moves by step.
3. **Which list is the list — 8, 11 or 13?** Rosa built eight (`run-8.md:720`), Nacho wrote eleven (`run-8.md:29`), the page ships thirteen (`page:86-115`, `:227`). The evidence puts thirteen inside the window; the typed three are the cost. He picks; the cover's literal must then match `Q.length`.

WHAT I DID NOT CHECK

- **No source page was read.** Sixteen fetches, fifteen hosts, all refused. Twenty-eight URLs above, every number a search extract. Three primaries most worth a person's opening: Villar et al. 2013, Hadler 2025, Mavletova & Couper 2014.
- Rosa's working prototype (`scratchpad/rosa-aj-questionnaire.html`) — not opened; her numbers are quoted from her return.
- Whether the shared `db` write (`page:136-141`) actually lands on the published artifact — not run; only that the code paths exist.
- The earlier, cut-off run of this same lens (09:38–09:41 today) measured an 11-question draft ("Skip this one for now", "+ Add a comment") that no longer exists in that form; its output is not in the scratchpad and I did not reconstruct it.
- Nobody who has not seen this page has tapped through it. Every completion claim here is about strangers in panels, not AJ.

POST-FLIGHT — The lens earned its keep the moment I stopped reading extracts and ran two five-second probes: `localStorage` under `setContent` throws, which means both published questionnaire pictures show a failure state the harness caused, and the bar fraction at `page:161` is by step — two facts no search could return and that decide F2 and F6. Where it was silent: a research lens has no instrument for *meaning* — whether a greyed Next *reads* as forced is a cold-read question and I answered it with a percentage from the CSS. The gap I predicted appeared exactly and worse: not most but *all* sixteen fetches were refused, so this sweep is search-engine memory end to end and says so on every line. Edit to my own file: **none — there is no `.claude/agents/research-form.md`**; the research lenses are general agents by design (`docs/crew/FLIGHT-NOTES.md`, iteration 7 header). If the calling session ever gives this lens a file, its first line should be: *"Before you search, try to open one page; if the proxy refuses it, write 'extract' on every claim from the first line, not in a footnote."*

MURAL PANEL
```
id:     research-form-se-fue-en-la-nota
by:     "research-form"
title:  {en:"She left at the note line", es:"Se fue en la línea de la nota"}
said:   {en:"The box he wants under every question is the box people leave at. Keep it — shut, until she opens it.",
         es:"La casilla que él quiere bajo cada pregunta es la casilla donde la gente se va. Que se quede — cerrada, hasta que ella la abra."}
state:  {en:"Twenty-eight sources, sixteen doors tried, none opened; every number I carry is a search engine's memory of a page, and each one says so.",
         es:"Veintiocho fuentes, dieciséis puertas tocadas, ninguna abierta; cada número que traigo es lo que un buscador recuerda de una página, y cada uno lo dice."}
who:    {en:"the form researcher, who counts where people stop instead of admiring the form",
         es:"quien investiga formularios, que cuenta dónde se detiene la gente en vez de admirar la forma"}
cap:    {en:"Three studies, each reached only as an extract, say the same thing: put an open text box beside a closed question and more people leave there, most of all when it comes early. The page as built folds the box behind one tap, calls it optional and puts the typed questions last — every one of those is the right side of the evidence, and the reason written down for folding it was the page jumping, not the people leaving. The pencil on this sheet stops at row five because that is where the studies say it stops.",
         es:"Tres estudios, cada uno alcanzado sólo como extracto, dicen lo mismo: pon una casilla de texto junto a una pregunta cerrada y más gente se va ahí, sobre todo cuando llega temprano. La página tal como está pliega la casilla tras un toque, la llama opcional y deja las preguntas de escribir al final — cada una de esas cosas cae del lado bueno de la evidencia, y la razón escrita para plegarla fue que la página brincaba, no que la gente se iba. El lápiz de esta hoja se detiene en la fila cinco porque ahí dicen los estudios que se detiene."}
aspect: 0.46
art:    (g,W,H)=>{murGround(g,W,H);
  /* THE FORM RESEARCHER'S HAND: an optical-mark answer sheet. I do not own a drawing — I own the
     sheet people fill in and the place on it where they stop. White stock, salmon ink, timing marks
     down the left edge, and a No. 2 pencil. Two columns of rows the way a real sheet is printed:
     1–7 on the left, 8–13 on the right. Rows 1–4 bubbled; row 5 bubbled AND its note line written on,
     and the pencil keeps going — off the line, across the empty right column, off the sheet. Rows 6–13
     never got a mark. That is the whole finding: the note box is where she left. */
  const paper="#FBFAF3",ink="#E9958C",inkD="#C4574B",inkL="#F7D3CE",pen="#3C3A3F",tm="#1E1C1F";
  const sx=W*0.035,sy=H*0.045,sw=W*0.93,sh=H*0.87;                 /* the sheet; bottom 6% left clear */
  g.fillStyle="rgba(43,37,54,.18)";g.fillRect(sx+3,sy+3,sw,sh);      /* it lifts off the limewash */
  g.fillStyle=paper;g.fillRect(sx,sy,sw,sh);
  g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,sh-1);
  /* header band, and the block you do not write in */
  const hh=sh*0.16;
  g.fillStyle=inkL;g.fillRect(sx,sy,sw,hh);
  g.fillStyle=inkD;g.font="bold 9px ui-monospace,monospace";g.textAlign="left";g.textBaseline="middle";
  g.fillText("AJ-13  ·  USE No.2 PENCIL ONLY",sx+sw*0.075,sy+hh*0.52);
  g.save();g.beginPath();g.rect(sx+sw*0.80,sy+hh*0.18,sw*0.17,hh*0.64);g.clip();
  g.strokeStyle=ink;g.lineWidth=1;for(let k=-hh;k<sw*0.17+hh;k+=4){g.beginPath();g.moveTo(sx+sw*0.80+k,sy+hh*0.18);g.lineTo(sx+sw*0.80+k+hh,sy+hh*0.82);g.stroke();}
  g.restore();g.strokeStyle=ink;g.strokeRect(sx+sw*0.80+.5,sy+hh*0.18+.5,sw*0.17,hh*0.64);
  /* timing marks down the left edge — the machine reads the sheet by these, not by the words */
  const rows=7,top=sy+hh+sh*0.06,pitch=(sh-hh-sh*0.10)/rows,r=Math.max(2.5,pitch*0.30);
  g.fillStyle=tm;for(let i=0;i<rows;i++)g.fillRect(sx+2,top+i*pitch-r*0.5,sw*0.02,r);
  /* two columns of rows: number, five bubbles, a note line */
  const col=(cx,cw,first,n)=>{
    for(let i=0;i<n;i++){const y=top+i*pitch,num=first+i;
      g.fillStyle=inkD;g.font="bold 8px ui-monospace,monospace";g.textAlign="right";g.textBaseline="middle";
      g.fillText(String(num),cx+cw*0.08,y);
      g.strokeStyle=ink;g.lineWidth=1;
      for(let b=0;b<5;b++){g.beginPath();g.ellipse(cx+cw*(0.15+b*0.095),y,r,r*0.82,0,0,7);g.stroke();}
      g.beginPath();g.moveTo(cx+cw*0.66,y+r*0.8);g.lineTo(cx+cw*0.98,y+r*0.8);g.stroke();   /* the note line */
    }};
  const c1=sx+sw*0.05,c2=sx+sw*0.52,cw=sw*0.43;
  col(c1,cw,1,7);col(c2,cw,8,6);
  /* the pencil: rows 1–4 bubbled — one each, not the same letter, she was reading them */
  const fill=(cx,i,b)=>{const y=top+i*pitch;g.fillStyle=pen;g.beginPath();g.ellipse(cx+cw*(0.15+b*0.095),y,r*0.9,r*0.72,0,0,7);g.fill();};
  [[0,1],[1,3],[2,0],[3,2],[4,1]].forEach(([i,b])=>fill(c1,i,b));
  /* row 5's note line: three words, then the pencil leaves the line, crosses the empty column, and
     goes off the sheet. Rows 6–13 have no mark on them. */
  const y5=top+4*pitch;g.strokeStyle=pen;g.lineWidth=Math.max(1.2,r*0.36);g.lineCap="round";g.lineJoin="round";
  g.beginPath();let x=c1+cw*0.67;g.moveTo(x,y5+r*0.5);
  for(let k=0;k<9;k++){x+=cw*0.033;g.quadraticCurveTo(x-cw*0.016,y5-r*0.9+(k%2)*r*0.5,x,y5+r*0.5);}   /* the words */
  g.quadraticCurveTo(c2-cw*0.02,y5+r*1.4,c2+cw*0.10,y5+pitch*0.9);                                      /* off the line */
  g.bezierCurveTo(c2+cw*0.45,y5+pitch*2.2,c2+cw*0.55,y5-pitch*0.4,c2+cw*0.86,y5+pitch*0.55);           /* through the empty column */
  g.quadraticCurveTo(sx+sw*1.01,y5+pitch*0.7,W*0.995,y5+pitch*0.35);                                    /* off the sheet */
  g.stroke();g.lineCap="butt";g.lineJoin="miter";
  /* the graphite smudge where a real pencil pressed hardest — the bubble on row 5 */
  g.fillStyle="rgba(60,58,63,.28)";g.beginPath();g.ellipse(c1+cw*(0.15+1*0.095)+r*0.6,y5+r*0.6,r*1.5,r*0.9,0.4,0,7);g.fill();
  g.textAlign="left";g.textBaseline="alphabetic";}
```
Mock order for the panel: **canvas drawing**, rendered against the repo's real `murGround`/`MURPAL` at the wall's true course (255×117, `MURBAY=412×0.62`, aspect .46) and at reading size (370×170), no page errors, bottom 6% probed as dado (`[196,187,166]` = `MURPAL.shade`): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/research-form-panel-wall-255.png`, `…/research-form-panel-read-370.png`, `…/research-form-panel-both.png`; art source `…/research-form-panel-art.js`, harness `…/research-form-panel-render.js`, storage probe `…/research-form-storage-probe.js`. Material and palette are mine (white stock, salmon ink, graphite) — nothing on the wall is a bubble sheet; the earlier cut-off run of this lens left an unpainted punched-card draft at `…/research-form-panel-560.png`, and this is deliberately a different object.
