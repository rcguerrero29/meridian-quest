# La caja de escalera — Don Güero's siting, 2026-09-06

*Issue #4. Planning only; nothing built. The owner, 2026-09-05: "i think that we can make the
building bigger, fit in a proper staircase. move it out of a tiny room if needed." And from the
town, 2026-09-06: "lets do this for meridian quest and templates. obviously do it here so i dont
necessarily have to switch tabs when testing. use one of the empty rooms or replicate from where
you place in MQ." The full report, with the three candidates drawn as rows, is the first comment
of 2026-09-06 on the issue; this file is the ledger copy.*

## In plain words

HQ has no lobby: every tile is an office or the corridor between offices, so a staircase drawn
inside today's walls hangs on a colleague's wall or stands mid-floor. The building grows **south,
at the front door**: off the street you are in a lobby, the stairs go up on your right behind
their own door, the office floor is through the door ahead. Three new rows on each floor. Rows
0–12 of both floors are untouched, so every person, door, desk, poster and gift keeps its
coordinate. The stair leaves Dana's alcove.

## The recommendation — candidate B, "el zaguán", 3 rows, hq and f2 20×17

```
hq  y13  ##########+⊓⊓⊓⊓#####     door into the office at (10,13) · mass x11–14
    y14  #..........≡≡≡▲#####     landing (10,14) · treads 11–13 · head ▲ (14,14) → f2 (14,14)
    y15  #..................#     lobby
    y16  ##########E#########     front door at x10; the street arrival lands on the landing
f2  y13  #..........◺◺◺.....#     rail x11–13; (14,13) is floor — you step off into the room
    y14  #.........▼≡≡≡.....#     way down ▼ (10,14) → hq (10,14) · treads · arrival (14,14)
    y15  #..................#
    y16  ####################
```

Rejected: **A** (2 rows, the flight carved from the hall's south row — a wall-height mass at
(11–14,12) becomes a permanent blind band mid-floor); **C** (4 rows, a true dogleg — the lower
flight has nothing solid north of it and the upstairs cannot mirror it).

## The town first

B changes nothing above row 12, so the town's stall keeps rows 0–12 byte for byte and takes the
same four rows. The town has no upstairs today (`PLACES.upstairs:""`): it gets a bare 20×17 loft
as a new world `f2`, `PLACES.upstairs:"f2"`, the two portals, `⊓◺` in `SOLIDX`. Same coordinates
as Meridian, so what is tested is what ships.

## The cost is the drawings

Five glyphs: `⊓` stair mass (solid, wall-height, the flight in profile), `≡` tread (walkable
floor art), `▲` head-up (portal, `mark:"up"`), `▼` head-down (portal — closes "both upstairs
stairs look like they climb" city-wide, Nolasco's `1` becomes `▼`), `◺` rail (solid, knee-high).
Where they live is side quest 3.

## Side quests for the owner

- **❗Tres filas** — how many rows: three (B, recommended), two (A), four (C).
- **❗La entrada** — the street arrival lands on the landing (recommended) or one step inside the
  door as today.
- **❗De quién son los peldaños** — the five glyphs live in the engine beside the stair tile
  (recommended; every pack gets a real staircase; `GAMEV`+`CACHE` bump, same-day proof), or in
  Meridian's `art.js` copied into the town, or Meridian only (the town could not test it).
- **❗El archivero** — `config.js` ~81 "the file cabinet IS the box by the stairs" goes false:
  swap the two gift tiles, or rewrite the sentence.

## Contradictions, reported not absorbed

1. The brief given to Don Güero had f2's stair at (17,11); the map has `1` at (18,11) and
   (17,11) is the arrival. The code is true.
2. `1` is shared by `hq`, `f2` and `no`; this siting removes `1` from HQ so Nolasco is untouched.
3. `engine/engine.js` ~601 says one stair convention, rising north; an east-west flight makes the
   comment false — fix it in the same commit.
4. `test/smoke.js` ~1434–1452, ~1843–1857, ~1964 and shots 02, 10, 12, 44 pin the old geometry;
   each proven red before it changes. The sight-line assertion must become "nothing tall in the
   way" — a rail is not a wall.
5. `docs/CITY.md` carries three stacked ❗La caja de escalera entries; fold to one. ❗El escalón
   de Dana is in NEXT-SESSION and not in CITY.md; this plan closes it with a yes.
