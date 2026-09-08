const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:390,height:560},deviceScaleFactor:2});
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(600);
 await p.evaluate(()=>{world='st';px=fx=10;py=fy=5;dir='down';showWorld();checkTalk();camSet('top');});
 await p.waitForTimeout(2500);
 const o=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {y:Math.round(r.y),b:Math.round(r.bottom),x:Math.round(r.x),r2:Math.round(r.right)};};
   const vis=e=>e&&e.offsetParent!==null;const g=id=>{const e=document.getElementById(id);return vis(e)?{...R(e),t:(e.textContent||'').trim().slice(0,28)}:null;};
   return {toast:g('toast'),talk:g('talk'),cmd:g('cmd'),read:g('read'),ticker:g('ticker'),vp:R(document.querySelector('.viewport'))};});
 console.log(JSON.stringify(o,null,1));
 await p.screenshot({path:'/tmp/rosa/p390-42-talk-vs-toast.png'});
 await b.close();
})();
