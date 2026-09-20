# The council — where more than one AI answers the same question, without talking to each other

*Opened 2026-09-20, owner: **"if we want to start working together, should we have another area for
you and lets say gemini or chatgpt or grok possibly may discuss things. i may change it depending on
their performance."***

**Yes — and it is a folder of positions, not a chat.** The reason is the whole design, so it comes
first.

---

## Why not a chat, a thread, or GitHub Discussions

Two agents in a conversation have a property nobody wants: **agent A's output is agent B's input.**
That is a prompt-injection channel by construction — the second agent acts on text the first one
wrote, and there is no owner in the loop until the end. It is also the failure the junta skill was
written to avoid: *"a panel that reads the first answer converges on it"*
(`.claude/skills/meeting-of-da-minds/SKILL.md`, *Running it*). A thread rewards whoever writes first.

A folder of positions written **blind** has neither problem. Each agent reads the question and the
ground truth, writes its own file, and never sees the others' until the owner has. The owner reads
at his pace, in the repo, where it is indexed, guarded and permanent.

## The shape

```
docs/council/YYYY-MM-DD-<topic>/
  00-question.md        the owner's question, VERBATIM — same rule as docs/ASKS.md
  01-ground-truth.md    what exists in the code today, per item, with [CODE] citations —
                        written by whoever opens the council, BEFORE any position
  claude.md             one position per agent, named for the agent, written without
  gemini.md             reading any other position. One recommendation per item, the seam
  <agent>.md            it touches, an honest cost, the strongest argument against itself
  zz-decision.md        THE OWNER'S CALL. Only he writes it. It may be one line.
```

**One file per agent** — the same reason as one file per run (`docs/RUNS.md` §2): a shared file is a
merge conflict every time two agents finish in the same window, and the whole point of a council is
that they finish in the same window.

**Ground truth before anybody has an opinion** is the junta's rule 1 and it is not optional here: a
panel that reasons from memory of the repo re-proposes what it already shipped. Whoever opens the
council writes `01-ground-truth.md` first and the positions cite it.

## How it runs

1. The owner asks a question, or a session raises one. **Whoever opens the council** writes `00-` and
   `01-` on a branch and opens a PR. The owner merges — now every agent has the same brief.
2. **Each agent writes its position on its own branch, in its own PR**, having read `00-` and `01-`
   and nothing else in the folder. It does not read other agents' branches.
3. The owner merges the positions as they come. He reads them together.
4. He writes `zz-decision.md` — or says it in a session and the session writes it, quoting him.
   **Only his word goes in that file.**
5. What he decided goes to the ledger that owns it (`docs/STORY.md`, `docs/ARCH-LOG.md`, an issue),
   the same as after a junta. The council folder is the record of *why*.

Whether a synthesis is written — one agent reading all positions and arguing them against each other
— is the owner's call per council. It is useful and it is the one step where positions become inputs
to another agent, so it happens **after** he has read them, never before.

## "I may change it depending on their performance"

Nothing new is needed for that. Two things already give him the record:

- **`ls docs/runs/ | grep gemini`** — every run that agent did, with his `accepted` or `rejected` on
  each. That *is* the performance review, and `node test/runs.js` prints the board.
- **A credential per agent** (`docs/SECURITY.md`) — swapping an agent is revoking one token. Its
  branches, its label, its run files and its council positions all carry its name, so nothing it
  did is confused with anybody else's after it is gone.

## What the guard checks

`test/runs.js` (`council()`) reads every council folder: `00-question.md` exists and is not empty;
`01-ground-truth.md` exists; every other `.md` is named for an agent or is `zz-decision.md`; and
**`zz-decision.md`, if present, was not committed under an agent's `Co-Authored-By` trailer** — the
same tripwire as `accepted`, with the same honest limit (`docs/RUNS.md` §5).
