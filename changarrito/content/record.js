/* El Changarrito — the record. The town reads the repo's open issues and puts them on the
   street. Fills the engine's RECORD seam (engine.js, beside NET). Rules, from the threat model
   (docs/story/el-changarrito.md §5): owner-authored only, filtered again client-side; plain
   text only, through the engine's own sanitisers; no token in v1; no service worker; and
   nothing here ever writes. The rule of weight (§1): a label picks the body. */
const RECORDSRC={
  enabled:true,
  owner:"rcguerrero29",repo:"meridian-quest",
  world:"st",
  /* where people stand: two rows along the street, then two by the plants. Past `cap` the
     rest are notes for the board (2b) — a street with forty people is a queue, not a town */
  stands:[[3,4],[9,4],[15,4],[21,4],[27,4],[3,8],[9,8],[15,8],[21,8],[27,8],[6,12],[24,12]],
  cap:12,
  placed:{},   /* issue number → the npc key addChill() gave it */
  notes:0,
  boot(){this.load().then(list=>this.place(list));},
  url(){return "https://api.github.com/repos/"+this.owner+"/"+this.repo+"/issues?state=open&per_page=100&creator="+this.owner;},
  async load(){
    let cached=null;try{cached=JSON.parse(localStorage.getItem(SK("issues"))||"null");}catch(e){}
    const h={Accept:"application/vnd.github+json"};
    if(cached&&cached.etag)h["If-None-Match"]=cached.etag;
    try{
      const r=await fetch(this.url(),{headers:h});
      if(r.status===304&&cached)return cached.items;
      if(!r.ok)throw new Error("HTTP "+r.status);
      const items=this.trim(await r.json());
      try{localStorage.setItem(SK("issues"),JSON.stringify({etag:r.headers.get("ETag")||"",at:Date.now(),items}));}catch(e){}
      return items;
    }catch(e){console.warn("RECORD: offline or refused ("+(e&&e.message)+") — the last good copy stands");return cached?cached.items:[];}
  },
  /* control characters, bidi and zero-width marks out; a hard cap on length */
  clean(s,max){return String(s||"").replace(/[\u200B-\u200F\u202A-\u202E\u2066-\u2069]/g,"").replace(/[\u0000-\u0008\u000B-\u001f]/g,"").trim().slice(0,max);},
  /* keep only what a person on the street needs; drop PRs and anything not the owner's */
  trim(raw){return (Array.isArray(raw)?raw:[]).filter(i=>i&&!i.pull_request&&i.user&&i.user.login===this.owner)
    .map(i=>({n:i.number|0,title:this.clean(i.title,200),body:this.clean(i.body,2000),
      labels:(i.labels||[]).map(l=>this.clean(typeof l==="string"?l:(l&&l.name),40)).filter(Boolean),
      at:String(i.created_at||"").slice(0,10),url:this.clean(i.html_url,200)}));},
  tier(i){const L=i.labels||[];return L.includes("tier: high")?"high":L.includes("tier: normal")?"normal":"low";},
  name(i){return sanName(String(i.title||"").replace(/^[^\p{L}\p{N}]+/u,""))||("#"+i.n);},
  look(i){const c={bug:"#C0392B",ask:"#2F6DB5",decision:"#D4A017",ventanilla:"#1F8A8A",changarrito:"#7A4FBF"};
    const k=Object.keys(c).find(k2=>(i.labels||[]).includes(k2));const lk=randLook();if(k)lk.shirt=c[k];return lk;},
  /* the document a person hands you: title, the body as paragraphs, the facts. Rendered by the
     engine's reader through textContent only — a title can never become markup */
  doc(i){const self=this;return {title:{en:i.title,es:i.title},
    build(){const s=[{h:"#"+i.n+" · "+self.tier(i)}];
      String(i.body||"").split(/\n{2,}/).map(p=>p.replace(/\s*\n\s*/g," ").trim()).filter(Boolean).slice(0,12).forEach(p=>s.push({p}));
      s.push({kv:[["labels",(i.labels||[]).join(", ")||"—"],["opened",i.at||"—"],["url",i.url||"—"]]});return s;}};},
  place(list){
    const w=WORLDS[this.world];if(!w)return;
    const by={high:[],normal:[],low:[]};(list||[]).forEach(i=>by[this.tier(i)].push(i));
    const people=by.high.concat(by.normal).slice(0,this.cap);
    this.notes=by.low.length+Math.max(0,by.high.length+by.normal.length-this.cap);
    /* who left: a closed issue's person goes home and the tile comes back */
    Object.keys(this.placed).forEach(n=>{if(!people.some(i=>String(i.n)===n)){removeChill(this.placed[n]);delete this.placed[n];}});
    let si=0;
    people.forEach(i=>{if(this.placed[i.n])return;
      while(si<this.stands.length){const [x,y]=this.stands[si++];
        const key=addChill({name:{en:this.name(i),es:this.name(i)},world:this.world,x,y,look:this.look(i)});
        if(key){const n=w.npcs.find(m=>m.key===key);n.doc=this.doc(i);n.tier=this.tier(i);n.issue=i.n;this.placed[i.n]=key;break;}}});
    auditReach().forEach(p=>console.warn("REACH "+p)); /* a placed person may never wall the hero */
    console.log("RECORD: "+people.length+" on the street, "+this.notes+" note(s) for the board (2b)");
  }
};
