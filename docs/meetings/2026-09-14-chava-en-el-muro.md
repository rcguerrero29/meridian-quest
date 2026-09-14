# Chava plays the mural wall cold — raw return, 2026-09-14

*One playtester, no brief beyond "go and find the wall and read it", on the town at phone and desktop
widths. The wall changed under him mid-run (iteration 6 landed at 03:07); he says which half is which.
Verbatim. His persona edit and panel are ledgered in `docs/crew/FLIGHT-NOTES.md` (row 46); his eight
findings are triaged in `docs/NEXT-SESSION.md`. Screenshots are in the session's scratchpad and are
not in the repo.*

---

All runs are done. Here is the session.

---

## PRE-FLIGHT

I booted the town before I read anything, picked The Operator, walked out, and went looking for a wall I had been told reads as limewash with a red band from across the street. I decided in advance that the two things worth measuring were *how much of the wall a person can see at once* and *how much of it is blank*, because those are rates and my eyes cannot produce a rate. What I did not plan for was the repo changing under me mid-session — the wall grew from 25 panels to 32 at 03:07 while I was playing (commit `04e6971`), so the first half of this report is iteration 5's wall and the second half is iteration 6's, and I say which is which.

---

## WHAT HAPPENED, in order

**1. I could not find it.** Boot → class → "Walk out" → the stall → two presses of ↓ and I was on THE STREET (`chava-phone-01-boot.png`, `chava-phone-03-world.png`, `chava-phone-04-street-arrive.png`). I walked east until I hit "That's a wall. Even AI Legends respect walls." (`chava-phone-05-east6.png`), then west to the far end, past RECORDS & FORMS (`chava-desk-W12.png`). Then I walked the whole street again in top-down (`chava-phone-09-td-r3.png`), again at 1440×900 (`chava-E00.png` … `chava-E22.png`), and again at midday with the clock faked (`chava-noon-across.png`). **Four passes. I never once noticed a mural.** I wrote in my notes "there is no mural on this wall," which was wrong, and I'll come back to that.

**2. It announced itself as a button, not a picture.** I gave up looking and swept the north kerb logging every action prompt. At step 10: `📄 Read it — El mural de la cuadrilla` (`chava-prompt-10.png`). Step 11: gone. Step 12: back. Step 14: gone. Step 15: back. **Walking the length of the wall, the button blinks off and on twice** — the map row is `…v▧B▧▧E▧…` (`changarrito/content/maps.js:52`), so tiles 11 and 14 are not mural. Twice I thought I'd walked past it.

**3. I was wrong about the paint.** When I finally cropped the facade row at 3× in top-down daylight (`chava-zoom-top.png`) it is unmistakable: cream limewash with fine grain, a dark-red top rule, a brick band with three white windows — a tram — and a coloured line under it. Exactly what `changarrito/content/art.js:25-33` paints. **The art is there and it is good.** What is true is weaker and still worth saying: on a 390–412px phone, at play scale, among El Anexo's red-and-white awnings and La Obra's green produce stalls, I walked past it four times. In Isometric the whole north row is featureless purple boxes (`chava-cam-ISO-across.png`). And the Map/Fullscreen/Settings buttons sit exactly on the facade row — in `chava-zoom-top.png` they cover a shop, and three tiles east they would have covered the mural.

**4. Opening it was the best moment of the session.** `chava-phone-11-opened.png`. A paper sheet, the title, "The wall", and a strip of actual painted wall with `Rigo` and `The owner` signed on the dado in a hand you can read. It looks like a wall. I liked it immediately.

**5. Then I could not get along it.** The strip shows **344px of a 4598px wall — 7.5%**. Dragging with a mouse did nothing; a real touch swipe moves it 289px, so **16 full-width swipes to reach the right-hand end** (measured, `chava-final.js`). There is no arrow, no fade, no scrollbar, no "→". The only cue is that the picture is cut at the paper's edge. The sentence that tells you to walk along it — *"…Each painter signs the foot of their own. Walk along it."* — is in the blockquote **below** the strip, and on the phone that blockquote shows exactly one line, `"One wall, end to end. Everybody has their"`, before the fold (`chava-F-02-open.png`). **On desktop it is worse in relative terms: 592 of 4598 = 12.9% on a 1440px screen** (`chava-desk-20-opened.png`) — the paper is a narrow column and the extra 850px of screen go to dark background.

**6. Sixteen swipes to a blank wall.** `chava-F-03-wallend.png` is the last screen of the walk: four-fifths empty cream, one panel at the bottom, a caption cut mid-word, `Chuy`. I measured it: **79.9% of the wall's area above the dado is blank limewash** (1.43M pixels sampled). The wall's height is set by the tallest bay, so when Beto adds a fourth panel, fourteen bays get taller with nothing in them.

**7. The reading-size panels are excellent and there are a great many of them.** `chava-phone-doc-01.png`, `-02.png`, `-12.png`. Big type, real pictures, `What was said / Who / Iteration / State` in a clean grid. No zooming needed at 412px. But the document is **22,705px in a 732px window — 31 phone screens.**

**8. Poking it.** Tapping the wall strip: nothing (`chava-break-05-tapwall.png`). Tapping a reading-size panel: nothing. Close → the button is still on the kerb → reopen: **the vertical position is remembered (6000px) but the horizontal wall position resets to 0** — so you come back three-quarters of the way down the text with the wall back at the far left. Escape closes it. Resizing 412→900→412 with it open reflows cleanly, no crash, no error (`chava-break-03-resized.png`). Left open and untouched for 70 seconds: nothing moved, nothing timed out, closing put me back on the street with the button still there.

**9. Reading it as a record.** Beto's bay bottom to top (`chava-bay6-beto.png`): blueprint grid *yes/no* vs a rail of stops *which?* → a field scene stamped PASSED "is it a wall? no" → a workbench with an unfitted part labelled `~c0` → a parts chart with seven of nine crossed out. **That is one man over four visits and it is legible as one man** — he takes a mechanism apart before he answers, and the paper warms from cold blueprint blue to workshop cream as he goes. Rigo's (`chava-bay6-rigo.png`): two cabs and a U-turn not taken → the crossing with the little figure on the zebra → the driver's board *bell 4.0 / off power 2.2 / horn+brake 1.4 / stood 0* → two trams at 9% and 44%. Same answer: one voice, gaining authority. **Neither reads as three unrelated pictures.** That part of the concept works.

**10. No plan on the wall.** I read all 32 `State` lines. Every one is a position held ("Certain the guard is honest and pointed at the wrong staircase", "tired of being right"). The closest thing to a future action is Beto's *"I am not fitting it until the id changes"* — a refusal, not a task. **Nothing on this wall is a to-do list.** `docs/ARCH-LOG.md` A3 holds.

**11. Something is painted over something.** Chuy's file card has a rotated stamp across two lines; both the stamp and the struck-through `BOUNDARY — cajón inexplicable` under it are illegible at wall size and still illegible at reading size (`chava-bay-chuy.png`). And Chema's panel has two labels drawn on the same baseline — `EL TROLLEY · LA RUEDA 390/60 s` with `1/60` on top of `390`, and `y la rueda entera mide 1168` with `a 6.0, sin par` on top of it (`chava-bay-chema.png`, still there in iteration 6 at `chava-now-slice-3.png`).

---

## The three "whose is this" guesses

**I have to disqualify my own test.** By the time I ran it I had already read the whole wall looking for truncations, so this is a weaker test than you wanted, and I'm saying so rather than pretending. I ran it anyway on three iteration-6 panels with every label stripped.

| | What I saw | My guess, and why | Right? |
|---|---|---|---|
| `chava-guess-26.png` | a tram in a dark frame, a 9-swatch chart with 7 crossed out, `8px H`, `2 / 7` | **Beto** — somebody counted the parts before choosing anything | **Yes** (#26, "Beto, who counted the parts before he chose the paint") |
| `chava-guess-28.png` | paint chips on a rail, `242.0 / 241.6 / Δ 0.4`, a lit box with two red arrows, `el cliente señala` | **Pili** — the client points; that's the piñatera's framing, not an engineer's | **Yes** (#28) |
| `chava-guess-31.png` | two buildings 1.10 and 1.81, a sightline, `h ≤ 0.65·W + 0.3`, `W = 3 filas` | **Don Güero** — row arithmetic, same language as his rails cross-section | **Yes** (#31) |

Three from three — **and every one of them I got from the SUBJECT, not the hand.** The palette, the stroke weight, the mono lettering and the cream ground are identical across all 32 panels. `.claude/skills/crew-fix/SKILL.md:303` sets the bar as *"Nobody should have to read the label to know whose panel they are looking at"*; what actually happens is nobody has to read the label if they already know what that person works on. It reads as one very good draughtsman's notebook, not as eighteen painters.

**And the seams test**, which is the version of this question I could still fail honestly: `chava-seams.png`, three bays with the dado cut off. I said the seams were at x≈505 and x≈1022; the true bay width is 510.9. I got them. But I got them because there is a **uniform ~14px gutter every 255 CSS px** — the wall reads as a regular grid of cards. The intro paragraph says *"There are no frames and no divisions"*. There are divisions; they are just thin.

---

## What a person would say is wrong, worst first

**1. Twelve of the nineteen signed captions are cut at the edge of their bay, several mid-word, with no ellipsis.** I checked each against the reader's full text.

| On the wall | What was written |
|---|---|
| `…and it cost me two plan` | `…two plants` |
| `…pulling every card before I b` | `…before I believe the drawer` |
| `Fourteen rows open at the counter; three say` | `…three say nobody, and I did not run a single one of the guards I wrote up.` |
| `Holding that the paint menu must refuse thing` | `…must refuse things…` |
| `At the bench with the part in my hand. It is` | `…It is cut, it fits, and I am not fitting it until the id changes…` |

Seven fit — every one of them written before the captions got long. Melo's is the one that should end the argument: **`two plan` on a wall whose own law forbids a plan.** Cost: the wall silently removes words on a wall whose one rule is never remove.
*Back there:* open the mural, swipe right 12 times, read the caption row.

**2. You cannot get from a name to their panels.** The wall signs `Zeni` on the dado. The word "Zeni" appears nowhere in the 22,705px document — that painter is only ever "the customs clerk". Tapping the signature does nothing, tapping the bay does nothing, and the panels below are ordered by date, not by painter. So the wall says "this column is one person" and the reader immediately shuffles that person's three panels apart across 31 screens. Cost: the organising idea of the wall is abandoned the moment you scroll past it.
*Back there:* open it, swipe to the last bay, try to find Zeni's writing.

**3. 7.5% of the wall on a phone, 16 swipes, and nothing tells you to swipe.** No arrow, no fade, no scrollbar; the sentence that says "walk along it" is below the fold. Cost: a reader who doesn't swipe thinks the mural is two panels.

**4. Proximity says the wrong thing.** Inside Rigo's bay the gap between his first and second panel is ~150px. The gutter between Rigo's bay and the owner's is ~14px. **Two panels by different people sit ten times closer together than two panels by the same person.** And the caption floats between two panels — in Melo's bay it is 86px below its own panel and 13px above the next one (`chava-bay-melo.png`), so it reads as a title for the wrong picture.

**5. 79.9% of the wall is blank.** One person's fourth visit makes fourteen other bays taller and emptier. `chava-F-03-wallend.png` — sixteen swipes of cream for one panel.

**6. Text painted over text.** Chema's two label collisions; Chuy's stamp over the line it's stamping. Both illegible at both sizes.

**7. Reopening loses your place sideways but keeps it downwards.** You come back at text-panel 20 with the wall reset to the far left.

**8. In Isometric the wall is a plain purple block.** No facade art at all in that camera — not mural-specific, but it is one of four cameras the settings offer.

**Nothing is wrong with:** the reading-size panels (genuinely readable, genuinely beautiful, worth the scroll), the per-person stories (Beto and Rigo both read as one person growing), the absence of any plan or to-do, the resize/idle/escape behaviour, and the fact that the wall really is one continuous surface — limewash, horizon and dado do run straight through.

---

## WHAT I DID NOT TRY

Spanish (`🌐 Español`) — and four of the findings in the document are about Spanish captions being shorter, so a Spanish read is the obvious next pass and would also tell you whether the caption cut is worse in the other language. Real fullscreen (`#fsbtn` — headless). Landscape. The Copy and Download (.md) buttons. Any of the four colour themes or the Día de Muertos / alebrijes seasons against the mural tile. A real touch device (all touch was CDP-synthesised). Screen-reader or keyboard-only navigation of the reader. The wall at any width between 412 and 1440. And I never established a per-hour rate for "player walks past the mural without noticing" — I have n=4 passes by one robot, which is an anecdote, not a rate.

I also did not re-verify findings 2, 4, 6 and 7 against iteration 6 by re-running the break tests; I checked 1, 3, 5 and 8 on the new wall and assumed the layout ones held, which is exactly the kind of assumption that has bitten this project before.

---

## POST-FLIGHT

The concept works where it is hardest — four visits by one person stacked in one column really does read as one person over time, and not one panel on this wall is a plan. It fails where it is cheapest: the wall promises a continuous surface and delivers a grid; it promises "each painter signs the foot of their own" and then cuts twelve of nineteen feet off mid-word; and it asks a phone reader to find sixteen swipes' worth of wall with no hint that there is anything to the right. The thing I got most wrong was my own first conclusion — I said "there is no mural" after four passes, and the paint was there the whole time at `changarrito/content/art.js:25`; a still at 3× settled in one look what four laps of walking could not. My edit to `.claude/agents/chava.md`:

```
**When you conclude a thing is ABSENT, crop it at 3× before you say so.**
*Applied 2026-09-14 from the mural run.* You walked the street four times, in four
cameras, at night and at noon, and wrote down "there is no mural on this wall." The
paint was there every pass — limewash, a red band, three white windows for the tram.
It only resolved when you stopped walking and cropped the facade row at
deviceScaleFactor 3 (`chava-zoom-top.png`). A play-scale glance is evidence about
NOTICEABILITY and nothing else. "I did not notice it in four passes" is a true and
useful finding. "It is not drawn" is a claim about the code, and a claim about the
code is cheap to check and expensive to get wrong — one grep of the pack's art file
would have caught it in ten seconds.
```

---

## MURAL PANEL

```
MURAL PANEL
id:     chava-el-pie-cortado
by:     "chava"
title:  {en:"The foot is cut",
         es:"El pie cortado"}
said:   {en:"The wall's one law is never remove — and the thing doing the removing is the wall, at the edge of every bay, mid-word.",
         es:"La única ley del muro es no borrar — y el que borra es el muro, en la orilla de cada nicho, a media palabra."}
state:  {en:"Holding that a foot which does not fit is a foot that lies, and that I would rather be given three words than half a sentence.",
         es:"Sostengo que un pie que no cabe es un pie que miente, y que prefiero tres palabras a media frase."}
who:    {en:"Chava, who reads what is on the screen instead of what was written",
         es:"Chava, la que lee lo que está en la pantalla y no lo que se escribió"}
cap:    {en:"Twelve of the nineteen signed feet on this wall run into the edge of their own bay and stop — no ellipsis, no mark, most of them inside a word. The seven that fit are the seven written before the feet got long. Melo's reads 'and it cost me two plan' where he wrote 'two plants', which is how a wall that forbids plans ends up painting one. I found it by holding the wall and the document side by side; the document has every word.",
         es:"Doce de los diecinueve pies firmados de este muro llegan a la orilla de su propio nicho y ahí se acaban — sin puntos suspensivos, sin marca, casi todos a media palabra. Los siete que caben son los siete que se escribieron antes de que los pies se alargaran. El de Melo dice «y me costó dos plan» donde él escribió «dos plantas», que es como un muro que prohíbe los planes acaba pintando uno. Lo encontré poniendo el muro y el documento uno junto al otro; el documento los tiene todos."}
aspect: 0.44
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* CHAVA'S HAND, SECOND VISIT — not a filmstrip this time. Last time I filmed the
     game; this time I read it. So: a length of the wall's own dado, four painters'
     feet running left to right, each one walking into a hard vertical seam and
     stopping. Past the seam the words they actually wrote are ghosted in, because
     they are still in the file — nobody removed them, the wall just stopped
     painting. The worst one is ringed, and the ring is the shape of the word it
     ate. A tally at the right: twelve struck, seven standing. */
  const dadoY=H*0.70, dadoH=H*0.16, x0=W*0.04, bay=W*0.30;
  /* the dado band, the one continuous thing on the real wall */
  g.fillStyle=P.shade;g.fillRect(x0,dadoY,W*0.70,dadoH);
  g.fillStyle=P.lime;g.fillRect(x0,dadoY,W*0.70,2);
  const feet=[
    {kept:"and it cost me two plan", lost:"ts",           ring:true },
    {kept:"pulling every card before I b", lost:"elieve", ring:false},
    {kept:"three say",               lost:" nobody",      ring:false}
  ];
  g.textBaseline="alphabetic";
  for(let i=0;i<3;i++){
    const bx=x0+i*bay, seam=bx+bay-W*0.012, ty=dadoY-H*0.06;
    /* the seam: two bays' worth of limewash meeting, the only division on the wall */
    g.fillStyle=P.lime;g.fillRect(seam,ty-H*0.11,1.5,H*0.20);
    /* what the wall paints */
    g.fillStyle=P.ink;g.font="italic 12px ui-monospace,monospace";
    const t=feet[i].kept; let tw=g.measureText(t).width;
    g.save();g.beginPath();g.rect(bx,ty-H*0.10,seam-bx,H*0.14);g.clip();
    g.fillText(t,seam-tw,ty);g.restore();
    /* what he wrote, still in the file, ghosted past the seam */
    g.globalAlpha=0.28;g.fillStyle=P.deep;
    g.fillText(feet[i].lost,seam+2,ty);g.globalAlpha=1;
    /* the red mark of the painter's own signature, cut with it */
    g.fillStyle=P.rust;g.fillRect(bx,dadoY+dadoH*0.62,Math.min(bay*0.22,seam-bx),2);
    if(feet[i].ring){
      g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();
      g.ellipse(seam-8,ty-4,26,13,0,0,Math.PI*2);g.stroke();
      g.font="bold 11px ui-monospace,monospace";g.fillStyle=P.rust;
      g.fillText("plan",seam-22,ty+H*0.10);
    }
  }
  /* the count, on the right, in the wall's own hand */
  const cx=W*0.78, cy=H*0.22;
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=P.deep;
  g.fillText("PIES FIRMADOS",cx,cy);
  for(let i=0;i<19;i++){
    const rx=cx+(i%5)*13, ry=cy+14+Math.floor(i/5)*16;
    g.fillStyle=(i<12)?P.rust:P.moss;
    g.fillRect(rx,ry,9,11);
    if(i<12){g.strokeStyle=P.wash;g.lineWidth=1.5;g.beginPath();
      g.moveTo(rx+1,ry+1);g.lineTo(rx+8,ry+10);g.stroke();}
  }
  g.font="bold 12px ui-monospace,monospace";
  g.fillStyle=P.rust;g.fillText("12 cortados",cx,cy+90);
  g.fillStyle=P.moss;g.fillText("7 enteros",cx,cy+106);}
```

**Where the evidence lives** (all absolute, scratchpad, `chava-*`): `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/` — the four blind walks (`chava-E00.png`…`chava-E22.png`), the 3× facade crop that proved me wrong (`chava-zoom-top.png`), the phone open/end of wall (`chava-F-02-open.png`, `chava-F-03-wallend.png`), the eight current wall slices (`chava-now-slice-0.png`…`-7.png`), the four bay crops (`chava-bay6-beto.png`, `chava-bay6-rigo.png`, `chava-bay-melo.png`, `chava-bay-chuy.png`), the seams test (`chava-seams.png`), the three blind panels (`chava-guess-26/28/31.png`), and the full reader text at both iterations (`chava-mural-text.txt`, `chava-now-text.txt`). Nothing was written into the repo; `git status` shows no file of mine.
