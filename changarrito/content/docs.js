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
        preparedBy: "Prepared by", nothingYet: "Nothing is pinned here yet.", },
  es: { read: "📄 Leerlo", close: "✕ Cerrar", copy: "📋 Copiar", dl: "⬇️ Descargar (.md)",
        copied: "Copiado — pégalo donde viva el trabajo.", open: "Abrir",
        blankPaper: "Papel en blanco", tmplLb: n => "Plantilla " + n,
        preparedBy: "Preparado por", nothingYet: "Todavía no hay nada puesto aquí.", },
};

/* where a readable thing stands. A wall poster is read from the tile in front of it. */
/* what is readable on the street: the board on city hall's wall, beside la ventanilla */
const READS = [
  { world: "st", x: 8, y: 0, doc: "board" },
  { world: "st", x: 1, y: 0, doc: "next" },   /* the hoarding: block two's gate, and who waits for it */
  /* #69: each house's board, on the wall just west of its door, read from the tile in front of it */
  { world: "an", x: 7, y: 7, doc: "b_an" }, { world: "pp", x: 9, y: 9, doc: "b_pp" }, { world: "es", x: 9, y: 11, doc: "b_es" },
  { world: "mo", x: 9, y: 11, doc: "b_mo" }, { world: "ob", x: 9, y: 9, doc: "b_ob" }, { world: "co", x: 9, y: 11, doc: "b_co" }
];
/* the documents are built live from the record (content/record.js) — every open is fresh */
const DOCS = {
  window: {
    title: { en: "What the city has on file", es: "Lo que la ciudad tiene en el expediente" },
    sub:   { en: "Filed things only. Past tense. Ask and she answers.", es: "Solo lo archivado. En pasado. Pregunta y contesta." },
    build: () => RECORDSRC.windowDoc()
  },
  board: {
    title: { en: "The board — notes", es: "El tablero — notas" },
    sub:   { en: "The small things, pinned. Nobody stands for these.", es: "Las cosas chicas, prendidas. Nadie las carga." },
    build: () => RECORDSRC.boardDoc()
  },
  /* ch-v14: the forms are documents too — one screen each, every field visible, cancel costs nothing */
  request: { title: { en: "File a request", es: "Presentar una petición" }, sub: { en: "The five headings every request reads by.", es: "Los cinco encabezados de toda petición." }, build: () => RECORDSRC.requestDoc() },
  signin:  { title: { en: "Sign in", es: "Identificarme" }, sub: { en: "A key for issues on this repo, kept in this browser only.", es: "Una llave para issues de este repo, solo en este navegador." }, build: () => RECORDSRC.signInDoc() },
  filter:  { title: { en: "Narrow the street", es: "Acotar la calle" }, sub: { en: "Labels and a word. Empty means everyone.", es: "Etiquetas y una palabra. Vacío es todos." }, build: () => RECORDSRC.filterDoc() },
  guero:   { title: { en: "Don Güero · the planner", es: "Don Güero · el planificador" }, sub: { en: "Ask him to build things. His answers come back as feedback on your requests.", es: "Pídele que construya. Sus respuestas vuelven como comentarios en tus peticiones." }, build: () => RECORDSRC.gueroDoc() },
  index:   { title: { en: "The index", es: "El índice" }, sub: { en: "Everything the town knows, by tag. Pick a category or type a word; walk there, or file about it.", es: "Todo lo que el pueblo sabe, por etiqueta. Elige una categoría o escribe una palabra; camina allá, o presenta algo sobre eso." }, build: () => RECORDSRC.indexDoc() },
  next: { title: { en: "Block two — coming", es: "La segunda cuadra — viene" }, sub: { en: "Who waits here with no address.", es: "Quiénes esperan aquí sin domicilio." }, build: () => RECORDSRC.nextDoc() },
  /* #69, block one: the six clerks and the six house boards, built live from the record */
  h_an: { title: { en: "Doña Remedios · the annex", es: "Doña Remedios · el anexo" }, sub: { en: "Records & forms. Filed things only.", es: "Registros y formularios. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("an") },
  h_pp: { title: { en: "Chuy · the paper shop", es: "Chuy · la papelería" }, sub: { en: "Docs & templates. Filed things only.", es: "Documentos y plantillas. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("pp") },
  h_es: { title: { en: "Pili · the paint shop", es: "Pili · el estudio" }, sub: { en: "How it looks. Filed things only.", es: "Cómo se ve. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("es") },
  h_mo: { title: { en: "Beto Bujía · the engine room", es: "Beto Bujía · el cuarto del motor" }, sub: { en: "The engine. Filed things only.", es: "El motor. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("mo") },
  h_ob: { title: { en: "Doña Cuca · the works", es: "Doña Cuca · la obra" }, sub: { en: "Rooms & stairs. Filed things only.", es: "Cuartos y escaleras. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("ob") },
  h_co: { title: { en: "Nacho · Meridian's kitchen", es: "Nacho · la cocina de Meridian" }, sub: { en: "Meridian's story. Filed things only.", es: "La historia de Meridian. Solo lo archivado." }, build: () => RECORDSRC.clerkDoc("co") },
  b_an: { title: { en: "The annex's board", es: "El tablero del anexo" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("an") },
  b_pp: { title: { en: "The paper shop's board", es: "El tablero de la papelería" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("pp") },
  b_es: { title: { en: "The paint shop's board", es: "El tablero del estudio" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("es") },
  b_mo: { title: { en: "The engine room's board", es: "El tablero del motor" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("mo") },
  b_ob: { title: { en: "The works' board", es: "El tablero de la obra" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("ob") },
  b_co: { title: { en: "The kitchen's board", es: "El tablero de la cocina" }, sub: { en: "Everything with this address.", es: "Todo con esta dirección." }, build: () => RECORDSRC.houseBoardDoc("co") },
  /* el pregonero's sheet: the commands, in order, with Copy at the bottom of the reader */
  how: {
    title: { en: "How to open the town", es: "Cómo abrir el pueblo" },
    sub:   { en: "Three lines in the terminal. Copy takes them all.", es: "Tres líneas en la terminal. Copiar se las lleva todas." },
    build: () => {
      const es = lang === "es", v = typeof GAMEV === "string" ? GAMEV : "";
      return [
        { h: es ? "Cada día, para abrir" : "Every day, to open" },
        { p: es ? "En la Terminal, una línea a la vez:" : "In Terminal, one line at a time:" },
        { kv: [["1", "cd ~/code/meridian-quest"], ["2", "git pull"], ["3", "python3 -m http.server 8765 --bind 127.0.0.1"]] },
        { p: es ? "Luego en el navegador: http://127.0.0.1:8765/changarrito/" : "Then in the browser: http://127.0.0.1:8765/changarrito/" },
        { h: es ? "Para actualizar" : "To update" },
        { p: es ? "Es la línea 2. `git pull` trae lo que se fusionó. Si el servidor ya corre, no lo pares; solo recarga la página." : "It is line 2. `git pull` fetches whatever was merged. If the server is already running, leave it; just reload the page." },
        { h: es ? "Si se ve raro" : "If it looks wrong" },
        { p: es ? "Recarga fuerte: ⌘⇧R. Si sigue igual, ventana privada. La pantalla de título debe decir: " + v : "Hard refresh: ⌘⇧R. If it still looks the same, a private window. The title screen should read: " + v },
        { p: es ? "Para parar el servidor: Ctrl-C en la Terminal." : "To stop the server: Ctrl-C in Terminal." },
        { h: es ? "Dónde vive" : "Where it lives" },
        { p: es ? "~/code/meridian-quest en tu laptop — una copia de main. Nada de esto sale de tu máquina." : "~/code/meridian-quest on your laptop — a copy of main. None of this leaves your machine." }
      ];
    }
  }
};
