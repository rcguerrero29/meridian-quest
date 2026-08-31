# Review notes — the stakes layer and the grade

*Written 2026-08-31 for the session the owner asked to review this work. Branch
`claude/don-guero-bct8tx`, not merged. Smoke green, `node test/smoke.js`.*

## What changed

The long-open "signed but not built" gap is closed. Hearts were doing two jobs — a
life counter and a quality grade — in a game with no danger. They are now separated:

- **The grade is always on.** Every attempt at a quest is counted in `marks`
  (quest index → attempts). A district's grade comes from the share of its answered
  quests solved first try: ≥90% = 3, ≥60% = 2, else 1. The grade picks which ending
  the district plays, and appears in the decision report. It never blocks anything.
- **Stakes are an optional layer on top.** `STAKES` in `content/meridian/config.js`:
  `none` (shipped default), `hearts` (lives, exactly as before), `budget`
  (**declared, deliberately NOT implemented** — the engine falls back to `none`).
  A chapter may override the pack with its own `stakes`, so a calm town can hold one
  scored mini-game.
- **Admin toggle** in ⚙️ Settings (admin mode only) flips hearts on and off per
  device, stored in `mqstakes`, never written into the save.

The laws in `docs/OWNER.md` that constrain all of this: nothing may take progress,
the city or the save; nothing may harm a character or their business; `budget` is not
to be implemented without the owner asking.

## Covered by the smoke test

- Stakes off: a wrong answer costs no heart, ends no chapter, and still records a mark
- Marks accumulate across retries; the right answer still completes the quest
- Grade maths at all three bands (all-first-try, all-retried, 75% mixed)
- `budget` falls back to `none`; a district override switches hearts on and sets its count
- HUD hides hearts when lives are off, shows them when on
- Admin toggle: hidden outside admin, visible inside, persists, both labels render,
  both buttons meet the 24px tap-target standard
- Hearts mode still behaves exactly as before (the old lives tests now opt in)
- Each new assertion was verified to FAIL against the pre-change engine

## What I could NOT test — please check these

1. **Human play.** Nobody has played a graded run. The grade bands (90% / 60%) are a
   guess. Play a district and see whether "solid work" lands where it should, or
   whether the thresholds are too kind or too harsh.
2. **The ending copy under a grade.** The epilogues were written when hearts picked
   them (`epi1/2/3`, `mepi1/2/3`). They still fit *tonally*, but nobody has read them
   in context after a graded run. Worth a read-through, especially the ES.
3. **`endGrade` phrasing.** The score line now reads e.g. "0/350 XP · solid work".
   The three grade words are in `strings.js` → `grades`. They are the first thing a
   player reads at the end of a district; they deserve a better eye than mine.
4. **A save from before this change.** `marks` defaults to `{}` on load, so an old
   save's completed quests are unmarked and grade as 3 (flawless). That is the kind
   choice, but it is a choice — confirm it is the right one, or decide old saves
   should grade as unknown instead.
5. **Interaction with the isometric renderer.** The HUD hearts string is now
   sometimes empty. I verified the string and the tests, not the iso layout at
   several widths.
6. **The stakes row in a long Settings panel.** It renders below the fold on a 480px
   viewport. Fine, but somebody should confirm it is reachable by scroll on a real
   phone.

## Deliberately not done

- **`budget`** — architecture only, per the owner. Do not implement without an ask.
- **Front-profile 2.5D** — first in the owner's build order, untouched here.
- **Merge to main** — the owner is holding it until the review.
