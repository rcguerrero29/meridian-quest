/* CHEMA'S PROBE — "standing on things im standing behind".
   The number: STOLEN PIXELS. Render the frame twice, once as the game draws it and once with the
   hero made honest about depth. Every pixel that differs is a pixel where the hero painted himself
   over something that is nearer the camera than he is — which is what "standing on it" looks like.
   Usage: node probe.js <index.html> <world> <yaw-quarters> [x y]  (no x/y = scan the room) */
const { chromium } = require('playwright-core');
const fs=require('fs'), path=require('path');
const ROOT=path.resolve(__dirname,'../../../..','home/user/meridian-quest');
const CAND=[process.env.CHROMIUM_PATH,'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell','/opt/pw-browsers/chromium'].filter(Boolean);
(async()=>{
  const exe=CAND.find(p=>{try{return fs.existsSync(p)&&fs.statSync(p).isFile();}catch(e){return false;}});
  const b=await chromium.launch({executablePath:exe});
  const pg=await b.newPage({viewport:{width:480,height:900}});
  const errs=[];pg.on('pageerror',e=>errs.push(e.message));
  await pg.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
  await pg.goto('file://'+path.resolve('/home/user/meridian-quest',process.argv[2]));
  await pg.waitForTimeout(1500);
  try{await pg.click('.classes button[data-c="architect"]',{timeout:1500});await pg.click('#begin',{timeout:1500});}catch(e){}
  await pg.waitForTimeout(600);
  const W=process.argv[3], Q=Number(process.argv[4]||0);
  const fixX=process.argv[5]?Number(process.argv[5]):null, fixY=process.argv[6]?Number(process.argv[6]):null;
  const out=await pg.evaluate(async([w,q,fx0,fy0])=>{
    camSet('3d');sizeCanvas();
    world=w;if(typeof t3Invalidate==='function')t3Invalidate();
    T3&&(T3.yaw=q*Math.PI/2);
    const shot=()=>{draw();const c=T3.renderer.domElement;
      const g=document.createElement('canvas');g.width=240;g.height=200;
      const cx=g.getContext('2d');cx.drawImage(c,0,0,240,200);
      return cx.getImageData(0,0,240,200).data;};
    const heroSpr=()=>T3.pool.find(p=>p.live&&p.spr.material.depthTest===false);
    const measure=async(x,y)=>{
      px=fx=x;py=fy=y;moving=false;dir='down';
      draw();await new Promise(r=>setTimeout(r,60));draw();
      const A=shot();
      /* honest: the hero obeys depth like everybody else, and joins the queue at his own distance */
      const list=T3.pool.filter(p=>p.live);
      const saved=list.map(p=>[p.spr.material.depthTest]);
      list.forEach(p=>{if(p.spr.material.depthTest===false){p.spr.material.depthTest=true;}});
      const B=shot();
      list.forEach((p,i)=>{p.spr.material.depthTest=saved[i][0];});
      let n=0;for(let i=0;i<A.length;i+=4){if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2])n++;}
      return n;
    };
    const map=WORLDS[w].rows, res=[];
    if(fx0!==null){res.push({x:fx0,y:fy0,stolen:await measure(fx0,fy0)});}
    else{
      for(let y=0;y<map.length;y++)for(let x=0;x<map[y].length;x++){
        if(typeof solidAt==='function'?solidAt(x,y):false)continue;
        if(SOLID.has(map[y][x]))continue;
        res.push({x,y,stolen:await measure(x,y)});
      }
      res.sort((a,b)=>b.stolen-a.stolen);
    }
    return res.slice(0,12);
  },[W,Q,fixX,fixY]);
  console.log(JSON.stringify(out));
  if(errs.length)console.log('PAGE ERRORS',errs.slice(0,3));
  await b.close();
})();
