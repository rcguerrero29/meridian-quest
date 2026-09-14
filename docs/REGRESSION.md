# The regression map — what the suites hold, what they missed, what to add

*Opened 2026-09-05 at the owner's ask: "lorenzo is floating my friend lol some regression
tests are missing. make sure regression tests are updated for meridian quest original and for
templates." This file is the map: every suite, what it holds, what the last five days' findings
should have been caught by, and the assertions to add. Nothing here is built.*

## 1 · The suites today

| Suite | Runs where | Holds |
|---|---|---|
| `test/smoke.js` — Meridian | CI, every push and PR | ~40 sections: boot with no errors or validator warnings; static invariants; the retry/XP flow; chapters and endings; hearts as a layer; WCAG contrast on every theme; the theme editor; the NET stub; the care pack and the decision report; hostile save payloads; the Trolley Pass round-trip; TILES metadata and Sonny's program; the park (leash → bridge → chill → recap); screen-relative swipes; door plausibility and cooldown; 3D doors and wall faces; bake resolution; seasons; furniture per camera; the button priority; fences in 3D; door markers; per-district endings; looks keyed by id; the whole city raised; the record's growth; multi-storefront; the room upstairs and its off switch; the version on the opening page; the camera round-trip; **the portability guard**; the owner's 2026-09-03 reports; **the public build's guarantee** (Part 1) |
| `test/town.smoke.js` — El Changarrito | CI, after Meridian's | the town's index is a known diff of the public one; own prefix; own name and the engine's version (the value, since 2026-09-13); the park, the faces, the clerk with her document, the board; the record's fixture: people by tier, plain words, the three-line cycle, per-label stands, leaving and restoring the tile, **a claimed person wearing the mark and the house board saying who has what**; Sonny; the animals' tiles walkable. **And the crew-process guards, because the crew lives in the town:** the mural ledger, the flight-notes ledger, **the nineteen personas' shared block (first, once, one person, identical, names the post-mortem and this register)**, and `test/leaves.js`'s soundness half — a persona file fault reports under this step's name, so its sentence starts with the path |
| `test/leaves.js` | in `town.smoke.js` (soundness + completeness), by hand with a base ref (routing). **Its eighteen red cases (`--selftest`) run NOWHERE** — not CI, not `town.smoke.js`; same for `test/closes.js --selftest` | `docs/BOUNDARY.md` is sound — every path real, every reviewer a persona, every row dated, **no persona citing a PATH that was never written** (it calls `fs.existsSync` on the path only — **the line number inside a citation is not read**, and three in `.claude/agents/pili.md` are 400+ lines stale), no workflow a label or a comment can start, every derivable edge covered by a row. With a base: which boundary paths a change touches and who must see it, exit 0 always |
| `test/engine.smoke.js --index <shell>` | CI, against **both** indexes (`ci.yml`, step *"Engine smoke, against both games"*); by hand | R4 — the engine's own invariants against either game: the worlds hang together, every person reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, storage under the pack's prefix |
| `test/gauge.js` | CI | the smallest thing that can be a world, run against the shared suite — what the engine demands of a brand-new pack, measured by building one (`docs/GAUGE.md`) |
| `test/public.js <dir>` | CI on every push and PR, against a box built by `scripts/build-site.sh`, **and again in the deploy after `status.json` is written into it** (`pages.yml`) | R10 — what we would publish is only the public game |
| `test/closes.js` | CI, **pull requests only**; `--selftest` by hand and by nothing else | R3 — every `Closes #N` names an open issue the PR actually talks about |
| `test/bump.js <base> [head]` | CI on a pull request **and on a push** (added 2026-09-12 because most of this repo's history never saw a PR); by hand on the desk | an engine change that never reaches a returning player is not shipped — `GAMEV` and `CACHE` must have **moved**, not merely match |
| `test/record.js _site/status.json` | **`pages.yml` only — after the merge, on `main`** | the city record is what a clerk can read (#14). A check that runs only in the deploy cannot stop the commit that breaks it |
| `docs/templates/build-branded.js --check` | CI | the branded copies of the docs templates match the neutral ones plus `brand.yml` |
| `test/shots.js` (`--cams`, `--index`, `--spots`) | **nobody** — by hand | four-camera screenshots of named spots; the only pixel-level look at the game |
| `test/tilesheet.js` | by hand | the cold read of every glyph |

**No suite in this repository runs either game in a landscape viewport** (checked 2026-09-13): every
run is 480×900, 390×560 or 390×844. `docs/QA-PASS.md`'s matrix has had a landscape row since
2026-09-09 and nothing can run it — see `docs/POSTMORTEM.md` §13o and QA-PASS E12.

## 2 · What the last five days found, and what should have caught it

| Finding | Found by | Should have been caught by |
|---|---|---|
| Lorenzo floats in the town (10.1) | the owner, walking | **R1** — an animal's tile carries its perch; no pinned animal in an undeclared world |
| twenty literal storage keys (#26) | the engineering review | the guarantee (now holds it) |
| the SW caches non-ok responses (#28) | the engineering review | the guarantee (now holds it, on the source) |
| `innerHTML` with pack text (#27) | the security review | the guarantee (now holds it) |
| `PEERS` not drawn in iso (#32) | the engineering review | **R2** — every actor kind is drawn by every camera (the camera loop already exists for tiles: `shots.js --cams`; nothing asserts it for actors) |
| the mercado "never played" (docs) | reading `IDEAS.md` | not a test — a ledger rule, now in `CLAUDE.md` |
| a stale F row, a wrong "Closes #" | reading | **R3** — a PR's "Closes" list is checked against the issues it names (a CI step that reads the PR body) |

## 3 · The gaps, each with its assertion and cost

> **The rule R10 was bought with, and it costs nothing to apply everywhere:** *a guard has to read
> the noun it actually means.* **None of the instances below was discovered by review. Every one was
> discovered by planting a real violation and watching it pass.** So: for every assertion in this
> file, plant one before you believe it.

### The register of guards that read a proxy — the table is the count, and it keeps growing

*Opened 2026-09-11, because by then it had happened eight times in five days and the pattern was
costing more than any individual bug in it. **This is the most expensive recurring mistake in this
repository.** It is not carelessness: every one of these was written deliberately, by somebody
trying to close a real hole, and every one looked correct on the page.*

| # | The guard | It asked | It meant | Found by |
|---|---|---|---|---|
| 1 | R8, the exposure scan | what `index.html` loads | **what we publish** | the town being on the public internet |
| 2 | the mutant-marker net | the source with comments stripped | **every line** — and a marker *is* a comment | planting a marker |
| 3 | the version test | are these two strings **equal** | did one **move** | planting an unbumped engine change |
| 4 | the portability guard (TAGS L20) | is the pack's **brand** in the engine | is the pack's **glyph** in the engine — `Y` appears five times, three lines below a comment saying exactly this | Toño's gap analysis |
| 5 | the look check | did a look **come back** | is the look **hers** — two npcs resolved to one object for four days | Pili, counting letters by hand |
| 6 | `validateWorlds`' spawn check | is this tile **solid** | is it **safe to appear here** — it passed four arrivals standing on live tram rails, every boot | Beto, walking out of the bakery door |
| 7 | both suites' boot-warning filters | `/^(WORLD\|PORTAL\|REACH\|ROOM)/` | `"CRIT " + **lowercase** kind + ":"` — **zero characters matched, ever**, so #6 could not have been heard even if it had fired | planting a spawn-in-a-wall |
| 8 | `.gitignore` | `shots/` | **any scratch directory** — `shots.tmp/` walked past it | the stop hook |
| 9 | the tram's ground check | does the **bounding box** reach the road | do the **wheels** — it returns 0.0000 with all four wheels deleted, because the skirt satisfies it | Chema, asking the scene graph |
| 10 | the fauna guard's **first draft** | is **any** critter in that world | is **this animal** one the tram stops for — it went green because the hummingbird is on the same street | the session, one commit later |
| 11 | **`test/bump.js`, the version guard itself** | what the **commits** changed (`git diff base...HEAD`) | **what is about to ship** — so every run on somebody's desk, which is where a person actually runs it, was decorative. Planted an engine change with the CACHE string reverted, sitting in the working tree, and it printed *"this change touches nothing the offline app has already cached"* | the session, planting at it on the way past |
| 11½ | **the CI step that runs #11** | *(it ran at all)* | **it carried `if: github.event_name == 'pull_request'`, so a push ran the whole suite and skipped this check entirely** — and this repository's history is mostly direct commits. Yaz went looking for the damage and found none: ten engine-touching commits since the guard was written and all ten moved `CACHE`, **by hand, because somebody remembered**. The board was green because people remembered, which is exactly why the green was worth nothing | Yaz, refusing to relay a finding she had not re-run |
| 12 | **the ride guard, first draft (mine, same day)** | does `rideStart()` work | does **picking a destination in the pass** give you a ride — it called `rideStart()` directly, so cutting the pass's own wiring out of `openTravel()` left it green | planting the cut |
| 13 | **the window-sill guard, first draft (mine, one hour after writing up 11 and 12)** | the shape of `SEASONS` in one config file | **what the engine thinks is on a sill** — `props` is nested under `art` in this pack, so the lookup found nothing, took an early return and went green against THREE planted violations, including *"there is no sill at all"*, which is the state that had shipped through four owner reports | planting them |
| 13½ | **its second and third drafts, also mine** | is another OBJECT in the way (a raycast, then a per-tile probe) | **do the pixels arrive** — both were correct about the scene graph and both went green against the real bug, because the occluder is not an object: a sprite is a billboard that turns to face the camera, the camera looks down at the street, so the lower half of a tall billboard tilts back INTO the wall it hangs on. Only reading the framebuffer could answer it | planting the real bug twice and watching two clever checks pass |
| 14 | **the flight-notes ledger guard, first draft** (2026-09-11) | how many `### <agent>` headings the file has | **how many proposals it has** — every heading in that file is the anonymised literal `### (agent)`, so it counted zero and went green on a file with three un-actioned proposals in it. Reading the `**Proposed persona edit**` heading the template guarantees turned it red | Rosa, finding her own un-actioned proposal; then the guard, once it read the noun |
| 15 | **the town's version check** (`test/town.smoke.js`, until 2026-09-13) | does the title screen match `/engine mq-v/` | **is it the engine that is running** — bump Meridian to `mq-v159` and the town keeps claiming `mq-v158` with every suite green. A shape is not a value; #3's mistake inverted. Reads the value now | Yaz, costing a town-only version bump |
| 16 | **the hostile-save test's `protoClean` assertion** (`test/smoke.js`, still open) | is `Object.prototype` unpolluted after the payload | **does the prototype clause in `sanitizeSave` hold** — the payload puts `__proto__` in `qa`, which numeric coercion filters anyway, and carries no `bl` key at all, which is the loop the clause guards. It asserts that a pollution nobody attempted did not occur. The three-line plant is `docs/BOUNDARY.md` G2 | Zeni, reading the extraction step |
| 17 | **the shared-block check the calling session ran by hand** (2026-09-13; ad-hoc, never a committed guard) | are the nineteen **extracted** blocks byte-identical | **is each persona one person, with that block first and once** — they *were* identical, and `.claude/agents/rigo.md` also held a second copy at line 84 with Toño's whole persona under it, while `don-guero.md` opened with a section above it. **The extraction discarded position before the comparison began**, so the answer was true and the published claim was not the question | Beto, extracting the same block to design a guard on it; Chuy, independently, reading a file to its end for a roster line |
| 18 | **the personas guard, first draft** (`test/town.smoke.js`, written the morning of 2026-09-13, beaten that afternoon) | how many `You are **…**` lines the file has | **which person it hands the model** — `You are **Toño**` in `rigo.md` is a count of one and it passed: the exact fault the guard had been written for that morning, one keystroke to the left. Reads the name now (grep `the person it hands the model is somebody else`) | Melo, a one-word replacement |
| 19 | **(the same guard)** | is the shared block **byte-identical across all nineteen** | **does it still say the things it was bought with** — the four paid-for rules and *ASK HIM* deleted from all nineteen at once hashes identical and the suite printed OK. #3 across copies instead of across time: *equal* says nothing about *right*. Eight spine strings are pinned by content now (grep `the post-mortem — .claude/skills`) | Melo, editing nineteen files |
| 20 | **`test/leaves.js`'s permissions check, first draft** (2026-09-13) | is there a line `  <scope>: write` under `permissions:` | **what may this token write** — `permissions: write-all` has no indent and no scope name and passed; so did `contents: write   # to push the release tag` (a trailing comment after an end-anchored pattern) and the inline `{contents: write}` | Melo, three legal spellings |
| 21 | **(the same script) the trigger check** (2026-09-13) | does a line begin `on:` | **what can start this workflow** — yamllint's truthy rule teaches people to write `"on":`, so `/^on:/` matched nothing, the scan ran over the empty string, and the check **printed its pass sentence about a file it had failed to parse**. Not finding the key is a red, not a pass | Melo, one quoted key |
| 22 | **`test/leaves.js`'s ledger check, first draft** (2026-09-13) | are the rows it has **sound** — paths real, reviewers real, dated | **does every edge have a row** — delete the row for the file that holds the owner's key and it printed OK; add a script that POSTs to `api.github.com` with a bearer and it printed OK. `docs/BOUNDARY.md` called what it read *completeness*. `completeness()` derives three sets now (grep `function completeness`) | Melo; written up by Zeni, `docs/POSTMORTEM.md` §13b |
| 23 | **the claim-mark pixel probe** (Lupe, 2026-09-13; a measurement, not a committed guard) | what pixels are in the canvas's **backing buffer** | **what a person sees on a screen** — the town boots to its creator with `#world` hidden, so `#vp` was `0 × 0`; the buffer is sized from constants and `draw()` fills it with no layout box, so twenty-eight rows returned real, correct, meaningless pixels and every one "passed" | a screenshot, three hours in |
| 24 | **the wall's "one painter, one stretch" check** (`test/town.smoke.js`, 2026-09-13) | do the panels `murPainter` groups together sit in one bay | **is each person one bay** — both sides of its comparison are `murPainter`, so when that function named Doña Cuca "Cuca" and Don Güero "Don-guero" (an agent's `by` has no honorific, accent or hyphen) each got a second bay and the check was green; the first repair compared `by` to the whole of `who` and split "Melo Garduño" from "Melo" instead, and the first draft of the new guard compared whole names and missed that too. The key is a first name now (`murKey`), and a second guard folds every bay's *name* to one and insists no two agree | the calling session, three plants in a lab copy, 2026-09-14 |

**#11 is the one to read twice.** It is the guard for the rule `CLAUDE.md` states in its own words —
*bump `GAMEV` and `CACHE` together whenever `engine/` changes* — and it could not see an unbumped
engine change in the working tree it was being asked about. It compared two commits, and the moment
anybody actually runs it is **before** the commit. It had been green for every change this repository
has shipped since it was written.

**#12 was written by the session writing the entry for #11, one hour later. #13 and #13½ were written
by the same session, in the same hour, in the guard FOR the bug it was fixing — and #13½ happened
TWICE, two different clever checks, both correct about the scene graph and both green against the
real fault.** That is now five times in one session — **and twenty-three rows in the table above**, a
number the prose is kept level with on purpose (Lupe, 2026-09-13) — and the count is the point:
knowing about the mistake, writing the register entry for the mistake, and making the mistake are not
mutually exclusive activities.

**#13½ is the one to keep, because it is the only entry here where the proxy was more sophisticated
than the noun.** A raycast through the scene is a better piece of engineering than counting pale
pixels in a framebuffer. It is also the wrong question. *"Hidden" is a fact about pixels* — it is the
owner's own word, he used it three times across four days, and no check in this repository read it
until one did the obvious stupid thing and looked at the screen.

**Two of those are guards written by the session that had just found the first eight** (#10, and #14 —
the mural-ledger guard that split on `### <agent>` headings when every heading in that file is the
anonymised literal `### (agent)`, so it went green on a file with three un-actioned proposals in it).
**Knowing about the mistake does not stop you making it.** That is the single most useful line in
this register.

**What they have in common, stated so it can be checked against a new guard before it lands:**

1. **The proxy is always cheaper to read than the thing.** A filename, a string equality, a bounding
   box, a membership test. The correct noun usually needs a behaviour to be exercised.
2. **The proxy is usually correct *today*.** #4 named the right brand; #9's box really did reach the
   road. They fail when the world grows a second case.
3. **A green guard is not evidence.** Eight of these ran green for days or weeks. **The only thing
   that distinguishes a working guard from a decorative one is a planted violation** — which is why
   `melo` exists and why step 5½ of `/crew-fix` asks it of every change.
4. **The extraction step is a proxy before the comparison is** (added 2026-09-13, from #17 and #19).
   The hash that compared nineteen persona blocks was correct; what it hashed had already been lifted
   out of the file, so position, count and neighbours were gone before anything was compared. **Ask
   what your check normalised away to make the comparison easy** — a hash throws away position, a sort
   throws away order, a trim throws away the blank line that separated two people. The committed guard
   survives only because three **shape** assertions run before the hash: how many copies, who the file
   hands the model, and what is read first.
5. **A red guard is not evidence either** (added 2026-09-13). `test/leaves.js`' first run named five
   persona citations of files that did not exist; **two were invented by its own pattern**, because a
   regex alternation takes the first branch that matches and it listed `.js` before `.json`. The remedy
   those two names prescribed was *edit two files that were already correct*. **Point a new guard at one
   case whose answer you already know before you carry its output anywhere — red or green.**

**Rows 17–23 were all added on 2026-09-13, and five of them were guards written that morning and
walked past that afternoon**, by the agent whose only job is walking past them; fourteen other plants
that day were locked out by guards that said something a person would say. All five are closed and each
fix carries the plant that bought it in a comment. **Four of the five read an aggregate — a count, a
hash, a shape — where the noun was an identity or a content.** That is the shape to look for first in a
new guard, and the morning-to-afternoon gap is the shortest this register has recorded: **a guard's most
dangerous hour is the one right after it first goes green.**

**One suspicion filed here as prose and deliberately NOT as a row, because nobody planted at it.** Pili,
2026-09-13: the claim guard (`test/town.smoke.js`, grep `the hard hat is the mark`) has a failure
sentence about the claimed person's **outline** and an assertion that reads `lk.hat !== 'hard'` — a
string in a look object. Blanking the hard-hat drawing branch, or drawing the hat inside the skull the
way the other caps are clipped, would leave the field `"hard"` and the silhouette identical to
everybody else's. **That reasoning is from the extraction step, not from a fired plant. Plant it before
you believe it — and if it fires, that is the finding and this paragraph is wrong.**

**The question to ask of any new guard, before it lands:** *if I break the thing this is for, in the
smallest and most plausible way, does it print a sentence a person would say?* If you have not run
that, the guard is untested no matter how green the suite is.

**And the question under it, bought on 2026-09-13:** *what does this guard print when it cannot read its
subject at all?* #21 answered that with its pass sentence — a positive claim about triggers, about a
file it had just failed to parse. **Not finding the thing is a RED. Silence about a file you failed to
parse is a claim you did not check.**

### The five guards added after the register was opened, and the eight violations planted at them

*2026-09-11, `mq-v149` — the critters-keep-off-the-rails rule and the tram that waits at its stop.
Listed here rather than in the table above because **none of them is in the table**: each was written,
then broken on purpose in a copy outside the repository, and each printed a sentence a person would
say. That is the whole procedure and it takes about ten minutes.*

| Guard | What was planted at it | What it printed |
|---|---|---|
| every critter clears the rails in time | the rule's one call site disabled | *"the colibri never leaves the trolley line in st — standing on the rails while the tram comes, waiting for the tram to stop instead of getting out of the way"* |
| (same) | the escape step turned to run **along** the line instead of across it | the same sentence — a pigeon correctly fleeing down the rails for ever is indistinguishable from one that never moved |
| (same) | the shy radius dropped **below** the brake's | the same sentence, by deadlock: the tram stops before it is frightening, so nothing is ever frightened |
| `TRO_SHY > TRO_LOOK` | `TRO_SHY=2` | *"…the car and the critter stand in the street looking at each other for ever"* |
| a **cornered** critter still stops the tram | the brake's critter clause disabled | *"a butterfly, walled in on the trolley line in st, cannot get off it and the tram drives straight through — getting out of the way has quietly become being ignored"* |
| the tram waits at its stop | the dwell never fires | *"the trolley runs straight past its own stop in st with somebody standing on it: you call it, it comes, and it does not stop for you"* |
| …and the waiting **ends** | the dwell budget removed | *"…stands at the stop for 9900 ms and shows no sign of leaving — one person on a platform can park the line for ever"* |
| …and it does not wait for an **empty** platform | the "is anyone near" test removed | *"…stands at the stop for 3200 ms with nobody anywhere near it — it is not waiting for a passenger, it is just slow"* |

**Two of the eight are the interesting ones and neither was on the list when the guards were written.**
The *along-the-line* plant and the *radii-reversed* plant both produce the identical failure sentence
as simply deleting the rule — three completely different mistakes, one symptom. A guard that had
asked *"did the critter move?"* would have gone green for two of the three. It asks *"was the line
clear before the brake had to fire?"*, which is the noun, and that is the only reason it survives all
three. **The proxy version of this guard was one word away and the word was "move".**

The third guard in that list — the cornered one — is the register's own lesson turned into a test.
This branch had already lost a pigeon to *getting out of the way* quietly becoming *being ignored*,
by species. The rule that keeps critters off the rails is exactly the pressure that makes the brake
look like dead code, so the brake now has a test that fails without it.


| # | Gap | Assertion to add | Where | Cost |
|---|---|---|---|---|
| ~~**R1**~~ **built 2026-09-06 (mq-v68)** — the `ANIMALS` seam; both suites assert something under every animal, Meridian's defaults byte-identical | pinned animals have no test that the tile under them carries what they need, and appear in any world with the right id | for every animal the engine draws: the world's pack declared it (or the engine's pin is opt-in), and the drawn foot height equals the declared `lift` of its tile, in all four cameras. **Red first on the town** | `smoke.js` + `town.smoke.js` | a quarter sitting, after the engine change in §10.1 |
| **R2** | actors (people, animals, peers) are asserted per camera only for tiles and doors | count the draw calls per actor kind per camera (the pattern `mq-v64` used for tiles: "smoke now counts which drawing each camera calls") | `smoke.js` | a quarter |
| ~~**R3**~~ **built 2026-09-06** — `test/closes.js`, a CI step on every pull request; `--selftest` holds the 2026-09-05 mistake and seven more cases | a PR can close the wrong issue | a CI step: every `#N` after "Closes" in the PR body is an open issue whose title appears in the PR body or the diff | `ci.yml` | minutes |
| ~~**R4**~~ **built 2026-09-06** — `test/engine.smoke.js --index <shell>`, run in CI against both indexes: the worlds hang together, every person reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, storage under the prefix | the engine smoke was never split from Meridian's (NEW-WORLD §3) — the town got its own suite instead of a shared one, so engine invariants are asserted once, against Meridian only | `test/engine.smoke.js` — the portability guard, the guarantee, the four cameras, stand tiles, the light ladder, the reader's geometry, reachability, discoverability — run against **both** indexes | new file; `ci.yml` | one sitting |
| ~~**R5**~~ **built 2026-09-06** — every `doc:` a quest hands over exists, builds, and names a template file; EN and ES hand over the same set | the generated templates (06 the taller's, 07 Nolasco's) are checked for brand only; nothing checks that the quest that hands one over still names it | for each `doc:"id"` in the quests, `DOCS[id]` exists, builds, and its `tmpl` matches a file in `docs/templates/` | `smoke.js` | minutes |
| ~~**R9**~~ **found and built 2026-09-06 (mq-v69)** — the town smoke renders the street in 3D and counts the counter, the back wall and the roof strip on her tile; `winAt()` answers null one tile in front | a person's station was asserted by coordinates only: la ventanilla "at (9,0)" passed while every camera drew a hole in city hall where her map letter had been (the owner: *"how did this pass a test for a teller?"*). Placement is not a picture | for every station a pack marks `win`, the 3D scene holds the wall's three pieces at that tile and no full box; the 2D pass draws the wall's face under her and a counter over her legs | `town.smoke.js` | done |
| **R6** | the town's index is held to a line count | a diff assertion: the town index equals the public one under a fixed set of allowed substitutions (CSP line, title, script paths, no SW, no manifest) and nothing else | `town.smoke.js` | a quarter |
| **R7** | four-camera pixels are looked at by nobody | `shots.js --cams` in CI, uploading the PNGs as an artifact; a "looked at" step is still a person. Optional: a per-spot pixel-hash baseline that fails on drift | `ci.yml` | a quarter; the baseline is a sitting |
| ~~**R8**~~ **built 2026-09-06 — and its mechanism caused R10. See below.** — the shell is derived from the public index's script tags | the guarantee scans `content/` for Meridian only; a second public pack would go unscanned | scan every pack folder the public index loads, derived from the script tags, not a hardcoded list | `smoke.js` | minutes |
| **R10** — **built 2026-09-10, `test/public.js`, wired into `pages.yml`** | **El Changarrito — the owner's private backlog tool, carrying a GitHub sign-in, a "make a new token" flow and calls to `api.github.com` — was published on GitHub Pages and reachable at `/changarrito/` by anyone who guessed the path.** The deploy used a *denylist* of three names and shipped the whole repository. **R8 was built to close this exact class and could not see it**, because "derive the shell from the index's script tags" is blind to anything the index does not load. The fix for the last exposure was the cause of this one | **Do not derive. Read the directory we are about to upload and ask what is in it.** Five sections, each proved by planting a real violation: nothing whose *presence* is private (named, not derived, so a folder added tomorrow is private by default); nothing that *carries* a credential surface (the four forbidden words, plus token/key *shapes*); nothing the page may *reach* (CSP, off-origin scripts, script tags with no file); the offline app must actually *install* (`addAll` is all-or-nothing, and the shipped cache string must equal the shipped version); and the game must actually *be there* | `test/public.js` + `pages.yml` | **done** |
| **R11** — found 2026-09-13 by Yaz and Lupe, **not fixed** | **a person standing on a tile is a wall, and nothing re-audits after a wander step.** A person is stamped into the grid as `"N"` — at boot, by `addChill`, and on every wander step — and `"N"` is impassable both to `isSolid` and to `auditReach`'s own `walk`. The wander filter asks about solidity, doors and tram danger and never asks whether the step cuts the map in two. In `ex`, a neighbour in the one-tile gap at (19,1) puts 35 tiles and Doña Meche out of reach **of the player as well as the audit**. Reds `test/smoke.js` about **one run in twenty-five**, and has for longer than the branch that found it. (Backlog row 8 is the *spawn* half of this; this is the *wander* half, which is every second of play) | nobody may be walled out by somebody standing: with every wanderer pinned in turn to each single-width gap, `auditReach` reports nothing and every NPC keeps a reachable neighbour. **Red first by occupying `ex` (19,1) on purpose.** The fix site is the stamp or the auditor's read of it — **not a person-check; neither reader looks at people at all** | `engine/engine.js` + `smoke.js` | a quarter, plus the engine decision: does a person block, or do you walk around them (`docs/ARCH-LOG.md`) |

## 4 · Order

R3 and R5 and R8 first (minutes each, and R3 would have caught a mistake made today). Then
R1 with the engine change it needs. Then R4, which is the template's promise finally kept.
R2, R6, R7 as the town's next parts land. Each red first — a test that was never red proves
nothing (`OWNER.md`).
