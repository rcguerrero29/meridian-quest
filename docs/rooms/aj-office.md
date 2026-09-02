# Floor 2 — the room upstairs (`f2`)

*The first job of `/room-design`. Opened 2026-09-02, the day the interview went into the
game. Written for whoever builds the next piece of this room, and for AJ, who answers the
questions on her phone. Plain words on purpose.*

**Where things stand:** v1 is in the game. The room opens bare, two neighbours ask what it
should be, and the game writes a sheet the owner can copy. **Later the same day the north
window was cut** (three panes over the old desk, Nacho + Don Güero's joint call) and
"who is the room for" became Don Güero's first question. Nothing else in the room changes
yet when she answers — that is the next job, and it waits on the engine work called S1 in
`docs/BACKLOG.md`.

---

## 1. One sentence

*The room upstairs* — the office Meridian Labs grows into, inherited from the AI lead who
left, bare on the day you get the key, and furnished one piece at a time as the barrio
delivers what you asked for.

## 2. The doorway frame — the acceptance test

You come up the stairs in the southeast corner. The room opens away from you to the
northwest: floor, walls, and far off under the north wall a single desk with nothing on
it but a monitor, and above the desk three panes of window with north light in them. Two
people stand in the open floor a few steps from the stairs, a red mark over each — Don
Güero with a clipboard, Nacho with a sketch pad.

**Cold read, 2026-09-02, 3D from the stairs (`shots/10-f2-stairs-3d.png`):** a stranger
says *"an empty room with a table and two people."* Not "an office". That is correct for
today: the room is signed to open bare (`docs/STORY.md` → ❗La oficina), and the barrio's
furniture is what turns it into an office. Nacho's conversation is literally titled *An
empty room*, so the frame and the fiction agree. When the first piece of furniture lands,
re-take this frame and re-read it.

## 3. The props, and why each is there

| Glyph | Prop | Where | Why |
|---|---|---|---|
| `D` | The old lead's desk | (10,1), alone under the north wall | **Load-bearing.** The room is inherited, not empty. Nacho's first question is about it. |
| `1` | The stairs | (18,11) | The only way in or out. The office has no door, so every line says *stairs*. |
| — | Nacho and Don Güero | (15,8) and (12,8) | Placed by `content/meridian/room.js`, not by a map letter. Both are in frame from the stairs in 3D. |
| `\|` ×3 | The north window | (9,0) (10,0) (11,0), in the wall over the desk | **Built 2026-09-02.** The only honest view north of HQ: the back lot, the old road out of the barrio, two roofs, a pole, and on the horizon the graded line where the northbound trolley is being laid. Barrio Norte stays a promise you can now *see*. Declared in `content/meridian/art.js`; the sky takes the season's colour, the view never changes with it. Cold read passed alone on the tile sheet. |

**Deliberately absent, and why:** moving boxes (the only crate tile in the pack is El
Mercado's produce crate — it draws a tomato, a chile and a banana, and two of them by the
stairs read as *groceries*, not *moving in*); the rug, plants and spare desks from the
old map (bare means bare).

## 4. What changes, and when

**While she answers: nothing in the room.** The payoff is paper — Nacho pins the sheet
above the old desk, Güero tears off the carbon copy, and the sheet appears on the card
with a Copy button.

**Later:** each business delivers one piece of furniture (signed ❗La oficina), and her
*must-have* is the first piece. That needs the engine to hold more than one delivery at a
time (S1 in the backlog). Do not build a separate path for it.

## 5. The grid — 20 wide, 14 tall

```
####################
#.........D........#
#..................#
#..................#
#..................#
#..................#
#..................#
#..................#
#..................#
#..................#
#..................#
#.................1#
#..................#
####################
```

Arrival from HQ lands on (17,11), beside the stairs. The portal to HQ is the `1`.
Every row is 20 characters; the world validator warns at boot if one is not.

## 6. New glyphs needed

One, built: `|` the window, in `content/meridian/art.js` (the pack's first tile file),
declared through `TILEART`/`TILEMETA`, solid via `SOLIDX`, coloured on the map via
`MAPCOL`. It passed the cold read (`node test/tilesheet.js`) alone. Later, content-only:
the view advancing a stage per finished business (stakes → graded roadbed → rail) — four
drawings, four cold reads, and it cannot be tested until districts close (S1).

## 7. The interview — as it plays in the game

**Who asks, and what.** Nacho asks how the room should *feel* (five questions: the old
desk, what you come up here to do, the first look from the stairs, what it sounds like,
the one thing that never comes in). Don Güero asks what has to be *built* (five: **who
the room is for** — the owner's own addition, line one of his work order — then the
must-have, what the window looks at, where your desk faces, who else needs a seat).

**How the twelve questions in the skill map onto the ten in the game:** 1 → *who is
this room for* (Güero, first); 2 is answered by the story itself (the room is inherited;
the desk question is the part that is hers) · 3 → *first look* · 4 → *must-have* (Güero) and *never* (Nacho) · 5 → *sound*
(smell stays on paper) · 6 → *what you come up here to do* · 7 dropped (the report and
the letters already answer it) · 8 dropped as a question, kept as Güero's promise
("everybody brings one piece") · 9 folded into *sound* · 10 → *window* · 11 → *where you
sit* (the way in is already wired) · 12 → *who else*.

**How it plays.** Walk up to either neighbour; the Talk button says what the talk is
about. Each screen: two sentences from the host, the question, three answers in the
written order (never shuffled — there is no right answer to hide), a dashed fourth
button *"None of those — let me say it my way"* that opens a one-sentence box under the
answers, and a quiet link *"That's enough for now"*. A tap is acknowledged ("Written
down."). Cancel changes nothing. An empty box on a fresh question records *"wants to
tell you this one out loud — go ask"*. Re-answering keeps the earlier answer as history.
After the last question the host says the closing line and the sheet appears on the card
with **Copy the sheet · Ask me again · Back to the office**. The same sheet is under
Settings → Export → *The room*.

**Where the answers live.** On the phone they were given on (`mqroom`), never in the
save file, never touched by restart. They do not travel on the Trolley Pass; the sheet
says so.

**What the owner does with the sheet.** Copy it, paste it to Claude with `/room-design`,
say "build it". The sheet is the interview record; nobody re-asks her.

## 8. Open questions — the owner's calls

1. ~~**The window.**~~ **Answered 2026-09-02** — the owner handed it to Nacho and Don Güero
   together (*"maybe /nacho and /don-guero can work something cool out"*). Their joint
   call: north wall, three panes over the desk, the view is the way to Barrio Norte, the
   season repaints the sky and never the view. Built the same day. Still open on top of
   it, for later: the view advancing as businesses finish.
2. **Bare or mid-move.** Shipped bare, exactly as signed. Don Güero wanted moving-in
   debris (boxes, a cone, the coffee counter); Nacho wanted bare. Debris needs a box tile
   that passes the cold read first.
3. **Nacho off the street.** Shipped: Nacho stands upstairs only (the mural stays). The
   alternative is a Nacho on the street *and* one upstairs.
4. ~~**Whose room.**~~ **Retired 2026-09-02** — the owner asked for "who is the room for"
   as a question in the game, so the sheet now *says* whose room it is (mine / ours /
   whoever's around) instead of a build session guessing. Her answers still live only on
   the phone that gave them.

Also shipped without asking, easy to flip: the ❗ over both neighbours while a question
is unanswered (the badge means *this neighbour has something to say*, and they do).

## 9. For AJ's pack

Copy `content/meridian/room.js` and rewrite freely. The names *Nacho* and *Don Güero*
appear in: `invite`, `ui.hint` (both languages), Nacho's closing line, and Güero's first
line. "Somebody's mom" is deliberately nobody's. There is no hero-gender field in the
engine, so the Spanish avoids *jefe/jefa* on purpose. A pack that ships no `room.js`
gets no interview, no tab and no storage key — tested.
