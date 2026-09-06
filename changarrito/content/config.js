/* El Changarrito — a second world on the Meridian engine, for one player: the backlog as a
   street. docs/story/el-changarrito.md. This pack trains no role, carries no curriculum and
   awards no grade that means anything about the player (§7½). */
const GAMENAME="El Changarrito";
const GAMEV="ch-v10 · engine mq-v73";   /* the town's own version, and the engine it was built on */
const STOREPFX="ch";                     /* its own saves, never Meridian's (engine SK()) */
const CAMDEF="3d";
const MAXXP=10;
const LEVELS=[0,5,10];
const STAKES={mode:"none",hearts:3};
/* which of the town's worlds play which role (#25, engine mq-v71): the stall is home, the
   street is the street, the park is the park; dogs befriend people on the street only, since
   the town has no other rooms. The engine reads these instead of assuming Meridian's ids. */
const PLACES={home:"hq",spawn:[10,11],street:"st",park:"pk",parkIn:[2,6,"right"],parkDog:[3,6],parkDogHome:[8,6],
  parkAdopt:[[17,4],[19,4],[17,2],[19,2],[16,3],[20,3]],friends:["st"],upstairs:""};
