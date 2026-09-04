# The asks ledger — every request, and where it landed

**Opened 2026-09-03**, because the owner said so: *"i keep seeing you miss testing
opportunities and requirements are falling through."* Both halves of that were true. This
file is the fix for the second half; `docs/PLAYTEST.md` and the smoke test's
**discoverability audit** are the fix for the first.

## The rule

**Before a session starts building, every ask in the owner's message gets a row here —
quoted, not paraphrased.** A row leaves the "open" table only when the thing is shipped,
or when the owner is told plainly why it was not. An ask that was answered in conversation
and never built is still open; saying it aloud is not shipping it.

Paraphrasing is how requirements die. *"the activity record should only delete after two
activities"* is a rule; "improve the ticker" is a mood. Quote the rule.

## Open

| Asked | Verbatim | State |
|---|---|---|
| 2026-09-04 | *"stairs shoudl be part of the building right?not just portal images unless absolutely necessary."* | Logged before building. `mq-v63` made them stand; this asks for the next thing — a flight that is **architecture**, with the portal only where it must be |
| 2026-09-04 | *"sonny should be able to follow me anywhere. but when i tell him to stay and sit he can stop following."* + *"sometimes he will follow just for fun"* | Logged before building. `c.follow` exists but a critter in another world only idles — he cannot cross a door |
| 2026-09-04 | *"the bus stop is also just a painting on the floor."* | Logged before building. Confirmed: `Y` is walkable with no `TILES` row and no profile — the same bug class as the stairs, and the `stand` flag from `mq-v63` is the fix |
| 2026-09-04 | *"I think a cone shouldnt make me have to go around it. i should be able to kick it. sonny should be even able to rip it and they'll just reappear when i leave the screen for now."* | Logged before building. Confirmed: `C` is in `SOLID`, so it blocks |
| 2026-09-04 | *"i had another session give us recommendations for next steps to make more realistic, did you review?"* | **No — answered honestly 2026-09-04.** They are two artifacts, not repo files: **FitCheck Salvage Manifest** (2026-09-03) and **Bones to Meshes** (2026-09-04). Now read; see the row below |
| 2026-09-04 | *"ok for now we are ok with the office. i think we can def improve but for now its ok"* | **Parked by the owner.** Office improvements are not dropped, just not now |
| 2026-09-03 | *"eventually they would be the game building assistants"* → **El maestro constructor**: Don Güero given a house template he builds from with variations | **The ability shipped `mq-v60`.** The two demo houses came back off the street at `mq-v61` — *"noone asked me to make them... it is just an ability"* — and because you cannot enter them. Still open: an enterable house (interior + portal first), templates for whole storefronts, and Don Güero *talking about* what he built |
| 2026-09-03 | *"i cant enter the houses"* | Open as a rule, not a bug: nothing goes into the world the player cannot use. Recorded in `OWNER.md` |
| 2026-09-03 | *"i think in terms of how it looks will be a good goal"* — the art bible: silhouettes, a hat-and-apron vocabulary, per-character signature idles | Not started. Pili's first assignment |
| 2026-09-02 | *"i want the rest of the story for my ai practice"* → the four districts | Written and wired (`mq-v51`). **Never human-played.** The next real gate |
| 2026-08-31 | ❗La ventanilla — the clerk with the city's record | Signed, deferral dated 2026-09-03, not built |

## Shipped, this session

| Verbatim | Where it landed |
|---|---|
| *"the activity record should only delete after two activities, the timer is too fast"* + *"on the other side- left"* | `mq-v53` · no timer at all; left rail |
| *"its hard to tell people apart, should they have their name when they speak?"* | `mq-v53` names on every spoken line · `mq-v54` the job icon beside the mark, not instead of it |
| *"it is hard knowing where to go in this open world"* | `mq-v54` the doorstep nudge and the stair arrow |
| *"i want another review from /don-guero and /nacho... write it as a skill of meeting-of-da-minds"* | `/meeting-of-da-minds`, `/pili`, `docs/meetings/2026-09-03-la-junta.md` |
| *"give me some info around their business... a computer with the 'assistant'... i would need a marker"* | `mq-v55` readable objects, the marker that never clears, the machine on the desk |
| *"posters of my stuff in my office"* + *"a stapled poster template"* + *"realistic docs so we can export"* | `mq-v55` six posters, the paper reader, Copy and Download as markdown |
| *"i do want to be able to compress a setting area"* | `mq-v56` four drawers that remember what you keep open |
| *"can we put little pins on the map... dynamic depending on open tasks"* | Partly: `mq-v54` markers in the world; map pins deferred with a reason (la junta) |
| *"i thought we were going to have a... mural for people to see records"* | `mq-v56` decor in all four cameras · `mq-v57` the seven-tile mural, baby blue plaster, colour by grade |
| *"why cant they walk around?"* | `mq-v57` townsfolk walk; quest-givers never do; `auditWander()` at boot |
| *"give it to lupe and just let her introduce/talk about him"* | `mq-v58` Lupe carries both La Obra quests and names him in her first line |
| *"i dont like that i go from a train to a floor"* | `mq-v59` reversed; the rule is in `OWNER.md`; a test requires rails at every stop |
| *"i still couldnt find my posters and laptop"* | `mq-v59` every readable in the room is marked, and the room says what is in it |
| *"those stairs are trash. not realistic. can we have realistic building designs"* | `mq-v63` the stairs stand up in every camera — the drawing was only half of it, they were **lying down**; plus the light ladder and the contact shadow, so a building has faces and meets the ground. Don Güero's ranked parts list (stoop, reja, corner, cornice, sidewalk) and the `local` storefront template are still open |
| *"nacho can you create like actual fake documents instead of like oh this is what chela and juanita said. no she says it and shows a fake doc- the important ones are the ones for AI roles but lets help me see it and live it"* | `mq-v62` six documents a character puts in your hands mid-quest — Chelo's eleven-item list, the invoice evaluation run, the incident transcript with "be helpful" printed as the root cause, ten weeks of forecast against the trash, the old lead's rollout plan, Bere's fifty-two. They go in the office file and stay there |

## Refused, reversed, or answered instead of built

| Verbatim | What happened |
|---|---|
| *"dont we have some 3d model and capabilities from fitcheck?"* | **That answer is now wrong and is corrected here (2026-09-04).** It was true when checked — the account had eight artifacts and none was FitCheck. Since then another session published two: **FitCheck Salvage Manifest** (10 subsystems read at source level, 22 agents, 121 Swift files) and **Bones to Meshes** (a working SDF→Surface Nets prop forge). There IS something to inherit. Read 2026-09-04 |
| *"i want both nacho and don guero at my beck and call"* (as a trolley shortcut) | Built, then **reversed the same day** at the owner's word. The realistic version is the one that stands |
| An in-game live AI assistant | Needs a network call. The owner's actual ambition turned out to be different and buildable — a template Don Güero builds from — and that is what got made |
