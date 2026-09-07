/* El Changarrito — a second world on the Meridian engine, for one player: the backlog as a
   street. docs/story/el-changarrito.md. This pack trains no role, carries no curriculum and
   awards no grade that means anything about the player (§7½). */
const GAMENAME="El Changarrito";
const GAMEV="ch-v34 · engine mq-v94";   /* the town's own version, and the engine it was built on */
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
    art:{bridge:["#FFD166","#F7B733","#F59E1B","#F28C28","#E8731F","#D9601A"],bridgeStyle:"petals",
         papel:["#E8478F","#2FA5A0","#F2B705","#7B4BA8","#F07C24","#F6F2E8"],sky:"#E8A24A"}},
  /* NOCHE DE ALEBRIJES — the owner's second mode (2026-09-07: "another mode where they turn into
     little alebrije colors and i get a dia de los muertos face paint color"). No dates: picked by
     name in Settings → Season, never by the calendar. Carries the Muertos dressing, and adds
     `alebrije` (a palette every animal is striped in — an alebrije is a real animal in impossible
     colours) and `facepaint` (calavera paint on the hero: base, accent round the eyes, dark). */
  alebrije:{label:{en:"Noche de alebrijes",es:"Noche de alebrijes"},
    art:{bridge:["#FFD166","#F7B733","#F59E1B","#F28C28","#E8731F","#D9601A"],bridgeStyle:"petals",
         papel:["#E8478F","#2FA5A0","#F2B705","#7B4BA8","#F07C24","#F6F2E8"],sky:"#E8A24A",
         alebrije:["#FF3D7F","#00C2D1","#FFD400","#8A2BE2","#39FF14","#FF6A00"],
         facepaint:{base:"#F4F1EA",accent:"#F28C28",dark:"#2B2536"}}}
};
const REFRESH_MS=0;
const SHOW_PERMITS=false;
/* the reader's look (ch-v15, engine mq-v77): "night" is the purple dark paper the owner liked in
   the mockup; leave it out for the cream one Meridian keeps. AJ picks either for a world. */
const READERLOOK="night";
