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

**Live drift found in the shipped repo while doing this, and not fixed under this run's rules:**
`changarrito/content/strings.js` has `locs.hq` = `"The stall"` and `arrive.hq` = `"The stall."`
**inside the ES block** — two untranslated English strings in the town's Spanish. Suggested:
`"El changarro"`.

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
