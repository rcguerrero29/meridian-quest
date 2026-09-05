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
    const p = WORLDS.st.npcs.filter(n => n.doc);
    if (p.length !== 3) problems.push('people lack documents');
    if (!p.every(n => hasSay(n))) problems.push('a placed person wears no mark');
    if (p.some(n => wanders(n))) problems.push('a placed person wanders');
    if (p.some(n => /</.test(npcName(n.npc)))) problems.push('a name kept markup: ' + p.map(n => npcName(n.npc)).join(','));
    const secs = docSections(p[0].doc);
    if (!secs || secs.filter(s => s.p).length !== 2) problems.push('document did not split the body into paragraphs');
    if (!secs.some(s => s.kv)) problems.push('document has no facts row');
    // a closed issue: its person leaves and the tile comes back
    RECORDSRC.place(fx.slice(0, 2));
    if (WORLDS.st.npcs.length - before !== 2) problems.push("a closed issue's person did not leave");
    const [x, y] = RECORDSRC.stands[2];
    if (WORLDS.st.grid[y][x] === 'N') problems.push('tile not restored after leaving');
    // Meridian's animals have somewhere to stand in the town's rooms
    if (SOLID.has(WORLDS.hq.grid[5][12])) problems.push('hq (12,5) is solid — Frederick has nowhere to stand');
    if (SOLID.has(WORLDS.st.grid[1][4])) problems.push('st (4,1) is solid — the pigeon has nowhere to stand');
    return problems;
  });
  fails.push(...r);
  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log('OK — the town boots on its own prefix, places people by tier, and lets them leave.');
})().catch(e => { console.error('FAIL', e); process.exit(1); });
