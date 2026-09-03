/* ---------- DOCS — the paper this city produces ----------
   Pack-side, like everything with a name in it. The engine renders sections and knows
   nothing about bakeries: a document is a title, a template number, and a `build(R)` that
   turns the play record R into a list of sections.

   Two rules the owner set (2026-09-03):
   1. "your real answers" — a document is assembled from what you actually picked, and a
      field you never answered is LEFT BLANK, which is the templates' own convention.
   2. "make sure we also create realistic docs so we can export for ai consulting" — these
      mirror docs/templates/ 01-07 section for section, so a filled one can be copied
      straight into a client folder.

   R is handed over by the engine: {hero, dateStr, decisions[], districts[], done[], marks{}}
   Each decision: {quest, qi, npc, ask, pick, concept, why, result}. */

const DX = (en, es) => (typeof lang !== "undefined" && lang === "es") ? es : en;

const DOCUI = {
  en: { read: "📄 Read it", close: "✕ Close", copy: "📋 Copy", dl: "⬇️ Download (.md)",
        copied: "Copied — paste it wherever the work lives.", open: "Open",
        blankPaper: "Blank paper", tmplLb: n => "Template " + n,
        preparedBy: "Prepared by", nothingYet: "Nothing is pinned here yet." },
  es: { read: "📄 Leerlo", close: "✕ Cerrar", copy: "📋 Copiar", dl: "⬇️ Descargar (.md)",
        copied: "Copiado — pégalo donde viva el trabajo.", open: "Abrir",
        blankPaper: "Papel en blanco", tmplLb: n => "Plantilla " + n,
        preparedBy: "Preparado por", nothingYet: "Todavía no hay nada puesto aquí." },
};

/* where a readable thing stands. A wall poster is read from the tile in front of it. */
const READS = [
  { world: "f2", x: 10, y: 1, doc: "file" },      /* the old lead's desk — still logged in */
  { world: "f2", x: 2,  y: 0, doc: "labs" },
  { world: "f2", x: 4,  y: 0, doc: "mercado" },
  { world: "f2", x: 6,  y: 0, doc: "taller" },
  { world: "f2", x: 13, y: 0, doc: "espiga" },
  { world: "f2", x: 15, y: 0, doc: "velazquez" },
  { world: "f2", x: 17, y: 0, doc: "nolasco" },
];

/* ---- helpers every document shares ---- */
const dDistrict = (R, id) => R.districts.find(d => d.id === id) || { quests: [], closed: false, grade: 0 };
const dCalls = (R, id) => { const q = dDistrict(R, id).quests;
  return R.decisions.filter(e => q.indexOf(e.qi) >= 0); };
/* the answer of record for a question is the LAST time you answered it — the retry counts */
const dFinal = calls => { const by = {}, order = [];
  calls.forEach(e => { const k = e.quest + "|" + e.ask; if (!by[k]) order.push(k); by[k] = by[k] ? by[k].concat([e]) : [e]; });
  return order.map(k => ({ rows: by[k], last: by[k][by[k].length - 1], tries: by[k].length })); };
const dOk = calls => { const f = dFinal(calls); return f.filter(x => x.last.result === "ok").length + "/" + f.length; };
const dClean = calls => { const f = dFinal(calls);
  return f.length ? Math.round(f.filter(x => x.tries === 1 && x.last.result === "ok").length / f.length * 100) + "%" : "—"; };
const dConcepts = calls => [...new Set(calls.map(e => e.concept).filter(Boolean))];
const dHead = (R, d, place) => [
  { kv: [
    [DX("Client", "Cliente"), place],
    [DX("Engagement", "Encargo"), (d.industry || "") + (d.industry && d.role ? " · " : "") + (d.role || "")],
    [DX("Prepared by", "Preparado por"), R.hero],
    [DX("Date", "Fecha"), R.dateStr],
    [DX("Status", "Estado"), d.closed ? DX("Closed", "Cerrado") : DX("In progress", "En curso")],
  ] },
];
/* a district you have not worked yet is blank paper, and says so without listing anything */
const dBlank = (R, place) => [
  { h: DX("Blank paper", "Papel en blanco") },
  { p: DX("Pinned up ready, nothing on it. This page fills itself with what you decide at " + place + " — the questions you were asked, the answers you gave, and why.",
         "Puesto ahí listo, sin nada. Esta hoja se llena sola con lo que decidas en " + place + " — las preguntas que te hicieron, lo que contestaste, y por qué.") },
];
/* the decisions, as the form's own body */
const dBody = calls => dFinal(calls).map(g => ({ q: {
  ask: g.last.ask, pick: g.last.pick, why: g.last.why,
  concept: g.last.concept, r: g.last.result, tries: g.tries } }));

const DOCS = {

  /* ---------- 05 · Decision Log — Meridian Labs ---------- */
  labs: {
    tmpl: "05",
    title: { en: "Decision Log — Meridian Labs", es: "Bitácora de decisiones — Meridian Labs" },
    sub: { en: "The running record of calls and why", es: "El registro corrido de las decisiones y su porqué" },
    build: R => { const d = dDistrict(R, "principal"), calls = dCalls(R, "principal");
      if (!calls.length) return dBlank(R, DX("Meridian Labs", "Meridian Labs"));
      return [].concat(dHead(R, d, "Meridian Labs"),
        [{ h: DX("Why this log exists", "Para qué es esta bitácora") },
         { p: DX("A decision nobody wrote down gets re-argued every quarter. This is what was asked, what was chosen, and the reasoning at the time — not the reasoning we would like to have had.",
                "Una decisión que nadie apuntó se vuelve a discutir cada trimestre. Aquí está lo que se preguntó, lo que se decidió, y el razonamiento de ese momento — no el que nos gustaría haber tenido.") },
         { h: DX("The calls", "Las decisiones") }],
        dBody(calls),
        [{ h: DX("What this engagement covered", "Qué cubrió este encargo") },
         { kv: [[DX("Calls of record", "Decisiones de registro"), String(dFinal(calls).length)],
                [DX("Right first time", "Bien a la primera"), dClean(calls)],
                [DX("Concepts exercised", "Conceptos ejercitados"), String(dConcepts(calls).length)]] },
         { t: { head: [DX("Concept", "Concepto")], rows: dConcepts(calls).map(c => [c]) } },
         { note: DX("Fill in before sending: who owns each call now, and the date it gets revisited.",
                   "Antes de enviarlo: quién es dueño de cada decisión ahora, y la fecha en que se revisa.") },
         { blank: DX("Owner of record", "Responsable") },
         { blank: DX("Next review", "Próxima revisión") }]);
    } },

  /* ---------- 02 · Recommendation Memo — El Mercado Robles ---------- */
  mercado: {
    tmpl: "02",
    title: { en: "Recommendation Memo — El Mercado Robles", es: "Memo de recomendación — El Mercado Robles" },
    sub: { en: "What to build first, and why not the rest", es: "Qué construir primero, y por qué no lo demás" },
    build: R => { const d = dDistrict(R, "mercado"), calls = dCalls(R, "mercado");
      if (!calls.length) return dBlank(R, DX("El Mercado", "El Mercado"));
      return [].concat(dHead(R, d, "El Mercado Robles"),
        [{ h: DX("What you asked for", "Lo que nos pidió") },
         { p: DX("Eleven wants on a list on the counter: an order app, a robot for the phone, something that knows when the tomatoes turn, Instagram, a machine that says what to buy on Monday, a website, and the printer.",
                "Once deseos en una lista sobre el mostrador: una app de pedidos, un robot para el teléfono, algo que sepa cuándo se pican los tomates, Instagram, una máquina que diga qué comprar el lunes, una página web, y la impresora.") },
         { h: DX("What we recommend, and the order", "Lo que recomendamos, y en qué orden") }],
        dBody(calls),
        [{ h: DX("What we are NOT doing yet, and why", "Lo que NO vamos a hacer todavía, y por qué") },
         { p: DX("Everything else on the list stays on the list. It is not refused — it is queued behind the one thing that costs the most hours in a normal week.",
                "Todo lo demás de la lista se queda en la lista. No se rechaza — se forma detrás de lo que cuesta más horas en una semana normal.") },
         { h: DX("How we will know it worked", "Cómo vamos a saber si sirvió") },
         { blank: DX("The number, in the client's own units", "El número, en las unidades del cliente") },
         { blank: DX("Measured by", "Medido por") },
         { blank: DX("Reviewed on", "Se revisa el") }]);
    } },

  /* ---------- 06 · Process & Exception Map — Taller Herrera ---------- */
  taller: {
    tmpl: "06",
    title: { en: "Process & Exception Map — Taller Herrera", es: "Mapa de proceso y excepciones — Taller Herrera" },
    sub: { en: "How work flows, who signs, which step cannot be taken back", es: "Cómo fluye el trabajo, quién firma, qué paso no se puede deshacer" },
    build: R => { const d = dDistrict(R, "taller"), calls = dCalls(R, "taller");
      if (!calls.length) return dBlank(R, DX("Taller Herrera", "Taller Herrera"));
      return [].concat(dHead(R, d, "Taller Herrera"),
        [{ h: DX("What moves through it", "Qué pasa por aquí") },
         { p: DX("A car: street → write-up → lift → parts → sign-off → the call that says it is ready. The shop is bottlenecked by paper, not by hands.",
                "Un carro: calle → hoja del trabajo → rampa → refacciones → firma → la llamada que avisa que ya está. Al taller lo frena el papel, no las manos.") },
         { h: DX("The calls that shaped the map", "Las decisiones que formaron el mapa") }],
        dBody(calls),
        [{ h: DX("The steps that cannot be taken back", "Los pasos que no se pueden deshacer") },
         { t: { head: [DX("Step", "Paso"), DX("Why", "Por qué"), DX("Who owns it", "Quién es dueño")],
                rows: [[DX("Money out / a part ordered", "Dinero que sale / pieza pedida"), DX("The deposit on the old part is paid twice if it is wrong", "El core se paga dos veces si va mal"), ""],
                       [DX("A number sent to a customer", "Un número que sale al cliente"), DX("An estimate is a promise with a price on it", "Un presupuesto es una promesa con precio"), ""],
                       [DX("The sign-off on the write-up", "La firma de la hoja"), DX("It is where the master mechanic reads the job before the customer does", "Ahí el maestro lee el trabajo antes que el cliente"), ""]] } },
         { note: DX("Circle these on the copy that hangs by the counter. Nothing on this list runs without a person hitting send.",
                   "Circula estos en la copia que va junto al mostrador. Nada de esta lista corre sin que una persona le dé enviar.") },
         { h: DX("The wall copy", "La copia de la pared") },
         { blank: DX("Where it hangs", "Dónde se cuelga") },
         { blank: DX("Who updates it when a step changes", "Quién la actualiza cuando cambia un paso") }]);
    } },

  /* ---------- 01 · Process Discovery Notes — Panadería La Espiga ---------- */
  espiga: {
    tmpl: "01",
    title: { en: "Process Discovery Notes — Panadería La Espiga", es: "Notas de descubrimiento — Panadería La Espiga" },
    sub: { en: "Map the work before you understand it", es: "Mapea el trabajo antes de entenderlo" },
    build: R => { const d = dDistrict(R, "espiga"), calls = dCalls(R, "espiga");
      if (!calls.length) return dBlank(R, DX("La Espiga", "La Espiga"));
      return [].concat(dHead(R, d, "Panadería La Espiga"),
        [{ h: DX("Where the number is born", "Dónde nace el número") },
         { p: DX("Not at the register. At 3:45 in the morning, in a decision one person makes about how much to bake, from a strip of paper somebody else wrote at close.",
                "No en la caja. A las 3:45 de la mañana, en una decisión que toma una persona sobre cuánto hornear, a partir de una tira de papel que otra escribió al cerrar.") },
         { h: DX("What we found, and what we decided", "Lo que encontramos, y lo que decidimos") }],
        dBody(calls),
        [{ h: DX("The count nobody was asked for", "La cuenta que nadie pidió") },
         { p: DX("The data you need is usually already being collected by the person nobody asked. Add the missing column; do not add a new system.",
                "Los datos que necesitas casi siempre ya los junta la persona a la que nadie le preguntó. Agrega la columna que falta; no agregues un sistema nuevo.") },
         { blank: DX("Who counts what, and when", "Quién cuenta qué, y cuándo") },
         { blank: DX("The column we added", "La columna que agregamos") },
         { blank: DX("Waste, before and after", "La merma, antes y después") }]);
    } },

  /* ---------- 04 · Pilot Review — Limpieza Velázquez ---------- */
  velazquez: {
    tmpl: "04",
    title: { en: "Pilot Review — Limpieza Velázquez", es: "Revisión de piloto — Limpieza Velázquez" },
    sub: { en: "Did it pay off — and should we stop?", es: "¿Valió la pena — y deberíamos parar?" },
    build: R => { const d = dDistrict(R, "velazquez"), calls = dCalls(R, "velazquez");
      if (!calls.length) return dBlank(R, DX("Limpieza Velázquez", "Limpieza Velázquez"));
      return [].concat(dHead(R, d, "Limpieza Velázquez"),
        [{ h: DX("Did it matter", "¿Sirvió?") },
         { p: DX("Report the business number, in their units, not yours. Model metrics answer “is it behaving”; the client asked “did it matter”.",
                "Reporta el número del negocio, en sus unidades, no en las tuyas. Las métricas del modelo contestan “¿se está portando bien?”; el cliente preguntó “¿sirvió?”.") },
         { blank: DX("What we said we would move / before / now", "Lo que dijimos que íbamos a mover / antes / ahora") },
         { h: DX("The calls behind it", "Las decisiones detrás") }],
        dBody(calls),
        [{ h: DX("What people actually did", "Lo que la gente de veras hizo") },
         { p: DX("Adoption is the deliverable — a tool nobody uses saved nothing. This crew does not sit at desks, and it was rolled out one crew at a time, in their language.",
                "La adopción es el entregable — una herramienta que nadie usa no ahorró nada. Esta cuadrilla no está en escritorios, y salió cuadrilla por cuadrilla, en su idioma.") },
         { blank: DX("Used as intended / worked around / stopped using", "La usaron como iba / le dieron la vuelta / la dejaron") },
         { h: DX("Recommendation", "Recomendación") },
         { p: DX("Keep it as is · keep it with changes · hand it over · turn it off. Say it plainly, and say what we keep from it either way.",
                "Dejarla igual · dejarla con cambios · entregarla · apagarla. Dilo claro, y di qué nos quedamos de ella de cualquier modo.") },
         { blank: DX("Our recommendation, and why", "Nuestra recomendación, y por qué") },
         { note: DX("This is the hardest deliverable to write honestly: a pilot that did not pay off is information, and killing it cheaply is a win you should be able to say out loud.",
                   "Este es el entregable más difícil de escribir con honestidad: un piloto que no pagó es información, y matarlo barato es una victoria que deberías poder decir en voz alta.") }]);
    } },

  /* ---------- 07 · Answers / Refuses / Hands to — Nolasco Tax & Notario ---------- */
  nolasco: {
    tmpl: "07",
    title: { en: "What It Answers, What It Refuses, Who It Hands To — Nolasco Tax & Notario",
             es: "Qué contesta, qué se niega a contestar, a quién lo pasa — Nolasco Tax & Notario" },
    sub: { en: "Scope as three lists, tested, in both languages", es: "El alcance en tres listas, probado, en los dos idiomas" },
    build: R => { const d = dDistrict(R, "nolasco"), calls = dCalls(R, "nolasco");
      if (!calls.length) return dBlank(R, DX("Nolasco Tax & Notario", "Nolasco Tax & Notario"));
      return [].concat(dHead(R, d, "Nolasco Tax & Notario"),
        [{ h: DX("Why this document exists", "Para qué es este documento") },
         { p: DX("An assistant is about to speak to customers in the client's name. Scope is a list, not a mood: an instruction nudges, a gate stops. A refusal that names nobody is a hang-up.",
                "Un asistente va a hablarle a los clientes en nombre del despacho. El alcance es una lista, no un estado de ánimo: una instrucción sugiere, una compuerta detiene. Una negativa que no nombra a nadie es colgar el teléfono.") },
         { h: DX("The calls that drew the three lists", "Las decisiones que trazaron las tres listas") }],
        dBody(calls),
        [{ h: DX("What it answers", "Qué contesta") },
         { blank: DX("Question type / where the true answer lives", "Tipo de pregunta / dónde vive la respuesta verdadera") },
         { h: DX("What it refuses", "Qué se niega a contestar") },
         { blank: DX("Question type / the refusal, in both languages", "Tipo de pregunta / la negativa, en los dos idiomas") },
         { h: DX("Who it hands to", "A quién lo pasa") },
         { blank: DX("Goes to / how / with what attached / by when", "Va con / cómo / con qué adjunto / para cuándo") },
         { note: DX("Test it with the questions people actually ask, including the ones that are almost on the list. Write down what it said, not what it should have said.",
                   "Pruébalo con las preguntas que la gente de veras hace, incluyendo las que casi están en la lista. Apunta lo que dijo, no lo que debió decir.") }]);
    } },

  /* ---------- 03 · Acceptance Criteria — lives on the machine ---------- */
  accept: {
    tmpl: "03",
    title: { en: "Acceptance Criteria & Error Budget", es: "Criterios de aceptación y presupuesto de error" },
    sub: { en: "What “working” means before you build it", es: "Qué quiere decir “que funcione” antes de construirlo" },
    build: R => {
      const all = R.decisions.filter(e => /label|etiqueta|abuela|say it|así de cierto|churro/i.test(e.quest || ""));
      return [].concat(
        [{ h: DX("Why it is written first", "Por qué se escribe primero") },
         { p: DX("A success metric written after launch is a story, not a measurement. Name what working means in a number somebody already tracks, and name what a miss costs, before a line is built.",
                "Una métrica de éxito escrita después del lanzamiento es un cuento, no una medición. Nombra qué quiere decir que funcione, en un número que alguien ya lleva, y qué cuesta fallar, antes de construir una sola línea.") },
         { h: DX("The bar", "La vara") },
         { blank: DX("It is working when ___ (their number, their units)", "Funciona cuando ___ (su número, sus unidades)") },
         { blank: DX("A miss costs ___ · caught by ___", "Fallar cuesta ___ · lo detecta ___") },
         { blank: DX("We turn it off if ___", "La apagamos si ___") }],
        all.length ? [{ h: DX("Where you argued this in the field", "Dónde discutiste esto en la calle") }].concat(dBody(all)) : []);
    } },

  /* ---------- the machine on the old lead's desk ---------- */
  file: {
    tmpl: "",
    title: { en: "The desk of the AI lead who left", es: "El escritorio del líder de IA que se fue" },
    sub: { en: "Still logged in. Nobody cleared it.", es: "Sigue con la sesión abierta. Nadie lo limpió." },
    build: R => {
      const words = [
        ["the assistant / el asistente", DX("The thing you build for a business. It is not smart. It is well-fed: it can only answer from what somebody put in front of it.",
                                           "La cosa que le construyes a un negocio. No es lista. Está bien alimentada: nada más contesta con lo que alguien le puso enfrente.")],
        ["the sheet / la hoja", DX("One page a business can read from the door. If it needs a login to read, it is not the sheet.",
                                  "Una hoja que el negocio puede leer desde la puerta. Si necesita contraseña para leerse, no es la hoja.")],
        ["the book / el libro", DX("The paper record somebody keeps by hand because the system never held it. Read it before you replace it — every column is an exception that once went wrong.",
                                  "El registro de papel que alguien lleva a mano porque el sistema nunca lo guardó. Léelo antes de reemplazarlo — cada columna es una excepción que alguna vez salió mal.")],
        ["the workaround / el atajo", DX("Somebody already solved this badly-but-correctly. It IS the requirements document.",
                                        "Alguien ya lo resolvió mal-pero-bien. ESE es el documento de requerimientos.")],
        ["par / el par", DX("The fixed number of a thing you make each day, so the blame stops landing on whoever guessed.",
                           "El número fijo de algo que haces cada día, para que la culpa deje de caerle al que adivinó.")],
        ["merma", DX("What you threw away. The bakery's own word, in both languages, and the only honest measure of a forecast.",
                    "Lo que tiraste. La palabra de la panadería, y la única medida honesta de un pronóstico.")],
        ["comeback / el regreso", DX("A car that comes back. The number a shop is really run on.",
                                    "Un carro que regresa. El número con el que de veras se maneja un taller.")],
        ["core charge / el core", DX("The deposit on the old part. Send the wrong one back and you pay it twice.",
                                    "El depósito de la pieza vieja. Manda la equivocada de regreso y lo pagas dos veces.")],
        ["punch list / la lista de faltantes", DX("What is still not done, written by the person who will be blamed for it.",
                                                 "Lo que todavía falta, escrito por quien va a cargar con la culpa.")],
        ["acknowledgment / el reconocimiento de firma", DX("A notary's stamp says you signed in front of them. It does not say the paper is true.",
                                                          "El sello del notario dice que firmaste frente a él. No dice que el papel sea cierto.")],
      ];
      const owned = R.districts.filter(d => d.closed || dCalls(R, d.id).length);
      return [
        { h: DX("A note taped inside the lid", "Una nota pegada por dentro de la tapa") },
        { p: DX("“If you are reading this, they gave you my desk. Three things I got wrong, in order: I built the biggest thing on the list because it was the biggest thing on the list. I automated the step where the money leaves. And I never once wrote down what I meant by working. — the one before you”",
               "“Si estás leyendo esto, te dieron mi escritorio. Tres cosas en las que me equivoqué, en orden: construí lo más grande de la lista porque era lo más grande de la lista. Automaticé el paso donde sale el dinero. Y ni una sola vez apunté qué quería decir con que funcionara. — el de antes”") },
        { h: DX("The file", "El expediente") },
        { p: DX("Everything this office has produced. The ones on the wall are here too — the wall is the shortcut, this is the file.",
               "Todo lo que ha producido esta oficina. Las de la pared también están aquí — la pared es el atajo, esto es el expediente.") },
        { docs: ["labs", "mercado", "taller", "espiga", "velazquez", "nolasco", "accept"] },
        { h: DX("The words, so you can look them up twice", "Las palabras, para poder buscarlas dos veces") },
        { p: DX("Every one of these was given to you by the person who needed it, in the middle of a job. They are the trade's own language, not ours.",
               "Cada una te la dio la persona que la necesitaba, a media chamba. Son el idioma del oficio, no el nuestro.") },
        { t: { head: [DX("Word", "Palabra"), DX("What it means", "Qué quiere decir")], rows: words } },
        { h: DX("Where you have worked", "Dónde has trabajado") },
        { t: { head: [DX("Business", "Negocio"), DX("Practising", "Practicando"), DX("Calls of record", "Decisiones"), DX("Right first time", "Bien a la primera")],
               rows: owned.length ? owned.map(d => [(d.industry || d.id), (d.role || ""), String(dFinal(dCalls(R, d.id)).length), dClean(dCalls(R, d.id))])
                                  : [[DX("— nothing yet —", "— nada todavía —"), "", "", ""]] } },
      ];
    } },
};
