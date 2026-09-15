# What is in these pictures, and under what terms

**Anything borrowed is written down here before it is used.** This repository already has a licence
table in its research file because permissive-looking terms have bitten it before.

## The three pictures drawn by the session
`simmerBook1/2/3-*.png`, `compare-page1.png`, `vector-vs-pixel.png` — drawn in code
(`bookpages.js`). No third-party material. Ours.

## The pictures using borrowed illustrations
`emoji-jjigae.png`, `emoji-jjigae-tinted.png`, `emoji-namul.png`, and the right-hand two panels of
`three-ways.png`.

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
