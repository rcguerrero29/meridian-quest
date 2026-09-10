# What the exposure actually was, and what it was not

*Written 2026-09-10 at the owner's word: "so let me know the reprecusions of 1 and 2 to ensure i get
it all." Written to be read by somebody with no memory of the day it happened.*

**Read the last section first if you only read one.** The headline is that the blast radius is small
and the two actions are cheap — but the reasoning matters more than the conclusion, because the
reasoning is what stops it recurring.

---

## What happened, in one paragraph

`.github/workflows/pages.yml` built the public site with `rsync -a --exclude .git --exclude .github
--exclude node_modules ./ _site/` — a **denylist of three names**. Everything else in the repository
went to GitHub Pages: `docs/`, `test/`, and `changarrito/`, which is the owner's private backlog tool
and carries a GitHub sign-in, a *"make a new token"* flow, and calls to `api.github.com`. A guard
existed (`test/smoke.js`'s guarantee scan) and could not see it, because that guard built its file
set from **what `index.html` loads**, and the town loads nothing from there.

---

## 1 · The Pages Source setting — what it means and what it costs

### The thing to check

**GitHub → the repository → Settings → Pages → "Build and deployment" → Source.**

- If it says **"GitHub Actions"** → the allowlist deploy is what serves the site. Once the branch
  with it merges, `/changarrito/` stops existing on the internet.
- If it says **"Deploy from a branch"** → **GitHub Pages is serving the repository tree directly.**
  The allowlist and `test/public.js` never touch a byte any visitor receives, and `/changarrito/`,
  `/docs/` and `/test/` are live right now regardless of what we merge.

`pages.yml:5-6` says this in its own comment. It is a **convention held by a human's memory**, which
is the same species of problem as the exposure itself.

### What was actually disclosed: nothing that was secret

**The repository is public.** Every line of `changarrito/` has always been readable on github.com by
anyone. Publishing it on Pages disclosed **no new information**.

**What changed is capability, not disclosure:** source you can read became **a page you can run**.

### The four real consequences, ranked

| # | Consequence | Severity | Why |
|---|---|---|---|
| **1** | **If the owner ever signed in at the PUBLISHED copy**, his token is in `localStorage` for the origin `rcguerrero29.github.io` — which **every project Pages site on that account shares** | **the only one that matters** | `STOREPFX` is a namespace, not a boundary. `localStorage` is per-ORIGIN. Any other page published on that account, or any script injected into one, can read `chtoken` |
| 2 | The root service worker has **scope `/`**, so it controls `/changarrito/` and has been caching the town's files — including its token-handling code — into the *game's* cache | low, but real | A visitor to the game silently downloads part of the private tool. It is also why "the town is separate" was never true at the browser level |
| 3 | `docs/` was published — every register, every decision with its reasoning, the backlog, the story bible | low | Not secret, but it is the owner's thinking, published without him choosing to |
| 4 | A stranger could find the sign-in form and type a token into it | **negligible** | The form posts to `api.github.com` from *their* browser with *their* token, and `owner`/`repo` are hardcoded to `rcguerrero29/meridian-quest` (`changarrito/content/record.js:11`). Nothing is sent to us. It is their token, in their browser, doing nothing useful |

### The fact that shrinks #1 almost to nothing

`changarrito/README.md:23` says the town's storage is **"tied to the address `127.0.0.1:8765`"**, and
`:34-37` say to run it as `python3 -m http.server 8765 --bind 127.0.0.1` and open
`http://127.0.0.1:8765/changarrito/`.

**`http://127.0.0.1:8765` and `https://rcguerrero29.github.io` are different origins.** If the town
was only ever used the documented way, **the token was never in the published copy's storage at
all** — that copy's `localStorage` would have been empty, and the sign-in form would have been a
form nobody had signed into.

**So consequence #1 is conditional on one question: was there ever a sign-in on the github.io URL
rather than on localhost?**

---

## 2 · The token — what it can do, which is less than people assume

### Its actual power

`changarrito/README.md:146-148` specifies how it is made: **Fine-grained token · repository access:
only `meridian-quest` · permissions: Issues → Read and Write.** The README's own line: *"Nothing here
can touch code: the token can only read and write issues."* It expires on its own — 30 days
(`record.js:342-346`), and the town reads the real expiry out of GitHub's response header.

### So the worst case, spelled out

Somebody holding it could **open, edit, comment on and close issues on `meridian-quest`**. That is
all. They could not:

- read or write any code, branch, or release
- touch any other repository
- touch the GitHub account, its settings, its billing, or its other services
- reach anything outside GitHub

And every action would be **visible and attributed** in the issue timeline, and **reversible**.

### Why rotate anyway

Not because the sky is falling — because **the rotation costs about ten seconds and it makes the
question moot.** Instead of reasoning about whether a sign-in ever happened on the wrong origin, the
answer becomes: it does not matter.

`changarrito/README.md:149`: *"To revoke: delete the token on GitHub; the town notices on its next
write."*

---

## What to actually do, in order

1. **Settings → Pages → Source.** Ten seconds. It decides whether anything else here is urgent.
2. **GitHub → Settings → Developer settings → Fine-grained tokens → the `changarrito` token → look
   at "Last used".** This is the highest-value check on the page: if it was only ever used from the
   owner's own machine on the days he was playing, nothing has happened. It answers the question
   directly rather than by inference.
3. **Delete that token and make a new one** with the same settings (repository access: only
   `meridian-quest`; permissions: Issues → Read and Write). Ten seconds, and it ends the topic.
4. **Merge the branch carrying the allowlist and R10** — but note step 1 decides whether that merge
   changes what is served at all.

## What is NOT affected, so it is not worried about

The code (the token cannot touch it, and it was public anyway) · any other repository · the GitHub
account itself · anything outside GitHub · the players of Meridian Quest, who were served the same
game throughout · any save data, which lives in each player's own browser.

## The lesson, which is the part worth keeping

**"Private" was never enforced anywhere.** It was a sentence in `CLAUDE.md` ("run from the owner's
laptop only"), a comment in a workflow, and a guard that read the wrong noun. Three statements of
intent and no mechanism. The town was not published because somebody made a mistake in security —
it was published because **nothing in the system had ever been asked what was in the box.**

That is now `docs/REGRESSION.md` R10, and the rule it was bought with: **a guard has to read the noun
it actually means.**
