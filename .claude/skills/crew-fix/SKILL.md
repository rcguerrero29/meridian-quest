---
name: crew-fix
description: Put the city's crew to work on real bugs — agents diagnose, write the failing test FIRST, then fix, and Claude reviews every line before it lands. Use when the user says /crew-fix, hands over a list of bugs or play reports, says "have the agents fix it", "use the crew", "let the city fix this", or when several findings need fixing and each wants a different specialist. Never lands anything unreviewed.
---

# Crew fix — the city fixes its own bugs, and nothing lands unreviewed

*Opened 2026-09-10 at the owner's word: "why dont you have agents use the city to also fix the bugs
and you review these and have agents write tests and you review all that too? is this in the game?
add it as a skill."*

## The idea, in one line

**The crew already are the city** — Beto's engine room, Toño's ferretería, Chuy's paper shop, Pili's
paint shop, Cuca's works, Remedios' annex, Nacho's kitchen. They have been used to *advise*. This
skill puts them to **work**: they diagnose, they write the failing test, they fix, and the session
that called them **reviews every line before it lands.**

## The rule that makes it safe

> **An agent may propose anything. Only a reviewed change lands.**

This is not ceremony. In this project, agents have already: cited a line number two off and pointed a
fix at the wrong function; claimed a clean tree while a file was modified; measured frame rates in a
browser the suites do not use and built a failure message on the number; and written a test that
passed under a *wrong* fix. Every one of those was caught by reading. **None would have been caught
by trusting.**

## The loop

    1. GROUND      one agent establishes what is actually true, in code, with file:line
    2. RED         one agent writes the FAILING test — and proves it fails on today's code
    3. REVIEW      ← you. Does the test test the right thing? Would a wrong fix pass it?
    4. FIX         one agent makes it green, smallest change that removes the class
    5. REVIEW      ← you. Read the diff. Run every suite yourself. Look at it if it is visual.
    5½. WHAT GOES OUT  ask it of EVERY change, not the ones that look security-shaped
    6. RECORD      the finding goes in a register, not only in a reply

**Steps 3 and 5 are not optional and are not delegable.** If you find yourself approving a diff you
have not read, stop: that is the failure mode this skill exists to prevent.

## Who to call

| Bug is about | Call | They own |
|---|---|---|
| engine correctness, a seam, what a change breaks in six months | `beto` | `engine/` |
| a tag, a glyph, a kind, whether a second game could say it | `tono` | `docs/TAGS.md` |
| it looks wrong / flat / hard to tell apart | `pili` | readability, silhouette, palette |
| the 3D looks fake, blurry, wrong depth | `chema` | `docs/3D-LOG.md`, and he MEASURES |
| a control cannot be reached, understood or escaped | `rosa` | interface, at real sizes |
| it worked on one screen and not another; proving a fix | `lupe` | `docs/QA-PASS.md`, the checklist |
| a room, a doorway, a sight line, furniture that blocks | `cuca` | interiors |
| the city's shape, which parcel, which business | `don-guero` | `docs/CITY.md` |
| words, a quest's voice, an ending | `nacho` | the story |
| EN and ES saying the same thing in the same voice | `paty` | both languages |
| CI red, a stale cache, a deploy that misbehaves | `yaz` | build and release |
| does this mechanic survive the tenth time | `tavo` | design |
| a doc that no longer tells the truth | `chuy` | `docs/`, the template |
| what is actually next, is the backlog honest | `remedios` | the ledger |
| would a player even notice | `chava` | he plays it, badly, on purpose |
| starting a whole new pack | `mari` | idea → first playable |
| **what this change lets OUT — every time, not when somebody remembers** | **`zeni`** | **the register of every edge, what we promised there, and which guard reads that exact noun** |
| **proving a guard actually fires** | **`melo`** | **planting real violations. He does not review a guard, he tries to walk past it** |

Every one of them opens with the same shared-memory block (see any file in `.claude/agents/`), so
they all read the registers before answering. **You still check them.**

## Writing the brief

An agent is only as good as what it was told. A brief that works here has five parts:

1. **The symptom in the owner's words**, verbatim. Not your summary of it.
2. **What is already known to be true**, with file:line — so they do not re-derive it or contradict it.
3. **What has already been tried and failed**, from the registers. The sugar skulls were "fixed"
   twice by changing a size and the owner came back twice; the third fix only worked because the
   brief said so.
4. **The constraint**: a RULE goes in the engine and must be behaviour-identical for both games; a
   CHOICE becomes a seam a pack answers. Red before green. Every engine change bumps `GAMEV` in each
   pack config **and** `CACHE` in `sw.js` together.
5. **What "done" looks like** — which suite, which message, what a person would see.

## Reviewing a test — the four questions

This project has shipped a test that pinned a bug and guarded it (`docs/QA-PASS.md` E2), and a
guarantee scan that could not see the thing it guarded (E5). Ask every time:

- **Is it red on unchanged code?** Make them show it. "It would fail" is not evidence.
- **Would a WRONG fix pass it?** The freeze test was first written injecting through `draw()` — a
  fix that only wrapped `draw()` made it green while the game still froze on everything else.
- **Does the failure message name what a PERSON would say?** Not the function that returned false.
- **Can it pass vacuously?** A check that needs content the pack lacks will pass by finding nothing.
  That is not a pass, and the gauge (`docs/GAUGE.md`) exists because six of them do it.

## Reviewing a fix — what to actually do

- **Read the whole diff.** Not the summary of the diff.
- **Run every suite yourself**, both shells: `test/smoke.js`, `test/town.smoke.js`,
  `test/engine.smoke.js --index index.html`, `--index changarrito/index.html`, `test/gauge.js`,
  and `test/public.js` on a built artifact. `CHROMIUM_PATH=/opt/pw-browsers/chromium` where needed.
- **If it is visual, LOOK at it.** Take the screenshot. Twice now a number said a thing was fixed and
  the owner's eyes said it was not, and his eyes were right both times.
- **Check the version bump** if `engine/` moved. `test/bump.js` catches a missing one now; it exists
  because two engine changes shipped without it and no returning player ever got them.
- **Check nothing scratch is staged.** `git status --short` before every commit. Scratch has reached
  `main` four times in one day in this repo, every time by somebody being careful.

## Step 5½ — what does this change let out?

**Ask it of every change. That is the whole mechanism.** On 2026-09-10 the owner's private backlog
tool — with a GitHub sign-in and a "make a new token" flow — was found on the public internet, served
for as long as the site had been up. A guard existed for exactly that and could not see it, because
it read *what `index.html` loads* and the town loads nothing from there.

**Nobody had decided that change was security-relevant, and that is precisely why it got through.**
A step that only fires when somebody notices the risk is not a step, it is a hope.

So, three questions, on every change, cheap enough that skipping them saves nothing:

1. **Does this change what we publish?** Anything touching `.github/workflows/`, `scripts/build-site.sh`,
   `sw.js`, `manifest.webmanifest`, or adding a top-level folder. If yes → **`zeni`**, and R10 must
   have run on the built artifact, not on the source tree.
2. **Does this change a GUARD?** If the diff touches `test/`, ask what noun that guard now reads, and
   whether it is the noun it means. Three guards in this repo read a proxy for the thing —
   `docs/REGRESSION.md` R8 read what the index loads; the mutant net read the source with comments
   stripped; the version test asked whether two strings were *equal* when what mattered was that one
   *moved*. **None was caught by review. Each was caught by planting a violation** → **`melo`**.
3. **Does this touch a credential, a save, or something a stranger's browser evaluates?**
   `sanitizeSave`, the QR transfer, anything written into the DOM, anything read from an API.

**A "no" to all three is a fine answer and takes ten seconds. The cost is asking, not answering.**

## Where the finding goes afterwards

A fix that leaves no trace teaches nobody. Route it:

- a tag/vocabulary problem a second game would hit → `docs/TAGS.md` leak register
- a decision NOT taken, with its options → `docs/ARCH-LOG.md`
- something that reached the owner that should not have → `docs/QA-PASS.md` escape register
- a 3D attempt, including a failed one → `docs/3D-LOG.md`
- the owner's words → `docs/ASKS.md`, verbatim, **before** the work starts
- what the engine demands of a new world → `docs/GAUGE.md`

## Is this in the game?

**Partly, and the gap is worth naming.** The crew are already buildings on the town's street, and
`docs/CITY.md` plans more. What the town does *not* yet show is **work happening** — you can visit
Beto's engine room, but you cannot see that Beto is mid-way through a fix, or that a test went red an
hour ago. `docs/ARCH-LOG.md` A3 settles what is allowed there: a record of the **past** and of the
**present** is fine, a list of the **future** is the banned thing. So "Beto is fixing this" is legal
and "Beto should fix that" is not. Not built; recorded here so it stops being re-proposed from
scratch.
