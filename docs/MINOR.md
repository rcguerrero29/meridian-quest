# The minor improvements — the planning run of 2026-09-15

*The owner, 2026-09-15: "do we have any other improvements that are minor like the ui process or from
mine and even AJs feedback? dont build it yet plan first because we may come close to a limit."* Then:
*"the goal with crew mode is to become more efficient than using a single context window."*

**So this run was four adviser lanes running BESIDE a build, not instead of one.** Rosa, Lupe,
Remedios and Yaz worked while the session built the map (#160). Nothing here was built by them; three
of the items below were built by the session afterwards and are marked ✅.

**Everything in §1 was MEASURED in the running game or the running suite this day.** Where a lane
reasoned from code instead, the row says so. Four of the numbers the registers carried were wrong,
and §3 is that list — it is the most valuable part of this file.

---

## 1 · Worth doing, ranked by what it costs the person using it

| # | What a person hits | Where | Engine or pack | Cost |
|---|---|---|---|---|
| 1 | **You cannot talk to anybody with the phone sideways.** The joystick and Talk sit **120 and 122 px below the fold** in Meridian, 100 and 102 in the town; a frame at 844×390 contains no control at all | `.wrap{max-width:560px}` (`index.html:46`) pins the viewport at 534 px and `sizeCanvas` derives height from **width**, never from the window (`engine/engine.js:634-654`, the 427 px floor) | **shell, both games** — Lupe tested a media query and it works: `@media (max-height:560px){.viewport{max-width:calc((100svh - 150px) * 1.25)}}` → controls **55/75 px above** the fold and every one pressable by `elementFromPoint` | an hour |
| 2 | **The button that starts the game is cut through its own word** — bottom edge **23 px below the fold at 390×844, 480×900 AND 1280×800**, both games, both languages | `.creator{max-height:calc(100dvh - 16px)}` + `.creator #begin{position:sticky;bottom:0}` (`index.html:302-303`, town `:301-302`): the panel keeps to the window's HEIGHT but starts ~39 px down the page | **shell, both games** | **not the one number it looks like** — the session tried `position:sticky;top:8px` on the panel and **measured no change at all**; it wants a real layout answer, and #126 (the chair, where the page cannot scroll) is the case any fix must survive |
| 3 | **The first sentence of the game names a joystick that is not there** — `tut1` says "joystick or arrow keys", `ctl` is `"swipe"` (`engine.js:4095`), `#joy`/`#dpad` are `display:none`, and `#ctlHint` says the opposite two lines below. Measured: the same sentence is on screen **twice at once for 4 of the first 7 seconds** | `content/meridian/strings.js:37`, town copy `:38` | **string = content; the rule that a hint must read the live control = engine** | minutes for the string |
| 4 | **37 written subtitles no player has ever seen** — 15 Meridian + 22 town documents declare `sub:`, and `docSub` appears **nowhere** in the engine. Measured height 0 on all 15 | the reader | **engine to render; the content is already written** | under an hour |
| 5 | **The only sub-44 px button in every panel is the way out** — `closeSet`/`tpClose`/`mpClose`/`mapClose` all **281.8 × 35** at four sizes in both games, every neighbour 44. And the repo's one 44-px check reads `.dbtn,.opt` inside `#paperSheet` only — **Meridian declares zero `.dbtn`, so in the public game that check measures nothing** (`test/engine.smoke.js:283-285`) | `.settings .close` (`index.html:359`) has no `min-height` | **shell + the guard** | minutes, and the guard is the real work |
| 6 | **The town's Sign in slices both its buttons sideways** — 844×390, 207 px visible of 239, cut mid-word; 32 px of overflow | `.settings.reader{padding:14px 10px 28px}` (`index.html:140`) | **shell, both games** | minutes |
| 7 | **Escape leaves two panels of four** — `textlab` and `exporter` answer neither Escape nor the backdrop, at every size, in both games. `grep Escape test/*.js` → **0** | engine | **engine** | minutes + the first Escape test this repo has |
| 8 | **No pressed state on `.dbtn`; 47 checkboxes tick in Chromium blue; six of the town's form boxes measure 70–92 px wide instead of 13** (the `inline-flex` stretch) | three declarations | **shell, both games** | minutes |
| ✅ | **A `__proto__` key pasted into the text lab replaces the prototype of the cast's name table** (#193) | `applyText`, two `Object.assign` sites | **engine** | **done 2026-09-15**, `putAll()`, red first |
| ✅ | **A neighbour stepping off a tile writes plain floor over the map's own glyph** (#192) | `engine.js:102` against `:175` | **engine** | **done 2026-09-15**, red first |
| ✅ | **Three scratch probe files were tracked in `test/`**, two hardcoding an absolute machine path (`test/.chema-*.js`) | — | — | **deleted 2026-09-15**; `docs/OPEN.md:110` had already recorded this class four times in one day |

## 2 · The build and release lane — and one item that is not minor at all

| # | What | Verdict |
|---|---|---|
| 1 | **Four suites resolve the browser naively and only `smoke.js` copes** (`town.smoke.js:9`, `engine.smoke.js:17`, `town.state.js:13`, and `gauge.js` spawns the second). Three of the README's own four commands do not run in this container | **One shared helper**, not a copied block: `1194` is a revision already wrong once, and copying makes six copies of it. CI is unaffected — `ci.yml:18-21` pins playwright 1.63.0 and installs its own browser, so `executablePath()` must stay the early branch. **`chromium.executablePath()` does not throw when the browser is missing — it returns a dead path**, so "add a try/catch" is a no-op; the load-bearing line is `fs.existsSync` |
| 2 | **With the browser missing, `gauge.js` tells you to DELETE six real template demands.** It catches the child's failure, keeps only lines starting with `- `, gets none, and prints the "no longer demanded — delete this line" prescription for every row | **Worse than a check that lies: a destructive remedy.** ~3 lines — require the child to have printed one of its own banners first |
| 3 | **`sw.js`'s `c.addAll(ASSETS)` can write yesterday's bytes into today's cache.** A worker's own fetches still go through the HTTP cache, so a visit inside Pages' max-age window after a deploy caches stale bytes under the NEW name, deletes the old cache, and serves them for ever. **The title screen would say the right version over the wrong bytes** | One expression: `c.addAll(ASSETS.map(u => new Request(u, {cache:"reload"})))`. Shipped **without** a version move it also repairs devices already in that state |
| 4 | **Nothing asserts that every file `index.html` loads is in `sw.js`'s `ASSETS`** | Add a pack script, forget `sw.js`, and the game is perfect online and broken on a plane with every suite green. Minutes + a plant |
| 5 | **The README installs the one package that by design never downloads a browser** (`playwright-core`, `README.md:55`) while CI installs `playwright` | Two lines. This was the actual root cause of the first hour of 2026-09-15 |
| 6 | **`closes.js --selftest` and `leaves.js --selftest` run nowhere.** Both pass, ~4 s total, no browser | Two lines of `ci.yml`. Best value per line on the page |
| 7 | **A red CI does not stop a deploy** — `pages.yml` triggers independently of `ci.yml`, and CI checks a box built **without** `status.json` while the deploy checks one with it | **Not minor. Do not smuggle it in as a small ticket**, and it is downstream of the Pages question that is still his thirty seconds |

## 3 · What this run CORRECTED — the registers were wrong in four places

1. **The `smoke.js` flake is not what every register says it is.** *"`auditReach` and `isSolid` both treat a standing person as a wall"* — **they never look at a person.** Both read only the grid; a person is stamped INTO the grid (`engine.js:57`, `:104`, `:170`). There is no person-check to relax. (`docs/POSTMORTEM.md` already carried Melo's correction; three briefs since have carried the old wording, this session's included.)
2. **(19,1) is not "a one-tile gap by the barbería" — its glyph is `≈`, it is the tram line**, and row 1 is the only east-west corridor on Calle Dos because row 3 is plugged at x=19 by Rigo, who is on the do-not-re-litigate list. The body is **Yola la Paletera** (`~c0`, `content/meridian/npcs.js:66-68`), whose pen holds five tram-line tiles.
3. **"One run in twenty-five" is not the fault's frequency — it is the frequency with which the suite happens to look while somebody stands in a doorway.** Sampling `auditReach` every 150 ms for 90 s fires reds continuously: 1, 7, 8, 9, 10, 13, 16, 21, 35, 48 tiles. A census pinning a body on every walkable tile of every world found **163 cutting tiles across 15 worlds, 27 of them inside a wanderer's pen** — and **four worlds, not one**: `ex` ×23, `barberia` ×3, `caseta` ×1, where the portero walls off his own caseta.
4. **The ten town commits that shipped without moving `GAMEV` were all code, none documentation** (71 commits touch `changarrito/`). That kills the stated objection to guarding the town's bump: the cost the question feared — a bump on comment-only commits — is not what the misses actually were.

**Also corrected:** `docs/BACKLOG.md` row 28 said #160 waits on his look (he said start — fixed in this commit) · `docs/OPEN.md:31` points the `ch-v` question at `BOUNDARY.md` row 5, which is about the player's browser and mentions neither the town's version nor his laptop — **no row in that register covers it** · #176's "never reproduced" is stale, run 8 reproduced it with numbers · #199's four kitchen colours are superseded by the Korean pivot (§14 of the plan) · `docs/NEW-WORLD.md:227` cites lines "~604–612" for something at 776–784.

## 4 · The fault the flake actually is, and the fix that is NOT the cheap one

**Reject, in writing: "make the audit stop treating a person as a wall."** It is minutes, it turns the
suite green, and it is this project's signature mistake — the alarm stops reading the noun while the
player stays stuck. The player's own reader (`isSolidAt`) loses **77 tiles** in that state and reaches
neither Meche nor Naye.

**The one-word map fix — `still:true` on Yola — kills the loudest instance and leaves 24 of the 27
live cutting tiles**, and must be redone for every alcove in every world, and again for every world a
new pack ships. That is what `docs/GAUGE.md` exists to prevent.

**The engine answer: the wander filter asks a question it has never asked** — *does this step cut the
map?* — and refuses tiles that do. Priced in the page: the stupidest possible version (blank each
tile, flood) is **147 ms for 2,188 tiles across 15 worlds, once, at boot**; Tarjan is far cheaper. It
fixes the spawn half for free, and a second pack inherits it. **Red-first is already red at 27 tiles.**

## 5 · One-word answers owed by the owner

1. **Force a `ch-v` bump on every town commit?** Yaz's recommendation, with the measurement above, is
   **yes**, guarding the noun *"did the string `behind()` compares move"* — not a number, not presence.
2. **Is 844×390 (phone landscape) in scope?** It changes the tier on rows 1, 2 and 6 of §1, not their truth.
3. **The ❗ itself** — `#198` says "art only, no bump" for four things, and that is right for the rug,
   the crate and the counter and **wrong for the fourth**: the ❗ is `ctx.fillText` at three engine
   sites behind no seam, it bumps, it changes what both games draw over every person's head, and it is
   the one object this repo records as meaning one thing forever. **Split the ticket; the ❗ needs his word.**
4. ~~**Pages → Settings → Source**~~ — **done, and it was done five days ago.** Closed 2026-09-15 by
   asking the API instead of asking him again: GitHub's own `pages-build-deployment` last ran
   **2026-09-10** (run #158) and has been silent through every merge since, while `pages.yml`'s own
   `actions/deploy-pages@v4` step **ran and succeeded** on the #202 merge at 08:09:43Z — and that step
   only takes when Source is "GitHub Actions". The allowlist is what serves the site; `/changarrito/`,
   `/docs/` and `/test/` are no longer published. **The line was unread, not undone.** What the round
   then found is the more interesting half: the two `continue-on-error: true` that let the job stay
   green while the switch was unmade had quietly become a silent zero, so a failed deploy would have
   left CI green and a stale site, and a Source switched back to a branch would have skipped the
   deploy through an `if:` without a word. Both came off.

## 6 · What the lanes did not check

Rosa: a real thumb and a real rotation; whether the toast/record doubling is intended; iOS input zoom;
anything drawn inside the canvas. Lupe: a clean five-run count for the flake, and its rate in a real
suite run (only in a probe where she placed the body); the hero driven by key presses through a
blocked gap. Yaz: Pages' live headers and whether it deploys from a branch (the proxy blocks the host);
and **she planted nothing at any guard she proposes** — every "done when" names the plant instead.
Remedios: **the ledger itself** — she had no GitHub tool this run, for the third run running, so every
issue number in her return is a paper citation and **no issue state was read**. Fix her brief or her
tools before the next triage.
