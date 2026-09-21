# Runs — the ledger, the run ID, and the two words that are the owner's alone

*Opened 2026-09-20, owner: **"each crew run should have a unique run ID and show: which persona/agent
did each task, vs you or the other AI working on it etc · the exact request, files or backlog items
affected, and test/verification evidence · status: proposed, implemented, verified, accepted by me,
or rejected · any persona-learning suggestion kept separate from the approved persona itself ·
verification tests for me to complete that can be tracked automatically via acceptance criteria but
can only be closed by me the owner of the product."***

The contract every agent works under is [`AGENTS.md`](../AGENTS.md) at the root. **This file is the
detail of §6 and §8 of it**, and the guard is `test/runs.js`.

---

## 1 · A run is a unit of work with a name

`docs/CREW-MODE.md` already says the unit in crew mode is a **run**, not a ticket: the owner names a
handful of issues, they are worked together, they come back together. What was missing was that a run
had no name, so nothing could be said *about* one afterwards.

```
RUN ID:   YYYY-MM-DD-<agent>-<4 hex>
          2026-09-20-claude-a3f1
          2026-09-21-codex-77b0
```

**The agent's name is inside the ID.** Three things fall out of that and each one was a requirement:

- **Two agents can never collide on an ID** without talking to each other, which they cannot do.
- The owner sees **who did it** in the filename, without opening anything.
- `ls docs/runs/` sorted is the project's history in date order, by hand.

The four hex characters are there so **one agent can open two runs in one day**. They are not a
hash of anything; nothing should try to read meaning out of them.

## 2 · One file per run. Never a shared ledger.

```
docs/runs/2026-09-20-claude-a3f1.md
```

**This is the load-bearing decision in the whole protocol and it is worth stating plainly.** A
single `RUNS.md` that every run appends to would conflict *every single time two agents finish work
in the same window* — which is precisely the situation this protocol exists to survive. A file per
run has no shared line for two agents to fight over. Git merges two new files in different names
without an opinion.

The same reasoning is why **the claim is a GitHub label and not a lockfile** (`AGENTS.md` §2). Any
shared mutable file between two agents who cannot see each other is a conflict waiting for a date.

## 3 · What a run file must say

The shape is [`docs/runs/TEMPLATE.md`](runs/TEMPLATE.md), and `test/runs.js` fails the build if a
field is missing. Every one of these is something the owner asked for by name:

| Field | What it answers |
|---|---|
| `RUN ID` | which run — and it must match the filename |
| `Agent` | **which AI** — `claude`, `codex`, whoever. Must be the name inside the ID |
| `Personas` | which persona did which task *within* this run, or `none` |
| `Requested` | **the exact request, verbatim.** Not a summary of it |
| `Issues` | the backlog items affected, by number, or `none` |
| `Files` | every path this run changed |
| `Evidence` | what was run and what it printed. A claim with no output is not evidence |
| `Model` | **which model ran this** — the exact ID (`claude-fable-5-1`), not a marketing name. If it changed mid-run, both, in order |
| `Status` | one of the five (§4) |
| `Acceptance criteria` | **what the owner checks by hand** (§5) |
| `Persona learning` | a path under `docs/personas/proposed/`, or `none` (§6) |
| `## Tasks` | **one row per task: who did it, which model, how many tokens, and how that number was got** (§3½) |

**`Requested` is verbatim on purpose.** A run that paraphrases the ask is a run that has already
decided what the ask meant, and the whole record then rests on that decision being right. The same
rule as `docs/ASKS.md`, for the same reason.

## 3½ · Tokens and the model, per task — measured, and honest about how

*Owner, 2026-09-20: "lets log the amount of tokens used per tasks and the model used."*

```
## Tasks

| task | who | model | tokens | how measured |
|---|---|---|---|---|
| the security review | claude (workflow: 5 finders, 2 skeptics each, synthesis, critic) | claude-fable-5-1 | 4,120,000 | session usage delta, get_session before and after |
| the council protocol | claude | claude-fable-5-1 | ~180,000 | budget counter delta, ±10% |
```

**The model is exact.** A Claude Code session reads it from `get_session` (`session_context.model`
and `external_metadata.last_served_model` — the second can differ from the first when the serving
model falls back, and the ledger records the one that actually served). A second AI records what its
vendor exposes, by its exact ID. **A marketing name is not a model.**

**The tokens are measured where they can be and estimated where they must be, and the row says
which.** The `how measured` column is required precisely so that a number nobody can check is never
mistaken for one somebody did:

- **`session usage delta`** — `get_session` returns cumulative `input_tokens`, `output_tokens`,
  `cache_read_tokens` and `cache_write_tokens` for the session. Snapshot before the task, snapshot
  after, subtract. This is a real measurement. Record input + output as the number; cache reads are
  cheap and huge and would swamp it — note them separately if they matter.
- **`budget counter delta`** — the remaining-tokens figure a session is shown. Coarse; write it
  `~N` and say the tolerance.
- **`vendor dashboard`** — whatever the second AI's platform reports, cited.
- **`unknown: <reason>`** — allowed, never blank. *"the session ended before the after-snapshot"*
  is a reason. An empty cell is not.

**A workflow's tokens count against the run that launched it.** The sub-agents are the run's cost;
the row names how many ran so the number can be read.

## 4 · The five statuses, and the line through the middle of them

```
   an agent may set these three            these two are the owner's
 ┌─────────────────────────────────┐     ┌───────────────────────────┐
   proposed → implemented → verified  →     accepted   |   rejected
 └─────────────────────────────────┘     └───────────────────────────┘
```

| Status | Means |
|---|---|
| **proposed** | written down, nothing built |
| **implemented** | built and pushed. Says nothing about whether it works |
| **verified** | the machine checks passed **and the evidence is in the file**. The furthest an agent may take anything |
| **accepted** | *the owner* has looked and says it is what he wanted |
| **rejected** | *the owner* has looked and says it is not |

**`verified` is not `accepted` and the gap between them is the point.** Verified means the tests
that were written passed. Accepted means the thing those tests describe is the thing that was
wanted. **A machine can settle the first question and cannot touch the second.** The owner's own
sentence: *"the people who are responsible for requirements needs to give the approval."*

## 5 · Acceptance criteria — tracked automatically, closed only by him

He asked for both halves and they are separate mechanisms:

**Tracked automatically.** `test/runs.js` runs in CI on every build. It reads every file in
`docs/runs/`, checks the shape, and **prints the standing board** — how many runs are at each status
— so "what is waiting on me" is one command and never a thing anybody has to remember to update.

```
node test/runs.js
```

**Closed only by him.** Two layers, and the difference between them is said out loud rather than
glossed:

- **The tripwire.** `test/runs.js` reads `git log` for the commit that last set `accepted` or
  `rejected` on each run and fails if that commit **carries an agent's `Co-Authored-By` trailer** —
  not "is the author the owner", which needs his name written somewhere and goes red the day he
  commits from another machine, and which a token minted on his account would pass anyway
  (`docs/SECURITY.md` §3). The trailer is a fact about the commit and it is the thing that actually
  goes wrong: an agent accepting its own work. This catches the realistic case and it is **not a
  vault**: an agent can omit its trailer. On a shallow checkout it says it could not read history
  rather than reading HEAD (finding A4, 2026-09-21).
- **The binding record is the issue he closes.** GitHub records *who* closed an issue and an agent
  cannot forge that without his credentials. So a run that claims `accepted` names the issue, and the
  issue's closer is the fact; the file is the legible copy of it.

**Saying which of the two you ran matters.** A guard that quietly checks the weaker thing and prints
the stronger claim is the fault this repository has written down four times (`docs/POSTMORTEM.md`,
`docs/REGRESSION.md` §3, `docs/ARCH-LOG.md` A17). `test/runs.js` says which check it ran.

**And the criteria themselves are written for a person**, in his words, about what he can see:

> - Open the map on Calle Dos. The line under it no longer says the doors are gold.
> - La Espiga's door and Velázquez's door are each their own colour, not grey boxes.

Not *"`plan.caption` is now a pack string."* He is checking the game, not the diff.

## 6 · Persona learning, kept apart from the persona

A persona in `.claude/agents/` is **signed** — it says what the owner has agreed that character is.
A run that thinks one should change writes:

```
docs/personas/proposed/<persona>/<RUN-ID>.md
```

and names that path in its run file. **It does not edit the approved persona.** The owner folds a
suggestion in or does not; either way the approved file never quietly acquires an opinion nobody
signed off.

`test/runs.js` checks that a `Persona learning` path which is not `none` actually exists, and that
it sits under `docs/personas/proposed/`. It also flags any commit that changed an approved persona
without the owner's authorship — the same tripwire as §5, with the same honest limit.

## 7 · Reviewing pull requests for conflicts, before there are any

```
node test/overlap.js                    # this branch against every other
node test/overlap.js <branch>           # a named one
```

It lists every other branch whose changed files overlap this one's, and which files. **Git alone —
no token, no API call, no permissions.** That is not a shortcut: `test/leaves.js` fails the build if
any workflow asks for a `write` scope, so nothing in CI can post a comment on a pull request, and
that rule is correct (a bad dependency in CI holding a write token can push to `main`).

**Overlap is never a failure and the script always exits 0.** It is a routing slip, the same shape as
`test/leaves.js`'s diff half: *you touched a file somebody else is holding* is not a state the author
can clear by editing, and a gate nobody can satisfy is a gate people learn to force past. What it
buys is that you read the other branch **before** you both push, instead of resolving a conflict
afterwards with half the context gone.

## 8 · What this does not solve, said now rather than discovered later

- **An agent that lies is not stopped by any of this.** Authorship is forgeable, a run file is a
  file. What the protocol actually buys is that an *honest* agent cannot be careless, and that a
  dishonest one leaves a record that disagrees with itself.
- **Nothing here serialises `engine/`.** Two agents can still both change shared engine code in the
  same window and both be green alone. `test/overlap.js` will say so; nothing forces them apart.
  If that bites, the next step is one in-flight engine PR at a time — a rule, not a tool.
- **The five statuses do not model "half accepted."** A run the owner likes in part is rejected and
  re-run, or split before it is proposed. That is deliberate: a status with a fraction in it is a
  status nobody can act on.
