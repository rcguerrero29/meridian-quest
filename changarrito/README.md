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

## What you get, by part

- **2a (this):** the street, read-only. Your open issues as people — `tier: high` a named
  person with a document, `tier: normal` townsfolk. Walk up, read. No token: the town reads the
  public API unauthenticated (60 requests an hour is plenty) and keeps the last good copy so it
  works offline. Low-tier issues are counted for the board and not yet shown.
- **2b (built):** three storefront faces — asks, decisions, bugs — and people stand in front
  of the one that matches; city hall with **la ventanilla** at her window (talk to her: the
  permits, i.e. open PRs, green or not, and the count); the **board** on the wall beside her
  (the notes); the **park** through the east gate, so Sonny has somewhere to run; **Sonny**
  himself. Each person has three lines that cycle — plain words, the paperwork, what's next —
  and the street refetches every five minutes, so a closed issue's person walks home.
- **3 (built):** the town writes. At la ventanilla's window: **Sign in** (a GitHub token for
  this repo with `issues: write` only, 30-day expiry, pasted once — it stays in this browser
  under the town's own key and nowhere else), **File a request** (title, plain words, notes,
  done-when, kind, weight — the five headings every issue reads by), **Filter by labels**,
  **Search a word**. On any person: **Done** (closes the issue; they go home), **Ask for more
  context** (a comment the next session answers in plain words), **Comment in my own words**
  (a comment you type), **+ label / − label**.
  Nothing here can touch code: the token can only read and write issues.

## What needs the token, and what does not

Nothing you *read* needs it: walking, talking, the paperwork, la ventanilla's permits, the
board, **Filter by labels** and **Search a word** all use the public API, signed out. Only the
buttons that *change* GitHub need it — Done, Ask for more context, **Comment in my own words**,
+ label / − label, File a request. Press one signed out and the town says so and does nothing.
Every person's card says which state you are in.

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
