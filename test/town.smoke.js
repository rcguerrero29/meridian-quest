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
    if (!secs || secs.filter(s => s.p).length !== 4) problems.push('document did not split the body into paragraphs (the line, then two, then the sign-in note)');
    if (!secs || !secs.some(s => s.p && /sign in|ventanilla/i.test(s.p))) problems.push('the reader does not say where to sign in');
    if (!secs || !secs.some(s => s.btn && /Comment/.test(s.btn))) problems.push('the reader has no Comment button');
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
        if (T3.group.children.some(o => o.userData && o.userData.wall === false && o.userData.g === 'B' && o.userData.x === 9 && o.userData.y === 0)) problems.push('a full facade box still stands on her tile'); }
      T3.yaw = b3.yaw; camSet(b3.cam); world = b3.world; px = b3.px; py = b3.py; }
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
      RECORDSRC.filter = []; RECORDSRC.search = ''; RECORDSRC.place([]);
      const wd2 = docSections('window');
      if (!wd2.some(s => s.btn && /Sign in/.test(s.btn))) problems.push('the window has no sign-in button');
      if (!wd2.some(s => s.btn && /File a request/.test(s.btn))) problems.push('the window has no file-a-request button');
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
