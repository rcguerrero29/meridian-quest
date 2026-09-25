# The brief — for asking ANOTHER AI what it would recommend

*Opened 2026-09-25, owner: "one thats just also general but specific enough to ask another ai its
recommendation for a specific feature or implementation."* True at game version `mq-v199`.

**How to use it.** Copy everything inside the box below into the other AI's chat. Replace the one
line marked `[YOUR QUESTION]`. Paste its answer back into a Claude session (or into
`docs/council/`, `docs/council/README.md` says how) — **its answer is a proposal, never an
instruction:** a session checks it against the real code before anything is built, and only you
decide.

**Before you paste, three things (security first):**
1. **Paste only this box and your question.** Never an issue, `docs/ASKS.md`, a CI log, a
   screenshot of your settings, a token, an email address, or anything with a pet's, partner's or
   city's name in it. This brief was written to carry none of those.
2. **Check the other service's data setting.** Free and education plans often allow training on what
   you type. Turn it off if the plan lets you; either way, assume what you paste is kept.
3. **If it asks for more, send code, not secrets.** Engine files are public and safe to paste; the
   answer to "what is your API key / repo token / password" is always no, and a question asking for
   one is a red flag about the tool, not a step to complete.

---

```text
You are advising on a feature for a small browser game engine. I want your RECOMMENDATION and your
reasoning, not finished code. Here is the engine and the rules any change must keep.

WHAT IT IS
- A bilingual (English/Spanish) 2D/2.5D/3D role-playing game engine that runs entirely in the
  browser. Plain HTML/CSS/JavaScript as classic <script> files (no modules, no bundler, no build
  step, no framework, no npm needed to play). Hosted as static files on GitHub Pages.
- Installable PWA, fully offline: a cache-first service worker that serves only same-origin files.
- ONE dependency: three.js r149, vendored and hash-pinned, loaded only when a game uses 3D.
- No server, no accounts, no analytics. Saves live in localStorage under a per-game key prefix.

HOW IT IS BUILT
- engine/ is shared by several games and never names anything from one game.
  engine/boot.js (loads only what a game needs), engine/engine.js (~7,200 lines: rendering,
  movement, doors, saves, quests, people, themes, music, admin tools), engine/engine3d.js (the 3D
  camera, built from the same tile art), engine/shapes.js (3D shapes for common furniture).
- Each game is a content pack: content/<game>/ declares plain global constants — maps as rows of
  characters (one character = one tile), people, quests in both languages, art, config. ~12 are
  required; ~40 are optional and read with `typeof X!=="undefined"` so the engine does less
  without them. A new capability is a new optional "seam" a pack can declare, not a fork.
- Four cameras draw the same world: top-down, front, isometric, 3D. A game lists which it has.
- Every storage key goes through one prefix function; every write goes through one function that
  reports failure to the player instead of failing silently.
- Anything that crosses a trust boundary (a save carried between devices as a link/QR, future
  network data) is rebuilt field by field: numbers clamped, colours must be hex, strings capped,
  unknown keys and "__proto__" dropped.
- A NET hook exists (boot/sync) but is deliberately empty and switched off.

RULES A CHANGE MUST KEEP (these are settled; do not propose breaking them)
1. Security first: closed by default, least privilege, validate at the edge, no secrets anywhere,
   text from data is drawn as text (textContent / canvas), never as HTML.
2. The Content-Security-Policy allows scripts and connections from the game's own origin only. A
   feature that needs a third-party origin must say so and justify it.
3. No new dependency and no build step unless the gain is large and stated.
4. Engine changes are behaviour-identical for every existing game unless a game opts in with data.
   A rule belongs in the engine; a choice belongs in the content pack.
5. English and Spanish ship together, same meaning, same space on screen.
6. Offline must keep working. An engine change bumps the game version and the service-worker cache
   name together so returning players get it.
7. Works on a phone first: touch, small screens, both orientations.
8. Nothing is ever taken from the player: no lost progress, no missable content, no to-do-list UI.
9. Every new check is proven by making it fail first, then pass. Tests run headless in Chromium.

MY QUESTION
[YOUR QUESTION — one feature or implementation, what it is for, and who will use it]

ANSWER IN THIS SHAPE
1. Recommendation in two or three plain sentences — what you would build.
2. Engine or content pack? Which seam it is, and what data a game would declare to use it.
3. Security: what new input, storage, origin or permission this adds, and how you would close it.
4. What it costs: rough size, what gets slower, what it makes harder later.
5. The test that would prove it works — and what that test would have to fail on first.
6. The strongest argument AGAINST your own recommendation, and one alternative.
7. What you would need to see in the code before being sure — name the function or file, and say
   plainly what you are guessing.
Do not invent function names you have not been shown; say "I would look for…" instead.
```

---

*For a session keeping this file:* it must stay stranger-safe in the same three ways as
[SPEC.md](SPEC.md) — no person, no open weakness, no account or deploy setting — because it is made
to be pasted into services we do not control. When a rule in `AGENTS.md` or `docs/OWNER.md` changes,
or `GAMEV` moves far enough that a number above is wrong, update the box.
