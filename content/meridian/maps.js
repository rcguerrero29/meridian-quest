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
 f2:["####################",
     "#..................#",
     "#..D..D....D..D....#",
     "#..................#",
     "#....RR......P.....#",
     "#....RR............#",
     "#..................#",
     "#.....X......X.....#",
     "#..................#",
     "#..P............D..#",
     "#..................#",
     "#.................1#",
     "#..................#",
     "####################"],
 st:["BBBBBBBBBBBBBBEBBBBBBBBBBBBBBB",
     "Y............................2",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈--≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "≈≈≈≈≈≈≈≈≈≈≈≈≈--≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
     "....C...b........b.......C....",
     "QQQQQQLQQQQQQ..FFFFFF.FFFFFFFF",
     "..............F..G....G...G..F",
     "....f.........F............e.F",
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
               pk:{"2":{to:"st",x:22,y:10,dir:"down"}}};
/* city growth: helping La Obra visibly advances the construction site */
const OBRA=[[],
 [[6,17,"#"],[6,22,"#"],[6,26,"#"],[8,16,"#"],[8,20,"#"],[8,25,"#"]],
 [[5,15,"B"],[5,16,"B"],[5,17,"B"],[5,18,"B"],[5,19,"B"],[5,20,"B"],[5,21,"O"],
  [5,22,"B"],[5,23,"B"],[5,24,"B"],[5,25,"B"],[5,26,"B"],[5,27,"B"],[5,28,"B"],[5,29,"B"],
  [6,14,"B"],[6,29,"B"],[7,14,"B"],[7,29,"B"],[8,14,"B"],[8,29,"B"],[8,21,"."],
  [9,14,"B"],[9,15,"B"],[9,16,"B"],[9,17,"B"],[9,18,"B"],[9,19,"B"],[9,20,"B"],[9,21,"B"],
  [9,22,"B"],[9,23,"B"],[9,24,"B"],[9,25,"B"],[9,26,"B"],[9,27,"B"],[9,28,"B"],[9,29,"B"]]];
/* El Mercado opens on the southwest lot when Week One closes — the facade replaces
   the barricades, the door (M) drops into the middle of the ribbon. */
const MERCADO=[[13,1,"Z"],[13,2,"Z"],[13,3,"Z"],[13,4,"Z"],[13,5,"Z"],[13,6,"M"],
               [13,7,"Z"],[13,8,"Z"],[13,9,"Z"],[13,10,"Z"],[13,11,"Z"]];
/* ---------- the content seam: what the engine draws, declared here ----------
   The engine hardcodes nothing about Meridian's buildings. A new business is a
   content edit: give it a door glyph, a mini-map colour, a label, and a dot.
   (The full per-glyph tile registry is queued with the graphics-prep refactor.) */
const DOORS="+ELOM";                       /* glyphs painted as a door */
const SOLIDX="ZSHI~9";                     /* solid glyphs this pack adds (~ water, 9 doghouse) */
const MAPCOL={Z:"#4E7A4A",S:"#8A6F4D",H:"#B0895B",I:"#A8825A",M:"#E0B45C","~":"#4A7FA8","9":"#8A6F4D"};
/* mini-map labels. `when` reads the city's flags: obra 0-2, mercado bool. */
const TOWNLBL=[
 {x:15,y:0.75,s:10,c:"#F2E8D8",en:"MERIDIAN HQ  (⇧ FLOOR 2)",es:"MERIDIAN HQ  (⇧ PISO 2)"},
 {x:6.5,y:5.75,s:10,c:"#F2E8D8",en:"LA COCINA",es:"LA COCINA"},
 {x:22,y:7.7,s:10,c:"#3A2F17",en:"🚧 SITE",es:"🚧 OBRA",when:f=>f.obra<2},
 {x:22,y:7.7,s:10,c:"#F2E8D8",en:"LA OBRA · STUDIO",es:"LA OBRA · ESTUDIO",when:f=>f.obra>=2},
 {x:6,y:13.7,s:9,c:"#6B5210",en:"LOT: EL MERCADO",es:"LOTE: EL MERCADO",when:f=>!f.mercado},
 {x:6,y:13.75,s:9,c:"#F2E8D8",en:"EL MERCADO ROBLES",es:"EL MERCADO ROBLES",when:f=>f.mercado},
 {x:25.5,y:13.7,s:9,c:"#6B5210",en:"RESERVED LOT",es:"LOTE RESERVADO"},
 {x:27,y:1.7,s:8,c:"#6B5210",en:"CALLE DOS →",es:"CALLE DOS →"},
 {x:0.5,y:1.8,s:8,c:"#6B5210",dx:3,en:"🚋",es:"🚋"}
];
/* "you are here" on the town plan, for worlds that are interiors of the street */
const MAPDOT={hq:[14,0],f2:[14,0],lc:[6,5],lo:[21,5],ex:[29,1],me:[6,13]};
/* ---------- trolley fast travel: the streets never dead-end, they connect ---------- */
const TRV=[{w:"st",x:1,y:1,dir:"right"},{w:"ex",x:22,y:3,dir:"left"}];
/* ambient critters: kinds live in the engine (butterfly, colibri, gato); spawns are
   content. Each wanders a small radius around home; the gato is pettable. */
const CRITTERS=[
 {kind:"butterfly",world:"st",x:6,y:12,c:"#E4A7D8"},
 {kind:"butterfly",world:"ex",x:10,y:0,c:"#8FC7E8"},
 {kind:"colibri",world:"st",x:16,y:4,c:"#3FA88F"},
 {kind:"gato",world:"ex",x:20,y:5,c:"#8B8F98"},
 {kind:"gato",world:"me",x:15,y:9,c:"#7A6A55"},  /* Frijol — the bodega cat, pettable */
 {kind:"beagle",world:"st",x:22,y:11,c:"#E8C46A",name:"Sonny",egg:"sonny"} /* the star himself */
];
/* one-off place identity as data (IDEAS §10): the engine's DECODRAW vocabulary
   (sign, mural) renders these in every camera, so no landmark ever squares off.
   Packs can add art via DECOART. */
const DECOR=[
 {world:"st",x:20,y:0,deco:"mural"}   /* Nacho's mural on the avenue wall */
];
