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
/* ---- BEAUTIFY, FIRST SITTING — 2026-09-21. Three drawings, content only. ----
   docs/BEAUTIFY.md, "The contact sheet — 2026-09-21", rows 1–3. Drawn the way .claude/skills/how-its-made says:
   by the process that made the thing, with variation entering at the step it entered and nowhere
   earlier, and lit as everything else on this street — key upper-left, one contact shadow. */

/* THE SHELF, FROM THE FRONT. The engine's own side view stands nine 6×5 blocks in six primaries on a
   3×3 grid, which is a Rubik's cube in every camera that sees it. A shelf is a carcass a joiner made
   (two uprights, boards with a front edge that catches the light and a shadow under it) and then
   what a PERSON put on it: books go on in RUNS — pushed to an upright, spines of one series sharing
   a palette, the last one leaning on the run — with a gap where something was taken out, a stack
   lying flat, a carton on the bottom board. Which shelf has the gap and the stack is decided per
   tile, so a wall of them is a wall of shelves and not one picture repeated. */
TILEART_SIDE["S"]=rc=>{const{sx,sy,x,y}=rc;
  const sd=(((x*7+y*13)%6)+6)%6;
  const FAM=[["#8C3B2E","#A54A3A","#6E2E24"],["#3E5C86","#4F6E9A","#2F4868"],["#7C8F5A","#93A56A","#5E6E44"],
             ["#C9B68C","#D9C9A3","#A99570"],["#5C4A6E","#6E5A84","#463756"],["#B8763A","#C98A4C","#8E5A2C"]];
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.beginPath();ctx.ellipse(sx+16,sy+30.4,13,2,0,0,7);ctx.fill(); /* it stands on the floor */
  ctx.fillStyle="#3F2E1E";ctx.fillRect(sx+2,sy+2,TS-4,28);                                   /* the back panel, in shade */
  ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+2,sy+2,2.4,28);ctx.fillRect(sx+TS-4.4,sy+2,2.4,28); /* uprights */
  ctx.fillRect(sx+2,sy+2,TS-4,2.2);                                                           /* the top board */
  ctx.fillStyle="rgba(255,255,255,.22)";ctx.fillRect(sx+2,sy+2,TS-4,1);ctx.fillRect(sx+2,sy+2,1,28); /* lit north and west edges */
  const BOARD=[11.5,20.5,28];                                                                 /* three boards; the bottom one is the plinth */
  BOARD.forEach(b=>{ctx.fillStyle="#7E6446";ctx.fillRect(sx+4.4,sy+b,TS-8.8,2);
    ctx.fillStyle="rgba(255,255,255,.18)";ctx.fillRect(sx+4.4,sy+b,TS-8.8,0.8);              /* the front edge catches the key */
    ctx.fillStyle="rgba(15,12,20,.35)";ctx.fillRect(sx+4.4,sy+b+2,TS-8.8,0.9);});             /* every inside corner is dark */
  const run=(x0,base,h0,fam,n,lean)=>{let cx=x0;                                             /* spines, bottom on the board, pushed together */
    for(let i=0;i<n;i++){const wd=2+((i*3+sd)%3)*0.6,h=h0-((i*5+sd*3)%3)*0.7;
      ctx.fillStyle=fam[(i+sd)%fam.length];ctx.fillRect(sx+cx,sy+base-h,wd,h);
      ctx.fillStyle="rgba(255,255,255,.14)";ctx.fillRect(sx+cx,sy+base-h,0.7,h);cx+=wd+0.35;}
    if(lean){const h=h0-0.6,wd=2.4;ctx.fillStyle=fam[(n+sd)%fam.length];ctx.beginPath();     /* the last one leans on the run */
      ctx.moveTo(sx+cx,sy+base);ctx.lineTo(sx+cx+wd,sy+base);ctx.lineTo(sx+cx+wd+2.2,sy+base-h);ctx.lineTo(sx+cx+2.2,sy+base-h);ctx.closePath();ctx.fill();cx+=wd+2.4;}
    return cx;};
  const stack=(x0,base,fam,n)=>{for(let i=0;i<n;i++){const wd=7-i*0.8,h=1.6,yy=sy+base-(i+1)*h-i*0.2; /* lying flat: the one underneath is squashed */
    ctx.fillStyle=fam[(i+1)%fam.length];ctx.fillRect(sx+x0+i*0.4,yy,wd,h);
    ctx.fillStyle="rgba(255,255,255,.16)";ctx.fillRect(sx+x0+i*0.4,yy,wd,0.5);}};
  const carton=(x0,base,wd,h)=>{ctx.fillStyle="#B0895B";ctx.fillRect(sx+x0,sy+base-h,wd,h);
    ctx.fillStyle="rgba(255,255,255,.2)";ctx.fillRect(sx+x0,sy+base-h,wd,0.8);
    ctx.fillStyle="rgba(60,40,20,.35)";ctx.fillRect(sx+x0+wd*0.45,sy+base-h,0.8,h);           /* the tape */
    ctx.fillStyle="#F2E8D8";ctx.fillRect(sx+x0+1.2,sy+base-h*0.55,wd*0.4,1.4);};              /* the label */
  const fa=FAM[sd%6],fb=FAM[(sd+2)%6],fc=FAM[(sd+4)%6],fd=FAM[(sd+1)%6];
  if(sd%2===0){                                                                              /* layout one */
    let cx=run(4.8,11.5,6.2,fa,3+(sd%3===0?1:0),true);stack(cx+1.5,11.5,fb,2);
    run(4.8,20.5,6.0,fc,5,true);
    carton(4.8,28,9,4.6);run(15.5,28,4.6,fd,4,false);
  }else{                                                                                     /* layout two: the gap moved */
    run(4.8,11.5,6.2,fb,5,true);
    let cx=run(4.8,20.5,6.0,fa,3,true);stack(cx+1.2,20.5,fc,2);
    run(4.8,28,4.6,fd,3,true);carton(17.6,28,9,4.2);
  }
};

/* GRASS, FROM ABOVE. Three strokes on the pavement read as the letter Λ (docs/BEAUTIFY.md, 09-09).
   A tuft in a plaza is not planted; it GREW, from a seed in a crack, and what a grown thing leaves is
   asymmetry that follows a direction: the blades fan out from one root as a rosette, the ones toward
   the light longer and paler, one or two gone to straw. The crack it came from is still there.
   It stays paint on the floor because that is what a tuft is; standing it up as a sprite would put a
   new flat picture into the 3D scene, and test/engine.smoke.js #39 forbids that on purpose. */
TILEART["g"]=rc=>{const{sx,sy,x,y}=rc;
  const sd=(((x*7+y*13)%8)+8)%8,cx=sx+14+(sd%3)*1.6,cy=sy+16+((sd>>1)%3)*1.4,a0=sd*0.8;
  ctx.strokeStyle="rgba(40,32,28,.45)";ctx.lineWidth=0.9;ctx.lineCap="round";ctx.beginPath(); /* the crack */
  ctx.moveTo(cx-Math.cos(a0)*11,cy-Math.sin(a0)*11);ctx.lineTo(cx-Math.cos(a0)*4,cy-Math.sin(a0)*4+1);ctx.lineTo(cx,cy);
  ctx.lineTo(cx+Math.cos(a0+0.4)*5,cy+Math.sin(a0+0.4)*5);ctx.lineTo(cx+Math.cos(a0+0.2)*10,cy+Math.sin(a0+0.2)*10-1);ctx.stroke();
  ctx.fillStyle="rgba(90,70,45,.28)";ctx.beginPath();ctx.ellipse(cx,cy+0.5,4.5,3.2,0,0,7);ctx.fill(); /* the soil it holds */
  const n=8+(sd%3);
  for(let i=0;i<n;i++){const a=i*(Math.PI*2/n)+sd*0.35+(i%2)*0.18,lit=Math.cos(a+Math.PI*0.75)>0.2;
    const len=5.5+((i*3+sd)%4)*1.3+(lit?1:0);                                                 /* toward the light: longer */
    ctx.strokeStyle=tc(lit?"#8FCB72":"#4E8A58");ctx.lineWidth=i%3===0?1.7:1.3;
    const mx=cx+Math.cos(a)*len*0.5,my=cy+Math.sin(a)*len*0.5;
    const ex=cx+Math.cos(a)*len+Math.cos(a+1.3)*1.6,ey=cy+Math.sin(a)*len+Math.sin(a+1.3)*1.6;   /* the tip curls */
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(mx,my,ex,ey);ctx.stroke();}
  ctx.strokeStyle=tc("#C9B66E");ctx.lineWidth=1;const ad=sd*0.9+2;                            /* one blade gone to straw */
  ctx.beginPath();ctx.moveTo(cx,cy);ctx.quadraticCurveTo(cx+Math.cos(ad)*3,cy+Math.sin(ad)*3,cx+Math.cos(ad+0.5)*7,cy+Math.sin(ad+0.5)*7);ctx.stroke();
};

/* THE FLOWER BED, AS A RAISED BED. It was paint — a brown square with three dots at 3D distance —
   because the tile was walkable and a walkable tile is baked into the floor. A marigold bed in a
   plaza is not something you walk through: it is a low painted-concrete curb with soil behind it and
   the cempasúchil mounding over the rim. So it is SOLID now (maps.js SOLIDX) and a box (TILEMETA):
   the lid is the bed seen from above, the sides are the curb with the heads over it. The plants are
   the engine's own drawBed, so a season that recolours the bridge's petals recolours these too. */
TILEART["b"]=rc=>{const{sx,sy,x,y}=rc;
  const w=CW(),bed=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="b";};       /* a run of beds shares one curb */
  const N=!bed(x,y-1),S=!bed(x,y+1),E=!bed(x+1,y),Wt=!bed(x-1,y);
  ctx.fillStyle=tc("#5E4630");ctx.fillRect(sx,sy,TS,TS);                                     /* soil, edge to edge: the lid never shows the map colour */
  drawBed(ctx,sx,sy,(((x*7+y*13)%5)+5)%5/5);
  ctx.fillStyle=tc("#B9B0A2");
  if(N)ctx.fillRect(sx,sy,TS,3);if(S)ctx.fillRect(sx,sy+TS-3,TS,3);if(Wt)ctx.fillRect(sx,sy,3,TS);if(E)ctx.fillRect(sx+TS-3,sy,3,TS);
  ctx.fillStyle="rgba(255,255,255,.22)";if(N)ctx.fillRect(sx,sy,TS,1);if(Wt)ctx.fillRect(sx,sy,1,TS);       /* the curb's lit edges */
  ctx.fillStyle="rgba(15,12,20,.28)";if(S)ctx.fillRect(sx,sy+TS-1,TS,1);if(E)ctx.fillRect(sx+TS-1,sy,1,TS);   /* and its shade */
  ctx.fillStyle="rgba(15,12,20,.18)";if(N)ctx.fillRect(sx+3,sy+3,TS-6,1.2);if(Wt)ctx.fillRect(sx+3,sy+3,1.2,TS-6); /* the curb casts onto the soil */
};
TILEART_SIDE["b"]=rc=>{const{sx,sy,x,y}=rc;
  const w=CW(),bed=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="b";};
  const Wt=!bed(x-1,y),E=!bed(x+1,y),sd=(((x*7+y*13)%5)+5)%5;
  const P=petalPal(),UNDER=P[1],BODY=P[3]||P[2],CROWN=P[5]||P[4];
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.fillRect(sx,sy+29.6,TS,2);                          /* it meets the floor in a line — it is a run */
  ctx.fillStyle=tc("#5E4630");ctx.fillRect(sx,sy+19,TS,3);                                   /* the soil behind the curb */
  const heads=[[6,15,3.4],[15,13.5,3.9],[25,15.5,3.2],[11,18,2.4],[21,18.5,2.6]];
  heads.forEach(([hx,hy,r],i)=>{const px=sx+hx+((sd+i)%3-1)*0.8,py=sy+hy+((sd*i)%2)*0.6;
    ctx.strokeStyle=tc("#3E7C4F");ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(px,py+r*0.4);ctx.lineTo(px,sy+21);ctx.stroke(); /* the stem, into the soil */
    ctx.fillStyle=UNDER;ctx.beginPath();ctx.ellipse(px,py+r*0.15,r,r*0.8,0,0,7);ctx.fill();                          /* the underside */
    ctx.fillStyle=BODY;ctx.beginPath();ctx.ellipse(px,py-r*0.1,r*0.95,r*0.78,0,0,7);ctx.fill();                      /* the head, wider than tall */
    ctx.fillStyle=CROWN;ctx.beginPath();ctx.ellipse(px-r*0.35,py-r*0.45,r*0.38,r*0.28,0,0,7);ctx.fill();});          /* the crown, where the key lands */
  ctx.fillStyle=tc("#3E7C4F");[[3,19.5],[18,20],[29,19.5]].forEach(([lx,ly])=>{ctx.beginPath();ctx.ellipse(sx+lx,sy+ly,2.2,1.1,-0.4,0,7);ctx.fill();}); /* leaves between */
  ctx.fillStyle=tc("#B9B0A2");ctx.fillRect(sx,sy+22,TS,8);                                   /* the curb: painted concrete, knee high */
  ctx.fillStyle=tc("#C9C1B3");ctx.fillRect(sx,sy+21,TS,1.6);                                 /* its top, edge-on, lit */
  ctx.fillStyle="rgba(15,12,20,.22)";ctx.fillRect(sx,sy+26.5,TS,3.5);                        /* the lower part in the ground's shade */
  ctx.fillStyle="rgba(60,50,40,.35)";ctx.fillRect(sx+((x*TS)%13)+2,sy+23,0.8,6);              /* one joint, on the world grid, so it runs */
  ctx.fillStyle="rgba(15,12,20,.3)";if(Wt)ctx.fillRect(sx,sy+21,1.2,9);if(E)ctx.fillRect(sx+TS-1.2,sy+21,1.2,9); /* the ends of the run */
};

/* ---- BEAUTIFY, SECOND SITTING — 2026-09-21, the same night. SHAPES, NOT PICTURES. ----
   Owner: "i still see squares and not polygonal shapes … can we not try this finally?" The `mesh`
   view: a list of primitives per tile, in tile units (a tile is 1.0 wide, a person about 1.0 tall),
   y up from the floor, the tile's centre at (0,0). The engine merges them into one mesh with vertex
   colours. Drawn as .claude/skills/how-its-made says: by what the thing is made of. A marigold head is a
   pom-pom — a sphere. A pot was thrown — a tapered cylinder with a rim. A bookcase is a carcass of
   boards with what a person put on them. Colours go through tc() in the engine, so the theme and
   the time of day reach these like everything else. */
const TILEART_MESH={};
/* A CEMPASÚCHIL HEAD IS A STACK OF WHORLS, NOT A BALL (la botánica, crew run 11, 2026-09-21, from the
   owner's three photographs). Tagetes erecta, the double kind sold for Día de Muertos: hundreds of ray
   florets on a domed receptacle, in whorls — the outermost the largest, splayed nearly flat with a wavy
   margin; each whorl inward shorter, steeper and more crinkled, to a crown of upright florets. ONE HUE
   PER PLANT, deepest at the floret's base and paler at its margin, so the outer whorl reads deeper than
   the crown. The green cup under it is the involucre: a narrow ribbed vase, not a ball. Built as three
   whorls of flattened lobes (a squashed sphere, long along the radius, its BASE on the receptacle and its
   tip lifted — outer 17°, middle 55°, inner 72°), a crown of three, the receptacle showing between them,
   and a tapered cylinder for the cup. Every head grows by the same rule; what the seed changes is the
   turn and the crimp of each floret — variation enters where it entered (how-its-made).
   `hue` picks the plant's colour from P — -1 deep red-brown, 0 rust, 1 orange (default), 2 gold —
   the whorls take P[hue+1], P[hue+2], P[hue+3] (the crown capped at P[4]); nothing here names an
   orange, so a season that recolours petals recolours these. Four steps because two touching heads in
   one family are ~5% apart under this light and merge (Pili, run 11): every value difference between
   heads is PAINTED. `lod` 0 drops the middle whorl (a garland of small heads). `lean` is [x,z]: the
   head sheared off its stem that much per unit of height — the outer stems of a bush splay toward
   the light. The first seven parameters are what the bed, the tree's garland and the altar's arch
   already pass. 26 parts. */
const meshMarigold=(parts,hx,hy,hz,r,P,seed,hue,lod,lean)=>{
  const k=hue===undefined?1:hue,full=lod===undefined||lod>0,lx=lean?lean[0]:0,lz=lean?lean[1]:0;
  const C0=P[Math.max(k+1,0)]||P[2],C1=P[Math.max(k+2,0)]||P[3],C2=P[Math.min(k+3,4)]||P[4],CUP="#4E8A58"; /* the crown stops at P[4]: a gold head is gold to the centre, not cream */
  const rnd=(i,j)=>{const v=Math.sin((seed+1)*12.9898+i*78.233+j*37.719)*43758.5453;return v-Math.floor(v);}; /* a hash, not Math.random: the same tile grows the same flower every frame */
  const put=p=>{p.x+=(p.y-hy)*lx;p.z+=(p.y-hy)*lz;parts.push(p);};
  put({s:"cyl",x:hx,y:hy-r*0.32,z:hz,rt:r*0.30,rb:r*0.20,h:r*0.5,c:CUP});                            /* the involucre */
  put({s:"sph",x:hx,y:hy+r*0.22,z:hz,r:r*0.55,sy:0.9,c:C1});                                           /* the receptacle, in the plant's own hue */
  const whorl=(n,rad,y,pr,sy,sz,tilt,c,j)=>{const off=rnd(j,0)*6.2832,hl=pr*sz;
    for(let i=0;i<n;i++){const a=off+i*6.2832/n+(rnd(i,j)-0.5)*0.4,t=tilt+(rnd(i,j+5)-0.5)*0.3,rr=rad+Math.cos(t)*hl;
      put({s:"sph",x:hx+Math.cos(a)*rr,y:y+Math.sin(t)*hl,z:hz+Math.sin(a)*rr,r:pr,sy,sz,rx:-t,ry:Math.PI/2-a,c});}};
  whorl(8,r*0.30,hy,r*0.34,0.28,1.25,0.3,C0,1);                                                        /* outer: the largest florets, splayed, margins lifted */
  if(full)whorl(7,r*0.22,hy+r*0.14,r*0.30,0.32,1.1,0.95,C1,2);                                         /* middle: shorter, steeper */
  whorl(6,r*0.12,hy+r*0.28,r*0.26,0.4,1.0,1.25,C2,3);                                                   /* inner: near upright, crinkled */
  whorl(3,r*0.06,hy+r*0.55,r*0.2,0.8,1.0,1.4,C2,4);};                                                   /* the crown */
/* A STRING OF PAPEL PICADO between two points, sagging a little, with flags hung from it in the paper
   palette, alternating. Flags are boxes, thin as paper, a hair below the string. */
const meshPapel=(parts,x0,y0,z0,x1,y1,z1,pal,n,seed)=>{
  const mx=(x0+x1)/2,my=Math.min(y0,y1)-0.05,mz=(z0+z1)/2,ang=Math.atan2(z1-z0,x1-x0),len=Math.hypot(x1-x0,z1-z0);
  parts.push({s:"cyl",x:mx,y:my,z:mz,r:0.007,h:len,c:"#3A2E26",rz:Math.PI/2,ry:-ang});         /* the string */
  for(let i=0;i<n;i++){const t=(i+0.5)/n,fx=x0+(x1-x0)*t,fz=z0+(z1-z0)*t,fy=my-0.005-2*t*(1-t)*0.05;
    parts.push({s:"box",x:fx,y:fy-0.07,z:fz,w:0.11,h:0.13,d:0.006,c:pal[(i+seed)%pal.length],ry:-ang});}};
const MESH_FAM=[["#8C3B2E","#A54A3A","#6E2E24"],["#3E5C86","#4F6E9A","#2F4868"],["#7C8F5A","#93A56A","#5E6E44"],
                ["#C9B68C","#D9C9A3","#A99570"],["#5C4A6E","#6E5A84","#463756"],["#B8763A","#C98A4C","#8E5A2C"]];

/* THE RAISED BED. A painted-concrete curb with a rounded lip (a cylinder along each top edge — the
   mason ran a trowel round it), soil behind it, and a bush of cempasúchil in it. A run of beds shares
   one curb: the walls stand only where the run ends. Colours from petalPal, so a season recolours these too.
   THE MARIGOLDS, FOURTH TRY (la botánica, crew run 11, from the owner's photographs of one head, a bunch
   and a bush). Twelve heads from meshMarigold on a staggered grid, jittered, so they TOUCH — a bunch
   has no gaps — the middle of the bed standing higher and the edge heads leaning out, as a bush mounds
   and splays; every head from the same rule, and what differs is what differed in the field: the size
   (age), the turn (the seed), and the hue (the packet's mix, photo 2: six orange, three gold, two
   rust, one deep red-brown, laid so no two in a row share a step and turned per tile — two touching
   heads in one family merge under this light, so the difference between heads is painted, Pili's
   read). Under them the foliage as photo 3 has it: a near-black green mass UNDER the heads, never
   beside — fifty small masses on a jittered grid from the soil to knee height, darkest on top where
   they show between heads, a step greener low on the mound's outside where the sun reaches — and the
   soil darker than any petal's underside, so what shows between heads is the dark that makes the
   orange sing; stems only above the foliage, where they show; buds between the heads, the same plant
   younger. The seed is x AND y: the old (x*7+y*13)%7 was constant along a row, so three beds in a row
   were one bed three times. */
TILEART_MESH["b"]=({x,y})=>{
  const P=petalPal();
  const h=(((x*5+y*3)%7)+7)%7;
  const rnd=(i,j)=>{const v=Math.sin(x*12.9898+y*78.233+i*39.425+j*17.719)*43758.5453;return v-Math.floor(v);};
  const w=CW(),bed=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="b";};
  const N=!bed(x,y-1),S=!bed(x,y+1),E=!bed(x+1,y),Wt=!bed(x-1,y);
  const CURB="#B9B0A2",LIP="#CFC7B9",SOIL="#2F2216",LEAF="#27492F",LEAF2="#3E7C4F",LEAF3="#2E5A38",STEM="#5A9A62",CUP="#4E8A58";
  const parts=[];
  const wall=(px,pz,ww,dd)=>{parts.push({s:"box",x:px,y:0.11,z:pz,w:ww,h:0.22,d:dd,c:CURB});
    parts.push({s:"cyl",x:px,y:0.22,z:pz,r:0.045,h:Math.max(ww,dd),c:LIP,rz:ww>dd?Math.PI/2:0,rx:ww>dd?0:Math.PI/2});}; /* the lip */
  if(N)wall(0,-0.42,0.92,0.08);if(S)wall(0,0.42,0.92,0.08);if(Wt)wall(-0.42,0,0.08,0.92);if(E)wall(0.42,0,0.08,0.92);
  parts.push({s:"box",x:0,y:0.16,z:0,w:0.92,h:0.08,d:0.92,c:SOIL});                       /* the soil, a hand below the lip */
  const clamp=v=>Math.max(-0.37,Math.min(0.37,v));                                                  /* the foliage stays inside the curb */
  for(let i=0;i<40;i++){const gx=clamp(-0.36+(i%5)*0.18+(rnd(i,11)-0.5)*0.14),gz=clamp(-0.36+((i/5|0)%5)*0.18+(rnd(i,12)-0.5)*0.14+(i>=25?0.09:0)),gy=0.2+rnd(i,13)*0.14,lr=0.055+rnd(i,14)*0.04; /* the foliage mound, on a jittered grid so it has no holes */
    parts.push({s:"sph",x:gx,y:gy,z:gz,r:lr,sx:1.4,sy:0.45,sz:0.7,ry:rnd(i,15)*3.14,c:gy>0.3?LEAF3:(Math.abs(gx)>0.28||Math.abs(gz)>0.28?LEAF2:LEAF)});} /* dark on top; the sunlit green only low on the outside */
  for(let i=0;i<10;i++){const gx=-0.32+(i%5)*0.16+(rnd(i,16)-0.5)*0.08,gz=(i<5?-0.16:0.16)+(rnd(i,17)-0.5)*0.06;  /* and a top layer between the rows of heads, where the soil showed: the darkest green, under, never beside */
    parts.push({s:"sph",x:gx,y:0.35,z:gz,r:0.08,sx:1.4,sy:0.4,sz:0.8,ry:rnd(i,18)*3.14,c:i%2?LEAF3:LEAF});}
  const heads=[[-0.34,-0.3],[-0.11,-0.31],[0.11,-0.3],[0.34,-0.31],[-0.3,0],[-0.08,0.01],[0.14,-0.01],[0.36,0],[-0.34,0.3],[-0.11,0.31],[0.11,0.3],[0.34,0.31]];
  const HUES=[1,2,1,0, 2,1,-1,1, 1,0,1,2];                                                          /* the packet's mix, row by row: no two beside each other in one family */
  heads.forEach(([hx,hz],i)=>{const j=(h+i)%12,hue=HUES[j],r=0.12+rnd(i,21)*0.035+(hue===0?0.015:0),
    px=hx+(rnd(i,23)-0.5)*0.07,pz=hz+(rnd(i,24)-0.5)*0.07,d=Math.hypot(px,pz),
    hy=0.40+(1-Math.min(1,d/0.5))*0.12+rnd(i,22)*0.05;                                                /* the middle mounds higher */
    parts.push({s:"cyl",x:px,y:(0.3+hy)/2,z:pz,r:0.012,h:hy-0.3,c:STEM});                          /* the stem, from inside the foliage */
    meshMarigold(parts,px,hy,pz,r,P,h*3+i,hue,1,[px/0.5*0.22,pz/0.5*0.22]);});                        /* the edge heads lean out toward the light */
  [[-0.22,-0.15],[0.23,0.15],[-0.2,0.16],[0.22,-0.16]].forEach(([bx,bz],i)=>{const by=0.42+rnd(i,31)*0.05; /* buds: a green egg on a stem, the colour just showing */
    parts.push({s:"cyl",x:bx,y:(0.3+by)/2,z:bz,r:0.01,h:by-0.3,c:STEM});
    parts.push({s:"cyl",x:bx,y:by,z:bz,rt:0.03,rb:0.02,h:0.07,c:CUP});
    parts.push({s:"sph",x:bx,y:by+0.045,z:bz,r:0.028,sy:1.2,c:P[2+i%2]});});
  return parts;};

/* THE POTTED PLANT. Twenty of them, every one the same picture until tonight (docs/BEAUTIFY.md,
   P ×20). Thrown on a wheel: a tapered pot, a rim, soil in it, a stem, and a head of five leaf
   masses turned per tile so a row of them is a row and not one plant repeated. */
TILEART_MESH["P"]=({x,y})=>{const h=(((x*7+y*13)%5)+5)%5,a=h*1.26,c=Math.cos(a),s=Math.sin(a);
  const POT="#B4633F",RIM="#C97A52",SOIL="#4A3524",G1="#3E7C4F",G2="#4E9A5E";
  const parts=[{s:"cyl",x:0,y:0.13,z:0,rt:0.2,rb:0.15,h:0.26,c:POT},{s:"cyl",x:0,y:0.27,z:0,r:0.22,h:0.04,c:RIM},
               {s:"cyl",x:0,y:0.295,z:0,r:0.17,h:0.02,c:SOIL},{s:"cyl",x:0,y:0.41,z:0,r:0.02,h:0.24,c:G1}];
  [[0,0.62,0,0.19],[0.13,0.52,0.06,0.15],[-0.12,0.54,-0.05,0.14],[0.02,0.5,-0.14,0.13],[-0.03,0.48,0.14,0.12]].forEach(([px,py,pz,r],i)=>
    parts.push({s:"sph",x:px*c-pz*s,y:py,z:px*s+pz*c,r,c:i%2?G2:G1}));
  return parts;};

/* THE SHELF, AS A CARCASS. Two uprights, a back, four boards with real depth, and on them what
   TILEART_SIDE["S"] paints from the front — runs of spines, one leaning, a stack, a carton — now as
   boxes you can see between. It faces the first open side (south, then east, west, north), so a
   shelf against any wall shows its front to the room. */
TILEART_MESH["S"]=({x,y})=>{
  const w=CW(),solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  const ry=!solid(x,y+1)?0:!solid(x+1,y)?Math.PI/2:!solid(x-1,y)?-Math.PI/2:Math.PI;
  const sd=(((x*7+y*13)%6)+6)%6,WOOD="#8A6F4D",DARK="#5A4530",BACK="#3F2E1E";
  const parts=[{s:"box",x:0,y:0.5,z:-0.2,w:0.9,h:1.0,d:0.04,c:BACK},
    {s:"box",x:-0.43,y:0.5,z:0,w:0.05,h:1.0,d:0.42,c:WOOD},{s:"box",x:0.43,y:0.5,z:0,w:0.05,h:1.0,d:0.42,c:WOOD}];
  [0.03,0.34,0.66,0.98].forEach(by=>parts.push({s:"box",x:0,y:by,z:0,w:0.9,h:0.035,d:0.42,c:by>0.9?WOOD:DARK}));
  const run=(x0,base,n,fam,lean)=>{let cx=x0;for(let i=0;i<n;i++){const bw=0.05+((i*3+sd)%3)*0.015,bh=0.24-((i*5+sd*3)%3)*0.025;
      parts.push({s:"box",x:cx+bw/2,y:base+bh/2,z:0.02,w:bw,h:bh,d:0.28,c:fam[(i+sd)%fam.length]});cx+=bw+0.008;}
    if(lean){const bw=0.055,bh=0.22;parts.push({s:"box",x:cx+bw/2+0.03,y:base+bh/2-0.012,z:0.02,w:bw,h:bh,d:0.28,c:fam[(n+sd)%fam.length],rz:-0.28});cx+=bw+0.06;}
    return cx;};
  const stack=(x0,base,fam)=>[0,1].forEach(i=>parts.push({s:"box",x:x0+0.1,y:base+0.025+i*0.05,z:0,w:0.2-i*0.02,h:0.045,d:0.26,c:fam[(i+1)%fam.length]}));
  const carton=(x0,base)=>parts.push({s:"box",x:x0+0.13,y:base+0.11,z:0,w:0.26,h:0.22,d:0.3,c:"#B0895B"});
  const fa=MESH_FAM[sd%6],fb=MESH_FAM[(sd+2)%6],fc=MESH_FAM[(sd+4)%6],fd=MESH_FAM[(sd+1)%6];
  const B1=0.05,B2=0.36,B3=0.68;                                                         /* the top of each board */
  if(sd%2===0){const cx=run(-0.4,B3,3,fa,true);stack(cx+0.03,B3,fb);run(-0.4,B2,5,fc,true);carton(-0.4,B1);run(-0.1,B1,4,fd,false);}
  else{run(-0.4,B3,5,fb,true);const cx=run(-0.4,B2,3,fa,true);stack(cx+0.03,B2,fc);run(-0.4,B1,3,fd,true);carton(0.1,B1);}
  const cr=Math.cos(ry),sr=Math.sin(ry);                                                  /* turn the whole carcass to face the room */
  return parts.map(p=>({...p,x:p.x*cr+p.z*sr,z:-p.x*sr+p.z*cr,ry:(p.ry||0)+ry}));};

/* ---- LA ESPIGA'S GOODS — crew iteration 12, la panadera (#227). Owner: "can we also add more sweeet
   bread and baked goods please?" ----
   The four `S` tiles along the bakery's north wall are "bread racks" (maps.js, the `pa:` comment) and
   were drawing the notary's books — docs/BEAUTIFY.md row 1: one drawing, six businesses. In a Mexican
   panadería the customer takes a charola and pinzas and walks to the racks; the racks ARE the display.
   So the goods live on them and nowhere else: the shelf's mesh, side and top are wrapped below with a
   branch that fires only in `pa`, and every other world keeps the bookcase it had, byte for byte.
   Built the way .claude/skills/how-its-made says — one dough, one tray, one oven. An exhibidor is a
   frame with sheet pans slid in at a tilt, the same seasoned pans the goods came out of the oven on;
   each pan holds ONE kind off one sheet, so its pieces are siblings: one size, one cutter, laid in rows
   and touching. Variation enters at the step it entered and nowhere earlier — the concha's shell colour
   per BATCH (a pan is vanilla or it is chocolate), the bake colour per piece where the oven ran hot,
   the lean of a standing oreja per piece. Which kind sits on which pan is decided per RACK by a seed
   that reads both axes: the shelf's own (x*7+y*13)%6 is 3,5,1,3 along this row, so the first and last
   rack were one picture. Pan de muerto takes the top pan of every second rack in season, never out of it.
   The names are the story's: bolillos ("forty bolillos at five", docs.js; the cat in the flour bin),
   the concha ("concha, ten weeks"), and the bag of pan de ayer at the door. */
const PAN={frame:"#5A3E28",frameL:"#7C5A3A",pan:"#3B3836",panL:"#5A5552",
  crust:"#D19A4C",crustD:"#B0762C",crumb:"#F0D9A8",vanilla:"#F2E7CB",vanillaD:"#D6C49A",choc:"#6B4130",chocD:"#4A2A1E",
  wicker:"#8F6A3A",wickerD:"#6C4B24",caramel:"#C27C34",caramelL:"#EAC57E",
  pink:"#EFA3B5",vain:"#F1E3BE",cocoa:"#7E5237",cup:"#F8F6F0",sugar:"#F1DCAF"};
const PA_KINDS=["concha-v","concha-c","bolillo","cuerno","oreja","polvoron"];
const paHere=()=>typeof world!=="undefined"&&world==="pa";
const paMuertos=()=>typeof seasonNow==="function"&&seasonNow()==="muertos"; /* the season by its id: SEASONS.muertos.art has no bread key, and config.js is not this lane's */
/* one rack, decided ONCE for every camera: its seed, and the kind on each pan, top pan first */
const paRack=(x,y)=>{const s=(((x*5+y*3)%7)+7)%7;
  const trays=[PA_KINDS[(s+1)%6],PA_KINDS[(s+3)%6],PA_KINDS[(s+5)%6]];
  if(paMuertos()&&s%2===0)trays[0]="muerto";
  return {s,trays};};
/* THE GOODS, AS PARTS. `put(part,u,v,h)` sets a part on a pan: u across, v toward the room, h above the
   sheet — the pan is tilted and put() does the trigonometry, so each kind is written flat. */
const paGoods=(kind,s,ti,put)=>{const R=PAN,hot=(s+ti)%6;                                  /* the one the oven's hot corner caught */
  if(kind==="concha-v"||kind==="concha-c"){const cap=kind==="concha-v"?R.vanilla:R.choc;let i=0;
    for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){const u=-0.29+c*0.29,v=-0.11+r*0.22;
      put({s:"cyl",r:0.145,h:0.06,c:i===hot?R.crustD:R.crust},u,v,0.03);                    /* the dough: one cutter, six times */
      put({s:"sph",r:0.14,sy:0.62,c:cap},u,v,0.062);}}                                        /* the shell: one batch, one colour */
  else if(kind==="bolillo"){                                                                  /* a basket, and in it bolillos laid across: one length, one score */
    put({s:"box",w:0.78,h:0.02,d:0.4,c:R.wickerD},0,0,0.01);
    put({s:"box",w:0.78,h:0.09,d:0.025,c:R.wicker},0,-0.19,0.055);put({s:"box",w:0.78,h:0.09,d:0.025,c:R.wicker},0,0.19,0.055);
    put({s:"box",w:0.025,h:0.09,d:0.4,c:R.wicker},-0.39,0,0.055);put({s:"box",w:0.025,h:0.09,d:0.4,c:R.wicker},0.39,0,0.055);
    const bol=(u,v,h,i)=>{const c=i===hot?R.crustD:R.crust;
      put({s:"cyl",r:0.05,h:0.22,rz:Math.PI/2,c},u,v,h);                                     /* the body, along the basket */
      put({s:"cone",r:0.05,h:0.07,rz:-Math.PI/2,c},u+0.145,v,h);put({s:"cone",r:0.05,h:0.07,rz:Math.PI/2,c},u-0.145,v,h); /* the two points */
      put({s:"box",w:0.18,h:0.012,d:0.022,c:R.crumb},u,v,h+0.048);};                          /* the score, cut the same way on every one */
    let i=0;[-0.12,0,0.12].forEach(v=>{bol(-0.19,v,0.07,i++);bol(0.19,v,0.07,i++);});         /* six in the basket, end to end */
    bol(-0.1,-0.06,0.155,i++);bol(0.1,0.06,0.155,i++);}                                       /* two more on top: a heap, not a diagram */
  else if(kind==="cuerno"){let i=0;for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){const u=-0.28+c*0.28,v=-0.11+r*0.22;
      put({s:"torus",r:0.095,t:0.04,arc:Math.PI*1.2,rx:Math.PI/2,ry:Math.PI+(((s+i)%3)-1)*0.14,c:i===hot?R.crustD:R.crust},u,v,0.04);}} /* a crescent lying flat, horns to the room, each set down by hand */
  else if(kind==="oreja"){[-0.11,0.11].forEach((v,r)=>{for(let i=0;i<6;i++){                 /* two rows laid flat and shingled, each on the one before; the face is the read */
      const u=-0.33+i*0.132,rz=0.16+((s+r+i)%3)*0.04;                                        /* the lean of one resting on the last, a hair different each */
      put({s:"cyl",r:0.07,h:0.025,rz,c:R.caramel},u-0.04,v-0.03,0.03);put({s:"cyl",r:0.07,h:0.025,rz,c:R.caramel},u+0.04,v-0.03,0.03); /* the two lobes of the heart */
      put({s:"cyl",r:0.04,h:0.03,rz,c:R.caramelL},u,v-0.03,0.036);}});}                      /* the paler spiral, proud of the glaze */
  else if(kind==="polvoron"){const col=[R.pink,R.vain,R.cocoa];let i=0;for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){const u=-0.29+c*0.29,v=-0.11+r*0.22;
      put({s:"cyl",rt:0.12,rb:0.095,h:0.045,c:R.cup},u,v,0.0225);                             /* the capacillo */
      put({s:"cyl",r:0.105,h:0.05,c:col[(i+s)%3]},u,v,0.065);}}                               /* the polvorón: a fat disc; three doughs pressed on one tray, set down in turn */
  else if(kind==="muerto"){let i=0;for(let r=0;r<2;r++)for(let c=0;c<2;c++,i++){const u=-0.2+c*0.4,v=-0.11+r*0.22;
      put({s:"cyl",r:0.16,h:0.05,c:i===hot%4?R.crustD:R.crust},u,v,0.025);
      put({s:"sph",r:0.16,sy:0.7,c:R.crust},u,v,0.05);                                        /* the round */
      put({s:"torus",r:0.135,t:0.028,arc:Math.PI,c:R.sugar},u,v,0.06);                        /* the bones, two arches crossed over it */
      put({s:"torus",r:0.135,t:0.028,arc:Math.PI,ry:Math.PI/2,c:R.sugar},u,v,0.06);
      put({s:"sph",r:0.05,c:R.sugar},u,v,0.2);}}};                                             /* the knob, sugared */
/* THE RACK: four posts, the rails, three pans slid in at a tilt with a lip at the front, and on each
   pan what paRack() said. Faces its first open side like the bookcase it replaces. */
const paRackMesh=({x,y})=>{
  const {s,trays}=paRack(x,y),parts=[],TILT=0.34,PW=0.9,PD=0.46;                            /* the pans lean a fifth of a turn toward the room, as an exhibidor's do */
  [[-0.44,-0.2],[0.44,-0.2],[-0.44,0.2],[0.44,0.2]].forEach(([px,pz])=>parts.push({s:"box",x:px,y:0.5,z:pz,w:0.055,h:1.0,d:0.055,c:PAN.frame}));
  [-0.44,0.44].forEach(px=>parts.push({s:"box",x:px,y:0.985,z:0,w:0.04,h:0.03,d:0.44,c:PAN.frameL}));
  parts.push({s:"box",x:0,y:0.985,z:-0.2,w:0.92,h:0.03,d:0.04,c:PAN.frame});
  [0.88,0.55,0.22].forEach((ty,ti)=>{const ca=Math.cos(TILT),sa=Math.sin(TILT);
    const put=(p,u,v,h)=>parts.push({...p,x:u,y:ty+h*ca-v*sa,z:h*sa+v*ca,rx:(p.rx||0)+TILT});
    [-0.435,0.435].forEach(u=>put({s:"box",w:0.03,h:0.03,d:PD,c:PAN.frameL},u,0,-0.03));     /* the runners it slides on */
    put({s:"box",w:PW,h:0.02,d:PD,c:PAN.pan},0,0,-0.01);                                      /* the pan, seasoned steel */
    put({s:"box",w:PW,h:0.05,d:0.02,c:PAN.panL},0,PD/2,0.015);                                /* the lip, so nothing slides off */
    paGoods(trays[ti],s,ti,put);});
  return meshTurned(parts,meshFacing(x,y));};
/* THE RACK FROM THE FRONT (the camera the owner plays most). The pans read as a dark band of surface
   under a lit lip; the goods stand on the band. Same kinds, same pans, same seed as the mesh. */
const paGoods2D=(kind,s,ti,x0,base)=>{const R=PAN,hot=(s+ti)%6,tri=i=>x0+3.9+i*7.8;
  if(kind==="concha-v"||kind==="concha-c"){const cap=kind==="concha-v"?R.vanilla:R.choc,sc=kind==="concha-v"?R.vanillaD:R.chocD;
    for(let i=0;i<3;i++){const cx=tri(i);
      ctx.fillStyle=(i+3)===hot?R.crustD:R.crust;ctx.beginPath();ctx.ellipse(cx,base-1.4,3.5,1.6,0,0,7);ctx.fill();   /* the dough */
      ctx.fillStyle=cap;ctx.beginPath();ctx.ellipse(cx,base-2.2,3.5,3.4,0,Math.PI,0);ctx.fill();                       /* the shell, a dome */
      ctx.strokeStyle=sc;ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(cx-2.2,base-2.6);ctx.lineTo(cx+2.2,base-4.6);   /* its score, two cuts */
      ctx.moveTo(cx-2.2,base-4.6);ctx.lineTo(cx+2.2,base-2.6);ctx.stroke();}}
  else if(kind==="bolillo"){ctx.fillStyle=R.wickerD;ctx.fillRect(x0+1.4,base-4.2,20.4,4.2);ctx.fillStyle=R.wicker;ctx.fillRect(x0+1.4,base-4.2,20.4,1);  /* the basket */
    [[x0+6.4,base-4.4,0],[x0+16.8,base-4.4,1],[x0+11.6,base-6.8,6]].forEach(([cx,cy,i])=>{                              /* two in front, one on the heap */
      ctx.fillStyle=i===hot?R.crustD:R.crust;ctx.beginPath();ctx.ellipse(cx,cy,5,1.9,0,0,7);ctx.fill();
      ctx.fillStyle=R.crumb;ctx.fillRect(cx-2.6,cy-1.3,5.2,0.9);});}                                                     /* the score */
  else if(kind==="cuerno"){for(let i=0;i<3;i++){const cx=tri(i);ctx.strokeStyle=(i+3)===hot?R.crustD:R.crust;ctx.lineWidth=2.6;
      ctx.beginPath();ctx.arc(cx,base-1.2,3,Math.PI*1.08,Math.PI*1.92);ctx.stroke();}}                                    /* a crescent, horns to you */
  else if(kind==="oreja"){for(let k=0;k<2;k++)for(let i=0;i<5;i++){const cx=x0+3.4+i*3.9+k*1.2,cy=base-1.6-k*2.6;       /* shingled flat, the back row peeking over the front */
      ctx.fillStyle=R.caramel;ctx.beginPath();ctx.arc(cx-1.5,cy-1.2,1.8,0,7);ctx.arc(cx+1.5,cy-1.2,1.8,0,7);ctx.fill();  /* the face: two lobes and the point */
      ctx.beginPath();ctx.moveTo(cx-3.1,cy-0.8);ctx.lineTo(cx+3.1,cy-0.8);ctx.lineTo(cx,cy+1.6);ctx.closePath();ctx.fill();
      ctx.fillStyle=R.caramelL;ctx.beginPath();ctx.arc(cx,cy-0.8,1.1,0,7);ctx.fill();}}                                 /* the paler spiral */
  else if(kind==="polvoron"){const col=[R.pink,R.vain,R.cocoa];for(let i=0;i<3;i++){const cx=tri(i);
      ctx.fillStyle=R.cup;ctx.beginPath();ctx.moveTo(cx-3.7,base-3);ctx.lineTo(cx+3.7,base-3);ctx.lineTo(cx+2.9,base);ctx.lineTo(cx-2.9,base);ctx.closePath();ctx.fill(); /* the capacillo */
      ctx.fillStyle=col[(i+3+s)%3];ctx.fillRect(cx-3.3,base-4.4,6.6,1.6);ctx.beginPath();ctx.ellipse(cx,base-4.4,3.3,1.3,0,0,7);ctx.fill();}}  /* the fat disc */
  else if(kind==="muerto"){[x0+6,x0+17.2].forEach((cx,i)=>{
      ctx.fillStyle=(i+2)===hot%4?R.crustD:R.crust;ctx.beginPath();ctx.ellipse(cx,base-2.2,5.2,4,0,Math.PI,0);ctx.fill();ctx.fillRect(cx-5.2,base-2.2,10.4,2.2);
      ctx.strokeStyle=R.sugar;ctx.lineWidth=1.6;ctx.beginPath();ctx.moveTo(cx-4.4,base-3.2);ctx.quadraticCurveTo(cx,base-8,cx+4.4,base-3.2);ctx.stroke(); /* the bones over the round */
      ctx.beginPath();ctx.moveTo(cx-1.6,base-2.6);ctx.quadraticCurveTo(cx,base-7.4,cx+1.6,base-2.6);ctx.stroke();
      ctx.fillStyle=R.sugar;ctx.beginPath();ctx.arc(cx,base-6.6,1.4,0,7);ctx.fill();});}};                                /* the knob */
const paRackSide=rc=>{const{sx,sy,x,y}=rc,{s,trays}=paRack(x,y),R=PAN;
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.beginPath();ctx.ellipse(sx+16,sy+30.4,13,2,0,0,7);ctx.fill();   /* it stands on the floor */
  ctx.fillStyle=R.frame;ctx.fillRect(sx+2,sy+1,2.4,29);ctx.fillRect(sx+TS-4.4,sy+1,2.4,29);ctx.fillRect(sx+2,sy+1,TS-4,1.6); /* uprights and the top rail */
  ctx.fillStyle="rgba(255,255,255,.18)";ctx.fillRect(sx+2,sy+1,1,29);ctx.fillRect(sx+2,sy+1,TS-4,0.7);
  [8,17,26].forEach((lip,ti)=>{                                                                          /* three pans tilted toward you: a band of surface, then the lip */
    ctx.fillStyle=R.pan;ctx.fillRect(sx+4.4,sy+lip-3,TS-8.8,3);
    ctx.fillStyle=R.panL;ctx.fillRect(sx+4.4,sy+lip,TS-8.8,1.4);
    ctx.fillStyle="rgba(15,12,20,.35)";ctx.fillRect(sx+4.4,sy+lip+1.4,TS-8.8,0.8);                        /* every inside corner is dark */
    paGoods2D(trays[ti],s,ti,sx+4.4,sy+lip-1);});};
/* THE RACK FROM ABOVE: the frame, and the top pan with its goods seen from over them. */
const paRackTop=rc=>{const{sx,sy,x,y}=rc,{s,trays}=paRack(x,y),R=PAN,kind=trays[0],hot=(s+0)%6;
  ctx.fillStyle=R.frame;ctx.fillRect(sx+2,sy+6,TS-4,2.2);ctx.fillRect(sx+2,sy+24,TS-4,2.2);ctx.fillRect(sx+2,sy+6,2.2,20);ctx.fillRect(sx+TS-4.2,sy+6,2.2,20);
  ctx.fillStyle=R.pan;ctx.fillRect(sx+3,sy+8,TS-6,16);ctx.fillStyle=R.panL;ctx.fillRect(sx+3,sy+23,TS-6,1);   /* the top pan, its lip toward the room */
  const gx=(c,n)=>sx+16+(c-(n-1)/2)*8.6,gy=r=>sy+12+r*8;
  if(kind==="concha-v"||kind==="concha-c"){const cap=kind==="concha-v"?R.vanilla:R.choc,sc=kind==="concha-v"?R.vanillaD:R.chocD;let i=0;
    for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){const cx=gx(c,3),cy=gy(r);
      ctx.fillStyle=i===hot?R.crustD:R.crust;ctx.beginPath();ctx.arc(cx,cy,4.3,0,7);ctx.fill();
      ctx.fillStyle=cap;ctx.beginPath();ctx.arc(cx,cy,3.7,0,7);ctx.fill();
      ctx.strokeStyle=sc;ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(cx-2.4,cy-2.4);ctx.lineTo(cx+2.4,cy+2.4);ctx.moveTo(cx-2.4,cy+2.4);ctx.lineTo(cx+2.4,cy-2.4);ctx.stroke();}}
  else if(kind==="bolillo"){ctx.fillStyle=R.wickerD;ctx.fillRect(sx+4,sy+9,TS-8,14);ctx.strokeStyle=R.wicker;ctx.lineWidth=1;ctx.strokeRect(sx+4.5,sy+9.5,TS-9,13);
    let i=0;[11.6,15.4,19.2].forEach(yy=>[sx+10.2,sx+21.8].forEach(cx=>{ctx.fillStyle=i++===hot?R.crustD:R.crust;ctx.beginPath();ctx.ellipse(cx,sy+yy,5.2,1.7,0,0,7);ctx.fill();
      ctx.fillStyle=R.crumb;ctx.fillRect(cx-2.6,sy+yy-0.4,5.2,0.8);}));
    [[sx+13.2,sy+13.4],[sx+18.8,sy+17.4]].forEach(([cx,cy])=>{ctx.fillStyle=R.crust;ctx.beginPath();ctx.ellipse(cx,cy,5.2,1.7,0,0,7);ctx.fill();ctx.fillStyle=R.crumb;ctx.fillRect(cx-2.6,cy-0.4,5.2,0.8);});}
  else if(kind==="cuerno"){let i=0;for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){ctx.strokeStyle=i===hot?R.crustD:R.crust;ctx.lineWidth=2.6;
      ctx.beginPath();ctx.arc(gx(c,3),gy(r)+1,3,Math.PI*1.08,Math.PI*1.92);ctx.stroke();}}
  else if(kind==="oreja"){for(let r=0;r<2;r++)for(let i=0;i<6;i++){const cx=sx+6+i*4.1,cy=sy+12.2+r*7.6;                  /* laid flat and shingled: each face half under the next */
      ctx.fillStyle=R.caramel;ctx.beginPath();ctx.arc(cx-1.5,cy-1.1,2,0,7);ctx.arc(cx+1.5,cy-1.1,2,0,7);ctx.fill();
      ctx.beginPath();ctx.moveTo(cx-3.4,cy-0.6);ctx.lineTo(cx+3.4,cy-0.6);ctx.lineTo(cx,cy+2.4);ctx.closePath();ctx.fill();
      ctx.fillStyle=R.caramelL;ctx.beginPath();ctx.arc(cx,cy-0.7,1.1,0,7);ctx.fill();}}
  else if(kind==="polvoron"){const col=[R.pink,R.vain,R.cocoa];let i=0;for(let r=0;r<2;r++)for(let c=0;c<3;c++,i++){const cx=gx(c,3),cy=gy(r);
      ctx.fillStyle=R.cup;ctx.beginPath();ctx.arc(cx,cy,4.2,0,7);ctx.fill();ctx.fillStyle=col[(i+s)%3];ctx.beginPath();ctx.arc(cx,cy,3.5,0,7);ctx.fill();}}
  else if(kind==="muerto"){let i=0;for(let r=0;r<2;r++)for(let c=0;c<2;c++,i++){const cx=gx(c,2)+ (c?1:-1)*1.2,cy=gy(r);
      ctx.fillStyle=i===hot%4?R.crustD:R.crust;ctx.beginPath();ctx.arc(cx,cy,5.4,0,7);ctx.fill();
      ctx.strokeStyle=R.sugar;ctx.lineWidth=1.8;ctx.beginPath();ctx.moveTo(cx-4.4,cy);ctx.lineTo(cx+4.4,cy);ctx.moveTo(cx,cy-4.4);ctx.lineTo(cx,cy+4.4);ctx.stroke();
      ctx.fillStyle=R.sugar;ctx.beginPath();ctx.arc(cx,cy,1.5,0,7);ctx.fill();}}};
/* the engine's own TILEDRAW["S"], verbatim (engine/engine.js, grep `shelving: three loaded shelves`): a pack's
   TILEART entry REPLACES the engine's top view for every world (Object.assign(TILEDRAW,TILEART)), so the
   five other businesses' shelves are drawn here, unchanged, by the pack that displaced them. */
const shelfTopEngine=rc=>{const{sx,sy}=rc;
  ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+2,sy+2,TS-4,TS-4);
  ctx.fillStyle="#6E5638";[6,14,22].forEach(yy=>ctx.fillRect(sx+2,sy+yy,TS-4,2));
  ctx.fillStyle="#D9C9A3";[[6,3],[13,3],[20,3],[6,11],[15,11],[9,19],[18,19]].forEach(b=>ctx.fillRect(sx+b[0],sy+b[1],5,4));};
{const SHELF_SIDE=TILEART_SIDE["S"],SHELF_MESH=TILEART_MESH["S"];               /* the bookcase, kept whole for every world but the bakery */
 TILEART_SIDE["S"]=rc=>paHere()?paRackSide(rc):SHELF_SIDE(rc);
 TILEART_MESH["S"]=p=>paHere()?paRackMesh(p):SHELF_MESH(p);
 TILEART["S"]=rc=>paHere()?paRackTop(rc):shelfTopEngine(rc);}

/* ---- BEAUTIFY, THIRD SITTING — 2026-09-21, later still. Owner: "lets try the grass and the cones,
   dog house, and altar … can we also do the tree with its decor?" Five more shapes through the same
   seam, drawn by what each thing is made of. */

/* GRASS, STANDING. A tuft is blades from one root — cones, leaning outward, the ones toward the
   light longer and paler, one gone to straw — on a fist of soil. The tile is `stand` now, so the 3D
   camera asks for the shape; it has no side art, so the front and iso cameras keep painting it. */
TILEART_MESH["g"]=({x,y})=>{const h=(((x*7+y*13)%8)+8)%8,n=8+(h%3);
  const parts=[{s:"cyl",x:0,y:0.006,z:0,r:0.13,h:0.012,c:"#5A4632"}];                       /* the soil it holds */
  for(let i=0;i<n;i++){const a=i*(Math.PI*2/n)+h*0.35,lit=Math.cos(a+Math.PI*0.75)>0.2;
    const len=0.18+((i*3+h)%4)*0.04+(lit?0.04:0),lean=0.35+((i*5+h)%3)*0.15;              /* toward the light: longer */
    const bx=Math.cos(a)*0.045,bz=Math.sin(a)*0.045;
    parts.push({s:"cone",x:bx+Math.cos(a)*Math.sin(lean)*len*0.5,y:Math.cos(lean)*len*0.5,z:bz+Math.sin(a)*Math.sin(lean)*len*0.5,
      r:0.022,h:len,c:lit?"#A6DB8C":"#5E9E66",rx:Math.sin(a)*lean,rz:-Math.cos(a)*lean});}
  const a=h*0.9+2,len=0.16,lean=0.9;                                                        /* one blade gone to straw, nearly flat */
  parts.push({s:"cone",x:Math.cos(a)*Math.sin(lean)*len*0.5,y:Math.cos(lean)*len*0.5,z:Math.sin(a)*Math.sin(lean)*len*0.5,r:0.018,h:len,c:"#C9B66E",rx:Math.sin(a)*lean,rz:-Math.cos(a)*lean});
  return parts;};

/* THE TRAFFIC CONE. Moulded: a square base with a lip, the cone itself, and the reflective band —
   a slightly wider slice of cone, white, where the band is wrapped. A cone is the same from every
   side, which is why it was the one flat thing that never looked flat; it is a cone now anyway. */
TILEART_MESH["C"]=()=>[
  {s:"box",x:0,y:0.015,z:0,w:0.3,h:0.03,d:0.3,c:"#2A2D33"},                                 /* the base: black rubber, a thing on the tile, not paint on it (owner: "it overwrites/paints tiles") */
  {s:"box",x:0,y:0.04,z:0,w:0.2,h:0.02,d:0.2,c:"#3A3F46"},                                  /* the step the cone is moulded onto */
  {s:"cone",x:0,y:0.04+0.24,z:0,r:0.15,h:0.48,c:"#E0662B"},                                 /* the cone */
  {s:"cyl",x:0,y:0.24,z:0,rt:0.089,rb:0.108,h:0.06,c:"#F4F1EA"}];                           /* the band, wrapped where the cone is that wide */

/* THE DOGHOUSE. Built like a shed: a box body, two roof slabs meeting at a ridge, a dark arched
   door on the front, and the bone over it. The front faces the first open side. */
TILEART_MESH["9"]=({x,y})=>{
  const w=CW(),solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  const ry=!solid(x,y+1)?0:!solid(x+1,y)?Math.PI/2:!solid(x-1,y)?-Math.PI/2:Math.PI;
  const WALL="#8A6F4D",ROOF="#C0392B",RIDGE="#8E2A20",DOOR="#3E2F1E",BONE="#F6F2E8",pitch=0.62;
  const parts=[{s:"box",x:0,y:0.26,z:0,w:0.7,h:0.52,d:0.62,c:WALL},
    {s:"box",x:-0.19,y:0.62,z:0,w:0.46,h:0.035,d:0.74,c:ROOF,rz:pitch},{s:"box",x:0.19,y:0.62,z:0,w:0.46,h:0.035,d:0.74,c:ROOF,rz:-pitch},
    {s:"box",x:0,y:0.74,z:0,w:0.06,h:0.05,d:0.76,c:RIDGE},                                  /* the ridge cap */
    {s:"box",x:0,y:0.15,z:0.3,w:0.26,h:0.3,d:0.04,c:DOOR},{s:"cyl",x:0,y:0.3,z:0.3,r:0.13,h:0.04,c:DOOR,rx:Math.PI/2}, /* the arched door */
    {s:"box",x:0,y:0.47,z:0.32,w:0.14,h:0.03,d:0.02,c:BONE},{s:"sph",x:-0.08,y:0.47,z:0.32,r:0.028,c:BONE},{s:"sph",x:0.08,y:0.47,z:0.32,r:0.028,c:BONE}]; /* the bone */
  const cr=Math.cos(ry),sr=Math.sin(ry);
  return parts.map(p=>({...p,x:p.x*cr+p.z*sr,z:-p.x*sr+p.z*cr,ry:(p.ry||0)+ry}));};

/* THE TREE, WITH ITS DRESS. Grown: a trunk that tapers, two branches leaning out of it, a crown of
   six leaf masses in two greens, jacaranda blossoms on the outside of the crown in the season's
   bloom colour. Dressed for the night when the season says so — canopyDress's recipe, in parts: a
   garland of petals slung across the front of the crown, three papel streamers hanging BELOW it,
   and one sugar-skull lantern on a thread. One; three is a Christmas tree. Nothing without a season. */
TILEART_MESH["J"]=({x,y})=>{const h=(((x*7+y*13)%6)+6)%6,a0=h*1.05;
  const BARK="#6E4A2C",G1="#5A9C66",G2="#78B884",BLOOM=art("bloom","#B08FE0"); /* a step paler than the sprite's greens: a lit mesh shades itself, a sprite never did */
  const parts=[{s:"cyl",x:0,y:0.42,z:0,rt:0.07,rb:0.11,h:0.84,c:BARK},
    {s:"cyl",x:0.14,y:0.78,z:0.05,rt:0.03,rb:0.05,h:0.4,c:BARK,rz:-0.6},{s:"cyl",x:-0.13,y:0.82,z:-0.06,rt:0.03,rb:0.05,h:0.36,c:BARK,rz:0.65}];
  const crown=[[0,1.25,0,0.4],[0.28,1.1,0.1,0.32],[-0.27,1.12,-0.08,0.3],[0.05,1.08,-0.3,0.3],[-0.06,1.12,0.28,0.31],[0.1,1.5,0.05,0.3]];
  const c=Math.cos(a0),s2=Math.sin(a0);
  crown.forEach(([px,py,pz,r],i)=>parts.push({s:"sph",x:px*c-pz*s2,y:py,z:px*s2+pz*c,r,c:i%2?G2:G1}));
  for(let i=0;i<10;i++){const t=i*0.63+h,ph=0.5+(i%3)*0.5;                                 /* blossoms sit on the outside of the crown */
    parts.push({s:"sph",x:Math.cos(t)*Math.sin(ph)*0.44,y:1.25+Math.cos(ph)*0.36,z:Math.sin(t)*Math.sin(ph)*0.44,r:0.055,c:BLOOM});}
  const pal=art("papel",null);
  if(pal){const P=petalPal();                                                               /* THE DRESS, SECOND TRY (owner: "same with the decor") */
    meshPapel(parts,-0.5,1.02,0.46,0.5,1.02,0.46,pal,6,h);                                   /* a string of flags across the front of the crown */
    meshPapel(parts,0.46,1.0,-0.5,0.46,1.0,0.5,pal,6,h+3);                                   /* and one down the side, so it reads from the turn */
    for(let i=0;i<7;i++){const t=(i+0.5)/7,gx=-0.42+0.84*t,gy=0.84-2*t*(1-t)*0.14;            /* a chain of marigolds slung under the flags */
      meshMarigold(parts,gx,gy,0.44,0.055,P,h+i);}
    [-0.28,0,0.28].forEach((dx,i)=>{parts.push({s:"cyl",x:dx,y:0.82,z:0.3,r:0.006,h:0.2,c:"#3A2E26"}); /* the thread */
      parts.push({s:"box",x:dx,y:0.58,z:0.3,w:0.16,h:0.3,d:0.008,c:pal[(i+2)%pal.length]});          /* the streamer, hanging well below the crown */
      parts.push({s:"box",x:dx,y:0.42,z:0.3,w:0.16,h:0.05,d:0.008,c:pal[(i+5)%pal.length]});});      /* its scalloped hem, a second colour */
    parts.push({s:"cyl",x:0.2,y:0.95,z:0.44,r:0.006,h:0.14,c:"#3A2E26"});                             /* one lantern: a calaverita on a thread */
    parts.push({s:"sph",x:0.2,y:0.84,z:0.44,r:0.075,c:"#F6F2E8"});
    parts.push({s:"sph",x:0.17,y:0.855,z:0.51,r:0.016,c:"#3A2E26"},{s:"sph",x:0.23,y:0.855,z:0.51,r:0.016,c:"#3A2E26"}); /* the eyes */
    parts.push({s:"sph",x:0.2,y:0.91,z:0.46,r:0.022,c:"#E8478F"});}                                    /* the flower on its brow */
  return parts;};

/* LA OFRENDA, AS A THING ON A TABLE. A season prop, not a tile: the key is "prop:ofrenda" and the
   engine asks for it where the season sets the altar down. The 2D drawing's parts, built: the lower
   cloth, the upper tier, the arch as a torus with marigolds along it, three candles with flames, the
   empty frame at the top, pan de muerto, a calaverita, two cups of water, and cut paper along the
   front. Nothing without a season. */
TILEART_MESH["prop:ofrenda"]=()=>{const P=petalPal(),pal=art("papel",["#E8478F","#2FA5A0","#F2B705"]);
  /* SECOND TRY (owner: "add more detail to the altar"). Three tiers, as an ofrenda is built — earth, the
     middle, heaven — a cloth over each, an arch of ruffled marigolds, seven candles in glass, sugar
     skulls, two pan de muerto, oranges, a glass of water and a dish of salt, copal in its burner, the
     empty frame at the top, cut paper across the front of every tier and across the arch, and a path
     of loose petals on the ground in front, which is how the way is shown. */
  const parts=[{s:"box",x:0,y:0.14,z:0.02,w:0.96,h:0.28,d:0.56,c:"#5A2E7A"},{s:"box",x:0,y:0.285,z:0.02,w:0.96,h:0.01,d:0.56,c:"#7B4BA8"},   /* tier one: the cloth */
    {s:"box",x:0,y:0.39,z:-0.08,w:0.7,h:0.2,d:0.36,c:"#E2620F"},{s:"box",x:0,y:0.495,z:-0.08,w:0.7,h:0.01,d:0.36,c:"#F2870F"},              /* tier two */
    {s:"box",x:0,y:0.6,z:-0.17,w:0.44,h:0.2,d:0.2,c:"#2FA5A0"},{s:"box",x:0,y:0.705,z:-0.17,w:0.44,h:0.01,d:0.2,c:"#7BD3F7"},                /* tier three: heaven */
    {s:"torus",x:0,y:0.62,z:-0.24,r:0.46,t:0.028,arc:Math.PI,c:"#7A2E12"},                                                                /* the arch */
    {s:"cyl",x:-0.46,y:0.31,z:-0.24,r:0.028,h:0.62,c:"#7A2E12"},{s:"cyl",x:0.46,y:0.31,z:-0.24,r:0.028,h:0.62,c:"#7A2E12"}];               /* its legs, to the ground */
  for(let i=0;i<9;i++){const t=Math.PI*(0.06+0.88*i/8);meshMarigold(parts,Math.cos(t)*0.46,0.62+Math.sin(t)*0.46,-0.24,0.062,P,i);}       /* the arch's marigolds */
  meshPapel(parts,-0.42,0.62,-0.22,0.42,0.62,-0.22,pal,7,2);                                                                              /* cut paper across the arch */
  [[-0.4,0.29,0.18],[-0.25,0.29,0.22],[0.25,0.29,0.22],[0.4,0.29,0.18],[-0.2,0.5,0],[0.2,0.5,0],[0,0.71,-0.12]].forEach(([cx,cy,cz],i)=>{ /* seven veladoras */
    parts.push({s:"cyl",x:cx,y:cy+0.055,z:cz,r:0.03,h:0.11,c:i%2?"#F6F2E8":"#FBB024"});parts.push({s:"cyl",x:cx,y:cy+0.115,z:cz,r:0.032,h:0.01,c:"#FFF3C0"});
    parts.push({s:"cone",x:cx,y:cy+0.15,z:cz,r:0.014,h:0.05,c:"#FFC300"});});
  parts.push({s:"box",x:0,y:0.86,z:-0.2,w:0.22,h:0.2,d:0.03,c:"#3A2E26"},{s:"box",x:0,y:0.86,z:-0.18,w:0.16,h:0.14,d:0.01,c:"#F6F2E8"});   /* the empty frame, nobody named */
  [[-0.14,0.29,0.14],[0.14,0.29,0.14]].forEach(([px,py,pz])=>{parts.push({s:"sph",x:px,y:py+0.06,z:pz,r:0.065,sy:0.8,c:"#B8722E"});       /* two pan de muerto */
    parts.push({s:"box",x:px,y:py+0.115,z:pz,w:0.02,h:0.02,d:0.12,c:"#E8B86A"},{s:"box",x:px,y:py+0.115,z:pz,w:0.12,h:0.02,d:0.02,c:"#E8B86A"},{s:"sph",x:px,y:py+0.125,z:pz,r:0.02,c:"#E8B86A"});});
  [[-0.3,0.5,-0.04],[0.3,0.5,-0.04],[0.1,0.71,-0.2]].forEach(([px,py,pz],i)=>{parts.push({s:"sph",x:px,y:py+0.055,z:pz,r:0.055,c:"#F6F2E8"}); /* three calaveritas */
    parts.push({s:"sph",x:px-0.02,y:py+0.065,z:pz+0.05,r:0.011,c:"#3A2E26"},{s:"sph",x:px+0.02,y:py+0.065,z:pz+0.05,r:0.011,c:"#3A2E26"},{s:"sph",x:px,y:py+0.105,z:pz+0.02,r:0.016,c:i?"#2FA5A0":"#E8478F"});});
  [[-0.05,0.5,0.06],[0.03,0.5,0.1]].forEach(([px,py,pz])=>parts.push({s:"sph",x:px,y:py+0.045,z:pz,r:0.045,c:"#F2870F"}));                 /* oranges */
  parts.push({s:"cyl",x:-0.32,y:0.325,z:0.08,r:0.03,h:0.07,c:"#DDEBF2"},{s:"cyl",x:-0.32,y:0.35,z:0.08,r:0.028,h:0.01,c:"#9CC7E0"});      /* a glass of water */
  parts.push({s:"cyl",x:0.34,y:0.3,z:0.06,r:0.045,h:0.02,c:"#8A6F4D"},{s:"cyl",x:0.34,y:0.315,z:0.06,r:0.03,h:0.012,c:"#F6F2E8"});        /* salt in a dish */
  parts.push({s:"cyl",x:0,y:0.31,z:0.2,rt:0.04,rb:0.03,h:0.05,c:"#4A3524"},{s:"sph",x:0,y:0.36,z:0.2,r:0.018,c:"#E2620F"});               /* copal in its burner, lit */
  for(let i=0;i<3;i++)parts.push({s:"sph",x:0.01*i,y:0.42+i*0.06,z:0.2,r:0.02+i*0.01,c:"#C9C1B3"});                                        /* its smoke */
  meshPapel(parts,-0.46,0.28,0.31,0.46,0.28,0.31,pal,7,0);meshPapel(parts,-0.34,0.49,0.11,0.34,0.49,0.11,pal,5,3);                        /* cut paper across each tier's front */
  for(let i=0;i<14;i++){const t=i/14;parts.push({s:"sph",x:-0.3+Math.sin(i*2.1)*0.14,y:0.012,z:0.32+t*0.16,r:0.02,sy:0.4,c:P[2+(i%4)]});}   /* the petal path, on the ground in front */
  return parts;};

/* THE TABLE (owner: "tables too"). What the 2D drawing says it is: a round table with a gingham cloth,
   two plates, a chair either side. Built as it is made: a pedestal on a foot, the top, the cloth as a
   check of red squares laid on cream inside the circle, two plates, and two chairs — a seat on four
   legs with a back — facing each other across it. */
TILEART_MESH["T"]=({x,y})=>{const sd=(((x*7+y*13)%4)+4)%4,WOOD="#5E3B20",CLOTH="#F2E8D8",CHECK="#C0392B",PLATE="#FFFFFF",RIM="#C9CDD2";
  const parts=[{s:"cyl",x:0,y:0.015,z:0,r:0.16,h:0.03,c:WOOD},{s:"cyl",x:0,y:0.26,z:0,r:0.04,h:0.46,c:WOOD},                              /* the foot and the pedestal */
    {s:"cyl",x:0,y:0.505,z:0,r:0.34,h:0.03,c:CLOTH}];                                                                                    /* the top, under the cloth */
  for(let i=-3;i<3;i++)for(let j=-3;j<3;j++){if((i+j+8)%2)continue;const cx=(i+0.5)*0.1,cz=(j+0.5)*0.1;if(Math.hypot(cx,cz)>0.29)continue;
    parts.push({s:"box",x:cx,y:0.522,z:cz,w:0.1,h:0.004,d:0.1,c:CHECK});}                                                                 /* the gingham, a check clipped to the circle */
  [[-0.14,0],[0.14,0]].forEach(([px,pz])=>{parts.push({s:"cyl",x:px,y:0.53,z:pz,r:0.09,h:0.012,c:PLATE},{s:"cyl",x:px,y:0.537,z:pz,r:0.055,h:0.004,c:RIM});}); /* two plates */
  [[-0.43,0],[0.43,Math.PI]].forEach(([px,ry])=>{const cr=Math.cos(ry),sr=Math.sin(ry),at=(lx,lz)=>({x:px+lx*cr+lz*sr,z:-lx*sr+lz*cr});   /* two chairs, facing the table */
    let q=at(0,0);parts.push({s:"box",x:q.x,y:0.28,z:q.z,w:0.22,h:0.03,d:0.22,c:WOOD,ry});
    q=at(-0.1,0);parts.push({s:"box",x:q.x,y:0.42,z:q.z,w:0.03,h:0.26,d:0.22,c:WOOD,ry});                                                /* the back, on the far side */
    [[-0.09,-0.09],[0.09,-0.09],[-0.09,0.09],[0.09,0.09]].forEach(([lx,lz])=>{const l=at(lx,lz);parts.push({s:"cyl",x:l.x,y:0.13,z:l.z,r:0.014,h:0.26,c:WOOD});});});
  return parts;};

/* ---- BEAUTIFY, CREW ITERATION 11 — el taller ---- 2026-09-21. The interiors and the garage. Owner:
   "computers, … desks, … coffee machines, fridge, … car lifts, tires, car, and tool boxes." Seven shapes
   through the same seam, each built from what its own 2D drawing says it is made of (TILEDRAW / TILESIDE
   in the engine, TILE_PROPS above), in the order a person made it. VALUES ARE PAINTED, NOT LEFT TO THE
   LIGHT: with the day's ambient and sun a Lambert face gets 1.00 on top, 0.88 east, 0.78 south and 0.66
   west and north (Pili, from engine3d.js), so a step you want between two parts goes into their colours,
   and the darkest thing in a room is dark because it was painted dark. WHAT THESE REPLACE: an engine box
   wore its top-down drawing on its lid and took its height from the tallest ink in its side drawing
   (engine3d.js, t3BoxMats) — so a cup lay on its back on every counter tile, a second monitor sat on every
   desk's lid, the tool chest wore its drawers on top, and the counter run stepped up at machine tiles. All
   of that goes with the box. Two helpers: which way a thing faces (the shelf's rule — the first open
   side, south, east, west, north) and the turn that puts it there. */
const meshFacing=(x,y)=>{const w=CW(),solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  return !solid(x,y+1)?0:!solid(x+1,y)?Math.PI/2:!solid(x-1,y)?-Math.PI/2:Math.PI;};
const meshTurned=(parts,ry)=>{const cr=Math.cos(ry),sr=Math.sin(ry);return parts.map(p=>({...p,x:p.x*cr+p.z*sr,z:-p.x*sr+p.z*cr,ry:(p.ry||0)+ry}));};

/* THE DESK (owner: "computers", "desks"). What TILEDRAW["D"] and TILESIDE["D"] say it is: a slab on a
   left leg and a drawer unit on the right, an apron under it, three drawers with pulls, a monitor on a
   stand, a sheet of paper. Made in that order: the leg panel and the pedestal, the slab over them with
   AIR under it and the floor showing between, its underside painted dark (the shade under any top), a
   lit front edge, the three drawer faces and their pulls, then what was set on the slab — the monitor
   toward the back, a thin panel on a stalk on a foot disc, the screen the lightest thing on the desk; a
   keyboard under it (a monitor with nothing under it is a television); the paper on the left. Nothing
   reaches past ±0.46: HQ lays desks side by side. Faces the first open side, like the shelf. */
TILEART_MESH["D"]=({x,y})=>{
  const WOOD=C.desk,TOP=C.deskTop,UNDER="#3A2E26",EDGE="#C4A878",INK="#23272C",KEYS="#2F343A",SCREEN="#7FB3D5",PAPER="#F4F1EA",PULL="#D9C9A3";
  const parts=[{s:"box",x:-0.41,y:0.215,z:0,w:0.05,h:0.43,d:0.54,c:WOOD},                 /* the leg panel, left */
    {s:"box",x:0.27,y:0.215,z:-0.03,w:0.34,h:0.43,d:0.48,c:WOOD},                         /* the drawer pedestal, right, its faces set back from the slab's edge */
    {s:"box",x:0,y:0.455,z:0,w:0.9,h:0.04,d:0.6,c:TOP},                                   /* the slab, air under it */
    {s:"box",x:0,y:0.425,z:0,w:0.86,h:0.02,d:0.56,c:UNDER},                               /* its underside, painted dark */
    {s:"box",x:0,y:0.47,z:0.297,w:0.9,h:0.012,d:0.012,c:EDGE}];                           /* the lit front edge */
  [0.08,0.215,0.35].forEach(dy=>{parts.push({s:"box",x:0.27,y:dy,z:0.215,w:0.3,h:0.11,d:0.012,c:WOOD}); /* a drawer face */
    parts.push({s:"box",x:0.27,y:dy+0.062,z:0.214,w:0.34,h:0.012,d:0.006,c:UNDER});        /* the seam over it, dark */
    parts.push({s:"box",x:0.27,y:dy,z:0.228,w:0.09,h:0.02,d:0.016,c:PULL});});            /* its pull */
  parts.push({s:"cyl",x:0,y:0.481,z:-0.12,r:0.07,h:0.012,c:INK},                          /* the monitor's foot, a disc */
    {s:"box",x:0,y:0.53,z:-0.12,w:0.03,h:0.1,d:0.03,c:INK},                               /* the stalk, daylight either side of it */
    {s:"box",x:0,y:0.69,z:-0.12,w:0.34,h:0.22,d:0.03,c:INK},                              /* the panel, thin */
    {s:"box",x:0,y:0.695,z:-0.101,w:0.31,h:0.19,d:0.008,c:SCREEN},                        /* the screen, on its front face: the lightest thing here */
    {s:"box",x:0,y:0.483,z:0.09,w:0.26,h:0.015,d:0.1,c:KEYS},                             /* the keyboard, lying on the slab */
    {s:"box",x:-0.27,y:0.478,z:0.06,w:0.16,h:0.005,d:0.2,c:PAPER,ry:0.18});               /* the sheet of paper, not quite square to the edge */
  return meshTurned(parts,meshFacing(x,y));};

/* THE CAFÉ COUNTER (owner: "coffee machines"). What TILESIDE["K"] says it is: a counter body under a
   steel top with two dark panels on the front, and on it "a coffee machine on every third tile … the
   rest carry a cup and a napkin stand". K is laid in RUNS, so the carcass is the full tile wide and a
   run reads as one counter with no seam and one height; an end panel stands only where the run ends.
   The top is dead flat with a nosing along the front edge. The front faces the open side ACROSS the run
   (south, else north; east, else west). The machine, as one is built and as Pili reads it: a bright
   steel drip tray at its foot, the body, a narrower hopper on top (the wide-to-narrow step is the
   read), the group head hanging off the front with AIR between it and the cup under it (no air is a
   microwave), the portafilter locked in with its handle out, one warm light. The machine is the darkest
   thing in the room; the counter keeps the theme's counter colour. */
TILEART_MESH["K"]=({x,y})=>{
  const w=CW(),isK=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="K";};
  const solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  const E=isK(x+1,y),Wt=isK(x-1,y),N=isK(x,y-1),S=isK(x,y+1),alongX=E||Wt||!(N||S);
  /* the whole run agrees on its front: walk the run to both ends and count which side across it has
     more open floor — one tile with a plant behind it must not turn its panels the other way */
  const run=[];if(alongX){let a=x;while(isK(a-1,y))a--;for(;isK(a,y);a++)run.push([a,y]);}else{let a=y;while(isK(x,a-1))a--;for(;isK(x,a);a++)run.push([x,a]);}
  const open=(dx,dy)=>run.filter(([gx,gy])=>!solid(gx+dx,gy+dy)).length;
  const ry=alongX?(open(0,1)>=open(0,-1)?0:Math.PI):(open(1,0)>=open(-1,0)?Math.PI/2:-Math.PI/2);
  const endA=ry===0?!Wt:ry===Math.PI?!E:ry===Math.PI/2?!S:!N,endB=ry===0?!E:ry===Math.PI?!Wt:ry===Math.PI/2?!N:!S; /* which local end is the run's end */
  const BODY=C.counter,TOPC="#AAB4C0",NOSE="#C9CFD6",PANEL="#5E6874",END="#6E7884",MACH="#2F343B",HOP="#23272C",TRAY="#C9CDD2",LIGHT="#E0662B",CUP="#F4F1EA",NAP="#C9B7A0";
  const parts=[{s:"box",x:0,y:0.265,z:0,w:1.0,h:0.53,d:0.8,c:BODY},                     /* the carcass, the full tile so the run is one counter */
    {s:"box",x:0,y:0.545,z:0.01,w:1.0,h:0.03,d:0.84,c:TOPC},                             /* the top, dead flat */
    {s:"cyl",x:0,y:0.545,z:0.43,r:0.02,h:1.0,c:NOSE,rz:Math.PI/2},                        /* the nosing along the front edge */
    {s:"box",x:-0.24,y:0.25,z:0.405,w:0.26,h:0.2,d:0.014,c:PANEL},{s:"box",x:0.24,y:0.25,z:0.405,w:0.26,h:0.2,d:0.014,c:PANEL}]; /* the two front panels */
  if(endA)parts.push({s:"box",x:-0.5,y:0.265,z:0,w:0.02,h:0.51,d:0.78,c:END});           /* the end panels, where the run stops */
  if(endB)parts.push({s:"box",x:0.5,y:0.265,z:0,w:0.02,h:0.51,d:0.78,c:END});
  const cup=(cx,cy,cz)=>{parts.push({s:"cyl",x:cx,y:cy+0.028,z:cz,r:0.034,h:0.056,c:CUP});parts.push({s:"torus",x:cx+0.042,y:cy+0.03,z:cz,r:0.018,t:0.007,c:CUP,ry:Math.PI/2});}; /* a cup with its handle to the right */
  if((((x|0)+(y|0))%3+3)%3===2){                                                            /* the espresso machine, on every third tile */
    parts.push({s:"box",x:0,y:0.57,z:0.1,w:0.34,h:0.02,d:0.16,c:TRAY},                    /* the drip tray at its foot, bright steel */
      {s:"box",x:0,y:0.71,z:-0.08,w:0.44,h:0.3,d:0.3,c:MACH},                            /* the body, 0.56 to 0.86 */
      {s:"box",x:0,y:0.91,z:-0.1,w:0.3,h:0.1,d:0.24,c:HOP},                              /* the hopper on top, narrower: the step */
      {s:"cyl",x:0,y:0.74,z:0.11,r:0.04,h:0.05,c:HOP},                                   /* the group head, hanging off the front */
      {s:"cyl",x:0,y:0.708,z:0.11,r:0.046,h:0.014,c:TRAY},                               /* the portafilter locked in */
      {s:"box",x:0,y:0.708,z:0.2,w:0.02,h:0.018,d:0.12,c:HOP},                           /* its handle, out toward the barista's hand */
      {s:"box",x:-0.15,y:0.8,z:0.077,w:0.05,h:0.04,d:0.014,c:LIGHT});                    /* the one warm light: it is on */
    cup(0,0.58,0.11);}                                                                     /* a cup under the group, air between: top 0.636, group 0.715 */
  else{cup(-0.2,0.56,0.1);                                                                 /* a cup, and a napkin stand */
    parts.push({s:"box",x:0.2,y:0.62,z:0.04,w:0.18,h:0.12,d:0.07,c:NAP},{s:"box",x:0.2,y:0.7,z:0.04,w:0.13,h:0.08,d:0.03,c:CUP});}
  return meshTurned(parts,ry);};

/* THE FRIDGE (owner: "fridge"). What TILEDRAW["W"] says it is: a light-grey box the height of the tile,
   a horizontal seam a bit above the middle, two dark vertical handles on the right of each door. Made:
   a dark plinth at the floor, the carcass on it — the tallest furniture in the room, and the floor
   showing round it — the two door faces a hair proud and a step lighter than the carcass, the seam
   between them set back, the two handles proud on the same side, and one warm note under a magnet.
   Faces its first open side. */
TILEART_MESH["W"]=({x,y})=>{
  const CARC="#AEB6BE",DOOR="#BCC4CC",SEAM="#5A6068",HANDLE="#5A6068",PLINTH="#2F343A",MAG="#E0B45C";
  const parts=[{s:"box",x:0,y:0.025,z:0,w:0.6,h:0.05,d:0.53,c:PLINTH},                    /* the plinth */
    {s:"box",x:0,y:0.5,z:0,w:0.62,h:0.9,d:0.55,c:CARC},                                   /* the carcass, 0.05 to 0.95 */
    {s:"box",x:0,y:0.785,z:0.28,w:0.6,h:0.31,d:0.01,c:DOOR},                              /* the freezer door, 0.63 to 0.94 */
    {s:"box",x:0,y:0.345,z:0.28,w:0.6,h:0.55,d:0.01,c:DOOR},                              /* the fridge door, 0.07 to 0.62 */
    {s:"box",x:0,y:0.625,z:0.276,w:0.6,h:0.01,d:0.006,c:SEAM},                            /* the seam, set back */
    {s:"box",x:0.24,y:0.78,z:0.295,w:0.03,h:0.22,d:0.02,c:HANDLE},                        /* the freezer handle, proud */
    {s:"box",x:0.24,y:0.4,z:0.295,w:0.03,h:0.22,d:0.02,c:HANDLE},                         /* the fridge handle, the same side */
    {s:"box",x:-0.12,y:0.86,z:0.288,w:0.05,h:0.035,d:0.006,c:MAG}];                        /* a magnet: one warm note */
  return meshTurned(parts,meshFacing(x,y));};

/* THE RED ROLLING TOOL CHEST (owner: "tool boxes"). What TILE_PROPS["8"] says it is: a red body on
   black casters, four drawer seams with a chrome pull on each, a chrome bar up at the top. Made: four
   casters, the carcass floated over them with the floor showing round it, a genuinely dark seam under
   each drawer face and its pull, the steel top plate, and the push handle — two uprights and a
   crossbar — up one end. On the plate, a rag and a wrench, where the last hand left them. Faces its
   first open side. */
TILEART_MESH["8"]=({x,y})=>{
  const RED="#B3352B",SEAM="#5E1810",PULL="#C9CDD3",STEEL="#B9BEC4",BLACK="#2A2D33",RAG="#C9553F";
  const parts=[];
  [[-0.2,-0.14],[0.2,-0.14],[-0.2,0.14],[0.2,0.14]].forEach(([cx,cz])=>parts.push({s:"cyl",x:cx,y:0.04,z:cz,r:0.04,h:0.04,c:BLACK,rz:Math.PI/2})); /* four casters, axles across */
  parts.push({s:"box",x:0,y:0.43,z:0,w:0.55,h:0.62,d:0.42,c:RED});                       /* the carcass, 0.12 to 0.74, a gap over the casters */
  for(let i=0;i<4;i++){const dy=0.2+i*0.125;
    parts.push({s:"box",x:0,y:dy-0.0675,z:0.213,w:0.55,h:0.012,d:0.01,c:SEAM});           /* the seam under each drawer face, dark */
    parts.push({s:"box",x:0,y:dy,z:0.22,w:0.16,h:0.022,d:0.018,c:PULL});}                 /* the pull, centred */
  parts.push({s:"box",x:0,y:0.75,z:0,w:0.57,h:0.02,d:0.44,c:STEEL});                     /* the steel top plate */
  parts.push({s:"box",x:0.1,y:0.77,z:0.05,w:0.16,h:0.02,d:0.12,c:RAG});                   /* a rag, dropped */
  parts.push({s:"box",x:-0.1,y:0.768,z:-0.08,w:0.22,h:0.014,d:0.03,c:PULL,ry:0.4});       /* a wrench, where it was put down */
  parts.push({s:"cyl",x:-0.3,y:0.81,z:-0.13,r:0.012,h:0.12,c:PULL},{s:"cyl",x:-0.3,y:0.81,z:0.13,r:0.012,h:0.12,c:PULL}, /* the push handle's uprights */
    {s:"cyl",x:-0.3,y:0.87,z:0,r:0.013,h:0.3,c:PULL,rx:Math.PI/2});                       /* and its crossbar */
  return meshTurned(parts,meshFacing(x,y));};

/* THE TIRE STACK (owner: "tires"). What TILE_PROPS["0"] says it is: THREE tires, one above the other,
   each with its hub hole — "a zero IS a tire". One mould made all three, so they are the same tire
   (.claude/skills/how-its-made: variation enters at the step it entered, and nowhere earlier); they were thrown
   on the pile one at a time, so the top one landed a little off, and the ones underneath carry the
   weight. The top one is painted a step lighter — the two below sit in its shade — and the rim of the
   top tire shows through its hole, the one light value in the stack. */
TILEART_MESH["0"]=({x,y})=>{const h=(((x*7+y*13)%5)+5)%5,TYRE="#26262B",TOPT="#3A3A41",RIM="#6B6B72",a=h*0.7+2.4;
  const parts=[];
  for(let i=0;i<3;i++){const off=i===2?0.03:0;
    parts.push({s:"torus",x:Math.cos(a)*off,y:0.06+i*0.11,z:Math.sin(a)*off,r:0.22,t:0.075,c:i===2?TOPT:TYRE,rx:Math.PI/2});}
  parts.push({s:"cyl",x:Math.cos(a)*0.03,y:0.27,z:Math.sin(a)*0.03,r:0.14,h:0.012,c:RIM}); /* the rim, seen through the top hole */
  return parts;};

/* TACHO'S CAPRICE (owner: "car"). What TILE_PROPS["6"] says it is: "a long burgundy sedan" — a body
   the length of the tile and more, a darker cabin set back on it, glass, a chrome strip low along the
   body, wheels with grey hubs. Made: four wheels on their hubs, touching the ground and proud of the
   body; the under-body, dark; the long low body over it; the cabin set back with its front edge at
   the body's midpoint — a long hood is what makes it a Caprice; one continuous band of glass round
   the cabin, brighter than anything else on it; four pillars; the roof painted a step lighter than the
   body; the chrome strip along each side. No lamps, no grille, no handles: at 35 px a tile they are
   noise. A tile and a half long — parts are not clipped and nothing of its kind is laid beside it —
   parked along x, parallel to the taller's front. */
TILEART_MESH["6"]=()=>{
  const BODY="#7A2E2E",ROOF="#8A3636",CABIN="#5E2222",GLASS="#BFD3E0",CHROME="#C9CDD3",TYRE="#1E1E22",HUB="#8E8E96",UNDER="#1A1D22";
  const parts=[];
  [[-0.5,-0.3],[0.5,-0.3],[-0.5,0.3],[0.5,0.3]].forEach(([wx,wz])=>{parts.push({s:"cyl",x:wx,y:0.1,z:wz,r:0.1,h:0.08,c:TYRE,rx:Math.PI/2}); /* a wheel */
    parts.push({s:"cyl",x:wx,y:0.1,z:wz,r:0.045,h:0.086,c:HUB,rx:Math.PI/2});});                                                        /* its hub */
  parts.push({s:"box",x:0,y:0.135,z:0,w:1.4,h:0.03,d:0.56,c:UNDER},                       /* the under-body, the darkest thing on it */
    {s:"box",x:0,y:0.225,z:0,w:1.5,h:0.15,d:0.62,c:BODY},                                 /* the body, 0.15 to 0.30 */
    {s:"box",x:-0.275,y:0.34,z:0,w:0.55,h:0.08,d:0.5,c:GLASS},                            /* the glass band, 0.30 to 0.38, all the way round */
    {s:"box",x:-0.275,y:0.4,z:0,w:0.55,h:0.04,d:0.52,c:ROOF});                            /* the roof, painted lighter */
  [[-0.535,-0.235],[-0.015,-0.235],[-0.535,0.235],[-0.015,0.235]].forEach(([px,pz])=>parts.push({s:"box",x:px,y:0.34,z:pz,w:0.03,h:0.08,d:0.03,c:CABIN})); /* the pillars */
  [-0.316,0.316].forEach(pz=>parts.push({s:"box",x:0,y:0.17,z:pz,w:1.5,h:0.02,d:0.012,c:CHROME}));                                 /* the chrome strip, low along each side */
  return parts;};

/* THE TWO-POST LIFT WITH A CAR UP (owner: "car lifts"). What TILE_PROPS["7"] says it is: two grey posts
   with a beam across the top, the arms, and a BLUE car — a customer's, not the Caprice — up on them
   with its wheels hanging. Made as one is installed: two dark bases bolted to the slab, a post on each
   with its warning stripe, the overhead beam tying them (that is what makes it a lift), the arms
   reaching in from each post to the car's lift points, a pad at the end of each, and the car up on
   the pads at half height, its under-body the darkest thing in the bay. The bay is `i7i`, so the car
   runs along x and the posts stand north and south of it; the car sits a little east of the posts so
   they hold it at its lift points and do not cut it in half from the door. */
TILEART_MESH["7"]=()=>{
  const POST="#6A7480",BASE="#2F353C",ARM="#9EA8B3",STRIPE="#E0B45C",UNDER="#1A1D22",BODY="#3C5C8A",ROOF="#4C6C9A",CABIN="#2C4468",GLASS="#BFD3E0",TYRE="#1E1E22",HUB="#8E8E96";
  const parts=[],CX=0.12;                                                                  /* the car's centre, east of the posts */
  [-0.31,0.31].forEach(pz=>{const sg=Math.sign(pz);
    parts.push({s:"box",x:0,y:0.1,z:pz,w:0.16,h:0.2,d:0.14,c:BASE});                       /* the base, dark */
    parts.push({s:"box",x:0,y:0.7,z:pz,w:0.11,h:1.0,d:0.11,c:POST});                       /* the post, 0.2 to 1.2 */
    parts.push({s:"box",x:0,y:0.33,z:pz,w:0.114,h:0.05,d:0.114,c:STRIPE});                 /* its warning stripe */
    [CX-0.25,CX+0.25].forEach(qx=>{const z0=pz-sg*0.055,z1=sg*0.16,dx=qx,dz=z1-z0,L=Math.hypot(dx,dz); /* an arm from the post's face to a lift point */
      parts.push({s:"cyl",x:dx/2,y:0.5,z:(z0+z1)/2,r:0.03,h:L,c:ARM,rx:Math.PI/2,ry:Math.atan2(dx,dz)});
      parts.push({s:"box",x:qx,y:0.515,z:z1,w:0.07,h:0.02,d:0.07,c:UNDER});});});          /* its pad */
  parts.push({s:"box",x:0,y:1.16,z:0,w:0.12,h:0.08,d:0.73,c:POST});                        /* the overhead beam, tying the posts */
  [[CX-0.3,-0.21],[CX+0.3,-0.21],[CX-0.3,0.21],[CX+0.3,0.21]].forEach(([wx,wz])=>{parts.push({s:"cyl",x:wx,y:0.5,z:wz,r:0.08,h:0.06,c:TYRE,rx:Math.PI/2}); /* a wheel, hanging */
    parts.push({s:"cyl",x:wx,y:0.5,z:wz,r:0.036,h:0.066,c:HUB,rx:Math.PI/2});});
  parts.push({s:"box",x:CX,y:0.535,z:0,w:0.86,h:0.03,d:0.4,c:UNDER},                       /* the car's under-body, the darkest thing in the bay */
    {s:"box",x:CX,y:0.62,z:0,w:0.9,h:0.14,d:0.44,c:BODY},                                  /* the body, 0.55 to 0.69 */
    {s:"box",x:CX-0.17,y:0.73,z:0,w:0.42,h:0.08,d:0.36,c:GLASS},                           /* the glass band */
    {s:"box",x:CX-0.17,y:0.79,z:0,w:0.42,h:0.04,d:0.38,c:ROOF});                           /* the roof, lighter */
  [[CX-0.365,-0.17],[CX+0.025,-0.17],[CX-0.365,0.17],[CX+0.025,0.17]].forEach(([px,pz])=>parts.push({s:"box",x:px,y:0.73,z:pz,w:0.03,h:0.08,d:0.03,c:CABIN})); /* the pillars */
  return parts;};

/* ---- BEAUTIFY, CREW ITERATION 11 — la calle ----
   Owner: "lets do a crew mode to try to fix as many things … rails, fences, … bridge, petals, trolley,
   … fruit stands". The street and the park, built the way each thing was built (.claude/skills/how-its-made):
   a picket fence is posts set in the ground, two rails and pickets nailed on; a balustrade is a shoe,
   panes, posts and a cap; a crate is a slatted box and what a hand set in it; a counter is one carcase
   the length of its run. Same seam as the sittings above, colours a step paler than the pictures they
   replace, because a lit mesh shades itself (docs/3D-LOG.md 2026-09-21). The bridge and the tram are
   the engine's (scratchpad: bridge-parts.md, trolley-parts.md) — the hook never reaches `^`. */

/* A CREST OF PETALS. Content cannot change the ground bake's density (engine.js, petalSpill: a function
   of distance from the bridge only); what it can add is the line where a drift meets something — a
   fence's foot, a curb — a dark under and six to ten petals standing a hair proud of it. A petal at
   this scale is a flattened ellipsoid; the fan and the rib are the picture's job. Colours from
   petalPal(), the dark end kept for the under. In season only; the caller asks petalsOn(). (Pili) */
const meshPetalCrest=(parts,n,seed,ax,a,b,off,y0)=>{const P=petalPal();let sd=((seed|0)*7919+13)&0x7fffffff;const rnd=()=>{sd=(sd*1103515245+12345)&0x7fffffff;return sd/0x7fffffff;};
  const at=(al,o)=>ax==="x"?{x:al,z:o}:{x:o,z:al};let q=at((a+b)/2,off);
  parts.push({s:"box",x:q.x,y:y0+0.006,z:q.z,w:(b-a)*0.92,h:0.012,d:0.11,c:"#5A2E12",ry:ax==="x"?0:Math.PI/2});        /* the dark under the drift */
  for(let i=0;i<n;i++){q=at(a+0.06+rnd()*(b-a-0.12),off+(rnd()-0.5)*0.07);
    parts.push({s:"sph",x:q.x,y:y0+0.02,z:q.z,r:0.05,sx:1.2,sy:0.25,c:P[1+((i+(seed|0))%(P.length-1))],ry:rnd()*Math.PI});}};

/* THE PICKET FENCE. One post a tile, at the tile's centre — a rail bay wants a post every six feet, and
   a tile is about that; two rails on the yard side running post to post THROUGH the tile edges, so each
   tile's rail spans the whole tile and butts its neighbour's; four pickets a bay on the street side, cut
   from one stock on one jig — one width, one point — and nailed on by hand, which is where the variation
   enters: a hair higher or lower, one leaning a degree, three weathered shades. The rails a step darker
   than the pickets: that behind-value is the depth (Pili). A corner is two runs meeting at the corner
   post; a run ends at its post and nothing overhangs; the post's cut top is lit. A neighbour is the same
   GLYPH: the barricade beside the crew pen is kind `fence` too, and reading the kind is what stood the
   engine's panels at 90° in mid-air there (docs/BEAUTIFY.md, row F). The park's sixty tiles are one
   fence and the site's are the same fence, because this pack draws one F in every other camera. In
   season, a crest of petals along its foot on the park side within three tiles of the bridge. */
TILEART_MESH["F"]=({x,y})=>{
  const w=CW(),F=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="F";};
  const open=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !!r&&r[gx]!==undefined&&!SOLID.has(r[gx]);};
  const N=F(x,y-1),S=F(x,y+1),E=F(x+1,y),Wt=F(x-1,y),h=(((x*7+y*13)%5)+5)%5;
  const PICK=["#A87F4F","#B08A58","#9E7748"],TIP="#B99464",RAIL="#6B4F2E",POST="#6B4F2E",CAPC="#B08E5E",H=0.72;
  const parts=[],runs=[],corner=(E||Wt)&&(N||S);
  /* a run: at a corner each run stops at the corner post in the tile's centre; a straight bay spans the
     tile; a run's END spans the tile too and gets an end post at the edge of the gap, so a gate opening
     is the open tile and not the open tile and a half */
  if(E||Wt)runs.push({ax:"x",a:corner&&!Wt?0:-0.5,b:corner&&!E?0:0.5,end:corner?0:!Wt?-1:!E?1:0,s:open(x,y+1)?1:open(x,y-1)?-1:1}); /* rails face the yard: the open side */
  if(N||S)runs.push({ax:"z",a:corner&&!N?0:-0.5,b:corner&&!S?0:0.5,end:corner?0:!N?-1:!S?1:0,s:open(x+1,y)?1:open(x-1,y)?-1:1});
  if(!runs.length)runs.push({ax:"x",a:-0.5,b:0.5,end:2,s:open(x,y+1)?1:-1});                   /* alone, a whole bay east-west, a post at each end */
  const pet=typeof petalsOn==="function"&&petalsOn()&&typeof bridgeDist==="function"&&bridgeDist(w,x,y)<=3;
  let px=0,pz=0;
  const post=(qx,qz)=>{parts.push({s:"box",x:qx,y:0.41,z:qz,w:0.09,h:0.82,d:0.09,c:POST});
    parts.push({s:"box",x:qx,y:0.83,z:qz,w:0.11,h:0.02,d:0.11,c:CAPC});};                       /* a post, its cut top lit */
  runs.forEach(({ax,a,b,end,s},ri)=>{const ry=ax==="x"?0:Math.PI/2,at=(al,off)=>ax==="x"?{x:al,z:off}:{x:off,z:al};
    if(ax==="x")pz=s*0.04;else px=s*0.04;                                                      /* the post stands behind the rails */
    [0.24,0.56].forEach(yy=>{const q=at((a+b)/2,-s*0.01);parts.push({s:"box",x:q.x,y:yy,z:q.z,w:b-a,h:0.05,d:0.03,c:RAIL,ry});});
    [-0.38,-0.13,0.13,0.38].forEach((al,i)=>{if(al<a-0.01||al>b+0.01)return;
      const q=at(al,-s*0.037),k=(i+h+ri)%3,ph=H-0.07-k*0.014,lean=((i*7+h)%3-1)*0.012;
      parts.push({s:"box",x:q.x,y:0.05+ph/2,z:q.z,w:0.13,h:ph,d:0.025,c:PICK[k],ry,rz:lean});    /* the board, a hair off the ground */
      parts.push({s:"cone",x:q.x,y:0.05+ph+0.04,z:q.z,r:0.072,h:0.08,c:TIP,sz:0.36,ry});});      /* its point, off the jig */
    if(end===2||end===-1){const q=at(-0.455,s*0.04);post(q.x,q.z);}                             /* the end post, at the edge of the gap */
    if(end===2||end===1){const q=at(0.455,s*0.04);post(q.x,q.z);}
    if(pet)meshPetalCrest(parts,6+(h%4),x*31+y*17+ri,ax,a,b,s*0.13,0);});                       /* the drift, against the foot on the park side */
  post(px,pz);                                                                                  /* the bay post, one a tile */
  return parts;};

/* THE RAIL ROUND THE WELL. In this pack it is a glass divider (owner, 2026-09-16: "make it a glass
   divider"; TILEART_SIDE_GLASS above) — but a vertex-coloured Lambert mesh has no alpha, and a pane drawn
   as a pale sheet was rendered and looked at: a bathtub wall that hid the flight, which is the one thing
   the divider exists to show. So the 3D camera builds what a glazier fits round an opening MINUS the
   glass: the shoe channel bolted along the lip, the posts, and the cap rail — one bar the length of the
   run, unbroken, dark over the pale floor with a light strip on top (Pili: a light cap over this floor
   is Δ38 after tint and fails). It stands on the LIP of the well and faces it — wellDepth of the four
   neighbours says which lip, the engine's own rule for a rail beside a well — and it is waist-high,
   which is what a guard rail is. A post at the near edge and the centre; the far edge is the next
   tile's near post, or an end post where the run ends. The pane has its alpha now — `a:` in the mesh view
   (crew iteration 11): 0.45, so the flight shows through it, and the frame says where the edge is. */
TILEART_MESH["◺"]=({x,y})=>{
  const w=CW(),wl=(gx,gy)=>typeof wellDepth==="function"&&wellDepth(w,gx,gy)>0;
  const R=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="◺";};
  const lip=wl(x,y+1)?[0,0.44,0]:wl(x,y-1)?[0,-0.44,0]:wl(x+1,y)?[0.44,0,Math.PI/2]:wl(x-1,y)?[-0.44,0,Math.PI/2]:[0,0,0];
  const ry=lip[2],ax=ry?"z":"x",ends=ax==="x"?!R(x+1,y):!R(x,y+1);
  const at=(al,off)=>ax==="x"?{x:lip[0]+al,z:lip[1]+off}:{x:lip[0]+off,z:lip[1]+al};
  const CAP="#3A3F46",CAPL="#8E98A3",POST="#4A5058",H=0.62,parts=[];
  let q=at(0,0);
  parts.push({s:"box",x:q.x,y:H-0.03,z:q.z,w:1,h:0.06,d:0.07,c:CAP,ry});                       /* the cap rail: one line, the whole run */
  parts.push({s:"box",x:q.x,y:H+0.004,z:q.z,w:1,h:0.008,d:0.07,c:CAPL,ry});                    /* its top, where the key lands */
  parts.push({s:"box",x:q.x,y:(H-0.06)/2,z:q.z,w:1,h:H-0.08,d:0.02,c:"#D6E6EC",a:0.45,ry});      /* the pane: glass at 0.45, the flight shows through it (a: in the mesh view, crew iteration 11) */
  [-0.475,0].concat(ends?[0.475]:[]).forEach(al=>{q=at(al,0);parts.push({s:"box",x:q.x,y:(H-0.06)/2,z:q.z,w:0.05,h:H-0.06,d:0.05,c:POST,ry});});
  return parts;};                                                                              /* no shoe at the floor: with a bottom bar it rendered as a ladder on its side */

/* THE PRODUCE CRATE. A slatted box nailed from one pattern — four corner posts standing a thumb proud of
   the slats (that is what says crate and not box), three slats a side with a gap between, a rim — so
   every crate is the same crate; what differs is what a grocer set in it, ONE KIND to a crate, by hand,
   so it mounds and touches and spills over the front. The picture mixes a tomato, a chile and a banana
   in each; that is a diagram of the word "produce". Which crate holds what follows the picture's own
   parity, so the plan and the shape agree. The crate goes dark and the mouth darkest so the fruit reads
   against it, and the fruit keeps the picture's saturation (Pili). Tomatoes are siblings off one plant:
   one radius, a pack on the bottom, a second layer in the hollows, one on the peak, each with its green
   star where the stem was, tumbled a little. A chile is a thin cone bent at the tip, lying every which
   way. A hand of bananas is four fingers on one stem, each finger three short cylinders in a curve. */
const meshTomato=(parts,tx,ty,tz,r,seed,col)=>{const a=seed*1.7,dx=Math.cos(a)*r*0.25,dz=Math.sin(a)*r*0.25;
  parts.push({s:"sph",x:tx,y:ty,z:tz,r,sy:0.9,c:col});
  parts.push({s:"sph",x:tx+dx,y:ty+r*0.82,z:tz+dz,r:r*0.34,sy:0.3,c:"#4E9A3E"});                /* the star, where the stem was */
  parts.push({s:"cyl",x:tx+dx,y:ty+r*0.9,z:tz+dz,r:r*0.07,h:r*0.3,c:"#3E7A34"});};
TILEART_MESH["H"]=({x,y})=>{const alt=(((x*3+y*5)%7)+7)%7,kind=alt<3?"tomato":alt<5?"chile":"banana";
  let sd=(x*131+y*71+7)|0;const rnd=()=>{sd=(sd*1103515245+12345)&0x7fffffff;return sd/0x7fffffff;};
  const POSTC="#6B4F2E",SLAT="#7A5B36",SLATL="#8A6A42",MOUTH="#3A2A18",parts=[],T=0.44,FILL=0.34;
  [[-0.37,-0.29],[0.37,-0.29],[-0.37,0.29],[0.37,0.29]].forEach(([cx,cz])=>parts.push({s:"box",x:cx,y:(T+0.05)/2,z:cz,w:0.06,h:T+0.05,d:0.06,c:POSTC})); /* four posts, proud by a thumb */
  [0.08,0.2,0.32].forEach(sy=>{[-0.3,0.3].forEach(z=>parts.push({s:"box",x:0,y:sy,z,w:0.74,h:0.1,d:0.03,c:SLAT}));                   /* three slats a side, a gap between */
    [-0.385,0.385].forEach(xx=>parts.push({s:"box",x:xx,y:sy,z:0,w:0.03,h:0.1,d:0.58,c:SLAT}));});
  [[0,-0.3,0.74,0.03],[0,0.3,0.74,0.03],[-0.385,0,0.03,0.58],[0.385,0,0.03,0.58]].forEach(([cx,cz,ww,dd])=>parts.push({s:"box",x:cx,y:T-0.03,z:cz,w:ww,h:0.06,d:dd,c:SLATL})); /* the rim, lit */
  parts.push({s:"box",x:0,y:FILL-0.05,z:0,w:0.72,h:0.1,d:0.56,c:MOUTH});                                                            /* the mouth: the darkest thing on the street, the fruit against it */
  if(kind==="tomato"){const r=0.095,RED=["#D4382A","#C9331F","#DE4232"];let i=0;
    const one=(tx,ty,tz)=>{meshTomato(parts,tx+(rnd()-0.5)*0.016,ty,tz+(rnd()-0.5)*0.016,r,i+alt,RED[(i++ +alt)%3]);};
    [-0.2,0,0.2].forEach(tx=>{one(tx,FILL+r,-0.19);one(tx,FILL+r,0);one(tx,FILL+r+0.03,0.25);});                                    /* the bottom, packed; the front row tumbled onto the rim, spilling over it */
    [[-0.1,-0.1],[0.1,-0.1],[-0.1,0.1],[0.1,0.1]].forEach(([tx,tz])=>one(tx,FILL+r+0.15,tz));                                        /* the hollows */
    one(0,FILL+r+0.29,0);}                                                                                                          /* the peak */
  else if(kind==="chile"){const GRN="#5FB24A",GRND="#2F6B27",RED="#C8342A",REDD="#7A1E18",CAP="#3E6E2E";
    /* CREW 12 (el ebanista, #226; owner: "how do we fix the bananas and chiles?"): nine fat chiles heaped ABOVE the
       rim, the front ones with their tips out over the edge and drooping — fourteen thin ones lay flat in the crate's
       shadow and read as green stuff; two turned red the way a chile crate does; every one a lit cone over a dark
       cone a hair lower, the value break the light will not give; a cap and a stem at the fat end. */
    const LAY=[[-0.18,0.06,0.10,0.15],[0.05,0.06,0.12,-0.25],[0.24,0.06,0.02,0.5],[-0.10,0.06,-0.14,1.9],[0.16,0.06,-0.12,2.5],
               [-0.06,0.16,0.16,-0.1],[0.12,0.16,0.0,0.35],[-0.16,0.15,-0.02,1.1],[0.02,0.25,0.06,0.05]];                 /* [x, y over the fill, z, turn]: laid by hand, not by a loop */
    LAY.forEach(([cx,cy,cz,a],i)=>{const red=(i+alt)%4===0,c=red?RED:GRN,cd=red?REDD:GRND,y=FILL+cy+(rnd()-0.5)*0.01,t=a+(rnd()-0.5)*0.2,ux=Math.sin(t),uz=Math.cos(t),tilt=cz>0.08?0.25:0;
      parts.push({s:"cone",x:cx,y,z:cz,r:0.05,h:0.26,c,rx:Math.PI/2+tilt,ry:t});                                           /* the body, fat, tip out */
      parts.push({s:"cone",x:cx,y:y-0.016,z:cz,r:0.048,h:0.25,c:cd,rx:Math.PI/2+tilt,ry:t});                                /* its underside, dark */
      const by=y+Math.sin(tilt)*0.13;
      parts.push({s:"cyl",x:cx-ux*0.13,y:by,z:cz-uz*0.13,r:0.03,h:0.035,c:CAP,rx:Math.PI/2,ry:t});                          /* the cap */
      parts.push({s:"cyl",x:cx-ux*0.16,y:by+0.005,z:cz-uz*0.16,r:0.01,h:0.05,c:CAP,rx:Math.PI/2,ry:t});});}                 /* the stem */
  else{const YEL="#EAC63E",YELD="#B8962A",RIDGE="#A87F22",TIPC="#4A3A16",STEMC="#8A6B3A";
    /* CREW 12 (el ebanista): two big hands of five, curving UP over the rim — three small hands of four lay in the
       crate as tiny cylinders of one yellow. A finger is a bent pair: the lower length rising from the crown, the
       upper steeper, a brown ridge along its back, a dark tip; each length a lit cylinder over a darker one a hair
       lower. The front hand's tips reach out over the rim; the back hand curves away, higher. Three loose fingers
       on the floor of the crate, siblings of the same hand, so it is full. */
    const hand=(hx,hy,hz,ha,n,seed)=>{const c=Math.cos(ha),s=Math.sin(ha),at=(lx,ly,lz)=>({x:hx+lx*c-lz*s,y:hy+ly,z:hz+lx*s+lz*c});
      let q=at(-0.03,0.03,0);parts.push({s:"cyl",x:q.x,y:q.y,z:q.z,r:0.045,h:0.07,c:STEMC,rz:Math.PI/2,ry:-ha});          /* the crown they hang from */
      for(let f=0;f<n;f++){const fz=(f-(n-1)/2)*0.074,fy=-Math.abs(f-(n-1)/2)*0.012,b1=0.3+((seed+f)%3)*0.05,b2=0.85+((seed*3+f)%3)*0.06,L1=0.13,L2=0.12;
        const e1x=L1*Math.cos(b1),e1y=L1*Math.sin(b1);
        [[L1/2*Math.cos(b1),L1/2*Math.sin(b1),L1,b1],[e1x+L2/2*Math.cos(b2),e1y+L2/2*Math.sin(b2),L2,b2]].forEach(([lx,ly,len,b])=>{q=at(lx,fy+ly,fz);
          parts.push({s:"cyl",x:q.x,y:q.y,z:q.z,r:0.036,h:len,c:YEL,rz:b-Math.PI/2,ry:-ha});                               /* a length of the finger, lit */
          parts.push({s:"cyl",x:q.x,y:q.y-0.015,z:q.z,r:0.033,h:len*0.95,c:YELD,rz:b-Math.PI/2,ry:-ha});                   /* its underside, darker */
          parts.push({s:"cyl",x:q.x,y:q.y+0.03,z:q.z,r:0.009,h:len*0.9,c:RIDGE,rz:b-Math.PI/2,ry:-ha});});                  /* the ridge along its back */
        q=at(e1x+L2*Math.cos(b2)+0.01,fy+e1y+L2*Math.sin(b2)+0.01,fz);parts.push({s:"sph",x:q.x,y:q.y,z:q.z,r:0.028,c:TIPC});}}; /* the dark tip */
    [[-0.22,0.02,-0.16,0.3],[0.10,0.02,-0.18,2.9],[0.20,0.02,0.10,1.4]].forEach(([lx,ly,lz,la])=>{                          /* the loose fingers on the floor */
      parts.push({s:"cyl",x:lx,y:FILL+ly+0.03,z:lz,r:0.036,h:0.16,c:YEL,rz:Math.PI/2,ry:la});
      parts.push({s:"cyl",x:lx,y:FILL+ly+0.016,z:lz,r:0.033,h:0.15,c:YELD,rz:Math.PI/2,ry:la});});
    hand(-0.02,FILL+0.06,0.10,Math.PI/2,5,alt);                                                                             /* the front hand, tips out over the rim */
    hand(0.06,FILL+0.13,-0.14,-2.2,5,alt+1);}                                                                               /* the back hand, curving away, higher */
  return parts;};

/* THE COUNTER. One carcase the length of the run: a plinth set back at the foot, the body, a worked
   top a hair proud of the face, plank joins on the WORLD grid so they run through the tiles as the
   picture's do, end panels only where the run ends — and the scale ONCE, at the head of the run, on the
   top and not in the texture. (As a box the head tile stood taller than the other three, because the
   baker measured the scale's dial into the box's height.) A cast base, a column, a pan, a dial face on a
   stalk behind the pan, a red needle reading something, one tomato on the pan. */
TILEART_MESH["I"]=({x,y})=>{
  const w=CW(),cnt=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="I";};
  const Wt=!cnt(x-1,y),E=!cnt(x+1,y),head=Wt,H=0.6;
  const BODY="#9C7A4E",TOP="#B8925F",TOPL="#C9A46E",KICK="#7A5B38",CAP="#7A5B38",JOIN="#5E4527";
  const parts=[{s:"box",x:0,y:0.03,z:0.02,w:1,h:0.06,d:0.58,c:KICK},                            /* the plinth, set back */
    {s:"box",x:0,y:0.06+(H-0.1)/2,z:0,w:1,h:H-0.1,d:0.66,c:BODY},                                /* the carcase, tile to tile */
    {s:"box",x:0,y:H-0.02,z:0,w:1,h:0.04,d:0.72,c:TOP},                                          /* the worked top, a hair proud */
    {s:"box",x:0,y:H+0.001,z:0,w:1,h:0.004,d:0.72,c:TOPL}];                                      /* its lit face */
  for(let gx=x*32;gx<x*32+32;gx++)if(gx%11===0){const lx=(gx-x*32)/32-0.5+1/64;parts.push({s:"box",x:lx,y:0.06+(H-0.1)/2,z:0.331,w:0.012,h:H-0.12,d:0.008,c:JOIN});}
  if(Wt)parts.push({s:"box",x:-0.49,y:H/2-0.01,z:0,w:0.03,h:H-0.02,d:0.7,c:CAP});
  if(E)parts.push({s:"box",x:0.49,y:H/2-0.01,z:0,w:0.03,h:H-0.02,d:0.7,c:CAP});
  if(head){const y0=H+0.003,STEEL="#6F777F",PAN="#D3D7DC",FACE="#F2F4F5";
    parts.push({s:"cyl",x:0,y:y0+0.01,z:0.02,r:0.1,h:0.02,c:STEEL},{s:"box",x:0,y:y0+0.09,z:0.02,w:0.05,h:0.14,d:0.05,c:STEEL});  /* the base and the column */
    parts.push({s:"cyl",x:0,y:y0+0.165,z:0.02,r:0.13,h:0.015,c:PAN},{s:"cyl",x:0,y:y0+0.176,z:0.02,rt:0.135,rb:0.12,h:0.008,c:"#E8EBEE"}); /* the pan and its lip */
    parts.push({s:"box",x:0,y:y0+0.23,z:-0.1,w:0.03,h:0.22,d:0.03,c:STEEL});                                                        /* the stalk behind the pan */
    parts.push({s:"cyl",x:0,y:y0+0.34,z:-0.1,r:0.1,h:0.025,c:STEEL,rx:Math.PI/2},{s:"cyl",x:0,y:y0+0.34,z:-0.086,r:0.085,h:0.004,c:FACE,rx:Math.PI/2}); /* the dial, facing the shop */
    parts.push({s:"box",x:0.014,y:y0+0.36,z:-0.082,w:0.007,h:0.06,d:0.004,c:"#D0402F",rz:-0.5});                                  /* the needle, reading something */
    meshTomato(parts,0.01,y0+0.25,0.03,0.075,x+y,"#D4382A");}
  return parts;};

/* WHAT STANDS ON THE BRIDGE. The deck, the rib and the rails are the engine's (test/smoke.js reads them); the
   pack answers "prop:bridge" with what a builder adds to a plank bridge once the deck is down: a stringer
   beam under each open side — the dark line that says the deck has a thickness and is not a rug — a
   nosing along the top edge where boots wear it pale, and in season the crest where the petal heap meets
   the rail line, the same recipe as the fence's foot. Deck-local: x along the crossing, y up from the
   deck's top, z ±0.5 the two sides; `edges` names the open sides (−1, +1), `h` the deck's thickness.
   (la calle's parts list; Pili's two, the beam and the nosing.) */
TILEART_MESH["prop:bridge"]=({x,y,h,edges,pet})=>{const parts=[],H=h||0.22;
  (edges||[]).forEach(sd=>{
    parts.push({s:"box",x:0,y:-H*0.65,z:sd*0.485,w:1,h:H*0.35,d:0.03,c:"#5A4330"});         /* the stringer, along the bottom of the side */
    parts.push({s:"box",x:0,y:0.005,z:sd*0.49,w:1,h:0.02,d:0.04,c:"#B08E5E"});              /* the nosing, worn pale along the top edge */
    if(pet)meshPetalCrest(parts,8+((((x+y)%3)+3)%3),x*31+y*17+sd*5,"x",-0.5,0.5,sd*0.4,0);});/* the heap's edge, inside the rail line */
  return parts;};

/* THE TROLLEY'S BODY. The engine keeps the wheels (it spins them) and the driver (he changes ends); the pack
   answers "prop:tram" with the body, built the way a tram is: an underframe skirt full length over the
   bogies, a dark panel to the waist and a light band round the windows (Rigo's paint rule — never two
   mid-tones), the glazing in the band, a roof that OVERHANGS the body with a drip lip under it, a raised
   clerestory, and the trolley pole leaning back against the travel — twelve pixels of line above the roof
   that say tram and not bus (Pili). Then the tram's own paperwork: a headlamp at each end, a bell under
   the roof at the platform, a fender leaning out low at each end, a grab rail on each open platform.
   +x is the direction of travel; the engine flips the body with TRO.dir. `len` is TRO_LEN, `h` the roof
   height (a door is 1.0), `fl` the floor, `cab` the open platform at each end. (la calle's parts list.) */
TILEART_MESH["prop:tram"]=({len,h,fl,cab})=>{const L=len||2,H=h||1.02,FL=fl||0.20,CAB=cab||0.15;
  const SKIRT="#6B2E1E",BAND="#E8D6B0",ROOF="#8E4230",GLASS="#D8E6F0",IRON="#3A3F46",LAMP="#FFE9A8",BELL="#C9A227";
  const BW=L-0.1-CAB*2,bandY0=FL+0.31,bandH=(H-0.06)-bandY0,parts=[
    {s:"box",x:0,y:(FL+0.10)/2,z:0,w:L-0.06,h:FL+0.10,d:0.74,c:SKIRT},                        /* the underframe skirt, full length */
    {s:"box",x:0,y:FL+0.17,z:0,w:BW,h:0.28,d:0.72,c:SKIRT},                                   /* the dark panel, to the waist */
    {s:"box",x:0,y:bandY0+bandH/2,z:0,w:BW,h:bandH,d:0.72,c:BAND},                             /* the light band the windows sit in */
    {s:"box",x:0,y:H-0.03,z:0,w:L+0.10,h:0.06,d:0.92,c:ROOF},                                 /* the roof, overhanging by 0.06 all round */
    {s:"box",x:0,y:H-0.07,z:0,w:L+0.10,h:0.02,d:0.94,c:SKIRT},                                /* the drip lip under the overhang */
    {s:"box",x:0,y:H+0.05,z:0,w:L-0.5,h:0.10,d:0.5,c:ROOF},                                   /* the clerestory */
    {s:"cyl",x:0.06,y:H+0.12,z:0,r:0.05,h:0.04,c:IRON},                                       /* the pole's swivel base */
    {s:"cyl",x:0.06,y:H+0.31,z:0,r:0.02,h:0.35,c:IRON,rz:0.35},                               /* the trolley pole, leaning back against the travel */
    {s:"sph",x:L/2-0.12,y:H-0.12,z:0.3,r:0.04,c:BELL}];                                       /* the bell, under the roof edge at the platform */
  [-0.55,0,0.55].forEach(dx=>[-1,1].forEach(sd=>parts.push({s:"box",x:dx*(BW/1.6),y:bandY0+bandH*0.45,z:sd*0.37,w:0.42*(BW/1.6),h:bandH*0.6,d:0.02,c:GLASS}))); /* six lights a side */
  [-1,1].forEach(ed=>{parts.push({s:"box",x:ed*(BW/2+0.005),y:bandY0+bandH*0.45,z:0,w:0.02,h:bandH*0.6,d:0.50,c:GLASS});   /* the windscreen at each end of the saloon */
    parts.push({s:"cyl",x:ed*(L/2-0.03),y:0.45,z:0,r:0.05,h:0.03,c:LAMP,rx:Math.PI/2});                                     /* a headlamp at each end, low, on the dash */
    parts.push({s:"box",x:ed*(L/2-0.01),y:0.14,z:0,w:0.06,h:0.16,d:0.6,c:IRON,rz:-ed*0.35});                                /* the fender, leaning out low */
    [-1,1].forEach(sd=>{parts.push({s:"box",x:ed*(L/2-0.05-CAB/2),y:0.75,z:sd*0.36,w:CAB,h:0.03,d:0.02,c:IRON});             /* the grab rail on the open platform */
      parts.push({s:"cyl",x:ed*(L/2-0.06),y:(FL+0.10+0.75)/2,z:sd*0.36,r:0.012,h:0.75-(FL+0.10),c:IRON});});});                /* its stanchion, floor to rail */
  return parts;};

/* ---- CREW ITERATION 12, el ebanista (#226), 2026-09-21. Owner: "a couple more to beautify and shape …
   cabinet in my office could be, this nolasco desk, the chair outside dona tenchas, im guessing what
   the oven is supposed to be in the espiga … there are limpeza things i dont know what they are and
   lets fix the mqt station now with beautify as well." Six shapes through the same seam, each built the
   way the thing is built (.claude/skills/how-its-made); the 2D drawing is the bill of materials. The
   "desk" in his frame of the notary was the pair of guest chairs `⊔` beside the rug — boxes wearing the
   chair's front elevation on their lids — and `D` was already a mesh. Every mesh below is judged by the
   frame at 35 px a tile: silhouette first, the values painted into the parts, the light only 1.5:1. ---- */

/* WHICH WAY A CHAIR FACES. A chair is pulled up to a table or a desk and faces it; otherwise its BACK goes
   to the wall — the first solid neighbour, north first, so a chair against a house wall faces the street
   and the notary's two face the rug — and it faces away; with nothing round it, south. Returns the turn
   in meshFacing's convention (south 0, east π/2, west −π/2, north π). */
const meshChairFacing=(x,y)=>{const w=CW(),at=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return r?r[gx]:undefined;},
    solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  const SIDES=[[0,-1,Math.PI],[0,1,0],[-1,0,-Math.PI/2],[1,0,Math.PI/2]];                     /* N, S, W, E: [dx,dy, the turn that faces that way] */
  for(const [dx,dy,ry] of SIDES){const g=at(x+dx,y+dy);if(g==="T"||g==="D")return ry;}
  for(const [dx,dy,ry] of SIDES)if(solid(x+dx,y+dy))return ry+Math.PI;
  return 0;};

/* LA SILLA — the chair outside Doña Tencha's door (the casa's yard pick), the notary's two guest chairs,
   the barbería's, the taller's: one chair, a silla de palma, the chair outside every door on a street like
   Calle Dos. Made: four turned legs, the back pair running up as the uprights; the seat frame joined to
   them; the palm seat woven INTO the frame — the one pale thing on it, with the weave's cross a step down;
   two back rails, the top one the yoke, wider than the uprights; stretchers low between the legs (a stool
   has none, a chair does). Seat 0.27 (0.45 m), yoke 0.56 (0.95 m): small beside a person, as a chair is.
   Values painted in: legs and stretchers darkest, the frame, the rails, the straw lightest. */
TILEART_MESH["⊔"]=({x,y})=>{
  const LEG="#54321B",FRAME="#6E5334",RAIL="#7E5F38",YOKE="#8A6B3F",STRAW="#DCC47C",STRAWD="#B89A55",SY=0.27;
  const parts=[];
  [[-0.17,0.17],[0.17,0.17]].forEach(([lx,lz])=>parts.push({s:"cyl",x:lx,y:SY/2,z:lz,rt:0.022,rb:0.027,h:SY,c:LEG}));        /* the front legs, turned: a hair wider at the foot */
  [[-0.17,-0.17],[0.17,-0.17]].forEach(([lx,lz])=>parts.push({s:"cyl",x:lx,y:0.29,z:lz,rt:0.022,rb:0.027,h:0.58,c:LEG}));      /* the back legs run up as the uprights */
  parts.push({s:"box",x:0,y:SY,z:0,w:0.40,h:0.036,d:0.40,c:FRAME});                                                             /* the seat frame */
  parts.push({s:"box",x:0,y:SY+0.026,z:0,w:0.33,h:0.016,d:0.33,c:STRAW});                                                       /* the palm seat, woven into the frame */
  parts.push({s:"box",x:0,y:SY+0.035,z:0,w:0.33,h:0.004,d:0.05,c:STRAWD},{s:"box",x:0,y:SY+0.035,z:0,w:0.05,h:0.004,d:0.33,c:STRAWD}); /* the weave's cross, a step down */
  parts.push({s:"box",x:0,y:0.41,z:-0.17,w:0.36,h:0.045,d:0.026,c:RAIL});                                                       /* the lower back rail */
  parts.push({s:"box",x:0,y:0.545,z:-0.17,w:0.42,h:0.06,d:0.032,c:YOKE});                                                       /* the yoke: wider than the uprights, the top of the silhouette */
  parts.push({s:"box",x:0,y:0.11,z:0.17,w:0.32,h:0.02,d:0.02,c:LEG});                                                           /* the front stretcher */
  [-0.17,0.17].forEach(sx=>parts.push({s:"box",x:sx,y:0.09,z:0,w:0.02,h:0.02,d:0.32,c:LEG}));                                   /* the side stretchers */
  return meshTurned(parts,meshChairFacing(x,y));};

/* EL ARCHIVERO — the notary's steel filing cabinets, what TILEDRAW["▯"] draws: a grey body, drawer fronts,
   folders peeking from an open drawer, pulls. Four-drawer units from one factory, siblings: two side by
   side make a bank, each shifted toward its `▯` neighbour so the pair stands touching. Made: a dark plinth,
   the carcase, four drawer fronts a step lighter on the open face with a dark reveal between them, a pull
   and a label holder on each. What the clerk did: ONE drawer left pulled out — which one by the tile — its
   box proud of the face with hanging folders in it, tabs staggered. Faces the first open side. 0.86 tall:
   chest height on a person, over the desk's 0.47. The open drawer is what breaks the box. */
TILEART_MESH["▯"]=({x,y})=>{
  const w=CW(),cab=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="▯";};
  const BODY="#6E7883",FRONT="#98A3AE",REVEAL="#2E3339",PULL="#2E3339",LABEL="#EAD9B4",PLINTH="#23272C",TRAY="#5A626C",FOLD=["#E8D6B0","#D9C29A","#EBDDBE"];
  const H=0.86,W=0.54,D=0.62,open=(((x*5+y*3)%4)+4)%4;
  let parts=[{s:"box",x:0,y:0.02,z:0,w:W-0.06,h:0.04,d:D-0.06,c:PLINTH},                               /* the plinth, set back, dark */
    {s:"box",x:0,y:0.04+(H-0.04)/2,z:0,w:W,h:H-0.04,d:D,c:BODY}];                                        /* the carcase */
  [0,1,2,3].forEach(i=>{const dy=0.13+i*0.19,out=i===open?0.20:0;                                       /* four drawers, the open one out by 0.20 */
    if(out){parts.push({s:"box",x:0,y:dy,z:D/2+out/2-0.01,w:W-0.08,h:0.15,d:out,c:TRAY});                /* the drawer's box, riding out on its rails */
      FOLD.forEach((c,f)=>{const fz=D/2+0.03+f*0.055;parts.push({s:"box",x:0,y:dy+0.01,z:fz,w:W-0.14,h:0.13,d:0.012,c});   /* hanging folders */
        parts.push({s:"box",x:-0.12+f*0.12,y:dy+0.085,z:fz,w:0.09,h:0.025,d:0.012,c});});}                 /* their tabs, staggered */
    parts.push({s:"box",x:0,y:dy,z:D/2+out+0.012,w:W-0.06,h:0.17,d:0.024,c:FRONT});                       /* the drawer front, a step lighter */
    parts.push({s:"box",x:0,y:dy+0.098,z:D/2+0.008,w:W,h:0.014,d:0.012,c:REVEAL});                        /* the reveal over it, dark */
    parts.push({s:"box",x:0,y:dy-0.03,z:D/2+out+0.03,w:0.13,h:0.024,d:0.02,c:PULL});                      /* the pull */
    parts.push({s:"box",x:0,y:dy+0.035,z:D/2+out+0.026,w:0.09,h:0.032,d:0.006,c:LABEL});});                /* the label holder */
  parts=meshTurned(parts,meshFacing(x,y));
  const sh=0.22,dx=cab(x+1,y)?sh:cab(x-1,y)?-sh:0,dz=cab(x,y+1)?sh:cab(x,y-1)?-sh:0;                       /* a bank: shift toward the neighbour so the two touch */
  return parts.map(p=>({...p,x:p.x+dx,z:p.z+dz}));};

/* EL HORNO DE PISO — La Espiga's oven, what TILEDRAW["▣"] draws: a dark steel box with TWO decks, each an
   orange slit and a steel bar. The owner could not tell what it was; a deck oven is what bolillo comes out
   of. Two modular units side by side, a bank, each with its own flue. Made: a plinth, the carcase, two
   doors on the front hinged at the bottom — a frame, a glass slit glowing from inside, a bar handle on two
   brackets — a control strip at the right with three knobs and a red pilot, the hood on top and the flue
   rising out of the back, capped: the flue is the silhouette above the box. One unit (by parity) has its
   lower door swung DOWN open, the mouth dark and the deck glowing at the back of it — the baker has just
   pulled a tray (the goods are another builder's). Faces the first open side. */
TILEART_MESH["▣"]=({x,y})=>{
  const STEEL="#585E67",DARK="#2A2E35",MOUTH="#17181C",GLOW="#E8A24A",EMBER="#C8601E",BAR="#B4BCC4",PLINTH="#1E2126",PILOT="#D0402F";
  const W=0.96,H=1.12,D=0.80,F=D/2,ajar=(((x+y)%2)+2)%2===1;
  const parts=[{s:"box",x:0,y:0.04,z:-0.02,w:W-0.08,h:0.08,d:D-0.08,c:PLINTH},                          /* the plinth */
    {s:"box",x:0,y:0.08+H/2,z:0,w:W,h:H,d:D,c:STEEL},                                                     /* the carcase */
    {s:"box",x:0,y:0.08+H+0.05,z:-0.12,w:W,h:0.10,d:D-0.24,c:DARK},                                       /* the hood, set back */
    {s:"cyl",x:0.24,y:0.08+H+0.10+0.27,z:-0.20,r:0.065,h:0.54,c:DARK},                                    /* the flue */
    {s:"cyl",x:0.24,y:0.08+H+0.10+0.55,z:-0.20,r:0.10,h:0.03,c:DARK},                                     /* its cap */
    {s:"box",x:0.40,y:0.08+H/2,z:F+0.008,w:0.11,h:H-0.16,d:0.016,c:DARK}];                                /* the control strip, right */
  [0.30,0.55,0.80].forEach(ky=>parts.push({s:"cyl",x:0.40,y:ky,z:F+0.024,r:0.02,h:0.016,c:BAR,rx:Math.PI/2}));   /* three knobs */
  parts.push({s:"box",x:0.40,y:1.02,z:F+0.02,w:0.03,h:0.03,d:0.01,c:PILOT});                                    /* the pilot light: on */
  [0.40,0.84].forEach((dy,i)=>{const open=ajar&&i===0;
    if(open){parts.push({s:"box",x:-0.06,y:dy,z:F-0.02,w:0.74,h:0.30,d:0.06,c:MOUTH});                            /* the mouth: the darkest thing in the bakery */
      parts.push({s:"box",x:-0.06,y:dy-0.10,z:F-0.05,w:0.62,h:0.03,d:0.03,c:EMBER});                              /* the deck glowing at the back of it */
      parts.push({s:"box",x:-0.06,y:dy-0.16,z:F+0.16,w:0.74,h:0.025,d:0.32,c:DARK});                             /* the door, swung down flat on its hinge */
      parts.push({s:"cyl",x:-0.06,y:dy-0.16,z:F+0.31,r:0.014,h:0.60,c:BAR,rz:Math.PI/2});}                        /* its bar, now at the front edge */
    else{parts.push({s:"box",x:-0.06,y:dy,z:F+0.012,w:0.74,h:0.30,d:0.024,c:DARK});                               /* the door, closed, proud of the face */
      parts.push({s:"box",x:-0.06,y:dy+0.02,z:F+0.026,w:0.54,h:0.07,d:0.006,c:GLOW});                             /* the glass slit, lit from inside */
      [-0.28,0.16].forEach(bx=>parts.push({s:"box",x:bx,y:dy-0.08,z:F+0.04,w:0.03,h:0.03,d:0.04,c:BAR}));          /* two brackets */
      parts.push({s:"cyl",x:-0.06,y:dy-0.08,z:F+0.06,r:0.014,h:0.60,c:BAR,rz:Math.PI/2});}});                     /* the bar handle across them */
  return meshTurned(parts,meshFacing(x,y));};

/* EL PIZARRÓN DE TURNOS — Limpieza Velázquez's `U`. The engine's `U` is its blueprint wall (a plan pinned
   with four gold pins, engine.js TILEDRAW["U"]) — right in La Obra's studio and unreadable on a cleaning
   company's wall; it is the "limpieza thing" the owner could not name. In `li` the wall stays a wall — the
   mesh carries the wall body in C.wall and its top band in C.wallTop, the two colours the `#` beside it
   bakes — and wears on its open face the crew's schedule board: a dark frame, the white board, a teal
   header band, rows ruled across and the day-columns ruled THROUGH the run (two `U` side by side are one
   board; the frame's end stands only where the run ends), magnets in the cells by the tile, a marker
   tray at the foot with two markers in it. Anywhere else the function answers [] and the blueprint wall
   stands as it did (engine3d.js t3MeshTile: an empty list is "draw it the old way"). */
TILEART_MESH["U"]=({x,y})=>{
  if(typeof world==="undefined"||world!=="li")return [];
  const w=CW(),isU=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="U";};
  const WH=0.55+13*0.042,BAND=0.20,ry=meshFacing(x,y);
  const parts=[{s:"box",x:0,y:WH/2,z:0,w:1,h:WH,d:1,c:C.wall},{s:"box",x:0,y:WH-BAND/2,z:0,w:1.004,h:BAND,d:1.004,c:C.wallTop}]; /* the wall itself, and its top band */
  const ax=Math.round(-Math.cos(ry)),az=Math.round(Math.sin(ry)),endA=!isU(x+ax,y+az),endB=!isU(x-ax,y-az);       /* does the run end at the board's local −x / +x */
  const FR="#3A3F46",WHITE="#F2F4F5",LINE="#8A929B",HEAD="#3FA3A0",MAG=["#E0B45C","#D0402F","#3FA3A0","#2E5FA8"];
  const F=0.5,BY=0.66,BH=0.46,x0=endA?-0.43:-0.5,x1=endB?0.43:0.5,wx0=x0+(endA?0.03:0),wx1=x1-(endB?0.03:0),ww=wx1-wx0,wx=(wx0+wx1)/2,top=BY+BH/2;
  parts.push({s:"box",x:(x0+x1)/2,y:BY,z:F+0.015,w:x1-x0,h:BH+0.06,d:0.03,c:FR});                                  /* the frame's backing */
  parts.push({s:"box",x:wx,y:BY,z:F+0.034,w:ww,h:BH,d:0.01,c:WHITE});                                             /* the board */
  parts.push({s:"box",x:wx,y:top-0.035,z:F+0.042,w:ww,h:0.06,d:0.006,c:HEAD});                                    /* the header band, the company's teal */
  [0.17,0.27,0.37].forEach(r=>parts.push({s:"box",x:wx,y:top-r,z:F+0.042,w:ww,h:0.007,d:0.006,c:LINE}));           /* three rows ruled across */
  const cy0=BY-BH/2,cy1=top-0.065;
  for(let lx=-0.4;lx<=0.41;lx+=0.2)if(lx>wx0+0.01&&lx<wx1-0.01)parts.push({s:"box",x:lx,y:(cy0+cy1)/2,z:F+0.042,w:0.007,h:cy1-cy0,d:0.006,c:LINE}); /* day-columns, on the world grid so they run through the join */
  const sd=(((x*5+y*3)%7)+7)%7;
  for(let i=0;i<5;i++){const col=(i*2+sd)%5,row=(i*3+sd+i)%4,mx=-0.4+col*0.2+0.1+((sd+i)%3-1)*0.03,my=top-0.115-0.1*row;            /* magnets in the cells: who is on what */
    if(mx>wx0+0.04&&mx<wx1-0.04)parts.push({s:"box",x:mx,y:my,z:F+0.046,w:0.05,h:0.04,d:0.008,c:MAG[(i+sd)%4]});}
  parts.push({s:"box",x:wx,y:cy0-0.02,z:F+0.05,w:Math.min(ww,0.5),h:0.02,d:0.05,c:FR});                            /* the marker tray */
  parts.push({s:"cyl",x:wx-0.08,y:cy0-0.003,z:F+0.05,r:0.009,h:0.12,c:"#D0402F",rz:Math.PI/2});                     /* two markers lying in it */
  parts.push({s:"cyl",x:wx+0.06,y:cy0-0.003,z:F+0.058,r:0.009,h:0.12,c:"#2E5FA8",rz:Math.PI/2});
  return meshTurned(parts,ry);};

/* EL ANAQUEL DE LIMPIEZA — Limpieza Velázquez's `S`. The engine's S is a bookcase and el taller's mesh fills
   it with books and cartons, right everywhere but here: a cleaning company's shelves hold what the crew
   takes out in the morning. The carcase as the bookcase has it (back, uprights, four boards, the same turn
   to the room); on it: spray bottles in a row on the top board — a body, a neck, a trigger head nosing to
   the room — folded cloths stacked (the ones underneath squashed) and two jugs on the middle, a bucket with
   its handle up and a big jug at the foot; and a broom and a mop LEANING on the uprights, which is the read
   from seven tiles back. Wrapped round the bookcase, not edited into it: another builder has the bakery's
   racks in that function this run. */
const meshShelfLimpieza=({x,y})=>{
  const w=CW(),solid=(gx,gy)=>{const r=w&&w.grid&&w.grid[gy];return !r||r[gx]===undefined||SOLID.has(r[gx]);};
  const ry=!solid(x,y+1)?0:!solid(x+1,y)?Math.PI/2:!solid(x-1,y)?-Math.PI/2:Math.PI;
  const sd=(((x*5+y*3)%7)+7)%7,WOOD="#8A6F4D",DARK="#5A4530",BACK="#3F2E1E";
  const parts=[{s:"box",x:0,y:0.5,z:-0.2,w:0.9,h:1.0,d:0.04,c:BACK},
    {s:"box",x:-0.43,y:0.5,z:0,w:0.05,h:1.0,d:0.42,c:WOOD},{s:"box",x:0.43,y:0.5,z:0,w:0.05,h:1.0,d:0.42,c:WOOD}];
  [0.03,0.34,0.66,0.98].forEach(by=>parts.push({s:"box",x:0,y:by,z:0,w:0.9,h:0.035,d:0.42,c:by>0.9?WOOD:DARK}));
  const B1=0.05,B2=0.36,B3=0.68;                                                                        /* the top of each board */
  const BOT=["#3FA3A0","#E0B45C","#F2F4F5","#2E5FA8","#52B8B4"],HEAD="#2A2E35",CLOTH=["#F2EFE6","#9FC4D8","#F2EFE6","#E8DCC4"],JUG="#E8ECEF",CAP="#3FA3A0",BUCKET="#E0B45C",BUCKETD="#B8902E";
  for(let i=0;i<5;i++){const bx=-0.32+i*0.14+((i*2+sd)%3-1)*0.01,c=BOT[(i+sd)%5];                        /* the top board: five spray bottles, pushed together the way they come off the van */
    parts.push({s:"cyl",x:bx,y:B3+0.075,z:0.02,rt:0.036,rb:0.04,h:0.15,c});                               /* the body, a hair wider at the foot */
    parts.push({s:"cyl",x:bx,y:B3+0.17,z:0.02,rt:0.014,rb:0.02,h:0.04,c});                                 /* the neck */
    parts.push({s:"box",x:bx,y:B3+0.21,z:0.03,w:0.035,h:0.035,d:0.06,c:HEAD});}                            /* the trigger head, nose to the room */
  for(let i=0;i<4;i++)parts.push({s:"box",x:-0.25+((i+sd)%3-1)*0.012,y:B2+0.02+i*0.032,z:0.02,w:0.22,h:i<3?0.026:0.03,d:0.2,c:CLOTH[(i+sd)%4]}); /* the middle: cloths folded and stacked */
  [0.08,0.27].forEach((jx,j)=>{parts.push({s:"box",x:jx,y:B2+0.10,z:0.02,w:0.14,h:0.2,d:0.13,c:JUG});parts.push({s:"cyl",x:jx-0.02,y:B2+0.215,z:0.02,r:0.025,h:0.03,c:CAP});
    parts.push({s:"box",x:jx,y:B2+0.10,z:0.087,w:0.09,h:0.07,d:0.004,c:BOT[(j+sd)%5]});});                  /* two jugs, a label each */
  parts.push({s:"cyl",x:-0.22,y:B1+0.12,z:0.02,rt:0.13,rb:0.11,h:0.24,c:BUCKET},{s:"torus",x:-0.22,y:B1+0.24,z:0.02,r:0.125,t:0.012,c:BUCKETD,rx:Math.PI/2}); /* the foot: a bucket, its rim */
  parts.push({s:"torus",x:-0.22,y:B1+0.24,z:0.02,r:0.11,t:0.008,c:"#6B6F76",arc:Math.PI});                  /* its handle, up */
  parts.push({s:"box",x:0.14,y:B1+0.13,z:0.0,w:0.2,h:0.26,d:0.18,c:JUG},{s:"cyl",x:0.14,y:B1+0.275,z:0,r:0.03,h:0.03,c:BOT[(sd+2)%5]}); /* and the big jug */
  parts.push({s:"cyl",x:0.51,y:0.50,z:0.15,r:0.012,h:0.96,c:"#C9A46E",rz:0.105});                           /* the broom, leaning on the upright */
  parts.push({s:"box",x:0.565,y:0.07,z:0.15,w:0.07,h:0.14,d:0.045,c:"#B8763A",rz:0.105});                  /* its bristles */
  parts.push({s:"box",x:0.567,y:0.012,z:0.15,w:0.075,h:0.025,d:0.05,c:"#8E5A2C",rz:0.105});                /* worn dark where they meet the floor */
  parts.push({s:"cyl",x:-0.51,y:0.50,z:0.18,r:0.012,h:0.96,c:"#8E969E",rz:-0.105});                         /* the mop, the other side */
  parts.push({s:"sph",x:-0.565,y:0.06,z:0.18,r:0.055,sy:0.7,c:"#C9CDD2"});                                 /* its head, the strings bunched */
  [[-0.03,0.03],[0.03,0.02],[0,-0.04]].forEach(([ox,oz])=>parts.push({s:"cyl",x:-0.565+ox,y:0.025,z:0.18+oz,r:0.008,h:0.05,c:"#AEB6BE",rz:ox*4})); /* three strings loose */
  return meshTurned(parts,ry);};
{const base=TILEART_MESH["S"];TILEART_MESH["S"]=a=>(typeof world!=="undefined"&&world==="li")?meshShelfLimpieza(a):base(a);}

/* LA PARADA — the MQT stop, standing. The 2D is a pole, a red sign that spells MQT and a bench, and in the
   3D camera it stood as a picture (FLAT_BY_GAME, test/engine.smoke.js). A stop is a shelter: two steel
   posts at the back on base plates, two braces, a roof cantilevered over a bench with a back, and the route's
   name-board in red round BOTH long edges of the roof — the `ex` stop faces its road to the north, so the
   default camera sees its back, and a board on one edge only would be blank from the street. M, Q and T
   are boxes and a torus in cream, thick strokes, on both boards, each reading from its own side: the mesh
   builder has no text, so letters that ride a face are made of parts. Faces the tram line (`≈` or `-`
   beside it), else south. */
TILEART_MESH["Y"]=({x,y})=>{
  const w=CW(),at=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return r?r[gx]:undefined;},rail=g=>g==="≈"||g==="-";
  const ry=rail(at(x,y-1))?Math.PI:rail(at(x,y+1))?0:rail(at(x+1,y))?Math.PI/2:rail(at(x-1,y))?-Math.PI/2:0;
  const POST="#3B3F45",ROOF="#2A2D33",ROOFT="#4A4F57",RED="#C0392B",REDD="#8E2A20",CREAM="#F2E8D8",SEAT="#8A6B3F",SEATL="#A5865A",SEATD="#4A3520",LEG="#6E5334";
  const RH=1.85,parts=[];
  [-0.42,0.42].forEach(px=>{parts.push({s:"cyl",x:px,y:RH/2,z:-0.30,r:0.032,h:RH,c:POST});                      /* the posts, at the back */
    parts.push({s:"box",x:px,y:0.015,z:-0.30,w:0.12,h:0.03,d:0.12,c:ROOF});                                      /* bolted to a base plate */
    parts.push({s:"box",x:px,y:RH-0.30,z:-0.02,w:0.03,h:0.03,d:0.62,c:POST,rx:-0.55});});                      /* the brace, post to the roof's front edge */
  parts.push({s:"box",x:0,y:RH,z:0.02,w:1.0,h:0.05,d:0.80,c:ROOF},{s:"box",x:0,y:RH+0.03,z:0.02,w:1.0,h:0.012,d:0.80,c:ROOFT}); /* the roof, its top a step lighter */
  const letters=(z,dir)=>{const T=0.042,LY=RH-0.145,LH=0.17,put=(lx,ly,bw,bh,rz)=>parts.push({s:"box",x:dir*lx,y:ly,z,w:bw,h:bh,d:0.012,c:CREAM,rz:rz?dir*rz:0});
    put(-0.36,LY,T,LH);put(-0.22,LY,T,LH);put(-0.325,LY+0.035,T,0.12,0.72);put(-0.255,LY+0.035,T,0.12,-0.72);      /* M: two stems and a V */
    parts.push({s:"torus",x:0,y:LY,z,r:0.062,t:0.021,c:CREAM});put(0.05,LY-0.065,0.06,T,0.7);                        /* Q: a ring and its tail */
    put(0.29,LY+LH/2-T/2,0.17,T);put(0.29,LY,T,LH);};                                                               /* T: a bar and a stem */
  [[0.40,1],[-0.36,-1]].forEach(([bz,dir])=>{parts.push({s:"box",x:0,y:RH-0.145,z:bz,w:1.0,h:0.23,d:0.03,c:RED});    /* the name-board, front and back */
    parts.push({s:"box",x:0,y:RH-0.26,z:bz,w:1.0,h:0.012,d:0.032,c:REDD});                                           /* its dark lower edge */
    letters(bz+dir*0.022,dir);});
  parts.push({s:"box",x:0,y:0.42,z:-0.02,w:0.72,h:0.04,d:0.30,c:SEAT},{s:"box",x:0,y:0.445,z:0.13,w:0.72,h:0.01,d:0.02,c:SEATL}, /* the seat, its front edge catching the light */
    {s:"box",x:0,y:0.395,z:-0.02,w:0.70,h:0.012,d:0.28,c:SEATD});                                                     /* the shade under it */
  [-0.32,0.32].forEach(lx=>{parts.push({s:"box",x:lx,y:0.20,z:-0.02,w:0.04,h:0.40,d:0.26,c:LEG});                   /* the leg frames */
    parts.push({s:"box",x:lx,y:0.56,z:-0.15,w:0.03,h:0.26,d:0.03,c:LEG});});                                          /* the back uprights */
  parts.push({s:"box",x:0,y:0.66,z:-0.15,w:0.72,h:0.06,d:0.03,c:SEAT});                                               /* the back rail */
  return meshTurned(parts,ry);};

/* ---- CREW ITERATION 12, la mueblería ---- 2026-09-21. The owner, asked whether he wanted a filing
   cabinet added to his own office: "no i was just trying to make sure all furniture and this type of
   item". So the ask is COVERAGE, and these five are what was left when the other lanes had done the
   ones he named by sight: the drafting table `A`, the stove `V`, the barricade `G`, the dog bed `○`
   and the moving carton `□`. Each is built the way the thing is built (.claude/skills/how-its-made),
   from what its own 2D drawing says it is made of, and judged in a frame at 35 px a tile: silhouette
   first, the value differences PAINTED into the parts because the light only gives 1.00 top / 0.88
   east / 0.78 south / 0.66 west-north (Pili, from engine3d.js). Every seed reads BOTH axes — the
   marigold bed's (x*7+y*13)%7 was constant along a row, and x*5%5 is constant everywhere, so it is
   (x*5+y*3)%7 here; La Obra's three tables come out 3, 0, 4 and the site's seven barricades come out
   all seven different. ---- */

/* LA MESA DE DIBUJO — La Obra's three drafting tables and the one on the empty lot. What
   TILEDRAW["A"] (engine.js, grep TILEDRAW\["A"\]) says it is: a pedestal, a board drawn as a
   parallelogram — a board that TILTS — a blueprint sheet on it and three drawn lines. It had no side
   view, so it stood as one upright quad wearing its plan: a blue postcard on a brown stick, and the
   only glyph of the owner's own flat-audit list that is furniture. Made as a drafting table is made:
   two feet that run front-to-back (what stops a board tipping when you lean on it), a column on each,
   a stretcher between them, the pivot brackets, and the BOARD across them at 23° — the rake is the
   whole silhouette, and it is the one thing that tells this from a desk at 35 px. Then what the
   draughtsman did: the pencil rail along the low edge (a board without one drops its pencils), the
   sheet taped down, its lines, the parallel rule laid across with its head overhanging the left edge,
   and a pencil in the rail. THE FRAMES ARE SIBLINGS — three tables from one shop are identical, and
   variation enters where it entered: at the hand. What the seed changes is the draughtsman's, not the
   joiner's — whether a sheet is pinned at all, where the rule was pushed to, whether the pencil was
   put back. Faces the first open side, like the desk. */
TILEART_MESH["A"]=({x,y})=>{
  const h=(((x*5+y*3)%7)+7)%7;
  const T=0.40,ct=Math.cos(T),st=Math.sin(T),CY=0.575;                   /* the rake, and the board's centre: front edge 0.458, back edge 0.692 */
  const at=(v,n)=>({y:CY-v*st+n*ct,z:v*ct+n*st});                        /* board-local: v runs down the board toward the low edge, n out of its face */
  const LEG="#7A6040",FOOT="#5E4830",BOARD="#B08B5A",UNDER="#6B5230",RAIL="#C4A06A",
        SHEET="#2E5FA8",LINE="#DDE8F5",RULE="#E6E0D2",PENCIL="#E0B45C",LEAD="#3A3546";
  const parts=[];
  [-0.27,0.27].forEach(lx=>{
    parts.push({s:"box",x:lx,y:0.022,z:0.02,w:0.075,h:0.044,d:0.46,c:FOOT});         /* the foot, running front to back */
    parts.push({s:"cyl",x:lx,y:0.27,z:0.06,rt:0.026,rb:0.034,h:0.46,c:LEG});         /* the column, turned: wider at the floor */
    parts.push({s:"box",x:lx,y:0.525,z:0.05,w:0.055,h:0.07,d:0.06,c:LEG});});        /* the pivot bracket the board rests on */
  parts.push({s:"cyl",x:0,y:0.17,z:0.06,r:0.018,h:0.52,c:LEG,rz:Math.PI/2});         /* the stretcher */
  let q=at(0,0);      parts.push({s:"box",x:0,y:q.y,z:q.z,w:0.86,h:0.032,d:0.60,c:BOARD,rx:T});      /* THE BOARD */
  q=at(0,-0.022);     parts.push({s:"box",x:0,y:q.y,z:q.z,w:0.82,h:0.016,d:0.56,c:UNDER,rx:T});      /* its underside, painted dark — the shade under any top */
  q=at(0.295,0.034);  parts.push({s:"box",x:0,y:q.y,z:q.z,w:0.86,h:0.030,d:0.036,c:RAIL,rx:T});      /* the pencil rail along the low edge, lit */
  if(h%3!==2){                                                                        /* h%3===2: the board was cleared — no sheet today */
    q=at(0.02,0.024); parts.push({s:"box",x:0,y:q.y,z:q.z,w:0.62,h:0.006,d:0.44,c:SHEET,rx:T});      /* the sheet, taped down */
    [[-0.12,0.44],[-0.04,0.44],[0.04,0.30]].forEach(([v,lw])=>{q=at(v,0.031);
      parts.push({s:"box",x:0,y:q.y,z:q.z,w:lw,h:0.004,d:0.014,c:LINE,rx:T});});                     /* what is drawn on it: three lines, as the picture has them, up where the drawing is */
  }
  const rv=0.12+(h%3)*0.07;                                                           /* where the rule was pushed to — down the board, below the drawing, which is where it is parked */
  q=at(rv,0.042);     parts.push({s:"box",x:0,y:q.y,z:q.z,w:0.92,h:0.012,d:0.038,c:RULE,rx:T});      /* the parallel rule, its blade wider than the board */
  q=at(rv,0.042);     parts.push({s:"box",x:-0.445,y:q.y,z:q.z,w:0.045,h:0.012,d:0.10,c:RULE,rx:T}); /* its head, overhanging the left edge — the one thing that is not a rectangle in plan */
  if(h%4!==1){        q=at(0.295,0.058);
    parts.push({s:"cyl",x:-0.12+(h%5)*0.07,y:q.y,z:q.z,r:0.014,h:0.20,c:PENCIL,rz:Math.PI/2,rx:T});  /* the pencil, put back in the rail */
    parts.push({s:"cyl",x:-0.22+(h%5)*0.07,y:q.y,z:q.z,r:0.012,h:0.03,c:LEAD,rz:Math.PI/2,rx:T});}   /* its lead */
  return meshTurned(parts,meshFacing(x,y));};

/* LA ESTUFA — Chuy's range in La Cocina, beside the walk-in `W` (already a shape). Two drawings, and
   they are the bill of materials between them: TILEDRAW["V"] in plan is a dark body with burners and
   an orange strip at the back; TILESIDE["V"] in elevation is "burners over the edge, knobs, the oven
   window" — a cooktop lip that overhangs the body, four knobs on a fascia, an oven cavity with a steel
   bar over it. IT STOOD AS A BOX and the box wore the PLAN on its lid, so the burners lay on top the
   size of dinner plates and the elevation's knobs were painted round all four sides. HOW MANY BURNERS:
   the plan draws four, the elevation draws three across, and the tile's own describe line — the
   paperwork the drawing sits on, which .claude/skills/how-its-made says to read first — says "Six
   burners of consommé diplomacy" (content/meridian/strings.js, grep "Six burners"). Three across by
   two deep is six, which is the only count that agrees with the elevation AND the words, and it is
   what a restaurant range is; the plan's 2×2 is what fits in 32 px. Made as one is welded: four feet
   with the floor showing between them, the body, the oven door proud with its window and its
   full-width bar handle on two brackets, the control fascia under the lip with four knobs, the cast
   deck OVERHANGING the body on every side (that lip is what says range and not cupboard), six open
   burners with their cast grates, and the riser at the back carrying the pilot — the riser and the
   stock pot are the silhouette above the box. Faces its first open side. */
TILEART_MESH["V"]=({x,y})=>{
  const STEEL="#4A5058",DOOR="#5E6874",DECK="#3A3F46",NOSE="#6E7A86",DARK="#23272C",GLASS="#1B1E22",
        EMBER="#C8601E",KNOB="#AEB6BE",BAR="#B9BEC4",ORANGE="#E0662B",POT="#B9BEC4",POTL="#CCD2D8",FOOT="#2A2D33";
  const parts=[];
  [[-0.25,-0.21],[0.25,-0.21],[-0.25,0.21],[0.25,0.21]].forEach(([fx,fz])=>
    parts.push({s:"cyl",x:fx,y:0.045,z:fz,r:0.024,h:0.09,c:FOOT}));                              /* four feet, the floor showing under it */
  parts.push({s:"box",x:0,y:0.30,z:0,w:0.62,h:0.42,d:0.54,c:STEEL},                              /* the body, 0.09 to 0.51 */
    {s:"box",x:0,y:0.27,z:0.275,w:0.56,h:0.28,d:0.016,c:DOOR},                                   /* the oven door, proud and a step lighter */
    {s:"box",x:0,y:0.29,z:0.286,w:0.38,h:0.15,d:0.006,c:GLASS},                                  /* its window, the darkest thing on it */
    {s:"box",x:0,y:0.235,z:0.290,w:0.30,h:0.016,d:0.004,c:EMBER},                                /* and what is on in there */
    {s:"box",x:0,y:0.485,z:0.278,w:0.62,h:0.060,d:0.014,c:DARK});                                /* the control fascia, under the lip */
  [-0.22,0.22].forEach(bx=>parts.push({s:"box",x:bx,y:0.435,z:0.292,w:0.028,h:0.032,d:0.036,c:BAR})); /* two brackets */
  parts.push({s:"cyl",x:0,y:0.435,z:0.318,r:0.016,h:0.56,c:BAR,rz:Math.PI/2});                   /* the bar handle across them */
  [-0.21,-0.07,0.07,0.21].forEach(kx=>parts.push({s:"cyl",x:kx,y:0.485,z:0.298,r:0.022,h:0.020,c:KNOB,rx:Math.PI/2})); /* four knobs, as the elevation has them */
  parts.push({s:"box",x:0,y:0.528,z:0,w:0.68,h:0.036,d:0.60,c:DECK},                             /* the cast deck, overhanging the body all round */
    {s:"box",x:0,y:0.545,z:0.298,w:0.68,h:0.008,d:0.012,c:NOSE});                                /* its front edge, catching the light */
  [-0.21,0,0.21].forEach(bx=>[-0.135,0.135].forEach(bz=>{
    parts.push({s:"cyl",x:bx,y:0.550,z:bz,r:0.085,h:0.012,c:DARK});                              /* the burner well, open */
    parts.push({s:"sph",x:bx,y:0.556,z:bz,r:0.030,sy:0.5,c:STEEL});                              /* its cap */
    parts.push({s:"torus",x:bx,y:0.568,z:bz,r:0.082,t:0.018,rx:Math.PI/2,sz:0.6,c:"#2F343B"});}));/* the cast grate over it */
  parts.push({s:"box",x:0,y:0.612,z:-0.275,w:0.68,h:0.130,d:0.045,c:STEEL},                      /* the riser at the back */
    {s:"box",x:0,y:0.680,z:-0.275,w:0.68,h:0.010,d:0.045,c:NOSE},                                /* its lit top */
    {s:"box",x:0,y:0.612,z:-0.250,w:0.13,h:0.030,d:0.008,c:ORANGE});                             /* the pilot, the one warm note the plan draws */
  parts.push({s:"cyl",x:-0.21,y:0.662,z:-0.135,r:0.105,h:0.19,c:POT},                            /* the stock pot, on the back-left burner */
    {s:"cyl",x:-0.21,y:0.764,z:-0.135,r:0.112,h:0.016,c:POTL},                                   /* its lid */
    {s:"sph",x:-0.21,y:0.780,z:-0.135,r:0.024,c:FOOT});                                          /* and the lid's knob */
  [-0.118,0.118].forEach(hx=>parts.push({s:"torus",x:-0.21+hx,y:0.700,z:-0.135,r:0.030,t:0.011,c:POTL,ry:Math.PI/2})); /* two handles */
  return meshTurned(parts,meshFacing(x,y));};

/* LA VALLA — the construction barricade, seven on the empty lot and six on Calle Principal at the
   street's opening stage. What TILEDRAW["G"] (engine.js, grep "a construction barricade") says it is:
   an orange BOARD with three white stripes, on two legs, with a lower rail — and its own comment says
   the version before it "stood up in 3D as a ladder (owner)". It is kind `fence`, and the engine turns
   a fence panel along its run BY KIND (engine3d.js, the kd==="fence" branch, grep `const fk=`): the
   barricade at ex (11,7) has a picket fence tile directly south of it, so the engine reads a
   north-south run and stands the barricade EDGE ON — in the frame it is a thin orange streak, which is
   docs/BEAUTIFY.md row F happening today. A BARRICADE IS NOT FENCE. It is a free-standing A-frame:
   two folding frames whose feet splay front-to-back, a brace between them, and one board bolted
   across the top. The stripes came off one stencil at the factory, so every barricade's are identical
   and lean the same way, and they are painted on BOTH faces (the default camera sees the back of half
   of them). What differs between barricades is what happened after: they were carried into the yard
   and set down — no two of the thirteen touch another one, so none of them is a run and each is
   turned its own way — one has had a leg kicked out, and the feet are dirty by how long they have
   stood there. */
TILEART_MESH["G"]=({x,y})=>{
  const h=(((x*5+y*3)%7)+7)%7;
  const ORANGE="#E0662B",LIT="#F08A4B",LEGC="#C25A1E",BRACE="#A8481A",WHITE="#F4F1EA",DIRT="#6B4A2E";
  const parts=[];
  [-0.29,0.29].forEach((lx,i)=>[[1,0.085],[-1,-0.085]].forEach(([s,lz])=>{
    const kick=(h%3===0&&i===0&&s>0)?0.13:0;                                                     /* one frame has had a leg kicked out */
    parts.push({s:"box",x:lx,y:0.233,z:lz,w:0.050,h:0.470,d:0.042,c:LEGC,rx:-s*(0.26+kick)});    /* the leg: its foot splays, its top meets its pair */
    parts.push({s:"box",x:lx,y:0.014,z:s*(0.145+kick*0.22),w:0.062,h:0.028+(h%4)*0.006,d:0.056,c:DIRT});}));  /* the foot, and how long it has stood in the dirt */
  parts.push({s:"box",x:0,y:0.175,z:0,w:0.62,h:0.045,d:0.032,c:BRACE});                          /* the brace between the frames */
  parts.push({s:"box",x:0,y:0.545,z:0,w:0.86,h:0.200,d:0.038,c:ORANGE});                         /* THE BOARD, 0.445 to 0.645 */
  parts.push({s:"box",x:0,y:0.648,z:0,w:0.86,h:0.012,d:0.042,c:LIT});                            /* its top edge, where the key lands */
  [[0.021,1],[-0.021,-1]].forEach(([bz,dir])=>[-0.26,0,0.26].forEach(sx=>
    parts.push({s:"box",x:sx,y:0.545,z:bz,w:0.076,h:0.215,d:0.008,c:WHITE,rz:dir*0.62})));        /* three stripes off one stencil, on both faces, each reading from its own side */
  return meshTurned(parts,(h-3)*0.20);};                                                          /* set down by hand: seven barricades, seven angles, none of them square to the world */

/* LA CAMA DEL PERRO — what Tacho sends up to the office when his district is done (a gift, not a map
   letter: content/meridian/config.js, grep "gift-ta" — it lands in f2 at (14,11), on the floor where a
   packing box used to be, and it is the only `○` in the game). What TILEART["○"] above draws: a purple
   ring, a paler middle, and a white bar with a knob at each end lying in it — a bone. It stood as a
   billboard, so a thing that lies on the floor was standing up in front of the player like a sign.
   Made as a dog bed is made: a base the cover is sewn over, a flat cushion, and ONE stuffed tube sewn
   into a ring round it — so the bolster is a torus, squashed, and the inside corner where it meets the
   cushion is the dark that makes the ring read. Then what the dog did: the front of the ring is
   crushed where she climbs in, and the bed is dragged, so it lies where it was left and not square to
   the room. 0.15 tall on purpose — a dog bed is a low ring on the floor, and that is the silhouette. */
TILEART_MESH["○"]=({x,y})=>{
  const h=(((x*5+y*3)%7)+7)%7;
  const BOLST="#7A5C8A",BOLSTL="#8E6E9E",CUSH="#9A7CAA",DARK="#4E3A5C",CRUSH="#6B4E7C",BONE="#F4F1EA";
  const parts=[
    {s:"cyl",x:0,y:0.016,z:0,r:0.300,h:0.032,c:DARK},                                     /* the base the cover is sewn over */
    {s:"cyl",x:0,y:0.044,z:0,r:0.255,h:0.030,c:CUSH},                                     /* the cushion inside the ring */
    {s:"torus",x:0,y:0.046,z:0,r:0.222,t:0.030,rx:Math.PI/2,sz:0.5,c:DARK},               /* the seam where they meet: every inside corner is dark */
    {s:"torus",x:0,y:0.062,z:0,r:0.252,t:0.092,rx:Math.PI/2,sz:0.62,c:BOLST},             /* the bolster: one stuffed tube, sewn into a ring — fat across, flat on top, as a stuffed tube sits */
    {s:"torus",x:0,y:0.098,z:0,r:0.252,t:0.058,rx:Math.PI/2,sz:0.30,c:BOLSTL},            /* its top, where the light lands */
    {s:"sph", x:0,y:0.052,z:0.235,r:0.130,sx:1.5,sy:0.30,c:CRUSH},                        /* the front, crushed flat where she climbs in */
    {s:"cyl",x:0.01,y:0.064,z:0.03,r:0.024,h:0.17,c:BONE,rz:Math.PI/2}];                  /* the bone, where she left it */
  [-0.085,0.085].forEach(bx=>[-0.027,0.027].forEach(bz=>
    parts.push({s:"sph",x:0.01+bx,y:0.064,z:0.03+bz,r:0.031,c:BONE})));                   /* its four knobs */
  return meshTurned(parts,(h-3)*0.30);};                                                   /* dragged: it lies where it was left */

/* LAS CAJAS DE LA MUDANZA — the taped boxes of the mid-move office (f2, four of them until the
   districts clear them) and the two in Limpieza Velázquez. `□` is `box:true` on purpose, and the
   owner is right that it IS a box — but a carton is not a cube, and the engine's box wore the carton's
   own FRONT ELEVATION on its LID: at 3× the top of every box in his office is a taped cross with a
   label lying face-up on it, on a body nearly as tall as a desk. Made the way a carton is made: ONE
   die-cut sheet, scored and folded into four walls; two inner flaps folded first, two outer flaps over
   them; tape down the centre seam where the outer two meet and a tab down each side — the H — and the
   label written on the SIDE, which is the side you can read in a stack. Sizes are a carton's, about
   half a tile, not a cupboard's. A stack is TWO CARTONS, not one tall one: the one underneath carries
   the weight, so it is squatter and wider, and the one on top was set down by hand, so it is askew
   and one of its flaps never quite went flat. Which tile stacks follows the picture's own parity, so
   the plan and the shape agree. And two cartons on neighbouring tiles were carried in together and
   dumped together, so they lean toward each other and TOUCH, the way the filing cabinets do. */
const meshCarton=(W,D,H,sd,openFlap)=>{
  const CARD="#C8A277",FLAP="#D8B589",SEAM="#8A6A45",TAPE="#EDE4D2",LABEL="#F6F2E8",INK="#6B5B45";
  const p=[{s:"box",x:0,y:H/2,z:0,w:W,h:H,d:D,c:CARD},                                     /* the four walls: one sheet, scored and folded */
    {s:"box",x:0,y:H-0.005,z:0,w:W-0.03,h:0.010,d:D-0.03,c:SEAM}];                         /* the two inner flaps, folded first and mostly covered */
  [-1,1].forEach(s=>{const lift=(openFlap&&s>0)?0.17:0;                                    /* one outer flap never quite went flat */
    p.push({s:"box",x:0,y:H+0.006+(lift?0.020:0),z:s*(D/4+0.004),w:W,h:0.012,d:D/2-0.010,c:FLAP,rx:-s*lift});});
  p.push({s:"box",x:0,y:H+0.014,z:0,w:W-0.02,h:0.006,d:0.042,c:TAPE});                     /* the tape down the centre seam */
  [-1,1].forEach(s=>p.push({s:"box",x:s*(W/2+0.004),y:H-0.038,z:0,w:0.009,h:0.078,d:0.042,c:TAPE})); /* and a tab down each side: the H */
  p.push({s:"box",x:0,y:H*0.42,z:D/2+0.005,w:W*0.46,h:H*0.34,d:0.006,c:LABEL});            /* the label, on the side you read in a stack */
  p.push({s:"box",x:-W*0.04,y:H*0.47,z:D/2+0.010,w:W*0.30,h:0.011,d:0.004,c:INK});         /* what somebody wrote on it */
  p.push({s:"box",x:-W*0.10,y:H*0.36,z:D/2+0.010,w:W*0.18,h:0.011,d:0.004,c:INK});
  return p;};
TILEART_MESH["□"]=({x,y})=>{
  const stacked=((((x|0)+(y|0))%2)+2)%2===1,h=(((x*5+y*3)%7)+7)%7;
  const w=CW(),bx=(gx,gy)=>{const r=w&&w.rows&&w.rows[gy];return !!r&&r[gx]==="□";};
  let parts;
  if(stacked){
    parts=meshTurned(meshCarton(0.54,0.50,0.32,h,false),(h-3)*0.05);                       /* the one underneath: squatter and wider, because it carries the weight */
    parts=parts.concat(meshTurned(meshCarton(0.42,0.38,0.30,h+2,true),(h%3-1)*0.34)
      .map(p=>({...p,x:p.x+0.05,y:p.y+0.325,z:p.z-0.03})));                                /* the one on top, set down by hand */
  }else parts=meshTurned(meshCarton(0.50,0.46,0.42,h,h%3===1),0);
  parts=meshTurned(parts,meshFacing(x,y)+(h-3)*0.09);                                      /* the label toward the room, and nobody ever put a box down square */
  const sh=0.21,dx=bx(x+1,y)?sh:bx(x-1,y)?-sh:0,dz=bx(x,y+1)?sh:bx(x,y-1)?-sh:0;           /* carried in together, dumped together: the pair touches */
  return dx||dz?parts.map(p=>({...p,x:p.x+dx,z:p.z+dz})):parts;};

/* EL BOTE DE DOÑA MECHE — the tamale cart at the stop. NOT in the brief for this lane: it came out of
   sweeping every glyph Meridian lays against its kind and asking which still had no shape, which is
   what "all furniture and this type of item" actually asks for. It is kind `appliance`, it is one tile
   on the empty lot, and it stood as a BOX — so a two-wheeled handcart with a steel bote on it was a
   cupboard wearing its own lid-drawing on its lid. Its own comment says "A box in 3D with a side view,
   never a cutout", which was the best answer the day it was written and is not the best answer now.
   What the two drawings say it is made of (TILEART["ʘ"] and TILEART_SIDE["ʘ"] below): a wooden cart
   body, two wheels with pale hubs, a steel pot with a lighter body and a dark rim, a ladle, steam
   always, and a marigold on the lid in season. Made the way a handcart is made: an axle with a wheel
   on each end, the body planked on over it, a prop leg at the front so it stands still when it is
   parked, two push handles at the back; then the bote set down in the well of the deck, its domed lid
   with a rim and a knob, two ears to lift it by, and the ladle hooked over the side where the hand
   goes. The steam is three puffs at `a:` 0.3 — the glass path in t3MeshOf, which is the only way a
   vertex-coloured Lambert can be see-through. The marigold is la botánica's head (meshMarigold), so
   the season reaches this the same way it reaches the beds. */
TILEART_MESH["ʘ"]=({x,y})=>{
  const BODY="#8A6F4D",BODYD="#6E5638",TYRE="#3A3A44",HUB="#8A8F98",POT="#8A8F98",POTL="#B0B4BC",
        RIM="#6E7278",DARK="#3A3A44",STEAM="#F4F4F8";
  const parts=[];
  parts.push({s:"cyl",x:0,y:0.165,z:0.02,r:0.016,h:0.68,c:DARK,rz:Math.PI/2});                  /* the axle, across the cart */
  [-0.31,0.31].forEach(wx=>{parts.push({s:"cyl",x:wx,y:0.165,z:0.02,r:0.165,h:0.050,c:TYRE,rz:Math.PI/2});  /* a wheel */
    parts.push({s:"cyl",x:wx,y:0.165,z:0.02,r:0.055,h:0.056,c:HUB,rz:Math.PI/2});});            /* its pale hub */
  parts.push({s:"cyl",x:0,y:0.14,z:0.21,r:0.017,h:0.28,c:DARK});                                 /* the prop leg: a parked handcart stands on it */
  parts.push({s:"box",x:0,y:0.360,z:0,w:0.66,h:0.150,d:0.44,c:BODYD},                            /* the body, planked over the axle */
    {s:"box",x:0,y:0.368,z:0.225,w:0.62,h:0.120,d:0.014,c:BODY},                                 /* its front board, lit */
    {s:"box",x:0,y:0.438,z:0,w:0.68,h:0.022,d:0.46,c:BODY});                                     /* the deck */
  [-0.24,0.24].forEach(hx=>parts.push({s:"cyl",x:hx,y:0.520,z:-0.270,r:0.019,h:0.30,c:BODY,rx:0.45})); /* the two push handles */
  parts.push({s:"cyl",x:0,y:0.605,z:0,r:0.200,h:0.310,c:POT},                                    /* the bote, standing in the deck's well: 0.45 to 0.76 */
    {s:"cyl",x:0,y:0.640,z:0,r:0.206,h:0.055,c:POTL},                                            /* the band round it, where the light lands */
    {s:"torus",x:0,y:0.758,z:0,r:0.199,t:0.020,rx:Math.PI/2,c:RIM},                              /* the rim the lid sits in */
    {s:"sph",x:0,y:0.770,z:0,r:0.196,sy:0.34,c:POTL},                                            /* the domed lid */
    {s:"cyl",x:0,y:0.828,z:0,r:0.032,h:0.030,c:RIM});                                            /* its knob */
  [-0.205,0.205].forEach(ex=>parts.push({s:"torus",x:ex,y:0.660,z:0,r:0.040,t:0.013,c:RIM,ry:Math.PI/2})); /* two ears, to lift it by */
  parts.push({s:"cyl",x:0.252,y:0.680,z:0.10,r:0.012,h:0.32,c:DARK,rz:0.20},                     /* the ladle, hooked over the rim and leaning on the pot */
    {s:"sph",x:0.285,y:0.528,z:0.10,r:0.048,sy:0.5,c:DARK});                                     /* its bowl, down where the hand does not go */
  [[-0.04,0.90,0.075],[0.03,0.99,0.062],[0.09,1.07,0.048]].forEach(([sx2,sy2,r])=>
    parts.push({s:"sph",x:sx2,y:sy2,z:-0.02,r,sx:1.5,sy:0.8,c:STEAM,a:0.35}));                   /* steam, always — the one thing on this cart that is never off */
  if(typeof petalsOn==="function"&&petalsOn()&&typeof meshMarigold==="function")
    meshMarigold(parts,0.095,0.815,-0.06,0.055,petalPal(),3,1,0);                                /* a marigold on the lid in season, the same head the beds grow */
  return meshTurned(parts,meshFacing(x,y));};

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
  "Y":{lift:13,kind:"transit",stand:true},   /* walkable, but a real object: nothing reads lift for a stand tile, it is a height class */
  "b":{lift:3,kind:"nature",box:true},       /* the raised bed (2026-09-21): solid via SOLIDX, a box because TILEART_SIDE draws its curb */
  "g":{stand:true,kind:"nature"}             /* grass stands (2026-09-21): walkable, a mesh in 3D; no side art, so front and iso still paint it */
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
  esquina:(sx,sy,c)=>{ /* La esquina: Doña Meche's pot on a folding table — what is actually on that
    corner, not a symbol for it. The other six are a tower, a basket, a wrench, a wheat ear, a bucket
    and a stamp; hers is the pot, because a woman who has been there since before the rails is known
    by the thing she carries out every afternoon. Added 2026-09-17: the panel existed in DECOR from
    the day la esquina shipped and there was no drawing for it, so her wall was blank plaster at
    every grade, forever, and nothing said so. There is a guard for that now (test/smoke.js). */
    ctx.fillStyle=c;                                                      /* the pot */
    ctx.beginPath();ctx.moveTo(sx+9,sy+13);ctx.lineTo(sx+23,sy+13);ctx.lineTo(sx+21,sy+22);ctx.lineTo(sx+11,sy+22);ctx.closePath();ctx.fill();
    ctx.fillRect(sx+8,sy+10.5,16,2.5);                                    /* the lid */
    ctx.fillRect(sx+15,sy+7.5,2,3);                                       /* its knob */
    ctx.fillStyle=PLASTER;ctx.fillRect(sx+12,sy+16,8,1.4);                /* the band round the belly */
    ctx.fillStyle=c;[11,16,21].forEach((x,i)=>ctx.fillRect(sx+x,sy+1.5+(i%2)*1.8,1.6,4.5)); /* steam */
    ctx.fillRect(sx+6,sy+23,20,2);                                        /* the folding table */
    ctx.fillRect(sx+8,sy+25,1.8,4);ctx.fillRect(sx+22,sy+25,1.8,4);},     /* and its legs */
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
