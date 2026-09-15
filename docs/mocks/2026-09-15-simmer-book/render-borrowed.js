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
       wall.addColorStop(0,"#FCF6E8");wall.addColorStop(1,"#E2D8C2");   /* warmer than the first pass */
       g.fillStyle=wall;g.fillRect(0,0,W,cy);
       const top=g.createLinearGradient(0,cy,0,H);
       top.addColorStop(0,"#8A6244");top.addColorStop(0.35,"#6B4A33");top.addColorStop(1,"#4C3628");
       g.fillStyle=top;g.fillRect(0,cy,W,H-cy);
       /* wood: a counter with no grain is a brown rectangle, which is the fault the flat pictures had */
       g.save();g.globalAlpha=0.10;
       for(let i=0;i<26;i++){const y=cy+6+i*((H-cy)/26);
         g.strokeStyle=(i%3===0)?"#2B1D12":"#C79A6E";g.lineWidth=(i%5===0)?1.6:0.8;
         g.beginPath();g.moveTo(0,y);
         for(let x=0;x<=W;x+=18)g.lineTo(x,y+Math.sin((x*0.03)+i)*1.1);
         g.stroke();}
       g.restore();
       const seam=g.createLinearGradient(0,cy,0,cy+26);
       seam.addColorStop(0,"rgba(26,16,10,0.42)");seam.addColorStop(1,"rgba(26,16,10,0)");
       g.fillStyle=seam;g.fillRect(0,cy,W,26);return cy;};
     /* steam — OURS, not borrowed, and it is the proof of the layering idea: the code owns the
        atmosphere, the illustration owns the object. Hot food that gives off nothing reads as a toy. */
     const steam=(g,cx,topY,w)=>{g.save();
       for(let i=0;i<4;i++){const x=cx-w*0.24+i*(w*0.16), h=w*(0.42+((i*37)%19)/50);
         const gr=g.createLinearGradient(x,topY-h,x,topY);
         gr.addColorStop(0,"rgba(255,252,244,0)");gr.addColorStop(0.45,"rgba(255,252,244,0.20)");
         gr.addColorStop(1,"rgba(255,252,244,0.34)");
         g.fillStyle=gr;g.beginPath();
         g.moveTo(x,topY);
         g.bezierCurveTo(x-w*0.09,topY-h*0.35, x+w*0.09,topY-h*0.65, x-w*0.02,topY-h);
         g.bezierCurveTo(x+w*0.07,topY-h*0.62, x-w*0.05,topY-h*0.33, x+w*0.05,topY);
         g.closePath();g.fill();}
       g.restore();};
     /* one warm key across the whole scene, so borrowed objects and our room share a light */
     const relight=(g,W,H)=>{
       const k=g.createLinearGradient(0,0,W*0.9,H);
       k.addColorStop(0,"rgba(255,226,170,0.20)");k.addColorStop(0.45,"rgba(255,226,170,0)");
       g.save();g.globalCompositeOperation="overlay";g.fillStyle=k;g.fillRect(0,0,W,H);g.restore();
       const c=g.createLinearGradient(W,H,W*0.3,0);
       c.addColorStop(0,"rgba(60,70,110,0.16)");c.addColorStop(0.5,"rgba(60,70,110,0)");
       g.save();g.globalCompositeOperation="multiply";g.fillStyle=c;g.fillRect(0,0,W,H);g.restore();};
     let NOISE=null;
     const grain=(g,W,H)=>{ if(!NOISE){let sd=0x9E3779B9;const r=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296;};
         const n=document.createElement("canvas");n.width=n.height=96;const q=n.getContext("2d");
         const d=q.createImageData(96,96);
         for(let i=0;i<d.data.length;i+=4){const v=200+r()*55;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}
         q.putImageData(d,0,0);NOISE=n;}
       g.save();g.globalAlpha=0.075;g.globalCompositeOperation="multiply";
       for(let y=0;y<H;y+=96)for(let x=0;x<W;x+=96)g.drawImage(NOISE,x,y);g.restore();};
     const frame=(g,W,H)=>{g.strokeStyle="#B9BCC0";g.lineWidth=5;g.strokeRect(2.5,2.5,W-5,H-5);};
     /* THE PERSPECTIVE FIX (owner, 2026-09-15: "the stew looks circular but we are looking at the pot
        from an angle"). The borrowed pot is drawn front-on and its contents from straight above —
        two cameras in one object, which is the exact fault Pili named in our own first drawings.
        So we repaint the opening: the inner wall of the pot, seen from our angle, with the liquid
        sitting BELOW the rim as an ellipse. You look into it now instead of at a disc stuck on it. */
     const potFace=(g,cx,cy,r,o)=>{
       o=o||{};
       g.save();
       g.beginPath();g.ellipse(cx,cy,r*1.02,r*1.02,0,0,7);g.clip();   /* only ever inside the original opening */
       /* CONCAVE, not convex. The first pass ran light DOWNWARD and the opening read as a dome — a
          ball sitting in the pot. A hollow is dark where the near rim shadows the far wall, i.e. at
          the TOP, and lightens as the wall turns toward the light further down. */
       const wall=g.createLinearGradient(0,cy-r,0,cy+r*0.4);
       wall.addColorStop(0,o.wallTop||"#6E5741");wall.addColorStop(0.45,o.wallMid||"#A98A68");
       wall.addColorStop(1,o.wallLow||"#D8C2A2");
       g.fillStyle=wall;g.fillRect(cx-r*1.1,cy-r*1.1,r*2.2,r*2.2);
       /* the rim's own shadow, thrown down onto the far wall — the single cue that says "inside" */
       const sh=g.createLinearGradient(0,cy-r,0,cy-r*0.15);
       sh.addColorStop(0,"rgba(30,18,10,0.55)");sh.addColorStop(1,"rgba(30,18,10,0)");
       g.fillStyle=sh;g.fillRect(cx-r*1.1,cy-r*1.1,r*2.2,r*1.1);
       const ly=cy+r*0.30, lrx=r*0.99, lry=r*0.60;                    /* the liquid, an ELLIPSE, reaching the near rim */
       const br=g.createLinearGradient(cx-lrx,ly-lry,cx+lrx,ly+lry);
       br.addColorStop(0,o.high||"#9A6540");br.addColorStop(0.45,o.base||"#7C4A2A");br.addColorStop(1,o.core||"#583621");
       g.fillStyle=br;g.beginPath();g.ellipse(cx,ly,lrx,lry,0,0,7);g.fill();
       g.fillStyle="rgba(24,12,6,0.35)";                              /* the wall's shadow on the far side of the liquid */
       g.beginPath();g.ellipse(cx,ly-lry*0.62,lrx*0.96,lry*0.42,0,0,7);g.fill();
       if(o.top)o.top(g,cx,ly,lrx,lry);
       g.save();g.globalAlpha=0.20;g.fillStyle="#FFFFFF";             /* one wide, soft sheen: liquid, not gloss */
       g.beginPath();g.ellipse(cx-lrx*0.30,ly-lry*0.18,lrx*0.34,lry*0.40,-0.25,0,7);g.fill();g.restore();
       g.restore();
       g.save();g.globalAlpha=0.35;g.strokeStyle="#6B5B48";g.lineWidth=2;  /* the rim, back onto the repaint */
       g.beginPath();g.ellipse(cx,cy,r*1.0,r*1.0,0,0,7);g.stroke();g.restore();
     };
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
           /* the chopsticks were UNDER the pot and read as legs. They lie on the counter now, to
              one side, behind nothing. */
           g.save();g.translate(W*0.13,cy+74);g.rotate(-0.22);   /* on the counter, in front, touching nothing */
           put(g,"chopsticks",0,0,54);g.restore();
           put(g,"cooked_rice",W*0.20,cy+44,58);                 /* back left, smaller: depth */
           put(g,"cooked_rice",W*0.79,cy+54,66);                 /* front right, larger */
           steam(g,W*0.48,cy-36,120);
           const S=132, PX=W*0.48, PY=cy+60;
           put(g,"pot_of_food",PX,PY,S);
           /* MEASURED, not eyeballed: the icon was rendered to a buffer and the warm region found by
              pixel, giving centre (0.498, 0.453) and radius 0.256 of its box — and rx 0.256 against
              ry 0.246 is the arithmetic of the owner's own observation: the contents really are a
              circle. Guessing put it 4% too high and 10% too small, which is what left a crescent
              of the original showing. */
           potFace(g, PX+S*(0.498-0.5), PY-S+S*0.453, S*0.262, {top:(g,cx,ly,lrx,lry)=>{
             const cube=(x,y,w,h)=>{g.fillStyle="rgba(24,12,6,0.30)";
               g.beginPath();g.ellipse(x+w/2,y+h*0.95,w*0.55,h*0.28,0,0,7);g.fill();
               g.fillStyle="#FBF7EA";g.fillRect(x,y,w,h*0.55);
               g.fillStyle="#D9D0BA";g.fillRect(x,y+h*0.55,w,h*0.45);};
             cube(cx-lrx*0.52,ly-lry*0.30,11,8);
             cube(cx+lrx*0.12,ly-lry*0.02,10,7);
             g.fillStyle="#5F7A52";
             [[-0.12,-0.52],[0.46,-0.36],[0.08,0.42]].forEach(([a,b])=>{
               g.beginPath();g.ellipse(cx+lrx*a,ly+lry*b,4,2.4,0,0,7);g.fill();});
             g.save();g.globalAlpha=0.75;g.fillStyle="#B44A21";
             g.beginPath();g.ellipse(cx-lrx*0.10,ly+lry*0.12,lrx*0.30,lry*0.16,0.06,0,7);g.fill();g.restore();
           }});
           relight(g,W,H);vign(g,W,H);grain(g,W,H);folds(g,W,H,2);frame(g,W,H);},
         drew:"one pot, two bowls — the table is laid for two because she cooked, not because a day passed",
         said:"“Made it too salty and it was still the best thing all week. Less doenjang next time, or more water — one of the two.”",
         mark:"again",
         recipe:[["Doenjang","a heaping spoonful"],["Water or anchovy stock","3 cups"],["Tofu","half a block, cubed"],["Courgette","a quarter, sliced"],["Scallion","one, at the end"]],
         credit:"Two cooks, two pots: she builds it on anchovy stock, he uses water and says the doenjang IS the stock. Cook whichever one you are."},
       kimbap:{t:"Kimbap",folds:3,
         art:(g,W,H)=>{const cy=stage(g,W,H);
           /* NO borrowed dish here: the nearest icon is nigiri and nigiri is not kimbap. So the room
              is borrowed and the dish is ours — which is the mix, demonstrated rather than argued. */
           put(g,"chopsticks",W*0.88,cy+46,50);
           g.fillStyle="#D4D8DC";g.fillRect(W*0.07,cy+34,W*0.72,9);        /* a steel board */
           g.fillStyle="#9EA3A8";g.fillRect(W*0.07,cy+43,W*0.72,4);
           const d=[44,37,47,39,45,35], gap=3;                              /* uneven: her cuts */
           let x=W*0.085;
           d.forEach(sz=>{
             const ccx=x+sz/2, ccy=cy+34-sz*0.30;
             g.fillStyle="rgba(26,16,10,0.34)";
             g.beginPath();g.ellipse(ccx+2,cy+36,sz*0.42,sz*0.12,0,0,7);g.fill();
             const nori=g.createLinearGradient(ccx-sz/2,ccy-sz/2,ccx+sz/2,ccy+sz/2);
             nori.addColorStop(0,"#31402A");nori.addColorStop(1,"#141B12");
             g.fillStyle=nori;g.beginPath();g.ellipse(ccx,ccy,sz/2,sz/2*0.82,0,0,7);g.fill();
             const rice=g.createLinearGradient(ccx-sz/2,ccy-sz/2,ccx+sz/2,ccy+sz/2);
             rice.addColorStop(0,"#FFFDF4");rice.addColorStop(1,"#DCD3BE");
             g.fillStyle=rice;g.beginPath();g.ellipse(ccx,ccy,sz/2-5,(sz/2-5)*0.82,0,0,7);g.fill();
             g.fillStyle="#E8C15A";g.fillRect(ccx-5,ccy-4,10,7);
             g.fillStyle="#5F7A52";g.fillRect(ccx-9,ccy+1,6,4);
             g.fillStyle="#B44A21";g.fillRect(ccx+3,ccy+2,5,3);
             g.save();g.globalAlpha=0.35;g.fillStyle="#FFFFFF";
             g.beginPath();g.ellipse(ccx-sz*0.16,ccy-sz*0.18,sz*0.10,sz*0.07,-0.4,0,7);g.fill();g.restore();
             x+=sz+gap;});
           put(g,"hot_pepper",W*0.90,cy+30,34);
           relight(g,W,H);vign(g,W,H);grain(g,W,H);folds(g,W,H,3);frame(g,W,H);},
         drew:"rounds cut by hand — uneven, and nothing in the game says so",
         said:"“The cutting is the good part. Mine are all different sizes and I don’t care.”",
         mark:"again",
         recipe:[["Short-grain rice","2 cups, cooked, still warm"],["Gim (seaweed sheets)","4"],["Egg","2, in a flat omelette"],["Spinach","a handful, blanched"],["Sesame oil","for the rice, and for your hands"]],
         credit:"Laid piece by piece, then cut. The pieces are the point; the line you cut along is yours."},
       namul:{t:"Sigeumchi namul",folds:1,
         art:(g,W,H)=>{const cy=stage(g,W,H);
           g.save();g.translate(W*0.87,cy+62);g.rotate(0.24);put(g,"chopsticks",0,0,54);g.restore();
           put(g,"leafy_green",W*0.17,cy+40,52);
           const S=124, PX=W*0.52, PY=cy+58;
           put(g,"shallow_pan_of_food",PX,PY,S);
           /* the borrowed pan is full of yellow rice. Same repaint, green: the technique transfers,
              which is the point of having built it once. */
           potFace(g, PX+S*(0.498-0.5), PY-S+S*0.455, S*0.250, {
             wallTop:"#6E5741",wallMid:"#A98A68",wallLow:"#D8C2A2",
             high:"#6B8A5C",base:"#4E6B45",core:"#374E36",
             top:(g,cx,ly,lrx,lry)=>{
               g.fillStyle="#7E9C6A";
               [[-0.44,-0.10],[0.10,-0.28],[0.38,0.12],[-0.12,0.30]].forEach(([a,b])=>{
                 g.save();g.translate(cx+lrx*a,ly+lry*b);g.rotate(a*1.4);
                 g.beginPath();g.ellipse(0,0,lrx*0.22,lry*0.16,0,0,7);g.fill();g.restore();});
               g.fillStyle="#F2ECDA";
               [[-0.30,0.18],[0.22,-0.10],[0.02,0.40],[0.44,0.30],[-0.50,-0.30]].forEach(([a,b])=>{
                 g.beginPath();g.ellipse(cx+lrx*a,ly+lry*b,2.2,1.6,0,0,7);g.fill();});  /* sesame */
             }});
           relight(g,W,H);vign(g,W,H);grain(g,W,H);folds(g,W,H,1);frame(g,W,H);},
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
