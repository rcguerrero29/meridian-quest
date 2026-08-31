/* game version — MUST match sw.js CACHE (the smoke test enforces the lockstep) */
const GAMEV="mq-v26";
/* Meridian Quest content pack — game tuning: level thresholds, total XP, chapters. */
const LEVELS=[0,45,90,120];
const MAXXP=350;
/* Chapters: a district's quest pack, and how many of them close it.
   `need` is deliberately LOWER than the pack size — the city is a template, so the
   bar to finish is data, not a constant in the engine. Retune it here. */
const CHAPTERS=[
 {id:"week1",  quests:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],need:16,
  role:{en:"AI Implementation Lead",es:"Líder de Implementación de IA"}},
 {id:"mercado",quests:[16,17,18,19,20,21,22,23],           need:5,
  role:{en:"AI Product Manager",es:"Product Manager de IA"}}
];
