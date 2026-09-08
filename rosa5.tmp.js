const {chromium}=require('playwright-core');
const W=+process.argv[2],H=+process.argv[3],TAG=process.argv[4];
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:W,height:H},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(900);
 await p.click('.classes button[data-c="architect"]'); await p.waitForTimeout(200);
 await p.click('#begin'); await p.waitForTimeout(900);
 await p.click('#gear'); await p.waitForTimeout(350);
 let g=async()=>p.evaluate(()=>{const s=document.getElementById('settings'),bx=s.querySelector('.box'),d=document.getElementById('closeSet');
   const r=bx.getBoundingClientRect(),dr=d.getBoundingClientRect();
   return {open:!s.hidden,boxH:Math.round(r.height),scrollH:bx.scrollHeight,scrollTop:Math.round(bx.scrollTop),doneY:Math.round(dr.top-r.top),belowFold:Math.round(dr.top-r.bottom)};});
 console.log(TAG,'default',JSON.stringify(await g()));
 await p.screenshot({path:`/tmp/rosa/${TAG}-30-set.png`});
 // try escape
 await p.keyboard.press('Escape'); await p.waitForTimeout(250);
 console.log(TAG,'after Escape',JSON.stringify(await g()));
 // try backdrop click (top-left of overlay)
 const bb=await p.evaluate(()=>{const r=document.getElementById('settings').getBoundingClientRect();return [r.x+6,r.y+6];});
 await p.mouse.click(bb[0],bb[1]); await p.waitForTimeout(250);
 console.log(TAG,'after backdrop click',JSON.stringify(await g()));
 // open all drawers and measure
 await p.evaluate(()=>document.querySelectorAll('.drawer').forEach(d=>d.open=true));
 await p.waitForTimeout(250);
 console.log(TAG,'all open',JSON.stringify(await g()));
 await p.screenshot({path:`/tmp/rosa/${TAG}-31-set-allopen.png`});
 await b.close();
})();
