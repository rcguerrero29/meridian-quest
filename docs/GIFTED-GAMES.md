# Gifted games — the research, and what this engine already has

*Opened 2026-09-10 at the owner's word: "they will be 'mini games'… but our games arent supposed to
be like 100 games, more for special ocations and gifts — gifted games right?… again we dont have to
build for them yet, but this is why we want as custom as possible."*

**This is a reference, not a build order.** Nothing is being built from it. It exists so that when a
seam is grown, it is the right seam. Claims are tagged per `docs/SOURCES.md`: `[WEB]` with a URL,
`[CODE]` with file:line, `[TRAINING]` for an unsourced opinion which says so.

---

## 1 · The category already exists, and it is hand-made at ~100 hours a unit

`[WEB]` **"Personalized video game"** is an established term — a game made for one specific person,
usually as a gift, using their real names, places and events. There is a small commercial trade
([Bday Game](https://bdaygame.com/), [Muksun](https://muksungames.com/products/custom-video-game))
and a large amateur one. The documented one-offs are the shape to note: *Lolo's Bizarre Adventure*,
a side-scroller whose levels are a couple's real dates, took **about a hundred hours of one
person's time**; a [marriage proposal delivered as a
game](https://www.nbcnews.com/tech/tech-news/press-start-love-man-wins-yes-video-game-marriage-proposal-flna2D11820746)
made the news precisely because it was so much work.

**So the opportunity is not a new genre. It is getting the per-gift cost from a hundred hours down
to an evening of filling in a pack file.** Every recommendation below should be read as: *does this
let the pack carry the personal part?*

## 2 · The size of a finished gift

| | |
|---|---|
| `[WEB]` Median mobile session, 2025 | **5–6 minutes** ([GameAnalytics benchmarks](https://gamedevreports.substack.com/p/gameanalytics-mobile-gaming-benchmarks)) |
| `[WEB]` Game-jam guidance, arrived at independently | *"better to keep the game to 5–10 minutes and have a short, polished experience than a long game that didn't get finished"* ([Defold](https://defold.com/2022/07/22/Big-list-of-game-jam-advice/)) |
| `[WEB]` [Neo-Twiny Jam](https://itch.io/jam/neo-twiny-jam-24) | **500 words total** — and hundreds of complete games are catalogued at that size |
| `[WEB]` [Bitsy](https://www.pcgamer.com/people-are-making-amazing-tiny-games-with-this-free-tool-and-i-cant-get-enough-of-them/) | **4,000+ finished games**, and the community norm that *"there's no stigma in delivering a game that's only 30 seconds long"* |

**A gift played five times at eight minutes is forty minutes of attention in its entire life.** That
is the budget. It also disqualifies whole genres structurally: `[WEB]` card, strategy and sim games
have median sessions of **50+ minutes**, longer than the gift's whole lifetime, so they cannot be
shrunk without becoming a demo of themselves.

**The north star is Bitsy-with-a-pack-file, not a mini-game arcade.** Bitsy's creator describes its
goal as *"games where you can walk around, talk to people, and be somewhere"* — which is a one-line
description of what this engine already does.

## 3 · What we already ship, and it is more than anyone thought

`[CODE]` Verified against `engine/engine.js` (5131 lines), not against the docs.

| The research said a gift needs… | We have it at | Note |
|---|---|---|
| **An occasion layer** — *"occasion is a genre constraint, not a skin"* | `SEASONS`, `:3741`–`:3758`, `seasonSet` `:3760` | A pack-declared table of **date windows** that swap art, hang things and set down props. `content/meridian/config.js:157` proves a season may have **no dates at all** and be picked by name — that is a **gift mode switch, already shipping**. It already draws a swaying piñata (`:947`), papel picado (`:1014`), sugar skulls (`:1041`), an ofrenda (`:999`) |
| **Examinable objects** — the load-bearing half of the two highest-ranked gift genres | `READS`/`DOCS` `:3018`–`:3021`, marks `:3037`, button `:3106` | A pack says where a readable thing stands and what it says; the engine never learns what it is |
| **A declarative panel UI** | `docOpen` `:2933`, renderer `:2937`–`:3005` | **The most underrated asset in the repo.** Headings, prose, kv rows, tables, buttons with callbacks, dropdowns, and forms with text/password/textarea/select/checkbox. A combination lock, a card to sign, a letter to fill in — **authorable today, no engine change** |
| **A whole cast placed from data** | `addChill` `:154`, `syncChill` `:173` | A leaving present from twelve colleagues is twelve rows of `{name, look, world, x, y, doc}`. That is already an API |
| **A polish layer that carries the recipient's face** | character creator `:3455`–`:3470`, `look` records | The feel research said a gift should spend its whole budget here, because it is the only layer that can be *them* |
| **Colour that does not break** | `THEMES` `:3652`, contrast auto-fix `:3778` | Gifts lean on a favourite colour and holiday palettes, and red-green is the worst pair. Already WCAG-audited |
| **Music with nothing to license** | `MUSDEF` `:3880`–`:3893` | Procedural, theme-aware, no assets, no network. Sidesteps the blocker that killed the rhythm-game option outright |
| **Time of day, from the real clock** | `drawDaylight` `:1737` | A gift opened at 9pm already looks different from one opened at noon |
| **PG knockback, shipped** | `isLight` `:2088`, kick `:2100` | An impulse that redirects rather than depletes. No vectors, no integration, no tunnelling |
| **A projectile that cannot miss or tunnel** | throw `:2263`, drawn arc `:2254` | The physics sweep independently derived this exact dodge as correct for a tween engine — and it is already in production |
| **A held beat** — the camera resting on the thing they should notice | `petalMomentTick` `:1170` | Stand still 2200ms and the world says something. Already built, and the owner asked for it himself |
| **A conversation with no right answer** | `INTERVIEW` `:197`–`:211` | The whole of the cozy/no-fail recommendation, already the default |

## 4 · The three gaps that actually matter

1. **There is no inventory. Anywhere.** Grep confirms it; `handedDocs` (`:368`) is a Set of doc ids
   that never empties. "Examine" exists, **"take" and "combine" do not** — which is the missing half
   of the one-room memory-box genre the research ranked first.
2. **There is no timer and no scoring loop.** The one nod is a per-device hearts toggle whose own
   comment says it is there *"for a mini-game or a challenge"* (`:4401`).
3. **The engine has exactly one player verb: walk, and talk.** Any genre needing a second verb
   (jump, aim, time-a-press) is a request to grow the engine, not to write a pack. **This is the
   hardest constraint in the survey — and it happens to point at exactly the genres that are good
   short.**

## 5 · The candidates, cheapest first

Named and costed only. Not designed.

| Gift | Core verb | Occasion | Cost |
|---|---|---|---|
| **Un momento** — stand somewhere and the world says something | stand still | an anniversary, a memorial, a recurring holiday | **Seam, cheapest here.** `petalMomentTick` already *is* this; it is welded to petals and wants unwelding |
| **Los invitados** — a guest book you walk through | walk and talk. **No new verb at all** | a leaving present, a wedding | **Seam, possibly none.** `syncChill` already takes the whole cast as data |
| **La piñata** | walk into a thing hanging above you | a birthday, a posada | Mostly seam. Already drawn, already swaying. The honest proof that the four violent primitives are harmless here: an overlap test, a countdown, an impulse |
| **La caja de recuerdos** — one room of things you can look at | look at a thing; use a thing on a thing | a birthday, a new home, a memorial | **Seam — the one to grow if only one is grown.** Half is authorable today. It needs the inventory |
| **La casa que decoras** — a room you arrange, no goal, no ending | place | a new home, a new baby | Seam + one rule. `paintAt`/`setTile` is already a tap-to-paint editor behind an admin flag. **Best replay of anything surveyed, because nothing is used up** |
| **La lluvia** — things fall where you are standing | walk (unchanged) | a holiday, a harvest, candles | **Rule, and the most expensive here.** The PG destination of hit detection: an overlap test with a basket instead of a blade |

## 6 · The PG question, answered mechanically

The owner asked to understand what we are avoiding *"so we can avoid or use those features for other
endeavors."* The finding is that **the machinery is neutral and we already run most of it**:

| The violent primitive | What it actually is | What it is here |
|---|---|---|
| hit detection | an overlap test between two rectangles | catching falling fruit; walking into a piñata |
| knockback | an impulse that redirects a body | `isLight` — the cone you kick, shipped `:2088` |
| damage | a counter that goes down | the piñata's swing count before it bursts |
| aggro | a state machine that notices you | the dog deciding to follow you |
| projectiles | a body integrated over time | `:2263` — destination chosen first, journey tweened, arc **drawn not simulated**, so it cannot miss and cannot tunnel |

## 7 · The one thing to hold on to

`[TRAINING]` — unsourced, and stated as opinion: **in a gift, retention is not the goal and
difficulty may be the wrong axis entirely.** The failure state is not losing. It is *failing in
front of the person who made it for you*. Every recommendation above should be re-checked against
that before anyone builds anything.
