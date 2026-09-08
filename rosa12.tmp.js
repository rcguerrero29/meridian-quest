const {chromium}=require('playwright-core');
const W=+process.argv[2],H=+process.argv[3],TAG=process.argv[4];
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(700);
 await p.evaluate(()=>{world='hq';px=fx=3;py=fy=2;dir='left';showWorld();checkTalk();});
 await p.waitForTimeout(500);
 await p.click('#talk'); await p.waitForTimeout(600);
 const d=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1),r2:+r.right.toFixed(1)};};
   const paper=document.getElementById('paperSheet');
   const bs=[...document.querySelectorAll('#reader button')].filter(e=>e.offsetParent).map(e=>({t:e.textContent.trim().slice(0,26),cls:e.className,par:e.parentElement.className,...R(e)}));
   return {paper:R(paper),vw:innerWidth,bs};});
 console.log(TAG,JSON.stringify(d,null,1));
 await p.screenshot({path:`/tmp/rosa/${TAG}-53-reader.png`,fullPage:true});
 // now open the request form
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#reader button')].find(x=>/build something|construya/i.test(x.textContent));if(b)b.click();});
 await p.waitForTimeout(700);
 await p.screenshot({path:`/tmp/rosa/${TAG}-54-form.png`,fullPage:true});
 const f=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)};};
   return [...document.querySelectorAll('#reader input,#reader textarea,#reader select,#reader button')].filter(e=>e.offsetParent).map(e=>({tag:e.tagName,t:(e.textContent||e.placeholder||e.id).trim().slice(0,26),...R(e)}));});
 console.log(TAG,'FORM',JSON.stringify(f));
 await b.close();
})();
