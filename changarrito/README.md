# El Changarrito — your backlog as a street

A second world on the Meridian engine, for one player. Every open GitHub issue **you** wrote on
`rcguerrero29/meridian-quest` is a person on the street; the `tier:` label picks who they are.
Plan and rules: `docs/story/el-changarrito.md`.

## Where it lives — one folder, always the same

`~/code/meridian-quest` — a `code` folder in your home directory, the repo inside it
(Mac/Linux: `/Users/<you>/code/meridian-quest`; Windows: `C:\Users\<you>\code\meridian-quest`,
using Git Bash). `pwd` prints where you are; it should end in `/code/meridian-quest`.

**First time only:**

```
mkdir -p ~/code
cd ~/code
git clone https://github.com/rcguerrero29/meridian-quest.git
cd meridian-quest
```

**If you mess it up:** nothing precious is in the folder — it is a copy of GitHub. Your save
and the issue cache live in the browser, tied to the address `127.0.0.1:8765`, not to the
folder. So the reset is safe and total: `cd ~/code && rm -rf meridian-quest && git clone
https://github.com/rcguerrero29/meridian-quest.git`. Two rules: always port 8765 (a different
port is a different address to the browser, and your save will not follow), and never edit
files in that folder by hand — every change goes through a session and a PR.

## Run it (from that folder, every time)

```
cd ~/code/meridian-quest
git pull
python3 -m http.server 8765 --bind 127.0.0.1
```

then open **http://127.0.0.1:8765/changarrito/**

`--bind 127.0.0.1` keeps the server on your machine; a bare `http.server` listens to the whole
network. Never put a tunnel in front of it. Nothing links here from the public game.

## If you forget the three lines

**El pregonero**, the town crier in the red shirt with the 📣, walks the street with them. Talk
to him: the sheet has the three lines in order, the update line, what to do if it looks wrong,
and the version the title screen should say. **Copy** at the bottom of his sheet takes it all.

## What you get, by part

- **2a (built):** the street, read-only. Your open issues as people — `tier: high` a named
  person with a document, `tier: normal` townsfolk. Walk up, read. The town reads with your key
  when you are signed in (since ch-v6; without one it reads the public API, 60 an hour) and keeps
  the last good copy so it works offline. Low-tier issues are the board's notes.
- **2b (built):** three storefront faces — asks, decisions, bugs — and people stand in front
  of the one that matches; city hall with **la ventanilla** at her window (talk to her: the
  permits, i.e. open PRs, green or not, and the count); the **board** on the wall beside her
  (the notes); the **park** through the east gate, so Sonny has somewhere to run; **Sonny**
  himself. Each person has three lines that cycle — plain words, the paperwork, what's next —
  and a closed issue's person walks home on the next read (the town reads when it opens, after
  every write, and on ↻ — there is no clock).
- **3 (built):** the town writes. At la ventanilla's window: **Sign in** (a GitHub token for
  this repo with `issues: write` only, 30-day expiry, pasted once — it stays in this browser
  under the town's own key and nowhere else), **File a request** (title, plain words, notes,
  done-when, kind, weight — the five headings every issue reads by), **Filter by labels**,
  **Search a word**. On any person: **Done** (closes the issue; they go home), **Ask for more
  context** (a comment the next session answers in plain words), **Comment in my own words**
  (a comment you type), **+ label / − label**.
  Nothing here can touch code: the token can only read and write issues.

## What la ventanilla tells you first (ch-v13)

Since your last visit: who answered, who is new, who went home, and which decisions are waiting
on you — each with a button that walks you to the person. She says the counts once at the door.
The town no longer re-reads GitHub on a clock: it reads when it opens, after every write, and
when you press **↻ Refresh** on her card (two switches in `content/config.js` bring the clock and
the permits back). If `main` is ahead of what you are running she says so and which line of el
pregonero's sheet to run.

## Don Güero, the signs, the boards (ch-v17)

Don Güero at the stall talks every visit: who he is, the requests that carry his name, and the
last feedback that came back on one of them. **Ask me to build something** files a request
tagged `guero`, which a session's planner picks up. On the street the signs over the three
faces count the open issues of that kind and city hall's counts them all; the boards say which
face is which.

## The index (ch-v15)

**📇 The index** on la ventanilla's card is the search. Pick from her menu — waiting on you,
answered, unanswered; answered / new / went home since your last visit; on the street or on the
board; any label; places, residents and animals — or type a word, and every hit says itself in one
line with **→ walk there** and **📝 file about this**, which opens the request form already tagged
with what it is about (file about Sonny and the request carries `sonny`). The paper is purple in
the town (`READERLOOK="night"` in `content/config.js`); leave the line out for the cream one.

## Nothing pops up any more (ch-v14)

Filing a request, signing in, narrowing the street, commenting, changing labels, and deciding
are all one screen inside the reader — every field visible, the paperwork above it, Cancel costs
nothing. On a person marked *decision*, **⚖️ Decide** lists the options read off their paperwork
and the last answer; your pick posts as a comment in your name and the next session acts on it.

## What needs the token, and what does not

Nothing you *read* needs it: walking, talking, the paperwork, la ventanilla's permits, the
board, **Filter by labels** and **Search a word** all use the public API, signed out. Signed
in, the town reads with your key too (ch-v6): the public API allows 60 reads an hour and a
refresh spends about a dozen, so an afternoon of reloads can run it dry — with the key it is
5,000. When GitHub refuses a read, la ventanilla says so and the minute it reopens, and the
street shows the last good copy. If the street looks empty, talk to her first: her *The street*
line names any filter or search that is hiding people, and **Clear filter and search** is one
press. Only the
buttons that *change* GitHub need it — Done, Ask for more context, **Comment in my own words**,
+ label / − label, File a request. Press one signed out and the town says so and does nothing.
Every person's card says which state you are in.

## Block one — six houses, one per kind of work (ch-v23)

The street is a boulevard now. Every building has a door that opens and a board beside it that
says in plain words what kind of work lives there: **Records & forms** (El Anexo), **Rooms &
stairs** (La Obra), **The engine** (El Motor) along the north rank; **Docs & templates** (La
Papelería), **How it looks** (El Estudio de Pili), **Meridian's story** (La Cocina de Meridian)
in the middle block. Inside, a clerk with three lines: what the house is for, how many of your
things have that address, what is on the desk. The sign over each door counts its house.

An issue's address is its `work:` label, one of the six, in plain words. The request form has
a *What kind of work* dropdown; the Labels button on any person changes it. The people
themselves still stand on the street by kind for now; standing inside comes with the next part.
The town's ledger is `docs/changarrito/CITY.md`.

## The stall has an upstairs (ch-v12)

Walk south from where you wake up: through the door at the bottom of the hall is a stair hall,
the flight climbs east along the wall, and the dark square at its head takes you up to the loft.
The loft is bare on purpose; the way down is the light square with the chevron, at the bottom
of a hole in the floor: the steps sink toward it, you sink with them, and a knee-high rail
closes the well on three sides, so the only way in is off the top of the flight (#62, ch-v18).
Coming in from the street you land at the foot of the stairs. This is Don Güero's staircase (#4), built here
first so you can walk it before Meridian's office takes the same four rows.

## The token, once

GitHub → Settings → Developer settings → Fine-grained tokens → *Generate new token*: name it
"changarrito", **repository access: only `meridian-quest`**, **permissions: Issues → Read and
write**, nothing else, expiry 30 days. Copy it, walk to la ventanilla, press **Sign in**,
paste. To revoke: delete the token on GitHub; the town notices on its next write.

**When it runs out (ch-v5).** La ventanilla keeps the date. Her card says *"the key runs out in
N days"* — GitHub tells her the exact day on every answer the key signs, and she believes that
over her own count from the day you signed in. Under five days she says it out loud when the
town opens, and when the key is dead she says so instead of a bare 401. Beside Sign in there is
**Make a new token (opens GitHub)**: the token page in a new tab — same settings as above — copy,
walk back, Sign in, paste. Nothing you *read* ever stops; only the write buttons wait for the new
key. The one thing that stays yours is the copy-and-paste: GitHub will not let a page mint a key,
and that is the gate we want kept.

**The risks, plainly.** The token is a key to *issues on this one repo* and nothing else: whoever
holds it can open, comment on, label and close issues as you — not read private code, not push,
not touch other repos, not change settings. It lives in this browser's storage under the town's
own key; it is never written to a save, a sheet, the repo, or a request. It expires in 30 days
on its own. The two ways to lose it are someone at your unlocked laptop and a browser extension
that reads page storage; the cure for either is deleting the token on GitHub, which takes ten
seconds and costs nothing. Never paste it anywhere but la ventanilla's prompt, and never make one
with more permissions than *Issues: read and write*.

## What it is not

It trains no role and awards no grade that means anything. Meridian's purpose is unchanged;
this is tooling for one person (`docs/story/el-changarrito.md` §7½).
