const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:390,height:560},deviceScaleFactor:3});
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(700);
 await p.evaluate(()=>{world='hq';px=fx=3;py=fy=2;dir='left';showWorld();checkTalk();});
 await p.waitForTimeout(600);
 await p.click('#talk'); await p.waitForTimeout(700);
 await p.screenshot({path:'/tmp/rosa/p390-52-reader-top.png',clip:{x:0,y:0,width:390,height:80}});
 const d=await p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return {x:+r.x.toFixed(1),y:+r.y.toFixed(1),w:+r.width.toFixed(1),h:+r.height.toFixed(1)};};
   const out=[];document.querySelectorAll('#card *').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<90&&r.height>0&&r.width>0)out.push({tag:e.tagName,id:e.id,cls:e.className.toString().slice(0,30),t:(e.textContent||'').trim().slice(0,30),...R(e)});});
   const rows=[...document.querySelectorAll('#card .sec, #card div')].filter(e=>e.offsetParent).slice(0,6).map(e=>({cls:e.className.toString().slice(0,24),...R(e)}));
   // measure the two purple buttons gap
   const bs=[...document.querySelectorAll('#card button')].filter(e=>e.offsetParent).map(e=>({t:e.textContent.trim().slice(0,22),...R(e)}));
   return {top:out,btns:bs,cardW:R(document.getElementById('card'))};});
 console.log(JSON.stringify(d,null,1));
 await b.close();
})();
