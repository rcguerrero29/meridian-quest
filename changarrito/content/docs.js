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
  { world: "st", x: 8, y: 0, doc: "board" }
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
  index:   { title: { en: "The index", es: "El índice" }, sub: { en: "Everything the town knows, by tag. Pick a category or type a word; walk there, or file about it.", es: "Todo lo que el pueblo sabe, por etiqueta. Elige una categoría o escribe una palabra; camina allá, o presenta algo sobre eso." }, build: () => RECORDSRC.indexDoc() },
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
