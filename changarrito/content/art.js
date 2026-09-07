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
