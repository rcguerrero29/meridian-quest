#!/usr/bin/env bash
# The public site, and nothing else. ONE copy of the build, because two copies drift.
#
# These six lines used to live inline in .github/workflows/pages.yml, and when R10 was added to
# ci.yml on 2026-09-10 they were pasted a second time. Two hand-maintained copies of "what the
# public build contains" is the same shape as the fault that put El Changarrito on the internet:
# the thing that decides is somewhere nobody looks, and there is more than one of it.
#
# This file can never ship. `scripts/` is on test/public.js's NEVER list, and it is not on the
# allowlist below, so it cannot copy itself.
#
# Adding to this list is a decision, not a chore: anything named here becomes public the next time
# main is pushed. test/public.js (R10) checks the result, not this script — check the box, never the
# recipe for packing it.
set -euo pipefail
OUT="${1:-_site}"
rm -rf "$OUT"; mkdir -p "$OUT/content"
cp index.html sw.js qr.js manifest.webmanifest icon-192.png icon-512.png "$OUT/"
cp -r engine vendor "$OUT/"
cp -r content/meridian "$OUT/content/"
echo "built $OUT: $(find "$OUT" -type f | wc -l) files"
