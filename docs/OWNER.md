# The Owner's Standing Rules

*Opened 2026-08-31. Read by `/don-guero`, `/nacho`, and any future planner BEFORE
planning. This file exists so plans arrive already aligned — the owner's stated goal
is to referee every decision now and eventually just browse and approve.*

**How to use it:** anything in "Settled" is a permit, not a question — never bring it
back as a side quest. Anything in "Taste" shapes how you write. "Bringing a decision"
is the format that works for this owner. Add to this file whenever the owner states a
preference that outlives one phase; cite the date and their words.

---

## Settled — never re-ask

- **The city grows; it never resets.** Nothing the player earned is ever taken away.
  Restarting is a tool in Settings, not a story beat. *(2026-08-31)*
- **Learning beats punishment.** "This is for story mode so no big deal just so i
  learn." Consequences may cost a grade; they never cost progress, the city, or the
  save. *(2026-08-31)*
- **Weeks are retired.** Districts open and stay open. The city has no credits — it
  grows. Weeks One and Two remain in the fiction as written. *(2026-08-31)*
- **Stakes are a pluggable layer; the grade is always on underneath.** *(2026-08-31,
  superseding the earlier hearts rule.)* Owner correction, verbatim: *"i didnt say
  remove the hearts my friend, but ok for now. make it a toggle in admin mode in case
  we can bring back for mini games."*
  - **The grade is permanent and separate.** Every quest earns a mark when it is
    answered — first try / took a retry / took a few. Marks make a business's grade,
    which picks its ending. The grade never blocks anything and is never turned off:
    it is what the decision report is made of.
  - **Stakes sit on top and are optional.** `none` (the open-world default),
    `hearts`, or `budget`. Declared in content, per pack and per district, so a
    stakes-free town can still contain a scored mini-game. Admin mode toggles the
    mode at runtime so hearts can be brought back for a challenge without a rebuild.
  - **Nothing a stakes mode does may take progress, the city, or the save.** That
    rule outranks the stakes layer.
  - **No stakes mode may harm a character or their business.** *(2026-08-31, from the
    owner considering and rejecting a bankruptcy mode: "i could think of a mode where
    you can bankrupt somone.. lol but no thats stressful.")* Doña Chelo does not go
    under because the player made a bad call. This is "the city never resets" pointed
    at people instead of buildings, and it is a law precisely because bankruptcy is
    realistic — a future session could talk itself into it without this line.
  - **`budget` is ARCHITECTURE ONLY — do not implement it.** *(2026-08-31: "for now
    lets keep it theoretical and only in architecture.")* It is named in the design so
    the seam exists if a more realistic teaching scenario is ever wanted; it is
    denominated in **money**, because "this costs more than it saves" is already the
    lesson in *The Monday number* and money makes that arithmetic visible instead of
    narrated. Until the owner asks: no UI, no numbers, no engine code. `none` is the
    default and `hearts` is the only other mode with an implementation to toggle to.
  - **Old saves grade kindly.** Progress from before the grade existed has no
    attempt history and counts as first-try. Signed at the merge review: only saves
    made before 2026-08-31 are affected, and new play is tracked honestly. Do not
    "fix" this to a neutral wording. *(2026-08-31)*
  - **The grade is words, not marks.** "solid work" / "buen trabajo" on the end
    screen — no stars, letters, or percentages player-side. Signed at the merge
    review; revisit only if AJ asks for something more game-like. *(2026-08-31)*
- **Every business is Hispanic-owned** and doubles as a practice pack for an AI role
  the owner wants to be hired in.
- **Role order (signed 2026-08-31):** 1 AI product manager *(spent on El Mercado)*,
  2 automation/solutions consultant, 3 AI ops analyst, 4 implementation lead,
  5 prompt/solutions engineer.
- **Entities as data.** Characters, critters, tiles, buildings are declared as data so
  graphics can be re-rendered wholesale without changing what things are.
- **Front-profile 2.5D is the pack's default camera** (owner + AJ, 2026-08-31;
  `CAMDEF` in config.js — content's call, per pack). A device's own Settings choice
  always wins over the default. Top-down and iso remain as options. *(2026-08-31)*
- **EN/ES in lockstep**, retry-until-correct, saves stay on-device.
- **Fun is a requirement**, not a nice-to-have.
- **HQ is the onboarding.** No separate tutorial or staging area. *(2026-08-31)*
- **The barrio is the player's reference letter.** *(2026-09-01, ❗La carta.)* A
  business's grade becomes what its owner says about you to the next one — the
  previous neighbor phones ahead, and every new business is a job interview you walk
  into with somebody's opinion of you already in the room. A cold referral opens the
  door colder; it never locks it. This is what puts the career layer inside the
  fiction instead of beside it, and it works in any story the engine is reused for.
- **A day may end. It may never close anything.** *(2026-09-01, ❗El día.)* Days are
  light and memory, not containers for content. The test: if a day's ending changes
  what the player CAN DO, it is a week wearing a hat. The shipped shape is **the
  morning after** — the player plays as long as they like, the day turns over while
  they are away, and next launch the street remembers.
- **No practice is ever missed.** *(2026-09-01.)* Every quest stays answerable
  forever; a quest the world outgrows is rewritten, never removed. Owner's words:
  *"dont close old quests... keep them open and if they need updates instead, do so
  but i dont understand why i would miss any practice."* Corollaries: never build a
  quest log (a list is a backlog, a person is an invitation); the ❗ carries no count,
  colour or age; and the mural's paint only ever goes on.
- **This repo is worked by several models in parallel — treat every session as one
  member of a team, never the only author.** *(2026-09-01, owner: "i am using multiple
  models so treat this as a team effort.")* `main` moves while you work. Consequences,
  all learned the hard way on 2026-09-01 when a branch cut from a stale base spent a
  session reading code that had been fixed twice on `main`:
  - **Before planning or reading code, look at what else exists.** `git fetch origin`,
    then `git log --oneline HEAD..origin/main` (what landed without you) and
    `git branch -r` (who else is mid-flight). A finding taken from a stale base is
    worse than no finding — it is a confident wrong answer.
  - **Merge `main` in BEFORE investigating anything**, not after. Investigate the code
    that actually ships.
  - **Version pins collide.** Two branches will both bump to the same `mq-vN`. On a
    merge, resolve FORWARD to a new number rather than picking a side.
  - **Never assume the owner can see your work.** Only `main` deploys. Say so.
- **Surface every contradiction, every time — never silently.** *(2026-09-01, owner:
  "lets make sure we fix or ask me about this contradiction, we need all these brought
  up at all times - all agents and skills for this should let the owner/me know
  please.")* A contradiction is any of: a rule signed in `docs/` that the code does not
  implement; two docs that disagree; a doc that disagrees with the code; or a plan that
  assumes something the engine cannot currently do. When one is found, the owner is
  told **in the reply, not only in a file** — with what conflicts, which side is true,
  and either the fix or the question. Three things are forbidden: quietly fixing it and
  moving on, quietly planning around it, and burying it in a document the owner has to
  go find. This applies to every agent, every skill and every session, and it outranks
  keeping a reply short.
- **New art gets a cold read before it ships.** *(2026-09-01, owner: the legibility
  pass "should ride with the 3d work but after that be a regular thing".)* Any change
  to a tile, sprite, facade, prop or palette runs `node test/tilesheet.js` — every tile
  rendered alone, labelled only by its glyph — and the question is *"would someone new
  to videogames know what this is?"* Context does not count: in a scene the
  surroundings give the answer away. If the silhouette cannot carry the meaning by
  itself, the art is not finished. This is now step 2b of the shipping checklist in
  `docs/HANDOFF.md`.
- **A season changes colour, never design.** *(2026-09-01, owner: "add another mode for
  fall/halloween and thats where the rainbow bridge colors are accurate to the dia de
  los muertos colors, then if someone changes the palette, it can change but keep the
  general design.")* Seasonal palettes swap world-art colours; the shapes, structures
  and silhouettes stay put. Two consequences worth keeping: a culturally specific
  palette becomes a season the player *enters* rather than the game's permanent
  default, and swapping a palette can never break legibility, because the silhouette
  is what carries meaning (see the cold-read pass). Note this is a SECOND palette layer
  from `THEMES`, which is UI chrome only — choosing a UI theme must never repaint the
  barrio.
- **Movement is one press, one step — there is no turn-in-place.** *(2026-09-01,
  asked and answered.)* Nothing in the game requires facing: `checkTalk()` and every
  animal interaction use Manhattan distance only. So a Zelda-style turn-first step
  would cost an extra press on every step in the whole game and buy only calmer
  doorways. Do not re-propose it, and do not add a facing requirement to a new
  interaction without raising it — that would change this answer.
- **The engine may never name a pack's content.** *(2026-09-01.)* No business, NPC,
  cat, street or quest index from any one story may appear in `engine/`. The engine
  knows mechanisms — raise staged tiles, open a fitting room, drop a storefront ribbon
  — and content declares which quests, which NPC, which tiles. `node test/smoke.js`
  enforces it: a Meridian name in engine code fails the build. This is the teeth on
  *"if a feature cannot be turned off for AJ, it is built wrong."*
- **Learning is the deliverable, not a side effect.** *(2026-09-01, owner: "i need to
  really learn and implement AI best practices and for roles. I need to know
  documentation and terminology and to teach it to my people.")* A quest is not done
  when it teaches a judgment call — it is done when the player could **run the meeting
  and name the thing.** So every pack owes three things beyond the story: the real
  **terminology** a practitioner would use, said by a character in plain speech and
  captured verbatim in the codex; the **documentation** that role actually produces,
  as a real artifact (`docs/templates/`, the decision report); and enough that the
  owner can **teach it onward** — the report is a portfolio, and the codex is a
  curriculum. If a quest cannot survive the question *"what would I call this in front
  of my team?"*, it is not finished.
- **Endings play in the world, not in a curtain.** *(2026-09-01, ❗El listón.)* No
  cutscene takes control to tell the player they did well. The street changes, they
  walk through it, and anything longer — speeches, the report read aloud — is
  walk-up dialogue they may elect to hear or skip. Owner's words: *"we make the
  player notice for 5 seconds then the game goes back to normal."*

## Asking someone what game they want

`/game-brief` builds a tailored questionnaire for anyone who wants a custom game —
their world, cast, loop, feel, stakes and taste — plus a map of which files each
answer moves. Reference implementation: `docs/for-aj/`. Owner's ask: *"we can wrap a
skill around this aj exercise for best/recommended questions for custom games
questionnaires."*

The rule that skill carries and that applies here too: **do not ask about a mechanic,
ask about a feeling.** "Do you want hearts?" is the wrong question; "should anything
ever go wrong, and is there a mini-game where stakes would be fun?" is the right one.
Asking it the wrong way is how the hearts confusion happened in the first place.

## The shape of the game (signed 2026-08-31, with caveats)

The owner's purpose, in their words: *"right now the goal for us is providing comfort.
With my personal one of practicing ai skills."* Comfort is the product; the AI practice
is the mechanic. Keep that order — it is what stops learning from feeling like homework.

**North star.** *Meridian is a barrio that grows because you helped it.* The player
should log in to see what is different in town, not to find out whether they won.

**Three rules, signed "for now":**

1. **The record is a room, not a menu.** The decision report is the game's collection
   mechanic — its museum — and a collection you cannot walk into is not a collection.
   It gets a physical home in the world that visibly fills.
2. **Clients, not chapters.** Every business is open; each is a relationship that
   deepens as you answer its quests. Trust in a business replaces a chapter gate. No
   weeks, no locked doors.
3. **The goal line above** is stated out loud in the game, once.

**Caveats the owner attached — these are part of the signature, not footnotes:**

- *"for now it sounds good"* — this is a working shape, not a constitution. Revisit it
  after real play; nothing here outranks something learned from actually playing.
- *"remember to leave room in architecture to change if needed"* — build all three as
  data in the content pack, never as engine assumptions. A rule that cannot be turned
  off is a rule that will be regretted.
- *"and to custoize for AJ's game"* — **AJ's game is a first-class target, not a
  someday.** Every system here ships as a content-pack seam so AJ's game can swap the
  businesses, the deliverables, the trust language, or drop the career layer entirely
  and keep the comfort. If a feature cannot be turned off for AJ, it is built wrong.
  **Settled 2026-08-31:** *"for ajs game same engine and a different content pack but
  can borrow from mine."* So — one engine, never forked; a new `content/<aj>/` folder;
  and Meridian's pack is a lending library, not a base class. AJ's pack may copy any
  quest, NPC, tile or deliverable from `content/meridian/` and change it freely. Copying
  is the sanctioned reuse; inheritance is not, because a shared base would make Meridian
  unable to change without breaking AJ.
  **AJ, 2026-08-31:** she/her. *"the best humie ever. she will be working on games for
  fun using meridian quest as example but will want an open world comfort concept."*
  Her taste is already encoded in `docs/IDEAS.md` §9 — Marvel, Harry Potter, Vampire
  Diaries and PLL are in; the candidate list (Ghibli, Gilmore Girls, Stranger Things,
  Bridgerton, Riverdale…) reads teen mystery-romance plus cozy plus nerd canon.
  Questions for her and the map of what each answer changes are in `docs/for-aj/`.
  **She is a designer, not a stakeholder — ask her directly and take the answer.**
- *"prepare mock documentation and templates so we can technically use these for work
  and clients in the future — would be dope — thus the idea to export."* The export is
  the point of the exercise: the paperwork the quests teach should be real paperwork.
  Five templates written 2026-08-31 in `docs/templates/` — usable by hand at work
  today; the game only generates the decision log so far.

## What a session feels like under this shape

*(Owed to the owner as a walkthrough and never delivered live — written down instead,
2026-08-31. If this reads wrong, the shape above is what changes.)*

You open the game on your phone. No countdown, no "day 4 of 7," no unfinished business
blinking at you. Calle Principal at whatever hour it is, and the lights are on at El
Mercado because you got the gate open last time.

You wander. That is allowed and it is most of the point — the jacarandas move, Frijol
is asleep on the scale, Nacho has painted something new on the wall. Nothing is asking
you for anything.

Doña Chelo has a ❗ over her head. You walk over because you want to, not because a
quest log told you to. She has a problem: the phone rings forty times a day and every
call pulls Perla off the register. You get the codex — the short bit of real teaching —
and three ways to answer. You pick the wrong one.

Nothing punishes you. You get a verdict that explains why it was wrong without telling
you the right answer, a funny beat, and the quest stays open. A heart is gone. Your
city is untouched, your save is untouched, and Chelo will talk to you again in a
minute. You try again and get it.

Something shifts in how she talks to you. Not a number going up — the next thing she
asks you is a harder thing, the kind you only ask someone you trust. That is the
progress bar, and it is a person.

You get bored of the mercado, so you leave. Down the street the taller is open too, and
Don Tacho has a completely different problem and does not trust you at all yet. You can
work on either. Neither closes.

On the way out you pass the room where your record hangs. Twelve calls, two jobs, and
the wall is visibly fuller than it was last week. You can take it with you — it is a
real document with your name on it, and it is the thing that leaves the game and does
something for your actual career.

You close the app. Nothing was lost, nothing expired, and there is a barrio out there
that is a little more built than it was, because you helped.

## Taste — how to write and plan for this owner

- **Plain language, player-side.** Describe what the player sees and feels, not the
  architecture. The owner has twice been confused by implementation framing
  ("no engine work", "the replay rewind is asymmetric"). Say *"the Studio you built
  is still standing in a game where you never built it"* — not *"OBRA stages have no
  rewind path."* *(2026-08-31)*
- **Rules should fit in one sentence and travel.** The owner intends to reuse these
  systems for other stories: "we can reuse the same for other stories in the future."
  A rule that needs a paragraph of exceptions is the wrong rule. *(2026-08-31)*
- **Think wider than one phase.** Asked for one business, the owner said "grow the
  city! plan all 4." Bring the roadmap, then build one. *(2026-08-31)*
- **Recommend, don't survey.** Every option gets a one-line consequence, and one of
  them is marked recommended. The owner wants a foreman with an opinion.
- **Consequences over scolding.** A wrong answer earns a verdict, a codex entry and a
  funny beat — never a lecture and never a locked door.

## Bringing a decision (the side-quest format that works here)

1. **One call, at most four questions.** Header ≤12 chars, in character.
2. **State the tradeoff in the world**, not in the codebase. "When the player walks
   into El Mercado, what day is it?" beat a paragraph about chapter gating.
3. **Two to four options, each with its real cost.** Mark the recommendation.
4. **If the owner asks a question back instead of choosing**, answer it plainly and
   re-ask — don't guess. This has happened and it worked well both times.
5. **Never bundle a settled rule into a new question.**

## Honesty rules for the session running the skill

- **If the planner agent does not run** — rate limit, error, anything — say so in the
  first line of the reply and label whatever plan you produce as your own, in his
  voice, not as his. This went wrong twice on 2026-08-31. *(owner: "are you in charge
  of these? ... i want to make sure you are only planning with nacho to be honest")*
- **Stay in your lane.** `/don-guero` plans parcels, businesses and AI-role packs.
  `/nacho` plans story, arcs, character threads and endings. The session builds. Do
  not plan story on Don Güero's behalf, or parcels on Nacho's.
- **Signed ≠ built.** When the ledger records a rule the code does not implement yet,
  say so wherever it is written down, every time.

## The approval ladder (owner's goal, 2026-08-31)

> "i want to start with the most control, i referee every time, but i want us to build
> skills and processes from my input so i eventually can just browse and approve
> nachos and don gueros plans"

**Stage 1 — referee (now).** Every real tradeoff goes to the owner as a side quest.
Every answer gets written into this file if it outlives the phase.

**Stage 2 — browse and approve (the goal).** A planner brings one plan with its
decisions already made against the Settled list, and the owner reads it and says go.

**How a rule graduates from Stage 1 to Stage 2:** it gets asked once, answered, and
written here in one sentence. The test is whether a planner could apply it to a
business nobody has invented yet. If it only makes sense for El Mercado, it is a phase
decision, not a standing rule — leave it in the decision log and out of this file.
