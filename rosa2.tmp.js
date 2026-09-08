const {chromium}=require('playwright-core');
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,
   args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const p=await b.newPage({viewport:{width:480,height:900},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERR',e.message));
 await p.goto('file:///home/user/meridian-quest/changarrito/index.html');
 await p.waitForTimeout(1200);
 await p.click('.classes button[data-c="architect"]').catch(e=>console.log('noclass',e.message));
 await p.waitForTimeout(400);
 await p.screenshot({path:'/tmp/rosa/02-creator.png',fullPage:true});
 await p.click('#begin').catch(e=>console.log('nobegin',e.message));
 await p.waitForTimeout(1500);
 await p.screenshot({path:'/tmp/rosa/03-world.png',fullPage:true});
 const info=await p.evaluate(()=>({world:typeof world!=='undefined'?world:null,px:typeof px!=='undefined'?px:null,py:typeof py!=='undefined'?py:null,cam:typeof CAM!=='undefined'?CAM:(window.cam||null)}));
 console.log(JSON.stringify(info));
 await b.close();
})();
