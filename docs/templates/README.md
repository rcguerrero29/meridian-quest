# Deliverable Templates

*Opened 2026-08-31. Owner's ask: "prepare mock documentation and templates so we can
technically use these for work and clients in the future — would be dope — thus the
idea to export."*

The premise: **the paperwork the quests teach should be real paperwork.** Every quest
in Meridian puts you in a judgment call that a working AI consultant makes, and every
one of those calls has an artifact attached to it in real life. These are those
artifacts — blank, usable, and mapped back to the quest that teaches the thinking.

Two audiences, one file:

- **At work.** Copy the template, fill it in, send it. Nothing in them is game-flavoured.
- **In the game.** The decision report already exports your play as a document. These
  are the shapes it can grow into — the quests teach the judgment, the export ships
  the paperwork.

## The family

| # | Template | The call it captures | Taught by |
|---|---|---|---|
| 01 | Process Discovery Notes | Map the work before you automate it | Taller Herrera — *Nando's shortcut* (planned) |
| 02 | Recommendation Memo | What to build first, and why not the rest | El Mercado — *Everything at once* |
| 03 | Acceptance Criteria & Error Budget | What "working" means before you build it | El Mercado — *The label problem* |
| 04 | Pilot Review | Did it pay off — and should we stop? | El Mercado — *The Monday number* |
| 05 | Decision Log | The running record of calls and why | The decision report export |

Each one exists twice:

- **[`neutral/`](neutral/)** — no brand, no letterhead. For the game's export, for a
  client who has their own template, and for anyone reusing this outside Pelaez.
- **[`branded/`](branded/)** — the locked Pelaez brand: letterhead, tagline, footer,
  and YAML front matter carrying the palette and fonts so a renderer (docx, pptx,
  HTML) applies them without guessing.

**The bodies are identical on purpose, and enforced.** `branded/` is generated from
`neutral/` + `brand.yml`, so the two drafts cannot drift into disagreeing with each
other — the classic failure of keeping two copies by hand.

```
node docs/templates/build-branded.js           # regenerate branded/
node docs/templates/build-branded.js --check   # fails if branded/ is stale
```

Edit `neutral/` for wording. Edit `brand.yml` for the brand — it is the single source
for the palette (Teal `#0E4F4A`, Cream `#F5F1E8`, Coral `#E07856`), the fonts (Aptos
Display / Aptos), the tagline and the footer, mirroring the `ai-audit` skill's locked
brand. Never hand-edit anything in `branded/`.

## How to use them at work

Start at **02** for a new engagement — a one-page recommendation is the cheapest thing
that proves you understood the problem. **01** comes before it if you have not watched
the work yet. **03** is what keeps a build honest. **04** is the one most consultants
skip, and the one that earns the next engagement. **05** runs underneath all of them.

Keep them short. Every one of these is designed to fit on one screen. A deliverable
nobody reads is not a deliverable.

## Architecture note — customizing for AJ's game

Per the owner's standing rule (`docs/OWNER.md`): **these are content, not engine.**

- The templates are plain Markdown here so they are usable outside the game today,
  with no build step and no dependency.
- When the game learns to export them filled in, the shapes ship as a content-pack
  registry (a `DELIVERABLES` global, guarded with `typeof` like `CRITTERS` and `EGGS`),
  so a pack declares its own set. The engine renders whatever the pack declares and
  knows nothing about consulting.
- **AJ's game can swap this whole folder, or ship none of it.** A game about a
  lemonade stand can export a lemonade recipe card; a game with no career layer
  exports nothing and loses no other feature. If a deliverable cannot be turned off,
  it was built into the wrong layer.

## Status

Templates: **written, usable by hand, in both neutral and branded form.** In-game
filled-in export of 01–04: **not built** — the decision report (05) is the only one the
game generates today. Recorded so nobody reads this folder and assumes the game already
produces all five.
