/* El Changarrito — a second world on the Meridian engine, for one player: the backlog as a
   street. docs/story/el-changarrito.md. This pack trains no role, carries no curriculum and
   awards no grade that means anything about the player (§7½). */
const GAMENAME="El Changarrito";
/* The town never ends. Nacho: "a place you inhabit has no Saturday" — and the owner agreed. Before
   this, the town declared no CHAPTERS, so the engine synthesised one district holding its single
   quest, and answering Don Güero ran Meridian's last-day epilogue: Doña Chelo counting the drawer
   at El Mercado Robles, in a town with no mercado and no Chelo. There is no ending panel here now,
   no title to claim and no reward — the street is as long tomorrow as it was this morning. */
const ENDLESS=true;
const GAMEV="ch-v69 · engine mq-v127";   /* the town's own version, and the engine it was built on */
const STOREPFX="ch";                     /* its own saves, never Meridian's (engine SK()) */
const CAMDEF="3d";
const MAXXP=10;
const LEVELS=[0,5,10];
const STAKES={mode:"none",hearts:3};
/* Which of the town's worlds play which ROLE for the engine (#25, the PLACES seam, engine mq-v71).
   The engine never assumes a room name; it asks this table. The stall is home, the street is the
   street, the park is the park; dogs befriend people on the street only, since the town's other
   rooms are the six houses of block one. Meridian's copy is content/meridian/config.js; the
   template is docs/NEW-WORLD.md §3. test/engine.smoke.js fails the build if a role names a room
   that does not exist or a tile you cannot stand on. */
const PLACES={
  home:"hq",                 /* the stall: a new game and a broken save land here */
  spawn:[10,11],             /* the tile in the stall you land on — walkable */
  street:"st",               /* the boulevard: the 📍 dot follows you here */
  park:"pk",                 /* Sonny's park, the leash's end */
  parkIn:[2,6,"right"],      /* where you arrive in the park, facing east */
  parkDog:[3,6],             /* where the dog you brought stands on arrival */
  parkDogHome:[8,6],         /* where that dog drifts back to */
  parkAdopt:[[17,4],[19,4],[17,2],[19,2],[16,3],[20,3]], /* free spots an adopted dog may take, in order */
  friends:["st"],            /* only the street: the houses' clerks are records, not friends */
  upstairs:"f2"              /* the loft the map marks ⇧ */
};
/* ch-v13 — the owner turned the clock off (2026-09-06: "ok turn it off"): the town reads when it
   opens, after every write, and when you press ↻ at la ventanilla's window. REFRESH_MS>0 brings
   the timer back; SHOW_PERMITS=true brings the open PRs back to her card. Nothing was deleted. */
/* The town keeps Meridian's Día de Muertos season for Sonny's park, so the owner can walk the
   marigold bridge here first (Settings → Season, by name). Same keys as Meridian's config. */
const SEASONS={
  muertos:{label:{en:"Día de Muertos",es:"Día de Muertos"},from:[10,18],to:[11,3],
    art:{bridge:["#7A2E12","#B8410E","#E2620F","#F2870F","#FBB024","#FFD972"],bridgeStyle:"petals",
         papel:["#E8478F","#2FA5A0","#F2B705","#7B4BA8","#F07C24","#F6F2E8","#7BD3F7","#C5E86C","#FF4D4D","#3D5AFE"],papelBridge:["#FBB024","#F2870F","#E2620F","#F6F2E8"],
         /* the dressing, placed on the TOWN's own maps (owner, 2026-09-08: "we should have in both and template") — the same
            keys Meridian reads: swags by place (five to nine tiles, a gap between), the piñata over open ground, calaveritas
            on window sills (sill:true — the facade's own window says where), the ofrenda at the foot of the bridge and on a
            table, every planter blooming. The bridge is the park's. */
         swags:[{world:"st",from:[0,1],to:[8,1]},{world:"st",from:[9,1],to:[19,1]},{world:"st",from:[20,1],to:[29,1]},   /* under the north rank of faces */
                {world:"st",from:[3,9],to:[13,9]},{world:"st",from:[15,9],to:[26,9]},{world:"st",from:[2,13],to:[9,13]},{world:"st",from:[20,13],to:[27,13]},
                {world:"pk",from:[13,1],to:[19,1]},{world:"pk",from:[7,9],to:[13,9]},{world:"pk",from:[6,4],to:[13,4]},   /* tree to tree, and across the path from the bridge */
                {world:"hq",from:[0,1],to:[7,1]},{world:"hq",from:[8,1],to:[16,1]},{world:"f2",from:[0,1],to:[9,1]},{world:"f2",from:[10,1],to:[19,1]},
                {world:"an",from:[0,1],to:[7,1]},{world:"an",from:[8,1],to:[15,1]},{world:"pp",from:[0,1],to:[9,1]},{world:"pp",from:[10,1],to:[19,1]},
                {world:"es",from:[0,1],to:[9,1]},{world:"es",from:[10,1],to:[19,1]},{world:"mo",from:[0,1],to:[9,1]},{world:"mo",from:[10,1],to:[19,1]},
                {world:"ob",from:[0,1],to:[9,1]},{world:"ob",from:[10,1],to:[19,1]},{world:"co",from:[0,1],to:[9,1]},{world:"co",from:[10,1],to:[19,1]}],
         hangs:[{world:"st",x:12,y:2,kind:"pinata"}],
         props:[{world:"st",x:0,y:0,kind:"calaverita",sill:true},{world:"st",x:7,y:0,kind:"calaverita",sill:true,foil:"#2FA5A0"},{world:"st",x:11,y:0,kind:"calaverita",sill:true,foil:"#7B4BA8"},
                {world:"st",x:16,y:0,kind:"calaverita",sill:true,foil:"#F2B705"},{world:"st",x:22,y:0,kind:"calaverita",sill:true},{world:"st",x:27,y:0,kind:"calaverita",sill:true,foil:"#2FA5A0"},
                {world:"st",x:4,y:8,kind:"calaverita",sill:true,foil:"#7B4BA8"},{world:"st",x:12,y:8,kind:"calaverita",sill:true},{world:"st",x:20,y:8,kind:"calaverita",sill:true,foil:"#F2B705"},
                {world:"pk",x:6,y:2,kind:"ofrenda"} /* open ground at the top of the bridge's section — under no string (owner, 2026-09-08: "overlapping the papel picado and looks weird") */,{world:"co",x:3,y:3,kind:"ofrenda"}],
         bloom:"#F59E1B",facepaint:true, /* the calavera in Día de Muertos too (owner, 2026-09-07, night) — the engine's five looks */
         sky:"#E8A24A"}},
  /* NOCHE DE ALEBRIJES — the owner's second mode (2026-09-07: "another mode where they turn into
     little alebrije colors and i get a dia de los muertos face paint color"). No dates: picked by
     name in Settings → Season, never by the calendar. Carries the Muertos dressing, and adds
     `alebrije` (five looks every animal is tinted and marked in, keeping its silhouette — an
     alebrije is a real animal in impossible colours; the wingless get tiny wings) and `facepaint`
     (five calavera looks for everyone; the hero picks, a person's comes from who they are). */
  alebrije:{label:{en:"Noche de alebrijes",es:"Noche de alebrijes"},
    art:{bridge:["#7A2E12","#B8410E","#E2620F","#F2870F","#FBB024","#FFD972"],bridgeStyle:"petals",
         papel:["#E8478F","#2FA5A0","#F2B705","#7B4BA8","#F07C24","#F6F2E8","#7BD3F7","#C5E86C","#FF4D4D","#3D5AFE"],papelBridge:["#FBB024","#F2870F","#E2620F","#F6F2E8"],
         /* the dressing, placed on the TOWN's own maps (owner, 2026-09-08: "we should have in both and template") — the same
            keys Meridian reads: swags by place (five to nine tiles, a gap between), the piñata over open ground, calaveritas
            on window sills (sill:true — the facade's own window says where), the ofrenda at the foot of the bridge and on a
            table, every planter blooming. The bridge is the park's. */
         swags:[{world:"st",from:[0,1],to:[8,1]},{world:"st",from:[9,1],to:[19,1]},{world:"st",from:[20,1],to:[29,1]},   /* under the north rank of faces */
                {world:"st",from:[3,9],to:[13,9]},{world:"st",from:[15,9],to:[26,9]},{world:"st",from:[2,13],to:[9,13]},{world:"st",from:[20,13],to:[27,13]},
                {world:"pk",from:[13,1],to:[19,1]},{world:"pk",from:[7,9],to:[13,9]},{world:"pk",from:[6,4],to:[13,4]},   /* tree to tree, and across the path from the bridge */
                {world:"hq",from:[0,1],to:[7,1]},{world:"hq",from:[8,1],to:[16,1]},{world:"f2",from:[0,1],to:[9,1]},{world:"f2",from:[10,1],to:[19,1]},
                {world:"an",from:[0,1],to:[7,1]},{world:"an",from:[8,1],to:[15,1]},{world:"pp",from:[0,1],to:[9,1]},{world:"pp",from:[10,1],to:[19,1]},
                {world:"es",from:[0,1],to:[9,1]},{world:"es",from:[10,1],to:[19,1]},{world:"mo",from:[0,1],to:[9,1]},{world:"mo",from:[10,1],to:[19,1]},
                {world:"ob",from:[0,1],to:[9,1]},{world:"ob",from:[10,1],to:[19,1]},{world:"co",from:[0,1],to:[9,1]},{world:"co",from:[10,1],to:[19,1]}],
         hangs:[{world:"st",x:12,y:2,kind:"pinata"}],
         props:[{world:"st",x:0,y:0,kind:"calaverita",sill:true},{world:"st",x:7,y:0,kind:"calaverita",sill:true,foil:"#2FA5A0"},{world:"st",x:11,y:0,kind:"calaverita",sill:true,foil:"#7B4BA8"},
                {world:"st",x:16,y:0,kind:"calaverita",sill:true,foil:"#F2B705"},{world:"st",x:22,y:0,kind:"calaverita",sill:true},{world:"st",x:27,y:0,kind:"calaverita",sill:true,foil:"#2FA5A0"},
                {world:"st",x:4,y:8,kind:"calaverita",sill:true,foil:"#7B4BA8"},{world:"st",x:12,y:8,kind:"calaverita",sill:true},{world:"st",x:20,y:8,kind:"calaverita",sill:true,foil:"#F2B705"},
                {world:"pk",x:6,y:2,kind:"ofrenda"} /* open ground at the top of the bridge's section — under no string (owner, 2026-09-08: "overlapping the papel picado and looks weird") */,{world:"co",x:3,y:3,kind:"ofrenda"}],
         bloom:"#F59E1B",sky:"#E8A24A",
         alebrije:{looks:[ /* Pili's five, the same five on every animal so the night reads as one; wings on the wingless */
           {id:"fuego",name:{en:"Ember",es:"Fuego"},tint:"#FF6A00",pat:"#FFC300",accent:"#FF2E88",wings:true},
           {id:"cielo",name:{en:"Sky",es:"Cielo"},tint:"#00D9E8",pat:"#FFE9F2",accent:"#8A3FE8",wings:true},
           {id:"selva",name:{en:"Jungle",es:"Selva"},tint:"#7CFF3D",pat:"#12B39B",accent:"#FFC300",wings:false},
           {id:"cempasuchil",name:{en:"Marigold",es:"Cempasúchil"},tint:"#FFC300",pat:"#FF6A00",accent:"#FF2E88",wings:false},
           {id:"medianoche",name:{en:"Midnight",es:"Medianoche"},tint:"#8A3FE8",pat:"#FF2E88",accent:"#00D9E8",wings:true}]},
         facepaint:{looks:[ /* five calavera looks for everyone. Every one keeps what makes a face read as a
           skull at twelve pixels: a light base, black sockets, the nose, the stitched grin (a review of Día de
           Muertos makeup, 2026-09-07: white bone + black voids IS the symbol; a dark base reads as a mask —
           owner: "having one with all dark is a bit of a no no"). The looks differ in the first thing the eye
           catches: black outlines only · marigold petal rings · a purple tear and red lips · teal rings and
           dots · a red heart nose and a web on the brow. */
           {id:"clasica",name:{en:"Calaca clásica",es:"Calaca clásica"},base:"#F4F1EA",ring:"#2B2536",dark:"#2B2536",brow:"dots",mark:"#2B2536"},
           {id:"cempasuchil",name:{en:"Cempasúchil",es:"Cempasúchil"},base:"#FFF3D6",ring:"#FF6A00",dark:"#3A1F12",petals:true,brow:"dots",mark:"#FFC300"},
           {id:"catrina",name:{en:"Catrina",es:"Catrina"},base:"#F6F2E8",ring:"#1B1230",dark:"#1B1230",tall:true,brow:"tear",mark:"#8A3FE8",lip:"#C8102E"},
           {id:"turquesa",name:{en:"Turquesa",es:"Turquesa"},base:"#EAF7F5",ring:"#00B8C4",dark:"#12324A",brow:"dots",mark:"#00B8C4",chin:"#00B8C4"},
           {id:"corazon",name:{en:"Corazón",es:"Corazón"},base:"#FBEFEA",ring:"#D9342B",dark:"#2B2536",nose:"heart",mark:"#D9342B",brow:"web"}]}}}
};
const REFRESH_MS=0;
const SHOW_PERMITS=false;
/* the reader's look (ch-v15, engine mq-v77): "night" is the purple dark paper the owner liked in
   the mockup; leave it out for the cream one Meridian keeps. AJ picks either for a world. */
const READERLOOK="night";
