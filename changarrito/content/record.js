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
  /* ch-v24 (#69, dos cuerpos): a person stands on their house's DOORSTEP and again INSIDE at the
     counter — two bodies, one issue, one document. The two heaviest of each house stand outside
     and inside; the next two inside only; the rest are pinned on the house's board. Whoever has no
     address (no work label yet) waits in the PLAZA before the hoarding, six at most, the rest on
     city hall's board as sin domicilio. The tile in front of every door stays free. */
  plaza:[[10,11],[14,11],[18,11],[10,13],[14,13],[18,13]],
  capStep:2,capIn:4,capPlaza:6,
  /* ---------- #69, block one: the six houses — one per kind of work ----------
     The address is a LABEL in plain words (owner: "put a human friendly label as to what type of
     issue or work is being done"): the first `work:` label an issue carries names its house. Each
     house has a world copied from Meridian's shells, a door on the street, a clerk who knows only
     its business, a sign over the door that counts it, and a board beside the door that says the
     work in two short lines. Don Güero's plan is on #69. */
  AREAS:[
    {id:"an",world:"an",glyph:"$",door:{x:4,y:0},doorstep:[[3,1],[5,1]],inside:[[4,4],[7,4],[12,4],[4,2]],label:"work: records & forms",name:{en:"El Anexo de la Ventanilla",es:"El Anexo de la Ventanilla"},clerk:"remedios",
     plain:{en:"Records & forms — the window, the index, the forms, the reports.",es:"Registros y formularios — la ventanilla, el índice, los formularios, los reportes."}},
    {id:"pp",world:"pp",glyph:"@",door:{x:6,y:8},doorstep:[[5,7],[7,7]],inside:[[4,7],[8,7],[12,7],[16,7]],label:"work: docs & templates",name:{en:"La Papelería",es:"La Papelería"},clerk:"chuy",
     plain:{en:"Docs & templates — anything that ends up as a document, a template or a test.",es:"Documentos y plantillas — lo que termina en un documento, una plantilla o una prueba."}},
    {id:"es",world:"es",glyph:"M",door:{x:14,y:8},doorstep:[[13,7],[15,7]],inside:[[4,7],[8,7],[12,7],[16,7]],label:"work: how it looks",name:{en:"El Estudio de Pili",es:"El Estudio de Pili"},clerk:"pili",
     plain:{en:"How it looks — the camera, the walls, the art, the tiles, the screen.",es:"Cómo se ve — la cámara, las paredes, el arte, los mosaicos, la pantalla."}},
    {id:"mo",world:"mo",glyph:"%",door:{x:25,y:0},doorstep:[[24,1],[26,1]],inside:[[4,6],[8,6],[12,6],[16,6]],label:"work: the engine",name:{en:"El Motor",es:"El Motor"},clerk:"beto",
     plain:{en:"The engine — seams, saves, speed, and what has to be true in both cities.",es:"El motor — costuras, partidas guardadas, velocidad, y lo que debe ser cierto en las dos ciudades."}},
    {id:"ob",world:"ob",glyph:"O",door:{x:19,y:0},doorstep:[[18,1],[20,1]],inside:[[4,2],[8,2],[12,2],[16,2]],label:"work: rooms & stairs",name:{en:"La Obra",es:"La Obra"},clerk:"cuca",
     plain:{en:"Rooms & stairs — where things stand, doors, maps, and how you get in.",es:"Cuartos y escaleras — dónde está cada cosa, puertas, mapas, y cómo se entra."}},
    {id:"co",world:"co",glyph:"L",door:{x:22,y:8},doorstep:[[21,7],[23,7]],inside:[[4,6],[8,6],[12,6],[16,6]],label:"work: Meridian's story",name:{en:"La Cocina de Meridian",es:"La Cocina de Meridian"},clerk:"nacho",
     plain:{en:"Meridian's story — the other city: its quests, its districts, its practice.",es:"La historia de Meridian — la otra ciudad: sus misiones, sus barrios, su práctica."}}],
  areas(){return this.AREAS.filter(a=>WORLDS[a.world]);},
  area(id){return this.AREAS.find(a=>a.id===id)||null;},
  /* the house an issue lives in: its first work label; none → no address (the plaza, block two) */
  house(i){const L=(i.labels||[]).map(l=>l.toLowerCase());const a=this.AREAS.find(a=>L.includes(a.label.toLowerCase()));return a?a.id:null;},
  workLabels(){return this.AREAS.map(a=>a.label);},
  ofHouse(id){return this.all.filter(i=>this.house(i)===id);},
  /* the clerk's three lines: what this house is for (the work, in plain words), the count, what is on the desk */
  clerkDoc(id){const es=lang==="es",self=this,a=this.area(id);if(!a)return [{p:"—"}];
    const mine=this.sortPeople(this.ofHouse(id)),standing=mine.filter(i=>this.placed[i.n]),pinned=mine.filter(i=>!this.placed[i.n]);
    const oldest=mine.slice().sort((x,y)=>String(x.at).localeCompare(String(y.at))||x.n-y.n)[0];
    const waiting=mine.filter(i=>this.state(i)==="waiting"),unanswered=mine.filter(i=>this.state(i)==="unanswered");
    const work=a.label.replace(/^work: /,"");
    const L=[
      {k:es?"Para qué es esta casa":"What this house is for",t:(es?a.plain.es:a.plain.en)+(es?" Todo lo que lleva la etiqueta «":" Everything that carries the label \u201c")+a.label+(es?"» vive aquí.":"\u201d lives here.")},
      {k:es?"La cuenta":"The count",t:mine.length?(mine.length+(es?" cosa(s) tuya(s) tienen esta dirección. ":" of your things have this address. ")+standing.length+(es?" de pie, ":" standing, ")+pinned.length+(es?" prendida(s) en el tablero.":" pinned on the board.")+(oldest?(es?" La más vieja llegó el ":" The oldest came in on ")+oldest.at+".":""))
        :(es?"Nada archivado con esta dirección ahora mismo.":"Nothing filed with this address right now.")},
      {k:es?"Lo que hay en el escritorio":"What's on the desk",t:mine.length?((oldest?(es?"La más vieja: #":"Oldest here: #")+oldest.n+", "+this.days(oldest.at)+(unanswered.some(i=>i.n===oldest.n)?(es?", nadie la ha contestado.":", nobody has answered it."):"."):"")
        +(waiting.length?" "+waiting.length+(es?" espera(n) tu palabra.":" waiting on your word."):""))
        :(es?"El escritorio está limpio ("+work+").":"The desk is clear ("+work+").")}];
    const k=(this.cycle["h_"+id]|0)%L.length;this.cycle["h_"+id]=k+1;try{localStorage.setItem(SK("cycle"),JSON.stringify(this.cycle));}catch(e){}
    const s=[{h:"💬 "+L[k].k},{p:L[k].t}];
    if(k===2){if(oldest)s.push({btn:(es?"→ caminar a #":"→ walk to #")+oldest.n,run:()=>self.walkTo(oldest.n)});
      waiting.slice(0,4).forEach(i=>{if(!oldest||i.n!==oldest.n)s.push({btn:(es?"⚖️ decidir → #":"⚖️ decide → #")+i.n,run:()=>self.walkTo(i.n)});});}
    s.push({h:es?"Qué puedes hacer":"What you can do"});
    s.push({btn:es?"📌 El tablero de esta casa":"📌 This house's board",run:()=>docOpen("b_"+id)});
    s.push({btn:es?"📝 Presentar algo sobre esta casa":"📝 File something about this house",run:()=>{self.formTags=[a.label];docOpen("request");}});
    s.push({btn:es?"📇 Todos con esta dirección":"📇 Everyone with this address",run:()=>{self.indexCat="label:"+a.label;self.indexQ="";docOpen("index");}});
    return s;},
  /* the house's board: everything with this address, the small things included */
  houseBoardDoc(id){const es=lang==="es",a=this.area(id),s=[];if(!a)return [{p:"—"}];
    const mine=this.sortPeople(this.ofHouse(id)),pinned=mine.filter(i=>!(this.placed[i.n]&&this.placed[i.n].in));
    s.push({p:(es?a.plain.es:a.plain.en)});
    s.push({h:(es?"Prendidos · ":"Pinned · ")+pinned.length});
    if(!pinned.length)s.push({p:mine.length?(es?"Todos los de esta casa están de pie adentro.":"Everyone with this address is standing inside."):(es?"Nada archivado con esta dirección ahora mismo.":"Nothing filed with this address right now.")});
    pinned.forEach(i=>s.push({kv:[["#"+i.n,i.title],[es?"archivado":"filed",this.days(i.at)],[es?"estado":"state",this.state(i)],[es?"en palabras llanas":"in plain words",this.plain(i)]]}));
    /* la casa vacía (Don Güero): an empty room is the proof you finished something — past tense, filed things only */
    const home=(this.gone||[]).filter(g=>this.house(g)===id).slice(0,6);
    s.push({h:(es?"Se fueron a casa · ":"Went home · ")+home.length});
    if(!home.length)s.push({p:es?"Nadie de esta casa se ha ido últimamente.":"Nobody from this house went home lately."});
    home.forEach(g=>s.push({kv:[["#"+g.n,g.title],[es?"cerrado":"closed",g.closed||"—"]]}));
    return s;},
  placed:{},      /* issue number → {st: the street body's key or null, in: the house body's key or null, house} */
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
    await this.loadGone();this.signs();
    await this.checkVersion();
  },
  /* who went home lately (ch-v24, la casa vacía): the owner's recently closed issues, so an empty
     house's board can show what got finished there. One read, cached like the rest. */
  gone:[],
  async loadGone(){const raw=await this.get("gone","/issues?state=closed&per_page=30&sort=updated&creator="+this.owner,[]);
    this.gone=(Array.isArray(raw)?raw:[]).filter(i=>i&&!i.pull_request&&this.mine(i)).map(i=>({n:i.number|0,title:this.clean(i.title,200),
      labels:(i.labels||[]).map(l=>this.clean(typeof l==="string"?l:(l&&l.name),40)).filter(Boolean),closed:String(i.closed_at||"").slice(0,10)}));return this.gone;},
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
  walkTo(n){const b=this.placed[n];if(!b){docOpen("board");return false;}
    const find=(wid,key)=>{const w=WORLDS[wid];const p=key&&w&&w.npcs.find(m=>m.key===key);return p?{wid,p}:null;};
    const hw=b.house?this.area(b.house).world:null;
    const hit=(world===this.world&&find(this.world,b.st))||(hw&&world===hw&&find(hw,b.in))||find(this.world,b.st)||(hw&&find(hw,b.in));
    if(!hit){docOpen("board");return false;}
    return this.goBeside(hit.wid,hit.p.x,hit.p.y);},
  /* stand beside a tile in any world, facing it, the reader closed — people, animals, doors, faces */
  goBeside(wid,tx,ty){if(!WORLDS[wid])return false;
    const spot=[[0,1],[1,0],[-1,0],[0,-1],[0,0]].map(([dx,dy])=>[tx+dx,ty+dy]).find(([x,y])=>!isSolidAt(wid,x,y));
    if(!spot)return false;
    world=wid;px=fx=spot[0];py=fy=spot[1];held=null;dir=spot[1]>ty?"up":spot[1]<ty?"down":spot[0]>tx?"left":"right";
    try{$("reader").hidden=true;}catch(e){}try{setWorldTag();}catch(e){}try{if(typeof t3Invalidate==="function")t3Invalidate();}catch(e){}
    return true;},
  /* ---------- ch-v15: the index — everything the town knows, by tag (owner: "cant we use those tags
     to help me pull up specific things i want fixed or resolved? even events etc? then your job
     would be to say it to me in plain language and have it categorized in her menu too") ----------
     Two kinds of thing: the PEOPLE the record places (labels, kind, weight, state, events) and the
     THINGS of the town itself (rooms, faces, residents, animals), each with tags. One search over
     both; one category menu; every hit says itself in plain words, walks you there, and can file
     a request already tagged with what it is about. */
  things(){const es=lang==="es",st=this.world,W=WORLDS;
    const near=(wid,x,y)=>W[wid]?{world:wid,x,y}:null;
    const T=[];const add=(id,en,esn,tags,at,plainEn,plainEs)=>{if(at)T.push({id,name:es?esn:en,tags,at,plain:es?plainEs:plainEn,thing:true});};
    add("stall","The stall","El changarrito",["changarrito","stall","home"],near(PL.home,PL.spawn[0],PL.spawn[1]),"Where you wake up. Don Güero's counter, the door to the street, the stairs to the loft.","Donde despiertas. El mostrador de Don Güero, la puerta a la calle, la escalera al tapanco.");
    if(W[PL.upstairs])add("loft","The loft","El tapanco",["changarrito","loft","stairs"],near(PL.upstairs,14,14),"Upstairs, bare on purpose; the way down is the light square.","Arriba, vacío a propósito; la bajada es el cuadro claro.");
    add("street","The street","La calle",["changarrito","street"],near(st,14,2),"A boulevard with two ranks of houses, one per kind of work; the record's people stand on it.","Un bulevar con dos hileras de casas, una por tipo de trabajo; la gente del expediente se para aquí.");
    add("hall","City hall · la ventanilla","El ayuntamiento · la ventanilla",["ventanilla","hall","record"],near(st,9,1),"Her window: the news, the index, the forms, your key.","Su ventana: las noticias, el índice, los formularios, tu llave.");
    add("board","The board","El tablero",["board","notes","tier: low"],near(st,8,1),"The small things, pinned, grouped by kind.","Las cosas chicas, prendidas, por tipo.");
    /* the six houses (#69): the work label first, then the house's name — the human-friendly label on the building */
    this.areas().forEach(a=>{const work=a.label.replace(/^work: /,"");const dy=a.door.y===0?1:-1;
      add("h:"+a.id,work.charAt(0).toUpperCase()+work.slice(1)+" · "+a.name.en,a.plain.es.split(" — ")[0]+" · "+a.name.es,[a.label,a.id,"house","changarrito"],near(st,a.door.x,a.door.y+dy),
        a.plain.en+" Walk in: "+npcName(a.clerk)+" is at the counter.",a.plain.es+" Entra: "+npcName(a.clerk)+" atiende.");});
    if(W[PL.park])add("park","The park","El parque",["park","sonny","animals"],near(PL.park,PL.parkIn[0],PL.parkIn[1]),"Through the east gate. Sonny's mini game lives here.","Por la reja del este. Aquí vive el mini juego de Sonny.");
    /* residents and animals, where they are right now */
    Object.entries(W).forEach(([wid,w])=>w.npcs.forEach(n=>{if(n.issue||!n.npc)return;
      add("npc:"+n.npc,npcName(n.npc),npcName(n.npc),[n.npc,"people"],near(wid,n.fx===undefined?n.x:Math.round(n.fx),n.fy===undefined?n.y:Math.round(n.fy)),n.doc?"Carries a document — talk to read it.":"A resident. Talk to them.",n.doc?"Lleva un documento — háblale para leerlo.":"Vive aquí. Háblale.");}));
    (typeof CRIT!=="undefined"?CRIT:[]).forEach(c=>{if(!c.name)return;add("crit:"+c.name,c.name,c.name,[String(c.name).toLowerCase(),"animals","dog"],near(c.world,Math.round(c.fx),Math.round(c.fy)),"The owner's dog. Follows you, sits, stays; the ball and the cone are his.","El perro del dueño. Te sigue, se sienta, se queda; la pelota y el cono son suyos.");});
    if(AW("dog"))add("frederick","Frederick","Frederick",["frederick","animals","dog"],near(AW("dog"),Math.round(DOG.fx),Math.round(DOG.fy)),"The engine's dog, at the stall.","El perro del motor, en el changarrito.");
    if(AW("pig"))add("pigeon","The pigeon","La paloma",["pigeon","animals"],near(AW("pig"),Math.round(PIG.fx),Math.round(PIG.fy)),"Pecks on the street. Ignores you.","Picotea en la calle. Te ignora.");
    if(AW("loro"))add("lorenzo","Lorenzo","Lorenzo",["lorenzo","animals","loro"],near(AW("loro"),LORO.x,LORO.y),"The parrot, in the tree.","El loro, en el árbol.");
    return T;},
  /* ---------- ch-v17: the signs count, Don Güero talks ----------
     The signs over the faces show the number of open issues of their kind (all tiers), city
     hall's the total; the 3D scene bakes decor at build, so it is rebuilt once. */
  signs(){const D=(typeof DECOR!=="undefined"&&DECOR)||[];const by={ask:0,decision:0,bug:0,other:0};
    this.all.forEach(i=>{by[this.kind(i)]=(by[this.kind(i)]|0)+1;const h=this.house(i);if(h)by[h]=(by[h]|0)+1;else by.next=(by.next|0)+1;}); /* #69: a sign over a door counts its house; the hoarding the homeless */
    let changed=false;D.forEach(d=>{if(d.deco!=="sign"||!d.kind)return;const n=d.kind==="hall"?this.all.length:(by[d.kind]|0);
      const t=String(n).slice(0,4);if(d.text!==t){d.text=t;changed=true;}});
    if(changed){try{if(typeof t3Invalidate==="function")t3Invalidate();}catch(e){}}return by;},
  /* Don Güero (#50; owner: "hes someone i like to chat with and may ask him to build things...
     just dont want him standing without lines"): three lines that cycle like everyone's — who he
     is, the requests that carry his name, and the last feedback that came back on one of them
     ("check out the request feedback!") — and a form to ask him for a build, pre-tagged guero. */
  mineFor(i){const L=(i.labels||[]).map(l=>l.toLowerCase());return L.some(l=>/g[uü]ero/.test(l))||/g[uü]ero/i.test((i.title||"")+" "+(i.body||""));},
  gueroDoc(){const es=lang==="es",self=this,mine=this.all.filter(i=>this.mineFor(i));
    const answered=mine.filter(i=>{const c=this.comments[i.n];return c&&c.last&&c.last.answer;}).sort((a,b)=>String(this.comments[b.n].last.ts).localeCompare(String(this.comments[a.n].last.ts)));
    const last=answered[0]&&this.comments[answered[0].n].last;
    const Q=(es&&typeof QES!=="undefined"?QES:(typeof QEN!=="undefined"?QEN:[]))[0],welcome=(Q&&Q.nodes&&Q.nodes.a&&Q.nodes.a.say)||"";
    const L=[
      {k:es?"Quién soy":"Who I am",t:welcome||(es?"Yo planeo la ciudad. Pídeme algo y vuelvo con un plan.":"I plan the city. Ask me for something and I come back with a plan.")},
      {k:(es?"Las peticiones con mi nombre · ":"The requests with my name · ")+mine.length,t:mine.length?mine.slice(0,6).map(i=>this.personPlain(i)).join("\n"):(es?"Ninguna todavía. Pídeme algo abajo y aparece en la calle con mi nombre.":"None yet. Ask me for something below and it appears on the street with my name.")},
      {k:es?"¡Mira los comentarios de la petición!":"Check out the request feedback!",t:last?((es?"En #":"On #")+answered[0].n+", "+last.at+": "+last.body.replace(/[`*_#>]/g,"")):(es?"Nada de vuelta todavía. Cuando una sesión conteste, lo digo aquí.":"Nothing back yet. When a session answers, I say it here.")}];
    const k=(this.cycle.g|0)%L.length;this.cycle.g=k+1;try{localStorage.setItem(SK("cycle"),JSON.stringify(this.cycle));}catch(e){}
    const s=[{h:"💬 "+L[k].k},{p:L[k].t}];
    if(k===1)mine.slice(0,6).forEach(i=>s.push({btn:(es?"→ caminar a #":"→ walk to #")+i.n,run:()=>self.walkTo(i.n)}));
    if(k===2&&answered[0])s.push({btn:(es?"→ caminar a #":"→ walk to #")+answered[0].n,run:()=>self.walkTo(answered[0].n)});
    s.push({h:es?"Qué puedes pedirme":"What you can ask me"});
    s.push({btn:es?"📝 Pídeme que construya algo":"📝 Ask me to build something",run:()=>{self.formTags=["guero","changarrito"];docOpen("request");}});
    s.push({btn:es?"📇 Todas mis peticiones":"📇 All my requests",run:()=>{self.indexCat="label:guero";self.indexQ="";docOpen("index");}});
    return s;},
  /* a person's state, in one word */
  state(i){const c=this.comments[i.n],l=c&&c.last;if((i.labels||[]).includes("decision"))return "waiting";if(l&&l.answer)return "answered";return "unanswered";},
  personPlain(i){const es=lang==="es",st=this.state(i),S={waiting:es?"espera tu palabra":"waiting on you",answered:es?"contestado":"answered",unanswered:es?"sin contestar":"unanswered"};
    return "#"+i.n+" · "+String(i.title||"").replace(/^❗/,"")+" · "+this.kind(i)+", "+this.tier(i)+" · "+S[st]+(this.placed[i.n]?"":(es?" · en el tablero":" · on the board"));},
  /* the categories la ventanilla offers, grouped; and the search over everything */
  indexCats(){const es=lang==="es",g1=es?"estado":"state",g2=es?"eventos":"events",g3=es?"etiquetas":"labels",g4=es?"lugares y quiénes":"places and who";
    const cats=[{v:"",t:es?"— todo —":"— everything —"},
      {v:"state:waiting",t:es?"esperan tu palabra":"waiting on you",g:g1},{v:"state:answered",t:es?"contestados":"answered",g:g1},{v:"state:unanswered",t:es?"sin contestar":"unanswered",g:g1},
      {v:"ev:answered",t:es?"contestados desde tu última visita":"answered since your last visit",g:g2},{v:"ev:fresh",t:es?"nuevos desde tu última visita":"new since your last visit",g:g2},{v:"ev:gone",t:es?"se fueron a casa":"went home",g:g2},
      {v:"where:street",t:es?"en la calle":"on the street",g:g4},{v:"where:board",t:es?"en el tablero":"on the board",g:g4},{v:"things",t:es?"lugares, residentes, animales":"places, residents, animals",g:g4}];
    this.labelsSeen().forEach(o=>cats.push({v:"label:"+o.v,t:o.v,g:g3}));return cats;},
  index(cat,q){const es=lang==="es",nw=this.news(),qq=this.clean(q,60).toLowerCase();
    let people=this.all.slice(),things=this.things();
    if(cat==="things")people=[];
    else if(cat&&cat.startsWith("state:")){const st=cat.slice(6);people=people.filter(i=>this.state(i)===st);things=[];}
    else if(cat==="ev:answered"){people=nw.answered;things=[];}
    else if(cat==="ev:fresh"){people=nw.fresh;things=[];}
    else if(cat==="ev:gone"){people=[];things=nw.gone.map(g=>({id:"gone:"+g.n,name:"#"+g.n+" · "+String(g.title).replace(/^❗/,""),tags:["gone"],at:null,plain:es?"Se fue a casa desde tu última visita (cerrado).":"Went home since your last visit (closed).",thing:true}));}
    else if(cat==="where:street"){people=people.filter(i=>this.placed[i.n]);things=[];}
    else if(cat==="where:board"){people=people.filter(i=>!this.placed[i.n]);things=[];}
    else if(cat&&cat.startsWith("label:")){const l=cat.slice(6);people=people.filter(i=>(i.labels||[]).includes(l));things=things.filter(t=>t.tags.includes(l));}
    if(qq){people=people.filter(i=>((i.title||"")+" "+(i.body||"")+" "+(i.labels||[]).join(" ")).toLowerCase().includes(qq));
      things=things.filter(t=>(t.name+" "+t.tags.join(" ")+" "+t.plain).toLowerCase().includes(qq));}
    return {people,things};},
  indexCat:"",indexQ:"",
  indexDoc(){const es=lang==="es",self=this,s=[];
    s.push({sel:es?"📇 Mostrar":"📇 Show",opts:this.indexCats(),value:this.indexCat,run:v=>{self.indexCat=v;docOpen("index");}});
    s.push({form:{fields:[{k:"q",label:es?"Una palabra (gente, lugares, etiquetas, animales)":"A word (people, places, labels, animals)",type:"text",value:this.indexQ}],submit:es?"🔎 Buscar":"🔎 Search",cancel:es?"Limpiar":"Clear",noFocus:true,
      onCancel:()=>{self.indexQ="";self.indexCat="";docOpen("index");},run:v=>{self.indexQ=self.clean(v.q,60);docOpen("index");}}});
    const r=this.index(this.indexCat,this.indexQ);
    s.push({h:(es?"Gente · ":"People · ")+r.people.length});
    if(!r.people.length)s.push({p:es?"Nadie aquí con eso.":"Nobody here with that."});
    r.people.slice(0,20).forEach(i=>{s.push({p:this.personPlain(i)});s.push({btn:(es?"→ caminar a #":"→ walk to #")+i.n,run:()=>self.walkTo(i.n)});
      s.push({btn:es?"📝 presentar algo sobre #"+i.n:"📝 file about #"+i.n,run:()=>{self.formTags=(i.labels||[]).filter(l=>!/^tier: /.test(l));docOpen("request");}});});
    if(r.people.length>20)s.push({p:(es?"… y ":"… and ")+(r.people.length-20)+(es?" más. Acota con una palabra.":" more. Narrow with a word.")});
    s.push({h:(es?"Lugares, residentes, animales · ":"Places, residents, animals · ")+r.things.length});
    if(!r.things.length)s.push({p:es?"Nada aquí con eso.":"Nothing here with that."});
    r.things.slice(0,20).forEach(t=>{s.push({p:t.name+" · "+t.plain+" · "+(es?"etiquetas: ":"tags: ")+t.tags.join(", ")});
      if(t.at)s.push({btn:(es?"→ caminar a ":"→ walk to ")+t.name,run:()=>self.goBeside(t.at.world,t.at.x,t.at.y)});
      s.push({btn:(es?"📝 presentar algo sobre ":"📝 file about ")+t.name,run:()=>{self.formTags=t.tags.filter(l=>!/^tier: /.test(l)).slice(0,4);docOpen("request");}});});
    return s;},
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
    const work=this.workLabels().includes(f.work)?[f.work]:[]; /* #69: the address, one work label in plain words */
    const labels=["tier: "+(["high","normal","low"].includes(f.tier)?f.tier:"normal"),["ask","decision","bug"].includes(f.kind)?f.kind:"ask"]
      .concat(work).concat((f.tags||[]).map(l=>this.clean(l,40)).filter(l=>l&&!/^tier: /.test(l)&&!["ask","decision","bug"].includes(l)&&!work.includes(l)).slice(0,5));
    const d=await this.write("POST","/issues",{title,body:this.requestBody(f),labels});
    if(d&&d.number)this.say("Filed as #"+d.number+". They will be on the street shortly.","Archivado como #"+d.number+". Pronto estarán en la calle.");return d;},
  /* ---------- ch-v14: every popup is a form in the reader (owner: "show me what you mean for #2") ----------
     One screen each, every field visible beside the paperwork, cancel costs nothing. The reader
     renders the fields (engine mq-v76); the record acts on the values. */
  formTags:[],   /* tags pre-picked for the next request — where you filed it from (the index, PR 3) */
  tagOpts(){const seen=this.labelsSeen().filter(o=>!/^tier: /.test(o.v)&&!["ask","decision","bug"].includes(o.v)).map(o=>o.v);
    const own=[];this.things().forEach(t=>t.tags.forEach(l=>{if(!/^tier: /.test(l)&&!["ask","decision","bug","people"].includes(l))own.push(l);}));
    return [...new Set(["changarrito","ventanilla",...seen,...this.formTags,...own])].map(v=>({v,t:v}));},
  requestDoc(){const es=lang==="es",self=this;return [{form:{fields:[
      {k:"title",label:es?"Título (corto)":"Title (short)",type:"text"},
      {k:"plain",label:es?"En palabras llanas — qué es, por qué importa":"In plain words — what this is, why it matters",type:"area"},
      {k:"notes",label:es?"Notas (opcional)":"Notes (optional)",type:"area"},
      {k:"done",label:es?"Está hecho cuando…":"Done when…",type:"text"},
      {k:"kind",label:es?"Tipo":"Kind",type:"select",opts:[{v:"ask",t:es?"petición (ask)":"ask"},{v:"decision",t:es?"decisión":"decision"},{v:"bug",t:"bug"}],value:"ask"},
      {k:"tier",label:es?"Peso":"Weight",type:"select",opts:[{v:"normal",t:"normal"},{v:"high",t:"high"},{v:"low",t:"low"}],value:"normal"},
      {k:"work",label:es?"Qué tipo de trabajo (su casa)":"What kind of work (its house)",type:"select",opts:[{v:"",t:es?"— sin dirección —":"— no address yet —"}].concat(this.areas().map(a=>({v:a.label,t:a.label.replace(/^work: /,"")+" · "+(es?a.name.es:a.name.en)}))),value:this.formTags.find(t=>/^work: /.test(t))||""},
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
    const h0=this.house(i);
    for(const l of want)if(!cur.has(l))await this.addLabel(i.n,l);
    for(const l of cur)if(!want.has(l))await this.removeLabel(i.n,l);
    i.labels=[...want];
    /* ch-v24: a change to a room you are not standing in announces itself (OWNER.md, 2026-09-03) */
    const h1=this.house(i);if(h1!==h0){const ar=h1&&this.area(h1);
      if(ar)this.say("#"+i.n+" moved to "+ar.name.en+" ("+ar.label.replace(/^work: /,"")+").","#"+i.n+" se mudó a "+ar.name.es+" ("+ar.label.replace(/^work: /,"")+").");
      else this.say("#"+i.n+" has no address now — the plaza, until a work label lands.","#"+i.n+" ya no tiene domicilio — la plaza, hasta que tenga etiqueta de trabajo.");}},
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
    /* #8 (owner: "the teller should have a category for that that highlights in red. if any other
       critical errors come up, there can be another section in that critical red for other than
       robot gated things"): what El Portero stopped, then everything else critical, both in red,
       from the town's own log; nothing printed when there is nothing */
    if(typeof mqLog!=="undefined"){
      const stopped=mqLog.filter(e=>e.kind==="build"),other=mqLog.filter(e=>e.crit&&e.kind!=="build");
      if(stopped.length||other.length){
        s.push({h:es?"🔴 Crítico":"🔴 Critical"});
        if(stopped.length){s.push({red:(es?"Intentos detenidos por El Portero: ":"Stopped by El Portero: ")+stopped.reduce((t,e)=>t+e.n,0)});
          stopped.forEach(e=>s.push({red:"× "+e.n+" · "+e.msg}));}
        if(other.length){s.push({red:(es?"Otros errores críticos: ":"Other critical errors: ")+other.length});
          other.forEach(e=>s.push({red:"× "+e.n+" · "+e.kind+": "+e.msg}));}
        s.push({btn:es?"✓ Revisado — limpiar":"✓ Reviewed — clear",run:()=>{logClear();docOpen("window");}});}}
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
    s.push({btn:es?"📇 El índice — todo por etiqueta, buscar":"📇 The index — everything by tag, search",run:()=>docOpen("index")});
    s.push({btn:es?"🔍 Acotar la calle: varias etiquetas, una palabra":"🔍 Narrow the street: several labels, a word",run:()=>docOpen("filter")});
    return s;},
  /* the hoarding (ch-v24): block two's gate, reserved — what waits for it */
  nextDoc(){const es=lang==="es",self=this,wait=this.sortPeople(this.all.filter(i=>!this.house(i)));
    const s=[{p:es?"Aquí va la segunda cuadra: el barrio de las decisiones, luego el de los bugs. Don Güero la sitúa cuando el dueño la pida.":"Block two goes here: the decisions district, then the bugs'. Don Güero sites it when the owner asks."}];
    s.push({p:wait.length+(es?" esperan sin domicilio. Una etiqueta de trabajo los mete en una casa hoy mismo.":" wait here with no address. A work label moves them into a house today.")});
    wait.slice(0,8).forEach(i=>{s.push({p:this.personPlain(i)});if(this.placed[i.n])s.push({btn:(es?"→ caminar a #":"→ walk to #")+i.n,run:()=>self.walkTo(i.n)});});
    return s;},
  /* the board: the small things, pinned */
  boardDoc(){const es=lang==="es",s=[];
    if(!this.notesList.length)s.push({p:es?"El tablero está vacío.":"The board is empty."});
    /* ch-v24: the ones with no address first — sin domicilio — the nudge to press Labels on their card */
    const homeless=this.notesList.filter(i=>!this.house(i));
    if(homeless.length){s.push({h:(es?"Sin domicilio · ":"No address · sin domicilio · ")+homeless.length});
      s.push({p:es?"Sin etiqueta de trabajo no tienen casa. Ponles una con el botón Etiquetas y se mudan.":"With no work label they have no house. Give them one with the Labels button and they move in."});}
    /* grouped by kind, the dropdown's order (owner, 2026-09-06: "grouping works") */
    const names={ask:es?"Peticiones":"Asks",decision:es?"Decisiones":"Decisions",bug:es?"Bugs":"Bugs",other:es?"Otras":"Other"};
    ["ask","decision","bug","other"].forEach(k=>{const grp=this.notesList.filter(i=>this.kind(i)===k);if(!grp.length)return;
      s.push({h:names[k]+" · "+grp.length});
      grp.forEach(i=>s.push({kv:[["#"+i.n,i.title],[es?"archivado":"filed",this.days(i.at)],[es?"en palabras llanas":"in plain words",this.plain(i)]]}));});
    return s;},
  place(list){
    const st=WORLDS[this.world];if(!st)return;
    this.all=(list||[]).slice();
    this.titles=this.titles||{};this.all.forEach(i=>{this.titles[i.n]=i.title;});try{localStorage.setItem(SK("titles"),JSON.stringify(this.titles));}catch(e){}
    const bodies=[],aside=[];   /* who gets a body: {i, house, step:[x,y]|null, in:{wid,x,y}|null} */
    (list||[]).forEach(i=>{if(!this.matches(i))aside.push(i);});
    const eligible=i=>this.matches(i)&&this.tier(i)!=="low";
    const pinned=[];
    this.areas().forEach(a=>{const mine=this.sortPeople(this.all.filter(i=>this.house(i)===a.id&&eligible(i)));
      mine.forEach((i,k)=>{if(k<this.capIn)bodies.push({i,house:a.id,step:k<this.capStep?a.doorstep[k]:null,in:{wid:a.world,x:a.inside[k][0],y:a.inside[k][1]}});else pinned.push(i);});});
    const homeless=this.sortPeople(this.all.filter(i=>!this.house(i)&&eligible(i)));
    homeless.forEach((i,k)=>{if(k<this.capPlaza)bodies.push({i,house:null,step:this.plaza[k],in:null});else pinned.push(i);});
    this.people=bodies.map(b=>b.i);
    this.notesList=this.all.filter(i=>this.tier(i)==="low"&&this.matches(i)).concat(pinned).concat(aside); /* whoever has no body is on a board */
    this.notes=this.notesList.length;
    /* Who stands where — the whole set at once, through the engine's syncChill.
       This used to be a hand-rolled diff and it had the bug syncChill exists to remove: it evicted
       a body when its HOUSE changed and never when its SLOT did. Filing a second issue of the same
       tier sorts it first (sortPeople, :475), onto a tile the previous one is still standing on;
       addChill refuses a tile already marked "N"; and the new person landed nowhere while people,
       HUDFACT and the console all reported it standing. A reload cured it, so nobody caught it.
       Reported from play 2026-09-06 — "i dont see any people/characters anymore at all other than
       the teller" — and not found then.
       A body may be TWO placements, one on the street and one indoors, so the id is per-placement
       and not per-issue. */
    const want=[],meta={};
    bodies.forEach(b=>{const nm={en:this.name(b.i),es:this.name(b.i)},lk=this.look(b.i);
      if(b.step){want.push({id:b.i.n+":st",name:nm,look:lk,world:this.world,x:b.step[0],y:b.step[1]});meta[b.i.n+":st"]=b.i;}
      if(b.in){want.push({id:b.i.n+":in",name:nm,look:lk,world:b.in.wid,x:b.in.x,y:b.in.y});meta[b.i.n+":in"]=b.i;}});
    const keys=syncChill(want);
    Object.keys(keys).forEach(id=>{const i=meta[id];if(!i)return; /* the paper each body carries */
      for(const wid of Object.keys(WORLDS)){const n=WORLDS[wid].npcs.find(m=>m.key===keys[id]);
        if(n){n.doc=this.doc(i);n.tier=this.tier(i);n.issue=i.n;break;}}});
    this.placed={};
    bodies.forEach(b=>{const st=keys[b.i.n+":st"]||null,inside=keys[b.i.n+":in"]||null;
      if(st||inside)this.placed[b.i.n]={st,in:inside,house:b.house};});
    auditReach().forEach(p=>console.warn("REACH "+p)); /* a placed person may never wall the hero */
    this.signs();
    console.log("RECORD: "+bodies.length+" standing ("+bodies.filter(b=>b.step).length+" on the street), "+this.notesList.length+" note(s) on the boards");
  }
};

/* WHAT THE STRIP AT THE DOOR SAYS (Rosa, finding 8; the owner: "ok go for the facts then").
   The town used to wear Meridian's front door: a rank, a ladder from Rookie to AI Legend, and
   `0 XP` that nothing in the town could ever award. Rosa's call was that a place you inhabit
   should not carry a score at all — whatever XP counts, it teaches, and in a backlog neither
   filing more nor closing more is reliably good, while a permanent zero is a verdict delivered at
   the door every session. So the strip carries a FACT instead: what is waiting, and what has
   moved since you were last here. It goes down as well as up and neither direction is praised.
   Before the ledger has been read it says nothing rather than guessing. */
function HUDFACT(){
  const R=typeof RECORD!=="undefined"&&RECORD;
  if(!R||!R.all||!R.all.length)return "";
  const es=lang==="es";
  const open=R.all.length;
  let n=null;try{n=R.news();}catch(e){}
  const moved=n?(n.answered.length+n.gone.length):0;
  const a=open+(es?(open===1?" esperando":" esperando"):(open===1?" waiting":" waiting"));
  if(!moved)return a;
  return a+" · "+moved+(es?" con novedad":" moved");
}
