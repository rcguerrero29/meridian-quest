# The regression map — what the suites hold, what they missed, what to add

*Opened 2026-09-05 at the owner's ask: "lorenzo is floating my friend lol some regression
tests are missing. make sure regression tests are updated for meridian quest original and for
templates." This file is the map: every suite, what it holds, what the last five days' findings
should have been caught by, and the assertions to add. Nothing here is built.*

## 1 · The suites today

| Suite | Runs where | Holds |
|---|---|---|
| `test/smoke.js` — Meridian | CI, every push and PR | ~40 sections: boot with no errors or validator warnings; static invariants; the retry/XP flow; chapters and endings; hearts as a layer; WCAG contrast on every theme; the theme editor; the NET stub; the care pack and the decision report; hostile save payloads; the Trolley Pass round-trip; TILES metadata and Sonny's program; the park (leash → bridge → chill → recap); screen-relative swipes; door plausibility and cooldown; 3D doors and wall faces; bake resolution; seasons; furniture per camera; the button priority; fences in 3D; door markers; per-district endings; looks keyed by id; the whole city raised; the record's growth; multi-storefront; the room upstairs and its off switch; the version on the opening page; the camera round-trip; **the portability guard**; the owner's 2026-09-03 reports; **the public build's guarantee** (Part 1) |
| `test/town.smoke.js` — El Changarrito | CI, after Meridian's | the town's index is a known diff of the public one; own prefix; own name and the engine's version; the park, the faces, the clerk with her document, the board; the record's fixture: people by tier, plain words, the three-line cycle, per-label stands, leaving and restoring the tile; Sonny; the animals' tiles walkable |
| `docs/templates/build-branded.js --check` | CI | the branded copies of the docs templates match the neutral ones plus `brand.yml` |
| `test/shots.js` (`--cams`, `--index`, `--spots`) | **nobody** — by hand | four-camera screenshots of named spots; the only pixel-level look at the game |
| `test/tilesheet.js` | by hand | the cold read of every glyph |

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

### The register of guards that read a proxy — twelve, and counting

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
| 11 | **`test/bump.js`, the version guard itself** | what the **commits** changed (`git diff base...HEAD`) | **what is about to ship** — so every run before a commit, which is the only time anybody runs it, was decorative. Planted an engine change with the CACHE string reverted, sitting in the working tree, and it printed *"this change touches nothing the offline app has already cached"* | the session, planting at it on the way past |
| 12 | **the ride guard, first draft (mine, same day)** | does `rideStart()` work | does **picking a destination in the pass** give you a ride — it called `rideStart()` directly, so cutting the pass's own wiring out of `openTravel()` left it green | planting the cut |

**#11 is the one to read twice.** It is the guard for the rule `CLAUDE.md` states in its own words —
*bump `GAMEV` and `CACHE` together whenever `engine/` changes* — and it could not see an unbumped
engine change in the working tree it was being asked about. It compared two commits, and the moment
anybody actually runs it is **before** the commit. It had been green for every change this repository
has shipped since it was written.

**#12 was written by the session writing the entry for #11, one hour later.** That is now the third
time this has happened and the count is the point: knowing about the mistake, writing the register
entry for the mistake, and making the mistake are not mutually exclusive activities.

**Two of those are guards written by the session that had just found the other eight** (#10, and the
mural-ledger guard that split on `### <agent>` headings when every heading in that file is the
anonymised literal `### (agent)`, so it went green on a file with three un-actioned proposals in it).
**Knowing about the mistake does not stop you making it.** That is the single most useful line in
this register.

**What the ten have in common, stated so it can be checked against a new guard before it lands:**

1. **The proxy is always cheaper to read than the thing.** A filename, a string equality, a bounding
   box, a membership test. The correct noun usually needs a behaviour to be exercised.
2. **The proxy is usually correct *today*.** #4 named the right brand; #9's box really did reach the
   road. They fail when the world grows a second case.
3. **A green guard is not evidence.** Eight of these ran green for days or weeks. **The only thing
   that distinguishes a working guard from a decorative one is a planted violation** — which is why
   `melo` exists and why step 5½ of `/crew-fix` asks it of every change.

**The question to ask of any new guard, before it lands:** *if I break the thing this is for, in the
smallest and most plausible way, does it print a sentence a person would say?* If you have not run
that, the guard is untested no matter how green the suite is.

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

## 4 · Order

R3 and R5 and R8 first (minutes each, and R3 would have caught a mistake made today). Then
R1 with the engine change it needs. Then R4, which is the template's promise finally kept.
R2, R6, R7 as the town's next parts land. Each red first — a test that was never red proves
nothing (`OWNER.md`).
