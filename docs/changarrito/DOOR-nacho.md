# El Changarrito — the front door

*Nacho, 2026-09-08. Commissioned after Rosa's finding 8: the town's door describes Meridian.
Copy only — every line below is a proposal for the owner, nothing is applied.*

## What the door should feel like

Meridian's door is a job offer: a hero, a missing predecessor, a ladder from Junior to AI Legend,
a report you walk out with. Right for Meridian, wrong here twice over — the town is not a career,
and the person opening it wrote everything behind it.

The town's door should feel like putting your hand on a gate you built. Nothing gets introduced,
because you wrote all of it. Nothing gets promised, because the town cannot give you anything you
did not already put there. What it owes you is **a fact and a direction**: here is what you wrote
down, here is the shape it got sorted into, the window is at the end of the street, nobody out here
is keeping score. Dry, warm, a little wry — a clerk who likes you and still needs the form.

Two tests for every line: *could the town actually deliver what this sentence implies?* and *would
it still be true on the worst Tuesday of the year?*

The class picker stays. All it actually does is set your starting shirt colour
(`engine/engine.js`, `SHIRTS[b.dataset.c]`), so it gets words that say exactly that.

## A. The door and the first minute — 13 lines

| key | current EN | new EN | new ES |
|---|---|---|---|
| `in2` | "The office is a world. Roam it — hallways, the kitchen, the corner offices. Coworkers with a ❗ have quests…" | "Six houses, one kind of work each; a window at city hall where the record is read; a board for whatever is waiting. People stand at the house their thing belongs to. Do it out in the world and they go home." | "Seis casas, un tipo de trabajo cada una; una ventanilla en el palacio donde se lee el registro; un tablero con lo que espera. Cada quien se para en la casa que le toca. Resuélvelo allá afuera y se van a su casa." |
| `in3` | "Every call goes in your file… Ladder: Junior → Delivery Lead → Senior Lead → AI Legend." | "Nothing here scores you. The town reads your list when it opens and after every write, keeps the last good copy when the wire is down, and can only ever touch issues — never code. Sign in at the window when you want to write something back." | "Aquí nadie te califica. El pueblo lee tu lista al abrir y después de cada escritura, se queda con la última copia buena cuando no hay señal, y solo puede tocar issues — nunca código. Firma en la ventanilla cuando quieras escribir algo." |
| `in4` | "Choose your class:" | "Pick one. All it decides is the colour of your shirt:" | "Escoge uno. Lo único que decide es el color de tu camisa:" |
| `classes.architect` | "You see systems. the town's diagrams fear you." | "You want the street sorted before you walk it." | "Quieres la calle ordenada antes de caminarla." |
| `classes.diplomat` | "Bilingual, unflappable. CFOs sign things near you." | "You answer people — even the ones you wrote at midnight." | "Le contestas a la gente — hasta a los que escribiste a medianoche." |
| `classes.operator` | "You ship. Production logs whisper your name." | "You close things. Two of them will come back." | "Tú cierras cosas. Dos van a regresar." |
| `contBtn` | "▶ Continue as {n} — {x} XP, {d}/{q} quests" | "▶ Walk out again as {n}" | "▶ Salir otra vez como {n}" |
| `tut2` | "Desks, plants and walls just block you — coworkers with a ❗ have quests. Walk up and Talk." | "Walls, plants and desks just block you — every person out here is something you wrote down. Walk up and Talk." | "Paredes, plantas y escritorios solo estorban — cada persona de aquí es algo que tú escribiste. Acércate y habla." |
| `hintJoy` | "…walk up to a ❗ coworker and Talk…" | "Joystick or arrow keys to walk · step up to anybody and Talk · ⚙️ to switch controls." | "Joystick o flechas para caminar · acércate a quien sea y habla · ⚙️ para cambiar controles." |
| `hintPad` | "…walk up to a ❗ coworker and Talk…" | "D-pad or arrow keys to walk · step up to anybody and Talk · ⚙️ to switch controls." | "Cruceta o flechas para caminar · acércate a quien sea y habla · ⚙️ para cambiar controles." |
| `lbAdm` | "…reshape the office" | "Admin mode — touch tiles to reshape the town" | "Modo admin — toca casillas para remodelar el pueblo" |
| `locs.hq` | "The stall" (ES untranslated) | "The stall" | "El changarrito" |
| `arrive.hq` | "The stall." (ES untranslated) | "The stall. Coffee on the counter, the door to the street, the stairs at the back." | "El changarrito. Café en la barra, la puerta a la calle, la escalera al fondo." |
| **`arrive.f2`** | **"Floor 2. North light, the wall where your work goes, and the old lead's machine still logged in on the desk."** | **"The loft. Bare on purpose — Don Güero built the stairs first; the room can wait."** | **"El tapanco. Vacío a propósito — Don Güero hizo primero la escalera; el cuarto puede esperar."** |

## B. The ladder, the verdict, the report

Don Güero's *The first permit* is the town's only quest and it is handed to you where you spawn,
so every one of these is reachable in minute one.

| key | current | new EN | new ES |
|---|---|---|---|
| `levels` | Junior → Delivery Lead → Senior Lead → AI LEGEND | New here · Known at the window · Has his own drawer · Knows everybody's paperwork | Nuevo en la calle · Ya lo conocen en la ventanilla · Ya tiene su propio cajón · Ya se sabe el papeleo de todos |
| `lvlUp` | "⬆ LEVEL UP — you are now " | "🗂️ La ventanilla updates your file — you are now " | "🗂️ La ventanilla actualiza tu expediente — ahora eres " |
| `okH` | "⚔️ QUEST COMPLETE" | "✅ FILED" | "✅ ARCHIVADO" |
| `midH` | "🟡 SHIPPED WITH INCIDENTS" | "◐ FILED WITH A NOTE" | "◐ ARCHIVADO CON NOTA" |
| `badH` | "💔 SLIP — reputation takes a hit" | "↩ BACK ON THE PILE" | "↩ DE VUELTA AL MONTÓN" |
| `nextBack` | "Back to the office" | "Back to the street" | "De vuelta a la calle" |
| `nextEnd` | "Claim your title" | "That was the last one" | "Esa era la última" |
| `repHint` | "…portfolio piece… hand it to a hiring manager." | "The calls you made in here, written out. A record of what you decided — not a credential." | "Las decisiones que tomaste aquí, por escrito. Un registro de lo que decidiste — no un diploma." |
| `repHead` | "# Decision Report — {n} · Level · XP · Grade" | "# What you decided — {n}" + "*El Changarrito · {date}*" | "# Lo que decidiste — {n}" + "*El Changarrito · {date}*" |

`repHead` keeps its six-parameter signature and simply stops printing three of them — a copy fix,
no engine change. `levels` cannot be deleted: `lvlName()` indexes it.

## C. The ending that should not be there

The town declares no `CHAPTERS`, so the engine synthesises `{id:"all", quests:[0], need:1}`.
Answering Don Güero closes it, `finish()` runs, and `epiKeys` falls through to the `mepi` set:
**the first thing the owner does in his backlog town ends with Doña Chelo counting the drawer at
El Mercado Robles, Frijol asleep on the scale, and a phone call to Don Tacho.**

My recommendation is that the panel never fires — a place you inhabit has no Saturday. That is a
content call, not a copy one. If it stays, these are the words:

| key | new EN | new ES |
|---|---|---|
| `mepi1` | "Don Güero folds the sheet in half and slides it under his coffee. “That's one.” The street outside is exactly as long as it was this morning — but you know where the window is now, and the window was the whole trick." | "Don Güero dobla la hoja a la mitad y la mete debajo del café. “Esa ya.” La calle sigue igual de larga que en la mañana — pero ya sabes dónde está la ventanilla, y la ventanilla era todo el chiste." |
| `mepi2` | "…“That's one, more or less.” The street is as long as it was this morning. The window is at the far end and it will be there tomorrow." | "…“Esa ya, más o menos.” La calle sigue igual de larga que en la mañana. La ventanilla está hasta el fondo y mañana sigue ahí." |
| `mepi3` | "Don Güero puts the sheet under his coffee without folding it. “Ahí le seguimos.” The street is as long as it was this morning, and nothing on it is annoyed with you. The window opens whenever you walk over." | "Don Güero deja la hoja debajo del café sin doblarla. “Ahí le seguimos.” La calle sigue igual de larga que en la mañana, y nada de ahí está enojado contigo. La ventanilla abre cuando te acerques." |
| `endGrade` | "One sheet filed. The street is unchanged." | "Una hoja archivada. La calle sigue igual." |
| `endStay` | "↩ Back to the street" | "↩ De vuelta a la calle" |
| `endStayToast` | "The street is yours to walk. Whatever's still open stays open." | "La calle es tuya para caminarla. Lo que siga abierto, abierto se queda." |

The three grade variants differ only in a detail, never in praise or blame — the town does not
grade the man who wrote the list.

## D. Small ones, same disease

| key | current | new EN | new ES |
|---|---|---|---|
| `seasonOff` | "Year-round" (the button that turns decoration OFF) | "Off" | "Ninguna" |
| `mpNote` | "…one day other consultants will roam these streets with you. For now, the office is all yours." | "🚧 Under construction, and here it stays that way. This town has one resident on purpose — the street is yours alone." | "🚧 En construcción, y aquí así se queda. Este pueblo tiene un solo habitante a propósito — la calle es tuya y de nadie más." |
| `replay` | "New game +" | "Wipe this browser's save" | "Borrar la partida de este navegador" |
| `replayToast` | "Back at it, {n}. Same office, wiser hero." | "Blank street, {n}. Your list on GitHub is untouched." | "Calle en blanco, {n}. Tu lista en GitHub sigue intacta." |
| `flavor."#"` | "That's a wall. Even AI Legends respect walls." | "That's a wall. It has never lost an argument." | "Eso es una pared. Nunca ha perdido una discusión." |
| `flavor."D"` | "A coworker's desk. Their kombucha, their rules." | "A desk with somebody else's coffee on it. Leave it." | "Un escritorio con el café de alguien más. Déjalo." |
| `tpFoundTx` | "{n} rode in on the trolley — {x} XP, {d}/{q} quests." | "{n} rode in on the trolley." | "{n} llegó en el tranvía." |

`seasonOff` is deliberately the shortest of these: Rosa's finding 6 says that row already overflows
in Spanish. ("No decoration" / "Sin adorno" if it must explain itself.)

## Checked and deliberately left alone

**Fine as they are:** `in1` (the line everything else should sound like), `tut1` ("This is you.
Roam with the joystick or arrow keys" — a body on a street, no office, it survives), `hintSwipe`,
`admToast`, `brushes`, `crTitle` / `begin` / the strip (already done, and they set the register),
`retryNote`, `arrive.st` and all six house `arrive`/`locs` lines, the house boards, and `flavor`
for `▭ ▤ □` — the town's own best writing.

**Inherited but unreachable, flagged so nobody revives them stale:** `worldTag`; the whole `chat`
block (dead because every clerk carries a `doc:` — but the key is the npc id, so **Beto Bujía of El
Motor would start saying Meridian's concrete-pourer lines** if his doc were ever removed); `chill`;
`trolley.*`; the `vm*` map labels; and the entire Meridian district block (`tallerToast`/`tepi*`,
`espigaToast`/`eepi*`, `velazquezToast`/`vepi*`, `nolascoToast`/`nepi*`, `epi1-3`, every `*goEpi`,
`endScore`, `goScore`, `grades`, `nextDoom`, `stkToast`) with the `locs`/`arrive` entries for
`ta · pa · li · no · lc · lo · ex · me`. My preference is that block is **deleted** from the town's
file rather than translated, once section C is answered — a dead epilogue about a bakery is a trap
for the next session, not a resource.

## Contradictions — reported, not absorbed

1. **The town plays Meridian's ending after its first quest.** No `CHAPTERS` declared → the engine
   synthesises `{quests:[0], need:1}` → answering Don Güero runs `finish()` and the epilogue is
   Doña Chelo's, in the owner's backlog town. Copy can dress it; only content can stop it. **A
   story decision, not a copy fix.**
2. **XP survives the strip fix in three places.** `contBtn` and `repHead` are copy and are fixed
   above. The third — the verdict header appending `+{gained} XP` — **no string can reach**; it
   needs a pack flag, the same seam the strip got.
3. **`🏆 {lvlName()}` is hardcoded** in `finish()`. Whatever `levels` says, the end panel puts a
   trophy in front of it.
4. **EN/ES drift in three live strings**, against the standing rule *EN/ES in lockstep*
   (`docs/OWNER.md`): `locs.hq` and `arrive.hq` are untranslated English in the Spanish block, and
   `classes.architect` had "Meridian" swapped for "the town" in EN only — the Spanish still says
   *"Los diagramas de Meridian te temen."* All three fixed in section A.
5. **The town's village map has no place labels at all** — `TOWNLBL` is undeclared. Don Güero's
   lane.
6. **The name field's placeholder is still "Rookie"** — the bottom rung of the ladder Rosa asked to
   remove, sitting on the front door. Not in `strings.js`, so not in the table above.

## Three story decisions for the owner

1. Does the town end at all? *My pick: it never does.*
2. Does it keep any ladder? *Section B is the fallback if the engine cannot be told to show nothing.*
3. Is the stall **"El changarrito"** in Spanish — the town named after the stall you wake up in,
   which is a nice piece of canon — or the flat "El puesto"? *I picked the first.*
