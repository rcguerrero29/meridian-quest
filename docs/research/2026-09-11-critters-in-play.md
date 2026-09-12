# Critters and vehicles — the sweep, 2026-09-11

*Run at the owner's word, `docs/ASKS.md` 2026-09-11: "i mean she should be small enough and smart
enough to stay away from the tram please. but those are good questions — **someone must have a better
answer for critters in game play no?**"*

**The second sentence is what makes this a sweep and not a patch.** The first sentence could have been
answered in nine lines of engine. The question behind it — *has anybody solved this properly* — is the
one worth four searches, and the answer is yes, twice, and one of the two answers is a warning.

> **If you are an agent about to build something, you do not need this file.** The rule and the trap
> are in `docs/GENRE-RULES.md`. This is the long version, for a person with twenty minutes.

## Sourcing, per `docs/SOURCES.md`

`[WEB]` carries a URL. `[TRAINING]` is unverifiable and says so. **One caveat, stated up front and
not buried:** the egress proxy blocked `strangeloopgames.com`, so the ECO detail below is the search
engine's summary **of** that page, not the page. The URL is given so a person can open what an agent
could not. Everything attributed to ECO should be read as "reported to say", and the rule we took
from it stands on its own arithmetic either way.

---

## 1 · The shipped answer: threat is a shape, and the shape grows forward with speed `[WEB]`

**ECO (Strange Loop Games), the Eco Peaks update, "Animal Vehicle Interactions"** —
https://www.strangeloopgames.com/eco-peaks-animal-vehicle-interactions/

Reported model, in their terms:

- The player sits at the **centre of a circle of constant proximity threat**.
- **As player velocity increases, the threat extends forward.** It is not a bigger circle — it is a
  circle with a nose on it, pointing where you are going.
- Animals in the **red zone flee immediately**. Animals in the **green zone flee after ~2 seconds**
  if they are still in it. So the model has *urgency*, not just a boolean.
- Walking (~3 m/s) produces a **wider, less directional** threat area; running (~4.5 m/s) a **more
  focused** one. Faster does not mean scarier in every direction — it means scarier *ahead*.

**And the bug they shipped and then fixed, which is the most useful line in the whole sweep:**
animals were slow to react **because the player's velocity was not being sent to the server while
driving**, which broke the threat calculation. A vehicle is the case where the velocity term matters
most, and it is the case where the velocity term went missing. The model was right and the input was
absent, and what a player saw was "the animals are stupid".

## 2 · The textbook answer: flee is a force, evade is a force aimed at where you *will* be `[WEB]`

**Craig Reynolds, "Steering Behaviors For Autonomous Characters" (GDC 1999)** —
https://www.red3d.com/cwr/steer/gdc99/ · a readable modern introduction:
https://www.gamedeveloper.com/design/introduction-to-steering-behaviours · and
https://natureofcode.com/autonomous-agents/

- **Flee** is the exact inverse of seek: desired velocity points radially away from the target.
- **Evade** is the inverse of pursue: you flee not the target's position but its **predicted future
  position**. For anything that moves on a known path — a tram on rails — the prediction is free and
  exact.
- Flee/evade are engaged inside a radius and are otherwise silent, which is the cheap part: nothing
  is computed until something is close.

The transferable half is **evade, not flee**. Fleeing a tram's current position is how you get a
pigeon sprinting down the rails in front of it. Evading its *future* position is how you get a
pigeon stepping sideways, which is what an animal actually does.

## 3 · The warning: this is a thing shipped games get wrong, in public `[WEB]`

**Cyberpunk 2077** — the "Alternate Crowd Behavior" mod exists because, in the shipped game,
**pedestrians commonly let a car run them over**; the mod's fix was *changing the distance
thresholds* so they dodge instead.
https://screenrant.com/cyberpunk-2077-mod-pedestrian-ai/

Read that twice against our own week. A studio of that size shipped a city where the crowd stands
still in front of traffic, and the community fix was **a threshold number, not an algorithm**. That
is precisely our failure and precisely our fix. The lesson is not "they were careless" — it is that
**this class of bug is invisible in review and obvious in play**, which is why it reaches players.

Same shape from the other end: bus- and tram-sim writeups report pedestrians **sprinting directly
into vehicles**, and collision detection that penalises the driver for a hit with no visible impact.
https://racinggames.gg/article/all-aboard-the-best-bus-games-you-cant-afford-to-miss

## 4 · The ecology answer, for scale we do not have `[TRAINING]`

Unverified by a URL this session and marked accordingly. Reported practice in
**Red Dead Redemption 2** (~200 species) is **cascading flight**: small animals fleeing is itself a
threat signal to medium animals, which is a signal to large ones, so one startled bird empties a
clearing. Birds **flush** — they leave the ground rather than the tile. **theHunter: Call of the
Wild** is reported to tune detection so that animals flee *before the player realises one was
there*, which is a design position, not a bug: the animal's job is to be missed.

We have six critters and one tram. None of this is buildable here and all of it is worth knowing
before somebody proposes a forest.

---

## 5 · What we took, and what we deliberately did not

| Idea | Taken? | Why |
|---|---|---|
| Threat as a **forward-extended** shape | **Yes**, degenerate form | Our vehicle runs on one axis at one speed, so "extends forward with velocity" collapses to a fixed lead ahead of the nose: `TRO_SHY` tiles |
| Red zone / green zone with a **delay** | No | Two urgencies need a reason. Ours has one: the tram is coming or it is not |
| **Evade the predicted position**, not the current one | **Yes** | The step is always *sideways off the rails*, never along them — which is evasion of the whole future path, and free, because the path is a straight line we already declare |
| Flee as a **force vector** | No | This world is on a tile grid with integer steps. A force would have to be re-quantised back to a tile and would buy nothing |
| Cascading flight between species | No, filed | Six critters. The mechanism costs more than the effect |
| Birds **flush** rather than step | Already built | Paloma's lift, `PIGLIFT`, shipped 2026-09-11 — arrived at independently and it is the same idea |

## 6 · The one thing the sweep changed about the build

**The order of the two radii.** Before reading ECO the plan was "the critter notices the tram at
about the distance the tram notices the critter". ECO's model is explicitly asymmetric — the threat
reaches further than the reaction — and it forced the question *what happens if ours is the other way
round?* The answer is a **deadlock**: the brake fires first, the tram stops before it is close enough
to frighten anything, the critter is never endangered, and the two of them stand in the street for
ever. That is the same shape as the bug a rendered mock caught in the pigeon's lift an hour earlier
on the same branch.

It is now an invariant with a guard on it: `TRO_SHY > TRO_LOOK`, asserted in `test/smoke.js`, and
planting `TRO_SHY=2` reproduces the deadlock exactly. **The sweep's whole cash value was one
inequality, and it was worth the sweep.**

---

## Sources

- https://www.strangeloopgames.com/eco-peaks-animal-vehicle-interactions/ (ECO — *blocked by the egress proxy; summarised, not read*)
- https://www.red3d.com/cwr/steer/gdc99/ (Reynolds, GDC 1999)
- https://www.gamedeveloper.com/design/introduction-to-steering-behaviours
- https://natureofcode.com/autonomous-agents/
- https://screenrant.com/cyberpunk-2077-mod-pedestrian-ai/
- https://racinggames.gg/article/all-aboard-the-best-bus-games-you-cant-afford-to-miss
