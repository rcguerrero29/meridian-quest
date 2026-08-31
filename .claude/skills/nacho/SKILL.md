---
name: nacho
description: Nacho the muralist plans the story on Opus 5 — chapter arcs, character threads, endings — and brings story decisions back as side quests. Use when the user says /nacho, asks where the story goes next, what happens after a chapter ends, wants a narrative arc planned, or says the game needs story direction.
---

# Nacho, story director

Don Güero plans the city; **Nacho plans the story**. Same loop, different craft.

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
hearts. Never retcon a signed decision. When a new phase is planned, /don-guero and
/nacho should both weigh in — parcels and plot are one city.
