RUN ID: YYYY-MM-DD-<agent>-<4 hex>
Agent: <claude | codex | the name of whichever AI ran this>
Model: <the exact model ID that ran this, e.g. claude-fable-5-1 — both, in order, if it changed>
Status: proposed
Personas: none
Issues: none
Persona learning: none

# <one line: what this run was for>

## Requested

> <the owner's request, VERBATIM. Not a summary — a run that paraphrases the ask has already
> decided what it meant, and everything below then rests on that decision being right.>

## Tasks

| task | who | model | tokens | how measured |
|---|---|---|---|---|
| <what> | <agent, or agent + persona, or "workflow: N agents"> | <exact model ID> | <N, ~N, or unknown: reason> | <session usage delta · budget counter delta · vendor dashboard · unknown: reason> |

**Tokens are measured where they can be and estimated where they must be, and the row says which.**
A blank cell is not allowed; `unknown:` needs a reason (`docs/RUNS.md` §3½).

## Files

- `path/to/file` — what changed in it and why

## Evidence

What was run, and what it printed. A claim with no output beside it is not evidence.

```
node test/smoke.js
OK — 60 quests, maxXP 880, all invariants hold.
```

Red first, where a guard was written: the violation planted, in a copy **outside** this repository,
and what the guard said when it fired.

## Acceptance criteria

**For the owner, by hand. In his words, about what he can see — never about files.** At least one
checkbox, and only he ticks them.

- [ ] <something he can open, look at, and judge>
- [ ] <another>

## Persona learning

`none`, or a path under `docs/personas/proposed/<persona>/<RUN-ID>.md`. **Never an edit to the
approved persona in `.claude/agents/`.**

---

*Shape and rules: [`docs/RUNS.md`](../RUNS.md). Contract: [`AGENTS.md`](../../AGENTS.md).
Guard: `node test/runs.js`.*
