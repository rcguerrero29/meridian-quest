# Cooking games — the sweep, 2026-09-11

*Run at the owner's word, `docs/ASKS.md` 2026-09-11: "do prepare as aj will want a pseudo cooking
game - she will have examples, but we want to build a chiller version… we have built for this!!! but
we dont have to build yet - just research and create a chef afficionado, food gaming critic, food
game designers, sotry line, has to be chill/comforting. we like asian and mexican/hispanic recipes."
Then, filing it: "have agents learn about it so we can ensure we prepare to build one in the near
future… all agents much learn."*

**RESEARCH ONLY. Nothing here is a build order and nothing was built from it.** Three researching
agents ran; this is their output preserved, with the tags they wrote.

> **If you are an agent about to build something, you do not need this file.** The rules are in
> `docs/GENRE-RULES.md`, two pages, with the traps. This is the long version, for a person.

> **❗ The `engine/engine.js` line numbers below are the ones the sweep wrote and five of seven
> spot-checked were already stale** — see the drift table in `docs/GENRE-RULES.md`. Grep the
> identifier. Never paste the number.

> **❗ Sourcing caveat, in the researchers' own words, per `docs/SOURCES.md`:** the egress proxy
> blocked WebFetch on almost every domain tried (gamedeveloper.com, projecthorseshoe.com,
> lostgarden.com, medium.com, wikipedia, blog.playstation.com, itch.io and more). **Every `[WEB]`
> claim carries a real URL, but most reached the researcher through a search-result extract rather
> than a read of the page.** Quoted strings are as the search tool returned them and must be
> re-verified against the source before anything is published outside this repo. Three primaries
> nobody could open and somebody should: the Project Horseshoe 2017 report §2, Wren Brier's GCAP19
> talk *"Creating a game without fail states or scores"*, and Bódi's *"The Duality of Cozy Games"*.

---

## 1 · The split is an origin story, not a style choice

`[WEB]` The "cooking game" most people picture is really the **time-management** genre, invented on
purpose by Gamelab with **Diner Dash (2004)** — lead designer Nick Fortugno with Eric Zimmerman and
Peter Lee — credited as *"a pioneer in the genre of 'time management' games"*. The clock was not
inherited from cooking; **it was the invention.** Cooking was the costume on a queue-management
system: seat, take order, serve, bus, tip.
https://www.nickfortugno.com/portfolio/diner-dash/ · https://en.wikipedia.org/wiki/Diner_Dash

**So removing the timer is declining one 2004 invention, not vandalising a genre.** Worth saying out
loud to the person who wants a calm one, or she will keep apologising for wanting it.

### The pressure half

| Game | Core verb | What it tells us |
|---|---|---|
| **Overcooked** | carry and hand off, on a shared screen | `[WEB]` Ghost Town's Phil Duncan: *"We wanted a game where everybody is gathered around the TV and they're all screaming at each other and pointing."* Cooking was chosen as a good **basis for cooperation** — the food is a pretext for a dependency graph between players. **Remove the timer and literally nothing is left.** The cleanest proof that cooking is not the source of tension in cooking games. https://www.redbull.com/us-en/overcooked-2-ghost-town-games-interview |
| **Cooking Mama** | trace a stroke | `[WEB]` Each minigame *"usually lasts less than 10 seconds"*; bronze/silver/gold; the timer *"gets faster and louder as you're running out of time."* **The gesture is pleasurable independent of the score, and the medal is removable without the gesture collapsing.** https://www.commonsensemedia.org/game-reviews/cooking-mama |
| **Cook, Serve, Delicious** | sequence recall under a clock | `[WEB]` *"Preparing dishes requires a sequence of keyboard-and-mouse or controller actions, itemized on-screen."* Director David Galindo: the games *"can be tense nightmares about working alone at a restaurant counter."* **The data shape underneath survives the timer's removal: a dish is a list of steps with per-customer modifiers.** https://en.wikipedia.org/wiki/Cook,_Serve,_Delicious! |

### ❗ The natural experiment — CSD3's Chill Mode

`[WEB]` Vertigo shipped the control group for our exact question. *Cook, Serve, Delicious! 3?!* has a
Chill/Zen mode that removes customer impatience and walkouts entirely (and the rival food-truck
attacks), framed as accessibility work alongside reduced motion and colourblind options. **The
price: *"with chill mode, the Gold medals are off the table, and you can only earn up to a silver
medal in each level."***
https://www.thexboxhub.com/cook-serve-delicious-3-review/ ·
https://butwhytho.net/2020/10/review-cook-serve-delicious-3-brings-a-new-structure-to-familiar-gameplay/

**A studio a decade into this genre removed the pressure and could find nothing to put in its place,
so it capped the reward instead — which is an admission that the score WAS the content.** This is the
load-bearing finding of the whole sweep and it is repeated at the top of `docs/GENRE-RULES.md`
because it must be read *before* somebody proposes a calm game, not after.

`[WEB]` The sequel walked further: Galindo refused to make CSD4 (*"a sequel with just new foods and
little changes"* would be *"very boring and clinical to make"*), and **Cook Serve Forever** replaced
typing with rhythm plus a drafting layer and a real narrative — *"occasionally you'll cook at home,
which removes the timer and is a more chill experience."* **The home sections are the nearest
proof-of-concept to what is being asked for here, and they are the smallest part of that game.**
Note what the studio reached for when it dropped the clock: **a story and a draft — both authoring,
not systems.** https://toucharcade.com/2023/05/15/cook-serve-forever-steam-deck-early-access-interview-mobile-ports-vertigo-gaming/

## 2 · The calm half — the five things that survive the timer's removal

Condensed into rules in `docs/GENRE-RULES.md` R1–R5. The cases, with their sources:

- **Venba (2023, Visai Games, creative director Abhi).** `[WEB]` The mother's Tamil cookbook is
  damaged in the migration, so *"large sections of each recipe have either been obscured by smudges
  from cooking debris or torn away"*, and the ramp is the damage getting worse *"to later on becoming
  an entire page with only diagrams to work with."* You fill gaps from clues and *"in some cases,
  rely on memories Venba has of her mother cooking."* Get the order wrong and the game *"gently
  encourages the player to start over"* — no timer, no score, no loss. Whole game is 1–2 hours; the
  recipes were researched, cooked by the team, and re-cooked *"multiple times to make sure
  everything's correct."* Abhi on why the mother is centred: *"Diaspora media often is focused on the
  children… The parents come off as caricatures… They play up the accents for the parents and they
  play down the accents for the children."*
  https://www.gamespot.com/reviews/venba-review-tourist-to-your-own-culture/1900-6418096/ ·
  https://intoindiegames.com/walkthroughs/venba-walkthrough-all-recipes/ · https://gamerant.com/venba-interview/
- **VA-11 HALL-A.** `[WEB]` *"You do not choose what Jill says so much as how she mixes the drinks.
  This affects the flow of conversation, what stories get told, and even future conversations."*
  Serving one correct and one incorrect drink **triggers extra dialogue**; several secret scenes are
  reachable only through "wrong" drinks.
  https://www.gamedeveloper.com/design/a-breakdown-of-the-drink-choice-mechanic-in-sukeban-games-i-va-11-hall-a-
- **Coffee Talk / Tavern Talk.** `[WEB]` Same device, two tunings: Coffee Talk's higher customisation
  *"gives a sense of more freedom… compared to VA-11 HALL-A's prescriptive drink mixing engine"*;
  Tavern Talk adds rumours gathered from patrons and brewed into quests, so **serving the drink and
  shaping the world are the same action.** The dial to offer: **prescriptive** (there is a drink they
  wanted — the pleasure of getting it right) versus **expressive** (any drink is a statement — the
  pleasure of being seen). https://www.hardcoregaming101.net/coffee-talk/
- **Unpacking.** `[WEB]` *"No scores, no time limits, no fail states, no consequences to choices, and
  no dialogue"* — Wren Brier's GDC talk is titled *'Unpacking' Zen: Designing a Game Without Fail
  States or Scores*. ~1,000 authored household items and 14,000 foley files; a BAFTA for narrative.
  https://gdcvault.com/play/1029400/-Unpacking-Zen-Designing-a
- **Wanderstop.** `[WEB]` Davey Wreden's tea shop, made out of his own burnout. *"There are no timers,
  no failure, and no urgency. The cup-washing machine takes forever… nor do you need to, because
  there's plenty of cups and never a rush."* https://aftermath.site/wanderstop-review/
- **Cozy Cooking: Tiny Tastes** — the cheapest real mechanic found. `[WEB]` *"people come in with
  different flavour notes they want, and you can go into your cookbook to see what recipes you know"*
  — deduction over a growing cookbook, which gets better as the cookbook grows: **progression with no
  numbers.** https://indiegamesplus.com/cozy-cooking-tiny-tastes-review/
- **Nour: Play with Your Food** — the honest control case. `[WEB]` *"no definitive goal, score, timer
  or end."* Beautiful, tactile, nothing being decided. https://en.wikipedia.org/wiki/Nour:_Play_with_Your_Food
- **Chef RPG** — the trap. `[WEB]` Marketed cozy; *"this isn't a cozy, laid-back game — all cooking is
  done via minigames that require precise rhythm and timing, with constant time pressure as the day
  wears on."* https://game8.co/articles/reviews/chef-rpg-review-early-access
- **Dave the Diver** — pressure quarantined, then automated away. `[WEB]` The serving minigame *"only
  lasts a few minutes"* and *"over time, you can automate the system by hiring employees."* The shape
  for an optional scored thing inside a stakes-free world. https://www.gamedeveloper.com/design/dave-the-diver

`[TRAINING]` — **the ranking of the five engines, and the "decoy is collection" verdict, are the
sweep's own synthesis. Nobody measured them.** They are assembled from the `[WEB]` cases above.

## 3 · What a mistake means when there is no fail state — eight shipped answers

Ranked by the researcher for a calm game. `[WEB]` throughout except where noted.

1. **The mistake becomes dialogue** — the person reacts differently and that reaction is content you
   would not otherwise have seen (VA-11 HALL-A). *The strongest option.*
2. **The dish always completes** — Cooking Mama is un-loseable: fail every step and Mama finishes the
   dish, captioned *"Don't worry, Mama will fix it!"*. **Take the mechanic, refuse the presentation:**
   the angry face with flames is a punishment doing no mechanical work.
   https://cookingmama.fandom.com/wiki/Medal
3. **There was never one right answer** — *A Little to the Left* gives puzzles multiple valid
   solutions (the star count tells you how many), plus a named, blameless skip called **"Let It Be"**
   with no penalty. *The cheapest anti-quit feature in the sweep.*
   https://checkpointgaming.net/reviews/2022/11/a-little-to-the-left-review-dont-you-know-these-kitties-rule/
4. **The mistake returns later as story** — *Strange Horticulture*: hand over the wrong plant and
   Isidore comes back on a later day to complain, and you get another choice. **Consequence and
   punishment are not the same thing.** Caveat for a comforting game: make the returning consequence
   warm (*"my mother asked for the recipe"*) rather than a complaint.
   https://tvtropes.org/pmwiki/pmwiki.php/VideoGame/StrangeHorticulture
5. **A nudge, not a verdict** — Unpacking's one correction is a pulsing outline once every box is
   empty, **and it can be switched off entirely in accessibility settings.** Two lessons, the second
   better: *"this isn't finished yet"* reads differently from *"you got it wrong"*; and the fact that
   you can turn it off says **even the gentlest nudge is a cost to somebody.**
   https://caniplaythat.com/2021/11/01/unpacking-accessibility-review-can-i-play-that-pc/
6. **Off-recipe makes a different real thing** — Potion Craft's Unknown Substance, not nothing.
7. **A gentle restart from the last sensible step** — Venba; and reviewers disagree about whether it
   still feels like failing, which is the honest warning.
8. **Nobody minds at all** — Cozy Cooking: Tiny Tastes. **This is the trap: if nothing minds, nothing
   matters.**

## 4 · The cuisines are the mechanic, which is the good news

`[WEB]` **Mole poblano** runs to *"over 18 different ingredients"*, each toasted and ground
separately in sequence — chiles 30 seconds a side on the comal, *"being careful not to burn them or
the sauce will be bitter"*; whole spices toasted 2–3 minutes and moved to the molcajete while warm.
Venba's Tamil side is built the same way: the tarka, the order aromatics enter, how tomatoes release
water and change the cook. **These cuisines are ordered procedures with consequences, not ingredient
lists — so order-of-operations is a puzzle that needs no clock, and the wrong order gives a
different, worse, *real* result.** It also means the teaching is genuinely true.
https://www.mexicoinmykitchen.com/how-to-make-mole-poblano/ · https://dorastable.com/vegan-mole-poblano-recipe/

`[WEB]` **Nixtamalization** steeps eight to eighteen hours and cooks know it worked by **signs** — the
colour brightens, the skins loosen, the material behaves differently under the hands. **A steep is a
wait you cannot rush: the same clock as a timer with the feeling inverted, and it makes LEAVING THE
GAME the correct move.** https://www.tastingtable.com/1171123/the-process-of-nixtamalization-explained/ ·
https://www.americastestkitchen.com/articles/7652-transforming-corn

`[WEB]` **Respect has a known shape and a price tag.** *Never Alone* was built by Upper One Games
under the Cook Inlet Tribal Council with nearly 40 Alaska Native elders and community members, with
"Cultural Ambassadors" credited on screen; CITC's stated aim included revenue as self-determination.
Venba's smaller version — research it, cook it, re-cook the in-game version until it is right — **is
the reachable bar for a two-person project and it is not optional.**
https://www.culturalsurvival.org/publications/cultural-survival-quarterly/making-never-alone-kisima-innitchuna-celebrating-people
Read against Soleil Ho's *Craving the Other* (agency: people of colour *"not allowed to talk about
their own food"*) and Gustavo Arellano on *the fetish of authenticity*, the rule is **not "be
authentic" — authenticity chased produces a museum, and a museum is not comforting.** It is: **be
specific to particular people rather than representative of a cuisine.**
https://www.bitchmedia.org/article/craving-the-other-0 ·
https://lataco.com/the-fetish-of-authenticity-gustavo-arellano-on-the-perils-of-cultural-appropriation

`[WEB]` **The named failure case is Guacamelee**, and it proves one person from the culture in the
art department is not enough, because the culture entered as art direction rather than story
authority. https://erraticplay.com/?p=282 · https://kotaku.com/im-mexican-am-i-supposed-to-be-offended-by-guacamelee-476018607

**The diagnosable tells, stated plainly:** the food is scenery rather than something a named person
is responsible for; the dishes are the four everyone abroad can already name; a dish appears as a
fetch-quest object; nothing is ever eaten by someone who grew up eating it.

`[CODE]` **The Mexican/Hispanic half is already this repo's native voice, written from inside** —
Doña Rosa's handwritten want-list, row 9, dated *"sin fecha"*: *"That the mole recipe doesn't die
with me"* (`content/meridian/docs.js:294`), and Chelo from the back without looking up: *"Somebody
asks the ingredients ninety times a year and I am the only recipe"* (`content/meridian/quests.en.js:224`).
**The Asian half has no equivalent here and no named person behind it — which is the first thing to
ask AJ, not to guess.** *(Both citations are the sweep's; not re-verified when this file was filed.)*
Per `CLAUDE.md` all of it belongs in a **new pack**: Meridian's content is never edited for another
world's sake.

## 5 · The closest references to hand a person before the interview

`[WEB]` **"Tamales: Con Familia"** — free, browser, tiny, made from the writer's own family's true
stories, self-described as *"calm, repetitive, and relaxing"*. Repetitive is not a defect there: the
hands fold tamales rhythmically while the ears get the conversation.
https://samivonne.itch.io/tamales-con-familia · Also likely to come up: Venba, Coffee Talk, Good
Pizza Great Pizza, Lemon Cake, Wanderstop.

## 6 · The six questions `docs/for-aj/QUESTIONS.md` does not ask

`[TRAINING]` — the researcher's drafting, unsourced. `[CODE]` for the existing sheet, read at
`docs/for-aj/QUESTIONS.md`.

**(a) Whose kitchen is it?** — a home, a stall, a shop, someone else's. *Decides whether the frame
drags us toward tickets.* **(b) When you make something, who is it for?** — nobody, a specific
person, whoever walks in. *This is the VA-11 HALL-A dial and it decides the core verb.* **(c) Do you
already know the recipe, or are you working it out?** — *comprehension engine or expression engine.*
**(d) Name a dish and who taught it to you.** — *the attribution rule, gathered as content rather
than imposed as policy.* **(e) What's the nicest part of cooking for you — the chopping, the smell,
the waiting, or the face they make when they eat it?** — **the highest-value question on the sheet:
one answer selects between five different games that look identical in a one-line pitch.** **(f) Is
there a version of this where you cook the same thing every day forever and that's the point?** — *the
abundance/unrushability question, and the one most likely to surprise us.*

And one more the second researcher added: **ask her what should happen when she gets it wrong**, with
the eight answers in §3 as concrete options to react to — because *"nothing happens"* is the answer
people give when the only alternative they can picture is burnt food, and it is usually not what they
actually want.

## 7 · The three personas the owner asked for — drafted, not created

`[TRAINING]` — proposals. **None of these exist in `.claude/agents/` and none should be created
without the owner saying so.** Recorded here so the drafting is not lost and not silently applied.

| Draft | Remit | Declared bias to watch | What it refuses |
|---|---|---|---|
| **the chef aficionada** (drafted as *Doña Soledad "Sole" Iriarte, cocinera de casa*) | Does the procedure in the game resemble the procedure in the kitchen? Order of operations, what a step is waiting for **in which sense** — smell, sound, the oil coming back up — and what actually goes wrong when you get it slightly off. **Deliberately a home cook, not a chef**: the restaurant frame is what drags the genre back toward tickets and timers | **Authenticity gatekeeping.** *"That's not how my abuela does it"* is true and must never end an argument — it is a second recipe, not a correction | Will not sign off on a dish nobody on the project has **cooked**; will not let a dish be attributed to a country. **One cook per cuisine — she covers one of the two the owner named and must say so rather than reach for what she has read** |
| **the food-gaming critic** | Two jobs: **hunger** (does a dish read as food at 32 px and in the 2.5D view) and **the pretty-menu audit** (is the player deciding something, or only performing something?). Archetype: Thibaud Villanova / Gastronogeek, a chef out of the games industry | **Critics reward novelty and this game's job is comfort.** *"I've seen this before"* is not a finding here | — |
| **the food game designers, seated as a PAIR on purpose** | Own the answer to *"when you remove the timer, what is left to do?"*. **Chair A, the calm designer:** must name which of the five engines every proposal runs on, and **is forbidden from answering "the player enjoys the freedom."** **Chair B, the timer's advocate:** argues the pressure case honestly so that removing it stays a *decision*, and owns the off-switch of any optional scored thing | **Both chairs will reach for a collection/unlock ladder when stuck.** That is the decoy | — |

**Why the pair:** `[WEB]` Vertigo, a decade into the genre, removed the pressure and could find
nothing to put in its place. A single designer drifts to whichever answer is easier that week.

**Overlap to resolve before any of this is created:** Pili already holds the readability chair
(`.claude/agents/pili.md`) and Tavo already holds *"does this survive the tenth time"*
(`.claude/agents/tavo.md`). The food critic is Pili's discipline pointed at a new object class and
the two should be in the room together rather than duplicated; Chair A overlaps Tavo directly.
**Nobody has decided this.**

## 8 · The verdict the sweep reached, and it is not a build order

**The best fit for this engine, by a wide margin, is "the dish is the reply":** someone tells you
something, you decide what to make, the making is a recipe card you fill in, and what you made
changes what they say next. `[CODE]` The researchers claim it needs **zero engine changes** — it
runs on `INTERVIEW` (verified at `engine/engine.js:208`, `:214`), the declarative reader with blanks,
tables, dropdowns and forms (`docSections` `:2962`, `docOpen` `:3082` — **re-verified and both
differ from what the sweep wrote**), `READS`/`DOCS`, a cast placed from data, the held beat for
simmering, and `SEASONS` for an occasion menu.

**The one real gap is inventory** — `[CODE]` grep for "inventory" in `engine/engine.js` returns **0
hits**, verified 2026-09-11. It is a RULE, shared, behaviour-identical for both games on the day it
lands, and it is only needed if the answers point at the Unpacking shape. **It is the second thing to
build, never the first.**

**The one thing that must NOT be built is a day budget**, which is how the timer sneaks back in
wearing cozy clothes. `[TRAINING]` for the recommendation; `[WEB]` Chef RPG for the evidence that it
happens.
