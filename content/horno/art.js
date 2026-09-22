/* EL HORNO — the drawings. Six glyphs, four cameras, ONE decision.

   THE ONE IDEA THIS PACK IS FOR. The tray is drawn three times — from above, from the front, and
   as a shape in 3D — and all three read the same glyph out of the grid. So the sheet's button does
   not "update the picture": it changes what the tile IS (propSet), and the three painters were
   already drawing whatever that is. One decision, four cameras, no synchronising.

   `put(part,u,v,h)` IS THE REUSABLE THING, and it is COPIED here, never imported.
   content/meridian/art.js builds its bakery racks with a closure that takes a part written FLAT —
   u across the pan, v toward the room, h above the sheet — and does the trigonometry for a tilted
   surface. That is a tray, a board, a griddle, a counter, any surface at any angle, for free, and
   it is the most reusable thing that pack produced. A second world may not reach into Meridian's
   files at runtime (docs/story/el-changarrito.md §7½), so the eight-line closure lives here too.
   Copying it is the RULE, not a shortcut: the day Meridian re-tilts its racks, this kitchen does
   not silently re-tilt with them.

   HOW IT IS MADE (.claude/skills/how-its-made): one dough, divided by hand, rounded, proved,
   pasted, baked on one sheet. Variation enters at the step it actually entered and nowhere
   earlier — the three rounds differ in SIZE because a hand divided them; the shell is ONE colour
   across the tray because it came off one batch of paste; exactly one piece is darker because the
   oven has a hot corner and the tray sat in it. Nothing is randomised per frame: the same tray
   looks the same from every camera and after every re-bake. */

const SOLIDX="whfpvc";      /* the tray in all three states is solid, so a bake can never change what you can walk on */

const TILEMETA={
  w:{lift:13,kind:"wall"},
  h:{lift:12,kind:"appliance"},
  f:{lift:7,kind:"furniture",box:true},
  p:{lift:7,kind:"furniture",box:true},
  v:{lift:7,kind:"furniture",box:true},
  c:{lift:7,kind:"furniture",box:true}
};

/* ---- THE PALETTE. A kitchen at nine in the morning: lime-washed wall, scorched brick, seasoned
   steel, and three colours of bread that a person could name out loud. ---- */
const B={
  wall:"#E6DCC8", wallTop:"#F2EADA", wallD:"#C9BCA2",
  brick:"#9C4B32", brickD:"#7A3722", brickL:"#B45F42", iron:"#3A3330", ironL:"#564C46", ember:"#E08A3C",
  leg:"#6B4A2E", top:"#8A6238", topL:"#A67B4C",
  pan:"#3E3A37", panL:"#5E5853",                     /* seasoned steel: dark, with a lit lip */
  cloth:"#D8CDB6",                                    /* the rolled cloth the back of the pan rests on */
  dough:"#EFE3C6", doughD:"#DCCDA9",                  /* proved dough: pale, matte, soft-edged */
  crust:"#D19A4C", crustD:"#A9732E",                  /* baked */
  vanilla:"#F4EAD2", vanillaD:"#DCCBA4",
  choc:"#5E3A2A", chocD:"#3F2418",
  sack:"#D9C9A4", sackD:"#B9A57C", flour:"#F6F1E4"
};

/* ---- THE TRAY. THREE ROUNDS OFF ONE DIVISION. ---- */
const H_TILT=0.30;                /* the pan leans toward the room, as a pan on a rolled cloth does */
const H_U=[-0.21,0,0.21];         /* three across the sheet */
const H_K=[1.00,0.93,1.06];       /* hand-divided: three masses off one dough, and that is the ONLY thing that varies by piece before the oven */
const H_HOT=2;                    /* the oven's hot corner caught the right-hand one. One piece, every camera, for ever */

/* THE PIECES, AS PARTS ON A TILTED SHEET. `put` is the closure above; every kind is written FLAT.
   kind: "p" three plain rounds · "v" vanilla shells · "c" chocolate shells */
const hGoods=(kind,put)=>{
  const dough=kind==="p";
  const cap=kind==="v"?B.vanilla:B.choc;
  H_U.forEach((u,i)=>{
    const k=H_K[i], hot=i===H_HOT;
    if(dough){
      put({s:"cyl",r:0.098*k,h:0.040,c:B.doughD},u,0,0.020);          /* where it sat down on the sheet and spread a little */
      put({s:"sph",r:0.096*k,sy:0.74,c:B.dough},u,0,0.042);           /* the round itself: proved, matte, no mark on it at all */
      return;
    }
    put({s:"cyl",r:0.104*k,h:0.046,c:hot?B.crustD:B.crust},u,0,0.023); /* the baked foot — the one the hot corner caught is darker */
    put({s:"sph",r:0.102*k,sy:0.72,c:cap},u,0,0.047);                  /* THE SHELL: one batch of paste, so one colour across the whole tray */
    /* THE SCORE. The paste is cut with the cutter BEFORE the oven and the cuts OPEN as the dough
       rises under it, so what you see is not a line drawn on the shell — it is the crust coming
       through it. That is why the crack is the crust's colour in both flavours: on vanilla it
       reads as a darker line, on chocolate as a pale one. One colour, two readings, both true. */
    [0,1,2,3].forEach(j=>put({s:"box",w:0.168*k,h:0.020,d:0.024,ry:j*Math.PI/4,c:hot?B.crustD:B.crust},u,0,0.088*k));
  });
};

/* THE TRAY AS A SHAPE (the 3D camera). A trestle table, a rolled cloth under the back edge of the
   sheet, the sheet, its lip, and what hGoods said.

   HOW HIGH THE BENCH STANDS, AND THE MEASUREMENT THAT WAS OF THE WRONG THING.
   A previous pass raised this bench from 0.502 to 0.696 on the sentence "what stands above the
   floor is (44/48)*(48/32)*0.92 = 1.265 world units". THAT NUMBER IS THE TOP EDGE OF THE CARD,
   NOT THE TOP OF THE PERSON. A person in 3D is a 36x48 billboard scaled by T3PERSON
   (engine3d.js, grep `p.spr.scale.set`), and the card carries 8px of headroom above her head for
   a speech bubble (engine3d.js, grep `headroom for the bubble`, #57) plus 4px of clearance under
   her feet. Nothing is ever DRAWN in that headroom, so sizing furniture against 1.265 sizes it
   against empty air.
   WHAT A PERSON ACTUALLY IS, measured rather than derived — painted into her own card through
   engine3d.js's own transform and scanned for her topmost opaque row (row 12, with the floor at
   row 44 because the sprite's anchor is 4/48 up): (44-12)/48 * 1.38 = 0.92. A person's drawn
   height IS T3PERSON. The doorway beside her is 1.0. That is the ruler, and test/horno.js now
   paints her and scans her rather than trusting this paragraph.
   HER LANDMARKS, in the same units, off drawPerson's own coordinates (engine.js, grep
   `function drawPerson`): feet 0.09, hip 0.29, shoulder (the top row of her shirt) 0.60, chin
   0.53, the middle of her head 0.72, the top of her head 0.92. She is a cartoon with a large
   head, so human percentages do not transfer and these are the only ones that mean anything here.
   SO: the bench top face sits at 0.502, which is 54.6% of her — the baker's-bench proportion,
   between her hip and her chin, the height you can get your weight over. At 0.696 it stood ABOVE
   HER SHOULDER, the dough on it reached 0.8075 — level with her face — and the pan cut the sign
   on the wall behind it in half. Rendered both ways at 390x844, standing her beside it, before
   and after.
   The FLAT painters below are left alone on purpose: in top and front a tile's height on screen is
   set by which ROW it is in far more than by what is drawn inside it, and both were looked at at
   390x844 and read correctly. Only the 3D camera puts a bench and a person in the same space. */
const hTrayMesh=kind=>()=>{
  const parts=[],ty=0.50,ca=Math.cos(H_TILT),sa=Math.sin(H_TILT),PW=0.72,PD=0.44;
  [[-0.31,-0.21],[0.31,-0.21],[-0.31,0.21],[0.31,0.21]].forEach(([lx,lz])=>
    parts.push({s:"box",x:lx,y:0.235,z:lz,w:0.055,h:0.47,d:0.055,c:B.leg}));      /* four legs */
  parts.push({s:"box",x:0,y:0.30,z:0,w:0.70,h:0.035,d:0.46,c:B.leg});             /* the stretcher between them, low, where a boot goes */
  parts.push({s:"box",x:0,y:0.478,z:0,w:0.82,h:0.048,d:0.58,c:B.top});            /* the bench top: 0.502 at its face, 54.6% of a person — hip-to-chin */
  parts.push({s:"box",x:0,y:0.503,z:0,w:0.82,h:0.006,d:0.58,c:B.topL});           /* floured, so the top face is lighter than the edge */
  parts.push({s:"cyl",r:0.036,h:0.64,rz:Math.PI/2,x:0,y:0.537,z:-0.205,c:B.cloth});/* THE ROLLED CLOTH. This is why the pan is tilted, and it is the only honest way to tilt one */
  /* the closure, copied from content/meridian/art.js's rack and not imported */
  const put=(p,u,v,h)=>parts.push({...p,x:u,y:ty+h*ca-v*sa,z:h*sa+v*ca,rx:(p.rx||0)+H_TILT});
  put({s:"box",w:PW,h:0.018,d:PD,c:B.pan},0,0,0.009);                             /* the sheet, seasoned steel */
  put({s:"box",w:PW,h:0.046,d:0.020,c:B.panL},0,PD/2,0.028);                      /* the front lip, lit */
  put({s:"box",w:PW,h:0.046,d:0.020,c:B.pan},0,-PD/2,0.028);                      /* the back lip, in its own shadow */
  hGoods(kind,put);
  return parts;
};

/* THE TRAY FROM ABOVE. The bench, the sheet foreshortened by its tilt, three pieces. */
const hTrayTop=kind=>rc=>{const{sx,sy}=rc,dough=kind==="p",cap=kind==="v"?B.vanilla:B.choc,capD=kind==="v"?B.vanillaD:B.chocD;
  ctx.fillStyle=B.top;ctx.fillRect(sx+2,sy+3,TS-4,TS-6);
  ctx.fillStyle=B.topL;ctx.fillRect(sx+3,sy+4,TS-6,TS-8);
  ctx.fillStyle=B.cloth;ctx.fillRect(sx+4,sy+5,TS-8,2.4);                               /* the rolled cloth, seen end-on from above */
  ctx.fillStyle=B.pan;ctx.fillRect(sx+4,sy+7,TS-8,17);                                  /* the sheet: shorter than it is, because it leans away */
  ctx.fillStyle=B.panL;ctx.fillRect(sx+4,sy+23.4,TS-8,1.6);                             /* the lip nearest you catches the light */
  ctx.fillStyle="rgba(20,14,8,.28)";ctx.fillRect(sx+4,sy+7,TS-8,1.2);
  [8.4,16,23.6].forEach((cx,i)=>{const k=H_K[i],hot=i===H_HOT,r=4.6*k,cy=sy+15.2;
    if(dough){ctx.fillStyle=B.doughD;ctx.beginPath();ctx.arc(sx+cx,cy+0.5,r,0,7);ctx.fill();
      ctx.fillStyle=B.dough;ctx.beginPath();ctx.arc(sx+cx,cy,r-0.5,0,7);ctx.fill();return;}
    ctx.fillStyle=hot?B.crustD:B.crust;ctx.beginPath();ctx.arc(sx+cx,cy,r,0,7);ctx.fill();          /* the crust, standing out past the shell */
    ctx.fillStyle=cap;ctx.beginPath();ctx.arc(sx+cx,cy,r-1,0,7);ctx.fill();                          /* the shell */
    ctx.strokeStyle=hot?B.crustD:B.crust;ctx.lineWidth=1;                                            /* the cuts, opened: four of them, the crust coming through */
    for(let j=0;j<4;j++){const a=j*Math.PI/4,dx=Math.cos(a)*(r-1),dy=Math.sin(a)*(r-1);
      ctx.beginPath();ctx.moveTo(sx+cx-dx,cy-dy);ctx.lineTo(sx+cx+dx,cy+dy);ctx.stroke();}
    ctx.strokeStyle=capD;ctx.lineWidth=0.7;ctx.beginPath();ctx.arc(sx+cx,cy,r-1.4,0,7);ctx.stroke();});
};

/* THE TRAY FROM THE FRONT. Legs, bench, the sheet's near edge as a band, three domes standing on it. */
const hTraySide=kind=>rc=>{const{sx,sy}=rc,dough=kind==="p",cap=kind==="v"?B.vanilla:B.choc,capD=kind==="v"?B.vanillaD:B.chocD;
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.beginPath();ctx.ellipse(sx+16,sy+30.6,12,2,0,0,7);ctx.fill();
  ctx.fillStyle=B.leg;ctx.fillRect(sx+5,sy+16,2.6,14);ctx.fillRect(sx+TS-7.6,sy+16,2.6,14);ctx.fillRect(sx+6,sy+23,TS-12,1.6);
  ctx.fillStyle=B.top;ctx.fillRect(sx+3,sy+14,TS-6,2.6);
  ctx.fillStyle=B.topL;ctx.fillRect(sx+3,sy+14,TS-6,0.9);
  ctx.fillStyle=B.pan;ctx.fillRect(sx+4.5,sy+10.6,TS-9,3.4);                                  /* the sheet's surface, leaning back away from you */
  ctx.fillStyle=B.panL;ctx.fillRect(sx+4.5,sy+13.2,TS-9,1.3);                                 /* the lip */
  ctx.fillStyle="rgba(15,12,20,.35)";ctx.fillRect(sx+4.5,sy+14.5,TS-9,0.8);
  [8,16,24].forEach((cx,i)=>{const k=H_K[i],hot=i===H_HOT,r=4.2*k,base=sy+11.4;
    if(dough){ctx.fillStyle=B.dough;ctx.beginPath();ctx.ellipse(sx+cx,base,r,r*0.86,0,Math.PI,0);ctx.fill();
      ctx.fillStyle=B.doughD;ctx.beginPath();ctx.ellipse(sx+cx,base,r,r*0.30,0,0,7);ctx.fill();                   /* where it sat down and spread — and the gap between rounds, so you can count three */
      return;}
    ctx.fillStyle=hot?B.crustD:B.crust;ctx.beginPath();ctx.ellipse(sx+cx,base,r,r*0.42,0,0,7);ctx.fill();          /* the crust foot */
    ctx.fillStyle=cap;ctx.beginPath();ctx.ellipse(sx+cx,base-0.8,r-0.4,r*0.92,0,Math.PI,0);ctx.fill();            /* the shell, a dome */
    /* THE CUTS, SEEN FROM THE FRONT. They were three near-vertical strokes and they read as bars
       across the loaf; a concha's cuts RADIATE from the top of the shell, so from the front they
       fan. Drawn from the apex outward and stopped short of the foot, which is what a cut that
       opened as the dough rose actually looks like from the side of the tray. */
    ctx.strokeStyle=hot?B.crustD:B.crust;ctx.lineWidth=0.9;ctx.lineCap="round";
    [-1,-0.38,0.38,1].forEach(o=>{ctx.beginPath();
      ctx.moveTo(sx+cx+o*r*0.20,base-r*0.86);ctx.lineTo(sx+cx+o*r*0.80,base-r*0.16);ctx.stroke();});
    ctx.strokeStyle=capD;ctx.lineWidth=0.7;ctx.beginPath();ctx.moveTo(sx+cx-r+0.6,base-0.8);ctx.lineTo(sx+cx+r-0.6,base-0.8);ctx.stroke();});
};

/* ---- EL HORNO. The room's one other landmark: brick, an arched mouth, an iron door ajar. ---- */
const hOvenMesh=()=>[
  {s:"box",x:0,y:0.42,z:0,w:0.94,h:0.84,d:0.90,c:B.brick},
  {s:"box",x:0,y:0.86,z:0,w:1.00,h:0.06,d:0.96,c:B.brickL},              /* the capping course */
  {s:"box",x:0,y:0.30,z:0.455,w:0.52,h:0.44,d:0.05,c:B.ironL},           /* the door frame */
  {s:"box",x:0,y:0.30,z:0.472,w:0.44,h:0.36,d:0.03,c:B.iron},            /* the door */
  {s:"torus",r:0.22,t:0.035,arc:Math.PI,x:0,y:0.30,z:0.478,c:B.brickD},  /* the arch over the mouth */
  {s:"box",x:0,y:0.17,z:0.492,w:0.30,h:0.05,d:0.02,c:B.ember},           /* the light under the door: the oven is ON, and that is the whole story */
  {s:"cyl",r:0.045,h:0.10,rz:Math.PI/2,x:0,y:0.30,z:0.495,c:B.ironL},    /* the handle */
  {s:"cyl",r:0.10,h:0.34,x:-0.28,y:1.06,z:-0.28,c:B.brickD}              /* the flue */
];
const hOvenTop=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=B.brick;ctx.fillRect(sx,sy,TS,TS);
  ctx.fillStyle=B.brickL;ctx.fillRect(sx+1,sy+1,TS-2,TS-2);
  ctx.fillStyle=B.brickD;for(let r=0;r<4;r++)ctx.fillRect(sx+1,sy+2+r*7.4,TS-2,1);
  ctx.fillStyle=B.iron;ctx.beginPath();ctx.arc(sx+8,sy+8,4.2,0,7);ctx.fill();          /* the flue, from above */
  ctx.fillStyle=B.ironL;ctx.beginPath();ctx.arc(sx+8,sy+8,2.6,0,7);ctx.fill();};
const hOvenSide=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=B.brick;ctx.fillRect(sx+1,sy+5,TS-2,26);
  ctx.fillStyle=B.brickL;ctx.fillRect(sx+0.4,sy+3.4,TS-0.8,2.4);
  ctx.fillStyle=B.brickD;for(let r=0;r<4;r++)ctx.fillRect(sx+1,sy+9+r*5.4,TS-2,0.9);
  ctx.fillStyle=B.ironL;ctx.fillRect(sx+8,sy+13,16,13);
  ctx.fillStyle=B.iron;ctx.fillRect(sx+9.4,sy+14.4,13.2,10.2);
  ctx.fillStyle=B.ember;ctx.fillRect(sx+10,sy+24.8,12,1.6);                            /* the line of fire under the door */
  ctx.fillStyle=B.ironL;ctx.fillRect(sx+14,sy+18.4,4,1.6);
  ctx.fillStyle=B.brickD;ctx.fillRect(sx+3,sy+0,5,4);};                                /* the flue */

/* ---- THE FLOUR BIN. A sack in a wooden bin, open, with a scoop's worth spilled on the rim. ---- */
const hBinMesh=()=>[
  {s:"box",x:0,y:0.16,z:0,w:0.74,h:0.32,d:0.62,c:B.leg},
  {s:"box",x:0,y:0.33,z:0,w:0.78,h:0.04,d:0.66,c:B.top},
  {s:"cyl",rt:0.29,rb:0.24,h:0.40,x:0,y:0.52,z:0,c:B.sack},                            /* the sack, slumped: wider at the mouth than at the foot */
  {s:"cyl",r:0.27,h:0.05,x:0,y:0.71,z:0,c:B.sackD},                                    /* the roll of the folded-down top */
  {s:"sph",r:0.24,sy:0.34,x:0,y:0.73,z:0,c:B.flour},                                   /* what is in it */
  {s:"sph",r:0.10,sy:0.22,x:0.26,y:0.36,z:0.18,c:B.flour}                              /* and what went over the side */
];
const hBinTop=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=B.leg;ctx.fillRect(sx+2,sy+3,TS-4,TS-6);
  ctx.fillStyle=B.sack;ctx.beginPath();ctx.arc(sx+16,sy+16,10,0,7);ctx.fill();
  ctx.fillStyle=B.sackD;ctx.beginPath();ctx.arc(sx+16,sy+16,8.6,0,7);ctx.fill();
  ctx.fillStyle=B.flour;ctx.beginPath();ctx.arc(sx+16,sy+16,7.2,0,7);ctx.fill();
  ctx.fillStyle=B.flour;ctx.beginPath();ctx.ellipse(sx+25,sy+22,3.2,2,0,0,7);ctx.fill();};
const hBinSide=rc=>{const{sx,sy}=rc;
  ctx.fillStyle="rgba(15,12,20,.20)";ctx.beginPath();ctx.ellipse(sx+16,sy+30.4,11,2,0,0,7);ctx.fill();
  ctx.fillStyle=B.leg;ctx.fillRect(sx+5,sy+20,22,10);
  ctx.fillStyle=B.top;ctx.fillRect(sx+4,sy+18.6,24,1.8);
  ctx.fillStyle=B.sack;ctx.beginPath();ctx.moveTo(sx+8,sy+19);ctx.lineTo(sx+24,sy+19);ctx.lineTo(sx+25,sy+8);ctx.lineTo(sx+7,sy+8);ctx.closePath();ctx.fill();
  ctx.fillStyle=B.sackD;ctx.fillRect(sx+6.6,sy+6.6,18.8,2.4);
  ctx.fillStyle=B.flour;ctx.beginPath();ctx.ellipse(sx+16,sy+6.8,8.2,1.8,0,Math.PI,0);ctx.fill();
  ctx.fillStyle=B.flour;ctx.fillRect(sx+24,sy+17.4,4,1.4);};

/* ---- THE WALL. Lime wash over stone: nothing clever, and it should not be. ---- */
const hWallTop=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=B.wall;ctx.fillRect(sx,sy,TS,TS);
  ctx.fillStyle=B.wallTop;ctx.fillRect(sx,sy,TS,6);
  ctx.fillStyle=B.wallD;ctx.fillRect(sx,sy+TS-2,TS,2);};
const hWallSide=rc=>{const{sx,sy}=rc;
  ctx.fillStyle=B.wall;ctx.fillRect(sx,sy,TS,TS);
  ctx.fillStyle=B.wallTop;ctx.fillRect(sx,sy,TS,3);
  ctx.fillStyle=B.wallD;ctx.fillRect(sx,sy+18,TS,1.2);};

/* ---- THE ISOMETRIC CAMERA, AND WHAT IT COST TO FIND OUT ----

   MEASURED, not reasoned. The bake was photographed in all four cameras and diffed against a
   zero control, and the isometric camera came back with EXACTLY ZERO changed pixels while the
   other three moved. (The numbers the shipped guard prints today are top 228, front 155, 3D 76
   and iso 915 — the 915 is this workaround, and before it that figure was 0. An earlier write-up
   of this lane quoted 825 / 446 / 126 / 0; those came from a different probe on a different tree
   and they are not what `node test/horno.js` prints. Numbers in a comment are a receipt: they
   name the run that produced them or they are decoration.)

   WHY. drawIso's depth pass (engine/engine.js, grep `isoBlock(cx,cy,ISOCOL`) paints every SOLID
   glyph as a coloured slab — `ISOCOL[gch]||ISOCOL[w.rows[y][x]]||C.wall` — and never calls the
   tile's painter. Only a `stand` tile (walkable, `standsUp`) gets its `side` art billboarded
   there. So a bench with bread on it is a grey box in one of the four cameras, and p, v and c all
   resolve to the same `C.wall` fallback, which is why the number is zero and not small.

   AND THE SLOT THAT WAS MEANT TO ANSWER THIS IS WRITE-ONLY. The view registry has an `iso` slot,
   engine.js (grep `TILEART["J"] = { top`) advertises it in its own comment — `TILEART["J"] = { top:fn, side:fn, crown:fn,
   iso:fn }` — engine.js (grep `if(v.iso)TILEISO`) fills TILEISO from it and `tileView` will look it up. **Nothing
   in the engine ever calls tileView(g,"iso").** A grep of engine/ for TILEISO returns the
   declaration, the write and the lookup table, and no reader. A pack can fill that slot today and
   nothing will ever draw it.

   WHAT A PACK CAN ACTUALLY DO, which is this. MAPCOL is a real seam and drawIso merges it into
   ISOCOL (engine.js, grep `ISOCOL`) — so the tray can at least be its own colour there, and a DIFFERENT
   colour per state, which is enough for the decision to read in all four cameras even where the
   shape cannot. It is a colour where the other three cameras get an object, and that is the
   honest description of it. The same table also colours the map (engine.js, grep `ISOCOL` again, in the map painter), so this is not
   a hack bolted on for one camera. */
const MAPCOL={
  w:B.wall, h:B.brick, f:B.sack,
  p:B.dough,        /* pale: proved and plain */
  v:B.crust,        /* gold */
  c:B.choc          /* brown */
};

const TILEART={
  w:{top:hWallTop,side:hWallSide},
  h:{top:hOvenTop,side:hOvenSide,mesh:hOvenMesh},
  f:{top:hBinTop,side:hBinSide,mesh:hBinMesh},
  p:{top:hTrayTop("p"),side:hTraySide("p"),mesh:hTrayMesh("p")},
  v:{top:hTrayTop("v"),side:hTraySide("v"),mesh:hTrayMesh("v")},
  c:{top:hTrayTop("c"),side:hTraySide("c"),mesh:hTrayMesh("c")}
};
