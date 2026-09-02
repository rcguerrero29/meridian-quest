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
  const valWarns = warns.filter(w => /^(WORLD|PORTAL|REACH|ROOM)/.test(w));
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
    // every district's Saturday is written in both languages: three endings, the burnout,
    // and the toast that opens the next lot (or says nothing opens). A chapter wired
    // to a missing key would print "undefined" on the one screen the player waited for.
    CHS().forEach((c, i) => { const k = epiKeys(i, i === CHS().length - 1);
      [k.pre + '1', k.pre + '2', k.pre + '3', k.go, k.open].forEach(key => {
        if (typeof UI.en[key] !== 'string' || typeof UI.es[key] !== 'string') problems.push('district ' + c.id + ': strings.js has no ' + key + ' in both languages'); }); });
    Object.values(WORLDS).forEach(w => w.npcs.forEach(n => { if (!lookOf(n)) problems.push('no look for ' + n.npc + ' (' + n.key + ')'); }));

    if (auditReach().length) problems.push('boot reachability: ' + auditReach().join(' | '));
    // post-construction: the Studio (and Xochi) must be reachable once La Obra completes
    done.add(12); done.add(13); world = 'st'; px = fx = 2; py = fy = 10; applyStaged();
    if (auditReach().length) problems.push('post-obra reachability: ' + auditReach().join(' | '));
    if (isSolid(px, py)) problems.push('the staged build left the hero inside a wall');
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
    if (ribbonUp()) problems.push('El Mercado open before the first district closed');
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
    if (!ribbonUp()) problems.push('El Mercado did not open on the handover');
    if (WORLDS.st.rows[13][6] !== 'M') problems.push('mercado door missing from the street');
    // Week One included La Obra, so the Studio must be standing and Lupe streetside
    if (WORLDS.st.rows[5][21] !== 'O') problems.push('Studio door missing after a rewind + rebuild');
    { const lu = WORLDS.st.npcs.find(n => n.key === 'e');
      if (!lu || lu.x !== 7 || lu.y !== 7) problems.push('Lupe did not move streetside after a rewind + rebuild'); }
    if (auditReach().length) problems.push('post-mercado reachability: ' + auditReach().join(' | '));

    // every district from the mercado on closes at `need`, not at the full pack; every one
    // but the last hands over to the next lot, and the last returns you to the city
    for (let ci = 1; ci < CHAPTERS.length; ci++) {
      const c = CHAPTERS[ci], last = ci === CHAPTERS.length - 1;
      if (!(c.need < c.quests.length)) problems.push(`district ${c.id}: need must be lower than its pack size`);
      c.quests.slice(0, c.need).forEach(i => done.add(i));
      if (!chDue()) problems.push(`district ${c.id} did not close at its need threshold`);
      finish();
      if (!document.getElementById('epi').textContent) problems.push(`district ${c.id}: no ending text`);
      if (document.getElementById('endGo').hidden) problems.push(`district ${c.id}: no way off the ending screen`);
      const wantStay = document.getElementById('endGo').textContent === UI[lang].endStay;
      if (last && !wantStay) problems.push('final district still offers a handover instead of returning to the city');
      if (!last && wantStay) problems.push(`district ${c.id} offered "stay" with districts still to come`);
      document.getElementById('endGo').click();
      if (chSeen !== ci + 1) problems.push(`district ${c.id}: the cursor did not advance`);
      if (isSolid(px, py)) problems.push(`district ${c.id}: the handover dropped the hero inside a wall`);
      if (!last && auditReach().length) problems.push(`after ${c.id}: ` + auditReach().join(' | '));
    }
    if (chSeen !== CHAPTERS.length) problems.push('final acknowledgement did not close the last chapter');
    if (chDue()) problems.push('an ending is still due after the last chapter closed');

    // rewind: a fresh run must not inherit a shop it never earned
    document.getElementById('end').hidden = true;
    done = new Set(); chSeen = 0; hearts = 3; applyGrowth();
    world = 'hq'; px = fx = 10; py = fy = 11;
    if (ribbonUp()) problems.push('replay left El Mercado standing');
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
    if (!ribbonUp()) problems.push('burnout did not open the next district');
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

    // the ❗ on the world tag means what it means everywhere: somebody in here has
    // something to say. It was hardcoded to hq, so the office promised one forever.
    { const el = document.getElementById('worldTag'), keep = new Set(done);
      world = 'hq'; setWorldTag();
      if (!el.textContent.includes('❗')) problems.push('the office hides its ❗ while quests are still open there');
      WORLDS.hq.npcs.forEach(n => (n.q || []).forEach(qi => done.add(qi)));
      setWorldTag();
      if (el.textContent.includes('❗')) problems.push('the office still promises a ❗ with nothing left to answer');
      done = keep; setWorldTag(); }

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
    else if (r.industry && !txt.includes(r.industry[lang] + ' · ' + r.role[lang])) problems.push('report does not put the industry before the role');
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
    out.cams = CAMS.slice();
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
  // the engine's own CAMS list is the single source of truth — this used to be a
  // third hand-written whitelist and it went stale the moment 3D was added.
  if (!front.cams.includes(front.camdef)) fails.push('CAMDEF missing or invalid: ' + front.camdef);
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
    // breeds: adopt a chocolate lab, and a duplicate name is refused
    adoptB = 'lab'; adoptC = '#6E4B2F';
    document.getElementById('adoptName').value = 'Oso';
    document.getElementById('adoptGo').click();
    out.labAdopted = CRIT.some(c => c.kind === 'lab' && c.name === 'Oso' && c.c === '#6E4B2F');
    const nDogs = CRIT.filter(c => DOGK.has(c.kind)).length;
    document.getElementById('adoptName').value = 'Sonny';
    document.getElementById('adoptGo').click();
    out.dupBlocked = CRIT.filter(c => DOGK.has(c.kind)).length === nDogs;
    // the star is a single instance: a player-made 'Sonny' egg must not double him
    spawnCustom({ n: 'Sonny', w: 'st', x: 9, y: 11 });
    out.oneSonny = CRIT.filter(c => DOGK.has(c.kind) && c.name === 'Sonny').length === 1;
    // no adoption limit: dogs 3-6 all land (the old cap was 4)
    for (const nm of ['Kiko', 'Luna', 'Rex', 'Toby']) {
      adoptB = 'chi'; adoptC = '#C9975C';
      document.getElementById('adoptName').value = nm;
      document.getElementById('adoptGo').click();
    }
    out.noLimit = CRIT.filter(c => DOGK.has(c.kind) && dogRecord(c)).length === 6;
    // every adopted dog has one particular friend in the city
    out.friends = parkPrefs.dogs.every(d => d.friend && d.friend.w && d.friend.key);
    // rename: works for an adopted dog, migrates its records, refuses 'Sonny'
    const nube = CRIT.find(c => c.name === 'Nube');
    parkPrefs.band.Nube = '#C0392B'; parkPrefs.train.Nube = { sit: 2 };
    renTarget = nube; document.getElementById('renName').value = 'Nieve';
    document.getElementById('renGo').click();
    out.renamed = nube.name === 'Nieve' && dogRecord(nube).n === 'Nieve'
      && parkPrefs.band.Nieve === '#C0392B' && parkPrefs.train.Nieve.sit === 2;
    renTarget = nube; document.getElementById('renName').value = 'sonny';
    document.getElementById('renGo').click();
    out.renDupBlocked = nube.name === 'Nieve';
    // rehome: the dog moves in with its friend, record kept — never deleted
    const oso = CRIT.find(c => c.name === 'Oso');
    px = fx = 10; py = fy = 10; // an empty corner: Oso alone is nearest
    oso.x = 9; oso.y = 10; oso.fx = 9; oso.fy = 10; oso.task = null;
    petCrit = oso; petTarget = 'lab';
    document.getElementById('cmd').click();
    out.rehBtn = !document.getElementById('cmdReh').hidden;
    document.getElementById('cmdReh').click();
    const orec = parkPrefs.dogs.find(d => d.n === 'Oso');
    out.rehomed = !!orec && orec.rehomed === true && oso.world === orec.friend.w
      && CRIT.includes(oso);
    // Sonny gets no rename/rehome buttons
    px = fx = 8; py = fy = 6;
    sonny.x = 9; sonny.y = 6; sonny.fx = 9; sonny.fy = 6; sonny.world = 'pk'; sonny.task = null;
    document.getElementById('cmd').click();
    out.sonnyProtected = document.getElementById('cmdRen').hidden && document.getElementById('cmdReh').hidden;
    document.getElementById('dogPX').click();
    // training: with luck pinned, Sit lands and Come recalls from across the lawn
    const MR = Math.random; Math.random = () => 0.01;
    sonny.task = null; sonny.layT = 0; sonny.stayT = 0;
    px = fx = 8; py = fy = 6;
    dogCmd('sit');
    out.sitOk = sonny.sit === true;
    dogCmd('stay');
    out.stayOk = sonny.stayT > performance.now();
    sonny.stayT = 0; sonny.x = 17; sonny.y = 2; sonny.fx = 17; sonny.fy = 2; sonny.moving = false; sonny.next = 0;
    dogCmd('come');
    Math.random = MR;
    const runner = CRIT.find(c => c.task && c.task.type === 'come') || sonny;
    const t1 = Date.now();
    while (Date.now() - t1 < 6000) {
      await sleep(150);
      if (!runner.task && Math.abs(runner.x - px) + Math.abs(runner.y - py) <= 1) break;
    }
    out.comeOk = Math.abs(runner.x - px) + Math.abs(runner.y - py) <= 1;
    // the agility course exists and is reachable
    out.agility = WORLDS.pk.rows[8].includes('3.4.5') &&
      AGILITY.every(([ax, ay]) => !!dogReach({ world: 'pk', x: 2, y: 6 })[ay * WORLDS.pk.W + ax]);
    // swipe works on the 3D canvas too
    held = null; ctl = 'swipe';
    document.getElementById('world').hidden = false; // the trolley-pass section left the intro up
    const c3 = document.getElementById('cv3');
    c3.dispatchEvent(new PointerEvent('pointerdown', { pointerId: 7, clientX: 100, clientY: 100 }));
    c3.dispatchEvent(new PointerEvent('pointermove', { pointerId: 7, clientX: 170, clientY: 104 }));
    out.swipe3d = held === 'right';
    c3.dispatchEvent(new PointerEvent('pointerup', { pointerId: 7, clientX: 170, clientY: 104 }));
    held = null;
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
    'adopted', 'adoptStored', 'labAdopted', 'dupBlocked', 'oneSonny', 'sitOk', 'stayOk', 'comeOk',
    'noLimit', 'friends', 'renamed', 'renDupBlocked', 'rehBtn', 'rehomed', 'sonnyProtected',
    'agility', 'swipe3d', 'exited', 'card', 'sonnyHome', 'langOk'].forEach(k => {
    if (park[k] !== true) fails.push('park: ' + k + ' failed (' + JSON.stringify(park[k]) + ')');
  });

  // ---- swiping "up" must walk up the SCREEN at every camera rotation ----
  // The bug this locks out: engine.js referenced T3 zero times, so movement was pure
  // world-space and ignored the 3D camera's yaw. Un-rotated it was an exact identity
  // (which is why it felt fine), and every turn of the ↻ button desynced it.
  const rot = await page.evaluate(() => {
    const problems = [];
    const before = { cam: camMode, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0, px, py, world };
    camSet('3d');
    // an open patch to walk on, so a wall never masks a wrong direction
    world = 'st'; px = fx = 6; py = fy = 12; moving = false; held = null;
    // screen-up, screen-right etc. must map to these world deltas per quarter-turn
    const EXPECT = [
      { yaw: 0,            up: [0,-1], right: [1,0]  },
      { yaw: Math.PI / 2,  up: [-1,0], right: [0,-1] },
      { yaw: Math.PI,      up: [0,1],  right: [-1,0] },
      { yaw: 3*Math.PI/2,  up: [1,0],  right: [0,1]  },
    ];
    EXPECT.forEach(({ yaw, up, right }) => {
      T3.yaw = yaw;
      [['up', up], ['right', right]].forEach(([intent, want]) => {
        const wd = worldDir(intent), got = DIRS[wd];
        if (got[0] !== want[0] || got[1] !== want[1])
          problems.push(`at yaw ${Math.round(yaw*180/Math.PI)}° swiping "${intent}" moves [${got}] — expected [${want}]`);
        // and the facing the renderer interpolates with must BE that world direction,
        // or the hero slides one way while walking another
        if (DIRS[wd][0] !== got[0] || DIRS[wd][1] !== got[1])
          problems.push(`at yaw ${Math.round(yaw*180/Math.PI)}° facing desyncs from the move`);
      });
      // a full turn must come back to itself
      if (worldDir(worldDir(worldDir(worldDir('up')))) !== 'up')
        problems.push(`four quarter-turns from yaw ${yaw} did not return to "up"`);
    });
    // the ↻ button must step in QUARTER turns — a 4-way grid cannot be driven from 45°
    T3.yaw = 0;
    const btn = document.getElementById('rot3d');
    if (!btn) problems.push('the 3D rotate button is missing');
    else { btn.click(); if (Math.abs(T3.yaw - Math.PI/2) > 1e-9)
      problems.push(`↻ stepped ${(T3.yaw*180/Math.PI).toFixed(1)}° — must be 90°, or half the stops are unmappable`); }
    // the 2D cameras must be completely unaffected
    camSet('front'); T3.yaw = Math.PI / 2;
    if (worldDir('up') !== 'up') problems.push('camera rotation leaked into a 2D camera');
    T3.yaw = before.yaw; camSet(before.cam);
    world = before.world; px = fx = before.px; py = fy = before.py; held = null; moving = false;
    return problems;
  });
  fails.push(...rot);

  // ---- maps and doors must be structurally plausible, not just reachable ----
  // Added 2026-09-01 after the owner asked why TDD had not caught "broken doors and
  // non-realistic maps". Honest result: it would NOT have — every door in the shipped
  // maps passes these rules, so what looks wrong is RENDERING, not layout. Kept as a
  // guard so a future map edit cannot introduce the structural version of the problem.
  // (First draft of these rules produced 10 findings and all 10 were false positives:
  // a door on the map edge opens to the outside, and a portal may be stairs or the
  // trolley rather than a door. A test that cries wolf is worse than no test.)
  const maps = await page.evaluate(() => {
    const problems = [];
    const open1 = c => c === null || !SOLID.has(c);   // off-map counts as outside
    Object.entries(WORLDS).forEach(([id, w]) => {
      for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) {
        const ch = w.rows[y][x];
        if (!DOORSET.has(ch)) continue;
        const N = y > 0 ? w.rows[y-1][x] : null, S = y < w.H-1 ? w.rows[y+1][x] : null;
        const E = x < w.W-1 ? w.rows[y][x+1] : null, W = x > 0 ? w.rows[y][x-1] : null;
        const sides = [N, S, E, W];
        if (!sides.some(c => c !== null && SOLID.has(c)))
          problems.push(`${id} (${x},${y}) '${ch}': a door with no wall beside it`);
        if (!(open1(N) && open1(S)) && !(open1(E) && open1(W)))
          problems.push(`${id} (${x},${y}) '${ch}': a door you cannot walk through`);
        if (sides.every(c => c !== null && !SOLID.has(c)))
          problems.push(`${id} (${x},${y}) '${ch}': a door set into nothing (open on all four sides)`);
        sides.forEach((c, i) => { if (c !== null && DOORSET.has(c))
          problems.push(`${id} (${x},${y}) '${ch}': doors side by side with '${c}' (${'NSEW'[i]}) — reads as a hole`); });
      }
    });
    // a portal need not be a door (stairs, the trolley) but you must be able to stand on it
    Object.entries(PORTALS).forEach(([from, m]) => Object.keys(m).forEach(ch => {
      if (SOLID.has(ch)) problems.push(`PORTAL ${from}:'${ch}' is a solid tile — unreachable`);
    }));
    return problems;
  });
  fails.push(...maps);

  // ---- a door you are standing on must fire once its cooldown ends ----
  // The bug: portals were only ever checked on the frame a STEP ENDS. Walk out of HQ,
  // turn round, walk back — that step lands inside portalT's 900ms anti-ping-pong
  // window, so the tile is looked at once, rejected, and never looked at again. The
  // door ignores you until you step off it and step on again. The fix is a standing
  // check, not a shorter cooldown (a shorter cooldown moves the dead window, it does
  // not remove it). No wall-clock walking here: the first version of this test went
  // red and green on the same code depending on how fast headless Chromium ran.
  const reenter = await page.evaluate(async () => {
    const problems = [];
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const before = { cam: camMode, world, px, py };
    camSet('top');
    // 1. the ordinary case: a step that ENDS on HQ's front door goes through it
    world = 'hq'; px = fx = 10; py = fy = 13; moving = true; mt = 1; held = null; portalT = 0; portalHold = '';
    await wait(250);
    if (world !== 'st' || px !== 14 || py !== 1) problems.push(`a step ending on HQ’s door left you in ${world} (${px},${py}) — expected the doorstep st (14,1)`);
    // 2. the bug: standing on the street door, arrived DURING the cooldown
    world = 'st'; px = fx = 14; py = fy = 0; moving = false; held = null; portalHold = '';
    portalT = performance.now() + 100000;
    await wait(250);
    if (world !== 'st') problems.push('the door fired inside its anti-ping-pong window');
    portalT = 0;                        // the window closes while you are still standing there
    await wait(400);
    if (world !== 'hq') problems.push('standing on a door after its cooldown ended, nothing re-checked the ground under your feet');
    // 3. the guard that makes the standing check safe: the tile a warp SET YOU DOWN on
    //    never fires until you step off it — even if a pack lands you on a portal
    world = 'hq'; px = fx = 10; py = fy = 13; moving = false; held = null; portalT = 0;
    portalHold = 'hq:10,13';
    await wait(250);
    if (world !== 'hq') problems.push('the tile a warp set you down on fired by itself — that is the ping-pong the cooldown existed to stop');
    portalHold = '';                    // …and once the hold is gone, the same tile is a door again
    await wait(250);
    if (world !== 'st') problems.push('with the hold cleared, standing on the door still did nothing');
    // Y (the trolley stop) must stay step-only: a menu you dismissed must not reopen under your feet
    world = 'st'; px = fx = 0; py = fy = 1; moving = false; held = null; portalT = 0; portalHold = '';
    document.getElementById('travel').hidden = true;
    await wait(250);
    if (!document.getElementById('travel').hidden) problems.push('the trolley menu reopened under your feet while you stood still');
    camSet(before.cam);
    world = before.world; px = fx = before.px; py = fy = before.py;
    held = null; moving = false; portalT = 0; portalHold = ''; setWorldTag();
    return problems;
  });
  fails.push(...reenter);

  // ---- in 3D a door stands in its wall, and a wall has a face on every side ----
  // What the eyeball pass saw (IDEAS §15.3): the door plane had no rotation, so every
  // door in a north-south wall stood 90° off its wall, floating; every north-south wall
  // in HQ was a bare purple slab because only the ±Z faces of the box carried the art;
  // a paper-thin door vanished at the two edge-on camera stops; and a slot showed above
  // every door because the plane was 1 unit tall in a 1.1-unit wall.
  const doors3d = await page.evaluate(() => {
    const problems = [];
    const before = { cam: camMode, world, px, py, yaw: (typeof T3 !== 'undefined' && T3) ? T3.yaw : 0 };
    camSet('3d'); world = 'hq'; px = fx = 10; py = fy = 11; moving = false; held = null;
    if (!draw3d() || T3.fail) { problems.push('3D did not render headless — the doors could not be checked'); return problems; }
    const w = CW();
    const solid = (x, y) => (x < 0 || y < 0 || x >= w.W || y >= w.H) ? true : SOLID.has(w.grid[y][x]); // off-map is a wall
    let want = 0;
    for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) if (DOORSET.has(w.rows[y][x]) && !SOLID.has(w.grid[y][x])) want++;
    let doors = 0, lintels = 0, glows = 0;
    T3.group.children.forEach(o => {
      const u = o.userData || {};
      if (u.door) {
        doors++;
        const ns = solid(u.x, u.y - 1) && solid(u.x, u.y + 1) && !(solid(u.x - 1, u.y) && solid(u.x + 1, u.y));
        const rot = Math.abs(o.rotation.y), exp = ns ? Math.PI / 2 : 0;
        if (Math.abs(rot - exp) > 1e-6)
          problems.push(`hq door (${u.x},${u.y}) is turned ${Math.round(rot * 180 / Math.PI)}° but its wall runs ${ns ? 'north-south' : 'east-west'}`);
        if (!(o.geometry.parameters && o.geometry.parameters.depth > 0))
          problems.push(`hq door (${u.x},${u.y}) has no thickness — it vanishes edge-on`);
      }
      if (u.lintel) lintels++;
      if (u.glow) glows++;
      if (u.wall) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        const bare = [0, 1, 4, 5].filter(i => !ms[i] || !ms[i].map);
        if (bare.length) problems.push(`wall '${u.g}' at (${u.x},${u.y}) is a bare slab on ${bare.length} of its 4 sides`);
      }
    });
    if (doors !== want) problems.push(`hq has ${want} doors on the map and ${doors} standing in 3D`);
    if (lintels < doors) problems.push(`${doors - lintels} of hq's ${doors} doors have a see-through slot above them (no lintel)`);
    if (glows < doors) problems.push(`${doors - glows} of hq's ${doors} doors do not say "this one opens" in 3D`);
    T3.yaw = before.yaw; camSet(before.cam);
    world = before.world; px = fx = before.px; py = fy = before.py; held = null; moving = false;
    return problems;
  });
  fails.push(...doors3d);

  // ---- 3D textures are baked at the screen's resolution, not at 1x ----
  // The blur (IDEAS §15.1, measured): every 3D texture was baked at 32px a tile while
  // the renderer output at up to 3x device pixels — a 2.9x–4.0x magnification of the
  // source art. The two earlier "blur fixes" on main raised the OUTPUT resolution and
  // added mipmaps; neither can sharpen a texture that is being magnified. The fix is
  // one factor K = the renderer's pixel ratio, applied at every bake site.
  const bake = await page.evaluate(() => {
    const problems = [];
    const before = { cam: camMode, world, px, py };
    camSet('3d'); world = 'hq'; px = fx = 10; py = fy = 11; moving = false; held = null;
    if (!draw3d() || T3.fail) { problems.push('3D did not render headless — the bakes could not be checked'); return problems; }
    // headless is 1x, where the old 1x bake was accidentally right — so stand in for a
    // retina phone: tell the renderer it draws at 2x and everything must re-bake at 2x
    const pr0 = T3.renderer.getPixelRatio();
    T3.renderer.setPixelRatio(2); draw3d();
    const K = T3.K;
    if (K !== 2) { problems.push(`renderer at 2x but the bake factor is ${K}`); T3.renderer.setPixelRatio(pr0); return problems; }
    const w = CW();
    let ground = 0, tiles = 0, canopy = 0;
    T3.group.traverse(o => {
      const ms = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
      ms.forEach(m => {
        if (!m.map || !m.map.image) return;
        const im = m.map.image, u = o.userData || {};
        if (im.width === w.W * 32 * K && im.height === w.H * 32 * K) { ground++; return; }
        if (im.width === 40 * K && im.height === 40 * K) { canopy++; return; }
        if (im.width === 32 * K && im.height === 32 * K) { tiles++; return; }
        problems.push(`a ${u.door ? 'door' : u.wall ? 'wall' : 'prop'} texture is ${im.width}x${im.height} — not ${32 * K}x${32 * K} (K=${K})`);
      });
    });
    if (!ground) problems.push(`the ground texture is not ${w.W * 32 * K}x${w.H * 32 * K} (K=${K})`);
    if (!tiles) problems.push('no tile texture found at K resolution');
    // actors: the live billboards must be baked at K too, or people go soft while walls stay sharp
    const live = T3.pool.filter(p => p.live);
    if (!live.length) problems.push('no live actor billboards after a draw');
    live.forEach(p => { if (p.c.width !== 36 * K || p.c.height !== 40 * K)
      problems.push(`an actor billboard is ${p.c.width}x${p.c.height} — not ${36 * K}x${40 * K}`); });
    // and back: a DPR change (fullscreen, a window dragged between monitors) re-bakes both ways
    T3.renderer.setPixelRatio(pr0); draw3d();
    if (T3.K !== Math.min(3, Math.max(1, Math.round(pr0)))) problems.push(`back at ${pr0}x the bake factor stayed ${T3.K}`);
    const g1 = T3.group.children.find(o => o.material && o.material.map && o.material.map.image.width === w.W * 32 * T3.K);
    if (!g1) problems.push('the ground did not re-bake when the pixel ratio changed back');
    camSet(before.cam); world = before.world; px = fx = before.px; py = fy = before.py; held = null; moving = false;
    return problems;
  });
  fails.push(...bake);

  // ---- seasons: a season changes colour, never design (IDEAS §15.9) ----
  // The bridge's six bands were literal hex inside the engine, which is why no palette
  // could ever reach them. Now world art goes through art(key, fallback); a season is
  // content (SEASONS in the pack's config) that overrides art keys, arriving on its own
  // by date with a Settings override. The engine must not know a season's name.
  const season = await page.evaluate(() => {
    const problems = [];
    if (typeof art !== 'function' || typeof seasonNow !== 'function' || typeof seasonSet !== 'function') {
      problems.push('the season seam (art / seasonNow / seasonSet) is missing'); return problems; }
    if (typeof SEASONS === 'undefined' || !Object.keys(SEASONS).length) { problems.push('the pack declares no SEASONS'); return problems; }
    const [id, S] = Object.entries(SEASONS)[0];
    const pick0 = seasonPick;
    // off: the fallback is what you get, and the bridge paints its year-round bands
    seasonSet('off');
    if (art('bridge', 'X') !== 'X') problems.push('with the season off, art() did not return the fallback');
    const bake = () => { const c = document.createElement('canvas'); c.width = 32; c.height = 32;
      const o = ctx; ctx = c.getContext('2d'); try { TILEDRAW['^']({ sx: 0, sy: 0, x: 0, y: 0, canopy: () => {} }); } finally { ctx = o; }
      const d = ctx === o ? c.getContext('2d').getImageData(16, 5, 1, 1).data : null;
      return '#' + [d[0], d[1], d[2]].map(v => v.toString(16).padStart(2, '0')).join(''); };
    const off = bake();
    // forced on: the pack's palette reaches the bridge, and only the colours changed
    seasonSet(id);
    if (seasonNow() !== id) problems.push(`forcing season "${id}" did not make it current`);
    if (art('bridge', 'X') !== S.art.bridge) problems.push('with the season forced, art("bridge") is not the pack palette');
    const on = bake();
    if (on.toLowerCase() !== S.art.bridge[0].toLowerCase()) problems.push(`the bridge's first band is ${on}, not the season's ${S.art.bridge[0]}`);
    if (on === off) problems.push('the season changed nothing on the bridge');
    // auto by date: inside the window it arrives on its own; outside, it is gone
    seasonSet('auto');
    const [fm, fd] = S.from, [tm, td] = S.to;
    if (seasonNow(new Date(2026, fm - 1, fd)) !== id) problems.push('auto: the first day of the window is not in season');
    if (seasonNow(new Date(2026, tm - 1, td)) !== id) problems.push('auto: the last day of the window is not in season');
    if (seasonNow(new Date(2026, 5, 15)) !== null) problems.push('auto: mid-June is in season');
    // the choice persists, and a change re-bakes the 3D world
    seasonSet('off');
    let stored = null; try { stored = localStorage.getItem('mqseason'); } catch (e) {}
    if (stored !== 'off') problems.push('the season choice did not persist');
    const d0 = (typeof T3 !== 'undefined' && T3) ? T3.dirty : 0;
    seasonSet(id);
    if (typeof T3 !== 'undefined' && T3 && T3.dirty === d0) problems.push('changing the season did not tell the 3D camera to rebuild');
    // the Settings row exists and is built from content, not hardcoded
    const row = document.getElementById('seasonRow');
    if (!row) problems.push('no #seasonRow in Settings');
    else if (![...row.querySelectorAll('button')].some(b => b.dataset.sn === id)) problems.push(`Settings has no button for season "${id}"`);
    seasonSet(pick0);
    return problems;
  });
  fails.push(...season);

  // ---- a door says where it leads ----
  // The cold read (IDEAS §15.8) found all five door glyphs pixel-identical: an office
  // door, a shop entrance and the mercado's door were the same brown, so nothing told a
  // newcomer which one goes somewhere. The body stays shared in the engine; DOORLOOK in
  // the pack colours each door for its destination.
  const doorLook = await page.evaluate(() => {
    const problems = [];
    if (typeof DOORLOOK === 'undefined') { problems.push('the pack declares no DOORLOOK — every door is the same brown'); return problems; }
    const bake = g => { const c = document.createElement('canvas'); c.width = 32; c.height = 32;
      const o = ctx; ctx = c.getContext('2d'); try { TILEDRAW[g]({ sx: 0, sy: 0, x: 0, y: 0, t: 0, canopy: () => {} }); } finally { ctx = o; }
      return c.getContext('2d').getImageData(0, 0, 32, 32).data.join(','); };
    const seen = {};
    [...DOORSET].forEach(g => { const k = bake(g); if (seen[k]) problems.push(`doors '${seen[k]}' and '${g}' are pixel-identical`); else seen[k] = g; });
    Object.keys(DOORLOOK).forEach(g => { if (!DOORSET.has(g)) problems.push(`DOORLOOK names '${g}', which is not a door glyph`); });
    return problems;
  });
  fails.push(...doorLook);

  // ---- iso reads a pack tile's declared height (Don Güero, 2026-09-02: a declared lift:13
  // window rendered 6px short of the wall beside it because IZH was a hardcoded table) ----
  {
    const iso = await page.evaluate(() => typeof izh === 'function' ? { win: izh('|'), wall: izh('#'), unknown: izh('¤') } : null);
    if (!iso) fails.push('iso has no izh() height lookup that reads TILES.lift');
    else { if (iso.win !== iso.wall) fails.push(`iso draws the window ${iso.win} tall and the wall ${iso.wall} — a notch in the north wall`);
           if (iso.unknown !== 14) fails.push('iso lost its 14px default for an undeclared glyph'); }
  }

  // ---- a piece of furniture is drawn for the camera that sees it ----
  // Owner 2026-09-02: "some furniture still looks bad like the table and fences and the
  // coffee machine". Root cause, from the frames: every prop was drawn from ABOVE and
  // then stood up as a cutout in the front and 3D cameras — a gingham table stood up is
  // a dartboard. The professional fix is a second drawing per prop, made for the view
  // that sees it standing (HD-2D games draw every object from the front, never from
  // above). TILESIDE holds those; a glyph without one falls back to its top-down art;
  // a pack adds or overrides its own through TILEART_SIDE.
  const side = await page.evaluate(() => {
    const problems = [];
    if (typeof TILESIDE === 'undefined' || typeof sideArt !== 'function') return ['the engine has no side-view registry (TILESIDE / sideArt)'];
    ['T', 'K', 'V'].forEach(g => { if (typeof TILESIDE[g] !== 'function') problems.push(`no side view for '${g}'`); });
    if (sideArt('T') === TILEDRAW['T']) problems.push('the table\'s side view is its top-down drawing');
    if (sideArt('P') !== TILEDRAW['P']) problems.push('a glyph with no side view must fall back to its top-down drawing');
    Object.keys(TILESIDE).forEach(g => { try {
      const t = document.createElement('canvas'); t.width = 32; t.height = 32; const o = ctx; ctx = t.getContext('2d');
      TILESIDE[g]({ sx: 0, sy: 0, x: 1, y: 1, canopy: () => {} }); ctx = o;
      const d = t.getContext('2d').getImageData(0, 0, 32, 32).data; let n = 0; for (let i = 3; i < d.length; i += 4) if (d[i]) n++;
      if (n < 100) problems.push(`the side view of '${g}' paints almost nothing`);
    } catch (e) { problems.push(`the side view of '${g}' throws: ${e.message}`); } });
    return problems;
  });
  fails.push(...side);

  // ---- a person with something to say beats an animal for the button ----
  // Owner 2026-09-02: "i get logs of the crosswalk while im trying to talk who i thought was
  // don guero". The crosswalk line is the pigeon's. She wanders the street, and when she
  // stepped beside the player the pet button appeared next to Talk; tap the wrong one and
  // you get the bird. A quest person adjacent now hides the animal button.
  const yield_ = await page.evaluate(() => {
    const problems = [];
    const before = { world, px, py, pig: { x: PIG.x, y: PIG.y, m: PIG.moving } };
    world = 'st'; px = fx = 4; py = fy = 8; moving = false; held = null;   // below Don Güero at (4,7)
    document.getElementById('card').hidden = true; document.getElementById('world').hidden = false;
    PIG.x = 3; PIG.y = 8; PIG.moving = false;                                  // the pigeon beside you too
    checkTalk(); fredCheck();
    const talk = document.getElementById('talk'), treat = document.getElementById('treat');
    if (talk.hidden || talk.dataset.qi === undefined) problems.push('standing beside Don Güero shows no quest Talk button');
    if (!treat.hidden) problems.push('the pigeon still takes a button while a quest person is adjacent');
    px = fx = 6; py = fy = 9; PIG.x = 6; PIG.y = 10; checkTalk(); fredCheck();   // away from him, bird still beside you
    if (treat.hidden) problems.push('with nobody to talk to, the pigeon lost her button');
    world = before.world; px = fx = before.px; py = fy = before.py; PIG.x = before.pig.x; PIG.y = before.pig.y; PIG.moving = before.pig.m;
    checkTalk(); fredCheck();
    return problems;
  });
  fails.push(...yield_);

  // ---- a fence stands along its run in 3D, and a corner has two panels ----
  // Owner 2026-09-02: the construction fences "are sideways ... laying around instead of
  // fencing in construction". Every fence tile was a flat panel facing south, so a
  // north-south run showed as a row of edge-on slats.
  const fence3d = await page.evaluate(() => {
    const problems = [];
    const before = { cam: camMode, world, px, py };
    camSet('3d'); world = 'st'; px = fx = 13; py = fy = 6; moving = false; held = null;
    if (!draw3d() || T3.fail) { problems.push('3D did not render headless — fences could not be checked'); camSet(before.cam); return problems; }
    const w = CW();
    const isF = (x, y) => y >= 0 && y < w.H && x >= 0 && x < w.W && (TILES[w.rows[y][x]] || {}).kind === 'fence';
    const seen = {};
    T3.group.children.forEach(o => { const u = o.userData || {}; if (!u.fence) return;
      const k = u.x + ',' + u.y; seen[k] = seen[k] || []; seen[k].push(Math.abs(o.rotation.y)); });
    let checked = 0;
    for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) if (isF(x, y)) {
      const ns = isF(x, y - 1) || isF(x, y + 1), ew = isF(x - 1, y) || isF(x + 1, y);
      const rots = seen[x + ',' + y] || [];
      if (!rots.length) { problems.push(`fence at (${x},${y}) has no panel in 3D`); continue; }
      checked++;
      const wantNS = ns && !ew, corner = ns && ew;
      if (corner) { if (rots.length < 2) problems.push(`fence corner at (${x},${y}) has one panel — it needs two`); }
      else if (wantNS && !rots.some(r => Math.abs(r - Math.PI / 2) < 1e-6)) problems.push(`fence at (${x},${y}) runs north-south but its panel faces south`);
      else if (!wantNS && !rots.some(r => r < 1e-6)) problems.push(`fence at (${x},${y}) runs east-west but its panel is turned`);
    }
    if (!checked) problems.push('no fence tiles found on the street map');
    camSet(before.cam); world = before.world; px = fx = before.px; py = fy = before.py;
    return problems;
  });
  fails.push(...fence3d);

  // ---- a marker floats over a door you are near, and only over doors that lead somewhere ----
  // Owner 2026-09-02: "i think we should have a marker- would be good." The third door
  // affordance: within three steps of a door that goes somewhere, a bouncing arrow.
  const marks = await page.evaluate(() => {
    const problems = [];
    if (typeof doorMarks !== 'function' || typeof drawDoorMark !== 'function') return ['no doorMarks()/drawDoorMark() in the engine'];
    const before = { world, px, py };
    world = 'hq'; px = fx = 10; py = fy = 11;                   // two steps from the front door at (10,13)
    let m = doorMarks();
    if (!m.some(d => d.x === 10 && d.y === 13)) problems.push('two steps from HQ\'s front door, no marker');
    if (m.some(d => !PORTALS.hq[d.ch])) problems.push('a marker over a door that leads nowhere');
    px = fx = 8; py = fy = 12;                                   // beside an interior door "+" at (7,12)
    m = doorMarks();
    if (m.some(d => d.ch === '+')) problems.push('interior doors (no portal) got a marker');
    px = fx = 10; py = fy = 5;                                   // far away
    if (doorMarks().some(d => d.y === 13)) problems.push('the front door is marked from eight steps away');
    try { const t = document.createElement('canvas'); t.width = 64; t.height = 64; drawDoorMark(t.getContext('2d'), 16, 30, 0); }
    catch (e) { problems.push('drawDoorMark throws: ' + e.message); }
    world = before.world; px = fx = before.px; py = fy = before.py;
    return problems;
  });
  fails.push(...marks);

  // ---- a district declares its own ending strings and its own "next lot" toast ----
  // The engine held exactly two ending sets (Week One's and the mercado's), so a third
  // district would print the wrong Saturday. Now a district may say which strings are
  // its own; with nothing declared the old two-set behaviour stands.
  const epis = await page.evaluate(() => {
    const problems = [];
    if (typeof epiKeys !== 'function') return ['no epiKeys() in the engine'];
    const L = CHS(), k0 = L[0].epi, o0 = L[0].open;
    delete L[0].epi; delete L[0].open;
    let k = epiKeys(0, false);
    if (k.pre !== 'epi' || k.go !== 'goEpi' || k.open !== 'weekTwoToast') problems.push(`undeclared first district: ${JSON.stringify(k)}`);
    // the last district used to be the mercado, whose declared keys happen to equal the
    // fallback; now it is whoever closes the city, so strip its declaration before asking
    const li = L.length - 1, kl = { epi: L[li].epi, go: L[li].go, open: L[li].open };
    delete L[li].epi; delete L[li].go; delete L[li].open;
    k = epiKeys(li, true);
    if (k.pre !== 'mepi' || k.go !== 'mgoEpi' || k.open !== 'endStayToast') problems.push(`undeclared last district: ${JSON.stringify(k)}`);
    Object.entries(kl).forEach(([f, v]) => { if (v === undefined) delete L[li][f]; else L[li][f] = v; });
    L[0].epi = 'mepi'; L[0].open = 'endStayToast';
    k = epiKeys(0, false);
    if (k.pre !== 'mepi' || k.open !== 'endStayToast') problems.push(`declared keys ignored: ${JSON.stringify(k)}`);
    if (k0 === undefined) delete L[0].epi; else L[0].epi = k0;
    if (o0 === undefined) delete L[0].open; else L[0].open = o0;
    // Meridian's own districts declare theirs, so the fallback is never what ships
    if (!L.every(c => c.epi && c.open)) problems.push('a Meridian district relies on the engine fallback for its ending strings');
    L.forEach(c => ['1', '2', '3'].forEach(n => { if (!UI.en[c.epi + n] || !UI.es[c.epi + n]) problems.push(`district ${c.id}: ending string ${c.epi + n} missing in EN or ES`); }));
    return problems;
  });
  fails.push(...epis);

  // ---- a person's look is keyed by who they are, not by the map letter ----
  // NPCLOOK was one flat table keyed by station letter, shared by every world — the
  // taller's cast would have worn Tovar's colours. Now the npc id wins; the letter stays
  // as the fallback so nothing shipped changes.
  const looks = await page.evaluate(() => {
    const problems = [];
    if (typeof lookOf !== 'function') return ['no lookOf() in the engine'];
    const n = WORLDS.st.npcs.find(x => x.npc === 'guero');
    if (!n) return ['Don Güero is not on the street'];
    if (lookOf(n) !== NPCLOOK[n.key]) problems.push('with no per-person look, the letter look must be used');
    NPCLOOK.guero = { shirt: '#123456', skin: '#C08356', hair: '#000000', style: 'buzz' };
    if (lookOf(n) !== NPCLOOK.guero) problems.push('a look keyed by npc id is ignored');
    delete NPCLOOK.guero;
    return problems;
  });
  fails.push(...looks);

  // ---- the whole city raised: every lot, door, room, cat and gift holds up ----
  // Don Güero's four parcels (2026-09-02). Raise every storefront at once and check what
  // the boot-time audit cannot: rooms behind doors that do not exist yet.
  const city = await page.evaluate(() => {
    const problems = [];
    const keep = { chSeen, world, px, py, done: new Set(done) };
    const g = GROWTH;
    if (!Array.isArray(g.ribbons) || g.ribbons.length < 5) problems.push('the pack declares fewer than five storefronts');
    chSeen = 99; applyGrowth();
    if (auditReach().length) problems.push('with every lot raised: ' + auditReach().join(' | '));
    ribbons().filter(r => r.doorstep).forEach(r => {
      const w = WORLDS[r.world];
      const doorTile = r.tiles.find(([y, x, ch]) => DOORSET.has(ch));
      if (!doorTile) { problems.push(`${r.id}: no door in its storefront`); return; }
      const [dy, dx, dch] = doorTile;
      if (w.rows[dy][dx] !== dch) problems.push(`${r.id}: the door did not land at (${dx},${dy})`);
      const p = PORTALS[r.world] && PORTALS[r.world][dch];
      if (!p) { problems.push(`${r.id}: door '${dch}' has no portal`); return; }
      const inside = WORLDS[p.to]; if (!inside) { problems.push(`${r.id}: leads to a missing world ${p.to}`); return; }
      if (SOLID.has(inside.grid[p.y][p.x]) || inside.grid[p.y][p.x] === 'N') problems.push(`${r.id}: arrival (${p.x},${p.y}) in ${p.to} is blocked`);
      const back = Object.values(PORTALS[p.to] || {}).find(q => q.to === r.world);
      if (!back) problems.push(`${r.id}: no way back to the street from ${p.to}`);
      else if (SOLID.has(w.grid[back.y][back.x])) problems.push(`${r.id}: the way back lands on a solid tile`);
      if (r.doorstep.world !== r.world || SOLID.has(w.grid[r.doorstep.y][r.doorstep.x])) problems.push(`${r.id}: the doorstep is not a standable street tile`);
    });
    Object.entries(WORLDS).forEach(([id, w]) => {
      for (let y = 0; y < w.H; y++) for (let x = 0; x < w.W; x++) {
        const ch = w.rows[y][x]; if (!DOORSET.has(ch)) continue;
        const N = y > 0 ? w.rows[y-1][x] : null, S = y < w.H-1 ? w.rows[y+1][x] : null, E = x < w.W-1 ? w.rows[y][x+1] : null, W = x > 0 ? w.rows[y][x-1] : null;
        const open1 = c => c === null || !SOLID.has(c);
        if (![N, S, E, W].some(c => c !== null && SOLID.has(c))) problems.push(`${id} (${x},${y}) '${ch}': a raised door with no wall beside it`);
        if (!(open1(N) && open1(S)) && !(open1(E) && open1(W))) problems.push(`${id} (${x},${y}) '${ch}': a raised door you cannot walk through`);
        [N, S, E, W].forEach(c => { if (c !== null && DOORSET.has(c)) problems.push(`${id} (${x},${y}) '${ch}': raised doors side by side`); });
      }
    });
    (typeof CRITTERS !== 'undefined' ? CRITTERS : []).forEach(c => { const w = WORLDS[c.world];
      if (!w) problems.push(`critter in a missing world ${c.world}`);
      else if (SOLID.has(w.grid[c.y][c.x]) || w.grid[c.y][c.x] === 'N') problems.push(`${c.kind} ${c.name || ''} at ${c.world} (${c.x},${c.y}) sits on a blocked tile`); });
    const f2 = WORLDS.f2;
    ribbons().filter(r => r.world === 'f2').forEach(r => r.tiles.forEach(([y, x, ch]) => {
      if (f2.rows[y][x] !== ch) problems.push(`${r.id}: gift '${ch}' did not land at (${x},${y})`);
      if (x === 17 && y === 11) problems.push(`${r.id}: a gift on the arrival tile`);
      if ([[16,10],[15,9],[14,8],[13,7],[12,6],[11,5],[11,4],[10,3],[10,2]].some(([sx, sy]) => sx === x && sy === y) && (TILES[ch] || {}).lift > 6) problems.push(`${r.id}: a tall gift on the sight line`);
    }));
    if (!f2.npcs.some(n => roomHosts[n.npc])) problems.push('the room hosts vanished when the office was rebuilt');
    if (typeof drawTown === 'function') { try { drawTown(); } catch (e) { problems.push('the town plan throws with every lot raised: ' + e.message); } }
    ['=', '%', '6', '7', '8', '0', 'i', '&', '!', '▣', '▯', '⊔', '○'].forEach(gch => { try {
      const t = document.createElement('canvas'); t.width = 32; t.height = 32; const o = ctx; ctx = t.getContext('2d');
      (TILEDRAW[gch])({ sx: 0, sy: 0, x: 1, y: 1, canopy: () => {} }); if (TILESIDE[gch]) TILESIDE[gch]({ sx: 0, sy: 0, x: 1, y: 1, canopy: () => {} }); ctx = o;
    } catch (e) { problems.push(`tile '${gch}' throws when drawn alone: ${e.message}`); } });
    chSeen = keep.chSeen; done = keep.done; applyGrowth();
    world = keep.world; px = fx = keep.px; py = fy = keep.py;
    return problems;
  });
  fails.push(...city);

  // ---- the record keeps every decision — it never silently drops your earliest work ----
  // Owner 2026-09-02: "I thought we fixed this 200 entries thing". It was not fixed: the
  // play log was cut to its last 200 entries on every write, so a five-district city
  // would lose its first districts from the portfolio without a word. Nothing you make
  // is taken away — the cap is gone, and a storage failure is warned about, not hidden.
  const keep = await page.evaluate(() => {
    const problems = [];
    const before = { dlog: dlog.slice(), stored: localStorage.getItem('mqdlog'), cur, curQ, node };
    dlog = []; cur = 0; curQ = AQ()[0]; node = curQ.start;
    const c = curQ.nodes[node].ch.find(x => x.out) || curQ.nodes[node].ch[0];
    for (let i = 0; i < 260; i++) logDecision(c.out || { r: 'ok', concept: 'x', why: 'y' }, c);
    if (dlog.length !== 260) problems.push(`logged 260 decisions, the record holds ${dlog.length}`);
    let stored = []; try { stored = JSON.parse(localStorage.getItem('mqdlog') || '[]'); } catch (e) {}
    if (stored.length !== 260) problems.push(`the phone stored ${stored.length} of 260 decisions`);
    dlog = before.dlog; cur = before.cur; curQ = before.curQ; node = before.node;
    if (before.stored === null) localStorage.removeItem('mqdlog'); else localStorage.setItem('mqdlog', before.stored);
    return problems;
  });
  fails.push(...keep);

  // ---- the city can raise more than one storefront, and each says where you stand ----
  // Owner 2026-09-02: "not stopping at a certain amount of store fronts" — it was still
  // stopping at one: GROWTH.ribbon held a single storefront, and the handover walked you
  // to the mercado's front step, hardcoded in the engine. Now a pack declares ribbons[]
  // (the old singular ribbon still works), each with its own doorstep.
  const ribs = await page.evaluate(() => {
    const problems = [];
    const g = GROWTH, keep = { ribbons: g.ribbons, ribbon: g.ribbon, chSeen, world, px, py, done: new Set(done), hearts };
    const st = () => WORLDS.st.rows[1][1];
    if (typeof ribbons !== 'function') return ['the engine has no ribbons() list'];
    const merc = ribbons().find(r => r.district === 1);
    if (!merc || !merc.doorstep || merc.doorstep.x !== 6 || merc.doorstep.y !== 12) problems.push('the pack does not declare the mercado\'s doorstep (the engine used to hardcode it)');
    // the old singular declaration still counts as a list of one (AJ's pack, older saves)
    delete g.ribbons; g.ribbon = merc;
    if (ribbons().length !== 1 || ribbons()[0] !== merc) problems.push('the old singular ribbon is not read as a list of one');
    // two storefronts: each rises when its own district opens
    g.ribbons = [merc, { world: 'st', district: 2, tiles: [[1, 1, 'P']], doorstep: { world: 'st', x: 1, y: 2, dir: 'up' } }];
    done = new Set(); chSeen = 0; applyGrowth();
    if (ribbonUp()) problems.push('a storefront is up before any district opened');
    chSeen = 1; applyGrowth();
    if (!ribbonUp(g.ribbons[0])) problems.push('the first storefront did not rise on its district');
    if (ribbonUp(g.ribbons[1]) || st() === 'P') problems.push('the second storefront rose a district early');
    chSeen = 2; applyGrowth();
    if (!ribbonUp(g.ribbons[1]) || st() !== 'P') problems.push('the second storefront never rose — the city still stops at one');
    // the handover doorstep comes from the storefront that just opened, not from the engine
    g.ribbons = [merc]; chSeen = 0; applyGrowth();
    world = 'hq'; px = fx = 10; py = fy = 11; document.getElementById('end').hidden = false;
    document.getElementById('endGo').click();
    if (chSeen !== 1) problems.push('the handover did not open the next district');
    if (world !== 'st' || px !== 6 || py !== 12) problems.push(`the handover left you at ${world} (${px},${py}) — expected the declared doorstep st (6,12)`);
    // with no doorstep declared, the handover leaves you where you were
    const ds = merc.doorstep; delete merc.doorstep;
    chSeen = 0; applyGrowth(); world = 'hq'; px = fx = 10; py = fy = 11;
    document.getElementById('end').hidden = false; document.getElementById('endGo').click();
    if (world !== 'hq' || px !== 10 || py !== 11) problems.push('with no doorstep declared the engine still walked you somewhere of its own choosing');
    merc.doorstep = ds;
    // put the city back
    if (keep.ribbons) g.ribbons = keep.ribbons; else delete g.ribbons;
    if (keep.ribbon) g.ribbon = keep.ribbon; else delete g.ribbon;
    done = keep.done; chSeen = keep.chSeen; hearts = keep.hearts; applyGrowth();
    world = keep.world; px = fx = keep.px; py = fy = keep.py;
    document.getElementById('end').hidden = true; document.getElementById('world').hidden = false; setWorldTag(); checkTalk();
    return problems;
  });
  fails.push(...ribs);

  // ---- the room upstairs: two neighbours ask, nothing is graded, the sheet is hers ----
  // Owner 2026-09-02: "lets make it so that AJ can interact through the characters with
  // you if possible ... i dont want an api setup". So: the characters ask IN the game,
  // her answers are kept on the phone, and the game writes a plain sheet with a Copy
  // button that the owner hands to Claude. Everything with a name lives in
  // content/meridian/room.js (INTERVIEW); the engine reads only shapes, and a pack
  // that declares nothing gets nothing (the AJ law). Three skeptics shaped this test:
  // the box and the sheet must be ON SCREEN while the card is up (the old panels live
  // inside the hidden world panel), answers keep their written order (no shuffle — there
  // is no right answer to hide), a mis-tap costs nothing, and a fruit crate is not a
  // moving box, so the room opens bare, exactly as signed.
  const room = await page.evaluate(async () => {
    const problems = [];
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const $ = id => document.getElementById(id);
    if (typeof INTERVIEW === 'undefined' || typeof RM !== 'function' || !RM()) return ['no INTERVIEW declared by the pack (content/meridian/room.js)'];
    const I = RM(), U = I.ui[lang];
    // the office opens MID-MOVE (owner 2026-09-02: "for the move it should be mid"), and
    // nothing else: the old lead's desk, the stairs, the three window panes, four taped
    // moving boxes on the pack's own glyph, one of Don Güero's cones, a plant still in
    // its pot. Don Güero's grid; the arrival tile and the sight line from the stairs to
    // the window stay clear because Nacho's "nothing in the way" is an answer a player
    // can pick, so it has to be true.
    const f2 = WORLDS.f2.rows;
    if (f2.length !== 14 || f2.some(r => r.length !== 20)) problems.push('f2 is not 20 wide x 14 tall');
    const glyphs = {}; f2.forEach(r => [...r].forEach(c => { glyphs[c] = (glyphs[c] || 0) + 1; }));
    const want = { D: 1, '□': 4, C: 1, P: 1, '1': 1 };
    Object.entries(want).forEach(([c, n]) => { if (glyphs[c] !== n) problems.push(`the office should hold ${n} '${c}', found ${glyphs[c] || 0}`); });
    if (f2[11][18] !== '1') problems.push('the stairs moved — the portal from HQ lands at (17,11) beside them');
    Object.keys(glyphs).forEach(c => { if (!'#.D1|□CP'.includes(c)) problems.push(`the office holds something unplanned: '${c}'`); });
    if (f2[11][17] !== '.') problems.push('the arrival tile (17,11) is blocked');
    [[16,10],[15,9],[14,8],[13,7],[12,6],[11,5],[11,4],[10,3],[10,2]].forEach(([x, y]) => {
      if (f2[y][x] !== '.') problems.push(`the sight line from the stairs to the window is blocked at (${x},${y}) by '${f2[y][x]}'`); });
    // ---- la ventana del norte (Don Güero + Nacho, 2026-09-02): three panes IN the north wall,
    // over the old desk, declared by the pack (art.js) and never by the engine ----
    if (f2[0] !== '#########|||########') problems.push(`the north wall should carry three panes over the desk, got "${f2[0]}"`);
    f2.slice(1).forEach((r, i) => { if (r.includes('|')) problems.push(`a window pane off the north wall at row ${i + 1}`); });
    if (typeof TILEART === 'undefined' || typeof TILEART['|'] !== 'function') problems.push('the pack declares no drawing for the window (TILEART["|"])');
    if (!TILES['|'] || TILES['|'].kind !== 'wall' || TILES['|'].lift !== TILES['#'].lift) problems.push('the window must be a wall-kind tile as tall as the wall beside it, or 3D shows a notch');
    if (!SOLID.has('|')) problems.push('the window is walkable — SOLIDX must carry it');
    if (!MAPCOL['|']) problems.push('the window has no colour on the village map');
    // the moving box: the pack's second glyph — solid, low, its own colour on the map
    if (typeof TILEART === 'undefined' || typeof TILEART['□'] !== 'function') problems.push('the pack declares no drawing for the moving box (TILEART["□"])');
    if (!TILES['□'] || TILES['□'].kind !== 'prop' || !(TILES['□'].lift > 0 && TILES['□'].lift <= 6)) problems.push('the moving box must be a low prop (it must not block the view)');
    if (!SOLID.has('□')) problems.push('the moving box is walkable — SOLIDX must carry it');
    if (!MAPCOL['□'] || MAPCOL['□'] === MAPCOL['H']) problems.push('the moving box needs its own colour on the village map, not the produce crate\'s');
    // the cold-read sheet draws every tile with no scene: the art must tolerate that, in both box variants
    try { const t = document.createElement('canvas'); t.width = 32; t.height = 32; const o = ctx; ctx = t.getContext('2d');
      TILEDRAW['|']({ sx: 0, sy: 0, x: 10, y: 0, canopy: () => {} });
      TILEDRAW['□']({ sx: 0, sy: 0, x: 1, y: 1, canopy: () => {} }); TILEDRAW['□']({ sx: 0, sy: 0, x: 1, y: 2, canopy: () => {} });
      ctx = o; } catch (e) { problems.push('the pack art throws when drawn alone: ' + e.message); }
    // shape: everything a pack must declare, EN and ES in lockstep
    const keys = o => Object.keys(o).sort().join(',');
    if (keys(I.ui.en) !== keys(I.ui.es)) problems.push('INTERVIEW.ui EN/ES keys differ');
    ['title', 'place', 'invite'].forEach(k => { if (!I[k] || !I[k].en || !I[k].es) problems.push(`INTERVIEW.${k} needs en and es`); });
    const ids = new Set();
    I.hosts.forEach(h => {
      if (ids.has(h.id)) problems.push(`host id ${h.id} repeated`); ids.add(h.id);
      if (!h.emoji || !h.name || !h.name.en || !h.name.es || !h.look || !h.talk || !h.talk.en || !h.talk.es) problems.push(`host ${h.id} is missing emoji/name/look/talk`);
      if (!WORLDS[h.world]) problems.push(`host ${h.id} stands in a world that does not exist: ${h.world}`);
      if (!h.done || !h.done.en || !h.done.es) problems.push(`host ${h.id} has no closing line`);
      const sids = new Set();
      (h.steps || []).forEach(s => {
        if (sids.has(s.id)) problems.push(`host ${h.id} step ${s.id} repeated`); sids.add(s.id);
        ['say', 'why', 'q'].forEach(k => { if (!s[k] || !s[k].en || !s[k].es) problems.push(`${h.id}:${s.id} ${k} needs en and es`); });
        if (!s.opts || s.opts.length < 2 || s.opts.some(o => !o.en || !o.es)) problems.push(`${h.id}:${s.id} needs 2+ answers in both languages`);
        // phone rules: a host speaks two sentences, an answer fits on one line
        if (s.say && s.say.en && s.say.en.split(/[.!?…]["”]?\s+/).filter(Boolean).length > 3) problems.push(`${h.id}:${s.id} say runs past two sentences`);
        (s.opts || []).forEach(o => { if (o.en && o.en.split(/\s+/).length > 12) problems.push(`${h.id}:${s.id} answer "${o.en}" is over 12 words`); });
        // stairs, not a door: f2's only way out is the stairs
        ['say', 'q'].forEach(k => { if (s[k] && /\bthat door\b|\bthe door\b/i.test(s[k].en)) problems.push(`${h.id}:${s.id} says "door" — the office has stairs`); });
      });
      if (!(h.steps || []).length) problems.push(`host ${h.id} has no steps`);
    });
    // placed: every host stands in its world as a chat person, and the city stays reachable
    I.hosts.forEach(h => {
      const n = WORLDS[h.world].npcs.find(n => n.x === h.x && n.y === h.y && n.chat);
      if (!n) problems.push(`host ${h.id} is not standing at ${h.world} (${h.x},${h.y})`);
      else if (!roomHosts[n.npc] || roomHosts[n.npc].id !== h.id) problems.push(`the person at ${h.world} (${h.x},${h.y}) is not registered as host ${h.id}`);
    });
    if (auditReach().length) problems.push('hosts broke reachability: ' + auditReach().join(' | '));
    const nachos = Object.values(WORLDS).flatMap(w => w.npcs).filter(n => CHILLN[n.npc] && /nacho/i.test(CHILLN[n.npc].en)).length;
    if (nachos !== 1) problems.push(`Nacho stands in ${nachos} places — expected once, upstairs`);
    // stand beside the first host
    const h0 = I.hosts[0], key0 = Object.keys(roomHosts).find(k => roomHosts[k].id === h0.id);
    const before = { world, px, py, xp, marks: JSON.stringify(marks), dl: dlog.length, done: done.size };
    localStorage.removeItem('mqroom'); Object.keys(roomAns).forEach(k => delete roomAns[k]);
    world = h0.world; px = fx = h0.x - 1; py = fy = h0.y; moving = false; held = null; portalT = 0; portalHold = '';
    $('card').hidden = true; $('world').hidden = false; $('settings').hidden = true;
    checkTalk();
    const tb = $('talk');
    if (tb.hidden) problems.push('standing beside a host shows no Talk button');
    else if (!tb.textContent.includes(h0.talk[lang])) problems.push(`the Talk button does not say what the talk is about: "${tb.textContent}"`);
    const n0 = WORLDS[h0.world].npcs.find(n => n.npc === key0);
    if (!n0 || !hasSay(n0)) problems.push('a host with unanswered questions does not count as having something to say (no ❗)');
    if (!worldPending(h0.world)) problems.push('the world where hosts wait is not marked pending');
    tb.click();
    if ($('card').hidden || !$('world').hidden) problems.push('Talk did not open the card');
    if ($('qtag').textContent !== U.tag) problems.push(`card eyebrow is "${$('qtag').textContent}", expected "${U.tag}"`);
    const s0 = h0.steps[0];
    if ($('npcSay').textContent !== s0.say[lang]) problems.push('first step does not show the host\'s first line');
    if ($('npcName').textContent !== h0.name[lang]) problems.push('the card does not name the host');
    if ($('q').textContent !== s0.q[lang]) problems.push('first step does not show its question');
    let btns = [...$('choices').children];
    if (btns.length !== s0.opts.length + 1) problems.push(`expected ${s0.opts.length} answers + say-it-my-way, got ${btns.length} buttons`);
    s0.opts.forEach((o, i) => { if (btns[i] && btns[i].textContent !== o[lang]) problems.push(`answers are not in written order (button ${i})`); });
    if (btns.length && btns[btns.length - 1].textContent !== U.free) problems.push('say-it-my-way is not the last answer button');
    if ($('rmLater').hidden || $('choices').contains($('rmLater'))) problems.push('"that\'s enough for now" must sit below the answers, outside them');
    if (!$('verdict').hidden || !$('next').hidden || !$('levelup').hidden) problems.push('the interview card shows quest chrome (verdict/next/levelup)');
    if (!$('codex').parentElement.hidden) problems.push('the gold lesson box is showing on a design talk');
    if ($('rmWhy').hidden || $('rmWhy').textContent !== s0.why[lang]) problems.push('the "why I\'m asking" line is missing below the answers');
    // a tap saves the WRITTEN index, is acknowledged, and advances
    btns[1].click(); await wait(450);
    const rec = () => JSON.parse(localStorage.getItem('mqroom') || '{}');
    let st = rec();
    if (!st.a || !st.a[h0.id + ':' + s0.id] || st.a[h0.id + ':' + s0.id].pick !== 1) problems.push('tapping the second answer did not save pick=1 under mqroom');
    if (!tickerLines.includes(U.noted)) problems.push('a tap was not acknowledged ("Written down.")');
    if ($('q').textContent !== h0.steps[1].q[lang]) problems.push('a tap did not advance to the next question');
    // say it my way: the box is ON SCREEN while the world panel is hidden; Cancel changes nothing
    btns = [...$('choices').children]; btns[btns.length - 1].click();
    if ($('rmAsk').hidden || $('rmAsk').offsetParent === null) problems.push('say-it-my-way opened nothing visible (the box must live inside the card, not the hidden world panel)');
    if (document.activeElement !== $('rmText')) problems.push('the text box did not take focus');
    $('rmText').value = 'nope'; $('rmCancel').click();
    st = rec();
    if (st.a[h0.id + ':' + h0.steps[1].id]) problems.push('Cancel recorded an answer');
    if ($('q').textContent !== h0.steps[1].q[lang]) problems.push('Cancel moved off the question');
    if (!$('rmAsk').hidden) problems.push('Cancel left the box open');
    // typed words are kept verbatim (a <3 stays a <3) and advance
    btns = [...$('choices').children]; btns[btns.length - 1].click();
    $('rmText').value = "  <3 warm like abuela's kitchen  "; $('rmOk').click(); await wait(450);
    st = rec();
    const a1 = st.a[h0.id + ':' + h0.steps[1].id];
    if (!a1 || a1.text !== "<3 warm like abuela's kitchen") problems.push('typed words were not kept verbatim: ' + JSON.stringify(a1));
    if ($('q').textContent !== h0.steps[2].q[lang]) problems.push('a typed answer did not advance');
    // an empty OK on a fresh question means "I'll tell you out loud"
    btns = [...$('choices').children]; btns[btns.length - 1].click(); $('rmText').value = '   '; $('rmOk').click(); await wait(450);
    st = rec();
    if (!st.a[h0.id + ':' + h0.steps[2].id] || !st.a[h0.id + ':' + h0.steps[2].id].out) problems.push('an empty OK on a fresh question was not recorded as "tell you out loud"');
    if ($('q').textContent !== h0.steps[3].q[lang]) problems.push('"tell you out loud" did not advance');
    // "that's enough for now" leaves with everything kept; coming back resumes where she was
    $('rmLater').click();
    if (!$('card').hidden || $('world').hidden) problems.push('"that\'s enough for now" did not return to the room');
    if (Object.keys(rec().a).length !== 3) problems.push('leaving early lost answers');
    checkTalk(); tb.click();
    if ($('q').textContent !== h0.steps[3].q[lang]) problems.push('talking again did not resume at the first unanswered question');
    // finish this host with first answers
    for (let i = 3; i < h0.steps.length; i++) { [...$('choices').children][0].click(); await wait(450); }
    if ($('npcSay').textContent !== h0.done[lang]) problems.push('after the last answer the host did not say the closing line');
    if ($('rmSheet').hidden || $('rmSheet').offsetParent === null) problems.push('the sheet is not shown on the card after the closing line');
    const sheet = $('rmSheet').textContent;
    if (!sheet.includes(s0.opts[1][lang])) problems.push('the sheet does not print the tapped answer verbatim');
    if (!sheet.includes("<3 warm like abuela's kitchen")) problems.push('the sheet does not print her typed words verbatim');
    if (!sheet.includes(U.saidOut)) problems.push('the sheet does not say which answer she wants to give out loud');
    if (!sheet.includes(heroName)) problems.push('the sheet does not carry the player\'s name');
    if (/(^|\n)#|\*\*/.test(sheet)) problems.push('the sheet shows Markdown marks to the player');
    if ($('rmBar').hidden || $('rmCopy').hidden || $('rmBack').hidden || $('rmAgain').hidden) problems.push('the sheet card is missing Copy / Ask me again / Back');
    if (!$('next').hidden) problems.push('the quest Next button appeared on the interview (it can trigger a chapter ending)');
    if (hasSay(n0)) problems.push('a host with every question answered still shows ❗');
    const h1 = I.hosts[1];
    if (h1) {
      const n1 = WORLDS[h1.world].npcs.find(n => roomHosts[n.npc] && roomHosts[n.npc].id === h1.id);
      if (!n1 || !hasSay(n1)) problems.push('the second host lost the ❗ before being answered');
      if (!sheet.includes(U.unanswered)) problems.push('the sheet does not list what is still unanswered');
    }
    // nothing was graded, paid, or logged
    if (xp !== before.xp || JSON.stringify(marks) !== before.marks || dlog.length !== before.dl || done.size !== before.done) problems.push('the interview touched XP, marks, the play log or done — it must grade nothing');
    // "ask me again" starts over with her earlier tap marked; a new tap keeps the old one as history
    $('rmAgain').click();
    if ($('q').textContent !== s0.q[lang]) problems.push('"ask me again" did not start from the first question');
    btns = [...$('choices').children];
    if (!btns[1] || !btns[1].classList.contains('was')) problems.push('her earlier answer is not marked when re-asked');
    btns[0].click(); await wait(450);
    const a0 = rec().a[h0.id + ':' + s0.id];
    if (!a0 || a0.pick !== 0 || !a0.hist || !a0.hist.length) problems.push('re-answering overwrote the earlier tap without keeping it');
    $('rmLater').click();
    // the other language re-labels the sheet; her words stay
    const lang0 = lang; lang = lang0 === 'en' ? 'es' : 'en'; applyLang();
    const sheet2 = roomSheet();
    if (!sheet2.includes(s0.q[lang]) || !sheet2.includes("<3 warm like abuela's kitchen")) problems.push('the sheet in the other language lost a label or her words');
    lang = lang0; applyLang();
    // Export gains a "The room" tab, labelled, showing the same sheet
    $('openExp').click();
    if ($('exTabRoom').hidden || $('exTabRoom').textContent !== U.tab) problems.push('Export has no "The room" tab');
    $('exTabRoom').click();
    if ($('exArea').value !== roomSheet()) problems.push('the Export tab does not show the sheet');
    $('exClose').click();
    // restart never wipes it (nothing you make gets taken away)
    const keep = localStorage.getItem('mqroom');
    const b = $('replay'); b.click(); b.click();
    if (localStorage.getItem('mqroom') !== keep) problems.push('restart touched her answers');
    // put things back
    world = before.world; px = fx = before.px; py = fy = before.py; held = null; moving = false; hearts = 3;
    $('card').hidden = true; $('world').hidden = false; $('settings').hidden = true; setWorldTag(); checkTalk();
    return problems;
  });
  fails.push(...room);

  // ---- the off switch: a pack that declares no interview gets no interview ----
  // Same engine, room.js blocked at load: no page error, no hosts, no tab, no storage.
  {
    const ctx2 = await browser.newContext();
    const p2 = await ctx2.newPage({ viewport: { width: 480, height: 900 } });
    const errs = [], w2 = [];
    p2.on('pageerror', e => errs.push(e.message));
    p2.on('console', m => { if (m.type() === 'warning') w2.push(m.text()); });
    await p2.route('**', r => { const u = r.request().url(); if (!u.startsWith('file://') || /content\/meridian\/room\.js$/.test(u)) return r.abort(); r.continue(); });
    await p2.goto(index); await p2.waitForTimeout(1200);
    if (errs.length) fails.push('with no INTERVIEW declared the page errors: ' + errs.join(' | '));
    if (w2.some(w => /^ROOM/.test(w))) fails.push('with no INTERVIEW declared the engine still warns about hosts');
    const off = await p2.evaluate(() => {
      const problems = [];
      if (typeof INTERVIEW !== 'undefined') return ['room.js still loaded — the off-switch test is not testing anything'];
      if (typeof RM !== 'function' || typeof roomHosts === 'undefined') return ['the engine has no room seam (RM / roomHosts)'];
      if (RM()) problems.push('RM() is not empty with no pack declaration');
      if (Object.values(WORLDS).some(w => w.npcs.some(n => roomHosts[n.npc]))) problems.push('hosts were placed with nothing declared');
      if (localStorage.getItem('mqroom')) problems.push('mqroom was written with nothing declared');
      document.querySelector('.classes button[data-c="architect"]').click(); document.getElementById('begin').click();
      document.getElementById('openExp').click();
      if (!document.getElementById('exTabRoom').hidden) problems.push('the Export tab "The room" shows with nothing declared');
      document.getElementById('exClose').click();
      world = 'f2'; px = fx = 11; py = fy = 8; checkTalk();
      if (!document.getElementById('talk').hidden) problems.push('a Talk button appeared upstairs with nobody declared');
      return problems;
    });
    fails.push(...off);
    await ctx2.close();
  }

  // ---- the version is on the opening page, not only buried in Settings ----
  // Owner 2026-09-02: "move the version to the first/opening page so i know which im
  // using. also keep in settings but i want it there." Both must show GAMEV exactly.
  const ver = await page.evaluate(() => {
    const problems = [];
    const a = document.getElementById('verIntro'), b = document.getElementById('verTag');
    if (!a) problems.push('no #verIntro on the opening page');
    else if (!a.textContent.includes(GAMEV)) problems.push(`opening page shows "${a.textContent}", not ${GAMEV}`);
    else if (!document.getElementById('intro').contains(a)) problems.push('#verIntro is not inside the intro panel');
    if (!b || !b.textContent.includes(GAMEV)) problems.push('Settings no longer shows the version');
    return problems;
  });
  fails.push(...ver);

  // ---- the camera the pack asks for is the camera you get, and it sticks ----
  const cam = await page.evaluate(() => {
    const problems = [];
    if (typeof CAMDEF !== 'undefined' && !CAMS.includes(CAMDEF))
      problems.push(`CAMDEF "${CAMDEF}" is not a camera the engine accepts`);
    if (typeof CAMDEF !== 'undefined' && camMode !== CAMDEF && !localStorage.getItem('mqcam'))
      problems.push(`the pack asked for camera "${CAMDEF}" and booted into "${camMode}"`);
    // every camera must survive a save/restore round trip — camSet writes it, boot reads it.
    // These were two separate whitelists and both omitted "3d", so a 3D choice was
    // written and then silently discarded on the next load.
    CAMS.forEach(m => {
      camSet(m);
      let stored = null; try { stored = localStorage.getItem('mqcam'); } catch (e) {}
      if (stored !== m) problems.push(`camera "${m}" was not stored`);
      if (!CAMS.includes(stored)) problems.push(`camera "${m}" is stored but boot would reject it`);
    });
    camSet(CAMDEF);
    return problems;
  });
  fails.push(...cam);

  // ---- portability: the shared engine must not know one pack's content ----
  // The engine is never forked — AJ's game is a different content pack on the same
  // engine (docs/OWNER.md). So a Meridian name or a Meridian quest index living in
  // engine/ is a bug for her pack, not a style nit. This is the guard that keeps the
  // GROWTH/TILEART/DOORS seams from quietly leaking back.
  {
    const NAMES = ['mercado', 'chelo', 'nando', 'perla', 'chava', 'frijol', 'obra',
                   'cocina', 'xochi', 'lupe', 'guero', 'rosa', 'chuy', 'tovar', 'priya',
                   'canela', 'robles', 'jacaranda', 'muertos', 'otono', 'otoño', 'nacho',
                   'tacho', 'yesenia', 'moy', 'licha', 'tito', 'vero', 'chente', 'karla', 'nolasco', 'bere',
                   'espiga', 'velazquez', 'tuerca', 'bolillo', 'pelusa', 'timbre', 'taller'];
    // engine3d is the same engine, so it is held to the same rule
    for (const f of ['engine/engine.js', 'engine/engine3d.js']) {
      const src = fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
      // blank out comments first — block comments span lines, so this cannot be
      // done per-line. Newlines are preserved so reported line numbers stay true.
      const bare = src.replace(/\/\*[\s\S]*?\*\//g, m => m.replace(/[^\n]/g, ' '))
                      .replace(/\/\/[^\n]*/g, '');
      bare.split('\n').forEach((code, i) => {
        NAMES.forEach(n => {
          if (new RegExp(n, 'i').test(code))
            fails.push(`portability: ${f}:${i + 1} names "${n}" in code — content belongs in the pack`);
        });
      });
    }
  }

  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log(`OK — ${stat.quests} quests, maxXP ${stat.maxXP}, all invariants hold.`);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
