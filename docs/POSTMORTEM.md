# The post-mortem — every way this session got it wrong, including the stupid ones

*Opened 2026-09-12 at the owner's word: **"make sure we are documenting and informing all agents of
your findings, be them silly or not so they can make sure not to make your mistake. basically give
them a post mortem and to learn from it so it is ready for them for next time they build."***

**Read this before you build anything.** It is not a list of rules — `docs/OWNER.md` has those. It is
a list of **things that actually happened to the session writing it**, in the order of how much time
they cost, written plainly enough that you can recognise yourself about to do one.

**The house style of this file:** every entry says what was believed, what was true, and *what it
cost*. No entry is here because it sounds wise. If it did not cost something, it is not in here.

---

## 0 · The one that outranks everything else

> **Five times in one session, a guard was written that read a proxy instead of the thing it meant —
> and three of those five were written by the session that was, at that hour, writing up the previous
> one.**

`docs/REGRESSION.md` carries the register; it was opened 2026-09-11 and its table holds the count. **Knowing
about this mistake does not stop you making it.** That sentence is the single most useful line in
this repository and it was earned the expensive way.

**What to actually do about it, since knowing is provably not enough:** when you finish a guard,
break the thing it is for — in a copy *outside* the repository — and read what it prints. Ten
minutes. It has never once been wasted. If you cannot think of a way to break it, that is the finding
(see §6).

---

## 1 · When a fix does not land twice, the cause is not the thing you keep changing

**The sugar skulls on the window sills took four attempts across four owner reports.** Attempts one
to four were: eight pixels of sweet → five → 0.85 of the pane → the whole pane lit. **Every one was
measured. Every one was defensible. Every one was a size.**

The fault was never a dimension. **There was no sill.** `propSill` had computed a y called `sill`
since the day it was written and nothing had ever drawn a ledge — the candy was standing on the
bottom edge of a hole in a wall.

**What found it: reading his words literally.** He wrote *"another attempt at showing the window
SILLS"*, and the three previous readings had all silently turned that into "showing the skulls".

> **The rule: if your second fix for the same report is the same KIND of fix as your first, stop.
> Re-read the report as if you had never seen it, and look for the noun you have been skipping.**

## 2 · Reasoning correctly from the code is not the same as being right

Making that ledge appear in 3D took **five wrong diagnoses**, and every one was correctly reasoned:

- the texture was dumped and was perfect;
- the position was computed and was right;
- the sprite reported `visible: true`;
- a raycast through the scene's meshes found nothing in the way;
- a probe of every object on that tile found nothing but the two sprites.

All five correct. All five useless. **A sprite is a billboard that turns to face the camera; the
camera looks down at the street; so the lower half of a tall billboard tilts back INTO the wall it
hangs on.** Nothing in the scene graph can tell you that. Moving it 0.045 further out fixed it.

> **The rule: RENDER IT AND LOOK. Every fault in this session's 3D work was found by looking at a
> picture, and every one of them had passed a suite that was green at the time.**

## 3 · "Hidden" is a fact about pixels

The guard for the sill went through three drafts. The first read the shape of a config file. The
second raycast the scene. The third probed the tile. The fourth — the one that works — **projects the
thing to screen and counts how many of its pixels arrived.**

The second and third were *better engineering* than the fourth and they went green against the real
bug. **The owner's word was "hidden", he used it three times across four days, and no check in this
repository read it until one did the obvious stupid thing and looked at the screen.**

> **The rule: when the owner uses a word, find the check that reads THAT word. "Hidden" is pixels.
> "Crowded" is pixels. "Too slow" is milliseconds. "I can't tell them apart" is a cold read by
> somebody who has not seen it before.**

## 4 · A guard that calls the function directly is testing the function, not the feature

The first ride guard called `rideStart()` and asserted a ride happened. It went green with the pass's
own wiring **cut out of `openTravel()`** — so it proved the ride works and *not* that anything ever
starts one.

> **The rule: drive the real path. Click the button. If a person would press something, press it.**

## 5 · Comparing two pictures means holding everything else still

The overpaint guard fired on a **clean tree at 76%**. It took its "before" picture by removing the
newest panel from `MURALS` — which changes how many courses deep the wall is, which changes its
natural height, which rescales everything. **It was comparing two different walls.**

Blanking the panel's *drawing function* instead leaves the layout byte-identical and changes exactly
one thing.

> **The rule: when you diff two renders, change one thing. If your "before" also moved the furniture,
> your number is about the furniture.**

## 6 · A plant that cannot fail is telling you something

Two plants at the overpaint guard were **silent**, and the first instinct was that the guard was
decorative. It was not: the clip in `murWall` caps how far a visit may reach, so a panel asking to
paint over its past is simply *cut off and cannot*. The rule was enforced by the structure.

What the guard actually catches is somebody **loosening that cap later** — raising a constant, or
deleting the clip. Both are one line and both look harmless. Planted that way, it fires.

> **The rule: if you cannot break a guard from the content side, plant at the STRUCTURE that makes it
> impossible. Do not delete the guard — it is the alarm on the door you just proved is locked.**

## 7 · The cause of an intermittent failure is almost never in the check that failed

`test/smoke.js` went red **one run in eight**, on a check about a traffic cone. The cause was **a dog
standing on a tram line, thirty checks earlier**, holding a ride that never ended, which left a
global set, which blocked every later step.

Three wrong fixes were shipped at the cone before anybody looked upstream.

> **The rule: a flake is a state leak until proved otherwise. Ask what ran BEFORE it, not what is
> inside it. And a check that leaves a global set is a bug in the check.**

**It recurred on 2026-09-13, one run in twenty-five, and inverted — see "7, extended" below.** There
was no state leak at all: the randomness was in the *world*, and the red was a real bug a player can
walk into. **§7 sends you upstream of the failing check; 7-extended says keep going until you are out
of the suite and into the game.**

## 8 · A brief is evidence, not authority — and stale line numbers are the tell

Three separate agents in one session were handed `file:line` references that were **wrong by about
twenty-seven lines**, because the session had inserted a function above them and not re-checked. All
three caught it. One agent refused a brief outright, went and found `docs/ASKS.md:52`, and was right
to: **the session had asserted its own inference as the owner's ruling.**

> **The rule: grep the identifier, never paste the number. And if a brief tells you what the owner
> decided, go and read what the owner actually said.**

---

## 9 · The silly ones, which cost real time and which nobody writes down

The owner asked for these specifically — *"be them silly or not"* — and they are the ones most likely
to happen to you today.

| What happened | Cost | Do this instead |
|---|---|---|
| **Two agents wrote `scratchpad/panel.js` in the same minute.** One read the file back and got the other's work, with their own name printed over the result. Both caught it; a subtler collision ships one agent's work under another's name | most of two runs | **Every agent writes under its own name**: `scratchpad/<you>-thing.js`. Never a bare noun |
| The same thing happened to the session's own render script — it was silently replaced by an agent's file and the next run died on `./panel.js` | ten minutes of confusion | as above; the scratchpad is shared and is not yours |
| A **python patch left a stray semicolon** mid-expression: `…&&!(world===AW("dog")&&x===px&&y===py);&&!troDanger(…)`. It parsed as far as the `;` and then did not | a full suite run | **`node -e "new Function(fs.readFileSync(f))"` after every scripted edit.** One second |
| A **regex replace inserted a whole block a second time**, so `const SILL_OUT` was declared twice and the game did not boot | a full suite run | assert the *count* after a scripted edit, not just that it applied |
| A "before" comparison was rendered against `origin/main` **which did not have the feature at all**, so the diff was meaningless | fifteen minutes | check your baseline actually contains the thing you are measuring |
| A screenshot harness shot **the title screen** for four cameras because the game had never been started | twenty minutes | `test/shots.js` already knows how to start the game. Copy it |
| A guard was scoped to `T3.group` when the thing it was looking for was in `T3.scene` | one wrong conclusion | when a search finds nothing, suspect the *scope* before the *subject* |
| A new sprite was tagged `calaverita:true` and an existing guard immediately failed with *"16 calaveritas stand in st, 8 were set down"* | nothing — the guard worked | **this is the system working.** A ledge is not a sweet. Name things as what they are |

**Added 2026-09-13.** The first five are the calling session's own, which is the point of keeping them:
they are the cheap ones, and the owner asked for the cheap ones by name. The last two are an agent's.

| What happened | Cost | Do this instead |
|---|---|---|
| A brand-new guard **crashed the whole suite on its first run** — the shared-block check referred to `crypto`, which was in scope in a different block of the same file. Nothing was wrong with the thing it was guarding | one suite run, and a red that meant nothing | **run the suite once after adding a guard, before you read its verdict.** A syntax check does not see a scope error |
| The workflow check's first draft read **`permissions:`' own `issues: read` line as a trigger** and went red on a clean tree | one false red, chased | anchor at column 0, or parse the file. A key nested under another key is not the key you asked for |
| A doc-correction script applied **eleven of twelve edits, then asserted on a stale anchor and exited** — leaving the register half-changed for a run, in a state no reviewer would recognise | one run, plus a document that was briefly neither version | **validate every anchor first, then apply; or make each edit its own transaction.** A partial apply is worse than a refusal |
| **Two ledger lines were appended by a script that had already failed its main step** — the bookkeeping ran anyway and recorded work that had not landed | a ledger that lied for a run | check the status before the bookkeeping. `set -e`, or an explicit exit check before anything writes a record |
| A sentence claiming **GitHub creates a missing label on first use** was written from memory, could not be verified (egress blocked), and was rewritten to what is certain | ten minutes, and it was caught | if you cannot verify it, **write what is certain and say what you could not check.** An unverifiable mechanism stated as fact is `[TRAINING]` wearing `[WEB]`'s clothes |
| **Two mural panels repeated somebody else's form** — one repeated the tick-box sheet from one bay over, another repeated her own lamps from her last visit | two repaints | **look at the wall before you paint on it.** `murMemoryText` exists for this |
| **A plant lab five hours old was measuring a tree that no longer existed** — two commits landed under it while it ran | five re-runs | a lab has a timestamp. Re-sync, re-establish green, and **re-run every plant that GOT PAST** — those are the only ones an upstream change can flip |

---

## 11 · A word that means two things, one of which has an incident report attached

The session wrote that putting a crew persona into the public game would be **"a leak, not a cameo."**
It meant the *content* sense — `docs/TAGS.md` keeps a **leak register** of tags that look universal
and are not — and it was describing **a thing that had not happened and was being refused in
advance.**

The owner read the other sense. This project has had exactly one real exposure, it is written up in
`docs/SECURITY-NOTE-2026-09-10.md`, and his reply was *"lets fix the leak... firstly- log how it
happened please for the security reasons."*

**Nothing had happened.** The cost was an alarmed message and an afternoon's trust spent on a
non-event, and the fault is entirely the session's: it used a word with a loaded second meaning, in a
project that owns the loaded meaning, without qualifying it.

> **The rule: never write the bare word "leak". Say "a content leak" or "a persona leak".** Four extra
> characters. And when somebody asks whether they are exposed, **measure before you reassure** — the
> greps that proved it took two minutes and are worth more than any sentence starting "don't worry".

**The second half of this entry is the better half.** When he asked for a log, the honest thing was
not to write an incident report for an incident that did not occur — it was to **check, and publish
what the check found.** The check turned up three things nobody knew: the crew personas were named
*after* Meridian's own cast and not the reverse; Meridian already ships a character called Rigo who
sells software; and source comments in shipped JS are public, which is fine here and worth knowing in
general. **A question asked in alarm produced better facts than the same question asked calmly would
have.**

## 11½ · I wrote "measure before you reassure", and then reassured him with a proxy

**In the same file, in the same hour, in the paragraph that states the rule.**

Section 11 ends: *"when somebody asks whether they are exposed, **measure before you reassure** — the
greps that proved it took two minutes."* Those greps used `grep -ril`, which is case-insensitive and
matches **inside other words**. For the name "Rigo" what it was actually finding was **"marigold",
sixteen times** — a game about Día de Muertos is full of marigolds.

So the security note was published saying the crew personas *"appear in shipped files only as comment
attributions"*. **There are no such comments.** Nacho re-ran it word-boundary and case-sensitive
within the hour: `Rigo` 4 — all four the cousin in quest 30 — and `Melo`, `Chema`, `Yaz`, `Zeni`,
`Toño`, `Remedios`, `Cuca` all **zero**.

**The conclusion was right and stronger than what was written. The evidence for it was false.** In a
*security* register, which is the one place a wrong fact is worse than no fact.

> **The rule: `grep -i <short name>` is not a measurement.** Use `-w`, drop `-i` for proper nouns, and
> **print the matches, not the count of files.** One line of output would have shown "marigold"
> immediately.
>
> **And the bigger one: a reassurance is a claim, so it gets the same treatment as a guard.** Plant a
> violation against your own evidence — ask what ELSE this pattern would match — before you hand
> somebody a number and tell them they are fine.

**Fifth time this session** a check read something other than what it meant. It is the only one that
went into a security document, and it is the only one where the person being reassured had asked
because he was worried.

## 12 · The shape of every one of these

Read the sections above again and they are one sentence:

> **The thing you are checking and the thing you mean are different, and the gap is invisible from
> inside your own reasoning.**

Which is why the only reliable instruments in this repository are:

1. **plant a real violation** and read what it prints;
2. **render it and look**;
3. **re-read what the owner actually wrote**, in his words, without your summary in between.

Everything else in here is a special case of failing to do one of those three.

---

## 13 · 2026-09-13 — the day crew mode got its lock

*The owner asked for the agents' own post-mortem of this day — **"make sure that we have the agents do
a post mortem for lessons learned to update and or help agents update documentation for further
improvements."** A first attempt was cut off by the account's session limit with only Zeni's two
entries written (13a, 13b, and "8, extended"). **The run was resumed the same day and the rest are
below, each in its author's own words**, consolidated by Chuy, who held the pen on documents only.
Six agents returned: Beto, Zeni, Yaz, Pili, Melo, Lupe. **The calling session's own mistakes are in
here too, mostly in §9**, because the owner asked for the cheap ones by name.*

*One thing to notice before reading them. **This day added seven rows to `docs/REGRESSION.md` §3 — the
register of checks that read something other than what they meant** — a hash instead of a position, a
hash instead of a content, a count instead of an identity, one YAML spelling instead of the grammar, a
quoted key instead of a trigger, soundness instead of completeness, and a backing buffer instead of a
screen. **Five of the seven were guards written that same morning and walked past that same
afternoon**, by the agent whose only job is walking past them. §0
said this was the most expensive recurring mistake in the repository; this day is the measurement of
that sentence, and the interval is now hours rather than days.*

### 13a · I prescribed a plant that cannot fire, inside the fix for an assertion that cannot fail (Zeni)

**What was believed.** `docs/BOUNDARY.md` G2 told the next agent that three lines close the oldest
untested clause in the sanitiser: add `bl: { __proto__: { a: 'b' }, ok: { part: 'opt' } }` to the hostile
payload in `test/smoke.js` (grep `const evil =`), assert the prototype survived, delete the clause in
`engine/engine.js` (grep `a #save= link may not reach the prototype`) and watch it go red first.
`docs/REGRESSION.md` #16 cited that recipe as the remedy.

**What was true.** The payload is a **JavaScript object literal** and reaches the engine through
`JSON.stringify` and back through `JSON.parse` in `readPass`. In an object literal `__proto__:` is the
prototype *setter*, not a property, so `JSON.stringify` never puts it on the wire; the prescribed plant
arrives as `{"ok":{"part":"opt"}}` and the clause can be deleted with the plant green. The same reading
condemns the payload already there: `qa: { __proto__: 9, … }` assigns a primitive, sets no prototype
and creates no own key — `__proto__` was never on the wire at all, so proxy #16 is worse than the
register records. The plant that works must be built **as text**: a literal JSON string carrying
`"bl":{"__proto__":{"a":"b"},"ok":{"part":"opt"}}`, because `JSON.parse`, unlike a literal, defines
`__proto__` as an own property.

**What it cost.** The `protoClean` assertion has asserted, for eight days, in the security section of
the public game's suite, that a pollution nobody attempted did not occur. The remedy was published into
two registers and cited from a third the same morning; anyone spending the prescribed ten minutes would
have watched it print green and recorded a clean bill for the one `if` that R3 was opened to buy.

> **The rule: a plant recipe is a guard, so run it and read the sentence it prints before you publish it
> as the fix.** An unexecuted remedy in a register of gaps is the most persuasive kind of wrong — it is
> written in the voice of the thing that catches wrongness. **And: `__proto__` in a JS object literal is
> not a key. If your payload crosses `JSON.stringify`, build it as text.**

### 13b · The ledger used a stronger noun for its own guard than the guard could read (Zeni)

**What was believed.** `docs/BOUNDARY.md` said `test/leaves.js` reads "the ledger's soundness and its
completeness".

**What was true.** The first draft read soundness only. Melo deleted the ledger row for the file that
holds the owner's key and the suite printed OK; he added a script that POSTs to `api.github.com` with a
bearer and it printed OK. The word "completeness" existed in the prose and nowhere in the extraction step.

**What it cost.** One plant, closed the same hour by `completeness()` in `test/leaves.js`. The real cost
is that, for the span between the ledger landing and the plant, the only document that routes every
edge to a person vouched in writing for a property it did not read — signed by the person whose whole
job is naming which noun a guard reads.

> **The rule: a register's prose is an unguarded claim about a guard.** §0's mistake one level up: not a
> check reading a proxy, but a *document* describing the check with the noun the author wanted. **When
> you write what a check reads, quote its extraction step next to the sentence — or write the weaker
> word.**

### 13c · A hash proved the bytes and could not see where they sat (Beto, Chuy; written up by Beto, Zeni and Melo independently)

**What was believed.** The shared memory block is identical in all nineteen persona files. The calling
session had hashed the extracted block in all nineteen an hour earlier and published that they matched.

**What was true.** They *were* identical. `.claude/agents/rigo.md` **also** carried the block a second
time at line 84 with the whole of Toño's persona pasted underneath it — so whoever answered as Rigo had
most recently been told he keeps the ferretería — and `don-guero.md` opened with a section of its own
**above** a block whose first words are *"before you answer anything"*. A hash compares text *after*
the text has been lifted out of the file: position, count, and whatever sits between two copies are all
gone before the comparison starts. The check was sound and it answered a different question from the
claim it was published as.

**What it cost.** `rigo.md` was created with the bleed on **2026-09-11** and found on **2026-09-13** —
**two days live on `main`**, past four careful readers and one published nineteen-file verification. It
was found by neither review nor hash: Beto found it while extracting the block to design a guard on it,
and Chuy found it the same hour by reading the file to its end for a roster line. The guard that now
holds the shape (`test/town.smoke.js`, grep `carries the shared block`) **went red on the tree it was
written against** — the tree the hash had just called clean.

> **The rule: the extraction step is a proxy before the comparison ever is. Ask what your check threw
> away to make the comparison easy** — a hash throws away position, a sort throws away order, a trim
> throws away the blank line that separated two people. **A check cannot report on what it normalised,
> and "identical" is not "correct".** The committed guard survives only because three *shape*
> assertions run before the hash: how many copies (grep `carries the shared block`), who the file hands
> the model (grep `the person it hands the model is somebody else`), and what is read first (grep
> `not the shared block`).

### 13d · The same hash said nineteen minds agreed and could not say what they agreed on (Melo)

**What was believed.** The repaired guard kept the hash: nineteen identical blocks means every agent
starts the day knowing the same things.

**What was true.** In a lab outside the repository, Melo deleted the four paid-for rules and *WHEN TWO
THINGS CONTRADICT, ASK HIM* from all nineteen blocks **at once**. Nineteen hashes still equal.
`node test/town.smoke.js` printed **OK, exit 0**, with the baseline green before and after. **The
cheapest way to pass a check that N copies agree is to edit all N.**

**What it cost.** One plant, closed the same hour: the block's spine is now pinned by *content* —
`test/town.smoke.js` (grep `the post-mortem — .claude/skills/crew-fix/SKILL.md`) requires each block to
name `docs/POSTMORTEM.md`, `docs/REGRESSION.md` and eight pinned strings. The cost had it survived is
the whole point of the shared block: every agent would have kept reading the same thing and the same
thing would have been wrong.

> **The rule: a check that N copies AGREE is not a check on what they SAY.** It is `docs/REGRESSION.md`
> #3 turned sideways — there *equal* said nothing about *moved*; here *equal* says nothing about
> *right*. **If a guard's whole assertion is sameness, name one sentence the thing must still contain,
> and pin that too.**

### 13e · The guard counted the lines and got one, and one was the wrong person (Melo)

**What was believed.** The morning's fix for the Rigo/Toño bleed was a guard asserting each persona file
says `You are **…**` exactly once — more than one and the file hands the model two people.

**What was true.** The fault it was written for does not have to arrive as two lines. Baseline green,
then one keystroke in the lab — `You are **Rigo**` → `You are **Toño**` in `rigo.md` — and the suite
printed **OK, exit 0**. One line, one person, wrong person. The assertion was `yous.length !== 1`
(`test/town.smoke.js`, grep `it hands the model more than one person`): a **count**, where the noun is
an **identity**.

**What it cost.** One plant, closed the same hour by reading the noun — the front matter's `name:` is
the filename and the person the file hands the model must carry that name, accents folded. What it
would have cost is the point: **the repair to `rigo.md` was a hand edit to a pasted-over file, and a
hand edit that leaves the wrong name behind is the likeliest way this recurs.** The guard would have
passed it, green, and vouched for the bleed it was written to end. It was **less than twelve hours old**
when Melo walked past it.

> **The rule: when a guard counts, ask what a count of one would let through.** This is the shortest
> interval this repository has recorded for *knowing about the mistake does not stop you making it* —
> morning to afternoon, same guard, same fault, one keystroke to the left. **And the method note, in
> Melo's words, because it cost him the ordering: he beat this shape twice before he named it, by
> working down a brief's list of guards instead of writing, for each assertion, the sentence it cannot
> distinguish.**

### 13f · The check read the workflow we would write, not the workflow YAML allows (Yaz; planted by Melo)

**What was believed.** `.github/workflows/` was covered. `test/leaves.js` printed *"…and no workflow can
be started by a label or a comment"* against the real repository, and `docs/BOUNDARY.md` G4 was marked
built the same afternoon.

**What was true.** It read one spelling of a grammar GitHub defines. Three legal ones walked past it,
each a single line: `permissions: write-all` (no indent, no scope name — the draft's pattern was
`^\s+scope: write$`); `contents: write   # to push the release tag` (an end-anchored pattern with a
comment after it); and `"on":`, which yamllint's truthy rule actively teaches people to write, so
`/^on:/` matched nothing, the trigger scan ran over the empty string, found no trigger, and the check
**printed its pass sentence — a positive claim about triggers — about a file it had just failed to
parse.** The same seam had already produced a false red in the other direction: the first draft read
`permissions:`' own `issues: read` line as a trigger.

**What it cost.** Three spellings, closed the same hour (`test/leaves.js`, grep
`permissions:\s*write-all`). The real cost is the window: while that OK stood, three legal ways of
writing *"CI may push to this repository"* were invisible to the only check that exists to see them —
and one register over, `docs/BOUNDARY.md` was signing in prose for the coverage (13b).

> **The rule: if your guard cannot find the key it reads, that is a RED, not a pass.** A check that
> prints its pass sentence after failing to parse the file is worse than no check, because a person now
> has a written claim. **And when the file's grammar belongs to a machine — YAML, JSON, a lockfile, a
> manifest — enumerate the spellings that machine accepts, or parse it properly. Otherwise you are not
> checking the repository, you are checking your own house style.**

### 13g · I trusted a red, because red is the colour you are told to trust (Yaz)

**What was believed.** *Red before green.* `test/leaves.js` went red on its first run against the real
repository, naming **five** persona and skill files that send a reader to a file nobody ever wrote. A
new guard whose first run is red on `main` is a guard that works.

**What was true.** Two of the five were invented by the guard. Its citation pattern (grep `const CITE`)
lists the endings it accepts, and **a regex alternation takes the first branch that matches, not the
longest** — so with `.js` written before `.json`, `test/spots.json` was read as `test/spots.js`, a file
that has never existed, and both `.claude/agents/pili.md` and `.claude/skills/room-design/SKILL.md` were
reported for citing it. Three were real. Replayed over the tree the draft ran against: 381 citations, 3
missing, 2 ghosts.

**What it cost.** Two names in five, and the near-miss is the part that matters: **the remedy those two
names prescribe is "edit two files that were already correct"** — a documentation change made to satisfy
a parser bug, in the two files a room designer reads before building a room. The false pair also diluted
the true three, which were the whole reason the check exists.

> **The rule: "red before green" only counts when YOU planted the red. Any other red is a hypothesis
> about the guard and the repository at the same time — point it at one case whose answer you already
> know before you carry its names anywhere.** A guard's first red gets the same ten minutes its first
> green gets. **And when you list file extensions in a pattern, list them longest first** — `.json`
> before `.js`, or you will invent a file and then report it missing.

### 13h · The plants that make the newest date mean anything run in a mode nothing invokes (Zeni)

**What was believed.** `docs/BOUNDARY.md` row 11 said of the workflow check: *"the six plants are its
self-test."* That sentence was the warrant for the only date on the page younger than a day.

**What was true.** The plants are real and preserved — eighteen cases in `test/leaves.js` under
`--selftest`, including all six Melo walked past and the three that were red on `main`. **Nothing
invokes them.** `test/town.smoke.js` calls `require('./leaves.js').consistency()` and only that (grep
`require('./leaves.js')`); `.github/workflows/ci.yml` runs eight named steps and `leaves.js` is not one
of them; a grep of `.github/` for `leaves` or `selftest` returns **nothing**. So revert the permissions
pattern to the first draft and `consistency()` still prints OK on this tree — the real workflows carry
no `write-all` for it to miss — while the case that would go red is never executed by anything on the
board. Verified again by Chuy on 2026-09-13: still nothing invokes it.

**What it cost.** Eighteen cases, zero runners. Six regressions bought with a plant that same afternoon,
each of them one line from returning green. `test/closes.js --selftest` is in the same position.

> **The rule: a plant proves a guard fired once, against one draft, on one afternoon. Name the step that
> re-runs it, or write "unrepeated" next to the date.** A plant kept as a fixture nobody invokes is a
> receipt, not a guard — **and a receipt looks exactly like a guard in a register.**

### 13i · I struck out two of my own gaps with the words "built the same day" (Zeni)

**What was believed.** `docs/BOUNDARY.md` G4 and G5 were struck through — *"~~Nothing reads a workflow's
`permissions:` block~~ — **built the same day**"* and the same for the personas' shared block. Two of
eight gaps closed, in a register whose own preamble says a date on that page means **a plant**, not a
build.

**What was true.** "Built the same day" is a statement that a guard **exists**. Within hours, somebody
trying to walk past those two guards did — three times at one and once at the other (13e, 13f). The name
check that answers the persona guard exists **because of the plant**, not because of the strikethrough.

**What it cost.** Two of eight gaps marked closed on the strength of a guard existing; five plants landed
against the day's new guards that same hour, two of them against the pair already struck out. Had nobody
planted, a reader of the gap register would have seen a closed door on a lock that opened to one
keystroke.

> **The rule: a gap is struck out by a plant, never by a guard existing.** Until something has been made
> false on purpose and has printed a sentence a person would say, the honest mark is **guard written,
> not yet planted** — and the strikethrough waits.

### 13j · The mark was measured visible and was never measured meaningful (Beto)

**What was believed.** The claim mark works. The town's street was rendered at its own camera and the
sash measured at **3 px of white across a 14 px shirt** — present, visible, legible.

**What was true.** Pili judged it by looking rather than measuring: at that size a stripe across a shirt
reads as a **band of office, a seatbelt, a bandolier** — *honour*, not "somebody is on this". The shirt
is full and 14 px wide, and the only thing carrying meaning at that size is the **outline**. The fix
moved the meaning off the fill and onto the silhouette — a hard hat the town never otherwise uses
(`engine/engine.js`, grep `lk.hat==="hard"`).

**What it cost.** One build of the wrong mark, replaced the same day, plus a price still being paid and
stated in the code: the hard hat covers the hair, so two claimed people are harder to tell apart from
each other — which is the owner's own 2026-09-03 complaint, accepted deliberately because his question
is "which are taken", not "which is #41". **The sharper cost is in the handover.** Beto's own post-flight
contained the sentence *"I can tell you the sash is 3 px of white… and I cannot tell you whether it
means claimed"* — and the mark was handed over anyway.

> **The rule: "visible" is a fact about pixels; "reads as X" is not, and one screenshot cannot answer
> both.** §3 sends you to the framebuffer for *hidden*; for *means*, the instrument is a person who has
> not seen it before. **And if your own post-flight contains the sentence "I cannot tell whether it
> means…", that is not a caveat — it is a blocking handoff, and shipping past it is the mistake.**

### 13k · The meaning moved to the outline and the measurement stayed on the shirt (Pili)

**What was believed.** The claim mark was fixed, and a guard written the same day holds it — a guard
whose failure sentence carries Pili's name and her words: *"the claimed person's outline is unchanged…
the hard hat is the mark that changes the outline"* (`test/town.smoke.js`, grep `the hard hat is the
mark`).

**What was true.** That guard reads `lk.hat !== 'hard'` — **a string in a look object, not an outline.**
An outline is pixels. Blank the six lines of the hard-hat branch, or draw the hat *inside* the 6.5 px
skull the way the other caps are clipped, and the field is still `"hard"`, the suite still prints OK,
and the claimed person's silhouette is identical to everybody else's again — which is precisely and only
the fault the guard exists to prevent. Meanwhile the sash it demoted is still on the shirt: a white
diagonal stroked across a coloured field (`changarrito/content/record.js`, grep `SHIRT_PATTERNS`) —
**the exact mark this project already records the owner rejecting as "crossed out"** (`engine/engine.js`,
grep `crossed out`). The mitigation is a sentence in a code comment saying the hat
"re-reads the sash as harness webbing" — **a claim about MEANING that nobody cold-read.**

**What it cost.** An entire QA pass aimed at the wrong mark: seven sizes, four cameras, twenty-eight rows
of sash pixels — three hours of which were spent on a canvas in an empty room (see "3 and 9, extended")
— and **none of it measured an outline.** The one previous time a diagonal bar shipped on a coloured
field here, it came back as an owner report and cost the whole alebrije look a re-cut.

> **The rule: when you move a meaning from one mark to another, move the MEASUREMENT with it. The old
> mark's evidence does not transfer, and a guard that reads the field your fix sets (`hat:"hard"`) is
> reading your fix, not the shape a player sees.** Ask of every number handed to you: *is this counting
> the thing the change was for?*
>
> **Reported, not absorbed, and deliberately not yet a row in `docs/REGRESSION.md` §3:** Pili was
> text-only and planted nothing, so the claim that blanking the hard-hat branch still prints OK is read
> off the assertion and not fired. By this repository's own rule, **plant it before you file it — and
> if it fires, that is the finding and this paragraph is wrong.**

### 13l · Every caller in the helper's history passed the same number, and we all read that as a convention (Pili)

**What was believed.** `murBody(g,x,y,shirt,h)` draws a little person at the height you ask for. Its own
comment said so: *"a little person, five pixels wide, the way the game draws one."*

**What was true.** Only `h` ever varied. The width, the head, the hat and the legs were hard constants,
so the first panel that asked for a 26-high body got **a five-pixel pencil**, and a 7-high one stood as
an ant beside 12 px type — because **lettering on that wall is absolute (`bold 11px`, `12px`) and every
drawing is proportional (fractions of `W` and `H`)**, so the two scales come apart the moment a panel is
a different size from the one it was copied from. The tell was in plain sight and nobody read it: every
call written before today passes 7, 8 or 9 — not because nineteen painters chose small people, but
because that was the only height that read, **and the comment told each of them the constraint was
deliberate.**

**What it cost.** Three of the four new panels repainted in one hour (Beto's crew, Zeni's clerk, Yaz's
lamps), and nineteen panels of accumulated work quietly composed around a bug that a five-line change
repairs byte-identically at `h=9`. The wall had been reviewed four times before this one.

> **The rule: when every call site in a helper's history passes the same value, that is not a convention
> — that is the only value that works, and the helper has been teaching its own bug.** And the general
> form, for any canvas: **if the text is in pixels and the drawing is in fractions, say which one is the
> ruler in the helper itself**, or the two will separate the first time the frame changes size.

### 13m · The change was to something the body was BORN with, so it would not have existed until you reloaded (Beto)

**What was believed.** Making a claimed issue stand differently in the town is: read the `taken: <name>`
label, set a field on the look, done. Four lines, every line correct — and the record re-decorates each
body on every `place()`, so the new look lands with the rest.

**What was true.** The record re-decorates `doc`, `tier` and `issue` (`changarrito/content/record.js`,
grep `n.doc=this.doc(i)`) — three fields written onto an npc that already exists. **The look is not one
of them.** `addChill` bakes `NPCLOOK[key]=c.look` **once** (`engine/engine.js`, grep `NPCLOOK\[key\]=`),
and `syncChill` returns early for a body already standing on its tile (grep
`if(here&&c&&c.world===at.world`), so a person claimed while standing keeps the shirt he spawned in and
the mark lands only on a reload. Measured, not reasoned: place the same issue twice, the second time
with `taken: beto`, and it came back `{"pattern":null,"sameKey":true}`. The fix is not in the look at
all, it is in the **id** — the claim is concatenated into `bodyId` (grep `bodyId(i,slot)`), which makes
`syncChill` do the only thing that can work: send the old body home and spawn the new one on the tile.

**What it cost.** Today, one measurement run, roughly ten minutes, because the four-line version was
never shipped. **The class has already cost far more:** the same "right after a reload, wrong all
session" failure reached the owner from play on **2026-09-06** — *"i dont see any people/characters
anymore at all other than the teller"* — survived weeks unseen, and is written on the inside of
`syncChill` itself by the fix that was meant to end it. **That is twice, in the same function, for the
same reason.**

> **The rule: when the change is to something a body was BORN with, the change is to its id, not to its
> fields.** Ask of any declarative "here is the whole set" API: *which of these values is read once, at
> creation?* Those are not settings, they are identity — and a diff that edits one of them does nothing
> to anybody already standing. **Then place twice and read what comes back**, because this class is
> invisible in the diff and invisible after a reload.

### 13n · A field nobody had ever used in anger opened a second bay, and the guard for it compared with nothing (the calling session)

**What was believed.** The mural wall's `by` field lets a panel say whose bay it belongs in. It has been
in the code for days and the wall renders correctly.

**What was true.** Its **first real use on a real panel** opened a second bay at the far end of the wall,
because the resolver keyed by the raw string rather than by the painter the string names. And the guard
that exists to catch exactly this — the return-visit check — **compared the new visit with nothing**,
because there was no previous visit for that key to compare against.

**What it cost.** Found and fixed the same hour, so the cost was one wall render and the confusion of
looking at a wall with an extra bay in it. **It is in here for the shape, not the bill:** a field that
has never carried a real value has never been tested, however long it has been in the file, and *"it has
been there for days"* is not evidence about a code path nobody has taken.

> **The rule: the first real use of a dormant field is a new feature, not a configuration change** —
> review it as one. **And a guard that compares "now" with "last time" says nothing at all on the first
> run**; if the first run is the run that matters, the guard needs a case for the empty side.

### 13o · I wrote the landscape row into my own list, and then nothing in the repository could run it (Lupe)

**What was believed.** `docs/QA-PASS.md`'s matrix has five rows and a pass runs all five; the bottom of
that page already records that landscape is unscripted, so it is counted.

**What was true.** **No suite in this repository has ever run either game in a landscape viewport.**
Every one is portrait: `test/smoke.js` at 480×900 and 390×560, `test/engine.smoke.js` at 480×900,
390×560 and 390×844, `test/town.smoke.js` at 480×900 — one size, portrait, for the whole town
(re-checked by Chuy, 2026-09-13: still true). And the unrun row was hiding a live fault in **both**
games: the page wrapper holds the viewport at ~528 px in any window wider than 560, the world's height
is its width × 8/10 ≈ 422 px, and the joystick and the Talk button are anchored to the **viewport's**
bottom rather than the window's — so in an 844 × 390 window the controls sit **100–120 px below the
fold** until you scroll or go fullscreen.

**What it cost.** The row has been words since 2026-09-09 — **four days** in which "tested at both
sizes", said in good faith by several people, meant two portrait widths. The fault is on `main` in both
games today, it is the first thing a person meets when they turn a phone sideways, and it was found by a
person opening a window, not by anything that runs.

> **The rule: a row of a checklist that no script can run is a row that gets skipped. Put "who runs it"
> in the same table as the row** — and if the answer is *a person, by hand*, the row reads as a gap
> every time anyone looks at the list, not only when they reach the footnotes.

### 8, extended · it recurred on 2026-09-13, at four times the scale (Zeni)

`docs/BOUNDARY.md` was written with 172 `file:line` citations, every one read out of the open file. By
the time a verifier read it, **31 had slid, most by +34**, because the calling session inserted a test
above them in the same hour. Two were worse than stale: they attributed a sentence to `docs/QA-PASS.md`
that exists in exactly one place — `.claude/agents/zeni.md` — one agent's private instruction dressed as
a settled register. **Cost: a full verifier pass over 172 citations and 31 corrections.**

> **Extends the rule: grep the identifier, never paste the number — and write the identifier *beside*
> the number in the register, so the citation survives the next insertion. And never cite
> `.claude/agents/*.md` as a source: a persona is one agent's instructions, not a register.**

**And a third time, the same day, in the other direction (Pili).** The guard bought for this —
`test/leaves.js` — calls `fs.existsSync` on the **path** only (grep `sends its reader to`). A citation
to a real file at a line that says something else entirely is green for ever, and
`.claude/agents/pili.md` carries three that are 400+ lines stale: `drawPerson` cited at `:2520` is at
`:2955`, and 2520 is inside a dog's neighbour search; `npcWhimsy` and `lookOf` are cited ~460 lines
early. **Two of that file's five citations are still correct, which is worse, because the file looks
reliable.** Cost today: three greps and a near-miss, caught only because the shared block says grep the
identifier. **The line half of every citation in this repository is unguarded.**

### 3 and 9, extended · the pixel instrument measured a canvas in an empty room (Lupe; mechanism confirmed by Melo)

§3 bought the pixel instrument — *"hidden" is a fact about pixels* — because a raycast is not a
picture. §9's sixth row records a screenshot harness that shot the title screen for four cameras
because the game had never been started: **twenty minutes.** Both happened again on 2026-09-13, at nine
times that cost.

**What was believed.** The town was on screen, so reading the canvas measured what a player sees.
Twenty-eight rows of sash pixels came back real, consistent, and correctly different between a claimed
person and an unclaimed one. They were reported as passes.

**What was true.** The town boots to its character creator. `#world` carries `hidden`, `#vp` lives
inside it, and `[hidden]{display:none!important}` — so `#vp.clientWidth` was **0**. Only
`cv.style.height` is derived from that width (`engine/engine.js`, grep `cv.style.height=`); the backing
buffer is `cv.width=VW*scale` from constants (grep `const VW=`), and `draw()` fills it every frame
whether or not the element has a layout box. **Every number was a true fact about a buffer no human eye
could reach.** A canvas draws in an empty room.

**What it cost.** Twenty-eight rows measured, reported as passes, and re-run from scratch — **three
hours** before a screenshot showed the front door instead of the street. The difference from §9's
twenty-minute version is the whole lesson: **that one was looked at, so it confessed in twenty minutes;
this one was only measured, so it hid for three hours and produced a clean report.**

> **Extends the rule: reading the framebuffer answers "was it drawn", not "was it on screen".** Pixels
> are still the right noun for *hidden* — but the canvas is a proxy for the screen unless you check it
> has a size. **Before the first row of any pixel script: the game is past its opening screen, and the
> element you are reading has a non-zero box on the page.** And §2 is unchanged, and is what saved it:
> render it and LOOK. **No row of the size matrix could have caught this. It would have passed at all
> five.**

### 7, extended · a red one run in twenty-five was the game, not the harness (Yaz and Lupe)

**What was believed.** `test/smoke.js` is the first step in CI and goes red now and then. Before
2026-09-13 it appears in no register in this repository, and the board was reported green.

**What was true.** It was never noise. A person standing anywhere is **stamped into the world grid as
`"N"`** — at boot (`engine/engine.js`, grep `wnpcs.push`), by `addChill` (grep `w.grid\[y\]\[x\]="N"`),
and on every wander step (grep `n.mv=null;n.wnext=`) — and `"N"` is impassable both to `isSolid` (grep
`const isSolid=`) and to the reachability audit's own `walk` (grep `const walk=(id,x,y)`). The wander
filter asks about solidity, doors and tram danger and **never asks whether the step it is about to take
cuts the map in two.** So a wandering neighbour standing in the one-tile gap by the barbería really
does wall 35 tiles of Calle Dos off from Doña Meche — for the audit **and for the player**, who gets no
way round. Every one of those reds was true.

**A correction to the day's own record, flagged rather than absorbed (Melo).** The record said
*"`auditReach` and `isSolid` both treat a standing person as a wall"*. **They never look at people at
all.** Both read only the grid; a person is stamped *into* the grid. Same consequence, different fix
site: the fix is the stamp, or the auditor's read of it — not a person-check.

**What it cost.** About **one run in twenty-five**, in the first step of CI, for longer than the branch
that found it — and for that whole time the alarm was describing a fault a player can walk into while
everybody read it as the suite being moody. **Nobody paid a bill anybody counted, which is exactly how
it survived.** And against a 1-in-25 fault, a single run prints green 96% of the time: the green cost
nothing to obtain and was worth nothing.

> **Extends the rule two ways. First: §7 says look upstream of the check that failed — keep going,
> because upstream of the harness is the game, and there a red is not a flake, it is the only bug report
> that will ever be filed.** A re-run that goes green has told you the frequency and nothing else.
> **Second: a suite result is a sample, not a state.** Report green with the number of runs attached —
> *"green on one run"* — and treat an intermittent red as a bug about the game until you have shown it
> is a bug about the test. §7's *"a flake is a state leak until proved otherwise"* now has a second
> candidate ahead of it: **a world with a random mover in it is its own fuzzer, and it is finding real
> faults.**

### 13p · The brief was written by hand, and the step it dropped was the one nobody would miss until the owner did (the calling session)

**Believed:** a workflow brief that names the flight notes and the return shape carries the whole
crew-fix loop. **True:** it carried everything except the mural, because the mural section was not
copied and nobody re-read the skill while writing the brief; seven designers returned with no panel
and the wall got its first empty run. **Cost:** the owner's first line the next morning was *"ensure
any crew mode creates a mural entry"* — the one thing he has asked for on every run since 2026-09-11.
**Rule:** a brief is a file copied whole, never a paragraph typed; and a guard now refuses an
iteration with no paint.

### 13q · Both sides of the comparison were the same function, so the function could not be wrong (the calling session)

**Believed:** the wall's stretch guard proved each painter kept one bay. **True:** it grouped panels by
`murPainter` and asked whether the wall kept those groups together — and the wall keys its bays by
`murPainter`. When that function named Doña Cuca "Cuca" and Don Güero "Don-guero", each got a second
bay and the guard was green; the first repair split "Melo Garduño" from "Melo" and the first draft of
the *new* guard, comparing whole names, was green again. **Cost:** three plants in a lab copy before
one guard read the noun. **Rule:** a guard that compares X with f(X) proves f is a function.
`docs/REGRESSION.md` row 24.

### 13r · The probe measured the tram (the calling session)

**Believed:** blanking the sill painter and diffing two front-camera frames measures the sill.
**True:** the first draft did not freeze the clocks, read 703 pixels of difference between two frames
with *nothing* changed, and would therefore have passed on a frame that draws no sill at all — the
check that was written to end five fixes of one kind would have been the sixth. **Cost:** ten minutes,
because the control was run first. **Rule:** a pixel probe's first number is the control; if it is
not zero the probe measures nothing, and Chema's file says so — read it before writing one.

### 13s · "It is not drawn" is a claim about the code; "I did not notice it" is a claim about play (Chava)

**Believed:** after four passes along the street in four cameras, "there is no mural on this wall."
**True:** the paint was there every pass, at `changarrito/content/art.js:25`; one crop at 3× settled
it. **Cost:** a wrong sentence in a report, caught by the reporter. **Rule:** when you conclude a thing
is *absent*, crop it before you say so; the play-scale finding — *not noticed in four passes* — was the
true and useful one, and it survives.

### 13t · Five fixes about size and light, and nobody asked whether the thing was on the paper (Chema)

**Believed:** the skulls were small, or dim, or the colour of their shelf. **True:** in the camera the
owner photographs, the front camera, the window was drawn eight times a frame and delivered zero
pixels — painted in the ground pass, covered by the wall's own face in the depth pass, since the day
it shipped. **Cost:** five owner reports and five fixes that changed nothing he could see. **Rule:**
before measuring how well a thing reads, blank its one painter and diff the frame; presence before
contrast. The instrument is in `.claude/agents/chema.md` now, and the suite asks the question in the
front camera.

### 13u · A pixel count was copied forward three times, and the third session did arithmetic on it (the calling session)

**Believed:** `content/horno/art.js` said, under a heading reading *"MEASURED, not reasoned"*, that
*"the numbers the shipped guard prints today are top 228, front 155, 3D 76 and iso 915"* — and it said
so in a paragraph whose entire subject was that an earlier write-up's numbers came from a different
probe on a different tree. **True:** `node test/horno.js` prints 224 / 149 / 915 / 49, and did on the
day that sentence was written. **Cost:** the session building the knead needed a before-figure for the
bake's own legibility in 3D, took the 76 out of that comment because it was the only one in the file
that claimed to be current, measured 52 after its first draft, and wrote "down from 76 to 52" into a
new comment as the reason for a design decision. The decision was right for an entirely different
reason — an untouched dough has to reproduce the shipped tray to the byte — and the sentence
justifying it was a two-ended fabrication: a stale before and a real after, subtracted.

**What made it possible:** the receipt looked like the most trustworthy thing in the file. It was in
capitals, it named a suite, it named four cameras, and its own paragraph was a warning about exactly
this. **A comment that warns about stale numbers is not thereby exempt from being one.**

**Rule, and it is cheap enough that there is no excuse:** a number you are about to build on gets
re-taken before you build on it. `git stash push -- <the files you changed>`, run the suite, pop —
two minutes, and it gives you the before AND the after from the same binary on the same tree. That is
what finally produced 224 / 149 / 915 / 49 on both sides of the stash and proved the knead
behaviour-identical at rest, which no amount of reading the comment could have told anybody.

## How to add to this file

Same discipline as every register here: **it grows from what happened, never from imagination.** An
entry needs what was believed, what was true, and what it cost. If you cannot name the cost, you have
a rule, not a post-mortem — put it in `docs/OWNER.md` instead.

## 2026-09-17 — four ways to be wrong, and none of them was in the code

A long day, and the four worth keeping are the four that **could not be seen by reading**.

**1 · Four fixes to a thing that was not there.** The owner reported a sugar skull on a window sill
five times over nine days. Four answers changed the SIZE of the skull — 8px, 5px, 0.85 of the pane,
then the pane lit behind it. Each was measured. Each was defensible. **Rendering the tile at 8×
before touching anything took two minutes and showed there was no window at all** — the facade
painted two flat rectangles and the mural then plastered over even those. *Cost: nine days and four
attempts. The fix, once looked at: one afternoon.*
**What to do instead:** on the second attempt at a drawing, stop adjusting and take a picture of it.

**2 · A number three cameras never read.** `wellDepth` and `stairLift` returned the right height for
two versions and only `engine3d.js` ever called them. A stairwell was a flat floor with a chevron on
it; the rainbow bridge was paint on the water. **Nothing about this is visible in the code** — each
camera reads correctly on its own. *Grep every camera for a function's name before you believe the
world has that fact.*

**3 · A refusal that is not an error.** Moving the engine loader into an inline `<script>` broke El
Changarrito completely — its shell ships a stricter policy (`script-src 'self'`, no
`'unsafe-inline'`) than Meridian's. The script **parsed, appeared in `document.scripts`, and never
ran**. A CSP refusal is not a page error, so nothing threw and nothing was logged; the town's entire
engine simply did not load. Caught only because the suites run against both shells.
**What to do instead:** when a change touches how a shell LOADS anything, run both suites before
believing it, and remember that *the two shells are not the same shell.*

**4 · A guard that read the constant it was guarding.** The 3D scene cache's ceiling check compared
`T3CACHE.size` against `T3CACHE_MAX`. Raising `T3CACHE_MAX` to 999 turns the cache off — **and the
guard still passed.** Four more of the same shape went red or silent the same day (`docs/REGRESSION.md`).
*A ceiling is a fact about behaviour, not a number to read back.*

**And one about the owner rather than the code**, which is the most useful line of the day and is
his: *"can we make the guards smarter instead of just making them notes?"* Two checks had been made
to say `NOTE-ONLY: no world has a well` and `no portal in this shell` rather than fail — a shrug
dressed as diligence. **A guard that says "I measured nothing" is still a guard that measured
nothing**, and next week nobody reads the note. Both now derive their demand from what the pack
itself declares and cross-check it with a cruder question that cannot break the same way.

