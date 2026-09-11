# The state of El Changarrito — the scoreboard for the two-iteration run

*Opened 2026-09-11 for the owner's experiment: "can we try to run crew fix for a while trying to see
if agents can do more than one iteration so we can see progress made generally in the changarrito in
two iterations."*

**Why this file exists.** The risk in that question is that "progress" becomes a feeling. Two
iterations of anything always *feel* productive. So the run starts from a number, and each iteration
is subtracted from it.

`node test/town.state.js` prints it; `--json` gives a machine-readable line. **It never fails the
build.** A scoreboard that can fail turns into a gate, and a gate people are afraid of gets weakened
rather than met — `test/town.smoke.js` is the gate.

## BASELINE — before iteration 1

| | |
|---|---|
| version | `ch-v81 · engine mq-v139` |
| worlds | 10 |
| people standing in town | 9 |
| people you can talk to | 9 of 9 |
| **pieces that are flat pictures** | **29** |
| pieces with a real body | 645 |
| cameras offered | top front iso 3d |
| …that draw anything | 4 of 4 |
| page errors on boot | 0 |

**The number to watch is the flat pictures.** `docs/BEAUTIFY.md` says a picture standing on air is
the thing you cannot pick up, cannot stand behind properly, and cannot light — it is the root under
several separate complaints the owner has made from play. 29 of them, against 645 pieces that have a
body.

**What this deliberately does NOT measure**, so nobody reads it as a full health check:
- The record's issue count, because this probe runs with the network aborted. `0` there would mean
  *not asked*, not *none waiting* — so it prints "not asked" instead.
- Anything about how the town FEELS. That is Chava's job and it does not reduce to a number.
- Whether a fix was any good. That is the review, and the review is not delegable.

## Iteration 1 — 2026-09-11

**The scoreboard did not move, and that is the honest result.** Nothing from iteration 1 landed:
two of the three town agents had no shell and said so rather than fabricating a red paste, and the
third's patch set is still under review.

**But the run attacked the instrument, which is worth more than a number moving.** Cuca counted the
flat pieces by hand off the maps and got **37** against the scoreboard's **29**, and said plainly
that she could not reconcile the eight. That is exactly the challenge a measuring instrument should
get before an experiment is run on it, so I broke the count down by glyph rather than defending it:

| glyph | written in the maps | actually flat in the scene |
|---|---|---|
| `H` | 6 | **0** |
| `A` | 6 | 3 |
| `P` | 16 | **17** |
| `W` | 3 | 3 |
| `X` | 2 | 2 |
| `9` | 1 | 1 |
| `J` | 3 | 3 |

37 − 6 (`H`) − 3 (`A`) + 1 (`P`) = **29. Reconciled, and the scoreboard was right.**

**`H` produces zero flat pieces** — it does not fall through to the cutout the way she assumed, so
six of her eight were a wrong premise and **the art patch she proposed for `H` would have been
wasted work.** Three `A` tiles never build at all, and something adds one `P` beyond what the maps
contain; both are worth knowing and neither was known before.

**What this says about the experiment:** iteration 1's most valuable output was not a fix. It was a
hand count that disagreed with the machine, declared honestly, which forced the instrument to be
checked before it was trusted. A round that produces that is not a wasted round.

## Iteration 2 — 2026-09-11

**The scoreboard is still 29.** Nothing has landed from either iteration; ~30 patches are in hand
awaiting review. **The number was never the result.**

### The result: a second iteration DID build on the first, and it is not close

Every one of the four read `FLIGHT-NOTES.md` and named what it changed, with the moment:

- **Beto had no entry of his own and used four other people's.** Pili's note told him the scoreboard
  counts map tiles only, so a flat prop added to the tram would move it by zero — he ran the
  scoreboard on pristine `main` and on his patched tree and diffed: identical, 29 both sides.
  **He avoided reporting a win the owner's eyes would never find, by reading somebody else's note
  rather than by being clever.** Chema's note on the transparent queue told him not to reach for
  `renderOrder`; he used opaque meshes and a pixel diff instead. Rosa's told him teleporting by hand
  is not arriving, so he judged nothing in the HUD from a teleported frame.
- **Three of four asked the owner a question** — the rule added hours earlier, used on its first run,
  each with both sides cited.
- **None re-derived the settled facts.** The 29 and its breakdown, `troUpdate`'s three states, the
  unreferenced `troCall()`, the arrival-summons-a-tram loop: all taken as given.

### What iteration 2 found that iteration 1 could not

**A test was standing guard over the bug.** `test/smoke.js` asserted *"standing at the stop does not
call the trolley"* — **the summon, written down as a requirement**, passing every day while nine
trams a minute ran past an empty stop. Beto predicted in his pre-flight that his instinct would be to
shrink the fix to keep the old assertion green; the gap appeared exactly as predicted
(`ReferenceError: TRO_EVERY is not defined`), he recognised it because he had named it, and deleted
the assertion in the open with the reason written above the block. **That is `QA-PASS.md` E2 — a test
that pins current behaviour becomes the bug's bodyguard — caught by an agent, in advance, because it
was in the shared memory he reads.**

### Two agent claims that were wrong, caught by review

- **The chromium path.** Beto reported `CHROMIUM_PATH=/opt/pw-browsers/chromium` is "not a directory"
  and that the real path is `/opt/pw-browsers/chromium-1194/chrome-linux/chrome`. **It is a symlink
  to precisely that file.** His conclusion (check your shell first) was right; his diagnosis was
  wrong, and acting on it would have changed the env var everywhere for nothing.
- **`H`.** Iteration 1 recorded that `H` "does not fall through to the cutout". Cuca challenged it:
  the code says it should build. **Both were half right.** `SOLID` does not contain `H`, and
  `engine3d.js:417` skips any non-solid glyph *before* `kind` is read — so `H` produces zero flat
  pieces **because it produces no piece at all.** Which surfaces its own finding: **the produce crate
  is something you walk straight through.**

### The honest verdict

Iteration 2 did not move the metric. It read the first round, avoided its wrong turns, found a test
guarding a bug, and asked four questions nobody could have answered alone. **If the question was
"does a second pass compound", the answer is yes.** If the question was "do two passes make the town
measurably better on their own", the answer is no — **because review is the bottleneck, not
generation**, and that is the finding worth acting on.

## What we are actually testing

Not "can agents fix things" — that is answered; they have fixed several this week. The open question
is whether **a second iteration builds on the first**, or whether it re-derives, re-litigates and
drifts. The specific failure to watch for: iteration 2 proposing something iteration 1 already
rejected, or re-measuring what iteration 1 measured. If that happens, the answer is no, and the
finding is worth more than the fixes.
