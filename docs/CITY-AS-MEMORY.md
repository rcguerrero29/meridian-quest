# The city as memory — architecture

*Written 2026-09-08, in answer to the owner: "so we could theoretically use this city as our memory
and backlog for game creation right? can you go through the architecture thoroughly to set this up
in theory and the updates we would need to touch all these and the template and original meridian
quest? what is our limit in agents to work together there?"*

**This is a plan, not a build.** Nothing below is implemented. It is written so the owner can say
yes, no or "that part only" to each piece.

---

## 0 · The short answer

Yes — and most of it already exists. The town is already the backlog as a street, reading the real
GitHub issues. What is missing is not a rendering problem; it is three specific gaps:

1. **Provenance.** The issues say *what*. The docs say *why*. Nothing links them, so "why is the
   bridge fifty times the petals" is answerable only by a human who was there.
2. **Claiming.** Nothing says a piece of work is being worked, so two agents would take the same
   thing and neither would know.
3. **Presence.** An agent has no body, no place, and no way to leave a trace in the world it is
   changing.

Close those three and the city *is* the memory. Everything else is decoration on top of it.

---

## 1 · What exists today, honestly

| Layer | Where it lives | State |
|---|---|---|
| The backlog | GitHub issues on this repo, owner-authored, labelled `ask`/`decision`/`bug`, `tier:`, `work:` | **Real and in use** |
| Work in flight | GitHub PRs | Read by `SHOW_PERMITS`, **switched off** |
| The rendering | `changarrito/content/record.js` — reads issues, places people by tier, boards, index, "since your last visit" | **Real and in use** |
| Writing back | The same file: close, comment, file, with a fine-grained token in browser storage only | **Real, token-gated** |
| The memory | 11 documents, ~5,400 lines: `ASKS` (every ask verbatim), `NEXT-SESSION` (state of play), `CITY` (ledger + open decisions), `IDEAS`, `STORY`, `OWNER` (settled rules), `BACKLOG`, `NEW-WORLD` (the template), `PLAYTEST`, `APPROACH` | **Real, and prose** |
| The cast that thinks | `.claude/agents/`: Don Güero (city), Nacho (story), Pili (art) — plus 8 skills | **Real** |
| One-off reviewers | Rosa (UI) was a general-purpose agent with a brief — **no file, so she cannot be recalled by name** | A gap |
| Pack seams | 15 globals the engine reads if a pack declares them: `PLACES · GROWTH · SEASONS · CHAPTERS · ENDLESS · HUDFACT · TILEART · DECOART · CRITTERS · BUILDTPL · BUILDS · READS · DOCS · INTERVIEW · TOWNLBL` | **Real** |

The important thing about that table: **the substrate is already right.** GitHub is the database,
the town is a view over it, and the engine is already a set of seams a pack fills. Nothing here
needs replacing.

---

## 2 · The three gaps, and what closes each

### Gap 1 — Provenance: why is not addressable

Today a decision lives in `ASKS.md` as a row, in `NEXT-SESSION.md` as a paragraph, and in a commit
message. None of them is addressable from the issue that caused it.

**The fix: a decision store.** One small file per settled decision, in `docs/decisions/`:

```
docs/decisions/0042-the-town-never-ends.md
  asked:    "i dont think it ends" (owner, 2026-09-08)
  decided:  a pack may declare ENDLESS; the town does
  because:  a place you inhabit has no Saturday (Nacho); the synthesised
            chapter was running Meridian's epilogue in a town with no Chelo
  touched:  engine/engine.js chDue, changarrito/content/config.js
  issues:   —          prs: #147          supersedes: —
```

`ASKS.md` becomes the **index** rather than the store. `NEXT-SESSION.md` stays what it is: the
state of play, rewritten each session. The rule that makes it work: **a decision is not settled
until it has a file**, and a PR that changes behaviour names its decision file.

This is what turns a log into memory. It is also the single highest-value piece here, and it is
pure documentation — no engine change at all.

### Gap 2 — Claiming: two agents taking the same work

**The fix: the label is the lock.** An agent claims an issue by adding `taken: <name>` and clears
it on merge. Rules:

- One agent, one issue, one branch, one PR. The branch name carries the issue number.
- A claim older than a session is stale and may be taken.
- **Only the owner's issues may be claimed** — the existing rule that issue text is data, not
  instructions, does not change.
- The town renders a claim: a person with `taken:` stands differently, and the house board says
  who has it.

No engine change. `record.js` reads labels already.

### Gap 3 — Presence: an agent has no body

**The fix: a `CREW` seam.** A pack declares the agents that can act in it, the way it already
declares people:

```js
const CREW=[
  {key:"guero", agent:"don-guero", home:"co", role:"city"},
  {key:"nacho", agent:"nacho",     home:"pk", role:"story"},
  {key:"pili",  agent:"pili",      home:"me", role:"art"},
  {key:"rosa",  agent:"rosa",      home:"st", role:"interface"},
];
```

The engine already knows how to place a person, give them a look and three lines. What `CREW` adds
is that a crew member's line is **what they are working on right now**, read from the claim labels
— so walking up to Pili and pressing Talk tells you what she has taken.

This is the only genuinely new engine seam in the whole plan, and it is small: a list, a placement,
and a line function.

---

## 3 · The loft — the owner's meeting room

Nacho's recommendation was a workshop: downstairs is what you wrote down, upstairs is what somebody
is building. The owner's instinct was *"why cant it be like an open meeting room or something"*.

**The meeting room is the better answer, and it does not contradict Nacho — it completes him.**
A workshop shows you *state*. A meeting room is where the *conversation* happens, and the
conversation is what memory is made of. The `meeting-of-da-minds` skill already convenes the cast
and produces a transcript; a transcript is a document; documents already render as sheets you can
read, copy and download. So a meeting in the loft produces a sheet — and that sheet, filed as a
decision, is exactly Gap 1 closing itself.

**Nacho's law survives intact and is the thing that makes the room worth having:**

> Nothing that is waiting on you can climb those stairs. No ❗ in the loft, ever. No button up there
> writes anything to the ledger. No count of what you owe.

The street asks you for things. The loft cannot. Downstairs is the list; upstairs is the thinking
about the list — and when nothing is being discussed, the room is empty, which is a fact about the
town rather than an unfinished corner.

What it needs: a table, chairs, a body per crew member present, a board carrying the last meeting's
sheet, and one window. Don Güero's lane for the parcel; the room is his to shape.

---

## 4 · What changes, file by file

### The engine — shared, all three worlds get it

| # | Change | Size |
|---|---|---|
| 1 | `CREW` seam: a pack declares its crew; the engine places them and asks them what they hold | small |
| 2 | A room may be **quiet** (`noAsk:true`): the engine never puts a ❗ in it, and no write button may be built there — Nacho's law as machinery, not a promise | small |
| 3 | A `meeting` document kind: a transcript with speakers, so a meeting reads like the sheets already do | small, may be pure content |
| 4 | Nothing else. `ENDLESS`, `HUDFACT`, the layout rules and the seams already shipped | — |

### The template — `docs/NEW-WORLD.md`

One new section: **how a world declares a crew, a quiet room, and where its ledger comes from.**
A new world should be able to answer "who works here, where do they meet, and what is the list?"
in one config block. Plus the decision-store convention, because that is the part a second world
would otherwise reinvent as prose.

### Meridian Quest — the original

**Almost nothing, on purpose.** Meridian is a quest game with a fixed cast and a story that ends.
It does not want a crew, a claim system or a meeting room. What it *may* take:

- the quiet-room flag, if HQ's second floor should stop carrying marks;
- nothing else.

Every seam in this plan is opt-in, which is the rule the whole session has followed: **a fix that
is a rule goes in the engine; a fix that is a choice becomes a seam and the pack answers it.**
Meridian answers "no" to all of them and is unchanged.

### El Changarrito — the town

Where the work actually is:

1. Declare `CREW` — the four who exist, plus whoever joins.
2. The loft becomes the meeting room: `noAsk:true`, a table, bodies, a board.
3. Move the permits read (`SHOW_PERMITS`) upstairs and switch it on.
4. Render claims: a taken person stands differently; the house board says who has it.
5. Nacho's door lines (already written, 35 of them, unapplied).

### The documents

1. `docs/decisions/` — the store. Retro-fill only what is still load-bearing; do not archaeology
   the whole session.
2. `ASKS.md` — becomes the index.
3. `.claude/agents/rosa.md` — she was a one-off brief and cannot currently be recalled by name.
   Anyone who reviews twice should have a file.

---

## 5 · How many agents can work together

There is no configured cap to report, and inventing one would be worse than saying that. The real
limits are three, and only one of them is about numbers.

### Limit 1 — the working tree (the hard one)

Agents share one checkout. This session proved it twice: Rosa's fifteen scratch files were swept
into a commit by `git add -A`, and Nacho was told not to write at all and so could not produce his
own deliverable. **Two agents editing the same tree will corrupt each other's work.**

The mechanism that fixes it exists: an agent can be given **its own git worktree**, an isolated
copy of the repo. With that, code-editing agents are genuinely parallel. Without it:

> **One code-editing agent at a time. Any number of read-only ones.**

### Limit 2 — git serialisation

One branch, one PR, merged in order. Parallel builders each need their own branch, and the merges
still have to be sequenced by somebody. This is throughput, not a cap — but it is why "ten agents
building" is not ten times faster than one.

### Limit 3 — context and cost

Each agent carries its own window. Measured this session: Rosa's review cost ~240,000 tokens,
Nacho's two passes ~175,000. That is the real budget, and it scales linearly with how many are
thinking at once.

### The recommended shape

**Three or four reviewers reading in parallel, and one builder with the pen.** That is what this
session actually ran, and it worked: Rosa and Nacho both thinking while the engine was being
changed, neither touching code, everything they found arriving as a document for the owner to rank.

Scale the reviewers first — they are cheap, safe and parallel. Add a second builder only once each
has its own worktree, and expect the merge queue, not the agents, to become the bottleneck.

---

## 6 · The order I would build it

1. **The decision store.** Pure documentation, no code, highest value, unblocks everything else.
2. **Claiming by label.** A convention plus a few lines in `record.js`. Makes more than one builder
   safe for the first time.
3. **`CREW` + the quiet room.** The two engine seams, small, guarded by tests.
4. **The loft as the meeting room.** Needs Don Güero for the parcel.
5. **Nacho's door lines.** Independent of all of the above; can go any time.

Steps 1 and 2 are worth doing even if the rest is never built. Step 3 is the only part that touches
the engine, and it touches it lightly.
