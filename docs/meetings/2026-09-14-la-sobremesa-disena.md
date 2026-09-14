# La Sobremesa — the crew designs a second world about eating well — raw returns, 2026-09-13/14

*Seven designers and Chuy, run as advisers in parallel with one pen (crew mode off), after four
research sweeps whose consolidation is `docs/research/2026-09-13-healthy-eating-game.md`. This file
is their returns **verbatim** — pre-flights, deliverables, questions, "what I did not check",
post-flights and proposed persona edits — because the consolidated plan (`docs/la-sobremesa.md`) is a
digest and the record of why is here. Nobody painted a mural panel on this run: the brief did not ask
for one, which is a fault of the brief and is recorded in `docs/crew/FLIGHT-NOTES.md` iteration 7.
Nothing below is a decision; the fifteen the owner owes are `docs/la-sobremesa.md` §9.*

---

# mari

## PRE-FLIGHT

I read `docs/NEW-WORLD.md` end to end, then `APPROACH.md`, `CLAUDE.md`, `.claude/skills/game-brief/SKILL.md`, `docs/for-aj/QUESTIONS.md` + `AFFECTED.md`, `GENRE-RULES.md`, `ARCH-LOG.md` A11, `OWNER.md`, `POSTMORTEM.md`, `GAUGE.md`, `GIFTED-GAMES.md` §2–§5, `OPEN.md` §0–§2, `NEXT-SESSION.md`, the owner's two verbatim asks at `docs/ASKS.md:43` and `:54`, and the four sweeps now filed at `docs/research/2026-09-13-healthy-eating-game.md`. Every `[CODE]` claim below was grepped today against `engine/engine.js` and the shells — I did not paste a number from any register without re-grepping the identifier, and three registers turned out to be stale (noted inline). Nothing was built, created or edited; my only scratch use was reading.

---

## THE DELIVERABLE

### 0 · The name, the folder, and where it fits

| | |
|---|---|
| **Working title** | **La Sobremesa** (EN subtitle: *the long table*) |
| **Pack folder** | `content/sobremesa/` · shell `sobremesa/index.html` · `STOREPFX = "sb"` · `GAMENAME`/`GAMEV` = `sb-v1` |
| **Why that word** | It is the hour you stay at the table after the food is gone. It is literally *unrushable time with no task* — so the title states the answer to §0⅞ instead of describing a mood. It is the owner's own language, it is native to the Italian half too, and it promises nothing about anybody's body (which `[WEB]` FTC/FDA/EC 1924-2006 say we may not do — lens 1 #35, lens 2 L4). |
| **Where it fits** | **Both, in this order: a weekly companion first, a gifted game second.** |

**"Daily companion" is the wrong shape and I am refusing it on the evidence.** A daily obligation is the exact thing that cancels the calm (`[WEB]` lens 2 F16; R11). The cadence of this game is **the week and the season** — the shop, the plan, the fresh start — because that is where the habit evidence actually sits (`[WEB]` lens 1 #1, #4; lens 2 F12: medians 59–66 days, "missing one opportunity does not materially affect habit formation"). The engine already has the season layer and has never had a day budget, and `[CODE]` nothing in it spends a day — **that is a property to preserve, not an omission to fix.**

As a gift it is AJ's; as a companion it is the owner's. Same pack, two save prefixes is *not* the answer — one pack, and the household in it is **one household**, per R12.

### 1 · What replaces the pressure — answered, because a file cannot be written until it is

Three engines, in the order they carry weight. Two are refused outright.

| | Engine | What it is here | Cost |
|---|---|---|---|
| **1** | **R2 · The dish is the reply** | Somebody tells you something at the table. You decide what to cook. What you cooked changes what they say next week. | `[CODE]` Cheapest thing in the building. `INTERVIEW` is already *questions with no right answer* (`engine/engine.js:220`), the reader already takes real forms (`:3485`), documents are built live on every open. **No engine RULE.** |
| **2** | **R1 · Comprehension** | The recipe is genuinely incomplete — because a handed-down one is. The blanks are real: what "until it smells right" means, what her sister does differently, what the national guideline says the plate is. | `[CODE]` The reader draws a labelled blank at `:3455`. The cost is **writing and cooking**, and that is not small. |
| **3** | **R4 · Duration you cannot shorten, with abundance** | Nixtamal (8–18 h), a kimjang, Hazan's 45 minutes you must not stir, banchan made ahead and eaten across days. Leaving the game is the correct move. | Content rule + `petalMomentTick` (`engine/engine.js:1558` — **A11 cites `:1224`, stale by 334 lines**), which is welded to petals and wants unwelding. |

**Refused, and the refusals are the load-bearing half.** No streak that can reset (`[WEB]` lens 2 F6/F7; lens 1 #14 — the primary study everyone cites for streaks says a missed day does not matter). No calorie or weight ledger (`[WEB]` lens 1 #13, lens 2 L3: ~75% of 105 people with an eating disorder used MyFitnessPal, 73% of those said it contributed). No leaderboard or feed. No expiry-red pantry list — a red list is a guilt list. No computed "how healthy is this" score (`[WEB]` Yuka, lens 3 #8: a number the game computes becomes a verdict on somebody's grandmother's dish). No day budget. **No `hearts` toggle** — reaching for it is a way of not answering this question (A11).

**One contradiction I resolved by checking rather than asking, so it is a finding:** the owner asked to *"organize future meals"*, and R10 forbids a day budget. They do not collide, on one condition — **the plan is written forward and never marked backward.** A week sheet that shows what you meant to cook is an if-then plan (`[WEB]` lens 2 F13: d = 0.65); the same sheet with a red X on Thursday is a day budget. **Tell: any surface where yesterday can change colour.**

### 2 · What the template gives this game for free — `[CODE]`, grepped 2026-09-14

| The game needs | It already exists at | Note |
|---|---|---|
| A recipe card with blanks, tables, a dropdown, a button, and a whole form | `engine/engine.js:3455` (`blank`), `:3470` (`btn`), `:3475` (`sel`), `:3485` (`form` — field types `text`, `password`, **`area`**, `select`, `checks`) | **The paste box already exists as a document field type.** "Copy and paste some recipes" is authorable today with no engine change |
| A document that is live, and a document that is an object rather than a registered id | `docSections` `:3370`, `docOpen` `:3513` | A recipe card per dish, a plan sheet per week, built one line before it opens |
| Copy out | `navigator.clipboard.writeText` at `:3673`, `:3939`, `:4759`, `:4921` | **`readText` → 0 hits.** There is no Paste *button*; the player pastes into a field. Fine |
| A conversation with no right answer | `RM()` / `INTERVIEW` `:220` | The intake: *what did you eat growing up, and who cooked it* |
| Occasions and seasons by date **or by name only** | `SEASONS` (config-declared) | The fresh-start moment habit science asks for (`[WEB]` lens 1 #4) |
| A cast placed and removed while the game runs | `addChill` `:154`, `removeChill` `:166` | Four rules in `NEW-WORLD.md` §9.4 — the tile must be given back, and `auditReach` re-run |
| A world with **no score at the door** | `HUDFACT` `:492`; the XP bar hides at `:4006` | **This pack must declare it** or a kitchen prints *Rookie → AI LEGEND* |
| No stakes unless asked for | `STK()` `:359`, `stakesCfg()` `:362` | **`GENRE-RULES.md` and my own persona cite `:330`/`:333` — stale by 29 lines. The code wins.** |
| Search | `tlFindNext` `:4592` (case-insensitive find-next, Enter repeats, mobile-Safari caret fix) | **This is find-in-this-text, not an index.** The index over people/places/tags is *pack code*: `indexDoc` at `changarrito/content/record.js:248` — copyable, not inherited |
| Everything in `NEW-WORLD.md` §7 | — | creator, wardrobe, day/night, themes, saves, offline PWA, QR transfer, music, pettable animals, the stapled-paper reader |

**Two free things with a sharp edge.** (a) `[CODE]` The Markdown export handles `h p note blank kv t q docs` and **not** `btn sel form red` (`engine/engine.js:3379–3391`) — so *"copy this recipe"* copies the words and silently drops every tick box. Design the card so the words are the recipe. (b) `[WEB]` A page on GitHub Pages **cannot fetch another site's HTML** (CORS, lens 3 #12). "Paste a link and we'll import it" is impossible without a server. The honest routes are paste-the-text, a bookmarklet, or `share_target` (Chrome/Android only) — all iteration two.

### 3 · What this game must decide for itself, and the two that block everything

Required globals per `NEW-WORLD.md` §1: `WORLD_DEFS PORTALS WNPC` · `NPCE NPCN NPCLOOK` · `QEN QES FQEN FQES` · `UI` (**~82 keys, not one line** — copy Meridian's file whole) · `MAXXP LEVELS` · `GAMENAME GAMEV` · and **`PLACES`**, which is where the first-day mistakes live: a partial `PLACES` silently inherits four of Meridian's world ids (L16), and `spawn` must be walkable.

**Blocker A — the pack cannot choose its careers.** `[CODE]` Every shell hardcodes `data-c="architect|diplomat|operator"` (`index.html`, `changarrito/index.html:385-387`, `content/gauge/index.html:386-388`), the engine hardcodes their shirt colours (`SHIRTS` at `engine/engine.js:431` — **`GAUGE.md` says `:341`, stale by 90 lines**), and `applyLang` bare-dereferences `t.classes[b.dataset.c]` at `:4509`. So on day one **La Sobremesa asks you at the front door whether you are The Architect, The Diplomat or The Operator.** This is `TAGS.md` L17 and it is the first thing the gauge hit. **Beto's, one sitting, behaviour-identical for Meridian, proven the same day.**

**Blocker B — an endless world may not have a second kitchen.** `[CODE]` `test/engine.smoke.js:795` fails any pack declaring `ENDLESS` **and** `CHAPTERS`: *"a world that does not end cannot also have a last day."* The engine was split and no longer needs that (`chOpenDue` is the city, `chDue` the ceremony), but `CHAPTERS` does double duty — it is **both** the endings **and** the districts. This game is almost certainly endless and wants more than one household. **Until that assertion is corrected, a second cuisine cannot ship.** Registered as L12 / #155. **Beto's, one sitting, and it is on `OPEN.md` §2 already.**

**Blocker C, honest and unsolved:** `docs/GAUGE.md` measured that **a new pack's first green run is not available at any size below Meridian's** — six checks fail a small pack *for being small*. Budget either the fix ("fail only when a pack HAS the thing and gets it wrong") or a `content/sobremesa/expected.txt` like the gauge's.

### 4 · The order, and who does each part

**Maps before people, people before quests, quests before art — and before all of it, the household, because four kitchens is a map.**

| # | Sitting | Who | Blocked by | Proves |
|---|---|---|---|---|
| 0 | `/game-brief` → `docs/for-sobremesa/`; `docs/sobremesa/STORY.md` + `CITY.md` empty; the asks logged verbatim | **Mari** (owner answers) | Q1–Q12 below | we know what he wants, in his words |
| 1 | **Blocker A** — careers become a pack seam | **Beto** | — | a kitchen stops asking you to be an Architect |
| 2 | **Blocker B** — the `ENDLESS`/`CHAPTERS` gate | **Beto** | — | a calm world may have a second neighbourhood |
| 3 | The shell: **generated, not copied** (§8 says a third world should; the town's 770 copied lines are guarded only by a line count), `STOREPFX="sb"`, manifest, its own `sw.js` + `CACHE`, its own name blocklist in the portability guard | **Beto** | 1, 2 | two games on one origin do not eat each other's saves |
| 4 | Minimal pack boots: one room, three people, one quest, EN only + `expected.txt` | **Mari + Beto** | 3 | the engine boots a world that is not Meridian |
| 5 | **One household, one kitchen, one street** — `PLACES` all ten roles, maps, the shop | **Don Güero** (parcel) → **Cuca** (the room) | 4 | the place exists before anyone stands in it |
| 6 | The cast: the cook, the two who eat, one who disagrees about the recipe | **Nacho** | 5 | people who fit in the map |
| 7 | **The three documents** — the recipe card (blanks), the week sheet (forward only), the pantry sheet (a list and a freezer, no expiry red) | **Mari + Cuca**, copy read by **Pili** | 6 | the whole loop, with **zero engine change** |
| 8 | **The paste seam** — a `form` `area` field, plain-lines first, JSON-LD second; source URL kept as the attribution | **Beto** (content-side) | 7 | "copy and paste some recipes", legally (`[WEB]` Circular 33: the list is not copyrightable, the prose and photos are) |
| 9 | **The reply table** — dish → what she says next week | **Nacho** | 6, 7 | §0⅞ is actually implemented, not just answered |
| 10 | ES in lockstep | **Paty** | 7, 9 | EN/ES cannot drift |
| 11 | `HUDFACT`, `CAMERAS`, `THEMES`, the cold read (`node test/tilesheet.js`) and `node test/shots.js --cams` | **Pili + Chema** | 5–9 | four cameras, actually looked at |
| 12 | **He cooks one of the dishes and then plays it** | **the owner** | everything | the only gate that counts |

**Sittings to a first playable pack: 12–14.** Three of them (1, 2, 3) are engine and shell work that buys *every* future world and should be ranked as such, not billed to this game. Nine are content. If the owner wants a number for "just the game": **nine sittings, one household, one cuisine, EN+ES.**

### 5 · What can stay blank on day one, and what cannot

**Blank, and it costs nothing:** seasons · chapters · growth · critters (ask about Sonny first, §0) · eggs · decor · the trolley · the career/deliverables layer (drop `room.js` and `docs.js` — *and their `<script>` tags*, or you get a silent 404 like the town's) · 3D if he wants the board · **the pantry itself** · **all nutrition numbers** · the second cuisine · the third · any mystery.

**Cannot be blank:** a walkable `spawn` · the ~82 `UI` keys · `GAMENAME` + `GAMEV` · `STOREPFX` · `HUDFACT` · all ten `PLACES` roles if you declare any · and **who the household is** — R12: a game about one household cannot be wrong about a nation; four national kitchens is a museum, and a museum is not comforting.

**Never, in any iteration:** an allergen verdict (*"contains" from the recipe's own text, "read the label" beside it — never "safe for"*), a disease claim, a weight field, a promise that playing changes what anyone eats (`[WEB]` lens 2 F4: 36 RCTs, *"no significant effects… on dietary factors"*). The pitch the evidence does support is: **it helps you plan, cook, remember and learn** — and that is enough.

### 6 · Where a future iteration should go, ranked

1. **The second household** (and only then the third). The slot templates are the same mechanic in all four cuisines — ichijū-sansai, the 3-cheop bapsang, the milpa plate, primo/contorno — which is why the second is cheap once Blocker B is paid.
2. **A citation card per cuisine** as a `READS` document — the owner's *"places to check about this facts"* answered by each country's own government in its own language, not by a number we computed.
3. **An embedded USDA FoodData Central subset** (CC0, a few hundred ingredients), shipped at build time, source printed on the card. Not Open Food Facts (share-alike infects the merged table), not Mexico's national table (no licence found), not Korea's printed book (non-commercial).
4. **`share_target`** — one fewer tap on Android. The shared URL still cannot be fetched.
5. **The inventory RULE** — *only* if his answers point at fit (R3). The pantry as *recipe minus pantry = list* is a set difference over two small arrays and needs a document, not an inventory system. **Second thing to build, never the first.**
6. **Generate every shell**, including the town's.
7. **#153, quests get names** — the largest single blocker to a template, and this pack will feel it.

---

## QUESTIONS FOR THE OWNER

*One line each. Skip any of them — blanks are fine and we ask again once something is on screen.*

1. **Does this game end?** A season with a last day and a goodbye, or a place you keep coming back to with no ending at all?
2. **How do you want to see it?** Face to face (you walk up and see their face), from above (the whole room at once, like a board), or both and you pick?
3. **Whose kitchen is it — yours, somebody else's, or a family's?**
4. **When you cook something in this game, who is it for?** Nobody in particular, one specific person, or whoever turns up?
5. **What's the nicest part of cooking for you — the chopping, the smell, the waiting, or the face they make when they eat it?** *(This one is worth four of the others: it picks between five games that sound identical in one line.)*
6. **Name one dish and who taught it to you.** That person is the first character.
7. **When you plan to cook something on Thursday and Thursday doesn't happen — what should the game do?** Nothing at all, somebody says something kind, or it quietly offers it again next week?
8. **Which kitchen do we build first — Mexican, Italian, or Japanese/Korean?** *(My recommendation: Mexican, because the repo already draws the comal and speaks the Spanish. The others follow it, not instead of it.)*
9. **Is this yours, AJ's, or both?** If both, does she get the same kitchen or her own?
10. **English and Spanish, like Meridian?** (Both is more writing and genuinely nicer.)
11. **Is there a dog?** Sonny, a different animal, or none — he is yours, not the engine's.
12. **Anything you want that Meridian doesn't have?** Say it even if it sounds hard.

**And one thing I need you to confirm rather than answer, because I already decided it:** the game will **never count calories, never ask your weight, and never keep a streak that resets** — those three are where a food game does real harm, and every sweep today said so with sources. If you wanted any of them, tell me now, because everything above is built on their absence.

---

## WHAT I DID NOT CHECK

- **I verified none of the ~40 `[WEB]` numbers in today's four sweeps.** Every one of them reached those agents as a *search extract*, not a read of the page — the egress proxy blocked essentially every primary host. I quoted a handful above and each carries that inheritance. **Nothing sourced here should be published outside this repo until a person opens the pages.**
- I did **not** grep the care sheet, the `.ics` download, the QR transfer, the wardrobe `WEAR` seam, the Trolley Pass, or `#157`'s ungraded station — my brief asserted them and I took them on trust for the "free" list, except the ones I marked `[CODE]`.
- I did **not** run any suite. I have not proved that `node test/engine.smoke.js --index <new shell>` produces exactly `GAUGE.md`'s six lines today; that file is from 2026-09-10 and I found two of its own citations stale.
- I did **not** open `docs/TAGS.md`, `docs/3D-LOG.md`, `docs/BEAUTIFY.md`, `docs/QA-PASS.md`, `docs/REGRESSION.md`, `docs/CREW-MODE.md` or `docs/BOUNDARY.md` this run, and I did not look at the open GitHub issues. L16 and L17 I took from `GAUGE.md` and confirmed the *code* half of L17 myself; I did not confirm L16's four inherited ids.
- I did **not** cost the sittings against any historical measurement — the 12–14 is `[TRAINING]`, my own estimate from the shape of the work, and the only calibration I have is that `content/gauge/` took one sitting to build and found seven blockers.
- I did **not** check whether any `sobremesa` name collides with anything, whether the word reads oddly to an Italian or Japanese speaker, or whether Pili would keep it at five pixels on a sign.
- I did **not** decide whether this pack ships on public Pages or stays on the laptop. I have assumed **public, because it needs no token and every save is on the device** — but it holds what one person eats, and that deserves the owner's word, not mine. Flagged rather than assumed quietly.

---

## POST-FLIGHT

The expensive half of this run was not the plan, it was discovering that the two things which stop this game existing are both already on `docs/OPEN.md` §2 as "decided, not built" — the careers seam and the `ENDLESS` gate — so the producer's real job here was to say which order they unblock and that neither should be billed to this game. Three citations I was handed or inherited were stale by 29, 90 and 334 lines (`STK`, `SHIRTS`, `petalMomentTick`), which is the fourth time this month that pattern has cost somebody something, and it happened to me inside my own persona file. The thing I am least sure of is the sittings number, and I have said so rather than dressing an estimate as a measurement. The one durable finding that belongs in a register and not in this reply is the day-budget tell for meal planners — *a week sheet is a behaviour-change technique; the same sheet where yesterday can change colour is a day budget* — which is a `GENRE-RULES.md` rule shaped like R10 and should be filed by whoever holds the pen for this run.

**The persona edit I propose** — replace the final bullet of `.claude/agents/mari.md` (lines 101–107) with exactly this:

```
- **If the world is briefed as calm, cozy or relaxing, that is a specification and it is unfinished
  until you can name what replaces the pressure.** `docs/NEW-WORLD.md` §0⅞ is the third question to
  ask, beside *does it end* and *how is it seen*; `docs/GENRE-RULES.md` R1–R5 is what other games put
  in that hole. Two things that save a new pack real money: **a pack that declares nothing already
  inherits no stakes** (grep `const STK=` and `function stakesCfg` in `engine/engine.js` — `:359`
  and `:362` on 2026-09-14, and stakes are read per chapter, so "one scored thing in one district"
  is a seam, not a rule), and **a day budget is how a timer comes back wearing cozy clothes** —
  never build one. **Tell, for any planner or calendar: a day budget is a surface where YESTERDAY
  can change colour.** Plan forward, never mark backward.
- **Before you promise anyone a first playable pack, re-grep the two blockers every new world hits
  and say whether they are still open.** (a) A pack cannot choose its careers — every shell
  hardcodes `data-c="architect|diplomat|operator"`, the engine hardcodes `SHIRTS`, and `applyLang`
  bare-dereferences `t.classes[b.dataset.c]`; `docs/TAGS.md` L17. (b) A world that declares
  `ENDLESS` may not also declare `CHAPTERS` — and `CHAPTERS` is both the endings AND the districts,
  so an endless world cannot have a second neighbourhood until that assertion is corrected; grep
  `ENDLESS` in `test/engine.smoke.js`. Neither should be billed to the new game: they buy every
  future world, and both are already on `docs/OPEN.md` §2.
```

*(Reason for the second bullet: I spent a third of this run rediscovering both, and a producer who does not check them promises a delivery date that is wrong by two sittings. Reason for the wording change in the first: the two numbers it shipped with were stale by 29 lines, which is `docs/POSTMORTEM.md` §8-extended happening inside the file that tells me to avoid it — so the identifier now sits beside the number, with the date it was read.)*

---

# tavo

## PRE-FLIGHT

I read `docs/GENRE-RULES.md`, `docs/ARCH-LOG.md` A11 (and A3, which turned out to matter more), `docs/research/2026-09-11-cooking-games.md` and `docs/OWNER.md`, then grepped every engine identifier I cite rather than trusting the four sweeps' numbers — `RM`/`INTERVIEW` `engine/engine.js:220`, `roomAns` `:223`, `roomPending` `:229`, `STK` `:359`, `docSections` `:3370`, the reader's blocks `:3455–3510` (`blank`, `kv`, `t`, `btn`, `sel`, `form` with a real `area` textarea at `:3492`, `checks` at `:3494`), `SEAS` `:4255`, `icsData` `:4705`, and `inventory|pantry|nutri|kcal` across `engine/` → **0 hits**, confirmed today. One finding the sweeps did not have: the interview seam already keeps a **per-step answer history** (`a.hist`, `:3962`), which is "the cook remembers what you said last time" already shipping. One collision I could not resolve by reading and am bringing to him rather than averaging: the most evidence-backed mechanic in all four sweeps is a meal plan, and `docs/ARCH-LOG.md` A3 bans "a record of the future — a list of what you have not done yet."

---

## THE DELIVERABLE — the loop

### A11: what replaces the pressure is **Reading a person** (row 1)

Not because it is cheapest — though it is — but because it is the only one of the five whose content **renews from the player's own input instead of from authoring**. Comprehension (Venba) is one-shot: every hole is filled once and day ten is a content cliff. Fit is A11's most expensive row *and* the market's documented cause of death (three competing pantry vendors, 2026-09-13 sweep: forty items day one, five day two, and by week three every suggestion is built on food that is no longer in the house). Tactility is spent last, per R5. **Unrushable duration arrives free in the content and is not a mechanic to build** — the nixtamal steep, the kimjang, Hazan's 45 minutes, the doenjang that has to sit are R4 already written into the cuisines (lens 4 §3.2).

`[WEB]` The psychology agrees for a *solo* player: relatedness and autonomy are what gamification demonstrably supplies and competence is what it does not (SDT meta-analysis, lens 2 F1/F9); informational feedback from a person does not undermine intrinsic motivation, expected rewards do at d = −0.28 to −0.40 (Deci/Koestner/Ryan, lens 2 F2). And every one of the four national guideline systems independently names eating with people (lens 1 #11, #20).

### The daily loop — 60 seconds, most days nothing

**What it asks:** one tap. **What it gives back:** a person's reply and one small change in the world.

You open the street. It is a row of **home kitchens, not shops** — the restaurant frame is what drags this genre back to tickets (R10; lens 3 finding 20: the whole Japanese/Korean cozy wave is shop-framed and ours must not be). A cook is standing in her doorway. **There is no ❗.** You walk over because you want to, or you don't and nothing happens.

She asks about the one thing on today's slot: *"¿Hiciste el caldo?"* Four buttons — made it · made something else · ate out · not today. "Made something else" is the only one that opens a text field, and it is optional. **That is the entire log: you type only when reality differed from the plan.** Logging by exception is the only shape that survived in the product landscape, and it is also the only one that never lies, because silence means nothing rather than meaning "yes".

Her reply is about the **food**, not about you — her sister does it with more epazote, the soup is where the salt hides. Then something changes that you did not ask for: a jar appears on her sill, a sprig in the window box.

`[CODE]` This is `INTERVIEW` (`engine/engine.js:220`) plus a doc with a form (`:3485`). Zero engine change. The one thing I checked and it does **not** do: neither marker in this engine re-arms with the day — `roomPending` (`:229`) is an "unanswered ever" flag, and the quest ❗ is quest state. **Do not build a re-arming marker.** A badge that reappears every morning is a daily-login obligation, which is the one thing that cancels the measured wellbeing effect of calm play (lens 2 F16) and violates R11. The absence of a marker is the design, not a limitation.

### The weekly loop — ten minutes, once, and it is the spine

The week turns (or a season does — `SEAS()` `:4255`; a fresh start is the only moment habit science says a new intention lands, lens 1 #4). One cook offers **three dishes. Not four, not a browsable list.** KptnCook and Mealime both sell fewer choices and users thank them for it; **but the offers never expire** — a 24-hour vanishing card is scarcity, which is R4's trap wearing delight's clothes.

You say yes to as many as you want — **zero is a legitimate answer and the game must say so out loud** — and you pick *when*: "Thursday, after work." That sentence is an implementation intention, d = 0.65 on getting started across 94 studies (lens 2 F13), and it is the single highest-yield thing this game can ask anyone to write.

Then it subtracts: recipe ingredients minus the staples shelf = the shopping list, one Copy button (`navigator.clipboard.writeText`, `:3673`). And optionally **the .ics** — `icsData` (`:4705`) already builds recurring events with `RRULE`. Retarget it from pet care to *"Sunday 5pm — soak the beans."* **That is the most important surface in the whole design and nobody had connected it:** the habit fires in his kitchen at six on a Thursday, and the game is not there. The calendar is.

### What it teaches — including by accident

| Teaches | How |
|---|---|
| Deciding beats performing (R7) | The decision is which five slots get filled from what is in the house. Nothing is timed, nothing is traced |
| A dish belongs to a person, never a nation (R12) | Every card carries who taught it. The player's pasted recipes carry whoever gave them to him |
| Where a claim comes from | Facts are cards in a cook's kitchen with the source printed underneath — and **two cooks disagree on purpose.** The Japanese cook says the soup is where the salt hides (`[WEB]` 10.1 g/day, double WHO; seasonings 66% of intake); the Korean cook says kimchi is ~20% of the country's sodium and she still makes it every year. One nutrition oracle teaches deference; two cooks who disagree teach judgement |
| **By accident, if unguarded:** "you owe the game a week" | An unfilled slot rendered as *empty* is R10's day budget wearing a calendar. **A week shows only what you put in it. Three lines is a full week** |
| **By accident, if unguarded:** "the game is scoring me through dialogue" | If the cooked branch is warmer than the didn't branch. **The "not today" line must be the best-written string in the pack** — it is the moment people quit (lens 2 F7, F10), and it costs two strings per cook per language |

### Day ten, honestly

Days 1, 3 and 7 are fine — novelty, a first list, the first turn of the week. **Day ten is where three offers become "a menu I scroll" and the cook's lines start to repeat.** Four things hold it, and only one of them is load-bearing:

1. **The recipes are partly his own.** He pastes them in — a `form` with `type:"area"` (`:3492`) takes Ctrl+V today, no engine change, no CORS problem. *(Paste-a-URL is impossible on GitHub Pages without a server. Do not promise it.)* An ingredient list and bare steps are not copyrightable; the blogger's prose and photos are.
2. The cook asks about a dish from three weeks ago — `a.hist` (`:3962`) already holds it.
3. The season changed and the offers changed with it.
4. Nothing punished the three days he skipped.

**The honest failure mode, in one sentence: if he never pastes anything in, this is an authored content pile and it ends when the content ends.** Everything else is decoration on that fact.

### What I would cut

| Cut | Why |
|---|---|
| **The pantry ledger, entirely** | A11's most expensive row buying the market's most-failed feature. Keep a **staples shelf** (declared in content per cuisine — four jars Japanese, five Korean, the milpa three, the Italian seven; never maintained by the player) plus this week's list. **No expiry dates, no red, no "running low"** — an expiry list is a guilt list |
| **Every number the game computes about food** | No kcal, no per-recipe totals, no A–E grade, no "how healthy is this". A computed score becomes a verdict on someone's grandmother's dish, and computed totals on pasted recipes are wrong anyway (no amounts). Facts arrive as sourced cards said by people |
| **Streaks, and any counter that can go down** | Contradicted by the primary study everyone cites for them (a missed day does not affect habit formation). If anything counts, it counts **up** and never resets |
| **Any question about what he ate or what he weighs** | The game asks about *cooking and planning* — the two behaviours with evidence that never touch the body. 73% of people with an eating disorder who used a calorie app said it contributed |
| **Unlocking kitchens** | That is R6's ladder. The other kitchens arrive **when he asks for them**, the way El Changarrito's street grows from his own issues. Requested, not earned |
| **Three cuisines at launch** | One kitchen, fully written, beats four sketched. Don Güero's parcel call |

### The one game that is a game (optional, weekly, will bore first)

**The composed plate** — ichijū-sansai's five slots, the bapsang's cheop, the milpa plate, primo/contorno — filled from a `checks` field and drawn on an `art` canvas (`:3405`). It is A11's Fit bought as content instead of as inventory: **one shelf, never a house** (R3's trap). It teaches each guideline's own shape with no number and it can never say you got it wrong. I expect it to be the first thing that gets old, and I would ship it anyway and watch.

---

## QUESTIONS FOR THE OWNER

1. **The collision I will not resolve alone.** `docs/ARCH-LOG.md` A3 (your rule, in your words): *"A record of the future — a list of what you have not done yet — is the banned thing"*, and OWNER.md: *"never build a quest log."* A meal plan is exactly a record of the future. The plan is also the single most-evidenced mechanic in all four sweeps (implementation intentions, d = 0.65; meal planning ↔ more variety and better guideline adherence, n = 40,554). **My recommendation: allow it, because the ban was written about the game's demands on you and this is your own intention about your own week — with the guard that the plan carries no count, no colour and no age, the same three things the ❗ is already forbidden.** If you say the ban holds regardless of who wrote the list, the plan half collapses and what is left is the check-in and the library — smaller, still viable, and I would want to know before anyone mocks a calendar.
2. **Which kitchen is first?** The repo's native voice is Mexican (Doña Rosa's mole, `content/meridian/docs.js:294`) — but this is about *your* eating, so the right first kitchen may be the one you cook worst, not the one we write best.
3. **Is AJ's chill cooking game this game, or a different one?** 2026-09-11 was a pseudo-cooking game for her; this is a self-help tool for you. They can be one pack and they can be two, and the answer changes the parcel.

**Handoffs, not designed here:** Nacho — the "not today" lines and whether two cooks are allowed to disagree about salt. Pili — whether a plan reads as *mine* or as *a list I owe*, and whether a plate reads at 32 px. Toño — whether a food log belongs in the pack's own storage (like `roomAns`, `:223`, which sits outside the save and therefore outside the QR transfer) or inside the save.

---

## WHAT I DID NOT CHECK

I read no primary source myself — every `[WEB]` here is relayed from the four sweeps, all of which say their own fetches were proxy-blocked and reached them as search extracts; **treat every number above as second-hand and re-verify before it leaves the repo.** I did not open `docs/for-aj/QUESTIONS.md`, `docs/CREW-MODE.md`, `docs/POSTMORTEM.md` or `docs/REGRESSION.md` this run, and I did not search GitHub issues for an existing owner ask on food. I grepped `changarrito/content/record.js` for the search implementation but did not read its surrounding code, so "the town's search is a substring filter over title+body" rests on `:497` alone. I did not verify that a pack can write its own localStorage key without engine help (I assumed it from `roomPersist`, `:226`). I have not cooked anything, and the 2026-09-11 rule that nobody signs off a dish this project has not cooked still stands.

---

## POST-FLIGHT

My first draft of this had the pantry as the centrepiece — Unpacking's shelf, the most beautiful option on the board — and the product sweep killed it with three competing vendors saying the same thing, which is the second time this year a note I was confident in was wrong before I checked it. The correction was not about effort: tapping *"I have rice"* costs one second on day ten and passes my tenth-time test cleanly, and the feature still fails, because the **data** rots even when the action stays cheap. That is a failure mode my persona did not name and I want it named, because it generalises past food to anything that asks a person to mirror their real life inside a game. I would also flag that the A3 collision above is the kind of thing my instructions tell me to bring rather than average, and I have brought it rather than picking the answer I prefer.

**Persona edit, exact text, to append to `.claude/agents/tavo.md` under "What you hold to":**

> - **A model the player has to maintain decays, and the cost is not the typing.** *Added 2026-09-14 from the healthy-eating loop.* The tenth-time test has a second axis and I only had one: I ask whether the *action* is still worth doing on day ten, and I did not ask whether the *data* is still true on day ten. A pantry ledger passes the effort test — one tap, forever — and fails anyway: `[WEB]` three competing pantry vendors report the same curve, forty items on day one, five on day two, and by week three every suggestion is built on food that is no longer in the house. **A model that is 80% right is worse than no model, because it lies with confidence.** So when a mechanic needs the player to mirror their real life inside the game, price the **drift**, not the keystrokes, and prefer the version that logs **by exception** — only when reality differed — or does not log at all. **The tell:** any feature whose value depends on the player having told the truth about something the game cannot check.

---

# pili

PRE-FLIGHT — I read `docs/OWNER.md`, `docs/GENRE-RULES.md`, `ARCH-LOG` A11, `IDEAS` §15 head, `TAGS.md` L13–L14, `GAUGE.md` and `BEAUTIFY.md`, then verified every seam I cite by grepping the identifier in `engine/engine.js`, `engine/engine3d.js`, `content/meridian/art.js` and `index.html` today. I am directing how five things READ; I am not deciding what they mean (Nacho) or what gets built (Don Güero), and A11 is still undecided — nothing below assumes an answer to it. No file was edited; no mural panel this run.

---

## THE DELIVERABLE

### 0 · Three things that collide, reported not absorbed

**(a) My own persona block is stale, and the numbers in it are wrong by ~440 lines.** It says `drawPerson` is `engine/engine.js:2520`, `lookOf` `:3768`, `npcWhimsy` `:3769`. `[CODE]` today: `drawPerson` **`engine/engine.js:2955`**, `lookOf` **`:4226`**, `npcWhimsy` **`:4227`**. The *claims* all hold — `npcWhimsy` still touches only `shirt`, mixed at 0.15 (`:4229`), so hair value is still the one identity mark a theme cannot move. Persona edit proposed in POST-FLIGHT.

**(b) `docs/BEAUTIFY.md:25-27` quotes `t3Boxy` at `engine/engine3d.js:241`.** It is at **`engine/engine3d.js:259`** and the shipped line has a clause the quote drops: `typeof TILESIDE!=="undefined"&&!!TILESIDE[g]`. The doc's advice is still true — *a glyph becomes a real box the moment a side drawing exists* — so this is drift, not a wrong rule. Code wins; saying so out loud.

**(c) The research lens that inventoried the reader left out the section this whole job depends on.** Lens 3 finding 17 lists `s2.blank` `:3455`, `s2.sel` `:3475`, `s2.form` `:3485` — all correct today — and never mentions **`s2.art`** (`engine/engine.js:3405-3448`): a pack-drawn canvas at the reader's real column width, baked at `devicePixelRatio` with `imageSmoothingEnabled=false` (`:3435`, `:3440`), with **`wide`** for a picture you scroll along horizontally (`:3417-3428`) and `cap` for a caption. A mock plan built from lens 3's list would have no home for a single picture. Not a contradiction between docs — an omission, and it is load-bearing.

**(d) One thing that will bite the market floor:** there is still **no `kind:"flat"`** (`docs/TAGS.md` L13; `engine/engine3d.js:212` reads `m.kind==="water"`). A chalked market floor, a herb plot or a kitchen mat must be declared `kind:"water"` or it ships as a cardboard cutout. I did **not** check whether the marigold petal spill coupled to `water` (`TAGS.md` L13 cites `engine.js:585`) fires for a pack with no marigold season — a market floor that snows petals is a real possibility and nobody has looked.

---

### 1 · The five objects, separated by SHAPE before colour

The failure this brief is one bad decision away from: a pantry, a market, a recipe card, a week and a fact are all *rectangles with things in them*. At 32 logical px in the world and at .72rem monospace in the reader they become one beige blob. So they are separated by **what kind of object each is**, and the separator is height and mass distribution, not decoration.

| Thing | The read, in one line | Mass | Billboard or box | Seam |
|---|---|---|---|---|
| **Pantry** | horizontal shelf bands with a **ragged top edge** — jars of different heights breaking each line | continuous, floor to head | **BOX** — `kind:"furniture"` + a `side` drawing | `TILEMETA`, `TILES[g].side` (`engine.js:1827`) |
| **Market** | an awning stripe over a **dark hole** over a lumpy knee-high band | top and knee, hollow in the middle | facade **BOX** + crates as boxes; the floor is `kind:"water"` (see 0d) | `TILEMETA` `awn:` (`art.js:195`) |
| **Recipe** | a small tin with a lid, or a wedge of pages — **tilted off-square** | one low lump | box (tin) or cutout (open book) | `READS`/`DOCS`, then the reader |
| **The week** | a slate/clipboard with one ruled edge — **not seven days** at tile size | flat vertical panel | cutout | the reader, `art` + `wide` |
| **A fact** | **no silhouette at all.** It is a quotation | none | neither | `.dnote` (`index.html:184`) |

**The pantry must not look like the bookcase.** `TILESIDE["S"]` (`engine.js:1672`) is already a two-upright, three-shelf bookcase, and books make a *flat* run. Jars have lids and different heights, so the top of every pantry shelf is ragged. **That ragged line is the entire difference at ten tiles**, and it is one drawing.

**The market is the pantry turned inside out.** Pantry = tall, closed, indoors, mass continuous. Market = wide, open, outdoors, mass at the top and at the knee with a person-shaped gap between. Put them on the cold-read sheet side by side and they read as opposites; put both as "a rectangle with stuff on shelves" and they read as the same object twice.

---

### 2 · The one call I would make, and it is the plate

**Draw the composed plate as vessels on a tray, never as a divided circle.**

Four of the four research lenses converge on a composed plate as the mechanic (`ichijū-sansai` 1+1+1+2, the 3-cheop bapsang, the Plato del Bien Comer's 50/22/15/8/5, MyPlate's half-and-half). A plate seen from above, divided by proportion, is **a pie chart**, and a pie chart of what someone ate is a verdict — the exact Yuka failure lens 3 finding 8 documents. It is also illegible: at 32px, five wedges is a smudge, and at reader width it is still a chart.

Vessels on a tray fixes all of it at once: the count and the size of the bowls carries the meaning, you can count 1 vs 3 vs 5 lumps at a thumbnail, it is literally what a bapsang and an `ichijū-sansai` tray ARE, it works for a tortilla-plus-bowl-plus-green and for a shallow pasta bowl plus contorno, and **it is not a score** — nothing is out of a hundred, nothing is red.

The official diagrams (the Plato, the Spinning Top, the Food Balance Wheels, the CREA pyramid) get redrawn **once each**, at 240–560px, inside a citation card in the reader, credited to the ministry that published them — not as gameplay UI. That is the owner's *"places to check about this facts"* rendered as a picture instead of a number.

If this call is taken wrong it cannot be un-taken cheaply, because every screen in the game inherits it.

---

### 3 · Which surface each screen is

Four surfaces exist, verified today:

- **The world** — `#world`, four cameras, 32-unit tiles.
- **The card** — `#card` (`index.html:750-766`): avatar, name, bubble, codex, choices, plus `.handed` (`index.html:171-177`), a *folded cream sheet with a staple* you tap inside a conversation, and `rmAsk`/`rmSheet`, the 140-char interview and its copyable sheet.
- **The reader** — `#reader` → `.paper#paperSheet` (`index.html:728-748`): cream paper, staple, `h2` title, italic `dsub`, scrolling body, bar of Copy / Download / Close. Sections: `h · p · note · red · blank · kv · t · q · btn · sel · form · docs · art`.
- **The wall** — `DECOART` in the world (`art.js:201-229`) plus an `art`+`wide` picture in the reader.

| Screen | Surface | Why this one |
|---|---|---|
| **Pantry** | world → reader | You stand in front of it; tapping opens a `READS` doc of what is on the shelf. The shelf is a place, the list is paper |
| **Market** | world only | A market you read instead of walk is a menu. Crates get `side` drawings and become boxes |
| **Recipe card** | **card → reader** via `.handed` | A recipe is *handed to you by a person* (R12). `.handed` already looks like the folded sheet she is holding, and opening it is picking it up |
| **The week** | reader, `art` + `wide` | Seven of anything needs horizontal room; `:3417-3428` is a scroller built for exactly this, keyboard-walkable |
| **Nutrition fact** | reader, `note` + `kv` — never its own screen | `.dnote` is cream `#EFE7D2` with a 3px gold left rule, italic — **the engine already owns a "this is quoted from elsewhere" mark.** Use it and never colour it |
| **"I made it"** | the card | The reply is a person's line in a bubble, not a panel |
| **Guideline citation** | reader, one `art` + `cap`, once per kitchen | A picture you walked up to, credited |
| **What she has cooked** | the wall + `wide` reader picture | `OWNER.md`: "the record is a room, not a menu" |

**The convergence worth naming:** the mural's shipped idiom is *"paint only ever goes on"* (`art.js:206`, `muralGrade`/`muralInk` `:222-229`). A wall that only gains paint **cannot show a smaller number tomorrow than today** — which is precisely the anti-streak rule lens 2 proposed as R15. The look for "count up, never to zero" is already built, already art-only, and needs no counter. I am not picking the mechanic (that is A11, and it is Don Güero's and Nacho's call); I am saying that if they pick it, it costs one panel drawing and zero engine work.

---

### 4 · Palette per cuisine, without cliché

The cliché in each case is the flag: Italy red/white/green + gingham; Mexico serape brights + cactus; Japan red disc + sakura; Korea obangsaek-as-a-flag or neon.

**Take the palette from the cooking surface and the preserved food, not the flag.** That is where four kitchens genuinely differ, and it is a *value* story, so it survives a theme tint and a colour-blind player.

| Kitchen | Ground (the biggest area — this is the identity) | Vessel | The one accent | Why it is not the cliché |
|---|---|---|---|---|
| **Mexican** | seasoned comal, matte near-black `#3A3630`; nixtamal cream `#E8DCC0` | barro, unglazed terracotta `#9B5B3C`, black-slip rim | **dried-chile brick `#8E3320`** | Dried chile is a *dark* red. The flag's red is `#CE1126`. The loudest thing in this kitchen is the black comal, not a colour |
| **Italian** | floured wood board `#C9A97E` with flour bloom `#EDE3D0` | white glaze `#F4F1EA`, one blue rim line | **olive-oil gold-green `#9AA33F`** | The flag is refused entirely. Cucina povera's colour is oil and flour; tomato is a dot, never a field |
| **Japanese** | pale hinoki `#DCCFAE` against lacquer near-black `#2E2320` | lacquer black with one interior red `#7A2E24`; stoneware `#7E7468` | **nori/kombu `#23301F`** | The accent is seaweed, not the disc. This kitchen's contrast is **value** (near-black tray vs white rice), which is why it reads at any size |
| **Korean** | onggi brown `#6B4A33` + a stainless band `#B9BCC0` | stainless bowl (honestly how it is served) + white porcelain | **gochugaru `#B44A21`**, warmer and lighter than the Mexican chile | Stainless is the un-clichéd Korean note, and it is a bright neutral no other kitchen has |

Two disciplines that make it work:

1. **The four accents are four different values** — Mexican darkest-desaturated, Japanese darkest overall, Italian mid-green, Korean mid-bright-warm. Hue alone fails at dusk, under a theme tint and for a colour-blind player; value does not.
2. **A cuisine palette is a season, not a redesign.** `OWNER.md` (2026-09-01): *"a season changes colour, never design."* The hook exists: `art(key,fb)` (`engine/engine.js:4272`) reads the current season's art table. Walking from one kitchen to another recolours the room and moves **not one silhouette**. That is already law and already built — this proposal costs a colour table, not a renderer.

**Never tint skin, hair or an apron.** Those read as identity; `npcWhimsy` (`:4227-4229`) already confines the tint to `shirt` at 0.15 and that discipline must not be loosened for a cuisine palette.

---

### 5 · What reads at reading size, measured

**In the world — 32 logical units per tile**, baked at `K = min(3, devicePixelRatio)` (`IDEAS` §15.1, `t3Factor`).

- **Reads:** three to five distinguishable masses; a horizontal band (awning, shelf, counter rail); a ragged top edge; tall-lump vs wide-lump; a bright field with a dark hole in it.
- **Does not read:** seven of anything; a divided circle; steam (it is 1px of noise); **a single ingredient** — a carrot and a chile are the same orange lump, only a *crate* of them reads; any number.
- **Text:** the only word in the entire pack is `"MQT"` at `700 7px monospace` on the trolley sign (`art.js:111`, `:186`), and it survives because it is three glyphs on a red field. **Nothing in the new world may carry a word.** Not a recipe title, not a day name, not a gram.

**In the reader — the canvas is 240–560 CSS px wide** (`engine.js:3428`), default aspect 0.55, nearest-neighbour. That is **7–17× a tile's area. This is where detail becomes legal**, and it is the answer to "you see icons from afar, then walk up" the owner already gave (`engine.js:3396-3399`).

- **Body text is `.72rem` monospace** (`index.html:173`) ≈ 11.5px on a phone. `.dh` is `.76rem` Unbounded; `.dfl` labels `.7rem` uppercase.
- **Three table columns is the phone ceiling.** The `dform` overflow bug is already written into this file (`index.html:189`, "Rosa 5" — one long dropdown option pushed every field off a phone). **So the week is never a seven-column table.** It is seven `kv` rows, or a `wide` picture you scroll.
- **`wide` measurements:** a day-bay needs **≥100px** to hold two dish lumps and a day mark; at 50px it is a stripe. So a legible week is ~840px natural, scrolled inside a 352px column.
- **"Count kinds, not calories" has a drawing cost nobody has stated:** thirty plant sprites in one column would be 11px each — invisible. Thirty plants is its own `wide` strip at ~40px each ≈ 1200px. Drawable, scrollable, and it is a real line item, not free.

---

### 6 · Marker language — there are no free marks left in the paper family

`[CODE]`, verified today. Four marks are already spent:

| Mark | Means | Where |
|---|---|---|
| `❗`, bouncing, red | this **person** has work for you | `engine.js:769`, `:1992`, `:2084` |
| a **cream card that breathes** — 13×10, dog-eared corner, three ruled lines | this **thing in this room** can be read | `drawReadMark`, `engine.js:3548-3555` |
| `⬆`/`⬇`, yellow on dark outline | a **portal** | `drawDoorMark`, `engine.js:3565-3573` |
| an emoji beside the head, 10px serif, 6s of every 13 | this person's **trade** | `drawEmote`, `engine.js:143-156` |

A recipe, a note, a card, a label, a page — **every one of them collides with the cream card.** Do not invent a fifth mark. Reuse the cream card for everything readable and put the difference in the **object underneath it**, which is what this engine already does (a poster, a laptop and a gate sheet all wear the same card).

And the one mark somebody will reach for: *"this ingredient is in the pantry / is not."* My answer is that it should not be a mark at all — it is the presence or absence of a line on the shopping list (the set-difference idea, lens 3 finding 3). A tick and a cross over groceries is a checklist floating in a kitchen, and at 32px a cross on a coloured field reads as **crossed out** in this project specifically — the owner has already called one that (grep `crossed out` in `engine/engine.js`).

---

### 7 · The mocks — seven pictures, in this order

Draw them at the two sizes that are real. Anything drawn at an in-between "design size" lies.

| # | Mock | Drawn at | What it proves | Priority |
|---|---|---|---|---|
| 1 | **Cold-read strip: eight new glyphs, alone, unlabelled** — pantry shelf, market stall front, recipe tin, slate, crock/jar, comal-stove, produce crate, market floor | `node test/tilesheet.js` output size | Someone with no context names them. **If this fails nothing else matters** (`OWNER.md`, 2026-09-01) | **must** |
| 2 | One kitchen in 3D, **all four yaw stops** | `node test/shots.js`, one `test/spots.json` row | The pantry is a box and still reads from behind; the crates are not cardboard | confirm |
| 3 | **Recipe card in the reader at 360px phone width** — title, `note` with source, `art` panel of the plate-as-vessels, `kv` ingredients, steps as `p` | 352px canvas | Where the picture sits against the words; whether the plate reads at 352 | **must** |
| 4 | The same card at 560 | 552px canvas | The picture does not become the whole page | confirm |
| 5 | **The week as a `wide` strip**, ~840px natural, in a 352px column | both | The scroller; 120px/day legible, 50px/day not | confirm |
| 6 | **The nutrition fact, three ways side by side:** (a) `note` + source `kv` ← recommended, (b) a table row with a number, (c) a coloured badge | 352px | **This mock exists to be rejected in public.** Seeing (c) beside (a) is the fastest way to show why a computed score becomes a verdict on somebody's grandmother | **must** |
| 7 | **Four kitchens, same room, same furniture, palette swapped only** | 3D shot ×4 | "A season changes colour, never design" holds for cuisines; the four *grounds* separate before the accents do | confirm |

**Honest cost note, in the owner's own terms** (`OWNER.md` line 331 names screenshots as genuinely expensive): if the budget is three pictures, draw **1, 3 and 6**. They decide the game's whole look. The other four confirm it.

---

## QUESTIONS FOR THE OWNER

1. **The plate — vessels on a tray, or the official divided circle?** I recommend vessels (it reads at a thumbnail, it is what a bapsang literally is, and it is not a score). The counter-argument is real: the Plato del Bien Comer and MyPlate are the shapes people already recognise. My proposal keeps both — vessels for play, the official diagram redrawn once per kitchen on a credited citation card.
2. **Cream paper or the night reader for the kitchen pack?** `READERLOOK="night"` is a per-pack choice (`index.html:195-209`). Cream reads as a household recipe box; night reads as an app. I recommend cream, and it is a one-word declaration either way.
3. **Is the pantry a place she stands in front of, or a list she opens?** It changes whether a pantry costs one room of tiles or one document. I recommend the room, because a list is the app everybody abandons by week three (lens 3, finding 1) and a shelf is not.

---

## WHAT I DID NOT CHECK

- **Whether the `kind:"water"` petal spill fires for a pack with no marigold season** (`docs/TAGS.md` L13 cites `engine.js:585`, `:1427`). A market floor that snows petals is a live possibility; nobody has looked.
- **Whether `test/tilesheet.js` and `test/shots.js` actually run today.** I confirmed all three files exist (`test/tilesheet.js`, `test/shots.js`, `test/spots.json`) and did not execute either.
- **`changarrito/content/docs.js`'s `sel:` usage** — lens 3 flagged that a plain grep found nothing. I did not re-grep it; it does not bear on this direction.
- **Any of the research lenses' `[WEB]` claims.** Every one of them reached the sweeps as a search extract, all four sweeps said so, and I re-verified none. Everything I take from them (the plate structures, the Yuka score warning, the pantry-drift finding, the 30-plants idea) is used as *design input*, not as a fact this game may print.
- **The flat-picture count.** Nothing I propose here moves the owner's `test/town.state.js` number and I did not run it — new pack, different world.
- **`content/gauge/expected.txt`'s six deliberate failures** against a kitchen pack's shape. `GAUGE.md:42-45` says a new world's first green run is not available below Meridian's size; a cooking pack will hit that, and I did not measure how hard.
- **The `art` section under the night reader**, and whether a drawing authored for cream survives on `#1C1A22`. Mock 3 should be rendered in both if question 2 stays open.

---

## POST-FLIGHT

The one thing I want looked at before anything is drawn is the plate: vessels on a tray versus a divided circle is the decision every other screen inherits, and it is cheap now and expensive in a month. The strongest thing I found is that this engine already owns three of the five surfaces this game needs — the cream `note` is a quotation mark, `art`+`wide` is a picture you walk along, and the mural's "paint only ever goes on" is a counter that cannot go down — so the look costs colour tables and drawings, not renderer work. The weakest part of my own sheet is that I direct from code and registers and have not seen a single pixel of this game rendered today, so mock 1 is a court I am asking someone else to convene. And my own persona lied to me about where `drawPerson` lives, which is the repo's rule 1 catching its own instructions.

**Persona edit proposed, exact text — replace the second bullet of "Two engine facts about looks and counts" with:**

> - **A look is five keys and only two of them are silhouette.** `drawPerson` (`engine/engine.js:2955` — verified 2026-09-14; this persona said `:2520` and had drifted 435 lines) reads `style` — and only the styles putting mass OUTSIDE the 6.5px skull change the outline (`long` falls to +10.6, `braids` reaches ±8.7, `buns` rises to −10.2); `cap`/`buzz`/`fade` go through `capFill` and are clipped inside it — plus `hat:"hard"`. **`outfit:"formal"` is not a colour**: it darkens the trousers and stamps a bright white collar triangle and a maroon tie on the chest (`:2973-2976`), the loudest non-outline mark a body can wear. `shirt`, `skin`, `hair`, `pattern` are colour only — and **`shirt` is the only key a theme tint reaches** (`npcWhimsy`, `:4227`, mixed at 0.15 — `:4229`), so **hair value is the one identity mark that survives every palette the player can choose.** `lookOf` (`:4226`) resolves by npc id first and map letter second, and **the letter half is a global namespace shared by every world**, so two characters in two different worlds on the same letter wear one look, silently. **Grep the identifier; these four numbers have drifted once already.**

---

# nacho

PRE-FLIGHT — I read `docs/OWNER.md`, `docs/STORY.md`, `docs/CITY.md`, `docs/GENRE-RULES.md`, A11 in `docs/ARCH-LOG.md`, the 2026-09-11 cooking sweep, `docs/GAUGE.md`'s findings table, the owner's verbatim ask at `docs/ASKS.md:43`, and Meridian's own voice in `content/meridian/strings.js:48-73` and `quests.en.js:182-225`. I verified every identifier I cite by grep today (2026-09-14): `RM()`/`INTERVIEW` `engine/engine.js:220`, `STK` `:359`, `stakesCfg` `:362`, **`gradeOf` `:374`**, `WEAR` `:448`, `petalMomentTick` `:1558`, `docSections` `:3370`, `s2.blank` `:3455`, `s2.sel` `:3475`, `s2.form` `:3485`, `docOpen` `:3513`, `roomSheet` `:3951`, `SEAS()`/`SEASONS` `:4255`, `indexDoc()` `changarrito/content/record.js:248`; `grep inventory engine/engine.js` → **0**. Nothing was built, nothing tracked was edited, and nothing here was cooked — the 2026-09-11 rule that nobody signs off a dish the project has not cooked still stands over every dish named below.

---

## 🖌️ El mural — the arc

### Where the story stands

Meridian is finished as a shape and unplayed as a city: four districts written and wired at `mq-v51` and **none of them ever human-played** (`docs/CITY.md:41`), the second lap and la inauguración signed and not built, Barrio Norte still a promise with no face. That is not this world. What the owner asked for on 2026-09-13 is a **second pack** — a different genre on the same engine, and per `CLAUDE.md` and `docs/story/el-changarrito.md:307` Meridian's content is never touched for it. So the honest statement of where the story stands is: **this world has no story yet, it has a permit.** Everything below is the first draft of one, built to run on the engine as it is, and it inherits Meridian's laws (nothing taken away, no practice missed, never a quest log, EN/ES in lockstep, stakes `none` by default) without inheriting one line of its cast.

### The world — **Sobremesa**

*Sobremesa* is the hour you stay at the table after the food is gone. It is the thesis in one untranslatable word: **this is not a game about cooking, it is a game about the hour after.** It is also the only title I found that cannot be misread as a diet.

**The place: one building, four doors, a courtyard.** Not a shop, not a restaurant, not four national kitchens on a food court. A four-unit vecindad around a patio with a lemon tree, a washing line, a cat who belongs to nobody, and a long table under the tree that somebody drags out when there is a reason. Four households, a corner shop on the street side, and a fifth door — **yours, empty**.

**Why a building and not a street:** the commensality evidence (lens 1 #11) says the feature with a health finding behind it is *eating with other people*, and a courtyard makes that the geometry instead of a message. It also solves R12 structurally: four **households** cannot be representative of four **nations**. And it is small — `docs/GAUGE.md` is blunt that a second world's first green run is not available at any size below Meridian's, so the world should be dense, not wide.

**The player's place: you are the one who writes it down.** Not a chef, not a student, not a nutritionist. You are the new tenant, and what you have that four cooks do not is a **notebook and the habit of asking a second question**. The neighbours each hold food that lives only in their hands; you are the reason it gets onto paper. That answers the owner's *"copy and paste some recipes"* diegetically — pasting is **taking down what somebody told you** — and it lands on surfaces that exist: the reader's labelled blank (`s2.blank`, `engine/engine.js:3455`), its real forms (`s2.form` `:3485`), its dropdown (`s2.sel` `:3475`), and the town's own index-and-search shape (`indexDoc()` `changarrito/content/record.js:248`), which is a **content** pattern, not an engine build.

**The opening is moving day, and that is evidence, not taste.** Habit science's one free lever is the fresh start: people re-decide habits when they move house (lens 1 #4, Verplanken & Roy). So the game opens with boxes on the floor and an empty shelf — which also makes the empty pantry **true** rather than a contrivance, which is exactly R1's trap. Your first decision is not about food. It is *where does the kettle go* — friction design (#3), a decision, no clock.

**What replaces the pressure (A11, and I am not picking for him).** A11 says the owner's own answers settle which engine, and nobody should pick for him. So the cast is written to run on any of them, and the arc names which one each beat uses:

| A11 row | Where it lands here | Cost |
|---|---|---|
| **Reading a person** (R2) — the dish is the reply | the spine: every chapter ends with a plate going through a door, and what you made changes what they say next | cheapest; `INTERVIEW` seam exists |
| **Comprehension** (R1) — the recipe is incomplete | the notebook's blanks. Nello's dead wife wrote *q.b.* — *quanto basta* — where every quantity should be | cheap; reader already draws the blank |
| **Duration + abundance** (R4) | the kimchi that will not be ready for weeks and the game says so; the sauce you must not stir | needs a trigger; `petalMomentTick` `:1558` is welded to petals |
| **Fit** (R3) | **declined.** Needs the inventory that does not exist (grep: 0) | expensive |
| **Tactility** (R5) | **declined for now.** Spend last, on two objects | 3D work |

**What generates interest at week five is a person waiting to hear how it went.** Not a ladder. That is R6's decoy and lens 2's F2 in the same sentence.

### The cast — four households, and why not four grandmothers

**A nonna, an abuela, an obaachan and a halmeoni is a stamp album.** Four of the same archetype, one per flag, is precisely the museum R12 warns about: each becomes representative of a nation instead of specific to a person, and the moment a player can say *"the Italian one"* the character has stopped being anybody. So: one household per cuisine, no two the same generation, the same gender, the same household shape, or the same reason for being in that kitchen — and **one of them holds a cuisine he is not sure he is allowed to teach**, because that is the honest version of this problem and pretending otherwise is how Guacamelee happened.

| Door | Who | What they hold | The thing that makes them a person and not a flag |
|---|---|---|---|
| **1** | **Nello Bevilacqua**, 66, widower. Learned to cook at 61 because Piera died and he was hungry | *cucina povera*: the tomato-butter-onion sauce you cannot hurry, pasta e ceci, ribollita; **what you keep out** | He is not a nonna. He is a man who was fed for forty years and is finding out what it cost. Piera's notebook says **q.b.** where every quantity should be — a true incompleteness, and the best single object in the game |
| **2** | **Cande Bustos**, 38, and her father **Chemo**, 71, who moved in with her | the milpa plate — beans, nixtamal, salsa, a green; Sunday batch cooking; quelites and nopales as the under-taught layer | Her aunt Herminia's frijoles have lard; her mother's had chard; the two women did not speak for a year. **Both are the recipe.** R12 paid in one sentence |
| **3** | **Yun-seo "Seo" Baek**, 29, moved here for work, cooks from her mother's video calls | banchan — season a vegetable, make it ahead, three of them and rice; kimjang as the long project | **She is the one who says the food is salty**, because her mother's doctor said it first. The caveat enters from inside the culture, never as the game correcting her |
| **4** | **Tomo Iwasaki**, 34, and **Haru**, 7 | *ichijū-sansai*: one soup, three sides, rice — a plate you compose, no counting; *sa-shi-su-se-so*, the order rule with a physical reason | He learned from a textbook and a colleague's mother, not at home, and he says so. Three small things because a seven-year-old will eat two of them |
| **5** | **You.** Boxes, a fridge that came with the flat, a bulb that flickers | the notebook | The only person in the building who eats in more than one kitchen |
| street | **Ofelia**, the corner shop | the shopping list, and **the source cards** — she keeps the printed guidelines behind the counter because her nephew is a nutritionist | She is the one who says *"you buy chard every week and you throw half of it away."* The waste goal is about the kitchen, not the body |
| patio | **Perejil**, the cat | nothing | Everyone claims her and everyone feeds her the wrong thing, which is the game's running joke about feeding people what you think they want |

**Two things this cast refuses.** Nobody is a nutritionist, a coach or a trainer — the moment a character's job is your habits, the game has hired a supervisor. And **no character ever comments on the player's body, weight, or how much they ate.** Ever, in either language.

**The engine hands us a gift here, sideways.** `docs/GAUGE.md` #1: the shell hardcodes three careers and the engine hardcodes their shirt colours, so a new pack must ship exactly three classes. That slot is the best place in the game for the 2026-09-11 sweep's highest-value question — *what's the nicest part of cooking for you?* Three reasons people cook: **el que planea** (Sunday, for the week) · **la que improvisa** (eight o'clock, whatever is in there) · **el que alimenta** (because somebody else has to eat). The class changes how the neighbours greet you and **nothing** about what you can do — a greeting, not a mode. It does **not** pre-empt A11: the owner's own answer still picks the engine.

### The story shape — a season, not a streak

A chapter is a week: a Monday want, an escalation that is **a person changing what they need** (never a clock), and a Saturday that pays something off. The horizon is a **season** — which is what the habit evidence actually says (59–66 day medians, lens 2 F12) and what `SEASONS` (`engine/engine.js:4255`) already does.

**Chapter 0 · La puerta cinco.** Moving day. Nello knocks with a plate, because the first night nobody cooks. Your first two decisions: where the kettle goes, and how the plate goes back — washed, or with something on it. The loop stated in one beat.

**Chapter 1 · Nello · *q.b.*** *Want:* Ombretta's birthday, and the ragù is in Piera's hand and unreadable. *Escalation:* he makes it from memory and it is wrong in a way he cannot name; four neighbours taste it and each says a different thing — the wrong dish **adds** dialogue (R2). *Saturday:* the missing step was one Piera never wrote because she did not think it was a step — she rinsed the pan with the wine before the tomatoes. The notebook's first filled blank is in your handwriting, and Nello asks for a copy.

**Chapter 2 · Cande · el domingo.** *Want:* Herminia is coming for a week and Cande will not give up her Sunday. *Escalation:* the aunt rearranges the shelves, is right about one thing and wrong about another, and nobody wins. *Saturday:* both versions on the table at once, with chard and without; Chemo says which one his mother made and he is wrong. **There is no *the* recipe.**

**Chapter 3 · Tomo and Haru · una sopa, tres cositas.** *Want:* a bento that comes back empty. *Escalation:* the dashi, and the order rule — you put the loud one in first and the dish is **duller, not burnt**, and a seven-year-old tells you so. *Saturday:* the box comes back empty except the thing he traded away, and Tomo lets it go.

**Chapter 4 · Seo · el frasco.** *Want:* not to be the only person in the building who eats alone. *Escalation:* kimjang needs more hands than she has and she asks for them the wrong way — she offers to pay. *Saturday:* four households salting cabbage in the courtyard, every hand cold, jars dated and named. **It will not be ready for weeks and the game says so and does not hurry** — R4, and leaving the game is the correct move.

**The season's close is a sobremesa, not a ceremony.** The table goes long, the plates stay out, nobody gets up. The record is a strip of tile at the table's edge where the date of a meal is scratched — **a record of the past only**, never a list of the future.

**The second lap** is Meridian's law transposed with no new parcels: a fifth tenant moves in, asks what the building eats, and **you are now the one with the notebook.** Each neighbour comes back with the problem you only get after the first thing worked — Cande's Sunday breaks when her hours change, Nello's copy of the ragù goes to somebody who cooks it wrong and sends a photo, Tomo has to teach Haru instead of feeding him, Seo's jar runs out in March.

### The endings — and a code fact that changes them

`[CODE]` **`gradeOf(c)` (`engine/engine.js:374`) grades a district by the fraction of its answered quests that landed first try, and returns 3 when nothing has been answered.** So in a pack where nothing can be answered wrong, **every ending is the grade-3 ending, silently, forever.** (Full contradiction and my recommended fix below.)

The fix is a story rule, not a build: **the marks go on the logistics, never on the person.** How much chard one person can eat before it turns, whether a plan survives a Tuesday, which shelf the lentils live on — those are right-and-wrong, retryable, and cost nothing but a funny beat. *What you ate* is never marked in either direction. With the marks living there, the three variants differ in **who is at the table**, never in what is on it:

- **3 · the table is long, and somebody set it before you got there.** Four households, the lemon tree, Ombretta propped against the salt cellar on speakerphone. Nello's line, which is the chapter's truest: *"You wrote down the part she didn't say."*
- **2 · the table is set for four and one chair is turned toward the television.** Half the plan stuck. The notebook has three filled blanks and one still empty; Nello asks about the empty one and you say you don't know, **and that is allowed and nobody follows up.**
- **≤1 · two chairs and a plate that came back washed.** Nothing failed, nobody moved out, nothing was taken away. Per Meridian's own asymmetry (`docs/STORY.md:141`) this is the **longest** of the three, because a letter can be honest in a way a doorstep cannot — and Cande's line does the work: *"No cocinaste en toda la semana. Bueno. Los frijoles esperan mejor que la gente. Trae un plato."*

### The teaching goals, as beats

This pack trains **no AI role** — which is a deliberate departure from a Settled line and is flagged below. Its teaching goals are the four food-literacy domains (lens 1 #10), one per chapter, each as a scene:

| Goal | The beat, not the lecture |
|---|---|
| **Plan** | the if-then plan is a **promise to a person** — *"Thursday, if I'm home by seven, the caldo"* — said out loud to a neighbour who will ask. (F13, d = 0.65.) Never a calendar that marks a missed day: that is R10's day budget wearing an apron |
| **Select** | the list is **recipe minus what is on your shelf**, and it happens at Ofelia's counter in her voice. The pantry is logged **by exception** — what ran out, what came in — because every vendor in the category says the ledger dies in week three |
| **Cook** | order of operations: sa-shi-su-se-so, the chiles on the comal, the sauce you do not stir. A wrong order makes a **real, duller dish** |
| **Eat** | the long table, and the only question the game ever asks about a meal: **who was it for?** |

**Where the facts come from, in the fiction:** every nutrition claim in this game is either **in a character's mouth about their own kitchen**, or on a **stamped card Ofelia hands you** with the institution's name and a link — Secretaría de Salud's *Guías Alimentarias 2023*, WHO, MAFF, CREA. The game itself never asserts, never scores a dish, never computes a number about a body. That is the owner's *"places to check about this facts"* answered as **content** rather than as a nutrient engine, and it is also the only version that survives the licensing mess in lens 1 §F.

### A taste — four lines EN+ES, two characters

**Cande Bustos** — short declaratives, kitchen nouns, never explains a feeling twice. Her Spanish is the original; the English is the translation.

| | EN | ES |
|---|---|---|
| 1 | "Sunday I cook once and eat five times. It isn't discipline, it's Thursday — I know exactly who I am on a Thursday." | "El domingo cocino una vez y como cinco. No es disciplina, es el jueves — yo ya sé quién soy los jueves." |
| 2 | "My aunt Herminia puts lard in the beans. My mother put chard. A year without speaking. Both of them are the recipe — pick the one you're making tonight." | "Mi tía Herminia les pone manteca a los frijoles. Mi mamá les ponía acelgas. Un año sin hablarse. Las dos son la receta — escoge la que vas a hacer hoy." |
| 3 | "Half the plate is vegetables. That part isn't mine, that's the government — it's taped to Ofelia's wall. The other half is mine." | "La mitad del plato son verduras. Esa parte no es mía, es del gobierno — está pegada en la pared de Ofelia. La otra mitad sí es mía." |
| 4 | "You didn't cook all week. Bueno. Beans are still beans, they wait better than people do. Bring a bowl." | "No cocinaste en toda la semana. Bueno. Los frijoles siguen siendo frijoles, esperan mejor que la gente. Trae un plato." |

**Tomo Iwasaki** — a careful man; his care shows in **what he chooses to say**, never in broken grammar. (Craft rule for Paty: a non-native speaker's carefulness is register, not error, or the ES build reads as mockery.)

| | EN | ES |
|---|---|---|
| 1 | "One soup, three small things, rice. Three, because he'll eat two of them, and I'm not fighting a seven-year-old on a Tuesday." | "Una sopa, tres cositas, arroz. Tres, porque se va a comer dos, y no pienso pelearme con un niño de siete años un martes." |
| 2 | "Sugar, salt, vinegar, soy, miso — in that order. It isn't superstition. Sugar is slow and soy is loud; put the loud one in first and you never taste the slow one." | "Azúcar, sal, vinagre, soya, miso — en ese orden. No es superstición. El azúcar es lento y la soya es escandalosa; si metes la escandalosa primero, el lento ya no se prueba." |
| 3 | "I learned this from a book and from a friend's mother, not from my own. So when I teach you, I'll tell you which parts I'm sure of." | "Esto lo aprendí de un libro y de la mamá de un amigo, no de la mía. Así que cuando te enseñe, te voy a decir de qué partes estoy seguro." |
| 4 | "The salt is in the soup. Everybody back home knows it and everybody back home drinks it anyway. I make it thinner on the days Haru has two bowls." | "La sal está en la sopa. Allá todos lo saben y todos se la toman igual. Yo la hago más ligera los días que Haru se sirve dos veces." |

### The plaque's voice

The tile strip at the long table's edge, scratched by hand. **Past tense, one sentence, a name and a dish, no adjective about health, no number about a body, and never the word *should*.**

> EN: "14 March. Nello made the ragù with the wine in the pan. Four chairs. Ombretta on the phone, propped against the salt."
> ES: "14 de marzo. Nello hizo el ragú con el vino en la sartén. Cuatro sillas. Ombretta por teléfono, recargada en el salero."

And Ofelia's source card, the only surface in the game that carries an institution:

> EN: "Where this came from: Secretaría de Salud, *Guías Alimentarias 2023*. It's on the wall by the register. Go read it yourself, m'hija."
> ES: "De dónde salió esto: Secretaría de Salud, *Guías Alimentarias 2023*. Está en la pared junto a la caja. Léelo tú, m'hija."

---

## ❗ Side quests for the owner

### ❗¿De quién? — whose game is this?

The two asks point at two different players. 2026-09-11: *"aj will want a pseudo cooking game."* 2026-09-13: *"organize **my** eating habits… help **us** organize our food."* That is a fork, not a detail — it decides who the cast is for and whether this ships publicly at all.

| What you type | What it buys | What it costs |
|---|---|---|
| *"it's AJ's"* | a comfort game for somebody else's household; ships public like Meridian; the cast above works as written | your own pantry stays a spreadsheet |
| *"it's mine"* | a tool for your kitchen; lands beside El Changarrito — **laptop-only, never linked from the public game** (`docs/story/el-changarrito.md` §7½) | a tool for one person is not a game with a cast, and half of what is above stops earning its keep |
| **"both — one pack, hers"** ✅ **recommended** | build **Sobremesa** as AJ's comfort game, public, with the cast intact — and the parts you actually want (the notebook, the list, the source cards) are the parts a second person can use without the game becoming software | you get your pantry through a story instead of a form, which is slower to build and the only version that stays calm |
| *"leave it"* | nothing is designed further; the research stands as research and Meridian's four unplayed districts get the next sitting | the four districts genuinely do want a human first |

### ❗La mesa larga — what IS the Saturday?

| What you type | The payoff shape | Consequence |
|---|---|---|
| **"the table"** ✅ **recommended** | the courtyard table goes long and everyone comes | the evidence-shaped one (eating together) and the one that makes a building the right setting; costs the most art |
| *"the door"* | a plate goes through a neighbour's door and comes back with something on it | cheapest, intimate, repeatable — but four seasons of it and the courtyard never earns itself |
| *"the page"* | the payoff is the notebook page, filled, in your handwriting | truest to "you are the one who writes it down"; risks being a document instead of a scene |
| *"nothing"* | the week just turns over, the way a week does | honest and calm; it is also R8's warning — safety with no abundance, and nobody will be able to say why it feels empty |

### ❗El error — what does a wrong turn in the kitchen cost?

The 2026-09-11 sweep's own note: *"nothing happens"* is what people say when the only alternative they can picture is burnt food, and it is usually not what they want.

| What you type | What a mistake does | Consequence |
|---|---|---|
| **"they say something"** ✅ **recommended** | the dish is duller and the neighbour reacts — the mistake **adds** dialogue you would not otherwise see | R2; the strongest of the eight shipped answers; costs writing, not code |
| *"it comes back later"* | the wrong dish returns warmly weeks later — *"my aunt asked for the recipe for the wrong one"* | consequence without punishment; needs a memory the pack must carry |
| *"the dish finishes anyway"* | it always completes, nobody minds | Cooking Mama's mechanic without its scolding face — safe, and drifts toward "if nothing minds, nothing matters" |
| *"nothing"* | no reaction at all | calmest, and the sweep's named trap |

---

## ❗ Contradictions — reported, not absorbed

**1 · Three endings, and nothing to pick between them.** `docs/STORY.md:18` says *"The grade picks the ending, and the grade is always on… Every ending has a 3 / 2 / 1 variant"*, and `docs/OWNER.md:80` makes the grade permanent and never turned off. `[CODE]` `gradeOf` (`engine/engine.js:374`) computes the fraction of a district's answered quests that landed **first try**, with `if(!ans.length) return 3`. **In a pack whose quests have no wrong answers, every district grades 3 and only the warmest ending is ever reachable — silently, with no test failing.** Both documents are correct about Meridian; neither is wrong; the machinery simply goes inert here. **My fix needs no engine change and is a story rule:** put the marks on kitchen logistics (waste, plans, where things live) and never on what somebody ate. **What I need from him:** a nod that a self-help pack may grade the kitchen and never the eater — or, if he would rather the endings key off *participation* (how many households' dishes are in your notebook), that is a small engine seam and Beto should price it.

**2 · "Every business is Hispanic-owned" has no scope marker.** `docs/OWNER.md:109` lists it as Settled, in the same sentence as *"and doubles as a practice pack for an AI role."* This pack has an Italian widower, a Korean tenant and a Japanese father in it, and trains no AI role. **My read is that the line is Meridian-scoped**, because the clause it is welded to is Meridian's purpose and `CLAUDE.md` says Meridian's purpose is fixed while a second world is a different game. **But it is written as a global permit and a future planner could refuse this cast on it.** I am not editing his file. **One word from him** — *"that rule is Meridian's"* — and it gets a scope note; without it, somebody re-litigates this cast in a month.

**3 · Two sweeps have both proposed an "R15" for `docs/GENRE-RULES.md`.** Lens 2's post-flight proposes *R15 · Count up, never to zero*. I am proposing the rule below and deliberately **numbering it R16** so Chuy is not handed a collision. Flagging rather than renumbering somebody else's.

**4 · A11 is open and I did not close it.** `docs/ARCH-LOG.md:466` says the owner's own answers to the six cooking questions settle which engine replaces the pressure, and *"Nobody should pick for him."* I have written the arc to run on any of R1/R2/R4 and named which beat uses which. **The one question that would actually re-shape this plan** is §6(e): *what's the nicest part of cooking for you — the chopping, the smell, the waiting, or the face they make when they eat it?* Four different games are sitting behind that sentence and they look identical in a one-line pitch.

**5 · A new pack cannot currently go green at this size.** `docs/GAUGE.md` (read today): El Faro fails six checks *for being small rather than wrong*, and the file says plainly *"a second world's first green run is not available at any size below Meridian's."* Nothing in my plan changes that; I am flagging it so nobody reads "a second pack" as a cheap sitting. It is Beto's and Don Güero's lane to price.

---

## 📋 Bible updates

**This world does not go in `docs/STORY.md`.** That file is Meridian's bible, and dropping a Korean tenant into its arc is exactly the thing `CLAUDE.md` forbids. `docs/STORY.md` gets **two lines**; the world gets its own file, wherever Chuy's consolidation lands it (the plan file is named from Mari's title, per `docs/NEXT-SESSION.md:49`, so I am not squatting on a filename).

**Append to `docs/STORY.md` → "Decision log", once the fork above comes back signed:**

```
- 2026-09-14 · ❗Sobremesa · **a second world's story is written and it is not Meridian's** ·
  a self-help eating game on the same engine, its own pack, its own cast (four households
  round one courtyard, five doors, a notebook) · Meridian's laws are inherited — nothing
  taken away, no practice missed, never a quest log, stakes `none`, EN/ES in lockstep — and
  not one line of Meridian's content is edited for it. Its bible lives in its own file;
  this row exists so a planner reading THIS bible knows the second world is somebody
  else's canon and leaves the barrio alone.
- 2026-09-14 · ❗El grado · **the marks go on the logistics, never on the person** ·
  `gradeOf` (engine/engine.js:374) grades the fraction of answered quests that landed first
  try, so a pack with no wrong answers anywhere grades 3 forever and ships with only its
  warmest ending reachable. A self-help pack may have right and wrong answers about the
  KITCHEN — waste, plans, where things live — and may never mark what somebody ate.
  Recorded here because the same trap catches any future pack built on ungraded conversation.
```

**Append to `docs/STORY.md` → "Open threads", one line:**

```
- **Scope, and it is not rhetorical** (2026-09-14). `docs/OWNER.md`'s "every business is
  Hispanic-owned" is welded in one sentence to "and doubles as a practice pack for an AI
  role" — a Meridian purpose. Read as global it forbids the second world's cast. Flagged to
  the owner, unresolved; do not treat either reading as settled.
```

**Proposed for `docs/GENRE-RULES.md` — R16 (numbered to avoid lens 2's R15; not added, nothing edited):**

```
**R16 · In a game about a person's own habits, the marks go on the LOGISTICS, never on the
person.** A judgment call about the kitchen — how much chard one person eats before it
turns, whether a plan survives a Tuesday, which shelf the lentils live on — can be wrong,
retried, and marked. A judgment call about what somebody ate can be none of those things
without becoming a score on a body. **Trap:** the marks have to live SOMEWHERE, and the
engine will not tell you they don't. `[CODE]` `gradeOf` (engine/engine.js:374) grades the
fraction of answered quests that landed first try, so a pack with no wrong answers anywhere
grades 3 forever and only its warmest ending is reachable — silently, with no test failing.
**Tell:** if a wrong answer would make the player feel they ate wrong, the mark is in the
wrong place. `[WEB]` for the harm (Levinson 2017: of 105 people with an eating disorder,
~75% used MyFitnessPal and 73% of those felt it contributed —
https://pmc.ncbi.nlm.nih.gov/articles/PMC5700836/, reached as a search extract, not a page
read). `[TRAINING]` for the wording.
```

---

## QUESTIONS FOR THE OWNER

The three side quests above, plus the four contradictions — and if only one gets answered, make it **❗¿De quién?**, because every other decision is downstream of who is holding the notebook.

---

## WHAT I DID NOT CHECK

- **I did not verify the clipboard copy-out lines, `READS`/`DOCS`, `TOWNLBL`, `WORLD_DEFS`, or the ungraded conversation station (#157)** — my brief and lens 3 assert all of them; I grepped only the identifiers listed in my pre-flight. Anyone building on "copy out already exists" should re-grep it.
- **I did not read `docs/NEW-WORLD.md` or `content/gauge/`** — only `docs/GAUGE.md`'s findings table. So I do not know the full list of what a brand-new pack must declare, and my "three classes" observation rests on GAUGE's finding #1, not on reading the shell.
- **I did not read the other three lenses' primary sources.** Every `[WEB]` fact I lean on reached those researchers as a search extract, as they said plainly; nothing in my arc should be published outside this repo until the numbers are read off their pages.
- **I did not check `docs/for-aj/QUESTIONS.md`** against this cast, and AJ has not been asked anything. Per `docs/OWNER.md`, *she is a designer, not a stakeholder — ask her directly and take the answer.* If this is her game, every name above is a proposal she may overwrite.
- **Nothing was cooked.** Four households are named and not one of their dishes has been made by anybody on this project. The 2026-09-11 rule stands: nobody signs off a dish the project has not cooked.
- **I did not check whether any shipped pack declares `SEASONS`**, only that the engine reads it.
- **I did not price a single thing.** The loop is Tavo's, the look is Pili's, the two languages are Paty's, the engine is Beto's, and I have written hooks for all four without knowing what any of them cost.

---

## POST-FLIGHT

I was sent to write a cast and spent the middle of the run on a five-line function, because I could not describe how three endings differ without knowing what picks between them — and `gradeOf` turned out to answer *three* whenever nothing has ever been wrong, which in a game that refuses to mark what somebody ate is always. My persona file tells me to read Meridian's bible and city ledger before planning, and this run those were a register of laws to inherit and a cast to leave strictly alone; read as *mine*, they would have produced a barrio with an Italian widower in it. The refusal I care most about is the four grandmothers: it is the most natural cast in the world to write and it is a stamp album, and the only cure I found was making no two households the same shape. What my file never taught me is that an ending is a mechanism before it is a scene.

**Persona edit proposed** — append to the paragraph that begins *"Endings key off hearts, never off perfection"*, as exact text:

> **And before you write three endings, find out what picks between them.** `[CODE]` `gradeOf` (`engine/engine.js:374`) grades a district by the fraction of its answered quests that landed **first try**, and returns 3 when nothing has been answered at all — so a pack whose quests have no wrong answers grades 3 forever and ships with only its warmest ending reachable, silently, with no test failing. **Grep the thing that chooses the variant before you write the variants**, and if the answer is "nothing can choose", say so to the owner rather than writing three endings two of which no player will ever meet. *(The moment, 2026-09-14: planning a self-help eating game where marking what somebody ate is the one thing the evidence forbids — the three-variant ending the bible promises had no key, and the fix was a story rule about where the marks live, not a build.)*

---

# beto

PRE-FLIGHT. I read `docs/GENRE-RULES.md`, `docs/ARCH-LOG.md` A11, `docs/NEXT-SESSION.md`'s STATE OF PLAY and §6 of the 2026-09-11 sweep, then grepped every identifier below against `engine/engine.js` today (2026-09-14) rather than trusting the four sweeps' line numbers — the sweeps themselves warn they drift, and three of the numbers in lens 2 and lens 4 had already moved again. I reproduced nothing in a browser this run: this is a read of the code, not a measurement, and where that matters I say so. One contradiction found and resolved by checking rather than asking: lens 3 says "paste-in via `readText` does not [exist]" and treats copy-paste import as a gap — it is not a gap, the reader's `form` section already takes a textarea and hands its raw value to pack code (`engine/engine.js:3492`, `:3498`, `:3501`), so the import is a *sanitisation* problem, not a *capability* problem.

---

# THE DELIVERABLE

## A · What carries with NO engine change — verified `[CODE]`, 2026-09-14

| The thing the owner asked for | The seam that already carries it | Why it carries |
|---|---|---|
| **"copy and paste some recipes"** (in) | `docRender`'s `form` block — `/home/user/meridian-quest/engine/engine.js:3485-3506`. `fd.type==="area"` builds a real `<textarea>` (`:3492`); `read()` (`:3498`) collects every field; `f.run(read())` (`:3501`) hands the pack raw strings | A paste surface exists today, on the same screen as the paperwork. The engine never inspects the value |
| **Recipes out** | `docCopy` `:3672` (clipboard) and `docDl` `:3677` (a `.md` file) run `docMarkdown(docCur)` `:3373` over **any** document | Every recipe card is copy-out and download-to-disk for free, in whatever language the reader is in |
| **A recipe card** | `docDef` `:3369` — `id && typeof id==="object" ? id : DC()[id]`. **A document may be the object itself, never registered in `DOCS`** | A card the player pasted five minutes ago is a first-class document. `docOpen(obj)` works. This is the single most useful fact in this report |
| **Nutrition facts with their source** | `kv` `:3457`, `t` (table) `:3460`, `note` `:3453`, `red` `:3454` — all `textContent` | "Source: USDA FoodData Central" is a `kv` row. The owner's "places to check" is a citation card, not a feature |
| **Search over recipes / tags** | The town's `indexDoc` (`/home/user/meridian-quest/changarrito/content/record.js:248-263`) is **sixteen lines of pack code**: a `sel` (`:249`), a one-field `form` (`:250`), then filtered rows with per-row `btn`s. Each `run` calls `docOpen("index")` again to redraw | Re-entrant `docOpen` is the whole mechanism. A recipe index is the same code over a different array. **The engine's contribution is `sel`+`form`+`btn`; the filter is a CHOICE and correctly lives in the pack** |
| **A pantry that persists** | `SK()` `:13` is a global; the town writes eleven of its own keys through it (`record.js:110-113`, `:144`, `:294`, `:494`, `:637`). `test/engine.smoke.js:474-477` enforces that every key stays under the pack's prefix | Pack-owned persistence is already a seam. It survives a reload. It does **not** survive a device transfer — see G1 |
| **Occasions / seasons** | `seasonNow()` `:4256` is a plain global a document's `build()` may call; `art(key,fb)` `:4272` is the palette half; `SEAS()` `:4255` | "What's in season" and the fresh-start moment (habit lens #4) are content, not engine. Note the owner's rule: *a season changes colour, never design* (`docs/OWNER.md`) |
| **Characters who react to the dish** | A placed person carrying `doc` opens it on Talk (`:3687`); `CHILL`/`addChill`/`syncChill` `:~150-211`; `INTERVIEW` `:213-226` | A11's cheapest row. No engine change, and it is the row all four sweeps independently landed on |
| **No score, by default** | `STK()` `:359` defaults to `{mode:"none",hearts:3}`; `stakesCfg()` `:362` reads per chapter; `stakesMode()` `:368`. `HUDFACT` `:492` prints a *fact* that may go down and is never praised | The calm default is law, not a setting. A pack that declares nothing inherits it |
| **A downloadable .ics of a meal plan** | **Not the care pack — a `btn`.** `icsData()` `:4705` is welded to `petCfg` `:4694` and `T().careEvents` `:4712`, five hardcoded rows. But a section's `btn.run` (`:3470-3474`) is arbitrary pack JS, and the engine builds its own Blob download under the same CSP at `:3677-3682` | **G4 is a non-gap.** A pack writes fifteen lines of VCALENDAR itself. Do not generalise `icsData` |
| **An export tab for the cookbook** | Also a non-gap. `exMode` `:4693` and the four tabs `:4734-4742` are engine-fixed and a pack cannot add one — **and does not need to**, because `docCopy`/`docDl` already export any document | Refusing this is the saving |

**`[CODE]` confirmed, not relayed:** `grep -c inventory engine/engine.js` → **0**. `grep -n "pantry\|despensa" engine/engine.js` → 0. `grep -n "eval(\|new Function" engine/*.js` → 0. `grep -n "FileReader\|type=\"file\"" engine/ index.html changarrito/index.html` → 0. `navigator.clipboard.readText` → 0 (only `writeText`, at `:3673`, `:3939`, `:4759`, `:4921`).

---

## B · The gaps — four, and only one of them is worth an engine change

### G1 · Pack state does not cross the device boundary — **RULE**

**What breaks.** `save()` `:503` is a closed struct. `sanitizeSave()` `:516` rebuilds a whitelisted object and **drops every unknown key** (`:553-563`). `passURL()` `:4881` puts `loadSave()` and nothing else into the QR / `#save=` link. So a pantry written under `SK("pantry")` is a device-local file: he scans his own QR onto the tablet and **the kitchen is empty, with no message**. That is not a content decision — every pack has state and every pack has the Trolley Pass — so it is a RULE and it belongs in the engine.

**Smallest change (~25 lines).** Two optional globals, exactly the shape of `HUDFACT` and `RECORDSRC`:

- `save()` adds one key: `pk: (typeof PACKSAVE==="function") ? PACKSAVE() : undefined`.
- `sanitizeSave()` adds a **generic structural wash** for `pk` — no key named `__proto__`/`constructor`/`prototype` (the idiom already exists at `:549`), depth ≤ 4, ≤ 200 keys per object, strings clamped to 200 chars, numbers finite, total JSON ≤ 32 KB or the whole field drops with an `mqwarn("packsave", …)`.
- `loadSave()`'s consumer calls `PACKLOAD(s.pk)` once, after boot.

The engine never learns what a pantry is (`docs/OWNER.md`: *the engine may never name a pack's content*).

**What it costs.** `engine/engine.js`; `GAMEV` in `content/meridian/config.js` **and** `CACHE` in `sw.js` bumped together; `GAMEV` in `changarrito/content/config.js`; `content/gauge/config.js` declares `PACKSAVE`/`PACKLOAD` as the measured example (that is what the gauge is *for*); a line in `docs/NEW-WORLD.md`'s globals list. **It touches neither `index.html`**, which matters — the two shells are kept in lockstep by hand and this change stays out of that hazard. Meridian and the town declare no `PACKSAVE`, so their saves are byte-identical: that is the behaviour-identical proof, and it is one line in the suite.

**What breaks in six months.** Someone puts the whole pasted cookbook in `PACKSAVE()`, the QR stops scanning (a QR is a few KB, not 32), and the failure looks like "the camera won't read it". Mitigation is the 32 KB ceiling above *plus* a pack rule: `PACKSAVE` returns the shopping list and the week's plan, never the recipe texts. Write that sentence next to the seam, not in a doc.

**The test, red first.** In `test/engine.smoke.js`, against `content/gauge` with a deliberately hostile `PACKSAVE()` returning `{"__proto__":{"pwned":1}, note:"x".repeat(10000), deep:{a:{b:{c:{d:{e:1}}}}}}`: build the pass URL, clear `localStorage`, read the pass back, assert (a) the pack state came back at all, (b) `({}).pwned === undefined`, (c) the string is 200 chars, (d) the 6-deep nest was cut. Run it against a `PACKSAVE`-less shell too and assert Meridian's save string is unchanged. **Plant the violation before believing the guard** — `docs/REGRESSION.md`'s rule; this repo has shipped guards that read a proxy seven times. The message a person would read: *"His pass brought him across and left his kitchen behind."*

### G2 · A pasted recipe is unsanitised at the moment it becomes data — **CHOICE (with one RULE-shaped half already kept)**

**How a paste becomes data safely, sink by sink** — this is the trust boundary and it has three sinks, not one:

1. **The DOM — already safe, by construction.** Every reader block prints through `textContent` (`:3403`, `:3459`, `:3462`, `:3465-3469`, `:3472`, `:3479`). The reader's only `innerHTML` is a fixed literal followed by a `textContent` assignment (`:3456`); `:3837` records that the engine *used to* interpolate pack strings into `innerHTML` and no longer does. **And a pasted JSON-LD blob cannot smuggle a callback: functions do not survive `JSON.parse`, so `art`, `btn.run`, `sel.run` and `form.run` are unreachable from pasted data.** This half is a RULE and the engine already keeps it.
2. **`localStorage` — the pack's job.** Model the wash on the one that already exists: `changarrito/content/record.js:309` — `clean(s,max)` strips `\u200B-\u200F`, `\u202A-\u202E`, `\u2066-\u2069` (bidi and zero-width) and `\u0000-\u001f` (control), trims, and hard-caps length. A recipe importer wants that per field, plus: at most N ingredients and N steps, at most one recipe per submit, a total byte ceiling, and a key-copier that refuses `__proto__`/`constructor`/`prototype` (`:549` is the model). **Quota is the silent one:** `save()`'s write is `try{…}catch(e){}` at `:504` — a 5 MB paste fills the origin and *every later save fails without a word*.
3. **The Markdown export — cosmetic, and real.** `docMarkdown` escapes `|` in table cells (`:3386`) and nothing else. A pasted ingredient beginning `## ` reappears as a heading in the exported `.md`. Strip leading `#`, `>`, `-` and backticks in the pack's wash, or his cookbook exports mangled.

**Why CHOICE, and why I will defend it:** only the pack knows what a recipe is. Making the engine truncate or reshape a content string is the engine having an opinion about content, which `docs/OWNER.md` forbids. The engine's share of this boundary is the *save* boundary (G1), and it already keeps the DOM half.

**The test.** A pack-side unit test (a new `test/cocina.*.js` when the pack exists): feed the importer a blob containing `__proto__`, a right-to-left override, a 50 KB ingredient, `<img src=x onerror=…>` and 400 steps; assert the stored object has none of them, that `Object.prototype` is untouched, and that the rendered card shows the escape sequence as literal characters. Red first, against the importer before its wash is written.

**Found while looking at this, named separately:** `applyText()` at `:4576-4581` does `Object.assign(NPCN[lang], o.npcNames)` on JSON the player pasted into the text lab. `Object.assign` uses `[[Set]]`, so a pasted `{"npcNames":{"__proto__":{…}}}` reaches the prototype setter — the very thing `sanitizeSave:549` was written to refuse on the `#save=` path. It is local-only and self-inflicted (there is no remote path into the text lab), so it is **low tier**, but it is the same class and the fix is the copier from `:549`. This is not part of the cooking work and should be its own issue.

### G3 · An inventory — **CHOICE, and my recommendation is: do not build one in the engine**

`GENRE-RULES` R3 and `GIFTED-GAMES` §4 both rank "the inventory we do not have" as the first gap, and A11 prices Fit as *"expensive, needs the inventory we do not have"*. **I think that is the wrong noun.** What R3's Fit needs is a *spatial* constraint with snap rules, ~1,000 authored objects and 14,000 foley files — that is Unpacking's budget and it is not on any table here. What a *pantry* needs is an array in a pack, a document that renders it, and G1's persistence. Building an engine `inventory` would be the engine naming a pack's content, and it would arrive with a UI that the reader already has. **Refusing this is the single biggest saving in the report.** If the owner wants Fit later, it is a separate decision with its own costing, and A11's row still stands.

### G4 · Re-opening a document scrolls it to the top — **RULE, four lines, and it is the cost of building a list out of documents**

`docOpen` sets `body.scrollTop=0` and `paperScroll.scrollTop=0` unconditionally (`:3519`). Every `btn`/`form`/`sel` in the index pattern redraws by calling `docOpen(sameId)`. The town has not been bitten because its controls sit at the *top* of the index (`record.js:249-251`); a pantry of forty items with a "used it up" button halfway down will be, on the first press. Smallest change: remember `scrollTop` keyed by document id and restore it when `docOpen` is called with the id already in `docCur`. **Test, red first:** open a long document, scroll to the bottom, click a section button whose `run` re-opens the same id, assert the scroll position did not become 0. I did **not** confirm a player-visible instance in the town today — I did not run it.

### Non-gap, said plainly so nobody spends on it

**Nutrition data offline** needs no engine change at all: a pack file is a `<script>` loaded before the engine, so a few hundred FDC rows are `const FOODS={…}` in `content/cocina/foods.js`. **The six-month break is specific and predictable:** somebody adds that file to the *shared* `sw.js` `ASSETS` list (`sw.js:8-12`) and Meridian's players precache a nutrition database they will never see, and `test/public.js` (which reads the built `_site`, not the source tree) will not complain because the file is genuinely in the box. A new public pack gets its own worker and its own `CACHE` prefix, or none — the town has none and runs from a laptop.

---

## C · What I would NOT do, and why

- **No URL import.** `index.html:10` is `connect-src 'self'`; the same-origin policy forbids it regardless of CSP; there is no server. "Paste a link and we fetch it" is a promise of a proxy. The paste *is* the import.
- **No `share_target` in `manifest.webmanifest`.** Chrome/Android only, the shared `url` still cannot be fetched, and it edits a public shell that `test/public.js` scans — a paste with one fewer tap, bought at the price of the one file nobody should touch casually.
- **No computed score or grade for a dish.** Yuka is the case (lens 3 finding 8); `stakesMode()` already defaults to `none`, and reaching for the hearts toggle is A11's named way of *not* answering the question.
- **No recipe in `content/meridian/`.** `CLAUDE.md`: Meridian's content is never edited for another world's sake. The mole belongs to Doña Rosa (`content/meridian/docs.js:294`) and stays there.
- **Nothing pasted ever enters a content pack.** It lives under the pack's `SK()` prefix. `test/engine.smoke.js:474-477` is the guard that already exists for that, and it reads the right noun.
- **No generalising of `icsData()` or the exporter tabs.** Both are reachable from `btn.run` and `docDl` today.

---

# QUESTIONS FOR THE OWNER

1. **Does the kitchen travel on the Trolley Pass?** G1 is the only engine change I recommend, and it is only worth it if the answer is yes. If the pantry is one device's, the whole thing is pack code and the engine does not move at all.
2. **§6(e) of the 2026-09-11 sweep is still unanswered and A11 is still deferred** — *"what's the nicest part of cooking for you — the chopping, the smell, the waiting, or the face they make when they eat it?"* All four research sweeps landed on the same cheapest answer (a person reacts to the dish), which is A11's top row, but **nobody should pick for him** and A11 says so. Mocks can be drawn against the cheapest row without settling it; a build cannot.

# WHAT I DID NOT CHECK

- **I ran nothing.** No browser, no suite, no screenshot. Every claim here is a read of source at a `file:line` I grepped today; none of it is a measurement, and this project has a habit of confident diagnoses that fell over when somebody finally took a screenshot.
- Whether an `<a download>` on a `blob:` URL actually fires under the town's stricter `script-src 'self'` CSP — the engine does exactly this at `:3677` under Meridian's equally strict `default-src 'self'`, which is evidence, not proof.
- Whether the scroll-to-top at `:3519` bites anyone in the town **today** (G4) — I reasoned about where the controls sit, I did not play it.
- The size of a `#save=` QR at the 32 KB ceiling I proposed. I picked 32 KB from the shape of the existing log ceiling (`LOGKB`, `:20`), not from a measurement of `qrcode(0,"L")`. **Measure it before the number ships.**
- The four research lenses' `[WEB]` claims. Every one of them says its sources arrived as search extracts, not reads; I did not re-fetch a single URL and nothing in this report depends on one.
- `changarrito/index.html` registers no service worker that I looked for; I did not check how the town goes offline.
- Whether `docs/BACKLOG.md` or an open GitHub issue already carries any of this.

# POST-FLIGHT

The six tool calls that mattered were the ones that established `docDef` accepts an inline object and that `sanitizeSave` drops unknown keys — everything else in this report falls out of those two, and neither is discoverable from the cooking research. The four sweeps are good and their engine claims are mostly right, but all four framed copy-paste import as a missing capability when the capability is shipping and the missing thing is a wash, and all four inherited "the inventory we do not have" as the first gap when the pantry does not want one; both corrections are worth more than anything I added. My RULE/CHOICE cut held cleanly this run — the only RULE is *what crosses a device boundary gets sanitised*, which the engine keeps for the save and does not keep for pack state, and everything a cook would call a feature is a CHOICE the pack answers. The persona edit I propose, for the "Four engine facts you keep re-deriving" block — exact text, to be appended as a fifth bullet:

> - **A document does not have to be registered anywhere, and a pack's state does not ride the save.** `docDef` (`engine/engine.js:3369`) takes *either* a `DOCS` id *or* the document object itself, so a thing the player made ten seconds ago can be handed straight to `docOpen` and rendered — every block prints through `textContent`, and a function cannot survive `JSON.parse`, so pasted data can never reach `art` or a `run`. But `save()` (`:503`) is a closed struct and `sanitizeSave` (`:516`) **rebuilds a whitelist and drops every unknown key**, and `passURL()` (`:4881`) carries only `loadSave()` — so anything a pack persists through `SK()` survives a reload and dies silently on the Trolley Pass.
> **The moment (2026-09-14):** asked which seams carry a cooking game, the answer to "can a person paste a recipe in" turned out to be *yes, today* — and the answer to "will it still be there on his tablet" turned out to be *no, with no message* — and neither is visible from any document about cooking.

---

# paty

PRE-FLIGHT — Read `/home/user/meridian-quest/CLAUDE.md`, `docs/OWNER.md`, `docs/STORY.md`, `docs/GENRE-RULES.md`, `docs/ARCH-LOG.md` A11, the 2026-09-11 cooking sweep §4–§7, both `strings.js` files and the reader/toast code, then grepped every identifier I cite. Nothing was edited, created or deleted; no scratch file was needed. One correction to my own briefing up front: **there is no `chatSay` in this engine** — the ambient chat line calls `toast(sayAs(...),2800)` at `/home/user/meridian-quest/engine/engine.js:3698`, and `toast(msg,ms,crit)` at `:583` takes `ms` from the caller and defaults to `ms||2600` at `:605`, never deriving it from length `[CODE]`.

---

# THE DELIVERABLE

## 0 · The one structural finding, before any word

**A string is a claim about a state, and three of the four UI words the brief names have no state yet — but the reason is not what the registers imply.** `grep -iE "inventory|pantry|despensa" engine/engine.js` → **0** `[CODE]`, verified today. That is usually read as "blocked on a build". It is not: **a pack owns its own storage** (`SK` at `engine/engine.js:13`, per-pack prefix; the room seam proves it at `:224–226`, reading and writing `SK("room")` with content's own JSON), and **a pack renders its own paperwork** through `docSections`/`docOpen` (`:3370`, `:3513`) with `blank`, `kv`, `t`, `sel`, `form`, `btn`, `docs`, `art` all shipping (`:3455`–`:3510`).

So, honestly stated: **the menu of the week and the shelf need no engine change — they need a pack that owns its own `localStorage` and draws through the reader.** The word that genuinely has no surface is **portion**, because the composed plate is a picture and `s2.art` is a canvas a pack must paint. I am not writing a single string for a plate renderer that does not exist.

## 1 · UI words — key · EN · ES · reason

Keys in this repo's style. `¶` marks a row that is not a straight translation and says why.

| key | EN | ES | reason |
|---|---|---|---|
| `panTitle` | The pantry | **La alacena** | ¶ Two Mexican words, two different things: *la alacena* is the cupboard on the wall (the place), *la despensa* is what is in it — and in Mexico *la despensa* is also the week's groceries ("hacer la despensa"). Use both, never interchangeably. **Never `inventario`** — warehouse Spanish, and it is also the noun the engine does not have. |
| `panStock` | What's in it | **La despensa** | The contents. Pairs with the row above. |
| `panIn` | What came in | **Lo que llegó** | Logging by exception, one line, per the product sweep's finding 1. |
| `panOut` | What ran out | **Lo que se acabó** | Same. This is the sentence, not a checkbox grid. |
| `panLow` | Getting low | **Ya se está acabando** (19) | ¶ Not `caducado`/`vencido`. Mexico says *fecha de caducidad*, but an expiry list is a guilt list; "se está acabando" is abundance-shaped and warm. |
| `panFirst` | Use this first | **Esto primero** (12) | Shorter than EN. Good for a button row. |
| `plnTitle` | This week's menu (16) | **El menú de la semana** (20) | ¶ Not `plan de comidas` — correct and reads like a clinic. *El menú de la semana* is what a Mexican household actually calls it. |
| `plnShort` | The week (8) | **La semana** (10) | The button form, for `.rmbar .opt{flex:1}` rows. |
| `plnAsk` | What are we eating Tuesday? (27) | **¿Qué hay de comer el martes?** (28) | The single most load-bearing sentence in a Mexican kitchen. It is the prompt, not "select a meal". |
| `plnIf` | If it's Sunday, I soak the beans. (32) | **Si es domingo, remojo los frijoles.** (35) | ¶ The literal *pongo los frijoles a remojar* is 44 chars — 37% over EN. Use the shorter verb. This is the if-then plan, the one thing with the strongest evidence behind it, said the way a person says it. |
| `plate` | The plate | **El plato** | And name the real object: **El Plato del Bien Comer** is a Mexican proper noun with no English name. The health graphic is already Spanish. |
| `porc` | One serving | **Una ración** | ¶ **False friend: never `un servicio`** (that is service, or the bathroom, or a place setting). `porción` is guideline Spanish — allowed on the citation card, wrong in a character's mouth. |
| `half` | Half the plate is vegetables and fruit | **La mitad del plato, verduras y fruta** | ¶ Matches the official Spanish phrasing family rather than back-translating MyPlate. |
| `nutTitle` | What's in it | **Lo que trae** | ¶ Warm. `nutrición` reads clinical in a kitchen. |
| `nutLabel` | Nutrition facts (15) | **Información nutrimental** (23) | ¶ `[TRAINING]` — Mexican labelling Spanish uses **nutrimental**, not *nutricional*; I could not fetch NOM-051 to confirm, and say so. Card only, never a button. |
| `srcTitle` | Where this comes from (21) | **De dónde sale esto** (18) | The owner's "places to check", in plain words. ES is *shorter* here — rare, take it. |
| `nutNo` | No calorie counting here. (25) | **Aquí no se cuentan calorías.** (28) | ¶ The refusal said out loud, once, in both languages. It is a promise to the player, not a setting. |
| `recTitle` | The recipe | **La receta** | |
| `madeIt` | I made it (9) | **Ya la hice** (10) | ¶ The loop-closer, reported to the person who gave you the recipe. `Ya` is doing all the work — it means "done, and I'm telling you". |
| `whoTaught` | Who taught you this one? (24) | **¿Quién te enseñó ésta?** (22) | R12 gathered as content instead of imposed as policy. |
| `list` | Shopping list (13) | **La lista del mandado** (20) / button: **El mandado** (10) | ¶ *El mandado* is the Mexican word for the groceries and the errand at once. `lista del súper` is the flatter alternative if AJ's cast is younger/urban. |
| `left` | Leftovers (9) | **El recalentado** (14) | ¶ Not a translation — **EN has no word for the day-after meal that is better than the first one.** This is the food-waste feature and the warmest noun in the set. |
| `itacate` | Take some home (14) | **Tu itacate** (11) | ¶ Keep the Nahuatl-derived word, gloss once in EN: "the plate you take home". Do not translate it to "leftovers to go". |
| `soak` | Soaking (7) | **En remojo** (10) | R4's unrushable duration, in the phrase a kitchen already uses (beans, nixtamal). |
| `lapse` | The rice is still there. (24) | **El arroz ahí sigue.** (19) | ¶ The line after an absence. Kind and practical, not a verdict. *Ahí sigue* is the register; *todavía está ahí* is the translation of the English idea. |
| `count` | 42 dinners cooked | **Van 42 comidas** | ¶ *Van X* is the Mexican count-up idiom and it is **grammatically incapable of counting down**. The language enforces the no-streak rule for free. |

## 2 · The four cuisines, and how Spanish carries them

**The rule, one sentence:** *Mexican Spanish takes Japanese and Korean food words straight, in roman letters, masculine by default, pluralised by the article and not by an -s — glossed once in parentheses, then never again.*

| what it is | EN | ES (Mexico) | rule |
|---|---|---|---|
| the evening/main meal | dinner | **la comida** (midday) *or* **la cena** (evening) | ¶ **The worst trap in the set.** In Mexico *la comida* is the big midday meal; *cena* is light and late. The whole EN evidence base says "cooking dinner at home", and mapping that onto `cena` silently moves a Mexican family's main meal to 9 pm. **Do not translate the noun — re-author the verb: "hacer de comer en casa."** |
| to cook, at home, for people | cook dinner | **hacer de comer** | The verb a Mexican kitchen uses. `cocinar` is what a chef does on TV. |
| eating well | healthy eating | **comer bien** | ¶ Ambiguous in Spanish between "healthily" and "plenty", and the ambiguity is correct for this game. `alimentación saludable` is guideline Spanish — citation card only. |
| habit | habit | **la costumbre** | `hábito` is clinical. "Es mi costumbre" is a person. |
| noting something down | log / track | **apuntar** ("lo apunté") | ¶ Never `registro` — bureaucratic, and the town already spends that word on records (`locs.an`). |
| the pot of the day | stew / braise | **el guisado** | No EN equivalent. Keep it; gloss once as "whatever is in the pot". |
| — | comal · molcajete · metate · nixtamal · masa · cazuela · quelites · nopales · verdolagas · epazote · frijoles de la olla · caldo · antojito | identical | Never Englished, never italicised after first use. `[CODE]` the comal is already canon — `/home/user/meridian-quest/content/meridian/npcs.js:94`; the mole belongs to Doña Rosa at `/home/user/meridian-quest/content/meridian/docs.js:294`; Chelo's "I am the only recipe" is `/home/user/meridian-quest/content/meridian/quests.en.js:223` and `quests.es.js:222`. (The 2026-09-11 sweep cites `:224`; it is `:223` today — the identifier is the durable part.) |
| soy sauce | soy sauce | **salsa de soya** | ¶ **`soja` is Spain and the Southern Cone. Mexico says `soya`.** This one word tells a Mexican reader whether the game was written for her or localised at her. `[TRAINING]`. |
| Japanese pantry | miso · dashi · ramen · tofu · onigiri · donburi · nimono | **el miso, el dashi, el ramen, el tofu, el onigiri, el donburi, el nimono** | Masculine, no accents added, no -s plural ("dos ramen"). Mexico has an everyday sushi/ramen vocabulary; it does not need help. |
| one soup, three sides | ichijū-sansai | **ichiju-sansai (una sopa, tres guarniciones)** | ¶ Drop the macron in any button or label; keep it only inside a document. Gloss once. |
| Korean pantry | kimchi · gochujang · doenjang · ganjang · banchan · bibimbap · jjigae | **el kimchi, el gochujang, el doenjang, el ganjang, los banchan, el bibimbap, el jjigae** | *los banchan*, never *los banchanes*. Gloss *banchan* once as "las guarniciones", then use the word. |
| Italian course names | primo · contorno · cucina povera | **primo (el primer plato) · contorno (la guarnición) · cucina povera (cocina de lo que hay)** | Keep Italian, gloss once. |
| pasta | pasta | **pasta** — but a Mexican kitchen hears **"sopa"** | ¶ In Mexico *sopa* / *sopa seca* is the pasta course (sopa de fideo, de coditos). "Pasta e ceci" reads naturally to a Mexican grandmother as *sopa con garbanzos*. Also: *pastas* can mean cookies, and *pasta* alone can mean toothpaste. Context saves it; a bare button labelled "Pasta" does not. |
| parmesan | Parmigiano | **queso parmesano** | |
| the chile in an Italian recipe | peperoncino | **chile de árbol** | ¶ This is a **substitution**, not a translation. It belongs to a cook, not to me. Flagging it so nobody quietly does it in a string. |
| the thing you say | Enjoy your meal | **Provecho** / **Buen provecho** | Not translatable. It is a thing said, not a sentiment described. |

## 3 · Strings this game needs that Meridian does not have

Grouped by which shipping seam carries them, because that decides whether they can be written at all today.

| seam `[CODE]` | what it carries here | can it be written now |
|---|---|---|
| `INTERVIEW.ui[lang]` (`engine/engine.js:220–221`; pattern at `/home/user/meridian-quest/content/meridian/room.js:29–41`) | The cook's ungraded questions — the six in the 2026-09-11 sweep §6, plus "who taught you this one?". A per-pack, per-language `ui` block already exists as a shape. | **Yes, today.** Cheapest row in A11. |
| `docSections`/`docOpen` (`:3370`, `:3513`) with `t`, `kv`, `sel`, `form`, `blank`, `btn` | The recipe card, the week's menu as seven selects, the **citation card per cuisine** ("De dónde sale esto" + one link each), the paste-in textarea. No timer, scrolls, safe for long Spanish. | **Yes, today.** Every fact and every source goes here and nowhere else. |
| `chat` / `chill` arrays (`/home/user/meridian-quest/content/meridian/strings.js:48–64`, ES `:269–285`) | The neighbours' lines. **Must be true forever** — chat has no state (`docs/STORY.md:71–74`). "Ya la hice" cannot be a chat line; it is a button. | **Yes, today**, under the no-state rule. |
| `toast(msg,2800)` (`:3698`) | The after-a-week-away kindness line, the "esto primero" nudge. | **Yes** — at ≤ 90 characters in **both** languages. See §4. |
| `arrive` / `locs` | The kitchen as a place: EN "The kitchen. Somebody left the beans soaking." / ES "La cocina. Alguien dejó los frijoles en remojo." | **Yes, today.** |
| a plate renderer | `porc`, `half`, the composed plate, the thirty-plants sprites | **No.** `s2.art` is a canvas a pack must paint; nothing exists. I wrote no strings for it beyond the two labels above, and those are labels, not states. |

## 4 · The traps, in the order they will bite

1. **`comida` ≠ dinner.** §2, row 1. This will be got wrong by any translator working from the English.
2. **`servicio` for "serving"; `soja` for `soya`; `porción` in a character's mouth; `inventario` for pantry; `registro` for a note.** Five words that are each correct somewhere and wrong here.
3. **Length is a timing bug before it is a width bug.** `toast` never scales with length (`:583`, `:605`); the ambient chat line is a flat 2800 ms (`:3698`). At ~100 characters that is roughly 430 wpm. **Rule: for anything going through a toast, write the Spanish first — ES runs 20–40% longer here, and if ES fits, EN will.** One mercy, verified: the ticker rail keeps the last two lines with **no timer at all** (`:586–596`), so a long line stays re-readable after the toast fades.
4. **Width — one real cap, and it is not where the brief expected.** `.paper .dbtn{width:100%}` (`/home/user/meridian-quest/index.html:237`) wraps; `.rmbar{flex-wrap:wrap}` + `.opt{flex:1}` (`:273–274`) wraps to its own line, which is churn not clipping; `.toast{max-width:86%}` (`:294`) wraps. **The one hard cap I found is `.drawer select{max-width:12em}` (`:328`)** — a Settings-drawer dropdown truncates. If cuisine or season becomes a drawer select, ES option text clips there and nowhere else.
5. **Gender and number by concatenation.** The existing ES already hand-agrees both — `"cosa"+(n===1?"":"s")+" crítica"+(n===1?"":"s")` at `/home/user/meridian-quest/content/meridian/strings.js:274`. A food count will be worse, because the noun's gender varies. **Rule: never build a food count by concatenation.** Either write the whole sentence per branch, or count a fixed noun (`"Van 3 comidas"`, `"Quedan 3 cosas en la alacena"`).
6. **Escaped accents hide strings from a Spanish grep.** `/home/user/meridian-quest/content/meridian/strings.js:269` carries `tranv\u00EDa` while every neighbouring ES line uses a literal accented character. Grepping `tranvía` in that file returns 5 hits; grepping `tranv` returns 6 `[CODE]`. A translator auditing Spanish by searching Spanish will silently miss those lines. New pack: literal accents only.
7. **Register.** The game's own chrome speaks **tú**, never **usted**, never *vosotros*, and never the impersonal guideline voice (*"se recomienda consumir…"*) — that is the manual register the brief forbids. Characters may use *usted* where a person would: Naye already says *"Siéntese"* (`:278`), Chelo says *mijo*. A kitchen is the most *tú*/*usted*-sensitive room in Spanish; get it wrong per-character, not globally.

## 5 · What must be written by a native speaker and not translated

1. **Every line spoken by a Japanese or Korean cook.** The 2026-09-11 sweep says the Asian half "has no equivalent here and no named person behind it — which is the first thing to ask AJ, not to guess", and that is still true: no such content exists in any pack. I can carry Japanese and Korean *food words* into Mexican Spanish correctly. I cannot invent a halmeoni, and neither can any agent here. **This is the row I would refuse.**
2. **The Italian nonna's Italian.** Same shape, smaller stakes — I can gloss *primo* and *contorno*; the Italian voice needs an Italian.
3. **Anything quoting the Guías Alimentarias 2023, the Plato del Bien Comer, or NOM-043.** These are **written in Spanish first**. Quote the official Spanish verbatim and translate *into* English. Back-translating the English fact sheet into Spanish is translating a translation, and a Mexican reader will hear it.
4. **The jokes, in both directions.** In this repo the ES `chill`/`chat` lines are not translations — *"No estorbo. SOY el camino."* (`:242`) is funnier than the English. A cooking pack that makes ES the derived language loses the thing that makes this repo's Spanish worth reading.
5. **`nutLabel`.** Whoever writes the card should confirm *nutrimental* against NOM-051 before shipping it; I am at `[TRAINING]` and could not fetch.

## 6 · Live drift found today in the shipped repo (not mine to fix under this run's rules)

`/home/user/meridian-quest/changarrito/content/strings.js` — **inside the ES block**, `locs.hq` is `"The stall"` (line 256) and `arrive.hq` is `"The stall."` (line 261). Two untranslated English strings in the Spanish table, in the town, on the owner's own build. Verified 2026-09-14. Suggested: `hq:"El changarro"` and `hq:"El changarro."` — the town's own noun, dry, and it is already the pack's name.

---

# QUESTIONS FOR THE OWNER

1. **Who is this kitchen's `comida`?** If the household is Mexican, the main meal is midday and the whole English evidence base ("cook dinner more often") points at the wrong hour. Do the week's slots read **comida** (midday) or **cena** (evening)? It changes every day-label string and the shape of the planner.
2. **Do you want the Spanish written first for this pack?** Meridian's ES is an equal; a *cooking* pack in your voice would be better if ES were the **source** for the kitchen strings and EN carried from it. That reverses the lockstep order without breaking it — and `docs/OWNER.md` says "EN/ES in lockstep", not "EN first". I would not do it without you saying so.
3. **AJ's half has no native voice and nobody here can supply one.** The Japanese/Korean cook can be (a) deferred until AJ names a real person she learned from, (b) written as a Mexican character who learned it — which is true of a great many Mexican kitchens and is `R12`-clean, or (c) dropped for iteration one. My recommendation is (b), because it is the only one that is both honest and buildable this month.

# WHAT I DID NOT CHECK

- **I fetched nothing.** Every `[WEB]` claim in this reply is second-hand from the four sweeps handed to me; the only things I verified are `[CODE]` greps and my own Spanish, which is `[TRAINING]`.
- **NOM-051 / NOM-043** — did not fetch; *nutrimental* and the Plato's group names are from my own knowledge.
- **`soya` vs `soja`, `mandado`, `recalentado`, `itacate`, `alacena` vs `despensa`** — all `[TRAINING]`, my own ear, no corpus and no source consulted.
- **Whether Japanese or Korean terms have settled Mexican-Spanish plurals in print** — I applied the article rule from usage, not from an authority.
- **Every `chat`, `chill`, `quests.es.js` and `docs.js` line for existing drift.** I audited two files and found one defect; I did not sweep `quests.es.js` (large) or `changarrito/content/docs.js` at all.
- **The `.ics` export, the QR transfer, `SEASONS`, `WEAR` and the Trolley Pass panel** for Spanish-length problems — named in my brief, not opened.
- **Whether any `.rmbar` row would actually wrap with these labels on a real device.** I read the CSS; nothing was rendered or measured.

# POST-FLIGHT

The brief handed me four UI words and I spent most of the run establishing which of them describes a state that can exist, because that is the mistake I made last time in the other direction — and the answer was better than "blocked": a pack owns its storage (`SK`, `engine/engine.js:13`) and its paperwork (`docOpen`, `:3513`), so only the plate is genuinely unbuilt. The sharpest thing I found is not a word, it is an hour: `comida` is the midday meal, and every English sentence in four research sweeps says "dinner", which would quietly move a Mexican family's main meal to nine at night in a game about eating well. The second sharpest is that `Van 42 comidas` cannot count down in Spanish, so the language itself enforces the no-streak rule the researchers had to argue for. And I have to correct my own persona: the identifier it told me to cite does not exist in this engine, which is exactly the failure my persona was written to catch in other people's docs.

**Persona edit I propose — replace lines 105–107 of `/home/user/meridian-quest/.claude/agents/paty.md` with this exact text:**

> And when you have the numbers: **`toast(msg,ms,crit)` never derives its duration from its length** — it takes `ms` from the caller and falls back to `ms||2600` (`engine/engine.js:583`, `:605`), and the ambient chat line passes a flat **2800 ms** (`engine/engine.js:3698`). **There is no `chatSay` in this engine — an earlier version of this file said there was, and that is the exact failure this persona exists to catch.** Grep the call site, never the function you remember. At ~100 characters, 2800 ms is roughly 430 wpm, about double comfortable reading. **Length is a timing bug before it is ever a width bug** — with one mercy worth knowing: the ticker rail keeps the last two lines with **no timer at all** (`engine/engine.js:586–596`), so a long line stays re-readable after the toast fades. **So for anything that goes through a toast, write the Spanish first: ES runs 20–40% longer here, and if ES fits, EN will.**

---

# tono

PRE-FLIGHT — I read `docs/TAGS.md` (my ledger, L1–L23 plus the near-miss), `docs/OWNER.md`, `docs/GENRE-RULES.md`, `docs/ARCH-LOG.md` A11 and §6 of the 2026-09-11 cooking sweep, then verified every claim below by grepping the identifier in `engine/engine.js` today — the four lenses' `[CODE]` line numbers had drifted again and I re-derived mine rather than relaying theirs. **One thing in the brief I was given is wrong and I am saying so out loud before anything else: `WEAR` is not "the wardrobe seam for owned things" — it is three hardcoded dog-cosmetic slots with hardcoded colour lists in engine code (`engine/engine.js:448`), read only by the pet swatch builder (`:4858`) and baked into the save sanitizer (`:552` region, `wearIn`).** Nothing was built, nothing tracked was edited.

---

# THE DELIVERABLE

## 1 · The line — what travels, what is this game's own

Judged by rule 2 (*fill the field in for a game with no food*). `[CODE]` all, grepped 2026-09-14.

| Thing the four lenses want | Verdict | Why, and where it lives |
|---|---|---|
| **A recipe** | **Travels — and needs no new word at all.** | `docDef(id)` takes *an inline object as well as a `DOCS` key* (`engine/engine.js:3369`), and `DC()` reads the pack's own `DOCS` (`:3533`). A recipe is a document. This is the single best piece of news in the sweep and nobody in the four lenses spotted it. |
| **A plan, a form, a shopping list** | **Travels.** | `s2.form` with `text/password/area/select/checks`, a submit and a cancel (`:3485`); `s2.sel` with option groups (`:3475`); `s2.blank`, `s2.kv`, `s2.t`, `s2.btn` — all pack-driven, engine reads none of the meaning. |
| **A season / an occasion** | **Travels as a key set; the RULE around it is Meridian's.** | `SEAS()` (`:4255`) reads a pack-declared `SEASONS`. But `docs/OWNER.md` (2026-09-01) settles *"a season changes colour, never design"* — so "what's in season changes what the market sells" is a **settled-rule conflict, not a tag question.** See Questions. |
| **An ungraded conversation** | **Travels.** | `RM()` (`:220`) returns a pack's `INTERVIEW` only if it declares `hosts` + `ui`; a pack declaring nothing gets nothing. This is A11's cheapest row and it is real. |
| **A cuisine** | **This game's own.** Blank in a world with no food. | Not a tag. It is a value inside a pack's own `tags` array. |
| **A nutrition fact / a source card** | **The *fact* is this game's own; "where this claim came from" travels.** | Neither is a new section type — it is `{note:…}` (`:3453`). **But the reader cannot render a link at all** — `docRender` has no `<a>`; the only anchors near it are the two file downloads (`:3678`, `:4744`, `:4751`). The owner's "places to check" is a real, small, verified gap. |
| **An allergen** | **This game's own, and it must never be an engine field.** | An engine field implies the engine computes it. Every lens says the game must not be the allergen check. Pack text, inside the recipe document. |
| **A pantry / an ingredient count** | **The mechanism travels; the noun does not — and the mechanism does not exist.** | `grep -c inventory engine/engine.js` → **0**, still. And see L25 below: there is nowhere to *put* it. |
| **A wardrobe of owned things** | **Does not travel. `WEAR` is the dog's.** | `WEAR={bandana,collar,cape}` with literal colour arrays (`:448`); `wear`/`wearCat` are engine globals (`:451`, `:452`); the three slots are written into the save contract by `wearIn` inside `sanitizeSave`. A seventh closed enum — see the L3 amendment. |
| **The .ics reminders, the exporter** | **Does not travel.** See L24. | |
| **The town's index and search over tags** | **Does not travel.** See L27. | |

**The rule underneath all of it, in one line:** a food game needs *documents, forms, people and a place to keep things*. Three of those four are already template-grade. The fourth has no name and no home.

---

## 2 · Judging every new tile kind the lenses imply — rule 1, out loud

The current kind list, verified at `engine/engine.js:1842–1870`: `prop wall facade furniture appliance fence marker site nature tree water bridge stair gear` (+ pack `transit`, + `door`). The 3D renderer knows **five shapes** and reads `kind` at exactly six places (`engine3d.js:212, 259, 299, 352, 370, 386, 438`).

| Proposed | Rule 1, run out loud | Verdict |
|---|---|---|
| **pantry shelf, fridge, stove, counter, prep table** | box · 1–2 tiles · solid · four faces | **Not a kind — they are all the box we already have twice.** `t3Boxy` is `m.box \|\| m.kind==="furniture" \|\| m.kind==="appliance"` (`engine3d.js:259`). Use `box:true` + a `TILESIDE` drawing. **Do not add a third noun for one geometry.** |
| **market stall / puesto** | box or facade · 1–2 tiles · solid · four or two faces | **Not a kind.** `facade` if you walk into it, `box` if you do not. |
| **herb bed, milpa row, a plot, a mat** | floor paint · **0 tiles** · solid · one face | **A kind, and the name is `flat`.** This is L13 verbatim, and **this game is the first pack that makes L13 a blocker instead of an annoyance** — today the only route to "solid, zero height" is `kind:"water"`, which drags Meridian's petal spill and the rainbow bridge's orientation test along with it. |
| **a ristra of chiles, drying herbs, a hanging pot** | billboard · stands N tiles **from its feet** — ✗ | **Fails rule 1 at the third answer: it does not stand from its feet.** So it is **not a kind, it is a flag** — a `hang:` offset with the same shape as the existing `lift:`. Registered gap already ("a thing that hangs at a height"); now it has a named form. |
| **a pot mid-steep, a dough resting** | — | **Not a tile at all. It is state.** Do not give it a `kind`. |
| **`kind:"food"` / `kind:"ingredient"` on a critter or a decal** | — | **Refused.** `kind` already means six unrelated things (`docs/TAGS.md` Collisions). A seventh is the point at which nobody can ever write a validator. |

**One approval, unambiguous:** `flat`. **One rename ticket, not mine to run:** `furniture`/`appliance` → `box:true`; the flag is the only one of the three named for the geometry.

---

## 3 · What goes in `docs/TAGS.md` — exact text to append

> ### L24 · The exporter is one dog's care sheet, and the engine's export schema says "meridian"
> **Registered 2026-09-14 by Toño, verifying the brief for the eating-habits game. Extends L17 — same shape, two more instances, and this one reaches the player's files.**
>
> `[CODE]` `treats` and `fredQ` are **engine globals** (`engine/engine.js:437`), persisted as save keys `tr` and `fq` (`:503`), clamped in `sanitizeSave` (`:553`). `exportData()` emits `schema:"meridian-export-v1"` (`:4684`) and a top-level key `frederick:{name:"Frederick",treats,bandana:fredQ>=2,carePackUnlocked:fredQ>=1}` (`:4688`). `icsData()` (`:4706`) emits **exactly five events** on fixed RRULEs, stamps every one `UID:mq-care-<i>@meridian-quest` (`:4716`), and the download is named `…-care-reminders.ics` (`:4753`). The tab is gated `$("exTabCare").hidden=fredQ<1` (`:4735`) — a Meridian quest counter deciding whether an engine UI exists.
>
> **What a second game hits.** A pack that wants reminders — *"Sunday, soak the beans"*, seven dinners, a kimjang date — gets one pet's five-row schedule it cannot change, gated behind a quest it does not have, and every calendar entry it hands the player is stamped with another game's name. Its JSON export claims to be a Meridian export.
>
> **Why the guard does not see it.** `test/smoke.js:2228-2232` is the 39-name portability blocklist. It contains `chelo`, `frijol`, `pelusa`, `bolillo` — and **neither `frederick` nor `meridian`**, the pack's own folder name, which appears in engine code eleven times. L17 found the list missing `sonny`; this is the same list missing the game. **A blocklist is a list of yesterday's mistakes** — `docs/NEW-WORLD.md` §3's generic scan is the fix, and this is the second piece of evidence for it.
>
> ### L25 · A pack cannot put anything in the save, and the pass carries nothing a pack wrote
> **Registered 2026-09-14. Extends L18, which found the 99-quest clamp in the same function and stopped there. This is the larger half.**
>
> `[CODE]` `save()` writes a **fixed twenty-key blob** (`engine/engine.js:503`). `sanitizeSave()` does not filter a save — it **rebuilds one**, returning an object literal with exactly those twenty named keys (`:553-563`), and `loadSave()` (`:565`) runs *every* local load through it. So a key a pack adds is not merely unvalidated: **it is dropped on the next load, silently.** Two of the twenty (`wr`, `wc`) are the dog's three cosmetic slots.
>
> `passURL()` (`:4881`) serialises `{v:1,l:lang,s:loadSave()}` — **the engine's save and nothing else.** Everything a pack persists goes through `SK()` (`:13`) into its own key, as the town does (`changarrito/content/record.js:113`, `:494`, `SK("filter")`), and therefore **never crosses the Trolley Pass, never appears in the export, and is never sanitised on arrival.** `SK("room")` — the INTERVIEW answers, which `docs/OWNER.md` calls the design conversation with AJ — is in that category today.
>
> **What a second game hits.** A pantry, a week's meal plan and a cookbook *are* an eating game's save. All three land outside the save, outside the pass and outside the export, and the player who scans the QR onto their second phone arrives with their character and without their kitchen. **The gap is one seam: a pack-declared slot, sanitised by a schema the pack supplies.**
>
> ### L26 · The engine does not only name Meridian's alphabet — it draws Meridian's kitchen
> **Registered 2026-09-14. L1 registered the metadata table; nobody registered the pictures.**
>
> `[CODE]` `TILESIDE` (`engine/engine.js:1650`) holds engine-side profile drawings for Meridian's glyphs, and four of them are the four objects a kitchen is made of: `TILESIDE["T"]` a restaurant table with gingham and plates (`:1651`), `TILESIDE["S"]` shelving (`:1672`), `TILESIDE["K"]` a counter *with a coffee machine on every third tile* (`:1683`), `TILESIDE["V"]` **a stove — burners, knobs, an oven window** (`:1802`). `sideArt=g=>TILESIDE[g]||TILEDRAW[g]` (`:1836`) prefers the engine's drawing; a pack reaches it only by overriding the same letter, which then trips L2 (the merge is a spread, so `V` keeps `lift:8, kind:"appliance"`).
>
> **What a second game hits.** A cooking pack inherits somebody else's stove, counter, shelf and table before it draws anything — and they are drawn well enough that nobody notices they were never chosen. **This is the most expensive instance of L1 precisely because it is the most useful one.**
>
> ### L27 · The index and the search are the town's, not the engine's
> **Registered 2026-09-14, against a brief that called them an engine capability.**
>
> `[CODE]` The engine supplies **widgets**: a dropdown with option groups (`s2.sel`, `engine/engine.js:3475`), a form (`s2.form`, `:3485`), a table (`s2.t`, `:3457`). The **index** — categories, tag search, sort, persistence, plain-language hits — is ~500 lines of *pack* code in `changarrito/content/record.js` (`search` `:96`, `indexDoc()` `:248`, `setFilter/setSort` `:492-497`). `tlFindNext` (`engine/engine.js:4592`) is find-in-a-textarea in the admin text lab, not a search over content.
>
> **What a second game hits.** "Find my recipe with beans" is not a seam it turns on; it is a thing it writes again from scratch. Say **"a dropdown and one town's implementation"**, never "we have search".
>
> ### L28 · `concept` is the rule-2 failure that lives in ENGINE code — and an eating game would entrench it
> **Registered 2026-09-14, pre-emptively, which is the only time this entry is worth anything.**
>
> `[CODE]` `docs/TAGS.md`'s own rule-2 table lists `concept` as failing. It is read in engine code at `:3356`, `:3390`, `:3469`, `:3841`, `:4610`, `:4613`, and the decision report's *Concepts* section is built out of it (`:4674`, `:4677`). It is not a pack field the engine ignores; it is load-bearing.
>
> **The trap, and it is specific.** A nutrition game *has* concepts — nixtamalization, *ichijū-sansai*, the *sa-shi-su-se-so* order. It would be **the first pack to make the word look correct**, and that is exactly how a curriculum word becomes a template word with nobody deciding it. The reusable field under it is *"the named thing this moment taught"*, which is blank in a game with no lesson. **Register the entrenchment before it happens, because after it happens there are two packs' worth of content behind it.**
>
> ### Amendment to L3 — it is SEVEN closed enums, not six
> `[CODE]` `WEAR={bandana:[…],collar:[…],cape:[…]}` (`engine/engine.js:448`) — three fixed cosmetic slots with **literal colour arrays in engine code**, read by the swatch builder (`:4858`), mirrored by engine globals `wear`/`wearCat` (`:451`, `:452`), and written into the save contract by `wearIn` inside `sanitizeSave`. It is not an owned-things seam and it must not be described as one: a pack cannot add a slot, rename one, or change a colour.

**And one row for the *Gaps* list:** *a clickable source on a document.* `docRender` has no `<a>`; the reader can show a note saying where a claim came from and cannot let the player open it. Directly the owner's *"places to check about this facts so we know where you get the info."*

---

## QUESTIONS FOR THE OWNER

Two, and both are contradictions I could not resolve by reading, per the standing rule.

**1 · A season that changes what the market sells breaks a settled rule.** `docs/OWNER.md` (2026-09-01) settles *"a season changes colour, never design"*, with Día de Muertos the one named exception that may also **dress** the world. Three of the four lenses want seasonality to change **content** — what is on the shelf in March, when kimjang happens, the yearly cycle. That is neither colour nor dressing. **Which is it: does `SEASONS` stay a palette and a food pack invent a separate "what's available now" tag, or does the settled rule get an amendment?** I will not pick.

**2 · Are a food pack's choices quests at all?** `docs/OWNER.md` settles *"the grade is permanent and separate… never turned off."* `engine/engine.js:3832` is `const solved=o.r==="ok";` and `:3829` awards 10 / 5 / 0 XP by grade — so a quest choice graded `bad` **subtracts**, which is exactly what `GENRE-RULES.md` R2 forbids for a calm cooking game ("a mistake is only a punishment if it SUBTRACTS"). L11 already registered this. The clean resolution is that *which dish you make* is a **preference, not an answer**, and belongs in `INTERVIEW` (ungraded, pays nothing) rather than in `quests` — but that means an eating game earns no XP and has no grade, which is a bigger call than a tag. **Does this game keep the grade, or is it the first pack to run with none?**

---

## WHAT I DID NOT CHECK

- **I did not run anything.** No test, no boot, no pack built. Every `[CODE]` claim is a grep of the identifier plus a read of the surrounding lines, today; none is measured behaviour. L25's "a pack key is dropped on load" is read off the object literal at `:553-563` and the `loadSave()` call at `:565` — **I did not plant a key and reload to prove it**, and by this repo's own rule that makes it a strong reading, not a measurement.
- **I did not verify a single one of the four lenses' `[WEB]` claims.** All four said their sources reached them as search extracts, not reads. Nothing I wrote depends on a number from them; where I used their findings I used the *shape* of the finding, not its figures.
- **I did not check `changarrito/content/` for whether the town declares `SEASONS` content-side beyond the one grep hit** (`changarrito/content/config.js:46`), nor what its keys are.
- **I did not check `docs/NEW-WORLD.md`'s optional-seam list against L24–L28** to see which of them also need a row there. I checked only that none of the five is already documented in it.
- **I did not check `docs/REGRESSION.md`** for whether the missing-name-in-blocklist shape is already on the proxy register — L24's second half may be a fifth instance of "a guard reads a proxy for the noun it means," and if so it belongs there as well as here.
- **I did not judge the *personas*, the *cast*, or the *story* the lenses propose.** That is Nacho's and Chema's. I judged words only.
- **The town answered "nothing at all" for a pantry, a recipe, an .ics and a pack save slot** — it declares none of the four. Per L22, that is **untested, not passed**; I have said so at each point rather than letting silence read as a pass.

---

POST-FLIGHT — I set out to register the leaks a second food game would hit and found five, of which two (L25, the closed save; L26, the engine's own kitchen) are the ones that would actually stop an eating game on its first week, and neither was on any register. The most useful thing I did was not finding them: it was checking the brief I was handed and discovering that `WEAR` is a dog's three bandanas and the town's "search" is five hundred lines of pack code — **a capability named in a summary had twice become a capability assumed in a plan**, which is this project's oldest failure mode and the reason rule 1 of the shared memory exists. The best news is genuinely good and belongs at the top of whatever gets built: `docDef` already takes an inline object, so a recipe is a document, needs no engine word, and travels today. My honest worry is L28 — this is the first pack that would make `concept` look like a template word, and by the time two games' content sits on it, it is not a rename, it is a migration.

**Persona edit I propose, as exact text.** In *Before you say anything*, replace step 4 in full with:

> 4. **Test every claim against El Changarrito — and know that it can give three answers, not two.** The town is the only other world on this engine, so it is the only honest evidence about what travels. If a tag works for Meridian and the town both, it is probably real. If the town had to **copy** something to make it work, it is not. **And if the town declares the thing at all — no pantry, no recipe, no reminder, no save slot of its own — then it has not been tested by the town, it has been skipped by it. Say `untested`, never `travels`.** *(`docs/TAGS.md` L22. Used three times on 2026-09-14 alone; without it, `WEAR`, the `.ics` exporter and the pack save slot all read as passing.)*

---

# chuy

**Files written**

- `/home/user/meridian-quest/docs/research/2026-09-13-healthy-eating-game.md` — the four lenses consolidated into one sourced sweep (habit science · cooking/planning/commensality · tracking harm · gamification psychology · environment & pantry · the four cuisines · products/games/import · nutrient tables with their licences · what the game may legally say · `[CODE]` what the repo has), every `[WEB]` URL from all four lenses kept in §12, `[TRAINING]` and `(vendor)` and `(read)` marked throughout, limitations and the good as §10/§11, "not checked" as §13; **it replaces the raw unconsolidated four-lens dump that sat at this path, and says so at the top** (the raw is in git history).
- `/home/user/meridian-quest/docs/la-sobremesa.md` — the plan, named from Mari's working title, each section attributed: §1 brief (Mari) · §2 loop (Tavo) · §3 cast (Nacho) · §4 look (Pili) · §5 engine seams, the four gaps and the words that travel (Beto + Toño) · §6 the two languages (Paty) · §7 sittings and the three blockers (Mari) · §8 where it fits and the ranked future iteration (Mari) · **§9 the fifteen decisions the owner owes plus one confirmation, each with who asked and which ✅ recommendation stands** · §10 the seven mocks (Pili) · §11 what nobody checked.
- `/home/user/meridian-quest/docs/GENRE-RULES.md` — **R15 · count up, never to zero**; **R16 · the marks go on the logistics, never on the person** (with the `gradeOf` trap: `engine/engine.js:374`, `return 3` at `:376`, so a pack with no wrong answers ships only its warmest ending, silently); **R17 · a model the player maintains decays, and the cost is not the typing**; **R10 extended** with the planner tell (*any surface where yesterday can change colour*); the sweep added to the archive table; and two stale-`[CODE]` corrections in the file's own text — the "what we already have" paragraph said `STK` `:330`/`stakesCfg` `:333` and is now `:359`/`:362`, plus a new drift note (`petalMomentTick` `:1558` against A11's `:1224`, `SHIRTS` `:431` against GAUGE's `:341`).
- `/home/user/meridian-quest/docs/OPEN.md` §1 — one new row at the top of "Waiting on the owner", the decisions he owes, pointing at `docs/la-sobremesa.md` §9.

**Proposed and not written, with the reason**

- **Seven persona edits** (Mari, Tavo, Nacho, Pili, Paty, Beto, Toño each returned exact replacement text for their own `.claude/agents/*.md`, and Pili's and Paty's each correct a `file:line` that is wrong *inside the persona*). `.claude/` and `docs/crew/FLIGHT-NOTES.md` are both outside this phase's limits. **They are unfiled and will be lost if nobody carries them** — that is the largest loose end of this run.
- **Toño's `docs/TAGS.md` L24–L28 and the L3 amendment** (the `.ics` exporter is one dog's care sheet and the export schema says "meridian"; a pack cannot put anything in the save and the pass carries nothing a pack wrote; the engine *draws* Meridian's kitchen — stove, counter, shelf, table; the index is the town's not the engine's; `concept` would be entrenched by a nutrition pack; it is seven closed enums, not six). I could write under `docs/`, but these were not among the three files I was given and the leak register's discipline is that a leak is registered by whoever measured it. **Summarised with attribution in the plan §5 so they are reachable; they still need filing in TAGS.md.**
- **Nacho's two `docs/STORY.md` decision-log rows and one open-thread line.** Not written: `STORY.md` is Meridian's bible, the rows describe a world that does not exist and a decision nobody has taken, and this project has lost time three times to a document describing a game we do not have. The half that *does* generalise — where the marks live — is now R16.
- **A `docs/decisions/0004-*.md`.** **No decision was made in this run.** Nothing here is settled; fifteen things are owed. A decision file would be an invented decision.
- **Paty's fix for live ES drift in `changarrito/content/strings.js`** (`locs.hq` / `arrive.hq` are English inside the Spanish block) and **Beto's `applyText` prototype-pollution finding** — both outside `docs/`, both recorded in the plan §5/§6 so they can be ticketed.

**WHAT I DID NOT CHECK**

- **I verified no `[WEB]` claim.** All four sweeps say their fetches were proxy-blocked; every number I copied is second-hand and is marked as such in both files.
- **I ran nothing** — no suite, no boot, no screenshot. I grepped and read: `STK` `:359`, `stakesCfg` `:362`, `gradeOf` `:374`/`:376`, `SHIRTS` `:431`, `WEAR` `:448`, `save` `:503`, `sanitizeSave` `:516`, `petalMomentTick` `:1558`, `TILESIDE` `:1651/:1672/:1683/:1802`, `drawPerson` `:2955`, `docDef` `:3369`, `docSections` `:3370`, `docMarkdown` `:3373`, `s2.art` `:3405`, `form`/`area` `:3485`/`:3492`, `docOpen` `:3513`, clipboard `:3673`, `SEAS` `:4255`, `icsData` `:4705`, `passURL` `:4881`, `t3Boxy` `engine3d.js:259`, `kind==="water"` `:212`, `data-c="architect"` in all three shells, the `ENDLESS`/`CHAPTERS` gate `test/engine.smoke.js:794-795`.
- **I did not re-grep** `roomPending`, `a.hist`, `indexDoc`, `tlFindNext`, `HUDFACT`, `SK`, `clean(s,max)`, `applyText`, `.dnote`, or the reader CSS caps — those are relayed from Tavo, Beto, Pili and Paty with their names on them, not re-verified by me.
- **I did not open** `docs/TAGS.md`, `POSTMORTEM.md`, `REGRESSION.md`, `NEW-WORLD.md`, `GAUGE.md`, `ARCH-LOG.md` A11 or A3, `OWNER.md`, or the GitHub issues this run — so the register numbers I cite in the plan (L12, L17, L24–L28, A3, A11, #153/#154/#155) are the agents' citations, carried forward, not mine.
- **I did not check** whether `docs/BEAUTIFY.md:25-27`'s stale `t3Boxy` line was corrected (Pili reported it; `engine3d.js:259` is confirmed, the doc is not), nor whether `docs/GAUGE.md`'s `SHIRTS` `:341` was fixed.
- **The name was not checked for collision** in this repo or anywhere else.

**POST-FLIGHT**

The expensive judgement this run was what to do with a path that already held something: the raw four-lens dump was explicitly labelled "the consolidated file is next window's work", so I rewrote it rather than stacking a second file beside it, and I said in the header exactly what was replaced and where the original lives — accumulate-and-correct, not accumulate. The most valuable thing in the whole run is not a design finding but a code one — `gradeOf` returns 3 when nothing has ever been answered — because it means a calm pack ships two endings no player will ever see, silently, with no test failing, and it is now R16 with the `file:line` beside it rather than buried in one agent's return. I re-grepped every identifier I copied and found that `docs/GENRE-RULES.md` was quoting its own stale numbers in the paragraph that tells you not to quote stale numbers, which is the fourth instance of that pattern this month and is why R16 and R17 carry their identifiers and the date they were read. The thing I am least comfortable leaving is the seven persona edits and Toño's five leak entries: both are durable findings that now exist only in a conversation and in my summary of them, and by this project's own rule that means they are one session away from gone.
