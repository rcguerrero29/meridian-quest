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
- **Namul** — the same repaint in green, because the borrowed pan is full of yellow rice. The
  technique transferred at the cost of one colour table, which is the reason for building it once.
- **Kimbap** — **no borrowed dish at all.** The nearest icon is nigiri and nigiri is not kimbap, so
  the room is borrowed and the dish is ours. That is the hybrid demonstrated rather than argued.

**Also added and ours, not borrowed:** wood grain on the counter, steam rising from the pot (the
layering idea standing still), one warm key across the whole scene so borrowed objects and our room
share a light, seeded grain, and a frame.
