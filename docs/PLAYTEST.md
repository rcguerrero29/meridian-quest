# The Week One tour — a playtest story

Follow this as a story, in order. Each stop says **what to do** and **what you should
see** — if what you see differs, note the stop number and tell Claude "playtest stop N
broke" and describe it; each stop maps to one engine or content area, so the bug hunt
starts in the right file. (In a Claude session, `/playtest` loads the guide skill.)

Saves are continuous, so you can stop anywhere and Continue later. A clean run lives
behind ⚙️ Settings → Restart (two-tap confirm — it is a testing tool, not a story exit).

**The maps are DYNAMIC.** The town map (🗺️) and the world itself redraw from story
state: the construction site advances with La Obra's quests, El Mercado grows onto
its lot when Week Two opens, and a new game hands the lots back empty. If a map looks
"wrong," first ask: which chapter is this save in?

---

**1 · Monday morning.** Open the game, pick a name and a class, Begin.
*See:* the HQ office, your character with the outfit you picked, coworkers with ❗.
The intro toast explains movement. *(engine: boot, character creator)*

**2 · The first calls.** Talk to Priya (🛠️) and take "The 98% quote-bot". Answer
wrong once on purpose — then retry until right.
*See:* a wrong pick is marked against that quest (hearts are off unless the pack's
`STAKES` turns them on), shows the verdict + codex but never reveals the
right answer; the NPC keeps the ❗ until you solve it; retrying pays only the XP
difference. *(engine: retry rules, XP math)*

**3 · The office dog.** Find Frederick 🐕 and give him a treat three times.
*See:* on the third treat, his secret side quest unlocks (toast), and beating it later
auto-equips his red bandana. *(engine: animal interactions; content: Frederick quest)*

**4 · Change the weather.** ⚙️ Settings → Color theme → **Fairy 🧚**.
*See:* the whole WORLD shifts — floors, walls, water, fences take a lavender wash
(not just the menus); sparkle motes drift over the map; coworkers' shirts go
whimsical. Your own outfit, everyone's skin/hair, and the animals stay unchanged.
Try Forest 🌿 (drifting petals) and Sunset 🌇 (fireflies) too. Landmarks (doors, the
taco cones, La Cocina's awning) keep their colors on purpose — wayfinding beats vibes.
*(engine: canvas theming + ambient layer)*

**5 · Into the barrio.** Take the E door (bottom of HQ) to the street.
*See:* jacaranda trees along the south sidewalk (purple blooms, swaying canopy),
flower beds by La Cocina, grass tufts, a pink butterfly near the beds, a hummingbird
by the flowers, Paloma the pigeon, Lorenzo the parrot on the fence. Bump into a tree
for a flavor line. *(content: maps flora + critter spawns; engine: critter kinds)*

**6 · Lunch at La Cocina.** Enter under the striped awning (L door). Do Rosa's and
Chuy's quests; pet Canela.
*See:* both quests complete only on the right answer; Canela slow-blinks. *(content:
lc quests)*

**7 · The construction site.** Back on the street: Don Güero (👷, west end) and Lupe
(📐, inside the site). Do BOTH their quests — and for the real test, stand right next
to Lupe INSIDE the site fence when you answer the second one correctly.
*See:* the moment the second quest completes, the building finishes around you and
you are stepped out to the new Studio's front door — never walled in, no admin rescue
needed. The toast announces the progress. Note: stage 1 (after the FIRST of the two
quests) only swaps girders for frames — subtle on purpose; stage 2 is the big change.
*(engine: applyStaged + rescue)*

**8 · The Studio.** Enter the new O door. Meet Xochi, do "The collar drop", then talk
to her again.
*See:* the wardrobe opens — dress Frederick AND Canela; a 🧵 Wardrobe button also
appears in ⚙️ Settings. *(engine: wardrobe; content: Xochi quest)*

**9 · Calle Dos.** Ride the trolley (🚋 stop, west end of the street).
*See:* the second street — trees along the canal, the construction crew (Beto, Kike,
Mari — chat only), a blue butterfly, and the crew's grey street cat in the pen (walk
up: "🐾 Pet the street cat"). *(content: ex map + critters)*

**10 · Feria de logros.** Finish the remaining office quests (Floor 2 stairs are in
the corner office). When the last one completes, the chapter closes.
*See:* the ending matches your grade — the share of quests you solved clean (9 in 10 =
flawless / 6 in 10 = strong / fewer = survived); hearts never pick it;
the epilogue teases Week Two. *(engine: endings)*

**11 · Take it with you.** ⚙️ Settings → 🎫 Trolley Pass.
*See:* your save as a QR / share link; opening it on another device offers to board —
and never overwrites without asking. Export → 🐾 gives Frederick's care pack (.ics
works in your calendar). *(engine: Trolley Pass, exports)*

**12 · Turn up the radio.** ⚙️ Settings → 🎵 Music (starts after your first tap —
phones require a gesture).
*See/hear:* a soft generative tune that matches the theme — lo-fi office on Meridian,
little bells on Fairy, marimba on Forest, warm dusk on Sunset. The slider changes
volume live; 🔇 mutes; both stick across sessions; sound pauses when the app is in
the background. Toggling music on (or releasing the slider) plays a quick three-note
chirp — instant proof the audio path works. **iPhone gotcha:** the physical ring/silent
switch can mute web audio entirely — if you hear nothing, flip the ringer on and press
volume-up. *(engine: MUSIC — procedural WebAudio, no files)*

**13 · Move somebody in.** ⚙️ Settings → Admin mode On → tap the 🧍 Character brush →
tap an empty tile → type a name.
*See:* a townsperson with a random look moves in and chats when talked to (they hold
no quests — they just vibe). Tap them again with 🧍 to move them out. Up to 12, saved
on this device. Now the magic: name one **Harry Potter** — the barrio reacts. Name
one **Sonny** — a lemon beagle trots in instead, and petting him has opinions. Try
naming your hero or Frederick's care-pack pet something legendary too.
*(engine: chill townsfolk + EGGS; content: npcs.js)*

---

**14 · Week Two opens.** Finish all of Week One, claim your title — the epilogue now
offers **▶ Monday — Week Two**. Take it.
*See:* Doña Chelo unlocking the gate on the southwest lot —
**El Mercado Robles grows onto the lot as the chapter begins** (the empty lot is real:
a new game hands it back). Inside: Doña Chelo, Nando, Perla, Chava (everything is
chile), Frijol the bodega cat. Eight quests (16-23) put you in the **AI product
manager** chair; five close the chapter. Export → the decision report prints your
calls as a portfolio memo. Butterflies and the colibrí are watchable now, doors glow
underneath (they open — walls don't), and the last activity message lingers in the
top corner ticker (tap to dismiss).
*(content: me world + growth data, quests 16-23; engine: chapters, growth, export)*

**15 · Tilt the world.** ⚙️ Settings → Camera → **◆ Isometric**.
*See:* the same city in three-quarter view — diamond streets, buildings and furniture
extruded with real height, everyone standing upright, doors glowing gold on the
ground, jacarandas with swaying canopies. Walk around; depth sorting keeps you in
front of and behind things correctly. Switch back to 🗺️ Top-down any time — same
save, same world, just a different camera. Admin tile-painting asks for Top-down
(the tap math differs). *(engine: drawIso — a second renderer over the same data)*

## Known quirks (not bugs)

- **On a laptop:** arrows or WASD walk (capitals and non-QWERTY layouts included since
  `mq-v52`), Enter talks to the person in front of you. The joystick and d-pad are for
  touch; pick *Swipe* in Settings to hide them on a desktop.
- **A save from before `mq-v52` may play the mercado's Saturday once more** at Continue:
  the old loader reset the district counter on every open, and the repair replays only a
  Saturday the save never recorded as claimed. After "Out to the street" the toast names
  the lot that opened.

- A toast can briefly float over an open settings panel.
- Offline/file:// runs use system fonts (Google Fonts is the only external fetch).
- Lorenzo may end up perched on the finished Studio — he's a parrot, he's fine.
- Admin-mode map edits (`mqedits`) replay on boot, per device, by design.
- Isometric v1: swipe directions feel slightly rotated (grid movement under a tilted
  camera), and all walls share the block style — per-glyph iso art is the planned
  TILEART-ISO pack (IDEAS §10 step 2).
