#!/usr/bin/env node
/* EL HORNO — one room, one tray, one verb, run against the shared suite AND actually played.

   Owner, 2026-09-22: "why no for the game? because we havent built it? we will soon."

   Same construction as test/gauge.js and for the same reason: the shell is GENERATED from the
   public index rather than copied, because ~770 of its ~800 lines must be identical (the shared
   suite reads about twenty element ids straight out of it) and a copy would rot silently the
   first time index.html changed. Every edit below asserts it actually matched — a String.replace
   that stops matching returns the input unchanged and would otherwise print success while
   testing the wrong thing.

   UNPUBLISHED, ON PURPOSE. content/horno/ is NOT in scripts/build-site.sh's allowlist and is not
   linked from anything. Publishing it is the owner's call, not a session's.

   Run:  node test/horno.js          (CHROMIUM_PATH=/opt/pw-browsers/chromium) */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const root = path.resolve(__dirname, '..');
const SCRIPTS = ['strings', 'quests.en', 'quests.es', 'npcs', 'maps', 'art', 'docs', 'config'];
const TRAY = { x: 4, y: 3 };
const STAND = { x: 4, y: 4 };               /* the tile you stand on to read it — one step up from the spawn */
const CAMS = ['top', 'front', 'iso', '3d']; /* ALL FOUR, and the fourth is read back as pixels like the rest */

/* ───────────────── 1 · THE SHELL ───────────────── */
let h = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const edit = (what, re, to) => {
  const before = h;
  h = h.replace(re, to);
  if (h === before) throw new Error('the horno shell can no longer be built from index.html: the "' + what + '" edit matched nothing. index.html changed shape — fix this generator, do not commit a hand-made copy.');
};
edit('script tags',
  /<script src="content\/meridian\/strings\.js"><\/script>[\s\S]*?<script src="content\/meridian\/docs\.js"><\/script>/,
  SCRIPTS.map(s => '<script src="' + s + '.js"></script>').join('\n'));
edit('engine paths', /<script src="(engine\/|vendor\/|qr\.js)/g, '<script src="../../$1');
edit('title', /<title>[^<]*<\/title>/, '<title>El Horno — one tray</title>');
edit('manifest', /<link rel="manifest"[^>]*>/, '<!-- no manifest: el horno is not the app -->');
edit('service worker', /navigator\.serviceWorker\.register\([^)]*\)/, 'Promise.reject(new Error("el horno never installs a service worker"))');

/* THE CREATOR SCREEN — AND THE ICONS, WHICH ARE THE HALF THAT IS ACTUALLY VISIBLE.
   Every shell hardcodes data-c="architect|diplomat|operator", the engine hardcodes SHIRTS, and
   applyLang bare-dereferences t.classes[b.dataset.c] (docs/TAGS.md L17; docs/OPEN.md §2). The pack
   can rename the three careers through UI.classes, and content/horno/strings.js does — Panadera,
   Hornero, Charolera. But the GLYPH beside each name is not a string, it is markup, and the first
   draft of this generator left it alone: the bakery's first screen read
   `🏗️ Panadera the one at the bench / 🤝 Hornero the one at the oven / ⚡ Charolera the one who
   carries the trays` — a construction crane and a handshake over a list of bakery jobs. That is
   the lane brief's own "joke landing the wrong way", in the FIRST screen anybody clicking a link
   would see, so it is fixed here and asserted below rather than written down as a known wart.
   THE REAL FIX is still an engine one and it is still not billable to this pack: the three ids,
   their shirt colours and their icons all belong in a seam a pack answers, not in the shell. */
const CLASSES = [
  ['architect', '🥖', 'Panadera, the one at the bench'],
  ['diplomat', '🔥', 'Hornero, the one at the oven'],
  ['operator', '🥐', 'Charolera, the one who carries the trays']
];
CLASSES.forEach(([c, glyph, who]) => edit('the ' + c + ' icon (' + who + ')',
  new RegExp('(<button data-c="' + c + '"><span class="ce">)[^<]*(</span>)'), '$1' + glyph + '$2'));

/* THE PAW BUTTON. engine.js (grep `the paw menu`) shows #cmd unconditionally — "the paw menu: always on
   screen (owner ask)" — and its handler (engine.js, grep `nearestDog`) opens with `const c=nearestDog(); if(!c)
   return;`. There is no dog in a one-room panaderia, so the shipped HUD was rot3d, gear, fsbtn,
   mapbtn and a 🐾 that does nothing when you press it. A control that never answers teaches the
   player that controls here may not answer, which is a worse thing to ship than a missing feature.
   It is HIDDEN rather than deleted: the engine writes $("cmd").hidden=false and $("cmd").textContent
   on every checkTalk, so removing the element would throw inside checkTalk and take the rest of the
   HUD with it. An inline display:none outranks the hidden attribute being cleared, and the element
   stays there for the engine to write to. The owner's "always on screen" ask is Meridian's, where
   there are dogs; this is a second world and it has none. */
edit('the paw button', /<button class="talk treat" id="cmd" hidden><\/button>/,
  '<button class="talk treat" id="cmd" hidden style="display:none"></button>');

if (h.includes('content/meridian/')) throw new Error('the generated horno shell still loads Meridian content');
['🏗️', '🤝', '⚡'].forEach(g => { if (h.includes(g)) throw new Error('the generated horno shell still offers the public game\'s careers on its first screen: it carries a ' + g + '. A bakery whose opening screen shows a hard hat is the joke landing the wrong way, and it is the first thing anybody opening the link sees.'); });
SCRIPTS.forEach(s => { if (!h.includes('"' + s + '.js"')) throw new Error('the generated horno shell never loads ' + s + '.js'); });
fs.writeFileSync(path.join(root, 'content', 'horno', 'index.html'), h);
console.log('horno shell built from index.html (' + h.split('\n').length + ' lines, ' + SCRIPTS.length + ' pack scripts)');

/* ───────────────── 2 · THE VERB, PLAYED ─────────────────

   THE CHECK THIS PACK EXISTS FOR, and it reads PIXELS because that is the noun.

   The thing being claimed is not "propSet works". It is the owner's sentence: you press one
   button and the SAME OBJECT changes in all four cameras. A guard that called hBake() would be
   testing the function and not the feature (docs/POSTMORTEM.md §4), and a guard that asserted
   "the glyph is now v" would be reading the fix rather than the shape a player sees (§13k). So
   this walks to the tray, presses the Read button a person presses, presses the button on the
   sheet a person presses, and then counts the pixels that moved in each camera.

   THE CONTROL RUNS FIRST AND MUST BE ZERO (§13r). Shoot the same frame twice with nothing
   pressed; if that is not zero the probe measures the animation and every number after it is
   worthless. The clocks are pinned for exactly that reason (REGRESSION row C).

   AND IT WENT RED ON THE CODE IT WAS WRITTEN AGAINST. The first run of this check reported
   `the isometric camera drew the same frame after the bake as before it: 0 pixels moved` —
   because drawIso paints every SOLID glyph as a coloured slab and never asks the tile's painter
   (engine.js, grep `isoBlock(cx,cy,ISOCOL`), and the `iso` slot the view registry advertises at
   engine.js (grep `TILEART["J"] = { top`) advertises an `iso` slot that is WRITE-ONLY: nothing in engine/ ever calls tileView(g,"iso"). MAPCOL is the
   only seam a pack has there. This is the guard that found it and it is the guard that holds it.

   ALL FOUR CAMERAS ARE READ AS PIXELS, INCLUDING THE 3D ONE, and the first draft of this file did
   not do that. It asked the baked scene what glyph the mesh at the tray's tile was LABELLED with
   (`m.userData.g`) — which is a proxy for the noun and not the noun (docs/REGRESSION.md's proxy
   register). A reader planted `mesh:hTrayMesh("p")` on all three tray states, so the 3D tray never
   changed shape at all, and this file printed `the mesh standing at the tray is now a "v"` and
   exited 0. It was the ONLY camera never pixel-diffed, and it is the camera content/horno/config.js
   names as the one the pack is FOR (CAMDEF="3d"). The WebGL buffer is not kept after compositing,
   so it is rendered on demand and copied into a 2D canvas in the same task — `T3.renderer.render`,
   then drawImage, then getImageData. The label check is kept as well, because it says one thing
   pixels cannot: WHICH glyph the scene is holding. It is no longer the only thing asked.

   WHAT THE COUNT DISCARDS, in the same breath: a whole-canvas pixel count cannot say the TRAY
   changed, only that the frame did, and it cannot tell a new SHAPE from a recolour — which is
   exactly how the iso camera passes. That is why the control is zero, why the changed box is
   printed beside the count so a person reading a failure can see where the pixels were, and why
   the pass sentence at the foot of this file says "shape" for three cameras and "colour" for the
   fourth instead of claiming all four alike. */
const CAND = [process.env.CHROMIUM_PATH, '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell', '/opt/pw-browsers/chromium', '/usr/bin/chromium'].filter(Boolean);
const bad = [];

async function played() {
  let chromium; try { chromium = require('playwright-core').chromium; }
  catch (e) { bad.push('el horno could not be played at all: playwright-core is not installed, so nothing here measured anything. Nothing to measure is not a pass.'); return; }
  let exe; try { const p = chromium.executablePath(); if (p && fs.existsSync(p)) exe = p; } catch (e) {}
  if (!exe) exe = CAND.find(p => { try { return fs.existsSync(p) && fs.statSync(p).isFile(); } catch (e) { return false; } });
  const b = await chromium.launch({ executablePath: exe });
  try {
    const pg = await b.newPage({ viewport: { width: 390, height: 844 } });
    await pg.route('**', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());
    await pg.goto('file://' + path.join(root, 'content', 'horno', 'index.html'));
    await pg.waitForTimeout(1200);
    await pg.click('.classes button[data-c="architect"]');
    await pg.click('#begin');
    await pg.waitForTimeout(600);

    /* THE HUD, BEFORE ANYTHING ELSE. What is on screen when the game starts is the first thing a
       person sees after the creator screen, and a control that does nothing is a lie told once per
       press. #cmd is hidden by the shell generator above; this is what proves it stayed hidden. */
    const hud = await pg.evaluate(() => [...document.querySelectorAll('button')]
      .filter(x => !x.hidden && x.offsetParent !== null && x.getBoundingClientRect().width > 0 && x.id)
      .map(x => x.id + (x.textContent.trim() ? ':' + x.textContent.trim() : '')));
    if (hud.some(b => b.startsWith('cmd')))
      bad.push('a 🐾 paw button is on the HUD of a one-room bakery that has no dog in it, and pressing it does nothing at all (engine.js, grep `nearestDog`, which opens with `const c=nearestDog(); if(!c)return;`). The visible HUD is: ' + hud.join(', ') + '. A control that never answers teaches a player that controls here may not answer.');

    /* ───────── 2a · YOU WALK THERE. On foot, from where the game puts you. ─────────
       This used to be a lie in the reply and not in the code: the probe teleported the player onto
       the tile with `px=fx=...` and the write-up said "walks to the tray". Nothing proved the tray
       could be REACHED. So it holds the up button a person holds — the dpad button, with the real
       pointer events the engine binds (grep `exitFsForCard`, and the pointer handlers beside it) — and waits to arrive. The clocks are
       pinned only AFTER this, because pinning performance.now freezes the walk itself. */
    const where = () => pg.evaluate(() => ({ x: px, y: py, moving }));
    const spawn = await where();
    await pg.dispatchEvent('.dpad button[data-d="up"]', 'pointerdown');
    let arrived = false;
    for (let i = 0; i < 40 && !arrived; i++) { await pg.waitForTimeout(100);
      const p = await where(); arrived = (p.x === STAND.x && p.y === STAND.y); }
    await pg.dispatchEvent('.dpad button[data-d="up"]', 'pointerup');
    await pg.waitForTimeout(400);
    const stood = await where();
    if (!arrived) { bad.push('you cannot WALK to the tray. From where the game puts you (' + spawn.x + ',' + spawn.y + '), holding the up button for four seconds left you at (' + stood.x + ',' + stood.y + ') and not on the tile beside the tray at (' + STAND.x + ',' + STAND.y + '). The one thing in this world is behind something.'); return; }
    const read = await pg.evaluate(() => { const r = document.getElementById('read'); return r && !r.hidden; });
    if (!read) { bad.push('you can walk to the tray, and standing beside it there is no Read button at all, so this world has no verb. The read mark and the sheet are what make the tray a thing you do something to.'); return; }
    console.log('  walked from (' + spawn.x + ',' + spawn.y + ') to (' + stood.x + ',' + stood.y + ') on the dpad, and the Read button lit');

    /* pin both clocks, so the only thing that can move a pixel is the bake */
    await pg.evaluate(() => { Date.now = () => 1700000000000; performance.now = () => 50000; });

    /* stand(): NOT the walk — the walk is above and it is the one that proves reachability. This
       puts the player on exactly the same sub-tile coordinates before every photograph, because a
       pixel diff between two frames shot from two slightly different places measures the camera. */
    const stand = () => pg.evaluate(s => { world = 'horno'; px = fx = s.x; py = fy = s.y; moving = false; held = null; dir = 'up'; setWorldTag(); checkTalk(); }, STAND);

    /* THE FLAT CAMERAS draw into #cv and can just be read. THE 3D ONE CANNOT: the WebGL drawing
       buffer is not preserved past compositing, so it is rendered on demand and copied into a 2D
       canvas inside the same task, which is the only moment the pixels exist. */
    const grab2d = () => pg.evaluate(() => { const cv = document.getElementById('cv');
      return { w: cv.width, h: cv.height, d: [...cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data] }; });
    const grab3d = () => pg.evaluate(() => { try {
      T3.renderer.render(T3.scene, T3.cam);
      const c3 = T3.renderer.domElement, t = document.createElement('canvas');
      t.width = c3.width; t.height = c3.height;
      const x = t.getContext('2d'); x.drawImage(c3, 0, 0);
      return { w: t.width, h: t.height, d: [...x.getImageData(0, 0, t.width, t.height).data] };
    } catch (e) { return { err: String(e) }; } });
    const frame = async cam => { await pg.evaluate(c => camSet(c), cam); await pg.waitForTimeout(450);
      return cam === '3d' ? grab3d() : grab2d(); };
    /* NOTHING TO MEASURE IS NOT A PASS. A WebGL readback that comes back blank or flat would make
       every diff after it zero — a red with a message about the wrong thing. Say so instead. */
    const unreadable = f => { if (f.err) return 'the 3D camera could not be read back at all: ' + f.err + '. Nothing was photographed, so nothing below measured anything.';
      if (!f.w || !f.h || !f.d.length) return 'the 3D camera read back as an empty buffer (' + f.w + 'x' + f.h + '). Nothing to measure is not a pass.';
      let lo = 255, hi = 0; for (let i = 0; i < f.d.length; i += 4) { const v = f.d[i]; if (v < lo) lo = v; if (v > hi) hi = v; }
      return hi - lo < 8 ? 'the 3D camera read back as one flat colour (red channel ' + lo + '..' + hi + ' over the whole ' + f.w + 'x' + f.h + ' buffer), so the scene was never photographed and every 3D number below is a comparison of two blanks. Nothing to measure is not a pass.' : null; };
    const diff = (a, c) => { let n = 0, x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
      for (let i = 0; i < a.d.length; i += 4) {
        if (Math.abs(a.d[i] - c.d[i]) + Math.abs(a.d[i + 1] - c.d[i + 1]) + Math.abs(a.d[i + 2] - c.d[i + 2]) <= 18) continue;
        const p = i / 4, x = p % a.w, y = (p / a.w) | 0;
        n++; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
      return { n, box: n ? [x0, y0, x1, y1].join(',') : 'nowhere' }; };

    await stand();

    /* ───────── 2b · THE ROOM, MEASURED AGAINST THE PERSON WHO WORKS IN IT ─────────

       WHY THIS EXISTS. A previous pass raised this bench from 0.502 to 0.696 world units on a
       measurement of the wrong thing — it sized the furniture against the top edge of a person's
       sprite CARD (1.265) instead of against the person, and the card is 8px of speech-bubble
       headroom taller than she is. The bench top ended up above her shoulder, the dough level with
       her face, and the pan cut the sign on the wall behind it in half. EVERY SUITE WAS GREEN, both
       before and after, and the 3D pixel diff above was 76 either way, because a diff asks whether
       the frame CHANGED and never whether the room makes sense. If proportion matters here, then
       something has to read it, and this is the something.

       IT DOES NOT TRUST ANY NUMBER IN ANY COMMENT, INCLUDING THIS FILE'S.
       - The PERSON is PAINTED and then SCANNED: drawPerson into a 36x48 card through the same
         transform engine3d.js hands every artist, then the topmost opaque row. Her feet are the
         sprite's own `center.y` and her card is the sprite's own `scale.y`, both read off the live
         billboard. So this tracks T3PERSON through any rescale — the cast went 1.12 -> 0.92 on
         2026-09-22 — without anybody remembering to update a constant here. A guard that names its
         own copy of a number is testing its own arithmetic (.claude/skills/guard/SKILL.md).
       - The PROP is the engine's own `t3Top` off the baked mesh — "the tallest ink in the thing
         itself" (engine3d.js, grep `m.t3Top=`) — not a sum this file computes from the parts.

       WHAT THE EXTRACTION THREW AWAY, in the same breath as the result: two scalars. A height and a
       height. This cannot see WIDTH, so a bench the right height and three tiles wide passes; it
       cannot see what the bench is BEHIND, so it would not have caught the sign on its own; and it
       cannot see the flat cameras at all, where a tile's height on screen comes from its row.

       THE BAND, and it is about THIS drawing and not about people. She is a cartoon with a large
       head, so human proportions do not transfer. Off drawPerson's own coordinates, as fractions of
       her drawn height: feet 0.09, hip 0.31, shoulder 0.66, the middle of her head 0.78, the top of
       her head 1.00. A bench you get your weight over stands between the hip and the chin, and what
       is piled on it must stay below her face. 0.75 is that ceiling. 0.30 is the floor, under which
       the thing is a crate on the ground and not a bench you stand at. */
    const PROP_CEIL = 0.75, PROP_FLOOR = 0.30;
    const scale = await pg.evaluate(t => { try {
      const spr = T3.pool.map(p => p.spr).find(s => s && s.visible && s.userData && s.userData.hero);
      if (!spr) return { err: 'there is no hero billboard standing in the 3D scene, so there is nobody to measure the room against. Nothing to measure is not a pass.' };
      const K = T3.K, c = document.createElement('canvas'); c.width = 36 * K; c.height = 48 * K;
      const g = c.getContext('2d'); g.setTransform(K, 0, 0, K, 0, 8 * K); /* engine3d.js's own +8: the artist paints 8px lower (#57) */
      drawPerson(g, 2, 6, look, { dir: 'down' });                         /* where engine3d.js paints the hero: (2,6) */
      const d = g.getImageData(0, 0, c.width, c.height).data;
      let top = -1;
      for (let r = 0; r < c.height && top < 0; r++) for (let x = 0; x < c.width; x++)
        if (d[(r * c.width + x) * 4 + 3] > 24) { top = r; break; }
      if (top < 0) return { err: 'a person painted onto her own billboard came back completely blank, so the ruler this check measures the room with does not exist. Nothing to measure is not a pass.' };
      const cardPx = 48 * K, floor = cardPx * (1 - spr.center.y), per = spr.scale.y / cardPx;
      const props = T3.group.children.filter(o => o.userData && o.userData.mesh)
        .map(o => ({ g: o.userData.g, x: o.userData.x, y: o.userData.y, top: o.t3Top }));
      return { person: (floor - top) * per, props, tray: props.find(p => p.x === t.x && p.y === t.y) || null };
    } catch (e) { return { err: 'the room could not be measured against a person at all: ' + e }; } }, TRAY);

    if (scale.err) bad.push(scale.err);
    else if (!(scale.person > 0)) bad.push('a person in this room measured ' + scale.person + ' world units tall, so every proportion below is a division by nothing.');
    else if (!scale.tray) bad.push('nothing with a SHAPE is standing at the tray\'s tile (' + TRAY.x + ',' + TRAY.y + '), so the one object this world is about could not be measured against the baker at all. Nothing to measure is not a pass.');
    else {
      const R = scale.tray.top / scale.person;
      const room = scale.props.map(p => '"' + p.g + '" at (' + p.x + ',' + p.y + ') ' + (p.top / scale.person * 100).toFixed(1) + '%').join(', ');
      if (R > PROP_CEIL) bad.push('the bench the baker works at is too tall for her. She is ' + scale.person.toFixed(3) + ' world units tall (painted and measured, not assumed), and what stands on her bench tops out at ' + scale.tray.top.toFixed(3) + ' — ' + (R * 100).toFixed(1) + '% of her, where her shoulder is 66% and the middle of her head is 78%. The dough is level with her face and the bench top is above her shoulder. The rest of the room, in the same units: ' + room + '. This is the check that a pixel diff cannot do: every camera still CHANGED when she pressed the button, and the room still did not make sense.');
      else if (R < PROP_FLOOR) bad.push('the bench the baker works at is too low to be a bench. She is ' + scale.person.toFixed(3) + ' world units tall and what stands on it tops out at ' + scale.tray.top.toFixed(3) + ' — ' + (R * 100).toFixed(1) + '% of her, below her hip. That is a crate on the floor, not something you get your weight over. The rest of the room: ' + room + '.');
      else console.log('  the baker is ' + scale.person.toFixed(3) + ' tall (painted, then scanned) and her bench tops out at ' + scale.tray.top.toFixed(3) + ' — ' + (R * 100).toFixed(1) + '% of her, between her hip and her face. The room: ' + room);
    }
    if (bad.length) return;

    const before = {}, control = {};
    for (const c of CAMS) before[c] = await frame(c);
    const blank = unreadable(before['3d']); if (blank) { bad.push(blank); return; }
    await stand();
    for (const c of CAMS) control[c] = await frame(c);
    for (const c of CAMS) { const d = diff(before[c], control[c]);
      if (d.n) bad.push('the CONTROL is not zero: the ' + c + ' camera drew ' + d.n + ' different pixels (at ' + d.box + ') with nothing pressed at all, so everything this check measures afterwards is the animation and not the bake. Stop and read docs/POSTMORTEM.md 13r.'); }
    if (bad.length) return;

    const g0 = await pg.evaluate(t => WORLDS.horno.grid[t.y][t.x], TRAY);
    const k0 = await pg.evaluate(() => { try { return T3.builtKey; } catch (e) { return null; } });
    await pg.evaluate(c => camSet(c), '3d'); await pg.waitForTimeout(400); await stand();
    await pg.click('#read'); await pg.waitForTimeout(400);
    const btns = await pg.evaluate(() => [...document.querySelectorAll('#docBody .dbtn')].map(x => x.textContent.trim()));
    if (!btns.some(t => /vanilla|vainilla/i.test(t)) || !btns.some(t => /chocolate/i.test(t)))
      { bad.push('the sheet at the tray does not offer both shells — it offered: ' + JSON.stringify(btns)); return; }
    await pg.evaluate(() => [...document.querySelectorAll('#docBody .dbtn')].find(x => /vanilla|vainilla/i.test(x.textContent)).click());
    await pg.waitForTimeout(600);

    if (!(await pg.evaluate(() => document.getElementById('reader').hidden)))
      bad.push('pressing a shell on the baker\'s card left the sheet open, so you never see the tray you just changed.');
    const g1 = await pg.evaluate(t => WORLDS.horno.grid[t.y][t.x], TRAY);
    if (g1 === g0) bad.push('pressing "vanilla" on the baker\'s card left the tray exactly as it was (still "' + g0 + '"), so the one thing you can do in this world does nothing.');

    await stand();
    /* THE CAUSE LINE IS PER CAMERA, and that is not tidiness. The first draft appended the
       drawIso explanation to every camera's failure, so planting a swallowed button press printed
       "drawIso paints a SOLID glyph as a coloured slab" under the TOP camera — a true sentence
       about the wrong camera, handed to whoever is reading the red. A failure message that names
       a cause it cannot know is worse than one that names none. */
    /* AND ONE THING PIXELS CANNOT SAY: WHICH glyph the baked scene is holding. This is a label and
       it is kept as a label — it was the only 3D assertion in the first draft, which made it a
       proxy standing in for a shape; now it stands beside a pixel diff and answers a different
       question. It is asked BEFORE the diff loop because it is what lets the 3D failure sentence
       name the RIGHT cause: a 3D camera that did not move has two quite different diseases, and a
       message that guesses between them is the mistake this file's iso comment already warns about. */
    const t3 = await pg.evaluate(t => { try {
      const m = T3.group.children.find(o => o.userData && o.userData.mesh && o.userData.x === t.x && o.userData.y === t.y);
      return { key: T3.builtKey, glyph: m ? m.userData.g : null }; } catch (e) { return { err: String(e) }; } }, TRAY);

    const why = {
      iso: ' drawIso paints a SOLID glyph as a coloured slab and never calls the tile\'s painter (engine.js, grep `isoBlock(cx,cy,ISOCOL`), and nothing in the engine ever reads the `iso` slot of the view registry — MAPCOL is the only seam a pack has here.',
      '3d': (t3.err || t3.key === k0)
        ? ' the scene was never re-baked (builtKey is still "' + k0 + '"), so in 3D the tray keeps the shape it had until you walk out of the room and come back — t3Invalidate() is the line that is missing (engine/engine3d.js, grep t3Invalidate).'
        : (t3.glyph !== g1
          ? ' the scene WAS re-baked but it is still holding a "' + t3.glyph + '" at the tray\'s tile while every other camera draws a "' + g1 + '".'
          : ' the scene was re-baked and the tile really is labelled "' + t3.glyph + '" — so the two glyphs DRAW THE SAME PICTURE. The mesh recipe for the baked tray is making the same shape as the dough one (content/horno/art.js, TILEART\'s v and c entries and hTrayMesh). A tile that changes its name and not its shape is the bug a label check cannot see, which is why this camera is now counted in pixels.')
    };
    /* WHAT EACH CAMERA'S NUMBER ACTUALLY MEANS, printed beside it, because three of these are a
       new OBJECT and one is a recolour, and a count cannot tell them apart. Saying "shape" under a
       camera that only changed colour is the proxy this file was caught shipping once already. */
    const kind = { top: 'a new shape', front: 'a new shape', '3d': 'a new shape', iso: 'a COLOUR only — drawIso draws no object here; see MAPCOL in content/horno/art.js' };
    const moved = {};
    for (const c of CAMS) { const d = moved[c] = diff(before[c], await frame(c));
      if (!d.n) bad.push('the ' + c + ' camera drew the same frame after the bake as before it: 0 pixels moved. One decision is supposed to feed every view, and this camera is not being told.' + (why[c] || ''));
      else console.log('  the ' + c + ' camera: ' + d.n + ' pixels moved, in a box at ' + d.box + ' — ' + kind[c]); }

    /* AND THE PIXELS HAVE TO BE ON THE TRAY. This is the hole a count cannot fill on its own and
       naming it is not enough: in 3D the whole bake moves 76 pixels while the SAME scene with the
       clocks left running moves 477 (measured, by planting the unpinned clock), so "the frame
       changed" is a claim a passing cloud could satisfy. So ask three.js where the tray's tile
       lands on screen and require the changed box to contain it. The extraction is honest about
       what it threw away: a bounding box keeps position and extent and discards SHAPE and count
       inside it, so this says the change happened at the tray — never that it is bread. */
    if (moved['3d'] && moved['3d'].n) {
      const aim = await pg.evaluate(t => { try {
        const v = new THREE.Vector3(t.x + 0.5, 0.6, t.y + 0.5).project(T3.cam), c3 = T3.renderer.domElement;
        return { x: Math.round((v.x * 0.5 + 0.5) * c3.width), y: Math.round((-v.y * 0.5 + 0.5) * c3.height) };
      } catch (e) { return { err: String(e) }; } }, TRAY);
      if (aim.err) bad.push('the 3D camera could not be asked where the tray lands on screen: ' + aim.err);
      else { const [x0, y0, x1, y1] = moved['3d'].box.split(',').map(Number), M = 12;
        if (aim.x < x0 - M || aim.x > x1 + M || aim.y < y0 - M || aim.y > y1 + M)
          bad.push('in 3D the bake moved ' + moved['3d'].n + ' pixels, but not where the tray is: the changed box is ' + moved['3d'].box + ' and the tray\'s own tile projects to (' + aim.x + ',' + aim.y + '). Something in the frame changed and it was not the thing you pressed a button on.');
        else console.log('  and in 3D those pixels are ON the tray: its tile projects to (' + aim.x + ',' + aim.y + '), inside the changed box'); }
    }

    if (t3.err) bad.push('the 3D camera could not be asked what it is holding at the tray: ' + t3.err);
    else if (t3.key === k0) bad.push('the 3D scene was never re-baked (builtKey is still "' + k0 + '"), so in 3D the tray keeps the shape it had until you walk out of the room and back.');
    else if (t3.glyph !== g1) bad.push('the 3D scene is still holding a "' + t3.glyph + '" at the tray\'s tile while every other camera draws a "' + g1 + '".');
    else console.log('  the 3d camera: re-baked, and the mesh standing at the tray is labelled "' + t3.glyph + '"');

    /* ───────── 2d · AND THE WAY OUT OF THE CARD, WHICH IS WHERE A PHONE PLAYER GETS HURT ─────────
       Opening the card runs exitFsForCard() (engine.js, grep `exitFsForCard`): #vp loses `.fs`, the body
       loses `noscroll`, browser fullscreen is exited, and `wasFs=true` is recorded. ONLY restoreFs()
       undoes that and only the reader's own close button calls it (engine.js, grep `restoreFs();checkTalk`). The first
       draft of content/horno/docs.js closed with `$("reader").hidden=true`, so every single bake
       threw a fullscreen player back out to browser chrome and left wasFs stuck true, and the only
       thing this file asserted afterwards was `reader.hidden===true` — which is exactly what the
       broken version did do. This runs LAST because putting #vp into .fs resizes the canvas, and a
       resized canvas would make every pixel diff above a comparison of two different pictures. */
    await pg.evaluate(() => { document.getElementById('vp').classList.add('fs'); document.body.classList.add('noscroll'); });
    await pg.waitForTimeout(250);
    await pg.click('#read'); await pg.waitForTimeout(400);
    const mid = await pg.evaluate(() => ({ fs: document.getElementById('vp').classList.contains('fs'), open: !document.getElementById('reader').hidden }));
    if (!mid.open) bad.push('in fullscreen, pressing Read at the tray opened no card at all.');
    else if (mid.fs) bad.push('opening the card did not leave fullscreen, so this check cannot tell whether closing it comes back — the engine is supposed to run exitFsForCard() on open (engine.js, grep `exitFsForCard`).');
    else {
      await pg.evaluate(() => { const x = [...document.querySelectorAll('#docBody .dbtn')].find(b => /chocolate/i.test(b.textContent)); if (x) x.click(); });
      await pg.waitForTimeout(500);
      const out = await pg.evaluate(() => ({ hidden: document.getElementById('reader').hidden,
        fs: document.getElementById('vp').classList.contains('fs'), noscroll: document.body.classList.contains('noscroll'),
        read: (() => { const r = document.getElementById('read'); return !!(r && !r.hidden); })() }));
      if (!out.hidden) bad.push('pressing a shell on the baker\'s card left the sheet open, so you never see the tray you just changed.');
      if (!out.fs || !out.noscroll) bad.push('baking threw the player out of fullscreen and never put it back: after pressing a shell, #vp.fs=' + out.fs + ' and body.noscroll=' + out.noscroll + ', where both were true before. The card exits fullscreen when it opens and only the reader\'s own close button restores it, so a card that hides itself hands a phone player back the browser chrome every time she bakes — and leaves wasFs stuck true, so the next honest close restores nothing either.');
      if (!out.read) bad.push('after baking, the Read button at the tray is gone, so you cannot open the card a second time and change your mind — and changing your mind for ever is the whole of this world\'s no-punishment rule.');
      if (out.fs && out.noscroll && out.hidden && out.read) console.log('  the card closes the engine\'s own way: fullscreen comes back and the Read button relights');
    }
  } finally { await b.close(); }
}

/* ───────────────── 3 · THE STANDING DEMANDS ─────────────────
   The gauge's own device. A small pack fails some of the shared suite's checks for being SMALL
   rather than for being WRONG; record them and fail when the SET changes. A line that disappears
   means the template got easier, a line that appears means somebody made the engine harder to
   write a second game for, and it says so on the day it happens.
   NOTHING TO MEASURE IS NOT A MEASUREMENT: an empty result is a broken run and fails differently. */
function demands() {
  const expectedPath = path.join(root, 'content', 'horno', 'expected.txt');
  let out = '';
  try {
    out = execFileSync('node', [path.join(root, 'test', 'engine.smoke.js'), '--index', 'content/horno/index.html'],
      { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  } catch (e) { out = (e.stdout || '') + (e.stderr || ''); }
  const got = out.split('\n').filter(l => l.startsWith('- ')).map(l => l.slice(2).trim())
    .map(l => l.replace(/drawn \d+ time\(s\)/, 'drawn N time(s)')).sort();
  if (!/COUNT-ONLY|\bOK\b|^FAIL/m.test(out)) {
    console.log('FAIL — el horno never ran. The shared suite produced nothing at all, which is not');
    console.log('the same as finding nothing. This is a broken run, not an easier template.');
    console.log('Most often: no usable Chromium. Set CHROMIUM_PATH to a real binary and try again.');
    console.log(out.trim().split('\n').slice(-20).join('\n') || '(it said nothing at all)');
    return false;
  }
  if (!fs.existsSync(expectedPath)) {
    fs.writeFileSync(expectedPath, got.join('\n') + (got.length ? '\n' : ''));
    console.log('horno: first run — recorded ' + got.length + ' standing demands in content/horno/expected.txt');
    return true;
  }
  const want = fs.readFileSync(expectedPath, 'utf8').split('\n').map(l => l.trim()).filter(Boolean).sort();
  const gone = want.filter(l => !got.includes(l)), fresh = got.filter(l => !want.includes(l));
  if (!gone.length && !fresh.length) {
    console.log('  the shared suite: still the same ' + want.length + ' standing demands');
    return true;
  }
  console.log('FAIL — what the engine demands of this pack has CHANGED.');
  fresh.forEach(l => console.log('  NEW demand: ' + l));
  gone.forEach(l => console.log('  no longer demanded (the template got easier — delete this line from content/horno/expected.txt and say so in the commit): ' + l));
  return false;
}

(async () => {
  await played();
  const ok = demands() && !bad.length;
  bad.forEach(l => console.log('FAIL — ' + l));
  /* THE PASS SENTENCE, AND WHY IT IS NOT THE ONE THIS FILE FIRST SHIPPED.
     It used to read "the same three rounds change in all four cameras", and the before/after sheet
     rendered from this very tree showed the iso column as a flat coloured slab in all three rows —
     no bench, no pan, no rounds. The picture refuted the sentence, and the sentence was the one CI
     and the owner read. A pass line is a claim; it says what was measured and nothing wider. */
  if (ok) console.log('OK — el horno: you walk to the tray on the dpad, press Read, press a shell, and the same three rounds are wearing it — as a SHAPE in top, front and 3D, and as a COLOUR in iso, where drawIso draws no object at all. The bench she works at was measured against her, painted and scanned, and stands between her hip and her face. One room, one tray, one verb.');
  process.exit(ok ? 0 : 1);
})().catch(e => { console.log('FAIL — el horno could not be run at all: ' + e.message); process.exit(1); });
