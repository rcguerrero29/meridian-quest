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
    // Meridian's animals have somewhere to stand in the town's rooms
    if (SOLID.has(WORLDS.hq.grid[5][12])) problems.push('hq (12,5) is solid — Frederick has nowhere to stand');
    if (SOLID.has(WORLDS.st.grid[1][4])) problems.push('st (4,1) is solid — the pigeon has nowhere to stand');
    return problems;
  });
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — the town boots on its own prefix, has a street, a window, a board and a park, places people by tier where they belong, cycles three lines, and lets them leave.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
