# El Changarrito — the town's ledger

*Opened 2026-09-07 with block one, on Don Güero's recommendation (#69): a second world keeps a
bible (`docs/story/el-changarrito.md`) and a ledger. This is the ledger — districts, frontage,
what is pending, what was decided. Meridian's own is `docs/CITY.md`; nothing here touches it.*

## Districts

| District | Kind of work it houses | Block | State |
|---|---|---|---|
| El barrio de las peticiones | the asks — the things the owner wants built | one | **built `ch-v23`** |
| El barrio de las decisiones | the decisions waiting on the owner's word | two | gate reserved at (1,0), not built |
| El barrio de los bugs | the bugs | three | not sited |

## The houses of block one — the human-friendly label on every building

The address is a label in plain words (owner, 2026-09-07: *"put a human friendly label as to
what type of issue or work is being done… for buildings too"*). Every house wears it on the
board beside its door, in its clerk's first line, and in the index.

| House | Label | Door | Shell it reuses | Clerk |
|---|---|---|---|---|
| El Anexo de la Ventanilla | `work: records & forms` | `$` (4,0) | Nolasco's | Doña Remedios |
| La Obra | `work: rooms & stairs` | `O` (19,0) | La Obra · Studio | Doña Cuca |
| El Motor | `work: the engine` | `%` (25,0) | Taller Herrera | Beto Bujía |
| La Papelería | `work: docs & templates` | `@` (6,8) | La Espiga | Chuy "Copias" |
| El Estudio de Pili | `work: how it looks` | `M` (14,8) | El Mercado | Pili |
| La Cocina de Meridian | `work: Meridian's story` | `L` (22,8) | La Cocina | Nacho |

The shells are copied into the town's map file and cleaned to the engine's own tiles; Meridian's
content is untouched. Every door opens; the sign over each door counts its house; city hall's
counts the total.

## Growth history

- **2026-09-07 · BLOCK ONE — el barrio de las peticiones (`ch-v23`, engine untouched).** The
  street became a boulevard: the north rank keeps city hall, the stall and the park gate and
  gains El Anexo, La Obra and El Motor; a middle block at row 8 adds La Papelería, El Estudio
  de Pili and La Cocina de Meridian. Six clerks, three lines each. The town's own facade glyph
  `I` (art.js) replaces the grocery counter the street had been wearing as a face. The request
  form gained a *What kind of work* dropdown; the six work labels went on every open issue by
  hand the same day. Approved by the owner on #69 (*"have fun with the organization"*).

- **2026-09-07 · DOS CUERPOS (`ch-v24`, engine untouched).** The people moved in: the two
  heaviest of each house stand on its doorstep *and* at its counter, the next two inside only,
  the rest pinned on the house's board. Whoever has no work label waits in the plaza before
  the hoarding at x0–1 (six at most; the rest on city hall's board as *sin domicilio*). The
  hoarding's sign counts them, its board says BLOCK 2 SOON, its sheet lists them. A closed
  issue takes both bodies home; a label that lands announces the move ("#40 moved to El
  Anexo"); an empty house's board shows who went home lately, from a read of the closed issues.

## Pending — what block one still owes

- Block two's gate at (1,0); the decisions district sited by Don Güero when the owner asks.
- Pili's faces for the six houses (block one reuses Meridian's shells with new names).

## Decided

- 2026-09-07 — nested: a district per kind of work, a house per area (owner). People stand on
  the street and inside (owner). The address is a label (owner: "a human friendly label").
  Asks first; two out, four in; the board shows who went home; the town keeps this ledger
  (Don Güero's picks, owner: "have fun with the organization").
