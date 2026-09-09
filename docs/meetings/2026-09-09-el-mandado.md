# ¿Tiene trabajo? — the pulled story, judged

*2026-09-09. The owner's proposal: `[OWNER]` "a person can have the drive to ask for quests from
businesses, somewhat realistic no?"*

**Three agents, deliberately not talking to each other.** Tavo judged the mechanic against this
engine. Nacho judged it as story. A **research agent with web access** — the first in this project's
history — went and found what other games actually do.

**Every claim below is tagged** per `docs/SOURCES.md`: `[CODE]` verified at `file:line`, `[WEB]`
with a URL, `[TRAINING]` an unsourced opinion, `[OWNER]` his words. The two designers disagreed.
The research decided it, and not by picking a side.

---

## The disagreement

**Nacho: yes.** Ship it as *el mandado* — an errand at the door — plus two greetings per business,
cold and referred, with the referral demoted from key to temperature.

**Tavo: no, do not build it.** `[CODE]` A fresh save offers **fourteen** ❗, eight of them in the
starting room, and a district closes at 12 of 16 (`content/meridian/config.js:219–247`). *"A pull
mechanic pays out where a player has run dry. This player never runs dry — their problem at hour one
is triage, not hunger."* And `[CODE]` a business's *building* is what opening its district
constructs (`GROWTH.ribbons`, `config.js:66–71`) — **on a fresh save you cannot ask Doña Chelo for
work because there is no El Mercado to walk into.**

---

## The finding that reframes everything, and it is neither of theirs

`[CODE]` `checkTalk` shows the Talk button only for
`pendingAt(n)!==undefined || n.chat` (`engine/engine.js:2977`).

**31 people in Meridian carry quests. 25 of them have no `chat` lines.**

Finish someone's quests and the Talk button **disappears from them permanently**. Doña Chelo has
three quests and no chat; answer all three and the woman you did five jobs for stops being a person
you can speak to. In all of El Mercado, only Chava still talks. *(Verified by hand, not relayed.)*

Now put that against the research:

> `[WEB]` Fallout 4's Preston Garvey became the genre's cautionary tale — an unbounded quest
> generator attached to a *character*, so **the character is destroyed by it**, and players' loudest
> ask was a way to decline.
> [steamcommunity.com](https://steamcommunity.com/app/377160/discussions/0/412447331651937092/)

`[TRAINING]` Meridian has **the Garvey problem inverted**. Not a giver who never runs dry — givers
who run dry **invisibly**, and vanish. The research's own prescription is the fix: *let a giver run
dry visibly, and in character.* That is exactly Tavo's recommendation, arrived at from the opposite
end of the world.

---

## What other games actually do

**Asking an NPC directly is a solved loop.** `[WEB]` Mount & Blade lets you ask a lord or guild
master for a task; a cooldown means a giver can honestly have nothing, and **declining costs 5
relation but gains 3 Honour** — refusing is a real choice, not a dead end.
[StrategyWiki](https://strategywiki.org/wiki/Mount&Blade/Faction_quests) ·
[cooldown](https://steamcommunity.com/app/48700/discussions/6/1473096694444662968/)

`[WEB]` **Fable II** goes further — you walk into a shop and *take the job*, with a multiplier that
builds on good work and resets on a mistake. [Fable wiki](https://fable.fandom.com/wiki/Jobs)

**Scarcity is the design, not a limitation.** `[WEB]` Stardew Valley's Help Wanted board posts
**one** randomly generated request per day, from a named person, two-day deadline.
[Stardew wiki](https://stardewvalleywiki.com/Quests) · `[WEB]` My Time at Portia is the same shape
with teeth — one commission a day, and **a rival builder who snatches jobs in front of you**.
[Portia](https://mytimeatportia.fandom.com/wiki/Commissions)

**The failures are documented at both ends.** `[WEB]` FFXIV's levequest allowance regenerates 3 per
12 hours and players argue the cap *"does not create more interesting gameplay through
limitations"* ([forum](https://forum.square-enix.com/ffxiv/threads/379622)); Witcher 3 players report
the opposite — *"once you clear a notice board, that's it"*
([ResetEra](https://www.resetera.com/threads/i-love-the-witcher-3-but-i-have-some-serious-gripes-about-the-quest-design-and-witcher-senses.45265/page-2)).
`[WEB]` FFXI's Fame is the worst case: quests behind a reputation stat **with no hint the gate
existed** ([forum](https://forum.square-enix.com/ffxi/threads/12874)).

### The rule that resolves the whole argument

> **Pull the quest. Never pull the record.**

`[WEB]` Outer Wilds is the strongest proof pull works — built to motivate exploration *"not through
assigning missions"* but diegetically — **and it pays for that with the Ship Log**, which records
every discovery, links them, and flags *"more to explore"* where something is unfinished.
[GDC](https://gdcvault.com/play/1027008/Independent-Games-Summit-Sparking-Curiosity) ·
[Ship Log](https://nh.outerwildsmods.com/guides/ship-log/)

`[WEB]` Majora's Mask does the same job socially: the **Bombers' Notebook** tracks who needs what and
when they will be there, adding a Promise Sticker each time you agree to something.
[Zelda wiki](https://zelda.fandom.com/wiki/Bombers'_Notebook)

`[WEB]` And Morrowind is the cost of dropping the record entirely — praised as immersive, genuinely
frustrating *"if the directions were wrong or misleading, which unfortunately happens."*
[CBR](https://www.cbr.com/bethesda-elder-scrolls-morrowind-games-without-quest-markers/)

**This answers Tavo's strongest objection.** He said a pulled story either duplicates the ❗ or
smuggles in a hidden quest log, and *"there is no third option."* The third option is the one Outer
Wilds and Majora's Mask both took: **a record of people, not of tasks.** And this project already
has that ticket open — **[#160, find-quest mode on the map](https://github.com/rcguerrero29/meridian-quest/issues/160)**,
filed before any of this was researched.

---

## Twists that people actually like

| Twist | Where it works | Source |
|---|---|---|
| **A no that costs nothing but a walk** | Mount & Blade's cooldown — a giver can honestly have nothing | `[WEB]` [M&B](https://steamcommunity.com/app/48700/discussions/6/1473096694444662968/) |
| **Reputation changes the answer** | Kingdom Come: good standing gets warm greetings and discounts; bad standing, *"they may not even talk to you"* | `[WEB]` [KCD](https://kingdom-come-deliverance.fandom.com/wiki/Reputation) |
| **Someone else takes the job** | Portia's Higgins physically snatching a commission | `[WEB]` [Portia](https://mytimeatportia.fandom.com/wiki/Commissions) |
| **The NPC asks *you* first** | Yakuza substories — a member of the public approaches you on the street with a problem | `[WEB]` [Yakuza](https://yakuza.fandom.com/wiki/Substories) |
| **The job is not what it said** | Witcher 3's *Missing Son* opens as a stock beast contract and refuses the happy ending | `[WEB]` [Witcher](https://witcher.fandom.com/wiki/The_Witcher_3_contracts) |

**Nacho independently invented the Yakuza one and named it.** *El mandado*: the person you ask for
work asks *you* for a favour first, and **the favour is the diagnosis** — carry the box, ride the
van, hold the flashlight. `[CODE]` It is already in the pack in the wrong place: Moy's *"Profe, walk
with me, it's faster than explaining"* (`quests.en.js:294`), buried mid-district instead of at the
door.

His refusals, which all carry something rather than being a no:

> *"Not now, joven. Come at four. Not four your four — four mine, when the trays come out."*
> *"Nothing. — The fourth car's on the sidewalk because the paper isn't ready. But nothing."*
> *"I don't take walk-ins, colega. I take referrals and appointments. You can get either. One is faster."*

---

## Which districts survive being met cold

`[CODE]` Nacho read the quests rather than guessing:

| District | Cold? | Why |
|---|---|---|
| Calle Principal | must be first | It is your job. Nothing to ask for |
| El Mercado | **yes** | *"Mijo, siéntate. I made a list."* Zero dependency (`:183`) |
| Taller Herrera | **no** | Quest 24 **is** Chelo's referral: *"I didn't say the computer guy was for you"* (`:272`) |
| La Espiga | **two lines** | Her problem is visible — the trash — so a cold variant is cheap (`:361`) |
| Velázquez | **yes** | *"Get in, inge, Pelusa doesn't bite"* names the drive-through, not a neighbour (`:451`) |
| Nolasco | **no, deliberately** | *"Vero sent you with an envelope… I wrote them down"* (`:541`). The man whose premise is that he reads your file cannot be the first file |

**The reframe worth keeping:** the referral stops being the **key** and becomes the **temperature** —
which is a rule `docs/OWNER.md` already carries (*"a cold referral opens the door colder; it never
locks it"*). Pull is that rule finally getting a mechanism.

---

## The structural price, verified twice

`[CODE]` `const qOpen=qi=>{const c=qChapter(qi);return c<0||c<=chSeen;}` (`engine.js:312`), and
`let chSeen=0` (`:330`). **`chSeen` is a scalar high-water mark.** District 3 can only be open if 0,
1 and 2 are — districts open in strict array order, and there is no way to say *"the mercado is open
but the taller is not."* A genuinely pulled story needs a **set**, and `chSeen` is saved (`SV.cs`),
so that is a save migration — the same class of problem as `docs/TAGS.md` L9.

`[CODE]` And separately: `ENDLESS` switches off `chDue()` (`:303`), which switches off the ceremony
— **and the ceremony is carrying the mechanism**, because the ending panel's button (`:3443`) is the
only writer of `chSeen`. Tavo: *"That is a coupling bug, not a design flaw in pushing."*

**Both designers, independently, from opposite directions, recommended the same first move:
decouple `chSeen` from the panel button.**

---

## Placeable objects — the owner's grass

`[OWNER]` *"a nice patch of grass could eventually be a place to customize and put down a magic
portal or house or building, launching mini game or quest where don guero helps build."*

`[WEB]` **The smallest fun version is one plot, one decision, visible consequence.** Animal Crossing
ships a 4×4 house plot you site anywhere; moving costs 50,000 bells and one building per day —
**cheap to place, expensive to undo, so the choice matters**.
[Nookipedia](https://nookipedia.com/wiki/Villager_house)

`[WEB]` **Rules beat freeform.** Terraria validates a house against a short checklist — enclosed,
player-placed walls, light, flat surface, comfort item, door — then layers happiness on biome and
neighbours, and crucially happiness *"is not affected by a house's appearance or decoration"*, so
the simulation stays legible. [Terraria](https://terraria.wiki.gg/wiki/Guide:NPC_Happiness)

`[WEB]` **The build site as quest is Tarrey Town.** Hudson asks for 10 bundles of wood, then keeps
asking, and a town assembles from your deliveries — *"an hour or so to simply work towards something
brilliant."* [Nintendo Wire](https://nintendowire.com/guides/the-legend-of-zelda-breath-of-the-wild/tarrey-town/)
**That is the owner's Don-Güero-helps-build idea, already proven.**

`[WEB]` **And how it becomes a chore:** Fallout 4's settlements — *"a constant supply of
busywork,"* sites cluttered with junk you cannot remove.
[ScreenRant](https://screenrant.com/fallout-4-settlement-building-mechanic-cons/)

`[CODE]` This engine already has the bones: `BUILDTPL` + `buildInterior` create a room at load, and
**`buildSafe` refuses a build whose door opens onto nothing** — which is Terraria's validation rule,
already written, already enforced.

---

## What to avoid, with reasons

1. `[WEB]` **A giver with infinite jobs** — Garvey. Let shops run dry and **say so**.
2. `[WEB]` **Hidden gates** — FFXI Fame. If reputation changes the answer, the *no* must name why.
3. `[WEB]` **Silent expiry** — Dragon's Dogma escorts vanishing on affinity or story change.
   [wiki](https://dragonsdogma.fandom.com/wiki/Notice_Board)
4. `[WEB]` **Artificial ask-limits** — FFXIV allowances. Gate by fiction (the baker only bakes
   Tuesdays), never by a token bucket.
5. `[WEB]` **Replacing a pushed counter with a pulled checklist** — the same checklist fatigue in a
   different hat. [GameRant](https://gamerant.com/outer-wilds-open-world-exploration-no-map-ubisoft-markers-bad-why/)
6. `[TRAINING]` **Do not make asking free in every shop at once.** If all N shops answer instantly
   you have built a menu with walking. Stardew's answer is scarcity: one job, one day, one person.
7. `[CODE]` **Nacho's refusal:** a job board with an accent — an *Ask for work* button on every NPC
   that means *give me content*, every shop answering in the same shape, and the ❗ inverting from
   *this neighbour has something to say* into *nothing here*, which `docs/STORY.md` bans outright.

---

## The build order all three converge on

1. **Decouple `chSeen` from the ceremony.** A district that meets its `need` opens the next whether
   or not a panel plays; `ENDLESS` suppresses the panel only. Red-first: an endless pack with two
   districts must reach district two. **Both designers, independently. This is the actual fix for
   the block and it is smaller than either proposal.**
2. **Give the 25 silent people their voices back.** `chat` lines, one of which is an honest *nothing
   today*. Content only, **zero engine change**, and it is the Garvey problem solved the right way
   round — a giver running dry *visibly, in character*.
3. **The record, not the marker** — [#160](https://github.com/rcguerrero29/meridian-quest/issues/160).
   Outer Wilds and Majora's Mask both prove pull needs a ledger of *people*, not of tasks. This is
   what makes any of the rest safe.
4. **Then, and only then, *el mandado*** — the errand at the door, and two greetings per business.
   Story work, and it wants a world that actually needs pull.

**Not on the list:** XP for asking, a refusal that names a condition, a "places that might have work"
list, and `chSeen` becoming a set — that last one is real but it is a save migration and it waits
for a world that needs it.

---

### A note on the research itself

`[WEB]` claims came from a research agent with `WebSearch`/`WebFetch` — the first time any agent in
this project has had access to anything outside the repository. **The egress proxy blocked
forbes.com, gamedeveloper.com, arxiv.org and several other hosts**, so some depth came from search
extracts rather than full-text fetches. Every URL above is what was actually reachable, and a reader
should treat wiki citations as what they are: accurate about mechanics, not peer-reviewed.
