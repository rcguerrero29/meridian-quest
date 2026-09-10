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

  /* ---- in-scene text has a floor (Rosa's 3D note) ----
     Text painted into the world is authored in tile units and the camera decides how big it lands:
     measured on a phone, one unit is about a CSS pixel, so a glyph authored at 5.5 arrives around
     five pixels tall and stops being letters. Raising it at draw time would only overflow the
     tile, so the floor is enforced where the art is authored — here, by reading it. Scanned rather
     than run because these sizes are literals in the drawing code, and a literal is exactly the
     thing that drifts. */
  {
    const fs = require('fs');
    const SCENE_MIN = 7;
    const dirs = [path.join(root, 'engine'), path.dirname(path.resolve(root, idx))];
    const seen = [];
    const scan = (dir, depth) => { let ents = []; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
      ents.forEach(en => { const f = path.join(dir, en.name);
        if (en.isDirectory()) { if (depth < 3 && en.name !== 'node_modules') scan(f, depth + 1); return; }
        if (!/\.js$/.test(en.name)) return;
        const src = fs.readFileSync(f, 'utf8');
        const re = /font\s*=\s*"(?:[^"]*?\s)?(\d+(?:\.\d+)?)px\s/g; let m;
        while ((m = re.exec(src))) { const px = parseFloat(m[1]);
          if (px < SCENE_MIN) seen.push(path.relative(root, f) + ' draws text at ' + px + ' units'); }
      }); };
    dirs.forEach(d => scan(d, 0));
    [...new Set(seen)].forEach(msg =>
      fails.push('in-scene text below the floor: ' + msg + ' — under ' + SCENE_MIN + ' units it lands around five CSS pixels on a phone and stops resolving in every camera'));
  }

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
    // ---- #132 / #133: a hair style has to look like its name ----
    // Owner: "long hair looks like a beard, lets call it that, then create one that looks a bit
    // more like long hair only not bearded" and "fro is also offf". Both are claims about pixels,
    // so both are measured in pixels: the person is drawn at the size they are seen on the street.
    {
      const HAIR = '#E01B24'; /* a colour nothing else in the drawing uses, so hair is countable */
      const shot = (style) => {
        const c = document.createElement('canvas'); c.width = 40; c.height = 40;
        const g = c.getContext('2d'); const o = ctx; ctx = g;
        try { g.translate(11, 6); drawPerson(g, 0, 0, { shirt: '#8B5CF6', skin: '#E5AC82', hair: HAIR, style, outfit: 'casual', pattern: 'plain' }, { dir: 'down' }); }
        finally { ctx = o; }
        const d = g.getImageData(0, 0, 40, 40).data;
        return { at: (x, y) => { const i = ((y | 0) * 40 + (x | 0)) * 4; return [d[i], d[i + 1], d[i + 2], d[i + 3]]; },
                 isHair: (x, y) => { const i = (((y | 0) * 40 + (x | 0)) * 4);
                   return d[i + 3] > 40 && d[i] > 60 && d[i] > d[i + 1] * 1.5 && d[i] > d[i + 2] * 1.5; },
                 isSkin: (x, y) => { const i = (((y | 0) * 40 + (x | 0)) * 4);
                   return d[i + 3] > 40 && d[i] > 180 && d[i + 1] > 140 && d[i + 2] > 110 && d[i] < d[i + 1] * 1.5; },
                 data: d };
      };
      const named = (T().styles || []).map(x => x[0]);
      ['long', 'beard', 'afro'].forEach(k => { if (named.indexOf(k) < 0) P.push('#132/#133: "' + k + '" is not offered in the style list (' + lang + ')'); });
      // The face finds itself, so nothing here depends on where the drawing happens to land.
      const faceBox = (sh) => { let x0 = 99, y0 = 99, x1 = -1, y1 = -1;
        for (let y = 0; y < 40; y++) for (let x = 0; x < 40; x++) if (sh.isSkin(x, y)) {
          if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
        return x1 < 0 ? null : { x0, y0, x1, y1, cx: Math.round((x0 + x1) / 2) }; };
      const massIn = (sh, x0, x1, y0, y1) => { let n = 0;
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (sh.isHair(x, y)) n++; return n; };
      const beard = shot('beard'), long = shot('long');
      const fb = faceBox(beard), fl = faceBox(long);
      if (!fb || !fl) P.push('#132: no face found in the drawing, so the hair cannot be judged against it');
      else {
        // under the chin: closed is a beard, open is long hair. That is the whole distinction.
        const chin = (sh, f) => massIn(sh, f.cx - 2, f.cx + 2, f.y1 + 1, f.y1 + 3);
        if (chin(beard, fb) < 8) P.push('#132: "beard" does not close under the chin (' + chin(beard, fb) + 'px) — that closed shape is what makes it a beard');
        if (chin(long, fl) > 2) P.push('#132: "long" closes under the chin (' + chin(long, fl) + 'px), which is the silhouette of a beard, not of long hair');
        // and it has to be long: mass down both sides, from mid-face past the jaw
        const midY = Math.round((fl.y0 + fl.y1) / 2);
        [['left', fl.x0 - 5, fl.x0 - 1], ['right', fl.x1 + 1, fl.x1 + 5]].forEach(([side, a, b]) => {
          const n = massIn(long, a, b, midY, fl.y1 + 3);
          if (n < 8) P.push('#132: "long" has almost no hair down its ' + side + ' side past the jaw (' + n + 'px) — that fall is what makes it long');
        });
      }
      // #133: the afro must have a value range, not one flat brightness
      // Only the INSIDE of the mass counts. An edge is antialiased against the background and
      // would hand back a spread of values for free; what was missing is a ladder across the
      // body of the hair, so that is what is measured.
      const afro = shot('afro');
      const inside = (x, y) => afro.isHair(x, y) && afro.isHair(x - 1, y) && afro.isHair(x + 1, y) && afro.isHair(x, y - 1) && afro.isHair(x, y + 1);
      let lo = 999, hi = -1, n = 0;
      for (let y = 2; y < 22; y++) for (let x = 2; x < 38; x++) if (inside(x, y)) {
        const i = (y * 40 + x) * 4;
        const L = 0.299 * afro.data[i] + 0.587 * afro.data[i + 1] + 0.114 * afro.data[i + 2];
        if (L < lo) lo = L; if (L > hi) hi = L; n++; }
      if (n < 40) P.push('#133: the afro has almost no mass to it (' + n + ' pixels inside its own edge)');
      else if (hi - lo < 18) P.push('#133: the body of the afro spans ' + Math.round(hi - lo) + ' levels of brightness — at one value it reads as a helmet, not as hair with a near side and a far side');
    }
    // a save that chose the old "long" was wearing the beard, and keeps it
    {
      const s0 = { n: 'Test', c: 'architect', lk: { style: 'long' }, v: 2 };
      const out = sanitizeSave(s0);
      if (!out || out.lk.style !== 'beard') P.push('#132: a save made before this change loses the beard it was wearing (got "' + (out && out.lk.style) + '")');
      const s1 = { n: 'Test', c: 'architect', lk: { style: 'long' }, v: 2, hairV: 2 };
      const out1 = sanitizeSave(s1);
      if (!out1 || out1.lk.style !== 'long') P.push('#132: a save made after this change cannot keep long hair (got "' + (out1 && out1.lk.style) + '")');
    }
    // ---- #130: naming and styling are two parts, and look like two parts ----
    // Owner: "for the menu to update sonny and my appearance, can we move it slightly up and
    // sepparate from my name? just looks like it overlaps". The panel is one block above (title,
    // note, preview, name) and one below (the choices), with a rule between them — and the chair,
    // which comes in with the name hidden, gets the same shape so both ways in read the same.
    {
      const cr = document.getElementById('creator'), hid = cr.hidden;
      cr.hidden = false;
      const head = cr.querySelector('.crhead'), body = cr.querySelector('.crbody');
      if (!head || !body) P.push('#130: the create-your-character panel is not split into a header and its choices');
      else {
        const nm = document.getElementById('heroname'), row = document.getElementById('rowOutfit');
        if (!head.contains(nm)) P.push('#130: the name field is not in the panel\'s header');
        if (!body.contains(row)) P.push('#130: the first row of choices is not in the panel\'s body');
        const cs = getComputedStyle(body);
        if (parseFloat(cs.borderTopWidth) < 1) P.push('#130: nothing marks where naming ends and styling begins');
        const gap = body.getBoundingClientRect().top - nm.getBoundingClientRect().bottom;
        if (gap < 12) P.push('#130: the choices start ' + Math.round(gap) + 'px under the name field — that is the same rhythm as every row, so they read as one list');
        const lb = document.getElementById('crLooksLb');
        if (!lb || !lb.textContent.trim()) P.push('#130: the styling half of the panel has no heading in ' + lang);
      }
      cr.hidden = hid;
    }
    // ---- every button on a sheet is a thumb's target, and none of them touch (Rosa 2) ----
    // `.dbtn` carried a colour and nothing else, so it fell back to the browser's default — 21px
    // tall, half a reliable thumb target — and flowed flush against its neighbours, while Copy and
    // Download beside it were 68. Her floor is 44 for anything that acts, and the buttons that only
    // copy the page may never be the most prominent thing on it.
    {
      const withBtns = Object.keys(DC()).filter(id => { try { return (docSections(id) || []).some(x => x && (x.btn || x.form || x.docs)); } catch (e) { return false; } });
      const said = {};
      withBtns.slice(0, 6).forEach(id => {
        try { docOpen(id); } catch (e) { return; }
        const sheet = document.getElementById('paperSheet');
        const acts = [...sheet.querySelectorAll('.dbtn, .opt')].filter(b => b.getBoundingClientRect().height > 0);
        acts.forEach(b => { const r = b.getBoundingClientRect();
          if (r.height < 44) said['a "' + b.textContent.trim().slice(0, 18) + '" button on a sheet is ' + Math.round(r.height) + 'px tall — under the 44 a thumb needs'] = 1; });
        // no two may touch: a miss then lands on the neighbour rather than on nothing
        for (let i = 0; i < acts.length; i++) for (let j = i + 1; j < acts.length; j++) {
          const a = acts[i].getBoundingClientRect(), c = acts[j].getBoundingClientRect();
          const apart = Math.max(a.left - c.right, c.left - a.right, a.top - c.bottom, c.top - a.bottom);
          if (apart < 8) said['"' + acts[i].textContent.trim().slice(0, 14) + '" and "' + acts[j].textContent.trim().slice(0, 14) + '" are ' + Math.round(Math.max(0, apart)) + 'px apart — a miss lands on the neighbour'] = 1;
        }
        // and the quiet end stays quiet
        const quiet = [...sheet.querySelectorAll('.docbar button')].map(b => b.getBoundingClientRect().height).filter(h => h > 0);
        const loud = acts.map(b => b.getBoundingClientRect().height);
        if (quiet.length && loud.length && Math.max(...quiet) > Math.min(...loud))
          said['the buttons that only copy the sheet (' + Math.round(Math.max(...quiet)) + 'px) are bigger than the ones that change something (' + Math.round(Math.min(...loud)) + 'px)'] = 1;
        try { document.getElementById('docClose').click(); } catch (e) {}
      });
      Object.keys(said).slice(0, 4).forEach(m => P.push('Rosa 2: ' + m));
    }
    // ---- #127: every drawer is one subject, and its controls live inside it ----
    // Owner: "there is a bug in the main settings menu due to the options for sonny/my character.
    // lets just move that to its own section and re organize so it doesnt break the architecture
    // of the drawers and menus." So this checks the architecture, not one drawer: each drawer is
    // named, opens and closes on its own, and every control belongs to exactly one of them.
    {
      const WANT = { drwCtl: ['lbCtl', 'optSwipe'], drwLook: ['lbTheme', 'themeRow', 'lbCam', 'camRow', 'lbSeason', 'seasonRow'],
                     drwSelf: ['lbAle', 'aleRow'], drwSound: ['lbMusic', 'tuneRow'], drwGame: ['lbLang'] };
      const ORDER = Object.keys(WANT); /* named here, not read from DRAWERS — DRAWERS is what is under test */
      const seen = {};
      if (ORDER.some(id => DRAWERS.indexOf(id) < 0))
        P.push('#127: the engine does not know every drawer (' + ORDER.filter(id => DRAWERS.indexOf(id) < 0).join(', ') + '), so it will not remember whether it was open');
      ORDER.forEach(id => {
        const d = document.getElementById(id);
        if (!d) { P.push('#127: the ' + id + ' drawer is not in this shell'); return; }
        if (d.tagName !== 'DETAILS') { P.push('#127: ' + id + ' is a ' + d.tagName + ', not a drawer'); return; }
        const lb = d.querySelector('summary span');
        if (!lb || !lb.textContent.trim()) P.push('#127: the ' + id + ' drawer has no name in ' + lang);
        // it opens and closes on its own, and remembers which
        const was = d.open; d.open = true; if (!d.open) P.push('#127: ' + id + ' will not open');
        d.open = false; if (d.open) P.push('#127: ' + id + ' will not close'); d.open = was;
        (WANT[id] || []).forEach(cid => {
          const el = document.getElementById(cid);
          if (!el) { P.push('#127: ' + cid + ' is missing from this shell'); return; }
          if (!d.contains(el)) {
            const home = ORDER.map(k => document.getElementById(k)).find(o => o && o.contains(el));
            P.push('#127: ' + cid + ' belongs in ' + id + ' but sits in ' + (home ? home.id : 'no drawer at all'));
          }
        });
        // nothing may be claimed by two drawers
        [...d.querySelectorAll('[id]')].forEach(el => {
          if (seen[el.id] && seen[el.id] !== id) P.push('#127: ' + el.id + ' is inside both ' + seen[el.id] + ' and ' + id);
          seen[el.id] = id; });
      });
      // the dropdown the looks row brings is styled with the sheet, not left to the browser
      const sel = document.querySelector('#aleRow select');
      if (sel) { const cs = getComputedStyle(sel);
        if (parseFloat(cs.borderRadius) < 4) P.push('#127: the looks dropdown is unstyled — it is the one control on the page that looks like nothing else'); }
    }
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

  /* ---- a button you can see does what it says (Rosa, finding 1) ----
     This one needs a SHORT screen: the fault only exists where the sheet is taller than the
     window, which is why a laptop never saw it. So it runs at a phone's size, outside the main
     evaluate, and puts the window back afterwards. */
  await page.setViewportSize({ width: 390, height: 560 });
  const rosa1 = await page.evaluate(() => {
    const P = [];
  // ---- the strip at the door says something true (Rosa, finding 8) ----
  {
    const bar = document.getElementById('xpbarwrap'), tag = document.getElementById('ptag');
    hud();
    if (typeof HUDFACT === 'function') {
      if (!bar.hidden) P.push('Rosa 8: this pack carries a fact at the door but still shows a progress bar under it');
      if (/·/.test(tag.textContent)) P.push('Rosa 8: the door still wears a rank ladder ("' + tag.textContent + '") beside a fact');
      let v = null; try { v = HUDFACT(); } catch (e) { P.push('Rosa 8: the fact at the door throws: ' + e.message); }
      if (v !== null && typeof v !== 'string') P.push('Rosa 8: the fact at the door is not a string');
      if (typeof v === 'string' && v && !/\d/.test(v)) P.push('Rosa 8: the fact at the door carries no number, so it cannot go down as well as up');
      const st = document.getElementById('status');
      if (!v && !st.hidden) P.push('Rosa 8: with nothing true to say the strip shows an empty chip rather than nothing');
    } else {
      /* the suite never starts a game, so the bar is legitimately hidden here; what must still be
         true is that the score is what the strip carries */
      if (!/XP/.test(document.getElementById('xp').textContent)) P.push('a pack with no fact at the door lost its score');
    }
  }
  // "position:sticky; bottom:0" on a bar at the foot of a scrolling sheet does not merely sit at
  // the end of the paper — it hovers over WHATEVER content is in that band, so which control is
  // unreachable depends only on where you have scrolled. On a phone that put Copy/Download/Close
  // on top of Sign in, Make a new token and File a request. This asks the browser what is on top
  // of every visible button rather than trusting that it is drawn, for every document this pack
  // declares, at three scroll positions, at a phone's size. It is written against the SHEET, not
  // against one game's content, so it holds for Meridian, the town and anything built from the
  // template.
  {
    const keep = { w: innerWidth, h: innerHeight };
    /* "a button you can see" means visible, not merely laid out: a button scrolled out of its own
       scroll box still reports a rectangle, and the browser answers with whatever is painted there.
       So the centre has to survive every clipping ancestor before it is worth asking about. */
    const seeable = (b) => {
      const r = b.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) return null;
      let top = 0, left = 0, bottom = innerHeight, right = innerWidth;
      for (let p = b.parentElement; p; p = p.parentElement) {
        const cs = getComputedStyle(p);
        if (cs.overflowY === 'visible' && cs.overflowX === 'visible') continue;
        const pr = p.getBoundingClientRect();
        top = Math.max(top, pr.top); left = Math.max(left, pr.left);
        bottom = Math.min(bottom, pr.bottom); right = Math.min(right, pr.right);
      }
      const x = Math.round(r.left + r.width / 2), y = Math.round(r.top + r.height / 2);
      return (x > left && x < right && y > top && y < bottom) ? [x, y] : null;
    };
    const covered = (root) => { const bad = [];
      root.querySelectorAll('button').forEach(b => {
        if (b.hidden || b.offsetParent === null) return;
        const c = seeable(b); if (!c) return;   /* not on screen at all is a different fault */
        const x = c[0], y = c[1];
        const hit = document.elementFromPoint(x, y);
        if (!hit) { bad.push((b.id || b.textContent.trim().slice(0, 14)) + ' → nothing'); return; }
        if (hit !== b && !b.contains(hit) && !hit.contains(b))
          bad.push('"' + (b.textContent.trim().slice(0, 16) || b.id) + '" is under "' + (hit.textContent || '').trim().slice(0, 16) + (hit.id ? ' #' + hit.id : '') + '"');
      });
      return bad; };
    const ids = Object.keys(DC());
    const sc = document.getElementById('paperScroll');
    if (!sc) P.push("Rosa 1: the sheet has no scroll box of its own, so its bar floats over the document");
    const seen = {};
    ids.forEach(id => {
      try { docOpen(id); } catch (e) { P.push("Rosa 1: document '" + id + "' will not open: " + e.message); return; }
      const box = document.getElementById('paperScroll') || document.getElementById('reader');
      [0, Math.round(box.scrollHeight / 2), box.scrollHeight].forEach(top => {
        box.scrollTop = top;
        covered(document.getElementById('reader')).forEach(m => { seen[m] = (seen[m] || 0) + 1; });
      });
      try { document.getElementById('docClose').click(); } catch (e) {}
    });
    Object.keys(seen).slice(0, 4).forEach(m =>
      P.push('Rosa 1: in an open document at a phone\'s size, ' + m + ' — pressing where you see it does the other thing'));
    const n = Object.keys(seen).length;
    if (n > 4) P.push('Rosa 1: ' + (n - 4) + ' more button(s) in the same state, not listed');
    void keep;
  }

    // ---- every button the world offers stands inside the world (Rosa, findings 3 and 7) ----
    // They used to be placed by a ladder of fixed distances from the bottom — 16, 72, 128, 184,
    // 240 — which fits a 427px laptop frame and not a 266px phone one: the fifth rung landed
    // outside the world, clipped and half-unpressable, on top of the corner icons. Three buttons
    // shared one rung and two shared another; 🎲 and 🔁 shared one exactly, so the random-look
    // button was never pressable. Measured, not looked at, with every button showing at once.
    {
      const vp = document.getElementById('vp'), acts = document.getElementById('acts');
      const wd = document.getElementById('world'), wasHid = wd.hidden;
      wd.hidden = false; /* this suite never enters the world; the buttons need a real box */
      sizeCanvas();      /* and the frame has to be measured while it is visible, or it is 0 tall */
      /* found by class, not by container, so the geometry is judged whatever the markup does */
      const btns = [...(wd.querySelectorAll('button.talk'))];
      if (!btns.length) P.push('Rosa 3: no world buttons found to measure');
      else {
        const was = btns.map(b => b.hidden);
        btns.forEach(b => { b.hidden = false; if (!b.textContent.trim()) b.textContent = b.id; });
        const R = e => e.getBoundingClientRect(), vr = R(vp);
        if (vr.height < 40) P.push('Rosa 3: the world measured ' + Math.round(vr.height) + 'px tall, so its buttons could not be judged against it');
        const shown = btns.filter(b => R(b).width > 1);
        if (shown.length < 4) P.push('Rosa 3: only ' + shown.length + ' world button(s) could be shown, so the stack was never really tested');
        shown.forEach(b => { const r = R(b);
          if (r.top < vr.top - 0.5 || r.bottom > vr.bottom + 0.5 || r.left < vr.left - 0.5 || r.right > vr.right + 0.5)
            P.push('Rosa 3: the "' + b.id + '" button is outside the world (' + Math.round(r.top - vr.top) + 'px from its top edge, world is ' + Math.round(vr.height) + 'px tall)');
        });
        const over = (a, b) => !(a.right <= b.left + 0.5 || b.right <= a.left + 0.5 || a.bottom <= b.top + 0.5 || b.bottom <= a.top + 0.5);
        for (let i = 0; i < shown.length; i++) for (let j = i + 1; j < shown.length; j++)
          if (over(R(shown[i]), R(shown[j])))
            P.push('Rosa 7: "' + shown[i].id + '" and "' + shown[j].id + '" occupy the same place, so one of them can never be pressed');
        ['gear', 'fsbtn', 'mapbtn'].forEach(id => { const ic = document.getElementById(id); if (!ic) return;
          shown.forEach(b => { if (over(R(b), R(ic)))
            P.push('Rosa 3: the "' + b.id + '" button lands on the ' + id + ' icon'); }); });
        btns.forEach((b, i) => { b.hidden = was[i]; });
      }
      wd.hidden = wasHid;
    }
    // ---- a panel over the world can be seen out of, and nothing runs off the side ----
    // Rosa 4: Settings and the map opened INSIDE the world's frame, so on a phone the way out was
    // 360px below the fold and the map's "Close" was cut through the middle of the word.
    // Rosa 6: the rows of choices never wrapped, so Spanish ran off the panel on a DESKTOP.
    // Rosa 5: one long dropdown option made every field in the request form wider than the phone.
    {
      const wd2 = document.getElementById('world'), wh2 = wd2.hidden; wd2.hidden = false; sizeCanvas();
      const panels = [...document.querySelectorAll('.settings')].filter(p => p.id && p.id !== 'reader');
      panels.forEach(p => {
        const cs = getComputedStyle(p);
        if (cs.position !== 'fixed')
          P.push('Rosa 4: the ' + p.id + ' panel opens inside the world\'s frame (' + cs.position + '), where it has a third of the screen to live in');
      });
      const wasHid = {};
      ['settings', 'mapov'].forEach(id => {
        const p = document.getElementById(id); if (!p) return;
        wasHid[id] = p.hidden; p.hidden = false;
        const box = p.querySelector('.box'), out = p.querySelector('.box>.close');
        if (!out) { P.push('Rosa 4: the ' + id + ' panel has no way out to check'); return; }
        const br = box.getBoundingClientRect(), orr = out.getBoundingClientRect();
        if (orr.bottom > br.bottom + 1 || orr.top < br.top - 1)
          P.push('Rosa 4: the way out of ' + id + ' is cut off by its own box (' + Math.round(orr.bottom - br.bottom) + 'px past the edge)');
        if (orr.bottom > innerHeight + 1)
          P.push('Rosa 4: the way out of ' + id + ' is ' + Math.round(orr.bottom - innerHeight) + 'px below the screen when it opens');
        if (getComputedStyle(out).position !== 'sticky')
          P.push('Rosa 4: the way out of ' + id + ' does not ride the bottom of its box, so it can scroll out of sight');
        // Rosa 6: nothing in a row of choices is cut off sideways, in whatever language this is
        p.querySelectorAll('.optrow').forEach(row => {
          const rr = row.getBoundingClientRect();
          [...row.children].forEach(c => { const r = c.getBoundingClientRect();
            if (r.width < 1) return;
            if (r.right > rr.right + 1 || r.left < rr.left - 1)
              P.push('Rosa 6: "' + (c.textContent || c.id).trim().slice(0, 14) + '" runs off the side of its row in ' + lang);
            if (c.scrollWidth > c.clientWidth + 2)
              P.push('Rosa 6: "' + (c.textContent || c.id).trim().slice(0, 14) + '" is clipped to ' + Math.round(c.clientWidth) + 'px of ' + c.scrollWidth + ' in ' + lang);
          });
        });
        p.hidden = wasHid[id];
      });
      // Rosa 5: a form on a sheet fits the sheet, whatever is inside its controls
      const withForm = Object.keys(DC()).find(id => { try { return (docSections(id) || []).some(x => x && x.form); } catch (e) { return false; } });
      if (withForm) { try { docOpen(withForm);
        const sheet = document.getElementById('paperSheet'), sr = sheet.getBoundingClientRect();
        sheet.querySelectorAll('.dform select,.dform input,.dform textarea,.dform label').forEach(f => {
          const r = f.getBoundingClientRect(); if (r.width < 1) return;
          if (r.right > sr.right + 1 || r.left < sr.left - 1)
            P.push('Rosa 5: a form field runs ' + Math.round(Math.max(r.right - sr.right, sr.left - r.left)) + 'px past the edge of the sheet');
        });
        if (document.scrollingElement && document.scrollingElement.scrollWidth > innerWidth + 2)
          P.push('Rosa 5: the page scrolls sideways by ' + Math.round(document.scrollingElement.scrollWidth - innerWidth) + 'px with the form open');
        document.getElementById('docClose').click();
      } catch (e) { P.push('Rosa 5: the form document will not open: ' + e.message); } }
      wd2.hidden = wh2;
    }
    return P;
  });
  fails.push(...rosa1);

  /* ---- the world takes a share of the screen ----
     This needs a phone's HEIGHT, not just its width: at 560 the old 5:4 rule already filled half
     the window, and the fault only appears on a tall screen. 390x844 is an actual phone. */
  await page.setViewportSize({ width: 390, height: 844 });
  const tallw = await page.evaluate(() => {
    const P = [];
// ---- the world takes a share of the screen, and the camera holds its width ----
// The world's height used to be width x 0.8 in every camera — the 2D tile grid's 5:4. Nobody
// chose 266px on a phone. With the 3D camera running it takes a share of the SCREEN instead,
// and because `fov` is the VERTICAL angle, a taller and narrower box would have shown the same
// up-and-down and LESS left-and-right: measured, 10.9 tiles of street across became 7.7. So the
// angle widens below the game's own 10:8 to hold the width. Both halves are checked, because
// either one alone is a regression.
{
  const wd3 = document.getElementById('world'), wh3 = wd3.hidden; wd3.hidden = false;
  const before = camMode;
  camSet('3d'); sizeCanvas(); draw3d();
  const vpr = document.getElementById('vp').getBoundingClientRect();
  const share = vpr.height / innerHeight;
  if (share < 0.40) P.push('the world is ' + Math.round(share * 100) + '% of the screen with the 3D camera on — it is still taking the 2D tile grid\'s 5:4 instead of a share of the screen');
  const cam = T3.cam, d = cam.position.distanceTo(new THREE.Vector3(fx + 0.5, 0.4, fy + 0.5));
  const tallU = 2 * d * Math.tan(cam.fov * Math.PI / 360), wideU = tallU * cam.aspect;
  if (wideU < 10) P.push('the 3D camera shows only ' + wideU.toFixed(1) + ' tiles across — a taller frame must not cost width, or it reads as the camera zooming in');
  if (tallU < wideU * 0.9) P.push('the 3D camera shows ' + tallU.toFixed(1) + ' tiles up-and-down against ' + wideU.toFixed(1) + ' across — the extra height bought nothing');
  // the flat cameras keep their own 5:4: they draw a fixed bitmap and must never be stretched
  camSet('top'); sizeCanvas();
  const cvr = document.getElementById('cv').getBoundingClientRect();
  const want = cvr.width * VH / VW;
  if (Math.abs(cvr.height - want) > 2)
    P.push('the flat camera is ' + Math.round(cvr.height) + 'px tall in a ' + Math.round(cvr.width) + 'px box — its bitmap is being stretched or letterboxed');
  // and past the edge of the map the ground carries on, rather than stopping at a cliff
  camSet('3d'); draw3d();
  let apron = 0; T3.group.traverse(o => { if (o.userData && o.userData.apron) apron++; });
  if (!apron) P.push('there is nothing beyond the edge of the map, so a taller frame shows the world ending at a cliff');
  camSet(before); sizeCanvas(); wd3.hidden = wh3;
}
    return P;
  });
  fails.push(...tallw);

  /* ---- #140 / #149: a thing you stand behind must not swallow you, and its empty corners are not solid ----
     The owner walked into it twice: "there are still overlaps with other objects where i seem to walk on
     them", and separately, people losing their quest marks near a desk. Two different faults with one
     camera between them.
     #149 first, because it is the plain one. Every prop, tree crown and cutout in this world is a PICTURE
     on a card, and most of that card is see-through. A see-through pixel that still writes depth punches a
     hole in whatever is drawn after it — which is people. alphaTest throws those pixels away before they
     reach the depth buffer, and the hole closes.
     #140 is the tall one. Only WALLS were ever cut away when they came between you and the camera; a tree,
     a lamp, a piñata never were. Cutting them to a knee-high stub the way a wall is cut would be worse — a
     tree is not a wall and half a tree is nonsense — so a tall thing that hides you turns to glass instead:
     it is still there, still in its place, and you can be seen through it. Written as what a person sees:
     stand behind the tree and BOTH the crown and you are in that pixel. Today only you are. */
  const ghost = await page.evaluate(() => {
    const P = [];
    const wd = document.getElementById('world'), wh = wd.hidden; wd.hidden = false;
    const before = camMode, bw = world, bx = px, by = py;
    camSet('3d'); sizeCanvas();
    // #149 — every baked picture in the scene throws its see-through pixels away
    const solidMargins = [];
    for (const wn of Object.keys(WORLD_DEFS)) {
      world = wn; px = fx = 1; py = fy = 1; t3Invalidate(); draw3d();
      T3.group.children.forEach(o => {
        if (!o.isSprite || !o.material || !o.material.map) return;
        const u = o.userData || {};
        if (!(u.flat || u.prop || u.canopy || u.pinata || u.deco)) return;
        if (!(o.material.alphaTest > 0)) solidMargins.push(wn + ':' + (u.g || u.deco || (u.canopy && 'canopy') || 'prop'));
      });
    }
    if (solidMargins.length)
      P.push('#149: ' + solidMargins.length + ' picture(s) in 3D still count their empty corners as solid, so they cut holes in anyone standing near them (' + [...new Set(solidMargins)].slice(0, 4).join(', ') + ')');

    // #140 — find a tall thing that is not a wall, stand one tile behind it, and look
    let found = null;
    for (const wn of Object.keys(WORLD_DEFS)) {
      world = wn; px = fx = 1; py = fy = 1; t3Invalidate(); draw3d();
      const tall = T3.group.children.filter(o => {
        const u = o.userData || {}; if (!u || u.stub || u.apron) return false;
        if (u.wall !== undefined || u.door || u.winBack || u.counter) return false;
        return u.x !== undefined && u.y !== undefined && t3Top(o) > 1.2;
      });
      for (const o of tall) {
        const sx = o.userData.x, sy = o.userData.y - 1;   // one tile toward the camera at yaw 0
        if (sy < 0 || SOLID.has(CW().grid[sy][sx])) continue;
        found = { wn, sx, sy }; break;
      }
      if (found) break;
    }
    if (!found) { P.push('#140: no tall non-wall piece with room to stand behind it was found in any world — the check never ran'); }
    else {
      world = found.wn; px = fx = found.sx; py = fy = found.sy; moving = false; held = null;
      T3.yaw = 0; t3Invalidate(); draw3d();
      const cut = (T3.near || []).filter(p => p.o && !(p.o.userData.wall !== undefined || p.o.userData.door || p.o.userData.winBack || p.o.userData.counter));
      if (!cut.length)
        P.push('#140: standing right behind a ' + (CW().grid[found.sy + 1][found.sx]) + ' in ' + found.wn + ', the only things the camera will move out of your way are walls — the thing in front of you is left solid, which is the "I seem to walk on them" report');
      else {
        const bad = cut.filter(p => !(p.o.material && (Array.isArray(p.o.material) ? p.o.material[0] : p.o.material).opacity < 1));
        if (bad.length) P.push('#140: the piece between you and the camera was picked out but never turned to glass — you still cannot be seen through it');
        const anyStub = cut.some(p => p.o.userData.stub3);
        if (anyStub) P.push('#140: a tree or a prop was cut down to a knee-high stub the way a wall is — half a tree is not a cutaway, it is a missing tree');
      }
    }
    world = bw; px = fx = bx; py = fy = by; t3Invalidate();
    camSet(before); sizeCanvas(); wd.hidden = wh;
    return P;
  });
  fails.push(...ghost);

  /* ---- #155: a place can fall off the map, and the pack says what it is ----
     The owner: "do fix the part where a missing 'world' wouldn't register. please make it so we
     have some basic tests. open world with 10? ok we check for the setting and 10 cities or world
     or whatever."
     Two checks, and the first one is the reason the second is trustworthy. The audit used to skip
     any world nothing reached, because at a fresh boot seven of Meridian's fifteen worlds are behind
     doors the city has not built yet. So it also skipped the case where a district simply lost its
     only door. Measured before this: deleting one portal took Taller Herrera out of the city — 161
     walkable tiles, three people, eight quests — and the audit returned an empty list.
     The test raises every lot, proves the grown city is clean, then SEVERS a door and proves the
     audit says so by name. A check that has never been red is not a check. */
  const orphan = await page.evaluate(() => {
    const P = [];
    // ---- the declaration: what this pack says it is, and whether that is what it has ----
    const ids = Object.keys(WORLD_DEFS), n = ids.length;
    if (Object.keys(WORLDS).length < n)
      P.push('#155: the pack declares ' + n + ' worlds and only ' + Object.keys(WORLDS).length + ' were built');
    const endless = (typeof ENDLESS !== 'undefined') && !!ENDLESS;
    const chapters = (typeof CHAPTERS !== 'undefined' && CHAPTERS) ? CHAPTERS.length : 0;
    // a world that ENDS must say how; a world that does not end must not carry an ending it never plays
    if (!endless && !chapters)
      P.push('#155: this pack does not declare ENDLESS, so its world ends — but it declares no chapters, so nothing can ever end it');
    if (endless && chapters)
      P.push('#155: this pack declares ENDLESS and ' + chapters + ' chapters — a world that does not end cannot also have a last day');
    if (!PL.home || !PL.spawn) P.push('#155: the pack names no home world or no spawn — nothing can be reached from nowhere');

    // ---- the grown city: with every lot raised, nothing may be unreachable ----
    // applyGrowth() rewinds each world to the map it shipped with and builds back what has been
    // EARNED, so the whole city is "every quest answered, every district seen". Ribbons alone are
    // not enough: La Obra's own door is a staged lot, and the Studio's interior is a BUILD.
    const beforeSeen = chSeen, beforeDone = new Set(done);
    for (let i = 0; i < 999; i++) done.add(i);   // every quest answered, whatever a pack has
    chSeen = 999; applyGrowth();
    const clean = auditReach(true);
    if (clean.length)
      P.push('#155: with every lot in the city built, somewhere still cannot be reached — ' + clean.join(' | '));

    // ---- and it must NOTICE. Sever every way into an inhabited world and expect to be told ----
    const victim = ids.find(id => id !== PL.home && WORLDS[id] && WORLDS[id].npcs.length
      && Object.keys(PORTALS).some(w => Object.entries(PORTALS[w] || {}).some(([, p]) => p.to === id)));
    if (!victim) {
      P.push('#155: no inhabited world with a door into it was found, so the check that a missing place registers never ran');
    } else {
      const cut = [];
      Object.keys(PORTALS).forEach(w => Object.entries(PORTALS[w] || {}).forEach(([ch, p]) => {
        if (p.to === victim) { cut.push([w, ch, p]); delete PORTALS[w][ch]; }
      }));
      const said = auditReach(true);
      cut.forEach(([w, ch, p]) => { PORTALS[w][ch] = p; });
      const named = said.some(s => s.indexOf(victim) === 0);
      if (!named)
        P.push('#155: ' + victim + ' was cut out of the city with ' + WORLDS[victim].npcs.length +
               ' people still standing in it, and the audit did not say so — this is the fault the ticket is about');
      const people = WORLDS[victim].npcs.map(x => x.npc);
      if (named && people.length && !said.some(s => s.indexOf(people[0]) >= 0))
        P.push('#155: the audit noticed ' + victim + ' but did not say who is stranded in it — "0 tiles reachable" reads like a rounding error');
    }
    chSeen = beforeSeen; done.clear(); beforeDone.forEach(i => done.add(i)); applyGrowth();
    return P;
  });
  fails.push(...orphan);

  /* ---- #156 / TAGS L12: a world that does not end still GROWS ----
     `ENDLESS` switched off the ending panel, and the ending panel's button was the only writer of
     `chSeen` in the whole engine — the one number that decides which quests are on offer, which
     storefronts are up, and whether the city grows. So an endless pack with two districts sat in
     district one forever: no error, no message, nothing to read. The town never noticed because it
     declares no CHAPTERS and gets one synthesised district.
     Two questions had been one. `chOpenDue()` is about the CITY — has this district finished.
     `chDue()` is about the CEREMONY — does a curtain play. Only the second one may ever ask about
     ENDLESS. The test walks the real path: close a district, press the button a player presses, and
     the city must have grown whichever kind of world this is. */
  const grows = await page.evaluate(async () => {
    const P = [];
    const L = (typeof CHS === 'function') ? CHS() : [];
    const endless = (typeof ENDLESS !== 'undefined') && !!ENDLESS;
    if (typeof chOpenDue !== 'function' || typeof chAdvance !== 'function') {
      P.push('#156: the engine has no way to open the next district except by playing an ending — so a world that does not end can never grow');
      return P;
    }
    if (!L.length) { P.push('#156: this pack has no districts at all, so nothing could be checked'); return P; }
    const keepSeen = chSeen, keepDone = new Set(done);
    // close the district the city is currently on
    chSeen = 0; done.clear();
    (L[0].quests || []).slice(0, L[0].need).forEach(i => done.add(i));
    if (!chOpenDue())
      P.push('#156: the first district has all the answers it asks for and the city does not consider it finished');
    // the ceremony is the ONLY thing ENDLESS may touch
    if (chDue() !== (chOpenDue() && !endless))
      P.push('#156: whether a curtain plays and whether the city has grown are still the same question — that is the coupling the ticket is about');
    // and now the path a player actually takes: the button on the card
    const before = chSeen;
    document.getElementById('card').hidden = false;
    document.getElementById('next').hidden = false;
    document.getElementById('next').click();
    await new Promise(r => setTimeout(r, 60));
    if (endless) {
      if (chSeen === before)
        P.push('#156: this world never ends, its first district is finished, and pressing on left the city exactly where it was — nothing new opened and nothing said so');
    } else {
      if (document.getElementById('end').hidden)
        P.push('#156: this world ends and its first district is finished, but pressing on did not play the ending');
      document.getElementById('end').hidden = true;
    }
    // and nothing may write chSeen except the advance
    if (chSeen > L.length) P.push('#156: the city grew past its own last district');
    chSeen = keepSeen; done.clear(); keepDone.forEach(i => done.add(i));
    document.getElementById('card').hidden = true;
    if (typeof applyGrowth === 'function') applyGrowth();
    return P;
  });
  fails.push(...grows);

  /* ---- TAGS L15 / ARCH-LOG A5+A7: a pack says what a glyph looks like, and which cameras it has ----
     The owner, 2026-09-10: "why cant we have like a pack can draw its own tree and layer for art?
     maybe im mixing but just trying ot reuse what we can." He was not mixing them up.
     A glyph has FOUR views and a pack could reach two. TILEART said the top, TILEART_SIDE said the
     profile, the leafy top of a tree was hardcoded in engine3d.js with a hardcoded green, and there
     was nowhere at all to describe the isometric view. And every game shipped all four cameras
     whether it wanted them or not, including one that loses most of its art.
     This asks for the CONTRACT and never for the picture, so it survives the art being redrawn. */
  const views = await page.evaluate(() => {
    const P = [];
    if (typeof tileView !== 'function') {
      P.push('a pack has no single place to say what a glyph looks like — the views are still scattered across tables it cannot all reach');
    } else {
      ['top', 'side', 'crown', 'iso'].forEach(v => {
        try { tileView('#', v); }
        catch (e) { P.push('nobody can ask what a glyph looks like from "' + v + '": ' + e.message); }
      });
      if (tileView('¡nope', 'crown') !== null)
        P.push('asking for a view a pack never drew gives back something rather than nothing');
      const treeG = Object.keys(TILES).find(g => (TILES[g] || {}).kind === 'tree');
      if (!treeG) P.push('this pack has no tree, so the crown could not be checked');
      else if (typeof TILECROWN === 'undefined') P.push('there is nowhere to declare what stands above a tile — a pack cannot draw its own tree');
      else {
        TILECROWN[treeG] = () => { ctx.fillStyle = '#ff00ff'; ctx.fillRect(0, 0, 40, 40); };
        const w = Object.keys(WORLD_DEFS).find(k => WORLDS[k] && WORLDS[k].rows.some(r => r.indexOf(treeG) >= 0));
        if (w) {
          const before = camMode, bw = world;
          camSet('3d'); world = w; t3Invalidate(); draw3d();
          if (!(T3.crownTex && T3.crownTex[treeG]))
            P.push('a pack declared what its tree looks like and the engine drew its own anyway');
          world = bw; camSet(before);
        }
        delete TILECROWN[treeG]; t3Invalidate();
      }
    }
    if (typeof CAMALL === 'undefined' || typeof CAMS === 'undefined') {
      P.push('a game cannot say which cameras it has — all of them are on, always');
    } else {
      if (CAMS.some(c => !CAMALL.includes(c))) P.push('this pack offers a camera the engine cannot draw');
      if (!CAMS.length) P.push('this pack offers no camera at all');
      const shown = [...document.querySelectorAll('#camRow button')].filter(b => !b.hidden).map(b => b.dataset.cam);
      const extra = shown.filter(c => !CAMS.includes(c));
      if (extra.length) P.push('there is a button for a camera this game does not have: ' + extra.join(', '));
      const was = camMode;
      camSet('¡nosuchcamera');
      if (!CAMS.includes(camMode)) P.push('asking for a camera the game does not have left it showing one it cannot draw');
      camSet(was);
    }
    return P;
  });
  fails.push(...views);
  /* ---- the loop stops DRAWING behind a panel, and never stops thinking ----
     Measured before the change: 215 frames in six seconds with a document covering the world, all
     at full device resolution, none of them visible. The world must still tick — otherwise the dog
     teleports when you put the paper down — and anything it says while you are reading is held
     rather than played out behind an opaque panel. */
  const loopq = await page.evaluate(async () => {
    const P = [];
    if (typeof worldCovered !== 'function') { P.push('the loop cannot tell when the world is covered, so it draws behind every panel'); return P; }
    document.getElementById('world').hidden = false; camSet('3d'); sizeCanvas();
    /* Count what the LOOP decides to do, rather than how fast WebGL happens to run in a headless
       page: the rule under test is "does the loop call draw", and that is observable directly. */
    const realDraw = draw; let calls = 0;
    draw = function () { calls++; return realDraw.apply(this, arguments); };
    /* A headless page throttles requestAnimationFrame hard — two frames in half a second, not
       thirty — so this counts SOME against NONE, which is the whole rule, rather than a rate. */
    const over = async (ms) => { calls = 0; await new Promise(r => setTimeout(r, ms)); return calls; };
    const open = await over(800);
    if (open < 1) P.push('the loop is not drawing the world at all with nothing over it');
    const doc = Object.keys(DC())[0];
    docOpen(doc); await new Promise(r => setTimeout(r, 200));
    if (!worldCovered()) P.push('an open document does not count as covering the world');
    const covered = await over(800);
    if (covered > 0) P.push('the world is still drawn ' + covered + ' time(s) behind an open document — nobody can see any of it');
    // it must still be THINKING, or everything jumps when the paper goes down
    const t0 = (typeof last !== 'undefined') ? last : null;
    await new Promise(r => setTimeout(r, 300));
    const t1 = (typeof last !== 'undefined') ? last : null;
    if (t0 === null) P.push('cannot tell whether the loop is alive behind a panel');
    else if (t0 === t1) P.push('the loop stopped entirely behind the panel, so the world will jump when the panel closes');
    // and what the street said while you were reading is kept, then said
    toast('a thing happened out there', 900);
    if (!toastHeld.length) P.push('something the world said behind a panel was spent on nobody');
    document.getElementById('docClose').click();
    await new Promise(r => setTimeout(r, 700));
    if (toastHeld.length) P.push('what the street said while you were reading was never delivered');
    const back = await over(800);
    if (back < 1) P.push('the loop did not start drawing again when the panel closed');
    draw = realDraw;
    document.getElementById('world').hidden = true;
    return P;
  });
  fails.push(...loopq);

  /* ---- the flat camera the game promises when 3D cannot draw ----
     Both packs boot into 3D (CAMDEF="3d"), so this is the camera nearly every player starts in.
     When draw3d() throws, the engine does three of the four things it should: it records the
     fault, it stops trying, and it draws the front-profile camera instead. It does NOT show it.
     camSet is the only writer of cv.hidden (engine.js:714) and nothing on the failure path calls
     it, so the flat picture is painted into a canvas that is still hidden while the dead 3D canvas
     is still the one on screen. Measured on both shells: 82 samples of ink on a canvas the player
     cannot see, under a message that says the flat camera is what they are looking at.
     This asks what the PLAYER can see, never which function ran, so it survives a rewrite. */
  const fell = await page.evaluate(async () => {
    const P = [];
    if (typeof T3 === 'undefined' || typeof draw3d !== 'function') { P.push('this pack has no 3D at all, so the fallback could not be checked'); return P; }
    camSet('3d'); draw();
    await new Promise(r => setTimeout(r, 400));
    if (!T3.renderer) { P.push('3D never started, so what happens when it fails could not be checked'); return P; }
    const realRender = T3.renderer.render;
    T3.renderer.render = () => { throw new Error('simulated context loss'); };
    T3.fail = false; T3.said = false; T3.builtKey = null;
    draw();
    await new Promise(r => setTimeout(r, 300));
    const flat = document.getElementById('cv'), dead = document.getElementById('cv3');
    const said = [...document.querySelectorAll('#ticker div')].map(e => e.textContent).join(' ');
    const promised = /flat camera|c.mara plana/i.test(said);
    if (!promised) P.push('3D failed and the player was never told');
    if (promised && flat.hidden)
      P.push('the game says it fell back to the flat camera and the flat camera is still hidden — it is painting where nobody can look');
    if (promised && !dead.hidden)
      P.push('3D failed and the dead 3D canvas is still the one on screen');
    // put it back so the rest of the run is honest
    T3.renderer.render = realRender; T3.fail = false; T3.said = false; T3.builtKey = null;
    camSet('3d'); draw();
    return P;
  });
  fails.push(...fell);

  /* ---- one bad frame must not be the last frame ----
     loop() asked for its next frame as its LAST statement (engine.js:2826), so anything that threw
     anywhere in the frame took the game with it: measured, the loop ticked once more and then never
     again, and it did not come back when the faulty code was removed. Not one dropped frame — the
     screen, forever, until a reload.
     Nothing in either shipping pack is known to throw here today, so this is insurance rather than
     a bug players are hitting. It is worth a rule anyway, because it decides what EVERY future bug
     costs: with the frame re-armed first, a fault is a glitch; re-armed last, every fault is fatal.
     It injects at a site UPSTREAM of draw() on purpose. A narrower fix that only wraps draw() makes
     the obvious version of this test pass while the game still freezes on anything else — that was
     tried, and it did. It also never counts frames: a headless page throttles rAF hard (see the
     note above), so the only honest question is whether the clock moved at all. */
  const badframe = await page.evaluate(async () => {
    const P = [];
    const moved = async (ms) => { const a = last; await new Promise(r => setTimeout(r, ms)); return last !== a; };
    if (typeof last === 'undefined') { P.push('cannot tell whether the loop is alive'); return P; }
    if (!(await moved(700))) { P.push('the loop was not running before this check, so nothing it says can be trusted'); return P; }
    for (const site of ['fredCheck', 'troUpdate', 'draw']) {
      if (typeof window[site] !== 'function') { P.push('the frame no longer calls ' + site + ', so this check has stopped checking anything — point it at whatever the frame calls now'); continue; }
      const real = window[site];
      window[site] = function () { throw new Error('BADFRAME on purpose'); };
      /* the frame that throws writes the clock BEFORE it throws, so the first window after
         injecting always looks alive whether or not it was the last one. Spend one window
         letting it die, and ask the second. Without this the check names the wrong function. */
      await moved(700);
      const alive = await moved(700);
      window[site] = real;
      if (!alive) P.push('one frame threw in ' + site + ' and the game stopped forever — the loop only asks for the next frame when nothing went wrong, so any fault anywhere is the last thing that ever happens');
      if (!alive) break; /* the loop is dead; the remaining sites cannot be told apart */
    }
    return P;
  });
  fails.push(...badframe);

  await page.setViewportSize({ width: 480, height: 900 });
  await browser.close();
  if (fails.length) { console.log('FAIL (' + idx + ')\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — ' + idx + ': the worlds hang together, every person is reachable and named, every document builds, every camera draws every world, every door stands in 3D, every animal has ground, and storage stays under its prefix. Still flat in 3D (#39): ' + (r.stillFlat && r.stillFlat.length ? r.stillFlat.join(' ') : 'nothing') + '.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
