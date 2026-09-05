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
| 2026-09-05 | *"maybe we split out as a version to help me have fun managing backlogs... is that still too difficult?"* → *"sure do this plan, but take into account that no npc/character/animal/dog should have complex tasks unless... specifically associated with lets say sonny... a butterfly wouldnt have a high impact issue."* | **Planned, not built — El Changarrito**, a second world on the same engine for one player (`docs/story/el-changarrito.md`). The weight rule is written in as law: a character carries only what its weight allows; animals carry notes, never tasks |
| 2026-09-05 | *"what would be my memory limitations, how can we handle that or what is your plan?"* | Answered in `el-changarrito.md` §Memory: three layers — the repo is the memory between sessions, GitHub issues become the machine-readable ledger, the game save stays small on-device |
| 2026-09-05 | *"can you have an expert sw engineer and cybersecurity expert agent assist in this feasibility report. it will allow you to create npcs on your own right?"* | Two expert reviews run against the code, folded into `el-changarrito.md` §Feasibility and §Threat model. Yes: with people generated from issues, a session creates a character by filing a labelled issue — no code per character |
| 2026-09-05 | *"keep planning this little character, but dont build , just make sure to point out places wehre we need tags or something in case we would like to track those."* | **Planned, not built.** `docs/story/la-ventanilla.md` — eleven seams, each with a file, an anchor and a grep-able tag (`ventanilla` in content/docs, `city record` in engine/sw/CI); three sub-asks: ❗El solar de la ventanilla (siting, Don Güero), ❗El expediente (what `status.json` holds), ❗La puerta trasera (below) |
| 2026-09-05 | *"could we build a sole backdoor for us to have you connected to my personal version? is this too risky? i feel like thats how game developers do it..."* | **❗La puerta trasera — designed, not built** (`la-ventanilla.md` §5). Verdict: low risk *if* four rules hold — the public build never changes, no secret in the repo, the personal build is two gitignored files that fill the existing `NET` seam, the token is one-repo/issues-only/30-day. What devs do is a dev build compiled out of release, not a hidden channel in the shipped client |
| 2026-09-05 | *"we should have a gaming expert agent get the low down from don guero and nacho about the game state and try to get more recs."* | Logged before doing. Running as a meeting: two briefings → the expert → adversarial verify → readout. `docs/meetings/2026-09-05-el-experto.md` |
| 2026-09-05 | *"i think that we can make the building bigger, fit in a proper staircase. move it out of a tiny room if needed."* | **Decision recorded, not built** (*"dont build"*). Supersedes yesterday's "its own hall" plan — the owner wants a real staircase and is willing to enlarge HQ (20×14) to get it. Expert weighs in; siting is Don Güero's |
| 2026-09-05 | *"i want to make sure we have a template for any other custom game in case we want to start a new "world"/town/city."* | Logged before doing. `docs/NEW-WORLD.md` |
| 2026-09-05 | *"in another doc, write the smallest couple of prompts one should use to make a better version of this exercise."* | Logged before doing. `docs/PROMPTS.md` |
| 2026-09-05 | *"compress this convo in case i want to start a new session"* | Logged before doing. `docs/NEXT-SESSION.md` state-of-play block |
| 2026-09-04 | *"stairs shoudl be part of the building right?not just portal images unless absolutely necessary."* | **Designed, not built — and it needs the owner.** A solid stair shaft is the right shape and every glyph for it is free. The blocker is *where*: the only tile at HQ that takes one, (17,4), is the **south wall of the CEO's room** (quest 9), so a flight there hangs stairs on the inside wall of a room the player must enter. Siting is ❗La caja de escalera in `docs/CITY.md`, still unsigned. `mq-v64` shipped the half that needed no decision: the iso camera now draws standing objects instead of skipping them |
| 2026-09-04 | *"ok for now we are ok with the office. i think we can def improve but for now its ok"* | **Parked by the owner.** Office improvements are not dropped, just not now |
| 2026-09-03 | *"eventually they would be the game building assistants"* → **El maestro constructor**: Don Güero given a house template he builds from with variations | **The ability shipped `mq-v60`.** The two demo houses came back off the street at `mq-v61` — *"noone asked me to make them... it is just an ability"* — and because you cannot enter them. Still open: an enterable house (interior + portal first), templates for whole storefronts, and Don Güero *talking about* what he built |
| 2026-09-03 | *"i cant enter the houses"* | Open as a rule, not a bug: nothing goes into the world the player cannot use. Recorded in `OWNER.md` |
| 2026-09-03 | *"i think in terms of how it looks will be a good goal"* — the art bible: silhouettes, a hat-and-apron vocabulary, per-character signature idles | Not started. Pili's first assignment |
| 2026-09-02 | *"i want the rest of the story for my ai practice"* → the four districts | Written and wired (`mq-v51`). **Never human-played.** The next real gate |
| 2026-08-31 | ❗La ventanilla — the clerk with the city's record | Signed, deferral dated 2026-09-03, **planned 2026-09-05** (`docs/story/la-ventanilla.md`), not built |

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
| *"sonny should be able to follow me anywhere. but when i tell him to stay and sit he can stop following."* + *"sometimes he will follow just for fun"* | `mq-v64` he comes through any door he was near, and through the trolley too. Told to sit, lie down or stay, he holds and you leave without him. Off duty he still tags along about one time in five, from right at your heel |
| *"the bus stop is also just a painting on the floor."* | `mq-v64` the MQT stop stands in all four cameras — and its drawing moved out of the engine, which had been spelling this pack's brand in engine code |
| *"I think a cone shouldnt make me have to go around it. i should be able to kick it. sonny should be even able to rip it and they'll just reappear when i leave the screen for now."* | `mq-v64` the cone left `SOLID`; you walk through it and it skitters ahead of your foot. Sonny rips one about once in twenty-five whims. Every kick and every rip is undone the moment you leave the room — no save key, exactly the scope asked for |
| *"i had another session give us recommendations for next steps to make more realistic, did you review?"* | **No, and said so.** Both artifacts read `mq-v64`; the assessment is IDEAS §15.27, and the stale "nothing to inherit" row above is corrected |
| *"nacho can you create like actual fake documents instead of like oh this is what chela and juanita said. no she says it and shows a fake doc- the important ones are the ones for AI roles but lets help me see it and live it"* | `mq-v62` six documents a character puts in your hands mid-quest — Chelo's eleven-item list, the invoice evaluation run, the incident transcript with "be helpful" printed as the root cause, ten weeks of forecast against the trash, the old lead's rollout plan, Bere's fifty-two. They go in the office file and stay there |

## Refused, reversed, or answered instead of built

| Verbatim | What happened |
|---|---|
| *"dont we have some 3d model and capabilities from fitcheck?"* | **That answer is now wrong and is corrected here (2026-09-04).** It was true when checked — the account had eight artifacts and none was FitCheck. Since then another session published two: **FitCheck Salvage Manifest** (10 subsystems read at source level, 22 agents, 121 Swift files) and **Bones to Meshes** (a working SDF→Surface Nets prop forge). There IS something to inherit. Read 2026-09-04 |
| *"i want both nacho and don guero at my beck and call"* (as a trolley shortcut) | Built, then **reversed the same day** at the owner's word. The realistic version is the one that stands |
| An in-game live AI assistant | Needs a network call. The owner's actual ambition turned out to be different and buildable — a template Don Güero builds from — and that is what got made |
