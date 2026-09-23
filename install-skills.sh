#!/usr/bin/env bash
# Install the skills built in this repo into your personal Claude skills folder,
# so they work in every project — not just meridian-quest.
#
#   ./install-skills.sh            # install to ~/.claude/skills/
#   ./install-skills.sh /some/dir  # or somewhere else
#
# Safe to re-run: it overwrites its own files and touches nothing else.
set -euo pipefail
DEST="${1:-$HOME/.claude/skills}"
SRC="$(cd "$(dirname "$0")" && pwd)"
# Portable craft first — these assume no engine, no framework and no repository, so they are
# useful in every project. Then the four that were already here.
#   shaping      silhouette, light, variation, render-and-look; the portable half of /shapes
#   how-its-made build a thing by the process that made it; fixes art that "looks generated"
#   guard        the four ways a test fools the person who wrote it
SKILLS=(shaping how-its-made guard don-guero nacho playtest deliverable)

mkdir -p "$DEST"
for s in "${SKILLS[@]}"; do
  [ -d "$SRC/.claude/skills/$s" ] || { echo "skip $s (not in this repo)"; continue; }
  rm -rf "${DEST:?}/$s"
  cp -R "$SRC/.claude/skills/$s" "$DEST/$s"
  echo "installed $s"
done

# /deliverable reads the templates by path; a global install needs its own copy
if [ -d "$SRC/docs/templates" ]; then
  rm -rf "$DEST/deliverable/templates"
  cp -R "$SRC/docs/templates" "$DEST/deliverable/templates"
  echo "installed deliverable/templates (brand.yml, neutral/, branded/, example/)"
fi

# the planner agents these skills spawn
if [ -d "$SRC/.claude/agents" ]; then
  mkdir -p "$DEST/../agents"
  for a in don-guero nacho; do
    [ -f "$SRC/.claude/agents/$a.md" ] && cp "$SRC/.claude/agents/$a.md" "$DEST/../agents/$a.md" && echo "installed agent $a"
  done
fi

echo
echo "Done → $DEST"
echo "Portable anywhere: /shaping, /how-its-made, /guard, /deliverable."
echo "Repo-bound: /don-guero and /nacho read docs/ from meridian-quest and are most"
echo "useful inside it; /playtest describes this game's own screens."
echo
echo "NOT installed on purpose: /shapes, /district, /stairs, /crew-fix, /ticket,"
echo "/room-design, /game-brief, /meeting-of-da-minds — each names this engine's seams,"
echo "files or cast, and a skill that cites a file the project does not have is worse"
echo "than no skill. /shapes' portable half is /shaping."
