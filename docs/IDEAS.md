# Design backlog

Feature designs agreed in conversation but not yet built. When one ships, move its
section into the commit message and delete it here.

---

## 1. The Designer quest — AI-made garments for Frederick (and a wardrobe system)

**Pitch:** a new NPC — a designer — gives a mini-quest about using AI to design
virtual customizations (collars, bandanas, capes, hats) for Frederick. The reward is
a wardrobe: real, equippable cosmetics rendered on the dog. Teaches AI-assisted
product design the same way the other quests teach delivery judgment.

### The NPC

**Xochi · Designer** (`d`), working from La Obra's Studio (`lo`) — it already has the
drafting tables and the "hand sketch first, AI render second" flavor text, and it's
currently the only interior with no quest NPC. Spanish name works unchanged in both
languages. Needs: `NPCE` emoji (🧵 or 🎨), `NPCN` en/es entries, `NPCLOOK` entry,
a `d` tile in the `lo` map, `WNPC.lo` wiring.

### The quest (2 nodes, same shape as the others)

- **Node a — the design process.** Xochi wants a collar line for the barrio's pets.
  Choices: ① prompt an image model once and send the first output straight to
  production (bad — no curation, no spec); ② AI generates many variations, a human
  curates, and the pick becomes a structured tech pack — materials, sizes, colors
  (ok, `next: b`) — the "structured outputs" lesson applied to creative work;
  ③ copy a famous designer's collar and let AI restyle it slightly (bad — the IP
  lesson: style imitation of living designers/brands is a legal and ethical trap);
  ④ sketch everything by hand like always (mid — craft without leverage).
- **Node b — the drop.** How do virtual goods ship? ① everything free forever
  (mid — generous, unsustainable); ② small drops, each with a human QA pass on fit
  across all body shapes (ok — the eval mindset applied to cosmetics); ③ auto-generate
  and auto-list infinite items (bad — slop marketplace, zero curation).
- **Concepts:** "AI-assisted design", "IP & originality", "Curation as QA".

### The wardrobe (engine work)

- Accessory registry, data not code: `DOGWEAR={bandana:{colors:[...]},collar:{...},cape:{...}}`.
- `drawDog` gains an accessory pass (the `fredQ>=2` red-bandana block generalizes:
  bandana color becomes a variable, collar = a 2px band + tag dot, cape = small
  rect behind the body).
- Equip UI: talking to Xochi after the quest (or petting Frederick) opens a small
  picker panel, same pattern as the trolley list.
- Save schema: add `wear:{bandana:"#C0392B",collar:null,...}` to the `mq1` blob;
  default when absent so old saves load clean.
- Completing the Designer quest unlocks the wardrobe; the existing red bandana
  becomes the first item in it (earned by the Frederick quest, as today).

### Recommended build order

1. Wardrobe rendering + save field, with the red bandana migrated into it (engine, small).
2. Xochi NPC + map tile + names/looks (content, small).
3. Quest content EN + ES in one commit so parity checks stay green (content, medium).
4. Equip picker UI (engine, small).
5. Extend the headless smoke test: quest shape parity + a draw call with each accessory.

### Later / bigger

If we ever want *player-designed* garments (typed descriptions → generated art), that
needs an image model at runtime — out of scope for a $0 static page. The static-page
version of that idea: a palette/pattern editor (like the character creator) whose
output is data, not pixels — same lesson, no backend.

---

## 2. Care pack follow-ups (v1 shipped)

The Frederick care pack (Export → 🐾) ships a copyable care sheet + recurring
reminders as `.ics`. Possible next steps:

- Let the player rename the pet and set feeding times before export (a tiny form
  above the textarea — the text-lab pattern).
- A printable one-page PDF version.
- The decision report export (`decision-report.docx` in `futureExportTypes`) using
  the logged `decisions` array — the work-side twin of the care pack.
