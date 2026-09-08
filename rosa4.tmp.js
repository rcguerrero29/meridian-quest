const {chromium}=require('playwright-core');
const W=process.argv[2]?+process.argv[2]:480, H=process.argv[3]?+process.argv[3]:900, TAG=process.argv[4]||'480';
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(1000);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(250);
 await p.click('#begin'); await p.waitForTimeout(1000);
 // go to the street
 await p.evaluate(()=>{world='st';px=fx=10;py=fy=5;dir='down';if(typeof showWorld=='function')showWorld();if(typeof checkTalk=='function')checkTalk();});
 await p.waitForTimeout(900);
 await p.screenshot({path:`/tmp/rosa/${TAG}-10-street3d.png`});
 for(const c of ['top','front','iso','3d']){
   await p.evaluate(cc=>camSet(cc),c); await p.waitForTimeout(700);
   await p.screenshot({path:`/tmp/rosa/${TAG}-11-cam-${c}.png`});
 }
 // settings drawer
 await p.click('#gear'); await p.waitForTimeout(400);
 await p.screenshot({path:`/tmp/rosa/${TAG}-20-settings-default.png`});
 const m=await p.evaluate(()=>{const s=document.getElementById('settings');const bx=s.querySelector('.box');const r=bx.getBoundingClientRect();
   return {vh:innerHeight,boxTop:Math.round(r.top),boxH:Math.round(r.height),boxBottom:Math.round(r.bottom),scrollH:bx.scrollHeight,clientH:bx.clientHeight,overflowY:getComputedStyle(bx).overflowY};});
 console.log(TAG,'SETTINGS BOX',JSON.stringify(m));
 // open every drawer
 await p.evaluate(()=>{document.querySelectorAll('.drawer').forEach(d=>d.open=true);});
 await p.waitForTimeout(400);
 await p.screenshot({path:`/tmp/rosa/${TAG}-21-settings-all-open.png`});
 const m2=await p.evaluate(()=>{const bx=document.querySelector('#settings .box');const done=document.getElementById('closeSet').getBoundingClientRect();
   return {scrollH:bx.scrollHeight,clientH:bx.clientHeight,doneTop:Math.round(done.top),doneBottom:Math.round(done.bottom),vh:innerHeight};});
 console.log(TAG,'ALL OPEN',JSON.stringify(m2));
 await b.close();
})();
