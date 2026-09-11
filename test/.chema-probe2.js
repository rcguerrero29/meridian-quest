/* WHO STEALS THE PIXELS. At one spot: total stolen, then per-object attribution by hiding the
   candidates that stand between the camera and the hero, one at a time. */
const { chromium } = require('playwright-core');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:480,height:900}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
await pg.goto('file://'+path.resolve('/home/user/meridian-quest',process.argv[2]));await pg.waitForTimeout(1500);
try{await pg.click('.classes button[data-c="architect"]',{timeout:1500});await pg.click('#begin',{timeout:1500});}catch(e){}
await pg.waitForTimeout(600);
const out=await pg.evaluate(async([w,q,X,Y])=>{
  camSet('3d');sizeCanvas();world=w;if(typeof t3Invalidate==='function')t3Invalidate();T3.yaw=q*Math.PI/2;
  px=fx=X;py=fy=Y;moving=false;dir='down';
  draw();await new Promise(r=>setTimeout(r,150));draw();
  const shot=()=>{draw();const c=T3.renderer.domElement,g=document.createElement('canvas');
    g.width=240;g.height=200;const cx=g.getContext('2d');cx.drawImage(c,0,0,240,200);
    return cx.getImageData(0,0,240,200).data;};
  const stolen=()=>{const A=shot();const L=T3.pool.filter(p=>p.live&&p.spr.material.depthTest===false);
    L.forEach(p=>p.spr.material.depthTest=true);const B=shot();L.forEach(p=>p.spr.material.depthTest=false);
    let n=0;for(let i=0;i<A.length;i+=4)if(A[i]!==B[i]||A[i+1]!==B[i+1]||A[i+2]!==B[i+2])n++;return n;};
  const total=stolen();
  const hx=X+0.5,hz=Y+0.5,ux=Math.sin(T3.yaw),uz=Math.cos(T3.yaw);
  const cands=[];
  T3.group.children.forEach(o=>{if(!o.visible)return;const dx=o.position.x-hx,dz=o.position.z-hz;
    const d=dx*ux+dz*uz,side=Math.abs(dz*ux-dx*uz);
    if(d>-0.2&&d<5&&side<2)cands.push({o,d,side});});
  const rows=[];
  for(const c of cands){c.o.visible=false;const s=stolen();c.o.visible=true;
    if(total-s>0)rows.push({tag:Object.keys(c.o.userData||{}).filter(k=>c.o.userData[k]===true||k==='g').join(','),
      g:c.o.userData&&c.o.userData.g,gx:c.o.userData&&c.o.userData.x,gy:c.o.userData&&c.o.userData.y,
      d:+c.d.toFixed(2),top:+ (c.o.isSprite?c.o.position.y+c.o.scale.y*(1-((c.o.center&&c.o.center.y)||0)):(c.o.geometry&&c.o.geometry.parameters&&c.o.geometry.parameters.height!==undefined?c.o.position.y+c.o.geometry.parameters.height/2:1)).toFixed(2),
      spr:!!c.o.isSprite, ro:c.o.renderOrder, tr:!!(c.o.material&&!Array.isArray(c.o.material)&&c.o.material.transparent),
      steals:total-s});}
  rows.sort((a,b)=>b.steals-a.steals);
  return {total,rows:rows.slice(0,10),near:(T3.near||[]).length};
},[process.argv[3],Number(process.argv[4]),Number(process.argv[5]),Number(process.argv[6])]);
console.log(JSON.stringify(out,null,1));if(errs.length)console.log('ERR',errs.slice(0,2));await b.close();})();
