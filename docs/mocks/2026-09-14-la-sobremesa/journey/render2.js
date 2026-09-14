/* Renders the JOURNEY's pictures in the shipped game and writes them beside this file, with a manifest
   that carries Lupe's admission ticket for every one (docs/UI-REVIEW.md §1): the matrix row, the
   language, the shell, and whether the screen's own clip was left ON (`unmodified`) or switched off
   so the whole document fits one picture (`unrolled` — illustrates, never decides), plus the two
   fold numbers (document height · visible height) read off the live DOM.
   node docs/mocks/2026-09-14-la-sobremesa/journey/render2.js  (playwright-core on NODE_PATH, CHROMIUM_PATH set) */
const path=require('path'),fs=require('fs');
const {chromium}=require('playwright-core');
const ROOT=path.resolve(__dirname,'..','..','..','..');
const OUT=__dirname;
const DOCS1=fs.readFileSync(path.join(__dirname,'..','mockdocs.js'),'utf8');
const DOCS2=fs.readFileSync(path.join(__dirname,'mockdocs2.js'),'utf8');
const ROWS={'390x844':{w:390,h:844,name:'phone portrait'},'844x390':{w:844,h:390,name:'phone landscape'}};
const manifest=[];
async function boot(b,shell,row){
  const {w,h}=ROWS[row];
  const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2,hasTouch:true,isMobile:true,bypassCSP:true});
  p.on('pageerror',e=>console.log('PAGEERROR',String(e).slice(0,200)));
  await p.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
  await p.goto('file://'+path.join(ROOT,shell));
  await p.waitForTimeout(1500);
  return p;
}
async function begin(p){
  await p.getByText('The Architect').click();await p.waitForTimeout(700);
  await p.click('#begin');await p.waitForTimeout(2200);
  await p.addScriptTag({content:DOCS1});await p.addScriptTag({content:DOCS2});
}
async function open(p,key,lng){
  await p.evaluate(([k,l])=>{ lang=l; try{if(typeof applyLang==='function')applyLang();}catch(e){} docOpen(window.MOCKDOCS[k]); },[key,lng]);
  await p.waitForTimeout(500);
  return await p.evaluate(()=>{const sc=document.getElementById('paperScroll'),ps=document.getElementById('paperSheet');
    return {doc:Math.round(sc.scrollHeight),visible:Math.round(sc.clientHeight),sheet:Math.round(ps.getBoundingClientRect().width)};});
}
async function shotDoc(p,id,key,row,lng,shell,mode){
  const fold=await open(p,key,lng);
  const file=`${id}-${key}-${row}-${lng}-${shell}-${mode}.png`;
  if(mode==='unmodified'){ await p.screenshot({path:path.join(OUT,file)}); }
  else{ /* PRESENTATION ONLY: the reader's own scroll box is switched off so the whole document is one picture */
    await p.evaluate(()=>{const r=document.getElementById('reader'),ps=document.getElementById('paperSheet'),sc=document.getElementById('paperScroll');
      r.style.position='absolute';r.style.height='auto';r.style.maxHeight='none';r.style.minHeight='0';r.style.overflow='visible';
      ps.style.maxHeight='none';sc.style.maxHeight='none';sc.style.overflow='visible';sc.style.flex='none';});
    /* the fold, MEASURED on this document before the walls came down (30 px of head + the scroll box), drawn INTO
       the picture so the PNG carries it wherever it travels (Lupe, run 9, A3) */
    await p.evaluate((v)=>{const ps=document.getElementById('paperSheet');ps.style.position='relative';
      const f=document.createElement('div');f.style.cssText='position:absolute;left:0;right:0;top:'+(30+v)+'px;height:0;border-top:2px dashed #A97FFF;pointer-events:none;z-index:9';
      const b=document.createElement('b');b.textContent='fold · '+v+' px visible';b.style.cssText='position:absolute;right:0;bottom:0;background:#A97FFF;color:#160F26;font:600 10px ui-monospace,monospace;padding:3px 6px';
      f.appendChild(b);ps.appendChild(f);},fold.visible);
    await p.waitForTimeout(300);
    await (await p.$('#paperSheet')).screenshot({path:path.join(OUT,file)});
    await p.reload();await p.waitForTimeout(1500);await begin(p); /* put the walls back for the next picture */
  }
  manifest.push({file,screen:key,row,rowName:ROWS[row].name,lang:lng,shell,mode,docHeight:fold.doc,visibleHeight:fold.visible,sheetWidth:fold.sheet,order:'real reader'});
  console.log(file,'doc',fold.doc,'visible',fold.visible,'sheet',fold.sheet);
  if(mode==='unmodified'){await p.evaluate(()=>{try{document.getElementById('docClose').click();}catch(e){}});await p.waitForTimeout(300);}
}
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH,args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const KEYS=['drawer','shifts','recipeHome','collection','house','quiet'];
  /* ---- the documents, night shell (the town's paper), both rows, both languages ---- */
  let p=await boot(b,'changarrito/index.html','390x844');await begin(p);
  for(const k of KEYS){await shotDoc(p,'j',k,'390x844','en','night','unmodified');await shotDoc(p,'j',k,'390x844','es','night','unmodified');}
  for(const k of KEYS){await shotDoc(p,'j',k,'390x844','en','night','unrolled');}
  await p.close();
  p=await boot(b,'changarrito/index.html','844x390');await begin(p);
  for(const k of KEYS){await shotDoc(p,'j',k,'844x390','en','night','unmodified');}
  await p.close();
  /* ---- ORDER 1: the real game today, nothing injected ---- */
  p=await boot(b,'index.html','390x844');
  await p.screenshot({path:path.join(OUT,'j-frontdoor-390x844-en-cream-unmodified.png')});
  manifest.push({file:'j-frontdoor-390x844-en-cream-unmodified.png',screen:'frontdoor',row:'390x844',rowName:'phone portrait',lang:'en',shell:'cream',mode:'unmodified',order:'real game, untouched'});
  await p.getByText('The Architect').click();await p.waitForTimeout(700);await p.click('#begin');await p.waitForTimeout(2600);
  await p.screenshot({path:path.join(OUT,'j-street-390x844-en-cream-unmodified.png')});
  manifest.push({file:'j-street-390x844-en-cream-unmodified.png',screen:'street',row:'390x844',rowName:'phone portrait',lang:'en',shell:'cream',mode:'unmodified',order:'real game, untouched'});
  /* the map today, with three quests done so past, present and open exist at once */
  await p.evaluate(()=>{[0,1,2].forEach(i=>done.add(i));openMap();});await p.waitForTimeout(600);
  await p.screenshot({path:path.join(OUT,'j-maptoday-390x844-en-cream-unmodified.png')});
  manifest.push({file:'j-maptoday-390x844-en-cream-unmodified.png',screen:'maptoday',row:'390x844',rowName:'phone portrait',lang:'en',shell:'cream',mode:'unmodified',order:'real game, state forced (3 quests done)'});
  /* the map AFTER — markers drawn on the shipped canvas from the engine's own state; a hack, thrown away */
  const info=await p.evaluate(()=>{const w=WORLDS[PL.street];const list=[];
    (w.npcs||[]).forEach(n=>{const qi=(typeof pendingAt==='function')?pendingAt(n):undefined;if(qi===undefined||qi===null)return;list.push({id:n.npc,x:n.x,y:n.y,qi});});
    const nextQi=[...Array(AQ().length).keys()].find(i=>!done.has(i)&&qOpen(i));let next=null;
    Object.keys(WORLDS).forEach(wid=>{(WORLDS[wid].npcs||[]).forEach(n=>{if(next)return;if((n.q||[]).includes(nextQi)){const M=typeof MAPDOT!=='undefined'?MAPDOT:{};const at=wid===PL.street?[n.x,n.y]:(M[wid]||null);next={id:n.npc,world:wid,x:at?at[0]:null,y:at?at[1]:null,qi:nextQi};}});});
    return {open:list,nextQi,next};});
  await p.evaluate((info)=>{const mc=document.getElementById('mapcv'),g=mc.getContext('2d'),s=10;
    const marks=info.open.slice();if(info.next&&info.next.x!==null&&!marks.some(o=>o.qi===info.next.qi))marks.push(info.next);
    marks.forEach(o=>{const cx=o.x*s+s/2,cy=o.y*s+s/2,next=o.qi===info.nextQi;
      g.fillStyle='rgba(15,12,20,.35)';g.beginPath();g.ellipse(cx,cy+7,6,2.5,0,0,7);g.fill();
      g.fillStyle=next?'#E0662B':'#F2B705';g.beginPath();g.arc(cx,cy-2,6.5,0,7);g.fill();g.strokeStyle='#2A2620';g.lineWidth=1.5;g.stroke();
      g.fillStyle='#2A2620';g.font='bold 9px sans-serif';g.textAlign='center';g.fillText('!',cx,cy+1.5);
      if(next){g.strokeStyle='#E0662B';g.lineWidth=2;g.beginPath();g.arc(cx,cy-2,11,0,7);g.stroke();}});
    (WORLDS[PL.street].npcs||[]).forEach(n=>{const qs=n.q||[];if(!qs.length||!qs.every(qi=>done.has(qi)))return;const cx=n.x*s+s/2,cy=n.y*s+s/2;
      g.fillStyle='#8A8474';g.beginPath();g.arc(cx,cy-2,5,0,7);g.fill();g.fillStyle='#F2F1EA';g.font='bold 8px sans-serif';g.textAlign='center';g.fillText('✓',cx,cy+1);});
    const note=document.getElementById('mapNote');note.innerHTML='';const leg=document.createElement('div');leg.style.cssText='font-size:.74rem;color:var(--muted);margin:6px 0 4px';
    leg.innerHTML='<span style="color:#E0662B">●</span> next &nbsp; <span style="color:#F2B705">●</span> open &nbsp; <span style="color:#8A8474">●</span> done &nbsp; <span style="color:#7A3FE0">◉</span> you are here';note.appendChild(leg);},info);
  await p.screenshot({path:path.join(OUT,'j-mapafter-390x844-en-cream-unmodified.png')});
  manifest.push({file:'j-mapafter-390x844-en-cream-unmodified.png',screen:'mapafter',row:'390x844',rowName:'phone portrait',lang:'en',shell:'cream',mode:'unmodified',order:'real game, markers forced onto the shipped canvas (a hack, thrown away)'});
  await p.close();
  /* ---- the questionnaire page, as published ---- */
  const Q=path.join(process.env.QPAGE||'','');
  if(Q&&fs.existsSync(Q)){
    p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
    await p.route('**',r=>r.request().url().startsWith('file://')||r.request().url().startsWith('data:')?r.continue():r.abort());
    await p.setContent('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'+fs.readFileSync(Q,'utf8')+'</body></html>');
    await p.waitForTimeout(1000);await p.screenshot({path:path.join(OUT,'j-questionnaire-intro-390x844-en-night-unmodified.png')});
    manifest.push({file:'j-questionnaire-intro-390x844-en-night-unmodified.png',screen:'questionnaire',row:'390x844',rowName:'phone portrait',lang:'en',shell:'night',mode:'unmodified',order:'the published page, untouched (fonts fell back: no network)'});
    await p.getByRole('button',{name:'Start'}).click();await p.waitForTimeout(400);
    await p.screenshot({path:path.join(OUT,'j-questionnaire-q1-390x844-en-night-unmodified.png')});
    manifest.push({file:'j-questionnaire-q1-390x844-en-night-unmodified.png',screen:'questionnaire',row:'390x844',rowName:'phone portrait',lang:'en',shell:'night',mode:'unmodified',order:'the published page, untouched (fonts fell back: no network)'});
    await p.close();
  }
  fs.writeFileSync(path.join(OUT,'manifest.json'),JSON.stringify(manifest,null,1));
  await b.close();
})().catch(e=>{console.error('ERR',e);process.exit(1);});
