# Next session — start here

*(Log opened 2026-08-30, end of the music/townsfolk/eggs session. Keep this file
current: each session rewrites the queue before signing off.)*

## STATE OF PLAY — read this first (2026-09-13)

### ⇢ 2026-09-13 — START HERE. Everything below this block is history.

**`main` is at `mq-v158` / `ch-v101`; this branch takes the town to `ch-v102` (claiming by label). Seven suites green, R10 clean.**
PRs #166–#170 are all in.

## The five minutes that save you an afternoon

**Read, in this order, before you touch anything:**

1. **`docs/POSTMORTEM.md`** — new, and the shortest register here. Every way the recent sessions
   actually got it wrong, with what each cost, including the silly ones. **Three of its entries were
   made by the session that was writing up the previous one.** If you write a guard, break it on
   purpose in a copy outside the repo before you believe it. Ten minutes; never once wasted.
2. **`docs/REGRESSION.md`** — the proxy register (its table holds the count): *a guard has to read the noun it
   actually means.*
3. **`docs/OPEN.md`** — the index to every open question.

**The three instruments that actually work here**, and everything else is a special case of failing
to use one: **plant a real violation and read what it prints · render it and look · re-read what the
owner actually wrote, without your summary in between.**

## What is built and settled — do not re-litigate

| | |
|---|---|
| **El tranvía** | One lane, one car. Stops for anything alive. **Waits at its platform** ~3 s for somebody walking up, then goes. Critters and townsfolk keep off the rails themselves (`troDanger`); the brake is the backstop |
| **El paseo** | Picking a destination in the Barrio Pass **rides** you: bell, then the line at `RIDE_ZIP`, world changes at the end of the line. The hero's *draw* position rides; his *grid* position stays on the kerb, which is why the tram does not brake for its own passenger |
| **Window sills** | There is a **ledge** now, in 2D and 3D. Four attempts; the first three changed a size and the fault was never a size |
| **El muro** | The crew's mural is **a wall** that measures itself from its painters (4598 × 464 after iteration 5), one surface you walk along. **Every painter owns a bay** (`by:"beto"` — lowercase, and since 2026-09-13 it joins the bay `who` already named; before that `by` had never been used on a real panel and opened a second bay); returning makes your area *deeper*, not wider. A return visit must differ in what they said, what state they were in, and what they drew |
| **Rigo** | Ambient at Calle Dos `(19,3)`, under the MQT sign. Chat only, four lines EN+ES. **He never mentions the sale** — chat has no state and quest 30 has four endings |

## What is DECIDED and NOT BUILT — this is the queue

**`docs/ARCH-LOG.md` A13, A13½, A13¾ are all signed by the owner. Nothing in the tram list is a
design question any more; the build order is in there.**

1. **The tram joins the depth pass.** Fixes *"the character is just laying down on it"* and *"there
   should be a rail in front of him"* **as one change**, in every 2D camera. The move already exists
   here — la ventanilla's counter is pushed at depth `y+0.7` so her legs go behind it. **Do this
   first; it is unaffected by every other decision.**
2. **The aperture rule**, as one number. *The scale of what is behind an opening is a property of the
   VIEW, not of the world.* A room may be larger than its door; a passenger smaller than the car.
   The owner's own idea, and it is law.
3. **The near side** — rail, mullions, lower panel. Pili directs; Rigo says what a real car carries at
   waist height. It may be **solid**: nothing has to appear on it later.
4. **`rideDraw(who, seat)`** — one function, called once with the hero. **Do NOT build a passenger
   list with one entry.** The second caller is the dog, when it comes.
5. **The driver.** ❗El chofer: he is **nobody, on purpose — a uniform, not a neighbour.** No name, no
   look entry, no line, no ❗. He gets the MQT cap brim, a gold band matching the car's trim, and one
   gesture: **the hand comes off the power when something alive is on the rails.**

> **ITEM ZERO of that sitting, before a line of art:** `engine/engine3d.js` carries a comment saying
> the driver *"turns round with it when it reverses"*. **It does not reverse.** It is the same wrong
> belief that produced the two decorative cabs, sitting in the file you will open to draw him.

**Also decided, not built:** two visible storeys in El Changarrito
(`docs/rooms/2026-09-12-two-visible-storeys.md`). **Still his to answer: a picture, a room, or the
two joined?**

## Ready to build, cheapest first — none needs a design round

| | What | Cost |
|---|---|---|
| 1 | **`docs/BEAUTIFY.md`'s top four** — rug, crates, counter, quest marker | **art only.** No engine, no bump |
| 2 | **#21 — lit windows never light in 3D.** The night pass is 2D-only | one sitting, and the code is warm from the sills |
| 3 | **#158 — the city ledger describes a city we do not have** | one sitting, docs |
| 4 | **#153 — quests have no names, only array positions** | *the largest single blocker to a template* |
| 5 | **#155/#156 — the `ENDLESS` split** and its landmine: an endless pack with 2+ districts is silently locked in district one | one sitting each |
| 6 | **#161 — the comfort pass at fullscreen** | the one row in `QA-PASS.md` nobody has ever run |

## Three things about working with this owner

- **He plays it, and that is where the real bugs come from.** Four of the last five genuine faults
  came from him walking around, not from the suites. The tests ask whether it works; they still do
  not ask whether it feels good. That is what #161 is for.
- **He is usually right when he pushes back, and often for a reason you have not got.** *"Make the
  characters smaller"* beat widening the tram. *"This isn't going to be pages"* was the whole mural.
  *"Showing the window SILLS"*, read literally, was the fix after three misses.
- **`docs/ASKS.md` is his words, verbatim, logged before the work.** When a brief tells you what he
  decided, go and read what he actually said. An agent refused a brief on those grounds this month
  and was right.

## Standing practices

- **Mocks as goals to fix** — render the thing before building it, in the real game. It has caught a
  bug in a fix before the fix shipped.
- **Every agent writes under its own name in the scratchpad** (`scratchpad/<you>-thing.js`). Two
  agents picked the same filename in the same minute and one read back the other's work.
- **Never the bare word "leak"** — say *a content leak* or *a persona leak*. The bare word has an
  incident report attached to it here, and it alarmed the owner over a non-event.
- **`grep -i` on a short name is not a measurement.** Use `-w`, drop `-i` for proper nouns, print the
  matches. The check that "proved" nothing had leaked was finding **"marigold"**.

---

## The history

Every earlier block — six of them, back to 2026-08-30, three carrying their own "START HERE"
heading — is in **`docs/NEXT-SESSION-ARCHIVE.md`**, newest first, moved there on 2026-09-13 without
a word changed. **You almost certainly do not need it.** Read it only to answer *"why did we do it
that way"*, and verify anything you take from it against the code before you act on it.

**The ritual is unchanged and now has a second half:** at the end of a session, the outgoing STATE
OF PLAY block is cut to the **top** of the archive under its own date, and this file is rewritten to
hold exactly one block — the current one. That is what keeps this file the five-minute read it
claims to be.
