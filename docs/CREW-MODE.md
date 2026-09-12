# Crew mode — a switch, not a direction

    MODE: off

*That line above is the whole switch. It is read by every session at start. Change the word and the
next session behaves differently; change nothing and everything works exactly as it has all along.*

**Opened 2026-09-09 at the owner's word:** *"for the diagram about how to enable the crew, can we log
it and have a mode for this in case i want to turn it on but not use it all the time?"*

A mode is the right shape for this precisely because it is **not a migration**. Nothing about crew
mode is one-way. There is no tooling to install, no account to make, no bot and no webhook — GitHub
already has labels, branches and pull requests, and the town already reads labels. Turning it on is
a word in this file. Turning it off is the same word.

---

## ⚠ One thing that bites with the mode OFF, found 2026-09-12

Parallel agents **share one scratch directory**, and on the first six-agent run two of them wrote the
same obvious filename in the same minute: one wrote `scratchpad/panel.js`, read it back, and got
somebody else's panel. He caught it because the content was visibly not his. Subtler, and an agent
ships another's work under their own name.

**Every agent writes under a prefix that is its own name** — `scratchpad/<agent>-thing.js`, never a
bare noun — and a brief that fans out says so. This has nothing to do with crew mode: it happened
with the mode **off**, in an ordinary parallel run, which is what this project actually does. See
`docs/crew/MURALS.md`, iteration 4.

---

## How to switch it

**On:** change the line to `MODE: on`, or just tell a session *"crew mode on for this one."*
**Off:** change it back, or say *"normal mode."*

A session **must** honour a per-session instruction over this file, and must say which mode it is
working in when the answer would differ between the two. A session that is unsure is in `off`.

---

## What actually changes

| | `MODE: off` — today, and the default | `MODE: on` |
|---|---|---|
| **Who works** | one session, one branch | several agents, each on its own branch |
| **The working tree** | shared — this is the hazard | one **git worktree per builder**, so nobody edits anybody's files |
| **Branch name** | one long-lived `claude/...` branch | one per issue, carrying its number: `claude/131-sill-skulls` |
| **Claiming** | nothing — the session just works | a `taken: <name>` label on the issue **before** the branch exists |
| **Scope** | whatever the owner asked for that turn | exactly one issue; a second finding becomes a second issue |
| **PRs to read** | one | one per agent — three is comfortable, ten is not |
| **`git add`** | explicit paths only | explicit paths only |
| **Who merges** | the owner | the owner |
| **CI green before the owner sees it** | yes | yes |
| **The public game changes for the public game's sake only** | yes | yes |

**The bottom four rows never change with the mode.** That is deliberate: the mode dials how many
hands are working, never what is safe. Every irreversible step stays exactly where it is.

## The three rules that make `on` safe

1. **One agent, one issue, one branch, one PR.** A builder that finds a second problem files it and
   keeps going on the first. This is what stops a PR from growing until nobody can review it.
2. **The label is the lock.** An agent claims by labelling *before* it starts; the label clears on
   merge. A claim older than a session is stale and may be taken. The town renders it, so the owner
   can *see* who has what by walking the street.
3. **One tree per pen.** Worktree isolation is not a nicety — it is the difference between two
   agents working and two agents corrupting each other. Without it the safe number of code-editing
   agents is exactly **one**, which is what `off` is.

Both hazards behind these rules already happened, which is why they are rules and not advice:
`git add -A` swept fifteen of Rosa's scratch files into a commit that reached `main`, and Nacho
could not write his own deliverable at all because the only way to keep him off an in-flight edit
was to forbid him the tree.

---

## Turning it on for the first time — what is the owner's

The full version, with times and what is reversible, is the chart in
[`docs/crew/enable-crew.html`](crew/enable-crew.html). In short, six steps, about forty minutes of
his attention, and he can stop after any of them without breaking what came before:

1. Say *"build the decision store."* — pure documentation, unblocks the rest.
2. Read that PR and merge it.
3. Say *"add claiming by label."* — three labels plus a few lines so the town renders them.
4. Read that PR and merge it.
5. **Pick three open issues and say "run these three together."** ← the actual switch-on.
6. Read the three PRs, merge the ones he likes. **The output of this evening is the answer to
   whether three-at-once is comfortable** — that is the real decision, and nothing before it is.

Steps 1–4 are worth doing even if step 5 never happens. Nothing about them requires crew mode.

## Once it is on — the unit is a RUN, not a ticket

In `off` the unit of work is one ticket. In `on` it is a **run**: the owner names a handful of issues, they are worked
at the same time, and they come back together. A run is over when everything in it is merged or rejected, and **two runs
are never open at once** — that is what keeps it legible.

    crew mode on — run #128, #129 and #150
    crew mode on — take the top three by tier
    stop the run          (work in flight abandoned, labels clear, nothing merged)
    crew mode off         (back to one at a time, until he says otherwise)

The seven steps of a run, what he will notice that is new, what to do when two PRs collide, and the one question to ask
himself afterwards are all in [`crew/living-with-crew-mode.html`](crew/living-with-crew-mode.html). The short version:
**four of the seven steps land on nobody, two are his, and the only one that is irreversible is still the merge.**

The one question after the first run is *not* "did more get done" — more will always get done. It is: **did I read all
three PRs as carefully as I read one?** If no, the number goes down. An unread merge is worse than a slow week.

---

## The charts, kept as source

They are HTML because a picture that cannot be re-opened and edited is a dead picture. Open any of
them in a browser, or re-render with a headless screenshot:

| File | What it shows |
|---|---|
| [`crew/who-the-crew-are.html`](crew/who-the-crew-are.html) | who the crew are, how the staging area works, and the three-lane path from a finding to a merge |
| [`crew/what-happens.html`](crew/what-happens.html) | the nineteen steps one piece of work goes through, with the five that repeat marked |
| [`crew/worktrees.html`](crew/worktrees.html) | one shared folder vs one folder per builder — what it buys and what it costs |
| [`crew/enable-crew.html`](crew/enable-crew.html) | **the owner's own eleven steps** — what is his, how long, what is reversible |
| [`crew/living-with-crew-mode.html`](crew/living-with-crew-mode.html) | **what a day looks like once it is ON** — the seven steps of a run, what changes for him, and how to stop |

## Where the rest of it is written

- `docs/CREW.md` — who to call, what each may touch, how they hand off.
- `docs/CITY-AS-MEMORY.md` — the architecture: the three gaps (provenance, claiming, presence), the
  build order, and §5¾ on exactly what the git setup changes.
- `.claude/agents/` — the fourteen personas themselves.
