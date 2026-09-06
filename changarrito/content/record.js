/* El Changarrito — the record. The town reads the repo's open issues and puts them on the
   street; open PRs are permits at la ventanilla's window; low-tier issues are notes on the
   board. Fills the engine's RECORD seam (engine.js, beside NET). Rules, from the threat model
   (docs/story/el-changarrito.md §5): owner-authored only, filtered again client-side — issues,
   comments and PRs alike; plain text only, through the engine's own sanitisers; no token; no
   service worker; nothing here ever writes. The rule of weight (§1): a label picks the body.
   The first walk (§9): a plain-words paragraph first, three lines per person that cycle, and
   people stand in front of the building that matches what they carry. */
const RECORDSRC={
  enabled:true,
  owner:"rcguerrero29",repo:"meridian-quest",
  world:"st",
  /* where people stand: in front of the face that matches their first label (§9.1), then the
     open street. Past `cap` the rest are notes — a street with forty people is a queue */
  stands:{ask:[[3,3],[5,3],[7,3],[4,6],[6,6]],decision:[[18,3],[20,3],[19,6],[21,6]],
          bug:[[24,3],[26,3],[25,6],[27,6]],other:[[10,8],[14,8],[18,8],[6,10],[22,10],[12,12]]},
  cap:12,
  placed:{},      /* issue number → the npc key addChill() gave it */
  people:[],      /* the issues standing on the street, in order */
  notesList:[],   /* tier: low, and the overflow past cap */
  permits:[],     /* open PRs the owner authored */
  comments:{},    /* issue number → {updated, last:{by,body,at}} — the owner's last comment */
  cycle:{},       /* issue number → which of the three lines you hear next */
  filedAt:"",     /* when the record was last fetched, for "filed as of" */
  filter:[],      /* labels the street is narrowed to (empty = everyone); the rest go to the board */
  search:"",      /* a word the street is narrowed to (empty = everyone) */
  busy:false,
  every:(typeof REFRESH_MS==="number")?REFRESH_MS:5*60*1000,      /* 0 = no clock: open, writes, ↻ */
  showPermits:(typeof SHOW_PERMITS==="boolean")?SHOW_PERMITS:true,
  mainVersion:null, /* GAMEV as main has it, read from the repo — "run line 2" when it differs */
  prev:{seen:"",known:[]}, /* the last visit: when, and which people were on file — for the news */
  boot(){
    try{this.prev={seen:localStorage.getItem(SK("seen"))||"",known:JSON.parse(localStorage.getItem(SK("known"))||"[]")||[]};}catch(e){}
    try{this.titles=JSON.parse(localStorage.getItem(SK("titles"))||"{}")||{};}catch(e){this.titles={};}
    try{this.cycle=JSON.parse(localStorage.getItem(SK("cycle"))||"{}")||{};}catch(e){this.cycle={};}
    try{const f=JSON.parse(localStorage.getItem(SK("filter"))||"null");if(f){this.filter=f.labels||[];this.search=f.search||"";if(["weight","newest","oldest","number"].includes(f.sort))this.sort=f.sort;}}catch(e){}
    const v=WORLDS[this.world]&&WORLDS[this.world].npcs.find(n=>n.npc==="ventanilla");
    if(v)v.doc="window"; /* the clerk hands you the city's record */
    this.refresh().then(()=>{this.markSeen();const n=this.news();
      if(n.answered.length||n.fresh.length||n.gone.length)this.say("Since your last visit: "+n.answered.length+" answered · "+n.fresh.length+" new · "+n.gone.length+" went home — la ventanilla has the list.","Desde tu última visita: "+n.answered.length+" contestados · "+n.fresh.length+" nuevos · "+n.gone.length+" se fueron — la ventanilla tiene la lista.");
      if(this.behind())this.say("You are on "+GAMEV+"; main is on "+this.mainVersion+". Run line 2 of el pregonero's sheet (git pull), then reload.","Estás en "+GAMEV+"; main va en "+this.mainVersion+". Corre la línea 2 de la hoja del pregonero (git pull) y recarga.");});
    const kw=this.keyWarning();if(kw)setTimeout(()=>this.say(kw,kw),1200); /* short or dead: said once, at the door */
    if(this.every>0){setInterval(()=>this.refresh(),this.every);
      document.addEventListener("visibilitychange",()=>{if(!document.hidden)this.refresh();});}
  },
  async refresh(){
    const list=await this.load();
    this.place(list);
    if(this.refused&&!this.saidRefused){this.saidRefused=true;this.say("GitHub refused the read (rate limit) until "+this.refused+" — la ventanilla has the details.","GitHub rechazó la lectura (límite) hasta las "+this.refused+" — la ventanilla tiene los detalles.");}
    if(this.showPermits)this.permits=await this.loadPulls();
    await this.loadComments(this.people);
    await this.checkVersion();
  },
  /* ---------- ch-v13: the news since your last visit ----------
     The last visit is remembered under the prefix — when, and which people were on file. On the
     next open the difference is the news: who answered (a session's comment since then), who is
     new, who went home (closed), and which decisions are waiting on you. Said once at the door,
     listed on la ventanilla's card with a "walk there" for each. */
  markSeen(){if(this.refused&&!this.all.length)return; /* a refused read is not a visit */
    try{localStorage.setItem(SK("seen"),new Date(Date.now()).toISOString());localStorage.setItem(SK("known"),JSON.stringify(this.all.map(i=>i.n)));}catch(e){}},
  news(){const seen=this.prev.seen||"",known=new Set(this.prev.known||[]),all=this.all||[];
    const answered=all.filter(i=>{const c=this.comments[i.n],l=c&&c.last;return l&&l.answer&&String(l.ts||"")>seen;});
    const fresh=all.filter(i=>!known.has(i.n));
    const gone=[...known].filter(n=>!all.some(i=>i.n===n)).map(n=>({n,title:(this.titles&&this.titles[n])||("#"+n)}));
    const waiting=all.filter(i=>(i.labels||[]).includes("decision"));
    return {seen,answered,fresh,gone,waiting};},
  /* walk to a person: the reader closes and you stand beside them, facing them; someone on the
     board opens the board instead */
  walkTo(n){const w=WORLDS[this.world],key=this.placed[n],p=key&&w.npcs.find(m=>m.key===key);
    if(!p){docOpen("board");return false;}
    const spot=[[0,1],[1,0],[-1,0],[0,-1]].map(([dx,dy])=>[p.x+dx,p.y+dy]).find(([x,y])=>!isSolidAt(this.world,x,y));
    if(!spot)return false;
    world=this.world;px=fx=spot[0];py=fy=spot[1];held=null;dir=spot[1]>p.y?"up":spot[1]<p.y?"down":spot[0]>p.x?"left":"right";
    try{$("reader").hidden=true;}catch(e){}try{setWorldTag();}catch(e){}try{if(typeof t3Invalidate==="function")t3Invalidate();}catch(e){}
    return true;},
  /* ---------- ch-v13: "run line 2" — the version main has, read from the repo ----------
     One conditional GET of the town's own config on main (an ETag makes the repeat free), decoded,
     GAMEV read out. Differs from the one running → la ventanilla says which line to run. Anything
     odd (no network, a refusal, a shape we do not know) → she says nothing. */
  async checkVersion(){try{
      const d=await this.get("verfile","/contents/changarrito/content/config.js?ref=main",null);
      const b64=d&&typeof d.content==="string"?d.content.replace(/\s/g,""):"";if(!b64){this.mainVersion=null;return null;}
      const txt=new TextDecoder().decode(Uint8Array.from(atob(b64),c=>c.charCodeAt(0)));
      const m=/GAMEV\s*=\s*"([^"]{1,60})"/.exec(txt);this.mainVersion=m?m[1]:null;return this.mainVersion;
    }catch(e){this.mainVersion=null;return null;}},
  behind(){return !!(this.mainVersion&&typeof GAMEV==="string"&&this.mainVersion!==GAMEV);},
  api(path){return "https://api.github.com/repos/"+this.owner+"/"+this.repo+path;},
  /* one conditional GET with a last-good copy under the town's own prefix.
     ch-v6: signed when you are signed in — an unsigned read gets 60 an hour and a refresh spends
     a dozen, so an afternoon of reloads left the street empty (owner, 2026-09-06). A key that
     cannot read a path (Issues-only, asked for pulls) is refused once and the public API answers
     instead. A rate-limit refusal is noted, with the minute it lifts, for la ventanilla to say. */
  refused:"",     /* "" or the time GitHub reopens, when the last read was rate-limited */
  async get(key,path,fallback){
    let cached=null;try{cached=JSON.parse(localStorage.getItem(SK(key))||"null");}catch(e){}
    const h={Accept:"application/vnd.github+json"};
    if(cached&&cached.etag)h["If-None-Match"]=cached.etag;
    const t=this.token();if(t)h.Authorization="Bearer "+t;
    try{
      let r=await fetch(this.api(path),{headers:h});
      if(t&&(r.status===401||r.status===403)&&!this.limited(r)){delete h.Authorization;r=await fetch(this.api(path),{headers:h});}
      this.noteLimit(r);
      if(r.status===304&&cached)return cached.data;
      if(!r.ok)throw new Error("HTTP "+r.status);
      const data=await r.json();
      try{localStorage.setItem(SK(key),JSON.stringify({etag:r.headers.get("ETag")||"",at:Date.now(),data}));}catch(e){}
      this.filedAt=new Date().toISOString().slice(0,10);
      return data;
    }catch(e){console.warn("RECORD: "+path+" offline or refused ("+(e&&e.message)+") — the last good copy stands");
      if(cached){this.filedAt=new Date(cached.at||0).toISOString().slice(0,10);return cached.data;}return fallback;}
  },
  limited(r){try{return r.status===403&&r.headers.get("x-ratelimit-remaining")==="0";}catch(e){return false;}},
  noteLimit(r){if(this.limited(r)){const at=parseInt(r.headers.get("x-ratelimit-reset")||"0",10)*1000;
      const d=at?new Date(at):new Date(Date.now()+3600e3);this.refused=d.getHours().toString().padStart(2,"0")+":"+d.getMinutes().toString().padStart(2,"0");}
    else if(r.ok||r.status===304)this.refused="";},
  async load(){
    const raw=await this.get("issues","/issues?state=open&per_page=100&creator="+this.owner,[]);
    return this.trim(raw);
  },
  /* control characters, bidi and zero-width marks out; a hard cap on length */
  clean(s,max){return String(s||"").replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g,"").replace(/[\u0000-\u0008\u000B-\u001f]/g,"").trim().slice(0,max);},
  mine(x){return x&&x.user&&x.user.login===this.owner;},
  isAnswer(x){return !!(x&&/Generated by \[Claude Code\]/.test(String(x.body||"")));},
  stripFooter(b){return String(b||"").replace(/\n*-{3,}\s*_?Generated by \[Claude Code\][^\n]*_?\s*$/,"").trim();},
  /* keep only what a person on the street needs; drop PRs and anything not the owner's */
  trim(raw){return (Array.isArray(raw)?raw:[]).filter(i=>i&&!i.pull_request&&this.mine(i))
    .map(i=>({n:i.number|0,title:this.clean(i.title,200),body:this.clean(i.body,4000),
      labels:(i.labels||[]).map(l=>this.clean(typeof l==="string"?l:(l&&l.name),40)).filter(Boolean),
      at:String(i.created_at||"").slice(0,10),updated:String(i.updated_at||""),
      comments:i.comments|0,url:this.clean(i.html_url,200)}));},
  /* the permits: open PRs the owner authored, with green and mergeable — an N+1 the plan priced */
  async loadPulls(){
    const raw=await this.get("pulls","/pulls?state=open&per_page=20",[]);
    const mine=(Array.isArray(raw)?raw:[]).filter(p=>this.mine(p)&&p.head&&p.head.repo&&p.head.repo.full_name===this.owner+"/"+this.repo).slice(0,5);
    const out=[];
    for(const p of mine){
      const n=p.number|0;
      const full=await this.get("pull"+n,"/pulls/"+n,null);
      let green=null;
      const sha=p.head&&p.head.sha;
      if(sha){const cr=await this.get("checks"+sha.slice(0,12),"/commits/"+sha+"/check-runs",null);
        if(cr&&Array.isArray(cr.check_runs)&&cr.check_runs.length)green=cr.check_runs.every(c=>c.conclusion==="success");}
      out.push({n,title:this.clean(p.title,200),at:String(p.created_at||"").slice(0,10),
        mergeable:full?full.mergeable:null,green,draft:!!p.draft,url:this.clean(p.html_url,200)});
    }
    return out;
  },
  /* the owner's last comment on the issues that have any — capped per refresh, cached by updated */
  async loadComments(people){
    let done=0;
    for(const i of people){
      if(!i.comments||done>=8)continue;
      const c=this.comments[i.n];if(c&&c.updated===i.updated)continue;
      const raw=await this.get("cm"+i.n,"/issues/"+i.n+"/comments?per_page=30",[]);done++;
      const mine=(Array.isArray(raw)?raw:[]).filter(x=>this.mine(x));
      /* a session's answer carries the Claude Code footer; the owner's own words do not. The third
         line prefers the last ANSWER; the footer itself is never said on the street */
      const answers=mine.filter(x=>this.isAnswer(x));
      const last=answers.length?answers[answers.length-1]:(mine.length?mine[mine.length-1]:null);
      this.comments[i.n]={updated:i.updated,last:last?{body:this.clean(this.stripFooter(last.body),1500),at:String(last.created_at||"").slice(0,10),ts:String(last.created_at||""),answer:this.isAnswer(last)}:null};
    }
  },
  /* ---------- Part 3: the town writes. A token typed once, kept under the town's prefix, never
     in a save, never in a sheet. Every write goes through one door and refreshes the street. ---------- */
  token(){try{return localStorage.getItem(SK("token"))||"";}catch(e){return "";}},
  signIn(t){const v=String(t||"").trim();if(!v)return false;
    try{localStorage.setItem(SK("token"),v);localStorage.setItem(SK("tokenAt"),new Date(Date.now()).toISOString());localStorage.removeItem(SK("tokenExp"));}catch(e){return false;}return true;},
  signOut(){try{["token","tokenAt","tokenExp"].forEach(k=>localStorage.removeItem(SK(k)));}catch(e){}},
  /* ---------- ch-v5: the key has a date. A fine-grained token dies on its own (30 days is the
     README's rule); GitHub says the exact day in a header on every answer the token signs, and
     the town believes that over its own count from the day of sign-in. Nothing here leaves the
     browser: two dates under the town's prefix, beside the token, gone with it at sign-out. ---------- */
  newTokenUrl:"https://github.com/settings/personal-access-tokens/new",
  keyDays:30,
  expiry(){if(!this.token())return null;
    try{const e=localStorage.getItem(SK("tokenExp"));if(e){const d=new Date(e);if(!isNaN(d))return d;}
      const a=localStorage.getItem(SK("tokenAt"));if(a){const d=new Date(a);if(!isNaN(d))return new Date(d.getTime()+this.keyDays*864e5);}}catch(e){}
    return null;},
  daysLeft(){const e=this.expiry();return e?Math.floor((e.getTime()-Date.now())/864e5):null;},
  noteExpiry(r){try{const h=r&&r.headers&&r.headers.get("github-authentication-token-expiration");if(!h)return;
      const d=new Date(h.trim().replace(" UTC","Z").replace(" ","T"));if(!isNaN(d))localStorage.setItem(SK("tokenExp"),d.toISOString());}catch(e){}},
  /* what la ventanilla says about the key: null while it has time, a sentence when it is short or gone */
  keyWarning(){const d=this.daysLeft();if(d===null||d>5)return null;const es=lang==="es";
    if(d<0)return es?"Tu llave ya caducó. Haz una nueva en GitHub y vuelve a identificarte — leer sigue funcionando.":"Your key has run out. Make a new one on GitHub and sign in again — reading still works.";
    const dd=d+(es?(d===1?" día":" días"):(d===1?" day":" days"));
    return es?"Tu llave caduca en "+dd+". Haz una nueva en GitHub cuando puedas.":"Your key runs out in "+dd+". Make a new one on GitHub when you can.";},
  openNewToken(){try{window.open(this.newTokenUrl,"_blank","noopener");}catch(e){}
    this.say("GitHub opened in a new tab: only this repo, Issues read and write, 30 days. Copy it and Sign in here.","GitHub se abrió en otra pestaña: solo este repo, Issues lectura y escritura, 30 días. Cópialo e identifícate aquí.");},
  say(en,es){toast("💬 "+(lang==="es"?es:en),3200);},
  async write(method,path,body){
    const t=this.token();
    if(!t){this.say("Sign in at la ventanilla's window first — the town cannot write without your token.","Primero identifícate en la ventanilla — el pueblo no puede escribir sin tu token.");return null;}
    if(this.busy)return null;this.busy=true;
    try{
      const r=await fetch(this.api(path),{method,headers:{Accept:"application/vnd.github+json","Content-Type":"application/json",Authorization:"Bearer "+t},body:body===undefined?undefined:JSON.stringify(body)});
      this.noteExpiry(r);
      if(r.status===401||r.status===403){const d=this.daysLeft();
        if(d!==null&&d<0)this.say("Your key has run out ("+r.status+"). Make a new token on GitHub and sign in again.","Tu llave ya caducó ("+r.status+"). Haz un token nuevo en GitHub e identifícate otra vez.");
        else this.say("The token was refused ("+r.status+"). Sign in again with a token for this repo.","El token fue rechazado ("+r.status+"). Identifícate otra vez con un token para este repo.");return null;}
      if(!r.ok){this.say("The city refused it ("+r.status+").","La ciudad lo rechazó ("+r.status+").");return null;}
      const data=r.status===204?{}:await r.json().catch(()=>({}));
      /* the next read is fresh — the ETag goes, the copy stays: a refused read after a write
         used to leave the street empty (ch-v6) */
      try{["issues","pulls"].forEach(k=>{const c=JSON.parse(localStorage.getItem(SK(k))||"null");if(c){c.etag="";localStorage.setItem(SK(k),JSON.stringify(c));}});}catch(e){}
      await this.refresh();
      return data;
    }catch(e){this.say("No network — nothing was written.","Sin red — no se escribió nada.");return null;}
    finally{this.busy=false;}
  },
  /* Done: the issue closes; the person goes home on the refresh */
  async done(n){const d=await this.write("PATCH","/issues/"+n,{state:"closed",state_reason:"completed"});
    if(d)this.say("Filed as done. #"+n+" goes home.","Archivado como hecho. #"+n+" se va a su casa.");return d;},
  /* Ask for more context: one comment; the next session answers in plain words */
  async askMore(n){const d=await this.write("POST","/issues/"+n+"/comments",{body:"más contexto, por favor"});
    if(d)this.say("Asked. The next session will answer in plain words.","Pedido. La siguiente sesión contesta en palabras llanas.");return d;},
  /* Comment: your own words on the issue, as you — the free-text sibling of Ask for more context */
  async comment(n,text){const b=this.clean(text,1500);if(!b)return null;
    const d=await this.write("POST","/issues/"+n+"/comments",{body:b});
    if(d)this.say("Commented on #"+n+".","Comentado en #"+n+".");return d;},
  async addLabel(n,label){const l=this.clean(label,40);if(!l)return null;return this.write("POST","/issues/"+n+"/labels",{labels:[l]});},
  async removeLabel(n,label){const l=this.clean(label,40);if(!l)return null;return this.write("DELETE","/issues/"+n+"/labels/"+encodeURIComponent(l));},
  /* File a request: the body template every issue reads by (§10.4). A session fills the two
     headings marked for it when it first reads the issue */
  requestBody(f){return "**In plain words:** "+this.clean(f.plain,1500)+"\n\n**Notes:** "+(this.clean(f.notes,1500)||"—")
    +"\n\n**Questions to consider:** _(a session fills this when it first reads the issue)_"
    +"\n\n**Areas affected:** _(a session fills this when it first reads the issue)_"
    +"\n\n**Done when:** "+(this.clean(f.done,600)||"—")+"\n\nFiled from El Changarrito.";},
  async file(f){const title=this.clean(f.title,120);if(!title){this.say("A request needs a title.","Una petición necesita título.");return null;}
    const labels=["tier: "+(["high","normal","low"].includes(f.tier)?f.tier:"normal"),["ask","decision","bug"].includes(f.kind)?f.kind:"ask"]
      .concat((f.tags||[]).map(l=>this.clean(l,40)).filter(l=>l&&!/^tier: /.test(l)&&!["ask","decision","bug"].includes(l)).slice(0,5));
    const d=await this.write("POST","/issues",{title,body:this.requestBody(f),labels});
    if(d&&d.number)this.say("Filed as #"+d.number+". They will be on the street shortly.","Archivado como #"+d.number+". Pronto estarán en la calle.");return d;},
  /* ---------- ch-v14: every popup is a form in the reader (owner: "show me what you mean for #2") ----------
     One screen each, every field visible beside the paperwork, cancel costs nothing. The reader
     renders the fields (engine mq-v76); the record acts on the values. */
  formTags:[],   /* tags pre-picked for the next request — where you filed it from (the index, PR 3) */
  tagOpts(){const seen=this.labelsSeen().filter(o=>!/^tier: /.test(o.v)&&!["ask","decision","bug"].includes(o.v)).map(o=>o.v);
    return [...new Set(["changarrito","ventanilla",...seen])].map(v=>({v,t:v}));},
  requestDoc(){const es=lang==="es",self=this;return [{form:{fields:[
      {k:"title",label:es?"Título (corto)":"Title (short)",type:"text"},
      {k:"plain",label:es?"En palabras llanas — qué es, por qué importa":"In plain words — what this is, why it matters",type:"area"},
      {k:"notes",label:es?"Notas (opcional)":"Notes (optional)",type:"area"},
      {k:"done",label:es?"Está hecho cuando…":"Done when…",type:"text"},
      {k:"kind",label:es?"Tipo":"Kind",type:"select",opts:[{v:"ask",t:es?"petición (ask)":"ask"},{v:"decision",t:es?"decisión":"decision"},{v:"bug",t:"bug"}],value:"ask"},
      {k:"tier",label:es?"Peso":"Weight",type:"select",opts:[{v:"normal",t:"normal"},{v:"high",t:"high"},{v:"low",t:"low"}],value:"normal"},
      {k:"tags",label:es?"Etiquetas":"Tags",type:"checks",opts:this.tagOpts(),value:this.formTags}],
    submit:es?"📨 Presentar":"📨 File it",cancel:es?"Cancelar":"Cancel",onCancel:()=>docOpen("window"),
    run:v=>{self.file(v).then(d=>{if(d)docOpen("window");});}}}];},
  signInDoc(){const es=lang==="es",self=this;return [
    {p:es?"Una llave de GitHub solo para issues de este repo (lectura y escritura), 30 días. Se queda en este navegador y en ningún otro lado.":"A GitHub key for issues on this repo only (read and write), 30 days. It stays in this browser and nowhere else."},
    {form:{fields:[{k:"token",label:es?"Pega la llave":"Paste the key",type:"password"}],submit:es?"🔑 Identificarme":"🔑 Sign in",cancel:es?"Cancelar":"Cancel",onCancel:()=>docOpen("window"),
      run:v=>{if(self.signIn(v.token)){self.say("Signed in. Nothing else was stored.","Identificado. No se guardó nada más.");docOpen("window");}}}}];},
  filterDoc(){const es=lang==="es",self=this;return [{form:{fields:[
      {k:"labels",label:es?"Etiquetas (todas deben coincidir)":"Labels (all must match)",type:"checks",opts:this.labelsSeen(),value:this.filter},
      {k:"search",label:es?"Una palabra":"A word",type:"text",value:this.search}],
    submit:es?"🔍 Acotar":"🔍 Narrow",cancel:es?"Cancelar":"Cancel",onCancel:()=>docOpen("window"),
    run:v=>{self.setFilter(v.labels||[],v.search||"");docOpen("window");}}}];},
  commentDoc(i){const es=lang==="es",self=this,back=()=>docOpen(self.doc(i));
    return {title:{en:"Comment on #"+i.n,es:"Comentar en #"+i.n},build:()=>[{p:i.title},{form:{fields:[{k:"text",label:es?"Tu comentario, con tus palabras":"Your comment, in your own words",type:"area"}],
      submit:es?"💬 Publicar":"💬 Post",cancel:es?"Volver":"Back",onCancel:back,run:v=>{self.comment(i.n,v.text).then(back);}}}]};},
  labelsDoc(i){const es=lang==="es",self=this,back=()=>docOpen(self.doc(i));
    return {title:{en:"Labels on #"+i.n,es:"Etiquetas de #"+i.n},build:()=>[{p:i.title},{form:{fields:[
        {k:"on",label:es?"Etiquetas":"Labels",type:"checks",opts:this.labelsSeen(),value:i.labels||[]},
        {k:"add",label:es?"Una etiqueta nueva":"A new label",type:"text"}],
      submit:es?"🏷️ Guardar":"🏷️ Save",cancel:es?"Volver":"Back",onCancel:back,
      run:v=>{self.setLabels(i,v.on||[],v.add||"").then(back);}}}]};},
  async setLabels(i,on,add){const cur=new Set(i.labels||[]),want=new Set((on||[]).map(l=>this.clean(l,40)).filter(Boolean));
    const a=this.clean(add,40);if(a)want.add(a);
    for(const l of want)if(!cur.has(l))await this.addLabel(i.n,l);
    for(const l of cur)if(!want.has(l))await this.removeLabel(i.n,l);
    i.labels=[...want];},
  /* a pick opens a comment (owner: "your pic should open up a comment right?"): the options are
     read off the paperwork and the last answer — numbered or bulleted lines — plus "other" */
  picks(i){const c=this.comments[i.n],src=((c&&c.last&&c.last.body)||"")+"\n"+(i.body||"");const out=[];
    src.split("\n").forEach(l=>{const m=/^\s*(?:\d+[.)]|[-•*])\s+(.{3,120}?)\s*$/.exec(l);if(m&&out.length<8)out.push(m[1].replace(/[`*_#>]/g,"").trim());});
    return out;},
  decideDoc(i){const es=lang==="es",self=this,back=()=>docOpen(self.doc(i)),opts=this.picks(i).map(v=>({v,t:v}));
    return {title:{en:"Decide #"+i.n,es:"Decidir #"+i.n},build:()=>[{p:i.title},{form:{fields:[
        {k:"pick",label:es?"Tu elección":"Your pick",type:"select",opts:opts.concat([{v:"__other",t:es?"otra — abajo":"other — below"}]),value:opts.length?opts[0].v:"__other"},
        {k:"other",label:es?"Otra elección":"Other pick",type:"text"},
        {k:"note",label:es?"Nota (opcional)":"Note (optional)",type:"area"}],
      submit:es?"⚖️ Publicar mi elección":"⚖️ Post my pick",cancel:es?"Volver":"Back",onCancel:back,
      run:v=>{const pick=v.pick==="__other"?self.clean(v.other,200):v.pick;if(!pick)return;
        self.comment(i.n,"Pick: "+pick+(self.clean(v.note,1000)?" — "+self.clean(v.note,1000):"")).then(back);}}}]};},
  /* ch-v9 (#42): every label the record has seen, grouped for a dropdown — weight, kind, the rest */
  all:[],         /* the last list the record placed, filter or no filter */
  sort:"weight",  /* who gets the street first: weight (tier), newest, oldest, number */
  labelsSeen(){const seen=new Set();this.all.forEach(i=>(i.labels||[]).forEach(l=>seen.add(l)));
    const es=lang==="es",g=l=>l.startsWith("tier: ")?(es?"peso":"weight"):["ask","decision","bug"].includes(l)?(es?"tipo":"kind"):(es?"otras":"other");
    const order={weight:0,peso:0,kind:1,tipo:1,other:2,otras:2};
    return [...seen].sort((a,b)=>(order[g(a)]-order[g(b)])||a.localeCompare(b)).map(l=>({v:l,t:l,g:g(l)}));},
  sortPeople(list){const by=this.sort,t={high:0,normal:1,low:2};
    const cmp={newest:(a,b)=>String(b.at).localeCompare(String(a.at))||b.n-a.n,oldest:(a,b)=>String(a.at).localeCompare(String(b.at))||a.n-b.n,
      number:(a,b)=>a.n-b.n,weight:(a,b)=>(t[this.tier(a)]-t[this.tier(b)])||b.n-a.n}[by]||((a,b)=>0);
    return list.slice().sort(cmp);},
  setSort(v){this.sort=["weight","newest","oldest","number"].includes(v)?v:"weight";this.setFilter(this.filter,this.search);},
  setFilter(labels,search){this.filter=(labels||[]).map(l=>this.clean(l,40)).filter(Boolean);this.search=this.clean(search,60).toLowerCase();
    try{localStorage.setItem(SK("filter"),JSON.stringify({labels:this.filter,search:this.search,sort:this.sort}));}catch(e){}
    this.load().then(l=>this.place(l));},
  matches(i){if(this.filter.length&&!this.filter.every(l=>(i.labels||[]).includes(l)))return false;
    if(this.search&&!((i.title||"")+" "+(i.body||"")).toLowerCase().includes(this.search))return false;return true;},
  tier(i){const L=i.labels||[];return L.includes("tier: high")?"high":L.includes("tier: normal")?"normal":"low";},
  kind(i){const L=i.labels||[];return L.includes("bug")?"bug":L.includes("decision")?"decision":L.includes("ask")?"ask":"other";},
  name(i){return sanName(String(i.title||"").replace(/^[^\p{L}\p{N}]+/u,""))||("#"+i.n);},
  look(i){const c={bug:"#C0392B",ask:"#2F6DB5",decision:"#D4A017",ventanilla:"#1F8A8A",changarrito:"#7A4FBF"};
    const k=Object.keys(c).find(k2=>(i.labels||[]).includes(k2));const lk=randLook();if(k)lk.shirt=c[k];return lk;},
  paras(body){return String(body||"").split(/\n{2,}/).map(p=>p.replace(/\s*\n\s*/g," ").trim()).filter(Boolean);},
  /* the plain-words paragraph first (§9.2): the one under "In plain words:", else the first */
  plain(i){const ps=this.paras(i.body);
    const hit=ps.find(p=>/^\**in plain words:?\**/i.test(p));
    const p=hit?hit.replace(/^\**in plain words:?\**\s*/i,""):(ps[0]||"");
    return p.replace(/[`*_#>]/g,"")||("Issue #"+i.n+".");},
  days(at){const d=Math.round((Date.now()-new Date(at||Date.now()).getTime())/864e5);return d<=0?"today":d===1?"yesterday":d+" days ago";},
  /* the three lines (§9.3): plain words → the paperwork → what's next */
  lines(i){const es=lang==="es";const c=this.comments[i.n],last=c&&c.last;
    return [
      {k:es?"En palabras llanas":"In plain words",t:this.plain(i)},
      {k:es?"El papeleo":"The paperwork",t:"#"+i.n+" · "+((i.labels||[]).join(", ")||"—")+" · "+(es?"archivado ":"filed ")+this.days(i.at)+(i.comments?(es?" · "+i.comments+" comentario(s)":" · "+i.comments+" comment(s)"):"")},
      {k:es?"Lo que sigue":"What's next",t:last?((es?"Última respuesta, ":"Last answer, ")+last.at+": "+last.body.replace(/[`*_#>]/g,"")):(es?"Nadie ha contestado todavía — pídeme más contexto.":"Nobody has answered yet — ask me for more context.")}];},
  /* the document a person hands you: the line you hear this time, then the paperwork. Built
     fresh on every open; the cycle advances per open and lives under the town's prefix */
  doc(i){const self=this;return {title:{en:i.title,es:i.title},
    build(){const L=self.lines(i),k=(self.cycle[i.n]|0)%L.length;
      self.cycle[i.n]=k+1;try{localStorage.setItem(SK("cycle"),JSON.stringify(self.cycle));}catch(e){}
      const s=[{h:"💬 "+L[k].k},{p:L[k].t},{h:lang==="es"?"El expediente":"The paperwork"}];
      self.paras(i.body).slice(0,14).forEach(p=>s.push({p:p.replace(/[`*_#>]/g,"")}));
      s.push({kv:[["#",String(i.n)],["labels",(i.labels||[]).join(", ")||"—"],["opened",i.at||"—"],["url",i.url||"—"]]});
      const es=lang==="es";
      s.push({h:es?"Qué puedes hacer":"What you can do"});
      s.push({p:self.token()?(es?"Estás identificado: cada botón escribe en GitHub como tú.":"You are signed in: each button writes to GitHub as you.")
        :(es?"Sin identificar: los botones pedirán que te identifiques primero en la ventanilla (arriba, en la pared del ayuntamiento). Leer, filtrar y buscar no necesitan token.":"Not signed in: the buttons will ask you to sign in first at la ventanilla (up top, in city hall's wall). Reading, filtering and searching need no token.")});
      s.push({btn:es?"✅ Hecho — cerrar #"+i.n:"✅ Done — close #"+i.n,run:()=>self.done(i.n)});
      s.push({btn:es?"❓ Pídeme más contexto":"❓ Ask for more context",run:()=>self.askMore(i.n)});
      s.push({btn:es?"💬 Comentar con mis palabras":"💬 Comment in my own words",run:()=>docOpen(self.commentDoc(i))});
      if((i.labels||[]).includes("decision"))s.push({btn:es?"⚖️ Decidir":"⚖️ Decide",run:()=>docOpen(self.decideDoc(i))});
      s.push({btn:es?"🏷️ Etiquetas":"🏷️ Labels",run:()=>docOpen(self.labelsDoc(i))});
      return s;}};},
  /* la ventanilla's document: the permits, then the count of people and notes. Past tense only */
  windowDoc(){const es=lang==="es",s=[];const self=this;
    s.push({p:(es?"Archivado al ":"Filed as of ")+(this.filedAt||(es?"— sin fecha —":"— no date —"))+"."});
    if(this.behind())s.push({p:(es?"⬆️ Estás en "+GAMEV+"; main va en "+this.mainVersion+". Corre la línea 2 de la hoja del pregonero (git pull) y recarga la página.":"⬆️ You are on "+GAMEV+"; main is on "+this.mainVersion+". Run line 2 of el pregonero's sheet (git pull), then reload the page.")});
    /* the news since your last visit */
    const nw=this.news(),seenDay=nw.seen?nw.seen.slice(0,10):"";
    s.push({h:(es?"Desde tu última visita":"Since your last visit")+(seenDay?" · "+seenDay:"")});
    if(!nw.answered.length&&!nw.fresh.length&&!nw.gone.length)s.push({p:es?"Nada nuevo. Las decisiones que esperan tu palabra siguen abajo.":"Nothing new. The decisions waiting on you are listed below."});
    const walk=(i,pre)=>s.push({btn:pre+" #"+i.n+" · "+String(i.title||"").replace(/^❗/,"").slice(0,48),run:()=>self.walkTo(i.n)});
    nw.answered.slice(0,6).forEach(i=>walk(i,es?"💬 contestado →":"💬 answered →"));
    nw.fresh.slice(0,6).forEach(i=>walk(i,es?"🆕 nuevo →":"🆕 new →"));
    nw.gone.slice(0,6).forEach(g=>s.push({p:(es?"🏠 se fue a casa: #":"🏠 went home: #")+g.n+" · "+String(g.title).replace(/^❗/,"").slice(0,60)}));
    if(nw.waiting.length){s.push({p:(es?"⚖️ ":"⚖️ ")+nw.waiting.length+(es?" decisión(es) esperan tu palabra:":" decision(s) waiting on you:")});nw.waiting.slice(0,6).forEach(i=>walk(i,es?"⚖️ decidir →":"⚖️ decide →"));}
    if(this.showPermits){
    s.push({h:es?"Permisos":"Permits"});
    if(!this.permits.length)s.push({p:es?"La ciudad no tiene ningún permiso pendiente en el expediente.":"The city has no permit pending on file."});
    this.permits.forEach(p=>{const st=p.draft?(es?"borrador":"draft"):p.green===true?(es?"en verde":"green"):p.green===false?(es?"en rojo":"red"):(es?"sin revisar":"unchecked");
      const mg=p.mergeable===true?(es?"sin conflictos":"no conflicts"):p.mergeable===false?(es?"con conflictos":"conflicts"):"";
      s.push({kv:[["#"+p.n,p.title],[es?"estado":"state",st+(mg?" · "+mg:"")],[es?"presentado":"filed",p.at],["url",p.url]]});});
    }
    s.push({h:es?"La calle":"The street"});
    s.push({p:(es?"Hay ":"There are ")+this.people.length+(es?" persona(s) en la calle y ":" person(s) on the street and ")+this.notesList.length+(es?" nota(s) en el tablero.":" note(s) on the board.")
      +(this.filter.length||this.search?(es?" Filtro: ":" Filter: ")+[...this.filter,this.search?"“"+this.search+"”":""].filter(Boolean).join(", ")+".":"")});
    s.push({btn:es?"↻ Actualizar":"↻ Refresh",run:()=>{self.refresh().then(()=>docOpen("window"));}});
    if(this.refused)s.push({p:es?"⚠️ GitHub rechazó la última lectura (límite de peticiones). Vuelve a abrir a las "+this.refused+". Hasta entonces la calle muestra la última copia buena; identificarte sube el límite de 60 a 5000 por hora."
      :"⚠️ GitHub refused the last read (rate limit). It opens again at "+this.refused+". Until then the street shows the last good copy; signing in raises the limit from 60 to 5,000 an hour."});
    if(this.filter.length||this.search)s.push({btn:es?"✖ Quitar filtro y búsqueda":"✖ Clear filter and search",run:()=>{self.setFilter([],"");docOpen("window");}});
    s.push({h:es?"Trámites":"At the window"});
    const dl=this.daysLeft(),ex=this.expiry(),when=ex?" ("+ex.toISOString().slice(0,10)+")":"";
    s.push({p:this.token()?(dl===null?(es?"Identificado. El pueblo puede escribir.":"Signed in. The town can write.")
        :dl<0?(es?"Identificado, pero la llave ya caducó"+when+". El pueblo solo lee hasta que hagas una nueva.":"Signed in, but the key has run out"+when+". The town only reads until you make a new one.")
        :(es?"Identificado. El pueblo puede escribir. La llave caduca en "+dl+(dl===1?" día":" días")+when+".":"Signed in. The town can write. The key runs out in "+dl+(dl===1?" day":" days")+when+"."))
      :(es?"Sin identificar. El pueblo solo lee. Un token de GitHub para este repo (issues: write), escrito una vez, se queda en este navegador y en ningún otro lado.":"Not signed in. The town only reads. A GitHub token for this repo (issues: write), typed once, stays in this browser and nowhere else.")});
    const kw=this.keyWarning();if(kw)s.push({p:"🔑 "+kw});
    s.push({btn:this.token()?(es?"🔑 Salir":"🔑 Sign out"):(es?"🔑 Identificarme":"🔑 Sign in"),run:()=>{if(self.token()){self.signOut();self.say("Signed out.","Sesión cerrada.");docOpen("window");}else docOpen("signin");}});
    s.push({btn:es?"🔑 Hacer un token nuevo (abre GitHub)":"🔑 Make a new token (opens GitHub)",run:()=>self.openNewToken()});
    s.push({btn:es?"📝 Presentar una petición":"📝 File a request",run:()=>{self.formTags=[];docOpen("request");}});
    /* the dropdowns (#42): one label at a time from the labels the record has seen, grouped by
       weight / kind / other; and who gets the street first. The typed prompt below still takes
       several labels at once (owner: "include/tag the tags") */
    s.push({sel:es?"🔍 Etiqueta":"🔍 Label",opts:[{v:"",t:es?"— todos —":"— everyone —"}].concat(this.labelsSeen()),value:this.filter.length===1?this.filter[0]:(this.filter.length?"…":""),
      run:v=>{self.setFilter(v?[v]:[],self.search);docOpen("window");}});
    s.push({sel:es?"↕ Orden":"↕ Sort",opts:[{v:"weight",t:es?"por peso (alto primero)":"by weight (high first)"},{v:"newest",t:es?"más nuevos primero":"newest first"},{v:"oldest",t:es?"más viejos primero":"oldest first"},{v:"number",t:es?"por número":"by number"}],value:this.sort,
      run:v=>{self.setSort(v);docOpen("window");}});
    s.push({btn:es?"🔍 Varias etiquetas y una palabra":"🔍 Several labels, or a word",run:()=>docOpen("filter")});
    return s;},
  /* the board: the small things, pinned */
  boardDoc(){const es=lang==="es",s=[];
    if(!this.notesList.length)s.push({p:es?"El tablero está vacío.":"The board is empty."});
    /* grouped by kind, the dropdown's order (owner, 2026-09-06: "grouping works") */
    const names={ask:es?"Peticiones":"Asks",decision:es?"Decisiones":"Decisions",bug:es?"Bugs":"Bugs",other:es?"Otras":"Other"};
    ["ask","decision","bug","other"].forEach(k=>{const grp=this.notesList.filter(i=>this.kind(i)===k);if(!grp.length)return;
      s.push({h:names[k]+" · "+grp.length});
      grp.forEach(i=>s.push({kv:[["#"+i.n,i.title],[es?"archivado":"filed",this.days(i.at)],[es?"en palabras llanas":"in plain words",this.plain(i)]]}));});
    return s;},
  place(list){
    const w=WORLDS[this.world];if(!w)return;
    const by={high:[],normal:[],low:[]},aside=[];
    this.all=(list||[]).slice();
    this.titles=this.titles||{};this.all.forEach(i=>{this.titles[i.n]=i.title;});try{localStorage.setItem(SK("titles"),JSON.stringify(this.titles));}catch(e){}
    (list||[]).forEach(i=>{if(this.matches(i))by[this.tier(i)].push(i);else aside.push(i);});
    const people=this.sortPeople(by.high.concat(by.normal)).slice(0,this.cap);
    this.people=people;
    this.notesList=by.low.concat(by.high.concat(by.normal).slice(this.cap)).concat(aside); /* whoever is not on the street is on the board */
    this.notes=this.notesList.length;
    /* who left: a closed issue's person goes home and the tile comes back */
    Object.keys(this.placed).forEach(n=>{if(!people.some(i=>String(i.n)===n)){removeChill(this.placed[n]);delete this.placed[n];}});
    const used=new Set(Object.values(this.placed).map(k=>{const n=w.npcs.find(m=>m.key===k);return n?n.x+","+n.y:"";}));
    const free=(arr)=>arr.find(([x,y])=>!used.has(x+","+y)&&!SOLID.has(w.grid[y][x])&&w.grid[y][x]!=="N");
    people.forEach(i=>{if(this.placed[i.n])return;
      const spot=free(this.stands[this.kind(i)]||[])||free(this.stands.other)||free([].concat(...Object.values(this.stands)));
      if(!spot)return;const [x,y]=spot;
      const key=addChill({name:{en:this.name(i),es:this.name(i)},world:this.world,x,y,look:this.look(i)});
      if(key){const n=w.npcs.find(m=>m.key===key);n.doc=this.doc(i);n.tier=this.tier(i);n.issue=i.n;this.placed[i.n]=key;used.add(x+","+y);}});
    auditReach().forEach(p=>console.warn("REACH "+p)); /* a placed person may never wall the hero */
    console.log("RECORD: "+people.length+" on the street, "+this.notesList.length+" note(s) on the board");
  }
};
