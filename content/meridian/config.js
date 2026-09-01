/* game version — MUST match sw.js CACHE (the smoke test enforces the lockstep) */
const GAMEV="mq-v42";
/* Meridian Quest content pack — game tuning: level thresholds, total XP, chapters. */
const LEVELS=[0,45,90,120];
/* default camera for this pack. TRUE 3D as of 2026-09-01 (owner: "please make 3d
   default"); front-profile 2.5D was the previous default (owner + AJ, 2026-08-31)
   and is still one tap away. A device's own Settings choice always wins, and the
   renderer falls back to front-profile by itself if 3D cannot run on the device. */
const CAMDEF="3d";
const MAXXP=350;
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
  /* a district's storefront ribbon, applied once that district has opened */
  ribbon:{world:"st",district:1,tiles:MERCADO},
  /* any attempt at this quest opens the wardrobe — the extra, not the quest */
  wardrobeQuest:15,
  /* and who runs the fitting room once it is open */
  wardrobeNpc:"xochi"
};
const CHAPTERS=[
 /* need:12 of 16 — ANY twelve, from anywhere in the district. week1 is not "the
    office": it spans HQ (0-9, 14), La Cocina (10, 11), La Obra (12, 13) and the
    Studio (15), so the twelve never have to be office quests. Dropped from 16 on
    2026-09-01 (❗La puerta) because 16/16 meant Week One's ending only fired on a
    full sweep — making HQ the one place in Meridian you could not come back to, in
    the city whose law is that you always can. */
 {id:"principal",quests:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],need:12,
  role:{en:"AI Implementation Lead",es:"Líder de Implementación de IA"}},
 {id:"mercado",quests:[16,17,18,19,20,21,22,23],           need:5,
  role:{en:"AI Product Manager",es:"Product Manager de IA"}}
];
