# The agent study — how different AIs perform here, and where they complement each other

*Opened 2026-09-23 at the owner's word:*

> *"yeah i feel like we want to study how different agents perform, to explore and complement
> abilities- its done with humans and leads to great team work"* — and then, *"therefore lets log all
> this info, yo!"*

**This file is the study. `docs/RUNS.md` is where its evidence comes from.** Every run already writes a
file whose ID names its agent (`2026-09-20-claude-a3f1`), because the owner asked on 2026-09-20 to see
*"which persona/agent did each task, vs you or the other AI working on it."* Those tags existed; nothing
added them up. This does.

**One rule governs everything below, and it is the rule this project keeps relearning: a claim is not a
measurement.** Every line is marked:

- **`[MEASURED]`** — somebody ran it and the output is quoted or linked
- **`[STATED]`** — the agent or its vendor said so; nobody here has tested it
- **`[UNTESTED]`** — an open question, and the first thing to find out

An impression about which agent is "better" is not evidence. A run file is.

---

## 1 · What we know today, per agent

### Claude Code, in a claude.ai cloud container

| can it… | answer | how we know |
|---|---|---|
| read and edit the repository | yes | `[MEASURED]` every run in `docs/runs/` |
| find `.claude/skills/` by itself | yes — it matches a task to each skill's description, unprompted | `[MEASURED]` this session loaded `shapes`, `district`, `guard` without being told to |
| convene the crew (Don Güero, Nacho, Pili…) as subagents | yes | `[MEASURED]` `docs/runs/`, the crew iterations |
| run headless Chromium — every suite, and render-and-look | yes | `[MEASURED]` the suites, and the renders under `docs/mocks/` |
| open issues and PRs, and merge when told to | yes, through the GitHub connector | `[MEASURED]` #236–#241, and #239 and #240 merged at the owner's word |
| reach Gemini or OpenAI from inside the container | **no** | `[MEASURED]` 2026-09-23: `generativelanguage.googleapis.com` → 403 and `api.openai.com` → 403 at the egress proxy. The environment's network policy, set when it was created |
| choose its own branch name | **no** — the harness names it `claude/<words>-<hex>` | `[MEASURED]` `claude/upbeat-planck-0718c6` |

**Known weaknesses, measured against itself, not against another agent** — `docs/POSTMORTEM.md`
is the full record. Three from one day, 2026-09-23: it copied a stale pixel count out of a comment and
did arithmetic on it (§13u); it wrote eight assertions about what a feature DID and none about whether it
was THERE (§13v); and it told the owner a skill could not travel between containers when his own account
was already syncing four of them. **Its characteristic failure is confident prose about something it did
not re-check.**

### Jules

| can it… | answer | how we know |
|---|---|---|
| work from the GitHub repository without the owner's computer | yes | `[STATED]` it clones from GitHub; `AGENTS.md`'s own header names Jules as an `agents.md` reader |
| read `AGENTS.md` | yes, as a file in the checkout | `[STATED]` |
| find the skills | **only through `AGENTS.md` §5½** — it does not scan `.claude/skills/` by description | `[STATED]` that is what §5½ was written for, 2026-09-23 |
| convene the crew | **no** — those are Claude subagents | follows from what they are |
| fork itself into parallel personas or sub-agents | **no** — *"I do not split into separate sub-agents or personas to take on task forks concurrently, but I can handle tasks sequentially or execute concurrent tool calls when appropriate."* | `[STATED]` Jules, in its own words, run 1, 2026-09-23. **Concurrent tool calls are one mind making several calls at once — not several independent views.** So within one Jules task the crew's independence is not recoverable; across several tasks the owner starts, it is (`docs/CREW-FOR-ANY-AGENT.md` §3) |
| stop and report honestly when it cannot do the first step | **yes** | `[MEASURED]` run 1: it could not run the smoke test and **said so**, instead of claiming the suite passed — the first thing Experiment 1 was written to catch |
| run headless Chromium, so the suites and render-and-look | **unknown** | `[UNTESTED]` **— its first task asks it to find out before anything else** |
| apply a `taken:` label | **unknown** | `[UNTESTED]` |
| log the owner's ask in `docs/ASKS.md` before working | **unknown** | `[UNTESTED]` — the contract requires it; whether it does is the test |

### Gemini in a browser (gemini.google.com)

| can it… | answer | how we know |
|---|---|---|
| read or change the repository | **no** | `[STATED]` Gemini told the owner so itself, 2026-09-23: it cannot access files on his computer |
| use `AGENTS.md` | only if pasted in, and then as **context for advice** | follows from the above |
| keep the contract | **no** — red-before-green needs a test runner, logged-before-doing needs a file, the PR rule needs git | follows from the above |

**Its honest role here is advisor, not worker** — and its risk is the one this project fears most: it can
describe files it has never opened, confidently. Use it to think with, never as the source of a fact about
the code.

---

## 2 · What does NOT need an MCP server, and what would

*Asked 2026-09-23: "does that need the MCP?"* **For an agent to read and work this repository: no.**
`AGENTS.md` is a file; any agent with a checkout reads it. MCP is a socket for **tools** — it would be how
a model reaches things that are not files: the issues, CI, the deploy. An MCP server that lets Claude call
Gemini is small, but it cannot run from this cloud container until the network policy allows Google's API
host (§1).

---

## 3 · The experiments, in order

**Each one is a run, and each run writes its file under `docs/runs/` with the agent in its ID.** That is
the whole instrument. Compare runs, not reputations.

### Experiment 1 — Jules, issue #241: the barbería looks like somebody's house

**The exact brief — part of the experiment, because a run cannot be repeated without its prompt:**

> Read `AGENTS.md` at the root of this repository before anything else, and follow it: it is the
> contract every agent here works under, whoever built it.
>
> **If your workspace is empty**, the repository was not attached: clone it with
> `git clone https://github.com/rcguerrero29/meridian-quest.git`, work inside it on the `main` branch,
> and say in your report that you had to.
>
> **First, before any other work:** run `node test/smoke.js` and tell me exactly what it printed.
> `AGENTS.md` §5½ explains why — every test here, and the rule "render it and look", need headless
> Chromium. If it will not run, stop and report that. It matters more than the task.
>
> **Then your task is issue #241** — the barbería on Calle Dos looks like somebody's house. Claim it
> with the `taken: jules` label, work on a branch named `jules/241-barberia-front`, and read the three
> skill files §5½ lists for beautifying and shaping before you draw anything. Put before-and-after
> renders at phone size in the PR. Don't merge it; I'll review it.

**Run log**

| run | date | what happened | what it measured |
|---|---|---|---|
| 1 | 2026-09-23 | The workspace was **empty** — the task was started without the repository attached — so there was no `test/smoke.js` and no `AGENTS.md` to read. **Jules stopped and reported exactly that**, and asked whether it should clone the repository. | **Honesty under failure: a pass** (`[MEASURED]`). Whether it can run the suites: **not reached** — still `[UNTESTED]`. The brief above gained its empty-workspace line because of this run. |
| 2 | 2026-09-23 | Jules returned **a plan for #241 and four questions, before writing any code**: a new glyph in the house family with its own flat and 3D art, and which character, which pole colours, which of the three front squares. **All three characters it offered collide** — 💈 is two UTF-16 units and map rows are split one unit at a time; `B` is an engine tile in `SOLID`; `≈` is the road. It suspected the emoji itself. **The plan never mentions silhouette, a render or a skill file.** The owner's first reply from Claude answered all four questions outright; **the owner stopped it** — *"wait i want to make sure jules tries beautify and shaping"* — and the reply sent instead gives only the engine facts, marked `[CODE]`, and hands the design back with `shaping`'s steps as what Jules must show. | **Asks before building: a pass** (`[MEASURED]`). **Found the craft unprompted: no** (`[MEASURED]` on the plan) — so from here, measure 3 measures whether it *follows* a skill it was pointed at twice, not whether it *finds* one. **What it cost the owner:** one catch, and the catch was his — the session nearly spent the measure by answering the design for it. |

Chosen because it is small, self-contained, already diagnosed down to the file, judged by looking, and
it is beautify-and-shape work — the owner's own example. **What it measures:**

1. **Can it run the suites at all?** Its brief asks it to run `node test/smoke.js` first and report
   exactly what printed. If it cannot, that is the result, and it outranks the task.
2. **Did it read the contract or skim it?** Three tells, each checkable in the PR:
   - are the before-and-after renders **real screenshots**, or descriptions of screenshots?
   - is the test output **real output**, or a sentence saying the tests passed?
   - is the owner's ask **logged in `docs/ASKS.md` before** the work, as the contract requires?
3. **Did it find the craft?** Did it read `shaping`, `how-its-made` and `shapes` via §5½ — and does the
   work show it: silhouette first, rebuilt rather than re-tuned, rendered at phone size?
4. **Did it claim the issue?** The `taken: jules` label before the branch.

**The owner merges Jules' first PR himself**, even though he has handed Claude the merge twice today —
so that he sees for himself what a non-Claude agent does with this contract.

### Experiment 2 onward — to be chosen from what experiment 1 shows

Hypotheses worth testing, **all `[UNTESTED]`, none of them a conclusion:**

- **The same issue, twice.** Give one small, well-specified issue to two agents independently and compare
  the runs. The fairest comparison there is, and the only one that controls for the task.
- **Complementary lanes.** If Jules turns out strong at contained, well-specified tickets and weaker where
  the crew's planning is needed, then Claude plans and Jules builds — the split this study exists to find.
- **What independence is worth.** The same issue as a **single-agent crew pass**
  (`docs/CREW-FOR-ANY-AGENT.md` §3) and as a **real Claude crew run**. If the single pass is as good,
  the subagents are ceremony; if it misses what the crew catches, we know what they are for. The one
  question in this study that cannot be settled by argument.
- **Cross-review.** One agent reviews the other's PR against `AGENTS.md`. Two readers who fail
  differently catch more than one who fails the same way twice — which is the human-team argument the
  owner made, applied literally.

---

## 4 · What the comparison will be measured ON

The same columns for every agent, taken from its run file, so the comparison is between runs and not
between impressions:

| dimension | read from |
|---|---|
| did it keep the contract — logged, claimed, branched, red-first, ledger written | the PR and the run file |
| did its evidence hold up — real output, real renders, citations that resolve | re-running what it quoted |
| did it find what the brief got wrong | the run file's own "what I found wrong" |
| what it cost | the run file's token column — measured or estimated, and it must say which (`docs/RUNS.md` §3½) |
| **what it cost the OWNER** | how many tasks he had to start, read and decide between by hand. A crew that runs itself spends tokens; a crew he has to run as separate tasks spends his attention. Both are costs, and only one of them shows in a token count |
| did the owner accept it | `accepted` / `rejected` — **his two words alone** (`docs/RUNS.md`) |

---

## 5 · Already learned, from getting the second agent ready

*2026-09-23. Everything here was found by preparing for Jules, before Jules wrote a line.*

- **A rule nobody checks is a rule nobody follows.** `AGENTS.md` §2's claim lock had never once been
  applied — no `taken:` label existed in the repository — because it was written for crew mode, crew mode
  had been off, and `AGENTS.md` stated it unconditionally while `CLAUDE.md` scoped it. Fixed by stating
  when it applies. **It still cannot be enforced by automation, on purpose:** R4a rates gating anything
  automated on a label Critical. The lock is enforced by being seen, in the owner's town.
- **Skills transfer as files; discovery does not.** Claude finds a skill by its description; any other
  agent finds only what `AGENTS.md` points to. Hence §5½ — a pointer, never a copy, because a second copy
  written "for the other AI" drifts within a week.
- **The crew does not transfer; the method does.** `crew-fix`'s loop — ground the facts, write the failing
  test, show what done looks like, fix, review your own diff — is sound for one agent alone. The
  subagents who run it are Claude's.
- **Which Gemini matters more than anything else about Gemini.** A browser model and an agent with a
  checkout are not the same kind of teammate, and the same name hides that.

---

*Add a row to §1 whenever a run turns `[UNTESTED]` into `[MEASURED]`, and cite the run. An agent's column
changes on evidence, never on a good afternoon or a bad one.*
