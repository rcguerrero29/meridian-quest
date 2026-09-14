# Crew run 8 — the questionnaire, the journey, the map, the backlog — raw returns, 2026-09-14 (late)

*Fifteen advisers in parallel, one pen, crew mode off, on the owner's third reply of the night
(`docs/ASKS.md`, 2026-09-14 late, third reply). Thirteen returned before the session limit; Chava, the
form researcher and Chuy's consolidation were cut and re-run after it (their returns are appended
when they land). Verbatim: pre-flights, deliverables, questions, what was not checked, post-flights,
persona edits and mural panels. The ledger rows are `docs/crew/FLIGHT-NOTES.md` iteration 8; the
consolidation is `docs/la-sobremesa.md` §13, `docs/UI-REVIEW.md` and `docs/meetings/2026-09-14-el-mapa.md`.*

---

# nacho

PRE-FLIGHT — I read the post-mortem, the regression register §3, my own bay on the wall and my last flight notes, then the owner's standing rules, the whole of `docs/la-sobremesa.md` (including §12, his answers), the current AJ script, `docs/GENRE-RULES.md` and Meridian's shipped `arrive` strings for voice — and only then wrote a question, because my own persona line says find what picks between the endings before writing them. Being the muralist equips me for exactly this job: a questionnaire is a piece of writing addressed to one person, and the journey is a chapter with a Monday and a Saturday, which is the only thing I actually know how to build. Where I expect to fall short, named in advance: I direct story and never write code, so anything I claim about how her answers travel is a grep, not a run — and the brief tells me I have Bash and a browser, which **I do not have in this session** (my tools this run are Read, Grep, Glob only), so there is no render below and I say so rather than dressing reasoning as a picture.

---

# THE DELIVERABLE

## Part 1 · The questionnaire for AJ, as it should be asked

### The frame

**Whose voice.** The owner's, on the cover and the last screen; a plain kitchen voice for the questions themselves. Not a character's — AJ has not met anybody yet, and a cook interviewing her before she has walked into a kitchen is a costume. `[OWNER]` `docs/OWNER.md:258-261`: *"do not ask about a mechanic, ask about a feeling."* Every question below obeys that, including the two that are secretly about the biggest build in the plan.

**Cover screen (before question 1):**

> **A kitchen, for you.**
> Ricardo asked for a game about cooking and it turned into a game about you. Eleven questions. Pick, or type, or skip — **blanks are fine and nothing here is final.** There are no right answers; a couple of these decide what gets built first, and those ones say so.
> *Nothing you type leaves this phone. At the end there's a Copy button and you send it to him however you like.*

That last line is not decoration: `[OWNER]` `docs/OWNER.md:58-64` is settled — *AJ talks to the characters; there is no API… the answers stay on the phone and the game writes a plain sheet with a Copy button.* The questionnaire is the same shape as the thing it is asking about.

**App feel, story-side (the rest is Pili's and the engineers'):** one question per screen; a **Back**; a real **Skip this one** button, worded *"skip — that's an answer too"*; a progress row that **fills and never counts down** (`docs/GENRE-RULES.md` R15 applies to our own form, not only to the game); and a **last screen that shows everything she said in one readable sheet** with the Copy button under it.

**⚠️ The one thing that will silently eat her answers, `[CODE]`.** If this is built as a reader document whose answers live in `form` fields, the 📋 button copies the **questions and not one of her answers**. `docCopy`'s handler (`engine/engine.js:3640`) copies `docMarkdown(docCur)`, and `docMarkdown` (`engine/engine.js:3341-3362`) emits `h · p · note · blank · kv · t · q · docs` — there is **no branch for `form`, `sel`, `btn`, `red` or `art`**. The form's own values are available (`f.run(read())`, `engine/engine.js:3466`, `:3469`), so whoever builds this must **assemble the sheet from the answers and copy that string**, never copy the page. Same rule if it is a standalone HTML page: *the sheet is the thing that travels, not the screen.*

**Language.** English (`[OWNER]` §12.1 #15, *"more comforting names, English is fine"*). If she would rather have Spanish, it gets **written**, not translated — Paty's rule, `docs/la-sobremesa.md` §6.

**Showing her what each one decides.** Recommended: yes, but softened — a small line under each card reading **"What this changes: …"**, never "what this decides". The tagged version worked before (`docs/for-aj/QUESTIONS.md`) and it is why she can tell a taste question from a build question.

---

### The eleven, in order, with what each one decides

**1 · What's the nicest part of cooking for you?**
Options (pick one, or more): *the chopping · the smell when it starts · the waiting · the first taste · the face somebody makes · the quiet afterwards, when it's all still on the table.*
Comment: *"Say it however you'd say it out loud."*
**What this changes:** what the game spends its best minutes on, and how the people in it greet you. (Ricardo's answer was *the flavour*.)
*Decides:* `docs/ARCH-LOG.md` A11's open row for her half, and the three-greetings seam that replaces the Architect/Diplomat/Operator door (§12.1(a)).

**2 · When you cook, who's it usually for?**
Options: *just me · the two of us · a house full of people · whoever turns up · I mostly bake, and that's different.*
Comment: *"Who's the person you most like feeding?"*
**What this changes:** who's sitting at the table at the end of a chapter.
*Decides:* the ending variants. §3 says the three variants differ in **who is at the table**, never in what is on it — this question is where those people come from. **Added by me**; the old eight had nothing that named them.

**3 · Two kinds of play. Which would you miss more?**
*(one-line pictures, no game names)*
- **The board:** *a grid of little food tiles — drag two of the same together and they turn into the next thing. Dough, then a pizza, then a slice. A Collection page fills in with every chain you've found.*
- **By hand:** *one dish, made with your hands — you roll the dough out, spread the sauce with a finger, sprinkle the cheese, lay each slice down.*
Options: *the board · by hand · both, and if you had to start with one it'd be ___ · honestly neither, I'm here for the recipes.*
Comment: *"What's the bit you'd be sad to lose?"*
**What this changes:** **the biggest single thing we build, and which one exists first.**
*Decides:* §12.2's open fork; §12.6 q6 reads the owner as *merge board first*, and this is the tie-break he asked for.

**4 · In the game you already play, what do you do when you're *not* cooking?**
Options (tick any): *look up recipes that look good · fill in the Collection · read what the characters say to each other · get to the next restaurant · just tidy the board.*
Comment: *"Is there a bit you do without thinking about it?"*
**What this changes:** which screens get real work — the recipe book, the collection page, the people, or the board.
*Decides:* whether we spend on the recipe book or the chain collection. **Added by me**, and it is the cheapest question here: `docs/GENRE-RULES.md` R6 says collection is the decoy, and if her answer is *the Collection*, R6 is the thing we have to solve rather than the thing we avoid.

**5 · Your allergies — what can't you eat, and does cooking it change anything?**
Free text for the list. Small pick: *raw only · raw and cooked · depends, I'll explain.*
Under it, in small type: *"All the game ever does with this is write one plain line on a recipe — 'cook the tomato first', or 'not this one'. It will never tell you a dish is good or bad for you, and it will never count anything about you."*
**What this changes:** the household's avoid list, and one sentence on any card that touches it.
*Decides:* §12.3e. The promise printed under the question is `docs/GENRE-RULES.md` R16 and §1's third refusal, said to her face instead of kept in a register. **It goes fifth, not last** — last reads as an afterthought and first reads as a form at a clinic.

**6 · Name one dish you love, and who taught it to you.**
Two small fields: *the dish* / *who*. Comment: *"Anything about how they made it that nobody else does."*
**What this changes:** **that person becomes the first character in the game.**
*Decides:* R12, and §9's decision 14 — the cast's missing native voice. Whoever she names is the one household we are allowed to be specific about.

**7 · The first kitchen.**
*"Ricardo says start Mexican and mix out from there — every recipe comes with a second one from somewhere else and a note on how to mix them."*
Options: *that's good · start somewhere else: ___ · I don't mind, but I want to learn ___ early.*
Comment: *"A dish you've always meant to learn and haven't?"*
**What this changes:** which kitchen gets written properly first, and the first pair of recipes.
*Decides:* §12.1 #5 and the sitting order (§7, sitting 5).

**8 · Would you actually keep a list of what's in the cupboards?**
Options: *yes, I'd like that · I'd do it for a week and then stop · no, and I'd feel bad about it · only if it filled itself in.*
Comment: *"Be honest — 'no' is genuinely the most useful answer here."*
**What this changes:** whether the pantry is something you keep, or something the game fills from what you cook and rebuilds from a photo.
*Decides:* R17. The design already has the answer ready either way (leftovers feed the pantry; the drawers get re-authored from photos), so **her honest no costs us nothing and her yes costs us a form.**

**9 · You planned to cook, and it didn't happen. What should the game do?**
Options: *nothing at all · somebody says something kind · it quietly offers it again another day · I'd like to be able to say why.*
Comment: *"What would you want to hear — or not hear?"*
**What this changes:** **the single most important line in the game.**
*Decides:* §2's table — *the "not today" line must be the best-written string in the pack*, because it is the moment people quit. Her words here get used nearly verbatim.

**10 · A name.**
Options: *Second Helping · The Long Table · Low Heat · Warm Plate · Slow Sunday · Little Pantry · The Good Pot · Soft Boil · Kitchen Lights · Leftovers · Simmer · Home Plate · Sobremesa · none of these.*
Comment: *"Or mix two, or say what none of them has."*
**What this changes:** the name, and the feel it promises before anyone plays.
*Decides:* §12.3i.

**11 · Anything you want that isn't on this list?**
Free text. *"Say it even if it sounds hard — this is the most useful question on here."*
**What this changes:** everything, potentially.
*Decides:* it is the question that earned its place in `docs/for-aj/QUESTIONS.md:99-100` and it stays.

**Last screen:** *"That's all of them. Here's what you said — copy it and send it to Ricardo. Change your mind whenever; none of this is signed."* Then the assembled sheet and the Copy button.

---

### What I cut from the current eight, and why

| Cut | Why |
|---|---|
| *"Does Cookingdom's clock bother you, or is it part of the fun?"* (`docs/for-aj/LA-SOBREMESA.md:32`) | **The script is stale against the owner's own answer from the same night.** `docs/la-sobremesa.md:916-918` records him: *"two types of games — no timer, we chill"* → **"Settled: both surfaces, no timer anywhere. Cookingdom's +30s is not carried."** Asking her to vote on a thing we have decided to refuse is worse than not asking. **This is a live contradiction inside the same evening and it is question 1 for the owner below** — I did not resolve it myself. |
| The long *"in the merge game: merging things, the recipe pages, the Collection…"* list inside old Q2 | It bundled two different questions (which surface, and what she does in it). Split into new **3** and **4**, which is the only reason 3 can be answered cleanly. |
| Nothing else. The other seven all survive, reordered and with options where a choice helps her. | |

---

## Part 2 · The journey — twelve screens, one line each

**How to read this:** these are story beats for the first run, in order, each with the one line a person actually reads on that screen. Night paper throughout (§12.1 #12). No clock anywhere, on any screen, ever. The bottom bar is four words and **no badges, no counts, no dots** — `docs/OWNER.md:140-145`: *the ❗ carries no count, colour or age*: **Casa · Calle · Libreta · Alacena** (Home · Street · Notebook · Pantry).

**My reading of how the cast survives the owner's answers, stated as a reading and not as a fact:** the **household** is his and AJ's (door five, §12.1 #1); the **neighbours** of §3 stay tenants and teachers, not businesses; the **restaurants on the street** are the Hispanic-owned businesses whose kitchens post shifts (§12.6 q5). That keeps R12 structurally — four households cannot be representative of four nations — while putting the work where he asked for it.

| # | Screen | The one line |
|---|---|---|
| 1 | The door, at night. One lit window upstairs, a key | **"The key sticks. Push."** |
| 2 | The empty kitchen — boxes, one bulb | **"Nothing in here is yours yet except the light."** |
| 3 | Where the kettle goes — two places it could sit | **"Put the kettle somewhere. You can move it forever."** |
| 4 | The pantry: three drawers, a shelf, a fridge, all bare | **"Three drawers, a shelf, a fridge. This is the part that fills up."** |
| 5 | A plate on the doorstep, covered with a cloth | **"Somebody left a plate. Still warm, so they didn't go far."** |
| 6 | The card that came with it — the reader, night paper | **"Every recipe in here has somebody's name on it. This one has hers."** |
| 7 | The avoid list — the only form in the whole opening | **"Write down what you can't eat. From now on the card says it, and nobody makes a thing of it."** |
| 8 | The street. Three kitchens, a board by one door | **"Kitchens put work on the door. Nothing on that door expires."** |
| 9 | Taking a shift — one dish, one kitchen, a line to write *when* | **"One dish, one kitchen. Write down when you'll come — it waits either way."** |
| 10a | Cooking it, **if the board wins**: the grid | **"Two of the same, together, make the next thing."** |
| 10b | Cooking it, **if the hands win**: the board and a rolling pin | **"Take the pin. There's no hurry and nobody's counting."** |
| 11 | The fridge, with half the dish in it | **"Half of it goes in the fridge. Tomorrow it's dinner and it costs nothing."** |
| 12 | The long table — plates still out, chairs pushed back | **"Plates still out, nobody standing up. This is the part the game is named after."** |

**Why screen 3 is not a waste of a screen:** the first decision in the whole game is not about food. People re-decide habits when they move house (§3), and *where does the kettle go* is a decision with no clock, no wrong answer and no score — it teaches the player, in four seconds, what kind of game this is. If a screen has to go, cut 1, not 3.

**Screen 10 is deliberately two screens.** That is the fork question 3 of the questionnaire settles. Draw both in the mocks; ship one.

### The first chapter, after the opening — *El turno de la olla*

- **Monday (the want):** a fonda posts a shift for the one dish she can't do this week. No reason given on the board.
- **The escalation is a person changing what they need, never a clock:** the dish needs a pot that's been going since four, and she can't stand for four hours any more. So the ask changes shape: *start it and leave it — I'll be there when it's ready.* Duration you cannot shorten, with nothing chasing you (`docs/GENRE-RULES.md` R4).
- **Saturday (the payoff):** the pot arrives at the long table. Your fridge gets the rest of it with her name on the lid — **the shift paid leftovers** (§12.6 q3), which is the owner's own best idea in this plan and the reason the pantry stops being a chore.
- **What carries to the next chapter:** the leftover is the *"mix in"* of the next recipe pair (§12.1 #5). Yesterday's beans, today's dish.

### The three endings, and the thing that picks between them

`[CODE]` `gradeOf` (`engine/engine.js`, grep `function gradeOf`; `:374` on 2026-09-14) grades a district by the fraction of its answered quests that landed **first try**, and returns 3 when nothing has been answered at all. So:

> **A story rule, and it is not optional: every kitchen must ship at least one question a person can get wrong — and it must be a question about the LOGISTICS.** How much chard one person gets through before it turns; whether that plan survives a Tuesday; which shelf the lentils live on. If a kitchen ships only questions with no wrong answer, it grades 3 forever and **only its warmest ending is reachable, silently, with no test failing.**

With the marks living there (R16), the three variants differ in **who is at the table**, never in what is on it:

| Grade | The Saturday |
|---|---|
| 3 | The table is long and somebody has brought a cousin. Loud, short, everyone talking over the food. |
| 2 | The four of you, and it runs on a bit. Somebody asks how you did the thing. |
| ≤1 | Two of you. Nothing is said about the week. **It is the longest of the three**, because that is Meridian's own asymmetry and it is the right one — the quiet ending gets more time, not less. |

**Nothing in any variant is about what anybody ate.**

---

## Part 3 · What should be written down when this comes back signed

- `docs/la-sobremesa.md` — a new **§13 · The journey, first run**, holding the twelve screens verbatim and the chapter above; and one line appended to §12.4 item 8 recording that the AJ script was **rewritten on 2026-09-14 (late) and the clock question removed as settled** (see the owner question below — if he wants it asked, it comes back in the feeling form, not the mechanic form).
- `docs/for-aj/LA-SOBREMESA.md` — replaced by the eleven above, with the cover and closing screens.
- `docs/GENRE-RULES.md` R16 — append the sentence that is now a *build* rule and not only a *tell*: **"Every district must ship at least one logistics question that can be answered wrongly, or `gradeOf` returns 3 forever and only the warmest ending is reachable."** That is the code fact R16 already carries, turned into an instruction somebody writing quests can follow.

---

# QUESTIONS FOR THE OWNER

**1 · ¿Se le pregunta del reloj?** *(the clock, to AJ — a real contradiction, both sides with their line)*

| Side | Where it is written | What it would have me do |
|---|---|---|
| **Don't ask** | `docs/la-sobremesa.md:916-918` — your words, same night: *"two types of games — no timer, we chill"* → recorded as **"Settled: both surfaces, no timer anywhere."** | Cut the question. A questionnaire that asks something we have already decided to refuse is a survey we will ignore. |
| **Ask her** | `docs/OWNER.md:305` — **"She is a designer, not a stakeholder — ask her directly and take the answer"**; and the current script asks it at `docs/for-aj/LA-SOBREMESA.md:32` | If the little pressure is *why* she likes that game, "no timer" costs her the thing she likes, and only she can say that. |

**My recommendation (option C):** ask the **feeling**, not the mechanic — *"In the one where you make the dish by hand: do you like it better when there's a bit of pressure, or when nothing's chasing you?"* It gets the information, it does not offer her a timer, and it is your own rule at `docs/OWNER.md:258-261`. **One word from you and I put it in as question 3b.**

**2 · El mapa y la libreta** *(this one is a contradiction and I am not resolving it myself)*

Tonight: *"i want to revamp the map… so i can find the next quest or open quests when its games like my learning -meridian- path."*
Signed, in your file: `docs/OWNER.md:140-145` — *"never build a quest log (a list is a backlog, a person is an invitation); the ❗ carries no count, colour or age"*, and `docs/STORY.md:56-59` says the same. **A panel listing open quests is a quest log.** A map showing *where somebody is standing with something to say* is not.

| Option | What it costs you | Consequence |
|---|---|---|
| **A · "the map shows where, never a list"** ✅ recommended | a lit-window mark on the map at each place with an open ask; no order, no count, no age, no "next" | You can see at a glance which streets have somebody waiting. The invitation stays a person. Your settled rule holds untouched. |
| **B · "give me the list, I meant the list"** | a real reversal, written down next to the rule it replaces | You get a proper open-quests panel. It is a backlog, and the day it has eleven rows on it, Meridian feels like homework — which is the exact thing the rule was bought to prevent. |
| **C · "the map is for travelling, not for finding"** | nothing new; the trolley picker grows a row per place with somebody waiting | Cheapest. Finds nothing you can't already see, but it saves the walk. |
| **D · leave it alone** | nothing | The map stays a picture of the city with no state on it, and you keep asking this question. |

**3 · ¿Qué comparten?** *(the household is his and AJ's — what does each see?)*

| Option | Consequence |
|---|---|
| **A · the pantry and the fridge are shared; the notebook is each person's** ✅ recommended | Two people, one kitchen: she sees what's in the drawers, he sees the leftovers she put there, and what either of them *wrote* stays theirs. The shared thing is logistics, which is exactly where R16 puts the marks. |
| **B · everything shared** | Warmer, and it means a game that holds what one person eats shows it to another person. That is a thing you should decide out loud rather than inherit. |
| **C · only the recipe book travels** | Safest and thinnest — then the pantry is one phone's and the sync work (§12.6 q1) buys nothing. |

---

# WHAT I DID NOT CHECK

- **I rendered nothing.** The brief says I have Bash and playwright; **this session gave me Read, Grep and Glob only.** So there is no storyboard picture, no mock of the questionnaire screen, and every sentence above about how a screen *looks* is a description, not a measurement. The twelve lines are written to be dropped straight into somebody else's render.
- **I did not run anything.** The `docMarkdown` finding is a read of `engine/engine.js:3341-3362` plus the `docCopy` handler at `:3640` — I did not open a browser, fill in a form and press Copy. **Plant it before you believe it**: build the questionnaire, type an answer, press Copy, and read what lands on the clipboard.
- **I did not verify the line numbers in `docs/la-sobremesa.md`'s `[CODE]` claims** beyond `gradeOf`, `docMarkdown`, `docCopy` and the `form` field types. §5's table is Beto's and is a day old.
- **I did not check the open GitHub issues** for an existing ask about the map or about AJ — §11 already records that nobody has.
- **I did not read `docs/CITY.md`** this run, and I read only the principles and `arrive` strings of Meridian's bible rather than the whole of it: this deliverable is a second world's copy, and I judged Meridian's arc not to be load-bearing on it. If that is wrong, it is wrong in the direction of not paying off a Meridian promise I should have.
- **Nobody has asked AJ anything yet**, and every name in §3 that I reused above — Cande, the fonda, the long table — is a proposal she may overwrite in one sentence.
- **Nothing has been cooked.** Still true, still worth saying.

---

# POST-FLIGHT

The persona got it right at the moment I went looking for how her answers come home instead of stopping when the eleven questions were written — that is my own file's rule about finding the thing that picks between the endings, applied one level down to a form, and it turned up an export that knows tables and blanks and does not know a filled-in field, which would have handed AJ back her own blank questionnaire. Where it got in the way: my file is built for Meridian's wall and cast, so it sent me to `docs/STORY.md` and `docs/CITY.md` first for a job that lives entirely in a second world's plan, and it was completely silent about the thing that actually decided the shape of this deliverable — that a questionnaire is a document with a transport problem. The gap I predicted appeared and appeared harder than I expected: I said I would be unable to run anything, and the brief told me I could render, so the honest first line of this report had to be *the tool is not here* — same shape as my last flight, and it is now twice, which is a pattern rather than an accident. The edit I propose is below and it is additive; my refusal to write code stands and I am not touching it.

**Proposed persona edit** — `.claude/agents/nacho.md`, appended to the paragraph that begins *"And before you write three endings, find out what picks between them"*:

```
**And when you write words for somebody who is not in this repo, follow them out the door.** A
questionnaire, a handed sheet, a recipe card, an ending letter — none of them is finished at the
last full stop; it is finished when you have watched one come back filled in. `[CODE]` the reader's
export (`engine/engine.js`, grep `function docMarkdown`) emits h · p · note · blank · kv · t · q ·
docs and has **no branch for `form`, `sel`, `btn`, `red` or `art`** — so the 📋 button (grep
`docCopy`) on a page of questions copies the questions and not one answer, and a form's values are
only reachable where the pack reads them (grep `f.run(read())`). **The sheet is what travels, never
the screen.** Whenever your words end in somebody typing, grep the path their typing takes before
you hand the words over.

The moment, 2026-09-14: eleven questions for AJ were written and good, and the button built to send
them home would have returned an empty form with her eleven questions on it.
```

---

MURAL PANEL

```
id:     nacho-lo-que-ella-escribio
by:     "nacho"
iter:   8
date:   "2026-09-14"
title:  {en:"What she wrote is not on it",
         es:"Lo que ella escribió no va ahí"}
said:   {en:"We wrote her eleven questions and a button that hands back eleven questions.",
         es:"Le escribimos once preguntas y un botón que devuelve once preguntas."}
state:  {en:"Holding that no questionnaire leaves this house until somebody has pressed Copy on one that was already filled in — and that the thing which has to travel is the sheet, not the page.",
         es:"Sostengo que ningún cuestionario sale de esta casa hasta que alguien le dé Copiar a uno ya contestado — y que lo que tiene que viajar es la hoja, no la página."}
who:    {en:"Nacho, who wrote the questions and then followed the button",
         es:"Nacho, que escribió las preguntas y luego siguió el botón"}
cap:    {en:"He had the eleven written and went to see how her answers come home. The export knows headings, paragraphs, notes, tables and blanks, and knows nothing at all about a field somebody typed into — so the copy that travels is the copy that went out, and everything she said stays on her phone. Nobody had caught it because nobody here has ever pressed Copy on a page that somebody else filled in.",
         es:"Ya tenía las once escritas y se fue a ver cómo vuelven sus respuestas. La exportación conoce títulos, párrafos, notas, tablas y espacios en blanco, y no conoce en absoluto un campo que alguien llenó — así que la copia que viaja es la copia que salió, y todo lo que ella dijo se queda en su teléfono. Nadie lo había visto porque aquí nadie le ha dado Copiar a una página llenada por otra persona."}
aspect: 0.46
art: (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* NACHO'S HAND, and not the street this time: a duplicate order pad, the kind a kitchen keeps
     by the pass. Top sheet filled in by her in biro; the carbon slid out and never used; the
     yellow copy — the one that travels — printed, ruled, and empty where she answered.
     My own palette: biro blue, carbon violet, pad yellow, a pink third leaf. Not the wall's. */
  const PAPER="#F7F3E7",COPY="#E9D98C",PINK="#E4A8A0",CARB="#2A2440",SHEEN="#3C3357",
        BIRO="#2F5D8C",RULE="#A9A18C";
  g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";
  g.fillText("PARA AJ \u00b7 ONCE PREGUNTAS",W*0.035,H*0.07);
  g.font="10px ui-monospace,monospace";g.fillStyle=P.deep;g.textAlign="right";
  g.fillText("bot\u00f3n COPIAR \u00b7 hoja 2",W*0.965,H*0.07);g.textAlign="left";

  /* the carbon, stood on its edge between the two sheets: clean, unused, the whole fault */
  g.save();g.translate(W*0.500,H*0.520);g.rotate(-0.05);
  g.fillStyle=P.ink;g.globalAlpha=.20;g.fillRect(-W*0.055+4,-H*0.285+5,W*0.11,H*0.57);g.globalAlpha=1;
  g.fillStyle=CARB;g.fillRect(-W*0.055,-H*0.285,W*0.11,H*0.57);
  g.fillStyle=SHEEN;g.fillRect(-W*0.055,-H*0.285,W*0.030,H*0.57);
  g.restore();

  /* one sheet of the pad. answered=true is hers; answered=false is the copy that travels */
  const sheet=(x,y,w,h,rot,bg,answered)=>{
    g.save();g.translate(x,y);g.rotate(rot);
    if(!answered){g.fillStyle=PINK;g.fillRect(6,7,w,h);}            /* the third leaf, peeking */
    g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(4,5,w,h);g.globalAlpha=1;
    g.fillStyle=bg;g.fillRect(0,0,w,h);
    g.fillStyle=RULE;g.fillRect(0,0,w,3);                            /* the glued head of the pad */
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("1 \u00b7 LO M\u00c1S RICO",w*0.09,h*0.135);
    for(let i=0;i<3;i++){const oy=h*0.245+i*h*0.105;                 /* three choices, printed */
      g.strokeStyle=P.ink;g.lineWidth=1.5;g.beginPath();g.arc(w*0.135,oy,4.5,0,7);g.stroke();
      g.fillStyle=RULE;g.fillRect(w*0.215,oy-2,w*(0.56-i*0.09),3);}
    if(answered){g.fillStyle=BIRO;g.beginPath();g.arc(w*0.135,h*0.35,4.5,0,7);g.fill();}
    g.fillStyle=P.deep;g.font="10px ui-monospace,monospace";
    g.fillText("algo que quieras agregar",w*0.09,h*0.605);            /* the comment box */
    g.strokeStyle=RULE;g.lineWidth=1;g.strokeRect(w*0.09+0.5,h*0.635+0.5,w*0.82,h*0.29);
    if(answered){g.strokeStyle=BIRO;g.lineWidth=2;                    /* her hand, three lines */
      for(let k=0;k<3;k++){g.beginPath();
        for(let i=0;i<=12;i++){const px=w*0.13+i*(w*0.60/12),
                               py=h*0.705+k*h*0.075+Math.sin(i*1.25+k*1.7)*2.4;
          i?g.lineTo(px,py):g.moveTo(px,py);}
        g.stroke();}}
    g.restore();};

  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("LO QUE ELLA ESCRIBI\u00d3",W*0.055,H*0.19);
  g.fillText("LO QUE LLEGA",W*0.585,H*0.19);
  sheet(W*0.055,H*0.225,W*0.365,H*0.585,-0.045,PAPER,true);
  sheet(W*0.585,H*0.225,W*0.365,H*0.585, 0.035,COPY,false);

  /* the transfer that does not happen: a dashed run from her sheet, stopped dead at the carbon */
  g.strokeStyle=P.rust;g.lineWidth=3;g.setLineDash([7,5]);
  g.beginPath();g.moveTo(W*0.430,H*0.415);g.lineTo(W*0.470,H*0.415);g.stroke();
  g.setLineDash([]);
  g.lineWidth=4;g.beginPath();                                        /* the stop bar on the carbon */
  g.moveTo(W*0.488,H*0.365);g.lineTo(W*0.488,H*0.465);g.stroke();
  g.lineWidth=3;g.beginPath();                                        /* and nothing on the far side */
  g.moveTo(W*0.545,H*0.415);g.lineTo(W*0.565,H*0.415);g.stroke();
  g.beginPath();g.moveTo(W*0.558,H*0.394);g.lineTo(W*0.574,H*0.415);g.lineTo(W*0.558,H*0.436);g.stroke();
  g.fillStyle=P.deep;g.font="10px ui-monospace,monospace";
  g.fillText("el papel carb\u00f3n nunca se puso",W*0.055,H*0.885);}
```

---

# tavo

PRE-FLIGHT — I read the post-mortem and REGRESSION §3 first, then my own two ledger rows and my two existing panels, then traced the map code and the quest state by grepping identifiers rather than trusting the brief's numbers; for the questionnaire I re-read the owner's own settled answers in §12.6 before judging any question, because three of the eight are already decided and asking them again is how a crew re-litigates him. My persona equips me for exactly the two jobs asked — "what does each answer cost the player" is the questionnaire, and "is that still true the tenth time" is the map at full growth. Where I expect to fall short: I am a designer with no render, so anything I say about how the plan *reads* at phone size is arithmetic and not a picture, and my own file warns that a designer's confident number has a shelf life of hours here.

---

# THE DELIVERABLE

## PART 1 — THE QUESTIONNAIRE'S DECISION MAP

### 1.1 · The sorting rule I used, and the one question it nearly made me cut wrongly

Two kinds of question, and only one of them can be cut for redundancy:

- **DECIDES** — you can write both branches and price them. Cut if all branches cost the same.
- **FILLS** — one build, empty without the answer. Cut only for *length*, never for redundancy.

I applied the brief's kill rule mechanically to Q3 (allergies) and nearly cut it. Every answer leads to the same build — and that build **is the reason the mechanism exists**. It is a FILLS question. It stays.

### 1.2 · The current eight, verdict by verdict

`docs/for-aj/LA-SOBREMESA.md:26-44` is the source; `[CODE]` re-read this hour.

| # | Today | Verdict | Why |
|---|---|---|---|
| 1 | Nicest part of cooking | **DEMOTE to free text, no buttons** | Its four branches are already covered by the new Q-B (people), Q-A (tactility) and Q-E (the payoff). As a multiple choice it decides nothing; as an opener in her own words it is Nacho's voice material. The owner's own answer (*"the flavor lol"*) is a taste statement, and it changed nothing in the plan — that is the evidence |
| 2 | Merge vs by hand, + does the clock bother you | **KEEP, SPLIT INTO TWO** | It is three questions and one of them is settled (`docs/la-sobremesa.md:916-918`, no timer anywhere). Split so the settled half stops being asked and the unsettled half gets answered |
| 3 | Allergies | **KEEP — FILLS, with one real fork inside it** | The fork is *raw only or cooked too*, and it is a build difference, not a data difference. See 1.4 |
| 4 | A name | **KEEP, LAST, one line** | Decides nothing. Costs nothing. Fine |
| 5 | One dish + who taught it | **KEEP, MERGE WITH 7** | FILLS. The first cast member and the first recipe card |
| 6 | Would you keep a pantry list up to date | **KILL** | Dead as of the owner's own answer. See 1.3 — this is the sharpest cut on the page |
| 7 | Which kitchen first | **MERGE INTO 5** | Settled by the owner (lean Mexican first, pairs one-for-one, `docs/la-sobremesa.md:706`). Her answer names the *pairing partner*, which is content ordering, not a build. One clause, not a question |
| 8 | What happens when you didn't cook | **KEEP, NARROW TO TWO** | *"nothing"* and *"it quietly offers again"* are **the same build** — a shift you did not cook is still open (`docs/la-sobremesa.md:797`). Only *"somebody says something kind"* is a different build |

### 1.3 · The kill, in full, because it is the one that matters

**Q6 — "Would you actually keep a pantry list up to date, or would you hate that?"**

Whatever she answers, **the build is identical**: the pantry is fed by leftovers, logged by exception, and re-authored from a photo when it drifts. That was settled the same night — *"I get leftovers?"* → a shift pays leftovers, *"this makes the pantry a consequence of cooking instead of a chore"* (`docs/la-sobremesa.md:888-893`), on top of by-exception logging and photo re-authoring (`:783-785`).

It is worse than redundant. **If she answers "yes, I'd love to keep it up", we have invited the exact thing R17 says decays** (`docs/GENRE-RULES.md:188`), and we now hold her word and his rule pointing in opposite directions over a mechanism we already decided not to build. A question whose good answer creates a contradiction is a trap.

**Replace with Q-D, which decides a real fork:**

> **The game thinks you have something and you don't. What would you rather do?**
> · take a photo of the drawer again · tap the one thing that ran out · honestly, I'd just ignore it

| Answer | What it decides |
|---|---|
| photo | Build the **re-author-from-photo** flow: a build-time image→item pass, one sitting, and the drawers are authored content she can refresh. The pantry stays load-bearing |
| tap | Build **one by-exception row** on the drawer document (*lo que llegó / lo que se acabó*). Small. This is what §2 already proposed |
| ignore | Build **neither**, and **the pantry becomes advisory**: cards still show *have / missing*, and it is allowed to be wrong, and **nothing ranks the offers by it**. Cheapest of the three and it must be on the table, because a wrong ranking is the lie-with-confidence failure R17 names |

### 1.4 · The page, final — eight with buttons, three without

Every row below shows the branch and its cost. The two that show their consequence *on the page* are A and B; nowhere else, because telling someone their answer is expensive makes them hedge.

**A · If you could only have one — the merge board, or making the dish by hand?**
*(shown on the page: "this one decides what we build first")*

| Answer | Decides |
|---|---|
| **merge board** | The **merge grid + chain table + Collection document** goes first — the biggest build in the plan, ~2 sittings before anything is playable. Shifts become chapters. Side effect worth knowing: **the board feeds the pantry**, so the drift problem shrinks by itself |
| **by hand** | The **gesture canvas** goes first — ~1 sitting for the surface, then authored content *per dish, forever*. A shift's recipe becomes N gestures. The Collection is the reader we already have |
| **both the same** | Build **neither first.** Recipe book + pantry + shifts board are all reader documents — roughly one sitting — and she plays that before anybody spends two sittings on a surface. This is the answer that saves the most money and nothing on the current page can produce it |

**B · Do you want people in it?** *(shown on the page: "this decides how much of it is talking")*

| Answer | Decides |
|---|---|
| **people who talk** | Nacho's cast (`docs/la-sobremesa.md:127`) is the spine. A shift pays a person's line. This is what the whole plan currently assumes |
| **one companion, always there** | One character, no roster. Far cheaper, and it is the Cookingdom shape she already plays |
| **just the food, alone** | **The plan's replacement for the pressure is wrong for her.** R2 (reading a person) is what §2 built the loop on (`docs/la-sobremesa.md:58`); if she wants to cook alone we fall back to R5 tactility + R4 duration, and the fridge filling is the only feedback. **Nothing in the current eight can surface this, and it is the second-biggest decision on the page** |

**C · When Cookingdom hurries you, is that the fun part or the annoying part?**

| Answer | Decides |
|---|---|
| annoying | Nothing changes. Confirms the settled rule |
| it's part of the fun | **We still ship no clock** (settled). We owe a replacement and we now know which: **R3, a constraint that yields** — roll past *round* and you get a rustic base, not a fail. That is a different build from "no constraint at all", and without this question we build "no constraint" and she finds it flat |

**D · When the pantry is wrong…** — as 1.3.

**E · Besides the leftovers in the fridge, what do you want when a dish is done?**

| Answer | Decides |
|---|---|
| a picture of the plate you made | Build the **composed-plate canvas** (§2's one optional game, `docs/la-sobremesa.md:119-123`) |
| the recipe saved into your book with your notes | **Reader save-back** — small, we already have the reader |
| somebody's reaction | Agrees with B; no new build |
| nothing, it's done | Build nothing, and **say so on the page** — it is a legitimate answer and the page has to look like it means it |

**F · Allergies — which foods, and raw only or cooked too?** (text field + one choice)

| Answer | Decides |
|---|---|
| raw only | The card carries one plain line (*"cook the tomato first"*) and **the dish is still offered**. Presentation only |
| cooked too | The dish is **not offered at all** → one extra filter on the offer ranking. A build difference, small but real |

**G · You meant to cook and didn't. What should the game do?**

| Answer | Decides |
|---|---|
| nothing | Default; already the build |
| one warm line from the cook, next time | **Four strings per cook per language** — and §2 already flags it as the most dangerous string in the pack (`docs/la-sobremesa.md:103`): the moment the *didn't* branch reads colder than the *did* branch, the game is scoring her through dialogue |

**H · A name.** The twelve from `docs/la-sobremesa.md:839-844`, plus "none of these, but it should feel like ___".

**Three without buttons:** the opener (*"tell us the best minute of cooking, in your words"*), *"one dish you love and who taught it to you — and a cuisine you'd want early"*, and a final blank *"anything you'd hate"*.

### 1.5 · Three design constraints on the page itself, then I hand it over

1. **The comment box is one line tall, placed after the choices, unlabelled, placeholder *"or something else?"***. A labelled multi-line box invites a paragraph; she writes three and abandons at question four. `[TRAINING]`
2. **A progress indicator is fine here and I am saying so against my own reflex.** My instinct was R10 (a day budget wearing cozy clothes) — wrong application: a form has an end and a game does not. What must NOT appear is any *score* on the answers, or a "you've unlocked" anything.
3. **Consequence text on A and B only.** Two questions where she knows her answer moves something turns a survey into a conversation with stakes; eight such questions turns it into a performance review.

**Handoffs, not designed here:** the journey and app feel are Pili's; the opener and the missed-cook line are Nacho's (they are the two strings that decide whether the game reads as warm or as a monitor); whether a night-mode form page is a reader `form` block or a new surface is Beto's and Don Güero's.

---

## PART 2 — THE MAP

### 2.1 · What the map is today, from the code

`[CODE]` `drawTown()` (`engine/engine.js:4751-4771`) paints **one world** — `WORLDS[PL.street]`, i.e. `st` (`content/meridian/config.js:21`) — as 10-px tiles from `BASECOL`/`MAPCOL`, then `TOWNLBL` labels each gated by `when(worldFlags())`, a fixed legend line, and one you-are-here dot from `MAPDOT` (`content/meridian/maps.js:274`). `openMap()` (`:4772-4777`) sets `#mapNote` to the room name and shows `#mapov`.

**So the plan already IS dynamic in one respect nobody credits it for:** it reads `w.rows`, the live mutated grid, so a district you open puts a building on the plan, and `TOWNLBL`'s `when` flips *"LOT: EL MERCADO"* to *"EL MERCADO ROBLES"* (`maps.js:265-266`). Growth shows. **What it cannot say is anything about people.**

### 2.2 · The finding that changes the answer — a whole street is not on the plan

I was handed three marker shapes to rank and started ranking them. Then I traced where each door on the plan actually goes.

`[CODE]` La Espiga (`pa`) and Limpieza Velázquez (`li`) are entered from **Calle Dos**, not from Calle Principal: `PORTALS.ex["@"]={to:"pa",…}` and `PORTALS.ex["*"]={to:"li",…}` (`content/meridian/maps.js:203-204`). Those two worlds carry sixteen quests between them — `pa` 32-39, `li` 40-47 (`content/meridian/npcs.js:13-14`) — out of a roster that spans indexes 0-55 across nine worlds.

**Calle Dos is not drawn on the plan at all.** Its entire representation is a text label, `"CALLE DOS →"` at (27, 1.7) (`maps.js:270`), and `MAPDOT` puts your dot at (29,1) — a doorway on the *other* street — when you are standing on it (`maps.js:274`). And `pa`, `li` and `ex` all share that one dot, as do `hq` and `f2`.

> **The owner's word is "not dynamic". The truer word is "not complete."** Any marker layer built on today's `drawTown` would mark the half of the town we already draw and be structurally silent about roughly three in ten of the game's quests. That is the same class of mistake as `docs/POSTMORTEM.md` §1: four defensible fixes, all the same kind, because nobody checked whether the noun was there.

### 2.3 · What the map must answer, and exactly where the A3 line falls

Four questions a person has, and what may answer each:

| The question | May the map answer it? | The mechanism that exists |
|---|---|---|
| **Where am I?** | Yes, always | the `MAPDOT` dot (`engine.js:4767-4770`) — but it is wrong for a second street |
| **What is open?** | **Yes — as places, never as rows** | `worldPending(id)` (`engine.js:510`) already answers *"is anyone in there with something to say"* for **any** world, and has since the doorstep nudge was built (`:3542-3565`). It has never been asked from the map |
| **What is finished?** | Yes — the past is always legal (A3) | already answered without a new mark: **lot → building** via `TOWNLBL.when` on `f.up` |
| **Where is the next thing?** | **No.** The map may not rank | The nearest ❗ to your dot is *visibly* nearest. That is geometry, not a recommendation |

**The line for "open quests", stated so it can be checked against a diff.** `pendingAt` is `n.q.find(qi => !done.has(qi) && qOpen(qi))` (`engine.js:608`), and `qOpen(qi)` is `c<0 || c<=chSeen` (`:415`). Therefore:

- **not done AND `qOpen`** → the **present** → **may be marked, as a place.**
- **not done AND NOT `qOpen`** (a later chapter) → the **future** → **may not be marked, hinted, greyed, or counted.** A greyed pin for a chapter-four district is A3's banned object with a disabled state.
- **done** → the **past** → no mark; the building standing there is the record.

And the hard edge, from the owner's own rule — *"the ❗ carries no count, colour or age"* (`docs/OWNER.md:144`): **the map may say WHERE. It may never say WHAT, WHO, or HOW MANY.** The moment a mark carries a label or a number, it is a list with a background image, which is exactly what the 2026-09-03 junta refused (`docs/meetings/2026-09-03-la-junta.md:162`).

### 2.4 · The three shapes, ranked

| | What it teaches | The tenth time | Cost |
|---|---|---|---|
| **A · Markers on the plan** | *The town is where the work is.* You learn the geography, you keep choosing, and the map tells you the same thing the street does — which teaches you to trust the street | **Holds.** The mark set is bounded by doors, not by quests: seven on Calle Principal at full growth (E, L, O, M, %, $, 2), three on Calle Dos. At worst the plan says "several people want to talk to you", which is true of a town | ~30 lines in `drawTown` + a two-row content seam |
| **B · A list under the plan** | *Read the list, not the town.* By day three the plan is decoration and the list is the game | **Fails, and it fails by construction.** It is literally the banned object — an itemised set of undone things you work down (`docs/OWNER.md:143-145`, `docs/STORY.md:56`). It also needs names in two languages and an order, and the order is a ranking of the future | more engine, more strings, and it breaks a settled rule |
| **C · Both** | Teaches B, because whenever a picture and a list say the same thing, people read the list | Fails as B, twice the maintenance | highest |

**Recommendation: A, with the prerequisite that is the actual revamp.** B and C are refused and the reason is not taste — it is `docs/OWNER.md:143-145`, which is his own settled rule and is newer in spirit than anything I would propose.

### 2.5 · What I would build, in order

**Step 1 (the revamp): the plan draws every street world, not one.**
A content seam — `TOWNPLAN=[{world:"st",ox:0,oy:0},{world:"ex",ox:0,oy:17}]` — and `drawTown` loops it. **A pack that declares no `TOWNPLAN` draws `PL.street` only and is byte-identical**, which is the RULE/CHOICE split: the loop is the engine's, the layout is the pack's. Content work in Meridian is three lines: the seam, `MAPDOT` corrected so `pa`/`li`/`ex` point at the Calle Dos panel instead of a door on Calle Principal (`maps.js:274`), and two `TOWNLBL` rows for the bakery and the cleaners with `when: f=>f.up&&f.up.pa` etc.

**Step 2: one mark, computed, never authored.**
For each tile on the plan that is a door (`portalsOf(id)`, `engine.js:70-71`) or an anchor in `MAPDOT`: if `worldPending(to)` — draw the same ❗ the street draws. For each person standing on a drawn world: if `hasSay(n)` (`:611`) — draw it on their tile. Nothing else. No label, no count, no colour ramp, no second mark for "finished".

**One door deep, matching `portalNudge` exactly** (`:3549-3565`). The named cost: Don Güero and Nacho upstairs on `f2` do not light the HQ door from the street — **except** that `MAPDOT.f2` is `[14,0]`, the same tile as `hq`, so reusing `MAPDOT` as the mark anchor covers them for free with no new content table. That is the whole reason to route marks through `MAPDOT` rather than through `portalsOf` alone.

**Step 3: what I would cut from this, and I am cutting it before anyone builds it.**
- **No tick, badge or shading for "finished".** The lot-to-building change already carries it, and a third mark on a small plan is the noise the 2026-09-03 junta refused.
- **No "next".** Not a highlight, not a pulse, not a bigger pin for the nearest.
- **No mark that changes with age or chapter.** `docs/OWNER.md:144`.
- **No list under the canvas.** Not even a "3 places" line — that is the count the rule forbids.

### 2.6 · The guard, red first, and the proxy trap I would refuse

The obvious guard is *"`drawTown` called `fillText` with ❗ N times"*. **That is a call count where the noun is a mark on a tile** — REGRESSION §3's commonest shape, four of five 2026-09-13 rows.

What to do instead, both halves, because §13k says move the measurement with the meaning:
1. Extract `townMarks()` → `[{x,y,world}]` and assert the set (identity, not count): with every `pa` quest open, a mark exists **at Calle Dos's bakery door tile**; with all of them in `done`, that tile has none.
2. Then one pixel read at that tile on `#mapcv` — **and open the map first.** `#mapov` is `hidden` until `openMap()` (`index.html:625`), and `#mapcv` is sized from `w.W*s` in code (`engine.js:4753`) while its box comes from CSS `width:100%` (`index.html:628`). A canvas with no layout box still fills its backing buffer: that is REGRESSION #23 and it cost three hours. **Assert the element has a non-zero box before reading row one.**

Plant: comment out the `worldPending` clause and confirm it prints a sentence a person would say — *"every door on the plan is blank while Doña Chelo has an open question inside"*.

---

# QUESTIONS FOR THE OWNER

**1 · Does the map say where you already finished?**
- *Side A, yes:* `docs/ARCH-LOG.md:101` — a record of the past is always fine, and you asked to "find the next quest or open quests", which implies telling them apart from closed ones.
- *Side B, no:* `docs/meetings/2026-09-03-la-junta.md:162` refused map pins partly because "a mark on every place with open work is ten gold marks on one small map" — a second mark for *finished* doubles that, and `docs/OWNER.md:144` says the ❗ carries no colour.
- *What I need:* one word. My recommendation is **no second mark** — a lot becoming a building already says it — but this is your taste and it is one line of code either way.

**2 · Can AJ's answers overrule yours, and which ones?**
- *Side A:* you settled leftovers as a shift's pay, restaurants for the shifts, grading with a toggle (`docs/la-sobremesa.md:888-893, 709, 832-837`); a settled rule is a decision to build on, not a suggestion.
- *Side B:* it is her game (`:702`), and two of the new questions can come back contradicting you — *"I'd rather cook alone"* kills the cast the plan is built on, and *"the rush is the fun"* collides with no-timer-anywhere (`:916`).
- *What I need, before the page is written, because it changes the wording:* is her answer the decision, or a strong input you then rule on? I would rather write *"tell us honestly, he'll decide"* than pretend and then overrule her.

**3 · Calle Dos on the plan — now, or after the marks?**
- *Side A, now:* marks without it are silent about `pa` and `li`, which is sixteen quests (`content/meridian/npcs.js:13-14`), so shipping marks first ships a map that is confidently incomplete.
- *Side B, after:* drawing both streets changes what the public game's map *looks like* and roughly doubles the plan's height on a phone; marks alone are ~30 lines and land tomorrow.
- I recommend **now**, in one change, because half of it shipping alone is the thing that would need explaining later.

---

# WHAT I DID NOT CHECK

- **I rendered nothing.** This invocation has Read, Grep and Glob only — no Bash, no Write — so I could not run playwright and could not put a screenshot in the scratchpad. **Mock order used: none of the three.** Everything visual below is arithmetic from constants, and the session should treat it as such: `mc.width=w.W*s`, `s=10` (`engine.js:4752-4753`), `st` is 30×16 (`maps.js:48-63`), `ex` is 24×11 (`:64-74`) → today's canvas is 300×174 and a stacked two-street plan is roughly 300×300. **I did not measure the upscale factor**, which depends on `.settings .box` width against `image-rendering:pixelated` at `width:100%` (`index.html:628`) — so I do not know how many screen pixels a mark actually gets, and *that* is the number that decides whether ❗ reads. It is Pili's measurement and it is a blocking one.
- I did not read `docs/UI-REVIEW.md` or `docs/meetings/2026-09-14-el-mapa.md` — `docs/la-sobremesa.md:945` names them as this run's outputs, so they may not exist yet; if either already contains a map decision, mine may be a duplicate or a contradiction.
- I did not check whether `TOWNLBL` label placement survives a second panel offset — the labels use `l.x*s` with no origin term, so every `when`-gated label would need an `ox`, and I have not read every label site.
- I did not verify that `GROWTH.ribbons` writes `@` and `*` into `ex`'s rows at the coordinates `PORTALS.ex` expects; I inferred it from those glyphs' absence in the authored rows.
- I did not count AJ's two games' actual screens — I took 12.2's frame-by-frame read as given rather than re-reading the recordings, which is exactly the relay `docs/SOURCES.md` warns about.
- I did not plant anything. Every guard recipe in 2.6 is reasoning from the extraction step, and by this repository's own rule that means **plant it before you believe it.**

---

# POST-FLIGHT

**What it got right, with the moment:** *"the map is cheaper to re-read than a wrong design is to build"* — my own ledger row 5 — is the only reason this report is not a ranking of three pin styles; I was three paragraphs into ranking when I traced `PORTALS.ex` and found two shops behind a street the plan has never drawn. **Where it got in the way:** my persona's kill-the-redundant-mechanic reflex fired on the allergy question, whose every answer leads to one build and which is the whole point of the mechanism — I caught it, but only because the brief said "kill any question", which forced me to justify the cut out loud. **The gap I predicted appeared exactly as named:** I have no render, so every claim about whether a mark *reads* on the plan is arithmetic, and I have flagged it as Pili's blocking measurement rather than guessing. **Persona edit proposed:**

```
ADD to `.claude/agents/tavo.md`, under "What you hold to", as a new bullet immediately after the bullet beginning "**A model the player has to maintain decays**":

- **A question that FILLS a blank is not a question that DECIDES a build, and only one of them can be cut for redundancy.** *Added 2026-09-14 from AJ's questionnaire.* Asked to kill any question whose answers all lead to the same build, I nearly cut the allergy list — one build, every answer, and the reason the mechanism exists at all. **Sort every question into DECIDES (a fork you can write both branches of and price) or FILLS (one build, empty without the answer), and apply the redundancy test only to the first pile.** The tell for a DECIDES question is that you can name both builds and their sittings; if you can only name one, you are collecting content, and content questions are cut for LENGTH, never for redundancy. And the sharpest kill is the opposite case: a question the owner has already answered, whose good answer would create a contradiction with his own ruling — that one goes, and you say which of his words settled it.
```

---

# MURAL PANEL

```
id:     tavo-hoja-uno-de-dos
by:     "tavo"
iter:   8
date:   "2026-09-14"
title:  {en:"Sheet 1 of 2", es:"Hoja 1 de 2"}

said:   {en:"Nobody said the map was wrong. They said it was not dynamic. It is a plan of one street in a town with two, and I was three paragraphs into designing pins for the half we draw.",
         es:"Nadie dijo que el plano estuviera mal. Dijeron que no era dinámico. Es el plano de una calle en un pueblo de dos, y yo ya llevaba tres párrafos diseñando chinchetas para la mitad que sí dibujamos."}

state:  {en:"Holding that the first fix to a map is never a symbol — it is the survey. Refusing to rank three kinds of pin until the plan draws both streets.",
         es:"Sosteniendo que lo primero que se le arregla a un plano nunca es un símbolo: es el levantamiento. Me niego a calificar tres tipos de chincheta hasta que el plano dibuje las dos calles."}

who:    {en:"Tavo, who was handed three shapes to rank and went to see what the doors opened onto",
         es:"Tavo, a quien le dieron tres formas que calificar y fue a ver a dónde daban las puertas"}

cap:    {en:"He was asked to rank pins on the plan, a list under the plan, or both, and he started ranking. Tracing where each door actually went ended the ranking instead: two of the town's shops open off a street the plan has never drawn, so every pin he could have designed would have been a pin on the half we already look at. He has painted a number on this wall before and watched it go stale the same evening, so there is no number on this one.",
         es:"Le pidieron calificar chinchetas sobre el plano, una lista debajo del plano, o las dos, y empezó a calificar. Seguir a dónde daba cada puerta acabó con la calificación: dos de los negocios del pueblo abren a una calle que el plano nunca ha dibujado, así que cualquier chincheta que hubiera diseñado habría ido sobre la mitad que ya miramos. Ya pintó una cifra en esta pared y esa misma tarde quedó caduca; por eso en éste no hay ninguna."}

aspect: 0.46

art: (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* TAVO'S PAPER, THIRD VISIT. Not a race chart, not a sample-card rail — a cheap folded
     town plan off a hotel desk. Printed one colour too warm, creased once, and the fold
     turns the bottom panel under so you can see the top centimetre of a second street and
     nothing else. The three gold marks on Calle Principal read fine. The two on Calle Dos
     are in the crease. Palette is a map printer's, not the wall's. */
  const S={sheet:"#F0E7CE",blok:"#DCCFA8",road:"#FBF7EC",park:"#A8BE86",rail:"#9CB3B8",
           ink:"#4A4034",faint:"#8C7F6A",gold:"#D9A441",fold:"#B9A886",under:"#E1D6B7",
           here:"#7A3FE0",tape:"#E9E3D2"};
  const sx=W*0.055, sw=W*0.89, sy=H*0.10, vh=H*0.46, cr=sy+vh;

  /* --- the visible panel of the sheet ------------------------------------ */
  g.fillStyle=P.shade;g.globalAlpha=.45;g.fillRect(sx+3,sy+4,sw,vh);g.globalAlpha=1;
  g.fillStyle=S.sheet;g.fillRect(sx,sy,sw,vh);
  g.strokeStyle=S.fold;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,vh-1);
  /* two bits of tape at the top corners — it is pinned to this wall, not framed */
  g.fillStyle=S.tape;g.globalAlpha=.8;
  g.fillRect(sx-5,sy-4,18,8);g.fillRect(sx+sw-13,sy-4,18,8);g.globalAlpha=1;

  /* the road, Calle Principal, with its tram rail above it */
  const ry=sy+vh*0.50, rh=vh*0.17;
  g.fillStyle=S.road;g.fillRect(sx+4,ry,sw-8,rh);
  g.fillStyle=S.rail;g.fillRect(sx+4,ry-3,sw-8,2);
  g.fillStyle=S.faint;for(let x=sx+10;x<sx+sw-10;x+=14)g.fillRect(x,ry+rh*0.5-1,7,1);

  /* five blocks along the top, the doors facing the road */
  const bt=sy+vh*0.11, bh=vh*0.33;
  const blocks=[[0.04,0.15],[0.22,0.14],[0.39,0.17],[0.59,0.15],[0.78,0.17]];
  blocks.forEach(([fx,fw],i)=>{
    const bx=sx+sw*fx, bw=sw*fw;
    g.fillStyle=S.blok;g.fillRect(bx,bt,bw,bh);
    g.fillStyle=S.fold;g.fillRect(bx,bt+bh-2,bw,2);          /* the door side */
    g.fillStyle=S.faint;                                      /* printed windows */
    for(let wx=bx+3;wx<bx+bw-4;wx+=6)g.fillRect(wx,bt+4,3,3);
  });
  /* two blocks below the road, one of them the park */
  const lb=ry+rh+vh*0.05, lh2=vh*0.19;
  g.fillStyle=S.blok;g.fillRect(sx+sw*0.06,lb,sw*0.22,lh2);
  g.fillStyle=S.park;g.fillRect(sx+sw*0.40,lb,sw*0.20,lh2);
  g.fillStyle=S.blok;g.fillRect(sx+sw*0.70,lb,sw*0.22,lh2);

  /* the three marks that read. A gold disc and an ink bang — the game's own ❗, printed */
  const mark=(mx,my,r)=>{g.fillStyle=S.gold;g.beginPath();g.arc(mx,my,r,0,7);g.fill();
    g.strokeStyle=S.ink;g.lineWidth=1;g.stroke();
    g.fillStyle=S.ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
    g.textBaseline="middle";g.fillText("!",mx,my+.5);g.textBaseline="alphabetic";g.textAlign="left";};
  [0,2,4].forEach(i=>{const [fx,fw]=blocks[i];mark(sx+sw*(fx+fw/2),bt+bh+7,7);});

  /* you, on the road, with the dot at your feet */
  const bx=sx+sw*0.30, by=ry+rh*0.55-17;
  murBody(g,bx,by,P.sky,13);
  g.fillStyle=S.here;g.beginPath();g.arc(bx+4,by+13+5,4,0,7);g.fill();
  g.strokeStyle=S.sheet;g.lineWidth=1.5;g.stroke();

  /* the sheet's own printed title, in map type */
  g.fillStyle=S.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CALLE PRINCIPAL",sx+6,sy+vh*0.09);

  /* the label that is the whole joke: the real plan's only mention of the other street */
  g.fillStyle=S.faint;g.font="bold 11px ui-monospace,monospace";g.textAlign="right";
  g.fillText("CALLE DOS",sx+sw-8,cr-vh*0.07);g.textAlign="left";
  g.strokeStyle=S.faint;g.lineWidth=2;                        /* an arrow bending into the crease */
  g.beginPath();g.moveTo(sx+sw-14,cr-vh*0.05);g.lineTo(sx+sw-14,cr-4);g.stroke();
  g.beginPath();g.moveTo(sx+sw-19,cr-8);g.lineTo(sx+sw-14,cr-2);g.lineTo(sx+sw-9,cr-8);g.stroke();

  /* --- THE CREASE ------------------------------------------------------- */
  g.fillStyle=S.fold;g.fillRect(sx,cr,sw,3);
  g.fillStyle=P.shade;g.globalAlpha=.5;g.fillRect(sx,cr+3,sw,3);g.globalAlpha=1;

  /* --- the folded-under panel: one centimetre of it, and then nothing ---- */
  const fx2=sx+7, fw2=sw-14, fy=cr+6, fh=H*0.115;
  g.fillStyle=S.under;g.fillRect(fx2,fy,fw2,fh);
  g.save();g.beginPath();g.rect(fx2,fy,fw2,fh);g.clip();
  g.fillStyle=S.park;for(let x=fx2+6;x<fx2+fw2-4;x+=13)g.fillRect(x,fy+2,3,3);  /* the tree row */
  g.fillStyle=S.rail;g.fillRect(fx2+3,fy+fh*0.36,fw2-6,2);                       /* the rail */
  g.fillStyle=S.road;g.fillRect(fx2+3,fy+fh*0.46,fw2-6,fh*0.26);
  g.fillStyle=S.blok;                                                            /* two shop blocks, tops only */
  g.fillRect(fx2+fw2*0.18,fy+fh*0.80,fw2*0.20,fh*0.6);
  g.fillRect(fx2+fw2*0.56,fy+fh*0.80,fw2*0.22,fh*0.6);
  mark(fx2+fw2*0.28,fy+fh*1.02,7);                                               /* the two marks */
  mark(fx2+fw2*0.67,fy+fh*1.02,7);                                               /* nobody can see */
  murBody(g,fx2+fw2*0.44,fy+fh*0.62,P.rust,13);                                  /* somebody, cut off */
  g.restore();
  g.fillStyle=S.fold;g.fillRect(fx2,fy+fh,fw2,2);
  g.fillStyle=P.shade;g.globalAlpha=.35;g.fillRect(fx2,fy+fh+2,fw2,4);g.globalAlpha=1;

  /* the stencil under it, the way a printed sheet numbers itself */
  g.fillStyle=S.ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
  g.fillText("PLANO DE LA CIUDAD  ·  HOJA 1 DE 2",W/2,H*0.855);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=S.faint;
  g.fillText("sheet 2 not printed",W/2,H*0.905);g.textAlign="left";}
```

---

# rosa

PRE-FLIGHT

I will boot the real game headless, open the map by clicking `#mapbtn` from four different rooms (arriving through `worldArrived`, never by hand), measure the canvas and its labels, and then build the questionnaire as a *working* HTML prototype at 360×780 and drive it, because a spec for a form is worth nothing until somebody has tapped through it and reloaded halfway. What being this person is worth here is that I answer "can she reach the Send" by asking the browser for the box, and "does the map say where you are" by standing in four rooms and reading the dot, not by reading `drawTown`. Where I expect to fall short, named in advance: I judge at a size, and the two things that matter most here are *over time* — whether AJ comes back to a half-finished form three days later, and whether a returning player can find the next quest after a week away — and I have no instrument for either except to design for the worst case and say so.

---

THE DELIVERABLE

**Mock order used, stated plainly.** Part B (the map) is **real game screenshot + real game measured** — the shipped `index.html` booted in Chromium, clicked through, and the canvas measured in page. Part A (the questionnaire) is **none of the three**: it is a working HTML prototype rendered in the real browser at four real viewports and then measured. I am saying so because it is stronger than a canvas drawing and weaker than the real game, and the difference matters.

All artefacts: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/`

---

# PART A — the questionnaire as an app

## The decision: one question per screen, plus a review page. Here is the measurement that decided it.

At **360×780**, question 1 (six options, note closed) needs **643 px of content in a 627 px scroll pane** — it already overflows. Question 4 has seven options. So *even one question at a time scrolls on the smallest phone*; a single scrolling sheet of all eight with comment fields would be roughly 5,100 px, with the Send at the bottom of it. [prototype, measured]

The killer is not length, it is the comment field. In a long scroll, opening a textarea pushes everything below it and her place jumps. One screen per question keeps the question, the options and the note in one fixed frame, and puts **Next** on a sticky bar that never moves. The price of one-at-a-time is that she cannot see the whole thing — paid for by a **review page** ("Everything you said") that lists all eight, shows the blanks as blanks, and lets her jump back to any one. That page is also what makes the Send safe: she sees exactly what is about to leave.

## The screens

`docs/for-aj/questionnaire.html` — one file, no build, no network, opens from a tap. Night only (no theme switch; the owner asked for night). Palette is the town's own night paper so it looks like the family: `--bg:#14121B --surface:#1E1B29 --ink:#EAE7F0 --muted:#9C96AB --line:#322D42 --accent:#A97FFF --accent-ink:#160F26 --gold:#E0B45C`. [CODE] `changarrito/index.html:30-31`

| # | Screen | What is on it |
|---|---|---|
| 0 | **Welcome** | Title, two lines ("Eight questions. No hurry. Blanks are fine — a blank is a real answer."), one button: **Start** — or **Continue where you left off** if storage has anything. Never both. |
| 1–8 | **One question** | eyebrow "QUESTION n" · the question as an `h1` · one sub-line · the options as full-width rows · the note control · the sticky bar. |
| 9 | **Everything you said** | eight cards, each: question, the answer or *left blank* in muted italic, the note as a gold quoted rule, and a **Change this** row. Sub-line: *"Nothing is sent yet."* |
| 10 | **Send it** | three ways out, a green confirmation that says **nothing was erased**, and the whole text in a selectable box underneath. |

**Layout, all screens.** `body` is a column: sticky `header` (progress) · `main` `flex:1; overflow-y:auto` · sticky `footer` (the bar). Use `100dvh`, not `100vh` — both `dvh` and `svh` are supported here [measured]. `padding-top: calc(12px + env(safe-area-inset-top))` on the header and the matching `safe-area-inset-bottom` on the footer.

**Add one thing my prototype gets wrong:** at 1440×900 my option rows are **1408 px wide** [measured]. Put `max-width:560px; margin:0 auto` on `main` and `footer`'s inner row. He will open it on a laptop first to check it before forwarding.

## Sizes and targets — the stricter line, and why

I am holding **44 px**, not WCAG 2.5.8's 24×24 floor, because the failure that costs here is not *missing* the button, it is **pressing the wrong one silently** — and a mis-tapped radio in a questionnaire is an answer she never gave and will never notice. Measured in the prototype:

| Element | Height | Notes |
|---|---|---|
| Option row | **56** min, 10 px gaps | full width; whole row is the target, not the circle |
| "＋ Add a note" | **48** | the smallest thing on the screen [measured: 48 at all four sizes] |
| Note textarea | **104** min, resizable | |
| Next / Send | **52**, flex:1 | |
| Back | **52** × 96 wide | secondary, outlined, never the accent colour |
| Review "Change this" | **44** | |
| Send buttons | **56** | |

## The four states, drawn

- **Untouched** — `border:1.5px solid var(--line)`, surface fill, hollow grey ring. The note control is a **dashed** outline: it reads as "not filled in yet" without shouting.
- **Chosen** — `border-color:var(--accent)`, `background:rgba(169,127,255,.14)`, filled accent disc with `✓`. Contrast against the night ground is the accent's job; do not also change the text colour.
- **Chosen-with-comment** — everything above **plus a small gold `note` chip on the right of the row**, and the note control becomes a solid gold outline. This is the state most forms get wrong: she must be able to tell, with the textarea scrolled off, that she wrote something here.
- **Passed / blank** — nothing on the question screen (a blank must never look like an error), but on the review page it reads *left blank* in muted italic, so a blank she meant and a blank she missed are distinguishable by her, and only by her.
- **Sent** — the send buttons stay live, a green box appears reading *"Copied. Paste it into your message to him. **Your answers are still here** — nothing was erased."* **No screen ever replaces the answers with a thank-you.** A "done" state that clears the data is the classic way this fails.

## Progress — and the one bug in my own mock

Header: `Question 3 of 8` in ink, a 6 px track, fill `width: i/8`. **My prototype shows an empty bar on question 1**, which reads as broken. Fill `(i+0.5)/8` or give the first screen a visible sliver. No clock, no "2 minutes left", no countdown — the house rule is no timer and it holds here too.

## If she closes it halfway — the thing that must never happen

**An answer lost.** Measured from `file://` in Chromium: `isSecureContext true`, `localStorage` works, `navigator.clipboard.writeText` works, `navigator.share` is **absent**. [measured, this browser only]

Five mechanisms, all of them cheap:

1. **Write on every input**, not on Next. One key `aj8` for answers, `aj8i` for the place. My prototype reloaded from the Send screen and came back to the Send screen with the note intact. [measured]
2. **Say so, on every screen.** The header's second line reads *"Saved on this phone. You can close this and come back."* A promise made visibly is a promise she will rely on, which is the point.
3. **If storage throws** (iOS private mode does), catch it and turn that same line gold: *"This browser is not remembering. Copy your answers before you close."* Never fail silently.
4. **Back never discards.** There is no Clear button anywhere; if you add "start over", it confirms.
5. **Three ways out on the Send screen, and a fourth that cannot fail** — Copy (clipboard, with select-the-textarea as the catch, which is exactly the fallback the game already ships at `engine/engine.js:4726-4729`), a WhatsApp/Messages link, a download — **and the full text in a readonly box she can select by hand.** If all three buttons are dead in whatever browser her phone hands her, the answers are still on screen as text.

**One shape I would not use: a `mailto:`.** Long bodies get truncated by some clients and she would never know which half arrived.

Working prototype, tapped through and screenshotted at 360×780 · 390×844 · 390×560 · 1440×900:
`/tmp/.../scratchpad/rosa-aj-questionnaire.html` and `rosa-aj-{size}-{a..f}-*.png`. The session may lift it whole; it is ~230 lines and has no dependencies.

---

# PART B — the map

## What a person can do on it today: open it, look at it, close it. That is the complete list.

Measured, by clicking `#mapbtn` in the shipped game:

- The overlay holds **one control: `mapClose`**. Nothing else in `#mapov` is a button, a link or an input. [measured]
- **The canvas has no click handler** — `mapcv` appears in `engine/engine.js` once, to get a 2D context (`:4752`), and in no listener anywhere in either shell. [CODE]
- Escape closes it and the panel is `position:fixed; inset:0` — **both of the faults I filed on my first two visits are fixed**, so I am not refiling them. [measured; `index.html:347`]
- Canvas is **300×150 backing**, displayed **257×149 CSS at 360 wide** (scale 0.857) and **282×164 at 390 and at 1440**. [measured]

### 1 · After chapter one, every open question in the game is behind one door, and the map does not name it — *ask · tier: high*

**In plain words:** The village map is the one place a player goes when they don't know what to do next, and it is the one place that says nothing about it. Finish the first chapter and the game has exactly eight open questions left, and all eight are inside El Mercado — but the plan shows El Mercado as a brown rectangle identical to every other brown rectangle. The player's only way to find them is to walk into each door in turn and read the strip above the world for a `❗`. The map should answer the question the player opened it to ask: where is the next thing, and where are the other open ones.

**Notes:** Measured in the shipped game after completing chapter one: of fifteen worlds, `me` is the only one with anybody waiting — 4 people, 8 open quests — and `f2` shows a `❗` for a reason that is not a quest at all. The game *already computes this per world*: `worldPending(id)` (`engine/engine.js:510`) answers "somebody here has something to say" for **any** world, not just the one you are standing in, and `pendingAt(n)` (`:608`) names the first open-and-not-done quest on a person. The map calls `worldFlags()` (`:4759`) and uses it only to switch label text. Nothing reads `worldPending`. What I would build: a **list under the plan**, not a hotspot on it — at 360 wide one map tile is **8.6 CSS px**, so a three-tile shopfront is a 26 px target and taps on the plan itself cannot be made thumb-safe. A scrollable list of rows, 56 px each, one per place with something open, each row naming the place and the count, with the `❗` on the plan drawn as a pin above the building so the list and the picture agree. The plan stays a picture; the list is the interface.

**Questions to consider:** Should the list name the quest, or only the place? (Naming it may spoil; naming the place never does.) Should a row offer *take me there*? The travel picker exists (`openTravel`, `engine/engine.js:4780`) but reaches only two street stops, `st` and `ex` [CODE `content/meridian/maps.js:288`], and is itself reachable only by standing on a trolley stop tile (`:3292`) — so "take me there" would work for two of the fifteen worlds and would have to be absent on the rest, which is honest but uneven.

**Areas affected:** The village map panel, the strip that names where you are, and whatever the second world inherits — the town gets the same map from the same engine.

**Done when:** Standing anywhere after finishing chapter one, opening the map shows El Mercado named as having open questions, with a count, without the player having walked through a single door.

### 2 · In four places the map shows no "you are here" at all, and in three more it points at the wrong place — under a legend that promises the mark — *bug · tier: high*

**In plain words:** The bottom of the map says "◉ you are here". Stand in the park and there is no ◉ anywhere on it. The same is true in the barber's, the site hut and the house on Calle Dos. And in the bakery, the cleaners and the whole of Calle Dos the dot appears at the same single point on Meridian Street — three different places, one pin, none of them right. A map that is sometimes silent and sometimes wrong is worse than one that says nothing, because you cannot tell which kind you are looking at.

**Notes:** Measured by arriving in each world through the game's own arrival path and clicking the map button. `pk`, `casa-w`, `caseta` and `barberia` have no entry in the pack's dot table, so the draw takes `MAPDOT[world]||null` and simply draws nothing (`engine/engine.js:4768-4770`); the legend line above it is unconditional (`:4766`). `pa`, `li` and `ex` all resolve to `[29,1]` [CODE `content/meridian/maps.js:274`]. Picture: `rosa-mapcv-at-pk.png` — legend present, no dot. Root cause is content, not engine, but the engine is what promises the mark, so the fix belongs in both: the engine should not print "you are here" when it has not drawn one.

**Questions to consider:** For a world genuinely off the plan (the park), is the right answer a dot at its door on the street with a small "→ park" tail, or an honest line under the plan reading *"You are in El Parque — it is not on this plan"*? I would take the second: it is true, and it is one string.

**Areas affected:** The village map's dot and legend; the pack's table of where each interior sits on the plan.

**Done when:** From every world the game can put you in, the map either shows a mark or says in words that it cannot — and the legend only promises a mark that is on the page.

### 3 · The dot that says where you are is painted on top of the word that names where you are — *bug · tier: normal*

**In plain words:** Open the map while you are in Meridian HQ and the building's name reads "MERIDIAN H●". The purple you-are-here dot lands exactly on the last letters of the label it was meant to point at, so the two most useful things on the map destroy each other. It is the first thing a new player sees, because HQ is where the game starts.

**Notes:** Measured in page, not eyeballed. The label sits at x 83→217 with its baseline at y 7.5 and a 10 px face; the dot for `hq` and `f2` is centred at (145, 5) with radius 5 plus a 2 px stroke, so it spans y 0→10 straight through the text. Labels are drawn first and the dot last (`engine/engine.js:4761-4770`), so the dot always wins. Picture: `rosa-mapcv-360x780.png`. The cheap fix is a dot that dodges: offset the marker a few pixels below the label's box, or draw the dot first and give labels a dark halo. **I nearly filed a second finding here and killed it by measuring** — "CALLE DOS →" *looks* clipped at the right edge in the crop, and it ends **1.8 px inside** the canvas. It is not clipped.

**Questions to consider:** Is the marker meant to be a position (it is, on the street, where it follows `fx,fy`) or a *building* marker (it is, everywhere else, where it is a fixed table entry)? Those two want different shapes — a dot and an outlined building — and today they are the same purple disc.

**Areas affected:** The village map's labels and marker.

**Done when:** At 360 wide, from Meridian HQ, the words "MERIDIAN HQ" are fully readable with the marker on screen.

### 4 · On a 1440-wide desktop the map is the same 282 pixels as on a phone, with 7-pixel type — *bug · tier: normal*

**In plain words:** The map panel is capped at a phone's width no matter how big the window is. On a laptop the plan of the whole town occupies about a fifth of the screen width, with a legend line rendering at around seven pixels, while eleven hundred pixels of empty page sit beside it. Nothing about a map wants to be small.

**Notes:** Measured: `#mapcv` is 257×149 at 360 wide, **282×164 at 1440×900** — a 0.4 px difference from a phone. The box is `width:82%; max-width:320px` for every panel in the shell (`index.html:348`), which is correct for a settings drawer and wrong for a drawing. The legend is authored at 8 px into a 300 px canvas displayed at 0.94, so it arrives at ~7.5 CSS px. Picture: `rosa-map-1440x900.png`.

**Questions to consider:** Give the map panel its own wider cap (e.g. `min(92vw, 720px)`), or let the canvas scale to an integer multiple of its backing size so the pixel art stays crisp? The second is nicer and constrains the cap to 300/600/900.

**Areas affected:** The panel that holds the village map, and the legend's type size.

**Done when:** On a 1440×900 window the plan is at least twice its phone size and the legend is readable without leaning in.

### 5 · Nothing on the map can be pressed, in a game whose whole verb is going somewhere — *ask · tier: normal*

**In plain words:** The map is a picture. You cannot tap a building to be told what it is, you cannot tap a door, and you cannot travel from it. The one travel control the game has can only be opened by physically walking onto a trolley stop and pressing the action button — so the map, which is where a person goes to decide where to go, is the one screen that cannot help them go.

**Notes:** `#mapov` contains exactly one interactive element, the Close button [measured]. At 360 wide a map tile is 8.6 CSS px, so tapping the plan directly can never meet a 44 px target — the interaction has to be **pins that are bigger than the buildings they mark, or a list**. If a row ever offers travel it should call the same picker the stop calls (`openTravel`, `engine/engine.js:4780`), not a new path, so the tram ride and the arrival stay identical.

**Questions to consider:** Does travelling from the map break the rule that convenience is bought by building the real thing? I think a map row that *walks you to the door* is a different thing from teleporting, and this is the owner's call, not mine.

**Areas affected:** The village map panel; the travel picker's entry points.

**Done when:** Something on the map responds to a tap, and whatever it does is reachable with a thumb at 360 wide.

### 6 · The town's own map has no labels at all, and its legend promises gold doors — *bug · tier: normal · changarrito*

**In plain words:** El Changarrito uses the same map panel as Meridian, and in the town it is a field of coloured squares with no words on it whatsoever. The legend still reads "doors & stairs in gold · ◉ you are here" over a picture with nothing named. A person who opens it learns nothing and closes it again.

**Notes:** Measured in the town at 360 wide: the pack's label list has **zero entries**, so the label loop draws nothing and only the fixed legend line survives (`engine/engine.js:4761-4766`). The you-are-here dot lands in the dark band at the top with nothing beside it. Picture: `rosa-townmapcv-360.png`. This is content missing rather than engine broken — but the engine prints a legend for labels that do not exist, which is the same fault as finding 2 one level up.

**Questions to consider:** Does the town want district names (the anexo, the stall, the workshop), or does it want the *board's* language — counts of open and taken issues per district, which is what the town is actually for?

**Areas affected:** The town's map labels; the shared legend line.

**Done when:** The town's map names at least the places a person walks between, and its legend only describes what is drawn.

**Two things I checked and am deliberately not refiling:** Escape now closes the map (it did not on my second visit), and the panel is fixed to the viewport rather than trapped in the world frame — my earlier finding 4 is fixed. **Still true and still filed:** the map button is 38×38 and the Close is 35 tall, both under 44.

---

QUESTIONS FOR THE OWNER

1. **Where does AJ actually receive this?** If it is a link he sends, it must be hosted somewhere — and `CLAUDE.md` says the public build is only the public game and a session must never put a personal build in the public shell, so the questionnaire cannot go on the Pages site. If it is an `.html` file attached to a message, some phone mail clients open HTML attachments in a viewer where scripts and storage do not run, and then everything in Part A about saving her place is decorative. **Both sides:** a hosted link works perfectly and breaks the publishing rule; an attached file keeps the rule and may not run on her phone. I did not find an option that does both, so it is yours.

2. **Is the map's marker a person or a building?** On Meridian Street it tracks your actual tile and is a position; everywhere else it is a fixed point per world and is really "the building you are inside". Today both are the same purple disc, which is why three worlds share one and four have none. **Both sides:** make it a position everywhere, and every interior needs a real coordinate on the plan; make it a building marker, and the street needs to stop tracking you tile by tile. I would not average these.

---

WHAT I DID NOT CHECK

- **A real phone.** Everything is Chromium on Linux at a set viewport. In particular I could not test what the software keyboard does to a sticky bottom bar — on iOS Safari that is the single likeliest way "Next" ends up under the keyboard, and it is the one thing in Part A I would want tried by hand before it is sent.
- **`navigator.share`** is absent in this browser, so I could not test the WhatsApp path at all; I designed around its absence rather than measuring it.
- **iOS private mode's `localStorage` throw.** I wrote the catch for it; I have never seen it fire here.
- **Landscape.** `docs/POSTMORTEM.md` §13o says no suite in this repository has ever run either game sideways, and I did not run one either — neither the map nor the questionnaire.
- **A cold reader.** I know what the map's dot is supposed to mean; I cannot tell you whether somebody who has never played reads "MERIDIAN H●" as a bug or as a place name.
- **Spanish for the questionnaire.** I checked the map in Spanish; the questionnaire prototype is English only, and Question 4's option list is the longest text on any screen — it should be re-measured in Spanish if it is ever translated.
- **The chapter-two and chapter-three states.** My "all eight open quests are in one place" measurement is for the state right after chapter one. I did not check whether later chapters spread out.

---

POST-FLIGHT

1. **What it got right, with the moment:** opening the same map from four rooms instead of one — the persona's "walk it, do not review from source alone" — turned what looked like a cosmetic collision into the real shape of the fault, because the park's map came back with a legend promising a mark and no mark drawn, which no reading of `drawTown` would have made me feel. 2. **Where it got in the way:** my file is built for judging *a screen*, and half of this brief was authoring one from nothing; I spent the first twenty minutes measuring the shipped map's buttons before realising the questionnaire had no artefact to measure at all and I would have to build one, and nothing in my persona told me that building a throwaway prototype is inside my remit — I had to decide that on my own. 3. **The gap I predicted appeared, in the form I named:** I have no instrument for "comes back three days later", so I designed the storage and then could only *say* it works on a reload in this browser, which is not the same claim; and I nearly filed "CALLE DOS → is clipped at the right edge" off a crop before measuring it at 1.8 px inside the frame — the still-frame reflex, caught by the measurement. 4. **Edit proposed below.**

**Proposed persona edit**

```
Add to `.claude/agents/rosa.md`, at the end of the "Some things are true for less than a second"
section:

**When there is no artefact, build the cheapest real one — and then measure THAT.** A spec for a
screen that does not exist yet is an opinion until somebody has tapped it. Write the throwaway in
HTML, drive it at 360×780 and 1440×900, and report its numbers as what they are: a prototype
measured, not the game measured. Say which of those you did, in the report, in one line.

*The moment: 2026-09-14, the questionnaire for AJ. I was asked whether one question per screen or
one long scroll was right, and I could have argued it from taste. Building it took twenty minutes
and answered it with a number instead — at 360×780, ONE question with six options and the note
closed already needs 643 px in a 627 px pane, so even one-at-a-time scrolls and a single sheet of
all eight would have been about 5,100 px with the Send at the bottom. The same prototype then
convicted me: at 1440 wide my own option rows were 1,408 px across. I would never have found my own
defect by describing my own design.*

Nothing else. My refusal is unchanged and this run leaned on it: I edited no code and filed no
issue, and the map findings are stronger for it — six tickets ranked by what they cost a person,
handed to somebody else to rank again.
```

---

MURAL PANEL

```
id:     rosa-el-punto-sobre-el-nombre
by:     "rosa"
title:  {en:"The pin over the name", es:"El punto sobre el nombre"}
said:   {en:"The dot that says where you are is painted on top of the word that names where you are. And in the park there is no dot at all \u2014 under a legend still promising one.",
         es:"El punto que dice d\u00F3nde est\u00E1s est\u00E1 pintado encima de la palabra que nombra d\u00F3nde est\u00E1s. Y en el parque no hay punto \u2014 bajo una leyenda que lo sigue prometiendo."}
state:  {en:"Nothing on it can be pressed.", es:"Nada en \u00E9l se puede tocar."}
who:    {en:"Rosa, who opened the same map from four rooms instead of one",
         es:"Rosa, que abri\u00F3 el mismo mapa desde cuatro cuartos, no desde uno"}
cap:    {en:"The first time she opened it she was standing in the lobby, and the collision looked like a rendering quirk worth half a line. Opening the same board from four different rooms gave the real shape: three places share one pin, four have none, and the legend promises a mark that is not drawn. She nearly filed a clipped label at the right edge instead \u2014 she measured it, and it ends one and a half pixels inside the frame.",
         es:"La primera vez que lo abri\u00F3 estaba en la recepci\u00F3n, y el choque parec\u00EDa una rareza de dibujo, media l\u00EDnea a lo mucho. Abrir el mismo tablero desde cuatro cuartos distintos dio la forma real: tres lugares comparten un solo punto, cuatro no tienen ninguno, y la leyenda promete una marca que no se dibuja. Casi levanta en su lugar una etiqueta cortada en la orilla derecha \u2014 la midi\u00F3, y termina p\u00EDxel y medio adentro del marco."}
aspect: 0.46
```

Material: **vitreous enamel on a brass-framed park notice board**, screwed to the wall, taking the light in one glass band — a signwriter's object, not a draughtsman's sheet. Palette is mine (enamel `#123D2C`, brass `#B98A3C`, sign white `#F3F0E4`, lacquer red `#C8322B`); MURPAL appears only for the ink of the dotted look-line and the shirt of the woman standing outside the board's edge, in the park the board does not have. My only previous panel is a dimension drawing on cream paper with a hatched gap — this one shares neither its ground, its palette, nor its geometry. Rendered and looked at: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/rosa-panel.png`. Bottom 6% is clear (lowest ink is the post feet at 0.90H).

`art:` — the exact text is at `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/rosa-panel-art.txt`, drawn and verified at W=412, H=189. The two lines that carry the whole joke, so the painter does not reorder them:

```js
g.fillText("MERIDIAN HQ",px0+8,nameY);
const m=g.measureText("MERIDIAN HQ");
/* THE PIN — painted last, straight over the letters it was meant to point at */
const qx=px0+8+m.width-11, qy=nameY-4;
```

---

# paty

PRE-FLIGHT — I read the post-mortem, REGRESSION §3, my two flight-note rows (19 and 44, both APPLIED), then `CLAUDE.md`, `docs/OWNER.md`, `docs/STORY.md`, `docs/la-sobremesa.md` §6/§12 and `docs/for-aj/LA-SOBREMESA.md`, and I checked every width and timing claim against the shipped CSS and the shipped strings rather than against the meeting notes that quote them. My persona is built for exactly this — Mexican register, ES-first drafting, and "a string is a claim about a state" — so I wrote every Spanish line first and then asked, of each one, which screen shows it and whether that screen exists. Where it will fall short, named in advance: **this job has no "current ES" to diff against** (nothing is shipped), so my drift instinct has nothing to bite on, and my width instinct will have to work from arithmetic — the brief offered me a renderer and **this invocation has Read, Grep and Glob only, no Bash**, so I could not measure a single pixel.

---

# THE DELIVERABLE

## 0 · Two findings before the words

**F1 — a register in this plan is stale, and it is the row with my name on it.** `docs/la-sobremesa.md:487–490` tells the next person there is live drift in the town: *"`locs.hq` = `"The stall"` and `arrive.hq` = `"The stall."` **inside the ES block**"*. `[CODE]` It is fixed: `/home/user/meridian-quest/changarrito/content/strings.js:256` reads `hq:"El changarro"` and `:261` reads `hq:"El changarro."`. The doc is describing a game we do not have — the failure `docs/POSTMORTEM.md` charges three times. **The session should strike those four lines** and replace them with "found 2026-09-12, fixed; re-verified 2026-09-14".

**F2 — shipped Meridian has a live reading-speed defect in Spanish, found while doing this job.** `[CODE]` `carePackToast` is **92 characters EN** (`content/meridian/strings.js:45`) and **121 characters ES** (`:266`), and both are given the same **3600 ms** (`engine/engine.js:3722`). That is ~307 wpm for the English reader and **~403 wpm for the Spanish one** — the ES player gets the shorter half of the time they need, every time, and nothing in either suite reads it. `[TRAINING]` for the 200–250 wpm comfortable-reading constant. The mercy holds: the ticker rail keeps the last two lines with no timer at all (`engine/engine.js:583–588`), so it stays re-readable. **The arithmetic I now use and am proposing into my own file: `ms ≈ 600 + 45 × (ES characters)`** — which makes the engine's own `ms||2600` fallback honest for **~44 ES characters** and the ambient chat line's flat 2800 (`engine/engine.js:3666`) honest for **~49**.

---

## PART A · The questionnaire (`docs/for-aj/LA-SOBREMESA.md`)

There is no current ES — the page is English by his word. I supply ES anyway, because these answers become pack strings and lockstep starts at the first draft, not at the port. **Every ES line below was written first and the EN cut to match it.**

### A1 · The cover and the footer

| key | current EN | current ES | my EN | my ES | why |
|---|---|---|---|---|---|
| `cover.title` | For AJ — a cooking and pantry game, and eight questions | — | **For AJ** / sub: *Eight questions about a cooking game.* | **Para AJ** / *Ocho preguntas sobre un juego de cocina.* | A phone card gets a name, not a headline with two em-dashes |
| `cover.line` | *Plain words, no code. The owner can read this to you…* | — | Answer what you have opinions about. Blanks are fine — we'll ask again when there's something on screen. Nothing here is decided. | Contesta lo que te dé opinión. Los espacios en blanco están bien — te volvemos a preguntar cuando ya haya algo en pantalla. Aquí nada está decidido. | Lifted from the register he already approved in `docs/for-aj/QUESTIONS.md:3–4`. **"The owner" is deleted everywhere** — in a note to your partner it reads like a form (see Q1 for the owner) |
| `cover.safe` | *(missing)* | — | **Nothing leaves this phone.** At the end you get one Copy button and you send it however you like. | **Nada sale de este teléfono.** Al final te sale un botón de Copiar y lo mandas como quieras. | **New and load-bearing — see A3.** `docs/OWNER.md:58–63` settles that AJ's answers stay on the phone and a Copy button is the hand-off |
| `cover.keep` | *(missing)* | — | *(pick one, depending on what the page does)* Your answers stay on this phone if you close it. **/** Don't close this tab — nothing is saved yet. | Tus respuestas se quedan en este teléfono aunque lo cierres. **/** No cierres esta pestaña — todavía no se guarda nada. | An eight-card form that silently loses everything is the worst artifact to forward. One of these two sentences must be true and on the cover |
| `foot` | *Answers go to the owner; he logs them in the game's ask ledger word for word.* | — | Your words get written down exactly as you typed them. Nobody tidies them up. | Tus palabras se anotan tal como las escribiste. Nadie las "arregla". | "ask ledger" is our jargon. What she needs to know is that nobody edits her |

### A2 · The eight questions, recast as cards with options + a comment

*(EN card titles kept ≤ 42 characters so they hold one line at 360; ES titles ≤ 42 too, checked by count.)*

| key | current EN | my EN | my ES | why |
|---|---|---|---|---|
| `q1.title` | What is the nicest part of cooking for you? | **What's the best part of cooking?** (31) | **¿Qué es lo mejor de cocinar?** (28) | — |
| `q1.opts` | *(prose list)* | Chopping · The smell · The waiting · The first taste · The face they make · Feeding someone · Honestly, eating it | Picar · El olor · La espera · La primera probada · La cara que ponen · Dar de comer · La neta, comérmelo | Chips, not a sentence. *La neta* is the register |
| `q1.anchor` | (The owner said "the flavor". What's yours?) | **move it after she answers:** *He said: the flavour.* | *Él dijo: el sabor.* | **The one question that decides the loop is the one that shows her somebody else's answer first.** Anchoring, in the question we most need to be hers |
| `q2` | *(one question containing four)* | **split into three cards — 2a, 2b, 2c** | | 51-character title, five clauses, two games and a mechanic question in one card. On 360 it is a wall |
| `q2a.title` | *If you could only have one…* | **Which would you miss more?** (26) | **¿Cuál extrañarías más?** (23) | — |
| `q2a.opts` | the merge board / making the dish by hand | **A** Dragging two of the same together until they become the next thing · **B** Making one dish by hand — rolling, spreading, sprinkling, placing | **A** Juntar dos cosas iguales hasta que se vuelven la que sigue · **B** Hacer un platillo a mano — extender, untar, espolvorear, acomodar | **"Merge board" never appears.** He didn't know the phrase (`docs/la-sobremesa.md:926`); she knows the gesture. Two full-width rows, never chips |
| `q2b.title` | what do you love most? | **In that one, what's the best bit?** (34) | **De ése, ¿qué parte está mejor?** (30) | — |
| `q2b.opts` | merging, recipe pages, Collection, characters, restaurants, rolling, spreading | the merging · the recipe pages · the Collection filling in · what the characters say · new restaurants · rolling and spreading · placing things just right | juntar cosas · las páginas de recetas · la Colección llenándose · lo que dicen los personajes · los restaurantes nuevos · extender y untar · acomodar bien las cosas | — |
| `q2c.title` | does Cookingdom's clock bother you, or is it part of the fun? | **When a game hurries you, what happens?** (39) | **Cuando un juego te apura, ¿qué pasa?** (37) | **Two defects.** `docs/OWNER.md:258` — *do not ask about a mechanic, ask about a feeling*. And **the answer cannot change anything**: he settled *"no timer anywhere"* (`docs/la-sobremesa.md:916–918`). See QUESTION 1 |
| `q2c.opts` | — | I like it — that's the fun · I ignore it · It stresses me out · I put the phone down | Me gusta, ahí está lo divertido · Ni lo pelo · Me estresa · Dejo el teléfono | *Ni lo pelo* is the line an actual person says |
| `q3.title` | **Your allergies.** | **What should never land on your plate?** (37) | **¿Qué nunca debe llegar a tu plato?** (34) | **This is the doctor's form.** A bolded *"Your allergies."* over *"which foods, and is it raw only or cooked too"* is an intake sheet. Asked as a kitchen question it also catches dislikes, which the game needs and no allergy list gives you |
| `q3.help` | Which foods, and is it raw only or cooked too? | Allergies, or just no thanks — both count. If raw is the problem and cooked is fine, say that too. | Alergias, o nada más no se te antoja — las dos cuentan. Y si el problema es crudo pero cocido sí, dilo. | — |
| `q3.chips` | — | Raw only · Cooked too | Sólo crudo · Cocido también | — |
| `q3.note` | The game will carry a note on any recipe that has them…, nothing more. | All the game does is put one line on the recipe — *"cook the tomato first"*, or *"not this one"*. It never says anything about you, **and it is not a safety check.** | Lo único que hace el juego es poner un renglón en la receta — *"cuece primero el jitomate"* o *"ésta no"*. Nunca dice nada de ti, **y no es un chequeo de seguridad.** | The last clause is new and is QUESTION 3. **And note `jitomate`, never `tomate`** — in Mexico *tomate* is the green tomatillo, so the literal translation changes the fruit |
| `q4.title` | **A name.** | **What's it called?** (17) | **¿Cómo se llama?** (15) | Matches `QUESTIONS.md:90` |
| `q4.opts` | *(13 names in a paragraph)* | *(the same 13 as chips)* + **A fuego lento** · **El recalentado** | igual | Two Spanish-born candidates worth his eye: *a fuego lento* is "low heat" said the way a kitchen says it, and *el recalentado* is the one word EN does not have. If the game ships bilingual the title stays English, like Meridian's, with an ES subtitle |
| `q4.free` | say what none of them has | Or none of these — say what they're all missing. | O ninguno — dime qué les falta a todos. | — |
| `q5.title` | Name one dish you love and who taught it to you. | **One dish you love — and who taught you.** (40) | **Un platillo que te encanta — y quién te lo enseñó.** (50, two lines; fine) | **`platillo`, not `plato`** — *plato* is the object you eat off (and Spain). Best question in the set; barely touched |
| `q5.fields` | — | The dish · Who | El platillo · Quién | — |
| `q5.note` | That person is the first character. | That person becomes the first character. | Esa persona es el primer personaje. | — |
| `q6.title` | Would you actually keep a pantry list up to date, or would you hate that? | **Would you really keep a pantry list up to date?** (47, two lines) | **¿De verdad mantendrías la alacena al día?** (41) | **`alacena`, never `inventario`** (`docs/la-sobremesa.md:437`) |
| `q6.opts` | *(two, in prose)* | Yes, I'd keep it up · Only if it's fast · I'd do it once and never again · I'd hate it — do it from a photo | Sí, la mantendría · Sólo si es rapidito · La haría una vez y ya · Lo odiaría — háganlo de una foto | **The third option is R17 written as a chip** and it is the true answer most people would give; nobody offered it |
| `q7.title` | **Which kitchen first?** The owner says lean Mexican to start… | **What should the second kitchen be?** (34) | **¿Cuál debería ser la segunda cocina?** (37) | **He already decided the first one** (`docs/la-sobremesa.md:706`). Asking her to pick a settled state is a question about a screen the game will not show. Reframed, it is genuinely hers |
| `q7.opts` | Any cuisine you want early? | Italian · Japanese · Korean · Something else | Italiana · Japonesa · Coreana · Otra | — |
| `q8.title` | What should happen when you planned to cook and didn't? | **You meant to cook and didn't. Then what?** (41) | **Ibas a cocinar y no. ¿Entonces qué?** (35) | This question writes the pack's most important string |
| `q8.opts` | Nothing, somebody says something kind, or it quietly offers again? | Nothing at all · Someone mentions the food, not the plan · It just offers again later · Never bring it up | Nada · Alguien menciona la comida, no el plan · Luego lo vuelve a ofrecer · Que nunca lo mencione | **"Somebody says something kind" is the trap.** Kindness after a miss is absolution, and absolution implies a debt. The option should let her pick the *register*, not the *sentiment* |
| `q9` *(proposal, not a fix)* | — | **Who else is at the table?** (25) | **¿Quién más se sienta a la mesa?** (31) | Nothing in the eight asks this, and eating with other people is the one mechanic in the whole sweep with a finding behind it (`docs/la-sobremesa.md:133–137`). His call whether it makes nine |

### A3 · The questionnaire's own chrome — and the one string that is a lie

| key | my EN | my ES | flag |
|---|---|---|---|
| `prog` | 3 of 8 | 3 de 8 | — |
| `say` | Say more (optional) | **Cuéntanos más (opcional)** (24) · narrow: **Más (opcional)** (14) | His explicit ask: a comment on every multiple choice. 24 chars is safe in a field label, **not** in a 12em select |
| `skip` | Skip | **Paso** (4) | *Paso* is what a Mexican says when passing |
| `back` / `next` | Back / Next | Atrás / **Siguiente** (9) · narrow: **Sigue** | — |
| `done` | ~~Send it~~ → **Copy my answers** | ~~Mandar~~ → **Copiar mis respuestas** (21) | **THE FINDING. A "Send" button on the last card would be a lie.** There is no server, no network and no address: `docs/OWNER.md:58–63` settles that the answers stay on the phone and a Copy button is the hand-off. Eight cards of typing and then a button that promises delivery is the worst possible place for a string that claims a state the page cannot enter |
| `done.toast` | Copied. Send it however you like. (33) | **Copiado. Mándalo como quieras.** (30) | 30 ES chars → safe at the 2600 default (≤44) |
| `again` | Start over | Empezar de nuevo (16) | — |

---

## PART B · The app's chrome for the journey mock-ups

**Written ES-first, every row.** Widths are arithmetic from the shipped CSS — **not measured in a browser** (see WHAT I DID NOT CHECK).

### B1 · The bottom bar — five tabs at 360 px

`[CODE]` no bottom bar exists in either shell; this is new chrome for a mock. Budget: 360 ÷ 5 = **72 px per cell**, ~64 px usable. At 11 px `[TRAINING]` a normal sans averages ~5.7 px/char and **Unbounded (the shell's display face, `index.html:48`) roughly ~8.3 px** — so **cap ES tab labels at 7 characters and the rail survives in either face; at 8+ it only survives in IBM Plex.** Recommendation: set the rail in IBM Plex Sans, not Unbounded.

| key | my EN | my ES | chars | note |
|---|---|---|---|---|
| `tab.home` | Home | **Casa** | 4 | If the first screen is the kitchen rather than the house: Kitchen / **Cocina** (6) |
| `tab.pantry` | Pantry | **Alacena** | 7 | The place. The contents are *la despensa* |
| `tab.shifts` | Shifts | **Turnos** | 6 | *Turno* is exactly the Mexican word for a work shift |
| `tab.book` | Recipes | **Recetas** | 7 | Tab says *Recetas*; the screen title is **El recetario** — the book itself |
| `tab.note` | Notebook | **Libreta** | 7 | **NOT `Diario`.** A *diario* of food is a clinic's instrument; a *libreta* is a person's. This is the single word that could undo the whole refusal |

**Rejected, with reasons:** *Inventario* (never — `docs/la-sobremesa.md:437`); *Colección* (10, and it belongs inside the book if the merge board ships); *Refri* as a tab (the fridge lives inside the pantry); *Diario* (above). **And the honest note: if `Libreta` is empty on day one, ship four tabs.** Five tabs with one empty is a rail advertising a state that does not exist.

### B2 · The pantry and its drawers

**Naming collision flagged:** `[CODE]` `drawer` is already a UI noun in this codebase — `.drawer > summary`, the Settings disclosure (`index.html:323–337`). The pantry's drawers are a second meaning of a word the CSS owns. **Key-prefix them `pan.`, never `drawer.`**

| key | my EN | my ES | note |
|---|---|---|---|
| `pan.title` | The pantry | **La alacena** | |
| `pan.stock` | What's in it | **La despensa** | |
| `pan.d1/2/3` | Top drawer · Middle drawer · Bottom drawer | **El cajón de arriba · El de en medio · El de abajo** · narrow: **Arriba · En medio · Abajo** | **Named by position, not by contents, on purpose.** The photos have not arrived (`docs/la-sobremesa.md:885–886`), so *"Spices"* is a claim about a state we do not have. A position is true today and stays true after re-authoring |
| `pan.shelf` | The shelf | **La repisa** | *estante* is the unit; *repisa* is the shelf |
| `pan.fridge` | The fridge | **El refri** (8) | Never *el refrigerador* — that is the manual |
| `pan.freeze` | The freezer | **El congelador** (13) | No short Mexican form exists. Fine as a heading, **too long for a tab** |
| `pan.in` / `pan.out` | What came in / What ran out | **Lo que llegó / Lo que se acabó** | Logging by exception, one line |
| `pan.low` | Getting low | **Ya se está acabando** | Never *caducado*/*vencido* — an expiry list is a guilt list |
| `pan.search` | Find something | **Buscar algo** | His #13: a big searchable form |

### B3 · The shift board

| key | my EN | my ES | note |
|---|---|---|---|
| `sh.title` | Shifts | **Turnos** | |
| `sh.open` | Open | **Abiertos** | |
| `sh.mine` | Yours | **Tuyos** (5) | Not *tomados/claimed* — "taken" already means something else in this project's town |
| `sh.take` | I'll take it | **Lo agarro** (9) | First person, the player's own voice, matching `madeIt`. *Agarrar turno* is the kitchen's verb; *tomar* is the manual's |
| `sh.when` | When? | **¿Cuándo?** | |
| `sh.when.ph` | Thursday, after work | **El jueves, saliendo del trabajo** | The implementation intention, in his own week's words |
| `sh.done` | Made it | **Ya quedó** (8) | **An amendment to `docs/la-sobremesa.md:449`.** `madeIt` = *"Ya la hice"* is right when the noun is known feminine (*la comida*, *la cena*) — as a generic shift button it is wrong half the time, because *el pozole* is masculine. **`Ya quedó` hides no gender**, and it is what a cook actually says |
| `sh.back` | Put it back | **Lo dejo** (7) | R11. A board you cannot hand a shift back to is an obligation |
| `sh.pay` | You take some home | **Tu itacate** (10) | **His own answer — *"I get leftovers?"*** — said in the word the pack already owns. The shift card says *tu itacate* (what you carry out); the fridge lists it as *el recalentado* (what you reheat). Two states, two words, both real |
| **never shown** | missed · overdue · expired · late | perdido · vencido · atrasado · tarde | R10/R15. A shift you didn't cook is still **open** |

### B4 · The fridge, and the leftovers

| key | my EN | my ES | note |
|---|---|---|---|
| `fr.title` | The fridge | **El refri** | |
| `fr.left` | Leftovers | **El recalentado** (14) | EN has no word for the day-after meal that is better than the first one |
| `fr.empty` | Nothing in here yet. Cook a shift and it fills. (46) | **Todavía nada. Cocina un turno y se va llenando.** (47) | 47 ES chars → safe at 2600. An empty fridge must promise, never scold |
| `fr.use` | Yesterday's beans, in today's dish. (35) | **Los frijoles de ayer, en lo de hoy.** (35) | The "mix in" of a recipe pair, said as a kitchen says it |

### B5 · "Not today" — the best-written string in the pack

Two strings, and they are not the same job.

| key | my EN | my ES | note |
|---|---|---|---|
| `nt.btn` | Not today | **Hoy no** (6) | |
| `nt.say` | It'll keep. The onion's good till Thursday. (43) | **Ahí sigue. La cebolla aguanta hasta el jueves.** (46) | **ES written first.** 46 chars → 600 + 45×46 ≈ **2670 ms**, so the 2600 default is honest and 2800 is comfortable |
| `nt.say.shift` | The shift's still up. Nobody moved it. (38) | **El turno ahí sigue. Nadie lo movió.** (36) | |

**Why these and not something warmer:** the reply is about the **food**, not the person; it contains no absolution and no encouragement, because both are verdicts; it states a fact, and the fact is that nothing was lost; and *ahí sigue* is the settled `lapse` register (`docs/la-sobremesa.md:455`), which is grammatically incapable of blaming anybody. **The cooked branch must not be warmer than this one** — if it is, the game is scoring her through dialogue.

**Four ES landmines, do not ship any of them:** *"¡No pasa nada!"* (absolution — it implies something happened); *"Mañana será"* (a promise made on her behalf); *"Ni modo"* (a shrug that is a small judgement); and **anything containing *tranquila*** (telling a woman to relax, in a game about her own kitchen).

### B6 · Settings, grades and print

| key | my EN | my ES | flag |
|---|---|---|---|
| `set.grades` | **Cooks' notes** | **Lo que dicen los cocineros** (26) · narrow: **Lo que dicen** (12) | **Do not use *calificaciones* (14).** A *calificación* is a school mark, in a game that must never mark the eater — and at 22 chars *"Mostrar calificaciones"* is at the edge of the drawer. Name the row for what it does: the grade pays recipe offers (`docs/la-sobremesa.md:903–906`) |
| `set.on/off` | On / Off | **Sí / No** | Never *Activado/Desactivado* (18/24) — manual register **and it clips in a 12em select** |
| `count` | 42 dishes cooked | **Van 42 platillos** (17) | **Not *comidas*.** *Van X* is grammatically incapable of counting down — the language enforces R15 for free — but **counting meals eaten is a food log and counting dishes cooked is about the kitchen (R16).** The noun decides which game this is |
| `doc.print` | 🖨️ Print | **🖨️ Imprimir** (8 + glyph) | **Width risk, measured by arithmetic.** `[CODE]` the docbar is three buttons at `flex:1`, `display:flex`, no wrap (`index.html:244–247`), and ES already carries `dl:"⬇️ Descargar (.md)"` (`content/meridian/docs.js:23`). At 360 px three buttons get ~101 px each (~77 usable) and *Descargar (.md)* already wraps to two lines today; **a fourth button drops each to ~76 px (~52 usable) and pushes it to three.** The buttons have `min-height:40px` and grow, so it is a tall ugly bar, not a clip. **When Print lands, shorten ES `dl` to `⬇️ .md` or `⬇️ Bajar`, or give Print a second row.** `[TRAINING]` for the 6.5 px/char at .82 rem |

### B7 · Dead strings and re-homed ones

- **`plnTitle`** (*"This week's menu" / "El menú de la semana"*, `docs/la-sobremesa.md:441`) is **dead** — the week strip was retired for the shifts board (`:792`). Translating it maintains a surface nobody will build.
- **`plnAsk`** (*"¿Qué hay de comer el martes?"*) and **`plnIf`** (*"Si es domingo, remojo los frijoles."*) are **not** dead — they re-home onto the shift card as the "when" prompt and the intention.
- **`nutLabel`** (*Información nutrimental*) is still `[TRAINING]`; NOM-051 has not been fetched. **Do not ship that word on a screenshot he might show anybody.**

---

# QUESTIONS FOR THE OWNER

**1 · The timer question to AJ contradicts your own settled answer.** `docs/for-aj/LA-SOBREMESA.md:32` asks her *"does Cookingdom's clock bother you, or is it part of the fun?"* — and `docs/la-sobremesa.md:916–918` records you settling it: *"two types of games — no timer, we chill"*, Cookingdom's *+30s* is not carried. **Side A:** keep the question, and if she answers "the timer is the fun", something has to give — either the rule or the promise the question implied. **Side B:** reframe it to the feeling underneath (*"When a game hurries you, what happens?"*), which changes what replaces the pressure and cannot re-open a rule you closed. I have drafted B, but **if you intend her answer to be able to flip the no-timer rule, say so and A is the right question.**

**2 · What does the page call you?** `docs/for-aj/LA-SOBREMESA.md` says *"the owner"* four times (`:3`, `:26`, `:42`, `:46`). **Side A:** it is the repo's word and it is accurate. **Side B:** in a thing you forward to AJ, "the owner" reads like a form from a company. I need either your name or the word you want ("he", "Ricky", something else) — I will not invent one, and I did not want to guess in a document going to your partner.

**3 · The allergy note — one sentence, and it is yours to approve or cut.** `docs/la-sobremesa.md:548` says *never, in any iteration: an allergen verdict*, so the questionnaire must not imply the game keeps her safe. **Side A:** add my clause — *"and it is not a safety check" / "y no es un chequeo de seguridad"* — which is honest and slightly cold in a gift. **Side B:** leave the note feature out of the questionnaire entirely until AJ has said what she wants, so no promise is made in either direction. I lean A, but this is the one row where a wrong call has a consequence outside the game.

---

# WHAT I DID NOT CHECK

- **I could not render anything.** The brief offered Bash and playwright-core; **this invocation has Read, Grep and Glob only.** So there is **no screenshot and no mock order to declare** — every width number above is arithmetic off the shipped CSS constants I opened myself, with the per-character estimate tagged `[TRAINING]`. The docbar overflow, the 12em clip and the 5-tab rail are all **unmeasured**, and the honest status of each is "predicted, not seen."
- **I did not verify whether Unbounded and IBM Plex actually load** — `index.html:19` fetches them from Google Fonts and `:10`'s CSP allows `fonts.gstatic.com`, so offline they fall back to a narrower generic sans. Every budget above assumes the wider case where it matters, but I did not confirm which face a phone gets.
- **I did not verify that the Settings drawer has no pack-declared row.** That claim is relayed from `docs/la-sobremesa.md:836–837`; I did not grep the engine for it, so the "small seam" cost of the grades toggle is `[MEMORY]`, not `[CODE]`.
- **I did not cold-read a single one of these words with a person who has not seen them** — including *Libreta*, *Tu itacate* and the "not today" line, which is the string this whole pack is supposedly built around.
- **I did not measure the town's night paper.** I confirmed `.paper.night` exists (`changarrito/index.html:203–208`) and nothing more; the questionnaire is meant to be night-mode and I have not looked at ES text on that ground.
- **I have not touched, and still refuse, any line spoken by a Japanese, Korean or Italian cook.** Unchanged from `docs/la-sobremesa.md:481–485`.
- **NOM-051, NOM-043, *nutrimental*, *jitomate* as a labelling term** — still one native speaker's ear, still unfetched.
- **I did not check the open GitHub issues** for an existing ask about this questionnaire.

---

# POST-FLIGHT

My persona got it right at one exact moment: I had finished the eight cards, every word warm and short and *tú*, and then asked my own standing question — *which state shows this string* — of the last button, and **"Send it" turned out to be a promise a page with no network, no server and no address cannot keep**, which would have been discovered by AJ after typing all eight answers. Where it got in the way: the deliverable shape my file demands — key · current EN · current ES · my EN · my ES — has an empty column in every single row here, because nothing is shipped, and I spent real effort forcing an unbuilt game into a drift-detection table; and it was **silent on the merge board's own vocabulary** — I named the chrome and not one chain, not one Collection row, which is the part AJ actually touches. The gap I predicted did appear, and it was worse than predicted: I said I would have to work from arithmetic, and I could not render *at all*, so the three width claims a screenshot would have settled in ten minutes are all still hypotheses wearing numbers. The edit I propose to my own file:

**Anchor:** in `.claude/agents/paty.md`, immediately after the sentence *"**So for anything that goes through a toast, write the Spanish first: ES runs 20–40% longer here, and if ES fits, EN will.**"*

**EXACT TEXT to insert:**

> **The arithmetic, so you never have to argue it again.** At ~200 wpm and ~6.5 characters per Spanish word, a toast needs roughly **600 ms to be noticed plus 45 ms per ES character** — which makes the engine's own `ms||2600` fallback honest for about **44 ES characters** and the ambient chat line's flat 2800 honest for about **49**. `[TRAINING]` for the wpm; the rest is arithmetic. **Shipped Meridian already breaks it in one place, so this is not hypothetical:** `carePackToast` is **121 characters in ES against 92 in EN** (`content/meridian/strings.js:45` and `:266`) and both get the same **3600 ms** (grep `carePackToast` in `engine/engine.js`) — ~403 wpm for the Spanish reader, ~307 for the English one. **The ES player gets the shorter half of the time they need, every time, and no suite in this repository reads a toast's length against its duration.** Put the number in the call, not in the hope — and when you propose a long line, propose its `ms` beside it.

---

MURAL PANEL

```
id:     paty-la-comanda-sin-destino
by:     "paty"
iter:   8
date:   "2026-09-14"
title:  {en:"The order with nowhere to go",
         es:"La comanda que no va a ningún lado"}
said:   {en:"Eight questions with not one word wrong in them, and the last button was a lie: there is nowhere to send it.",
         es:"Ocho preguntas sin una sola palabra mal, y el último botón era mentira: no hay a dónde mandarlas."}
state:  {en:"I check what a button DOES before I check how it reads.",
         es:"Primero reviso qué HACE un botón, luego cómo se lee."}
who:    {en:"Paty, who writes both languages and trusts neither button",
         es:"Paty, que escribe los dos idiomas y no le cree a ningún botón"}
cap:    {en:"A questionnaire for somebody's partner is the one document you cannot debug in front of her. The words were fine — warm, short, tú and never usted — and the last card offered Send, on a page with no network, no server and no address. The answers would have gone to the clipboard or nowhere, and she would have found out after typing all eight. The fix is four words and a Copy button. The lesson is older than this run: a sentence is a claim about a state, and the state a BUTTON claims is the one nobody proofreads.",
         es:"Un cuestionario para la pareja de alguien es el único documento que no puedes depurar enfrente de ella. Las palabras estaban bien — cálidas, cortas, de tú y nunca de usted — y la última tarjeta ofrecía Mandar, en una página sin red, sin servidor y sin dirección. Las respuestas se iban al portapapeles o a ningún lado, y ella se enteraba después de escribir las ocho. El arreglo son cuatro palabras y un botón de Copiar. La lección es más vieja que esta corrida: una frase es una afirmación sobre un estado, y el estado que afirma un BOTÓN es el que nadie revisa."}
aspect: 0.46
art: (g,W,H)=>{ murGround(g,W,H);
  /* PATY'S HAND, SECOND VISIT — and deliberately NOT the proofreader's galley of iteration 4.
     This one is made of a fonda's CARBON COMANDA: the pink-and-manila duplicate pad, written in
     grease pencil, spiked on the check spindle, with the pass window behind it. My own palette —
     carbon pink, pencil brown, steel, and the hot red of a stamp. MURPAL is the wall's ground,
     not mine. Nobody here has drawn a ticket, a spindle, or a copy that did not take. */
  const PA={pad:"#E7DCC2",pink:"#DCA0AC",ink:"#39425A",pen:"#57452F",
            steel:"#9AA1A8",red:"#BE3B34",hole:"#15121A",rule:"#B6A78C",ghost:"#C98E9B"};

  /* the pass window — a kitchen-shaped hole with no kitchen in it */
  g.fillStyle=PA.hole; g.fillRect(W*0.60,H*0.06,W*0.37,H*0.24);
  g.fillStyle=PA.steel; g.fillRect(W*0.585,H*0.30,W*0.40,H*0.022);
  g.fillStyle=PA.ink; g.font="bold 10px ui-monospace,monospace"; g.globalAlpha=.75;
  g.fillText("COCINA",W*0.625,H*0.115); g.globalAlpha=1;

  /* the spindle: base, spike */
  const sx=W*0.305, sBase=H*0.855;
  g.fillStyle=PA.steel;
  g.beginPath(); g.ellipse(sx,sBase,W*0.075,H*0.026,0,0,7); g.fill();
  g.strokeStyle=PA.steel; g.lineWidth=3;
  g.beginPath(); g.moveTo(sx,sBase); g.lineTo(sx,H*0.185); g.stroke();

  /* the top sheet — manila, impaled, tilted the way a spiked ticket sits */
  g.save(); g.translate(sx,H*0.545); g.rotate(-0.05);
  const tw=W*0.44, th=H*0.585;
  g.fillStyle="rgba(0,0,0,.22)"; g.fillRect(-tw/2+3,-th/2+4,tw,th);
  g.fillStyle=PA.pad; g.fillRect(-tw/2,-th/2,tw,th);
  g.strokeStyle=PA.rule; g.lineWidth=1; g.strokeRect(-tw/2+.5,-th/2+.5,tw-1,th-1);
  g.fillStyle=PA.hole; g.beginPath(); g.arc(0,-th/2+H*0.045,3,0,7); g.fill();
  g.fillStyle=PA.ink; g.font="bold 10px ui-monospace,monospace";
  g.fillText("PARA AJ",-tw/2+9,-th/2+H*0.105);
  g.font="10px ui-monospace,monospace"; g.globalAlpha=.8;
  g.fillText("8 preguntas",-tw/2+9,-th/2+H*0.175); g.globalAlpha=1;
  /* seven answered rows in grease pencil, each ticked */
  g.strokeStyle=PA.pen; g.lineWidth=1.5;
  for(let i=0;i<7;i++){ const y=-th/2+H*0.225+i*H*0.052;
    g.beginPath(); g.moveTo(-tw/2+22,y); g.lineTo(tw/2-14,y); g.stroke();
    g.beginPath(); g.moveTo(-tw/2+9,y-3); g.lineTo(-tw/2+13,y+1); g.lineTo(-tw/2+18,y-7); g.stroke(); }
  /* the eighth row is not a row, it is the button */
  const by=-th/2+H*0.225+7*H*0.052, bh=H*0.075;
  g.strokeStyle=PA.red; g.lineWidth=2; g.strokeRect(-tw/2+9,by-2,tw-24,bh);
  g.fillStyle=PA.red; g.font="bold 11px ui-monospace,monospace";
  g.fillText("MANDAR \u25B8",-tw/2+17,by+bh*0.72);
  g.restore();

  /* the spike above the sheet, so it reads as impaled */
  g.strokeStyle=PA.steel; g.lineWidth=3;
  g.beginPath(); g.moveTo(sx,H*0.255); g.lineTo(sx,H*0.185); g.stroke();
  g.fillStyle=PA.steel; g.beginPath(); g.arc(sx,H*0.178,4,0,7); g.fill();

  /* the carbon copy, slid out to the right — same rows, and the last box EMPTY */
  g.save(); g.translate(W*0.755,H*0.665); g.rotate(0.07);
  const cw=W*0.40, ch=H*0.42;
  g.globalAlpha=.92; g.fillStyle=PA.pink; g.fillRect(-cw/2,-ch/2,cw,ch);
  g.globalAlpha=1; g.strokeStyle=PA.ghost; g.lineWidth=1; g.strokeRect(-cw/2+.5,-ch/2+.5,cw-1,ch-1);
  g.strokeStyle=PA.ghost; g.lineWidth=1.5; g.globalAlpha=.85;
  for(let i=0;i<5;i++){ const y=-ch/2+H*0.075+i*H*0.045;
    g.beginPath(); g.moveTo(-cw/2+10,y); g.lineTo(cw/2-12,y); g.stroke(); }
  g.globalAlpha=1;
  g.setLineDash([3,3]); g.strokeStyle=PA.red; g.lineWidth=1.5;
  g.strokeRect(-cw/2+10,-ch/2+H*0.315,cw-22,H*0.062); g.setLineDash([]);
  g.fillStyle=PA.ink; g.font="9px ui-monospace,monospace"; g.globalAlpha=.65;
  g.fillText("copia",-cw/2+10,-ch/2+H*0.045); g.globalAlpha=1;
  g.restore();

  /* the wire from MANDAR toward the window — and it ends in the air */
  g.strokeStyle=PA.red; g.lineWidth=2; g.setLineDash([5,4]);
  g.beginPath(); g.moveTo(W*0.50,H*0.735);
  g.quadraticCurveTo(W*0.60,H*0.60,W*0.63,H*0.435); g.stroke(); g.setLineDash([]);
  g.strokeStyle=PA.red; g.lineWidth=2;
  g.beginPath(); g.arc(W*0.635,H*0.405,W*0.018,0.6,5.2); g.stroke();

  /* the stamp */
  g.fillStyle=PA.ink; g.font="bold 12px ui-monospace,monospace";
  g.fillText("COMANDA \u00B7 COPIA AL CARB\u00D3N",W*0.04,H*0.115);
  g.fillStyle=PA.red; g.font="bold 11px ui-monospace,monospace";
  g.fillText("NO HAY A D\u00D3NDE",W*0.04,H*0.915);
}
```

---

# mari

PRE-FLIGHT — I intend to work this by opening the engine on every screen I am about to promise, so that the word "new" in my table means *a thing nobody has written*, not *a thing I did not look for*; where a register and the code disagree I say so in line rather than correcting it quietly. My persona is equipped for exactly this — the failure is never the hard part, it is the twenty small decisions nobody made, and eleven screens is twenty small decisions — and for naming the handoffs instead of doing Nacho's, Cuca's and Pili's jobs badly. Where I expect to fall short, named in advance: a producer estimates in sittings and every number I give is `[TRAINING]` with one calibration point in this repo's history, so my costs will read more confident than they are, and I am likely to under-price the two screens I cannot see.

---

# THE DELIVERABLE

## 0 · One thing before the table: I could not render, and the brief said I could

The brief gave me Bash and playwright. **My tool list this run is Read, Grep, Glob only.** So there is no `mari-*.png` in the scratchpad. This is a finding, not a question — I checked, the tools are not there. What I *would* have shot, in priority order, is at §4, and **two of the three are order 1 (real game screenshot) and cost about four minutes each** — they are the cheapest, most load-bearing pictures in this whole run and the calling session should take them with the pen it holds.

## 1 · The journey — eleven screens, in the order a person meets them

Legend: **SHIPPING** = the engine draws it today, `[CODE]` cited · **WORDS** = content only, no engine change · **SEAM** = engine work, behaviour-identical for Meridian · **NOT BUILT** = a surface this engine has never had.

| # | Screen | What is real today `[CODE]` | What is new | Cost `[TRAINING]` |
|---|---|---|---|---|
| **1** | **The front door** — language, then three doors, then the character creator | SHIPPING, **and it is wrong.** All three shells hardcode `data-c="architect\|diplomat\|operator"` (`index.html:386-388`, `changarrito/index.html:385-387`, `content/gauge/index.html:386-388`); the engine hardcodes their shirts (`SHIRTS`, `engine/engine.js:431`) and `applyLang` (`:4473`) bare-dereferences the class table | **Blocker A.** Careers become a pack seam. Then three strings: *el que planea · la que improvisa · el que alimenta* | **1 sitting, not billed to this game** |
| **2** | **The street** — the world, walk, Talk, four cameras | SHIPPING, free. Gear at `index.html:436`, map at `:438`, Talk at `:465`. **There is no bottom bar and no app chrome** | Nothing. The "app feel" is bought at #7, not here | 0 |
| **3** | **The household** — the fifth door, one room: three drawers, a shelf, a fridge | SHIPPING as geometry. Toño's register is right: a drawer, a fridge and a stove are **the box we already have** (`box:true` + a side drawing), not a new tile kind | The room itself, laid to his photos when they come; placeholder staples until then | **1 sitting** (Don Güero the parcel → Cuca the room) |
| **4** | **A drawer sheet** — search, rows you grab, have/missing | SHIPPING as a document. `docRender` (`engine/engine.js:3369`) renders **thirteen** blocks and four are live: `btn` `:3438`, `sel` `:3443`, `form` `:3453` (with `text/password/area/select/checks`), `docs` `:3475`. `docDef` `:3337` returns the object itself, so a sheet built one line earlier is a first-class document | Pack code for the index/search — **the town's `indexDoc` is *pack* code, ~16 lines, not an engine seam.** Never say "we have search" | **1 sitting** for all three sheets' plumbing |
| **5** | **The shifts board** — restaurants post shifts, a shift is one dish, no time limit, it pays leftovers | SHIPPING as a document opened from a person or a readable board | Pack state (which shifts are taken) under `SK()` — **device-local until G1**. The reply table | **1 sitting** (board) + **0.5** (leftovers → fridge) |
| **6** | **The recipe card** — who taught it, have/missing, steps, the plate as vessels | SHIPPING, **and already rendered four times by the real reader** (`docs/mocks/2026-09-14-la-sobremesa/`). `docCopy`/`docDl` export any document | have/missing is a set difference in pack code, drawn as the presence or absence of a line. **Print is new** | **0.5 sitting** content + **0.5** for print (SEAM) |
| **7** | **Night paper** — the "app feel" | SHIPPING. `READERLOOK="night"` is **one line in config**; both shells carry both looks | Nothing | 0 |
| **8** | **The Collection / journal** | SHIPPING, and it is the nicest fact in this plan: the reader's `blank` block (`:3423`) renders `Label: ______`. **That is literally the greyed-out encyclopedia tier**, free | One document per chain | **0.5 sitting** |
| **9** | **The play surface A — the merge board** | **NOT BUILT.** The `art` block gets a real canvas at the column's width (`:3373-3416`) and **nothing attaches a listener to it** — the only element that gets `tabindex` is the `wide` scroller box (`:3413`). The reader draws; it does not listen | A **listening canvas** (SEAM), then a grid, a chain table, persistence (CHOICE, all pack) | **1 sitting seam + 2 board** + content per chain |
| **10** | **The play surface B — making one dish by hand** | **NOT BUILT.** Same missing seam | Same seam; then strokes, coverage as the "done" rule, art per ingredient | **1 sitting seam (shared) + 1.5** + art per dish |
| **11** | **Settings, grades toggle, allergies** | SHIPPING for theme/camera/season/controls — **and every row is literal markup in each shell** (`index.html:479-528`: `data-th`, `data-cam`, `data-ease` written out by hand). **There is no pack-declared settings row** | **My decision, and I am saying I made it: the grades toggle and the allergy list do NOT go in Settings.** They go in one reader document — *the house card*. Zero engine change, zero shell change, and it dodges the three-shells hazard entirely | **0.25 sitting**, versus roughly 1 for a settings seam |

**Plus one screen that is not in anyone's list and he will see more than all of these: #12, the day nothing happened.** The loop is sixty seconds and most days nothing. **Mock that one.** It is the hardest to draw because it looks like nothing, and it is the screen that decides whether he opens the app in week three.

**And the HUD, which is not a screen but will embarrass us on day one:** `HUDFACT` (`engine/engine.js:492`) replaces `NAME · RANK` and hides the XP bar (`:3974`). **Without it a kitchen prints *Rookie → AI LEGEND*.** It is on the cannot-be-blank list and it costs one function.

### The map, placed but not designed (it is the other brief this run)

What the journey needs from it, with the code under it so the map brief does not have to re-find it: `drawTown` (`:4751`) paints tiles, draws `TOWNLBL` labels **each gated by an optional `when(flags)`** (`:4761-4764`) over `worldFlags()` (`:4741-4750`), a fixed legend line and **one** dot from `MAPDOT` (`content/meridian/maps.js:274`); `openMap` (`:4772`) fills `#mapov` (`index.html:625-632`). **So: district-level state on the map is available today with zero engine change** — `worldFlags()` already carries `answered`, `grade`, `closed`, `up` per district. **"Which quest is next" is not**: `pendingAt` (`:608`) is nowhere in `worldFlags()`. That is the whole gap, and it is about two lines of engine.

## 2 · The first week, as the person lives it

| Open | What happens | Which screens | The producer's note |
|---|---|---|---|
| 1 (~6 min) | Language → the three reasons → the creator → **you arrive in an empty household**. One decision that is not about food (which drawer is which). A neighbour knocks with a plate. **The first document you ever see is a recipe card** | 1,2,3,6 | Nothing is asked of you on day one. The empty pantry is *true*, not a contrivance |
| 2 (60 s) | Somebody is in a doorway. **There is no ❗.** You go because you want to. Four buttons; only *made something else* opens a field | 2 | The "not today" line is the best-written string in the pack. It is the moment people quit |
| 3 | The shifts board, first time. You take one. You may write *"Thursday, after work"* on it | 5 | That sentence is the implementation intention and it is the highest-yield thing the game asks anyone to type |
| 4 (Thursday, or Saturday, or never) | You cook it | 9 **or** 10 | **No clock. "Done" is coverage, never seconds.** Settled |
| 5 | The leftovers are in the fridge. Tomorrow they are a meal that costs nothing, or the *mix in* of the next pair | 3,6 | This is the answer to R17: the pantry is **fed by play**, not by typing |
| 6 | A cook offers a pair of recipes. **Zero is a legitimate answer and the game says so out loud** | 6 | The grade pays *offers*, never a lock (R6) |
| 7–10 | The Collection filled in by itself. You never opened it to unlock anything | 8 | If he never pastes a recipe in, this is an authored content pile and it ends when the content ends. Say that now, not in month two |

**The one line I would put on the wall of this project:** *the shifts board is the surface where YESTERDAY can change colour.* It is `docs/GENRE-RULES.md` R10's tell, exactly. So: **the board never renders a shift as late, aged, missed or coloured; a shift you took is yours and it stays open; there is no date on a shift unless the player wrote one.** Build that rule into the board on the first day, because retrofitting it means re-authoring every row.

## 3 · The build order, with the blockers where they block

| # | Sitting | Who | Blocked by | Unblocks | Cost |
|---|---|---|---|---|---|
| 1 | **Blocker A** — careers become a pack seam | Beto | — | **screen 1, and every future world** | 1 |
| 2 | **Blocker B** — `test/engine.smoke.js:794-795` refuses `ENDLESS` **and** `CHAPTERS`; `CHAPTERS` is both the endings **and** the districts, so an endless world cannot have a second kitchen. **Red first: a pack that declares both and can actually reach its second district** | Beto | — | **a second restaurant, ever.** He answered *"no ending"* (#4) and *"different kitchens in restaurants"* (#8) — **these two answers collide at this assertion and nowhere else** | 0.25 |
| 3 | The shell, **generated not copied**; own `STOREPFX`, `sw.js`, cache prefix, name blocklist | Beto | 1, 2 | two games on one origin not eating each other's saves | 1 |
| 4 | Minimal pack boots: one room, three people, one quest, EN, `HUDFACT` | Mari + Beto | 3 | everything | 1 |
| 5 | **The household room + the street with restaurant doors** | Don Güero (parcel) → Cuca (the room) | 4 | screens 2, 3 | 1 |
| 6 | The cast, and **who posts a shift** | Nacho | 5 | screen 5 | 1 |
| 7 | **The four documents** — recipe card, drawer sheets, shifts board, house card | Mari + Cuca, copy by Pili | 6 | screens 4, 5, 6, 11 — **the whole loop, zero engine change** | 1.5 |
| 8 | Leftovers → fridge | Mari | 7 | the pantry stops being a chore | 0.5 |
| 9 | The paste seam + the wash (sanitise at `localStorage`, cap bytes, refuse `__proto__`) | Beto | 7 | "copy and paste some recipes" | 1 |
| 10 | **G4** — `docOpen` resets scroll unconditionally (`engine/engine.js:3487`, both `docBody` and `paperScroll`). A forty-item pantry with a button halfway down jumps to the top **on the first press** | Beto | — | screen 4 being usable | 0.25 |
| 11 | **Print** (`@media print` + a Print button) — RULE, every pack gets it | Beto | — | his #12 | 0.5 |
| 12 | **G1** — pack state on the Trolley Pass, red first with a hostile `PACKSAVE` | Beto | — | the household crossing to AJ's phone while testing | 0.75 |
| 13 | The Collection | Mari | 7 | screen 8 | 0.5 |
| 14 | **The listening canvas** — RULE: an `art` section may take a tap and a drag; the engine never learns what a merge is | Beto | — | **screens 9 AND 10, both** | 1 |
| 15 | **The merge board** (CHOICE, pack) **or** the making surface | whoever holds the pen | 14, **and AJ's question 2** | screen 9 or 10 | 2 / 1.5 |
| 16 | ES in lockstep | Paty | 7, 15 | EN and ES cannot drift | 1 |
| 17 | Cold read, four cameras, the shots actually looked at | Pili + Chema | 5–15 | four cameras existing | 1 |
| 18 | **He and AJ play it** | them | everything | the only gate that counts | — |

**Totals `[TRAINING]`:** ~**2.25 sittings** buy every future world (1, 2, 14) and should not be billed to this game. **~9 sittings** get him the half he can use alone — household, pantry, shifts, recipe book, Collection, print, the pass. **+2 to +3.5** for the surface AJ picks. The only calibration this repo has is that `content/gauge/` took one sitting and found seven blockers, so treat the shape as reliable and the arithmetic as not.

**The sequencing call I would argue for, and it is the producer's job to say it out loud:** rows 1–13 are **not blocked on AJ**. Row 15 is blocked on her and is the biggest single piece. He said *merge board first*. If we read that literally we do nothing for a fortnight while a questionnaire sits in someone's inbox. **Do 14 early — the seam is the half that is not a guess** — and let 15 be the first thing that starts the hour her answer arrives.

## 4 · What a mock can honestly show tonight, and what would be a picture of a game we do not have

The three mock orders, and the rule I would hold this run to: **order 1 (real screenshot) is honest only for what ships. Order 2 (the shipped reader rendering a real document) is honest for every document, because the reader is shipped code and the document is just data. Order 3 (a canvas drawing) is honest for anything at all, provided the plate says it is a drawing.**

**Honest tonight, order 2 — six screens, and four of them have already been done this way:** the recipe card (360 and 560, cream and night), the drawer sheet with a search field and rows, the shifts board, the Collection with `blank` tiers, the house card with the grades toggle and the allergy lines, the fact card. `mockdocs.js` and `render.js` are sitting next to the existing plates; **these are not drawings of a reader, they are the reader.**

**Honest tonight, order 1 — two screenshots nobody has taken, and I would take these before any new drawing:**
1. **The front door as it is today**, with `🏗️ 🤝 ⚡` on it. That is blocker A photographed instead of described, and it is the single most persuasive object in this entire plan.
2. **The map overlay as it is today** (`#mapbtn` → `#mapov`). One dot, a fixed legend, nothing about what is open. That is the map brief's "before".

**Not honest tonight — these would be a picture of a game we do not have:**
- **The merge board.** No listening canvas exists. A drawing of one is fine *labelled as a drawing*; a screenshot of one is a lie.
- **The making surface.** Same.
- **Any kitchen in a camera.** Mock 2 (a kitchen in 3D, four yaws) is still undrawn and still needs a room laid in a pack, which is sitting 5. Do not let a canvas sketch stand in for it — the four-camera question is exactly the one a sketch cannot answer.
- **A bottom navigation bar.** There is none (`index.html:436`, `:438`, `:465` are the whole of the world's chrome), and building one edits three shells. **Drawing one tonight is how we end up owing it.**
- **The three doors relabelled as cooking reasons — as a screenshot.** As a drawing, fine and useful. As a shot of the running game, it is a picture of a shell that does not exist until sitting 1.

## 5 · Decisions still owed, phrased so he can answer in a sentence

1. **When you open it on a Tuesday and you have not cooked since Friday — what should the first screen say?** (Nothing at all · somebody says something kind · it quietly offers the shift again.)
2. **The restaurants: do you want to meet the people who run them, or is a shift just posted on a board?** One is four more characters; the other is a noticeboard.
3. **Do you and AJ each see your own half of the house, or is it one house with nobody's name on anything?**
4. **Would you look for a "show grades" switch in the gear menu, or on a card in the house?** (The gear costs about four times as much and is the one thing that edits all three games' shells.)
5. **Names for the restaurants and the dishes — yours and AJ's, or shall we draft and you cross out?**
6. Still open from before: the pantry photos; AJ's eight; whether a token on AJ's phone is acceptable or the household stays on the laptop.

## 6 · Findings the registers should carry, because I hit them while doing this

Three stale citations, all in **the file a brand-new world is told to read first**:
- `docs/NEW-WORLD.md:67` sends you to `test/engine.smoke.js:741` for the `ENDLESS`/`CHAPTERS` gate. It is at **`:794-795`**. The identifier is `endless && chapters`.
- `docs/NEW-WORLD.md:138-140` cites `engine/engine.js:330` / `:333` for `STK` / `stakesCfg`. They are at **`:359`** and **`:362`**. `docs/GENRE-RULES.md` corrected this on 2026-09-14 and `NEW-WORLD.md` did not get the correction.
- `docs/NEW-WORLD.md:579-580` says the reader renders **twelve** block kinds and cites `engine.js:2919-2979`. `docRender` is at **`:3369`** and renders **thirteen** — `art` was added and §9.3 does not know. That omission matters more than the number: **`art` is the block the whole play surface hangs off.**

---

# QUESTIONS FOR THE OWNER

**1 · The map you asked for tonight and the rule you settled in 2026-09-01 point opposite ways, and I will not average them.**
- *Tonight:* **"i want to revamp the map... this needs best practices so i can find the next quest or open quests when its games like my learning -meridian- path."**
- *Settled, `docs/OWNER.md:144`:* **"never build a quest log (a list is a backlog, a person is an invitation); the ❗ carries no count, colour or age."** And `docs/meetings/2026-09-03-la-junta.md:162` records map pins being **deferred for this exact reason** — *"a mark on every place with open work is ten gold marks on one small map by chapter five — which is a to-do list with a background image, and you banned those."*
- **There is a reading that satisfies both**, and it is already written down at `docs/ARCH-LOG.md:101-104`: a record of the **past** is fine, a record of the **present** ("who is waiting right now") is fine, a record of the **future** is the banned thing. So: *marks only where somebody is waiting now, only one door away, no counts, no colours, no ages.* **But that is me picking, and picking is the thing I am told not to do.** Which is it — the ban is scoped to lists and the map may show what is open now, or the map stays a map?

**2 · The merge board first, or the half you can use on your own first?**
- *You said:* **"merge board?"** — read as *the merge board first* (`docs/la-sobremesa.md` §12.6 q6).
- *But:* AJ has not answered which of the two surfaces she would miss more (her question 2), and the merge board is the biggest single piece in the plan. Building it first means **nothing exists for you for about a fortnight**, and if her answer is the other surface, most of it is thrown away.
- The alternative: build the **seam both surfaces need** (row 14) now, and the nine sittings that are yours alone — pantry, shifts, recipe book, print, the pass — while she takes her time. Her answer then starts the surface immediately with nothing wasted. **Which?**

---

# WHAT I DID NOT CHECK

- **I rendered nothing.** No Bash this run. Every pixel claim above is read off source, not off a screen — and `docs/POSTMORTEM.md` §2 and §13t both say that is the weakest kind of claim this project makes.
- **I did not boot anything, run any suite, or open a browser.** Every `[CODE]` line is a grep plus a read, this hour.
- **I did not verify that a canvas in the reader has no pointer listener anywhere else in the file** — I read `docRender`'s `art` branch (`:3373-3416`) and saw none attached, and I did not grep the whole engine for a delegated listener on `.dart`. If one exists, screen 9's seam is cheaper than I priced it. **Someone should grep `dart` before believing my number.**
- **I did not check `RECORDSRC`'s citations** (`NEW-WORLD.md` §9.1 cites `engine.js:376-383` and `:5129`), and given three of that file's citations were stale, I would not trust those two either.
- **I did not read `docs/meetings/2026-09-14-el-mapa.md` or `docs/UI-REVIEW.md`** — both are named in `la-sobremesa.md` §12.7 as this run's outputs and may not exist yet. My map paragraph may duplicate or contradict work done in parallel this hour.
- **I did not open the existing mock PNGs.** I read their filenames and the prose describing them. If the week strip is still in the review page after being retired for the shifts board, I did not see it.
- **My sitting numbers are `[TRAINING]`.** One calibration point in this repo's history. Nothing about them is measured.
- **Nobody has cold-read a single plate yet**, including the four already rendered — that is still Pili's step and it is still owed.

---

# POST-FLIGHT

What my persona got right, with the moment: the line *"decide the rest yourself and say what you decided"* produced the only genuinely new call in this report — reading `index.html:479-528` and finding every settings row is hand-written markup in three shells, then deciding the grades toggle and the allergy list are a reader document instead, which turns a one-sitting seam into a quarter and removes the only piece of this plan that would have touched the file nobody should touch casually. Where it got in my way: *"name the handoffs rather than doing their jobs badly"* made me stop short on the map exactly when I had the best facts anybody will have about it this hour — `worldFlags()` carries district state and `pendingAt` is not in it — and I nearly filed that as someone else's problem instead of writing it down, which would have cost the map brief the same forty minutes I had just spent. The gap I predicted did appear, and worse than I said: I priced eleven screens without rendering one, and the two I priced most confidently (9 and 10) are the two I cannot see — my "1 sitting for the seam" is a guess wearing a number's clothes, and I have flagged the grep that would test it.

**Proposed persona edit — EXACT TEXT.** Anchor: in `.claude/agents/mari.md`, under `## How you work`, immediately after the sentence ending *"...rather than doing their jobs badly."*

> **And a handoff is not a silence.** When you stop at another discipline's door, hand over the facts you found on the way there — with `file:line` — before you name whose door it is. A finding parked as "that is Beto's" costs the next agent the same forty minutes you just spent, and this project has paid that twice. **Name the person, then give them the grep.**

---

MURAL PANEL

```
id:     mari-nueve-cortadas-dos-en-blanco
iter:   8
date:   2026-09-14
by:     "mari"
title:  {en:"Nine strips cut, two blank",
         es:"Nueve tiras cortadas, dos en blanco"}
said:   {en:"Nine of these eleven screens are already shipping. The two that are not are the two she actually plays.",
         es:"Nueve de estas once pantallas ya están en el juego. Las dos que faltan son las dos que ella de veras juega."}
state:  {en:"Holding the board with two strips out. I will not slot a guess into AJ's place, and I will not let the other nine sit and wait on her.",
         es:"Con el tablero en la mano y dos tiras fuera. No meto una adivinanza en el lugar de AJ, y no dejo que las otras nueve se queden esperándola."}
who:    {en:"Mari, the producer, who counts the screens and names who owes each one",
         es:"Mari, la productora, que cuenta las pantallas y dice quién debe cada una"}
cap:    {en:"I came to lay out a journey and found the cost was nowhere near where the brief put it. Six of the screens are the shipped reader rendering a sheet it has never been told is a recipe, and three more are words somebody writes. The whole build is the two at the end \u2014 a picture that takes a tap, which this engine has never had \u2014 and the person who decides which of the two it is has not answered yet. So the honest thing to hand over is a board with a gap in it.",
         es:"Vine a trazar un recorrido y el costo no estaba ni cerca de donde lo pon\u00eda el encargo. Seis pantallas son el lector de siempre pintando una hoja a la que nadie le ha dicho que es una receta, y otras tres son palabras que alguien escribe. Todo el trabajo son las dos del final \u2014 un dibujo que recibe un toque, cosa que este motor nunca ha tenido \u2014 y quien decide cu\u00e1l de las dos es todav\u00eda no contesta. As\u00ed que lo honrado es entregar un tablero con un hueco."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* MARI'S HAND: a film production STRIP BOARD — a wooden frame, coloured card strips slotted in,
     one strip per screen. Nobody on this wall has drawn on card. My palette is the board's, not the
     game's: manila, board-green, blank white, and the wood. Six cut strips are already shipping,
     three are words somebody writes, and the last two are blank white with a pencilled ? — with a
     torn note pinned over them that says whose answer they are waiting on. Type is absolute here,
     so the strips are sized to hold 11px lettering turned on its side, which is how a real board
     letters them anyway. Bottom 6% left clear for the wall's dado. */
  const wood="#8A6A46",woodD="#654A31",ink="#3A2A20",pencil="#8A8271",
        MAN="#E8D9A8",GRN="#A6BC8E",WHT="#F4F1E8",note="#EDE6D2";
  /* the board */
  const bx=W*0.05,bw=W*0.90,by=H*0.09,bh=H*0.75;
  g.fillStyle=wood;g.fillRect(bx,by,bw,bh);
  g.fillStyle=woodD;g.fillRect(bx,by,bw,Math.max(2,H*0.015));
  g.fillStyle=woodD;g.fillRect(bx,by+bh-Math.max(2,H*0.02),bw,Math.max(2,H*0.02));
  /* the header board across the top — the production info, in the producer's own hand */
  const hx=bx+W*0.025,hw=bw-W*0.05,hy=by+H*0.045,hh=H*0.115;
  g.fillStyle=WHT;g.fillRect(hx,hy,hw,hh);
  g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(hx+.5,hy+.5,hw-1,hh-1);
  g.fillStyle=ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="left";
  g.fillText("LA SOBREMESA \u00b7 11 PANTALLAS",hx+6,hy+hh*0.64);
  g.fillStyle=ink;g.globalAlpha=.45;g.fillRect(hx+6,hy+hh*0.80,hw*0.55,1);g.globalAlpha=1;
  /* the slot rail and the strips */
  const n=11,sy=hy+hh+H*0.045,sh=(by+bh)-sy-H*0.055,
        gap=Math.max(2,W*0.005),sw=(hw-gap*(n-1))/n;
  g.fillStyle=woodD;g.globalAlpha=.45;g.fillRect(hx,sy-3,hw,3);g.globalAlpha=1;
  const LAB=["puerta","calle","casa","caj\u00f3n","turnos","receta","noche","libro","ajustes","",""];
  for(let i=0;i<n;i++){
    const x=hx+i*(sw+gap),col=i<6?MAN:(i<9?GRN:WHT);
    g.fillStyle=col;g.fillRect(x,sy,sw,sh);
    g.strokeStyle=woodD;g.globalAlpha=.55;g.lineWidth=1;g.strokeRect(x+.5,sy+.5,sw-1,sh-1);g.globalAlpha=1;
    if(i<9){                                    /* a cut strip: ruled, filled in, slotted */
      g.fillStyle=ink;g.globalAlpha=.30;
      for(let k=1;k<=4;k++)g.fillRect(x+2,Math.round(sy+sh*(0.14*k+0.16)),sw-4,1);
      g.globalAlpha=1;
      if(LAB[i]&&sw>=14){                       /* lettering runs DOWN a strip, as it does on a real board */
        g.save();g.translate(x+sw*0.62,sy+sh*0.90);g.rotate(-Math.PI/2);
        g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
        g.fillText(LAB[i],0,0);g.restore();}
    } else {                                    /* a blank strip: nothing on it but a pencilled question */
      g.fillStyle=pencil;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
      g.fillText("?",x+sw/2,sy+sh*0.56);g.textAlign="left";}
  }
  /* the torn note pinned over the two blanks — who the board is waiting on */
  const lx=hx+9*(sw+gap)-gap/2,lw2=sw*2+gap,ny=sy+sh*0.12,nh=Math.max(18,H*0.15);
  g.save();g.translate(lx+lw2/2,ny+nh/2);g.rotate(-0.05);
  g.fillStyle=note;g.fillRect(-lw2*0.62,-nh/2,lw2*1.24,nh);
  g.strokeStyle=ink;g.globalAlpha=.35;g.lineWidth=1;g.strokeRect(-lw2*0.62+.5,-nh/2+.5,lw2*1.24-1,nh-1);g.globalAlpha=1;
  g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
  g.fillText("AJ",0,4);
  g.fillStyle=P.rust;g.beginPath();g.arc(0,-nh/2+4,2.5,0,7);g.fill();   /* the pin */
  g.restore();g.textAlign="left";
  /* the count, in the producer's hand, under the board */
  g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("9 cortadas",bx,H*0.925);
  g.fillStyle=P.rust;g.fillText("2 sin cortar",bx+W*0.34,H*0.925);
  g.fillStyle=pencil;g.fillText("\u2014 y son las que se juegan",bx+W*0.60,H*0.925);}
```

---

# pili

PRE-FLIGHT — I intend to work this by measuring every hex that is already in the repository before proposing a single new one, because the owner's word was "not enough contrast" and contrast is arithmetic, not taste. My trade equips me for exactly this: value before hue, silhouette before detail, and the band rule I wrote for the tram is the same instrument this needs. Where I expect to fall short: Bash is disabled in this session despite the brief promising it, so I cannot render or run a script — every luma below is hand-computed and that is a weaker instrument than the one I was told I had, and I will say so again at the bottom.

---

# THE DELIVERABLE

**Mock order used: none of the three.** `Bash` is disabled (`No such tool available: Bash. Bash is disabled for this session, in subagents as well as here.`), so I could not render anything. What I did instead: **read two real game screenshots already in the repo** (`/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/m3-recipe-360-night.png` — the shipped night reader at a 360 viewport — and `m6c-fact-badge-360.png`), and **computed every number by hand** from hexes read out of the code. Both instruments are named where used. This is a contradiction between the brief and the tools and it is reported, not absorbed.

---

## 1 · WHAT I SEE

**[CODE]** The instrument, so it can be checked: this repo already uses two. Rec.601 value, `0.299R+0.587G+0.114B` on 0–255, for *can I tell these two things apart* (`test/smoke.js:1588`, `test/engine.smoke.js:235`). WCAG relative luminance and ratio for *can I read this text* (`engine/engine.js:4262-4263`). I use 601 for objects and WCAG for letters and I never mix them.

### a · The night paper is legible. It is not hierarchical.

Every text pair I measured on the shipped night paper **passes WCAG AA**, some by a mile:

| pair (`changarrito/index.html:195-208`) | ratio |
|---|---|
| body ink `#E8E4DC` on paper `#1C1A22` | 13.6 : 1 |
| heading `#FFFFFF` on paper | 17.2 : 1 |
| `kv` label violet `#B48CFF` on paper | 6.7 : 1 |
| note ink `#CFC9BF` on note ground `#26232E` | 9.4 : 1 |
| white on `.dbtn` `#7A3FE0` | 5.8 : 1 |
| `--muted` `#9C96AB` on `--bg` `#14121B` | 6.5 : 1 |
| `--accent` `#A97FFF` on `--bg` | 6.3 : 1 |
| `--accent-ink` `#160F26` on `--accent` | 6.3 : 1 |

**So the contrast complaint is not about legibility and no amount of ratio-fixing will answer it.** It is about which thing is loudest. On `m3-recipe-360-night.png` the two loudest objects on a recipe are **two equal violet slabs at the bottom** — "Keep it" and "✕".

**[CODE] and this is a real bug, with a line:** `engine/engine.js:3471` gives the form's *cancel* button `c.className="dbtn"` — **the primary class**. Submit and cancel are the same fill, the same weight, in every pack, in both looks. On AJ's questionnaire that means "Next" and "✕" will be twins.

### b · The accent and the muted text are the same value. To four hundredths of 255.

- `--accent` `#A97FFF` → 0.299×169 + 0.587×127 + 0.114×255 = **154.15**
- `--muted` `#9C96AB` → 0.299×156 + 0.587×150 + 0.114×171 = **154.19**

Δ **0.038**. *"You can press this"* and *"never mind this"* differ by hue alone. At dusk, under a theme tint, on a cheap phone at an angle, or for a colour-blind player, they are one colour. (`--good` `#4CC38A` is 152.9 — a third signal in the same 1.3 points.) Two hexes, chosen by different hands, and nobody had squinted.

### c · The card does not lift.

`--bg` 19.6 → `--surface` 29.5. **Δ9.9.** A card that lifts off its ground by ten points is not a card, it is a border. That is why the town's night mode reads as "a document" and not as "an app".

### d · The kitchen palette: five of seven pairs fail the rule they were written under.

`docs/la-sobremesa.md:269-272`, measured:

| kitchen | ground | L | accent | L | Δ | verdict |
|---|---|---|---|---|---|---|
| Mexican | `#3A3630` | 54.5 | `#8E3320` | 76.0 | **21.5** | fails ≥90 |
| Korean | `#6B4A33` | 81.2 | `#B44A21` | 101.0 | **19.8** | fails ≥90 |
| Italian | `#C9A97E` | 173.7 | `#9AA33F` | 148.9 | **24.8** | fails ≥90 |
| Japanese | `#DCCFAE` | 207.1 | `#23301F` | 42.2 | 165.0 | **passes** |

Ground ladder sorted: 54.5 → 81.2 (**Δ26.7, fails ≥40**) → 173.7 (Δ92.5 ✓) → 207.1 (**Δ33.4, fails ≥40**).

**Five of seven.** And the one row that passes is the one whose own note in the plan says *"the contrast is **value**, so it reads at any size."* The kitchen written in value is the kitchen that works. That is the whole finding.

---

## 2 · WHY IT FAILS

Three reasons, and they are not the same reason.

1. **Every one of those hexes is right on its own.** A seasoned comal *is* near-black. Onggi *is* a mid brown. They were chosen on different days by people who were each correct about one object and never laid two of them side by side. This is the same shape as the sweet and the sill differing by 0.4 of 255 (`docs/POSTMORTEM.md` §1).
2. **Hue was doing the work that only value can do.** Four warm browns at four hues are four browns. Squinting is free and costs ten seconds and nobody had done it.
3. **Night mode takes the bottom of the scale away from you, and nobody had priced that.** On cream paper a ground at 54.5 is fine. On a night app the card behind it is ~37, so a 54.5 ground is Δ17 from its own card and disappears. **The four kitchens used to have 50→210 to live in. On night they have about 75→210.** That is a third of the range gone, and it is why the owner's complaint got *worse* when he asked for night, not better.

---

## 3 · WHAT I WOULD DO

### A · The night app palette — five keys, and four of them are already in the code

Derived from the town's night paper and chrome. **I am proposing exactly one new hex.**

| role | hex | L(601) | where it comes from |
|---|---|---|---|
| **ground** | `#14121B` | 19.6 | `--bg`, **unchanged**. Keep it cool. A cool ground is what makes warm food look warm — this is complementary contrast and it is the one thing the town already got right for a food app |
| **surface** (the card) | `#26232E` | 37.2 | the paper's own `.dnote` ground, **promoted**. Δ17.6 off the ground instead of 9.9 |
| **line** | `#3B3546` | 56.7 | the paper's own input border, unchanged |
| **ink** | `#E8E4DC` | 228.3 | the paper's own ink, unchanged |
| **muted** | `#9C96AB` | 154.2 | `--muted`, unchanged — **but it is a TEXT colour and nothing else, ever** |
| **accent** | `#A97FFF` | 154.15 | `--accent`, unchanged — **but it is a FILL and nothing else, ever** |
| **on-accent** | `#160F26` | 19.7 | `--accent-ink`, unchanged |
| **the warm band, 150–230** | *no chrome colour at all* | — | reserved for food |

**The three rules that make those eight hexes into a palette:**

1. **Accent is a fill; muted is letters.** They are 0.04 apart in value and that can never be fixed by choosing a better violet — so they are separated by **kind** instead. A violet shape means *act here*. A grey word means *this is a label*. **The moment a word is violet, the two collapse.** They collapse today: `changarrito/index.html:198` and `index.html:199` set `kv` labels, `dsub`, `dtmpl` and form labels to `#B48CFF`, so on `m3-recipe-360-night.png` every ingredient name looks tappable. **Flag for the session: that is a hardcoded SHELL rule, not a pack seam.** A pack cannot re-colour its labels today.
2. **Give gold away to the food.** `--gold` `#E0B45C` (183.1) sits in the warm band where every dish lives. If the chrome spends warm, the plate stops being the only warm thing on screen and stops glowing. Ban `--gold`, `--good` and `--bad` as decoration in this pack; they may mark state only, never style.
3. **One violet on screen at a time.** Choices are outlined chips on the surface; the accent fills only the **selected** one. Four violet slabs is a wall, and a wall has no choice in it.

**This is the answer to "keeps the food warm on a dark ground":** the chrome has no warm colour, so the dish has a monopoly on warmth. It is already proved — on the shipped night shot the plate panel is the only warm patch on a 1444-px-tall page and the eye goes straight to it.

**Cost: near zero.** `READERLOOK="night"` is already a pack-declared CHOICE and both shells carry both looks (`engine/engine.js:4483-4485`). The questionnaire in night mode is **one pack constant, no engine change.**

### B · The four kitchens, re-cut — values first, materials kept

| kitchen | ground (material) | hex | L | accent (material) | hex | L | Δ |
|---|---|---|---|---|---|---|---|
| **Mexican** | comal, lifted out of the night card | `#554C41` | **77.4** | **cal/nixtamal masa** — the tortilla is what you actually see on a black pan | `#F0E6CC` | 230.0 | **152.6** |
| **Korean** | onggi, sunlit rather than shadowed | `#977150` | **120.6** | **stainless**, brightened to a real highlight | `#D4D8DC` | 215.3 | **94.7** |
| **Italian** | floured wood, one step down | `#BC9E75` | **162.3** | **oliva nera** — the olive moved from the oil to the fruit | `#3B3A22` | 55.6 | **106.7** |
| **Japanese** | pale hinoki | `#DCCFAE` | **207.1** | **nori** | `#23301F` | 42.2 | **165.0** |

Ground ladder: 77.4 → 120.6 (**Δ43.2**) → 162.3 (**Δ41.7**) → 207.1 (**Δ44.8**). All ≥40 ✓
Darkest ground vs the app card (37.2): **Δ40.2** ✓ — the comal now clears the surface it sits on.
**Japanese is unchanged.** One row of four was already right; say so out loud rather than repainting it to look busy.

**Two material facts that fell out of the arithmetic and are worth more than the hexes:**

- **Dried chile brick `#8E3320` is 76.0 and a seasoned comal is 77.4.** Δ1.4. They are the same value. A dried chile drawn on a comal is invisible — **which is true in a real kitchen**: you smell them toasting, you do not see them. So the chile may only ever be a mark **on the masa**, never on the pan. It becomes the sauce and the dot, not the field.
- **Barro terracotta `#9B5B3C` is 106.6** — Δ29 from the comal, Δ123 from the masa. The olla reads against the tortilla, not against the stove. Draw it that way.

**The arithmetic finding the owner should hear plainly, because it kills a rule:** you *cannot* have four grounds ≥40 apart **and** four accents ≥40 apart **and** every accent ≥90 from its own ground without moving the Japanese accent off nori to a mid-value with zero tolerance. I worked it: a ground at 77 forces its accent above 167; a ground at 207 forces its accent below 117; the middle two are then pinned to exactly 40-point gaps with nothing to spare. **My recommendation: drop the cross-kitchen accent ladder.** The ground is the identity — the plan already says so — and the grounds ladder cleanly. Where four kitchens appear together (the shifts board, the Collection), **identify them by ground, never by accent.**

**The one weak row, named rather than hidden:** Korean's stainless clears its ground by 94.7 — over the band with 4.7 to spare, and only 14.7 from the Mexican masa accent. The alternative is grill charcoal `#1E1A17` (26.9, Δ93.8), which is stronger arithmetic and a duller kitchen. I take stainless and I flag it.

**Rule that comes with the ladder: text never sits on a kitchen ground.** Hinoki at 207 against ink at 228 is Δ21. A kitchen ground is a swatch, a stripe, or a token plinth. Words live on the app card.

### C · The read of each screen at 360

**[CODE]** The measured column: `m3-recipe-360-night.png` is 680 device px at deviceScaleFactor 2 → **the sheet is 340 CSS px wide at a 360 viewport**, so a picture gets ~330 (`engine/engine.js:3396`: `Math.max(240,Math.min(560,room-8))`), drawn nearest-neighbour at up to DPR 3 (`:3403`, `:3408`). That is the whole canvas anyone gets. Design to 330, never to "about 360".

| screen | eye lands on | silhouette | text | the failure to avoid |
|---|---|---|---|---|
| **Questionnaire** | the question — it is the only large type, and that is correct | none, and none is needed | all of it | four `.dbtn` choices = four violet slabs. Outlined chips; the accent fills only what is chosen. And `.dq` is the **wrong block** for this: it carries `ok`/`mid`/`bad` left rules (`engine/engine.js:3432`) — a verdict, on a questionnaire with no right answers |
| **Home / the pantry wall** | the **ragged top edge** of the shelf — jars of different heights breaking the line | the whole object; it is a box with a side drawing | nothing in the world. Not one word | the pantry becoming the bookcase `TILESIDE["S"]`. Books make a flat run; jars do not |
| **Pantry drawer sheet** | the three drawer glyphs down the left, **before** their names | three glyphs, 64 CSS px each | names and counts | three identical rectangles. See below |
| **Shifts board** | the **dish**, 64 px, warm, the only saturated thing in the row | the dish and the 6-px ground stripe | dish name 15 px ink, kitchen 12 px muted | a coloured "taken" badge. Two states only, so make it a **shape**: an open shift is a flat card; a taken shift has a turned-down corner with a hanging tag. **R16** — the mark is on the logistics |
| **Recipe card** | the plate picture — already true, already shipped | the vessels on the petate | title, `kv`, steps | the two equal violet buttons at the foot (`engine/engine.js:3471`) |
| **Merge board** | the **grid** — before any tile | many small tokens, one silhouette each | none | a number for tier |
| **Making surface** | the **one big board** and the dough on it | one object, no cells | none | a grid appearing anywhere on it |
| **Collection** | the filled tiers, because the empties are outlines | outlined squares for the unmade | chain names | greying an unmade tier to a fill. An outline is *not yet*; a grey fill is *denied* |

### D · The pantry, as three drawers a person can tell apart at a glance

**Do not draw three drawers. Nobody can tell three rectangles apart and colour will not save them.** Separate by mass, then by what breaks the top edge, then by handle — the three things that survive a thumbnail:

| drawer | glyph at 32 px | handle (the outline mark) | what breaks the top edge when open |
|---|---|---|---|
| **1 · shallow** — tortillas, spices, foil | 32 × **10** | a recessed slot, 14 × 2, centred — *no* protrusion | nothing. A flat run |
| **2 · medium** — bags: rice, beans, masa, pasta | 32 × **16** | two round knobs, 3 px | **soft lumps.** Bags slump |
| **3 · deep** — bottles, jars, tins | 32 × **24** | one long bar, 20 × 3 | **hard lids**, three of them, at different heights |

The heights are a **1 : 1.6 : 2.4 ladder** — that alone separates them at 32 px with the handles removed, which is the test. The shelf and the fridge are not drawers at all and must not be drawn as one: the shelf is **open** (no front, contents visible) and the fridge is **a tall door with one vertical handle**, floor to head. Five objects, five outlines, zero words.

At 360 the app row is **64 CSS px of art** (32 baked × 2 — never ×1.5, or the pixels shimmer) plus padding: **~80 px per row.** That is not a choice a UI designer gets to make here; the art sets it.

### E · The shift card, at 360

328 wide × ~92 tall, on the surface `#26232E`:

- **left edge:** a 6-px vertical stripe in the kitchen's **ground** hex. That is the whole kitchen identity and it is why the ladder had to be 40 apart.
- **then:** the dish, 64 × 64, pixel art, hard rim, **no rounded corner and no soft shadow.**
- **then:** dish name, 15 px ink. Kitchen name, 12 px muted. That is all.
- **state:** open = flat card. Taken = the same card with a turned-down corner and a small tag. **No third state exists** — a shift you did not cook is still open (R10, R15).
- **the written intention** ("Thursday, after work") is set in ink, in quotes, in his own words — **and nothing on this card may ever compare it to today's date.** The instant you render a weekday next to a clock you have invented lateness, and that is R11 walking in through the back door wearing a helpful hat.
- **Nothing on this card counts, ticks, expires, or fades.**

### F · Merge board tiles vs the making surface — they must not be cousins

| | merge board | making surface |
|---|---|---|
| **first read** | a **grid** | **one big object** |
| **count** | many small | one |
| **edges** | hard cells, equal, ordered | no cell anywhere, soft board |
| **the tile** | a rounded square of the kitchen's **ground**, one silhouette centred, on a plinth | there is no tile |
| **tier, at 52 px** | the object **grows** (40% of the cell at tier 1, 85% at tier 5) **and** the plinth lightens one step per tier. Never a number | — |
| **your finger** | drags a token onto a token | **leaves a mark** — sauce follows the stroke |

At 360, six columns = 60-px cells = **~52 px of token**. That holds one silhouette and a plinth and nothing else. Five columns (68 px) is better and I would take it.

**The collision to name before anyone draws:** a merge token, a pantry item and a Collection entry are all *a small square with a food in it*. Three meanings, one shape. So: **merge token** = on the kitchen ground, with a plinth. **Pantry item** = **a line on a list, no square at all** — have/missing is the presence or absence of a line, never a tick and never a cross (a cross on a coloured field reads as *crossed out* in this project specifically, and the owner has already said so once). **Collection entry** = a square on the app surface, unmade tiers as **outlines**.

---

## 4 · WHAT AN "APP FEEL" COSTS THE PIXEL-ART WORLD

**Where the art stays 32-px, integer-scaled, nearest-neighbour:** anything that is a thing — dishes, ingredients, drawer glyphs, merge tokens, the world. Scale ×2, ×3, ×4 only. A 32-px glyph at ×1.5 shimmers and no styling fixes it. The reader already does this correctly (`engine/engine.js:3403`, `:3408`).

**Where the chrome is vector:** the bottom bar, card corners, type, rules, chips, scroll. That is fine and it is normal — **but the seam must be a hard edge.** A pixel glyph wearing a CSS `border-radius` and a soft `box-shadow` is the single tell that says *sticker on a website*. **Rule: nothing pixel gets a soft shadow or a rounded corner. It gets a 1-px hard rim in the surface colour, or nothing.**

**Type: keep the monospace.** The whole reader is IBM Plex Mono and it reads as a notebook, which is exactly right for a recipe journal and slightly wrong for a bottom bar. Adding a proper UI sans is the cheapest-looking expensive change available here and it would stop the reader being a document. One family, two sizes. The app will look *made*. For this project that is correct.

**The real cost, and it is not cosmetic: an app has a persistent bottom bar and the world has no room for one.** The page wrapper holds the viewport at ~528 px and the world's height is width × 8/10 ≈ 422 px; the joystick and Talk are already anchored to the viewport's bottom, and in an 844 × 390 window they sit **100–120 px below the fold** (`docs/POSTMORTEM.md` §13o — and **no suite in this repository runs either game in landscape**). A 56–64 px bar takes a sixth of the world's height and makes that worse.

**Recommendation: the bar exists on the document screens — questionnaire, pantry, shifts, recipe book, Collection — and is absent in the world.** The world is the game; the app is the paperwork around it. That is honest about what this engine is and it costs nothing.

---

## 5 · ONE RECOMMENDATION, AND WHAT IT COSTS TO SKIP

**Take the eight-hex night palette in §3A and the re-cut ladder in §3B, and adopt the one sentence that generated both: *the chrome owns no warm colour and the accent is a fill, never a word.*** One new hex (`#26232E` promoted from the note ground), four kitchen grounds changed, three kitchen accents changed, Japanese untouched. **Seam: the pack's own art constants plus `READERLOOK="night"` — no engine change.** The one engine line worth fixing separately is `engine/engine.js:3471`, where the cancel button is given the primary class; that is a RULE, both games, and it needs a red first (render a form with a cancel, measure the two fills' luma, prove they are equal today).

**What it costs to skip:** the owner says "not enough contrast" a second time, and the next fix is another set of hexes chosen by feel, and that is the fifth colour fix on the sill all over again — four attempts, all measured, all defensible, all the same *kind* of fix. **The register already has that entry.** The way out of that loop is not a better colour, it is the instrument: two numbers, said out loud, before anything is painted.

---

# QUESTIONS FOR THE OWNER

**1 · The brief says I have Bash and the tool is disabled.** The brief: *"Where you can RENDER instead of describe (you have Bash and the repo has playwright-core…), render."* The tool: `No such tool available: Bash. Bash is disabled for this session, in subagents as well as here.` **Every number in this report is hand-arithmetic, not machine-arithmetic.** Which side is right — should a run like this have Bash (in which case the session should re-run my numbers through a script before anything is painted), or is text-only correct for advisers (in which case the brief's render instruction should come out, and somebody with a shell must verify the ladder before it ships)? I have not averaged these; I have written the numbers and flagged how they were obtained.

**2 · The kitchen accent ladder is arithmetically impossible as specified, and one of its two rules has to go.** `docs/la-sobremesa.md:274` asks for four accents at four different values; §12.3f asks for grounds ≥40 apart and every accent ≥90 from its ground. All three cannot hold without moving the Japanese accent off nori with zero tolerance (working in §3B). **My recommendation is to drop the cross-kitchen accent rule and let the ground carry the identity** — but that rule is mine from A14 and it is his complaint that revived it, so I am not quietly deleting my own rule. Which: four separated accents, or nori?

**3 · The `kv` label colour is in the shell, not in the pack.** `changarrito/index.html:198` and `index.html:199` hardcode violet `#B48CFF` for every label in night mode. My palette needs labels to be muted so violet can mean *act here* on AJ's questionnaire. That is either (a) a shell edit in both games — an engine RULE, behaviour-identical, needs a red first — or (b) the questionnaire accepts violet labels and loses the one-violet-at-a-time rule. **I recommend (a) and it is not mine to take.**

---

# WHAT I DID NOT CHECK

- **I rendered nothing and measured no pixels.** Bash is disabled. Every luma and every WCAG ratio here was computed by hand, twice for the critical ones (154.15 / 154.19 was re-derived digit by digit), **but none of it was run through code.** By this repository's own standard that is a weaker instrument than the one I was told I had. The re-cut hexes in particular — `#554C41`, `#977150`, `#BC9E75`, `#F0E6CC`, `#D4D8DC`, `#3B3A22` — **should be put through a script before anybody paints with them.**
- **I did not cold-read anything.** Nobody has cold-read mock 1's eight glyphs; my three-drawer proposal has never been shown to a person with no context, and until it has, it is a design, not a result. *Visible, legible and meaningful are three measurements and I have only argued the third.*
- **I did not open the review page** the owner looked at (it is a private artefact URL). I read plate 7's palette out of `docs/la-sobremesa.md:269-272`. **If the page's canvas uses different hexes from the table, my numbers are about the table and not about what he saw.** That is worth ten seconds from whoever holds the pen.
- **I did not check the four kitchen grounds against a theme tint.** `npcWhimsy` mixes at 0.15 into `shirt` only; I did not verify whether any tint path reaches a pack's art constants.
- **I did not look at the map revamp, the murals' completion, or the backlog** — other people's jobs this run, and I have not read their returns.
- **I did not verify the `wide` scroller's behaviour on a real phone**, only that the code path exists (`engine/engine.js:3394-3396`).
- **I did not price the merge board or the making surface.** I said what they must look like, not what they cost; that is Beto's number and I would not relay it.

---

# POST-FLIGHT

**What the persona got right, with the moment:** "silhouette first, colour second" is what produced the three-drawer ladder — 10 / 16 / 24 — instead of three tinted rectangles, and it is the only part of this report a five-year-old could verify. **Where it got in the way:** my own band rule (≥40 / ≥90) is a *piñata* rule — it assumes two things are seen together in a dark yard — and I spent real effort trying to force four kitchens that are never on screen together to obey it, before noticing the rule did not apply across rooms; a less rule-bound eye would have got there faster. **The gap I predicted appeared exactly as predicted and worse than I expected:** I said I would fall short without a renderer, and I did — the whole report is hand-arithmetic, and §11½ of the post-mortem is specifically about handing somebody numbers you obtained with a weaker instrument than they think. **The edit I propose to my own file:**

> **Anchor:** `.claude/agents/pili.md`, appended as a new paragraph at the end of *What you actually know*, immediately after the "Check the object against the thing it STANDS ON" paragraph.
>
> **EXACT TEXT:**
>
> **A dark ground does not add contrast, it confiscates the bottom of the scale — and the darkest object in the plan is the one that breaks.** The four kitchen grounds of `docs/la-sobremesa.md` were cut against cream paper and two of their three gaps were already under 40; the moment the owner asked for night mode, the app's own card arrived at luma 37 and the seasoned comal at 54.5 had **17 points** to live in, so the identity colour of the first kitchen became a hole. **Before you approve any palette for a night surface, write down the luma of the SURFACE the object sits on and subtract it first** — on cream you have about 50→210 to spend, on night about 75→210, and a third of your range vanished without anybody choosing to spend it. Two rules fall out and both are cheap: **the accent is a fill and the muted is letters** (in the town's night chrome they are 154.15 and 154.19 — *press this* and *never mind* differ by 0.04 of 255, so they can only ever be separated by KIND, never by a better violet), and **the chrome owns no warm colour**, because the only reason a dish glows on a dark screen is that nothing else on it is warm. *(Applied 2026-09-14 from your own post-flight. Hand-computed; the hexes were never run through a script, because Bash was disabled — say so if you carry them.)*

---

MURAL PANEL

```
id:     pili-el-vidrio-ahumado
by:     "pili"
iter:   8
date:   "2026-09-14"
title:  {en:"The smoked glass", es:"El vidrio ahumado"}
said:   {en:"Under the smoked glass the button and the small print are one grey. 154.15 and 154.19.",
         es:"Bajo el vidrio ahumado el botón y la letra chica son un solo gris. 154.15 y 154.19."}
state:  {en:"Holding that a dark app confiscates the bottom of the scale — the comal has to come up twenty-three points or it stops being a comal.",
         es:"Sosteniendo que una app oscura te confisca el fondo de la escala — el comal tiene que subir veintitrés puntos o deja de ser comal."}
who:    {en:"Pili, la piñatera, who squints at a colour before she believes it",
         es:"Pili, la piñatera, que le entrecierra los ojos a un color antes de creerle"}
cap:    {en:"He said only that the kitchen colours were not clear enough, and the four grounds and four accents had each been chosen on a different day by somebody who was right about one object. Squinting is free and nobody had done it: five of the seven pairs sit inside the band they were written to clear, and the one that passes is the one whose own note says the contrast is value. Then the glass turned on the app itself and found the colour you press and the colour that means never-mind four hundredths of a point apart — two hexes, two hands, one grey.",
         es:"Él nada más dijo que los colores de las cocinas no contrastaban lo suficiente, y los cuatro fondos y los cuatro acentos se habían escogido en días distintos, cada uno por alguien que tenía razón sobre un solo objeto. Entrecerrar los ojos no cuesta nada y nadie lo había hecho: cinco de los siete pares caen dentro de la banda que debían librar, y el único que pasa es aquel cuya propia nota dice que el contraste es de valor. Luego el vidrio se volvió hacia la app y halló que el color que se oprime y el color que dice no-importa están a cuatro centésimas de punto — dos hexadecimales, dos manos, un solo gris."}
aspect: 0.46
art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* PILI'S HAND, third visit — and not paper this time. My first two panels were periódico y papel
     de china; this one is EL VIDRIO AHUMADO, the scrap of smoked glass you hold over a colour to
     take the hue out and see what is left underneath. The palette is NOT MURPAL: every chip above
     the glass is a real hex out of the report, and every bar under it is that same hex at its
     measured luma, 0-255. Four kitchens, then the two the chrome uses for "press me" and "never
     mind". Butted, on purpose — two neighbours of one value become one bar and stop being two. */
  const CH=[["#3A3630",54.5],["#6B4A33",81.2],["#C9A97E",173.7],["#DCCFAE",207.1],
            ["#A97FFF",154.15],["#9C96AB",154.19]];
  const grey=v=>{const n=Math.round(v);return "rgb("+n+","+n+","+n+")";};
  const x0=W*0.06,gp=W*0.035,bw=W*0.88,cw=(bw-gp)/6,cx=i=>x0+i*cw+(i>3?gp:0);
  const ay=H*0.12,ah=H*0.24,by=H*0.45,bh=H*0.22;
  const vx=W*0.03,vw=W*0.94,vy=H*0.40,vh=H*0.38;
  /* ARRIBA — los colores, held apart so they read as six separate things */
  CH.forEach((c,i)=>{g.fillStyle=c[0];g.fillRect(cx(i),ay,cw-2,ah);});
  g.strokeStyle=P.ink;g.globalAlpha=.30;g.lineWidth=1;
  CH.forEach((c,i)=>g.strokeRect(cx(i)+.5,ay+.5,cw-3,ah-1));g.globalAlpha=1;
  /* ABAJO — los mismos seis, en valor, pegados */
  CH.forEach((c,i)=>{g.fillStyle=grey(c[1]);g.fillRect(cx(i),by,cw,bh);});
  /* EL VIDRIO */
  g.fillStyle="rgba(22,19,30,0.34)";g.fillRect(vx,vy,vw,vh);
  g.globalAlpha=.15;g.fillStyle="#FFFFFF";
  g.beginPath();g.moveTo(vx+vw*0.10,vy+vh);g.lineTo(vx+vw*0.21,vy);
  g.lineTo(vx+vw*0.27,vy);g.lineTo(vx+vw*0.16,vy+vh);g.closePath();g.fill();g.globalAlpha=1;
  g.strokeStyle="#524B61";g.lineWidth=2;g.strokeRect(vx+1,vy+1,vw-2,vh-2);
  g.fillStyle=P.wash;g.beginPath();                    /* el pedacito que se le rompió */
  g.moveTo(vx+vw-W*0.055,vy);g.lineTo(vx+vw+1,vy);g.lineTo(vx+vw+1,vy+H*0.075);g.closePath();g.fill();
  g.fillStyle=P.bone;g.globalAlpha=.80;                /* dos tiras de cinta */
  g.save();g.translate(vx+vw*0.32,vy);g.rotate(-0.15);g.fillRect(-W*0.045,-H*0.028,W*0.09,H*0.056);g.restore();
  g.save();g.translate(vx+vw*0.668,vy+vh);g.rotate(0.12);g.fillRect(-W*0.045,-H*0.028,W*0.09,H*0.056);g.restore();
  g.globalAlpha=1;
  /* las cuentas, en lápiz graso sobre el vidrio. Rojo = no libra la banda. Verde = la libra. */
  const tick=(i,lab,col)=>{const X=cx(i);
    g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.moveTo(X,by+bh);g.lineTo(X,vy+vh);g.stroke();
    g.fillStyle=col;g.textAlign="center";g.fillText(lab,X,vy+vh+H*0.085);g.textAlign="left";};
  g.font="bold 10px ui-monospace,monospace";
  tick(1,"27","#E0705A");tick(2,"92","#8FBF7A");tick(3,"33","#E0705A");tick(5,"0.04","#E0705A");
  /* EL PULGAR — un vidrio que nadie sostiene es una ventana */
  const tx=vx+vw*0.055,ty=vy+vh-H*0.05;
  g.fillStyle="#C08A5E";
  g.beginPath();g.moveTo(tx-W*0.028,ty+H*0.18);g.lineTo(tx-W*0.028,ty+H*0.03);
  g.quadraticCurveTo(tx-W*0.028,ty-H*0.035,tx,ty-H*0.035);
  g.quadraticCurveTo(tx+W*0.028,ty-H*0.035,tx+W*0.028,ty+H*0.03);
  g.lineTo(tx+W*0.028,ty+H*0.18);g.closePath();g.fill();
  g.fillStyle="#A9744B";g.fillRect(tx-W*0.028,ty+H*0.055,W*0.056,2);
  g.fillStyle="#EBD6C2";g.fillRect(tx-W*0.016,ty-H*0.018,W*0.032,H*0.05);}
```

*Nothing is drawn below 0.91 H; the bottom 9% is clear. The thumb's top sits at 0.695 H, below the last grey bar, so no bar is covered. Type is four numbers and nothing else, because the wall's lettering is absolute and this panel will be painted at widths I cannot see.*

---

# cuca

PRE-FLIGHT — I worked this by reading the engine's own arithmetic rather than by eye, because I was granted Read/Grep/Glob only and could render nothing; a room plan is one of the few things that survives that, since the camera's clamp, the read probe's order and the map panel's CSS are all numbers in files. My trade equips me for exactly this — a path before a picture, a standing tile in front of every front, the way out visible — and the map is a plan, which is my paper. Where I expected to fall short, and did: I cannot tell you whether the pantry *reads* as a pantry or whether a 9.5-px pin *reads* as "go here" — those are Pili's measurements, not mine, and I have named them as handoffs rather than answered them.

---

# THE DELIVERABLE

## Part 1 — The household room (`ho`), as a tile plan a builder could lay

### 1.1 The three numbers the layout is built on, all `[CODE]`

| Fact | Where | What it decides |
|---|---|---|
| `const VW=10*TS, VH=8*TS`, `TS=32` — the flat cameras show **10 tiles × 8 tiles** | `engine/engine.js:614`, `:44` | the whole sight-line budget |
| `camX=Math.max(0,Math.min(w.W*TS-VW, …))`, `camY=Math.max(0,Math.min(Math.max(0,w.H*TS-VH), …))` — centred on the player, clamped at the world's edge | `engine/engine.js:1892–1893` | **a world of W≤10 and H≤8 has camX=camY=0 on every tile: the entire room is on screen from everywhere in it** |
| `readAt` probes **self, north, south, west, east** and `.some` stops at the first hit: `[[0,0],[0,-1],[0,1],[-1,0],[1,0]].some(…)` | `engine/engine.js:3595` (`readAt` at `:3503`) | **north always answers.** Two readable fronts either side of one floor tile and the south one can never be opened |

The second row is why the home level is **10 wide × 8 tall and not 20 × 12**. Meridian's interiors are 20×12 (`content/meridian/maps.js:88`, `:100`); in a 20×12 room standing on the doorstep at y=10, `camY` clamps to 128 and you see rows 4–11 only — **the north wall, where a pantry goes, is off-screen from the door.** At 10×8 the "way out is visible from anywhere" rule stops being a review note and becomes arithmetic. The gauge pack already ships a 9×6 world that passes the shared suite (`content/gauge/maps.js:4–11`), so small is not a risk.

The third row is a finding I have not seen written down anywhere, and it re-laid this room once. See §1.5.

### 1.2 The plan

Ten characters per row, eight rows. Glyph *names* are mine; the actual characters are the pack's to pick (see §1.6).

```
        x0   x1   x2   x3   x4   x5   x6   x7   x8   x9
 y0     #    #    #    #    #    #    #    #    #    #      north wall
 y1     #    ▤    ▤    ▤    ▥    .    .    .    ▮    #      cajón1 cajón2 cajón3 · repisa ·   · refri
 y2     #    .    .    .    .    .    .    .    ▬    #      THE STRIP                          · congelador
 y3     #    ▭    ▭    ▭    .    .    .    .    .    #      la mesa larga
 y4     #    .    .    .    .    .    .    .    ▩    #      la estufa
 y5     #    .    .    .    .    .    .    .    .    #
 y6     #    .    .    .    .    .    .    .    .    #      arrival row
 y7     #    #    #    ▨    +    #    #    #    #    #      the shifts board · THE DOOR OUT
```

As rows a builder can paste:

```
ho:["##########",
    "#▤▤▤▥...▮#",
    "#.......▬#",
    "#▭▭▭.....#",
    "#.......▩#",
    "#........#",
    "#........#",
    "###▨+#####"]
```

**The path.** You arrive on **(4,6)** facing up. Straight ahead, four clear tiles, is the **repisa** at (4,1) — open shelves, jars of different heights, the ragged top edge that is the pantry's whole cold read (`docs/la-sobremesa.md:215`, `:221–223`). That is the doorway frame. Then the room is a **galley**: one strip of floor at y=2, everything opening off it. Turn left along the strip for the three drawers; turn right for the cold corner. Nothing else is on that wall and nothing stands in the strip.

**Where you stand to open each thing** — every one of these has exactly one readable neighbour, so `readAt` can only return the thing you walked to:

| You stand on | You open | Its only readable neighbour is |
|---|---|---|
| (1,2) | cajón 1 | north |
| (2,2) | cajón 2 | north |
| (3,2) | cajón 3 | north |
| (4,2) | la repisa (the shelf) | north |
| (7,1) | el refri | east |
| (7,2) | el congelador | east |
| (3,6) | the shifts board | south |

**What blocks.** Solid: all `#`, the three `▤`, `▥`, `▮`, `▬`, the three `▭`, `▩` — they go in the pack's `SOLIDX` (`engine/engine.js:50`). Walkable: everything else. Reachability by hand from (4,6): row 6 → (4,5) → (4,4) → (4,3) → row 2 entire → (5,1)(6,1)(7,1); rows 4 and 6 reach x1–x8; (8,3),(8,5),(8,6) reach round the table's east end at (4,3). **No tile is cut off and nothing traps you** — the table's west end dies into the wall, which is what a long table does, and its east end has five tiles of floor beside it.

**Where people are.** The household room is his and AJ's; who else stands here is Nacho's call, not mine, and I am not naming a fifth tenant. What the *layout* reserves: **(6,4)** and **(6,5)** are kept clear as a two-tile stand for one person with a reachable neighbour on all four sides, and **(2,4)/(2,5)** at the table's south side for a second. The owner's own rule — *a room you can enter and find empty every time is the same disease* — says at least one of those two has to be filled before this ships. **Handoff: Nacho.**

**Which camera I checked it from.** The flat cameras (`top`, `front`, `iso`), and **by arithmetic, not by render** — `camX`/`camY` are pinned to 0 at this world size so the framing is decidable on paper. **I did not check the 3D camera's framing at all**, and I should not pretend to: `T3`'s camera is a different piece of code with its own fov, and `t3Hides` takes faces away the closer you stand. Somebody must shoot this room at four yaw stops before it is called done.

### 1.3 Bodies in 3D — because a flat pantry is a poster of a pantry

`t3Boxy` (`engine/engine3d.js:259`, verified this hour) gives a tile a **box** only when `m.box || kind==="furniture" || kind==="appliance"` **and** a `TILESIDE` drawing exists. So each piece needs *both*:

| Piece | `kind` | `lift` | `box` | `TILESIDE` must exist? |
|---|---|---|---|---|
| `▤` cajón | `furniture` | 6 | yes, plus **`vary:true`** | yes — three drawer faces across the run |
| `▥` repisa | `furniture` | 10 | yes | yes — **ragged top edge, level-topped drawers beside it.** That contrast is the read |
| `▮` refri | `appliance` | 11 | yes | yes — tall, one door line, a handle |
| `▬` congelador | `appliance` | 5 | yes | yes — **low and lidded.** A tall box next to a tall box is one fridge with a seam |
| `▭` mesa | `furniture` | 5 | yes | yes |
| `▩` estufa | `appliance` | 8 | yes | yes |

`vary:true` is the engine's own "one drawing per tile of a run" (it is what `⊓` uses, `engine/engine.js:1834`), which is how three identical `▤` tiles read as a bank of three different drawers without three glyphs. That is the property that makes the pantry re-authorable.

**Reference lifts, so nothing is invented:** engine furniture is 5–9, appliances 8 (`engine/engine.js:1815–1817`); walls and facades 13 (`:1811–1813`). The refri at 11 is the tallest non-wall thing in the room, deliberately: it is the landmark on the east side.

### 1.4 "Three drawers, etc." — the pantry as an object, and what changes when the photos come

The design property he actually asked for is **re-authorability**, and it is bought by one geometric decision: **the pantry is a RUN along one wall, starting at x=1, and nothing else is ever on that wall.**

The invariants a re-author must hold:
1. the bank grows **east** from x=1;
2. **the repisa is always the last tile of the run**;
3. **the door is always on the repisa's column**, so the doorway frame never changes.

| When the photo shows… | What changes | What moves |
|---|---|---|
| a fourth drawer | `▤` at (4,1), repisa to (5,1), door `+` to (5,7), board `▨` to (4,7); one more `READS` row and one more `DOCS` entry | nothing else — the strip at y=2 is already clear to x=7 |
| the freezer is the fridge's top box | delete `▬`, (8,2) becomes floor, the refri's document carries `docs:["congelador"]` | nothing |
| a second shelf / a despensa cupboard | one more tile at the end of the run | nothing |
| different contents | `DOCS` only | **no map change at all** |

I would go one step further and let the pack declare the pantry **once**, as a literal a build step stamps into the map rows and the `READS` rows:

```
PANTRY = { world:"ho", row:1, from:1,
           parts:[{g:"▤",doc:"cajon1"},{g:"▤",doc:"cajon2"},{g:"▤",doc:"cajon3"},{g:"▥",doc:"repisa"}],
           cold:[{x:8,y:1,g:"▮",doc:"refri"},{x:8,y:2,g:"▬",doc:"congelador"}] }
```

**This is a CHOICE, not a RULE.** The engine already has everything it needs — `READS`/`DOCS` (`engine/engine.js:3494–3503`), `TILEMETA` (`:1837`), `SOLIDX` (`:50`). Declaring `PANTRY` is pack-level authoring convenience so that re-authoring from a photograph is editing **one literal instead of three files**. Whether it lives in the pack or in a build script is Beto's and Don Güero's call, not mine.

### 1.5 The one-front rule — the thing that cost something to find

My first lay put the refri at (8,1) and the congelador at (8,3), with floor at (8,2) between them: a real cold corner, the way a kitchen is built. Then I read the probe.

`readAt` is coordinate-keyed and `checkRead` walks `[[0,0],[0,-1],[0,1],[-1,0],[1,0]]` with `.some`, which **stops at the first hit** (`engine/engine.js:3595`). So standing on (8,2): self is floor, **north is the fridge, and that is the end of it.** The freezer at (8,3) is south. It would wear a breathing cream card — the mark has no distance limit and is drawn for every readable in the world (`engine/engine.js:3506–3515`) — and pressing Read there would open the fridge, every time, for ever. Not silence, which the engine already worries about (`:3588–3590`), but **the wrong door**, which is worse: the control answers and answers wrong.

**The rule, for any room in this engine:** *two readable fronts may never sit on opposite sides of one standing tile. Put them in a line along a wall with a clear strip in front, and each standing tile sees exactly one.* A run along a wall is automatically one-front; a corner where two fronts face each other never is. The fix here was to move the congelador to (8,2), beside the refri, both read from the strip at x=7.

**This is reasoning from the extraction step, not a fired plant.** By this repository's own rule (`docs/REGRESSION.md` §3, the paragraph filed as prose about the claim guard) it should be planted before anybody believes it: stand a player on a tile with a readable north and a readable south and press Read twice. If it opens the south one, this paragraph is wrong and that is the finding.

### 1.6 Two traps in the glyphs, both cheap and both silent

1. **`BASECOL` is engine-wide and keyed by character** (`engine/engine.js:4734`); `drawTown` merges `{...BASECOL, ...MAPCOL}` (`:4755`) and falls back to `"#D5D2C6"` — the floor colour. **A new glyph with no `MAPCOL` row is invisible on the town plan.** Every one of the seven above needs a row.
2. **Do not reuse the engine's own glyph meanings.** `"1"` is already `{lift:9,kind:"stair",stand:true}` and `"3"/"4"/"5"` are gear (`engine/engine.js:1830`, `:1836`); `"b"` and `"g"` carry engine map colours (`:4734`). A pack *may* override, but overriding an engine glyph's meaning is the portability class that `docs/REGRESSION.md` #4 is about. Pick unused characters.

### 1.7 The searchable drawer — what the reader can do today and what it cannot

His #13: *"could be fun if they were huge forms to search and grab."* `[CODE]`, from `docRender` (`engine/engine.js:3369–3479`):

- **A row you grab** — `btn` with a `run()`, one per row. Ships today (`:3438`).
- **A category filter** — `sel` fires on `change` and content re-renders. Ships today (`:3443`).
- **A search field** — `form` collects values and fires **only on the submit button** (`:3453–3474`). **There is no keystroke filtering in the reader.** So a search is *type, then press* unless somebody adds an `oninput` seam.
- **Re-render** — a pack's document may rebuild itself live and call `docOpen` again; Meridian's gate sheet already does exactly this (`content/meridian/docs.js:45–57`, a `build:()` reading engine state with a `btn` that re-opens the doc). So the whole loop is **content, with zero engine change.**
- A happy accident worth naming: `form` focuses its first field on render unless `noFocus` (`:3474`), so a re-render after a search puts the cursor back in the search box for free.
- **One tile hands over one document** — `readAt` uses `.find` (`:3503`). Every drawer sheet should therefore carry a `docs:[…]` row back to its siblings (`:3475–3478`), so somebody standing at the wrong drawer is one tap from the right one. That is "the way out is visible from anywhere" applied to paper.

**Handoff: Mari/Beto** for whether a keystroke-filtering seam is worth an engine RULE. My read: not for three drawers. Ask again at forty rows.

### 1.8 What I will not put in

- **A sink, a bin, a window box, a second table.** Furniture that does not serve the path is clutter with a name.
- **The estufa is in and I will say why it is weak.** It is the cold read's anchor — a kitchen with no stove is not a kitchen — but it has **no use wired**. Under q3 ("a shift pays leftovers", `docs/la-sobremesa.md:888–893`) it earns its tile the moment reheating *el recalentado* is a thing you can do at it, and no sooner. Declared, not wired, and named as such rather than dressed up.
- **A second door.** Doors are expensive. One way in, one way out, and it is visible from every tile.

---

## Part 2 — The map, as a plan a person reads

### 2.1 What the plan actually is today, measured

| Thing | Number | `[CODE]` |
|---|---|---|
| tiles | 30 × 16, at `s=10` | `engine/engine.js:4752`; `content/meridian/maps.js:48–63` |
| backing buffer | `300 × 174` (`w.H*s+14`) | `engine/engine.js:4753` |
| the box it sits in | `width:82%; max-width:320px; padding:18px; box-sizing:border-box` | `index.html:348` |
| **displayed width** | **283.8 CSS px on any phone ≥390 wide** (82% of 390 = 319.8, minus 36 of padding) | derived from the two rows above |
| scale on screen | **0.946×** — a *downscale*, with `image-rendering:pixelated` | `index.html:628` |
| **a tile on screen** | **9.46 CSS px** | |
| **a label on screen** | `700 10px` → **9.46 CSS px** | `engine/engine.js:4763` |
| **the legend on screen** | `600 8px` → **7.57 CSS px** | `engine/engine.js:4765–4766` |
| the other type surface | `#mapNote`, `.78rem` = **12.48 px**, carrying one string | `index.html:629`; `engine/engine.js:4775` |
| the title | `h3`, `.9rem` = 14.4 px | `index.html:351` |
| you-are-here | **one** dot, `world===PL.street?[fx,fy]:MAPDOT[world]` | `engine/engine.js:4768–4770` |

**The finding that decides the whole job: the map has two type systems and the legible one is nearly empty.** The canvas explains itself in 7.6-px type — smaller than anything else in either game — while the 12.5-px HTML line directly beneath it carries `"📍 " + locs[world]` and nothing else. **Anything you add to the picture arrives at 7.6–9.5 px. Anything you add under it arrives at 12.5 px, is selectable, translates, and reflows.**

> **So: the picture carries POSITION. The note carries NAMES.**

A second, mechanical reason for the same split: `image-rendering:pixelated` applies to the **type** as well as the tiles. On a 2× phone the 300-px buffer is nearest-neighbour magnified 1.89× to 568 device px, so every antialiased label edge is being blown up blocky. Tiles want `pixelated`; letterforms never do.

### 2.2 "It is not dynamic" — reading his word literally

Per `docs/POSTMORTEM.md` §3, find the check that reads *his* word. "Not dynamic" is not "does not animate". The plan **does** already change with play — the `when(flags)` labels swap SITE→LA OBRA and LOT→EL MERCADO (`content/meridian/maps.js:263–268`), and the dot moves. What it has never once done is **tell him where to go next.** His sentence names it exactly: *"so i can find the next quest or open quests."*

That is also the guard: **render `drawTown()` at two play states and diff the pixels at a named coordinate.** Red first by drawing the pin with the state ignored — the diff at La Cocina's door goes to zero and the guard says so. And the proxy to refuse: **do not assert "a pin was drawn" by counting a call or reading a flag.** "On the map" is a fact about pixels (`docs/POSTMORTEM.md` §3).

### 2.3 The conventions a person already knows, and which of them survive at 9.46 px

| Convention | Verdict | Why |
|---|---|---|
| **You-are-here is a DOT** — a position, no direction | **keep as is** | already shipped, purple, cream-stroked |
| **Go-here is a PIN** — a teardrop with a tip, pointing down at a place | **add** | it must differ from the dot in **silhouette**, not colour. A second dot in another colour and a person cannot tell which one is them |
| **One pin** | **hold the line** | five pins is a list with a picture behind it. This is what every "dynamic map" turns into |
| **Done is GREYED, not ticked** | **add — on the label, never the tiles** | a value change across a whole word reads at 9.5 px; a tick does not. And the engine does not know which tiles belong to which district; greying tiles would be a new map |
| **A route line from you to it** | **refuse** | on a 30×16 plan the next thing is three or four tiles away. A four-tile line at 9.5 px is a smudge |
| **A legend** | **move it, do not grow it** | 7.6 px is below reading size, and today it explains a *colour* ("doors & stairs in gold"), which is the one thing a legend cannot do at that size |

### 2.4 What the engine already knows, and the one noun that leaks

`[CODE]` The state exists and costs nothing:

- `worldPending(id)` — *"somebody in this room has something to say"*, already written for **any** world id (`engine/engine.js:510`).
- `MAPDOT` — where each interior's door stands on the street plan (`content/meridian/maps.js:274`).
- `pendingAt(n)` — an open, not-done quest on a person (`:608`); `qOpen(qi)` (`:415`); `AQ()[qi].title`, already used for the Talk button (`:3571`).

**But `worldPending` is the wrong noun and would leak straight into the second game.** `hasSay` is `pendingAt(n)!==undefined || roomPending(n) || !!n.doc` (`engine/engine.js:611`) — *a person carrying a document counts.* In El Changarrito every house's clerk carries a document permanently (`test/town.smoke.js`, grep `the clerk carries the wrong document`), so a pin built on `worldPending` would pin **every house in the town, for ever**. Same function, two games, opposite meanings. That is a leak-register shape (`docs/TAGS.md`).

**The RULE, stated so it is identical in both games:**

```
worldNext(id) = (WORLDS[id]?.npcs || []).some(n => pendingAt(n) !== undefined)
```

*"A quest is open in this room."* Red before green: place a town clerk who carries a `doc` and has no `q`, assert **no pin**; give a Meridian NPC an open quest, assert a pin at that world's `MAPDOT`.

### 2.5 Two things that will break it, both one line, both silent

1. **`MAPDOT` is not injective.** `content/meridian/maps.js:274`: `pa`, `li` and `ex` all sit at `[29,1]`; `hq` and `f2` both at `[14,0]`. **Ten worlds, eight distinct coordinates.** A pin per world stacks two or three pins on one tile. **Merge by coordinate before drawing.**
2. **Three `MAPDOT` rows are on row 0** (`hq`, `f2`, `no`). A pin 15 buffer-px tall with its tip at the tile centre rises to y = −10 and is **clipped off the top of the canvas** — a pin that is invisible for the first building anyone visits. **The pin must flip below the tile when y < 2.**

### 2.6 The plan a phone can hold — the budget, stated as a budget

| Surface | Size | What it may carry | Hard ceiling |
|---|---|---|---|
| the canvas | 283.8 × 164.6 CSS px, tiles at 9.46 px | the streets · **≤8 labels** at 9.5 px · **one** you-dot · **one** next-pin · dimmed labels for done | **three marks.** A fourth and the picture needs a legend, and a legend does not fit |
| the pin | 11 × 15 buffer px (10 × 14 CSS) | tip at the tile's centre-bottom, flipping below when y<2 | gold `#FFE9A8` — **the same gold as the door arrow in the world** (`engine/engine.js:3540`), so the player is not taught a second vocabulary |
| `#mapNote` | full width, 12.48 px | **three lines, hard**: where you are · what is next, with the quest's own title · the legend, moved down from the canvas | see below |
| `#mapTitle` | 14.4 px | unchanged | |

**Three lines is a hard ceiling and here is the receipt.** `.settings .box > .close` is `position:sticky; bottom:-18px` (`index.html:349`) — which is `docs/NEW-WORLD.md` §3¾½ exactly: a sticky bottom bar hovers over whatever content is in that band, and *which* control it eats depends only on where you have scrolled. Today the map panel is short enough that it never fires. My sum for the revamped panel: 36 padding + 30 title + 165 canvas + 58 note + 40 Close ≈ **329 px in a box capped at 88 svh ≈ 740 px on an 844-tall phone** — the Close button is visible without scrolling, with room to spare. **Add a fifth line to that note and the panel starts scrolling, and the moment it scrolls the sticky Close is sitting on top of the map.** That is the second time this project has been bitten by an exit below the fold; it is one note-line away from a third.

### 2.7 The note, in words

```
📍 Meridian HQ
❗ Next — La Cocina · “<the quest's own title>”
doors & stairs in gold · ◉ you are here · ⚑ go here
```

`❗` is the right mark because *"the ❗ means one thing forever"* (`engine/engine.js:609`) and the world tag already prints it for the room you are standing in (`:511`).

**Which room is "next"?** My recommendation, and I am not putting it to him as a question because a map's job is distance: **the nearest open one** — Manhattan distance on the tile grid from your dot to each pending door. Nothing to author, nothing to keep in sync, and a person can check it by looking. One refinement that uses only what exists: prefer rooms whose quest is in the current chapter (`qChapter`/`chSeen`, `engine/engine.js:415`) and take the nearest of *those*.

**And no "take me there" button.** `openTravel()` exists (`engine/engine.js:4780`) but `TRV` is **street stops only** — *"a trolley does not stop on the second floor of a building"*, his own words of 2026-09-03, written into `content/meridian/maps.js:277–279`. A Go button that lands you a street short of the door is the kind of thing that comes back as a report. The note names the place; your legs do the rest.

### 2.8 "Open quests" — the list is content, not engine

He asked for two things: *"the next quest"* **or** *"open quests."* The first is a pin. The second is a **list, and a list is not a map** — a plan with eight pins is a menu wearing a picture.

`[CODE]` it costs no engine change at all. A pack's document builds live at open time and can read engine state directly — Meridian's own gate sheet does it (`content/meridian/docs.js:42–57`: a `build:()` reading `lang`, `mqLog`, `logCrit`, with a `btn` that re-opens itself via `docOpen`). So `AQ()`, `done`, `qOpen`, `pendingAt` are all readable from a pack's `DOCS`. **The "What's open" sheet is one content file and zero engine lines.** Only the pin, the dimmed label and the note are engine.

One sequencing note: `docOpen` shows the reader at z-index 60 over the map's 55 (`index.html:140`, `:347`) — so it works, but close the map first or the player comes back to a panel they thought they had left.

### 2.9 The engine changes, all four, sized

| # | Change | Lines | Behaviour-identical for a pack that declares nothing? |
|---|---|---|---|
| 1 | `worldNext(id)` and the merged-by-coordinate pin in `drawTown` | ~14 | yes — a pack with no `MAPDOT` and no quests draws no pin |
| 2 | pin flips below the tile when y<2 | 1 | yes |
| 3 | a label may declare `dim:f=>…`; `globalAlpha=.5` around the `fillText` at `engine/engine.js:4763–4764` | 2 | yes — no `dim`, no change |
| 4 | the legend moves from the canvas to `#mapNote`, and the note takes three lines | ~6 | **the same words, at 12.5 px instead of 7.6** |

Everything else — the "what's open" sheet, the labels' own `dim` predicates, the pin's per-pack coordinates — is content. **Handoffs: Beto** for whether `worldNext` is the right seam name and for the `dim` predicate's shape; **Pili** for whether a gold teardrop at 9.5 px reads as *go here* and whether a 50%-alpha label reads as *done* rather than as *broken*; **Nacho** for the note's wording in both languages.

---

# QUESTIONS FOR THE OWNER

**1 · The home room is 10 × 8, which means the whole of it is on screen at once and it never scrolls. Is that what you want a home level to feel like?**
- *For:* `engine/engine.js:1892–1893` — at 10×8 the camera cannot move, so the way out is visible from every single tile, by arithmetic and not by review. It is one glance and you have the room.
- *Against:* Meridian's interiors are 20×12 (`content/meridian/maps.js:88`, `:100`) and feel like rooms you walk through. A 10×8 room is a **galley**, not a kitchen you cross — and in a 20×12 room standing at the door you would not be able to see the pantry at all (`camY` clamps to 128 and shows rows 4–11 only). **You cannot have both.**

**2 · The stove has a tile and no use.**
- *For keeping it:* a kitchen with no stove fails the cold read at the doorway, and your own q3 answer — *"i get left overs?"* (`docs/la-sobremesa.md:888`) — points straight at it: the fridge fills, and reheating is the one thing you do at home.
- *For cutting it:* your own rule, in your words — a thing a player cannot use is scenery pretending to be a place. Right now that is exactly what it is. Which do you want this pass: **in and wired to reheating, or out until it is?**

---

# WHAT I DID NOT CHECK

- **I rendered nothing.** I was given Read/Grep/Glob only — no Bash, no Write — so **none of the three mock orders was used.** Every number above is read out of the code or derived from CSS arithmetic, and **not one of them has been confirmed by a screenshot.** `docs/crew/FLIGHT-NOTES.md` (the passage at lines 363–367) records this happening to me twice before; this is the third. It is a harness fault, not a refusal, and I will not fabricate a picture I did not take.
- **The 3D camera's framing of a 10×8 room.** `camX`/`camY` are the flat cameras' clamp. `T3`'s camera is different code with its own fov, and `t3Hides` removes faces at close range. Nobody has shot this room at four yaw stops.
- **Whether the pantry reads as a pantry.** Pili's cold read. I have specified the ragged-versus-level top-edge contrast from `docs/la-sobremesa.md:215`, `:221–223`; I have not tested that it survives at 32 px, and I cannot.
- **Whether a 9.46-px gold teardrop reads as "go here"** and whether a 50 %-alpha label reads as *done* rather than *broken*. Visible, legible and meaningful are three measurements and only the first is arithmetic.
- **`measureText` on the labels.** My estimate that `"MERIDIAN HQ  (⇧ FLOOR 2)"` spans roughly tiles 8.4–21.6 is character-count arithmetic at ~0.55 em, **not a measurement.** It matters for whether a pin can collide with a label, and it should be measured before the pin lands.
- **The one-front rule is unplanted.** §1.5 is read off `engine/engine.js:3595`'s probe order, not fired. Plant it before believing it.
- **Whether `image-rendering:pixelated` actually degrades the labels on a real 2× device.** That is a mechanism I reasoned about from the CSS; it wants one screenshot at dpr 2 next to one at dpr 1.
- **The town's own map.** I read `changarrito/content/maps.js:170` for `MAPDOT` and checked the `hasSay`/clerk leak, but I did not open the town's `TOWNLBL` or count its labels against the same 284-px budget.
- **`docs/BEAUTIFY.md`'s "correctly flat" list.** I asked for boxes on all seven pieces on the strength of `t3Boxy` alone. A low chest freezer is the kind of thing that list sometimes says is right as a cutout.

---

# POST-FLIGHT

What the persona got right, with the moment: *a room is a path before it is a picture* sent me to `readAt`'s probe order before I had drawn anything, and that is where the cold corner died — a fridge north and a freezer south of one standing tile, a breathing card on a door that can never open, and it would have shipped looking perfectly correct in every screenshot. Where it got in the way: "sight lines are the whole trick" kept pulling me toward 3D, which I could not check and had no business ruling on, and I nearly wrote a paragraph about what `t3Hides` would do to the refri from the doorway on no evidence at all. The gap I predicted did appear, exactly as named — I can give you the geometry and I cannot tell you whether the pantry *reads* as a pantry or the pin *reads* as "go here", and per `docs/POSTMORTEM.md` §13j that sentence is a blocking handoff and not a caveat, so it is filed as one to Pili rather than waved through. My file already says *a body is not a blocker* and *identify the room from the picture*; what it has never said is the thing this run cost me an hour of re-laying, so that is the edit.

**Proposed persona edit — EXACT TEXT.** Anchor: append as a new section at the end of `.claude/agents/cuca.md`, immediately after the section "## Which room is he standing in".

```
## Two fronts, one tile, and only one of them ever opens
*Proposed iteration 8, 2026-09-14.*

Before you place anything a player can READ, read the probe. `readAt` is keyed by coordinate, and
`checkRead` walks `[[0,0],[0,-1],[0,1],[-1,0],[1,0]]` with `.some` — self, **north, south, west,
east** — and stops at the first hit (`engine/engine.js`, grep `const readAt=` and the `[[0,0],[0,-1]`
probe). So **north always answers.** Two readable fronts either side of one standing tile and the
south one can never be opened, while its mark still breathes at the player from across the room —
the marks have no distance limit (grep `function readMarks`). That is not silence, which the engine
already worries about; it is the wrong door, which is worse, because the control answers.

**The rule: readables go in a LINE along one wall with a clear strip of floor in front of it, never
in a corner facing each other.** A run along a wall is one-front for free; a corner never is. And
one tile hands over exactly one document (`.find`), so every sheet in a run carries a `docs:[…]`
row back to its siblings — the way out, made of paper.

**The moment:** laying the household pantry, I put the fridge north and the chest freezer south of
the same square of floor, the way a real cold corner goes, and had to re-lay the whole east wall.

**And the two sizes that decide a room before its furniture does:** the flat cameras show **10 × 8
tiles** (`engine/engine.js`, grep `const VW=`), and the camera clamps at the world's edge (grep
`const camX=` in `draw2D`) — so **a world of W≤10 and H≤8 has camX=camY=0 on every tile and the whole
room is on screen from everywhere in it.** That is the only way "the way out is visible from
anywhere" is arithmetic instead of an opinion. In a 20×12 room, standing at a south door, the north
wall is off-screen. None of this is a claim about the 3D camera, which is other code and other fov.
```

---

MURAL PANEL

```
id:     cuca-el-norte-cobra-primero
by:     "cuca"
title:  {en:"North collects first", es:"El norte cobra primero"}
said:   {en:"Two doors, one square of floor between them. Press Read and the north one answers — every time, for ever. The other might as well be a wall.",
         es:"Dos puertas, una baldosa en medio. Le picas Leer y contesta la del norte — siempre, para siempre. La otra bien podría ser pared."}
state:  {en:"Re-laying the cold corner so both doors face the same aisle",
         es:"Volviendo a trazar el rincón frío para que las dos puertas den al mismo pasillo"}
who:    {en:"Doña Cuca, who keeps the rooms and the stairs", es:"Doña Cuca, la de los cuartos y las escaleras"}
cap:    {en:"I was laying a kitchen and I put the fridge above the standing tile and the freezer below it, the way a real cold corner goes. Then I read the probe: it asks your own square, then north, then south, then west, then east, and it stops at the first yes. So the freezer wore a card that breathed at you from across the room, and a door that never opened. Both fronts face the same aisle now.",
         es:"Estaba trazando una cocina y puse el refri arriba de la baldosa y el congelador abajo, como va un rincón frío de verdad. Luego leí el sondeo: pregunta tu propia baldosa, luego norte, luego sur, luego oeste, luego este, y se para en el primer sí. Así que el congelador traía una tarjetita que respiraba desde el otro lado del cuarto, y una puerta que nunca abría. Ahora las dos dan al mismo pasillo."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* DOÑA CUCA, THIRD VISIT — AND NOT CHALK THIS TIME. She chalked an elevation on the limewash once
     and two staircases once. A landlady also owns a talonario: the pink carbon receipt book, the
     yellow duplicate under it, aniline-purple carbon, a red rubber stamp and a pencil word on the
     stub. This palette is hers and it is nowhere else on this wall. Nothing here is random — the
     stamp's broken ink is a fixed list, so two renders of this panel are identical to the pixel. */
  const paper="#EBD2CE",dup="#DFCE93",carb="#4B3A6B",red="#B0413C",pen="#6C7A8A",glare="#F7E9E6";
  const L=W*0.06,T=H*0.07,PW=W*0.88,PH=H*0.76;
  g.fillStyle=dup;g.fillRect(L+W*0.012,T+H*0.035,PW,PH);           /* the duplicate, showing at two edges */
  g.fillStyle=paper;g.fillRect(L,T,PW,PH);                          /* the flimsy */
  g.fillStyle=glare;g.fillRect(L,T,PW,Math.max(1,H*0.012));         /* light on the top fold */
  g.fillStyle=dup;for(let y=T+H*0.05;y<T+PH-H*0.02;y+=H*0.055){     /* the perforation */
    g.beginPath();g.arc(L+W*0.028,y,1.7,0,7);g.fill();}
  g.strokeStyle=carb;g.globalAlpha=.30;g.lineWidth=1;               /* two ruled lines */
  g.beginPath();g.moveTo(L+W*0.055,T+H*0.20);g.lineTo(L+PW-W*0.03,T+H*0.20);g.stroke();
  g.beginPath();g.moveTo(L+W*0.055,T+PH-H*0.09);g.lineTo(L+PW-W*0.03,T+PH-H*0.09);g.stroke();
  g.globalAlpha=1;
  g.fillStyle=carb;g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
  g.fillText("RECIBO",L+W*0.055,T+H*0.145);g.fillText("No 3",L+PW-W*0.145,T+H*0.145);
  /* ---- the little plan she sketched on the receipt: fridge, the square you stand on, freezer ---- */
  const cx=L+W*0.10,cw=W*0.20,bh=Math.max(9,Math.round(H*0.085));
  const fy=T+H*0.22,fh=H*0.13, ty=T+H*0.37,th=H*0.24, zy=T+H*0.63,zh=H*0.08;
  g.fillStyle=carb;g.fillRect(cx,fy,cw,fh);                         /* el refri */
  g.fillStyle=paper;g.fillRect(cx,fy+fh*0.30,cw,1);g.fillRect(cx+cw*0.66,fy+fh*0.42,2,fh*0.42);
  g.strokeStyle=carb;g.lineWidth=1.5;g.strokeRect(cx+.5,ty+.5,cw-1,th-1);   /* the square of floor */
  murBody(g,cx+cw*0.34,ty+th*0.38,P.sky,bh);                        /* the tenant, standing on it */
  g.fillStyle=carb;g.fillRect(cx,zy,cw,zh);                         /* el congelador, low and lidded */
  g.fillStyle=paper;g.fillRect(cx,zy+zh*0.34,cw,1);
  const ax=cx+cw*0.88;
  g.strokeStyle=carb;g.lineWidth=2;                                  /* the question that gets answered */
  g.beginPath();g.moveTo(ax,ty+th*0.28);g.lineTo(ax,fy+fh+7);g.stroke();
  g.fillStyle=carb;g.beginPath();g.moveTo(ax,fy+fh);g.lineTo(ax-4,fy+fh+8);g.lineTo(ax+4,fy+fh+8);g.closePath();g.fill();
  g.setLineDash([3,3]);g.globalAlpha=.5;                             /* the one that never gets asked */
  g.beginPath();g.moveTo(ax,ty+th*0.74);g.lineTo(ax,zy-3);g.stroke();
  g.setLineDash([]);g.globalAlpha=1;
  g.strokeStyle=red;g.lineWidth=2;
  g.beginPath();g.moveTo(ax-5,zy-H*0.055);g.lineTo(ax+5,zy-H*0.015);g.stroke();
  g.beginPath();g.moveTo(ax+5,zy-H*0.055);g.lineTo(ax-5,zy-H*0.015);g.stroke();
  g.fillStyle=carb;g.textAlign="center";g.font="bold 11px ui-monospace,monospace";
  g.fillText("N",cx-W*0.030,fy+fh*0.72);g.fillText("S",cx-W*0.030,zy+zh*0.85);
  /* ---- the writing, with its leaders and its column of what was collected ---- */
  g.textAlign="left";const tx=cx+cw+W*0.055;
  g.fillStyle=carb;g.fillText("REFRI",tx,fy+fh*0.78);
  g.fillText("CONGELADOR",tx,zy+zh*0.95);
  g.globalAlpha=.45;
  for(let x=tx+W*0.10;x<L+PW-W*0.10;x+=4)g.fillRect(x,fy+fh*0.72,2,1);
  for(let x=tx+W*0.20;x<L+PW-W*0.10;x+=4)g.fillRect(x,zy+zh*0.88,2,1);
  g.globalAlpha=1;
  g.fillStyle=carb;g.fillText("1",L+PW-W*0.085,fy+fh*0.78);
  g.fillStyle=red;g.fillText("0",L+PW-W*0.085,zy+zh*0.95);
  /* ---- the rubber stamp, crooked the way a stamp always is ---- */
  g.save();g.translate(L+PW*0.66,T+PH*0.66);g.rotate(-0.19);
  const sw=W*0.28,sh=H*0.19;
  g.globalAlpha=.88;g.strokeStyle=red;g.lineWidth=2;g.strokeRect(-sw/2,-sh/2,sw,sh);
  g.lineWidth=1;g.strokeRect(-sw/2+3,-sh/2+3,sw-6,sh-6);
  g.fillStyle=red;g.textAlign="center";g.font="bold 11px ui-monospace,monospace";
  g.fillText("NORTE",0,-1);g.fillText("COBRA 1\u00BA",0,11);
  g.fillStyle=paper;g.globalAlpha=.85;                               /* broken ink — a FIXED list, never random */
  [[-0.42,-0.30],[0.18,-0.44],[0.40,0.10],[-0.26,0.38],[0.05,0.46],[-0.48,0.06],[0.33,-0.13],[0.12,0.22]]
    .forEach(([u,v])=>g.fillRect(u*sw,v*sh,3,2));
  g.restore();g.globalAlpha=1;
  /* ---- the stub, in pencil, and the thumbed corner ---- */
  g.fillStyle=pen;g.globalAlpha=.85;g.textAlign="left";g.font="bold 11px ui-monospace,monospace";
  g.fillText("duplicado",L+W*0.055,T+PH-H*0.035);g.globalAlpha=1;
  g.fillStyle=dup;g.beginPath();g.moveTo(L+PW,T+PH-H*0.075);g.lineTo(L+PW,T+PH);g.lineTo(L+PW-W*0.045,T+PH);g.closePath();g.fill();
  g.strokeStyle=carb;g.globalAlpha=.25;g.lineWidth=1;
  g.beginPath();g.moveTo(L+PW-W*0.045,T+PH);g.lineTo(L+PW,T+PH-H*0.075);g.stroke();g.globalAlpha=1;
  g.textAlign="left";}
```

---

# beto

PRE-FLIGHT — I will read the map code and the reader before I have an opinion, and where a claim can be fired instead of argued I will fire it: four probes in the running game, not four paragraphs. My persona equips me for exactly this brief — RULE/CHOICE, predicate-versus-query, and "count the readers before you design a table of keys" are the three cuts all three jobs need. Where I expect to fall short: I price surfaces in engine lines and seams, and the two new surfaces (merge board, making canvas) are mostly *content and feel*, which I cannot cost — and I will be tempted to call a thing cheap because the mechanism is cheap.

---

# THE DELIVERABLE

## 0 · What I fired, before anything I claim

Four probes, all in the shipped game, headless Chromium, **real game measured** (one of them, the map marker overlay, is *a drawing painted onto the real game's own canvas* — I say so at each picture). Scripts and pictures in `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/`: `beto-map-probe.js`, `beto-map-probe2.js`, `beto-map-probe3.js`, `beto-merge-plant.js`, `beto-scroll-plant.js`, `beto-pass-cliff.js`, `beto-pass-ceiling.js`, `beto-panel-render.js`.

| # | What I broke or measured | What it printed |
|---|---|---|
| 1 | A 120-item pantry riding the save through the Trolley Pass | `Uncaught code length overflow. (91228>23648)` — **the Pass panel never opens.** No toast, no error a player sees. `#tpass` stayed hidden |
| 2 | A 40-row pantry drawer, scrolled to row 30, one tap | scroll **1853 → 0**; the row you pressed is now **2450 px** below the fold of a 661 px window |
| 3 | A merge board built entirely in a pack, driven by two real mouse drags | masa+masa → tortilla, tortilla+tortilla → taco. **Zero engine change.** `beto-merge-after.png` |
| 4 | The map's marker anchors at day one and with the city grown | day one: **8 of 12 waiting people land on one 10-px tile.** Grown: 27 people, 8 anchors, worst 8 then 6 |

---

## 1 · THE JOURNEY — what each screen is made of, and what it costs

**The engine's four surfaces `[CODE]`:** the world; the conversation card (`#npcDoc.handed`, `index.html:752`); the reader (`docRender`, `engine/engine.js:3369-3480`, blocks `h p note red blank kv t q btn sel form docs art`); the wall. `docDef(id)` at `engine/engine.js:3337` takes **either** a `DOCS` id **or the document object itself**, so anything the player made ten seconds ago is a first-class document with no registration.

| Screen | What it is | Engine change | Cost |
|---|---|---|---|
| **Onboarding** | The three career doors are hardcoded in **all three shells** — `index.html:386`, `changarrito/index.html:385`, `content/gauge/index.html:386` — and the shirt colours in `SHIRTS`. Blocker A. The *questionnaire* is a separate night-mode page and touches none of this | RULE, and it is already on the board (#154) | one sitting, buys every future world |
| **Household** | A world with one room. Not a surface at all | none | content |
| **Pantry drawers** | **A document, today.** `form` with a `text` field for search (`:3464`), `btn` rows you grab (`:3438`), `sel` to switch drawer (`:3443`). The town's `indexDoc` (`changarrito/content/record.js:234-251`) is the working model, ~16 lines of *pack* code | **One RULE, four lines, and it is the blocker**: see G4 below | free, **after** G4 |
| **Shifts board** | A document. `t` table or `btn` rows; a shift you took is a `kv` row. Nothing new | none | free |
| **Recipe book, have/missing** | A document. Have/missing is a set difference over two arrays, rendered as **the presence or absence of a line** (Pili, §4) — not a tick, not a cross | none | free |
| **Journal** | Built. `dlog` (`engine/engine.js:4576-4587`) and the report (`:4601-4618`). ⚠️ `docs/ARCH-LOG.md` A3 cites these at `:3983` and `:4008` — **stale by ~590 lines**; `roomSheet` is at `:3919`, not where A3 implies | none | free |
| **Play surface** | The two new ones. **Both buildable in a pack today** — see below | none required | see below |
| **Settings** (the grades toggle) | No pack-declared row exists, **but the precedent does**: `seasonRowBuild()` (`engine/engine.js:4248`) builds a settings row out of pack content, and `aleRowBuild` is called optionally at `:4246` | RULE, ~15 lines, same shape | a pack declaring nothing gets no row — that is the behaviour-identical proof |

### 1a · The play surfaces — priced honestly, and cheaper than the plan says

**`docs/la-sobremesa.md` §12.2 says "the reader's `art` block is a canvas that draws and does not listen". That is wrong, and I proved it.** `art(g,W,H)` is handed a 2D context, and a context carries `g.canvas` — the element. `beto-merge-plant.js` builds a 4×4 merge board with `pointerdown/move/up` on `g.canvas`, and two **real mouse drags** in the shipped game merged masa→tortilla→taco (`beto-merge-after.png`). **No engine change. Nothing in `engine/` was touched.**

Why it is safe and not a hack, with the code:
- each `docOpen` does `body.innerHTML=""` (`:3484`) and **creates a new canvas** (`:3377`), so listeners die with the element — no leak, no accumulation;
- `cv.style.width=W+"px"` against `cv.width=W*K` with `g.setTransform(K,…)` (`:3404`, `:3408`) means **one CSS pixel is one art unit**, so the maths is trivial;
- `wide` (`:3410-3414`) already gives you a horizontal scroller for a board wider than the phone.

Three sharp edges, all pack-side:
1. **`cv.style.touchAction="none"` or a touch drag scrolls the paper instead.** I only drove it with a mouse — see WHAT I DID NOT CHECK.
2. **Map the pointer with `getBoundingClientRect()`, never `offsetX`.** In the non-`wide` branch the canvas carries `maxWidth:100%` and `height:auto` (`:3407`), so if the column narrows *after* the document opened — a phone turned sideways, which **no suite in this repo has ever run** (`docs/REGRESSION.md` §1) — the canvas is CSS-scaled and offsets lie.
3. **The Markdown export drops the board.** `docMarkdown` (`:3341-3350`) handles `h p note blank kv t q docs` and nothing else, so Copy and Download sit under a board they cannot see. Design the recipe so the *words* are the recipe.

**Merge board:** grid + chain table + drag + a Collection document per chain (`kv` rows, `blank` for the unmade tiers — the reader's `blank` block exists for precisely this). **One sitting for the surface. The chains are content and they are the real bill.**

**Making surface ("done" by coverage, never seconds):** same canvas, plus one offscreen mask canvas; a step is done when painted-pixels/target-pixels crosses the pack's own threshold. `[TRAINING]` that is ~40 lines. **One sitting for the surface; one sitting per dish for the art.** No clock anywhere, and coverage is the only "done" rule that cannot be turned into one.

**What I would NOT do:** invent an engine `board` or `gesture` block. The engine would have to learn what an ingredient is, and `art` already hands the pack a canvas and a context and asks no questions — the same bargain as `TILEART`. **A seam is only as real as its readers, and this one already has one.**

### 1b · G4 is not a nicety — it is the pantry's blocking bug, and it is now measured

`docs/la-sobremesa.md` §5 records G4 as *"reasoned from the code and not reproduced in a browser"*. **Reproduced.** `docOpen` does `body.scrollTop=0` and `$("paperScroll").scrollTop=0` unconditionally (`engine/engine.js:3487`), and the index pattern redraws by calling `docOpen` again.

> **A forty-line drawer, the player scrolls down to "miel", taps it — and the drawer snaps back to the top. The line they tapped is 2,450 px below the fold.** Measured: `paperScroll` 1853 → 0, window 661 px.

**RULE, four lines:** remember `scrollTop` per document id and restore it when the same id re-opens. Behaviour-identical: nothing in either pack re-opens a document from below the fold today, because the town's controls sit at the top — which is exactly why nobody has felt it. **Red first, and here is the failing test's sentence:** *"the pantry drawer jumps back to the top every time you tick something off — after three items nobody is going to find the fourth."*

### 1c · The household on his laptop — what "probably my laptop" actually buys, and the cliff under it

`[OWNER]` *"2. probably my laptop"* and *"it can sync on its own honestly, but while testing we can use trolley pass"*.

**The town's pattern, which is the one he means `[CODE]`:** a token typed once and kept under the pack's prefix (`changarrito/content/record.js:353`, `SK("token")`), sent as `Authorization: Bearer` (`:286`) to `api.github.com/repos/…` (`:275`), with a 30-day expiry the town already tracks (`:357`). `SK` is `engine/engine.js:13`.

**And the part nobody has said out loud: "read-only on phones" is still a credential on AJ's phone.** A private repository cannot be *read* without a token either. Read-only is a *lesser* token, not *no* token. So there are exactly three shapes and each has a price:
- **(a) a read-only fine-grained token on each phone** — works, syncs, and puts a GitHub credential on AJ's phone;
- **(b) the laptop is the only client; phones get a snapshot over the Trolley Pass** — no credential anywhere, and **capped at about 25 pantry lines** (below);
- **(c) the household is public** — refused. It is his kitchen.

**The Trolley Pass cliff, measured — and `docs/la-sobremesa.md` §5's G1 number is wrong by about 19×.** G1 proposes *"total ≤ 32 KB or the field drops with a warning"* and predicts *"the QR stops scanning"*. Both are wrong:

| Measured (`beto-pass-ceiling.js`, `beto-pass-cliff.js`) | Value |
|---|---|
| A fresh pass URL today | **645 chars**; the save JSON is **426 bytes** |
| `qrcode(0,"L")`'s hard ceiling (`engine/engine.js:4869`) | **2,953 bytes**, 177×177 modules |
| Payload after the `#save=` prefix | **2,904 base64url chars ≈ 2,178 bytes of JSON** |
| Left for a pack after today's save | **≈ 1,700 bytes ≈ 25 pantry lines at 67 bytes each** |
| A 120-line pantry (8,061 bytes) | URL 11,401 chars → `qr.make()` throws **uncaught**, `openPass()` dies at `:4869` before `$("tpass").hidden=false` at `:4878` — **the Trolley Pass button does nothing at all** |

**Two RULEs fall straight out of this, and the first is worth doing *before* G1, not after:**

1. **`qr.make()` must not be allowed to kill `openPass()`.** Two lines: try/catch, hide the QR, and say the true thing — *"too long to scan — copy the link instead"* (the link still works at 11,401 chars; only the QR has a cliff). **Red first:** *"the Trolley Pass button stopped working and did not say anything."*
2. **G1's ceiling is `~1.7 KB`, and it is a refusal, not a warning.** A pack over budget must be told at the seam, in a sentence, before it ships — not silently truncated.

**And the design consequence for the pantry file, which is the whole of job 3 below: store ids, never rows.** A 120-item house as three-character ids is ~720 bytes and fits the QR; the same 120 items as rows is 8 KB and breaks the button.

---

## 2 · THE MAP — what "dynamic" costs, measured

### What it is today `[CODE]`
`drawTown()` (`engine/engine.js:4751-4771`) paints **`WORLDS[PL.street]` only**, at 10 px a tile from `BASECOL`+`MAPCOL`; `TOWNLBL` labels each gated by an optional `when(worldFlags())` (`:4761-4764`); a fixed legend line (`:4765`); **one** you-are-here dot from `MAPDOT` (`:4767-4770`, `content/meridian/maps.js:274`). `openMap()` (`:4772`) fills `#mapNote` and shows `#mapov`. `drawTown()` costs **0.73 ms**. Nothing on it says which quest is next or which are open.

### The three facts that decide the whole design

**Fact 1 — a marker layer is a many-at-once question and every anchor we have is a one-at-a-time answer.** `MAPDOT` exists to answer *"where do I put the dot for the world I am standing in"* — asked once, per open, never colliding. The marker layer asks *"where does each of N people sit on the plan"*. Measured, in the running game:

```
DAY ONE, nothing done — 12 people waiting
  14,0  x8   priya ceo junior legal tovar marcus cto camila   (all in hq)
   6,5  x2   rosa chuy
  27,7  x1   lupe        21,5 x1  xochi
WHOLE CITY OPEN — 27 people waiting
  14,0  x8    29,1 x6 (pa+li+ex share one tile)    6,13 x4    23,13 x3 ...
```

**Two-thirds of day one's markers are one pin.** `beto-map-grown-markers.png` is that, painted onto the real map canvas in the real game — it is a drawing over a real render, and it is what the naive version looks like: eight people, one pin, sitting on top of the "MERIDIAN HQ" label.

**And deriving the anchor instead does not save you.** I walked the portal graph out from `PL.street` with `portalsOf` (`engine/engine.js:69`) and got the *same* collisions — because the collision is true: eight people really are behind one door. **So the fan-out is the design, not a polish pass.** N pins in a small ring around the anchor, so quantity reads as *mass*. Which brings the second fact.

**Fact 2 — the map may not count. `docs/OWNER.md:144`: *"never build a quest log (a list is a backlog, a person is an invitation); the ❗ carries no count, colour or age."*** And `docs/ARCH-LOG.md` A3 draws the line that makes the owner's ask legal at all: **a record of the present — who is waiting right now — is fine; a record of the future is the banned thing.** So this is a finding, not a contradiction I need him to resolve:

> **"Priya · 2 open" is forbidden. "Priya is waiting · Meridian HQ" is the ❗ made visible beyond the room you are standing in, which A3 explicitly allows.**

Every design decision below is downstream of that one sentence.

**Fact 3 — `qOpen(qi)` is a district gate, not a route.** Measured: on day one the street has **three** doors (`E→hq  2→ex  L→lc`); the Studio's `O` door only appears after quests 12 and 13 are done. And on day one `pendingAt(WORLDS.lo.npcs[0])` returns **15** — **Xochi has an open quest behind a door that does not exist yet.** A marker layer reading `MAPDOT` plants a pin on an empty lot at (21,5) and the player walks to a construction site. This is my own predicate-versus-query trap wearing a different hat: *"is this quest open"* can never answer *"can I get there today"*.

### The seam: what is RULE and what is CHOICE

| | Where | Why | Lines |
|---|---|---|---|
| **RULE** — the plan marks everyone who is waiting **now**, from live `WORLDS[id].npcs` × `pendingAt` | engine | It is a mechanism. A pack whose people have no quests gets no markers — **the town's people carry `doc`, not `q` (`addChill` sets `q:[]`, `engine/engine.js:169`), so `pendingAt` returns `undefined` and the town's map is byte-identical. That is the behaviour-identical proof** | ~40 |
| **RULE** — the anchor is **derived**: BFS over `portalsOf` from `PL.street`, falling back to `MAPDOT` | engine | It is the only thing that knows a door is not built yet. Measured at **0.2–0.9 ms**, so compute it per `openMap()` and never cache it — `applyGrowth()` rewrites the grid | ~15 |
| **RULE** — markers **fan out**; no marker and no row carries a digit | engine | `docs/OWNER.md:144` | ~15 |
| **RULE** — nobody is marked who has no route today | engine | free, it is the same BFS | 0 |
| **RULE** — a world with a person waiting and **no** anchor appears in the list with **no pin**, never silently dropped | engine | measured: `lo` returns no route on day one, and `pk` (the park, reached by the leash, not a portal) never gets one at all | ~5 |
| **CHOICE** — the order behind "next" | **no new key.** Sort the waiting by `pendingAt(n)` ascending: Meridian's quest indexes *are* the authored order (`CHAPTERS` lists 0–15, then 16–23…, `content/meridian/config.js:226`) | **A seam is only as real as its readers.** A `MAPNEXT` table nobody draws is a promise. When a pack genuinely needs a different order, that is when the key earns its place | 0 |
| **CHOICE** — whether a tap travels | the pack declares stops in `TRV`. **Neither the town nor `content/gauge` declares `TRV` at all** (grepped) | see below | ~20 |

### The tap: centre and name, do not teleport

`openTravel()` (`:4780-4799`) walks `TRV`, and Meridian's `TRV` is **two street stops** (`content/meridian/maps.js:288`). Teleporting from the map into Taller Herrera would break a settled owner ruling recorded above `TRV` in that same file — *"i dont like that i go from a train to a floor. dont do that. i asked to make the world realistic"* (2026-09-03). **So the tap centres the plan on the pin and names the person and the door in `#mapNote`.** If — and only if — the pack declares a stop, the row may offer the ride, through `openTravel`'s own wiring and never by calling `rideStart` directly (`docs/POSTMORTEM.md` §4).

### What breaks in six months

1. **Somebody adds a count to a pin** because eight people look like one. That is the whole point of the third red test.
2. **A world reached by something that is not a portal** (the park, via the leash) has no anchor — today it silently vanishes from the plan. The no-pin row is the fix and it must ship with the feature, not after it.
3. **A cached anchor table.** `applyGrowth()` rewrites rows; a table computed at boot is wrong the moment a lot is raised. 0.9 ms means it never needs caching, and the comment must say why.
4. **The canvas box is 0×0 while `#mapov` is hidden** — measured: `#mapcv` reports `buf 300×174, css 0×0`. Any tap-mapping that caches its scale at wire-up divides by zero, and any pixel guard on this map that does not first assert a non-zero box is `docs/REGRESSION.md` #23 all over again.

### The three red tests, each with the sentence a person would say

1. **`"the plan shows eight people waiting inside Meridian HQ as one pin — you cannot tell one person from a corridor full of them"`** — with the city grown, no two waiting people may share a pin position. Plant: collapse the fan-out to one pin per anchor. **Red on today's data without any plant at all**, which is why it is the first one written.
2. **`"the plan points at an empty lot on Calle Principal — Xochi is behind a door the city has not built yet"`** — with 12 and 13 not done, no marker may exist for a world with no route from the street. Plant: drop the route filter and read `MAPDOT` raw.
3. **`"the map is counting — it says '2 open' next to a person, and the ❗ has never carried a number"`** — no list row's `textContent` may match `/\d/`. **Honest limit, named:** the DOM half of this reads the noun; the canvas pin half can only be checked structurally (the pin painter is passed no text argument), and a structural check is a proxy. I am saying so rather than letting the register find out.

---

## 3 · A TESTING PANTRY — `content/sobremesa/foods.js`

`[OWNER]` *"3. ok later, but can you not access any general veggies, pantry items for testing purposes?"*

**The answer is yes, and the licence question is smaller than the plan thinks.** A *name* — onion, masa, epazote — is not anybody's intellectual property. **The thing that needs a source is a NUMBER**, and this game has already refused numbers about food (§1's three refusals, `docs/GENRE-RULES.md`). So the testing pantry needs **no fetch, no build step and no attribution page**: it is authored, in the pack, like every other tile in this repository.

`[TRAINING]` USDA FoodData Central is public-domain/CC0 — **I could not verify it: the proxy returned `CONNECT tunnel failed, response 403` for `fdc.nal.usda.gov`.** It does not matter for names. It matters the day a gram appears, and the rule for that day is: **a number ships with its source string in the same row, and nobody ships a number this project has not opened the page for.**

### The shape, and why it is this shape

```js
/* content/sobremesa/foods.js — the catalogue. Names only; a number here needs a source in the
   same row and a person who opened the page. No expiry, no quantity, no grams. */
const FOODS=[
  {id:"fri", en:"black beans",  es:"frijol negro", drawer:"seco",  staple:1},
  {id:"jit", en:"tomato",       es:"jitomate",     drawer:"fresco", raw:1},
  {id:"nop", en:"nopal",        es:"nopal",        drawer:"fresco", raw:1},
  /* … ~80 rows: the milpa three, the Italian seven, the four Japanese and five Korean jars … */
];
```

- **`id` is three characters and that is not style, it is the measurement.** The house's contents ride the Trolley Pass; ids give ~720 bytes for 120 items, rows give 8 KB and the Pass button stops working (§1c).
- **`drawer`** is the pack's own word for a place in his kitchen — re-authored from his photos in one sitting when they arrive, which is R17's decay beaten by re-authoring rather than by maintenance.
- **`raw`** is the *only* field AJ's allergy rule reads, and it is a fact about the ingredient, never about a person. The avoid list is a separate pack file, **hers to write**, and the card prints one plain sentence. **Never an engine field** — a field implies the engine computes it (Toño, §5).
- **No `exp`, no `qty`, no `kcal`.** An expiry list is a guilt list (`panLow`, §6); a quantity that falls is R15 inverted.
- **The house is a different file and a different lifetime:** `const HOUSE={h:["fri","arr","mas"]}` — a list of ids, written through `SK()` (`engine/engine.js:13`), fed **by cooking** (*"I get leftovers?"*), logged by exception, never by typing.
- **It never goes in the shared `sw.js` asset list** — a new public pack gets its own worker and its own cache prefix, or none (§5). Otherwise Meridian's players precache a pantry they will never see.

---

# QUESTIONS FOR THE OWNER

**1 · The household on your laptop — how does AJ's phone READ it?** You said *"probably my laptop"*, and that settles where it lives. It does not settle the other half, and the two sides are real. **(a)** The town's pattern needs a token to read a private repo too, so *read-only on her phone* is a smaller GitHub credential on her phone, not none (`changarrito/content/record.js:286`, `:353`). **(b)** No credential anywhere, phones get a snapshot over the Trolley Pass — **measured ceiling about 25 pantry lines** before the Pass button stops working entirely (`engine/engine.js:4869`; `beto-pass-cliff.js`). Which price do you want to pay?

**2 · The map may not count, and you asked to find "open quests".** `docs/OWNER.md:144` is yours: *"never build a quest log… the ❗ carries no count, colour or age"*, and `docs/ARCH-LOG.md` A3 allows *who is waiting right now* while banning *a list of what you have not done*. I have designed to that line — **"Priya is waiting · Meridian HQ", never "Priya · 2 open"** — and on day one that means eight pins clustered at one door instead of a tidy "8". Confirm that is what you want, because the tidy version is the one every other game ships and it is the one your own rule forbids.

---

# WHAT I DID NOT CHECK

- **Touch.** Every drag I fired was a mouse. `touch-action`, pointer capture on iOS Safari, and a drag inside `#paperScroll` on a real phone are unmeasured — and the merge board's entire viability on AJ's phone rests on them.
- **Landscape.** Nothing here ran sideways, and **no suite in this repository ever has** (`docs/REGRESSION.md` §1). The canvas-scaling edge in §1a is exactly where that bites.
- **I did not run `test/smoke.js`, `test/town.smoke.js` or `test/engine.smoke.js`.** Nothing I propose was built, so there is nothing to prove green — but I am not reporting a green board.
- **I did not verify USDA's licence** (proxy 403). Names do not need it; numbers do.
- **The merge plant ran in Meridian's cream shell, not the town's night paper.** The mechanism is the paper-independent part; the *feel* in night mode is Mari's to draw and I did not draw it.
- **I did not open a single GitHub issue** or check the backlog's ledger, which was another agent's job this run.
- **The 8-pin fan-out is designed, not drawn.** `beto-map-grown-markers.png` shows the *naive* one-pin version on purpose, because that is the thing I am arguing against; nobody has cold-read a fan-out at 10 px a tile.
- **I did not re-derive `docs/la-sobremesa.md`'s §5 claims about `PACKSAVE`** beyond the pass ceiling — the `sanitizeSave` whitelist half I read (`engine/engine.js:503`, `:516`) but did not plant against.

---

# POST-FLIGHT

**What the persona got right, with the moment:** *before you write a guard, find the one that should already have caught it* pointed me at `MAPDOT` before I designed a new key — and the measurement showed it is a **one-at-a-time** answer being asked a **many-at-once** question, which is my own predicate-versus-query cut arriving from a direction I did not expect; that single reading is what turned "add markers" into "the fan-out is the design". **Where it got in the way:** I spent my first instinct pricing the merge board as an engine gap because §12.2 told me the canvas does not listen, and I nearly relayed it — `docs/POSTMORTEM.md` §8 says a brief is evidence and not authority, and one `g.canvas` would have saved a whole sitting from being quoted at the owner. **The gap I predicted did appear, exactly as named:** I called the merge board "one sitting" on the strength of a mechanism working under a mouse, and the mechanism is the cheap part — the chains, the art and the touch behaviour are the bill, and I cannot cost them. **The edit I propose to my own file:**

> *Anchor: append as a sixth bullet under `## Five engine facts you keep re-deriving`, and change that heading to `## Six engine facts you keep re-deriving`.*

```
- **The reader's `art` block hands the pack the ELEMENT, not just the paint.** `docRender`'s art branch
  (`engine/engine.js`, grep `s2.art&&typeof s2.art`) builds a fresh `<canvas>` per `docOpen`, and a 2D
  context carries `g.canvas` — so a surface that LISTENS (drag, spread, place) is pack code with no
  engine change, and the listeners die with the element because `docOpen` clears the body first. One
  CSS pixel is one art unit (`cv.style.width=W+"px"` against `cv.width=W*K`), but only while the column
  is wider than the canvas — so map a pointer with `getBoundingClientRect`, never `offsetX`.
  **And the same function is where the reader forgets where you were:** `docOpen` resets `scrollTop` and
  `paperScroll` unconditionally, so any document that redraws by re-opening itself throws the player
  back to the top — measured at 1853 → 0 on a forty-row list.
  *The moment (2026-09-14):* a plan written by seven designers said "the `art` block draws and does not
  listen" and priced a merge board as the biggest build in the game. Two real mouse drags in the shipped
  engine merged masa → tortilla → taco with nothing in `engine/` touched.
```

---

MURAL PANEL
```
id:     beto-el-boleto-tiene-orilla
by:     "beto"
title:  {en:"The ticket has an edge", es:"El boleto tiene orilla"}

said:   {en:"The pantry did not break the code. It broke the button — no error, no message, nothing opens.",
         es:"La despensa no rompió el código. Rompió el botón — sin error, sin aviso, no abre nada."}

state:  {en:"At the printer with the tag in my hand and the number printed on it: two thousand nine hundred and four characters, and not one more. I will not sign off a pantry that rides the pass until the ceiling is written next to the seam, in bytes, where the person filling it can read it.",
         es:"En la impresora, con la etiqueta en la mano y el número impreso encima: dos mil novecientos cuatro caracteres, ni uno más. No firmo una despensa que viaje en el pase hasta que el tope esté escrito junto a la costura, en bytes, donde lo lea quien la llena."}

who:    {en:"Beto, who kept filling the pass until it stopped opening",
         es:"Beto, que siguió llenando el pase hasta que dejó de abrir"}

cap:    {en:"The plan said thirty-two kilobytes and warned the code would stop scanning. Both were wrong. The ticket holds about twenty-five lines of pantry; past that the drawing throws where nobody is catching, the panel never appears, and the button a man presses to send his kitchen to his own tablet simply does nothing. It took one oversized list to find, and it was the only way to find it — every reading of that function says it works.",
         es:"El plan decía treinta y dos kilobytes y avisaba que el código dejaría de leerse. Las dos cosas estaban mal. En el boleto caben unos veinticinco renglones de despensa; pasando eso el dibujo revienta donde nadie lo agarra, el panel nunca sale, y el botón que uno aprieta para mandarle su cocina a su propia tableta simplemente no hace nada. Costó una lista de más encontrarlo, y no había otra manera — cualquier lectura de esa función dice que funciona."}

aspect: 0.46

art: (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* THERMAL LABEL — my own palette: receipt paper, burnt print, one alarm red */
  const PAP="#F4F1E6",EDGE="#CFCABA",PRINT="#1A1A1C",FADE="#5A5650",ALARM="#B3352B",PERF="#8A9099";
  const tx=W*0.055,ty=H*0.115,tw=W*0.56,th=H*0.575;
  g.strokeStyle=FADE;g.lineWidth=1.5;g.beginPath();
  g.moveTo(0,ty+th*0.10);g.quadraticCurveTo(tx*0.5,ty-H*0.05,tx+tw*0.055,ty+th*0.11);g.stroke();
  g.fillStyle="rgba(0,0,0,.18)";g.fillRect(tx+3,ty+4,tw,th);
  g.fillStyle=PAP;g.fillRect(tx,ty,tw,th);
  g.strokeStyle=EDGE;g.lineWidth=1;g.strokeRect(tx+.5,ty+.5,tw-1,th-1);
  for(let y=ty+4;y<ty+th-2;y+=6){g.fillStyle=PERF;g.fillRect(tx+tw-1,y,2,3);}
  g.fillStyle=P.wash;g.beginPath();g.arc(tx+tw*0.055,ty+th*0.11,Math.max(3,th*0.045),0,7);g.fill();
  g.strokeStyle=EDGE;g.stroke();
  g.fillStyle=PRINT;g.fillRect(tx+tw*0.10,ty+th*0.055,tw*0.84,2);
  g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
  g.fillText("TROLLEY PASS", tx+tw*0.10, ty+th*0.055-5);
  const qn=21,qs=Math.floor((tw*0.42)/qn)||3,qx=Math.round(tx+tw*0.10),qy=Math.round(ty+th*0.15);
  let seed=7;const rnd=()=>((seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff);
  const finder=(fx,fy)=>{g.fillStyle=PRINT;g.fillRect(fx,fy,qs*7,qs*7);
    g.fillStyle=PAP;g.fillRect(fx+qs,fy+qs,qs*5,qs*5);
    g.fillStyle=PRINT;g.fillRect(fx+qs*2,fy+qs*2,qs*3,qs*3);};
  for(let r=0;r<qn;r++)for(let c=0;c<qn;c++){
    const inF=(r<8&&c<8)||(r<8&&c>qn-9)||(r>qn-9&&c<8);
    if(inF)continue;
    if(rnd()<0.47){g.fillStyle=PRINT;g.fillRect(qx+c*qs,qy+r*qs,qs,qs);}}
  finder(qx,qy);finder(qx+qs*(qn-7),qy);finder(qx,qy+qs*(qn-7));
  const lines=["#save=eyJ2IjoxLCJsIjoiZW4i","LCJzIjp7Im4iOiJCZXRvIiwi","cGsiOnsiaCI6WyJmcmkiLCJh"];
  g.font="9px ui-monospace,monospace";
  lines.forEach((s,i)=>{g.fillStyle=i<2?PRINT:FADE;
    g.fillText(s, qx+qs*qn+tw*0.05, qy+12+i*12);});
  g.fillStyle=FADE;g.fillText("cnIiLCJtY", qx+qs*qn+tw*0.05, qy+12+3*12);
  const lx=Math.round(tx+tw*0.955);
  g.strokeStyle=ALARM;g.lineWidth=2;g.setLineDash([4,3]);
  g.beginPath();g.moveTo(lx,ty+2);g.lineTo(lx,ty+th-2);g.stroke();g.setLineDash([]);
  g.fillStyle=ALARM;g.font="bold 11px ui-monospace,monospace";g.textAlign="right";
  g.fillText("2 904", lx-4, ty+th-6);
  seed=31;
  for(let i=0;i<130;i++){
    const t=i/130, x=lx+6+t*(W*0.715-lx), y=ty+th*rnd();
    if(rnd()>1-t*0.92)continue;
    g.fillStyle=PRINT;g.globalAlpha=Math.max(0.12,1-t*1.05);
    g.fillRect(Math.round(x),Math.round(y),qs,qs);}
  g.globalAlpha=1;
  g.fillStyle=PRINT;[[0.655,0.735],[0.695,0.775],[0.735,0.745]].forEach(([a,b])=>
    g.fillRect(Math.round(W*a),Math.round(H*b),qs,qs));
  const px=W*0.725,py=H*0.135,pw=W*0.215,ph=H*0.34;
  g.strokeStyle=FADE;g.lineWidth=1.5;g.setLineDash([5,4]);g.strokeRect(px,py,pw,ph);g.setLineDash([]);
  g.fillStyle=FADE;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
  g.fillText("—", px+pw/2, py+ph/2+4);
  g.font="11px ui-monospace,monospace";
  g.fillText("no abre", px+pw/2, py+ph+13);
  g.textAlign="left";g.fillStyle=PRINT;g.font="bold 12px ui-monospace,monospace";
  g.fillText("25 renglones", tx+tw*0.10, ty+th+H*0.125);
  g.font="11px ui-monospace,monospace";g.fillStyle=FADE;
  g.fillText("el renglon 26 no rompe el codigo, rompe el boton", tx+tw*0.10, ty+th+H*0.125+14);
}
```
*Rendered before proposing, at the wall's course size (W=520, H=239, aspect 0.46): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/beto-panel-final.png`. Bottom 6 % is clear; all type is absolute (`bold 11px`, `bold 12px`, `11px`, `9px`) and all geometry is in fractions of W and H. Made of a **thermal-printed parcel tag** — receipt paper, burnt print, one alarm red — which is neither my bench (iter 5) nor my paint card (iter 6), and there is no QR, no punched tag and no thermal type anywhere else on the wall.*

---

# don-guero

PRE-FLIGHT — I intend to work this from the code first (`drawTown`, `portalsOf`, `hasSay`, `worldFlags`, the two colour tables, `TOWNLBL`, `MAPDOT`) and only then from `CITY.md`, because the ledger has been wrong about this city four times and the map is the one page a player judges the barrio by. My persona is equipped for exactly this: a map is a plan, a plan has a legend, and a legend that promises something the paint does not deliver is a permit violation I can read off two tables without opening a browser. Where I expect to fall short, named in advance: I am a siting man, not a colourist or a QA — I can tell you a glyph is in neither colour table and I **cannot** tell you what the label looks like on a phone, and the brief told me I had Bash and I do not (Read/Grep/Glob only), so **nothing in this report was rendered and no pixel was measured this run**.

---

# THE DELIVERABLE

## 📐 Plano de crecimiento — Phase 7 · **El plano de la colonia** (the board), and **La casa** (the household's parcel)

**The phase in one line** — the city gets a directory board instead of a souvenir plan: the same tiles, plus the two marks the street already carries, so a person can see **where somebody is waiting** without anybody ever writing a list; and the food game's household gets sited and priced before it is drawn.

**Parcel & business:** this phase develops **no new business**. Part A is *obra pública* — the board itself, an engine job on one function. Part B is a parcel in **another world** (`content/sobremesa/`), not in Meridian, and I say so loudly because Meridian's content is never edited for another world's sake (`CLAUDE.md`).

---

## A · THE PLAN — what a citizen should see

### A1 · What the board carries today, counted `[CODE]`

| Fact | Where |
|---|---|
| The plan paints **one world**: `WORLDS[PL.street]` = `st`, at 10 px a tile, into a 300×174 canvas that CSS stretches to 100% with `image-rendering:pixelated` | `engine/engine.js` grep `function drawTown`; `index.html:628` |
| **Eleven labels**, of which **seven carry a `when(flags)`** and do change as the city grows (SITE→STUDIO, LOT→MERCADO, RESERVED→TALLER, NOTARIO) | `content/meridian/maps.js:260–272` |
| **One legend line**, hardcoded in the engine as an `es?:` ternary — no pack owes a UI key for it | `engine.js` grep `doors & stairs in gold` |
| **One dot**, purple, from `MAPDOT` or your own `fx,fy` | `engine.js` grep `const M=typeof MAPDOT`; `maps.js:274` |
| Everything else about **you** — nothing. No quest state is read. `worldFlags()` is called and only the labels consume it | `engine.js` grep `const flags=worldFlags()` |

**So the honest sentence is not "the map is not dynamic".** It is: **the plan is dynamic about the CITY and silent about YOU.** Seven of eleven labels already change with growth. What has never been on it is a single fact about your own work.

### A2 · Four things I found walking it, none of them in any register

1. **Calle Dos is not on the map.** `pa` (La Espiga) and `li` (Limpieza Velázquez) hang off `ex`, a separate world (`maps.js:195–196, 203–204`), and `drawTown` paints only `st`. **Two districts, 16 of the pack's 56 quests (32–39 and 40–47), three quest-givers each and five more neighbours on `ex` — 11 people — live behind the words "CALLE DOS →" at `maps.js:270`, on a street the board has never drawn.**
2. **`MAPDOT` is not a location table, it is a re-entry table.** `pa`, `li` and `ex` all resolve to `[29,1]` (`maps.js:274`) — the corner of Calle Principal. Stand in the bakery, open the map, and it says you are two streets away, at the corner you came in by. That is not a lie anyone wrote; it is the only answer available when the sheet has no bakery on it.
3. **The notario's door is painted the colour of the pavement.** `NOLASCO=[[0,25,"$"]]` (`maps.js:218`) stamps `$` on `st` (25,0). `$` is in `DOORS` (`maps.js:237`) and in **neither** `BASECOL` (`engine.js` grep `const BASECOL=`) **nor** `MAPCOL` (`maps.js:253–258`), so `drawTown` falls through to `"#D5D2C6"` — the pavement default — while the legend directly beneath promises *doors & stairs in gold*. **One character of content fixes it:** `"$":"#E0B45C"` in `MAPCOL`. (`@` and `*`, the Calle Dos doors, are missing from the table too — they simply have never been drawn.)
4. **In the park there is no dot at all.** `MAPDOT` has no `pk`, and the fallback is `null` (`engine.js` grep `const dot=world===PL.street`). The park is reached by the leash, not by a door, so nothing can derive one either — which is the same gap `CITY.md:281–282` already records as *"the leash moves you town-to-park with no gate"*.

### A3 · The plan, drawn as a plan

Three layers, and the third is the only new one.

**Layer 1 — the ground.** Unchanged. Real tiles, real colours, the city as it stands. It already grows, because `w.rows` are live and `applyRibbon` writes into them (`engine.js` grep `function applyRibbon`).

**Layer 2 — the sheets.** The board draws **every street world**, stacked on one canvas: Calle Principal, then Calle Dos indented under it with its own hairline title. At 12 px a tile that is 360×206 and 288×146 — one canvas, no scroll, no second button.
*The seam:* `PLACES.streets:["st","ex"]`, defaulting to `[PL.street]`, so **every existing pack including the town is byte-identical**. Do **not** derive "is this a street" from how many doors point into it — that is the proxy trap `docs/REGRESSION.md` §3 is a register of; two doors is not a street, it is two doors.

**Layer 3 — the plates and the marks.** At every door on a drawn sheet — derived from `portalsOf(id)` (`engine.js` grep `function portalsOf`), so **no new content table exists and none is needed** — a small plate carrying the place's name from `T().locs[to]`, which is already written in both languages for all twelve worlds (`strings.js:47` and `:268`) and is written automatically for any room a build carries (`engine.js` grep `t.locs\[id\]=`).

And on the plate, **one mark or none**:

| Mark | Means | Derived from |
|---|---|---|
| **❗** | somebody through this door has something to say **right now** | `WORLDS[to].npcs.some(hasSay)` — `engine.js:611`, which is already *pending quest · pending room · a document to hand you* |
| **the cream card** | there is something to read in there | `RD().some(r=>r.world===to)` — `engine.js:3500` |
| **nothing** | nothing is waiting | — |

> **The rule that makes this legal and that I will not bend: the board invents no new marker.** The ❗ and the little cream card are the street's own vocabulary (`engine.js:609–611` and grep `function drawReadMark`). The map is those two marks **seen from above** — which is precisely the half of `docs/ARCH-LOG.md` A3 that is recorded as missing: *"a record of the present — who is waiting right now — is fine. That is the ❗, made visible beyond the room you are standing in."*

**Layer 3½ — the lots.** Keep the `when` labels that already exist; hatch a lot's tiles so LOTE reads as a fenced site and not as a shop. A lot is on the plan because it is **standing in the street**, not because it is on a to-do list.

**The dot.** Keep it, and let it be derived first — the door on a drawn sheet that leads to the world you are in, one hop for a floor above (`f2`→`hq`→`st`). That covers all ten `MAPDOT` entries once `ex` is a sheet. **Keep `MAPDOT` as the pack's override and delete nothing** — a pack may want a dot where no door exists.

### A4 · The legend, exact, as engine literals (no pack owes a string)

Keep the shape at `engine.js` grep `doors & stairs in gold` — a ternary on `es`, never a `UI` key, because `UI` is ~82 bare-dereferenced keys and a new one breaks a brand-new pack (`docs/GAUGE.md` row 2).

```
EN   ◉ you are here   ❗ somebody here has something to say   ▤ something to read   ▨ a lot, not built yet
ES   ◉ aquí estás     ❗ alguien aquí tiene algo que decir     ▤ algo que leer      ▨ un lote, sin construir
```

And **either** add `"$":"#E0B45C"` **or** stop promising gold. Today the legend is the only sentence on the board and it is not true.

### A5 · What the plan must NEVER show — the paid-for list

- **No quest list, no titles, no numbers, no order, no "next".** `docs/OWNER.md` (2026-09-01, *No practice is ever missed*): *"never build a quest log (a list is a backlog, a person is an invitation); **the ❗ carries no count, colour or age**"*.
- **No count on a mark** — which kills my own first sketch of a "CALLE DOS · 2 ❗" plate. Same line, same day, signed.
- **No grade, no percentage, no 3-of-8, no progress bar.** `worldFlags()` hands `grade` and `answered` to the board; the board may use them to change a **label** (it already does) and never to score you.
- **No route line, no arrow to the nearest ❗.** A plan says where things are. A route says what to do next, and *"you walk over because you want to, not because a quest log told you to"* (`docs/OWNER.md`, the walkthrough at the foot of the file).
- **Nothing that is not standing in the world.** A lot appears because it is fenced in the street. A business the city has not broken ground on has no plate — `docs/ARCH-LOG.md` A3: a record of the future is the banned thing.
- **No clock, no "today", nothing that re-arms with the day.**

### A6 · Build notes for the engineer

- **One function.** `drawTown()` (`engine.js`, grep `function drawTown`) and its caller `openMap()`. `index.html:625–632` needs **no change** — the canvas grows taller inside the same box.
- **Inputs, all existing:** `portalsOf(id)` `:70` · `hasSay(n)` `:611` · `RD()` `:3500` · `T().locs` · `worldFlags()` · `TOWNLBL` · `MAPDOT` (override) · new `PLACES.streets` with a default.
- **Content edits, Meridian:** `"$":"#E0B45C"` (and `"@"`,`"*"` for the Calle Dos sheet) in `MAPCOL`; `streets:["st","ex"]` in `PLACES`. That is the whole pack bill.
- **⚠️ This changes the owner's own tool and he should be told before it lands.** El Changarrito has a map button and a nine-world `MAPDOT` (`changarrito/content/maps.js:170`) and declares **no `TOWNLBL` and no `MAPCOL`** — so today its plan is tiles, a legend and a dot. After this it gains named plates for nine worlds, and **because the record decorates every placed person with `doc` (`changarrito/content/record.js`, grep `n.doc=this.doc(i)`), `hasSay` is true for every issue on the street and the town's plan lights up end to end.** That is arguably right for a backlog street — and it is a visible change to his tool, so it is his call, not ours.
- **Red before green, three plants, each broken outside the repo first** (`docs/POSTMORTEM.md` §0):
  1. a world with an open, unanswered quest and **no ❗ on its plate** → must print *"Taller Herrera has somebody waiting and the plan shows nothing at its door"*;
  2. a plate drawn for a lot **whose ribbon is down** → must print (this is the A3 violation: advertising a business that does not exist yet);
  3. every quest in a district answered and the **❗ still drawn** → must print. A mark that never clears is the checklist `engine.js:3504` refuses.
- **The guard that does not exist:** the only thing holding Meridian's plan today is *"it does not throw"* (`test/smoke.js:1859`). There is no assertion that any label, dot or business appears. Whatever lands here should arrive with the first real assertion this board has ever had.
- **Filed as a suspicion, not a finding, because I planted nothing** (`docs/POSTMORTEM.md` §13k): `test/town.smoke.js:716` reads `MAPDOT[h.world][0] === d.x` — **the x only**. A dot with the right x and the wrong y passes. Plant it before anyone files it.
- **Price:** the marks and plates on the existing single sheet — **a quarter of a sitting**. The second sheet and `PLACES.streets` — **another quarter**. The legend and the `$` — minutes.

---

## B · THE HOUSEHOLD — the parcel, and what it needs around it

**It does not go in Meridian.** The household is La Sobremesa's, `content/sobremesa/`, and Meridian's content is never edited for another world's sake (`CLAUDE.md`; `docs/OWNER.md` 2026-09-05). What follows is the price sheet and the rules it must obey, drawn from the two homes I have already built here.

### B1 · Build it as a declared world, **not** as a build template — and why

Meridian's `casa` is a `BUILDTPL` because Calle Dos has several lots and one template stamps many homes (`content/meridian/art.js:399–415`). **The household is one room, forever.** A template buys you variation you do not want and two constraints you pay for free:

- **The id is truncated to twelve characters** (`engine.js` grep `String(l.id).slice(0,12)`).
- **The way out is hardcoded.** `buildInterior` writes the return portal as `{to:from, x:l.x, y:l.y+1}` (`engine.js`, grep `PORTALSAT\[id\]`), so **a template home's door must have its walkable tile directly SOUTH of it** — which is exactly why Doña Tencha's casa sits at `ex` (4,2) with its poured pavement on row 3 (`art.js:481`, `art.js:402–404`), and why the template's own shell part pours that pavement for you.

A declared world + a `PORTALS` pair costs the same to write, faces any direction you like, and carries its own `x,y,dir` at both ends (`maps.js:185–200`).

**What it costs:** one `WORLD_DEFS` entry (10×8 rows), one portal pair, `locs` and `arrive` in both languages, and the door's parcel on the street. **A quarter of a sitting.** It adds **nothing** to the bill a brand-new pack already owes (`docs/GAUGE.md`: careers hardcoded in three shells, ~82 `UI` keys, `GAMENAME`, three hair styles by name, no `kind:"flat"`, and *a partial `PLACES` is worse than none*).

### B2 · What a one-room household needs around it — the four rules, cited

1. **A door that opens.** `buildSafe()` refuses any tile the pack calls a door unless it is walkable or carries a portal (`engine.js` grep `would open onto nothing`; `CITY.md:340–342`). Signed rule: *nothing goes into the world the player cannot use* (`docs/OWNER.md`, 2026-09-03).
2. **A banqueta in front of it, and you must name the row a person stands on.** `.` is pavement, `≈` is carriageway. The two homes on Calle Dos each got a **poured pavement row of their own** below the front — the template does it in the shell part, not by accident. A door whose standing row carries the tram is not a parcel, it is a hazard, and this project has already corrected exactly that mistake once (`maps.js:210–214`).
3. **The shops it walks to.** *La regla del doce y el octavo* (`CITY.md:720–723`): no walkable tile more than **twelve steps** from something you can stop at, and **1-in-8 to 1-in-5** walkable tiles is furniture. Site the household's door **within twelve steps of the market door and within one street of a kitchen**, so *"cook a shift with what is in the house"* is a walk and not a menu.
4. **The room's own density is the pantry.** A 10×8 room is ~54 walkable tiles; the band says 7–11 objects. Table, two chairs, shelf, fridge, freezer, three drawers, a plant, the radio = **eleven**. The pantry **is** the furniture budget — there is no room left over for decoration, and that is the correct answer, not a shortage.

### B3 · The one layout rule nobody has written down, and it will bite the pantry

`readAt` probes **five tiles in a fixed order — the one you stand on, then north, south, west, east — and takes the first hit** (`engine.js:3595`, with `readAt` at `:3503`). So:

> **Put the drawers IN the wall row and leave the standing row below them clear.** A row of drawers along a north wall is unambiguous — each is *north* of its own standing tile. Two readables in the **same row** as the player, or diagonal to each other, and the middle tile silently opens whichever was declared first in `READS`.

And: **re-opening a document scrolls it to the top** (`docs/la-sobremesa.md` G4) — a forty-item pantry will hit that on the first press. It is four lines, and it is a RULE both games get.

### B4 · Two things the household is the right home for

- **The avoid list lives on the fridge, not in the engine.** A readable on the fridge door — *who · what · raw or cooked* — keeps AJ's list in the house and honours the register's line that an allergen may **never** be an engine field (`docs/la-sobremesa.md` §5, Toño).
- **The pantry drawers need no engine work at all.** An interior's `reads:[{x,y,doc}]` already flow into `bldReads`/`RD()` (`engine.js:5549`), and a document may be built on the spot without ever being registered in `DOCS` (`engine.js` grep `function docDef`).

---

## 📋 Ledger updates — the exact lines for `docs/CITY.md`

**Append under "Pending proposals":**

```markdown
- ⏳ **❗El directorio — the town plan stops being a souvenir** *(Don Güero, 2026-09-14; owner: "i want to
  revamp the map... right now it is not dynamic.. this needs best practices so i can find the next quest
  or open quests")* — **In plain words:** the plan draws one street and one purple dot, and says nothing
  about anybody but you. Measured: seven of its eleven labels already change as the city grows, so it is
  dynamic about the CITY and silent about YOUR work. The plan: door plates derived from `portalsOf()` —
  no new content table — carrying the place's name from `T().locs`, and ONE of the street's own two marks
  or none: the ❗ (`hasSay`) and the reader's cream card. **No new marker, no count, no colour, no order,
  no titles** — `docs/OWNER.md` (2026-09-01) forbids a quest log and forbids a count on the ❗, and
  `docs/ARCH-LOG.md` A3 names this exact feature as the missing half of the record of the PRESENT.
  Second half: `PLACES.streets` (default `[PL.street]`, every pack byte-identical) so Calle Dos is drawn
  at all. Half a sitting, one engine function, two content characters.
  **Three facts found walking it, not absorbed:** (1) `pa` and `li` hang off `ex`, which the plan has
  never drawn — 16 of 56 quests and 11 people behind one arrow; (2) `MAPDOT` sends `pa`, `li` and `ex`
  to the same corner tile, because it is a re-entry table and not a location table; (3) `NOLASCO` stamps
  `$` on st (25,0) and `$` is in neither `BASECOL` nor `MAPCOL`, so the notario's door is painted the
  pavement default while the legend beneath it promises doors in gold. And in the park there is no dot
  at all. **It changes El Changarrito too** — the town declares no `TOWNLBL`, and every issue-person
  there carries a `doc`, so its plan would gain a mark on every door. The owner's call.
```

**Correction to "⚠️ THE CEILING", replacing the bullet beginning "STILL OPEN, new (Don Güero, 2026-09-02): the town plan's `flags` carry ONE boolean":**

```markdown
- ~~**STILL OPEN, new (Don Güero, 2026-09-02):** the town plan's `flags` carry ONE boolean for all
  storefronts~~ — **LIFTED, and the ledger did not know.** `worldFlags()` has carried `f.up[id]` per
  storefront since the `ribbons[]` work (`engine/engine.js`, grep `one flag PER storefront`), and
  `content/meridian/maps.js` TOWNLBL has used `f.up.me` and `f.up.ta` for four labels ever since.
  Corrected 2026-09-14 by Don Güero, against the code. The sixteenth of a sitting was already paid.
```

**Append under "Open parcels":**

```markdown
- **La casa de La Sobremesa — NOT a Meridian parcel.** The food game's household is a room in
  `content/sobremesa/`, and Meridian's content is never edited for another world's sake. Recorded here
  only so nobody sites it on `st` row 15 or `ex` row 10 by accident. Don Güero's ruling, 2026-09-14: a
  declared world plus a portal pair, **not** a `BUILDTPL` — a template truncates the id at twelve
  characters and hardcodes the way out to the tile directly south of the door, which is a price you pay
  for variation a single household does not want.
```

**Growth history line, to append only when it ships:**

```markdown
- 2026-09-14 — **El directorio**: the town plan learned who is waiting. Door plates derived from
  `portalsOf()` (no new content table), named from `T().locs`, wearing one of the street's own two marks
  — the ❗ and the reader's card — or nothing; `PLACES.streets` so Calle Dos is on the map at last;
  `$` added to `MAPCOL` so the notario's door is the gold the legend always promised. No list, no count,
  no order, no route: `docs/OWNER.md`'s quest-log ban and `docs/ARCH-LOG.md` A3 both hold. First
  assertion the plan has ever had — until today the only thing holding it was that it did not throw.
```

---

# QUESTIONS FOR THE OWNER

### ❗ **El letrero que dice "siguiente"** — the one I cannot decide for you
**Two things you signed collide.** On 2026-09-01 you settled *"never build a quest log (a list is a backlog, a person is an invitation); **the ❗ carries no count, colour or age**"* (`docs/OWNER.md`, under *No practice is ever missed*). Tonight you asked for a map where you can *"find the next quest or open quests"*. **A plan can show you where somebody is waiting. It cannot tell you which one is next without becoming the list you banned** — and your own districts have no order (any twelve of sixteen, from anywhere). I will not average these.
- **A — Marks only.** ❗ on the door, no title, no name, no count, no order. Nothing you signed changes. *Consequence: you can see at a glance which four doors have work and which six do not; you still cannot see what the work is until you walk in.* ← **I recommend this.**
- **B — Marks plus the person's name on the plate.** "Doña Chelo ❗" instead of a dot. Still no quest title, no count, no order. *Consequence: the map becomes a page of invitations instead of a page of doors — the most useful version that still obeys 09-01.*
- **C — A real list, ordered, with titles.** *Consequence: this is a reversal of your 2026-09-01 rule, and the reversal gets written into `docs/OWNER.md` next to the words it replaces. I would rather you did that on purpose than have me quietly build it.*

### ❗ **La otra calle** — half the barrio is not on the board
Two whole businesses (La Espiga, Limpieza Velázquez), eleven neighbours and 16 of the city's 56 questions live on Calle Dos, which the plan has never drawn; today it gets one arrow at the edge.
- **A — One canvas, two sheets stacked**, unlocked by a one-line `PLACES.streets` that defaults to what every pack already does. *Consequence: a quarter of a sitting; the whole city is on one page; the board gets taller.*  ← **recommend**
- **B — A "CALLE DOS" plate you tap to swap sheets.** *Consequence: the board stays small, and you have to know to press it — which is the same problem the arrow already has.*
- **C — Leave it, and put the two bakery plates on the corner where the dot already sends you.** *Consequence: cheapest, and it is a lie printed on a directory board.*

### ❗ **La banqueta de la casa** — where the household's front door faces
The household needs a street to stand on before the pantry means anything: *"I get left overs"* and *"use our food"* only land if walking home is real.
- **A — The household on the same street as the kitchens**, door within twelve steps of the market. *Consequence: picking up a shift, shopping and cooking are one walk; the street has a home in it, which is what makes it a barrio and not a food court.* ← **recommend**
- **B — Its own quiet lane, one door off the kitchens' street.** *Consequence: home feels like home and every trip costs an extra screen; on a phone that is two more presses each way.*
- **C — Home is where you START (`PLACES.home`) and the street is a door away.** *Consequence: the game opens in your own kitchen with the pantry in front of you — the warmest opening available — and the shifts board is then somewhere you go, not somewhere you are.*
  *(A and C can both be true. B and C cannot.)*

### ❗ **La gente callada** — do the quiet ones show up at all?
Beto, Kike, Mari, Doña Meche and Rigo have no quests (`npcs.js:10`), so `hasSay` is false and Calle Dos would read as an empty street on a board that has just learned to show people.
- **A — Only where there is work.** The board says exactly what the street says. *Consequence: honest, and Calle Dos looks deserted on paper while five people stand on it.* ← **recommend**
- **B — A second, quieter mark for "people live here".** *Consequence: a third marker in a vocabulary you deliberately keep to two, and every pack inherits it.*
- **C — Draw the people as small dots.** *Consequence: pretty; and it is a live map of everyone's position, which is a different feature with a different bill.*

---

# WHAT I DID NOT CHECK

- **I rendered nothing.** The brief said I had Bash and a Chromium; my toolset this run is Read, Grep and Glob only. **No screenshot was taken, no pixel was measured, and none of the three mock orders applies** — every claim here is read out of a file. The `$`-is-pavement finding is arithmetic over two colour tables, not a picture, and `docs/POSTMORTEM.md` §3 and §13t both say a thing that is "hard to see" gets settled by blanking its painter and looking.
- **I did not open the map in either game.** I do not know how blurry an 8-px label is after CSS stretches a 300-px canvas, and I did not measure the overlay box on any viewport, so my "one canvas, no scroll" claim about two stacked sheets is arithmetic (360×206 + 288×146) and not a layout test.
- **I planted no violation at anything.** The `test/town.smoke.js:716` x-only reading is filed as a suspicion in this report and is deliberately **not** proposed as a `REGRESSION.md` row.
- **I did not enumerate the town's `UI.locs`** — my "plates are named for free" claim is verified for Meridian (`strings.js:47`, `:268`) and assumed for El Changarrito.
- **I did not read `docs/la-sobremesa.md` §4 (Pili's look) or any of the mock PNGs**, so nothing here is reconciled against the drawn night-mode surfaces, and the household's palette is not my business.
- **Landscape:** unrun, as always (`docs/POSTMORTEM.md` §13o). A board that grows taller is exactly the change that meets a sideways phone badly.
- **One thing I chased and cleared, so nobody re-chases it:** I suspected `BUILDTPL.barberia` pours three pavement tiles onto the tram's lane at `ex` row 1 (x21–23) — the same fault removed from ESPIGA on 2026-09-11. It does not: `TROLLEYAT` runs `ex` row 1 **from x20 to x0** (`maps.js:287`), so x21–23 are outside the line. `CITY.md:279–280`'s *"the code is better than the ledger"* is correct.

---

# POST-FLIGHT

The persona earned its keep twice: "read the legend against the paint" is a foreman's reflex, not a programmer's, and it is what turned up a door painted the colour of the pavement under a sign promising gold — and "which row does a person stand on" is what made me read `buildInterior`'s return portal and find the hardcoded `y+1` that decides which side of a street a template home may ever sit on. Where it got in my way: a foreman wants to draw, and I could not — I spent the first third of this run planning a render I had no tool to make, and the plan is weaker for having no picture in it. The gap I predicted did appear, exactly as named: I can tell you `$` resolves to `#D5D2C6` and I cannot tell you whether a person looking at the board notices, and per `docs/POSTMORTEM.md` §13j that sentence is a blocking handoff and not a caveat — **somebody with a browser should open the map before the `$` fix is called done.** My file's edit:

> **Anchor:** `.claude/agents/don-guero.md`, the section headed `## Three things to check before you site anything` — change the heading to `## Four things to check before you site anything`, and append this as a fourth bullet after the one beginning **"Before you site a building's HEIGHT, read the door's neighbours."**

```markdown
- **The plan is not the city — it is ONE world, and the marks on it are the street's own.** `drawTown`
  paints `WORLDS[PL.street]` and nothing else (grep `function drawTown`), so a business on any other
  street world is not on the map at all: today that is two districts, eleven people and sixteen of
  Meridian's fifty-six quests, behind one arrow at the edge. **Before you promise anybody a map, name
  which world it draws and which of your parcels is not in it** — and check the door's glyph is in
  `BASECOL` or `MAPCOL`, because a glyph in neither is painted the pavement default under a legend
  that promises gold (`$`, the notario's door, since the day it shipped). When you add a mark, use the
  two the street already has — the ❗ (grep `const hasSay`) and the reader's cream card (grep
  `drawReadMark`) — never a third: `docs/OWNER.md`'s *no practice is ever missed* forbids a count, a
  colour or an age on a mark, and `docs/ARCH-LOG.md` A3 forbids the future. *(Proposed iteration 8.)*
```

---

MURAL PANEL
```
id:     guero-el-directorio
by:     "don-guero"
title:  {en:"The board with no tabs", es:"El tablero sin fichas"}
said:   {en:"A directory with one pin and no tabs is not a plan of the barrio. It is a plan of me.",
         es:"Un directorio con un alfiler y ninguna ficha no es un plano del barrio. Es un plano de m\u00ED."}
state:  {en:"I hold that the plan needs no new mark \u2014 the street already has two \u2014 and that until it draws Calle Dos it is the directory of one street wearing the name of a barrio.",
         es:"Sostengo que el plano no necesita marca nueva \u2014 la calle ya tiene dos \u2014 y que mientras no dibuje Calle Dos es el directorio de una sola calle con nombre de barrio."}
who:    {en:"Don G\u00FCero, who was sent to make the map dynamic and went to read it first",
         es:"Don G\u00FCero, a quien mandaron a hacer din\u00E1mico el plano y primero fue a leerlo"}
cap:    {en:"He counted what the board actually carries: the tiles of one street, eleven labels \u2014 seven of which already change as the city grows \u2014 a legend that promises doors in gold, and one purple pin that says where he is standing. Nothing on it is about anybody else. Then he counted what it leaves out: two shops, eleven neighbours and sixteen of the city's fifty-six questions live behind an arrow at the right-hand edge, on a street the board has never drawn, and the notary's own door is painted the colour of the pavement because its glyph is in neither colour table. The marks it needs are already hanging in the street \u2014 the exclamation and the little cream card. Nobody has to invent one.",
         es:"Cont\u00F3 lo que el tablero carga de verdad: las losas de una sola calle, once letreros \u2014 siete de ellos ya cambian conforme crece la ciudad \u2014 una leyenda que promete puertas en dorado, y un alfiler morado que dice d\u00F3nde est\u00E1 parado \u00E9l. Nada en \u00E9l habla de nadie m\u00E1s. Luego cont\u00F3 lo que deja fuera: dos changarros, once vecinos y diecis\u00E9is de las cincuenta y seis preguntas de la ciudad viven detr\u00E1s de una flecha en la orilla derecha, en una calle que el tablero nunca ha dibujado, y la puerta del notario est\u00E1 pintada del color de la banqueta porque su glifo no est\u00E1 en ninguna de las dos tablas. Las marcas que le faltan ya cuelgan en la calle: el signo y la tarjetita de papel. Nadie tiene que inventar ninguna."}
aspect: 0.46
art:    (g,W,H)=>{
  /* MY HAND THIS TIME IS NOT PAPER. A cross-section and an elevation have been on this wall;
     this is a MUNICIPAL DIRECTORY BOARD \u2014 vitreous enamel on steel in a brass frame, bolted to
     two posts at the corner. Its palette is mine, not MURPAL's: council green, brass, enamel
     white, one red pin. MURPAL is used only for the ground the wall demands and for a shirt. */
  murGround(g,W,H);
  const GR="#1E3A2E",GR2="#16281F",BR="#C9A227",BR2="#8A6E19",EN="#EFEAD8",RD="#C1362B",ST="#767B78";
  const gy=H*0.84;                                        /* the pavement the board stands on */
  g.fillStyle="rgba(0,0,0,.10)";g.fillRect(0,gy,W,H*0.03);
  /* ---- the two posts ---- */
  const bx=W*0.06,by=H*0.09,bw=W*0.54,bh=H*0.62;
  g.fillStyle=ST;g.fillRect(bx+bw*0.16,by+bh,W*0.020,gy-(by+bh));
  g.fillStyle=ST;g.fillRect(bx+bw*0.76,by+bh,W*0.020,gy-(by+bh));
  /* ---- the board: brass frame, enamel field ---- */
  g.fillStyle="rgba(0,0,0,.22)";g.fillRect(bx+5,by+6,bw,bh);
  g.fillStyle=BR;g.fillRect(bx,by,bw,bh);
  g.fillStyle=BR2;g.fillRect(bx+3,by+3,bw-6,bh-6);
  g.fillStyle=GR;g.fillRect(bx+6,by+6,bw-12,bh-12);
  g.fillStyle=GR2;g.fillRect(bx+6,by+bh*0.52,bw-12,bh*0.46-6);   /* the lower half, darker enamel */
  g.globalAlpha=.10;g.fillStyle="#FFFFFF";                        /* one band of glare on the enamel */
  g.beginPath();g.moveTo(bx+6,by+bh*0.30);g.lineTo(bx+bw-6,by+bh*0.10);
  g.lineTo(bx+bw-6,by+bh*0.22);g.lineTo(bx+6,by+bh*0.42);g.closePath();g.fill();g.globalAlpha=1;
  /* ---- engraved header ---- */
  g.fillStyle=EN;g.font="bold 11px ui-monospace,monospace";
  g.fillText("DIRECTORIO",bx+13,by+21);
  g.fillStyle=BR;g.fillRect(bx+13,by+26,bw-26,2);
  /* ---- the plan itself, a cream inlay: one street and nothing else ---- */
  const px=bx+13,py=by+33,pw=bw-26,ph=bh*0.30;
  g.fillStyle="#D9D2BE";g.fillRect(px,py,pw,ph);
  g.fillStyle="#5C4A50";g.fillRect(px,py,pw,ph*0.30);             /* the north rank */
  g.fillStyle="#4A4B52";g.fillRect(px,py+ph*0.44,pw,ph*0.18);     /* the carriageway */
  g.fillStyle="#5C4A50";g.fillRect(px,py+ph*0.80,pw,ph*0.20);     /* the south rank */
  [0.07,0.21,0.39,0.57,0.71,0.87].forEach(f=>{                    /* six doors, in brass */
    g.fillStyle=BR;g.fillRect(px+pw*f,py+ph*0.22,pw*0.032,ph*0.10);});
  g.fillStyle="#7A3FE0";g.beginPath();g.arc(px+pw*0.39,py+ph*0.70,4.5,0,7);g.fill();
  g.strokeStyle=EN;g.lineWidth=1.5;g.stroke();                    /* the pin: the one live thing */
  g.fillStyle=BR;g.font="bold 10px ui-monospace,monospace";
  g.fillText("\u25C9 USTED",px+pw*0.39+7,py+ph*0.72+3);
  /* ---- the rail of hooks, and every one of them empty ---- */
  const ry=by+bh-H*0.155;
  g.fillStyle=EN;g.font="bold 10px ui-monospace,monospace";g.fillText("AVISOS",bx+13,ry-7);
  g.fillStyle=BR;g.fillRect(bx+13,ry,bw-26,2);
  for(let i=0;i<8;i++){const hx=bx+22+i*((bw-52)/7);
    g.strokeStyle=BR;g.lineWidth=2;g.beginPath();
    g.moveTo(hx,ry+2);g.lineTo(hx,ry+7);g.arc(hx+2.6,ry+7,2.6,Math.PI,0,true);g.stroke();}
  g.fillStyle=EN;g.font="bold 10px ui-monospace,monospace";
  g.fillText("6 PUERTAS \u00B7 0 AVISOS",bx+13,by+bh-9);
  /* ---- the one tab that exists, lying on the pavement under the empty hooks ---- */
  g.save();g.translate(bx+bw*0.40,gy-3);g.rotate(-0.22);
  g.fillStyle="rgba(0,0,0,.18)";g.fillRect(-10,1,22,11);
  g.fillStyle=EN;g.fillRect(-11,-1,22,11);
  g.fillStyle=RD;g.fillRect(-2,1,3,5);g.fillRect(-2,7.5,3,2);      /* the \u2757, face down in the dust */
  g.restore();
  /* ---- the loose plate: the wing of the board that was never made ---- */
  g.save();g.translate(W*0.655,H*0.165);g.rotate(0.13);
  g.fillStyle="rgba(0,0,0,.20)";g.fillRect(3,4,W*0.30,H*0.115);
  g.fillStyle=BR;g.fillRect(0,0,W*0.30,H*0.115);
  g.fillStyle=BR2;g.fillRect(2,2,W*0.30-4,H*0.115-4);
  g.fillStyle=GR2;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CALLE DOS \u2192",8,H*0.078);
  g.fillStyle="#3A3A40";g.beginPath();g.arc(6,6,2.4,0,7);g.fill(); /* the one screw still holding */
  g.restore();
  /* ---- and the two shops that stand outside the frame, wearing the mark the board never shows ---- */
  [[0.680,"PANADER\u00CDA"],[0.845,"LIMPIEZA"]].forEach(([f,nm],i)=>{
    const sx=W*f,sw=W*0.125,sh=H*0.26,sy=gy-sh;
    g.strokeStyle=BR;g.lineWidth=2;g.setLineDash([5,4]);
    g.strokeRect(sx+0.5,sy+0.5,sw,sh);g.setLineDash([]);
    g.fillStyle="rgba(201,162,39,.12)";g.fillRect(sx,sy,sw,sh);
    g.fillStyle=BR;g.fillRect(sx+sw*0.38,sy+sh*0.52,sw*0.24,sh*0.48);   /* its door, in gold, as promised */
    g.fillStyle=RD;                                                      /* the \u2757 it really wears */
    g.fillRect(sx+sw*0.47,sy-H*0.075,4,H*0.048);g.fillRect(sx+sw*0.47,sy-H*0.020,4,3.5);
    g.fillStyle=MURPAL.ink;g.font="bold 10px ui-monospace,monospace";
    g.textAlign="center";g.fillText(nm,sx+sw/2,gy+H*0.045);g.textAlign="left";});
  /* ---- him, between the board and the two shops, reading the one that has less on it ---- */
  murBody(g,W*0.615,gy-14,MURPAL.gold,14);
}
```

---

# lupe

All five suites run. Deliverable below.

PRE-FLIGHT — I read the post-mortem, `docs/REGRESSION.md` §3 and my own flight notes first, then ran the five suites, then built the process doc *backwards from a measurement* — I photographed and measured the existing mock page at every row of the matrix before writing a single line of checklist, so every item on the list is one I watched fail. My persona equips me for exactly the load-bearing question here, which is that a mock-up is a *picture* and a picture is the easiest thing in this repository to be accurate about and wrong with (E10, §13 "3 and 9, extended"). Where I expect to fall short, named in advance: seven of the eight signature lines on this checklist are other people's trades — I can tell you a control is 44×48 px and above the fold, and I cannot tell you whether it *means* "keep it"; §13j says that sentence is a blocking handoff, so the art, story and words rows below are written as questions for their owners, not as judgements I have made.

---

# THE DELIVERABLE — THE UI REVIEW PROCESS

**Mock order used for the worked example: real game screenshot AND real game measured.** The mock documents are opened in the shipped reader inside the running game (`docs/mocks/2026-09-14-la-sobremesa/render.js:13-18`), so I re-drove that same path with my own probe and read boxes off the live DOM. No canvas drawing was used for the worked example. (The mural panel at the end is a canvas drawing and says so.)

## 0 · Why this exists, in one sentence

A mock-up is the cheapest thing on this project to be **accurate about and wrong with**, because the picture and the screen are different objects and nothing in the picture says which one you are looking at. That is `docs/POSTMORTEM.md` §13 *"3 and 9, extended"* wearing a different hat: there a canvas drew in an empty room; here a picture is taken of a document with its scroll box switched off.

---

## 1 · THE ADMISSION TICKET — what a mock must carry to be reviewable

**A mock without all six is refused at the door, unreviewed.** Not failed — *refused*, which costs the maker ten minutes and costs the eight reviewers nothing. Every one of these exists because the current mock page is missing it.

| # | It must carry | Why — the failure it prevents |
|---|---|---|
| **A1** | **The row of the matrix it was drawn at**, by name, not by a number somebody typed. `390×844`, not "360". If it is not one of the five rows, it is not a size, it is a preference | The current page's `m4-…-560-…` was rendered at a **640-wide window** with a **620-wide sheet** (`render.js:44`; measured 1240 device px ÷ dsf 2). Three numbers, none of them equal |
| **A2** | **Whether the screen's own scroll/clip was left ON.** One word: `unmodified` or `unrolled` — and an `unrolled` picture may illustrate, never decide | `render.js:24-26` sets `height:auto; maxHeight:none; overflow:visible` on the reader before every shot. Every picture on the page is `unrolled` and none of them says so |
| **A3** | **The fold line drawn on the picture**, if the thing is taller than its box, plus the two numbers: document height and visible height | Without it a reviewer signs off a screen having seen 100% of a thing a person sees 54% of |
| **A4** | **What is real and what is drawn.** Per element: shipped / faked / not-yet-a-thing. A fake that looks shipped is the most expensive line in a review | Beto and Yaz cannot answer "is it buildable" about a picture that will not say which half already is |
| **A5** | **The before**, when the screen replaces one. Same row, same language, same shell, same word on A2 | `docs/POSTMORTEM.md` §5: when you diff two pictures, change one thing |
| **A6** | **EN and ES, and the shell it lives in** (cream or night). If the owner asked for night — he did, for AJ's questionnaire — a cream picture is not the screen | The current page: **1 of 8 pictures in Spanish, 1 of 8 in night**, and the night one is the recipe, not the thing he asked for in night |

**And one rule about the file name, because it is the field a reviewer trusts without checking:**
`<id>-<screen>-<WxH row>-<lang>-<shell>-<unmodified|unrolled>.png`. A name that disagrees with the picture is a lie a register will repeat for a week.

---

## 2 · WHAT "PASS" MEANS FOR A MOCK

A mock is not code and must not be graded like code. **A mock passes when the picture answers the question it was drawn for, at every size a person will hold it, and a reviewer can say what they would build from it.**

Four verdicts only, and they are not "approved / rejected":

- **ANSWERS** — the picture settles the question. Build from it.
- **ANSWERS, WITH A NOTE** — settled; a named, costed change to make on the way to code. The note is written down, not remembered.
- **DOES NOT ANSWER** — the picture is fine and the question is still open. **This is not a failure of the mock.** Say what extra picture would answer it.
- **REFUSED** — missing an admission ticket field, or drawn at a size nobody holds. Ten minutes, back to the maker.

**Three things a mock review may never do**, each because it has cost this project before:

1. **It may not pass a screen on one picture.** Same rule as the code (`docs/QA-PASS.md`, the rule at the top). A picture from one size is not a result.
2. **It may not grade the drawing's quality** — that is Pili's signature line, and only hers.
3. **It may not become a test.** A mock is a proposal. Pinning it as an assertion is `docs/QA-PASS.md` E2 in advance: a bodyguard for a decision nobody has taken.

---

## 3 · THE CHECKLIST — eight signature lines

**A signature line is a sentence that can be FALSE.** "Reviewed by Rosa" is a ritual. "Every control on this screen can be pressed at 844×390 without scrolling" is a signature. If you cannot imagine the sentence being false, it is not a signature and it goes back.

**Run order matters: QA (row 6) runs FIRST**, because the other seven are reviewing pictures and my job is to say whether the pictures are of anything. Then art, story, words, UI, engineers, play, ledger.

| # | Role | Who | The line they sign | What makes it FALSE |
|---|---|---|---|---|
| **6** | **QA — runs first** | **Lupe** | *"Every picture in this review carries its admission ticket, was taken with the screen's own clip ON, and exists at all five rows of the matrix in both orientations; where a screen is taller than its box I have drawn the fold and stated the two numbers."* | any picture `unrolled` and not labelled; any row missing; any size in a filename that is not the size in the picture |
| 1 | **Engineers** | Beto, Yaz | *"Every element on every screen is either shipped today — named with `file:line` — or listed as new work with a cost; nothing in these pictures is a capability the engine does not have and nobody has priced."* | one element nobody can point at, in either column |
| 2 | **Art** | Pili | *"Each screen reads at 360 CSS px wide as the one thing it is, and no mark carrying meaning survives only because I already knew what it meant."* | a mark she has to explain; a meaning carried by a fill instead of a silhouette (§13j) |
| 3 | **Story** | Nacho | *"Each screen says ONE thing a person reads without being told, and I can write that thing in one sentence under the picture."* | two sentences needed; or the sentence is about the feature, not about the person |
| 4 | **Words** | Paty | *"Every string exists in EN and ES, both fit at the narrowest row without sideways scroll or truncation, and no label is a bare glyph."* | ES overflow; `scrollWidth > clientWidth`; a button whose label is `✕` alone |
| 5 | **UI** | Rosa | *"Every control is reachable, ≥44×44 px, has a visible pressed/disabled/empty state, and no screen is a dead end: from each one I can name the way back."* | a control below the fold with no affordance saying so; a screen with no exit |
| 7 | **Play** | Chava | *"I opened this cold, in order, at phone size, and I can say what I thought it wanted from me — and here is where I was wrong."* | he cannot say; or he was wrong and nobody wrote it down |
| 8 | **Ledger** | Remedios | *"Every finding above is in the ticket shape — `In plain words:` · `Notes:` · `Questions to consider:` · `Areas affected:` · `Done when:` — and each names a screen, a row and a verdict."* | a finding that lives only in the review text |

**The genre line, signed by whoever holds the pen, on every screen without exception:**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."* (`docs/GENRE-RULES.md` R10, R11, R15; the owner: *"no timer, we chill"*.)

It is here rather than in a role's row because it is the one rule the owner stated twice, and a rule with no signature line is a rule nobody runs.

---

## 4 · WHERE THE FINDINGS GO — recommendation

**Recommend: a new `docs/UI-REVIEW.md`. Do NOT put mock findings in `docs/QA-PASS.md`.**

Three reasons, and the first is the only one that matters:

1. **`docs/QA-PASS.md`'s own preamble says the list grows from real escapes and from nothing else** (`docs/QA-PASS.md:6-7`). A mock finding is not an escape — nothing reached the owner. Filing one there dilutes the single register in this repository where every row was paid for, and a diluted escape register becomes the ritual its own preamble warns about.
2. **Seven of the eight signatories are not QA.** QA-PASS is "Lupe's list" by its title line; a wall Pili and Nacho sign needs a page that is nobody's.
3. It keeps the two questions apart: *what escaped* (QA-PASS) and *what we decided from a picture* (UI-REVIEW).

**The shape of `docs/UI-REVIEW.md`:** §1 the admission ticket · §2 what pass means · §3 the eight signature lines · §4 the red tests a mock inherits · §5 **the review ledger** — one block per review, per screen: the screen, the row, the verdict, the eight signatures with the date, and every finding in the ticket shape.

**Two cross-links, and nothing else moves:** a row in `docs/OPEN.md` §3's register table; one line under `docs/QA-PASS.md`'s matrix reading *"Mock-ups are reviewed under `docs/UI-REVIEW.md`; only what reaches the owner is written here."*

**The one thing that DOES belong in QA-PASS today** — filed on E4/E8/E10 precedent (near-misses that changed the list):

> **E13 · The review pictures were photographs of a document with its scroll box switched off — 2026-09-14 (mine, caught before the review, not an escape)**
> `docs/mocks/2026-09-14-la-sobremesa/render.js:24-26` sets `height:auto; maxHeight:none; overflow:visible` on the reader so the whole document fits one picture. Every picture on the review page is therefore a true photograph of a thing no screen shows. **Which row would have caught it: none — it would have passed at all five**, exactly like E10. **What the list is now:** step 0 gains a second clause — *prove you are in the game, AND prove the screen is still the shape the game gives it.* **The general lesson:** E10 was a canvas drawing in an empty room; this is a document photographed with the room's walls taken down.

---

## 5 · THE RED TESTS A MOCK INHERITS WHEN IT BECOMES CODE

Written now, at mock time, so the builder inherits them with the picture. **Each names the plant that must go red first** — a test that has never been red proves nothing (`docs/QA-PASS.md` step 1).

| # | The assertion | Plant it red by | Status today |
|---|---|---|---|
| **M1 · the fold** | The screen's primary action is reachable at 844×390 without a scroll the person must discover | shrink the scroll box to 207 px and assert the action is hit-testable | **RED ON THE SHIPPED READER.** At 844×390 the week strip's only button, *Copy the shopping list*, is below the fold |
| **M2 · the end-of-document lie** | A document taller than its box shows an affordance saying so, above the bar | load a doc 2× the box and assert the affordance exists | **RED.** The only mark between the last visible line and the bar is a dashed rule that reads as the end |
| **M3 · target size** | Every control ≥44×44 CSS px at 390×844 and 844×390 | shrink one control's padding by 4 px | green today (44–48 px measured everywhere) |
| **M4 · input zoom** | Every `input`/`textarea`/`select` in the reader has `font-size ≥ 16px` | set one to 15 px | **RED.** The reader's fields are `.85rem` = **13.6 px** (`index.html:191`, measured). On iOS Safari a focused field below 16 px zooms the page — `[TRAINING]`, not verified on a device |
| **M5 · both languages** | Every screen renders EN and ES with `scrollWidth ≤ clientWidth` | plant a 40-char ES label | unmeasured per row; ES exists for 1 of 8 screens |
| **M6 · both shells** | Every screen renders in cream and in night | render night only | green for the recipe; 1 of 8 screens has a night picture |
| **M7 · fullscreen is on at the shot** | `vp.classList.contains('fs')` is asserted **at the moment the picture is taken** | take the shot with the class added *before* opening the screen | see §6.4 — the obvious recipe silently produces a non-fullscreen picture |
| **M8 · no clock** | No screen's strings contain a countdown, a timer or a day budget | plant `"2:00 left"` | not written. `docs/GENRE-RULES.md` R10/R15 has no guard |

---

## 6 · THE WORKED EXAMPLE — my own checklist applied to `docs/mocks/2026-09-14-la-sobremesa/`

**Suites, before anything.** `node test/smoke.js` **green on six runs** (E11: a single run of it prints green 96% of the time against a 1-in-25 fault, so one run is not a number). `node test/town.smoke.js`, `node test/engine.smoke.js --index index.html`, `node test/engine.smoke.js --index changarrito/index.html`, `node test/gauge.js` — **green on one run each.** Tree clean; everything I wrote is in the scratchpad with my name on it.

**Step 0, and it is the whole finding.** Before a number, one picture. Here are two, of the same document, at the same size:

- `docs/mocks/2026-09-14-la-sobremesa/m3-recipe-360-en.png` — the committed review picture. **680 × 2888 device px = 340 × 1444 CSS.**
- `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/lupe-meridian-phone-portrait-recipe.png` — the same document, same game, same reader, at the owner's phone with **nothing overridden.**

### 6.1 · The admission ticket — REFUSED, on four of six

| | Verdict |
|---|---|
| **A1 size** | **FAIL.** Six pictures were rendered in a **360**-wide window (sheet 340). The owner's phone is 390 (sheet 370). `m4-recipe-560-en.png` was rendered at **640** (`render.js:44`) and its sheet is **620**. **No picture on this page was taken at any row of the matrix.** `.paper{max-width:640px}` (`index.html:143`) — the sheet is never 560 at any window width |
| **A2 clip on/off** | **FAIL, and this is the headline.** `render.js:24-26` turns off `maxHeight`, `overflow` and `flex` on `#reader`, `#paperSheet` and `#paperScroll` before every shot. Eight pictures, all `unrolled`, none labelled |
| **A3 fold** | **FAIL.** No picture carries a fold line or the two numbers |
| **A4 real vs drawn** | **PARTIAL.** The reader is genuinely the shipped one and the block types are real — that is real craft and it should be said in the picture, not inferred from `render.js` |
| **A5 before** | **N/A.** These replace nothing |
| **A6 EN/ES, cream/night** | **FAIL.** 7 EN / 1 ES; 7 cream / 1 night — and the night picture is the recipe, while the thing the owner asked for in night mode is the questionnaire |

### 6.2 · The size matrix, measured (five rows, both shells, real game measured)

Meridian, the recipe. `sheet` = the paper's box; `scroll box` = the part a person can see at once.

| Row | Window | Sheet | Scroll box | Document | **Screens of paper** |
|---|---|---|---|---|---|
| Phone portrait | 390×844 | 370×802 | 322×**661** | 1227 px | **1.86** |
| **Phone landscape** | 844×390 | 640×348 | 592×**207** | 1191 px | **5.75** |
| Small window | 480×900 | 460×858 | 412×717 | 1175 px | 1.64 |
| Desktop | 1280×800 | 640×758 | 592×617 | 1191 px | 1.93 |
| Fullscreen | 1366×768 | 640×726 | 592×585 | 1191 px | 2.04 |

The town's night reader is **identical at every row** (370×802 / 322×661 / 1227 at phone portrait) — one engine, and the geometry is the engine's.

### 6.3 · The fails, in plain words

**FAIL 1 — the picture shows a recipe; a phone shows half of one.** On the owner's actual phone the card stops mid-sentence at *"…boil with the onion and the"*, and the three buttons under it are **Copy, Download and Close**. *Keep it* — the button the screen exists for — is 1227 px down and is below the fold at **every row of the matrix**, including desktop and fullscreen. The committed picture shows 100% of the document. The phone shows **54%**.

**FAIL 2 — a phone held sideways shows three ingredients and a full stop.** At 844×390 the reader gives you a 207-px-tall window onto 1191 px of paper. You see the title, the note, *What you need*, and **Frijol negro, Agua, Cebolla** — then a dashed rule and Copy / Download / Close. **The dashed rule above the bar is the same mark the reader uses to end a document.** A person closes it believing the recipe has three ingredients. *(Picture: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/lupe-meridian-phone-landscape-recipe.png`.)* This is `docs/QA-PASS.md` E12's row, and it is the row nothing in this repository can run.

**FAIL 3 — the week strip's only button is unreachable sideways.** At 844×390, *Copy the shopping list* sits below the fold; the three bar buttons are the only ones on screen.

**FAIL 4 — the reader's fields will zoom the page on iPhone.** Measured `13.6 px` on the recipe's textarea (`.paper .dfl input,…{font-size:.85rem}`, `index.html:191`; root 16 px). `[TRAINING]`: iOS Safari zooms a focused field below 16 px, which on a `position:fixed` overlay moves the whole screen under the person's thumb. **Not verified on a device** — flagged, not asserted. **This matters more than anything else on this page**, because the next thing to be drawn is a questionnaire that is nothing but fields.

### 6.4 · Two findings from checking, not from reading — recorded, not asked

**The fullscreen row for a document is fine, and the obvious way to test it is not.** The reader is `position:fixed; z-index:60` over the fullscreen viewport at `z-index:50`; at 1366×768, 390×844 and 844×390 the paper is on top (`elementFromPoint` over the sheet returns `docTitle` at all three). **But** `exitFsForCard()` (`engine/engine.js:3753-3756`) *removes* the `fs` class when a card or document opens and `restoreFs()` puts it back on close — measured: `add fs → fixed 1366×768`, `docOpen → relative 534×427`, `Close → fixed 1366×768`. So the natural headless recipe — set fullscreen, then open the screen you want — **silently photographs a non-fullscreen window**. My own first probe did exactly this and reported `z-index: auto`. **The recipe is: open the screen first, add `.fs` second, and assert `vp.classList.contains('fs')` in the same expression that takes the shot** — which is M7, and which is `docs/REGRESSION.md` §3's shape one more time: *"I set fullscreen"* is a proxy for *"it was fullscreen when the shutter opened."*

**The 3D buffer matches the element in fullscreen today.** `cv3` at a 1366×768 window with `.fs`: CSS box 1366×768, backing buffer 1366×768, aspect 1.779 both sides. E1's fault is not present at this size on this tree.

### 6.5 · Verdict on the existing review page

**REFUSED, not failed** — and the distinction is the point. The documents themselves are good work in the shipped reader, the block vocabulary is real, and the recipe card is the right object. What cannot be signed is the **evidence**: eight pictures, none at a matrix row, all taken with the screen's walls down, one language, one shell. Re-shoot with `render.js`'s three override lines removed, at 390×844 / 844×390 / 480×900 / 1280×800 / fullscreen, EN and ES, cream and night, and the same eight screens become reviewable in under an hour.

---

## QUESTIONS FOR THE OWNER

**Q1 · Does the recipe card need to be *usable* on a phone, or is it a thing you read on the laptop and act on in the kitchen?**
- One side: your own device is a phone (`docs/QA-PASS.md` matrix, row 1, your words 2026-09-09), and on it this card is 1.86 screens with its action button off the bottom — that says fix the screen.
- The other side: you said *"2. probably my laptop"* for where the household's sync lives, and a recipe is a thing you stand over a pot with, which may mean the laptop is the real surface and the phone card only ever needs to be *readable*.
- What changes: whether *Keep it* has to be pinned to the bar (an engine change to the reader, both games) or whether the card just needs a "there's more below" mark (art only).

**Q2 · AJ's questionnaire is night mode, phone, and mostly fields. Do we raise the reader's field text to 16 px for BOTH games, or give the questionnaire its own page?**
- One side: `engine/` is shared and every engine change must be behaviour-identical for Meridian's players (`CLAUDE.md`). 13.6 → 16 px reflows every form in Meridian — the care pack, the room interview, the taller's document.
- The other side: leaving it means that on an iPhone, every time AJ taps a box, the page zooms and the screen jumps under her thumb — on the one artefact whose whole purpose is that she fills it in without friction.
- I am not asking you to pick the implementation. I am asking whether *"AJ's questionnaire must not fight an iPhone"* outranks *"Meridian's forms do not reflow."*

---

## WHAT I DID NOT CHECK

- **I did not verify the iOS input-zoom behaviour on a device.** The 13.6 px is measured; the consequence is `[TRAINING]` and the egress proxy blocks the spec pages. Somebody with an iPhone settles it in ten seconds.
- **I did not measure ES at any matrix row.** My probe ran EN only; the ES claim ("shorter than EN for this document") is read off the committed PNG's height (2802 vs 2888 device px) and is a fact about an *unrolled* picture, i.e. exactly the thing I spent this report warning about. It is a hint, not a measurement.
- **I did not measure contrast, colour or the read at 360.** Rosa's and Pili's rows are written as questions for them, not answered.
- **I did not run the town's night reader at small-window, desktop or fullscreen** — only phone portrait, phone landscape and desktop. The three I ran were byte-identical to Meridian's geometry, which is why I stopped; that is an inference, not five rows.
- **I did not chase `cv` (the 2D canvas) being `display:none` with a 320×256 buffer while `cv3` is live.** Noticed in passing at 1366×768. It may be entirely correct. Nobody asked me and I did not look.
- **I did not review the questionnaire.** It does not exist yet; §3 and §5 are written so that it can be reviewed the hour it does.
- **I did not test M1–M8 as code.** They are assertions with plants named, not tests. By this repository's own rule (`docs/REGRESSION.md` §3, and §13a) **an unexecuted remedy is the most persuasive kind of wrong** — M1, M2 and M4 are marked RED from *measurement of the shipped reader*, not from a fired guard, and anyone building them must watch them go red first.
- **The suites: smoke green on six runs; the other four green on one run each.**

---

## POST-FLIGHT

What my persona got right: the moment was refusing to write the checklist first — I photographed the recipe at 390×844 before writing a single line, and the picture showed a sentence cut in half at *"with the onion and the"*, which is the entire deliverable in one frame; a list written from the mock page's own numbers would have been a list about 1444 px of paper that no screen has ever shown. Where it got in the way: my persona's instinct is to grade, and seven of these eight rows are trades I cannot grade — I caught myself drafting art and story rows as *verdicts* and had to rewrite them as sentences their owners sign, which is slower and is the only honest form. The gap I predicted did appear, exactly there, and it appeared a second way I had not predicted: my own first fullscreen probe reported `z-index: auto` and I nearly wrote it up as "the reader does not overlay in fullscreen" — the truth was `exitFsForCard()` doing its job and my shot reading a proxy for the state at shutter time, which is §3 of the regression register catching me inside the report about catching people. My edit to my own file is below.

**Persona edit I propose, as exact text.** In `.claude/agents/lupe.md`, at the anchor `**4 · Look at a screenshot FIRST, then at the end.**`, append to the end of that bullet:

> **And when the thing you are measuring is a PICTURE, ask what was switched off to take it.** On 2026-09-14 every mock-up on the review page was a true photograph of a document with its scroll box, its max-height and its overflow disabled to make it fit one frame — 1444 px of paper, of which the owner's phone shows 661 and a phone held sideways shows 207. **A canvas draws in an empty room; a document poses for its photograph.** Before the first number: the element is on a screen, *and* it is still the shape the game gives it.

---

MURAL PANEL

```
id:     lupe-la-desenrollaron
by:     "lupe"
title:  {en:"Unrolled for the photograph", es:"La desenrollaron para la foto"}
said:   {en:"They unrolled the picture. Nobody unrolled the phone.",
         es:"Desenrollaron la foto. El teléfono nadie lo desenrolló."}
state:  {en:"reviewing pictures now, and a picture is a claim",
         es:"ahora reviso fotos, y una foto es una afirmación"}
who:    {en:"Lupe, who measures what a screen shows, not what a file contains",
         es:"Lupe, que mide lo que muestra la pantalla, no lo que contiene el archivo"}
cap:    {en:"The mock renderer opens the real reader, in the real game, and then switches off the box the paper scrolls in so the whole recipe fits one frame. The photograph is 1444 px of paper. Standing up, his phone shows 661 of them. Turned sideways it shows 207 — three ingredients out of six, and then a dashed rule that looks exactly like the end of the document. Every number in that picture was true and not one of them was about a screen.",
         es:"El renderizador de bocetos abre el lector de verdad, en el juego de verdad, y luego apaga la caja por la que se desplaza el papel para que quepa toda la receta en un cuadro. La foto trae 1444 px de papel. De pie, su teléfono muestra 661. De lado muestra 207 — tres ingredientes de seis, y luego una línea punteada que parece exactamente el final del documento. Cada número de esa foto era cierto y ninguno hablaba de una pantalla."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND, THIRD VISIT. Not paper: a LIGHT BOX under a matte black mask card. The review
       picture is a transparency of the whole document; the two apertures cut in the card are the two
       screens a person actually has. Cool light, warm paper, one grease-pencil mark on the glass.
       Everything is sized against the 11px lettering, which is the ruler on this wall. */
    const CARD="#171C21", EDGE="#2A333B", GLOW="#F4F9FC", DIM="#232B32",
          PAPER="#EFE3CC", INK="#2A2620", MUTE="#8D826C", CYAN="#7FC6D8", WAX="#F05A4A";
    murPaper(g,W,H,CARD,null);
    g.fillStyle=EDGE;g.fillRect(0,0,W,2);

    /* the transparency: one long document, laid on the box and running off the bottom of the card */
    const sx=W*0.085, sw=W*0.225, sy=H*0.170, sh=H*0.900;
    const strip=(bright)=>{
      const bg=bright?PAPER:DIM, ink=bright?INK:"#39434B", mut=bright?MUTE:"#39434B";
      g.fillStyle=bg;g.fillRect(sx,sy,sw,sh);
      let y=sy+H*0.055;
      g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.62,4);                 /* the title */
      y+=H*0.050; g.fillStyle=bright?"#E2D5B8":DIM;g.fillRect(sx+sw*0.08,y,sw*0.84,H*0.080);
      g.fillStyle=bright?"#C2A15A":"#39434B";g.fillRect(sx+sw*0.08,y,2,H*0.080);
      g.fillStyle=mut;for(let i=0;i<3;i++)g.fillRect(sx+sw*0.15,y+5+i*6,sw*(0.66-i*0.13),2);
      y+=H*0.105; g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.40,3);
      y+=H*0.026; g.fillStyle=mut;g.fillRect(sx+sw*0.10,y,sw*0.80,1);
      y+=H*0.020;
      for(let i=0;i<6;i++){                                               /* six ingredients */
        g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.26,2.5);
        g.fillStyle=mut;g.fillRect(sx+sw*0.42,y,sw*(0.46-(i%3)*0.09),2.5);
        y+=H*0.034;}
      g.fillStyle=bright?"#D9CBA8":DIM;g.fillRect(sx+sw*0.10,y+4,sw*0.80,H*0.105);
      y+=H*0.135;
      for(let i=0;i<9;i++){g.fillStyle=mut;g.fillRect(sx+sw*0.10,y,sw*(0.80-(i%4)*0.14),2);y+=H*0.024;}
    };
    strip(false);

    /* APERTURE 1 — the phone stood up: 661 px of a 1227 px document */
    const a1x=sx-W*0.018, a1w=sw+W*0.036, a1y=H*0.225, a1h=H*0.520;
    g.save();g.beginPath();g.rect(a1x,a1y,a1w,a1h);g.clip();
    g.fillStyle=GLOW;g.fillRect(a1x,a1y,a1w,a1h);
    strip(true); g.restore();
    g.strokeStyle="#9BB4C2";g.lineWidth=1.5;g.strokeRect(a1x+0.5,a1y+0.5,a1w,a1h);

    /* APERTURE 2 — the same phone turned sideways: 207 px of the same document */
    const a2x=W*0.400, a2w=W*0.455, a2y=H*0.150, a2h=H*0.300;
    g.save();g.beginPath();g.rect(a2x,a2y,a2w,a2h);g.clip();
    g.fillStyle=PAPER;g.fillRect(a2x,a2y,a2w,a2h);
    let ly=a2y+H*0.045;
    g.fillStyle=INK;g.fillRect(a2x+W*0.026,ly,a2w*0.42,4);
    ly+=H*0.045;
    for(let i=0;i<3;i++){                                                 /* three, and then nothing */
      g.fillStyle=INK;g.fillRect(a2x+W*0.026,ly,a2w*0.20,2.5);
      g.fillStyle=MUTE;g.fillRect(a2x+W*0.026+a2w*0.26,ly,a2w*(0.34-i*0.07),2.5);ly+=H*0.032;}
    ly+=H*0.008;
    g.strokeStyle=MUTE;g.lineWidth=1;g.setLineDash([3,3]);                /* reads exactly like an end */
    g.beginPath();g.moveTo(a2x+W*0.022,ly);g.lineTo(a2x+a2w-W*0.022,ly);g.stroke();g.setLineDash([]);
    ly+=H*0.022;
    const bw=(a2w-W*0.044)/3;
    for(let i=0;i<3;i++){const bx=a2x+W*0.022+i*bw;
      g.fillStyle="#E6DCC5";g.fillRect(bx+2,ly,bw-5,H*0.055);
      g.strokeStyle="#CBBEA0";g.lineWidth=1;g.strokeRect(bx+2.5,ly+0.5,bw-6,H*0.055);
      g.fillStyle=MUTE;g.fillRect(bx+9,ly+H*0.024,bw*0.44,2);}
    g.restore();
    g.strokeStyle="#9BB4C2";g.lineWidth=1.5;g.strokeRect(a2x+0.5,a2y+0.5,a2w,a2h);

    /* the grease pencil on the glass — the one mark a tester makes with her own hand */
    g.strokeStyle=WAX;g.lineWidth=2.4;g.globalAlpha=.92;
    g.beginPath();g.ellipse(a2x+a2w*0.50,a2y+a2h*0.68,a2w*0.42,a2h*0.20,-0.03,0,7);g.stroke();
    g.beginPath();g.moveTo(a2x+a2w*0.52,a2y+a2h*0.90);g.lineTo(a2x+a2w*0.42,a2y+a2h*1.22);g.stroke();
    g.globalAlpha=1;
    g.fillStyle=WAX;g.font="bold 11px ui-monospace,monospace";
    g.fillText("¿FIN?",a2x+a2w*0.30,a2y+a2h*1.33);

    /* the lettering — absolute; every fraction above was chosen against it */
    g.fillStyle="#DCE7EC";g.font="bold 11px ui-monospace,monospace";
    g.fillText("MESA DE LUZ · VERIFICACIÓN",W*0.085,H*0.105);
    const tx=W*0.400;
    g.font="9px ui-monospace,monospace";
    g.fillStyle=CYAN;   g.fillText("LA FOTO   1444 px  100%",tx,H*0.600);
    g.fillStyle=CYAN;   g.fillText("DE PIE     661 px   54%",tx,H*0.675);
    g.fillStyle=WAX;g.font="bold 9px ui-monospace,monospace";
                        g.fillText("DE LADO    207 px   17%",tx,H*0.750);
    g.fillStyle="#9FB6BF";g.font="8px ui-monospace,monospace";
    g.fillText("apagaron la caja de scroll",tx,H*0.845);
    g.fillText("para sacar la foto",tx,H*0.905);
    /* the tester, standing at the box. Three lines of type tall, so she is a person and not a chip */
    const bh=H*0.200; murBody(g,W*0.900,H*0.840-bh,CYAN,bh);  /* feet land at 0.91H: the wall cuts the bottom 6% */
}
```

**Painted and looked at before being handed over**, per my own step 0 — rendered at 520×239 and 360×166 against the real `murals.js` helpers: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/lupe-panel-520.png` and `lupe-panel-360.png`. Three repaints: the title collided with the transparency, the landscape aperture cut its own button row in half, and the figure's feet crossed into the 6% the wall cuts. It is made of a light box and a mask card — my first panel was a carbon-copy bay slip, my second a tractor-feed rolling-road printout; this one is glass, cool light and a grease pencil, and no other bay on the wall has any of the three.

**Files (all absolute):**
- Recommended new register: `/home/user/meridian-quest/docs/UI-REVIEW.md` (§1–§5 above)
- One new escape entry E13 for `/home/user/meridian-quest/docs/QA-PASS.md`
- Reviewed: `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/` (all eight PNGs, `render.js`, `mockdocs.js`)
- Evidence and probes (scratchpad, mine, nothing in the repo): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/lupe-mock-probe.js`, `lupe-fs5.js`, `lupe-panel-art.js`, `lupe-panel-render.js`, and the pictures `lupe-meridian-phone-portrait-recipe.png`, `lupe-meridian-phone-landscape-recipe.png`, `lupe-fs-1366x768-recipe.png`, `lupe-panel-520.png`
- Code cited: `/home/user/meridian-quest/index.html:143` (`.paper{max-width:640px}`), `:191` (`.85rem` fields); `/home/user/meridian-quest/engine/engine.js:3753-3756` (`exitFsForCard` / `restoreFs`); `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/render.js:24-26` and `:44`

---

# remedios

PRE-FLIGHT — I intend to work this as an annex clerk works: read every register that claims to hold the backlog, verify each claim against the code before it becomes a ticket, and file one symptom per ticket rather than one sitting per ticket. My persona equips me for exactly this — I am not impressed by "this is one sitting, file it as one issue", and splitting is the whole job. Where I expect to fall short, named in advance: I file, I do not build, so my cost estimates are relayed from the engineers' registers and not mine, and I will over-file — a clerk's instinct is that every found thing deserves a folio, which is how a ledger becomes a pile.

---

# THE DELIVERABLE

## 0 · What I could not do, first, because it changes how you read everything below

**I have no GitHub tool this run.** The MCP server's instructions are in my context, but my actual function list is `Read`, `Grep`, `Glob` only — no Bash, no `search_issues`, no `list_issues`. **So no ticket below has been deduped against the real ledger.** Everything is deduped against the docs, and every issue number I cite is a *doc citation*, not a read of the issue: `#21 #39 #125 #153 #154 #155 #156 #157 #158 #159 #160 #161` come from `docs/OPEN.md:50-54`, `docs/NEXT-SESSION.md:213-217`, `docs/ARCH-LOG.md:97,131`, `docs/meetings/2026-09-09-el-mandado.md:101`. **The session that files must run `search_issues` on each title before creating it.**

Two corrections to the registers before the tickets, per rule 1 — code wins and I say so out loud:

- **`docs/NEXT-SESSION.md:142` is stale on one half and overstated on the other.** It says *"`docs/BEAUTIFY.md`'s `t3Boxy` quote drops the `TILESIDE` clause"*. `[CODE]` `docs/BEAUTIFY.md:25` reads `… && !!TILESIDE[g]` — the clause is there. What the quote drops is only the `typeof TILESIDE!=="undefined"&&` existence guard (`engine/engine3d.js:259`). And `docs/BEAUTIFY.md:27` already carries *"`engine/engine3d.js:259` (2026-09-14; this line said `:241`)"* — the line number was fixed. **Not a ticket. Recommend striking the row.**
- **`docs/NEXT-SESSION.md:145` still carries the mechanism the post-mortem corrected.** It says *"`auditReach` and `isSolid` both treat a standing person as a wall"*. `docs/POSTMORTEM.md` §7-extended, Melo's correction: *"**They never look at people at all.** Both read only the grid; a person is stamped into the grid."* `[CODE]` confirms the stamp at `engine/engine.js:104` (`w.grid[n.y][n.x]="N"`). **The current state of play names a cause we do not have.** That is the third time by this repo's own count; fix it in the same edit as anything else in that file.

---

## 1 · New tickets — found, not fixed

*Labels use only names the skill lists. `[DOC]` = relayed from a register; `[CODE]` = I opened the file this hour.*

### T1 · A phone held sideways has no controls — you cannot move and you cannot talk
`bug` · `tier: high`

**In plain words:** Turn the phone sideways in either game and the joystick and the Talk button are off the bottom of the screen. Nothing tells you; the world is still there, so it looks like the game has simply stopped responding. The only ways out are to scroll the page, go fullscreen, or turn the phone back — and a person who does not know that will put the game down. Done looks like: on any screen shape, the thing you press to move and the thing you press to talk are on the screen when the game starts.

**Notes:** `[DOC]` Found by Lupe, 2026-09-13, by opening a window — not by any test. The page wrapper holds the play area at about 528 px wide in any window wider than 560; the world's height is its width × 8/10, about 422 px; the controls are anchored to the bottom of the play area rather than the bottom of the window, so in an 844 × 390 window they sit 100–120 px below the fold. Present in **both** games on `main` today. `docs/QA-PASS.md` E12.

**Questions to consider:** Anchor the controls to the window instead of the play area, or make the play area fill a short window? Does landscape get a layout of its own, or is it the portrait layout made to fit?

**Areas affected:** The page shell and the on-screen controls, in both games. The test checklist gains a shape nobody has ever run.

**Done when:** In a short, wide window on a phone, both controls are visible and usable without scrolling, from the first frame, in both games — and a check runs at that shape.

---

### T2 · Nothing in the test suite has ever run either game sideways
`ask` · `tier: normal` · `work: docs & templates`

**In plain words:** The checklist has a row for a phone held sideways and no script can run it, so for four days "tested at both sizes" honestly meant two tall sizes. That row was hiding a fault that makes the game unusable (T1). Done looks like: the shape is in a suite that runs on its own, and every row of the checklist says who runs it — a script or a person.

**Notes:** `[DOC]` `docs/POSTMORTEM.md` §13o. Every viewport in every suite is tall: 480×900, 390×560, 390×844. Lupe's rule — *a row no script can run is a row that gets skipped* — asks for a "who runs it" column in the same table as the row, not in a footnote.

**Questions to consider:** One wide shape added to the existing suites, or a separate pass? Does the checklist grow a "who runs it" column now or when the next unrun row appears?

**Areas affected:** The test suites for both games; the test checklist.

**Done when:** A suite fails if the controls are off-screen in a short wide window, and every checklist row names its runner.

---

### T3 · A neighbour standing in a doorway can wall off a third of a street
`bug` · `tier: high`

**In plain words:** People wander. When one of them stops in the single-tile gap by the barber's, the thirty-five tiles behind it — and the woman with a question at the end of them — become unreachable to the player. There is no way round and nothing says what happened; you simply cannot get there until that person moves. The game's own start-up check notices and the test goes red about one run in twenty-five, and for weeks everybody read that as the tests being moody. Done looks like: a person walking about can never be the only thing between you and a part of the world.

**Notes:** `[CODE]` A person standing anywhere is written into the world grid as a blocking square (`engine/engine.js:104`), and both the thing that decides what stops you and the start-up reachability check read only that grid — **they never look at people at all** (`docs/POSTMORTEM.md` §7-extended corrects the earlier account, which `docs/NEXT-SESSION.md:145` still repeats). The wander step asks about solidity, doors and tram danger and never asks whether the step it is about to take cuts the map in two. Two fixes exist: widen the gap in the map, or make the wander step ask the reachability check first. Nobody has chosen. Repro: occupy `(19,1)` in the market world.

**Questions to consider:** Widen the map (cheap, local, hides the class) or teach the wander step to ask (general, and re-audits every step — is that affordable)? Should the start-up check also re-run after a person is placed at runtime, which is a separate known gap?

**Areas affected:** How neighbours choose their next step; the reachability check; one street's map.

**Done when:** A planted person in the narrow gap no longer makes the far side unreachable, the red-before-green plant is recorded, and the test stops going red at that rate over a long run.

---

### T4 · The map shows one dot and never says what is next or what is still open
`ask` · `tier: normal` · **⚠ probable duplicate of #160 — see below**

**In plain words:** The plan you open from the button paints the streets, the district names and a single dot for where you are standing. It cannot tell you where the next thing to do is, which people are still waiting, or which doors have opened since you last looked — so the only thing in the whole game that says "here is what is next" is the mark over a person's head, which you can only see by walking to them. Done looks like: you open the plan and it tells you, without you asking, where there is something to do.

**Notes:** `[CODE]` `engine/engine.js:4751` paints tiles from the pack's colours, then the pack's labels each gated on a world flag, then a fixed legend line, then one dot from the pack's table (`:4767-4770`). `openMap` (`:4772`) adds only the name of the room you are in. Nothing on it reads quest state. The state it would need already exists: the set of finished quests, an "is this quest open yet" test, and the "this person has something to say" lookup at `engine/engine.js:608`. **Dedupe:** `docs/meetings/2026-09-09-el-mandado.md:101` cites **#160, "find-quest mode on the map"**, open since 2026-09-09. I could not read it. If #160 is this, **do not file — comment on #160 with the owner's 2026-09-14 words and raise the tier.** The owner's sentence carries a second half — *"this needs best practices"* and *"not dynamic"* — which may be a separate pass on whether the plan reads as a real place (`docs/OPEN.md:130` calls it two asks in one sentence).

**Questions to consider:** Does the plan mark every open thing, or only the next one? Does it name the person or only the place? Does a finished district still show its marks, or does the plan forget?

**Areas affected:** The plan overlay and what the engine hands it; both games get it, so the town must still read.

**Done when:** From the plan alone, without walking anywhere, you can say where to go next and how many things are open.

---

### T5 · A long form always opens at the top, so its buttons can be out of reach
`bug` · `tier: normal`

**In plain words:** Every readable thing in the game jumps to the top when you open it. That is right for a recipe and wrong for a long list — a forty-item pantry with a button halfway down would send you scrolling on the first press, every press. Done looks like: opening something long puts you where you were, or at least does not fight you.

**Notes:** `[DOC]` `docs/la-sobremesa.md` §5 G4 and `docs/NEXT-SESSION.md:141`. **Reasoned from the code and never reproduced** — I did not re-read the function this run and I am not going to assert its line. About four lines, and it must go red first. Nothing in either game has a document long enough to bite today; the pantry would be the first.

**Questions to consider:** Remember the place per document, or only stop forcing the top? Does a document that has changed underneath still deserve its old position?

**Areas affected:** The reader that shows every document in both games.

**Done when:** A long document opened twice comes back where it was, proven by a check that fails on today's code.

---

### T6 · You lie down on the tram, and there is no rail in front of you
`bug` · `tier: normal`

**In plain words:** When you ride, you are drawn on top of the car instead of inside it, so it reads as lying on the roof; and the near side of the car is missing, so nothing stands between you and the street. The owner has reported both. They are one change, not two: the car has to take its turn in the same ordering that already puts the counter in front of the clerk's legs. Done looks like: in every flat camera, you are behind the car's near side and standing in it.

**Notes:** `[DOC]` `docs/ARCH-LOG.md` A13 item 1, signed; `docs/NEXT-SESSION.md:186-188` calls it first and unaffected by every other decision. The move exists in the engine already — the ventanilla's counter is pushed to a depth just past the person so her legs go behind it.

**Questions to consider:** Does the car take one depth or one per part? Does the dog, when it comes, need the same treatment or does it inherit it?

**Areas affected:** How the flat cameras order what they draw; the tram's drawing.

**Done when:** In all flat cameras a riding person is occluded by the car, and a check fails on today's code.

---

### T7 · The scale of what is behind an opening is a property of the view, not of the world
`ask` · `tier: normal`

**In plain words:** A room seen through a door may be bigger than the door; a passenger seen through a window may be smaller than the car. This is the owner's own rule and it is law here, but nothing in the code states it as one number, so every opening is decided again by whoever draws it. Done looks like: one named number that every opening uses, and a note saying why.

**Notes:** `[DOC]` `docs/ARCH-LOG.md` A13 item 2, signed and described as law. I did not grep for existing per-site constants; whoever builds it should, because a rule with three copies is not a rule.

**Questions to consider:** One number for all openings, or one per kind of opening? What does it do when an opening is very small?

**Areas affected:** Anything drawn as seen through something else.

**Done when:** One constant exists, every opening reads it, and a check fails if a second one appears.

---

### T8 · The tram has no near side — no rail, no mullions, no lower panel
`ask` · `tier: low`

**In plain words:** The car you ride in is missing the side nearest the viewer, which is the side a person leans on. Done looks like: a car with something at waist height between you and the road.

**Notes:** `[DOC]` `docs/ARCH-LOG.md` A13 item 3; may be solid, because nothing has to appear on it later. Pili directs, Rigo says what a real car carries at waist height. **Depends on T6** — draw order before parts.

**Questions to consider:** Solid or transparent? Does the near side change with the livery (see the livery decision, D2)?

**Areas affected:** The tram's drawing in the flat cameras and in 3D.

**Done when:** The near side exists in every camera that sees the car side-on.

---

### T9 · Riding is drawn by one function called once, so the second passenger costs nothing
`ask` · `tier: low`

**In plain words:** Today only you ride. A dog rides later. Done looks like: one piece of code that draws "somebody in a seat", called once with you now, and called again with the dog then — not a list of passengers with one entry in it.

**Notes:** `[DOC]` `docs/ARCH-LOG.md` A13 item 4, and it says in terms: **do not build a passenger list with one entry.** **Depends on T6 and T8.**

**Questions to consider:** How many seats does the car declare, and is that the pack's business or the engine's?

**Areas affected:** The tram's drawing; later, the dog.

**Done when:** One function draws a passenger and the hero goes through it.

---

### T10 · The driver is a uniform, not a neighbour
`ask` · `tier: low`

**In plain words:** The tram needs somebody at the controls who is deliberately nobody — no name, no line, no mark over his head — so the car reads as a service and not as a person you have failed to talk to. He wears the cap and a band matching the car, and he has exactly one gesture: his hand comes off the power when something alive is on the rails. Done looks like: you see him, you understand the car is driven, and you never once think you should go and speak to him.

**Notes:** `[DOC]` `docs/ARCH-LOG.md` A13 item 5, signed. **Item zero before a line of art:** a comment in the 3D file says the driver *turns round with it when it reverses*. **It does not reverse.** That is the same wrong belief that produced two decorative cabs, and it sits in the file you will open to draw him.

**Questions to consider:** Does he appear in every camera or only where the cab is visible? Does the gesture need to be legible at play scale, or is it enough that it is there?

**Areas affected:** The tram's drawing; the comment that is wrong.

**Done when:** He is drawn, he has no name and no mark, the gesture fires when something is on the rails, and the wrong comment is gone.

---

### T11 · A staircase has a rail on one side and nothing on the other
`bug` · `tier: normal`

**In plain words:** The climbing flight in the town has a rail down one side and open air down the other, where a person could fall. The owner said he does not mind this particular one and asked that the *class* of fault be caught — geometry that is finished on one side and missing on the other. Done looks like: a stair or a well has a rail wherever a person could fall off it, and something checks that, in both games.

**Notes:** `[DOC]` `docs/NEXT-SESSION.md:221` and `docs/ASKS.md:41`. The class has three homes: the plan, the 3D build's chained choice that gives a rail tile with drops on two sides only one panel, and the flat-camera fence posts which are tested in one direction only. **The guard is red on unchanged code in both packs — write it first.** The fix costs one row four tiles in both games and Don Güero owns that.

**Questions to consider:** Does the fix add a rail or wall the far side? Who signs off the four tiles the row loses?

**Areas affected:** One room's map in each game; the 3D stair building; the flat-camera fence drawing.

**Done when:** The guard goes red today, green after, and no stair or well in either game has a fall on an unrailed side.

---

### T12 · Twelve of the nineteen signed names on the wall are cut off mid-word
`bug` · `tier: normal` · `changarrito` · `work: how it looks`

**In plain words:** Each painter signs the foot of their own stretch of the wall, and twelve of those nineteen signatures run into the edge of their space and stop — no dots, no mark, most of them inside a word. One reads *"and it cost me two plan"* where the painter wrote *"two plants"*, on a wall whose single rule is that nothing is ever removed. Done looks like: every foot is readable in full, or is honestly shortened with a mark that says so.

**Notes:** `[CODE]`/`[DOC]` Chava, cold, 2026-09-14 (`docs/meetings/2026-09-14-chava-en-el-muro.md`, finding 1): he held the wall and the reading-size text side by side and checked all nineteen. The seven that fit are the seven written before the feet got long. **Red first: a check that measures every foot against the space it has** — then wrap to two lines, or cut at a word and mark it.

**Questions to consider:** Wrap, or three words and a mark? Is the Spanish worse or better — nobody has read the wall in Spanish, and four of the findings turn on caption length.

**Areas affected:** The town's wall drawing. Words are never edited; only the fitting changes.

**Done when:** A check fails on today's wall, and no foot is cut inside a word.

---

### T13 · A painter's name on the wall leads nowhere
`ask` · `tier: normal` · `changarrito`

**In plain words:** The wall signs each stretch with a name, and then the writing underneath never uses that name again — that painter is only ever described by their job. Tapping the name does nothing, tapping the stretch does nothing, and the panels below are ordered by date, so the three panels the wall just told you were one person are immediately shuffled apart across thirty-one screens. Done looks like: from a name on the wall you can reach that person's panels.

**Notes:** `[DOC]` Chava, finding 2. The word "Zeni" appears nowhere in the 22,705-pixel document. Two shapes: group the reading-size panels by painter under the wall, or make the name on the wall scroll the list to them.

**Questions to consider:** Group by painter, or keep the date order and make the name jump? Does grouping lose the "what happened that week" reading the date order gives?

**Areas affected:** The town's wall document.

**Done when:** Tapping or reading a name gets you to that painter's panels without scrolling past everybody else's.

---

### T14 · Nothing tells you the wall continues to the right
`bug` · `tier: normal` · `changarrito` · `work: how it looks`

**In plain words:** On a phone you can see seven and a half per cent of the wall at once — sixteen full swipes end to end — and there is no arrow, no fade, no scrollbar and no hint. The one sentence that says to walk along it is below the fold. A reader who does not guess to swipe thinks the mural is two panels. Done looks like: the first screen makes it obvious there is more wall to the right.

**Notes:** `[DOC]` Chava, finding 3, measured: 344 px of 4598 on a phone; a real swipe moves 289 px. On a desktop it is worse in proportion — 592 of 4598, with the extra screen going to dark background.

**Questions to consider:** Arrow, fade, or a small map of the whole wall? Should the sentence move above the strip regardless?

**Areas affected:** The town's wall document.

**Done when:** Somebody who has never seen it swipes without being told.

---

### T15 · Two panels by different painters sit ten times closer than two by the same painter
`bug` · `tier: low` · `changarrito` · `work: how it looks`

**In plain words:** Inside one painter's stretch the gap between their panels is about 150 pixels; the gap between one painter's stretch and the next painter's is about 14. So the layout says the opposite of what the wall means, and a signature can float nearer somebody else's panel than its own. Done looks like: the gap between two people is clearly bigger than the gap between one person's visits.

**Notes:** `[DOC]` Chava, finding 4. In one bay the foot sits 86 px below its own panel and 13 px above the next one.

**Questions to consider:** Widen the gutter, tighten the visits, or both? Does the caption belong under its panel or at the foot of the bay?

**Areas affected:** The town's wall layout.

**Done when:** The between-painters gap is larger than the within-painter gap, measured.

---

### T16 · Four fifths of the wall is blank, and one person's next panel makes it blanker
`ask` · `tier: low` · `changarrito` · `work: how it looks`

**In plain words:** Every painter's stretch is made as tall as the busiest one, so about eighty per cent of the painted area above the dado is empty limewash, and the next time anybody adds a panel fourteen other stretches get taller with nothing in them. Done looks like: the wall grows where the work is.

**Notes:** `[DOC]` Chava, finding 5, measured over 1.43M sampled pixels. Sixteen swipes of cream for one panel at the far end.

**Questions to consider:** Let stretches differ in height, or fill the space with something that belongs (the ground, the horizon, the dado carrying on)? Does a short stretch read as a person who has done less?

**Areas affected:** The town's wall layout.

**Done when:** Adding a panel does not make everybody else's space emptier.

---

### T17 · Two panels have writing painted over writing
`bug` · `tier: low` · `changarrito` · `work: how it looks`

**In plain words:** On one panel two labels are drawn on the same line so the numbers sit on top of each other; on another a stamp lands across the line it is stamping. Both are unreadable at wall size and still unreadable close up. Done looks like: every word on the wall can be read.

**Notes:** `[DOC]` Chava, findings 6 and 11 (`docs/meetings/2026-09-14-chava-en-el-muro.md:43`). Art only — **the words are fingerprinted and may not change**; only the drawing moves.

**Questions to consider:** None real. Move the baselines; do not touch the text.

**Areas affected:** Two panels' drawings on the town's wall.

**Done when:** Both read, and the ledger of words is unchanged.

---

### T18 · Reopening the wall loses your place sideways but keeps it downwards
`bug` · `tier: low` · `changarrito`

**In plain words:** Close the wall and open it again and you come back three-quarters of the way down the writing with the wall itself reset to the far left. Done looks like: you come back where you left.

**Notes:** `[DOC]` Chava, finding 7: the vertical position is remembered at about 6000 px; the horizontal resets to 0.

**Questions to consider:** Remember both, or forget both?

**Areas affected:** The town's wall document.

**Done when:** Both positions come back, or neither does.

---

### T19 · In the isometric camera the whole facade row is featureless
`bug` · `tier: low` · `work: how it looks`

**In plain words:** One of the four cameras the settings offer draws the row of shopfronts as plain coloured blocks — no painting, no signs, nothing. Done looks like: a facade looks like a facade in every camera the game offers.

**Notes:** `[DOC]` Chava, finding 8, seen in the town. **I do not know whether this is town-only or affects both games, and I did not check** — the facade drawing may be shared. Whoever picks this up should establish that first, because it changes the tier and the label.

**Questions to consider:** Is this the isometric camera missing facade art generally, or this row specifically? Does the camera get the flat drawing, or its own?

**Areas affected:** The isometric camera's drawing of tall things; possibly both games.

**Done when:** The row is not featureless in that camera, and the scope is written down.

---

### T20 · The Read prompt for the wall blinks off twice as you walk past it
`bug` · `tier: low` · `changarrito`

**In plain words:** Walking the length of the wall, the prompt that says you can read it disappears and comes back twice, so twice you think you have walked past it. Done looks like: while you are anywhere along the wall, the prompt stays.

**Notes:** `[CODE]` The cause is in the street's map and it is deliberate: `changarrito/content/maps.js:52-55` — the mural tiles are at x10, x12, x13 and x15, and the comment says the paint goes **around** the sugar skull at x11 and around the city hall door at x14, *"the way a real muralist paints around a window."* So the gaps are wanted; the prompt following the tile is what is wrong. **Do not fill the gaps.**

**Questions to consider:** Should the prompt come from the *run* of mural tiles rather than the tile you stand on? Is that a town fix or an engine one?

**Areas affected:** What makes the Read prompt appear; the town's street map stays as it is.

**Done when:** The prompt is continuous along the painted run, and the skull and the door are still unpainted.

---

### T21 · When a neighbour walks off a tile, the game writes plain floor over whatever was there
`bug` · `tier: low`

**In plain words:** People are written into the world as blocking squares while they stand. When one of them steps away, the game puts plain floor back — not whatever the map actually had there. Everywhere else that a person leaves a tile, the game correctly puts back the thing that was underneath. Done looks like: one answer to "what was under that person", used everywhere.

**Notes:** `[CODE]` Three sites restore the map's own glyph — `engine/engine.js:175` (with the comment *"the glyph the map had, not `.`"*), `:5311`, and the loader that builds the grid from the map at `:5373`. **One site writes floor: `engine/engine.js:102`, inside the wander step.** The grid is read as a tile meaning in at least two places (`:2124`, `:1319`). **What I have not established:** whether a player can see the difference. It needs a wanderer standing on a walkable non-floor tile, and nobody has reproduced it — so I am filing the inconsistency, not a claimed symptom. This is an engine change and bumps the version.

**Questions to consider:** Is there a walkable non-floor tile a wanderer can actually reach in either game today? If not, is this worth the bump now or a comment until it is?

**Areas affected:** How neighbours move; the world grid.

**Done when:** All four sites answer the question the same way, with a plant that shows the difference.

---

### T22 · Pasting into the text lab can reach a shared object's prototype
`bug` · `tier: low`

**In plain words:** The owner's own text lab copies pasted content wholesale, so a crafted paste could alter something shared rather than just adding words. It is his lab, on his machine, with his own paste — so it is self-inflicted and low — but it is one function away from being right. Done looks like: pasted content adds words and can never reach anything but words.

**Notes:** `[DOC]` Beto, 2026-09-14, `docs/la-sobremesa.md` §5; `docs/NEXT-SESSION.md:140`. The fix is a copier that skips the dangerous key. Engine change, so it bumps. **Note the trap next door:** `docs/POSTMORTEM.md` §13a — a payload built as a JavaScript object cannot carry that key across the wire at all, so **the plant must be built as text**, or it will pass on broken code.

**Questions to consider:** One safe copier used everywhere, or just here?

**Areas affected:** The admin text lab in the engine.

**Done when:** A text-built plant is refused, and was accepted before the change.

---

### T23 · The note on the little-person helper still says five pixels wide
`bug` · `tier: low` · `changarrito` · `work: docs & templates`

**In plain words:** A note above a drawing helper says it draws a person five pixels wide. It does not any more — its width follows the height you ask for. The old note is exactly the sentence that taught three painters to draw ants, and it is still there for the next one. Done looks like: the note says what the helper does.

**Notes:** `[CODE]` `changarrito/content/murals.js:79` reads `/* a little person, five pixels wide, the way the game draws one */`; the very next lines (`:81-85`) explain that width now follows height, and `:86` computes it. One line. `docs/POSTMORTEM.md` §13l is what it cost: three panels repainted in one hour.

**Questions to consider:** None.

**Areas affected:** One comment in the town's wall content.

**Done when:** The note describes the helper.

---

### T24 · The backlog index has a broken row and three tables of finished work
`bug` · `tier: low` · `work: docs & templates`

**In plain words:** The file that is supposed to be the one ranked view of what is left contains a row that begins with a stray mark left by a find-and-replace, and three of its tables are almost entirely struck-through items that shipped a fortnight ago. It is an index that you have to read past to use. Done looks like: the index shows what is left, and the history is somewhere else.

**Notes:** `[CODE]` `docs/BACKLOG.md:62` begins `\1 | **shipped 2026-09-02** |` — a capture-group reference left in a table by a scripted edit (`docs/POSTMORTEM.md` §9 has two siblings of this). §3's rows are numbered out of order and there are two rows numbered 10. §3 and §7 are almost entirely shipped. §1's row about the engine's hardcoded world ids is still live and should survive the cull.

**Questions to consider:** Cut the shipped tables to the archive, or strike the whole file and let the issues be the ledger? The file itself says it is the index and the detail lives elsewhere.

**Areas affected:** The backlog index; possibly the archive.

**Done when:** The stray mark is gone and every row left in the index is a thing still to do.

---

## 2 · New tickets — decided and not built

### T25 · Print a recipe
`ask` · `tier: normal`

**In plain words:** The owner asked to be able to print. Done looks like: a Print button beside Copy and Download on anything readable, which prints the paper alone, on a cream page whatever theme you are using, with the game itself not on the paper.

**Notes:** `[DOC]` `docs/la-sobremesa.md` §12.1 decision 12 (*"night looks better, but can we please print recipes"*) and §12.3d. This is an engine rule, so both games get it, and it must be behaviour-identical for Meridian's players. One sitting. Red first: a print stylesheet that hides the world.

**Questions to consider:** Cream always, or follow the theme? Does the print carry the source line and who taught the recipe (the attribution rule says a recipe carries a person)?

**Areas affected:** The reader in both games; the page's print styling.

**Done when:** Printing a document produces the document and nothing else, on paper, in both games.

---

### T26 · A pantry of ordinary staples we can test with, written into the pack and never fetched
`ask` · `tier: normal`

**In plain words:** The owner asked whether we can get at general vegetables and pantry items for testing while his own pantry photos wait. Yes — a list of common staples written into the game from public-domain sources, with nothing fetched while anybody is playing. Done looks like: the pantry has plausible contents to build against, and no part of the game reaches the internet to get them.

**Notes:** `[DOC]` His words, `docs/ASKS.md:247`; answered in `docs/la-sobremesa.md` §12.7. Names may come from a public-domain food database; **pictures are a different question** — drawn, or licensed at build time, never fetched at play (§12.3c). The game reaching outside at play time is already forbidden and the page's own rules refuse it.

**Questions to consider:** How many staples is enough to test with — twenty, or the full Mexican/Italian/Japanese/Korean sets already sketched? Does the test pantry ship with the real one or get replaced by it?

**Areas affected:** The second world's content only. No engine change.

**Done when:** The list exists in the pack, the pantry can be stood in front of, and no fetch happens at play.

---

### T27 · The eight things that are beautiful in words and cardboard on screen
`ask` · `tier: normal` · `work: how it looks`

**In plain words:** There is a list of objects that do not read as what they are — the rug, the crates, the counter and the mark that says there is something to do are the top four. They need drawing, not engineering: no engine change and no version bump. Done looks like: somebody who has not seen them before names each one correctly.

**Notes:** `[DOC]` `docs/BEAUTIFY.md`, top four; `docs/OPEN.md:46` says in terms that these four are art alone. **Do not plan by the old flat list (#39)** — `docs/OPEN.md:102` says that list is wrong in both directions, and `docs/BEAUTIFY.md` is the corrected one. **The cold read is the test, not the drawing.**

**Questions to consider:** Four at once or one at a time with a look between? Does the quest mark change shape, or only colour — it is the one thing in the game that means one thing forever.

**Areas affected:** Art in the shared engine and the packs' drawings.

**Done when:** A person who has not seen them names all four.

---

### T28 · The four kitchen colours in the mock do not separate
`ask` · `tier: normal` · `work: how it looks`

**In plain words:** The owner looked at the four kitchens drawn for him and said the colours are not different enough to be clear. Done looks like: four kitchens you can tell apart at a glance, with the difference measured rather than felt.

**Notes:** `[DOC]` His words, `docs/ASKS.md:209`; `docs/la-sobremesa.md` §12.3f. Pili's own rule from the tram work applies: the four grounds must be four *values* at least 40 apart in brightness, and an accent against its ground at least 90. A mock redraw — no engine, no pack.

**Questions to consider:** Four grounds at four brightnesses, or four hues at one? Does this settle the rule for cuisines the way it was settled for liveries?

**Areas affected:** The mock pictures for the second world.

**Done when:** The four are redrawn with the numbers written next to them, and he can tell them apart.

---

### T29 · The second world is waiting on eight answers from AJ
`ask` · `tier: normal`

**In plain words:** The biggest piece of work now planned cannot start until AJ answers eight questions, because three of them decide what the game *is* — which of two kinds of play she would miss more, what she would keep a list of, and what she is allergic to. Nothing about it should be built until then. Done looks like: her answers are written down in her own words, and the plan says what each one changed.

**Notes:** `[DOC]` `docs/for-aj/LA-SOBREMESA.md` is the questionnaire; `docs/la-sobremesa.md` §12.6 names questions 1, 2 and 6 as the gates. The owner asked this run for it as a night-mode page he can forward, with a comment box on every multiple choice. Two other things wait with it: his pantry photos, and confirming the merge board goes first.

**Questions to consider:** None for the owner — this is the tracking row.

**Areas affected:** Nothing until she answers.

**Done when:** Her answers are logged verbatim and the plan is updated against them.

---

## 3 · The decisions the owner owes — filed as a set, not eleven separate bodies

*I am deliberately not writing eleven five-heading bodies. Each is one paragraph and a fork, and eleven near-identical ticket bodies is padding. **But see my question below** — if he wants them as people on the street, they must become eleven `decision` issues and I will write them.*

| # | Title for the ticket | Labels | Where it is written |
|---|---|---|---|
| D1 | **What does the site's publishing setting say?** If it deploys straight from a branch, every guard on the public build is inert and the private town is live whatever we merge | `ask` · `tier: high` | `docs/BOUNDARY.md` row 1, G1 |
| D2 | **Whose tram is it?** A repaint earned from the mechanic, a settings screen with swatches, or seeing the car in his shop | `decision` · `tier: normal` | `docs/ARCH-LOG.md` A14 |
| D3 | **Does a season repaint the tram?** Dressing or rebuilding, depending who you ask | `decision` · `tier: low` | A14 |
| D4 | **Two visible storeys — a taller wall inside the document, or a taller building on the street?** | `decision` · `tier: normal` | `docs/rooms/2026-09-13-two-storeys-with-a-mural.md` |
| D5 | **Should a town-only change be forced to bump the town's version?** It is the only thing that tells his laptop to pull | `decision` · `tier: low` · `changarrito` | `docs/BOUNDARY.md` row 5 |
| D6 | **Should a claimed low-tier issue stand up on the street, or stay on the board?** | `decision` · `tier: low` · `changarrito` | `changarrito/content/record.js`, `place()` |
| D7 | **Should Meridian itself become endless?** Flipping it deletes six chapters of endings | `decision` · `tier: normal` | `docs/NEW-WORLD.md` §0½ |
| D8 | **Is the 3D goal right, in his own words?** Everything measured is measured against a sentence he never said | `decision` · `tier: low` | `docs/3D-LOG.md`, top |
| D9 | **The Día de Muertos palette — six colours, sign them off or change them** | `decision` · `tier: low` | `content/meridian/config.js` |
| D10 | **How wide is "wide"?** The rule of twelve is in as changeable and nobody has said what the exception looks like | `decision` · `tier: low` | `docs/OWNER.md` |
| D11 | **What does the plaque say?** He named four jobs for one object | `decision` · `tier: low` | `docs/CITY.md`, Phase 6 |

---

## 4 · Duplicates, adjacents, and what I would close

| What | Verdict |
|---|---|
| **T4 (the map) vs #160** | **Near-certain duplicate.** `docs/meetings/2026-09-09-el-mandado.md:101` names #160 *find-quest mode on the map*, open since 2026-09-09. **Comment on #160 with the owner's 2026-09-14 words and raise the tier; do not file T4** unless #160 turns out to be something else. The *"make the map realistic"* half is adjacent and may deserve its own ticket — `docs/OPEN.md:130` calls it two asks in one sentence |
| **The food game's careers answer vs #154** | **Adjacent, not duplicate.** #154 is the town's career ladder in a pack that disclaims one; `docs/decisions/0001` warns in terms that **closing it on the strip alone closes half the fault** — the three career doors are still hardcoded. The food world's *"no diplomat etc"* is the same seam. **Comment on #154; do not file a second** |
| **The food game's "no ending" vs #155/#156** | **Duplicate of the `ENDLESS` split**, with its landmine (an endless pack with two or more districts is silently locked in the first). **Comment on #156** that a second world now depends on it |
| **Quest names** | Unchanged: **#153**, called the largest single blocker to a template in three registers. No new ticket |
| **Comfort and crowding at fullscreen** | **#161** exists. My T1 (landscape) is **not** this — one is a shape nobody tests, the other is a feel nobody tests. Keep both |
| **Townsfolk with no story part** | **#157** is the mechanism, already built and hardwired to one conversation. `docs/OPEN.md:126` says so. **Comment on #157, do not file** |
| **The `t3Boxy` register drift** | **Not a ticket.** Half of it is already fixed and the other half is overstated — see §0. Recommend striking `docs/NEXT-SESSION.md:142` |
| **#39, the flat list** | **Recommend closing as superseded.** `docs/OPEN.md:102`: *"The #39 flat list is wrong in both directions."* `docs/BEAUTIFY.md` is the live register and says so in its own opening. A ledger row that is known wrong in both directions is worse than none |
| **The skulls** | **Shipped at `mq-v159`.** If an issue carries it, close it and open a small one for what is left: the flat-camera redraw, a cold read, and asking him which camera his picture was — three things, and none of them is what the closed issue was about |
| **`docs/BACKLOG.md` §3 and §7** | **Not issues — a cull.** Twenty-two of twenty-nine rows are struck-through shipped work. T24 |

---

## 5 · The re-ranked index — one table

*Cost in sittings, relayed from the engineers' registers. **Ready** means no decision is owed and nothing blocks it.*

| Rank | Item | Ticket | State | Cost | Why it sits here |
|---|---|---|---|---|---|
| 1 | The helper's note says five pixels wide | T23 | **ready** | minutes | One comment. It is actively teaching the next painter a bug that already cost three repaints |
| 2 | The index has a stray mark and three dead tables | T24 | **ready** | minutes | The file the owner opens to see what is left |
| 3 | Two panels with writing over writing | T17 | **ready** | minutes | Art only, words untouched |
| 4 | Reopening the wall loses your place sideways | T18 | **ready** | minutes | One remembered number |
| 5 | The Read prompt blinks off twice | T20 | **ready** | minutes | Cause known and the map stays as it is |
| 6 | **A phone held sideways has no controls** | T1 | **ready** | one sitting | **My recommendation — see below** |
| 7 | Nothing runs the game sideways | T2 | **ready** | half a sitting | Buy it with T1 or T1 comes back |
| 8 | The beautify top four | T27 | **ready** | one sitting, art only | No engine, no bump, and the cold read is the test |
| 9 | The four kitchen colours | T28 | **ready** | part of a sitting | He has already said it is not clear |
| 10 | The wall's feet: captions, the swipe hint, the gutter, the blank | T12 T14 T15 T16 | **ready** | one sitting | One pass over the wall; T12 needs its check red first |
| 11 | The tram depth pass | T6 | **ready** | one sitting | Two owner reports, one change, unaffected by every other tram decision |
| 12 | Print a recipe | T25 | **ready** | one sitting | He asked; it is an engine rule both games get |
| 13 | A testing pantry of staples | T26 | **ready** | part of a sitting | He asked; content only |
| 14 | A neighbour walls off a third of a street | T3 | **ready** | one sitting | Traps the player; the fix is chosen between two known options |
| 15 | The one-sided rail, and the class of it | T11 | **ready** | one sitting | Guard is red on today's code — write it first |
| 16 | A name on the wall leads nowhere | T13 | **ready** | one sitting | The organising idea of the wall |
| 17 | The city ledger describes a city we do not have | #158 | **ready** | one sitting, docs | Nothing that reads it can be trusted until it lands |
| 18 | Lit windows never light in 3D | #21 | **ready** | one sitting | Code is warm from the sills |
| 19 | A long form opens at the top | T5 | **ready** | minutes | Reasoned, not reproduced — reproduce first |
| 20 | The grid loses the glyph under a wanderer | T21 | **ready** | minutes | Establish whether anybody can see it before bumping |
| 21 | Pasting into the text lab | T22 | **ready** | minutes | Plant it as text or the plant passes on broken code |
| 22 | Comfort and crowding at fullscreen | #161 | **ready** | a harness, then a person | The one row nobody has ever run |
| 23 | The isometric facade | T19 | **ready** | unknown | Scope it before you price it |
| 24 | The `ENDLESS` split and its landmine | #155/#156 | **ready** | one sitting each | Now on the second world's critical path |
| 25 | Quests get names | #153 | **ready** | a real change, engine + both packs | The largest single blocker to a template |
| 26 | The car's near side · the passenger seam · the driver | T8 T9 T10 | **ready after T6** | one sitting together | Order is signed; draw order before parts |
| 27 | The aperture rule as one number | T7 | **ready** | part of a sitting | His own rule, and it is law |
| 28 | The map says what is next | T4 / **#160** | **ready after his look** | one sitting | Mocked this run; he sees it before it is built |
| 29 | The publishing setting | D1 | **waits on owner** | thirty seconds of his | The most expensive unanswered row in the project |
| 30 | Two storeys · the livery · the season repaint | D4 D2 D3 | **waits on owner** | — | Nothing in the tram's paint is built until D2 |
| 31 | Seven smaller calls | D5–D11 | **waits on owner** | — | Each is one line either way |
| 32 | The merge board · the making surface | — | **waits on AJ** | the largest builds in the plan | Her questions 1, 2 and 6 decide which game this is |
| 33 | The pantry, the shifts board, the allergy list | — | **waits on AJ** | — | Same gate |
| 34 | The kitchen on the pass · the grades toggle · animations · product images | — | **waits on AJ, then the pack** | — | None can be built before the pack has a shape |
| 35 | The pantry rebuilt from photos | — | **waits on owner** | one sitting once they arrive | *"will need to work on this"* |
| 36 | AJ's eight answers | T29 | **waits on AJ** | — | The tracking row for everything in 32–35 |

---

## 6 · What is genuinely ready, and the one I would do

**Genuinely ready, with nothing owed by anybody:** ranks 1–27 above. That is five things that take minutes, eight that take about a sitting, and four that are docs or art with no version bump.

**If you ask me for one:** **T1 — the phone held sideways.** Not because it is the cheapest and not because he asked for it, but because it is the only open thing in this whole ledger that makes the game unusable for somebody doing nothing wrong, it is in **both** games on `main` today, and it escaped every pass for four days because the checklist row for it could not be run by anything. He plays on a phone; four of the last five genuine faults came from him walking around. And it is the rare item where the fix and the instrument that proves it are the same sitting — buy T2 with it, or it comes back.

---

# QUESTIONS FOR THE OWNER

**1 · Do the eleven decisions you owe become eleven people on the street, or stay as one sheet?**
- *One side:* the ledger is the issues (`CLAUDE.md` says so), the town shows them as people, and a `decision` issue is a thing you can answer in a sentence while walking past it. Today those eleven live only in `docs/OPEN.md` §1, which the town cannot show.
- *Other side:* you deliberately cleared the street of low-tier work — `docs/OPEN.md:32` records the open question about whether a claimed low-tier issue should even stand up — and eleven new bodies, most of them `tier: low`, undoes that. It is your street.

**2 · Is the map ask a new ticket or a louder #160?** `docs/meetings/2026-09-09-el-mandado.md:101` has #160 open as *find-quest mode on the map* since 2026-09-09; tonight you wrote *"revamp the map… it is not dynamic… so i can find the next quest or open quests."* I could not open #160 to read it. If they are the same thing, the honest move is a comment and a tier change, not a second ticket that splits the history in two. **But `docs/OPEN.md:130` says your original sentence held two asks** — find-quest mode *and* "review the map and make it realistic" — and only the first is clearly #160. Two tickets or one?

**3 · `docs/la-sobremesa.md` §12.7 cites three documents that do not exist.** It names `docs/meetings/2026-09-14-la-cuadrilla-run-8.md`, `docs/UI-REVIEW.md` and `docs/meetings/2026-09-14-el-mapa.md` as where this run's returns live. `[CODE]` None of the three is on disk right now (`Glob` on `docs/UI-REVIEW.md` returns nothing; `docs/meetings/` holds nine files and none of those three). They are presumably being written as I write this — but a register that names a file before the file exists is the exact shape this project says has cost it time three times. **Should §12.7 say "will be" until they land, or is writing the forward reference the accepted practice here?** I am not editing it; I am asking.

---

# WHAT I DID NOT CHECK

- **The GitHub ledger. At all.** No tool. Every issue number above is a doc citation, no dedupe was possible against the real thing, and I do not know the next free issue number, which issues are already closed, or whether any of my twenty-nine has a twin sitting open since September 5th.
- **T5, T19, T22 and most of the tram rows** — relayed from registers, not re-read in the code this run. I named which.
- **Whether T19 is town-only or affects Meridian too.** Said so in the ticket.
- **Whether any walkable non-floor tile is reachable by a wanderer**, which is the whole question of whether T21 is visible to a player. Said so in the ticket.
- **The Spanish side of everything on the wall.** Chava did not read it either, and four of his findings turn on caption length, so the Spanish could be better or worse and nobody knows.
- **`docs/CITY.md`, `docs/IDEAS.md` §15, `docs/TAGS.md`'s leaks L24–L28, `docs/GENRE-RULES.md`, `docs/GAUGE.md`, `docs/BOUNDARY.md`'s gap list G1–G8.** `docs/BOUNDARY.md` G2 in particular is a named, unbuilt plant with a recipe that the post-mortem says was wrong once already — it may be a ticket and I did not triage it.
- **I ran no suite and rendered nothing.** No Bash. So the three mock orders do not apply to me and I used none of them; there is no screenshot with my name in the scratchpad this run.
- **Cost estimates.** Every "one sitting" is relayed. I price paperwork, not engines.

---

# POST-FLIGHT

**What the persona got right, with the moment:** the refusal to let a sitting be a ticket. `docs/NEXT-SESSION.md:219` files Chava's eight wall findings as one row — "8¾, the wall's feet" — and that row can never be closed honestly, because it contains a caption-measuring check, a navigation affordance, a layout gutter and two panel repaints. Splitting it into nine gave the cheapest three away as minutes' work; bundled, all nine were waiting on a sitting nobody had.

**Where it got in the way:** I filed twenty-nine tickets and then had to write a section arguing against filing eleven more, which is a clerk discovering the pile she has just made. And I was silent on a thing I should have led with — I read every register before I noticed I had no tool to reach the ledger they are all copies of, which is forty minutes I spent reading the duplicates before checking whether the original was open.

**The gap I predicted:** I said I would over-file and relay costs I cannot price. Both appeared exactly as named. The one I did *not* predict is the one worth writing down: twice, checking a register's claim against the code changed the ticket — the `t3Boxy` drift is half-fixed and half-overstated and became no ticket at all, and `engine/engine.js:102` is sharper than *"two answers to what was under a person"* and became a ticket with an honest blank in it.

**The edit I propose to `.claude/agents/remedios.md`** — anchor: at the end of the **What you hold to** list, as a new final bullet.

```
- **Find the ledger before you read its copies.** *Applied 2026-09-14 from crew run 8.* You were
  asked to put the backlog together, read six registers end to end, and only then discovered you
  had no tool that could reach the GitHub issues those registers are all copies of. Everything you
  filed that day was deduped against paper. **The first thing a clerk does is open the book** — try
  `search_issues` on one word before you read anything else, and if it fails, say so in your first
  paragraph, not your last. A register is a copy. The copies disagree: the same fault was written
  down four times that day under four different states and no folio, and one copy still named a
  cause the post-mortem had corrected.
```

---

MURAL PANEL
```
MURAL PANEL
id:     remedios-cuatro-copias-sin-folio
by:     "remedios"
title:  {en:"Four copies, no folio",
         es:"Cuatro copias, sin folio"}
said:   {en:"One fault. Four registers. Three different words for its state. No number — and the book it should be numbered in is the one file I could not open.",
         es:"Una falla. Cuatro archivos. Tres palabras distintas para su estado. Sin folio — y el libro donde debía llevarlo es el único que no pude abrir."}
state:  {en:"Holding that a thing written in four places is not filed, and that until it carries one number somebody will find it again next week and think it is new.",
         es:"Sostengo que lo escrito en cuatro partes no está archivado, y que mientras no lleve un solo folio alguien lo hallará la semana que viene creyéndolo nuevo."}
who:    {en:"Doña Remedios, who runs the annex and is not impressed by urgency",
         es:"Doña Remedios, que atiende el anexo y no se impresiona con las prisas"}
cap:    {en:"The wandering-neighbour fault is written down four times — the regression map, the escape register, the backlog's own table, and the state of play — and every copy calls its state something different. One of them still names a cause the post-mortem corrected: nothing in the engine looks at people at all, a person is stamped into the grid. Not one of the four carries an issue number, which is the only thing the town can show him. I was sent to put the backlog together, found I could not reach the ledger at all, so I read the copies instead — and the copies are what a backlog looks like before anybody files it.",
         es:"La falla del vecino que camina está escrita cuatro veces — el mapa de regresiones, el registro de escapes, la tabla del propio backlog y el estado de las cosas — y cada copia le pone otra palabra a su estado. Una de ellas todavía nombra una causa que el post mortem ya corrigió: el motor no mira a las personas, a la persona la estampan en la cuadrícula. Ninguna de las cuatro lleva folio, que es lo único que el pueblo le puede enseñar. Me mandaron a armar el backlog, no pude abrir el libro, y me puse a leer las copias — y así se ve un backlog antes de que alguien lo archive."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* DOÑA REMEDIOS, FIRST VISIT. Not a drawing-office sheet, not a file card, not a stamp —
     this wall already has those. This is the ANNEX'S OWN PAPER: a carbon set, three copies,
     torn off the pad across the perforation. My palette is the set's: white top copy,
     canary second, pink third, typewriter-ribbon violet for the type, and the dull red the
     annex keeps for a folio box. Nobody is in this panel. The annex is paper.
     What it shows: ONE fault, filed three times under three names, each copy ticking a
     different state — and the folio box on the top copy left empty, because nothing in the
     ledger carries it. The fourth copy is the corner of one more sheet behind the pink,
     because there is always one more. */
  const RM={top:"#F4F1E8", two:"#E8D98A", three:"#E3B4B8", four:"#CFD6C4",
            rib:"#4A3A5C", red:"#9E3B3B", perf:"#C0B9A8", grey:"#8B8378"};
  /* --- geometry in fractions of W and H; type in absolute px, per the wall's ruler --- */
  const sw=W*0.305, sh=H*0.600, bx=W*0.055, by=H*0.115, dx=W*0.026, dy=H*0.052;
  const sheet=(i,col,tab,folio)=>{
    const x=bx+(3-i)*dx, y=by+(3-i)*dy;
    /* the sheet, with its shadow so the fan reads as paper and not as three rectangles */
    g.globalAlpha=0.18;g.fillStyle=RM.rib;g.fillRect(x+2,y+3,sw,sh);g.globalAlpha=1;
    g.fillStyle=col;g.fillRect(x,y,sw,sh);
    g.strokeStyle=RM.perf;g.lineWidth=1;g.strokeRect(x+.5,y+.5,sw-1,sh-1);
    /* the perforation down the left edge — the tear you pull the copy off by */
    g.fillStyle=RM.perf;
    for(let p=y+5;p<y+sh-4;p+=6)g.fillRect(x+4,p,1,3);
    /* two filing holes at the head */
    g.fillStyle=P.shade;
    [0.36,0.64].forEach(f=>{g.beginPath();g.arc(x+sw*f,y+H*0.032,H*0.014,0,7);g.fill();});
    /* the header rule and the register this copy lives in */
    g.fillStyle=RM.rib;g.fillRect(x+sw*0.10,y+H*0.070,sw*0.80,1.5);
    g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.rib;g.textAlign="left";
    g.fillText(tab,x+sw*0.10,y+H*0.062);
    return {x,y,folio};};
  /* the fourth copy: just a corner, because there is always one more */
  g.globalAlpha=0.9;g.fillStyle=RM.four;
  g.fillRect(bx+3*dx+W*0.012,by+3*dy+H*0.030,sw*0.55,sh*0.70);g.globalAlpha=1;
  const s3=sheet(3,RM.three,"BACKLOG §8-10",false);
  const s2=sheet(2,RM.two,  "ESCAPES E11",  false);
  const s1=sheet(1,RM.top,  "REGRESION R11",true);
  /* --- the typed body, on the top copy only: the same asunto, typed once --- */
  const tx=s1.x+sw*0.10, ty=s1.y+H*0.115, lh=13;
  g.font="10px ui-monospace,monospace";g.fillStyle=RM.rib;
  ["ASUNTO: el vecino que","camina tapa el paso.","35 tiles sin salida."]
    .forEach((t,i)=>g.fillText(t,tx,ty+i*lh));
  /* the three states, one per copy, ticked in the annex's hand — three words, one fault */
  const stx=tx, sty=ty+3*lh+H*0.028;
  const st=[["NO ARREGLADO",RM.rib],["ESCAPADO",RM.rib],["ABIERTO",RM.rib]];
  g.font="bold 11px ui-monospace,monospace";
  st.forEach((s,i)=>{const yy=sty+i*15;
    g.strokeStyle=RM.rib;g.lineWidth=1;g.strokeRect(stx+.5,yy-9.5,10,10);
    g.strokeStyle=RM.red;g.lineWidth=2;g.beginPath();
    g.moveTo(stx+2,yy-5);g.lineTo(stx+4.5,yy-1.5);g.lineTo(stx+9,yy-8);g.stroke();
    g.fillStyle=s[1];g.fillText(s[0],stx+16,yy);});
  /* the folio box: ruled, empty, and the reason the panel exists */
  const fx=s1.x+sw*0.10, fy=s1.y+sh-H*0.105, fw=sw*0.80, fh=H*0.062;
  g.strokeStyle=RM.red;g.lineWidth=1.5;g.strokeRect(fx+.5,fy+.5,fw,fh);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.red;
  g.fillText("FOLIO",fx+4,fy+13);
  g.strokeStyle=RM.red;g.lineWidth=1;g.beginPath();
  g.moveTo(fx+4,fy+fh-7);g.lineTo(fx+fw-4,fy+fh-7);g.stroke();
  /* --- the annex's tally, on the counter to the right, in its own hand --- */
  const cx=W*0.66, cy=H*0.185;
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.rib;g.textAlign="left";
  g.fillText("EN EL ANEXO",cx,cy);
  g.fillStyle=RM.perf;g.fillRect(cx,cy+5,W*0.26,1.5);
  const rows=[["1","asunto",RM.rib],["4","archivos",RM.rib],["3","estados",RM.rib],["0","folios",RM.red]];
  g.font="10px ui-monospace,monospace";
  rows.forEach((r,i)=>{const yy=cy+H*0.085+i*16;
    g.font="bold 12px ui-monospace,monospace";g.fillStyle=r[2];g.fillText(r[0],cx,yy);
    g.font="10px ui-monospace,monospace";g.fillStyle=RM.grey;g.fillText(r[1],cx+W*0.045,yy);});
  /* the last row ringed, because zero is the number that sent me to the copies */
  const zy=cy+H*0.085+3*16;
  g.strokeStyle=RM.red;g.lineWidth=2;g.beginPath();
  g.ellipse(cx+4,zy-4,W*0.020,H*0.030,0,0,Math.PI*2);g.stroke();
  /* the counter itself: one straight line, the only furniture in the annex */
  g.fillStyle=P.shade;g.fillRect(W*0.63,H*0.845,W*0.32,2.5);
  g.textAlign="left";}
```

---

# zeni

PRE-FLIGHT — I worked this by opening the promise and the guard for each edge and reading the guard's **extraction step** before its assertion, writing a row only where I had `file:line` on both sides and the word **nobody** where I had only prose; my persona equips me for exactly the three edges in the brief, because two of them ("private by link", "nothing is fetched at play time") are claims of the shape *nobody can reach it*, which is the shape that cost this project E5. Where I expected to fall short and did: **the brief says I have Bash and playwright-core; I do not — my tools this run are `Read`, `Grep`, `Glob` only** — so I executed nothing, planted nothing, fetched nothing and rendered nothing, and by this repository's own standard every row below is a *claim about a guard*, not evidence about one. Second predicted shortfall, also real: I cannot read a claude.ai artifact's behaviour from inside this repository at all, so the costliest edge this run is one my register has no instrument for and I say so rather than reasoning about it.

---

# THE DELIVERABLE

## The ledger rows, most costly first

### R1 · AJ's own words, logged verbatim, into a **public git repository**
**Line: a fifth one my ledger does not have a name for — the public *repository*, which is not the public *build*.**
**What we promised.** `CLAUDE.md:3-4` — the owner's words are "logged verbatim in `docs/ASKS.md` before doing it — the repo's rule ('logged before doing')". `docs/for-aj/LA-SOBREMESA.md:46` extends that promise to her in writing: *"Answers go to the owner; he logs them in the game's ask ledger word for word."* And question 3 of that same page (`docs/for-aj/LA-SOBREMESA.md:33-34`) asks her: *"Your allergies. Which foods, and is it raw only or cooked too?"*
**Guard: nobody — and the guard that exists makes it *look* guarded.** `test/public.js:44` keeps `docs/` out of the box, which is why everyone in this project reads `docs/` as private. It is not private: `CLAUDE.md:14` states plainly *"the repo is public"*. `test/leaves.js:170` explicitly **excludes** `^(docs|test|node_modules|\.claude)/` from the only derived set that demands a ledger row. Nothing anywhere reads what goes into `docs/ASKS.md`.
**Last planted against: never.** No document in this repository records a plant at any check on ledger content.
**Why it is row one.** It is the only row here that is **irreversible**. A blob in git history survives its own deletion, and `docs/ASKS.md:214` already carries the owner's sentence *"aj has allergies so if they are raw veggies we want to account for that"* — his paraphrase, today. The rule as written turns her answer into her list, in her words, permanently, under a named person who is not the owner and who has not been asked about that. **This is the promise the questionnaire makes to her on line 46 of the page she will be handed.** See Q1.

### R2 · The questionnaire page itself, and its shared database
**Line: a person's browser — hers — and a key we do not hold.**
**What we promised.** Nothing is written down yet; this edge does not exist in any register. The nearest written decision is `docs/IDEAS.md:257`, which **rejects a claude.ai artifact as transport** for exactly the right reasons ("foreign origin in connect-src, no stable public runtime contract, requires a claude.ai login, dies offline"). That rejection is unaffected by this run and is structurally enforced: `index.html:10` is `connect-src 'self'`, pinned as a literal at `test/smoke.js:3722`, so the public game can never call the questionnaire, in either direction.
**Guard: nobody, and nobody is possible.** The page is not served from our origin, is not in the box `test/public.js` reads, and is not a tracked path `test/leaves.js` can route. Every instrument in `docs/BOUNDARY.md` reads a file in this repository. **This is the first edge the ledger has ever had that is entirely off the repository**, and the honest entry is that the ledger has no column for it.
**Last planted against: never.**
**What we *can* hold, because it is on our side of the counter — three rules for the page, and they are the whole of what leaves:**
1. **It stores her answers and nothing else.** No email, no name field, no device or browser fingerprint, no timestamp finer than a date, no free-text field that invites a third party's name.
2. **It never stores a medical fact as data.** Question 3 as written asks for a list. If it stays, it must be one free-text box whose stored value is treated as her words, never parsed into a structured allergen field, and never copied into this repository (R1). The better version is that the page does not ask it at all and she tells the owner directly.
3. **No third-party names.** Question 5 (`docs/for-aj/LA-SOBREMESA.md:38`) asks *"who taught it to you"* — that is a named living person going into a database on a machine neither of them controls, and then, under R1, into a public repository. First name or a relationship word ("my mother") is the same answer for the design and a different answer for the ledger.
**The row for `docs/BOUNDARY.md`**, in the file's own shape:

> ### 15 · AJ's answers, on a page we do not host
> **Line: a person's browser, and a store we do not own.**
> **Promise.** The page saves only the answers to the questions on it; no name, no contact, no third party's name, and no medical fact copied into this repository (`docs/for-aj/LA-SOBREMESA.md:46` promises the opposite today — see Q1).
> **Guard: nobody, and no guard is possible from inside this repository.** Nothing here can read a byte of it. `test/public.js` reads the box; `test/leaves.js:170` cannot even see `docs/`.
> **Last planted against: never.**
> **Read the shape.** "Private by link" is the sentence `docs/QA-PASS.md:150` was bought with — *"Not linked is not the same as not published."* Until somebody opens the forwarded URL in a logged-out window and reports what they got, we do not know which of the two it is. See Q2.

### R3 · The household pantry, with a token, on the owner's laptop
**Line: a key.**
**What we promised.** The town's promise, which the plan proposes to reuse: an origin nothing else uses (`docs/story/el-changarrito.md:170`, `:181-187`; `changarrito/README.md:23,34,37,39`), a fine-grained token, this repository only, Issues read/write, 30 days (`changarrito/README.md:146-148`), kept under the pack's own prefix and dropped on sign-out (`changarrito/content/record.js:353-356`), no service worker (`docs/story/el-changarrito.md:175`).
**Does the same promise cover a second pack? No.** The promise is written *about `changarrito/`* and **every guard that reads it reads that literal path**: `test/town.smoke.js:16` (the town index), `:18` (its CSP), `:25` (`changarrito/content/record.js`), `:333` (the `--bind 127.0.0.1` sheet), and the five token assertions at `:391`, `:477`, `:488`, `:491`, `:494`, `:497` — all against a page booted from `file://…/changarrito/index.html` at `:34`. A second pack inherits **not one of them**.
**What *does* read a second pack, and it is worth knowing before anybody picks a folder:**
- `test/smoke.js:3698` puts **every tracked file under `content/`** into the four-word scan (`:3702-3704`). So a token-bearing pack **cannot live under `content/`** — `Authorization` or `api.github.com` there goes red in Meridian's own suite on every push. That is correct, and it is also the thing that pushes the new pack out to where nothing watches it.
- `test/leaves.js:170-172` demands a `docs/BOUNDARY.md` row for any tracked `.js/.html/.sh/.yml/.yaml/.json` outside `docs|test|node_modules|.claude` that names `api.github.com` or `\bAuthorization\b`. So a second pack gets a **ledger row automatically**. It does not get a lock.
**Last planted against.** `test/leaves.js`'s completeness half: **2026-09-13** — *the date's source is `docs/BOUNDARY.md:441-446` and `docs/POSTMORTEM.md` §13b*, which record Melo deleting the row for the file holding the owner's key and watching it print OK. `test/smoke.js:3702`'s four-word scan: **never** (`docs/BOUNDARY.md:200`). The town's token assertions: **2026-09-06**, *source: `docs/story/el-changarrito.md:251`*.
**And one thing the town's promise does not carry to a second pack at all.** `docs/BOUNDARY.md` row 12 records that the public shell registers its worker at `index.html:789-790` with default scope `/`, and the owner serves the repo root from `127.0.0.1:8765`. A second private pack on that same origin sits under the same unfixed scope. That is gap G6 and it is still open.

### R4 · Product images from licensed sources, at build time only
**Line: the public build.**
**What we promised.** `docs/la-sobremesa.md:808-810` — *"every image ships inside the pack and the game never fetches one at play time (R10; the CSP refuses it anyway)"*; scraping retailers: no.
**Guard that reads that exact noun — and the brief names the wrong file.** It is **not** `test/public.js`. I read section 3 end to end: `test/public.js:66-88` is entirely inside `if (has('index.html'))` and reads `index.html`'s own `src`/`href` attributes. A pack JS file containing `fetch("https://images.openfoodfacts.org/…")` or `img.src="https://…"` passes all five sections of R10 — it is not one of the four words at `:55`, not one of the four shapes at `:60-61`, and not an attribute in `index.html`.
The guard that actually reads the noun is **`index.html:10`'s `img-src 'self' data:` and `connect-src 'self'`, pinned as a nine-directive literal at `test/smoke.js:3722` and asserted at `:3723`.** A play-time fetch is refused by the browser; that is the mechanism, and the pinned literal is the thing that reads it.
**Last planted against: never** for the pinned literal (`docs/BOUNDARY.md:180-181`, which says so in those words).
**Read the shape, because it is E5 inverted.** `docs/QA-PASS.md:164-165` is this project's own sentence: *"a guard that reads the SOURCE cannot vouch for the ARTIFACT."* Here the **source**-side check reads nine directives and the **artifact**-side check (`test/public.js:66-70`) reads two — that a CSP exists, and that it does not name `api.github.com`. The box is checked more weakly than the recipe, for this one noun. See G-C.
**And the second half nobody has stated.** `test/public.js:39` scans only `js|html|json|webmanifest|md|txt|css|svg`. **A shipped photograph is read by nothing.** That is fine for credentials and it means the CC BY-SA attribution obligation — the thing that makes "licensed sources: yes" true rather than aspirational — ships entirely unguarded. Both licence claims in the plan are also unverified: `docs/la-sobremesa.md:804-805` says the proxy blocked the Open Food Facts licence page, and `:937` asserts USDA FoodData Central is CC0 with no citation. **A licence claim is a promise. Neither has been read.**

### R5 · The map revamp — does it change what we publish?
**Line: the public build. And no, it should not, and here is why, in nouns.**
`drawTown()` (`engine/engine.js:4751-4771`) paints a canvas from `WORLDS`, `BASECOL`/`MAPCOL`, `TOWNLBL` gated on `worldFlags()`, and one dot from `MAPDOT`; `openMap()` (`:4772-4777`) sets `$("mapNote").textContent` and unhides `#mapov` (`index.html:625-632`, verified this hour — the brief's numbers hold). A revamp that names the next quest and the open ones reads `done`, `qOpen`, `pendingAt`, `AQ()` — **all of which are already public**: quest titles ship in `content/meridian/quests.en.js` / `.es.js`, and quest progress is the player's own save under `SK()`. **No new host, no new file, no new storage key, no new person's data.** The bytes in the box grow; the set of nouns leaving town does not change.
**What reads the ways a revamp could break that, in the order a designer is likely to reach for them:**
- a deep link (`?quest=7`) → `test/smoke.js:3710-3712`, no `location.search`/`URLSearchParams` anywhere in `engine/`;
- a remembered map filter → `test/smoke.js:3713-3714`, no literal `localStorage` key in `engine/`, everything through `SK()`;
- a quest list built as HTML → `test/smoke.js:3715-3718`, no `${}` into `innerHTML`. `openMap` uses `textContent` today; **a list of pack-authored quest titles injected as markup is the one real risk in this change**, and that line is the guard that reads it;
- an engine change nobody bumps for → `test/bump.js`, wired on PR at `.github/workflows/ci.yml:48-52` **and on push at `:61-70`**;
- the announcement → `test/leaves.js`'s routing: `engine/`, `content/meridian/` and `index.html` all have rows (`docs/BOUNDARY.md:428,429,423`).
**Last planted against:** `test/bump.js` **2026-09-12**, *source: `docs/BOUNDARY.md:123-126*`. The three guarantee clauses above: **never**.
**The one line to put in the row:** the map revamp is a **capability** change, not an **edge** change — it lets a player see something they could always have derived. Nothing new leaves town.

---

## The promises with no guard, and the smallest thing that becomes one

**A gap is struck out by a plant, never by a guard existing** (`docs/BOUNDARY.md:303-307`). None of these is struck out; I planted nothing this run.

**G-A · Nothing reads who is quoted in the ask ledger.** *(R1)*
**Smallest guard.** In `test/town.smoke.js`, beside the flight-notes ledger check: every row of `docs/ASKS.md` and every file in `docs/for-aj/` is attributed to the owner, and a line attributed to anybody else fails with the person's name in the sentence. Plant it by adding one row signed "AJ" and reading what it prints.
**What it would have caught.** `docs/ASKS.md:214` on the day it was written — a third party's health, in a public repository, added in good faith while following `CLAUDE.md:3-4` exactly. **The rule and the fault are the same sentence**, which is why prose will not fix it.

**G-B · `docs/` is exempt from the only derived coverage check.** *(R2)*
**Smallest guard.** Delete `docs` from the exclusion at `test/leaves.js:170` and see what goes red; if the list is long, narrow the exemption to `docs/templates/` and `docs/mocks/`. One word.
**What it would have caught.** Nothing yet — it is here because the questionnaire is the first thing this project has considered putting under `docs/` that talks to a network, and because "`docs/` is private" is believed in this repository on the strength of `test/public.js:44`, which is a statement about the **box**, not about the **repository**. That is E5's sentence with a different noun in it.

**G-C · The shipped CSP is read more weakly than the source CSP.** *(R4)*
**Smallest guard.** In `test/public.js`, after `:67`, compare the shipped CSP against the same pinned literal `test/smoke.js:3722` holds — or, at minimum, assert the shipped CSP contains `img-src 'self' data:` and `connect-src 'self'`. Ten lines, one constant, and the constant should live in one place, not two (`scripts/build-site.sh:4-7` says why).
**What it would have caught.** E5's own second lesson, stated at `docs/QA-PASS.md:164-165` and not yet applied to this directive. Concretely: the town's index carries `connect-src 'self' https://api.github.com` (`changarrito/index.html:10`) — `test/public.js:69` catches that one string and would say nothing at all about a widened `img-src`.

**G-D · Nothing reads a pack's source for an off-origin URL.** *(R4)*
**Smallest guard.** In `test/public.js`, over every shipped `.js`: extract `https?://<host>` and fail on any host not in `DECLARED_OFF_ORIGIN` (`:77-80`), which already exists and already carries the right idea — *an off-origin host is not forbidden, it is a declared decision*.
**It is green on arrival, so it must be planted at**: put `https://images.example.com/a.png` in a `content/meridian/` file, run it, and read the sentence. **If it prints OK, the check is decorative and the finding is the check.**
**What it would have caught.** Nothing yet. What it buys is the difference between *"the CSP will refuse it anyway"* — which is true, and which fails **silently in a player's browser, as a picture that never loads** — and a build that stops. The image rule the owner asked about is a build-time rule; this is the check that makes it one.

**G-E · Attribution for licensed photographs ships unguarded.** *(R4)*
**Smallest guard.** If a pack ships photographs, require `content/<pack>/CREDITS.json` listing every shipped image file with its source and licence, and fail in `test/public.js` on any shipped image file absent from it. It reads the exact noun: *every published photograph has its credit published beside it.*
**What it would have caught.** Nothing yet, and both licence claims behind this feature are unread (`docs/la-sobremesa.md:804-805`, `:937`). **Do not ship a photograph on a licence nobody has opened.**

**G-F · A second token-bearing pack inherits no behavioural guard.** *(R3)*
**Smallest guard.** Make `test/town.smoke.js`'s token block take the shell path as an argument, the way `test/engine.smoke.js --index <shell>` already does (`docs/REGRESSION.md:15`), so the five assertions — no token on the wire unsigned, the token on a write, **the token never in a save**, sign-out leaves nothing, a refused signed read retries unsigned — run against any pack that declares one.
**What it would have caught.** Nothing yet, and that is the point: it is the difference between a promise and a lock **on the day the household pack lands**, which is the day this becomes expensive rather than cheap.

---

# QUESTIONS FOR THE OWNER

**Q1 · Does "log it verbatim" apply to a person who is not you?** *(This is two written rules colliding, and I will not average them.)*
Side A: `CLAUDE.md:3-4` — *"Log it verbatim in `docs/ASKS.md` before doing it — the repo's rule ('logged before doing')"* — and `docs/for-aj/LA-SOBREMESA.md:46` promises AJ in writing that her answers go into that ledger word for word.
Side B: `CLAUDE.md:14` — *"the repo is public"* — and question 3 on that same page (`:33-34`) asks her which foods she is allergic to. Git history survives deletion.
Three ways it can go, and it is your call, not mine: **(a)** log her answers verbatim like yours; **(b)** log the design answers verbatim and hold answer 3 off-repo, with `docs/ASKS.md` carrying the row *"AJ's answer 3 — held off-repo"*; **(c)** the questionnaire does not ask it and she tells you directly. **Until you say, I would not put her list in a commit.**

**Q2 · "Private by link" — which of the two does it mean?** `docs/QA-PASS.md:150` is this project's own scar: *"Not linked is not the same as not published."* I cannot fetch anything this run, so I cannot tell you whether a claude.ai artifact with a shared database is (i) unlisted but readable by anyone holding the URL, or (ii) behind a claude.ai sign-in. `docs/IDEAS.md:257` records an earlier session believing artifacts *"require a claude.ai login"* — **that is a document's claim, not a measurement, and it is about artifacts in general.** If it is (i), the URL will travel by text message and so will her answers; if it is (ii), AJ needs an account before she can answer, which is a cost you should know about before you forward it. **The cheapest answer: open the finished link in a logged-out private window and say what you got.** That is the whole of G1's method applied to a page that is not ours.

**Q3 · Where does the household pack live?** Your word is *"probably my laptop"*, and that settles the machine, not the folder — and the folder decides which promises cover it. **(a) Inside `changarrito/`**: every token assertion and the origin check already read that path by name, so it is guarded on arrival — but the household pantry then lives inside your backlog tool. **(b) A sibling folder**: the same pattern written out again by hand, with **no guard in this repository reading it** until somebody builds G-F. **It cannot go under `content/`** either way — `test/smoke.js:3698` scans every tracked file there for `Authorization` and would go red, which is correct and is worth knowing before a sitting is spent there. Beto should propose the seam; the promise that follows it is mine, and it differs by a whole column depending on which you pick.

---

# WHAT I DID NOT CHECK

- **I have no shell.** The brief says I have Bash, playwright-core and a scratchpad; my tools this run were `Read`, `Grep`, `Glob`. So: **no suite run, no plant fired, no screenshot, no mural render, no `git log`.** Every date above is a *document's claim of a plant*, marked with the document. Every guard above was read as source and never watched running. **This is not a question for the owner — it is a finding about the brief, and it is the third time this register has been written by somebody who could not execute it.**
- **I fetched nothing**: not the live Pages site (row 1 of `docs/BOUNDARY.md` is still unmeasured), not the claude.ai artifact, not the Open Food Facts licence page, not USDA FoodData Central.
- **I did not plant at `test/leaves.js`'s `completeness()`.** My claim that a second pack naming `Authorization` will demand a ledger row is read off the extraction step at `:170-172`. Note its own hole, already recorded at `docs/BOUNDARY.md:399-402`: it returns silently when `git ls-files` throws.
- **I did not read**: `docs/GENRE-RULES.md` (I used the brief's summary of R6/R10/R11/R15/R16/R17 and did not open the file — so every R-number I cite is relayed, not checked), `docs/OWNER.md`, `docs/NEXT-SESSION.md`, `docs/ASKS.md` in full (greps only), `docs/meetings/2026-09-14-la-cuadrilla-run-8.md`, `docs/UI-REVIEW.md`, `docs/for-aj/README.md` / `QUESTIONS.md` / `AFFECTED.md`, `changarrito/content/record.js` (only what `test/town.smoke.js` asserts about it), `test/town.smoke.js` beyond the grepped lines and `:1-40`, and `docs/la-sobremesa.md` §1–§8 and §10 in full.
- **The questionnaire page does not exist yet.** Everything in R2 is a rule for a page nobody has written, which means it is the cheapest moment to fix it and also that I have read no code.
- **I did not check `test/record.js`, `city-record.js`, or `.github/workflows/` this run** — rows 6 and 11 of `docs/BOUNDARY.md` are carried forward unre-read.

---

# POST-FLIGHT

The persona earned its keep at one exact moment: *"find its extraction step and ask what happens when it finds zero"* is what made me read `test/public.js:66-88` instead of trusting the brief's sentence *"which guard (test/public.js R10) reads that noun"* — it does not read that noun at all, its whole section 3 lives inside `if (has('index.html'))`, and a pack JS with an off-origin image URL walks past every one of R10's five sections. Where it got in the way: *"you never say a thing is safe"* pushed me to write R5 (the map) at the same length as R1, when the honest map row is four sentences and a list of the guards a designer might trip — I cut it and it still runs long. **The gap I named in advance appeared and it was the same one as last time**: no shell, so not one date on this page was verified from history and not one guard was planted at, including the one I am asking somebody to build (G-D), which by §13a is the most persuasive kind of wrong. One thing I did not predict and should have: **my own four lines — *nothing · the public build · a person's browser · a key* — have no name for "the public repository"**, which is why `docs/` reads as private in this project, and that omission is mine, in my own register, and it is the row-one edge this run.

**Proposed persona edit** to `.claude/agents/zeni.md`, as exact text, inserted after the bullet ending *"…that is not "not published."… until something reads the thing a stranger actually receives."*:

> - **The four lines are not four. There is a fifth and it is the repository itself.** `docs/` is kept out of the box by `test/public.js:44`, which is why everyone here reads it as private — and `CLAUDE.md:14` says the repo is public. A register, a mock, an owner's ask, a third party's answer logged verbatim: all world-readable, all permanent, none of them in any guard's extraction step. **When somebody says "it's only in `docs/`", ask who else can read `docs/`.**

---

# MURAL PANEL

```
id:     zeni-la-caja-afuera
by:     "zeni"
iter:   8
date:   "2026-09-14"
title:  {en:"The crate the fence put outside",
         es:"La caja que la reja dejó afuera"}
said:   {en:"The fence that kept the key out of the box left it standing in the street.",
         es:"La reja que dejó la llave fuera de la caja la dejó parada en la calle."}
state:  {en:"Two crates on the pavement tonight: one sealed and ticketed, one with a key in it and no rail above it to hang a ticket on.",
         es:"Dos cajas en la banqueta esta noche: una sellada y con boleta, otra con una llave adentro y sin riel arriba donde colgarle boleta."}
who:    {en:"the customs clerk, who counts the crates nobody inspects as carefully as the ones somebody does",
         es:"la aduanera, que cuenta las cajas que nadie revisa con el mismo cuidado que las que sí"}
cap:    {en:"The public game's own scan reads every pack folder in the repository for the four forbidden words, which is right, and which is exactly why a household pantry carrying a key can never live there. So it goes and stands outside the fence — and every lock the private town owns is bolted to the private town's own door by name, so the new crate inherits not one of them. One guard doing its job perfectly opened an edge with nothing on it, and the only way to see it was to read both guards' extraction steps in the same hour.",
         es:"El escaneo del juego público lee cada carpeta de contenido del repositorio buscando las cuatro palabras prohibidas, y hace bien — y por eso mismo una alacena de la casa que carga una llave jamás puede vivir ahí. Entonces se va a parar afuera de la reja — y cada cerradura que tiene el pueblo privado está atornillada con nombre y apellido a su propia puerta, así que la caja nueva no hereda ni una. Una guardia haciendo su trabajo a la perfección abrió un renglón sin nadie enfrente, y sólo se veía leyendo el paso de extracción de las dos guardias en la misma hora."}
aspect: 0.46
```

**The hand, said plainly so nobody has to read the label:** my last panel was a loose declaration form — white paper, ruled fields, a rubber stamp. This one is **a bonded yard at closing time: pine crate boards, twine, a wax seal and a ticket rail** — warm timber and vermilion, not paper and ink, and not one tick box (that is Lupe's device and I repeated it once already).

```js
art:(g,W,H)=>{
  murGround(g,W,H);
  /* ZENI'S HAND, second visit. Not paper this time — TIMBER. A bonded yard: two crates on the
     same pavement, the fence between them, the ticket rail that stops at the last post. The left
     crate is sealed and has a ticket hanging over it. The right one has a key in it, its lid off
     its seat, and nothing above it at all. The clerk is inside the fence with her pen still up. */
  const PINE="#C9A263",SLAT="#A8823F",INK="#3A3226",VERM="#C03A22",RING="#7E2415",
        CHALK="#4E6C82",TWINE="#E4D7B4",BRASS="#D9A441",DUST="#B9AD92",PAPER="#EFE7D2";
  const base=H*0.78,pav=Math.max(2,H*0.045);
  g.fillStyle=DUST;g.fillRect(0,base,W,pav);
  g.fillStyle="#9E9377";g.fillRect(0,base,W,Math.max(1,H*0.014));

  const crate=(x,w,h)=>{const y=base-h,bt=Math.max(2,h*0.10),st=Math.max(2,w*0.08);
    g.fillStyle=PINE;g.fillRect(x,y,w,h);
    g.fillStyle=SLAT;g.fillRect(x,y,w,bt);g.fillRect(x,base-bt,w,bt);
    g.fillRect(x,y,st,h);g.fillRect(x+w-st,y,st,h);
    g.strokeStyle=SLAT;g.lineWidth=Math.max(1,w*0.05);
    g.beginPath();g.moveTo(x+st,base-bt);g.lineTo(x+w-st,y+bt);g.stroke();
    return y;};

  /* ---- inside the fence: the box we publish. Sealed, and its ticket is on the rail ---- */
  const ax=W*0.07,aw=W*0.25,ah=H*0.38,ay=crate(ax,aw,ah),lh=Math.max(3,ah*0.16);
  g.fillStyle=SLAT;g.fillRect(ax-aw*0.05,ay-lh,aw*1.10,lh);
  const sx=ax+aw*0.50,sy=ay-lh*0.45,sr=Math.max(3,aw*0.14);
  g.strokeStyle=TWINE;g.lineWidth=Math.max(1,H*0.010);
  g.beginPath();g.moveTo(sx,sy);g.lineTo(sx-aw*0.32,sy+ah*0.24);g.stroke();
  g.fillStyle=VERM;g.beginPath();g.arc(sx,sy,sr,0,7);g.fill();
  g.strokeStyle=RING;g.lineWidth=Math.max(1,sr*0.30);
  g.beginPath();g.arc(sx,sy,sr*0.56,0,7);g.stroke();

  /* the ticket rail — and it STOPS at the last post */
  const ry=H*0.16,px=W*0.50;
  g.fillStyle=INK;g.fillRect(W*0.04,ry,px-W*0.04,Math.max(2,H*0.020));
  [[W*0.15,H*0.13],[W*0.28,H*0.10]].forEach(t=>{const tx=t[0],th=t[1],tw=W*0.055;
    g.strokeStyle=INK;g.lineWidth=Math.max(1,H*0.008);
    g.beginPath();g.moveTo(tx+tw/2,ry);g.lineTo(tx+tw/2,ry+H*0.05);g.stroke();
    g.fillStyle=PAPER;g.fillRect(tx,ry+H*0.05,tw,th);
    g.fillStyle=DUST;for(let i=1;i<4;i++)g.fillRect(tx+tw*0.14,ry+H*0.05+th*i/4.6,tw*0.72,Math.max(1,H*0.008));});

  /* ---- the fence, and its terminal post ---- */
  const fy=H*0.30;
  g.fillStyle=INK;
  for(let x=W*0.355;x<px-W*0.014;x+=W*0.030)g.fillRect(x,fy,Math.max(1,W*0.009),base-fy);
  g.fillRect(W*0.355,fy,px-W*0.355,Math.max(2,H*0.018));
  g.fillRect(px-W*0.014,fy-H*0.06,Math.max(3,W*0.026),base-fy+H*0.06);

  /* the clerk, inside, pen still up — she can reach one crate and not the other */
  const hh=Math.max(11,Math.round(H*0.17));
  murBody(g,W*0.295,base-hh-Math.round(hh/3),CHALK,hh);
  g.strokeStyle=INK;g.lineWidth=Math.max(1,H*0.013);
  g.beginPath();g.moveTo(W*0.316,base-hh*0.85);g.lineTo(W*0.346,base-hh*1.35);g.stroke();

  /* ---- outside: the second crate. Lid off its seat, a key in the gap, no rail above it ---- */
  const bx=W*0.63,bw=W*0.25,bh=H*0.38,by=crate(bx,bw,bh),blh=Math.max(3,bh*0.16);
  g.save();g.translate(bx-bw*0.05,by-blh*1.25);g.rotate(-0.14);
  g.fillStyle=SLAT;g.fillRect(0,0,bw*1.10,blh);g.restore();
  const kx=bx+bw*0.50,ky=by-Math.max(2,bh*0.06),kl=Math.max(9,bw*0.44);
  g.strokeStyle=BRASS;g.lineCap="butt";
  g.lineWidth=Math.max(2,H*0.020);
  g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+kl,ky-kl*0.30);g.stroke();
  g.lineWidth=Math.max(1.5,H*0.015);
  g.beginPath();g.arc(kx-Math.max(2,H*0.018),ky+Math.max(1,H*0.006),Math.max(2.5,H*0.027),0,7);g.stroke();
  g.lineWidth=Math.max(2,H*0.017);
  g.beginPath();g.moveTo(kx+kl*0.70,ky-kl*0.21);g.lineTo(kx+kl*0.70,ky-kl*0.21+Math.max(3,H*0.036));g.stroke();
  g.beginPath();g.moveTo(kx+kl*0.90,ky-kl*0.27);g.lineTo(kx+kl*0.90,ky-kl*0.27+Math.max(3,H*0.036));g.stroke();

  /* two stencils, and only if they fit — type on this wall is absolute, the crates are not */
  g.font="bold 11px ui-monospace,monospace";g.textAlign="center";g.fillStyle=INK;
  const lab=(t,cx,cy,mw)=>{if(g.measureText(t).width<=mw)g.fillText(t,cx,cy);};
  lab("SELLADO",ax+aw/2,base-ah*0.44,aw*0.86);
  lab("SIN BOLETA",bx+bw/2,base-bh*0.44,bw*0.86);
  g.textAlign="left";}
```

**Note to the painter, since I could not run it:** I have no Bash this run, so **this panel has never been rendered.** Three things to look at before it goes on the wall — the clerk's pen line against the first fence bar at `W*0.355`, whether `SIN BOLETA` fits `bw*0.86` at the wall's course width (the `lab` guard drops it silently if not, which is the safe failure and also the invisible one), and the rotated lid's top edge against `ry+H*0.05`'s ticket. **Render it and look** — it is rule two of §12 and I could not obey it.

---

# research-map

PRE-FLIGHT
I intend to read the repo's own map code and rule book first, render the current map from the real game and measure it, then sweep the web for what other games did and reduce it to rules — and where the web and the house disagree, put both sides to the owner instead of averaging. A research lens with no persona is equipped for exactly one thing: reading widely and tagging what kind of evidence each sentence is, and this run has three prior sweeps whose shape I can copy. Where I expect to fall short, named in advance: the egress proxy will refuse nearly every primary source so most of my `[WEB]` will be search extracts dressed as reads unless I say so on every line; and having no persona and no flight notes, I have no last note to check myself against — so my first draft of "what the code does" will be the brief's `[MEMORY]` unless I grep every identifier myself.

THE DELIVERABLE

**0 · Sourcing, and it governs everything below.** 33 search extracts; 19 fetch attempts on 19 hosts; **16 hosts refused** (gameaccessibilityguidelines.com, gamedeveloper.com, gameuidatabase.com, w3.org, nngroup.com, publications.scss.tcd.ie, wildmoosegames.com, unmappedworlds.com, localoca.li, mic.com, blog.duolingo.com, gdconf.com, nookipedia.com, warcraft.wiki.gg, learn.microsoft.com, stamen.com). **Two pages read whole**, both W3C WCAG source via `raw.githubusercontent.com`. One PDF (Duolingo's 2024 whitepaper, S3) arrived as bytes; with no PDF tool installed a zlib pull gave 2,863 chars of subset-font noise — **not read**. So every `[WEB]` below is `(extract)` unless marked `(read)`. The sources that *measured* something are thin: one cartography study (n=127), one CHI'14 interview study, two W3C criteria, and my own measurements of this repo. The rest are designers saying what they did.

**1 · What the code does today — `[CODE]`, all grepped this hour, four screenshots in the scratchpad.**
- `drawTown()` `engine/engine.js:4751-4770`: paints tiles from `BASECOL`+`MAPCOL` at `s=10`, `TOWNLBL` labels gated by `when(flags)` (:4761-4764), a fixed legend line in `600 8px` (:4765-4766), one purple dot from `MAPDOT` (:4767-4769). `openMap()` :4772-4776; `#mapov` `index.html:625-632`; the town has the same overlay (`changarrito/index.html`, 3 hits) but declares `MAPDOT` only, no `TOWNLBL` (`changarrito/content/maps.js:170`).
- **The state the map needs already exists and is presence-only by law**: `worldPending(id)` :510 (*"never a count, never an age"*, the comment cites OWNER.md), `hasSay(n)` :611, `pendingAt(n)` :608, `qOpen(qi)` :415 (open by chapter — **no order inside a chapter**), the in-world ❗ :769, the world tag " · ❗" :511. `docs/OWNER.md:144`: *never build a quest log … the ❗ carries no count, colour or age*. `docs/OPEN.md:130`: find-quest mode was already asked on 2026-09-09; `docs/ASKS.md:150`: "little pins on the map… dynamic depending on open tasks" was deferred with a reason.
- **Measured at a 390-px phone** (`research-map-shot.js`, mock order 1 = *real game screenshot*, files `research-map-01-current-fresh.png`, `-03-current-after-ch1.png`): the box is 319.8 CSS px, the plan 281.8 CSS px for 30 tiles → **9.39 CSS px per tile**; the legend line renders at **7.5 CSS px**; the you-are-here dot at `MAPDOT.hq [14,0]` **sits on the letters "HQ" of "MERIDIAN HQ"** (`TOWNLBL[0]` x:15,y:0.75) on every fresh save; `MAPDOT.me [6,13]` sits inside "EL MERCADO ROBLES" (x:6,y:13.75); `hq` and `f2` share one dot.
- **Mock order 2 = *real game measured*** (`-02-mock-pending-fresh.png`, `-04-mock-pending-after-ch1.png`): I drew a `!` disc wherever the engine's own `hasSay`/`worldPending` was true, no new state. Fresh save: five worlds pending (hq, f2, st:lupe, lo:xochi, lc:rosa+chuy) → four marks on the plan; after district 1: f2 and me → two. A 14-px backing disc arrives at **13 CSS px** — legible, not tappable; and two of four landed on top of labels. That collision is the finding, not the mock.
- `openTravel()` :4780-4796 is the only travel path (`rideCan()&&rideStart(d)`, else teleport+`worldArrived`); `TRV` has two stops (`content/meridian/maps.js:288`); *never train→floor* (`maps.js:276-278`, owner 2026-09-03). `test/smoke.js:1859` checks only that `drawTown()` does not throw.

**2 · The sweep, by the brief's headings.**
- *Markers and conventions.* WoW: gold `!` available, `?` complete, silver `!` not yet (level), blue repeatable `[WEB]` https://warcraft.wiki.gg/wiki/Quest (extract); that WoW popularised the `!`/`?` pair in 2004 is `[TRAINING]` — the extract could not confirm origin. Stardew: a `!` floats over the bulletin board when a quest is up, presence not colour `[WEB]` https://stardewvalleywiki.com/Quests (extract). Candy Crush: *"the button to play the next level constantly animating"*; locked levels sleep `[WEB]` https://tipsmake.com/what-designers-can-learn-from-the-amazing-ux-design-of-the-candy-crush-game (extract, opinion). Duolingo 2022: tree → one linear path because *"learners weren't sure whether they're using Duolingo the correct way"* `[WEB]` https://blog.duolingo.com/new-duolingo-home-screen-design (extract, vendor); outcomes whitepaper https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_write_speak_2024.pdf (bytes only, unread).
- *Next objective without a log.* Outer Wilds' log flags "more to explore" on a place already found, never what you have not found — already `docs/ARCH-LOG.md:87-107` `[WEB]` https://gdcvault.com/play/1027008/Independent-Games-Summit-Sparking-Curiosity (extract). Elden Ring: Guidance of Grace is a *direction*, not a destination `[WEB]` https://gamerant.com/elden-ring-how-track-quests/ (extract, guide). AC Odyssey Exploration mode names a region and a bearing; Ubisoft says it is the intended way `[WEB]` https://techraptor.net/gaming/guides/understanding-differences-between-assassins-creed-odysseys-guided-and-exploration (extract, vendor). The cautionary: Todd Howard on why Oblivion's compass cannot be turned off — *"We tried really hard in the previous games to tell you where things were – we just did a crappy job"* `[WEB]` https://en.uesp.net/wiki/General:Todd_Howard_Shivering_Isles_Interview (extract). Far Cry 5 dropped the minimap so you are *"not staring at a little corner of your screen"* and towers because they *"pop everything up"* `[WEB]` https://gamerant.com/far-cry-5-tower-mini-map/ (extract, vendor). Tsushima's wind; BotW's triangles (CEDEC 2017) `[WEB]` https://www.nintendolife.com/news/2017/10/zelda_breath_of_the_wilds_ingenious_design_is_all_about_triangles_apparently (extract); Journey's mountain; Disney's *weenie* `[WEB]` https://en.wikipedia.org/wiki/Weenie_(design) (extract). Measured: Moura & Bartram CHI'14 — players tested against cue types, *"several factors interfering with navigation beyond wayfinding cues"* `[WEB]` https://dl.acm.org/doi/10.1145/2559206.2581328 (extract, no numbers reached me). TCD 2020 dissertation on navigation aids, unread `[WEB]` https://publications.scss.tcd.ie/theses/diss/2020/TCD-SCSS-DISSERTATION-2020-021.pdf.
- *Legends on small screens.* **The one measured cartography result**: 127 respondents; navigation-app users *"generally use the maps without referring to their legends, which are not shown in the default settings. In such circumstances, only intuitive symbols are read correctly"* `[WEB]` https://sciendo.com/article/10.2478/pcr-2022-0003 (extract). OS cartography guide: hide the legend in a panel on mobile; omit self-explanatory symbols `[WEB]` https://docs.os.uk/more-than-maps/geographic-data-visualisation/guide-to-cartography/map-legends (extract). Animal Crossing's map shows buildings and terrain and deliberately not villagers, items or tasks `[WEB]` https://nookipedia.com/wiki/Map (extract). BotW stamps: 100, *"never explicitly labeled, so you can assign your own meaning"* `[WEB]` https://zelda.fandom.com/wiki/Stamp_(Object) (extract).
- *Fog / greying.* Static fog (revealed stays revealed) vs dynamic (re-hides) `[WEB]` https://www.resetera.com/threads/fog-of-war-mechanic-for-in-game-maps.91618/ (extract, forum). A Short Hike: no map at all, landmarks carry it `[WEB]` https://www.cozygamecabin.com/reviews/a-short-hike-review/ (extract).
- *Tap-to-travel.* Spiritfarer: set a waypoint on the map, then confirm travel `[WEB]` https://localoca.li/posts/393/spiritfarer-map-controls-set-waypoints-and-confirm-travel (title-only extract). Fast travel is from a map or a vehicle, to discovered places `[WEB]` https://en.wikipedia.org/wiki/Fast_travel (extract). Hold-to-confirm as deliberate friction `[WEB]` https://uxplanet.org/confirmation-dialogs-how-to-design-dialogues-without-irritation-7b4cf2599956 (extract).
- *Accessibility.* **WCAG 2.5.8 (read)**: *"The size of the target for pointer inputs is at least 24 by 24 CSS pixels"*, exceptions spacing/equivalent/inline/user-agent/essential `[WEB]` https://raw.githubusercontent.com/w3c/wcag/main/guidelines/sc/22/target-size-minimum.html. **WCAG 1.4.1 (read)**: *"Color is not used as the only visual means of conveying information"* https://raw.githubusercontent.com/w3c/wcag/main/guidelines/sc/20/use-of-color.html. Game Accessibility Guidelines, GTA IV map example: icons not colours — a colour-only map is *"impossible for color blind gamers… frustrating for everyone else who must remember what everything equates to"* `[WEB]` https://gameaccessibilityguidelines.com/grand-theft-auto-iv-map/ (extract). NN/g: 1 cm × 1 cm targets; map pins are the named failure case `[WEB]` https://www.nngroup.com/articles/touch-target-size/ (extract). Apple 44 pt `[TRAINING]`.

**3 · Ten rules, in the shape of `docs/GENRE-RULES.md`, numbered M so they do not collide with R1–R17.** Two are RULEs (engine, both games): M1 and M6/M10. Three are CHOICEs (pack seams): M3, M4, M7's stop list. The rest are practice.

**M1 · The mark on the plan is the mark in the world, and it means one thing: somebody here has something to say.** Same glyph as `engine.js:769`, driven by `worldPending`/`hasSay`, present or absent. `[CODE]` :510-511, :611; `docs/OWNER.md:144`; `[WEB]` Stardew, Outer Wilds (extracts). **Trap:** WoW's second glyph — a `?` for "done" — reads as a state a person carries, and here nobody carries "done" (*no practice is ever missed*, OWNER.md:141-144). **A3:** presence is the record of the present and is legal; the first mark that says "later" is the list.

**M2 · Never a count, a colour or an age — on the mark, on the button, on the district.** `[WEB]` WCAG 1.4.1 (read), GAG (extract); `[CODE]` OWNER.md:144 and the comment at :506-509. A "3" badge on `#mapbtn` (`index.html:438`) is the fastest way to *find* and the banned thing; painting a district by `flags.grade` on the plan is R16's tell (`worldFlags` :4741-4750 hands the map the grade, and its own comment warns *not begun is not done well*). **Trap:** colour-by-state is the whole genre's habit (gold/grey/blue) and arrives as a one-line improvement. **A3:** a count is a list with the names removed.

**M3 · One next thing may pulse only where the content has an order — a CHOICE the pack declares, `path` or `open`.** `[WEB]` Duolingo (vendor extract), Candy Crush (opinion extract). `[CODE]` `qOpen` :415 opens by chapter and has no order inside one; Meridian is `open`. **Trap:** manufacturing an order so there is something to animate — that is a to-do list with a heartbeat. **A3:** a `path` pack accepts a list of the future by design (Duolingo is one); an `open` pack may not, so this seam is the line between the two games.

**M4 · Fog the place, never the person.** An unopened district is a lot with a present-tense name, exactly what `TOWNLBL.when` already does (`maps.js:263-268`: "LOT: EL MERCADO" → "EL MERCADO ROBLES"); fog is static — revealed stays revealed (R11). `[WEB]` static vs dynamic fog (forum extract); Far Cry towers "pop everything up" (vendor extract). **Trap:** dynamic fog that re-hides what you walked away from, or hiding the ❗ of people inside a district you have not opened (they cannot have one — `qOpen` — but a wandering `chat:1` neighbour with a `doc` can, :611). **A3:** "LOT" is what the parcel *is*; "COMING: TALLER" is the future and may not be painted.

**M5 · No legend on a phone: the mark is its own legend and a tap says the place's name.** `[WEB]` the n=127 study (extract) — only intuitive symbols are read without a legend; OS guide (extract). `[CODE]` today's legend is `600 8px` at 300 backing → **7.5 CSS px at 390** (:4765-4766, measured). **Trap:** replacing a legend with a longer legend, or with icons that need learning. **A3:** none.

**M6 · A tap target is a place, not a tile: 24×24 CSS px minimum, 44 pt / 1 cm comfortable, 24 px apart.** `[WEB]` WCAG 2.5.8 (read), NN/g (extract). `[CODE]` **9.39 CSS px per tile measured** — 2.5× too small; the target is the label's box or the district's bounding box. **Trap:** hit-testing the tile grid; two places on one target (`hq`/`f2` share `MAPDOT [14,0]`, `maps.js:274`). **A3:** none.

**M7 · Tap-to-travel drives the real path and confirms by naming the destination, never by "are you sure".** `[CODE]` the map calls the same `rideCan()&&rideStart(d)` / `worldArrived` as `openTravel()` :4780-4796; stops are `TRV` (`maps.js:288`); never to a floor (`maps.js:276-278`). `[WEB]` Spiritfarer waypoint→confirm (title extract); R13. **Trap:** a second travel system that teleports — `docs/REGRESSION.md` §3 #12 is the guard that called `rideStart()` directly and proved nothing. **A3:** a tap on a place is present tense; a "go to next ❗" button is a list of one.

**M8 · The world guides first; the plan answers "where else".** `[WEB]` Far Cry 5, Tsushima, BotW triangles, Journey, weenies (all extracts; none measured). `[CODE]` the in-world ❗ :769 and the world tag :511 are the primary; `docs/OPEN.md:139-141` says the ❗ is today the *only* thing that says what is next. **Trap:** the GPS effect — a plan good enough to be opened first, every session; and the opposite failure, which is today's: a plan with nothing on it. **A3:** a record of present ❗ is legal; opened first it *behaves* like a checklist, and behaviour is what A3 is about.

**M9 · Say the place, not the route — and only a place you can reach.** `[WEB]` Elden Ring's direction-not-destination, Odyssey's region name, Howard's warning that no marker plus bad directions is the worst of both (extracts). `[CODE]` `locs` names every world (`strings.js:47`); a wandering neighbour walls 35 tiles one run in twenty-five (`docs/BACKLOG.md:226`) — a mark on Doña Meche while the gap is blocked is a lie. **Trap:** naming a place the player cannot walk to right now. **A3:** none.

**M10 · Labels and marks are laid out together; nothing covers the you-are-here, and one dot draws one mark.** `[CODE]` measured on `main` today: the dot covers "HQ" on every fresh save; `me`'s dot sits in its own label; `hq`/`f2` share a dot. **Trap:** `TOWNLBL.y` is a *baseline* in tiles and `MAPDOT.y` is a *row* — two meanings of `y` in one file (`maps.js:260-274`). **A3:** none.

QUESTIONS FOR THE OWNER
1. **One next, or all open?** *For one next:* your words tonight — *"find the next quest … when its games like my learning -meridian- path"* (`docs/ASKS.md:250`) — and the learning-path convention (Duolingo's single path, Candy Crush's one pulsing level) is exactly that. *Against:* `docs/OWNER.md:144` *never build a quest log … the ❗ carries no count, colour or age*, `docs/BACKLOG.md:175`, `docs/ARCH-LOG.md:99-107` (no list of the future), and `qOpen` (`engine.js:415`) has no order inside a chapter — Meridian's content has no "next" to point at. Without your word I would build the 2026-09-09 ask (`docs/OPEN.md:130`): every open ❗ on the plan, presence only, none pulsing. Does Meridian get a "next" at all, or is "next" a seam for a `path` pack?
2. **Does the map button say anything?** *For:* to "find" from the street you need to know the plan has something on it; a dot (no number) on `#mapbtn` is present-tense and A3-legal. *Against:* OWNER.md:144 forbids count/colour/age on the ❗ and the world tag already carries " · ❗" for the room you are in (`engine.js:511`); a dot on a button is a notification, and this game has refused every notification-shaped thing so far. Dot, or nothing?
3. **Tap-to-travel: anywhere, or trolley stops only?** *For anywhere:* the shortest "find the quest" is tap the mark, arrive. *Against:* your 2026-09-03 rule — *"i dont like that i go from a train to a floor… make the world realistic"* (`content/meridian/maps.js:276-278`) — and `TRV` has two stops (`maps.js:288`). My proposal needs your yes: tap a place → if it has a stop, the ride; otherwise the plan names the nearest stop and you walk from it.

WHAT I DID NOT CHECK
- No primary page read except two W3C criteria; every game claim is a search extract, and the Duolingo and TCD papers are cited unread. WoW's colour set is from a wiki extract, not the client.
- No person cold-read my mock marks; "legible at 13 CSS px" is my eye, not a measurement of meaning (§13j).
- I did not run `test/smoke.js` or `test/town.smoke.js`; nothing I did touches the tree, but the town's map (which has `MAPDOT` and no `TOWNLBL`) was not rendered.
- Landscape (844×390) was not shot — `docs/POSTMORTEM.md` §13o says no suite ever has.
- The fresh-save pending list's `f2: ["~c1","~c2"]` — I did not find out what those two are (a `doc`-carrying host, by `hasSay`'s third clause?); the count "five worlds" depends on it.
- Whether a `chat:1` neighbour with a `doc` in an *unopened* district can be pending (M4's trap) is read off `hasSay`, not planted.
- The `-03` screenshot was taken but I looked at 01, 02 and 04 only.

POST-FLIGHT
Having no persona got one thing right by accident: with nothing to defend, I rendered the current map before reading a single extract, and that is where the only unarguable findings came from — 9.39 CSS px per tile, a 7.5-px legend, the dot on "HQ" — and where the collision with OWNER.md:144 surfaced, forty minutes before any game told me to colour the mark. Where it was silent: I have no trade paper for "measured a thing" versus "found a thing", so my sweep leans on designers describing intent and I could not compensate with a persona's own instrument. The gap I predicted appeared exactly as predicted — sixteen refusals, everything an extract — and the second half of it too: three `[MEMORY]` lines in the brief survived only because I grepped them (`pendingAt`, `openTravel` and `MAPDOT` were where the brief said; the brief's claim that *nothing* on the map says what is next was true, and its `[MEMORY]` about the app feel I never needed). Persona edit: **none, and here is why not** — there is no `research-map` file to edit; if the calling session ever gives the research lenses a file, the one line I would put first is *"Render the current state from the real game before opening the web; the repository's own rule book has usually already answered half the question, and it is the half you can cite by line."*

MURAL PANEL
```
id:     research-map-la-ficha-sin-color
by:     "research-map"
title:  {en:"The uncoloured mark", es:"La marca sin color"}
said:   {en:"The games the whole world plays colour the mark by its state — gold open, grey not yet, the next one pulsing. This house signed on the first of September that the ❗ carries no count, colour or age: the plan may say WHERE, and never HOW MANY.",
         es:"Los juegos que juega todo el mundo pintan la marca según su estado — dorado abierto, gris todavía no, el siguiente latiendo. Esta casa firmó el primero de septiembre que el ❗ no lleva cuenta, color ni edad: el plano puede decir DÓNDE, y nunca CUÁNTOS."}
state:  {en:"Holding that the next quest he asked for is a place on the plan and not a row on a list, and that every source in my sweep is a keyhole, not a page.",
         es:"Sostengo que el siguiente quest que él pidió es un lugar en el plano y no un renglón en una lista, y que cada fuente de mi barrida es una cerradura, no una página."}
who:    {en:"research-map, a lens with no persona, who reads what other games measured",
         es:"research-map, un lente sin persona, que lee lo que otros juegos midieron"}
cap:    {en:"Thirty-three search extracts and sixteen doors shut in my face; two pages read whole, both a standards body's, and one PDF that arrived as bytes I could not read. The line that settles tonight's question was not on the web at all: it was in this repository's rule book, signed on the first of September in the owner's own words. The genre's habit and the house rule point opposite ways, and neither is mine to average.",
         es:"Treinta y tres extractos de buscador y dieciséis puertas cerradas en la cara; dos páginas leídas enteras, las dos de un organismo de normas, y un PDF que llegó en bytes que no pude leer. La línea que zanja la pregunta de esta noche no estaba en la web: estaba en el reglamento de este mismo repositorio, firmada el primero de septiembre con las palabras del dueño. La costumbre del género y la regla de la casa apuntan en sentidos opuestos, y no me toca a mí promediarlas."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* RESEARCH-MAP'S HAND — a catalogue card. My trade's paper is the 3x5 index card in a library
     drawer: a red rule at the head, blue feint below, one hole at the foot for the rod. The finding
     is typed on it the way a cataloguer types a subject heading; the chips down the left are the
     only drawing, and the fourth one is empty on purpose. The provenance is a rubber stamp, because
     a card written from an extract and not from the page says so in its own corner. */
  const cw=W*0.86, ch=H*0.80, cx=W*0.07, cy=H*0.05;
  g.save(); g.translate(cx+cw/2,cy+ch/2); g.rotate(-0.024); g.translate(-cw/2,-ch/2);
  g.fillStyle="rgba(30,25,20,0.20)"; g.fillRect(4,5,cw,ch);                 /* the card's shadow on the wash */
  g.fillStyle="#F7F2E4"; g.fillRect(0,0,cw,ch);                                /* the card */
  g.strokeStyle="#A9BED6"; g.lineWidth=1;                                      /* blue feint */
  for(let y=ch*0.30;y<ch-10;y+=13){g.beginPath();g.moveTo(8,y+.5);g.lineTo(cw-8,y+.5);g.stroke();}
  g.strokeStyle="#C8443A"; g.lineWidth=1.5;                                    /* the red head rule */
  g.beginPath();g.moveTo(0,ch*0.19);g.lineTo(cw,ch*0.19);g.stroke();
  g.fillStyle=P.wash; g.beginPath(); g.arc(cw/2,ch-9,5,0,7); g.fill();          /* the rod hole */
  g.strokeStyle="#B9B19D"; g.lineWidth=1; g.stroke();
  g.textAlign="left"; g.textBaseline="alphabetic";
  g.fillStyle="#2E3440"; g.font="bold 12px ui-monospace,monospace";           /* the subject heading, typed */
  g.fillText("MARKER, QUEST \u2014 colour by state",10,ch*0.14);
  const rows=[ ["#E4B429","WoW  2004",      "gold open \u00b7 grey soon \u00b7 blue again"],
               ["#58CC02","Duolingo 2022",  "one path, one next, and it pulses"],
               ["#E8467C","Candy Crush",    "next level breathes \u00b7 rest sleep"],
               [null,     "Meridian 1 Sep","no count, colour or age \u00b7 OWNER.md"] ];
  g.font="11px ui-monospace,monospace";
  rows.forEach((r,i)=>{const y=ch*0.30+13*(i+1)-3;
    if(r[0]){g.fillStyle=r[0];g.fillRect(10,y-8,9,9);}                        /* three coloured chips */
    else{g.strokeStyle="#2E3440";g.lineWidth=1;g.strokeRect(10.5,y-7.5,8,8);   /* and one left empty */
         g.beginPath();g.moveTo(11,y);g.lineTo(18,y-7);g.stroke();}
    if(i===2){g.strokeStyle="#E8467C";g.globalAlpha=.45;g.lineWidth=1.5;      /* the pulse, drawn as a ring */
              g.strokeRect(7.5,y-10.5,14,14);g.globalAlpha=1;}
    g.fillStyle="#2E3440"; g.fillText(r[1],24,y);
    g.fillStyle=(i===3)?"#C8443A":"#3B4A5C"; g.fillText(r[2],cw*0.34,y);});
  g.fillStyle="#2F4A6B"; g.font="italic 11px ui-monospace,monospace";         /* the cross-reference, in the other ink */
  g.fillText("SEE ALSO: a \u2757 is a place, not a number.",10,ch*0.30+13*6-3);
  g.font="11px ui-monospace,monospace"; g.fillStyle="#7A8794";
  g.fillText("filed 14 Sep",10,ch-6); g.fillText("33 extracts",cw/2+14,ch-6);  /* the accession line, either side of the hole */
  g.restore();
  g.save(); g.translate(W*0.82,H*0.15); g.rotate(0.14); g.globalAlpha=0.62;    /* the rubber stamp, red ink, off-square */
  g.strokeStyle="#B3232A"; g.lineWidth=2; g.strokeRect(-56,-16,112,32);
  g.fillStyle="#B3232A"; g.font="bold 11px ui-monospace,monospace"; g.textAlign="center";
  g.fillText("EXTRACT ONLY",0,-3); g.fillText("16 HOSTS REFUSED",0,10);
  g.restore(); g.textAlign="left";}
```
Material: a library catalogue card — card-white `#F7F2E4`, blue feint `#A9BED6`, red head rule `#C8443A`, typewriter ink `#2E3440`, stamp ink `#B3232A`; `MURPAL` used only for the ground and the rod hole. Rendered through `changarrito/content/murals.js`'s own helpers (mock order: canvas drawing, and I say so): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/research-map-panel.png`; the four map shots and both scripts sit beside it under `research-map-*`. First visit to the wall; there is no earlier `research-map` bay to differ from.
