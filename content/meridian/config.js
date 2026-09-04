/* game version — MUST match sw.js CACHE (the smoke test enforces the lockstep) */
const GAMEV="mq-v57";
/* Meridian Quest content pack — game tuning: level thresholds, total XP, chapters. */
const LEVELS=[0,45,90,120];
/* default camera for this pack. TRUE 3D as of 2026-09-01 (owner: "please make 3d
   default"); front-profile 2.5D was the previous default (owner + AJ, 2026-08-31)
   and is still one tap away. A device's own Settings choice always wins, and the
   renderer falls back to front-profile by itself if 3D cannot run on the device. */
const CAMDEF="3d";
const MAXXP=830;
/* Districts: a district's quest pack, and how many answers play its ending.
   `need` is deliberately LOWER than the pack size — the city is a template, so the
   bar is data, not a constant in the engine. Retune it here.
   `need` closes nothing: it is the bar for the ENDING BEAT, after which the district
   stays open and its remaining quests stay answerable (docs/OWNER.md — no practice
   is ever missed). Reaching it breaks ground on the next lot; it never locks a door. */
/* Stakes — an OPTIONAL layer on top of the grade, declared in content so a pack
   picks its own and a district can override the pack (a relaxed town can still hold
   one scored mini-game). Modes:
     none    — the open-world default: nothing is ever lost
     hearts  — lives, as Meridian shipped them; admin can toggle this on for a challenge
     budget  — ARCHITECTURE ONLY. Named so the seam exists if a realistic teaching
               scenario is ever wanted. Deliberately NOT implemented; the engine
               treats it as `none`. See docs/OWNER.md before building it.
   Underneath every mode the GRADE is always on and never blocks anything. */
const STAKES={mode:"none",hearts:3};
/* GROWTH — what the city builds as the player earns it, DECLARED BY CONTENT.
   The engine knows the mechanism — raise staged tiles, seal a finished facade, move an
   NPC out of the way, drop a district's storefront ribbon — and none of the names.
   It used to hardcode that quests 12 and 13 raise La Obra, that quest 15 opens Xochi's
   fitting room, that the estimator is NPC "e" who ends up at 7,7, and that district 1
   is El Mercado. A different pack with different quests at those indices would have
   built Meridian's construction site (docs/OWNER.md — entities as data; if a feature
   cannot be turned off for AJ, it is built wrong). A pack with no GROWTH never grows.
   Declared after maps.js so it can point straight at OBRA and MERCADO. */
const GROWTH={
  /* a staged build: the Nth of `quests` answered raises stage N of `tiles` */
  staged:{world:"st",quests:[12,13],tiles:OBRA,
    /* where the hero is stepped out to if a stage grows over or encloses them */
    safe:{x:21,y:4},
    /* applied once every stage is up */
    done:{moveNpc:{key:"e",x:7,y:7},                 /* Lupe moves streetside */
          seal:{y0:6,y1:8,x0:15,x1:28,tile:"B"}}},   /* the finished building is solid */
  /* a district's storefront ribbon, applied once that district has opened. `doorstep`
     is where the handover stands you — the mercado's front step. A pack may declare
     `ribbons:[…]` instead (one per storefront); this singular form still works. */
  ribbons:[
   {id:"me",world:"st",district:1,tiles:MERCADO,  doorstep:{world:"st",x:6, y:12,dir:"down"}},
   {id:"ta",world:"st",district:2,tiles:TALLER,   doorstep:{world:"st",x:23,y:12,dir:"down"}},
   {id:"pa",world:"ex",district:3,tiles:ESPIGA,   doorstep:{world:"ex",x:6, y:1, dir:"down"}},
   {id:"li",world:"ex",district:4,tiles:VELAZQUEZ,doorstep:{world:"ex",x:12,y:1, dir:"down"}},
   {id:"no",world:"st",district:5,tiles:NOLASCO,  doorstep:{world:"st",x:25,y:1, dir:"down"}},
   /* gifts upstairs — a delivery IS a storefront aimed at f2, and each lands on a moving box
      (❗La caja). No doorstep on a gift, so the handover never stands you upstairs. */
 /* the wall: blank paper from day one, and a district's Saturday pins its own page over it.
    The document behind it is DOCS[<id>] in content/meridian/docs.js. */
 {id:"poster-labs",world:"f2",district:1,tiles:[[0,2,"▤"]]},
 {id:"poster-me",world:"f2",district:2,tiles:[[0,4,"▤"]]},
 {id:"poster-ta",world:"f2",district:3,tiles:[[0,6,"▤"]]},
 {id:"poster-pa",world:"f2",district:4,tiles:[[0,13,"▤"]]},
 {id:"poster-li",world:"f2",district:5,tiles:[[0,15,"▤"]]},
 {id:"poster-no",world:"f2",district:6,tiles:[[0,17,"▤"]]},
   {id:"gift-me",world:"f2",district:2,tiles:[[11,2,"K"],[11,3,"K"]]},
   {id:"gift-ta",world:"f2",district:3,tiles:[[11,14,"○"]]},
   {id:"gift-pa",world:"f2",district:4,tiles:[[2,11,"⊔"]]},
   {id:"gift-li",world:"f2",district:5,tiles:[[5,15,"."],[10,18,"."]]},
   {id:"gift-no",world:"f2",district:6,tiles:[[10,17,"▯"]]}  /* the file cabinet IS the box by the stairs (BACKLOG §6); it used to land on bare floor and clear the box instead */
  ],
  /* any attempt at this quest opens the wardrobe — the extra, not the quest */
  wardrobeQuest:15,
  /* and who runs the fitting room once it is open */
  wardrobeNpc:"xochi"
};
/* SEASONS — a season changes COLOUR, never design (owner, 2026-09-01: "if someone
   changes the palette, it can change but keep the general design"). The engine knows
   only that there is a current season and that it may override world-art keys through
   art(key, fallback); the names, dates and colours live here. Arrives on its own by
   the calendar (`from`/`to` are [month, day], inclusive, and may wrap the new year);
   Settings offers "by the calendar", "year-round", or any season by name.
   One season, named for Día de Muertos (signed 2026-09-01, IDEAS §15.9) — the bridge
   is a memorial crossing, so the palette is remembrance: cempasúchil orange, papel
   picado pink and purple, candle yellow, teal. DRAFT palette — the owner signs it off.
   `bridge` is the proving run; jacaranda, awnings and the light wash widen it later. */
const SEASONS={
  muertos:{label:{en:"Día de Muertos",es:"Día de Muertos"},from:[10,18],to:[11,3],
    art:{bridge:["#E0483C","#F07C24","#F2B705","#E8478F","#7B4BA8","#2FA5A0"],
         sky:"#E8A24A"}} /* the north window's sky at dusk — Don Güero, 2026-09-02; draft like the rest */
};
const CHAPTERS=[
 /* need:12 of 16 — ANY twelve, from anywhere in the district. week1 is not "the
    office": it spans HQ (0-9, 14), La Cocina (10, 11), La Obra (12, 13) and the
    Studio (15), so the twelve never have to be office quests. Dropped from 16 on
    2026-09-01 (❗La puerta) because 16/16 meant Week One's ending only fired on a
    full sweep — making HQ the one place in Meridian you could not come back to, in
    the city whose law is that you always can. */
 /* epi: the prefix of this district's three ending strings in strings.js (epi1..3);
    go: its burnout ending; open: the toast when the next lot opens. Declared here so a
    third district never prints another one's Saturday. */
 {id:"principal",quests:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],need:12,
  epi:"epi",go:"goEpi",open:"weekTwoToast",
  industry:{en:"Enterprise IT",es:"TI empresarial"},
  role:{en:"AI Implementation Lead",es:"Líder de Implementación de IA"}},
 {id:"mercado",quests:[16,17,18,19,20,21,22,23],           need:5,
  epi:"mepi",go:"mgoEpi",open:"tallerToast",
  industry:{en:"Grocery retail",es:"Abarrotes"},
  role:{en:"AI Product Manager",es:"Product Manager de IA"}},
 /* Las cuatro puertas (2026-09-02): each district's Saturday phones the next lot from
    inside its own ending strings (the engine cannot grade a toast), and its `open`
    toast announces the lot. The last door opens nothing — la inauguración is later.
    `industry` is the room the role is practised in (❗El giro): the report prints
    "industry · role" so five engagements read as five trades, not one title. */
 {id:"taller",quests:[24,25,26,27,28,29,30,31],need:5,
  epi:"tepi",go:"tgoEpi",open:"espigaToast",
  industry:{en:"Auto repair",es:"Taller mecánico"},
  role:{en:"AI Solutions Architect",es:"Arquitecto de Soluciones de IA"}},
 {id:"espiga",quests:[32,33,34,35,36,37,38,39],need:5,
  epi:"eepi",go:"egoEpi",open:"velazquezToast",
  industry:{en:"Bakery",es:"Panadería"},
  role:{en:"Operations Analyst",es:"Analista de Operaciones"}},
 {id:"velazquez",quests:[40,41,42,43,44,45,46,47],need:5,
  epi:"vepi",go:"vgoEpi",open:"nolascoToast",
  industry:{en:"Commercial cleaning",es:"Limpieza comercial"},
  role:{en:"AI Adoption Lead",es:"Líder de Adopción de IA"}},
 {id:"nolasco",quests:[48,49,50,51,52,53,54,55],need:5,
  epi:"nepi",go:"ngoEpi",open:"lastToast",
  industry:{en:"Tax & notary",es:"Impuestos y notaría"},
  role:{en:"Prompt & Solutions Engineer",es:"Ingeniero de Prompts y Soluciones"}}
];
