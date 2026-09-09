# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## STATE OF PLAY — read this first (2026-09-05)

**2026-09-09 — PR #151 is MERGED (`e100864`).** The owner merged it after reading only the two code commits; the four docs commits were taken on trust, which is the reading rule now (`docs/OWNER.md`, Taste). #140 and #149 are closed; **#125 stays open for its art half only.** `mq-v128`/`ch-v70`, three commits, each
rewindable alone: **#140** (a tall thing that is not a wall turns to glass at 0.55 instead of being
cut to a stub — the near-wall rule asks about HEIGHT now, through a new `t3Top()`, instead of about
kind; it had been reading a property a billboard does not have, which is why a tree crown was never
once considered), **#149** (every baked billboard carries `alphaTest`; 76 pictures had been counting
their empty corners as solid and cutting holes in whoever stood near them), and **#125** (the stray
trolley icon was a real stop standing two rows off its own rails at the far corner of the site — it
moves beside the line, travel untouched; the new rule is that a stop stands beside the line it serves).
The rule is in `docs/NEW-WORLD.md` §3⅔. Also merged in the same PR: **Chema el fotógrafo** (the
fourteenth of the crew, the 3D realism lead), **`docs/3D-LOG.md`** (his contact sheet — the standing
goal, how things are measured here, and every 3D attempt backfilled with its numbers *and the ones
that were rejected, with the reason*), **`docs/CREW-MODE.md`** (`MODE: off` on its first line, read by
every session at start via `CLAUDE.md` step 3½), the four crew charts as HTML source in `docs/crew/`,
and two settled rules in `docs/OWNER.md` — **the owner's dial** (budget in tickets, never tokens; a
ticket is never left half-done) and **the shape of an option list** (a table ranked by what it costs
HIM, the literal words he can type, one recommendation, and a real "leave it alone" row).
**Not done and asked for:** the *art* half of #125 — the owner said "make the trolley more realistic,
even the old one seemed cute and realistic though 2d". That is Pili's, with Chema, and it is the next
thing. **❗Open, needs the owner's word:** the standing goal at the top of `docs/3D-LOG.md` was
inferred from what he has already signed rather than stated by him. Also still open from the same message: **la fachada is
option (a)**, a real barbershop glyph, needing Pili's cold read.


**Deployed:** whatever `CACHE` in `sw.js` says — `mq-v70` at the time of writing (`roams`: a document-carrier may walk; `ch-v7` el pregonero, the crier with the three lines) — before that `mq-v69` (the `win` seam: la ventanilla behind a real counter in every camera, `ch-v4`; the reader's Comment button and sign-in line; `ch-v5` town-only: the key's date, the days-left line, the make-a-new-token button; `ch-v6` town-only: signed reads, a write keeps the last good copy, the rate-limit line, Clear filter and search; `mq-v70`/`ch-v7` the `roams` seam and el pregonero; R3 `test/closes.js` and R4 `test/engine.smoke.js` in CI, no version bump — tests only; `mq-v71`/`ch-v8` the `PLACES` seam, #25; `mq-v72`/`ch-v9` the reader's select, label dropdown and sort; `mq-v73`/`ch-v10` the hero drawn through walls; `mq-v74`/`ch-v11` the 3D error trace). **#4 la caja de escalera: the owner signed all four picks ("go for it don guero"); built in the town first (`mq-v75`/`ch-v12`: five engine glyphs, the stall's lobby + stair hall + loft).** Next on it: the owner walks it in the town, then Meridian's `hq`/`f2` take the same four rows, `PORTALS.st.E` lands on (10,14), `1` leaves HQ, Nolasco's `1` becomes `▼` *(it did not: `mq-v81` shipped with Nolasco keeping his — the well for his office is ❗El zaguán on #7, an open decision)*, and the smoke pins Don Güero listed (the 20×14 size, the letter whitelist, the arrival tile, the sight line as "nothing tall", the upstairs nudge at (16,5), shots 02/10/12/44) are proven red before they change. **The efficiency round (2026-09-06, owner's eight picks):** PR 1 shipped as `ch-v13` (news since last visit, switches, grouped board, "run line 2", header). **PR 2 shipped** (`mq-v76`/`ch-v14`): the reader's form section; every popup a form; Decide posts a pick as a comment. **PR 3 shipped** (`ch-v15`/`mq-v77`): the index — state, events, labels, places and who; one search; walk there; file about it pre-tagged; and `READERLOOK="night"`, the purple paper, with Meridian on cream. The efficiency round is done except the token (waits for this key to expire). **Then the street reported three bugs, fixed as `mq-v78`/`ch-v16`:** cutaway walls (#61), the rising flight and the railed well (#62), headroom on the actor card (#57). **Then, `ch-v17`:** Don Güero's three lines and his request form (#50, answered on the issue), the signs over the faces as counters, boards naming the faces. Still open on the faces: #42's storefront per label / something to see inside. **Then the owner walked ch-v17 (2026-09-06, late): going up the stairs is right; the way down is "still blocky, squares with a faulty railing" (#62 stays open, the loft's well must look like the flight), and the cut-away walls are "weird" — #65 asks whether the camera should swing or offer fixed views instead. Both are future work, logged not built.** **Then the owner said "ok yeah please do 62" — built as `mq-v79`/`ch-v18`:** the well is a hole in the floor (the ground texture is cleared there, `alphaTest`), the steps are sunken boxes one step deeper toward the ▼ (`wellDepth()`, `stairLift()` negative), a rail beside a well stands knee-high on its lip and turns to face it, and the loft's rail closes the well on three sides. The port of #4 to Meridian is next, whole staircase. **Then (`mq-v80`/`ch-v19`, #65):** the owner's pick on the cut-away — *"make the doors just like minimized"* — a wall or door between the camera and you is hidden and a knee-high stub in its top colour stands in its footprint (`t3Cutaway`, a companion mesh `userData.stub`); lintels alone are hidden; #42 closed as superseded by #69 (a real town for the ledger, Don Güero-planned, one building per kind of work). **Then `mq-v81`/`ch-v20`: the staircase in Meridian** — owner: *"send the stairs to templates and MQ"* — HQ and f2 take the town's four rows (20×17), `PORTALS.hq["▲"]`/`f2["▼"]`, the street lands on (10,14), the old `1` left HQ and the loft (Nolasco keeps his), the pinned smoke tests (f2 20×14, the glyph counts, the arrival (17,11), the sight line, the markers, the door at (10,13), the dog through the stairs, the unlaid-glyph guard) proven red then rewritten; NEW-WORLD.md §3¾ is the template; CITY.md's entry closed. #4 closed by the owner from the street (Done), with #50, #57, #61, #62. **Then the street spoke again (2026-09-07, 01:02–01:46 UTC):** #65 — *"we still dont like this, AJ is here. lets try the camera angles, and only if they are surrounded by 4 walls in a small room do you do this and only one wall near the character"* — built as `mq-v82`/`ch-v21`: walls never vanish; `t3Hides(h,d)` says when a wall actually covers you (close and tall), `t3Sight(x,y,yaw)` picks the nearest camera stop with nothing on the line of sight and `t3AutoYaw()` eases `T3.yaw` to it once per tile (a manual ↻ is instant and becomes the goal); only a nook (all four stops blocked) minimizes its one nearest wall (`t3Reveal`, the stub). #11 answered with the gaps to label; #40 answered with one question (which template first); #69 answered by the owner — nested districts, people on the street and inside — the session's picks recorded on the issue; Don Güero's plan for the first block is the next sitting. **Then the owner and AJ walked it (2026-09-07):** *"aj prefers the minimized wall but limit it to one near the person... the view change was too confusing - lets keep that manual"* — `mq-v83`/`ch-v22`: the automatic turn is gone (↻ is the only turn); `t3Near(x,y,yaw)` returns the one nearest wall that hides you (the piece in front and its two neighbours) and `t3Reveal()` stubs just those; the far wall stays whole. Three tries on #65 in one day: cut-away → stub → auto-turn → one near stub; the last is AJ's pick. **Then #69 got its go** (*"i'll let you decide, but i think the nested would be fun. they can stand in both the street or building"*, then *"put a human friendly label as to what type of issue or work is being done? otherwise have fun with the organization"*, *"for buildings in don gueros plans too"*): Don Güero's plan is on #69; six `work:` labels went on every open issue by hand; **block one built as `ch-v23`** (engine untouched): the street's two ranks, six houses copied from Meridian's shells, six clerks with three lines, boards that say the work in two lines, signs that count their house, the request form's work dropdown, the town's own facade glyph `I` in `changarrito/content/art.js`, the town's ledger `docs/changarrito/CITY.md`. **Then dos cuerpos, `ch-v24`:** `place()` rebuilt — per house the two heaviest on the doorstep AND at the counter, four inside, the rest pinned; the homeless in the plaza (six) before the hoarding (sign `next`, board BLOCK 2 SOON, sheet `next`), the overflow on city hall's board as sin domicilio; `placed[n]={st,in,house}`, both bodies removed on close or move; `walkTo` prefers the body in the world you stand in; `loadGone()` reads the closed issues so a house board shows who went home; `setLabels` announces the move. **Then `mq-v84`/`ch-v25` (#45, *"poster next to teller is off, a bit too high"*):** a read mark on a wall or facade hangs on the wall's open face, mid-height, not pulled toward the camera (`t3ReadFace`, `fixed` on the actor, `userData.mark="read"`); a desk keeps its float. Same day: #11's six art gaps filed as #80–#85 under `work: how it looks`; Don Güero's reviews posted on #7 (the well in Nolasco's office, recommended), #9 (the reja and `buildSafe` teeth) and #10 (homes get rejas, doors are spent on businesses), each with side quests for the owner. **Then `mq-v85`/`ch-v26` (#25, *"update here and meridian and template so we have a good amount of metadata that includes these"*):** Meridian's config declares all ten `PLACES` roles with a note each (the smoke fails the build if it leaves one out or drifts from `PLDEF`), the town's copy carries the same notes, NEW-WORLD.md §3 has the roles table; #25 closed. **Then `mq-v86`/`ch-v27`:** billboards draw in camera-distance order (owner: "when we walk behind people it seems like im walking on them"); the hero still ignores depth, a nearer person draws over you. **Then `mq-v87`/`ch-v28`, the rainbow bridge** (owner: "i want to upgrade rainbow bridge for sonny asap please"): in 3D a plank deck `BRIDGEH` over the river with a rail each side, the six bands on top, the crosser lifted onto it (`stairLift`, `TILES["^"].kind="bridge"`); IDEAS §15.4 updated; the arch and the Día de Muertos palette still wait on the owner. **Then `mq-v88`/`ch-v29`, Día de Muertos signed** (owner, after the Coco research: "marigold, and petals too and papel picado - do it alll!!! yes by october but a manual way too"): the marigold gradient, `bridgeStyle:"petals"` strews the deck (`TILEDRAW["^"]`, deterministic per tile), `papel` hangs cut-paper flags along the crossing in 3D (poles at the run's ends); the town carries the same season; Settings → Season by name is the manual test; OWNER.md's rule amended (Muertos may dress, never rebuild). **The street spoke again (16:41–17:08 UTC), all answered on the issues:** #39 top priority — a 3D-realism test that lists every flat object and fails on a new one; #9 "work on this" (the reja + door rule); #7 the owner's own plan (grow Nolasco's office EAST, a door into a stair room); #10 "lets take this on" (portals by coordinate, one casita from a template); #8 El Portero in a room with red critical counts and a red category at the teller (needs the error log first); #14 recommended version + permits; #80/#82/#84 costume, shirt and uniform decisions noted (#82 asks the owner for AJ's interests, not in any doc); #40 parked. **Then `mq-v89`/`ch-v30`, Noche de alebrijes:** a second season with no dates (by name only): `art("alebrije")` stripes every animal in the palette where its own pixels are (`wildDraw`, source-atop on a scratch canvas, the drawers wrapped by `wild()`), `art("facepaint")` paints the calavera on the hero only (`o.hero` at the five hero draw sites); smoke red first. **Then `mq-v90`/`ch-v31`, #39's 3D-realism audit** (owner: "the test should catch things like 2d image looking thing/objects"): the 3D builder tags every billboard it stands in a world `userData.flat`; `test/engine.smoke.js` keeps `FLAT_KNOWN`, the list of what is still flat today, fails on anything new and on anything that is no longer flat, and prints what remains on its OK line. Seventeen kinds were flat; the desk `D` and the shelving `S` got a side view (`TILESIDE`) and became boxes the same day — fifteen remain (`1 3 4 5 7 9 A C H I J P W X Y`), to be worked off one PR at a time, the park's gear first. **Then `mq-v91`/`ch-v32`, #9 La reja:** the casita's `▦` is a closed reja (bars, chain, padlock, the step kept); `buildSafe()` refuses a `kind:"door"` tile that opens onto nothing; §27 probes it red first and fails on any declared lot the engine refuses. **Then `mq-v92`, #7 El zaguán, the owner's way:** Nolasco's office grew east by a stair room (a `+` doorway at (15,2), the railed well at (16–20,4), `▼` (17,4) → the avenue; `st["$"]` lands you at the top (21,4)); the office untouched; the last `1` left the city, §31 re-pointed at the street's cone, the laid-exactly guard and the arrow test rewritten red first. **Then `mq-v93`/`ch-v33`, #10 La llave:** portals by place (`PORTALSAT`, `portalAt`, `portalsOf`; every engine read site rerouted), a template part's `link` carries an interior that becomes a world per lot (`buildInterior`, applied at load), the home door `⌂`, the `casa` template and Doña Chelo's casa on Calle Dos with three lines in both languages; §27 proves the door, the room, the way back, the neighbour and reachability red first; the town is inert (no templates). **Then `mq-v94`/`ch-v34`, #8 El Portero and the log:** `mqwarn(kind,msg,crit)` keeps thirty entries under the pack's prefix (dedup, 16 KB ceiling), every boot audit, refused build and uncaught error lands there; a chat line may be a function and may ask for red (`toast(...,crit)`); the reader has `{red}`; `drawRobot` (NPCLOOK `robot:true`); the `caseta` template with the hut, the tin man and the gate sheet (`DOCS.portero`) on Calle Dos, built from a template like the casa. **Then `ch-v35`:** the teller's card carries the red category — what El Portero stopped, then other critical errors — only when there is something, with a Reviewed button that clears it; #8 is done. **Then `mq-v95`/`ch-v36`, #92** (owner from the street: "going downstairs, im walking on the wall again"): the hero is depth-tested while sunk in a well (`depthTest=!hero||lift<0`), so the lip and the rail hide their legs; on the floor they still draw through walls. **Then `mq-v96`/`ch-v37`, the petals** (owner: "full of the petals, they spill into water and the floor and a trail forms behind characters"): the deck carries seventy, `petalSpill` strews three tiles around every deck (thickest beside it) in all four painters, `petalDrop`/`petalTrail`/`t3Petals` leave three petals where anyone finishes a step in season, fading over ninety seconds. **Then `mq-v97`/`ch-v38`, alebrijes v2 (Pili's direction):** `wildDraw` tints inside the animal's own alpha (silhouette byte-identical), pulls the darks back, five marks a kind (`ALEB_KIND`), tiny two-frame wings on the wingless (destination-over); five looks (`ALEB_DEF`, content's `alebrije.looks`) picked per animal (`alePick`, Random/Next buttons beside the bandana, acting on the animal beside you else your own face); five calavera looks for everyone (`FACE_DEF`, `faceLookFor(who)`, the crowd varies by person). **Then `mq-v98`/`ch-v39`, la fiesta (Nacho's plan):** `art("swags")` spans and `art("hangs")` hung in 3D (`t3Build` tail, `t3Fiesta` sways the piñata) and drawn by the two flat cameras (`fiestaDraw2D`, `drawPinata`); an `arrive` line may be a function; planters bloom (`art("bloom")`); Doña Meche (`meche`, ex (21,3), `still:true` — a person with nothing to hand out who must not wander onto the trolley's landing) and her pot `ʘ` (a boxed appliance with a side view) at the trolley stop; seasonal lines for her, Kike and Doña Chelo; the street, Calle Dos and the park say the night. Nacho's ❗La ofrenda waits on the owner. **Then the owner walked mq-v98 (2026-09-07, evening) and asked for round two** — the bridge "mostly made out of the petals" with real cempasúchil petals and more colour, papel picado all over, skull candies, decorated trees; wings "look off", colour around the eyes; no all-dark calavera ("not really even looking like a skeleton"), reviewed against real makeup; the trail "for the bridge only". Built one PR a part: **`mq-v99`/`ch-v40`** the trail is the bridge's (`petalDrop(wid,x,y,feet)`: a step on the deck scatters, the two after it shed what the shoes carried, `HEROFEET`/the wanderer itself carry the count) and the five calavera looks rebuilt on the makeup review (every look: light base, black sockets, nose, stitched grin; clásica · cempasúchil · catrina (tall sockets, purple tear, red lip) · turquesa · corazón (heart nose, web brow); the smoke fails a dark base). Pili's direction for the rest (petal recipe and palette, the 3D deck as a petal mass, papel picado with punched holes in two rows by place, `props` calaveritas, `canopyDress`, cut-paper wings, eye rings with the eye restamped) is in the session log and the next parts. **`mq-v100`/`ch-v41`, the bridge made of petals:** `petalShape` (a fan with a notched tip and a rib), `petalPal()` (the pack's six, dark first — `BRIDGE_PETALS` behind it), the deck three passes of petals over the heap's own shadow with dark blots between (no plank shows), the rails the heap's colour with petals over the lip, the spill and the trail the same petal, in 3D the deck's sides a baked petal strip (`t3PetalSide`), the trail's planes a tinted petal texture (`t3PetalTex`), and `papelBridge` (a marigold cut) over the crossing so the bridge reads as one warm object. **`mq-v101`/`ch-v42`, papel picado all over, calaveritas, dressed trees:** in 3D a swag is two planes (`t3PapelStrip`, `t3PapelTex`: seven cut flags a tile with a scalloped hem and punched holes, two rows half a flag apart) instead of two hundred squares, the same over the bridge; `drawPapelRow` in the flat cameras; swags by place in the park (tree to tree and one across the path), one over HQ's lobby, along the mercado's and the kitchen's awning lines; a season's `props` (`{world,x,y,kind:"calaverita",ox,oy,h,foil}`) set sugar skulls (`drawCalaverita`, foil sockets) on the bridge rails, the mercado counter and by Doña Meche's pot where the ofrenda will stand; `canopyDress` (a petal garland, three streamers hanging below the canopy, one skull lantern) in all three flat canopy passes and the 3D canopy bake, which `seasonSet` now drops so the trees dress and undress. **`mq-v102`/`ch-v43`, the wings and the eyes:** `wildWings` is cut paper now (a hindwing behind and a forewing over it, rooted at the shoulder per kind, swept back and up, the accent flat with a darker edge (`hexDark`), ribs in the pattern colour, bites out of the trailing edge, two frames that fold rather than shrink); `ALEB_KIND[kind].eye=[dx,dy,r]` draws two rings round the eye (accent, then a thin one in the pattern colour), centred on the eye and wider than it so the pupil stays; the smoke proves the wings break the silhouette with an edge in their own colour and that the ring paints round the eye without closing on the pupil. Round two is done. **Then the owner (2026-09-07, night): a menu for the alebrije styles with a seam for custom looks later; the calavera in Día de Muertos too, and a barber so outfit and hair can change after the start (Nacho: Naye Robles, Chelo's niece, Xochi's apprentice, Barbería y Estética El Espejo — ❗La silla is the owner's pick); ten times the petals and the bridge twice as wide; and the street's answers: #14 "go for your recommendations" (version and permits), #82 AJ's interests (Avengers, Vampire Diaries, Harry Potter; coordinated outfits a soft rule).** Built one PR a part: **`mq-v103`/`ch-v44`** the park's bridge is two tiles wide (`pk` rows 5–6), `bridgeEdges(x,y)` says which edges of a deck are open so rails (2D and 3D) stand only there, `DECK_PETALS=[400,340,220]` (ten times) baked once a tile by `petalBake` (`PETALCACHE`, keyed by season) and blitted; the spill three times thicker and baked the same way. **`mq-v104`/`ch-v45`** Settings → Alebrijes (`aleRowBuild`: who — your face or any named animal — then the look by name; `aleSetPick` is the one door the 🎲/🔁 buttons use too), the custom seam `alePick.custom[key]` laid over a pick by `alebLookFor`/`faceLookFor` (IDEAS §15.21½), Día de Muertos says `facepaint:true` (the engine's five) so the calavera is worn on the night and the buttons act on your face there; AJ's brief (Avengers, Vampire Diaries, Harry Potter) logged in IDEAS with the soft rule on coordinated outfits. **`mq-v105`/`ch-v46`, the chair:** `GROWTH.barberNpc` nominates who runs it (`naye`); Talk at her opens `openChair(who)` — the creator over the world, the name locked, one of her lines under the title (`#crNote`), the calavera row (`buildPaintRow`, `#rowPaint`) in season — and `closeChair()` saves the look and hands the world back with progress untouched; Naye Robles (`NPCLOOK.naye`, three lines + a seasonal one in both languages), `BARBER_ROOM` + `BUILDTPL.barberia` (casa's shell, two mirrors as windows, two chairs, a counter) at `ex` (21,0) — Don Güero's x16 sat on Yola and the piñata; CITY.md carries ✅ ❗La silla with the two picks still open (service or district; ❗La fachada). **`mq-v106`/`ch-v47`, the city record (#14, owner: "go for your recommendations"):** `.github/workflows/pages.yml` deploys the site from an artifact after `.github/scripts/city-record.js` writes `status.json` beside it (version, written, the owner's open PRs with green/mergeable; a `note` when the permits could not be read) and `test/record.js` checks the shape; `sw.js` serves it network-first; CI never pushes. **The owner must flip Settings → Pages → Source to "GitHub Actions"** — until then the deploy step is allowed to fail and the branch deploy stands (it ran green on the first push, deploy included). **Then the owner (2026-09-07, late):** *"do 50x the petals, it does look better"* → **`mq-v107`/`ch-v48`** `DECK_PETALS=[2000,1700,1100]`, the top pass wearing the whole palette (with thousands of petals only the surface shows, and a surface of one colour is a rug); *"i dont remember this chelo issue - nacho/you fix it and choose a new name"* → Nacho: the casa's neighbour is **Doña Tencha** (`tencha`), the mercado keeps Chelo Robles; *"la silla - you choose"* → a service, the growth seam named; *"can we reuse for MQ then for the story, nacho?"* → ❗El espejo in CITY.md, Nacho recommends B (three quests, a small `espejo` district after Nolasco). **`mq-v108`/`ch-v49`:** `tencha` in NPCE/NPCN, `CASA_ROOM` (people, locs, arrive), `chat.tencha` in both languages (lines unchanged), the swag comment, CITY.md's four casa mentions, STORY.md's arc and Xochi's line; the smoke (node side) fails any cast key declared twice; CITY.md carries ✅ La silla (service, the growth seam named) and ⏳ ❗El espejo (A/B/C, Nacho recommends B). **`mq-v109`/`ch-v50`, the moment on the deck and the deep bake** (owner: "if one hangs on the petals, the character picks one up and looks at it saying something like 'we will meet once again, love...'", "definitely do like 10x the amount of petals"): `petalMomentTick` — still on the deck in season for 2.2 s, `petalMoment` raises the hero's arm with a petal in `drawPerson` and says one of `T().petalLines` (EN/ES, both packs), once per crossing; `DECK_DEEP=43200` more petals a tile drawn in idle slices (`PETALDEEP`, `petalDeepStep`) after the first 4,800, `petalShape` on a Path2D (65 ms a tile), the 3D lid re-bakes once when the last slice lands; the bridge as a grief mini game and ❗Las versiones del puente are in IDEAS §15.4½. **`mq-v110`/`ch-v51`, papel picado everywhere, calaveritas on sills, la ofrenda** (owner: "the candied skulls are probably better in a window sill (as in human reality) and the papel picado can be everywhere and more colorful"; "la ofrenda sounds like a good idea"): ten colours in the cut; a swag or two in every base world (the offices under the north wall, the lanes, the street's south row); `props` with `sill:true` sit on the facade's own window (`propSill`: `TILES[g].win`, `w` picks the second window) on HQ's and La Cocina's fronts, in 2D and proud of the south face in 3D; `drawOfrenda` (tiered cloth, marigold arch, candles, pan de muerto, a calaverita, two cups of water, the EMPTY frame) as a `props` kind at the foot of the bridge in the park and on Doña Tencha's table — Nacho's placement; the owner's own document with the basics (not in Drive; on the laptop) refines it when pasted. Not built: ❗Las versiones del puente. **`mq-v111`/`ch-v52`, the hint in the bubble and the shirt's pattern** (owner: "make it easy to tell... their thought bubble at least has a hint"; "keep making a couple more options" for AJ's fashion): `checkTalk` says what the chair changes (`T().chairHint`) and what the fitting room does (`T().wdHint`); `look.pattern` — plain, stripes, dots, flourish — drawn inside the shirt by `shirtPattern`/`SHIRT_PATTERNS` in the shirt's own colour, a row in the creator and the chair, saved with the look (`sanitizeSave`); a pack may add patterns. The owner's #39 comment (any holiday is one more season block; tests check the seam) answered on the issue. **`ch-v53`, the town dressed** (owner, 2026-09-08: "these updates arent there... in the current one for el changarrito, though we should have in both and template"): the town's two seasons carry the same keys Meridian's do, placed on the town's own maps — strings in every world, the piñata over the street, nine calaveritas on the faces' windows, the ofrenda at the foot of the park's bridge and on a table in `co`, the blooms; the town's bridge two tiles wide; NEW-WORLD.md §3⅞ documents the season seam key by key so a new world copies the block and re-places it; the town smoke proves all of it. **The owner's playtest of 2026-09-08 is filed, not built** (his word: "for the most part plan only"): #125 a trolley icon at the end of the construction, unreproduced — needs a screenshot and which game; ~~#126 **Naye's chair traps you**~~ **FIXED 2026-09-08 (`mq-v116`/`ch-v58`)** — two causes, not one: the panel had no height of its own, and `openChair` left the page scrolled wherever the world had it, so the panel could open entirely below the fold. It now keeps to the window with the border-box model, scrolls inside itself, opens scrolled into view at its own top, and the finish button is sticky at its bottom. The smoke opens the chair at a phone's height (390×560) and fails if the panel or the way out falls past the screen, if the panel does not scroll, if the button does not ride the bottom, or if pressing it does not leave the chair; ~~#127 the looks rows broke the Settings drawers~~ **FIXED 2026-09-08 (`mq-v120`/`ch-v62`)** — appearance is its own subject and now has its own drawer, **🪞 Your look / 🪞 Tu apariencia** (Wardrobe was taken by the animals' fitting room), sitting after Picture in both shells. The who-dropdown and the looks row moved out of the Picture drawer, which was built for the theme, the camera and the season; the drawer hides with its contents when no season offers looks, so the menu never shows a name and an arrow over nothing. The dropdown's styling was found in the **head's reset block**, of all places, keyed to one row's id — it moved into the sheet as `.drawer select`, so the next drawer that needs one already looks right. The smoke checks the architecture rather than the one drawer: every drawer named in the current language, opening and closing on its own, known to `DRAWERS` so its state is remembered, holding its own controls and no one else's, with nothing claimed by two drawers; #128 the trolley grows a loop, wheels, an overhead line and a driver, so a corner-to-corner ride beats walking; #129 the ofrenda wants room; ~~#130 the appearance rows crowd the name field~~ **FIXED 2026-09-08 (`mq-v121`/`ch-v63`)** — the panel is two parts now and looks it: a header block (title, the barber's line, the preview, the name) and, under a rule with more air and its own heading (**How you look / Cómo te ves**), the choices. Nothing marked the boundary before because the name field sat on the same 14px rhythm as every row. The chair, which comes in with the name hidden, gets the same header, so the two ways into the same screen finally read as the same screen — that was the ticket's own second question. The smoke unhides the panel, checks the name is in the header and the first row in the body, that the body carries a real rule, that the gap is wider than the row rhythm, and that the heading has words in the current language; ~~#131 the sugar skulls share one sill~~ **FIXED 2026-09-08 (`mq-v118`/`ch-v60`)** — and the first reading above was wrong, which is worth keeping: nothing shares a sill, every candy is on its own tile. The candy is drawn 8px wide and the shopfront pane is 8 (Meridian's narrow facade is 7), so it filled the glass edge to edge and its crown poked over the frame — a skull pasted on a window, which is what the owner saw. It is cut to two thirds of the pane now, never wider than the art it comes from and never under 4px, so a narrow window gets a smaller sweet without anyone hand-sizing it. The latent half is closed too: a front with two windows only ever offered the first, so candies on one tile now take its windows in turn unless the content names one with `w`. `test/engine.smoke.js` measures each candy against the pane read straight off the map and fails if one covers the glass or if two land on the same window — 17 failures against the old engine, both games; ~~#132 "long" hair reads as a beard~~ and ~~#133 the afro has no volume~~ **FIXED 2026-09-08 (`mq-v122`/`ch-v64`)**. The old **long** drew a rounded mass that CLOSED under the chin with the face punched out of it — the silhouette of a beard, exactly as the owner said. It keeps the drawing and takes the honest name (**Beard / Barba**; the game had no beard and now has one), and **long** is redrawn as real long hair: two lengths down the sides, wider at the bottom than at the temple so it hangs rather than clamps, and the jaw left open — that open jaw is the whole difference. A save written before this keeps the beard it was actually wearing (`hairV:2` marks the ones written after, so the migration runs once and never again). The **afro** was three flat circles at one brightness, which reads as a helmet; it is now one path — mass plus a bumpy rim so the silhouette is hair and not a dome — filled with a single gradient, lit up-left and heavy down-right. One fill means no seam: shading it with overlaid blobs first left a hard lens across the mass that read as another object. `hexDark` multiplies toward black and is useless for a highlight (near-black hair × 1.3 is still near-black), so `hexLite` mixes toward white instead. The smoke measures all of it in pixels, finding the face first so nothing depends on where the drawing lands: the beard closes under the chin, long does not, long has mass down both sides past the jaw, the afro's interior spans real brightness levels, and both save paths round-trip. Five failures against the old engine, both games; ~~#134 **everything is blurry**~~ **FIXED 2026-09-08 (`mq-v117`/`ch-v59`)** — measured, not guessed: a rendered street scored by its edge energy came back 2.26 blurred and 2.72 fixed. The first reading above was half right and is corrected here — the mip pyramid was never the blur, the LINEAR blend was, and every texture in the scene had one somewhere (the ground blended between mip levels, all 559 standing tiles between texels with no pyramid at all). It is nearest between texels AND between levels now; the pyramid stays, because without it the far half of the street crawls as you walk; and it is only asked for under WebGL2, since a non-power-of-two texture with mipmaps renders black on a WebGL1 fallback and every texture here is sized to its world. Two more found on the way: the live sprites were re-cut 40 tall on a device-pixel-ratio change when the artists paint 48, so every person went short and stretched after the owner went fullscreen — and Meridian’s own smoke had **pinned that bug** at 40, which is why it never showed. Raising the bake factor K on top of all this bought nothing measurable, so K and its memory are untouched. `test/engine.smoke.js` now holds the whole rule for any pack, so both games and the template are covered by one guard, and NEW-WORLD.md §3⅝ writes it down; **Then the owner: "its still blurry in full screen" — a second, unrelated cause, fixed as `mq-v119`/`ch-v61`.** `.viewport.fs` gives the canvas `height:100% !important` and `object-fit:contain`. `t3Resize` took the element's WIDTH and derived its height as the game's 10:8 — right in a window, where the shell sizes the 3D canvas to match the 2D one, and wrong the moment fullscreen changes the shape. The buffer then had the game's aspect and the element had the screen's, so the browser **rescaled the whole render before anyone saw it**: at 1440×900 a 2880×2304 buffer was resampled down to 1125×900 and letterboxed with black bars either side. It measured 0.885 against 2.24 windowed, and the MQT and MERIDIAN signs were illegible smears. A 3D camera has no fixed frame to protect, so it now measures the box it is actually given and renders that: the bars are gone, the signs are readable, nothing is resampled, and it costs less GPU than before. The render loop watches height as well as width, since going fullscreen can keep the width and change the shape. Raising K to chase the magnification was tried and measured flat (1.20–1.24 across K=2/3/4 and both filters), so K is still left alone. The smoke asserts the buffer's aspect matches the box's, windowed and with `.fs` on, in both games; the Coco lessons that apply are silhouette first, a value range rather than many colours at one brightness, and light doing the work. New skill `.claude/skills/ticket/SKILL.md` carries how to file one, and the shape a cast agent would follow. **Then the first cast agent actually sat: Rosa Villalobos, a UI reviewer, roamed the town headless (64 screenshots, four sizes, both languages, four cameras, both seasons) and left eight findings in `docs/changarrito/UI-REVIEW-rosa.md` for the owner to rank — she filed nothing herself, which is the shape the skill describes.** Her first is **FIXED 2026-09-08 (`mq-v123`/`ch-v65`)**: the sheet's Copy/Download/Close bar was `position:sticky; bottom:0`, and a sticky bar hovers over whatever content is in that band rather than sitting at the end of the paper — so on a phone it opened parked on top of Sign in, Make a new token and File a request, and a tap went to Copy with nothing to say it had. Reserving space at the foot would not have helped, because the overlap moves with the scroll. The paper is a column now: the document scrolls in its own box and the bar sits under it in flow. The regression test is written against the sheet rather than one game's content — it opens **every document the pack declares** at 390×560, at three scroll positions, and asks the browser what is on top of each **visible** button (clipping ancestors included, so a button scrolled out of its own box is not miscounted), in both games. Against the old shell it reproduces Rosa's finding word for word — “🔑 Sign in” is under “📋 Copy” — and catches it in Meridian too, which she predicted but could not test. Her remaining seven are unbuilt and unfiled: 2 the buttons that do something are 21px tall while Copy/Download/Close get 68; 3 on a phone the world's action buttons climb off the top of the world onto the gear; 4 Settings and the map are trapped inside the world's frame and the map's way out is sliced in half; 5 the request form slides off the left of a phone; 6 the Settings rows never wrap, so Spanish runs off the panel on a laptop too; 7 🎲 is buried under 🔁 and has never been pressable; 8 the town's front door describes Meridian. NEW-WORLD.md §3¾½ writes the sticky-bar rule down. **Then the owner took the rest of her list and asked her back for the design answers (`mq-v124`/`ch-v66`).** Built: **3 and 7 together** — the eleven buttons that float over the world were placed by a ladder of fixed distances from the bottom (16/72/128/184/240) laid out for a 427px laptop frame, so on a 266px phone the fifth rung landed outside the world, clipped and half-unpressable on the corner icons; three shared one rung, two shared another, and 🎲 and 🔁 shared one **exactly**, so the random-look button had never been pressable. They are an anchored column now that fills upward and wraps sideways rather than climbing out (Rosa's *anchored flex rail*: no button knows its own position). **4** — every panel opened `position:absolute` INSIDE the world's frame; they are `fixed` over the page now, their way out rides the bottom of the box, and Escape or a tap on the dark outside leaves them (only where a way out already exists, so the first-boot language chooser still holds you). **5** — one long dropdown option made every field in the request form 46px wider than the phone: the grid track was capped with `minmax(0,1fr)` but the ITEMS still carried `min-width:auto`, whose automatic minimum is their content, so the cap did nothing until `min-width:0` went on the items too. **6** — the choice rows never wrapped, so Spanish ran off the panel on a 1440px desktop; they wrap now and a name is either whole or on the next line. Red first in both games: 20 failures against the ladder, 27 and 49 against the panels. **Rosa's design answers are appended to her review** — her button scale (48/44/40, 44×44 hit area, 12px gaps and 16 between a write and a read, WCAG 2.5.5 and Apple rather than the 24px AA floor, because the failure here is pressing the wrong thing silently, not missing); **no progress number in the town at all** (a permanent `0 XP` is a verdict delivered at the door, and in a backlog neither filing more nor closing more is reliably good — a fact instead, *"14 waiting · 3 answered since Tuesday"*, which must go down as well as up); and the layer contract (World 0–9 · HUD 10–19 · Panels 20–29 · Sheets 30–39) with what each may never do. **Her biggest unbuilt recommendation:** the world's 266px height on a phone was never chosen — it fell out of ten-by-eight tiles at 5:4, a 2D constraint the 3D camera does not have. Give the world a height in `svh` and let the camera take the shape it gets (the fullscreen fix already proved the camera is happy to), letterboxing the flat cameras inside it: ~380px of world instead of 266, which relieves more crowding than any button fix. Also unbuilt from her list: safe-area insets on every anchor, a floor on in-scene text size (house boards render ~8px on a phone), one pointer meaning across all four cameras, **pausing the render loop behind a full-page overlay** (it draws unconditionally today, under backdrop-blurred controls over live WebGL), 250–350ms easing on camera moves (AJ's "too confusing" auto-turn was an uneased move, not a wrong one), and guaranteed contrast backing for HUD text. **Then the owner: "ok so it sounds like you should fix" — built as `mq-v125`/`ch-v67`.** The world takes a share of the screen with the 3D camera running: **31% → 46%** on a phone, 266px → 388px. The repercussion was found by measuring before building and is worth keeping: `fov` is the **vertical** angle, so a taller, narrower box shows the same up-and-down and **less left-and-right** — 10.9 tiles of street across would have become **7.7**, which reads as the camera zooming in. Below the game's own 10:8 the vertical angle widens to hold the width, so the result is 11 across (held) and 12.8 up-and-down (was 8.8): more world in both directions. The flat cameras are untouched — they draw a fixed bitmap and keep their 5:4, so nothing letterboxes. A second repercussion turned up in a corner of the map: past the edge the ground simply stopped and the background showed through, and a taller frame shows far more of it — an **apron**, a dim plane in the world's own floor colour, now carries the city into the dark instead of ending at a cliff. **Finding 8's XP half is built too** ("ok go for the facts then"): a pack may declare `HUDFACT`, and where it does the rank ladder and the bar go with the score. The town says **"N waiting · M moved"** from its own ledger, and says **nothing** before the ledger has been read rather than guessing; "Badge in" became "Walk out / Salir a la calle" and "Create your hero" became "Who is walking today". Meridian is a quest game and keeps its XP, its rank and its bar — the seam is opt-in. NEW-WORLD.md §3⅚ writes the height rule, the `fov` trap and the apron down. **Still unbuilt from Rosa: finding 2 (the 21px buttons — her scale is in the review), the rest of finding 8 (the town's intro copy still describes Meridian's office and quests — Nacho's territory), and her six 3D notes**: safe-area insets, a floor on in-scene text size, one pointer meaning across all four cameras, pausing the render loop behind a full-page overlay, 250–350ms easing on camera moves, and contrast backing for HUD text. **Three of those built as `mq-v126`/`ch-v68`** (the two needing the owner's taste were left): **in-scene text has a floor.** Text painted into the world is authored in tile units and the camera decides how big it lands — measured, one unit is about one CSS pixel on a phone, so the town's two-line house boards at 5.5 units arrived around **five CSS pixels tall** and Meridian's mural said MERIDIAN at 6. `SCENE_MIN=7` is the floor, both are fixed (the mural is condensed rather than shrunk so nine characters still fit), and the smoke **reads the source** and fails the build on any font literal under it — a literal in drawing code is exactly the thing that drifts. The rule is written beside the constant and it is two rules: information may never exist ONLY in the scene (a sign may be unreadable at a distance the way a real sign is, but what it says must be reachable by walking up, or on a board, or in the index — WCAG exempts incidental and pictured text for exactly this reason), and text meant to be read in the scene is authored at the floor or above. **Safe-area insets** on every edge-anchored control via `env()`. **Contrast backing** on the in-world chip, which sits over scenery that may be pale stone, dark water or a marigold blaze. Rosa's *one pointer meaning across four cameras* turned out narrower than it sounded: walking already means the same thing in all four, and the only divergence is the **admin map editor**, top-down by design and says so. Still open: **the render loop draws unconditionally behind a full-page overlay** — measured at **215 frames in 6 seconds** with a document covering the world, ~36fps at full device resolution; the owner has four options and has not picked — and **easing on camera moves**. **Nacho's front-door rewrite is in `docs/changarrito/DOOR-nacho.md`**: 35 lines proposed, none applied, plus three findings that are not copy — the town **plays Meridian's ending after its first quest** (no `CHAPTERS` declared, so the engine synthesises one and `finish()` runs Doña Chelo's epilogue in the owner's backlog town); `arrive.f2` greets the owner with **Meridian's missing AI lead**, the spine of the other game's mystery, four steps from where he wakes; and XP survives the strip fix in a verdict header **no string can reach**, needing the same seam `HUDFACT` got. **Then the owner answered all six (`mq-v127`/`ch-v69`).** **The loop** — his pick plus one more thing: the world is no longer DRAWN behind a panel (measured 35fps → 0 → 36, and the loop's own clock still advancing, so nothing jumps when the paper goes down) and *"capture events if happening in background"* — a toast raised while a panel covers the world is **held**, not played out to nobody, and said when the cover lifts. The smoke counts the loop's decisions rather than WebGL frames, because a headless page throttles rAF to about two a second and a rate would be measuring the wrong thing. **The turn is eased** — 300ms with an ease-in-out, and a Settings row (Picture → Camera turn: instant · quick · easy · slow) because it is taste; **instant is exactly the old behaviour**. AJ's "too confusing" auto-turn was never wrong to turn, it was unannounced. Two old guards pinned the instant quarter and were rewritten to check where the turn LANDS. **The town never ends** — `ENDLESS=true`, a pack seam: a pack with no `CHAPTERS` gets a synthesised one, so answering Don Güero was running Meridian's last-day epilogue (Doña Chelo counting the drawer at El Mercado Robles) in a town with no mercado and no Chelo. Meridian declares nothing and ends as it always has. **Rosa's finding 2** — `.dbtn` carried a colour and *nothing else*, so every button that does something fell back to the browser's default at **21px** and flowed flush against its neighbours, while Copy and Download beside them were 68. Her three roles now: primary 48 full-width, secondary 44, quiet 40 unfilled, 12px gaps, nothing under a 44 hit area, and the copy buttons may never be the most prominent thing on the sheet. **Nacho on the loft** (the owner asked him directly): *"bare on purpose" is a placeholder wearing a rule's clothes* and he would not ship it — it breaks the owner's own rule that a place you cannot use is scenery pretending to be a place. His recommendation: **the loft is the workshop, not the office** — downstairs is what you wrote down, upstairs is what somebody is building right now (the town already reads open PRs via `SHOW_PERMITS`, switched off) — with one law in canon: **nothing that is waiting on you can climb those stairs.** No ❗, no write button, no count of what you owe, ever. He notes this is also where the multi-agent crew would live, and the guardrail holds there too: the loft may say what is being built, never who is waiting on you. His `arrive.f2` line is written to be true today with the room empty and still true after the build. He also gave the full deletion list for the inherited Meridian strings and warns `chat.beto` is a **key collision** with the town's own Beto Bujía. **Unbuilt and open:** the loft itself (needs Don Güero for the parcel, a window in `f2`, and a `town.smoke` law that nothing in `f2` carries a ❗), Nacho's 35 door lines, and the owner's larger ambition — *"help me run this game and testing, pretend to be a player, multiple agents working through the backlog together."* **That ambition now has an architecture: `docs/CITY-AS-MEMORY.md` (plan only, nothing built).** Its finding is that the substrate is already right — GitHub is the database, the town is a view over it, the engine is a set of seams — and only three things are missing. **Provenance:** issues say *what*, the docs say *why*, and nothing links them, so `docs/decisions/` becomes a store of one file per settled decision (asked · decided · because · touched · issues/PRs) with `ASKS.md` demoted to an index; a decision is not settled until it has a file. Pure documentation, no code, and the highest-value piece. **Claiming:** the label is the lock — `taken: <name>`, one agent one issue one branch one PR, stale after a session, owner-authored issues only; `record.js` already reads labels so the town can render it. **Presence:** a `CREW` seam, the one genuinely new engine seam — a pack declares which agents act in it and a crew member's line is what they hold right now. Plus a **quiet room** flag (`noAsk`) that makes Nacho's law machinery rather than a promise. **The loft is the meeting room**, which is the owner's instinct and completes rather than contradicts Nacho's workshop: `meeting-of-da-minds` already produces a transcript, a transcript is a document, documents already render as sheets — so a meeting produces a sheet, and that sheet filed as a decision closes the provenance gap by itself. **Meridian takes almost none of it** (a quest game with a fixed cast wants no crew, no claims, no meeting room) — every seam is opt-in, which is the session's standing rule: a fix that is a rule goes in the engine, a fix that is a choice becomes a seam. **On the agent limit:** there is no configured cap and inventing one would be worse than saying so. The real limits are the shared working tree (this session proved it twice — Rosa's fifteen scratch files were swept into a commit by `git add -A`, and Nacho could not write at all), git serialisation, and context cost (~240k tokens for Rosa's review, ~175k for Nacho's two passes). **The shape that works is three or four reviewers reading in parallel and one builder with the pen** — which is what this session actually ran. A second builder needs its own git worktree first. Build order: the decision store, claiming by label, `CREW` + the quiet room, the loft, Nacho's door lines. Also noted: **Rosa has no agent file** and cannot be recalled by name; anyone who reviews twice should have one. **Fixed the same day: the crew is now seven files in `.claude/agents/`** — Don Güero (city), Nacho (story), Pili (art), and four added when the owner asked whether the roles could exist: **Rosa** (interface, and she can now be recalled by name), **Chuy Ramírez** (staff engineer — correctness, which seam a change belongs in, what a test must prove; carries this repo's rules: rule→engine, choice→seam, red before green, `GAMEV`/`CACHE` together, and the known hazards including the two shells kept in lockstep by hand), **Tavo Rentería** (game design — what a mechanic asks and what it teaches by accident; holds that the town must never gain a win state), and **Yaz Contreras** (build and release — the four suites, the service worker, and the rule that a test pinning current behaviour can pin a bug, which has happened here). Three of them can run the game headless and measure. **Only one may hold the pen at a time** until worktree isolation is in place. **Then the owner asked for the rest of the personas, and a discovery reshaped them: El Changarrito's six house clerks ALREADY ARE the work-kinds** — Doña Remedios 🗂️ records and forms, Chuy 📎 docs and templates, Pili 🎨 how it looks, Beto Bujía 🔧 the engine, Doña Cuca 🔑 rooms and stairs, Nacho the words — built as the owner's backlog long before anyone thought about a crew. So the crew is named for the street it works on, which makes the `CREW` seam nearly free: a crew member's home is the house whose work it owns. **Thirteen agents now, mapped in `docs/CREW.md`.** Seven with a house (Remedios, Chuy, Pili, Beto, Cuca, Nacho, Don Güero) and six without (Rosa, Tavo, Yaz, Chava, Paty, Mari — playtester, EN/ES lockstep, and the producer who takes a new game from brief to first playable). One correction is recorded rather than hidden: the staff-engineer file was first written as `chuy`, which was wrong — Chuy keeps the paper shop; the engine is Beto's — so Chuy is now the docs-and-memory role he always was, which is also the archivist the decision store needs. `CREW.md` carries the two workflows the owner named (fixing something that exists; building a new game) and notes that the step people skip is **playing it** — three of this project's worst bugs were invisible from source and obvious the moment somebody looked at a screen. **`CITY-AS-MEMORY.md` §5¾ now answers what changes about git:** almost nothing. One branch per part, red before green, the owner merges, no agent merges its own work — all unchanged. What is new is a branch per ISSUE carrying its number, a `taken:` label claimed BEFORE the branch exists, one git worktree per builder, explicit `git add` paths instead of `-A`, and branch+worktree+label cleaned up on merge. No tooling, no bot, no webhook — a convention plus worktrees, which is most of why it is worth doing.

**Next (written 2026-09-08 at the owner's word):**

**FIRST — the owner's two items from the night's play (2026-09-08, "can you setup the next session for me"):**
 1. **The park in Noche de alebrijes still has overlay issues.** The one the owner named — the ofrenda under the
    string that crosses the path — is fixed here (`mq-v112`/`ch-v54`: both packs stand it at pk (6,2), open ground
    at the top of the bridge's section, no swag over it). **The rest is the next session's first job, a playtest:**
    walk the park in both seasons in all four cameras, shoot the bridge's foot, the trees, and the crossing string,
    and name what overlaps what. **First cause found and fixed 2026-09-08 (`mq-v113`/`ch-v55`):** the park's
    crossing swag ran along row 6 — the deck's own row — so the multicolour cut and the bridge's marigold cut
    tangled at the deck's north end; it moves to row 4 (still across the path, north of the crossing) and both
    suites now fail any swag sharing a bridge's row or column. Remaining suspects: the 3D swag planes crossing the deck's own papel over the bridge;
    the trail's petal planes and a prop sprite sharing a height; a tree's streamers hanging into a swag. One PR per
    cause, red first.
 2. **❗El camino — "the road in meridian doesnt make sense at the moment - don guero has to review."**
    Don Güero's sitting, planning only. The five questions: the street's trolley bed (`st` rows 2–3, `≈`, walkable,
    called a canal in the docs but never a tile); the lane on Calle Dos (`ex` row 9); the crossing between them
    (`2` at st (29,1) ↔ ex (0,3)) and to the park (pk (0,6)); where the trolley stops (`Y` at st (0,1), ex (23,3));
    and whether a person can walk HQ's door → Calle Dos → the park without stepping on the tracks. He returns one
    side quest with picks A/B/C, the owner picks, then one PR per road change with the reach audit red first.
    **Done 2026-09-08: he sat and answered** — ❗El camino is in CITY.md with picks A/B/C (A recommended: call it
    a street, crosswalks on Calle Dos, a kerb glyph, Doña Meche one tile east so the lane opens). Waiting on the
    owner's pick; then one PR per road change with the reach audit red first.

**A. The world.** (1) ❗El espejo — the owner picks A/B/C; B is three quests and a small `espejo` district after
Nolasco, half a sitting; the seam is `people.q` on Naye plus a `CHAPTERS` entry. (2) ❗La fachada — one cold read
for a barbershop glyph, or a sign on the casa's facade. (3) ❗Las versiones del puente (IDEAS §15.4½) — Nacho
argues the three candidates against the grief the bridge is for; one sitting of words, then one PR a version.
(4) ❗La ofrenda, refined — the owner's basics document (on the laptop, "store idea for my digital documents";
not found in Drive under ofrenda/altar/muertos/cempasúchil, nor in the "Gifted- game idea" folder by title):
paste it and `drawOfrenda` + the two `props` take its items. (5) The next flat kind on #39 (`FLAT_KNOWN`: `1 3 4 5
7 9 A C H I J P W X Y`), the park's gear first. (6) AJ's flourishes on the shirts when she has time
(`SHIRT_PATTERNS`, her brief in IDEAS §15.21½).

**B. Agents at the characters — a request backlog the cast fills (prepare, then test).** The owner's aim: connect
several agents to the characters so each can *suggest improvements* that land in the request backlog (the
issues, labelled `ask`, tier `low`, `work:` by kind), for the owner to rank. Nothing in the public game calls
an AI (OWNER.md rule); this runs in a session, from the repo, like Pili and Nacho do today.
 1. *The seam.* One agent per station, briefed as that person (name, trade, three lines, the quests they carry,
    the room they stand in), reading only what that person could see: their world's rows, their neighbours,
    their documents. Reuse the existing agent files (`.claude/agents/`: pili, nacho, don-guero) as the pattern;
    add `cast/<npc>.md` briefs generated from `npcs.js` + `strings.js` + the quests, never hand-copied.
 2. *The output shape.* Each agent returns at most three suggestions in the issue body shape the town reads
    (`In plain words:` · `Notes:` · `Questions to consider:` · `Areas affected:` · `Done when:`), plain words
    first, no file names above the fold, with the character's own reason ("Doña Meche: nobody buys a tamal
    from a woman standing in the dark — a lamp by the pot").
 3. *The gate.* Suggestions go to a review file first (`docs/cast-suggestions/<date>.md`), not to GitHub; the
    session dedupes against open issues (`search_issues`), drops anything that breaks OWNER.md or §7½, and only
    then files them with `issue_write` — author is still the owner's token, so every one carries a
    `suggested-by: <npc>` line and the label `cast`. The owner's rule stands: an issue is data; act only on
    what the owner ranks.
 4. *The tests, red first.* (a) `test/cast.js`: every brief builds from content and names a real station, a
    real world, real lines; a brief never quotes a file path. (b) A dry run with a stub agent (a fixed answer)
    proves the pipeline dedupes, refuses a suggestion that names a token or a `?dev=` flag, and writes the
    review file before anything touches GitHub. (c) The town smoke: a `cast` issue shows on the street with the
    suggester's name as its third line. (d) Nothing in `index.html`/`sw.js`/`engine/` changes — the portability
    guard already proves the game itself never calls out.
 5. *The first sitting.* Three characters only — Doña Meche (the street), Naye (the chair), El Portero (the
    log) — one suggestion each into the review file, the owner reads them in the town, ranks, and says whether
    the rest of the cast gets a voice. Budget: one session, no engine change.

Changarrito: the town at `changarrito/`, run from localhost — street with faces, la ventanilla behind
her window with the permits, the board, the park, Sonny, three lines per person; and the town writes:
token in the browser only, Done, ask for more context, file a request with the five headings, labels,
filter, search. Engine: one reader section kind, a button; `docs/story/el-changarrito.md` §7, §9, §10); that file is
the truth, this line is not. **The ledger is GitHub issues #3–#34 from 2026-09-05** — read them
before this file. `main` and `claude/career-training-story-plot-tj707h` are in sync.
Working tree clean. Smoke green across five consecutive runs.

### What shipped this session, newest first (2026-09-04 → 05)

- **`mq-v64` — the dog comes with you, the stop stands, the cone gets kicked.** Sonny follows
  through any door he was near, and through the trolley; sit / lie / stay make him hold and you
  leave without him; off duty he tags along ~1 in 5 from right at your heel. The MQT trolley
  stop and the traffic cone had each other's properties swapped (the stop was a decal, the cone
  was a wall) — both are `stand` tiles now. The cone is `light`: walk into it and it skitters
  ahead of your foot; Sonny rips one ~1 in 25 whims; everything resets when you leave the room
  (no save key — the owner's own scope, *"for now"*). Two ways the world could change and only
  one arrived: `openTravel` (the trolley) skipped every arrival step until both routes were
  made to call one `worldArrived()`. The trolley stop's art moved out of the engine — it
  spelled this pack's brand in engine code — and a test now forbids it coming back.
  **The mistake undone:** making the cone non-solid deleted it from the iso camera; the first
  fix routed stand tiles into `isoBlock()`, which paints flat faces and never the art — a
  featureless pillar that every metadata check waved through. Replaced with a billboard pass;
  smoke now counts *which drawing* each camera calls (IDEAS §15.28–29).
- **`mq-v63` — the stairs stand up, and a building has faces.** The stairs were never badly
  drawn; they were *lying down* — walkable, so three of four cameras painted the top-down art
  flat on the floor. A third tile category, `stand:true` (walkable, but an object), fixed it
  and retired a hardcoded `"345"` glyph list from engine3d.js. Pili redrew the stairs in plan
  and profile; HQ's arrow now points *up*. And two numbers meant no building had faces: 3D
  ambient 0.95 / sun 0.5 clipped three of five faces to white; now 0.66/0.42 plus a baked
  contact shadow, held by arithmetic in smoke §32 (IDEAS §15.25–26).
- **`mq-v62` — paper a neighbour puts in your hands.** Six documents characters hand over
  mid-quest at the nodes where the answer is *in* the paper: Chelo's eleven-item list, the
  invoice evaluation run, the incident transcript with "be helpful" as the root cause, ten
  weeks of bakery forecast, the old lead's glovebox rollout plan, Bere's fifty-two. `doc:"id"`
  on a node → the stapled-paper reader with Copy/Download. Handed paper is recorded (save key
  `hd`) and listed in the office file under *What people handed you*. Three real bugs found by
  measuring, not trusting flags — the reader opened at 0×0 inside a hidden panel.
- **Ledger corrections**, each verified against code before changing a word: `CITY.md` header
  and open-parcels list (three of four "open" lots had businesses on them), `HANDOFF.md`
  (claimed 24 quests / MAXXP 350 against 56 / 830), `maps.js` DECOR comment, `IDEAS.md` §15.8
  and §15.11 on the stairs, `templates/README.md` (undersold six of seven generated templates),
  `ASKS.md`'s "FitCheck: nothing to inherit" row (true when written, false when asked).
  Then la junta's A4 batch closed (2026-09-05): the ventanilla deferral dated in `STORY.md`,
  `OWNER.md` and `IDEAS.md` now say 3D is the default camera, `config.js`'s gifts comment
  matches the five gifts, and `PLAYTEST.md` no longer grades the ending by hearts.

### Decisions the owner made this session (verbatim, in `docs/ASKS.md`)

- **Office:** *"ok for now we are ok with the office. i think we can def improve but for now
  its ok"* — parked, not dropped.
- **Staircase:** *"i think that we can make the building bigger, fit in a proper staircase.
  move it out of a tiny room if needed."* — supersedes "its own hall"; enlarge HQ. **Not
  built** (*"dont build"*). Recorded in `CITY.md` ❗La caja de escalera.
- **House template:** the casita's door `▦` is a solid wall drawn as a door — in `SOLIDX`, in
  no `DOORS`, in no `PORTALS` — which is the whole of *"i cant enter the houses."* Agreed
  direction (Don Güero and the session independently): close it honestly as a reja, and give
  `buildSafe()` teeth — a build may not draw a door it cannot open. Not built.
- **The other session's recommendations** (FitCheck Salvage Manifest, Bones to Meshes): read,
  assessed in IDEAS §15.27 — the SDF prop forge is *not now* for a pixel-art game with no mesh
  pipeline; the stale-docs rule from the manifest was adopted.

### Open, and waiting on the owner

- ❗La caja de escalera — where the enlarged HQ puts a proper flight (Don Güero sites it).
- ❗El escalón de Dana — Legal stands in the stair hall; leave her (recommended).
- ❗El solar de la Calle Dos — `ex` row 10, the last real frontage; leave on the shelf (recommended).
- ❗El zaguán — Nolasco: up through a door, down through stairs.
- ❗El portero — what a refused build says, and to whom.
- **The four newest districts have never been human-played.** Still the real gate.

### Written this session, no code

- `docs/NEW-WORLD.md` — the template for starting another world/town/city: the nine files,
  which globals are required vs optional (verified by `typeof` guards), the three hardcoded
  switch points, the engine debt a second world hits (62 hardcoded world ids), the rules
  that travel, a build order.
- `docs/PROMPTS.md` — the three smallest prompts that make a better version of this exercise,
  each tied to the failure its absence caused here.
- `docs/meetings/2026-09-05-el-experto.md` — the second meeting: Don Güero and Nacho briefed
  a gaming expert (a guest with no lane to defend); two verifiers cross-examined his top six
  against the engine and the owner's rules. One call per item, a build order, 23 reported
  contradictions, and the learning: *a queue is a gate with a face; write every quest as if
  it could come last; every solid piece wears its drawing on all four sides; a staircase is
  length, enclosure and the same footprint on both floors — never height.*
- `docs/IDEAS.md` §15.25–15.29 — the stand tile, the light ladder, the salvage review, the
  iso slab mistake, and "two ways the world changes, one arrived".

### The lessons that outlive the session

1. **Measure, never trust a flag.** `.hidden=false` at 0×0 passed every assertion.
2. **A test that calls the function proves the function, not the wiring.** Drive `tryStep`,
   `tryPortal`, or a real click; break the wire and watch it fail.
3. **When a thing reads wrong in some cameras and right in one, it is plumbing, not art.**
4. **"It appears in all four cameras" ≠ "it is drawn right in all four."** Count the calls.
5. **A doc that records a version or a built/not-built state must name where the truth
   lives**, or it goes stale silently — twice now.
6. **Every ask is quoted verbatim before building.** Paraphrase is how requirements die.

---

## STATE OF PLAY — earlier state of play (2026-09-02, late)

**NEWEST — 2026-09-03, `mq-v60`: templates, and two process fixes the owner asked for.**
Owner: *"i keep seeing you miss testing opportunities and requirements are falling through."*
Both were true, and both now have machinery rather than good intentions:
- **`docs/ASKS.md`** — every ask, quoted verbatim, with where it landed. Fill it in BEFORE
  building. An ask answered in conversation and never built is still open.
- **Smoke §28, the discoverability audit** — for every world, from every way in, everything
  readable is marked, the place names itself in both languages, and a door with somebody
  waiting behind it says so. This is the general form of the two bugs that shipped on
  2026-09-03 (the invisible stairs, the invisible posters).

**And the feature:** `BUILDTPL` / `BUILDS` — Don Güero builds from a template with seeded
variation (IDEAS §15.22). Deterministic, picks pinned in the save, parts that read each
other, and every build validated before a tile lands — which immediately refused to build
the first casita on top of Yola the paletera. **No casita stands on the street** — both came
back off at `mq-v61`, owner: *"noone asked me to make them i was saying it is just an ability"*
and *"i cant enter the houses."* `BUILDS` is an empty array with the restore lines in a
comment; the ability is tested and unbuilt, which is where it stays until a house can be
entered.

**NEWEST — 2026-09-03, `mq-v56`:** settings became four drawers that remember what you keep
open (actions stay outside them, guarded by a test); decor is drawn in ALL FOUR cameras, with a
mural on a solid tile treated as paint on that wall's open face in 3D; and
`node test/shots.js --cams` sweeps every spot in every camera. **Left from la junta:** the grade
seam (small — `gradeOf` and the `flags` object both already exist) and then the mural's six
panels. See IDEAS §15.17.

**NEWEST — 2026-09-03 late, `mq-v55`: the city produces paper you can read.** A new pack file
`content/meridian/docs.js` (READS + DOCS), a cream breathing marker that never clears, a Read
button that always answers, and a full-screen stapled-paper reader with Copy and Download as
markdown. Six blank sheets hang in the office from day one; each district's Saturday pins its
real document over one, filled from the player's actual answers. The old lead's desk is the
machine: the note in the lid, the complete file, and the glossary. **The meeting was wrong that
the record could not fill a memo** — `logDecision` has always stored the pick. See IDEAS §15.16.
**Still open from la junta:** settings folding into four groups, the four-camera screenshot loop,
decor in iso and 3D, the grade seam, and the mural.

**NEWEST — 2026-09-03, la junta.** First `/meeting-of-da-minds`: Nacho, Don Güero, **Pili
la piñatera** (new standing expert, 3D and readability) and two guests answered the owner's
six open questions; an engine-loyal reader cross-examined; a critic found four real errors in
the chair's plan, all verified in the code by the session. **Read
`docs/meetings/2026-09-03-la-junta.md` corrections section before building any of it** — the
build order in `docs/BACKLOG.md` §7 is the corrected one. Headlines: the stair arrow alone does
NOT solve wayfinding (`doorMarks` only reaches 3 tiles; the answer is `roomInvite()` asked about
a portal's destination); the grade seam is three-quarters built already; the office gifts empty
the room instead of filling it; and **the engine hardcodes 35 world ids**, so no pack-safety
claim in this project has ever been audited. Nothing was built — the owner sees the readout first.

**NEWEST — 2026-09-03: six playtest reports fixed, `mq-v52` on `main`** (IDEAS §15.13).
The big one: `sanitizeSave()` dropped the district counter and the grades, so every
Continue reset `chSeen` to zero — the last Saturday replayed on the next open, and the boot
path into an ending never sized the canvas (a blank street under the control hint). Fixed,
with damaged saves repaired at Continue and a smoke section that plays the whole sequence.
Also: laptop keys (capitals, key codes), the growth curtain, 3D furniture as boxes when a
side view exists, animals painted for the camera stop (Sonny's ball), and a one-time toast
for a lot that opened while the phone was away. **The owner's own save will play the
mercado's Saturday once more** (its counter was reset by the bug); after "Out to the
street" the taller's toast points at the southeast lot. Then play the taller.

**NEWEST — 2026-09-02, night: the rest of the story is written and wired, `mq-v51` on
`main`.** Owner: *"i want the rest of the story for my ai practice... now please if
possible."* Nacho planned all four districts (`docs/story/las-cuatro-puertas.md` — the
plan, and at its top the four calls made with his picks); four writer agents drafted the
32 quests (24-55) EN+ES against a validator that enforces the mercado's shape; CHAPTERS
now carries six districts, each with its own three endings, burnout and next-lot toast;
`MAXXP` is 830; the report prints *industry · role*; templates 06 and 07 exist; the cats
are Tuerca, Bolillo, Pelusa, Timbre. **Not built, on purpose and written down:** ❗El
recado (a quest played away from its lot), any world change keyed to a grade, the window's
view advancing. **The next gate is a human playing the mercado** — the four new packs copy
its shape and will be revised against what the owner says after playing it. Then S6.

**MERGED TO `main` at `mq-v46`.** The branch carried the whole **S0 sitting (el 3D y el
mundo, `mq-v45`)** and then **S2 v1 — the room upstairs**; the owner said *"merge
everything once you have the first version of the room work"*, so both are live. A phone
that has the game installed picks up `mq-v46` on its next open. **The version now shows
on the opening page** (and still in Settings), so nobody has to guess what a phone loaded.

**What the room work shipped, each with a test that was red first:** Floor 2 opens
bare — one desk under the north wall, the stairs, nothing else (as signed). Nacho and
Don Güero stand a few steps from the stairs, with a ❗ while they still have a question.
Between them they ask nine questions with no wrong answers, no XP, nothing in the
career report: Nacho asks how the room should feel, Güero asks what has to be built.
Answers live on the phone (`mqroom`), never in the save, never touched by restart. After
the last question the sheet appears on the card with **Copy the sheet**, and it is also
under Settings → Export → *The room*. Everything with a name is in
`content/meridian/room.js`; the engine reads only shapes, and a pack with no `room.js`
gets no people, no tab and no storage key (tested with the file blocked). Nacho no longer
stands on the street — one Nacho, upstairs.

**How the back-and-forth works, with no API:** AJ answers on her phone → the owner taps
*Copy the sheet* → pastes it to Claude with `/room-design` → the build session furnishes
the room from her words. Spec, cold read and the four open owner calls:
`docs/rooms/aj-office.md`.

**Later the same day (on the branch at `mq-v47`, not merged):** the owner handed the
window to Nacho and Don Güero together. Built: three panes in the north wall over the old
desk, the pack's first tile file (`content/meridian/art.js`), the view north toward
Barrio Norte, the sky taking the season. And "who is the room for" became Don Güero's
first question (ten questions now); his last question was sharpened to seating so the two
bookend instead of repeating. Nacho's closing line pins the sheet to the window frame.
A player who finished the interview before gets the ❗ back over Güero — he has a new
question, which is the badge meaning what it always means.

**And later still (branch, `mq-v48`):** the owner chose MID-MOVE — four taped boxes on the
pack's second glyph (`□`, cold-read clean), Don Güero's cone, a plant in its pot; the
sight line from the stairs to the window and the arrival tile stay clear, under test.
Don Güero's furniture catalogue with per-piece estimates is `docs/BACKLOG.md` §6; his
four follow-up questions are `docs/rooms/aj-office.md` §10. The two limits the owner
thought were fixed (the 200-entry record, one storefront) are fixed now.

**Also on this branch (`mq-v49`):** the owner's two visual reports answered — doors in 3D
get a light frame and a bigger light pool; furniture gets side views (`TILESIDE`, IDEAS
§15.11) starting with the table, the counter and the stove, and the barricade no longer
reads as a ladder. Any other prop the owner names gets a side view the same way.

**Also (branch, `mq-v50`):** four reports from the owner's phone fixed (IDEAS §15.12): the
pigeon no longer steals the tap meant for Don Güero, a marker floats over doors you are
near, construction fences stand along their run in 3D. And two more ceiling items fell
for the four new districts: per-district ending strings (`CHAPTERS[i].epi/go/open`) and
looks keyed by npc id. **The rest of the story is in production** — Nacho's four-district
plan and Don Güero's four lots were commissioned this sitting; see the state of the
branch and `docs/story/` when they land.

**Deliberately not yet:** nothing changes in the room while she answers (the deliveries —
an eighth of a sitting of engine work, the rest is drawing); the window's view advancing a
stage per finished business (content-only, but not testable until districts close).

**Still true and still the trap:** several models work this repo at once. Do the
divergence check in step 1b below before reading a single line of engine code, and never
quote a version number to the owner without checking what `main` actually serves. This
session's own resume summary lost the S0 sitting once — the branch knew, the summary did
not. `git log` first, always.

**Three of the ceiling's seven items fell on 2026-09-02** because the owner asked ("I
thought we fixed this 200 entries thing and not stopping at a certain amount of store
fronts"): the record keeps every decision, storefronts are a list (`ribbons[]`, the old
singular still works), and each storefront declares its own handover doorstep. Still
standing, and still what a THIRD district needs before it can end: per-district epilogues
(`finish()` has two sets), the `NPCLOOK` letter collision, and `GROWTH` reading a grade.

**Next is S1 — la cimentación** (backlog §1), now smaller. Nothing visible ships from it
and that is said out loud. It is also what the office furniture waits on.

## The backlog lives in `docs/BACKLOG.md`

*El changarrito de Don Güero* — one ranked list of everything queued, with costs, so
nobody has to reconcile `IDEAS.md`, `CITY.md` and this file to find out what is next.
Opened 2026-09-02 at the owner's ask. **Read it before planning; update it when
something ships or a decision lands.**

## Resume ritual

0. **Read `docs/OWNER.md`** — the owner's standing rules (settled decisions, taste,
   how to bring them a choice, and the referee → browse-and-approve ladder). New
   2026-08-31; both planner skills now read it before planning.
1. Read `docs/HANDOFF.md` (state + shipping rules), `docs/CITY.md` (city ledger),
   and this queue. Skim `docs/IDEAS.md` §6-9 for the designed-but-unbuilt backlog.
1b. **DIVERGENCE CHECK — do this before reading a single line of engine code.**
   Other models are working this repo at the same time (docs/OWNER.md → Settled).
   Run all three, every session:
   ```
   git fetch origin
   git log --oneline HEAD..origin/main     # landed without you — merge it in FIRST
   git log --oneline origin/main..HEAD     # yours, and NOT deployed yet
   git branch -r                           # who else is mid-flight
   ```
   If the first command prints anything, **merge `origin/main` before investigating**.
   On 2026-09-01 a session spent a round root-causing a 3D bug from a base that
   predated two fixes for it already sitting on `main`. Stale reading is worse than
   no reading. Expect `mq-vN` pins to collide on the merge; resolve FORWARD.
1c. **THE 3D/WORLD SESSION is queued and fully specced — `docs/IDEAS.md` §15.**
   Do it as ONE sitting, in this order: ~~the doorway re-entry bug~~ (**done 2026-09-02**,
   §15.6a — `tryPortal()` + `portalHold`, test in smoke) → ~~doors facing the
   wrong way in 3D and the orientation-blind walls behind them~~ (**done 2026-09-02**,
   §15.3 — one new finding logged there: a wall between you and the camera) → ~~the blur bake
   at device resolution~~ (**done 2026-09-02**, §15.1 — K at every bake site) → the rainbow bridge
   arch + Day of the Dead palette (§15.4, needs an owner sign-off on the palette).
   Use `node test/shots.js` before AND after — it is the only check that can see a door
   lying on the floor.
   **Ride-alongs the owner assigned to this same sitting:** ~~the storefront legibility
   fixes~~ (**done 2026-09-02**, §15.8 — bowl in La Cocina's window, `DOORLOOK` per door,
   desk/table/scale redrawn; all re-read cold) and the `SEASONS` seam (§15.9 — one
   autumn season on the Día de Muertos palette, auto by date with a Settings override,
   bridge only as the proving run — **seam done 2026-09-02**, palette awaiting sign-off).
   Elevation (§15.10) is NOT in this sitting — it waits
   for a second thing that needs it.
   **After this sitting the cold read is permanent**, not a one-off: it is step 2b of
   the shipping checklist in `docs/HANDOFF.md` and a Settled rule in `docs/OWNER.md`.
2. Work on a `claude/...` session branch; merge to `main` only when the owner says
   (main auto-deploys to GitHub Pages; installed PWAs update after one refresh).
   **The owner sees `main` and nothing else** — if work is not merged, say so plainly
   rather than reporting a version number they cannot load.
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

1. **Playtest everything** — the mercado chapter AND today's upgrades (lighting at
   night, palette wardrobe, tune picker, NPC editing) have not been human-played.
   `/playtest` guides; quest copy and feel are the deliverables.
2. **Phase 2 — `/nacho` is DONE (2026-09-01); `/don-guero` is next.** The arc past
   the mercado is planned and four story decisions are SIGNED into `docs/STORY.md`:
   ❗La vía (the trolley brings customers *and* a franchise scouting the north end),
   ❗La carta (**referrals** — Chelo phones ahead and what she says is the grade you
   earned; the barrio is the player's reference letter and every business is a job
   interview), ❗Tacho (the old mechanic never comes around, and that's the win),
   ❗El listón + ❗El día (la inauguración plays in the world in five diegetic
   seconds; the day turns over while the player is away and the street remembers).
   Three of those graduated to `docs/OWNER.md` → Settled. Taller Herrera is cast,
   escalated across 8 quests, given three grade endings and a voice guide — a build
   session can write EN+ES from `docs/STORY.md` → "Phase 2 — Taller Herrera".
   **Run `/don-guero` for the parcel half before building** (st southeast lot, `ta`).
   Nacho's finding worth carrying: the quests train the roles, the arc did not —
   the role was a label in `config.js` nobody in the world ever said. Referrals,
   naming the role out of a character's mouth, and giving the decision report a
   reader in the world are the three fixes, now canon.
2a. **DONE 2026-09-01 — the open city shipped, and so did the story canon it needed.**
   `qOpen` fixed (districts open and stay open), `week1` `need` 16 → 12, nine strings
   rewritten EN+ES, 24 `late` reframe lines added, nine continuity breaks fixed, the
   world-tag ❗ un-hardcoded. sw + GAMEV `mq-v40`, smoke extended and green.
   **What is left for the customization pass is written up in `docs/STORY.md` →
   "Bible vs. game text — OPEN"** — four items, each with options: the burnout
   epilogues belong to a mode that ships off; which calendar survives into the
   reusable template (the `week1` ID half is DONE — renamed `principal`; the words in the
   fiction remain open); ambient chat has no
   state; and Nacho's preferred Week One split (office 0-9 / barrio 10-15 as two
   districts with two Saturdays) which would make the barrio floor structural instead
   of arithmetic — queued for the Taller Herrera session.
2b-old. **Story canon the shipped game contradicts** (`docs/STORY.md` → "🚩 Bible vs.
   game text — signed, NOT BUILT"). Three, in cost order: `qOpen` at
   `engine/engine.js:146` still gates on `chSeen` so districts close behind the
   player (highest story cost — the barrio takes things away); "Roll credits" ends
   all three mercado epilogues against Settled "the city has no credits"
   (**replacement copy EN+ES is written and ready to drop in**); and `in3` still
   threatens "the week resets" while `STAKES.mode` ships as `none` (copy not yet
   written — Nacho's lane).
2b. **Phase 2 detail is already planned** (added by the /don-guero session, see
   CITY.md → "The open city — Phases 2-5"): weeks are retired, `CHAPTERS` becomes
   districts that do NOT close behind the player, and all four remaining businesses
   are cast and scoped — Taller Herrera (automation consultant, st southeast lot),
   Panadería La Espiga (ops analyst), Limpieza Velázquez (implementation lead),
   Nolasco Tax & Notario (prompt engineer). One per sitting. **Correction 2026-09-01:
   the stakes layer and the per-business grade DID ship** (`STAKES={mode:"none"}` in
   config, `gradeOf()` at `engine/engine.js:131`) — earlier queue text calling them
   signed-not-built was wrong. The one real gap left is **the open city itself**:
   `qOpen` at `engine/engine.js:146` still gates on `chSeen`, so districts close
   behind the player. Do that refactor before the taller; the taller depends on it,
   and Nacho's referral spine assumes every door stays open.
2c. **MERGE NOTE 2026-09-01.** This branch (story/open-city) and the pet/3D lineage
   both bumped to mq-v40 independently and were merged here; the merged tree is
   **mq-v42**. Nothing was dropped from either side. The story branch was cut from
   1774116, i.e. BEFORE the two 3D blur fixes, so any 3D reading taken on that
   branch alone was stale — check `engine/engine3d.js` on the merged tree.

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

- `main` = deployed through **`mq-v61`** (2026-09-03). Nothing waits on a branch.
- **Anything in this file that records a version, a count, or a built/not-built state must say
  where the truth lives** — a doc that states a fact without naming its source goes stale
  silently, and this one has done it twice. For the version, the source is `CACHE` in `sw.js`.
  For what is built, the source is the code, not the plan. (Borrowed 2026-09-04 from the
  FitCheck salvage manifest, which caught the same failure in another repo: a doc claiming 41
  tests against a reality of 169. IDEAS §15.27.)
  *(This line has now been stale twice: it said `mq-v40` when the truth was v44, caught in
  the 2026-09-01 sweep, and said `v44` when the truth was v61, caught 2026-09-04. The
  version of record is `CACHE` in `sw.js`; when those two disagree, `sw.js` is right.)*
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
