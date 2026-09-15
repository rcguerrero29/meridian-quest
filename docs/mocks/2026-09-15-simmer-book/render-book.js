/* Renders SIMMER's three book pages in the shipped reader and writes them beside this file.
   Same discipline as the journey's harness: the pictures are the real reader drawing real blocks.
   node docs/mocks/2026-09-15-simmer-book/render-book.js */
const path=require('path'),fs=require('fs');
const {chromium}=require('/home/user/meridian-quest/node_modules/playwright-core');
const ROOT=path.resolve(__dirname,'..','..','..');
const OUT=__dirname;
const PAGES=fs.readFileSync(path.join(__dirname,'bookpages.js'),'utf8');
const EXE=process.env.CHROMIUM_PATH||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
(async()=>{
  const b=await chromium.launch({executablePath:EXE});
  const out=[];
  for(const [row,w,h] of [['390x844',390,844],['844x390',844,390]]){
    const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:true,isMobile:true,bypassCSP:true});
    p.on('pageerror',e=>console.log('PAGEERROR',String(e).slice(0,160)));
    await p.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
    await p.goto('file://'+path.join(ROOT,'index.html'));
    await p.waitForTimeout(1200);
    await p.getByText('The Architect').click();await p.waitForTimeout(600);
    await p.click('#begin');await p.waitForTimeout(1800);
    await p.addScriptTag({content:PAGES});
    for(const k of ['simmerBook1','simmerBook2','simmerBook3']){
      await p.evaluate(k=>{docOpen(window.MOCKDOCS[k]);},k);
      await p.waitForTimeout(400);
      const fold=await p.evaluate(()=>{const sc=document.getElementById('paperScroll');
        return {doc:Math.round(sc.scrollHeight),visible:Math.round(sc.clientHeight)};});
      const file=`${k}-${row}-cream.png`;
      await p.screenshot({path:path.join(OUT,file)});
      out.push({file,row,doc:fold.doc,visible:fold.visible,belowFold:fold.doc-fold.visible});
      console.log(file,'doc',fold.doc,'visible',fold.visible,'below the fold',fold.doc-fold.visible);
    }
    await p.close();
  }
  fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(out,null,1));
  await b.close();
})().catch(e=>{console.error('FAIL',e.message);process.exit(1);});
