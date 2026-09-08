const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,
   args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:480,height:900},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 p.on('console',m=>{if(m.type()==='error')console.log('CONSOLE',m.text().slice(0,200));});
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(1500);
 await p.screenshot({path:'/tmp/rosa/01-title.png',fullPage:true});
 // dump the shape of the title screen
 const t=await p.evaluate(()=>document.body.innerText.slice(0,2000));
 console.log('---TITLE TEXT---\n'+t);
 await b.close();
})();
