/* El Changarrito — a second world on the Meridian engine, for one player: the backlog as a
   street. docs/story/el-changarrito.md. This pack trains no role, carries no curriculum and
   awards no grade that means anything about the player (§7½). */
const GAMENAME="El Changarrito";
const GAMEV="ch-v24 · engine mq-v83";   /* the town's own version, and the engine it was built on */
const STOREPFX="ch";                     /* its own saves, never Meridian's (engine SK()) */
const CAMDEF="3d";
const MAXXP=10;
const LEVELS=[0,5,10];
const STAKES={mode:"none",hearts:3};
/* which of the town's worlds play which role (#25, engine mq-v71): the stall is home, the
   street is the street, the park is the park; dogs befriend people on the street only, since
   the town has no other rooms. The engine reads these instead of assuming Meridian's ids. */
const PLACES={home:"hq",spawn:[10,11],street:"st",park:"pk",parkIn:[2,6,"right"],parkDog:[3,6],parkDogHome:[8,6],
  parkAdopt:[[17,4],[19,4],[17,2],[19,2],[16,3],[20,3]],friends:["st"],upstairs:"f2"};
/* ch-v13 — the owner turned the clock off (2026-09-06: "ok turn it off"): the town reads when it
   opens, after every write, and when you press ↻ at la ventanilla's window. REFRESH_MS>0 brings
   the timer back; SHOW_PERMITS=true brings the open PRs back to her card. Nothing was deleted. */
const REFRESH_MS=0;
const SHOW_PERMITS=false;
/* the reader's look (ch-v15, engine mq-v77): "night" is the purple dark paper the owner liked in
   the mockup; leave it out for the cream one Meridian keeps. AJ picks either for a world. */
const READERLOOK="night";
