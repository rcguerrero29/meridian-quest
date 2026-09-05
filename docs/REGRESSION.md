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

| # | Gap | Assertion to add | Where | Cost |
|---|---|---|---|---|
| **R1** | pinned animals have no test that the tile under them carries what they need, and appear in any world with the right id | for every animal the engine draws: the world's pack declared it (or the engine's pin is opt-in), and the drawn foot height equals the declared `lift` of its tile, in all four cameras. **Red first on the town** | `smoke.js` + `town.smoke.js` | a quarter sitting, after the engine change in §10.1 |
| **R2** | actors (people, animals, peers) are asserted per camera only for tiles and doors | count the draw calls per actor kind per camera (the pattern `mq-v64` used for tiles: "smoke now counts which drawing each camera calls") | `smoke.js` | a quarter |
| **R3** | a PR can close the wrong issue | a CI step: every `#N` after "Closes" in the PR body is an open issue whose title appears in the PR body or the diff | `ci.yml` | minutes |
| **R4** | the engine smoke was never split from Meridian's (NEW-WORLD §3) — the town got its own suite instead of a shared one, so engine invariants are asserted once, against Meridian only | `test/engine.smoke.js` — the portability guard, the guarantee, the four cameras, stand tiles, the light ladder, the reader's geometry, reachability, discoverability — run against **both** indexes | new file; `ci.yml` | one sitting |
| **R5** | the generated templates (06 the taller's, 07 Nolasco's) are checked for brand only; nothing checks that the quest that hands one over still names it | for each `doc:"id"` in the quests, `DOCS[id]` exists, builds, and its `tmpl` matches a file in `docs/templates/` | `smoke.js` | minutes |
| **R6** | the town's index is held to a line count | a diff assertion: the town index equals the public one under a fixed set of allowed substitutions (CSP line, title, script paths, no SW, no manifest) and nothing else | `town.smoke.js` | a quarter |
| **R7** | four-camera pixels are looked at by nobody | `shots.js --cams` in CI, uploading the PNGs as an artifact; a "looked at" step is still a person. Optional: a per-spot pixel-hash baseline that fails on drift | `ci.yml` | a quarter; the baseline is a sitting |
| **R8** | the guarantee scans `content/` for Meridian only; a second public pack would go unscanned | scan every pack folder the public index loads, derived from the script tags, not a hardcoded list | `smoke.js` | minutes |

## 4 · Order

R3 and R5 and R8 first (minutes each, and R3 would have caught a mistake made today). Then
R1 with the engine change it needs. Then R4, which is the template's promise finally kept.
R2, R6, R7 as the town's next parts land. Each red first — a test that was never red proves
nothing (`OWNER.md`).
