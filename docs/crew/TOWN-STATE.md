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

## Iteration 1 — *(to be filled after the run)*

## Iteration 2 — *(to be filled after the run)*

## What we are actually testing

Not "can agents fix things" — that is answered; they have fixed several this week. The open question
is whether **a second iteration builds on the first**, or whether it re-derives, re-litigates and
drifts. The specific failure to watch for: iteration 2 proposing something iteration 1 already
rejected, or re-measuring what iteration 1 measured. If that happens, the answer is no, and the
finding is worth more than the fixes.
