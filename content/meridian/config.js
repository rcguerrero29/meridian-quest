/* game version — MUST match sw.js CACHE (the smoke test enforces the lockstep) */
const GAMEV="mq-v36";
/* Meridian Quest content pack — game tuning: level thresholds, total XP, chapters. */
const LEVELS=[0,45,90,120];
/* default camera for this pack (owner + AJ pick, 2026-08-31): the front-profile
   2.5D view greets new players; a device's own Settings choice always wins */
const CAMDEF="front";
const MAXXP=350;
/* Chapters: a district's quest pack, and how many of them close it.
   `need` is deliberately LOWER than the pack size — the city is a template, so the
   bar to finish is data, not a constant in the engine. Retune it here. */
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
const CHAPTERS=[
 {id:"week1",  quests:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],need:16,
  role:{en:"AI Implementation Lead",es:"Líder de Implementación de IA"}},
 {id:"mercado",quests:[16,17,18,19,20,21,22,23],           need:5,
  role:{en:"AI Product Manager",es:"Product Manager de IA"}}
];
