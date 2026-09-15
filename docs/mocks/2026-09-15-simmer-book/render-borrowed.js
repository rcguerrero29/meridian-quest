/* SIMMER — the three book pages again, this time with BORROWED illustrations.
   Microsoft Fluent Emoji (MIT) via @iconify-json/fluent-emoji — see LICENCES.md in this folder for
   why this set and not the other three. The stage, the shadows, the contact shadows and the palette
   tint are ours (docs/la-sobremesa.md §19), which is the point: borrowed art drops into the same lit
   room our own drawings live in, so nothing is wasted when AJ's arrive.
   PLACEHOLDERS FOR TESTING THE LOOP. Not art direction — the dishes are wrong and LICENCES.md says so.
   node docs/mocks/2026-09-15-simmer-book/render-borrowed.js */
const path=require('path'),fs=require('fs');
const {chromium}=require('/home/user/meridian-quest/node_modules/playwright-core');
const SET=require('/tmp/emojitest/node_modules/@iconify-json/fluent-emoji/icons.json');
const OUT=__dirname, ROOT=path.resolve(__dirname,'..','..','..');
const svg=n=>{const i=SET.icons[n];if(!i)throw new Error('no icon '+n);
  return 'data:image/svg+xml;base64,'+Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SET.width} ${SET.height}" width="512" height="512">${i.body}</svg>`).toString('base64');};
const ICONS={};['pot-of-food','cooked-rice','sushi','hot-pepper','leafy-green','shallow-pan-of-food',
  'chopsticks','steaming-bowl','green-salad'].forEach(n=>ICONS[n.replace(/-/g,'_')]=svg(n));

(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const p=await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
 p.on('pageerror',e=>console.log('PAGEERROR',String(e).slice(0,140)));
 await p.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
 await p.goto('file://'+path.join(ROOT,'index.html'));await p.waitForTimeout(1200);
 await p.getByText('The Architect').click();await p.waitForTimeout(500);
 await p.click('#begin');await p.waitForTimeout(1600);
 await p.evaluate(async(IC)=>{window.__IMG={};
   await Promise.all(Object.entries(IC).map(([k,src])=>new Promise(res=>{
     const im=new Image();im.onload=()=>{window.__IMG[k]=im;res();};im.onerror=()=>res();im.src=src;})));},ICONS);

 const made=[];
 for(const key of ['jjigae','kimbap','namul']){
   const fold=await p.evaluate((key)=>{
     const I=window.__IMG;
     const stage=(g,W,H)=>{const cy=H*0.46;
       const wall=g.createLinearGradient(0,0,0,cy);
       wall.addColorStop(0,"#FBF7EC");wall.addColorStop(1,"#E4DDCB");
       g.fillStyle=wall;g.fillRect(0,0,W,cy);
       const top=g.createLinearGradient(0,cy,0,H);
       top.addColorStop(0,"#8A6244");top.addColorStop(0.35,"#6B4A33");top.addColorStop(1,"#4C3628");
       g.fillStyle=top;g.fillRect(0,cy,W,H-cy);
       const seam=g.createLinearGradient(0,cy,0,cy+26);
       seam.addColorStop(0,"rgba(26,16,10,0.42)");seam.addColorStop(1,"rgba(26,16,10,0)");
       g.fillStyle=seam;g.fillRect(0,cy,W,26);return cy;};
     const drop=(g,cx,cy,rx,ry,a)=>{const gr=g.createRadialGradient(cx,cy,0,cx,cy,rx);
       gr.addColorStop(0,"rgba(30,18,10,"+a+")");gr.addColorStop(0.6,"rgba(30,18,10,"+a*0.4+")");
       gr.addColorStop(1,"rgba(30,18,10,0)");
       g.save();g.translate(cx,cy);g.scale(1,ry/rx);g.translate(-cx,-cy);
       g.fillStyle=gr;g.beginPath();g.arc(cx,cy,rx,0,7);g.fill();g.restore();};
     /* ONE line is the whole palette fix: borrowed art takes the room's temperature */
     const put=(g,k,cx,baseY,size)=>{const im=I[k];if(!im)return;
       drop(g,cx+size*0.08,baseY-size*0.03,size*0.50,size*0.14,0.5);
       g.save();g.filter="sepia(0.55) saturate(0.85) hue-rotate(-8deg) brightness(0.97)";
       g.drawImage(im,cx-size/2,baseY-size,size,size);g.restore();};
     const vign=(g,W,H)=>{const vg=g.createRadialGradient(W/2,H*0.55,Math.min(W,H)*0.28,W/2,H*0.55,Math.max(W,H)*0.8);
       vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(28,18,10,0.28)");g.fillStyle=vg;g.fillRect(0,0,W,H);};
     const folds=(g,W,H,n)=>{const s=26;for(let i=0;i<n;i++){const x=W-12-i*(s+6),y=12;
       g.fillStyle="#E9E0C8";g.beginPath();g.moveTo(x,y);g.lineTo(x-s,y);g.lineTo(x,y+s);g.closePath();g.fill();
       g.strokeStyle="#B44A21";g.lineWidth=2;g.beginPath();g.moveTo(x-s,y);g.lineTo(x,y+s);g.stroke();}};
     const P={
       jjigae:{t:"Doenjang jjigae",folds:2,
         art:(g,W,H)=>{const cy=stage(g,W,H);
           put(g,"cooked_rice",W*0.19,cy+44,60);put(g,"cooked_rice",W*0.81,cy+44,60);
           put(g,"pot_of_food",W*0.50,cy+58,126);put(g,"chopsticks",W*0.50,cy+74,44);
           vign(g,W,H);folds(g,W,H,2);},
         drew:"one pot, two bowls — the table is laid for two because she cooked, not because a day passed",
         said:"“Made it too salty and it was still the best thing all week. Less doenjang next time, or more water — one of the two.”",
         mark:"again",
         recipe:[["Doenjang","a heaping spoonful"],["Water or anchovy stock","3 cups"],["Tofu","half a block, cubed"],["Courgette","a quarter, sliced"],["Scallion","one, at the end"]],
         credit:"Two cooks, two pots: she builds it on anchovy stock, he uses water and says the doenjang IS the stock. Cook whichever one you are."},
       kimbap:{t:"Kimbap",folds:3,
         art:(g,W,H)=>{const cy=stage(g,W,H);
           [[0.16,58],[0.36,50],[0.57,62],[0.78,52]].forEach(([x,s],i)=>put(g,"sushi",W*x,cy+40+(i%2)*5,s));
           put(g,"hot_pepper",W*0.92,cy+28,38);
           vign(g,W,H);folds(g,W,H,3);},
         drew:"rounds cut by hand — uneven, and nothing in the game says so",
         said:"“The cutting is the good part. Mine are all different sizes and I don’t care.”",
         mark:"again",
         recipe:[["Short-grain rice","2 cups, cooked, still warm"],["Gim (seaweed sheets)","4"],["Egg","2, in a flat omelette"],["Spinach","a handful, blanched"],["Sesame oil","for the rice, and for your hands"]],
         credit:"Laid piece by piece, then cut. The pieces are the point; the line you cut along is yours."},
       namul:{t:"Sigeumchi namul",folds:1,
         art:(g,W,H)=>{const cy=stage(g,W,H);
           put(g,"leafy_green",W*0.20,cy+38,54);
           put(g,"shallow_pan_of_food",W*0.53,cy+54,116);
           put(g,"chopsticks",W*0.86,cy+40,52);
           vign(g,W,H);folds(g,W,H,1);},
         drew:"one small dish and a pair of chopsticks — the whole thing is five minutes",
         said:"“Didn’t feel like cooking. Made this anyway and ate it standing up.”",
         mark:"fine",
         recipe:[["Spinach","a big bunch, blanched 30 seconds"],["Garlic","one clove, minced"],["Sesame oil","a spoonful"],["Toasted sesame","a pinch, at the end"],["Salt","to taste"]],
         credit:"A namul is the cheapest, most repeatable thing in a kitchen — season a vegetable, eat it cold."}
     }[key];
     const d={id:key,title:{en:P.t,es:P.t},build:()=>[
       {art:P.art,aspect:0.60},
       {kv:[["Drawn",P.drew]]},
       {note:P.said},
       {kv:[["How it went",P.mark]]},
       {h:"The recipe, as it came"},
       {kv:P.recipe},
       {blank:"In your kitchen"},
       {p:P.credit}
     ]};
     docOpen(d);
     const sc=document.getElementById('paperScroll');
     return {doc:Math.round(sc.scrollHeight),visible:Math.round(sc.clientHeight)};
   },key);
   await p.waitForTimeout(450);
   const file='borrowed-'+key+'-390x844.png';
   await p.screenshot({path:path.join(OUT,file)});
   made.push({file,...fold,belowFold:fold.doc-fold.visible});
   console.log(file,'doc',fold.doc,'visible',fold.visible,'below the fold',fold.doc-fold.visible);
 }
 fs.writeFileSync(path.join(OUT,'borrowed-manifest.json'),JSON.stringify(made,null,1));
 await b.close();
})().catch(e=>{console.error('FAIL',e.message);process.exit(1);});
