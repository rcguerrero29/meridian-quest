# The post-mortem — every way this session got it wrong, including the stupid ones

*Opened 2026-09-12 at the owner's word: **"make sure we are documenting and informing all agents of
your findings, be them silly or not so they can make sure not to make your mistake. basically give
them a post mortem and to learn from it so it is ready for them for next time they build."***

**Read this before you build anything.** It is not a list of rules — `docs/OWNER.md` has those. It is
a list of **things that actually happened to the session writing it**, in the order of how much time
they cost, written plainly enough that you can recognise yourself about to do one.

**The house style of this file:** every entry says what was believed, what was true, and *what it
cost*. No entry is here because it sounds wise. If it did not cost something, it is not in here.

---

## 0 · The one that outranks everything else

> **Five times in one session, a guard was written that read a proxy instead of the thing it meant —
> and three of those five were written by the session that was, at that hour, writing up the previous
> one.**

`docs/REGRESSION.md` carries the register; it is fourteen entries long and six days old. **Knowing
about this mistake does not stop you making it.** That sentence is the single most useful line in
this repository and it was earned the expensive way.

**What to actually do about it, since knowing is provably not enough:** when you finish a guard,
break the thing it is for — in a copy *outside* the repository — and read what it prints. Ten
minutes. It has never once been wasted. If you cannot think of a way to break it, that is the finding
(see §6).

---

## 1 · When a fix does not land twice, the cause is not the thing you keep changing

**The sugar skulls on the window sills took four attempts across four owner reports.** Attempts one
to four were: eight pixels of sweet → five → 0.85 of the pane → the whole pane lit. **Every one was
measured. Every one was defensible. Every one was a size.**

The fault was never a dimension. **There was no sill.** `propSill` had computed a y called `sill`
since the day it was written and nothing had ever drawn a ledge — the candy was standing on the
bottom edge of a hole in a wall.

**What found it: reading his words literally.** He wrote *"another attempt at showing the window
SILLS"*, and the three previous readings had all silently turned that into "showing the skulls".

> **The rule: if your second fix for the same report is the same KIND of fix as your first, stop.
> Re-read the report as if you had never seen it, and look for the noun you have been skipping.**

## 2 · Reasoning correctly from the code is not the same as being right

Making that ledge appear in 3D took **five wrong diagnoses**, and every one was correctly reasoned:

- the texture was dumped and was perfect;
- the position was computed and was right;
- the sprite reported `visible: true`;
- a raycast through the scene's meshes found nothing in the way;
- a probe of every object on that tile found nothing but the two sprites.

All five correct. All five useless. **A sprite is a billboard that turns to face the camera; the
camera looks down at the street; so the lower half of a tall billboard tilts back INTO the wall it
hangs on.** Nothing in the scene graph can tell you that. Moving it 0.045 further out fixed it.

> **The rule: RENDER IT AND LOOK. Every fault in this session's 3D work was found by looking at a
> picture, and every one of them had passed a suite that was green at the time.**

## 3 · "Hidden" is a fact about pixels

The guard for the sill went through three drafts. The first read the shape of a config file. The
second raycast the scene. The third probed the tile. The fourth — the one that works — **projects the
thing to screen and counts how many of its pixels arrived.**

The second and third were *better engineering* than the fourth and they went green against the real
bug. **The owner's word was "hidden", he used it three times across four days, and no check in this
repository read it until one did the obvious stupid thing and looked at the screen.**

> **The rule: when the owner uses a word, find the check that reads THAT word. "Hidden" is pixels.
> "Crowded" is pixels. "Too slow" is milliseconds. "I can't tell them apart" is a cold read by
> somebody who has not seen it before.**

## 4 · A guard that calls the function directly is testing the function, not the feature

The first ride guard called `rideStart()` and asserted a ride happened. It went green with the pass's
own wiring **cut out of `openTravel()`** — so it proved the ride works and *not* that anything ever
starts one.

> **The rule: drive the real path. Click the button. If a person would press something, press it.**

## 5 · Comparing two pictures means holding everything else still

The overpaint guard fired on a **clean tree at 76%**. It took its "before" picture by removing the
newest panel from `MURALS` — which changes how many courses deep the wall is, which changes its
natural height, which rescales everything. **It was comparing two different walls.**

Blanking the panel's *drawing function* instead leaves the layout byte-identical and changes exactly
one thing.

> **The rule: when you diff two renders, change one thing. If your "before" also moved the furniture,
> your number is about the furniture.**

## 6 · A plant that cannot fail is telling you something

Two plants at the overpaint guard were **silent**, and the first instinct was that the guard was
decorative. It was not: the clip in `murWall` caps how far a visit may reach, so a panel asking to
paint over its past is simply *cut off and cannot*. The rule was enforced by the structure.

What the guard actually catches is somebody **loosening that cap later** — raising a constant, or
deleting the clip. Both are one line and both look harmless. Planted that way, it fires.

> **The rule: if you cannot break a guard from the content side, plant at the STRUCTURE that makes it
> impossible. Do not delete the guard — it is the alarm on the door you just proved is locked.**

## 7 · The cause of an intermittent failure is almost never in the check that failed

`test/smoke.js` went red **one run in eight**, on a check about a traffic cone. The cause was **a dog
standing on a tram line, thirty checks earlier**, holding a ride that never ended, which left a
global set, which blocked every later step.

Three wrong fixes were shipped at the cone before anybody looked upstream.

> **The rule: a flake is a state leak until proved otherwise. Ask what ran BEFORE it, not what is
> inside it. And a check that leaves a global set is a bug in the check.**

## 8 · A brief is evidence, not authority — and stale line numbers are the tell

Three separate agents in one session were handed `file:line` references that were **wrong by about
twenty-seven lines**, because the session had inserted a function above them and not re-checked. All
three caught it. One agent refused a brief outright, went and found `docs/ASKS.md:52`, and was right
to: **the session had asserted its own inference as the owner's ruling.**

> **The rule: grep the identifier, never paste the number. And if a brief tells you what the owner
> decided, go and read what the owner actually said.**

---

## 9 · The silly ones, which cost real time and which nobody writes down

The owner asked for these specifically — *"be them silly or not"* — and they are the ones most likely
to happen to you today.

| What happened | Cost | Do this instead |
|---|---|---|
| **Two agents wrote `scratchpad/panel.js` in the same minute.** One read the file back and got the other's work, with their own name printed over the result. Both caught it; a subtler collision ships one agent's work under another's name | most of two runs | **Every agent writes under its own name**: `scratchpad/<you>-thing.js`. Never a bare noun |
| The same thing happened to the session's own render script — it was silently replaced by an agent's file and the next run died on `./panel.js` | ten minutes of confusion | as above; the scratchpad is shared and is not yours |
| A **python patch left a stray semicolon** mid-expression: `…&&!(world===AW("dog")&&x===px&&y===py);&&!troDanger(…)`. It parsed as far as the `;` and then did not | a full suite run | **`node -e "new Function(fs.readFileSync(f))"` after every scripted edit.** One second |
| A **regex replace inserted a whole block a second time**, so `const SILL_OUT` was declared twice and the game did not boot | a full suite run | assert the *count* after a scripted edit, not just that it applied |
| A "before" comparison was rendered against `origin/main` **which did not have the feature at all**, so the diff was meaningless | fifteen minutes | check your baseline actually contains the thing you are measuring |
| A screenshot harness shot **the title screen** for four cameras because the game had never been started | twenty minutes | `test/shots.js` already knows how to start the game. Copy it |
| A guard was scoped to `T3.group` when the thing it was looking for was in `T3.scene` | one wrong conclusion | when a search finds nothing, suspect the *scope* before the *subject* |
| A new sprite was tagged `calaverita:true` and an existing guard immediately failed with *"16 calaveritas stand in st, 8 were set down"* | nothing — the guard worked | **this is the system working.** A ledge is not a sweet. Name things as what they are |

---

## 10 · The shape of every one of these

Read the nine sections again and they are one sentence:

> **The thing you are checking and the thing you mean are different, and the gap is invisible from
> inside your own reasoning.**

Which is why the only reliable instruments in this repository are:

1. **plant a real violation** and read what it prints;
2. **render it and look**;
3. **re-read what the owner actually wrote**, in his words, without your summary in between.

Everything else in here is a special case of failing to do one of those three.

---

## How to add to this file

Same discipline as every register here: **it grows from what happened, never from imagination.** An
entry needs what was believed, what was true, and what it cost. If you cannot name the cost, you have
a rule, not a post-mortem — put it in `docs/OWNER.md` instead.
