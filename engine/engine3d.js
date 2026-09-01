/* Meridian Quest — camera #4: true 3D (the HD-2D school, IDEAS §14).
   The world model never changed. This file is one more READER of the same glyph
   grids, TILES metadata and actor data: TILEDRAW bakes the textures, drawPerson
   and friends paint the billboards, so every pixel of the 2D art survives in 3D.
   Requires vendor/three.min.js — the only dependency this project has ever taken
   (owner-confirmed 2026-08-31). No WebGL → draw() falls back to the front camera. */
"use strict";
const T3={renderer:null,scene:null,cam:null,group:null,amb:null,sun:null,
  builtKey:"",dirty:0,fail:false,yaw:0,pool:[],tintables:[],tint:null}; /* yaw 0 = camera south of the hero, north up — the 2D map's mental model */
function t3Invalidate(){T3.dirty++;} /* growth, theme edits — anything that reshapes tiles */
/* bake a glyph's art through TILEDRAW by borrowing the global ctx */
function t3BakeGlyph(g,opaque,base){
  const c=document.createElement("canvas");c.width=32;c.height=32;
  const old=ctx;ctx=c.getContext("2d");
  try{
    if(opaque){ctx.fillStyle=tc(base||C.wall);ctx.fillRect(0,0,32,32);}
    const tf=TILEDRAW[g];if(tf)tf({sx:0,sy:0,x:0,y:0,canopy:()=>{}});
  }finally{ctx=old;}
  return c;
}
function t3Tex(c,ground){const t=new THREE.CanvasTexture(c);
  t.magFilter=THREE.NearestFilter; /* crisp pixels up close */
  if(ground&&T3.renderer){ /* the floor at glancing angles was the blur (owner) —
       mipmaps + anisotropy sharpen it into the distance */
    t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;
    t.anisotropy=T3.renderer.capabilities.getMaxAnisotropy();
  }else{t.minFilter=THREE.LinearFilter;t.generateMipmaps=false;}
  return t;}
function t3Init(){
  const c3=document.getElementById("cv3");
  T3.renderer=new THREE.WebGLRenderer({canvas:c3,antialias:true});
  T3.renderer.setPixelRatio(Math.min(3,window.devicePixelRatio||1));
  T3.renderer.setSize(VW,VH,false);
  T3.scene=new THREE.Scene();
  T3.scene.background=new THREE.Color(0x241F2E);
  T3.cam=new THREE.PerspectiveCamera(50,VW/VH,0.1,120);
  T3.amb=new THREE.AmbientLight(0xffffff,0.95);
  T3.sun=new THREE.DirectionalLight(0xfff2dd,0.5);
  T3.sun.position.set(14,22,8);
  T3.scene.add(T3.amb,T3.sun);
  T3.tint=new THREE.Color(0xffffff);
}
function t3Dispose(obj){
  obj.traverse(o=>{
    if(o.geometry)o.geometry.dispose();
    const ms=Array.isArray(o.material)?o.material:o.material?[o.material]:[];
    ms.forEach(m=>{if(m.map)m.map.dispose();m.dispose();});
  });
}
function t3Build(key){
  T3.builtKey=key;
  if(T3.group){T3.scene.remove(T3.group);t3Dispose(T3.group);}
  T3.tintables=[];
  const grp=T3.group=new THREE.Group();
  const w=CW();
  /* the ground: the whole floor pass baked to one texture — checker, speckle,
     walkable art, water. Exactly the pixels the 2D cameras stand on. */
  const gc=document.createElement("canvas");gc.width=w.W*32;gc.height=w.H*32;
  const old=ctx;ctx=gc.getContext("2d");
  try{
    for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
      const ch=w.rows[y][x],sx=x*32,sy=y*32;
      if(world==="st")ctx.fillStyle=tc((x+y)%2?"#C6C4BB":"#BFBDB4");
      else if(world==="lo")ctx.fillStyle=tc((x+y)%2?"#D9DCE0":"#D1D5DA");
      else ctx.fillStyle=tc((x+y)%2?C.floor:C.floorAlt);
      ctx.fillRect(sx,sy,32,32);
      const hsh=(x*374761393+y*668265263+world.charCodeAt(0)*69069)>>>0;
      if((hsh&7)<2){ctx.globalAlpha=0.05;ctx.fillStyle="#000";ctx.fillRect(sx,sy,32,32);ctx.globalAlpha=1;}
      const gch=w.grid[y][x],m=TILES[gch];
      const water=m&&m.kind==="water";
      if(!SOLID.has(gch)||water){
        if(!DOORSET.has(ch)&&!"345".includes(ch)){const tf=TILEDRAW[ch]||(water?TILEDRAW[gch]:null);
          if(tf)tf({sx,sy,x,y,canopy:()=>{}});} /* agility gear stands up instead */
      }
    }
  }finally{ctx=old;}
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(w.W,w.H),
    new THREE.MeshLambertMaterial({map:t3Tex(gc,true)}));
  ground.rotation.x=-Math.PI/2;ground.position.set(w.W/2,0,w.H/2);
  grp.add(ground);
  /* the standing world: boxes wear the facade art, everything else is a cutout */
  const faceTex={},flatTex={};
  const baseOf=g=>BASECOL[g]||(typeof MAPCOL!=="undefined"&&MAPCOL[g])||C.wall;
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    const gch=w.grid[y][x];
    const cx=x+0.5,cz=y+0.5;
    if(DOORSET.has(w.rows[y][x])&&!SOLID.has(gch)){ /* a door stands up — you walk through it */
      const g=w.rows[y][x];
      flatTex[g]=flatTex[g]||t3Tex(t3BakeGlyph(g,true,C.doorFrame));
      const door=new THREE.Mesh(new THREE.PlaneGeometry(1,1),
        new THREE.MeshLambertMaterial({map:flatTex[g],side:THREE.DoubleSide}));
      door.position.set(cx,0.5,cz);grp.add(door);
      continue;
    }
    if("345".includes(w.rows[y][x])&&!SOLID.has(gch)){ /* agility gear: walkable cutouts */
      const g=w.rows[y][x];
      flatTex[g]=flatTex[g]||t3Tex(t3BakeGlyph(g,false));
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:flatTex[g]}));
      s.center.set(0.5,0.06);s.scale.set(1.05,1.05,1);s.position.set(cx,0,cz);
      T3.tintables.push(s.material);grp.add(s);
      continue;
    }
    if(!SOLID.has(gch))continue;
    const m=TILES[gch]||{lift:7,kind:"prop"},kd=m.kind;
    if(kd==="water")continue; /* painted into the ground */
    if(kd==="wall"||kd==="facade"){
      const h=0.55+(m.lift|0)*0.042; /* lift 13 ≈ 1.1 units tall */
      faceTex[gch]=faceTex[gch]||t3Tex(t3BakeGlyph(gch,true,baseOf(gch)));
      const side=new THREE.MeshLambertMaterial({color:new THREE.Color(shadeHex(baseOf(gch),-0.22))});
      const top=new THREE.MeshLambertMaterial({color:new THREE.Color(tc(roofCol(gch)))});
      const face=new THREE.MeshLambertMaterial({map:faceTex[gch]});
      const box=new THREE.Mesh(new THREE.BoxGeometry(1,h,1),[side,side,top,side,face,face]);
      box.position.set(cx,h/2,cz);grp.add(box);
    }else if(kd==="fence"){
      flatTex[gch]=flatTex[gch]||t3Tex(t3BakeGlyph(gch,false));
      const p=new THREE.Mesh(new THREE.PlaneGeometry(1,0.8),
        new THREE.MeshLambertMaterial({map:flatTex[gch],side:THREE.DoubleSide,transparent:true,alphaTest:0.3}));
      p.position.set(cx,0.4,cz);grp.add(p);
    }else if(kd==="tree"){
      const trunk=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.7,0.16),
        new THREE.MeshLambertMaterial({color:0x6E4A2C}));
      trunk.position.set(cx,0.35,cz);grp.add(trunk);
      if(!T3.canopyTex){ /* one jacaranda canopy, baked by hand */
        const cc=document.createElement("canvas");cc.width=40;cc.height=40;
        const g2=cc.getContext("2d");
        g2.fillStyle="#4E8A58";
        [[11,24,10],[29,24,10],[20,16,12]].forEach(q=>{g2.beginPath();g2.arc(q[0],q[1],q[2],0,7);g2.fill();});
        g2.fillStyle="#639C6C";
        [[16,20,8],[26,22,7]].forEach(q=>{g2.beginPath();g2.arc(q[0],q[1],q[2],0,7);g2.fill();});
        g2.fillStyle="#B08FE0";
        [[10,16],[22,8],[30,15],[16,28],[28,29],[20,20]].forEach(q=>{g2.beginPath();g2.arc(q[0],q[1],2,0,7);g2.fill();});
        T3.canopyTex=t3Tex(cc);
      }
      const cs=new THREE.Sprite(new THREE.SpriteMaterial({map:T3.canopyTex}));
      cs.scale.set(1.7,1.7,1);cs.position.set(cx,1.05,cz);
      T3.tintables.push(cs.material);grp.add(cs);
    }else{ /* furniture, props, appliances, the doghouse: standing cutouts */
      flatTex[gch]=flatTex[gch]||t3Tex(t3BakeGlyph(gch,false));
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:flatTex[gch]}));
      s.center.set(0.5,0.06);s.scale.set(1.05,1.05,1);
      s.position.set(cx,0,cz);
      T3.tintables.push(s.material);grp.add(s);
    }
  }
  T3.scene.add(grp);
}
/* actors: a pool of live-canvas sprites, repainted by the 2D artists every frame */
function t3Sprite(i){
  let p=T3.pool[i];
  if(!p){
    const c=document.createElement("canvas");c.width=36;c.height=40;
    const tex=t3Tex(c);
    const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));
    spr.center.set(0.5,0.1);
    p=T3.pool[i]={c,g:c.getContext("2d"),tex,spr,live:false};
    T3.scene.add(spr);
  }
  return p;
}
function t3Actors(){
  const list=[];
  const w=CW();
  w.npcs.forEach(n=>list.push({x:n.x,y:n.y,f:(g)=>{
    drawPerson(g,2,6,npcWhimsy(n.key),{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(pendingAt(n)!==undefined){g.font="700 13px sans-serif";g.fillStyle="#E0B45C";g.textAlign="center";
      g.fillText("❗",18,10+Math.sin(Date.now()/250)*2);g.textAlign="start";}
    else drawEmote(n,2,6); /* townsfolk stay busy in 3D too */
  }}));
  PEERS.forEach(p=>{if(p.w===world)list.push({x:p.x,y:p.y,f:g=>drawPerson(g,2,6,p.look||look,{dir:p.dir||"down"})});});
  if(world==="hq")list.push({x:DOG.fx,y:DOG.fy,f:g=>drawDog(g,2,6)});
  if(world==="lc")list.push({x:CAT.fx,y:CAT.fy,f:g=>drawCat(g,2,6)});
  if(world==="st"){list.push({x:PIG.fx,y:PIG.fy,f:g=>drawPigeon(g,2,6)});
    list.push({x:LORO.x,y:LORO.y,f:g=>drawLoro(g,2,6)});}
  CRIT.forEach(cr=>{if(cr.world!==world)return;
    list.push({x:cr.fx,y:cr.fy,f:g=>{
      if(cr.kind==="butterfly")drawButterfly(g,cr,2,6);
      else if(cr.kind==="colibri")drawColibri(g,cr,2,6);
      else if(cr.kind==="gato")drawGato(g,cr,2,6);
      else if(cr.kind==="beagle")drawBeagle(g,cr,2,6);
      else if(cr.kind==="lab")drawLab(g,cr,2,6);
      else if(cr.kind==="chi")drawChi(g,cr,2,6);}});});
  if(BALL&&BALL.world===world)list.push({x:BALL.fx,y:BALL.fy,f:g=>drawBall(g,2,6,BALL.phase,BALL.t)});
  list.push({x:fx,y:fy,f:g=>drawPerson(g,2,6,look,{dir,bob:moving?Math.sin(bob)*2:0,moving})});
  const old=ctx;
  list.forEach((a,i)=>{
    const p=t3Sprite(i);
    p.g.setTransform(1,0,0,1,0,0);p.g.clearRect(0,0,36,40);
    ctx=p.g; /* the 2D artists paint straight onto the billboard */
    try{a.f(p.g);}catch(e){}
    ctx=old;
    p.tex.needsUpdate=true;
    /* pull each billboard a step toward the camera so heads stop sinking into the
       wall behind them (owner: "head disappearance near walls") */
    const ax=a.x+0.5,az=a.y+0.5;
    const ddx=T3.cam.position.x-ax,ddz=T3.cam.position.z-az,dl=Math.hypot(ddx,ddz)||1;
    p.spr.position.set(ax+ddx/dl*0.34,0,az+ddz/dl*0.34);
    p.spr.scale.set(36/32*1.12,40/32*1.12,1);
    p.spr.material.color.copy(T3.tint);
    p.spr.visible=true;p.live=true;
  });
  for(let i=list.length;i<T3.pool.length;i++){T3.pool[i].spr.visible=false;T3.pool[i].live=false;}
}
function t3Light(){
  const dnow=new Date(),hr=dnow.getHours()+dnow.getMinutes()/60;
  const night=hr>=20.5||hr<6,edge=!night&&(hr>=18||hr<8);
  let ambI=0.95,ambC=0xffffff,sunI=0.5,tint=0xffffff,bg=0x241F2E;
  if(themeName==="sunset"||edge){ambC=0xffe3c4;tint=0xfff0dd;sunI=0.6;bg=0x2E2130;}
  if(night){ambI=0.6;ambC=0xaebbe8;tint=0xc7cfea;sunI=0.15;bg=0x14121F;}
  T3.amb.intensity=ambI;T3.amb.color.set(ambC);
  T3.sun.intensity=sunI;
  T3.tint.set(tint);
  T3.scene.background.set(bg);
  T3.tintables.forEach(m=>m.color.copy(T3.tint));
}
function draw3d(){ /* returns true when it rendered; false → caller falls back */
  if(T3.fail)return false;
  if(!T3.renderer){try{t3Init();}catch(e){T3.fail=true;return false;}}
  try{
    const key=world+"|"+themeName+"|"+T3.dirty;
    if(T3.builtKey!==key)t3Build(key);
    const hx=fx+0.5,hz=fy+0.5;
    T3.cam.position.set(hx+Math.sin(T3.yaw)*7.4,6.2,hz+Math.cos(T3.yaw)*7.4);
    T3.cam.lookAt(hx,0.4,hz);
    t3Light();
    t3Actors();
    t3Leash();
    T3.renderer.render(T3.scene,T3.cam);
    return true;
  }catch(e){T3.fail=true;return false;}
}
function t3Leash(){ /* the blue leash exists in 3D too, while it's on */
  const dog=CRIT.find(c=>c.leashT>performance.now()&&c.world===world);
  if(!dog){if(T3.leashLn)T3.leashLn.visible=false;return;}
  if(!T3.leashLn){
    const g=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3()]);
    T3.leashLn=new THREE.Line(g,new THREE.LineBasicMaterial({color:0x2E5FA8}));
    T3.scene.add(T3.leashLn);
  }
  const pos=T3.leashLn.geometry.attributes.position;
  pos.setXYZ(0,fx+0.5,0.5,fy+0.5);
  pos.setXYZ(1,dog.fx+0.5,0.35,dog.fy+0.5);
  pos.needsUpdate=true;T3.leashLn.visible=true;
}
/* ↻ — the camera-flip wish from the iso playtest, finally real: eight stops */
(function(){
  const b=document.getElementById("rot3d");
  if(b)b.addEventListener("click",()=>{T3.yaw+=Math.PI/4;});
})();
