# La Sobremesa — the plan for a second world about eating well

*The working title is Mari's. Nacho wrote the same world as **Sobremesa**, without the article; the
two are the same game and the name is one of the things the owner owes an answer on (§9). Until he
says, this file is `la-sobremesa.md` and the pack folder in every costing below is
`content/sobremesa/`.*

**Status: planned, nothing built, nothing decided.** This file is the consolidation of one crew run
on 2026-09-13/14 — four research sweeps (`docs/research/2026-09-13-healthy-eating-game.md`) and seven
designers. **Every section says who wrote it.** Where two of them disagreed, the disagreement is
written down as a disagreement and not averaged.

**Read first:** `docs/GENRE-RULES.md` (the rules, with R15–R17 added by this run) and
`docs/research/2026-09-13-healthy-eating-game.md` §0 — **every `[WEB]` number quoted anywhere below
reached its researcher as a search extract, not a read of the page, and none of it may leave this
repo until a person opens the sources.**

---

## 1 · The brief — *Mari*

**What the owner asked for**, 2026-09-13, logged verbatim at `docs/ASKS.md:43`: a crew run on a
self-help genre — *"gamified ways to organize my eating habits in a healthy way"* — with research on
healthy habits, gamification psychology, and best practice from cooking apps, pantry apps and cooking
games; the limitations and the good things said plainly; Italian, Mexican and Japanese/Korean
cuisine, *"but of course we are open to all"*; where the game fits; where a future iteration goes;
what search and other features we can reuse. The goals in his words: **healthy eating habits**, help
**organize our food**, **learn new recipes**, **play games**, **organize future meals and the
pantry**, be able to **copy and paste some recipes**, **learn about nutrition**, with **places to
check the facts so we know where the info comes from**, and **characters that make it fun**. *"You
dont have to build it yet but high fidelity mocks would be good."*

And from 2026-09-11, also his: *"aj will want a pseudo cooking game — she will have examples, but we
want to build a chiller version… has to be chill/comforting. we like asian and mexican/hispanic
recipes."*

**The one-line brief this produces:** *a calm second world where you plan and cook a meal at home for
somebody who will ask you about it afterwards, and the pantry is a list and a freezer.*

**The three refusals that are load-bearing, and the owner is asked to confirm them rather than to
choose them** (§9, question 0). Each is where a food game does documented harm:

- **No calorie total, no weight field, no "over budget" red.** Of 105 people with an eating disorder,
  ~75% used MyFitnessPal and 73% of those felt it contributed.
- **No streak that can reset.** The primary habit study everyone cites for streaks says a missed day
  does not affect habit formation; the lapse is the moment people quit.
- **No score the game computes about a dish.** A computed number becomes a verdict on somebody's
  grandmother's food.

**What it may honestly promise:** it helps you plan, cook, remember and learn. **Not** that it
changes what anybody eats — 36 RCTs of gamified versus non-gamified apps found *"no significant
effects… on dietary factors"* — and never a weight, a disease or an allergen verdict.

---

## 2 · The loop — *Tavo*

**What replaces the pressure is reading a person** (`docs/ARCH-LOG.md` A11, row 1). Not because it is
cheapest, though it is, but because **it is the only one of the five whose content renews from the
player's own input instead of from authoring.** Comprehension is one-shot — every hole is filled once
and day ten is a content cliff. Fit is A11's most expensive row *and* the market's documented cause
of death. Tactility is spent last. **Unrushable duration arrives free inside the cuisines** — the
nixtamal steep, the kimjang, Hazan's forty-five minutes, the doenjang that has to sit — and is
content, not a mechanic to build.

**The daily loop — sixty seconds, and most days nothing.** You open the street. It is a row of **home
kitchens, not shops**; the restaurant frame is what drags this genre back to tickets. A cook is in
her doorway. **There is no ❗.** You walk over because you want to. She asks about the one thing on
today's slot. Four buttons — *made it · made something else · ate out · not today* — and only "made
something else" opens a text field, which is optional. **That is the entire log: you type only when
reality differed from the plan.** Logging by exception is the only shape that survives (see R17), and
it is the only one that never lies, because silence means nothing rather than "yes". Her reply is
about the **food**, not about you. Then something changes that you did not ask for: a jar on her
sill, a sprig in the window box.

**Do not build a marker that re-arms with the day.** `[CODE]` Neither marker in this engine does:
`roomPending` is an "unanswered ever" flag and the quest ❗ is quest state. A badge that reappears
every morning is a daily-login obligation, which is the one thing that cancels the measured wellbeing
effect of calm play. **The absence of the marker is the design, not a limitation.**

**The weekly loop — ten minutes, once, and it is the spine.** The week turns, or a season does. One
cook offers **three dishes — not four, not a browsable list.** KptnCook and Mealime both sell fewer
choices and users thank them for it; **but the offers never expire.** A 24-hour vanishing card is
scarcity wearing delight's clothes.

You say yes to as many as you want — **zero is a legitimate answer and the game says so out loud** —
and you pick *when*: "Thursday, after work." That sentence is an implementation intention, d = 0.65
across 94 studies, and it is the highest-yield thing this game can ask anyone to write.

Then it subtracts: **recipe ingredients minus the staples shelf = the shopping list**, with one Copy
button. And optionally **the `.ics`** — *"Sunday 5pm, soak the beans."* **That is the most important
surface in the whole design and nobody had connected it: the habit fires in his kitchen at six on a
Thursday and the game is not there. The calendar is.**

**What it teaches.**

| Teaches | How |
|---|---|
| Deciding beats performing | The decision is which slots get filled from what is in the house. Nothing is timed, nothing is traced |
| A dish belongs to a person, never a nation | Every card carries who taught it; pasted recipes carry whoever gave them to him |
| Where a claim comes from | Facts are cards in a cook's kitchen with the source printed underneath — **and two cooks disagree on purpose.** The Japanese cook says the soup is where the salt hides; the Korean cook says kimchi is about a fifth of her country's sodium and she still makes it every year. **One nutrition oracle teaches deference; two cooks who disagree teach judgement** |
| **By accident, if unguarded:** "you owe the game a week" | An unfilled slot rendered as *empty*. **A week shows only what you put in it. Three lines is a full week** |
| **By accident, if unguarded:** "the game is scoring me through dialogue" | If the cooked branch is warmer than the didn't branch. **The "not today" line must be the best-written string in the pack** — it is the moment people quit, and it costs two strings per cook per language |

**Day ten, honestly.** Days 1, 3 and 7 are fine. Day ten is where three offers become a menu you
scroll and the cook's lines repeat. Four things hold it and only one is load-bearing: **(1) the
recipes are partly his own** — he pastes them in; (2) the cook asks about a dish from three weeks
ago; (3) the season changed and the offers changed with it; (4) nothing punished the days he skipped.
**The honest failure mode in one sentence: if he never pastes anything in, this is an authored
content pile and it ends when the content ends.**

**What Tavo would cut.** The pantry ledger, entirely — keep a **staples shelf** declared in content
per cuisine (four jars Japanese, five Korean, the milpa three, the Italian seven) that the player
never maintains, plus this week's list. No expiry dates, no red, no "running low". Every number the
game computes about food. Streaks and any counter that can fall. Any question about what he ate or
what he weighs. Unlocking kitchens — **the other kitchens arrive when he asks for them, requested,
not earned.** Three cuisines at launch: **one kitchen fully written beats four sketched.**

**The one thing that is a game** — optional, weekly, and it will bore first: **the composed plate.**
*Ichijū-sansai*'s five slots, the bapsang's cheop, the milpa plate, primo/contorno — filled from a
`checks` field and drawn on a canvas. It is Fit bought as content instead of as inventory: **one
shelf, never a house.** It teaches each guideline's own shape with no number and it can never say you
got it wrong.

---

## 3 · The cast — *Nacho*

**The world is one building, four doors and a courtyard.** Not a street of shops and not four
national kitchens on a food court: **a four-unit vecindad around a patio** with a lemon tree, a
washing line, a cat who belongs to nobody, and a long table somebody drags out when there is a
reason. Four households, a corner shop on the street side, and **a fifth door — yours, empty.**

Why a building: the commensality evidence says the feature with a finding behind it is *eating with
other people*, and a courtyard makes that the geometry instead of a message. It also solves R12
structurally — **four households cannot be representative of four nations** — and it is small, which
matters because `docs/GAUGE.md` says a second world's first green run is not available at any size
below Meridian's. Be dense, not wide.

**You are the one who writes it down.** Not a chef, not a student, not a nutritionist. You are the
new tenant, and what you have that four cooks do not is a notebook and the habit of asking a second
question. **That answers "copy and paste some recipes" diegetically: pasting is taking down what
somebody told you.**

**The opening is moving day, and that is evidence, not taste.** People re-decide habits when they
move house. Boxes on the floor and an empty shelf also make the empty pantry *true* rather than a
contrivance. The first decision is not about food — it is *where does the kettle go*, which is
friction design, a decision, and no clock.

**Four grandmothers is a stamp album.** A nonna, an abuela, an obaachan and a halmeoni is exactly the
museum R12 warns about: the moment a player can say *"the Italian one"*, the character has stopped
being anybody. So one household per cuisine, **no two the same generation, gender, household shape or
reason for being in that kitchen**, and one of them holds a cuisine he is not sure he is allowed to
teach.

| Door | Who | What they hold | Why they are a person and not a flag |
|---|---|---|---|
| 1 | **Nello Bevilacqua**, 66, widower; learned to cook at 61 because Piera died and he was hungry | *cucina povera* — the sauce you cannot hurry, pasta e ceci, ribollita; **what you keep out** | He is not a nonna. He is a man who was fed for forty years and is finding out what it cost. **Piera's notebook says *q.b.* — *quanto basta* — where every quantity should be.** A true incompleteness, and the best single object in the game |
| 2 | **Cande Bustos**, 38, and her father **Chemo**, 71, who moved in with her | the milpa plate — beans, nixtamal, salsa, a green; Sunday batch cooking; quelites and nopales | Her aunt Herminia's frijoles have lard; her mother's had chard; the two women did not speak for a year. **Both are the recipe** |
| 3 | **Yun-seo "Seo" Baek**, 29, moved here for work, cooks from her mother's video calls | banchan — season a vegetable, make it ahead, three and rice; kimjang as the long project | **She is the one who says the food is salty**, because her mother's doctor said it first. The caveat enters from inside the culture, never as the game correcting her |
| 4 | **Tomo Iwasaki**, 34, and **Haru**, 7 | *ichijū-sansai*; *sa-shi-su-se-so*, the order rule with a physical reason | He learned from a textbook and a colleague's mother, not at home, and he says so. Three small things, because a seven-year-old will eat two |
| 5 | **You** | the notebook | The only person in the building who eats in more than one kitchen |
| street | **Ofelia**, the corner shop | the shopping list, and **the source cards** — she keeps the printed guidelines behind the counter because her nephew is a nutritionist | She is the one who says *"you buy chard every week and you throw half of it away."* Waste is about the kitchen, not the body |
| patio | **Perejil**, the cat | nothing | Everyone claims her and everyone feeds her the wrong thing — the game's running joke about feeding people what you think they want |

**Two refusals in the cast.** Nobody is a nutritionist, a coach or a trainer: **the moment a
character's job is your habits, the game has hired a supervisor.** And **no character ever comments
on the player's body, weight or how much they ate** — ever, in either language.

**The three careers the shell forces on us are the best question in the game.** Because a pack cannot
today drop the Architect / Diplomat / Operator door (§5, blocker A), put the 2026-09-11 sweep's
highest-value question in that slot: *what is the nicest part of cooking for you?* Three reasons
people cook — **el que planea** (Sunday, for the week) · **la que improvisa** (eight o'clock,
whatever is in there) · **el que alimenta** (because somebody else has to eat). **It changes how the
neighbours greet you and nothing about what you can do.** A greeting, not a mode — and it does not
pre-empt A11.

**The season, not the streak.** A chapter is a week: a Monday want, an escalation that is *a person
changing what they need* (never a clock), a Saturday that pays something off. Chapter 0 *La puerta
cinco* (moving day; Nello knocks with a plate; how does the plate go back — washed, or with something
on it). Chapter 1 *Nello · q.b.* (the ragù is in Piera's hand and unreadable; four neighbours taste
it and each says a different thing; the missing step was one she never wrote because she did not
think it was a step). Chapter 2 *Cande · el domingo* (the aunt rearranges the shelves, is right about
one thing and wrong about another; both versions on the table at once; **there is no *the* recipe**).
Chapter 3 *Tomo and Haru · una sopa, tres cositas* (the order rule; the loud one goes in first and
the dish is **duller, not burnt**, and a seven-year-old says so). Chapter 4 *Seo · el frasco*
(kimjang needs more hands than she has; four households salting cabbage in the courtyard; **it will
not be ready for weeks, the game says so, and does not hurry**).

**The close is a sobremesa, not a ceremony** — the table goes long, the plates stay out, nobody gets
up. The record is a strip of tile at the table's edge where the date of a meal is scratched: **a
record of the past only, never a list of the future.**

**The endings, and the code fact that changes them.** `[CODE]` `gradeOf(c)` (`engine/engine.js:374`)
grades a district by the fraction of its answered quests that landed first try and **returns 3 when
nothing has been answered** (`:376`). So in a pack where nothing can be answered wrong, **every
ending is the warmest ending, silently, forever, with no test failing.** The fix is a story rule and
needs no engine change: **the marks go on the logistics, never on the person** (now `docs/GENRE-RULES.md`
R16). How much chard one person can eat before it turns, whether a plan survives a Tuesday, which
shelf the lentils live on — retryable, markable, funny. *What somebody ate* is never marked in either
direction. With the marks living there, the three ending variants differ in **who is at the table**,
never in what is on it, and the quietest variant is the **longest**, per Meridian's own asymmetry.

---

## 4 · The look — *Pili*

**The failure this is one bad decision away from:** a pantry, a market, a recipe card, a week and a
fact are all *rectangles with things in them*. At 32 logical px in the world and at .72rem monospace
in the reader they become one beige blob. **Separate them by what kind of object each is — height and
mass distribution — before colour.**

| Thing | The read | Mass | Box or billboard |
|---|---|---|---|
| **Pantry** | horizontal shelf bands with a **ragged top edge** — jars of different heights breaking each line | continuous, floor to head | **box** + a side drawing |
| **Market** | an awning stripe over a **dark hole** over a lumpy knee-high band | top and knee, hollow between | facade box + crates as boxes; the floor is flat |
| **Recipe** | a small tin with a lid, or a wedge of pages, **tilted off-square** | one low lump | box or cutout |
| **The week** | a slate or clipboard with one ruled edge — **not seven days** at tile size | flat vertical panel | cutout |
| **A fact** | **no silhouette at all.** It is a quotation | none | neither |

**The pantry must not look like the bookcase.** `[CODE]` `TILESIDE["S"]` is already a two-upright,
three-shelf bookcase and books make a *flat* run; jars have lids and different heights, so **the top
of every pantry shelf is ragged, and that ragged line is the whole difference at ten tiles.** One
drawing. **The market is the pantry turned inside out** — wide, open, outdoors, mass at the top and
the knee with a person-shaped gap. Put them side by side on the cold-read sheet and they read as
opposites.

### The one call that every other screen inherits

**Draw the composed plate as vessels on a tray, never as a divided circle.** A plate seen from above
and divided by proportion is **a pie chart**, a pie chart of what somebody ate is a verdict, and at
32 px five wedges is a smudge. Vessels fix all of it: count and size carry the meaning, you can count
one versus three versus five lumps at thumbnail size, it is literally what a bapsang and an
*ichijū-sansai* tray are, it works for tortilla-plus-bowl-plus-green and for a shallow pasta bowl
plus contorno, **and nothing is out of a hundred and nothing is red.** The official diagrams — the
Plato del Bien Comer, the Spinning Top, the Food Balance Wheels, the CREA pyramid — get redrawn
**once each, at 240–560 px, inside a citation card credited to the ministry that published it**, and
never as gameplay UI. *(This is the call Pili most wants taken before anything is drawn; it is cheap
now and expensive in a month.)*

### Which surface each screen is

`[CODE]` four surfaces exist: the world; the card (including `.handed`, the folded cream sheet with a
staple you tap inside a conversation); the reader (cream paper, `h · p · note · red · blank · kv · t
· q · btn · sel · form · docs · art`); and the wall.

- **Pantry** — world → reader. You stand in front of it; tapping opens a sheet of what is on it. The
  shelf is a place, the list is paper.
- **Market** — world only. **A market you read instead of walk is a menu.**
- **Recipe card** — **card → reader via `.handed`.** A recipe is handed to you by a person.
- **The week** — reader, a `wide` picture you scroll along. **Never a seven-column table**: three
  columns is the phone ceiling, and one long dropdown option has already pushed a whole form off a
  phone in this repo.
- **A nutrition fact** — reader, `note` + `kv`, never its own screen. `.dnote` is cream with a 3 px
  gold left rule, italic: **the engine already owns a "this is quoted from elsewhere" mark.** Use it
  and never colour it.
- **"I made it"** — the card. The reply is a person's line in a bubble, not a panel.
- **What she has cooked** — the wall. **`[CODE]` the mural's shipped idiom is that paint only ever
  goes on** — so a wall that records cooking **cannot show a smaller number tomorrow than today**,
  which is R15's look, already built, art-only, and it needs no counter.

### Palette per cuisine, without the flag

**Take the palette from the cooking surface and the preserved food.** That is where four kitchens
genuinely differ, it is a *value* story, and it survives a theme tint and a colour-blind player.

| Kitchen | Ground (the identity) | Vessel | Accent | Not the cliché because |
|---|---|---|---|---|
| **Mexican** | seasoned comal, matte near-black `#3A3630`; nixtamal cream `#E8DCC0` | barro, unglazed terracotta `#9B5B3C` | **dried chile brick `#8E3320`** | dried chile is a *dark* red; the flag's is `#CE1126`. The loudest thing here is the black comal |
| **Italian** | floured wood `#C9A97E` with flour bloom `#EDE3D0` | white glaze `#F4F1EA`, one blue rim | **olive-oil gold-green `#9AA33F`** | the flag is refused entirely; tomato is a dot, never a field |
| **Japanese** | pale hinoki `#DCCFAE` against lacquer near-black `#2E2320` | lacquer black, one interior red `#7A2E24` | **nori/kombu `#23301F`** | the accent is seaweed, not the disc; the contrast is **value**, so it reads at any size |
| **Korean** | onggi brown `#6B4A33` + a stainless band `#B9BCC0` | stainless bowl + white porcelain | **gochugaru `#B44A21`** | stainless is the un-clichéd Korean note and a bright neutral no other kitchen has |

Two disciplines: **the four accents must be four different values** (hue alone fails at dusk, under a
theme and for a colour-blind player), and **a cuisine palette is a season, not a redesign** — the
owner's settled rule is *a season changes colour, never design*, and walking from one kitchen to
another recolours the room and moves **not one silhouette**. **Never tint skin, hair or an apron.**

### What reads, measured

**World, 32 units/tile.** Reads: three to five masses; a horizontal band; a ragged top edge; tall
lump versus wide lump; a bright field with a dark hole. **Does not read:** seven of anything; a
divided circle; steam; a single ingredient (a carrot and a chile are the same orange lump — only a
*crate* reads); any number. **`[CODE]` the only word in the entire shipped pack is `"MQT"` at 7 px on
the trolley sign. Nothing in the new world may carry a word.**

**Reader, 240–560 CSS px canvas, nearest-neighbour.** That is 7–17× a tile's area: **this is where
detail becomes legal.** A day-bay in the week needs **≥ 100 px** to hold two dish lumps and a day
mark, so a legible week is ~840 px natural, scrolled inside a 352 px column. And a cost nobody had
stated: **"thirty plants" at one column width is 11 px a sprite — invisible.** It is its own `wide`
strip at ~40 px each, about 1,200 px. Drawable, scrollable, **a real line item, not free.**

### Marker language — there are no free marks left

`[CODE]` four marks are spent: the bouncing red ❗ (*this person has work for you*), **the breathing
cream card** (*this thing can be read*), the yellow ⬆/⬇ (*a portal*), and the trade emoji beside a
head. **A recipe, a note, a card, a label and a page all collide with the cream card. Do not invent a
fifth mark** — reuse it and put the difference in the object underneath, which is what this engine
already does. And the mark somebody will reach for — *"this ingredient is / is not in the pantry"* —
**should not be a mark at all.** It is the presence or absence of a line on the list. A tick and a
cross over groceries is a checklist floating in a kitchen, and a cross on a coloured field reads as
**crossed out** in this project specifically.

---

## 5 · The engine — what carries free, what is genuinely missing — *Beto*, with *Toño* on the words

### Carries today, with no engine change `[CODE]`, re-grepped 2026-09-14

| The ask | The seam |
|---|---|
| **"Copy and paste some recipes" (in)** | the reader's `form` block, `engine/engine.js:3485`; `fd.type==="area"` builds a real `<textarea>` at `:3492` and `f.run(read())` hands the pack raw strings. **The paste surface exists today on the same screen as the paperwork.** All four sweeps called this a gap; **it is not a capability problem, it is a sanitisation problem** |
| **Recipes out** | `docCopy` (clipboard) and `docDl` (a `.md` file) run over *any* document. Every recipe card is copy-out and download-to-disk for free, in whichever language the reader is in |
| **A recipe card** | `docDef(id)` `:3369` — **a document may be the object itself, never registered in `DOCS`.** A recipe the player pasted five minutes ago is a first-class document. **This is the single most useful fact in the whole run and no research lens found it** |
| **Facts with their sources** | `note`, `kv`, `t`, all `textContent`. "Source: USDA FoodData Central" is a `kv` row |
| **A search over recipes** | the town's `indexDoc()` (`changarrito/content/record.js:248`) is ~16 lines of *pack* code over a `sel` + a one-field `form` + per-row `btn`s, redrawing by calling `docOpen` again. **Say "a dropdown and one town's implementation", never "we have search"** — the index is pack code, not an engine seam |
| **A pantry that persists** | `SK()` is a global; the town writes eleven of its own keys through it. Survives a reload. **Does not survive a device transfer** — see G1 |
| **Seasons and occasions** | `seasonNow()` is a plain global a document's `build()` may call |
| **Characters who react to the dish** | `RM()` / `INTERVIEW` `:220`, and a placed person carrying `doc` opens it on Talk. A11's cheapest row, no engine change |
| **No score by default** | `STK()` `:359` defaults to `{mode:"none"}` and `stakesCfg()` `:362` reads it per chapter. **The calm default is law, not a setting** |
| **A downloadable `.ics` of a meal plan** | **a non-gap.** `icsData()` is welded to the dog's care pack, but a section's `btn.run` is arbitrary pack JS and the engine already builds its own Blob download. **A pack writes fifteen lines of VCALENDAR itself. Do not generalise `icsData`** |
| **An export tab for the cookbook** | also a non-gap: `docCopy`/`docDl` already export any document |

**Two free things with a sharp edge.** (a) The Markdown export handles `h p note blank kv t q docs`
and **not** `btn sel form red`, so *"copy this recipe"* copies the words and **silently drops every
tick box** — design the card so the words are the recipe. (b) **A page on GitHub Pages cannot fetch
another site's HTML.** "Paste a link and we'll import it" is a promise of a proxy.

### The gaps — four, and only one is worth an engine change

**G1 · Pack state does not cross a device boundary — RULE, ~25 lines.** `save()` is a closed struct;
`sanitizeSave()` **rebuilds** a whitelisted object and drops unknown keys; `passURL()` carries the
engine's save and nothing else. **A pantry and a week's plan written under `SK()` are device-local:
he scans his own QR onto the tablet and the kitchen is empty, with no message.** Every pack has state
and every pack has the Trolley Pass, so this is a RULE. The shape: two optional globals with exactly
`HUDFACT`'s form — `save()` adds `pk: PACKSAVE?.()`; `sanitizeSave` adds a **generic structural wash**
(no `__proto__`/`constructor`/`prototype`, depth ≤ 4, ≤ 200 keys, strings clamped, total ≤ 32 KB or
the field drops with a warning); the consumer calls `PACKLOAD(s.pk)` once after boot. **The engine
never learns what a pantry is.** Touches `engine/engine.js` and three `config.js` files, **not
`index.html`**, which keeps it out of the two-shells hazard. Meridian and the town declare no
`PACKSAVE`, so their saves are byte-identical — that is the behaviour-identical proof.
**Red first:** a deliberately hostile `PACKSAVE()` against `content/gauge`, asserting the prototype
was not touched, the string was clamped and the 6-deep nest was cut — *plant the violation before you
believe the guard.* **What breaks in six months:** somebody puts the whole pasted cookbook in there
and the QR stops scanning; the pack rule is *`PACKSAVE` returns the list and the plan, never the
recipe texts*, written next to the seam. **The 32 KB ceiling was picked from the shape of an existing
log ceiling, not measured — measure it before the number ships.**

**G2 · A pasted recipe is unsanitised at the moment it becomes data — CHOICE, with one RULE-shaped
half already kept.** Three sinks, not one. **(1) The DOM is already safe by construction** — every
reader block prints through `textContent`, and **functions do not survive `JSON.parse`, so pasted
data can never reach `art` or a `run`.** (2) **`localStorage` is the pack's job**: model the wash on
`clean(s,max)` in `changarrito/content/record.js`, which strips bidi and zero-width and control
characters and hard-caps length — plus a cap on ingredients, steps and total bytes, and a key-copier
that refuses `__proto__`. **Quota is the silent one: the save's write is a swallowed `try/catch`, so
a 5 MB paste fills the origin and every later save fails without a word.** (3) **The Markdown export
is cosmetic and real**: a pasted ingredient beginning `## ` reappears as a heading in his exported
cookbook. **Why CHOICE:** only the pack knows what a recipe is, and the engine having an opinion
about content is the thing `docs/OWNER.md` forbids.

**Found while looking, and it is not this game's work:** `applyText()` does `Object.assign(NPCN[lang],
o.npcNames)` on JSON the player pasted into the admin text lab, so a pasted `__proto__` reaches the
prototype setter — the same class `sanitizeSave` was written to refuse. Local-only and self-inflicted,
**low tier, its own issue.**

**G3 · An inventory — CHOICE, and the recommendation is: do not build one.** What R3's Fit needs is a
spatial constraint with snap rules, ~1,000 authored objects and 14,000 foley files. **What a pantry
needs is an array in a pack, a document that renders it, and G1.** An engine `inventory` would be the
engine naming a pack's content and would arrive with a UI the reader already has. **Refusing this is
the single biggest saving in the plan.**

**G4 · Re-opening a document scrolls it to the top — RULE, four lines.** `docOpen` sets `scrollTop=0`
unconditionally, and the index pattern redraws by calling `docOpen` again. The town has not been
bitten because its controls sit at the top; **a forty-item pantry with a button halfway down will be,
on the first press.** Remember `scrollTop` per document id. **Red first**, and note this was reasoned
from the code and **not reproduced in a browser**.

**A non-gap said plainly so nobody spends on it:** offline nutrition data is a pack file —
`const FOODS={…}` in `content/sobremesa/foods.js`. The predictable six-month break is somebody adding
it to the **shared** `sw.js` asset list, so Meridian's players precache a nutrition database they
will never see. **A new public pack gets its own worker and its own cache prefix, or none.**

### What Beto would not do

No URL import (CSP + same-origin + no server). No `share_target` in the public manifest (Chrome/
Android only, the shared URL still cannot be fetched, and it edits the one file nobody should touch
casually). No computed score or grade for a dish. **No recipe in `content/meridian/`.** Nothing
pasted ever enters a content pack. No generalising of `icsData` or the exporter tabs.

### The words that travel, and the ones that do not — *Toño*

**Travels, template-grade:** a recipe (it is a document and needs no new word), a plan, a form, a
shopping list, an ungraded conversation, a season key set. **This game's own:** a cuisine, a nutrition
fact, an allergen — **and an allergen must never be an engine field, because a field implies the
engine computes it.** **Does not travel:** `WEAR` (it is three hardcoded dog-cosmetic slots with
literal colour arrays in engine code, not an owned-things seam), the `.ics` exporter, the town's index.

**New tile kinds, judged:** a pantry shelf, fridge, stove, counter and market stall are **all the box
we already have** — `box:true` plus a side drawing, **not a third noun for one geometry**. A herb bed,
a milpa row and a kitchen mat are **a kind, and its name is `flat`** — today the only route to "solid,
zero height" is `kind:"water"`, which drags the petal spill and the bridge's orientation test along;
**this pack is the first that makes that a blocker rather than an annoyance.** A ristra of chiles or a
hanging pot **fails the kind test at "does it stand from its feet" — it is a flag (`hang:`), not a
kind.** A pot mid-steep is **state, not a tile.** And `kind:"food"` is **refused**: `kind` already
means six unrelated things and a seventh is the point where nobody can write a validator.

**Five leaks this game surfaced, for `docs/TAGS.md`** *(Toño's register; his to file, listed here so
the plan is honest about what it is standing on)*: **L24** the `.ics` exporter is one dog's care sheet
and the export schema says "meridian" — and the 39-name portability blocklist contains neither
`frederick` nor `meridian`; **L25** a pack cannot put anything in the save and the pass carries
nothing a pack wrote; **L26** the engine does not only name Meridian's alphabet, **it draws Meridian's
kitchen** — stove, counter, shelf, table, all four, and well enough that nobody notices they were
never chosen; **L27** the index and the search are the town's, not the engine's; **L28** `concept` is
a rule-2 failure that lives in *engine* code, and a nutrition game — nixtamalization, *ichijū-sansai*,
*sa-shi-su-se-so* — would be **the first pack to make the word look correct**, which is how a
curriculum word becomes a template word with nobody deciding it. Plus an amendment: it is **seven**
closed enums, not six.

---

## 6 · The two languages — *Paty*

**Spanish is not a translation layer in this repo and must not become one here.** Meridian's ES
`chill` lines are funnier than the English on purpose.

**The trap that will be got wrong by anybody working from the English brief:** **`comida` is not
dinner.** In Mexico *la comida* is the big **midday** meal and *la cena* is light and late. Every
English sentence in four sweeps says "cooking dinner at home", and mapping that onto `cena` silently
moves a Mexican family's main meal to nine at night. **Do not translate the noun — re-author the
verb: *hacer de comer en casa*.**

**The UI words, with the reason** (keys in this repo's style; ¶ marks a row that is not a straight
translation):

| key | EN | ES | ¶ |
|---|---|---|---|
| `panTitle` | The pantry | **La alacena** | ¶ *la alacena* is the cupboard (the place); *la despensa* is what is in it — and in Mexico also the week's groceries. **Never `inventario`** |
| `panStock` | What's in it | **La despensa** | the contents |
| `panIn` / `panOut` | What came in / What ran out | **Lo que llegó / Lo que se acabó** | logging by exception, one line |
| `panLow` | Getting low | **Ya se está acabando** | ¶ not `caducado`/`vencido` — an expiry list is a guilt list |
| `plnTitle` | This week's menu | **El menú de la semana** | ¶ not `plan de comidas`, which reads like a clinic |
| `plnAsk` | What are we eating Tuesday? | **¿Qué hay de comer el martes?** | the sentence a Mexican kitchen actually says |
| `plnIf` | If it's Sunday, I soak the beans. | **Si es domingo, remojo los frijoles.** | ¶ the literal *pongo los frijoles a remojar* is 37% longer than EN |
| `plate` | The plate | **El plato** — and the object is **El Plato del Bien Comer** | the health graphic is already Spanish |
| `porc` | One serving | **Una ración** | ¶ **never `un servicio`.** `porción` is guideline Spanish — card only, never a character's mouth |
| `nutLabel` | Nutrition facts | **Información nutrimental** | ¶ `[TRAINING]` — Mexican labelling Spanish uses *nutrimental*; **NOM-051 not fetched, confirm before shipping** |
| `srcTitle` | Where this comes from | **De dónde sale esto** | ES is *shorter* here — rare, take it |
| `nutNo` | No calorie counting here. | **Aquí no se cuentan calorías.** | ¶ the refusal said out loud, once, in both languages |
| `madeIt` | I made it | **Ya la hice** | ¶ *Ya* means "done, and I'm telling you" |
| `whoTaught` | Who taught you this one? | **¿Quién te enseñó ésta?** | R12 gathered as content, not imposed as policy |
| `list` | Shopping list | **La lista del mandado** (button: **El mandado**) | ¶ the errand and the groceries in one word |
| `left` | Leftovers | **El recalentado** | ¶ **EN has no word for the day-after meal that is better than the first one.** The food-waste feature's warmest noun |
| `itacate` | Take some home | **Tu itacate** | ¶ keep the word, gloss once in EN |
| `soak` | Soaking | **En remojo** | unrushable duration in the phrase a kitchen uses |
| `lapse` | The rice is still there. | **El arroz ahí sigue.** | ¶ *ahí sigue* is the register; the other is a translation of the idea |
| `count` | 42 dinners cooked | **Van 42 comidas** | ¶ ***Van X* is grammatically incapable of counting down. The language enforces R15 for free** |

**The rule for the other three cuisines, in one sentence:** *Mexican Spanish takes Japanese and Korean
food words straight, in roman letters, masculine by default, pluralised by the article and not by an
-s — glossed once in parentheses, then never again.* So *el miso, el dashi, el onigiri, el donburi;
el kimchi, el gochujang, **los banchan** (never banchanes), el bibimbap*. Keep Italian course names
and gloss once: *primo (el primer plato), contorno (la guarnición), cucina povera (cocina de lo que
hay)*. **`soya`, never `soja`** — *soja* is Spain and the Southern Cone, and that one word tells a
Mexican reader whether the game was written for her or localised at her. And note that a Mexican
kitchen hears **sopa** for the pasta course, so a bare button labelled "Pasta" does not survive.

**Four more traps, in the order they bite.** (1) **Length is a timing bug before it is a width bug** —
`toast` never derives duration from length and the ambient chat line is a flat 2,800 ms, which at ~100
characters is roughly 430 wpm. **Write the Spanish first for anything that goes through a toast: ES
runs 20–40% longer here, and if ES fits, EN will.** (2) The one hard width cap found is the Settings
drawer's `select{max-width:12em}` — **if cuisine or season becomes a drawer dropdown, ES clips there
and nowhere else.** (3) **Never build a food count by concatenation** — the existing ES already
hand-agrees gender and number, and a food noun's gender varies; write the whole sentence per branch,
or count a fixed noun. (4) **Literal accents only** — one shipped ES line carries `tranvía`, so
a translator auditing Spanish by searching Spanish silently misses it.

**Register:** the chrome speaks **tú**, never *usted*, never *vosotros*, and never the impersonal
guideline voice (*se recomienda consumir…*). Characters may use *usted* where a person would. **A
kitchen is the most tú/usted-sensitive room in Spanish: decide it per character, never globally.**

**What must be written by a native speaker and not translated.** Every line spoken by a Japanese or
Korean cook — **this is the row Paty refuses**, and no agent here can invent a halmeoni. The Italian
widower's Italian, same shape, smaller stakes. **Anything quoting the Guías Alimentarias 2023, the
Plato del Bien Comer or NOM-043: these were written in Spanish first — quote the official Spanish and
translate *into* English.** And the jokes, in both directions.

**Live drift found in the shipped repo while doing this** — `locs.hq` and `arrive.hq` were English
inside the town's ES block — **found 2026-09-12, fixed the same sitting (`"El changarro"`), re-verified
2026-09-14 by Paty at `changarrito/content/strings.js` (grep `hq:"El changarro`).**

---

## 7 · The sittings — *Mari*

**Maps before people, people before quests, quests before art — and before all of it, the household,
because four kitchens is a map.**

| # | Sitting | Who | Blocked by | Proves |
|---|---|---|---|---|
| 0 | `/game-brief`; the story and city files opened empty; the asks logged verbatim | Mari (the owner answers) | §9 | we know what he wants, in his words |
| 1 | **Blocker A** — careers become a pack seam | Beto | — | a kitchen stops asking you to be an Architect |
| 2 | **Blocker B** — the `ENDLESS`/`CHAPTERS` gate | Beto | — | a calm world may have a second neighbourhood |
| 3 | The shell, **generated not copied**; own `STOREPFX`, manifest, `sw.js` + cache prefix, own name blocklist | Beto | 1, 2 | two games on one origin do not eat each other's saves |
| 4 | Minimal pack boots: one room, three people, one quest, EN only + `expected.txt` | Mari + Beto | 3 | the engine boots a world that is not Meridian |
| 5 | **One household, one kitchen, one street** — all ten `PLACES` roles, maps, the shop | Don Güero (parcel) → Cuca (the room) | 4 | the place exists before anyone stands in it |
| 6 | The cast: the cook, the two who eat, one who disagrees about the recipe | Nacho | 5 | people who fit in the map |
| 7 | **The three documents** — the recipe card (blanks), the week sheet (forward only), the pantry sheet (a list and a freezer, no expiry red) | Mari + Cuca, copy read by Pili | 6 | the whole loop, **with zero engine change** |
| 8 | **The paste seam** — a `form` `area` field, plain lines first, JSON-LD second, source URL kept as attribution | Beto (content-side) | 7 | "copy and paste some recipes", legally |
| 9 | **The reply table** — dish → what she says next week | Nacho | 6, 7 | the pressure is actually replaced, not just answered |
| 10 | ES in lockstep | Paty | 7, 9 | EN and ES cannot drift |
| 11 | `HUDFACT`, cameras, themes, the cold read and the four-yaw shots | Pili + Chema | 5–9 | four cameras, actually looked at |
| 12 | **He cooks one of the dishes and then plays it** | the owner | everything | the only gate that counts |

**Sittings to a first playable pack: 12–14 — `[TRAINING]`, Mari's estimate from the shape of the
work, not a measurement.** The only calibration anybody has is that `content/gauge/` took one sitting
and found seven blockers. **Three of them (1, 2, 3) are engine and shell work that buys every future
world and should not be billed to this game.** For "just the game": **nine sittings, one household,
one cuisine, EN + ES.**

### The blockers, re-grepped and named

- **A · A pack cannot choose its careers.** `[CODE]` all three shells hardcode
  `data-c="architect|diplomat|operator"` (`index.html:386`, `changarrito/index.html:385`,
  `content/gauge/index.html:386`), the engine hardcodes their shirt colours (`SHIRTS`
  `engine/engine.js:431`), and `applyLang` bare-dereferences the class table. **On day one La
  Sobremesa asks you at the front door whether you are The Architect, The Diplomat or The Operator.**
  `docs/TAGS.md` L17; already on `docs/OPEN.md` §2 as #154.
- **B · An endless world may not have a second kitchen.** `[CODE]` `test/engine.smoke.js:794-795`
  fails any pack declaring `ENDLESS` **and** `CHAPTERS` — and `CHAPTERS` is both the endings **and**
  the districts. This game is almost certainly endless and wants more than one household. **Until
  that assertion is corrected, a second cuisine cannot ship.** `docs/TAGS.md` L12; `docs/OPEN.md` §2.
- **C · Honest and unsolved.** `docs/GAUGE.md` measured that **a new pack's first green run is not
  available at any size below Meridian's** — six checks fail a small pack *for being small*. Budget
  either the fix ("fail only when a pack HAS the thing and gets it wrong") or a
  `content/sobremesa/expected.txt` like the gauge's.

### What may be blank on day one, and what may not

**Blank, free:** seasons · chapters · growth · critters · eggs · decor · the trolley · the career and
deliverables layer (drop those files **and their `<script>` tags**, or you get a silent 404) · 3D ·
**the pantry itself** · **all nutrition numbers** · the second cuisine · any mystery.

**Cannot be blank:** a walkable `spawn` · the ~82 `UI` keys (copy Meridian's file whole — it is not
one line) · `GAMENAME` + `GAMEV` · `STOREPFX` · `HUDFACT` (**or a kitchen prints *Rookie → AI
LEGEND***) · all ten `PLACES` roles if you declare any · **and who the household is.**

**Never, in any iteration:** an allergen verdict · a disease claim · a weight field · a promise that
playing changes what anybody eats.

---

## 8 · Where it fits, and where a future iteration goes — *Mari*

**Where it fits: a weekly companion first, a gifted game second.** **"Daily companion" is the wrong
shape and this plan refuses it on the evidence** — a daily obligation is the exact thing that cancels
the calm. The cadence is **the week and the season**, because that is where the habit evidence sits,
and `[CODE]` **nothing in this engine spends a day — that is a property to preserve, not an omission
to fix.** As a gift it is AJ's; as a companion it is the owner's. **One pack, one household** — two
save prefixes is not the answer.

**Where a future iteration goes, ranked.**

1. **The second household** (and only then the third). The slot templates are the same mechanic in
   all four cuisines, which is why the second is cheap **once blocker B is paid**.
2. **A citation card per cuisine** as a readable document — the owner's *"places to check"* answered
   by each country's own government in its own language, not by a number we computed.
3. **An embedded USDA FoodData Central subset** (CC0, a few hundred ingredients), shipped at build
   time, source printed on the card. **Not Open Food Facts** (share-alike infects the merged table),
   **not Mexico's national table** (no licence found), **not Korea's printed book** (non-commercial).
4. **`share_target`** — one fewer tap on Android. The shared URL still cannot be fetched.
5. **The inventory RULE** — *only* if his answers point at Fit. The pantry as *recipe minus pantry =
   list* is a set difference over two small arrays and needs a document, not an inventory system.
   **Second thing to build, never the first.**
6. **Generate every shell**, including the town's.
7. **#153, quests get names instead of array positions** — the largest single blocker to a template,
   and this pack will feel it.

---

## 9 · The decisions the owner owes

*Answered 2026-09-14 (late), all fifteen — see §12. The table stays as the record of what was asked.*

*Consolidated by Chuy from all seven returns. **Nothing below has been answered.** The order is the
order in which an unanswered one blocks work. Where an agent recommended something, the
recommendation is marked ✅ — it is a recommendation, not a decision.*

**0 · The confirmation, not a question.** The game will **never count calories, never ask a weight,
and never keep a streak that resets.** Every sweep said so with sources. **If he wanted any of the
three, he should say now, because everything above is built on their absence.**

| # | The decision | Why it blocks | Who asked |
|---|---|---|---|
| 1 | **¿De quién? Whose game is this?** The 2026-09-11 ask is AJ's chill cooking game; the 2026-09-13 ask is *"my eating habits"*. ✅ recommended: **both — build it as AJ's game, public, cast intact, and the parts he wants (the notebook, the list, the source cards) are the parts a second person can use** | Everything is downstream of who holds the notebook: the cast, the tone, and **whether it ships on public Pages at all.** It holds what one person eats, and that deserves his word, not an assumption | Nacho, Tavo, Mari |
| 2 | **What is the nicest part of cooking for you — the chopping, the smell, the waiting, or the face they make?** | This is A11's open question, and **four different games sit behind that sentence and look identical in a one-line pitch.** Mocks can be drawn against the cheapest row; a build cannot | Mari, Nacho, Beto (A11 says *nobody should pick for him*) |
| 3 | **A meal plan is a record of the future, and `docs/ARCH-LOG.md` A3 bans one** (*"a list of what you have not done yet"*; `docs/OWNER.md`: never build a quest log). It is also **the single most-evidenced mechanic in all four sweeps.** ✅ recommended: allow it, because the ban was written about *the game's* demands on him and this is *his own* intention about his own week — with the guard that the plan carries **no count, no colour and no age** | If the ban holds regardless of who wrote the list, the plan half collapses and what is left is the check-in and the library — smaller, still viable — **and nobody should mock a calendar before knowing** | Tavo |
| 4 | **Which kitchen is first — Mexican, Italian, or Japanese/Korean?** ✅ Mari: Mexican, because the repo already draws the comal and speaks the Spanish. ⚠️ Tavo's counter: it is about *his* eating, so the right first kitchen may be **the one he cooks worst**, not the one we write best | One kitchen fully written beats four sketched, and it decides sitting 5 | Mari, Tavo, Don Güero's parcel |
| 5 | **Does this world end?** A season with a last day and a goodbye, or a place with no ending | It decides `ENDLESS`, and `ENDLESS` collides with a second household (blocker B) | Mari |
| 6 | **Is Meridian's "every business is Hispanic-owned" rule Meridian-scoped?** `docs/OWNER.md:109` lists it as Settled **in the same sentence as "and doubles as a practice pack for an AI role"** — a Meridian purpose. This cast has an Italian widower, a Korean tenant and a Japanese father, and trains no AI role | Read as global, it forbids this cast. **One word from him — "that rule is Meridian's" — and it gets a scope note; without it somebody re-litigates this cast in a month.** Nobody will edit his file for him | Nacho |
| 7 | **May a self-help pack grade the kitchen and never the eater?** `[CODE]` `gradeOf` returns 3 when nothing was ever answered, so **a pack with no wrong answers ships with only its warmest ending reachable, silently.** ✅ recommended: the marks go on logistics — waste, plans, where things live. The alternative (endings keyed off *participation*) is a small engine seam Beto should price | Three endings the bible promises, and nothing to pick between them | Nacho |
| 8 | **Whose `comida` is this kitchen?** If the household is Mexican, the main meal is **midday** and the whole English evidence base points at the wrong hour. Do the week's slots read **comida** or **cena**? | It changes every day-label string and the shape of the planner | Paty |
| 9 | **Does the kitchen travel on the Trolley Pass?** | G1 is the **only** engine change recommended, and it is only worth it if the answer is yes. If the pantry is one device's, the engine does not move at all | Beto |
| 10 | **The plate: vessels on a tray, or the official divided circle?** ✅ vessels for play, the official diagram redrawn once per kitchen on a credited citation card | **Every screen in the game inherits it**, and it is cheap now and expensive in a month | Pili |
| 11 | **Does a season change what is *available*, or only the colour?** `docs/OWNER.md` settles *"a season changes colour, never design"*, with Día de Muertos the one exception that may also dress the world. **Three of four sweeps want seasonality to change content** — what is on the shelf in March, when kimjang happens. That is neither colour nor dressing | Either `SEASONS` stays a palette and a food pack invents a separate "what's available now" tag, or **the settled rule gets an amendment.** Nobody here will pick | Toño |
| 12 | **Cream paper or the night reader?** Cream reads as a household recipe box; night reads as an app. ✅ cream. One word either way | one declaration, but it sets the whole feel of every document | Pili |
| 13 | **Is the pantry a place she stands in front of, or a list she opens?** ✅ the room, because a list is the app everybody abandons by week three and a shelf is not | It decides whether the pantry costs a room of tiles or one document | Pili |
| 14 | **AJ's half has no native voice and nobody here can supply one.** (a) defer until she names a real person she learned from, (b) ✅ write the Japanese/Korean cook as a **Mexican character who learned it** — true of a great many Mexican kitchens and R12-clean, or (c) drop for iteration one | Paty will not invent a halmeoni and neither should anybody else | Paty, Nacho |
| 15 | **The name — La Sobremesa, Sobremesa, or something else?** | Two agents wrote the same world under two spellings; nobody checked whether it collides with anything, reads oddly to an Italian or Japanese speaker, or survives at five pixels on a sign | Mari, Nacho, Chuy |

**Smaller ones, still his:** English and Spanish like Meridian, or EN only? **Should the Spanish be
written *first* for this pack** — `docs/OWNER.md` says "in lockstep", not "EN first"? Is there a dog?
Name one dish and who taught it to you — that person is the first character. When Thursday does not
happen, what should the game do: nothing, somebody says something kind, or quietly offer it again?
What does a wrong turn in the kitchen cost — ✅ "they say something"? And what is the Saturday payoff
— ✅ "the table"?

---

## 10 · The surfaces the mocks must show — *Pili*

**Draw them at the two sizes that are real. Anything drawn at an in-between "design size" lies.**

| # | Mock | Drawn at | What it proves | Priority |
|---|---|---|---|---|
| 1 | **Cold-read strip: eight new glyphs, alone, unlabelled** — pantry shelf, market stall front, recipe tin, slate, crock, comal-stove, produce crate, market floor | the tilesheet tool's own output size | Somebody with no context names them. **If this fails, nothing else matters** | **must** |
| 2 | One kitchen in 3D, **all four yaw stops** | the shots tool, one spot | the pantry is a box and still reads from behind; the crates are not cardboard | confirm |
| 3 | **Recipe card in the reader at 360 px phone width** — title, `note` with source, an `art` panel of the plate-as-vessels, `kv` ingredients, steps as `p` | 352 px canvas | where the picture sits against the words; whether the plate reads at 352 | **must** |
| 4 | The same card at 560 | 552 px canvas | the picture does not become the whole page | confirm |
| 5 | **The week as a `wide` strip**, ~840 px natural in a 352 px column | both | the scroller; 120 px/day legible, 50 px/day not | confirm |
| 6 | **The nutrition fact, three ways side by side:** (a) `note` + source `kv` ✅, (b) a table row with a number, (c) a coloured badge | 352 px | **This mock exists to be rejected in public.** Seeing (c) beside (a) is the fastest way to show why a computed score becomes a verdict on somebody's grandmother | **must** |
| 7 | **Four kitchens, same room, same furniture, palette swapped only** | four 3D shots | "a season changes colour, never design" holds for cuisines; the four **grounds** separate before the accents do | confirm |

**If the budget is three pictures, draw 1, 3 and 6.** They decide the game's whole look; the other
four confirm it. *(Screenshots are genuinely expensive — `docs/OWNER.md` says so in his own terms.)*

### Drawn, 2026-09-14 — the session, same day

Six of the seven, plus the cream/night pair, are in `docs/mocks/2026-09-14-la-sobremesa/` and on one
review page for the owner (`https://claude.ai/code/artifact/01d868ff-32b6-4715-8831-ef42c6cf0f6c`,
private to him). **Mocks 3, 4, 5 and 6 are the shipped reader rendering real documents** — `mockdocs.js`
beside the pictures is the documents (`docOpen` takes the object; nothing registered, no engine change),
`render.js` took the pictures at 360 and 640 CSS px in Meridian's cream paper and the town's night
paper. The plate is drawn as **vessels on a petate** (a comal with the tortilla stack, the olla, a salsa
dish, a green, a lime), the week as an 840-px `wide` strip with three bays filled and four **unmarked**,
the fact three ways (the `note`+`kv` to keep, a table whose second row is a ledger about you, and
coloured badges drawn as `art` because the engine has no badge). **Mocks 1 and 7 are canvas on the review
page**: eight glyphs at 32 px, unlabelled until a button reveals them, and one 10×7 room drawn four
times with only the palette swapped. **Mock 2 (a kitchen in 3D, four yaws) is not drawn** — it needs a
room laid in a pack, sitting 5, after §9 · 4. Nobody has cold-read plate 1 yet; that is Pili's step 4 on
the next run, and the owner's own try on the page.

---

## 11 · What this plan has not checked

*Every agent's own list, merged. An unchecked thing named is worth more than a confident summary that
skipped it.*

- **Nobody verified a single `[WEB]` number.** All four sweeps said their fetches were proxy-blocked
  and reached them as search extracts. **Nothing sourced here may be published outside this repo.**
- **Nobody ran a suite, booted a pack, or took a screenshot.** Every `[CODE]` claim is a grep plus a
  read, made on 2026-09-13 or 2026-09-14. **Three registers were found stale while doing it** —
  `STK` by 29 lines, `SHIRTS` by 90, `petalMomentTick` by 334 — and `docs/BEAUTIFY.md`'s `t3Boxy`
  citation is stale by 18 lines **and drops a clause**. The identifiers are the durable part.
- **G4's scroll bug was reasoned from the code and not reproduced.** So was L25's "a pack key is
  dropped on load".
- **The sittings number is `[TRAINING]`** and is not calibrated against any historical measurement.
- **Nobody asked AJ anything.** Per `docs/OWNER.md` she is a designer, not a stakeholder — **ask her
  directly and take the answer.** If this is her game, every name in §3 is a proposal she may
  overwrite.
- **Nobody checked the open GitHub issues** for an existing owner ask on food.
- **Nobody checked whether the `kind:"water"` petal spill fires for a pack with no marigold season.**
  A market floor that snows petals is live and unlooked-at.
- **NOM-051 and NOM-043 were not fetched**; *nutrimental*, *soya*, *mandado*, *recalentado*,
  *itacate* and *alacena* are one native speaker's ear, tagged `[TRAINING]`.
- **Nobody decided whether this pack ships on public Pages or stays on the laptop.** The plan assumes
  public because it needs no token and every save is on the device — **flagged, not assumed quietly**
  (§9, decision 1).
- **Nothing was cooked.** Four households, a dozen named dishes, and not one made by anybody here.
  **Nobody signs off a dish this project has not cooked.**

---

*Filed 2026-09-14 by Chuy. The sourced evidence is `docs/research/2026-09-13-healthy-eating-game.md`;
the transferable rules are `docs/GENRE-RULES.md` R10 (extended), R15, R16, R17. The owner's own words
are at `docs/ASKS.md:43` and the 2026-09-11 row above it.*

---

## 12 · The owner's second pass — 2026-09-14, late — and the questions it leaves

*His words are verbatim in `docs/ASKS.md` (the thirty-two rows of 2026-09-14, late). This section is
the session reading them into the plan. Nothing here is built; he said "again, don't build, just
plan" and "mostly document or ask follow-up questions". Where his answer overrules a crew
recommendation above, the overruling is written down as one, not averaged.*

### 12.1 · The fifteen, answered

| # | His answer | What it settles | What it changes above |
|---|---|---|---|
| 1 | *"mostly for AJ but I want to have access to the household level to share"* | AJ's game, public; **a household level he and AJ both hold** | §3's fifth door stops being "yours, empty" — it is *the household*, shared. See 12.3a |
| 2 | *"the flavor lol — but ask AJ too"* | His nicest part of cooking is **the flavour**; AJ's is still owed | A11's row for him is *tasting*; the AJ script asks her (`docs/for-aj/LA-SOBREMESA.md`) |
| 3 | *"a meal plan would be ok"* | The plan is allowed | `docs/ARCH-LOG.md` A3 gets a scope note — *the game's demands on him* are banned, *his own intentions about his own week* are not; **but see #8 and 12.3b: the week strip is gone, the plan is a board of shifts** |
| 4 | *"no ending"* | `ENDLESS` | Blocker B (an endless world may not have a second kitchen) is now on the critical path, sitting 2 |
| 5 | *"mix, lean Mexican to start… while using initial recipes we must research and put together new ones 1 for 1, with a note to quickly mix in"* | First kitchen Mexican; **every initial recipe is paired one-for-one with a researched recipe from another cuisine**, each carrying a "mix in" note | §2's "three dishes a week" become pairs; the research file gains a recipe ledger with two columns |
| 6 | *"it can be, but customizable for future templates — Mexicans can cook any cuisine… fusions… simple, available, popular dishes"* | The Hispanic-owned rule is **Meridian's**, and a template scopes its own; fusion is welcome; **simple, available, popular** is the dish rule | A scope line for `docs/OWNER.md` is proposed in 12.4 (his file; nobody edits it for him). The cast in §3 stands |
| 7 | *"we can grade — any ideas for good intentions, with a toggle to turn off in settings"* | Grading is allowed, **with a toggle** | Three shapes in 12.3h; he picks; the toggle is a small engine seam |
| 8 | *"these could just be different kitchens in restaurants"* | He read the question as *which kitchen*, and answered: **restaurants' kitchens** | This overrules §2's "home kitchens, not shops" and joins #12.3b: the shifts are at restaurants, the pantry is at home. The comida/cena question is answered by his other line: **US meals** (breakfast, lunch, dinner) and "a good schedule and habits" |
| 9 | *"sure, to send to each other"* | The kitchen travels on the Trolley Pass, **and two people share one** | G1 (pack state on the pass) is confirmed worth building — and "share" is bigger than "carry": see 12.3a's open question |
| 10 | *"not following — probably vessels"* | Vessels | In one line: a plate drawn as bowls and a stack, never as a pie chart of proportions. Plates 3–4 on the review page are this. Settled |
| 11 | *"seasons would be fun — research San Diego trends"* | Seasons change **what is available**, not only colour | `docs/OWNER.md`'s "a season changes colour, never design" needs the same scope note as #6 (a pack may declare availability by season). A research task: San Diego produce by month — proxy-limited, `[WEB]` extracts only |
| 12 | *"night looks better, but can we please print recipes"* | **Night paper**, and **print** | 12.3d: a print stylesheet on the reader is an engine RULE any pack gets |
| 13 | *"could be fun if they were huge forms to search and grab"* | The pantry is a room **and** a big searchable form | 12.3a: each drawer opens a document with a search field and rows you grab |
| 14 | *"wait for AJ"* | AJ's half waits | The script is ready: `docs/for-aj/LA-SOBREMESA.md` |
| 15 | *"more comforting names, English is fine"* | Names owed | 12.3i, twelve of them; he and AJ pick |

**And the three lettered ones.** (a) *"no diplomat etc — can we reuse for cooking and healthy habits?"* — **yes**, once careers are a pack seam (blocker A, sitting 1): the three doors become Nacho's three reasons people cook, *el que planea · la que improvisa · el que alimenta*, a greeting and not a mode. (b) *"def an endless world kitchen style"* — `ENDLESS`, as #4. (c) *"was there a question for me there?"* — **no.** C was a cost note: the shared suite fails a small pack for being small (`docs/GAUGE.md`); we carry that as a sitting, not as a question.

### 12.2 · AJ's reference game, read from the recording

The owner sent a 1:54 screen recording of the game AJ enjoys (frames read by the session, 2026-09-14;
the game is not named here). What it is, as seen:

- **A merge board.** A grid of small items; drag two of the same onto each other and they become the
  next thing in a chain. Chains are food and kitchen: *dough → pizza → slice → whole pie*; *coal →
  brick → oven*; *planks → table → counter*; and currency chains (*coin, energy, diamond*). **A
  Collection** screen is the encyclopedia of every chain with the unmade tiers greyed out — this is
  the part he means by *"builds on previous similar ingredients"*.
- **Restaurants** as chapters — a Korean restaurant, a Japanese one, a beach one — each with a
  dish-set counter (*"Korean Street Food Set 5/6 — complete 3 recipes to finish the dish"*).
- **A recipe book** you open from the counter: **illustrated recipe cards** — a photo of two
  characters with the dish, sticker notes in the margin, a step-by-step page (*"cut the pineapple in
  half, scoop out the flesh…"*), a page per dish, tabs along the bottom. This is the surface AJ is
  looking at when she *"looks up the recipe of something that looks good"*.
- **Characters who talk** in a chat strip (a bear, a boy, the cook) while a dish is made.
- **What we will not carry**, in his words: *"this is different because it is not to make more
  money"* — three currencies, energy that refills on a timer, day-long countdowns on the sidebar.

What that means for us, seam by seam: the **recipe book is the reader** (plates 3–4 already are it);
the **Collection is a document per chain** (`kv` rows with the unmade tiers blank — the reader's
`blank` block exists for exactly this); the **restaurants are the shifts** (12.3b); the **characters
are the cast** in §3. **The merge board is the one thing this engine does not have** — a grid of
draggable items with a chain table is a new surface, not a document; it is a CHOICE and it is the
biggest single build in this whole plan. It is also the part AJ plays. **Do not decide it without
her** (the script asks). The second game he named, **Cookingdom**, arrived as a 28-second recording (read frame by frame,
2026-09-14). What it is, as seen: **one dish made by hand, one gesture per step.** A capybara cook
in the corner with three stars; a three-segment progress bar; three trays across the top (sauce,
cheese, pepperoni); a wooden board with a lump of dough. You **drag the rolling pin** across the
dough until it is a round; you **spread the sauce with a finger**, and the red follows your stroke;
you **sprinkle the cheese** the same way; you **place each slice of pepperoni** one at a time. A
small heart pops when a step lands; a tray empties when its ingredient is used; a *+30s* bubble
appears at the end (a bonus of some kind — whether the game runs a clock underneath is not visible in
28 seconds, and is a question). **No money, no words, no menu on screen while you cook.** This is
`docs/GENRE-RULES.md` R3 — *tactility* — in its purest shipped form, and it is the row Tavo said to
*"spend last"* in §2 because it is authored content per dish.

**So AJ likes two kinds of play and they are two different surfaces:** the **merge board** (chains,
a Collection) and the **making surface** (a canvas you roll, spread, sprinkle and place on). This
engine has neither: the reader's `art` block is a canvas that draws and does not listen. Both are
CHOICEs, both are the largest builds in the plan, and **the making surface is the more natural fit
for the shifts** (12.3b): a shift's recipe is a list of steps, and each step becomes one gesture on
the board — roll, spread, sprinkle, place, stir, pour — with **no clock**, the heart when it lands,
and the pantry's ingredients in the trays. Cost, honestly: a gesture canvas with touch and mouse,
a per-step "done" rule (how much of the round is covered), and art per ingredient — one sitting for
the surface, then content per dish. **Ask AJ which of the two she would miss more** (her script's
question 2 now names both); build that one first.

### 12.3 · The new requests, each with a sketch and its open questions

**a · The home level, and the pantry as a rebuildable object.** *"I want to rebuild a pantry…
generally speaking like three drawers, etc, and have those available to recreate said pantry… a home
level… it uses our ingredients in the game or points out which we have and missing in the
instructions."* So: a **household world** (the fifth door, shared by him and AJ) whose one room holds
**the pantry — three drawers, a shelf, a fridge — built to match his** (he will send photos). Each
drawer is a place you stand in front of (Pili's #13 ✅) **and** opens a document that is a big form:
a search field, rows you grab (his #13). The pantry's list is the source for three things: **(i) on a
recipe card, every ingredient line is marked *have* or *missing*** — a set difference over two small
arrays, drawn as the presence or absence of a line, never a tick or a cross (Pili, §4); **(ii) "use
our food"** — the recipes on offer are ranked by how many of their lines are in the house; **(iii)
the shopping list is the missing lines**, one Copy button. **This overrules Tavo's "cut the pantry
ledger" (§2) at the owner's word.** R17 (a maintained model decays) is not repealed — it is what the
design has to survive: the pantry is **rebuilt from a photo** when it drifts (the drawers are
authored from his pictures, so re-authoring is the same act), items are logged **by exception**
(*"lo que llegó / lo que se acabó"*), and there is **no expiry red, ever**. Open: *(q1)* "share" — two
people, two phones, one pantry. The pass carries a snapshot one way; it does not sync. Is a snapshot
he sends her (and she sends back) enough, or does this want a real shared store (which this engine
does not have and `docs/OWNER.md` has kept out)? *(q2)* the photos: three drawers, the shelf, the
fridge, the freezer — send what exists.

**b · Shifts, not a week.** *"I don't really like this Monday to Saturday plan but it could be like
picking up shifts as a cooking contractor, but there is no time limit."* So the week strip (plate 5)
is retired. In its place: **a shifts board** — each restaurant kitchen (his #8) posts shifts, a shift
is *one dish at one kitchen*, you pick it up, and it waits for you with **no time limit**. Picking a
shift *is* the plan (the implementation intention survives: *"Thursday, after work"* is written on
the shift when you take it, and it is still his own intention, so A3 holds as scoped in #3). The
board shows shifts taken and shifts open; **it never shows a shift missed** — a shift you did not
cook is still open, which is R10's and R15's rule in a new shape. Cooking a shift uses the pantry
(12.3a) and the pairs of #5. Open: *(q3)* does a shift pay anything at all — hearts from the cook,
a stamp on the board, or nothing but the dish?

**c · Product images.** *"Can we use a scraper for images of products?"* Three answers. **Licensed
sources: yes.** Open Food Facts publishes product photos under CC BY-SA and its data under ODbL
(`[TRAINING]` — the proxy blocked the licence page; confirm before shipping), so a build-time script
may pull the images for the products in his pantry, with attribution; USDA FoodData Central has
numbers, no pictures. **Scraping retailers: no** — their terms forbid it and the photographs are
theirs. **Our own: always** — the pack's convention is drawn tiles, and his own photos of his own
pantry are his to use. Whatever the source, **every image ships inside the pack** and the game never
fetches one at play time (R10; the CSP refuses it anyway). Cost: an attribution page if the pack is
public; a build step, not a runtime one.

**d · Print recipes.** A `@media print` sheet on the reader that prints the paper alone, in cream
whatever the theme, plus a **Print** button beside Copy and Download. Engine RULE, one sitting, every
pack gets it; red first (a print stylesheet exists and hides the world).

**e · AJ's allergies.** *"AJ has allergies, so if they are raw veggies we want to account for that."*
A **household avoid list** in the pack (*who · what · raw or cooked*); an ingredient line carries
`raw:true` where it is raw, and a card whose lines match the list prints one plain sentence — *"AJ:
cook the tomato first"* or *"not this one for AJ"*. **Never a medical claim, never a verdict on a
dish**; the list is hers to write. *(q4, for AJ)* the exact list, and whether cooked is fine.

**f · Contrast.** *"The kitchen colors are not enough of a contrast to be clear."* Plate 7's four
grounds were chosen for restraint and read too close. Pili's own rule applies: the four grounds must
be four **values**, luma ≥ 40 apart, and the accent against its ground ≥ 90 (her band rule from
A14). Redraw plate 7 with the values measured, not felt. No engine.

**g · Animations.** *"Then we will need some animations."* What moves, in order of what it buys:
steam off a pot, a stir, a drawer opening, the merge pop if the board is built. R11 holds — **nothing
runs a clock**; every one is an idle loop. Toño's register says a pot mid-steep is *state, not a
tile*; a prop animation is a gap (`docs/TAGS.md` Gaps) that this pack would be the first to need.

**h · Grading with good intentions, and a toggle.** Three shapes, he picks: **(1) hearts from the
cooks** — Meridian's own idiom, a person's opinion of your dish, never a number; **(2) the kitchen's
marks** — waste avoided, a shift cooked as planned, the pantry found true (R16: the logistics, never
the eater); **(3) a good-intentions count** — *Van 42 comidas*, up only. All three can be one
document. The toggle: a settings row *Show grades*, on by default, off with one tap — the engine's
Settings drawer has no pack-declared row today, so this is a small seam of `HUDFACT`'s shape.

**i · Names**, English, for AJ's cooking-and-pantry game — twelve, with the feeling each one carries:
*Second Helping* (the meal after the meal) · *The Long Table* (everyone still sitting) · *Low Heat*
(nothing hurries) · *Warm Plate* (kept for you) · *Slow Sunday* · *Little Pantry* · *The Good Pot*
(the one you always reach for) · *Soft Boil* · *Kitchen Lights* (someone is still up cooking) ·
*Leftovers* (better the next day — *el recalentado*) · *Simmer* · *Home Plate*. And *Sobremesa*
stays on the list. He and AJ pick; nobody here does.

### 12.4 · Follow-up questions, in the order they block

*Answered the same night — §12.6. Kept as the record of what was asked.*

1. **(q1) One pantry, two phones:** is a snapshot sent on the pass (both directions, by hand) enough,
   or do you want it to sync by itself? The second is a new kind of thing for this engine.
2. **(q2) Send the pantry photos** — each drawer open, the shelf, the fridge, the freezer.
3. **(q3) What does a shift pay:** hearts from the cook, a stamp on the board, or only the dish?
4. **(q5) Grading:** hearts, the kitchen's marks, a good-intentions count — one, or all three behind
   the toggle?
5. **(q6) Two scope lines for `docs/OWNER.md`, yours to add or refuse:** *"every business is
   Hispanic-owned" is Meridian's rule; a template scopes its own* — and — *a season changes colour,
   never design; a pack may also declare what a season makes available.*
6. **(q7) The merge board:** it is AJ's favourite part and the biggest build. Before or after the
   pantry and the recipe book?
7. **(q8) Cookingdom:** does it run a clock underneath (the *+30s* at the end suggests one)? If AJ likes it *because* nothing hurries, that decides the making surface's rule; if she likes the timer, that is a conversation with R11.
8. **For AJ**, in her own script: `docs/for-aj/LA-SOBREMESA.md`.

### 12.5 · What this pass overrules, said plainly

The crew recommended home kitchens; **the owner wants restaurants' kitchens for the shifts and one
home level for the pantry.** The crew recommended no pantry ledger; **the owner wants a pantry, with
have/missing on every recipe.** The crew recommended no grading; **the owner wants grading with a
toggle.** The crew's week strip; **the owner wants shifts with no time limit.** Each of these is his
call and each is recorded as his; the rules the crew wrote (R10, R11, R15–R17) still say what the
build has to survive, and 12.3 says how.

### 12.6 · The follow-ups, answered — 2026-09-14, late, his second reply

**q1 · One pantry, two phones:** *"it can sync on its own honestly, but while testing we can use
trolley pass."* So two phases. **Testing:** the Trolley Pass carries the pantry as a snapshot, both
directions, by hand — that is G1 (§5), built once. **Later:** it syncs by itself, which needs
somewhere to sync *to*, and this engine has never had one. The honest options: **(a)** a private
GitHub repository written with a token from each phone — the town's own pattern, a token on the
device and never in the public shell, R10 unchanged, a few seconds' lag, free; **(b)** a hosted store
— an account, a key in the shell, and a brand-new edge on `docs/BOUNDARY.md`; **(c)** the household
lives on his laptop like the town and AJ reads it from there. **Recommended: (a).** *One question
left:* is a GitHub token on AJ's phone acceptable, or does the household stay on the laptop?

**q2 · The pantry photos:** *"will need to work on this."* Later. Until they arrive, the pantry is
authored as three drawers with placeholder contents, and re-authored from the photos in one sitting.

**q3 · What a shift pays: "I get leftovers?"** Yes, and it is the best answer anybody has given
this plan. **A shift pays leftovers.** The dish you cooked goes into the fridge as *el recalentado*
(§6): tomorrow it is a meal that costs nothing, or it goes into the next shift as the *"mix in"*
of a recipe pair (#5) — yesterday's beans in today's dish. **This makes the pantry a consequence of
cooking instead of a chore**, which is exactly how R17's decay is beaten: the model is fed by play,
not by typing. Nothing is scored; the fridge just fills.

**He asked for best practices for a chill cooking game.** They are `docs/GENRE-RULES.md`, seventeen
of them from the crew's research; the seven that decide this game: **no clock, ever** (R11, and R4:
waiting is content, never a wait); **name what replaces the pressure** (R1–R5 — here it is *reading
a person* and *tactility*); **collection is the decoy** — nothing is locked behind a ladder (R6); **no
day budget** — nothing that can show a smaller number tomorrow (R10, R15); **the marks go on the
kitchen, never the eater** (R16); **a maintained model decays** — feed it by play (R17); **attribution
is a person** — every recipe carries who taught it (R12).

**q4 · Grading: "more recipes?"** So the grade **pays recipe offers**: the good-intentions count
(R15, up only) is what makes a cook *offer* you the next recipe pair sooner — a gift with a face
on it. **Never a lock:** by R6 every recipe is always available by asking, and the toggle (his #7)
turns the offers off, not the recipes. The grade is a rhythm of gifts, not a gate.

**q5 · The two scope lines:** the food game **keeps Meridian's rule** — its restaurants are
Hispanic-owned businesses, which costs nothing and reads true; the cast of §3 are *tenants*, not
businesses, and cook whatever they cook, fusions included. No change to that line. The **seasons
line he accepted** is in `docs/OWNER.md` now, dated and in his words.

**q6 · "merge board?"** Read as *the merge board first*. It is the biggest piece; AJ's question 2 is
still the tie-break. *One confirming question left:* merge board first, then the making surface?

**q7 · "Two types of games — no timer, we chill and want to just encourage healthy habits."**
Settled: **both surfaces, no timer anywhere.** Cookingdom's *+30s* is not carried. The making surface's
"done" rule is coverage, never seconds.

**What is still owed, all of it small:** confirm the merge board goes first; say where the
household's sync should live (a token on AJ's phone, or the laptop); the pantry photos when ready;
AJ's eight.

### 12.7 · His third reply — 2026-09-14, late — and what it started

- **"I don't know what you meant by merge board."** It is the play surface in AJ's first recording:
  a grid of small items, and when you drag two of the same onto each other they become the next
  thing in a chain (dough → pizza → slice → whole pie); the Collection screen lists every chain with
  the unmade steps greyed. 12.2 has the frame-by-frame read. The other surface, from Cookingdom, is
  making one dish by hand, one gesture per step. AJ's questionnaire asks which she would miss more.
- **"Probably my laptop."** The household's pantry lives on his laptop, like the town: a pack that
  writes with a token from there, read on the phones, and the Trolley Pass carrying a snapshot while
  testing (G1). Nothing new leaves the town's own pattern; Zeni's row on run 8 says so.
- **"Can you not access any general veggies, pantry items for testing purposes?"** Yes, for names:
  the pack can carry a testing pantry of common staples authored from public-domain sources (USDA
  FoodData Central is CC0) with no fetch at all — beans, rice, masa, onions, garlic, limes, chiles,
  tomatoes, eggs, oil, salt, the Italian seven, the four Japanese and five Korean jars of §2. Pictures
  are the separate question (12.3c): drawn, or licensed at build time, never fetched while playing.
  Beto's return on run 8 gives the file's shape.
- **The rest of the message is a crew run — run 8** — the questionnaire as a night-mode app page with
  a comment on every choice, full mock-ups of the journey and the app feel, a UI review process
  (engineers, agents, UI, story, QA) written down and run on the mock-ups, the map revamped so a person
  can find the next quest or the open ones, the murals creative and completed, and the backlog put
  together while AJ takes her time. Its returns are `docs/meetings/2026-09-14-la-cuadrilla-run-8.md`,
  its consolidation is §13 and `docs/UI-REVIEW.md` and `docs/meetings/2026-09-14-el-mapa.md`.

## 13 · Run 8, consolidated — 2026-09-14, and what it left standing

*Sixteen agents were called; thirteen advisers and two research sweeps returned (verbatim in
`docs/meetings/2026-09-14-la-cuadrilla-run-8.md`); Chava and Chuy were cut by the session limit twice,
so this section is the session's consolidation and Chava's two cold plays are owed. Everything here
cites a return; nothing here is a decision the owner has not taken.*

### 13.1 · What the run produced, and where it is

| Thing | Where | State |
|---|---|---|
| **AJ's questionnaire**, night mode, thirteen questions, a comment box under every choice | the artifact he forwards (`scratchpad` source `aj-questionnaire.html`; script `docs/for-aj/LA-SOBREMESA.md`) | v2 after the crew's review — Tavo's decision map, Nacho's eleven, Paty's copy, Rosa's four sizes, Zeni's promise: *her answers stay with him and are never copied into the repo* |
| **The journey**, thirteen screens on a phone at night | the artifact *La Sobremesa, the journey*; documents `docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js`, camera `render2.js`, thirty pictures with `manifest.json` | published; every picture labelled real game / real reader / drawing, with Lupe's admission ticket (row · language · shell · `unmodified`/`unrolled` · the fold numbers) |
| **The UI review process** — admission ticket, four verdicts, eight signature lines, the red tests a mock inherits, the ledger | `docs/UI-REVIEW.md` (Lupe) | written; block 1 opened for the journey; crew iteration 9 signs it |
| **The map plan** | `docs/meetings/2026-09-14-el-mapa.md`; issue #160 raised to high | presence marks on the plan, a `TOWNPLAN` seam so Calle Dos exists, no list, no done tick; the ring on "next" is his call; built after his look |
| **The backlog** | issues #173–#200 (Remedios's twenty-nine, one folded into #160), comments on #154 and #156; `docs/BACKLOG.md` §0 | filed and ranked; her pick is #173, the phone held sideways |
| **The research** | `docs/research/2026-09-14-map-and-questionnaires.md`; `docs/GENRE-RULES.md` R18 | filed whole |
| **The palette** | §13.2 below | Pili's eight chrome hexes and four re-cut kitchen grounds, machine-checked to the tenth |

### 13.2 · What the returns change in this plan

- **The night app palette (Pili).** Ground `#14121B` · surface `#26232E` (the note ground, promoted —
  the one new hex) · line `#3B3546` · ink `#E8E4DC` · muted `#9C96AB` (letters only) · accent
  `#A97FFF` (a fill only, never a word) · on-accent `#160F26`. The chrome owns no warm colour; the
  warm band 150–230 is the food's. **Three rules:** accent is a fill and muted is letters (they are
  0.1 apart in value and can only be told apart by kind); gold goes to the food; one violet on screen
  at a time — choices are outlined chips, the accent fills only the chosen one.
- **The four kitchens, re-cut so the grounds ladder ≥40 apart in Rec.601 value:** Mexican comal
  `#554C41` (77) · Korean onggi `#977150` (121) · Italian floured wood `#BC9E75` (162) · Japanese
  hinoki `#DCCFAE` (207, unchanged — it was already right). Accents per kitchen (masa `#F0E6CC`,
  stainless `#D4D8DC`, black olive `#3B3A22`, nori `#23301F`). **§10's palette table is superseded by
  this**; the cross-kitchen accent ladder is dropped because the arithmetic cannot hold both ladders —
  the ground is the identity, and where four kitchens appear together they are told apart by ground.
  Text never sits on a kitchen ground. The two reader faults Pili found are engine work with a red
  first: submit and cancel share one class (`engine/engine.js`, grep `c.className="dbtn"`), and the
  night shell paints every label violet.
- **The journey and the build order (Mari).** Eleven screens plus the one nobody listed — *the day
  nothing happened* — and the HUD, which without `HUDFACT` prints *Rookie → AI LEGEND* in a kitchen.
  Eighteen build rows: **two blockers first and not billed to this game** — careers become a pack seam
  (#154, one sitting) and the `ENDLESS`×`CHAPTERS` refusal in the engine smoke (#156, a quarter) — then
  the shell generated not copied, a minimal pack, the household and the street, the cast, **the four
  documents (recipe card, drawer sheets, shifts board, house card — the whole loop, zero engine
  change)**, leftovers to the fridge, the paste seam with its wash, G4, print (#196), G1, the
  Collection, **the listening canvas (one sitting, a rule: an `art` section may take a tap and a drag,
  the engine never learns what a merge is)**, then whichever surface AJ picks. Roughly nine sittings
  for the half he can use alone; rows 1–13 are not blocked on AJ. **Her decision, said out loud:** the
  grades toggle and the allergy list live on the house card, not in Settings (zero engine change; the
  gear is literal markup in three shells).
- **The shifts board's one rule (Mari, Pili):** it is the surface where yesterday could change colour,
  and it never does — no shift is late, aged, missed or coloured; a taken shift is a shape (a turned
  corner and a tag), the only date on it is the one the player wrote, and nothing compares it to today.
- **The household (Cuca, Don Güero):** one room, five objects, five outlines, zero words — three
  drawers told apart by mass (1 : 1.6 : 2.4), an open shelf with a ragged top edge, a tall fridge door;
  a drawer, a fridge and a stove are the box the engine already has. Don Güero's Phase 7 gives the
  household its parcel and the plan its board; his ledger lines are in his return.
- **The testing pantry (Beto, #197):** `content/sobremesa/foods.js`, names from a public-domain
  database, nothing fetched at play.
- **What may leave (Zeni):** AJ's answers never enter the repo; `docs/for-aj/LA-SOBREMESA.md` now
  says so to her face. The household's sync is the town's own pattern (his laptop, the pass while
  testing).
- **What the questionnaire had to lose (Paty, Rosa, Tavo):** "Send" may not promise what a page with
  no store can keep — the button is labelled by state and the fallback copies the sheet; the clock
  question is asked as a feeling; a bare `✕` is not a label.

### 13.3 · What only he can answer now

The seven on the journey page, in a sentence each: what Tuesday's first screen says (drawn: nothing,
and the door still open) · restaurants as people or a board (drawn: people, lightly) · one house or
each their own half (drawn: one house) · the grades switch on the house card or in the gear (drawn:
the card) · merge board or by hand, and which first (both drawn; AJ is asked) · names, his or drafted
(all placeholders) · the ring on "next" on the map (§13.1, the map plan).

### 13.4 · What sessions still owe from this run

Chava's two cold plays (the mocked map, the journey) · the eight signatures of the UI review
(iteration 9) · the run-8 panels on the wall and `docs/crew/FLIGHT-NOTES.md` iteration 8 with the
thirteen persona proposals answered · Paty's two findings from her run-8 return (stale §6 drift lines
here; the ES timing of the care-package toast) · Mari's three stale citations in `docs/NEW-WORLD.md` ·
the one privacy check on the questionnaire (open it logged out once before it is forwarded).

---

## 14 · The third pass — 2026-09-15 — the kitchen pivots to Korean

*His words are in `docs/ASKS.md`, the rows of 2026-09-15 (second window): **"true, you are right with
AJ, i wasjust trying to help since you have spanish but no problem pivot to korean now - aj doesnt
mind sweet but i prefer savory"**. This section is the session reading them into the plan. Nothing is
built. Where this overrules an answer he gave yesterday, the overruling is written as one.*

### 14.1 · What it settles

| | |
|---|---|
| **The first kitchen is Korean** | This replaces §12.1 **#5** (*"mix, lean Mexican to start"*) and with it Mari's ✅ in §9 **#4**. **His stated reason for Mexican was our reason, not his** — the repo already draws the comal and speaks the Spanish — and §12.1 **#1** says the game is *"mostly for AJ"*. A convenience for the builder was deciding whose kitchen it is; he cut it |
| **Savoury leads, sweet is allowed** | *"aj doesnt mind sweet but i prefer savory."* A dish rule, joining §12.1 **#6**'s *simple, available, popular*: **his half of the pack is savoury-first**; sweet dishes are AJ's to ask for and are never the pack's default. It is also his §12.1 **#2** answer (*"the flavor lol"*) wearing clothes — the one thing he says he likes about cooking now has a direction |
| **The Hispanic-owned rule was already clear of this** | §12.1 **#6** — that rule is Meridian's, and a pack scopes its own. A Korean-first kitchen costs nothing there. No new question |

### 14.2 · What it costs, and this is the real one

**Decision 14 was "AJ's half has no native voice and nobody here can supply one." That half is now the
first kitchen.** Paty's refusal stands unchanged — no agent here invents a halmeoni — and option (b)
of §9 #14 (*write the Japanese/Korean cook as a Mexican character who learned it*) was sized for a
**second** kitchen behind a Mexican first one. It does not carry a pack whose first voice is Korean.

Three ways through, none of them ours to pick:

1. **AJ names a real person she learned it from** — the answer §9 #14 (a) was waiting for, and the
   questionnaire already asks it (`docs/for-aj/LA-SOBREMESA.md`). Cheapest, best, and it is one
   message to her.
2. **Published cooks, credited on the card.** The sources are already in the sweep
   (`docs/research/2026-09-13-healthy-eating-game.md` 6.25–6.26: Maangchi, Sohui Kim, Hooni Kim; the
   Korean Food Promotion Institution) and the game's shape for this exists — §2's *facts are cards
   with the source printed underneath*. A credited cook is not a voice we invented; it is a citation.
3. **The two cooks who disagree**, already written in §2: the Korean cook who says kimchi is about a
   fifth of her country's sodium **and makes it every year anyway**. That line came out of 6.20 and it
   is the most Korean thing in the plan — it teaches judgement instead of deference, and it needs no
   grandmother.

**The nutrition data does not move with the cuisine, and that is a saving:** Korea's RDA National
Standard Food Composition DB is KOGL Type 1 — attribution, commercial and derivative use allowed —
embedded from the database and never transcribed from the printed 10th edition, which is Type 2
(`docs/research/2026-09-13-healthy-eating-game.md`, the licence table). Open Food Facts' Korean
coverage (2,709 products) stays too thin to lean on, exactly as written.

### 14.3 · What it does NOT change, checked

- **The look.** *(Corrected 2026-09-15 by Pili, and the correction is on this section: it cited §4's
  palette approvingly on the day the Korean kitchen became the first kitchen, and **§13.2 had already
  superseded §4's numbers** — two different browns are both called onggi, 39.4 luma apart. §19 settles
  it: both, with their jobs written beside them.)* §4 carries the Korean row — onggi brown `#6B4A33` with a stainless band
  `#B9BCC0`, stainless bowl and white porcelain, gochugaru `#B44A21` as the one accent, and Pili's
  note that stainless is the un-clichéd Korean note no other kitchen has. Pivoting costs nothing here;
  it promotes a palette that was already drawn.
- **The two languages.** §6's rule survives word for word: *Mexican Spanish takes Japanese and Korean
  dish names as loans, never translations* — it was written for this case.
- **AJ's reference game.** §12.2 read it off the recording as **a Korean restaurant first**, then a
  Japanese one, then a beach one. The pivot moves the plan *toward* the game she actually plays.
- **Everything the merge board waits on.** §12.2 and #200 stand: her answer decides it, not this.

### 14.4 · The one confirming question

**Does the 1-for-1 pairing flip with the lean, or stay as he wrote it?** §12.1 #5 asked for every
initial recipe to be paired with a researched recipe from another cuisine, with a *"mix in"* note.
Read literally, the pivot makes **Korean the initial column and Mexican the mixed-in partner** — which
is the reading this section is written on, and the one that keeps his sentence intact. The other
reading is that the pairing was Mexican-specific and dies with it. **One word either way**; nothing
downstream of it is drawn yet.

---

## 15 · AJ answered — 2026-09-15 — and the world has a name

*Both forms are answered and sent: the thirteen of 2026-09-14, and the five of the follow-up at
**02:32 UTC on 2026-09-15**, which is thirty minutes after the session that built it stopped, which
is why nothing has read them until now. **Her answers are not in this repository and will not be**
(Zeni, #200): what follows is only the decisions they settle and the questions they open. Two of her
answers are about her own body and stay with him entirely — they are not summarised here either.*

### 15.1 · Settled by her, and no longer anyone's to choose

| | |
|---|---|
| **The name** | **Simmer.** §9 #15 is closed; she named it herself. "La Sobremesa" becomes the working title this plan was written under, and the file keeps its name until somebody renames it deliberately |
| **The first kitchen** | **Korean, confirmed from her side too** — the dish she named is Korean, which is the same answer his pivot gave on 2026-09-15 from the other direction. §14 stands, now on two witnesses |
| **The second kitchen** | **Japanese.** §9 #4's ordering is fully answered: Korean, then Japanese |
| **The voice** | **Option (a) of §9 #14 is closed and it failed honestly: she taught herself.** There is no person she learned it from, so nobody here is waiting for a name any more. What is left is what §14.2 already listed — cooks credited on a source card, and §2's two cooks who disagree. **Paty's refusal is now the whole answer: an invented halmeoni would be a lie about a real person's actual history** |
| **The payoff** | **The book.** What she wants when a dish is done is the recipe in her book with her own notes beside it — plus a line about how it went, a picture of the plate, and **a mark she keeps to herself**. That last one is R16 wearing its best clothes: the only rating in the game is the cook's own, kept private, never the game's |
| **The gate question — by hand or the merge board** | **By hand.** Asked which she would miss more, she chose making one dish by hand. The merge board does not die (it is what she plays today), but it is no longer the thing the first build must have, and **§12.2's "biggest single build in this plan" is not on the critical path** |
| **The gestures** | She named **seven** she actually likes doing. That is the making surface's content, handed over without anyone having to guess it, and it is more than the one-gesture-per-step sketch assumed |
| **When she meant to cook and didn't** | **Nothing at all happens.** The smaller question at the end of §9 is answered: no kind word, no quiet re-offer. Nothing |
| **How the first recipe arrives** | Researched and drafted for her, from traditional sources — **and she does not want to edit a recipe inside the game.** Editing belongs to the exported copy, on paper, in a real kitchen. That kills a whole editor surface nobody had costed yet |

### 15.2 · Three places where her answers and his do not agree — **ALL THREE ANSWERED, same day**

> **2026-09-15, fourth window: *"aj is queen here."* Where her answers and his differ, hers win —
> and he answered the other two in the same breath. The three rows below stand as the record of what
> was in tension; §15.5 is what was decided. Nobody needs to re-open these.**


1. **Customers.** He read §9 #4 as *"different kitchens in restaurants"* (§12.1 #8) and the reference
   game's chapters are restaurants with dish-set counters. **She does not want customers in it at
   all.** A restaurant can still be a *place* — a kitchen with a name and a cuisine — but the moment
   it has somebody to serve, it is the thing she said she does not want. **Recommendation: restaurants
   are kitchens you cook in, never a service loop.** One word from him and §12.3b is rewritten.
2. **People.** §3 is a cast — Nacho's whole chapter. Asked whether she wants people in it, **she chose
   the food alone.** These are not as opposed as they look: *"feeding someone"* is one of the two best
   parts of cooking for her, so the person can be **the one you cook for** rather than a barrio you
   walk through. **Recommendation: no cast to meet, one person to feed — which is also the household
   of two he asked for.** This is the largest single change to the plan as written, and it is his and
   hers, not ours.
3. **Grading.** He allowed grading with a toggle (§12.1 #7). She named being rated as a thing she would
   hate, in the same breath as timers and customers. **Her own private mark (15.1) is the shape that
   satisfies both** — the game never scores the dish; the cook does, for herself, and it is not shown
   to anybody. **Recommendation: build that, and let the toggle govern the logistics marks only.**

### 15.3 · The standing instruction her last answer gives the whole pack

**No timer. No rating of the dish. No customers. Nothing stressful. It should be playable
absent-mindedly, as a way to put a day down.** That is one sentence and it decides more than any
mechanic in this file: it is a rule of the same kind as `docs/GENRE-RULES.md` R15–R18, it comes from
the person the game is for, and **anything in §2, §3 or §12 that fails it loses.**

### 15.4 · What is still open after this

- **Her one skipped answer** on the first form, and the "anything else" box: both blank. Neither blocks.
- **The three in 15.2**, which are his.
- **`docs/for-aj/LA-SOBREMESA.md`** is now the script of a form that has been answered twice; it should
  say so, and the template in `docs/templates/questionnaire/` should carry what these two rounds taught
  (a comment box under every choice earned its keep — her longest and most useful answer came through one).

### 15.5 · Settled — 2026-09-15, fourth window

| | What was decided | In his words |
|---|---|---|
| **Customers** | **None.** A restaurant in Simmer is a kitchen you cook in and never a service loop. He did not answer this one separately, and did not need to: *"aj is queen here"* decides it, and she said no customers | *"aj is queen here"* |
| **People** | **No cast to meet; one person to feed.** §3's barrio does not survive into this world — and this is **Simmer's answer, not a rule**: it is a special case, it may veer off again for mini-games, and the pack stays custom and keeps being updated for her | *"lets keep it custom as we may veer off with mini games and this is going to be a special case, as for AJ we can keep updating a game"* |
| **Grading** | **The only mark is the cook's own, private, never shown.** The game does not score a dish. In a template, grading stays a pack's own declaration and inherits nothing from here | *"ok then we know the answer here but again obviously in template it stays custom"* |

**And the line that is bigger than this world**, recorded in `docs/NEW-WORLD.md`: *"we will learn from
these for templates but we want templates to one day be made off of one prompt or from one
questionaire."* **What these two rounds of questions TEACH goes into the template. What AJ CHOSE does
not.** Every decision in §15 is Simmer's own until somebody proves it is everyone's.

---

## 16 · Nacho's second chapter — 2026-09-15 — the world with no cast

*§3 was a cast. AJ chose the food alone, so §3 is **superseded, not trimmed**. Written against §15.3
(no timer, no rating, no customers, nothing stressful, playable absent-mindedly) and the owner's
"aj is queen here". **Simmer's answer, never a rule a future world inherits.** Nacho's return had no
Write tool; this section is the session transcribing it, and the three forks in §17 are still open —
nothing here is signed.*

**The shape.** One kitchen, Korean, at night, entered with no arrival — you are not moving in, you are
already standing at the counter. Four surfaces: **the counter** (made by hand, her seven gestures, no
clock), **the stores** (three drawers, the shelf, the fridge, the freezer — things you *read*, never
people you ask), **the table** (laid for two, always), **the book on the sill** (the payoff). The
Japanese kitchen is a **second room through a door** — not a district, not an unlock.

**The one person to feed, in three registers, none of them a body in the room:**
- **Now** — the second setting. A dish is done, both bowls are filled, nobody arrives and nobody
  speaks; next time she opens the game the second bowl is stacked in the sink and the dish is gone.
  That is Meridian's own *morning after* doing a whole character's work with no dialogue.
- **Tomorrow** — the fridge. *El recalentado*, which was the owner's own answer, where the person
  she feeds is future her, and that is the least stressful care there is.
- **Out of the game** — the page. **In a world with no people, feeding someone is the export**: Copy,
  Print (#196) or the pass hands her page, with her own notes on it, to a real person holding a real
  phone. He is not modelled because he does not need to be.

**The law that keeps the second bowl safe:** *the table changes because she cooked, never because a
day passed.* If she does not cook, the room is pixel-identical tomorrow. A clean bowl laid for two is
not a wilting plant — provided nothing ever empties it.

**What pulls, with no clock, no score, no customers and no cast: her own half of the book.** The
credited card says *a spoonful*; her line underneath says *two, and start the rice first next time*.
The book fills with her corrections to a stranger's recipe — which is exactly what she actually did
when she taught herself.

**Judgement, with no grandmother: two cards for one dish.** Both credited, both correct, differing in
one thing that matters and that a beginner would not think to ask — stock or water; rinsed three
times or rinsed till it runs clear. She picks one and cooks it. **Neither is the answer**; the book
records which she cooked, and that is the only reason the book is worth reading a year later. Nobody
is invented, so Paty's refusal is untouched: a credited cook is a citation, not a voice we wrote.
**A card is silent after she picks** — the moment either one knows what she did, it is a grandmother.

**Where the words live, since there are no characters and a narrator is a character wearing a coat:**
*every sentence in Simmer is a recipe, a noun, or hers — and the game itself only ever names what
changed.* The card speaks like a cookbook, credited. The room's paper speaks in **lists of specific
nouns** (*doenjang · gochugaru · soup soy · the coarse salt · a bag of dried anchovies*) — a list is
warm when its things are specific, and a list can never patronise. She is the only voice allowed to
say "I". A toast may name a thing that changed and never a feeling about it.

**What §3 loses, named so nobody rebuilds it:** the vecindad and its courtyard (a courtyard with
nobody in it is not intimate, it is abandoned) · all four households · Ofelia and her chard line,
which is the one most worth keeping and most clearly impossible — a drawer cannot notice what you
waste without becoming a narrator that judges · the cat's joke · moving day as chapter 0 (a game you
put a day down in must not open by asking you to move house) · all five chapters · *"four neighbours
taste it and each says a different thing"*, which was the best beat in §3 and is precisely the
mechanism she refused · the sobremesa close · the tile of scratched dates · the three reasons as a
greeting · **and the week as a shape. Simmer has no chapters. It has dishes.**

**What survives by changing what it is:** R12 — *a dish belongs to a person, never a nation* — moves
from four households to **the credit line on the card**, which is where it was always most honest ·
*q.b.*, the best object in §3, becomes **the blank in her own book** (`[CODE]` the reader already
draws it and exports it as `**label:** ___`) · *"you are the one who writes it down"* becomes the
whole premise, with one correction: it is what she found out herself, not what somebody told her ·
and the cast's two refusals — nobody is a coach, nobody ever comments on her body — stay **written
down precisely because there is nobody left to break them**.

**The engine fact that makes a cast-less world legal, and it is already shipped:** `READS` + `DOCS`
is described in the engine's own words as *"a thing you can read without talking to anybody"*, its
mark is the breathing cream card, and the mark never clears, because *"a thing you can read is a
place"*. **A world with no people is not a workaround here. It is a mode this engine already has.**

### 16½ · Three code facts this chapter turned up, checked by the session

1. **The export drops everything she types, and the export IS the payoff — CONFIRMED.** `docMarkdown`
   branches on `h · p · note · blank · kv · t · q · docs` and **has no branch for `form`**. So Copy
   and Download would hand her a stranger's recipe with none of her notes. **It is not an engine hole:**
   the reader's own comment says *"the reader collects the values; content acts"* — the pack is handed
   the values and decides. **The pack rule, and it is binding for Simmer: whatever she writes is stored
   by the pack and re-printed on the same page as `p` / `kv` / `blank`. The form is only the pen.**
2. **A second kitchen may be a second ROOM with no engine change, and the plan's blocker B may be
   stale.** Rooms come from `WORLD_DEFS`, which is independent of chapters, and a pack that declares
   no districts gets one synthesised — which is how the town already ships endless. Only a second
   *district* is blocked. **Not verified by booting; stand up a two-room endless pack before banking it.**
3. **No ending variants may be written for this world, and the grading toggle governs nothing here.**
   Quests are found on people; with no cast there are no quests, therefore no marks, therefore one
   grade for ever. §3's endings, §12.1 #7's toggle and §12.6's "the grade pays recipe offers" all
   spend a grade this world does not have. **The only mark in Simmer is hers, private, on her own page.**

---

## 17 · Tavo's loop — 2026-09-15 — by hand, absent-mindedly, and what that costs

*Written against §15.3, which outranks it. His return had no Write tool; this is the session
transcribing it. **This supersedes the daily half of §2 and retires §2's weekly spine** — both were
built on a cast she has said she does not want.*

### 17.1 · The pair of her answers that only looks contradictory

She wants the recipe in her book **with her own notes beside it**, and she does **not** want to edit a
recipe inside the game. Those cancel if you read them fast. The resolution has to be structural:

> **Editing is changing the instructions. Annotating is adding your own layer beside them.** The
> recipe is pack data with **no writer anywhere in the game**; her note is a separate record keyed to
> the recipe, and it renders **beside** the steps, never inside them.

**This is the easiest thing here to break, in the most sympathetic way possible** — *"just let her fix
the quantity"* — and one writable quantity field makes the recipe editable. The guard, when the book
is built: if a session ever renders her note inline with the steps, or ships any field whose value
lands in the recipe object, her instruction is broken and nothing will fail.

### 17.2 · The loop

**The spec that decides whether "absent-mindedly" is true: one button press from open to first
stroke. Count the taps, do not feel them.** `[CODE]` free — `checkRead()` tests the tile you stand on
*first* and `readMarks()` has no distance limit, so **spawn is the counter's own read tile** and Read
is live the instant the world draws. The walk exists for the fridge and the shelf and is never
required to cook.

- **Beat 0 · the door, ~2s.** The kitchen exactly as she left it. No ❗, no welcome back, no day
  count, no streak, no menu. One thing on the counter, not a list. **What the game does back: nothing.
  That is the beat.**
- **Beat 1 · pick it up, one tap.** No confirm, no difficulty, no ingredient check.
- **Beat 2 · the steps, one gesture each.** One line above the board, always visible, never a prompt
  and never a bar. **Every "done" rule is coverage or count, never seconds:** stirring ≈ three turns
  swept (more changes nothing) · rolling out ≥90% of the round (self-limiting — you cannot over-roll)
  · spreading ≥85% (so the awkward corner is never a chase) · sprinkling, where **more is never
  wrong** and there is no "too much salt" state, ever · laying pieces one by one until the tray is
  empty (**the absent-minded champion** — pure rhythm, interruptible at any single piece) · cutting,
  **the one gesture that begs to be graded, and is not**: uneven is a fact about her kimbap, drawn
  faithfully and never marked.
  **Six of the seven are performance and one is a decision — and she named both piles herself.**
- **Beat 3 · the interruption, a designed beat and not an accident.** State is written the moment the
  pointer lifts. She can close the tab mid-stroke and come back to the coverage she left. Nothing
  continues while she is away, nothing browns, and **there is no "resume?" dialog** — the board is
  simply as she left it. It is the cheapest thing in this section, because the board's whole state is
  a coverage number and a list of placed pieces.
- **Beat 4 · plating up — the only decision in the sitting.** What she cooked, plus rice, **plus
  whatever is in the fridge from earlier sittings**. **There are no slots**: a slot implies a missing
  thing. A surface has no such thing as empty. By sitting ten the fridge has six things in it, so the
  decision has six inputs instead of one — **the only surface in the design whose interest grows on
  its own with no new art.** The tray as she left it is the picture in the book.
- **Beat 5 · the book.** Her plate at the top, the recipe under it read-only for ever, and three
  optional additions: a line about how it went (the placeholder is a question in her register —
  *"how did it go?"*, not *"Notes:"*), her notes beside the steps, and her private mark. **On the
  mark, his position: not stars.** A five-point widget pointed at her own food is still a scoreboard
  and the first session that wants to sort the book by it will. Make it a cook's word — *again ·
  fine · not again · needs something*. **Tell: if two marks can be combined into a third number, you
  built a rating.**
- **The exit.** The page *is* the end of the sitting. No "next dish?", no count remaining, no bounce
  to a menu with an offer glowing.

**Dish one ≈ 5 minutes; dish ten ≈ 90 seconds**, because strokes become muscle memory. That is not a
bug — 90 seconds is a better way to put a day down than twenty minutes — but **the content burn rate
roughly doubles by dish ten**, so any estimate built on "five minutes a dish" is wrong by half.

**The day she meant to cook and didn't: nothing.** And the part a session will get wrong is not the
kind word — it is **the half-rolled dough**. If it sits on the counter eleven days it sits there
exactly as it was: no dust, no age, no colour, no line about it.

### 17.3 · "Absent-mindedly", priced — his position, not an average

**The real tension, in one sentence:** *a gesture that can be performed with half your attention is a
gesture that could have been a button.* Every satisfying by-hand cooking game is satisfying because it
**demands**. That is the trade she has asked us to refuse.

**Given up deliberately:** precision (no tolerances, no accuracy readout, no "you missed a spot", and
passing a threshold is **silent**) · sequence memory (which costs *sa-shi-su-se-so* as a mechanic — it
survives as a note on a card, never a step she can fail) · **multi-tasking, cut outright** — never a
pot wanting stirring while she cuts; not a tuning question, and it must not come back as "just a
gentle one" · any fail, retry or undo-that-implies-a-mistake · scarcity, because if you delete the
clock and then ration the ingredients you have rebuilt the tension with extra steps.

**Refused, because the game stops being worth playing:** the stroke must change the screen
continuously, 1:1 — **the only thing making these five minutes worth more than one tap is that the
picture was literally drawn by her hand; that is the product and everything else is packaging** · the
output must differ every time and the difference must be visible in the book, which costs one line:
**draw the plate from what she actually did, never from a finished-dish sprite** (it will be proposed,
because a sprite mocks up better, and it collapses the whole design into a clicker) · one decision per
sitting · and **the residue**, because without something left behind an absent-minded sitting is
indistinguishable from not having played — and then "nothing happens when you don't cook" quietly
becomes "nothing happens either way". **The book is the only asymmetry in the game and is therefore
load-bearing.**

### 17.4 · What replaces the merge board — and the cheapest gate in this document

The board did three jobs. **(a) Manufacturing progress: nothing replaces it and nothing should** — a
merge chain works by making the previous tier obsolete, which is an unlock ladder, and the substitute
for a treadmill is almost always a treadmill. **(b) The Collection: already in the plan and free —**

> **The book is the Collection, read from the other end.** A merge Collection lists what you have
> *not* made, greyed out, which is a list with the names removed. **The book lists what she HAS made
> and has no grey tiers at all**, because the unmade recipes live on a shelf she walks to. A page
> appears when a dish is made and no page ever says "not yet". It is the mural's own shipped idiom —
> paint only ever goes on — applied to paper, and it is not even a number. It is a thickness.

**(c) Habit, and this is the real cost, stated as a bet:** she plays a merge game today and Simmer
will not feel like it. What would make her keep opening it is that the book accumulates and it is
hers — **and that is a bet, not a guarantee. It is also testable for less than any surface in this
plan:**

> ### **Make three pages of the book by hand. Show her. Ask if she wants a fourth.**
> Three drawn pages, three different plates, three lines in her own voice. No engine, no pack, no
> sitting spent on a listening canvas. *"Yes, what's next"* means everything above is worth building;
> a shrug costs an afternoon instead of nine sittings. **This goes BEFORE the making surface, not
> after.**

### 17.5 · The tenth sitting, and what must exist by then

Ninety seconds, ten pages, ten different plates — **that part holds.** What goes flat is the
gestures. Four things, by buy-per-build: **(1)** ten dishes whose gesture *sequences* differ — the
deck is not seven gestures, it is seven gestures in ordered subsets of four to six, and the lazy
failure is that everything becomes roll/spread/sprinkle/place because those are easiest to draw; the
guard is a column in the recipe ledger plus a rule that no gesture appears in more than six of the
first ten dishes, **decided now or not at all**. **(2)** Leftovers actually reaching the tray — a
small array and a document, and the only thing that makes sitting ten structurally different with no
new art. **Move it earlier than §13.2 has it.** **(3)** A way to walk back through the book, which
puts G4 (the reader scrolling to the top on every open) **on the path, not optional**. **(4)** One
gesture she has not met, arriving around dish eight — so **do not spend all seven in the first three
dishes.**

### 17.6 · What NOT to build, ranked

1. **The merge board.** And the scoping fix that matters: "the listening canvas, one sitting" must be
   scoped to **the making surface**, not to a grid of draggable items with a chain table. Two
   different builds; only one was chosen.
2. **Customers in every disguise — and the disguises are what will actually get built.** A dish-set
   counter, a shift *posted by* somebody, a cook who *asks* for a dish, hearts from a cook. Every one
   is a person waiting for food with the till filed off. ⚠️ **Biggest casualty: the shifts board.**
   Picking up a shift as a contractor is service work with the clock removed. **His to overrule, not
   ours to quietly keep.**
3. **The grades toggle and everything behind it** — a toggle for a thing that should not exist is two
   builds, not one. Her private word **must never be stored beside a logistics mark**, or somebody
   will average them.
4. ⚠️ **Every plan-of-the-future surface, including the shifts board that replaced the week strip.
   This collides with his own answer** (*"a meal plan would be ok"*) and with the best-evidenced
   mechanic in the whole sweep. **That is his call and it lives in HIS half. Do not resolve it by
   smuggling a small one into hers.**
5. **A recipe editor, and every field that can write to a recipe** — again, the sympathetic version.
6. **Any expiry, age or "getting low" — and leftovers must not spoil.** `[CODE]` nothing in this
   engine spends a day, and that is a property to preserve, not an omission to fix.
7. **The pantry as a maintained ledger, on the first playable's path** — his half, not hers; leftovers
   feed the tray by play, which beats decay with no ledger.
8. **The cast as a barrio you walk through** — §16 is what replaces it.
9. **Nutrition numbers, `foods.js`, citation cards, official diagrams** — all real, all his, none
   inside her five minutes.
10. **Steam and every ambient animation.** The making surface already moves. Spend it after ten dishes
    exist.

### 17.7 · Two cost findings, both checked by the session

- **F1 · The making surface may need NO engine change at all — CONFIRMED by reading.** §13.2 costs it
  as an engine RULE, an engine PR and a merge into shared code. In fact `docRender` builds the canvas,
  hands the pack `art(g,W,H)` — and `g.canvas` is the element — and **the engine attaches no listeners
  to it; `.dart` has no CSS rule in either shell.** So a pack can attach its own pointer handlers
  today, with no engine change, no `GAMEV`/`CACHE` bump and nothing touching Meridian. Two things it
  must do itself: set `touchAction="none"` (the canvas lives inside the scrolling paper, so a vertical
  drag would scroll instead of stir) and cope with starting **hidden**, because `art` runs before the
  reader is shown. **Not reproduced in a browser — that is the next thing to prove, and Beto decides
  whether it should be a declared seam anyway.**
- **F2 · Blocker B is off Simmer's critical path.** The cap is on declared districts, not on rooms;
  a pack with no chapters gets one synthesised, which is how the town already ships endless. If "a
  second kitchen" means "a second room you walk into", the blocker may not touch it. **One fewer
  engine PR between here and showing her three pages of a book.** Read, not run.

---

## 18 · The forks Simmer owes the owner — 2026-09-15

*Five, from §16 and §17. Each has a recommendation marked ✅ and each is cheap to answer and
expensive to guess. None of them blocks the one thing §17.4 says to do first.*

| ❗ | The fork | ✅ Recommended | What it costs to guess wrong |
|---|---|---|---|
| **El 2o plato** | Is the one person she cooks for ever **named**? | **She names it once, in her own hand, on the book's first page, and the game never repeats it** — one blank, zero engine, and the only naming a world with no cast can do without inventing a person | Never named is purest and lets her mean whoever she means on the night, but an unnamed second bowl can read as a ghost. **The pack naming him** writes a real person into a public repository, which is the thing Zeni's rule exists to stop |
| **La foto** | She asked for a photo of the plate. The reader has **no file field**, and `art` draws but never listens | **The game draws the plate from what she actually assembled** — and the **exported and printed page carries a slot for a real photograph**, since print is already asked for (#196) | A real photograph in the game is the one part of her payoff this engine cannot store: ~80–120 KB a dish into the same origin as the save, **whose write is a swallowed `try/catch`** — so once it is full, every later save fails **without a word**. Twenty dishes is survivable and it is a ticking clock. **Not a thing to settle by quietly building the cheap one** |
| **El libro** | Does the book hold pages for dishes she has **not** cooked? | **Two objects: the shelf is the library (every card, readable now, nothing owed); the book holds only pages she cooked** | One book with every dish as a blank page is closest to the Collection she likes today and is **a to-do list with nice typography** — the only surface in the game implying she owes it something. **Left alone, whoever builds it will pick the blank pages, because they look better** |
| **El turno** ⚠️ | The **shifts board**. His own answer put the kitchens in restaurants; Tavo's read is that a shift posted by somebody is service work with the clock removed | **For the first build: one kitchen, it is hers, and the shifts board is not built at all** | It is the biggest single casualty of her answers and **his to overrule, not ours to quietly keep** |
| **El plan** ⚠️ | The **meal plan**. He allowed it; she wants nothing that looks like a plan | **It lives in HIS half of the pack and never in hers** | It is the best-evidenced mechanic in the entire research sweep, so it should not simply die — but it must not be resolved **by smuggling a small one into her half** |

**And the thing to do before any of it** (§17.4): **three pages of the book, drawn by hand, shown to
her.** Three plates, three lines in her voice, no engine and no pack. It is the cheapest real gate in
this document and it tests the one thing nothing else can: whether a book that fills up is enough to
keep her opening it, now that the merge board is not what she asked for.

---

## 19 · Pili on why the art does not read — 2026-09-15

*The owner: "the art was still off", and before that "aj cant tell what those things are, we need more
details please." This is the answer to that sentence. Her return had no shell, so **every luma below
was hand-computed and then re-run by the session in a script — all of them correct to a tenth**, and
one of them turned out to be about code shipped this same day (16½ below).*

### 19.1 · The ranked three, if there is only time for three

1. **The making surface — it does not exist.** AJ chose it; it is the centre of the game; and the pack
   has **thirteen pictures of paperwork and none of the thing she said she wants to do.**
2. **The four dish thumbnails.** This is literally *"AJ can't tell what those things are"*: they are
   **16×16 pixels** drawn at ×4. Sixteen rows to say *doenjang-jjigae*.
3. **The plate** — the flagship picture, and it has **three cameras in one frame**. Fixing it sets the
   one camera the making surface and the book page both inherit, so it is three pictures' worth of
   decision in one. **And the book page is not a fourth job: the plate picture IS the photo in the book.**

### 19.2 · What is actually wrong, in numbers

| | Measured | Verified |
|---|---|---|
| The **first kitchen's own dish** is a hole in the page: the jjigae vessel `#1E1A17` on the night paper `#1C1A22` | **Δ0.7 of 255** | ✅ |
| **White rice in a white bowl on cream paper** — porcelain `#F4F1EA` vs the cream reader `#F7F2E4` | **Δ0.8** | ✅ — *this is the sugar-skull fault repeating: `#F6F2E8` on `#F7F2E2` cost five fixes and ended with him drawing arrows on a screenshot* |
| **Gochugaru, named in §4 as "the one accent", against either onggi** — while §12.3f's own rule asks for ≥90 | **Δ19.8 and Δ19.6** — it misses by about seventy | ✅ |
| The night **accent** `#A97FFF` against the night **muted** `#9C96AB` — *press this* vs *never mind* | **Δ0.0** | ✅ |
| The map mock's **next** `#E0662B` against its **done** `#8A8474` | **Δ0.2** | ✅ |
| **And the one that was about today's code:** the shipped map marks, work `#E0662B` vs host `#E0A430` | **Δ37, under the floor of 40** | ✅ — **re-cut the same hour to `#E8B94A` (186.4): Δ54.6 from work, Δ46.7 from the paper** |

**The rule underneath all of it: subtract the surface first, every time.** On cream you have 241.9 to
work downward from; on night, 27.5 upward. That is not one palette, and the pack has been treating it
as one — the four kitchen grounds were laddered ≥40 apart against **night** and that same ladder puts
Japanese hinoki **Δ34.8 from the cream paper**.

### 19.3 · The floors that answer "she can't tell what things are"

- **A mass must be ≥48 CSS px to be seen and ≥64 to be named cold.** The drawers' tallest is 48.
- **A 16-px source grid buys you a vessel and nothing inside it. Go to 24×24 at ×4 = 96 CSS px**, which
  is where a rim, a lid, a handle and one garnish can all exist at once.
- **Never more than four masses in one picture at 390** — three is the number you want, with a 2:1 size
  ladder between neighbours. The plate currently carries six objects and a ground.
- **In landscape, one row, always.** Portrait is a width problem; landscape is a height problem — the
  art canvas is ~322 px wide at 390, and at 844×390 you can see **207 px of height**, which is how
  *See the board* ended up rendered as **a decorative violet horizontal rule**.
- **A drawer is never a rectangle** — it reads when it is *pulled out*, and then the only place a jar
  may sit is **inside** it. Nothing on top of a closed drawer, ever.
- **A dish is a vessel plus a rim plus one thing breaking the rim.** The rim (≥60 from the body) is
  what makes it a bowl and not a lump; the thing breaking it is what makes it food and not a pot.
- **Steam does not draw at any size here** — use a lid, tilted, resting half-off.
- **A single named ingredient does not draw at 390.** A carrot, a pepper and an apple at 24 px are
  three coloured lumps: draw the container and put the word in type.
- **No word is ever painted into a drawing** — and there is a code reason on top of the craft one:
  `docMarkdown` has no `art` branch at all, so **every "Drawing:" caption in all thirteen pictures
  vanishes from Copy and Download.** Anything a picture is the only carrier of must also exist as a
  `kv` row or a `p`.
- **A placeholder is a box in the right material at the right size with nothing on it.** Never a
  photograph, never a *finished* drawing of the wrong thing — *which is what the current plate is, and
  why he said the art was off rather than unfinished* — and never an emoji, because a borrowed emoji
  out-draws every real thing beside it. **Never more than one placeholder per picture:** one unfinished
  object among three reads as unfinished; three read as broken.

### 19.4 · The Korean palette in practice, and the collision resolved

**The contradiction, reported not absorbed:** §4 says onggi `#6B4A33` (81.2) with gochugaru as the one
accent; §13.2's re-cut says onggi `#977150` (120.6) with stainless as the accent and gochugaru demoted;
the drawn code follows §13.2; **and §14.3 — written yesterday, the newest section in the file — cites
§4 approvingly.** Two browns 39.4 apart are both called onggi.

**Settled here: both, with their jobs written beside them.** `#977150` is the **rung** — the 6-px
stripe on a card, where it has to sit in a four-way ladder. `#6B4A33` is the **room** — the kitchen's
own ground. And:

> **Gochugaru may never touch the onggi.** It is a mark on **metal** (Δ86.6 against stainless) or a
> mark on **the page** (Δ140.9 on cream), never a mark on the pot. The Korean kitchen's real structure
> is **onggi 81.2 against stainless 187.6 — Δ106.4** — which is the un-clichéd note doing structural
> work instead of decoration, and it fixes the black-brick problem in one stroke.

**One rule that solves the lightbox and the sunken slab together:** the food picture's frame comes not
from the kitchen's ground but from its **accent** — a 6-px stainless border. On night that is an edge
at Δ160 from the paper; on cream, Δ54. One rule, both papers, every kitchen.

**And a chrome rule that is not negotiable:** since the night accent and the night muted are Δ0.0
apart, *press this* and *never mind* can only ever be told apart by **kind** — the accent is a **fill**,
the muted is **letters**, and there is **one violet fill on screen at a time**. The drawer screen has
two; the recipe screen has two side by side, one of which is a bare ✕.

### 19.5 · The screens that must exist, and two to delete

**The making surface**, and it settles the camera for everything: *where your own eyes are when you
stand at a counter* — you see the top of the board **and** the front of the pot. Not overhead (every
vessel becomes an identical circle), not three-quarter (you lose what is inside, which is the only
thing you care about). **One camera for the making surface, the plate and the book's photo.** Trays
across the top, board in the middle 60%, **nothing at the bottom, where her thumb rests** — and that
layout never changes between gestures or dishes, which is what lets a thumb learn one place.
The gesture mark is **one vocabulary with seven paths**, a dotted path with an open circle at the
start and an arrowhead at the end, animating once and then sitting at 40% — never blinking, never
pulsing, never red. **The acknowledgement is the tray emptying**: physical, non-evaluative, readable
at thumbnail size. It must never show a timer, a ring that fills, a bar, *Perfect/Good/Miss*, a score,
a star, a heart, a streak, a customer, a red flash, or an undo that implies she did it wrong.

**The book page**, in this order: the plate she actually made · the dish name · **the private mark as
a corner fold, not stars** — one, two or three folds, physical, hers, with a silhouette you could see
from the edge of a stack and **which nobody could read as a score** · her line about how it went · the
recipe as handed to her · Copy and Download. **Which means killing the turned corner on the shifts
card** (invisible anyway at Δ17.6) — one mark, one meaning, a rule that has already cost this project
once. The book must never show a count, a percentage, a grid of empty slots, a lock, **or a date** —
*a date on a book page is a streak with better manners*.

**The one person you feed: you never see a face, you see the second plate.** When the dish is done the
board's right-hand end holds **two vessels instead of one**. That is the entire cast of this world, it
costs one drawing, and it says the warmest thing in the game without a word.

**Two screens to delete rather than improve:** the week strip (retired by §12.3b) and the badge mock
(drawn to be refused, and §15.3 has refused it). Leaving them on the review page means he is looking
at pictures of things we promised not to build while telling us the art is off.

### 19.6 · What nobody has done yet

**No cold read has been done on any of this art, by anyone.** Somebody with no context has to be shown
the four dishes and asked to name them. **Pili expects three failures.**
