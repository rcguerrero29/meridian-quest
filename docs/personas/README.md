# Personas — the approved ones, and the suggestions that are not them yet

**The approved personas live in `.claude/agents/`.** Each one says what the owner has agreed that
character is: what they decide, what they may touch, what they never do. **An agent does not edit
them** (`AGENTS.md` §9) — not its own file, not another's. **The calling session does**, since 2026-09-21
(the owner: *"yeah update the older ones so you can make the decison to update personas"*): it applies a
proposal or refuses it, in writing, in the run file and the flight notes' ledger. The proposal below is
written either way, because it is the record.

**A suggestion goes here instead:**

```
docs/personas/proposed/<persona>/<RUN-ID>.md
```

and the run that made it names that path in its `Persona learning:` field
([`docs/RUNS.md`](../RUNS.md) §6). The owner folds a suggestion in, or does not. Either way the
approved persona never quietly acquires an opinion nobody signed off on.

**Why the separation is worth a folder.** A persona is read by every session that calls it, and a
line added to one silently becomes a rule for every future run. That is exactly the shape of change
that should need a person's word — and the same argument as `accepted` being the owner's alone.

`test/runs.js` checks that a `Persona learning` path which is not `none` exists and sits under
`proposed/`, and flags a commit that changed an approved persona while carrying an agent's
`Co-Authored-By` trailer.

## What a good one says

1. **What happened** that made you think the persona should change — a run, a mistake, a gap.
2. **The exact lines** you would add or replace, quoted, so the owner can paste or refuse.
3. **What it would have changed** if the persona had already said it.
4. **The argument against**, honestly. A suggestion with no cost named is a suggestion nobody can
   weigh.
