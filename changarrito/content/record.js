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
  every:5*60*1000,
  boot(){
    try{this.cycle=JSON.parse(localStorage.getItem(SK("cycle"))||"{}")||{};}catch(e){this.cycle={};}
    try{const f=JSON.parse(localStorage.getItem(SK("filter"))||"null");if(f){this.filter=f.labels||[];this.search=f.search||"";}}catch(e){}
    const v=WORLDS[this.world]&&WORLDS[this.world].npcs.find(n=>n.npc==="ventanilla");
    if(v)v.doc="window"; /* the clerk hands you the city's record */
    this.refresh();
    setInterval(()=>this.refresh(),this.every);
    document.addEventListener("visibilitychange",()=>{if(!document.hidden)this.refresh();});
  },
  async refresh(){
    const list=await this.load();
    this.place(list);
    this.permits=await this.loadPulls();
    await this.loadComments(this.people);
  },
  api(path){return "https://api.github.com/repos/"+this.owner+"/"+this.repo+path;},
  /* one conditional GET with a last-good copy under the town's own prefix */
  async get(key,path,fallback){
    let cached=null;try{cached=JSON.parse(localStorage.getItem(SK(key))||"null");}catch(e){}
    const h={Accept:"application/vnd.github+json"};
    if(cached&&cached.etag)h["If-None-Match"]=cached.etag;
    try{
      const r=await fetch(this.api(path),{headers:h});
      if(r.status===304&&cached)return cached.data;
      if(!r.ok)throw new Error("HTTP "+r.status);
      const data=await r.json();
      try{localStorage.setItem(SK(key),JSON.stringify({etag:r.headers.get("ETag")||"",at:Date.now(),data}));}catch(e){}
      this.filedAt=new Date().toISOString().slice(0,10);
      return data;
    }catch(e){console.warn("RECORD: "+path+" offline or refused ("+(e&&e.message)+") — the last good copy stands");
      if(cached){this.filedAt=new Date(cached.at||0).toISOString().slice(0,10);return cached.data;}return fallback;}
  },
  async load(){
    const raw=await this.get("issues","/issues?state=open&per_page=100&creator="+this.owner,[]);
    return this.trim(raw);
  },
  /* control characters, bidi and zero-width marks out; a hard cap on length */
  clean(s,max){return String(s||"").replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g,"").replace(/[\u0000-\u0008\u000B-\u001f]/g,"").trim().slice(0,max);},
  mine(x){return x&&x.user&&x.user.login===this.owner;},
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
      const last=mine.length?mine[mine.length-1]:null;
      this.comments[i.n]={updated:i.updated,last:last?{body:this.clean(last.body,1500),at:String(last.created_at||"").slice(0,10)}:null};
    }
  },
  /* ---------- Part 3: the town writes. A token typed once, kept under the town's prefix, never
     in a save, never in a sheet. Every write goes through one door and refreshes the street. ---------- */
  token(){try{return localStorage.getItem(SK("token"))||"";}catch(e){return "";}},
  signIn(t){const v=String(t||"").trim();if(!v)return false;try{localStorage.setItem(SK("token"),v);}catch(e){return false;}return true;},
  signOut(){try{localStorage.removeItem(SK("token"));}catch(e){}},
  say(en,es){toast("💬 "+(lang==="es"?es:en),3200);},
  async write(method,path,body){
    const t=this.token();
    if(!t){this.say("Sign in at la ventanilla's window first — the town cannot write without your token.","Primero identifícate en la ventanilla — el pueblo no puede escribir sin tu token.");return null;}
    if(this.busy)return null;this.busy=true;
    try{
      const r=await fetch(this.api(path),{method,headers:{Accept:"application/vnd.github+json","Content-Type":"application/json",Authorization:"Bearer "+t},body:body===undefined?undefined:JSON.stringify(body)});
      if(r.status===401||r.status===403){this.say("The token was refused ("+r.status+"). Sign in again with a token for this repo.","El token fue rechazado ("+r.status+"). Identifícate otra vez con un token para este repo.");return null;}
      if(!r.ok){this.say("The city refused it ("+r.status+").","La ciudad lo rechazó ("+r.status+").");return null;}
      const data=r.status===204?{}:await r.json().catch(()=>({}));
      try{["issues","pulls"].forEach(k=>localStorage.removeItem(SK(k)));}catch(e){} /* the next read is fresh */
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
    const labels=["tier: "+(["high","normal","low"].includes(f.tier)?f.tier:"normal"),["ask","decision","bug"].includes(f.kind)?f.kind:"ask"];
    const d=await this.write("POST","/issues",{title,body:this.requestBody(f),labels});
    if(d&&d.number)this.say("Filed as #"+d.number+". They will be on the street shortly.","Archivado como #"+d.number+". Pronto estarán en la calle.");return d;},
  /* the form, as prompts — one question at a time, the interview's shape without its machinery */
  ask(q){const v=window.prompt(q);return v===null?null:String(v);},
  fileByPrompt(){const es=lang==="es";
    const title=this.ask(es?"Título de la petición (corto):":"Title of the request (short):");if(title===null)return;
    const plain=this.ask(es?"En palabras llanas — qué es, por qué importa:":"In plain words — what this is, why it matters:");if(plain===null)return;
    const notes=this.ask(es?"Notas (opcional):":"Notes (optional):");if(notes===null)return;
    const done=this.ask(es?"Está hecho cuando…:":"Done when…:");if(done===null)return;
    const kind=this.ask(es?"Tipo: ask / decision / bug":"Kind: ask / decision / bug")||"ask";
    const tier=this.ask(es?"Peso: high / normal / low":"Weight: high / normal / low")||"normal";
    this.file({title,plain,notes,done,kind:kind.trim().toLowerCase(),tier:tier.trim().toLowerCase()});},
  /* filter and search: read-only; whoever does not match waits on the board */
  setFilter(labels,search){this.filter=(labels||[]).map(l=>this.clean(l,40)).filter(Boolean);this.search=this.clean(search,60).toLowerCase();
    try{localStorage.setItem(SK("filter"),JSON.stringify({labels:this.filter,search:this.search}));}catch(e){}
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
      s.push({btn:es?"💬 Comentar con mis palabras":"💬 Comment in my own words",run:()=>{const t=self.ask(es?"Tu comentario en #"+i.n+":":"Your comment on #"+i.n+":");if(t)self.comment(i.n,t);}});
      s.push({btn:es?"🏷️ + etiqueta":"🏷️ + label",run:()=>{const l=self.ask(es?"Etiqueta a añadir:":"Label to add:");if(l)self.addLabel(i.n,l);}});
      s.push({btn:es?"🏷️ − etiqueta":"🏷️ − label",run:()=>{const l=self.ask(es?"Etiqueta a quitar:":"Label to remove:");if(l)self.removeLabel(i.n,l);}});
      return s;}};},
  /* la ventanilla's document: the permits, then the count of people and notes. Past tense only */
  windowDoc(){const es=lang==="es",s=[];
    s.push({p:(es?"Archivado al ":"Filed as of ")+(this.filedAt||(es?"— sin fecha —":"— no date —"))+"."});
    s.push({h:es?"Permisos":"Permits"});
    if(!this.permits.length)s.push({p:es?"La ciudad no tiene ningún permiso pendiente en el expediente.":"The city has no permit pending on file."});
    this.permits.forEach(p=>{const st=p.draft?(es?"borrador":"draft"):p.green===true?(es?"en verde":"green"):p.green===false?(es?"en rojo":"red"):(es?"sin revisar":"unchecked");
      const mg=p.mergeable===true?(es?"sin conflictos":"no conflicts"):p.mergeable===false?(es?"con conflictos":"conflicts"):"";
      s.push({kv:[["#"+p.n,p.title],[es?"estado":"state",st+(mg?" · "+mg:"")],[es?"presentado":"filed",p.at],["url",p.url]]});});
    s.push({h:es?"La calle":"The street"});
    s.push({p:(es?"Hay ":"There are ")+this.people.length+(es?" persona(s) en la calle y ":" person(s) on the street and ")+this.notesList.length+(es?" nota(s) en el tablero.":" note(s) on the board.")
      +(this.filter.length||this.search?(es?" Filtro: ":" Filter: ")+[...this.filter,this.search?"“"+this.search+"”":""].filter(Boolean).join(", ")+".":"")});
    const self=this;
    s.push({h:es?"Trámites":"At the window"});
    s.push({p:this.token()?(es?"Identificado. El pueblo puede escribir.":"Signed in. The town can write."):(es?"Sin identificar. El pueblo solo lee. Un token de GitHub para este repo (issues: write), escrito una vez, se queda en este navegador y en ningún otro lado.":"Not signed in. The town only reads. A GitHub token for this repo (issues: write), typed once, stays in this browser and nowhere else.")});
    s.push({btn:this.token()?(es?"🔑 Salir":"🔑 Sign out"):(es?"🔑 Identificarme":"🔑 Sign in"),run:()=>{if(self.token()){self.signOut();self.say("Signed out.","Sesión cerrada.");}else{const t=self.ask(es?"Pega tu token de GitHub (solo issues: write, 30 días):":"Paste your GitHub token (issues: write only, 30 days):");if(t&&self.signIn(t))self.say("Signed in. Nothing else was stored.","Identificado. No se guardó nada más.");}docOpen("window");}});
    s.push({btn:es?"📝 Presentar una petición":"📝 File a request",run:()=>self.fileByPrompt()});
    s.push({btn:es?"🔍 Filtrar por etiquetas":"🔍 Filter by labels",run:()=>{const v=self.ask(es?"Etiquetas, separadas por coma (vacío = todos):":"Labels, comma-separated (empty = everyone):");if(v!==null){self.setFilter(v.split(",").map(x=>x.trim()).filter(Boolean),self.search);docOpen("window");}}});
    s.push({btn:es?"🔎 Buscar una palabra":"🔎 Search a word",run:()=>{const v=self.ask(es?"Palabra (vacío = todos):":"Word (empty = everyone):");if(v!==null){self.setFilter(self.filter,v);docOpen("window");}}});
    return s;},
  /* the board: the small things, pinned */
  boardDoc(){const es=lang==="es",s=[];
    if(!this.notesList.length)s.push({p:es?"El tablero está vacío.":"The board is empty."});
    this.notesList.forEach(i=>s.push({kv:[["#"+i.n,i.title],[es?"archivado":"filed",this.days(i.at)],[es?"en palabras llanas":"in plain words",this.plain(i)]]}));
    return s;},
  place(list){
    const w=WORLDS[this.world];if(!w)return;
    const by={high:[],normal:[],low:[]},aside=[];
    (list||[]).forEach(i=>{if(this.matches(i))by[this.tier(i)].push(i);else aside.push(i);});
    const people=by.high.concat(by.normal).slice(0,this.cap);
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
