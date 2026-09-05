/* El Changarrito — one quest, so the engine has a first thing to say. It teaches nothing
   about AI on purpose (el-changarrito.md §7½): this town is tooling, not practice. */
const FQEN={npc:"fred",title:"🐾 Frederick's files",start:"a",nodes:{
 a:{say:"Frederick drops a folder at your feet. It is empty. He looks proud anyway.",
    q:"What do you do with an empty folder?",
    ch:[{t:"Keep it for the first permit",out:{r:"ok",concept:"A place for things",why:"Every record starts empty. The folder is the promise.",beat:"He wags."}}]}}};
const QEN=[
 {npc:"guero",title:"The first permit",start:"a",nodes:{
  a:{say:"Welcome to the stall. Every person on that street is something you wrote down — an ask, a decision, a bug. Walk up, read what they carry, and do the thing out there in the world. When it is done, it closes, and they go home.",
     codex:"The street is the backlog. A named person carries a real task; townsfolk carry small ones; notes go on the board; animals carry nothing.",
     q:"Where do you start?",
     ch:[{t:"Walk the street and read what people carry",out:{r:"ok",concept:"The street is the backlog",why:"Reading first is the whole method. The list is in the people, not on a screen.",beat:"Don Güero nods toward the door."}},
         {t:"Ask him for a list",out:{r:"mid",concept:"No lists",why:"He does not keep one. A person with something to tell you is an invitation; a list is homework.",beat:"“Out there,” he says, and goes back to his coffee."}}]}}}
];
