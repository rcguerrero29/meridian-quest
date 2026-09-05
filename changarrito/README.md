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
- **3:** file a request and press Done from her window. The day a token is typed in, once.

## What it is not

It trains no role and awards no grade that means anything. Meridian's purpose is unchanged;
this is tooling for one person (`docs/story/el-changarrito.md` §7½).
