# Flight notes — what each agent expected, what actually happened, and what they changed

*Opened 2026-09-11. The owner: "lets try to get agents to be forced to document how they can improve
before they start the task and after too to try to keep improving themselves and their persona based
on their experience in the first iteration, they have to ensure their persona was fitting or they
modify it to plan or execute better."*

**Newest first.** The next iteration reads this file before it starts — that reading is the whole
mechanism. Without it, iteration two is iteration one with a different random seed.

**A proposed persona edit is a proposal.** The calling session applies it or refuses, in writing,
here. No agent edits `.claude/agents/` — see `.claude/skills/crew-fix/SKILL.md`.

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
citations of files that never existed; two were real. Its pattern listed the endings it would accept
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

