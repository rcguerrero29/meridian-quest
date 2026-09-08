const {chromium}=require('playwright-core');
const W=+process.argv[2],H=+process.argv[3],TAG=process.argv[4];
const R=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(600);
 await p.evaluate(()=>{world='st';px=fx=10;py=fy=5;dir='down';showWorld();checkTalk();camSet('top');});
 await p.waitForTimeout(700);
 await p.evaluate(()=>toast("Desks, plants and walls just block you — coworkers with a ❗ have quests. Walk up and Talk.",9000));
 await p.waitForTimeout(500);
 const o=await p.evaluate(()=>{
   const R=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),b:Math.round(r.bottom),r2:Math.round(r.right)};};
   const out={};
   ['toast','ticker','talk','gear','fsbtn','mapbtn','rot3d','cmd','xp'].forEach(id=>{const e=document.getElementById(id); if(e&&e.offsetParent!==null) out[id]=R(e);});
   const vp=document.querySelector('.viewport'); out.viewport=R(vp);
   const j=document.querySelector('.joy'),d=document.querySelector('.dpad');
   if(j&&j.offsetParent) out.joy=R(j); if(d&&d.offsetParent) out.dpad=R(d);
   return out;});
 console.log(TAG,JSON.stringify(o,null,0));
 await p.screenshot({path:`/tmp/rosa/${TAG}-40-toast-overlap.png`});
 await b.close();
})();
