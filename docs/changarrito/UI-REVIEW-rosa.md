# El Changarrito — a guest's walk through the town

*Rosa Villalobos, interface and interaction design. Roamed 2026-09-08 in a headless Chromium at
390×560, 480×900, 740×360 and 1440×900, in English and Spanish, in all four cameras, in both
seasons and with the season off. Started on `ch-v60 · engine mq-v118`; the town shipped twice
while I was in it, so every finding below was re-run and still reproduces on `ch-v61` after
Appearance got its own drawer. I looked and judged; I changed nothing and filed nothing.*

The town is a genuinely good idea executed with more care than most shipping software. The
paperwork metaphor holds all the way down — a stapled sheet, a staple, a window you walk up to,
a person who answers in three lines — and the writing on those sheets is better than the writing
in most products I have reviewed. The seasons are beautiful; the park at Día de Muertos in the
3D camera is the nicest thing in either game. The information architecture of the street (six
houses, one per kind of work, a sign that counts) is a real design idea and it works.

What it does not yet do is survive a small screen. Nearly everything I found comes from the same
habit: the panels and buttons that float over the world are positioned with fixed pixel offsets
against a canvas that is 427 px tall on a laptop and **266 px tall on a phone**. On the laptop
that is invisible. On a phone it puts a button off the top of the frame, slices the map's way
out in half, and — the one I would fix first — parks the *Copy / Download / Close* bar directly
on top of **Sign in**, **Make a new token** and **File a request**, so a tap on the town's whole
write surface presses Copy instead. Nothing tells you it went wrong. If I could change one thing,
it would be that: **make the sheet's docked bar stop covering the buttons that do the work.**

Eight findings, best first. Tier is my suggestion; the ranking is the owner's.

---

## 1. On a phone, the Copy bar sits on top of Sign in — pressing it copies the page instead

**In plain words:** At the window, the card ends in a bar with Copy, Download and Close that stays
stuck to the bottom of the screen as you read. On a phone the card is taller than the screen, so
when it first opens that bar is parked in the middle of the sheet, right over *Sign in*, *Make a
new token* and *File a request*. Those three buttons are the only way the town can write anything
back — and pressing where they are copies the page or downloads a file instead. Nothing says no;
you get the wrong thing quietly. Done looks like: wherever you are in a sheet, pressing a button
you can see does what that button says.

**Notes:** Reproduced at 390×560, standing at la ventanilla's window, straight after opening her
card. Asking the browser what element is on top of *Sign in* answers "📋 Copy"; on top of *Make a
new token* it answers "⬇️ Download". Scroll 100 px and those three come free but the *index* and
*narrow the street* pair goes under the bar instead; scroll 200 px and everything is reachable.
So the sheet's content and its docked bar occupy the same space, and which control is unusable
depends only on where you have scrolled. The bar is opaque and painted with a solid background so
it hides rather than blurs what is under it. On a laptop (1440×900) the card fits without
scrolling, the bar sits at the sheet's foot, and none of this happens — which is why it has
survived. Ruled out: it is not a z-order accident in one card; it is every sheet that is taller
than the screen.

**Questions to consider:** Should the sheet simply keep a bar's worth of empty space at its foot
so nothing ever ends up underneath? Or should the bar stop being stuck to the bottom on a short
screen and just sit at the end of the paper, the way it already does on a laptop?

**Areas affected:** Every piece of paperwork the town opens over the world — the window, a
person's card, a house board, the index, the request form. Meridian reads the same sheets.

**Done when:** On a 390×560 screen, opening any sheet and pressing any button that is visible
performs that button's action, at every scroll position, proven by a test that asks what is on
top of each button rather than trusting that it is drawn.

*Tier: high. Seen at: walk to la ventanilla at 390×560, Talk, screenshot `hd390-91-signin-hidden.png` —
the bar cuts the sentence "…typed once, stays in this browser…" in half and the write buttons are gone.*

---

## 2. The buttons that do something are 21 pixels tall; the buttons that copy the page are 68

**In plain words:** On a person's sheet, every button that actually does something — sign in, file
a request, refresh, open the index, narrow the street, ask Don Güero to build something — is a
thin purple strip about a fifth of an inch tall, and each one touches the next with no gap at
all, so a run of three reads as one bar with hairlines in it. Directly underneath, the three
buttons that only copy or download the sheet are three times taller, evenly spaced and given the
full width. The page shouts about the least important thing on it and whispers the most important.
Done looks like: the buttons that change something are the biggest, best-spaced things on the
sheet, and no two of them touch.

**Notes:** Measured at 390×560 on la ventanilla's card: every action button is 21 px tall; *Sign
in* runs to x=111 and *Make a new token* starts at x=111 — zero gap, and the rows above and below
are also flush. Copy, Download and Close are 68 px tall with 8 px between them. Same on the
laptop, where the run "Sign in | Make a new token | File a request" renders as one continuous
purple bar. The cause is that these buttons are given a colour and nothing else — no height, no
padding, no spacing — so they fall back to the browser's default button size and flow inline
against each other, while the copy bar has a proper layout of its own. 21 px is roughly half the
smallest target a thumb can hit reliably, and two of them touching means the miss lands on the
neighbour rather than on nothing.

**Questions to consider:** Should these get one shared style (a real height, real padding, a gap,
wrapping onto their own lines), or should the primary one on each sheet — sign in, file a request
— be promoted to a full-width button and the rest left as links?

**Areas affected:** Every button a sheet offers: the window, a person's card, Don Güero's card,
the house boards, the index, the request form's own submit and cancel.

**Done when:** No two action buttons on a sheet touch, each is at least as tall as a comfortable
thumb target, and the buttons that only copy the sheet are no more prominent than the ones that
change something.

*Tier: high. Seen at: la ventanilla's card at both 390×560 and 1440×900 — `d1440-63-ventanilla-card.png`
shows the three write buttons as a single purple bar above three oversized grey ones.*

---

## 3. On a phone, the world's action buttons climb off the top of the world and land on the gear

**In plain words:** Standing at the board on the street on a phone, the "📄 Read it — The board"
button appears **above the top edge of the world**, with its top row of pixels sliced off by the
frame, sitting directly on top of the map, fullscreen and settings icons. Part of it is not even
pressable — a tap there goes to the world behind it. It is the only way to read the board, and it
looks like a mistake and behaves like one. Done looks like: every button the world offers stands
inside the world, clear of the icons in the corner, on any screen.

**Notes:** Reproduced at 390×560 on the street beside the board. The button's top is 13 px above
the top of the world panel, and it overlaps each of the three corner icons by 38×16 px; asking
the browser what is on top at its upper-left corner answers "the world", not the button. At
1440×900 the same button sits 149 px lower and nothing collides. The cause is that these buttons
are placed by a ladder of fixed distances from the bottom of the world — 16, 72, 128, 184, 240 —
which was laid out for a tall frame. On a phone the frame is 266 px tall, so the fifth rung lands
outside it. Two other symptoms live at the same address and are worth checking in the same pass:
three buttons share the 184 rung and two share the 240 rung, and at phone height the message
bubble and the little record of recent lines overlap each other by 138×17 px while carrying the
*same sentence twice* — one printed on top of the other.

**Questions to consider:** Should these buttons stack from the bottom by measuring, rather than by
a fixed ladder — so however many are showing, they fill upward and stop before the corner icons?
Or should more than two of them collapse into one small menu?

**Areas affected:** Every button that floats over the world — talk, read, the dog's treat, ball
and leash, the bandana, adopt, the look buttons — and the corner icons they land on.

**Done when:** On a 390×560 screen, with every world button that can appear at once showing, none
is clipped by the frame, none overlaps another, and none overlaps the corner icons; proven by
measuring, not by looking.

*Tier: high. Seen at: street (8,1) beside the board at 390×560, screenshot `p390-71-board-read.png` —
the cream button hangs over the frame's rounded corner with the three icons drawn on top of it.*

---

## 4. Settings and the map are trapped inside the world's frame; on a phone the map's way out is sliced in half

**In plain words:** Settings and the village map open *inside* the little window the world is drawn
in, not over the page. On a phone that window is about a third of the screen, so Settings arrives
as a 270-pixel slot showing one and a half sections, and the map arrives with its **Close** button
cut in half by the bottom edge. There is no Escape key and tapping outside does nothing, so the
only way out of Settings is to scroll a long way down inside a small box and find Done — 360 px
below the fold when it opens, and over a thousand once you have opened the sections. It is not a
trap, but it is a chore every single time, and a way out you can only see half of reads as broken.
Done looks like: on any screen, the way out of a panel is visible the moment it opens.

**Notes:** Measured at 390×560. Settings: the panel is 272 px tall inside a 266 px world, its
content is 709 px long when it opens and 1,396 px with every section open, and Done sits 360 px
and then 1,047 px past the bottom edge. Escape does nothing; a tap on the dark backdrop does
nothing. The map: its Close button's lower 14 px are past the panel's edge on first open, and the
word "Close" is visibly bisected. Both are fine from 480 px of height upward, which is why they
have survived. This is the same shape as the chair that trapped the player (#126) — and the cure
found there, keeping the panel inside the window and making the finish button ride the bottom,
was never applied to these two. This is not #127 either: that was about which rows belong in
which drawer; this is about the drawer's own box and its way out.

**Questions to consider:** Should these two open over the whole page the way the paperwork already
does — which would fix both at once — or keep their own box and take the chair's cure (a sticky
Done, and open scrolled to their own top)? Should Escape and a tap on the dark backdrop close
them, as they do in every other program?

**Areas affected:** The settings panel and every section in it, the village map, and any other
panel that opens inside the world's frame rather than over the page. Meridian has the same two.

**Done when:** On a 390×560 screen, opening Settings or the map shows a complete, unclipped way
out without scrolling, and Escape closes them.

*Tier: high. Seen at: press the gear, then the map icon, at 390×560 — `p390-20-settings-default.png`
and `p390-61-map.png`, where "Close" is cut through the middle of the word.*

---

## 5. Filing a request on a phone: the sheet slides off the left of the screen

**In plain words:** Open the form that files a request on a phone and the whole sheet jumps
sideways — its left edge goes off the screen, the headings above each box are cut off on the left,
and every box runs off the right. You have to drag the page sideways to read your own form. On top
of that the two big writing boxes are a fixed height that takes 220 px each, so on a 560-px screen
the first two questions fill the entire view and the button that actually files the request is a
long way below anything you can see. This is the most important thing the town lets you do and it
is the roughest screen in it. Done looks like: the form fits the phone, nothing is cut off on
either side, and you can see what you are filling in.

**Notes:** Reproduced at 390×560 by talking to Don Güero and choosing to ask him to build
something (la ventanilla's *File a request* is the same form). The sheet ends up at −24 px, the
panel scrolls 36 px sideways, and each field is 392 px wide inside a 322-px column. The cause is a
single dropdown: *What kind of work* carries an option whose text is longer than a phone is wide
("records & forms · El Anexo de la Ventanilla"), and because the fields are laid out in one column
sized to its widest member, that one option makes **every** field 70 px too wide. The sheet then
jumps because the form puts the cursor in the title box on open, and the browser scrolls sideways
to bring a box that is wider than the screen into view. The town already solved this exact problem
once for the alebrije row, by capping how wide a dropdown may get. Separately, and worth splitting
off: the big writing boxes get their height from the settings panel's own rule rather than the
form's, which is why they are 220 px each instead of the 64 px the form asks for.

**Questions to consider:** Cap the dropdown's width and let the long name wrap or shorten in the
list, or let every field shrink to the sheet regardless of what is inside it? Should the writing
boxes start small and grow as you type, so the button that files the request is reachable?

**Areas affected:** The request form wherever it opens — Don Güero's card, la ventanilla's window,
"file about this" from the index — and any other sheet that carries a form with a dropdown.

**Done when:** On a 390×560 screen the request form scrolls only up and down, no label or field is
cut off at either edge, and the button that files it is reachable without passing two screens of
empty box.

*Tier: high. Seen at: Don Güero in the stall → "📝 Ask me to build something" at 390×560, screenshot
`p390-54-form.png` — the title box runs past both edges and the sheet has slid left.*

---

## 6. The rows of choices in Settings never wrap, so in Spanish they run off the panel — on a laptop too

**In plain words:** Each row of choices in Settings — the themes, the cameras, the season, the
music — is one line that never wraps. When the words are longer than the panel, the last choice is
simply cut off at the right edge instead of moving to a second line. In Spanish this happens on a
full-size laptop: the music row reads "Auto | fi | Campanas | Marimba | Ata", with "Lo-fi" sheared
to "fi" and "Atardecer" to "Ata". On a phone it happens in English too, on three rows at once.
Done looks like: a row of choices wraps onto as many lines as it needs, in either language, at any
width.

**Notes:** Measured with every section open. At 1440×900 in Spanish the music row needs 379 px in a
318-px panel. At 390×560 in English the theme row needs 287, the season row 311 and the music row
315 in a 270-px panel, and the panel gains 26 px of sideways scroll; in Spanish at that size it is
four rows and 90 px. The cause is that these rows are laid out as a single line whose items are
told to share the space equally but are never allowed to be narrower than their own text and are
never allowed to wrap. It is worth saying plainly that this one is not a phone-only bug — the
owner's own second language hits it on a desktop, which makes it the cheapest real win on this
list.

**Questions to consider:** Let the rows wrap onto more lines, or give the longer ones — season,
music, camera — a two-per-line layout on narrow panels? Are any of these names longer than they
need to be in either language?

**Areas affected:** Every row of choices in the settings panel, in both languages, and the same
rows in Meridian.

**Done when:** At 390×560 in English and at 1440×900 in Spanish, every choice in Settings is fully
readable with no sideways scrolling.

*Tier: normal. Seen at: gear → open all sections → switch to Español, at 1440×900, screenshot
`d1440-es-80-settings.png`.*

---

## 7. The 🎲 look button is buried underneath the 🔁 look button and can never be pressed

**In plain words:** In the seasons there are two small buttons at the edge of the world for
changing a look — one for a random one, one for the next one. They are drawn in exactly the same
place, one perfectly on top of the other, so only the "next" one exists as far as any finger or
mouse is concerned. The random one has been unreachable in the world since it shipped; it still
works from Settings, so nobody would have noticed it was gone. Done looks like: two buttons, two
places, both pressable.

**Notes:** Measured in the park in both seasons at 390×560 and at 1440×900: both buttons report the
identical rectangle (48×39 at the same coordinates), and asking the browser what is on top there
always answers the "next" one. The cause is that the two share a style that fixes their distance
from the bottom of the world, and unlike every other button in that column neither was given an
offset of its own — so they both take the same rung of the ladder described in finding 3. Same
root, different symptom, so worth its own line.

**Questions to consider:** Give the random one its own rung, or fold the two into one button that
cycles and shuffles on a long press? Are two buttons in the world worth the space now that the
Settings row does the same job by name?

**Areas affected:** The two look buttons at the edge of the world during Día de Muertos and Noche
de alebrijes, in both games.

**Done when:** In either season, both look buttons are visible in different places and each one
does its own thing when pressed.

*Tier: normal. Seen at: park at (5,6), season set to Muertos or Alebrijes, any screen size — only
one orange button appears where there should be two (`d1440-60-park-muertos.png`).*

---

## 8. The town's front door describes a different game

**In plain words:** The first screen says the town is an office you roam — hallways, the kitchen,
corner offices — with coworkers who carry quests, a file of right and wrong calls, a verdict when
you get one wrong, and a ladder from Junior to AI Legend. None of that is in the town. The button
that starts it says "Badge in", the strip above the world counts XP that nothing ever awards, the
hint under the world tells you to walk up to a coworker, and the admin switch in Settings offers
to let you remodel "the office". Only the first paragraph is about the backlog. For a tool the
owner opens most days, the front door is describing somebody else's building. Done looks like: the
door says what is behind it — a street of things you wrote down, and what to do with them.

**Notes:** The town's own words file says out loud that it was copied from Meridian's on
2026-09-05, and most of it was then rewritten; these particular lines were not. I am fairly
confident this is inherited rather than intended, but it is exactly the kind of thing that is
deliberate sometimes, so I am flagging rather than asserting. A second, smaller instance of the
same problem which the owner may want split off: in Settings the button that turns the seasonal
decoration **off** is called **"Year-round"** (*"Todo el año"*) — sitting in a row headed "Season"
between "By the calendar" and the two festivals, so the one button that removes the marigolds is
the one that sounds like it keeps them all year.

**Questions to consider:** Which of the strip above the world still earns its place in the town —
the name, the level, the XP bar? Should the town keep the ladder as a joke, or drop it? And should
"Year-round" simply be called "Off", or "No decoration"?

**Areas affected:** The town's opening screen, the button that starts it, the strip above the
world, the hint under the world, the admin line in Settings, and the season row's names. Meridian's
own words are untouched by any of this.

**Done when:** Nothing on the way into the town, or on the strip above it, describes an office, a
quest, a verdict or a ladder; and the button that turns a season off says so.

*Tier: normal. Seen at: the opening screen and the strip above the world on every boot,
`01-title.png`; the season row in Settings for the second half.*

---

## What I could not judge from here

- **Anything that needs a real thumb.** I can measure that a button is 21 px tall or that two
  buttons touch; I cannot feel a mis-tap. Findings 2 and 3 want five minutes on the owner's actual
  phone before anyone spends a day on them.
- **The town with real people in it.** I had no network, so every read came back empty: zero people
  on the street, zero notes on the board, "Filed as of — no date —". I never saw a crowded street,
  a house with four residents at its counter, the plaza in front of the hoarding, or what happens
  to the layout when a person's card is long. That is where I would expect the *next* set of
  problems, and it needs the owner signed in.
- **The barber's chair.** The town does not have one — no barber is declared here, so the chair and
  its fix (#126) can only be walked in Meridian. I did not review Meridian.
- **Whether the front door's words are deliberate** (finding 8). That is the owner's call, not a
  bug I can assert.
- **The 3D picture quality.** Being worked on right now and explicitly out of scope; I looked past
  it. I will say one thing adjacent to it and leave it there: on a 1440×900 desktop the town is a
  560-px column with the world at 534×427 and roughly 900 px of empty page below it. Whether that
  is a deliberate mobile-first choice or a room the town could grow into is the owner's decision,
  and fullscreen may already be the answer.
- **How any of this reads to someone who is not me.** I know the shape of these problems from
  fifteen years of watching people miss buttons. I do not know this owner's hands, screen or
  habits, and he does.

---

# Three answers back

*Added 2026-09-08 after the owner read the eight above. Finding 1 is fixed and shipped; 3, 4, 5,
6 and 7 are being built. What follows is what he asked me for directly: a prescription for
finding 2, a design recommendation on XP, and the design half of a layout system so the habit
behind 3, 4 and 5 stops repeating. — R.V.*

## Recommendations for finding 2

**In plain words:** a button's size is a promise about how important it is and how carefully you
have to aim. Right now the town makes the opposite promise: the things that change your backlog
are the smallest, tightest things on the sheet, and the things that copy a page are the biggest.
The fix is not to enlarge one button. It is to decide, once, that a sheet has exactly three kinds
of button, give each a size, and never let a new button be added without saying which kind it is.

### The numbers

Hand these to an engineer as they are. All in CSS pixels.

| | Height | Width | Gap to its neighbour |
|---|---|---|---|
| **Primary** — the one thing this sheet is for (Sign in, File a request, Save) | **48** | full width of the sheet's text column | 12 below |
| **Secondary** — the other things you can do here (Refresh, the index, narrow the street, ask for more context) | **44** | at most 2 per row under 430 px wide, 3 above; each at least 120 | **12** between, **16** if the neighbours differ in consequence |
| **Quiet** — the ones that are about the page, not about the work (Copy, Download) | **40**, text weight, no fill | shares one row | 12 |
| **Close** | **44 × 44**, an ✕ in the sheet's top-right corner | — | — |

Four more rules that carry as much weight as the sizes:

- **The hit area is 44 × 44 even when the paint is smaller.** A quiet 40-px button may keep its
  look and still take 44 px of touch by padding. Size the *target*, not only the ink.
- **No two targets ever touch.** Zero gap is the actual defect here; a miss that lands on nothing
  costs a second, a miss that lands on the neighbour costs whatever the neighbour does.
- **16 px, not 12, wherever the two neighbours differ in consequence.** Sign in beside Copy is the
  case that bit. A wider moat between a write and a read is cheap insurance.
- **Close leaves the bottom bar.** Put it in the corner at 44 × 44 and let Copy and Download be a
  quiet pair. Today Close is one of three identical grey boxes, so the way out looks exactly like
  the way to copy — the same confusion as finding 1, one layer up.

### The standard I am leaning on, and where I part from it

The published floor is **WCAG 2.2 Success Criterion 2.5.8, Target Size (Minimum), Level AA: 24 × 24
CSS px.** Its enhanced sibling, **2.5.5 at Level AAA, asks 44 × 44.** **Apple's Human Interface
Guidelines** say 44 × 44 pt; **Material Design** says a 48 × 48 dp target with at least 8 dp between.

I am recommending 44 minimum and 48 for the primary, which is AAA, Apple, and effectively Material
— not the AA floor. Two reasons I go past the standard rather than just meeting it:

1. **WCAG's AA rule has a spacing exception that would let today's buttons pass, and they are still
   wrong.** 2.5.8 permits an under-sized target if a 24-px circle centred on it does not touch a
   neighbour's circle. Today's 21-px buttons touch at zero gap, so they fail even that — but a
   version that merely spread them apart would technically conform and would still be a strip of
   hairlines you aim at with a thumb. Conformance is a floor, not a design.
2. **This is a one-handed tool used standing up.** It is a street you walk with your thumb, not a
   form you fill at a desk. The 24-px floor was written to accommodate dense productivity UI where
   density is the point. Density is not the point here; there are five buttons on the busiest
   sheet in the town.

Where I go *beyond* every one of them is the gap: Material's 8 dp is the lowest I would ever
accept, and I am asking for 12, and 16 between actions with different consequences. That is not in
any standard. It is there because the specific failure mode in this product is not "I cannot hit
it", it is "I hit the wrong one and nothing told me".

### The rule that stops it drifting again

The reason this happened is that the buttons a sheet grows are given a colour and nothing else, so
they fall back to whatever the browser's default button is — and a default is not a decision.

- **Three named roles, defined in one place: `do`, `also-do`, `about-the-page`.** A button added
  to a sheet declares its role. Nothing else about its size is settable at the point of use.
- **A missing role renders as `do`.** Fail loud and large, not quiet and small. A 48-px button in
  the wrong place gets noticed and fixed; a 21-px one does not.
- **A test that measures, in the shape this repo already writes them.** Walk every sheet the two
  games can open, at 390 × 560 and at 1440 × 900, in both languages; read every button's real
  rectangle; fail the build if any target is under 44 × 44, if any two targets' 44-px boxes
  intersect, or if a `about-the-page` button is taller than a `do` button on the same sheet. That
  is the same move that caught the sugar skulls against their window panes and the flat objects in
  3D: measure the thing, do not trust the flag.

---

## On XP in a place you inhabit

**In plain words:** my recommendation is **no.** Take the progress number out of the town
entirely, and put in its place a line about the *street*, not about you. A number that goes up is
a promise that going up is the point, and in a backlog the things that would make it go up —
filing more, closing more — are not things anybody should be encouraged to do more of. Meridian
should keep its XP; it earned it. The town should not have one.

### Why a number is wrong here specifically

- **XP is an instruction.** Whatever it counts, it teaches. Count filings and you teach filing.
  Count closures and you teach closing — including closing the thing you should have left open,
  which is the single most expensive mistake a backlog tool can encourage. There is no quantity in
  this street whose increase is reliably good.
- **A stuck number is a verdict.** Today the strip says **0 XP**, every session, forever. The
  owner opens his own tool and it tells him he has accomplished nothing. A quest game can say that
  because you are about to change it. A place you live cannot.
- **Places you inhabit are not scored.** This is the general rule and I would defend it anywhere:
  **a game with an ending tells you about yourself; a world you return to tells you about
  itself.** The inhabited-world games that get this right — the bulletin board, the mailbox, the
  neighbour who stops you at the gate — all replaced the score with a *what changed while you were
  away* surface. The town already has the best version of that I have seen in a small tool: la
  ventanilla's **"Since your last visit"**. It is just buried behind a walk and a Talk.

### What should stand in that corner instead

Promote what already exists. In the strip above the world, where "Rookie · Junior — 0 XP" is now,
put the two facts that change what he does next:

> **14 waiting · 3 answered since Tuesday**

Rules for that line, which matter more than its exact wording:

- **It is a fact, not a score.** It goes down as well as up, and neither direction is praise or
  blame. No colour that means "good", no arrow, no streak.
- **It says "since when".** A change indicator with no timestamp is just another number.
- **It is one line and it is the thing you would want from the doorway.** If a second line is
  needed, it is not the right first line.
- **It is tappable and it walks you there**, the way her index already does.

And take the `0XP` pill out of the world's own top-left corner. The corners inside the frame
belong to the world; that is a rule I set out properly in the next section, and this is its first
casualty.

### If he wants a number anyway

There is exactly one honest one: **how long the oldest waiting thing has been waiting.** It is the
only quantity in a backlog where lower is genuinely better and where letting it grow is a real
cost rather than an imagined one. Two warnings before he takes it: it can only ever shame, never
congratulate, and a tool that shames you gets opened less. I would show it inside la ventanilla's
card, where he goes looking, and not in the strip where it would meet him at the door.

**The names go with the number.** If the XP goes, so should *Rookie · Junior*, the ladder from
Junior to AI Legend, and "Badge in" — they are the same promise wearing different clothes. That is
the other half of finding 8, and this answer is why I would do it rather than merely tidy the copy.

---

## The habit: a layout system

**In plain words:** the habit is that the world's frame was treated as a known size and everything
that floats over it was measured against that size by hand. It was a fair assumption in 2D, where
the world was a fixed picture of ten tiles by eight. It stopped being true the moment the game
became something a camera looks at. What follows is the design half of a system: four rules, one
model per problem. An engineer implements each once; nothing is placed by hand again.

### 1. The floating buttons: a rail, not a ladder

**Replace the fixed ladder (16 / 72 / 128 / 184 / 240) with one anchored flex column, laid out by
flow.** The model is the standard stacked-action rail — a speed dial, a FAB stack, whatever name
you prefer — and its defining property is that **no button knows its own position.**

- One container, anchored to the frame's bottom-right, `display:flex`, `flex-direction:column-reverse`,
  `gap:12px`, padding from the frame's edge, `max-height:100%`.
- The container is transparent to the pointer; the buttons in it are not.
- Buttons are shown and hidden. They are never moved. The column re-flows.
- Each button declares **one priority number, once.** If the column would exceed the frame's
  height, the lowest priorities collapse into a single **⋯** that opens them as a list. Nothing
  ever leaves the frame.
- The same treatment for the top-right cluster. There are **two** hand-built ladders in there
  today, one counting up from the bottom and one counting down from the top, and they do not know
  about each other — the rotate button and the paw button are placed by hand at 58 and 104 from
  the top while the icon row sits at 10. One rail from the top, one from the bottom, both flowed.

Everything about finding 3 and finding 7 is a consequence of buttons owning their coordinates.
Take that away and neither can be written again.

### 2. Where a panel lives: one rule

> **A panel whose height is not fixed by the designer does not open inside the world's frame.**

That is the whole rule. Settings, the map and every sheet have content whose length depends on the
language, the season, how many houses exist and what the record returned — so none of them may
live in the frame. They open over the page: `position:fixed; inset:0`, the page's own scroller,
their own way out that stays visible.

Only things that are **bounded and short** may live inside the frame: the place name, the record
of recent lines (capped at two), the message bubble (capped at three), the action rails. If you
cannot state a maximum height in advance, it is not a frame item.

Two corollaries that come free and fix half of finding 4 without anyone thinking about it:

- **Every page-level panel closes on Escape and on a tap outside it.** Both. Always. Not one or
  the other, and never neither.
- **Every page-level panel opens scrolled to its own top and keeps its way out visible** — a
  sticky footer or a corner ✕. That cure was found once, for the chair, and never generalised;
  this is the rule that generalises it.

### 3. The layers: four bands, and what each may never do

Four layers, each with a reserved range. Nothing gets a stacking value that is not in a band.

| Layer | Range | What is there | Never allowed to |
|---|---|---|---|
| **World** | 0–9 | the canvas, 2D or 3D | know anything about the interface; take its height from the tile grid when the 3D camera is on |
| **HUD** | 10–19 | things anchored to the world's own corners: the place name, the record, the message bubble, the two action rails, the camera and settings icons | overlap another HUD item; be the only way to do something important; carry a hand-written offset; occupy the middle third of the frame |
| **Panels** | 20–29 | Settings, the map — page-level, dismissible | open inside the world's frame; refuse Escape; hide its own way out |
| **Sheets** | 30–39 | the paperwork: cards, boards, forms, the index | let a docked bar cover live content; be wider than the screen; take a field's width from its widest word |

**Both of the overlap bugs in this review are one disease: two things in different layers sharing
a number, or one thing having no number at all.** The message bubble currently outranks the
settings panel, so a toast draws over Settings. The record outranks the Talk button, which has no
value at all, so the record draws over the button you are trying to press. Neither is a bug in the
bubble or the record; both are the absence of a band.

**Reserved zones inside the HUD.** The two rails and the icon cluster own their strips and no
other HUD element may be placed into them. The message bubble gets the bottom-centre band, capped
at three lines and `max-width:min(86%, 40ch)`. The record gets the top-left band, capped at two
lines, with a visible ✕ rather than a whole-box tap that nothing announces.

### 4. What stops being possible, and what still needs its own fix

**Cannot be written again once the rules exist:**

- **Finding 3** — buttons off the top of the frame and on top of the icons. The rail flows and reserves.
- **Finding 7** — the 🎲 buried under the 🔁. Two children of a flex column cannot share a slot.
- **Finding 4** — Settings and the map trapped, the Close sliced. Rule 2 moves them out and rule 2's
  corollary gives them Escape.
- **Finding 1** — the Copy bar over Sign in. The sheet rule "a docked bar never covers live content"
  means the sheet reserves a bar's height of clearance at its foot.

**Still needs its own fix, because a layout system places things and does not size them:**

- **Finding 2** — the button roles and numbers above. Placement was never the problem there.
- **Finding 5** — the form wider than the screen. "Never wider than the screen" is a rule the
  system can *test*, but the cause is a field taking its width from a dropdown's longest option,
  and that is a field-style fix.
- **Finding 6** — the rows that never wrap. Same shape as 5, same test catches it, still its own fix.

**Untouched:** finding 8. Words are not layout.

The test that catches the second group is one test, and it is the same move this repo already
makes: open every panel and every sheet the two games can open, at 390 × 560 and 1440 × 900, in
both languages, and fail the build if anything's real rectangle escapes its container horizontally,
if any interactive element's rectangle falls outside the frame it belongs to, or if two elements
in different layers overlap. Measure the boxes. Do not trust the flags.

### 5. What actually changes when the thing underneath is a 3D viewport

This is the part I would not let an engineer skip, because the owner is right that the current
arrangement was a temporary answer to a 2D problem.

**(a) The frame stops being a given, so somebody has to choose it.** In 2D the world was ten tiles
by eight at 32 px — a fixed picture — and the panel's *height was derived from its width* by that
5:4. Nobody ever chose 266 px; it fell out of the tile grid on a 390-px screen. That is the true
origin of findings 3, 4 and 5. A 3D camera has no picture to protect — the fullscreen work already
says so in as many words. So **in 3D the layout should give the world a height and let the camera
take whatever shape it gets**: a clamp between a floor, a share of the screen, and a ceiling, so a
phone gets roughly 380 px of world instead of 266 and a laptop does not get a letterbox. The 2D
cameras keep their 5:4 by fitting inside that same box — which is **exactly what fullscreen
already does today.** Fullscreen has proved the pattern; the windowed view should copy it. This
single change relieves more crowding than any button fix on this list.

**(b) Small and dynamic viewport units, never `vh`.** On a phone the browser's own chrome grows
and shrinks as you scroll, so a height in `vh` is a lie exactly when it matters — the way out of a
panel ends up under the address bar. Anything that sizes itself against the screen uses `svh` or
`dvh`.

**(c) The centre of the frame is no longer "some floor".** In a fixed 2D view you knew what was
under the middle. With a camera that rotates, whatever a HUD element covers might be the person
you walked over to talk to. Hence the rule above: HUD hugs the edges, stays translucent, stays
dismissible, and never occupies the middle third. Today the record can take 58% of the width and
38% of the height at the top-left; in a rotating view that is a hole punched in the world.

**(d) Five things a UI person insists on that an engineer would not think to ask:**

1. **Safe areas.** A 3D view goes edge to edge in fullscreen, and phones have a notch and a home
   bar. Every anchor is inset by the device's own safe area, or the rail's last button sits under
   the home indicator on the exact device this is meant for.
2. **A floor on anything the world draws that the player must read.** The house boards, the signs
   and the counters over the faces are drawn *in* the scene, so they shrink with distance and with
   the frame — in the front camera on a phone those boards came out around eight pixels tall in my
   shot. Either give them a minimum on-screen size below a threshold, or make sure the same
   information exists somewhere in the HUD. A label you cannot read is not a label.
3. **Decide once what a pointer means, and make it mean that in all four cameras.** In 2D a touch
   was "walk". In 3D the same touch could be walk, rotate, or select the thing under it. The
   single biggest usability risk in the move to 3D is the same gesture meaning different things
   depending on which camera you are in.
4. **Give the interface a frame budget.** In 2D the UI cost nothing. In 3D the loop renders
   unconditionally — it keeps drawing the scene at full tilt behind every sheet — and several of
   the small controls sit over a live WebGL canvas with a backdrop blur, which is one of the more
   expensive things you can ask a phone to do. **Pause the render loop whenever a page-level panel
   or a sheet is open.** Rule 2 makes that trivial, because at that moment the world is behind a
   full-page overlay and nobody is looking at it. It buys frame rate and battery for free.
5. **The world moving is a UI event and needs the same easing as a panel.** The rotate is instant
   today. Anything under about 200 ms reads as a teleport and costs the player their bearings;
   250–350 ms with an ease keeps them. The owner and AJ already found this the hard way when the
   automatic turn was "too confusing" and got taken out. That was not a bug in turning — it was an
   unannounced, uneased camera move, which is a thing every interface has to learn once.

And one more, which is really a sixth: **contrast against a scene that changes.** In 2D the colour
behind the HUD was a known palette. In 3D the ground behind the top-left record can be pale stone,
dark water, or a marigold blaze depending on where you stand and what season it is. Translucent
tint is not enough; HUD text over a live scene needs a guaranteed backing, or a check that samples
what is actually behind each box. That one is cheap now and very expensive to retrofit after
someone has tuned every panel by eye.

---

# Second visit — 2026-09-10: the promises, and which of them anybody is actually keeping

*Rosa Villalobos again, headless Chromium, `mq-v136` / `ch-v78 · engine mq-v136`. Both games, at
390×844, 390×560, 844×390, 740×360 and 1440×900, in both languages, 3D and the flat cameras. This
time I was not looking for what is ugly. The owner asked what is **supposed** to work — so I took
every promise this project has made to a person, found the check that claims to keep it, and tried
to break the promise without making the check go red. I edited nothing and filed nothing.*

A word first, because it is deserved: since my last visit the things I found have not just been
fixed, they have been fixed **with a guard attached**, and the guards are unusually well written.
The one that opens every document a pack declares and asks the browser what is on top of each
visible button is better than what most teams ship. The 3D buffer/box aspect check is real
engineering. The habit is right.

The habit has one blind spot, and it is the same one that let the town onto the public internet:
**every one of these guards knows its subject by name.** By the id of a panel, by the class of a
button, by the file set that `index.html` loads, by one window shape, by one language. Each was
right on the day it was written. Each is now a guard standing at the one door that was open when
somebody last looked.

If I could change one thing it is not a pixel: **turn the phone sideways.** At 844×390 — a row that
is already in the pass list and covered by no suite — the world box is 427 px tall in a 390 px
window, the page is 697 px long, and standing next to Priya with a quest mark over her head the
**Talk button is 174 px below the bottom of the screen**. The check that exists for exactly this
measures the buttons against the *world*, and inside the world they are perfectly placed. The world
is what is off the screen.

Eight findings, best first. Tier is my suggestion.

---

## 1. Turn the phone sideways and the game runs off the bottom of the screen — Talk with it

**In plain words:** Hold the phone in landscape and the play area is taller than the screen. You see
the title, the rank strip, the room name and the top of the room; the bottom third of the world, the
joystick and every button that does something are below the fold, and the page has to be scrolled to
reach them. Standing right next to a character with a quest mark, the Talk button — the single most
important control in the game — sits 174 px past the bottom edge. Nothing tells you it is there. A
person who picks the phone up sideways sees a header and a picture and no way to play.

**Notes:** Measured, not guessed. At 844×390, with the 3D camera on, the world box comes back
332→534 px wide and **427 px tall in a 390 px window — 109 % of the screen**; the whole document is
697 px long. At 740×360 it is 119 %. Both games, identically. The cause is one line: the world's
height is the larger of *the width's 5:4* and *46 % of the screen*, and in a short wide window the
first term wins and there is no ceiling. The comment beside it says "never shorter than it is
today", which is the rule that breaks here — in landscape "never shorter" means "taller than the
screen". Two checks stand next to this and neither can see it: one asserts the world is **at least**
40 % of the screen and never that it is at most anything, and it only ever runs in portrait; the
other checks that the floating buttons sit inside the world's frame, which they do — it is the frame
that has left the screen. The pass list already admits landscape is covered by no suite; what it
does not say is what that costs, which is the whole game in that orientation.

**Questions to consider:** Should the world simply be capped at the screen (say 62 % of it) in a
short window, which is one term in one expression? Or is landscape a shape this game does not
support, in which case it should say so rather than half-work? Is the header worth 95 px of a 390 px
screen when the world is what people came for?

**Areas affected:** How tall the play area is; every control anchored to the bottom of it; the pass
list's landscape row.

**Done when:** At 844×390 and 740×360, in both games, standing beside a character: the world fits
the screen, and every button that can be pressed is on the screen at scroll position zero — checked
by a test, in landscape, against the **window** and not against the world's frame.

*Tier: high. Seen at: 844×390, Meridian HQ, standing at (2,3) beside Priya — Talk's bottom edge
reports 564 in a 390-tall window with the page unscrolled. Screenshot `mq-talk-844x390.png`.*

---

## 2. In landscape, the text lab opens with no way out on the screen — and Escape does not answer

**In plain words:** From the gear menu, "Text lab" opens a panel whose Apply and Close buttons are
below the bottom of the panel *and* below the bottom of the screen. Pressing Escape does nothing.
Tapping the dark outside does nothing. The panel does scroll, but most of its face is a text box
that takes the scroll instead, so the way out is discoverable only by luck. This is the same shape
as the chair that trapped the owner in #126, in a panel he can reach from the gear in two taps, and
it only happens sideways.

**Notes:** At 844×390 the panel's box ends at 367 and the Close button's rectangle is 433–477 — 87 px
past its own box and outside the window; asking the browser what is at that point answers nothing at
all. At 390×560 and 390×844 the same panel does not scroll and Close is plainly visible, which is
why nobody has seen it. The exporter behind the next row down has the same construction. The panel
check that would catch a way out below the fold is written for two panels by name and neither of
these is one of them (see finding 5), and the Escape contract is checked by nothing anywhere (see
finding 4).

**Questions to consider:** Should every panel's way out ride the bottom of its box the way Settings'
does, as a rule rather than per panel? Should a panel whose contents cannot fit be scrollable
*outside* its text areas, so a drag anywhere in the padding moves it?

**Areas affected:** The text lab and the exporter; the way out of any panel; the pass list's
landscape row.

**Done when:** Every panel either game can open, at every size in the matrix including landscape,
shows its way out on the screen without scrolling — and Escape leaves it.

*Tier: high. Seen at: 844×390 → gear → Text lab. Screenshot `mq-textlab-844x390.png`: no Close, no
Apply, Escape inert.*

---

## 3. The 44-pixel rule is kept in exactly one place, and broken in the two places a thumb goes most

**In plain words:** After my last visit the sheet buttons were rebuilt to a scale — 48 for the thing
you came to do, 44 for the rest, nothing under a 44-pixel target — and a check was written to hold
it. That check only ever looks at buttons on a sheet. The buttons that float over the world are
**39 px tall**. The three corner icons — map, fullscreen, theme — are **38 × 38**. The way out of
every panel — Settings, the map, the music box, the trolley pass, the fitting room — is **35 px
tall**. None of them reaches 44. Missing the way out of a panel is the worst one to miss.

**Notes:** Measured with every button forced visible, at 390×844, 844×390 and 1440×900, both games,
identical numbers: Talk 52×39, Treat 58×39, the two look buttons 48×39, the corner icons 38×38.
**One correction to my own first pass, kept rather than quietly deleted:** I first measured those
panel closes at 20 px and that was an artifact — a panel forced open by hand has not had its labels
filled in yet, and an empty button is only its padding. Opened the way a player opens them (gear →
Music, gear → Trolley pass, gear → Fitting room) every one reports 282×35 with the word *Done* in
it. 35 is the real number, and it is still under the floor. Nothing anywhere is 44. The check that
enforces 44 reads only
`.dbtn, .opt` inside the paper sheet — and in **Meridian** it measures *nothing at all*, because no
Meridian document declares any buttons (see finding 7). So the public game has a 44-pixel rule with
no instance of it under test.

**Questions to consider:** Is the floor a rule for the whole interface or only for paper? (I would
make it the whole interface — the failure that matters is pressing the wrong thing silently.) Should
the ink stay as it is and the *target* be padded to 44, which changes nothing visually?

**Areas affected:** The buttons over the world; the corner icons; the way out of every panel; the
one check that knows about 44.

**Done when:** A check opens every panel and every sheet both games can open, at 390×560 and
1440×900, in both languages, reads each button's real rectangle, and fails the build on any target
under 44 × 44 — which is the check I recommended last time, applied to more than sheets.

*Tier: normal — high if he agrees the way out of a panel counts as safety. Seen at: every size;
world-button numbers from 390×844 with all buttons shown, panel numbers from opening each panel
from the gear at 390×844.*

---

## 4. Escape and "tap the dark to leave" are promised for every panel; five of fourteen never answer, and no test has ever pressed Escape

**In plain words:** The game promises that a panel over the world can be left by pressing Escape or
tapping outside it. For five panels — the text lab, the exporter, the character maker, adopting a
dog and renaming one — neither does anything. The button is right there and says Cancel or Close,
but the game cannot find it, because it recognises a way out by how it was *named* rather than by
what it *does*. And no test in this repository has ever pressed the Escape key, so this has been
untrue since the day it was written down.

**Notes:** Reproduced on all fourteen panels at 390×844: Escape and a click on the backdrop close
nine of them and leave five open. The matcher accepts a button carrying the `close` class or an id
that *begins* with close/done/back — so `tlClose`, `exClose`, `nmCancel`, `adoptX` and `renX` are
invisible to it while `tvClose` passes only because somebody also gave it the class. That is a
naming convention doing a contract's job. Searching the whole test folder for the word Escape
returns zero hits.

**Questions to consider:** Should a panel declare its own way out (a `data-` attribute or one shared
class), rather than the engine guessing from names? Should the first-boot language chooser stay the
one deliberate exception, as it is today?

**Areas affected:** How a panel says which button is its way out; the two ways out that are not a
button; the engine suite.

**Done when:** For every panel either game can open, Escape leaves it and a tap on the dark leaves
it — except the ones deliberately held — and a test presses both, red first against today's engine.

*Tier: normal. Seen at: 390×844, each panel opened in turn, Escape then a click at (5,5).*

---

## 5. The check that a panel can be got out of knows two panels by name, and this shell has fourteen

**In plain words:** The guard written after my finding 4 is a good guard: it checks that a panel's
way out sits inside its own box, is on the screen when it opens, and rides the bottom so it cannot
scroll away. It runs on Settings and the map. There are fourteen panels. The other twelve — the
trolley, the fitting room, the dog, the park card, the theme editor, the text lab, the exporter, the
adoption form, the rename box, the trolley pass, the character maker — can regress in any of those
three ways with every suite green, and one of them already has (finding 2).

**Notes:** The list of ids is written into the check by hand. A companion check does sweep *all*
panels — but only to assert each one is positioned over the page rather than inside the world's
frame; it says nothing about whether you can get out. Three panels have no button the matcher can
recognise at all and are simply skipped in silence rather than reported. Silence is the part I would
change: a guard that cannot find its subject should say so, not pass.

**Questions to consider:** Should the check enumerate every element that is a panel and require each
to satisfy the contract, so a new panel is covered on the day it is added? Should a panel with no
recognisable way out be a build failure rather than a skip?

**Areas affected:** The engine suite's panel check; anything new that becomes a panel.

**Done when:** The check derives its list from the shell instead of carrying one, covers every
panel in both games at every size in the matrix, and fails on a panel it cannot find a way out of.

*Tier: normal. Seen at: reading the check against a sweep of all fourteen panels at three sizes.*

---

## 6. Every layout check runs in English — including the one that exists because Spanish overflowed

**In plain words:** My finding 6 last time was that the rows of choices in Settings ran off the panel
**in Spanish**, on a laptop as well as a phone. It was fixed and a check was written, and that check
even prints the language in its failure message. The language is always English. No suite anywhere
switches the game to Spanish before measuring anything. So the guard for a Spanish bug has never
once looked at Spanish, and the same is true of every other measurement in the interface pass.

**Notes:** The engine starts in English and only a click on the language button or a saved
preference changes it; searching the suites for anything that sets it turns up nothing. I re-ran the
wrap check by hand in Spanish at 390×844 and 1440×900 with every drawer open and it is clean today —
so this is not a live overflow, it is a guard that cannot see the half of the product the bug was
in. Spanish is reliably 15–30 % longer than English; the next long label lands unmeasured. Worth
noting beside it: the two shells carry the same 350 lines of interface CSS and are byte-identical
today, with nothing checking that they stay that way.

**Questions to consider:** Should the interface pass simply run twice, once per language, which is
one loop around what already exists? Or should the fixture be the longest string in either language,
so it is measured whatever it is set to?

**Areas affected:** The engine suite's interface section; anything that measures a row, a button or
a label.

**Done when:** Every measurement in the interface pass runs in both languages, in both games, and
one of them goes red if a Spanish label is made long enough to overflow.

*Tier: normal. Seen at: 390×844 and 1440×900, Settings with all drawers open, English and Spanish.*

---

## 7. The rule that the copy buttons must not dominate the sheet is unenforceable in Meridian and half-enforced in the town

**In plain words:** The scale I proposed included one rule with a reason: the buttons that only copy
or download the page may never be the most prominent thing on it, because the sheet is there to be
read and acted on. The check compares the copy bar's *height* against the height of the buttons that
do something — so on a sheet with nothing to do it never runs, and in Meridian **no document has any
buttons at all**, which means the whole rule is a no-op in the public game. In the town at phone size
the copy bar is 37 % of the paper and in landscape 42 %: three big buttons under five lines of text.

**Notes:** Measured across every document both packs declare. Meridian: 0 action buttons on every
sheet, doc body 193–213 px against a 61 px bar. The town: the window sheet has 6, the request sheet
2, the board sheet 0 — and the board is the one where the bar is 37 % portrait, 42 % landscape.
Prominence is area and position, not height, and the check only knows height.

**Questions to consider:** Should Close move to the corner of the sheet at 44 × 44 and let Copy and
Download be a quiet pair, as I suggested last time? Should the rule be expressed as a share of the
paper — the bar may never take more than a quarter of it — which is measurable on any sheet with or
without action buttons?

**Areas affected:** The bar at the foot of every sheet; the check that ranks buttons by prominence.

**Done when:** On every document both games declare, at every size in the matrix, the bar at the
foot is under a stated share of the sheet, and the check reports the sheets where it had nothing to
compare rather than passing them.

*Tier: normal. Seen at: 390×844, 390×560 and 844×390, both games, every declared document.*

---

## 8. The pass list is wrong about itself in two rows, and a wrong list is worse than a short one

**In plain words:** The checklist's own "known gaps" section says the fullscreen row is not
automated and that no suite checks the town at phone size. Both are now out of date: fullscreen is
checked automatically in both games, and the town is driven at 390×560 and 390×844 by the shared
engine suite every run. The one gap on that list that is completely true is landscape — which is
where findings 1 and 2 came from. I am reporting this because the list decides what a person does by
hand, and a list that cries wolf on two rows is a list people stop reading before they reach the row
that matters.

**Notes:** The engine suite adds the fullscreen class to the viewport and asserts the render buffer's
shape matches the box it is shown in, windowed and fullscreen, in both games — that is E1's exact
fault, automated. It runs at one window shape only (480 × 900, portrait), so the honest sentence is
"automated at one shape", not "not automated". The town is run at phone size by the same suite,
though the town's *own* suite still opens no window size at all and therefore sees the street, the
sheets and the request form only at a desktop default. Correcting the register also has a cost worth
naming: two of the three gaps disappear and the remaining one gets sharper.

**Questions to consider:** Should each gap row carry the file and line of the check that closed it,
so the row can be verified rather than believed? Should the town's own suite adopt the matrix, given
that its street and its sheets are the parts the shared suite never sees?

**Areas affected:** The pass list; the town's own suite's window size.

**Done when:** Every row of the gap list is either true or gone, and the landscape row names what it
costs.

*Tier: low, but cheap. Seen at: reading the register against the suites and re-running both.*

---

## Two smaller things, written down rather than made findings

- **The floor on in-scene text is enforced by reading the source for a literal.** It matches a font
  size written as a plain number inside double quotes. A size that is computed — and one already is,
  in the town plan's labels — or written in single quotes or a template string is invisible to it,
  so a new world can author a five-pixel sign and pass. The rule's other half, that information must
  never exist *only* in the scene, is not checked by anything at all; it may not be checkable, but
  it should be labelled as a promise a person keeps.
- **The two shells' interface CSS is duplicated and identical, and nothing keeps it that way.** A
  fix applied to one and forgotten in the other ships with four green suites, because the shared
  suite runs the same assertions against both and only catches divergences somebody thought to
  assert.

## What I could not judge from here

- **A real thumb.** Every hit-target number above is geometry. Whether 39 px feels bad in the hand,
  and whether the 20 px way out is as bad as I think, wants the owner's own thumb on his own phone.
- **A real rotation.** I set a landscape viewport; I did not rotate a device. The address bar, the
  safe-area insets on a notched phone and the small-viewport height behave differently on hardware,
  and finding 1 could be worse there, not better.
- **Whether landscape is supported at all.** I am treating it as supported because it is a row in
  the pass list. If the owner's answer is "the game is portrait", finding 1 becomes a one-line
  message instead of a layout fix — but it should be a decision, not the current silence.
- **The town's street at phone size.** The shared suite drives the town's engine at 390, but I did
  not audit the street's own furniture — the boards, the signs, the six houses — at that size this
  visit. My last visit's notes on in-scene text still stand as far as I know.
