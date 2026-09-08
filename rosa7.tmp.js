const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:390,height:560},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin');
 for(const t of [700,1600,2600,3600,5200]){
   await p.waitForTimeout(t===700?700:1000);
   const o=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {y:Math.round(r.y),b:Math.round(r.bottom),x:Math.round(r.x),r2:Math.round(r.right),h:Math.round(r.height)};};
     const tk=document.getElementById('toast'),tb=document.getElementById('talk'),ti=document.getElementById('ticker');
     const vis=e=>e&&e.offsetParent!==null;
     return {t:vis(tk)&&tk.classList.contains('on')?R(tk):null,txt:(tk.textContent||'').slice(0,40),talk:vis(tb)?R(tb):null,talkTxt:(tb.textContent||'').slice(0,30),tick:vis(ti)?R(ti):null};});
   console.log(t,JSON.stringify(o));
 }
 await p.screenshot({path:'/tmp/rosa/p390-41-tut-over-talk.png'});
 await b.close();
})();
