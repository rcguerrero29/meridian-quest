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
[`docs/crew/enable-crew.html`](crew/enable-crew.html). In short, part one is six steps, about forty minutes of
his attention, and he can stop after any of them without breaking what came before:

1. Say *"build the decision store."* — pure documentation, unblocks the rest.
2. Read that PR and merge it.
3. Say *"add claiming by label."* — a `taken: <name>` label as the lock, and a few lines so the town
   renders it. **Built 2026-09-13 (`ch-v102`): the person wears a sash, says who has them when you
   talk to them, and the house board lists who has what.** Create the label once per name — `gh label
   create "taken: beto"` — because `gh issue edit --add-label` refuses a label that does not exist; the
   agent then applies it with `gh`, and the owner can untick a stale one from the person's own Labels
   card.
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
| [`crew/enable-crew.html`](crew/enable-crew.html) | **the owner's own eleven things** — seven steps (six to switch it on, one for Pages) plus a four-item standing loop; what is his, how long, what is reversible |
| [`crew/living-with-crew-mode.html`](crew/living-with-crew-mode.html) | **what a day looks like once it is ON** — the seven steps of a run, what changes for him, and how to stop |

---

## Where the switch stands — 2026-09-13

Of the six steps above: **1 is done** (`docs/decisions/`, three files), **3 is built on this branch**
(claiming by label, `ch-v102`) and waits on its merge (step 4). **5 has never happened** — the mode has
never been on. Every "crew run" to date was `/crew-fix` with the mode off: advisers in parallel, one
session holding the pen. Two things that are the owner's before step 5, both found by Zeni the day the
lock was built (`docs/BOUNDARY.md`):

- **The label is a note, never a trigger.** `docs/story/el-changarrito.md` R4a says nothing automated
  may gate on a label or a comment; `test/leaves.js` now fails the build if a workflow gains such a
  trigger. The two rules only collide the day something runs on a claim — so nothing may.
- **Nothing in this repository can read GitHub → Settings → Pages → Source.** If it says "deploy from a
  branch", every guard on the public build is inert. Thirty seconds of his account; row 1 of the ledger.

## What running many agents teaches, and which of it applies to a game engine — 2026-09-13

*At the owner's word: "i know people use your abilities to run many many- up to thousands of agents. is
there anything we should keep in mind from these modes of working while creating our game engine here."
Each line says where it comes from: `[TRAINING]` is how large fleets are actually run, `[CODE]` is the
evidence this repository has already produced on its own. Where the two agree, the rule is settled.*

**The short answer:** a fleet is not many hands, it is many hands **plus a check that rejects their
work without a person reading it**. Everything below is a special case of that sentence.

| # | What fleets do | Why | Where this repo already met it |
|---|---|---|---|
| 1 | **Scale verification before generation** `[TRAINING]` | A thousand agents produce a thousand diffs; the fleet is only as fast as what can reject a wrong one automatically. Where the judge is a human, the fleet's size is the human's reading speed | `docs/crew/TOWN-STATE.md`: iteration 2 produced ~30 patches and none landed — *"review is the bottleneck, not generation"* `[CODE]` |
| 2 | **A cold agent knows only what it reads first** `[TRAINING]` | Every fleet agent starts with an empty context. The brief and the first file are the whole mind; nothing is remembered between runs unless it is written where the next one reads | the shared block in `.claude/agents/`; Rosa finding her own un-applied edit in `FLIGHT-NOTES.md`; the block missing `POSTMORTEM.md` until today `[CODE]` |
| 3 | **Return data, not prose** `[TRAINING]` | A fleet validates output at the boundary — a schema the worker must satisfy, or the result is retried. Paragraphs cannot be checked; shapes can | the ticket's five headings; the mural panel's return block; the flight-notes ledger with a guard that counts rows `[CODE]` |
| 4 | **One writer per tree, and a lock with a date on it** `[TRAINING]` | Parallel writers corrupt each other; the fix is isolation plus a *lease* — a claim that expires, so a dead worker's work can be taken. A claim with no time on it cannot be told from a live one | `git add -A` sweeping Rosa's files; two agents writing `scratchpad/panel.js`; `docs/CITY-AS-MEMORY.md` §2 — *"a claim older than a session is stale"*, which is a lease `[CODE]` |
| 5 | **Every step is safe to run twice** `[TRAINING]` | Agents die mid-task and are retried. A step that harms on its second run breaks the fleet; append-only records and fingerprints are how fleets stay resumable | the suites; `test/town.state.js` (a scoreboard that never gates); `docs/crew/MURAL-LEDGER.txt` (add and improve, never remove, fingerprinted) `[CODE]` |
| 6 | **The brief is a file, not a paragraph** | A hand-written brief drops steps and nobody sees which; the fleet copies the same block into every worker | 2026-09-14: the healthy-eating run's brief carried the flight-notes instruction and dropped the mural one, and seven designers returned with no panel. The owner: *"ensure any crew mode creates a mural entry."* The crew-fix skill's mural section is now copied verbatim, and the town suite refuses an iteration with no paint |
| 6 | **Adversarial verification is a job, not a mood** `[TRAINING]` | Fleets run independent refuters against every finding and keep only what survives. A finding nobody tried to break is a guess with a confident tone | `docs/REGRESSION.md` §3: fourteen guards that read a proxy, *none found by review, every one by planting*; Melo exists for this `[CODE]` |
| 7 | **Dedupe against everything seen; loop until dry** `[TRAINING]` | Discovery (bugs, leaks, gaps) runs until two rounds return nothing new, and dedupes against *everything ever seen*, not against what was confirmed — or rejected findings return every round | *"Dedupe against `docs/NEXT-SESSION.md` first"* (`docs/CREW.md` rule 4); iteration 2 not re-deriving iteration 1 `[CODE]` |
| 8 | **Provenance on every line** `[TRAINING]` | With many hands, a wrong claim cannot be traced unless each line says where it came from. A brief is evidence, not authority | `docs/SOURCES.md`; `[CODE]`/`[MEMORY]` marks on a brief; Beto refusing a brief and going to `docs/ASKS.md:52` `[CODE]` |
| 9 | **Small units, one owner, bounded diff** `[TRAINING]` | A worker gets one task with a stated boundary; a diff nobody can read in ten minutes does not merge | crew-mode rule 1: one agent, one issue, one branch, one PR; *"three is comfortable, ten is not"* `[CODE]` |

### For the engine itself — the four that change what gets built

1. **Content as data plus a validator is what makes agent-written content safe.** A pack is data the
   engine checks at boot; when agents write packs, the engine grows *validators* before it grows
   features. `docs/GAUGE.md` is that instrument. `[CODE]`
2. **Everything an agent may cite must have a name.** A fleet addresses work by id; a quest that is
   only an array position (#153) cannot be claimed, pinned by a test, or referred to in a brief
   without drifting the day someone inserts one. That is why it is the largest single blocker to
   a template. `[CODE]`
3. **Append-only registers with a fingerprint are the shape for anything agents write into the
   game.** The mural ledger is the template: adding is free and silent, editing after the fact fails
   the build. Any future agent-authored artifact — a plaque, a door line, a season — should ship the
   same way. `[CODE]`
4. **Keep the scoreboard and the gate apart.** A metric that can fail the build gets weakened rather
   than met; fleets separate the two for the same reason. `test/town.state.js` measures and never
   fails; `test/town.smoke.js` fails and never measures. `[CODE]`

### What not to copy

- **"Thousands" is a claim about independent, checkable pieces.** A migration across a thousand files
  fans out because each file is judged by the same test. A game is judged by a person walking it —
  four of the last five real faults came from the owner playing, not from any suite `[CODE]` — so
  the honest cap here is how many PRs he will read as carefully as one. That number is three, and
  it is his to change.
- **Do not build orchestration.** This harness runs about ten to sixteen agents at once regardless;
  a fleet's scale is over time, not at once. GitHub labels, branches and worktrees are the queue,
  the lock and the isolation, and the town already renders them. Nothing here needs a bot.
- **Do not let a fleet decide taste.** Fleets converge on the defensible answer; the owner has been
  right against the crew on the tram, the wall and the sills, each time for a reason nobody had.
  Every open question in `docs/OPEN.md` §1 is a taste question, and stays his.

## Where the rest of it is written

- `docs/CREW.md` — who to call, what each may touch, how they hand off.
- `docs/CITY-AS-MEMORY.md` — the architecture: the three gaps (provenance, claiming, presence), the
  build order, and §5¾ on exactly what the git setup changes.
- `.claude/agents/` — the nineteen personas themselves. `test/town.smoke.js` holds them to one shared block, first and once, one person per file.
