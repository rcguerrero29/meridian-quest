# El Changarrito — your backlog as a street

A second world on the Meridian engine, for one player. Every open GitHub issue **you** wrote on
`rcguerrero29/meridian-quest` is a person on the street; the `tier:` label picks who they are.
Plan and rules: `docs/story/el-changarrito.md`.

## Run it (from the repo folder, on your laptop)

```
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
- **2b:** la ventanilla's window — the board of notes and the permits (open PRs) — and people
  leaving when their issue closes.
- **3:** file a request and press Done from her window. The day a token is typed in, once.

## What it is not

It trains no role and awards no grade that means anything. Meridian's purpose is unchanged;
this is tooling for one person (`docs/story/el-changarrito.md` §7½).
