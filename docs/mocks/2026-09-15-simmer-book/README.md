# Simmer — three pages of her book

*2026-09-15. The owner: **"do the drawings!"** — and the drawings he means are the gate Tavo names in
`docs/la-sobremesa.md` §17.4: **make three pages of the book by hand, show her, ask if she wants a
fourth.** If the answer is "yes, what's next", the loop in §17 is worth building. If it is a shrug, it
cost an afternoon instead of nine sittings.*

**These are the shipped reader drawing real blocks** — `art · h · kv · note · blank · p` — at
390×844 and 844×390, cream. Nothing here is a pack and nothing is a decision.

## What each page is

| | Dish | What it is there to test |
|---|---|---|
| 1 | Doenjang jjigae | **The table laid for two.** The whole cast of this world is that there are two bowls, and nobody arrives (§16) |
| 2 | Kimbap | **Her cuts.** Six rounds, deliberately uneven, and nothing in the game says so (§17.2) |
| 3 | Sigeumchi namul | **The five-minute night.** "Didn't feel like cooking, made this anyway" — the sitting that is 90 seconds |

Each carries her line, her private mark as a **word** (*again · fine*), the recipe as it came, a blank
for what she'd change, and the credit line. **The mark is never a star** — if two marks can be
combined into a third number, it is a rating (§17.2).

## The dishes are placeholders, on purpose

**AJ's own dish is not in this repository and will not be** (Zeni, #200). These are three common,
published Korean dishes standing in for it. Whoever shows her these should swap page one for the dish
she actually named — locally, not here.

## The rules these were drawn to (`docs/la-sobremesa.md` §19)

- **24×24 source art at ×4**, never the 16×16 that made a dish unnameable.
- **One camera**: where your eyes are at a counter — the mouth from slightly above, the front wall
  straight on. Not overhead (every vessel becomes a circle), not three-quarter (you lose what is in it).
- **Every white vessel carries a stainless rim**, because porcelain against the cream paper is Δ0.8
  and would vanish the way the sugar skulls did.
- **The frame is the kitchen's accent, never its ground.**
- **Gochugaru never touches the onggi** (Δ19.8 against a rule of ≥90): it is a mark on metal or on the
  page — here it is the fold on the page corner.
- Three masses, a 2:1 ladder, nothing below 48 px, **no date, no count, no percentage, no lock**.

## What the render loop caught that no test could

Four faults, each found by looking at the picture and fixing it:
1. The vessels were **rectangles** and read as toasters. Redrawn as a mouth you look into and a body
   that narrows to its foot.
2. The bowls were **empty**, and rice is white in a white bowl — it needed its own shadow.
3. The tofu read as **confetti** — flat white rectangles in brown broth. Now two cubes with a lit top
   and a shaded side.
4. The kimbap was sized up **without re-measuring the frame**, and the sixth round was cut in half.

`manifest.json` carries the fold numbers for every picture: document height, visible height, and how
much sits below the fold at each size.

Re-render: `node docs/mocks/2026-09-15-simmer-book/render-book.js`
