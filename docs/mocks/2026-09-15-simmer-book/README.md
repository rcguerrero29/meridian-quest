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


---

## 2026-09-16, later — the reference was the fix, and that is the finding

The owner, after the third attempt: *"it still doesnt look right. how can you make something you
dont know what it looks like? that doesnt make sense to me"* — and then he pasted **eight
photographs of gimbap**.

**The honest answer to his question, first**, because it is the part worth keeping: knowing what a
dish looks like was never the problem. Judging my own drawing of it was. Three versions went out
described as "better" while he said "off" three times, and I could not see the gap. **A drawing I
cannot judge is a drawing I cannot finish, no matter how many passes I take.**

**What the photographs corrected, in one pass, that three passes of reasoning had not:**

| | before | from the photographs |
|---|---|---|
| **the middle** | half the radius, spaced out, rice showing between every pair | **74% of the radius, in tight rows, pressed together, almost no rice between** — it CROWDS the round |
| **how many things** | five | seven or eight, and crowded |
| **their shape** | dots, then capsules | squeezed rectangles — a small radius on a long edge, never a rounded end |
| **the rice** | shaded to `#CFC3A6` at the rim, which is good lighting | near-white to the edge, because **the nori line only reads at page size against bright rice.** Good lighting had erased the one thing that says gimbap |
| **the colours** | polite | danmuji, carrot and spinach are the brightest things in the picture |
| **the spinach** | dropped in the rice, where it read as peas | inside the bundle, tucked in the gaps the rows leave |

**The rule, and it generalises past food:** when a drawing comes back *"better, but still off"* twice,
the next move is not a fourth pass. It is **to go and look at the thing** — and if the session cannot
reach a reference, to say so and ask for one, which is what should have happened two attempts
earlier. Reasoning from the NAME of an object produces a diagram of the name.

`gimbap-study.png` is regenerated to match, and its right-hand column was rewritten because it had
become a verdict describing a render that no longer exists — the exact fault `LICENCES.md` records
against itself further up this folder. **A verdict table has to name the render it judged.**


---

## 2026-09-16, last — six slices of ONE roll

The owner again, and this was the deepest of the four corrections:

> *"think about how it is made too right? so the roll should make sense in terms of how it is rolled
> up and the sliced into round slices — thats why rarely are they displayed like you did or if it
> close it is in a pile and they have more congruence"*

**All six slices came off one roll.** The fillings were laid in a line on a flat sheet of nori,
rolled once, and cut — so the cross-section is identical the whole length of the cylinder. Six
slices are **siblings**. What differs between them is only where the knife fell and how each one
landed.

**What was actually wrong in the code is worth writing down**, because it is not what it looked like.
The filling arrangement was ALREADY fixed — the same seven strips at the same fractions of the bundle
for every round. What made six siblings read as six strangers was **rotating each one by up to 230°**.
A slice that lands on a board turns a few degrees. The fix was not the arrangement; it was the
`tilt` range, and a loop that spaced them evenly and never let them touch.

- one arrangement, six times, at tilts between −0.26 and +0.30 radians
- **shingled** — they overlap by about a third, because you cut a cylinder and the rounds fall
  against each other. Evenly spaced, upright and not touching is the signature of a loop that ran
  six times, not of a plate somebody carried to a table
- the grain on the rice stays per-slice, because grain is surface and each cut face is its own

`gimbap-one-roll.png` is the result at 3×. Written up as the **`how-its-made`** skill, carried by
`pili` (ahead of silhouette) and `chema` (as step **0**, ahead of measuring, because measuring the
object cannot find this class of fault), and recorded in `docs/BEAUTIFY.md`.


---

## 2026-09-16, and this is the one that finished it — recurse

> *"ok but the squares are not being correctly beautified that the process informs the shape…. a
> carrot isnt square like that - at best square-ish - so that or meat would not be square at all but
> depends on the type of gimbap"*

The last pass applied *how was it made* to the **roll** and stopped there, so the filling was seven
identical rounded rectangles in different colours. **A made thing is made of made things**, and each
piece inside was cut by somebody too:

| piece | how it was cut | its section |
|---|---|---|
| **danmuji** | a baton sawn from a big pickled radish | a rounded rectangle — the only honest bar in there |
| **egg** | cooked as a flat sheet, then sliced | wide and thin, with the fold as a paler line |
| **carrot** | **julienned** | five thin slivers with gaps — *never one fat orange block* |
| **spinach** | blanched and **wrung out** | a dense band, no straight edge anywhere |

**And commit to a kind.** "Gimbap" is a family; averaging it gives a filling no actual roll contains.

**The cheapest check was three inches away and nobody ran it.** This page's own recipe lists rice,
gim, egg, spinach and sesame oil. The drawing had burdock, beef, crab stick and cucumber in it —
**none of them on the list printed directly below the picture.** An ingredient list is the process
input, already written down, in the file being worked in.

**One trap, met on the way:** fixing each section's shape made every piece smaller and the filling
went straight back to being a badge in a field of rice — the fault from two passes before. *Fixing
shape is not permission to lose mass.* Four ingredients fill a roll as completely as eight, because
each one is bigger. A handful of spinach is a handful, not a garnish.

`gimbap-one-roll.png` is the current state. The `how-its-made` skill carries both rules now.


---

## 2026-09-16 — a puck, not a coin, and a pile the cylinder rounded

> *"the pile cant be that big…its more of a pile that gets rounded together inside a cilinder… even
> if they are bein seen from above, they have depth, maybe not in this exact view but its hard to get
> that view especially when they are dominoed together"*

Two corrections, both about the **cylinder** rather than the section:

**1 · A slice has thickness.** Roughly 2 cm on a 4 cm face. Lying face-up with the camera above, you
see the cut face **and a band of the nori-wrapped side** below it — and dominoed, you see the side of
each one in front of the face of the next. Every version before this drew a flat disc, which is why
they never sat on the board: a coin lies on a surface like a sticker, a puck stands on it.

**2 · The roll rounds the pile.** The filling had been built as a rectangular grid of four long rows,
which is what a pile looks like **before** it is wrapped. Wrapping squeezes it into a roughly
circular cluster, so each row is now a **chord of a circle** — `2·C·√(1−t²)`, computed rather than
chosen — narrow at the top and bottom, widest across the middle, and the whole pile is smaller.

**The general form, which is why this went into the skill and not just this folder:** *a soft thing
takes the shape of what encloses it.* Dough in a tin, filling in a roll, wool in a sack, cargo in a
hull. **Square corners inside a round container is a drawing of the moment before it was closed.**


---

## 2026-09-16 — *"maybe throw some shading on those"*

The pucks had shape and no light. Everything was drawn at its own local brightness and then left
flat, so six solid objects overlapped with nothing between them and still read as **stickers laid on
top of one another**. Three things, in the order light actually works:

1. **They cast on each other.** The key is upper-left, so each puck throws a shadow down and to the
   right onto the slice it is leaning against. Painted by filling the silhouette once with canvas's
   own shadow on, then drawing the real thing over it with the shadow off, so the seam between the
   ellipse and the wall never doubles.
2. **A terminator across each face.** A cut face is a plane; the far side of a plane is darker. It
   had one exposure edge to edge.
3. **A contact seam where the face meets the wall** — the corner light cannot reach — plus the wall
   turning away at both ends and sinking into its own shade where it meets the board.

**And a draw-order fact worth keeping, because it is not obvious:** the row is now painted **right to
left**. A cast shadow can only land on something that is already on the board, and with the key
upper-left the shadow falls to the lower *right* — so the slice on the right has to exist first.
Drawn the other way, every shadow was painted onto board that the next puck immediately covered, and
the result looked exactly like no shadows at all. **In 2D, the order you draw in is part of the
lighting model.**
