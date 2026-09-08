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
