# El experto — the meeting of 2026-09-05

*Second run of `/meeting-of-da-minds`, in a new shape the owner asked for: **Don Güero** (city) and **Nacho** (story) each wrote a briefing; a **gaming expert** — a guest with no lane to defend — read both against the files and answered; then two verifiers cross-examined his top six, one reading the engine and one reading the ledgers and the owner's rules; the chair checked the disputed points in the code and wrote this. State of record: `mq-v64` in `sw.js`, `HEAD e139221`. The brief called the tree clean; it is not — `docs/ASKS.md`, `docs/CITY.md`, `docs/NEXT-SESSION.md` are mid-edit and `docs/NEW-WORLD.md`, `docs/PROMPTS.md` are new. Code files are clean.*

**Agenda, in the owner's words (2026-09-05):**
> *"we should have a gaming expert agent get the low down from don guero and nacho about the game state and try to get more recs."*
> *"i think that we can make the building bigger, fit in a proper staircase. move it out of a tiny room if needed."*
> *"ok cool dont build, just give me that."*

Words used below, once: a **tile letter** is one character in the map text; a **portal tile** is the one that moves you to another map; the **boot camera** is the 3D view the game opens in; a **sitting** is one working session.

---

## STATUS

**Nothing is built.** This is a plan with a build order, waiting on the owner. Every number of tiles and every line number was read from the tree at `e139221`.

## THE CORRECTIONS — where the verifiers changed the expert's answer, checked in the code

The house rule from la junta holds: where this section disagrees with the expert, this section is what was verified.

1. **"The doorstep ending fixes the Saturday-after-the-Saturday for free, without gating anything." FALSE — both verifiers, confirmed.** The ❗ over a person serves that person's quests **in order** (`pendingAt`, `npcs.js:12-18`). Put the goodbye behind the queue and it waits behind *every* open quest the owner holds: Chelo holds 16, 17, 23 — answer Nando, Perla and Chava first (five, bar met) and the taller does not rise until 8 of 8. That is the full-sweep ending the owner reversed at ❗La puerta ("drop it to 12"). The doorstep ending survives on its own merits as the signed shape; the "free fix" does not. Fix below.
2. **The staircase site fails twice — both verifiers, measured by the chair.** The camera sits 7.4 tiles behind you and 6.2 high; a wall is about 1.1 tall (`engine3d.js:186, :406`). A wall on the tile directly behind you hides everything but your head; one floor tile between you and the wall clears your feet. The expert's flight runs along the one new row that has the outer wall directly behind it — hidden the whole way in the camera the game opens in. And the piece that carries the flight drawing north of that row is Dr. Okafor's south wall, and every solid piece wears its drawing on all four sides (`engine3d.js:240`) — a staircase painted inside a doctor's office when you turn the camera. The expert's *shape* stands; his *site* does not. Fixed below, and the fix is two rows, not one.
3. **Nolasco's door face is a portal image, and it reuses a drawing that does not exist. Dropped.** The avenue door sits in the map's top edge — there is nothing behind it, so "steps visible inside" can only be steps painted on the door slab, which the owner refused twice ("not just portal images", the bus stop, the train-to-floor). The "HQ shaft glyph" the expert reuses is not in any file; `docs/CITY.md:220` says those letters are *unused*, not reserved. What survives is one word of content, below.
4. **The jacket is the finale's.** `docs/STORY.md:278`: *"the jacket is for la inauguración."* At quest 52 Bere says Xochi is *making* one. The expert handed it out three quests early and absorbed a contradiction instead of reporting it. Also: there is no hero wardrobe (Xochi's fitting room has two tabs, Frederick and Canela), the crew-shirt line is quest 44's *opening* sentence, not quest 46's reward, and "Vero's crew" on the map is one man, Chente. Fixed below.
5. **Rewriting the intro is Nacho's lane, and card one is the bible's first line.** "The old lead fine-tuned something he shouldn't have and was never seen again" is a planted thread — four hidden pages, a laptop still logged in, a name in older handwriting on Chelo's wall. And a new game *does* start in an office. The expert's instinct (the cards never say *barrio*) is Nacho's own complaint too; the fix is one sentence, his.
6. **Where the verifiers were wrong, and the expert stands:**
   - "Don Güero's question is unverifiable" — it is question 4 of his briefing for this meeting. The attribution is right.
   - The rules verifier's alternative site — a north-south well against the east wall, "no engine change" — does not work: a north-south flight's drawing faces east or west and is invisible in the boot camera, and there is no column to spare on the east side without cutting through three rooms with quest stations. The expert's *east-west* rule is right and is kept.
   - "Violates a rule" on the Nolasco item is right about the face and wrong about the whole: the arrow word and the upstairs end are legal and cheap.
   - "Two sittings" for the doorstep ending is right for five districts; the call below is one district, and that is a sitting plus Nacho's words.

---

## THE VOICES

**Don Güero** — the city is twelve maps, six districts, 56 quests, 830 XP, thirty-two named people and a beagle. A new business is a content edit and four of them prove it. His weakest: four districts nobody has played sit behind seventeen answers; his own Calle Dos frontage has no crossing; the two casitas and the trolley shortcut were his and both came off; the town plan cannot tell upstairs from downstairs. His ask: where does the real staircase go now that the owner will enlarge HQ.

**Nacho** — the game is a barrio learning to use AI without losing itself. Failure is a scene, not a wall; the grade lives in the last sentence of every ending, said by a neighbour to the next one; six documents get held out mid-quest; the trade word arrives after the right answer, from the mouth that needs it. His weakest: the ending fires on whichever answer is fifth, so the quest called *The Saturday* often plays after the Saturday and one of his own lines now contradicts its own ending; the title ladder is spent by quest twelve; Week One is the longest district and the thinnest; the intro sells an office game.

**The expert** — Meridian is "a walk-and-talk case book, not an RPG and not a builder"; closest to a bilingual visual novel spread over a small town you can wander. Its loop is sound and its best idea is that failure is a scene. Its risks are not code: thirty-two quests nobody has heard out loud, a first screen that promises a different game, a stair that failed as architecture rather than as art. He answered nine questions, gave eight recommendations, a staircase design, a playtest plan and a twelve-line list of what not to build.

---

## THE CALLS — one per item

### 1. The proper staircase — two rows, the flight along the front of the main floor

**The expert's read, which stands.** The old stair was never bad art; it was bad architecture — one tile in a closet where Dana also stands. Without height, a staircase reads as real through three things: **length** (you walk along it before you leave it), **enclosure** (it has its own space, nobody's office), and **consistency** (the same tiles in the same place on both floors, so the building is one building). Top-down games have drawn stairs this way for thirty years; nobody calls it fake. So the height field (`IDEAS.md` §15.10 — movement plus three drawing passes) is **not needed**; it becomes the answer only if the owner ever wants to *see* the climb.

Two facts in the engine shape the design, both satisfied by content: every portal tile is keyed by its letter per map (`maps.js:173`), so a flight of three `1`s would warp you on the first step — a proper flight needs a second letter, **a step you can stand on that leads nowhere**; and the boot camera looks north, so **the flight drawing must sit on something solid directly north of the walk**, facing south. That is why the flight runs east-west. The expert had both right. One correction: the walkable steps must be plain floor art, *not* standing cutouts — three standing cutouts in a row draw three little staircases side by side (`engine3d.js:223`, the §15.25 lesson again).

**The smallest enlargement that earns it: two rows. HQ and Floor 2 go from 20×14 to 20×16.** One row cannot: the only new row would be the one with the outer wall directly behind you, and the camera hides you there (correction 2). The site the chair found that meets every constraint inside two rows — offered as the default; **Don Güero sites it**:

- **Row 13 (new) is the walk:** the landing at (10,13) straight up from the door, three steps east at (11–13,13), the head `1` at (14,13) wearing the up-arrow. The head keeps the letter `1` because the portal and the arrow key on it; its drawing becomes the last step, not a whole flight.
- **The flight drawing sits on four new solid tiles at (11–14,12)**, taking four tiles off the south edge of the main floor. Their back faces the same room — from the rotated south stop you see the back of a staircase drawn as its front. Imperfect and upgradeable, and in the right room; the east-corner site put it in Dr. Okafor's office.
- **Row 14 (new) is a lobby** you walk into from the front door, now at (10,15). You come in, and the staircase rises to your right along the back of the lobby — the expert's "lobby" read, kept.
- **Camila's room** (x1–6, y11–12) gets a south wall drawn under it; the east rooms end at row 12 as today, with wall at (15–19,13) closing the head of the flight.
- **Upstairs, the same five tiles at the same place.** You arrive at the head (14,13), walk west "down" the steps to (10,13), which takes you back to HQ's landing. Beside the walk, row 12 carries **a rail, not a shaft** — a low solid piece, one new drawing — because a wall-tall flight upstairs reads as stairs to a third floor that does not exist (both verifiers; the expert's "identical on both floors" was wrong by that one piece). The old stair leaves Dana's alcove; she keeps her room — ❗El escalón de Dana closes with a yes.

**One row would do only if the wall fade ships** (item 2). Take two rows and let the staircase not wait on an engine decision.

**What it touches, honestly:** `PORTALS.hq/f2/st.E` (arrival tiles move); Floor 2's smoke pins at `test/smoke.js:1425-1436` (the 20×14 pin, the letter whitelist, the `1` at (18,11), the arrival tile, and the sight line to the window — **recomputed from the new arrival, not re-signed**; "nothing in the way" is an answer a player can pick, so it has to be true); four screenshot spots (02, 10, 12, 44); the line "the file cabinet IS the box by the stairs" (`config.js:77`, `BACKLOG.md` §6, `smoke.js:1897`) — the box by the new stairs is (14,11), the dog bed's; swap the two gifts or the sentence; the comment at `maps.js:173`. The iso camera will show the shaft as a plain block, as it shows the window today — three cameras of four carry the drawing, say so. Cold read: a step tile alone reads as a gate (`engine.js:561`); draw it with a stringer edge before `node test/tilesheet.js` sees it.

**Cost: a sitting** — two map rows on two floors, two new tile letters with plan and side drawings, portals, the assertions above each proven to fail first, the tilesheet. Don Güero half an hour to confirm the site.

### 2. The wall that hides you — its own decision, not a rider

The expert bundled "fade the wall between camera and hero" into the staircase; the rules verifier is right that nobody asked for it and `BACKLOG.md` item 10 lists three fixes, "not chosen". But the bug is real **today**: HQ's arrival tile (10,12) has the outer wall directly behind it, so the owner walks into his own building with only his head showing, every boot. **Bring it as its own question** (below), recommended yes: fade the wall box between camera and hero, pack-agnostic, **an hour or two**, after the staircase. If yes, every south wall in the city stops hiding people at once.

### 3. Nolasco's walk-up — one word now, the well later, the face never

- **Now, minutes:** `mark:"up"` on the avenue door (`PORTALS.st["$"]`). The arrow language already exists (`engine.js:2113`, used only on HQ's stair); the door then wears ⬆ within three tiles in all four cameras with zero art. That is "from Calle Principal you can see it goes up" in one word.
- **With the staircase:** the rail piece Floor 2 gets goes at Nolasco's `1` too — it is the *top* of a flight going down, exactly Floor 2's case, not HQ's.
- **The real answer, later, a third of a sitting:** a stair-hall map between the avenue door and the office. The quest copy already describes it — *"Forty questions a day come up those stairs"*, *"leaves the person on the stairs believing they were refused"*, *"The stairs are still full"* (`quests.en.js:541, :553, :615`). People on a public stair, then Bere's door. Don Güero's "draw the climb at both ends" is paint; the rule that travels is *a building with an upstairs shows its stairs at both ends — climbing at the bottom, a well at the top.*

### 4. Calle Dos gets its crossing — minutes

*Not verified by the panel; checked by the chair in `maps.js`.* Row 0 holds the shops, the ribbons pour a sidewalk over row 1, row 2 stays road, row 3 is the sidewalk with the trolley and the stop. Two stripe tiles on row 2 in each ribbon (x6–7 for La Espiga, x12–13 for Velázquez) so the crossing rises *with* the shop and never leads to an empty lot. The crosswalk art exists for Calle Principal. No rule touched.

### 5. The four districts — play one, change nothing first. A week, no code.

The expert's plan, with one fix. The owner plays **Taller Herrera only**, on his phone, from his own save, in the boot camera; the mercado's Saturday will replay once at Continue (§15.13, a repair). Before the first tap, one note with three columns: **STALLED** (did not know where to go), **SKIPPED** (the first card tapped past unread — that is Nacho's reading-length ceiling, found by watching a thumb, not by counting words), **LIED** (a line that contradicted something already seen). Two things on purpose: answer 24–28 first and leave Yesenia's Saturday until after the ending fires, to hear the break her lines make against `tepi1` in her own voice (the verifier's correction: she plays 29 before 31); and on quest 29 read the paper she hands you *before* answering, then miss once. Stop after the taller. Send the post-mercado save to AJ by Trolley Pass (it exists — `tpShare`, boarding asks first) and she plays **La Espiga cold, in Spanish**, same three columns. Only then rewrite `docs/PLAYTEST.md` — from the columns, not from intent — and add stops 15–18.

### 6. The Saturday belongs to a person — on El Mercado only, goodbye first

**What stands:** the shape is signed (`STORY.md` ❗La despedida, deferred to Nacho, `ending:{mode}` per district, never hardcoded) and its one hard dependency — a furnished office — is met since `mq-v55/v62`; the ❗ goes through the one function every camera and the doorstep nudge already read (`hasSay`), so the goodbye is findable everywhere with no new sign; the letter is a `docs.js`-only change; "never repeats" is free (the acknowledgement advances `chSeen`).

**What changes (correction 1):** the goodbye is **offered first** the moment the bar is met; the owner's remaining quests keep their late lines afterwards. Consequence, reported not absorbed: the Saturday quest can then still play *after* the goodbye, so **the endings must stop narrating the Saturday quest's outcome** — `tepi1` shelves the book quest 31 is about deciding, `eepi1` pins the page, `nepi1` hands over the key, `mepi1` counts the drawer. That is Nacho's rewrite, and it is owed whether or not this ships. The expert's "cheap patch" of four late lines was aimed at the wrong text: only quest 31's late line breaks the late-line law; the other three assert nothing.

**Corrections kept:** the taller's owner is Don Tacho (the key, the phone call are his), not Yesenia — so **start on El Mercado**: Chelo owns it, holds its last quest, all three `mepi` are hers, and it is the only district a human has played. The owner's own words: *"we can try one thing."* HQ stays `panel` (its ending is the VP, who is on no map). Burnout stays `panel`. The teleport to the new storefront's doorstep is cut for a doorstep district — you walk out yourself; the toast announces the lot (the train-to-floor rule). The goodbye card is the room-interview shape (a card with no right answer), not a quest node. The "Claim your title" button, the Continue-with-a-Saturday-due path, and Sonny's paw button beside the goodbye (`personFirst`) all need the mode.

**Cost: a sitting** of engine for one district with panel as the fallback, plus Nacho's beats and letter for El Mercado in both languages as a separate pass. **After** the playtest and the owner's answer to question 3.

### 7. The sentences that lie — an hour of build, Nacho's words separate

Dropped: rewriting the intro (correction 5). Kept, four things:
- **The ladder ends at quest twelve.** 12 answers × 10 XP = 120 = the top step, so *every one of the six* Saturday panels is headed 🏆 AI LEGEND. Add steps above — append only, never move (`BACKLOG.md` §3.8) — names Nacho's; the bible's street order is *compa → vecino → inge → colega*, not the expert's. **Owner hears first:** the level name prints at the top of the exported report (`repHead`, "Level: …"). The smoke test has no lockstep check on level names — add one, prove it fails.
- **The end panel's headline** becomes per-district content (`endTitle:"role"|"level"`, level as the fallback) — never hardcoded, per the owner's scope correction on ❗El listón.
- **"Back to the office"** sits under every verdict in every shop (`nextBack`, ~56 times) — a per-district return label.
- **The goal line** — *Meridian is a barrio that grows because you helped it* — signed 2026-08-31 as "said out loud in the game, once", exists in no string, and is tracked in **no ledger**. ❗El día already signed *where*: the morning after, unbuilt. Question 4.

"Choose your class" → "Choose your look" is accurate (it sets a shirt colour); the save key stays.

### 8. The second attempt remembers — the ability, after the owner plays a retry loop

Sound with corrections: the line is per quest, not per node (28 quests have a second question and a retry restarts at the first); key it by the choice's position, not its text (the log stores the words in whatever language was on); guard on a fresh save (the play log survives "erase everything"); one slot on the card, so the memory line beats the late line; wording time-neutral (the Talk button is back five seconds after the miss) and inside the late-line grammar — *still interested, never still waiting on you*; the expert's own sample ("You came back. Last time you tried to sell me an app, joven. Sit.") is the bill, not the door. Keep the "this one stays open" line at miss time; it is the law's only spoken voice. Lines are Nacho's: start with the six paper-handing quests plus Tacho's *The door* — the Saturdays wait for item 6. Contradiction to report if taken: `STORY.md` and the comment at `engine.js:227` say a reopening line "acknowledges only that time passed — never what happened in it"; both gain "in the world". **Cost: half a sitting** of engine plus Nacho's pass. **After** the owner has played one new district's retry loop — nobody has asked for this yet.

### 9. The barrio dresses itself — the ability, with one costume

Ship the seam: a per-person look override declared in content, resolved against what is **done** (never the grade; expose `done`, not `grade`, to content). Prove it with the one costume the text already dates: **Chente's crew shirt, on from the moment quest 44 is on offer.** Cut the jacket (correction 4). Aprons go to Pili's hat-and-apron vocabulary, worn *always* — bakers without aprons for a whole arc is nonsense, and 2px of embroidery is invisible on a phone. The taller's three matching shirts at quest 31 is a fine second costume once a people sheet exists in the tilesheet (there is none). Engine details the verifiers found: clear the tinted-look cache when `done` changes or the shirt never changes under a theme; one announcement line per business (the room-you-are-not-in rule); Frederick's bandana is the shipped precedent. **Cost: half a sitting.**

### 10. Business seven — not now; when, the expert's answer for Don Güero to plan

Do not open a lot before the four are played and the second lap (S7, five neighbours phone *you*) is written — deepen before widening. When the owner wants one: property management (on his own brainstorm list, `CITY.md:297`), role **AI Governance / Responsible-AI Lead**, and its decisions are a new *kind*: the assistant is right for the business and wrong in law. Handed paper: a rejection letter the assistant wrote. Needs a sixth-role signature (five roles signed 2026-08-31, all spent). *Unverified by the panel; parcels and role packs are Don Güero's lane — recorded as an answer to his question, not a plan.*

---

## WHAT THE EXPERT SAID NOT TO BUILD (kept as the refused list)

No quest journal, tracker or pins for open work. No mechanical classes. No streaks, energy, timers, or countdown to Barrio Norte. No wandering quest-givers (the doorstep nudge depends on stations). No gating the Saturday quest last. No moving level thresholds. No comprehension checks on handed paper. No elevation to make the stair real. No seventh district before the four are played. No live AI character. No hearts on by default. No cutscene that takes control for a district's goodbye.

---

## THE BUILD ORDER

**Now — a week, no code.** The taller on the owner's phone, three columns. AJ plays La Espiga in Spanish from a shared save.

**Batch A — minutes each, one commit.** The up-arrow word on Nolasco's door. Calle Dos crossings in the ribbons. A per-district "back" label. Ledger repairs (the contradictions list below). Nacho: the Spanish street-cat lines.

**Batch B — a sitting. Waits on Don Güero's site and question 1.** Two rows on both floors, the flight, the rail, the tests. Then the rail at Nolasco — an hour.

**Batch C — an hour or two. Its own yes (question 2).** Fade the wall between camera and hero.

**Batch D — an hour of build, Nacho's words apart.** The four lying sentences; levels above AI LEGEND; the goal line's home (question 4).

**Batch E — a sitting plus Nacho's beats. After the playtest and question 3.** The doorstep ending on El Mercado, panel everywhere else.

**Batch F — half a sitting plus Nacho's lines. After the owner plays a retry loop.** The memory line.

**Batch G — half a sitting.** The look override, Chente's shirt.

**Later.** The second lap. The stair-hall map for Nolasco. Business seven.

---

## QUESTIONS ONLY YOU CAN ANSWER

1. **The building.** Two rows, no engine work *(recommended)* — or one row plus the wall fade.
2. **The wall that hides you at your own front door.** Fade it *(recommended, an hour or two)*, lower every wall, raise the camera, or leave it.
3. **After five.** Does the next lot rise the moment you reach five, or when you have heard the goodbye? `STORY.md` says the goodbye; the code says five. Today's panel already waits for you to press "Claim your title", so the goodbye is the same acknowledgement moved into the world. *Recommended: the goodbye, on El Mercado only, and you play it.*
4. **The goal line.** Wait for the morning-after ❗El día signed *(recommended — "once" means once)*, or a placeholder intro card that comes out later.
5. **Level names above AI LEGEND print at the top of your exported report.** Keep "Level:" there with barrio names, or drop the line from the report. *Recommended: Nacho names them job-shaped enough to survive a hiring manager; if he cannot, the line goes.*
6. **Nolasco's stairs.** The arrow word now *(free, recommended now)*; a stair-hall map later *(a third of a sitting, recommended later)*; paint the door *(not recommended — a portal image)*.
7. **The camera permit — asked at la junta, still open.** `OWNER.md` Settled says front-profile is the default; `config.js` says 3D and that is what you see. *Recommended: amend the doc with today's date.*
8. **The engine names your maps 38 times** (33 in `engine.js`, 5 in `engine3d.js`) while a Settled law says it may never. Pay it down *(more than a sitting)* or narrow the law in writing to proper nouns and log the map ids as a known debt *(minutes, recommended now; pay down when AJ's pack starts)*.

---

## DISAGREEMENTS — Don Güero, Nacho, the expert

- **The mural.** Nacho: one static tile, the code does not keep the promise. Don Güero: seven tiles, coloured by grade. **Don Güero is right** — `mq-v57`, `ASKS.md` records it; Nacho's briefing was two days stale. Nacho's narrower point stands: the bible still promises charcoal outlines and the report on the wall underneath; the owner chose blank plaster and the report went upstairs. Repoint the bible, not the code.
- **Can the world read a grade?** Nacho: no. Don Güero: `worldFlags()` hands it over and the mural consumes it. **Don Güero is right; it has one customer.**
- **The Saturday after the Saturday.** Nacho offered three ways out (gate the finale, fire only from the finale, write every quest so it can be last). The expert chose a fourth — the owner's ❗ with the goodbye behind the queue — which the verifiers showed is a gate wearing a face. **Nacho's third option is what survives**, plus the goodbye offered first.
- **Is the one-lot-at-a-time reveal why two-thirds of the content is unseen?** Don Güero fears yes. The expert: the gate is not the problem, the absence of play is — **play one district before touching the order.**
- **The staircase.** Don Güero yesterday: stack and re-sign. The owner superseded him. The expert: one row, east corner, plus a fade. The verifiers: hidden and in the wrong room. **The chair: two rows, the front of the main floor, the fade its own question; Don Güero sites.**
- **The zaguán.** Don Güero: paint the climb at both ends. The expert: a door face plus a reused shaft. **Both are portal images; one word now, a hall later.**
- **Animating quest-givers.** Don Güero asked; the expert said no — stations carry the doorstep nudge. No quarrel.
- **Three choices or four.** Don Güero says three, Nacho says four; quests carry either.
- **Calle Dos frontage.** Don Güero corrected his own ledger line to x16–19; **Yola the paletera stands at (17,0)** — `buildSafe()` would refuse it as it refused the west casita. The free frontage is x16, x18–19 and x21–23.

---

## CONTRADICTIONS — reported, not absorbed (which side is true)

1. **The engine hardcodes this pack's map ids 38 times; a Settled law says never.** Counted 35 at la junta, "three dozen" by Don Güero, 62 in `NEW-WORLD.md`. **The code is true; the law is aspirational.** Question 8.
2. **`OWNER.md` says front-profile is the default camera; `config.js` says `"3d"`; `NEXT-SESSION.md:415` says "front (default)".** **The code is what the player sees.** Question 7 — flagged at la junta, unamended.
3. **`docs/PLAYTEST.md` is false to the code at stops 2, 7, 9, 10 and 14** (hearts you can lose, Don Güero on the street, the cat on Calle Dos, a week that ends, "▶ Monday — Week Two"), never names the boot camera, and stops at the mercado — so four districts have no test path. **The code is true.** Rewrite after the playtest, from the columns.
4. **`STORY.md` ❗La despedida: "the goodbye is the only thing that grows the city"; `config.js`/engine: reaching `need` breaks ground.** **Unresolved — question 3.** Also: `BACKLOG.md:114` still lists the Saturday's presentation as an open question (signed 2026-09-02, stale); `CITY.md:286` says it is blocked on the office (the office is furnished — the dependency is met).
5. **The endings narrate the outcome of the Saturday quests.** `tepi1` shelves the book; quest 31 opens with the book on the counter and asks what to do with it; the same shape at 39/`eepi1`, 55/`nepi1`, 23/`mepi1`. Reachable today because the bar is any five. **Both are Nacho's; the endings are the side that changes.**
6. **`OWNER.md` rule 3 — the goal line said once — has no string and no ledger row.** Signed, not built, untracked. ❗El día already chose the morning-after as its home, also unbuilt.
7. **The intro's ladder "Junior → … → AI Legend" finishes at quest twelve of fifty-six**, and every Saturday panel is headed AI LEGEND. Code consistent; promise false.
8. **The one stair drawing climbs (`TILESIDE["1"]`, "rises to the right and always will") — at Floor 2 and at Nolasco the portal goes DOWN.** Both upstairs stairs look like they go up. **New; recorded nowhere until now.** Fixed by the rail piece in item 1.
9. **"The file cabinet IS the box by the stairs"** (`config.js:77`, `BACKLOG.md` §6, `smoke.js:1897`) goes stale the day the stairs move six rows. One line, or swap two gifts.
10. **`docs/CITY.md` CEILING lists two closed items as open** — per-storefront flags (`worldFlags` builds `f.up[id]`) and NPC looks keyed by letter (keyed by id since `mq-v50`). **The code is true; strike in place with a date.**
11. **`docs/CITY.md` ❗El reparto / ❗La caja are three-quarters built** (`config.js:69-78`). Asking the owner to decide a thing the code did is the waste he named twice. Only Chelo's coffee corner and Licha's chair are genuinely open.
12. **`CITY.md` carries three stacked ❗La caja de escalera entries; the two lower ones still ask the 20×14 question** the owner superseded. Fold to one.
13. **`maps.js:18-27` — two headers over Floor 2: "opens BARE, as signed" and "MID-MOVE since 2026-09-02".** **Mid-move is the newer owner call.** Cut the first.
14. **`docs/HANDOFF.md` opens "Updated 2026-08-30 · everything below is live" with 2026-09-05 corrections inside, and still says a bad pick costs a heart.** Header stale.
15. **`docs/ASKS.md:22`, `CITY.md:213`, `NEXT-SESSION.md:80` cite `docs/meetings/2026-09-05-el-experto.md`, which did not exist.** This readout is that file; resolved when written.
16. **`STORY.md` says the north window advances a stage; `art.js` draws one view.** `CITY.md:400` has it right — approved in principle, not built. The bible should say so.
17. **The decision log says Tuerca is a she and the shared street-cat lines were fixed; `strings.js:235` still says *el gato callejero… aquí manda el gato*.** ES is behind EN. Nacho, one word.
18. **`docs/story/las-cuatro-puertas.md:437` says ❗El giro is signed and not built.** It is built (`industry:` beside `role:` in every chapter; the report prints both). Strike.
19. **`docs/NEXT-SESSION.md:370` says in3's copy is "not yet written"** — it was rewritten 2026-09-01 (`806295f`); only its ladder tail is stale. **`NEXT-SESSION.md:66` lists ❗El escalón de Dana; `CITY.md`'s pending list does not.** The ledger of record is the one missing it.
20. **`docs/BACKLOG.md` §3 has two rows numbered 10** (lit windows, and the wall that hides you).
21. **Quest 30 is written to be played off the lot ("Walk with me, joven") and plays at Tacho's station** — ❗El recado not built; a first player hears Chelo's voice arrive in a garage. A known cost, not a surprise.
22. **`test/smoke.js` has no lockstep check on level names, and the end-panel title is asserted only for burnout** — a build on item 7 needs both, proven to fail first.
23. **Don Güero's own ledger line for Calle Dos** (x15–23, then x16–19) plans through a jacaranda and then through Yola. The true lots are x16, x18–19, x21–23.

---

## UNANSWERED — questions the expert did not answer; carried to the next meeting

- **Nacho:** we promise failing is safe and quietly grade first-try rate — honest tension, or does it teach reloading? *(No answer given.)*
- **Nacho:** should more teaching land in the verdict, after the player has committed? *(No answer given.)*
- **Don Güero:** what second verb is still "make a judgment call" and not a mini-game? *(No answer given; the nearest thing on the table — read the paper before you answer — already ships, and the expert said not to make it a test.)*

---

## NEW EXPERT RECOMMENDED (not appointed)

- **El Verificador — the adversarial check.** Reads every recommendation against the code and the Settled list *before* the owner sees it, and says only: already shipped, breaks a rule, wrong lane, or "free" with a price. Today that pass caught one free fix that was a sweep gate, one drawing reused before it was drawn, one costume that belonged to the finale, and a door face the owner had refused twice. Case in one line: the planners each have a lane to defend and the guest has none; somebody has to hold the ledger against both. *(Re-invite the gaming expert after the playtest — his next answers need the three columns, not the files.)*

---

## WHAT THIS PROJECT NOW KNOWS

**A QUEUE IS A GATE WITH A FACE.** The ❗ serves one person's quests in order, so anything put at the back of a queue waits behind everything ahead of it. A gate is a gate whether it is a lock or a line. If a moment must come *after* the bar, offer it *first*.

**WRITE EVERY QUEST AS IF IT COULD COME LAST.** The bar is "any five", so no quest may narrate another quest's outcome, and no ending may narrate a question the player may not have answered yet. This is the rule the endings broke and the late lines kept.

**A WALL RIGHT BEHIND YOU HIDES YOU; ONE TILE OF FLOOR CLEARS YOUR FEET.** Measured: 7.4 back, 6.2 high, walls 1.1 tall. For every room laid from here on — never put a walk the player must make on the last row before a south wall.

**EVERY SOLID PIECE WEARS ITS DRAWING ON ALL FOUR SIDES.** Before hanging a picture on a wall, ask what room the other side is in. The CEO's office blocked it once, Dr. Okafor's would have twice.

**"FREE" IS A DEPENDENCY WITH THE PRICE HIDDEN.** "The same drawing costs almost nothing a second time" had no first time. When a cost reads as nothing, find the thing it is standing on.

**A STAIRCASE IS LENGTH, ENCLOSURE AND THE SAME FOOTPRINT ON BOTH FLOORS — NEVER HEIGHT.** The one-tile stair failed all three; the engine can give all three as content. Height is for seeing the climb, not for believing the building.
