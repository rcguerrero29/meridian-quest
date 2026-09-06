/* El Changarrito — the declared residents. Everyone else on the street is placed by the
   record (content/record.js) from a labelled issue, and leaves when it closes. */
const NPCE={guero:"🏗️",ventanilla:"🪟",pregonero:"📣"};
const NPCN={
 en:{guero:"Don Güero · Master Planner",ventanilla:"La ventanilla · The city's record",pregonero:"El pregonero · How to open the town"},
 es:{guero:"Don Güero · Planificador",ventanilla:"La ventanilla · El registro de la ciudad",pregonero:"El pregonero · Cómo abrir el pueblo"}
};
const NPCLOOK={guero:{shirt:"#8A5A2B",skin:"#B97E52",hair:"#8E8E96",style:"cap"},
               ventanilla:{shirt:"#1F8A8A",skin:"#D9995F",hair:"#171219",style:"buns"},
               pregonero:{shirt:"#C8462B",skin:"#A86B3F",hair:"#2B1B14",style:"cap"}};
/* El pregonero (ch-v7): the town crier. He walks the street with the three lines you need to
   open and update the town — a note, never a task (the rule of weight) — because the owner
   could not remember them (2026-09-06: "its hard to remember the command for a git pull"). */
