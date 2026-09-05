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
const READS = []; /* the board and the window arrive in 2b */
const DOCS = {};
