#!/usr/bin/env node
/* THE STATE OF THE TOWN — a scoreboard, not a gate.
   Built 2026-09-11 for the owner's experiment: "can we try to run crew fix for a while trying to
   see if agents can do more than one iteration so we can see progress made generally in the
   changarrito in two iterations."
   The risk in that question is that "progress" becomes a feeling. This prints NUMBERS for the
   things that are actually open, so iteration 1 and iteration 2 can be subtracted from a before.
   It never fails the build — a scoreboard that can fail becomes a gate, and a gate people are
   afraid of gets weakened rather than met. test/town.smoke.js is the gate.
   Run:  node test/town.state.js            (add --json for a machine-readable line) */
const path = require('path'), { chromium } = require('playwright-core');
(async () => {
  const exe = process.env.CHROMIUM_PATH || chromium.executablePath();
  const root = path.resolve(__dirname, '..');
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const errs = []; page.on('pageerror', e => errs.push(e.message));
  await page.route('**', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());
  await page.goto('file://' + path.resolve(root, 'changarrito/index.html'));
  await page.waitForTimeout(1600);

  const s = await page.evaluate(async () => {
    const R = {};
    R.version = typeof GAMEV === 'string' ? GAMEV : '?';
    R.worlds = Object.keys(WORLDS).length;
    R.people_in_town = Object.keys(WORLDS).reduce((n, w) => n + WORLDS[w].npcs.length, 0);

    /* --- can somebody be TALKED to? a person with no chat line has no Talk button once their
           quests are done, and 25 of 31 quest-carriers in Meridian had none. count the town's --- */
    let silent = 0, voiced = 0;
    Object.keys(WORLDS).forEach(w => WORLDS[w].npcs.forEach(n => { (n.chat ? voiced++ : silent++); }));
    R.people_with_a_voice = voiced; R.people_with_none = silent;

    /* --- the record: does every person the town counts actually have a body? (the 2026-09-06 bug) --- */
    if (typeof RECORDSRC === 'object' && RECORDSRC.people) {
      const bodies = n => Object.keys(WORLDS).reduce((c, w) => c + WORLDS[w].npcs.filter(m => m.issue === n).length, 0);
      R.record_counts = RECORDSRC.people.length;
      R.record_with_bodies = RECORDSRC.people.filter(i => bodies(i.n)).length;
      /* the record reads GitHub, and this probe runs with the network aborted, so 0 here means
         "not asked", not "none waiting". Labelled rather than quietly printed as a zero. */
      R.record_is_offline = R.record_counts === 0;
    }

    /* --- flat things: a picture standing on air, per docs/BEAUTIFY.md. EVERY world, not just the
           one we happened to boot into — the first version of this counted one room and reported
           "1 flat piece", which is the kind of number that looks like progress and is not. --- */
    camSet('3d'); sizeCanvas();
    const back = world;
    let flat = 0, solid = 0;
    for (const w of Object.keys(WORLDS)) {
      world = w; if (typeof t3Invalidate === 'function') t3Invalidate();
      draw(); await new Promise(r => setTimeout(r, 120)); draw();
      if (typeof T3 !== 'undefined' && T3.group) T3.group.traverse(o => {
        const u = o.userData || {}; if (!u.g) return; (u.flat ? flat++ : solid++); });
    }
    world = back; if (typeof t3Invalidate === 'function') t3Invalidate();
    R.pieces_that_are_flat_pictures = flat; R.pieces_with_a_body = solid;

    /* --- the cameras this pack offers, and whether each draws the world at all --- */
    R.cameras = (typeof CAMS !== 'undefined') ? CAMS.slice() : [];
    R.cameras_that_draw = R.cameras.filter(c => {
      try { camSet(c); sizeCanvas(); const cv = document.getElementById('cv');
        if (c === '3d') return !!(T3 && T3.renderer);
        draw(); const d = cv.getContext('2d').getImageData(0, 0, cv.width, cv.height).data;
        for (let i = 3; i < d.length; i += 4000) if (d[i] > 0) return true; return false;
      } catch (e) { return false; } }).length;
    return R;
  });
  s.page_errors = errs.length;
  await browser.close();

  if (process.argv.includes('--json')) { console.log(JSON.stringify(s)); return; }
  const rows = [
    ['version', s.version],
    ['worlds', s.worlds],
    ['people standing in town', s.people_in_town],
    ['people you can talk to', s.people_with_a_voice + ' of ' + (s.people_with_a_voice + s.people_with_none)],
    ['issues the record counts', s.record_is_offline ? 'not asked (this probe runs offline)' : s.record_counts],
    ['…of those, with a body', s.record_is_offline ? '—' : s.record_with_bodies + ' of ' + s.record_counts],
    ['pieces that are flat pictures', s.pieces_that_are_flat_pictures],
    ['pieces with a real body', s.pieces_with_a_body],
    ['cameras offered', s.cameras.join(' ')],
    ['…that draw anything', s.cameras_that_draw + ' of ' + s.cameras.length],
    ['page errors on boot', s.page_errors],
  ];
  console.log('THE STATE OF EL CHANGARRITO');
  rows.forEach(([k, v]) => console.log('  ' + String(k).padEnd(32) + v));
  console.log('\n  (a scoreboard, not a gate — it never fails the build. test/town.smoke.js is the gate.)');
})().catch(e => { console.error('could not read the town:', e.message); process.exit(1); });
