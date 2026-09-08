/* El Changarrito — the stall you wake up in, the one street, and the park.
   The roles are declared in config.js (PLACES, #25): the stall is home with (10,11) walkable,
   the street is "st", the leash warps to "pk", the loft "f2" is upstairs. Frederick stands at
   (12,5) in any hq and the pigeon at (4,1) in any st — both tiles kept walkable.
   The street (§9.1, then #69 ch-v23 — la primera cuadra, Don Güero's first block): a boulevard with
   two ranks of frontage. The north rank keeps city hall (B) with la ventanilla IN the facade row
   at her window (behind the counter, visible, talkable from the street), the stall's door E and
   the park's door 2, and gains three houses; a middle block at row 8 holds three more. Six houses,
   one per kind of work, each with a door that opens, a clerk inside and a board beside the door
   that says the work in plain words (the owner: "put a human friendly label as to what type of
   issue or work is being done... for buildings too"). Faces: Q, Z (the engine's) and I (the
   town's own, art.js — the engine's I is a grocery counter; Don Güero's find). The hoarding at
   x0–1 is block two's gate, reserved. */
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
     "#.........◺◺◺◺.....#",
     "#........◺▼≡≡≡.....#",
     "#.........◺◺◺◺.....#",
     "####################"],
 st:["BBQQ$QQBBvBBBBEBZZZOZZIII%IIB2",
     "..............................",
     "...........c..................",
     ".g.........g..........g.......",
     "..............................",
     "..b.........P........b........",
     "..............................",
     ".......g..........g...........",
     "...QQQ@QQQQZZZMZZZZIIILIIII...",
     "..............................",
     "....P..........b........P.....",
     ".g..........g..........g......",
     "..............................",
     "..............................",
     "..b...........g.........b.....",
     "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"],
 /* the six houses (#69): Meridian's shells, COPIED — never imported — and cleaned to the engine's
    own tiles. Each has its door in the south wall, the clerk's counter, and the house's board on
    the wall just west of the door (READS in docs.js). an El Anexo de la Ventanilla (records &
    forms) · pp La Papelería (docs & templates) · es El Estudio de Pili (how it looks) · mo El Motor
    (the engine) · ob La Obra (rooms & stairs) · co La Cocina de Meridian (Meridian's story). */
 an:["################",
     "#DD.D....K.K...#",
     "#..............#",
     "#.........r..P.#",
     "#..............#",
     "#KK......RR....#",
     "#P.......RR....#",
     "########$#######"],
 pp:["####################",
     "#KK.....S.S.S.S...W#",
     "#..................#",
     "#..c...............#",
     "#..................#",
     "#KKKK..........T...#",
     "#..................#",
     "#..P.........T...P.#",
     "#..................#",
     "##########@#########"],
 es:["####################",
     "#..................#",
     "#.SS...SS....SS..S.#",
     "#..................#",
     "#..H...H....H...H..#",
     "#.....H......H.....#",
     "#...p..............#",
     "#..................#",
     "#.KKKK...A...A..A..#",
     "#..................#",
     "#..P............P..#",
     "##########M#########"],
 mo:["####################",
     "#.............SSSS.#",
     "#VV..VV..VV........#",
     "#..................#",
     "#...b......W.....X.#",
     "#X.................#",
     "#..................#",
     "#S.................#",
     "#D........KKKK.RR..#",
     "#...............P..#",
     "#..................#",
     "##########%#########"],
 ob:["####################",
     "#UU..UU..UU..UU..UU#",
     "#..................#",
     "#..A....A....A.....#",
     "#..................#",
     "#....RR....T.k.....#",
     "#..................#",
     "#..P..........P....#",
     "#..................#",
     "##########O#########"],
 co:["####################",
     "#.P..............P.#",
     "#..................#",
     "#..T...T...T...T...#",
     "#..................#",
     "#....RR............#",
     "#..................#",
     "#KKKKKKK...KKKKKKK.#",
     "#WV.......n........#",
     "#..................#",
     "#..................#",
     "##########L#########"],
 pk:["FFF~~FFFFFFFFFFFFFFFFFFF",
     "F..~~...g....J.....b...F",
     "F..~~..................F",
     "F..~~....b....g...9....F",
     "F..~~..................F",
     "F..^^.....P......g.....F",
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
   you land on the landing (10,14), floor behind you, not one step inside the door. The loft's
   well (#62) is a hole in the floor with the steps sunk in it, railed on three sides — north,
   south and at its head — so the only way in is off the arrival tile (14,14) at the top. */
const PORTALS={hq:{"E":{to:"st",x:14,y:1,dir:"down"},"▲":{to:"f2",x:14,y:14,dir:"left",mark:"up"}},
               f2:{"▼":{to:"hq",x:10,y:14,dir:"right"}},
               st:{"E":{to:"hq",x:10,y:14,dir:"up"},"2":{to:"pk",x:1,y:6,dir:"right"},
                   /* the six houses (#69): each street door → inside, just in from its own door */
                   "$":{to:"an",x:8,y:6,dir:"up"},"O":{to:"ob",x:10,y:8,dir:"up"},"%":{to:"mo",x:10,y:10,dir:"up"},
                   "@":{to:"pp",x:10,y:8,dir:"up"},"M":{to:"es",x:10,y:10,dir:"up"},"L":{to:"co",x:10,y:10,dir:"up"}},
               /* and each house door → the doorstep in front of its own street door, back turned to it */
               an:{"$":{to:"st",x:4,y:1,dir:"down"}},ob:{"O":{to:"st",x:19,y:1,dir:"down"}},mo:{"%":{to:"st",x:25,y:1,dir:"down"}},
               pp:{"@":{to:"st",x:6,y:7,dir:"up"}},es:{"M":{to:"st",x:14,y:7,dir:"up"}},co:{"L":{to:"st",x:22,y:7,dir:"up"}},
               pk:{"2":{to:"st",x:28,y:1,dir:"down"}}};
/* "you are here" on the town plan, for the rooms off the street */
const MAPDOT={hq:[14,0],f2:[14,0],pk:[29,0],an:[4,0],ob:[19,0],mo:[25,0],pp:[6,8],es:[14,8],co:[22,8]};
/* who stands where by map letter: Don Güero at his stall; la ventanilla at her window on the
   street (her document is the city's record — content/record.js hands it to her at boot).
   `win:"B"` says she works INSIDE city hall's wall: the engine draws B's counter in front of
   her and B's roof over her (ch-v3 had her standing in a hole in the facade — owner,
   2026-09-06: "how did this pass a test for a teller?"). */
const WNPC={hq:{g:{npc:"guero",q:[],chat:1,doc:"guero"}},st:{v:{npc:"ventanilla",q:[],chat:1,win:"B"},c:{npc:"pregonero",q:[],chat:1,doc:"how",roams:true}},
  /* the six clerks (#69): each behind their counter, still, carrying their house's document */
  an:{r:{npc:"remedios",q:[],chat:1,doc:"h_an"}},pp:{c:{npc:"chuy",q:[],chat:1,doc:"h_pp"}},es:{p:{npc:"pili",q:[],chat:1,doc:"h_es"}},
  mo:{b:{npc:"beto",q:[],chat:1,doc:"h_mo"}},ob:{k:{npc:"cuca",q:[],chat:1,doc:"h_ob"}},co:{n:{npc:"nacho",q:[],chat:1,doc:"h_co"}},pk:{}};
/* the pack's own solid glyphs (the engine draws them; the pack says they are walls) */
const SOLIDX="~9ZISH";                   /* S shelves and H racks stand in the houses */
const DOORS="+E2$O%@ML";
const DOORLOOK={E:{wood:"#8A5A2B",wood2:"#A06A35",frame:"#4A2E14",glass:true},   /* the stall: warm wood */
                "2":{wood:"#4E7A4A",wood2:"#5F8F5A",frame:"#2C4A2A"},           /* the park gate: green */
                "$":{wood:"#6E2F4A",wood2:"#84405E",frame:"#3A1728",glass:true}, /* El Anexo: burgundy, frosted (Meridian's notario colour) */
                "O":{wood:"#C98A2D",wood2:"#E0A430",frame:"#6B4A17",glass:true}, /* La Obra: site yellow */
                "%":{wood:"#7C8590",wood2:"#8E98A3",frame:"#3A3F46"},           /* El Motor: steel */
                "@":{wood:"#D9A441",wood2:"#E8B85A",frame:"#7A4E17",glass:true}, /* La Papelería: wheat */
                "M":{wood:"#3F7A8A",wood2:"#529AAC",frame:"#1F4650",glass:true}, /* El Estudio de Pili: her teal */
                "L":{wood:"#B5432F",wood2:"#C9553F",frame:"#6E2A1E",glass:true}}; /* La Cocina de Meridian: terracotta */
/* the signs over the faces are COUNTERS (ch-v17; owner: "the clocks... can we use them for
   something important like amount of issues?"): the record writes the number of open issues of
   that kind on each one — asks, decisions, bugs — and the total on city hall's. The boards beside
   them name the face, so a storefront says what it is for. `kind` is the record's hook. */
const DECOR=[{world:"st",x:10,y:0,deco:"sign",kind:"hall",c:"#7A3FE0"},
             /* ch-v24: the hoarding at x0–1 is block two's gate — its sign counts who waits with no address, its board says so */
             {world:"st",x:1,y:0,deco:"sign",kind:"next",c:"#B8860B"},{world:"st",x:0,y:0,deco:"board",house:"next",text:"BLOCK 2\nSOON",c:"#B8860B"},
             /* #69: every sign hangs over its door and counts its house; every board hangs beside the door and
                says the work in plain words, two lines (the owner's human-friendly label, on the building too) */
             {world:"st",x:4,y:0,deco:"sign",kind:"an",c:"#6E2F4A"},{world:"st",x:3,y:0,deco:"board",house:"an",text:"RECORDS\n& FORMS",c:"#6E2F4A"},
             {world:"st",x:19,y:0,deco:"sign",kind:"ob",c:"#C98A2D"},{world:"st",x:20,y:0,deco:"board",house:"ob",text:"ROOMS &\nSTAIRS",c:"#C98A2D"},
             {world:"st",x:25,y:0,deco:"sign",kind:"mo",c:"#7C8590"},{world:"st",x:26,y:0,deco:"board",house:"mo",text:"THE\nENGINE",c:"#7C8590"},
             {world:"st",x:6,y:8,deco:"sign",kind:"pp",c:"#D9A441"},{world:"st",x:5,y:8,deco:"board",house:"pp",text:"DOCS &\nTEMPLATE",c:"#D9A441"},
             {world:"st",x:14,y:8,deco:"sign",kind:"es",c:"#3F7A8A"},{world:"st",x:13,y:8,deco:"board",house:"es",text:"HOW IT\nLOOKS",c:"#3F7A8A"},
             {world:"st",x:22,y:8,deco:"sign",kind:"co",c:"#B5432F"},{world:"st",x:21,y:8,deco:"board",house:"co",text:"MERIDIAN\nSTORY",c:"#B5432F"}];
/* the pack's own decor art (engine seam DECOART): a board that names a house — a dark plank with
   the work painted on it in one or two lines, the colour of its door */
const DECOART={board:(sx,sy,d)=>{ctx.fillStyle="#2A2420";ctx.fillRect(sx+1,sy+2,30,15);
  ctx.fillStyle=d.c||"#7A3FE0";ctx.fillRect(sx+1,sy+2,30,1.5);ctx.fillRect(sx+1,sy+15.5,30,1.5);
  ctx.strokeStyle="rgba(15,12,20,.5)";ctx.lineWidth=1;ctx.strokeRect(sx+1,sy+2,30,15);
  /* Two lines used to be painted at 5.5 units, which lands around five CSS pixels on a phone in
     every camera — below the size at which letters stop being letters. A board that cannot be read
     is not a board, it is texture pretending to be one. Both lines are 7 now, the floor for any
     in-scene text meant to be read (SCENE_MIN in the engine), and the plank is a little taller so
     they still fit. Eight characters was already the cut; that has not changed. */
  const L=String(d.text||"").split("\n").slice(0,2);ctx.fillStyle="#F2E8D8";ctx.textAlign="center";
  if(L.length===1){ctx.font="700 7px monospace";ctx.fillText(L[0].slice(0,8),sx+16,sy+12);}
  else{ctx.font="700 7px monospace";ctx.fillText(L[0].slice(0,8),sx+16,sy+8);ctx.fillText(L[1].slice(0,8),sx+16,sy+15.5);}
  ctx.textAlign="start";}};
/* the engine's own animals, where THIS town puts them (#38): Frederick at the stall, the pigeon
   on the street, Lorenzo in the tree at (12,5) — a perch, not thin air — and no bodega cat,
   because there is no bodega. */
const ANIMALS={dog:{world:"hq",x:12,y:5},cat:null,pig:{world:"st",x:4,y:1},loro:{world:"st",x:12,y:5}};
/* Sonny, as he is (§9.4): follows you, sit / lie / stay, the ball, the cone. Carries nothing. */
const CRITTERS=[
 {kind:"beagle",world:"st",x:22,y:11,c:"#E8C46A",name:"Sonny",egg:"sonny"}
];
