/* Renders the mock documents in the SHIPPED reader and writes the pictures beside this file.
   node docs/mocks/2026-09-14-la-sobremesa/render.js   (playwright-core on NODE_PATH, CHROMIUM_PATH set)
   Meridian's reader is the cream paper; the town's is the night paper — both are the engine's. */
const path=require('path'),fs=require('fs');
const {chromium}=require('playwright-core');
const ROOT=path.resolve(__dirname,'..','..','..');
const OUT=__dirname;
const DOCS=fs.readFileSync(path.join(__dirname,'mockdocs.js'),'utf8');
async function boot(b,shell,w,h){
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:true,isMobile:w<500,bypassCSP:true}); /* the town's CSP is script-src 'self'; the injected documents are presentation, not the game */
  p.on('pageerror',e=>console.log('PAGEERROR',String(e).slice(0,200)));
  await p.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
  await p.goto('file://'+path.join(ROOT,shell));
  await p.waitForTimeout(1500);
  await p.getByText('The Architect').click();await p.waitForTimeout(700);
  await p.click('#begin');await p.waitForTimeout(2200);
  await p.addScriptTag({content:DOCS});
  return p;
}
async function shoot(p,key,lng,file){
  await p.evaluate(([k,l])=>{ if(l){lang=l;} docOpen(window.MOCKDOCS[k]);
    /* the paper scrolls inside a box the height of the phone; for a picture of the whole document,
       let it run. Presentation only — nothing here is the reader's own behaviour. */
    const r=document.getElementById('reader'),ps=document.getElementById('paperSheet'),sc=document.getElementById('paperScroll');
    r.style.position='absolute';r.style.height='auto';r.style.maxHeight='none';r.style.minHeight='0';r.style.overflow='visible';
    ps.style.maxHeight='none';sc.style.maxHeight='none';sc.style.overflow='visible';sc.style.flex='none';
  },[key,lng||'']);
  await p.waitForTimeout(500);
  const el=await p.$('#paperSheet');
  await el.screenshot({path:path.join(OUT,file)});
  const box=await el.boundingBox();
  console.log(file,Math.round(box.width)+'×'+Math.round(box.height),'CSS px');
}
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  let p=await boot(b,'index.html',360,780);
  await shoot(p,'recipe','en','m3-recipe-360-en.png');
  await shoot(p,'recipe','es','m3-recipe-360-es.png');
  await shoot(p,'week','en','m5-week-360-en.png');
  await shoot(p,'factA','en','m6a-fact-note-360.png');
  await shoot(p,'factB','en','m6b-fact-table-360.png');
  await shoot(p,'factC','en','m6c-fact-badge-360.png');
  await p.close();
  p=await boot(b,'index.html',640,900);
  await shoot(p,'recipe','en','m4-recipe-560-en.png');
  await p.close();
  p=await boot(b,'changarrito/index.html',360,780);
  await shoot(p,'recipe','en','m3-recipe-360-night.png');
  await p.close();
  await b.close();
})().catch(e=>{console.error('ERR',e);process.exit(1);});
