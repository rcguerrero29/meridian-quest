# The smallest prompts that make a better version of this

*Opened 2026-09-05. Owner: "write the smallest couple of prompts one should use to make a
better version of this exercise." Three prompts. Each one exists because its absence cost
this project something specific, named underneath it. Copy them as written; change the nouns.*

---

## Prompt 1 — the founding prompt (once, before any code)

> Build me a small game as a **content pack on a shared engine**: `engine/` never contains a
> name from my world, and `content/<world>/` holds every map, person, line and drawing — enforce
> the split with a test, not a comment. Before you build anything I ask for, **quote my ask
> verbatim into `docs/ASKS.md`** and mark it open; it only leaves that table when it ships or
> when you tell me plainly why not. Keep `docs/OWNER.md` with my standing rules, and treat
> anything marked *Settled* there as a permit, not a question. My rules to start: nothing is
> ever taken away from the player; no quest log or to-do list; the world must be realistic —
> not perfect, but upgradeable; nothing goes into the world the player cannot use; build the
> ability, not the thing, unless I asked for the thing. Explain jargon plainly — I am not in the
> code. **Every test assertion you add, break the code first and show me it fails.** When a doc
> and the code disagree, report it and say which is true; never quietly plan around it.

**What it buys, from this project's own history.** The engine/content split with a test behind
it is why a second world costs a folder and not a rewrite. The verbatim ledger is the single
practice that ended *"i keep seeing you miss testing opportunities and requirements are falling
through."* The break-it-first rule caught a test that passed while the feature was 0×0 on
screen, and three more that passed while the feature was never wired to a door. "Report
contradictions" is how four stale ledger claims and a header one day old got caught by a
planning agent instead of a player.

## Prompt 2 — the session prompt (every session, first line)

> Read `docs/NEXT-SESSION.md`, `docs/ASKS.md` and `docs/OWNER.md`. Run the test suite and the
> cold-read sheet before touching anything, and tell me the version `sw.js` says is deployed.
> Then: here is what I saw when I played — *[the report, in your own words]*. Log it verbatim,
> find the root cause before drawing anything, fix it in all four cameras, prove the test bites,
> show me a before and after, and merge.

**What it buys.** "Find the root cause before drawing anything" is the stairs: the drawing was
never the problem, the tile was lying down in three of four cameras. "Tell me the version
sw.js says" is the rule that a doc recording a version must name where the truth lives — the
handoff file was seventeen versions stale once and one version stale the day after the rule
was adopted. "Show me a before and after" is what turned *"i am confused.. where are these
posters"* (asked three times) into a design bug instead of a comprehension problem.

## Prompt 3 — the review prompt (when two or more questions touch)

> Call a meeting. Agenda in my words, numbered. One agent gathers ground truth from the code
> first — no opinions yet. Then the story, city and readability experts write positions in
> parallel without seeing each other's. Then someone whose only loyalty is the code checks every
> position: does the seam exist, is the cost honest, is it already shipped, what breaks in play.
> One recommendation per item, a build order smallest-first, the disagreements named, and one
> thing the project now knows that outlives the topic. Nothing is built during a meeting.

**What it buys.** The panel that reasons from memory re-proposes what already shipped; the one
that reads first found the CEO's room on the other side of the wall we were about to hang a
staircase on, and a bug in my own change that every metadata check had waved through. "Nothing
is built during a meeting" is what keeps a plan from becoming three half-plans.

---

## What to leave out, on purpose

- **A long spec up front.** The interview (`/game-brief`) in the person's own words beat every
  spec we wrote. Blanks are fine; wrong guesses are expensive.
- **"Make it look good."** Say *"a stranger has to name every tile with no context"* instead —
  that is a test, and it has failed real drawings.
- **"Add more features."** Say *"nothing goes into the world the player cannot use"* — it
  removed two houses that looked cute and a trolley shortcut that broke the world's realism.
- **A model or agent count.** Say what each expert *decides* and what they *never* do (write
  code). The rest follows.

## The one line, if you only keep one

> Quote my ask before you build it, break your test before you keep it, and tell me when the
> docs and the code disagree.
