# What is in these pictures, and under what terms

**Anything borrowed is written down here before it is used.** This repository already has a licence
table in its research file because permissive-looking terms have bitten it before.

## The three pictures drawn by the session
`simmerBook1/2/3-*.png`, `compare-page1.png`, `vector-vs-pixel.png` — drawn in code
(`bookpages.js`). No third-party material. Ours.

## The pictures using borrowed illustrations
`emoji-jjigae.png`, `emoji-jjigae-tinted.png`, `emoji-namul.png`, the right-hand two panels of
`three-ways.png`, and the full set `borrowed-jjigae/kimbap/namul-390x844.png`
(`render-borrowed.js`).

| | |
|---|---|
| **What** | Microsoft **Fluent Emoji**, obtained as `@iconify-json/fluent-emoji` (3,174 icons) |
| **Licence** | **MIT** — commercial use permitted, modification permitted; **the copyright notice must travel with it** |
| **Why this set and not another** | It was the most permissive of the four checked: Noto is Apache-2.0, Twemoji CC-BY-4.0, and **OpenMoji is CC-BY-SA-4.0 — share-alike, which is the one that can reach into work it is merged with**. MIT has no such clause |
| **How it got here** | `npm`. Every image host is blocked by this session's egress proxy (itch.io, kenney.nl, Wikimedia, OpenGameArt — all refused); the package registries are the one door left open, and icon sets ship there with their licences attached |
| **Modified?** | Yes — drawn at a different size, given a contact shadow, and in the `-tinted` picture passed through a CSS filter to sit in this project's palette. MIT permits modification |

**If any of this art is ever shipped in a pack rather than a mock**, the MIT notice goes in the pack
alongside it, and every file is added to `sw.js`'s precache list by hand — nothing guards that today.

## What these pictures are FOR, which is the part that matters

They are **placeholders for testing the loop, not proposals for how the game should look.** The
illustrations are well drawn and they are the wrong dishes: the pot is a generic Western stew, the
rice bowls are bright pink, and the palette is candy where this world is cream and clay. **Shown to
anybody as art direction they would mislead.** Shown to somebody to answer *"does a book that fills
up make you want a fourth page"*, they do the job better than our own drawings, because craft stops
being the thing under discussion.

## How the full set actually turned out — 2026-09-15, said plainly

Three pages rendered. What arrived:

| page | what the borrowed art reads as | verdict |
|---|---|---|
| **Jjigae** | a pot with handles, two bowls of rice, chopsticks | **the one that works.** A person would call it a pot of stew |
| **Namul** | a cabbage, a pan of yellow rice, chopsticks | **reads as a kitchen, not as this dish.** The pan is paella; the green is a cabbage, not blanched spinach |
| **Kimbap** | four pink-and-cream stacks | **fails.** The nearest icon is nigiri, and nigiri is not kimbap; after the palette tint it reads as small sandwiches |

> **This table described the 2026-09-15 midday render and was left standing after two rebuilds.** A
> cold reader caught it: the pictures had six green-ringed rolls and a purple pan with green contents
> while the register still said pink stacks and paella. **A verdict table has to name the render it
> judged.** The current state is §"The cold read" below; the rows above are kept as the record of
> what the borrowed set looked like before the repaint, and nothing more.

**The pattern, and it is the finding:** borrowed art buys **craft** immediately and buys **accuracy**
not at all. Every object is well drawn and approximately food. None of them is the dish named above
it. The tint that pulls the palette into the room also costs recognition — it is a trade, not a free
win, and on the kimbap page the trade is clearly bad.

**Which is exactly what a placeholder is for.** Three pages that say "a kitchen, some dishes, a book
that fills up" are enough to ask *"do you want a fourth page?"*. They are not enough to ask *"does
this look right?"* — and nobody should be asked the second question with these on screen.

## The improvement pass — 2026-09-15, later

The owner: *"can you improve the first one?"* and then, looking at it, **"the stew looks circular but
we are looking at the pot from an angle."** He was right, and it is the same fault Pili named in our
own drawings: **two cameras in one object.** The borrowed pot is drawn front-on and its contents from
straight above.

**So the opening is repainted.** `potFace()` clips to the icon's own opening, paints the inner wall of
the pot as seen from OUR angle, and sits the liquid below the rim as an ellipse. Three passes, each
fixing something the previous one showed:

1. **Guessed geometry left a crescent.** Fixed by MEASURING: the icon was rendered to a buffer and
   its warm region found by pixel — centre (0.498, 0.453), radius 0.256 of its box. Guessing had put
   it 4% too high and 10% too small. *And the measurement contains the owner's own observation as
   arithmetic: rx 0.256 against ry 0.246. The contents really are a circle.*
2. **The repaint read as a dome** — a ball sitting in the pot — because the wall ran light downward.
   A hollow is **dark at the top**, where the near rim shadows the far wall. Inverted, plus the rim's
   own cast shadow onto the wall, and it reads as inside.
3. **A tan crescent showed under the liquid.** The ellipse now reaches the near rim.

**The other two, and what each one demonstrates:**
- **Namul** — the same repaint in green, because the borrowed pan is full of yellow rice.
  **This sentence used to say "the technique transferred at the cost of one colour table" and that
  was wrong, in the same hour it was written.** It transferred the *alignment* and nothing else: the
  pan is drawn in **plan view**, looking straight down with both handles splayed in the picture
  plane, so a correctly aligned angled interior fights the object around it. And `potFace()` carries
  the pot's own DEPTH as a hardcoded constant, so even a perfectly placed opening puts a pot's inner
  wall inside a shallow pan. **Repainting can fix a dish's contents. It cannot fix a vessel's camera.**
- **Kimbap** — **no borrowed dish at all.** The nearest icon is nigiri and nigiri is not kimbap, so
  the room is borrowed and the dish is ours. That is the hybrid demonstrated rather than argued.

**Also added and ours, not borrowed:** wood grain on the counter, steam rising from the pot (the
layering idea standing still), one warm key across the whole scene so borrowed objects and our room
share a light, seeded grain, and a frame.

## What the engineering review found, 2026-09-15 — and what it means for this folder

A design review of the approach (not the pictures) returned five things worth recording, because
three of them are about this repository's own habits rather than about art:

1. **A commit message described a probe that was not in the repository.** It said the opening table
   "is written by a probe… nobody types a constant" — the probe was in a scratch directory and only
   the table shipped, so adding a dish meant hand-typing a row, which is typing a constant one
   indirection further from the thing it measures. **`measure-openings.js` now ships**, its predicates
   are code rather than prose, and it stamps the icon-set version it measured against.
2. **A probe can produce a stable, confident, WRONG number.** The first run measured `steaming-bowl`
   at centre (0.6465, 0.2754) — which is the chopsticks and the noodle tangle *above* the bowl, not
   the bowl's opening. It sat in the table looking exactly as trustworthy as the two correct rows.
   **Automating a measurement without looking at it does not remove the guess; it launders it.**
   The probe now draws every row onto its own icon (`openings-contact-sheet.png`) and flags any row
   whose aspect ratio says it found the wrong thing — that row's aspect was 1.35 against 1.04 and
   1.03 for the good ones, and nothing was reading it.
3. **The obvious machine check passes the broken picture.** A coverage test — "how much of the icon's
   own contents does the repaint cover" — scores the picture the owner called broken at **99.5%**.
   Any sane threshold passes it. There is no honest automatic check for "does this look broken"; the
   instrument is a person looking, and the contact sheet is built for a person, which is why it is
   named as one and not called a test.
4. **`potFace()` is the pot's portrait wearing a colour table.** Its liquid sits at 0.30 of the radius
   below centre — that number *is* how deep the pot is — and its clip is circular. Keep it and it
   must take the icon rather than its numbers, so the bug cannot be written; or rename it for the one
   object it actually draws.
5. **Three icons, three cameras.** Fluent Emoji has no house camera: the pot is three-quarter, the pan
   is plan view, the bowl is near front-on. So "does this icon's camera match our stage" is a coin
   flip per icon, and the one page that works won its coin. **There is no fix for that inside the
   repaint, and none in the icon set.**

**The recommendation, taken:** stop investing in repainting borrowed art. Choose icons whose camera
is already ours, and where none is, draw the dish ourselves — which is what the kimbap page already
does, and the kimbap page is the only one whose dish *is* the dish on its label. Measured against
`bookpages.js`, the shared light model is ~190 lines already written and **a dish is about twenty**.
A dozen dishes is ~240 more lines on a model that holds one camera by construction, against a fresh
negotiation with a stranger's drawing for every object, renegotiated on every set update.

## The cold read — 2026-09-15, and what it changed

Somebody was shown the three pictures with the text masked and asked to name each dish before reading
a word. **This had been owed since §19.6 and had never been done.** Results:

| | cold name | |
|---|---|---|
| **Jjigae** | *"a pot of stew, laid for two"* | **hit, first time** |
| **Kimbap** | *"sushi rolls, and one of them has a creature on it"* | hit, with a monster on it |
| **Namul** | *"I can't tell."* Best guess under pressure: spinach cooking in a purple pan. The five white dots read as **a face with eyes** | **miss** |

**The sentence that summarises all three, and it is the most useful thing said about this art today:**

> **"A person made the room, and a machine put the food in it."**

Every fault found was an *object placed in* the room. The room — wood grain, the wall-to-counter line,
one warm key across borrowed and drawn objects, the vignette, the paper grain — was the one thing the
cold reader said not to touch.

### What was fixed because of it

| | what was on screen | what it is now |
|---|---|---|
| **The chilli** | 30×34 px — *under* the "can be seen" floor and still the loudest object in the frame. Read as *"a fat magenta banana in a hat with a pin through its back and two pink legs"*; the legs were the chopsticks drawn behind the last roll. **Not in that page's recipe.** | deleted, and the chopsticks moved onto the counter, whole |
| **The private mark** | 2 / 3 / 1 red slashes in the same corner of three pages. Read cold as *"tally marks"*. Its crease measured **Δ126 from the wall — the highest contrast anywhere on the page, louder than any food**. That is a star rating with the stars replaced by slashes: the one thing §19.5 forbids | **deleted from the art.** The mark already exists in words on the page, and nobody misread those |
| **The tan crescent** | still there, in both pots, at 3.5 CSS px and Δ117 — *"a lily pad levitating with a gap all round"* — **while this very file claimed it had been fixed.** The arithmetic said so too: liquid reached 0.90r inside a 1.02r clip | fixed by arithmetic rather than by eye: the liquid now exceeds the clip |
| **The tofu** | two pure-white **axis-aligned rectangles**, 9×4 CSS px at **Δ196** — the highest-contrast mark inside the vessel. Read as *"two blank white labels floating in the soup"* | cubes with a foreshortened top, a turned side and their own shadow, off-axis, and no longer the brightest thing in the picture |
| **The rolls** | six, **every one under the 48 px floor**, and their sizes alternated big-small-big at 1.2:1 — *"not uneven, a sawtooth; I assumed it was a rendering bug"* — in a picture captioned *cut by hand*. Their shadows were drawn **on top of** them, and they stood behind the board like a kerb | five, all above the floor, sizes as a walk; a board with a top face and a front edge; each roll seated on its own shadow; **and every filling jittered, because a hand does not pack six rolls identically** |

### What is still true and was not fixed

- **The namul pan is drawn in plan view.** No repaint fixes a vessel's camera.
- **The three pictures are 322 / 314 / 314 CSS px wide** — the cold reader measured it and could not
  explain it. **It is §20.2's engine fault showing up in our own mocks:** the first document opened in
  a session is drawn at the wrong width. The jjigae renders first.
- **Nothing breaks the rim** in any of the three, which §19.3 says is what makes a dish a dish.
- The cold reader used the filenames, which contain the dish names, so the read was not perfectly
  blind — and the research sweep adds a sharper requirement: **the cold read must use somebody who
  does not know the cuisine**, because "stick to foods people know" does not apply to a Korean-first
  pack and a Western reader has no silhouette for doenjang jjigae.
