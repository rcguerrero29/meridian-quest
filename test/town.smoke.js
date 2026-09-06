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
    if (typeof STOREPFX === 'undefined' || STOREPFX !== 'ch') problems.push('STOREPFX is not "ch"');
    if (SK('1') !== 'ch1') problems.push('SK() does not use the prefix: ' + SK('1'));
    if (!WORLDS.hq || !WORLDS.st) problems.push('hq/st missing');
    const tag = (document.getElementById('verTag') || {}).textContent || '';
    if (!/El Changarrito/.test(tag) || !/engine mq-v/.test(tag)) problems.push('verTag does not name the town and the engine: ' + tag);
    if (!RECORD.enabled) problems.push('RECORD is not enabled');
    const before = WORLDS.st.npcs.length;
    const fx = [1, 2, 3, 4].map(n => ({ n, title: '❗Fixture ' + n + ' <b>x</b>', body: 'Line one.\n\nLine two.', at: '2026-09-05',
      labels: n === 3 ? ['tier: normal', 'bug'] : n === 4 ? ['tier: low'] : ['tier: high', 'ask'], url: 'https://example.invalid/' + n }));
    RECORDSRC.place(fx);
    const placed = WORLDS.st.npcs.length - before;
    if (placed !== 3) problems.push('placed ' + placed + ' people, expected 3 (a tier: low issue is a note, not a person)');
    if (RECORDSRC.notes !== 1) problems.push('notes for the board: ' + RECORDSRC.notes + ', expected 1');
    const p = WORLDS.st.npcs.filter(n => n.doc && n.issue); /* record-placed people; la ventanilla carries hers */
    if (p.length !== 3) problems.push('people lack documents');
    if (!p.every(n => hasSay(n))) problems.push('a placed person wears no mark');
    if (p.some(n => wanders(n))) problems.push('a placed person wanders');
    if (p.some(n => /</.test(npcName(n.npc)))) problems.push('a name kept markup: ' + p.map(n => npcName(n.npc)).join(','));
    const secs = docSections(p[0].doc);
    if (!secs || secs.filter(s => s.p).length !== 3) problems.push('document did not split the body into paragraphs (the line, then two)');
    if (!secs.some(s => s.kv)) problems.push('document has no facts row');
    // a closed issue: its person leaves and the tile comes back
    RECORDSRC.place(fx.slice(0, 2));
    if (WORLDS.st.npcs.length - before !== 2) problems.push("a closed issue's person did not leave");
    if (WORLDS.st.npcs.filter(n => n.doc && n.issue === 3).length) problems.push('the closed issue is still standing');
    if (Object.values(RECORDSRC.stands).flat().some(([x, y]) => WORLDS.st.grid[y][x] === 'N' && !WORLDS.st.npcs.some(n => n.x === x && n.y === y))) problems.push('a tile stayed marked after someone left');
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
    // per-label stands: a decision stands in front of the Z face, a bug in front of I, an ask in front of Q
    RECORDSRC.place([]);
    RECORDSRC.place([{ n: 11, title: 'd', body: '', labels: ['tier: high', 'decision'], at: '2026-09-05' },
                     { n: 12, title: 'b', body: '', labels: ['tier: high', 'bug'], at: '2026-09-05' },
                     { n: 13, title: 'a', body: '', labels: ['tier: normal', 'ask'], at: '2026-09-05' }]);
    const at = n => { const k = RECORDSRC.placed[n]; const p2 = WORLDS.st.npcs.find(m => m.key === k); return p2 ? [p2.x, p2.y] : null; };
    const inZone = (pos, zone) => pos && RECORDSRC.stands[zone].some(([x, y]) => x === pos[0] && y === pos[1]);
    if (!inZone(at(11), 'decision')) problems.push('a decision did not stand by the Z face');
    if (!inZone(at(12), 'bug')) problems.push('a bug did not stand by the I face');
    if (!inZone(at(13), 'ask')) problems.push('an ask did not stand by the Q face');
    // the window and the board build from the record, with and without permits
    RECORDSRC.permits = []; let wd = docSections('window');
    if (!wd.some(s => s.p && /no permit/i.test(s.p))) problems.push('the window does not say there are no permits');
    RECORDSRC.permits = [{ n: 37, title: 'CLAUDE.md', at: '2026-09-05', mergeable: true, green: true, draft: false, url: 'u' }];
    wd = docSections('window');
    if (!wd.some(s => s.kv && s.kv.some(r => r[0] === '#37'))) problems.push('the window does not list the permit');
    const bd = docSections('board'); if (!bd.length) problems.push('the board does not build');
    RECORDSRC.place([]);
    // ---- 3: la ventanilla behind her window; the reader's button; the writes ----
    if (!(v && v.y === 0 && v.x === 9)) problems.push('la ventanilla is not in the facade row at (9,0)');
    if (v && SOLID.has(WORLDS.st.grid[1][9])) problems.push('the tile in front of her window is not walkable');
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
      RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place([]);
      const wd2 = docSections('window');
      if (!wd2.some(s => s.btn && /Sign in/.test(s.btn))) problems.push('the window has no sign-in button');
      if (!wd2.some(s => s.btn && /File a request/.test(s.btn))) problems.push('the window has no file-a-request button');
      // Meridian's animals have somewhere to stand in the town's rooms
      if (SOLID.has(WORLDS.hq.grid[5][12])) problems.push('hq (12,5) is solid — Frederick has nowhere to stand');
      if (SOLID.has(WORLDS.st.grid[1][4])) problems.push('st (4,1) is solid — the pigeon has nowhere to stand');
      return problems;
    });
  });
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — the town boots on its own prefix, has a street, a window, a board and a park, places people by tier where they belong, cycles three lines, lets them leave, and writes only with a token.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
