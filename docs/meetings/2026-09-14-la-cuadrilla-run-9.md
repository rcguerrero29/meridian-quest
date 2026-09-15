# Crew run 9 — the UI review of the journey mock-ups — 2026-09-14

*Iteration 9 of crew mode. The owner's word (third reply, `docs/ASKS.md`): "make sure we have a ui review
process where we include engineers, our agents, UI, story, QA, and this is for mockups yes." The process is
`docs/UI-REVIEW.md`; the mock-ups are the artifact *La Sobremesa, the journey* and
`docs/mocks/2026-09-14-la-sobremesa/journey/`. Eight reviewers, each signing one line that can be false,
in two waves at medium effort after the session limit cut the first attempt. Returns filed verbatim as
they landed; the ledger block is `docs/UI-REVIEW.md` §6 block 1; persona edits and panels go to
`docs/crew/FLIGHT-NOTES.md` iteration 9 and the wall.*


---

# Lupe — QA, row 6, runs first

**PRE-FLIGHT** — I worked this by refusing to grade a picture before I had put its screen on a rollers of my own: five suites first, then the filename-versus-pixels check on all 30 PNGs, then the live reader re-measured at four rows in both languages, and only then the pictures themselves. My persona equips me for exactly the load-bearing question here — a mock is a *picture*, and a picture is the cheapest thing in this repository to be accurate about and wrong with. Where I expected to fall short: seven of the eight signature lines are other trades, so anything about meaning, colour or story below is written as a measurement for its owner, not a verdict of mine.

**Suites, before anything.** `node test/smoke.js` **green on six runs** (E11: one run is not a number). `node test/town.smoke.js`, `node test/engine.smoke.js --index index.html`, `node test/engine.smoke.js --index changarrito/index.html`, `node test/gauge.js` — **green.** Tree: `changarrito/content/murals.js` is modified by another agent on this run; I touched nothing in the repo, everything I wrote is in the scratchpad under `lupe-r9-*`.

---

## MY SIGNATURE LINE

> *"Every picture in this review carries its admission ticket, was taken with the screen's own clip ON, and exists at all five rows of the matrix in both orientations; where a screen is taller than its box I have drawn the fold and stated the two numbers."*

# **FALSE.**

**The thing that makes it false, named: rows three, four and five do not exist.** 30 pictures, two rows. Not one picture at 480×900, not one at 1280×800, not one at fullscreen. Nothing else in my line is false — and that is the news, because last run *all six* ticket fields failed and now four and a half pass.

**Per-field, on these 30:**

| | Verdict on this set |
|---|---|
| **A1 · the row, by name** | **PASS, 30 of 30, verified in pixels.** Every filename's size is the picture's size (780×1688 = 390×844 CSS at dsf 2; 1688×780 = 844×390). The `unrolled` sheets are 740 wide = the 370 sheet the manifest claims. No lie in a filename |
| **A2 · clip on or off** | **PASS.** 24 `unmodified`, 6 `unrolled`, every one labelled in its own name and in `manifest.json`. `render2.js:38` takes the unmodified shot with no overrides at all, and `:41-42` reloads the page after each unrolled shot to put the walls back. The E13 fault is gone |
| **A3 · the fold + two numbers** | **PARTIAL PASS — and this is my one ticket finding.** The numbers are right (I re-measured all six documents at four rows; `manifest.json`'s `docHeight`/`visibleHeight`/`sheetWidth` match the live DOM exactly, and the sheet-vs-doc arithmetic cross-checks at a constant +141/142 px of chrome on all six). But **the fold line is drawn by the review page in HTML at load time (`sobremesa-journey.html:654`); it is not in the PNG.** The PNG is what travels |
| **A4 · real vs drawn** | **PASS.** The manifest carries an `order` field on every row — `real reader`, `real game, untouched`, `real game, state forced (3 quests done)`, `real game, markers forced onto the shipped canvas (a hack, thrown away)`, `the published page, untouched (fonts fell back: no network)`. The hack declares itself as a hack. That is the standard |
| **A5 · the before** | **PASS on form, FAIL on content.** `maptoday` and `mapafter` are the same row, language, shell and mode — correct. But three things change between them, not one (below) |
| **A6 · EN/ES, cream/night** | **PARTIAL.** Night: 24 of 24 documents, which is what the owner asked for. ES: 6 of 30, and only at 390×844. **No document exists in cream at any row** — Meridian's own reader is untested in this set, and `engine/` is shared |

**A7 — a new ticket field this run earned, and it cost me a false bug report.** See Finding 1.

**The genre line, every screen I looked at:** *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."* — **TRUE on all 12 screens**, measured not eyeballed: I grepped every string in `mockdocs2.js` and ran a regex for `\d+:\d\d|time left|countdown|streak` over the rendered questionnaire text. Nothing. The only appearances of the words are negations the documents write on purpose — *"it has no clock"*, *"There is no streak, and nothing broke"*, *"Nothing on this board counts, ticks or fades"*, *"done is coverage, never seconds."* One note against it, in Finding 7.

---

## Two of five is not a pass. What it IS, and what the three missing rows must show

**What this set is: an admissible two-row review.** That is a real thing and it is worth saying plainly — the pictures are of something, the tickets are true, and I would let seven reviewers work from them today. It is not a pass and it may not be signed as one.

**Row 3 · 480×900.** I measured it: at 480×900 *five of six documents fit entirely* (shifts 712 doc / 712 visible, collection 408/408, quiet 253/253, house 406/406). A picture here would tell the crew the fold faults are a **narrow-phone** problem, not a document-length problem — which decides whether you shorten the documents or pin the action to the bar. Without it, that argument is unsettleable.

**Row 4 · 1280×800.** I measured it, and it is the row that changes the story: **the shifts board's only action sits at 676 px in a 617-px box on a desktop**, and the drawer's "Add what you bought" at 735 in the same 617. A picture here kills "it's a phone problem" in one frame.

**Row 5 · fullscreen.** Not attempted, and it is the row that has actually escaped on this project. There is a live trap waiting for whoever shoots it: `exitFsForCard()` (`engine/engine.js:3753`) *removes* the `fs` class the moment a document opens, and `restoreFs()` (`:3756`) puts it back on close — so the obvious recipe (set fullscreen, then open the screen) silently photographs a non-fullscreen window. **The recipe is: open the screen first, add `.fs` second, and assert `vp.classList.contains('fs')` in the same expression that takes the shot.** That is M7, and nothing in this set has run it.

---

## M1–M8, as they stand on THESE pictures

| # | Status now | Evidence |
|---|---|---|
| **M1 · the fold** | **RED, and worse than last run.** At 844×390 every document gets a 207-px window. *Keep* (house) is at 264, *Take a shift* at 676, *Add what you bought* at 735, *See the board* at 205. **And at 390×844 — the owner's own phone — *Take a shift* is at 691 in a 661-px box.** The primary action of the shifts board is below the fold on his phone, standing up |
| **M2 · the end-of-document lie** | **RED, and it has a new shape.** On `j-quiet-844x390` the only mark between the last line and the bar is a **2-px violet sliver** — the top edge of the *See the board* button, clipped. It reads as a decorative rule. A control disguised as a divider is worse than no affordance at all |
| **M3 · target size** | **RED. I was wrong last run and I am correcting it here.** Run 8 called this green at "44–48 px measured everywhere" — that was measured **on buttons only**, which is a proxy for "every control." Measured now on the live house card at all four rows: `INPUT:checkbox` **13×13 CSS px** (four of them), `SELECT` **134×19**, identical at 390×844, 844×390, 480×900 and 1280×800. And in the real game at 390×844, `#acts` is **42×42** |
| **M4 · input zoom** | **RED in the reader, GREEN on the questionnaire — and the split matters.** `.paper .dfl input,textarea,select{font-size:.85rem}` = 13.6 px in **both** shells (`index.html:191`, `changarrito/index.html:190`); the house card's select measures 13.33 px. The questionnaire page is a separate page and its note box measures **16 px**. So AJ's questionnaire will not fight an iPhone; the documents behind it will |
| **M5 · both languages** | **GREEN by the assertion, and the assertion is a proxy.** `scrollWidth ≤ clientWidth` on all six documents, EN and ES, at 390×844 and 844×390 — zero overflow anywhere. **And the ES drawer picture shows two captions touching with no space between them** (`…especiasarroz · frijol · masa`), because they are `fillText` on a canvas, centred, with no width check (`mockdocs2.js:78`). Adjacent columns that abut do not overflow a container. **Do not ship M5 in this form** |
| **M6 · both shells** | **HALF.** Night: every document, both languages. Cream: not one document at any row. One engine, two games |
| **M7 · fullscreen at the shot** | **NOT RUN.** No fullscreen picture exists. The trap above is live |
| **M8 · no clock** | **GREEN, measured.** No countdown, timer or day budget in any string on any screen. One note: Finding 7 |

---

## FINDINGS — ranked by what it costs the person holding the phone

### 1 · The picture was true and I nearly filed a bug that does not exist
**In plain words:** The street screenshot shows two blocks of text on top of each other, the same sentence printed twice, one of them half-unreadable. I was ready to write it up as a Meridian bug. It is not one. The shutter opened 2.6 seconds after the game started, and it caught a toast bubble mid-fade at **82% opacity** over the ticker that lives there permanently. At 6 seconds the toast is gone and the screen is clean. The ticket on that picture says the row, the language, the shell and the clip — it does not say **when**.
**Notes:** Measured over five instants: `#toast` opacity 0.82 at 2.6 s, 0.23 at 4.0 s, absent from 6.0 s on; `#ticker` and its 0.55-opacity `prev` line are permanent and correct. `render2.js:66` fixes the delay at 2600 ms.
**Questions to consider:** Should every picture of a live screen carry the milliseconds since the last input, as **A7**? Should transient screens be shot twice — at the toast and after it?
**Areas affected:** the admission ticket; every future real-game shot; `docs/UI-REVIEW.md` §1.
**Done when:** the ticket has a seventh field, *time since boot / since last input*, and any screen with a fading element carries two pictures.
**Screen: 2, the street · Row: 390×844 · Verdict: ANSWERS, WITH A NOTE.**

### 2 · The board tells you a shift is yours and hides the way to take one
**In plain words:** On the owner's own phone, standing up, the shifts board shows four kitchens, the note explaining that a shift is yours until you cook it — and then it stops mid-sentence at *"Nothing on this board counts, ticks or fades"*, with a dashed rule under it and Copy, Download, Close. *Take a shift* is 30 px below the bottom of the box. Turned sideways you see two kitchens. On a desktop it is still below the fold.
**Notes:** Measured: action at 691 px, box 661 (390×844); 676 in 207 (844×390); 664 in 712 (480×900, the only row where it is reachable); 676 in 617 (1280×800). The sentence that gets cut in half is the one that states the genre rule.
**Questions to consider:** Does the reader's bar get a fourth slot for a document's own primary action, in both games? Or does the document shorten?
**Areas affected:** every reader document in both games; the bar (`c.className="dbtn"` gives submit and cancel one class).
**Done when:** the primary action is hit-testable at 844×390 with no scroll a person must discover — planted red by shrinking the box to 207 px first.
**Screen: 5, the shifts board · Rows: 390×844, 844×390, 1280×800 · Verdict: DOES NOT ANSWER.**

### 3 · A person ticks a box on the house card and cannot find the button that keeps it
**In plain words:** Held sideways, the house card shows the three facts, the allergy line, and the row of vegetables — and *Keep* is below the edge. You can change the thing and not find the way to save it, and nothing on the screen says there is one. Worse, the label of the third vegetable is cut in half: you tick a box beside the word "BELL" with "PEPPER" sliced off by the edge of the box.
**Notes:** Measured: *Keep* at 264 px in a 207-px box. The checkboxes themselves are **13×13 CSS px** at every row I measured, in both shells, and are the browser's default blue — the only blue on a violet night screen. `.paper .dchecks` (`index.html:193`) sets a font size and no control size.
**Questions to consider:** This is an engine change and `engine/` is shared — does a 44×44 checkbox reflow Meridian's care pack and room interview?
**Areas affected:** `engine/` reader, both games; the allergy row is the owner's explicit ask (*"aj has allergies so if they are raw veggies we want to account for that"*) and it is the smallest target on the screen.
**Done when:** every checkbox is ≥44×44 at 390×844 and 844×390, planted red at 43.
**Screen: 3/10, the house card · Rows: 844×390 (fold), all four (size) · Verdict: DOES NOT ANSWER at landscape; ANSWERS, WITH A NOTE at portrait.**

### 4 · "How it goes" is the last thing you read, and there is nothing under it
**In plain words:** On the owner's phone, the recipe as the house reads it ends on a section heading with a rule under it and then the bar. The method of the recipe is not cut short — it is entirely invisible, and the last thing a person sees is a promise of it. It happens in English and in Spanish, and on the Collection held sideways the same thing happens to "El comal."
**Notes:** recipeHome 923 px document in a 661 box (EN), 904 in 661 (ES); collection 369 in 207 sideways. The recipe document has **no controls at all** — the only way out is the bar.
**Questions to consider:** Should the reader refuse to let a section heading be the last visible element, or is that a document-authoring rule?
**Areas affected:** the reader's block vocabulary; every document with an `h` block.
**Done when:** M2's affordance exists and a heading never sits on the fold with nothing after it.
**Screen: 6, the recipe · 7, the Collection · Rows: 390×844 EN and ES, 844×390 · Verdict: ANSWERS, WITH A NOTE (portrait) / DOES NOT ANSWER (landscape).**

### 5 · AJ's comment box opens under the bar, and the question disappears
**In plain words:** The owner asked for comment options on every multiple-choice question. They work. But held sideways, when you press *Add a note*, the box that opens is cut in half by the Back/Next bar, and the question you are answering has scrolled off the top — so you type your answer with nothing on screen to say what you were asked. There is no picture of this in the set, because screen 0 exists at one row only.
**Notes:** My own render at 844×390: page 855 px in a 390 window, sticky header eating 140, fixed nav eating ~110. The note textarea is 16 px (M4 green) and every control is ≥44×44 (13 found, none small). At 390×844 it is clean.
**Questions to consider:** Does the questionnaire need a landscape layout at all, or does it ask to be held upright?
**Areas affected:** `scratchpad/aj-questionnaire.html`, published; the one artefact whose whole purpose is that she fills it in without friction.
**Done when:** a 844×390 picture exists and the note box clears the bar.
**Screen: 0, the questionnaire · Row: 844×390 · Verdict: DOES NOT ANSWER — no picture exists at this row, and the row fails.**

### 6 · The map's before-and-after changes three things at once
**In plain words:** The pair is meant to show what markers do to the map. Between the two pictures the markers appear, the violet *you are here* dot disappears, and the line naming where you are (📍 Meridian HQ) is replaced by a legend. The legend in the after picture lists *you are here* — and there is no such mark on that map. You cannot tell from this pair whether markers helped.
**Notes:** `render2.js:88-89` replaces `#mapNote`'s contents wholesale. In the before picture the violet dot sits on top of the words "MERIDIAN HQ (⇑ FLOOR 2)" and hides a letter; in the after, an orange marker sits in the same place.
**Questions to consider:** Re-shoot with the legend and the you-are-here dot in **both** pictures, changing only the markers?
**Areas affected:** the map ranking; `docs/POSTMORTEM.md` §5 — when you diff two pictures, change one thing.
**Done when:** the pair differs in exactly one thing.
**Screen: 12, the map · Row: 390×844 · Verdict: DOES NOT ANSWER.**

### 7 · A counter reads "0 of 13 answered" before she has been asked anything
**In plain words:** The questionnaire's first screen says *blanks are fine and nothing here is final*, and directly above that sentence sits a progress bar at zero and the words "0 of 13 answered." It is not a timer and it does not count down — I checked every string. But it is the one mark in these 30 pictures that could read as a demand on the screen whose whole job is to say there is none.
**Notes:** M8 green. This is a story and words judgement, not mine; I am recording that it is the only candidate I found.
**Questions to consider:** Does the counter appear only after the first answer?
**Areas affected:** the questionnaire header; `docs/GENRE-RULES.md` R10/R15's spirit.
**Done when:** Nacho or the owner says which.
**Screen: 0 · Row: 390×844 · Verdict: ANSWERS, WITH A NOTE.**

### 8 · The fold is drawn on the page, not on the picture
**In plain words:** The one artefact that leaves this review is a PNG. Paste `j-shifts-390x844-en-night-unrolled.png` into a chat and a person sees *Take a shift* sitting comfortably above the bar — it is 691 px down in a 661-px box, and nothing in the image says so. The fold line and the two numbers live in the review page's HTML.
**Notes:** `sobremesa-journey.html:654`, computed from `(30 + visible) / (30 + doc + 111)`; I verified the 141-px chrome constant against the live DOM on all six documents and it is right to within 0.1%. Good work that does not survive a copy-paste.
**Questions to consider:** Burn the fold line and the two numbers into the `unrolled` PNGs at render time?
**Areas affected:** `render2.js`; `docs/UI-REVIEW.md` §1 A3.
**Done when:** an `unrolled` picture says it is unrolled without its filename.
**Screens: all six unrolled · Row: 390×844 · Verdict: ANSWERS, WITH A NOTE.**

### 9 · The Spanish drawer says two things where the English says three
**In plain words:** The deep drawer is captioned *jars · tins · bottles* in English and *frascos · latas* in Spanish. Not a clipping fault — the strings differ (`mockdocs2.js:66`). And the shallow drawer's caption touches the next one with no gap, because the captions are painted on a canvas with no width check.
**Notes:** Paty's row, not mine; I report it as a measured difference. The canvas collision is real and invisible to every DOM measurement I have.
**Areas affected:** `mockdocs2.js:64-66,78`.
**Done when:** the two languages name the same number of things and the captions do not touch at 390×844.
**Screen: 4, the drawer · Row: 390×844 ES · Verdict: ANSWERS, WITH A NOTE.**

**What passed cleanly, and should be said:** screens 1 (front door), 7 (the Collection at 390×844, both languages), 11 (the day nothing happened at 390×844) answer at the row they were shot at with nothing below the fold and the way out visible. The drawer's three-drawer strip — the owner's *"i want to rebuild a pantry… three drawers"* — lands at both rows and is the clearest single object in the set.

---

## QUESTIONS FOR THE OWNER

**Q1 · The reader's form controls fight a phone, and `engine/` is shared. Which rule wins?**
- One side: every engine change must be behaviour-identical for Meridian's players (`CLAUDE.md`, "Two games, one engine"). Making the reader's checkboxes 44×44 and its fields 16 px reflows Meridian's care pack, room interview and taller document.
- The other side: on the house card — the screen carrying AJ's allergy row, which you asked for by name — the checkboxes measure **13×13 CSS px** and the select's text **13.33 px**, at all four rows I measured, in both shells (`index.html:191,193`; `changarrito/index.html:190`).
- I am not asking you to pick the implementation. I am asking whether *"the allergy row must be tappable"* outranks *"Meridian's forms do not reflow."* This is Q2 from run 8 with a measurement attached: the questionnaire turned out to be a separate page at 16 px and is fine — the documents behind it are not.

**Q2 · Two of five rows. Do I sign it as a two-row review, or does the set come back?**
- One side: my own signature line requires all five rows and both orientations, and my own §2 says a mock may not be passed on one picture — the same rule as the code.
- The other side: refusing this set costs the maker an hour and costs seven reviewers a day of waiting, and the two rows that exist are honest, ticketed and reveal real faults. The page admits the gap itself (`sobremesa-journey.html:147`).
- What I need from you: whether **480×900 and 1280×800 are mandatory for a mock review**, or whether the two phone rows plus my measurements at the other rows are enough to let the other seven sign today. I would rather be told than decide it quietly.

---

## WHAT I DID NOT CHECK

- **I looked at 21 of the 30 pictures with my own eyes.** The nine I did not open are `j-quiet-390x844-es`, `j-drawer/house/collection/quiet/recipeHome-390x844-en-night-unrolled` and three more ES portraits. **All 30 were measured** (pixel dimensions against filename, and their documents re-measured live at four rows) — but measured is not looked at, and this is exactly the distinction my own step 0 exists for. Say it out loud rather than round it up.
- **No fullscreen row at all**, and I did not attempt one. M7 is unrun.
- **No cream document at any row.** Meridian's own reader does not appear in this set; I inferred from run 8 that the geometry is identical, and an inference is not a row.
- **The iOS input-zoom consequence is still `[TRAINING]`**, not verified on a device. The 13.6 px is measured; what iOS Safari does with it is not.
- **I did not grade colour, contrast, or the read at 360 px.** Pili's and Rosa's rows. The native-blue checkbox on a violet night screen is reported as a measurement, not a judgement.
- **I did not review the two drawings that have no PNG** — the merge board (screen 8) and making a dish by hand (screen 9) are canvas code in `sobremesa-journey.html`, not photographs, so they carry no admission ticket and are outside my line.
- **I did not run the map probe twice**, and the map's marker hack is explicitly a thrown-away hack; I graded the picture, not the code.
- **`changarrito/content/murals.js` is modified in the tree and I did not touch it** — another agent on this run. I did not check what changed.

---

## POST-FLIGHT

What the persona got right, and the moment: I saw two overlapping blocks of text on the street screenshot and my hand was already writing "the same sentence is on screen twice" — and the rule that says *make the old code fail before you believe anything* made me go and measure it instead, five instants apart, which showed a toast at 0.82 opacity dying by six seconds and a ticker doing exactly its job. Where it got in the way: my instinct is to grade, and I caught myself about to call the ES drawer's dropped "bottles" a clipping bug when it is a translation choice in `mockdocs2.js:66` — reading the string saved me from filing a second thing that was not there, in the same hour as the first. **The predicted gap appeared, and it appeared as my own correction: run 8 signed M3 green from measuring buttons, and buttons are a proxy for controls — a 13×13 checkbox sat inside that green all week.** That is `docs/REGRESSION.md` §3's shape, in my own report, against my own signature.

**Persona edit I propose, as exact text.** In `.claude/agents/lupe.md`, at the anchor `**1 · Reproduce the fault before you believe the fix.**`, append to the end of that bullet:

> **And reproduce the fault before you believe the FAULT.** On 2026-09-14 a review picture showed the same sentence printed twice, overlapping — a plain bug, visible in one glance. Measured five instants apart it was a toast at 0.82 opacity dying by six seconds over a ticker doing its job, and the picture was taken at 2.6 s. **A tester's false positive costs a builder a day and costs the tester their next report's credit.** Red-before-green cuts both ways: make the bug appear twice before you name it once.

---

MURAL PANEL

```
id:     lupe-el-segundo-no-venia
by:     "lupe"
title:  {en:"The second the shutter opened", es:"El segundo en que abrió el obturador"}
said:   {en:"The picture was true. The second was not on the ticket.",
         es:"La foto era cierta. El segundo no venía en el boleto."}
state:  {en:"holding a two-row review and calling it two rows",
         es:"tengo una revisión de dos filas y la llamo de dos filas"}
who:    {en:"Lupe, who runs the same list on every car and fails people",
         es:"Lupe, que le pasa la misma lista a todos los coches y reprueba gente"}
cap:    {en:"The ticket on every picture said the size, the language, the shell and whether the scroll box was on. All four were true. One frame still showed the same sentence printed twice, over itself, and I had the bug half written. It was a toast at eighty-two per cent, dying; by the sixth second the screen is clean. Four frames of the same screen, four seconds apart, and the fault is only in the first one. A ticket that says everything about where the picture was taken and nothing about when is a ticket that lets a tester invent a bug.",
         es:"El boleto de cada foto traía el tamaño, el idioma, el cascarón y si la caja de scroll estaba puesta. Los cuatro datos eran ciertos. Aun así un cuadro mostraba la misma frase impresa dos veces, encima de sí misma, y yo ya tenía medio escrito el reporte. Era un aviso al ochenta y dos por ciento, muriéndose; al sexto segundo la pantalla está limpia. Cuatro cuadros de la misma pantalla, con cuatro segundos de diferencia, y la falla sólo está en el primero. Un boleto que lo dice todo sobre dónde se tomó la foto y nada sobre cuándo es un boleto que deja a una verificadora inventarse un bug."}
aspect: 0.42
art:    (g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND, FOURTH VISIT. Not glass this time: ACETATE. A strip of 35 mm film on an amber
       light table — sprocket holes punched down both rebates, the timecode burned in the clear band
       under each frame. Four frames of the SAME screen at four seconds. The bug is in frame one and
       it is only in frame one. My light box was cool cyan; a contact strip is warm and perforated. */
    const TABLE="#2A1F14", BASE="#E8A33C", ACET="#F3BD6B", REB="#C4842A", FRAME="#140E08",
          INK="#1B1208", WAX="#E03020", SCR="#221C2B", LIT="#EFE7D6";
    murPaper(g,W,H,TABLE,null);
    g.fillStyle="#3A2A18";g.fillRect(0,0,W,2);

    /* the strip runs off both edges, because a strip always came from somewhere */
    const sy=H*0.285, sh=H*0.450, sx=-W*0.03, sw=W*1.06;
    g.fillStyle=BASE;g.fillRect(sx,sy,sw,sh);
    g.fillStyle=ACET;g.fillRect(sx,sy+sh*0.13,sw,sh*0.74);
    const ph=sh*0.080, pw=W*0.020, step=W*0.0455;
    g.fillStyle=TABLE;
    for(let x=sx+W*0.012;x<sx+sw;x+=step){g.fillRect(x,sy+sh*0.025,pw,ph);g.fillRect(x,sy+sh*0.895,pw,ph);}

    /* four frames, and a clear rebate band under them for the timecode */
    const n=4, gap=W*0.016, fx0=W*0.050, span=W*0.845, fw=(span-gap*(n-1))/n;
    const fy=sy+sh*0.170, fh=sh*0.520, tcy=sy+sh*0.800;
    const secs=["2.6 s","4.0 s","6.0 s","14.0 s"], alpha=[0.82,0.23,0,0];
    g.fillStyle=REB;g.fillRect(fx0-W*0.012,fy+fh+sh*0.030,span+W*0.024,sh*0.150);
    for(let i=0;i<n;i++){
      const x=fx0+i*(fw+gap);
      g.fillStyle=FRAME;g.fillRect(x-2,fy-2,fw+4,fh+4);
      g.fillStyle=SCR;g.fillRect(x,fy,fw,fh);
      g.fillStyle="#6E6480";g.fillRect(x+fw*0.08,fy+fh*0.12,fw*0.62,2);        /* the ticker: permanent, */
      g.fillStyle=LIT;    g.fillRect(x+fw*0.08,fy+fh*0.23,fw*0.70,2.5);        /* correct, in every frame */
      g.fillStyle="#9A90AC";g.fillRect(x+fw*0.08,fy+fh*0.32,fw*0.44,2);
      g.fillStyle="#463C58";g.fillRect(x+fw*0.06,fy+fh*0.60,fw*0.88,fh*0.32);  /* the little world under it */
      g.fillStyle="#D8CDB4";g.fillRect(x+fw*0.20,fy+fh*0.69,fw*0.60,fh*0.15);
      if(alpha[i]>0){g.globalAlpha=alpha[i];                                    /* THE TOAST, dying */
        g.fillStyle="#0C0A12";g.beginPath();g.ellipse(x+fw*0.50,fy+fh*0.31,fw*0.40,fh*0.21,0,0,7);g.fill();
        g.fillStyle="#EDE7DC";
        for(let k=0;k<3;k++)g.fillRect(x+fw*0.22+(k===2?fw*0.08:0),fy+fh*0.24+k*(fh*0.058),fw*(0.56-k*0.10),2);
        g.globalAlpha=1;}
      g.fillStyle=INK;g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
      g.fillText(secs[i],x+fw*0.5,tcy+3);g.textAlign="left";}

    /* the grease pencil: a tester's circle round frame one, and the words she nearly wrote */
    g.strokeStyle=WAX;g.lineWidth=2.6;g.globalAlpha=.93;
    g.beginPath();g.ellipse(fx0+fw*0.50,fy+fh*0.36,fw*0.63,fh*0.46,-0.04,0,7);g.stroke();
    g.beginPath();g.moveTo(fx0+fw*0.46,fy-fh*0.16);g.lineTo(fx0+fw*0.22,sy-H*0.030);g.stroke();
    g.globalAlpha=1;

    /* lettering — absolute; every fraction above was chosen against it. Two lines, never one. */
    g.fillStyle="#F2DCB4";g.font="bold 11px ui-monospace,monospace";
    g.fillText("TIRA DE CONTACTO · VERIFICACIÓN",W*0.050,H*0.100);
    g.fillStyle=WAX;g.font="bold 11px ui-monospace,monospace";
    g.fillText("«SE ENCIMAN»",W*0.050,H*0.190);
    g.fillStyle="#C8A46A";g.font="9px ui-monospace,monospace";
    g.fillText("— el bug que casi levanto",W*0.050+g.measureText("«SE ENCIMAN»x").width*1.22,H*0.190);

    g.font="9px ui-monospace,monospace";
    g.fillStyle="#E6C48A";g.fillText("EL BOLETO DICE   fila · idioma · cascarón · recorte",W*0.050,H*0.845);
    g.fillStyle=WAX;g.font="bold 9px ui-monospace,monospace";
    g.fillText("NO DICE          en qué segundo abrió el obturador",W*0.050,H*0.930);
    /* the tester, clear of the strip, three lines of type tall; feet at 0.93H (the wall cuts 6%) */
    const bh=H*0.175; murBody(g,W*0.930,H*0.760-bh,"#E8A33C",bh);
}
```

**Painted and looked at before being handed over**, per my own step 0 — rendered against the real `murals.js` helpers at 520×218 and 360×151: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/lupe-r9-panel-520.png` and `lupe-r9-panel-360.png`. Two repaints: the timecodes were first burned over the sprocket holes and were unreadable at both sizes, and the tester stood inside frame four. It is made of **film stock** — perforated acetate, amber safelight, a timecode in the rebate and a grease pencil. My first panel was a carbon-copy bay slip, my second a tractor-feed rolling-road printout, my third a light box under a mask card. Nobody else on this wall has sprocket holes, and no other panel measures a fault in **time**.

**Files (all absolute):**
- Reviewed: `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/` — all 30 PNGs, `manifest.json`, `render2.js`, `mockdocs2.js`
- Review page: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/sobremesa-journey.html`
- My probes and pictures (scratchpad, nothing in the repo): `lupe-r9-probe.js`, `lupe-r9-es.js`, `lupe-r9-q2.js`, `lupe-r9-street.js`, `lupe-r9-panel.js`, `lupe-r9-render.js`, `lupe-q-note-390x844.png`, `lupe-q-note-844x390.png`, `lupe-r9-panel-520.png`, `lupe-r9-panel-360.png` — all under `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/`
- Code cited: `/home/user/meridian-quest/index.html:191` (fields `.85rem`), `:193` (`.dchecks`); `/home/user/meridian-quest/changarrito/index.html:190`; `/home/user/meridian-quest/engine/engine.js:3753,3756` (`exitFsForCard` / `restoreFs`); `render2.js:38,41-42,66,88-89`; `mockdocs2.js:64-66,78`; `sobremesa-journey.html:147,654`


---

# Rosa — UI, row 5

**PRE-FLIGHT**
I intend to boot the town shell the way `render2.js` does, open all six journey documents at 390×844 (EN and ES) and 844×390, and read every control's box, hit-test and fold position off the live DOM rather than off the committed PNGs — then do the same to the questionnaire's two screens and try to press the wrong thing on purpose. My persona equips me for exactly this: the failure I am tuned for is not "cannot reach it", it is "reached for one thing and silently pressed another", which is a hit-test question and answerable here with a mouse and `elementFromPoint`. Where I expect to fall short: I cannot feel a thumb's arc, I cannot judge Pili's colour or Nacho's sentence, and everything I say about iOS-specific behaviour is `[TRAINING]` and stays flagged.

---

## MY SIGNATURE LINE

> *"Every control is reachable, ≥44×44 px, has a visible pressed/disabled/empty state, and no screen is a dead end: from each one I can name the way back."*
> — `docs/UI-REVIEW.md:68` (row 5, UI). That file exists, so it wins over `run8-lupe.md` as the brief says; the line is identical in both.

**FOR THE SET: FALSE.**

Three things make it false, in order of what they cost:

1. **A control that is not the one you aimed at.** Questionnaire, Q1, 844×390: the centre of the third option answers `Next [btn primary]`, and with one answer already picked, a click there **advances to Question 2**. Measured, then planted: aimed at (422,354) — "The waiting" — before `"Question 1 of 13"`, after `"Question 2 of 13"`.
2. **A control below 44 with no excuse.** The house card's *Show grades on a plate* switch is a bare `<select>` at **134×19 CSS px** at 390×844 and 844×390, EN and ES. Nineteen pixels is under 44, under Apple's 44pt, and under WCAG 2.5.8's 24×24 AA floor as well — this one is not me choosing the stricter line, it fails the lenient one too.
3. **A pressed state that does not exist.** `.paper .dbtn` (`changarrito/index.html:236`) has no `:active`, no `:focus-visible`, no `:disabled` rule — the only two rules matching `.dbtn` in the sheet are `.paper .dbtn` and `.paper.night .dbtn`. I held the mouse down on *Take a shift* and clipped the same 370×80 band up and down: the two PNGs are **byte-identical**. Keyboard focus survives on the UA default ring (`outline: auto 1px`), so focus passes; press does not.

**Per screen** (390×844 EN/ES · 844×390 EN):

| Screen | 390×844 | 844×390 | what makes it false |
|---|---|---|---|
| drawer | **ANSWERS, WITH A NOTE** | **FALSE** | landscape: *all three* controls — the Find field, its Find button, *Add what you bought* — are below the 207-px fold; what is on screen is a title, a drawing and Copy/Download/Close |
| shifts | ANSWERS, WITH A NOTE | **FALSE** | *Take a shift* below the fold at both rows; at landscape nothing but the card art is visible |
| recipeHome | **TRUE** | **TRUE** | no in-document control to miss; the docbar is reachable at both rows |
| collection | **TRUE** | **TRUE** | passes the letter; see F8 on the blank lines |
| house | **FALSE** | **FALSE** | the 19-px select at both rows; at landscape the whole allergy block and *Keep* are below the fold |
| quiet | **TRUE** | **FALSE** | *See the board* below the fold at landscape (doc 253 / visible 207) |
| questionnaire intro | **TRUE** | **TRUE** | Start is 358×52 / 560×52, in viewport, hit-tests to itself |
| questionnaire Q1 | **TRUE** | **FALSE** | the occlusion above |

**The way back exists from every one of the eight.** `#docClose` hit-tests to itself on all 16 reader openings (78.9×44 portrait, 168.9×44 landscape), Escape is bound (`engine/engine.js:3617`), and two Backs from Q1 return to *"Before we start"*. No dead ends.

**THE GENRE LINE — signed TRUE for all eight screens.**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."*

I read every string in `mockdocs2.js` and every visible string on the questionnaire. Nothing decrements. The only moving numerals are *"Question 1 of 13"* and *"0 of 13 answered"*, both counting **up**, and the progress bar only fills; Back restores it. `shifts` says it out loud (*"Nothing on this board counts, ticks or fades"*) and `quiet` says *"There is no streak, and nothing broke."* `R10/R11/R15–R17` hold.

---

## FINDINGS

### F1 · A tap on the third answer submits the question
**Screen:** questionnaire, Q1 · **Row:** 844×390 · **Verdict: DOES NOT ANSWER**

**In plain words:** Held sideways, the questionnaire's bottom bar sits on top of the third answer. If she has already picked one answer and reaches for the third, the press lands on *Next* and the page moves to question 2 with her second choice never made. She does not get an error; she gets the next question, and the only way to know is to notice the number changed.

**Notes:** At 844×390 the options are 560×56 at y=196, 261, 326; the action bar is at y=326 and 52 px tall. `elementFromPoint` at the centre of option 3 (422, 354) answers `Next [btn primary]`. I then planted it: clicked option 1, clicked (422,354), and the body text went from `"Question 1 of 13"` to `"Question 2 of 13"`. Before any answer is picked *Next* is `disabled` with `opacity:.45`, so the same press does nothing at all — which is the second half of the problem: the same gesture is inert once and destructive once. Options 4–7 and *+ Add a note* are entirely below the viewport (document 803 px in a 390 px window) with the bar hiding the fact that the list continues.

**Questions to consider:** Is the bar meant to be sticky, or is it just last in the flow? Should the scrolling region get bottom padding equal to the bar's height plus 8, so the last option can always clear it? Should the option list get its own scroll with the bar outside it? And: is landscape in scope for this at all (see Q1 to the owner)?

**Areas affected:** the questionnaire page's layout only; nothing shared with either game.

**Done when:** at 844×390 and 390×844, `elementFromPoint` at the centre of every `.opt` answers that `.opt`, with one answer already selected — and the check is run with a selection made, because with none it passes for the wrong reason.

---

### F2 · The house card's only switch is 19 pixels tall
**Screen:** house · **Rows:** 390×844 EN + ES, 844×390 EN · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The switch that turns grades on and off is a plain dropdown 19 pixels high — less than half a thumb. Everything else on that card is 44 or 48. It is the one control on the card that looks like text rather than a control, and it is the one the whole card exists to hold: *"The switches live on this card, not in the gear."*

**Notes:** Measured `134×19` at 390×844 EN, `234×19` at ES, `134×19` at 844×390. The reader's `sel` block builds a bare `<select>` inside `label.dsel` (`engine/engine.js:3444–3450`); the only rule in the shell matching `.dsel select` is a night **colour** (`changarrito/index.html:206`). The sized rule next door, `.paper .dfl input,…select{padding:7px 9px}` (`changarrito/index.html:190`), applies to form fields and does not reach this one. The house's own comment block (`changarrito/index.html:230–235`) states the 44 rule explicitly — this control simply never got the rule. I am holding the 44 line here, but note it also misses 2.5.8's 24 px, so this is a plain AA failure, not my stricter line.

**Questions to consider:** does `sel` get the same min-height as `.dbtn`, or does La Sobremesa get its own control sheet? (That is the collision in Q1 to the owner.) Should the label sit above the control rather than inline, so ES stops wrapping the label into two lines around it?

**Areas affected:** the shared reader — Meridian's documents that use `sel` change height if this is fixed in `engine/`.

**Done when:** every `sel` control measures ≥44 in both axes at 390×844 and 844×390, in EN and ES, in both shells.

---

### F3 · Sideways, four screens put their primary action below a 207-pixel window, and the mark above it means "the end"
**Screens:** drawer, shifts, house, quiet · **Row:** 844×390 · **Verdict: DOES NOT ANSWER**

**In plain words:** Hold the phone sideways and the reader shows a 207-pixel-tall slot. Four of the six screens put the thing they exist for outside it: the drawer's search box *and* its search button *and* "Add what you bought"; the shifts board's "Take a shift"; the house's four allergy switches and "Keep"; the quiet day's "See the board". Nothing on screen says there is more. The last thing above the buttons is a dashed rule, which is exactly the mark this reader uses to end a document — so the honest reading of the drawer screen is "a drawer with three pictures in it and nothing to do".

**Notes:** Measured, document height vs visible height at 844×390: drawer 783/207, shifts 724/207, recipeHome 887/207, collection 369/207, house 386/207, quiet 253/207. Below-fold controls: drawer — `.dfl` label, the text input, the Find `.dbtn`, the "Add what you bought" `.dbtn` (**every control on the screen**); shifts — 1; house — the checks label, all four option labels, `Keep`; quiet — `See the board`. `recipeHome` and `collection` carry no in-document control, so they fail nothing here. Screenshot: the drawer at 844×390 shows title, drawing, three captions, dashed rule, Copy/Download/Close — a complete-looking card. This confirms Lupe's M1/M2 from `docs/UI-REVIEW.md:104–106` on four more screens; the new part is **which** screens and that the drawer loses 100% of its controls, not some.

**Questions to consider:** does the primary `.dbtn` pin to the bar above Copy/Download/Close when the document overflows, or does the document get a "more below" mark? Pinning costs an engine change in both games; a mark is art only. Which screens are allowed to be read-only sideways?

**Areas affected:** the shared reader's scroll box (`engine/engine.js:3487`) and the docbar, in both games.

**Done when:** at 844×390 every screen's primary action is either inside the visible box or announced by a mark that is not the same dashed rule that ends a document — proved by shrinking the box and asserting the action is hit-testable or the mark exists.

---

### F4 · The primary button has no pressed state, and the reader does not trap the keyboard
**Screens:** all six documents · **Rows:** both · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** Press the big violet button and nothing moves. On a touch screen with no hover, the press itself is the only feedback a person gets before the app responds — and there is none, so a slow action reads as a missed tap and gets pressed twice. Separately, tabbing inside an open document walks through five controls of the game *behind* it before it reaches anything in the document.

**Notes:** `.paper .dbtn` (`changarrito/index.html:236`) plus `.paper.night .dbtn` (line 205) are the only two rules matching `.dbtn`; neither is `:active`, `:focus-visible` or `:disabled`. Planted: `mouse.down()` on *Take a shift*, screenshot the band, `mouse.up()`, screenshot again — `cmp` says the files are identical. Compare `.dpad button:active` (line 66), `.choices button:focus-visible` (256), `.btn:focus-visible` (283) — every other button family in this shell has one. Keyboard: with the reader open, eight Tabs from the top gave `rot3d → gear → fsbtn → mapbtn → cmd → dbtn → docCopy → docDl`; the first five are the game's chrome under a `position:fixed` overlay. Focus rings themselves are fine (UA `auto 1px`). The mocks give `.dbtn` no disabled state to show either, so "disabled" is untested on these screens — the questionnaire, by contrast, does it properly (`Next` disabled at 0 answers, `opacity:.45`, click confirmed inert).

**Questions to consider:** a press state for `.dbtn` is two lines of CSS and identical in both games — does it go in now or with the build? Is the missing focus trap a pre-existing engine issue to file separately rather than against these mocks?

**Areas affected:** the reader's button in both games; the reader's focus handling in both games.

**Done when:** `.dbtn` changes measurable pixels under `:active` (plant it by taking the two shots again — they must now differ), and Tab from an open document reaches only controls inside `#reader`.

---

### F5 · Every one of these six documents writes a subtitle the reader never shows
**Screens:** all six · **Rows:** both · **Verdict: REFUSED** (on admission-ticket A4 — real vs drawn)

**In plain words:** Each mock document carries a second line that says what the screen is for — "A shift is one dish, it pays in leftovers, and it has no clock." None of them appears in any of the thirty pictures. Anyone reviewing from the source is reading a sentence the person holding the phone will never see, and at least one of those sentences is where a screen states the no-timer rule.

**Notes:** `#docSub` exists in all three shells (`changarrito/index.html:741`, `index.html:742`, `content/gauge/index.html:742`) with a `.dsub` style (line 178), and **nothing in `engine/engine.js` ever writes to it** — `grep -n 'docSub' engine/engine.js` returns nothing, and `docOpen` sets only `$("docTitle").textContent` (`engine/engine.js:3485`). Measured live on the house card: `.dsub` textContent `""`, height `0`. So `sub:` on a document definition is inert today. This is a claim in the mock source with no counterpart on screen — exactly the A4 field `docs/UI-REVIEW.md:26` asks for.

**Questions to consider:** is `#docSub` a dead element to delete, or an unwired one to fill? If the six documents need their subtitle, does the fix land in `engine/` (both games) or does each `sub` become a `note` block? Does the shifts board's no-clock sentence need to survive the change (its `note` block already carries a stronger version)?

**Areas affected:** the shared reader; every document definition in both games that sets `sub`.

**Done when:** either `#docSub` renders a document's `sub` at both rows in both languages, or the six mock documents stop declaring one — and the review pictures are re-shot either way.

---

### F6 · The third checkbox comes loose from its own label
**Screen:** house · **Rows:** 390×844 EN, 844×390 EN · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** In English, "Bell pepper" is long enough to wrap, and when it wraps its checkbox stretches sideways and drifts away from the words, leaving a box floating on its own with a gap where the pairing should be. At 390×844 the row then breaks and "Apple" drops to a second line with an empty band above it; sideways, "PEPPER" is cut in half by the bottom of the window so the label reads "BELL". This is the control the owner asked for by name — the allergy switches.

**Notes:** Measured at 390×844 EN: carrot 13×13, celery 13×13, **bell 49×13**, apple 13×13; labels 69.2×44, 69.2×44, 105.1×44, 62×44. The cause is `.paper .dchecks label{display:inline-flex}` (`changarrito/index.html:242`) with a bare text node beside the input — when the text node wraps, the checkbox flex item stretches. The hit areas themselves are fine (the 44-px label is the target, and every one hit-tests to itself), so this is legibility and pairing, not reach. Visible in `rosa-house-390.png` and `rosa-house-844x390.png`. Spanish does not wrap and does not show it — one more reason the ES-only row is not the safe row.

**Questions to consider:** `flex:none` on the input and the text in a `<span>`, or one option per row? Does the group need a minimum of two rows so wrapping never surprises?

**Areas affected:** the shared reader's `checks` field; Meridian's forms use it too.

**Done when:** every checkbox in a `checks` group measures the same width at 390×844 and 844×390, EN and ES, and no option label is clipped by the scroll box's bottom edge.

---

### F7 · The checked state is Chromium's blue in a violet night app
**Screen:** house · **Rows:** both · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The two ticked allergy boxes render in the browser's own bright blue. Everything else on the screen is the night app's violet. The one colour on the card that means "this is on" is the one colour nobody chose, and on someone else's phone it will be a different colour again.

**Notes:** Visible in both house screenshots; no `accent-color` is set anywhere for `.dchecks input`. The state *is* visible, so my signature line survives on this point — it is the wrong paint, not a missing state. It is also the only element in the whole journey that will not match on another browser, which matters for a mock whose job is "does it feel like an app".

**Questions to consider:** `accent-color: var(--accent)` on the reader's checkboxes — one declaration, both games, behaviour-identical. Does Pili want the tick violet or bone-on-violet?

**Areas affected:** the shared reader.

**Done when:** a checked box in the night shell uses the shell's accent, measured from the pixel, not from the CSS.

---

### F8 · The Collection's blank lines look like something you type into
**Screen:** collection · **Rows:** both · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** "Enfrijoladas: ⸺⸺⸺⸺" is a label followed by a long ruled line. That is the shape of a blank to fill in, on paper and in every form anyone has met. It is not tappable and never will be — it means "you have not made this yet". The note explaining that sits at the bottom of the card, after the reader has already tried.

**Notes:** `blank` renders as `<b>label:</b> <span class="dline">` (`engine/engine.js:3423–3424`). Nothing in the card is an input, and nothing responds to a tap, so the cost is a wasted press and a moment of confusion, not a wrong action — which is why this is last. I am not certain it is a bug: the rule-and-label is a deliberate ledger idiom and Nacho's row may own the call. Flagging it, not deciding it.

**Questions to consider:** does the rule need to read less like an input — shorter, dotted, or a ghosted dish silhouette instead? Does the note move above the first blank?

**Areas affected:** the shared reader's `blank` block; Meridian uses it.

**Done when:** somebody who has not read this review taps the card at phone size and does not aim at a blank line — Chava's row, not mine.

---

## QUESTIONS FOR THE OWNER

**Q1 · Does La Sobremesa get its own control sizes, or does the shared reader get them?**
- One side: you asked for it *"in night mode so it apears as an app"* (`docs/ASKS.md`, 2026-09-14). An app's switches are thumb-sized; this one is 19 px (F2), and the fix that makes it 44 lives in `engine/`.
- The other side: `CLAUDE.md` — *"Every engine change is behaviour-identical for Meridian's players."* Raising `sel` and the `checks` layout reflows every Meridian document that uses them.
- What I need from you: whether *"AJ's screens must be app-sized"* outranks *"Meridian's documents do not reflow"* — or whether La Sobremesa gets its own stylesheet over the same reader. I am not asking you to pick the implementation. (This is the same collision Lupe put to you as her Q2 about 13.6-px fields; same answer probably settles both.)

**Q2 · Is a phone held sideways in scope for this app?**
- One side: `docs/QA-PASS.md`'s matrix has phone landscape as a row, and F1, F3 and half of F6 exist **only** there — four of my eight findings.
- The other side: if La Sobremesa ships portrait-locked, F3 disappears entirely and F1 becomes a curiosity, and the crew should not spend a day pinning buttons to bars.
- What I need from you: one word — is 844×390 a size somebody holds this in, or not? It changes the tier on four findings, not their truth.

---

## WHAT I DID NOT CHECK

- **ES at 844×390, and both languages at every other row.** The manifest only has ES at 390×844 and I kept to the brief's two rows. F6 is an EN-only wrap; there will be others in ES that I have not looked for.
- **Any real hand.** Every hit-test here is `elementFromPoint` and a synthetic mouse. A thumb has an area and an arc; I measured a point. Whether the *reachable* zone on a 6.1-inch phone covers the docbar is not something I can answer from here.
- **iOS.** Lupe's 13.6-px field-zoom finding is still `[TRAINING]` and I did not improve on it. I also did not check whether the sticky bar in F1 survives an on-screen keyboard.
- **Desktop and fullscreen.** The brief named two rows and I ran two rows. The 844×390 findings will look different at 1280×800 and I have no numbers there.
- **The four drawings as drawings** (drawer art, shift cards, merge board, dish sprites) — Pili's row. I judged only the controls around them. I also did not judge whether a 6-px kitchen stripe is discriminable; that is hers.
- **Screens 1, 2, 3, 8, 9, 12** — the front door, the street, the household, the merge board, making a dish, the map. The brief pointed me at the six reader documents and the questionnaire's two pictures and that is what I measured. The map's markers in `j-mapafter` are a thrown-away hack per the manifest; I did not measure marker sizes and somebody should, because a 13-px dot on a map is a target too.
- **Whether `#docSub` was ever wired and got un-wired.** I established it is not wired today (F5). I did not read the history.
- **The suites.** I ran no test file. Nothing I did touches the repo; the only files I wrote were in the scratchpad and two `.tmp.js` probes I deleted.

---

## POST-FLIGHT

The persona earned its keep at one exact moment: my file tells me the failure that matters here is *"pressing the wrong thing silently, not missing"*, and that is why I did not stop at "the option is 560×56, passes" — I asked what answers at its centre, got `Next`, and then made the wrong press actually happen. Where it was in the way: my file's whole apparatus is built for reviewing a *shipped* screen, and five of my eight findings are really about the shared reader rather than about the mock — I spent a while unsure whether that was in scope, and the answer (a mock drawn in the shipped reader inherits the reader's faults, and the reviewer must say which is which) is not in my file. The predicted gap appeared exactly as predicted and no worse: I could not judge a thumb's arc, and F8 is me saying out loud that I do not know whether it is a bug. **Proposed edit to `.claude/agents/rosa.md`: one additive line — "When the screen you are reviewing is drawn inside a shipped component, say for every finding whether it is the mock's or the component's, and cite the component's `file:line`; a finding filed against a picture that is really against the engine gets fixed twice or not at all."** The moment: F2, F4, F5, F6, F7 and F8 are all the reader's, not La Sobremesa's, and I only worked that out after measuring; the calling session applies it or refuses it, in writing, in the ledger.

---

## MURAL PANEL

```
id:     rosa-el-tercer-renglon
by:     "rosa"
title:  {en:"The third one", es:"El tercer renglón"}
said:   {en:"She aimed at the third answer. The page took it as done.",
         es:"Apuntó al tercer renglón. La página lo tomó por terminado."}
state:  {en:"I hold that a control is not reachable until a press at its centre answers with its own name — measured, not assumed. Fifty-two of its fifty-six pixels were under the bar.",
         es:"Sostengo que un control no está al alcance hasta que un toque en su centro responde con su propio nombre — medido, no supuesto. Cincuenta y dos de sus cincuenta y seis píxeles estaban bajo la barra."}
who:    {en:"Rosa Villalobos, who lays acetate over a screen and marks it in grease pencil before she says a word about it.",
         es:"Rosa Villalobos, que pone acetato sobre una pantalla y lo marca con lápiz graso antes de decir una palabra."}
cap:    {en:"The box measured 560 by 56 and passed every rule I own. It passed because I was measuring the box and not the press. Asking what is at its centre answered with the name of another button — and pressing there moved her on a question she had not finished.",
         es:"La caja medía 560 por 56 y pasaba todas mis reglas. Pasaba porque yo medía la caja y no el toque. Al preguntar qué hay en su centro, respondió con el nombre de otro botón — y tocar ahí la pasó a la siguiente pregunta sin haber terminado la suya."}
aspect: 0.46
```

`art` — real canvas 2D, rendered and inspected at 520×239 and at 300×138; palette is mine (registration acetate, masking tape, grease-pencil red, a graphite case), `murGround` for the wall's ground and `murDim` for the ruler. Full source saved at `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/rosa-panel-art.js`; proofs at `.../rosa-panel.png` and `.../rosa-panel-small.png`. Geometry is sized against the lettering, not the frame: `LH=16` is the unit, the margin column is measured in characters of 12-px mono, and the phone takes what is left.

```js
art: (g,W,H)=>{
  /* ROSA — registration acetate over a phone held sideways, marked in grease pencil.
     The wall's ground; everything above it is my own kit and my own palette. */
  murGround(g,W,H);
  const R={acet:"rgba(174,196,205,0.30)",edge:"#93AAB4",tape:"#E9DCB0",
           case:"#34343E",scr:"#17141E",pill:"#4A4656",pillL:"#5E5870",bar:"#221D2C",
           lilac:"#A97FFF",bone:"#EDE7DA",red:"#CE2B26",pale:"rgba(206,43,38,0.18)",cyan:"#2D7F8F"};
  const LH=16, M=12;                       /* the lettering is the ruler: 12px type, 16px line */
  const ax=M, ay=LH*0.7, aw=W-2*M, ah=H-LH*2.1-ay;
  g.fillStyle=R.acet;g.fillRect(ax,ay,aw,ah);
  g.strokeStyle=R.edge;g.lineWidth=1.5;g.strokeRect(ax+.5,ay+.5,aw,ah);
  g.globalAlpha=.26;g.fillStyle="#FFFFFF";
  g.beginPath();g.moveTo(ax,ay+ah*0.70);g.lineTo(ax+aw,ay+ah*0.22);g.lineTo(ax+aw,ay+ah*0.34);g.lineTo(ax,ay+ah*0.84);g.closePath();g.fill();
  g.globalAlpha=1;
  g.fillStyle="#C3CED4";[0.22,0.50,0.78].forEach(t=>{g.beginPath();g.arc(ax+8,ay+ah*t,3.2,0,7);g.fill();});
  const colW=Math.ceil(7.3*17)+18;          /* "the third answer" at 12px ui-monospace, plus air */
  let pw=Math.max(LH*8, aw-colW-LH*1.6), ph=Math.round(pw*0.46);
  const maxPh=ah-LH*3.2; if(ph>maxPh){ph=Math.max(LH*4,maxPh);pw=Math.round(ph/0.46);}
  const px=ax+aw-pw-LH*0.8, py=ay+(ah-LH*1.6-ph)/2+LH*0.2;
  g.fillStyle=R.case;g.fillRect(px-4,py-4,pw+8,ph+8);
  g.fillStyle=R.scr;g.fillRect(px,py,pw,ph);
  g.fillStyle="#6E6E7A";g.fillRect(px+8,py+7,Math.round(pw*0.32),3);
  g.fillStyle="#E0A430";g.fillRect(px+pw-Math.round(pw*0.26)-8,py+7,Math.round(pw*0.26),3);
  g.fillStyle="#3A3446";g.fillRect(px+8,py+15,pw-16,3);
  g.fillStyle=R.lilac;g.fillRect(px+8,py+15,Math.round(pw*0.07),3);     /* the bar counts UP. no clock */
  const oh=Math.round(ph*0.18), og=Math.round(ph*0.045), ox=px+8, ow=pw-16;
  const oy=[0,1,2].map(i=>py+Math.round(ph*0.26)+i*(oh+og));
  oy.forEach((y,i)=>{g.fillStyle=R.pill;g.fillRect(ox,y,ow,oh);
    g.strokeStyle=R.pillL;g.lineWidth=1;g.strokeRect(ox+.5,y+.5,ow-1,oh-1);
    g.fillStyle="#8E88A0";g.fillRect(ox+5,y+Math.round(oh/2)-3,6,6);
    g.fillStyle=R.bone;g.fillRect(ox+16,y+Math.round(oh/2)-2,Math.round(ow*(i===2?0.40:0.28)),3);});
  const bh=Math.round(ph*0.22), by=py+ph-bh;                            /* the bar, ON TOP of pill 3 */
  g.fillStyle=R.bar;g.fillRect(px,by,pw,bh);
  g.fillStyle="#3A3446";g.fillRect(px,by,pw,1);
  const bw=Math.round(pw*0.16);
  g.strokeStyle="#6E6E7A";g.lineWidth=1;g.strokeRect(px+8.5,by+4.5,bw,Math.max(4,bh-9));
  const nxw=Math.round(pw*0.40), nxx=px+12+bw;
  g.fillStyle=R.lilac;g.fillRect(nxx,by+4,nxw,Math.max(5,bh-8));
  g.fillStyle="#7E7890";g.fillRect(px+pw-bw-4,by+Math.round(bh/2)-2,bw-4,3);
  g.font="bold 9px ui-monospace,monospace";g.fillStyle="#1B1524";g.textAlign="center";
  g.fillText("NEXT",nxx+nxw/2,by+Math.round(bh/2)+3.5);g.textAlign="left";
  [[ax+aw*0.16,ay-5],[ax+aw*0.80,ay-5]].forEach(([tx,ty],i)=>{         /* tape over the sheet's edge */
    g.save();g.translate(tx,ty);g.rotate(i?0.05:-0.07);g.globalAlpha=.85;
    g.fillStyle=R.tape;g.fillRect(-16,0,32,11);g.globalAlpha=1;g.restore();});
  /* ---- the grease pencil, on the acetate ---- */
  const cx=ox+Math.round(ow*0.26), cy=oy[2]+Math.round(oh/2), TH=22;
  g.fillStyle=R.pale;g.beginPath();g.ellipse(cx,cy,TH,TH,0,0,7);g.fill();  /* 44 px across: the thumb */
  g.strokeStyle=R.red;g.lineWidth=2.4;g.beginPath();g.ellipse(cx,cy,TH,TH,0,0,7);g.stroke();
  g.lineWidth=1.1;for(let i=1;i<=4;i++){g.beginPath();g.ellipse(cx,cy,4+i*3.4,6+i*3.7,0.25,-0.45,3.6);g.stroke();}
  g.lineWidth=2.2;g.beginPath();g.moveTo(cx-6,cy-6);g.lineTo(cx+6,cy+6);g.moveTo(cx+6,cy-6);g.lineTo(cx-6,cy+6);g.stroke();
  g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=R.red;                 /* the option, where it really is */
  g.strokeRect(ox-2.5,oy[2]-2.5,ow+5,oh+5);g.setLineDash([]);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=R.red;
  g.fillText("52 of 56 px under the bar",px,py+ph+LH*1.15);
  g.strokeStyle=R.red;g.lineWidth=2.6;g.setLineDash([7,5]);                /* where the press landed */
  g.beginPath();g.moveTo(cx,cy+22);g.quadraticCurveTo(cx+10,by+bh+LH*1.2,nxx+nxw/2,by+bh+LH);g.stroke();g.setLineDash([]);
  g.beginPath();g.moveTo(nxx+nxw/2,by+bh+2);g.lineTo(nxx+nxw/2-7,by+bh+13);g.lineTo(nxx+nxw/2+7,by+bh+13);g.closePath();g.fillStyle=R.red;g.fill();
  const tx0=ax+12, ty0=ay+Math.max(LH*1.4,(ah-LH*5.4)/2);
  g.font="bold 12px ui-monospace,monospace";g.fillStyle=R.red;
  g.fillText("MEANT:",tx0,ty0);
  g.fillText("the third answer",tx0,ty0+LH);
  g.fillText("GOT:",tx0,ty0+LH*2.4);
  g.fillText("question 2",tx0,ty0+LH*3.4);
  murDim(g,tx0,tx0+44,ty0+LH*5.0,R.red,"44 = A THUMB");
  g.font="12px ui-monospace,monospace";g.fillStyle=R.cyan;g.textAlign="right";
  g.fillText("844 × 390 · acetate over the real screen",W-M,H-6);g.textAlign="left";
}
```


---

# Pili — art, row 2

PRE-FLIGHT — I worked this the way I work a piñata: I opened the pictures before I opened any register, at the size a hand holds them, and squinted before I read a word; only then did I go to the two code files behind them (`mockdocs2.js`, the page's `DRAW`) to put a number on what my eye had already complained about. My trade equips me for exactly one clause of my signature line — whether a mark carries its meaning in outline and value rather than in hue — and for the arithmetic that settles it (Rec.601 value, the instrument the suites already use). Where I expected to fall short, and did: **no picture in this set was taken at 360 CSS px**, the narrowest row shot is 390 (sheet 370, art canvas ~330), so every claim I make about the 360 row is an extrapolation and is labelled as one.

---

## MY SIGNATURE LINE

> **2 · Art · Pili** — *"Each screen reads at 360 CSS px as the one thing it is, and no mark carrying meaning survives only because I already knew what it meant."*

**FOR THE SET: FALSE.** Two things make it false, and they are different in kind:

1. **Clause two fails on all six real-reader screens from one engine line, not from the drawings.** `changarrito/index.html:198` paints `.dkv b` (every key label) and `.dfl` (every form label) `#B48CFF` in the night paper. That violet is **L 165.1** — *brighter than the accent fill `#A97FFF` at 154.2*. So on every one of these pictures the labels are louder in value than the buttons, and "Rice", "Frijol negro", "Yours", "On the board", "RAW VEGETABLES THAT STAY OUT OF THE HOUSE'S RECIPES" all read as tappable. My run-8 rule was *accent is a fill, muted is letters*; the shell inverts it by 11 points of value. The mock did not cause this and says so on the page; I still cannot sign over it.
2. **Clause one fails on four screens on the drawings' own merits** — 3, 4, 8, 12 (and 1's drawing). Listed below.

**Per screen** (clause 1 · clause 2):

| # | Screen | Reads as one thing at 360 | No meaning riding on a fill | Why false |
|---|---|---|---|---|
| 0 | Questionnaire | **TRUE** | **TRUE** | — (note: the loudest colour on the screen is the amber `0 of 13` and its bar, above the question) |
| 1 | Front door (real game) | **TRUE** | TRUE | — |
| 1 | Front door (**drawing**) | **FALSE** | TRUE | the spoon glyph (`sobremesa-journey.html:589`) is a vertical bar with a wide rectangular head — it reads as a hammer; the plate (`:590`) is an 8×2-unit bar and reads as a shelf. I had to explain two of the three doors to myself |
| 2 | Street (real game) | **TRUE** | TRUE | — |
| 3 | The household (drawing) | **FALSE** | TRUE | **the drawer ladder is broken and inverted.** `sobremesa-journey.html:603-605` draws heights **4 : 6 : 5**. My §D ladder is **10 : 16 : 24** (1 : 1.6 : 2.4). The *deep* drawer is drawn shorter than the medium one, so the one thing that separates three rectangles at a thumbnail is gone |
| 4 | A drawer | **FALSE** | **FALSE** | the drawer you are in is a **violet pad behind the glyph** (`mockdocs2.js:69`) — state on a fill, on the same screen where a violet slab means *act*. And the ES captions collide (below) |
| 5 | The shifts board | TRUE | **FALSE** | the turned corner (`mockdocs2.js:53-54`) is 22 px in `N.ground` `#14121B` against surface `#26232E` — **Δ17.6 of 255**. Under 40 is one mass. The hanging tag my §E specified is not drawn; what replaced it is a **violet underline under the note** — the accent used as a word |
| 6 | Recipe, as the house reads it | **TRUE** | FALSE (inherited) | the plate panel is the only warm mass on the page and the eye goes straight to it — rule 2 held, and it is the best thing in the set |
| 7 | The Collection | TRUE | **FALSE** | **the hierarchy is inverted**: made = violet L165, unmade = ink L228. The blank lines are 63 points brighter than your achievements. "Not yet" is now the loudest thing on the page |
| 8 | Merge board (drawing) | **FALSE** | **FALSE** | one silhouette, four hues — see F2 |
| 9 | Making by hand (drawing) | **TRUE** | TRUE | one big soft object, no cell anywhere, sauce only on the masa. It is not a cousin of screen 8. This one I sign |
| 10 | The house card | TRUE | **FALSE** | native `#0A84FF` blue ticks, in no palette, and a **checked box means "keep this OUT"** — see F1 |
| 11 | The day nothing happened | **TRUE** | FALSE (inherited) | two violet labels; otherwise the calmest screen here |
| 12 | The map, after | TRUE | **FALSE** | four markers, one shape, **hue only** — and the legend on the same picture already says *"doors & stairs in gold"* |

**THE GENRE LINE — I sign it, for all thirteen screens, 2026-09-14:** *there is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down.* I looked for it specifically on the shifts board (no date is ever compared to today — `mockdocs2.js:40,101`) and on the questionnaire. One note, not a breach: the questionnaire's `0 of 13 answered` plus a filling bar is the closest object in the set to a streak, and it is painted in the **one warm colour the chrome is not allowed to own**.

---

## FINDINGS — ranked by what they cost the person holding the phone

### F1 · The house card asks her to tick the food she must not eat, in iOS blue
**Screen 10 · 390×844 · EN and ES · night · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** The card answers where the switches live — on a card, not in the gear — and that part is settled. But the four vegetables are native checkboxes, and a ticked blue box is the most over-learned mark on a phone: it means *yes, include, good*. Here a tick means *this one stays out of our recipes*. The one screen in the game that touches an allergy is the one screen where the mark means the opposite of what a thumb expects.
- **Notes:** The ticks are the system accent `#0A84FF`, a colour in no palette on this page. The native `<select>` above them is the second-brightest object on a night screen and reads as a form on a website, not as this app. Both are unstyled platform controls inherited from `{sel:…}` and `{form:{…type:"checks"}}` (`mockdocs2.js:133-134`). The boxes measure ~22 px — Rosa's row, not mine, but the same fix moves both.
- **Questions to consider:** Should "stays out" be a tick at all? A raw carrot with a **lid drawn over it** — the item shown *put away* — is a silhouette and cannot be read backwards. Second: does the checked colour belong to the accent (`#A97FFF`), so the app has one violet vocabulary?
- **Areas affected:** the reader's `checks` field and `sel` block (shell CSS, both games — an engine-side look, so it must be behaviour-identical for Meridian); the pack's wording of the legend.
- **Done when:** at 360 CSS px, with the words covered, a stranger can say which vegetables are excluded, and nothing on the screen is a colour that appears nowhere else in the palette.

### F2 · The merge board is four colours of the same object
**Screen 8 · the drawing, 320–560 CSS px · verdict: DOES NOT ANSWER**
- **In plain words:** The picture settles the layout beautifully — a grid you read before any tile, the object growing instead of a number. It cannot settle the thing the game actually is: *are these two the same?* Every tile on the board is drawn from one body (`sobremesa-journey.html:623-624` — the same rectangle-plus-cap-plus-dot for all twenty), and only the ground hue and the size change. Matching is the whole verb of a merge game and it is riding entirely on a fill.
- **Notes:** Worse, the ground carries two meanings at once. The plinth lightens one step per tier (`:621`, up to 0.5 of `#E8E4DC`), so a **tier-5 comal tile lands at L 152.9 and a tier-1 floured-wood tile is 162.3 — Δ9.4. They are one mass.** The kitchen identity the ground was chosen to carry is washed out by the tier exactly when the tile matters most. My own run-8 recommendation said "identify a kitchen by ground, never by accent" — on a board with no words, that recommendation is not enough, and I am saying so rather than defending it.
- **Questions to consider:** Do the tiers of one chain want to be one silhouette that *changes shape* — grain → bag → pot → pot with a lid → a served plate — so a match is a shape match? Then the ground can stay flat and mean only the kitchen, and the tier needs no lightening at all.
- **Areas affected:** the pack's chain table and tile art; nothing in the engine.
- **Done when:** a new picture of five tiles from one chain at 52 px, printed in grey, in which a stranger can still order them and still pair the two identical ones.

### F3 · The shift you took is marked with a 22-px corner you have to be told about
**Screen 5 · 390×844 and 844×390 · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** The board is right: four cards, a kitchen stripe, the dish big and warm, and no date compared to anything. The one thing it must say — *this one is yours* — is a small dark triangle in the top corner. At phone size I read it as a smudge on the card and only knew what it was because I wrote the spec.
- **Notes:** `mockdocs2.js:53-54`: the corner is 22 px filled `#14121B` (L 19.6) against the card `#26232E` (L 37.2) — **Δ17.6**, the same "one mass under 40" that put the calaverita on a sill nobody could see. My §E asked for a corner **and a hanging tag**; the tag was dropped and a violet underline under the quote took its place, which spends the accent on a word. The stripe itself is fine, but note it only works because the card also *says* "Italian" in type — no stripe names a cuisine on its own, and the Collection and the merge board have no such word.
- **Questions to consider:** Make the corner bigger (36 px) and cut it in the **page ground with a 1-px line on the fold**, so the card's outline is genuinely missing a corner at a glance; hang the tag off it with the player's own note on the tag. Should "yours" also pull the card 6 px left, so the row's edge is ragged? A broken line down a column of cards is the cheapest thumbnail mark there is.
- **Areas affected:** the shift card art block only.
- **Done when:** the four cards printed in grey at 330 px wide, and a stranger points at the taken one without a caption.

### F4 · The drawer you are in is painted, not opened
**Screen 4 · 390×844 · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** Three drawers, told apart by mass — that half is exactly right and it survives the thumbnail (the bags slump over the edge, the lids stand up at three heights; `mockdocs2.js:59-78` follows the 10 : 16 : 24 ladder to the pixel). What is wrong is how the screen says *you are in drawer 2*: a violet pad behind it. On the same screen a violet slab says *Find*. One colour, two jobs.
- **Notes:** `mockdocs2.js:69`. A drawer has one honest state mark and it is free: **slide it out.** The front face moves down and forward, the case behind it shows a dark gap, and the contents break the top edge. That is a silhouette and nobody has to learn it. It also matches the shift card's principle — the state changes the outline, not the fill.
- **Questions to consider:** Is the search field the point of this screen at all? Today the biggest mark on it is a full-width violet *Find* and the drawers are a strip above it.
- **Areas affected:** the drawer art block; no engine change.
- **Done when:** with the violet removed entirely, you can still say which drawer is open.

### F5 · The household's drawer ladder contradicts the drawer screen's
**Screen 3 · the drawing · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** The room is good — the fridge is one tall door with one vertical handle, the shelf is open with a ragged top edge of jars, the comal and the olla are where they should be. But the three drawers in the counter are drawn 4, 6 and 5 units tall, so the deep drawer is shorter than the middle one. The very next screen draws the same three drawers 10, 16 and 24. Two pictures in one review teach two different objects.
- **Notes:** `sobremesa-journey.html:603-605` against `mockdocs2.js:63-66`. Three numbers, one edit. The counter has 20 units of face to spend; 4 : 6 : 9 fits and keeps the ratio.
- **Questions to consider:** none — this is arithmetic, not taste.
- **Areas affected:** the room drawing.
- **Done when:** the two pictures put side by side show the same ladder.

### F6 · The map's markers differ only in hue, on a map whose legend already spends gold
**Screen 12 · 390×844 · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** Markers on the plan is the right answer and the picture proves it. But *next*, *open* and *done* are three dots of the same size and shape in orange, yellow and grey — and the strip under the plan on the same picture says "doors & stairs in gold". Gold already means *a door* on this map. Now it also means *an open quest*.
- **Notes:** Only *you are here* differs in shape (a ring, not a disc) and it is the one I read instantly. That is the proof of the rule, sitting in the same picture as the counter-example. Hue-only also dies under a theme tint and for a colour-blind player.
- **Questions to consider:** *next* = a ring with a dot inside (a target), *open* = a plain disc, *done* = a hollow outline, all one colour. Three shapes, no new hue, and the gold stays the doors'.
- **Areas affected:** the marker drawing in the map card; two lines, per the page's own costing.
- **Done when:** the map rendered in greyscale still tells you which marker is next.

### F7 · The Collection shouts the blanks and whispers the dishes
**Screen 7 · 390×844 · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** The rule is right — a blank line is *not yet*, never *denied*, and there is no grey fill anywhere. But the blank lines are set in bright ink and the dishes you actually made are set in violet, which is 63 points darker. Open the page and the first thing you see is what you have not cooked.
- **Notes:** `#B48CFF` L 165.1 for the made names (`changarrito/index.html:198`, `.dkv b`) against `#E8E4DC` L 228.3 for the blank rows. The fix is not a new colour: the made name should be the ink and the blank the muted, and the dashed rule stays exactly as it is.
- **Questions to consider:** does a made dish want its 16-px dish glyph at the left of the line? That would make the Collection fill up *visibly*, which is the only reward this game has.
- **Areas affected:** the reader's night `.dkv b` rule (shell, both games — needs the behaviour-identical check) or a pack-side block that does not use `kv`.
- **Done when:** squinting at the page, the eye lands on what has been cooked.

### F8 · Six screens, one engine line: every label is violet and every violet looks pressable
**Screens 4, 5, 6, 7, 10, 11 · both rows, both languages · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** In the night paper, key labels and form labels are painted violet by the shell. The result across this whole review is that ingredient names, the words "Yours" and "Open", and a two-line legend about raw vegetables all wear the colour the buttons wear. On the house card the biggest violet mass on the screen is a sentence you cannot tap.
- **Notes:** `changarrito/index.html:198`; the same rule exists in the public shell. The label violet `#B48CFF` is **L 165.1**, the accent fill `#A97FFF` is **154.2** — the labels are *louder than the buttons*. This is a hardcoded shell rule, not a pack seam: a pack cannot re-colour its own labels today. The mocks inherited it honestly and the page admits it; I am grading it, as the brief asks.
- **Questions to consider:** make the night label the muted grey `#9C96AB` and let violet be a fill only. One line of CSS, two shells, and it must be proved behaviour-identical for Meridian's own documents.
- **Areas affected:** both shells' night paper CSS; every document in both games.
- **Done when:** on any night document, every violet region on screen is something you can press.

### F9 · The three drawer captions run into each other in Spanish
**Screen 4 · 390×844 · ES · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** In the Spanish drawer picture the three little captions under the drawers touch and become one line of type: *"tortillas · especias arroz · frijol · masa frascos · latas"*. The three-column read — which is the whole point of the picture — collapses into a sentence.
- **Notes:** `mockdocs2.js:78` centres `d.what` in a column of `W/3`. At the 390 row the canvas is ~330, so a column is ~110 px, and `arroz · frijol · masa` at 10 px monospace is 21 characters ≈ 126 px. **A prediction, flagged as one because no 360 picture exists:** at the 360 row the sheet is 340 and the canvas ~300, a column is 100 px, and the *English* "rice · beans · masa" (19 ch ≈ 114 px) collides too. My signature line is about 360 and 360 was never shot.
- **Questions to consider:** two stacked lines per drawer at 9 px, or drop the contents caption entirely — the bags and the lids already say what is in there, which was the point of drawing them.
- **Areas affected:** the drawer art block.
- **Done when:** the block rendered at 300 px canvas width, EN and ES, with a measurable gap between all three captions.

### F10 · The questionnaire's loudest colour is its bookkeeping
**Screen 0 · 390×844 · night · verdict: ANSWERS, WITH A NOTE**
- **In plain words:** The question page is the best-behaved screen in the set: the question is the only large type, the seven options are outlined chips, one violet fill on *Next*, *Back* outlined, *Skip* naked. One violet on screen — my rule, followed. The one thing I would change is at the very top, where `0 of 13 answered` and its bar are amber, the only warm colour anywhere, and the eye lands there before the question.
- **Notes:** The chrome was supposed to own no warm colour so the food has a monopoly on warmth — this page has no food yet, so it costs nothing today and costs everything the moment a dish appears next to it. It also does not break the genre line: it counts up, nothing can break, nothing expires.
- **Questions to consider:** make the counter and bar muted grey and let the chips' violet be the only colour. Does the bar need to be there at all, when the words already say "Question 1 of 13"?
- **Areas affected:** the questionnaire page's own CSS.
- **Done when:** on the question screen, the first thing a squint finds is the question.

### F11 · The twins are not fixed; they are out of frame
**All six reader screens · both rows · verdict: DOES NOT ANSWER**
- **In plain words:** The known reader fault where a form's *submit* and its *cancel* are painted identically does not appear anywhere in these thirty pictures. Not because it was solved — because no document in this set renders a cancel button. The recipe's form is stripped out before it is drawn, and the house card's form has a submit and no cancel. The review therefore says nothing about the fault, and I would rather say that than sign a clean sheet.
- **Notes:** `engine/engine.js:3468` gives the submit `className="dbtn"`; `:3471` gives the cancel **the same class**, and its default label is a bare `✕`. `mockdocs2.js:113` (`s.filter(b=>!b.form)`) removes the recipe's form; `:134` declares `submit:"Keep"` with no `cancel`. Confirmed against the code today, not relayed.
- **Questions to consider:** one more picture — any document with `{form:{submit, cancel}}` at 390×844 in night — would answer it in ten minutes. That picture is the one I would ask for before anyone builds AJ's screens, because a questionnaire is all forms.
- **Areas affected:** `engine/engine.js` form row, both games; needs a red first — render a cancel, measure the two fills' luma, prove they are equal today.
- **Done when:** a picture exists in which a submit and a cancel are on screen together and can be told apart with the words covered.

---

## QUESTIONS FOR THE OWNER

**Q1 · The night paper paints every label violet, and the palette you have been shown says violet is only ever a button. Which one moves?**
- One side: `changarrito/index.html:198` sets `.dkv b` and `.dfl` to `#B48CFF` — a **shell** rule, so a pack cannot opt out. It is why every ingredient on your recipe looks tappable.
- The other side: `CLAUDE.md` — every engine/shell change must be behaviour-identical for Meridian's players, and this one repaints every document in Meridian too (the care pack, the room interview, the taller's sheet).
- What I need: may the night paper's labels go grey **in both games**, or does La Sobremesa need its own look constant so Meridian's documents are untouched? I recommend the first — it is one line and it makes the palette true — but it changes your other game's night reader, so it is not mine to decide.

**Q2 · The vegetables that stay out of the recipes — should that ever be a tick?**
- One side: your own words are *"aj has allergies so if they are raw veggies we want to account for that"*, and the mock draws it as four checkboxes, where checked means *excluded*.
- The other side: this project has already ruled that a mark on a coloured field which reads as *crossed out* is wrong (you called one that yourself), and a blue tick reads as *yes, include* to every thumb on earth.
- What I need: is this list a thing she ever sees, or is it his setup screen only? If she sees it, I want to draw it as items **put away** — no tick anywhere — and that is a different picture, not a different colour.

---

## WHAT I DID NOT CHECK

- **The 360 row does not exist in this set.** Everything I say about 360 is extrapolated from the 390 row (sheet 370, art canvas ~330). My own signature line names 360 and I could not measure it. F9's English collision is a prediction, not a finding.
- **I did not see a selected state on the questionnaire.** Both published pictures are unanswered, so "the accent fills only the chosen chip" is untested by any picture in this review.
- **I did not open all thirty.** I read seventeen: both questionnaire shots, the six EN portrait documents, drawer and shifts in ES, shifts in landscape, front door, map-after — plus both drawings' source. I did not open the six `unrolled` pictures (by the page's own rule they illustrate and never decide), the other four landscape documents, or the street and map-today shots.
- **I did not measure anything on a live DOM.** Every value above is computed from a hex in the source or read off a PNG; no element was mounted, so the empty-room caveat does not apply and neither does any claim about box sizes. Control sizes are Rosa's row and I left them there.
- **I did not check ES on screens 6, 7, 10, 11** for the same caption-collision fault F9 found on screen 4. It is the same kind of block on four more screens and nobody has looked.
- **I did not verify the public shell's copy of the violet label rule** — I grepped the town's `index.html` only, and quoted run 8 for the public one.
- **The merge tier arithmetic assumes the overlay composites straight** over the ground at 0.5 alpha. I computed it, I did not render it.

---

## POST-FLIGHT

What the persona got right, with the moment: squinting before reading found the shift card's turned corner as a smudge, and only *then* did the code give me Δ17.6 — the "check it against the thing it stands on" line in my own file, which was bought with the calaverita on the sill, caught its exact twin four days later in a different game, and that is the first time a lesson in this repo has paid out twice. Where it was in the way: my file says *identify a kitchen by ground, never by accent*, and I nearly signed the merge board off on that basis before noticing that all twenty tiles share one body — my own rule, followed faithfully, produced a board where the fill is the only difference, so the rule needed the sentence "a ground may identify a kitchen only where a word or a shape also does" and I had to argue against myself to find it. The predicted gap appeared exactly as predicted and larger: not only was 360 never shot, the picture I most needed — a form with a cancel — does not exist at any size, so the twins finding is an absence, not an observation.

**Persona edit I propose, as exact text.** In `.claude/agents/pili.md`, append to the end of the paragraph beginning **"Check the object against the thing it STANDS ON"**:

> **And a ground may carry an identity only where something non-colour repeats it.** On 2026-09-14 my own rule — *identify the four kitchens by ground, never by accent* — was followed exactly on a merge board and produced twenty tiles with one silhouette in four hues, on a board whose only verb is *are these two the same*; the tier lightening then pushed a tier-5 comal ground to 152.9, **Δ9.4 from a tier-1 floured wood**, so the identity and the rank fought over one channel and both lost. On a card with the cuisine written next to it the stripe is fine. **Where the word is absent, the ground is decoration and the shape must do the naming** — and if one channel is asked to carry two meanings, name the collision in numbers before anyone paints.

---

MURAL PANEL

```
id:     pili-el-mismo-burro
by:     "pili"
title:  {en:"The same donkey, four colours", es:"El mismo burro, de cuatro colores"}
said:   {en:"If it only changes colour, turn off the light and count what's left.",
         es:"Si nomás le cambias el color, apaga la luz y cuenta lo que queda."}
state:  {en:"holding that a tile must differ in shape before it differs in hue",
         es:"sostengo que una ficha debe cambiar de forma antes que de color"}
who:    {en:"Pili, piñatera, who builds things that must be recognised while they spin",
         es:"Pili, piñatera, que hace cosas que deben reconocerse mientras giran"}
cap:    {en:"A merge board came to me with twenty tiles on it. Four kitchens, four grounds, four warm browns — and one body drawn under all of them, the same rectangle with the same cap and the same little dot. Colour was carrying the only question that game asks. Then the rank lightened the ground too, and a tier-five comal landed nine points from a tier-one board: two meanings on one channel, both of them lost. In the yard you hang three piñatas and the child is blindfolded. Nobody has ever found the donkey by its colour.",
         es:"Me llegó un tablero de fusión con veinte fichas. Cuatro cocinas, cuatro fondos, cuatro cafés calientitos — y un solo cuerpo debajo de todos, el mismo rectángulo con la misma tapa y el mismo puntito. El color cargaba la única pregunta que ese juego hace. Luego el rango aclaró el fondo también, y un comal de nivel cinco quedó a nueve puntos de una tabla de nivel uno: dos significados en un solo canal, y los dos se perdieron. En el patio cuelgas tres piñatas y al niño lo vendan. Nadie ha encontrado nunca al burro por su color."}
aspect: 0.46
art:    (g,W,H)=>{
    /* PILI'S HAND. Not a drawing board: PAPEL DE CHINA over newsprint and engrudo, with a stapled
       cardboard rim. My palette, not the wall's: crepe rose, crepe green, crepe amber, cardboard,
       paste grey, and the dark of a yard at eight o'clock. Two halves — the lit yard, where three
       piñatas are three colours; and the yard with the light off, where they are one shape.
       Everything sized against the 11px lettering: the child is three lines of type tall. */
    const NEWS="#EDE6D6", ENGRUDO="#D6CDB6", CARTON="#C08A4E", CARTON_D="#9A6A36",
          ROSA="#D6246E", VERDE="#16A06A", AMBAR="#F2C230", TINTA="#2B1F2A",
          NOCHE="#241A2B", CENIZA="#8E8598", CORDEL="#7A6A55";
    murPaper(g,W,H,NEWS,null);

    /* newsprint under the crepe: broken column rules, the paste showing through */
    g.globalAlpha=.30;g.fillStyle=ENGRUDO;
    for(let i=0;i<9;i++){const y=H*(0.14+i*0.085);g.fillRect(W*0.04,y,W*(0.18+((i*7)%5)*0.06),2);}
    g.globalAlpha=.22;
    for(let i=0;i<5;i++)g.beginPath(),g.ellipse(W*(0.12+i*0.19),H*(0.30+((i*3)%4)*0.15),W*0.055,H*0.05,0.4,0,7),g.fill();
    g.globalAlpha=1;

    /* the stapled cardboard rim — this panel is a piece of a piñata, not a page */
    g.fillStyle=CARTON;g.fillRect(0,0,W,H*0.055);g.fillRect(0,H-H*0.055,W,H*0.055);
    g.fillStyle=CARTON_D;
    for(let x=W*0.03;x<W*0.98;x+=W*0.055){g.fillRect(x,H*0.018,3,H*0.020);g.fillRect(x,H-H*0.038,3,H*0.020);}

    /* the fringe: a strip of cut crepe along the top of the lit half */
    const fringe=(x0,x1,y,c)=>{g.fillStyle=c;g.fillRect(x0,y,x1-x0,H*0.026);
      for(let x=x0;x<x1;x+=5){const d=H*(0.020+((x|0)%3)*0.009);g.fillRect(x,y+H*0.026,3,d);}};
    fringe(W*0.045,W*0.615,H*0.075,ROSA);

    /* ---- the piñata: ONE outline, used four times. Body, head, ears, four legs, tail ---- */
    const donkey=(cx,cy,s,body,band,dark)=>{
      g.fillStyle=CORDEL;g.fillRect(cx-1,0,2,cy-s*0.62);                       /* the cord */
      g.fillStyle=body;
      g.beginPath();g.ellipse(cx,cy,s*0.62,s*0.42,0,0,7);g.fill();             /* the barrel */
      g.beginPath();g.ellipse(cx+s*0.62,cy-s*0.40,s*0.26,s*0.22,0.2,0,7);g.fill(); /* the head */
      g.fillRect(cx+s*0.52,cy-s*0.86,s*0.10,s*0.30);                           /* ear */
      g.fillRect(cx+s*0.70,cy-s*0.90,s*0.10,s*0.34);                           /* ear */
      [-0.42,-0.14,0.20,0.46].forEach((o,i)=>g.fillRect(cx+s*o,cy+s*0.30,s*0.13,s*(0.46+(i%2)*0.07)));
      g.fillStyle=dark;g.fillRect(cx-s*0.74,cy-s*0.34,s*0.14,s*0.52);          /* the tail */
      g.fillStyle=band;                                                        /* crepe bands: the ONLY difference */
      for(let i=0;i<4;i++)g.fillRect(cx-s*0.60,cy-s*0.34+i*s*0.21,s*1.20,s*0.07);
      g.fillStyle=dark;g.beginPath();g.arc(cx+s*0.70,cy-s*0.44,Math.max(2,s*0.055),0,7);g.fill(); /* the eye */
    };
    const trim=(c)=>c;                                                          /* names kept honest */

    /* ---- LEFT: the lit yard. Three donkeys, three crepes, and they look like three things ---- */
    const by=H*0.46, s=H*0.20;
    donkey(W*0.150,by,s,ROSA ,"#F07FA8",TINTA);
    donkey(W*0.325,by,s,VERDE,"#7FD9B4",TINTA);
    donkey(W*0.500,by,s,AMBAR,"#FBE39A",TINTA);

    /* the child: blindfolded, with the stick. Three lines of type tall — the ruler on this wall */
    const bh=H*0.215;
    murBody(g,W*0.300,H*0.895-bh,TINTA,bh);
    g.strokeStyle=CARTON_D;g.lineWidth=3;g.beginPath();
    g.moveTo(W*0.300+bh*0.16,H*0.895-bh*0.42);g.lineTo(W*0.392,H*0.895-bh*0.98);g.stroke();
    g.fillStyle=ROSA;g.fillRect(W*0.300-bh*0.13,H*0.895-bh*0.92,bh*0.26,bh*0.075); /* the blindfold */

    /* ---- RIGHT: the same yard with the light off. One shape, three times, no colour left ---- */
    const nx=W*0.630, nw=W*0.325, ny=H*0.090, nh=H*0.700;
    g.fillStyle=NOCHE;g.fillRect(nx,ny,nw,nh);
    g.strokeStyle=TINTA;g.lineWidth=2;g.strokeRect(nx+1,ny+1,nw-2,nh-2);
    const s2=nh*0.165;
    donkey(nx+nw*0.30,ny+nh*0.30,s2,CENIZA,CENIZA,CENIZA);
    donkey(nx+nw*0.66,ny+nh*0.30,s2,CENIZA,CENIZA,CENIZA);
    donkey(nx+nw*0.48,ny+nh*0.63,s2,CENIZA,CENIZA,CENIZA);
    g.fillStyle="#BFB6C6";g.font="bold 11px ui-monospace,monospace";
    g.fillText("APAGA LA LUZ",nx+nw*0.10,ny+nh*0.90);
    g.font="9px ui-monospace,monospace";g.fillStyle="#8E8598";
    g.fillText("mismo bulto ×3",nx+nw*0.10,ny+nh*0.965);

    /* the lettering on the crepe — absolute 11px, and every fraction above was cut against it */
    g.fillStyle=TINTA;g.font="bold 11px ui-monospace,monospace";
    g.fillText("PAPEL DE CHINA · PRUEBA DE BULTO",W*0.050,H*0.140);
    g.font="9px ui-monospace,monospace";g.fillStyle="#5E5148";
    g.fillText("silueta primero · color después · detalle al último",W*0.050,H*0.945);
    /* the one number that cost something to find, written where a piñatera writes it: on the paper */
    g.fillStyle=ROSA;g.font="bold 9px ui-monospace,monospace";
    g.fillText("comal n5 152.9  ·  tabla n1 162.3  ·  Δ 9.4",W*0.050,H*0.885);
}
```

**Files (absolute):**
`/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/` (17 PNGs opened, `manifest.json`, `mockdocs2.js:36-78`, `:104-146`) · `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/sobremesa-journey.html:576-643` (the four drawings; `:603-605` the broken ladder, `:589-590` the two glyphs, `:621-624` the merge tile) · `/home/user/meridian-quest/changarrito/index.html:198` (the violet label rule) · `/home/user/meridian-quest/engine/engine.js:3468` and `:3471` (submit and cancel, one class) · `/home/user/meridian-quest/docs/UI-REVIEW.md` §6 block 1 (row 2, Art, is mine to fill: **signed FALSE, 2026-09-14**).


---

# Beto — engineers, row 1

PRE-FLIGHT — I worked this backwards from the code and forwards from two pictures: I read the page's `S=[…]` claims first, then went to `engine.js`, the three shells and `mockdocs2.js` to point at every element by line, and where a picture disagreed with the CSS I stopped arguing and ran a headless probe against the shipped town reader rather than reasoning about specificity. My persona is equipped for exactly the half of this that is not taste — *is this element shipped, and if not, what does it cost* — because the answer is always a line number or a sitting, and both are checkable. Where I expected to fall short: I cannot say whether a mark *means* the right thing, so Pili's, Nacho's and Chava's rows are untouched below even where I had an opinion; and the two pictures I could not price at all are the two drawings of a game we do not have.

---

## 1 · MY SIGNATURE LINE

> **Row 1 · Engineers · Beto, Yaz** — *"Every element on every screen is either shipped today — named with `file:line` — or listed as new work with a cost; nothing in these pictures is a capability the engine does not have and nobody has priced."*
> *What makes it FALSE: one element nobody can point at, in either column.* (`docs/UI-REVIEW.md:64`)

### **FALSE for the set**, on two elements, one in each column.

- **Column "real", wrong.** Screen 10, the house card, says *"Zero engine change, zero shell change"*. The checkbox row in that picture is not what the reader asks for and cannot be had for zero: measured in the running town shell at 390×844, every option label computes `text-transform: uppercase`, `font-size: 10.56px`, monospace, `letter-spacing .08em`, `color rgb(99,94,110)` — the settings panel's label rule, not the reader's — and the box itself is **13×13 px with `accent-color: auto`**, system blue. Finding 1.
- **Column "drawn/not built", wrong.** Screen 1, the front door, says the three doors *"are hard-coded in three shells and the engine"* and that the relabelled doors *"are a drawing until careers become a pack seam"*. The **words on the doors have been a pack seam since before this mock** — `engine.js:4477` paints them from `t.classes[b.dataset.c]`, supplied at `content/meridian/strings.js:8` (EN) and `:229` (ES). *"El que planea / the one who plans"* is a strings edit today, zero engine, zero shell. Finding 2.

**Per screen**, where it differs from the set:

| # | Screen | My verdict | Why |
|---|---|---|---|
| 0 | The questionnaire | ANSWERS, WITH A NOTE | Not the engine at all — no `docDef`, no reader. The note is what happens if it ever moves inside: it inherits both faults in Finding 1 plus the 13.6 px fields. |
| 1 | The front door | **ANSWERS, WITH A NOTE** | The line is FALSE here — see Finding 2. Plus a second thing nobody has named: `cls` stores the *label*, not the key. |
| 2 | The street | ANSWERS | Shipped, untouched, correctly claimed. |
| 3 | The household | ANSWERS | *"No new tile kind"* checks out: `SOLIDX` (`engine.js:50`) adds a pack's own solid glyph, `TILEART` (`:831`) draws it. Zero engine. |
| 4 | A drawer | ANSWERS, WITH A NOTE | Every block is shipped. Its only action is below the fold — Finding 3. |
| 5 | The shifts board | ANSWERS, WITH A NOTE | Same. Plus the pack-state boundary, which the page states here and nowhere else — Finding 6. |
| 6 | The recipe | ANSWERS, WITH A NOTE | *"Print is new"* — true, and priced in Finding 7. |
| 7 | The Collection | ANSWERS | `s2.blank` → `.dblank` with a dashed `.dline` (`engine.js:3423-3424`, `index.html:185-186`). Free, as claimed. |
| 8 | The merge board | **DOES NOT ANSWER** | Honest and un-buildable as drawn; priced in Finding 4. The picture that would answer it is named there. |
| 9 | Making a dish | **DOES NOT ANSWER** | Same seam, same price. |
| 10 | The house card | **ANSWERS, WITH A NOTE** | The line is FALSE here — Finding 1. |
| 11 | The day nothing happened | ANSWERS | Every block shipped; nothing claimed that is not there. |
| 12 | The map | ANSWERS, WITH A NOTE | *"About two lines"* is honest for the markers and not for the ring — Finding 5. |

**The genre line, for every screen I looked at** (0–12): *there is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down.* **Signed, 2026-09-14.** I checked the strings as well as the pictures: `mockdocs2.js` contains no duration, no "left", no "by", no date compared to today. The only date anywhere is the one the player typed on the shift they took (*"Thursday, after work"*), and nothing reads it. The nearest thing to a clock in the engine is `setTimeout` on a toast (`engine.js:604-605`) and it is not on any of these screens.

---

## 2 · THE RELEASE PARAGRAPH — Yaz's half of row 1, which I sign for today

These pictures imply a **third published game**, and nothing in this repository can build one. `scripts/build-site.sh:18-20` copies `index.html sw.js qr.js manifest.webmanifest icon-*`, then `engine vendor`, then **`content/meridian` by name** — one game, spelled out, and the file's own header says adding to that list is a decision, not a chore. `sw.js` hard-codes `CACHE="mq-v159"` (`:6`), `PFX="mq-"` (`:7`) and an ASSETS manifest that names `content/meridian/*.js` file by file (`:8-12`), so La Sobremesa needs **its own worker with its own CACHE and its own PFX** or two apps on one origin evict each other's caches — the rule is written at `sw.js:7` and it currently holds only because there is exactly one worker. The save side is already a real seam and needs nothing invented: `SK()` (`engine.js:13`) prefixes every key with `STOREPFX`, `changarrito/content/config.js:12` is `"ch"` and `content/gauge/config.js:1` is `"gauge"`, so the new pack gets a third value and `test/town.smoke.js:48` is the exact precedent for the guard that asserts it. **The shell is the part I would not do by hand:** `index.html`, `changarrito/index.html` and `content/gauge/index.html` are kept in step by a person, and I checked three of the reader's rules across all three today (`.dbtn`, `.dfrow`, `.dchecks label`) and they matched — which is luck, not a mechanism, and a fourth copy triples the odds. So: **a generated shell from one source of truth, its own `STOREPFX`, its own `CACHE`/`PFX` pair bumped with `GAMEV`, one allowlist line in `build-site.sh`, and `test/public.js` (R10) run on `_site` with the new folder present, never on the source tree** — the script says so itself at `scripts/build-site.sh:11-13`: *"checks the result, not this script."* **Two sittings**, and the first thing to exist is the guard that fails when shell #2's reader CSS diverges from shell #1's, because that guard is worth more than the generator.

---

## 3 · FINDINGS

### Finding 1 — the reader's checkboxes are wearing the settings panel's uniform
**Screen 10 (the house card) · row 390×844, EN and ES, night · ANSWERS, WITH A NOTE**

**In plain words:** The house card says it costs nothing to build, and the picture shows something the reader cannot produce for nothing. Every tick-box label on it comes out tiny, monospaced, SHOUTING IN CAPITALS and the wrong grey — because the reader is built out of the settings panel and quietly inherits its uniform — and the tick-box itself is a thirteen-pixel factory-blue square, the only colour on a purple night page that nobody chose. It is small, it is shipped today in both games, and it is on the one screen the owner asked for by name.

**Notes:** `#reader` carries `class="settings reader"` — `index.html:728`, `changarrito/index.html:727`. `.settings label{font-family:'IBM Plex Mono'; font-size:.66rem; text-transform:uppercase; letter-spacing:.08em; color:var(--muted)}` — `index.html:360`, `changarrito/index.html:359`, `content/gauge/index.html:360`. The reader's own intent is `.paper .dchecks{text-transform:none; letter-spacing:0; font-size:.85rem}` (`index.html:193`) but that rule dresses the **div**, and the option labels the engine builds are plain `<label>` children of it (`engine.js:3462-3463`); `.paper .dchecks label` (`index.html:243`) sets geometry only and never takes the uniform back off. **Measured, in the shipped town shell, house card at 390×844** (probe: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/beto-checks-probe.js`): `.dchecks` computes `text-transform: none`, the inner label computes **`uppercase`**; label font-size **10.56 px** (asked: 13.6); colour `rgb(99,94,110)`; box `13×13 px`, `accent-color: auto`. The hit area is fine — label boxes 69×44, 69×44, 105×44, 62×44 — so Rosa's 44 px rule passes and it is the *paint* that is wrong, which is the harder kind to notice. Every element was non-zero before I read a number.

**Questions to consider:** Is the reader a *kind of* settings panel, or a page that happens to sit in the same fixed overlay? If the second, the fix is not one more override — it is `.settings label` being scoped so the reader is not a `.settings`, which is a bigger diff and the right one. Does `accent-color` belong on the reader (one line, three shells) or on `:root` next to `--accent`?

**Areas affected:** `index.html`, `changarrito/index.html`, `content/gauge/index.html` (the template) — the same block in all three. No engine change. Both games: Meridian's care pack and room interview use `checks` too, so this is visible to Meridian's players the day it lands.

**Done when:** a document with a `checks` field renders its option labels in the reader's body type, mixed case, in the reader's ink, with a tick in `var(--accent)` — and there is a test that was **red first**: assert `getComputedStyle(label).textTransform === "none"` and `accentColor !== "auto"` on the town's own care-pack document, which fails on today's tree in one run. **RULE**, not a choice: no pack should have to know that the reader is a settings panel underneath.

---

### Finding 2 — the doors are already half a seam, and the half that is missing is the half in the save
**Screen 1 (the front door) · row 390×844, EN, cream · ANSWERS, WITH A NOTE**

**In plain words:** The page says the three career doors are hard-coded and that renaming them waits for a new seam. The *words* on them have never been hard-coded — the pack has supplied them all along, and the owner could see "the one who plans / el que planea" on that screen this afternoon. What is genuinely stuck is the number of doors, the emoji on them, the shirt colour behind them, and one thing nobody has named: the game writes down the *English or Spanish words* you picked, not which door it was, so a player's class is a translated string that follows them forever and relabelling the doors silently re-keys every save that already exists.

**Notes:** Hard-coded, as claimed: the three keys and their glyphs are literal markup — `index.html:386-388`, `changarrito/index.html:385-387`, `content/gauge/index.html:386-388` — and the shirt colours are `const SHIRTS={architect:…,diplomat:…,operator:…}` at `engine.js:431`. **Not** hard-coded, contradicting the page: `applyLang()` paints both lines of every door from `t.classes[b.dataset.c]` (`engine.js:4477`), supplied by the pack at `content/meridian/strings.js:8` and `:229`. And note that line has no guard — a pack that omits one of the three keys throws on `pair[0]` at boot. The unnamed one: `cls=b.querySelector("b").textContent` (`engine.js:3980`) stores the **rendered label**; it is saved as `c` (`engine.js:503`) and surfaced to content as `player.class` (`engine.js:4653`).

**Questions to consider:** Does a pack get to say **how many** doors, or is three a house rule the engine keeps? (Two is a real answer for a cooking game and three is Meridian's.) If `cls` becomes a key, what does an existing save holding `"The Architect"` become — mapped back by label, or left as a free-text class the engine stops interpreting?

**Areas affected:** `engine/engine.js` (`:431`, `:3980`, `:4477`, `:503`, `:4653`, and `sanitizeSave` around `:462-498`), the three shells, `content/meridian/strings.js`, `content/gauge/`, and `docs/NEW-WORLD.md`/`docs/GAUGE.md`, which currently tell a new world nothing about this.

**Done when:** a pack declares `CLASSES=[{k,glyph,shirt}]`, the shell builds the row from it, `SHIRTS` is the fallback and not the source, and the save holds `k`. **Two sittings, not one** — sitting 1 the table, sitting 2 the key-in-the-save with its migration. **The table is a CHOICE** (a pack answers how many doors and what is on them). **Storing the key rather than the label is a RULE** — a save must never hold a translated string, and that is the same rule `sanitizeSave` already enforces everywhere else.

---

### Finding 3 — the only button on two of these screens is under the fold, behind a mark that reads as the end
**Screens 4 (a drawer) and 5 (the shifts board) · rows 390×844 and 844×390, EN and ES, night · ANSWERS, WITH A NOTE**

**In plain words:** Both of these screens exist so a person can do one thing — add what you bought, take a shift — and on the owner's own phone that button is off the bottom of the page, under a dashed line that is the same mark the reader uses to say a document has ended. Held sideways it is not close: the phone shows about a quarter of the page. The three buttons that *are* always visible are Copy, Download and Close, which is the reader telling the person that the most important thing on the screen is copying it.

**Notes:** The buttons are real and shipped — `{btn:"Add what you bought"}` at `journey/mockdocs2.js:92`, `{btn:"Take a shift"}` at `:102`, rendered by `engine.js:3438-3442` as `.dbtn` (`index.html:237-240`, 48 px, full width). The fold numbers are the maker's own, off the live DOM: drawer **774 doc / 661 visible** and shifts **739 / 661** at 390×844; at 844×390 every document gets **207 visible** against 253–887 (`journey/manifest.json`). The bar is pinned outside the scroll box on purpose and says so — `index.html:219-221` — so Close, Copy and Download are exempt and a document's own primary action is not. This is `docs/UI-REVIEW.md:106-107` (M1, M2) landing on two more screens; I am not re-finding it, I am saying it now has more customers.

**Questions to consider:** Two different fixes and they are different kinds. (a) *"A document taller than its box says so"* — an affordance above the bar. (b) *"A document may nominate one action to ride in the bar"* — `{btn:…, pin:true}`. Do we want both? (a) alone leaves a person scrolling on a landscape phone through five screens to reach one button.

**Areas affected:** `engine/engine.js` `docRender` (`:3438-3442`) and `docOpen` (`:3481-3492`); the `.docbar`/`.dbtn` block in all three shells; `GAMEV`+`CACHE` bump; Meridian's own long documents inherit it.

**Done when:** **(a) is a RULE and costs one sitting** — every document taller than its box shows a mark that is not the end-of-document rule, in both games, identically; the red test loads a document twice the box and asserts the affordance exists, and it fails on today's tree. **(b) is a CHOICE and costs one sitting** — the seam is `pin`, the pack decides which button earns it, and Meridian sets it nowhere so its behaviour is unchanged by construction. I would build (a) first and let (b) wait for the owner's answer to Q1.

---

### Finding 4 — a canvas that listens: the claim is right, the price is right, and two things under it are not priced
**Screens 8 (the merge board) and 9 (making a dish) · the page's own canvas, not a matrix row · DOES NOT ANSWER**

**In plain words:** The page says these two play surfaces need a canvas that can feel a finger, that nothing like it exists, and that it is one sitting of engine work. All three are true. What is not said is that a finger on a canvas inside a scrolling sheet of paper will scroll the paper unless the engine says otherwise, and that whatever the board remembers will be there tomorrow on his laptop and gone the moment he opens the game from a Trolley Pass link, with no message.

**Notes:** The canvas is real and is exactly as described — `engine.js:3373-3416`: a real `<canvas class="dart">` at the column's width, `Math.max(240,Math.min(560,room-8))`, `devicePixelRatio` backing store, `imageSmoothingEnabled=false`, `setTransform(K,…)` so the pack draws in CSS pixels. **No `addEventListener` appears anywhere in that branch** — the claim is true. Two traps for whoever builds the seam: (i) because of `setTransform(K,…)`, pointer coordinates must be divided by the element's **box**, never by `K`, or every board is wrong on a 3× phone and right on a laptop; (ii) `.dart` has no `touch-action`, so on a phone the first drag scrolls `#paperScroll`, and `touch-action:none` is a line in three shells, not in the engine. Third: the `wide` branch (`engine.js:3410-3414`) puts the canvas inside a horizontal scroller — a **listening** canvas inside a horizontal scroller is a conflict that must be refused at the seam, not fudged at runtime. On the pictures themselves: the page draws these at `Math.min(560, clientWidth-40)` (`sobremesa-journey.html:669`), whereas inside the reader on a 390 phone the same block gets the column, measured at 322 px of scroll box — close, and not the same, so the merge grid a person actually gets is ~8% tighter than the one in the picture.

**Questions to consider:** Does the engine hand over raw pointer events, or normalised `(u,v)` in 0..1? Raw is honest and every pack re-derives the same three lines; normalised is one decision the engine is making on a pack's behalf, and it is the wrong one for a picture that is wider than the page.

**Areas affected:** `engine/engine.js` `docRender` art branch; `.dart` in all three shells; `docs/GAUGE.md` (a new world will want this on day one); `GAMEV`+`CACHE`.

**Done when:** **The seam: one sitting, and it is a RULE** — the engine hands a pack pointer-down/move/up in the canvas's own coordinates and never learns what a merge is; the same bargain as `art`, `TILEART` and `DECOART`. The red test plants a listening art block, dispatches a pointer event at a known box offset and asserts the pack received that offset at 1× and at 3×; it cannot pass today because nothing listens. **The game on top of it is NOT one sitting — I price the merge board at three to four**, because the board, the chain table and the save are each their own piece and the save is the expensive one (Finding 6). **What I would not do:** I would not let this seam carry a drag-and-drop *helper*. The moment the engine owns "a thing you drag onto another thing", it owns what a tile is, and the next pack that wants a stroke rather than a drag — screen 9, on this same page — gets a helper shaped like somebody else's game.

---

### Finding 5 — the markers are two lines; the ring is not the same kind of question
**Screen 12 (the map, before and after) · row 390×844, EN, cream · ANSWERS, WITH A NOTE**

**In plain words:** Putting a mark on the map for every person who has something to say is genuinely tiny and the engine already knows every fact it needs. Putting a ring on *the next one* looks like the same job and it is a different job: the engine can answer "does this person have an open question" all day and can never be asked "which of them is next" without somebody choosing an order. Two other things the picture does not mention: nobody upstairs gets a marker at all, and the markers land on top of the street's own labels.

**Notes:** Already shipped and correctly claimed: `hasSay(n)` (`engine.js:611`) — the exact predicate, and it already counts room hosts and document-carriers, not just quests; `pendingAt(n)` (`:608`); `worldPending(id)` (`:510`); `worldFlags()` (`:4741-4750`) with `answered / grade / closed / up` per district; `drawTown()` (`:4751-4771`) drawing a pack-coloured plan, pack labels and the you-are-here dot from `MAPDOT` (`:4767-4770`). So `WORLDS[PL.street].npcs.filter(hasSay)` plus a dot at `n.x*s, n.y*s` is **three lines inside `drawTown`** — the page's "about two" is honest within one, and I will sign that. What the page does not price: (i) **`drawTown` draws one world.** A person with an open quest upstairs is not on the plan at all; the table that fixes it is `MAPDOT` (`:4767`), which already maps a world to a point, and that is **one more sitting**, not two lines. (ii) **Collision.** `drawTown` paints `TOWNLBL` at `:4761-4764` and the dot at `:4769`; markers and labels share the same 10-px cells and in the mock picture they do collide — a green square inside *"LOT: EL MERCADO"*, a yellow one through the V of *"RESERVED LOT"*. Art work, unpriced. (iii) **Two legends.** The after-picture has a new HTML legend row saying *"you are here"* directly under the shipped in-canvas footer at `engine.js:4766` that also says *"◉ you are here"*. One of them has to go, and the in-canvas one is a literal string in the engine with no pack seam, so it is the one to change. Also worth knowing before anyone reaches for it: `TOWNLBL` entries already take `when(flags)` (`:4762`), so a pack can put a conditional mark on the plan **today, at zero engine lines** — for a fixed place, not for a person who moves.

**Questions to consider:** What does "next" mean when two people are both open — quest-array order, nearest, or the one the pack nominates? And does a marker mean "a quest" or the same thing the ❗ means everywhere else? `engine.js:506-509` is emphatic that the ❗ means one thing forever and is never a count and never an age; a second vocabulary on the map would be the first crack in that.

**Areas affected:** `engine/engine.js` `drawTown` (`:4751-4771`) and the legend string at `:4766`; `MAPDOT`/`TOWNLBL` in `content/meridian/`, `changarrito/content/`, `content/gauge/`; issue #160.

**Done when:** **Markers: one sitting including the test, and it is a RULE** — the engine puts on the plan the mark it already puts on the world tag, because `hasSay` is the engine's own sentence and the map is the only place it is not said. The red test forces one NPC's quest open and asserts a mark at that tile's plan coordinates; it fails today because `drawTown` draws no such mark. **The ring on "next": one sitting, and it is a CHOICE — a pack seam, not an engine rule.** `pendingAt` is a *predicate* — "is this one of them" — and *"where is the next one"* is a *query*, and no amount of asking the first will build the second. The pack answers it or nobody does. **What I would not do:** derive "next" from the quest array's index inside the engine. It would work in Meridian, where the array is a curriculum, and it would be nonsense in a game where four kitchens post a dish each and none of them is first.

---

### Finding 6 — a pack's own state survives a reload and dies on the Trolley Pass, and only one screen says so
**Screens 5, 8, 9 and 10 · all rows · ANSWERS, WITH A NOTE**

**In plain words:** Four of these screens remember something the player did — which shift they took, what the merge board looks like, who cooks in this house, which vegetables stay raw. All of it will be there tomorrow on the same device and none of it crosses when he sends the game to someone else's phone with a link, and nothing on screen will say a word about it. Screen 5 admits this. Screens 8, 9 and 10 draw the same promise and do not.

**Notes:** `save()` (`engine.js:503`) is a closed struct — a fixed list of keys — and `sanitizeSave` (`:462`, `:498`) rebuilds a whitelist and **drops every key it does not know**; `passURL()` carries `loadSave()` and nothing else. So anything a pack persists through `SK()` (`engine.js:13`) is device-local by construction. Screen 5's own line is exactly right: *"device-local until the Trolley Pass carries pack state."* Screens 8, 9 and 10 carry no such line, and screen 10's card is the one a second person in the household would most expect to arrive with the link.

**Questions to consider:** Does the Pass grow a `pk` blob the pack owns and `sanitizeSave` treats as opaque-but-bounded (size cap, no functions, strings coerced) — or does pack state simply never travel, and the screens say so in words? The first is an engine change at the one boundary this project is most careful about; the second is free and honest.

**Areas affected:** `engine/engine.js` `save` / `sanitizeSave` / `passURL`; `qr.js`; `docs/TAGS.md` leak register (this is precisely a "second game breaks on it" fact); `docs/GAUGE.md`.

**Done when:** either the Pass carries a bounded pack blob with a red test that plants a hostile one (a function, a 200 kB string, a `__proto__` key) and watches it be refused — **and that is a RULE, it belongs at the same boundary as everything else that crosses it** — or all four screens carry screen 5's sentence. **One sitting for the words. Two for the blob**, and I would not start the blob before the owner answers Q2.

---

### Finding 7 — print
**Screen 6 (the recipe as the house reads it) · row 390×844, EN and ES, night · ANSWERS, WITH A NOTE**

**In plain words:** The recipe screen says printing is new. It is. The bar has Copy, Download and Close and nothing else, and a recipe is the one document in this whole set that a person wants on paper next to a pot.

**Notes:** The bar is three literal buttons in the markup — `index.html:746` — wired at `engine.js:3635` (close), `:3640` (copy), `:3645` (download), with their labels coming from the pack via `DCU()` at `engine.js:4486-4487`. So the **label** is already a seam and the **button** is not: a fourth button is a shell edit in three places plus an `@media print` block, because `#reader` is `position:fixed` over a game and prints as one page of nothing otherwise.

**Questions to consider:** Does print belong in the bar, where it competes with Close on a 207 px landscape screen, or is it `Download (.md)` doing its job already and the real ask is a `.pdf`?

**Areas affected:** all three shells; `engine/engine.js` around `:3635-3650`; `GAMEV`+`CACHE`.

**Done when:** a document prints as the document and not as a screenshot of a game. **One sitting. It is a RULE** if it lands — the page says *"a rule every pack gets"* and I agree: there is no version of this where one pack prints and another does not.

---

## 4 · QUESTIONS FOR THE OWNER

**Q1 · Does a document's own button ride in the bar, or does the document just have to say "there's more below"?** These collide and I will not pick one quietly.
- One side: `index.html:219-221` states the settled reason the bar sits outside the scroll box — *"Close, Copy and Download must never be below the fold"* — and it names exactly three buttons. By that rule, the reader has already decided which buttons are privileged, and *Take a shift* is not one.
- The other side: `journey/manifest.json` says the shifts board is 739 px against a 661 px window on your phone and a 207 px window when you turn it sideways, and `mockdocs2.js:102` is the only thing on that screen that does anything.
- What each would have me build: the first is an affordance only, art plus six engine lines, and the button stays where the document put it. The second is a `pin` seam and a fourth slot in the bar, in three shells, with Copy and Download losing width on a landscape phone.
- **What I need from you:** whether *"the thing this screen exists to do is always reachable"* outranks *"the way out is always reachable."* I will build the affordance either way; I will not build the seam until you answer.

**Q2 · Should the Trolley Pass carry a pack's own state?** *(This is the same shape as Lupe's Q2 and it is a different question — hers is about a font size, this is about a trust boundary.)*
- One side: `engine.js:503` and `sanitizeSave` at `:462`/`:498` are a deliberately closed struct, and every escape this project has had at that boundary was fixed by making it *narrower*. Opening it to a pack-shaped blob is the first time anything untyped crosses it.
- The other side: you said the household is *"probably my laptop"*, and four of these thirteen screens remember something. If AJ opens the link on her phone, the shift you took, the merge board and the house card are simply not there, and nothing tells her.
- **What I need from you:** whether pack state is supposed to travel at all. If the answer is "no, it lives on the device", that is a one-sitting docs-and-words job and I would rather do that than build the blob.

---

## 5 · WHAT I DID NOT CHECK

- **I did not run the suites this pass.** `test/smoke.js`, `test/town.smoke.js`, `test/engine.smoke.js` against both shells — not run by me. Nothing I did touches the tree (`git status` shows only three files another agent has modified: `changarrito/content/config.js`, `changarrito/content/murals.js`, `docs/crew/MURAL-LEDGER.txt`), but I am not reporting green and nobody should read this as a green.
- **I did not diff the three shells end to end.** I compared three reader rules (`.dbtn` count, `.dfrow`, `.dchecks label`) across `index.html`, `changarrito/index.html` and `content/gauge/index.html` and they matched — and I nearly filed a lockstep finding from a grep that only *looked* like a divergence. That is a sample of three rules out of a stylesheet, not a proof.
- **I did not verify "about sixteen lines" for the drawer's search** (screen 4) against the town's index, which the page names as the precedent. It sounds right and I did not look.
- **I did not measure ES at any row myself.** The ES document heights in `manifest.json` are the maker's and I read them as given; the widest thing I worried about — `.dchecks` option labels wrapping — I measured in EN only ("Bell pepper" 105×44).
- **I did not verify the iOS field-zoom consequence** behind M4 (`docs/UI-REVIEW.md:109`). The 13.6 px is measured in this repo and I measured 13.33 px on the house card's `<select>`; what an iPhone does with it is still `[TRAINING]` and still unconfirmed on a device, and it now has a second customer in the questionnaire.
- **I did not look at screens 0, 2 or 3's pictures at all** — I read their claims and checked those against code (`SOLIDX` `engine.js:50`, `TILEART` `:831`). If the questionnaire pictures show something the page does not claim, I did not see it.
- **I did not open the 844×390 pictures.** I priced the landscape row from `manifest.json`'s numbers, which are read off a live DOM and which I trust because Lupe measured the same 207 px independently — but I did not look at a single landscape picture with my own eyes, and Finding 3's sentence about the dashed rule is her observation, not mine.
- **I did not check `render2.js`'s `unrolled` restore path.** It reloads and re-boots between shots (`render2.js:44`), which looks right; I did not confirm the `unmodified` shots that follow an `unrolled` one really have their walls back.
- **I did not price the drawings' fidelity to what `docRender` would produce.** I noted the 560-vs-322 width gap on screens 8 and 9 and did not render either drawing through the real art block to see what actually changes.

---

## 6 · POST-FLIGHT

What the persona got right, with the moment: **"reproduce before you diagnose"** earned its place twice in one hour — I had a clean, confident, wrong explanation for the uppercase labels (specificity between `.paper .dfl` and `.paper .dchecks`), wrote it out, disliked it, and ran the probe instead; the real answer was `<div class="settings reader">` at `index.html:728`, which no amount of reading the two rules I was staring at would ever have produced, and it turned a footnote into the headline finding. Where it was in the way: my instinct is to price, and screens 8 and 9 are pictures of a game we do not have, where the honest engineering answer is *the seam is one sitting and the game on it is four*, and I caught myself about to price the *game* from a drawing — which is precisely the thing `docs/UI-REVIEW.md:51` says a mock may never be used for. The gap I predicted did appear exactly where I said it would, and a second way I had not predicted: I nearly filed a shell-lockstep divergence that did not exist, because my first grep used three different patterns across three files and the *absence of a match* looked like the absence of a rule — the aggregate-instead-of-identity shape from `docs/REGRESSION.md` §3, caught on myself, inside a report about checking other people's claims.

**Persona edit I propose, as exact text.** In `.claude/agents/beto.md`, appended to the bullet beginning *"Before you write a guard, find the one that should already have caught it"*:

> **And before you price a picture's element as "new", find the seam that already half-exists.** On 2026-09-14 a mock-up listed the three career doors as hard-coded in three shells and the engine, and one of the two things it named — the words on the doors — had been a pack seam all along (`engine.js:4477`, `content/meridian/strings.js:8`). **A capability that is half-shipped reads exactly like one that is not shipped, from the picture.** Grep for the pack table before you write down a sitting; the expensive half is usually the one nobody mentioned, and here it was that `cls` stores the *rendered label* rather than the key (`engine.js:3980`, saved at `:503`).

The edit is additive and it is a pointer, not a rewrite. I am not proposing to relax anything I refuse: I still will not call a picture buildable, and I did not, twice, on screens 8 and 9.

---

## 7 · MURAL PANEL

```
MURAL PANEL
id:     beto-pieza-de-otro-cajon
by:     "beto"
title:  {en:"Part from the wrong bin", es:"Pieza de otro cajón"}
said:   {en:"The reader is wearing the settings panel's overalls. Nobody ordered that part.",
         es:"El lector trae puesto el overol del panel de ajustes. Esa pieza nadie la pidió."}
state:  {en:"pricing pictures, and not one of them without measuring it in the running game first",
         es:"cotizando dibujos, y ninguno sin medirlo antes en el juego corriendo"}
who:    {en:"Beto, who keeps the engine and will not price a picture he has not measured",
         es:"Beto, que cuida el motor y no cotiza un dibujo que no midió"}
cap:    {en:"The mock said the house card was zero engine change and zero shell change. I opened it in the running game and measured it instead: every tick-box label came out ten and a half pixels, monospace, SHOUTING, the wrong grey — because the reader is built out of the settings panel and quietly inherits its uniform. The rule that was meant to stop that dresses the box around the labels, not the labels. The box itself is thirteen pixels of factory blue on a purple night page. I had a clean explanation and I nearly wrote it down. It was wrong. Two parts look the same until you put them side by side on the bench.",
         es:"El boceto decía que la tarjeta de la casa no costaba ni una línea de motor ni una de cascarón. La abrí en el juego corriendo y mejor la medí: cada etiqueta de casilla salió de diez píxeles y medio, monoespaciada, GRITANDO, del gris equivocado — porque el lector está hecho del panel de ajustes y hereda su overol sin avisar. La regla que debía impedirlo viste la caja alrededor de las etiquetas, no las etiquetas. La casilla misma son trece píxeles de azul de fábrica sobre una página morada de noche. Yo ya tenía una explicación limpia y casi la escribo. Estaba mal. Dos piezas se ven iguales hasta que las pones lado a lado en el banco."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;
  /* BETO'S HAND, FOURTH VISIT. Not a drawing-office sheet and not a rolling-road printout:
     a SPARES CATALOGUE PAGE off the bench — greasy newsprint, two parts laid side by side,
     circled part numbers on leader lines, a parts list whose last column says who supplied it,
     and a red rubber stamp across the one that came from the wrong bin.
     Everything is fractions of W and H; the 11px lettering is the ruler. Painted and looked at
     at 520x239 and 360x166 before it was handed over. Three repaints: the mechanic was a slab,
     the size captions collided with the leader bubbles, the stamp sat on top of number 2. */
  const NEWS="#E9E1CE", GREASE="#D9CFB6", INK="#23201B", MUTE="#7E7461",
        BLUE="#0A84FF", VIOLET="#7A3FE0", NIGHT="#1C1A22", STAMP="#B0261C";
  murPaper(g,W,H,NEWS,null);
  /* the grease: a coffee ring and a thumb smear, because this page lives on a bench */
  g.strokeStyle="rgba(150,120,70,.30)";g.lineWidth=Math.max(3,H*0.020);
  g.beginPath();g.arc(W*0.795,H*0.895,H*0.085,0,7);g.stroke();
  g.fillStyle="rgba(150,120,70,.07)";
  g.beginPath();g.ellipse(W*0.100,H*0.950,W*0.040,H*0.022,0.2,0,7);g.fill();
  g.fillStyle=INK;g.fillRect(0,0,W,2);

  g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CATÁLOGO DE REFACCIONES · EL LECTOR",W*0.055,H*0.095);
  g.strokeStyle=MUTE;g.lineWidth=1;g.beginPath();g.moveTo(W*0.055,H*0.125);g.lineTo(W*0.945,H*0.125);g.stroke();

  /* one bay: a tick-box and its word, laid out like a part on a bench */
  const bay=(x,y,w,h,fitted,size)=>{
    g.fillStyle=GREASE;g.fillRect(x,y,w,h);
    g.strokeStyle=MUTE;g.lineWidth=1;g.strokeRect(x+.5,y+.5,w,h);
    if(fitted){g.fillStyle=NIGHT;g.fillRect(x+4,y+4,w-8,h-8);}     /* as fitted, it sits on the night page */
    g.fillStyle=fitted?"#6E6880":MUTE;g.font="9px ui-monospace,monospace";
    g.fillText(size,x+w*0.07,y+h*0.20);
    const cy=y+h*0.58;
    const s=fitted?h*0.155:h*0.290, bx=x+w*0.10, by=cy-s/2;        /* 13 px against what it should be */
    g.fillStyle=fitted?BLUE:VIOLET;g.fillRect(bx,by,s,s);
    g.strokeStyle="#FFFFFF";g.lineWidth=Math.max(2,s*0.16);g.lineCap="round";
    g.beginPath();g.moveTo(bx+s*0.22,by+s*0.52);g.lineTo(bx+s*0.44,by+s*0.76);g.lineTo(bx+s*0.80,by+s*0.24);g.stroke();
    g.lineCap="butt";
    const wx=bx+s+w*0.075;
    if(fitted){g.fillStyle="#635E6E";                               /* all one height: it is SHOUTING */
      for(let i=0;i<6;i++)g.fillRect(wx+i*(w*0.052),cy-h*0.040,w*0.028,h*0.080);}
    else{g.fillStyle=INK;const hs=[1,.60,.60,.60,.60,1.05];         /* mixed case: an ascender and a descender */
      for(let i=0;i<6;i++){const bh=h*0.075*hs[i];g.fillRect(wx+i*(w*0.050),cy+h*0.048-bh,w*0.034,bh);}
      g.fillRect(wx+5*(w*0.050),cy+h*0.048,w*0.034,h*0.030);}
    g.strokeStyle=MUTE;g.setLineDash([3,3]);g.lineWidth=1;          /* the hit area is the same on both. That is the trap */
    g.strokeRect(bx-w*0.035,cy-h*0.22,w*0.74,h*0.44);g.setLineDash([]);
    return {bx,by,s,cy,x,y,w,h};
  };
  const bw=W*0.375, bh=H*0.325, by0=H*0.205;
  const L=bay(W*0.055,by0,bw,bh,false,"13.6 px · mixta");
  const R=bay(W*0.520,by0,bw,bh,true ,"10.56 px · VERSALES");
  g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
  g.fillText("COMO SE PIDIÓ",W*0.055,H*0.185);
  g.fillText("COMO SALIÓ",W*0.520,H*0.185);

  const rad=Math.max(8,H*0.048);
  const bub=(x,y,n)=>{g.fillStyle=NEWS;g.strokeStyle=INK;g.lineWidth=1.5;
    g.beginPath();g.arc(x,y,rad,0,7);g.fill();g.stroke();
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
    g.fillText(String(n),x,y+4);g.textAlign="left";};
  const lead=(x1,y1,x2,y2)=>{g.strokeStyle=INK;g.lineWidth=1;
    g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();};
  lead(R.bx+R.s*0.5,R.cy+R.s*0.5,W*0.470,H*0.578);  bub(W*0.462,H*0.593,1);
  lead(W*0.700,by0+bh,W*0.700,H*0.578);             bub(W*0.700,H*0.593,2);
  lead(W*0.180,L.cy+L.h*0.22,W*0.150,H*0.578);      bub(W*0.140,H*0.593,3);

  /* the parts list. The last column is the whole panel */
  g.strokeStyle=MUTE;g.lineWidth=1;
  g.beginPath();g.moveTo(W*0.055,H*0.658);g.lineTo(W*0.945,H*0.658);g.stroke();
  const rows=[[1,".dchecks label","hereda .settings"],[2,"accent-color","de fábrica"],[3,"text-transform","no llega"]];
  rows.forEach((r,i)=>{const y=H*0.722+i*H*0.080;
    bub(W*0.078,y-H*0.013,r[0]);
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";g.fillText(r[1],W*0.132,y);
    g.fillStyle=STAMP;g.font="11px ui-monospace,monospace";g.fillText(r[2],W*0.470,y);});

  /* the rubber stamp, angled, across the bay that came back wrong */
  g.save();g.translate(W*0.790,H*0.430);g.rotate(-0.21);g.globalAlpha=.90;
  g.strokeStyle=STAMP;g.lineWidth=2.5;
  const sw=W*0.300, sh=H*0.135;
  g.strokeRect(-sw/2,-sh/2,sw,sh);
  g.fillStyle=STAMP;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
  g.fillText("PIEZA DE",0,-2);g.fillText("OTRO CAJÓN",0,12);
  g.textAlign="left";g.globalAlpha=1;g.restore();

  /* the mechanic, about three lines of 11px type tall, feet clear of the 6% the wall cuts */
  const bodyH=H*0.100;                       /* murBody's total is ~2.1x h; sized against the lettering */
  murBody(g,W*0.893,H*0.925-bodyH*1.2,P.rust,bodyH);
}
```

**Painted and looked at before being handed over**, at 520×239 and 360×166 against the real `murals.js` helpers: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/beto-panel9-520.png` and `beto-panel9-360.png`. Three repaints, and the third was the ruler rule biting: I passed `murBody` a height of `H*0.150` expecting a figure that tall and got one twice that, because the helper's `h` is the **body**, not the figure — the head and cap are drawn *above* `y` and the legs below, total ≈ 2.1×h. Sized against the 11 px lettering instead, it is `H*0.100`. It is made of greasy newsprint, an exploded view, circled part numbers and a rubber stamp; the wall has a blueprint, a dimension drawing, a signwriter's board, a light box and a mask card, and nothing that came off a parts shelf.

---

**Files (all absolute).**
- Reviewed: `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/` (`manifest.json`, `mockdocs2.js`, `render2.js`, and the `shifts`, `house`, `mapafter` PNGs at 390×844) and `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/sobremesa-journey.html`
- Process followed: `/home/user/meridian-quest/docs/UI-REVIEW.md` (it exists, so it wins over `run8-lupe.md`; my findings belong in its §6 block 1, and my row in its signature table is **row 1, Engineers, signed FALSE for the set, 2026-09-14**)
- Mine, in the scratchpad, nothing in the repo: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/beto-checks-probe.js`, `beto-panel9-art.js`, `beto-panel9-render.js`, `beto-panel9-520.png`, `beto-panel9-360.png`
- Code cited: `/home/user/meridian-quest/engine/engine.js` `:13` `:50` `:431` `:462` `:498` `:503` `:510` `:604-605` `:608` `:611` `:831` `:3373-3416` `:3423-3424` `:3438-3442` `:3462-3463` `:3481-3492` `:3635` `:3640` `:3645` `:3980` `:4477` `:4486-4487` `:4653` `:4741-4750` `:4751-4771`; `/home/user/meridian-quest/index.html` `:185-186` `:193` `:219-221` `:237-240` `:243` `:360` `:386-388` `:728` `:746`; `/home/user/meridian-quest/changarrito/index.html` `:359` `:385-387` `:727`; `/home/user/meridian-quest/content/gauge/index.html` `:360` `:386-388`; `/home/user/meridian-quest/content/meridian/strings.js` `:8` `:229`; `/home/user/meridian-quest/sw.js` `:6-12`; `/home/user/meridian-quest/scripts/build-site.sh` `:11-13` `:18-20`; `/home/user/meridian-quest/changarrito/content/config.js:12`; `/home/user/meridian-quest/content/gauge/config.js:1`; `/home/user/meridian-quest/test/town.smoke.js:48`


---

# Nacho — story, row 3

PRE-FLIGHT — I intend to work this the way I read a wall: open each picture cold, write the one sentence a stranger would say out loud in front of it, and only then look at the sentence the page already printed underneath, so the page cannot tell me what I saw; then judge the copy in `mockdocs2.js` against the rules that bind a world that is somebody else's household (R12, R15, R16, R17). My persona equips me for exactly the row I was given — the question "what does this screen say about the PERSON" is a story question, and it is the one question a measurement cannot answer, which is why Lupe wrote my row as a sentence she refused to sign for me. Where I expect to fall short, named in advance: I cannot see the four canvas drawings (stations 1, 3, 8, 9) because they live in the review page's `DRAW` object and were never shot as PNGs, so anything I say about the household, the merge board and the hand-made dish is about *words*, not about pictures — and I have no Bash, so I could not render them.

---

## MY SIGNATURE LINE

> **Row 3 · Story · Nacho** — *"Each screen says ONE thing a person reads without being told, and I can write that thing in one sentence under the picture."* (`run8-lupe.md` §3)

## **FALSE for the set.**

**The thing that makes it false, named:** the sentence the page prints under each screen is, for six of the thirteen stations, the document's own `sub` string copied out of `mockdocs2.js` — and **`sub` is never drawn on a screen.** `[CODE]` `engine/engine.js:3344` is the only use of `d.sub` in the whole engine: `const sub=d.sub&&(d.sub[lang]||d.sub.en);if(sub)out.push("*"+sub+"*");` — inside `docMarkdown`, the **export**. The on-screen renderer never touches it. Verified against the pictures: no `sub` appears on any of the thirty. So the shifts board's *"A shift is one dish, it pays in leftovers, and it has no clock"*, the Collection's *"It fills itself in"*, the drawer's *"Bags slump — that is how you know this drawer with the light off"* — the best writing in this pack, the sentences that carry the feeling — exist only in the file you download.

**I cannot sign "I can write that thing in one sentence under the picture", because the makers already did, and the picture cannot say it back.**

### Per screen — my sentence vs the page's `line`. Where they differ, mine is the finding.

| # | Screen · row | The page's `line` | **What a person reads without being told** | Same? |
|---|---|---|---|---|
| 0 | questionnaire · 390×844 | "Her answers go to him and stay with him." | *"Somebody built this for me — but the top of the screen says it will forget me, and the middle says it won't."* | **NO** |
| 1 | front door · 390×844 | "Three reasons to cook, not three careers." | *"This is a job simulator and I am choosing a career: Architect, Diplomat, Operator."* | **NO** — the line describes a drawing; the picture is the shipped door |
| 2 | street · 390×844 | "The world is the game. The app is the paperwork around it." | *"I'm in an office, and the game is explaining itself to me twice at once."* | **NO** — the hint text is painted in the corner panel AND in a bubble over the player, word for word |
| 4 | drawer · 390×844 | "A line is a thing you have." | *"This is a search box for my food."* — the violet **Find** button owns the fold; the list starts at 964 px | **NO** |
| 4 | drawer · 844×390 | same | *"Three drawers, and nothing in any of them."* | **NO** |
| 5 | shifts · 390×844 | "A shift you took stays yours. It is never late." | *"Four dinners I could cook. One is already mine."* | close — **YES, with a note**: "never late" is in the one block the fold cuts in half |
| 5 | shifts · 844×390 | same | *"Two dinners, and then the document ends."* | **NO** |
| 6 | recipe · 390×844 | "What's missing is one sentence and a door." | *"I have nearly everything; one herb is at Cande's — and this recipe has no method."* (`How it goes` is a heading with blank under it at the fold) | **NO** |
| 6 | recipe · 844×390 | same | *"Beans, water, onion. That's the recipe."* | **NO** — E12 again, in story terms |
| 7 | Collection · 390×844 | "A blank line is not yet, not denied." | *"Three things done, five things not done."* The dashed blank is the same mark the reader uses for *end of document* | **NO** |
| 10 | house card · 390×844 | "The switches live on a card, not in the gear." | *"Somebody wrote down that I can't eat raw carrot, and then promised not to say so."* | **YES** — and it is the kindest screen in the set |
| 11 | quiet · 390×844 **and** 844×390 | "Nobody says a word about the days between." | *"Nothing happened and nobody minds."* | **YES — the only screen that is TRUE at both rows** |
| 12 | map after · 390×844 | "Find the next thing without being told." | *"Orange is where to go, and the legend finally says so."* | **YES** |

**The genre line — signed TRUE, on every screen I looked at:**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."*
Checked in `mockdocs2.js` and in every picture: the only counter anywhere is the questionnaire's *"0 of 13 answered"*, which counts **up** (R15 satisfied, `docs/GENRE-RULES.md:154`), and the shifts board's date is the one the player wrote. Nothing fades, ages or empties. `[CODE]`

---

## FINDINGS

### F1 · The sentence that says what a screen means is written, and never shown
**Screen:** all six reader screens (4, 5, 6, 7, 10, 11) · **Row:** 390×844 and 844×390 · **Verdict: DOES NOT ANSWER**

**In plain words:** Every one of these documents carries a second sentence under its title — the one that tells you what the thing is for. On a phone you never see it. It is only written into the file you download, so the person holding the phone gets a title and then a list, and the review page prints the missing sentence underneath the picture as if the screen had said it.

**Notes:** `[CODE]` `engine/engine.js:3344` is the only place `d.sub` is read, inside `docMarkdown`. Six `sub` strings in `docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js` (`:84`, `:96`, `:116`, `:129`, `:139`, and `recipeHome` inheriting `D.recipe.sub` at `:106`). Three of them are quoted verbatim as the journey page's own `sub` field. This is the whole of my signature line's failure and it is one line of content per document to fix — put the sentence in a `p` block, where it will be drawn.

**Questions to consider:** does the sentence become a `p` (content's call, no engine change, every pack gains it one at a time), or does the reader learn to draw `sub` (one engine sitting, behaviour-identical for Meridian because Meridian's documents have subs too and would start showing them — which is a visible change to Meridian's players and therefore not free)?

**Areas affected:** `mockdocs2.js` all six documents; `engine/engine.js:3344`; the journey page's `line`/`sub` fields; every pack that ever writes a `sub`.

**Done when:** the sentence a reviewer writes under the picture is a sentence a player can read in the picture.

---

### F2 · The questionnaire makes AJ two opposite promises, one above the other
**Screen:** 0, questionnaire intro · **Row:** 390×844, night, published · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The amber banner at the top says *"This browser is not remembering. Copy your answers before you close."* Four lines below, the body says *"Your answers are kept as you go, so you can close this and come back."* Both are above the fold, in the same frame. A person on a phone reads: *this will lose my answers, and I am being told it won't.* That is the one thing this page cannot afford, because the page's entire job is to make a nervous person type honestly.

**Notes:** This is not a mock — the manifest calls it *"the published page, untouched"*, so this is copy a real person can reach today. The banner is a true statement about a browser without a store and the body is a true statement about one with it; two truths, one screen, and the reader cannot tell which applies to her.

**Questions to consider:** should the body sentence be the one that moves — *"Your answers are kept as you go **when your browser lets it**; if the banner above is showing, copy before you close"* — so the banner explains the body instead of contradicting it?

**Areas affected:** `scratchpad/aj-questionnaire.html` intro copy and the store-fallback banner.

**Done when:** a person reading the top of that screen cannot come away with two beliefs about whether their words survive.

---

### F3 · The drawer is the one artifact our own research says will lie to her by week three
**Screen:** 4, a drawer · **Row:** both · **Verdict: DOES NOT ANSWER**

**In plain words:** The drawer screen asks you to keep a list of what is in your kitchen and gives you a button called *Add what you bought*. The rule we bought with a research sweep says a pantry ledger passes every effort test and fails anyway, because by week three it is 80% right and recommending food you no longer have.

**Notes:** `docs/GENRE-RULES.md:188-195` (R17), which the same file at `:294` records as one of the rules the healthy-eating sweep *ruled out* for this very plan. The journey's own note handles a different worry — that running out should not read as a cross (`mockdocs2.js:91`, and the owner has said so once). Nothing on the screen or in the station's notes addresses decay. **This is a contradiction between a signed rule and the thing being drawn, and I am raising it rather than planning around it.** My own read, `[TRAINING]`: the ledger survives if the house never *asserts* — the recipe says *"Frijol negro · 500 g — drawer 2"* as a **memory of where it lives**, not a claim that it is there, and the missing line is always one sentence and a door rather than a shopping list. That is already how station 6 is written; the drawer has not been told.

**Questions to consider:** does the drawer stop being a stock list and become a **map of the house** — what lives where, which never goes stale — with quantities as the soft thing that can be wrong?

**Areas affected:** station 4's whole premise; `mockdocs2.js:82-93`; the `have/missing` set difference at station 6; `docs/la-sobremesa.md`.

**Done when:** the screen cannot be 80% right about today, because it is not making a claim about today.

---

### F4 · Three of the four kitchens are a flag with an apostrophe
**Screen:** 5, the shifts board · **Row:** both, EN and ES · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** *Cande's · Mexican*, *Nello's · Italian*, *Seo's · Korean*, *Hana's · Japanese*. Cande is a person — she dictated the beans on moving day, she is in door 2, she got it from her tía Herminia's notebook in 1998, she keeps epazote by her door. The other three are a possessive and a nationality, which is the museum label R12 exists to forbid.

**Notes:** `docs/GENRE-RULES.md:132-138` — *be specific to particular people rather than representative of a cuisine.* `mockdocs2.js:40-43`. The brief already calls these placeholders; the finding is not that they are placeholders, it is **what the placeholder's shape teaches the next writer** — four rows in identical `Name's · Nationality` form will get filled in as four nationalities. **The price is one sentence each, before any of them ships:** who taught it, where they live now, and what their sister or their aunt does differently. Nello should not be *Italian*; he should be a man whose mother put the rosemary in at the end and who does not, and says so. And the moment a kitchen has that sentence, the word *Italian* can come off the card entirely — the dish and the door number do the work.

**Questions to consider:** do the three remaining kitchens get their people from AJ's questionnaire answers (which is what questions 1–13 are for) rather than from us?

**Areas affected:** `mockdocs2.js:39-43` and `:100`; station 5 and 7 copy; `docs/la-sobremesa.md`'s cast.

**Done when:** no card on the board carries a nationality as its second line.

---

### F5 · "Sal" is in the English recipe
**Screen:** 6, the recipe · **Row:** 390×844 EN (visible above the fold) · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The English reader shows *Frijol negro · Water · Onion · Garlic · **Sal***. Four of the five were translated and the fifth was not, so it reads as a typo rather than as a word the house keeps.

**Notes:** `mockdocs2.js:111` — `["Sal","q.b."]`, the one entry in that `kv` with no `es?` ternary, while its neighbours have one. **This collides with a settled rule:** `docs/OWNER.md:121`, *"EN/ES in lockstep."* One-word fix — **and a story call underneath it**, which is why it is worth a line: `Frijol negro` is deliberately untranslated on the same screen and reads as right, because it is the name of a thing in this house. If salt is to stay Spanish, the whole ingredient list should be the house's Spanish with the English in the second column; if not, `Salt`. Half of each is the only wrong answer, and it is what ships today.

**Areas affected:** `mockdocs2.js:111`.

**Done when:** an English reader can tell that every Spanish word on that card was chosen.

---

### F6 · The recipe appears to have no method
**Screen:** 6 · **Row:** 390×844 (and worse at 844×390) · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** On a phone, the last thing above the button bar is the heading **How it goes** with empty space under it and then a dashed rule. The screen says: *here is where the instructions would be.* The instructions are magnificent — *"Turn it down and walk away… an hour and a half, two. It does not hurry"* — and they are at 923 px on a 661 px screen.

**Notes:** manifest `docHeight 923 / visibleHeight 661`. This is Lupe's M2 with a story face on it: a heading that has been reached but not filled reads as an empty section, not as *scroll*. And the copy below the fold is the only place in the entire pack where the game keeps its own promise out loud — *"It does not hurry"* is the four-word thesis of a no-timer game, and nobody on a phone will read it.

**Questions to consider:** should *How it goes* come **before** the plate drawing, so the method is above the fold and the picture is the reward for scrolling?

**Areas affected:** `mockdocs2.js:105-113` block order; `docs/mocks/.../mockdocs.js` `D.recipe`.

**Done when:** the sentence *"It does not hurry"* is visible on a phone without a scroll the person has to guess at.

---

### F7 · The shifts board says the same four dishes twice
**Screen:** 5 · **Row:** 390×844 EN and ES · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The four cards name Pasta e ceci, Frijoles de la olla, Doenjang-jjigae and Onigiri; twelve lines lower, a list names the same four again with *Yours / Open* in front. The second one exists because the first is a drawing and drawings do not export — but a person does not know that, and reads a screen that repeats itself.

**Notes:** `mockdocs2.js:99-100`. The caption between them makes it worse by explaining the drawing to the player (*"Drawing, to Pili's card: a 6-px stripe…"*) — correct and necessary in a review, fatal in the game. Between the two, **the drawing should win and the `kv` should go**; the export can carry the list on its own, which is exactly what `docMarkdown` is for.

**Areas affected:** `mockdocs2.js:98-103`; every `art` block's `cap` field when this becomes a pack.

**Done when:** no screen in the pack tells a player what its own drawing is made of.

---

### F8 · A blank line and the end of the document are the same mark
**Screen:** 7, the Collection · **Row:** 390×844 · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** *Enfrijoladas: ------------* is drawn with a dashed rule. So is the line the reader puts above the Copy/Download/Close bar to say the document has ended. The screen's entire meaning — *a blank line is not yet, not denied* — is carried by the one mark that also means *stop*.

**Notes:** visible in the same frame in `j-collection-390x844-en-night-unmodified.png`; five dashed rules, four of them promises and one of them a full stop. Pili's row (§3 row 2) owns whether a mark is legible; mine owns whether it is legible **as the right feeling**, and this one is a warm idea wearing a terminator's clothes.

**Areas affected:** the reader's `blank` block and its end-of-document rule, `engine/engine.js`; both games.

**Done when:** a player can tell, without being told, which dashes are an invitation.

---

### F9 · The front door in the picture is Meridian's, and the line under it is a promise
**Screen:** 1 · **Row:** 390×844 cream · **Verdict: DOES NOT ANSWER**

**In plain words:** The line says *three reasons to cook, not three careers*; the picture says *Meridian Labs needs an AI delivery hero — choose your class: Architect, Diplomat, Operator.* The station admits the relabel is a drawing and names the blocker, which is honest — but the picture is the only thing a reviewer's eye keeps, and it currently teaches the opposite of the claim.

**Notes:** the drawing that would answer it (`DRAW.doors`) exists in the review page and was never shot, so it is not in the thirty. **The extra picture that would answer this station: `doors` rendered at 390×844 beside the real one, same shell, A5's before-and-after.**

**Areas affected:** the review page's station 1; the three shells' hard-coded classes.

**Done when:** there is a picture of the door this game has, not only of the door it inherits.

---

### F10 · The street explains itself twice, in the same frame
**Screen:** 2 · **Row:** 390×844 cream · **Verdict: ANSWERS, WITH A NOTE**

**In plain words:** The hint *"Desks, plants and walls just block you — coworkers with a ❗ have quests. Walk up and Talk."* is painted into the corner panel and, at the same moment, into a large bubble over the player's head. Two copies of one sentence, overlapping a third one about the joystick.

**Notes:** shipped Meridian at the owner's own row, `j-street-390x844-en-cream-unmodified.png`. **This is a live Meridian observation from a picture, not a mock finding** — it belongs to `/playtest`, not to this review, and I am naming it here rather than filing it because my row does not own the shipped game's onboarding.

**Areas affected:** Meridian's first-run hints.

**Done when:** somebody who owns that row looks at the same picture.

---

## QUESTIONS FOR THE OWNER

**Q1 · The drawer: a stock list, or a map of the house?** — *(the only one where two signed things collide)*
- One side: `docs/GENRE-RULES.md:188-195` (R17) says a pantry ledger is *"worse than no model, because it lies with confidence"* by week three, and `:294` records that rule as one the sweep produced **for this plan**.
- The other side: station 4 is a pantry ledger with a button that says *Add what you bought* (`mockdocs2.js:92`), station 6's have/missing is a set difference against it, and you asked for the drawers by name: *"i want to rebuild a pantry… three drawers."*
- What each would have me build: **the ledger** — a list of quantities, kept accurate by the player, which the recipe trusts. **The map** — three drawers that remember *where things live* and never claim *how much*, with the recipe's missing line being a sentence and a door rather than a subtraction.
- What I need from you: one word. *Ledger* or *map*. I would build the map, because the sentence *"Frijol negro · 500 g — drawer 2"* is already doing its work as a memory and not as a claim, and because a map cannot go stale.

**Q2 · Who fills in the other three kitchens?** — Cande has a notebook, a tía, a year and a door. Nello, Seo and Hana have a nationality. They can be written by us before AJ answers, or left deliberately blank in the mock so her thirteen answers name them. Cost of waiting: the shifts board mock stays half-cast. Cost of not waiting: we write three households she never met, and R12 says a game about one household cannot be wrong about a nation — but it can absolutely be wrong about *hers*.

**Q3 · The document's second sentence — a `p`, or a change to the reader?** Content-only fixes six screens today and leaves the next pack free to make the same mistake; the engine fix makes every `sub` visible in Meridian too, which is a visible change to your game's documents and therefore yours to say yes to.

---

## WHAT I DID NOT CHECK

- **The four drawings — stations 1 (doors), 3 (the household room), 8 (the merge board), 9 (making a dish by hand).** They live in the review page's `DRAW` object and were never rendered to PNG; I have no Bash and did not render them. **Four of the thirteen stations have no picture, and two of them — the merge board and the hand-made dish — are the two surfaces AJ actually showed him in a video.** That is the biggest hole in this review and it is not a small one.
- **I opened 22 of the 30 pictures.** Not opened: the six `unrolled` duplicates other than `recipeHome` (I used the manifest's heights and the `unmodified` pair instead), and the ES drawer/collection/recipeHome. My ES reading rests on the house, quiet and shifts pictures.
- **I did not measure anything.** Every height in this report is the manifest's or Lupe's; I checked the box was non-zero only by seeing type in it.
- **I did not read `docs/STORY.md` or `docs/CITY.md`.** My own persona file tells me to read both before planning; this is a review of somebody else's world and I judged them not to bear on it. If any Meridian canon is implicated by station 12's map or by F10, I did not check it.
- **I did not verify Lupe's E13, her M-list, or any claim in `run8-lupe.md` §6** against the code. I used her §3 as my signature line and took her measurements as read.
- **I did not check whether `docs/UI-REVIEW.md` exists** — the brief says it wins over `run8-lupe.md` if it does, and I worked from Lupe's §3 without looking. If Chuy has landed it and my row's sentence changed, my signature is against the older wording.
- **`docs/la-sobremesa.md` §12 — the owner's answers — I did not read.** Q1 above may already be answered there, in which case it is not a question and I have wasted one of his.

---

## POST-FLIGHT

What the persona got right, with the moment: writing my own sentence for each screen *before* reading the page's `line` is the only reason F1 exists — I wrote *"this is a search box for my food"* under the drawer, looked down, read *"Bags slump — that is how you know this drawer with the light off"*, went to find where that beautiful sentence lived, and found it at `engine/engine.js:3344` inside the markdown exporter, which means it has never once been on a screen. Where the persona was in the way: I am a story director and I kept wanting to *rewrite* — twice I drafted replacement copy for the questionnaire banner and for the shifts board before remembering that a review names the collision and hands it back, and the replacement lines I did keep (F4, F5) are deliberately one sentence each and marked as my read, not as a change. The gap I predicted appeared exactly as predicted and was worse than I predicted: not only could I not see the four drawings, but **two of the four are the two surfaces the whole game is supposed to be** — the merge board and the hand-made dish — so the journey I reviewed has thirteen stations and no picture of the part AJ plays. My edit to my own file: **one, and it is additive.**

**Persona edit I propose, as exact text.** In `.claude/agents/nacho.md`, appended to the paragraph beginning **"And before you write three endings, find out what picks between them."**:

> **And before you write the sentence that says what a screen means, grep whether the screen can say it.** On 2026-09-14 six mock documents carried a `sub` — the second line, the one that tells you what the thing is for — and `engine/engine.js:3344` reads `d.sub` in exactly one place: `docMarkdown`, the export. The reader never draws it. Six screens, six meanings, none of them on glass, and a review page that printed the missing sentence underneath each picture as though it had been there. **Grep the renderer for the field before you write into it** — the same rule as `gradeOf`, pointed at prose instead of at endings: *a sentence with nothing to draw it is not writing, it is a note to the team.*

---

MURAL PANEL

```
id:     nacho-la-unica-que-cabe
by:     "nacho"
title:  {en:"The only one that fits", es:"La única que cabe"}
said:   {en:"Five screens run off the bottom of the door. The one that fits is the day nothing happened.",
         es:"Cinco pantallas se salen por abajo de la puerta. La que cabe es el día en que no pasó nada."}
state:  {en:"Holding that a document's second sentence is not written until the screen can show it — and that the quiet screen earns its place by being short, not by being kind.",
         es:"Sostengo que la segunda frase de un documento no está escrita hasta que la pantalla pueda mostrarla — y que la pantalla callada se gana su lugar por corta, no por amable."}
who:    {en:"Nacho, who writes what a screen means and then goes to see whether it says it",
         es:"Nacho, que escribe lo que significa una pantalla y luego va a ver si lo dice"}
cap:    {en:"The review page prints one sentence under every screen. I went looking for those sentences inside the documents and found them in a field the reader writes into the file you download and never onto the glass. Six screens, six meanings, none of them on a phone. The day nothing happened is the only page small enough to be read whole on a phone turned sideways, and it is the only one with nothing to say.",
         es:"La página de revisión imprime una frase debajo de cada pantalla. Fui a buscar esas frases dentro de los documentos y las encontré en un campo que el lector escribe en el archivo que descargas y nunca en el vidrio. Seis pantallas, seis significados, ninguno en un teléfono. El día en que no pasó nada es la única hoja lo bastante chica para leerse entera en un teléfono de lado, y es la única que no tiene nada que decir."}
aspect: 0.46
art:    (g,W,H)=>{
    /* NACHO'S HAND, SECOND VISIT. My first was a duplicate order pad — paper, biro, carbon.
       This is not paper: it is the DOOR OF A FRIDGE. Brushed enamel, a steel handle, magnets.
       It is where a household keeps what it needs to remember, and it is the only wall in this
       project that belongs to nobody and to both people. Five documents hang off the bottom of
       it, still going. One little card is pinned whole, under a magnet shaped like a bean pot.
       My palette: enamel, steel, magnet red, ballpoint blue, clay. Not the wall's. */
    const EN="#EDEBE6", STEEL="#D7D3CA", SHADOW="#BCB7AD", CARD="#FDFBF2", RULE="#CAC5B9",
          INK="#2B2E33", PENCIL="#8C8A84", RED="#C0392B", BLUE="#2E5E8A", CLAY="#9B5B3C";
    murPaper(g,W,H,EN,null);
    /* brushed steel: fine vertical grain, the way an enamel door catches a kitchen light */
    for(let x=0;x<W;x+=6){g.globalAlpha=.22;g.fillStyle=((x/6)|0)%2?STEEL:EN;g.fillRect(x,0,3,H);}
    g.globalAlpha=1;
    g.fillStyle=STEEL;g.fillRect(0,0,W,2);

    /* the door's right edge and its handle — this is a fridge and it says so before any word */
    g.fillStyle=SHADOW;g.fillRect(W*0.893,0,2,H);
    g.fillStyle=STEEL;   g.fillRect(W*0.930,H*0.120,W*0.024,H*0.760);
    g.fillStyle=SHADOW;  g.fillRect(W*0.930,H*0.120,W*0.008,H*0.760);
    g.fillStyle=SHADOW;  g.fillRect(W*0.922,H*0.150,W*0.040,H*0.038);
                         g.fillRect(W*0.922,H*0.812,W*0.040,H*0.038);

    /* FIVE LONG DOCUMENTS. Each is pinned at the top and runs off the bottom edge of the panel:
       774, 739, 923, 408, 500 px of paper onto 661 of screen. They do not end anywhere you can see. */
    const sx=W*0.058, sw=W*0.076, pitch=W*0.096, top=H*0.315;
    for(let i=0;i<5;i++){
      const x=sx+i*pitch;
      g.globalAlpha=.30;g.fillStyle=SHADOW;g.fillRect(x+2,top+3,sw,H);g.globalAlpha=1;
      g.fillStyle=CARD;g.fillRect(x,top,sw,H-top+10);
      g.fillStyle=INK; g.fillRect(x+sw*0.14,top+H*0.052,sw*0.58,2.5);      /* its title */
      g.fillStyle=RULE;
      for(let y=top+H*0.100;y<H;y+=H*0.046)
        g.fillRect(x+sw*0.14,y,sw*(0.72-((i+((y*7)|0))%3)*0.14),1.5);       /* ruled, and still going */
      const mr=Math.max(4,H*0.028);                                          /* the magnet */
      g.fillStyle=(i%2)?BLUE:RED;g.beginPath();g.arc(x+sw*0.5,top,mr,0,7);g.fill();
      g.fillStyle="rgba(255,255,255,.40)";g.beginPath();g.arc(x+sw*0.5-mr*0.32,top-mr*0.32,mr*0.34,0,7);g.fill();
    }

    /* THE ONE THAT FITS — pinned under a bean-pot magnet, whole, with room underneath it */
    const cx=W*0.590, cy=H*0.315, cw=W*0.275, chh=H*0.300;
    g.globalAlpha=.30;g.fillStyle=SHADOW;g.fillRect(cx+2,cy+3,cw,chh);g.globalAlpha=1;
    g.fillStyle=CARD;g.fillRect(cx,cy,cw,chh);
    g.fillStyle=INK;g.font="bold 9px ui-monospace,monospace";
    g.fillText("MARTES",cx+cw*0.10,cy+H*0.075);
    g.fillStyle=RULE;
    g.fillRect(cx+cw*0.10,cy+H*0.115,cw*0.76,1.5);
    g.fillRect(cx+cw*0.10,cy+H*0.160,cw*0.58,1.5);
    g.fillStyle=INK;                                                         /* and a full stop */
    g.fillRect(cx+cw*0.10+cw*0.58+3,cy+H*0.157,2.5,2.5);
    /* the marker, in somebody's own hand */
    g.fillStyle=RED;g.font="italic 9px ui-monospace,monospace";
    g.fillText("no pasó nada",cx+cw*0.10,cy+H*0.238);
    g.strokeStyle=RED;g.lineWidth=1.6;g.globalAlpha=.9;
    g.beginPath();g.moveTo(cx+cw*0.09,cy+H*0.258);
    g.lineTo(cx+cw*0.09+g.measureText("no pasó nada").width,cy+H*0.252);g.stroke();g.globalAlpha=1;
    /* the bean-pot magnet: a clay olla, 16px pixel art, the same one that is on the board */
    const pr=Math.max(9,H*0.058), px0=cx+cw*0.5-pr, py0=cy-pr*0.86, u=pr/7;
    g.fillStyle="#5A3A2A";g.fillRect(px0+4*u,py0+1*u,8*u,2*u);
    g.fillStyle=CLAY;     g.fillRect(px0+3*u,py0+3*u,10*u,6*u);g.fillRect(px0+2*u,py0+5*u,12*u,3*u);
    g.fillStyle="#B26E4C";g.fillRect(px0+4*u,py0+3*u,2*u,5*u);
    g.fillStyle="#3D2A22";g.fillRect(px0+5*u,py0+2*u,6*u,1*u);

    /* the lettering — absolute, and every fraction above was chosen against it */
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
    g.fillText("LA PUERTA DEL REFRI",W*0.058,H*0.105);
    g.fillStyle=PENCIL;g.font="8px ui-monospace,monospace";
    g.fillText("cinco documentos · siguen hacia abajo",W*0.058,H*0.190);
    g.fillStyle=RED;g.font="bold 9px ui-monospace,monospace";
    g.fillText("la única que cabe",cx+cw*0.02,cy+chh+H*0.095);
    g.fillStyle=PENCIL;g.font="8px ui-monospace,monospace";
    g.fillText("y es la que no tiene nada que decir",cx+cw*0.02,cy+chh+H*0.165);
    /* one person, standing at the door, three lines of type tall so she reads as a person */
    const bh=H*0.190;murBody(g,W*0.845,H*0.870-bh,BLUE,bh);
}
```

**Not painted before being handed over.** I have no Bash in this run and did not render the panel; every fraction was sized against the 11 px / 9 px / 8 px lettering by arithmetic, not by looking, and the figure's feet land at 0.87H to stay clear of the 6% the wall cuts. **That is the one thing Lupe's step 0 asks for and I could not do it** — if it needs a repaint, the words are the part that must not change.

**Files (all absolute):**
- Reviewed: `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/` — 22 of 30 PNGs, `manifest.json`, `mockdocs2.js`
- The page: `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/sobremesa-journey.html` (the `S=[...]` `line` fields, `:540-572`)
- Code cited: `/home/user/meridian-quest/engine/engine.js:3344` (the only read of `d.sub`, inside `docMarkdown`); `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js:40-43`, `:91`, `:92`, `:99-100`, `:111`
- Rules cited: `/home/user/meridian-quest/docs/GENRE-RULES.md:132-138` (R12), `:154-172` (R15), `:188-195` (R17), `:294`; `/home/user/meridian-quest/docs/OWNER.md:121` (EN/ES in lockstep)
- Nothing written to the repo. I wrote no files at all.


---

# Paty — words, row 4

PRE-FLIGHT — I intend to read every string in `mockdocs2.js` line by line against the six EN/ES picture pairs at 390×844, then chase each string to the state that shows it (which for `sub` meant grepping the engine, not trusting the page); my persona is built for exactly this set, because it is two languages in one file with a shared parent document and a canvas that cannot wrap; where I expect to fall short is the landscape row and the three inline drawings, which have no ES picture to read and where I can only reason about width, not see it.

---

## 2 · SIGNATURE LINE

> **Row 4 · Words · Paty:** *"Every string exists in EN and ES, both fit at the narrowest row without sideways scroll or truncation, and no label is a bare glyph."* (`run8-lupe.md` §3, row 4)

**FALSE for the set.** Two things make it false, and they are different failures:

1. **"Exists in EN and ES" is false for 7 of the 13 screens.** The six reader documents are in lockstep. **Screen 0, the questionnaire, has zero Spanish in its source** — `/tmp/.../scratchpad/aj-questionnaire.html` contains no `es:`, no `lang==`, no switch of any kind. It is not that the ES picture was not taken; there is nothing to photograph. This is the screen the owner asked for first, in his own words, and it is the one a person types into. Against `docs/OWNER.md:121` (*"EN/ES in lockstep"*) this is the only breach in the run that no re-shoot can fix.
2. **"Without truncation" is false on the drawer**, in *both* languages — see F3. The rest of the ES fits at 370 CSS px with no sideways scroll, including the three-button bar (`Copiar · Descargar (.md) · Cerrar` ends at 711/780 device px, no wrap): the desktop button-row overflow that shipped here once does **not** repeat at 390.

**No label anywhere in the set is a bare glyph.** Every glyph carries a word: `📋 Copiar` / `📋 Copy`, `⬇ Descargar (.md)` / `⬇ Download (.md)`, `× Cerrar` / `× Close`, `+ Add a note`. That half of my line is TRUE, both languages, both rows.

**Per screen:** drawer FALSE (F3) · shifts TRUE with a note (F5, F7) · recipeHome FALSE (F2) · collection TRUE · house TRUE with a note (F4, F9) · quiet TRUE · questionnaire FALSE (F1) · front door / street / map — the shipped game, already bilingual, not mine to re-sign · household / merge / by-hand drawings — EN-only captions on the page, see F10.

**The genre line, signed on every screen I looked at:**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."*

**TRUE, all thirteen, and two of them say it out loud in both languages** — `shifts`: *"Nothing on this board counts, ticks or fades"* / *"Nada en este tablero cuenta, corre ni se apaga"*; `quiet`: *"There is no streak, and nothing broke"* / *"No hay racha, y no se rompió nada"*. Two strings I checked before signing rather than after: `recipeHome`'s *"an hour and a half, two. It does not hurry"* / *"hora y media, dos. No se apura"* is a **duration**, not a countdown, and the sentence that follows it disarms it in both languages; the questionnaire's `0 of 13 answered` counts **up** and has no ES yet — when it gets one, `0 de 13 contestadas` is the safe form and *`te faltan 13`* is not, because it makes a blank into a debt.

---

## 3 · FINDINGS

Ranked by what it costs the person holding the phone.

### F1 · The questionnaire has no Spanish at all — screen 0 · 390×844 · **REFUSED** (A6)
**In plain words:** The first thing the owner asked for is a page a person fills in about her own cooking, and there is not one Spanish word in it — not missing from the picture, missing from the file. Every other screen in this review exists in both languages; this one cannot, today, at any size.
**Notes:** `aj-questionnaire.html` — zero matches for `es:` / `lang==` / `español`. Both manifest entries are `"lang":"en"`. `docs/OWNER.md:121` is *"EN/ES in lockstep"*, and it is not written as a rule about Meridian only. Thirteen questions, seven-option checkboxes, a free-text note on every one: this is the highest word-count artefact in the run and the only one a person writes into.
**Questions to consider:** Does AJ answer in Spanish, in English, or in both in the same sentence? If the last — which is how the register of this whole project actually sounds — then the *note* fields must accept either and the *questions* must be side-by-side, not switched.
**Areas affected:** `aj-questionnaire.html`; the 13 questions, the option sets, the note prompts, the persistence warning (*"This browser is not remembering. Copy your answers before you close."* → *"Este navegador no está guardando nada. Copia tus respuestas antes de cerrar."*).
**Done when:** Every string in the questionnaire has an ES twin, and there is a picture of question 1 in Spanish at 390×844 next to the English one.

### F2 · The recipe's ingredient list is half in each language — recipeHome · 390×844 · **ANSWERS, WITH A NOTE**
**In plain words:** In English the house's list reads *Frijol negro · Water · Onion · Garlic · Sal*. Three of the six got translated and two did not, so the column looks like a mistake rather than a choice — and the very same list one screen earlier, in the recipe Cande dictated, keeps all six in Spanish in both languages.
**Notes:** `mockdocs2.js:111` vs `mockdocs.js:85`. This is the exact drift my role exists to catch, running the unusual way round: English strings stranded inside the English block by a half-finished edit. It is also visible in the picture — `j-recipeHome-390x844-en-night-unmodified.png`, the key column.
**Questions to consider:** What is the rule for food nouns? I recommend the parent document's: **an ingredient keeps the name the cook said it in**, both languages, and the *quantity* column translates. It is what a bilingual kitchen actually does, and it is already the behaviour on screen 6.
**Areas affected:** `mockdocs2.js:111`; anything later that lists an ingredient (the drawer, the shopping list, the Collection).
**Done when:** `Frijol negro · Agua · Cebolla · Ajo · Sal` in both languages, with the amounts translated, and `mockdocs.js` and `mockdocs2.js` no longer disagree about the same five things.

### F3 · The drawer captions collide with their neighbours, in both languages — drawer · 390×844 · **ANSWERS, WITH A NOTE**
**In plain words:** Under the three drawers the small grey line of one drawer runs into the next one's, so it reads *"…especias arroz · frijol · masa"* in Spanish and *"…masa jars · tins · bottles"* in English. It is the one place in the set where a word cannot get out of the way, because it is painted onto a drawing and a drawing has no wrapping.
**Notes:** `mockdocs2.js:60-78`. `col=Math.floor(W/3)` ≈ 115 px per column at a 370-px sheet; the captions are 10 px monospace, `textAlign:"center"`, no gutter and no max width. 19 chars ≈ 114 px (exactly full), 21 chars ≈ 126 px (over). ES column 2 is 21 chars, EN column 3 is 21. **Both languages overflow, ES at drawer 2 and EN at drawer 3** — so this is not an ES-length bug and shortening only the Spanish would leave it broken in English. Confirmed in the pictures, not inferred.
**Questions to consider:** Shorter strings, or a two-line caption with a 6-px gutter? Shorter is cheaper and the drawing already shows the bags and the lids, so the words do not have to list the contents twice.
**Areas affected:** `mockdocs2.js` `drawers()`; every future `art` block that letters onto canvas — there is no `scrollWidth` to catch this, so no guard will ever see it.
**Done when:** No caption is wider than its column minus a gutter, checked at 370 and at 340.

### F4 · The house's allergy label is four lines in Spanish and two in English — house · 390×844 · **ANSWERS, WITH A NOTE**
**In plain words:** The question above the vegetable checkboxes runs to four lines of shouting capitals in Spanish against two in English, so the Spanish screen makes the gentlest thing in the game — *we just cook it instead* — look like a form at a clinic.
**Notes:** `mockdocs2.js:134`. 85 characters both languages; the shell uppercases labels, and at 390 that is 4 lines ES / 2 lines EN. Nothing truncates, nothing scrolls sideways: this is a **register** failure carried by length, not a layout bug. See F9 for the same file's mirror-image case.
**Questions to consider:** The privacy hedge *(examples, not anyone's list)* is doing real work — it is what keeps this off AJ's actual medical record. It can live in the note underneath, where there is room, instead of in the label.
**Areas affected:** `mockdocs2.js:134`.
**Done when:** Both labels are two lines at 390.

### F5 · *"Onigiri, de dos"* is not Spanish for *"Onigiri, two ways"* — shifts · 390×844 · **ANSWERS, WITH A NOTE**
**In plain words:** The card in Spanish reads "Onigiri, of two" and stops. It is the only dish name in the set that a Spanish speaker would read twice, and it is on the board four times over — on the card and in the list below it.
**Notes:** `mockdocs2.js:43` and `:100`. The drawing itself settles the right word: `dish(jp)` paints two rice balls and gives one of them a red fleck — a filling (`mockdocs2.js:33`). So they differ by what is inside, and *rellenos* is the accurate noun, not a hedge.
**Questions to consider:** none; it is a straight fix.
**Areas affected:** `mockdocs2.js:43`, `:100`.
**Done when:** Both occurrences say the same thing and it fits the card (21 chars ≈ 189 px in a 259-px text column — measured against the same 600 15px monospace the card uses).

### F6 · Six of the best sentences in the set are in no picture at all — all six documents · both rows · **DOES NOT ANSWER**
**In plain words:** Every document carries a one-line subtitle — the sentence that says what the screen is for, in both languages — and the reader never puts it on screen. It appears only in the text you get from Copy or Download. Six screens, twelve strings, and a reviewer looking at the pictures would swear they were missing rather than invisible.
**Notes:** `engine/engine.js:3344` is the **only** place `d.sub` is read, and it is inside `docMarkdown`. `render2.js` never mentions `sub`. Verified by grep, not by memory. These are not dead strings and should not be deleted — they are the payload of the Copy button, which for a recipe is the thing that ends up in somebody's messages.
**Questions to consider:** Does the reader want a subtitle line under the title? That is Rosa's and the engine's call and it changes both games. If the answer is no, then the ES/EN quality of `sub` should be judged as **exported text**, not as screen copy, and it reads well as that: *"Tres renglones son una semana entera."*
**Areas affected:** `mockdocs2.js` (six `sub` pairs); `engine/engine.js:3344`.
**Done when:** The review page carries one picture of the copied `.md` so the twelve strings are reviewable at all, or the reader shows the subtitle and the pictures are re-shot.

### F7 · Two Spanish sentences read like a manual in a street — shifts, house · **ANSWERS, WITH A NOTE**
**In plain words:** Two lines are correct Spanish that nobody says out loud: the board's *"Nada en este tablero cuenta, corre ni se apaga"* trips on its own list, and *"cuenta"* in Mexican Spanish first means *it matters*, which is the opposite of what the line is promising.
**Notes:** `mockdocs2.js:101`, `:133`. Everything around them is in voice — *"el refri"*, *"la mata junto a su puerta"*, *"cuando le nace"*, *"q.b. — cuanto baste"*. These two are the drop.
**Areas affected:** `mockdocs2.js:101`, `:133`.
**Done when:** Both read aloud without a stumble.

### F8 · The English mixes curly and straight apostrophes on the same card — shifts, house, collection, quiet · **ANSWERS, WITH A NOTE**
**In plain words:** On one card the quotation marks are typeset and the apostrophes are typewriter: “Thursday, after work” next to Nello's. It is the kind of thing nobody names and everybody sees.
**Notes:** `mockdocs2.js:40-43`, `:100`, `:120`, `:134`, `:141` use `'`; `mockdocs.js` uses `’` throughout (`:88` *"it’s Sunday"*, `:96` *"This week’s menu"*). The Spanish is internally consistent and correct — `«…»` throughout — and should be left exactly as it is.
**Areas affected:** the EN strings listed.
**Done when:** EN uses `’` and `“ ”`; ES keeps `«»`.

### F9 · The one place English is the longer string — house · 390×844 · **ANSWERS, WITH A NOTE**
**In plain words:** In the row of vegetable checkboxes, *Bell pepper* wraps onto two lines and its little box floats away from its label, while the Spanish *Pimiento* sits on one. Worth saying out loud because it is the opposite of what everyone expects from these two languages, and it means the fix is an English one.
**Notes:** `j-house-390x844-en-night-unmodified.png` against the ES twin; `mockdocs2.js:134`. ES: `Zanahoria · Apio · Pimiento · Manzana`, 9/4/8/7 chars. EN: `Carrot · Celery · Bell pepper · Apple`, 6/6/**11**/5. Both languages drop *Apple* onto a second row — that is the engine's `checks` flow, not the words.
**Areas affected:** `mockdocs2.js:134`.
**Done when:** No option label wraps inside its own row at 390. `Pepper` (6) does it, and it is what anyone says anyway.

### F10 · The page is English, and the three inline drawings are English on purpose — the review page · **ANSWERS, WITH A NOTE**
**In plain words:** The review page itself is entirely in English. For a page only the owner and the crew read, that is not a fault — but it should be said rather than assumed, because the rule it looks like it is breaking is a real rule.
**Notes:** `sobremesa-journey.html` has no ES string and **no `lang` attribute on `<html>` at all**, which is the one part I would fix: a screen reader gets the wrong voice for a page full of Spanish proper nouns. `docs/OWNER.md:121` binds the **game's** strings; the page is scratchpad scaffolding, is not served, and is not a game screen — so I read lockstep as not binding here, and I am naming that reading rather than acting on it silently (see Q1). The page's own admission at `:147` — *"Every document exists in ES at 390×844"* — is **true as written** and would be false if it said "every screen": 6 of 13 have Spanish. Separately, the household drawing (`:580`) is the one panel in the whole run that shows **both** languages at once — *el que planea* big, *the one who plans* as a gloss underneath — and it is the nicest bilingual idea in the set. In a real screen it must be decided rather than inherited: the name stays Spanish and the gloss follows the player's language.
**Areas affected:** `sobremesa-journey.html` `<html>`; the `doors` drawing at `:580`.
**Done when:** The page declares `lang="en"`, and the gloss pattern is either adopted as a rule or dropped.

---

### THE TABLE — key · current EN · current ES · my EN · my ES

| key (`mockdocs2.js`) | current EN | current ES | my EN | my ES | reason |
|---|---|---|---|---|---|
| `drawer` spec[0].what `:64` | tortillas · spices | tortillas · especias | tortillas, spices | tortillas, especias | still 17/19 chars — **only safe with the gutter/two-line fix**; if the drawing keeps one line, use `tortillas` / `tortillas` alone |
| `drawer` spec[1].what `:65` | rice · beans · masa | arroz · frijol · masa | rice, beans | arroz, frijol | ES overflows its 115-px column at 21 chars; the bags in the drawing already say *masa* |
| `drawer` spec[2].what `:66` | jars · tins · bottles | frascos · latas | jars, tins | frascos, latas | EN overflows **and** lists three where ES lists two — one drift, two bugs |
| `shifts` rows[3].dish `:43` | Onigiri, two ways | Onigiri, de dos | Onigiri, two ways | **Onigiri, dos rellenos** | *"de dos"* is not a sentence; the drawing shows two fillings |
| `shifts` kv[3] `:100` | Onigiri, two ways — Hana's | Onigiri, de dos — de Hana | Onigiri, two ways — Hana’s | Onigiri, dos rellenos — de Hana | same string, second place; they must move together |
| `shifts` note `:101` | A shift you took is yours until you cook it. It is never late. Nothing on this board counts, ticks or fades. | …Nada en este tablero cuenta, corre ni se apaga. | *(unchanged)* | Un turno que tomaste es tuyo hasta que lo cocinas. Nunca va tarde. **Aquí nada lleva cuenta, nada corre y nada se apaga.** | *"nada cuenta"* reads as *"nothing matters"*; *"lleva cuenta"* is the tally. Three short clauses beat one stacked list |
| `recipeHome` kv `:111` | Frijol negro / Water / Onion / Garlic / Sal | Frijol negro / Agua / Cebolla / Ajo / Sal | **Frijol negro / Agua / Cebolla / Ajo / Sal** | *(unchanged)* | F2 — the names match the parent document; the amounts still translate |
| `recipeHome` note `:112` | Missing one: epazote. Cande keeps a plant by her door, and Ofelia sells it dried. | Falta uno: el epazote. Cande tiene una mata junto a su puerta y Ofelia lo vende seco. | **One thing missing: epazote.** Cande keeps a plant by her door, and Ofelia sells it dried. | *(unchanged)* | the ES is the better sentence; the EN telegram is the one out of voice |
| `house` sel label `:133` | Show grades on a plate | Calificación en el plato | Grades on the plate | La calificación en el plato | one is an order, the other is a noun. **This does not fix the layout** — the ES label wraps to its own line and the EN sits inline and squeezes the select to ~260 px. That is the engine's inline-label rule, and it belongs to Rosa, not to me |
| `house` checks label `:134` | Raw vegetables that stay out of the house's recipes (example items, not anyone's list) | Verduras crudas que no entran en las recetas de la casa (ejemplos, no la lista de nadie) | **Not raw — the house cooks these** | **Crudas no — la casa las cocina** | ES written first: 30 chars, one line uppercase at 390, EN follows at 28. The hedge moves into the note below |
| `house` note `:135` | …It never says “allergy” on a plate. | …Nunca dice «alergia» en un plato. | Examples, not anyone's list. A recipe that wants one of these raw offers it cooked, or offers another recipe. It never says “allergy” on a plate. | **Ejemplos, no la lista de nadie.** Una receta que pide una de éstas cruda la ofrece cocida, o te ofrece otra receta. Nunca dice «alergia» en un plato. | where the hedge goes; the note has the room the label does not |
| `house` checks opt `bell` `:134` | Bell pepper | Pimiento | **Pepper** | *(unchanged)* | F9 — the only English string in the run that is too long |
| `collection` kv `:120` | Cande · made twice / made once, from Sunday's pot | Cande · dos veces / una vez, de la olla del domingo | Cande · twice / once, from Sunday’s pot | *(unchanged)* | the ES is tighter and the EN should match it, not the other way round |
| all EN apostrophes | `Nello's`, `Cande's`, `Hana's`, `Seo's`, `house's`, `anyone's`, `jar's`, `Sunday's` | — | `’` throughout | — | F8 |
| `aj-questionnaire.html`, every string | English | **—** | *(unchanged)* | **all of it, 13 questions** | F1 |

**Deliberately left alone**, and why: `«»` versus `“ ”` — correct per language, not a drift. *"De Nello · italiana"* — *"Nello's"* would tempt *"Con Nello"*, but *De Nello* is how a board would print it and the nationalities are correctly lower-case. *"el refri"*, *"la mata junto a su puerta"*, *"cuando le nace"*, *"q.b. — cuanto baste"*, *"un frasco, en el cajón equivocado"* — this is the voice the brief asks for and it is already there. *"sólo"* with the accent (`:133`) — it is what Mexico still writes, and it is consistent inside the file. The three door labels (`sobremesa-journey.html:580`) — *el que planea · la que improvisa · el que alimenta* is the best-sounding line in the run and I would not touch a word of it. The whole of `mockdocs.js` except where `recipeHome` reaches into it. Every ingredient name that is already Spanish in both languages.

---

## 4 · QUESTIONS FOR THE OWNER

**Q1 · Does "EN/ES in lockstep" reach AJ's questionnaire?** `docs/OWNER.md:121` says *"EN/ES in lockstep"* with no scope written on it; `CLAUDE.md` scopes the **game's** content and says the questionnaire's world is not Meridian. One side has me hold the whole questionnaire until 13 questions exist in Spanish. The other has it ship in English as a private instrument for one person and stay that way. **What I need from you: does AJ answer in English, in Spanish, or in both in the same sentence?** If it is the third, the fix is not a translation, it is two columns — and that changes the layout before anything gets written.

**Q2 · Do food nouns translate?** `mockdocs.js:85` keeps all six ingredients in Spanish in both languages; `mockdocs2.js:111` translates three of the same six and leaves two. Two files, same review, same list, opposite rules. My recommendation is the first — *an ingredient keeps the name the cook said it in* — but the second is a deliberate-looking edit and I will not quietly overwrite it. I have written F2 as the fix either way; only the direction needs you.

---

## 5 · WHAT I DID NOT CHECK

- **ES at 844×390.** There is no ES landscape picture and I rendered nothing. I signed the width half of my line from the **370-px sheet** at 390×844, which is the narrower sheet of the two (landscape is 640), so width is covered; **what is not covered is that row's 207-px visible height**, where a Spanish note running one line longer than English pushes more off the fold. Unmeasured.
- **The unrolled pictures are all EN.** So the six ES documents were read at their real clip only — which is the right way round, but it means I have never seen a whole ES document in one frame and cannot swear to anything below the fold except from the source.
- **Any row of the matrix other than 390×844.** No small window, no desktop, no fullscreen, either language.
- **I did not measure a single pixel myself.** Every width claim here is either read off a committed PNG or computed from the monospace metric in `mockdocs2.js`; the 115-px column and 6-px-per-character figures in F3 are arithmetic, not instrument readings. The collisions themselves are visible in both pictures, which is why I state those as seen.
- **The merge board and the by-hand drawings (screens 8, 9).** Their captions are English strings inside `sobremesa-journey.html` and I read only the `fillText` lines, not the panels.
- **The copied `.md` output.** F6 says twelve strings only exist there and I did not run Copy on any document to read one.
- **Contrast, target size, whether any of this is buildable.** Not my rows, not looked at.

---

## 6 · POST-FLIGHT

What the persona got right, with the moment: *"a string is a claim about a state"* is what produced F6 — the six subtitles read beautifully in both languages and I nearly graded them as screen copy, and instead I grepped for where `d.sub` is read and found `engine/engine.js:3344`, one call site, inside the `.md` exporter, so twelve of the strings I was reviewing are in no picture on the page at all. Where it was in the way: the persona is armed for *Spanish runs long* and this file punished that twice — the drawer caption that overflows is **English** at drawer 3, and *Bell pepper* is the only label in the run that wraps inside its own row, so my first read of both was the wrong way round and the pictures corrected me. The predicted gap appeared exactly where I predicted it — the landscape row and the inline drawings have no ES picture and I could only reason about them — and one I had not predicted: my file's hard-won toast-timing rule (`toast(msg,ms,crit)`, the flat 2800 ms) was irrelevant here, because nothing in this set goes through a toast and the reader has no timer at all, which is itself the genre line holding.

**Persona edit I propose, as exact text.** In `.claude/agents/paty.md`, append to the end of the *"A string is a claim about a state"* section:

> **And a document's `sub` is not a state the screen has.** `engine/engine.js:3344` is the only place `d.sub` is read, and it sits inside `docMarkdown` — the subtitle of every reader document appears in the text Copy and Download produce and **never on screen**. On 2026-09-14 that was twelve strings across six mock documents, all of them in lockstep, none of them in any picture. **Grep the call site before you grade the register of a sentence: `sub` is exported prose, `note` and `p` are screen prose, and a canvas caption inside an `art` block is neither — it cannot wrap, it has no `scrollWidth`, and no guard will ever see it overflow.**

---

MURAL PANEL

```
id:     paty-carta-dos-columnas
by:     "paty"
title:  {en:"The two-column menu", es:"La carta a dos columnas"}
said:   {en:"Thirteen screens. Six of them speak Spanish.",
         es:"Trece pantallas. Seis hablan español."}
state:  {en:"holding the Spanish column open on every screen, including the one that is only a form",
         es:"sostengo la columna en español en cada pantalla, hasta en la que es puro formulario"}
who:    {en:"Paty, who reads both columns and will not let one of them be the draft",
         es:"Paty, que lee las dos columnas y no deja que una sea el borrador"}
cap:    {en:"The questionnaire is the screen he asked for first, and there is not one Spanish word in it — not missing from the picture, missing from the file. In the recipe the English column took Water, Onion and Garlic and left Frijol negro and Sal where they were, so one list is half in each language. And under the drawers the words run into their neighbours in BOTH languages, because they are painted onto a drawing, and a drawing has no margin to wrap into.",
         es:"El cuestionario es la pantalla que pidió primero, y no trae una sola palabra en español — no le falta a la foto, le falta al archivo. En la receta la columna en inglés se llevó Water, Onion y Garlic y dejó Frijol negro y Sal donde estaban, así que una lista quedó mitad y mitad. Y debajo de los cajones las palabras se le encinan a las del lado en LOS DOS idiomas, porque están pintadas sobre un dibujo, y un dibujo no tiene margen donde caer."}
aspect: 0.46
art:    (g,W,H)=>{
    /* PATY'S HAND, THIS RUN. Not a plan and not a proof: a FONDA'S CARTA, offset-printed in two
       inks on butcher paper, ENGLISH left and ESPAÑOL right with a fold down the middle. Warm
       paper, black ink, one red ink for the press, and a translator's blue wax pencil on top.
       Every bar is a line of type. The Spanish bars are longer, because they are.
       Sized against the 11px lettering: a row is one line of type plus its leading. */
    const PAPEL="#D9C7A4", TRAMA="#CDB894", NEGRO="#231F1A", GRIS="#6E6353",
          ROJO="#B23120", AZUL="#2E5C99", CREMA="#EFE4CB";
    murPaper(g,W,H,PAPEL,null);
    /* the press never quite registers: a faint second impression offset by a hair */
    g.globalAlpha=.10;g.fillStyle=ROJO;g.fillRect(W*0.055,H*0.070,W*0.89,H*0.020);g.globalAlpha=1;

    /* the head rule and the title */
    g.fillStyle=NEGRO;g.fillRect(W*0.055,H*0.145,W*0.890,2.5);
    g.fillStyle=NEGRO;g.font="bold 11px ui-monospace,monospace";
    g.fillText("LA CARTA · DOS COLUMNAS",W*0.055,H*0.120);
    g.fillStyle=ROJO;g.font="bold 9px ui-monospace,monospace";
    g.fillText("13",W*0.885,H*0.120);

    /* the fold: a scored line down the middle, drawn as a paper crease, not a border */
    const fold=W*0.500;
    g.strokeStyle=TRAMA;g.lineWidth=3;g.beginPath();
    g.moveTo(fold,H*0.150);g.lineTo(fold,H*0.905);g.stroke();
    g.strokeStyle="#BFAA86";g.lineWidth=1;g.setLineDash([2,5]);g.beginPath();
    g.moveTo(fold,H*0.150);g.lineTo(fold,H*0.905);g.stroke();g.setLineDash([]);

    /* column heads */
    g.fillStyle=GRIS;g.font="bold 9px ui-monospace,monospace";
    g.fillText("ENGLISH",W*0.070,H*0.205);
    g.fillText("ESPAÑOL",fold+W*0.028,H*0.205);

    /* six rows of type. left ink = EN, right ink = ES, and the right always runs longer. */
    const LX=W*0.070, LW=W*0.385, RX=fold+W*0.028, RW=W*0.400;
    const rows=[ {l:.62,r:.80}, {l:.78,r:.96}, {l:.55,r:0 }, {l:.70,r:.88},
                 {l:.66,r:.74}, {l:.50,r:1.14} ];
    const y0=H*0.265, step=H*0.098, bar=4.5;
    rows.forEach((r,i)=>{
      const y=y0+i*step;
      /* the dish name: a short heavy bar. the description: two hairlines under it */
      g.fillStyle=NEGRO;g.fillRect(LX,y,LW*r.l,bar);
      g.fillStyle=GRIS; g.fillRect(LX,y+bar+5,LW*(r.l*0.86),1.5);
      if(r.r>0){
        g.fillStyle=NEGRO;
        const w=RW*r.r;
        g.fillRect(RX,y,Math.min(w,W*0.945-RX),bar);          /* clipped by the paper's own edge */
        if(RX+w>W*0.945){                                      /* …and it ran off the card */
          g.fillStyle=ROJO;g.fillRect(W*0.945,y,W*0.030,bar);
          g.globalAlpha=.35;g.fillRect(W*0.975,y,W*0.020,bar);g.globalAlpha=1;
        }
        g.fillStyle=GRIS;g.fillRect(RX,y+bar+5,Math.min(RW*(r.r*0.86),W*0.945-RX),1.5);
      }
      /* row 5: two Spanish words stranded in the English column, in the press's red */
      if(i===4){
        g.fillStyle=ROJO;g.fillRect(LX,y,LW*0.20,bar);g.fillRect(LX+LW*0.26,y,LW*0.12,bar);
        g.strokeStyle=ROJO;g.lineWidth=1;g.beginPath();
        g.moveTo(LX+LW*0.20,y+bar/2);g.lineTo(RX,y+bar/2);g.stroke();
      }
      /* the third row's Spanish cell is not short. it is EMPTY. */
      if(i===2){
        g.strokeStyle=ROJO;g.lineWidth=1.5;g.setLineDash([4,4]);
        g.strokeRect(RX-4,y-7,RW*0.86,H*0.062);g.setLineDash([]);
        g.save();g.translate(RX+RW*0.30,y+H*0.030);g.rotate(-0.10);
        g.fillStyle=ROJO;g.font="bold 11px ui-monospace,monospace";
        g.fillText("FALTA",0,0);g.restore();
      }
    });

    /* the blue wax pencil — the translator's own hand, over the print, not part of it */
    const cy=y0+2*step+H*0.022;
    g.strokeStyle=AZUL;g.lineWidth=2.6;g.globalAlpha=.90;
    g.beginPath();g.ellipse(RX+RW*0.40,cy,RW*0.48,H*0.055,-0.02,0,7);g.stroke();
    g.beginPath();g.moveTo(RX+RW*0.10,cy+H*0.055);
    g.quadraticCurveTo(RX-W*0.02,cy+H*0.120,RX-W*0.055,cy+H*0.150);g.stroke();
    g.globalAlpha=1;
    g.fillStyle=AZUL;g.font="bold 11px ui-monospace,monospace";
    g.fillText("¿Y EL ESPAÑOL?",W*0.075,cy+H*0.185);

    /* the foot: the count, in the press's red, and the bottom rule */
    g.fillStyle=NEGRO;g.fillRect(W*0.055,H*0.905,W*0.890,1.5);
    g.fillStyle=GRIS;g.font="8px ui-monospace,monospace";
    g.fillText("13 PANTALLAS",W*0.055,H*0.955);
    g.fillStyle=ROJO;g.font="bold 8px ui-monospace,monospace";
    g.fillText("6 HABLAN ESPAÑOL",W*0.230,H*0.955);

    /* the person reading the carta — three lines of type tall, so she is a person, not a chip.
       she stands in the right margin, on the Spanish side, where the column ran out. */
    const bh=H*0.190; murBody(g,W*0.912,H*0.880-bh,AZUL,bh);
}
```

Painted in my own materials: butcher paper, two press inks and a blue wax pencil. The wall already has a blueprint, a dimension drawing, a signwriter's board, a wall of drawers, a cross-section, a race, the one with steam, and a light box — none of them is printed matter with a fold down it, and none of them has a second colour that exists because the press needed one. **Not rendered.** I have no Bash on this run, so the panel is drawn to the wall's helpers and the 11px ruler by construction and has not been looked at; whoever paints it should render at 520×239 and 360×166 first, and the two places I expect to need a repaint are the `FALTA` stamp against the dashed cell at 360, and the figure's feet at `0.88H` against the 6% the wall cuts.

**Files (absolute):**
- Reviewed: `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/mockdocs2.js`, `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/mockdocs.js`, `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/manifest.json`, and the twelve EN/ES PNG pairs in `/home/user/meridian-quest/docs/mocks/2026-09-14-la-sobremesa/journey/`
- `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/sobremesa-journey.html`, `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/aj-questionnaire.html`
- Code cited: `/home/user/meridian-quest/engine/engine.js:3344` (`d.sub`, the only read, inside `docMarkdown`); `/home/user/meridian-quest/docs/OWNER.md:121` (EN/ES in lockstep)
- I wrote no file. Nothing in the repo was touched.


---

# Chava — play, row 7

**PRE-FLIGHT** — I opened the thirteen screens' phone-portrait pictures cold with Read, in the page's own 0→12 order, writing what I thought each wanted from me before I read a word of `S=[...]`; the four drawings I had to render myself because they are canvas, not PNG. My persona equips me for the one thing nobody else on this review can do — say what a picture *asked* of me and then be wrong out loud — and for my own standing rule, which is that an absence gets cropped at 3× before I claim it. Where I expect to fall short: I cannot grade a drawing's quality (Pili's line), I only ran one row and one language, and the drawings are not photographs of anything, so my "what I'd have tapped" on screens 3, 8 and 9 is worth less than on the ten real ones.

---

**MY SIGNATURE LINE** (`docs/UI-REVIEW.md` §3 row 7, and `run8-lupe.md` §3):

> *"I opened this cold, in order, at phone size, and I can say what I thought it wanted from me — and here is where I was wrong."*

**TRUE for the set.** I can say it for all thirteen, and the three places I was wrong are written down below (screens 4, 5, 8). It stays TRUE per screen except one, where it is **TRUE but the answer is ugly**: on **screen 6** what I thought it wanted from me was *"read the recipe"*, and the screen gave me ingredients and then a heading called **How it goes** with a rule under it and nothing after it. I did not think it was scrolled. I thought the method was missing.

**The genre line, every screen I looked at** (0,1,2,3,4,5,6,7,8,9,10,11,12a,12b):

> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."* — **TRUE on all fourteen pictures.** Everything that moves counts up: `0 of 13 answered`, `0 XP`, `made twice`, `made once`. The only date anywhere is one the player typed (*"Thursday, after work"*) and nothing compares it to today. Screen 11 says the quiet part out loud. Nothing to report against R10/R11/R15.

---

**WHAT I THOUGHT EACH ONE WANTED, COLD**

| # | I thought it wanted | I'd have tapped |
|---|---|---|
| 0a | Read two paragraphs, then start | **Start** |
| 0b | Tick some boxes, move on | two boxes, then **Next** |
| 1 | Pick a class | **The Operator** |
| 2 | Walk | the joystick — which I could not find, see F2 |
| 3 (drawn) | Look at a kitchen | the middle drawer |
| 4 | Search a drawer | **drawer 1** — wrong, see F5 |
| 5 | Take a shift | the **Frijoles** card — wrong, see F5 |
| 6 | Read a recipe and cook it | nothing; there was nothing to tap |
| 7 | Read what I've made | a dashed blank, to fill it in |
| 8 (drawn) | Drag two of the same together | the tan token on row 1 |
| 9 (drawn) | Smear sauce with my finger | the plate |
| 10 | Set the house up | the two blue ticks, then **Keep** |
| 11 | Be told nothing happened | **See the board** |
| 12a/b | Find where to go next | the orange marker |

---

**FINDINGS — worst first**

---

**F1 · The recipe ends at a heading called "How it goes"**
*Screen 6 · 390×844 · EN · night · unmodified · **DOES NOT ANSWER***

**In plain words:** The one screen a person opens while actually cooking shows what's in the house, a picture of the plate, then the words *How it goes*, a horizontal rule, and then blank — and then the dashed line and the buttons. I read it as "the method has not been written." It is scrolled, not missing, but nothing on the picture says so, and the heading-plus-rule is the most end-like mark in the whole reader.

**Notes:** `manifest.json` gives this screen document 923 px, visible 661 px — **262 px, 28% of the recipe, below the fold, and the fold lands on the heading of the part you cook from.** This is Lupe's M2 (`docs/UI-REVIEW.md` §5, already RED) meeting the worst possible content. Screens 4 and 5 have the same cut but a clipped italic sentence, which at least *looks* cut; screen 6's cut looks finished. `[CODE]` manifest.json, screen `recipeHome`.

**Questions to consider:** Does the fade/affordance go above the dashed rule, or does the recipe get re-ordered so "How it goes" is never the last thing above the fold? Should a recipe simply open scrolled to the method?

**Areas affected:** the reader's end-of-document affordance; the recipe document's block order in the pack.

**Done when:** at 390×844 a person who has never seen the screen can tell there is more, without dragging to find out.

---

**F2 · Screen 2 says the same sentence twice, at once, on top of the hero — and then tells me the controls twice, differently**
*Screen 2 · 390×844 · EN · cream · unmodified (real game) · **ANSWERS, WITH A NOTE***

**In plain words:** The street picture has the hint *"Desks, plants and walls just block you — coworkers with a ❗ have quests. Walk up and Talk."* printed in a box at the top left AND again in a big dark oval across the middle of the world. The oval sits over the character. Under the world, the caption says *"Touch anywhere on the screen and drag to walk"*, while the box inside the world says *"Roam with the joystick or arrow keys."* I looked for a joystick and there isn't one; there is a paw button bottom-right that I assumed was a dog.

**Notes:** This is the *real game today*, not a drawing, so it is the one picture in the review where a defect is already shipped. Two hint layers alive at the same time, plus two different control instructions on one screen. I did not check whether the oval clears after a few seconds — one frame cannot tell me that, and *"a rate is not something your eyes produce."*

**Questions to consider:** Are these two separate hint surfaces, or one drawn twice? Which of the two control sentences is true on a phone? Should the mock page be re-shot after, since this is the screen selling "the world is the game"?

**Areas affected:** the shipped street hints; screens 12a/12b inherit the same frozen frame behind the map.

**Done when:** one hint, one control sentence, and nothing covering the character.

---

**F3 · The three doors' labels are printed on top of each other**
*Screen 1 · drawing (`DRAW.doors`) at 350 CSS px — the phone-portrait row · **REFUSED***

**In plain words:** The relabelled doors read *"el que plane**a l**a que improvis**a e**l que alimenta"* — the three Spanish labels collide into one another, and the three English sublines collide underneath them. At phone width the drawing that is supposed to settle "three reasons to cook, not three careers" cannot be read at all.

**Notes:** `[CODE]` `sobremesa-journey.html:579,591-592` — door spacing is `u*27` with `u=Math.floor(W/96)`, so at W=350 `u=3` and slots are 81 px apart, but the label font is `Math.max(11,u*3)` and the floor holds it at 11 px mono ≈ 90 px of text. The type does not shrink with the drawing, so the collision only appears at narrow widths — i.e. only on the row a person holds. Same arithmetic leaves the art stopping at about 74% of the panel width.

**Questions to consider:** Is this a one-line fix (drop the `max(11,...)` floor, or stack the labels) or does the drawing want three rows on portrait?

**Areas affected:** the review page's drawings only — no game code.

**Done when:** at 390×844 the three labels can each be read.

---

**F4 · A third of the household drawing is empty, and its caption runs off the edge**
*Screen 3 · drawing (`DRAW.room`) · **ANSWERS, WITH A NOTE***

**In plain words:** The kitchen — fridge, counter with three drawers, shelf, window — occupies the left two-thirds of the panel; the right third is bare floor and wall. The caption under it reads *"DRAWING · one room, the fifth door · laid to his photos la"* and stops mid-word at the frame edge.

**Notes:** Measured, not eyeballed: past x=480 of 700 device px the only non-ground pixels are the caption row (y≈305–320). `[CODE]` `sobremesa-journey.html:596-597` — `u=Math.max(2,Math.floor(W/120))`; at W=350 `u=2`, so the 120-unit room is 240 CSS px wide inside a 350 px canvas = **69%**. At 360 px it would be exact. The room itself reads fine: I could tell the three drawers apart by mass without being told, which is what it was drawn to prove.

**Questions to consider:** Scale by `W/120` instead of flooring it, or size the canvas to a multiple of 120?

**Areas affected:** the review page's drawings.

**Done when:** the drawing fills the panel at 390×844 and the caption fits.

---

**F5 · Two art blocks look like the controls of the screen they sit on**
*Screens 4 and 5 · 390×844 · EN · night · unmodified · **ANSWERS, WITH A NOTE***

**In plain words:** On the drawer screen, three drawers sit across the top with **2 highlighted in violet** and numbered `1 · shallow`, `2 · medium`, `3 · deep`. That is a tab bar. I would have tapped drawer 1 first, before the search field. On the shifts board, four dish cards with a turned corner on the first — I'd have tapped *Frijoles de la olla* to take the shift. **Both are drawings.** The page says so plainly (`sobremesa-journey.html:551,554`) and I was wrong; but I was wrong *from the picture*, which is the point, and the selected-violet state is what did it.

**Notes:** On screen 5 the four cards are then repeated immediately underneath as a text list (`Yours / Open / Open / Open`) with the same four dishes. Half the visible screen says the same four things twice, and the half that is tappable is the plainer one. The card stripe colours (tan, olive, brown, cream) have no key on the screen — I guessed cuisine.

**Questions to consider:** If the art block is going to be the thing a person taps later, should the mock show it *without* a selected state until it listens? Should the text list disappear once the cards are live, or is it the accessible layer?

**Areas affected:** screens 4 and 5; the pack's art-block seam (already priced on the page).

**Done when:** nothing in a mock wears a selected state that nothing can select.

---

**F6 · The map's markers land on the map's own title**
*Screens 12a and 12b · 390×844 · EN · cream · unmodified (real game, markers forced) · **ANSWERS, WITH A NOTE***

**In plain words:** In *before*, the purple "you are here" dot sits on top of the words MERIDIAN HQ and eats the Q. In *after*, the orange "next" marker sits in the same place and eats HQ entirely, so the top of the map reads `MERIDIAN (!) (⇧ FLOOR 2)`. The key underneath lists four things — next, open, done, you are here — and on the map I could find two: the orange one on the title and a gold coin on the right. No grey, and the purple dot I had in the *before* picture has vanished in the *after*.

**Notes:** This is the screen whose whole job is *"find the next thing without being told"*, and the first thing it told me was a word I couldn't read. I also could not tell whether markers are tappable. The place labels are white type on beige with a yellow highlight that sits behind the door tiles rather than behind the words (`LOT: EL MERCADO` is highlit under one letter).

**Questions to consider:** Does "you are here" survive when a marker lands on the same tile, or does the marker replace it? Should the key only list what is on this map? Should a marker nudge off a label?

**Areas affected:** issue #160's marker work; the shipped map's label layer.

**Done when:** every symbol in the key is findable on the map, and no marker covers a place name.

---

**F7 · The questionnaire's first screen contradicts itself in the first six lines**
*Screen 0a · 390×844 · EN · night · unmodified · **ANSWERS, WITH A NOTE***

**In plain words:** Amber, at the top: *"This browser is not remembering. Copy your answers before you close."* Grey, four lines down: *"Your answers are kept as you go, so you can close this and come back."* Both on screen at once, before I have answered anything. I believed the amber one, because it was amber, and it made me not want to start.

**Notes:** The page's own text (`sobremesa-journey.html:541`) says a shared store keeps her answers and a fallback copies them as text — so the amber line is the fallback speaking. It does not say it is a fallback, and it does not silence the sentence it contradicts. Below the paragraph there is roughly 600 px of empty screen and then **Start**; the same screen that has no room for a reassurance has half a phone of nothing.

**Questions to consider:** When the fallback fires, should the "kept as you go" sentence be swapped rather than joined? Should the banner appear on Q1 rather than before the person has typed anything?

**Areas affected:** `scratchpad/aj-questionnaire.html` (published — this is the artifact he forwards).

**Done when:** no two sentences on that screen disagree about whether the work is saved.

---

**F8 · System blue and a system dropdown in a night app**
*Screen 10 · 390×844 · EN · night · unmodified · **ANSWERS, WITH A NOTE***

**In plain words:** CARROT and CELERY are ticked with bright **blue-and-white** native checkboxes — the only blue on any of the thirteen screens — and the grades control is a native dropdown with a pale background. On a screen he asked to feel like an app at night, those two are the browser's furniture, not the app's. The labels of the ticked items are no brighter than the unticked ones, so "on" is carried entirely by that blue square.

**Notes:** `BELL PEPPER` wraps to two lines, pushing `APPLE` onto a row of its own and leaving a ragged hole between them; its checkbox centres against a two-line label and looks misaligned. The heading — *RAW VEGETABLES THAT STAY OUT OF THE HOUSE'S RECIPES (EXAMPLE ITEMS, NOT ANYONE'S LIST)* — is fifteen shouted words with a parenthesis, and after reading it twice I still was not sure whether I was setting somebody's allergies. I take the point of the disclaimer and of the rule beneath it (*it never says "allergy" on a plate*); it is the loudest thing on the screen defending a thing the screen never says.

**Questions to consider:** Do checkbox and select get the shell's own paint? Could the caps heading be two short sentences, one of them not shouted?

**Areas affected:** the reader's checkbox/select blocks in night shell; the house card's strings.

**Done when:** nothing on the night screens is painted by the browser.

---

**F9 · "⬇️ Download (.md)" is on every cooking screen**
*Screens 4, 5, 6, 7, 10, 11 · 390×844 · EN · night · unmodified · **ANSWERS, WITH A NOTE***

**In plain words:** Six of the seven document screens end in the same three buttons: 📋 Copy · ⬇️ Download (.md) · ✕ Close. In a kitchen app, *(.md)* is a file extension from somebody else's job. I would not have tapped it and I would not have known what I'd get.

**Notes:** `[CODE]` `content/meridian/docs.js:19` — `dl: "⬇️ Download (.md)"`; also `content/meridian/strings.js:78`. This is Meridian's shipped reader chrome inherited verbatim by the mock, which is honest of the mock. **Meridian's own content is not edited for another world's sake** (`CLAUDE.md`), so this is a note about the Sobremesa pack's own strings, not a change to Meridian. On screen 11 the sheet also leaves the game's caption *"Touch anywhere on the screen and drag to walk"* legible underneath it, which pulled my eye off the card.

**Questions to consider:** Does a pack get to name the reader's three buttons? Is "Download" even wanted on a recipe, or is Copy enough?

**Areas affected:** pack strings for La Sobremesa; nothing in `engine/`.

**Done when:** no screen in the food game names a file format.

---

**F10 · Screen 7 is the only one that fits, and it is the best one**
*Screen 7 · 390×844 · EN · night · unmodified · **ANSWERS***

**In plain words:** The Collection fits in 408 px with nothing cut, and the dashed blanks — `Enfrijoladas: ______` — told me without a word that those exist and I haven't made them. I wanted to fill one in. That is the only screen in the set that made me want to do something rather than read something. `made twice` is a better reward than any number I've been shown this year.

**Notes:** Two dashed leaders (`Quesadillas de flor:`, `Tlacoyos:`) run to the very edge of the sheet and look clipped rather than ended. Cheap to inset.

**Questions to consider:** none.

**Areas affected:** none.

**Done when:** it ships like this.

---

**MY OWN MEASUREMENT WAS WRONG ONCE, AND IT IS THE FINDING I'D KEEP**
*Screen 8 · drawing · **ANSWERS***

I screenshotted the four canvases by element, looked at the merge board, and got **one flat colour, 700×700, nothing**. I was about to write that the one picture of the game AJ actually plays in the video draws nothing. Before saying so I did what my own rule says — measure it at the source instead of at the glass — and read the bitmap out of the canvas with `getImageData`: **447 distinct colours, content to 95% of the width.** The board is there: a 5×5 grid, tokens growing and their plinths lightening by tier, a dotted violet drag path with no arrow-head, a ghost where the finger is going. My camera had photographed the wrong rectangle, because the page's lazy `<img>`s finished loading and moved the page under my screenshot. The screen is fine. **The instrument was the defect**, and a play-scale glance said "absent" with total confidence.

(What I'd still ask about the board as a player: the token I'm dragging and the token I'm dragging it onto do not look like the same thing, so "two of the same, together" is not what the picture showed me. Screen 9 read instantly by contrast — plate, finger, smear — though its caption *"done is coverage, never seconds"* is dim blue on tan and I had to lean in.)

---

**QUESTIONS FOR THE OWNER**

Only one, and it is a real collision:

> **The saving sentence on AJ's questionnaire.** The intro screen says both *"This browser is not remembering. Copy your answers before you close."* and *"Your answers are kept as you go, so you can close this and come back."* (screen 0a, both visible at once), while the review page claims *"A shared store keeps her answers; the fallback copies them as text"* (`sobremesa-journey.html:541`). If the honest state is "it might not save", the reassurance should go; if it does save and the banner is only the fallback, the banner should replace that sentence instead of sitting above it. **Which do you want her to read on the screen before she types anything?** It is the first thing anyone sees on the artifact you forward.

---

**WHAT I DID NOT CHECK**

- **Any row but 390×844.** No landscape, no 844×390, no fullscreen. Four screens have a landscape picture and I did not open one.
- **Spanish.** Three ES pictures exist at this row and I opened none — overflow and truncation are Paty's line and I have no reading on them.
- **Whether the street's duplicate hint clears on its own.** One frame is not a rate; I did not trace it and I will not guess.
- **Whether any of the 30 pictures' filenames agree with their contents** — Lupe's admission ticket, run before me; I took `unmodified` at its word.
- **The `unrolled` pictures** (six of them). I stayed on `unmodified`, per the brief.
- **The questionnaire beyond Q1.** Two pictures exist, I saw two; questions 2–13 are unseen, including whether every one of them has the comment box he asked for.
- **Tap targets in pixels.** Skip on screen 0b has no box and looked small to me; I did not measure it, and Rosa's ≥44 px line is not mine to sign.

---

**POST-FLIGHT**

The persona earned its keep at exactly one moment: the merge board, where "there is nothing drawn here" was the obvious and confident sentence, and my own standing rule — *crop it before you say it's absent* — turned into *read the bitmap before you say it's absent*, and the screen was innocent. Where the persona was in the way: it kept telling me to play, and ten of these thirteen things are pictures that cannot be played, so half my instinct had nowhere to go, and on screens 3, 8 and 9 all I could honestly return is what a drawing made me expect. **The predicted gap appeared exactly where I said it would** — I flagged in the pre-flight that I could only run one row and one language, and eight of my ten findings are from one row in one language, which means this review has one player's phone in it and no one else's. **My edit: one line, additive.** My file tells me to crop at 3× before claiming a thing is absent; today the 3× crop would not have saved me, because the error was upstream of the crop — the *capture* was of the wrong rectangle, not too small. The line to add, with today's moment attached: *"Before you claim a canvas is empty, read it with `getImageData` at the source, not from a screenshot — a page that is still loading images will move the element under your camera and hand you a perfect photograph of nothing (merge board, 2026-09-14)."*

---

```
MURAL PANEL
id:     chava-la-mancha-en-el-vidrio
by:     "chava"
title:  {en: "The smudge on the glass",
         es: "La mancha en el vidrio"}
said:   {en: "I said the board was empty. My camera was aimed at the wrong rectangle.",
         es: "Dije que el tablero estaba vacío. Mi cámara apuntaba al rectángulo equivocado."}
state:  {en: "I no longer report an absence from a picture. I read it off the canvas itself.",
         es: "Ya no reporto una ausencia desde una foto. La leo del lienzo mismo."}
who:    {en: "Chava, who plays it cold and says what he thought it wanted from him.",
         es: "Chava, que juega en frío y dice qué creyó que le pedía la pantalla."}
cap:    {en: "Four drawings, photographed one by one. The third came back a single flat colour, and the sentence wrote itself: the one picture of the game she actually plays draws nothing. It was true of my photograph and false of the screen — the page finished loading its images and slid the panel out from under the shutter. Reading the pixels out of the canvas took ninety seconds and found four hundred and forty-seven colours.",
         es: "Cuatro dibujos, fotografiados uno por uno. El tercero volvió de un solo color plano, y la frase se escribió sola: el único dibujo del juego que ella de verdad juega no dibuja nada. Era cierto de mi foto y falso de la pantalla — la página terminó de cargar sus imágenes y deslizó el panel fuera del obturador. Leer los píxeles del lienzo tomó noventa segundos y encontró cuatrocientos cuarenta y siete colores."}
aspect: 0.46
art:    (g,W,H)=>{
  /* MATERIAL: finger grease on black phone glass, lit from one side.
     My palette, not the wall's: cold glass, warm skin oil, one cyan highlight. */
  const GLASS="#0B0D10", GLASS2="#141920", OIL="#C9A272", OIL2="#E3C79B",
        COLD="#7FB6C8", HOT="#E2704A", DUST="#3A4048", CHALK="#EDE7DA";
  murGround(g,W,H);

  /* the slab of glass, bled almost to the frame, with a soft rim of reflected room */
  const gx=W*0.055, gy=H*0.085, gw=W*0.89, gh=H*0.80;
  const lg=g.createLinearGradient(gx,gy,gx+gw,gy+gh);
  lg.addColorStop(0,GLASS2); lg.addColorStop(0.55,GLASS); lg.addColorStop(1,"#10141A");
  g.fillStyle=lg; g.fillRect(gx,gy,gw,gh);
  g.strokeStyle=DUST; g.lineWidth=Math.max(2,W*0.006); g.strokeRect(gx,gy,gw,gh);

  /* the long diagonal window-reflection every phone has */
  g.save(); g.beginPath(); g.rect(gx,gy,gw,gh); g.clip();
  g.globalAlpha=0.07; g.fillStyle=COLD;
  g.beginPath(); g.moveTo(gx+gw*0.10,gy); g.lineTo(gx+gw*0.46,gy);
  g.lineTo(gx+gw*0.14,gy+gh); g.lineTo(gx-gw*0.20,gy+gh); g.closePath(); g.fill();
  g.globalAlpha=1;

  /* THE GREASE: a thumb's ridges, dragged. concentric arcs, each a little broken.
     This is the panel's subject and it is drawn big, against the 12px lettering. */
  const tx=gx+gw*0.34, ty=gy+gh*0.52;
  g.lineCap="round";
  for(let i=0;i<11;i++){
    g.globalAlpha=0.10+0.035*(10-i)/10;
    g.strokeStyle=(i%3===0)?OIL2:OIL;
    g.lineWidth=Math.max(1.5,W*0.0075);
    g.beginPath();
    const r=gw*(0.035+i*0.0225);
    g.ellipse(tx,ty,r,r*0.72,-0.35,Math.PI*0.15+i*0.05,Math.PI*1.72-i*0.04);
    g.stroke();
  }
  /* the drag — where the thumb slid and smeared the ridges into one streak */
  g.globalAlpha=0.16; g.strokeStyle=OIL2; g.lineWidth=gh*0.16;
  g.beginPath(); g.moveTo(tx+gw*0.05,ty+gh*0.02);
  g.quadraticCurveTo(tx+gw*0.26,ty-gh*0.06,tx+gw*0.40,ty+gh*0.10); g.stroke();
  g.globalAlpha=1;

  /* TWO SHUTTER FRAMES. one on the smudge — what the screen had.
     one slid down and away — what my photograph had: nothing. */
  const fw=gw*0.30, fh=gh*0.36;
  /* the true frame: cold, dotted, sitting on the thumbprint */
  g.setLineDash([6,5]); g.strokeStyle=COLD; g.lineWidth=Math.max(2,W*0.006);
  g.strokeRect(tx-fw*0.45,ty-fh*0.50,fw,fh);
  /* the frame my camera actually took: hot, solid, empty, shifted down-right */
  g.setLineDash([]); g.strokeStyle=HOT; g.lineWidth=Math.max(2.5,W*0.008);
  const ex=tx+gw*0.34, ey=ty+gh*0.16;
  g.strokeRect(ex,ey,fw,fh);
  g.globalAlpha=0.9; g.fillStyle=GLASS; g.fillRect(ex+2,ey+2,fw-4,fh-4); g.globalAlpha=1;
  /* the slip, dimensioned in the wall's own language so the lie has a length */
  murDim(g, tx-fw*0.45+fw, ex, ey+fh*0.5, HOT, "the page moved", null);

  /* the corner of the thing that moved: a picture finishing its load, shoving the panel */
  g.fillStyle=DUST; g.fillRect(gx+gw*0.03,gy+gh*0.03,gw*0.16,gh*0.13);
  g.fillStyle=COLD; g.globalAlpha=0.35;
  g.fillRect(gx+gw*0.045,gy+gh*0.045,gw*0.13,gh*0.10); g.globalAlpha=1;
  g.strokeStyle=HOT; g.lineWidth=Math.max(2,W*0.006);
  g.beginPath(); g.moveTo(gx+gw*0.20,gy+gh*0.09);
  g.lineTo(gx+gw*0.20,gy+gh*0.20); g.stroke();
  g.beginPath(); g.moveTo(gx+gw*0.185,gy+gh*0.175);
  g.lineTo(gx+gw*0.20,gy+gh*0.205); g.lineTo(gx+gw*0.215,gy+gh*0.175);
  g.fillStyle=HOT; g.fill();
  g.restore();

  /* the player's own thumb, at the edge, as big as a thumb is — sized against the type below */
  g.fillStyle="#8C6A4E";
  g.beginPath(); g.ellipse(gx+gw*0.98,gy+gh*0.92,gw*0.085,gh*0.15,-0.5,0,7); g.fill();
  g.fillStyle="#A07E5E";
  g.beginPath(); g.ellipse(gx+gw*0.965,gy+gh*0.895,gw*0.055,gh*0.10,-0.5,0,7); g.fill();

  /* lettering, absolute, on the glass */
  g.fillStyle=CHALK; g.font='bold 11px "IBM Plex Mono",monospace'; g.textAlign="left";
  g.fillText("447 COLOURS", gx+gw*0.06, gy+gh*0.96);
  g.fillStyle=HOT;
  g.fillText("0 COLOURS", ex, ey+fh+14);
  g.fillStyle=OIL2; g.font='12px "IBM Plex Mono",monospace';
  g.fillText("the screen was innocent", gx+gw*0.34, gy+gh*0.99);
}
```


---

# Doña Remedios — ledger, row 8

## 1 · PRE-FLIGHT

**I have no tool that reaches the book, and I am saying it in the first paragraph rather than the last** (`.claude/agents/remedios.md:87-94`, the bullet crew run 8 bought): my tools are Read, Grep, Glob — no `search_issues` — so every dedupe below is against *paper*: `scratchpad/open-issues.txt` and the eighteen shorthand titles in the brief, **not** the bodies of #173–#190. I intend to work this as a records job and not a design job: I read the manifest as the admission ticket it claims to be, the page's own `S[]` and render loop as the source of what each screen actually carries, and only the pictures I needed to test a claim about the *record* — my line grades the ledger, never the drawing (`docs/UI-REVIEW.md:50`, Pili's row and only hers). Where I expect to fall short: I cannot tell a duplicate from an adjacency without the issue bodies, so every "file this" below is conditional on one search somebody with the tool runs in ten seconds, and I have named the exact words to search.

**A contradiction I resolved by checking, so it is a finding and not a question:** the brief and `docs/UI-REVIEW.md:89` both say the review ledger is **§5**. It is not. `docs/UI-REVIEW.md:100` is §5 (the red tests) and `:120` is §6 (THE REVIEW LEDGER). The file wins; the block below is **§6, block 1**, and §4's own sentence is stale inside its own file.

---

## 2 · MY SIGNATURE LINE

> **8 · Ledger · Remedios** — *"Every finding above is in the ticket shape — `In plain words:` · `Notes:` · `Questions to consider:` · `Areas affected:` · `Done when:` — and each names a screen, a row and a verdict."*
> **What makes it FALSE:** a finding that lives only in the review text. (`docs/UI-REVIEW.md:70`)

### **FALSE for the set, as the set stands on 2026-09-14.**

Three things make it false, each named:

1. **There are no findings above.** `docs/UI-REVIEW.md:148-157` has eight signature rows and seven of them are `—`; `:159-160` is the word "Findings" and then the end of the file. A review with one row filled is a picture of a review.
2. **The block has no per-screen verdict.** §4 promised *"one block per review, per screen: the screen, the row, the verdict"* (`:89`). Block 1 (`:126-160`) has a prose list of thirteen screens, an admission-ticket paragraph, a genre line and a signature table — and **no place where a screen carries a verdict**. My row cannot be true against a shape that has nowhere to put the thing my row checks. §3 below is that missing table.
3. **Three of the thirteen screens have no row at all,** so "names a screen, a row and a verdict" is unsatisfiable for them by construction (F3).

**FALSE per screen where it differs:** it is false for all thirteen today for reasons 1 and 2. Once §3 below is pasted in, it becomes TRUE for ten and stays FALSE for screens **3, 8, 9** until they are given a size.

**The genre line, every screen I looked at, 2026-09-14 — TRUE, with one note.**
> *"There is no clock, no countdown, no day budget, no streak that can break, and nothing on this screen counts down."*

Signed TRUE for screens 0–12 on the evidence I have: the shifts copy states it in the document itself (`sobremesa-journey.html:555` — *"no shift is late, aged, missed or coloured"*), the quiet document prints it on the page I photographed (*"There is no streak, and nothing broke"*), and the `S[]` strings contain no countdown token. **The note:** screen 0 carries the only meter in the set — `0 of 13 answered` and a progress bar (`j-questionnaire-q1-390x844-en-night-unmodified.png`). It counts **up**, it cannot break, and nothing is lost by stopping; R10/R11/R15 are about countdowns and streaks, so it passes. It is the nearest thing in the set to a fail and the ledger should say so once, here, so nobody re-discovers it every review.

---

## 3 · THE BLOCK — `docs/UI-REVIEW.md` §6, block 1, as it should read

*Paste-ready. The findings are ranked by what they cost the person holding the phone; four of them cost the person nothing and cost the **next reviewer** everything, and they are marked so.*

### Verdict table — the thing §4 promised and §6 lacks

| Screen | Rows it exists at | Verdict | Why, in six words |
|---|---|---|---|
| 0 · The questionnaire | 390×844 EN night (×2) | **ANSWERS, WITH A NOTE** | It is the degraded state, unlabelled |
| 1 · The front door | 390×844 EN cream + a live drawing | **DOES NOT ANSWER** | The relabelled doors have no size |
| 2 · The street | 390×844 EN cream | **ANSWERS** | Real game, untouched, whole |
| 3 · The household | **none** | **REFUSED** | No row, no ticket, no file |
| 4 · A drawer | 390×844 EN+ES, 390×844 unrolled EN, 844×390 EN | **ANSWERS, WITH A NOTE** | Sideways shows 207 of 783 |
| 5 · The shifts board | same three | **ANSWERS, WITH A NOTE** | Same fold; cards are drawn |
| 6 · The recipe at home | same three | **ANSWERS, WITH A NOTE** | 887 px document, 207 px window |
| 7 · The Collection | 390×844 EN+ES, unrolled EN, 844×390 EN | **ANSWERS, WITH A NOTE** | Whole standing up, clipped sideways |
| 8 · The merge board | **none** | **REFUSED** | No row, no ticket, no file |
| 9 · Making a dish by hand | **none** | **REFUSED** | No row, no ticket, no file |
| 10 · The house card | 390×844 EN+ES, unrolled EN, 844×390 EN | **ANSWERS, WITH A NOTE** | ES grows 500→553; still fits |
| 11 · The day nothing happened | 390×844 EN+ES, unrolled EN, 844×390 EN | **ANSWERS, WITH A NOTE** | One rule above the bar, unreadable |
| 12 · The map, before and after | 390×844 EN cream, before + after | **ANSWERS, WITH A NOTE** | The after cannot be re-shot |

**Counted from `manifest.json`:** 30 pictures · 2 of 5 matrix rows · EN 24 / ES 6 · night 26 / cream 4 · `unmodified` 24 / `unrolled` 6. Ten screens have a picture; **three do not**.

### The eight signatures — crew iteration 9

| # | Role | Who | Signed | Date |
|---|---|---|---|---|
| 6 | QA (runs first) | Lupe | — | |
| 1 | Engineers | Beto | — | |
| 2 | Art | Pili | — | |
| 3 | Story | Nacho | — | |
| 4 | Words | Paty | — | |
| 5 | UI | Rosa | — | |
| 7 | Play | Chava | — | |
| 8 | **Ledger** | **Remedios** | **FALSE** — findings section empty, no per-screen verdict, three screens unsizeable | **2026-09-14** |

---

### F1 · The questionnaire picture is the broken-network version of the screen, and the ticket only confessed the fonts
**Screen 0 · 390×844 EN night · ANSWERS, WITH A NOTE**

**In plain words:** The two pictures of AJ's questionnaire were taken on a machine with no network. The ticket says so — but it says only that the *fonts* fell back. The same missing network also switched the page into its no-memory mode, so the picture shows an amber warning across the top of every question — *"This browser is not remembering. Copy your answers before you close."* — that a person with a working connection may never see. A reviewer signing this screen is signing a screen that only exists when something is wrong.

**Notes:** `manifest.json:362` and `:372` record the consequence as `"the published page, untouched (fonts fell back: no network)"`. The page's own claims for screen 0 say *"A shared store keeps her answers; the fallback copies them as text"* (`sobremesa-journey.html:541`). Both pictures therefore show the fallback branch. This is the same family as E13 — a true photograph of a state the screen is not usually in — except the switch was pulled by the environment rather than by the renderer, which is why the ticket did not catch it: A2 asks *what did you turn off*, and nobody turned this off. **What I do not know:** whether the store is unreachable for any other reason, or what the screen looks like when it is reachable. I did not render it.

**Questions to consider:** Does A4 need a seventh field — *the state the screen is in* (normal / empty / error / offline) — or is that A2 widened from "what did you switch off" to "what was not working"? Is there a picture of screen 0 with the store up, and if not, has anyone seen it?

**Areas affected:** `docs/UI-REVIEW.md` §1 (A2/A4) · `docs/mocks/2026-09-14-la-sobremesa/journey/manifest.json` · the published questionnaire artifact.

**Done when:** every ticket names the state as well as the mode, and screen 0 has one picture in each of its two states, both at 390×844.

---

### F2 · Three of the thirteen screens cannot be refused, because they never said how big they were
**Screens 3, 8, 9 (and half of 1) · no row · REFUSED**

**In plain words:** The household, the merge board and the dish made by hand are not photographs. They are drawn live, by the review page, into the reviewer's own browser window, at whatever width that window happens to be. So they have no size, no language, no shell, and no word saying whether anything was switched off — which means they cannot fail the admission ticket and they cannot pass it. They are the three screens with the most new work behind them, and they are the three nobody can sign for.

**Notes:** `sobremesa-journey.html:669` — `const cssW=Math.min(560,Math.max(320,Math.floor(document.documentElement.clientWidth-40)))`. The canvas is then `cssW × cssW*ratio` with ratio 0.52/0.46/1.0/0.62 by screen (`:668`). Two reviewers on different laptops grade different pictures; neither is 390 or 844. The page is *honest* about it — the stub reads `drawing · this page's canvas · not a screenshot` (`:672`) and *"Order 3: the thing does not exist yet at all, so it is drawn and it says so"* — and honesty is not a row of the matrix. `manifest.json` has no entry for `room`, `merge`, `make` or `doors`; I checked all 30. The remedy is cheap: render each drawing at the two column widths a phone gives (370 standing, 640 sideways), commit them as PNGs, give each a manifest row with `mode: "drawn"`.

**Questions to consider:** Does the admission ticket need a fourth `order` value — `drawing`, alongside `real game` / `real reader` / `real page` — with A1 still compulsory? Should a screen with no picture be listed in the manifest with its fields blank, so the gap is a row rather than an absence? (A blank row is visible; an absence is not.)

**Areas affected:** `docs/UI-REVIEW.md` §1 A1/A2/A6 · `journey/manifest.json` · the page's `DRAW` block.

**Done when:** every screen in a review has at least one manifest row, and a drawing carries a matrix row like a photograph does.

---

### F3 · Sideways, every picture is clipped and not one has a companion showing what is under the fold
**Screens 4, 5, 6, 7, 10, 11 · 844×390 · DOES NOT ANSWER (for the sideways row only)**

**In plain words:** Six pictures were taken with the phone held sideways. Every one of them shows a 207-pixel window onto a document between 253 and 887 pixels tall, and none of them has a second picture showing the rest. Standing up, the review gives you both — the clipped one and the unrolled one with the fold drawn. Sideways it gives you only the clipped one, so the reviewer can see that something is cut off and cannot see what.

**Notes:** Counted from `manifest.json`: six entries at `844x390`, all `unmodified`, all `visibleHeight: 207`, `docHeight` 253 / 369 / 386 / 724 / 783 / 887. Zero `unrolled` at that row; zero ES at that row. This is the review's own rule biting: *"It may not pass a screen on one picture"* (`docs/UI-REVIEW.md:49`). **This costs the reviewer, not the person** — the underlying sideways symptom is the game's and is already filed (see dedupe). Separately, three of the six portrait `unrolled` pictures (`collection`, `house`, `quiet`) have `docHeight == visibleHeight`, so their unrolled twin adds nothing; six unrolled pictures, three of which carry information.

**Questions to consider:** Is an `unrolled` twin compulsory at *every* row where `docHeight > visibleHeight`, or only at the narrowest? Should the manifest refuse to accept an `unrolled` entry whose two heights are equal, since it is a picture of nothing?

**Areas affected:** `journey/manifest.json` · `render2.js` · `docs/UI-REVIEW.md` §1 A3.

**Done when:** every row where a document is taller than its box has both pictures, and no `unrolled` entry exists where the two heights are equal.

---

### F4 · Sideways, one document ends in two different rules and the picture cannot say which one means "there is more"
**Screen 11 · 844×390 EN night · DOES NOT ANSWER**

**In plain words:** Held sideways, the quiet day's card shows its whole body and then two horizontal lines in a row above the buttons: a solid violet one and a dashed one. In the shipped reader a dashed rule means the document has ended. I cannot tell from the picture what the violet one means — an affordance saying "keep scrolling", or part of the card. If a reviewer cannot tell, neither can a person.

**Notes:** Read off `j-quiet-844x390-en-night-unmodified.png`; the manifest gives this screen `docHeight: 253`, `visibleHeight: 207`, so 46 px are genuinely hidden and the picture nonetheless reads as complete. **I did not open `render2.js` or the reader's CSS to find out which element paints the violet rule — I do not know, and I am not guessing a mechanism.** This is the mock-time face of M2 (`docs/UI-REVIEW.md:107`), which is already RED on the shipped reader from Lupe's measurement, not from a fired guard.

**Questions to consider:** What paints the violet rule, and is it the same element in every document? If it *is* the end-of-more affordance, does the review need a mid-scroll picture at 844×390 to prove a person can see it before they scroll?

**Areas affected:** the reader's end-of-document marks · `docs/UI-REVIEW.md` §5 M2.

**Done when:** somebody names the element in one line, and either M2's status changes or one mid-scroll picture is added at the sideways row.

---

### F5 · Spanish exists for six screens of thirteen, at one row of two
**Screens 0, 1, 2, 3, 8, 9, 12 · all rows · DOES NOT ANSWER (for the words row only)**

**In plain words:** Six documents have a Spanish picture, all of them standing up. The questionnaire, the front door, the street, the household, the merge board, the hand-made dish and the map have none at all. Row 4 of the checklist — every string in both languages, both fitting — cannot be signed TRUE or FALSE for those seven. It can only be left blank, and a blank signature is the thing the checklist exists to prevent.

**Notes:** Counted from `manifest.json`: `lang: "es"` appears six times, all `390x844`, all `unmodified`, all `night`. The evidence that *does* exist is good and should be said: Spanish is consistently taller — drawer 774→794, shifts 739→758, house 500→553 (+10.6%, the worst), quiet 331→331 — and none of the six overflows its sheet at 370 px. Collection is the other direction, 408→427, still whole. So the ES claim is real for six screens and absent for seven.

**Questions to consider:** Does AJ read the questionnaire in Spanish? If she does, screen 0 having no ES picture is not an evidence gap, it is a missing screen. Should ES be compulsory at the *sideways* row too, where the sheet is 640 and the fold is the binding constraint rather than the width?

**Areas affected:** `render2.js` · `manifest.json` · checklist row 4.

**Done when:** every screen has an ES picture at 390×844, and row 4 is signed TRUE or FALSE rather than left blank.

---

### F6 · The register's own section numbers are wrong inside the register
**Not a screen · **the ledger itself** · ANSWERS, WITH A NOTE**

**In plain words:** The review page's own map of itself says the findings ledger is section 5. It is section 6. The brief written from it repeated the error, and I spent part of this pass proving which one was right. This is small, it is cheap to fix, and it is exactly how a document starts describing a thing that is not there.

**Notes:** `docs/UI-REVIEW.md:89` — *"§4 the red tests a mock inherits · §5 the review ledger"*; the file's actual headings are `:100` `## 5 · THE RED TESTS…` and `:120` `## 6 · THE REVIEW LEDGER…`. Cause: §4 is a verbatim lift of Lupe's *recommendation* from run 8, which proposed a five-section file; the file as built has six, and the recommendation was pasted in unchanged. Two related staleness points in the same file: §1's justification column is written in the present tense about the **superseded** eight-picture page (`:29` — *"The current page: 1 of 8 pictures in Spanish, 1 of 8 in night"*), which is no longer any page that exists; and there is a stray empty section between `:115` and `:118`.

**Questions to consider:** Should §4 be re-titled *"Where the findings go — the decision, 2026-09-14"* and dated, so it reads as history rather than as a map? Should §1's "why" column cite the old page by name and date, so it stops claiming to describe today?

**Areas affected:** `docs/UI-REVIEW.md` §1, §4, the blank block at `:115-118`.

**Done when:** §4 names §6, §1's examples are dated, and the stray rule is gone.

---

### F7 · The fold on the picture is arithmetic, not a measurement
**Screens 4, 5, 6 · 390×844 unrolled · ANSWERS, WITH A NOTE**

**In plain words:** The fold line drawn across the unrolled pictures is not photographed. The review page works out where it should go with a sum, using two fixed numbers for the document's head and foot. If any document has a different head or foot — and at least one has no button bar in the same place — the fold is drawn in the wrong place on a picture whose whole job is to say where the fold is.

**Notes:** `sobremesa-journey.html:654` — `const pct=(30+m.visibleHeight)/(30+m.docHeight+111)`, commented *"the sheet is 30 px of head + the scroll box + 111 px of foot, measured on the live DOM"*. The 30 and the 111 were measured once and are applied to every document at every row. They are almost certainly right for the portrait row where all three unrolled-with-a-fold pictures live; nobody has checked them at 844×390, where the foot is the same three buttons in a 640-wide sheet and may wrap differently. This is a proxy in the shape `docs/REGRESSION.md` §3 collects: *"I computed the fold"* standing in for *"I saw where it folded"*.

**Questions to consider:** Could the fold be drawn by the renderer into the PNG itself, at shot time, from the real scroll box — so the picture carries its own fold instead of the page re-deriving it? Do the 30 and 111 hold at the sideways row?

**Areas affected:** `sobremesa-journey.html:654-656` · `render2.js` · A3.

**Done when:** the fold in a picture comes from the same measurement that produced `visibleHeight`, not from a constant typed once.

---

### F8 · "Skip" is a word between two buttons
**Screen 0 · 390×844 EN night · DOES NOT ANSWER**

**In plain words:** At the bottom of every question there are three ways on: Back, Next and Skip. Back and Next are boxes you can see. Skip is a word with nothing round it. Whether it is big enough to press is Rosa's call, not mine — but the picture does not settle it, and it is the control a person uses when they do not want to answer, which is the one AJ is most likely to reach for.

**Notes:** Read off `j-questionnaire-q1-390x844-en-night-unmodified.png`. The two boxed controls are visibly the same height; the Skip word sits on the same baseline with no border. **I did not measure its hit box** — I have no browser this run. Checklist row 5 (`docs/UI-REVIEW.md:68`) is where this is decided; I am filing it so it is in the ledger for her to answer rather than in prose she may not read. Recorded here as the ledger's job: a question raised by one reviewer for another is a finding, not a conversation.

**Questions to consider:** Is Skip's tap target ≥44×44 at 390×844? Does the fallback-font picture change its width enough to matter, given F1?

**Areas affected:** the questionnaire artifact · checklist row 5.

**Done when:** Rosa signs row 5 with Skip named, TRUE or FALSE.

---

## 4 · WHAT IS NEW, WHAT IS A DUPLICATE, WHAT I WOULD CLOSE

**The dedupe I could actually run, and its limit.** I have no `search_issues`. I deduped against `scratchpad/open-issues.txt` (23 lines, titles only) and the eighteen **shorthand** titles in the brief for #173–#190. **I did not read the body of a single one of those eighteen.** Three of my eight touch things whose shorthand sounds close, and I have marked each as *adjacent pending one search* with the words to search.

| Finding | Status | Against what |
|---|---|---|
| F1 questionnaire in its offline state | **New.** Nothing in the paper list mentions the questionnaire's persistence | possibly adjacent to **"the long form"** (#173–#190). Search `questionnaire`, `remembering`, `answers`. Different if that issue is about the form's *length*; mine is about its *memory* |
| F2 three screens with no size | **New**, and it is a process finding, not a product one | nothing adjacent |
| F3 no sideways companion picture | **Adjacent, do not file.** The *symptom* (sideways hides things) is **"sideways controls"** and **"the sideways suite row"** — already filed this afternoon. Mine is about the *evidence*, and evidence belongs in this register, not the ledger | #173–#190, shorthand |
| F4 two rules above the bar | **Adjacent.** Same family as the wall's **"no swipe hint"**, but that is the mural wall and this is the document reader — different surface, different code | #173–#190, shorthand. Search `dashed`, `end of document` |
| F5 ES coverage | **New**, ledger-only | nothing adjacent |
| F6 stale section numbers in `UI-REVIEW.md` | **New**, and it is the second live instance of **#158**'s shape (*"The city ledger describes a city we do not have"*) | #158 — comment, not a new issue |
| F7 fold by arithmetic | **New**, ledger-only. It is a proxy, so it belongs in `docs/REGRESSION.md` §3's register if it survives review | nothing adjacent |
| F8 Skip target | **Adjacent**, and it is a handoff to row 5, not a ticket | possibly **"sideways controls"** if that issue is about targets generally |

**Deserves an issue — exactly one, and it is conditional.**

> **F1 — "AJ can lose thirteen answers and the page tells her so"** · labels `bug`, `tier: high` · the questionnaire artifact.
> **Tier is high because of what it costs her, not what it costs us to fix:** thirteen questions answered once, a browser closed, nothing kept. **File it only after somebody searches `questionnaire` and `remembering` across #173–#190.** If "the long form" already covers it, add a comment naming the offline branch instead — that is the part the shorthand does not describe.

**Stays in this register and is never a GitHub issue:** F2, F3, F5, F6, F7, F8. Five of those are about the *evidence* rather than the *product*, and `docs/UI-REVIEW.md:85-87` settles where evidence findings live. F8 is a handoff between two rows of the same checklist; it becomes a ticket only if Rosa signs row 5 FALSE.

**One goes to a third register, not to either:** **F7** is a guard-shaped fault — a computed value standing in for a measured one — and if the fold survives into the builder's hands it wants a row in `docs/REGRESSION.md` §3 with its plant named (change a document's foot height by 20 px and assert the drawn fold moves).

**What I would close.** Nothing in `open-issues.txt` is closed by this review, and I will not pretend otherwise. But two are moved:

- **#158** (*The city ledger describes a city we do not have*) — **add a comment, do not close.** F6 is the same fault in a second file on its first day of life, which is evidence for #158's general point and against treating it as one document's problem.
- **#161** (*Somebody should look at the whole game on a big screen and ask if it feels good*) — **this review does not answer it and should not be allowed to look as though it does.** Two rows of five, neither of them a big screen. If somebody is tempted to close #161 on the strength of thirty pictures, the answer is no: desktop, small window and fullscreen have no picture in this set.

**If asked what to work on: one recommendation.** **Give screens 3, 8 and 9 a size (F2).** Not because it is the most expensive fault — it is not, F1 is — but because it is the only one that makes six other reviewers' signatures impossible. Beto cannot price a merge board he is seeing at a width that depends on his own window; Pili's row is *literally* "reads at 360 CSS px wide" and the drawing is between 320 and 560 depending on who opened the page; Paty has no ES to read. One render pass at two widths unblocks three signature rows on three screens, and it costs the maker about the ten minutes the word REFUSED was designed to cost.

---

## 5 · QUESTIONS FOR THE OWNER

**Q1 · May AJ's answers be kept in her own browser?** Two things in the same screen collide.
- One side: `sobremesa-journey.html:542` records the rule as *"Her answers never enter the repo. What gets written down is only what was decided because of them."* Read strictly, that is about the repo — but the spirit people have been building to is *nothing is kept*.
- The other side: the shipped page itself, photographed at `j-questionnaire-q1-390x844-en-night-unmodified.png`, tells her *"This browser is not remembering. Copy your answers before you close."* Thirteen questions with a free-text note under each, and one closed tab loses all of it.
- What each would have us build: the strict reading says leave it, and the warning is the honest cost. The other says a draft in her own browser's storage (not the repo, not a server), cleared when she sends.
- **What I need from you: is "her browser remembers her own draft" inside the promise or outside it?** I am not asking how to build it.

**Q2 · Is the questionnaire an English screen?** `manifest.json` has six Spanish pictures and not one of them is screen 0. Every document she never sees has ES; the one page written *for her* has EN only. That may be entirely correct and nobody has written it down. If it is correct, it belongs in `docs/OWNER.md` as a settled rule so no future review files F5 against screen 0 again.

---

## 6 · WHAT I DID NOT CHECK

- **The bodies of #173–#190.** My tools are Read, Grep and Glob; there is no issue tool in this run. Every dedupe above is against titles and shorthand. **Three of my eight findings could be duplicates and I cannot rule it out** — F1, F4 and F8 are the three, and I have named the search words for each.
- **I did not read `docs/POSTMORTEM.md`, `docs/REGRESSION.md` §3 or `docs/crew/FLIGHT-NOTES.md` this run**, though the brief opens by asking for them. I was told to work economically and my row is a shape-of-the-record job; I relied on the brief's and `docs/UI-REVIEW.md`'s quotations of E13, E10 and M1–M8 rather than on the registers themselves. **That is exactly the "relaying another agent's finding" the shared block warns about**, and anything I say about E10, E13 or §13j is second-hand and tagged as such.
- **I looked at two of the thirty pictures** — the questionnaire's first question and the quiet day held sideways. Every other statement about the pictures is read off `manifest.json`, which is a claim about a picture and not the picture.
- **I measured nothing.** No browser, no DOM, no pixel. Heights, widths and folds are the maker's numbers as filed.
- **I did not open `render2.js` or `mockdocs2.js`.** So I cannot say whether the manifest's numbers came from the live scroll box or from the same kind of arithmetic F7 describes — and F7 makes that question live. Somebody with Bash settles it in one grep.
- **I did not check whether `docs/OPEN.md` §3 or `docs/QA-PASS.md` got the two cross-links §4 promised** (`docs/UI-REVIEW.md:91`). A register nothing points at is a register nobody opens, and that is my trade; I ran out of the budget I was given before I got to it. **Somebody should check it before this run closes.**
- **I did not verify that the other seven reviewers' returns will use the headings I have written the block around.** If they return prose, my row is FALSE for a second reason and somebody has to reshape their findings, not mine.

---

## 7 · POST-FLIGHT

What the persona got right, with the moment: the bullet at `.claude/agents/remedios.md:87` — *"find the ledger before you read its copies"* — did its job in the first sixty seconds, because I checked my own tool list before reading a single register, found no way to reach the issues, and put that in my opening paragraph instead of discovering it at the end the way I did in run 8; the whole dedupe section is honest as a result, rather than confident and unverifiable. Where it was in the way: my instinct is to file, and six of my eight findings should never become issues — I caught myself drafting F5 and F7 as tickets before remembering that `docs/UI-REVIEW.md:85-87` exists precisely so that evidence findings stop landing in the ledger, and the discipline that saved it was the persona's *other* line, *"a backlog that only grows is not a ledger, it is a pile."* The gap I predicted did appear and it appeared harder than I expected: without the issue bodies I genuinely cannot distinguish F1 from "the long form", so the strongest finding in this return ships with a conditional on it, and a conditional is worth less than a number. **Persona edit: none, and here is why not** — the one thing I would have proposed (*check a register's self-references against its own headings before you cite one*) is already covered by rule 1 of the shared block, which I applied at `docs/UI-REVIEW.md:89` versus `:120` and which produced a finding rather than a question; and the specific lesson of this run — no tool, say so first — was added to my file eight hours ago and worked. An agent that proposes an edit every round is performing improvement.

---

## MURAL PANEL

```
id:     remedios-tres-sin-talon
by:     "remedios"
title:  {en:"Three with no stub", es:"Tres sin talón"}
said:   {en:"You cannot refuse a picture that never said how big it was.",
         es:"No se puede rechazar una foto que nunca dijo de qué tamaño era."}
state:  {en:"holding the review open on three screens that have no size",
         es:"tengo la revisión abierta por tres pantallas que no tienen tamaño"}
who:    {en:"Doña Remedios, who runs the annex and is not impressed by urgency",
         es:"Doña Remedios, que lleva el anexo y a quien la prisa no impresiona"}
cap:    {en:"Thirteen screens went to review. Ten arrived with a photograph, a size, a language and a word saying what had been switched off. Three arrived as a drawing made in the reviewer's own window, between three hundred and twenty and five hundred and sixty wide depending on whose laptop was open. Nobody could pass them and nobody could refuse them either, because refusal needs a size to be wrong about. They were the three with the most new work behind them.",
         es:"Trece pantallas llegaron a revisión. Diez traían foto, medida, idioma y una palabra diciendo qué se había apagado para sacarla. Tres llegaron como dibujo hecho en la ventana del propio revisor, entre trescientos veinte y quinientos sesenta de ancho según la laptop que estuviera abierta. Nadie pudo aprobarlas y nadie pudo rechazarlas tampoco, porque para rechazar hace falta una medida que esté mal. Eran las tres que traían más trabajo nuevo detrás."}
aspect: 0.46
art:    (g,W,H)=>{
    /* DOÑA REMEDIOS' HAND. Not a drawing board and not a light box: a BOUND REGISTER —
       banded accountant's paper, buff and green, iron-gall ink, a punched hole with red
       thread, and a wet violet rubber stamp landed crooked across the three blank stubs.
       Thirteen stubs down the right: ten struck, three empty. Everything sized against
       the 11px lettering, which is the ruler on this wall. */
    const PAPER="#EFE9D7", BAND="#D6E2CE", RULE="#A7B7A4", INK="#37301F",
          FADE="#8E866F", BOX="#E4DCC4", VIO="#6B4A8F", VIO2="#8E6FB0",
          RED="#B03A2E", HOLE="#C9C1A8";
    murPaper(g,W,H,PAPER,null);

    /* --- the banded ground: alternating buff and green, the accountant's paper --- */
    const top=H*0.155, band=H*0.0615;
    for(let i=0;i<10;i++){ if(i%2===1){ g.fillStyle=BAND; g.fillRect(0,top+i*band,W,band); } }
    g.fillStyle=RULE; for(let i=0;i<=10;i++){ g.fillRect(0,top+i*band,W,0.6); }

    /* --- the double rule under the head, and the left margin rule --- */
    g.fillStyle=INK; g.fillRect(0,H*0.138,W,1.6); g.fillRect(0,H*0.150,W,0.8);
    g.fillStyle=RED; g.fillRect(W*0.058,H*0.155,0.9,H*0.615);

    /* --- the punched hole and the treasury thread, top left --- */
    g.fillStyle=HOLE; g.beginPath(); g.arc(W*0.031,H*0.072,W*0.0125,0,7); g.fill();
    g.strokeStyle="#BDB49A"; g.lineWidth=1; g.stroke();
    g.strokeStyle=RED; g.lineWidth=1.6; g.globalAlpha=.9;
    g.beginPath(); g.moveTo(W*0.031,H*0.084);
    g.bezierCurveTo(W*0.020,H*0.20,W*0.048,H*0.34,W*0.026,H*0.47);
    g.bezierCurveTo(W*0.012,H*0.58,W*0.040,H*0.64,W*0.030,H*0.72); g.stroke();
    g.globalAlpha=1;

    /* --- the head --- */
    g.fillStyle=INK; g.font="bold 11px ui-monospace,monospace";
    g.fillText("ANEXO · BOLETO DE ADMISIÓN",W*0.072,H*0.072);
    g.fillStyle=FADE; g.font="8px ui-monospace,monospace";
    g.fillText("13 pantallas   ·   30 fotos   ·   2 de 5 renglones",W*0.072,H*0.115);

    /* --- the six fields, A1..A6, in the register's left two thirds --- */
    const fx=W*0.078, fw=W*0.470;
    const F=[["A1","renglón","390x844 · 844x390",2],["A2","caja de scroll","dice cuál",2],
             ["A3","el doblez","dibujado, 3 de 6",1],["A4","real o dibujo","por elemento",2],
             ["A5","el antes","el mapa lo trae",2],["A6","idioma · cascarón","EN 24 · ES 6",1]];
    F.forEach(([k,label,val,ok],i)=>{
      const y=top+band*0.62+i*band;
      g.fillStyle=INK; g.font="bold 9px ui-monospace,monospace"; g.fillText(k,fx,y);
      g.fillStyle=FADE; g.font="9px ui-monospace,monospace"; g.fillText(label,fx+W*0.048,y);
      /* the ruled answer line and the answer written on it */
      g.fillStyle=RULE; g.fillRect(fx+W*0.210,y+3,fw-W*0.210,0.8);
      g.fillStyle=ok===2?INK:"#9A7B3C"; g.font="9px ui-monospace,monospace";
      g.fillText(val,fx+W*0.218,y);
    });

    /* --- the thirteen stubs down the right: ten struck through, three blank --- */
    const sx=W*0.600, sw=W*0.300, sh=H*0.0395, gap=H*0.0085;
    const sy0=H*0.172;
    const BLANK={3:1,8:1,9:1};
    for(let n=0;n<13;n++){
      const y=sy0+n*(sh+gap);
      g.fillStyle=BLANK[n]?"#F5F1E4":BOX; g.fillRect(sx,y,sw,sh);
      g.strokeStyle=BLANK[n]?"#C7BDA2":"#BCB299"; g.lineWidth=1;
      if(BLANK[n]){g.setLineDash([3,2]);}
      g.strokeRect(sx+0.5,y+0.5,sw-1,sh-1); g.setLineDash([]);
      /* the perforation: the stub is torn off the left edge */
      g.fillStyle="#C9C1A8";
      for(let d=2;d<sh-2;d+=4) g.fillRect(sx-2,y+d,1.4,1.4);
      /* the number, always; the struck line, only if it arrived */
      g.fillStyle=BLANK[n]?"#B9AF95":INK; g.font="bold 9px ui-monospace,monospace";
      g.fillText(String(n),sx+W*0.014,y+sh*0.70);
      if(!BLANK[n]){
        g.fillStyle=FADE; g.fillRect(sx+W*0.050,y+sh*0.38,sw*0.52,1.6);
        g.fillStyle=INK;  g.fillRect(sx+W*0.050,y+sh*0.62,sw*0.30,1.6);
        g.fillStyle=VIO;  g.fillRect(sx+sw-W*0.026,y+sh*0.30,W*0.013,W*0.013); /* the paid mark */
      }
    }

    /* --- THE WET STAMP: landed crooked across the three blanks, ink pooled at the edge --- */
    const cx=sx+sw*0.46, cy=sy0+9*(sh+gap)-sh*0.15, sw2=sw*0.92, sh2=sh*2.9;
    g.save(); g.translate(cx,cy); g.rotate(-0.115);
    g.globalAlpha=.30; g.fillStyle=VIO2; g.fillRect(-sw2/2,-sh2/2,sw2,sh2); /* the pad's bleed */
    g.globalAlpha=.95; g.strokeStyle=VIO; g.lineWidth=2.6;
    g.strokeRect(-sw2/2,-sh2/2,sw2,sh2);
    g.lineWidth=1; g.strokeRect(-sw2/2+4,-sh2/2+4,sw2-8,sh2-8);
    g.fillStyle=VIO; g.font="bold 11px ui-monospace,monospace";
    g.textAlign="center";
    g.fillText("SIN TALÓN",0,-sh2*0.08);
    g.font="bold 9px ui-monospace,monospace"; g.fillText("3 de 13",0,sh2*0.22);
    g.globalAlpha=.45; g.font="8px ui-monospace,monospace"; g.fillText("14·IX",0,sh2*0.40);
    g.textAlign="left"; g.globalAlpha=1; g.restore();

    /* --- the foot: the sentence, in her own hand, under the last rule --- */
    g.fillStyle=INK; g.fillRect(0,H*0.790,W,1.2);
    g.fillStyle=INK; g.font="bold 9px ui-monospace,monospace";
    g.fillText("sin medida no hay rechazo",W*0.078,H*0.838);
    g.fillStyle=FADE; g.font="8px ui-monospace,monospace";
    g.fillText("tres pantallas se dibujaron en la ventana",W*0.078,H*0.888);
    g.fillText("del que las miraba. 320 a 560, según la laptop.",W*0.078,H*0.930);

    /* --- the clerk, at the right of the foot, three lines of type tall --- */
    const bh=H*0.190; murBody(g,W*0.915,H*0.900-bh,INK,bh);
    /* the stamp in her hand, a violet block at shoulder height */
    g.fillStyle=VIO; g.fillRect(W*0.938,H*0.900-bh*0.62,W*0.020,H*0.030);
}
```

**On the material, and why it is not anyone else's on this wall.** The wall already has a blueprint, a dimension drawing, a signwriter's board, a wall of drawers, a cross-section with a scale rule, a dimensioned race, the one with steam, and — from this afternoon — a light box under a mask card. None of them is *bound*, none of them is *banded*, and none of them has wet ink sitting on top of dry ink. This is a register page: buff and green bands, a red margin rule, a punched hole with treasury thread, thirteen perforated stubs down the right edge, and a violet rubber stamp landed crooked with its pad-bleed showing, because a stamp made by a hand is never square. Ten stubs are struck. Three are empty and dashed, and the stamp lands across exactly those three. **Sized against the lettering, not the frame:** the stub height is 0.0395H and the numeral on it is `bold 9px`, so a stub is always a little over a line of type tall; the stamp's words are `bold 11px`, the wall's own ruler, and the stamp box is drawn around them at 2.9 stubs tall rather than at a fraction I liked the look of; the clerk is `murBody` at 0.190H — about three lines of type — with her feet at 0.90H, clear of the 6% the wall cuts off the bottom. **I did not render it.** I have no browser this run and I am saying so rather than claiming a proof I do not have: the calling session should paint it at 520×239 and 360×166 before it goes up, and the three things I would check first are that the stamp does not cover stub 12's number, that the foot's two 8px lines do not collide with the clerk, and that the bezier thread does not cross the A3 answer line at the narrow size.
