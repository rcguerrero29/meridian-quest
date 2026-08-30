/* Meridian Quest content pack — NPC roster: emoji, names (EN/ES), looks, and world placement. */
const NPCE={priya:"🛠️",marcus:"💼",camila:"🎧",tovar:"🌮",legal:"⚖️",cto:"🏥",junior:"🐣",ceo:"👑",fred:"🐕",rosa:"🌶️",chuy:"👨‍🍳",guero:"👷",lupe:"📐",beto:"🔨",kike:"🧱",mari:"🏗️",xochi:"🧵"};
const NPCN={
 en:{priya:"Priya · Engineering Lead",marcus:"Marcus · CFO",camila:"Camila · Customer Success",tovar:"Ops Director · Tovar's Tacos",legal:"Dana · Legal",cto:"Dr. Okafor · Bayview CTO",junior:"Theo · Junior PM",ceo:"CEO · Tovar's Tacos",fred:"Frederick · Good Boy",rosa:"Doña Rosa · Owner, La Cocina",chuy:"Chuy · Head Cook",guero:"Don Güero · Foreman, La Obra",lupe:"Lupe · Estimator & Permits",beto:"Beto · Crew, La Obra",kike:"Kike · Mason",mari:"Mari · Crane Operator",xochi:"Xochi · Designer"},
 es:{priya:"Priya · Líder de Ingeniería",marcus:"Marcus · CFO",camila:"Camila · Éxito del Cliente",tovar:"Director de Operaciones · Tovar's Tacos",legal:"Dana · Legal",cto:"Dr. Okafor · CTO de Bayview",junior:"Theo · PM Junior",ceo:"CEO · Tovar's Tacos",fred:"Frederick · Buen Chico",rosa:"Doña Rosa · Dueña de La Cocina",chuy:"Chuy · Jefe de Cocina",guero:"Don Güero · Maestro de Obra",lupe:"Lupe · Presupuestos y Permisos",beto:"Beto · Cuadrilla de La Obra",kike:"Kike · Albañil",mari:"Mari · Operadora de Grúa",xochi:"Xochi · Diseñadora"}};
/* npc letter -> npc key + quest queue */
const STATIONS={p:{npc:"priya",q:[5,14]},j:{npc:"junior",q:[7]},c:{npc:"ceo",q:[9]},l:{npc:"legal",q:[2]},
                t:{npc:"tovar",q:[0,8]},a:{npc:"camila",q:[1]},h:{npc:"cto",q:[6]},m:{npc:"marcus",q:[3,4]}};
const WNPC={hq:STATIONS,lc:{r:{npc:"rosa",q:[10]},y:{npc:"chuy",q:[11]}},st:{f:{npc:"guero",q:[12]},e:{npc:"lupe",q:[13]}},
            ex:{w:{npc:"beto",q:[],chat:1},x:{npc:"kike",q:[],chat:1},z:{npc:"mari",q:[],chat:1}},
            lo:{d:{npc:"xochi",q:[15],chat:1}}};
const NPCLOOK={p:{shirt:"#C2543F",skin:"#B97E52",hair:"#171219",style:"long"},j:{shirt:"#3E8ED0",skin:"#EFC49A",hair:"#7A4A22",style:"curly"},
  c:{shirt:"#2C2637",skin:"#D9995F",hair:"#5C5C66",style:"cap",outfit:"formal"},l:{shirt:"#25423C",skin:"#F0C9A6",hair:"#2C1C12",style:"long",outfit:"formal"},
  t:{shirt:"#D08A2E",skin:"#C08356",hair:"#1E1620",style:"cap"},a:{shirt:"#B04A78",skin:"#8C5A33",hair:"#241B26",style:"curly"},
  h:{shirt:"#31446E",skin:"#E8B98C",hair:"#403830",style:"buzz",outfit:"formal"},m:{shirt:"#3A415C",skin:"#F1CDA9",hair:"#8E8E96",style:"buzz",outfit:"formal"},
  r:{shirt:"#B23A48",skin:"#C08356",hair:"#B9B9C0",style:"long"},y:{shirt:"#F0EEE6",skin:"#B97E52",hair:"#26202B",style:"buzz"},
  f:{shirt:"#E8720C",skin:"#B97E52",hair:"#9A9AA2",style:"buzz"},e:{shirt:"#2E7F86",skin:"#E5AC82",hair:"#26202B",style:"pony"},
  w:{shirt:"#3E6FA8",skin:"#B97E52",hair:"#26202B",style:"buzz",hat:"hard"},x:{shirt:"#7A8752",skin:"#C08356",hair:"#26202B",style:"buzz",hat:"hard"},z:{shirt:"#A85C86",skin:"#E5AC82",hair:"#26202B",style:"pony",hat:"hard"},
  d:{shirt:"#C4586B",skin:"#C08356",hair:"#26202B",style:"buns"}};
