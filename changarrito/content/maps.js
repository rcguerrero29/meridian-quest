/* El Changarrito — the stall you wake up in, the one street, and the park.
   The roles are declared in config.js (PLACES, #25): the stall is home with (10,11) walkable,
   the street is "st", the leash warps to "pk", the loft "f2" is upstairs. Frederick stands at
   (12,5) in any hq and the pigeon at (4,1) in any st — both tiles kept walkable.
   The street (§9.1): three storefront faces the engine already draws — Q for asks, Z for
   decisions, I for bugs — city hall (B) with la ventanilla standing IN the facade row at her window — behind the counter, visible, talkable from the street (owner, 2026-09-06: "behind the window but visible"), the stall's door E at
   the top, the park's door 2 at the east end. Every door opens; the rest are faces. */
const WORLD_DEFS={
 hq:["####################",
     "#......#........#..#",
     "#.g..D.#.D....D.#..#",
     "#......+........+..#",
     "#....D.#........####",
     "#......#..RR...#...#",
     "####+###..RR...#...#",
     "#......#.......+...#",
     "#....K.+.......#####",
     "#......#.......#...#",
     "####+###...P...#...#",
     "#......#.......+...#",
     "#......+.......#####",
     "##########+⊓⊓⊓⊓#####",
     "#..........≡≡≡▲#####",
     "#..................#",
     "##########E#########"],
 /* the loft (#4, ch-v12): bare, the way Meridian's Floor 2 opened — the railed well over the
    flight, the way down at (10,14), the arrival at (14,14). Built here first so the owner walks
    the stair before it ships to Meridian. */
 f2:["####################",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#..........◺◺◺.....#",
     "#.........▼≡≡≡.....#",
     "#..........◺◺◺.....#",
     "####################"],
 st:["BBQQQQQBBvBBBBEBBBZZZZBBIIIIB2",
     "..............................",
     "...........c..................",
     ".g.........g..........g.......",
     "..............................",
     "..b.........P........b........",
     "..............................",
     ".......g..........g...........",
     "..............................",
     "..............................",
     "....P..........b........P.....",
     ".g..........g..........g......",
     "..............................",
     "..............................",
     "..b...........g.........b.....",
     "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"],
 pk:["FFF~~FFFFFFFFFFFFFFFFFFF",
     "F..~~...g....J.....b...F",
     "F..~~..................F",
     "F..~~....b....g...9....F",
     "F..~~..................F",
     "F..~~.....P......g.....F",
     "2..^^..................F",
     "F..~~....g....b........F",
     "F..~~..........g...J...F",
     "F..~~..J...............F",
     "F..~~......g.....b.....F",
     "FFF~~FFFFFFFFFFFFFFFFFFF"]
};
/* la caja de escalera (#4, Don Güero's candidate B, 2026-09-06): the stall grew three rows south —
   a lobby at the front door, a stair hall behind the door at (10,13), the flight east with its
   head ▲ at (14,14) the way up; the loft's ▼ at (10,14) the way down. Coming in from the street
   you land on the landing (10,14), floor behind you, not one step inside the door. */
const PORTALS={hq:{"E":{to:"st",x:14,y:1,dir:"down"},"▲":{to:"f2",x:14,y:14,dir:"left",mark:"up"}},
               f2:{"▼":{to:"hq",x:10,y:14,dir:"right"}},
               st:{"E":{to:"hq",x:10,y:14,dir:"up"},"2":{to:"pk",x:1,y:6,dir:"right"}},
               pk:{"2":{to:"st",x:28,y:1,dir:"down"}}};
/* who stands where by map letter: Don Güero at his stall; la ventanilla at her window on the
   street (her document is the city's record — content/record.js hands it to her at boot).
   `win:"B"` says she works INSIDE city hall's wall: the engine draws B's counter in front of
   her and B's roof over her (ch-v3 had her standing in a hole in the facade — owner,
   2026-09-06: "how did this pass a test for a teller?"). */
const WNPC={hq:{g:{npc:"guero",q:[],chat:1,doc:"guero"}},st:{v:{npc:"ventanilla",q:[],chat:1,win:"B"},c:{npc:"pregonero",q:[],chat:1,doc:"how",roams:true}},pk:{}};
/* the pack's own solid glyphs (the engine draws them; the pack says they are walls) */
const SOLIDX="~9ZI";
const DOORS="+E2";
const DOORLOOK={E:{wood:"#8A5A2B",wood2:"#A06A35",frame:"#4A2E14",glass:true},   /* the stall: warm wood */
                "2":{wood:"#4E7A4A",wood2:"#5F8F5A",frame:"#2C4A2A"}};          /* the park gate: green */
/* the signs over the faces are COUNTERS (ch-v17; owner: "the clocks... can we use them for
   something important like amount of issues?"): the record writes the number of open issues of
   that kind on each one — asks, decisions, bugs — and the total on city hall's. The boards beside
   them name the face, so a storefront says what it is for. `kind` is the record's hook. */
const DECOR=[{world:"st",x:4,y:0,deco:"sign",kind:"ask",c:"#2E5FA8"},{world:"st",x:10,y:0,deco:"sign",kind:"hall",c:"#7A3FE0"},
             {world:"st",x:19,y:0,deco:"sign",kind:"decision",c:"#B8860B"},{world:"st",x:25,y:0,deco:"sign",kind:"bug",c:"#C0392B"},
             {world:"st",x:3,y:0,deco:"board",text:"ASKS",c:"#2E5FA8"},{world:"st",x:20,y:0,deco:"board",text:"DECIDE",c:"#B8860B"},
             {world:"st",x:26,y:0,deco:"board",text:"BUGS",c:"#C0392B"}];
/* the pack's own decor art (engine seam DECOART): a board that names a face — a dark plank with
   the word painted on it, the colour of its kind */
const DECOART={board:(sx,sy,d)=>{ctx.fillStyle="#2A2420";ctx.fillRect(sx+1,sy+3,30,13);
  ctx.fillStyle=d.c||"#7A3FE0";ctx.fillRect(sx+1,sy+3,30,2);ctx.fillRect(sx+1,sy+14,30,2);
  ctx.strokeStyle="rgba(15,12,20,.5)";ctx.lineWidth=1;ctx.strokeRect(sx+1,sy+3,30,13);
  ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.textAlign="center";ctx.fillText(String(d.text||"").slice(0,8),sx+16,sy+12);ctx.textAlign="start";}};
/* the engine's own animals, where THIS town puts them (#38): Frederick at the stall, the pigeon
   on the street, Lorenzo in the tree at (12,5) — a perch, not thin air — and no bodega cat,
   because there is no bodega. */
const ANIMALS={dog:{world:"hq",x:12,y:5},cat:null,pig:{world:"st",x:4,y:1},loro:{world:"st",x:12,y:5}};
/* Sonny, as he is (§9.4): follows you, sit / lie / stay, the ball, the cone. Carries nothing. */
const CRITTERS=[
 {kind:"beagle",world:"st",x:22,y:11,c:"#E8C46A",name:"Sonny",egg:"sonny"}
];
