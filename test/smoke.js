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
    let stored = null; try { stored = JSON.parse(localStorage.getItem('mqcustom')); } catch (e) {}
    if (!stored || !stored.light || !stored.dark) problems.push('custom theme not persisted');
    if (sanitizeTheme({ light: { bg: 'javascript:x' }, dark: null }) !== null) problems.push('sanitizeTheme accepted garbage');
    if (sanitizeTheme(stored) === null) problems.push('sanitizeTheme rejected its own output');
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

  await browser.close();
  if (fails.length) { console.log('FAIL\n- ' + fails.join('\n- ')); process.exit(1); }
  console.log(`OK — ${stat.quests} quests, maxXP ${stat.maxXP}, all invariants hold.`);
})().catch(e => { console.error('FAIL', e); process.exit(1); });
