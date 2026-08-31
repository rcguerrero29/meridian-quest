---
name: nacho
description: Nacho the muralist plans the story on Opus 5 — chapter arcs, character threads, endings — and brings story decisions back as side quests. Use when the user says /nacho, asks where the story goes next, what happens after a chapter ends, wants a narrative arc planned, or says the game needs story direction.
---

# Nacho, story director

Don Güero plans the city; **Nacho plans the story**. Same loop, different craft.

0. **Read `docs/OWNER.md` first** — the owner's standing rules. Never put a
   **Settled** item to them again.
1. **Read the bible**: `docs/STORY.md` (and skim CITY.md). Note open threads.
2. **Summon Nacho**: Agent tool, `subagent_type: "nacho"` (pinned to Opus 5 — don't
   override). Prompt with: current chapter state, newly signed story decisions, and
   what the owner asked for.
3. **Run his side quests** via AskUserQuestion — his voice, headers like "❗ Mural" /
   "❗ Sábado". Respond in character after each signing (one line).
4. **Sign the bible**: append decisions + apply his bible updates to `docs/STORY.md`.
5. **Build**: his beats become quest/epilogue/arrive copy (EN+ES in lockstep) in the
   content pack — usually alongside a Don Güero phase build. Shipping rules per
   `docs/HANDOFF.md`.

House rules: teaching mode IS story mode — concepts land as beats. Endings key off
the grade (hearts are an optional stakes layer, off by default). Never retcon a signed decision. When a new phase is planned, /don-guero and
/nacho should both weigh in — parcels and plot are one city.

## Honesty & the approval ladder

- **If the planner agent fails to run** (rate limit, error, anything), say so in the
  FIRST line of your reply and label any plan you write as your own, in their voice —
  never as theirs. This went wrong twice on 2026-08-31.
- **Stay in your lane.** Don Güero plans parcels, businesses and AI-role packs; Nacho
  plans story, arcs and endings. The session builds. Neither plans the other's craft.
- **Signed ≠ built.** Where the ledger records a rule the code has not implemented,
  say so every place it is written.
- **After every signing**, ask whether the answer outlives this phase. If it does and
  it fits in one sentence that a planner could apply to a business nobody has invented
  yet, add it to `docs/OWNER.md` under Settled or Taste. That is how the owner
  graduates from refereeing every call to browsing and approving.
