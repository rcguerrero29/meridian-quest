/* El Changarrito — the stall you wake up in, the one street, and the park.
   The engine hardcodes the office as "hq" with (10,11) walkable and the street as "st"
   (NEW-WORLD.md §3); the leash warps to "pk", so the park exists (§9.4). Frederick stands at
   (12,5) in any hq and the pigeon at (4,1) in any st — both tiles kept walkable.
   The street (§9.1): three storefront faces the engine already draws — Q for asks, Z for
   decisions, I for bugs — city hall (B) with la ventanilla's window, the stall's door E at
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
     "##########E#########"],
 st:["BBQQQQQBBBBBBBEBBBZZZZBBIIIIB2",
     ".........v....................",
     "..............................",
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
const PORTALS={hq:{"E":{to:"st",x:14,y:1,dir:"down"}},
               st:{"E":{to:"hq",x:10,y:12,dir:"up"},"2":{to:"pk",x:1,y:6,dir:"right"}},
               pk:{"2":{to:"st",x:28,y:1,dir:"down"}}};
/* who stands where by map letter: Don Güero at his stall; la ventanilla at her window on the
   street (her document is the city's record — content/record.js hands it to her at boot) */
const WNPC={hq:{g:{npc:"guero",q:[0]}},st:{v:{npc:"ventanilla",q:[],chat:1}},pk:{}};
/* the pack's own solid glyphs (the engine draws them; the pack says they are walls) */
const SOLIDX="~9ZI";
const DOORS="+E2";
const DOORLOOK={E:{wood:"#8A5A2B",wood2:"#A06A35",frame:"#4A2E14",glass:true},   /* the stall: warm wood */
                "2":{wood:"#4E7A4A",wood2:"#5F8F5A",frame:"#2C4A2A"}};          /* the park gate: green */
/* signs over the faces — the engine's own sign glyph, no art of the pack's */
const DECOR=[{world:"st",x:4,y:0,deco:"sign"},{world:"st",x:10,y:0,deco:"sign"},
             {world:"st",x:19,y:0,deco:"sign"},{world:"st",x:25,y:0,deco:"sign"}];
/* Sonny, as he is (§9.4): follows you, sit / lie / stay, the ball, the cone. Carries nothing. */
const CRITTERS=[
 {kind:"beagle",world:"st",x:22,y:11,c:"#E8C46A",name:"Sonny",egg:"sonny"}
];
