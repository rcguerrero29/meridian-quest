/* ============================================================================
   MERIDIAN TILE ART — the pack's own glyphs (TILEART / TILEMETA)

   The engine's uppercase alphabet is spent, so new tiles are symbols and digits,
   declared HERE and read by the engine as data: TILEART adds a drawing, TILEMETA
   says what the tile IS (how tall it stands, what kind of thing it is). SOLIDX and
   MAPCOL in maps.js carry the same glyph. A pack that ships no art.js gets none of
   these tiles — the engine never learns them.

   First glyph, 2026-09-02 — la ventana del norte:
   "|"  a window IN a wall. Three of them sit in Floor 2's north wall, over the old
        lead's desk. Kind "wall", same lift as "#", so in 3D it is a wall block that
        wears this drawing on its faces and stands flush with the wall beside it.
        What it looks at is the only honest view north of HQ: the back lot, the road
        leaving the barrio, two rooftops and a pole, and on the horizon the graded
        line where the northbound trolley is being laid — Barrio Norte stays a
        promise you can now SEE. The sky takes the season through art("sky").
        The sill is the load-bearing detail: a framed rectangle without one reads as
        a picture on the wall; a sill reads as a window (cold read: test/tilesheet.js).

   Second glyph, 2026-09-02 — la mudanza:
   "□"  a taped moving box. The office opens MID-MOVE (owner: "for the move it should
        be mid"), and the only crate the engine had is El Mercado's produce crate — a
        tomato, a chile and a banana, which read as groceries. This one is cardboard:
        a taped cross over the seam and a label. One glyph, two silhouettes by tile
        parity (the engine's own idiom): even tiles a single box, odd tiles a shorter
        box with a smaller carton on top, so a stack never looks stamped. Solid, low
        (lift 5, like the crate) so it never blocks the view. No floor and no drop
        shadow here — the engine paints both under every prop. (Don Güero's spec.)
   ============================================================================ */
const TILEART={
  "|":rc=>{const{sx,sy}=rc;
    /* the wall itself, exactly like "#", so the run has no seam */
    ctx.fillStyle=tc(C.wall);ctx.fillRect(sx,sy,TS,TS);
    ctx.fillStyle=tc(C.wallTop);ctx.fillRect(sx,sy,TS,6);
    /* frame, recessed */
    ctx.fillStyle="#2B2536";ctx.fillRect(sx+4,sy+8,24,19);
    /* the pane: sky (the season's colour), a horizon a third down */
    ctx.fillStyle=art("sky","#A9C6E0");ctx.fillRect(sx+6,sy+10,20,15);
    ctx.fillStyle="#8C8470";ctx.fillRect(sx+6,sy+19,20,6);            /* the back lot */
    ctx.fillStyle="#B8B0A0";ctx.beginPath();                            /* the road out, narrowing north */
    ctx.moveTo(sx+12,sy+25);ctx.lineTo(sx+20,sy+25);ctx.lineTo(sx+17,sy+19);ctx.lineTo(sx+15,sy+19);ctx.closePath();ctx.fill();
    ctx.fillStyle="#C9A96E";ctx.fillRect(sx+6,sy+18.6,20,1);            /* the graded line on the skyline */
    ctx.fillStyle="#5F5A6E";ctx.fillRect(sx+7,sy+16.5,5,2.5);ctx.fillRect(sx+22,sy+15.5,4,3.5); /* two rooftops */
    ctx.fillStyle="#3A3546";ctx.fillRect(sx+24,sy+12,1,7);ctx.fillRect(sx+22.5,sy+13,4,1);       /* a power pole */
    /* mullion: one bar up, one across */
    ctx.fillStyle="#2B2536";ctx.fillRect(sx+15.5,sy+10,1.2,15);ctx.fillRect(sx+6,sy+17,20,1.2);
    /* the sill, overhanging, with its shadow */
    ctx.fillStyle="#8A8296";ctx.fillRect(sx+2,sy+27,28,3);
    ctx.fillStyle="#332C44";ctx.fillRect(sx+2,sy+30,28,1);},
  "□":rc=>{const{sx,sy,x,y}=rc;
    const stacked=((x|0)+(y|0))%2===1,t=stacked?4:0; /* odd tiles: a shorter box with a carton on top */
    ctx.fillStyle="#C8A277";ctx.fillRect(sx+4,sy+11+t,24,17-t);            /* the box */
    ctx.fillStyle="#A8814F";ctx.fillRect(sx+24,sy+11+t,4,17-t);            /* one corner turns, so it is a box not a card */
    ctx.fillStyle="#D8B589";ctx.fillRect(sx+4,sy+8+t,11,4);ctx.fillRect(sx+17,sy+8+t,11,4); /* two flaps; the gap is the seam */
    ctx.fillStyle="#EDE4D2";ctx.fillRect(sx+14.5,sy+7+t,3,9);ctx.fillRect(sx+4,sy+9.5+t,24,2.5); /* the taped cross — the whole read */
    ctx.fillStyle="#F6F2E8";ctx.fillRect(sx+8,sy+17+t,10,7-(stacked?1:0));  /* the label */
    ctx.fillStyle="#6B5B45";ctx.fillRect(sx+9,sy+19+t,8,1);ctx.fillRect(sx+9,sy+21+t,5,1); /* writing */
    if(stacked){ctx.fillStyle="#D0AC7C";ctx.fillRect(sx+7,sy+4,16,11);      /* the carton on top, one pixel off square */
      ctx.fillStyle="#B08E5E";ctx.fillRect(sx+7,sy+7.5,16,1.6);
      ctx.fillStyle="#EDE4D2";ctx.fillRect(sx+14,sy+4,2.5,7);}}
};
/* ---------- the four parcels, 2026-09-02 (Don Güero's plan; art per his notes) ----------
   "=" taller facade · "%" roll-up door · "6" Tacho's Caprice · "7" two-post lift with a car
   up · "8" red tool chest · "0" tire stack · "i" painted bay stripe (walkable) · "&" bakery
   facade · "!" cleaning-company facade · "▣" deck oven · "▯" file cabinet · "⊔" guest chair
   · "○" dog bed. Props are drawn from the front (they stand up as cutouts), so the same
   drawing serves as the side view. Every one goes through node test/tilesheet.js. */
const TILE_PROPS={
  "6":rc=>{const{sx,sy}=rc; /* Tacho's Caprice: a long burgundy sedan */
    ctx.fillStyle="#5E2222";ctx.fillRect(sx+8,sy+7,16,8);                    /* cabin */
    ctx.fillStyle="#BFD3E0";ctx.fillRect(sx+10,sy+8,5,6);ctx.fillRect(sx+17,sy+8,5,6); /* windows */
    ctx.fillStyle="#7A2E2E";ctx.fillRect(sx+2,sy+14,28,10);                   /* body */
    ctx.fillStyle="#C9CDD3";ctx.fillRect(sx+2,sy+22,28,1.5);                  /* chrome */
    ctx.fillStyle="#1E1E22";[8,24].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+25,4,0,7);ctx.fill();});
    ctx.fillStyle="#8E8E96";[8,24].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+25,1.6,0,7);ctx.fill();});},
  "7":rc=>{const{sx,sy}=rc; /* a two-post lift with a car up on it */
    ctx.fillStyle="#5A6470";ctx.fillRect(sx+5,sy+3,3,27);ctx.fillRect(sx+24,sy+3,3,27);ctx.fillRect(sx+5,sy+3,22,2);
    ctx.fillStyle="#8E98A3";ctx.fillRect(sx+8,sy+15,16,2);                    /* the arms */
    ctx.fillStyle="#3C5C8A";ctx.fillRect(sx+8,sy+9,16,6);ctx.fillStyle="#2C4468";ctx.fillRect(sx+11,sy+5,10,4);
    ctx.fillStyle="#BFD3E0";ctx.fillRect(sx+12,sy+6,3,3);ctx.fillRect(sx+17,sy+6,3,3);
    ctx.fillStyle="#1E1E22";[11,21].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+15,2.4,0,7);ctx.fill();});},
  "8":rc=>{const{sx,sy}=rc; /* the red rolling tool chest */
    ctx.fillStyle="#B3352B";ctx.fillRect(sx+5,sy+8,22,20);
    ctx.fillStyle="#7A1F17";for(let i=0;i<4;i++)ctx.fillRect(sx+5,sy+12+i*4,22,1);
    ctx.fillStyle="#C9CDD3";for(let i=0;i<4;i++)ctx.fillRect(sx+13,sy+9.5+i*4,6,1.4);
    ctx.fillStyle="#1E1E22";[8,24].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+29,2,0,7);ctx.fill();});
    ctx.fillStyle="#8E8E96";ctx.save();ctx.translate(sx+16,sy+6);ctx.rotate(-0.5);ctx.fillRect(-7,-1,14,2);ctx.restore();},
  "0":rc=>{const{sx,sy}=rc; /* a tire stack: a zero IS a tire */
    [24,17,10].forEach(py=>{ctx.fillStyle="#2E2E33";ctx.beginPath();ctx.ellipse(sx+16,sy+py,11,4.5,0,0,7);ctx.fill();
      ctx.fillStyle="#6B6B72";ctx.beginPath();ctx.ellipse(sx+16,sy+py-0.5,5,2,0,0,7);ctx.fill();});},
  "▣":rc=>{const{sx,sy}=rc; /* the deck oven */
    ctx.fillStyle="#4A4F57";ctx.fillRect(sx+3,sy+5,26,25);
    [10,19].forEach(py=>{ctx.fillStyle="#2A2E35";ctx.fillRect(sx+5,sy+py,22,7);
      ctx.fillStyle="#E8A24A";ctx.fillRect(sx+7,sy+py+2,18,2);ctx.fillStyle="#AEB6BE";ctx.fillRect(sx+7,sy+py+6,18,1);});},
  "▯":rc=>{const{sx,sy}=rc; /* the steel file cabinet, one drawer open */
    ctx.fillStyle="#7C8590";ctx.fillRect(sx+7,sy+4,18,26);
    ctx.fillStyle="#8E98A3";ctx.fillRect(sx+9,sy+9,14,9);ctx.fillRect(sx+9,sy+19,14,9);
    ctx.fillStyle="#E8D6B0";ctx.fillRect(sx+10,sy+7,12,3);                   /* folders peeking from the open drawer */
    ctx.fillStyle="#3A3F46";ctx.fillRect(sx+13,sy+13,6,1.5);ctx.fillRect(sx+13,sy+23,6,1.5);},
  "⊔":rc=>{const{sx,sy}=rc; /* a guest chair */
    ctx.fillStyle="#6E5334";ctx.fillRect(sx+7,sy+9,18,4);ctx.fillRect(sx+7,sy+9,3,8);ctx.fillRect(sx+22,sy+9,3,8);
    ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+7,sy+16,18,6);
    ctx.fillStyle="#5E3B20";ctx.fillRect(sx+8,sy+22,3,8);ctx.fillRect(sx+21,sy+22,3,8);},
  /* the trolley stop. It lived in the engine, where its drawing spelled MQT — a pack name in
     engine code, which is the one thing the portability law forbids. Moved here 2026-09-04. */
  "Y":rc=>{const{sx,sy,x,y}=rc; /* trolley stop: pole + sign + bench — the town's transit spine */
      ctx.fillStyle="#3B3F45";ctx.fillRect(sx+6,sy+5,3,22);
      ctx.fillStyle="#C0392B";ctx.fillRect(sx+2,sy+2,15,9);
      ctx.strokeStyle="rgba(15,12,20,.4)";ctx.lineWidth=1;ctx.strokeRect(sx+2,sy+2,15,9);
      ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.fillText("MQT",sx+4,sy+9);
      ctx.fillStyle="#8A6B3F";ctx.fillRect(sx+14,sy+21,15,3);
      ctx.fillRect(sx+15,sy+24,2,5);ctx.fillRect(sx+26,sy+24,2,5);},
  "○":rc=>{const{sx,sy}=rc; /* the dog bed */
    ctx.fillStyle="#7A5C8A";ctx.beginPath();ctx.ellipse(sx+16,sy+21,13,7,0,0,7);ctx.fill();
    ctx.fillStyle="#9A7CAA";ctx.beginPath();ctx.ellipse(sx+16,sy+21,9,4,0,0,7);ctx.fill();
    ctx.fillStyle="#F4F1EA";ctx.fillRect(sx+12,sy+20,8,2);[12,20].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+21,1.6,0,7);ctx.fill();});}
};
Object.assign(TILEART,TILE_PROPS,{
  "=":rc=>{const{sx,sy}=rc; /* taller facade: painted block, two slit windows, a red band */
    ctx.fillStyle=tc("#6E6A73");ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc("#5A5762");ctx.fillRect(sx,sy,TS,5);
    drawPanes(ctx,"=",sx,sy);                     /* two real slit windows, from TILES["="].win — they were two flat dark rectangles */
    ctx.fillStyle="#B3352B";ctx.fillRect(sx,sy+20,TS,4);},
  "%":rc=>{const{sx,sy}=rc; /* the roll-up door, half open */
    ctx.fillStyle="#3A3F46";ctx.fillRect(sx,sy,TS,TS);
    ctx.fillStyle="#8E98A3";ctx.fillRect(sx+2,sy,TS-4,20);
    ctx.fillStyle="#7C8590";for(let i=0;i<5;i++)ctx.fillRect(sx+2,sy+2+i*4,TS-4,1.2);
    ctx.fillStyle="#1E2126";ctx.fillRect(sx+2,sy+20,TS-4,12);                  /* the dark gap under it */
    ctx.fillStyle="#E0B45C";ctx.fillRect(sx+2,sy+19,TS-4,1.5);},
  "i":rc=>{const{sx,sy}=rc; /* a painted bay stripe on concrete — walkable */
    ctx.fillStyle="#E0B45C";ctx.fillRect(sx+4,sy+14,24,3);ctx.fillRect(sx+6,sy+9,2,5);ctx.fillRect(sx+24,sy+9,2,5);},
  "&":rc=>{const{sx,sy}=rc; /* bakery facade: cream front, striped awning, a round window with three conchas */
    ctx.fillStyle=tc("#F2E8D8");ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc("#D9A441");ctx.fillRect(sx,sy,TS,5);
    for(let i=0;i<8;i++){ctx.fillStyle=i%2?"#F2E8D8":"#D9A441";ctx.fillRect(sx+i*4,sy+9,4,4);}
    ctx.fillStyle="#8F6440";ctx.beginPath();ctx.arc(sx+16,sy+21,8.5,0,7);ctx.fill();
    ctx.fillStyle="#F8F0E0";ctx.beginPath();ctx.arc(sx+16,sy+21,7,0,7);ctx.fill();
    [["#D9A441",11,21],["#C98A2D",16,19],["#E8B85A",21,21]].forEach(c=>{ctx.fillStyle=c[0];ctx.beginPath();ctx.arc(sx+c[1],sy+c[2],2.6,0,7);ctx.fill();});},
  "!":rc=>{const{sx,sy}=rc; /* cleaning-company facade: white front, a sign band, a wide window with a mop and bucket */
    ctx.fillStyle=tc("#F4F1EA");ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc("#3FA3A0");ctx.fillRect(sx,sy,TS,5);ctx.fillRect(sx,sy+6,TS,4);
    ctx.fillStyle="#CFE9E8";ctx.fillRect(sx+5,sy+12,22,14);
    ctx.fillStyle="#3FA3A0";ctx.fillRect(sx+9,sy+19,7,5);ctx.fillRect(sx+20,sy+13,1.5,9);ctx.fillRect(sx+17,sy+21,8,3);
    drawPanes(ctx,"!",sx,sy,{glass:false});}
    /* "&" is deliberately NOT here: the bakery's window is a round ojo de buey, and a round window
       has no sill. Its `win` rect exists so the dusk lighting has something to warm. */
});
/* ---- the office wall: blank paper, and the paper that earned its place ----
   Both are WALL tiles like the window, so the 3D camera paints them on the wall face.
   `▭` hangs from day one and says nothing (owner's call, 2026-09-03: "blank paper,
   unlabelled"); a district's ribbon swaps it for `▤` when its document exists. */
TILEART["▭"]=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=C.wall;ctx.fillRect(sx,sy,32,32);
  ctx.fillStyle="rgba(0,0,0,.22)";ctx.fillRect(sx+9,sy+8,15,19);
  ctx.fillStyle="#EFE7D2";ctx.fillRect(sx+8,sy+7,15,19);
  ctx.fillStyle="#DCD2B8";ctx.fillRect(sx+8,sy+7,15,2);};
TILEART["▤"]=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=C.wall;ctx.fillRect(sx,sy,32,32);
  /* three sheets, stapled, the top one square to the wall */
  ctx.fillStyle="rgba(0,0,0,.25)";ctx.fillRect(sx+9,sy+7,16,20);
  ctx.fillStyle="#E4DAC0";ctx.fillRect(sx+7,sy+6,16,20);
  ctx.fillStyle="#EFE7D2";ctx.fillRect(sx+8,sy+5,16,20);
  ctx.fillStyle="#F7F2E4";ctx.fillRect(sx+8,sy+4,15,20);
  ctx.fillStyle="#2E5FA8";ctx.fillRect(sx+10,sy+6,11,2);            /* the header bar */
  ctx.fillStyle="#9A9384";                                           /* lines of type */
  [10,13,16,19].forEach((r,i)=>ctx.fillRect(sx+10,sy+r-0.5,(i%2?8:11),1));
  ctx.fillStyle="#C0392B";ctx.fillRect(sx+16,sy+19,5,3);             /* the stamp */
  ctx.fillStyle="#9AA1A8";ctx.fillRect(sx+9,sy+5,4,1.6);};           /* the staple */

/* ================================================================================================
   THE RUG, THE CRATE AND THE COUNTER — docs/BEAUTIFY.md's build order, items 1 and 2.

   All three are PACK art. The engine's own drawings for R, H and I stay where they are and every
   world that is not Meridian keeps them; this file overrides them for this pack only, which is why
   none of this bumps GAMEV and none of it can change what another world draws.

   What was wrong with each, in the words of the audit:
   · R — "four blank lavender squares, no thickness, no border, visible seam". The seam was literal:
     the engine drew `fillRect(sx+2,sy+2,TS-4,TS-4)`, so two rug tiles side by side left four pixels
     of floor showing between them and the rug read as a texture that failed to load.
   · H — "cutout, no side drawing" on the most box-shaped object in the game.
   · I — "cutout, four identical pictures in a row", so a counter run read as four counters.
   ============================================================================================== */

/* ---- THE RUG. ONE RUG, NOT FOUR SQUARES. ----
   A rug is one object that happens to cover several tiles, so the drawing asks its neighbours what
   they are and only puts a border where the rug actually ENDS. The weave is keyed on the tile's
   absolute position, never on sx/sy, so the pattern runs straight through the joins instead of
   restarting in every square — that restart is what makes tiled art read as tiles.
   Colour is derived from C.rug and passed through tc(), so a theme still repaints it exactly as it
   repainted the flat square. */
TILEART["R"]=rc=>{const{sx,sy,x,y}=rc;
  const w=CW(),rug=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="R";};
  const N=!rug(x,y-1),S=!rug(x,y+1),E=!rug(x+1,y),Wt=!rug(x-1,y);
  const field=tc(C.rug),
        deep =tc(mixHex(C.rug,"#2B2536",0.38)),      /* the border band */
        mid  =tc(mixHex(C.rug,"#2B2536",0.16)),      /* the weave, one step down */
        pale =tc(mixHex(C.rug,"#FFF6E4",0.34)),      /* the keyline, and the lit side of the pile */
        warm =tc(mixHex(C.rug,"#B0563A",0.34));      /* the motif — a wool rug is dyed, not printed */
  ctx.fillStyle=field;ctx.fillRect(sx,sy,TS,TS);     /* EDGE TO EDGE. The inset WAS the seam. */

  /* THE WEAVE, AND WHY IT IS NOT A GRID. The first pass ruled a tick every second pixel in both
     directions and the rug came back reading as graph paper: a regular lattice is what a TEXTURE
     looks like, and the fault being fixed was the rug reading as a texture. Wool is a warp you can
     see and a weft you can only half see, so the warp runs as broken pile in one direction only and
     the weft is a short dash that skips — which at 32 px is the difference between cloth and paper.
     Keyed on the tile's absolute position, never on sx/sy, so it runs straight through the joins. */
  const gx0=x*TS,gy0=y*TS;
  ctx.fillStyle=mid;
  for(let j=0;j<TS;j++){const ay=gy0+j;if(ay%3===0)for(let i=((ay>>1)+gx0)%3;i<TS;i+=6)
    ctx.fillRect(sx+i,sy+j,3,1);}                                   /* the weft, skipping */
  ctx.fillStyle="rgba(255,255,255,.07)";
  for(let i=0;i<TS;i++){if((gx0+i)%4===1)ctx.fillRect(sx+i,sy,1,TS);} /* the warp, only just there */
  /* the motif: a dyed diamond on every second tile of the run, on the absolute grid, so a run
     carries a repeat and one lone rug tile still carries one diamond. Wool takes dye — the audit's
     complaint was that the rug had no pattern, and a pattern you have to hunt for is no pattern. */
  if(((x+y)&1)===0){
    ctx.fillStyle=warm;
    ctx.beginPath();ctx.moveTo(sx+16,sy+6);ctx.lineTo(sx+26,sy+16);
    ctx.lineTo(sx+16,sy+26);ctx.lineTo(sx+6,sy+16);ctx.closePath();ctx.fill();
    ctx.fillStyle=deep;
    ctx.beginPath();ctx.moveTo(sx+16,sy+10);ctx.lineTo(sx+22,sy+16);
    ctx.lineTo(sx+16,sy+22);ctx.lineTo(sx+10,sy+16);ctx.closePath();ctx.fill();
    ctx.fillStyle=pale;
    ctx.beginPath();ctx.moveTo(sx+16,sy+13);ctx.lineTo(sx+19,sy+16);
    ctx.lineTo(sx+16,sy+19);ctx.lineTo(sx+13,sy+16);ctx.closePath();ctx.fill();}

  /* ---- the edge. Border band, keyline inside it, and a fringe on the two ends that are open. ---- */
  const B=3.5;
  ctx.fillStyle=deep;
  if(N)ctx.fillRect(sx,sy,TS,B);             if(S)ctx.fillRect(sx,sy+TS-B,TS,B);
  if(Wt)ctx.fillRect(sx,sy,B,TS);            if(E)ctx.fillRect(sx+TS-B,sy,B,TS);
  ctx.fillStyle=pale;
  if(N)ctx.fillRect(sx,sy+B,TS,1);           if(S)ctx.fillRect(sx,sy+TS-B-1,TS,1);
  if(Wt)ctx.fillRect(sx+B,sy,1,TS);          if(E)ctx.fillRect(sx+TS-B-1,sy,1,TS);
  /* THICKNESS. A rug is a few millimetres thick and the audit's word was "no thickness": the key is
     upper-left, so the lit edge goes on the north and west and the shade on the south and east. */
  ctx.fillStyle="rgba(255,255,255,.20)";
  if(N)ctx.fillRect(sx,sy,TS,1);             if(Wt)ctx.fillRect(sx,sy,1,TS);
  ctx.fillStyle="rgba(20,16,28,.26)";
  if(S)ctx.fillRect(sx,sy+TS-1,TS,1);        if(E)ctx.fillRect(sx+TS-1,sy,1,TS);
  /* fringe, on the open north and south ends only — the thing that says wool and not lino */
  ctx.fillStyle=pale;
  if(N)for(let i=2;i<TS-1;i+=3)ctx.fillRect(sx+i,sy,1,2);
  if(S)for(let i=2;i<TS-1;i+=3)ctx.fillRect(sx+i,sy+TS-2,1,2);
};

/* ---- THE PRODUCE CRATE. It is a box, so it stands as one. ----
   TILEMETA below marks it box:true and TILEART_SIDE gives it the front the box wears on all four
   faces; engine3d.js:259 needs BOTH or it stays a cutout. Top-down it keeps the engine's fruit — the
   quarrel was never with the tomato — and gains the rim, the slats and the inside wall that make the
   fruit sit IN something. Two silhouettes by tile parity, the engine's own idiom, so eight crates in
   a row are not one crate stamped eight times. */
TILEART["H"]=rc=>{const{sx,sy,x,y}=rc;const alt=(((x*3+y*5)%7)+7)%7;
  ctx.fillStyle="#7A5B36";ctx.fillRect(sx+2,sy+8,TS-4,TS-11);            /* the crate, from above */
  ctx.fillStyle="#9A7548";ctx.fillRect(sx+3,sy+9,TS-6,TS-13);            /* the inside wall, lit */
  ctx.fillStyle="#5E4527";ctx.fillRect(sx+4,sy+13,TS-8,TS-18);           /* the shadowed well */
  ctx.fillStyle="#B0895B";ctx.fillRect(sx+2,sy+8,TS-4,2.6);              /* the near rim, catching the key */
  ctx.fillStyle="rgba(255,255,255,.22)";ctx.fillRect(sx+2,sy+8,TS-4,1);
  ctx.fillStyle="#8B6A42";ctx.fillRect(sx+2,sy+TS-5,TS-4,2.2);           /* the far rim, in its own shade */
  ctx.fillStyle="#6B4F2E";ctx.fillRect(sx+2,sy+8,1.6,TS-11);ctx.fillRect(sx+TS-3.6,sy+8,1.6,TS-11);
  const F=alt<3?[[10,13,"tomato"],[17,11,"chile"],[23,14,"banana"]]
         :alt<5?[[11,12,"chile"],[18,14,"tomato"],[24,12,"tomato"]]
               :[[10,14,"banana"],[16,11,"tomato"],[22,13,"chile"]];
  F.forEach(f=>produce(sx+f[0],sy+f[1],f[2],1.3));
  ctx.fillStyle="rgba(20,14,8,.22)";ctx.fillRect(sx+4,sy+13,TS-8,1.4);   /* the rim's shadow on the fruit */
};

/* ---- THE SHOP COUNTER. Four tiles, ONE counter. ----
   The audit's words were "four identical pictures in a row", and the fix is the same as the rug's:
   ask the neighbours. The top is continuous across the run and only the two ENDS get a cap, the
   plank joins fall on the absolute grid so they do not restart in each tile, and the scale — the one
   object that must not appear four times — stands on the leftmost tile of the run and nowhere else. */
TILEART["I"]=rc=>{const{sx,sy,x,y}=rc;
  const w=CW(),cnt=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="I";};
  const Wt=!cnt(x-1,y),E=!cnt(x+1,y),head=Wt;                  /* the scale stands at the run's head */
  ctx.fillStyle="#8B6A42";ctx.fillRect(sx,sy+6,TS,TS-10);                /* the carcase */
  ctx.fillStyle="#A8825A";ctx.fillRect(sx,sy+6,TS,TS-13);                /* the top, lit */
  ctx.fillStyle="rgba(255,255,255,.16)";ctx.fillRect(sx,sy+6,TS,1.2);    /* the worn front edge */
  ctx.fillStyle="rgba(28,18,8,.30)";ctx.fillRect(sx,sy+TS-5,TS,1.4);     /* and the shade under the back */
  ctx.fillStyle="rgba(94,69,39,.55)";                                    /* plank joins, on the world grid */
  for(let gx=x*TS;gx<x*TS+TS;gx++)if(gx%11===0)ctx.fillRect(sx+(gx-x*TS),sy+6,1,TS-13);
  ctx.fillStyle="#6B4F2E";                                               /* END CAPS, and only there */
  if(Wt)ctx.fillRect(sx,sy+6,1.8,TS-10);
  if(E)ctx.fillRect(sx+TS-1.8,sy+6,1.8,TS-10);
  if(head){                                                              /* the scale — ONCE per run */
    ctx.fillStyle="rgba(20,16,10,.26)";ctx.beginPath();
    ctx.ellipse(sx+16,sy+21,8,2.4,0,0,7);ctx.fill();                     /* it sits ON the counter */
    ctx.fillStyle="#5F676F";ctx.fillRect(sx+15,sy+13,2,7);               /* post */
    ctx.fillStyle="#C9CDD2";ctx.fillRect(sx+9,sy+19,14,2.5);             /* tray */
    ctx.fillStyle="rgba(255,255,255,.35)";ctx.fillRect(sx+9,sy+19,14,1);
    ctx.fillStyle="#EEF0F2";ctx.beginPath();ctx.arc(sx+16,sy+10,4.4,0,7);ctx.fill();   /* dial */
    ctx.strokeStyle="#5F676F";ctx.lineWidth=1;ctx.beginPath();ctx.arc(sx+16,sy+10,4.4,0,7);ctx.stroke();
    ctx.fillStyle="#C0392B";ctx.fillRect(sx+16,sy+7.4,1,3);              /* the needle, reading something */
    produce(sx+16,sy+17,"tomato",1.15);}
};

/* ---- THE STAIRWELL DIVIDER IS GLASS (owner, 2026-09-16) ----
   "the stairs appear on the other side of this wall... looks abstract artish but clearly
   fucked up stairs - want to spicy it up and make it a glass divider."

   THE INTERESTING PART IS THAT SEEING THE STAIRS THROUGH IT IS NOT A BUG. The engine's own rail
   is knee-high and see-through on purpose, so a flight below stays visible — that is correct, and
   it is why the stairs read "on the other side". What was wrong is that a timber rail with four
   balusters gives the eye a picket fence and then a stepped grey mass behind it, and at this size
   those two readings fight: the stairs come out as abstract slabs because nothing frames them.

   Glass does the same job and admits it. A full-height pane says LOOK THROUGH ME, the steel cap
   says WHERE THE EDGE IS, and the flight behind stops being an accident of transparency and
   becomes the thing on show. Same tile, same solidity, same lift — this is PACK ART, so the
   engine's own rail is untouched and every other world keeps the timber one.

   The pane is drawn with the light model this project already uses: one warm key upper-left, so a
   glass sheet takes a bright streak across the top corner and a cool sky tone down the shadow
   side, and the steel cap is the same stainless the kitchen uses (#B9BCC0, Δ106 from the room's
   own browns, which is why it reads at a glance). */
const GLASSCAP="#B9BCC0", GLASSCAPL="#D4D8DC", GLASSPOST="#5F676F";
TILEART["◺"]=rc=>{const{sx,sy}=rc;      /* from above: the cap rail, and the pane's own thin line */
  ctx.fillStyle="rgba(150,190,205,.22)";ctx.fillRect(sx,sy+10,TS,7);   /* the pane, edge on */
  ctx.fillStyle=GLASSPOST;[2,15,28].forEach(px=>ctx.fillRect(sx+px,sy+10,2.5,7));
  ctx.fillStyle=GLASSCAP;ctx.fillRect(sx,sy+12,TS,3.2);
  ctx.fillStyle=GLASSCAPL;ctx.fillRect(sx,sy+12,TS,1.2);
  ctx.fillStyle="rgba(20,16,28,.26)";ctx.fillRect(sx,sy+15.2,TS,1);};  /* its shade on the floor */
TILEART_SIDE_GLASS=rc=>{const{sx,sy}=rc; /* in elevation: a pane you see the flight through */
  const top=sy+6, bot=sy+30;
  ctx.fillStyle="rgba(10,8,14,.20)";ctx.fillRect(sx,bot-1,TS,2);        /* it meets the floor */
  ctx.fillStyle="rgba(158,196,210,.15)";ctx.fillRect(sx,top+3,TS,bot-top-3);
  /* the key catches the sheet: one broad streak across the upper corner, one thin one under it */
  ctx.save();ctx.beginPath();ctx.rect(sx,top+3,TS,bot-top-3);ctx.clip();
  ctx.fillStyle="rgba(255,252,240,.20)";
  ctx.beginPath();ctx.moveTo(sx-6,bot);ctx.lineTo(sx+13,top);ctx.lineTo(sx+20,top);
  ctx.lineTo(sx+1,bot);ctx.closePath();ctx.fill();
  ctx.fillStyle="rgba(255,252,240,.12)";
  ctx.beginPath();ctx.moveTo(sx+16,bot);ctx.lineTo(sx+27,top);ctx.lineTo(sx+30,top);
  ctx.lineTo(sx+19,bot);ctx.closePath();ctx.fill();
  ctx.restore();
  ctx.fillStyle=GLASSPOST;[1.5,15,28].forEach(px=>ctx.fillRect(sx+px,top+2,2.4,bot-top-2));
  ctx.fillStyle="rgba(255,255,255,.22)";[1.5,15,28].forEach(px=>ctx.fillRect(sx+px,top+2,.9,bot-top-2));
  ctx.fillStyle=GLASSCAP;ctx.fillRect(sx,top,TS,4);                     /* the steel cap rail */
  ctx.fillStyle=GLASSCAPL;ctx.fillRect(sx,top,TS,1.4);
  ctx.fillStyle="rgba(20,16,28,.34)";ctx.fillRect(sx,top+4,TS,1.2);     /* its own shadow on the pane */
};

const TILEART_SIDE=Object.assign({},TILE_PROPS);
TILEART_SIDE["Y"]=rc=>{const{sx,sy}=rc; /* THE TROLLEY STOP, STANDING. It was walkable with no TILES
      row and no profile, so the front camera and the 3D ground bake painted its top-down art flat
      onto the pavement — owner, 2026-09-04: "the bus stop is also just a painting on the floor."
      Same bug class as the stairs, same fix: a `stand` tile with a side view. What makes a stop
      read as TRANSIT and not as a lamp post is the sign held out ACROSS the pole, at head height,
      with a bench under it. */
  ctx.fillStyle="rgba(15,12,20,.18)";                                        /* CONTACT SHADOW — plants pole and bench on the pavement */
  ctx.beginPath();ctx.ellipse(sx+17,sy+30.2,13,2.1,0,0,7);ctx.fill();
  ctx.fillStyle="#6E5334";ctx.fillRect(sx+17,sy+23,2,7);ctx.fillRect(sx+27.5,sy+23,2,7); /* BENCH LEGS */
  ctx.fillStyle="#7A5C36";ctx.fillRect(sx+16.5,sy+15,1.8,7);ctx.fillRect(sx+28,sy+15,1.8,7); /* back uprights */
  ctx.fillStyle="#8A6B3F";ctx.fillRect(sx+16,sy+16,14,2.2);                  /* BACK RAIL */
  ctx.fillStyle="#8A6B3F";ctx.fillRect(sx+15,sy+21,15.5,2.6);                /* SEAT SLAT */
  ctx.fillStyle="rgba(255,255,255,.16)";ctx.fillRect(sx+15,sy+21,15.5,1);    /* the sun catches the seat edge — key light upper-left */
  ctx.fillStyle="rgba(15,12,20,.30)";ctx.fillRect(sx+15,sy+23.2,15.5,1);     /* shadow under the seat, so it is a plank and not a stripe */
  ctx.fillStyle="#3B3F45";ctx.fillRect(sx+8,sy+4,3.2,26);                    /* POLE */
  ctx.fillStyle="rgba(255,255,255,.18)";ctx.fillRect(sx+8,sy+4,1,26);        /* its lit edge */
  ctx.fillStyle="#2A2D33";ctx.fillRect(sx+6.5,sy+28.8,6,1.8);                /* the base plate it is bolted to */
  ctx.fillStyle="#2A2D33";ctx.fillRect(sx+2,sy+2,19,11.5);                   /* SIGN BACKING — gives the board thickness */
  ctx.fillStyle="#C0392B";ctx.fillRect(sx+2.6,sy+2.6,17.8,10.3);
  ctx.fillStyle="rgba(255,255,255,.14)";ctx.fillRect(sx+2.6,sy+2.6,17.8,1.2);
  ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.fillText("MQT",sx+5,sy+10);
};
TILEART_SIDE["◺"]=TILEART_SIDE_GLASS;   /* the divider stands as glass in every camera that sees it stand */
TILEART_SIDE["□"]=TILEART["□"]; /* cardboard and tape read the same from the side — it stands as a real box in 3D */ /* the props stand up wearing the same drawing */

/* ---- THE CRATE AND THE COUNTER, STANDING. ----
   engine3d.js:259 makes a tile a BOX only if it is marked box:true AND the pack drew it a side; with
   one and not the other it stays a cutout, which is the state both of these were in. Drawn to the
   same light as everything else on this street: key upper-left, one contact shadow, the lit edge on
   the north and west and the shade on the south and east. */
TILEART_SIDE["H"]=rc=>{const{sx,sy,x,y}=rc;const alt=(((x*3+y*5)%7)+7)%7;
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.beginPath();
  ctx.ellipse(sx+16,sy+30.4,12,2,0,0,7);ctx.fill();                      /* it stands on the floor */
  ctx.fillStyle="#8B6A42";ctx.fillRect(sx+3,sy+12,TS-6,18);              /* the body */
  ctx.fillStyle="#6B4F2E";ctx.fillRect(sx+3,sy+12,2.6,18);ctx.fillRect(sx+TS-5.6,sy+12,2.6,18); /* corner posts */
  ctx.fillStyle="#A87F4F";                                               /* three slats, gaps between */
  [14.5,20,25.5].forEach(t=>ctx.fillRect(sx+5.6,sy+t,TS-11.2,3.6));
  ctx.fillStyle="rgba(255,255,255,.18)";
  [14.5,20,25.5].forEach(t=>ctx.fillRect(sx+5.6,sy+t,TS-11.2,1));        /* each slat's lit top edge */
  ctx.fillStyle="rgba(20,14,8,.34)";
  [14.5,20,25.5].forEach(t=>ctx.fillRect(sx+5.6,sy+t+3.6,TS-11.2,0.9));  /* and the shade under it */
  ctx.fillStyle="#B0895B";ctx.fillRect(sx+2,sy+10,TS-4,2.6);             /* the top rim, in front */
  ctx.fillStyle="rgba(255,255,255,.24)";ctx.fillRect(sx+2,sy+10,TS-4,1);
  const F=alt<3?[[10,8,"tomato"],[17,6,"chile"],[23,9,"banana"]]         /* produce over the rim */
         :alt<5?[[11,7,"chile"],[18,9,"tomato"],[24,7,"tomato"]]
               :[[10,9,"banana"],[16,6,"tomato"],[22,8,"chile"]];
  F.forEach(f=>produce(sx+f[0],sy+f[1],f[2],1.3));
};
TILEART_SIDE["I"]=rc=>{const{sx,sy,x,y}=rc;
  const w=CW(),cnt=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="I";};
  const Wt=!cnt(x-1,y),E=!cnt(x+1,y),head=Wt;
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.fillRect(sx,sy+29.6,TS,2);      /* it meets the floor in a line,
                                                                            not an ellipse — it is a run */
  ctx.fillStyle="#8B6A42";ctx.fillRect(sx,sy+13,TS,17);                  /* the front */
  ctx.fillStyle="#7A5B36";ctx.fillRect(sx,sy+26,TS,4);                   /* the kick, set back in shade */
  ctx.fillStyle="#A8825A";ctx.fillRect(sx,sy+11,TS,2.4);                 /* the worked top, seen edge-on */
  ctx.fillStyle="rgba(255,255,255,.22)";ctx.fillRect(sx,sy+11,TS,1);
  ctx.fillStyle="rgba(28,18,8,.32)";ctx.fillRect(sx,sy+13.4,TS,1);       /* the line under the top */
  ctx.fillStyle="rgba(94,69,39,.55)";                                    /* one panel line per tile, on
                                                                            the world grid so it runs */
  for(let gx=x*TS;gx<x*TS+TS;gx++)if(gx%11===0)ctx.fillRect(sx+(gx-x*TS),sy+15,1,10);
  ctx.fillStyle="#6B4F2E";
  if(Wt)ctx.fillRect(sx,sy+11,1.8,19);
  if(E)ctx.fillRect(sx+TS-1.8,sy+11,1.8,19);
  if(head){                                                              /* the scale, standing, once */
    ctx.fillStyle="#5F676F";ctx.fillRect(sx+15,sy+5,2,6);
    ctx.fillStyle="#C9CDD2";ctx.fillRect(sx+10,sy+9.4,12,2);
    ctx.fillStyle="#EEF0F2";ctx.beginPath();ctx.arc(sx+16,sy+3.4,3.6,0,7);ctx.fill();
    ctx.strokeStyle="#5F676F";ctx.lineWidth=1;ctx.beginPath();ctx.arc(sx+16,sy+3.4,3.6,0,7);ctx.stroke();
    ctx.fillStyle="#C0392B";ctx.fillRect(sx+16,sy+1.4,1,2.4);
    produce(sx+16,sy+8,"tomato",1.1);}
};
const TILEMETA={"▭":{lift:13,kind:"wall"},"▤":{lift:13,kind:"wall"},
  /* H and I were cutouts in 3D (docs/BEAUTIFY.md: "the most box-shaped object in the game"). These
     two rows and the two TILEART_SIDE drawings above are the whole fix, and neither reaches the
     engine's own H and I — a world with no art.js still gets those. lift and kind are left exactly
     as the engine set them; only `box` is added. */
  "H":{box:true},"I":{box:true},
  
  "|":{lift:13,kind:"wall"},
  "□":{lift:5,kind:"prop",box:true},
  "=":{lift:13,kind:"facade",win:[[6,8,7,6],[19,8,7,6]]},
  "6":{lift:8,kind:"prop"},"7":{lift:12,kind:"prop"},"8":{lift:9,kind:"furniture"},"0":{lift:6,kind:"prop"},
  "&":{lift:13,kind:"facade",win:[[7,12,18,11]],awn:9},
  "!":{lift:13,kind:"facade",win:[[5,12,22,14]]},  /* was [5,11,22,12]; the art paints (5,12,22,14) and the two have to agree — the joinery, the dusk light and any sill prop all come off this rect */
  "▣":{lift:10,kind:"appliance"},"▯":{lift:9,kind:"furniture"},"⊔":{lift:6,kind:"furniture"},"○":{lift:3,kind:"prop"},
  "Y":{lift:13,kind:"transit",stand:true}   /* walkable, but a real object: nothing reads lift for a stand tile, it is a height class */
};

/* ---------- DECOART — the mural on Calle Principal ----------
   Nacho's wall, east of HQ's door. Seven tiles: his own Meridian Quest piece, then one panel
   per business. A panel nobody has worked yet is BABY BLUE PLASTER — the owner's call
   (2026-09-03): comforting, part of the painting, and it never reads as a list of things you
   have not done. When you begin a district the panel gets its colour; how bright it is comes
   from the grade the engine hands over in worldFlags(). Paint only ever goes on.

   All of this is content: the engine renders decor in four cameras and knows nothing about
   bakeries. AJ's pack draws its own wall, or declares no DECOR at all and has a plain one. */

const PLASTER="#C6DCEA";               /* baby blue — the wall under everything */
const PLASTER_D="#AFCADC";

function muralGround(sx,sy){
  ctx.fillStyle=PLASTER;ctx.fillRect(sx,sy,32,32);
  /* trowel marks, so it reads as plaster and not a flat rectangle */
  ctx.fillStyle=PLASTER_D;
  [[2,5,11,1],[16,9,9,1],[6,17,13,1],[19,24,8,1],[3,28,10,1]].forEach(q=>ctx.fillRect(sx+q[0],sy+q[1],q[2],q[3]));
  ctx.fillStyle="rgba(255,255,255,.18)";ctx.fillRect(sx,sy,32,3);
}
/* how loud a panel is painted: 0 = not begun (plaster only), 1 = pale, 2 = solid, 3 = full */
const muralInk=(hex,g)=>{
  if(g>=3)return hex;
  const m=/^#(..)(..)(..)$/.exec(hex);if(!m)return hex;
  const mix=g>=2?0.22:0.48;                                  /* toward the plaster */
  const p=[0xC6,0xDC,0xEA];
  return "#"+[1,2,3].map(i=>Math.round(parseInt(m[i],16)*(1-mix)+p[i-1]*mix).toString(16).padStart(2,"0")).join("");
};
const MURAL_K=0.72; /* the emblem, into the field the kept window leaves: its own (16,16) lands at (9.5,17.5). A transform, not six redrawings — the composition around the window is the owner's open call above. */
const muralGrade=id=>{try{const f=worldFlags();return (f.grade&&f.grade[id])|0;}catch(e){return 0;}};

/* the panel pictograms — one per business, drawn inside a 32x32 tile on the plaster */
const PANELART={
  principal:(sx,sy,c)=>{ /* Meridian Labs: a tower and a window grid */
    ctx.fillStyle=c;ctx.fillRect(sx+9,sy+8,14,19);
    ctx.fillStyle=PLASTER;[0,1,2].forEach(r=>[0,1].forEach(k=>ctx.fillRect(sx+12+k*6,sy+11+r*5,3,3)));},
  mercado:(sx,sy,c)=>{ /* El Mercado: a basket of produce */
    ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(sx+8,sy+16);ctx.lineTo(sx+24,sy+16);
    ctx.lineTo(sx+21,sy+27);ctx.lineTo(sx+11,sy+27);ctx.closePath();ctx.fill();
    ctx.fillStyle=PLASTER;[10,14,18].forEach((x,i)=>ctx.fillRect(sx+x,sy+19+(i%2),3,5));
    ctx.fillStyle=c;[[12,12],[16,10],[20,12]].forEach(q=>{ctx.beginPath();ctx.arc(sx+q[0],sy+q[1],3,0,7);ctx.fill();});},
  taller:(sx,sy,c)=>{ /* Taller Herrera: a wrench across a wheel */
    ctx.strokeStyle=c;ctx.lineWidth=3;ctx.beginPath();ctx.arc(sx+16,sy+18,7,0,7);ctx.stroke();
    ctx.lineWidth=4;ctx.lineCap="round";ctx.beginPath();ctx.moveTo(sx+9,sy+26);ctx.lineTo(sx+23,sy+9);ctx.stroke();
    ctx.fillStyle=c;ctx.beginPath();ctx.arc(sx+23,sy+8,4,0,7);ctx.fill();
    ctx.fillStyle=PLASTER;ctx.beginPath();ctx.arc(sx+24,sy+6,2,0,7);ctx.fill();},
  espiga:(sx,sy,c)=>{ /* La Espiga: a wheat ear over a loaf */
    ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(sx+16,sy+24,9,4,0,0,7);ctx.fill();
    ctx.strokeStyle=c;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(sx+16,sy+19);ctx.lineTo(sx+16,sy+6);ctx.stroke();
    ctx.fillStyle=c;[0,1,2,3].forEach(i=>{[-1,1].forEach(k=>{
      ctx.beginPath();ctx.ellipse(sx+16+k*4,sy+8+i*3,3,1.8,k*0.7,0,7);ctx.fill();});});},
  velazquez:(sx,sy,c)=>{ /* Limpieza Velázquez: a bucket and a mop */
    ctx.fillStyle=c;ctx.beginPath();ctx.moveTo(sx+7,sy+16);ctx.lineTo(sx+19,sy+16);
    ctx.lineTo(sx+17,sy+27);ctx.lineTo(sx+9,sy+27);ctx.closePath();ctx.fill();
    ctx.strokeStyle=c;ctx.lineWidth=2;ctx.beginPath();ctx.arc(sx+13,sy+15,6,Math.PI,0);ctx.stroke();
    ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx+24,sy+6);ctx.lineTo(sx+24,sy+22);ctx.stroke();
    ctx.fillStyle=c;ctx.fillRect(sx+21,sy+22,7,5);},
  nolasco:(sx,sy,c)=>{ /* Nolasco: a stamp coming down on a page */
    ctx.fillStyle=c;ctx.fillRect(sx+8,sy+15,14,12);
    ctx.fillStyle=PLASTER;[18,21,24].forEach((y,i)=>ctx.fillRect(sx+10,sy+y-2,10-i*2,1.4));
    ctx.fillStyle=c;ctx.fillRect(sx+12,sy+7,10,4);ctx.fillRect(sx+15,sy+3,4,4);},
};

const DECOART={
  /* Nacho's own piece: the city's name on the wall, always here, never earned */
  mural:(sx,sy)=>{
    muralGround(sx,sy);
    ctx.fillStyle="#E8A24A";ctx.beginPath();ctx.arc(sx+16,sy+13,7,Math.PI,0);ctx.fill();   /* a sun over the street */
    ctx.fillStyle="#C0392B";ctx.fillRect(sx+4,sy+20,24,3);
    ctx.fillStyle="#2E5FA8";ctx.fillRect(sx+4,sy+24,24,3);
    ctx.fillStyle="#4E8A58";ctx.fillRect(sx+4,sy+28,24,2);
    /* 7 units, the floor for in-scene text (SCENE_MIN): at 6 the word arrived around five CSS
       pixels tall on a phone and read as a smudge on the mural rather than the town's name.
       "MERIDIAN" is nine characters across 24 units, so it is condensed rather than shrunk. */
    ctx.fillStyle="#3A2F17";ctx.font="700 7px sans-serif";ctx.textAlign="center";
    ctx.save();ctx.translate(sx+16,sy+7.5);ctx.scale(0.88,1);
    ctx.fillText("MERIDIAN",0,0);ctx.restore();ctx.textAlign="start";},
  /* one panel per business: plaster until you begin, then colour that brightens with the grade.
     THE WALL KEEPS ITS WINDOWS (owner, 2026-09-17: "the store front icon or mural can go around
     it"). This painted plaster over the whole 32x32 and then the sill props were drawn on top of
     it, so at st(22,0) a lit pane, a sugar skull and a stone ledge sat in the middle of a blank
     wall with no window anywhere near them — which is exactly what he was looking at when he wrote
     "the skull on a non existing or visible window sill". A mural is painted ON a building; the
     windows are holes and holes do not take paint. So: plaster, the shop's emblem, and then the
     wall's own windows back through the paint, from the glyph's own TILES.win — never a copy of
     those numbers here, or the mural and the sill drift apart the first time one of them moves. */
  panel:(sx,sy,d)=>{
    muralGround(sx,sy);
    /* ONE window kept, the right-hand one, and it is the wall's own — winsOf reads TILES, so the
       glass, the ledge and the sugar skull are all placed from the same numbers and cannot drift.
       The other window is plastered over, which is what a muralist does with a window they do not
       want: the wall is the canvas and you paint out what is in the way. The DECOR row says so
       (`wins:[1]`) rather than this drawing deciding on its own, so the sill props and the dusk
       lighting paint out the same window this does. That also hands the emblem
       a clear field, which is the whole reason the two-window version was unreadable — rendered at
       8x on 2026-09-17, the basket and the wrench came out as ribbons between the panes.
       OPEN, and the owner's own call ("while we figure it out"): the emblem drawn AROUND the window
       instead of beside it — the skull on the sill as part of the picture. That is six drawings,
       one per business, and it is design, not plumbing. */
    const wins=winsKept(d.world,d.x,d.y),keep=wins[wins.length-1];  /* what this panel's DECOR row leaves (maps.js: wins:[1]) — the same list propSill and the dusk lighting read */
    const g=muralGrade(d.id),f=PANELART[d.id];
    if(g&&f){                               /* not begun: comforting blue, and nothing else */
      const ink=muralInk(d.c||"#C0392B",g);
      if(keep){ctx.save();ctx.translate(sx+9.5,sy+17.5);ctx.scale(MURAL_K,MURAL_K);ctx.translate(-16,-16);f(0,0,ink);ctx.restore();}
      else f(sx,sy,ink);                    /* a wall with no windows gets the whole tile, as before */
      if(g>=3){ctx.fillStyle="rgba(255,255,255,.5)";ctx.fillRect(sx+3,sy+5,2,2);ctx.fillRect(sx+15,sy+7,2,2);}}
    if(keep)drawPane(ctx,sx+keep[0],sy+keep[1],keep[2],keep[3]);},
};

/* ---------- the casita vocabulary — what Don Güero builds from ----------
   Three faces of a small Calle Dos house. A template composes them; adding a fourth here is
   how the street gets more variety, with no engine change and no new code anywhere.
   Solid, wall-tall, so 3D wraps the art onto the box like every other facade. */
const CASA_WALL="#C9A77C", CASA_TRIM="#8A6B48", CASA_ROOF="#9E5442";
function casaBase(sx,sy,wall){
  ctx.fillStyle=wall||CASA_WALL;ctx.fillRect(sx,sy,32,32);
  ctx.fillStyle=CASA_ROOF;ctx.fillRect(sx,sy,32,5);                 /* tile roof edge */
  ctx.fillStyle="rgba(0,0,0,.18)";ctx.fillRect(sx,sy+5,32,2);
  ctx.fillStyle=CASA_TRIM;ctx.fillRect(sx,sy+29,32,3);              /* the wet line at the bottom */
}
TILEART["▦"]=rc=>{const{sx,sy}=rc;                                   /* the REJA — a closed gate (#9, 2026-09-07) */
  /* It drew a door with a handle and a step, and the tile is a wall: "i cant enter the houses".
     The paperwork was right (kind: facade), the paint lied. Now it is honestly closed: the dark
     recess stays, iron bars over it, a chain and a padlock, the step kept so it is the same house.
     The template part is still called `door`; that names which tile carries the front. */
  casaBase(sx,sy);
  ctx.fillStyle="#3E2716";ctx.fillRect(sx+10,sy+13,12,16);            /* the recess */
  ctx.fillStyle="#2A2A30";ctx.fillRect(sx+9,sy+12,14,2);              /* the lintel bar */
  ctx.fillStyle="#3A3A44";[11,14,17,20].forEach(x=>ctx.fillRect(sx+x,sy+13,1.6,16)); /* the bars */
  ctx.fillStyle="rgba(255,255,255,.22)";[11,14,17,20].forEach(x=>ctx.fillRect(sx+x,sy+13,0.6,16));
  ctx.fillStyle="#2A2A30";ctx.fillRect(sx+9,sy+27,14,1.4);            /* the bottom rail */
  ctx.strokeStyle="#8A8A94";ctx.lineWidth=1.1;ctx.beginPath();        /* the chain, looped through two bars */
  ctx.moveTo(sx+14.5,sy+19);ctx.quadraticCurveTo(sx+16,sy+22.5,sx+17.8,sy+19);ctx.stroke();
  ctx.fillStyle="#E0B45C";ctx.fillRect(sx+14.8,sy+21,2.6,2.8);        /* the padlock, brass */
  ctx.fillStyle="#2A2A30";ctx.fillRect(sx+15.7,sy+22.2,0.8,0.8);
  ctx.fillStyle="#F2E8D8";ctx.fillRect(sx+9,sy+29,14,3);};           /* the step, kept: same house */
TILEART["▩"]=rc=>{const{sx,sy}=rc;                                   /* the window */
  casaBase(sx,sy);
  ctx.fillStyle=CASA_TRIM;ctx.fillRect(sx+7,sy+11,18,14);
  ctx.fillStyle="#A9C6E0";ctx.fillRect(sx+9,sy+13,14,10);
  ctx.fillStyle=CASA_TRIM;ctx.fillRect(sx+15,sy+13,2,10);            /* the bar down the middle */
  ctx.fillStyle="#7A9A4E";ctx.fillRect(sx+8,sy+24,16,3);};           /* the plant on the sill */
TILEART["▨"]=rc=>{const{sx,sy}=rc;                                   /* the blank wall, with a lamp */
  casaBase(sx,sy,"#BE9A72");
  ctx.fillStyle=CASA_TRIM;ctx.fillRect(sx+15,sy+9,2,4);
  ctx.fillStyle="#E8D6B0";ctx.fillRect(sx+12,sy+12,8,5);
  ctx.fillStyle="rgba(232,214,176,.28)";ctx.fillRect(sx+10,sy+17,12,7);};
/* ʘ — Doña Meche's bote: a steel tamale pot on a cart at the trolley stop on Calle Dos (Nacho,
   2026-09-07: "tamales are sold at the transit stop in every barrio on earth"). A box in 3D with a
   side view, never a cutout; steam always, a marigold on the lid in season (art("bloom")). */
TILEART["ʘ"]=rc=>{const{sx,sy}=rc; /* from above: the round lid, the cart's edge, steam */
  ctx.fillStyle="#6E5638";ctx.fillRect(sx+4,sy+6,24,22);ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+5,sy+7,22,20);
  ctx.fillStyle="#8A8F98";ctx.beginPath();ctx.arc(sx+16,sy+17,9,0,7);ctx.fill();ctx.fillStyle="#B0B4BC";ctx.beginPath();ctx.arc(sx+16,sy+17,7,0,7);ctx.fill();
  ctx.fillStyle="#6E7278";ctx.fillRect(sx+14,sy+16,4,2);
  const bl=art("bloom",null);if(bl){ctx.fillStyle=bl;ctx.beginPath();ctx.arc(sx+20,sy+13,2,0,7);ctx.fill();}
  ctx.fillStyle="rgba(255,255,255,.28)";const ph=Math.sin(Date.now()/500);[[-4,-9],[0,-11],[4,-8]].forEach((q,i)=>{ctx.beginPath();ctx.arc(sx+16+q[0]+ph*(i-1),sy+17+q[1]-ph,1.6,0,7);ctx.fill();});};
TILEART_SIDE["ʘ"]=rc=>{const{sx,sy}=rc; /* from the front: the cart, two wheels, the pot on top, steam, a ladle */
  ctx.fillStyle="rgba(15,12,20,.18)";ctx.beginPath();ctx.ellipse(sx+16,sy+30,12,2,0,0,7);ctx.fill();
  ctx.fillStyle="#6E5638";ctx.fillRect(sx+5,sy+16,22,9);ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+6,sy+17,20,7);
  ctx.fillStyle="#3A3A44";[9,23].forEach(x=>{ctx.beginPath();ctx.arc(sx+x,sy+27,3,0,7);ctx.fill();});ctx.fillStyle="#8A8F98";[9,23].forEach(x=>{ctx.beginPath();ctx.arc(sx+x,sy+27,1.1,0,7);ctx.fill();});
  ctx.fillStyle="#8A8F98";ctx.fillRect(sx+9,sy+7,14,10);ctx.fillStyle="#B0B4BC";ctx.fillRect(sx+10,sy+8,12,8);ctx.fillStyle="#6E7278";ctx.fillRect(sx+8,sy+6,16,2);
  ctx.fillStyle="#3A3A44";ctx.fillRect(sx+22,sy+3,1.2,6);ctx.fillRect(sx+21,sy+2.5,3,1.4); /* the ladle */
  const bl=art("bloom",null);if(bl){ctx.fillStyle=bl;ctx.beginPath();ctx.arc(sx+12,sy+5.5,2,0,7);ctx.fill();}
  ctx.fillStyle="rgba(255,255,255,.3)";const ph=Math.sin(Date.now()/500);[[-3,2],[0,-1],[3,1]].forEach((q,i)=>{ctx.beginPath();ctx.arc(sx+16+q[0]+ph*(i-1),sy+q[1]-ph,1.5,0,7);ctx.fill();});};
Object.assign(TILEMETA,{
  "ʘ":{lift:8,kind:"appliance"},
  "▦":{lift:13,kind:"facade"},
  "▩":{lift:13,kind:"facade"},
  "▨":{lift:13,kind:"facade"},
});

/* ---------- BUILDTPL — the templates themselves ----------
   `casita`: a four-tile house front on Calle Dos with a swept strip of sidewalk in front.
   What varies: which tile holds the door, whether the far end is a window or a blank wall
   with a lamp, and what the family left out front. Later parts can read earlier ones — the
   yard only appears when the door is not on the very edge, because nobody puts a pot where
   the door swings. */
const BUILDTPL={
  casita:{
    id:"casita", size:{w:3,h:2},
    parts:[
      {id:"shell", tiles:[[0,0,"▩"],[0,1,"▩"],[0,2,"▩"],
                          [1,0,"."],[1,1,"."],[1,2,"."]]},
      {id:"door", pick:[
        {id:"middle", w:3, tiles:[[0,1,"▦"]]},
        {id:"left",   w:2, tiles:[[0,0,"▦"]]},
        {id:"right",  w:2, tiles:[[0,2,"▦"]]},
      ]},
      {id:"end", pick:[
        {id:"window", w:2, tiles:[]},
        {id:"lamp",   w:1, tiles:[[0,2,"▨"]]},
      ]},
      /* nobody puts a pot where the door swings, so the yard reads what the door chose */
      {id:"yard", when:c=>c.pick.door!=="left", pick:[
        {id:"none",  w:2, tiles:[]},
        {id:"plant", w:2, tiles:[[1,0,"P"]]},
        {id:"chair", w:1, tiles:[[1,0,"⊔"]]},   /* "⊔" is the guest chair; this said "C", which is the TRAFFIC CONE — inert only because BUILDS is empty, and a kickable cone in somebody's front yard once it is not (found 2026-09-04) */
      ]},
    ],
  },
};

/* ---------- `casa` — a home you can ENTER (#10, the owner: "lets take this on don guero!") ----------
   The same three-tile front as the casita, but the middle tile is a real front door ⌂ that the
   template LINKS to a room it carries: a small living room with a table, a rug, a shelf, a plant,
   a north window, and a neighbour with three lines. The engine stamps the room as a world of its
   own per lot (named after the lot), keyed by where the door stands, so this template can go up
   on as many lots as Calle Dos has and every door still opens. Homes get neighbours, never
   quests: a business is a parcel and comes through Don Güero and Nacho (his guardrail, #10). */
const CASA_ROOM={
  rows:["####|#####",
        "#S......P#",
        "#..T⊔....#",
        "#..⊔.....#",
        "#.c......#",
        "#R.......#",
        "#........#",
        "#####⌂####"],
  people:{c:{npc:"tencha",q:[],chat:1}}, /* Doña Tencha — Hortensia — forty years on Calle Dos, the first house Don Güero built with the door in the middle because she asked (Nacho, 2026-09-07; she was "chelo" for a day and collided with the mercado's Chelo Robles) */
  locs:{en:"Doña Tencha's, Calle Dos",es:"Casa de Doña Tencha, Calle Dos"},
  arrive:{en:"Doña Tencha's front room. The radio is on low.",es:"La sala de Doña Tencha. El radio, bajito."}
};
BUILDTPL.casa={
  id:"casa", size:{w:3,h:2},
  parts:[
    {id:"shell", tiles:[[0,0,"▩"],[0,1,"▩"],[0,2,"▩"],
                        [1,0,"."],[1,1,"."],[1,2,"."]]},
    {id:"door", tiles:[[0,1,"⌂"]], link:{door:[0,1],landing:[5,6],exit:[5,7],interior:CASA_ROOM}},
    {id:"end", pick:[
      {id:"window", w:2, tiles:[]},
      {id:"lamp",   w:1, tiles:[[0,2,"▨"]]},
    ]},
    {id:"yard", pick:[
      {id:"none",  w:2, tiles:[]},
      {id:"plant", w:2, tiles:[[1,0,"P"]]},
      {id:"chair", w:1, tiles:[[1,0,"⊔"]]},
    ]},
  ],
};

/* ---------- `barberia` — Barbería y Estética El Espejo, Naye's chair (owner, 2026-09-07, night) ----------
   "open the ability to change our character outfit and haircut after start. maybe have a small barber."
   Nacho: Naye Robles, 29, Doña Chelo's niece, Xochi's apprentice — the other half of Xochi's line, a head
   for every outfit. Two mirrors on the north wall, a chair under each, the waiting chair, the counter.
   The chair is a service, not a district: no quests (❗La silla in CITY.md says whether that changes). */
const BARBER_ROOM={
  rows:["####|#|###",
        "#S.⊔.⊔..P#",
        "#..b.....#",
        "#⊔......D#",
        "#........#",
        "#........#",
        "#........#",
        "#####⌂####"],
  people:{b:{npc:"naye",q:[],chat:1}},
  locs:{en:"Barbería El Espejo, Calle Dos",es:"Barbería El Espejo, Calle Dos"},
  arrive:{en:"El Espejo. Two chairs, two mirrors, a photo strip of half the barrio's haircuts.",es:"El Espejo. Dos sillas, dos espejos, una tira de fotos con medio barrio recién cortado."}
};
BUILDTPL.barberia={
  id:"barberia", size:{w:3,h:2},
  parts:[
    {id:"shell", tiles:[[0,0,"▩"],[0,1,"▩"],[0,2,"▩"],[1,0,"."],[1,1,"."],[1,2,"."]]},
    {id:"door", tiles:[[0,1,"⌂"]], link:{door:[0,1],landing:[5,6],exit:[5,7],interior:BARBER_ROOM}},
  ],
};

/* ---------- `caseta` — the site hut, where El Portero keeps the gate (#8) ----------
   Owner: "he can be in a room so that way he does have activity where he brings up oh 4 stopped
   attempts - lets talk to review root cause... i need him to highlight the amount of issues and
   if any critical ones - that can be highlighted in red." A hut at the water's edge on Calle Dos,
   two lamp walls and a door; inside, a desk with the gate sheet on it and the tin man himself. */
const CASETA_ROOM={
  rows:["###|####",
        "#D.....#",
        "#..r...#",
        "#......#",
        "#......#",
        "###⌂####"],
  people:{r:{npc:"portero",q:[],chat:1}},
  reads:[{x:1,y:1,doc:"portero"}],
  locs:{en:"The site hut, Calle Dos",es:"La caseta de obra, Calle Dos"},
  arrive:{en:"The site hut. A tin man with a clipboard. He does not look up.",es:"La caseta de obra. Un hombre de lata con su tablilla. No levanta la vista."}
};
BUILDTPL.caseta={
  id:"caseta", size:{w:3,h:2},
  parts:[
    {id:"shell", tiles:[[0,0,"▨"],[0,1,"▨"],[0,2,"▨"],[1,0,"."],[1,1,"."],[1,2,"."]]},
    {id:"door", tiles:[[0,1,"⌂"]], link:{door:[0,1],landing:[3,4],exit:[3,5],interior:CASETA_ROOM}},
  ],
};

/* the lots Don Güero has been given. Same template, different seeds, different houses. */
/* NO LOTS ARE BUILT. The ability is the thing that was asked for — "it is just an ability"
   (owner, 2026-09-03) — and two casitas went up on Calle Dos that nobody asked for and that
   you cannot walk into. A house with a door you cannot open is the same unrealistic shortcut
   as a trolley that stops on a second floor. The template, the glyphs and the engine seam all
   stay, tested; when a parcel is genuinely developed, the house gets an interior and a portal
   FIRST, and then it goes in this list. Restoring the two casitas is two lines:
     {id:"casita-w", tpl:"casita", world:"ex", x:0,  y:0, seed:"calle-dos-poniente"},
     {id:"casita-e", tpl:"casita", world:"ex", x:21, y:0, seed:"calle-dos-oriente"},  */
/* 2026-09-07 (#10): the rule above is kept — a lot goes in WITH a room and a door that opens —
   and the first lot that meets it is Doña Chelo's casa at the water's edge on Calle Dos: the
   `casa` template links its front door to the room it carries, and Doña Chelo lives there. */
const BUILDS=[
  {id:"casa-w", tpl:"casa", world:"ex", x:4, y:2, seed:"calle-dos-4"},
  {id:"caseta", tpl:"caseta", world:"ex", x:16, y:2, seed:"la-caseta"}, /* El Portero's hut, by the site (#8) */
  {id:"barberia", tpl:"barberia", world:"ex", x:21, y:0, seed:"el-espejo"}, /* Naye's chair, the east end of the north frontage — clear of Yola (17,0) and the piñata (18,0) */
];
