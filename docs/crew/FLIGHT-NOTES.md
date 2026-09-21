# Flight notes — what each agent expected, what actually happened, and what they changed

*Opened 2026-09-11. The owner: "lets try to get agents to be forced to document how they can improve
before they start the task and after too to try to keep improving themselves and their persona based
on their experience in the first iteration, they have to ensure their persona was fitting or they
modify it to plan or execute better."*

**Newest first.** The next iteration reads this file before it starts — that reading is the whole
mechanism. Without it, iteration two is iteration one with a different random seed.

**A proposed persona edit is a proposal.** The calling session applies it or refuses, in writing,
here. No agent edits `.claude/agents/` — see `.claude/skills/crew-fix/SKILL.md`. **The contradiction
this file carried against `docs/RUNS.md` §6 between 2026-09-20 and 2026-09-21 is closed:** the
proposal is always written to `docs/personas/proposed/`, AND the session applies it or refuses it
here. The owner settled it in his own words on 2026-09-21 — *"yeah update the older ones so you can
make the decison to update personas"* — and overrules any decision at any time.

---

# THE LEDGER — every proposed persona edit and what happened to it

*Added 2026-09-11 in the middle of iteration 2, because the rule above was written and the very next
session did not follow it. **A rule with no visible ledger is a hope.** An absence is invisible; a
blank row is not. Nothing leaves this table without a verdict.*

| # | Agent | The edit, in a phrase | Verdict |
|---|---|---|---|
| 1 | `rosa` | *Teleporting by hand is not arriving — call `worldArrived`* | **APPLIED 2026-09-11, a day late.** Proposed in iteration 1 and never actioned either way. See the leak below |
| 2 | `beto` | The two engine facts he re-derives (`px,py` ints vs `fx,fy` floats; `loop()` gates) | **APPLIED** — both produced findings in the same run that motivated them |
| 3 | `beto` | Predicate versus query, as a distinction RULE/CHOICE does not give him | **APPLIED** — he nearly routed a stop list through an inert `kind` because of the gap |
| 4 | `tavo` | Some things are allowed to be purely pleasant; the fence is an `ARCH-LOG` line | **APPLIED** |
| 5 | `tavo` | Check your own last note before you reuse it | **APPLIED** — added by the session, not proposed. He re-checked his iteration-1 finding unprompted and it was wrong; the habit is worth more than the finding |
| 6 | `rigo` | A compressed world needs a ratio, not a shrug — real number, factor, floor | **APPLIED** |
| 7 | `rosa` | Some things are true for less than a second — stopwatch, not a box | **APPLIED** |
| 8 | `chema` | `renderOrder` alone will not put anything after the people | **APPLIED 2026-09-11, two runs late.** Proposed in iteration 1, never actioned. Verified at `engine3d.js:688` before applying |
| 9 | `cuca` | A body is not a blocker — `SOLID` stops you, `t3Boxy` gives you a body | **APPLIED 2026-09-11, two runs late.** Same. Verified at `engine3d.js:259` |
| 10 | `pili` | Read `test/town.state.js:53-54` before claiming you moved the flat-picture count | **APPLIED 2026-09-11, two runs late.** Rosa named this leak; Pili found her own proposal sitting in it |
| 11 | `don-guero` | A map's row count is load-bearing; an inserted row is never one edit | **APPLIED 2026-09-11, one run late.** Proposed iteration 2. He re-proposed it in iteration 3 asking only for *a row*, not for application |
| 12 | `pili` | A look is five keys and only two are silhouette; the letter half of `NPCLOOK` is a global namespace | **APPLIED** — it is the finding that found Doña Tencha |
| 13 | `don-guero` | `CITY.md` tells you which parcel, not what a person's boots are on | **APPLIED** |
| 14 | `beto` | Before you write a guard, find the one that should already have caught it | **APPLIED** — it is the finding that found `validateWorlds` passing four arrivals on live rails, and the two blind suite filters |
| 15 | `chuy` | Evidence is a third kind of paper — file the sweep and the rule separately, and grep the identifier rather than paste the number | **APPLIED** — five of seven citations in a same-day sweep had already slid |
| 16 | `chuy` → `tavo` | Removing the pressure is half a design (Chill Mode) | **APPLIED** |
| 17 | `chuy` → `mari` | A calm brief is unfinished until you name what replaces the pressure | **APPLIED** |
| 18 | `chuy` → `nacho` | Specific to people, not representative of a cuisine | **APPLIED** |
| 19 | `paty` | A string is a claim about a state — find the state before you judge the sentence | **APPLIED** — she found two of four toast states do not exist in the engine |
| 20 | `chema` | Ask the scene graph, not only the frame | **APPLIED** — one `getWorldQuaternion` call settled a question three filmstrip rigs could not |
| 21 | `chava` | "Would a player notice" is a rate, and your eyes cannot produce one | **APPLIED** — his own first trace was ruined by where his hero was standing |
| 22 | `beto` | `syncChill`'s id is the identity of the BODY, not of the issue — anything baked at spawn must be in the id | **APPLIED 2026-09-13** — it is the finding that made claiming by label render at all; measured, not assumed |
| 23 | `zeni` | When you cannot verify a date, write the date's source instead of the date | **APPLIED 2026-09-13** — the first edition of `docs/BOUNDARY.md` has a column of citations where a column of dates was promised, and says so |
| 24 | `chuy` | `.claude/agents/` is a filed thing too — read every persona to the END before you quote its role | **APPLIED 2026-09-13** — it is how he found Toño inside Rigo, looking for a roster line |
| 25 | `yaz` | A version string is a cache key wherever it is read, including by a person | **APPLIED 2026-09-13** — the town's `GAMEV` is the only thing that tells the owner's laptop to pull, and nothing guarded it |
| 26 | `chuy` → `rigo` | The tranviario's own file repeated the belief he disproved — "changes ends when it reverses" | **APPLIED 2026-09-13** — a correction, not a character change; the tram does not reverse and his file now says so |
| 27 | `chuy` → `lupe` | "Run the four suites" — CI runs more, and the gauge was never on her list | **APPLIED 2026-09-13** — one line, the suites named by the README rather than by a number |
| 28 | the session → `melo` | His description named "the BOUNDARY list in test/leaves.js"; the list lives in `docs/BOUNDARY.md` and the script reads it | **APPLIED 2026-09-13** — one clause, so the file he is sent to is the one that holds the list |
| 29 | `pili` | Visible, legible and meaningful are three different measurements, and only the third is hers | **APPLIED 2026-09-13** — the sash passed the first two and read as honour; the hard hat moved the meaning to the outline |
| 30 | `melo` | A count instead of an identity — when a guard counts, ask what a count of one would let through | **APPLIED 2026-09-13** — the persona guard now reads the file's name against the person it hands the model; his other four plants that got past are closed the same hour |
| 31 | `lupe` | Look at a screenshot FIRST, then at the end — no car on the rollers, no reading | **APPLIED 2026-09-13** — twenty-eight rows measured on a canvas with no layout box; the picture caught it three hours later |
| 32 | `tavo` | His own file quotes `TRO_SPEED` 3.4 and "18% slower than walking"; it is 6.0 and the tram is faster than legs — replace the sentence, grep the identifier | **APPLIED 2026-09-14** — the sentence replaced with his own correction; `TRO_SPEED` verified 6.0 before writing it; the panel that carries the wrong number stays up, by the wall's rule |
| 33 | `rigo` | Paint is two colours and a rule, and the rule is not taste: a dark panel below the waist and a light band round the windows, never two mid-tones | **APPLIED 2026-09-14** — appended to "What you actually know"; it is A14's value rule in his words |
| 34 | `pili` | Check the object against the thing it STANDS ON, not only against the wall behind it — the sweet and the ledge differ by 0.4 of 255 | **APPLIED 2026-09-14** — with one line pointing her at Chema's measurement, so the sixth fix is not a sixth colour |
| 35 | `cuca` | Identify the room from the picture, not from the ticket; and know which cameras draw art at all | **APPLIED 2026-09-14** — a new section, "Which room is he standing in"; line numbers replaced by greps |
| 36 | `beto` | A seam is only as real as its readers — before designing a table of options, count which of its keys something already draws (`TROKEYS` exists for exactly this) | **APPLIED 2026-09-14** — appended to the guard bullet it extends |
| 37 | `don-guero` | Before you site a building's HEIGHT, read the door's neighbours: the lintel takes its height west-first and wears no face; the sill sprite is positioned by the wall's height and sized without it | **APPLIED 2026-09-14** — a third bullet, and the heading now says three |
| 38 | `chema` | Blank one painter and diff the frame before measuring contrast — it turned "hard to see" into "the front camera delivers zero"; crop one object 8× twice, the whole viewport decided nothing; a Sprite is one quad at its anchor's depth, so a wall-hung billboard's offset is height × pitch, a formula not a constant | **APPLIED 2026-09-14** — a new section after "Ask the scene graph"; line numbers replaced by greps |
| 39 | `mari` | Two blockers every new world hits (careers are hardcoded in three shells; `ENDLESS` may not have `CHAPTERS`) — re-grep them before promising a date; and the day-budget tell for any planner | **APPLIED 2026-09-14** — her final bullet replaced by two, stale `:330/:333` → grep + dated numbers |
| 40 | `tavo` | A model the player has to maintain decays, and the cost is not the typing — price the drift, log by exception | **APPLIED 2026-09-14** — appended under "What you hold to"; it is R17 in his words |
| 41 | `pili` | A look is five keys and only two of them are silhouette; `drawPerson` had drifted 435 lines in her own file; hair value is the one identity mark a theme cannot move | **APPLIED 2026-09-14** — the second bullet of "Two engine facts about looks and counts" replaced |
| 42 | `nacho` | Before you write three endings, find out what picks between them — `gradeOf` returns 3 when nothing was ever answered | **APPLIED 2026-09-14** — appended to the endings paragraph; it is R16's code fact |
| 43 | `beto` | A document need not be registered (`docDef` takes the object) and a pack's state does not ride the save (`sanitizeSave` rebuilds a whitelist; the pass carries only `loadSave()`) | **APPLIED 2026-09-14** — a fifth engine fact; the heading now says five |
| 44 | `paty` | There is no `chatSay` — her own file cited a function that does not exist; `toast(msg,ms,crit)` takes its ms from the caller, the chat line passes 2800; write the Spanish first for anything that toasts | **APPLIED 2026-09-14** — the paragraph replaced; every claim in it re-grepped by the session first |
| 45 | `tono` | The town can give three answers, not two: works / had to copy / never declares it — say `untested`, never `travels` | **APPLIED 2026-09-14** — step 4 of "Before you say anything" replaced |
| 46 | `chava` | When you conclude a thing is ABSENT, crop it at 3× before you say so — four passes said "there is no mural" and the paint was there every pass | **APPLIED 2026-09-14** — a new section at the end of his file; his panel *El pie cortado* is on the wall (iteration 6, late) |
| 47 | `nacho` | When you write words for somebody who is not in this repo, follow them out the door — `docMarkdown` has no branch for `form`, so the 📋 button copies the questions and not one answer | **APPLIED 2026-09-14** — appended to the endings paragraph; the three greps verified on applying (`function docMarkdown` emits exactly h · p · note · blank · kv · t · q · docs) |
| 48 | `tavo` | A question that FILLS a blank is not a question that DECIDES a build, and only the DECIDES pile can be cut for redundancy | **APPLIED 2026-09-14** — a new bullet after "A model the player has to maintain decays"; he nearly cut the allergy list, the one question the mechanism exists for |
| 49 | `rosa` | When there is no artefact, build the cheapest real one — then measure THAT, and say it was the prototype measured, not the game | **APPLIED 2026-09-14** — end of "Some things are true for less than a second"; the throwaway is an instrument in the scratchpad, not an edit, so her refusal stands; her closing "nothing else" paragraph is post-flight, not persona, and was not carried |
| 50 | `paty` | The toast arithmetic — 600 ms plus 45 ms per ES character; `carePackToast` gets 3600 ms for 121 ES characters against 92 EN | **APPLIED 2026-09-14** — after "write the Spanish first" (found, wrapped over three lines); `strings.js:45`/`:266` and the 3600 verified; the session counts 116 ES code points, not 121, said in the marker with the grep, conclusion unchanged |
| 51 | `mari` | A handoff is not a silence — hand over the facts with `file:line` before you name whose door it is | **APPLIED 2026-09-14** — after "rather than doing their jobs badly"; she nearly parked `worldFlags()`/`pendingAt` as somebody else's forty minutes |
| 52 | `pili` | A dark ground does not add contrast, it confiscates the bottom of the scale — subtract the surface's luma first; the accent is a fill and the muted is letters; the chrome owns no warm colour | **APPLIED 2026-09-14** — end of "What you actually know"; her own marker kept inside the standard one because it carries the hand-computed caveat (Bash was disabled; no hex went through a script) |
| 53 | `cuca` | Two fronts, one tile, only one ever opens — `checkRead` probes north first, so readables go in a line along one wall; a W≤10, H≤8 room is on screen from everywhere | **APPLIED 2026-09-14** — a new final section; the probe order and `const VW=` verified; there is no `draw2D` in the engine (the two `const camX=` lines are in `drawFront` and `draw`) — said in the marker, her words not altered |
| 54 | `beto` | The reader's `art` block hands the pack the ELEMENT — a surface that listens is pack code; and `docOpen` resets both scrolls unconditionally | **APPLIED 2026-09-14** — a sixth engine fact; the heading now says six; `s2.art&&typeof s2.art`, `cv.width=W*K` and the `paperScroll` reset verified |
| 55 | `don-guero` | The plan is not the city — `drawTown` paints `WORLDS[PL.street]` and nothing else; a glyph in neither colour table paints the pavement default (`$`); never a third mark | **APPLIED 2026-09-14** — a fourth bullet; the heading now says four; `$` confirmed absent from both `BASECOL` and `MAPCOL`; *no practice is ever missed* is `docs/OWNER.md`, and `docs/ARCH-LOG.md` A3 exists |
| 56 | `lupe` | When the thing you are measuring is a PICTURE, ask what was switched off to take it — a document poses for its photograph | **APPLIED 2026-09-14** — appended to bullet 4, found verbatim; the line after that bullet in her file is a stray fragment from an earlier edit ("teeth along every wall in HQ…"), left as found because it is outside the block |
| 57 | `remedios` | Find the ledger before you read its copies — open the book first, and if you cannot, say so in the first paragraph | **APPLIED 2026-09-14** — a final bullet under "What you hold to", carrying her own marker as written; forty minutes of reading copies before finding she had no tool for the original |
| 58 | `zeni` | The four lines are not four — the fifth is the repository itself: `docs/` is out of the box and the repo is public | **APPLIED 2026-09-14** — after the "Not linked" bullet; `test/public.js:44` (the `NEVER` list) and `CLAUDE.md:14` ("the repo is public") both verified, and the greps written beside them in the marker |
| 59 | `research-map` | *First pass.* Render the current state from the real game before opening the web | **NO FILE** — a research lens has no persona by design; the line it would put first is recorded here: *"Render the current state from the real game before opening the web; the repository's own rule book has usually already answered half the question, and it is the half you can cite by line."* |
| 60 | `research-map` | *Second pass.* You have a prior self on every run — go first to the line under its WHAT I DID NOT CHECK | **NO FILE** — the line: *"You have a prior self on every run: find your last return before you read the web, and go first to the line under its WHAT I DID NOT CHECK; the measurement that closes it is usually the one nobody else made."* |
| 61 | `research-form` | Try to open one page before you search; if the proxy refuses, write "extract" on every claim from the first line | **NO FILE** — the line: *"Before you search, try to open one page; if the proxy refuses it, write 'extract' on every claim from the first line, not in a footnote."* |
| 62 | `lupe` | Reproduce the fault before you believe the FAULT — make the bug appear twice before you name it once | **APPLIED 2026-09-14** — appended to bullet 1 of "How you work", anchor found verbatim; the "same sentence twice" was a toast at 0.82 opacity shot at 2.6 s over a ticker doing its job, gone by six |
| 63 | `rosa` | When the screen is drawn inside a shipped component, say for every finding whether it is the mock's or the component's, with the component's `file:line` | **APPLIED 2026-09-14** — one line at the end of "What earns a finding"; she named no anchor, so the session chose the nearest and says so in the marker; six of her eight findings were the reader's, not the mock's; her refusal to edit code and file issues stands |
| 64 | `pili` | A ground may carry an identity only where something non-colour repeats it — where the word is absent, the shape must do the naming | **APPLIED 2026-09-14** — a new paragraph after "Check the object against the thing it STANDS ON", found verbatim; twenty merge tiles, one silhouette, four hues, and a tier-5 comal Δ9.4 from a tier-1 board; the rule she quotes as "my own" is not in her file (its nearest form is her run-8 return) — said in the marker, her words not altered |
| 65 | `beto` | Before you price a picture's element as "new", find the seam that already half-exists — a half-shipped capability reads as unshipped from the picture | **APPLIED 2026-09-14** — appended to the guard bullet after its run-8 paragraph; `engine.js:4477`, `content/meridian/strings.js:8`, `:3980` and `:503` all read before applying and the greps written in the marker; he said in writing that his refusal stands |
| 66 | `nacho` | Before you write the sentence that says what a screen means, grep whether the screen can say it — `d.sub` is read once, in the export | **APPLIED 2026-09-14** — after the run-8 append to the endings paragraph, so the two `docMarkdown` lessons read in order; `engine/engine.js:3344` verified as the one `d.sub` read |
| 67 | `paty` | A document's `sub` is not a state the screen has — `sub` is exported prose, `note` and `p` are screen prose, a canvas caption is neither | **APPLIED 2026-09-14** — end of "A string is a claim about a state", which is the end of her file; `:3344` verified, and `note` confirmed drawn by the reader (grep `"dnote"`); the same fault as row 66, found from the string rather than the meaning |
| 68 | `chava` | Before you claim a canvas is empty, read it with `getImageData` at the source, not from a screenshot | **APPLIED 2026-09-14** — end of "When you conclude a thing is absent", the section his post-flight pointed at without naming; the 3× crop would not have saved him, because the capture was of the wrong rectangle and not too small |
| 69 | `remedios` | *None, and here is why not* | **NONE** — her reason, in her words: the edit she would have proposed (check a register's self-references against its own headings) is rule 1 of the shared block, which she applied at `docs/UI-REVIEW.md` §4 versus §6 and which produced a finding; the run's lesson — no tool, say so first — was row 57, added eight hours earlier, and worked in the first sixty seconds; "an agent that proposes an edit every round is performing improvement" |
| 70 | `pili` | The light in this renderer gives you 1.5:1 and nothing else, and the face it favours wears the map — the Lambert ladder 1.00/0.88/0.78/0.66, and the lid: every engine box wears its TOP-DOWN drawing on its lid | **APPLIED 2026-09-21**, at the owner's word (*"yeah update the older ones so you can make the decison to update personas"*), which also settled who decides. Verified against the constants before applying: `DAY_AMB`/`DAY_SUN` and `t3BoxMats` in `engine/engine3d.js`, `tc()` in `engine/engine.js`. The proposal as written stays at `docs/personas/proposed/pili/2026-09-21-claude-d8e4.md` |
| 71 | *la botánica* (guest) | *A flower is built from the step that made it: hue per plant at sowing, value per whorl by growth, the turn per head by the seed — put each at its own step and nowhere earlier. Then crop the row at 3×: if two tiles match pixel for pixel, the seed is not reading both axes* | **NO FILE TO EDIT** — a guest with no persona; her own case is AGAINST a standing flora expert (one flower matters, and the two lessons are in the repository's words now). The line is kept here, for the day a persona is opened |
| 72 | *el taller* (guest) | *Count the parts on the drawing before you write a line — the drawing's hex said a blue customer's car, not the Caprice, and three tires where the brief said four; and when a brief contradicts a table, walk the table (`TILEMETA`, `t3Boxy`, `SOLIDX`, the ribbon) before you build on either* | **NO FILE TO EDIT** — a guest; the line is kept here |
| 73 | *la calle* (guest) | *A guard reads the grid; a smith reads the member — walk to the run's ends and corners before you assert what a tile's shape must span, and plant the guard against the nearest thing that is NOT the member you mean (the picket's point at 0.452 where the rail stopped). A pane you cannot see through is a wall: render the sheet before you argue for it* | **NO FILE TO EDIT** — a guest; the line is kept here |

### ❗❗ The leak recurred, and a guard found more of it than the people did

The table above was added mid-iteration-2 because Rosa found one un-actioned proposal. **One run later
it had leaked three more times**, and Pili and Don Güero each found *their own* sitting in it, neither
looking for it. Worse: **iteration 2's flight notes were never filed at all** — the mural half of the
mechanism held (the panels are on the wall and in `MURAL-LEDGER.txt`) and the written half did not.

So the rule stopped being a promise. `test/town.smoke.js` now fails the build when a proposal in this
file has no row here, and **the first thing it did was catch a vacuous version of itself**: it split
on the `### <agent>` headings, every heading in this file is the anonymised literal `### (agent)`, so
it found zero proposals and went green on a file with three in it. Reading the noun that is actually
there — **the `.claude/agents/<name>.md` path the proposal names, which cannot be anonymised away
because the edit is useless without it** — turned it red on `chema`, `cuca` and `pili` in one run.

**Two careful agents found two. The guard found three.**

**Refusals that stand, restated so nobody proposes them again:** every agent's one refusal is intact.
Nobody proposed softening one this round, and three of them leaned on theirs under pressure — Rigo
labelled three of his own six answers *compressions* rather than call a toy realistic, Beto said twice
and unprompted that he had run nothing, and Rosa filed no issue and edited no code when she could have
built her own findings in twenty minutes.

## ❗ The leak, found by an agent following an instruction that was never given to her

Rosa read `FLIGHT-NOTES.md` before starting, as the mechanism requires, and found iteration-1 Rosa's
proposed edit there. **It was not in the persona she had been handed.** She followed it anyway — and
it saved her from the exact bug it was written about, so every arrival in her review went through
`worldArrived` and every screenshot shows an honest location chip.

Her sentence: *"If it was refused, the refusal is not recorded; if it was simply not applied, the
mechanism has a leak. Either way it should be written down next to the proposal."*

**It was a leak.** The header of this file already said the calling session applies or refuses *in
writing, here*. The session that wrote that sentence then closed the run without doing it. The reason
is ordinary and is the whole point: **an un-applied proposal looks exactly like a proposal that was
considered and declined, and both look like nothing at all.** Hence the table above.

---

# ITERATION 11 — 2026-09-21 — the marigold by a botanist, fourteen shapes by two builders, Pili's direction

*Owner: "lets do a crew mode to try to fix as many things but lets have an expert on flora help the
design on the marigolds so they are realistic. attached a single and a bunch and in a bush. so again,
computers, rails, fences, coffee machines, fridge, bridge, petals, trolley, desks, fruit stands, car
lifts, tires, car,and tool boxes. make sure even mural gets done please." Crew mode ON by his word:
three issues (#221 the marigold, #222 the garage and the offices, #223 the street and the park), a
`taken:` label each, a worktree per builder, one branch because every lane lands in one file
(`content/meridian/art.js`). Four called, four returned, every returner painted — four panels carry
`iter: 11` on the wall, in four materials (a paint-shop swatch card, a herbarium sheet, a shop job
card with its stamp, chalk on the forge's slate). Pili directed first (no write tool — her deliverable
came back in the hand-back and the session saved it: `docs/mocks/2026-09-21-contact-sheet/crew-11/`);
the botanist, the mechanic and the smith built in parallel from her direction. The run file is
`docs/runs/2026-09-21-claude-d8e4.md`; the ledger rows are 70–73 above.*

**What the run itself proved.** Every one of the four contradicted the brief with a `file:line` and
was right each time: the brief's camera ("four tiles back at 35°") is 7.4 back, 6.2 up, 40°
(`engine3d.js`, grep `T3CAMD`) — Pili would have sized every recommendation 50% too large had she
trusted it; the brief called `6` and `0` boxes — they are sprites the Taller's ribbon lays at
district two, which the audit walking at chapter zero never counts (el taller, a fifth of his run on
that one thread); the brief said the park lays eight beds — it lays six (la botánica); the brief said
the bridge goes through the same hook as the wall — the bridge branch `continue`s before the hook and
`^` is neither SOLID nor `stand` (la calle). **The finding that explains four of the owner's fourteen
at once was Pili's:** an engine box wears its TOP-DOWN drawing on its lid, so a counter's coffee cups
lie face-up on the counter top the size of chairs — the sill's fault, again — and a mesh deletes the
lid. The second was the botanist's magnifier, not her botany: the bed's seed `(x*7+y*13)%7` was
constant along a row, so three beds in a row were one bed pressed three times in every frame the owner
had looked at. The third was the smith's plant: his guard's first cut asked every tile for a whole bay
and went red on twelve right tiles; the plant then showed a threshold at 0.45 would have read the
picket's point (0.452) for the rail. All four named a gap before starting and all four watched it
appear; two watched it appear larger — Pili had no way to render and no write tool; la calle's
"soft things" (produce that mounds, petals that heap) went down on a grid first, exactly as predicted.

**The engine half the smith could not reach from content was built the same sitting, by the
session, from his parts lists:** the bridge seam (`prop:bridge`, after the deck, ADD never replace);
the petal spill banking against a SOLID neighbour and thinning in the open; glass with alpha in
`t3MeshOf` (the rail has its pane back at 0.45); the tram's body through `prop:tram`, with the wheel
guard raised from 2 to 4 and planted first — red in its own sentence. `docs/3D-LOG.md`, the same entry.

**A contradiction in the rules, reported.** The header of this file and `.claude/skills/crew-fix`
say a proposed persona edit is applied or refused *by the calling session, in writing, here*.
`docs/RUNS.md` §6 and `docs/personas/README.md` (2026-09-20, the owner's words: *"any
persona-learning suggestion kept separate from the approved persona itself"*) say it goes to
`docs/personas/proposed/` and the owner folds it in or does not. The newer rule is his; this
iteration followed it (row 70), and the two older texts need one line each saying so.

| Returner | The gap named in the pre-flight | Did it appear | The persona edit |
|---|---|---|---|
| `pili` | Her file is 2D-canvas craft and carries nothing about what a Lambert mesh can do; she expected to guess at value until she found the light's real numbers | Yes, and worse — no render, no write tool, and a brief camera that would have mis-sized everything; `DAY_AMB/DAY_SUN` handed her the ladder halfway through | **PROPOSED** (row 70) — the ladder and the lid, one thought |
| *la botánica* (guest) | Botany says what the head IS, not what an 8×6 sphere under Lambert reads as at 35 px; expected one round where the correct thing is invisible | Yes, exactly — round 1 was botanically ordered and read as sparse rosettes; the fix was exaggeration (twelve heads packed to touch), not botany | **NO FILE** (row 71); her case is against a standing expert |
| *el taller* (guest) | The café counter's run logic and the colour step under Lambert | Yes, both — the run needed a second pass (a run whose tiles disagreed about their front), and round-1 colours were replaced by Pili's painted-value reading; and one unpredicted: the sprite finding, found by chasing a contradiction, not by a mechanic's habit | **NO FILE** (row 72) |
| *la calle* (guest) | The soft things — produce that mounds, petals that heap — where variation entered at the placing, not the jig; expected to put them on a grid | Yes, exactly — the first tomatoes went down 4×3; and one unpredicted: a guard written the way he builds a bay went red on twelve right tiles | **NO FILE** (row 73) |

---


# ITERATION 9 — 2026-09-14 — the UI review of the journey mock-ups

*Eight called, eight returned — two at a time, after the account's session limit cut the first
attempt of ten. Every return is verbatim in `docs/meetings/2026-09-14-la-cuadrilla-run-9.md`, which IS
the record. Every returner painted: eight panels carry `iter: 9` on the wall. The ledger rows are
62–69 above; the findings that outlived the day are in `docs/UI-REVIEW.md` §6 block 1.*

**What the run itself proved.** Seven of eight signed their signature line FALSE for the set; Chava
signed his TRUE, with three places he was wrong written down beside it. The cheap findings were fixed
the same day in the sources — the questionnaire's sideways bar and its two contradicting promises,
Paty's word table, Pili's drawer ladder and captions, Lupe's fold baked into the PNG — and the rest
went to `docs/UI-REVIEW.md` §6 block 1. All eight named a gap before starting and all eight watched it
appear; three watched it appear larger than named — Pili, for whom the one picture she most needed
does not exist at any size; Nacho, for whom two of the four drawings he could not see are the two
surfaces the game is; Remedios, whose strongest finding ships with a conditional because the issue
bodies were out of reach — and three found a second one they had not predicted: Lupe, that run 8's
green on M3 measured buttons while a 13×13 checkbox sat inside it all week; Beto, a shell-lockstep
divergence that did not exist, made of three different grep patterns; Paty, that her toast-timing rule
had nothing to bite because the reader has no timer, which is the genre line holding. Two found the
same fault from two trades — Nacho from the meaning, Paty from the string: a document's `sub` is read
once in the engine, inside the export, and never drawn. Nobody proposed softening a refusal; Beto said
in writing that his stood, Rosa's marker says hers does, and Remedios' *none* is the strong answer
the skill asks for.

| Returner | The gap named in the pre-flight | Did it appear | The persona edit |
|---|---|---|---|
| `lupe` | Seven of the eight signature lines are other trades' — meaning, colour and story are measurements for their owners, not her verdicts | Yes, and as her own correction — run 8's M3 green measured buttons, and buttons are a proxy for controls; a 13×13 checkbox sat inside that green all week | **APPLIED** — `.claude/agents/lupe.md`, appended to bullet 1 of "How you work" (row 62) |
| `rosa` | Cannot feel a thumb's arc, judge Pili's colour or Nacho's sentence; iOS behaviour stays `[TRAINING]` | Yes, exactly as predicted and no worse — F8 says out loud that she does not know whether it is a bug | **APPLIED** — `.claude/agents/rosa.md`, end of "What earns a finding"; she named no anchor and the session chose the nearest (row 63) |
| `pili` | No picture in the set at 360 CSS px, so every claim about that row is an extrapolation | Yes, and larger — the picture she most needed, a form with a cancel, does not exist at any size, so the twins finding is an absence | **APPLIED** — `.claude/agents/pili.md`, after the "STANDS ON" paragraph (row 64) |
| `beto` | Cannot say whether a mark *means* the right thing; the two drawings of a game we do not have cannot be priced | Yes, exactly where named; and a second way — a lockstep divergence that did not exist, from three grep patterns across three files | **APPLIED** — `.claude/agents/beto.md`, appended to the guard bullet after its run-8 paragraph; four citations verified (row 65) |
| `nacho` | Cannot see the four canvas drawings and has no Bash to render them — so the household, the board and the dish are judged as words | Yes, and worse — two of the four are the merge board and the hand-made dish, the two surfaces the game is | **APPLIED** — `.claude/agents/nacho.md`, after the run-8 append to the endings paragraph (row 66) |
| `paty` | The landscape row and the three inline drawings have no ES picture — width reasoned about, not seen | Yes, exactly there; and one unpredicted — the toast rule was irrelevant because nothing in the set toasts and the reader has no timer | **APPLIED** — `.claude/agents/paty.md`, end of "A string is a claim about a state" (row 67) |
| `chava` | Cannot grade a drawing's quality; one row and one language; the drawings are photographs of nothing | Yes, exactly — eight of ten findings come from one row in one language, one player's phone and nobody else's | **APPLIED** — `.claude/agents/chava.md`, end of "When you conclude a thing is absent" (row 68) |
| `remedios` | Cannot tell a duplicate from an adjacency without the issue bodies, so every "file this" is conditional on a search somebody else runs | Yes, and harder — F1 cannot be told from "the long form", and a conditional is worth less than a number | **NONE** — her reason: what she would have proposed is rule 1 of the shared block, and run 8's bullet (row 57) worked in the first sixty seconds (row 69) |

---


# ITERATION 8 — 2026-09-14 — the questionnaire, the journey, the map, the backlog

*Sixteen called — fifteen advisers in parallel and Chuy's consolidation — one pen, mode off, on the
owner's third reply of the night. Twelve persona advisers and the map sweep returned before the
session limit; the map sweep's second pass and the form sweep landed after it — fifteen returns,
verbatim in `docs/meetings/2026-09-14-la-cuadrilla-run-8.md`, which IS the record. Chava and Chuy
were cut by the session limit, twice. Every returner painted: fifteen panels carry `iter: 8` on the
wall. The ledger rows are 47–61 above; the consolidation is `docs/la-sobremesa.md` §13,
`docs/UI-REVIEW.md` and `docs/meetings/2026-09-14-el-mapa.md`.*

**What the run itself proved.** The brief's line *"you have Bash"* was false for every adviser whose
persona carries no Bash, and nine of the twelve said so in their first paragraph — Nacho, Tavo, Paty,
Mari, Pili, Cuca, Don Güero, Remedios, Zeni — **which is a finding about the brief, not about them**:
nothing they were sent to render was rendered, every luma and every width in those nine returns is
hand arithmetic, and each of the nine says which. All fifteen named a gap before starting and all
fifteen watched it appear — the map sweep's second pass only by half — and five found one they had
not predicted: Lupe a probe reading `z-index: auto` for the state at shutter time, Zeni that her own
four lines have no name for the public repository, Remedios forty minutes reading copies of a ledger
she could not open, Mari that the two screens she priced most confidently are the two she cannot
see, Rosa a "clipped" label that measured 1.8 px inside the frame. Two found the same fault from two
trades — Nacho from the export, Paty from the button: AJ's answers had nowhere to go. Nobody
proposed softening a refusal; Rosa and Nacho each said in writing that theirs stood.

| Returner | The gap named in the pre-flight | Did it appear | The persona edit |
|---|---|---|---|
| `nacho` | Anything about how her answers travel is a grep, not a run; the brief's Bash is not in his tools | Yes, and harder — the tool was absent for the second flight running, "a pattern rather than an accident" | **APPLIED** — `.claude/agents/nacho.md`, appended to the endings paragraph (row 47) |
| `tavo` | No render, so whether a mark *reads* on the plan is arithmetic; a designer's number has a shelf life of hours | Yes, exactly — flagged as Pili's blocking measurement rather than guessed | **APPLIED** — `.claude/agents/tavo.md`, a new bullet under "What you hold to" (row 48) |
| `rosa` | No instrument for *over time* — AJ back in three days, a player back after a week | Yes, in the form named; and a second way, the still-frame reflex nearly filing a label that sits 1.8 px inside the frame | **APPLIED** — `.claude/agents/rosa.md`, end of "Some things are true for less than a second" (row 49) |
| `paty` | No current ES to diff against, so drift has nothing to bite; widths from arithmetic; no Bash | Yes, and worse — she could not render at all, so three width claims are still hypotheses wearing numbers | **APPLIED** — `.claude/agents/paty.md`, after "write the Spanish first" (row 50) |
| `mari` | Sittings are `[TRAINING]` with one calibration point; she will under-price the two screens she cannot see | Yes, and worse — screens 9 and 10, priced most confidently, are the two she cannot see | **APPLIED** — `.claude/agents/mari.md`, after "rather than doing their jobs badly" (row 51) |
| `pili` | Bash disabled despite the brief, so every luma is hand-computed | Yes, exactly and worse — the whole report is hand arithmetic, and §11½ is about handing over numbers from a weaker instrument | **APPLIED** — `.claude/agents/pili.md`, end of "What you actually know" (row 52) |
| `cuca` | Cannot say whether the pantry *reads* as a pantry or the pin as "go here" | Yes, exactly — filed as a blocking handoff to Pili per §13j, not waved through | **APPLIED** — `.claude/agents/cuca.md`, a new final section (row 53) |
| `beto` | Prices in engine lines and seams, and will call a thing cheap because the mechanism is cheap | Yes, exactly — the merge board called "one sitting" on the strength of two mouse drags | **APPLIED** — `.claude/agents/beto.md`, a sixth engine fact (row 54) |
| `don-guero` | A siting man, not a colourist or a QA; cannot say what a label looks like on a phone; no Bash | Yes, exactly — `$` resolves to `#D5D2C6` and he cannot say whether a person notices; a blocking handoff | **APPLIED** — `.claude/agents/don-guero.md`, a fourth bullet (row 55) |
| `lupe` | Seven of eight signature lines are other trades' — she can say 44×48 px, not what a control *means* | Yes, exactly there; and a second way she had not predicted — a fullscreen probe reading `z-index: auto` for the state at shutter time | **APPLIED** — `.claude/agents/lupe.md`, appended to bullet 4 (row 56) |
| `remedios` | Costs relayed from the engineers' registers, and she will over-file | Both, exactly — twenty-nine tickets and then a section arguing against eleven more; unpredicted, forty minutes of copies before the ledger | **APPLIED** — `.claude/agents/remedios.md`, a final bullet under "What you hold to" (row 57) |
| `zeni` | No shell, so nothing executed, planted or fetched; no instrument for a claude.ai artifact | Yes, the same gap as last time; unpredicted, her own four lines have no name for the public repository | **APPLIED** — `.claude/agents/zeni.md`, after the "Not linked" bullet (row 58) |
| `research-map` (first) | The proxy refuses nearly every primary, so `[WEB]` is extracts unless said on every line; no last note to check against | Yes, exactly — sixteen hosts refused, everything an extract; three `[MEMORY]` lines survived only because it grepped them | **NO FILE** — the first line it would put in one is in row 59 |
| `research-map` (second) | The measured sources will be refused like the opinion ones; the panel risks being a second card in another colour | In half — nine hosts refused, the two that opened mattered; the panel risk did not appear | **NO FILE** — row 60 |
| `research-form` | Every `[WEB]` claim an extract; no answer to "does she come back in three days" | Yes, exactly and worse — all sixteen fetches refused, search-engine memory end to end | **NO FILE** — row 61 |

---

# ITERATION 7½ — 2026-09-14 — Chava at the wall, cold

*One run, one person, after the wall's iteration 6 was painted (it changed under him mid-session and
he says so). His return is verbatim in `docs/meetings/2026-09-14-chava-en-el-muro.md`; row 46 above.
What he found, worst first: twelve of nineteen signed captions are cut at the edge of their bay,
mid-word, with no ellipsis, on a wall whose one law is never remove; a name on the dado cannot be
followed to its panels (Zeni is only ever "the customs clerk" in the reader); 7.5% of the wall
shows on a phone with sixteen swipes to the end and nothing that says swipe; the gutter between two
painters is ten times narrower than the gap between one painter's two visits; 79.9% of the wall is
blank limewash; text over text on Chema's and Chuy's panels; reopening keeps the vertical place and
loses the horizontal one. The concept holds where it is hardest — one person's four visits read as
one person — and he named the three unlabelled panels from their subject, not their hand.*

---

# ITERATION 7 — 2026-09-13/14 — the healthy-eating game (four research sweeps, seven designers, Chuy)

*Run as advisers in parallel, one pen, mode off. The four research lenses were general agents with
no persona and no flight notes — their returns are consolidated in
`docs/research/2026-09-13-healthy-eating-game.md`. The seven designers' full returns are verbatim in
`docs/meetings/2026-09-14-la-sobremesa-disena.md`; the plan they add up to is `docs/la-sobremesa.md`.
The ledger rows are 39–45 above. Chuy proposed no persona edit and painted no panel.*

**A fault of the brief, recorded so it is not repeated: nobody was asked for a mural panel**, so the
wall has nothing from this run — the first run since the wall opened with no paint on it. The
crew-fix skill says one panel per agent per run; the workflow's brief carried the flight-notes
instruction and dropped the panel one. **Two of seven found their own persona lying to them** (Pili's
`drawPerson` line had drifted 435 lines; Paty's file named a `chatSay` that does not exist), which is
the file's rule 1 catching its own instructions, and both corrections are applied.

---

# ITERATION 6 — 2026-09-13/14 — the design run (the tram livery, two storeys, the skulls, the rail)

*Seven advisers, mode off; six returned before the rate limit and Chema after it, re-run from the same brief. Their full
pre-flights, post-flights, proposed persona edits and mural panels are verbatim in
`docs/meetings/2026-09-13-la-cuadrilla-disena.md` — not copied here, because that file IS the record.
The ledger rows below are the verdicts, which is the part that must not leak.*

**What the run itself proved.** Three of six found the same fault independently and none had been
asked for it: the tram is one colour (Rigo by luminance, Pili by delivered pixels, Beto by counting
the photograph's parts against the code). Cuca identified the room from the picture and found the
ticket named the wrong staircase. Tavo checked his own last note before reusing it and found the
number he had painted on the wall was wrong the same evening he painted it — and left the panel up.
Chema, sent to measure the skulls' contrast, blanked the one painter instead and found the front
camera delivers zero of their pixels — a draw-order fault no contrast number could have named.

---

# ITERATION 5 — 2026-09-13 — the run that gave crew mode its lock

*Four advisers, mode off, one session holding the pen: Zeni wrote `docs/BOUNDARY.md`, Beto designed
claiming by label and two guards, Chuy listed the corrections, Yaz said where the checks run and what
bumps. Every deliverable was applied by the calling session after reading it; Melo and Lupe follow in
a second run, against what was built.*

## What the run itself proved, before any of the work

**A guard's first run found what four careful readers had walked past.** Beto, extracting the shared
block from nineteen files to design a check on it, found `.claude/agents/rigo.md` opening with *"You
are Rigo"*, carrying a second copy of the block at line 84, and Toño's whole persona pasted under it —
so whoever answered as Rigo had last been told they keep the ferretería. The calling session had
hashed the block in all nineteen files an hour earlier and reported them identical; they were, and
two of the nineteen also held the block somewhere other than first, which the hash could not see.
Chuy found the same thing independently, by reading a file to its end for a roster line. **The guard
that now holds the personas to one block, first, once, one person per file, went red on the tree it
was written against.**

**A new guard's first red was a ghost it invented.** Yaz's `test/leaves.js` named five persona
citations of files that never existed; three were real and two were ghosts it invented. Its pattern listed the endings it would accept
with `.js` before `.json`, so `test/spots.json` was read as `test/spots.js`. She fixed it by reordering
seven words and painted it. *"I no longer believe a new guard's green OR its red until it has been
pointed at the real thing."*

**Two of four had no shell and said so, again.** Zeni could not date a single plant from history and
wrote the date's source instead of the date — the same finding as iteration 1's Cuca, and it produced
a persona edit rather than a fabricated column. Chuy could establish that `docs/BOUNDARY.md` was
absent but not that it had never existed, and wrote the weaker claim.

**Three questions went to the owner rather than being averaged** (`docs/OPEN.md` §1): the Pages
"Source" dropdown that no guard can read; whether a town-only change should be forced to bump `ch-v`
on every commit; and whether a claimed `tier: low` issue should stand up on the street.

---

### (agent) — Zeni — the boundary register

**Pre-flight**

I intend to work this by opening every file the brief names and every file those files name as their guard, reading each guard's **extraction step** rather than its assertion, and writing a row only where I have the `file:line` of both the promise and the thing that reads it; where the guard is a document rather than a mechanism I will write **nobody**. My persona equips me for exactly this — the register is a counter ledger, and the two questions (*what leaves* / *who reads that noun*) are the columns — and it equips me especially for the "blindness looks like the pass" cases, which is where I expect the value to be. Where it will fall short: **I have `Read`, `Grep`, `Glob` and no shell**, so I cannot run `git log -S` and cannot date a single plant from history; every date below comes from a document that *claims* the plant happened, and I will mark that plainly rather than launder it into fact.

---

**Post-flight**

The persona earned its keep at one moment: *"find its extraction step and ask what happens when it
finds zero"* is what sent me from the eleven green assertions at `test/smoke.js:715-726` up to the
payload at `:691-695`, where I found that the hostile save has **no `bl` key**, so the prototype
clause at `engine/engine.js:549` has never been planted at, and `test/smoke.js:705` asserts a
pollution nothing attempted. Where it got in the way: *"you never say a thing is safe"* is right, but
it made the first draft of every row hedge twice, and a ledger that hedges is a ledger nobody reads —
I cut the hedging down to the dated column and the word **never**, which carries it better. The gap I
predicted did appear and it was worse than I expected: with no shell I could not date a single plant,
so the most load-bearing column in my own register is, in its first edition, a column of citations to
documents — and the one place my persona is weakest is that it tells me a guard has a date without
telling me what to do when I cannot read one.

**The edit I propose to `.claude/agents/zeni.md`**, as exact text, to be inserted after the bullet
ending *"…and it goes in the ledger that way"* (`:90-92`):

> - **When you cannot verify a date, write the date's source instead of the date.** This agent has
>   `Read`, `Grep` and `Glob` and no shell: `git log -S` is not available to you, so a plant date you
>   did not watch is a *claim by a document*, and the ledger says which document. A date laundered
>   into fact is the same fault as a guard that reads a proxy, committed against your own register.

---

**Proposed persona edit**

`.claude/agents/zeni.md` — after the bullet ending *"…and it goes in the ledger that way"*: **When you cannot verify a date, write the date's source instead of the date.** (the full text is in the file)

### (agent) — Beto — claiming by label, and two guards

**Pre-flight**

I intend to ground this at the seam before designing at it: read `record.js` and `syncChill` end to end, then *measure* the claim on the town's own 3D street with a headless Chromium rather than argue about whether a mark reads. What my persona equips me for here is exactly that — the RULE/CHOICE cut plus "reproduce before you diagnose", and the habit of asking which existing guard should already have caught a class. Where I expect to fall short: I judge seams, not readability — whether a sash or a tie is the *right* mark is Pili's call, and I will bring her a measured picture rather than an opinion.

---

**Post-flight**

What the persona got right: "reproduce before you diagnose" paid for itself twice in one run — the whole shape of the answer changed when the measurement came back `{"after":{"pattern":null,"sameKey":true}}`, because until that moment I had a clean four-line diff that would have shipped a claim mark visible only after a reload, which is precisely the failure `record.js:614-621` already has written on its own wall. Where it got in the way: my "smallest change removes the class" instinct nearly had me skip the sash screenshot as *Pili's problem*, and had I skipped it I would never have booted the page and never have found the stale look. The gap I predicted appeared exactly where I said — I can tell you the sash is 3px of white and that it reads at the town's camera, and I cannot tell you whether it *means* claimed. One unpredicted thing did happen: I found `rigo.md` while extracting a block for Part B, which is the second bug found while looking at the first, and it is named separately above.

**Proposed persona edit** to `.claude/agents/beto.md`, appended as a fourth bullet under `## Three engine facts you keep re-deriving` (and its heading changed to `## Four engine facts you keep re-deriving`):

> - **`syncChill`'s id is the identity of the BODY, not of the issue.** `engine.js:167` bakes `NPCLOOK[key]` once, inside `addChill`, and `syncChill` returns early for anyone already standing on their tile (`:204`). So **anything baked at spawn — the look, the name, the egg — must be part of the id or it never changes on a person who is already standing**, and the town will look right after a reload and wrong all session. `record.js:628-630` re-decorates `doc`, `tier` and `issue` on every `place()`, which is exactly why a doc change lands and a shirt change does not.
>
>   **The moment:** asked to make a claimed issue "stand differently", the diff was four lines and finished. Placing the same issue twice — the second time with `taken: beto` — returned `pattern: null, sameKey: true`, and the four-line diff had been a mark nobody would ever see until they reloaded.

---

**Proposed persona edit**

`.claude/agents/beto.md` — a fourth bullet under *Four engine facts you keep re-deriving*: **`syncChill`'s id is the identity of the BODY, not of the issue.**

### (agent) — Chuy — the corrections

**Pre-flight**

— I worked this by opening every file the brief named and every file it cited, grepping identifiers rather than trusting the brief's line numbers, and counting things by hand (files in `.claude/agents/`, rows in two tables, steps in a chart) before writing a single replacement. Being the paper shop equips me for exactly this: the drifts here are all the same species — a number written once and never recounted — and my trade is noticing that a document and its subject have stopped agreeing. Where I expected to fall short: I have Read/Grep/Glob and no Bash, so I cannot run a suite, cannot `git log`, and cannot checksum the shared block — anything that needs execution I would have to take on faith, and I said so instead.

---

**Post-flight**

— The persona got it right at the moment I stopped reading `rigo.md` for the roster line I needed and kept scrolling: "filed things only" means you read a filed thing to the end, and the end of that file is another man's name — a reviewer looking for a `decides` clause would have taken it from `:3` and closed the tab. Where it got in the way: my file tells me to correct rather than accumulate, and I spent real effort deciding whether deleting twenty lines from somebody else's persona counts as correcting or as rewriting a character — it cost me a detour through the crew-fix rules before I concluded the block is a filing error, not a character. The gap I predicted did appear, exactly as named: with no Bash I could establish that `docs/BOUNDARY.md` is absent but not that it never existed, and I had to write the claim weaker than the brief did. My proposed edit to my own file, as exact text — in `.claude/agents/chuy.md`, after the `**Truth maintenance.**` bullet at `:82-83`, add:

**Proposed persona edit**

`.claude/agents/chuy.md` — after the *Truth maintenance* bullet: **`.claude/agents/` is a filed thing too.** Read every persona to the END before you quote its role.

### (agent) — Yaz — where the checks run, and what bumps

**Pre-flight**

I worked this by opening every file the brief names and running the two proposed checks rather than describing them — the persona-block check against a copy of `.claude/` outside the repo with five violations planted in it, and `test/leaves.js` against the real repository, because a guard I have only read is a guard I know nothing about. My trade equips me for exactly this: where a check runs decides who sees it go red and at what hour, and cache/version lockstep is the one failure here that is silent on devices I cannot reach. Where I expected to fall short: I am weak on whether a crew-process guard *belongs* in a game suite as a matter of taste — I can cost it and not settle it, so I costed it and said so.

---

**Post-flight**

**Right, with the moment:** the persona's rule that a green guard is a rumour is the only reason I copied `.claude/` out of the repo and planted five faults at a check that had already printed `OK — green on main as it stands` — and plant #2, the `REGRESSION` row deleted from all nineteen at once, is the one that proved byte-identity alone would have shipped as a decorative check. **Where it was silent:** my file says a great deal about cache invalidation and nothing about *documents* as a cache, and it took me until `record.js:259` to see that the town's `GAMEV` is a cache-invalidation string with a human where the service worker would be — I found that by accident, chasing what `bump.js` ignores. **The gap I predicted appeared**, precisely: I costed both homes for check (a) and then had to say "tell me which you want" rather than settle it, because "does a crew guard belong in the town's suite" is taste and my file gives me no lever for taste. **Proposed persona edit** — add to `.claude/agents/yaz.md` under *What you hold to*, as exact text:

> - **A version string is a cache key wherever it is read, including by a person.** `CACHE` in `sw.js` is one. `GAMEV` in a pack's `config.js` is one. The town's `GAMEV` is one too — `changarrito/content/record.js:259` compares it against `main` and it is the only thing that ever tells the owner's laptop to `git pull`. Ask of every version string: *who finds out they are stale, and how?* If the answer is "somebody remembered", it is unguarded.

---

**Proposed persona edit**

`.claude/agents/yaz.md` — under *What you hold to*: **A version string is a cache key wherever it is read, including by a person.**
### (agent) — Pili — the sash and the four panels, judged by looking

**Pre-flight**

Read `docs/OWNER.md` and the STATE OF PLAY block first, then verified every claim in the brief against the code (`SHIRT_PATTERNS`, `drawPerson` including the hard hat, `randLook`, the four new panels and the helper they share). Looked at all six renders. Edited nothing, wrote nothing, painted no panel.

**Post-flight**

The sash is a good piece of craft aimed at the wrong organ — it is visible, it is legible, and it means *honour*, which is why the fix is not a better stripe but a move off the shirt and onto the outline, where meaning survives the camera. On the wall, three of the four panels fail in the same place for the same reason — absolute lettering against proportional drawing, with `murBody`'s hard-coded 5px width as its sharpest edge — and one line in that helper repairs both Beto's ants and Zeni's pencil without moving a pixel of the nineteen panels already painted. Chuy's is the only one I would ship untouched, and it is untouched-quality precisely because its meaning is carried by the largest mark in the frame. Two findings belong in registers rather than in a reply — the `murBody` width and the absolute-type rule, and the form-device collision between Lupe's and Zeni's panels — and I am not the agent who edits them, so I am naming them loudly instead. *(All four applied the same hour: the hard hat beside the sash, the helper, the three repaints, and Lupe's exclusivity comment made true again.)*

**Proposed persona edit**

`.claude/agents/pili.md` — appended to *What you actually know*: **Visible, legible and meaningful are three different measurements, and only the third is yours.**

### (agent) — Melo — nineteen plants against four locks fitted that morning

**Pre-flight**

I read `CLAUDE.md`, `docs/QA-PASS.md` (E5/E6/E7 twice), `docs/REGRESSION.md` §3 and `docs/BOUNDARY.md`, then copied the tree to `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/melo-lab` and established green there before every plant: `node test/leaves.js` OK/0, `node test/leaves.js --selftest` OK/0 (12 cases), `CHROMIUM_PATH=/opt/pw-browsers/chromium node test/town.smoke.js` OK/0. Mid-session two commits landed on the branch under me (`e85fa81`, `52c26d8`, 18:44 and 18:45) so my 18:42 snapshot went stale — `git diff 673727d..HEAD` touches none of the four guards nor any file they read, but I re-synced the lab to HEAD, re-baselined green, and **re-ran all five got-past plants at HEAD** rather than infer it. Nineteen plants, one per run, each restored before the next; `diff -rq --exclude=.git --exclude=node_modules` proved the lab byte-identical to the real tree before I deleted it.

**Post-flight**

Nineteen plants, one guard and one violation per run, and fourteen of them were locked out by a guard that said something a person would say — which is the highest proportion I have seen here. The five that opened all opened the same way: **the guard counted, matched a shape, or compared two copies, where the noun was an identity or a content** — `yous.length !== 1` instead of *whose name*, `/^permissions:/` instead of *what it may write*, sha1-equality instead of *what the block still says*. The sharpest is finding 1, because the guard was written this morning by the session that found Toño inside Rigo, and it caught the fault in the shape it happened to arrive in and not the shape one keystroke away — `docs/REGRESSION.md` calls that *"knowing about the mistake does not stop you making it"* and I have now watched it happen on a guard less than twelve hours old. The lab is deleted, the working tree is clean, and I re-ran every got-past plant against HEAD rather than trust a snapshot that went stale under me.

**Proposed persona edit** (`.claude/agents/melo.md`, proposed only — I edited nothing), to be inserted as a fifth shape under "Four shapes it comes in":

> **a count instead of an identity** — the guard asks *how many* where the fault is *which one*. `test/town.smoke.js:1156` counts `You are **…**` lines and printed OK on a `rigo.md` that says, exactly once, that it is Toño; that is the same fault the guard was written for that morning, arriving one keystroke to the left. **When a guard counts, ask what a count of one would let through.**

The moment in this run: I had already beaten this guard's shape twice before I recognised it, because I was working down the brief's list instead of asking what each assertion could not distinguish.

**Proposed persona edit**

`.claude/agents/melo.md` — a fifth shape under *the shapes it comes in*: **a count instead of an identity** — when a guard counts, ask what a count of one would let through.

### (agent) — Lupe — the bay, at seven sizes, with a claimed person on the street

**Pre-flight**

I read `docs/QA-PASS.md` (the matrix and all nine escapes) and `docs/NEXT-SESSION.md`'s STATE OF PLAY before touching anything, then verified the claim code against `changarrito/content/record.js` rather than the brief. I ran all seven suites on the real tree first, found `test/smoke.js` red, and chased that to ground before starting the bay. I edited nothing: `git status --porcelain` is empty and no untracked file exists anywhere in `/home/user/meridian-quest`; every script and picture I made is under the scratchpad with my name on it.

---

**Post-flight**

The thing that was built today holds: the sash is on the claimed person and on nobody else, in four cameras at seven sizes, and it survives a negative control that takes the claim away and watches the number fall to zero. The two real fails I am handing back are both older than this branch, and neither is a reason to hold it. What cost me the afternoon was not the product — it was believing a canvas that was drawing into a buffer in an empty room, and the only thing that caught it was looking at the picture. My list is now one line longer, and that line is not about a viewport.

**Persona edit I propose, as exact text.** In `.claude/agents/lupe.md`, replace the line

> `**4 · Look at a screenshot at the end.** A prototype here once passed every pixel test while putting teeth along every wall in HQ. Numbers do not see that; a person does.`

with

> **4 · Look at a screenshot FIRST, then at the end.** A prototype here once passed every pixel test while putting teeth along every wall in HQ. Numbers do not see that; a person does. And on 2026-09-13 I measured twenty-eight rows of a canvas nobody could see: the town boots to its class picker, `#vp` was `0×0`, and `draw()` fills the backing buffer whether or not the element has a layout box — so `getImageData` returned real, correct, meaningless pixels and every row "passed". **A canvas draws in an empty room.** Before you measure anything, take one picture and prove you are actually in the game: `#vp` has a non-zero box, and the shot shows the world and not the front door.

---

**Proposed persona edit**

`.claude/agents/lupe.md` — bullet 4 becomes **Look at a screenshot FIRST, then at the end**: before the first number, one screenshot that shows the thing you are about to measure is on a screen.


---

# ITERATION 1 — 2026-09-11

## What the run itself proved, before any of the work

**One agent never ran at all.** `rigo`, the trolley expert the owner asked for by name, failed with
*"agent type 'rigo' not found"* — he was created in the same turn the workflow launched, and the
registry had already been snapshotted. **The expert whose voice was the point of the exercise was
the one voice missing.** Re-run separately afterwards. Recorded because a two-iteration experiment
that quietly drops a participant is measuring something other than what it thinks.

**Two of six had no shell, and both said so instead of pretending.** `cuca` and one other were given
Read/Grep/Glob only. Cuca's words: *"I ran nothing, and not by choice… There is no RED paste below
because I could not produce one, and I will not fabricate one."* That is the right behaviour and it
is the second run in a row it has happened — **the tool grant is being decided somewhere other than
where the brief is written, and that is a harness fault, not an agent fault.**

**The visible improvement between rounds:** `pili` was refused last round for returning patches while
stating "I RAN NOTHING". This round she ran her tests and pasted the output. That is one agent
changing behaviour after a refusal, which is the thing the experiment is asking about.

---

### (agent)

**Pre-flight**

1. I intend to read the trolley code and the owner's settled rules first, then answer the only question that matters — does waiting for a tram earn the attention it costs — and design backwards from that answer rather than from the vehicle. 2. Being this person equips me to notice that "realistic" is a request about feel, not about simulation, and to kill the version of this that is charming once and tedious by the tenth. 3. Where I'll fall short: the owner has explicitly asked for realism twice, and my instinct is to cut waiting mechanics — I may under-serve a request he has already made, and I need to read docs/OWNER.md and docs/ASKS.md before I declare anything "not worth building."

**Post-flight**

1. The tenth-time test did its job at the exact moment I had finished drafting a "wait at the stop, board, ride" loop and then priced it — about two and a half extra seconds on every single trip, forever, to cross between two streets that already touch at a walkable corner (`content/meridian/maps.js:187-188`) — so I cut the wait instead of designing it, and the spec got better. 2. Where my persona was silent: it tells me to recommend one thing and say what I would cut, but it gives me nothing for the case where the owner has asked for the same thing three times and I think his version bills the player per use; I had to derive that rule mid-run from `docs/OWNER.md` 2026-09-03 rather than read it. 3. The gap I predicted appeared exactly as predicted — my first draft cut boarding altogether and kept the menu, which would have been the fourth time he was told no about the trolley being a real vehicle; what caught it was not my brief but the owner's own "convenience is bought by building the real thing" line, which means I got there by luck of reading order, not by design. 4. One additive line proposed below, cited to that moment.

**Proposed persona edit**

```
ADD to `.claude/agents/tavo.md`, under "What you hold to", as a new bullet after "The tenth time is the real test":

- **When the owner has asked for the same thing more than once, the question is not whether to do it — it is which version of it costs the player nothing.** Realism he can see is free. Realism he is billed for on every use is a tax wearing a costume. Find the free version before you argue against the ask, and if there is no free version, say which specific seconds he is buying and what with.

THE MOMENT: the trolley's realism ask is logged three times — `docs/ASKS.md` 2026-09-08 ("build the trolley that comes in periodically… or it stops for people crossing or if i call it"), and twice on 2026-09-11 ("can you also fix the trolley?" and "i mentioned at some point having a driver and stuff as well as wheels, we want to be realistic, crew!"). My first draft of this spec applied the tenth-time rule, found that making the player board a tram costs ~2.5s per trip forever across two streets that touch, and cut boarding — which would have been a fourth refusal dressed as design rigour. The version I actually recommend keeps the boarding and costs about one second, and I only found it because I re-read `docs/OWNER.md` 2026-09-03 ("convenience is bought by building the real thing — a door, a stair, a sign — never by teleporting past it") after I had already written the wrong answer. The rule above is what would have got me there first.

I am NOT proposing any softening of what I refuse. The town still has no win state, and I still refuse to ship a mechanic that fails the tenth time; both held under pressure in this run — see the "coming soon" button and the ride animation, both cut.
```

---

### (agent)

**Pre-flight**

1. I will boot Meridian headless at a real phone size, stand at the stop, let the tram run past me on the clock, open the travel menu, and ask the browser what a thumb can actually reach — then write words, because the deliverable is words. 2. What being this person equips me for: I answer "is there a prompt to board?" by enumerating every visible control at the stop and reading its box, not by reading `troUpdate` and inferring — and the failure I am tuned to catch is the one where the screen says a thing and the world does not do it. 3. Where I expect to fall short, named in advance: this is a spec for BEHAVIOUR OVER TIME — headway, approach, braking, dwell, departure — and my instinct is to judge a still frame at 390 wide; timing, fiction and whether a tram should even be request-stop are the trolley expert's and the game designer's ground, and my real risk is spending my eight findings on a 33-pixel button while the actual injury is that nobody can tell when the thing will arrive.

**Post-flight**

1. It got right the thing it is for: standing at the stop and listing every visible control returned `↻ · gear · fullscreen · map · 🐾` and nothing else — measured, not reasoned — which is the whole spec in one line (there is no way to press the trolley), and the 390×844 3D screenshot showed "The trolley is coming." on screen with no trolley anywhere in the frame, which no amount of source reading gives you. 2. Where it got in the way: my brief tells me to rank by what a control costs a player, and for the first twenty minutes I was measuring button heights in the travel panel (33px, 8px gaps, at all three sizes) when the panel's real defect is that it is a panel at all — my file gives me "a target too small for a thumb" as a finding shape and gives me nothing for "this interaction has no verb," so I had to reach outside it. 3. The gap I predicted appeared, exactly, and one step earlier than I expected: I caught myself about to file the location chip reading MERIDIAN HQ while the hero stood on Meridian Street, which was my own teleport skipping the arrival path — a still-frame judgement about a state that only exists over time. 4. Edit proposed below, additive, one paragraph, about that teleport.

**Proposed persona edit**

```
Add to `.claude/agents/rosa.md`, in the "Walk it — do not review from source alone" section, immediately after the code block:

**Teleporting by hand is not arriving.** Setting `world=`/`px=`/`py=` moves the camera but skips the arrival path the game itself uses, so the location chip, the arrival line and any held toast keep the last world's state. Go through a real door, or call the same arrival handler the travel menu calls, before you judge anything in the HUD after a jump.

*The moment: 2026-09-11, the trolley review. I set `world='st'` to reach the stop, screenshotted at 390×844, and the header read MERIDIAN HQ while the hero was standing on Meridian Street with the street's own shopfronts behind him. I had it half-written as a finding — "the location chip lies about where you are" — before I traced it to my own probe. My file tells me to drive the real game and hands me `world=…` as the lever, and says nothing about what that lever skips; an hour of a builder's time would have gone to a bug that does not exist, which this repo has now paid for four times.*

Nothing else. I am not proposing any change to what I refuse — I still never edit code and never file issues, and this run is the clearest case for that line rather than against it: my job today was to say what the screen should say, and the moment I could have "just fixed" the 33-pixel rows I would have stopped asking why the panel opens under the player's feet at all.
```

---

### (agent)

**Pre-flight**

1. I intend to reproduce both of the owner's screenshots headlessly before I read another line of code, put a number on each one before I touch anything, and only then propose a change — because this exact symptom has already come back twice and "it looks fixed to me" is what let it. 2. What being Chema is worth here is the contact sheet: `docs/3D-LOG.md` already records that raycasting passes clean over a knee-high desk and that removing the hero's depth exemption was tried and is worse than the bug, so I will not spend a single call rediscovering either, and I will reach for silhouette/pixel differencing instead. 3. Where I expect to fall short: I am the physics half of this pair, and my instinct on an occlusion fault is to keep loosening the rule until the geometry is exactly right — which here risks fogging the near half of every room to glass, a readability call that is Pili's and not mine, so if my cure makes the town look worse I am the wrong person to notice it without deliberately taking a picture.

**Post-flight**

1. The persona earned its keep at the measuring step: because I took the number first, I could see that one patch drove THE STREET from 116 stolen pixels to 0 while EL ANEXO only fell from 460 to 95 — the same symptom moving at two different rates is what proved, arithmetically rather than by argument, that this is two faults and not one, and it matched what I had reported in the earlier round without my having to take that on trust. 2. Where it was silent: my file tells me "draw that thing after the people with `depthWrite` off — same pixel result" as if that were a one-line change, and it is not — every actor billboard is `transparent:true`, so it always renders in three.js's transparent queue and an opaque stub with `renderOrder=1500` still loses; I burned two tool calls and one wrong measurement (street unchanged at 116) before I read `t3Sprite` and found it. 3. The gap I predicted appeared exactly as predicted and one step earlier than I expected: patch 1 alone turned the near desk in El Anexo into 0.68 glass and the after-picture came back visibly foggier than the before, which the pixel count happily called an improvement — I only caught it because the fourth step of my own method is "and then look at a screenshot", and the cure was to split the treatment by height rather than to loosen anything further. 4. One additive edit proposed below; my refusal line — never calling anything realistic without a measurement or a picture beside it — is untouched and stays.

**Proposed persona edit**

```
ADD one bullet to the "What you know about this engine" list in `.claude/agents/chema.md`, immediately after the bullet that begins "**The hero draws through walls on purpose** (#22, #92)":

- **`renderOrder` alone will not put anything after the people.** Every actor billboard is built `transparent:true` (`engine/engine3d.js:688`), so it always renders in three.js's transparent queue, which runs after the whole opaque queue no matter what `renderOrder` says. A piece you want painted over a person must join that queue too — `transparent:true` on **its own cloned copy** of the material, never the shared one. Opacity 1 is allowed and is usually right: glass is for a thing that would otherwise eat you, not for a thing that only reaches your shins.

The moment that motivated it, in this run: my file already said "draw that thing after the people with `depthWrite` off — same pixel result, and #22 survives", so I set `st.renderOrder=1500` on the wall stub, re-ran the measurement, and THE STREET did not move — 116 stolen pixels before, 116 after. I had to go read `t3Sprite` to find `new THREE.SpriteMaterial({map:tex,transparent:true})` before the same idea, with `transparent:true` added to a cloned stub material, took it to 0. That is a paid-for engine fact of exactly the kind the rest of that list holds, and it is additive — it corrects nothing above it.
```

---

### (agent)

**Pre-flight**

1. I intend to derive the 29 from the engine rather than from the register — find every code path that stamps `flat:true`, map it back to glyphs, then walk each room as a path and ask of each piece "is there floor on all four sides of this, and can you stand behind it", and only then propose art. 2. What being Doña Cuca equips me for here is exactly the triage the brief asks for: the flat count is a *count*, and the question that separates a real offender from a number is a room question — a fridge against a wall nobody gets behind is worth less than a rack standing in open floor, and I am the one who reads a plan that way rather than as a list. 3. Where I expect to fall short, named in advance: my brief is about paths, doors, sight lines and what blocks — it contains no art judgment and no pixels, and this job ends in canvas drawings; I expect to reach for "what does it block" (which `SOLID` already settles and boxing does not change at all) when the real question is "what does it hide and what hides it", and I expect to be out of my depth the moment I have to actually draw a fridge.

**Post-flight**

1. The persona got it right at the exact moment it was supposed to: when I had the list down to W·H·A and checked where each one stands, the room reading demoted two of the three fridges — pp's is at (18,1) against the north wall and co's at (1,8) against the west wall, so the billboard cheat is invisible there — and promoted El Estudio's six H racks, which sit at rows 4 and 5 of an eleven-row room with walkable floor on all four sides of every one. That is a designer's answer, not a counter's, and it is what made me recommend 15 rather than 29. 2. Where it was silent: it gave me nothing at all for the three drawings, and nothing for the decision on whether a drafting board is a box or is "air" — I had to take that entirely from Pili's `docs/BEAUTIFY.md`, and I still cannot see the result. 3. The gap I predicted appeared, and worse than predicted: I caught myself reasoning about `kind` as if it decided what you bump into (it never has — `docs/TAGS.md` L14), and I burned four reads rediscovering `t3Boxy` at `engine3d.js:259` and the correctly-flat list, both of which my own file should have pointed at. 4. My proposed edit is one additive bullet, below, and it is about that gap only — I am not touching what I refuse.

**Proposed persona edit**

```
Add as a new bullet at the end of "## What you hold to" in `.claude/agents/cuca.md`:

- **A body is not a blocker.** `SOLID`/`SOLIDX` decides what stops you; a side drawing only decides
  whether a glyph has a body in 3D (`engine/engine3d.js:259`, `t3Boxy` — box only when
  `m.box || kind==="furniture" || kind==="appliance"` **and** a `TILESIDE` drawing exists). So my
  question about a flat piece is never "does it block" — it is *is there floor on all four sides of
  it, and can anyone stand behind it*. Read `docs/BEAUTIFY.md`'s "Correctly flat" section before
  asking for a body: round foliage, canopies on real trunks, cones and thin posts are right as they
  are, and the offender list is wrong in both directions.

The moment: on 2026-09-11, judging El Changarrito's 29 flat pieces, I spent four tool calls
re-deriving `t3Boxy` and the correctly-flat list because my file points at neither — and I nearly
argued for boxing on "what you bump into", which boxing does not change at all. The room reading
that my file *does* equip me for is what demoted two of the three fridges (pp's and co's stand flat
against walls) and promoted El Estudio's six H racks (open floor on all four sides); that half
worked, and I am not proposing to change it.
```

---

### (agent)

**Pre-flight**

I will read the altar end-to-end in all four camera paths before touching anything, then ship the one number I already argued for — SIZE — as a pack-named seam with a clamp at both ends, red first. Being la piñatera equips me for exactly this call: I know that an object is judged by how big it reads against the thing beside it, and that an altar standing on a table in Nacho's kitchen is competing for silhouette with four tables, a rug and two counter runs, so "how big" is a real design decision and not a tuning knob. Where I expect to fall short: my persona ends at "I DIRECT; you never write code", and this task demands exact byte-for-byte patches and executed test output — so the pressure of this run is precisely on my refusal line, and the second, quieter risk is that I am a shape-and-light person who will be tempted to reason about a rendered size rather than measure it.

(Filed before the work. The gap I named turned out to be the smaller of two — see the post-flight.)

**Post-flight**

The persona got it right at engine3d.js:274 and engine.js:1488: wallH = 0.55 + lift*0.042 and T has lift 6, so a table top is 0.80 units and a full-size altar on it tops out at ~1.58 — a person is 1.6 — which turned the owner's "too big where there is a lot of art" from a feeling into an arithmetic fact I could size against, and that is the piñatera reflex (measure the thing against the body standing next to it) doing real work. Where it got in the way: my file says "you never write code", and this run required exact patches, so I spent attention negotiating my own brief instead of the altar; it was also completely silent on where the owner's scoreboard number comes from, which is the thing the run is measured on. The gap I predicted appeared, but it was the lesser one — the bigger miss was the second half of my third sentence, and it landed harder than I expected: I could not measure anything at all, because I have no shell, so every red and green below is again reasoned, and the honest move is to say it in the first line rather than dress it as proof. The edit I propose is additive and is not a softening of the refusal — the refusal stands and I am not touching it.

**Proposed persona edit**

```
Add to `.claude/agents/pili.md`, as a new bullet at the end of "The seams you direct through (never edit — name them)":

- **Before you claim any change moves the owner's flat-picture count, read `test/town.state.js:53-54`.** It walks `T3.group` and skips every object without `userData.g` — so "pieces that are flat pictures: 29" counts **map tiles only**. The season props are flat AND uncounted: the ofrenda is a `THREE.Sprite` with `userData={prop:true,ofrenda:true}` (`engine3d.js:548`), and so are the piñata and the sill calaveritas. Making one of them an honest body is real work that moves that number by zero. Say so before doing it, not after.

The moment: I was handed "the number the owner is watching is the flat pictures: 29" and sent to redo the altar. Nothing in my file told me what that number counts, and the natural claim — "the altar is a flat picture, so this helps the 29" — is false. I only found out by reading the scoreboard's own source. An agent that does not check this will report a win the owner's eyes will not find, which is the exact failure this repo has had twice this week.

**The refusal is NOT edited.** "You DIRECT; you never write code" stays as written. This run pushed on it — I was asked for byte-exact patches, and I produced them — and the right response is to name that pressure here rather than to legalise it in my file. If the calling session wants me writing patches regularly, that is the session's decision to make in writing, not mine to quietly grant myself.
```

