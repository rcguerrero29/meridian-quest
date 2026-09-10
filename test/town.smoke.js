#!/usr/bin/env node
/* El Changarrito smoke — boots the town from file://, feeds the record a fixture, and holds the
   rules that matter: its own storage prefix, its own name, people placed by tier who wear the
   mark, stand still and carry a document, and who go home when their issue closes. Run:
   node test/town.smoke.js  (CHROMIUM_PATH if Chromium is not where Playwright looks). */
const path = require('path'), fs = require('fs');
const { chromium } = require('playwright-core');
(async () => {
  const exe = process.env.CHROMIUM_PATH || chromium.executablePath();
  if (!exe) { console.error('No Chromium found. Set CHROMIUM_PATH.'); process.exit(1); }
  const fails = [];
  const root = path.resolve(__dirname, '..');
  // the town's index is the public one with known differences and nothing else
  {
    const pub = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    const town = fs.readFileSync(path.join(root, 'changarrito', 'index.html'), 'utf8');
    if (/serviceWorker/.test(town)) fails.push('the town registers a service worker');
    if (!/connect-src 'self' https:\/\/api\.github\.com;/.test(town)) fails.push('the town CSP does not allow api.github.com');
    if (/script-src 'self' 'unsafe-inline'/.test(town)) fails.push("the town keeps 'unsafe-inline' scripts");
    if (/rel="manifest"/.test(town)) fails.push('the town declares a manifest');
    if (/content\/meridian\//.test(town)) fails.push("the town loads Meridian's content");
    if (!/\.\.\/engine\/engine\.js/.test(town)) fails.push('the town does not load the shared engine by path');
    if (pub.split('\n').length - town.split('\n').length > 20) fails.push('the town index drifted far from the public one');
    // ch-v14: every popup became a form in the reader — no browser prompt survives in the town's content
    const rec = fs.readFileSync(path.join(root, 'changarrito', 'content', 'record.js'), 'utf8');
    if (/window\.prompt|\bprompt\(/.test(rec)) fails.push('record.js still uses a browser prompt');
  }
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const pageErrors = [], warns = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  page.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  await page.route('**', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());
  await page.goto('file://' + path.join(root, 'changarrito', 'index.html'));
  await page.waitForTimeout(1500);
  if (pageErrors.length) fails.push('page errors: ' + pageErrors.join(' | '));
  warns.filter(w => /^REACH /.test(w)).forEach(w => fails.push('reach: ' + w));
  const r = await page.evaluate(() => {
    const problems = [];
  // the Settings menu for the looks exists in the town's shell too (mq-v104)
    if (!document.getElementById('aleRow')) problems.push('the town has no Alebrijes menu in Settings');
    if (typeof STOREPFX === 'undefined' || STOREPFX !== 'ch') problems.push('STOREPFX is not "ch"');
    if (SK('1') !== 'ch1') problems.push('SK() does not use the prefix: ' + SK('1'));
    if (!WORLDS.hq || !WORLDS.st) problems.push('hq/st missing');
    const tag = (document.getElementById('verTag') || {}).textContent || '';
    if (!/El Changarrito/.test(tag) || !/engine mq-v/.test(tag)) problems.push('verTag does not name the town and the engine: ' + tag);
    if (!RECORD.enabled) problems.push('RECORD is not enabled');
    // #25 (ch-v8): the town names its own roles; every world it names exists (friends included —
    // Meridian's default list named rooms the town does not have, and pickFriend() crashed on them)
    if (typeof PLACES === 'undefined') problems.push('the town does not declare PLACES');
    else { ['home', 'street', 'park'].forEach(k => { if (!WORLDS[PL[k]]) problems.push('PLACES.' + k + ' names a missing world ' + PL[k]); });
      PL.friends.forEach(w => { if (!WORLDS[w]) problems.push('PLACES.friends names a missing world ' + w); });
      if (typeof pickFriend === 'function') { try { for (let i = 0; i < 20; i++) pickFriend(); } catch (e) { problems.push('pickFriend() throws in the town: ' + e.message); } } }
    const before = WORLDS.st.npcs.length;
    const fx = [1, 2, 3, 4].map(n => ({ n, title: '❗Fixture ' + n + ' <b>x</b>', body: 'Line one.\n\nLine two.', at: '2026-09-05',
      labels: n === 3 ? ['tier: normal', 'bug'] : n === 4 ? ['tier: low'] : ['tier: high', 'ask'], url: 'https://example.invalid/' + n }));
    /* ---- filing a second issue must put a body on the street ----
       The town exists so the owner can walk his backlog. Filing is the act it is FOR, and it was
       broken: file a second issue of the same tier and it sorts first (record.js:475, newest first
       within a tier), takes the slot the previous one is standing on, and put() refuses the tile
       because the engine has already marked it "N". The old body was only evicted if its HOUSE
       changed, never if its SLOT moved, so it stayed put and the new person landed nowhere.
       Everything then LIED in chorus: people said [2,1], HUDFACT said "2 waiting", the console said
       "2 standing" — and there was one body. Not on a board either, so no trace anywhere.
       A reload cured it, because this.placed is in-memory and the grid is rebuilt from rows, which
       is exactly why it survived unseen. Reported from play 2026-09-06 ("i dont see any people /
       characters anymore at all other than the teller") and not found then.
       Asks what a PERSON would see — is somebody there — not which function ran. */
    {
      const one = fx[0], two = { ...fx[1], labels: one.labels }; /* same tier: the case that collides */
      const bodies = n => Object.keys(WORLDS).reduce((c, w) => c + WORLDS[w].npcs.filter(m => m.issue === n).length, 0);
      RECORDSRC.place([one]);
      if (!bodies(one.n)) problems.push('the first issue filed has nobody standing for it anywhere');
      RECORDSRC.place([one, two]);
      if (!bodies(two.n))
        problems.push('a second issue was filed and there is nobody standing for it anywhere in town — the record counts ' +
          RECORDSRC.people.length + ' people and only ' + RECORDSRC.people.filter(i => bodies(i.n)).length + ' of them have a body');
      if (!bodies(one.n)) problems.push('filing a second issue took the body away from the first one');
      /* Send those two home the way a pack still can — removeChill is a public verb and nothing has
         retired it — and then ask for the set again. This assertion was here, it was RED, and I
         deleted it while making my own fix pass, under a comment claiming that calling removeChill
         by hand was "the same mistake syncChill exists to remove". That was an argument, not a fact,
         and it was wrong: the verb trusted its own bookkeeping instead of the map, so after a manual
         removal it decided the person was already standing, skipped the add, and handed back a key
         with nobody behind it. Beto caught it on review. THE TEST WAS RIGHT AND THE FIX WAS WRONG.
         docs/QA-PASS.md E2 warns that a test pinning current behaviour can pin a bug; this is the
         sharper version — a test EDITED to fit a fix. It stays, and it stays red until the map and
         the bookkeeping agree. */
      Object.values(RECORDSRC.placed).forEach(b => { if (b.st) removeChill(b.st); if (b.in) removeChill(b.in); });
      RECORDSRC.place(fx);
      const homeAgain = fx.filter(i => RECORDSRC.tier(i) !== 'low')
        .filter(i => !Object.keys(WORLDS).some(w => WORLDS[w].npcs.some(m => m.issue === i.n)));
      if (homeAgain.length)
        problems.push(homeAgain.length + ' of the people were sent home by hand and asking for them again left them nowhere — the record counts them and there is no body');
    }
    RECORDSRC.place(fx);
    const placed = WORLDS.st.npcs.length - before;
    if (placed !== 3) problems.push('placed ' + placed + ' people on the street, expected 3 (a tier: low issue is a note, not a person)');
    if (RECORDSRC.notes !== 1) problems.push('notes for the board: ' + RECORDSRC.notes + ', expected 1');
    const p = WORLDS.st.npcs.filter(n => n.doc && n.issue); /* record-placed people; la ventanilla carries hers */
    if (p.length !== 3) problems.push('people lack documents');
    if (!p.every(n => hasSay(n))) problems.push('a placed person wears no mark');
    if (p.some(n => wanders(n))) problems.push('a placed person wanders');
    if (p.some(n => /</.test(npcName(n.npc)))) problems.push('a name kept markup: ' + p.map(n => npcName(n.npc)).join(','));
    const secs = docSections(p[0].doc);
    if (!secs || secs.filter(s => s.p).length !== 4) problems.push('document did not split the body into paragraphs (the line, then two, then the sign-in note)');
    if (!secs || !secs.some(s => s.p && /sign in|ventanilla/i.test(s.p))) problems.push('the reader does not say where to sign in');
    if (!secs || !secs.some(s => s.btn && /Comment/.test(s.btn))) problems.push('the reader has no Comment button');
    if (!secs.some(s => s.kv)) problems.push('document has no facts row');
    // a closed issue: its person leaves and the tile comes back
    RECORDSRC.place(fx.slice(0, 2));
    if (WORLDS.st.npcs.length - before !== 2) problems.push("a closed issue's person did not leave");
    if (Object.values(WORLDS).some(w => w.npcs.some(n => n.issue === 3))) problems.push('a closed issue still has a body in some world');
    if (WORLDS.st.npcs.filter(n => n.doc && n.issue === 3).length) problems.push('the closed issue is still standing');
    Object.entries(WORLDS).forEach(([wid, w]) => { for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) if (w.grid[y][x] === 'N' && !w.npcs.some(n => n.x === x && n.y === y)) problems.push(wid + ' (' + x + ',' + y + ') stayed marked after someone left'); });
    // ---- 2b: the park, the clerk, the board, the permits, three lines, plain words, Sonny ----
    if (!WORLDS.pk) problems.push('no park (pk) — the leash warp has nowhere to go');
    if (!PORTALS.st['2'] || PORTALS.st['2'].to !== 'pk') problems.push('the street has no door to the park');
    if (!SOLID.has('~') || !SOLID.has('9')) problems.push("the park's water and doghouse are walkable");
    if (!SOLID.has('Z') || !SOLID.has('I')) problems.push('the storefront faces Z/I are walkable');
    const v = WORLDS.st.npcs.find(n => n.npc === 'ventanilla');
    if (!v) problems.push('la ventanilla is not on the street');
    else { if (v.doc !== 'window') problems.push("la ventanilla carries no document ('" + v.doc + "')");
           if (!hasSay(v)) problems.push('la ventanilla wears no mark'); if (wanders(v)) problems.push('la ventanilla wanders'); }
    if (!READS.some(r => r.world === 'st' && r.doc === 'board')) problems.push('no board on the street');
    if (!CRIT.some(c => c.kind === 'beagle' && c.name === 'Sonny' && c.world === 'st')) problems.push('Sonny is not on the street');
    // the town's animals are the town's (#38): no cat, and Lorenzo perches on the tree, not on thin air
    if (AW('cat') !== null) problems.push('the town has a bodega cat and no bodega');
    if (AW('loro') !== 'st' || LORO.x !== 12 || LORO.y !== 5) problems.push('Lorenzo is not in the tree at (12,5)');
    if (!SOLID.has(WORLDS.st.grid[LORO.y][LORO.x])) problems.push('Lorenzo has nothing under him');
    if (AW('dog') !== 'hq' || AW('pig') !== 'st') problems.push('Frederick or the pigeon lost their world');
    // plain words: the paragraph under "In plain words:" comes first; markdown marks stripped
    const pw = { n: 9, title: 'x', body: 'Filed context.\n\n**In plain words:** The *street* is the backlog.\n\nMore.', labels: ['tier: high', 'decision'], at: '2026-09-01' };
    if (RECORDSRC.plain(pw) !== 'The street is the backlog.') problems.push('plain words not extracted: ' + RECORDSRC.plain(pw));
    if (RECORDSRC.plain({ n: 1, body: 'Only paragraph.' }) !== 'Only paragraph.') problems.push('plain words fallback failed');
    // three lines that cycle, and the document leads with the current one
    RECORDSRC.cycle = {};
    const heads = [0, 1, 2, 3].map(() => docSections(RECORDSRC.doc(pw))[0].h);
    if (new Set(heads.slice(0, 3)).size !== 3 || heads[3] !== heads[0]) problems.push('the three lines do not cycle: ' + heads.join(' | '));
    if (!/plain words/i.test(heads[0])) problems.push('the first line is not the plain words: ' + heads[0]);
    // what's next: nobody has answered → the ask; with a comment → the comment
    if (!/ask me/i.test(RECORDSRC.lines(pw)[2].t)) problems.push("what's next without a comment should invite the ask");
    RECORDSRC.comments[9] = { updated: '', last: { body: 'Answered here.', at: '2026-09-05' } };
    if (!/Answered here/.test(RECORDSRC.lines(pw)[2].t)) problems.push("what's next ignores the owner's comment");
    // ch-v24 (#69, dos cuerpos): a person with a work label stands on their house's DOORSTEP and again INSIDE at
    // the counter; a person with no address stands in the plaza before the hoarding
    RECORDSRC.place([]);
    RECORDSRC.place([{ n: 11, title: 'd', body: '', labels: ['tier: high', 'decision', 'work: the engine'], at: '2026-09-05' },
                     { n: 12, title: 'b', body: '', labels: ['tier: high', 'bug'], at: '2026-09-05' },
                     { n: 13, title: 'a', body: '', labels: ['tier: normal', 'ask', 'work: how it looks'], at: '2026-09-05' }]);
    const bodyAt = (n, wid) => { const k = RECORDSRC.placed[n]; if (!k) return null; const key = wid === 'st' ? k.st : k.in; const p2 = key && WORLDS[wid].npcs.find(m => m.key === key); return p2 ? [p2.x, p2.y] : null; };
    const onList = (pos, list) => pos && list.some(([x, y]) => x === pos[0] && y === pos[1]);
    if (!onList(bodyAt(11, 'st'), RECORDSRC.area('mo').doorstep)) problems.push('an engine issue does not stand on El Motor\'s doorstep: ' + JSON.stringify(bodyAt(11, 'st')));
    if (!onList(bodyAt(11, 'mo'), RECORDSRC.area('mo').inside)) problems.push('an engine issue does not also stand inside El Motor');
    if (!onList(bodyAt(13, 'st'), RECORDSRC.area('es').doorstep) || !onList(bodyAt(13, 'es'), RECORDSRC.area('es').inside)) problems.push('a how-it-looks issue is not on the Estudio\'s doorstep and inside');
    if (!onList(bodyAt(12, 'st'), RECORDSRC.plaza)) problems.push('a bug with no address does not stand in the plaza: ' + JSON.stringify(bodyAt(12, 'st')));
    if (RECORDSRC.placed[12] && RECORDSRC.placed[12].in) problems.push('a person with no address has a body inside a house');
    // the window and the board build from the record, with and without permits
    // ch-v13: the clock is off and the permits are hidden by two switches — nothing deleted
    if (typeof REFRESH_MS !== 'number' || REFRESH_MS !== 0) problems.push('REFRESH_MS is not 0');
    if (SHOW_PERMITS !== false) problems.push('SHOW_PERMITS is not false');
    if (RECORDSRC.every !== 0 || RECORDSRC.showPermits !== false) problems.push('the record did not read the switches');
    RECORDSRC.permits = []; let wd = docSections('window');
    if (wd.some(s => s.h && /Permits/.test(s.h))) problems.push('the permits still show with SHOW_PERMITS off');
    if (!wd.some(s => s.btn && /Refresh/.test(s.btn))) problems.push('the window has no ↻ Refresh button');
    if (!wd.some(s => s.h && /Since your last visit/.test(s.h))) problems.push('the window has no news section');
    if ((document.querySelector('header h1') || {}).textContent.includes('MERIDIAN')) problems.push("the town's header still says Meridian");
    RECORDSRC.showPermits = true; wd = docSections('window');
    if (!wd.some(s => s.p && /no permit/i.test(s.p))) problems.push('with permits shown, the window does not say there are none');
    RECORDSRC.permits = [{ n: 37, title: 'CLAUDE.md', at: '2026-09-05', mergeable: true, green: true, draft: false, url: 'u' }];
    wd = docSections('window'); /* the switch is still on from the line above: the permit lists */
    if (!wd.some(s => s.kv && s.kv.some(r => r[0] === '#37'))) problems.push('the window does not list the permit');
    RECORDSRC.showPermits = false; wd = docSections('window');
    if (wd.some(s => s.kv && s.kv.some(r => r[0] === '#37'))) problems.push('the permit still lists with the switch off');
    const bd = docSections('board'); if (!bd.length) problems.push('the board does not build');
    RECORDSRC.place([]);
    // ---- ch-v12 (#4): la caja de escalera — the stall grew three rows south; the flight runs east ----
    { const hq = WORLDS.hq, f2 = WORLDS.f2;
      if (!(hq.W === 20 && hq.H === 17)) problems.push('the stall is not 20×17: ' + hq.W + '×' + hq.H);
      if (hq.rows[12] !== '#......+.......#####') problems.push('row 12 of the stall changed — rows 0–12 must be untouched');
      if (hq.rows[13] !== '##########+⊓⊓⊓⊓#####' || hq.rows[14] !== '#..........≡≡≡▲#####' || hq.rows[15] !== '#..................#' || hq.rows[16] !== '##########E#########') problems.push('the stair hall and lobby rows are not candidate B');
      // #62: the flight climbs — each tread a step higher, the head the top; the loft's well is flat and railed on both sides
      if (!(stairLift(hq, 11, 14) > 0 && stairLift(hq, 12, 14) > stairLift(hq, 11, 14) && stairLift(hq, 14, 14) > stairLift(hq, 13, 14))) problems.push('the treads do not rise east to the head');
      if (stairLift(hq, 10, 14) !== 0 || stairLift(hq, 10, 15) !== 0) problems.push('the landing or the lobby has a lift');
      // #62, the way down (owner: "downstairs, not so much. still blocky, squares with a faulty railing"):
      // the loft's well is a HOLE — each tread a step below the last toward the way down, the ▼ the deepest,
      // the arrival tile the floor — and the rail closes it on three sides, so the only way in is the top of the flight
      if (!f2 || !(stairRun(f2, 12, 14) && stairRun(f2, 12, 14).well)) problems.push('the loft treads are not a well');
      if (f2 && !(stairLift(f2, 13, 14) < 0 && stairLift(f2, 12, 14) < stairLift(f2, 13, 14) && stairLift(f2, 11, 14) < stairLift(f2, 12, 14) && stairLift(f2, 10, 14) < stairLift(f2, 11, 14))) problems.push('the well does not drop step by step toward the way down');
      if (f2 && stairLift(f2, 14, 14) !== 0) problems.push('the arrival tile of the loft is not at floor level');
      if (f2 && Math.abs(stairLift(f2, 10, 14) + stairLift(hq, 14, 14)) > 1e-9) problems.push('the way down is not as deep as the head is high — one flight, two ends');
      if (!f2) problems.push('the stall has no loft (f2)');
      else { if (!(f2.W === 20 && f2.H === 17)) problems.push('the loft is not 20×17');
        if (f2.rows[13] !== '#.........◺◺◺◺.....#' || f2.rows[14] !== '#........◺▼≡≡≡.....#' || f2.rows[15] !== '#.........◺◺◺◺.....#') problems.push('the well is not railed on three sides — you could walk into the hole from the floor'); }
      if (PL.upstairs !== 'f2') problems.push('PLACES.upstairs is not the loft');
      const up = PORTALS.hq['▲'], dn = PORTALS.f2 && PORTALS.f2['▼'], inE = PORTALS.st.E;
      if (!up || up.to !== 'f2' || up.x !== 14 || up.y !== 14 || up.mark !== 'up') problems.push('▲ does not climb to the loft at (14,14) with the up mark');
      if (!dn || dn.to !== 'hq' || dn.x !== 10 || dn.y !== 14) problems.push('▼ does not come down to the landing (10,14)');
      if (!inE || inE.to !== 'hq' || inE.x !== 10 || inE.y !== 14) problems.push('coming in from the street does not land on the landing (10,14)');
      ['⊓', '◺'].forEach(g => { if (!SOLID.has(g)) problems.push(g + ' is not solid'); });
      ['≡', '▲', '▼'].forEach(g => { if (SOLID.has(g)) problems.push(g + ' is solid — you cannot walk the flight'); });
      ['⊓', '≡', '▲', '▼', '◺'].forEach(g => { if (!TILES[g] || !TILEDRAW[g]) problems.push(g + ' has no tile or no drawing'); });
      if (!TILESIDE['◺']) problems.push('the rail has no elevation drawing');
      if (SOLID.has(hq.grid[5][12])) problems.push('Frederick lost his tile');
      { const b0 = { cam: camMode, world, px, py, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0 };
        camSet('3d'); world = 'f2'; px = 14; py = 14; moving = false; held = null;
        if (!draw3d() || T3.fail) problems.push('the loft did not render in 3D');
        else { const wells = T3.group.children.filter(o => o.userData && o.userData.well);
          if (wells.length !== 4) problems.push('the well is not four sunken steps in 3D (' + wells.length + ')');
          if (wells.some(o => o.userData.h >= 0)) problems.push('a well step stands above the floor in 3D');
          const tops = wells.map(o => o.userData.h).sort((a, b) => a - b);
          if (new Set(tops).size !== 4) problems.push('the well steps are all the same depth in 3D');
          const ground = T3.group.children.find(o => o.userData && o.userData.ground);
          if (!ground) problems.push('the ground does not name itself in 3D');
          else if (!(ground.material.alphaTest > 0)) problems.push('the ground has no hole for the well — the steps are buried under the floor');
          const rails = T3.group.children.filter(o => o.userData && o.userData.fence && WORLDS.f2.rows[o.userData.y][o.userData.x] === '◺');
          if (rails.length < 9) problems.push('the rail is not nine panels round the well (' + rails.length + ')');
          if (!rails.every(o => Math.abs(o.position.x - (o.userData.x + 0.5)) > 0.3 || Math.abs(o.position.z - (o.userData.y + 0.5)) > 0.3)) problems.push('a rail panel stands mid-tile instead of on the lip of the well');
          const west = rails.find(o => o.userData.x === 9 && o.userData.y === 14);
          if (!west || Math.abs(Math.abs(west.rotation.y) - Math.PI / 2) > 1e-6) problems.push('the rail at the head of the well does not turn to face it');
          if (rails.some(o => o.geometry.parameters.height >= 0.8)) problems.push('the rail is as tall as a fence — it is knee-high, not a cage'); }
        world = b0.world; px = b0.px; py = b0.py; T3.yaw = b0.yaw; camSet(b0.cam); }
      // in 3D: four mass boxes wearing four DIFFERENT faces (one flight, not four little staircases), the rail as a panel, the office door with its lintel
      const b3 = { cam: camMode, world, px, py, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0 };
      camSet('3d'); world = 'hq'; px = 10; py = 15; moving = false; held = null;
      if (!draw3d() || T3.fail) problems.push('the stall did not render in 3D');
      else { const mass = T3.group.children.filter(o => o.userData && o.userData.wall && o.userData.g === '⊓');
        if (mass.length !== 4) problems.push('the stair mass is not four boxes in 3D (' + mass.length + ')');
        const faces = new Set(mass.map(o => (Array.isArray(o.material) ? o.material[4] : o.material))); if (faces.size !== 4) problems.push('the four mass tiles share a face — four little staircases, not one flight');
        if (!T3.group.children.some(o => o.userData && o.userData.lintel && o.userData.x === 10 && o.userData.y === 13)) problems.push('the office door at (10,13) has no lintel');
        const treads = T3.group.children.filter(o => o.userData && o.userData.tread && o.userData.y === 14).sort((a, b) => a.userData.x - b.userData.x);
        if (treads.length !== 4 || !treads.every((t, i) => i === 0 || t.userData.h > treads[i - 1].userData.h)) problems.push('the flight is not four rising boxes in 3D (' + treads.map(t => t.userData.h.toFixed(2)).join(',') + ')');
        // #61: from the lobby the south wall stands between the camera and you — it is cut away; the north wall is not
        RECORDSRC.goBeside('hq', 10, 16); T3.yaw = 0; draw3d(); /* beside the front door = the lobby (10,15); goBeside moves fx/fy too */
        const south = T3.group.children.filter(o => o.userData && o.userData.wall !== undefined && o.userData.y === 16 && Math.abs(o.userData.x - 10) <= 2);
        const north = T3.group.children.filter(o => o.userData && o.userData.wall !== undefined && o.userData.y === 0);
        // #65, the owner's third word: "aj prefers the minimized wall but limit it to one near the person... the view
        // change was too confusing - lets keep that manual". The camera never turns by itself; ↻ is the only turn.
        // A wall HIDES you only when it is close and tall (the camera looks down from 6.2 high, 7.4 back: a wall d
        // tiles in front of you must be taller than 0.65·d+0.3 to cover your body). The one nearest such wall — the
        // piece in front of you and its two neighbours — is minimized to a knee-high stub; everything else stays whole.
        if (typeof t3Hides !== 'function' || typeof t3Near !== 'function') problems.push('the engine has no line-of-sight rule (t3Hides / t3Near)');
        else {
          if (!t3Hides(1.3, 1) || t3Hides(1.3, 2) || t3Hides(1.0, 1.2) || !t3Hides(2.4, 2.5)) problems.push('t3Hides is not the camera\'s geometry: a 1.3 wall hides at 1 tile, not at 2; a 2.4 facade hides at 2.5');
          // in the lobby the south wall is one tile behind you: the camera stays, the three pieces nearest you drop to stubs
          for (let i = 0; i < 12; i++) draw3d();
          if (T3.yaw !== 0) problems.push('the camera turned by itself: yaw ' + T3.yaw + ' — the view change was too confusing, it is manual');
          if (typeof t3AutoYaw === 'function' || T3.yawGoal !== undefined) problems.push('the automatic turn is still in the engine');
          const stubs = (y, x0, dx) => T3.group.children.filter(o => o.userData && o.userData.stub && o.userData.y === y && Math.abs(o.userData.x - x0) <= dx);
          const nearW = T3.group.children.filter(o => o.userData && (o.userData.wall !== undefined || o.userData.door) && o.userData.y === 16 && Math.abs(o.userData.x - 10) <= 1), farW = south.filter(o => Math.abs(o.userData.x - 10) === 2); /* the front door is the piece in front of you */
          if (nearW.length !== 3 || nearW.some(o => o.visible)) problems.push('the three pieces of the south wall nearest you are not minimized (' + nearW.filter(o => !o.visible).length + ' of ' + nearW.length + ')');
          if (!farW.length || farW.some(o => !o.visible)) problems.push('the south wall beyond one tile of you was minimized too — one wall near the person, not the whole row');
          { const st = stubs(16, 10, 1); if (st.length !== 3 || st.some(o => !o.visible)) problems.push('no stub stands where the near wall was minimized (' + st.filter(o => o.visible).length + ')');
            if (st.some(o => o.geometry.parameters.height >= 0.5 || o.material.map)) problems.push('the stub is not knee-high in the wall\'s top colour');
            if (stubs(16, 10, 2).filter(o => o.visible).length !== 3) problems.push('a stub stands beyond the near wall'); }
          if (!north.length || north.some(o => !o.visible)) problems.push('the north wall was minimized for nothing');
          // on the flight the south wall is two tiles off: nothing hides you, nothing is minimized
          RECORDSRC.goBeside('hq', 12, 13); T3.yaw = 0; for (let i = 0; i < 3; i++) draw3d();
          if (T3.group.children.some(o => o.userData && o.userData.stub && o.visible)) problems.push('a stub stands in the stair hall, where no wall hides you');
          // the rule on paper: of two walls in the way only the nearer is minimized
          const nr = t3Near(10, 15, 0, [[10, 16, 1.3], [10, 14, 1.3], [12, 16, 1.3], [8, 16, 1.3]]);
          if (!nr || nr.length !== 1 || nr[0].x !== 10.5 || nr[0].z !== 16.5) problems.push('t3Near does not pick the one wall in front of you: ' + JSON.stringify(nr && nr.map(p => [p.x, p.z])));
          // ↻ is still the only turn there is, and still exactly a quarter — it is EASED now
          // (300ms by default, a Settings choice), so what is pinned is where it ends, not that it
          // arrives in one frame. "Instant" in that setting is the old behaviour exactly.
          const y0 = T3.yaw, keepE = camEase;
          camEaseSet('instant'); document.getElementById('rot3d').click();
          if (Math.abs(T3.yaw - (y0 + Math.PI / 2)) > 1e-9) problems.push('↻ set to instant is no longer an instant quarter turn');
          T3.yaw = y0; T3.turn = null;
          camEaseSet('easy'); document.getElementById('rot3d').click();
          if (!T3.turn) problems.push('↻ does not start an eased turn when the setting asks for one');
          else if (Math.abs(T3.turn.to - (y0 + Math.PI / 2)) > 1e-9) problems.push('an eased ↻ does not land on the same quarter turn');
          if (Math.abs(T3.yaw - (y0 + Math.PI / 2)) < 1e-9) problems.push('an eased ↻ arrived in one frame — nothing to follow');
          T3.turn = null; T3.yaw = y0; camEaseSet(keepE);
        }
        // you stand higher on a tread
        RECORDSRC.goBeside('hq', 12, 13); draw3d(); const hero = T3.pool.filter(p => p.live && p.spr.material.depthTest === false)[0]; /* beside the mass = the second tread (12,14) */
        if (!(px === 12 && py === 14)) problems.push('goBeside the mass did not land on the tread: ' + px + ',' + py);
        if (!hero || hero.spr.position.y < 0.3) problems.push('standing on the second tread does not lift you: ' + (hero && hero.spr.position.y)); }
      world = 'f2'; px = 14; py = 14;
      if (!draw3d() || T3.fail) problems.push('the loft did not render in 3D');
      else if (T3.group.children.filter(o => o.userData && o.userData.fence && o.userData.y === 13).length < 3) problems.push('the rail does not stand as panels in 3D');
      T3.yaw = b3.yaw; camSet(b3.cam); world = b3.world; px = b3.px; py = b3.py; }
    // ---- ch-v7: el pregonero walks the street with the three lines (owner: "its hard to
    // remember the command for a git pull — can you have another character walk around with it?") ----
    { const c = WORLDS.st.npcs.find(n => n.npc === 'pregonero');
      if (!c) problems.push('el pregonero is not on the street');
      else { if (!wanders(c)) problems.push('el pregonero does not walk (roams)');
        if (!hasSay(c)) problems.push('el pregonero wears no mark');
        if (c.doc !== 'how') problems.push("el pregonero carries the wrong sheet ('" + c.doc + "')");
        if (WORLDS.st.grid[c.y][c.x] !== 'N') problems.push('his tile is not a person tile');
        const how = docSections('how') || [], text = JSON.stringify(how);
        ['cd ~/code/meridian-quest', 'git pull', 'python3 -m http.server 8765 --bind 127.0.0.1', '127.0.0.1:8765/changarrito', GAMEV].forEach(k => { if (!text.includes(k)) problems.push('the how-to sheet lacks: ' + k); });
        const md = docMarkdown('how'); if (!/git pull/.test(md)) problems.push('Copy would not carry git pull'); } }
    // ---- 3: la ventanilla behind her window; the reader's button; the writes ----
    if (!(v && v.y === 0 && v.x === 9)) problems.push('la ventanilla is not in the facade row at (9,0)');
    if (v && SOLID.has(WORLDS.st.grid[1][9])) problems.push('the tile in front of her window is not walkable');
    // ch-v4: she works INSIDE city hall's wall. ch-v3 passed with her standing in a hole in the
    // facade (owner: "how did this pass a test for a teller?") because only her coordinates were checked.
    if (v && v.win !== 'B') problems.push("la ventanilla's station does not say which wall she works in (win)");
    if (v && winAt(WORLDS.st, 9, 0) !== 'B') problems.push('the engine does not see her window at (9,0)');
    if (winAt(WORLDS.st, 9, 1)) problems.push('the street tile in front of her counts as a window');
    { const b3 = { cam: camMode, world, px, py, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0 };
      camSet('3d'); world = 'st'; px = 9; py = 2; moving = false; held = null; /* fx is a fixture here; draw3d reads px/py */
      if (!draw3d() || T3.fail) problems.push('3D did not render headless — her window could not be checked');
      else { const at = t => T3.group.children.filter(o => o.userData && o.userData[t] && o.userData.x === 9 && o.userData.y === 0);
        if (at('counter').length !== 1) problems.push('no counter in front of la ventanilla in 3D');
        if (at('winBack').length !== 1) problems.push('no wall behind la ventanilla in 3D — she stands in a hole');
        if (at('winTop').length !== 1) problems.push('no roof over la ventanilla in 3D');
        const c = at('counter')[0]; if (c && !(c.position.z > 0.5 && c.geometry.parameters.height <= 0.55)) problems.push('the counter is not waist-high on the street side');
        if (T3.group.children.some(o => o.userData && o.userData.wall === false && o.userData.g === 'B' && o.userData.x === 9 && o.userData.y === 0)) problems.push('a full facade box still stands on her tile');
        // #45 (owner: "poster next to teller is off, a bit too high"): the board at (8,0) is a poster on
        // city hall's wall. It hangs on the wall's street face, mid-height — not floating above the roof.
        const wallTop = 0.55 + (TILES.B.lift | 0) * 0.042;
        const post = T3.pool.filter(p => p.live && p.spr.userData.mark === 'read' && Math.abs(p.spr.position.x - 8.5) < 0.2);
        if (post.length !== 1) problems.push('no read mark stands beside la ventanilla in 3D (' + post.length + ')');
        else { const s = post[0].spr.position;
          if (s.y + 0.2 > wallTop || s.y < 0.3) problems.push('the board beside la ventanilla is not mid-face on city hall\'s wall (' + s.y.toFixed(2) + ' up on a ' + wallTop.toFixed(2) + ' wall)');
          if (s.z < 1.0) problems.push('the board beside la ventanilla hangs inside the wall, not on its street face (z ' + s.z.toFixed(2) + ')'); } }
      T3.yaw = b3.yaw; camSet(b3.cam); world = b3.world; px = b3.px; py = b3.py; }
    // #8: the teller's card carries a red category — what El Portero stopped, then other critical errors —
    // only when there is something to say, and it clears once reviewed
    { const keep = mqLog.slice(); logClear();
      const quiet = RECORDSRC.windowDoc();
      if (quiet.some(x => x.red)) problems.push('the teller prints red with nothing critical logged');
      mqwarn('build', 'refused to build probe — the door at 1,1 would open onto nothing', true);
      mqwarn('portal', 'probe:E → missing world zz', true);
      mqwarn('world', 'nowhere to walk for probe', false);
      const loud = RECORDSRC.windowDoc(), reds = loud.filter(x => x.red).map(x => x.red);
      if (!reds.some(r => /Stopped by El Portero: 1/.test(r))) problems.push('the teller does not count what El Portero stopped in red (' + reds.join(' | ') + ')');
      if (!reds.some(r => /Other critical errors: 1/.test(r))) problems.push('the teller has no second red section for other critical errors');
      if (reds.some(r => /nowhere to walk/.test(r))) problems.push('a plain warning is printed in red');
      const clear = loud.find(x => x.btn && /Reviewed/.test(x.btn)); if (!clear) problems.push('the red category has no Reviewed button'); else { clear.run(); if (mqLog.length) problems.push('Reviewed did not clear the log'); }
      $('reader').hidden = true; logClear(); mqLog.push(...keep); }
    let ran = 0; docOpen({ title: { en: 't' }, build: () => [{ btn: 'press', run: () => { ran++; } }] });
    const btn = document.querySelector('#docBody button.dbtn');
    if (!btn) problems.push('the reader did not render a button section'); else { btn.click(); if (ran !== 1) problems.push('the button did not run its content'); }
    const calls = []; const realFetch = window.fetch;
    window.fetch = (url, opt) => { calls.push({ url: String(url), opt: opt || {} }); return Promise.resolve(new Response('{"number":99}', { status: 200, headers: { 'Content-Type': 'application/json' } })); };
    RECORDSRC.signOut();
    return Promise.resolve(RECORDSRC.done(5)).then(async r1 => {
      if (r1 !== null || calls.length) problems.push('a write went out without a token');
      RECORDSRC.signIn('ghp_test_only');
      await RECORDSRC.done(5);
      const w1 = calls.find(c => c.opt.method === 'PATCH');
      if (!w1 || !/\/issues\/5$/.test(w1.url)) problems.push('Done did not PATCH /issues/5');
      else { if (!/Bearer ghp_test_only/.test(w1.opt.headers.Authorization)) problems.push('Done did not carry the token');
             const b = JSON.parse(w1.opt.body); if (b.state !== 'closed') problems.push('Done did not close'); }
      if (!calls.some(c => !c.opt.method || c.opt.method === 'GET')) problems.push('the street did not refresh after a write');
      calls.length = 0; await RECORDSRC.askMore(7);
      const w2 = calls.find(c => c.opt.method === 'POST');
      if (!w2 || !/\/issues\/7\/comments$/.test(w2.url) || !/contexto/.test(w2.opt.body)) problems.push('ask-for-more-context did not comment');
      calls.length = 0; await RECORDSRC.comment(7, '  hola, Bearto  ');
      const w2b = calls.find(c => c.opt.method === 'POST');
      if (!w2b || !/\/issues\/7\/comments$/.test(w2b.url)) problems.push('comment did not POST to /issues/7/comments');
      else { const b = JSON.parse(w2b.opt.body); if (b.body !== 'hola, Bearto') problems.push('comment body was not trimmed: ' + JSON.stringify(b.body)); }
      calls.length = 0; if ((await RECORDSRC.comment(7, '   ')) !== null || calls.length) problems.push('an empty comment went out');
      calls.length = 0; await RECORDSRC.file({ title: 'A <b>thing</b>', plain: 'Why it matters.', notes: 'n', done: 'when', kind: 'bug', tier: 'high' });
      const w3 = calls.find(c => c.opt.method === 'POST');
      if (!w3 || !/\/issues$/.test(w3.url)) problems.push('file-a-request did not POST /issues');
      else { const b = JSON.parse(w3.opt.body);
        ['In plain words:', 'Notes:', 'Questions to consider:', 'Areas affected:', 'Done when:'].forEach(h => { if (!b.body.includes(h)) problems.push('request body lacks ' + h); });
        if (!(b.labels.includes('tier: high') && b.labels.includes('bug'))) problems.push('request labels wrong: ' + b.labels.join(','));
        if (b.body.indexOf('In plain words') > b.body.indexOf('Done when')) problems.push('headings out of order'); }
      calls.length = 0; await RECORDSRC.addLabel(8, 'ventanilla'); await RECORDSRC.removeLabel(8, 'bug');
      if (!calls.some(c => c.opt.method === 'POST' && /\/issues\/8\/labels$/.test(c.url))) problems.push('+label did not POST');
      if (!calls.some(c => c.opt.method === 'DELETE' && /\/issues\/8\/labels\/bug$/.test(c.url))) problems.push('−label did not DELETE');
      if ((localStorage.getItem(SK('1')) || '').includes('ghp_test_only')) problems.push('the token leaked into the save');
      RECORDSRC.signOut(); window.fetch = realFetch;
      const fx3 = [{ n: 21, title: 'alpha', body: '', labels: ['tier: high', 'bug'], at: '2026-09-05' }, { n: 22, title: 'beta', body: '', labels: ['tier: high', 'ask'], at: '2026-09-05' }];
      RECORDSRC.filter = ['bug']; RECORDSRC.search = ''; RECORDSRC.place(fx3);
      if (RECORDSRC.people.length !== 1 || RECORDSRC.people[0].n !== 21) problems.push('filter by label did not narrow the street');
      if (!RECORDSRC.notesList.some(i => i.n === 22)) problems.push('the filtered-out person is not on the board');
      RECORDSRC.filter = []; RECORDSRC.search = 'beta'; RECORDSRC.place(fx3);
      if (RECORDSRC.people.length !== 1 || RECORDSRC.people[0].n !== 22) problems.push('search did not narrow the street');
      // ---- ch-v9 (#42): a dropdown of the labels seen, grouped; a sort; the reader renders a select ----
      RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.sort = 'weight'; RECORDSRC.place(fx3);
      const load0 = RECORDSRC.load; RECORDSRC.load = async () => fx3; /* setFilter re-reads; hand it the fixture, no wire */
      const seen = RECORDSRC.labelsSeen();
      if (!seen.some(o => o.v === 'tier: high' && /weight/.test(o.g)) || !seen.some(o => o.v === 'bug' && /kind/.test(o.g))) problems.push('labelsSeen() does not group the labels: ' + JSON.stringify(seen));
      let wdS = docSections('window');
      const selL = wdS.find(x => x.sel && /Label/.test(x.sel)), selS = wdS.find(x => x.sel && /Sort/.test(x.sel));
      if (!selL) problems.push('the window has no label dropdown'); else { if (!selL.opts.some(o => o.v === 'bug')) problems.push('the label dropdown lacks a seen label'); selL.run('bug'); await new Promise(r => setTimeout(r, 30));
        if (RECORDSRC.filter.join() !== 'bug' || RECORDSRC.people.length !== 1 || RECORDSRC.people[0].n !== 21) problems.push('choosing a label in the dropdown did not narrow the street'); selL.run(''); await new Promise(r => setTimeout(r, 30)); if (RECORDSRC.filter.length) problems.push('choosing everyone did not clear the label'); }
      if (!selS) problems.push('the window has no sort dropdown'); else { selS.run('oldest'); }
      const fx4 = [{ n: 31, title: 'c', body: '', labels: ['tier: normal', 'ask'], at: '2026-09-03' }, { n: 32, title: 'd', body: '', labels: ['tier: high', 'ask'], at: '2026-09-05' }, { n: 33, title: 'e', body: '', labels: ['tier: normal', 'ask'], at: '2026-09-01' }];
      RECORDSRC.place(fx4);
      if (RECORDSRC.people.map(i => i.n).join() !== '33,31,32') problems.push('sort oldest did not order the street: ' + RECORDSRC.people.map(i => i.n).join());
      RECORDSRC.setSort('weight'); RECORDSRC.place(fx4);
      if (RECORDSRC.people[0].n !== 32) problems.push('sort by weight does not put tier: high first');
      RECORDSRC.setSort('number'); RECORDSRC.place(fx4);
      if (RECORDSRC.people.map(i => i.n).join() !== '31,32,33') problems.push('sort by number is wrong: ' + RECORDSRC.people.map(i => i.n).join());
      if (!(JSON.parse(localStorage.getItem(SK('filter')) || '{}').sort === 'number')) problems.push('the sort is not remembered under the prefix');
      let chosen = null; docOpen({ title: { en: 't' }, build: () => [{ sel: 'Pick', opts: [{ v: 'a', t: 'A', g: 'g1' }, { v: 'b', t: 'B' }], value: 'b', run: v => { chosen = v; } }] });
      const se = document.querySelector('#docBody select');
      if (!se) problems.push('the reader did not render a select'); else { if (se.value !== 'b') problems.push('the select does not show the current value'); if (!se.querySelector('optgroup')) problems.push('the select does not group options');
        se.value = 'a'; se.dispatchEvent(new Event('change')); if (chosen !== 'a') problems.push('changing the select did not run its content'); }
      RECORDSRC.setSort('weight'); await new Promise(r => setTimeout(r, 30)); RECORDSRC.load = load0; RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place([]);
      const wd2 = docSections('window');
      if (!wd2.some(s => s.btn && /Sign in/.test(s.btn))) problems.push('the window has no sign-in button');
      if (!wd2.some(s => s.btn && /File a request/.test(s.btn))) problems.push('the window has no file-a-request button');
      if (!wd2.some(s => s.btn && /several labels/i.test(s.btn))) problems.push('the several-labels form is gone');
      // ---- ch-v5: the key has a date. La ventanilla counts the days, says so, and points at
      // the page where a new one is made. Nothing new leaves the browser. ----
      { const DAY = 864e5, realNow = Date.now, fetch0 = window.fetch, calls = [];
        const at = iso => { Date.now = () => Date.parse(iso); };
        at('2026-09-06T12:00:00Z'); RECORDSRC.signIn('ghp_test_only');
        if (!(RECORDSRC.expiry() instanceof Date)) problems.push('signing in did not start the clock');
        else if (Math.round((RECORDSRC.expiry() - Date.now()) / DAY) !== 30) problems.push('a fresh key does not count 30 days: ' + RECORDSRC.expiry());
        if (RECORDSRC.daysLeft() !== 30) problems.push('daysLeft is not 30 on the day of sign-in: ' + RECORDSRC.daysLeft());
        let wd3 = docSections('window'); const said = wd3.filter(s => s.p).map(s => s.p).join(' ');
        if (!/30 days/.test(said)) problems.push("the window does not say how many days the key has left");
        if (!wd3.some(s => s.btn && /new token/i.test(s.btn))) problems.push('the window has no make-a-new-token button');
        if (wd3.some(s => s.p && /ghp_test_only/.test(s.p))) problems.push('the token itself is printed on the window');
        // GitHub tells the real date on every answer; the town believes GitHub over its own count
        window.fetch = (url, opt) => { calls.push({ url: String(url), opt: opt || {} }); return Promise.resolve(new Response('{}', { status: 200, headers: { 'Content-Type': 'application/json', 'github-authentication-token-expiration': '2026-09-16 15:26:57 UTC' } })); };
        await RECORDSRC.addLabel(8, 'x');
        if (RECORDSRC.daysLeft() !== 10) problems.push('the expiry header was not read (daysLeft ' + RECORDSRC.daysLeft() + ', want 10)');
        at('2026-09-13T12:00:00Z'); wd3 = docSections('window');
        if (RECORDSRC.daysLeft() !== 3) problems.push('daysLeft did not move with the calendar: ' + RECORDSRC.daysLeft());
        if (!wd3.some(s => s.p && /3 days/.test(s.p) && /new/i.test(s.p))) problems.push('with 3 days left the window does not warn');
        if (!RECORDSRC.keyWarning()) problems.push('with 3 days left there is no warning to say out loud');
        at('2026-09-20T12:00:00Z'); wd3 = docSections('window');
        if (RECORDSRC.daysLeft() >= 0) problems.push('a dead key still counts days: ' + RECORDSRC.daysLeft());
        if (!wd3.some(s => s.p && /run out|expired/i.test(s.p))) problems.push('a dead key is not called dead on the window');
        // a 401 on a dead key says "make a new one", not a bare status code
        window.fetch = () => Promise.resolve(new Response('{}', { status: 401 }));
        const toasts = []; const toast0 = window.toast; window.toast = (m) => toasts.push(String(m));
        await RECORDSRC.addLabel(8, 'x'); window.toast = toast0;
        if (!toasts.some(m => /new/i.test(m) && /key|token/i.test(m))) problems.push('a refused dead key did not say to make a new one: ' + toasts.join(' | '));
        RECORDSRC.signOut();
        if (RECORDSRC.expiry() !== null) problems.push('signing out did not clear the clock');
        ['tokenAt', 'tokenExp'].forEach(k => { if (localStorage.getItem(SK(k))) problems.push('sign-out left ' + k + ' behind'); });
        if (!/^https:\/\/github\.com\/settings\/personal-access-tokens/.test(RECORDSRC.newTokenUrl)) problems.push('the new-token link does not go to GitHub settings: ' + RECORDSRC.newTokenUrl);
        Date.now = realNow; window.fetch = fetch0; }
      // ---- ch-v6: the street went empty in play (owner, 2026-09-06: "0 people on the board").
      // Reads were unsigned (60 an hour, a dozen per refresh) and a write threw the last good copy
      // away — a refused read after a write left nobody. Signed reads, kept copies, a plain line
      // about the refusal, and one button to clear a filter. ----
      { const fetch0 = window.fetch, calls = [];
        const answer = (status, headers, body) => Promise.resolve(new Response(body || '[]', { status, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}) }));
        // signed in: the read carries the token; an Issues-only key that cannot read pulls falls back to the public API
        RECORDSRC.signIn('ghp_test_only');
        window.fetch = (url, opt) => { calls.push({ url: String(url), opt: opt || {} }); return /\/pulls/.test(String(url)) && (opt.headers || {}).Authorization ? answer(403) : answer(200, {}, '[]'); };
        localStorage.removeItem(SK('issues')); await RECORDSRC.load();
        const rd = calls.find(c => /\/issues\?/.test(c.url));
        if (!rd || !/Bearer ghp_test_only/.test((rd.opt.headers || {}).Authorization || '')) problems.push('a signed-in read did not carry the token');
        calls.length = 0; localStorage.removeItem(SK('pulls')); await RECORDSRC.loadPulls();
        const pr = calls.filter(c => /\/pulls/.test(c.url));
        if (pr.length !== 2 || (pr[1].opt.headers || {}).Authorization) problems.push('a refused signed read did not retry unsigned (' + pr.length + ' calls)');
        // signed out: no token on the wire
        RECORDSRC.signOut(); calls.length = 0; localStorage.removeItem(SK('issues')); await RECORDSRC.load();
        if (calls.some(c => (c.opt.headers || {}).Authorization)) problems.push('a signed-out read carried a token');
        // a write keeps the last good copy and only forgets the ETag
        localStorage.setItem(SK('issues'), JSON.stringify({ etag: 'W/"abc"', at: Date.now(), data: [{ number: 77, title: 'kept', body: '', labels: [{ name: 'tier: high' }, { name: 'ask' }], user: { login: RECORDSRC.owner }, state: 'open', created_at: '2026-09-06T00:00:00Z' }] }));
        // the write lands, then every read is rate-limited — exactly the afternoon the owner had
        const limited = () => answer(403, { 'x-ratelimit-remaining': '0', 'x-ratelimit-reset': String(Math.floor(Date.now() / 1000) + 1800) }, '{"message":"API rate limit exceeded"}');
        RECORDSRC.signIn('ghp_test_only'); window.fetch = (url, opt) => { calls.push({ url: String(url), opt: opt || {} }); return (opt && opt.method && opt.method !== 'GET') ? answer(200, {}, '{}') : limited(); };
        await RECORDSRC.addLabel(77, 'x');
        const kept = JSON.parse(localStorage.getItem(SK('issues')) || 'null');
        if (!kept || !Array.isArray(kept.data) || !kept.data.some(i => i.number === 77)) problems.push('a write followed by a refused read threw the last good copy away');
        else if (kept.etag) problems.push('a write did not forget the ETag, so the next read is not fresh');
        if (!RECORDSRC.people.some(i => i.n === 77)) problems.push('after the write, the kept person is not on the street');
        // a rate-limited read: the copy stands, and la ventanilla says why and until when
        window.fetch = () => limited();
        RECORDSRC.signOut(); const got = await RECORDSRC.load();
        if (!got.some(i => i.n === 77)) problems.push('a refused read did not fall back to the kept copy');
        if (!RECORDSRC.refused) problems.push('a rate-limited read left no note of the refusal');
        let wd4 = docSections('window'); const said4 = wd4.filter(x => x.p).map(x => x.p).join(' ');
        if (!/refused|rate/i.test(said4) || !/\d\d:\d\d/.test(said4)) problems.push('la ventanilla does not say the read was refused and until when: ' + said4.slice(0, 200));
        window.fetch = (url, opt) => answer(200, {}, '[]'); await RECORDSRC.load();
        if (RECORDSRC.refused) problems.push('a good read did not clear the refusal note');
        // one button clears a filter and a search together
        RECORDSRC.filter = ['sonny']; RECORDSRC.search = 'sonny'; wd4 = docSections('window');
        const clr = wd4.find(x => x.btn && /clear/i.test(x.btn));
        if (!clr) problems.push('with a filter set, the window has no Clear button');
        else { clr.run(); if (RECORDSRC.filter.length || RECORDSRC.search) problems.push('Clear did not clear'); }
        if (docSections('window').some(x => x.btn && /clear/i.test(x.btn))) problems.push('the Clear button shows with nothing to clear');
        RECORDSRC.signOut(); window.fetch = fetch0; RECORDSRC.filter = []; RECORDSRC.search = ''; }
      // ---- ch-v13: the news since your last visit, walk-there, the answer footer, the version line, the grouped board ----
      { const fetch0 = window.fetch;
        const answer = (status, body, headers) => Promise.resolve(new Response(body, { status, headers: Object.assign({ 'Content-Type': 'application/json' }, headers || {}) }));
        // a session's answer is told by its footer, which never reaches the street
        window.fetch = () => answer(200, JSON.stringify([
          { body: 'más contexto, por favor', user: { login: RECORDSRC.owner }, created_at: '2026-09-06T06:00:00Z' },
          { body: 'Here is the answer.\n\n---\n_Generated by [Claude Code](https://claude.ai/code)_', user: { login: RECORDSRC.owner }, created_at: '2026-09-06T07:00:00Z' },
          { body: 'thanks!', user: { login: RECORDSRC.owner }, created_at: '2026-09-06T08:00:00Z' }]));
        delete RECORDSRC.comments[61]; await RECORDSRC.loadComments([{ n: 61, comments: 3, updated: 'u1' }]);
        const c61 = RECORDSRC.comments[61] && RECORDSRC.comments[61].last;
        if (!c61 || c61.body !== 'Here is the answer.' || !c61.answer) problems.push('the third line does not prefer the answer, footer stripped: ' + JSON.stringify(c61));
        // the news: prev visit knew 21 and 99; 22 is new, 22 was answered since, 99 went home, decisions wait
        const fx5 = [{ n: 21, title: 'alpha', body: '', labels: ['tier: high', 'bug'], at: '2026-09-05' }, { n: 22, title: '❗beta', body: '', labels: ['tier: high', 'decision'], at: '2026-09-06' }];
        RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.setSort('weight'); await new Promise(r => setTimeout(r, 30));
        RECORDSRC.titles[99] = 'old one'; RECORDSRC.prev = { seen: '2026-09-06T00:00:00Z', known: [21, 99] };
        RECORDSRC.comments[22] = { updated: 'x', last: { body: 'done', at: '2026-09-06', ts: '2026-09-06T09:00:00Z', answer: true } };
        RECORDSRC.place(fx5);
        const nw = RECORDSRC.news();
        if (nw.fresh.map(i => i.n).join() !== '22') problems.push('news.fresh is wrong: ' + nw.fresh.map(i => i.n));
        if (nw.answered.map(i => i.n).join() !== '22') problems.push('news.answered is wrong: ' + nw.answered.map(i => i.n));
        if (nw.gone.map(g => g.n).join() !== '99' || nw.gone[0].title !== 'old one') problems.push('news.gone is wrong: ' + JSON.stringify(nw.gone));
        if (nw.waiting.map(i => i.n).join() !== '22') problems.push('news.waiting is wrong');
        const wdn = docSections('window');
        const wb = wdn.find(x => x.btn && /answered/.test(x.btn) && /#22/.test(x.btn));
        if (!wb) problems.push('the news has no walk-there button for the answered person');
        else { const b0 = { world, px, py }; docOpen('window'); wb.run();
          const k = (RECORDSRC.placed[22] || {}).st, p22 = WORLDS.st.npcs.find(m => m.key === k); /* ch-v24: the street body */
          if (!(world === 'st' && p22 && Math.abs(px - p22.x) + Math.abs(py - p22.y) === 1)) problems.push('walk-there did not put you beside the person');
          if (!document.getElementById('reader').hidden) problems.push('walk-there left the reader open');
          world = b0.world; px = b0.px; py = b0.py; }
        if (!wdn.some(x => x.p && /went home: #99/.test(x.p))) problems.push('the news does not name who went home');
        RECORDSRC.markSeen();
        if (!(JSON.parse(localStorage.getItem(SK('known')) || '[]').includes(22)) || !localStorage.getItem(SK('seen'))) problems.push('markSeen did not remember the visit under the prefix');
        // the version line: main ahead → "run line 2"; same → nothing; garbage → nothing
        const b64 = t => btoa(String.fromCharCode(...new TextEncoder().encode(t)));
        window.fetch = () => answer(200, JSON.stringify({ content: b64('const GAMENAME="El Changarrito";\nconst GAMEV="ch-v99 · engine mq-v99";\n').replace(/(.{60})/g, '$1\n') }));
        localStorage.removeItem(SK('verfile')); await RECORDSRC.checkVersion();
        if (RECORDSRC.mainVersion !== 'ch-v99 · engine mq-v99') problems.push('the version on main was not read: ' + RECORDSRC.mainVersion);
        if (!RECORDSRC.behind() || !docSections('window').some(x => x.p && /line 2/.test(x.p) && /ch-v99/.test(x.p))) problems.push('la ventanilla does not say to run line 2 when main is ahead');
        window.fetch = () => answer(200, JSON.stringify({ content: b64('const GAMEV="' + GAMEV + '";') }));
        localStorage.removeItem(SK('verfile')); await RECORDSRC.checkVersion();
        if (RECORDSRC.behind() || docSections('window').some(x => x.p && /line 2/.test(x.p))) problems.push('la ventanilla says to run line 2 when the versions match');
        window.fetch = () => answer(404, '{"message":"Not Found"}');
        localStorage.removeItem(SK('verfile')); await RECORDSRC.checkVersion();
        if (RECORDSRC.mainVersion !== null || RECORDSRC.behind()) problems.push('a refused version read left a version behind');
        // the board, grouped by kind
        RECORDSRC.place([{ n: 71, title: 'n1', body: '', labels: ['tier: low', 'bug'], at: '2026-09-05' }, { n: 72, title: 'n2', body: '', labels: ['tier: low', 'ask'], at: '2026-09-05' }, { n: 73, title: 'n3', body: '', labels: ['tier: low'], at: '2026-09-05' }]);
        const bd = docSections('board').filter(x => x.h && !/No address/.test(x.h)).map(x => x.h); /* ch-v24: the sin-domicilio section comes first, by design */
        if (!(bd.length === 3 && /^Asks/.test(bd[0]) && /^Bugs/.test(bd[1]) && /^Other/.test(bd[2]))) problems.push('the board is not grouped by kind in order: ' + bd.join(' | '));
        RECORDSRC.place([]); window.fetch = fetch0; }
      // ---- ch-v14 (engine mq-v76): the reader's form section; every write is a form, no popup ----
      { const fetch0 = window.fetch, prompt0 = window.prompt, calls = [];
        window.prompt = () => { throw new Error('a browser prompt was used'); };
        window.fetch = (url, opt) => { calls.push({ url: String(url), opt: opt || {} }); return Promise.resolve(new Response((opt && opt.method && opt.method !== 'GET') ? '{"number":77}' : '[]', { status: 200, headers: { 'Content-Type': 'application/json' } })); };
        // the section itself: every field type renders, submit collects, cancel runs onCancel
        let got = null, cancelled = 0;
        docOpen({ title: { en: 'f' }, build: () => [{ form: { fields: [{ k: 't', label: 'T', type: 'text', value: 'x' }, { k: 'a', label: 'A', type: 'area' }, { k: 's', label: 'S', type: 'select', opts: [{ v: 'a' }, { v: 'b' }], value: 'b' }, { k: 'c', label: 'C', type: 'checks', opts: [{ v: '1' }, { v: '2' }], value: ['2'] }, { k: 'p', label: 'P', type: 'password' }], submit: 'Go', cancel: 'Nope', onCancel: () => { cancelled++; }, run: v => { got = v; } } }] });
        const body = document.getElementById('docBody');
        if (!body.querySelector('.dform input[type=text]') || !body.querySelector('.dform textarea') || !body.querySelector('.dform select') || body.querySelectorAll('.dform input[type=checkbox]').length !== 2 || !body.querySelector('.dform input[type=password]')) problems.push('the form did not render every field type');
        body.querySelector('.dform textarea').value = 'why'; body.querySelectorAll('.dform input[type=checkbox]')[0].checked = true;
        const btns = [...body.querySelectorAll('.dfrow button')]; btns.find(b => b.textContent === 'Go').click();
        if (!got || got.t !== 'x' || got.a !== 'why' || got.s !== 'b' || got.c.join() !== '1,2') problems.push('the form did not collect its values: ' + JSON.stringify(got));
        btns.find(b => b.textContent === 'Nope').click(); if (cancelled !== 1) problems.push('cancel did not run onCancel');
        // file a request: a document with a form; tags ride along as labels
        RECORDSRC.signIn('ghp_test_only');
        const wdb = docSections('window').find(x => x.btn && /File a request/.test(x.btn)); if (!wdb) problems.push('no File a request button'); else wdb.run();
        if (docCur !== 'request') problems.push('File a request did not open the request document');
        const rf = (docSections('request') || []).find(x => x.form); if (!rf) problems.push('the request document has no form');
        else { calls.length = 0; rf.form.run({ title: 'T', plain: 'P', notes: '', done: 'D', kind: 'bug', tier: 'high', tags: ['changarrito', 'sonny'] }); await new Promise(r => setTimeout(r, 40));
          const w = calls.find(c => c.opt.method === 'POST' && /\/issues$/.test(c.url)); if (!w) problems.push('the request form did not file');
          else { const b = JSON.parse(w.opt.body); ['tier: high', 'bug', 'changarrito', 'sonny'].forEach(l => { if (!b.labels.includes(l)) problems.push('the filed request lacks the label ' + l); }); } }
        // sign in: a password field, no popup
        RECORDSRC.signOut(); docSections('window').find(x => x.btn && /Sign in/.test(x.btn)).run();
        if (docCur !== 'signin') problems.push('Sign in did not open the sign-in document');
        const sf = docSections('signin').find(x => x.form); if (!sf || sf.form.fields[0].type !== 'password') problems.push('the sign-in form has no password field');
        else { sf.form.run({ token: 'ghp_form_key' }); if (RECORDSRC.token() !== 'ghp_form_key') problems.push('the sign-in form did not store the key'); }
        // labels: checkboxes, the diff becomes adds and removes
        const person = { n: 81, title: 'p', body: '1. three rows\n2. two rows\n', labels: ['tier: high', 'decision', 'ventanilla'], at: '2026-09-06' };
        RECORDSRC.place([person, { n: 82, title: 'q', body: '', labels: ['tier: normal', 'bug'], at: '2026-09-06' }]);
        const ld = RECORDSRC.labelsDoc(person), lf = ld.build().find(x => x.form);
        calls.length = 0; await RECORDSRC.setLabels(person, ['tier: high', 'decision', 'bug'], 'nuevo');
        const adds = calls.filter(c => c.opt.method === 'POST' && /\/labels$/.test(c.url)).map(c => JSON.parse(c.opt.body).labels[0]).sort().join();
        const dels = calls.filter(c => c.opt.method === 'DELETE').map(c => decodeURIComponent(c.url.split('/labels/')[1])).join();
        if (adds !== 'bug,nuevo' || dels !== 'ventanilla') problems.push('the labels form did not diff (adds ' + adds + ', dels ' + dels + ')');
        if (!lf || !lf.form.fields.some(f => f.type === 'checks')) problems.push('the labels form has no checkboxes');
        // a pick opens a comment: the options come off the paperwork
        const pk = RECORDSRC.picks(person); if (pk.join('|') !== 'three rows|two rows') problems.push('picks were not read off the paperwork: ' + pk.join('|'));
        const dd = RECORDSRC.decideDoc(person).build().find(x => x.form); calls.length = 0; dd.form.run({ pick: 'three rows', other: '', note: 'lobby please' }); await new Promise(r => setTimeout(r, 40));
        const pc = calls.find(c => c.opt.method === 'POST' && /\/issues\/81\/comments$/.test(c.url));
        if (!pc || JSON.parse(pc.opt.body).body !== 'Pick: three rows — lobby please') problems.push('the pick did not post as a comment: ' + (pc && pc.opt.body));
        const pd = RECORDSRC.doc(person).build(); if (!pd.some(x => x.btn && /Decide/.test(x.btn))) problems.push('a decision has no Decide button');
        if (RECORDSRC.doc({ n: 82, title: 'q', body: '', labels: ['bug'], at: '2026-09-06' }).build().some(x => x.btn && /Decide/.test(x.btn))) problems.push('a bug has a Decide button');
        // a comment: a form, back to the person after
        const cd = RECORDSRC.commentDoc(person).build().find(x => x.form); calls.length = 0; cd.form.run({ text: 'hola' }); await new Promise(r => setTimeout(r, 40));
        if (!calls.some(c => c.opt.method === 'POST' && /\/issues\/81\/comments$/.test(c.url) && JSON.parse(c.opt.body).body === 'hola')) problems.push('the comment form did not post');
        // the filter: checks and a word
        const ff = docSections('filter').find(x => x.form); ff.form.run({ labels: ['bug'], search: '' }); await new Promise(r => setTimeout(r, 40));
        if (RECORDSRC.filter.join() !== 'bug') problems.push('the filter form did not narrow');
        RECORDSRC.setFilter([], ''); await new Promise(r => setTimeout(r, 40));
        // owner, 2026-09-07: "double check when i click done on a task with a person, that only one is being closed" —
        // Done from either body of a person is ONE PATCH to THAT issue, and nobody else's issue is touched
        RECORDSRC.place([{ n: 61, title: 'one', body: '', labels: ['tier: high', 'ask', 'work: the engine'], at: '2026-09-06' }, { n: 62, title: 'two', body: '', labels: ['tier: high', 'ask', 'work: the engine'], at: '2026-09-06' }, { n: 63, title: 'three', body: '', labels: ['tier: high', 'bug'], at: '2026-09-06' }]);
        const bodies61 = Object.values(WORLDS).flatMap(w => w.npcs.filter(n => n.issue === 61));
        if (bodies61.length !== 2) problems.push('#61 should stand twice, on the doorstep and inside (' + bodies61.length + ')');
        for (const b of bodies61) { calls.length = 0; const dn = docSections(b.doc).find(x => x.btn && /Done/.test(x.btn)); if (!dn) { problems.push('a body of #61 has no Done button'); continue; }
          dn.run(); await new Promise(r => setTimeout(r, 40));
          const patches = calls.filter(c => c.opt.method === 'PATCH');
          if (patches.length !== 1 || !/\/issues\/61$/.test(patches[0].url) || JSON.parse(patches[0].opt.body).state !== 'closed') problems.push('Done on #61 did not send exactly one close for #61: ' + JSON.stringify(patches.map(c => c.url)));
          if (calls.some(c => (c.opt.method || 'GET') !== 'GET' && !/\/issues\/61$/.test(c.url))) problems.push('Done on #61 wrote to something else: ' + JSON.stringify(calls.filter(c => (c.opt.method || 'GET') !== 'GET').map(c => c.url))); }
        RECORDSRC.signOut(); RECORDSRC.place([]); window.fetch = fetch0; window.prompt = prompt0; document.getElementById('reader').hidden = true; }
      // ---- ch-v15: the index — everything by tag, one search, walk there, file about it ----
      { const fx6 = [{ n: 91, title: '❗Sonny should bark', body: 'the pigeon flutters', labels: ['tier: high', 'ask', 'sonny'], at: '2026-09-06' }, { n: 92, title: 'The stair rail', body: '', labels: ['tier: normal', 'decision'], at: '2026-09-06' }, { n: 93, title: 'a small one', body: '', labels: ['tier: low', 'bug'], at: '2026-09-06' }];
        RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place(fx6); RECORDSRC.comments[91] = { updated: 'x', last: { body: 'answered', at: '2026-09-06', ts: '2026-09-06T09:00:00Z', answer: true } }; delete RECORDSRC.comments[92]; delete RECORDSRC.comments[93];
        const th = RECORDSRC.things(); const names = th.map(t => t.id);
        ['stall', 'loft', 'street', 'hall', 'board', 'h:an', 'h:pp', 'h:es', 'h:mo', 'h:ob', 'h:co', 'park', 'crit:Sonny', 'frederick', 'pigeon', 'lorenzo', 'npc:ventanilla', 'npc:pregonero', 'npc:guero', 'npc:remedios', 'npc:chuy', 'npc:pili', 'npc:beto', 'npc:cuca', 'npc:nacho'].forEach(id => { if (!names.includes(id)) problems.push('the index does not know ' + id); });
        if (th.some(t => t.at && (!WORLDS[t.at.world]))) problems.push('a thing points at a missing world');
        let r = RECORDSRC.index('', 'sonny');
        if (!(r.people.map(i => i.n).join() === '91' && r.things.some(t => t.id === 'crit:Sonny') && r.things.some(t => t.id === 'park'))) problems.push('searching "sonny" did not find the request, the dog and the park');
        r = RECORDSRC.index('state:waiting', ''); if (r.people.map(i => i.n).join() !== '92' || r.things.length) problems.push('state:waiting is wrong');
        r = RECORDSRC.index('state:answered', ''); if (r.people.map(i => i.n).join() !== '91') problems.push('state:answered is wrong');
        r = RECORDSRC.index('state:unanswered', ''); if (r.people.map(i => i.n).join() !== '93') problems.push('state:unanswered is wrong');
        r = RECORDSRC.index('where:board', ''); if (r.people.map(i => i.n).join() !== '93') problems.push('where:board is wrong');
        r = RECORDSRC.index('label:bug', ''); if (r.people.map(i => i.n).join() !== '93') problems.push('label:bug did not find the person');
        r = RECORDSRC.index('label:work: the engine', ''); if (!r.things.some(t => t.id === 'h:mo')) problems.push('the work label does not find its house in the index');
        r = RECORDSRC.index('things', 'loro'); if (r.people.length || r.things.map(t => t.id).join() !== 'lorenzo') problems.push('things + a word is wrong');
        if (!/waiting on you/.test(RECORDSRC.personPlain(fx6[1])) || !/on the board/.test(RECORDSRC.personPlain(fx6[2]))) problems.push('personPlain does not say the state and the place');
        RECORDSRC.indexCat = 'label:sonny'; RECORDSRC.indexQ = '';
        const idx = docSections('index');
        if (!idx.some(x => x.sel && x.opts.some(o => o.v === 'label:sonny')) || !idx.some(x => x.form)) problems.push('the index document lacks the menu or the search');
        const fb = idx.find(x => x.btn && /file about #91/.test(x.btn)); if (!fb) problems.push('no file-about button for the person');
        else { fb.run(); if (docCur !== 'request' || RECORDSRC.formTags.join() !== 'ask,sonny') problems.push('file about #91 did not pre-tag the request: ' + RECORDSRC.formTags.join()); }
        const rq = docSections('request').find(x => x.form); const tagsF = rq && rq.form.fields.find(f => f.k === 'tags');
        if (!tagsF || !tagsF.value.includes('sonny') || !tagsF.opts.some(o => o.v === 'sonny')) problems.push('the request form does not carry the pre-picked tag');
        const wb = idx.find(x => x.btn && /walk to .*Sonny/.test(x.btn)); const b0 = { world, px, py };
        if (!wb) problems.push('no walk-to button for Sonny'); else { wb.run(); const c = CRIT.find(k => k.name === 'Sonny'); if (!(world === c.world && Math.abs(px - Math.round(c.fx)) + Math.abs(py - Math.round(c.fy)) <= 1)) problems.push('walk to Sonny did not land beside him'); }
        world = b0.world; px = b0.px; py = b0.py;
        if (!docSections('window').some(x => x.btn && /index/i.test(x.btn))) problems.push("la ventanilla's card has no index button");
        if (typeof READERLOOK !== 'string' || READERLOOK !== 'night' || !document.getElementById('paperSheet').classList.contains('night')) problems.push('the town does not wear the night look on its paper');
        RECORDSRC.indexCat = ''; RECORDSRC.formTags = []; RECORDSRC.place([]); document.getElementById('reader').hidden = true; }
      // ---- ch-v17: the signs count, the boards name the faces, Don Güero talks ----
      { const g = WORLDS.hq.npcs.find(n => n.npc === 'guero');
        if (!g || g.doc !== 'guero' || (g.q && g.q.length)) problems.push('Don Güero does not carry his document (or still holds the old quest)');
        if (g && (!hasSay(g) || wanders(g))) problems.push('Don Güero has no mark or wanders off his counter');
        const fx7 = [{ n: 95, title: 'Ask Don Güero for a bakery', body: '', labels: ['tier: normal', 'ask', 'guero'], at: '2026-09-06' }, { n: 96, title: 'plain bug', body: '', labels: ['tier: low', 'bug'], at: '2026-09-06' }, { n: 97, title: 'a decision', body: '', labels: ['tier: high', 'decision'], at: '2026-09-06' }];
        RECORDSRC.comments[95] = { updated: 'x', last: { body: 'A bakery goes on the corner.', at: '2026-09-06', ts: '2026-09-06T10:00:00Z', answer: true } };
        RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place(fx7);
        const sign = k => (DECOR.find(d => d.deco === 'sign' && d.kind === k) || {}).text;
        if (sign('hall') !== '3' || sign('ob') !== '0' || sign('an') !== '0') problems.push('the signs do not count: hall ' + sign('hall') + ', ob ' + sign('ob') + ', an ' + sign('an'));
        if (typeof DECOART === 'undefined' || typeof DECOART.board !== 'function') problems.push('the faces have no boards');
        { const c = document.createElement('canvas'); c.width = 32; c.height = 32; const o = ctx; ctx = c.getContext('2d'); try { DECOART.board(0, 0, { text: 'ASKS', c: '#2E5FA8' }); DECODRAW.sign(0, 0, { text: '12', c: '#C0392B' }); } catch (e) { problems.push('a board or a sign throws: ' + e.message); } finally { ctx = o; } }
        RECORDSRC.cycle.g = 0; const g0 = docSections('guero'), g1 = docSections('guero'), g2 = docSections('guero'), g3 = docSections('guero');
        if (!g0.some(x => x.h && /Who I am/.test(x.h)) || !g1.some(x => x.h && /requests with my name · 1/.test(x.h)) || !g2.some(x => x.h && /feedback/i.test(x.h)) || !g3.some(x => x.h && /Who I am/.test(x.h))) problems.push("Don Güero's three lines do not cycle");
        if (!g1.some(x => x.btn && /walk to #95/.test(x.btn))) problems.push('the request with his name has no walk button');
        if (!g2.some(x => x.p && /bakery goes on the corner/.test(x.p))) problems.push('his third line does not quote the last feedback');
        const ask = g0.find(x => x.btn && /Ask me to build/.test(x.btn)); if (!ask) problems.push('no Ask me to build button'); else { ask.run(); if (docCur !== 'request' || RECORDSRC.formTags.join() !== 'guero,changarrito') problems.push('asking Don Güero did not pre-tag guero'); }
        RECORDSRC.formTags = []; RECORDSRC.place([]); document.getElementById('reader').hidden = true; }
      // ---- ch-v23 (#69): la primera cuadra — Don Güero's first block. The street is a boulevard with a second
      // rank; six houses you can walk into, one per kind of work; each wears its work label in plain words
      // (owner: "put a human friendly label as to what type of issue or work is being done... for buildings too") ----
      { const st = WORLDS.st, sign = k => (DECOR.find(d => d.deco === 'sign' && d.kind === k) || {}).text;
        if (st.rows[0] !== 'BBQQ$QQBBvBBBBEBZZZOZZIII%IIB2') problems.push('the north rank is not Don Güero\'s row 0: ' + st.rows[0]);
        if (st.rows[8] !== '...QQQ@QQQQZZZMZZZZIIILIIII...') problems.push('the south rank is not Don Güero\'s row 8: ' + st.rows[8]);
        if (st.rows[0][9] !== 'v' || st.rows[0][14] !== 'E' || st.rows[0][29] !== '2') problems.push('la ventanilla, the stall door or the park gate moved');
        if (!READS.some(r => r.world === 'st' && r.x === 8 && r.y === 0 && r.doc === 'board')) problems.push('city hall\'s board moved');
        const H = typeof RECORDSRC.areas === 'function' ? RECORDSRC.areas() : null;
        if (!H || H.length !== 6) problems.push('the record does not declare six houses');
        else {
          const ids = H.map(h => h.id).join(); if (ids !== 'an,pp,es,mo,ob,co') problems.push('the six houses are not an,pp,es,mo,ob,co: ' + ids);
          H.forEach(h => {
            if (!WORLDS[h.world]) { problems.push(h.id + ': its world ' + h.world + ' is missing'); return; }
            if (!/^work: /.test(h.label)) problems.push(h.id + ': its label is not a work label in plain words: ' + h.label);
            if (!h.name || !h.name.en || !h.name.es) problems.push(h.id + ' has no name in both languages');
            // its door on the street, the portal in, the portal back to the doorstep in front of that door
            const d = h.door; if (st.rows[d.y][d.x] !== h.glyph) problems.push(h.id + ': no ' + h.glyph + ' door at (' + d.x + ',' + d.y + ')');
            const pin = PORTALS.st[h.glyph]; if (!pin || pin.to !== h.world) problems.push(h.id + ': the street door does not lead inside');
            else if (SOLID.has(WORLDS[h.world].grid[pin.y][pin.x])) problems.push(h.id + ': you land on a solid tile inside');
            const pout = PORTALS[h.world] && PORTALS[h.world][h.glyph]; if (!pout || pout.to !== 'st') problems.push(h.id + ': the way out does not lead to the street');
            else if (!(pout.x === d.x && Math.abs(pout.y - d.y) === 1 && !SOLID.has(st.grid[pout.y][pout.x]))) problems.push(h.id + ': the way out does not land on the doorstep in front of its door');
            if (!DOORSET.has(h.glyph) || !DOORLOOK[h.glyph]) problems.push(h.id + ': its door glyph is not a door with a look');
            // the sign over the door counts this house; the board beside the door says the work in plain words, two lines
            const sg = DECOR.find(x => x.deco === 'sign' && x.kind === h.id); if (!sg || sg.world !== 'st' || sg.x !== d.x) problems.push(h.id + ': no sign over its door');
            const bd = DECOR.find(x => x.deco === 'board' && x.house === h.id); if (!bd || Math.abs(bd.x - d.x) !== 1 || bd.y !== d.y) problems.push(h.id + ': no board beside its door');
            else { const lines = bd.text.split('\n'); if (lines.length !== 2 || lines.some(l => l.length > 8)) problems.push(h.id + ': the board is not two short lines: ' + JSON.stringify(bd.text));
              const said = lines.join(' ').toLowerCase().replace(/[^a-z& ]/g, ''), want = h.label.replace(/^work: /, '').toLowerCase().replace(/[^a-z& ]/g, '');
              if (!want.startsWith(said.slice(0, 6))) problems.push(h.id + ': the board does not say the work label: ' + JSON.stringify(bd.text) + ' vs ' + h.label); }
            // the clerk: inside, still, marked, carrying the house's document; the house's board readable inside
            const w = WORLDS[h.world], c = w.npcs.find(n => n.npc === h.clerk);
            if (!c) problems.push(h.id + ': no clerk ' + h.clerk + ' inside'); else { if (!hasSay(c) || wanders(c)) problems.push(h.id + ': the clerk wears no mark or wanders'); if (c.doc !== 'h_' + h.id) problems.push(h.id + ': the clerk carries the wrong document'); }
            if (!READS.some(r => r.world === h.world && r.doc === 'b_' + h.id)) problems.push(h.id + ': no board to read inside');
            if (!(MAPDOT[h.world] && MAPDOT[h.world][0] === d.x)) problems.push(h.id + ': the town plan has no dot for it');
            if (!T().locs[h.world] || !T().arrive[h.world]) problems.push(h.id + ': the world has no name or arrival line');
          });
          // the facades: every glyph in the two ranks is a facade at wall height — the I row was a grocery counter (Don Güero's find)
          [...new Set((st.rows[0] + st.rows[8]).split('').filter(g => !'.v E2'.includes(g) && !DOORSET.has(g)))].forEach(g => { const m = TILES[g]; if (!m || m.kind !== 'facade' || (m.lift | 0) < 13) problems.push('the face ' + g + ' is not a facade at wall height (' + JSON.stringify(m) + ')'); });
          // the clerk's three lines: what the house is for (its label in plain words), the count, what is on the desk
          const fxH = [{ n: 201, title: 'stairs again', body: '', labels: ['tier: high', 'ask', 'work: rooms & stairs'], at: '2026-09-06' }, { n: 202, title: 'the rail', body: '', labels: ['tier: normal', 'bug', 'work: rooms & stairs'], at: '2026-09-07' }, { n: 203, title: 'a save bug', body: '', labels: ['tier: low', 'bug', 'work: the engine'], at: '2026-09-07' }, { n: 204, title: 'no address', body: '', labels: ['tier: high', 'ask'], at: '2026-09-07' }];
          RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place(fxH);
          if (RECORDSRC.house(fxH[0]) !== 'ob' || RECORDSRC.house(fxH[2]) !== 'mo' || RECORDSRC.house(fxH[3]) !== null) problems.push('house(i) does not read the work label');
          if (sign('ob') !== '2' || sign('mo') !== '1' || sign('an') !== '0' || sign('hall') !== '4') problems.push('the house signs do not count their residents: ob ' + sign('ob') + ' mo ' + sign('mo') + ' an ' + sign('an') + ' hall ' + sign('hall'));
          RECORDSRC.cycle.h_ob = 0; const c0 = docSections('h_ob'), c1 = docSections('h_ob'), c2 = docSections('h_ob');
          if (!c0.some(x => x.p && /rooms & stairs/i.test(x.p))) problems.push('the clerk\'s first line does not say the work in plain words: ' + JSON.stringify(c0.filter(x => x.p).map(x => x.p)));
          if (!c1.some(x => x.p && /2/.test(x.p) && /address/i.test(x.p))) problems.push('the clerk\'s second line does not count: ' + JSON.stringify(c1.filter(x => x.p).map(x => x.p)));
          if (!c2.some(x => x.btn && /walk to #201/.test(x.btn))) problems.push('the clerk\'s third line has no walk button for the oldest');
          if (!c0.some(x => x.btn && /file something about/i.test(x.btn))) problems.push('the clerk offers no file-about button');
          const fb = c0.find(x => x.btn && /file something about/i.test(x.btn)); if (fb) { fb.run(); if (docCur !== 'request' || !RECORDSRC.formTags.includes('work: rooms & stairs')) problems.push('filing from a house does not pre-tag its work label: ' + RECORDSRC.formTags.join()); }
          const hb = docSections('b_ob'); if (!hb.some(x => x.h && /Pinned · 0/.test(x.h))) problems.push('the house board does not say both residents stand inside: ' + JSON.stringify(hb.filter(x => x.h).map(x => x.h)));
          const rq = docSections('request').find(x => x.form); const wk = rq && rq.form.fields.find(f => f.k === 'work');
          if (!wk || wk.type !== 'select' || !wk.opts.some(o => o.v === 'work: the engine')) problems.push('the request form has no work dropdown');
          RECORDSRC.formTags = []; RECORDSRC.place([]); document.getElementById('reader').hidden = true;
          if (auditReach().length) problems.push('reach with the block: ' + auditReach().join(' | '));
          // ---- ch-v24: dos cuerpos — two on the doorstep, four inside, the rest on the house board; the plaza holds six ----
          { const many = []; for (let k = 0; k < 8; k++) many.push({ n: 300 + k, title: 'engine ' + k, body: '', labels: ['tier: ' + (k < 3 ? 'high' : 'normal'), 'bug', 'work: the engine'], at: '2026-09-0' + (1 + (k % 7)) });
            for (let k = 0; k < 8; k++) many.push({ n: 400 + k, title: 'homeless ' + k, body: '', labels: ['tier: high', 'decision'], at: '2026-09-05' });
            many.push({ n: 500, title: 'small', body: '', labels: ['tier: low', 'bug', 'work: the engine'], at: '2026-09-05' });
            RECORDSRC.place(many);
            const mo = RECORDSRC.area('mo');
            const onStep = WORLDS.st.npcs.filter(n => n.issue && mo.doorstep.some(([x, y]) => x === n.x && y === n.y));
            const inside = WORLDS.mo.npcs.filter(n => n.issue);
            const plaza = WORLDS.st.npcs.filter(n => n.issue && RECORDSRC.plaza.some(([x, y]) => x === n.x && y === n.y));
            if (onStep.length !== 2) problems.push('El Motor\'s doorstep holds ' + onStep.length + ' people, not the two heaviest');
            if (inside.length !== 4) problems.push('El Motor holds ' + inside.length + ' people inside, not four');
            if (!onStep.every(n => inside.some(m => m.issue === n.issue))) problems.push('the doorstep two are not also at the counter');
            if (plaza.length !== 6) problems.push('the plaza holds ' + plaza.length + ' people, not six');
            const standing = new Set(Object.keys(RECORDSRC.placed).map(Number)), pinned = RECORDSRC.notesList.map(i => i.n);
            if (standing.size + pinned.length !== many.length || pinned.some(n => standing.has(n))) problems.push('standing + pinned != fetched (' + standing.size + ' + ' + pinned.length + ' vs ' + many.length + ')');
            const hb = docSections('b_mo'), inN = new Set(inside.map(n => n.issue));
            [300, 301, 302, 303, 304, 305, 306, 307].filter(n => !inN.has(n)).concat([500]).forEach(n => { if (!hb.some(x => x.kv && x.kv.some(r => r[0] === '#' + n))) problems.push('the house board does not pin #' + n); });
            if ([...inN].some(n => hb.some(x => x.kv && x.kv.some(r => r[0] === '#' + n)))) problems.push('the house board pins someone who is standing inside');
            const plazaN = new Set(plaza.map(n => n.issue)), homelessPinned = [400, 401, 402, 403, 404, 405, 406, 407].filter(n => !plazaN.has(n));
            if (homelessPinned.length !== 2) problems.push('two homeless people should be pinned, got ' + homelessPinned.length);
            const cb = docSections('board'); if (!cb.some(x => x.h && /no address|sin domicilio/i.test(x.h))) problems.push('city hall\'s board has no sin-domicilio section'); homelessPinned.forEach(n => { if (!cb.some(x => x.kv && x.kv.some(r => r[0] === '#' + n))) problems.push('the pinned homeless #' + n + ' is not on city hall\'s board'); });
            // walk there: from the street you meet the doorstep body, from inside the house the counter body
            const stepOne = onStep[0] && onStep[0].issue, inOnly = (inside.find(n => !onStep.some(m => m.issue === n.issue)) || {}).issue;
            world = 'st'; RECORDSRC.walkTo(stepOne); if (world !== 'st') problems.push('walkTo from the street left the street');
            world = 'mo'; px = 2; py = 3; RECORDSRC.walkTo(stepOne); if (world !== 'mo') problems.push('walkTo from inside the house left the house');
            world = 'st'; RECORDSRC.walkTo(inOnly); if (world !== 'mo') problems.push('walkTo a person who only stands inside did not go inside');
            // the hoarding: a sign that counts the people with no address, a board that names block two, a sheet to read
            if (sign('next') !== '8') problems.push('the hoarding does not count the people waiting for block two: ' + sign('next'));
            if (!DECOR.some(d => d.deco === 'board' && d.x <= 1 && d.y === 0 && /2|two|dos/i.test(d.text))) problems.push('no board names block two on the hoarding');
            if (!READS.some(r => r.world === 'st' && r.x === 1 && r.y === 0 && r.doc === 'next')) problems.push('the hoarding has nothing to read');
            const nx = docSections('next'); if (!nx.some(x => x.p && /8/.test(x.p))) problems.push('the hoarding sheet does not say how many wait');
            // who went home: the house board shows the recently closed of its kind, past tense
            RECORDSRC.gone = [{ n: 290, title: 'fixed the save', labels: ['bug', 'work: the engine'], closed: '2026-09-06' }, { n: 291, title: 'other house', labels: ['work: how it looks'], closed: '2026-09-06' }];
            const hb2 = docSections('b_mo'); if (!hb2.some(x => x.h && /went home|se fueron/i.test(x.h)) || !hb2.some(x => x.kv && x.kv.some(r => r[0] === '#290')) || hb2.some(x => x.kv && x.kv.some(r => r[0] === '#291'))) problems.push('the house board does not show who went home from this house');
            // a label lands: the town says where the person moved
            const said = []; const say0 = RECORDSRC.say; RECORDSRC.say = (en, es) => said.push(en);
            const w0 = RECORDSRC.write; RECORDSRC.write = async () => ({});
            const mover = many.find(i => i.n === 400); await RECORDSRC.setLabels(mover, ['tier: high', 'decision', 'work: rooms & stairs'], '');
            if (!said.some(t => /#400/.test(t) && /Obra|rooms & stairs/i.test(t))) problems.push('the town did not announce the move: ' + JSON.stringify(said));
            RECORDSRC.say = say0; RECORDSRC.write = w0; RECORDSRC.gone = [];
            RECORDSRC.place([]);
            Object.entries(WORLDS).forEach(([wid, w]) => { if (w.npcs.some(n => n.issue)) problems.push(wid + ' still holds a record person after place([])'); }); }
        }
      }
      // Meridian's animals have somewhere to stand in the town's rooms
      if (SOLID.has(WORLDS.hq.grid[5][12])) problems.push('hq (12,5) is solid — Frederick has nowhere to stand');
      if (SOLID.has(WORLDS.st.grid[1][4])) problems.push('st (4,1) is solid — the pigeon has nowhere to stand');
      // the season dressing in the town (owner, 2026-09-08: "these updates arent there... we should have in both and template")
      if (typeof SEASONS === 'undefined' || !SEASONS.muertos) problems.push('the town has no Día de Muertos');
      else { const keepS = seasonPick, keepW = { world, px, py, cam: camMode }; seasonSet('muertos');
        Object.keys(WORLDS).filter(k => !WORLDS[k].built).forEach(wid => { if (!fiestaSwags(wid).length) problems.push('no papel picado in the town\'s ' + wid); });
        // owner, 2026-09-08: "the alebrijes mode has some overlay issues still in the park" — a swag must never share a
        // line with the deck: the bridge hangs its own marigold cut, and two strings in one line tangle at the deck's end
        Object.keys(WORLDS).filter(k => !WORLDS[k].built).forEach(wid => { const w = WORLDS[wid];
          fiestaSwags(wid).forEach(sw => { const hor = sw.from[1] === sw.to[1], ln = hor ? sw.from[1] : sw.from[0];
            for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++)
              if ((TILES[w.rows[y][x]] || {}).kind === 'bridge' && (hor ? y : x) === ln)
                problems.push(`a swag in ${wid} shares the bridge's ${hor ? 'row' : 'column'} ${ln} — the deck hangs its own cut there`); }); });
        if (!(art('hangs', []) || []).some(h => h.kind === 'pinata')) problems.push('no piñata in the town');
        const pr = art('props', []) || []; if (!pr.some(p => p.kind === 'ofrenda' && p.world === 'pk') || pr.filter(p => p.kind === 'ofrenda').length < 2) problems.push('the town has no ofrenda at the foot of the bridge and on a table');
        pr.filter(p => p.kind === 'calaverita').forEach(p => { if (!p.sill || !propSill(p.world, p)) problems.push('a town calaverita is not on a window: ' + p.world + ' ' + p.x + ',' + p.y); });
        if (!art('bloom', null)) problems.push('the town\'s planters do not bloom');
        const pkw = WORLDS.pk, rowsD = new Set(); for (let y = 0; y < pkw.H; y++) for (let x = 0; x < pkw.W; x++) if ((TILES[pkw.rows[y][x]] || {}).kind === 'bridge') rowsD.add(y);
        if (rowsD.size < 2) problems.push('the town\'s bridge is one tile wide');
        camSet('3d'); world = 'pk'; px = 6; py = 7; moving = false; held = null; t3Invalidate(); draw3d();
        if (!T3.group.children.some(o => o.userData && o.userData.ofrenda)) problems.push('the ofrenda does not stand in the town\'s park in 3D');
        seasonSet(keepS || 'auto'); world = keepW.world; px = keepW.px; py = keepW.py; camSet(keepW.cam); }
      return problems;
    });
  });
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — the town boots on its own prefix, has a street, a window, a board and a park, places people by tier where they belong, cycles three lines, lets them leave, and writes only with a token.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
