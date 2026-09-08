const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:390,height:560},deviceScaleFactor:2});
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(600);
 await p.evaluate(()=>{world='hq';px=fx=3;py=fy=2;dir='left';showWorld();checkTalk();});
 await p.waitForTimeout(400); await p.click('#talk'); await p.waitForTimeout(400);
 await p.evaluate(()=>{const b=[...document.querySelectorAll('#reader button')].find(x=>/build something/i.test(x.textContent));b.click();});
 await p.waitForTimeout(600);
 const d=await p.evaluate(()=>{
  const out=[];document.querySelectorAll('#reader *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width>360)out.push({tag:e.tagName,cls:(e.className||'').toString().slice(0,20),w:Math.round(r.width),x:Math.round(r.x)});});
  const form=document.querySelector('#reader .dform');
  const sel=[...document.querySelectorAll('#reader select')].map(s=>({id:s.previousSibling&&s.previousSibling.textContent?s.previousSibling.textContent.trim().slice(0,24):'',w:Math.round(s.getBoundingClientRect().width),opts:[...s.options].map(o=>o.text).slice(0,6)}));
  const cs=form?getComputedStyle(form):null;
  return {wide:out.slice(0,20),sel,formW:form?Math.round(form.getBoundingClientRect().width):null,formDisplay:cs&&cs.display,cols:cs&&cs.gridTemplateColumns};});
 console.log(JSON.stringify(d,null,1));
 await b.close();
})();
