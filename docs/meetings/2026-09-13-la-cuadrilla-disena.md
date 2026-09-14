# La cuadrilla diseña — the tram livery, two storeys with murals, the skulls, the one-sided rail — raw returns, 2026-09-13

*Six of seven returned before the rate limit; Chema (the skulls, measured) did not. **These are designs, not decisions**: nothing here is built, and the owner reads them first. The calling session files what they settle into `docs/ARCH-LOG.md` (a new A14 for the livery), `docs/rooms/`, `docs/3D-LOG.md`, and the skulls go through `/crew-fix` red first. The owner's words are in `docs/ASKS.md` (2026-09-13, late).*



---

# beto

PRE-FLIGHT
I read `NEXT-SESSION.md`, `OWNER.md`, A13/A13½/A13¾ in `docs/ARCH-LOG.md`, then both tram draws (`engine/engine.js:1535-1551`, `engine/engine3d.js:619-687`), the wardrobe end-to-end (`WEAR` at `:448` → `sanitizeSave` at `:530` → `openWardrobe` at `:4860` → the unlock at `:3611`, `:3690`, `:3849`, `:4139`), and the pack seam that already has a boot audit (`TROKEYS`/`troAudit`, `:282-298`). Two things in the code changed the design before I wrote it: the 3D car is built once per page load into `T3.scene` and **`t3Invalidate` cannot reach it**, and the 2D and 3D cars already disagree on a colour, so "byte-identical" is a per-camera claim. I did not render and did not run a suite this sitting — costs and mechanisms only, per the brief.

---

# THE DELIVERABLE — the tram livery seam

## 0 · The finding that reorders the whole job

**Of the seven things in his photograph, the car has two.** [CODE]

| In the photo | 2D (`engine.js:1535-1548`) | 3D (`engine3d.js:630-678`) |
|---|---|---|
| maroon body | `#B0563A` ✓ | `#B0563A` ✓ |
| gold lining | an **8×2 px strip**, `#E0A430` (`:1540`) | **nothing** — the 3D car has no gold anywhere |
| cream band of window frames | no band; windows are `#D8E6F0`, the top rule is `#8E4230` | no band |
| brass lamps, three a side + headlamp | **one** dot, and it is a state light, not a lamp (`:1542-1548`) | none |
| trolley pole | none | none |
| open side doors | none | the open cab gaps (`CAB=0.15`, `:637`) read as doors by accident |
| fender | none | none |

So a `TROLOOK` table with `lamp`, `pole`, `band` and `fender` keys today is **four keys with no reader** — which is precisely the failure this engine already wrote a guard against, one screen away, for this same seam: *"A word this engine does not read is the loudest of all: it is the one where somebody wrote a line, saw nothing happen, and had no way to find out why"* (`engine/engine.js:276-281`). **The paint goes on after the parts exist, not before.** That is the sequencing recommendation and it is the only thing in this design I would refuse to reorder.

**Second finding, cheap to state and expensive to miss:** the two cars' wheels are different colours — `#2B2536` in 2D (`engine.js:1541`) against `#2B2B31` in 3D (`engine3d.js:645`). Any "put the palette in one place" change silently repaints one of them. The default table must carry **both** until a pin exists that would show the owner the difference.

---

## 1 · What the seam is

Two layers, exactly the wardrobe's shape, and the split is the RULE/CHOICE cut:

**RULE (engine).** *The car's colours come from one table and every camera reads it.* Today six hex literals are spread over two files and four call sites (`troDraw2D` is called three times — front `engine.js:1946`, top-down `:2063`, **iso `:800`** — plus `t3Trolley` at `engine3d.js:861`). One reader:

```
const TROLOOK_DEF={body:"#B0563A",trim:"#8E4230",glass:"#D8E6F0",lamp:"#E0A430",
                   wheel2:"#2B2536",wheel3:"#2B2B31"};   /* two wheel keys: they differ TODAY */
const troCol=p=>(livery&&livery[p])||(PACKDEF()[p])||TROLOOK_DEF[p];
```

`livery` is the player's save (§2); `PACKDEF()` is the pack's declared default; `TROLOOK_DEF` is the engine's. With no pack table and no save the string returned is the literal that is in the file today, in every camera — that is what makes the default byte-identical, and §5 R2 is how you know rather than believe.

**CHOICE (pack).** `TROLOOK` in `content/<pack>/config.js`, shaped like `WEAR` (`engine.js:448`) so the panel builder is the same twelve lines:

```
const TROLOOK={ def:{...},                       /* this pack's car, before anyone chooses */
                body:[hex,...], trim:[hex,...], band:[hex,...],
                lamp:["brass","plain"], pole:["trolley","none"],
                badge:(g,x,y,w,h)=>{...} };      /* the operator's mark, PAINTED BY THE PACK */
```

**`badge` is a painter, never a string.** The letters MQT lived in the engine and were moved out on 2026-09-04 for breaking the portability law — the comment is still there (`content/meridian/art.js:105-106`). An engine that accepts a livery *name* re-imports the same bug through a text field, and a text field is also how you get "Car 2". The pack paints its own mark; the engine hands it a rectangle.

**Enum keys (`lamp`, `pole`) are enforced in the draw, not in the sanitizer** — `TRO_LAMP[style]||TRO_LAMP.plain`. That is the house pattern already: `lk.style=str2(lkIn.style,12,"cap")` (`:524`) clamps length, not membership, and the draw is what saves it.

---

## 2 · Where the choice lives

`save()` (`engine.js:503`) gains `tl:livery`. `sanitizeSave` gains one line beside `wearIn` (`:530`):

```
const livIn=()=>{const o=(s.tl&&typeof s.tl==="object")?s.tl:{};
  return{body:col(o.body),trim:col(o.trim),band:col(o.band),
         lamp:str2(o.lamp,10,null),pole:str2(o.pole,10,null)};};
```

…and `tl:livIn()` in the returned object. **Every field nullable, null meaning "the default"** — which is what makes an old save and a `#save=` link from before the feature render as today's car with no migration. The load path is `:5638`'s shape. The Trolley Pass then carries your paint to your other device for free, which is the nice line and also the reason the sanitizer is not optional.

**What `docs/GAUGE.md` demands of a pack that omits it.** El Faro declares no `TROLLEYAT` at all, and the town declares no `GROWTH` whatsoever (`changarrito/content/config.js` — `GRW()` returns `{}`, so the wardrobe button is hidden today and the livery button would be too). Three concrete demands fall out:

1. **`typeof`-guarded, and added to the optional list in `docs/NEW-WORLD.md:195-198`** beside `TROLLEYAT`.
2. **No check may fail a pack for having no tram.** The gauge's own unfixed complaint is the suite failing El Faro *for being small rather than wrong* (`docs/GAUGE.md`, "What it still fails, on purpose"). A livery audit runs only when `TROLLEYAT` is non-empty.
3. **No new *required* `UI` key.** Gauge finding #2 is that `applyLang` bare-dereferences ~82 `UI` keys and that is the thing a new pack hits. `openWardrobe` reads `t.wdTitle` bare (`:4862`) and gets away with it only because you cannot open the panel without `GROWTH.wardrobeNpc`. Copy that gating deliberately, do not copy it by accident.

---

## 3 · How the taller unlocks it — no engine knowledge of Don Tacho

Four content keys, one for one with the wardrobe's:

| Wardrobe, today | Livery | Read at |
|---|---|---|
| `GROWTH.wardrobeQuest:15` | `GROWTH.liveryQuest:<one of 24-31>` | `engine.js:4139-4140` — *any attempt* (`done.has(q)||qa[q]!==undefined`) shows the Settings button |
| `GROWTH.wardrobeNpc:"xochi"` | `GROWTH.liveryNpc:"tacho"` | `:3613` (the bubble hint) and `:3690` (talk opens the panel instead of chat) |
| `T().wdHint` | `T().trHint` | `:3614` |
| `T().wdUnlockToast` | `T().trUnlockToast` | `:3849` |

The engine learns "somebody nominated by the pack opens the paint shop". It never learns the word *taller*.

**One thing I would change while I am in there.** `:3611-3614` and `:3690-3691` are now a hardcoded chain of *if this npc, open that panel* — barber, wardrobe, and livery would be the third. Three is where the pattern earns a table: `const PANELS={[GRW().barberNpc]:openChair,[GRW().wardrobeNpc]:openWardrobe,[GRW().liveryNpc]:openLivery}` built once. That is a RULE (an NPC may own a panel), it is ~8 lines, it deletes a copy-paste, and it is the difference between this seam costing half a sitting and the fourth one costing a full one. It is also the only place I would let this job touch code A13 did not send me to.

---

## 4 · What breaks in six months

**1 · `t3Invalidate` cannot repaint the tram. This is the one that will be shipped broken.** [CODE]
`t3Trolley` builds under `if(!T3.tram)` and adds the group to **`T3.scene`** (`engine3d.js:630`, `:678`). `t3Build` removes and disposes **`T3.group`** only (`:196`), and `t3Invalidate` just bumps `T3.dirty` (`:11`), which keys the *tile* cache (`:850`). Nothing anywhere assigns `T3.tram=null`. So the car is built once per page load and every one of the eight `t3Invalidate()` call sites in `engine.js` is a no-op against it. A session that implements the repaint the obvious way — *change the state, call `t3Invalidate`* — ships a game where **you paint the tram at Tacho's, walk out, and the tram is the old colour until you close the app.** The fix is not to invalidate: keep the six materials on `T3.tramMat` and set `.color.set(troCol(p))` each frame in the `if(on)` block beside the wheel rotation (`:686`). That is cheaper than a rebuild and it is why this seam should *never* go through the bake.

**2 · The ride (`RIDE_`).** `troTick` parks the hero's draw position on the car (`engine.js:1527`) and `rideDraw(who,seat)` (A13 item 4) will draw him against the body. A dark livery plus a dark shirt reproduces *"the character is just laying down on it"* in a new form, after the depth pass has supposedly fixed it. Cheapest guard, and it is a RULE: the passenger is always drawn against the **band**, and the band falls back to the default when its luminance is within ~0.2 of the chosen body.

**3 · The A13 depth pass, which does not exist yet.** Item 1 will split the car into a behind-the-hero part and an in-front-of-the-hero part. A livery expressed as a **table of parts** survives that split unchanged; a livery expressed as *one draw function per livery* doubles at the split and again at every camera. This is the strongest argument for the table and it is worth writing down before either lands.

**4 · A livery key with no reader is silent.** `troAudit` guards the **line** (`TROKEYS`, `:282`), not the car. `TROLOOK` needs its own two-line audit in the same commit as its first reader, obeying the rule already written at `:281`.

**5 · Pack copies of the engine's hexes.** `changarrito/content/art.js:28,32` hardcode `#B0563A` and `#8E4230` on the town's own tram sign. Repaint the engine's car and that sign no longer matches. Meridian's stop is a different red already (`#C0392B`, `content/meridian/art.js:109`), so it does not drift — but nothing prevents the next pack from copying.

**6 · Two shells, by hand.** The panel is new DOM in `index.html:706-715` **and** `changarrito/index.html:705-714`, plus strings EN+ES in both packs. Nothing enforces the lockstep. `GAMEV` + `CACHE` bump on every one of these sittings.

---

## 5 · The RED tests

**R1 — "I painted it green at Tacho's, walked out, and it is still red."**
Set the livery, call `draw3d()`, read `T3.tram`'s body material colour. **Red today** (no seam). The discipline that makes it worth writing: **the test must not call `t3Invalidate()`**, because if it does, it will pass on an implementation that only repaints on a rebuild that never happens in play. Prove it can go red against the finished code by mutating the save field and rendering one frame, nothing else.

**R2 — "The tram is a different red than it was yesterday and nobody chose that."**
With no pack `TROLOOK` and an empty `tl`, park `TRO.x` at a fixed value and pin the car's rect in **all three** 2D cameras (front `:1946`, top-down `:2063`, **iso `:800`** — iso is the one that got skipped last time and a tram drove down an empty street for weeks, `engine.js:794-799`) plus the six 3D material colours. **This one passes on unchanged code, so it is not evidence until it is broken on purpose:** plant `wheel2:"#2B2B31"` — the real, tempting "unify the palette" mistake — and confirm it goes red in 2D and stays green in 3D.

**R3 — "I wrote `fender:` and nothing happened."**
Plant `TROLOOK={fender:"#123456"}` with no reader and assert the boot warning names the word. Read it through **`logCrit()`** (`engine.js:28`), never the console string — `mqwarn("trolley",m,true)` at `:5621` is the path, and the console text is the thing two suites' filters failed to match for months.

**R4 (cheapest, do it first) — "the button is there in a game with no tram."** Boot the town, open Settings, assert the livery button is hidden. Red the moment somebody forgets the `GRW()` guard.

---

## 6 · Cost, in sittings

| # | Sitting | What ships | Cost |
|---|---|---|---|
| — | **A13 item 1 — the depth pass** (already queued, not mine) | prerequisite for everything below | already costed |
| A | **One place for the car's colours** | `TROLOOK_DEF` + `troCol`, all four draws read it, R2's pin, R3's audit. **Nothing player-visible changes** | **1** · engine, bump |
| B | **The parts he photographed** — band, lamp cluster, pole, fender, in three 2D cameras and 3D | this is the owner's picture, and it is Pili's and Rigo's sitting, not mine | **1–2** · the risk lives here |
| C | **The choice** — save field, `sanitizeSave`, the panel in both shells, strings ×2 packs ×2 languages, live repaint by material mutation (§4.1) | the player can paint it from Settings | **1** · engine + both shells, bump |
| D | **Tacho opens it** — `liveryQuest`/`liveryNpc`, the `PANELS` table, the toast | the unlock | **½** · engine, bump |

**3½–4½ sittings after the depth pass**, of which B is most of the cost and all of the taste. A is worth doing on its own even if he never chooses a colour: it ends the 2D/3D palette drift and it is invisible, which makes it the safest thing on the list.

**What I would NOT do.** No per-livery draw functions (breaks at the depth pass). No named liveries as presets in the engine (the pack names things; the engine counts parts). No livery on the `TROLLEYAT` line entry — it looks natural and it is wrong twice: `troAudit` would reject the key, and a *line* is a route while the livery belongs to the **car**, which is a singleton (`TRO`, one global, `docs/OWNER.md`: "A queue is realistic. Do not send another one"). No repaint through `t3Invalidate`. No free-text name field, for the reason in §7.

---

## 7 · Does a livery collide with A13? — no, except on one key, and A13 wins

A13 bans two things: **no fleet number** (one car is signed; a number implies siblings) and **no face detail at any scale** (`docs/ARCH-LOG.md:765-768`).

- **The driver: no collision, the opposite.** A13's own text says *"nobody here means a livery, not a blank"* (`:756`) and its table asks for **a gold band at chest height, the same `#E0A430` as the car's trim** (`:762`). That band cannot exist as a *matching* band unless the trim is a value something can read — which is this seam. The livery is how A13 item 5 gets built, not a competitor to it. Constraint that falls out: the driver's shoulders and cap read `troCol("trim")`, and **no livery key ever addresses the head** — the face has no slot to be given one.
- **The one collision: a name.** A player-typed name on the car's side is one keystroke from "Car 2", and it would re-import pack words into engine code. **A13 wins.** The resolution that gives the owner what the photograph shows without touching the signed line: the operator's mark is a **pack-supplied painter** (`TROLOOK.badge`), the engine offers no text field, and the table has **no numeric slot at all**. If he wants to type a name on his tram, that reverses a signed line and A13 gets amended in his words first — it is not something this seam should quietly allow.

---

# QUESTIONS FOR THE OWNER

**1 · Does the season repaint his tram?** `docs/OWNER.md` (2026-09-01, amended 2026-09-07) says Día de Muertos may **dress** the world — *"marigold, and petals too and papel picado - do it alll!!!"*, *"calavera paint on everyone"* — and the engine's mechanism for it is `art(key,fb)` (`engine.js:4272`), which a pack's season may use to override any world-art key. The tram is not wired to `art()` today and therefore never changes with the calendar. If the livery ships and October arrives: **his paint, or the season's?** I would build *his paint wins, the season never touches the car* (a choice the player made outranks a calendar), and the car gets dressed by things hung *on* it if we ever want that. One word from him settles it and it is one line either way.

**2 · Which half does he want first?** Offered the way the dial is written:

| What he types | What he gets | Note |
|---|---|---|
| *"the parts first"* | the band, the lamps, the pole and the fender get built — the car looks like his photograph, **for everybody, with nothing to choose yet** | **Recommended.** It is the half that shows in a screenshot, and the paint chart is worthless until there is something to paint |
| *"the paint first"* | the five colours the car already has become choosable at Tacho's | ships in 1½ sittings, but the menu offers body, trim, glass and wheels — no lamps, no pole, no band, because they do not exist |
| *"both, in order"* | sittings A→B→C→D above | ~4 sittings and four version bumps |
| *"leave it"* | the queue is unchanged and the depth pass goes next | costs nothing, and the depth pass has to happen first either way |

---

# WHAT I DID NOT CHECK

- **I rendered nothing and ran no suite this sitting.** Every colour and line number above is read from the source, not measured on screen. The "two of seven" count in §0 is from reading two draw functions; a screenshot could show me a lamp I read past.
- Whether the tram appears in the **minimap / town map** (`MAPDOT`, `MAPCOL`) at all — if it does, that is a fifth camera the livery must reach.
- `test/gauge.js` generates El Faro's shell from `index.html` with `String.replace` assertions; I did not read it to confirm that **adding a new panel block survives the generator**.
- Whether anything else in either pack hardcodes `#B0563A`/`#8E4230` beyond the four hits I grepped (`changarrito/content/art.js:28,32`; the mural palette at `murals.js:25-26`, which is the wall's own paint and correctly independent).
- I did not verify `openChair`'s full flow, only its dispatch — the `PANELS` table in §3 is designed against two call sites I read, not against the chair's internals.
- The `#save=` round trip with a `tl` field: reasoned from `sanitizeSave`, not exercised.

---

# POST-FLIGHT

Sent to design a paint shop, I spent the first half of the sitting counting what the car is made of and found it is made of less than the photograph, which turned a colour-table design into a sequencing argument. The finding that will actually save a session is not in the seam at all: `t3Invalidate` is the function anybody would reach for to repaint the 3D tram and it cannot touch it, because the tram hangs off `T3.scene` while the bake only disposes `T3.group` — the same family as the baked `NPCLOOK` I learned last sitting, in a different file, reached by a different route. My RULE/CHOICE cut did its job cleanly here (one table in the engine, one catalogue in the pack) but it did not warn me that a table can be correct and still be four promises, which is what `TROKEYS` was written in this same file to catch. The persona edit I propose, as exact text, to be appended to the bullet that begins *"Before you write a guard, find the one that should already have caught it"*:

> **And a seam is only as real as its readers.** `troAudit`/`TROKEYS` (`engine.js:276-298`) exists because a pack key nobody reads is *"the one where somebody wrote a line, saw nothing happen, and had no way to find out why."* Before you design a table of options, **count which of its keys something already draws.** *(The moment, 2026-09-13: asked to design a tram livery from a photograph of a real heritage tram — body, cream band, lamps, pole, gold lining, fender — the car in the code had the body and, in one camera out of four, an 8×2 px gold strip. Four of the six proposed keys would have been promises.)*

---

# MURAL PANEL

```
id:     beto-seis-en-la-foto
by:     "beto"
iter:   6   date: "2026-09-13"
title:  {en:"Six in the photograph, two on the car",
         es:"Seis en la foto, dos en el carro"}
said:   {en:"He handed us a photograph of seven parts. The car has the colour of one of them, and a gold line eight pixels wide that only one camera out of four has ever drawn.",
         es:"Nos dio una foto de siete piezas. El carro tiene el color de una, y una l\u00EDnea dorada de ocho p\u00EDxeles que s\u00F3lo una c\u00E1mara de cuatro ha pintado jam\u00E1s."}
state:  {en:"Chart pinned, nine chips cut, seven struck out. I will not hang a paint card over a part nobody draws \u2014 the option would exist, the word would save, and the car would come back the same colour.",
         es:"Carta pegada, nueve muestras cortadas, siete tachadas. No cuelgo una tarjeta de color sobre una pieza que nadie pinta \u2014 la opci\u00F3n existir\u00EDa, la palabra se guardar\u00EDa, y el carro volver\u00EDa del mismo color."}
who:    {en:"Beto, who counted the parts before he chose the paint",
         es:"Beto, que cont\u00F3 las piezas antes de escoger la pintura"}
cap:    {en:"He was sent to design the customisation and spent the first half of it counting. The band, the lamps, the pole and the fender are not in the code in any camera, and this engine already keeps a list of the words it can read on this exact seam \u2014 written the day somebody learned that a key with no reader is the quietest fault there is, because the line looks right and nothing happens. A menu of four such keys would have passed every suite, saved every choice, and repainted nothing.",
         es:"Lo mandaron a dise\u00F1ar la personalizaci\u00F3n y la primera mitad se le fue contando. La franja, los faroles, el trole y la defensa no est\u00E1n en el c\u00F3digo en ninguna c\u00E1mara, y este motor ya guarda una lista de las palabras que sabe leer en esta misma costura \u2014 escrita el d\u00EDa que alguien aprendi\u00F3 que una llave sin lector es la falla m\u00E1s callada que hay, porque la l\u00EDnea se ve bien y no pasa nada. Un men\u00FA de cuatro llaves as\u00ED habr\u00EDa pasado todas las pruebas, guardado cada elecci\u00F3n, y no habr\u00EDa repintado nada."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;
  murGround(g,W,H);                                   /* the shop wall, not paper: this one happened at the wall with the chart on it */
  /* THE PINNED PHOTOGRAPH, top-left: a heritage car, warm, with all seven parts on it */
  const px=W*0.06,py=H*0.10,pw=W*0.38,ph=H*0.42;
  g.fillStyle="#EFE7D6";g.fillRect(px-4,py-4,pw+8,ph+10);              /* the white border of a print */
  g.fillStyle="#3A3040";g.fillRect(px,py,pw,ph);
  murTram(g,px+pw*0.08,py+ph*0.34,pw*0.84,ph*0.42,{cabs:true,driverAt:1});
  g.fillStyle=P.gold;                                                   /* the parts the photo has and the car does not */
  g.fillRect(px+pw*0.08,py+ph*0.74,pw*0.84,2);                          /* the lining */
  [0.18,0.30,0.42,0.58,0.70,0.82].forEach(t=>{g.beginPath();g.arc(px+pw*t,py+ph*0.68,2.2,0,7);g.fill();});  /* the lamps */
  g.strokeStyle=P.ink;g.lineWidth=2;g.beginPath();                      /* the pole */
  g.moveTo(px+pw*0.60,py+ph*0.34);g.lineTo(px+pw*0.86,py+ph*0.12);g.stroke();
  g.fillStyle=P.bone;g.fillRect(px+pw*0.08,py+ph*0.40,pw*0.84,3);       /* the cream band */
  [0,1].forEach(i=>{g.fillStyle=P.ink;g.beginPath();g.arc(px+(i?pw-6:6),py+6,3,0,7);g.fill();});  /* two pins */
  /* THE PAINT CHART, right: nine chips, seven struck through */
  const cx=W*0.52,cy=H*0.08,cw=W*0.40,rows=3,cols=3,sw=cw/cols;
  g.fillStyle=P.wash;g.fillRect(cx-6,cy-6,cw+12,sw*rows*0.86+22);
  const chips=[["body",P.rust,1],["trim",P.deep,1],["glass",P.bone,0],
               ["band",P.shade,0],["lamp",P.gold,0],["pole",P.ink,0],
               ["fender",P.moss,0],["doors",P.sky,0],["badge",P.lime,0]];
  chips.forEach((c,i)=>{const x=cx+(i%cols)*sw,y=cy+((i/cols)|0)*sw*0.86;
    g.fillStyle=c[1];g.fillRect(x,y,sw-10,sw*0.52);
    g.strokeStyle=P.ink;g.lineWidth=1;g.strokeRect(x+.5,y+.5,sw-10,sw*0.52);
    g.fillStyle=P.ink;g.font="10px ui-monospace,monospace";g.fillText(c[0],x,y+sw*0.70);
    if(!c[2]){g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();       /* struck out: no reader */
      g.moveTo(x,y);g.lineTo(x+sw-10,y+sw*0.52);g.moveTo(x+sw-10,y);g.lineTo(x,y+sw*0.52);g.stroke();}});
  /* THE CAR AS IT IS, bottom: ghosted, and only the two live chips carry any colour */
  const tx=W*0.10,ty=H*0.64,tw=W*0.52,th=H*0.22;
  murTram(g,tx,ty,tw,th,{ghost:true});
  g.fillStyle=P.rust;g.fillRect(tx,ty,tw,th*0.10);                     /* body: the one colour it really has */
  g.fillStyle=P.gold;g.fillRect(tx+tw*0.46,ty-2,8,2);                  /* the eight pixels, at true width */
  murDim(g,tx+tw*0.46,tx+tw*0.46+8,ty-12,P.gold,"8px");
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("2 / 7",W*0.70,H*0.80);}
```

Files that matter to the caller: `/home/user/meridian-quest/engine/engine.js` (`:276-298` TROKEYS/troAudit, `:448` WEAR, `:503` save, `:530` wearIn, `:1535-1551` drawTram/troDraw2D, `:800`/`:1946`/`:2063` the three 2D call sites, `:3611-3614`/`:3690-3691`/`:3849`/`:4139-4142` the wardrobe unlock chain, `:4847-4875` the panel, `:5621` the trolley audit's mqwarn) · `/home/user/meridian-quest/engine/engine3d.js` (`:11` t3Invalidate, `:194-198` t3Build, `:619-687` the car, `:850-861` the frame) · `/home/user/meridian-quest/content/meridian/config.js:108-113` · `/home/user/meridian-quest/content/meridian/art.js:105-111` · `/home/user/meridian-quest/index.html:571,706-715` and `/home/user/meridian-quest/changarrito/index.html:570,705-714` · `/home/user/meridian-quest/docs/ARCH-LOG.md:727-790` · `/home/user/meridian-quest/docs/NEW-WORLD.md:195-222` · `/home/user/meridian-quest/docs/GAUGE.md`.


---

# rigo

PRE-FLIGHT — I read `docs/OPEN.md`, `docs/POSTMORTEM.md`, `docs/ARCH-LOG.md` A13/A13½/A13¾ and the SIGNED block, `docs/ASKS.md:38`, `docs/STORY.md` on Barrio Norte and ❗El chofer, and then the car itself in both renderers (`engine/engine.js:1535-1548` `drawTram`, `engine/engine3d.js:619-687` `t3Trolley`). Two things in my own persona file are stale and the code wins: **the tram does stop at its stop now** — `troDwell` at `engine/engine.js:1434-1440`, entered at `:1454`, `TRO_DWELL=3200` at `:1337` — and my own written recommendation was 4200 (`docs/meetings/2026-09-11-la-parada.md:270`); 3200 shipped, nobody wrote down why, and since it clears my 2500 floor I am not re-opening it. I rendered nothing this run and say so below.

---

## THE DELIVERABLE — what a depot repaints, and what it does not

### First, the measurement that decides everything else

In 2D the whole car is **64 × 32 px** (`TS=32` at `engine/engine.js:44`, `W=TS*TRO_LEN`, `H=TS` at `:1535`). In 3D at the width Chava walks it, a tile is about the same. So the car's whole body is thirty-two pixels tall and every option below has to be paid for out of that. I costed each one against the actual rectangles `drawTram` paints.

And here is the fault the photograph shows up before any menu exists. **The car today is painted one colour.** Body `#B0563A` (`engine/engine.js:1537`, `engine3d.js:632`), "trim" `#8E4230` (`:1538`, `engine3d.js:631`) — same hue, and **9% apart in luminance**. His heritage car's maroon against its cream band is about 44% apart. In the depot we had exactly one rule about paint and it was not about taste: **you must be able to tell the band from the panel from the other kerb at dusk.** A menu that hands somebody two colours without enforcing that will produce a brown smear on wheels, and the player will blame the game, not their own choice. **Floor: 35% luminance difference between body and band.** That is the one number the seam must enforce, not offer.

### LIVERY — what a real depot repaints, ranked by what a person actually sees

| # | Option | On his photograph | On our car today | What it reads as at 64×32 |
|---|---|---|---|---|
| 1 | **Body panel** (below the waist rail) | the maroon | `#B0563A`, `engine.js:1537` | **60 × 10 px, the largest single field on the vehicle.** This is the only choice that changes the car from the far end of the street. Must stay **dark** — a pale body against a pale road is a hole |
| 2 | **The band** — the colour the window surround is painted | the cream above the waist | **does not exist.** `:1538` is a 3 px dark strip at the roof edge, not a band | **A hard horizontal light stripe across the upper third.** A hard horizontal edge is the shape §1 of the post-mortem says survives at small size, and it is the single most "heritage tram" mark in his picture. Second only to the body, and it is missing, so it is also the biggest gain |
| 3 | **Roof colour** | pale | `DK` `#8E4230`, `engine3d.js:642` | Nobody thinks of this, because in life you never see a tram's roof. **Our camera looks down at the street, so the roof slab (1.98 × 0.80 tiles) is one of the largest surfaces the player ever sees.** A lead-grey or ivory roof lifts the car off the asphalt at night; the dark one it has now makes it vanish. Most pixels per unit of work on the whole list |
| 4 | **Route board / destination blind** | the board over the window | nothing | **A pale 12 × 4 px patch at the leading end, above the band.** It reads as a *lit rectangle*, never as words — do not draw letters at this size, they are three pixels of noise. Its content belongs to the line, not to fashion: a chooser over the pack's own declared stops (`troStops`, `engine.js:1348`), never free text |
| 5 | **Lining** (the gold fine line round the panels) | ornate, everywhere | nothing | **Honestly: zero at 64×32.** Sub-pixel. What it does at small size is lighten the panel's outline so the panel reads as a panel. Offer it as **on/off**, never as a colour, and tell the player plainly it is for the close camera. Do not sell it as a visible choice |
| 6 | **A crest on the panel** | yes, in the panelling | nothing | 3 × 3 px, one darker mark. Legal — a depot really did paint the city arms there — but it must be **the pack's crest, one of them, on/off.** Not the player's initials |
| 7 | **Lamp rims** — brass, chrome, painted | brass, three each side of the headlamp | nothing | **Zero at 64×32; a 3D close-up option only.** Say so when you offer it |

**Two colours is a livery. Seven colours is a fairground ride.** If the seam only ever ships items 1, 2 and 3, the car will look like a repainted tram. Items 4–7 are the reward for looking closer.

### STRUCTURE — what a depot never changes, so it is not on the menu

| Part | Why it is not a choice | What breaks if somebody makes it one |
|---|---|---|
| **The trolley pole** | It is how the car eats. Its height, its length and which way it trails are decided by the wire, not by anybody's taste | A pole that does not reach the wire is a broken aerial, and everybody who has seen a tram sees it |
| **The fender** | It is the thing that stops a person going under the wheels. It exists at **each** end because the car has two ends | If it is colourable at all it is forced dark. A pale fender is a safety device you cannot see |
| **The doors and where they are** | Door position is decided by the platform and the deck height. It is the one place this vehicle touches a person | Move a door and you have moved where boarding happens, which is a rule (`troServing`, `engine.js:1433`), not a look |
| **The bogie — wheel size, axle spacing, deck height** | `engine3d.js:646-660` puts four wheels at radius 0.115 and `:686` spins them by `-TRO.x/0.115`. **Wheel size is not a colour, it is a gear ratio** | Change the radius without the divisor and the car skates again — the exact fault that cost a day on 2026-09-11 and is written into that comment at `:648-659` |
| **Length, height, width** | `TRO_LEN=2` is also the brake window (`:1368`), the stopping position at a platform (`:1502`) and the span of "who is aboard" | Length is not a look. It is the safety envelope |
| **How many cabs** | Two, because the end of the line is a *place*: the driver picks up his bag and walks the length of the car. Not a taste | And note what the ledger already admits: `TRO.dir` is set once per pass at `engine.js:1448` and never flips, so **today the second cab is already decoration.** That is a fault to fix, not a feature to sell |
| **The driver's dress beyond the two signed pieces** | A13 signed the cap brim and the gold chest band, no face, no number (`docs/ARCH-LOG.md:761-768`) | A wardrobe on the driver re-opens all three of them in one screen |

### What the menu must REFUSE, in the words I would use at the counter

- **A second cab as an ornament.** It is not decoration, it is what the terminus makes necessary — and ours is already decoration by accident. Selling it would make the mistake permanent.
- **A face on the driver.** A13's own trap: the driver's problem was never a dimension, and a face is exactly what will tempt the next four attempts.
- **A fleet number.** One car on the line. A number implies brothers who will never exist, and he already declined it.
- **Painting the signal lamp.** This is my hardest no. `engine.js:1546-1548` is the only warning this vehicle has: red means *I stopped because of you, get off the rails*; amber means *the doors are open*; flashing white is the bell. **That lamp is not livery, it is safety, and a person who can repaint it can paint out the only thing the car can say.** Keep it off the menu and keep it off the palette, so no body colour can ever be chosen that swallows it.
- **Removing the fender or the pole.**
- **BARRIO NORTE on the blind — until the track is laid.** `docs/STORY.md:252-263` keeps it a promise and deliberately gives the line no face so nobody can be asked what is up there. A painted board is a mouth that cannot be asked a follow-up, and worse, today it would be a lie: the track is not built. Let the blind read a place the line actually serves — and then, the day the north opens, **let the board change.** That is the most elegant progress bar this game could have, it is a record of the present, and it costs nothing to reserve now by making the blind read from the line's declared stops instead of from a text field.

---

## THE ONE THING IT LACKS — the trolley pole, and the wire it needs

Our car now has wheels on the road, glass on four sides, a driver at the leading end and a roof a door tall. **Every one of those things a bus also has.** Nothing on it says why it moves. A boxy thing that glides down a street with no horse, no engine and nothing overhead is a shed on castors, and from outside — which A13 says is the only way anyone will ever see it — that is the whole of the impression.

The pole is the only part of his photograph that could not be on a bus.

**What it costs:** about 14 px of ink. A 1 px diagonal rising roughly ten pixels off the roof, and a 2 × 2 shoe under it. **A diagonal is the rarest shape in this entire game** — the street is boxes and horizontals — so it reads before the body does, in every camera, and at night the wire catches the lamp.

**And it does a job the car cannot do for itself.** A pole *trails*: it leans away from the direction of travel. So a person who glances at the roof knows which way the car is heading, with no face and no number — which is precisely the double-ended problem A13 was left holding. It is one sign flip, read off the same `TRO.dir` the driver already reads at `engine3d.js:684`.

**Half of it is already drawn.** `engine.js:1540` paints an 8 × 2 gold mark at the centre of the roof and nothing rises from it. **The mount is on the car and the pole is missing.** In 3D there is nothing on the roof at all (`engine3d.js:642-643` is the slab, and the next thing added is wheels).

**The honest cost, said plainly: a pole needs a wire.** A pole whose shoe touches nothing is worse than no pole. So this is two objects — the pole on the car, and a span wire down the centre of the line at roof height plus about a tile. Whether the engine can hang a wire across the street is Chema's answer, not mine. But the wire pays for itself twice: it crosses the whole map and out of both edges, which is the line saying *I continue past where you can walk* — the thing `docs/STORY.md` actually wants this tram for.

**Runner-up, and why it is second:** **the doors.** They are the thing that would make the 3.2 s dwell mean anything at all — right now the car stands still for three and a bit seconds and *nothing on it changes*, which is a pause, not a stop. But doors are structure and behaviour, not livery, and under "outside only" you would be drawing an opening nobody walks through. The day somebody builds a visible dwell, the doors go first. **Third: the fender** — 2 px of near-black across the bottom of each end, which reads as mass and finally sits the car *on* the street.

---

## QUESTIONS FOR THE OWNER

**One, and it decides the shape of the whole menu: whose car is it?**

The pets' wardrobe works because the pet is yours (`WEAR`, `engine/engine.js:448`). **The tram is not yours.** No passenger anywhere has ever chosen what colour the tram is. So the seam is one of two things and they build differently:

- **(a) A commission.** You did a job for Don Tacho and the line; the repaint is the payment, and the car comes back out of Taller Herrera in the colours you picked. Honest, it is exactly how a heritage car really does get repainted, it gives the mechanic shop a reason to exist in this story, and it means the choice happens **once in a while** — which is what makes seeing it come round the corner feel like something.
- **(b) A settings screen with swatches.** Cheaper, instantly satisfying, and it makes the city's tram into the player's toy. It will also get re-picked eleven times in the first minute and then never again.

I have a preference — (a) — but it is a product call, not a tram call, and Tavo should say whether it is worth a player's attention. **It is a real fork:** (a) needs a quest hook and a "the car is in the shop" state; (b) needs neither.

*(One thing that looked like a contradiction and was not: A13 answer 3 says "nothing happens on the ride". A livery chosen at the mechanic shop is not on the ride, so it does not touch that ruling.)*

## WHAT I DID NOT CHECK

- **I rendered nothing.** Every pixel figure above is read out of `drawTram`'s rectangles and `t3Trolley`'s box dimensions, not measured off a screenshot. Post-mortem §2 says render it and look, and I did not — somebody should put the band and the roof colour on the car and photograph it before believing my ranking of 2 against 3.
- Whether `WEAR`'s existing shape can carry a *constraint* between two options (the 35% rule) rather than just a list of swatches. That is Beto's trade and I did not open it.
- The side and back 2D cameras beyond `drawTram`'s `front` flag at `:1537-1548`.
- The town's own tram, and whether a livery seam would be behaviour-identical there.
- I checked `test/smoke.js` for tram colour literals and found none (its 3D guard reads `T3.tram` and `userData` at `:181-184`), so a repaint should not trip an existing guard — but I did not run the suite.
- Why `TRO_DWELL` shipped at 3200 when 4200 was the signed recommendation. Above the floor, so I left it.

## POST-FLIGHT

The useful thing this run was not the list of options, it was the 9% — I went looking for what to *add* to the car and found that the two colours already on it are the same colour, which no menu can fix and which every menu will make worse. My persona file told me the tram never stops at its stop; the code has had `troDwell` since 2026-09-11 and I would have said something wrong to the owner with real confidence if I had trusted the brief over `engine.js:1434`. The refusal I care most about is the signal lamp, because it is the one place where "let the player choose" and "the vehicle must be able to warn you" point in opposite directions, and the customisation ask does not know it is standing on it. My file taught me what a car *does* and never once what a car *is made of*, which is why I had to derive the livery-versus-structure line from the photograph instead of knowing it.

**Persona edit proposed** — append to "What you actually know, and it is narrow on purpose", as exact text:

> **Paint is two colours and a rule, and the rule is not taste.** A depot livery is a dark panel below the waist and a light band around the windows, or the reverse — never two mid-tones, because the whole point is that the band tells you which line's car it is from the other kerb at dusk. If the two are less than about 35% apart in brightness, you have painted a one-colour car. **And know which parts of a car a depot may repaint at all:** the panel, the band, the roof, the lining, the crest, the blind — yes. The pole, the fender, the doors, the bogie, the length, the number of cabs — never, because each of those is decided by the wire, the platform, the rails or the terminus, and not by anybody's preference. **The one thing that is painted and is still not livery is the signal lamp**: it is the only sentence the vehicle can say, and it is not on anybody's menu. *(Added after the 2026-09-13 run: the owner sent a photograph of a heritage car and asked what a person may customise; this file could tell him how long the car should stand at a stop and nothing at all about what it is made of, so I had to build the livery/structure line from scratch under a deadline.)*

---

MURAL PANEL

```
id:     rigo-un-solo-color
by:     "rigo"
title:  {en:"One colour, and they called it two",
         es:"Un solo color, y le decían dos"}
said:   {en:"Nine per cent apart is not a livery. It is a brown car that somebody
             wrote two names on.",
         es:"Nueve por ciento de diferencia no es librea. Es un carro café al que
             alguien le puso dos nombres."}
state:  {en:"Holding that the paint menu must refuse things — starting with the lamp,
             because it is the only sentence this car can say.",
         es:"Sostengo que el menú de pintura tiene que negar cosas — empezando por el
             farol, porque es la única frase que este carro sabe decir."}
who:    {en:"Rigo, who went to add a colour and found there was only ever one",
         es:"Rigo, que fue a agregar un color y descubrió que nunca hubo más que uno"}
cap:    {en:"The owner sent a photograph of a real car — maroon below, cream around the
             windows — and asked what a person could repaint. Before answering I put our
             two colours side by side and they are nine per cent apart in brightness, the
             same hue, one of them three pixels tall and called the trim. His car is
             forty-four per cent apart. The band was never missing from the menu. It was
             missing from the tram.",
         es:"El dueño mandó la foto de un carro de verdad — guinda abajo, crema alrededor
             de las ventanas — y preguntó qué podía repintar uno. Antes de contestar puse
             nuestros dos colores juntos: nueve por ciento de diferencia en brillo, el
             mismo tono, y uno de ellos mide tres pixeles y le dicen el filete. El de él
             anda en cuarenta y cuatro. La banda nunca faltó en el menú. Faltaba en el
             tranvía."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* Rigo's hand again: a signwriter's board. Heavy bands, a gold rule, nothing cute.
     Two cars, one over the other. The top one is ours as it is painted today — the body
     and the "trim" are laid as two bars that plainly do not part company. The bottom one
     is his photograph: the same body, a real band, and a pole going up off the panel. */
  g.fillStyle=P.ink;g.fillRect(0,0,W,H*0.14);
  g.fillStyle=P.gold;g.fillRect(0,H*0.14,W,3);

  /* --- the swatch pair, top left: two bars butted together, no gap, so the eye is
         forced to find the edge and cannot --- */
  const sx=W*0.06,sy=H*0.22,sw=W*0.26,sh=H*0.11;
  g.fillStyle=P.rust;g.fillRect(sx,sy,sw,sh);
  g.fillStyle=P.deep;g.fillRect(sx,sy+sh,sw,sh*0.5);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("9%",sx+sw+8,sy+sh);

  /* --- the same pair as it should be: body, then the band, a clear step --- */
  const tx=W*0.58;
  g.fillStyle=P.rust;g.fillRect(tx,sy,sw,sh);
  g.fillStyle=P.wash;g.fillRect(tx,sy+sh,sw,sh*0.5);
  g.fillStyle=P.ink;g.fillText("44%",tx+sw+8,sy+sh);

  /* --- our car, as painted: murTram gives the rust body and the deep strip, which is
         exactly the thing being complained about, so it is drawn with no help --- */
  const cw=W*0.34,ch=H*0.20,cy=H*0.44;
  murTram(g,W*0.06,cy,cw,ch,{driverAt:1});

  /* --- his car: the same silhouette with a cream band laid across the window course,
         a fender, and the pole leaning back against the way it is going --- */
  const bx=W*0.55,by=H*0.44;
  murTram(g,bx,by,cw,ch,{driverAt:1});
  g.fillStyle=P.wash;g.fillRect(bx+2,by+ch*0.22,cw-4,ch*0.10);   /* the band */
  g.fillStyle=P.bone;                                            /* re-cut the glass over it */
  {const n=3,gw=(cw-10)/n;for(let i=0;i<n;i++)g.fillRect(bx+5+i*gw,by+ch*0.32,gw-4,ch*0.30);}
  g.fillStyle=P.ink;g.fillRect(bx,by+ch-1,cw,2);                 /* the fender */
  g.strokeStyle=P.ink;g.lineWidth=2;                             /* the pole, trailing */
  g.beginPath();g.moveTo(bx+cw*0.55,by);g.lineTo(bx+cw*0.16,by-H*0.17);g.stroke();
  g.fillStyle=P.gold;g.fillRect(bx+cw*0.52,by-3,7,3);            /* the shoe that is already drawn */
  g.strokeStyle=P.shade;g.lineWidth=1;                           /* the wire it needs, edge to edge */
  g.beginPath();g.moveTo(0,by-H*0.17);g.lineTo(W,by-H*0.17);g.stroke();

  /* --- the one thing the menu may not touch: the lamp, ringed --- */
  g.fillStyle="#D9342B";g.beginPath();g.arc(bx+cw-6,by+ch*0.30,3,0,7);g.fill();
  g.strokeStyle="#D9342B";g.lineWidth=1;
  g.beginPath();g.arc(bx+cw-6,by+ch*0.30,7,0,7);g.stroke();

  g.fillStyle=P.gold;g.fillRect(0,H*0.88,W,3);}
```


---

# pili

## PRE-FLIGHT

I read `docs/POSTMORTEM.md` §1–§3, §12 and §13, `docs/OWNER.md`, and then the drawing code itself — `drawCalaverita`, `propSill`, `drawSillLedge`, `drawSillBox`, `drawSillLit`, the front camera's two passes, `drawWindows`, `t3Light`, the 3D sill sprites, and both tram drawings. **This run gave me Read, Grep and Glob and no shell, so I could not render — every pixel claim below is arithmetic off the hex constants and the draw order, tagged `[CODE]`, and §2 and §12 both say that is the weaker instrument; treat my numbers as predictions and shoot the mock before you build.** What I found instead of a picture is better than another size: the skulls have already won the contrast fight by roughly 185 points of 255, and the thing they have lost is the naming fight.

---

## THE DELIVERABLE

### A · The skulls, fifth report

#### The measurements, all `[CODE]`

The skulls on Meridian Street stand on `B` tiles (`content/meridian/maps.js:48` — row 0 of `st` is all `B` but the door at x=14). `B` is `{lift:13,kind:"facade",win:[[5,10,8,9],[19,10,8,9]]}` (`engine/engine.js:1846`). So at each sill: pane **8×9** tile-pixels, candy size **7** (`propSill`, `engine/engine.js:1079`), ledge **11 wide × 6 tall** (`sillBoxW`/`sillLedgeH`, `:1165`).

| Thing | Hex | Where | Luma /255 |
|---|---|---|---|
| the sugar | `#F6F2E8` | `drawCalaverita`, `engine/engine.js:1235` | **242.0** |
| the ledge stone | `#F7F2E2` | `drawSillLedge`, `engine/engine.js:1173` | **241.6** |
| pane, top→bottom | `#F2B705`→`#E8873A`→`#8A3F1E` | `drawSillLit`, `:1119` | 180 → 150 → 82 |
| the wall face | `#5C4A50` | `TILEDRAW["B"]`, `:835` | 80, and it is **purple** — the owner's word |
| the foil socket | `#E8478F` | `:1236` | 127 |

At night in 3D the wall is a lit Lambert mesh (`ambI=0.6`, `ambC=0xaebbe8`, `sunI=0.15`, `engine/engine3d.js:834`) and the sill sprites are **unlit and untinted** — no sprite in that block is pushed to `T3.tintables` (the list is `engine/engine3d.js:197`–`527`; the calaverita, pane and ledge at `:565`–`:607` are not in it). So the assembly stays at full brightness while the wall drops to roughly 55–60.

#### What a cold reader sees first at the sill, in order

1. **The gold pane.** Biggest saturated shape, unlit against a wall the night has dimmed. It wins by a mile.
2. **A pale plinth.** The sugar is 242.0 and the stone it stands on is 241.6 — **they differ by four tenths of one point out of 255.** The skull's base sits exactly on the ledge's top (`paneBottom` for the pane at `:571`, `paneBottom − LH/32` for the ledge at `:605`), so the two touch. They are one mass: 7 wide of dome on 11 wide of stone, an inverted T, bright, symmetrical, repeated eight times along a row. **That is a masonry detail.** A keystone, a vent, an air-conditioner, a corbel.
3. The papel picado, overhead, doing its job as always.
4. The wall.

The skull is never step 1, 2, 3 or 4. It has been absorbed into the building.

#### The four questions you asked, answered as readability

- **Value against the sill:** Δ0.4. Camouflage, and nobody chose it — the sweet's cream was picked when I drew it and the stone's cream was picked five days later by the fix that gave it a shelf, and no one ever put the two hexes side by side. **The fifth fix cured floating and bought camouflage with the change.**
- **Silhouette against the wall:** excellent, and it is not the problem. Unlit cream at 242 on a night wall at ~57 is a Δ of about 185. It is the loudest small shape on that facade. A cold reader can see it from the far end of the street and still cannot name it.
- **Three identical marks in a row:** yes, and worse than three — there are **eight** on `st` (`content/meridian/config.js:155-156`), evenly spread along one facade row, identical but for a 2×2 foil patch that is sub-pixel at delivery. Evenly repeated identical marks along a building line are *cornice*. Repetition is what turns an object into ornament, and this is the ornament dose exactly.
- **Does the night wash flatten them:** no, and this is worth saying out loud because two shipped comments assume the opposite. `engine/engine.js:1110` and `engine3d.js:559` both justify the lit pane as *"a warm pane among dark ones."* In the flat cameras that premise is false at night: `drawWindows` (`engine/engine.js:2149`) lights **every** tile with a `win` row at α 0.5, skipping only `(hsh&7)<2` — about a quarter. In 3D the premise holds, because there is no `drawWindows` in the 3D path at all. The night does not flatten the skulls; it flattens the *argument for the lit pane* in two of four cameras.

#### Two faults I found on the way, both `[CODE]`, neither a matter of opinion

- **In the FRONT camera the sill assembly is painted and then buried.** `fiestaDraw2D(...,true)` runs in the ground pass at `engine/engine.js:1946`; the facade is pushed into the depth list at `:1961` and painted at `:2016`; `TILEDRAW["B"]` (`:835`) fills the whole tile opaque and then fills both window rects opaque. **100% of the pane, the candy and the brand-new ledge is overpainted.** This is the same defect class as `docs/ARCH-LOG.md:556` — *"the character is just laying down on it"* — on the **same source line**, because `troDraw2D` and `fiestaDraw2D` are called together at `:1946`. The comment at `engine/engine.js:1138` says *"One drawing, used by the front camera and by the 3D sprite, so the two cannot drift."* The front camera draws it into a grave.
- **The halo has already drifted.** `drawSillBox` gives the candy a `rgba(26,20,32,.45)` dark edge *"so cream sugar on a warm pane still has an edge at three screen pixels"* (`engine/engine.js:1181-1182`) — front camera only. The 3D path paints the candy straight onto the pane with no halo (`engine/engine3d.js:568`). The camera that is the pack default and the one he screenshotted is the one without the edge.
- **Dead duplicate block.** `drawOfrenda`, `fiestaProps`, `drawPapelRow` and `drawSillLit` are each defined **twice** — `engine/engine.js:1081-1122` and again at `:1185-1226` — and the 18-line sill header comment is duplicated at `:1123-1140` / `:1141-1158`. Function declarations hoist and the two copies read identical, so behaviour is unchanged; but it is ~60 lines shipping to players twice, and it is a trap: edit the first copy and nothing happens. This looks like the survivor of the incident in `docs/POSTMORTEM.md:145` (`const SILL_OUT` declared twice) — the constant was de-duplicated, the block around it was not.

#### The ONE change, and it is not a dimension

**Redraw the sweet with the proportions of a real calaverita: sockets a third of the face each, dark, and delete everything else at sill size.**

Not the size. Not the light. Not the shelf. **The drawing.** Here is the reason, and it is the only one that matters: a real sugar skull is recognised across a street because its eye sockets are enormous — a quarter to a third of the face each — and ours are **2×2 in an 8×8 box, six per cent of the face** (`engine/engine.js:1236`). Ours is drawn like an anatomical skull. Into that same 8×8 box `drawCalaverita` also puts a 0.8px icing brow arc, three 0.9px crown dots, two 0.8px specular highlights, a teal nose, two 0.5px teeth, a jaw line and a base shadow — **twelve marks in six inks inside twelve delivered pixels.** At the owner's own scale (~20 px per skull in a 1172 px frame) every one of those is one to three pixels and they average into cream mush. Silhouette first, colour second, **detail last** — this sweet is detail-first, and it is the only object in that frame that is.

Two big dark sockets do three jobs with one change: they make the thing a **face**, which is the one shape a human names instantly at any size; they punch holes in the pale mass, so skull-plus-stone stops being one blob; and they need no extra pixels, so the flat-picture count and the world size are untouched. It is also the trick the one legible element in the same frame already uses — the papel picado reads because it has **holes you see through** (`engine/engine3d.js:698`, `clearRect`), which is *"the difference between bunting and papel picado"* in my own words. Punch the skull the way we punch the paper.

Fold the halo into `drawCalaverita` itself while you are in there, so the 2D/3D drift at `:1182` vs `engine3d.js:568` cannot happen again. That is one change, not two — the drawing owns its own edge.

**Seam:** `drawCalaverita`, `engine/engine.js:1227-1242`. One function, five call sites (sill 2D, sill 3D, loose prop 2D and 3D, the ofrenda at `:1196`, the tree lantern at `:1252`) — they all inherit it and they all need a fresh cold read.
**Honest cost:** half a day. The drawing, the cold read (`node test/tilesheet.js` plus a person who has not seen it), the pixel guard below, and re-shooting the ofrenda and the lantern because they get it too. **It moves the owner's flat-picture count by zero** — these are sprites, and `test/town.state.js:53-54` walks `T3.group` skipping anything without `userData.g`, so it counts map tiles only. Saying that now, not after.
**What it costs to skip:** a sixth report. He has written four times "hidden" and once "arrows have to point them out"; the word changed and the fix must change kind with it. Everything shipped so far is *make it bigger* or *make it brighter*. Both are exhausted: the assembly already beats its wall by ~185 of 255.

#### The number a guard would read — pixels arriving, per `docs/REGRESSION.md` #13½

The guard that exists today (`test/smoke.js:4194-4212`) projects the **ledge** and counts pale pixels, passing at `stone >= 3`. That proves **visible**. It cannot fail on a thing nobody can name. It is the right machinery aimed at the wrong noun.

**Add, using the same `gl.readPixels` machinery, aimed at the sweet:**

> After `draw3d()`, project the sprite with `userData.calaverita && userData.sill` to screen, read back its box, take the scanline at 35% of the box height (the socket row), and count **socket runs** — maximal runs of ≥1 px whose luma is more than 60 below the box's pale median, bounded on both sides by pale pixels. **Assert `sockets >= 2`.**

**Red before green is free here: run it against `main` unchanged and it reads 0 or 1 today** — the foil is mid-value and 6% of the face, and after the 7/8 scale it is a coloured smudge, not a bounded dark run. It goes green only when the sockets are punched. **The plant** (§0's rule, since knowing is provably not enough): repaint the sockets in the sugar cream and it must return 0. If it does not, it is reading the pane's dark bottom and not the face — widen the box test or fail the guard.

And the honest limit, in my own three-way: that number proves **legible** (you can tell the shape has two holes). It does not prove **meaningful**. Only the cold read does that, and the cold read is the one thing in this report I could not run.

---

### B · The tram livery

**The scale is not hypothetical — five pixels is what we ship.** In the flat cameras `drawTram` draws the whole car at `W = TS*TRO_LEN` = **64 px long**, with the glazing band **7–9 px tall** (`engine/engine.js:1535`, `:1539`). In 3D the body is 2 units long and 1.02 high (`engine/engine3d.js:633`) at `T3CAMD` back. So "five pixels from the kerb" is the working case, not the worst case.

**Today's livery fails its own test.** Body `#B0563A` (luma 110), roof and skirt `#8E4230` (87) — **Δ23, invisible**; the two-tone we ship does nothing. The only value event on the vehicle is the glazing `#D8E6F0` (227), and it is **three separate short panes with gaps between them** (`engine.js:1539`; `engine3d.js:663`), so it reads as three dots, not a line. The photograph reads because the cream is **continuous**.

| Option they will name | At five pixels | Why |
|---|---|---|
| **Cream band over maroon, full length** | **Reads. The strongest mark available** | A horizontal value step ≥100 running the whole length is the one livery device that survives any downscale — it is why every real tram, bus and coach has a waistline |
| **Trolley pole on the roof** | **Reads at 1 px wide** | The only silhouette event that breaks the box against the sky, and the only mark that says *tram* rather than *bus*. Same principle as the piñata's rope — *"the rope is the whole read"*, `engine.js:1033` |
| Dark roof cap | Reads, as the band's top edge | Cream between two darks is the sandwich that survives averaging |
| Dark skirt / wheel line | Reads, as contact | Plants it on the rail; without it the car hovers |
| One warm headlamp at the leading end | Reads as one dot | Keep the centre lamp; the photograph's three-a-side become one blur |
| Body hue (guinda, verde, azul) | Reads as a mass, hue only | Must be the saturated **dark**; Meridian Street's road and facades are mid-value |
| Gold lining / pinstripe | **Invisible** | Sub-pixel, and it sits between two darks — the first thing any resize eats |
| Ornate panel scrollwork | **Invisible** | Becomes noise inside the body mass |
| Brass lamp rims | **Invisible as rings** | A 2 px ring becomes one warm dot; draw the dot, skip the ring |
| Fender | **Invisible** | Dark shape under a dark shape |
| Open side doors | **Invisible** | A gap in a dark mass is not a gap |
| Destination board / interior / driver's uniform colour | **Invisible** | And the fleet number is already refused by A13 |
| A second body tone within ~Δ40 | **Invisible — and it is what ships today** | |

**The ONE default livery, using only colours this project already owns:**

> Body stays `#B0563A`. Roof and skirt stay `#8E4230`. **Add the one thing missing: a continuous cream `#F2E8D8` band at window height, running the full length, with the existing `#D8E6F0` glazing sitting inside it.**

`#F2E8D8` is already the bakery's cream (`content/meridian/art.js:133`). Band 233 against body 110 is **Δ123** — the photograph's read, exactly. And note the pleasing symmetry with §A: the band cream (233) and the glass (227) are **Δ6**, the same near-identity that ruined the skull — and here it is *correct*, because at five pixels you want one cream stripe, and up close the glass is a little cooler than its frames. Two creams touching is a fault when they are two different objects and a feature when they are one.

**Then the rule that makes customisation safe, and it is the only thing I would insist on for Rigo and Beto:** customisation picks **hues, never the value structure.** The engine enforces `|luma(band) − luma(body)| ≥ 90` and `luma(roof) ≤ luma(body)`; the pack (and the player, at Taller Herrera) picks which cream and which maroon. That is the RULE/CHOICE split `CLAUDE.md` asks for, and it is the `WEAR` shape — items as data, drawn by an accessory pass. Without it, the first thing a player does is paint the band maroon and lose the vehicle, and the second thing he does is report that the tram is hard to see.

**One engineering steer, paid for by §A today:** the tram is drawn **twice** and the two have already drifted — 2D has a gold `#E0A430` trim bar (`engine.js:1540`) that 3D has never had, 2D has two wheels and 3D four, 3D has end glazing and 2D none. A livery must be **one table both drawings read**, or it becomes the sill halo: right in one camera, missing in the one he actually plays.

---

## QUESTIONS FOR THE OWNER

1. **Which camera is your screenshot?** The brief describes it as *"Meridian Street in the FRONT camera at night"* — but in the front camera the code paints the sill assembly in the ground pass (`engine/engine.js:1946`) and then covers it with an opaque facade in the depth pass (`:1961`, painted at `:2016`; `TILEDRAW["B"]` fills the tile solid at `:835`), so **no skull can appear there at all**. If you can see three of them, you were in the 3D camera, which is the pack default. Both sides cited; I did not pick one. Either way **the front camera is broken for every sill prop and I would take that as a separate ticket** — it is the same defect `docs/ARCH-LOG.md:556` names for the tram, on the same line of code.
2. **Two floors — you asked "could make murals way cool".** Not mine to answer (it is a story and parcel call), but one readability fact for whoever does: a mural upstairs is only ever seen from the camera's low angle, so it is read at a steep rake and roughly half its painted height arrives. That does not kill it; it means the panel wants big flat shapes and no fine lining — the same sentence as the tram's gold pinstripe.

---

## WHAT I DID NOT CHECK

- **I did not render anything.** No shell in this run, so there is no mock, no before/after, and no screenshot. Everything above is derived from the drawing code. `docs/POSTMORTEM.md` §2 and §12 both say this is the instrument that has found every 3D fault here and reasoning is the one that has missed them — so **do not build on my numbers until the shot exists.** The recipe: copy `test/shots.js`, spot `{w:"st", x:5, y:2, cam:"3d", yaw:0}`, season forced to the fiesta the way `test/smoke.js:4164` does it, hero moved out of his own shot; take "after" by editing **only** `drawCalaverita`, per §5 — nothing else moves.
- I did not open the owner's screenshot; I worked from the brief's description of it.
- I did not verify that the two duplicated blocks at `engine/engine.js:1081-1122` and `:1185-1226` are byte-identical — I read them and they match line for line, but I could not diff them.
- I did not check the iso or top cameras for the same overpaint fault as the front camera, and I did not check El Changarrito's `st`, whose skulls sit on different glyphs (`changarrito/content/config.js:62`).
- I did not measure the papel picado's delivered size to prove my claim that it out-reads the sill; I took it from the two shipped comments that assert it.
- I did not read `docs/IDEAS.md` §15 this run — my persona requires it before speaking about the renderer, and I traded it for the code reads. Anything above about the renderer may therefore repeat a known finding there; flag me if so.

---

## POST-FLIGHT

The finding I did not expect was that the skulls have **won** the contrast fight — by about 185 points of 255 — and that five fixes in a row have kept buying more of the thing that was already surplus. The one that cost real time to find was the arithmetic on two hex constants written five days apart by two different fixes, `#F6F2E8` and `#F7F2E2`, which differ by four tenths of a point, because nothing in this repository ever asks whether an object and the shelf it stands on are the same colour. I could not render, and I have said so at the top and at the bottom rather than letting good arithmetic pass for a picture. The persona edit I propose, from that exact moment in this run:

> **Check the object against the thing it STANDS ON, not only against the wall behind it.** The sweet's `#F6F2E8` (`drawCalaverita`) and the ledge's `#F7F2E2` (`drawSillLedge`) were chosen five days apart by two different fixes and differ by **0.4 of 255** — so the fix that finally gave the skull a shelf also gave it camouflage, and the owner's next word was not "hidden" but *"arrows having to point them out"*. Before you approve any prop that sits on, hangs from or leans against another, take the luma of both hexes and say the difference out loud. **Under about 40 they are one mass, and one mass needs an arrow.**

---

## MURAL PANEL

```
MURAL PANEL
id:     pili-el-muestrario-de-cremas
by:     "pili"
title:  {en:"The cream sample card", es:"El muestrario de cremas"}
said:   {en:"The sweet and the shelf are the same white. That is not a small skull — it is no skull.",
         es:"El dulce y la repisa son el mismo blanco. No es una calaverita chica — no es calaverita."}
state:  {en:"holding that at five pixels a face is holes, not paint",
         es:"sosteniendo que a cinco píxeles una cara son huecos, no pintura"}
who:    {en:"Pili, la piñatera, who is asked whether anyone can tell what they are looking at",
         es:"Pili, la piñatera, a quien le preguntan si alguien sabe qué está viendo"}
cap:    {en:"Five fixes in five days: four were a size and the fifth was a shelf. Nobody ever laid the two creams side by side — they were chosen days apart by different hands and they differ by less than half a point of grey out of two hundred and fifty-five, so the sweet and the ledge it stands on are one pale lump on a wall, and a lump reads as masonry. The sixth is not more light. It is taking marks out, because twelve marks in six inks inside twelve pixels is mush, and a face at that size is two holes.",
         es:"Cinco arreglos en cinco días: cuatro fueron un tamaño y el quinto fue una repisa. Nadie puso los dos cremas juntos — se escogieron con días de diferencia, por manos distintas, y se llevan menos de medio punto de gris de doscientos cincuenta y cinco, así que el dulce y la repisa son un solo bulto pálido en el muro, y un bulto se lee como albañilería. El sexto no es más luz. Es quitar marcas, porque doce marcas en seis tintas dentro de doce píxeles son atole, y una cara de ese tamaño son dos huecos."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* PILI'S HAND, second visit: not the rope this time — EL MUESTRARIO, the strip of newsprint a
     piñatera pins her crepe samples to before she cuts anything. Periódico y papel de china, the
     same materials as my first panel, a different object entirely. Newsprint: tiny grey type lines,
     never letters. The tabs hang and curl; two of them are the two creams of this report and they
     are pinned edge to edge on purpose, because the whole finding is that you cannot see the seam. */
  const px=W*0.05,py=H*0.12,pw=W*0.62,ph=H*0.20;
  g.fillStyle="#CFC6B0";g.fillRect(px,py,pw,ph);                                   /* el periódico */
  g.globalAlpha=.35;g.fillStyle=P.ink;
  for(let i=0;i<7;i++)g.fillRect(px+7,py+6+i*((ph-12)/7),pw-14-((i*37)%23),1.2);    /* type, never letters */
  g.globalAlpha=1;
  g.fillStyle=P.shade;g.fillRect(px,py+ph,pw,3);
  /* six tabs of papel de china hanging off the card. The first two are the report. */
  const tabs=["#F6F2E8","#F7F2E2","#E8478F","#2FA5A0","#F2B705","#7B4BA8"];
  const tw=pw/8,ty=py+ph+3;
  tabs.forEach((c,i)=>{const tx=px+8+i*(tw*1.12);
    g.fillStyle=c;g.fillRect(tx,ty,tw,H*0.17);
    g.globalAlpha=.22;g.fillStyle=P.ink;g.fillRect(tx,ty+H*0.17-3,tw,3);g.globalAlpha=1;   /* the curl */
    g.fillStyle=P.ink;g.fillRect(tx+tw*0.45,ty-4,2,5);});                                   /* the pin */
  /* the seam that is not there: one hairline where the two creams meet, and it does not show */
  g.fillStyle=P.ink;g.globalAlpha=.10;g.fillRect(px+8+tw*1.12-1,ty,1,H*0.17);g.globalAlpha=1;
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("242.0",px+6,ty+H*0.17+14);g.fillText("241.6",px+6+tw*1.12,ty+H*0.17+14);
  g.font="bold 12px ui-monospace,monospace";g.fillStyle=P.rust;
  g.fillText("\u0394 0.4",px+6,ty+H*0.17+30);
  /* the history, in pencil, struck through — four sizes and a shelf */
  g.font="10px ui-monospace,monospace";g.globalAlpha=.6;g.fillStyle=P.ink;
  const hx=px+W*0.20,hy=ty+H*0.17+30;
  g.fillText("8  \u00b7  5  \u00b7  7  \u00b7  luz  \u00b7  repisa",hx,hy);
  g.strokeStyle=P.ink;g.lineWidth=1;g.beginPath();g.moveTo(hx-2,hy-3);g.lineTo(hx+W*0.30,hy-3);g.stroke();
  g.globalAlpha=1;
  /* THE OBJECT, at the right, at the size it is actually delivered: gold pane, and one pale lump
     that is a sweet and a ledge and reads as neither. Then his three arrows, in marker, over it. */
  const ox=W*0.74,oy=H*0.22,ow=W*0.16,oh=H*0.30;
  g.fillStyle="#5C4A50";g.fillRect(ox-8,oy-8,ow+16,oh+22);                          /* el muro morado */
  const gr=g.createLinearGradient(0,oy,0,oy+oh);
  gr.addColorStop(0,"#F2B705");gr.addColorStop(.55,"#E8873A");gr.addColorStop(1,"#8A3F1E");
  g.fillStyle=gr;g.fillRect(ox,oy,ow,oh);                                           /* el vidrio */
  g.fillStyle="#F6F2E8";g.fillRect(ox+ow*0.19,oy+oh*0.22,ow*0.62,oh*0.78);          /* el dulce */
  g.fillStyle="#F7F2E2";g.fillRect(ox-4,oy+oh,ow+8,H*0.045);                        /* la repisa */
  g.fillStyle="#8A7F66";g.fillRect(ox-4,oy+oh+H*0.045,ow+8,2);
  g.globalAlpha=.42;g.fillStyle="#100C16";g.fillRect(ox-3,oy+oh+H*0.045+2,ow+6,4);g.globalAlpha=1;
  /* sus tres flechas rojas — when the customer has to point, the pi\u00f1ata failed */
  g.strokeStyle="#D9342B";g.fillStyle="#D9342B";g.lineWidth=3;
  [[-0.9,-0.55],[-0.55,-0.95],[0.55,-0.75]].forEach(a=>{
    const tx=ox+ow*0.5,ty2=oy+oh*0.55,sx=tx+a[0]*W*0.16,sy=ty2+a[1]*H*0.30;
    g.beginPath();g.moveTo(sx,sy);g.lineTo(tx+a[0]*18,ty2+a[1]*18);g.stroke();
    g.beginPath();g.moveTo(tx+a[0]*10,ty2+a[1]*10);
    g.lineTo(tx+a[0]*24-a[1]*7,ty2+a[1]*24+a[0]*7);
    g.lineTo(tx+a[0]*24+a[1]*7,ty2+a[1]*24-a[0]*7);g.closePath();g.fill();});
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("el cliente se\u00f1ala",ox-14,oy+oh+H*0.12);}
```


---

# tavo

PRE-FLIGHT

I intended to read the two named registers, then answer the livery question against the code rather than against my own last note, because my persona says in as many words that a note I wrote is evidence and not a conclusion. Being the person whose first question is *what does this ask and what does it give back, and is that still true the tenth time* is exactly right for a cosmetic, because a cosmetic's whole cost is the walk you take to change it. Where I expected to fall short: I have an on-file habit of answering a "make it realistic" ask with a refusal dressed as rigour, and the owner has now asked about this vehicle four times — so I expected to have to hunt for the version that costs the player nothing before I was allowed an opinion.

---

THE DELIVERABLE

**First, a correction to my own file, because it changes an argument I have made twice.** My persona says `TRO_SPEED` is 3.4 and the tram is "18% slower than walking". **It is 6.0.** `engine/engine.js:1322` (`const TRO_EVERY=19000,TRO_SPEED=6.0,…`), changed on the owner's word — the comment above it at `:1309-1310` quotes him (*"ok tram can be faster"*) and even quotes my own number back at me. Walking is `mt+=dt/240` (`engine/engine.js:3321`) = 4.17 tiles/s. **The tram is now 44% faster than legs, not 18% slower.** It is transport now. That kills my standing line that the ride "teaches nothing a player will derive" — a player *will* derive "the tram beats walking the long street", and a livery therefore rides on an object people actually use, not on scenery.

**Is tram customisation worth a player's attention? Yes — but not the version that was asked for, and not yet.**

**What the loop asks.** Open a panel, tap a chip, close. Three seconds. The presses are not the cost. The cost is the two walks: to Taller Herrera (door at `st` (23,13) — `TALLER` in `content/meridian/maps.js:206-208`, doorstep `content/meridian/config.js:68` `{x:23,y:12}`) and then to the only stop on that line, at (0,1) (`content/meridian/maps.js:286`) — twenty-three tiles the other way — and then up to 19 s of waiting (`TRO_EVERY=19000`, `engine/engine.js:1322`) to find out what you picked.

**What it gives back.** Two real things. (1) The town becomes yours somewhere you did not make it yours — the dog, the cat and your own outfit are already yours; the tram is public infrastructure, and being allowed to paint it says *the barrio let me*, which is the north star stated as an object. (2) A reason to keep looking at a repeating ambient thing on the fiftieth pass. You look to check. Nothing else in this game does that. And one fake thing: "expression". Five swatches on a fourteen-line sprite (`drawTram`, `engine/engine.js:1535-1548`) is a hue slider, not expression, and that is where this dies if built wrong.

**What it teaches, including by accident.** On purpose, nothing — and that is allowed once, with the fence written when it is built. **But be honest about the precedent price: this would be the second purely-pleasant exception on the same vehicle in three days** (trolley boarding was the first). Two exceptions on one object stops being an exception and becomes "the tram is where we put nice things", which is what the next agent will cite. By accident, if built as a free colour grid, it teaches *the town's shared surfaces are mine to restyle* — which is fine for a tram and wrong for the district panels, whose colour **already means something**: `content/meridian/maps.js:311-312`, "the colour brightens with the grade". A player who learns "I can recolour things" will walk up to a report card and try. And if it were ever gated on correctness it would teach that right answers buy cosmetics, which the wardrobe precedent explicitly forbids — `content/meridian/config.js:108-109` ("any attempt at this quest opens the wardrobe — the extra, not the quest") and `engine/engine.js:4140` `done.has(wq)||qa[wq]!==undefined`. **Attempt-gated, never grade-gated.**

**The tenth time.** The *choosing* does not survive it — nobody opens a colour panel ten times, and it does not need to. The *seeing* survives indefinitely, but only if the car is worth a glance. A livery on the tram we currently draw is lipstick on five `fillRect`s. **This is why the order matters more than the feature.**

**The one thing that makes it charming once and tedious by the third: making the player go to the taller to change it.** That is R9 busywork verbatim (`docs/GENRE-RULES.md:106-109` — *could this be skipped with no loss?*). The wardrobe already solved it and the solution is in the code: the fitting-room NPC is a *second* door (`engine/engine.js:3690`), and the panel's real home is the gear menu once unlocked (`engine/engine.js:4142`). **Unlock at the shop; live in the menu.** The close second-worst version is a panel that does not draw the car: `wdDraw()` (`engine/engine.js:4841-4846`) renders the pet into a 66×44 canvas so you never have to go find him. `drawTram(g,sx,sy,front)` already takes its context as an argument (`engine/engine.js:1535`, called with `ctx` at `:1551`), so the preview is nearly free — and without it every change costs a 19-second wait and the player stops after two.

**Where the unlock belongs: quest 28, "The sound."** Ranked reasons:

1. **The trolley is already in that quest's first line.** *"Corolla. The survey crew's, the ones laying out the trolley. Comes in with a noise."* — `content/meridian/quests.en.js:322`. The shop already does work for the people building the line. Nothing has to be invented; the reveal falls out of a sentence that already ships. The *words* are Nacho's, not mine.
2. It is **Tacho's** own quest (24, 28, 30 are his; 25/26 Moy's; 27/29/31 Yesenia's), and the owner said "at the mechanic shop" — Tacho is the mechanic.
3. **Fifth of eight, and the district opens the next one at `need:5`** (`content/meridian/config.js:239`). The extra arrives while there is still district left to play. That is when a reward is a reward.
4. **Not 31** — 31 already ends on a cosmetic: *"The shop shirts arrive that day: Tuerca on the pocket, Yesenia's idea."* (`content/meridian/quests.en.js:357`). Two cosmetic beats in one quest is one too many, and the shirt is the better of the two because it is the shop's own.
5. **Not 24** — quest 24 is the one where Tacho does not trust you (*"I told her I don't need a computer guy"*, `content/meridian/quests.en.js:272`). A man who has not said "fine" yet does not hand you the paint for the town's tram.

**How many options: three, and they are named cars, not swatches.** The owner did not send a colour, he sent a **scheme** — maroon body, cream clerestory band above the windows, gold lining, brass-rimmed lamps, a pole. A livery is several colours in the right places with a name on it. Three named schemes cost the same code as a picker and are a *decision* rather than a performance (R7, `docs/GENRE-RULES.md:92-95`); they are also the light constraint that yields instead of punishing (R3), because no combination can produce a heritage tram in lime green — and "the world stays realistic… never nonsense" is settled (`docs/OWNER.md:43-49`). Three, because one of them is the car in his photograph and two more is the fewest that makes it a choice; five means three nobody picks. There is no "none" chip — the default *is* the photograph. **What the other two are is Pili's call with Rigo on what a car of that period actually wore. I am not designing their part.** Bonus: a scheme id is an integer, so it needs no save validation — a free colour is untrusted string data reaching a canvas fill, and `engine/engine.js:462` already records that this path is not validated.

**Does it collide with A13 answer 3 ("the ride is a held beat, nothing to press")? No.** Answer 3 is scoped to *the ride* — `docs/ARCH-LOG.md:736`, "No quest node, no conversation, nothing to press". The livery is chosen when you are **not** aboard and merely *observed* when you are. It adds no verb to the beat; it gives the beat something to hold. A13's own item 2 asks for exactly this: the near side "should reward looking at it" (`docs/ARCH-LOG.md:578-581`).

**It collides with something else, and this is the real finding.** A13's build order has five items and **none is built**: the tram is still drawn as a flat layer under the actor pass (`troDraw2D` call sites, `engine/engine.js:1946`, `:2063`), there is still no near side, no 2D driver, no `rideDraw`. **A livery is legible almost entirely on the near side** — the clerestory band, the lining, the lower panel are all near-side features, and there is no near side to put them on. Building the picker first means recolouring five fills and then redrawing all of them a week later.

**RECOMMEND ONE THING.** In the sitting that draws the near side (A13 build-order item 3), do three things and stop:

1. Replace the five hardcoded fills in `drawTram` (`engine/engine.js:1537-1541`: `#B0563A`, `#8E4230`, `#D8E6F0`, `#E0A430`, `#2B2536`) and the matching materials in the 3D build (`engine/engine3d.js:631-632`, `:645`, `:662`) with **one `LIVERY` table in the engine, beside `WEAR` (`engine/engine.js:448-450`) and in exactly its shape** — named keys, three schemes, entry zero being today's colours plus the two features the photograph has and we do not: **a cream clerestory band above the windows and a gold lining under them.** Day one is byte-identical for both packs; the town declares no trolley line, so it is untouched by construction.
2. `livery` becomes one integer in the save. Unlock is `liveryQuest:28` in `content/meridian/config.js`, read the same way `wardrobeQuest` is (`engine/engine.js:4139-4140`) — **attempt-gated**.
3. The panel is the wardrobe's panel with one row of three chips and a preview canvas that calls `drawTram`. It is reached from the gear menu, and from Tacho as a second door.

**Note for whoever builds it, because nothing else in this repo will tell them:** the 3D tram's materials are constructed once inside `if(!T3.tram){…}` (`engine/engine3d.js:630`), so a runtime livery change needs `t3Invalidate()` or material handles kept on `T3` — this is the one place the change is not mechanical. And `SEASONS.art` declares no tram key today (`content/meridian/config.js:130-139`: `bridge`, `bridgeStyle`, `papel`, `papelBridge`, `sky`, `swags`), so there is no season/livery precedence question yet — **write the precedence rule into `docs/ARCH-LOG.md` when the seam lands, before a season ever declares one.**

**What I would cut.**
- The free colour picker and any per-part swatch rows. Three named cars, one row, no tabs.
- Any paint-bay scene, any tram entering the taller. It runs on rails, and A13 answer 1 signs one camera, from outside.
- Any grade gate, any unlock ladder of further liveries. R6, `docs/GENRE-RULES.md:89-90` — collection is the decoy.
- A name field or a fleet number. Signed out at `docs/ARCH-LOG.md:765-766`; a name is a fleet number with letters.
- And a thing I would cut from the schedule, not the feature: **if only one tram ticket fits this week, the second stop outranks the livery.** The line runs `st` x0→29 with one stop, at (0,1) (`content/meridian/maps.js:286`). Tacho's door is at x23. The livery is pleasure; a stop at the east end is the convenience the owner already settled as the point (`docs/OWNER.md:36-42`).

**One contradiction I resolved by checking, so nobody re-opens it.** `docs/ASKS.md:157` says the dog comes "through the trolley too", which reads as though A13 answer 4 (the dog as second passenger) is already built. It is not. `rideEnd` calls `worldArrived(RIDE.fromW,…)` (`engine/engine.js:1534`) which calls `dogsFollow` (`:3292`) — **he re-appears at the far end, he does not ride.** Both statements are true about different things. The pivot is still unbuilt.

---

QUESTIONS FOR THE OWNER

**One, and it forks the build rather than the wording.** You said *"maybe at the mechanic shop"*. Two readings, and they cost very differently:

- **(A) The shop is the fiction only.** Tacho hands you the colours at quest 28; the picker then lives in the gear menu like the pets' wardrobe, and you change it anywhere. One sitting on top of the near-side work. *This is what I recommend.*
- **(B) You want to see the tram in the shop** — a bay, the car up on something, the paint happening. That is a new room and a new object, and it fights `docs/OWNER.md:43-49` ("never nonsense"): the tram cannot leave its rails to drive into a three-bay auto shop. The realistic version would be Tacho painting it at the end of the line and the new colour arriving on the next pass, which also means every change costs a wait.

Which did you mean? If you did not mean (B), I build (A) and never ask again.

---

WHAT I DID NOT CHECK

- **I rendered nothing.** Every claim about whether a cream band or gold lining will *read* at tram size is `[TRAINING]` reasoning from your photograph, not measured. Given this project's sugar-skull history, the near-side sitting must screenshot it before it is called done — and that is Pili's read, not mine.
- I did not read `docs/POSTMORTEM.md`, `docs/QA-PASS.md`, `docs/TAGS.md` or `docs/REGRESSION.md` this run. The crew-fix skill says every agent reads POSTMORTEM first; I did not, and my brief did not carry it.
- I did not check GitHub issues at all, so I do not know whether the second stop, the livery, or the A13 build order are already ticketed, or whether one of them is mid-flight on another branch.
- I inferred that `TALLER`'s tile tuples are `[y,x,glyph]` from the doorstep at (23,12) lining up with the `%` at `[13,23]`; I did not read the stamping code that consumes them.
- I took "the town declares no trolley line" from `docs/meetings/2026-09-11-la-parada.md:341`, a doc, not from `changarrito/content/` directly.
- I did not cost the EN/ES strings. Three scheme names in two languages is Paty's, and it is the only part of this that is not one sitting.

---

POST-FLIGHT

My persona got it right at the one moment that mattered: the line telling me to re-read the map rather than reuse my own note is what made me grep `TRO_SPEED` instead of quoting 3.4 again, and the constant had doubled — which overturned an argument I have now made twice in this repo. Where it was silent: it tells me to find the free version of a realism ask before arguing, but it has nothing about what to do when the owner's ask contains *two* things — art direction and a mechanic — and only one of them is the expensive one; I had to work out on my own that "fix the design further" plus a photograph is the actual deliverable and "customization abilities" is his proposed route to it. The gap I predicted — reflexively refusing a fourth realism ask — did not appear, and the reason is instructive: the shape of the answer was never *no*, it was *yes, in this order*, and I found that by reading A13's build order and noticing that nothing in it is built, which is a scheduling fact, not a design one. The edit I propose:

> **Replace, in "Check your own last note before you reuse it":** the sentence *"The ride is 18% slower than walking — 240 ms/tile on foot (`engine/engine.js:2886`) against `TRO_SPEED` 3.4 (`:1150`) — so it cannot be transport and teaches nothing a player will derive."*
>
> **With:** *"**That number is now wrong too, and I painted it on a wall.** `TRO_SPEED` is 6.0 (grep it, do not paste a line number) against 240 ms/tile on foot (grep `mt+=dt/`), so the tram is ~44% FASTER than legs — it is transport, and the owner changed it the same day I filed the finding. My mural panel `tavo-mas-lento-que-caminar` still says 18% slower and the ledger will not let it be rewritten. **A finding with a number in it has a shelf life measured in hours here. Re-grep the constant every single time, especially when the number is mine.**"*

---

MURAL PANEL

```
id:     tavo-encima-de-mis-palabras
by:     "tavo"
iter:   2
date:   "2026-09-13"
title:  {en:"Over my own words", es:"Encima de mis propias palabras"}
said:   {en:"I painted \u201C18% slower than walking\u201D on this wall. By that evening the constant was 6.0. The tram can be repainted. A panel cannot.",
         es:"Pint\u00E9 \u00AB18% m\u00E1s lento que caminar\u00BB en esta pared. Esa misma tarde la constante ya era 6.0. Al tranv\u00EDa se le puede dar otra mano. A un panel no."}
state:  {en:"Painting the car he photographed before building the picker he asked for \u2014 a colour is not worth choosing until the thing wearing it is worth looking at.",
         es:"Pintando el carro que fotografi\u00F3 antes de construir el selector que pidi\u00F3 \u2014 un color no vale la pena elegirlo hasta que la cosa que lo lleva valga la pena mirarla."}
who:    {en:"Tavo, who found his own panel out of date and left it up",
         es:"Tavo, que hall\u00F3 su propio panel caducado y lo dej\u00F3 puesto"}
cap:    {en:"He came back to the trolley with a number he was proud of and checked it anyway, out of habit. It had been overtaken hours after he wrote it, by the owner, who simply wanted the thing to go faster. So the first card on the rail is the one he can still paint, and the scrap underneath is the one he cannot \u2014 which is the whole argument for grepping the constant instead of quoting yourself.",
         es:"Volvi\u00F3 al trolley con un n\u00FAmero del que estaba orgulloso y aun as\u00ED lo verific\u00F3, por costumbre. Lo hab\u00EDan rebasado a las pocas horas de escribirlo, el due\u00F1o, que nada m\u00E1s quer\u00EDa que la cosa fuera m\u00E1s r\u00E1pida. Por eso la primera tarjeta del riel es la que todav\u00EDa puede pintar, y el recorte de abajo es la que ya no \u2014 que es todo el argumento para buscar la constante en vez de citarse a uno mismo."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* TAVO'S PAPER IS A SAMPLE CARD. Not a blueprint, not a signwriter's board \u2014 the chip you hold
     up against the real thing and squint at. Four cards on a rail: one painted, three left for
     the person whose job it is. And pinned under them, the scrap he is not allowed to correct. */
  const car=(x,y,w,h,body,band,trim,blank)=>{
    g.fillStyle=P.shade;g.fillRect(x+2,y+h*0.96,w-4,2);
    if(blank){ g.strokeStyle=P.shade;g.lineWidth=1;g.setLineDash([3,3]);
      g.strokeRect(x+.5,y+h*0.10+.5,w-1,h*0.78);g.setLineDash([]); return; }
    g.fillStyle=body;g.fillRect(x,y+h*0.28,w,h*0.60);          /* the lower body */
    g.fillStyle=band;g.fillRect(x,y+h*0.10,w,h*0.18);          /* the clerestory band \u2014 his photograph's cream */
    g.fillStyle=trim;g.fillRect(x,y+h*0.06,w,h*0.05);          /* roof edge */
    g.fillStyle=trim;g.fillRect(x,y+h*0.845,w,h*0.045);        /* the gold lining under the glass */
    g.fillStyle=P.bone;
    for(let i=0;i<3;i++)g.fillRect(x+4+i*((w-8)/3),y+h*0.36,(w-8)/3-3,h*0.24);
    g.fillStyle=P.ink;[0.24,0.76].forEach(t=>g.fillRect(x+w*t-2,y+h*0.89,5,4));
    g.fillStyle=P.ink;g.fillRect(x+w*0.52-1,y-h*0.20,2,h*0.26); /* the pole on the roof */
    g.fillStyle=trim;g.fillRect(x+w*0.52-4,y-h*0.23,8,2);};
  /* the rail the cards hang from */
  const rail=H*0.15;
  g.globalAlpha=.35;g.fillStyle=P.ink;g.fillRect(W*0.05,rail,W*0.90,2);g.globalAlpha=1;
  const n=4,gp=W*0.022,cw=(W*0.90-gp*(n-1))/n,ct=rail+H*0.11,ch=H*0.34;
  for(let i=0;i<n;i++){const x=W*0.05+i*(cw+gp);
    g.fillStyle=P.ink;g.globalAlpha=.45;g.fillRect(x+cw/2-1,rail,2,ct-rail);g.globalAlpha=1;
    g.fillStyle=P.bone;g.fillRect(x,ct,cw,ch);
    g.fillStyle=P.shade;g.fillRect(x,ct+ch,cw,2);
    car(x+cw*0.10,ct+ch*0.26,cw*0.80,ch*0.52,P.rust,P.wash,P.gold,i>0);
    g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
    g.fillStyle=i?P.shade:P.ink;
    g.fillText(i?"PILI":"LA FOTO",x+cw/2,ct+ch-6);g.textAlign="left";}
  /* THE SCRAP \u2014 his own last panel, torn out, getting a coat that does not cover it */
  const sx=W*0.05,sy=H*0.66,sw=W*0.56,sh=H*0.26;
  g.fillStyle=P.wash;g.fillRect(sx,sy,sw,sh);
  g.strokeStyle=P.shade;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,sh-1);
  for(let i=0;i<9;i++){g.fillStyle=P.wash;                    /* the torn top edge */
    g.fillRect(sx+i*(sw/9),sy-3,sw/9-2,4);}
  /* the old race, in miniature */
  g.fillStyle=P.moss;g.fillRect(sx+sw*0.60,sy+sh*0.30,5,10);
  g.fillStyle="#C08A5E";g.fillRect(sx+sw*0.60,sy+sh*0.30-6,5,6);
  g.fillStyle=P.rust;g.fillRect(sx+sw*0.16,sy+sh*0.40,sw*0.16,9);
  g.fillStyle=P.ink;g.font="bold 12px ui-monospace,monospace";
  g.fillText("18% SLOWER",sx+8,sy+sh-8);
  /* the coat of fresh maroon, brushed on, three-quarters opaque \u2014 it shows through. It always shows through */
  g.globalAlpha=.72;g.fillStyle=P.rust;
  for(let i=0;i<5;i++)g.fillRect(sx+4,sy+sh-24+i*4,sw*0.66-i*6,4);
  g.globalAlpha=1;
  /* the number that replaced it, stencilled clean, off the scrap where nothing can cover it */
  g.fillStyle=P.gold;g.font="bold 26px ui-monospace,monospace";
  g.fillText("6.0",W*0.68,sy+sh*0.62);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("grep it. every time.",W*0.68,sy+sh*0.62+15);
  /* the brush, laid across the rail, because somebody has to hold it */
  g.fillStyle=P.deep;g.fillRect(W*0.80,H*0.70,W*0.15,4);
  g.fillStyle=P.ink;g.fillRect(W*0.93,H*0.685,W*0.04,7);}
```


---

# cuca

PRE-FLIGHT — I will work this by reading the build code for both jobs before opening my own earlier doc's conclusions, because that doc left three objects uncosted and one of its claims (that height is 3D-only) is testable against `izh`. Thirty years of rooms equips me for the one question that decides Job A — *where does a person stand to use this* — which in this engine is literally `readAt(px+dx,py+dy)`, a floor-plan address with no storey in it. Where I expect to fall short: I judge by walking a room, and I have **no Bash and no Write tool in this session**, so I cannot render, and everything below is read, not seen.

---

# THE DELIVERABLE

## (A) Two visible storeys, with a mural on them

### A0 · The finding that reframes the question

**A readable thing has no height. It has a floor-plan address.** `READS` entries are `{world,x,y}` (`changarrito/content/docs.js:31-40`), resolved by `readAt=(x,y)=>RD().find(r=>r.world===world&&r.x===x&&r.y===y…)` (`engine/engine.js:3535`), called from exactly one place: `[[0,0],[0,-1],[0,1],[-1,0],[1,0]].some(([dx,dy])=>…)` (`engine/engine.js:3627`). Four orthogonal neighbours and the tile you stand on. No z, no storey, no `lift` term anywhere in the path.

Three consequences, all of them answers the brief asked for:

1. **An upper-storey mural is reachable by a person on the street — trivially, and only from the street.** "Upstairs" is a fiction of the art; the engine has one address per column. Standing at `st`(10,1) reads the wall at `st`(10,0) whether that wall is one storey or six.
2. **It is never reachable from the loft.** `f2` is a separate world behind a portal (`changarrito/content/maps.js:159-160`). A `READS` entry in `f2` is a different address in a different coordinate frame. Two worlds cannot share a wall.
3. **`readAt` is `.find` — first match wins.** Two documents cannot share a tile. A facade column cannot carry a ground-floor sign *and* an upstairs mural. That is a hard layout constraint for object 2 and nobody had written it down.

### A1 · What the four cameras do to a second storey — verified, and my own doc was half wrong

My `docs/rooms/2026-09-12-two-visible-storeys.md` says *"Two floors is a **3D-only** effect."* **That is wrong, and it is wrong in the direction that matters for a mural.** `engine/engine.js:690`:

```js
const izh=g=>IZH[g]||((TILES[g]&&TILES[g].lift)?Math.round(TILES[g].lift*1.5):14);
```

The iso camera reads `lift`. It grows. It just grows *blank* — and that is the new cost.

| Camera | Reads `lift`? | What a second storey does | What it does to the **mural** |
|---|---|---|---|
| **top** | **No.** `TILEDRAW[ch]` at 32×32, `lift` unread (`engine.js:2057`) | nothing | a two-storey drawing squashed into one tile of plan. Wrong object |
| **front** | Only as a blank band. `if(L>0&&…)ctx.fillRect(sx,sy-L,TS,L)` in `roofCol`, **no face art** (`engine.js:1966-1969`); the 32px art is drawn at its own size below it (`:1976-1977`) | on `st` row 0, `camY=Math.max(0,…)` (`engine.js:1927`) so `sy-L` is negative → **the band is clipped off the top of the canvas** | the two-storey *drawing* reads; the extra *height* does not |
| **iso** | **Yes**, `lift*1.5` px — but `isoBlock` paints flat faces and a diamond top and **never the art** (`engine.js:751`; the comment at `:754` says so in as many words) | a taller plain slab | **there is no mural in iso today.** The town declares no `MAPCOL` (grepped `changarrito/` — zero hits), so `▧` falls to `ISOCOL[gch]||…||C.wall`. A second storey makes it a taller blank wall |
| **3d** | **Yes.** `wallH=0.55+lift*0.042` (`engine3d.js:274`); `lift:30`→1.81 | the only camera where it is a building | **this is where the mural is taken away.** See below |

**The 3D cost, exactly.** `t3Hides(h,d){return h>0.65*d+0.3;}` (`engine3d.js:887`). At today's `lift:13` (h=1.10) the wall is a hider within **d<1.23**; at `lift:30` (h=1.81) within **d<2.32**. The cutaway replaces it with `new THREE.BoxGeometry(g.width||1,T3STUB,g.depth||1)` wearing `Array.isArray(m)?m[2]:m` — **the box's TOP material, not its face** (`engine3d.js:933-934`), `T3STUB=0.28` (`:880`).

So: **the stub is what eats the painting.** Today you already lose the mural standing on the reading tile (d≈1.0, `1.10>0.95`), but you can step back to `st` row 2 and see the whole wall. At two storeys, `1.81>0.65·2+0.3=1.60` — **the wall is stubbed from two tiles back as well.** The one distance at which the mural currently works is the one a second storey removes. The owner's own design note for `▧` is *"you see tiles/icons from afar but you get close and can interact"* (`changarrito/content/art.js:19-20`). A second storey deletes the "from afar".

### A2 · The three objects, costed with a mural on the upper storey

| | What it is | Build | What the mural gets | Verdict |
|---|---|---|---|---|
| **1 · a picture upstairs** | one new pack glyph, `TILEMETA[g]={lift:~30,kind:"facade"}`, `TILEART[g]` drawing ground band + floor line + upper windows inside its own 32×32, `TILEART_SIDE[g]`, `+SOLIDX`. Content only, no engine change, no `GAMEV`/`CACHE` | 1 sitting of art, 1 of camera fallout | one 32px bake stretched over 1.81 units ≈ **16 baked px a storey**; invisible in iso; stubbed from 2 tiles back in 3D | **the mural argues against it** |
| **2 · the loft joined to the facade** | not a rendering job. `f2` is 20×17, `st` is 30 wide, `hq`'s door is `st`(14,0); there is no shared frame and nothing in the engine relates two worlds' tiles. A hand-maintained coordinate promise with no guard | ≥1 sitting to decide, then forever | nothing. And `readAt`'s `.find` (`engine.js:3535`) forbids a second document on the same column | **do not open it**; it is an `ARCH-LOG` decision, not a sitting |
| **3 · a room upstairs** | **already shipped**, both packs (`changarrito/content/maps.js:35-51`, `content/meridian/maps.js:31-47`) | 0 | nothing | closed |

### A3 · Where object 1 would stand — and it has nowhere

My own doc set the constraint: *"3+ tiles, no door in it or beside it, north rank."* The "beside it" now has a line. `engine3d.js:298-302`:

```js
const nbG=[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].map(…).find(c=>c&&TILES[c]&&(TILES[c].kind==="wall"||TILES[c].kind==="facade"));
if(nbG&&wallH(nbG)>1){const lin=new THREE.Mesh(new THREE.BoxGeometry(1,h-1,1),[wm.side,wm.side,wm.top,wm.side,wm.side,wm.side]);
```

The search takes **west first** and the lintel is **all side colour, no face art**. So any tile that is a door's west neighbour must not go two-storey, or it hangs an 0.81-tall blank block over that door.

`st` row 0 (`changarrito/content/maps.js:52`): `BBQQ$QQBBv▧B▧▧E▧ZZZOZZIII%IIB2`. Doors at x4 `$`, x14 `E`, x19 `O`, x25 `%`, x29 `2`; `v` at x9 is la ventanilla (`win:"B"`, and her roof strip is `h-1` deep, `engine3d.js:335`). Forbidden west-neighbours: **x3, x13, x18, x24, x28**. Note **x13 is a mural tile** — making it two-storey hangs a blank block over city hall's own door.

Walking every 3-tile run on row 0 against that: **exactly one qualifies — x0,1,2 — and x0,1 is the hoarding reserved for block two** (`changarrito/content/maps.js:12`, `:197`). Two-tile runs: **x16,17 is the only clean one.**

> **Object 1, as specified, has no parcel on today's street.** Don Güero either relaxes to a 2-tile run at x16–17, or it waits for block two.

### A4 · What I recommend, and what it costs

**Neither storey. The mural already has storeys — in the document.**

`changarrito/content/murals.js:1505-1508`:
```js
function murWallSize(list){const bays=murBays(list);
  const deep=bays.reduce((m,b)=>Math.max(m,b.panels.length),1);
  const tall=deep*murCourse()+MURSKY+MURDADO+18;
```
One course per visit, stacked upward — the owner's own caption: *"a stretch never gets wider — it gets taller"* (`changarrito/content/docs.js:83`). The thing he wants ("could make murals way cool") is **already the wall's growth axis**. What the street lacks is not a second storey; it is a **tile that says the painting goes up**.

**Recommended: one sitting.** Repaint `TILEART["▧"]` (`changarrito/content/art.js:24-33`) so the limewash reads as a *tall* wall rather than a two-storey *building* — raise the horizon band, keep the dado at `sy+TS-3`, put a second, smaller register of paint above the red tram band. `lift` stays 13. No new glyph, no `SOLIDX`, no map change, no `GAMEV`/`CACHE`, and **every camera keeps what it has today** because nothing about the height moved. Pili checks it reads at phone width; Chava walks up cold and says whether it looks pressable.

**If he takes the real second storey anyway: two sittings, and they are not interchangeable.** Sitting 1 — Don Güero's parcel (x16,17 or block two), the new glyph, its art, `SOLIDX`, and a four-camera sweep with `test/shots.js --cams`. Sitting 2 — the iso hole, which is an **engine** question (`isoBlock` never draws a face) and therefore Beto's, not art. **Do not promise the mural on the upper storey in sitting 1.**

---

## (B) The one-sided rail, as a class

### B1 · It is not the 2D art, not the 3D box, and not the camera. It is the map — and he is looking at a different staircase.

The report says "the loft stair"; **the loft's well is fine.** Its nine rail panels all build:

`engine3d.js:444-448` — `wl=(ax,ay)=>…wellDepth(w,ax,ay)>0`, and for `f2` rows 13/14/15 (`changarrito/content/maps.js:48-50`) every one of the nine `◺` tiles has a well tile on exactly one orthogonal side, so every one gets its panel. `test/town.smoke.js:260-265` counts them and is green.

**The picture is `hq`, the climb.** `changarrito/content/maps.js` hq y13–15, byte-identical in `content/meridian/maps.js:17-19`:

```
y13  ##########+⊓⊓⊓⊓#####      the stair mass — kind "wall", full wall height
y14  #..........≡≡≡▲#####      three treads and the head
y15  #..................#      open lobby floor. NOTHING.
```

Four treads (`test/town.smoke.js:275-276` asserts exactly four rising boxes). **The dark square at the head is `▲`**, `BASECOL["▲"]="#241F2E"` (`engine.js:4766`), baked as the box lid at `engine3d.js:345`; `▲` exists only in `hq` (`test/smoke.js:3638`, `wantIn {'▲':'hq'}`). `f2`'s `▼` is a **light** landing, `#C6BEAA` (`engine.js:1757`). And in `f2` he would see rails on three sides, not one.

**So the one rail he sees is the `⊓` mass, and there is no rail on the south side because nobody ever wrote one into the map.** It is an omission with a reason on the record, not a decision: `docs/meetings/2026-09-06-la-caja-de-escalera.md:22-25` drew these exact three rows and gave `◺` to `f2` only; candidate C was rejected partly because *"the lower flight has nothing solid north of it"* (`:33-34`) — solid-on-one-side was treated as sufficient downstairs.

### B2 · The class, and where it actually lives

**The class: geometry that closes a run on one side and is silently absent on the other.** In this codebase it has **three separate homes**, and a guard that reads one will not read the others.

| # | Where | Line | Status |
|---|---|---|---|
| **C1** | **the map** — a walkable run with a guard on one long side and open floor on the other | `hq` y13–15, **both packs** | **live, and it is the owner's screenshot** |
| **C2** | **the 3D build** — one panel per rail tile, chosen by a chained ternary: `const lip=wl(x,y+1)?…:wl(x,y-1)?…:wl(x+1,y)?…:wl(x-1,y)?…:null;` (`engine3d.js:445`). A rail tile with wells on **two** sides gets **one** | `f2`'s corners at (10,13)/(10,15) are one map edit from it | **latent** |
| **C3** | **the 2D front camera** — fence end-posts are tested in **X only**, no Y test at all: `if(x===0\|\|w.grid[y][x-1]!==gch)post(…); if(x===w.W-1\|\|w.grid[y][x+1]!==gch)post(…)` (`engine.js:1982-1983`). A north-south run gets a post on **every** tile; the single west rail at `f2`(9,14) gets **two** and reads as a gate | `f2` | **live in `front`, unreported** |

**Two things the brief listed that are NOT in the class, and must be excluded or the guard condemns correct work:**

- **Counters.** `piece(0.46,0.16,0.42,0.23,"counter")` (`engine3d.js:334`) builds one piece at `+off` on the street side only. A counter *has* a front and a back. **Correctly one-sided.**
- **Bridges.** `[-1,1].forEach(sd=>{…})` with an independent `isB` test per side (`engine3d.js:387-396`). **This one is built right and is the reference implementation** — the shape C2 should be rewritten into.

### B3 · The guard, for Lupe — two of them, because the fault has two homes

**The noun.** Not "does it have a rail" (a proxy — the `⊓` mass is not a rail and it is what he saw). Not "can you fall" (this engine has no fall; stepping off just re-levels you). The noun is: **a run you walk along whose two long sides are treated differently.**

> **G-RAIL-1 — the map.** For every world in both packs, find every run of walkable elevated tiles (`stairRun(w,x,y)` non-null, or `wellDepth(w,x,y)>0` — `engine.js:1715,1721`). For each run take its two long sides. A side is **closed** if every tile along it is `SOLID`/`SOLIDX` or a rail glyph. **Fail if exactly one side is closed.**
>
> What a person would say when it fails:
> *"The flight in the stall has a wall down its north side and nothing down its south — one side of the stairs is closed and the other is open (hq, row 14, x11–14)."*

**It is red on unchanged code, on the exact thing he photographed, in both packs.** That is the strongest red-before-green this board has had; nothing needs planting to see it fail the first time.

**Melo's plants, to prove it is not vacuous:**
- delete one `◺` from `f2` row 13 → must also fire on the loft (`test/town.smoke.js:238` already pins those rows, so it should double-fire);
- close `hq` y15 x11–14 → must go silent;
- make **both** sides open (delete the `⊓` run) → must **stay silent**, because a flight open on both sides is a ramp, not a one-sided rail. If it fires there, the guard is reading "has a rail", not "one side".

> **G-RAIL-2 — the build.** In 3D, after `draw3d()`, for each elevated run collect `T3.group.children` whose `userData.fence` or `userData.wall` sits on a tile orthogonally adjacent to the run, and split them by side. **Fail if one side has pieces and the other has zero while the map says both sides are closed.**
>
> *"Both sides of the well are railed on the map and only one side got built."*

Needed separately because the map can be symmetric and `engine3d.js:445` still build one panel. **Melo's plant:** in a scratch copy change `:wl(x-1,y)?[-0.44,0,Math.PI/2]:null` to `:null`; the west rail at `f2`(9,14) must vanish and the guard must print. (`test/town.smoke.js:263-264` checks that one panel's *rotation* — it would survive the panel being absent only if `find` returns undefined, which it also catches; confirm the two do not mask each other.)

**C3 is a third, smaller guard and I would file it rather than bundle it:** in `front`, a fence run's posts must appear at the ends of the run *in the direction the run goes*, not always in X.

### B4 · The tile plan for the fix — and it has a trap

The rail in `hq` goes on **row 15, x11–x14**, the flight's open south side. But row 15 is the lobby, walkable x1–x18, and `#` walls it at x0/x19 with row 16 solid except `E` at x10. **Putting `◺` at x11–14 orphans (15,15)–(18,15): four tiles reachable from nowhere.** That is precisely the reach fault Lupe already has open (`docs/NEXT-SESSION.md`, "Found, not fixed").

```
                 x: 0    5    10   15
  y13  ##########+⊓⊓⊓⊓#####     mass, north side — unchanged
  y14  #..........≡≡≡▲#####     landing (10,14) · treads 11–13 · head (14,14)
  y15  #..........◺◺◺◺#####     ← rail x11–14, AND x15–18 become wall
  y16  ##########E#########     front door (10,16)
```

The lobby is then x1–x10, ten tiles, front door opening straight into it, stair hall enclosed on three sides: mass north, rail south, wall east. Way out visible from every tile in it. x15–18 of row 15 is empty in both packs today and nothing stands there.

**Handoffs:** Don Güero owns whether row 15 may lose four tiles in both games. Pili owns whether `TILESIDE["◺"]` (`engine.js:1762-1764`, knee-high, see-through) reads against the `⊓` mass rather than disappearing into it. Lupe owns G-RAIL-1 and G-RAIL-2; Melo owns the three plants. `test/smoke.js` shot `44-hq-stairs` and `test/spots.json` `10-f2-stairs-3d` / `12-f2-stairs-top` pin this geometry — red first.

**Which camera did I check it from: none.** See below.

---

## QUESTIONS FOR THE OWNER

**One, and it is the whole of Job A.** *"we sure about 2 floors? could make murals way cool"* can mean two different builds, and they pull opposite ways:

- **Side 1 — make the mural bigger.** The mural is a document, and the document already grows upward, one course per visit: `tall=deep*murCourse()+MURSKY+MURDADO+18` (`changarrito/content/murals.js:1507`), your own caption *"a stretch never gets wider — it gets taller"* (`changarrito/content/docs.js:83`). This costs **one sitting of paint** and takes nothing away.
- **Side 2 — make the building taller on the street.** That raises `lift` on the facade, and `t3Hides(h,d){return h>0.65*d+0.3;}` (`engine/engine3d.js:887`) then stubs the wall from **two tiles back** instead of one — and the stub wears the box's *top* material, not its face (`engine3d.js:933-934`), so **the painting is the part that disappears.** In the iso camera it was never drawn at all (`engine.js:751`, comment `:754`). Your own rule for `▧` was *"you see tiles/icons from afar but you get close"* (`changarrito/content/art.js:19-20`) — a second storey removes the "from afar".

**What I need from you: taller wall inside the document, or taller building on the street?** I recommend the first and I have not built either.

*(A second thing, not a question because the code settles it: the screenshot you sent is the stall's climbing flight in `hq`, not the loft's well. The dark square at the head is `▲`, which exists only downstairs. The well upstairs is railed on three sides and a check counts all nine panels.)*

---

## WHAT I DID NOT CHECK

- **I did not render anything.** This session has Read, Grep and Glob only — no Bash, no Write. Every camera claim above is read out of the build code, not seen. **Somebody must shoot it before any of it is believed:** `test/shots.js --index changarrito/index.html --cams` at `{w:"hq",x:10,y:15}` and `{w:"hq",x:12,y:15}` (the owner's view of the flight) and `{w:"f2",x:14,y:14}` (the well, to confirm nine panels *read* as three sides). `docs/POSTMORTEM.md` §2 is unambiguous that this is the only instrument that has worked.
- I did not check whether a knee-high `◺` panel is ever chosen as a cutaway hider in practice. `t3Wallish` excludes `fence` (`engine3d.js:897`) so it cannot be stubbed, but `t3Near`'s filter admits anything with `u.x!==undefined` (`:907`); at h=0.55 `t3Hides` should never fire, and I did not run it.
- I did not check `no` (Nolasco's stair room), which `test/smoke.js:3638` says also carries `≡ ▼ ◺`. G-RAIL-1 will read it; I did not read it myself.
- I did not open Meridian's `st` row 0 to see whether the public game has a qualifying doorless run. The parcel work in §A3 is the town's street only.
- I did not verify that `test/town.smoke.js:263-264` and my proposed G-RAIL-2 do not mask each other under the same plant.
- I did not price the `changarrito` `ch-v` bump for any of this; that is still an open question on `docs/OPEN.md` §1.

---

## POST-FLIGHT

**What the persona got right:** "a room is a path before it is a picture" put me on `readAt` inside the first ten minutes, and that one function — a floor-plan address with no storey in it — answered three of the brief's four questions at once and turned object 2 from "expensive" into "do not open it". **Where it got in the way:** it made me want to answer "where does the rail go" before "which staircase is he standing on", and I nearly wrote a tile plan for `f2`'s well — which is correct and guarded — because the brief said "loft stair"; the dark `▲` square caught it, not my instinct. **The gap I predicted — no render — appeared and it is the real limit on this report:** every camera claim is reasoned, none is seen, and `docs/POSTMORTEM.md` §2 is five correctly-reasoned wrong diagnoses in a row about exactly this. **The persona edit I propose:**

> **Add to `.claude/agents/cuca.md`, after "A body is not a blocker":**
>
> ## Which room is he standing in
> *Proposed iteration 6, 2026-09-13.*
>
> Before you plan a fix, **identify the room from the picture, not from the ticket.** The ticket said "the loft stair" and the well upstairs is railed on three sides with a guard that counts all nine panels (`test/town.smoke.js:260-265`); the photograph was the *other* flight, downstairs, and the tell was one pixel-fact — the dark square at the head is `▲`, `BASECOL["▲"]="#241F2E"`, and `▲` exists only in `hq` (`test/smoke.js:3638`). **A guard printing green and an owner pointing at the fault are not a contradiction: they are two different rooms.** Find the discriminator in the art before you find the fix in the map.
>
> And when you judge what a camera shows, know which cameras draw art at all: `top` ignores `lift` entirely (`engine.js:2057`), `front` adds `lift` px of plain roof colour with no face (`:1966-1969`), **`iso` grows with `lift` but `isoBlock` never draws the art** (`:751`, `:754`), and only `3d` wears the face — where `t3Hides` (`engine3d.js:887`) then takes it away again the closer you stand.

---

```
MURAL PANEL
id:     cuca-la-escalera-de-un-lado
by:     "cuca"
iter:   6
date:   2026-09-13
title:  {en:"The stair with one side", es:"La escalera de un solo lado"}
said:   {en:"The check stood upstairs counting nine rails and printed green. He was downstairs, on the flight nobody ever drew a rail for.",
         es:"La prueba se quedó arriba contando nueve barandales y dio verde. Él estaba abajo, en la escalera para la que nadie dibujó nunca un barandal."}
state:  {en:"Certain the guard is honest and pointed at the wrong staircase",
         es:"Segura de que la prueba es honrada y está apuntando a la escalera equivocada"}
who:    {en:"Doña Cuca, who keeps the rooms and the stairs", es:"Doña Cuca, la de los cuartos y las escaleras"}
cap:    {en:"The report named the loft and the loft is fine — nine panels, three sides, a check that counts every one of them. The picture he sent was the other flight, the one you climb out of the lobby: a wall along its north side because the map happens to put a wall there, and nothing at all along its south because nobody ever wrote the glyph. The tell was one pixel: the dark square at the head only exists downstairs. Thirty years letting rooms and I have never once been shown a stair railed on one side by a builder who meant it.",
         es:"El reporte nombró el desván y el desván está bien — nueve tramos, tres lados, y una prueba que los cuenta todos. La foto que mandó era la otra escalera, la que se sube desde el zaguán: un muro a su lado norte porque el mapa puso un muro ahí, y nada, absolutamente nada, a su lado sur, porque nadie escribió nunca el signo. La pista era un solo pixel: el cuadro oscuro de la cabecera sólo existe abajo. Treinta años rentando cuartos y ni una sola vez me enseñó un albañil una escalera con barandal de un solo lado a propósito."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  const chalk="#F4F1E8",mass="#8E8574",tread="#B9A98E";
  g.fillStyle=chalk;g.globalAlpha=.95;g.font="bold 11px ui-monospace,monospace";
  g.fillText("arriba",W*0.10,H*0.13);g.fillText("abajo",W*0.60,H*0.13);g.globalAlpha=1;
  /* ---- LEFT: the loft's well. Sunken, railed both visible sides, ticked. ---- */
  const lx=W*0.08,lw=W*0.34,gy=H*0.60,st=H*0.052;
  g.fillStyle=P.ink;g.globalAlpha=.14;g.fillRect(lx,gy,lw,H*0.055);g.globalAlpha=1;
  g.fillStyle=tread;g.fillRect(lx,gy-5,lw,5);                       /* the floor line */
  g.fillStyle=P.deep;g.fillRect(lx+lw*0.16,gy,lw*0.68,st*4.1);      /* the hole */
  for(let i=0;i<4;i++){g.fillStyle=i%2?"#6E6858":"#7C7566";
    g.fillRect(lx+lw*0.16+i*lw*0.17,gy+i*st,lw*0.17,st*(4-i)+2);}
  [[lx+lw*0.13,1],[lx+lw*0.84,1]].forEach(q=>{                      /* rail, BOTH sides */
    g.fillStyle="#8A6A3E";g.fillRect(q[0]-1,gy-H*0.085,3,H*0.085);
    g.fillStyle="#6E5334";g.fillRect(q[0]-5,gy-H*0.088,11,3);});
  g.strokeStyle=P.moss;g.lineWidth=2.4;g.beginPath();
  g.moveTo(lx+lw*0.40,H*0.20);g.lineTo(lx+lw*0.48,H*0.26);g.lineTo(lx+lw*0.64,H*0.155);g.stroke();
  g.fillStyle=P.moss;g.font="bold 8px ui-monospace,monospace";g.fillText("9",lx+lw*0.68,H*0.26);
  /* ---- RIGHT: the stall's flight. Mass north, open south. ---- */
  const rx=W*0.56,rw=W*0.34;
  g.fillStyle=P.ink;g.globalAlpha=.14;g.fillRect(rx,gy,rw,H*0.055);g.globalAlpha=1;
  g.fillStyle=mass;g.fillRect(rx,gy-H*0.30,rw*0.94,H*0.30);         /* the wall that is not a rail */
  g.fillStyle="#A29881";g.fillRect(rx,gy-H*0.30,rw*0.94,3);
  for(let i=0;i<4;i++){const bw=rw*0.20,bh=st*(i+1);                /* four treads, rising */
    g.fillStyle=i===3?"#2B2536":tread;g.fillRect(rx+rw*0.06+i*bw,gy-bh,bw-2,bh);
    g.fillStyle="rgba(255,255,255,.18)";g.fillRect(rx+rw*0.06+i*bw,gy-bh,bw-2,1.5);}
  g.save();g.strokeStyle=P.rust;g.lineWidth=2;g.globalAlpha=.9;g.setLineDash([5,4]);
  g.beginPath();g.moveTo(rx+rw*0.04,gy+H*0.072);g.lineTo(rx+rw*0.90,gy+H*0.072);g.stroke();
  g.setLineDash([]);g.restore();g.globalAlpha=1;
  g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";
  g.fillText("nada",rx+rw*0.34,gy+H*0.125);
  murBody(g,rx+rw*0.52,gy-st*2-2,P.bone,9);                          /* somebody on the open side */
  /* ---- the tick hangs over the wrong stair: chalk string and an arrow ---- */
  g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();
  g.moveTo(rx+rw*0.10,H*0.215);g.lineTo(lx+lw*0.80,H*0.215);g.stroke();
  g.fillStyle=P.rust;g.beginPath();g.moveTo(lx+lw*0.70,H*0.215);
  g.lineTo(lx+lw*0.80,H*0.175);g.lineTo(lx+lw*0.80,H*0.255);g.closePath();g.fill();
  g.strokeStyle=chalk;g.lineWidth=1.2;g.globalAlpha=.7;
  g.beginPath();g.moveTo(W*0.50,H*0.10);g.lineTo(W*0.50,gy+H*0.10);g.stroke();g.globalAlpha=1;}
```


---

# don-guero

PRE-FLIGHT — I read `docs/OWNER.md`, `docs/CITY.md`, `docs/HANDOFF.md` and Doña Cuca's room note, then measured both streets in code rather than taking her parcel line on trust: `wallH` and `t3Hides` in `engine/engine3d.js`, `B`'s `lift:13` in `engine/engine.js:1846`, the lintel's west-first neighbour search at `engine3d.js:298`, and row 0 of both `st` maps. I found one parcel in Meridian that takes a second storey with no engine work at all, and I found that the town's only muralled wall is the single worst wall in either game for it — plus four things the ledger says that the code does not. I rendered nothing; this is a paper pass, as the dial's cheapest setting.

---

# 📐 Plano de crecimiento — Phase 2.6 · *La planta alta*

- **The phase in one line** — Meridian's north rank grows a real upper floor on the one five-tile run in either game that has no door in it, no door beside it, nobody working inside it and the map's own edge at its back; the city stops being a row of buildings barely taller than their own doors.

### Parcel & business

**The lot: `content/meridian/maps.js:48`, `st` row 0, x19–x23.** Five tiles of plain `B` today. Measured, not asserted:

| What I checked | Where | What it says |
|---|---|---|
| The run is doorless | `maps.js:48` — `"BBBBBBBBBBBBBBEBBBBBBBBBBBBBBB"` | `E` at x14 is the only door in the shipped row; `$` lands at x25 when district 5 opens (`maps.js:218`, `NOLASCO=[[0,25,"$"]]`). x15–18 and x24 are the buffers. |
| Nothing lives in that wall | `npcs.js:9` — `st:{e:{npc:"lupe",…}}` | Meridian's `st` carries exactly one station NPC, at row 7. No `win:` clerk on the north rank — unlike the town. |
| Four rows of street in front | `maps.js:48–52` | rows 1 (pavement), 2–3 (`≈` carriageway), 4 (pavement); the next solid is row 5. At `lift 30` the wall hides you out to **2.32 tiles** — so rows 3 and 4 always see it whole. |
| The map edge is behind it | y=0 | No walkable ground on the far side. It can never wall off half the world. |
| No papel picado in front of it | `config.js:138` — swags stop at `to:[18,1]`, *"nothing east of x18 — that wall is the mural's"* | The one run in Meridian the season already leaves bare. |

**The business: none, and that is deliberate.** He asked for an ability (*"could make murals way cool"*), not for a shop. `docs/OWNER.md` Settled: *"noone asked me to make them i was saying it is just an ability"* — and *"nothing goes into the world that the player cannot use."* I am not inventing four NPCs to fill this heading. What the parcel does buy, in the fiction that already exists: **`docs/CITY.md:37` says Nolasco is "upstairs off the avenue," and its street facade is one storey high.** The city's directory has said "second floor" for eleven days and the picture has never agreed. This is the first phase where it does.

### The AI role the owner practices

**None this phase, honestly.** The five signed roles are spent (`docs/OWNER.md`, role order) and ❗El espejo is already the sixth trade waiting on Nacho's pen. What `lift` buys the *next* pack is siting: an office above a shop becomes a thing you can see from the street instead of a portal to a loft bigger than its own block. I would spend the quest-writing sitting on ❗El espejo, not here.

### Build notes for the engineer

1. **One new pack glyph, content only.** `content/meridian/art.js` — `TILEMETA["▤"]`-style entry (pick a glyph free in *both* packs; `▧` is the town's, `▤` is Meridian's poster). `{lift:30, kind:"facade", win:[…]}` + `TILEART` drawing two storeys in its own 32×32 + `TILEART_SIDE`. **Do not raise `B`** — `B` is declared in `engine/engine.js:1846` and shared, so bumping it repaints every wall in both games.
2. **The new glyph MUST declare `win:`.** `propSill` (`engine/engine.js:1069`) returns `null` for a glyph with no `win`, and `test/smoke.js:1445` fails with *"a sill calaverita has no window under it"*. The calaverita at `config.js:156` `{world:"st",x:22,y:0}` sits inside this run — one of the three the owner arrowed. Red-before-green is free here: change the glyph without `win` first and watch the smoke fail.
3. **⚠️ The sill sprite does not scale with `lift` — see the finding below.** This is the one thing that can make his two asks fight each other. Price it before you pick the height.
4. **Cold read is mandatory** — `node test/tilesheet.js`, both sheets (`docs/HANDOFF.md` step 2b). A two-storey facade alone in a 4× square, labelled only by its glyph: would a newcomer say "building" or "wallpaper"?
5. **Bump `GAMEV` + `CACHE`** only if `engine/` is touched. If this stays content-only, it is a content bump.
6. **What gets worse, said out loud:** the tram runs `st` row 2 (`maps.js:286`, `TROLLEYAT`). At `lift 13` the north rank does *not* stub from the rails (1.096 < 1.6); at `lift 30` it does (1.81 > 1.6). So in the south-facing camera the new wall cuts to a stub while you stand on the line. The stop at (0,1) already stubs today and is unchanged.
7. **From `docs/IDEAS.md`/CITY.md, ride along with:** nothing. This phase touches one glyph and five tiles. Adding El Zócalo (CITY.md Phase 6, still unbuilt) to it would put two art passes on one branch, which is the merge that eats a session (❗Orden, 2026-09-01).

### Where a mural upstairs belongs — the answer he asked for

**Not on city hall. Not on the crew's houses. In Meridian, on the wall its own config already reserves.**

The town's mural is `▧` at `changarrito/content/maps.js:52`, x10, x12, x13, x15 — **wrapped around city hall's door `E` at x14.** The lintel over a door takes its height from the first neighbour that is a wall or facade, and the search order is `[[x-1,y],[x+1,y],…]` with `.find()` (`engine3d.js:298`) — **west first**. (13,0) is `▧`. So the moment the mural goes two storeys, city hall's door wears **0.81 units of flat, art-less side colour** — a full storey of blank grey curtain over the one door on that street, and over La ventanilla's rank four tiles west. That is the price of "murals upstairs on city hall," and it is not small.

The crew's six houses buy nothing better: every one of them has its door in its own frontage (`maps.js:163–164`), so each pays the same lintel, and three of them (pp x6, es x14, co x22) sit on row 8 with walkable ground on **both** sides — the rank Cuca already ruled out, and she was right.

Meridian is the opposite case: `config.js:138` reserves row 0 east of x18 for a mural, and **Meridian has no mural glyph at all** (`▧` is declared only in `changarrito/content/art.js:23`). So Meridian can put its mural upstairs on a doorless run on day one and never pay a lintel. If he wants a mural way up high, it goes in Meridian first and the town follows once the lintel is paid.

### "No skyscrapers," as a rule you can write in the ledger

> **La regla de la banqueta — un edificio nunca es más alto que la banqueta que tiene enfrente.**
> **1.** A facade may stand no taller than `0.65 × W + 0.3` world units, where **W** is the number of walkable rows between it and the next solid thing on the side you look from. In `lift`: **`lift ≤ (0.65·W − 0.25) ÷ 0.042`.** Two storeys is `lift 30` ≈ 1.81 units, so **two storeys needs three clear rows in front.** Under that, the wall cuts to a stub before you can walk far enough back to see it, and the street is a canyon.
> **2.** A second storey only on a rank with its **back to something** — a map edge, another building, or a sealed block. A tall rank with open ground on both sides is a wall across the middle of the world: the cutaway only rescues you when you are near it, never when you are far.
> **3.** **The ceiling is two.** 32 baked pixels over two storeys is ≈16 px a floor; past that the bake gives up, and the grid has no genuine elevation to justify the climb (`docs/CITY.md`, verified 2026-09-04).

That is three sentences, it travels to any world on this engine, and it is arithmetic rather than taste. Checked against what exists: Meridian `st` row 0 has W=4 → `lift ≤ 55` **(passes, with room)**. Town `st` row 0 has W=7 **(passes on height; fails clause 1's spirit only at the door)**. Town `st` row 8 **(fails clause 2)**. Meridian `st` row 13 — the mercado and taller ribbons — **(fails clause 2: row 14 is walkable)**.

**Which parcel I would develop first: Meridian `st` row 0, x19–x23.** One glyph, five tiles, no engine change, no door within a tile, the map edge behind, the season already leaves it bare, and it is the wall a comment in Meridian's own config has been saving for a mural.

---

## ❗ Side quests for the owner

### ❗La planta
**Which of the three things you're buying — a picture, a room, or the two joined?** Cuca asked this and it was never answered; everything below it changes.
| Option | Consequence |
|---|---|
| **A — A picture upstairs** ← **recommended** | One glyph, five tiles, content only, ships this week. The upstairs is a facade with windows and a mural on it; there is no room behind it and nobody says there is. |
| B — A room upstairs | You already have this and it is `f2`, reached by a stair in HQ. Nothing to build; nothing visible from the street either. |
| C — The two joined | The window you see from the street *is* `f2`'s window. Nobody has costed it, the loft is bigger than the block it stands on, and it is a full ticket minimum plus a resize argument. |

### ❗El dintel
**Do we pay to put art on the blank strip above a door, so a mural can live on a wall that has a door in it?** Today that strip is 3 screen pixels and invisible; at two storeys it is a full storey of grey.
| Option | Consequence |
|---|---|
| **A — Not yet. Site around doors.** ← **recommended** | Free. Meridian's x19–23 needs no lintel at all. The town's mural stays downstairs until this is paid. |
| B — Pay it now (engine, ~a third of a ticket) | The lintel wears the wall's face art. Behaviour changes for Meridian by 0.096 units of colour today — small, real, needs a cold read and a smoke guard. Then city hall's mural can go up. |
| C — Keep one plain tile either side of every door, forever | Free and fragile: it works only because `.find()` takes west first (`engine3d.js:298`), which is order-dependent. If we do this, pin it with a test or it will break silently. |

### ❗La repisa
**The sill sprite's height is fixed in world units while the wall's is not — raising a facade pulls the lit pane off the window behind it.** Fixing it changes a sprite you have approved four times by about 10%.
| Option | Consequence |
|---|---|
| **A — Fix the scale, then build the storey** ← **recommended** | `engine3d.js:571` already multiplies the sprite's *position* by `H`; its *height* at line 570 does not. Making the height scale the same way is one expression, behaviour-identical at `lift 13` to within 3 screen pixels, and it means the two-storey glyph's windows just work. |
| B — Build the storey, keep the glyph's windows in the lower half only | Free; the upper floor gets painted windows with no sill, no candy, no lit pane. The upstairs is decoration in every season. |
| C — Leave it | The first two-storey wall in the game will have a stretched dark window hole with a small lit rectangle floating in the bottom of it. You will see it immediately and we will be here again. |

### ❗El primer muro
**Your word was "test it in this changarrito." I would test it in Meridian instead, and you should know why before I do.**
| Option | Consequence |
|---|---|
| **A — Meridian `st` row 0, x19–23** ← **recommended** | The only clean five-tile run in either game; no lintel, no clerk in the wall, no papel picado, map edge behind. Also the fastest way to see whether you like it. |
| B — The town, city hall's wall (x10–15) | Your mural is already there, so it is the most satisfying picture — and it is the worst wall: a door in the middle, a teller four tiles west, a sugar skull at x11 pinned by a guard, and row 0 pinned byte-for-byte at `test/town.smoke.js:687`. Costs ❗El dintel first. |
| C — The town, x21–x23 | The town's only doorless three-run. It straddles two neighbours' houses (La Obra's frontage and El Motor's), so one building would have half a second storey. I would not. |
| D — Do nothing | The street stays a row of buildings barely taller than their own doors, and `docs/CITY.md:37` goes on calling Nolasco "upstairs." Nothing breaks. It just stays flat. |

---

## 📋 Ledger updates

Append to **Growth history (append)** in `docs/CITY.md` once decisions come back:

```
- 2026-09-13 — **⏳ Phase 2.6 planned: La planta alta (Don Güero) — NOT BUILT.** The first visible
  second storey in either game: `st` row 0, x19–x23 — five tiles of plain `B`, the only run in either
  street that is doorless, has no door orthogonally adjacent, carries no clerk inside the wall, has
  four walkable rows in front of it and the map's own edge behind. One new pack glyph in
  `content/meridian/art.js` at `lift:30` (≈1.81 units against B's 1.096); no engine change if
  ❗La repisa lands as option B. It is the wall `config.js:138` already reserves ("nothing east of
  x18 — that wall is the mural's") and the one run the Muertos swags leave bare. Four decisions
  open: ❗La planta, ❗El dintel, ❗La repisa, ❗El primer muro.
```

Append to **Pending proposals**:

```
- ⏳ **❗La regla de la banqueta** *(Don Güero, 2026-09-13 — "no skyscrapers" written down)* — a facade
  may stand no taller than `0.65×W + 0.3` units, W = walkable rows between it and the next solid thing
  on the side you look from (`lift ≤ (0.65·W − 0.25)/0.042`); a second storey only on a rank with its
  back to a map edge, a building or a sealed block; **the ceiling is two storeys.** Measured against
  what exists: Meridian `st` row 0 passes (W=4, lift ≤ 55); town `st` row 0 passes on height and fails
  at its door; town `st` row 8 and Meridian `st` row 13 fail — walkable on both sides. Promote to
  `docs/OWNER.md` with the rule of twelve, or leave both in CITY.md.
- ⏳ **❗El dintel** *(Don Güero, 2026-09-13)* — the strip above a door takes its height from the first
  neighbouring wall, west first (`engine3d.js:298`), and wears no face art. At `lift 13` it is 0.096
  units and invisible; at `lift 30` it is 0.81 units of blank grey over every door beside a tall wall
  — including city hall's, because the mural `▧` at (13,0) is its west neighbour. Until it is paid, a
  mural upstairs may only go on a wall with no door in it.
- ⏳ **❗La repisa** *(Don Güero, 2026-09-13)* — the calaverita's lit pane is positioned by the wall's
  height (`engine3d.js:571`) and sized independently of it (line 570), so raising a facade leaves the
  sweet in the bottom of a stretched window. Blocks any `lift` change on a wall that carries a sill
  prop; `st` (22,0) is one.
```

Append to **Decision log** (only once he picks):

```
- 2026-09-13 · ❗El primer muro: where the first second storey goes · **<pick>** · <why>
```

And a correction line for **Open parcels**:

```
- **`st` row 0, x19–x23 — the upper floor of the north rank.** Not a lot; a HEIGHT. Doorless, no
  clerk in the wall, map edge behind. ⏳ ❗El primer muro.
```

---

## QUESTIONS FOR THE OWNER

Five collisions. I did not absorb any of them.

1. **The rule of twelve is not in `docs/OWNER.md`.** My brief sent me to *"`docs/OWNER.md`'s rule of twelve"*; OWNER.md has no such entry — the rule lives in `docs/CITY.md` under the **Phase 6 proposal, unbuilt**, as *"la regla del doce y el octavo"*, and whether to promote it to OWNER.md *"for every world"* is listed there as one of four still-open decisions. **The code side is true; the brief is citing a promotion that never happened.** Question: do you want it promoted now, alongside ❗La regla de la banqueta? Two height-and-density rules in one signing is cheaper than two.

2. **Nolasco's handover stands you with your back to Nolasco's door.** `content/meridian/config.js:78` — `{id:"no",…,doorstep:{world:"st",x:25,y:1,dir:"down"}}`; `content/meridian/maps.js:218` — `NOLASCO=[[0,25,"$"]]`, so the door is at (25,**0**), **north** of the doorstep. `dir:"down"` faces south, away from it. The comment five lines above it (`config.js:73–74`) states the exact rule it breaks: *"`dir:"up"` faces the storefront that just opened instead of away from it — the old 'down' was copied from the two shops on st whose doors are on the other side of the street."* The two `ex` doorsteps were fixed on 2026-09-11 and this one was not. One character. Shall I have it fixed with this phase, or is it a separate ticket?

3. **`docs/CITY.md:37` calls Nolasco "upstairs off the avenue" and the code draws it one storey.** `engine/engine.js:1846` — `B:{lift:13,…}` → 1.096 units, against a person at 0.844 and a door box at exactly 1.0. The doc is not wrong about the fiction (the stair room is real, `maps.js:200`), but the street has never shown it. This is the strongest argument for the phase and it belongs written down either way.

4. **Meridian's mural wall is a promise in a comment.** `content/meridian/config.js:138` reserves `st` row 0 east of x18 for "the mural"; `npcs.js:65` says *"The mural stays"*; and there is no mural glyph in Meridian anywhere — `▧` is declared only at `changarrito/content/art.js:23`. Worse, district 5 stamps a door `$` into the middle of the reserved wall at (25,0). Question for you and Nacho together: does Meridian's mural become real on this new upper floor, or does the comment get struck?

5. **The sill sprite and the second storey are the same decision.** You raised both in one message and they collide in one expression: `engine3d.js:571` scales the pane's *position* by the wall's height and line 570 does not scale its *size*. At `lift 13` this is invisible. At `lift 30` the baked window grows 65% taller and the lit pane does not move with it. **Whichever of your two asks we build first, the other one has to know.** ❗La repisa is where I put the choice.

---

## WHAT I DID NOT CHECK

- **I rendered nothing.** No `test/shots.js`, no `tilesheet.js`. Every claim above is read off code and maps; none of it has been looked at. The 16-pixels-a-storey legibility question is Pili's and is untouched.
- **The flat front camera clipping** — that two storeys is a 3D-only effect because `camY` clamps to 0 on row 0 — is **relayed from `docs/rooms/2026-09-12-two-visible-storeys.md`, not re-verified by me.** I verified the 3D half (`wallH`, `t3Hides`, the lintel) and not the 2D half.
- **The iso camera.** I never asked what a `lift 30` glyph does there. `TILEISO` exists; whether anything reads `lift` in that path, I do not know.
- **Whether `test/smoke.js` hardcodes any `st` row-0 coordinate.** I confirmed the *town's* row 0 is pinned byte-for-byte (`test/town.smoke.js:687`); I did not grep Meridian's suite for the same.
- **Admin map edits.** `mqedits` replays at boot per browser (`docs/HANDOFF.md`, known quirks). Whether a painted-over row-0 tile can put a plain `B` back in the middle of the new run, I did not check.
- **Season interaction beyond the swags and the one calaverita.** I checked `props` and `swags` for `st` row 0; I did not read the whole `SEASONS` block.

---

POST-FLIGHT — I came in expecting to hand back the town's wall, because that is where the mural is and that is where the owner said to test, and the code said no in three separate places: a door in the middle of the run, a teller inside the wall four tiles west, and a row pinned byte-for-byte by a guard. The thing I did not expect was that the answer to his skull question and the answer to his floors question are the same line of code — `engine3d.js:570` sizing a sprite that line 571 positions by a height — and neither register had noticed, because at 1.096 units the error is three pixels. I stayed in my lane: I sited a parcel, priced a height and wrote a rule, and I handed the mural's *content* to Nacho and the owner rather than deciding what goes on a wall I only measured. The persona edit I propose is additive and cites this run:

> **Exact text, to be appended to the "Two things to check before you site anything" block in `.claude/agents/don-guero.md`:**
>
> - **Before you site a building's HEIGHT, read the door's neighbours.** A facade's `lift` is free until a door is beside it: the lintel over a door takes its height from the first neighbouring wall or facade, **west first** (`.find()` in `engine3d.js`, grep `lintel`), and it wears no face art — so a tall wall next to a door hangs a blank storey over it. And any prop that sits on that wall's window (`propSill`, grep it) is positioned by the wall's height but **sized independently of it**, so raising a facade pulls the sill sprite off its own window. Name both out loud before you propose a `lift`, and check the run for a `win:` clerk (`WNPC … win:"B"`) — a person who works inside the wall gets the same blank curtain.

*(Motivated by this run: I spent four tool calls discovering the west-first lintel and the sill-scale mismatch, neither of which is in `docs/rooms/2026-09-12-two-visible-storeys.md`, `docs/CITY.md` or my own file — and both of them changed which parcel I recommended.)*

---

```
MURAL PANEL
id:     guero-la-banqueta-manda
by:     "guero"
title:  {en:"The pavement decides the height", es:"La banqueta manda la altura"}
said:   {en:"A building is never taller than the ground in front of it. Three clear rows buys you a second floor; two buys you a canyon.",
         es:"Un edificio nunca es más alto que el suelo que tiene enfrente. Tres filas libres te compran un segundo piso; dos te compran un cañón."}
state:  {en:"I hold that the town has no good wall for an upper floor today, and Meridian has exactly one: five tiles with no door in them and the map's edge at their back.",
         es:"Sostengo que hoy el pueblo no tiene una buena pared para una planta alta, y Meridian tiene exactamente una: cinco losas sin puerta y la orilla del mapa a su espalda."}
who:    {en:"Don Güero, who was sent to the town's mural wall and came back saying not there",
         es:"Don Güero, a quien mandaron al muro del mural del pueblo y volvió diciendo ahí no"}
cap:    {en:"Asked where a second storey could stand, he measured the cutaway instead of trusting the note, and found the rule is arithmetic: a wall hides you out to (its height minus three tenths) divided by sixty-five hundredths. The wall everyone wanted — the one with the mural on it — has a door in the middle, and the strip above a door takes its height from the wall beside it and wears no picture at all. He also found that the sugar skull's lit pane is placed by the wall's height and sized without it, so the two things the owner asked for on the same day were one line of code apart.",
         es:"Le preguntaron dónde cabía un segundo piso, midió el recorte en vez de fiarse de la nota, y halló que la regla es aritmética: una pared te tapa hasta (su altura menos tres décimas) entre sesenta y cinco centésimas. La pared que todos querían — la del mural — tiene una puerta en medio, y la franja sobre una puerta toma su altura de la pared de al lado y no lleva dibujo ninguno. También halló que el vidrio encendido de la calaverita se coloca con la altura del muro y se dimensiona sin ella."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;
  murPaper(g,W,H,"#EDE7D8",null);                        /* an elevation, not a plan: this wall has had a plan */
  const gy=H*0.80,u=H*0.30,x0=W*0.07,x1=W*0.93;
  g.fillStyle=P.shade;g.fillRect(x0,gy,x1-x0,3);         /* the ground line */
  g.fillStyle="#D9D2BE";g.fillRect(x0,gy+3,x1-x0,H*0.06);/* the banqueta itself */
  /* LEFT: the wall we have — 1.10 units, whole from anywhere */
  const wA=W*0.20,hA=1.096*u;
  g.fillStyle="#5C4A50";g.fillRect(x0,gy-hA,wA,hA);
  g.fillStyle="#8E8AA0";g.fillRect(x0+wA*0.18,gy-hA*0.62,wA*0.22,hA*0.30);
  g.fillStyle="#8E8AA0";g.fillRect(x0+wA*0.60,gy-hA*0.62,wA*0.22,hA*0.30);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";g.fillText("1.10",x0+2,gy-hA-5);
  /* RIGHT: the wall we want — 1.81 units, and the stub it becomes up close */
  const xB=W*0.46,wB=W*0.34,hB=1.81*u;
  g.fillStyle="#5C4A50";g.fillRect(xB,gy-hB,wB,hB);
  g.fillStyle="#7A6470";g.fillRect(xB,gy-hB*0.52,wB,2);  /* the floor band: the whole trick */
  [0.12,0.40,0.68].forEach(f=>{g.fillStyle="#8E8AA0";
    g.fillRect(xB+wB*f,gy-hB*0.90,wB*0.16,hB*0.22);      /* the upper storey, the new windows */
    g.fillRect(xB+wB*f,gy-hB*0.40,wB*0.16,hB*0.22);});
  g.fillStyle=P.gold;g.fillRect(xB+wB*0.40+1,gy-hB*0.90+1,wB*0.16-2,hB*0.22-2); /* one pane lit: the sill */
  g.fillStyle=P.bone;g.fillRect(xB+wB*0.38,gy-hB*0.68,wB*0.20,2);
  g.fillStyle=P.ink;g.fillText("1.81",xB+2,gy-hB-5);
  /* the cutaway: where it stops existing because you walked up to it */
  const sy=gy-0.28*u;
  g.strokeStyle=P.rust;g.lineWidth=2;g.setLineDash([5,4]);
  g.beginPath();g.moveTo(xB-8,sy);g.lineTo(xB+wB+8,sy);g.stroke();g.setLineDash([]);
  g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";g.fillText("stub 0.28",xB+wB+10,sy+3);
  /* the camera, and the ray that decides everything */
  g.fillStyle=P.ink;g.beginPath();g.arc(x1-10,H*0.10,5,0,7);g.fill();
  g.strokeStyle=P.ink;g.globalAlpha=.45;g.lineWidth=1;
  g.beginPath();g.moveTo(x1-10,H*0.10);g.lineTo(W*0.30,gy-6);g.stroke();g.globalAlpha=1;
  murBody(g,W*0.30,gy-14,P.moss,11);                     /* him, on the far pavement, seeing it whole */
  murBody(g,xB+wB*0.50,gy-14,P.rust,11);                 /* him, up close, seeing a stub */
  /* the dimension that is the rule: three clear rows */
  murDim(g,W*0.32,xB-4,H*0.93,P.moss,"W = 3 filas");
  g.fillStyle=P.deep;g.font="bold 11px ui-monospace,monospace";
  g.fillText("h \u2264 0.65\u00B7W + 0.3",x0,H*0.10);}
```


---

# chema

## PRE-FLIGHT

Read `docs/3D-LOG.md` end to end (the rejected list first — neither thing I propose below is on it) and `docs/POSTMORTEM.md` §1–§3, then `docs/NEW-WORLD.md` §3⅔/§3⅝ and the code paths for both cameras before touching a measurement. Set up the shot the way the owner had it: `#vp` 528×423 CSS at dpr 2 (1056×846 device — his frame is 1172), season `muertos` forced on because the props do not exist out of season (`SEASONS` at `content/meridian/config.js:130`, and today is 14 Sep), clock pinned to 22:00 so all four night branches fire (`engine/engine.js:807`, `:2131`, `:2152`, `engine/engine3d.js:834`), `Date.now`/`performance.now` frozen, hero at `st (5,2)` — the spot `test/smoke.js` itself uses for sills. **Control first: render twice, change nothing — 0 changed pixels in all four cameras, every run.**

## THE DELIVERABLE

### 1 · The number, four cameras

Method: the sweet's pixels are the pixels that change when `drawCalaverita` is a no-op and *nothing else moves*; same for the ledge (`drawSillLedge`) and the lit pane (`drawSillLit`). Luminance is Rec.709 on sRGB bytes, 0–255. Per skull, in the buffer that camera actually renders:

| camera | buffer | skull px | skull L | ledge L | wall L | ΔL skull−wall | Weber | Michelson |
|---|---|---|---|---|---|---|---|---|
| **front** | 640×512 | **0** | — | — | — | — | — | — |
| top | 640×512 | 192–241 | 158–179 | *no ledge drawn* | 107–127 | **+44 … +53** | 0.39–0.50 | 0.163–0.199 |
| iso | 640×512 | 176–239 | 170–174 | *no ledge drawn* | 103–125 | +45 … +71 | 0.36–0.68 | 0.153–0.255 |
| 3d | 1056×920 | **66–193** | 174–184 | 119–123 | 46–73 | **+106 … +139** | 1.45–3.04 | 0.42–0.60 |

Translated to what the eye gets: the flat cameras' 640×512 buffer is stretched ×1.65 to the screen (×2.72 in area), so top/iso deliver **≈520–660 screen pixels** per skull (≈11×13 CSS px). 3D delivers **66–193** (the far ones are a 16×5 device-pixel bbox = **8 × 2.5 CSS px**; the near one 25×9 = 12.5×4.5). Front delivers **nothing**.

### 2 · The front camera renders the skulls and then paints over them — all of them, everywhere

Not a contrast problem. A *zero*. `drawSillBox` is called **8 times** in every front frame and **0 pixels of sweet, 0 of ledge, 0 of lit pane** reach the canvas. Checked at five positions on Calle Dos — `(5,2) (11,2) (20,2) (5,7) (9,7)` — 8 calls, 0 px, control noise 0, at every one.

Cause, planted not reasoned: the fiesta is drawn in the **ground pass** at `engine/engine.js:1946` (`…troDraw2D(…,true);fiestaDraw2D(…,true);`), and the facade's own tile art runs later in the row-sorted depth pass at `engine/engine.js:1976` (`const tf=face?(TILEDRAW[ch]||TILEDRAW[gch]):…`). Suppressing `TILEDRAW["B"]`/`TILEDRAW["Q"]` for exactly those tiles makes the whole assembly appear — **992 px of sweet, 1624 of ledge, 1281 of pane**. This only bites props on *solid* tiles, which is why the papel picado (strung over open rows) has never had the problem and the sills always have.

Crops written to `/tmp/claude-0/-home-user-meridian-quest/0f70be00-7ff9-5c2f-a84c-7edceebcd89f/scratchpad/chema-shots/front-window-y5-shipped.png` and `…-facade-suppressed.png`: shipped, La Cocina's window is a cream awning pane with a bowl of soup in it; suppressed, it is a lit gold window with a pink-foil sugar skull on a stone ledge.

### 3 · In 3D the lit pane is three-quarters swallowed by the wall it hangs on

The pane sprite projects to 21 device px tall (screen y 358→379). **Only y 374–379 arrives.** The sweet is drawn in the bottom 7 of the pane's 9 canvas rows (`engine/engine3d.js:568`), so what survives is a 16×5 smear of cream.

Mechanism — and the postmortem's prose is the right symptom with the wrong cause: a three.js `Sprite` is **not** a tilted quad, it is a quad at a *single* view-space depth, the depth of its anchor. The anchor here is the pane's **bottom** (`sp.center.set(0.5,0.02)`, `engine/engine3d.js:570`) at `p.y+1.03` (`:572`). Every pixel above the anchor is therefore drawn at the bottom's depth, and the wall above the anchor is nearer than that, so the wall wins. The ledge already carries the cure — it sits at `p.y+1.08` (`engine/engine3d.js:605`), 0.05 further out — **which is exactly why the ledge reads and the pane does not.** The fifth fix moved the ledge out and left the pane where it was.

Ruled out by measurement, not argument: the ledge is **not** eating the sweet — skull px 396 with the ledge, **396** with `drawSillLedge` blanked. Identical.

### 4 · Light, value, occlusion — measured against each other

Same rig at 12:00 and at 22:00:

| | skull px 22:00 | skull px 12:00 | Weber 22:00 | Weber 12:00 |
|---|---|---|---|---|
| top | 1057 | 1066 | 0.78 | 1.13 |
| iso | 825 | 856 | 0.11 | 0.12 |
| 3d | 396 | 396 | 1.10 | 1.05 |

- **Light changes no pixel count anywhere.** The night wash costs the top camera 31% of its contrast on a shape that already reads; it costs iso nothing; and in 3D **night slightly helps**, because the sill sprites are never added to `T3.tintables` (zero `tintables.push` between `engine/engine3d.js:549` and `:611`), so the sweet keeps full value while the wall around it is dimmed by `engine3d.js:834`. Turning the wash off buys 0 pixels.
- **Value cannot help either.** The sweet already measures L 158–184 against walls at 46–127 — the largest value separation in the frame. Its headroom to pure white is ≤ +70 L on a shape that is 66 device pixels. This would be the fifth fix of the same kind (`docs/POSTMORTEM.md` §1: four sizes). *The one place value genuinely is the fault is **iso** — Weber 0.11, Michelson 0.054, day and night — the sweet on a wall of almost its own value. Second job, not this one.*
- **Occlusion is the whole of it**, and both cures are measured:

| change | before | after |
|---|---|---|
| front: sill box drawn after the facade art | **0 px** | **1006 px**, L 195.5 on 89.5, ΔL **+106** |
| 3d: pane + ledge pushed out together, +0.09 | **396 px** | **1743 px (4.4×)** |

3D sweep (pane and ledge moved together so their 0.05 order is kept; control 0):

`+0.00 → 396 · +0.03 → 832 · +0.06 → 1301 · +0.09 → 1743 · +0.12 → 2066 · +0.18 → 2112 · +0.25 → 2083`

**+0.09 is the number.** Look at `3d-both-dz0.png` against `3d-both-dz0p09.png`: same texture, same palette, same light — at 0 a cream smear in an orange sliver, at +0.09 a whole sugar skull with teal sockets, gold brow and jaw, sitting in a lit window on a stone ledge. By +0.18 the pane arrives complete but hangs visibly proud of its recess and reads as a lit box under the window rather than in it.

### 5 · The single change I would make, and its seam

**Occlusion — and the front camera first, because it is the only zero on the board.** Both halves are engine RULES, not Meridian content; any pack that hangs anything on a wall has both bugs.

- **Front (a RULE, and the slot already exists with a comment on it):** a prop standing on a **solid** tile belongs in that tile's row of the depth queue, not the ground pass. `engine/engine.js:1953` already says it for decor — `R.push({d:d.y+0.05,…}); /* after its row's facade, before actors */`. I measured the *painted-last* version (1006 px), which is an upper bound; at `d=y+0.05` it can only differ when somebody is standing in front of that window, which is the correct behaviour.
- **3D (the same rule in the other camera):** the offset a wall-hung billboard needs is a function of **its own height and the camera's pitch**, not a constant hand-tuned for one sprite. 0.09 world units is what a 0.28-tall sprite needs at today's camera; a taller one needs more, and the ledge's 0.05 is a smaller sprite's answer copied to nothing else.

### 6 · Found on the way, and planted both directions — `engine/engine.js:1115` is dead code

`engine/engine.js` declares **four functions twice**: `drawOfrenda` (1081 / 1185), `fiestaProps` (1095 / 1199), `drawPapelRow` (1096 / 1200), `drawSillLit` (1115 / 1219). Lines 1081–1122 are byte-identical to 1185–1226 (`diff` empty), and the "THE SILL ITSELF" comment block appears twice back-to-back at 1122 and 1140. Clean tree, `git status` empty — this is on `main`.

Planted in a lab copy **outside the repository** (`scratchpad/chema-lab`), both ways:

- first copy (`:1115`) painted magenta → **0 magenta in the bake, 0 on the street in 3D**;
- second copy (`:1219`) painted magenta → **160 in the bake, 600 on the street**.

So the live `drawSillLit` is `:1219` and **an edit to `:1115` does nothing.** `drawSillLit` is the function of the fifth skull attempt. The sixth attempt has a very good chance of editing line 1115 and watching the street not change — this is `docs/POSTMORTEM.md` §9's "a regex replace inserted a whole block a second time", still in the tree.

### 7 · The entry for `docs/3D-LOG.md`, in its shape

```
### 2026-09-14 · the skulls, measured in all four cameras — and the front camera renders zero

- **Goal served:** a person can always tell what is there. The owner, five reports: the sugar skulls
  on the sills cannot be found without an arrow.
- **Conditions:** #vp 528×423 CSS @ dpr2 (1056×846 device; his frame is 1172), season `muertos`
  forced on, clock pinned 22:00 so every night branch fires, Date.now/performance.now frozen,
  hero at st (5,2). **Control — render twice, change nothing — 0 changed pixels in all four
  cameras, every run.** Method: a thing's pixels are the pixels that change when its ONE painter
  is a no-op. Luminance Rec.709 on sRGB bytes.
- **Measured before, per skull:** front **0 px**. top 192–241 px, ΔL vs wall +44…+53, Weber
  0.39–0.50. iso 176–239 px, ΔL +45…+71, Weber 0.36–0.68. 3d **66–193 px** (16×5 device px far,
  25×9 near), ΔL +106…+139, Weber 1.45–3.04. On screen the flat buffers upscale ×2.72, so
  top/iso give ≈520–660 screen px a skull and 3D gives 66–193.
- **Diagnosis 1 — FRONT DRAWS THEM AND PAINTS OVER THEM.** `drawSillBox` is called 8 times a
  frame and delivers 0 px of sweet, 0 of ledge, 0 of pane, at five positions tested. The fiesta
  is drawn in the ground pass (`engine.js:1946`), the facade's own tile art runs later in the
  row-sorted depth pass (`engine.js:1976`). Suppress `TILEDRAW` for those tiles and the whole
  assembly appears: 992 / 1624 / 1281 px. Only props on SOLID tiles are affected, which is why
  the papel picado never had this and the sills always did.
- **Diagnosis 2 — 3D: the pane is three-quarters swallowed by its own wall.** A three.js Sprite is
  a quad at ONE view-space depth — its anchor's. The anchor is the pane's bottom
  (`engine3d.js:570`, `center.set(0.5,0.02)`) at `p.y+1.03` (`:572`), so every pixel above it is
  drawn at the bottom's depth and the nearer wall wins. 21 projected px tall, 5 arrive. The ledge
  already carries the cure at `p.y+1.08` (`:605`) — which is exactly why the ledge reads.
- **Measured after (not shipped — advisory run, crew mode off):** front 0 → **1006 px**, ΔL +106,
  by replaying the sill box after the facade art. 3d 396 → **1743 px (4.4×)** with pane and ledge
  moved out together +0.09; sweep 0/0.03/0.06/0.09/0.12/0.18/0.25 = 396/832/1301/1743/2066/2112/2083.
- **Recommendation — OCCLUSION, front camera first.** Both are engine RULES: (a) a prop on a solid
  tile joins that tile's row in the depth queue — the slot and its comment already exist at
  `engine.js:1953`; (b) a wall-hung billboard's offset is a function of its own height and the
  camera's pitch, not a constant tuned for one sprite.
- **REJECTED — light.** Measured at 12:00 against 22:00: pixel counts 1057/1066 top, 825/856 iso,
  396/396 3d. **The night wash changes no pixel count anywhere.** It costs top 31% of contrast
  (Weber 0.78 vs 1.13), costs iso nothing, and in 3D it slightly HELPS (1.10 vs 1.05) because the
  sill sprites are never added to `T3.tintables` (zero `tintables.push` in engine3d.js:549–611),
  so the sweet keeps full value while the wall is dimmed by `engine3d.js:834`. Do not chase light.
- **REJECTED — value / the sweet's palette.** It already measures L 158–184 against walls at
  46–127, the largest value separation in the frame; headroom to pure white is ≤ +70 L on a shape
  that is 66 device pixels. This would be the fifth fix of the same kind (POSTMORTEM §1).
  **One exception, logged not proposed: ISO is a genuine value fault** — Weber 0.11, Michelson
  0.054, day and night. Second job.
- **REJECTED — "the ledge is eating the sweet".** Plausible, and false: 396 px with the ledge,
  396 with `drawSillLedge` blanked. Identical. Do not spend time on it again.
- **Watch out — `engine/engine.js:1115` is DEAD CODE.** Four functions are declared twice
  (`drawOfrenda` 1081/1185, `fiestaProps` 1095/1199, `drawPapelRow` 1096/1200, `drawSillLit`
  1115/1219), byte-identical, on a clean `main`. Planted both ways in a lab outside the repo:
  magenta in the first copy → 0 px anywhere; magenta in the second → 160 in the bake, 600 on the
  street. `drawSillLit` is the fifth attempt's own function. A sixth attempt that edits 1115 will
  watch the street not change.
- **Watch out — the guard bought for the word "hidden" reads one camera and the wrong object.**
  `test/smoke.js` (grep `camSet('3d')` near the sill block, and `stone < 3`) counts the LEDGE's
  stone pixels in 3D only. In the front camera the ledge is at zero too and nothing asks.
```

## QUESTIONS FOR THE OWNER

**Which camera was your screenshot?** Two things collide and I am not averaging them.

- The brief says *"the screenshot: Meridian Street in the FRONT camera at night… three sugar skulls… each about 20 px wide in a 1172 px frame"*.
- The front camera renders **zero** sugar-skull pixels — five positions, control noise 0 each (`engine/engine.js:1946` drawn, `engine/engine.js:1976` paints over). There would be nothing there to draw an arrow at.
- The **3D** camera at `st (5,2)` puts skulls at 11.6%, 23.8%, 56.3% and 88.9% of the frame's width, at 16×5 and 25×9 device px — "about 20 px wide", and the leftmost at 24% is your leftmost arrow.

It changes which fix you see first, nothing else. If you were in 3D, the +0.09 push (396 → 1743 px) is what you will notice. If you really were in front, the draw-order fix (0 → 1006) is, and the three things you arrowed were something else in the frame — which I did not identify and am not going to guess at.

## WHAT I DID NOT CHECK

- **El Changarrito.** `drawFront` and `fiestaDraw2D` are in shared `engine/`, so the town inherits the front-camera ordering — I did not render the town and did not run `node test/town.smoke.js`.
- **I ran no suite this session.** The tree is unedited (`git status` clean) but I have not confirmed it is green today.
- The front camera **at noon** — the zero is a draw-order fact and should be time-independent, but I only measured front at 22:00.
- **One viewport only** (586×1000 @ dpr 2). No landscape, no 390×844, no 480×900, no fullscreen.
- Whether pushing the 3D sprites +0.09 out collides with anything: the near-wall glass rule (`T3GHOST`/`t3Top`), a neighbouring prop, the tram's clearance, or the hero's depth exemption (#22/#92).
- Any world but `st`, and any sill props outside Calle Dos.
- Whether the front cure at `d=y+0.05` changes what a person standing in front of a window looks like. I measured the painted-last version, an upper bound.
- Whether the `drawOfrenda` / `drawPapelRow` / `fiestaProps` duplication has any effect beyond dead code — I planted only `drawSillLit`, and only that its first copy is dead.
- I worked from the brief's **description** of the owner's screenshot. I never saw the image.

## POST-FLIGHT

The instrument that decided this was not in my file: **blank one painter and diff the frame** tells you which object's pixels are missing without knowing where on screen it is, and it is what turned "the skulls are hard to see" into "the front camera delivers zero", which no contrast number could have said. The whole-viewport screenshot my file tells me to take at the end was **useless** here — HUD, a dialogue bubble, a busy street — and what actually showed the fault was an 8× crop of one window rendered twice side by side; that is a real correction to my own habit, not a refinement of it. I also learned the mechanism behind the postmortem's "a billboard tilts into the wall": it does not tilt, it is a quad at the single depth of its anchor, which is why the cure has a *formula* (its own height × the camera's pitch) instead of a constant somebody tuned once for a ledge. And I got the reminder about my own trade cheap: the ledge-eats-the-sweet theory was elegant, obvious and worth exactly the ten seconds it took to measure it at 396 against 396.

**Persona edit proposed** — insert after the section "Ask the scene graph, not only the frame" in `.claude/agents/chema.md`, exact text:

```markdown
## Blank one painter, and crop the picture

*Applied 2026-09-14 from the skulls, all four cameras.*

**When a thing is hard to see, do not measure its contrast first — find out whether it is there.**
Replace the ONE function that paints it with a no-op, render, and diff: the pixels that changed are
that object's, wherever they landed, and you never had to project anything. It answered the sugar
skulls in one pass — **the front camera calls `drawSillBox` eight times a frame and delivers zero
pixels** (`engine/engine.js:1946` draws it, `engine/engine.js:1976` paints over it) — and no contrast
number in any register could have said that, because there was nothing to take the contrast of.
Freeze `Date.now` and `performance.now` first, and prove the control diff is 0 before you believe a
single row.

**And the screenshot at the end is the wrong screenshot.** A whole viewport is HUD, a dialogue
bubble and a busy street; the fault lives in forty pixels. **Crop the one object and blow it up 8×,
twice — as shipped and with the one change.** Two crops decided this job in a second. The full frame
decided nothing.

**One fact about billboards, because the register has the symptom and not the cause:** a three.js
`Sprite` does not tilt into a wall. It is a quad at a **single** view-space depth — its anchor's — so
every pixel above the anchor is drawn at the anchor's depth and a nearer wall wins there. That is why
the window pane anchored at its bottom (`engine/engine3d.js:570`) loses three-quarters of itself and
its own ledge, sitting 0.05 further out (`:605`), does not. **The offset a wall-hung billboard needs
is its own height times the camera's pitch — a formula, not a constant somebody tuned for one sprite.**
```

## MURAL PANEL

```
MURAL PANEL
id:     chema-la-copia-en-blanco
by:     "chema"
title:  {en:"The blank print", es:"La copia en blanco"}
said:   {en:"The negative had the skull on it. The print came out empty. Nobody had asked the print.",
         es:"El negativo tenía la calavera. La copia salió vacía. Nadie le había preguntado a la copia."}
state:  {en:"Holding that the front camera is a zero and not a contrast — and refusing to grade the print until somebody tells me which camera he was standing in.",
         es:"Sostengo que la cámara frontal es un cero y no un asunto de contraste — y me niego a corregir la copia hasta que alguien me diga en qué cámara estaba parado él."}
who:    {en:"Chema, who developed it before he graded it", es:"Chema, que la reveló antes de corregirla"}
cap:    {en:"Five reports in, and every answer had been a number about the sweet: eight pixels, then five, then a lit pane, then a ledge. He was sent to measure its contrast and instead he blanked the one hand that paints it and counted what moved. In the camera the owner photographs, the game draws the window eight times a frame and delivers nothing at all — the wall it hangs on is painted afterwards, over the top, every frame since it shipped. Contrast was the wrong question for a thing that is not on the paper. The negative was perfect. It always had been.",
         es:"Cinco reportes después, y cada respuesta había sido un número sobre el dulce: ocho píxeles, luego cinco, luego un vidrio encendido, luego una repisa. Lo mandaron a medir su contraste y en vez de eso tapó la única mano que lo pinta y contó lo que se movió. En la cámara que el dueño fotografía, el juego dibuja la ventana ocho veces por cuadro y no entrega absolutamente nada — la pared donde cuelga se pinta después, encima, cada cuadro desde el día que se entregó. El contraste era la pregunta equivocada para algo que no está en el papel. El negativo estaba perfecto. Siempre lo estuvo."}
aspect: 0.46
art:    (g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* CHEMA'S HAND, and NOT the contact sheet again: a darkroom bench. On the left a lightbox with the
     negative on it — the skull is plainly there, in reversed tones. On the right the finished print,
     pinned up, wet, and blank where the skull should be. Between them the grease pencil. */
  g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";
  g.fillText("CALLE DOS \u00b7 REPISAS \u00b7 C\u00c1MARA FRONTAL",W*0.035,H*0.105);
  g.font="11px ui-monospace,monospace";g.fillStyle=P.deep;
  g.fillText("22:00 \u00b7 1056\u00d7846 \u00b7 control 0 px",W*0.66,H*0.105);

  /* --- the lightbox, left --- */
  const lx=W*0.035, ly=H*0.17, lw=W*0.42, lh=H*0.52;
  g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(lx+5,ly+6,lw,lh);g.globalAlpha=1;
  g.fillStyle="#F4EFD9";g.fillRect(lx,ly,lw,lh);
  g.fillStyle="#FFFBEA";g.fillRect(lx+3,ly+3,lw-6,lh-6);
  g.strokeStyle=P.shade;g.lineWidth=2;g.strokeRect(lx+0.5,ly+0.5,lw-1,lh-1);
  /* the negative strip laid across it, sprocket edges top and bottom */
  const nx=lx+lw*0.10, ny=ly+lh*0.22, nw=lw*0.80, nh=lh*0.52;
  g.fillStyle="#3A3320";g.fillRect(nx,ny-4,nw,nh+8);
  g.fillStyle="#FFFBEA";
  for(let x=nx+3;x<nx+nw-4;x+=nw/7){g.fillRect(x,ny-3,4,3);g.fillRect(x,ny+nh,4,3);}
  /* the frame itself: reversed tones, so the cream sweet reads DARK on a light wall */
  g.fillStyle="#C9BE9A";g.fillRect(nx+4,ny,nw-8,nh);                    /* wall, inverted */
  const wx=nx+nw*0.34, wy=ny+nh*0.16, ww=nw*0.32, wh=nh*0.60;
  g.fillStyle="#5B5230";g.fillRect(wx,wy,ww,wh);                        /* the lit pane, inverted */
  g.fillStyle="#2B2618";                                                /* the sweet, inverted */
  g.beginPath();g.ellipse(wx+ww*0.5,wy+wh*0.52,ww*0.32,wh*0.30,0,0,7);g.fill();
  g.fillRect(wx+ww*0.34,wy+wh*0.66,ww*0.32,wh*0.20);
  g.fillStyle="#C9BE9A";                                                /* its sockets, inverted */
  g.fillRect(wx+ww*0.36,wy+wh*0.42,ww*0.10,wh*0.12);
  g.fillRect(wx+ww*0.56,wy+wh*0.42,ww*0.10,wh*0.12);
  g.fillStyle="#8C8256";g.fillRect(wx-ww*0.10,wy+wh*0.88,ww*1.20,wh*0.14); /* the ledge, inverted */
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("EL NEGATIVO",lx,ly-6);
  g.font="10px ui-monospace,monospace";g.fillStyle=P.deep;
  g.fillText("est\u00e1 ah\u00ed \u00b7 8 veces por cuadro",lx,ly+lh+14);

  /* --- the print, right: pinned, wet, and empty --- */
  const px2=W*0.545, py2=H*0.17, pw=W*0.42, ph=H*0.52;
  g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(px2+5,py2+6,pw,ph);g.globalAlpha=1;
  g.fillStyle="#8A4A34";g.fillRect(px2,py2,pw,ph);                      /* the facade, as printed */
  g.fillStyle="#7A4030";g.fillRect(px2,py2+ph*0.62,pw,ph*0.06);
  /* the awning window the facade paints OVER the sill, every frame */
  const ax=px2+pw*0.30, ay=py2+ph*0.24, aw=pw*0.40, ah=ph*0.30;
  g.fillStyle="#E8DCB4";g.fillRect(ax,ay,aw,ah);
  g.fillStyle="#D8C89A";g.fillRect(ax+2,ay+2,aw-4,ah-4);
  g.fillStyle="#C87A55";g.beginPath();g.ellipse(ax+aw*0.5,ay+ah*0.72,aw*0.28,ah*0.20,0,0,Math.PI);g.fill();
  g.strokeStyle="#6B3A28";g.lineWidth=1;g.strokeRect(ax+0.5,ay+0.5,aw-1,ah-1);
  /* two drawing pins and a drip, so it reads as a wet print and not a window */
  g.fillStyle=P.gold;[[px2+6,py2+6],[px2+pw-8,py2+6]].forEach(p=>{g.beginPath();g.arc(p[0],p[1],3,0,7);g.fill();});
  g.fillStyle="#6B3A28";g.globalAlpha=.5;g.fillRect(px2+pw*0.5,py2+ph,2,H*0.03);g.globalAlpha=1;
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("LA COPIA",px2,py2-6);

  /* --- the grease pencil, straight across the print --- */
  g.strokeStyle="#D9342B";g.lineWidth=4;g.lineCap="round";
  g.beginPath();g.moveTo(px2+pw*0.10,py2+ph*0.14);g.lineTo(px2+pw*0.92,py2+ph*0.86);g.stroke();
  g.fillStyle="#D9342B";g.font="bold 15px ui-monospace,monospace";
  g.fillText("0 px",px2+pw*0.60,py2+ph*0.22);

  /* --- the arrow from negative to print, and the readings along the bottom --- */
  g.strokeStyle=P.ink;g.lineWidth=2;
  const my=py2+ph*0.50;
  g.beginPath();g.moveTo(lx+lw+W*0.012,my);g.lineTo(px2-W*0.012,my);g.stroke();
  g.beginPath();g.moveTo(px2-W*0.012,my);g.lineTo(px2-W*0.030,my-5);g.lineTo(px2-W*0.030,my+5);g.closePath();g.fill();

  const by=H*0.79;
  g.fillStyle=P.bone;g.fillRect(W*0.035,by,W*0.93,H*0.13);
  g.fillStyle=P.shade;g.fillRect(W*0.035,by,W*0.93,2);
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("P\u00cdXELES DE DULCE QUE LLEGAN, POR CALAVERA",W*0.05,by+15);
  g.font="12px ui-monospace,monospace";
  const cols=[["frontal","0",true],["superior","241",false],["iso","239",false],["3D","68",false],["3D +0.09","1743",false]];
  cols.forEach((c,i)=>{const cx=W*0.05+i*(W*0.185);
    g.fillStyle=c[2]?"#D9342B":P.deep;g.font="10px ui-monospace,monospace";g.fillText(c[0],cx,by+32);
    g.fillStyle=c[2]?"#D9342B":P.ink;g.font="bold 14px ui-monospace,monospace";g.fillText(c[1],cx,by+48);});
}
```
