const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:480,height:900},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(1000);
 await p.click('.classes button[data-c="architect"]');
 await p.waitForTimeout(300);
 // audit the creator's pressed state
 const cr=await p.evaluate(()=>[...document.querySelectorAll('.panel button')].map(b=>({id:b.id,t:(b.textContent||'').trim().slice(0,18),ap:b.getAttribute('aria-pressed'),al:b.getAttribute('aria-label')})));
 console.log('CREATOR BTNS',JSON.stringify(cr));
 await p.click('#begin'); await p.waitForTimeout(1200);
 const btns=await p.evaluate(()=>[...document.querySelectorAll('button,select,input')].filter(b=>b.offsetParent!==null).map(b=>{const r=b.getBoundingClientRect();return {tag:b.tagName,id:b.id,cls:b.className,t:(b.textContent||'').trim().slice(0,20),al:b.getAttribute('aria-label'),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.x),y:Math.round(r.y)};}));
 console.log('WORLD CONTROLS');console.log(btns.map(o=>JSON.stringify(o)).join('\n'));
 await b.close();
})();
