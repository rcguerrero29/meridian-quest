---
name: deliverable
description: Fill a client deliverable from a meeting transcript or notes — discovery notes, recommendation memo, acceptance criteria, pilot review, or decision log — in the Pelaez brand or brand-neutral. Use when the user says /deliverable, asks for a memo/discovery notes/acceptance criteria/pilot review/decision log for a client, or hands over a transcript and wants a document rather than a deck. For the 8-section AI Tools Assessment deck, use the `ai-audit` skill instead.
---

# Deliverable

Turns a meeting into paperwork a client will actually read. Sister skill to
`ai-audit`: that one produces the assessment **deck**, this one produces the
**documents** around an engagement. They share the brand file and nothing else —
do not merge them, and do not edit `ai-audit`'s generator from here.

## The templates

Source of truth, whichever exists:
- **Installed globally** (`~/.claude/skills/deliverable/`): `./templates/`
- **In the meridian-quest repo**: `docs/templates/`

Check for `./templates/` first; fall back to the repo path.

| # | Template | Use it when |
|---|---|---|
| 01 | Process Discovery Notes | You have watched the work and need to write down what actually happens |
| 02 | Recommendation Memo | They want everything; you have to pick one thing. One page |
| 03 | Acceptance Criteria & Error Budget | You are about to build and "how accurate?" is in the air |
| 04 | Pilot Review | Something has run long enough to judge — including whether to stop |
| 05 | Decision Log | Always. Start it on day one and append |

Two forms of each: `neutral/` (no letterhead) and `branded/` (Pelaez — letterhead,
tagline, footer, palette front matter). **Never hand-edit `branded/`** — it is
generated. If the brand or wording needs to change, edit `neutral/` or `brand.yml`
and run `node docs/templates/build-branded.js`.

## Inputs

1. **MCP pull** — the user names a source (Granola, Zoom, Google Meet) and a meeting.
   Pull and normalize the transcript, same as `ai-audit` does.
2. **File path** — a saved transcript or notes file.
3. **Pasted text** — straight into the conversation.

If they have not said which template, ask once, offering the two that best fit what
the transcript actually contains. Ask branded-or-neutral in the same breath; default
to branded for a named client, neutral for internal or reusable work.

## The rule that matters most

**Never invent a number, a name, a date, or a quote.**

A deliverable that fabricates "saves 9 hours a week" is worse than a blank one,
because the client will act on it and you will not be able to defend it. So:

- Fill only what the source actually supports.
- Leave anything unevidenced as `___`, exactly as the template has it.
- Collect every blank into an **Open questions** list at the end, phrased as the
  question you would ask the client.
- When the source implies something but does not say it, write it as an assumption
  in the client's own words and label it: *"Assumed from the call: ___ — confirm."*
- Quote the client verbatim where the template asks for their words (the
  Recommendation Memo's "What you asked for" section especially). People accept a
  document that proves you listened.

## Workflow

1. Read `docs/templates/README.md`, then the chosen template. Follow its structure
   exactly — the section order is the argument.
2. Read the source end to end before writing anything.
3. Fill it. Keep every template to one screen; cut adjectives before you cut sections.
4. List the blanks as Open questions.
5. Save to `../deliverables/{client-slug}/{NN}-{template}-{YYYY-MM-DD}.md` unless the
   user says otherwise. Tell them the path.
6. Offer, do not assume, a formatted version: the `docx` skill for a Word document,
   `pptx` if they want it as slides. Markdown is the default deliverable.

## Style

- Plain language. Short sentences. No consultant fog — "we will map the intake
  process" beats "we will conduct a discovery workstream."
- Numbers in the client's units. Hours a week, calls a day, orders a month. Never
  report a model metric where a business metric was asked for.
- One action per document (`brand.yml` → `cta_rule`). No stacked next steps.
- Say the uncomfortable thing. The Pilot Review has a "turn it off" checkbox on
  purpose; if the evidence says stop, recommend stopping.

## Notes

- Installed everywhere by `./install-skills.sh` in the meridian-quest repo, which
  copies this skill plus the templates to `~/.claude/skills/`. The repo remains the
  source of truth: edit there, re-run the installer.
- The game's decision-report export (⚙️ Settings → Export → 📄) produces template 05
  from play. The other four are hand-filled today.
