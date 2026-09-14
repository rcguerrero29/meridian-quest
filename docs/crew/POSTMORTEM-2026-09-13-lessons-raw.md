# The post-mortem of 2026-09-13 — the six lessons as returned, raw

*Chuy consolidated these into `docs/POSTMORTEM.md` §13 and `docs/REGRESSION.md` before the rate limit stopped him mid-way through the documents they name. Each lesson's **DOCUMENTS TO UPDATE** section below is the list still to be applied, `docs/` only, by the next window.*



---

# beto

## 1 · PRE-FLIGHT

I read `docs/POSTMORTEM.md` end to end (including "How to add to this file") before writing a word, then re-derived every claim I intended to make from the code rather than from the brief — `git log -1 d1f5d5b` for the date the persona bleed was born, `grep` for `NPCLOOK[key]`, `bodyId`, `lk.hat==="hard"` and `createHash` for the line numbers, because §8 says the stale number is the tell and §13b already caught 31 slid citations from this same day. My entries are the two things my own run got wrong plus the one existing entry my run made recur, and I checked each against the register first so I extend rather than restate. Where I expect to be weakest: I have no way to price a mistake that was caught before it shipped, so where the cost is "ten minutes and the prior incident", I say exactly that instead of inflating it.

## 2 · POST-MORTEM ENTRIES

*(for `docs/POSTMORTEM.md`, inserted under §13, before `## How to add to this file` at `:295`)*

### 13c · A hash proved the bytes and could not see where they sat (Beto)

**What was believed.** The shared memory block is identical in all nineteen personas. The calling session had hashed the extracted block in all nineteen files an hour earlier and published that they matched.

**What was true.** They *were* identical. `.claude/agents/rigo.md` also carried a **second** copy of the block at line 84 with Toño's entire persona pasted underneath it — so whoever answered as Rigo had most recently been told he keeps the ferretería — and `don-guero.md` opened with a section of its own **above** a block whose first words are "before you answer anything". A hash compares text *after* the text has been lifted out of the file: position, count, and whatever sits between two copies are gone before the comparison starts. The check was sound and answered a different question from the claim it was published as.

**What it cost.** `rigo.md` was created with the bleed on **2026-09-11 13:20** (`git log -1 d1f5d5b`) and found on **2026-09-13 18:37** (`673727d`) — **two days live on `main`**, past four careful readers and one published nineteen-file verification. The commit that shipped it is titled *"El mural de la cuadrilla, and seven guards that read the wrong noun"*. It was found by neither review nor hash, but by extracting the block for an unrelated job; Chuy found it the same hour by reading a file to its end for a roster line. The guard that now holds the shape (`test/town.smoke.js`, grep `carries the shared block`) **went red on the tree it was written against**.

> **The rule: an extraction step is a proxy before the comparison ever is. Ask what your check threw away to make the comparison easy** — a hash throws away position, a sort throws away order, a trim throws away the blank line that separated two people. **A check cannot report on what it normalised, and "identical" is not "correct".**

### 13d · The diff was four lines and finished, and the mark would not have existed until you reloaded (Beto)

**What was believed.** Making a claimed issue stand differently in the town is: read the `taken: <name>` label, set a field on the look, done. Four lines, every line correct — and `record.js` re-decorates each body on every `place()`, so the new look lands with the rest.

**What was true.** `record.js` re-decorates `doc`, `tier` and `issue` (`changarrito/content/record.js:667`, grep `n.doc=this.doc(i)`) — three fields written onto an npc that already exists. The **look is not one of them.** `addChill` bakes `NPCLOOK[key]=c.look` once (`engine/engine.js:167`), and `syncChill` returns early for a body already standing on its tile (`engine/engine.js:205`, grep `if(here&&c&&c.world===at.world`), so a person claimed while standing keeps the shirt he spawned in and the mark lands only on a reload. Measured, not reasoned: place the same issue twice, the second time with `taken: beto`, and it came back `{"pattern":null,"sameKey":true}`. The fix is not in the look at all, it is in the **id** — `bodyId` carries the claim (`changarrito/content/record.js:509`), which makes `syncChill` do the only thing that can work: send the old body home and spawn the new one on the same tile.

**What it cost.** Today, one measurement run, roughly ten minutes, because the four-line version was never shipped. The *class* has already cost far more: the same "right after a reload, wrong all session" failure reached the owner from play on **2026-09-06** — *"i dont see any people/characters anymore at all other than the teller"* — survived weeks unseen, and is written on the inside of `syncChill` itself (`engine/engine.js:181-189`) by the fix that was meant to end it. **That is twice, in the same function, for the same reason.**

> **The rule: when the change is to something a body was BORN with, the change is to its id, not to its fields.** Ask of any declarative "here is the whole set" API: *which of these values is read once, at creation?* Those are not settings, they are identity — and a diff that edits one of them does nothing to anybody already standing. **Then place twice and read what comes back**, because this class is invisible in the diff and invisible after a reload.

### 3, extended · it recurred on 2026-09-13: I measured "visible" when the question was "does it mean claimed" (Beto)

§3 says *"hidden" is a fact about pixels*. Today the same instrument was aimed at the opposite word and returned a true answer to the wrong question.

**What was believed.** The claim mark works. I rendered the town's street at its own camera and measured the sash at **3 px of white across a 14 px shirt** — present, visible, legible. My own post-flight named the limit out loud (*"I can tell you the sash is 3px of white … and I cannot tell you whether it means claimed"*) and I handed it over as the mark anyway.

**What was true.** Pili judged it by looking rather than measuring: at that size a stripe across a shirt reads as a **band of office, a seatbelt, a bandolier** — *honour*, not "somebody is on this". The shirt is full and 14 px wide, and the only thing carrying meaning at that size is the **outline**. The fix moved the meaning off the fill and onto the silhouette — a hard hat the town never otherwise uses (`engine/engine.js:3123`, grep `lk.hat==="hard"`) — which re-reads the sash as harness webbing.

**What it cost.** One build of the wrong mark, replaced the same day, plus a price still being paid and stated in the code: **the hard hat covers the hair, so two claimed people are harder to tell apart from each other** (`changarrito/content/record.js:516-521`) — which is the owner's own 2026-09-03 complaint, accepted deliberately because his question is "which are taken", not "which is #41". The guard now asserts the outline and says why (`test/town.smoke.js:188`).

> **The rule: "visible" is a fact about pixels; "reads as X" is not, and one screenshot cannot answer both.** §3 sends you to the framebuffer for *hidden*; for *means*, the instrument is a person who has not seen it before. **And if your own post-flight contains the sentence "I cannot tell whether it means…", that is not a caveat — it is a blocking handoff, and shipping past it is the mistake.**

## 3 · DOCUMENTS TO UPDATE

**A. `docs/REGRESSION.md` — lesson 13c.** Append one row to the proxy table, after row 16 (`:64`):

> `| 17 | **the shared-block check the calling session ran by hand** (2026-09-13; ad-hoc, not a committed guard) | are the nineteen **extracted** blocks byte-identical | is each persona **one person, with that block first and once** — they were identical, and `.claude/agents/rigo.md` also held a second copy at line 84 with Toño's whole persona under it, while `don-guero.md` opened with a section above it. The extraction discarded position before the comparison began, so the answer was true and the published claim was not the question | Beto, extracting the same block to design a guard on it; Chuy, independently, reading a file to its end |`

And append a fourth item to *"What they have in common"* after point 3 (`:96-98`):

> `4. **The extraction step is a proxy before the comparison is.** #17's hash was correct; what it hashed had already been lifted out of the file, so position, count and neighbours were gone before anything was compared. The committed version survives only because three **shape** assertions run before the hash — count (`test/town.smoke.js:1161`), one-person (`:1162`), position (`:1172`) — and the hash then compares what is left. **Ask what your check normalised away to make the comparison easy.**`

**B. `.claude/skills/crew-fix/SKILL.md` — lesson 13c, at the door.** In *"Before anything: two files"*, append after the line `Then `docs/REGRESSION.md`'s proxy register, before you write any guard.`:

> `**And one thing about how you check.** If your check *extracts* before it compares — a hash, a sort, a trim, a regex capture — it has already thrown away position, order and neighbours, and it cannot report on any of them. That is how nineteen persona files were verified identical on 2026-09-11 while one of them carried a second copy of the block with another agent's whole persona underneath; it was live on `main` for two days (`docs/POSTMORTEM.md` §13c). **Name what your extraction discarded, in the same breath as the result.**`

**C. `docs/TAGS.md` — lesson 13d, as a leak-register entry.** Insert after L22, before the `---` at `:482`:

> `### L23 · A pack may hand `syncChill` the whole cast, and cannot change anybody already standing`
>
> `syncChill` takes the entire desired set as data (`engine/engine.js:179`) and reads like a declarative API: hand it the cast, it makes the world match. It does not. `addChill` bakes `NPCLOOK[key]=c.look` **once** (`engine/engine.js:167`), and `syncChill` returns early for any body already on its tile (`engine/engine.js:205`), so **`look` is write-once per id** — as are the name and the egg. Only the fields a pack decorates itself afterwards are live; El Changarrito re-writes `doc`, `tier` and `issue` on every `place()` (`changarrito/content/record.js:667`), which is exactly why a document change lands and a shirt change does not.
>
> **What a second pack hits:** any state it wants to *show* on a person — claimed, sick, on shift, holding something — must be **part of the id**, or the world is right after a reload and wrong for the whole session. El Changarrito pays this in `bodyId` (`changarrito/content/record.js:509`), which concatenates the claim into the id so `syncChill` sends the old body home and spawns a new one on the same tile. **Untested by Meridian:** Meridian declares no chill cast at all, so silence here is not a pass.
>
> **Measured, not inferred, 2026-09-13:** place the same issue twice, the second time with `taken: beto` — `{"pattern":null,"sameKey":true}`.

**D. `docs/POSTMORTEM.md` — §13's own framing.** In the italic note at `:228-234`, replace `**Zeni's two came back and are below, in her words.** The rest of the day's mistakes — the calling session's own, Melo's five plants, Lupe's empty bay, Pili's sash — are listed in` with:

> `**Zeni's two came back that day; the run was resumed and the rest are below, each in its author's own words.** Any of the day's mistakes not yet written up here — the calling session's own, Melo's five plants, Lupe's empty bay — are listed in`

*(Pili's sash is dropped from that list because it is now "3, extended". The pen-holder must reconcile this sentence against whatever else returns in this run; I only know my own three.)*

**E. `docs/crew/FLIGHT-NOTES.md` — two citations of mine that have already slid, same day, same cause as §8-extended.** At `:181`, replace `` `record.js:628-630` re-decorates `doc`, `tier` and `issue` `` with `` `record.js:667` (grep `n.doc=this.doc(i)`) re-decorates `doc`, `tier` and `issue` ``, and replace `` syncChill returns early for anyone already standing on their tile (`:204`) `` with `` syncChill returns early for anyone already standing on their tile (`:205`, grep `if(here&&c&&c.world===at.world`) ``. At `:177`, `record.js:614-621` now points at `nextDoc()`; it means the `bodyId`/`look` comment, `changarrito/content/record.js:503-521`. **This is `docs/POSTMORTEM.md` §8-extended recurring a third time in one day, inside the document written to record the work that caused the slide** — the identifier is written beside the number above so the next insertion cannot move it.

**F. `docs/GIFTED-GAMES.md:55` — stale, found on the way.** `` `addChill` `:154`, `syncChill` `:173` `` should read `` `addChill` `:160`, `syncChill` `:179` ``. Off by six.

## 4 · WHAT I DID NOT CHECK

- **I ran no suite.** Every claim above is read out of files and `git log`; I did not execute `test/smoke.js`, `test/town.smoke.js`, `test/engine.smoke.js` or `test/leaves.js`, and I did not re-render the street to re-measure the hard hat. The 3 px sash figure is my own from earlier today and is corroborated only by the sentence in `test/town.smoke.js:188`.
- **I did not plant anything at the shared-block guard.** Melo did, five times; I am relaying that fourteen of nineteen plants were locked out without having re-run one, which is exactly the relay §8 warns about — treat that number as Melo's, not mine.
- **I did not verify Lupe's, Yaz's or the calling session's items** in the record (the 0×0 canvas, the `.js`-before-`.json` ghosts, the two ledger lines appended after a failed step). None of them are in my entries.
- **One live inconsistency I found and am not fixing, because it is code and the pen is not mine this round:** `changarrito/content/murals.js:79` still reads `/* a little person, five pixels wide, the way the game draws one */` above a `murBody` whose width now follows its height (`:86`). Nothing has broken; it has cost nothing yet, so by house style it is not a register entry — it is a one-line correction somebody should make while they are in that file.
- **I did not check whether `test/leaves.js`'s `completeness()` is itself complete**, only that the function exists (`test/leaves.js:153`) and is called (`:143`).

## POST-FLIGHT

The persona earned its keep at the hinge of 13d: *"reproduce before you diagnose"* is the only reason the four-line diff was measured instead of shipped, and the measurement — not the reading — is what turned a look problem into an id problem. Where it got in my way is 3-extended: *"the smallest change that removes the class"* is a seam instinct, and it let me hand over a mark I had proved **present** while writing down that I could not prove it **meant** anything, which I now read as a stop sign rather than a caveat. The gap I did not predict is the one in 13c — my four engine facts all tell me to distrust a *number*, and nothing in my file told me to distrust the *extraction* that produced one, which is the shape that hid Toño inside Rigo for two days; that belongs in `docs/REGRESSION.md` where every agent reads it, not in one man's file. No persona edit this round.


---

# zeni

## 1 · PRE-FLIGHT

I intended to write today's post-mortem the way I write a ledger row — one claim, one `file:line`, and the word **nobody** where it belongs — starting with my own run rather than the day's roundup, because the register already carries two entries of mine from this morning and a third restatement would be decoration. Being the customs clerk equips me for exactly one thing here: I do not ask what anybody was building, I ask what the guard actually reads and what re-runs it, and that question turns out to be the one nobody asked of today's newest guard. My persona's known shortfall is that I have no shell, so every date and every "it ran" in what follows is a claim by a document or by a file I read, never by history — and I expected that to bite again, and it did.

## 2 · POST-MORTEM ENTRIES

*(Proposed for `docs/POSTMORTEM.md`, inside the existing `## 13 · 2026-09-13` section, after `### 13b`.)*

### 13c · The plants that make my newest date mean anything run in a mode nothing invokes (Zeni)

**What was believed.** `docs/BOUNDARY.md` row 11 says the workflow check is *"Last planted against: 2026-09-13, by Melo: `write-all`, a trailing comment and `"on":` all walked past the first draft; **the six plants are its self-test**."* I signed that sentence as the warrant for the only date on the page younger than a day.

**What was true.** The plants are real and they are preserved — eighteen cases at `test/leaves.js:202-273`, including all six Melo walked past and the three that were red on `main`. **Nothing invokes them.** `test/town.smoke.js:1199` calls `require('./leaves.js').consistency()` and only that; `.github/workflows/ci.yml:22-70` runs eight named steps and `leaves.js` is not one of them; a grep of `.github/` for `leaves` or `selftest` returns nothing, and a repo-wide grep of `*.{js,yml,sh,json}` finds `--selftest` in exactly two files, `test/leaves.js` and `test/closes.js`, neither of them a runner. So if `test/leaves.js:82` is reverted to the first draft's `^\s+scope: write$`, `consistency()` still prints `OK` on this tree — the real workflows carry no `write-all` for it to miss — and the case that would go red, `test/leaves.js:237-239`, is never executed by anything on the board.

**What it cost.** Eighteen cases, zero runners. Six regressions bought with a plant the same afternoon, each of them one line from returning green and none of them re-read since the hour they were written. And the ledger's freshest date rests on a sentence I published the same afternoon that is stronger than what runs — the third time in one file, by one hand, in one day, that the prose claimed more than the extraction step (see 13b).

> **The rule: a plant proves a guard fired once, against one draft, on one afternoon. Name the step that re-runs it, or write "unrepeated" next to the date.** A plant kept as a fixture nobody invokes is a receipt, not a guard — and a receipt looks exactly like a guard in a register.

### 13d · I struck out two of my own eight gaps with the words "built the same day" (Zeni)

**What was believed.** `docs/BOUNDARY.md:321` and `:330` carry G4 and G5 struck through — *"~~Nothing reads a workflow's `permissions:` block~~ — **built the same day**, see row 11"* and the same for the personas' shared block. Two of eight gaps closed, in a register whose own preamble (`docs/BOUNDARY.md:20-25`) states that a date on this page means *a plant*, not a build.

**What was true.** "Built the same day" is a statement that a guard **exists**. Within hours, somebody trying to walk past those two guards did: Melo beat the workflow check three ways (`write-all`, a trailing comment after `contents: write`, a quoted `"on":` — now `test/leaves.js:82-84,92`) and beat the shared-block check with one keystroke, swapping `You are **Rigo**` for `You are **Toño**`, because `test/town.smoke.js:1162` counted identity lines and got one. The name check that answers it, `test/town.smoke.js:1167-1171`, exists **because of the plant**, not because of my strikethrough. And row 14 of my ledger still describes that guard as reading *"name exactly one person"* — the noun I wanted, not the count the guard read — and still does not mention the eight pinned spine strings at `test/town.smoke.js:1191-1193` that Melo's fifth plant bought.

**What it cost.** Two of eight gaps marked closed on the strength of a guard existing; five plants landed against the day's new guards that same hour, of which two were against the pair I had already struck out. Had nobody planted, a reader of the gap register would have seen a closed door on a lock that opened to one keystroke. I cannot order my edit against Melo's without `git log`, so what I am claiming is about the sentence, not the hour.

> **The rule: a gap is struck out by a plant, never by a guard existing.** Until something has been made false on purpose and printed a sentence a person would say, the honest mark is **guard written, not yet planted** — and the strikethrough waits.

### 13e · A hash saw that the block was identical and could not see where it sat (written up by Zeni from the day's record; the mistake is the calling session's)

**What was believed.** The shared memory block was hashed in all nineteen persona files and reported identical. It was identical.

**What was true.** `rigo.md` also carried the block a **second time**, at line 84, with all of Toño's persona pasted under it — so whoever answered as Rigo had most recently been told they keep the ferretería. A hash of *extracted* text cannot see how many times the extraction matched or where in the file it sat. Beto found it designing the guard; Chuy found it reading a file to its end for a roster line. The guard that now holds the shape reads position and count, not just content: `test/town.smoke.js:1157` (`heads`), `:1161` (more than once), `:1172` (it must be what is read first).

**What it cost.** A persona bleed live on `main` — the record of this run says two days; I did not check that against history and have no shell to do so. The guard written to hold it went red on the tree it was written against, which is the only reason anyone knows.

> **The rule: when you check a set of things for sameness, ask what the extraction threw away before it compared.** Position, count and context are discarded by every hash, and all three were the fault. "Identical" is a property of the extract, not of the file.

## 3 · DOCUMENTS TO UPDATE

**Lesson 13c — a plant needs a runner.**

1. `/home/user/meridian-quest/docs/POSTMORTEM.md` — insert §13c above the line beginning `### 8, extended` (grep `### 8, extended`). Text as in §2 above.
2. `/home/user/meridian-quest/docs/BOUNDARY.md` — in the **On the dates** paragraph, after the sentence ending `…and that is the most useful word on the page.` (grep `most useful word on the page`), append:
   > **And a date is worth what re-runs it.** A plant proves a guard fired once, against one draft, on one afternoon; only something that runs on every push keeps it true. Each date below is therefore followed by **what re-runs it** — the step or suite that would go red again — or by the word **unrepeated**.
3. `/home/user/meridian-quest/docs/BOUNDARY.md` — row 11, replace the clause `the six plants are its self-test.` (grep `the six plants are its self-test`) with:
   > the six plants are preserved as fixtures in `test/leaves.js --selftest` (eighteen cases, `:202-273`) — **which nothing invokes**: `test/town.smoke.js:1199` calls `consistency()` only, and no workflow names `leaves.js` (`.github/workflows/ci.yml:22-70`). **Re-run by: nothing.** See G9.
4. `/home/user/meridian-quest/docs/BOUNDARY.md` — new gap after G8 (grep `### G8 ·`):
   > ### G9 · The plants are kept as fixtures and no runner invokes them
   > **Smallest guard.** One line in `.github/workflows/ci.yml` beside the town step: `node test/leaves.js --selftest` — and `node test/closes.js --selftest`, which is invoked by nothing either (`test/closes.js:82`).
   > **What it would have caught.** Reverting `test/leaves.js:82` to the first draft's `^\s+scope: write$` — the exact regression bought on 2026-09-13 — which `consistency()` cannot see on a clean tree, because the real workflows carry no `write-all` to find. Nothing else on the board would print a word.
   > **Honest note.** A self-test is a guard about a guard and its own extraction can go blind the same way: `completeness()` returns silently when `git ls-files` throws (`test/leaves.js:169`), so on a box without git the third derivable set is skipped and nothing says so.
5. `/home/user/meridian-quest/docs/REGRESSION.md` — §1 suites table, the `test/leaves.js` row (grep `in \`town.smoke.js\` (soundness)`), append to the **Runs where** cell: `; its eighteen red cases (`--selftest`) run **nowhere** — not CI, not `town.smoke.js``.
6. `/home/user/meridian-quest/.claude/skills/crew-fix/SKILL.md` — after the paragraph beginning `**The question, and it is not optional:**` (grep `and it is not optional`), add:
   > **And when the plant lands, wire it.** A plant proves the guard fired once, against one draft, on one afternoon; what keeps it true is a case that runs on every push. **Say which step runs it, by name.** On 2026-09-13 six plants against `test/leaves.js`'s workflow check were written up as its self-test, and `node test/leaves.js --selftest` is invoked by no workflow and no suite — so each of the six regressions they were bought against can return green.

**Lesson 13d — a strikethrough is bought with a plant.**

7. `/home/user/meridian-quest/docs/POSTMORTEM.md` — §13d, after §13c.
8. `/home/user/meridian-quest/docs/BOUNDARY.md` — in the italic preamble to **The promises with no guard**, after `if it needs a sitting, it is not on this list.` (grep `if it needs a sitting`), add:
   > **A gap is struck out by a plant, never by a guard existing.** Two of the gaps below were struck through on the day they were written; both guards were walked past within the hour by somebody trying to, and both had to be widened. Until something has been made false on purpose, the honest mark is *guard written, not yet planted*.
9. `/home/user/meridian-quest/docs/BOUNDARY.md` — in the G4 and G5 headings, replace `built the same day` (grep `built the same day`, two hits) with `guard built **and planted at** the same day`.
10. `/home/user/meridian-quest/docs/BOUNDARY.md` — row 14, replace the clause beginning `the block must be first in every file` (grep `name exactly one person`) with:
    > the block must be first in every file and appear exactly once (`test/town.smoke.js:1157,1161,1172`); the front-matter `name:` must be the filename and the `You are **…**` line must carry that name, accents folded (`:1167-1171`) — **the count of identity lines was the first draft's noun, and one swapped name walked past it**; the block must hash identically across all nineteen (`:1177-1183`); and it must contain `docs/POSTMORTEM.md`, `docs/REGRESSION.md` and eight pinned spine strings (`:1185-1193`), because identity across nineteen files is satisfied perfectly by editing nineteen files.

**Lesson 13e — what the extraction threw away.**

11. `/home/user/meridian-quest/docs/POSTMORTEM.md` — §13e, after §13d.
12. `/home/user/meridian-quest/docs/REGRESSION.md` — one new row at the end of the proxy table (grep `| 16 |`), numbered **after** whatever rows Melo's five plants take; do not renumber existing rows:
    > `| n | **the shared-memory block, checked by hashing** (2026-09-13) | do the nineteen extracted blocks hash the same | **is each file one person's instructions** — the extract runs from the heading to its tail, so it could not see that `rigo.md` carried the block a second time with Toño's whole persona under it. Identical, and wrong | Beto, designing the guard; Chuy, reading a file to its end |`
    *(Collision risk: Melo's own write-up may file this. One row, not two.)*

## 4 · WHAT I DID NOT CHECK

- **Nothing was executed.** No shell. I did not run `node test/leaves.js --selftest`, `node test/town.smoke.js`, or any suite. "Nothing invokes the self-test" is read out of `.github/workflows/ci.yml` (in full), a grep of the whole `.github/` tree for `leaves|selftest`, `test/town.smoke.js:1199`, and a repo-wide grep of `*.{js,yml,sh,json}` for `selftest`. **I did not check for a Makefile, a git hook, a `package.json` outside that glob, or anything on the owner's laptop that might run it.**
- **`git log`, `git log -S` and `git blame` were not run.** The "two days on main" in 13e, and the ordering of my strikethrough against Melo's plants in 13d, are claims by the day's record, not by history. That is why 13d claims a sentence and not an hour.
- **`.github/workflows/pages.yml` was not read in full** this session — only grepped.
- **Not read today:** `docs/NEXT-SESSION.md`, `docs/crew/FLIGHT-NOTES.md`, `docs/OWNER.md`, `docs/ASKS.md`, `docs/OPEN.md`, `docs/TAGS.md`, `docs/CREW-MODE.md`, `docs/CITY-AS-MEMORY.md`, and eighteen of the nineteen persona files.
- **Lupe's and Pili's findings I did not verify at all** — the 0×0 canvas, the `auditReach` flake, the landscape fold, `murBody`'s five pixels. They are in the record and none of them is in my entries.

## 5 · POST-FLIGHT

The persona got it right at the moment I stopped reading `docs/BOUNDARY.md` as a document and asked its newest row the second question — *and what reads that exact noun?* — which is how "the six plants are its self-test" turned into a grep of `.github/` that came back empty. Where it was silent: nothing in my file tells me that a guard's date decays, only that a guard needs one, and I wrote a whole date column this morning without noticing that half its entries have no mechanism to stay true. The gap I predicted — no shell, so every date is a document's word — appeared exactly as predicted and shaped two of the three entries, which means the prediction was useful rather than merely correct. The finding belongs in `docs/BOUNDARY.md`'s date column and in the crew-fix skill's plant paragraph, where the next person will meet it before writing a guard rather than after; no persona edit this round.


---

# yaz

## 1 · PRE-FLIGHT

I worked this by re-running the two things I touched today rather than describing them — `node test/leaves.js` and `node test/leaves.js --selftest`, both green (`OK — 18 cases…`, `/home/user/meridian-quest/test/leaves.js:271`) — and then reconstructing my own first-draft failure by replaying the bad extension ordering over `.claude/**/*.md` at `673727d^`, because a number I did not recount is a number I am quoting, not evidence. My trade equips me for exactly the three lessons below: where a check runs and what colour it prints are the whole of my job, and a red nobody diagnoses is the same failure as a green nobody planted at. Where I expected to fall short: I have no way to date the 1-in-25 smoke failure back to the commit that introduced it, so I say how it works and not how long it has been there.

**One contradiction resolved by checking, so it is a finding, not a question:** `docs/crew/FLIGHT-NOTES.md:115` says my first-draft `test/leaves.js` red was *"five … two were real"*. It was **three real, two ghosts**. Replaying the old ordering at `673727d^` gives 381 citations from `.claude/`, of which three name files that did not exist (`melo.md` → `docs/BOUNDARY.md`, `melo.md` → `test/leaves.js`, `zeni.md` → `docs/BOUNDARY.md`) and exactly two `.json` citations exist to be mangled (`pili.md` and `.claude/skills/room-design/SKILL.md`, both `test/spots.json`). The task brief's account is right and the flight note has the split backwards.

## 2 · POST-MORTEM ENTRIES

*(Exact text, to be inserted in `/home/user/meridian-quest/docs/POSTMORTEM.md` — see §3a for where.)*

### 13c · I trusted a red, because red is the colour you are told to trust (Yaz)

**What was believed.** *Red before green.* `test/leaves.js` went red on its first run against the real repository, naming **five** persona and skill files that send a reader to a file nobody ever wrote. A new guard whose first run is red on main is a guard that works.

**What was true.** Two of the five were invented by the guard. `CITE` (grep `const CITE`) lists the endings it will accept, and a regex alternation takes the **first branch that matches, not the longest** — so with `.js` written before `.json`, `test/spots.json` was read as `test/spots.js`, a file that has never existed, and both `.claude/agents/pili.md` and `.claude/skills/room-design/SKILL.md` were reported for citing it. Three were real: `melo.md` twice, `zeni.md` once. Replayed today over the tree the draft ran against (`673727d^`): 381 citations, 3 missing, 2 ghosts.

**What it cost.** Two names in five, and the near-miss is the part that matters: the remedy those two names prescribe is *edit two files that were already correct* — a documentation change made to satisfy a parser bug, in the two files a room designer reads before building a room. The false pair also diluted the true three, which were the whole reason the check exists. And the count was published wrong: `docs/crew/FLIGHT-NOTES.md:115` records it as "two were real".

> **The rule: "red before green" only counts when YOU planted the red. Any other red is a hypothesis about the guard and the repository at the same time — point it at one case whose answer you already know before you carry its names anywhere.** A guard's first red gets the same ten minutes its first green gets. And when you list file extensions in a pattern, list them **longest first**; `.json` before `.js`, or you will invent a file and then report it missing.

### 13d · My check read the workflow I would write, not the workflow YAML allows (Yaz)

**What was believed.** `.github/workflows/` was covered. `test/leaves.js` printed *"…and no workflow can be started by a label or a comment"* (`test/leaves.js:277`) against the real repo, and `docs/BOUNDARY.md` G4 was marked built the same afternoon.

**What was true.** It read one spelling of a grammar GitHub defines. Melo walked in with three legal ones, all one line: `permissions: write-all` (no indent, no scope name — the draft's pattern was `^\s+scope: write$`); `contents: write   # to push the release tag` (an end-anchored pattern with a comment after it); and `"on":`, which yamllint's truthy rule actively teaches people to write, so `/^on:/` matched nothing, the trigger scan ran over the empty string, found no trigger, and the check **printed its pass sentence — a positive claim about triggers — about a file it had just failed to parse.** The same seam had already produced a false red in the other direction: the first run read `permissions:`' own `issues: read` line as a trigger (`test/leaves.js:88-89`).

**What it cost.** Three spellings, closed the same hour at `test/leaves.js:82-84` and `:92-93`; the self-test now prints *"18 cases, including the three that were red on main the day this was written and the six Melo walked past that afternoon"* (re-run today, green). The real cost is the window: while that OK stood, three legal ways of writing *"CI may push to this repository"* were invisible to the only check that exists to see them — and one register over, `docs/BOUNDARY.md` was signing in prose for the coverage (Zeni, §13b).

> **The rule: if your guard cannot find the key it reads, that is a RED, not a pass.** A check that prints its pass sentence after failing to parse the file is worse than no check, because a person now has a written claim. **And when the file's grammar belongs to a machine — YAML, JSON, a lockfile, a manifest — enumerate the spellings that machine accepts, or parse it properly. Otherwise you are not checking the repository, you are checking your own house style.**

### 13e · A red once every twenty-five runs was the only bug report the game ever filed (Yaz)

**What was believed.** `test/smoke.js` is the first step in CI and goes red now and then. Nobody wrote it down: before 2026-09-13 it appears in no register in this repository.

**What was true.** It was never noise. A person standing anywhere is **stamped into the world grid as `"N"`** (`engine/engine.js:170`, restored at `:175`; toggled at `:102-104`), and `"N"` is impassable to `isSolid` (`engine/engine.js:73`) and to the reachability audit's own `walk` (`engine/engine.js:311`). So a wandering neighbour standing in a one-tile gap really does wall 35 tiles of Calle Dos off from Doña Meche — and the same rule blocks **the player**, not only the audit. Every one of those reds was true.

**What it cost.** About **one run in twenty-five**, in the first step of CI, for longer than this branch has existed — and for that whole time the alarm was describing a fault a player can walk into, while everybody read it as the suite being moody. Nobody paid a bill anybody counted, which is exactly how it survived. **This is §7 recurring**: there it was one run in eight and the cause was a dog holding a ride thirty checks upstream; here it is one in twenty-five and the cause is not in the harness at all.

> **The rule: a test is not flaky until you are holding its cause. §7 says look upstream of the check that failed; this one says keep going — upstream of the harness is the game, and there a red is not a flake, it is the only bug report that will ever be filed.** A re-run that goes green has told you the frequency and nothing else.

## 3 · DOCUMENTS TO UPDATE

**(a) `/home/user/meridian-quest/docs/POSTMORTEM.md` — the three entries above**, inserted after the *"8, extended · it recurred on 2026-09-13…"* block (ends `…a persona is one agent's instructions, not a register.**`, line 293) and **before** `## How to add to this file` (line 295).

**(b) `/home/user/meridian-quest/docs/POSTMORTEM.md`, §13's preamble (lines 228-234)** — it currently tells the next session the day's remaining mistakes are unwritten. Replace the two sentences beginning *"**Zeni's two came back and are below, in her words.**"* through *"…re-run it from the record in that handoff."* with:

> **Zeni's two came back first, then Yaz's three (13c-13e); all five are below, in their own words.** Still owed from this day, and listed for whoever writes them: **Lupe's** twenty-eight rows of sash pixels measured on a canvas nobody could see (the town boots to its class picker, the world's container was 0×0, and `draw()` fills the backing buffer regardless — every row passed, and a screenshot caught it three hours later); **Pili's** claim mark that was visible, legible and meant the wrong thing; and **the calling session's own** — the `by` field's first real use opening a second bay, a doc-correction script that asserted on a stale anchor after eleven edits and left the file half-changed, and two ledger lines appended by a script that had already failed its main step. `docs/NEXT-SESSION.md` and `docs/crew/FLIGHT-NOTES.md` iteration 5 carry the raw accounts.

**(c) `/home/user/meridian-quest/docs/POSTMORTEM.md`, §7**, appended after *"…And a check that leaves a global set is a bug in the check."* (line 121):

> **It recurred on 2026-09-13, one run in twenty-five, and inverted:** the cause was not in the harness at all — a neighbour standing in a one-tile gap is written into the grid as `"N"` (`engine/engine.js:170`) and walls the player out of 35 tiles. **§7 sends you upstream of the failing check; §13e says keep going until you are out of the suite and into the game.**

**(d) `/home/user/meridian-quest/.claude/skills/crew-fix/SKILL.md`** — in *"Before you write a guard, read the register of proxies"*, add a fourth item after `3. **A green guard is not evidence.** Eight ran green for days or weeks.` (line 236):

> 4. **A red guard is not evidence either.** `test/leaves.js`' first run named five persona citations of files that did not exist; two were invented by its own pattern, because a regex alternation takes the first branch that matches and it listed `.js` before `.json` (`docs/POSTMORTEM.md` §13c). **Before you carry a new guard's output anywhere — red or green — point it at one case whose answer you already know.**

…and after the question at line 238-241, add:

> **And the second question, which is cheaper: what does this guard print when it cannot read the file at all?** If the answer is its pass sentence, it is not a guard, it is a claim. A quoted `"on":` key made the workflow check report "no workflow can be started by a label or a comment" about a file it had failed to parse.

**(e) `/home/user/meridian-quest/docs/crew/FLIGHT-NOTES.md:114-116`** — replace *"named five persona citations of files that never existed; two were real."* with:

> named five persona citations of files that never existed; **three were real and two were ghosts** (re-counted 2026-09-13 by replaying the bad ordering at `673727d^`: 381 citations from `.claude/`, three missing — `melo.md` twice, `zeni.md` once — and two `.json` citations mangled).

**(f) `/home/user/meridian-quest/docs/REGRESSION.md`** — new row in the proxy table, after #16 (line 64):

> | 17 | **`test/leaves.js`' workflow check, first draft** (2026-09-13) | does this file contain the line `  <scope>: write`, and does a line begin `on:` | **may CI write to this repository, and can a label or a comment start it** — `permissions: write-all` has no indent and no scope name, `contents: write  # to push the tag` has a comment after it, and yamllint's truthy rule teaches people to write `"on":`, which made the trigger scan read an empty string and then print the OK sentence, a positive claim about a file it had failed to parse | Melo, planting three legal spellings |

**(g) `/home/user/meridian-quest/docs/REGRESSION.md`** — after the closing question at lines 100-102, append:

> **And the question under it: what does this guard print when it cannot read its subject at all?** #17 answered that with its pass sentence. **Not finding the thing is a red. Silence on a file you failed to parse is a claim you did not check.**

**(h) `/home/user/meridian-quest/docs/REGRESSION.md`, §3's gap table** — new row, so the finding stops living only in `docs/NEXT-SESSION.md:65`, which every session rewrites:

> | **R11** | a person standing on a tile is written into the grid as `"N"` (`engine/engine.js:170`) and is impassable to `isSolid` (`:73`) and to `auditReach`'s own `walk` (`:311`), so a wandering neighbour in a one-tile gap walls 35 tiles of Calle Dos off from Doña Meche — and from the player. `test/smoke.js` goes red about **one run in twenty-five** on it, and did so for longer than the branch that found it | nobody may be walled out by somebody standing: with every wanderer pinned in turn to each single-width gap, `auditReach` reports nothing and every NPC keeps a reachable neighbour. Red first by occupying `ex (19,1)` in a grown city | `smoke.js` | a quarter, plus the engine decision: does a person block, or do you walk around them (`docs/ARCH-LOG.md`) |

**(i) `/home/user/meridian-quest/docs/REGRESSION.md`, §1 "The suites today"** — a finding with **no cost yet**, so it is a doc fix and not a post-mortem entry: the table lists six suites and CI runs more. `.github/workflows/ci.yml` is the list. Add:

> | `test/engine.smoke.js --index <shell>` | CI, against **both** indexes (`ci.yml:28-31`); by hand | R4 — the engine's own invariants against either game: the worlds hang together, every person reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, storage under the pack's prefix |
> | `test/gauge.js` | CI (`ci.yml:32-33`) | the smallest thing that can be a world, run against the shared suite — what the engine demands of a brand-new pack, measured by building one (`docs/GAUGE.md`) |
> | `test/public.js <dir>` | CI on every push and PR, against a box built by `scripts/build-site.sh` (`ci.yml:37-38`), **and again in the deploy after `status.json` is written into it** (`pages.yml:55-56`) | R10 — what we would publish is only the public game |
> | `test/closes.js` | CI, **pull requests only** (`ci.yml:39-47`); `--selftest` by hand | R3 — every `Closes #N` names an open issue the PR actually talks about |
> | `test/bump.js <base> [head]` | CI on a pull request (`ci.yml:48-52`) **and on a push** (`:61-70`, added 2026-09-12 because most of this repo's history never saw a PR); by hand on the desk | an engine change that never reaches a returning player is not shipped — `GAMEV` and `CACHE` must have **moved**, not merely match |
> | `test/record.js _site/status.json` | **`pages.yml:49-50` only — after the merge, on `main`** | the city record is what a clerk can read (#14). It is the last member of the class `ci.yml:34-36` names: a check that runs only in the deploy cannot stop the commit that breaks it |

## 4 · WHAT I DID NOT CHECK · POST-FLIGHT

**What I did not check.** I did not reproduce the 1-in-25 by occupying `ex (19,1)` — the raw map at `content/meridian/maps.js:64-74` has no wall there, so the gap only exists once the lots are raised, and I verified the *mechanism* (person → `"N"` → impassable to both readers) and took the coordinates and the 35 tiles from Lupe's record. I did not date that fault to a commit (`git log -S` over `engine.js:170` was not run) and I did not measure the failure rate myself. I did not run `smoke.js`, `town.smoke.js`, `engine.smoke.js`, `gauge.js` or `public.js` today — only `leaves.js` twice — so my statement that the branch is green is `docs/NEXT-SESSION.md`'s, not mine. I did not check GitHub Actions run history for how often `smoke.js` has actually gone red (egress to the API not attempted), and I did not open `.claude/agents/` to compare the shared block — that is Chuy's and Beto's ground and their guard now holds it.

**POST-FLIGHT.** What my persona got right, with the moment: *"a failing test is never flaky until it has been proven flaky"* is the only reason I read `engine/engine.js:170` at all instead of filing the 1-in-25 under known noise — and that one line turns a suite annoyance into a bug a player can walk into. Where it was silent: my file tells me a version string is a cache key wherever a person reads it, and says nothing about a **guard's output** being read the same way — the OK sentence at `test/leaves.js:277` was cached in `docs/BOUNDARY.md`'s prose within the hour, which is Zeni's §13b arriving at my door from the other side. The gap I predicted appeared exactly where I said: I can describe how a standing person walls off a street and I cannot tell you when it started, because dating it needs a bisect and I ran none. The persona edit I already carry from this morning covers the version-string half and the rest belongs in the registers above, so — no persona edit this round.


---

# pili

## 1 · PRE-FLIGHT

I read `docs/POSTMORTEM.md` end to end (including "How to add to this file") and `docs/OWNER.md` before writing a word, then verified every claim I make below against the code by grepping the identifier — `murBody`, `takenBy`, `randLook`, `SHIRT_PATTERNS.taken`, `lk.hat`, `murPainter` — never by pasting a number from a brief or from my own persona. I am in text-only mode: I edited, created and deleted nothing, and the only thing I wrote outside this reply is nothing at all (I needed no scratch file). Three of the five `file:line` citations in my own persona turned out to point at unrelated code, which is why every citation below was re-derived from the open file today.

---

## 2 · POST-MORTEM ENTRIES

### 13c · I moved the meaning to the outline, and then the whole day's pixel evidence was taken of the mark I had demoted (Pili)

**What was believed.** The claim mark was fixed. The sash reads as *honour* — a band of office, a seatbelt, a bandolier — so the meaning moved to the outline: `lk.hat="hard"` at `changarrito/content/record.js:521`, held by a guard written the same day at `test/town.smoke.js:187-188` whose failure sentence carries my name and my words — *"the claimed person's outline is unchanged … the hard hat is the mark that changes the outline (Pili, 2026-09-13)."*

**What was true.** That guard reads `lk.hat !== 'hard'` — **a string in a look object, not an outline.** An outline is pixels. Blank the six lines of the hard-hat branch at `engine/engine.js:3123-3128`, or draw the hat *inside* the 6.5px skull the way `capFill` clips `cap`/`buzz`/`fade`, and the field is still `"hard"`, the suite still prints OK, and the claimed person's silhouette is identical to everyone else's again — which is precisely and only the fault the guard exists to prevent. Meanwhile the sash it demoted is still on the shirt: `SHIRT_PATTERNS.taken` at `changarrito/content/record.js:107-109` strokes a white diagonal from `(x-1, y+h-3)` to `(x+w+1, y+2)` — **a diagonal bar across a coloured field, which is the exact mark this project already records the owner rejecting as "crossed out"** (`engine/engine.js:3136-3137`). My mitigation is a sentence in a code comment at `changarrito/content/record.js:518` saying the hat "re-reads the sash as harness webbing." **That is a claim about MEANING and nobody cold-read it.** It is the third kind of measurement, the one my own persona says is mine, asserted in prose and parked where the next agent will read it as settled.

**What it cost.** An entire QA pass aimed at the wrong mark: seven sizes, four cameras, twenty-eight rows of sash pixels — three hours of which were spent on a canvas in an empty room — and **zero of it measured an outline.** The one previous time a diagonal bar shipped on a coloured field here, it came back as an owner report and cost the whole alebrije look a re-cut (`engine/engine.js:3136`). This is §3's rule — *"hidden is a fact about pixels"* — recurring one move later: the noun moved from the shirt to the outline and the instrument did not follow.

> **The rule: when you move a meaning from one mark to another, move the MEASUREMENT with it. The old mark's evidence does not transfer, and a guard that reads the field your fix sets (`hat:"hard"`) is reading your fix, not the shape a player sees.** Ask of every number handed to you: *is this counting the thing the change was for?*

*(Reported, not absorbed: `test/town.smoke.js:187-188` says "outline" and reads a field; `changarrito/content/record.js:518` says "re-reads as harness webbing" and nothing measured it. **I did not plant at that guard** — I am text-only this phase — so this is reasoning from the extraction step, not a fired plant, and by this repo's own rule nobody should believe it until somebody breaks it and reads what it prints.)*

### 13d · Every caller in the wall's history passed the same number, and we all read that as a convention (Pili)

**What was believed.** `murBody(g,x,y,shirt,h)` draws a little person at the height you ask for. Its own comment said so: *"a little person, five pixels wide, the way the game draws one"* (`changarrito/content/murals.js:79`).

**What was true.** Only `h` ever varied. The width, the head, the hat and the legs were hard constants, so the first panel that asked for a 26-high body got **a five-pixel pencil**, and a 7-high one stood as an ant beside 12px type — because **lettering on that wall is absolute (`bold 11px`, `12px`) and every drawing is proportional (fractions of `W` and `H`)**, so the two scales come apart the moment a panel is a different size from the one it was copied from. The tell was in plain sight and nobody read it: every call written before today passes 7, 8 or 9 — `murals.js:219, 360, 400, 489, 621, 745, 760` — not because nineteen painters chose small people, but because that was the only height that read, and the comment told each of them the constraint was deliberate.

**What it cost.** Three of the four new panels repainted in one hour (Beto's crew, Zeni's clerk, Yaz's lamps), and nineteen panels of accumulated work quietly composed around a bug that a five-line change repairs byte-identically at `h=9` (`changarrito/content/murals.js:86-87`). The wall had been reviewed four times before this one.

> **The rule: when every call site in a helper's history passes the same value, that is not a convention — that is the only value that works, and the helper has been teaching its own bug.** And the general form, for any canvas: **if the text is in pixels and the drawing is in fractions, say which one is the ruler in the helper itself, or the two will separate the first time the frame changes size.**

### 8, extended again · the guard written for stale persona citations reads the path, not the line — and it recurred in my own file (Pili)

§8 recorded citations wrong by ~27 lines; Zeni extended it the same day at 31-of-172, wrong by +34. **It recurred a third time today, in the nineteen files that tell every agent where to look.** `.claude/agents/pili.md` sends every reader to `drawPerson (engine/engine.js:2520)` — `drawPerson` is at `engine/engine.js:2955`, and 2520 is inside `dogSpotNear`'s neighbour search; it sends `npcWhimsy` to `:3769` and `lookOf` to `:3768`, which are at `4227` and `4226`, while 3768 counts park cats and 3769 picks a beagle-treat line. Two of the five are still true (`test/town.state.js:53-54`, `engine3d.js:548`) — which is worse, because the file looks reliable.

**What was believed:** `test/leaves.js`, written this morning, closed the persona-citation hole; `docs/REGRESSION.md:14` states it reads *"no persona citing a file that was never written."* **What was true:** it calls `fs.existsSync` on the path only (`test/leaves.js:117-120`). A citation to a real file at a line that says something else entirely is green forever. **What it cost:** the path-level version of this fault cost a whole new test plus a first draft that invented two ghosts; the line-level version costs nothing visible until an agent trusts it, which is the shape of every entry in this register. Today it cost me three greps and a near-miss, because the shared block says grep the identifier — **that block is the only thing standing between this and a wrong claim reaching the owner.**

> **Extends the rule: a `file:line` is `[CODE]` at the moment it is read and `[TRAINING]` an hour later. Cite the identifier next to the number everywhere, including in a persona — and note that the guard we bought for this reads a path, so the line half of every citation in this repository is still unguarded.**

---

## 3 · DOCUMENTS TO UPDATE

**A · Lesson 13c → `docs/QA-PASS.md`, "The pass, in order" (the numbered list at `docs/QA-PASS.md:28-41`), inserted between step 4 and step 5:**

> 4½. **Measure the mark that carries the meaning, not the one it replaced.** When a fix moves a meaning from one mark to another — a shirt pattern to a hat, a colour to a height, a label to a posture — **the old mark's evidence does not transfer.** On 2026-09-13 the claim mark moved from the sash to the hard hat (`changarrito/content/record.js:521`) and the day's entire pixel pass — seven sizes, four cameras, twenty-eight rows — counted *sash* pixels; nothing ever counted an outline. Ask of every number before you accept it: **is this counting the thing the change was for?**

**B · Lesson 13c → `docs/REGRESSION.md` §3, the proxy table (rows end at #16, `docs/REGRESSION.md:64`), as the next free number — but ONLY after somebody runs the plant, per that section's own rule 3:**

> | 17 | **the claim guard** (`test/town.smoke.js:187`) | is `lk.hat === "hard"` | **has the claimed person's OUTLINE changed** — it reads the field the fix sets, not the shape a player sees. Blank the hard-hat branch (`engine/engine.js:3123-3128`), or draw the hat inside the 6.5px skull the way `capFill` clips `cap`/`buzz`/`fade`, and it prints OK with the outline identical to everybody else's — the exact fault its own failure sentence describes | Pili, reading her own words in the failure message (**unplanted as of 2026-09-13 — plant it before filing this row; if it fires, that is the finding and the row is wrong**) |

**C · Lesson 13c → `docs/BEAUTIFY.md`, appended to "### Correctly flat — do NOT 'fix' these" (`docs/BEAUTIFY.md:61-66`) as a new short subsection immediately after it:**

> ### Marks that mean something — and the one shape that is already spoken for
>
> **A diagonal bar across a coloured field reads as "crossed out" in this project specifically.** The owner said it of the first striped alebrije and it cost that pass a re-cut (`engine/engine.js:3136-3137`). The town's claim sash is exactly that shape (`changarrito/content/record.js:107-109`); it survives only because the hard hat beside it changes the outline (`:521`), and **that rescue is a claim about meaning that has never been cold-read.** At the size these games are played, the outline is the only thing that can carry a new meaning — a new mark goes to the head, the hands or the height, never to the shirt.

**D · Lesson 13d → `.claude/skills/crew-fix/SKILL.md`, a new bullet at the top of "### The two rules that bind it" (`:295`), above *Add and improve, never remove*:**

> - **Type on this wall is absolute; your drawing is not.** Captions are set in pixels (`11px`, `12px`) and every panel is drawn in fractions of `W` and `H`, so the two scales come apart the moment your panel is a different size from the one you copied. **Size your people against the LETTERING, not against the frame.** `murBody`'s height is the ruler and its width now follows it — until 2026-09-13 it was five pixels wide at any height, which made one painter's crew ants under 12px type and another's clerk a pencil, and cost three repaints in an hour (`changarrito/content/murals.js:80-91`).

**E · Lesson 13d → `docs/crew/MURALS.md`, appended to "### The brief line, verbatim, for every returning painter" (`docs/crew/MURALS.md:536-551`), as the last paragraph of the quoted brief:**

> And one measurement before you paint: **the lettering on this wall is in pixels and your drawing is in fractions of the frame.** A figure that reads in a wide panel is a pencil in a tall one. Check your people against the caption beside them, not against the edge of your own picture.

**F · Lesson "8, extended again" → `docs/REGRESSION.md:14`, replace the `test/leaves.js` "Holds" cell wording (Zeni's 13b rule applied to a sentence written the same day — weaker word, or quote the extraction step):**

> `docs/BOUNDARY.md` is sound — every path real, every reviewer a persona, every row dated, **no persona citing a PATH that was never written** (`fs.existsSync` on the path only, `test/leaves.js:117-120` — **a line number inside a citation is not read**, and three in `.claude/agents/pili.md` are 400+ lines stale), no workflow a label or a comment can start. With a base: which boundary paths a change touches and who must see it, exit 0 always

**G · Lesson "8, extended again" → `docs/SOURCES.md`, the tag table at `:10-15`, replacing the `[CODE]` row and adding one line under the table:**

> | **`[CODE]`** | Read out of this repository, cited `file:line` **with the identifier beside the number** | **Yes — if you grep the identifier.** A bare line number is `[CODE]` at the moment it is written and `[TRAINING]` an hour later: 31 of `docs/BOUNDARY.md`'s 172 citations had slid within the hour, and three in a persona file were 400+ lines off with every suite green |
>
> **Nothing in `.claude/agents/` is a source.** A persona is one agent's instructions, and the line numbers inside it are guarded by nothing — `test/leaves.js` checks that the path exists, never that the line says what the persona claims.

---

## 4 · WHAT I DID NOT CHECK · POST-FLIGHT

**What I did not check.** I did not plant anything — text-only phase — so 13c's central claim (blank `engine/engine.js:3123-3128` and `test/town.smoke.js:187` still prints OK) is read off the assertion, not fired, and row 17 must not be filed until it is. I did not check whether Melo's nineteen plants included the claim guard; if one of them already hit it, this entry is a duplicate and should be merged into his. I did not re-render anything: I have not seen a hard hat on a claimed body at the town's zoom, and I could find no picture of one — Lupe's seven sizes measured the sash. I did not verify that no hand-authored town NPC wears `hat:"hard"` beyond confirming `randLook()` (`engine/engine.js:5041-5042`) never sets `hat` at all, and I did not check whether the other sixteen personas carry stale code line numbers — I only proved mine do.

**POST-FLIGHT.** The day's two real findings are mine and they are the same finding wearing different clothes: **the helper that said "five pixels wide" and the guard that said "outline" both described themselves in words nobody re-read against what they actually do**, and in one of them the words are my own. I am pleased with the hard hat and I am not pleased with how it was proved — I ruled the sash off the shirt in one paragraph and left it painted there in the next, defended by a sentence about harness webbing that no five-year-old in a dark yard has ever been asked to confirm. The cheapest thing the next session can do for this is not a new mark but a picture: render one claimed body and one free body side by side at the town's zoom, at thumbnail, and see whether the outline alone says *somebody is working on this*. One persona edit is genuinely earned this round, as exact text, appended to *What you actually know* in `.claude/agents/pili.md` (proposal only — I edited nothing): **"When you move a meaning to a new mark, move the measurement with it: the old mark's evidence does not transfer, and a guard that reads the field your fix sets is reading your fix, not the silhouette."**


---

# melo

## 1 · PRE-FLIGHT

I read `docs/POSTMORTEM.md` top to bottom including "How to add to this file", `docs/REGRESSION.md` §3, `docs/QA-PASS.md` E5–E9 and its gaps, `.claude/skills/crew-fix/SKILL.md` step 5½, and my own entry in `docs/crew/FLIGHT-NOTES.md:240`. Every claim below that is about code I re-grepped today against the real tree rather than taking from the brief — and one line of the brief is wrong, which is in §4. This phase is text only: I built no lab, planted nothing, and edited nothing.

## 2 · POST-MORTEM ENTRIES — exact text for `docs/POSTMORTEM.md`

*Insert all three immediately before `## How to add to this file` (`docs/POSTMORTEM.md:295`), after §13b.*

---

### 13c · A hash said nineteen minds agreed; it could not say what they agreed on (Melo)

**What was believed.** The nineteen personas share one memory block, sha1 over the extracted block in all nineteen files came back identical, and the calling session reported it: every agent starts the day knowing the same things.

**What was true.** They were identical — and `.claude/agents/rigo.md` carried the block a **second** time at line 84 with the whole of Toño's persona pasted under it, so whoever answered as Rigo had most recently been told he keeps the ferretería. **A hash of extracted text cannot see where the text sits.** Beto found it designing the guard; Chuy found it reading the file to its end for a roster line. Then the repaired guard kept the hash, so in a lab outside the repository I deleted the four paid-for rules and *WHEN TWO THINGS CONTRADICT, ASK HIM* from all nineteen blocks **at once**: nineteen hashes still equal, `node test/town.smoke.js` printed **OK, exit 0**, baseline green before and after.

**What it cost.** A persona bleed live on `main` for **two days**, plus one plant. Closed the same hour: the block's spine is pinned by content (`test/town.smoke.js:1189-1196`), the person by name (`:1163-1170`). The guard that now holds the shape **went red on the tree it was written against** — the tree the hash had just called clean.

> **The rule: a check that N copies AGREE is not a check on what they say — the cheapest way to pass it is to edit all N.** It is `docs/REGRESSION.md` #3 turned sideways: *equal* said nothing about *moved*; here *equal* says nothing about *right*. **If a guard's whole assertion is sameness, name one sentence the thing must still contain, and pin that too.**

### 13d · The guard counted the lines and got one, and one was the wrong person (Melo)

**What was believed.** The morning's fix for the Rigo/Toño bleed was a guard asserting each persona file says `You are **…**` exactly once — more than one and the file hands the model two people.

**What was true.** The fault it was written for does not have to arrive as two lines. Baseline green (`CHROMIUM_PATH=/opt/pw-browsers/chromium node test/town.smoke.js` → OK, exit 0), then one keystroke in the lab — `You are **Rigo**` → `You are **Toño**` in `rigo.md` — and the suite printed **OK, exit 0**. One line, one person, wrong person. `yous.length !== 1` (`test/town.smoke.js:1162`) is a count; the noun is an identity.

**What it cost.** One plant, closed the same hour by reading the noun: the front matter's `name:` is the filename and the person the file hands the model carries that name, accents folded (`test/town.smoke.js:1163-1170`). What it would have cost is the point — **the repair to `rigo.md` was a hand edit to a pasted-over file, and a hand edit that leaves the wrong name behind is the likeliest way this recurs.** The guard would have passed it, green, and vouched for the bleed it was written to end. It was **less than twelve hours old** when I walked past it, written by the session that had found the bleed that morning.

> **The rule: when a guard counts, ask what a count of one would let through.** This is the shortest interval this repository has recorded for *knowing about the mistake does not stop you making it* — morning to afternoon, same guard, same fault, one keystroke to the left. **And the method note, because it cost me the ordering: I beat this shape twice before I named it, because I worked down the brief's list of guards instead of writing, for each assertion, the sentence it cannot distinguish.**

### 3, extended · the pixel instrument read a proxy too — it recurred on 2026-09-13 (Melo, from Lupe's run)

**What was believed.** §3 above settles "hidden" by projecting the thing to screen and counting how many of its pixels arrived — the fourth draft, "the one that works".

**What was true.** Lupe measured **twenty-eight rows** of sash pixels and every row passed while the town was still on its opening screen and the world's container had no size. `sizeCanvas` takes the backing buffer from constants — `const VW=10*TS,VH=8*TS` (`engine/engine.js:614`), `cv.width=VW*scale; cv.height=VH*scale` (`engine/engine.js:637`) — and only `cv.style.height` from `$("vp").clientWidth` (`engine/engine.js:636`). So `draw()` fills a full-size buffer inside a container of zero size, and `getImageData` hands back a perfect picture of something nobody can see.

**What it cost.** Three hours, and twenty-eight green rows that asserted nothing. The screenshot caught it; nothing else in the pass could have.

> **Extends the rule: reading the framebuffer answers "was it drawn", not "was it on screen".** Pixels are still the right noun for "hidden" — but the canvas is a proxy for the screen unless you check it has a size. **Before the first row of any pixel script: the game is past its opening screen, and the element you are reading has a non-zero size on the page.** §2 is unchanged and is what saved it: render it and LOOK.

## 3 · DOCUMENTS TO UPDATE

**(a) `docs/REGRESSION.md` — §3's proxy table. Add five rows immediately after row 16 (`docs/REGRESSION.md:64`).** The register's value is the count, and today's five are not in it.

```
| 17 | **the personas guard, first draft** (`test/town.smoke.js`, written 2026-09-13, beaten the same afternoon) | how many `You are **…**` lines the file has | **which person it hands the model** — `You are **Toño**` in `rigo.md` is a count of one and it passed: the exact fault the guard was written for that morning, one keystroke to the left | Melo, a one-word replacement |
| 18 | **(the same guard)** | is the shared block **byte-identical in all nineteen** | **does it still say the things it was bought with** — the four paid-for rules and "ASK HIM" deleted from all nineteen at once hashes identical and the suite printed OK. #3 across copies instead of across time | Melo, editing nineteen files |
| 19 | **`test/leaves.js`'s permissions check, first draft** | a `scope: write` line under `permissions:` | **what the token may write** — `permissions: write-all` has no scope line and passed; so did `contents: write   # to push the release tag` and the inline `{contents: write}` | Melo |
| 20 | **(the same script)** the trigger check | a line beginning `on:` | **what can start this workflow** — a quoted `"on":` key made an `issue_comment` trigger invisible | Melo |
| 21 | **`test/leaves.js`'s ledger check** | are the rows it has **sound** (paths real, reviewers real, dated) | **does every edge have a row** — delete the row for the file that holds the owner's key and it printed OK, while `docs/BOUNDARY.md` called what it read "completeness" | Melo; written up by Zeni, `docs/POSTMORTEM.md` §13b |
```

and one paragraph after the table's closing prose (after `docs/REGRESSION.md:88`):

```
**Rows 17–21 were all written on the morning of 2026-09-13 and walked past the same afternoon**, by the
agent whose only job is walking past them; fourteen other plants that day were locked out by guards that
said something a person would say. All five are closed and each fix carries the plant that bought it in a
comment (`test/town.smoke.js:1163`, `:1189`; `test/leaves.js:77`; `completeness()` at `test/leaves.js:153`).
**Four of the five read an aggregate — a count, a hash, a shape — where the noun was an identity or a
content.** That is the shape to look for first in a new guard, and the morning-to-afternoon gap is the
shortest this register has recorded: **a guard's most dangerous hour is the one right after it first
goes green.**
```

**(b) `.claude/skills/crew-fix/SKILL.md` — step 5½, question 2 is stale (it says "Three guards in this repo read a proxy"; the register holds eighteen plus today's five).** Replace `SKILL.md:365-367` with:

```
2. **Does this change a GUARD?** If the diff touches `test/`, ask what noun that guard now reads, and
   whether it is the noun it means. **The register in `docs/REGRESSION.md` §3 is the count, and it keeps
   growing** — R8 read what the index loads; the mutant net read the source with comments stripped; the
   version test asked whether two strings were *equal* when what mattered was that one *moved*; and on
   2026-09-13 five guards written that morning were walked past the same afternoon, four of them because
   they read an **aggregate** — a count, a hash, a shape — where the noun was an **identity** or a
   **content**. **None was caught by review. Each was caught by planting a violation** → **`melo`**.
   **A guard's most dangerous hour is the one right after it first goes green.**
```

**(c) `.claude/skills/crew-fix/SKILL.md` — add after the paragraph ending "...what step 5½ asks of every change." (`SKILL.md:241`).** Nothing anywhere records this and it cost me five re-runs today:

```
**And the lab has a timestamp.** A plant runs in a copy of the tree *outside* the repository, and the
branch does not stop while you work: on 2026-09-13 two commits landed under a five-hour lab, so every
result in it was a claim about a tree that no longer existed. `git diff <snapshot>..HEAD` showing "none
of the guards moved" is reasoning, not evidence — re-sync, re-establish green, and **re-run every plant
that GOT PAST**, because those are the only ones whose answer an upstream change can flip.
```

**(d) `docs/QA-PASS.md` — new escape, after E9 and before "## Known gaps in the list".**

```
### E10 · Twenty-eight pixel measurements on a canvas nobody could see — 2026-09-13 (caught in-session by a screenshot, three hours late)
**What escaped:** not a bug — a *measurement*. Twenty-eight rows of "is the sash on the claimed person"
passed while the town was still on its opening screen and the world's container had no size on the page.
**Why it was possible:** `sizeCanvas` sets the backing buffer from constants (`const VW=10*TS,VH=8*TS`,
`engine/engine.js:614`; `cv.width=VW*scale`, `:637`) and only `cv.style.height` from `$("vp").clientWidth`
(`:636`), so `draw()` fills a full-size buffer inside a zero-size container and `getImageData` returns a
perfect picture of a frame no person can see.
**Which row would have caught it:** none. Every row of the matrix is a viewport size, and the viewport was
the right size — the element inside it was not.
**What the list is now:** step 4 says *of the frame you measured*, and a pixel script asserts, before its
first row, that the game is past its opening screen and `$("vp").clientWidth > 0`.
**The general lesson:** **reading the framebuffer answers "was it drawn", not "was it on screen".**
`docs/POSTMORTEM.md` §3 bought the pixel instrument because a raycast is not a picture; this is the
instrument's own proxy, and only a screenshot found it.
```

**(e) `docs/QA-PASS.md:40` — replace step 4 of "The pass, in order":**

```
4. **Look at a screenshot — of the frame you measured.** Numbers do not see teeth along every wall in HQ.
   A person does. And a number cannot see an empty room: on 2026-09-13 twenty-eight rows of pixels passed
   on a canvas with no size on the page (E10). **Before the first assertion in any pixel script: the game
   is past its opening screen and `$("vp").clientWidth > 0`.**
```

**(f) `docs/QA-PASS.md` — "Known gaps", replace the landscape bullet:**

```
- **Landscape is not covered by any suite.** The engine smoke runs at 480×900 and 390×844. Measured
  2026-09-13 at 844×390 in **both** games: the joystick and the Talk button sit **100–120 px below the
  fold** until you scroll or go fullscreen — a phone held sideways has no controls. Not an escape (the
  owner has not reported it); written here so it is counted rather than re-discovered.
```

**(g) `docs/REGRESSION.md` §3 — add a gap row to the second table (after R7), for the intermittent nobody owns:**

```
| **R11** | `test/smoke.js` goes red about **one run in twenty-five** on reachability, and the cause is not in the check: a person is written into the map as a tile (`engine/engine.js:170`, and `rebuildWorld` at `:5408`), and both `isSolid` (`:73`) and `auditReach`'s `walk` (`:311`) reject that glyph — so a wandering neighbour standing in the one-tile gap by the barbería genuinely walls off 35 tiles of Calle Dos, from the auditor **and from the player** (`tryStep`, `:3263`) | either wandering people do not stamp the grid, or the audit walks the map without them and a separate check says nobody may stand in a cut vertex. Red first by parking a neighbour in that gap on purpose | `engine/engine.js` + `smoke.js` | a quarter. **Until then, CI is red one run in twenty-five for a reason that looks like the cone in §7** |
```

## 4 · WHAT I DID NOT CHECK

- **I did not reproduce Lupe's 0×0 canvas or re-run her sash script.** I verified the *mechanism* in `sizeCanvas` by reading it (`engine/engine.js:614`, `:636-637`); the twenty-eight rows and the three hours are hers, from `docs/crew/FLIGHT-NOTES.md`, and I did not inspect the town's opening-screen DOM to confirm which element was zero.
- **I did not reproduce the 1-in-25 smoke flake** and did not measure its rate, and I did not check whether the town's suite has the same exposure.
- **A correction to the day's record as it was handed to me:** it says *"`auditReach` and `isSolid` both treat a standing person as a wall"*. They do not look at people at all — `isSolid` (`engine/engine.js:73`) and `walk` (`:311`) read only the grid; a person is **stamped into the grid** as `"N"` when placed (`:170`) and on every rebuild (`:5408`). Same consequence, different fix site: the fix is the stamp or the auditor's read of it, not a person-check. Flagged rather than corrected quietly, per the shared block.
- **I planted nothing today** — this phase is text — so none of the five closures above was re-verified this session beyond reading the code that now carries them.
- **I did not read beto's or chava's lessons**; the rate limit meant they were never written, and §13 of the register still has the gap.

## POST-FLIGHT

The two entries I am proudest of are the ones where the guard had been green for less than a day, because they are the only evidence that the register's own line — *knowing about the mistake does not stop you making it* — is a measurement and not a slogan. The thing I got wrong in my own run is in 13d and it is an ordering fault: I ran nineteen plants down a brief's list and named the shape they shared only at the third instance, when writing the sentence each assertion cannot distinguish would have found all five by reading. Everything above is text; I built no lab today and there is nothing to delete. No persona edit this round.

```
$ git status --short
(no output — 0 lines)
```

nothing of mine is in the tree.


---

# lupe

## 1 · PRE-FLIGHT

I read `docs/POSTMORTEM.md` top-to-bottom including "How to add to this file", then `docs/QA-PASS.md` (all nine escapes and the known-gaps list) and `docs/REGRESSION.md`'s proxy table, before writing a word — because an entry that duplicates §3, §7 or §9 is noise. I re-verified my own three findings against the code rather than against my flight note: the empty-canvas mechanism at `engine/engine.js:614`, `:634-637`, `:2036` and `changarrito/index.html:20,395,422,424`; the neighbour-as-wall at `engine/engine.js:57,73,104,109-117,311`; and the landscape arithmetic at `index.html:46,56,65,69` + `changarrito/index.html:45,68`. I edited no tracked file; nothing was written anywhere except this reply.

## 2 · POST-MORTEM ENTRIES

*(For `docs/POSTMORTEM.md` §13, appended after 13b, in the register's voice. Section 13's preamble names Lupe's empty bay as one of the day's outstanding mistakes, so these fill the slot it reserves.)*

---

### 13c · I measured twenty-eight rows on a canvas in an empty room — and it recurred from §9 at nine times the cost (Lupe)

**What was believed.** The town was on screen, so `getImageData` on `#cv` measured what a player sees. Twenty-eight rows of sash pixels came back real, consistent, and correctly different between a claimed person and an unclaimed one. I reported them.

**What was true.** The town boots to the character creator (`changarrito/index.html:395`). `#world` carries `hidden` (`:422`), `#vp` lives inside it (`:424`), and `[hidden]{display:none!important}` (`:20`) — so `#vp.clientWidth` is **0**. Only `cv.style.height` is derived from that width (`engine/engine.js:636`); the backing buffer is `cv.width=VW*scale` from constants (`:614`, `:637`), and `draw()` (`:2036`) fills it every frame whether or not the element has a layout box. Every number was a true fact about a buffer no human eye could reach. **A canvas draws in an empty room.**

**What it cost.** Twenty-eight rows measured, reported as passes, and re-run from scratch — **three hours** before a screenshot showed the front door instead of the street. **This is §9's sixth row happening again** ("a screenshot harness shot the title screen for four cameras because the game had never been started — twenty minutes"). Identical fault, one difference that is the whole lesson: **that one was looked at, so it confessed in twenty minutes; this one was only measured, so it hid for three hours and produced a clean report.** Nine times the cost for taking a number instead of a picture.

> **The rule: before the first number, take one picture and prove the thing you are about to measure is on a screen — `clientWidth`/`clientHeight` non-zero, and the shot showing the world and not the front door.** A green measurement of an unmounted element is indistinguishable from a green measurement, and `getImageData` will never tell you which one you have.

---

### 13d · "All seven suites green" was one run each, and one of them is red one run in twenty-five (Lupe)

**What was believed.** The day's board was green; `docs/NEXT-SESSION.md:12` states it of the whole branch.

**What was true.** `test/smoke.js` fails about **one run in twenty-five**, and the cause is in the game, not the suite. A person occupies the grid as `"N"` — stamped at boot (`engine/engine.js:57`) and re-stamped on every wander step (`:104`, cleared at `:102`). Both `isSolid` (`:73`) and `auditReach`'s `walk` (`:311`) reject an `"N"` tile. The wander filter (`:109-117`) asks about solidity, doors and tram danger and **never asks whether the step it is about to take cuts the map in two**. When a neighbour lands in the one-tile gap by the barbería at `ex` (19,1), 35 tiles go out of reach and Doña Meche with them — for the audit **and for the player**, who gets no flavour bump and no way round. It reads like a flaky test and it is a player-facing bug.

**What it cost.** The fault is older than this branch and has been shipping. Everyone who ran the suite that day, me included until I ran it repeatedly, sampled it **once**: against a 1-in-25 fault, a single run prints green **96%** of the time, so the green cost nothing to obtain and was worth nothing. It also sits 53 lines above its own contradiction in the same state-of-play block (`docs/NEXT-SESSION.md:12` vs `:65-67`), which is how the next session inherits a board it believes.

**And it corrects a rule in this file.** §7 says *"a flake is a state leak until proved otherwise"*, and that heuristic sent me hunting a leaked global for the first pass. There is none. The randomness is in the **world** — `Math.random()` in the wander at `engine/engine.js:105` — not in the suite's bookkeeping.

> **The rule: a suite result is a sample, not a state. Report green with the number of runs attached — "green on one run" — and treat an intermittent red as a bug about the game until you have shown it is a bug about the test.** §7 stands, with a second candidate ahead of the state leak: **a world with a random mover in it is its own fuzzer, and it is finding real faults.**

---

### 13e · I wrote the landscape row into my own list, and then nothing in the repository could run it (Lupe)

**What was believed.** `docs/QA-PASS.md`'s matrix has five rows and my pass runs all five; the bottom of that page already records that landscape is unscripted, so it is counted.

**What was true.** **No suite in this repository has ever set a landscape viewport.** Every one is portrait or square: `test/smoke.js:54` (480×900), `:82` (390×560), `:107`, `:2160`; `test/engine.smoke.js:21`, `:487`, `:663` (390×844), `:1301`; `test/town.smoke.js:29` — one size, portrait, for the whole town. And the unrun row was hiding a live fault in **both** games: `.wrap{max-width:560px}` (`index.html:46`, `changarrito/index.html:45`) holds `#vp` at ~528 px in any window wider than 560; the world's height is its width × 8/10 (`engine/engine.js:614,636`) ≈ 422 px; and the joystick and d-pad are anchored to the **viewport's** bottom, not the window's (`index.html:65,69`, `changarrito/index.html:68`). In an 844 × 390 window the controls sit **100–120 px below the fold in both games** until you scroll or go fullscreen.

**What it cost.** The row has been words since 2026-09-09 — **four days** in which "tested at both sizes", said in good faith by several people, meant two portrait widths. The fault is on `main` in both games today, it is the first thing a person meets when they turn a phone sideways, and it was found by a person opening a window, not by anything that runs. A known gap written at the bottom of a page is not a counted gap; it is a gap that the table above it silently claims is covered.

> **The rule: a row of a checklist that no script can run is a row that gets skipped. Put "who runs it" in the same table as the row — and if the answer is "a person, by hand", the row reads as a gap every time anyone looks at the list, not only when they reach the footnotes.**

## 3 · DOCUMENTS TO UPDATE

**A · `docs/QA-PASS.md` — the matrix gets a "Who runs it" column (lesson 13e).** Replace the table at lines 17-23 with:

```
| Row | Viewport | Who runs it | Why this one |
|---|---|---|---|
| Phone portrait | 390 × 844 | `test/engine.smoke.js:663` | The owner's actual device; where reach and text size fail |
| Phone landscape | 844 × 390 | **nobody — by hand** | A short frame — where an anchored bar eats the world. **No suite in this repo has ever set a landscape viewport** |
| Small window | 480 × 900 | all three suites | What the suites already use; keeps parity with CI |
| Desktop | 1280 × 800 | **nobody — by hand** | Where the world is widest and the camera shows most |
| **Fullscreen** | the element gets the screen's shape | **nobody — by hand** | **The one that has actually escaped** |
```

**B · `docs/QA-PASS.md` — a step 0 (lesson 13c).** Insert above current line 30, before "1. Make the old code fail first":

```
0. **Prove you are in the game before you measure it.** One screenshot, first, showing the thing
   you are about to measure on a screen — and `#vp.clientWidth > 0`. A canvas draws in an empty
   room: the backing buffer is sized from constants (`engine/engine.js:614`) and `draw()`
   (`:2036`) fills it whether or not the element has a layout box, so `getImageData` returns
   real, correct, meaningless pixels of a world nobody can see. `test/shots.js` already knows how
   to start the game (`test/shots.js:50` takes `#vp`). Copy it.
```

**C · `docs/QA-PASS.md` — step 2 says how many runs, and names the gauge (lesson 13d).** Replace line 38 (`One engine, two games: a pass on one is half a pass.`) with:

```
   ```
   node test/gauge.js
   ```
   One engine, two games: a pass on one is half a pass. **And say how many runs your green is.**
   `test/smoke.js` fails about one run in twenty-five on a real game bug (see E11); a single run
   of it prints green 96% of the time. When green is your evidence that something ships, run the
   suite the change touches at least five times and write the count next to the word "green".
```

**D · `docs/QA-PASS.md` — two new register entries, inserted after line 234 (end of E9) and before "## Known gaps in the list".** They follow E4's and E8's precedent — a near-miss and a tester's own mistake — and that precedent is stated so the next agent does not read this as licence to invent rows:

```
### E10 · Twenty-eight measurements of a canvas nobody could see — 2026-09-13 (mine, a near-miss)
**What happened.** Measuring the claim mark in the town, I read 28 rows of pixels out of `#cv` and
reported them as passes. `#world` carries `hidden` (`changarrito/index.html:422`), `#vp` is inside
it (`:424`), `[hidden]{display:none!important}` (`:20`) — the town boots to its creator panel
(`:395`) and `#vp` was `0 × 0`. `sizeCanvas` derives only `cv.style.height` from that width
(`engine/engine.js:636`); the buffer is `VW × VH` from constants (`:614`, `:637`) and `draw()`
(`:2036`) fills it regardless. Every number was true and about nothing.
**Which row would have caught it:** none. **No viewport catches this** — that is the point. It would
have passed at all five.
**What caught it:** a screenshot, three hours later.
**What the list is now:** step 0 — prove you are in the game before you measure it.
**The general lesson:** E2 says a test can pin a bug. This is one turn worse: a measurement can be
perfectly accurate about an element that is not on the screen, and nothing in the number says so.

### E11 · A one-in-twenty-five red that was a game bug, not a flaky test — 2026-09-13 (found, not fixed)
**What escaped:** `test/smoke.js` goes red roughly one run in twenty-five, and had been for longer
than the branch that found it. A person occupies the grid as `"N"` (`engine/engine.js:57`, re-stamped
on each wander step at `:104`); `isSolid` (`:73`) and `auditReach`'s `walk` (`:311`) both refuse an
`"N"` tile; the wander filter (`:109-117`) checks solidity, doors and tram danger and never asks
whether the step walls anybody off. A neighbour in the one-tile gap by the barbería at `ex` (19,1)
puts 35 tiles and Doña Meche out of reach **of the player as well as the audit**. Repro: occupy (19,1).
**Which row would have caught it:** none — it is not a viewport problem, it is a sample-size problem.
**What the list is now:** step 2 — say how many runs your green is, and treat an intermittent red as
a bug about the game until you have shown it is a bug about the test.
**The general lesson:** a suite is a sample, not a state. And POSTMORTEM §7's "a flake is a state leak
until proved otherwise" has a second candidate now: **a world with a random mover is its own fuzzer.**
```

**E · `docs/REGRESSION.md` — row 17 of the proxy table (lesson 13c).** Append after line 64:

```
| 17 | **the claim-mark pixel probe (mine, 2026-09-13)** | what pixels are in the canvas's **backing buffer** | **what a person sees on a screen** — the town boots to its creator with `#world` hidden, so `#vp` was `0 × 0`; the buffer is sized from constants and `draw()` fills it with no layout box, so 28 rows returned real, correct, meaningless pixels and every one "passed" | taking a screenshot, three hours in |
```

And amend the sentence at line 75 (`That is now five times, and the count is the point:`) to read **"That is now five times in one session and seventeen in the register, and the count is the point:"**, so the number in the prose keeps up with the table.

**F · `docs/BACKLOG.md` — a new row, appended after line 225 (lesson 13d).** Row 8 covers `auditReach` not re-running after a *spawn*; this is the wander, which is every second of play:

```
| 10 | **A wandering neighbour is a wall, and nothing re-audits after a wander step** | small | `engine.js:104` stamps `"N"` where a person stands; `:73` and `:311` both refuse an `"N"` tile; the wander filter `:109-117` never asks whether the step cuts the map in two. In `ex`, a neighbour in the one-tile gap at (19,1) puts 35 tiles and Doña Meche out of reach of the player. Reds `test/smoke.js` about one run in twenty-five. Either the gap is widened in the map, or the filter asks `auditReach` before it steps |
```

**G · `docs/NEXT-SESSION.md:12` — a finding, not a question (lesson 13d).** Line 12 says *"all seven suites and `test/leaves.js` are green on it"*; lines 65-67 of the same block say `test/smoke.js` is red one run in twenty-five. Both are true — one run each was taken — and the resolution is in the wording, not in either fact. Replace *"all seven suites and `test/leaves.js` are green on it"* with *"all seven suites and `test/leaves.js` were green on one run each — and see 'Found, not fixed' below: `test/smoke.js` is red about one run in twenty-five on a fault older than this branch."*

**H · `.claude/skills/crew-fix/SKILL.md` — step 5½ (lesson 13c).** The skill already asks every change for a planted violation. Add one sentence to that step: **"If your evidence is a number taken off a page, the plant is not enough — take the screenshot too, and check the element you measured had a non-zero box. A measurement of an unmounted element is green and true and about nothing (`docs/POSTMORTEM.md` §13c)."** *(I did not open `SKILL.md` this run — see below — so whoever applies this should place it under the existing 5½ heading rather than trusting my description of it.)*

## 4 · WHAT I DID NOT CHECK

- **I did not re-run any suite today.** The 1-in-25 figure, the twenty-eight rows, the three hours and the seven sizes are from my own run earlier today as recorded in `docs/crew/FLIGHT-NOTES.md:260-284`; the *mechanisms* behind all three are verified against the code at the lines cited above, but the frequencies are not re-measured in this session.
- **The 100–120 px is not re-measured either.** I re-derived it arithmetically (560 max-width → ~528 px `#vp` → ~422 px world, controls anchored to the viewport's bottom, 390 px window) and it agrees, but no browser was opened in this session.
- **I did not open `.claude/skills/crew-fix/SKILL.md`**, so proposal H names a step I have not read this run.
- **I did not verify a thing I noticed in passing:** `engine/engine.js:102` restores a vacated tile to `"."`, while `:175` and `:5343` restore `w.rows[y][x]` — the glyph the map actually had. Whether a wanderer can erase a non-solid special glyph from the grid by walking over it is **unverified**; `:2156` falls back to `rows` and `:1353` degrades harmlessly, but `:292` and `:740` read `grid` directly. It is a noticed inconsistency, not a claimed bug.
- **I did not check whether the landscape fault predates the crew branch in `git log`** — only that it is present on the current tree in both shells.

## POST-FLIGHT

Three entries, all three mine, and the one I would keep is 13c because it is the only failure mode on my list that no row of my own matrix can catch — every viewport would have passed it. The other two are the same shape seen from opposite ends: a list that claims coverage it does not have (13e) and a run that claims a state it only sampled (13d), and both were fixed in the documents by writing the number next to the word. I have proposed no change to any test, any code, or any persona file, and the doc edits above are exact text for whoever holds the pen. No persona edit this round.
