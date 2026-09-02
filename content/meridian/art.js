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
const TILEMETA={
  "|":{lift:13,kind:"wall"},
  "□":{lift:5,kind:"prop"}
};
