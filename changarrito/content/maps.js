/* El Changarrito — two rooms: a small office you wake up in, and the one street. The engine
   hardcodes the office as "hq" with (10,11) walkable and the street as "st" (NEW-WORLD.md §3);
   the names on screen are the pack's, the ids are the engine's. Frederick stands at (12,5) in
   any hq and the pigeon at (4,1) in any st — both tiles are kept walkable so the engine's
   animals have somewhere to be instead of somewhere to crash. */
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
 st:["BBBBBBBBBBBBBBEBBBBBBBBBBBBBBB",
     "..............................",
     "..............................",
     ".P..........................P.",
     "..............................",
     "..............................",
     "..............................",
     "..............................",
     "..............................",
     "..............................",
     "..............................",
     "..............................",
     ".P..........................P.",
     "..............................",
     "..............................",
     "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"]
};
const PORTALS={hq:{"E":{to:"st",x:14,y:1,dir:"down"}},
               st:{"E":{to:"hq",x:10,y:12,dir:"up"}}};
/* who stands where by map letter: only Don Güero, at his stall by the window */
const WNPC={hq:{g:{npc:"guero",q:[0]}},st:{}};
