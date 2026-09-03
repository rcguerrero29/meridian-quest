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
  "○":rc=>{const{sx,sy}=rc; /* the dog bed */
    ctx.fillStyle="#7A5C8A";ctx.beginPath();ctx.ellipse(sx+16,sy+21,13,7,0,0,7);ctx.fill();
    ctx.fillStyle="#9A7CAA";ctx.beginPath();ctx.ellipse(sx+16,sy+21,9,4,0,0,7);ctx.fill();
    ctx.fillStyle="#F4F1EA";ctx.fillRect(sx+12,sy+20,8,2);[12,20].forEach(px=>{ctx.beginPath();ctx.arc(sx+px,sy+21,1.6,0,7);ctx.fill();});}
};
Object.assign(TILEART,TILE_PROPS,{
  "=":rc=>{const{sx,sy}=rc; /* taller facade: painted block, two slit windows, a red band */
    ctx.fillStyle=tc("#6E6A73");ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc("#5A5762");ctx.fillRect(sx,sy,TS,5);
    ctx.fillStyle="#2A2E38";ctx.fillRect(sx+6,sy+8,7,6);ctx.fillRect(sx+19,sy+8,7,6);
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
    ctx.fillStyle="#3FA3A0";ctx.fillRect(sx+9,sy+19,7,5);ctx.fillRect(sx+20,sy+13,1.5,9);ctx.fillRect(sx+17,sy+21,8,3);}
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

const TILEART_SIDE=Object.assign({},TILE_PROPS);
TILEART_SIDE["□"]=TILEART["□"]; /* cardboard and tape read the same from the side — it stands as a real box in 3D */ /* the props stand up wearing the same drawing */
const TILEMETA={"▭":{lift:13,kind:"wall"},"▤":{lift:13,kind:"wall"},
  
  "|":{lift:13,kind:"wall"},
  "□":{lift:5,kind:"prop",box:true},
  "=":{lift:13,kind:"facade",win:[[6,8,7,6],[19,8,7,6]]},
  "6":{lift:8,kind:"prop"},"7":{lift:12,kind:"prop"},"8":{lift:9,kind:"furniture"},"0":{lift:6,kind:"prop"},
  "&":{lift:13,kind:"facade",win:[[7,12,18,11]],awn:9},
  "!":{lift:13,kind:"facade",win:[[5,11,22,12]]},
  "▣":{lift:10,kind:"appliance"},"▯":{lift:9,kind:"furniture"},"⊔":{lift:6,kind:"furniture"},"○":{lift:3,kind:"prop"}
};
