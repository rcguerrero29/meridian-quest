# The contact sheet — every world, every camera, 2026-09-21

*The owner: "alright so we might not do the other AI today - can we consider beautifying across the
worlds?" `docs/BEAUTIFY.md`'s standing rule is **contact sheet first, list second, redraw third.** This
folder is the sheet. The list is the dated section at the end of that register. Nothing was redrawn.*

## What is here

Twelve strips, one per world, **top · front · iso · 3d** left to right, each panel 844×676 at the
real screen size the phone plays at (`test/shots.js`, no scaling). Rendered from the branch at
`2f7ae64`, game `mq-v176`, the default theme, no season.

| file | world |
|---|---|
| `hq.png` | HQ, ground floor — the room a new game lands in |
| `f2.png` | HQ, floor 2 |
| `st.png` | the street |
| `ex.png` | La Obra — the site |
| `lo.png` | the loft |
| `me.png` | El Mercado |
| `lc.png` | La Cocina |
| `ta.png` | the Taller |
| `pa.png` | the bakery |
| `li.png` | the library |
| `no.png` | the notary |
| `pk.png` | the park |

`spots.json` is the spot list that reproduces them — 48 spots, one tile per world, the four cameras.
Copy it beside `test/shots.js` and run `node test/shots.js --spots spots.json` (the flag resolves
relative to `test/`).

## Two things about the harness, found while making it

1. **The first 48 shots had the tutorial bubble over the top third of every room.** `#ticker` opens
   on boot and nothing in the harness closes it. These strips were taken with the ticker cleared
   before each shot, through a patched copy of the harness kept out of the repository. A `--quiet`
   flag on `test/shots.js` that does the same is a test change, noted in the register, not built.
2. **`--spots` resolves relative to `test/`, not the working directory.** The path in the README
   above is written the way it works.

## How to read a strip

Left to right is the same tile, the same second, through four cameras. What changes between panels is
the renderer, not the world — so a thing that reads in three panels and not the fourth is a camera
fault, and a thing that reads in none is a drawing fault. That distinction is the whole list.
