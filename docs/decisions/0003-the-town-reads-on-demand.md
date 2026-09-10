# 0003 · The town reads GitHub on open, after a write, and on ↻ — never on a clock

**Date:** 2026-09-06 · **Status:** settled, built (`ch-v13`) · **Files:**
`changarrito/content/config.js`, `changarrito/content/record.js`

## Asked

> *"ok turn it off"*

`[OWNER]`, 2026-09-06, quoted at `changarrito/content/config.js:35`. **The only copy of this quote
in the repo is that code comment.** The surrounding ask — *"how would you improve this game version
so we can be more efficient?"* and the owner's eight replies — is in `docs/ASKS.md`, 2026-09-06.

## Decided

El Changarrito re-reads the repo at exactly three moments: **when the town opens, immediately after
any write, and when the player presses ↻ Refresh** at la ventanilla's window. There is no timer and
no re-read when the tab regains focus.

## Because

**The read is not free and the player pays for it in a currency they cannot see.** GitHub's
unauthenticated API allows 60 reads an hour; one refresh of the town spends about a dozen — the
issue list, the pulls, up to eight comment threads, the closed list, the version check. A five-minute
timer therefore exhausts an afternoon's budget while the player is *not playing*, and the symptom is
not an error message, it is **an empty street** (`changarrito/content/record.js:261-265`, and the
owner reported exactly this on 2026-09-06).

Three more reasons, in descending order of how obvious they are:

- **A clock makes the town change behind your back.** You walk away from a person, you come back,
  they are gone. Nothing said why.
- **A write already refreshes.** `write()` clears the cached ETags for `issues` and `pulls` and then
  awaits `refresh()` (`record.js:375-378`), so the one moment the data provably changed is already
  covered. The timer was only ever covering changes made *somewhere else*.
- **The player is the only other author.** This is a one-person tool reading one person's issues.
  The rate of change from outside the browser is very close to zero.

**What was rejected, and why:**

| Option | Rejected because |
|---|---|
| A longer interval — fifteen minutes, an hour | Same failure, later. It trades one arbitrary number for another and still spends the budget while nobody is looking |
| Re-read on `visibilitychange` only | Kept in the code but off with the clock (`record.js:105-107`) — it is a clock triggered by attention rather than time, with the same "changed behind your back" problem |
| Delete the timer code | **Explicitly rejected.** The switch stays and the code stays: `REFRESH_MS=0` and `SHOW_PERMITS=false` (`config.js:106-107`) with a comment saying what turning them back on does. *"Nothing was deleted."* A reversal costs one number |

**The rule that came out of it:** when an owner turns something off, turn it off with a switch and
say in the file what the switch does. A deleted feature has to be rebuilt to be reconsidered.

## The second half nobody asked for, which is why it works

Turning the clock off makes staleness *the player's problem*, so the town had to become honest about
being stale. Three things landed with it:

- **"Filed as of"** at the top of la ventanilla's sheet (`record.js:521`) — every read stamps
  `filedAt`, and a read served from the cached copy stamps the cache's date, not today's
  (`record.js:283`).
- **A refusal is spoken, with the minute it lifts.** `noteLimit()` reads
  `x-ratelimit-reset` and la ventanilla says *"it opens again at HH:MM"*
  (`record.js:285-288`, `:556-557`).
- **The last good copy stands.** A failed read returns the cached data rather than an empty list
  (`record.js:282-283`), so a refused read never empties the street.

## Touched

- `changarrito/content/config.js:106-107` — `REFRESH_MS=0`, `SHOW_PERMITS=false`, with the note.
- `changarrito/content/record.js:90-91` — the pack values are read defensively (`typeof`), so the
  file works if a config drops them.
- `changarrito/content/record.js:105-107` — the timer and the visibility listener, both behind
  `if(this.every>0)`.
- `changarrito/content/record.js:555` — the ↻ Refresh button on her card.
- `changarrito/content/record.js:375-378` — the post-write refresh, and the ETag clear that makes it
  a real read rather than a 304.

## Ledger

- `docs/ASKS.md`, 2026-09-06 — "PR 1 of 3 built (`ch-v13`, town only)".
- `changarrito/README.md` "What la ventanilla tells you first (ch-v13)" carries the player-facing
  version of this decision. Verified against the code 2026-09-10; it is accurate.
