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

  const r = await page.evaluate(() => {
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
      Object.entries(PORTALS[id] || {}).forEach(([ch, p]) => {
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
    });
    world = before.world; px = fx = before.px; py = fy = before.py; T3.yaw = before.yaw; camSet(before.cam);
    // ---- nothing is stored outside the pack's prefix ----
    const pfx = SK(''); const stray = [];
    for (let i = 0; i < localStorage.length; i++) { const k = localStorage.key(i); if (!k.startsWith(pfx)) stray.push(k); }
    if (stray.length) P.push('storage keys outside the prefix "' + pfx + '": ' + stray.join(', '));
    return P;
  });
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL (' + idx + ')\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — ' + idx + ': the worlds hang together, every person is reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, and storage stays under its prefix.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
