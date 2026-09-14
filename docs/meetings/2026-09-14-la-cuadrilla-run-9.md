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
