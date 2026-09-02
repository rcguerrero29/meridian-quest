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
    ctx.fillStyle="#332C44";ctx.fillRect(sx+2,sy+30,28,1);}
};
const TILEMETA={
  "|":{lift:13,kind:"wall"}
};
