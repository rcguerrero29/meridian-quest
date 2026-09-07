/* Meridian Quest — camera #4: true 3D (the HD-2D school, IDEAS §14).
   The world model never changed. This file is one more READER of the same glyph
   grids, TILES metadata and actor data: TILEDRAW bakes the textures, drawPerson
   and friends paint the billboards, so every pixel of the 2D art survives in 3D.
   Requires vendor/three.min.js — the only dependency this project has ever taken
   (owner-confirmed 2026-08-31). No WebGL → draw() falls back to the front camera. */
"use strict";
const DAY_AMB=0.66,DAY_SUN=0.42;   /* see the note at the lights: these two numbers are what gives a building faces */
const T3={renderer:null,scene:null,cam:null,group:null,amb:null,sun:null,lastW:0,
  builtKey:"",dirty:0,fail:false,yaw:0,pool:[],tintables:[],tint:null,glows:[],K:1}; /* yaw 0 = camera south of the hero, north up — the 2D map's mental model */
function t3Invalidate(){T3.dirty++;} /* growth, theme edits — anything that reshapes tiles */
/* ---------- the error log (#24) ----------
   Four places swallowed a 3D failure and left no trace: a decor artist, an actor artist, init,
   render. Every one now lands here — once per distinct message in the console, the last one
   under the pack's prefix (err3d) so a session can read what the owner's browser saw — and a
   fall-back to the flat camera says so on screen instead of quietly switching. */
T3.errors=[];
function t3Note(where,e){const msg=String((e&&e.message)||e||"?").slice(0,160),key=where+"|"+msg;
  if(!T3.errors.some(x=>x.key===key)){T3.errors.push({key,where,msg,at:Date.now()});if(T3.errors.length>20)T3.errors.shift();if(typeof mqwarn==="function")mqwarn("3d",where+": "+msg,false);else console.warn("3D "+where+": "+msg);}
  try{localStorage.setItem(SK("err3d"),JSON.stringify({where,msg,at:Date.now(),v:typeof GAMEV==="string"?GAMEV:""}));}catch(err){}}
function t3Fell(){if(T3.said)return;T3.said=true;const last=T3.errors[T3.errors.length-1];
  if(typeof mqwarn==="function")mqwarn("3d","fell to the flat camera"+(last?" — "+last.where+": "+last.msg:""),true); /* critical: the camera the game boots into could not draw (#8) */
  try{toast((typeof lang!=="undefined"&&lang==="es"?"El 3D no pudo dibujar — cámara plana. ":"3D could not draw — flat camera instead. ")+(last?last.where+": "+last.msg:""),5200);}catch(err){}}
/* ---------- which way is screen-right? ----------
   Billboards always show their painted face to the camera, but the painters mirror an
   animal by its WORLD facing (`face` = ±x). Turn the camera to the north stop and a dog
   trotting to world +x is painted facing screen-right while +x is now screen-LEFT — so
   the ball he carries, placed at world +x, sat behind him ("Sonny is picking up the ball
   with his butt", owner 2026-09-03). Facing is a screen-space fact; derive it from the
   camera stop and the actor's velocity, not from the map. */
const t3Q=()=>((Math.round(T3.yaw/(Math.PI/2))%4)+4)%4;
const T3RIGHT=[[1,0],[0,-1],[-1,0],[0,1]]; /* screen-right in world units at stops 0..3: +x, north, -x, south */
function t3ScreenFace(a){
  const q=t3Q(),[rx,rz]=T3RIGHT[q],v=(a.dx||0)*rx+(a.dy||0)*rz;
  if(v)return v>0?1:-1;
  return q===2?-(a.face||1):(a.face||1); /* standing still: mirror only at the opposite stop */
}
function t3ScreenDir(d){let n=(4-t3Q())%4;while(n-->0)d=TURN[d];return d;} /* a world direction as the camera sees it */
/* THE BLUR (IDEAS §15.1, measured): every texture was baked at 32px a tile while the
   renderer output at up to 3x device pixels — a 2.9x–4.0x magnification of the art.
   Raising the output resolution and adding mipmaps (the two earlier fixes) cannot
   sharpen a texture that is being magnified. K is the one factor: bake everything at
   K× and draw through a K× transform, so the 2D artists never know. It follows the
   renderer's real pixel ratio, clamped to what the GPU can hold: the largest world's
   ground is one texture, and it must fit maxTextureSize and a sane texel budget. */
function t3Factor(){
  if(!T3.renderer)return 1;
  let K=Math.min(3,Math.max(1,Math.round(T3.renderer.getPixelRatio()||1)));
  const cap=T3.renderer.capabilities,maxTex=(cap&&cap.maxTextureSize)||2048;
  let maxW=0,maxA=0;Object.values(WORLDS).forEach(w=>{maxW=Math.max(maxW,w.W*32,w.H*32);maxA=Math.max(maxA,w.W*w.H*1024);});
  while(K>1&&(maxW*K>maxTex||maxA*K*K>6e6))K--; /* 6M texels ≈ 24MB RGBA before mipmaps */
  return K;
}
function t3CheckK(){ /* a DPR change (fullscreen, a window dragged between monitors) re-bakes */
  const K=t3Factor();
  if(K===T3.K)return;
  T3.K=K;T3.dirty++;
  if(T3.canopyTex){T3.canopyTex.dispose();T3.canopyTex=null;}
  T3.pool.forEach(p=>{p.c.width=36*K;p.c.height=40*K;p.tex.needsUpdate=true;});
}
/* bake a glyph's art through TILEDRAW by borrowing the global ctx.
   raw: fill the base UNtinted — door art paints its own C.doorFrame untinted, and a
   tinted base behind it showed as a 2px theme-coloured border round every 3D door.
   t: a pinned clock for the artist (rc.t). An animated glyph — the door's pulsing
   light — bakes the same frame every build, at its brightest; the pulse itself is
   animated in 3D by t3Glow, not frozen at whatever the bake happened to catch. */
function t3BakeGlyph(g,opaque,base,raw,side,frame,x,y){
  const K=T3.K,c=document.createElement("canvas");c.width=32*K;c.height=32*K;
  const old=ctx;ctx=c.getContext("2d");ctx.setTransform(K,0,0,K,0,0);
  try{
    if(opaque){ctx.fillStyle=raw?(base||C.wall):tc(base||C.wall);ctx.fillRect(0,0,32,32);}
    /* a standing cutout wears its SIDE view (TILESIDE), never its top-down drawing. x,y
       reach the artist so a drawing that varies by tile (a box stacked on odd tiles, a
       coffee machine every third counter tile) varies here too. */
    const tf=side?sideArt(g):TILEDRAW[g];if(tf)tf({sx:0,sy:0,x:x|0,y:y|0,t:380*Math.PI/2,canopy:()=>{}});
    /* a light frame baked around a door face, so it reads against a dark wall from across
       the room (owner, 2026-09-02: "hard to see some doors") */
    if(frame){ctx.fillStyle=frame;ctx.fillRect(0,0,32,3);ctx.fillRect(0,29,32,3);ctx.fillRect(0,0,3,32);ctx.fillRect(29,0,3,32);}
  }finally{ctx=old;}
  return c;
}
const DOORLIGHT="#E8D6B0"; /* the door frame colour in 3D: warm sand against the dark wall */
function t3Tex(c,ground){const t=new THREE.CanvasTexture(c);
  t.magFilter=THREE.NearestFilter; /* crisp pixels up close */
  if(ground&&T3.renderer){ /* the floor at glancing angles was the blur (owner) —
       mipmaps + anisotropy sharpen it into the distance */
    t.generateMipmaps=true;t.minFilter=THREE.LinearMipmapLinearFilter;
    t.anisotropy=T3.renderer.capabilities.getMaxAnisotropy();
  }else{t.minFilter=THREE.LinearFilter;t.generateMipmaps=false;}
  return t;}
function t3Resize(){ /* THE blur fix: the 2D canvases render tiny on purpose (pixel art,
   CSS-stretched with image-rendering:pixelated). 3D must NOT — it renders at the
   element's real on-screen size, full device resolution, smooth scaling. */
  if(!T3.renderer)return;
  const c3=T3.renderer.domElement;
  c3.style.imageRendering="auto";
  const wCss=c3.clientWidth||document.getElementById("vp").clientWidth||360;
  const hCss=Math.round(wCss*VH/VW);
  T3.renderer.setPixelRatio(Math.min(3,window.devicePixelRatio||1));
  T3.renderer.setSize(wCss,hCss,false);
  if(T3.cam){T3.cam.aspect=wCss/hCss;T3.cam.updateProjectionMatrix();}
}
function t3Init(){
  const c3=document.getElementById("cv3");
  T3.renderer=new THREE.WebGLRenderer({canvas:c3,antialias:true});
  t3Resize();
  T3.scene=new THREE.Scene();
  T3.scene.background=new THREE.Color(0x241F2E);
  T3.cam=new THREE.PerspectiveCamera(50,VW/VH,0.1,120);
  /* DAY_AMB/DAY_SUN: with the old 0.95/0.5 the Lambert sum came out top 1.35, east 1.21,
     south 1.10 — all clipped to white — and west and north both exactly 0.95. Every face of
     every building in the city rendered the same value, which is why they read as painted
     flats. 0.66/0.42 lands them at 1.00 / 0.88 / 0.78 / 0.66: a real ladder, nothing clipped,
     and no art touched. Night already had a ladder and is left alone. */
  T3.amb=new THREE.AmbientLight(0xffffff,DAY_AMB);
  T3.sun=new THREE.DirectionalLight(0xfff2dd,DAY_SUN);
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
  T3.tintables=[];T3.glows=[];
  const grp=T3.group=new THREE.Group();
  const w=CW();
  /* the ground: the whole floor pass baked to one texture — checker, speckle,
     walkable art, water. Exactly the pixels the 2D cameras stand on. */
  const K=T3.K,gc=document.createElement("canvas");gc.width=w.W*32*K;gc.height=w.H*32*K;
  const old=ctx;ctx=gc.getContext("2d");ctx.setTransform(K,0,0,K,0,0);
  try{
    for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
      const ch=w.rows[y][x],sx=x*32,sy=y*32;
      {const fp=FLOORC[world];ctx.fillStyle=tc(fp?((x+y)%2?fp[0]:fp[1]):((x+y)%2?C.floor:C.floorAlt));}
      ctx.fillRect(sx,sy,32,32);
      const hsh=(x*374761393+y*668265263+world.charCodeAt(0)*69069)>>>0;
      if((hsh&7)<2){ctx.globalAlpha=0.05;ctx.fillStyle="#000";ctx.fillRect(sx,sy,32,32);ctx.globalAlpha=1;}
      const gch=w.grid[y][x],m=TILES[gch];
      const water=m&&m.kind==="water";
      if(!SOLID.has(gch)||water){
        if(!DOORSET.has(ch)&&!stands(ch)){const tf=TILEDRAW[ch]||(water?TILEDRAW[gch]:null);
          if(tf)tf({sx,sy,x,y,canopy:()=>{}});} /* a `stand` tile is drawn standing, not baked into the floor */
        /* CONTACT SHADOW. Both 2D cameras darken the floor in front of a solid; the 3D ground
           never looked at its neighbours, so every building in the city met the pavement on a
           hard bright line and read as pasted on. Ambient light does not reach into the corner
           where a wall meets the ground — that gradient is most of what says "this thing is
           standing here". Baked into a texture already being built, so it costs no draw call. */
        const dark=(dx,dy)=>{
          const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=w.W||ny>=w.H)return;
          if(!SOLID.has(w.grid[ny][nx]))return;
          const D=9;                                   /* how far the darkness reaches from the wall */
          /* run the gradient FROM the shared edge outward, so it is darkest in the corner */
          const ex=dx>0?sx+32:sx, ey=dy>0?sy+32:sy;
          const g2=ctx.createLinearGradient(ex,ey,ex+dx*-D,ey+dy*-D);
          g2.addColorStop(0,"rgba(15,12,20,.26)");g2.addColorStop(1,"rgba(15,12,20,0)");
          ctx.fillStyle=g2;
          ctx.fillRect(dx>0?sx+32-D:sx, dy>0?sy+32-D:sy, dx?D:32, dy?D:32);};
        dark(0,-1);dark(0,1);dark(-1,0);dark(1,0);   /* a wall on any side reaches onto this tile */
      }
      if(wellDepth(w,x,y)>0)ctx.clearRect(sx,sy,32,32); /* the well is a HOLE in the floor: the sunken steps stand in it (#62) */
    }
  }finally{ctx=old;}
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(w.W,w.H),
    new THREE.MeshLambertMaterial({map:t3Tex(gc,true),alphaTest:0.5})); /* alphaTest: the cleared tiles are see-through, the rest untouched */
  ground.rotation.x=-Math.PI/2;ground.position.set(w.W/2,0,w.H/2);ground.userData={ground:true};
  grp.add(ground);
  /* the standing world: boxes wear the facade art, everything else is a cutout */
  const faceTex={},flatTex={},wallMat={},boxMat={};
  /* Furniture, appliances and anything content marks `box:true` stand as a BOX when the
     pack drew a side view for them: the side art on all four faces (measured to the drawn
     height, so nothing floats), the top-down art on the lid. A cutout showed one face from
     every camera stop — a table looked the same walked around ("most art only have one
     display from any direction", owner 2026-09-03). Round or leggy things with no side view
     stay cutouts; that is the right shape for a plant, a cone, a pile of tires. */
  const t3Boxy=(g,m)=>!!(m.box||m.kind==="furniture"||m.kind==="appliance")&&typeof TILESIDE!=="undefined"&&!!TILESIDE[g];
  const t3BoxMats=(g,x,y)=>{
    const vk=g+"|"+(((x+y)%6)+6)%6;if(boxMat[vk])return boxMat[vk];
    const sc=t3BakeGlyph(g,false,null,false,true,null,x,y);
    const d=sc.getContext("2d").getImageData(0,0,sc.width,sc.height).data;
    let top=sc.height;
    for(let r=0;r<sc.height&&top===sc.height;r++)for(let c2=0;c2<sc.width;c2++)if(d[(r*sc.width+c2)*4+3]>40){top=r;break;}
    const frac=Math.max(0.15,Math.min(1,(sc.height-top)/sc.height)),h=frac*1.05;
    const st=t3Tex(sc);st.repeat.set(1,frac); /* only the drawn rows wrap the box */
    const side=new THREE.MeshLambertMaterial({map:st,transparent:true,alphaTest:0.3});
    const lid=new THREE.MeshLambertMaterial({map:t3Tex(t3BakeGlyph(g,true,roofCol(g),false,false,null,x,y))});
    T3.tintables.push(side,lid);
    return boxMat[vk]={mats:[side,side,lid,side,side,side],h};
  };
  const baseOf=g=>BASECOL[g]||(typeof MAPCOL!=="undefined"&&MAPCOL[g])||C.wall;
  const wallH=g=>0.55+((TILES[g]||{}).lift|0)*0.042; /* lift 13 ≈ 1.1 units tall */
  const wallMats=g=>wallMat[g]||(wallMat[g]={ /* one material set per glyph, shared by every box of it */
    side:new THREE.MeshLambertMaterial({color:new THREE.Color(shadeHex(baseOf(g),-0.22))}),
    top:new THREE.MeshLambertMaterial({color:new THREE.Color(tc(roofCol(g)))}),
    face:new THREE.MeshLambertMaterial({map:faceTex[g]=faceTex[g]||t3Tex(t3BakeGlyph(g,true,baseOf(g)))})});
  const sol=(ax,ay)=>ax<0||ay<0||ax>=w.W||ay>=w.H||SOLID.has(w.grid[ay][ax]); /* off-map counts as wall */
  for(let y=0;y<w.H;y++)for(let x=0;x<w.W;x++){
    const gch=w.grid[y][x];
    const cx=x+0.5,cz=y+0.5;
    if(DOORSET.has(w.rows[y][x])&&!SOLID.has(gch)){ /* a door stands IN its wall — you walk through it */
      const g=w.rows[y][x];
      flatTex[g]=flatTex[g]||t3Tex(t3BakeGlyph(g,true,C.doorFrame,true,false,DOORLIGHT));
      /* which way the wall runs: walls north and south of the door → the door faces east-west.
         The old plane had no rotation at all, so 6 of HQ's doors stood 90° off their wall. */
      const ns=sol(x,y-1)&&sol(x,y+1)&&!(sol(x-1,y)&&sol(x+1,y));
      /* a thin box, not a plane: edge-on at the two side stops a plane vanished; a slab
         shows its jamb. Art on both broad faces, frame colour on the four edges. */
      const jamb=new THREE.MeshLambertMaterial({color:new THREE.Color(DOORLIGHT)}); /* the jamb is the frame's edge — light, like the frame */
      const art=new THREE.MeshLambertMaterial({map:flatTex[g]});
      const door=new THREE.Mesh(new THREE.BoxGeometry(1,1,0.14),[jamb,jamb,jamb,jamb,art,art]);
      door.position.set(cx,0.5,cz);door.rotation.y=ns?Math.PI/2:0;
      door.userData={door:true,x,y};grp.add(door);
      /* the lintel: the wall beside the door is taller than the door, so without this a
         see-through slot ran along the top of every doorway */
      const nbG=[[x-1,y],[x+1,y],[x,y-1],[x,y+1]].map(([ax,ay])=>w.grid[ay]&&w.grid[ay][ax])
        .find(c=>c&&TILES[c]&&(TILES[c].kind==="wall"||TILES[c].kind==="facade"));
      if(nbG&&wallH(nbG)>1){const h=wallH(nbG),wm=wallMats(nbG);
        const lin=new THREE.Mesh(new THREE.BoxGeometry(1,h-1,1),[wm.side,wm.side,wm.top,wm.side,wm.side,wm.side]);
        lin.position.set(cx,(1+h)/2,cz);lin.userData={lintel:true,x,y};grp.add(lin);}
      /* light under the door — the 2D "this one opens" pulse, alive in 3D instead of
         baked at a random brightness */
      const gm=new THREE.MeshBasicMaterial({color:0xFFE9A8,transparent:true,opacity:0.5,depthWrite:false});
      const gl=new THREE.Mesh(new THREE.PlaneGeometry(ns?0.6:1.0,ns?1.0:0.6),gm); /* light spills out of a door — the pool is what you see from across a room */
      gl.rotation.x=-Math.PI/2;gl.position.set(cx,0.012,cz);gl.userData={glow:true,x,y};
      T3.glows.push(gm);grp.add(gl);
      continue;
    }
    if(stands(w.rows[y][x])&&!SOLID.has(gch)){ /* walkable cutouts: agility gear, and the stairs */
      const g=w.rows[y][x];
      flatTex[g]=flatTex[g]||t3Tex(t3BakeGlyph(g,false,null,false,true));
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:flatTex[g]}));
      s.center.set(0.5,0.06);s.scale.set(1.05,1.05,1);s.position.set(cx,0,cz);
      s.userData={flat:true,g,x,y}; /* a picture standing in the scene — the 3D-realism audit counts these (#39) */
      T3.tintables.push(s.material);grp.add(s);
      continue;
    }
    const wg=winAt(w,x,y);
    if(wg){ /* a person at work inside this wall: back slab, counter toward the street, roof strip
               over the opening — so she is seen behind her counter, not standing in a hole */
      const h=wallH(wg),{side,top,face}=wallMats(wg);
      const open=[[0,1],[0,-1],[1,0],[-1,0]].find(([dx,dz])=>!sol(x+dx,y+dz))||[0,1]; /* the street side */
      const [dx,dz]=open,ew=dx!==0; /* ew: the opening faces east or west, so the pieces turn */
      /* the pieces are thin and hug the street edge: a deep counter or a roof slab over her
         hid her from the raised camera (checked in shots, 2026-09-06) — the camera looks down,
         so anything above or in front of her must be shallow */
      const piece=(ht,dep,off,yc,tag,front)=>{
        const m=[side,side,top,side,side,side];if(front)m[ew?(dx>0?0:1):(dz>0?4:5)]=front;
        const b=new THREE.Mesh(new THREE.BoxGeometry(ew?dep:1,ht,ew?1:dep),m);
        b.position.set(cx+dx*off,yc,cz+dz*off);b.userData={[tag]:true,g:wg,x,y};grp.add(b);};
      piece(h,0.3,-0.35,h/2,"winBack",face);        /* the back wall: full height, wearing the storefront */
      piece(0.46,0.16,0.42,0.23,"counter");          /* the counter: waist high, at the street edge */
      if(h>1.02)piece(h-1,0.16,0.42,(1+h)/2,"winTop"); /* the roof line, a thin strip over the opening */
      continue;
    }
    { /* #62: a climbing flight's treads are LOW BOXES that rise east, the head the top step, so the
         stair stands and you rise with it (t3Actors lifts anyone on a tread). The loft's well is
         the same flight seen from the top: a hole in the floor (the ground is cleared there) with
         the steps SUNK in it, each a step deeper toward the ▼, so you look down into it and sink
         as you go (owner: "downstairs, not so much. still blocky, squares"). */
      const sr=stairRun(w,x,y),dep=wellDepth(w,x,y),g=w.rows[y][x];
      if((sr&&sr.up)||dep>0){const hh=dep>0?1.2:STAIRH*(sr.i+1); /* a sunken step is a tall box whose lid is below the floor; its sides are the risers you see */
        const tk=g+"|"+x+"|"+y,lid=wallMat[tk]||(wallMat[tk]=new THREE.MeshLambertMaterial({map:t3Tex(t3BakeGlyph(g,true,baseOf(g),false,false,null,x,y))}));
        const rk=dep>0?"≡well":"≡side",rs=wallMat[rk]||(wallMat[rk]=new THREE.MeshLambertMaterial({color:new THREE.Color(dep>0?"#5E5852":"#9F9783")}));
        const bx=new THREE.Mesh(new THREE.BoxGeometry(1,hh,1),[rs,rs,lid,rs,rs,rs]);
        const top=dep>0?-dep:hh;
        bx.position.set(cx,top-hh/2,cz);bx.userData={tread:true,well:dep>0,g,x,y,h:top};grp.add(bx);
        continue;} /* the head ▲ is the top step; its portal mark still floats above it */
    }
    if((TILES[gch]||{}).kind==="bridge"){ /* the rainbow bridge (IDEAS §15.4, owner 2026-09-07: "upgrade rainbow
         bridge for sonny asap"): it was two tiles of flat art that read as a smear on the floor. Now a
         plank DECK stands BRIDGEH over the water wearing the six bands on top, with a post-and-bar rail
         on each side of the crossing; whoever crosses stands on the deck (stairLift). The run follows
         the river: water north or south means the bridge runs east-west and the rails stand north and south. */
      const g=gch,tk=g+"|"+x+"|"+y;
      const lid=wallMat[tk]||(wallMat[tk]=new THREE.MeshLambertMaterial({map:t3Tex(t3BakeGlyph(g,true,baseOf(g),false,false,null,x,y))}));
      const plank=wallMat["^plank"]||(wallMat["^plank"]=new THREE.MeshLambertMaterial({color:new THREE.Color("#8A6F4D")}));
      const rail=wallMat["^rail"]||(wallMat["^rail"]=new THREE.MeshLambertMaterial({color:new THREE.Color("#6E5538")}));
      const deck=new THREE.Mesh(new THREE.BoxGeometry(1,BRIDGEH,1),[plank,plank,lid,plank,plank,plank]);
      deck.position.set(cx,BRIDGEH/2,cz);deck.userData={bridge:true,g,x,y,h:BRIDGEH};grp.add(deck);
      const wat=(ax,ay)=>ay>=0&&ay<w.H&&ax>=0&&ax<w.W&&(TILES[w.rows[ay][ax]]||{}).kind==="water";
      const ew=wat(x,y-1)||wat(x,y+1)||!(wat(x-1,y)||wat(x+1,y)); /* east-west unless the water runs beside it */
      const RH=0.5,PW=0.07;
      [-1,1].forEach(sd=>{ /* one rail per side of the crossing: two posts and a bar */
        const off=0.5-PW/2;
        [-0.46,0.46].forEach(al=>{const post=new THREE.Mesh(new THREE.BoxGeometry(PW,RH,PW),rail);
          post.position.set(cx+(ew?al:sd*off),BRIDGEH+RH/2,cz+(ew?sd*off:al));post.userData={bridgeRail:true,x,y};grp.add(post);});
        const bar=new THREE.Mesh(new THREE.BoxGeometry(ew?1:PW,0.05,ew?PW:1),rail);
        bar.position.set(cx+(ew?0:sd*off),BRIDGEH+RH,cz+(ew?sd*off:0));bar.userData={bridgeRail:true,bar:true,x,y};grp.add(bar);});
      /* papel picado (owner, 2026-09-07: "and papel picado"): when the season hands a palette
         through art("papel"), a string is hung ACROSS the crossing on each deck tile, high over
         the head, between two thin poles at the rails — five little cut-paper flags a string,
         both faces coloured, so it reads from every camera stop. Nothing without a season. */
      const pap=art("papel",null);
      if(pap&&pap.length){
        const PH=1.9,pole=wallMat["^pole"]||(wallMat["^pole"]=new THREE.MeshLambertMaterial({color:new THREE.Color("#5A4330")}));
        const strg=wallMat["^string"]||(wallMat["^string"]=new THREE.MeshBasicMaterial({color:new THREE.Color("#3A2E26")}));
        /* the string runs ALONG the crossing, so the flags face the way you walk and read from the
           default camera stop; a pole stands only where the run ends (the neighbour is not a deck) */
        const isB=(ax,ay)=>ay>=0&&ay<w.H&&ax>=0&&ax<w.W&&(TILES[w.rows[ay][ax]]||{}).kind==="bridge";
        [-1,1].forEach(sd=>{if(isB(x+(ew?sd:0),y+(ew?0:sd)))return;
          const pl=new THREE.Mesh(new THREE.BoxGeometry(0.05,PH,0.05),pole);
          pl.position.set(cx+(ew?sd*0.48:0),PH/2,cz+(ew?0:sd*0.48));pl.userData={papel:true,pole:true,x,y};grp.add(pl);});
        const st=new THREE.Mesh(new THREE.BoxGeometry(ew?1:0.02,0.02,ew?0.02:1),strg);
        st.position.set(cx,PH,cz);st.userData={papel:true,string:true,x,y};grp.add(st);
        for(let i=0;i<5;i++){const t=-0.4+i*0.2,col=pap[(i+x+y)%pap.length];
          const fm=wallMat["^papel"+col]||(wallMat["^papel"+col]=new THREE.MeshBasicMaterial({color:new THREE.Color(col),side:THREE.DoubleSide}));
          const fl=new THREE.Mesh(new THREE.PlaneGeometry(0.16,0.17),fm);
          fl.position.set(cx+(ew?t:0),PH-0.1,cz+(ew?0:t));if(!ew)fl.rotation.y=Math.PI/2;
          fl.userData={papel:true,flag:true,x,y};grp.add(fl);}
      }
      continue;
    }
    if(!SOLID.has(gch))continue;
    const m=TILES[gch]||{lift:7,kind:"prop"},kd=m.kind;
    if(kd==="water")continue; /* painted into the ground */
    if(kd==="wall"||kd==="facade"){
      const h=wallH(gch),wm=wallMats(gch),side=wm.side,top=wm.top;
      /* `vary`: the glyph draws itself differently per tile (the stair mass finds its place in
         its run), so its face is baked per tile instead of once per glyph */
      const vk=gch+"|"+x+"|"+y;
      const face=m.vary?(wallMat[vk]||(wallMat[vk]=new THREE.MeshLambertMaterial({map:t3Tex(t3BakeGlyph(gch,true,baseOf(gch),false,false,null,x,y))}))):wm.face;
      /* a wall wears its art on all four sides: it runs either way and is seen from any
         of the four camera stops — with art on ±Z only, every north-south wall in HQ was
         a bare slab. A facade keeps plain ends: those are a building's corners, not its
         front, and the storefront art is drawn for the street side. */
      const box=new THREE.Mesh(new THREE.BoxGeometry(1,h,1),
        kd==="wall"?[face,face,top,side,face,face]:[side,side,top,side,face,face]);
      box.position.set(cx,h/2,cz);box.userData={wall:kd==="wall",g:gch,x,y};grp.add(box);
    }else if(kd==="fence"){
      flatTex[gch]=flatTex[gch]||t3Tex(t3BakeGlyph(gch,false,null,false,true));
      /* a fence panel stands ALONG its run: a north-south run turns across X, a corner gets
         two panels. Every panel used to face south, so a north-south run showed as a row
         of edge-on slats "laying around" (owner, 2026-09-02). */
      const fk=(ax,ay)=>ay>=0&&ay<w.H&&ax>=0&&ax<w.W&&(TILES[w.rows[ay][ax]]||{}).kind==="fence";
      const nsRun=fk(x,y-1)||fk(x,y+1),ewRun=fk(x-1,y)||fk(x+1,y);
      const fm=new THREE.MeshLambertMaterial({map:flatTex[gch],side:THREE.DoubleSide,transparent:true,alphaTest:0.3});
      /* a RAIL beside a well (#62) is not a fence mid-tile: it stands on the LIP of the hole,
         knee-high, turned to face it — a north or south well turns it along X, an east or
         west well across X. Everything else keeps the fence's panel. */
      const wl=(ax,ay)=>ay>=0&&ay<w.H&&ax>=0&&ax<w.W&&wellDepth(w,ax,ay)>0;
      const lip=wl(x,y+1)?[0,0.44,0]:wl(x,y-1)?[0,-0.44,0]:wl(x+1,y)?[0.44,0,Math.PI/2]:wl(x-1,y)?[-0.44,0,Math.PI/2]:null;
      const panel=(rot,ph,ox,oz)=>{const p=new THREE.Mesh(new THREE.PlaneGeometry(1,ph),fm);
        p.position.set(cx+ox,ph/2,cz+oz);p.rotation.y=rot;p.userData={fence:true,x,y};grp.add(p);};
      if(lip){panel(lip[2],0.55,lip[0],lip[1]);}
      else{if(nsRun&&!ewRun)panel(Math.PI/2,0.8,0,0);else panel(0,0.8,0,0);
        if(nsRun&&ewRun)panel(Math.PI/2,0.8,0,0);}
    }else if(kd==="tree"){
      const trunk=new THREE.Mesh(new THREE.BoxGeometry(0.16,0.7,0.16),
        new THREE.MeshLambertMaterial({color:0x6E4A2C}));
      trunk.position.set(cx,0.35,cz);grp.add(trunk);
      if(!T3.canopyTex){ /* one jacaranda canopy, baked by hand */
        const cc=document.createElement("canvas");cc.width=40*K;cc.height=40*K;
        const g2=cc.getContext("2d");g2.scale(K,K);
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
      cs.userData={flat:true,g:gch,x,y,canopy:true}; /* the canopy is a picture on a real trunk (#39) */
      T3.tintables.push(cs.material);grp.add(cs);
    }else if(t3Boxy(gch,m)){
      const b=t3BoxMats(gch,x,y);
      const box=new THREE.Mesh(new THREE.BoxGeometry(0.92,b.h,0.92),b.mats);
      box.position.set(cx,b.h/2,cz);box.userData={box:true,g:gch,x,y};grp.add(box);
    }else{ /* furniture, props, appliances, the doghouse: standing cutouts, drawn for the front.
              One bake per glyph AND per (x+y) mod 6 — enough for any parity an artist uses,
              at most six pictures per glyph — so a drawing that varies by tile still varies. */
      const vk=gch+"|"+(((x+y)%6)+6)%6;
      flatTex[vk]=flatTex[vk]||t3Tex(t3BakeGlyph(gch,false,null,false,true,null,x,y));
      const s=new THREE.Sprite(new THREE.SpriteMaterial({map:flatTex[vk]}));
      s.center.set(0.5,0.06);s.scale.set(1.05,1.05,1);
      s.position.set(cx,0,cz);
      s.userData={flat:true,g:gch,x,y}; /* a cutout, not a solid — the 3D-realism audit counts these (#39) */
      T3.tintables.push(s.material);grp.add(s);
    }
  }
  /* Decor: the pack's landmarks. A flat thing declared on a SOLID tile is paint — it goes on
     that box's open face as a plane, so a mural stays on its wall from every camera stop.
     A decor on open ground is an object, so it gets a billboard. (Pili's rule: flat on walls,
     billboards for things that stand.) */
  if(typeof DECOS!=="undefined")DECOS.forEach(d=>{
    if(d.world!==world)return;
    const f=(typeof DECODRAW!=="undefined")&&DECODRAW[d.deco];if(!f)return;
    const c=document.createElement("canvas");c.width=32*K;c.height=32*K;
    const o2=ctx;ctx=c.getContext("2d");ctx.setTransform(K,0,0,K,0,0);
    try{f(0,0,d);}catch(e){t3Note("decor "+d.deco,e);}finally{ctx=o2;}
    const tex=t3Tex(c),cx=d.x+0.5,cz=d.y+0.5;
    const onWall=d.x>=0&&d.y>=0&&d.y<w.H&&d.x<w.W&&SOLID.has(w.grid[d.y][d.x]);
    if(onWall){
      const face=[[0,1,0],[0,-1,Math.PI],[1,0,Math.PI/2],[-1,0,-Math.PI/2]]
        .find(([ox,oz])=>{const nx=d.x+ox,ny=d.y+oz;
          return ny>=0&&ny<w.H&&nx>=0&&nx<w.W&&!SOLID.has(w.grid[ny][nx]);});
      if(!face)return;                       /* buried on all four sides: nobody can see it */
      const h=wallH(w.grid[d.y][d.x]);
      const m=new THREE.MeshLambertMaterial({map:tex,transparent:true,alphaTest:0.25,side:THREE.DoubleSide});
      const pl=new THREE.Mesh(new THREE.PlaneGeometry(0.94,0.94),m);
      pl.position.set(cx+face[0]*0.505,Math.min(h-0.5,0.62),cz+face[1]*0.505);
      pl.rotation.y=face[2];
      pl.userData={deco:d.deco,x:d.x,y:d.y};
      T3.tintables.push(m);grp.add(pl);
    }else{
      const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex}));
      sp.center.set(0.5,0.06);sp.scale.set(1.05,1.05,1);sp.position.set(cx,0,cz);
      sp.userData={deco:d.deco,x:d.x,y:d.y};
      T3.tintables.push(sp.material);grp.add(sp);
    }
  });

  T3.scene.add(grp);
}
/* actors: a pool of live-canvas sprites, repainted by the 2D artists every frame */
function t3Sprite(i){
  let p=T3.pool[i];
  if(!p){
    const c=document.createElement("canvas");c.width=36*T3.K;c.height=48*T3.K; /* 8px of headroom for the bubble (#57) */
    const tex=t3Tex(c);
    const spr=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,transparent:true}));
    spr.center.set(0.5,4/48); /* feet 4px above the card's bottom, as before */
    p=T3.pool[i]={c,g:c.getContext("2d"),tex,spr,live:false};
    T3.scene.add(spr);
  }
  return p;
}
/* where a wall poster hangs (#45): the wall's first open side — south, north, east, west, the
   street side first — at six tenths of the wall's height, the card drawn centred on its anchor.
   A billboard leans back with the camera (it looks down at ~40°), so a card flush with the face
   would sink its top half into the wall: it stands 0.16 out, and the lean tucks its top edge
   back to the face. Nothing for a tile that is not a wall or facade, or a wall with no open side. */
function t3ReadFace(w,x,y){
  const g=w.grid[y][x],m=TILES[g]||{};
  if(m.kind!=="wall"&&m.kind!=="facade")return null;
  const wh=0.55+(m.lift|0)*0.042;
  for(const [dx,dy] of [[0,1],[0,-1],[1,0],[-1,0]]){
    const nx=x+dx,ny=y+dy;
    if(ny<0||ny>=w.H||nx<0||nx>=w.W||SOLID.has(w.grid[ny][nx]))continue;
    return {ox:dx*0.66,oz:dy*0.66,h:Math.max(0.3,wh*0.6)};}
  return null;}
function t3Actors(){
  const list=[];
  const w=CW();
  w.npcs.forEach(n=>list.push({x:n.fx===undefined?n.x:n.fx,y:n.fy===undefined?n.y:n.fy,f:(g)=>{
    drawPerson(g,2,6,npcWhimsy(n),{dir:"down",idle:Math.sin(Date.now()/500+n.x)*0.8});
    if(hasSay(n)){g.font="700 13px sans-serif";g.fillStyle="#E0B45C";g.textAlign="center";
      g.fillText("❗",18,10+Math.sin(Date.now()/250)*2);g.textAlign="start";}
    drawEmote(n,2,6); /* the trade is drawn BESIDE the mark here too, never instead of it */
  }}));
  PEERS.forEach(p=>{if(p.w===world)list.push({x:p.x,y:p.y,f:g=>drawPerson(g,2,6,p.look||look,{dir:t3ScreenDir(p.dir||"down")})});});
  if(world===AW("dog"))list.push({x:DOG.fx,y:DOG.fy,fc:DOG,f:g=>drawDog(g,2,6)});
  if(world===AW("cat"))list.push({x:CAT.fx,y:CAT.fy,fc:CAT,f:g=>drawCat(g,2,6)});
  if(world===AW("pig"))list.push({x:PIG.fx,y:PIG.fy,fc:PIG,f:g=>drawPigeon(g,2,6)});
  if(world===AW("loro"))list.push({x:LORO.x,y:LORO.y,f:g=>drawLoro(g,2,6)});
  CRIT.forEach(cr=>{if(cr.world!==world)return;
    list.push({x:cr.fx,y:cr.fy,fc:cr,f:g=>{
      if(cr.kind==="butterfly")drawButterfly(g,cr,2,6);
      else if(cr.kind==="colibri")drawColibri(g,cr,2,6);
      else if(cr.kind==="gato")drawGato(g,cr,2,6);
      else if(cr.kind==="beagle")drawBeagle(g,cr,2,6);
      else if(cr.kind==="lab")drawLab(g,cr,2,6);
      else if(cr.kind==="chi")drawChi(g,cr,2,6);}});});
  if(BALL&&BALL.world===world)list.push({x:BALL.fx,y:BALL.fy,f:g=>drawBall(g,2,6,BALL.phase,BALL.t)});
  /* hero:true — drawn through whatever stands between them and the camera (#22: "a wall between
     you and the camera hides you in 3D"). The four camera stops put a wall in front of the hero
     often; the person you are steering must never vanish behind one. */
  list.push({x:fx,y:fy,hero:true,f:g=>drawPerson(g,2,6,look,{dir:t3ScreenDir(dir),bob:moving?Math.sin(bob)*2:0,moving,hero:true})});
  /* the door marker rides the same pool, lifted above the wall line so the door slab
     does not hide it */
  doorMarks().forEach(d=>list.push({x:d.x,y:d.y,h:1.0,f:g=>drawDoorMark(g,2,30,0,d.mark)}));
  /* a poster on a WALL hangs on the wall's open face, mid-height, and is not pulled toward the
     camera (that would push it inside the wall). It used to float 1.15 up wherever it stood, which
     put the board beside la ventanilla above city hall's roof (#45: "poster next to teller is off,
     a bit too high"). A readable thing that is not a wall (the desk) keeps the float. */
  if(typeof readMarks==="function")readMarks().forEach(d=>{
    const face=t3ReadFace(w,d.x,d.y);
    if(face)list.push({x:d.x,y:d.y,h:face.h,ox:face.ox,oz:face.oz,fixed:true,mark:"read",f:g=>drawReadMark(g,2,30,-7)}); /* up:-7 centres the card on its anchor */
    else list.push({x:d.x,y:d.y,h:1.15,mark:"read",f:g=>drawReadMark(g,2,30,0)});});
  const old=ctx;
  list.forEach((a,i)=>{
    const p=t3Sprite(i);
    p.g.setTransform(T3.K,0,0,T3.K,0,8*T3.K);p.g.clearRect(0,-8,36,48); /* every artist paints 8px lower; the bubble above the head is no longer cut off (#57) */
    ctx=p.g; /* the 2D artists paint straight onto the billboard */
    if(a.fc){const f0=a.fc.face;a.fc.face=t3ScreenFace(a.fc); /* painted for the camera, not the map */
      try{a.f(p.g);}catch(e){t3Note("actor",e);}a.fc.face=f0;}
    else{try{a.f(p.g);}catch(e){t3Note("actor",e);}}
    ctx=old;
    p.tex.needsUpdate=true;
    /* pull each billboard a step toward the camera so heads stop sinking into the
       wall behind them (owner: "head disappearance near walls") */
    const ax=a.x+0.5,az=a.y+0.5;
    const ddx=T3.cam.position.x-ax,ddz=T3.cam.position.z-az,dl=Math.hypot(ddx,ddz)||1;
    const lift=stairLift(CW(),Math.round(a.x),Math.round(a.y)); /* on a climbing tread you stand that much higher (#62) */
    if(a.fixed)p.spr.position.set(ax+(a.ox||0),(a.h||0)+lift,az+(a.oz||0)); /* pinned to a wall: stays put (#45) */
    else p.spr.position.set(ax+ddx/dl*0.34,(a.h||0)+lift,az+ddz/dl*0.34);
    p.spr.userData.mark=a.mark||"";
    p.spr.scale.set(36/32*1.12,48/32*1.12,1);
    p.spr.material.color.copy(T3.tint);
    /* billboards draw in order of distance from the camera, farthest first, all of them after the
       scene's transparent pieces: whoever stands nearer the camera than you draws over you. The hero
       used to draw LAST, over everyone, so behind a person you stood on their head (owner,
       2026-09-07: "when we walk behind people it seems like im walking on them"). The hero still
       ignores depth, so a wall never hides them (#22) — a person can. */
    /* #92 (owner: "when im going downstairs, im walking on the wall again"): drawn through everything,
       a hero sunk in a well read as standing ON the rail and the floor's lip in front of them. Below the
       floor the hero respects depth — the lip and the knee-high rail hide their legs, which is what going
       down into a hole looks like — and the tall wall on the camera side is the one the near-wall rule
       already minimizes. On the floor and on a climbing flight they still draw through walls (#22). */
    p.spr.material.depthTest=!a.hero||lift<0;p.spr.renderOrder=1000-Math.round(dl*10);
    p.spr.visible=true;p.live=true;
  });
  for(let i=list.length;i<T3.pool.length;i++){T3.pool[i].spr.visible=false;T3.pool[i].live=false;}
}
function t3Light(){
  const dnow=new Date(),hr=dnow.getHours()+dnow.getMinutes()/60;
  const night=hr>=20.5||hr<6,edge=!night&&(hr>=18||hr<8);
  let ambI=DAY_AMB,ambC=0xffffff,sunI=DAY_SUN,tint=0xffffff,bg=0x241F2E;
  if(themeName==="sunset"||edge){ambC=0xffe3c4;tint=0xfff0dd;ambI=DAY_AMB-0.06;sunI=DAY_SUN+0.08;bg=0x2E2130;} /* a low sun rakes harder, and still must not clip */
  if(night){ambI=0.6;ambC=0xaebbe8;tint=0xc7cfea;sunI=0.15;bg=0x14121F;}
  T3.amb.intensity=ambI;T3.amb.color.set(ambC);
  T3.sun.intensity=sunI;
  T3.tint.set(tint);
  T3.scene.background.set(bg);
  T3.tintables.forEach(m=>m.color.copy(T3.tint));
}
function draw3d(){ /* returns true when it rendered; false → caller falls back */
  if(T3.fail)return false;
  if(!T3.renderer){try{t3Init();}catch(e){T3.fail=true;t3Note("init",e);t3Fell();return false;}}
  try{
    const c3=T3.renderer.domElement;
    if(Math.abs((c3.clientWidth||0)-T3.lastW)>2){T3.lastW=c3.clientWidth||0;t3Resize();}
    t3CheckK();
    const key=world+"|"+themeName+"|"+T3.dirty;
    if(T3.builtKey!==key)t3Build(key);
    const hx=fx+0.5,hz=fy+0.5;
    T3.cam.position.set(hx+Math.sin(T3.yaw)*T3CAMD,T3CAMH,hz+Math.cos(T3.yaw)*T3CAMD);
    T3.cam.lookAt(hx,0.4,hz);
    t3Light();
    t3Glow();
    t3Reveal();
    t3Actors();
    t3Leash();
    T3.renderer.render(T3.scene,T3.cam);
    return true;
  }catch(e){T3.fail=true;t3Note("render",e);t3Fell();return false;}
}
/* #61: a wall between the camera and the hero vanishes for that frame — the cutaway every third-
   person camera does. Standing in the lobby with the south wall behind you, the wall used to fill
   the screen and the hero (drawn through walls) read as standing ON it, while Sonny, drawn in the
   scene, was hidden behind it. Now that wall is simply not there while it is in the way. Walls,
   facades, lintels, doors and the window pieces cut; treads, rails, props and decor do not. */
/* #65, the owner's word after AJ walked it: "aj prefers the minimized wall but limit it to one
   near the person... the view change was too confusing - lets keep that manual." The camera
   never turns by itself; ↻ is the only turn. A wall HIDES you only when it is close and tall:
   the camera looks down from T3CAMH high and T3CAMD back, so a wall d tiles in front of you
   covers your feet up to ~0.84·d — t3Hides counts it once it reaches above your shins
   (0.65·d+0.3). Of the walls that hide you, only the NEAREST is minimized — the piece in front
   of you and its two neighbours drop to a knee-high stub in the wall's top colour (t3Reveal);
   everything else, the far wall included, stays whole. */
const T3CAMD=7.4,T3CAMH=6.2,T3STUB=0.28;
function t3Hides(h,d){return h>0.65*d+0.3;}
function t3Near(x,y,yaw,fake){ /* the pieces of the one wall nearest (x,y) that hides you at this camera stop; `fake`=[[x,y,h]] for a test */
  const hx=x+0.5,hz=y+0.5,ux=Math.sin(yaw),uz=Math.cos(yaw);
  const pieces=fake?fake.map(([ax,ay,h])=>({x:ax+0.5,z:ay+0.5,h,o:null}))
    :T3.group.children.filter(o=>{const u=o.userData;return u&&!u.stub&&(u.wall!==undefined||u.door||u.winBack||u.counter);})
      .map(o=>({x:o.position.x,z:o.position.z,h:(o.geometry.parameters&&o.geometry.parameters.height)||1,o}));
  const hits=[];pieces.forEach(p=>{const dx=p.x-hx,dz=p.z-hz,d=dx*ux+dz*uz,side=Math.abs(dz*ux-dx*uz);
    if(d>0.4&&d<T3CAMD&&side<0.9&&t3Hides(p.h,d))hits.push({p,d});});
  if(!hits.length)return [];
  const dmin=Math.min(...hits.map(e=>e.d)); /* the nearest wall; its neighbours one tile either side, in the same row */
  return pieces.filter(p=>{const dx=p.x-hx,dz=p.z-hz,d=dx*ux+dz*uz,side=Math.abs(dz*ux-dx*uz);return Math.abs(d-dmin)<0.55&&side<1.6;});}
function t3Reveal(){ /* every wall whole, but the one nearest that hides you: hidden, a stub in its footprint */
  const key=world+"|"+px+"|"+py+"|"+t3Q()+"|"+T3.builtKey;
  if(T3.nearKey!==key){T3.nearKey=key;T3.near=t3Near(px,py,Math.round(T3.yaw/(Math.PI/2))*(Math.PI/2));}
  const cut3=new Set((T3.near||[]).map(p=>p.o).filter(Boolean));
  T3.group.children.slice().forEach(o=>{const u=o.userData;if(!u||u.stub||!(u.wall!==undefined||u.door||u.winBack||u.counter))return;
    const cut=cut3.has(o);
    if(cut&&!u.stub3){const g=o.geometry.parameters||{},m=o.material,top=Array.isArray(m)?m[2]:m;
      const st=new THREE.Mesh(new THREE.BoxGeometry(g.width||1,T3STUB,g.depth||1),top);
      st.position.set(o.position.x,o.position.y-(g.height||1)/2+T3STUB/2,o.position.z);st.rotation.y=o.rotation.y;
      st.userData={stub:true,x:u.x,y:u.y};T3.group.add(st);u.stub3=st;}
    o.visible=!cut;if(u.stub3)u.stub3.visible=cut;});}
function t3Glow(){ /* the light under every door breathes — same clock as the 2D art */
  const a=0.25+0.2*Math.sin(Date.now()/380);
  T3.glows.forEach(m=>{m.opacity=a;});
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
/* ↻ — the camera-flip wish from the iso playtest. QUARTER turns, four stops: N/E/S/W
   as originally planned (docs/IDEAS.md). It shipped as eight 45° stops, and a 4-way
   movement grid cannot be driven from a 45°-rotated camera — at those four odd stops
   NO swipe the player can make corresponds to a straight move on screen, which is
   exactly why the owner reported "some directions are broken when i rotate". */
(function(){
  const b=document.getElementById("rot3d");
  if(b)b.addEventListener("click",()=>{T3.yaw+=Math.PI/2;}); /* the only turn there is (#65: "lets keep that manual") */
})();
