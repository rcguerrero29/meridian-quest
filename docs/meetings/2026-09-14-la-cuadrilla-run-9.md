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
