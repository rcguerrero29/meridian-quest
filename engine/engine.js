/* =========================================================
   MERIDIAN QUEST ENGINE — renderer, movement, portals, saves,
   validators, animals, themes, admin tools, the NET seam.
   Game data lives in content/<game>/ (strings, quests, npcs,
   maps, config), loaded BEFORE this file. A new gifted game is
   a new content folder — this file stays untouched.
   ========================================================= */
const FQ=()=>lang==="es"?FQES:FQEN;
const TS=32;
const SOLID=new Set(["#","D","K","P","B","F","G","C","X","T","W","V","A","U","Q","J"]);
/* the content seam: a pack adds its own solid glyphs and declares which are doors */
(typeof SOLIDX!=="undefined"?SOLIDX:"").split("").forEach(c=>SOLID.add(c));
const DOORSET=new Set((typeof DOORS!=="undefined"?DOORS:"+ELO").split(""));
let world="hq";
const WORLDS={};
Object.keys(WORLD_DEFS).forEach(id=>{
  const rows=WORLD_DEFS[id].slice(),grid=[],wnpcs=[],defs=WNPC[id]||{};
  rows.forEach((row,y)=>{grid.push(row.split(""));row.split("").forEach((ch,x)=>{
    if(defs[ch]){wnpcs.push({key:ch,x,y,...defs[ch]});grid[y][x]="N";}});});
  WORLDS[id]={rows,rows0:WORLD_DEFS[id].slice(),grid,npcs:wnpcs,W:rows[0].length,H:rows.length};
});
const CW=()=>WORLDS[world];
const isSolid=(x,y)=>{const w=CW();return x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N";};
/* ---------- chill townsfolk ----------
   Chat-only characters with no quests — they just vibe. The content pack ships some
   (CHILL) and the owner can create more in admin mode (➕ brush, stored per device).
   Name one after somebody legendary and the barrio reacts: EGGS maps lowercase name
   triggers to reaction lines (and dog:true eggs join as a critter instead). */
const CHILLN={},CHILLEGG={};let chillSeq=0;
const EGGSAFE=typeof EGGS!=="undefined"?EGGS:{};
const DEFACT=["💬","☕"]; /* fallback activity emotes for anyone NPCACT does not name */
function drawEmote(n,sx,sy){ /* shared by every camera — townsfolk stay busy from any angle */
  const acts=(typeof NPCACT!=="undefined"&&NPCACT[n.npc])||DEFACT;
  const nw=Date.now(),ph=((nw/1000)+n.x*7.3+n.y*13.7)%13;
  if(ph>=2.4)return;
  const em=acts[Math.floor((nw/13000+n.x+n.y)%acts.length)];
  ctx.font="10px serif";ctx.textAlign="center";
  ctx.globalAlpha=ph<0.3?ph/0.3:ph>2.1?(2.4-ph)/0.3:1;
  ctx.fillText(em,sx+25,sy+1-Math.sin(ph*2.1)*1.6);
  ctx.globalAlpha=1;ctx.textAlign="start";
}
function eggFor(name){const n=String(name||"").toLowerCase();let hit=null;
  Object.entries(EGGSAFE).forEach(([k,e])=>{if(!hit&&e.triggers.some(t2=>n.includes(t2)))hit=k;});
  return hit;}
function addChill(c){ /* {name:{en,es},world,x,y,look} → chat NPC; returns key or null */
  const w=WORLDS[c.world];if(!w)return null;
  const x=c.x|0,y=c.y|0;
  if(x<0||y<0||x>=w.W||y>=w.H)return null; /* edge tiles are fine — worlds like ex have no wall border */
  if(SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")return null;
  const key="~c"+(chillSeq++);
  CHILLN[key]={en:c.name.en,es:c.name.es};
  NPCLOOK[key]=c.look;
  const eg=eggFor(c.name.en);if(eg&&!EGGSAFE[eg].dog)CHILLEGG[key]=eg;
  w.npcs.push({key,x,y,npc:key,q:[],chat:1});
  w.grid[y][x]="N";
  return key;}
(typeof CHILL!=="undefined"?CHILL:[]).forEach(c=>addChill(c));
const chillLines=k=>{
  if(CHILLEGG[k])return EGGSAFE[CHILLEGG[k]].lines[lang];
  if(String(k).startsWith("~c"))
    return T().chill.concat(typeof CHATTER!=="undefined"?CHATTER[lang]||[]:[]);
  return null;};
/* boot-time world integrity check — malformed maps and bad portals get caught HERE, never in play */
(function validateWorlds(){
  Object.entries(WORLD_DEFS).forEach(([id,rows])=>{
    const L=rows[0].length;
    rows.forEach((r,i)=>{if(r.length!==L)console.warn("WORLD "+id+" row "+i+" width "+r.length+" != "+L);});
  });
  Object.entries(PORTALS).forEach(([from,m])=>Object.entries(m).forEach(([ch,p])=>{
    const w=WORLDS[p.to];
    if(!w){console.warn("PORTAL "+from+":"+ch+" → missing world "+p.to);return;}
    const t=w.rows[p.y]&&w.rows[p.y][p.x];
    if(t===undefined||SOLID.has(t)||w.grid[p.y][p.x]==="N")console.warn("PORTAL "+from+":"+ch+" spawn blocked at "+p.to+" ("+p.x+","+p.y+")");
    if(PORTALS[p.to]&&PORTALS[p.to][t])console.warn("PORTAL "+from+":"+ch+" spawns ON a portal tile — ping-pong risk");
  }));
})();
/* full-universe reachability audit: BFS from the hero's spawn across every world THROUGH portals.
   Guarantees: every walkable tile is reachable, and every character always has a reachable adjacent tile. */
function auditReach(){
  const probs=[],seen={};Object.keys(WORLDS).forEach(k=>seen[k]=new Set());
  const walk=(id,x,y)=>{const w=WORLDS[id];return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N");};
  const q=[["hq",10,11]];seen.hq.add("10,11");
  while(q.length){const[idw,x,y]=q.shift();
    const ch=WORLDS[idw].rows[y][x];
    if(PORTALS[idw]&&PORTALS[idw][ch]){const p=PORTALS[idw][ch],key=p.x+","+p.y;
      if(!seen[p.to].has(key)&&walk(p.to,p.x,p.y)){seen[p.to].add(key);q.push([p.to,p.x,p.y]);}}
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const nx=x+dx,ny=y+dy,key=nx+","+ny;
      if(!seen[idw].has(key)&&walk(idw,nx,ny)){seen[idw].add(key);q.push([idw,nx,ny]);}});}
  Object.entries(WORLDS).forEach(([id,w])=>{
    if(seen[id].size===0)return; /* world locked behind a not-yet-built portal (e.g. the Studio pre-completion) — audited once it opens */
    w.npcs.forEach(n=>{const ok=[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>seen[id].has((n.x+dx)+","+(n.y+dy)));
      if(!ok)probs.push("NPC unreachable: "+n.npc+" in "+id);});
    let un=0;
    for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++)if(walk(id,x,y)&&!seen[id].has(x+","+y))un++;
    if(un)probs.push(id+": "+un+" walkable tiles unreachable");
  });
  return probs;
}
auditReach().forEach(p=>console.warn("REACH "+p));
/* ---------- chapters ----------
   A chapter is a district's quest pack plus how many of them close it. Both live in
   content (config.js): `need` is deliberately lower than the pack size, so the city
   stays a template — retune the bar there, never here. */
const CHS=()=>(typeof CHAPTERS!=="undefined"&&CHAPTERS.length)
  ?CHAPTERS:[{id:"all",quests:QEN.map((_,i)=>i),need:QEN.length}];
const chClosed=c=>c.quests.filter(i=>done.has(i)).length>=c.need;
/* `chSeen` is the chapter being played; everything before it is closed for good.
   A chapter ends two ways: you meet its `need`, or you run out of hearts. Either way
   it ends — it never resets. Whatever you left unanswered stays unanswered, and that
   is the whole consequence: the city is never taken away. */
/* ---------- stakes and the grade ----------
   The GRADE is always on: every attempt at a quest is counted, the counts make a
   district's grade, and the grade picks which ending it plays. It never blocks.
   STAKES are a separate optional layer on top — `none` by default. Neither may take
   progress, the city or the save, and neither may harm a character (docs/OWNER.md). */
const STK=()=>(typeof STAKES!=="undefined"&&STAKES)?STAKES:{mode:"none",hearts:3};
let stakesAdmin=null;                       /* admin override, per device, never in the save */
try{const m=localStorage.getItem("mqstakes");if(m)stakesAdmin={mode:m};}catch(e){}
function stakesCfg(){
  if(stakesAdmin)return{...STK(),...stakesAdmin};
  const L=CHS(),c=L[Math.min(chSeen,L.length-1)];
  return (c&&c.stakes)?{...STK(),...c.stakes}:STK();
}
/* `budget` is declared in content but not implemented — it reads as `none` until built */
const stakesMode=()=>{const m=stakesCfg().mode;return m==="hearts"?"hearts":"none";};
const livesOn=()=>stakesMode()==="hearts";
const startHearts=()=>stakesCfg().hearts||3;
/* marks: quest index -> attempts taken. 1 = first try. This is the grade's raw data. */
let marks={};
/* a district's grade out of 3, from how many of its answered quests landed first try */
function gradeOf(c){
  const ans=(c&&c.quests||[]).filter(i=>done.has(i));
  if(!ans.length)return 3;
  const clean=ans.filter(i=>(marks[i]||1)===1).length/ans.length;
  return clean>=0.9?3:clean>=0.6?2:1;
}
function gradeAll(){
  const ans=Object.keys(marks).map(Number).filter(i=>done.has(i));
  if(!ans.length)return 3;
  const clean=ans.filter(i=>marks[i]===1).length/ans.length;
  return clean>=0.9?3:clean>=0.6?2:1;
}
const chDue=()=>{const L=CHS();return chSeen<L.length&&((livesOn()&&hearts<=0)||chClosed(L[chSeen]));};
/* a quest still on offer: unanswered, and its chapter has not closed behind you */
const qChapter=qi=>{const L=CHS();for(let i=0;i<L.length;i++)if(L[i].quests.indexOf(qi)>=0)return i;return -1;};
const qOpen=qi=>{const c=qChapter(qi);return c<0||c>=chSeen;};
const mercadoOpen=()=>chSeen>=1;   /* opens once you take the Monday handover */
/* ---------- state ---------- */
const SHIRTS={architect:"#E0A430",diplomat:"#8B5CF6",operator:"#2AA47C"};
let lang="en";try{lang=localStorage.getItem("mqlang")||"en";}catch(e){}
let chSeen=0,replayTimer=null;
let xp=0,hearts=3,cls="",heroName="Rookie",look={shirt:"#8B5CF6",skin:"#E5AC82",hair:"#26202B",style:"cap",outfit:"casual"},done=new Set(),cur=null,curQ=null,node=null,treats=0,fredQ=0,qLvl0=0;
/* retry-until-correct: `done` = answered right; `qa` maps quest -> best XP already
   awarded across attempts (retries only pay the difference, so nothing farms) + doubles
   as the "attempted" marker; runXP accumulates within the current attempt */
let qa={},runXP=0;
function awardXP(amt){runXP+=amt;const k=cur,prev=qa[k]||0;
  if(runXP>prev){xp+=runXP-prev;qa[k]=runXP;}else qa[k]=prev;}
let px=10,py=11,fx=10,fy=11,dir="down",moving=false,mt=0,held=null,bob=0;
let warpT=0,portalT=0; /* post-warp grace: warpT blocks input, portalT blocks re-triggering — kills door ping-pong */
/* Frederick's wardrobe — Xochi's collar line. Cosmetics are data; drawDog reads `wear`. */
const WEAR={bandana:["#C0392B","#7A3FE0","#E0B45C","#2AA47C","#3E8ED0"],
            collar:["#E0B45C","#C0392B","#7A3FE0","#2AA47C"],
            cape:["#7A3FE0","#C0392B","#2C5FA8"]};
let wear={bandana:null,collar:null,cape:null};
let wearCat={bandana:null,collar:null}; /* Canela: no cape — physics and dignity both object */
const $=id=>document.getElementById(id);
/* NET seam — the server pivot point. Deliberately empty: the cartridge model keeps
   everything on-device today, but a future game (multiplayer, cloud saves) plugs a
   backend in HERE and nowhere else. boot() = connect/auth once at startup;
   sync(state) = called after every save with the full save blob. See docs/IDEAS.md §4. */
const NET={enabled:false,boot(){},sync(state){}};
/* Co-presence hook: peers render like NPCs. Empty until NET fills it. Peer shape:
   {id,name,w,x,y,dir,look} — treat every field as UNTRUSTED network data: names are
   length-clamped and drawn as canvas text only (never DOM), looks pass the same color
   validation as saves. See docs/IDEAS.md §4 for the peer security rules. */
let PEERS=[];
const T=()=>UI[lang];
const AQ=()=>lang==="es"?QES:QEN;
const npcName=k=>CHILLN[k]?CHILLN[k][lang]:NPCN[lang][k];
const lvlIdx=()=>{let i=0;LEVELS.forEach((t2,j)=>{if(xp>=t2)i=j;});return i;};
const lvlName=()=>T().levels[lvlIdx()];
function hud(){const hs=livesOn()?("❤".repeat(Math.max(0,hearts))+"♡".repeat(Math.max(0,startHearts()-Math.max(0,hearts)))):"";
  $("ptag").textContent=`${heroName} · ${lvlName()}`;$("hearts").textContent=hs;$("xp").textContent=`${xp} XP`;
  $("xpfill").style.width=Math.min(100,xp/MAXXP*100)+"%";
  $("status").textContent=`${hs}  ${xp}XP`.trim();}
/* save */
function save(){const st={n:heroName,c:cls,lk:look,xp,he:hearts,d:[...done],px,py,tr:treats,fq:fredQ,w:world,wr:wear,wc:wearCat,qa,cs:chSeen,mk:marks};
  try{localStorage.setItem("mq1",JSON.stringify(st));}catch(e){}
  if(NET.enabled)NET.sync(st);}
function setWorldTag(){$("worldTag").textContent=T().locs[world]+(world==="hq"?" · ❗":"");}
/* Boundary sanitizer: every save that crosses a trust boundary — Trolley Pass links
   today, NET payloads tomorrow — is coerced to known-good shapes here. Numbers clamp,
   strings trim, colors must be hex, unknown keys drop, non-numeric qa keys (e.g.
   "__proto__") are filtered. Local saves pass through it too: corruption-proofing. */
function sanitizeSave(s){
  if(!s||typeof s!=="object")return null;
  const num=(v,lo,hi,d2)=>{v=Number(v);return Number.isFinite(v)?Math.max(lo,Math.min(hi,Math.round(v))):d2;};
  const col=v=>(typeof v==="string"&&/^#[0-9A-Fa-f]{3,8}$/.test(v))?v:null;
  const str2=(v,m2,d2)=>(typeof v==="string"&&v)?v.slice(0,m2):d2;
  const n=str2(s.n,14,"");if(!n)return null;
  const lkIn=(s.lk&&typeof s.lk==="object")?s.lk:{};
  const lk={shirt:col(lkIn.shirt)||"#8B5CF6",skin:col(lkIn.skin)||"#E5AC82",hair:col(lkIn.hair)||"#26202B",
            style:str2(lkIn.style,12,"cap"),outfit:str2(lkIn.outfit,8,"casual")};
  const wearIn=k2=>{const o=(s[k2]&&typeof s[k2]==="object")?s[k2]:{};
    return{bandana:col(o.bandana),collar:col(o.collar),cape:col(o.cape)};};
  const d=Array.isArray(s.d)?[...new Set(s.d.map(v=>num(v,0,98,-1)).filter(v=>v>=0))]:[];
  const qa={};
  if(s.qa&&typeof s.qa==="object")Object.keys(s.qa).slice(0,64).forEach(k2=>{
    const ki=num(k2,-1,98,null);if(ki!==null)qa[ki]=num(s.qa[k2],0,99,0);});
  return{n,c:str2(s.c,24,""),lk,xp:num(s.xp,0,999,0),he:num(s.he,0,3,3),d,
    px:num(s.px,0,63,10),py:num(s.py,0,63,11),tr:num(s.tr,0,9999,0),fq:num(s.fq,0,3,0),
    w:str2(s.w,4,"hq"),wr:wearIn("wr"),wc:wearIn("wc"),qa};
}
function loadSave(){try{return sanitizeSave(JSON.parse(localStorage.getItem("mq1")||""));}catch(e){return null;}}
/* belt & suspenders: flush progress when the tab is backgrounded or closed (only once a run exists) */
window.addEventListener("pagehide",()=>{if(!$("hud").hidden)save();});
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden"&&!$("hud").hidden)save();});
function clearSave(){try{localStorage.removeItem("mq1");}catch(e){}}
/* toasts */
let toastT=null,toastQ=[],tickerT=null;
function toast(msg,ms){const el=$("toast");
  /* the activity ticker mirrors the last message in the top corner and lingers,
     so short interactions can be re-read after the toast fades (owner ask) */
  const tk=$("ticker");tk.textContent=msg;tk.hidden=false;
  clearTimeout(tickerT);tickerT=setTimeout(()=>{tk.hidden=true;},10000);
  if(el.classList.contains("on")){toastQ.push([msg,ms]);return;}
  el.textContent=msg;el.classList.add("on");
  clearTimeout(toastT);toastT=setTimeout(()=>{el.classList.remove("on");
    if(toastQ.length){const[m,d]=toastQ.shift();setTimeout(()=>toast(m,d),300);}},ms||2600);}
$("ticker").addEventListener("click",()=>{$("ticker").hidden=true;});
let lastBump=0;
const pendingAt=n=>n.q.find(qi=>!done.has(qi)&&qOpen(qi));
/* ---------- canvas ---------- */
const cv=$("cv"),ctx=cv.getContext("2d");
const VW=10*TS,VH=8*TS;
function sizeCanvas(){
  const w=$("vp").clientWidth,scale=window.devicePixelRatio||1;
  cv.style.height=(w*VH/VW)+"px";
  cv.width=VW*scale; cv.height=VH*scale;
  ctx.setTransform(scale,0,0,scale,0,0);
}
window.addEventListener("resize",sizeCanvas);
const C={floor:"#E7DFC8",floorAlt:"#E1D8BE",rug:"#C9B7E8",wall:"#453D57",wallTop:"#5A5170",
        desk:"#8A6F4D",deskTop:"#A98B62",counter:"#7E8894",plant:"#3E7C4F",pot:"#B06A3C",
        doorWood:"#7A5233",doorWood2:"#8F6440",doorFrame:"#4A331F"};
let camXg=0,camYg=0;
/* ---------- isometric 2.5D camera (IDEAS §10, v1) ----------
   A second RENDERER over the same world — the entities-as-data payoff. Floors become
   diamonds, solids extrude into blocks colored from the mini-map tables, people and
   animals render as upright billboards at their projected feet, depth by painter's
   sort. Ships as a Settings camera toggle beside top-down; admin painting stays
   top-down-only (tap→tile math differs). */
let camMode="top";try{const cm0=localStorage.getItem("mqcam");if(cm0==="iso"||cm0==="front")camMode=cm0;}catch(e){}
const ISW=44,ISH=22;
let ISOCOL=null;
const IZH={"#":20,B:20,Q:17,Z:17,U:20,W:12,V:10,D:9,K:9,T:8,S:13,H:8,I:9,A:9,P:11,F:7,G:9,C:7,X:8,"1":10};
const shadeHex=(h,amt)=>amt>=0?mixHex(h,"#FFFFFF",amt):mixHex(h,"#000000",-amt);
function isoDiamond(cx,cy,col){ctx.fillStyle=col;ctx.beginPath();
  ctx.moveTo(cx,cy-ISH/2);ctx.lineTo(cx+ISW/2,cy);ctx.lineTo(cx,cy+ISH/2);ctx.lineTo(cx-ISW/2,cy);
  ctx.closePath();ctx.fill();}
function isoBlock(cx,cy,base,h){
  const ty=cy-h;
  ctx.fillStyle=shadeHex(base,-0.32);ctx.beginPath(); /* left face */
  ctx.moveTo(cx-ISW/2,cy);ctx.lineTo(cx,cy+ISH/2);ctx.lineTo(cx,cy+ISH/2-h);ctx.lineTo(cx-ISW/2,ty);
  ctx.closePath();ctx.fill();
  ctx.fillStyle=shadeHex(base,-0.5);ctx.beginPath(); /* right face */
  ctx.moveTo(cx+ISW/2,cy);ctx.lineTo(cx,cy+ISH/2);ctx.lineTo(cx,cy+ISH/2-h);ctx.lineTo(cx+ISW/2,ty);
  ctx.closePath();ctx.fill();
  isoDiamond(cx,ty,tc(base));
  ctx.strokeStyle="rgba(15,12,20,.25)";ctx.lineWidth=.7;ctx.stroke();}
function drawIso(){
  const w=CW();
  ISOCOL=ISOCOL||{"#":C.wall,D:C.desk,K:C.counter,T:"#C9A96A",W:"#AEB6BE",V:"#3A3F46",A:"#B08B5A",U:C.wall,
    ...BASECOL,...(typeof MAPCOL!=="undefined"?MAPCOL:{})};
  const hx=(fx-fy)*ISW/2,hy=(fx+fy)*ISH/2;
  const ox=VW/2-hx,oy=VH/2-hy;
  ctx.fillStyle=tc("#241F2E");ctx.fillRect(0,0,VW,VH);
  const P=(x,y)=>[(x-y)*ISW/2+ox,(x+y)*ISH/2+oy];
  /* floor pass */
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    const[cx,cy]=P(x,y);
    if(cx<-ISW||cx>VW+ISW||cy<-ISH-24||cy>VH+ISH+24)continue;
    const ch=w.rows[y][x];
    let fc=world==="st"?((x+y)%2?"#C6C4BB":"#BFBDB4"):world==="lo"?((x+y)%2?"#D9DCE0":"#D1D5DA"):((x+y)%2?C.floor:C.floorAlt);
    const hsh=(x*374761393+y*668265263)>>>0;
    if((hsh&7)<2)fc=shadeHex(fc,-0.045);
    isoDiamond(cx,cy,tc(fc));
    if(ch==="≈"){isoDiamond(cx,cy,tc("#54555B"));}
    else if(ch==="-"){isoDiamond(cx,cy,tc("#8F9096"));}
    else if(ch==="R"){ctx.save();ctx.translate(cx,cy);ctx.scale(0.75,0.75);ctx.translate(-cx,-cy);isoDiamond(cx,cy,tc(C.rug));ctx.restore();}
    else if(ch==="b"){[[ -7,0,"#D77FA8"],[3,-3,"#E7C25A"],[6,3,"#C9699E"]].forEach(f=>{
      ctx.fillStyle=f[2];ctx.beginPath();ctx.arc(cx+f[0],cy+f[1],2,0,7);ctx.fill();});}
    else if(ch==="g"){ctx.strokeStyle=tc("#5FA86A");ctx.lineWidth=1.4;ctx.lineCap="round";
      [[-6,0],[0,-2],[6,1]].forEach(q=>{ctx.beginPath();ctx.moveTo(cx+q[0],cy+q[1]+3);ctx.lineTo(cx+q[0]+1.5,cy+q[1]-5);ctx.stroke();});}
    else if(DOORSET.has(ch)||ch==="Y"||ch==="2"||ch==="1"&&!SOLID.has(ch)){
      if(DOORSET.has(ch)){ctx.save();ctx.translate(cx,cy);ctx.scale(0.55,0.55);ctx.translate(-cx,-cy);
        isoDiamond(cx,cy,"#E0B45C");ctx.restore();
        ctx.globalAlpha=0.25+0.2*Math.sin(Date.now()/380);isoDiamond(cx,cy,"#FFE9A8");ctx.globalAlpha=1;}
      else{ctx.save();ctx.translate(cx,cy);ctx.scale(0.45,0.45);ctx.translate(-cx,-cy);
        isoDiamond(cx,cy,ch==="Y"?"#C0392B":"#E0B45C");ctx.restore();}}
  }
  /* depth pass: blocks + actors, painter's order */
  const R=[];
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    const gch=w.grid[y][x];
    if(!SOLID.has(gch))continue;
    const[cx,cy]=P(x,y);
    if(cx<-ISW||cx>VW+ISW||cy<-ISH-40||cy>VH+ISH+40)continue;
    if(gch==="J")R.push({d:x+y,f:()=>{isoBlock(cx,cy,"#6E4A2C",12);
      const t2=Math.sin(Date.now()/900+x)*1.2;
      ctx.fillStyle=tc("#4E8A58");
      [[-9,-1,9],[9,-1,9],[0,-7,10]].forEach(q=>{ctx.beginPath();ctx.arc(cx+q[0]+t2,cy-16+q[1],q[2],0,7);ctx.fill();});
      ctx.fillStyle="#B08FE0";[[-8,-4],[4,-9],[8,0],[-2,-2]].forEach(q=>{
        ctx.beginPath();ctx.arc(cx+q[0]+t2,cy-16+q[1],1.6,0,7);ctx.fill();});}});
    else R.push({d:x+y,f:()=>isoBlock(cx,cy,ISOCOL[gch]||ISOCOL[w.rows[y][x]]||C.wall,IZH[gch]||IZH[w.rows[y][x]]||14)});
  }
  const bill=(gx,gy,fn)=>{const[cx,cy]=P(gx,gy);
    if(cx>-ISW&&cx<VW+ISW&&cy>-40&&cy<VH+40)R.push({d:gx+gy+0.51,f:()=>fn(cx-16,cy-25)});};
  w.npcs.forEach(n=>bill(n.x,n.y,(bx,by)=>{
    drawPerson(ctx,bx,by,npcWhimsy(n.key),{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(pendingAt(n)!==undefined){ctx.font="700 13px sans-serif";ctx.fillStyle="#E0B45C";ctx.textAlign="center";
      ctx.fillText("❗",bx+16,by+2+Math.sin(Date.now()/250)*2);ctx.textAlign="start";}
    else drawEmote(n,bx,by);}));
  if(world==="hq")bill(DOG.fx,DOG.fy,(bx,by)=>drawDog(ctx,bx,by));
  if(world==="lc")bill(CAT.fx,CAT.fy,(bx,by)=>drawCat(ctx,bx,by));
  if(world==="st"){bill(PIG.fx,PIG.fy,(bx,by)=>drawPigeon(ctx,bx,by));bill(LORO.x,LORO.y,(bx,by)=>drawLoro(ctx,bx,by));}
  CRIT.forEach(cr=>{if(cr.world!==world)return;
    bill(cr.fx,cr.fy,(bx,by)=>{
      if(cr.kind==="butterfly")drawButterfly(ctx,cr,bx,by);
      else if(cr.kind==="colibri")drawColibri(ctx,cr,bx,by);
      else if(cr.kind==="gato")drawGato(ctx,cr,bx,by);
      else if(cr.kind==="beagle")drawBeagle(ctx,cr,bx,by);});});
  if(BALL&&BALL.world===world)bill(BALL.fx,BALL.fy,(bx,by)=>drawBall(ctx,bx,by,BALL.phase,BALL.t));
  bill(fx,fy,(bx,by)=>drawPerson(ctx,bx,by,look,{dir,bob:moving?Math.sin(bob)*2:0,moving}));
  R.sort((a,b)=>a.d-b.d).forEach(r=>r.f());
  /* shared time-of-day wash (door spills are top-down-only for now) */
  const dnow=new Date(),hr=dnow.getHours()+dnow.getMinutes()/60;
  let wash=null;
  if(themeName==="sunset")wash="rgba(255,150,60,.10)";
  else if(hr>=20.5||hr<6)wash="rgba(28,38,92,.20)";
  else if(hr>=18||hr<8)wash="rgba(255,150,60,.07)";
  if(wash){ctx.fillStyle=wash;ctx.fillRect(0,0,VW,VH);}
}
function camSet(m){camMode=m;
  try{localStorage.setItem("mqcam",m);}catch(e){}
  document.querySelectorAll("#camRow button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.cam===camMode?"true":"false"));}
document.querySelectorAll("#camRow button").forEach(b=>b.addEventListener("click",()=>camSet(b.dataset.cam)));
/* ---------- tile renderer registry (graphics-prep, IDEAS §7 step 1) ----------
   Every glyph draws via TILEDRAW[ch](rc), rc={sx,sy,x,y,canopy}. Content packs
   may override or add art via TILEART (typeof-guarded, like CRITTERS/EGGS) —
   per-glyph art is data now, completing the entities-as-data law for the world. */
const TILEDRAW={};
TILEDRAW["#"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc(C.wall);ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc(C.wallTop);ctx.fillRect(sx,sy,TS,6);};
TILEDRAW["B"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc("#5C4A50");ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc("#6E5A60");ctx.fillRect(sx,sy,TS,5);
      ctx.fillStyle=tc("#8E7A80");ctx.fillRect(sx+5,sy+10,8,9);ctx.fillRect(sx+19,sy+10,8,9);};
TILEDRAW["R"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc(C.rug);ctx.fillRect(sx+2,sy+2,TS-4,TS-4);};
TILEDRAW["≈"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc("#54555B");ctx.fillRect(sx,sy,TS,TS);
      if(y%2===0){ctx.fillStyle=tc("#6A6B72");ctx.fillRect(sx+4,sy+15,10,2);}};
TILEDRAW["-"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc("#54555B");ctx.fillRect(sx,sy,TS,TS);
      ctx.fillStyle=tc("#D8D6CE");ctx.fillRect(sx+3,sy+4,TS-6,5);ctx.fillRect(sx+3,sy+14,TS-6,5);ctx.fillRect(sx+3,sy+24,TS-6,5);};
TILEDRAW["F"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc("#A87F4F");for(let i=0;i<4;i++)ctx.fillRect(sx+2+i*8,sy+4,6,TS-8);
      ctx.fillStyle=tc("#8B6A42");ctx.fillRect(sx,sy+8,TS,3);ctx.fillRect(sx,sy+21,TS,3);};
TILEDRAW["J"]=rc=>{const{sx,sy,x,y}=rc; /* jacaranda: trunk here, canopy in a later pass so it overhangs */
      ctx.fillStyle="#6E4A2C";ctx.fillRect(sx+13,sy+12,6,17);
      ctx.fillStyle="#59391F";ctx.fillRect(sx+13,sy+12,2,17);
      rc.canopy(sx,sy);};
TILEDRAW["b"]=rc=>{const{sx,sy,x,y}=rc; /* flower bed: soil + blooms, walkable — you may smell them */
      ctx.fillStyle=tc("#7A5A3C");ctx.beginPath();ctx.roundRect(sx+3,sy+6,TS-6,TS-10,6);ctx.fill();
      [[9,12,"#D77FA8"],[16,10,"#E7C25A"],[23,13,"#C9699E"],[12,19,"#E08A5A"],[20,20,"#D77FA8"]].forEach(p=>{
        ctx.fillStyle=p[2];ctx.beginPath();ctx.arc(sx+p[0],sy+p[1],2.4,0,7);ctx.fill();
        ctx.fillStyle="#F5EAD2";ctx.beginPath();ctx.arc(sx+p[0],sy+p[1],0.9,0,7);ctx.fill();});};
TILEDRAW["g"]=rc=>{const{sx,sy,x,y}=rc; /* grass tuft on the floor tile */
      ctx.strokeStyle=tc("#5FA86A");ctx.lineWidth=1.6;ctx.lineCap="round";
      [[8,0],[13,-2],[18,1],[23,-1]].forEach(p=>{ctx.beginPath();
        ctx.moveTo(sx+p[0],sy+24);ctx.quadraticCurveTo(sx+p[0]+p[1],sy+18,sx+p[0]+p[1]*1.6,sy+13);ctx.stroke();});};
TILEDRAW["G"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#C98A2D";ctx.fillRect(sx+4,sy+2,4,TS-4);ctx.fillRect(sx+24,sy+2,4,TS-4);
      ctx.fillRect(sx+4,sy+6,24,4);ctx.fillRect(sx+4,sy+22,24,4);};
TILEDRAW["C"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#E0662B";ctx.beginPath();ctx.moveTo(sx+16,sy+8);ctx.lineTo(sx+23,sy+26);ctx.lineTo(sx+9,sy+26);ctx.closePath();ctx.fill();
      ctx.fillStyle="#F4F1EA";ctx.fillRect(sx+11.5,sy+17,9,3);};
TILEDRAW["X"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#E7C25A";ctx.fillRect(sx+4,sy+4,TS-8,TS-12);ctx.fillStyle="#6B5210";
      ctx.font="14px serif";ctx.textAlign="center";ctx.fillText("🚧",sx+16,sy+19);ctx.textAlign="start";
      ctx.fillStyle="#8B6A42";ctx.fillRect(sx+14,sy+24,4,6);};
TILEDRAW["1"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#8A8474";for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#9A947F":"#7E7867";ctx.fillRect(sx+3,sy+4+i*6,TS-6,6);}
      ctx.fillStyle="#4A331F";ctx.fillRect(sx+2,sy+2,2,TS-4);ctx.fillRect(sx+28,sy+2,2,TS-4);};
TILEDRAW["2"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#E0B45C";ctx.font="700 15px sans-serif";ctx.textAlign="center";
      ctx.fillText("»",sx+16,sy+21);ctx.textAlign="start";};
TILEDRAW["Y"]=rc=>{const{sx,sy,x,y}=rc; /* trolley stop: pole + sign + bench — the town's transit spine */
      ctx.fillStyle="#3B3F45";ctx.fillRect(sx+6,sy+5,3,22);
      ctx.fillStyle="#C0392B";ctx.fillRect(sx+2,sy+2,15,9);
      ctx.strokeStyle="rgba(15,12,20,.4)";ctx.lineWidth=1;ctx.strokeRect(sx+2,sy+2,15,9);
      ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.fillText("MQT",sx+4,sy+9);
      ctx.fillStyle="#8A6B3F";ctx.fillRect(sx+14,sy+21,15,3);
      ctx.fillRect(sx+15,sy+24,2,5);ctx.fillRect(sx+26,sy+24,2,5);};
TILEDRAW["Q"]=rc=>{const{sx,sy,x,y}=rc; /* La Cocina storefront: terracotta facade + striped awning + window */
      ctx.fillStyle="#A8503A";ctx.fillRect(sx,sy,TS,TS);
      for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#F2E8D8":"#C0392B";ctx.fillRect(sx+i*8,sy,8,7);}
      ctx.fillStyle="#7A3527";ctx.fillRect(sx,sy+7,TS,2);
      ctx.fillStyle="#F5DFA9";ctx.fillRect(sx+8,sy+14,16,10);
      ctx.fillStyle="#7A3527";ctx.fillRect(sx+15,sy+14,2,10);};
TILEDRAW["D"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc(C.desk);ctx.fillRect(sx+2,sy+8,TS-4,TS-12);ctx.fillStyle=tc(C.deskTop);ctx.fillRect(sx+2,sy+4,TS-4,8);
      ctx.fillStyle="#DDE4EA";ctx.fillRect(sx+8,sy+6,10,5);};
TILEDRAW["K"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=tc(C.counter);ctx.fillRect(sx+2,sy+6,TS-4,TS-10);ctx.font="12px serif";ctx.fillText("☕",sx+9,sy+22);};
TILEDRAW["P"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle=C.pot;ctx.fillRect(sx+10,sy+18,12,10);ctx.fillStyle=C.plant;
      ctx.beginPath();ctx.arc(sx+16,sy+13,8,0,7);ctx.fill();};
TILEDRAW["T"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#7A4E2C";ctx.beginPath();ctx.arc(sx+16,sy+16,11,0,7);ctx.fill();
      ctx.fillStyle="#F2E8D8";ctx.beginPath();ctx.arc(sx+16,sy+16,9,0,7);ctx.fill();
      ctx.fillStyle="#C0392B";ctx.beginPath();ctx.arc(sx+16,sy+16,3,0,7);ctx.fill();};
TILEDRAW["W"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#AEB6BE";ctx.fillRect(sx+4,sy+2,TS-8,TS-4);
      ctx.fillStyle="#8E969E";ctx.fillRect(sx+4,sy+14,TS-8,2);
      ctx.fillStyle="#5F676F";ctx.fillRect(sx+21,sy+5,3,7);ctx.fillRect(sx+21,sy+18,3,7);};
TILEDRAW["V"]=rc=>{const{sx,sy,x,y}=rc;ctx.fillStyle="#3A3F46";ctx.fillRect(sx+3,sy+4,TS-6,TS-8);
      ctx.fillStyle="#23272C";[[10,12],[22,12],[10,22],[22,22]].forEach(p=>{
        ctx.beginPath();ctx.arc(sx+p[0],sy+p[1],3.4,0,7);ctx.fill();});
      ctx.fillStyle="#E0662B";ctx.fillRect(sx+14,sy+6,4,2);};
TILEDRAW["A"]=rc=>{const{sx,sy,x,y}=rc; /* drafting table: tilted board, blueprint sheet, T-square */
      ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+13,sy+20,6,8);
      ctx.fillStyle="#B08B5A";ctx.beginPath();ctx.moveTo(sx+4,sy+20);ctx.lineTo(sx+28,sy+16);ctx.lineTo(sx+28,sy+6);ctx.lineTo(sx+4,sy+10);ctx.closePath();ctx.fill();
      ctx.fillStyle="#2E5FA8";ctx.beginPath();ctx.moveTo(sx+7,sy+18.6);ctx.lineTo(sx+25,sy+15.4);ctx.lineTo(sx+25,sy+8);ctx.lineTo(sx+7,sy+11);ctx.closePath();ctx.fill();
      ctx.strokeStyle="#DDE8F5";ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(sx+9,sy+12);ctx.lineTo(sx+22,sy+10);ctx.moveTo(sx+9,sy+14.5);ctx.lineTo(sx+22,sy+12.5);ctx.moveTo(sx+9,sy+17);ctx.lineTo(sx+18,sy+15.4);ctx.stroke();};
TILEDRAW["Z"]=rc=>{const{sx,sy,x,y}=rc; /* El Mercado facade: green stall front, striped awning, produce window */
      ctx.fillStyle="#4E7A4A";ctx.fillRect(sx,sy,TS,TS);
      for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#F2E8D8":"#C98A2D";ctx.fillRect(sx+i*8,sy,8,7);}
      ctx.fillStyle="#385C36";ctx.fillRect(sx,sy+7,TS,2);
      ctx.fillStyle="#EFE3C4";ctx.fillRect(sx+7,sy+13,18,11);
      [[11,17,"#C0392B"],[16,17,"#E0A430"],[21,17,"#7A9A4E"],[13,21,"#D77FA8"],[19,21,"#E0662B"]].forEach(f=>{
        ctx.fillStyle=f[2];ctx.beginPath();ctx.arc(sx+f[0],sy+f[1],2.2,0,7);ctx.fill();});};
TILEDRAW["S"]=rc=>{const{sx,sy,x,y}=rc; /* shelving: three loaded shelves */
      ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+2,sy+2,TS-4,TS-4);
      ctx.fillStyle="#6E5638";[6,14,22].forEach(yy=>ctx.fillRect(sx+2,sy+yy,TS-4,2));
      ctx.fillStyle="#D9C9A3";[[6,3],[13,3],[20,3],[6,11],[15,11],[9,19],[18,19]].forEach(b=>
        ctx.fillRect(sx+b[0],sy+b[1],5,4));};
TILEDRAW["H"]=rc=>{const{sx,sy,x,y}=rc; /* produce crate */
      ctx.fillStyle="#B0895B";ctx.fillRect(sx+3,sy+10,TS-6,TS-14);
      ctx.fillStyle="#8B6A42";ctx.fillRect(sx+3,sy+16,TS-6,2);ctx.fillRect(sx+15,sy+10,2,TS-14);
      [[9,9,"#C0392B"],[16,7,"#7A9A4E"],[23,9,"#E0A430"]].forEach(f=>{
        ctx.fillStyle=f[2];ctx.beginPath();ctx.arc(sx+f[0],sy+f[1],3.2,0,7);ctx.fill();});};
TILEDRAW["I"]=rc=>{const{sx,sy,x,y}=rc; /* mercado counter: worn wood, scale on top */
      ctx.fillStyle="#A8825A";ctx.fillRect(sx+2,sy+6,TS-4,TS-10);
      ctx.fillStyle="#8B6A42";ctx.fillRect(sx+2,sy+6,TS-4,3);
      ctx.fillStyle="#C9CDD2";ctx.fillRect(sx+11,sy+11,10,6);
      ctx.fillStyle="#5F676F";ctx.fillRect(sx+14,sy+9,4,2);};
TILEDRAW["U"]=rc=>{const{sx,sy,x,y}=rc; /* blueprint wall panel */
      ctx.fillStyle=tc(C.wall);ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=tc(C.wallTop);ctx.fillRect(sx,sy,TS,6);
      ctx.fillStyle="#2E5FA8";ctx.fillRect(sx+4,sy+9,TS-8,18);
      ctx.strokeStyle="#DDE8F5";ctx.lineWidth=0.9;
      ctx.strokeRect(sx+8,sy+13,9,7);ctx.beginPath();ctx.moveTo(sx+8,sy+23);ctx.lineTo(sx+24,sy+23);ctx.moveTo(sx+20,sy+13);ctx.lineTo(sx+24,sy+17);ctx.stroke();
      ctx.fillStyle="#E0B45C";[[5,10],[26,10],[5,25],[26,25]].forEach(p=>ctx.fillRect(sx+p[0],sy+p[1],1.6,1.6));};
DOORSET.forEach(dch=>TILEDRAW[dch]=rc=>{const{sx,sy}=rc;
      ctx.fillStyle=C.doorFrame;ctx.fillRect(sx+2,sy,TS-4,TS);
      ctx.fillStyle=C.doorWood;ctx.fillRect(sx+4,sy+2,11,TS-4);
      ctx.fillStyle=C.doorWood2;ctx.fillRect(sx+17,sy+2,11,TS-4);
      ctx.fillStyle="rgba(0,0,0,.15)";ctx.fillRect(sx+15,sy+2,2,TS-4);
      ctx.fillStyle="#E0B45C";
      ctx.beginPath();ctx.arc(sx+12.5,sy+17,1.7,0,7);ctx.fill();
      ctx.beginPath();ctx.arc(sx+19.5,sy+17,1.7,0,7);ctx.fill();
      /* light under the door, gently pulsing: this one opens (doors were reading as walls) */
      ctx.globalAlpha=0.25+0.2*Math.sin(Date.now()/380);
      ctx.fillStyle="#FFE9A8";ctx.fillRect(sx+4,sy+TS-3,TS-8,2);
      ctx.globalAlpha=1;
    });
if(typeof TILEART!=="undefined")Object.assign(TILEDRAW,TILEART);
/* ---------- TILES: glyph-class metadata (IDEAS §10 step ①) ----------
   What a tile IS — one row per glyph — so any camera derives drawing from meaning
   instead of meaning living in one renderer's pixels. `lift` is how tall the tile
   stands in front-profile view (facade px above its grid row); `kind` is meaning
   for future renderers. Content packs override or add rows via TILEMETA. */
const TILES={};
SOLID.forEach(g=>TILES[g]={lift:7,kind:"prop"});
Object.assign(TILES,{
  "#":{lift:13,kind:"wall"},U:{lift:13,kind:"wall"},
  B:{lift:13,kind:"facade"},Q:{lift:13,kind:"facade"},Z:{lift:13,kind:"facade"},
  D:{lift:6,kind:"furniture"},K:{lift:6,kind:"furniture"},T:{lift:6,kind:"furniture"},
  A:{lift:6,kind:"furniture"},S:{lift:9,kind:"furniture"},H:{lift:5,kind:"furniture"},
  I:{lift:6,kind:"furniture"},W:{lift:8,kind:"appliance"},V:{lift:8,kind:"appliance"},
  F:{lift:5,kind:"fence"},G:{lift:5,kind:"fence"},
  C:{lift:3,kind:"marker"},X:{lift:6,kind:"obra"},
  P:{lift:6,kind:"nature"},J:{lift:0,kind:"tree"}});
if(typeof TILEMETA!=="undefined")Object.entries(TILEMETA).forEach(([g,m])=>TILES[g]={...(TILES[g]||{}),...m});
const roofCol=g=>({"#":C.wallTop,U:C.wallTop,B:"#6E5A60",Q:"#7A3527",Z:"#385C36",D:C.deskTop,K:C.counter,
  W:"#8E969E",V:"#23272C"})[g]||shadeHex(BASECOL[g]||(typeof MAPCOL!=="undefined"&&MAPCOL[g])||C.wall,-0.18);
/* ---------- DECOR: instance metadata (IDEAS §10 step ①b) ----------
   One-off place identity as content data: DECOR=[{world,x,y,deco,...}]. What used
   to live only in hand-drawn pixels becomes something every camera can honor.
   The engine ships a small vocabulary; packs add or override art via DECOART. */
const DECODRAW={
  sign:(sx,sy,d)=>{ctx.fillStyle="#3B3F45";ctx.fillRect(sx+14,sy+8,3,20);
    ctx.fillStyle=d.c||"#C0392B";ctx.fillRect(sx+6,sy+4,20,10);
    ctx.strokeStyle="rgba(15,12,20,.4)";ctx.lineWidth=1;ctx.strokeRect(sx+6,sy+4,20,10);
    ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.textAlign="center";
    ctx.fillText(String(d.text||"").slice(0,4),sx+16,sy+11);ctx.textAlign="start";},
  mural:(sx,sy)=>{["#C0392B","#E0A430","#2E5FA8","#7A9A4E"].forEach((cc,i)=>{
    ctx.fillStyle=cc;ctx.fillRect(sx+3+i*7,sy+10,6,14);});},
};
if(typeof DECOART!=="undefined")Object.assign(DECODRAW,DECOART);
const DECOS=(typeof DECOR!=="undefined"?DECOR:[]);
function drawDecor(camX,camY){DECOS.forEach(d=>{if(d.world!==world)return;
  const f=DECODRAW[d.deco];if(!f)return;
  const sx=d.x*TS-camX,sy=d.y*TS-camY;
  if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;f(sx,sy,d);});}
/* temporary ground marks — dug holes and the other thing; they fade on their own */
const DECALS=[];
function drawDecals(camX,camY){const nw=Date.now();
  for(let i=DECALS.length-1;i>=0;i--)if(DECALS[i].until<nw)DECALS.splice(i,1);
  DECALS.forEach(dc=>{if(dc.world!==world)return;
    const sx=dc.x*TS-camX,sy=dc.y*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    ctx.globalAlpha=Math.min(1,(dc.until-nw)/1500);
    if(dc.kind==="hole"){ctx.fillStyle="#5A4630";ctx.beginPath();ctx.ellipse(sx+16,sy+18,8,5,0,0,7);ctx.fill();
      ctx.fillStyle="#3E2F1E";ctx.beginPath();ctx.ellipse(sx+16,sy+18,5,3,0,0,7);ctx.fill();
      ctx.fillStyle="#6E5638";[[6,10],[25,12],[10,25],[23,24]].forEach(p=>ctx.fillRect(sx+p[0],sy+p[1],2.5,2));}
    else if(dc.kind==="poop"){ctx.font="11px serif";ctx.textAlign="center";ctx.fillText("💩",sx+16,sy+22);ctx.textAlign="start";}
    ctx.globalAlpha=1;});}
/* ---------- front-profile 2.5D (IDEAS §10 step ②) ----------
   The owner's steer, verbatim: "show us a profile from the front." Square grid,
   straight-on camera. Solids keep every painted pixel of their facades and grow a
   roof strip upward; rows render back-to-front so the town gets true depth without
   losing a door, an awning, or a fence. */
function drawFront(){
  const w=CW();
  const camX=Math.max(0,Math.min(w.W*TS-VW,fx*TS+TS/2-VW/2));
  const camY=Math.max(0,Math.min(Math.max(0,w.H*TS-VH),fy*TS+TS/2-VH/2));
  camXg=camX;camYg=camY;
  ctx.fillStyle=tc("#241F2E");ctx.fillRect(0,0,VW,VH);
  const x0=Math.floor(camX/TS),y0=Math.floor(camY/TS),trees=[];
  const queueCanopy=(cx2,cy2)=>trees.push([cx2,cy2]);
  const yEnd=Math.min(w.H-1,y0+9),xEnd=Math.min(w.W-1,x0+11);
  /* ground pass: floors, walkable art, and the shadow every facade casts */
  for(let y=y0;y<=yEnd;y++)for(let x=x0;x<=xEnd;x++){
    const ch=w.rows[y][x],sx=x*TS-camX,sy=y*TS-camY;
    if(world==="st")ctx.fillStyle=tc((x+y)%2?"#C6C4BB":"#BFBDB4");
    else if(world==="lo")ctx.fillStyle=tc((x+y)%2?"#D9DCE0":"#D1D5DA");
    else ctx.fillStyle=tc((x+y)%2?C.floor:C.floorAlt);
    ctx.fillRect(sx,sy,TS,TS);
    const hsh=(x*374761393+y*668265263+world.charCodeAt(0)*69069)>>>0;
    if((hsh&7)<2){ctx.globalAlpha=0.05;ctx.fillStyle="#000";ctx.fillRect(sx,sy,TS,TS);ctx.globalAlpha=1;}
    if(hsh%11===3){ctx.globalAlpha=0.08;ctx.fillStyle="#FFF";ctx.fillRect(sx+(hsh>>3)%26+2,sy+(hsh>>5)%26+2,2,2);ctx.globalAlpha=1;}
    if(!SOLID.has(w.grid[y][x])){const tf=TILEDRAW[ch];if(tf)tf({sx,sy,x,y,canopy:queueCanopy});}
    if(y>0&&SOLID.has(w.grid[y-1][x])&&!SOLID.has(w.grid[y][x])){
      ctx.fillStyle="rgba(15,12,20,.16)";ctx.fillRect(sx,sy,TS,8);}
  }
  drawDecals(camX,camY);
  /* depth pass: facades, decor and actors interleaved by row, back to front */
  const R=[];
  DECOS.forEach(d=>{if(d.world!==world)return;const f=DECODRAW[d.deco];if(!f)return;
    const sx=d.x*TS-camX,sy=d.y*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    R.push({d:d.y+0.05,f:()=>f(sx,sy,d)});}); /* after its row's facade, before actors */
  for(let y=Math.max(0,y0-1);y<=yEnd;y++)for(let x=x0;x<=xEnd;x++){
    const gch=w.grid[y][x];if(!SOLID.has(gch))continue;
    const ch=w.rows[y][x],sx=x*TS-camX,sy=y*TS-camY;
    R.push({d:y,f:()=>{
      const m=TILES[gch]||TILES[ch]||{lift:7},L=m.lift|0;
      if(L>0){ctx.fillStyle=tc(roofCol(gch));ctx.fillRect(sx,sy-L,TS,L);
        ctx.fillStyle="rgba(255,255,255,.14)";ctx.fillRect(sx,sy-L,TS,1.5);
        ctx.fillStyle="rgba(15,12,20,.18)";ctx.fillRect(sx,sy-1,TS,1);}
      const tf=TILEDRAW[ch]||TILEDRAW[gch];if(tf)tf({sx,sy,x,y,canopy:queueCanopy});
    }});
  }
  const act=(gx,gy,fn)=>{const sx=gx*TS-camX,sy=gy*TS-camY;
    if(sx<-TS||sy<-TS-16||sx>VW||sy>VH)return;R.push({d:gy+0.55,f:()=>fn(sx,sy)});};
  w.npcs.forEach(n=>act(n.x,n.y,(sx,sy)=>{
    drawPerson(ctx,sx,sy,npcWhimsy(n.key),{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(pendingAt(n)!==undefined){ctx.font="700 13px sans-serif";ctx.fillStyle="#E0B45C";ctx.textAlign="center";
      ctx.fillText("❗",sx+16,sy+2+Math.sin(Date.now()/250)*2);ctx.textAlign="start";}
    else drawEmote(n,sx,sy);}));
  PEERS.forEach(p=>{if(p.w!==world)return;
    act(p.x,p.y,(sx,sy)=>{drawPerson(ctx,sx,sy,p.look||look,{dir:p.dir||"down"});
      ctx.font="600 8px monospace";ctx.textAlign="center";
      ctx.fillStyle="rgba(15,12,20,.75)";ctx.fillText(String(p.name||"").slice(0,12),sx+16.7,sy-1.3);
      ctx.fillStyle="#EDE9F5";ctx.fillText(String(p.name||"").slice(0,12),sx+16,sy-2);
      ctx.textAlign="start";});});
  if(world==="hq")act(DOG.fx,DOG.fy,(sx,sy)=>drawDog(ctx,sx,sy));
  if(world==="lc")act(CAT.fx,CAT.fy,(sx,sy)=>drawCat(ctx,sx,sy));
  if(world==="st"){act(PIG.fx,PIG.fy,(sx,sy)=>drawPigeon(ctx,sx,sy));act(LORO.x,LORO.y,(sx,sy)=>drawLoro(ctx,sx,sy));}
  CRIT.forEach(cr=>{if(cr.world!==world)return;
    act(cr.fx,cr.fy,(sx,sy)=>{
      if(cr.kind==="butterfly")drawButterfly(ctx,cr,sx,sy);
      else if(cr.kind==="colibri")drawColibri(ctx,cr,sx,sy);
      else if(cr.kind==="gato")drawGato(ctx,cr,sx,sy);
      else if(cr.kind==="beagle")drawBeagle(ctx,cr,sx,sy);});});
  if(BALL&&BALL.world===world)act(BALL.fx,BALL.fy,(sx,sy)=>drawBall(ctx,sx,sy,BALL.phase,BALL.t));
  act(fx,fy,(sx,sy)=>drawPerson(ctx,sx,sy,look,{dir,bob:moving?Math.sin(bob)*2:0,moving}));
  R.sort((a,b)=>a.d-b.d).forEach(r=>r.f());
  trees.forEach(([sx,sy])=>{ /* canopy pass, shared shape with top-down */
    const sw=Math.sin(Date.now()/900+sx)*1.2,cxT=sx+16+sw,cyT=sy+6;
    ctx.fillStyle=tc("#4E8A58");
    ctx.beginPath();ctx.arc(cxT-9,cyT+3,8.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT+9,cyT+3,8.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT,cyT-3,10,0,7);ctx.fill();
    ctx.fillStyle=tc("#639C6C");
    ctx.beginPath();ctx.arc(cxT-4,cyT-1,6.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT+6,cyT+1,5.5,0,7);ctx.fill();
    ctx.fillStyle="#B08FE0";
    [[-8,-4],[3,-8],[9,-1],[-2,2],[-12,4],[12,5]].forEach(p=>{
      ctx.beginPath();ctx.arc(cxT+p[0],cyT+p[1],1.7,0,7);ctx.fill();});
  });
  drawAmbient(w,camX,camY);
  drawDaylight(w,camX,camY);
}
function draw(){
  if(camMode==="iso"){drawIso();return;}
  if(camMode==="front"){drawFront();return;}
  const w=CW();
  const camX=Math.max(0,Math.min(w.W*TS-VW,fx*TS+TS/2-VW/2));
  const camY=Math.max(0,Math.min(Math.max(0,w.H*TS-VH),fy*TS+TS/2-VH/2));
  camXg=camX;camYg=camY;
  ctx.fillStyle=tc("#241F2E");ctx.fillRect(0,0,VW,VH);
  const x0=Math.floor(camX/TS),y0=Math.floor(camY/TS),trees=[];
  const queueCanopy=(cx2,cy2)=>trees.push([cx2,cy2]);
  for(let y=y0;y<=Math.min(w.H-1,y0+9);y++)for(let x=x0;x<=Math.min(w.W-1,x0+11);x++){
    const ch=w.rows[y][x],sx=x*TS-camX,sy=y*TS-camY;
    if(world==="st")ctx.fillStyle=tc((x+y)%2?"#C6C4BB":"#BFBDB4");
    else if(world==="lo")ctx.fillStyle=tc((x+y)%2?"#D9DCE0":"#D1D5DA");
    else ctx.fillStyle=tc((x+y)%2?C.floor:C.floorAlt);
    ctx.fillRect(sx,sy,TS,TS);
    /* wave-1 ground detail: per-tile hash variation (stable speckle) */
    const hsh=(x*374761393+y*668265263+world.charCodeAt(0)*69069)>>>0;
    if((hsh&7)<2){ctx.globalAlpha=0.05;ctx.fillStyle="#000";ctx.fillRect(sx,sy,TS,TS);ctx.globalAlpha=1;}
    if(hsh%11===3){ctx.globalAlpha=0.08;ctx.fillStyle="#FFF";ctx.fillRect(sx+(hsh>>3)%26+2,sy+(hsh>>5)%26+2,2,2);ctx.globalAlpha=1;}
    const tf=TILEDRAW[ch];if(tf)tf({sx,sy,x,y,canopy:queueCanopy});
    /* walls cast down: a soft shadow on the walkable tile below any solid one */
    if(y>0&&SOLID.has(w.grid[y-1][x])&&!SOLID.has(w.grid[y][x])){
      ctx.fillStyle="rgba(15,12,20,.13)";ctx.fillRect(sx,sy,TS,6);}
  }
  drawDecals(camX,camY);drawDecor(camX,camY);
  trees.forEach(([sx,sy])=>{ /* canopy pass: overhangs neighboring tiles, sways gently */
    const sw=Math.sin(Date.now()/900+sx)*1.2,cxT=sx+16+sw,cyT=sy+6;
    ctx.fillStyle=tc("#4E8A58");
    ctx.beginPath();ctx.arc(cxT-9,cyT+3,8.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT+9,cyT+3,8.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT,cyT-3,10,0,7);ctx.fill();
    ctx.fillStyle=tc("#639C6C");
    ctx.beginPath();ctx.arc(cxT-4,cyT-1,6.5,0,7);ctx.fill();
    ctx.beginPath();ctx.arc(cxT+6,cyT+1,5.5,0,7);ctx.fill();
    ctx.fillStyle="#B08FE0"; /* jacaranda blooms */
    [[-8,-4],[3,-8],[9,-1],[-2,2],[-12,4],[12,5]].forEach(p=>{
      ctx.beginPath();ctx.arc(cxT+p[0],cyT+p[1],1.7,0,7);ctx.fill();});
  });
  w.npcs.forEach(n=>{
    const sx=n.x*TS-camX,sy=n.y*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    drawPerson(ctx,sx,sy,npcWhimsy(n.key),{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(pendingAt(n)!==undefined){ctx.font="700 13px sans-serif";ctx.fillStyle="#E0B45C";ctx.textAlign="center";
      ctx.fillText("❗",sx+16,sy+2+Math.sin(Date.now()/250)*2);ctx.textAlign="start";}
    else drawEmote(n,sx,sy);
  });
  PEERS.forEach(p=>{
    if(p.w!==world)return;
    const sx=p.x*TS-camX,sy=p.y*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    drawPerson(ctx,sx,sy,p.look||look,{dir:p.dir||"down"});
    ctx.font="600 8px monospace";ctx.textAlign="center";
    ctx.fillStyle="rgba(15,12,20,.75)";ctx.fillText(String(p.name||"").slice(0,12),sx+16.7,sy-1.3);
    ctx.fillStyle="#EDE9F5";ctx.fillText(String(p.name||"").slice(0,12),sx+16,sy-2);
    ctx.textAlign="start";
  });
  if(world==="hq")drawDog(ctx,DOG.fx*TS-camX,DOG.fy*TS-camY);
  if(world==="lc")drawCat(ctx,CAT.fx*TS-camX,CAT.fy*TS-camY);
  if(world==="st"){drawPigeon(ctx,PIG.fx*TS-camX,PIG.fy*TS-camY);drawLoro(ctx,LORO.x*TS-camX,LORO.y*TS-camY);}
  CRIT.forEach(cr=>{
    if(cr.world!==world)return;
    const sx=cr.fx*TS-camX,sy=cr.fy*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    if(cr.kind==="butterfly")drawButterfly(ctx,cr,sx,sy);
    else if(cr.kind==="colibri")drawColibri(ctx,cr,sx,sy);
    else if(cr.kind==="gato")drawGato(ctx,cr,sx,sy);
    else if(cr.kind==="beagle")drawBeagle(ctx,cr,sx,sy);
  });
  if(BALL&&BALL.world===world)drawBall(ctx,BALL.fx*TS-camX,BALL.fy*TS-camY,BALL.phase,BALL.t);
  drawPerson(ctx,fx*TS-camX,fy*TS-camY,look,{dir,bob:moving?Math.sin(bob)*2:0,moving});
  drawAmbient(w,camX,camY);
  drawDaylight(w,camX,camY);
}
/* wave-2 lighting: the world knows what time it is. Sunset theme keeps golden hour
   always; otherwise the device clock sets the mood — cool night wash with warm light
   spilling from doors and storefronts, a soft amber edge at dusk/dawn. Alpha stays
   ≤0.22 so themes remain comfortable and the ❗ markers stay readable. */
function drawDaylight(w,camX,camY){
  const dnow=new Date(),hr=dnow.getHours()+dnow.getMinutes()/60;
  const night=hr>=20.5||hr<6,edge=!night&&(hr>=18||hr<8);
  let wash=null;
  if(themeName==="sunset")wash="rgba(255,150,60,.10)";
  else if(night)wash="rgba(28,38,92,.20)";
  else if(edge)wash="rgba(255,150,60,.07)";
  if(!wash)return;
  ctx.fillStyle=wash;ctx.fillRect(0,0,VW,VH);
  if(night){ /* doors and storefronts spill warm light onto the pavement */
    const x0=Math.floor(camX/TS),y0=Math.floor(camY/TS);
    for(let y=y0;y<=Math.min(w.H-1,y0+9);y++)for(let x=x0;x<=Math.min(w.W-1,x0+11);x++){
      const ch=w.rows[y][x];
      if(!(DOORSET.has(ch)||ch==="Q"||ch==="Z"))continue;
      const sx=x*TS-camX,sy=y*TS-camY;
      const g2=ctx.createRadialGradient(sx+16,sy+30,2,sx+16,sy+30,22);
      g2.addColorStop(0,"rgba(255,214,130,.22)");g2.addColorStop(1,"rgba(255,214,130,0)");
      ctx.fillStyle=g2;ctx.fillRect(sx-8,sy+12,TS+16,TS+8);
    }
  }
}
/* ambient layer: a handful of drifting theme particles — fairy motes, forest petals,
   sunset fireflies. World-anchored so they parallax with the camera; ~14 points/frame. */
function drawAmbient(w,camX,camY){
  const kind=themeName==="fairy"?"mote":themeName==="forest"?"leaf":themeName==="sunset"?"fly":null;
  if(!kind)return;
  const t2=Date.now()/1000,WP=w.W*TS,HP=w.H*TS;
  for(let i=0;i<14;i++){
    const sd=i*127.31+i*i*7.7;
    const x=((sd*53+t2*(kind==="leaf"?26:14)*(1+(i%3)*0.3))%WP+WP)%WP;
    const y=kind==="leaf"?((sd*31+t2*(20+(i%4)*8))%HP+HP)%HP
                         :(((sd*31)%HP+HP)%HP+Math.sin(t2*0.7+i)*14);
    const sx=x-camX,sy=y-camY;
    if(sx<-8||sy<-8||sx>VW+8||sy>VH+8)continue;
    const tw=0.5+0.5*Math.sin(t2*(kind==="fly"?2.1:1.4)+i*2.4);
    ctx.globalAlpha=kind==="fly"?0.25+0.55*tw:0.2+0.4*tw;
    if(kind==="mote"){ctx.fillStyle=i%3?"#D9BFFF":"#FFF3B8";
      ctx.beginPath();ctx.arc(sx,sy,1.2+tw*0.9,0,7);ctx.fill();}
    else if(kind==="leaf"){ctx.fillStyle=i%4===0?"#D77FA8":"#5FA86A";
      ctx.save();ctx.translate(sx,sy);ctx.rotate(t2*1.5+i);ctx.fillRect(-2,-1.1,4,2.2);ctx.restore();}
    else{ctx.fillStyle="#FFD37A";ctx.beginPath();ctx.arc(sx,sy,1.4,0,7);ctx.fill();
      ctx.globalAlpha*=0.35;ctx.beginPath();ctx.arc(sx,sy,3.2,0,7);ctx.fill();}
  }
  ctx.globalAlpha=1;
}
/* ---------- the office Aussie ---------- */
const DOG={x:12,y:5,fx:12,fy:5,moving:false,mt:0,dx:0,dy:0,face:1,next:0,sit:false};
function dogFree(x,y){const w=WORLDS.hq;return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")&&!(world==="hq"&&x===px&&y===py);}
function dogUpdate(dt,now){
  if(world!=="hq"&&!DOG.moving){DOG.next=now+800;return;}
  if(DOG.moving){
    DOG.mt+=dt/430;
    if(DOG.mt>=1){DOG.moving=false;DOG.fx=DOG.x;DOG.fy=DOG.y;}
    else{DOG.fx=DOG.x-DOG.dx*(1-DOG.mt);DOG.fy=DOG.y-DOG.dy*(1-DOG.mt);}
    return;
  }
  if(now<DOG.next)return;
  const r=Math.random();
  if(r<0.35){DOG.sit=r<0.15;DOG.next=now+900+Math.random()*2200;return;}
  DOG.sit=false;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>dogFree(DOG.x+d[0],DOG.y+d[1]));
  if(!dirs.length){DOG.next=now+1200;return;}
  const d=dirs[Math.floor(Math.random()*dirs.length)];
  DOG.dx=d[0];DOG.dy=d[1];if(d[0])DOG.face=d[0];
  DOG.x+=d[0];DOG.y+=d[1];DOG.moving=true;DOG.mt=0;
  DOG.next=now+600+Math.random()*1800;
  if(Math.abs(DOG.x-px)+Math.abs(DOG.y-py)===1&&Math.random()<0.35&&Date.now()-lastBump>2500){
    lastBump=Date.now();const L=T().dog;toast(L[Math.floor(Math.random()*L.length)],1800);}
}
function drawDog(g,sx,sy){
  const cx=sx+16,wob=DOG.moving?Math.sin(Date.now()/90)*0.8:0;
  g.save();g.translate(cx,0);g.scale(DOG.face,1);g.translate(-cx,0);
  g.fillStyle="rgba(0,0,0,.18)";g.beginPath();g.ellipse(cx,sy+27,8,3,0,0,7);g.fill();
  g.fillStyle="#4C4F58";
  g.fillRect(cx-7,sy+22+wob,2.4,4.5);g.fillRect(cx-2.5,sy+22-wob,2.4,4.5);
  g.fillRect(cx+1.5,sy+22+wob,2.4,4.5);g.fillRect(cx+5,sy+22-wob,2.4,4.5);
  g.fillStyle="#7B7E8A";g.beginPath();g.roundRect(cx-8.5,sy+15,16,9,4.5);g.fill();
  g.fillStyle="#4C4F58";g.beginPath();g.arc(cx-3,sy+18,2.4,0,7);g.fill();
  g.beginPath();g.arc(cx+3.4,sy+20.6,1.9,0,7);g.fill();
  g.fillStyle="#EDEDE8";g.beginPath();g.roundRect(cx+3.6,sy+16.4,4.4,7.2,2.2);g.fill();
  /* bobbed tail — small, always wagging, as requested by management */
  g.fillStyle="#7B7E8A";
  g.beginPath();g.ellipse(cx-9.6,sy+16.5+Math.sin(Date.now()/110)*1.4,2.3,1.7,-0.5,0,7);g.fill();
  if(DOG.sit){g.fillStyle="#7B7E8A";g.beginPath();g.roundRect(cx-9.5,sy+18,7,7,3);g.fill();}
  /* Xochi's wardrobe: cape over the back, bandana at the neck (collar comes after the head) */
  if(wear.cape){g.fillStyle=wear.cape;g.beginPath();g.roundRect(cx-7.8,sy+13.9,10,6.6,2.6);g.fill();
    g.fillStyle="rgba(255,255,255,.28)";g.fillRect(cx-7.8,sy+14.8,10,1);}
  if(wear.bandana){g.fillStyle=wear.bandana;g.beginPath();g.moveTo(cx+3.4,sy+15.6);g.lineTo(cx+10.4,sy+15.6);g.lineTo(cx+7,sy+20.2);g.closePath();g.fill();}
  g.fillStyle="#6E7280";g.beginPath();g.arc(cx+7.5,sy+13.5,4.6,0,7);g.fill();
  if(wear.collar){g.fillStyle=wear.collar;g.fillRect(cx+3.2,sy+16.5,6.2,1.8);
    g.fillStyle="#E0B45C";g.beginPath();g.arc(cx+6.3,sy+19.2,1.05,0,7);g.fill();}
  g.fillStyle="#4C4F58";
  g.beginPath();g.moveTo(cx+4.4,sy+10.6);g.lineTo(cx+6.4,sy+7.4);g.lineTo(cx+8,sy+10.2);g.closePath();g.fill();
  g.beginPath();g.moveTo(cx+8.6,sy+10);g.lineTo(cx+10.8,sy+7.6);g.lineTo(cx+11.6,sy+10.8);g.closePath();g.fill();
  g.fillStyle="#B5773A";g.beginPath();g.arc(cx+10.2,sy+15.2,1.7,0,7);g.fill();
  g.fillStyle="#EDEDE8";g.beginPath();g.arc(cx+11,sy+14.2,1.9,0,7);g.fill();
  g.fillStyle="#26202B";g.beginPath();g.arc(cx+12.1,sy+13.8,0.9,0,7);g.fill();
  g.fillRect(cx+8.2,sy+12.2,1.2,1.2);
  g.restore();
}
/* ---------- Canela, La Cocina's cat ---------- */
const CAT={x:16,y:9,fx:16,fy:9,moving:false,mt:0,dx:0,dy:0,face:1,next:0,sit:true};
function catFree(x,y){const w=WORLDS.lc;return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")&&!(world==="lc"&&x===px&&y===py);}
function catUpdate(dt,now){
  if(CAT.moving){CAT.mt+=dt/520;
    if(CAT.mt>=1){CAT.moving=false;CAT.fx=CAT.x;CAT.fy=CAT.y;}
    else{CAT.fx=CAT.x-CAT.dx*(1-CAT.mt);CAT.fy=CAT.y-CAT.dy*(1-CAT.mt);}return;}
  if(world!=="lc"){CAT.next=now+1000;return;}
  if(now<CAT.next)return;
  const r=Math.random();
  if(r<0.55){CAT.sit=r<0.4;CAT.next=now+1500+Math.random()*3500;return;}
  CAT.sit=false;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>catFree(CAT.x+d[0],CAT.y+d[1]));
  if(!dirs.length){CAT.next=now+1500;return;}
  const d=dirs[Math.floor(Math.random()*dirs.length)];
  CAT.dx=d[0];CAT.dy=d[1];if(d[0])CAT.face=d[0];
  CAT.x+=d[0];CAT.y+=d[1];CAT.moving=true;CAT.mt=0;
  CAT.next=now+900+Math.random()*2600;
  if(Math.abs(CAT.x-px)+Math.abs(CAT.y-py)===1&&Math.random()<0.3&&Date.now()-lastBump>2500){
    lastBump=Date.now();const L=T().cat;toast(L[Math.floor(Math.random()*L.length)],1800);}
}
function drawCat(g,sx,sy){
  const cx=sx+16,sw=Math.sin(Date.now()/300);
  g.save();g.translate(cx,0);g.scale(CAT.face,1);g.translate(-cx,0);
  g.fillStyle="rgba(0,0,0,.15)";g.beginPath();g.ellipse(cx,sy+27,6.5,2.6,0,0,7);g.fill();
  g.strokeStyle="#C97F3F";g.lineWidth=2.6;g.lineCap="round";
  g.beginPath();g.moveTo(cx-6.5,sy+21);g.quadraticCurveTo(cx-11,sy+18+sw*2,cx-9.5,sy+13+sw*3);g.stroke();
  g.fillStyle="#D98E4A";g.beginPath();g.roundRect(cx-7,sy+18,12.5,7.5,3.8);g.fill();
  g.fillStyle="#B96F31";g.fillRect(cx-4.5,sy+18.5,1.8,6);g.fillRect(cx-1,sy+18.5,1.8,6);
  if(!CAT.sit){g.fillStyle="#C97F3F";g.fillRect(cx-5.5,sy+24.5,2,3);g.fillRect(cx+2.5,sy+24.5,2,3);}
  if(wearCat.bandana){g.fillStyle=wearCat.bandana; /* neckerchief tucks behind the head */
    g.beginPath();g.moveTo(cx+2.2,sy+18.8);g.lineTo(cx+9.2,sy+18.8);g.lineTo(cx+5.7,sy+22.8);g.closePath();g.fill();}
  g.fillStyle="#D98E4A";g.beginPath();g.arc(cx+6,sy+17.5,4.2,0,7);g.fill();
  g.beginPath();g.moveTo(cx+3.2,sy+15);g.lineTo(cx+4.2,sy+11.6);g.lineTo(cx+6,sy+14);g.closePath();g.fill();
  g.beginPath();g.moveTo(cx+6.6,sy+13.8);g.lineTo(cx+8.6,sy+11.8);g.lineTo(cx+9,sy+15);g.closePath();g.fill();
  g.fillStyle="#F1E3CE";g.beginPath();g.arc(cx+7.3,sy+19.4,2,0,7);g.fill();
  g.fillStyle="#26202B";
  if(CAT.sit){g.fillRect(cx+5.2,sy+17,1.8,0.7);g.fillRect(cx+8,sy+17,1.8,0.7);}
  else{g.fillRect(cx+5.4,sy+16.6,1.1,1.1);g.fillRect(cx+8,sy+16.6,1.1,1.1);}
  g.fillStyle="#C4586B";g.fillRect(cx+9.2,sy+18,1.1,0.9);
  if(wearCat.collar){g.fillStyle=wearCat.collar;g.fillRect(cx+2.8,sy+20.6,5.2,1.4);
    g.fillStyle="#E0B45C";g.beginPath();g.arc(cx+5.4,sy+22.5,0.9,0,7);g.fill();}
  g.restore();
}
/* ---------- Paloma the pigeon (street) & Lorenzo the parrot (perched on the fence) ---------- */
const PIG={x:4,y:1,fx:4,fy:1,moving:false,mt:0,dx:0,dy:0,face:1,next:0,peck:false};
function pigFree(x,y){const w=WORLDS.st;return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")&&!(world==="st"&&x===px&&y===py);}
function pigUpdate(dt,now){
  if(PIG.moving){PIG.mt+=dt/180;
    if(PIG.mt>=1){PIG.moving=false;PIG.fx=PIG.x;PIG.fy=PIG.y;}
    else{PIG.fx=PIG.x-PIG.dx*(1-PIG.mt);PIG.fy=PIG.y-PIG.dy*(1-PIG.mt);}return;}
  if(world!=="st"){PIG.next=now+1000;return;}
  if(now<PIG.next)return;
  const r=Math.random();
  if(r<0.5){PIG.peck=r<0.3;PIG.next=now+500+Math.random()*1400;return;}
  PIG.peck=false;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>pigFree(PIG.x+d[0],PIG.y+d[1]));
  if(!dirs.length){PIG.next=now+900;return;}
  const d=dirs[Math.floor(Math.random()*dirs.length)];
  PIG.dx=d[0];PIG.dy=d[1];if(d[0])PIG.face=d[0];
  PIG.x+=d[0];PIG.y+=d[1];PIG.moving=true;PIG.mt=0;
  PIG.next=now+300+Math.random()*1200;
  if(Math.abs(PIG.x-px)+Math.abs(PIG.y-py)===1&&Math.random()<0.25&&Date.now()-lastBump>3000){
    lastBump=Date.now();const L=T().pigeon;toast(L[Math.floor(Math.random()*L.length)],1700);}
}
function drawPigeon(g,sx,sy){
  const cx=sx+16,pk=PIG.peck?2.2:0;
  g.save();g.translate(cx,0);g.scale(PIG.face,1);g.translate(-cx,0);
  g.fillStyle="rgba(0,0,0,.12)";g.beginPath();g.ellipse(cx,sy+27,4.5,1.8,0,0,7);g.fill();
  g.fillStyle="#E0662B";g.fillRect(cx-1.5,sy+24.5,1,2.5);g.fillRect(cx+1,sy+24.5,1,2.5);
  g.fillStyle="#8B8F98";g.beginPath();g.ellipse(cx,sy+21.5,4.6,3.4,0,0,7);g.fill();
  g.fillStyle="#767A84";g.beginPath();g.ellipse(cx-1.5,sy+21,3,2.2,-.4,0,7);g.fill();
  g.fillStyle="#5E8F6E";g.beginPath();g.arc(cx+3.6,sy+18.6+pk,2.2,0,7);g.fill();
  g.fillStyle="#E0B45C";g.fillRect(cx+5.4,sy+18.2+pk,1.8,0.9);
  g.fillStyle="#26202B";g.fillRect(cx+3.9,sy+17.8+pk,0.9,0.9);
  g.restore();
}
const LORO={x:17,y:5,next:0};
function loroTick(now){
  if(world!=="st")return;
  if(now<LORO.next)return;LORO.next=now+2000;
  if(Math.abs(LORO.x-px)+Math.abs(LORO.y-py)<=2&&Math.random()<0.45&&Date.now()-lastBump>2600){
    lastBump=Date.now();const L=T().loro;toast("🦜 "+L[Math.floor(Math.random()*L.length)],2000);}
}
function drawLoro(g,sx,sy){
  const bob=Math.sin(Date.now()/280)*1.1;
  g.fillStyle="#2F7D3E";g.beginPath();g.ellipse(sx+16,sy+10+bob*0.4,4,5.2,0,0,7);g.fill();
  g.fillStyle="#2C5FA8";g.fillRect(sx+14.6,sy+14,2.8,9);
  g.fillStyle="#C0392B";g.beginPath();g.arc(sx+16,sy+5.2+bob,2.8,0,7);g.fill();
  g.fillStyle="#F5D34C";g.beginPath();g.moveTo(sx+18.4,sy+5+bob);g.lineTo(sx+21,sy+6+bob);g.lineTo(sx+18.4,sy+7+bob);g.closePath();g.fill();
  g.fillStyle="#26202B";g.fillRect(sx+16.6,sy+4.4+bob,1,1);
  g.fillStyle="#F1E3CE";g.beginPath();g.ellipse(sx+15.2,sy+9.4+bob*0.4,1.6,2.4,0,0,7);g.fill();
}
/* ---------- ambient critters (IDEAS §5: critters as data) ----------
   The content pack declares spawns in CRITTERS [{kind,world,x,y,c}]; the engine owns
   the kinds. Critters wander a small radius around home, never block the hero, and
   the street cat is pettable via the same button as the named animals. */
const CRIT=(typeof CRITTERS!=="undefined"?CRITTERS:[]).map(c=>({...c,fx:c.x,fy:c.y,moving:false,mt:0,dx:0,dy:0,face:1,next:0,sit:false,home:[c.x,c.y]}));
function critFree(cr,x,y){const w=WORLDS[cr.world];
  return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")
    &&!(world===cr.world&&x===px&&y===py)
    &&Math.abs(x-cr.home[0])+Math.abs(y-cr.home[1])<=4;}
function critUpdate(dt,now){CRIT.forEach(cr=>{
  if(cr.moving){cr.mt+=dt/(cr.kind==="gato"?520:cr.kind==="butterfly"?300:160);
    if(cr.mt>=1){cr.moving=false;cr.fx=cr.x;cr.fy=cr.y;}
    else{cr.fx=cr.x-cr.dx*(1-cr.mt);cr.fy=cr.y-cr.dy*(1-cr.mt);}return;}
  if(cr.task){if(world===cr.world)beagleStep(cr,now);
    else{cr.task=null;if(BALL&&BALL.dog===cr)BALL=null;}return;}
  if(world!==cr.world){cr.next=now+1200;return;}
  if(now<cr.next)return;
  if(cr.kind==="beagle"&&Math.random()<0.018){dogWhim(cr,now);return;}
  const r=Math.random(),idle=cr.kind==="gato"?0.55:0.3;
  if(r<idle){cr.sit=r<idle*0.7;cr.next=now+(cr.kind==="gato"?1500+Math.random()*3500:400+Math.random()*900);return;}
  cr.sit=false;
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(d=>critFree(cr,cr.x+d[0],cr.y+d[1]));
  if(!dirs.length){cr.next=now+900;return;}
  const d=dirs[Math.floor(Math.random()*dirs.length)];
  cr.dx=d[0];cr.dy=d[1];if(d[0])cr.face=d[0];
  cr.x+=d[0];cr.y+=d[1];cr.moving=true;cr.mt=0;
  cr.next=now+(cr.kind==="gato"?900+Math.random()*2600:250+Math.random()*900);
});}
/* ---------- Sonny's program (IDEAS §11) ----------
   Any beagle gets a real life: a ball he fetches exactly 4 times in 7 (a shuffled
   cycle, so it feels like a dog and not a coin), a howl, a proper lie-down, holes,
   and — infrequently — the other thing, which fades on its own until the day the
   city hires janitors. All engine-generic: name a dog and the program is his. */
let BALL=null; /* one ball at a time; the city is not a ball pit */
const FETCH_ODDS=[1,1,1,1,0,0,0];
function fetchRoll(cr){ /* a fresh shuffled 7-cycle per dog — streaks stay dog-like */
  if(!cr.fseq||cr.fi>=7){cr.fseq=FETCH_ODDS.slice();
    for(let i=6;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cr.fseq[i],cr.fseq[j]]=[cr.fseq[j],cr.fseq[i]];}
    cr.fi=0;}
  return !!cr.fseq[cr.fi++];}
function taskFree(cr,x,y){const w=WORLDS[cr.world]; /* the home leash comes off on a job */
  return !(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N");}
function beagleStep(cr,now){
  if(cr.task.phase==="go"&&!BALL){cr.task=null;return;}
  const tgt=cr.task.phase==="go"?[BALL.tx,BALL.ty]:[px,py];
  const d=Math.abs(cr.x-tgt[0])+Math.abs(cr.y-tgt[1]);
  if(cr.task.phase==="go"&&d===0){BALL.phase="carried";BALL.dog=cr;cr.task.phase="return";return;}
  if(cr.task.phase==="return"&&d<=1){
    BALL=null;cr.task=null;cr.sit=true;cr.next=now+2400;cr.happyT=now+1800;
    const L=T().fetchYes||[];if(L.length)toast("🎾 "+L[Math.floor(Math.random()*L.length)],2600);
    return;}
  cr.task.steps=(cr.task.steps||0)+1;
  if(cr.task.steps>40){ /* wedged somewhere — a dog knows when to let go */
    cr.task=null;if(BALL&&BALL.phase!=="carried")BALL.until=Date.now()+4000;else BALL=null;return;}
  const dirs=[[1,0],[-1,0],[0,1],[0,-1]].filter(dd=>taskFree(cr,cr.x+dd[0],cr.y+dd[1]))
    .sort((a,b)=>(Math.abs(cr.x+a[0]-tgt[0])+Math.abs(cr.y+a[1]-tgt[1]))
               -(Math.abs(cr.x+b[0]-tgt[0])+Math.abs(cr.y+b[1]-tgt[1])));
  if(!dirs.length){cr.task=null;if(BALL&&BALL.phase!=="carried")BALL.until=Date.now()+4000;return;}
  const dd=dirs[0];
  cr.dx=dd[0];cr.dy=dd[1];if(dd[0])cr.face=dd[0];
  cr.x+=dd[0];cr.y+=dd[1];cr.moving=true;cr.mt=0;
}
function dogWhim(cr,now){ /* his own clock: mostly naps, sometimes opinions */
  const r=Math.random();
  if(r<0.40){cr.layT=now+3800+Math.random()*3200;cr.sit=false;cr.next=cr.layT;}
  else if(r<0.70){cr.howlT=now+1900;cr.next=now+2600;
    try{musChirp();}catch(e){}
    if(Math.random()<0.5)toast("🐶 "+(T().howl||"AWOOOOO…"),1800);}
  else if(r<0.95){cr.digT=now+1700;cr.next=now+2400;
    const hx=cr.x,hy=cr.y,hw=cr.world;
    setTimeout(()=>DECALS.push({world:hw,x:hx,y:hy,kind:"hole",until:Date.now()+34000}),1400);}
  else{DECALS.push({world:cr.world,x:cr.x,y:cr.y,kind:"poop",until:Date.now()+45000});cr.next=now+3000;}
}
function ballUpdate(dt,now){
  if(!BALL)return;
  if(BALL.world!==world&&BALL.phase!=="carried"){BALL=null;return;} /* you left; the ball stays a memory */
  if(BALL.phase==="fly"){BALL.t+=dt/480;
    if(BALL.t>=1){BALL.t=1;BALL.fx=BALL.tx;BALL.fy=BALL.ty;BALL.phase="ground";
      const dog=BALL.dog;
      if(dog&&dog.world===world&&!dog.task){
        if(fetchRoll(dog)){dog.task={type:"fetch",phase:"go"};dog.sit=false;dog.layT=0;dog.next=0;}
        else{dog.sit=true;dog.face=Math.sign(BALL.tx-dog.x)||dog.face;dog.next=now+2600;
          BALL.until=Date.now()+6000;
          const L=T().fetchNo||[];if(L.length)toast("🐶 "+L[Math.floor(Math.random()*L.length)],2600);}}
      else BALL.until=Date.now()+6000;}
    else{BALL.fx=BALL.sx+(BALL.tx-BALL.sx)*BALL.t;BALL.fy=BALL.sy+(BALL.ty-BALL.sy)*BALL.t;}}
  else if(BALL.phase==="ground"&&BALL.until&&Date.now()>BALL.until)BALL=null;
  else if(BALL.phase==="carried"&&BALL.dog){BALL.fx=BALL.dog.fx+0.28*BALL.dog.face;BALL.fy=BALL.dog.fy-0.12;}
}
function drawBall(g,sx,sy,phase,t){
  const arc=phase==="fly"?Math.sin(Math.PI*Math.min(1,t))*16:0;
  const cx=sx+16,cy=sy+20-arc;
  if(phase!=="carried"){g.fillStyle="rgba(0,0,0,.15)";g.beginPath();g.ellipse(cx,sy+24,3.4,1.4,0,0,7);g.fill();}
  g.fillStyle="#CBE04A";g.beginPath();g.arc(cx,cy,3.4,0,7);g.fill();
  g.strokeStyle="#F4F1EA";g.lineWidth=0.9;
  g.beginPath();g.arc(cx-1.4,cy,3.1,-1.1,1.1);g.stroke();
  g.beginPath();g.arc(cx+1.4,cy,3.1,Math.PI-1.1,Math.PI+1.1);g.stroke();
}
$("ball").addEventListener("click",()=>{
  if(BALL||petTarget!=="beagle"||!petCrit||petCrit.task)return;
  const w=CW(),opts=[];
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    const d=Math.abs(x-px)+Math.abs(y-py);
    if(d>=2&&d<=4&&!SOLID.has(w.grid[y][x])&&w.grid[y][x]!=="N")opts.push([x,y]);}
  if(!opts.length){toast(T().ballNoRoom||"…",1800);return;}
  const [tx,ty]=opts[Math.floor(Math.random()*opts.length)];
  BALL={world,sx:px,sy:py,fx:px,fy:py,tx,ty,t:0,phase:"fly",dog:petCrit};
  $("ball").hidden=true;
});
function drawButterfly(g,cr,sx,sy){
  const t2=Date.now(),fl=Math.abs(Math.sin(t2/90)),bobY=Math.sin(t2/300+cr.home[0])*2.5;
  const cx=sx+16,cy=sy+13+bobY;
  g.save();g.translate(cx,0);g.scale(cr.face,1);g.translate(-cx,0);
  g.fillStyle=cr.c;
  g.beginPath();g.ellipse(cx-2.6,cy-1.5,3.1*fl+0.6,2.6,-.5,0,7);g.fill();
  g.beginPath();g.ellipse(cx+2.6,cy-1.5,3.1*fl+0.6,2.6,.5,0,7);g.fill();
  g.globalAlpha=.75;
  g.beginPath();g.ellipse(cx-2.2,cy+1.6,2.4*fl+0.5,2,-.4,0,7);g.fill();
  g.beginPath();g.ellipse(cx+2.2,cy+1.6,2.4*fl+0.5,2,.4,0,7);g.fill();
  g.globalAlpha=1;
  g.fillStyle="#26202B";g.fillRect(cx-0.7,cy-3,1.4,6.5);
  g.restore();
}
function drawColibri(g,cr,sx,sy){
  const t2=Date.now(),hov=Math.sin(t2/160)*1.6,wg=Math.abs(Math.sin(t2/55));
  const cx=sx+16,cy=sy+12+hov;
  g.save();g.translate(cx,0);g.scale(cr.face,1);g.translate(-cx,0);
  g.globalAlpha=.45;g.fillStyle="#9CB8AE"; /* wing blur */
  g.beginPath();g.ellipse(cx-1,cy-3,4.5*wg+1,2,-.9,0,7);g.fill();
  g.globalAlpha=1;
  g.fillStyle=cr.c;g.beginPath();g.ellipse(cx,cy,3.4,2.4,-.3,0,7);g.fill();
  g.fillStyle="#2C5FA8";g.beginPath();g.moveTo(cx-3,cy+1);g.lineTo(cx-6.5,cy+3.5);g.lineTo(cx-3.5,cy+2.6);g.closePath();g.fill();
  g.fillStyle="#C4586B";g.beginPath();g.arc(cx+3,cy-1.4,1.7,0,7);g.fill();
  g.fillStyle="#26202B";g.fillRect(cx+4.4,cy-1.8,4.4,0.8); /* the beak */
  g.fillRect(cx+3.2,cy-2.1,0.8,0.8);
  g.restore();
}
function drawBeagle(g,cr,sx,sy){ /* a lemon beagle: white coat, lemon saddle, floppy ears, working tail */
  const nw=performance.now(),lay=cr.layT>nw,howl=cr.howlT>nw,dig=cr.digT>nw,happy=cr.happyT>nw;
  const cx=sx+16,wag=Math.sin(Date.now()/(happy?70:130))*(happy?3.4:2.4),lemon="#E8C46A",white="#F6F2E8";
  const dy=lay?3:0,hy=howl?-3:0;
  g.save();g.translate(cx,0);g.scale(cr.face,1);g.translate(-cx,0);
  g.fillStyle="rgba(0,0,0,.15)";g.beginPath();g.ellipse(cx,sy+27,7,2.8,0,0,7);g.fill();
  g.strokeStyle=white;g.lineWidth=2.4;g.lineCap="round"; /* tail, always going (slower when resting) */
  const wg=lay?wag*0.4:wag;
  g.beginPath();g.moveTo(cx-7,sy+19.5+dy);g.quadraticCurveTo(cx-11,sy+15+dy+wg*0.5,cx-10+wg,sy+11+dy);g.stroke();
  g.fillStyle=white;g.beginPath();g.roundRect(cx-7.5,sy+17+dy,14,8,4);g.fill();
  g.fillStyle=lemon;g.beginPath();g.roundRect(cx-5,sy+16.5+dy,8,4.5,3);g.fill(); /* saddle */
  g.fillStyle=white;
  if(!cr.sit&&!lay){g.fillRect(cx-6,sy+24.5,2.2,3.2);g.fillRect(cx+3,sy+24.5,2.2,3.2);}
  if(lay)g.fillRect(cx+2,sy+24.8,7.5,2.2); /* front legs stretched out, professionally */
  if(dig){ /* paws at the ground, dirt flying */
    g.fillRect(cx+7,sy+22+Math.sin(Date.now()/70)*2,3,4);
    g.fillStyle="#6E5638";[[13,17],[16,13],[14,21]].forEach((p,i)=>{
      g.fillRect(cx+p[0]+Math.sin(Date.now()/90+i*2)*2.5,sy+p[1],2,2);});
    g.fillStyle=white;}
  g.beginPath();g.arc(cx+6.5,sy+16+dy+hy,4.6,0,7);g.fill(); /* head */
  g.fillStyle=lemon; /* floppy ear */
  g.beginPath();g.roundRect(cx+2.2,sy+13.2+dy+hy,3.4,7.5,2);g.fill();
  g.fillStyle="#26202B";
  if(lay&&!howl)g.fillRect(cx+6.2,sy+15.2+dy,1.9,0.7); /* eyes closed — do not disturb */
  else g.fillRect(cx+6.8,sy+14.6+dy+hy,1.2,1.2); /* eye */
  if(howl)g.beginPath(),g.arc(cx+9.6,sy+13.4+dy+hy,1.3,0,7),g.fill(); /* nose to the sky */
  else g.beginPath(),g.arc(cx+10.6,sy+17.2+dy,1.3,0,7),g.fill(); /* nose */
  g.restore(); /* text outside the mirror so it never flips */
  g.textAlign="center";
  if(howl){g.fillStyle="#8B6FC8";g.font="9px serif";
    g.fillText("♪",cx+3,sy+5+Math.sin(Date.now()/200)*2);}
  if(happy){g.fillStyle="#C4586B";g.font="8px serif";g.fillText("❤",cx-5,sy+9);}
  g.textAlign="start";
}
function drawGato(g,cr,sx,sy){ /* the street cat: Canela's silhouette, alley palette, no collar — yet */
  const cx=sx+16,sw=Math.sin(Date.now()/300+7);
  g.save();g.translate(cx,0);g.scale(cr.face,1);g.translate(-cx,0);
  g.fillStyle="rgba(0,0,0,.15)";g.beginPath();g.ellipse(cx,sy+27,6.5,2.6,0,0,7);g.fill();
  g.strokeStyle="#6E7278";g.lineWidth=2.6;g.lineCap="round";
  g.beginPath();g.moveTo(cx-6.5,sy+21);g.quadraticCurveTo(cx-11,sy+18+sw*2,cx-9.5,sy+13+sw*3);g.stroke();
  g.fillStyle="#8B8F98";g.beginPath();g.roundRect(cx-7,sy+18,12.5,7.5,3.8);g.fill();
  g.fillStyle="#6E7278";g.fillRect(cx-4.5,sy+18.5,1.8,6);g.fillRect(cx-1,sy+18.5,1.8,6);
  if(!cr.sit){g.fillStyle="#7B7F88";g.fillRect(cx-5.5,sy+24.5,2,3);g.fillRect(cx+2.5,sy+24.5,2,3);}
  g.fillStyle="#8B8F98";g.beginPath();g.arc(cx+6,sy+17.5,4.2,0,7);g.fill();
  g.beginPath();g.moveTo(cx+3.2,sy+15);g.lineTo(cx+4.2,sy+11.6);g.lineTo(cx+6,sy+14);g.closePath();g.fill();
  g.beginPath();g.moveTo(cx+6.6,sy+13.8);g.lineTo(cx+8.6,sy+11.8);g.lineTo(cx+9,sy+15);g.closePath();g.fill();
  g.fillStyle="#D8DBE0";g.beginPath();g.arc(cx+7.3,sy+19.4,2,0,7);g.fill();
  g.fillStyle="#26202B";
  if(cr.sit){g.fillRect(cx+5.2,sy+17,1.8,0.7);g.fillRect(cx+8,sy+17,1.8,0.7);}
  else{g.fillRect(cx+5.4,sy+16.6,1.1,1.1);g.fillRect(cx+8,sy+16.6,1.1,1.1);}
  g.fillStyle="#C4586B";g.fillRect(cx+9.2,sy+18,1.1,0.9);
  g.restore();
}
function drawPerson(g,sx,sy,lk,o){
  o=o||{};const b=o.bob||o.idle||0,d=o.dir||"down",bh=b*0.5;
  g.fillStyle="rgba(0,0,0,.2)";g.beginPath();g.ellipse(sx+16,sy+28,8,3.5,0,0,7);g.fill();
  g.fillStyle=lk.outfit==="formal"?"#23262E":"#2E3547";
  g.fillRect(sx+11,sy+20+b,4,7);g.fillRect(sx+17,sy+20-(o.moving?b:0),4,7);
  g.fillStyle=lk.shirt;
  g.beginPath();g.roundRect(sx+9,sy+9+bh,14,13,4);g.fill();
  g.strokeStyle="rgba(15,12,20,.35)";g.lineWidth=.8;g.stroke();
  if(o.moving){ /* wave-1 walk cycle: arms swing opposite the legs */
    g.fillStyle=lk.shirt;
    g.beginPath();g.roundRect(sx+6.6,sy+11.5+bh+b*0.9,2.6,6.5,1.3);g.fill();
    g.beginPath();g.roundRect(sx+22.8,sy+11.5+bh-b*0.9,2.6,6.5,1.3);g.fill();
    g.strokeStyle="rgba(15,12,20,.3)";g.lineWidth=.7;
    g.beginPath();g.roundRect(sx+6.6,sy+11.5+bh+b*0.9,2.6,6.5,1.3);g.stroke();
    g.beginPath();g.roundRect(sx+22.8,sy+11.5+bh-b*0.9,2.6,6.5,1.3);g.stroke();
  }
  if(lk.outfit==="formal"){
    g.fillStyle="#F2F1EA";g.beginPath();g.moveTo(sx+13,sy+9+bh);g.lineTo(sx+19,sy+9+bh);g.lineTo(sx+16,sy+16+bh);g.closePath();g.fill();
    g.fillStyle="#8E2F3C";g.fillRect(sx+15.2,sy+10.5+bh,1.6,5.5);
  }
  g.fillStyle=lk.skin;g.beginPath();g.arc(sx+16,sy+5+bh,6.5,0,7);g.fill();
  g.strokeStyle="rgba(15,12,20,.3)";g.lineWidth=.8;g.stroke();
  const st=lk.style||"cap",hx=sx+16,hy=sy+5+bh;
  /* hair v3: clipped to the actual skull, so every style fits clean */
  const inHead=fn=>{g.save();g.beginPath();g.arc(hx,hy,6.5,0,7);g.clip();g.fillStyle=lk.hair;fn();g.restore();g.fillStyle=lk.hair;};
  g.fillStyle=lk.hair;
  const capFill=(h)=>{inHead(()=>{g.fillRect(hx-7,hy-8,14,h);
    g.beginPath();g.ellipse(hx,hy-8+h,7,1.3,0,0,Math.PI);g.fill();});}; /* soft hairline, no hard bar */
  if(st==="cap"){capFill(6.2);inHead(()=>{g.fillRect(hx-7,hy-3.2,2,4.4);g.fillRect(hx+5,hy-3.2,2,4.4);});}
  else if(st==="buzz"){g.globalAlpha=.9;capFill(4.6);g.globalAlpha=1;}
  else if(st==="long"){ /* v5: full mane behind the head, face windowed out */
    g.beginPath();g.roundRect(hx-8.6,hy-7.6,17.2,17.6,7);g.fill();
    g.strokeStyle="rgba(15,12,20,.3)";g.lineWidth=.8;g.stroke();
    g.fillStyle=lk.skin;g.beginPath();g.arc(hx,hy+0.4,5.7,0,7);g.fill();
    g.fillStyle=lk.hair;capFill(5.2);}
  else if(st==="curly"){ /* v5: dense curly wreath, ear to ear, with inner volume */
    for(let a=0;a<7;a++){const ang=Math.PI*(1.0+a/6);
      g.beginPath();g.arc(hx+6.3*Math.cos(ang),hy+6.0*Math.sin(ang),3.1,0,7);g.fill();}
    for(let a=0;a<5;a++){const ang=Math.PI*(1.08+a*0.21);
      g.beginPath();g.arc(hx+3.8*Math.cos(ang),hy-1.6+3.4*Math.sin(ang),2.6,0,7);g.fill();}
    g.strokeStyle="rgba(15,12,20,.22)";g.lineWidth=.7;
    g.beginPath();g.arc(hx,hy-1.2,7.2,Math.PI*1.02,-Math.PI*0.02);g.stroke();}
  else if(st==="spiky"){capFill(4.8);
    [[-4.4,-5.2],[-1.5,-6.6],[1.5,-6.6],[4.4,-5.2]].forEach(p=>{
      g.beginPath();g.moveTo(hx+p[0]-1.4,hy+p[1]+1.6);g.lineTo(hx+p[0],hy+p[1]-2.8);g.lineTo(hx+p[0]+1.4,hy+p[1]+1.6);g.closePath();g.fill();});}
  else if(st==="pony"){capFill(6.2);
    g.beginPath();g.arc(hx+5.6,hy-4.4,1.9,0,7);g.fill();
    g.beginPath();g.roundRect(hx+6.2,hy-4.2,2.6,9,1.3);g.fill();}
  else if(st==="afro"){
    g.beginPath();g.arc(hx-4,hy-4.6,4.4,0,7);g.fill();
    g.beginPath();g.arc(hx,hy-6.2,4.6,0,7);g.fill();
    g.beginPath();g.arc(hx+4,hy-4.6,4.4,0,7);g.fill();
    capFill(4.6);}
  else if(st==="mohawk"){ /* shaved sides, one jagged proud crest */
    g.globalAlpha=.3;capFill(3.2);g.globalAlpha=1;
    g.beginPath();g.moveTo(hx-2.3,hy-4.4);
    g.lineTo(hx-2.7,hy-9.2);g.lineTo(hx-1.2,hy-8.2);g.lineTo(hx-0.5,hy-12.8);
    g.lineTo(hx+0.9,hy-9.6);g.lineTo(hx+1.7,hy-12);g.lineTo(hx+2.7,hy-8.2);g.lineTo(hx+2.3,hy-4.4);
    g.closePath();g.fill();
    g.strokeStyle="rgba(15,12,20,.4)";g.lineWidth=.8;g.stroke();}
  else if(st==="edgar"){ /* the Edgar: dense straight fringe, crisp line — the bar is the point */
    inHead(()=>{g.fillRect(hx-7,hy-8,14,7.3);});
    g.globalAlpha=.35;inHead(()=>{g.fillRect(hx-7,hy-0.7,2.2,3.4);g.fillRect(hx+4.8,hy-0.7,2.2,3.4);});g.globalAlpha=1;}
  else if(st==="fade"){ /* taper fade: short top, sides melting away */
    capFill(4.4);
    g.globalAlpha=.5;inHead(()=>{g.fillRect(hx-7,hy-3.6,2.4,2.6);g.fillRect(hx+4.6,hy-3.6,2.4,2.6);});
    g.globalAlpha=.22;inHead(()=>{g.fillRect(hx-7,hy-1,2.4,2.6);g.fillRect(hx+4.6,hy-1,2.4,2.6);});g.globalAlpha=1;}
  else if(st==="mullet"){ /* v7: built like "long" — mane behind the head, collar-high in the center, party tails at the shoulders */
    g.beginPath();g.roundRect(hx-8.2,hy-6.8,16.4,12,6);g.fill();
    g.beginPath();
    g.moveTo(hx-8.2,hy+2);g.lineTo(hx-8.2,hy+9.5);g.lineTo(hx-6.4,hy+7);
    g.lineTo(hx-4.6,hy+10.5);g.lineTo(hx-3.2,hy+6.5);g.lineTo(hx+3.2,hy+6.5);
    g.lineTo(hx+4.6,hy+10.5);g.lineTo(hx+6.4,hy+7);g.lineTo(hx+8.2,hy+9.5);
    g.lineTo(hx+8.2,hy+2);g.closePath();g.fill();
    g.strokeStyle="rgba(15,12,20,.3)";g.lineWidth=.8;g.stroke();
    g.fillStyle=lk.skin;g.beginPath();g.arc(hx,hy+0.4,5.7,0,7);g.fill();
    g.fillStyle=lk.hair;capFill(4.8);}
  else if(st==="broccoli"){ /* fluffy high crown, clean sides */
    [[-3.4,-6.6],[0,-8],[3.4,-6.6],[-1.8,-5.2],[1.8,-5.2],[0,-5.8]].forEach(p=>{
      g.beginPath();g.arc(hx+p[0],hy+p[1],2.7,0,7);g.fill();});
    g.globalAlpha=.3;capFill(2.6);g.globalAlpha=1;}
  else if(st==="braids"){capFill(6.6);
    const seg=(x2,k)=>{g.fillStyle=lk.hair;g.beginPath();g.roundRect(x2,hy-0.6+k*3.1,3.2,3.5,1.6);g.fill();
      g.strokeStyle="rgba(15,12,20,.35)";g.lineWidth=.7;g.stroke();
      g.fillStyle="rgba(255,255,255,.14)";g.fillRect(x2+0.7,hy+0.1+k*3.1,1,1.4);};
    for(let k=0;k<3;k++){seg(hx-8.7+(k%2?0.9:0),k);seg(hx+5.5-(k%2?0.9:0),k);}
    g.fillStyle="#C0392B";
    g.beginPath();g.arc(hx-6.9,hy+9.7,1.25,0,7);g.fill();
    g.beginPath();g.arc(hx+6.9,hy+9.7,1.25,0,7);g.fill();
    g.fillStyle=lk.hair;}
  else if(st==="flat"){capFill(3.6);
    g.fillRect(hx-6.3,hy-11.6,12.6,6);
    g.fillRect(hx-6.9,hy-6.4,1.9,2.6);g.fillRect(hx+5,hy-6.4,1.9,2.6);}
  else if(st==="buns"){capFill(5.2);
    g.beginPath();g.arc(hx-5.4,hy-7.2,3,0,7);g.fill();
    g.beginPath();g.arc(hx+5.4,hy-7.2,3,0,7);g.fill();
    g.fillStyle="#C0392B";
    g.beginPath();g.arc(hx-5.4,hy-5,1,0,7);g.fill();
    g.beginPath();g.arc(hx+5.4,hy-5,1,0,7);g.fill();}
  /* bald: nothing at all */
  if(lk.hat==="hard"){ /* hard hat crew: safety first, hair second */
    g.fillStyle="#F2C230";g.beginPath();g.arc(hx,hy-0.4,6.9,Math.PI,0);g.closePath();g.fill();
    g.fillStyle="#D9A81C";g.fillRect(hx-8,hy-0.9,16,1.9);
    g.strokeStyle="rgba(15,12,20,.35)";g.lineWidth=.8;
    g.beginPath();g.arc(hx,hy-0.4,6.9,Math.PI,0);g.stroke();
  }
  const ex=d==="left"?-2:d==="right"?2:0, ey=d==="up"?-1:1;
  /* the occasional blink, offset per person so the crowd never blinks in unison */
  if(d!=="up"&&Math.floor(Date.now()/130+sx*0.7+sy)%37!==0){
    g.fillStyle="#26202B";g.fillRect(sx+13.5+ex,sy+4.5+ey+bh,1.6,1.6);g.fillRect(sx+17+ex,sy+4.5+ey+bh,1.6,1.6);}
}
/* ---------- movement ---------- */
const DIRS={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
function tryStep(){
  if(moving||!held)return;
  if(performance.now()<warpT)return;
  dir=held;const[dx,dy]=DIRS[held],nx=px+dx,ny=py+dy;
  if(isSolid(nx,ny)){
    const w=CW();
    const ch=(ny>=0&&ny<w.H&&nx>=0&&nx<w.W)?w.rows[ny][nx]:"#";
    const F=T().flavor;
    if(F[ch]&&Date.now()-lastBump>1800){lastBump=Date.now();
      toast(F[ch][Math.floor(Math.random()*F[ch].length)],2000);}
    return;
  }
  moving=true;mt=0;px=nx;py=ny;
}
let last=0;
function loop(ts){
  const dt=Math.min(50,ts-last);last=ts;
  if(moving){
    mt+=dt/240;bob+=dt/70;
    if(mt>=1){moving=false;fx=px;fy=py;
      const pch=CW().rows[py][px];
      if(ts>portalT&&PORTALS[world]&&PORTALS[world][pch]){const p=PORTALS[world][pch];
        world=p.to;px=fx=p.x;py=fy=p.y;held=null;dir=p.dir||"down";
        warpT=performance.now()+450;portalT=performance.now()+900;
        save();setWorldTag();toast(T().arrive[world],2200);}
      else if(pch==="Y"&&ts>portalT){portalT=performance.now()+900;held=null;openTravel();}
      else{save();checkTalk();tryStep();}
    }
    else{const[dx,dy]=DIRS[dir];fx=px-dx*(1-mt);fy=py-dy*(1-mt);}
  }else tryStep();
  dogUpdate(dt,ts);catUpdate(dt,ts);pigUpdate(dt,ts);loroTick(ts);critUpdate(dt,ts);ballUpdate(dt,ts);fredCheck();
  if(!$("world").hidden)draw();
  requestAnimationFrame(loop);
}
function checkTalk(){
  const n=CW().npcs.find(n=>Math.abs(n.x-px)+Math.abs(n.y-py)===1&&(pendingAt(n)!==undefined||n.chat));
  if(n){const qi=pendingAt(n),tb=$("talk");
    if(qi!==undefined){tb.textContent=`${T().talkPre}${npcName(n.npc).split(" ·")[0]} — “${AQ()[qi].title}”`;
      tb.dataset.qi=qi;delete tb.dataset.chatn;}
    else{tb.textContent=`${T().talkPre}${npcName(n.npc).split(" ·")[0]}`;
      tb.dataset.chatn=n.npc;delete tb.dataset.qi;}
    tb.hidden=false;}
  else $("talk").hidden=true;
}
/* controls */
document.querySelectorAll(".dpad button[data-d]").forEach(b=>{
  const on=e=>{e.preventDefault();held=b.dataset.d;};
  const off=e=>{e.preventDefault();if(held===b.dataset.d)held=null;};
  b.addEventListener("pointerdown",on);b.addEventListener("pointerup",off);
  b.addEventListener("pointercancel",off);b.addEventListener("pointerleave",off);
});
const KEYS={ArrowUp:"up",ArrowDown:"down",ArrowLeft:"left",ArrowRight:"right",w:"up",s:"down",a:"left",d:"right"};
window.addEventListener("keydown",e=>{if(!$("world").hidden&&KEYS[e.key]){held=KEYS[e.key];e.preventDefault();}
  if(e.key==="Enter"&&!$("talk").hidden&&!$("world").hidden)$("talk").click();});
window.addEventListener("keyup",e=>{if(KEYS[e.key]&&held===KEYS[e.key])held=null;});
$("talk").addEventListener("click",()=>{
  const tb=$("talk");
  if(tb.dataset.chatn){
    if(tb.dataset.chatn==="xochi"){openWardrobe();return;} /* post-quest, Xochi runs the fitting room */
    const L=chillLines(tb.dataset.chatn)||(T().chat||{})[tb.dataset.chatn]||[];
    if(L.length)toast("💬 "+L[Math.floor(Math.random()*L.length)],2800);return;}
  questStart(+tb.dataset.qi);});
let petTarget=null,petCrit=null;
function fredCheck(){ /* now the generic animal-interaction check: every creature is reachable and greetable */
  let tgt=null,label="";
  if(!$("world").hidden&&!moving){
    if(world==="hq"&&!DOG.moving&&Math.abs(DOG.x-px)+Math.abs(DOG.y-py)===1){tgt="fred";label=T().treatLb;}
    else if(world==="lc"&&!CAT.moving&&Math.abs(CAT.x-px)+Math.abs(CAT.y-py)===1){tgt="cat";label=T().petCat;}
    else if(world==="st"&&!PIG.moving&&Math.abs(PIG.x-px)+Math.abs(PIG.y-py)===1){tgt="pig";label=T().petPig;}
    else if(world==="st"&&Math.abs(LORO.x-px)+Math.abs(LORO.y-py)<=2){tgt="loro";label=T().petLoro;}
    else{ /* every critter is interactive — cats and dogs get petted, fliers get admired */
      const g2=CRIT.find(cr=>cr.world===world&&
        ((cr.kind==="gato"||cr.kind==="beagle")?(!cr.moving&&Math.abs(cr.x-px)+Math.abs(cr.y-py)===1)
                                               :Math.abs(cr.x-px)+Math.abs(cr.y-py)<=1));
      if(g2){tgt=g2.kind;petCrit=g2;
        label=g2.kind==="beagle"?"🐾 "+(g2.name||"🐶")
             :g2.kind==="gato"?T().petGato
             :g2.kind==="butterfly"?T().petFly:T().petColi;}}
  }
  petTarget=tgt;$("treat").hidden=!tgt;
  if(tgt)$("treat").textContent=label;
  const ballOK=tgt==="beagle"&&!BALL&&petCrit&&!petCrit.task;
  $("ball").hidden=!ballOK;
  if(ballOK)$("ball").textContent=T().ballLb;
}
$("treat").addEventListener("click",()=>{
  if(petTarget==="fred"){
    treats++;save();
    toast(T().fredHeart,1200);DOG.sit=true;DOG.next=performance.now()+2600;
    if(fredQ===0&&treats>=3){fredQ=1;save();setTimeout(()=>toast(T().fredUnlock,3800),1400);
      setTimeout(()=>toast(T().carePackToast,3600),1600);}
    else if(fredQ===1){fredQuestStart();}
    return;
  }
  if(petTarget==="cat"){CAT.sit=true;CAT.next=performance.now()+3200;
    const L=T().cat;toast("❤ "+L[Math.floor(Math.random()*L.length)],2000);}
  else if(petTarget==="pig"){PIG.peck=true;PIG.next=performance.now()+2200;
    const L=T().pigeon;toast("❤ "+L[Math.floor(Math.random()*L.length)],2000);}
  else if(petTarget==="loro"){
    const L=T().loro;toast("🦜 "+L[Math.floor(Math.random()*L.length)],2200);}
  else if(petTarget==="beagle"){ /* a treat: the tail achieves liftoff */
    const g2=petCrit;
    if(g2){g2.sit=true;g2.next=performance.now()+3200;g2.happyT=performance.now()+2200;g2.layT=0;}
    const L=(g2&&g2.egg&&EGGSAFE[g2.egg]&&Math.random()<0.4)?EGGSAFE[g2.egg].lines[lang]
           :(T().beagleTreat||T().gato);
    toast("🦴 "+L[Math.floor(Math.random()*L.length)],2400);}
  else if(petTarget==="gato"){
    const g2=petCrit;
    if(g2){g2.sit=true;g2.next=performance.now()+3200;}
    const L=(g2&&g2.egg&&EGGSAFE[g2.egg])?EGGSAFE[g2.egg].lines[lang]:T().gato;
    toast("❤ "+L[Math.floor(Math.random()*L.length)],2200);}
  else if(petTarget==="butterfly"||petTarget==="colibri"){
    const g2=petCrit;
    if(g2){g2.sit=true;g2.moving=false;g2.next=performance.now()+2600;} /* it pauses for you */
    const L=petTarget==="butterfly"?T().mariposa:T().colibri;
    toast((petTarget==="butterfly"?"🦋 ":"🌺 ")+L[Math.floor(Math.random()*L.length)],2200);}
});
/* ---------- quest overlay ---------- */
let wasFs=false;
function exitFsForCard(){wasFs=$("vp").classList.contains("fs");
  if(wasFs){$("vp").classList.remove("fs");document.body.classList.remove("noscroll");
    if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});setTimeout(sizeCanvas,60);}}
function restoreFs(){if(wasFs){$("vp").classList.add("fs");document.body.classList.add("noscroll");setTimeout(sizeCanvas,60);}}
let qFirst=false;
function questStart(qi){cur=qi;curQ=AQ()[qi];node=curQ.start;qLvl0=lvlIdx();runXP=0;qFirst=qa[qi]===undefined;exitFsForCard();$("world").hidden=true;$("card").hidden=false;held=null;nodeShow();}
function fredQuestStart(){cur=-1;curQ=FQ();node=curQ.start;qLvl0=lvlIdx();runXP=0;qFirst=qa[-1]===undefined;exitFsForCard();$("world").hidden=true;$("card").hidden=false;held=null;nodeShow();}
function nodeShow(){
  const q=curQ,t=q.nodes[node];
  $("qtag").textContent=`${T().quest}: ${q.title}${node!==q.start?T().followup:""}`;
  $("npcAv").textContent=NPCE[q.npc];$("npcName").textContent=npcName(q.npc);$("npcSay").textContent=t.say;
  $("cdxLb").textContent=T().codexLb;$("codex").textContent=t.codex;$("q").textContent=t.q;
  const box=$("choices");box.innerHTML="";
  const list=[...t.ch].sort(()=>Math.random()-0.5); /* shuffled every time — no more middle-answer tell */
  list.forEach(c=>{const b=document.createElement("button");b.textContent=c.t;
    b.addEventListener("click",()=>pick(c,b,{ch:list}));box.appendChild(b);});
  $("verdict").hidden=true;$("next").hidden=true;$("levelup").hidden=true;hud();
  window.scrollTo({top:0});
}
function pick(c,btn,t){
  if(c.next){[...$("choices").children].forEach(b=>b.disabled=true);btn.classList.add("right");
    /* a correct first-node call is still a decision — the report would be a lie without it */
    logDecision({r:"ok",concept:nodeConcept(),why:""},c);
    awardXP(10);hud();save();setTimeout(()=>{node=c.next;nodeShow();},550);return;}
  const o=c.out,before=qLvl0; /* level at quest START — a level crossed on a follow-up step still gets announced here */
  [...$("choices").children].forEach(b=>b.disabled=true);
  /* retries exist, so a miss explains itself but never reveals the right answer — the codex teaches, the shuffle re-tests */
  if(o.r==="ok")btn.classList.add("right");
  else btn.classList.add(o.r==="mid"?"midpick":"wrong");
  const xp0=xp;
  if(cur>=0)marks[cur]=(marks[cur]||0)+1;   /* the grade counts every attempt, always */
  if(o.r==="ok")awardXP(10);else if(o.r==="mid")awardXP(5);else{if(livesOn())hearts--;awardXP(0);}
  const gained=xp-xp0; /* the header claims only what this pick actually paid — retries after partial credit pay the difference */
  logDecision(o,c);
  const solved=o.r==="ok";
  const retry=!solved&&(!livesOn()||hearts>0)?`<p class="beat">${cur>=0?T().retryNote:T().retryNoteFred}</p>`:"";
  const v=$("verdict");
  v.className="verdict "+(o.r==="ok"?"ok":o.r==="mid"?"mid":"no");
  v.innerHTML=`<h2>${(o.r==="ok"?T().okH:o.r==="mid"?T().midH:T().badH)+(gained>0?` +${gained} XP`:"")}</h2><span class="concept">${o.concept}</span><p>${o.why}</p><p class="beat">${o.beat}</p>${retry}`;
  v.hidden=false;hud();
  if(o.r!=="bad"&&lvlIdx()!==before){$("levelup").textContent=T().lvlUp+lvlName();$("levelup").hidden=false;}
  if(cur>=0){
    if(solved){done.add(cur);
      if(cur===12||cur===13){applyObra();setTimeout(()=>toast(T().obraUp,2800),700);}}
    if(cur===15&&qFirst)setTimeout(()=>toast(T().wdUnlockToast,3400),700);}
  else if(solved&&node==="b"){fredQ=2;wear.bandana=wear.bandana||"#C0392B";setTimeout(()=>toast(T().fredDoneToast,3000),600);}
  save();
  $("next").textContent=(livesOn()&&hearts<=0)?T().nextDoom:(chDue()?T().nextEnd:T().nextBack);
  $("next").hidden=false;
}
$("next").addEventListener("click",()=>{
  if(chDue()){wasFs=false;finish(livesOn()&&hearts<=0);return;}
  $("card").hidden=true;$("world").hidden=false;restoreFs();checkTalk();
});
/* ---------- character creator ---------- */
const SWATCH={shirt:["#8B5CF6","#E0A430","#2AA47C","#C2543F","#3E8ED0","#B04A78"],
  skin:["#F1CDA9","#E5AC82","#C08356","#8C5A33"],
  hair:["#26202B","#7A4A22","#8E8E96","#C2543F"]};
function buildSwatches(){
  Object.entries(SWATCH).forEach(([part,colors])=>{
    const row=$("row"+part[0].toUpperCase()+part.slice(1));row.innerHTML="";
    colors.forEach(col=>{const b=document.createElement("button");
      b.className="sw";b.style.background=col;b.setAttribute("aria-label",part+" "+col);
      b.setAttribute("aria-pressed",look[part]===col?"true":"false");
      b.addEventListener("click",()=>{look[part]=col;
        [...row.children].forEach(x=>x.setAttribute("aria-pressed","false"));
        b.setAttribute("aria-pressed","true");pvDraw();});
      row.appendChild(b);});
  });
}
function buildOpts(rowId,list,key){
  const row=$(rowId);row.innerHTML="";
  list.forEach(([val,label])=>{const b=document.createElement("button");
    b.className="opt";b.textContent=label;
    b.setAttribute("aria-pressed",look[key]===val?"true":"false");
    b.addEventListener("click",()=>{look[key]=val;
      [...row.children].forEach(x=>x.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");pvDraw();});
    row.appendChild(b);});
}
function pvDraw(){const g=$("pv").getContext("2d");g.setTransform(1.6,0,0,1.6,5,22);
  g.clearRect(-6,-16,70,80);drawPerson(g,0,0,look,{dir:"down"});}
$("pvtog").addEventListener("click",()=>{const bx=$("pvbox");bx.classList.toggle("dark");
  $("pvtog").textContent=bx.classList.contains("dark")?"☀️":"🌙";});
function enterWorld(fresh){
  $("intro").hidden=true;$("creator").hidden=true;
  $("hud").hidden=false;$("xpbarwrap").hidden=false;$("world").hidden=false;
  sizeCanvas();applyCtl();hud();setWorldTag();checkTalk();
  if(fresh){toast(T().tut1,3000);
    setTimeout(()=>toast(T().tut2,3800),3300);}
}
document.querySelectorAll(".classes button").forEach(b=>b.addEventListener("click",()=>{
  cls=b.querySelector("b").textContent;look.shirt=SHIRTS[b.dataset.c]||look.shirt;
  $("intro").hidden=true;$("creator").hidden=false;
  buildSwatches();buildOpts("rowStyle",T().styles,"style");buildOpts("rowOutfit",T().outfits,"outfit");pvDraw();
}));
$("begin").addEventListener("click",()=>{
  heroName=($("heroname").value.trim()||"Rookie").slice(0,14);
  xp=0;hearts=startHearts();done=new Set();qa={};marks={};world="hq";px=fx=10;py=fy=11;dir="down";
  save();enterWorld(true);
  const eg=eggFor(heroName); /* a legendary name gets a nod once the tutorial clears */
  if(eg)setTimeout(()=>toast(EGGSAFE[eg].lines[lang][0],3600),7400);
});
/* ---------- start/end ---------- */
/* One curtain for every ending. `burnout` = the hearts ran out: the chapter closes
   where it stands and the unanswered quests stay unanswered — nothing is erased.
   A chapter that ended well is judged by hearts; the last one rolls real credits. */
function finish(burnout){
  $("card").hidden=true;$("world").hidden=true;
  const L=CHS(),i=Math.min(chSeen,L.length-1),last=i>=L.length-1;
  const t=T(),g=gradeOf(L[i]);   /* the grade picks the ending — hearts never did the work */
  $("endTitle").textContent=burnout?t.goTitle:`🏆 ${lvlName()}`;
  $("endScore").textContent=burnout?t.goScore(xp,done.size,AQ().length)
                           :livesOn()?t.endScore(xp,MAXXP,Math.max(0,hearts))
                           :t.endGrade(xp,MAXXP,t.grades[g-1]);
  const E=last?[t.mepi1,t.mepi2,t.mepi3]:[t.epi1,t.epi2,t.epi3];
  $("epi").textContent = burnout?(last?t.mgoEpi:t.goEpi) : g>=3?E[0] : g===2?E[1] : E[2];
  $("endGo").textContent=last?t.endStay:t.endGo;$("endGo").hidden=false;
  $("end").hidden=false;
}
/* Acknowledging an ending closes that chapter for good and starts the next one on
   Monday with three fresh hearts. After the last one you keep the city and wander it. */
$("endGo").addEventListener("click",()=>{
  const last=chSeen>=CHS().length-1;
  chSeen=Math.min(chSeen+1,CHS().length);hearts=startHearts();
  applyGrowth();
  if(!last){world="st";px=fx=6;py=fy=12;dir="down";}
  if(isSolid(px,py)){world="hq";px=fx=10;py=fy=11;}
  wasFs=false;
  save();$("end").hidden=true;$("world").hidden=false;setWorldTag();hud();checkTalk();
  toast(last?T().endStayToast:T().weekTwoToast,4000);
});
/* Wiping a city is never one tap. The story never sends you here — this is a tool. */
$("replay").addEventListener("click",()=>{
  if(!replayTimer){
    $("replay").textContent=T().replayArm;
    replayTimer=setTimeout(()=>{replayTimer=null;$("replay").textContent=T().replay;},4000);
    return;}
  clearTimeout(replayTimer);replayTimer=null;$("replay").textContent=T().replay;
  xp=0;hearts=startHearts();done=new Set();qa={};marks={};chSeen=0;world="hq";px=fx=10;py=fy=11;dir="down";
  applyGrowth();save();
  $("settings").hidden=true;$("end").hidden=true;$("card").hidden=true;$("world").hidden=false;
  setWorldTag();hud();checkTalk();
  toast(T().replayToast(heroName),2500);});
/* ---------- controls scheme ---------- */
let ctl="swipe";try{ctl=localStorage.getItem("mqctl")||"swipe";}catch(e){}
if(!["swipe","joy","pad"].includes(ctl))ctl="swipe";
function applyCtl(){
  $("joy").hidden=(ctl!=="joy");$("dpad").hidden=(ctl!=="pad");
  $("optSwipe").setAttribute("aria-pressed",ctl==="swipe"?"true":"false");
  $("optJoy").setAttribute("aria-pressed",ctl==="joy"?"true":"false");
  $("optPad").setAttribute("aria-pressed",ctl==="pad"?"true":"false");
  $("ctlHint").textContent=ctl==="swipe"?T().hintSwipe:(ctl==="joy"?T().hintJoy:T().hintPad);
  try{localStorage.setItem("mqctl",ctl);}catch(e){}
}
$("gear").addEventListener("click",()=>{
  $("openWd").hidden=!(done.has(15)||qa[15]!==undefined); /* the wardrobe is extra — any attempt at Xochi's quest opens it */
  $("settings").hidden=false;held=null;});
$("openWd").addEventListener("click",()=>{$("settings").hidden=true;openWardrobe();});
$("closeSet").addEventListener("click",()=>{$("settings").hidden=true;});
$("optSwipe").addEventListener("click",()=>{ctl="swipe";applyCtl();});
$("optJoy").addEventListener("click",()=>{ctl="joy";applyCtl();});
$("optPad").addEventListener("click",()=>{ctl="pad";applyCtl();});
(function(){
  const joy=$("joy"),knob=$("knob");let active=null;
  function setFrom(e){
    const r=joy.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    let dx=e.clientX-cx,dy=e.clientY-cy;
    const max=r.width/2-14,len=Math.hypot(dx,dy);
    if(len>max){dx=dx/len*max;dy=dy/len*max;}
    knob.style.transform=`translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
    if(Math.hypot(dx,dy)<16){held=null;return;}
    held=Math.abs(dx)>Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up");
  }
  function end(){active=null;held=null;knob.style.transform="translate(-50%,-50%)";}
  joy.addEventListener("pointerdown",e=>{e.preventDefault();active=e.pointerId;joy.setPointerCapture(e.pointerId);setFrom(e);});
  joy.addEventListener("pointermove",e=>{if(e.pointerId===active)setFrom(e);});
  joy.addEventListener("pointerup",end);joy.addEventListener("pointercancel",end);
})();
/* ---------- comfort themes (AJ's feedback): curated palettes, each with light+dark
   variants, applied over the CSS variables. Adding a theme = data only — and CI runs
   a WCAG contrast audit over every variant, so a palette that hurts eyes can't ship. */
const THEMES={
 meridian:null, /* the built-in palette from the stylesheet */
 forest:{
  light:{bg:"#EDF2E6",surface:"#FFFFFF",ink:"#1E2A1E",muted:"#54644E",line:"#CBD6C0",
         accent:"#2E7D4F","accent-ink":"#FFFFFF",chip:"#E2EAD8",bubble:"#E7F0DD","bubble-line":"#C4D6B0"},
  dark:{bg:"#121A12",surface:"#1B241B",ink:"#E6EEE2",muted:"#A3B49C",line:"#2E3C2E",
        accent:"#7FD8A0","accent-ink":"#0F2114",chip:"#243024",bubble:"#223022","bubble-line":"#3C503C"}},
 fairy:{
  light:{bg:"#F4EFFA",surface:"#FFFFFF",ink:"#2A2140",muted:"#665A82",line:"#DDD2EE",
         accent:"#8140CE","accent-ink":"#FFFFFF",chip:"#ECE3F7",bubble:"#F0E6FB","bubble-line":"#D8C4F0"},
  dark:{bg:"#171226",surface:"#221A35",ink:"#EFE8FA",muted:"#AC9FCA",line:"#3A2E58",
        accent:"#C9A2FF","accent-ink":"#241040",chip:"#2C2344",bubble:"#2A2145","bubble-line":"#4C3B70"}},
 sunset:{
  light:{bg:"#F7EFE3",surface:"#FFFDF8",ink:"#33261C",muted:"#776450",line:"#E2D4C0",
         accent:"#B34A14","accent-ink":"#FFFFFF",chip:"#EFE3D0",bubble:"#F3E7D3","bubble-line":"#DFC9A8"},
  dark:{bg:"#1D140E",surface:"#291D14",ink:"#F2E7DA",muted:"#BEA88F",line:"#443221",
        accent:"#F0A868","accent-ink":"#2A1505",chip:"#362718",bubble:"#342517","bubble-line":"#55402B"}}};
const THEME_KEYS=["bg","surface","ink","muted","line","accent","accent-ink","chip","bubble","bubble-line"];
/* custom theme: clone a preset in the admin theme editor, tweak freely, and the
   🪄 auto-fix button repairs contrast after lazy changes. Stored per device. */
function sanitizeTheme(t2){
  if(!t2||typeof t2!=="object")return null;
  const out={};
  ["light","dark"].forEach(m2=>{const src=t2[m2];if(!src||typeof src!=="object")return;
    const o={};THEME_KEYS.forEach(k2=>{const v=src[k2];
      if(typeof v==="string"&&/^#[0-9A-Fa-f]{6}$/.test(v))o[k2]=v;});
    if(Object.keys(o).length===THEME_KEYS.length)out[m2]=o;});
  return out.light&&out.dark?out:null;
}
/* palette wardrobe: several named custom palettes, reorderable, one active.
   mqpals=[{n,light,dark}...] + mqpal=active index; legacy mqcustom migrates in. */
let PALS=[],palIdx=0;
try{
  const raw=JSON.parse(localStorage.getItem("mqpals")||"null");
  if(Array.isArray(raw))raw.slice(0,8).forEach(e2=>{const t2=sanitizeTheme(e2);
    if(t2)PALS.push({n:String(e2.n||"Custom").slice(0,18),light:t2.light,dark:t2.dark});});
}catch(e){}
if(!PALS.length){try{const old=sanitizeTheme(JSON.parse(localStorage.getItem("mqcustom")||"null"));
  if(old)PALS.push({n:"Custom 1",light:old.light,dark:old.dark});}catch(e){}}
try{palIdx=Math.min(PALS.length-1,Math.max(0,parseInt(localStorage.getItem("mqpal")||"0")||0));}catch(e){}
let customTheme=PALS[palIdx]||null;
let themeName="meridian";try{themeName=localStorage.getItem("mqtheme")||"meridian";}catch(e){}
if(!THEMES.hasOwnProperty(themeName)&&themeName!=="custom")themeName="meridian";
const darkMq=window.matchMedia("(prefers-color-scheme: dark)");
/* canvas theming: the world follows the theme. Big-surface colors (floors, walls,
   water, fences, furniture bulk) mix toward the theme accent via tc(); landmark props
   (doors, the taco cones, storefronts) keep their identity. NPC shirts take a stronger
   whimsy mix; skin, hair, animals and the player's own chosen look never change. */
let tintCol=null,tintDark=false;const tintCache=new Map(),npcLookCache={};
function setCanvasTint(){
  tintCache.clear();Object.keys(npcLookCache).forEach(k2=>delete npcLookCache[k2]);
  const t2=themeName==="custom"?customTheme:THEMES[themeName];
  tintDark=darkMq.matches;
  tintCol=t2?(tintDark?t2.dark:t2.light).accent:null;
}
const tc=h=>{if(!tintCol)return h;let v=tintCache.get(h);
  if(!v){v=mixHex(h,tintCol,tintDark?0.22:0.16);tintCache.set(h,v);}return v;};
const npcWhimsy=k2=>{if(!tintCol)return NPCLOOK[k2];let v=npcLookCache[k2];
  if(!v){v={...NPCLOOK[k2],shirt:mixHex(NPCLOOK[k2].shirt,tintCol,0.4)};npcLookCache[k2]=v;}return v;};
function applyTheme(){
  if(themeName==="custom"&&!customTheme)themeName="meridian";
  const t2=themeName==="custom"?customTheme:THEMES[themeName],root=document.documentElement;
  THEME_KEYS.forEach(k2=>root.style.removeProperty("--"+k2));
  if(t2){const set2=darkMq.matches?t2.dark:t2.light;
    Object.entries(set2).forEach(([k2,v])=>root.style.setProperty("--"+k2,v));}
  document.querySelectorAll("#themeRow button,#themeRow2 button[data-th]")
    .forEach(b=>b.setAttribute("aria-pressed",b.dataset.th===themeName?"true":"false"));
  $("thCustom").hidden=!customTheme;
  if(customTheme)$("thCustom").textContent="\u2728 "+customTheme.n;
  setCanvasTint();
  if(MUSIC.timer)musRetime(); /* tempo follows the theme */
  try{localStorage.setItem("mqtheme",themeName);}catch(e){}
}
try{darkMq.addEventListener("change",applyTheme);}catch(e){}
document.querySelectorAll("#themeRow button,#thCustom").forEach(b=>b.addEventListener("click",()=>{themeName=b.dataset.th;applyTheme();}));
/* --- contrast math (same WCAG formula the CI audit uses) --- */
const hex2rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const rgb2hex=r=>"#"+r.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
const relLum=h=>{const c=hex2rgb(h).map(v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return .2126*c[0]+.7152*c[1]+.0722*c[2];};
const cRatio=(a,b)=>{const l1=relLum(a),l2=relLum(b);return(Math.max(l1,l2)+.05)/(Math.min(l1,l2)+.05);};
const mixHex=(h,t2,amt)=>{const tr=hex2rgb(t2);return rgb2hex(hex2rgb(h).map((v,i)=>v+(tr[i]-v)*amt));};
function fixFg(fg,bgs,min){ /* smallest nudge toward black or white that clears `min` vs every bg */
  const ok=h=>bgs.every(b=>cRatio(h,b)>=min);
  if(ok(fg))return fg;
  for(let a=0.05;a<=1.001;a+=0.05){
    const dk=mixHex(fg,"#000000",a);if(ok(dk))return dk;
    const lt=mixHex(fg,"#FFFFFF",a);if(ok(lt))return lt;
  }
  return bgs.every(b=>cRatio("#000000",b)>=cRatio("#FFFFFF",b))?"#000000":"#FFFFFF";
}
function autoFixTheme(){ /* backgrounds are the designer's; text adjusts to stay readable */
  ["light","dark"].forEach(m2=>{const p=customTheme[m2];
    p.ink=fixFg(p.ink,[p.bg,p.surface,p.chip,p.bubble],4.5);
    p.muted=fixFg(p.muted,[p.surface,p.bg],4.5);
    p["accent-ink"]=fixFg(p["accent-ink"],[p.accent],4.5);
  });
  saveCustom();applyTheme();teRender();toast(T().teFixed,2200);
}
/* --- theme editor (admin) --- */
/* open the editor on the variant the player is actually SEEING — editing the light
   palette while the phone displays dark reads as "my colors don't change" */
let teMode=darkMq.matches?"dark":"light";
function saveCustom(){try{localStorage.setItem("mqpals",JSON.stringify(PALS));
  localStorage.setItem("mqpal",String(palIdx));}catch(e){}}
function meridianVars(mode){ /* read the built-in palette out of the stylesheet */
  const root=document.documentElement,prev=root.dataset.theme;
  THEME_KEYS.forEach(k2=>root.style.removeProperty("--"+k2));
  root.dataset.theme=mode;
  const cs=getComputedStyle(root),o={};
  THEME_KEYS.forEach(k2=>o[k2]=cs.getPropertyValue("--"+k2).trim());
  if(prev)root.dataset.theme=prev;else delete root.dataset.theme;
  return o;
}
function cloneTheme(name){ /* clone = save-as-new palette in the wardrobe */
  if(PALS.length>=8){toast(T().palFull,2400);return;}
  const src=name==="meridian"?{light:meridianVars("light"),dark:meridianVars("dark")}
    :JSON.parse(JSON.stringify(THEMES[name]));
  PALS.push({n:(T().palNames[name]||name)+" "+(PALS.length+1),light:src.light,dark:src.dark});
  palIdx=PALS.length-1;customTheme=PALS[palIdx];
  themeName="custom";saveCustom();applyTheme();teRender();
}
function palSelect(i){palIdx=i;customTheme=PALS[i];themeName="custom";saveCustom();applyTheme();teRender();}
function palRender(){ /* the wardrobe list: pick, reorder, evict */
  const box=$("tePals");box.innerHTML="";
  PALS.forEach((pal,i)=>{
    const row=document.createElement("div");row.className="palrow";
    const use=document.createElement("button");use.textContent=pal.n;use.className="palname";
    use.setAttribute("aria-pressed",themeName==="custom"&&i===palIdx?"true":"false");
    use.addEventListener("click",()=>palSelect(i));
    const up=document.createElement("button");up.textContent="\u25b2";up.disabled=i===0;
    up.addEventListener("click",()=>{[PALS[i-1],PALS[i]]=[PALS[i],PALS[i-1]];
      if(palIdx===i)palIdx=i-1;else if(palIdx===i-1)palIdx=i;
      customTheme=PALS[palIdx];saveCustom();teRender();});
    const dn=document.createElement("button");dn.textContent="\u25bc";dn.disabled=i===PALS.length-1;
    dn.addEventListener("click",()=>{[PALS[i+1],PALS[i]]=[PALS[i],PALS[i+1]];
      if(palIdx===i)palIdx=i+1;else if(palIdx===i+1)palIdx=i;
      customTheme=PALS[palIdx];saveCustom();teRender();});
    const del=document.createElement("button");del.textContent="\ud83d\uddd1";
    del.addEventListener("click",()=>{PALS.splice(i,1);
      if(palIdx>=PALS.length)palIdx=Math.max(0,PALS.length-1);
      customTheme=PALS[palIdx]||null;
      if(!customTheme&&themeName==="custom")themeName="meridian";
      saveCustom();applyTheme();teRender();});
    row.appendChild(use);row.appendChild(up);row.appendChild(dn);row.appendChild(del);
    box.appendChild(row);});
  $("teName").value=customTheme?customTheme.n:"";
  $("teName").placeholder=T().teNamePh;
}
$("teName").addEventListener("input",()=>{
  if(!customTheme)return;
  customTheme.n=$("teName").value.slice(0,18).trim()||"Custom";
  saveCustom();
  if(themeName==="custom")$("thCustom").textContent="\u2728 "+customTheme.n;
});
function teRender(){
  palRender();
  const box=$("teRows");box.innerHTML="";
  if(!customTheme)return;
  $("teLight").setAttribute("aria-pressed",teMode==="light"?"true":"false");
  $("teDark").setAttribute("aria-pressed",teMode==="dark"?"true":"false");
  THEME_KEYS.forEach(k2=>{
    const row=document.createElement("div");row.className="terow";
    const lb=document.createElement("span");lb.textContent=k2;
    const inp=document.createElement("input");inp.type="color";inp.value=customTheme[teMode][k2];
    inp.addEventListener("input",()=>{customTheme[teMode][k2]=inp.value;saveCustom();applyTheme();});
    row.appendChild(lb);row.appendChild(inp);box.appendChild(row);
  });
}
$("teOpen").addEventListener("click",()=>{
  if(!customTheme)cloneTheme(themeName==="custom"?"meridian":themeName);
  else{themeName="custom";applyTheme();}
  teRender();$("settings").hidden=true;$("themeEd").hidden=false;held=null;});
document.querySelectorAll("#teClone button").forEach(b=>b.addEventListener("click",()=>cloneTheme(b.dataset.cl)));
$("teLight").addEventListener("click",()=>{teMode="light";teRender();});
$("teDark").addEventListener("click",()=>{teMode="dark";teRender();});
$("teFix").addEventListener("click",autoFixTheme);
$("teClose").addEventListener("click",()=>{$("themeEd").hidden=true;
  if(customTheme)toast(T().teSaved,2000);});
/* ---------- music: procedural WebAudio — generative, theme-aware, $0, offline.
   No assets, no network, nothing to license: a sparse pentatonic melody wanders over
   a soft pad and bass, voiced per theme. Starts on the first user gesture (autoplay
   rules), sleeps when the tab hides, and lives behind 🎵 volume/mute in Settings. */
const MUSIC={ctx:null,master:null,timer:null,step:0,mel:2};
let musOn=true,musVol=0.6;
try{musOn=localStorage.getItem("mqmus")!=="0";}catch(e){}
try{const v=parseFloat(localStorage.getItem("mqvol"));if(!isNaN(v))musVol=Math.min(1,Math.max(0,v));}catch(e){}
const MUSDEF={
 meridian:{bpm:76,root:57,scale:[0,3,5,7,10],lead:"triangle",pad:"sine",bright:900},  /* A min pent — lo-fi office */
 forest:{bpm:84,root:64,scale:[0,2,4,7,9],lead:"triangle",pad:"triangle",bright:1500},/* E maj pent — marimba woods */
 fairy:{bpm:64,root:73,scale:[0,2,4,7,9],lead:"sine",pad:"sine",bright:2800},         /* C#5 maj pent — little bells */
 sunset:{bpm:58,root:55,scale:[0,2,4,7,9],lead:"sine",pad:"sine",bright:800}};        /* G maj pent — warm dusk */
/* tune picker: Auto follows the theme; or pin one of the four tunes (owner ask) */
let musTune="default";try{musTune=localStorage.getItem("mqtune")||"default";}catch(e){}
if(!MUSDEF[musTune]&&musTune!=="default")musTune="default";
const musDef=()=>MUSDEF[musTune]||MUSDEF[themeName]||MUSDEF.meridian;
function musTuneSet(tn){musTune=tn;
  try{localStorage.setItem("mqtune",tn);}catch(e){}
  document.querySelectorAll("#tuneRow button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.tn===musTune?"true":"false"));
  if(MUSIC.timer)musRetime();
  if(musOn)setTimeout(musChirp,120);}
document.querySelectorAll("#tuneRow button").forEach(b=>b.addEventListener("click",()=>musTuneSet(b.dataset.tn)));
const mtof=m=>440*Math.pow(2,(m-69)/12);
function musVoice(m,t0,dur,type,peak,bright){
  const c=MUSIC.ctx,o=c.createOscillator(),f=c.createBiquadFilter(),g=c.createGain();
  o.type=type;o.frequency.value=mtof(m);
  f.type="lowpass";f.frequency.value=bright;
  g.gain.setValueAtTime(0,t0);
  g.gain.linearRampToValueAtTime(peak,t0+Math.min(0.05,dur*0.2));
  g.gain.exponentialRampToValueAtTime(0.0008,t0+dur);
  o.connect(f);f.connect(g);g.connect(MUSIC.master);
  o.start(t0);o.stop(t0+dur+0.05);
}
function musTick(){
  const c=MUSIC.ctx,d=musDef(),t0=c.currentTime+0.08,st=MUSIC.step++;
  if(Math.random()<0.58){ /* melody: random walk on the pentatonic — dense enough to read as a tune */
    MUSIC.mel+=[1,-1,2,-2,1,-1,0][Math.floor(Math.random()*7)];
    MUSIC.mel=Math.max(-3,Math.min(9,MUSIC.mel));
    const deg=((MUSIC.mel%5)+5)%5,oct=Math.floor(MUSIC.mel/5);
    musVoice(d.root+12+oct*12+d.scale[deg],t0,0.55,d.lead,0.19,d.bright);
  }
  if(st%8===0)musVoice(d.root-12,t0,1.8,"sine",0.12,500);      /* bass root */
  if(st%16===4)musVoice(d.root-5,t0,1.6,"sine",0.08,500);      /* bass fifth */
  if(st%16===0)[0,7].forEach(iv=>musVoice(d.root+iv,t0,3.4,d.pad,0.05,d.bright*0.8)); /* pad swell */
}
function musRetime(){if(MUSIC.timer){clearInterval(MUSIC.timer);MUSIC.timer=null;}
  if(musOn&&MUSIC.ctx)MUSIC.timer=setInterval(()=>{
    if(!document.hidden&&MUSIC.ctx.state==="running")musTick();},30000/musDef().bpm);}
function musStart(){
  if(!musOn)return;
  if(!MUSIC.ctx){
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    try{MUSIC.ctx=new AC();}catch(e){return;}
    MUSIC.master=MUSIC.ctx.createGain();
    MUSIC.master.gain.value=0.55*musVol*musVol;
    MUSIC.master.connect(MUSIC.ctx.destination);
    /* iOS can suspend us behind our back (calls, Siri, control center) — heal it */
    MUSIC.ctx.onstatechange=()=>{
      if(musOn&&!document.hidden&&MUSIC.ctx.state==="suspended")MUSIC.ctx.resume().catch(()=>{});};
  }
  if(MUSIC.ctx.state==="suspended")MUSIC.ctx.resume().catch(()=>{});
  if(!MUSIC.timer)musRetime();
}
function musStop(){if(MUSIC.timer){clearInterval(MUSIC.timer);MUSIC.timer=null;}
  if(MUSIC.ctx&&MUSIC.ctx.state==="running")MUSIC.ctx.suspend().catch(()=>{});}
function musApply(){
  /* squared taper: linear sliders feel top-heavy for loudness */
  if(MUSIC.master)MUSIC.master.gain.value=musOn?0.55*musVol*musVol:0;
  $("musMute").textContent=musOn?T().musOn:T().musOff;
  $("musMute").setAttribute("aria-pressed",musOn?"true":"false");
  $("musVol").value=Math.round(musVol*100);
  try{localStorage.setItem("mqmus",musOn?"1":"0");localStorage.setItem("mqvol",String(musVol));}catch(e){}
  if(musOn)musStart();else musStop();
}
function musChirp(){ /* instant audible proof the audio path works (owner: "no tune") */
  if(!MUSIC.ctx||MUSIC.ctx.state!=="running")return;
  const d=musDef(),t0=MUSIC.ctx.currentTime+0.03;
  [0,2,4].forEach((deg,i)=>musVoice(d.root+12+d.scale[deg],t0+i*0.09,0.4,d.lead,0.22,d.bright));}
$("musMute").addEventListener("click",()=>{musOn=!musOn;musApply();if(musOn)setTimeout(musChirp,150);});
$("musVol").addEventListener("input",()=>{musVol=$("musVol").value/100;if(!musOn)musOn=true;musApply();});
$("musVol").addEventListener("change",()=>setTimeout(musChirp,100));
/* persistent, not once: the same cheap poke does the first-gesture unlock AND recovers
   from iOS interruption-suspends later; musStart early-returns when already running */
const musPoke=()=>{if(musOn)musStart();};
window.addEventListener("pointerdown",musPoke,{passive:true});
window.addEventListener("touchend",musPoke,{passive:true});
window.addEventListener("keydown",musPoke);
document.addEventListener("visibilitychange",()=>{
  if(document.visibilityState==="hidden")musStop();
  else if(musOn&&MUSIC.ctx)musStart();
});
/* ---------- language ---------- */
function applyLang(){
  const t=T();
  $("in1").textContent=t.in1;$("in2").textContent=t.in2;$("in3").textContent=t.in3;$("in4").textContent=t.in4;
  document.querySelectorAll(".classes button").forEach(b=>{
    const pair=t.classes[b.dataset.c];b.querySelector("b").textContent=pair[0];b.querySelector("small").textContent=pair[1];});
  $("crTitle").textContent=t.crTitle;$("lbName").textContent=t.lbName;$("lbOutfit").textContent=t.lbOutfit;
  $("lbShirt").textContent=t.lbShirt;$("lbSkin").textContent=t.lbSkin;$("lbHairC").textContent=t.lbHairC;$("lbHairS").textContent=t.lbHairS;
  $("begin").textContent=t.begin;
  setWorldTag();
  $("openExp").textContent=t.expBtn;$("exTitle").textContent=t.expTitle;$("exHint").textContent=t.expHint;
  $("exCopy").textContent=t.expCopy;$("exClose").textContent=t.tlClose;
  $("exTabJson").textContent=t.exTabJson;$("exTabCare").textContent=t.exTabCare;$("exIcs").textContent=t.exIcs;
  $("exTabRep").textContent=t.exTabRep;$("exDl").textContent=t.exDl;
  if(!replayTimer)$("replay").textContent=t.replay;
  $("mapTitle").textContent=t.mapTitle;$("mapClose").textContent=t.tlClose;
  $("setTitle").textContent=t.setTitle;$("lbCtl").textContent=t.lbCtl;
  $("optSwipe").textContent=t.swipeB;$("optJoy").textContent=t.joyB;$("optPad").textContent=t.padB;
  $("lbLang").textContent=t.lbLang;$("lbAdm").textContent=t.lbAdm;$("admOff").textContent=t.admOff;$("admOn").textContent=t.admOn;
  $("lbStakes").textContent=t.lbStakes;$("stkNone").textContent=t.stkNone;$("stkHearts").textContent=t.stkHearts;
  $("lbTheme").textContent=t.lbTheme;
  $("lbCam").textContent=t.lbCam;
  document.querySelectorAll("#camRow button").forEach(b=>{
    b.textContent=b.dataset.cam==="top"?t.camTop:b.dataset.cam==="front"?(t.camFront||"⬆ 2.5D"):t.camIso;
    b.setAttribute("aria-pressed",b.dataset.cam===camMode?"true":"false");});
  $("lbMusic").textContent=t.lbMusic;
  document.querySelectorAll("#tuneRow button").forEach((b,i)=>{
    b.textContent=t.tunes[i];
    b.setAttribute("aria-pressed",b.dataset.tn===musTune?"true":"false");});
  $("musMute").textContent=musOn?t.musOn:t.musOff;
  $("musVol").value=Math.round(musVol*100);
  document.querySelectorAll("#themeRow button,#thCustom").forEach(b=>b.textContent=t.themes[b.dataset.th]);
  $("teOpen").textContent=t.teOpen;$("teTitle").textContent=t.teTitle;$("teFrom").textContent=t.teFrom;
  $("teModeLb").textContent=t.teModeLb;$("teFix").textContent=t.teFix;$("teClose").textContent=t.tlClose;
  $("openLab").textContent=t.openLab;$("closeSet").textContent=t.closeSet;$("openWd").textContent=t.wdBtn;$("openTp").textContent=t.tpBtn;$("openMp").textContent=t.mpBtn;
  $("tlTitle").textContent=t.tlTitle;$("tlHint").textContent=t.tlHint;$("tlApply").textContent=t.tlApply;$("tlClose").textContent=t.tlClose;
  document.querySelectorAll("#brushes button[data-b] .bl").forEach((el,i)=>el.textContent=t.brushes[i]);
  $("undoBtn").querySelector(".bl").textContent=t.undoLb;
  $("tlSearch").placeholder=t.tlFindPh;
  $("next").textContent=t.nextBack;$("replay").textContent=t.replay;
  $("optEn").setAttribute("aria-pressed",lang==="en"?"true":"false");
  $("optEs").setAttribute("aria-pressed",lang==="es"?"true":"false");
  $("langQuick").textContent=t.langQuick;
  applyText();
  if(!$("world").hidden){applyCtl();checkTalk();}
  if(!$("creator").hidden){buildOpts("rowStyle",t.styles,"style");buildOpts("rowOutfit",t.outfits,"outfit");}
  if(!$("hud").hidden)hud();
  try{localStorage.setItem("mqlang",lang);}catch(e){}
}
$("optEn").addEventListener("click",()=>{lang="en";applyLang();});
$("optEs").addEventListener("click",()=>{lang="es";applyLang();});
$("langQuick").addEventListener("click",()=>{lang=(lang==="en"?"es":"en");applyLang();});
/* ---------- text lab (edit names, titles, bump lines) ---------- */
function labData(){return {npcNames:{...NPCN[lang]},titles:AQ().map(q=>q.title),flavor:JSON.parse(JSON.stringify(T().flavor))};}
function applyText(){
  try{const o=JSON.parse(localStorage.getItem("mqtext_"+lang)||"null");if(!o)return;
    if(o.npcNames)Object.assign(NPCN[lang],o.npcNames);
    if(o.titles)AQ().forEach((q,i)=>{if(o.titles[i])q.title=o.titles[i];});
    if(o.flavor)Object.assign(UI[lang].flavor,o.flavor);
  }catch(e){}
}
$("openLab").addEventListener("click",()=>{
  $("settings").hidden=true;$("tlArea").value=JSON.stringify(labData(),null,1);$("textlab").hidden=false;});
$("tlClose").addEventListener("click",()=>{$("textlab").hidden=true;});
$("tlApply").addEventListener("click",()=>{
  try{const o=JSON.parse($("tlArea").value);
    localStorage.setItem("mqtext_"+lang,JSON.stringify(o));
    applyText();applyLang();$("textlab").hidden=true;toast(T().tlOk,2000);
  }catch(e){toast(T().tlErr,2600);}
});
function tlFindNext(){
  const q=$("tlSearch").value.toLowerCase();if(!q)return;
  const ta=$("tlArea"),v=ta.value,lo=v.toLowerCase();
  let idx=lo.indexOf(q,ta.selectionEnd||0);
  if(idx<0)idx=lo.indexOf(q,0);
  if(idx<0){toast(T().tlNoHit,1400);return;}
  ta.setSelectionRange(idx,idx+q.length);
  ta.blur();ta.focus(); /* blur+focus makes mobile Safari scroll the caret into view */
  const lh=parseFloat(getComputedStyle(ta).lineHeight)||15;
  const cols=Math.max(20,Math.floor(ta.clientWidth/7.2));
  let rows=0;v.slice(0,idx).split("\n").forEach(l=>{rows+=1+Math.floor(l.length/cols);});
  ta.scrollTop=Math.max(0,(rows-4)*lh);
}
$("tlFind").addEventListener("click",tlFindNext);
$("tlSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();tlFindNext();}});
/* ---------- export skeleton (v1): play data → JSON; future: typed docs, email, convo export ---------- */
let dlog=[];try{dlog=JSON.parse(localStorage.getItem("mqdlog")||"[]");}catch(e){}
/* choices that advance carry no concept of their own — the node's siblings do */
function nodeConcept(){const n=(curQ&&curQ.nodes[node])||{},c=(n.ch||[]).find(x=>x.out&&x.out.concept);return c?c.out.concept:"";}
function logDecision(o,c){const n=(curQ&&curQ.nodes[node])||{};
  dlog.push({t:Date.now(),quest:curQ.title,qi:cur,npc:curQ.npc,ask:n.q||"",pick:c?c.t:"",
             concept:o.concept||"",why:o.why||"",result:o.r});
  dlog=dlog.slice(-200);
  try{localStorage.setItem("mqdlog",JSON.stringify(dlog));}catch(e){}}
/* Which job a quest was practice for. Chapters declare their role in content;
   entries logged before roles existed are matched back by title. */
function roleOf(e){
  const L=CHS();
  let qi=typeof e.qi==="number"?e.qi:-2;
  if(qi===-2){const i=AQ().findIndex(q=>q.title===e.quest);qi=i<0?-2:i;}
  if(qi<0)return null;
  for(let i=0;i<L.length;i++)
    if(L[i].quests.indexOf(qi)>=0&&L[i].role)return L[i].role[lang]||L[i].role.en;
  return null;
}
/* The decision report: play data → a portfolio document. One section per quest, one
   block per decision point; the latest attempt is the answer of record, and the retry
   count stays visible because the second try is where the learning shows. */
function decisionReport(){
  const t=T(),L=t.repL,d=new Date(),p2=n2=>String(n2).padStart(2,"0");
  const stamp=d.getFullYear()+"-"+p2(d.getMonth()+1)+"-"+p2(d.getDate());
  const out=[t.repHead(heroName,lvlName(),xp,MAXXP,t.grades[gradeAll()-1],stamp),""];
  if(!dlog.length){out.push(t.repEmpty,"","---","*"+L.foot+"*");return out.join("\n");}
  const order=[],by={};
  dlog.forEach(e=>{const k=e.quest||"?";
    if(!by[k]){by[k]={quest:k,npc:e.npc,rows0:e,order:[],nodes:{}};order.push(k);}
    const g=by[k],nk=e.ask||"-";
    if(!g.nodes[nk]){g.nodes[nk]=[];g.order.push(nk);}
    g.nodes[nk].push(e);});
  let points=0,clean=0;
  order.forEach(k=>by[k].order.forEach(nk=>{const r=by[k].nodes[nk];points++;
    if(r.length===1&&r[0].result==="ok")clean++;}));
  out.push(t.repSum(dlog.length,order.length,Math.round(clean/points*100)),"");
  /* roles first: a hiring manager reads the job they are hiring for, then the detail */
  const rOrd=[],rBy={};
  order.forEach(k=>{const g=by[k],r=roleOf(g.rows0)||L.side;
    if(!rBy[r]){rBy[r]={quests:0,calls:0,clean:0,points:0};rOrd.push(r);}
    const a=rBy[r];a.quests++;
    g.order.forEach(nk=>{const rows=g.nodes[nk];a.points++;a.calls+=rows.length;
      if(rows.length===1&&rows[0].result==="ok")a.clean++;});});
  if(rOrd.length){
    out.push("## "+L.roles,"");
    rOrd.forEach(r=>{const a=rBy[r];
      out.push("- **"+r+"** — "+t.repRole(a.calls,a.quests,Math.round(a.clean/a.points*100)));});
    out.push("");}
  const seen=[];
  order.forEach(k=>{
    const g=by[k];
    out.push("## "+g.quest);
    if(g.npc&&NPCN[lang]&&NPCN[lang][g.npc])out.push("","*"+NPCN[lang][g.npc]+"*");
    out.push("");
    g.order.forEach(nk=>{
      const rows=g.nodes[nk],last=rows[rows.length-1],n=rows.length;
      if(nk!=="-")out.push("**"+L.question+":** "+nk);
      if(last.pick)out.push("**"+L.call+":** "+last.pick);
      out.push("**"+L.verdict+":** "+(L[last.result]||last.result)
        +(last.concept?" — *"+last.concept+"*":"")
        +(n>1?"  ("+n+" "+L.attempts+")":""));
      out.push("**"+L.why+":** "+(last.why||L.advanced),"");
      rows.forEach(r=>{if(r.concept&&seen.indexOf(r.concept)<0)seen.push(r.concept);});
    });
  });
  if(seen.length){out.push("## "+L.concepts,"");seen.forEach(c=>out.push("- "+c));out.push("");}
  out.push("---","*"+L.foot+"*");
  return out.join("\n");
}
function exportData(){return JSON.stringify({schema:"meridian-export-v1",exported:new Date().toISOString(),
  player:{name:heroName,class:cls,look},
  progress:{xp,level:lvlName(),stakes:stakesMode(),hearts:livesOn()?hearts:null,
            grade:gradeAll(),marks,questsDone:[...done],location:world},
  frederick:{name:"Frederick",treats,bandana:fredQ>=2,carePackUnlocked:fredQ>=1},
  decisions:dlog,
  futureExportTypes:["decision-report.docx","conversation-export.md","training-transcript.csv"]},null,1);}
/* Frederick's care pack: the secret quest's lesson as a real deliverable —
   a care sheet you can copy, plus recurring reminders as a downloadable .ics */
let exMode="json";
let petCfg={n:"Frederick",am:"07:30",pm:"18:00"};
try{const p=JSON.parse(localStorage.getItem("mqpet")||"null");if(p&&p.n)petCfg=p;}catch(e){}
function petSave(){try{localStorage.setItem("mqpet",JSON.stringify(petCfg));}catch(e){}}
let petEggSeen=null;
["petName","petAm","petPm"].forEach((id,i)=>$(id).addEventListener("input",()=>{
  const v=$(id).value.trim();
  if(i===0)petCfg.n=v||"Frederick";else if(i===1)petCfg.am=v||"07:30";else petCfg.pm=v||"18:00";
  petSave();$("exArea").value=T().carePack(heroName,treats,petCfg);
  if(i===0){const eg=eggFor(petCfg.n); /* name the pet Sonny and the barrio knows */
    if(eg&&eg!==petEggSeen){petEggSeen=eg;toast(EGGSAFE[eg].lines[lang][0],3200);}}
}));
function icsData(){
  const now=new Date(),p2=n2=>String(n2).padStart(2,"0");
  const stamp=now.getUTCFullYear()+p2(now.getUTCMonth()+1)+p2(now.getUTCDate())+"T000000Z";
  const day=d=>d.getFullYear()+""+p2(d.getMonth()+1)+p2(d.getDate());
  const month1=new Date(now.getFullYear(),now.getMonth()+1,1);
  const soon=new Date(now.getFullYear(),now.getMonth(),now.getDate()+14);
  const sat=new Date(now.getFullYear(),now.getMonth(),now.getDate()+((6-now.getDay()+7)%7||7));
  const ev=T().careEvents(petCfg.n);
  const rows=[[ev[0],month1,"FREQ=MONTHLY"],[ev[1],soon,"FREQ=WEEKLY;INTERVAL=8"],[ev[2],month1,"FREQ=MONTHLY;INTERVAL=3"],
              [ev[3],soon,"FREQ=YEARLY"],[ev[4],sat,"FREQ=MONTHLY"]];
  return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Meridian Quest//Care Pack//ES-EN",
    ...rows.flatMap((r,i)=>["BEGIN:VEVENT","UID:mq-care-"+i+"@meridian-quest","DTSTAMP:"+stamp,
      "DTSTART;VALUE=DATE:"+day(r[1]),"RRULE:"+r[2],"SUMMARY:"+r[0],"END:VEVENT"]),
    "END:VCALENDAR"].join("\r\n");
}
function renderExport(){
  $("exArea").value=exMode==="care"?T().carePack(heroName,treats,petCfg)
                   :exMode==="rep"?decisionReport():exportData();
  $("exHint").textContent=exMode==="care"?T().careHint:exMode==="rep"?T().repHint:T().expHint;
  $("exTabJson").setAttribute("aria-pressed",exMode==="json"?"true":"false");
  $("exTabCare").setAttribute("aria-pressed",exMode==="care"?"true":"false");
  $("exTabRep").setAttribute("aria-pressed",exMode==="rep"?"true":"false");
  $("exIcs").hidden=exMode!=="care";
  $("exDl").hidden=exMode!=="rep";
  $("careForm").hidden=exMode!=="care";
  $("petName").value=petCfg.n;$("petName").placeholder=T().petPh;
  $("petAm").value=petCfg.am;$("petPm").value=petCfg.pm;
}
$("openExp").addEventListener("click",()=>{$("settings").hidden=true;
  $("exTabCare").hidden=fredQ<1;if(fredQ<1)exMode="json";
  renderExport();$("exporter").hidden=false;});
$("exTabJson").addEventListener("click",()=>{exMode="json";renderExport();});
$("exTabCare").addEventListener("click",()=>{exMode="care";renderExport();});
$("exTabRep").addEventListener("click",()=>{exMode="rep";renderExport();});
$("exDl").addEventListener("click",()=>{
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([decisionReport()],{type:"text/markdown"}));
  a.download=(heroName.toLowerCase().replace(/[^a-z0-9]+/gi,"-")||"player")+"-decision-report.md";
  document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},400);
});
$("exIcs").addEventListener("click",()=>{
  const a=document.createElement("a");
  a.href=URL.createObjectURL(new Blob([icsData()],{type:"text/calendar"}));
  a.download=(petCfg.n.toLowerCase().replace(/[^a-z0-9]+/gi,"-")||"pet")+"-care-reminders.ics";
  document.body.appendChild(a);a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},400);
});
$("exClose").addEventListener("click",()=>{$("exporter").hidden=true;});
$("exCopy").addEventListener("click",()=>{const v=$("exArea").value;
  (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(v):Promise.reject())
    .then(()=>toast(T().expCopied,1600))
    .catch(()=>{$("exArea").focus();$("exArea").select();});});
/* ---------- village map: a real town plan drawn from the actual streets ----------
   Tile colours, district labels and the you-are-here dot all come from the content
   pack (MAPCOL / TOWNLBL / MAPDOT). A new business shows up on the plan without a
   line of engine change. */
const BASECOL={"≈":"#4A4B52","-":"#9A9B9E",".":"#D5D2C6","B":"#5C4A50","Q":"#B0563A","F":"#B0895B","G":"#C98A2D","C":"#E0662B","X":"#E7C25A","P":"#3E7C4F","E":"#E0B45C","L":"#E0B45C","O":"#E0B45C","1":"#8A8474","2":"#E0B45C","Y":"#C0392B","J":"#639C6C","b":"#D77FA8","g":"#9DBB77"};
function drawTown(){
  const mc=$("mapcv"),g2=mc.getContext("2d"),w=WORLDS.st,s=10;
  mc.width=w.W*s;mc.height=w.H*s+14;
  g2.fillStyle="#EFE9DA";g2.fillRect(0,0,mc.width,mc.height);
  const col={...BASECOL,...(typeof MAPCOL!=="undefined"?MAPCOL:{})};
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    g2.fillStyle=col[w.rows[y][x]]||"#D5D2C6";g2.fillRect(x*s,y*s,s,s);}
  const es=lang==="es";
  const flags={obra:(done.has(12)?1:0)+(done.has(13)?1:0),mercado:mercadoOpen()};
  g2.textAlign="center";
  (typeof TOWNLBL!=="undefined"?TOWNLBL:[]).forEach(l=>{
    if(l.when&&!l.when(flags))return;
    g2.font="700 "+(l.s||10)+"px sans-serif";g2.fillStyle=l.c||"#3A2F17";
    g2.fillText(es?l.es:l.en,l.x*s+(l.dx||0),l.y*s);});
  g2.fillStyle="#8A8474";g2.font="600 8px sans-serif";
  g2.fillText(es?"puertas y escaleras en dorado · ◉ estás aquí":"doors & stairs in gold · ◉ you are here",mc.width/2,w.H*s+10);
  const M=typeof MAPDOT!=="undefined"?MAPDOT:{};
  const dot=world==="st"?[fx,fy]:M[world]||null;
  if(dot){g2.fillStyle="#7A3FE0";g2.beginPath();g2.arc(dot[0]*s+s/2,dot[1]*s+s/2,5,0,7);g2.fill();
    g2.strokeStyle="#F2F1EA";g2.lineWidth=2;g2.stroke();}
}
function openMap(){
  drawTown();
  const t=T();
  $("mapNote").textContent="📍 "+t.locs[world]+(world==="f2"?"  ·  ⇧":"");
  $("mapov").hidden=false;held=null;
}
$("mapbtn").addEventListener("click",openMap);
$("mapClose").addEventListener("click",()=>{$("mapov").hidden=true;});
function openTravel(){
  const t=T().trolley,list=$("tvList");
  $("tvTitle").textContent=t.title;$("tvNote").textContent=t.note;$("tvClose").textContent=t.close;
  list.innerHTML="";
  TRV.forEach(d=>{const b=document.createElement("button");b.className="opt";
    b.textContent=(d.w===world?"◉ ":"🚋 ")+T().locs[d.w]+(d.w===world?" · "+t.here:"");
    if(d.w===world){b.disabled=true;b.style.opacity=".55";}
    else b.addEventListener("click",()=>{$("travel").hidden=true;
      world=d.w;px=fx=d.x;py=fy=d.y;held=null;dir=d.dir;
      warpT=performance.now()+450;portalT=performance.now()+900;
      save();setWorldTag();toast(T().arrive[world],2200);});
    list.appendChild(b);});
  const s=document.createElement("button");s.className="opt";s.disabled=true;s.style.opacity=".45";
  s.textContent="🏗️ "+t.soon;list.appendChild(s);
  $("travel").hidden=false;
}
$("tvClose").addEventListener("click",()=>{$("travel").hidden=true;
  /* step back off the stop so it can re-trigger later */
  if(world==="st"){px=fx=1;py=fy=1;dir="right";}
  if(world==="ex"){px=fx=22;py=fy=3;dir="left";}
  checkTalk();});
/* ---------- Xochi's wardrobe: equippable pet cosmetics, unlocked by the Designer quest ---------- */
let wdPet="fred";
const wdState=()=>wdPet==="fred"?wear:wearCat;
function wdDraw(){
  const g=$("wdpv").getContext("2d");
  g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,66,44);
  if(wdPet==="fred"){g.setTransform(1.9,0,0,1.9,1,-13);drawDog(g,1,0);}
  else{g.setTransform(1.9,0,0,1.9,1,-16);drawCat(g,1,0);}
}
function buildWearRow(rowId,key){
  const row=$(rowId);row.innerHTML="";
  const st2=wdState();
  const mk=col=>{const b=document.createElement("button");b.className="sw";
    if(col){b.style.background=col;b.setAttribute("aria-label",key+" "+col);}
    else{b.textContent="✕";b.setAttribute("aria-label",key+": none");}
    b.setAttribute("aria-pressed",st2[key]===col?"true":"false");
    b.addEventListener("click",()=>{wdState()[key]=col;save();
      [...row.children].forEach(x2=>x2.setAttribute("aria-pressed","false"));
      b.setAttribute("aria-pressed","true");wdDraw();});
    row.appendChild(b);};
  mk(null);WEAR[key].forEach(mk);
}
function openWardrobe(){
  const t=T();
  $("wdTitle").textContent=t.wdTitle;$("wdNote").textContent=t.wdNote;
  $("wdLbBandana").textContent=t.wdBandana;$("wdLbCollar").textContent=t.wdCollar;$("wdLbCape").textContent=t.wdCape;
  $("wdClose").textContent=t.closeSet;
  $("wdTabF").setAttribute("aria-pressed",wdPet==="fred"?"true":"false");
  $("wdTabC").setAttribute("aria-pressed",wdPet==="cat"?"true":"false");
  const cape=wdPet==="fred"; /* Canela wears bandanas and collars only */
  $("wdLbCape").hidden=!cape;$("wdRowCape").hidden=!cape;
  buildWearRow("wdRowBandana","bandana");buildWearRow("wdRowCollar","collar");
  if(cape)buildWearRow("wdRowCape","cape");
  wdDraw();$("wardrobe").hidden=false;held=null;
}
$("wdTabF").addEventListener("click",()=>{wdPet="fred";openWardrobe();});
$("wdTabC").addEventListener("click",()=>{wdPet="cat";openWardrobe();});
$("wdClose").addEventListener("click",()=>{$("wardrobe").hidden=true;});
/* ---------- Trolley Pass: your save as a transit pass (cartridge model — the save
   lives on-device like a Game Boy battery save; the pass is the link cable).
   Share it to your other device, or scan the QR with its camera. ---------- */
const b64u=s2=>btoa(unescape(encodeURIComponent(s2))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
const unb64u=s2=>decodeURIComponent(escape(atob(s2.replace(/-/g,"+").replace(/_/g,"/"))));
function passURL(){
  save();
  const blob={v:1,l:lang,s:loadSave()};
  return location.href.replace(/#.*$/,"")+"#save="+b64u(JSON.stringify(blob)); /* href, not origin — file:// has origin "null" */
}
function readPass(){
  const m=location.hash.match(/#save=([A-Za-z0-9\-_]+)/);
  if(!m)return null;
  try{const j=JSON.parse(unb64u(m[1]));
    if(j&&j.v===1){j.s=sanitizeSave(j.s);j.l=j.l==="es"?"es":"en";
      if(j.s)return j;}}catch(e){}
  return null;
}
function stripPassHash(){try{history.replaceState(null,"",location.pathname+location.search);}catch(e){}}
function openPass(){
  const t=T(),url=passURL();
  $("tpTitle").textContent=t.tpTitle;$("tpNote").textContent=t.tpNote;
  $("tpShare").textContent=t.tpShare;$("tpCopy").textContent=t.tpCopy;$("tpClose").textContent=t.closeSet;
  $("tpShare").hidden=!navigator.share;
  const cv2=$("tpqr");
  if(typeof qrcode!=="undefined"){
    const qr=qrcode(0,"L");qr.addData(url);qr.make();
    const n=qr.getModuleCount(),q=4,px2=n+q*2;
    cv2.width=px2;cv2.height=px2;
    const g=cv2.getContext("2d");
    g.fillStyle="#FFF";g.fillRect(0,0,px2,px2);
    g.fillStyle="#14121B";
    for(let y=0;y<n;y++)for(let x=0;x<n;x++)if(qr.isDark(y,x))g.fillRect(x+q,y+q,1,1);
    cv2.hidden=false;
  }else cv2.hidden=true;
  $("settings").hidden=true;$("tpass").hidden=false;held=null;
}
$("openTp").addEventListener("click",openPass);
$("openMp").addEventListener("click",()=>{const t=T();
  $("mpTitle").textContent=t.mpTitle;$("mpNote").textContent=t.mpNote;$("mpClose").textContent=t.closeSet;
  $("settings").hidden=true;$("mpanel").hidden=false;held=null;});
$("mpClose").addEventListener("click",()=>{$("mpanel").hidden=true;});
$("tpClose").addEventListener("click",()=>{$("tpass").hidden=true;});
$("tpShare").addEventListener("click",()=>{navigator.share({title:"Meridian Quest",url:passURL()}).catch(()=>{});});
$("tpCopy").addEventListener("click",()=>{const u=passURL();
  (navigator.clipboard&&navigator.clipboard.writeText?navigator.clipboard.writeText(u):Promise.reject())
    .then(()=>toast(T().tpCopied,1600)).catch(()=>{});});
/* ---------- fullscreen + admin ---------- */
let admin=false,brush="#";
$("fsbtn").addEventListener("click",()=>{
  const vp=$("vp"),fs=vp.classList.toggle("fs");
  document.body.classList.toggle("noscroll",fs);
  if(fs&&vp.requestFullscreen)vp.requestFullscreen().catch(()=>{});
  else if(!fs&&document.fullscreenElement)document.exitFullscreen().catch(()=>{});
  setTimeout(sizeCanvas,80);
});
document.addEventListener("fullscreenchange",()=>{setTimeout(sizeCanvas,80);});
try{admin=localStorage.getItem("mqadmin")==="1";}catch(e){}
function applyAdmin(){
  $("brushes").hidden=!admin;
  $("teOpen").hidden=!admin; /* the theme editor is admin-mode tooling; the ✨ Custom result is for everyone */
  $("stkRow").hidden=!admin;$("lbStakes").hidden=!admin;
  $("admOn").setAttribute("aria-pressed",admin?"true":"false");
  $("admOff").setAttribute("aria-pressed",admin?"false":"true");
  try{localStorage.setItem("mqadmin",admin?"1":"0");}catch(e){}
}
$("admOn").addEventListener("click",()=>{admin=true;applyAdmin();toast(T().admToast,3400);});
/* Stakes toggle — admin tooling. Hearts are off by default in an open world, but they
   stay one tap away for a mini-game or a challenge. Per device, never in the save. */
function applyStakes(){
  const on=stakesMode()==="hearts";
  $("stkRow").hidden=!admin;
  $("stkNone").setAttribute("aria-pressed",on?"false":"true");
  $("stkHearts").setAttribute("aria-pressed",on?"true":"false");
  hud();
}
function setStakes(m){
  stakesAdmin={mode:m};
  try{localStorage.setItem("mqstakes",m);}catch(e){}
  if(m==="hearts"&&hearts<=0)hearts=startHearts();
  applyStakes();save();toast(T().stkToast(m),3000);
}
$("stkNone").addEventListener("click",()=>setStakes("none"));
$("stkHearts").addEventListener("click",()=>setStakes("hearts"));
$("admOff").addEventListener("click",()=>{admin=false;applyAdmin();});
document.querySelectorAll("#brushes button[data-b]").forEach(b=>{
  if(b.dataset.b===brush)b.setAttribute("aria-pressed","true");
  b.addEventListener("click",()=>{brush=b.dataset.b;
    document.querySelectorAll("#brushes button[data-b]").forEach(x=>x.setAttribute("aria-pressed",x===b?"true":"false"));});
});
function setTile(x,y,ch){
  const w=CW();
  if(x<=0||y<=0||x>=w.W-1||y>=w.H-1)return;
  if(w.grid[y][x]==="N")return;
  if(PORTALS[world]&&PORTALS[world][w.rows[y][x]])return; /* never paint over stairs/exits */
  if(w.rows[y][x]==="Y")return; /* nor the trolley stop — transit infrastructure is sacred */
  const prev=w.rows[y][x];
  w.rows[y]=w.rows[y].slice(0,x)+ch+w.rows[y].slice(x+1);
  w.grid[y][x]=ch;
  try{const ed=JSON.parse(localStorage.getItem("mqedits")||"[]");ed.push({m:world,x,y,ch,prev});
    localStorage.setItem("mqedits",JSON.stringify(ed.slice(-400)));}catch(e){}
}
$("undoBtn").addEventListener("click",()=>{
  let ed=[];try{ed=JSON.parse(localStorage.getItem("mqedits")||"[]");}catch(e){}
  if(!ed.length){toast(T().undoEmpty,1500);return;}
  const e2=ed.pop(),w=WORLDS[e2.m||"hq"];
  const back=(e2.prev!==undefined&&e2.prev!==null)?e2.prev:w.rows0[e2.y][e2.x];
  w.rows[e2.y]=w.rows[e2.y].slice(0,e2.x)+back+w.rows[e2.y].slice(e2.x+1);
  if(w.grid[e2.y][e2.x]!=="N")w.grid[e2.y][e2.x]=back;
  try{localStorage.setItem("mqedits",JSON.stringify(ed));}catch(e){}
  toast(T().undoToast,1200);
});
function paintAt(clientX,clientY){
  if(camMode==="iso"){toast(T().isoEdit,2200);return;} /* tap→tile math is top-down */
  const r=cv.getBoundingClientRect();
  let dw=r.width,dh=r.height,ox=0,oy=0;const ar=VW/VH;
  if(dw/dh>ar){const w2=dh*ar;ox=(dw-w2)/2;dw=w2;}else{const h2=dw/ar;oy=(dh-h2)/2;dh=h2;}
  const gx=Math.floor(((clientX-r.left-ox)/dw*VW+camXg)/TS);
  const gy=Math.floor(((clientY-r.top-oy)/dh*VH+camYg)/TS);
  if(gx===px&&gy===py)return;
  if(brush==="npc"){npcAt(gx,gy);return;}
  setTile(gx,gy,brush);
}
/* swipe-to-move: touch anywhere on the game, drag = walk (floating direction), release = stop.
   In admin mode a TAP (no drag) paints; a drag still moves — best of both. */
let swActive=null,swSX=0,swSY=0,swMoved=false;
cv.addEventListener("pointerdown",e=>{
  if($("world").hidden)return;
  swActive=e.pointerId;swSX=e.clientX;swSY=e.clientY;swMoved=false;
  try{cv.setPointerCapture(e.pointerId);}catch(err){}
  e.preventDefault();
});
cv.addEventListener("pointermove",e=>{
  if(e.pointerId!==swActive)return;
  const dx=e.clientX-swSX,dy=e.clientY-swSY;
  if(Math.hypot(dx,dy)>10)swMoved=true;
  if(ctl==="swipe"){
    if(Math.hypot(dx,dy)<14){held=null;return;}
    held=Math.abs(dx)>Math.abs(dy)?(dx>0?"right":"left"):(dy>0?"down":"up");
  }
});
function swEnd(e){
  if(e.pointerId!==swActive)return;
  if(admin&&!swMoved)paintAt(e.clientX,e.clientY);
  if(ctl==="swipe")held=null;
  swActive=null;
}
cv.addEventListener("pointerup",swEnd);cv.addEventListener("pointercancel",swEnd);
try{(JSON.parse(localStorage.getItem("mqedits")||"[]")).forEach(e2=>{
  const w=WORLDS[e2&&(e2.m||"hq")];if(!w)return;
  if(e2&&w.grid[e2.y]&&w.grid[e2.y][e2.x]!=="N"&&!(e2.x<=0||e2.y<=0||e2.x>=w.W-1||e2.y>=w.H-1)){
    w.rows[e2.y]=w.rows[e2.y].slice(0,e2.x)+e2.ch+w.rows[e2.y].slice(e2.x+1);w.grid[e2.y][e2.x]=e2.ch;}});}catch(e){}
/* ---------- owner-created characters (admin ➕ brush) — per-device, like map edits.
   Records: {n:name, w:world, x, y, lk:{shirt,skin,hair,style}}. Names are data:
   length-clamped, rendered only via textContent/canvas. A name matching a dog egg
   (e.g. Sonny) joins as a beagle critter instead of a person. */
const NPCSTYLES=["cap","long","curly","spiky","pony","afro","buzz","braids","buns","broccoli","fade","mullet"];
const sanName=s2=>String(s2||"").replace(/[\u0000-\u001f<>]/g,"").trim().slice(0,24);
const hexOK=v=>typeof v==="string"&&/^#[0-9A-Fa-f]{6}$/.test(v);
function randLook(){const pick=a=>a[Math.floor(Math.random()*a.length)];
  return {shirt:pick(SWATCH.shirt),skin:pick(SWATCH.skin),hair:pick(SWATCH.hair),style:pick(NPCSTYLES)};}
let myNpcs=[];
try{myNpcs=(JSON.parse(localStorage.getItem("mqnpcs")||"[]")||[]).slice(0,12);}catch(e){}
function npcPersist(){try{localStorage.setItem("mqnpcs",JSON.stringify(myNpcs.slice(0,12)));}catch(e){}}
function spawnCustom(rec){
  const name=sanName(rec.n);if(!name)return false;
  const w=WORLDS[rec.w];if(!w)return false;
  const x=rec.x|0,y=rec.y|0;
  const eg=eggFor(name);
  if(eg&&EGGSAFE[eg].dog){ /* a legendary dog joins the critter pass */
    if(x<0||y<0||x>=w.W||y>=w.H||SOLID.has(w.grid[y][x])||w.grid[y][x]==="N")return false;
    CRIT.push({kind:"beagle",world:rec.w,x,y,fx:x,fy:y,c:"#E8C46A",name,egg:eg,
      moving:false,mt:0,dx:0,dy:0,face:1,next:0,sit:false,home:[x,y]});
    return true;}
  const lk=rec.lk||{};
  const look=hexOK(lk.shirt)&&hexOK(lk.skin)&&hexOK(lk.hair)
    ?{shirt:lk.shirt,skin:lk.skin,hair:lk.hair,style:NPCSTYLES.includes(lk.style)?lk.style:"cap"}
    :randLook();
  return !!addChill({name:{en:name,es:name},world:rec.w,x,y,look});}
myNpcs=myNpcs.filter(r=>{try{return spawnCustom(r);}catch(e){return false;}});
npcPersist();
let nmPending=null,nmEdit=null;
function despawnAt(gx,gy){ /* lift a custom creation off the map (record untouched) */
  const w=CW();
  const i=w.npcs.findIndex(n=>n.x===gx&&n.y===gy&&String(n.key).startsWith("~c"));
  if(i>=0){w.grid[gy][gx]=w.rows[gy][gx];w.npcs.splice(i,1);return true;}
  return false;}
function npcAt(gx,gy){
  const w=CW();
  if(gx<0||gy<0||gx>=w.W||gy>=w.H)return;
  /* tap an existing creation to EDIT it: rename, re-roll the look, or move out */
  const i=w.npcs.findIndex(n=>n.x===gx&&n.y===gy&&String(n.key).startsWith("~c"));
  if(i>=0){
    const rec=myNpcs.find(r=>r.w===world&&(r.x|0)===gx&&(r.y|0)===gy);
    if(!rec){toast(T().npcLease,2200);return;} /* content townsfolk have a lease — they stay */
    nmEdit={rec,gx,gy};nmPending=null;
    $("nmTitle").textContent=T().nmEditTitle;$("nmLb").textContent=T().nmLb;
    $("nmOk").textContent=T().nmSave;$("nmCancel").textContent=T().nmCancel;
    $("nmLook").textContent=T().nmLook;$("nmOut").textContent=T().nmOut;
    $("nmLook").hidden=false;$("nmOut").hidden=false;
    $("nmName").value=rec.n;$("npcMaker").hidden=false;
    setTimeout(()=>$("nmName").focus(),60);return;}
  const ci=CRIT.findIndex(cr=>cr.kind==="beagle"&&cr.world===world&&cr.home[0]===gx&&cr.home[1]===gy);
  if(ci>=0){CRIT.splice(ci,1);
    myNpcs=myNpcs.filter(r=>!(r.w===world&&(r.x|0)===gx&&(r.y|0)===gy));npcPersist();
    toast(T().npcGone,1800);return;}
  if(SOLID.has(w.grid[gy][gx])||w.grid[gy][gx]==="N")return;
  if(myNpcs.length>=12){toast(T().npcFull,2400);return;}
  nmPending={w:world,x:gx,y:gy};nmEdit=null;
  $("nmTitle").textContent=T().nmTitle;$("nmLb").textContent=T().nmLb;
  $("nmOk").textContent=T().nmOk;$("nmCancel").textContent=T().nmCancel;
  $("nmLook").hidden=true;$("nmOut").hidden=true;
  $("nmName").value="";$("npcMaker").hidden=false;
  setTimeout(()=>$("nmName").focus(),60);
}
$("nmCancel").addEventListener("click",()=>{$("npcMaker").hidden=true;nmPending=null;nmEdit=null;});
$("nmLook").addEventListener("click",()=>{ /* re-roll the look, panel stays open — roll till it's them */
  if(!nmEdit)return;
  nmEdit.rec.lk=randLook();despawnAt(nmEdit.gx,nmEdit.gy);spawnCustom(nmEdit.rec);npcPersist();
  toast(T().npcLook,1400);});
$("nmOut").addEventListener("click",()=>{
  if(!nmEdit)return;
  despawnAt(nmEdit.gx,nmEdit.gy);
  myNpcs=myNpcs.filter(r=>r!==nmEdit.rec);npcPersist();
  $("npcMaker").hidden=true;nmEdit=null;toast(T().npcGone,1800);});
$("nmOk").addEventListener("click",()=>{
  if(nmEdit){ /* save edits: rename can even re-trigger an egg (Sonny transforms) */
    const name=sanName($("nmName").value);
    if(name){nmEdit.rec.n=name;despawnAt(nmEdit.gx,nmEdit.gy);spawnCustom(nmEdit.rec);npcPersist();
      const eg2=eggFor(name);toast(eg2?EGGSAFE[eg2].lines[lang][0]:T().npcSaved,eg2?3400:1800);}
    $("npcMaker").hidden=true;nmEdit=null;return;}
  const name=sanName($("nmName").value);
  if(!name||!nmPending){$("npcMaker").hidden=true;nmPending=null;return;}
  const rec={n:name,w:nmPending.w,x:nmPending.x,y:nmPending.y,lk:randLook()};
  if(spawnCustom(rec)){myNpcs.push(rec);npcPersist();
    const eg=eggFor(name);
    toast(eg?EGGSAFE[eg].lines[lang][0]:T().npcMade(name),eg?3400:2200);}
  $("npcMaker").hidden=true;nmPending=null;
});
$("nmName").addEventListener("keydown",e=>{if(e.key==="Enter")$("nmOk").click();});
/* city growth application: stages follow completed La Obra quests (12, 13) */
/* Rewind a world to the map it shipped with. Station NPCs go back to where the map
   put them (Lupe included); chill townsfolk — the content pack's and the owner's —
   keep the spots they were placed on. */
function rebuildWorld(id){
  const w=WORLDS[id],defs=WNPC[id]||{};
  w.rows=w.rows0.slice();
  w.grid=w.rows.map(r=>r.split(""));
  w.rows.forEach((row,y)=>[...row].forEach((ch,x)=>{
    if(defs[ch]){const n=w.npcs.find(m=>m.key===ch);if(n){n.x=x;n.y=y;}}}));
  w.npcs.forEach(n=>{if(w.grid[n.y]&&w.grid[n.y][n.x]!==undefined)w.grid[n.y][n.x]="N";});
}
/* El Mercado's facade goes up when Week One closes. */
function applyMercado(){
  if(typeof MERCADO==="undefined"||!mercadoOpen())return;
  const w=WORLDS.st;
  MERCADO.forEach(([y,x,ch])=>{
    if(!w.grid[y]||w.grid[y][x]==="N")return;
    w.rows[y]=w.rows[y].slice(0,x)+ch+w.rows[y].slice(x+1);w.grid[y][x]=ch;});
}
/* The city is a pure function of progress: rewind the street, then build back
   exactly what has been earned. So "New game +" really does hand you an empty lot —
   no Studio you did not raise, no mercado you did not open. */
function applyGrowth(){rebuildWorld("st");applyObra();applyMercado();}
function applyObra(){const s=(done.has(12)?1:0)+(done.has(13)?1:0);
  const w=WORLDS.st;
  for(let k=1;k<=s;k++)OBRA[k].forEach(([y,x,ch])=>{
    if(w.grid[y][x]!=="N"&&w.rows[y][x]!=="L"){w.rows[y]=w.rows[y].slice(0,x)+ch+w.rows[y].slice(x+1);w.grid[y][x]=ch;}});
  if(s>=2){
    /* the finished building is solid; its inside becomes the Studio (lo). Lupe moves streetside next to Güero. */
    const lu=w.npcs.find(n=>n.key==="e");
    if(lu&&!(lu.x===7&&lu.y===7)){
      if(w.grid[lu.y]&&w.grid[lu.y][lu.x]==="N"){w.grid[lu.y][lu.x]="B";
        w.rows[lu.y]=w.rows[lu.y].slice(0,lu.x)+"B"+w.rows[lu.y].slice(lu.x+1);}
      lu.x=7;lu.y=7;w.grid[7][7]="N";
    }
    for(let y=6;y<=8;y++)for(let x=15;x<=28;x++){
      if(w.grid[y][x]!=="N"){w.rows[y]=w.rows[y].slice(0,x)+"B"+w.rows[y].slice(x+1);w.grid[y][x]="B";}}
  }
  /* the site can grow over the tile the hero stands on — step them out to the Studio's
     front door. Belt-and-braces: the same rescue fires if growth ever CUTS OFF the tile
     they stand on (walkable but enclosed), so no future OBRA stage can wall anyone in. */
  if(world==="st"&&(isSolid(px,py)||!obraReach(px,py))){px=fx=21;py=fy=4;dir="down";held=null;moving=false;}
  if(SOLID.has(w.grid[PIG.y][PIG.x])){PIG.x=PIG.fx=4;PIG.y=PIG.fy=1;PIG.moving=false;} /* Paloma will not be bricked into the Studio */
}
function obraReach(tx,ty){ /* BFS from the Studio's doorstep — open ground at every stage */
  const w=WORLDS.st,seen=new Set(["21,4"]),q=[[21,4]];
  while(q.length){const[x,y]=q.shift();
    if(x===tx&&y===ty)return true;
    [[1,0],[-1,0],[0,1],[0,-1]].forEach(([dx,dy])=>{const nx=x+dx,ny=y+dy,k=nx+","+ny;
      if(seen.has(k)||nx<0||ny<0||nx>=w.W||ny>=w.H||SOLID.has(w.grid[ny][nx])||w.grid[ny][nx]==="N")return;
      seen.add(k);q.push([nx,ny]);});}
  return false;
}
/* ---------- boot ---------- */
const SV=loadSave();
if(SV&&SV.n){$("continueBtn").hidden=false;
  $("continueBtn").textContent=T().contBtn(SV.n,SV.xp,SV.d.length);
  $("continueBtn").addEventListener("click",()=>{
    heroName=SV.n;cls=SV.c||"";look=SV.lk||look;xp=SV.xp||0;hearts=SV.he??3;done=new Set(SV.d||[]);
    treats=SV.tr||0;fredQ=SV.fq||0;chSeen=SV.cs||0;
    marks=(SV.mk&&typeof SV.mk==="object")?SV.mk:{}; /* pre-grade saves start unmarked */
    wear=(SV.wr&&typeof SV.wr==="object")?{bandana:null,collar:null,cape:null,...SV.wr}
        :{bandana:fredQ>=2?"#C0392B":null,collar:null,cape:null}; /* pre-wardrobe saves: keep the earned red bandana */
    qa=(SV.qa&&typeof SV.qa==="object")?SV.qa:{}; /* pre-retry saves: done quests stay done, credited as-is */
    wearCat=(SV.wc&&typeof SV.wc==="object")?{bandana:null,collar:null,...SV.wc}:{bandana:null,collar:null};
    world=WORLDS[SV.w]?SV.w:"hq";
    px=fx=SV.px??10;py=fy=SV.py??11;
    applyGrowth();
    if(px>=CW().W||py>=CW().H||isSolid(px,py)){world="hq";px=fx=10;py=fy=11;}
    if(chDue()){finish(livesOn()&&hearts<=0);$("intro").hidden=true;$("hud").hidden=false;$("xpbarwrap").hidden=false;hud();}
    else enterWorld(false);
  });
}
/* Trolley Pass arrival: a #save= hash offers to board; never overwrites without the tap */
(function(){
  const pass=readPass();
  if(!pass)return;
  const t=T();
  $("tpFoundLb").textContent=t.tpFoundLb;
  $("tpFoundTx").textContent=t.tpFoundTx(pass.s.n,pass.s.xp||0,(pass.s.d||[]).length,QEN.length)+(SV&&SV.n?" "+t.tpReplace(SV.n):"");
  $("tpBoard").textContent=t.tpBoard;$("tpSkip").textContent=t.tpSkip;
  $("tpFound").hidden=false;
  $("tpBoard").addEventListener("click",()=>{
    try{localStorage.setItem("mq1",JSON.stringify(pass.s));
      if(pass.l)localStorage.setItem("mqlang",pass.l);}catch(e){}
    stripPassHash();location.reload();
  });
  $("tpSkip").addEventListener("click",()=>{stripPassHash();$("tpFound").hidden=true;});
})();
applyAdmin();applyStakes();applyLang();applyCtl();applyTheme();
$("verTag").textContent="Meridian Quest · "+(typeof GAMEV!=="undefined"?GAMEV:"dev");
try{if(sessionStorage.getItem("mqupd")==="1"){sessionStorage.removeItem("mqupd");
  setTimeout(()=>toast("⬆️ "+(typeof GAMEV!=="undefined"?GAMEV:"")+" — "+T().updToast,3200),900);}}catch(e){}
if(NET.enabled)NET.boot();
requestAnimationFrame(ts=>{last=ts;loop(ts);});
sizeCanvas();
