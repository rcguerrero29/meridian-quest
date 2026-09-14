# UI review — how a mock-up is reviewed before anything is built

*Opened 2026-09-14 at the owner's word: "make sure we have a ui review process where we include
engineers, our agents, UI, story, QA, and this is for mockups yes." The process is Lupe's, from crew
run 8 (`docs/meetings/2026-09-14-la-cuadrilla-run-8.md`, her return), written here so that seven
people who are not QA can sign it. Mock findings live HERE, never in `docs/QA-PASS.md` — that file's
own preamble says it grows from real escapes and from nothing else.*

*The first review under it is the journey mock-ups for La Sobremesa (§6, block 1). The pictures it
reviews are in `docs/mocks/2026-09-14-la-sobremesa/journey/` with their tickets in `manifest.json`.*

## 0 · Why this exists, in one sentence

A mock-up is the cheapest thing on this project to be **accurate about and wrong with**, because the picture and the screen are different objects and nothing in the picture says which one you are looking at. That is `docs/POSTMORTEM.md` §13 *"3 and 9, extended"* wearing a different hat: there a canvas drew in an empty room; here a picture is taken of a document with its scroll box switched off.

---

## 1 · THE ADMISSION TICKET — what a mock must carry to be reviewable

**A mock without all six is refused at the door, unreviewed.** Not failed — *refused*, which costs the maker ten minutes and costs the eight reviewers nothing. Every one of these exists because the current mock page is missing it.

| # | It must carry | Why — the failure it prevents |
|---|---|---|
| **A1** | **The row of the matrix it was drawn at**, by name, not by a number somebody typed. `390×844`, not "360". If it is not one of the five rows, it is not a size, it is a preference | The current page's `m4-…-560-…` was rendered at a **640-wide window** with a **620-wide sheet** (`render.js:44`; measured 1240 device px ÷ dsf 2). Three numbers, none of them equal |
| **A2** | **Whether the screen's own scroll/clip was left ON.** One word: `unmodified` or `unrolled` — and an `unrolled` picture may illustrate, never decide | `render.js:24-26` sets `height:auto; maxHeight:none; overflow:visible` on the reader before every shot. Every picture on the page is `unrolled` and none of them says so |
| **A3** | **The fold line drawn on the picture**, if the thing is taller than its box, plus the two numbers: document height and visible height | Without it a reviewer signs off a screen having seen 100% of a thing a person sees 54% of |
| **A4** | **What is real and what is drawn.** Per element: shipped / faked / not-yet-a-thing. A fake that looks shipped is the most expensive line in a review | Beto and Yaz cannot answer "is it buildable" about a picture that will not say which half already is |
| **A5** | **The before**, when the screen replaces one. Same row, same language, same shell, same word on A2 | `docs/POSTMORTEM.md` §5: when you diff two pictures, change one thing |
| **A6** | **EN and ES, and the shell it lives in** (cream or night). If the owner asked for night — he did, for AJ's questionnaire — a cream picture is not the screen | The current page: **1 of 8 pictures in Spanish, 1 of 8 in night**, and the night one is the recipe, not the thing he asked for in night |

**And one rule about the file name, because it is the field a reviewer trusts without checking:**
`<id>-<screen>-<WxH row>-<lang>-<shell>-<unmodified|unrolled>.png`. A name that disagrees with the picture is a lie a register will repeat for a week.

---

## 2 · WHAT "PASS" MEANS FOR A MOCK

A mock is not code and must not be graded like code. **A mock passes when the picture answers the question it was drawn for, at every size a person will hold it, and a reviewer can say what they would build from it.**

Four verdicts only, and they are not "approved / rejected":

- **ANSWERS** — the picture settles the question. Build from it.
- **ANSWERS, WITH A NOTE** — settled; a named, costed change to make on the way to code. The note is written down, not remembered.
- **DOES NOT ANSWER** — the picture is fine and the question is still open. **This is not a failure of the mock.** Say what extra picture would answer it.
- **REFUSED** — missing an admission ticket field, or drawn at a size nobody holds. Ten minutes, back to the maker.

**Three things a mock review may never do**, each because it has cost this project before:

1. **It may not pass a screen on one picture.** Same rule as the code (`docs/QA-PASS.md`, the rule at the top). A picture from one size is not a result.
2. **It may not grade the drawing's quality** — that is Pili's signature line, and only hers.
3. **It may not become a test.** A mock is a proposal. Pinning it as an assertion is `docs/QA-PASS.md` E2 in advance: a bodyguard for a decision nobody has taken.

---

## 3 · THE CHECKLIST — eight signature lines

**A signature line is a sentence that can be FALSE.** "Reviewed by Rosa" is a ritual. "Every control on this screen can be pressed at 844×390 without scrolling" is a signature. If you cannot imagine the sentence being false, it is not a signature and it goes back.

**Run order matters: QA (row 6) runs FIRST**, because the other seven are reviewing pictures and my job is to say whether the pictures are of anything. Then art, story, words, UI, engineers, play, ledger.

| # | Role | Who | The line they sign | What makes it FALSE |
|---|---|---|---|---|
| **6** | **QA — runs first** | **Lupe** | *"Every picture in this review carries its admission ticket, was taken with the screen's own clip ON, and exists at all five rows of the matrix in both orientations; where a screen is taller than its box I have drawn the fold and stated the two numbers."* | any picture `unrolled` and not labelled; any row missing; any size in a filename that is not the size in the picture |
| 1 | **Engineers** | Beto, Yaz | *"Every element on every screen is either shipped today — named with `file:line` — or listed as new work with a cost; nothing in these pictures is a capability the engine does not have and nobody has priced."* | one element nobody can point at, in either column |
| 2 | **Art** | Pili | *"Each screen reads at 360 CSS px wide as the one thing it is, and no mark carrying meaning survives only because I already knew what it meant."* | a mark she has to explain; a meaning carried by a fill instead of a silhouette (§13j) |
| 3 | **Story** | Nacho | *"Each screen says ONE thing a person reads without being told, and I can write that thing in one sentence under the picture."* | two sentences needed; or the sentence is about the feature, not about the person |
| 4 | **Words** | Paty | *"Every string exists in EN and ES, both fit at the narrowest row without sideways scroll or truncation, and no label is a bare glyph."* | ES overflow; `scrollWidth > clientWidth`; a button whose label is `✕` alone |
| 5 | **UI** | Rosa | *"Every control is reachable, ≥44×44 px, has a visible pressed/disabled/empty state, and no screen is a dead end: from each one I can name the way back."* | a control below the fold with no affordance saying so; a screen with no exit |
| 7 | **Play** | Chava | *"I opened this cold, in order, at phone size, and I can say what I thought it wanted from me — and here is where I was wrong."* | he cannot say; or he was wrong and nobody wrote it down |
| 8 | **Ledger** | Remedios | *"Every finding above is in the ticket shape — `In plain words:` · `Notes:` · `Questions to consider:` · `Areas affected:` · `Done when:` — and each names a screen, a row and a verdict."* | a finding that lives only in the review text |

**The genre line, signed by whoever holds the pen, on every screen without exception:**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."* (`docs/GENRE-RULES.md` R10, R11, R15; the owner: *"no timer, we chill"*.)

It is here rather than in a role's row because it is the one rule the owner stated twice, and a rule with no signature line is a rule nobody runs.

---

## 4 · WHERE THE FINDINGS GO — recommendation

**Recommend: a new `docs/UI-REVIEW.md`. Do NOT put mock findings in `docs/QA-PASS.md`.**

Three reasons, and the first is the only one that matters:

1. **`docs/QA-PASS.md`'s own preamble says the list grows from real escapes and from nothing else** (`docs/QA-PASS.md:6-7`). A mock finding is not an escape — nothing reached the owner. Filing one there dilutes the single register in this repository where every row was paid for, and a diluted escape register becomes the ritual its own preamble warns about.
2. **Seven of the eight signatories are not QA.** QA-PASS is "Lupe's list" by its title line; a wall Pili and Nacho sign needs a page that is nobody's.
3. It keeps the two questions apart: *what escaped* (QA-PASS) and *what we decided from a picture* (UI-REVIEW).

**The shape of `docs/UI-REVIEW.md`:** §1 the admission ticket · §2 what pass means · §3 the eight signature lines · §4 the red tests a mock inherits · §5 **the review ledger** — one block per review, per screen: the screen, the row, the verdict, the eight signatures with the date, and every finding in the ticket shape.

**Two cross-links, and nothing else moves:** a row in `docs/OPEN.md` §3's register table; one line under `docs/QA-PASS.md`'s matrix reading *"Mock-ups are reviewed under `docs/UI-REVIEW.md`; only what reaches the owner is written here."*

**The one thing that DOES belong in QA-PASS today** — filed on E4/E8/E10 precedent (near-misses that changed the list):

> **E13 · The review pictures were photographs of a document with its scroll box switched off — 2026-09-14 (mine, caught before the review, not an escape)**
> `docs/mocks/2026-09-14-la-sobremesa/render.js:24-26` sets `height:auto; maxHeight:none; overflow:visible` on the reader so the whole document fits one picture. Every picture on the review page is therefore a true photograph of a thing no screen shows. **Which row would have caught it: none — it would have passed at all five**, exactly like E10. **What the list is now:** step 0 gains a second clause — *prove you are in the game, AND prove the screen is still the shape the game gives it.* **The general lesson:** E10 was a canvas drawing in an empty room; this is a document photographed with the room's walls taken down.

---

## 5 · THE RED TESTS A MOCK INHERITS WHEN IT BECOMES CODE

Written now, at mock time, so the builder inherits them with the picture. **Each names the plant that must go red first** — a test that has never been red proves nothing (`docs/QA-PASS.md` step 1).

| # | The assertion | Plant it red by | Status today |
|---|---|---|---|
| **M1 · the fold** | The screen's primary action is reachable at 844×390 without a scroll the person must discover | shrink the scroll box to 207 px and assert the action is hit-testable | **RED ON THE SHIPPED READER.** At 844×390 the week strip's only button, *Copy the shopping list*, is below the fold |
| **M2 · the end-of-document lie** | A document taller than its box shows an affordance saying so, above the bar | load a doc 2× the box and assert the affordance exists | **RED.** The only mark between the last visible line and the bar is a dashed rule that reads as the end |
| **M3 · target size** | Every control ≥44×44 CSS px at 390×844 and 844×390 | shrink one control's padding by 4 px | green today (44–48 px measured everywhere) |
| **M4 · input zoom** | Every `input`/`textarea`/`select` in the reader has `font-size ≥ 16px` | set one to 15 px | **RED.** The reader's fields are `.85rem` = **13.6 px** (`index.html:191`, measured). On iOS Safari a focused field below 16 px zooms the page — `[TRAINING]`, not verified on a device |
| **M5 · both languages** | Every screen renders EN and ES with `scrollWidth ≤ clientWidth` | plant a 40-char ES label | unmeasured per row; ES exists for 1 of 8 screens |
| **M6 · both shells** | Every screen renders in cream and in night | render night only | green for the recipe; 1 of 8 screens has a night picture |
| **M7 · fullscreen is on at the shot** | `vp.classList.contains('fs')` is asserted **at the moment the picture is taken** | take the shot with the class added *before* opening the screen | see §6.4 — the obvious recipe silently produces a non-fullscreen picture |
| **M8 · no clock** | No screen's strings contain a countdown, a timer or a day budget | plant `"2:00 left"` | not written. `docs/GENRE-RULES.md` R10/R15 has no guard |

---


---

## 6 · THE REVIEW LEDGER — one block per review, per screen

*The shape: the screen · the row · the verdict · the eight signatures with the date · every finding in
the ticket shape (`In plain words:` · `Notes:` · `Questions to consider:` · `Areas affected:` ·
`Done when:`). A signature is a sentence that can be false; "reviewed by" is not one.*

### Block 1 · La Sobremesa, the journey — thirteen screens — opened 2026-09-14

**What was reviewed.** The page *La Sobremesa, the journey* (published as an artifact; its documents
are `docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js`, its camera `render2.js`, its tickets
`manifest.json`, thirty pictures). Screens: 0 the questionnaire · 1 the front door · 2 the street ·
3 the household · 4 a drawer · 5 the shifts board · 6 the recipe as the house reads it · 7 the
Collection · 8 the merge board · 9 making a dish by hand · 10 the house card · 11 the day nothing
happened · 12 the map before and after.

**The admission ticket, as the maker filed it.** A1 rows: phone portrait 390×844 and phone landscape
844×390 — **two of the five**, said on the page. A2: every picture is labelled `unmodified` or
`unrolled`. A3: the fold is drawn on every unrolled picture with the two numbers. A4: every screen
carries *what is real / what is drawn*. A5: the map carries its before. A6: EN and ES at 390×844,
night shell for every document; the front door, the street and the map are cream because that is the
shipped game.

**The genre line**, signed by the pen on every screen, 2026-09-14: *there is no clock, no countdown,
no day budget, no streak that can break, and nothing on this screen counts down.*

**The eight signatures.** Crew iteration 9 (`docs/crew/FLIGHT-NOTES.md`). Filled in as each return
lands; a row left `—` was not signed.

| # | Role | Who | Signed | Date |
|---|---|---|---|---|
| 6 | QA (runs first) | Lupe | — | |
| 1 | Engineers | Beto | — | |
| 2 | Art | Pili | — | |
| 3 | Story | Nacho | — | |
| 4 | Words | Paty | — | |
| 5 | UI | Rosa | — | |
| 7 | Play | Chava | — | |
| 8 | Ledger | Remedios | — | |

**Findings** — appended per return, in the ticket shape, each naming a screen, a row and a verdict.

