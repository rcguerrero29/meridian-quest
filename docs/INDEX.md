# The index — every document in this project, and when you'd open it

> *"i was trying to find the project documents on my machine, can we make sure we have access to all
> these so i can review when you are offline/out of tokens?"* — the owner, 2026-09-20

**They were already on your machine.** Everything in this folder is plain text in the repo, so your
clone has all of it. What was missing was this page: 34 files at the top level with names like
`GAUGE` and `MINOR`, and nothing telling you which one answers the question you actually have.

---

## Three ways to read these when nobody is running a session

**1 · On your laptop, offline — you already have them.**

```
cd ~/code/meridian-quest
git pull origin main
open docs/                  # or: code docs/   — VS Code renders markdown with ⇧⌘V
```

That is the whole thing. No build step, no server, no session. If `git pull` says you are behind,
that is why you could not find the newest ones.

**2 · On your phone or anywhere with a browser** —
[github.com/rcguerrero29/meridian-quest/tree/main/docs](https://github.com/rcguerrero29/meridian-quest/tree/main/docs).
GitHub renders every file, and its search box searches inside all of them at once. This is the one
to use when you are away from the laptop; it needs nothing installed.

**3 · Not the game's website.** `meridian-quest` on GitHub Pages serves **only the game** —
`docs/`, `changarrito/` and `test/` are deliberately not published (`.github/workflows/pages.yml`).
So the docs are never at the game's URL, and that is on purpose.

---

## If you only read three

| | | |
|---|---|---|
| **1** | **[NEXT-SESSION.md](NEXT-SESSION.md)** | **Start here, always.** The state of play, rewritten at the end of every session: what just landed, what is queued, what is waiting on you |
| **2** | **[OPEN.md](OPEN.md)** | Every open question, why it blocks, and which file holds the answer. The Q&A sheet you asked for |
| **3** | **[BACKLOG.md](BACKLOG.md)** | One ranked list of what is queued and what it costs, in sittings |

Everything below is detail those three point into.

---

## Working with another AI on this engine

| File | What it is |
|---|---|
| **[../AGENTS.md](../AGENTS.md)** | **The contract every agent works under, whoever built it.** At the repository root, because that is the cross-vendor convention — one file, every agent |
| [RUNS.md](RUNS.md) | The run ledger: the ID that names its agent, one file per run, the five statuses, and **the two words that are yours alone** |
| [runs/](runs/) | One file per run. `ls` it and you have the project's history in date order, by who did it |
| [personas/](personas/) | The approved personas are in `.claude/agents/`; a **suggestion** to change one lives here and never in the approved file |
| [council/](council/) | More than one AI answering the same question — **a folder of positions written blind, never a chat.** Only you write the decision file |

## The rules — what has been decided and is not up for re-argument

| File | What it is |
|---|---|
| **[SECURITY.md](SECURITY.md)** | **Settings over sentences.** What only you can flip so that no agent — a second AI or a Claude session — can reach `main` or the public game alone. Start with step 1; nothing else on that page matters until it is done |
| [OWNER.md](OWNER.md) | **Your standing rules.** Read by every planner before it plans, so plans arrive already aligned. Anything marked Settled is a permit, not a question |
| [ASKS.md](ASKS.md) | **Every request you have made, verbatim, and where it landed.** The record of what you actually said — opened because requirements were falling through |
| [ARCH-LOG.md](ARCH-LOG.md) | Architecture decisions, **including the ones deferred with their options kept and costed.** A1–A18 |
| [TAGS.md](TAGS.md) | The vocabulary — every tag, glyph and seam, and whether a *different* game could reuse it |
| [BOUNDARY.md](BOUNDARY.md) | Every edge this project has, what we promised at it, and who reads that noun. The customs booth |
| [decisions/](decisions/) | Numbered decision records, one question each |

## What is being built, and what it will look like

| File | What it is |
|---|---|
| [CITY.md](CITY.md) | The city ledger — parcels, businesses, what develops next |
| [STORY.md](STORY.md) | The story bible — arcs, characters, endings, the rules a quest's voice obeys |
| [IDEAS.md](IDEAS.md) | Designs agreed in conversation and not yet built |
| [MINOR.md](MINOR.md) | The small improvements, planned 2026-09-15 — UI and process, from your feedback and AJ's |
| [BEAUTIFY.md](BEAUTIFY.md) | What the city looks like and what to fix first — ranked by what it costs you to look at. Also **the art method we use now** |
| [3D-LOG.md](3D-LOG.md) | Every 3D attempt, measured, including the failures |
| [plans/](plans/) | Dated plans for a specific piece of work. Newest: **the map** (2026-09-17) and **stairs and drawing** |
| [rooms/](rooms/) | One document per room or building being designed |

## The second world, and AJ

| File | What it is |
|---|---|
| [la-sobremesa.md](la-sobremesa.md) | The plan for a second world about eating well — the big one |
| [for-aj/](for-aj/) | Written **to** AJ, not about her: the questionnaire, the drawing brief, the sound brief, what her answers affect |
| [NEW-WORLD.md](NEW-WORLD.md) | The template — what a new world gets free and what it must decide for itself |
| [GIFTED-GAMES.md](GIFTED-GAMES.md) | Games as gifts for special occasions — the research and what this engine already has |
| [GENRE-RULES.md](GENRE-RULES.md) | What other games already proved, written as rules you can build against |
| [templates/](templates/) | The seven **deliverable paperwork** templates a quest hands the player — discovery notes, a recommendation memo, acceptance criteria, a pilot review, a decision log, a process-exception map, an answer/refuse/hand-off sheet — in a neutral set and a branded set built from `brand.yml`. **Not** the starting files for a new pack: that is `NEW-WORLD.md` above |

## El Changarrito — the town on your laptop

| File | What it is |
|---|---|
| [story/el-changarrito.md](story/el-changarrito.md) | What the town is, and **§7½: what a second world may never do to Meridian** |
| [CREW-MODE.md](CREW-MODE.md) | One line at the top is the whole switch: `MODE: off` today |
| [CREW.md](CREW.md) | Who the nineteen agents are, what each may touch, how they hand off |
| [crew/](crew/) | The crew's own notes, the mural ledger, and four HTML pages you can open in a browser |
| [changarrito/](changarrito/) | The town's own city ledger, door lines and UI review |

## How we know it works — the registers

| File | What it is |
|---|---|
| [REGRESSION.md](REGRESSION.md) | What the test suites actually hold, what they missed, and what to add |
| [GAUGE.md](GAUGE.md) | El Faro — a five-tile world built to be *measured*, not played. It fails where a new game would |
| [QA-PASS.md](QA-PASS.md) | Lupe's checklist, run at every screen size and both orientations |
| [UI-REVIEW.md](UI-REVIEW.md) | How a mock-up is reviewed *before* anything is built |
| [PLAYTEST.md](PLAYTEST.md) | **The Week One tour** — follow it as a story; each stop says what to do and what you should see |
| [POSTMORTEM.md](POSTMORTEM.md) | Every way a session got it wrong, including the stupid ones, so the next one doesn't repeat it |
| [SOURCES.md](SOURCES.md) | How to tell a measured fact from a considered opinion. Four tags: `[CODE]` `[WEB]` `[TRAINING]` `[OWNER]` |

## Why things are the way they are

| File | What it is |
|---|---|
| [APPROACH.md](APPROACH.md) | Why this lives in a repo at all, and what that means for gifted games |
| [CITY-AS-MEMORY.md](CITY-AS-MEMORY.md) | Using the city itself as the project's memory and backlog |
| [PROMPTS.md](PROMPTS.md) | The smallest prompts that make a better version of this. Three of them |
| [SECURITY-NOTE-2026-09-10.md](SECURITY-NOTE-2026-09-10.md) | What the exposure actually was, and what it was not — written for someone with no memory of that day |
| [meetings/](meetings/) | Minutes from every junta: the agenda in your words, each expert's position, the disagreements, the calls |
| [research/](research/) | Dated research sweeps with every source cited and every dead end named |
| [mocks/](mocks/) | Rendered artwork and the notes on what each render caught |

## History — true when written, not re-checked since

| File | |
|---|---|
| [NEXT-SESSION-ARCHIVE.md](NEXT-SESSION-ARCHIVE.md) | Old states of play |
| [HANDOFF.md](HANDOFF.md) | Superseded 2026-09-08 by `NEXT-SESSION.md` |
| [REVIEW-ME.md](REVIEW-ME.md) | Review notes from 2026-08-31, on a branch that was never merged |

---

## This page cannot go stale

`test/leaves.js` (`consistency()`, run on every CI build through `test/town.smoke.js`) **fails the
build if a document exists in `docs/` and is not linked from this index.** So a session that writes
a new document and forgets to list it here cannot merge. *It caught the session that wrote
`docs/RUNS.md` an hour after the guard shipped, which is the only kind of evidence that counts.*

That is the only promise this page makes. It does not promise the *description* is still right —
only that nothing is hidden from you.
