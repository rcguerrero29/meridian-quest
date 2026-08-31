# Acceptance Criteria & Error Budget

**Use it when:** you are about to build, and "how accurate is it?" is in the air.
**It exists to stop:** shipping something nobody can call good or bad.

> *"As accurate as possible" has no finish line, no budget, and no way to tell a good
> week from a bad one. It is a wish with a deadline attached.*

---

**System:** ___  **Owner:** ___  **Agreed with:** ___  **Date:** ___

## What it does

One sentence, in the client's words.

> ___

## The bar

Measured on **real inputs from this client**, not a public benchmark and not a demo set.

| Measure | Bar | How measured | Sample |
|---|---|---|---|
| Accuracy on ___ |  | ___ | ___ real items |
| Response time |  |  |  |
| Coverage (% it will attempt) |  |  |  |

**Ship at:** ___  **Roll back below:** ___

## The error budget

Say the number of misses per period out loud, and who absorbs them.

> At ___% on ___ items/month, that is **___ wrong per month.**

**The misses will not be random.** Which cases will they cluster in?

- ___

## What happens on a miss

| Failure | Who notices | How fast | Cost | What the system does |
|---|---|---|---|---|
|  |  |  |  |  |

**Low-confidence path:** ___ *(flag for review / route to a human / refuse)*
**Never allowed to do without a human:** ___

## What it must refuse

The list that keeps you out of trouble. Be specific.

- ___ — because ___

## How we will know it drifted

**Watched by:** ___ · **Signal:** ___ · **Checked:** ___ (how often)
**Who gets paged, and when:** ___

## Sign-off

| Role | Name | Agreed |
|---|---|---|
| Client owner |  |  |
| Builder |  |  |
