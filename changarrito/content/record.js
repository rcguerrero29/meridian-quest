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
  every:5*60*1000,
  boot(){
    try{this.cycle=JSON.parse(localStorage.getItem(SK("cycle"))||"{}")||{};}catch(e){this.cycle={};}
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
      s.push({kv:[["#",String(i.n)],["labels",(i.labels||[]).join(", ")||"—"],["opened",i.at||"—"],["url",i.url||"—"]]});return s;}};},
  /* la ventanilla's document: the permits, then the count of people and notes. Past tense only */
  windowDoc(){const es=lang==="es",s=[];
    s.push({p:(es?"Archivado al ":"Filed as of ")+(this.filedAt||(es?"— sin fecha —":"— no date —"))+"."});
    s.push({h:es?"Permisos":"Permits"});
    if(!this.permits.length)s.push({p:es?"La ciudad no tiene ningún permiso pendiente en el expediente.":"The city has no permit pending on file."});
    this.permits.forEach(p=>{const st=p.draft?(es?"borrador":"draft"):p.green===true?(es?"en verde":"green"):p.green===false?(es?"en rojo":"red"):(es?"sin revisar":"unchecked");
      const mg=p.mergeable===true?(es?"sin conflictos":"no conflicts"):p.mergeable===false?(es?"con conflictos":"conflicts"):"";
      s.push({kv:[["#"+p.n,p.title],[es?"estado":"state",st+(mg?" · "+mg:"")],[es?"presentado":"filed",p.at],["url",p.url]]});});
    s.push({h:es?"La calle":"The street"});
    s.push({p:(es?"Hay ":"There are ")+this.people.length+(es?" persona(s) en la calle y ":" person(s) on the street and ")+this.notesList.length+(es?" nota(s) en el tablero.":" note(s) on the board.")});
    return s;},
  /* the board: the small things, pinned */
  boardDoc(){const es=lang==="es",s=[];
    if(!this.notesList.length)s.push({p:es?"El tablero está vacío.":"The board is empty."});
    this.notesList.forEach(i=>s.push({kv:[["#"+i.n,i.title],[es?"archivado":"filed",this.days(i.at)],[es?"en palabras llanas":"in plain words",this.plain(i)]]}));
    return s;},
  place(list){
    const w=WORLDS[this.world];if(!w)return;
    const by={high:[],normal:[],low:[]};(list||[]).forEach(i=>by[this.tier(i)].push(i));
    const people=by.high.concat(by.normal).slice(0,this.cap);
    this.people=people;
    this.notesList=by.low.concat(by.high.concat(by.normal).slice(this.cap));
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
