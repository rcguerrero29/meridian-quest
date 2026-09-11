/* El Changarrito — the town's own tile art (engine seams TILEART / TILEMETA). One thing only:
   the third storefront face. The engine's I is El Mercado's grocery counter (a scale and a
   tomato, lift 6, furniture); the town's street used it as a facade and it drew as four
   counters in the facade row (Don Güero's find, #69). Here, in the town and nowhere else, I is
   a facade at wall height — steel-grey plaster, a dark awning, one window with a lit sign. */
const TILEMETA={I:{lift:13,kind:"facade",win:[[7,13,18,11]],awn:9}};
const TILEART={I:rc=>{const{sx,sy}=rc;
  ctx.fillStyle="#6E7680";ctx.fillRect(sx,sy,TS,TS);
  for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#2B2F38":"#C9CDD2";ctx.fillRect(sx+i*8,sy,8,7);}
  ctx.fillStyle="#3A3F46";ctx.fillRect(sx,sy+7,TS,2);
  ctx.fillStyle="#DCE6F0";ctx.fillRect(sx+7,sy+11,18,14); /* one window */
  ctx.fillStyle="#2B2F38";ctx.fillRect(sx+10,sy+14,12,2);ctx.fillRect(sx+10,sy+18,8,2); /* two lines on the glass: a sign */
  ctx.fillStyle="#E0B45C";ctx.fillRect(sx+20,sy+18,3,3); /* the lit corner */}};

/* ▧ — EL MURAL DE LA CUADRILLA.
   NOT "M": M is already this town's door to Pili's paint shop (PORTALS.st in maps.js:161). Adding M
   to SOLIDX made that door solid and es fell out of the city — test/engine.smoke.js caught it in one
   run. One part, one name (docs/TAGS.md). A map glyph is a namespace and a pack has exactly one. A limewashed wall with paint on it, so you can see from across the
   street that something is painted there, and have to walk up to find out what (owner, 2026-09-11:
   "you see tiles/icons from afar but you get close and can interact to see it full screen"). The
   tile is a SUGGESTION of a mural and never a thumbnail of one — the panels are drawn at reading
   size in the document. Solid: it is a wall. Declared in SOLIDX, not in the engine. */
TILEMETA["▧"]={lift:13,kind:"facade"};
TILEART["▧"]=rc=>{const{sx,sy,x,y}=rc;
  ctx.fillStyle="#E6DFCF";ctx.fillRect(sx,sy,TS,TS);                      /* lime wash */
  ctx.fillStyle="#D6CDB8";for(let i=0;i<TS;i+=6)ctx.fillRect(sx,sy+i,TS,1);
  const k=((x*7+y*13)|0)%2;                                               /* two tiles, two halves of one painting */
  ctx.fillStyle="#B0563A";ctx.fillRect(sx+3,sy+8,TS-6,9);                 /* a red band: the tram */
  ctx.fillStyle="#D8D6CE";ctx.fillRect(sx+6,sy+10,5,4);ctx.fillRect(sx+13,sy+10,5,4);ctx.fillRect(sx+20,sy+10,5,4);
  ctx.fillStyle="#2B2536";ctx.fillRect(sx+7,sy+17,4,2);ctx.fillRect(sx+21,sy+17,4,2);
  ctx.fillStyle=k?"#E0A430":"#5F7A52";ctx.fillRect(sx+4,sy+21,TS-8,2);    /* the line under it */
  ctx.fillStyle="#8E4230";ctx.fillRect(sx+2,sy+4,TS-4,2);                 /* the top rule */
  ctx.fillStyle="#C4BBA6";ctx.fillRect(sx,sy+TS-3,TS,3);};                /* the dado */
const TILEART_SIDE={"▧":TILEART["▧"]};   /* the wall reads the same from the front cameras */

