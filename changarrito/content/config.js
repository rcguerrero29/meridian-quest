/* El Changarrito — a second world on the Meridian engine, for one player: the backlog as a
   street. docs/story/el-changarrito.md. This pack trains no role, carries no curriculum and
   awards no grade that means anything about the player (§7½). */
const GAMENAME="El Changarrito";
const GAMEV="ch-v26 · engine mq-v85";   /* the town's own version, and the engine it was built on */
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
const REFRESH_MS=0;
const SHOW_PERMITS=false;
/* the reader's look (ch-v15, engine mq-v77): "night" is the purple dark paper the owner liked in
   the mockup; leave it out for the cream one Meridian keeps. AJ picks either for a world. */
const READERLOOK="night";
