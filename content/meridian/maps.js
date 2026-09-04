/* Meridian Quest content pack — worlds, portals, construction stages, trolley stops. */
/* ---------- worlds (multi-map: HQ, Floor 2, Street) ---------- */
const WORLD_DEFS={
 hq:["####################",
     "#......#........#..#",
     "#.p..D.#.D....D.#c.#",
     "#......+........+..#",
     "#.j..D.#........####",
     "#......#..RR...#.1.#",
     "####+###..RR...#.l.#",
     "#......#.......+...#",
     "#.t.K..+...m...#####",
     "#......#.......#...#",
     "####+###...P...#.h.#",
     "#......#.......+...#",
     "#.a....+.......#####",
     "##########E#########"],
 /* Floor 2 opens BARE, as signed (STORY.md ❗La oficina, 2026-09-02): the old lead's
    desk alone under the north wall, the stairs, and nothing else — the barrio furnishes
    it one piece per business, and the two neighbours who ask what goes in it are placed
    by content/meridian/room.js, not by a letter here. The north window (three "|"
    panes over the desk, declared in art.js) looks north: the road out of the barrio
    and the line being laid — Nacho + Don Güero, 2026-09-02. */
 /* MID-MOVE since 2026-09-02 (owner: "for the move it should be mid"): four taped boxes
    (□, art.js), one of Don Güero's cones and a plant still in its pot. The arrival tile
    (17,11) and the sight line from the stairs to the window stay clear — Nacho's
    "nothing in the way" is an answer a player can pick, so it has to be true. */
 f2:["##▭#▭#▭##|||#▭#▭#▭##",
     "#.........D........#",
     "#.................P#",
     "#..................#",
     "#..................#",
     "#..............□...#",
     "#..................#",
     "#..................#",
     "#..................#",
     "#...............C..#",
     "#................□□#",
     "#.............□...1#",
     "#..................#",
     "####################"],
 st:["BBBBBBBBBBBBBBEBBBBBBBBBBBBBBB",
     "Y............................2",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈--≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈--≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "....C...b........b.......C....",
     "QQQQQQLQQQQQQ..FFFFFF.FFFFFFFF",
     "..............F..G....G...G..F",
     "..............F............e.F",
     "..............F.G...GX...G...F",
     "..............FFFFFFFFFFFFFFFF",
     "..............................",
     "....P....................P....",
     "........g............g........",
     "...XX....................XX...",
     "..J.........J.....J.......J...",
     "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"],
 ex:["...J.....J.....J....J...",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "2......................Y",
     "..FFFFFFFFF.FFFFFFFFF...",
     "..F..G...G....G...G..F..",
     "..F.w....A....x...z..F..",
     "..F.g.G....G....G....F..",
     "..FFFFFFFFFFFFFFFFFFF...",
     ".....g......J.....g.....",
     "FFFFFFFFFFFFFFFFFFFFFFFF"],
 lo:["####################",
     "#UU..UU..UU..UU..UU#",
     "#..................#",
     "#..A....A....A.....#",
     "#..................#",
     "#....RR....T.d.....#",
     "#..................#",
     "#..P..........P....#",
     "#..................#",
     "##########O#########"],
 /* El Mercado Robles — Doña Chelo's abarrotes. Shelves (S) and crates (H) line the
    walls, the counter (I) runs west, the carnicería sits mid-floor. Stations:
    n Nando · s Chelo · u Perla · v Chava. */
 me:["####################",
     "#..................#",
     "#.SS...SS....SS..S.#",
     "#..................#",
     "#..H...H....H...H..#",
     "#.....H......H.....#",
     "#...n.....s....u...#",
     "#..................#",
     "#.IIII...H...v..H..#",
     "#..................#",
     "#..P............P..#",
     "##########M#########"],
 lc:["####################",
     "#.P..............P.#",
     "#..................#",
     "#..T...T...T...T...#",
     "#..................#",
     "#....RR............#",
     "#..................#",
     "#KKKKKKK...KKKKKKK.#",
     "#WV................#",
     "#..r..........y....#",
     "#..................#",
     "##########L#########"],
 /* El Parque 🌈 — Sonny's park, reached only on the leash (no street door).
    A river (~) runs down the west side; the rainbow bridge (^) crosses it at the
    exit row. The doghouse (9) is where adoptions happen. This map is the preview
    of the pet-care spin-off (IDEAS §13) and its future starting map. */
 /* ---------- the four parcels (Don Güero, 2026-09-02) ---------- */
 /* Taller Herrera: three lifts with painted bays along the north, parts wall NE, Yesenia
    two steps inside the door with her counter, the office nook SW, a waiting corner SE. */
 ta:["####################",
     "#.............SSSS.#",
     "#i7i.i7i.i7i.......#",
     "#..................#",
     "#...t......m.....8.#",
     "#8.................#",
     "#..................#",
     "#S.................#",
     "#D........yKKK.RR..#",
     "#..............⊔⊔P.#",
     "#..................#",
     "##########%#########"],
 /* Panadería La Espiga: ovens NW, bread racks along the north, the proofing fridge NE,
    the counter west with Sol at its end, two café tables. */
 pa:["####################",
     "#▣▣.....S.S.S.S...W#",
     "#..................#",
     "#..l.........t.....#",
     "#..................#",
     "#KKKK..........T...#",
     "#....s.............#",
     "#..P.........T...P.#",
     "#..................#",
     "##########@#########"],
 /* Limpieza Velázquez: schedule boards on the north wall, two desks, supply shelves,
    supply boxes and a wet-floor cone, Chente on the floor with the crew. */
 li:["####################",
     "#UU.UU.......S.S.S.#",
     "#..................#",
     "#.D......D.........#",
     "#.k......v.........#",
     "#..................#",
     "#...........□□.C...#",
     "#.RR....c..........#",
     "#.P..............P.#",
     "##########*#########"],
 /* Nolasco Tax & Notario: a walkup. Cabinets and the licenciado's desk NW, a north
    window onto the same back lot as f2, Bere's intake counter SW, a waiting rug with two
    chairs, and the stairs in the SE corner — the way down. */
 no:["#######|########",
     "#▯▯.D....S.S...#",
     "#...n..........#",
     "#............P.#",
     "#..............#",
     "#KK......RR....#",
     "#Pe......⊔⊔..1.#",
     "################"],
 pk:["FFF~~FFFFFFFFFFFFFFFFFFF",
     "F..~~...g....J.....b...F",
     "F..~~..................F",
     "F..~~....b....g...9....F",
     "F..~~..................F",
     "F..~~.....P......g.....F",
     "2..^^..................F",
     "F..~~....g....b........F",
     "F..~~....3.4.5.g...J...F",
     "F..~~..J...............F",
     "F..~~......g.....b.....F",
     "FFF~~FFFFFFFFFFFFFFFFFFF"]
};
const PORTALS={hq:{"1":{to:"f2",x:17,y:11,dir:"left"},"E":{to:"st",x:14,y:1,dir:"down"}},
               f2:{"1":{to:"hq",x:16,y:5,dir:"left"}},
               st:{"E":{to:"hq",x:10,y:12,dir:"up"},"L":{to:"lc",x:10,y:10,dir:"up"},"O":{to:"lo",x:10,y:8,dir:"up"},"M":{to:"me",x:10,y:10,dir:"up"},"2":{to:"ex",x:1,y:3,dir:"right"}},
               ex:{"2":{to:"st",x:28,y:1,dir:"left"}},
               lc:{"L":{to:"st",x:6,y:4,dir:"up"}},
               lo:{"O":{to:"st",x:21,y:4,dir:"up"}},
               me:{"M":{to:"st",x:6,y:12,dir:"up"}},
               pk:{"2":{to:"st",x:22,y:10,dir:"down"}},
               /* the four parcels: each street door → its interior; each interior door → its doorstep */
               ta:{"%":{to:"st",x:23,y:12,dir:"up"}},
               pa:{"@":{to:"ex",x:6,y:1,dir:"down"}},
               li:{"*":{to:"ex",x:12,y:1,dir:"down"}},
               no:{"1":{to:"st",x:25,y:1,dir:"down"}}};
PORTALS.st["%"]={to:"ta",x:10,y:10,dir:"up"};
PORTALS.st["$"]={to:"no",x:12,y:6,dir:"left"};
PORTALS.ex["@"]={to:"pa",x:10,y:8,dir:"up"};
PORTALS.ex["*"]={to:"li",x:10,y:8,dir:"up"};
/* the four storefront ribbons — each rises when its district opens (GROWTH.ribbons) */
const TALLER=[[13,18,"="],[13,19,"="],[13,20,"="],[13,21,"="],[13,22,"="],[13,23,"%"],
              [13,24,"="],[13,25,"="],[13,26,"="],[13,27,"="],[13,28,"="],
              [14,19,"6"],[14,25,"0"]];                   /* the Caprice and the tire stack on the apron */
const ESPIGA=[[0,4,"&"],[0,5,"&"],[0,6,"@"],[0,7,"&"],[0,8,"&"],
              [1,4,"."],[1,5,"."],[1,6,"."],[1,7,"."],[1,8,"."]];   /* a sidewalk poured over the road */
const VELAZQUEZ=[[0,10,"!"],[0,11,"!"],[0,12,"*"],[0,13,"!"],[0,14,"!"],
                 [1,10,"."],[1,11,"."],[1,12,"."],[1,13,"."],[1,14,"."]];
const NOLASCO=[[0,25,"$"]];                                /* one door in the avenue wall; the climb is inside */
/* city growth: helping La Obra visibly advances the construction site */
const OBRA=[[],
 [[6,17,"#"],[6,22,"#"],[6,26,"#"],[8,16,"#"],[8,20,"#"],[8,25,"#"]],
 [[5,15,"B"],[5,16,"B"],[5,17,"B"],[5,18,"B"],[5,19,"B"],[5,20,"B"],[5,21,"O"],
  [5,22,"B"],[5,23,"B"],[5,24,"B"],[5,25,"B"],[5,26,"B"],[5,27,"B"],[5,28,"B"],[5,29,"B"],
  [6,14,"B"],[6,29,"B"],[7,14,"B"],[7,29,"B"],[8,14,"B"],[8,29,"B"],[8,21,"."],
  [9,14,"B"],[9,15,"B"],[9,16,"B"],[9,17,"B"],[9,18,"B"],[9,19,"B"],[9,20,"B"],[9,21,"B"],
  [9,22,"B"],[9,23,"B"],[9,24,"B"],[9,25,"B"],[9,26,"B"],[9,27,"B"],[9,28,"B"],[9,29,"B"]]];
/* El Mercado opens on the southwest lot once Week One's district has played its
   ending — the facade replaces the barricades, the door (M) drops into the middle of
   the ribbon. Opening the next district never closes this one: Week One's quests stay
   answerable forever (docs/OWNER.md — no practice is ever missed). */
const MERCADO=[[13,1,"Z"],[13,2,"Z"],[13,3,"Z"],[13,4,"Z"],[13,5,"Z"],[13,6,"M"],
               [13,7,"Z"],[13,8,"Z"],[13,9,"Z"],[13,10,"Z"],[13,11,"Z"]];
/* ---------- the content seam: what the engine draws, declared here ----------
   The engine hardcodes nothing about Meridian's buildings. A new business is a
   content edit: give it a door glyph, a mini-map colour, a label, and a dot.
   (The full per-glyph tile registry is queued with the graphics-prep refactor.) */
const DOORS="+ELOM%@*$";                       /* glyphs painted as a door */
/* DOORLOOK — what tells one door from another, by glyph. The engine draws one door
   body; this colours it for where it leads, so a shop entrance is not the same brown
   as an office door (the cold read, IDEAS §15.8, found all five pixel-identical).
   `glass` gives a door a window — shops have one, an interior door does not.
   A glyph not listed is the plain interior door. */
const DOORLOOK={E:{wood:"#4F5474",wood2:"#5F6588",frame:"#2E3147",glass:true}, /* Meridian HQ: the office's blue-grey */
                L:{wood:"#B5432F",wood2:"#C9553F",frame:"#6E2A1E",glass:true}, /* La Cocina: terracotta */
                O:{wood:"#C98A2D",wood2:"#E0A430",frame:"#6B4A17",glass:true}, /* La Obra · Studio: site yellow */
                M:{wood:"#4E7A4A",wood2:"#5F8F5A",frame:"#2C4A2A",glass:true}, /* El Mercado: stall green */
                "%":{wood:"#7C8590",wood2:"#8E98A3",frame:"#3A3F46"},           /* Taller: steel — TILEART draws the roll-up over it */
                "@":{wood:"#D9A441",wood2:"#E8B85A",frame:"#7A4E17",glass:true}, /* La Espiga: wheat */
                "*":{wood:"#3FA3A0",wood2:"#52B8B4",frame:"#1F5A58",glass:true}, /* Velázquez: teal */
                "$":{wood:"#6E2F4A",wood2:"#84405E",frame:"#3A1728",glass:true}}; /* Nolasco: burgundy, frosted */
const SOLIDX="ZSHI~9|□=6780&!▣▯⊔○▭▤▦▩▨";        /* solid glyphs this pack adds (~ water, 9 doghouse, | window, □ box, and the four parcels' tiles) */
const MAPCOL={"1":"#E0B45C","▭":"#6E6A80","▤":"#E8DFC4","▦":"#9E5442","▩":"#C9A77C","▨":"#BE9A72",  /* the legend says "doors & stairs in gold" and the plan painted them grey */
  Z:"#4E7A4A",S:"#8A6F4D",H:"#B0895B",I:"#A8825A",M:"#E0B45C","~":"#4A7FA8","9":"#8A6F4D",
              "|":"#6E638A",  /* window: shades to the wall-top colour, so 3D gives it no darker cap */
              "□":"#C8A277",  /* moving box: cardboard, paler than the produce crate so the map never confuses them */
              "=":"#6E6A73","%":"#E0B45C","6":"#7A2E2E","7":"#5A6470","8":"#B3352B","0":"#2E2E33",
              "&":"#D9A441","!":"#3FA3A0","▣":"#4A4F57","▯":"#7C8590","⊔":"#8A6F4D","○":"#7A5C8A"};
/* mini-map labels. `when` reads the city's flags: obra 0-2, mercado bool. */
const TOWNLBL=[
 {x:15,y:0.75,s:10,c:"#F2E8D8",en:"MERIDIAN HQ  (⇧ FLOOR 2)",es:"MERIDIAN HQ  (⇧ PISO 2)"},
 {x:6.5,y:5.75,s:10,c:"#F2E8D8",en:"LA COCINA",es:"LA COCINA"},
 {x:22,y:7.7,s:10,c:"#3A2F17",en:"🚧 SITE",es:"🚧 OBRA",when:f=>f.stage<2},
 {x:22,y:7.7,s:10,c:"#F2E8D8",en:"LA OBRA · STUDIO",es:"LA OBRA · ESTUDIO",when:f=>f.stage>=2},
 {x:6,y:13.7,s:9,c:"#6B5210",en:"LOT: EL MERCADO",es:"LOTE: EL MERCADO",when:f=>!(f.up&&f.up.me)},
 {x:6,y:13.75,s:9,c:"#F2E8D8",en:"EL MERCADO ROBLES",es:"EL MERCADO ROBLES",when:f=>f.up&&f.up.me},
 {x:25.5,y:13.7,s:9,c:"#6B5210",en:"RESERVED LOT",es:"LOTE RESERVADO",when:f=>!(f.up&&f.up.ta)},
 {x:23,y:13.75,s:9,c:"#F2E8D8",en:"TALLER HERRERA",es:"TALLER HERRERA",when:f=>f.up&&f.up.ta},
 {x:25.5,y:0.75,s:8,c:"#F2E8D8",en:"NOTARIO ⇧",es:"NOTARIO ⇧",when:f=>f.up&&f.up.no},
 {x:27,y:1.7,s:8,c:"#6B5210",en:"CALLE DOS →",es:"CALLE DOS →"},
 {x:0.5,y:1.8,s:8,c:"#6B5210",dx:3,en:"🚋",es:"🚋"}
];
/* "you are here" on the town plan, for worlds that are interiors of the street */
const MAPDOT={ta:[23,13],pa:[29,1],li:[29,1],no:[25,0],hq:[14,0],f2:[14,0],lc:[6,5],lo:[21,5],ex:[29,1],me:[6,13]};
/* ---------- trolley fast travel: the streets never dead-end, they connect ---------- */
/* Where the Trolley Pass can put you: STREET STOPS ONLY. A trolley does not stop on the
   second floor of a building — the office came off this list on 2026-09-03 ("i dont like that
   i go from a train to a floor. dont do that. i asked to make the world realistic"). You reach
   the office the way you would reach an office: through the front door and up the stairs. */
const TRV=[{w:"st",x:1,y:1,dir:"right"},{w:"ex",x:22,y:3,dir:"left"}];
/* ambient critters: kinds live in the engine (butterfly, colibri, gato); spawns are
   content. Each wanders a small radius around home; the gato is pettable. */
const CRITTERS=[
 {kind:"butterfly",world:"st",x:6,y:12,c:"#E4A7D8"},
 {kind:"butterfly",world:"ex",x:13,y:3,c:"#8FC7E8"},
 {kind:"colibri",world:"st",x:16,y:4,c:"#3FA88F"},
 {kind:"gato",world:"st",x:22,y:14,c:"#8B8F98",name:"Tuerca"}, /* the street cat picked the taller's lot before the shop did */
 {kind:"gato",world:"pa",x:2,y:3,c:"#E3C08A",name:"Bolillo"}, /* he lives in the flour bin */
 {kind:"gato",world:"li",x:16,y:7,c:"#F2F0EA",name:"Pelusa"}, /* she rides in the van */
 {kind:"gato",world:"no",x:2,y:2,c:"#3A3A40",name:"Timbre"} /* she sits where the doorbell would be */,
 {kind:"gato",world:"me",x:15,y:9,c:"#7A6A55"},  /* Frijol — the bodega cat, pettable */
 {kind:"beagle",world:"st",x:22,y:11,c:"#E8C46A",name:"Sonny",egg:"sonny"} /* the star himself */
];
/* one-off place identity as data (IDEAS §10): the engine's DECODRAW vocabulary
   (sign, mural) renders these in the top-down and front cameras ONLY — NOT in iso and NOT
   in 3D, which is the camera the game boots into. (Corrected 2026-09-03, la junta: this
   comment used to claim every camera, which is most likely why nobody noticed the mural
   was invisible where it is played. Adding the two missing passes is queued.)
   Packs can add art via DECOART. */
const DECOR=[
 {world:"st",x:20,y:0,deco:"mural"},   /* Nacho's own piece — the city's name, never earned */
 /* one panel per business, east of it along the same wall. Baby blue plaster until you begin
    that district; the colour brightens with the grade (art.js → DECOART.panel). */
 {world:"st",x:21,y:0,deco:"panel",id:"principal",c:"#7A5FE0"},
 {world:"st",x:22,y:0,deco:"panel",id:"mercado",  c:"#C0392B"},
 {world:"st",x:23,y:0,deco:"panel",id:"taller",   c:"#3B4650"},
 {world:"st",x:24,y:0,deco:"panel",id:"espiga",   c:"#C98A2D"},
 {world:"st",x:25,y:0,deco:"panel",id:"velazquez",c:"#2E8AA8"},
 {world:"st",x:26,y:0,deco:"panel",id:"nolasco",  c:"#4E7A4A"}
];
