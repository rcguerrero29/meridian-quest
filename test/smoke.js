/* Meridian Quest headless smoke test.
 *
 * Runs the real game in headless Chromium and checks every invariant that has
 * bitten us (or could): boot errors, world/portal validators, BFS reachability
 * (at boot AND after the construction site completes), EN/ES content parity,
 * XP math, the retry-until-correct rules, and the wardrobe for both pets.
 *
 * Setup:   npm install playwright-core
 * Run:     node test/smoke.js
 * Chromium: set CHROMIUM_PATH, or rely on the fallbacks below.
 * Exit code 0 = all green; 1 = failures (listed on stdout).
 */
const { chromium } = require('playwright-core');
const fs = require('fs');
const path = require('path');

const CANDIDATES = [
  process.env.CHROMIUM_PATH,
  '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',
  '/opt/pw-browsers/chromium',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/google-chrome',
].filter(Boolean);

(async () => {
  let exe;
  try { const p = chromium.executablePath(); if (p && fs.existsSync(p)) exe = p; } catch (e) {}
  if (!exe) exe = CANDIDATES.find(p => { try { return fs.existsSync(p) && fs.statSync(p).isFile(); } catch (e) { return false; } });
  if (!exe) { console.error('No Chromium found. Set CHROMIUM_PATH.'); process.exit(1); }
  const fails = [];
  // version lockstep: sw.js CACHE and config.js GAMEV must move together
  {
    const sw = fs.readFileSync(path.resolve(__dirname, '..', 'sw.js'), 'utf8');
    const cfg = fs.readFileSync(path.resolve(__dirname, '..', 'content', 'meridian', 'config.js'), 'utf8');
    const swv = (sw.match(/CACHE = "(mq-v\d+)"/) || [])[1];
    const gv = (cfg.match(/GAMEV="(mq-v\d+)"/) || [])[1];
    if (!swv || !gv || swv !== gv) fails.push(`version lockstep broken: sw=${swv} config=${gv}`);
  }
  const browser = await chromium.launch({ executablePath: exe });
  const page = await browser.newPage({ viewport: { width: 480, height: 900 } });
  const pageErrors = [];
  page.on('pageerror', e => pageErrors.push(e.message));
  const warns = [];
  page.on('console', m => { if (m.type() === 'warning') warns.push(m.text()); });
  // fail external fetches (Google Fonts) instantly — a hanging CDN must never stall the suite
  await page.route('**', r => r.request().url().startsWith('file://') ? r.continue() : r.abort());

  const index = 'file://' + path.resolve(__dirname, '..', 'index.html');
  await page.goto(index);
  await page.waitForTimeout(1200);

  // ---- 1. boot: no JS errors, no validator warnings (WORLD/PORTAL/REACH) ----
  if (pageErrors.length) fails.push('page errors: ' + pageErrors.join(' | '));
  const valWarns = warns.filter(w => /^(WORLD|PORTAL|REACH)/.test(w));
  if (valWarns.length) fails.push('validator warnings: ' + valWarns.join(' | '));

  // ---- 2. static invariants inside the page ----
  const stat = await page.evaluate(() => {
    const problems = [];
    const keys = o => Object.keys(o).sort().join(',');
    if (keys(UI.en) !== keys(UI.es)) {
      const en = new Set(Object.keys(UI.en)), es = new Set(Object.keys(UI.es));
      problems.push('UI keys differ: EN-only=' + [...en].filter(k => !es.has(k)) + ' ES-only=' + [...es].filter(k => !en.has(k)));
    }
    ['flavor', 'locs', 'classes', 'chat', 'arrive', 'trolley'].forEach(k => {
      if (keys(UI.en[k]) !== keys(UI.es[k])) problems.push('UI.' + k + ' subkeys differ');
    });
    if (UI.en.careEvents('X').length !== UI.es.careEvents('X').length) problems.push('careEvents length differs');
    if (UI.en.styles.length !== UI.es.styles.length) problems.push('styles length differs');
    if (keys(NPCN.en) !== keys(NPCN.es)) problems.push('NPCN keys differ');
    Object.keys(NPCN.en).forEach(k => { if (!NPCE[k]) problems.push('NPCE missing emoji: ' + k); });

    const shape = q => q.npc + '|' + q.start + '|' + Object.entries(q.nodes).map(([k, n]) =>
      k + ':' + n.ch.map(c => c.next ? '>' + c.next : c.out.r).join(',')).join(';');
    if (QEN.length !== QES.length) problems.push('quest count EN=' + QEN.length + ' ES=' + QES.length);
    QEN.forEach((q, i) => { if (QES[i] && shape(q) !== shape(QES[i])) problems.push('quest ' + i + ' EN/ES shape mismatch'); });
    if (shape(FQEN) !== shape(FQES)) problems.push('fred quest EN/ES shape mismatch');

    let max = 0;
    QEN.forEach(q => { max += 10; Object.values(q.nodes).forEach(n => n.ch.forEach(c => { if (c.next) max += 10; })); });
    if (max !== MAXXP) problems.push('MAXXP=' + MAXXP + ' but max achievable=' + max);

    const assigned = new Set();
    Object.values(WNPC).forEach(m => Object.values(m).forEach(d => d.q.forEach(qi => {
      assigned.add(qi); if (!QEN[qi]) problems.push('WNPC references missing quest ' + qi);
    })));
    QEN.forEach((_, i) => { if (!assigned.has(i)) problems.push('quest ' + i + ' unassigned'); });
    Object.values(WORLDS).forEach(w => w.npcs.forEach(n => { if (!NPCLOOK[n.key]) problems.push('NPCLOOK missing ' + n.key); }));

    if (auditReach().length) problems.push('boot reachability: ' + auditReach().join(' | '));
    // post-construction: the Studio (and Xochi) must be reachable once La Obra completes
    done.add(12); done.add(13); world = 'st'; px = fx = 2; py = fy = 10; applyObra();
    if (auditReach().length) problems.push('post-obra reachability: ' + auditReach().join(' | '));
    if (isSolid(px, py)) problems.push('applyObra left the hero inside a wall');
    done = new Set(); world = 'hq'; px = fx = 10; py = fy = 11;
    return { problems, quests: QEN.length, maxXP: max };
  });
  fails.push(...stat.problems);

  // ---- 3. gameplay flow: retry rules, XP deltas, wardrobe ----
  await page.click('.classes button[data-c="architect"]');
  await page.click('#begin');
  await page.waitForTimeout(200);
  const clickChoice = async pred => page.evaluate(p => {
    const c = curQ.nodes[node].ch.find(eval(p));
    [...document.getElementById('choices').children].find(b => b.textContent === c.t).click();
  }, pred);
  const header = () => page.evaluate(() => document.querySelector('#verdict h2').textContent);

  // hearts are OFF by default now (open world). Turn them on for the lives tests.
  await page.evaluate(() => { stakesAdmin = { mode: 'hearts' }; hearts = 3; });

  // bad pick: heart lost, quest open, no reveal
  await page.evaluate(() => questStart(1));
  await clickChoice(`c => c.out && c.out.r === 'bad'`);
  const t1 = await page.evaluate(() => ({
    hearts, open: !done.has(1),
    revealed: [...document.getElementById('choices').children].some(b => b.classList.contains('right')),
  }));
  if (t1.hearts !== 2) fails.push('bad pick did not cost a heart');
  if (!t1.open) fails.push('bad pick completed the quest');
  if (t1.revealed) fails.push('miss revealed the correct answer');
  await page.click('#next');

  // mid then ok: +5 then +5 (delta), header honest
  await page.evaluate(() => questStart(1));
  await clickChoice(`c => c.out && c.out.r === 'mid'`);
  const h1 = await header();
  if (!h1.includes('+5 XP')) fails.push('first mid header wrong: ' + h1);
  await page.click('#next');
  await page.evaluate(() => questStart(1));
  await clickChoice(`c => c.out && c.out.r === 'ok'`);
  const h2 = await header();
  if (!h2.includes('+5 XP')) fails.push('ok-after-mid header wrong: ' + h2);
  const t2 = await page.evaluate(() => ({ xp, done1: done.has(1) }));
  if (t2.xp !== 10) fails.push('XP after mid+ok should be 10, got ' + t2.xp);
  if (!t2.done1) fails.push('ok pick did not complete the quest');
  await page.click('#next');

  // wardrobe: attempt (fail) quest 15 -> settings button appears; dress both pets
  await page.evaluate(() => { hearts = 3; questStart(15); });
  await clickChoice(`c => c.out && c.out.r === 'bad'`);
  await page.click('#next');
  await page.click('#gear');
  if (await page.evaluate(() => document.getElementById('openWd').hidden)) fails.push('wardrobe button hidden after quest-15 attempt');
  await page.click('#openWd');
  await page.evaluate(() => {
    document.querySelectorAll('#wdRowBandana .sw')[1].click();
    document.getElementById('wdTabC').click();
  });
  await page.evaluate(() => {
    document.querySelectorAll('#wdRowBandana .sw')[2].click();
    document.querySelectorAll('#wdRowCollar .sw')[1].click();
  });
  const t3 = await page.evaluate(() => ({
    capeRowHiddenForCat: document.getElementById('wdRowCape').hidden,
    saved: JSON.parse(localStorage.getItem('mq1')),
  }));
  if (!t3.capeRowHiddenForCat) fails.push('cape row visible for Canela');
  if (!t3.saved.wr || !t3.saved.wr.bandana) fails.push('dog wear not saved');
  if (!t3.saved.wc || !t3.saved.wc.bandana || !t3.saved.wc.collar) fails.push('cat wear not saved');

  // ---- 3a1. chapters: Week One closes, the epilogue hands over, El Mercado opens ----
  const chap = await page.evaluate(() => {
    const problems = [];
    const week1 = CHAPTERS[0], merc = CHAPTERS[1];
    // the owner's rule: write the full pack, need fewer than all of it to close the district
    if (!(merc.need < merc.quests.length)) problems.push('mercado `need` must be lower than its pack size');
    done = new Set(); chSeen = 0; hearts = 3; applyGrowth();
    if (chDue()) problems.push('chapter reported due on a fresh save');
    if (mercadoOpen()) problems.push('El Mercado open before Week One closed');
    if (WORLDS.st.rows[13][6] === 'M') problems.push('mercado door on the street before it was earned');

    week1.quests.forEach(i => done.add(i));
    if (!chDue()) problems.push('Week One closed but no epilogue is due');
    hearts = 2; finish();
    if (!document.getElementById('epi').textContent) problems.push('no epilogue text on the chapter close');
    if (document.getElementById('endGo').hidden) problems.push('handover button hidden with a chapter still to come');
    document.getElementById('endGo').click();
    if (chSeen !== 1) problems.push('handover did not advance the chapter cursor');
    if (hearts !== 3) problems.push('the new week did not restore hearts');
    if (world !== 'st') problems.push('handover did not put the hero on the street: ' + world);
    if (isSolid(px, py)) problems.push('handover dropped the hero inside a wall');
    if (!mercadoOpen()) problems.push('El Mercado did not open on the handover');
    if (WORLDS.st.rows[13][6] !== 'M') problems.push('mercado door missing from the street');
    // Week One included La Obra, so the Studio must be standing and Lupe streetside
    if (WORLDS.st.rows[5][21] !== 'O') problems.push('Studio door missing after a rewind + rebuild');
    { const lu = WORLDS.st.npcs.find(n => n.key === 'e');
      if (!lu || lu.x !== 7 || lu.y !== 7) problems.push('Lupe did not move streetside after a rewind + rebuild'); }
    if (auditReach().length) problems.push('post-mercado reachability: ' + auditReach().join(' | '));

    // the district closes at `need`, not at the full pack
    merc.quests.slice(0, merc.need).forEach(i => done.add(i));
    if (!chDue()) problems.push('district did not close at its `need` threshold');
    finish();
    if (document.getElementById('endGo').hidden) problems.push('no way off the final ending screen');
    if (document.getElementById('endGo').textContent !== UI[lang].endStay)
      problems.push('final chapter still offers a handover instead of returning to the city');
    document.getElementById('endGo').click();
    if (chSeen !== CHAPTERS.length) problems.push('final acknowledgement did not close the last chapter');
    if (chDue()) problems.push('an ending is still due after the last chapter closed');
    if (isSolid(px, py)) problems.push('returning to the city dropped the hero inside a wall');

    // rewind: a fresh run must not inherit a shop it never earned
    document.getElementById('end').hidden = true;
    done = new Set(); chSeen = 0; hearts = 3; applyGrowth();
    world = 'hq'; px = fx = 10; py = fy = 11;
    if (mercadoOpen()) problems.push('replay left El Mercado standing');
    // ...and a district that has not opened yet is not answerable from the street
    if (qOpen(16)) problems.push('an unopened district\'s quests were already on offer');
    if (!qOpen(0)) problems.push('the opening district is not on offer at the start');
    if (WORLDS.st.rows[13][6] === 'M') problems.push('replay left the mercado door on the street');
    // and the city rewinds evenly: no building survives a run it was not built in
    if (WORLDS.st.rows[5][21] === 'O') problems.push('replay left the Studio standing');
    if (WORLDS.st.rows[9][20] === 'B') problems.push('replay left the Studio walls on the street');
    { const lu = WORLDS.st.npcs.find(n => n.key === 'e');
      if (!lu || lu.x !== 27 || lu.y !== 7) problems.push('replay left Lupe streetside instead of at her post'); }
    if (auditReach().length) problems.push('post-replay reachability: ' + auditReach().join(' | '));
    document.getElementById('world').hidden = false;
    return problems;
  });
  fails.push(...chap);

  // ---- 3a1b. running out of hearts ends the chapter; it never erases the city ----
  const doom = await page.evaluate(() => {
    const problems = [];
    stakesAdmin = { mode: 'hearts' };   // burnout only exists when lives are on
    done = new Set(); chSeen = 0; hearts = 3; xp = 0; marks = {}; applyGrowth();
    // build something, then burn out with most of Week One unanswered
    [12, 13].forEach(i => done.add(i)); applyGrowth();
    if (WORLDS.st.rows[5][21] !== 'O') problems.push('setup: Studio did not go up');
    hearts = 0; save();
    if (!chDue()) problems.push('zero hearts did not end the chapter');
    if (!localStorage.getItem('mq1')) problems.push('the save was deleted at zero hearts');
    finish(true);
    if (document.getElementById('endTitle').textContent !== UI[lang].goTitle)
      problems.push('burnout did not show the burnout title');
    if (document.getElementById('endGo').hidden) problems.push('burnout offers no way forward');

    document.getElementById('endGo').click();
    if (chSeen !== 1) problems.push('burnout did not move the story on to the next chapter');
    if (hearts !== 3) problems.push('the new week did not restore hearts after a burnout');
    if (xp !== 0) problems.push('burnout changed XP');
    if (!done.has(12) || !done.has(13)) problems.push('burnout erased answered quests');
    if (WORLDS.st.rows[5][21] !== 'O') problems.push('burnout tore down the Studio');
    if (!mercadoOpen()) problems.push('burnout did not open the next district');
    // owner's law (docs/OWNER.md, 2026-09-01): no practice is ever missed. Ending a
    // district's ARC never closes its quests — they stay answerable, and the ❗ stays up.
    if (!qOpen(0)) problems.push('a Week One quest closed behind the player');
    { const tovar = WORLDS.hq.npcs.find(n => n.npc === 'tovar');
      if (!tovar || pendingAt(tovar) === undefined) problems.push('an unanswered quest lost its marker when its district closed'); }
    if (!qOpen(16)) problems.push('the new chapter\'s quests are not on offer');

    // a quest answered after its district's Saturday gets its reframe line, at the
    // opening node only. Content's call: no `late` field, no line, nothing breaks.
    if (!qLate(0)) problems.push('a Week One quest does not read as late once the mercado opened');
    if (qLate(16)) problems.push('the district being played reads as late');
    { const q = AQ()[0], had = q.late, el = document.getElementById('npcLate');
      q.late = 'REFRAME-PROBE';
      questStart(0);
      if (el.hidden) problems.push('the late reframe line did not show');
      if (el.textContent !== 'REFRAME-PROBE') problems.push('the late reframe line showed the wrong text');
      node = Object.keys(q.nodes).find(k => k !== q.start);
      if (node) { nodeShow(); if (!el.hidden) problems.push('the reframe line repeated on a follow-up step'); }
      delete q.late; if (had !== undefined) q.late = had;
      questStart(16);
      if (!el.hidden) problems.push('a quest with no late line still showed one');
      cur = null; curQ = null; node = null;
      document.getElementById('card').hidden = true;
      document.getElementById('world').hidden = false; }

    done = new Set(); chSeen = 0; hearts = 3; marks = {}; applyGrowth();
    world = 'hq'; px = fx = 10; py = fy = 11;
    return problems;
  });
  fails.push(...doom);

  // ---- 3a1d. stakes are a layer; the grade underneath is always on ----
  const stakes = await page.evaluate(() => {
    const problems = [];
    const week1 = CHAPTERS[0];

    // the pack ships open-world: no lives, nothing to lose
    stakesAdmin = null;
    if (STAKES.mode !== 'none') problems.push('the shipped pack should default to no stakes');
    if (livesOn()) problems.push('lives are on with the pack default');
    done = new Set(); marks = {}; hearts = 3; chSeen = 0;
    hud();
    if (document.getElementById('hearts').textContent !== '')
      problems.push('the HUD shows hearts when there are no lives');

    // a wrong answer with stakes off costs nothing but the mark
    hearts = 3; questStart(1);
    const bad = curQ.nodes[node].ch.find(c => c.out && c.out.r === 'bad');
    [...document.getElementById('choices').children].find(b => b.textContent === bad.t).click();
    if (hearts !== 3) problems.push('a wrong answer cost a heart with stakes off');
    if (marks[1] !== 1) problems.push('the attempt was not recorded as a mark');
    if (chDue()) problems.push('a wrong answer ended a chapter with stakes off');
    const ok = curQ.nodes[node].ch.find(c => c.out && c.out.r === 'ok');
    questStart(1);
    [...document.getElementById('choices').children].find(b => b.textContent === ok.t).click();
    if (marks[1] !== 2) problems.push('the retry was not counted toward the grade');
    if (!done.has(1)) problems.push('the right answer did not complete the quest');

    // the grade reads the marks, and a retry costs grade — not progress
    marks = {}; done = new Set();
    week1.quests.forEach(i => { done.add(i); marks[i] = 1; });
    if (gradeOf(week1) !== 3) problems.push('all-first-try did not grade 3');
    week1.quests.forEach(i => { marks[i] = 3; });
    if (gradeOf(week1) !== 1) problems.push('all-retried did not grade 1');
    week1.quests.forEach((i, n) => { marks[i] = n < 12 ? 1 : 3; });   // 75% clean
    if (gradeOf(week1) !== 2) problems.push('a mixed run did not grade 2');

    // budget is declared in content but must behave as `none` until it is built
    stakesAdmin = { mode: 'budget' };
    if (stakesMode() !== 'none') problems.push('unbuilt `budget` mode is not falling back to none');
    if (livesOn()) problems.push('`budget` switched lives on');

    // a district may override the pack, so a calm town can hold a scored challenge
    stakesAdmin = null;
    const saved = CHAPTERS[0].stakes;
    CHAPTERS[0].stakes = { mode: 'hearts', hearts: 2 };
    chSeen = 0;
    if (!livesOn()) problems.push('a district could not switch its own stakes on');
    if (startHearts() !== 2) problems.push('a district could not set its own heart count');
    CHAPTERS[0].stakes = saved;

    stakesAdmin = null; done = new Set(); marks = {}; hearts = 3; chSeen = 0;
    document.getElementById('card').hidden = true;      // the quest card would cover #gear
    document.getElementById('world').hidden = false;
    return problems;
  });
  fails.push(...stakes);

  // ---- 3a1e. the admin toggle brings hearts back for a mini-game ----
  await page.evaluate(() => { document.getElementById('end').hidden = true; document.getElementById('wardrobe').hidden = true; });
  await page.click('#gear');
  const stkUI = await page.evaluate(() => {
    const problems = [];
    admin = false; applyAdmin(); applyStakes();
    if (!document.getElementById('stkRow').hidden) problems.push('the stakes toggle is visible outside admin mode');
    admin = true; applyAdmin(); applyStakes();
    if (document.getElementById('stkRow').hidden) problems.push('the stakes toggle is hidden in admin mode');
    document.getElementById('stkHearts').click();
    if (!livesOn()) problems.push('the admin toggle did not switch hearts on');
    let stored = null; try { stored = localStorage.getItem('mqstakes'); } catch (e) {}
    if (stored !== 'hearts') problems.push('the stakes choice was not remembered: ' + stored);
    hud();
    if (!document.getElementById('hearts').textContent) problems.push('the HUD hid hearts while lives were on');
    document.getElementById('stkNone').click();
    if (livesOn()) problems.push('the admin toggle did not switch hearts back off');
    // the project's own comfort standard: the audit skips these because they are
    // admin-only and hidden when it runs, so check them here while they are visible
    ['stkNone', 'stkHearts'].forEach(id => {
      const r = document.getElementById(id).getBoundingClientRect();
      if (Math.min(r.width, r.height) < 24)
        problems.push(`tap target < 24px: #${id} (${Math.round(r.width)}x${Math.round(r.height)})`);
      if (!document.getElementById(id).textContent.trim())
        problems.push(`#${id} has no label`);
    });
    if (!document.getElementById('lbStakes').textContent.trim()) problems.push('stakes row has no label');
    admin = false; applyAdmin(); stakesAdmin = null;
    try { localStorage.removeItem('mqstakes'); } catch (e) {}
    return problems;
  });
  fails.push(...stkUI);
  await page.evaluate(() => { document.getElementById('settings').hidden = true; });

  // ---- 3a1c. restart is a Settings tool behind a two-tap confirm, not a story button ----
  await page.evaluate(() => {
    document.getElementById('end').hidden = true;
    document.getElementById('wardrobe').hidden = true;
  });
  await page.click('#gear');
  const reset = await page.evaluate(() => {
    const problems = [];
    const b = document.getElementById('replay');
    if (!b) return ['restart button missing'];
    if (!document.getElementById('settings').contains(b)) problems.push('restart is not in Settings');
    if (document.getElementById('end').contains(b)) problems.push('restart is still on the ending screen');
    xp = 99; done = new Set([1, 2]); chSeen = 1; save();
    b.click();  // first tap only arms it
    if (b.textContent !== UI[lang].replayArm) problems.push('first tap did not ask for confirmation');
    if (xp !== 99 || chSeen !== 1) problems.push('first tap already wiped the run');
    b.click();  // second tap commits
    if (xp !== 0 || chSeen !== 0 || done.size) problems.push('confirmed restart did not reset the run');
    if (b.textContent !== UI[lang].replay) problems.push('restart button stuck on the confirm label');
    return problems;
  });
  fails.push(...reset);
  await page.evaluate(() => { document.getElementById('settings').hidden = true; hearts = 3; });

  // ---- 3a2. comfort checks (template guarantee): WCAG contrast on every theme
  //           variant, and tap targets >= 24px on every visible button ----
  const comfort = await page.evaluate(() => {
    const problems = [];
    const lum = h => {
      const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255)
        .map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ratio = (a, b) => { const l = [lum(a), lum(b)].sort((x, y) => y - x); return (l[0] + 0.05) / (l[1] + 0.05); };
    const PAIRS = [['ink', 'bg'], ['ink', 'surface'], ['ink', 'chip'], ['ink', 'bubble'], ['muted', 'surface'], ['accent-ink', 'accent']];
    const audit = (name, mode, p) => PAIRS.forEach(([fg, bg2]) => {
      const r = ratio(p[fg], p[bg2]);
      if (r < 4.5) problems.push(`contrast ${name}/${mode} ${fg} on ${bg2} = ${r.toFixed(2)} (< 4.5)`);
    });
    // built-in palette: read the stylesheet's values in both modes via data-theme
    const readVars = () => { const cs = getComputedStyle(document.documentElement); const o = {};
      ['bg', 'surface', 'ink', 'muted', 'line', 'accent', 'accent-ink', 'chip', 'bubble', 'bubble-line']
        .forEach(k => o[k] = cs.getPropertyValue('--' + k).trim()); return o; };
    document.documentElement.dataset.theme = 'light'; audit('meridian', 'light', readVars());
    document.documentElement.dataset.theme = 'dark'; audit('meridian', 'dark', readVars());
    delete document.documentElement.dataset.theme;
    Object.entries(THEMES).forEach(([name, t]) => {
      if (!t) return;
      audit(name, 'light', t.light); audit(name, 'dark', t.dark);
    });
    // tap targets: every visible button at least 24x24 (WCAG 2.5.8)
    document.querySelectorAll('button').forEach(b => {
      const r = b.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return; // hidden
      if (Math.min(r.width, r.height) < 24) problems.push(`tap target < 24px: #${b.id || b.className || b.textContent.slice(0, 12)} (${Math.round(r.width)}x${Math.round(r.height)})`);
    });
    // theme switch applies + persists
    document.querySelector('#themeRow button[data-th="fairy"]').click();
    const acc = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    let stored = null; try { stored = localStorage.getItem('mqtheme'); } catch (e) {}
    if (!(acc === THEMES.fairy.light.accent || acc === THEMES.fairy.dark.accent)) problems.push('fairy theme did not apply: ' + acc);
    if (stored !== 'fairy') problems.push('theme not persisted: ' + stored);
    document.querySelector('#themeRow button[data-th="meridian"]').click();
    return problems;
  });
  fails.push(...comfort);

  // ---- 3a3. theme editor: clone -> sabotage -> auto-fix must repass the audit ----
  const editor = await page.evaluate(() => {
    const problems = [];
    cloneTheme('fairy');
    if (themeName !== 'custom') problems.push('clone did not select custom theme');
    if (document.getElementById('thCustom').hidden) problems.push('custom button not revealed');
    // lazy change: ink painted the same as the background, muted nearly invisible
    customTheme.light.ink = customTheme.light.bg;
    customTheme.dark.muted = customTheme.dark.surface;
    customTheme.light['accent-ink'] = customTheme.light.accent;
    autoFixTheme();
    const PAIRS = [['ink', 'bg'], ['ink', 'surface'], ['ink', 'chip'], ['ink', 'bubble'], ['muted', 'surface'], ['accent-ink', 'accent']];
    ['light', 'dark'].forEach(m => PAIRS.forEach(([fg, bg2]) => {
      const r = cRatio(customTheme[m][fg], customTheme[m][bg2]);
      if (r < 4.5) problems.push(`auto-fix left ${m} ${fg}/${bg2} at ${r.toFixed(2)}`);
    }));
    /* palette wardrobe model: mqpals is a list of named palettes, mqpal the active index */
    let pals = null; try { pals = JSON.parse(localStorage.getItem('mqpals')); } catch (e) {}
    const active = Array.isArray(pals) ? pals[parseInt(localStorage.getItem('mqpal') || '0') || 0] : null;
    if (!active || !active.light || !active.dark || !active.n) problems.push('custom palette not persisted');
    if (sanitizeTheme({ light: { bg: 'javascript:x' }, dark: null }) !== null) problems.push('sanitizeTheme accepted garbage');
    if (sanitizeTheme(active) === null) problems.push('sanitizeTheme rejected its own output');
    if (pals && pals.length > 8) problems.push('palette wardrobe exceeded its cap');
    // back to default for the rest of the suite
    themeName = 'meridian'; applyTheme();
    return problems;
  });
  fails.push(...editor);

  // ---- 3b. multiplayer stub: button opens the under-construction panel; NET seam inert ----
  await page.evaluate(() => { document.getElementById('wardrobe').hidden = true; });
  await page.click('#gear');
  await page.click('#openMp');
  const mp = await page.evaluate(() => ({
    open: !document.getElementById('mpanel').hidden,
    title: document.getElementById('mpTitle').textContent,
    netInert: typeof NET === 'object' && NET.enabled === false,
  }));
  if (!mp.open || !mp.title) fails.push('multiplayer panel did not open');
  if (!mp.netInert) fails.push('NET seam missing or enabled by default');
  await page.click('#mpClose');

  // ---- 4. care-pack personalization: pet name flows into sheet + ics ----
  await page.evaluate(() => { fredQ = 1; treats = 3; });
  await page.click('#gear');
  await page.click('#openExp');
  await page.click('#exTabCare');
  await page.evaluate(() => {
    const el = document.getElementById('petName');
    el.value = 'Canelita'; el.dispatchEvent(new Event('input'));
  });
  const care = await page.evaluate(() => ({
    sheet: document.getElementById('exArea').value.split('\n')[0],
    ics: icsData(),
    formVisible: !document.getElementById('careForm').hidden,
  }));
  if (!care.formVisible) fails.push('care form not visible in care mode');
  if (!care.sheet.includes('CANELITA')) fails.push('pet name not in care sheet: ' + care.sheet);
  if (!care.ics.includes('Canelita')) fails.push('pet name not in ics');

  // ---- 4a. decision report: the play log becomes a portfolio document ----
  await page.click('#exTabRep');
  const rep = await page.evaluate(() => ({
    text: document.getElementById('exArea').value,
    dl: !document.getElementById('exDl').hidden,
    ics: document.getElementById('exIcs').hidden,
    form: document.getElementById('careForm').hidden,
    logged: dlog.length,
  }));
  if (!rep.dl) fails.push('report download button hidden in report mode');
  if (!rep.ics) fails.push('ics button still visible in report mode');
  if (!rep.form) fails.push('care form still visible in report mode');
  if (!rep.logged) fails.push('no decisions logged after answering quests');
  if (!rep.text.includes('Free Churro Friday')) fails.push('report missing a quest the player answered');
  if (!rep.text.includes('Hallucination control')) fails.push('report missing the concept it tested');
  if (!rep.text.includes('Your call:')) fails.push('report missing the choice the player made');
  const roles = await page.evaluate(() => {
    const problems = [];
    // every chapter must declare the job it trains, or the report cannot attribute a call
    CHAPTERS.forEach(c => { if (!c.role || !c.role.en || !c.role.es) problems.push('chapter ' + c.id + ' declares no role'); });
    const txt = document.getElementById('exArea').value;
    if (!txt.includes(UI[lang].repL.roles)) problems.push('report has no roles-practiced section');
    const r = CHAPTERS.find(c => c.quests.includes(1));
    if (!r || !r.role) problems.push('the chapter holding quest 1 declares no role');
    else if (!txt.includes(r.role[lang])) problems.push('report does not name the role a played quest trains');
    return problems;
  });
  fails.push(...roles);
  await page.click('#exClose');

  // ---- 4b. security: hostile pass payloads come out sanitized; peers render safely ----
  const sec = await page.evaluate(() => {
    const out = {};
    out.qrLoaded = typeof qrcode !== 'undefined'; // CSP must not block qr.js (incl. file://)
    const evil = { v: 1, l: 'xx', s: {
      n: '<img src=x onerror=alert(1)>WayTooLongName', xp: '999999999', he: 99,
      d: { a: 1 }, px: -5, py: 1e9, lk: { shirt: 'javascript:alert(1)', style: 'x'.repeat(400) },
      qa: { __proto__: 9, constructor: 9, 5: 'zzz', '-1': 30 }, wr: { bandana: 'url(x)' },
    }};
    const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(evil)))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    history.replaceState(null, '', '#save=' + b64);
    const p = readPass();
    history.replaceState(null, '', location.pathname);
    out.pass = p && {
      nLen: p.s.n.length, nHasTag: p.s.n.includes('<'), xp: p.s.xp, he: p.s.he,
      dIsArray: Array.isArray(p.s.d), px: p.s.px, py: p.s.py,
      shirt: p.s.lk.shirt, styleLen: p.s.lk.style.length, lang: p.l,
      qaKeys: Object.keys(p.s.qa).sort().join(','), bandana: p.s.wr.bandana,
      protoClean: !Object.prototype.hasOwnProperty.call({}, 'polluted') && ({}).x === undefined,
    };
    // peers: hostile name renders via canvas only, no throw
    PEERS = [{ id: 'p1', name: '<script>x</script>OverlongPeerName', w: world, x: px + 1, y: py, dir: 'down' }];
    try { draw(); out.peerDrawOk = true; } catch (e) { out.peerDrawOk = 'THREW ' + e.message; }
    PEERS = [];
    return out;
  });
  if (!sec.qrLoaded) fails.push('qr.js blocked (CSP?)');
  if (!sec.pass) fails.push('sanitized hostile pass was rejected entirely (should be coerced)');
  else {
    if (sec.pass.nLen > 14 || sec.pass.nHasTag === undefined) fails.push('hostile name not clamped: ' + sec.pass.nLen);
    if (sec.pass.xp !== 999) fails.push('xp not clamped: ' + sec.pass.xp);
    if (sec.pass.he !== 3) fails.push('hearts not clamped: ' + sec.pass.he);
    if (!sec.pass.dIsArray) fails.push('d not coerced to array');
    if (sec.pass.px !== 0 || sec.pass.py !== 63) fails.push('coords not clamped: ' + sec.pass.px + ',' + sec.pass.py);
    if (sec.pass.shirt !== '#8B5CF6') fails.push('bad color not rejected: ' + sec.pass.shirt);
    if (sec.pass.styleLen > 12) fails.push('style not clamped');
    if (sec.pass.lang !== 'en') fails.push('bad lang not defaulted: ' + sec.pass.lang);
    if (sec.pass.qaKeys !== '-1,5') fails.push('qa keys not filtered: ' + sec.pass.qaKeys);
    if (sec.pass.bandana !== null) fails.push('bad wear color not rejected');
  }
  if (sec.peerDrawOk !== true) fails.push('peer draw failed: ' + sec.peerDrawOk);

  // ---- 5. Trolley Pass: pass URL round-trips a save; boarding restores it ----
  await page.evaluate(() => { heroName = 'Traveler'; xp = 42; save(); });
  const passUrl = await page.evaluate(() => passURL());
  if (!/#save=[A-Za-z0-9\-_]+$/.test(passUrl)) fails.push('pass URL malformed: ' + passUrl.slice(0, 60));
  await page.evaluate(() => localStorage.removeItem('mq1')); // fresh device
  await page.goto(passUrl);
  await page.reload(); // hash-only navigation doesn't rerun boot; reload does
  await page.waitForTimeout(800);
  const banner = await page.evaluate(() => ({
    shown: !document.getElementById('tpFound').hidden,
    text: document.getElementById('tpFoundTx').textContent,
  }));
  if (!banner.shown) fails.push('pass banner not shown');
  if (!banner.text.includes('Traveler') || !banner.text.includes('42')) fails.push('pass banner text wrong: ' + banner.text);
  await page.click('#tpBoard'); // boarding reloads the page
  await page.waitForSelector('#continueBtn:not([hidden])', { timeout: 10000 }).catch(() => {});
  const boarded = await page.evaluate(() => {
    const b = document.getElementById('continueBtn');
    return b ? { cont: !b.hidden, label: b.textContent } : { cont: false, label: '(no button)' };
  });
  if (!boarded.cont || !boarded.label.includes('Traveler')) fails.push('boarding did not restore the save: ' + JSON.stringify(boarded));

  // ---- 6. Front-profile 2.5D, TILES metadata, and Sonny's program ----
  const front = await page.evaluate(() => {
    const out = {};
    // TILES: every solid glyph (content SOLIDX included) carries a numeric lift
    out.tilesMissing = [...SOLID].filter(g => !TILES[g] || typeof TILES[g].lift !== 'number');
    // the front camera renders a frame without throwing, and the toggle persists
    try { camSet('front'); draw(); out.frontDraw = true; } catch (e) { out.frontDraw = String(e); }
    out.camStored = localStorage.getItem('mqcam');
    try { camSet('top'); draw(); } catch (e) { out.frontDraw = 'top restore threw: ' + e; }
    // the fetch cycle: exactly 4 of every 7, cycle after cycle
    const dog = {};
    let a = 0; for (let i = 0; i < 7; i++) a += fetchRoll(dog) ? 1 : 0;
    let b = 0; for (let i = 0; i < 7; i++) b += fetchRoll(dog) ? 1 : 0;
    out.fetch7 = a; out.fetch14 = a + b;
    // food-driven: a fed dog's cycle rolls at exactly 6 of 7
    const fed = { fedT: performance.now() };
    let f = 0; for (let i = 0; i < 7; i++) f += fetchRoll(fed) ? 1 : 0;
    out.fetchFed = f;
    // BFS pathing: from a walkable hq tile, a step toward another exists,
    // and a target inside a wall is correctly unreachable
    out.bfs = (() => {
      const cr = { world: 'hq', x: 1, y: 1 };
      const step = bfsStep(cr, 3, 1);
      const blocked = bfsStep(cr, 0, 0); // (0,0) is border wall
      return { step: Array.isArray(step), blocked: blocked === null };
    })();
    // ground decals fade on their own
    const n0 = DECALS.length;
    DECALS.push({ world, x: 1, y: 1, kind: 'hole', until: Date.now() - 10 });
    drawDecals(0, 0);
    out.decalPruned = DECALS.length === n0;
    // every DECOR row points at art the engine (or the pack) actually has
    out.decorOk = typeof DECOR === 'undefined' || DECOR.every(d => !!DECODRAW[d.deco]);
    // the pack declares a default camera and the facades declare their windows
    out.camdef = typeof CAMDEF !== 'undefined' ? CAMDEF : null;
    out.facadeWin = ['B', 'Q', 'Z'].every(g => TILES[g] && Array.isArray(TILES[g].win));
    // the lit-windows pass renders under a mocked night clock without throwing
    out.winPass = (() => {
      const RD = Date;
      try {
        Date = class extends RD { getHours() { return 22; } getMinutes() { return 0; } };
        drawWindows(CW(), 0, 0);
        Date = RD; return true;
      } catch (e) { Date = RD; return String(e); }
    })();
    // camera #4: three.js is vendored and a 3D frame actually renders
    out.threeOk = !!window.THREE;
    try { camSet('3d'); out.d3 = (typeof draw3d === 'function') ? draw3d() : 'missing'; }
    catch (e) { out.d3 = String(e); }
    try { camSet('top'); draw(); } catch (e) { out.d3 = 'top restore threw: ' + e; }
    // the ball button exists and Sonny's strings are in both languages
    out.ballBtn = !!document.getElementById('ball');
    out.langOk = ['ballLb', 'fetchYes', 'fetchNo', 'howl', 'beagleTreat', 'camFront']
      .every(k => UI.en[k] && UI.es[k]);
    return out;
  });
  if (front.tilesMissing.length) fails.push('TILES rows missing for solid glyphs: ' + front.tilesMissing.join(','));
  if (front.frontDraw !== true) fails.push('front camera draw threw: ' + front.frontDraw);
  if (front.camStored !== 'front') fails.push('front camera choice not persisted: ' + front.camStored);
  if (front.fetch7 !== 4) fails.push(`fetch cycle: ${front.fetch7}/7 fetched, expected exactly 4`);
  if (front.fetch14 !== 8) fails.push(`fetch across two cycles: ${front.fetch14}/14, expected 8`);
  if (front.fetchFed !== 6) fails.push(`fed fetch cycle: ${front.fetchFed}/7 fetched, expected exactly 6`);
  if (!front.bfs.step) fails.push('bfsStep found no path between open hq tiles');
  if (!front.bfs.blocked) fails.push('bfsStep pathed into a wall');
  if (!front.decalPruned) fails.push('expired ground decal not pruned');
  if (front.decorOk !== true) fails.push('DECOR references unknown deco art');
  if (!['top', 'front', 'iso'].includes(front.camdef)) fails.push('CAMDEF missing or invalid: ' + front.camdef);
  if (!front.facadeWin) fails.push('facade tiles missing win metadata');
  if (front.winPass !== true) fails.push('lit-windows pass threw: ' + front.winPass);
  if (!front.threeOk) fails.push('three.js not loaded (vendor/three.min.js missing?)');
  if (front.d3 !== true) fails.push('3D camera did not render: ' + front.d3);
  if (!front.ballBtn) fails.push('ball button missing from the HUD');
  if (!front.langOk) fails.push('Sonny/camera strings missing in EN or ES');

  // ---- 7. El Parque: leash → rainbow bridge → chill session → recap card ----
  const park = await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms));
    const out = {};
    const w = WORLDS.pk;
    out.pkOk = !!w && w.W === 24 && w.H === 12 && !!PORTALS.pk && !!PORTALS.pk['2'];
    // the lawn is reachable from the bridge entry (a dog's-eye flood)
    const rs = dogReach({ world: 'pk', x: 2, y: 6 });
    out.lawnReach = !!rs[4 * w.W + 17] && !!rs[3 * w.W + 17]; // beside the doghouse
    out.waterBlocked = !rs[1 * w.W + 3]; // river tiles are not walkable
    // Sonny lives on the street
    const sonny = CRIT.find(c => c.kind === 'beagle' && c.name === 'Sonny');
    out.sonny = !!sonny && sonny.world === 'st';
    if (!sonny) return out;
    // leash him: stand adjacent, press the button, ride the 900ms transition
    world = 'st'; px = fx = 21; py = fy = 11; setWorldTag();
    sonny.x = 22; sonny.y = 11; sonny.fx = 22; sonny.fy = 11; sonny.moving = false; sonny.task = null;
    petCrit = sonny; petTarget = 'beagle';
    document.getElementById('leash').click();
    await sleep(1200);
    out.inPark = world === 'pk' && sonny.world === 'pk' && sonny.follow === true;
    // a treat in the park counts toward the recap
    petCrit = sonny; petTarget = 'beagle';
    document.getElementById('treat').click();
    out.treatCounted = PARK.t === 1;
    // bandana cycles and persists
    petCrit = sonny; petTarget = 'beagle';
    document.getElementById('band').click();
    out.band = !!sonny.band;
    out.bandStored = !!(JSON.parse(localStorage.getItem('mqpark') || '{}').band || {}).Sonny;
    // adopt a dog by name
    document.getElementById('adoptTitle').textContent = '';
    document.getElementById('adoptName').value = 'Nube';
    document.getElementById('adoptGo').click();
    out.adopted = CRIT.some(c => c.kind === 'beagle' && c.name === 'Nube' && c.world === 'pk');
    out.adoptStored = (JSON.parse(localStorage.getItem('mqpark') || '{}').dogs || []).length === 1;
    // walk out over the bridge: land on the exit tile and let the portal fire
    px = fx = 1; py = fy = 6; moving = true; mt = 1; dir = 'left'; px = 0; portalT = 0;
    await sleep(300);
    out.exited = world === 'st';
    out.card = !document.getElementById('parkCard').hidden;
    out.sonnyHome = sonny.world === 'st' && sonny.follow === false;
    document.getElementById('pkClose').click();
    // strings in both languages
    out.langOk = !!(['leashLb', 'parkArrive', 'parkTitle', 'parkSum', 'parkLove', 'parkTeaser',
      'adoptLb', 'adoptAsk', 'adoptDone', 'bandLb', 'parkFull', 'loveLb', 'loveLines']
      .every(k => UI.en[k] && UI.es[k]) && UI.en.locs.pk && UI.es.locs.pk && UI.en.arrive.pk && UI.es.arrive.pk);
    // cleanup so this section leaves no park residue for reruns
    localStorage.removeItem('mqpark');
    return out;
  });
  ['pkOk', 'lawnReach', 'waterBlocked', 'sonny', 'inPark', 'treatCounted', 'band', 'bandStored',
    'adopted', 'adoptStored', 'exited', 'card', 'sonnyHome', 'langOk'].forEach(k => {
    if (park[k] !== true) fails.push('park: ' + k + ' failed (' + JSON.stringify(park[k]) + ')');
  });

  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log(`OK — ${stat.quests} quests, maxXP ${stat.maxXP}, all invariants hold.`);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
