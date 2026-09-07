/* El Changarrito — the declared residents. Everyone else on the street is placed by the
   record (content/record.js) from a labelled issue, and leaves when it closes. */
const NPCE={guero:"🏗️",ventanilla:"🪟",pregonero:"📣",remedios:"🗂️",chuy:"📎",pili:"🎨",beto:"🔧",cuca:"🔑",nacho:"🖌️"};
const NPCN={
 en:{guero:"Don Güero · Master Planner",ventanilla:"La ventanilla · The city's record",pregonero:"El pregonero · How to open the town",
     remedios:"Doña Remedios · Records & forms",chuy:"Chuy \"Copias\" · Docs & templates",pili:"Pili · How it looks",
     beto:"Beto Bujía · The engine",cuca:"Doña Cuca · Rooms & stairs",nacho:"Nacho · Meridian's story"},
 es:{guero:"Don Güero · Planificador",ventanilla:"La ventanilla · El registro de la ciudad",pregonero:"El pregonero · Cómo abrir el pueblo",
     remedios:"Doña Remedios · Registros y formularios",chuy:"Chuy \"Copias\" · Documentos y plantillas",pili:"Pili · Cómo se ve",
     beto:"Beto Bujía · El motor",cuca:"Doña Cuca · Cuartos y escaleras",nacho:"Nacho · La historia de Meridian"}
};
/* the six clerks (#69, block one): each knows one house's business and nothing else */
const NPCLOOK={guero:{shirt:"#8A5A2B",skin:"#B97E52",hair:"#8E8E96",style:"cap"},
               ventanilla:{shirt:"#1F8A8A",skin:"#D9995F",hair:"#171219",style:"buns"},
               pregonero:{shirt:"#C8462B",skin:"#A86B3F",hair:"#2B1B14",style:"cap"},
               remedios:{shirt:"#6E2F4A",skin:"#C08356",hair:"#D8D2C8",style:"buns"},
               chuy:{shirt:"#D9A441",skin:"#B97E52",hair:"#2B1B14",style:"buzz"},
               pili:{shirt:"#3F7A8A",skin:"#D9995F",hair:"#4A2A6E",style:"pony"},
               beto:{shirt:"#7C8590",skin:"#A86B3F",hair:"#1E1A1A",style:"spiky"},
               cuca:{shirt:"#C98A2D",skin:"#C08356",hair:"#6A6A72",style:"braids"},
               nacho:{shirt:"#B5432F",skin:"#C08356",hair:"#26202B",style:"afro"}};
/* El pregonero (ch-v7): the town crier. He walks the street with the three lines you need to
   open and update the town — a note, never a task (the rule of weight) — because the owner
   could not remember them (2026-09-06: "its hard to remember the command for a git pull"). */
