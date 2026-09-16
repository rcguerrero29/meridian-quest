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

---

## 2026-09-16 — the three pages exist in the DESIGNED surface now

The renders in this folder (`simmerBook1/2/3-*.png`) are the three pages drawn through **the game's
document reader**, which is the surface the owner called *"a bad attempt at UI"* (`docs/ARCH-LOG.md`
A15, `docs/la-sobremesa.md` §22). They are kept because they are what proved the ENGINE can draw
these pages, which was a real question and got a real answer.

**They are not what to show AJ.** Only page 1 had ever existed as a designed page —
`https://claude.ai/artifact/DAenYKRcrwbL6fvGFrrpmD` — so the set was three pages in the wrong surface
and one page in the right one. All three are now here:

**`https://claude.ai/artifact/EXqXAbhZqaLiNtyBR2A4xx`** — doenjang jjigae, gimbap, sigeumchi namul.

Two things in it are decisions and not styling, and both are the owner's of 2026-09-16
(`docs/la-sobremesa.md` §18.1):

- **Nobody is named.** The table is laid for two because she cooked. The game never asks who.
- **The namul page carries no decision at all.** Pages 1 and 2 have a two-cooks control; a
  five-minute dish does not get one. **The difference between the pages is the point** — a book where
  every page has the same furniture is a form again, which is the fault A15 is about.

And the fold marks in the corner of each plate are hers: one, two or three. Not a score, not a count
of anything, and nothing adds them up.

**The two faults the first look caught**, recorded because looking is the instrument: six rounds of
gimbap drawn with the rice ring at 0.80 of the radius read as **eggs on a plate** (a cross-section is
a dark band you can see, a ring of rice, and a middle you can name — it is 0.72 with a stroke now);
and the "In your kitchen:" rule hung off the end of the first line when its label wrapped.

---

## 2026-09-16 — the gimbap study, and why it exists

*"can i have an image of the gimbap you are trying to achieve its better, but still quite off"*

`gimbap-study.html` / `gimbap-study.png` — one slice drawn at four times page size with its parts
named, and the row of six underneath at the size they actually appear on her page.

**It is here because it is art direction, not a one-off render.** The drawing was wrong twice and
both times it was wrong the same way: it was drawn as *a picture of a round thing with stuff in the
middle* rather than as **a cylinder seen end-on**. Stating the structure fixed it in one pass where
two rounds of nudging colours had not:

| | |
|---|---|
| **NORI** | a thin LINE, about 4% of the radius. **Not a band** — this was the whole fault. A fat dark ring around a pale disc is a fried egg, and six of them are six fried eggs, which is exactly what came back |
| **RICE** | the widest thing in the picture, with grain, so it is rice and not a fill |
| **THE BUNDLE** | about half the diameter, and **not a ring of dots**: long strips seen end-on, so bars and rectangles, packed tight and **overlapping**. Spaced out with rice between every pair it is a diagram of a gimbap rather than one |
| **THE TWO YELLOWS** | danmuji `#F2C93B` is brighter than egg `#EBD489`, and that difference is what makes a slice read as gimbap rather than as sushi. Both were the same yellow |

**The general lesson, and it is the day's lesson again from the other side:** when a drawing is
*"better, but still quite off"* twice running, stop adjusting it and go and state what the thing IS.
The study took one pass. Two rounds of tuning the old shape had not moved it, because the shape was
the fault.

**And the study itself was wrong twice before it was right**, which is worth recording in a folder
about looking: the first version fanned its labels at angles and three of four ran off the sheet;
the fix moved the text column left and walked it straight over the row of six. **Measuring one edge
and not the pair** is its own small family of mistake.
