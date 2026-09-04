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
| 2026-09-03 | *"eventually they would be the game building assistants"* → **El maestro constructor**: Don Güero given a house template he builds from with variations | **Foundation shipped `mq-v60`** (templates, variation, safety, two casitas on Calle Dos). Still open: templates for whole storefronts so growth stops being hand-written tile lists, and Don Güero *talking about* what he built |
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

## Refused, reversed, or answered instead of built

| Verbatim | What happened |
|---|---|
| *"dont we have some 3d model and capabilities from fitcheck?"* | Looked: FitCheck is not among the account's eight published artifacts and is not a repo. Nothing to inherit. Four ways to hand it over were given |
| *"i want both nacho and don guero at my beck and call"* (as a trolley shortcut) | Built, then **reversed the same day** at the owner's word. The realistic version is the one that stands |
| An in-game live AI assistant | Needs a network call. The owner's actual ambition turned out to be different and buildable — a template Don Güero builds from — and that is what got made |
