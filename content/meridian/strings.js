/* Meridian Quest content pack — UI strings, every player-facing line, EN+ES in lockstep. */
const UI={
 en:{
  in1:"Meridian Labs needs an AI delivery hero. The old lead fine-tuned something he shouldn't have and was never seen again.",
  in2:"The office is a world. Roam it — hallways, the kitchen, the corner offices. Coworkers with a ❗ have quests; walk up and talk, in any order. Some decisions open follow-up decisions.",
  in3:"Three reputation hearts. Bad calls cost one; mediocre calls earn half XP — and either way the quest stays open until you make the right call. Lose all three hearts and the week resets. Ladder: Junior → Delivery Lead → Senior Lead → AI Legend.",
  in4:"Choose your class:",
  classes:{architect:["The Architect","You see systems. Meridian's diagrams fear you."],diplomat:["The Diplomat","Bilingual, unflappable. CFOs sign things near you."],operator:["The Operator","You ship. Production logs whisper your name."]},
  crTitle:"Create your hero",lbName:"Name",lbOutfit:"Outfit",lbShirt:"Shirt / jacket",lbSkin:"Skin tone",lbHairC:"Hair color",lbHairS:"Hair style",begin:"Badge in",
  outfits:[["casual","Casual"],["formal","Formal 👔"]],styles:[["cap","Short"],["long","Long"],["curly","Curly"],["buzz","Buzz"],["spiky","Spiky"],["pony","Ponytail"],["afro","Afro"],["mohawk","Mohawk"],["braids","Braids"],["flat","Flat top"],["buns","Buns"],["edgar","Edgar"],["fade","Taper fade"],["mullet","Mullet"],["broccoli","Broccoli"],["bald","Bald"]],
  worldTag:"Meridian HQ · find the ❗",
  hintSwipe:"Touch anywhere on the screen and drag to walk · release to stop · ⚙️ to switch controls.",
  hintJoy:"Joystick or arrow keys to roam · walk up to a ❗ coworker and Talk · ⚙️ to switch controls.",
  hintPad:"D-pad or arrow keys to roam · walk up to a ❗ coworker and Talk · ⚙️ to switch controls.",
  setTitle:"Settings",lbCtl:"Movement controls",swipeB:"👆 Swipe",joyB:"🕹️ Joystick",padB:"✛ D-pad",lbLang:"Language",lbAdm:"Admin mode — touch tiles to reshape the office",admOff:"Off",admOn:"🛠️ On",openLab:"📝 Text lab",closeSet:"Done",
  brushes:["Floor","Wall","Desk","Plant","Rug","Door","Table","Fridge","Stove","Character"],
  nmTitle:"New character",nmLb:"Name them — some names carry magic",nmOk:"✨ Create",nmCancel:"Cancel",
  npcMade:n=>n+" moved into the barrio.",npcGone:"They moved away.",npcFull:"The barrio is full (12 friends max).",
  chill:["Nice day for standing exactly here.","I'm not in the way. I AM the way.","The trolley was late once. Once.",
   "I heard the office dog keeps a better calendar than me.","Just vibing. It's a whole job if you do it right.",
   "The jacarandas only bloom like this when the week's going well."],
  obraUp:"🏗️ Progress! The site across the street is taking shape.",
  pigeon:["Coo.","The pigeon judges your crosswalk technique.","She was here before the city. She'll be here after."],
  loro:["¡Ándale, jefe!","Lorenzo supervises. Lorenzo approves.","¡Qué bonito trabajo!"],
  gato:["Mrrrp. The street cat allows it.","One ear flicks. You have been acknowledged.","The crew feeds him tamale scraps. He runs this site."],
  tlTitle:"Text lab",tlHint:"Edit names, quest titles and bump lines (JSON). Applies to the current language.",tlApply:"Save",tlClose:"Close",tlOk:"Texts updated.",tlErr:"That JSON didn't parse — nothing changed.",
  levels:["Junior","Delivery Lead","Senior Lead","AI LEGEND"],
  quest:"Quest",followup:" · follow-up",codexLb:"📜 Codex",
  okH:"⚔️ QUEST COMPLETE",midH:"🟡 SHIPPED WITH INCIDENTS",badH:"💔 SLIP — reputation takes a hit",
  lvlUp:"⬆ LEVEL UP — you are now ",
  nextBack:"Back to the office",nextEnd:"Claim your title",nextDoom:"Face the consequences",
  talkPre:"💬 ",
  tut1:"This is you. Roam with the joystick or arrow keys.",tut2:"Desks, plants and walls just block you — coworkers with a ❗ have quests. Walk up and Talk.",
  admToast:"Admin on. Pick a brush, tap tiles. With great power comes the ability to wall yourself in.",
  undoLb:"Undo",undoToast:"Edit undone.",undoEmpty:"Nothing to undo.",
  tlFindPh:"Search text…",tlNoHit:"No match.",
  dog:["Woof!","Frederick approves.","Frederick is herding you back to work."],
  treatLb:"🦴 Treat Frederick",fredHeart:"Frederick: ❤",
  petCat:"🐾 Pet Canela",petPig:"🐾 Greet Paloma",petLoro:"🦜 Say hi to Lorenzo",petGato:"🐾 Pet the street cat",
  fredUnlock:"Frederick trusts you now… and he has paperwork. 🐾 Secret side quest unlocked — treat him again to open it.",
  carePackToast:"📦 New in ⚙️ → Export: Frederick's care pack — his sheet + reminders, ready for your own pet.",
  fredDoneToast:"🎀 Mod unlocked: Frederick's red bandana.",
  locs:{hq:"Meridian HQ",f2:"Floor 2 · Expansion",st:"Meridian Street",lc:"La Cocina",lo:"La Obra · Studio",ex:"Calle Dos · Expansion block"},
  chat:{beto:["We pour El Mercado's slab Thursday. Don Güero says hi.","Two more weeks and this block gets groceries, primo."],
        kike:["Straight walls, straight prompts — same discipline.","The AI did the material takeoff. I checked every line. We're friends now."],
        mari:["From the crane you can see Güero's whole plan.","The lift schedule is AI-sorted — weight, wind, order. Smooth all day."]},
  arrive:{hq:"Meridian HQ.",f2:"Floor 2 — expansion space. Quiet up here… for now.",st:"Street level. Mind the crosswalk.",lc:"La Cocina — smells like consommé and opportunity.",lo:"La Obra's studio — you helped build this. Every drawing here becomes a building.",ex:"Calle Dos — the town grows east. El Mercado is going up."},
  trolley:{title:"🚋 Barrio Trolley",note:"The MQT line — every district, one hop. Where to, consultant?",here:"you are here",soon:"Barrio Norte — coming soon",close:"Stay here"},
  cat:["Mrrp.","Canela blinks slowly. You are accepted.","The health inspector doesn't know about Canela. Keep it that way."],
  expBtn:"📤 Export (beta)",expTitle:"Export (beta)",
  expHint:"Skeleton v1 — your play data as JSON, ready to copy. Future: typed documents from real work (decision report), email delivery, conversation export.",
  expCopy:"Copy",expCopied:"Copied to clipboard.",
  exTabJson:"Play data",exTabCare:"🐾 Care pack",exIcs:"📅 Reminders (.ics)",
  careHint:"Frederick's ops system as a real deliverable — copy the sheet, download the recurring reminders, swap in your own pet's details.",
  carePack:(n,tr,p)=>`# 🐾 ${p.n.toUpperCase()}'S CARE PACK
Kept by ${n} · Meridian Labs
One source of truth for one very good pet.

## Daily
- ${p.am}  Breakfast
- Morning walk — 20 min
- ${p.pm}  Dinner
- Evening walk — 20 min
- Treats: 3/day max (in-game treats given to Frederick: ${tr})

## Recurring — if it repeats, it gets a reminder
- Flea/tick + heartworm ....... monthly, the 1st
- Grooming .................... every 8 weeks
- Weigh-in .................... every 3 months
- Vet checkup + vaccines ...... yearly (book 2 weeks ahead)
- Content batch day ........... monthly: AI drafts the captions, a human approves

## House rules (as decided in the quest)
1. This sheet is the single source of truth — not the fridge, not three people's heads.
2. Memory is not a system — every cycle above lives in a shared calendar (see the .ics).
3. One shared checklist; whoever does the feeding checks it off.
4. Nothing posts as ${p.n} without human approval. ${p.n} cannot approve. ${p.n} is a very good pet.`,
  careEvents:pn=>["🐾 Flea/tick + heartworm — "+pn,"🐾 Grooming — "+pn,"🐾 Weigh-in — "+pn,"🐾 Vet checkup + vaccines — "+pn,"📸 "+pn+" content batch day"],
  petPh:"Pet's name",
  wdTitle:"🧵 Xochi's Collar Drop",wdNote:"Fresh from the tech pack — dress the neighborhood. Frederick roams HQ; Canela holds court at La Cocina. Changes save instantly.",
  wdBandana:"Bandana",wdCollar:"Collar",wdCape:"Cape",
  wdUnlockToast:"🧵 Wardrobe unlocked — in ⚙️ Settings, or with Xochi once her quest is beaten.",
  wdBtn:"🧵 Wardrobe",
  tpBtn:"🎫 Trolley Pass",tpTitle:"🎫 Trolley Pass",
  tpNote:"Your save, stamped as a transit pass. Scan the code with your other device's camera, or share the pass to it — boarding over there always asks first.",
  tpShare:"📤 Share pass",tpCopy:"🔗 Copy link",tpCopied:"Pass link copied.",
  tpFoundLb:"🎫 Trolley Pass found",
  tpFoundTx:(n,x,d,q)=>`${n} rode in on the trolley — ${x} XP, ${d}/${q} quests.`,
  tpReplace:n=>`Boarding replaces this device's save (${n}).`,
  tpBoard:"🎫 Board with this save",tpSkip:"Keep this device's save",
  mpBtn:"🌐 Multiplayer 🚧",mpTitle:"🌐 Multiplayer",
  mpNote:"🚧 Under construction. The MQT crew is laying track to Barrio Norte — one day other consultants will roam these streets with you. For now, the office is all yours. (Hard hats stay on until the line opens.)",
  lbTheme:"Color theme",
  lbMusic:"Music",musOn:"🔊 On",musOff:"🔇 Muted",
  themes:{meridian:"🏢 Meridian",forest:"🌿 Forest",fairy:"🧚 Fairy",sunset:"🌇 Sunset",custom:"✨ Custom"},
  teOpen:"🎨 Theme editor",teTitle:"🎨 Theme editor",
  teFrom:"Start from a preset (clones it into ✨ Custom)",teModeLb:"Editing variant",
  teFix:"🪄 Auto-fix contrast",
  teSaved:"✨ Custom theme saved — pick it any time under Color theme.",teFixed:"🪄 Text colors nudged until every pair passes the contrast audit.",
  retryNote:"❗ This one stays open — come back and make the better call.",
  retryNoteFred:"🦴 Frederick will reopen the folder for another treat.",
  mapTitle:"Village map",vmF2:"Floor 2",vmHQ:"Meridian HQ",vmSt:"Meridian Street",vmLc:"La Cocina 🌶️",
  vmSite0:"🚧 Construction site",vmSite2:"La Obra · Studio 📐",vmPlots:"Reserved lots — El Mercado & more",vmHere:"◉ you are here",
  goTitle:"☠️ Reputation: zero",goEpi:"Priya finds you in the parking lot. “The last lead didn't get a second chance. You do. Same desk, Monday.” The week resets — but this time, you've read the Codex.",
  endScore:(x,m,h)=>`${x}/${m} XP · ${h}/3 hearts intact`,goScore:(x,d,n)=>`${x} XP · ${d}/${n} quests completed`,
  epi1:"Friday, 6pm. The VP stands up when you enter. “Flawless week — and you walked your own path. The agents program is yours.” Roll credits — until Week Two.",
  epi2:"Friday, 6pm. “Strong week,” says the VP. “Some incidents shipped, but you owned the floor.” Priya nods on your way out. Week Two is coming.",
  epi3:"Friday, 6pm. You survived — barely. The VP slides the Codex back across the table: “Study. Run the week again. Meridian believes in second playthroughs.”",
  replay:"New game +",replayToast:n=>`Back at it, ${n}. Same office, wiser hero.`,
  contBtn:(n,x,d)=>`▶ Continue as ${n} — ${x} XP, ${d}/${QEN.length} quests`,contDead:"That run ended. Start fresh.",
  langQuick:"🌐 Español",
  flavor:{D:["Just a desk. The monitor is judging you anyway.","A coworker's desk. Their kombucha, their rules."],K:["The coffee counter. Sacred ground.","The coffee machine. It has seen things."],P:["A potted plant. It's doing its best.","The office ficus. Load-bearing morale."],"#":["A wall. Solid argument.","That's a wall. Even AI Legends respect walls."],"+":["A door. It opens by walking through it. Technology.","Doorway detected. You may proceed."],B:["The building facade. Sturdy. Corporate.","Brick. It was here before you and will be here after."],F:["Construction fence. Hard hats beyond this point."],G:["Steel girders. The future has scaffolding."],C:["A traffic cone. Respect it."],X:["🚧 Under construction — La Cocina (restaurant), El Mercado (grocery), and La Obra (construction office) open here soon."],T:["A dining table. The tablecloth is non-negotiable.","Reserved. Probably for Canela."],W:["The walk-in fridge. Chuy's forecast is taped to it. It is law.","Cold storage. Where margins live or die."],V:["The stove. Six burners of consommé diplomacy.","Hot. Chuy's domain. Ask before touching."],A:["A drafting table. Hand sketch first, AI render second — the judgment stays human.","Work in progress. Measure twice, prompt once."],U:["The blueprint wall. Blueprints: the original structured output.","Every building on this street was a drawing here first."],Q:["La Cocina's storefront. The awning alone raises the block's property value.","Smell that? That's Rosa's consommé calling."],J:["A jacaranda. The city plants them; the city argues about the petals.","Jacaranda shade. Free, and better than any meeting room."]}
 },
 es:{
  in1:"Meridian Labs necesita un héroe de la entrega con IA. Al líder anterior se le ocurrió hacer fine-tuning de algo que no debía y nunca se le volvió a ver.",
  in2:"La oficina es un mundo. Recórrela — pasillos, la cocina, las oficinas de la esquina. Los compañeros con ❗ tienen misiones; acércate y habla, en el orden que quieras. Algunas decisiones abren decisiones de seguimiento.",
  in3:"Tres corazones de reputación. Las malas decisiones cuestan uno; las mediocres dan la mitad de XP — y en ambos casos la misión sigue abierta hasta que tomes la decisión correcta. Pierde los tres corazones y la semana se reinicia. Escalera: Junior → Líder de Delivery → Líder Senior → Leyenda de la IA.",
  in4:"Elige tu clase:",
  classes:{architect:["El Arquitecto","Ves sistemas. Los diagramas de Meridian te temen."],diplomat:["El Diplomático","Bilingüe, imperturbable. Los CFO firman cosas cerca de ti."],operator:["El Operador","Tú entregas. Los logs de producción susurran tu nombre."]},
  crTitle:"Crea tu héroe",lbName:"Nombre",lbOutfit:"Atuendo",lbShirt:"Camisa / saco",lbSkin:"Tono de piel",lbHairC:"Color de pelo",lbHairS:"Estilo de pelo",begin:"Fichar",
  outfits:[["casual","Casual"],["formal","Formal 👔"]],styles:[["cap","Corto"],["long","Largo"],["curly","Rizado"],["buzz","Rapado"],["spiky","Puntas"],["pony","Coleta"],["afro","Afro"],["mohawk","Cresta"],["braids","Trenzas"],["flat","Corte plano"],["buns","Chonguitos"],["edgar","Edgar"],["fade","Degradado"],["mullet","Mullet"],["broccoli","Brócoli"],["bald","Sin pelo"]],
  worldTag:"Meridian HQ · busca los ❗",
  hintSwipe:"Toca cualquier parte de la pantalla y arrastra para caminar · suelta para detenerte · ⚙️ para cambiar controles.",
  hintJoy:"Joystick o flechas para moverte · acércate a un compañero con ❗ y habla · ⚙️ para cambiar controles.",
  hintPad:"Cruceta o flechas para moverte · acércate a un compañero con ❗ y habla · ⚙️ para cambiar controles.",
  setTitle:"Ajustes",lbCtl:"Controles de movimiento",swipeB:"👆 Deslizar",joyB:"🕹️ Joystick",padB:"✛ Cruceta",lbLang:"Idioma",lbAdm:"Modo admin — toca casillas para remodelar la oficina",admOff:"Apagado",admOn:"🛠️ Activo",openLab:"📝 Laboratorio de textos",closeSet:"Listo",
  brushes:["Piso","Pared","Escritorio","Planta","Tapete","Puerta","Mesa","Refri","Estufa","Persona"],
  nmTitle:"Nuevo personaje",nmLb:"Ponles nombre — algunos nombres traen magia",nmOk:"✨ Crear",nmCancel:"Cancelar",
  npcMade:n=>n+" se mudó al barrio.",npcGone:"Se mudó a otra parte.",npcFull:"El barrio está lleno (máx. 12 amigos).",
  chill:["Buen día para estar parado justo aquí.","No estorbo. SOY el camino.","El tranvía llegó tarde una vez. Una.",
   "Dicen que el perro de la oficina lleva mejor agenda que yo.","Aquí, vibrando. Es todo un oficio si lo haces bien.",
   "Las jacarandas solo florecen así cuando la semana va bien."],
  obraUp:"🏗️ ¡Avance! La obra de enfrente va tomando forma.",
  pigeon:["Curucucú.","La paloma juzga tu técnica para cruzar.","Estaba aquí antes que la ciudad. Seguirá después."],
  loro:["¡Ándale, jefe!","Lorenzo supervisa. Lorenzo aprueba.","¡Qué bonito trabajo!"],
  gato:["Mrrrp. El gato callejero lo permite.","Una oreja se mueve. Has sido reconocido.","La cuadrilla le da sobras de tamal. Él manda en esta obra."],
  tlTitle:"Laboratorio de textos",tlHint:"Edita nombres, títulos de misiones y frases de choque (JSON). Aplica al idioma actual.",tlApply:"Guardar",tlClose:"Cerrar",tlOk:"Textos actualizados.",tlErr:"Ese JSON no se pudo leer — no cambió nada.",
  levels:["Junior","Líder de Delivery","Líder Senior","LEYENDA DE LA IA"],
  quest:"Misión",followup:" · seguimiento",codexLb:"📜 Códice",
  okH:"⚔️ MISIÓN CUMPLIDA",midH:"🟡 ENTREGADO CON INCIDENTES",badH:"💔 RESBALÓN — tu reputación sufre",
  lvlUp:"⬆ SUBISTE DE NIVEL — ahora eres ",
  nextBack:"Volver a la oficina",nextEnd:"Reclama tu título",nextDoom:"Enfrenta las consecuencias",
  talkPre:"💬 ",
  tut1:"Este eres tú. Muévete con el joystick o las flechas.",tut2:"Escritorios, plantas y paredes solo bloquean — los compañeros con ❗ tienen misiones. Acércate y habla.",
  admToast:"Admin activado. Elige un pincel y toca casillas. Un gran poder conlleva la capacidad de encerrarte a ti mismo.",
  undoLb:"Deshacer",undoToast:"Edición deshecha.",undoEmpty:"Nada que deshacer.",
  tlFindPh:"Buscar texto…",tlNoHit:"Sin coincidencias.",
  dog:["¡Guau!","Frederick aprueba.","Frederick te pastorea de vuelta al trabajo."],
  treatLb:"🦴 Premio a Frederick",fredHeart:"Frederick: ❤",
  petCat:"🐾 Acariciar a Canela",petPig:"🐾 Saludar a Paloma",petLoro:"🦜 Saludar a Lorenzo",petGato:"🐾 Acariciar al gato callejero",
  fredUnlock:"Frederick ya confía en ti… y tiene papeleo. 🐾 Misión secreta desbloqueada — dale otro premio para abrirla.",
  carePackToast:"📦 Nuevo en ⚙️ → Exportar: el kit de cuidados de Frederick — su ficha + recordatorios, listos para tu propia mascota.",
  fredDoneToast:"🎀 Mod desbloqueado: el pañuelo rojo de Frederick.",
  locs:{hq:"Meridian HQ",f2:"Piso 2 · Expansión",st:"Calle Meridian",lc:"La Cocina",lo:"La Obra · Estudio",ex:"Calle Dos · Cuadra de expansión"},
  chat:{beto:["El jueves colamos la losa de El Mercado. Don Güero manda saludos.","Dos semanas más y esta cuadra tiene abarrotes, primo."],
        kike:["Muros derechos, prompts derechos — la misma disciplina.","La IA hizo el despiece de materiales. Revisé cada línea. Ya somos amigos."],
        mari:["Desde la grúa se ve el plan completo de Güero.","La IA ordena los izajes — peso, viento, orden. Suavecito todo el día."]},
  arrive:{hq:"Meridian HQ.",f2:"Piso 2 — espacio de expansión. Tranquilo por aquí… por ahora.",st:"Nivel de calle. Cuidado con el cruce.",lc:"La Cocina — huele a consomé y a oportunidad.",lo:"El estudio de La Obra — tú ayudaste a construirlo. Cada dibujo de aquí se vuelve un edificio.",ex:"Calle Dos — el pueblo crece al este. El Mercado va subiendo."},
  trolley:{title:"🚋 Tranvía del Barrio",note:"La línea MQT — cada distrito, un solo viaje. ¿A dónde vamos?",here:"estás aquí",soon:"Barrio Norte — próximamente",close:"Quedarme aquí"},
  cat:["Mrrp.","Canela parpadea despacio. Estás aceptado.","La inspectora de salubridad no sabe de Canela. Que siga así."],
  expBtn:"📤 Exportar (beta)",expTitle:"Exportar (beta)",
  expHint:"Esqueleto v1 — tus datos de juego como JSON, listos para copiar. Futuro: documentos tipados desde trabajo real (reporte de decisiones), envío por correo, exportar conversaciones.",
  expCopy:"Copiar",expCopied:"Copiado al portapapeles.",
  exTabJson:"Datos de juego",exTabCare:"🐾 Kit de cuidados",exIcs:"📅 Recordatorios (.ics)",
  careHint:"El sistema de operaciones de Frederick como entregable real — copia la ficha, descarga los recordatorios recurrentes y pon los datos de tu propia mascota.",
  carePack:(n,tr,p)=>`# 🐾 KIT DE CUIDADOS DE ${p.n.toUpperCase()}
A cargo de ${n} · Meridian Labs
Una sola fuente de verdad para una gran mascota.

## Diario
- ${p.am}  Desayuno
- Paseo matutino — 20 min
- ${p.pm}  Cena
- Paseo vespertino — 20 min
- Premios: máx. 3 al día (premios dados a Frederick en el juego: ${tr})

## Recurrente — si se repite, lleva recordatorio
- Pulgas/garrapatas + desparasitante ... mensual, el día 1
- Peluquería ........................... cada 8 semanas
- Pesaje ............................... cada 3 meses
- Chequeo veterinario + vacunas ........ anual (agenda con 2 semanas de anticipación)
- Día de lote de contenido ............. mensual: la IA redacta, un humano aprueba

## Reglas de la casa (según lo decidido en la misión)
1. Esta ficha es la única fuente de verdad — no el refri, no la cabeza de tres personas.
2. La memoria no es un sistema — cada ciclo de arriba vive en un calendario compartido (ve el .ics).
3. Una lista compartida; quien dé de comer, la marca.
4. Nada se publica como ${p.n} sin aprobación humana. ${p.n} no puede aprobar. ${p.n} es una gran mascota.`,
  careEvents:pn=>["🐾 Pulgas/garrapatas + desparasitante — "+pn,"🐾 Peluquería — "+pn,"🐾 Pesaje — "+pn,"🐾 Chequeo veterinario + vacunas — "+pn,"📸 Día de contenido de "+pn],
  petPh:"Nombre de la mascota",
  wdTitle:"🧵 El Drop de Xochi",wdNote:"Recién salido del tech pack — viste al barrio. Frederick ronda el HQ; Canela reina en La Cocina. Los cambios se guardan al instante.",
  wdBandana:"Bandana",wdCollar:"Collar",wdCape:"Capa",
  wdUnlockToast:"🧵 Vestidor desbloqueado — en ⚙️ Ajustes, o con Xochi cuando venzas su misión.",
  wdBtn:"🧵 Vestidor",
  tpBtn:"🎫 Pase del Tranvía",tpTitle:"🎫 Pase del Tranvía",
  tpNote:"Tu partida, sellada como pase de tranvía. Escanea el código con la cámara de tu otro dispositivo, o comparte el pase — al abordar allá siempre se pregunta primero.",
  tpShare:"📤 Compartir pase",tpCopy:"🔗 Copiar enlace",tpCopied:"Enlace del pase copiado.",
  tpFoundLb:"🎫 Pase del Tranvía encontrado",
  tpFoundTx:(n,x,d,q)=>`${n} llegó en el tranvía — ${x} XP, ${d}/${q} misiones.`,
  tpReplace:n=>`Abordar reemplaza la partida de este dispositivo (${n}).`,
  tpBoard:"🎫 Abordar con esta partida",tpSkip:"Conservar la partida de este dispositivo",
  mpBtn:"🌐 Multijugador 🚧",mpTitle:"🌐 Multijugador",
  mpNote:"🚧 En construcción. La cuadrilla del MQT está tendiendo vías hacia Barrio Norte — un día otros consultores rondarán estas calles contigo. Por ahora, la oficina es toda tuya. (El casco no se quita hasta que abra la línea.)",
  lbTheme:"Tema de color",
  lbMusic:"Música",musOn:"🔊 Activa",musOff:"🔇 Silenciada",
  themes:{meridian:"🏢 Meridian",forest:"🌿 Bosque",fairy:"🧚 Hada",sunset:"🌇 Atardecer",custom:"✨ Personalizado"},
  teOpen:"🎨 Editor de temas",teTitle:"🎨 Editor de temas",
  teFrom:"Parte de un preset (se clona en ✨ Personalizado)",teModeLb:"Variante en edición",
  teFix:"🪄 Auto-ajustar contraste",
  teSaved:"✨ Tema personalizado guardado — elígelo cuando quieras en Tema de color.",teFixed:"🪄 Colores de texto ajustados hasta que cada par pasa la auditoría de contraste.",
  retryNote:"❗ Esta sigue abierta — vuelve y toma la mejor decisión.",
  retryNoteFred:"🦴 Frederick reabrirá la carpeta por otro premio.",
  mapTitle:"Mapa del pueblo",vmF2:"Piso 2",vmHQ:"Meridian HQ",vmSt:"Calle Meridian",vmLc:"La Cocina 🌶️",
  vmSite0:"🚧 Obra en construcción",vmSite2:"La Obra · Estudio 📐",vmPlots:"Lotes reservados — El Mercado y más",vmHere:"◉ estás aquí",
  goTitle:"☠️ Reputación: cero",goEpi:"Priya te encuentra en el estacionamiento. «El líder anterior no tuvo segunda oportunidad. Tú sí. Mismo escritorio, el lunes.» La semana se reinicia — pero esta vez, ya leíste el Códice.",
  endScore:(x,m,h)=>`${x}/${m} XP · ${h}/3 corazones intactos`,goScore:(x,d,n)=>`${x} XP · ${d}/${n} misiones completadas`,
  epi1:"Viernes, 6pm. La VP se pone de pie cuando entras. «Semana impecable — y caminaste tu propio camino. El programa de agentes es tuyo.» Créditos finales — hasta la Semana Dos.",
  epi2:"Viernes, 6pm. «Buena semana», dice la VP. «Se entregaron algunos incidentes, pero el piso fue tuyo.» Priya asiente cuando sales. La Semana Dos se acerca.",
  epi3:"Viernes, 6pm. Sobreviviste — apenas. La VP desliza el Códice de vuelta por la mesa: «Estudia. Corre la semana otra vez. Meridian cree en las segundas partidas.»",
  replay:"Nueva partida +",replayToast:n=>`De vuelta, ${n}. Misma oficina, héroe con más calle.`,
  contBtn:(n,x,d)=>`▶ Continuar como ${n} — ${x} XP, ${d}/${QES.length} misiones`,contDead:"Esa partida terminó. Empieza de nuevo.",
  langQuick:"🌐 English",
  flavor:{D:["Solo un escritorio. El monitor te juzga igual.","El escritorio de un colega. Su kombucha, sus reglas."],K:["La barra de café. Tierra sagrada.","La cafetera. Ha visto cosas."],P:["Una planta en maceta. Hace lo que puede.","El ficus de la oficina. Moral estructural."],"#":["Una pared. Argumento sólido.","Eso es una pared. Hasta las leyendas respetan las paredes."],"+":["Una puerta. Se abre caminando a través de ella. Tecnología.","Puerta detectada. Puedes pasar."],B:["La fachada del edificio. Sólida. Corporativa.","Ladrillo. Estaba aquí antes que tú y seguirá después."],F:["Cerca de obra. Casco obligatorio más allá."],G:["Vigas de acero. El futuro tiene andamios."],C:["Un cono de tráfico. Respétalo."],X:["🚧 En construcción — La Cocina (restaurante), El Mercado (abarrotes) y La Obra (oficina de construcción) abren aquí pronto."],T:["Una mesa del comedor. El mantel no es negociable.","Reservada. Probablemente para Canela."],W:["El cuarto frío. El pronóstico de Chuy está pegado ahí. Es ley.","Almacén frío. Donde los márgenes viven o mueren."],V:["La estufa. Seis quemadores de diplomacia de consomé.","Caliente. Dominio de Chuy. Pregunta antes de tocar."],A:["Una mesa de dibujo. Primero el boceto a mano, luego el render con IA — el criterio sigue siendo humano.","Trabajo en curso. Mide dos veces, promptea una."],U:["El muro de planos. Los planos: la salida estructurada original.","Cada edificio de esta calle fue primero un dibujo aquí."],Q:["La fachada de La Cocina. El toldo solito sube la plusvalía de la cuadra.","¿Hueles eso? Es el consomé de Rosa llamándote."],J:["Una jacaranda. La ciudad las planta; la ciudad discute por los pétalos.","Sombra de jacaranda. Gratis, y mejor que cualquier sala de juntas."]}
 }
};
