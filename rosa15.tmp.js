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
  const form=document.querySelector('#reader .dform');
  const before=Math.round(form.getBoundingClientRect().width);
  const sels=[...form.querySelectorAll('select')];
  const info=sels.map(s=>({label:s.parentElement.childNodes[0].textContent.trim().slice(0,32),longest:[...s.options].map(o=>o.text).sort((a,c)=>c.length-a.length)[0]}));
  // shrink test: cap every field
  form.querySelectorAll('.dfl').forEach(l=>{l.style.minWidth='0';});
  sels.forEach(s=>s.style.maxWidth='100%');
  const mid=Math.round(form.getBoundingClientRect().width);
  form.querySelectorAll('.dfl>*').forEach(e=>{e.style.minWidth='0';e.style.width='100%';e.style.boxSizing='border-box';});
  const after=Math.round(form.getBoundingClientRect().width);
  return {before,mid,after,info,paperX:Math.round(document.getElementById('paperSheet').getBoundingClientRect().x)};});
 console.log(JSON.stringify(d,null,1));
 await b.close();
})();
