# Why Meridian Quest lives in a repo (and what that means for Gifted Games)

**Status:** decision record · 2026-08-30
**Question it answers:** why couldn't we build/ship this the way we did FitCheck, and is
the repo-based approach the right foundation if we pursue the "gifted games" idea
(custom, personalized games built as gifts / a possible product line)?

> Note: this record was reconstructed in a fresh session from the current state of the
> project (the published artifact, the Idea Vault). If the original reasoning differed on
> any point, correct this file — that's exactly what it's for.

---

## 1. Where the game came from

Meridian Quest started as a Claude artifact: one self-contained HTML file, iterated
conversationally, playable instantly at a claude.ai link. That workflow is superb for
what FitCheck-style projects need — a tool for **our own use**, where the person building
it and the person using it are the same, the file stays small, and "share a link from my
Claude account" is all the distribution required.

By v7 the game had outgrown that shape. The current file is ~170 KB / ~1,800 dense lines
containing three layers that change at very different rates:

| Layer | What's in it | How often it changes |
|---|---|---|
| **Engine** | canvas renderer, movement, portals, saves, animals, admin tools | rarely, carefully |
| **Content** | 15 quests + 1 secret quest, 16 NPCs, 6 world maps, city-growth events | constantly — this is where the game grows |
| **Localization** | full EN + ES copies of every quest, UI string, and flavor line | in lockstep with content, ×2 |

## 2. Why the artifact workflow stopped fitting

1. **Every edit rewrites the whole file.** In chat, changing one quest line means
   regenerating a 1,800-line blob. That's slow, and each rewrite is a chance for an
   unrelated regression in the other 1,790 lines. In a repo, the same change is a
   five-line diff you can read.

2. **No real history.** Artifact versions exist, but there's no diff, no blame, no
   branching, no "what changed between v6 and v7". Game content is exactly the kind of
   thing that needs `git log` — especially bilingual content, where EN and ES must move
   together and a diff makes a missed translation obvious.

3. **The game already wants CI.** The engine ships with boot-time validators — world
   integrity checks (map row widths, portal targets) and a full BFS reachability audit
   (every walkable tile reachable, every NPC talkable). In an artifact those warnings go
   to a console nobody opens. In a repo they become a headless test that blocks a bad
   map from ever shipping. (The smoke test that verified this port does exactly that.)

4. **Distribution is the real blocker for gifts.** An artifact lives on claude.ai,
   private by default, tied to the owner's account. That's right for a personal tool;
   it's wrong for a game whose whole point is to be handed to someone else. A recipient
   of a gifted game needs a plain URL that works forever, on their phone, with no
   account and no explanation. A public repo + GitHub Pages gives that for $0, with a
   custom domain possible later if this becomes a product.

None of this is a criticism of the artifact workflow — it's why the game exists at all,
and it remains the fastest place to prototype the *next* game concept. The rule of thumb:

> **Build it like FitCheck when you are the audience. Move it to a repo the moment the
> audience is someone else, or the content outgrows one-blob editing.**

## 3. Is this the best way for Gifted Games? Yes — with one structural bet

If gifted games become a thing (one-off gifts or a sellable product), the economics only
work if each new game is **a content pack, not a rewrite**. The code already declares the
right architecture in its own header comment — *"engine / content / saves are separate
layers"* — the repo just makes it physically true. Target shape:

```
meridian-quest/
  index.html          ← today: the whole game, ported as-is (step 1, done)
  engine/             ← next: renderer, movement, saves, validators (shared, stable)
  content/
    meridian/         ← this game: quests.en.js, quests.es.js, maps.js, npcs.js, theme
    <next-gift>/      ← a new game = a new folder here, engine untouched
  docs/APPROACH.md    ← this file
```

Why this pays off per gift:
- **Personalization is data, not code.** Names, NPCs, in-jokes, palette, language(s) —
  all live in the content pack. The in-game "text lab" already proves the engine can
  re-skin text at runtime; content packs are the same idea, versioned.
- **Quality is inherited.** Every gift gets the validators, the bilingual scaffolding,
  the mobile controls, the save system — for free, tested once.
- **$0 to run, forever.** Static files, localStorage saves, no backend, free hosting.
  A gifted game must never come with a hosting bill attached.
- **The pipeline is the product.** Prototype a concept as an artifact → promote it to a
  content pack in the repo → ship a Pages URL. That's a repeatable production line, which
  is the difference between "I made you a game once" and a gifted-games offering.

## 4. Decision

- Meridian Quest's home is this repo; the artifact remains a preview/prototyping surface.
- Ship step 1 as a faithful single-file port (`index.html`) — playable and hostable today.
- Before building game #2, do the engine/content split above; do **not** fork
  `index.html` per gift.
- Add the existing validators as a CI check when the split lands.
