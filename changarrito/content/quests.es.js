/* El Changarrito — la misma misión, en español, en lockstep. */
const FQES={npc:"fred",title:"🐾 Los archivos de Frederick",start:"a",nodes:{
 a:{say:"Frederick deja una carpeta a tus pies. Está vacía. Se ve orgulloso de todos modos.",
    q:"¿Qué haces con una carpeta vacía?",
    ch:[{t:"Guardarla para el primer permiso",out:{r:"ok",concept:"Un lugar para las cosas",why:"Todo expediente empieza vacío. La carpeta es la promesa.",beat:"Mueve la cola."}}]}}};
const QES=[
 {npc:"guero",title:"El primer permiso",start:"a",nodes:{
  a:{say:"Bienvenido al changarrito. Cada persona en esa calle es algo que tú escribiste — una petición, una decisión, un bug. Acércate, lee lo que traen, y haz la cosa allá afuera en el mundo. Cuando se cierra, se van a su casa.",
     codex:"La calle es el backlog. Una persona con nombre trae una tarea de verdad; la gente del barrio trae las chicas; las notas van al tablero; los animales no traen nada.",
     q:"¿Por dónde empiezas?",
     ch:[{t:"Caminar la calle y leer lo que trae la gente",out:{r:"ok",concept:"La calle es el backlog",why:"Leer primero es todo el método. La lista está en la gente, no en una pantalla.",beat:"Don Güero señala la puerta con la cabeza."}},
         {t:"Pedirle una lista",out:{r:"mid",concept:"Sin listas",why:"No lleva una. Una persona con algo que decirte es una invitación; una lista es tarea.",beat:"“Allá afuera”, dice, y vuelve a su café."}}]}}}
];
