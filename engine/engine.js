/* =========================================================
   MERIDIAN QUEST ENGINE — renderer, movement, portals, saves,
   validators, animals, themes, admin tools, the NET seam.
   Game data lives in content/<game>/ (strings, quests, npcs,
   maps, config), loaded BEFORE this file. A new gifted game is
   a new content folder — this file stays untouched.
   ========================================================= */
const FQ=()=>lang==="es"?FQES:FQEN;
const TS=32;
const SOLID=new Set(["#","D","K","P","B","F","G","C","X","T","W","V","A","U","Q"]);
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
/* ---------- state ---------- */
const SHIRTS={architect:"#E0A430",diplomat:"#8B5CF6",operator:"#2AA47C"};
let lang="en";try{lang=localStorage.getItem("mqlang")||"en";}catch(e){}
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
const npcName=k=>NPCN[lang][k];
const lvlIdx=()=>{let i=0;LEVELS.forEach((t2,j)=>{if(xp>=t2)i=j;});return i;};
const lvlName=()=>T().levels[lvlIdx()];
function hud(){const hs="❤".repeat(Math.max(0,hearts))+"♡".repeat(3-Math.max(0,hearts));
  $("ptag").textContent=`${heroName} · ${lvlName()}`;$("hearts").textContent=hs;$("xp").textContent=`${xp} XP`;
  $("xpfill").style.width=Math.min(100,xp/MAXXP*100)+"%";
  $("status").textContent=`${hs}  ${xp}XP`;}
/* save */
function save(){const st={n:heroName,c:cls,lk:look,xp,he:hearts,d:[...done],px,py,tr:treats,fq:fredQ,w:world,wr:wear,wc:wearCat,qa};
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
let toastT=null,toastQ=[];
function toast(msg,ms){const el=$("toast");
  if(el.classList.contains("on")){toastQ.push([msg,ms]);return;}
  el.textContent=msg;el.classList.add("on");
  clearTimeout(toastT);toastT=setTimeout(()=>{el.classList.remove("on");
    if(toastQ.length){const[m,d]=toastQ.shift();setTimeout(()=>toast(m,d),300);}},ms||2600);}
let lastBump=0;
const pendingAt=n=>n.q.find(qi=>!done.has(qi));
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
function draw(){
  const w=CW();
  const camX=Math.max(0,Math.min(w.W*TS-VW,fx*TS+TS/2-VW/2));
  const camY=Math.max(0,Math.min(Math.max(0,w.H*TS-VH),fy*TS+TS/2-VH/2));
  camXg=camX;camYg=camY;
  ctx.fillStyle="#241F2E";ctx.fillRect(0,0,VW,VH);
  const x0=Math.floor(camX/TS),y0=Math.floor(camY/TS);
  for(let y=y0;y<=Math.min(w.H-1,y0+9);y++)for(let x=x0;x<=Math.min(w.W-1,x0+11);x++){
    const ch=w.rows[y][x],sx=x*TS-camX,sy=y*TS-camY;
    if(world==="st")ctx.fillStyle=((x+y)%2?"#C6C4BB":"#BFBDB4");
    else if(world==="lo")ctx.fillStyle=((x+y)%2?"#D9DCE0":"#D1D5DA");
    else ctx.fillStyle=((x+y)%2?C.floor:C.floorAlt);
    ctx.fillRect(sx,sy,TS,TS);
    if(ch==="#"){ctx.fillStyle=C.wall;ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=C.wallTop;ctx.fillRect(sx,sy,TS,6);}
    else if(ch==="B"){ctx.fillStyle="#5C4A50";ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle="#6E5A60";ctx.fillRect(sx,sy,TS,5);
      ctx.fillStyle="#8E7A80";ctx.fillRect(sx+5,sy+10,8,9);ctx.fillRect(sx+19,sy+10,8,9);}
    else if(ch==="R"){ctx.fillStyle=C.rug;ctx.fillRect(sx+2,sy+2,TS-4,TS-4);}
    else if(ch==="≈"){ctx.fillStyle="#54555B";ctx.fillRect(sx,sy,TS,TS);
      if(y%2===0){ctx.fillStyle="#6A6B72";ctx.fillRect(sx+4,sy+15,10,2);}}
    else if(ch==="-"){ctx.fillStyle="#54555B";ctx.fillRect(sx,sy,TS,TS);
      ctx.fillStyle="#D8D6CE";ctx.fillRect(sx+3,sy+4,TS-6,5);ctx.fillRect(sx+3,sy+14,TS-6,5);ctx.fillRect(sx+3,sy+24,TS-6,5);}
    else if(ch==="F"){ctx.fillStyle="#A87F4F";for(let i=0;i<4;i++)ctx.fillRect(sx+2+i*8,sy+4,6,TS-8);
      ctx.fillStyle="#8B6A42";ctx.fillRect(sx,sy+8,TS,3);ctx.fillRect(sx,sy+21,TS,3);}
    else if(ch==="G"){ctx.fillStyle="#C98A2D";ctx.fillRect(sx+4,sy+2,4,TS-4);ctx.fillRect(sx+24,sy+2,4,TS-4);
      ctx.fillRect(sx+4,sy+6,24,4);ctx.fillRect(sx+4,sy+22,24,4);}
    else if(ch==="C"){ctx.fillStyle="#E0662B";ctx.beginPath();ctx.moveTo(sx+16,sy+8);ctx.lineTo(sx+23,sy+26);ctx.lineTo(sx+9,sy+26);ctx.closePath();ctx.fill();
      ctx.fillStyle="#F4F1EA";ctx.fillRect(sx+11.5,sy+17,9,3);}
    else if(ch==="X"){ctx.fillStyle="#E7C25A";ctx.fillRect(sx+4,sy+4,TS-8,TS-12);ctx.fillStyle="#6B5210";
      ctx.font="14px serif";ctx.textAlign="center";ctx.fillText("🚧",sx+16,sy+19);ctx.textAlign="start";
      ctx.fillStyle="#8B6A42";ctx.fillRect(sx+14,sy+24,4,6);}
    else if(ch==="1"){ctx.fillStyle="#8A8474";for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#9A947F":"#7E7867";ctx.fillRect(sx+3,sy+4+i*6,TS-6,6);}
      ctx.fillStyle="#4A331F";ctx.fillRect(sx+2,sy+2,2,TS-4);ctx.fillRect(sx+28,sy+2,2,TS-4);}
    else if(ch==="2"){ctx.fillStyle="#E0B45C";ctx.font="700 15px sans-serif";ctx.textAlign="center";
      ctx.fillText("»",sx+16,sy+21);ctx.textAlign="start";}
    else if(ch==="Y"){ /* trolley stop: pole + sign + bench — the town's transit spine */
      ctx.fillStyle="#3B3F45";ctx.fillRect(sx+6,sy+5,3,22);
      ctx.fillStyle="#C0392B";ctx.fillRect(sx+2,sy+2,15,9);
      ctx.strokeStyle="rgba(15,12,20,.4)";ctx.lineWidth=1;ctx.strokeRect(sx+2,sy+2,15,9);
      ctx.fillStyle="#F2E8D8";ctx.font="700 7px monospace";ctx.fillText("MQT",sx+4,sy+9);
      ctx.fillStyle="#8A6B3F";ctx.fillRect(sx+14,sy+21,15,3);
      ctx.fillRect(sx+15,sy+24,2,5);ctx.fillRect(sx+26,sy+24,2,5);}
    else if(ch==="Q"){ /* La Cocina storefront: terracotta facade + striped awning + window */
      ctx.fillStyle="#A8503A";ctx.fillRect(sx,sy,TS,TS);
      for(let i=0;i<4;i++){ctx.fillStyle=i%2?"#F2E8D8":"#C0392B";ctx.fillRect(sx+i*8,sy,8,7);}
      ctx.fillStyle="#7A3527";ctx.fillRect(sx,sy+7,TS,2);
      ctx.fillStyle="#F5DFA9";ctx.fillRect(sx+8,sy+14,16,10);
      ctx.fillStyle="#7A3527";ctx.fillRect(sx+15,sy+14,2,10);}
    else if(ch==="+"||ch==="E"||ch==="L"||ch==="O"){
      ctx.fillStyle=C.doorFrame;ctx.fillRect(sx+2,sy,TS-4,TS);
      ctx.fillStyle=C.doorWood;ctx.fillRect(sx+4,sy+2,11,TS-4);
      ctx.fillStyle=C.doorWood2;ctx.fillRect(sx+17,sy+2,11,TS-4);
      ctx.fillStyle="rgba(0,0,0,.15)";ctx.fillRect(sx+15,sy+2,2,TS-4);
      ctx.fillStyle="#E0B45C";
      ctx.beginPath();ctx.arc(sx+12.5,sy+17,1.7,0,7);ctx.fill();
      ctx.beginPath();ctx.arc(sx+19.5,sy+17,1.7,0,7);ctx.fill();
    }
    else if(ch==="D"){ctx.fillStyle=C.desk;ctx.fillRect(sx+2,sy+8,TS-4,TS-12);ctx.fillStyle=C.deskTop;ctx.fillRect(sx+2,sy+4,TS-4,8);
      ctx.fillStyle="#DDE4EA";ctx.fillRect(sx+8,sy+6,10,5);}
    else if(ch==="K"){ctx.fillStyle=C.counter;ctx.fillRect(sx+2,sy+6,TS-4,TS-10);ctx.font="12px serif";ctx.fillText("☕",sx+9,sy+22);}
    else if(ch==="P"){ctx.fillStyle=C.pot;ctx.fillRect(sx+10,sy+18,12,10);ctx.fillStyle=C.plant;
      ctx.beginPath();ctx.arc(sx+16,sy+13,8,0,7);ctx.fill();}
    else if(ch==="T"){ctx.fillStyle="#7A4E2C";ctx.beginPath();ctx.arc(sx+16,sy+16,11,0,7);ctx.fill();
      ctx.fillStyle="#F2E8D8";ctx.beginPath();ctx.arc(sx+16,sy+16,9,0,7);ctx.fill();
      ctx.fillStyle="#C0392B";ctx.beginPath();ctx.arc(sx+16,sy+16,3,0,7);ctx.fill();}
    else if(ch==="W"){ctx.fillStyle="#AEB6BE";ctx.fillRect(sx+4,sy+2,TS-8,TS-4);
      ctx.fillStyle="#8E969E";ctx.fillRect(sx+4,sy+14,TS-8,2);
      ctx.fillStyle="#5F676F";ctx.fillRect(sx+21,sy+5,3,7);ctx.fillRect(sx+21,sy+18,3,7);}
    else if(ch==="V"){ctx.fillStyle="#3A3F46";ctx.fillRect(sx+3,sy+4,TS-6,TS-8);
      ctx.fillStyle="#23272C";[[10,12],[22,12],[10,22],[22,22]].forEach(p=>{
        ctx.beginPath();ctx.arc(sx+p[0],sy+p[1],3.4,0,7);ctx.fill();});
      ctx.fillStyle="#E0662B";ctx.fillRect(sx+14,sy+6,4,2);}
    else if(ch==="A"){ /* drafting table: tilted board, blueprint sheet, T-square */
      ctx.fillStyle="#8A6F4D";ctx.fillRect(sx+13,sy+20,6,8);
      ctx.fillStyle="#B08B5A";ctx.beginPath();ctx.moveTo(sx+4,sy+20);ctx.lineTo(sx+28,sy+16);ctx.lineTo(sx+28,sy+6);ctx.lineTo(sx+4,sy+10);ctx.closePath();ctx.fill();
      ctx.fillStyle="#2E5FA8";ctx.beginPath();ctx.moveTo(sx+7,sy+18.6);ctx.lineTo(sx+25,sy+15.4);ctx.lineTo(sx+25,sy+8);ctx.lineTo(sx+7,sy+11);ctx.closePath();ctx.fill();
      ctx.strokeStyle="#DDE8F5";ctx.lineWidth=0.8;
      ctx.beginPath();ctx.moveTo(sx+9,sy+12);ctx.lineTo(sx+22,sy+10);ctx.moveTo(sx+9,sy+14.5);ctx.lineTo(sx+22,sy+12.5);ctx.moveTo(sx+9,sy+17);ctx.lineTo(sx+18,sy+15.4);ctx.stroke();}
    else if(ch==="U"){ /* blueprint wall panel */
      ctx.fillStyle=C.wall;ctx.fillRect(sx,sy,TS,TS);ctx.fillStyle=C.wallTop;ctx.fillRect(sx,sy,TS,6);
      ctx.fillStyle="#2E5FA8";ctx.fillRect(sx+4,sy+9,TS-8,18);
      ctx.strokeStyle="#DDE8F5";ctx.lineWidth=0.9;
      ctx.strokeRect(sx+8,sy+13,9,7);ctx.beginPath();ctx.moveTo(sx+8,sy+23);ctx.lineTo(sx+24,sy+23);ctx.moveTo(sx+20,sy+13);ctx.lineTo(sx+24,sy+17);ctx.stroke();
      ctx.fillStyle="#E0B45C";[[5,10],[26,10],[5,25],[26,25]].forEach(p=>ctx.fillRect(sx+p[0],sy+p[1],1.6,1.6));}
  }
  w.npcs.forEach(n=>{
    const sx=n.x*TS-camX,sy=n.y*TS-camY;
    if(sx<-TS||sy<-TS||sx>VW||sy>VH)return;
    drawPerson(ctx,sx,sy,NPCLOOK[n.key],{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(pendingAt(n)!==undefined){ctx.font="700 13px sans-serif";ctx.fillStyle="#E0B45C";ctx.textAlign="center";
      ctx.fillText("❗",sx+16,sy+2+Math.sin(Date.now()/250)*2);ctx.textAlign="start";}
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
  drawPerson(ctx,fx*TS-camX,fy*TS-camY,look,{dir,bob:moving?Math.sin(bob)*2:0,moving});
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
function drawPerson(g,sx,sy,lk,o){
  o=o||{};const b=o.bob||o.idle||0,d=o.dir||"down",bh=b*0.5;
  g.fillStyle="rgba(0,0,0,.2)";g.beginPath();g.ellipse(sx+16,sy+28,8,3.5,0,0,7);g.fill();
  g.fillStyle=lk.outfit==="formal"?"#23262E":"#2E3547";
  g.fillRect(sx+11,sy+20+b,4,7);g.fillRect(sx+17,sy+20-(o.moving?b:0),4,7);
  g.fillStyle=lk.shirt;
  g.beginPath();g.roundRect(sx+9,sy+9+bh,14,13,4);g.fill();
  g.strokeStyle="rgba(15,12,20,.35)";g.lineWidth=.8;g.stroke();
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
  if(d!=="up"){g.fillStyle="#26202B";g.fillRect(sx+13.5+ex,sy+4.5+ey+bh,1.6,1.6);g.fillRect(sx+17+ex,sy+4.5+ey+bh,1.6,1.6);}
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
  dogUpdate(dt,ts);catUpdate(dt,ts);pigUpdate(dt,ts);loroTick(ts);fredCheck();
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
    const L=(T().chat||{})[tb.dataset.chatn]||[];
    if(L.length)toast("💬 "+L[Math.floor(Math.random()*L.length)],2800);return;}
  questStart(+tb.dataset.qi);});
let petTarget=null;
function fredCheck(){ /* now the generic animal-interaction check: every creature is reachable and greetable */
  let tgt=null,label="";
  if(!$("world").hidden&&!moving){
    if(world==="hq"&&!DOG.moving&&Math.abs(DOG.x-px)+Math.abs(DOG.y-py)===1){tgt="fred";label=T().treatLb;}
    else if(world==="lc"&&!CAT.moving&&Math.abs(CAT.x-px)+Math.abs(CAT.y-py)===1){tgt="cat";label=T().petCat;}
    else if(world==="st"&&!PIG.moving&&Math.abs(PIG.x-px)+Math.abs(PIG.y-py)===1){tgt="pig";label=T().petPig;}
    else if(world==="st"&&Math.abs(LORO.x-px)+Math.abs(LORO.y-py)<=2){tgt="loro";label=T().petLoro;}
  }
  petTarget=tgt;$("treat").hidden=!tgt;
  if(tgt)$("treat").textContent=label;
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
    awardXP(10);hud();save();setTimeout(()=>{node=c.next;nodeShow();},550);return;}
  const o=c.out,before=qLvl0; /* level at quest START — a level crossed on a follow-up step still gets announced here */
  [...$("choices").children].forEach(b=>b.disabled=true);
  /* retries exist, so a miss explains itself but never reveals the right answer — the codex teaches, the shuffle re-tests */
  if(o.r==="ok")btn.classList.add("right");
  else btn.classList.add(o.r==="mid"?"midpick":"wrong");
  const xp0=xp;
  if(o.r==="ok")awardXP(10);else if(o.r==="mid")awardXP(5);else{hearts--;awardXP(0);}
  const gained=xp-xp0; /* the header claims only what this pick actually paid — retries after partial credit pay the difference */
  logDecision(o);
  const solved=o.r==="ok";
  const retry=!solved&&hearts>0?`<p class="beat">${cur>=0?T().retryNote:T().retryNoteFred}</p>`:"";
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
  $("next").textContent=hearts<=0?T().nextDoom:(done.size===AQ().length?T().nextEnd:T().nextBack);
  $("next").hidden=false;
}
$("next").addEventListener("click",()=>{
  if(hearts<=0){wasFs=false;gameover();return;}
  if(done.size===AQ().length){wasFs=false;finish();return;}
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
  xp=0;hearts=3;done=new Set();qa={};world="hq";px=fx=10;py=fy=11;dir="down";
  save();enterWorld(true);
});
/* ---------- start/end ---------- */
function gameover(){
  $("card").hidden=true;$("world").hidden=true;
  $("endTitle").textContent=T().goTitle;
  $("endScore").textContent=T().goScore(xp,done.size,AQ().length);
  $("epi").textContent=T().goEpi;
  $("replay").textContent=T().replay;
  $("end").hidden=false;
}
function finish(){
  $("card").hidden=true;$("world").hidden=true;
  $("endTitle").textContent=`🏆 ${lvlName()}`;
  $("endScore").textContent=T().endScore(xp,MAXXP,Math.max(0,hearts));
  /* every finished week ends at full XP now (retry-until-correct), so the ending is judged by hearts: bad calls leave scars */
  const h=Math.max(0,hearts);
  $("epi").textContent = h>=3?T().epi1 : h===2?T().epi2 : T().epi3;
  $("replay").textContent=T().replay;
  $("end").hidden=false;
}
$("replay").addEventListener("click",()=>{xp=0;hearts=3;done=new Set();qa={};world="hq";px=fx=10;py=fy=11;dir="down";
  save();$("end").hidden=true;$("world").hidden=false;setWorldTag();hud();checkTalk();
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
let customTheme=null;
try{customTheme=sanitizeTheme(JSON.parse(localStorage.getItem("mqcustom")||"null"));}catch(e){}
let themeName="meridian";try{themeName=localStorage.getItem("mqtheme")||"meridian";}catch(e){}
if(!THEMES.hasOwnProperty(themeName)&&themeName!=="custom")themeName="meridian";
const darkMq=window.matchMedia("(prefers-color-scheme: dark)");
function applyTheme(){
  if(themeName==="custom"&&!customTheme)themeName="meridian";
  const t2=themeName==="custom"?customTheme:THEMES[themeName],root=document.documentElement;
  THEME_KEYS.forEach(k2=>root.style.removeProperty("--"+k2));
  if(t2){const set2=darkMq.matches?t2.dark:t2.light;
    Object.entries(set2).forEach(([k2,v])=>root.style.setProperty("--"+k2,v));}
  document.querySelectorAll("#themeRow button,#themeRow2 button[data-th]")
    .forEach(b=>b.setAttribute("aria-pressed",b.dataset.th===themeName?"true":"false"));
  $("thCustom").hidden=!customTheme;
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
let teMode="light";
function saveCustom(){try{localStorage.setItem("mqcustom",JSON.stringify(customTheme));}catch(e){}}
function meridianVars(mode){ /* read the built-in palette out of the stylesheet */
  const root=document.documentElement,prev=root.dataset.theme;
  THEME_KEYS.forEach(k2=>root.style.removeProperty("--"+k2));
  root.dataset.theme=mode;
  const cs=getComputedStyle(root),o={};
  THEME_KEYS.forEach(k2=>o[k2]=cs.getPropertyValue("--"+k2).trim());
  if(prev)root.dataset.theme=prev;else delete root.dataset.theme;
  return o;
}
function cloneTheme(name){
  customTheme=name==="meridian"?{light:meridianVars("light"),dark:meridianVars("dark")}
    :JSON.parse(JSON.stringify(THEMES[name]));
  themeName="custom";saveCustom();applyTheme();teRender();
}
function teRender(){
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
$("teClose").addEventListener("click",()=>{$("themeEd").hidden=true;});
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
  $("mapTitle").textContent=t.mapTitle;$("mapClose").textContent=t.tlClose;
  $("setTitle").textContent=t.setTitle;$("lbCtl").textContent=t.lbCtl;
  $("optSwipe").textContent=t.swipeB;$("optJoy").textContent=t.joyB;$("optPad").textContent=t.padB;
  $("lbLang").textContent=t.lbLang;$("lbAdm").textContent=t.lbAdm;$("admOff").textContent=t.admOff;$("admOn").textContent=t.admOn;
  $("lbTheme").textContent=t.lbTheme;
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
function logDecision(o){dlog.push({t:Date.now(),quest:curQ.title,concept:o.concept,result:o.r});dlog=dlog.slice(-200);
  try{localStorage.setItem("mqdlog",JSON.stringify(dlog));}catch(e){}}
function exportData(){return JSON.stringify({schema:"meridian-export-v1",exported:new Date().toISOString(),
  player:{name:heroName,class:cls,look},
  progress:{xp,level:lvlName(),hearts,questsDone:[...done],location:world},
  frederick:{name:"Frederick",treats,bandana:fredQ>=2,carePackUnlocked:fredQ>=1},
  decisions:dlog,
  futureExportTypes:["decision-report.docx","conversation-export.md","training-transcript.csv"]},null,1);}
/* Frederick's care pack: the secret quest's lesson as a real deliverable —
   a care sheet you can copy, plus recurring reminders as a downloadable .ics */
let exMode="json";
let petCfg={n:"Frederick",am:"07:30",pm:"18:00"};
try{const p=JSON.parse(localStorage.getItem("mqpet")||"null");if(p&&p.n)petCfg=p;}catch(e){}
function petSave(){try{localStorage.setItem("mqpet",JSON.stringify(petCfg));}catch(e){}}
["petName","petAm","petPm"].forEach((id,i)=>$(id).addEventListener("input",()=>{
  const v=$(id).value.trim();
  if(i===0)petCfg.n=v||"Frederick";else if(i===1)petCfg.am=v||"07:30";else petCfg.pm=v||"18:00";
  petSave();$("exArea").value=T().carePack(heroName,treats,petCfg);
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
  $("exArea").value=exMode==="care"?T().carePack(heroName,treats,petCfg):exportData();
  $("exHint").textContent=exMode==="care"?T().careHint:T().expHint;
  $("exTabJson").setAttribute("aria-pressed",exMode==="json"?"true":"false");
  $("exTabCare").setAttribute("aria-pressed",exMode==="care"?"true":"false");
  $("exIcs").hidden=exMode!=="care";
  $("careForm").hidden=exMode!=="care";
  $("petName").value=petCfg.n;$("petName").placeholder=T().petPh;
  $("petAm").value=petCfg.am;$("petPm").value=petCfg.pm;
}
$("openExp").addEventListener("click",()=>{$("settings").hidden=true;
  $("exTabCare").hidden=fredQ<1;if(fredQ<1)exMode="json";
  renderExport();$("exporter").hidden=false;});
$("exTabJson").addEventListener("click",()=>{exMode="json";renderExport();});
$("exTabCare").addEventListener("click",()=>{exMode="care";renderExport();});
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
/* ---------- village map: a real town plan drawn from the actual streets ---------- */
function drawTown(){
  const mc=$("mapcv"),g2=mc.getContext("2d"),w=WORLDS.st,s=10;
  mc.width=w.W*s;mc.height=w.H*s+14;
  g2.fillStyle="#EFE9DA";g2.fillRect(0,0,mc.width,mc.height);
  const col={"≈":"#4A4B52","-":"#9A9B9E",".":"#D5D2C6","B":"#5C4A50","Q":"#B0563A","F":"#B0895B","G":"#C98A2D","C":"#E0662B","X":"#E7C25A","P":"#3E7C4F","E":"#E0B45C","L":"#E0B45C","O":"#E0B45C","1":"#8A8474","2":"#E0B45C","Y":"#C0392B"};
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    g2.fillStyle=col[w.rows[y][x]]||"#D5D2C6";g2.fillRect(x*s,y*s,s,s);}
  const stage=(done.has(12)?1:0)+(done.has(13)?1:0),es=lang==="es";
  g2.textAlign="center";g2.font="700 10px sans-serif";
  g2.fillStyle="#F2E8D8";g2.fillText("MERIDIAN HQ  (⇧ "+(es?"PISO 2":"FLOOR 2")+")",15*s,0.75*s);
  g2.fillStyle="#F2E8D8";g2.fillText("LA COCINA",6.5*s,5.75*s);
  g2.fillStyle=stage>=2?"#F2E8D8":"#3A2F17";
  g2.fillText(stage>=2?(es?"LA OBRA · ESTUDIO":"LA OBRA · STUDIO"):(es?"🚧 OBRA":"🚧 SITE"),22*s,7.7*s);
  g2.fillStyle="#6B5210";g2.font="700 9px sans-serif";
  g2.fillText(es?"LOTE: EL MERCADO":"LOT: EL MERCADO",4.5*s,13.7*s);
  g2.fillText(es?"LOTE RESERVADO":"RESERVED LOT",25.5*s,13.7*s);
  g2.fillStyle="#6B5210";g2.font="700 8px sans-serif";
  g2.fillText("CALLE DOS →",27*s,1.7*s);
  g2.fillText("🚋",0.5*s+3,1.8*s); /* trolley stop, west terminus */
  g2.fillStyle="#8A8474";g2.font="600 8px sans-serif";
  g2.fillText(es?"puertas y escaleras en dorado · ◉ estás aquí":"doors & stairs in gold · ◉ you are here",mc.width/2,w.H*s+10);
  let dot=null;
  if(world==="st")dot=[fx,fy];
  else if(world==="hq"||world==="f2")dot=[14,0];
  else if(world==="lc")dot=[6,5];
  else if(world==="lo")dot=[21,5];
  else if(world==="ex")dot=[29,1];
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
  $("admOn").setAttribute("aria-pressed",admin?"true":"false");
  $("admOff").setAttribute("aria-pressed",admin?"false":"true");
  try{localStorage.setItem("mqadmin",admin?"1":"0");}catch(e){}
}
$("admOn").addEventListener("click",()=>{admin=true;applyAdmin();toast(T().admToast,3400);});
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
  const r=cv.getBoundingClientRect();
  let dw=r.width,dh=r.height,ox=0,oy=0;const ar=VW/VH;
  if(dw/dh>ar){const w2=dh*ar;ox=(dw-w2)/2;dw=w2;}else{const h2=dw/ar;oy=(dh-h2)/2;dh=h2;}
  const gx=Math.floor(((clientX-r.left-ox)/dw*VW+camXg)/TS);
  const gy=Math.floor(((clientY-r.top-oy)/dh*VH+camYg)/TS);
  if(gx===px&&gy===py)return;
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
/* city growth application: stages follow completed La Obra quests (12, 13) */
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
  /* the site can grow over the tile the hero stands on — step them out to the Studio's front door */
  if(world==="st"&&isSolid(px,py)){px=fx=21;py=fy=4;dir="down";held=null;moving=false;}
}
/* ---------- boot ---------- */
const SV=loadSave();
if(SV&&SV.n){$("continueBtn").hidden=false;
  $("continueBtn").textContent=T().contBtn(SV.n,SV.xp,SV.d.length);
  $("continueBtn").addEventListener("click",()=>{
    heroName=SV.n;cls=SV.c||"";look=SV.lk||look;xp=SV.xp||0;hearts=SV.he??3;done=new Set(SV.d||[]);
    treats=SV.tr||0;fredQ=SV.fq||0;
    wear=(SV.wr&&typeof SV.wr==="object")?{bandana:null,collar:null,cape:null,...SV.wr}
        :{bandana:fredQ>=2?"#C0392B":null,collar:null,cape:null}; /* pre-wardrobe saves: keep the earned red bandana */
    qa=(SV.qa&&typeof SV.qa==="object")?SV.qa:{}; /* pre-retry saves: done quests stay done, credited as-is */
    wearCat=(SV.wc&&typeof SV.wc==="object")?{bandana:null,collar:null,...SV.wc}:{bandana:null,collar:null};
    world=WORLDS[SV.w]?SV.w:"hq";
    px=fx=SV.px??10;py=fy=SV.py??11;
    applyObra();
    if(px>=CW().W||py>=CW().H||isSolid(px,py)){world="hq";px=fx=10;py=fy=11;}
    if(done.size>=AQ().length){finish();$("intro").hidden=true;$("hud").hidden=false;$("xpbarwrap").hidden=false;hud();}
    else if(hearts<=0){clearSave();$("continueBtn").hidden=true;toast(T().contDead,2500);}
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
applyAdmin();applyLang();applyCtl();applyTheme();
if(NET.enabled)NET.boot();
requestAnimationFrame(ts=>{last=ts;loop(ts);});
sizeCanvas();
