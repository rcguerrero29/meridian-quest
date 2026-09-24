#!/usr/bin/env node
/* test/runs.js — the run ledger, and the two words that are the owner's alone.

   Written 2026-09-20 at the owner's word: "each crew run should have a unique run ID and show …
   status: proposed, implemented, verified, accepted by me, or rejected … verification tests for me
   to complete that can be tracked automatically via acceptance criteria but can only be closed by me
   the owner of the product."

     node test/runs.js              every file in docs/runs/ has the shape docs/RUNS.md describes,
                                    no agent has written the owner's two words, and the standing
                                    board is printed. EXIT 1 on a broken run.
     node test/runs.js --selftest   the red cases, on fixtures, outside this repository.

   WHAT THIS CHECKS AND WHAT IT CANNOT. The acceptance gate is a TRIPWIRE, not a vault. `git commit
   --author=` exists; a run file is a file; an agent that means to lie is not stopped by anything
   here. What it buys is that an honest agent cannot be careless, and a dishonest one leaves a record
   that disagrees with itself. The binding record of acceptance is the ISSUE THE OWNER CLOSES —
   GitHub records who closed it and an agent cannot forge that without his credentials.

   AND IT SAYS WHICH CHECK IT RAN. GitHub's checkout is shallow (depth 1, .github/workflows/ci.yml),
   so `git log` for a file usually has nothing to say in CI. A guard that quietly checks the weaker
   thing and prints the stronger claim is this repository's oldest fault (docs/POSTMORTEM.md;
   docs/ARCH-LOG.md A17, where a cache ceiling was checked against the code's own constant). So the
   authorship half prints whether it could read history at all, and NEVER reports a pass it did not
   perform — docs/GAUGE.md: nothing to measure is not a pass.

   THE SIGNAL IT READS IS THE AGENT'S OWN TRAILER, not the owner's identity. "Was this commit his?"
   needs his name and email written down somewhere and goes red the day he commits from another
   machine. "Does this commit carry an agent's Co-Authored-By trailer?" is a fact about the commit,
   derived from nothing, and it is the thing that actually went wrong when it goes wrong: an agent
   accepting its own work. */
const fs = require('fs'), path = require('path'), { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');

const STATUS = ['proposed', 'implemented', 'verified', 'accepted', 'rejected'];
const OWNER_ONLY = ['accepted', 'rejected'];
const ID_RE = /^(\d{4}-\d{2}-\d{2})-([a-z0-9][a-z0-9-]*)-([0-9a-f]{4})$/;
const FIELDS = ['RUN ID', 'Agent', 'Model', 'Status', 'Personas', 'Issues', 'Persona learning'];
const SECTIONS = ['Requested', 'Tasks', 'Files', 'Evidence', 'Acceptance criteria'];
/* a trailer naming a machine. Claude Code writes "Co-Authored-By: Claude …"; AGENTS.md §6 asks every
   agent for the same, under its own name. An agent line here means a machine touched this commit. */
const AGENT_TRAILER = /^Co-Authored-By:.*\b(claude|codex|copilot|cursor|gpt|gemini|grok|jules|aider|devin|amp)\b/im;

const field = (src, k) => {
  const m = new RegExp('^' + k.replace(/ /g, '\\s') + ':[ \\t]*(.*)$', 'im').exec(src);
  return m ? m[1].trim() : null;
};
const section = (src, h) => {  /* end of input is (?![\s\S]) — JavaScript has no \Z */
  const m = new RegExp('^##[ \\t]+' + h + '[ \\t]*$([\\s\\S]*?)(?=^##[ \\t]|(?![\\s\\S]))', 'im').exec(src);
  return m ? m[1] : null;
};
/* prose with every template placeholder and every blockquote marker taken out — so a run that
   shipped the TEMPLATE unedited reads as empty here rather than as four filled sections. */
const meat = s => (s || '').replace(/<[^>\n]*>/g, '').replace(/^[>\s*`-]+$/gm, '').replace(/```[\s\S]*?```/g, m => m).trim();

function gitLines(args) {
  try { return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }); }
  catch (e) { return null; }
}

/* Did a machine set this run to one of the owner's two words? Returns one of:
     {ran:false, why}      history is not readable here — SAY SO, never pass silently
     {ran:true, agent}     the commit that last touched the file, and whether it carries an agent trailer */
function lastTouch(rel) {
  /* PLANTED 2026-09-21 (finding A4): on a depth-1 clone `git log -1 -- <file>` does NOT return
     nothing — it returns HEAD for EVERY file, because the one commit in the clone is the snapshot
     that "created" all of them. The first draft assumed an empty answer meant shallow, so in CI it
     would have judged an accepted run by whatever commit happened to be on top: the day the owner
     accepts a run and an agent pushes anything after it, red on the agent's trailer. Ask git the
     question it can actually answer — IS this checkout shallow — and refuse before reading. */
  const shallow = gitLines(['rev-parse', '--is-shallow-repository']);
  if (shallow === null) return { ran: false, why: 'git is not available here' };
  if (shallow.trim() === 'true') return { ran: false, why: 'the checkout is shallow, and on a shallow clone `git log -1 -- file` returns HEAD for every file, which would be the wrong commit (ci.yml needs fetch-depth: 0 for this half to run)' };
  /* The hash and the message only — never the author's name or address. Until 2026-09-24 this read
     `%an <%ae>` and printed it in a NOTE on every CI run, and CI logs on a public repository are public:
     the owner's full name and a personal address, eleven times a run, from 2026-09-23. The question this
     answers is whether an AGENT set the word, which the trailer answers; who the human was is not asked. */
  const log = gitLines(['log', '-1', '--format=%H%x00%B', '--', rel]);
  if (log === null) return { ran: false, why: 'git log failed here' };
  if (!log.trim()) return { ran: false, why: 'no commit in this checkout touches the file' };
  const [sha, body] = log.split('\u0000');
  return { ran: true, sha: (sha || '').slice(0, 8), agent: AGENT_TRAILER.test(body || '') };
}

function runs(root) {
  root = root || ROOT;
  const dir = path.join(root, 'docs', 'runs');
  const P = [], board = {}, notes = [];
  STATUS.forEach(s => board[s] = 0);
  if (!fs.existsSync(dir)) {
    P.push('docs/runs/ does not exist — docs/RUNS.md describes a ledger this repository does not have');
    return { P, board, notes, n: 0 };
  }
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && f !== 'TEMPLATE.md').sort();
  if (!fs.existsSync(path.join(dir, 'TEMPLATE.md')))
    P.push('docs/runs/TEMPLATE.md is missing — every agent is told to copy it (AGENTS.md §6)');

  files.forEach(f => {
    const rel = 'docs/runs/' + f, src = fs.readFileSync(path.join(dir, f), 'utf8');
    const say = m => P.push(rel + ' ' + m);
    const id = field(src, 'RUN ID'), agent = field(src, 'Agent'), status = (field(src, 'Status') || '').toLowerCase();

    FIELDS.forEach(k => { if (field(src, k) === null) say('has no "' + k + ':" line — docs/RUNS.md §3 requires it'); });
    SECTIONS.forEach(h => {
      const body = section(src, h);
      if (body === null) say('has no "## ' + h + '" section — docs/RUNS.md §3 requires it');
      else if (!meat(body)) say('has a "## ' + h + '" section with nothing in it but the template\'s own placeholder — an empty field is not a filled one');
    });

    if (id === null) return;                       /* everything below reads the ID */
    if (f !== id + '.md') say('carries RUN ID "' + id + '", so its filename should be ' + id + '.md — the name and the ID are the same fact and two copies of a fact drift');
    const m = ID_RE.exec(id);
    if (!m) { say('has RUN ID "' + id + '", which is not YYYY-MM-DD-<agent>-<4 hex> (docs/RUNS.md §1)'); return; }
    if (agent && agent !== m[2])
      say('says Agent "' + agent + '" and carries "' + m[2] + '" inside its RUN ID — the agent\'s name is IN the ID so two agents cannot collide, and these two must be the same word');

    if (!STATUS.includes(status)) say('has Status "' + (field(src, 'Status') || '') + '", which is not one of: ' + STATUS.join(', '));
    else board[status]++;

    /* the acceptance criteria have to be TICKABLE, or "tracked automatically" is a sentence about
       prose. A checkbox is the only form a person and a machine both read the same way. */
    const ac = section(src, 'Acceptance criteria') || '';
    const boxes = (ac.match(/^[ \t]*[-*][ \t]*\[[ xX]\]/gm) || []).length;
    if (!boxes) say('has no checkbox under "## Acceptance criteria" — the owner asked for verification tests he can complete and track, and a paragraph is not a thing he can tick');

    /* ---- tokens and the model, per task (docs/RUNS.md §3½) ----
       The noun is a table ROW, not the word "tokens" appearing somewhere. Each row must carry a model
       ID, a tokens cell that is a number, an estimate (~N) or `unknown: <reason>`, and a method. A
       blank cell is the thing this exists to refuse: a number nobody can check that reads like one
       somebody did. */
    const tk = section(src, 'Tasks') || '';
    const rows = tk.split('\n').filter(l => /^\s*\|/.test(l) && !/^\s*\|\s*-/.test(l) && !/\|\s*task\s*\|/i.test(l))
      .map(l => l.split('|').slice(1, -1).map(c => c.trim())).filter(r => r.length >= 5 && !/^<.*>$/.test(r[0]));
    if (!rows.length) say('has no task row under "## Tasks" — the owner asked for tokens and the model per task, and a table with no rows records neither');
    rows.forEach(r => {
      const [task, who, model, tokens, how] = r;
      if (!model || /^<|marketing|opus 5$|sonnet$|gpt$|gemini$/i.test(model) && !/[-\d]/.test(model))
        say('task "' + task + '" names model "' + model + '" — the exact model ID is required, not a marketing name');
      if (!/^(~?[\d,]+|unknown:\s*\S.*)$/i.test(tokens || ''))
        say('task "' + task + '" has tokens "' + (tokens || '') + '" — a number, ~number, or "unknown: <reason>"; never blank');
      if (!how || /^<|^unknown:?\s*$/i.test(how))
        say('task "' + task + '" does not say how its token count was measured — a number with no method is a guess wearing digits');
    });

    const learn = field(src, 'Persona learning');
    if (learn && !/^none$/i.test(learn)) {
      const p = learn.replace(/^[`\[]|[`\])]$/g, '').replace(/\]\(.*$/, '').trim();
      if (!/^docs\/personas\/proposed\//.test(p))
        say('points its persona learning at "' + p + '" — a suggestion lives under docs/personas/proposed/ and never in the approved persona (AGENTS.md §9)');
      else if (!fs.existsSync(path.join(root, p)))
        say('names persona learning at "' + p + '" and there is no such file — the proposal is the RECORD of what was suggested and who decided (docs/RUNS.md §6, settled 2026-09-21), so it has to exist whether the session applied it or refused it');
    }

    /* ---- the owner's two words ---- */
    if (OWNER_ONLY.includes(status)) {
      const t = lastTouch(rel);
      if (!t.ran) notes.push(rel + ' is "' + status + '" and this check COULD NOT VERIFY who set it: ' + t.why +
                             '. That is not a pass — the binding record is the issue the owner closed (docs/RUNS.md §5)');
      else if (t.agent) say('is "' + status + '", and the commit that set it (' + t.sha + ') carries an agent\'s Co-Authored-By trailer — ' +
                            'accepted and rejected are the owner\'s two words and no agent may write either (AGENTS.md §8)');
      else notes.push(rel + ' is "' + status + '", set by ' + t.sha + ', which carries no agent trailer — a tripwire, not a vault');
    }
  });
  return { P, board, notes, n: files.length };
}

/* ---- THE COUNCIL (docs/council/README.md, 2026-09-20) ----
   More than one AI answering the same question, as a folder of positions written blind, never a
   thread — agent A's output as agent B's input is an injection channel by construction. The guard
   asks only what a folder can prove: the question is there and verbatim, the ground truth was
   written before the opinions, every file is somebody's, and the decision file was not written by
   a machine. It cannot prove nobody peeked; that is what separate branches are for. */
function council(root) {
  root = root || ROOT;
  const dir = path.join(root, 'docs', 'council'), P = [];
  if (!fs.existsSync(dir)) return { P, n: 0 };
  const folders = fs.readdirSync(dir, { withFileTypes: true }).filter(e => e.isDirectory()).map(e => e.name).sort();
  folders.forEach(f => {
    const d = path.join(dir, f), rel = 'docs/council/' + f, say = m => P.push(rel + ' ' + m);
    if (!/^\d{4}-\d{2}-\d{2}-[a-z0-9][a-z0-9-]*$/.test(f)) say('is not named YYYY-MM-DD-<topic>');
    const q = path.join(d, '00-question.md');
    if (!fs.existsSync(q)) say('has no 00-question.md — a council with no question on file is a thread');
    else if (!meat(fs.readFileSync(q, 'utf8'))) say('has an empty 00-question.md — the owner\'s words go there, verbatim');
    if (!fs.existsSync(path.join(d, '01-ground-truth.md'))) say('has no 01-ground-truth.md — positions written from memory re-propose what already shipped (the junta\'s rule 1)');
    fs.readdirSync(d).filter(x => x.endsWith('.md')).forEach(x => {
      if (x === '00-question.md' || x === '01-ground-truth.md' || x === 'zz-decision.md') return;
      if (!/^[a-z0-9][a-z0-9-]*\.md$/.test(x)) say('holds "' + x + '", which is not named for an agent — every position is somebody\'s');
    });
    const z = path.join(d, 'zz-decision.md');
    if (fs.existsSync(z)) {
      const t = lastTouch(rel + '/zz-decision.md');
      if (t.ran && t.agent) say('has a zz-decision.md whose last commit (' + t.sha + ') carries an agent trailer — the decision is the owner\'s word and no agent writes it');
    }
  });
  return { P, n: folders.length };
}

function selftest() {
  const os = require('os');
  const base = fs.mkdtempSync(path.join(os.tmpdir(), 'runs-selftest-'));
  const good = ['RUN ID: 2026-09-20-claude-a3f1', 'Agent: claude', 'Model: claude-fable-5-1', 'Status: verified', 'Personas: none',
                'Issues: none', 'Persona learning: none', '', '# a run', '',
                '## Requested', 'do the thing', '',
                '## Tasks', '| task | who | model | tokens | how measured |', '|---|---|---|---|---|',
                '| the thing | claude | claude-fable-5-1 | 12,000 | session usage delta |', '',
                '## Files', '- `a.js`', '', '## Evidence', 'node test/smoke.js → OK',
                '', '## Acceptance criteria', '- [ ] open the map and look', '', '## Persona learning', 'none', ''].join('\n');
  const mk = (name, body) => { const d = path.join(base, name, 'docs', 'runs');
    fs.mkdirSync(d, { recursive: true }); fs.writeFileSync(path.join(d, 'TEMPLATE.md'), 'template');
    Object.entries(body).forEach(([f, s]) => fs.writeFileSync(path.join(d, f), s)); return path.join(base, name); };

  const cases = [
    ['a well-formed run is green', mk('ok', { '2026-09-20-claude-a3f1.md': good }), 0],
    ['the filename disagrees with the RUN ID', mk('name', { '2026-09-20-claude-ffff.md': good }), 1],
    ['the ID is not the format', mk('fmt', { 'run-one.md': good.replace('2026-09-20-claude-a3f1', 'run-one') }), 1],
    ['Agent disagrees with the name inside the ID', mk('who', { '2026-09-20-claude-a3f1.md': good.replace('Agent: claude', 'Agent: codex') }), 1],
    ['a status nobody defined', mk('st', { '2026-09-20-claude-a3f1.md': good.replace('Status: verified', 'Status: nearly') }), 1],
    ['acceptance criteria with no checkbox', mk('box', { '2026-09-20-claude-a3f1.md': good.replace('- [ ] open the map and look', 'it looks fine to me') }), 1],
    ['the request left as the template placeholder', mk('ph', { '2026-09-20-claude-a3f1.md': good.replace('do the thing', '> <the owner\'s request, VERBATIM>') }), 1],
    ['persona learning aimed at the approved persona', mk('per', { '2026-09-20-claude-a3f1.md': good.replace('Persona learning: none', 'Persona learning: .claude/agents/pili.md') }), 1],
    ['a missing section', mk('sec', { '2026-09-20-claude-a3f1.md': good.replace('## Evidence\nnode test/smoke.js → OK\n', '') }), 1],
    ['no ledger at all', base + '/nothing', 1],
    ['no Model line', mk('mdl', { '2026-09-20-claude-a3f1.md': good.replace('Model: claude-fable-5-1\n', '') }), 1],
    ['a Tasks table with no rows', mk('tk0', { '2026-09-20-claude-a3f1.md': good.replace('| the thing | claude | claude-fable-5-1 | 12,000 | session usage delta |\n', '') }), 1],
    ['a task row with a blank tokens cell', mk('tkb', { '2026-09-20-claude-a3f1.md': good.replace('| 12,000 |', '|  |') }), 1],
    ['a task row with tokens but no method', mk('tkm', { '2026-09-20-claude-a3f1.md': good.replace('| session usage delta |', '|  |') }), 1],
    ['a task row with unknown tokens AND a reason is green', mk('tku', { '2026-09-20-claude-a3f1.md': good.replace('| 12,000 | session usage delta |', '| unknown: session ended first | unknown: session ended first |') }), 0],
    /* \Z is not end-of-input in JavaScript: it is the letter Z, and the 'i' flag makes it any z, so every section
       was cut at its first "z" (a handoff from a session in another project found it, 2026-09-23). */
    ['a task row with a "z" in it is green', mk('z1', { '2026-09-20-claude-a3f1.md': good.replace('| the thing |', '| the real size |') }), 0],
    ['acceptance criteria with a "z" before the checkbox is green', mk('z2', { '2026-09-20-claude-a3f1.md': good.replace('- [ ] open the map and look', 'sized for a phone:\n- [ ] open the map and look') }), 0],
  ];
  const mkc = (name, files) => { const d = path.join(base, name, 'docs', 'council', '2026-09-20-topic');
    fs.mkdirSync(d, { recursive: true }); Object.entries(files).forEach(([f, s]) => fs.writeFileSync(path.join(d, f), s));
    fs.mkdirSync(path.join(base, name, 'docs', 'runs'), { recursive: true }); fs.writeFileSync(path.join(base, name, 'docs', 'runs', 'TEMPLATE.md'), 't');
    return path.join(base, name); };
  const ccases = [
    ['a council with a question, ground truth and two named positions is green', mkc('c-ok', { '00-question.md': 'why', '01-ground-truth.md': 'x', 'claude.md': 'a', 'gemini.md': 'b' }), 0],
    ['a council with no question', mkc('c-q', { '01-ground-truth.md': 'x', 'claude.md': 'a' }), 1],
    ['a council with no ground truth', mkc('c-gt', { '00-question.md': 'why', 'claude.md': 'a' }), 1],
    ['a position file not named for an agent', mkc('c-nm', { '00-question.md': 'why', '01-ground-truth.md': 'x', 'Notes From Meeting.md': 'a' }), 1],
  ];
  ccases.forEach(([what, root, want]) => {
    const got = council(root).P.length ? 1 : 0, ok = got === want;
    console.log((ok ? '  ok   ' : '  FAIL ') + what + (ok ? '' : '  (wanted ' + (want ? 'red' : 'green') + ', got ' + (got ? 'red' : 'green') + ')'));
    if (!ok) bad.push(what);
  });
  const bad = [];
  cases.forEach(([what, root, want]) => {
    const got = runs(root).P.length ? 1 : 0;
    const ok = got === want;
    console.log((ok ? '  ok   ' : '  FAIL ') + what + (ok ? '' : '  (wanted ' + (want ? 'red' : 'green') + ', got ' + (got ? 'red' : 'green') + ')'));
    if (!ok) bad.push(what);
  });
  fs.rmSync(base, { recursive: true, force: true });
  if (bad.length) { console.log('FAIL — ' + bad.length + ' of ' + (cases.length + ccases.length)); process.exit(1); }
  console.log('OK — ' + (cases.length + ccases.length) + ' cases, planted on fixtures outside this repository.');
  process.exit(0);
}

if (require.main === module) {
  if (process.argv.includes('--selftest')) selftest();
  const { P, board, notes, n } = runs();
  const C = council(); P.push(...C.P);
  notes.forEach(s => console.log('  NOTE: ' + s));
  /* the standing board, printed every run — "what is waiting on me" is one command and nothing has
     to remember to update it. Printed even when the ledger is empty, because a silent zero and a
     working check look identical otherwise (docs/GAUGE.md). */
  console.log('  BOARD: ' + n + ' run(s), ' + C.n + ' council(s) — ' + STATUS.map(s => board[s] + ' ' + s).join(' · ') +
              (board.verified ? '   ← ' + board.verified + ' waiting on the owner' : ''));
  if (P.length) { console.log('FAIL\n- ' + P.join('\n- ')); process.exit(1); }
  console.log('OK — every run in docs/runs/ has a unique well-formed ID naming its agent, says what was asked and what proved it, ' +
              'carries acceptance criteria the owner can tick, and keeps persona learning out of the approved personas.');
  process.exit(0);
}
module.exports = { runs, council, STATUS, ID_RE };
