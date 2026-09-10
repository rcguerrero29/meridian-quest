# The pass — Lupe's list

*Opened 2026-09-09 at the owner's word: "we should have personas who are QA testers meaning they have
to test both on full screen and phone mode right."*

**This file is the checklist, and the record of what escaped it.** The list grows from real escapes
and from nothing else. A check nobody can point at a bug for is a ritual, and rituals get skipped.

---

## The rule

> **Every check runs at BOTH sizes. A result from one size is not a result.**

## The bay — the size matrix

| Row | Viewport | Why this one |
|---|---|---|
| Phone portrait | 390 × 844 | The owner's actual device; where reach and text size fail |
| Phone landscape | 844 × 390 | A short frame — where an anchored bar eats the world |
| Small window | 480 × 900 | What the suites already use; keeps parity with CI |
| Desktop | 1280 × 800 | Where the world is widest and the camera shows most |
| **Fullscreen** | the element gets the screen's shape | **The one that has actually escaped** |

A change to layout, camera, text or anything a person touches runs every row. A change to logic
alone may run the first and the last.

## The pass, in order

1. **Make the old code fail first.** A test that has never been red proves nothing.
2. **The four suites, both packs, every time:**
   ```
   node test/smoke.js
   node test/town.smoke.js
   node test/engine.smoke.js --index index.html
   node test/engine.smoke.js --index changarrito/index.html
   ```
   One engine, two games: a pass on one is half a pass.
3. **The size matrix**, on whatever the change touched.
4. **Look at a screenshot.** Numbers do not see teeth along every wall in HQ. A person does.
5. **Report in plain words** — what a person would have seen, not what line asserted.

---

## The escape register

*What reached the owner that the list should have caught. This is the most valuable thing on the
page: every row here is a row of the matrix that did not exist yet.*

### E1 · The fullscreen blur — 2026-09-08
**What escaped:** #134 was diagnosed, measured (edge energy **2.26 → 2.72**), fixed and shipped. The
owner came straight back: *"its still blurry in full screen."*
**What it actually was:** a **second, unrelated fault**. The 3D buffer kept the game's 10:8 while
fullscreen gave the element the screen's shape, so the browser rescaled and letterboxed a 2880×2304
render. Measured afterwards at **0.885 fullscreen against 2.24 windowed**.
**Which row would have caught it:** *Fullscreen*. Everything had been tested windowed.
**What the list is now:** the fullscreen row exists because of this, and it is the row never to skip.
**The general lesson:** a symptom is not a cause, and fixing one cause does not clear the symptom.
Measure in the state the person was actually in.

### E2 · The test that pinned the bug — 2026-09-08
**What escaped:** `test/smoke.js` asserted a sprite was 40px and passed the entire time the sprite
was wrong — the assertion ran *after* a forced device-pixel-ratio change, so it was measuring the
broken state and calling it correct.
**Which row would have caught it:** none. No viewport catches this.
**What the list is now:** step 1 — **make the old code fail first**. A green test on unchanged code
is not evidence.
**The general lesson:** a test that pins current behaviour can pin a bug. It then acts as a
bodyguard for it.

### E3 · Scratch files reaching `main` — 2026-09-08 and 2026-09-09
**What escaped:** `git add -A` swept fifteen `.tmp.js` scratch files into a commit that reached
`main`. Later the same week a screenshot script whose output directory came from an unset variable
wrote `./undefined/living.png` at the repo root, and was caught by a hook rather than by anyone
looking.
**Which row would have caught it:** none — it is not a viewport problem.
**And a fourth, hours later:** an agent told in writing to keep scratch out of the repo wrote its
shot list to `spots1.tmp.json` at the repo root. `.gitignore` covered `*.tmp.js` and not
`*.tmp.json` — the rule was written for the shape that had escaped before, which is the shape of
every rule written from one example. It is `*.tmp.*` now.
**What the list is now:** scratch goes in the session scratchpad; every commit stages **explicit
paths**; `.gitignore` carries the shapes, plural. **Four escapes in one day, every one by somebody
who had been told and was being careful** — which is the whole argument for the guard being
mechanical. Instructions did not work. The hook did.

### E4 · The branch reset that ate a commit — 2026-09-10 (a near-miss, not an escape)
**What happened:** mid-session, to start a clean part, I ran `git checkout -qB <branch> origin/main`.
`-B` does not ask. It moved the branch to `origin/main` and the L15 commit — an hour of work — was
gone from the working tree with no ceremony and no warning.
**Why the owner never saw it:** luck, spelled *push*. The commit had been pushed minutes earlier, so
`origin/<branch>` still had it. Recovery was `git stash -q -u`, `git reset -q --hard
origin/<branch>`, `git stash pop`. **Unpushed, it would have been reflog-or-nothing.**
**Which row would have caught it:** none. Like E3 it is not a viewport problem — it is a hand on a
sharp tool.
**What the rule is now:** **never `checkout -B` onto a branch you have commits on.** Starting a
fresh part from `main` is `git fetch origin main` then a *new* branch name, or, if the name must be
reused, `git push` first and reset to `origin/<branch>` rather than to `origin/main`. And check
`git log origin/<branch>..<branch>` before any command with `-B`, `--hard` or `-f` in it.
**The general lesson:** this register exists because instructions do not work and hooks do (E3). This
row has no hook yet, and that is the honest state of it — it is written down as a gap below rather
than claimed as fixed. **It is here at all because a near-miss that nobody records is just an escape
that has not happened yet.**

---

## Known gaps in the list

Written down so they are counted rather than re-discovered:

- **The fullscreen row is not automated.** It is currently a person changing the element's shape by
  hand. The fault is an aspect mismatch between the render buffer and the element, so it can be
  reproduced headlessly by giving the element a shape the buffer did not expect — read `t3Resize`
  in `engine/engine3d.js` and the `.viewport.fs` rule in the shells first. **Until this is a script,
  E1 can happen again.**
- **Landscape is not covered by any suite.** The engine smoke runs at 480×900 and 390×844.
- **No suite checks the town at phone size**, only Meridian.
- `test/smoke.js`'s portability scan is still Meridian's proper nouns, so it cannot catch a second
  world leaking its own names.
- **E4 has no mechanical guard.** Nothing stops a session running `git checkout -B` over its own
  unpushed work; the rule is words, and E3 is the proof that words are not enough. A pre-command
  hook that refuses `-B`/`--hard`/`-f` while `git log origin/<branch>..<branch>` is non-empty would
  be the real fix. **Until then, E4 can happen again, and next time the commit may not be pushed.**
