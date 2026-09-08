#!/usr/bin/env node
/* R4 — the engine's own smoke, run against ANY index (docs/REGRESSION.md; NEW-WORLD.md §3).
   Meridian's suite (test/smoke.js) holds Meridian's content to account; the town's holds the
   town's. Neither asks the engine questions a second world would ask. This one does, against
   whichever shell it is pointed at: the worlds hang together, every person can be reached and
   talked to, every document builds, every camera draws every world, every door stands in 3D,
   every animal has something under it, and nothing is stored outside the pack's prefix.
   Run:  node test/engine.smoke.js --index index.html
         node test/engine.smoke.js --index changarrito/index.html
   (CHROMIUM_PATH if Chromium is not where Playwright looks). */
const path = require('path');
const { chromium } = require('playwright-core');
(async () => {
  const args = process.argv.slice(2);
  const idx = args[args.indexOf('--index') + 1];
  if (!args.includes('--index') || !idx) { console.error('usage: node test/engine.smoke.js --index <path to an index.html>'); process.exit(2); }
  const exe = process.env.CHROMIUM_PATH || chromium.executablePath();
  if (!exe) { console.error('No Chromium found. Set CHROMIUM_PATH.'); process.exit(1); }
  const root = path.resolve(__dirname, '..'), file = path.resolve(root, idx);
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const pageErrors = [], warns = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  await page.route('**', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());
  await page.goto('file://' + file);
  await page.waitForTimeout(1500);
  const fails = [];
  if (pageErrors.length) fails.push('page errors: ' + pageErrors.join(' | '));
  warns.filter(w => /^(REACH|PORTAL) /.test(w)).forEach(w => fails.push('boot warning: ' + w));

  const r0 = await page.evaluate(() => {
    const P = [];
    const walk = (w, x, y) => x >= 0 && y >= 0 && x < w.W && y < w.H && !SOLID.has(w.grid[y][x]) && w.grid[y][x] !== 'N';
    const firstWalkable = w => { for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) if (walk(w, x, y)) return [x, y]; return null; };
    // ---- the shell names itself and its version ----
    if (typeof GAMENAME !== 'string' || !GAMENAME) P.push('GAMENAME is not set');
    if (typeof GAMEV !== 'string' || !GAMEV) P.push('GAMEV is not set');
    const tag = (document.getElementById('verTag') || {}).textContent || '';
    if (typeof GAMEV === 'string' && !tag.includes(GAMEV)) P.push('the title screen does not show GAMEV (' + tag + ')');
    // ---- the worlds hang together ----
    if (!WORLDS || !Object.keys(WORLDS).length) P.push('no worlds');
    Object.entries(WORLDS).forEach(([id, w]) => {
      if (!w.rows.every(r => r.length === w.W)) P.push(id + ': rows are not all the same width');
      (typeof portalsOf === 'function' ? portalsOf(id) : Object.entries(PORTALS[id] || {}).map(([ch, p]) => ({ ch, p }))).forEach(({ ch, p }) => { /* #10: by glyph and by place */
        if (!WORLDS[p.to]) { P.push(id + ':' + ch + ' portals to a missing world ' + p.to); return; }
        if (!walk(WORLDS[p.to], p.x, p.y)) P.push(id + ':' + ch + ' lands on a blocked tile in ' + p.to + ' (' + p.x + ',' + p.y + ')');
      });
    });
    // ---- the roles the pack declares point at real places (#25) ----
    if (!WORLDS[PL.home]) P.push('PLACES.home names a missing world ' + PL.home);
    else if (!walk(WORLDS[PL.home], PL.spawn[0], PL.spawn[1])) P.push('the spawn (' + PL.spawn + ') in ' + PL.home + ' is not walkable');
    if (!WORLDS[PL.street]) P.push('PLACES.street names a missing world ' + PL.street);
    if (WORLDS[PL.park]) { const pk = WORLDS[PL.park];
      if (!walk(pk, PL.parkIn[0], PL.parkIn[1])) P.push('the leash lands on a blocked tile (' + PL.parkIn.slice(0, 2) + ') in ' + PL.park);
      if (!walk(pk, PL.parkDog[0], PL.parkDog[1])) P.push('the dog\'s park spot (' + PL.parkDog + ') is blocked');
      if (!walk(pk, PL.parkDogHome[0], PL.parkDogHome[1])) P.push('the dog\'s park home (' + PL.parkDogHome + ') is blocked');
      if (!PL.parkAdopt.some(([x, y]) => walk(pk, x, y))) P.push('no adoption spot in the park is walkable'); }
    if (!PL.friends.some(w => WORLDS[w])) P.push('no PLACES.friends world exists — an adopted dog would have nobody to befriend');
    auditReach().forEach(p => P.push('reach: ' + p));
    auditWander().forEach(p => P.push('a wanderer has nowhere to step: ' + p));
    // ---- every person is a person ----
    Object.entries(WORLDS).forEach(([id, w]) => w.npcs.forEach(n => {
      if (w.grid[n.y][n.x] !== 'N') P.push(id + ':' + n.npc + ' does not stand on a person tile');
      if (!npcName(n.npc)) P.push(id + ':' + n.npc + ' has no name in ' + lang);
      if (!lookOf(n)) P.push(id + ':' + n.npc + ' has no look');
      if (n.doc && !docDef(n.doc)) P.push(id + ':' + n.npc + " carries a document that does not exist ('" + n.doc + "')");
      (n.q || []).forEach(qi => { if (!QEN[qi]) P.push(id + ':' + n.npc + ' gives quest ' + qi + ' which does not exist'); });
    }));
    // ---- every document builds; every readable thing points at one ----
    Object.keys(DC()).forEach(id => { let s = null; try { s = docSections(id); } catch (e) { P.push("document '" + id + "' throws: " + e.message); return; }
      if (!Array.isArray(s)) P.push("document '" + id + "' does not build"); });
    (typeof READS !== 'undefined' ? READS : []).forEach(rd => {
      if (!WORLDS[rd.world]) { P.push('READ in a missing world ' + rd.world); return; }
      if (!docDef(rd.doc)) P.push("READ at " + rd.world + ' (' + rd.x + ',' + rd.y + ") names a missing document '" + rd.doc + "'"); });
    // ---- every animal has something under it (R1, for any pack) ----
    ['dog', 'cat', 'pig', 'loro'].forEach(k => { const a = ANI(k), wid = AW(k); if (!a || !wid) return; const w = WORLDS[wid];
      if (k === 'loro') { const t = w.rows[a.y] && w.rows[a.y][a.x]; if (!(t && (SOLID.has(t) || (TILES[t] && TILES[t].lift)))) P.push('loro has no perch at ' + wid + ' (' + a.x + ',' + a.y + ')'); }
      else if (!walk(w, a.x, a.y)) P.push(k + ' has nowhere to stand at ' + wid + ' (' + a.x + ',' + a.y + ')'); });
    // ---- every camera draws every world; every door stands in 3D ----
    const before = { cam: camMode, world, px, py, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0 };
    moving = false; held = null;
    const flat = {}, flatIn = {};
    Object.entries(WORLDS).forEach(([id, w]) => {
      const spot = firstWalkable(w); if (!spot) { P.push(id + ' has no walkable tile'); return; }
      world = id; px = fx = spot[0]; py = fy = spot[1];
      ['top', 'front', 'iso'].forEach(c => { camSet(c); try { draw(); } catch (e) { P.push(id + ' in ' + c + ' throws: ' + e.message); } });
      camSet('3d');
      let ok = false; try { ok = draw3d(); } catch (e) { P.push(id + ' in 3d throws: ' + e.message); }
      if (!ok || T3.fail) { P.push(id + ' did not render in 3D'); return; }
      // a door needs a lintel only where its wall stands taller than the door (lift ≥ 11 ≈ 1.0 unit);
      // a gate in a fence has open sky above it by design
      const tall = (x, y) => [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].some(([ax, ay]) => { const g = w.grid[ay] && w.grid[ay][ax], m = g && TILES[g]; return !!(m && (m.kind === 'wall' || m.kind === 'facade') && (m.lift | 0) >= 11); });
      let want = 0, wantLintel = 0; for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) if (DOORSET.has(w.rows[y][x]) && !SOLID.has(w.grid[y][x])) { want++; if (tall(x, y)) wantLintel++; }
      let doors = 0, lintels = 0, glows = 0;
      T3.group.children.forEach(o => { const u = o.userData || {}; if (u.door) doors++; if (u.lintel) lintels++; if (u.glow) glows++; });
      if (doors !== want) P.push(id + ' has ' + want + ' doors on the map and ' + doors + ' standing in 3D');
      if (lintels < wantLintel) P.push(id + ': ' + (wantLintel - lintels) + ' door(s) in a tall wall have a see-through slot above them');
      if (glows < doors) P.push(id + ': ' + (doors - glows) + ' door(s) do not say "this one opens" in 3D');
      T3.group.children.forEach(o => { const u = o.userData || {}; if (u.flat) { flat[u.g] = (flat[u.g] || 0) + 1; (flatIn[u.g] = flatIn[u.g] || new Set()).add(id); } });
    });
    world = before.world; px = fx = before.px; py = fy = before.py; T3.yaw = before.yaw; camSet(before.cam);
    // ---- fullscreen: the 3D buffer is the shape of the box it is shown in ----
    // Owner, 2026-09-08: "its still blurry in full screen". `.viewport.fs` gives the canvas
    // `height:100% !important` and `object-fit:contain`. A drawing buffer whose aspect does not
    // match the element's box is then RESCALED by the browser before anyone sees it — at
    // 1440x900 a 2880x2304 buffer was resampled down to 1125x900, letterboxed with bars either
    // side, and every edge in the world went soft. A 3D camera has no fixed frame to protect, so
    // it renders the box it is actually given.
    {
      const c3 = T3.renderer.domElement, vp = document.getElementById('vp');
      const before = { cam: camMode, w: world, x: px, y: py, hid: document.getElementById('world').hidden };
      document.getElementById('world').hidden = false; /* this suite never enters the world; the box needs to be real */
      camSet('3d'); world = before.w;
      const check = (why) => {
        sizeCanvas(); draw3d(); t3Resize();
        const box = c3.getBoundingClientRect();
        if (box.width < 2 || box.height < 2) { P.push('fullscreen: the 3D canvas has no box ' + why); return; }
        const boxAsp = box.width / box.height, bufAsp = c3.width / c3.height;
        if (Math.abs(boxAsp - bufAsp) / boxAsp > 0.02)
          P.push('fullscreen: ' + why + ' the 3D buffer is ' + c3.width + '\u00d7' + c3.height + ' (' + bufAsp.toFixed(2) + ') in a ' +
                 Math.round(box.width) + '\u00d7' + Math.round(box.height) + ' box (' + boxAsp.toFixed(2) + ') — the browser rescales that before it is seen, and every edge goes soft');
        if (T3.cam && Math.abs(T3.cam.aspect - boxAsp) / boxAsp > 0.02)
          P.push('fullscreen: ' + why + ' the camera is framed ' + T3.cam.aspect.toFixed(2) + ' for a ' + boxAsp.toFixed(2) + ' box');
      };
      check('in a window,');
      vp.classList.add('fs'); document.body.classList.add('noscroll');
      check('in fullscreen,');
      vp.classList.remove('fs'); document.body.classList.remove('noscroll');
      sizeCanvas();
      world = before.w; px = fx = before.x; py = fy = before.y; camSet(before.cam);
      document.getElementById('world').hidden = before.hid;
    }
    // ---- #131: one candy per window, and a candy smaller than the window it stands in ----
    // Owner: "sugar skull on sills are overlapping". Two ways for that to be true, both checked
    // here for whatever pack this is run against.
    if (typeof propSill === 'function' && typeof fiestaProps === 'function') {
      const seasons = (typeof SEASONS === 'object' && SEASONS) ? Object.keys(SEASONS) : [];
      const was = (typeof seasonNow === 'function') ? seasonNow() : null;
      seasons.forEach(sn => {
        seasonSet(sn);
        Object.keys(WORLDS).forEach(wid => {
          const taken = {};
          fiestaProps(wid).forEach(pr => {
            if (!pr.sill) return;
            const win = propSill(wid, pr);
            if (!win) { P.push('#131: a sill candy at ' + wid + ' (' + pr.x + ',' + pr.y + ') in ' + sn + ' names a tile with no window'); return; }
            // a candy must leave glass around it, or it reads as pasted over the pane. The pane is
            // read straight off the map, so this holds whatever propSill decides to report.
            const box = ((TILES[WORLDS[wid].rows[pr.y][pr.x]] || {}).win || [])[win.i] || [];
            const pw = box[2], ph = box[3];
            if (typeof win.size !== 'number')
              P.push('#131: the candy at ' + wid + ' (' + pr.x + ',' + pr.y + ') is drawn at its full 8px whatever the window is — nothing stops it covering the glass');
            else if (win.size > pw - 1 || win.size > ph)
              P.push('#131: the candy at ' + wid + ' (' + pr.x + ',' + pr.y + ') in ' + sn + ' is ' + win.size + 'px in a ' + pw + '\u00d7' + ph + ' window — it covers the glass instead of sitting on the sill');
            else if (win.size < 4) P.push('#131: the candy at ' + wid + ' (' + pr.x + ',' + pr.y + ') is ' + win.size + 'px — too small to read as a skull');
            // and no two may share one
            const key = wid + '|' + pr.x + '|' + pr.y + '|' + win.i;
            if (taken[key]) P.push('#131: two candies share one window at ' + wid + ' (' + pr.x + ',' + pr.y + ') in ' + sn + ' — each sill takes one');
            taken[key] = true;
          });
        });
      });
      // two candies set on one two-window front must land on different panes without being numbered
      const tile = (() => { for (const wid of Object.keys(WORLDS)) { const w = WORLDS[wid];
        for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) { const m = TILES[w.rows[y][x]] || {};
          if (m.win && m.win.length > 1) return { wid, x, y }; } } return null; })();
      if (!tile) P.push('#131: no facade in this pack has two windows, so the spreading rule cannot be checked');
      else { const a = { world: tile.wid, x: tile.x, y: tile.y, kind: 'calaverita', sill: true },
                   b = { world: tile.wid, x: tile.x, y: tile.y, kind: 'calaverita', sill: true };
        const sn0 = Object.keys(SEASONS)[0], bag = SEASONS[sn0].art;
        seasonSet(sn0);
        const keep = bag.props; bag.props = (keep || []).concat([a, b]);
        const ia = propSill(tile.wid, a), ib = propSill(tile.wid, b);
        if (!ia || !ib || ia.i === ib.i) P.push('#131: two candies on one front both took window ' + (ia ? ia.i : '?') + ' — a front with two windows must spread them');
        bag.props = keep;
      }
      if (was !== null) seasonSet(was);
    }
    // ---- #134 "things are looking a bit blurry": nothing is sampled through a LINEAR filter ----
    // This art is a pixel grid. A linear filter blends between texels (and, with a pyramid,
    // between mip levels), which is exactly the smear the owner reported. Nearest keeps the grid.
    // The pyramid itself was never the blur and stays: without it the far half of the street
    // crawls as you walk. So: nearest between texels AND between levels, everywhere.
    // The pyramid is asked for only under WebGL2 — on a WebGL1 fallback a non-power-of-two
    // texture with mipmaps renders BLACK, and every texture here is sized to its world.
    {
      const N = THREE.NearestFilter, OKMIN = [N, THREE.NearestMipmapNearestFilter, THREE.NearestMipmapLinearFilter];
      const cap = T3.renderer && T3.renderer.capabilities, gl2 = !!(cap && cap.isWebGL2);
      const seen = [], bad = [], noMip = [], wrongMip = [];
      T3.group.traverse(o => {
        const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        ms.forEach(m => { if (!m.map) return; const t = m.map, tag = JSON.stringify(o.userData || {}).slice(0, 40);
          seen.push(t);
          if (t.magFilter !== N) bad.push('magFilter on ' + tag);
          if (OKMIN.indexOf(t.minFilter) < 0) bad.push('minFilter on ' + tag);
          if (gl2 && !t.generateMipmaps) noMip.push(tag);
          if (!gl2 && t.generateMipmaps) wrongMip.push(tag); });
      });
      if (!seen.length) P.push('#134: no textures found in the 3D scene to check');
      if (bad.length) P.push('#134: ' + bad.length + ' texture(s) in the 3D scene are sampled through a linear filter — that is the blur (' + bad.slice(0, 3).join(', ') + ')');
      if (noMip.length) P.push('#134: ' + noMip.length + ' texture(s) have no mip pyramid, so the distance crawls (' + noMip.slice(0, 3).join(', ') + ')');
      if (wrongMip.length) P.push('#134: mipmaps asked for without WebGL2 — a non-power-of-two texture renders black there (' + wrongMip.slice(0, 3).join(', ') + ')');
      // the live sprites are repainted every frame, so they carry no pyramid — but they must still
      // be nearest, and they must keep their shape when the device pixel ratio changes.
      const shape = (why) => T3.pool.forEach((sp, i) => {
        if (sp.c.width !== 36 * T3.K || sp.c.height !== 48 * T3.K)
          P.push('#134: sprite ' + i + ' is ' + sp.c.width + '\u00d7' + sp.c.height + ', not ' + (36 * T3.K) + '\u00d7' + (48 * T3.K) + ' ' + why + ' — the artists paint 36\u00d748 and the rest is stretched');
        if (sp.tex.magFilter !== N || sp.tex.minFilter !== N) P.push('#134: sprite ' + i + ' is sampled through a linear filter');
        if (sp.tex.generateMipmaps) P.push('#134: sprite ' + i + ' rebuilds a mip pyramid every frame');
      });
      if (!T3.pool.length) P.push('#134: no live sprites were built to check');
      shape('as built');
      const gp = T3.renderer.getPixelRatio.bind(T3.renderer), K0 = T3.K;
      T3.renderer.getPixelRatio = () => (K0 > 1 ? 1 : 2); /* the owner goes fullscreen, or drags the window to another monitor */
      t3CheckK(); shape('after the device pixel ratio changed');
      T3.renderer.getPixelRatio = gp; t3CheckK();
    }
    // ---- #39: the 3D-realism audit — a picture standing in the scene is not a thing with sides ----
    // Owner, 2026-09-07: "the test should catch things like 2d image looking thing/objects." The 3D
    // builder tags every billboard it stands in a world as `flat`. FLAT_KNOWN is what is still flat
    // TODAY, and it only ever shrinks: a glyph flat and not on it fails the build (nothing new may
    // ship as a picture), and a glyph on it that is laid in this pack yet no longer flat fails too,
    // so the list is kept honest as things get sides (TILESIDE) or become boxes.
    // 2026-09-07: 17 kinds were flat; the desk (D) and the shelving (S) got sides the same day.
    const FLAT_KNOWN = ['3', '4', '5', '7', '9', 'A', 'C', 'H', 'I', 'J', 'P', 'W', 'X', 'Y']; /* the old stair '1' left the city with #7 */
    const laid = new Set(); Object.values(WORLDS).forEach(w => w.rows.forEach(r => r.split('').forEach(ch => laid.add(ch))));
    Object.keys(flat).forEach(g => { if (!FLAT_KNOWN.includes(g)) P.push('"' + g + '" (' + ((TILES[g] || {}).kind || '?') + ') stands in 3D as a flat picture in ' + [...flatIn[g]].join(',') + ' — give it a side view (TILESIDE) so it becomes a box; nothing new may ship flat (#39)'); });
    // a pack may give a letter another meaning (the town's I is a facade): only a glyph laid here
    // as a kind the builder could make flat counts as "no longer flat"
    const couldBeFlat = g => ['furniture', 'appliance', 'prop', 'nature', 'gear', 'marker', 'site', 'transit', 'stair', 'tree'].includes((TILES[g] || {}).kind);
    FLAT_KNOWN.forEach(g => { if (laid.has(g) && couldBeFlat(g) && !flat[g]) P.push('"' + g + '" is no longer flat in 3D — take it off FLAT_KNOWN in test/engine.smoke.js so the list keeps shrinking (#39)'); });
    // ---- nothing is stored outside the pack's prefix ----
    const pfx = SK(''); const stray = [];
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (!k.startsWith(pfx)) stray.push(k); }
    if (stray.length) P.push('storage keys outside the prefix "' + pfx + '": ' + stray.join(', '));
    return { P, stillFlat: Object.keys(flat).sort().map(g => g + '×' + flat[g]) };
  });
  const r = r0.P; r.stillFlat = r0.stillFlat;
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL (' + idx + ')\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — ' + idx + ': the worlds hang together, every person is reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, and storage stays under its prefix. Still flat in 3D (#39): ' + (r.stillFlat && r.stillFlat.length ? r.stillFlat.join(' ') : 'nothing') + '.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
