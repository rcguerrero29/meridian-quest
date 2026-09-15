/* SIMMER — three pages of her book, 2026-09-15.
   The gate Tavo names in docs/la-sobremesa.md §17.4: "Make three pages of the book by hand. Show her.
   Ask if she wants a fourth." Drawn to Pili's floors (§19.3) and her palette resolution (§19.4):
     · 24×24 source art at ×4 = 96 CSS px, never the 16×16 that made a dish unnameable
     · ONE camera — where your eyes are at a counter: the top of the board AND the front of the pot
     · every white vessel carries a 2-px stainless rim, because porcelain #F4F1EA against the cream
       paper #F7F2E4 is Δ0.8 and would vanish exactly as the sugar skulls did
     · the picture's frame is the kitchen's ACCENT (stainless), never its ground
     · gochugaru never touches the onggi — it is a mark on metal or on the page
     · three masses, a 2:1 ladder between neighbours, nothing below 48 px
     · no date, no count, no percentage, no lock (§19.5)
   THE DISHES ARE PLACEHOLDERS, deliberately: AJ's own dish is not in this repository and will not be
   (Zeni, #200). These are three common, published Korean dishes standing in for it.
   Render: node docs/mocks/2026-09-15-simmer-book/render-book.js */
(function(){
  const L=()=>(typeof lang!=="undefined"&&lang==="es");
  window.MOCKDOCS = window.MOCKDOCS || {};
  const D = window.MOCKDOCS;
  /* the measured palette — every value re-run in a script, docs/la-sobremesa.md §19.2 */
  const P = {
    paper:"#F7F2E4",      /* 241.9 the cream reader */
    onggi:"#6B4A33",      /* 81.2  the ROOM (the rung on a card is #977150 — different job) */
    steel:"#B9BCC0",      /* 187.6 the structure: Δ106.4 from the onggi */
    steelLit:"#D4D8DC",   /* 215.3 the lit edge of steel */
    porcelain:"#F4F1EA",  /* 241.1 needs the rim or it is the paper */
    gochu:"#B44A21",      /* 101.0 metal or page only */
    scallion:"#5F7A52",
    ink:"#2B2724",
    soft:"#8A8474",
    broth:"#7C4A2A",
    egg:"#E8C15A",
    nori:"#23301F"
  };
  /* ---------------- THE LIGHT MODEL ----------------
     The first pass of these pictures was flat canvas primitives: two values an object, no contact
     shadow, no specular, no texture, no light direction. That is not a talent gap, it is a MISSING
     MODEL — so this is the model, written once and applied by every object, the way the 3D view was
     fixed (docs/3D-LOG.md): one warm key from the upper left, one cool bounce off the counter, a
     contact shadow where any form meets its surface, one specular per glossy material, and grain
     over the whole frame at the end so nothing is a vector shape sitting on paper. */
  const KEY={x:-0.62,y:-0.78};                       /* upper-left, and every highlight obeys it */
  const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];
  const rgb=c=>"#"+c.map(v=>Math.max(0,Math.min(255,Math.round(v))).toString(16).padStart(2,"0")).join("");
  /* warm on the way up, cool on the way down — a single colour lightened neutrally is what makes
     plastic. Light adds red first; shadow keeps blue longest. */
  const lit =(h,t)=>{const c=hex(h);return rgb([c[0]+255*t*0.92, c[1]+255*t*0.80, c[2]+255*t*0.58]);};
  const shade=(h,t)=>{const c=hex(h);return rgb([c[0]*(1-t*1.05), c[1]*(1-t*0.98), c[2]*(1-t*0.80)]);};
  /* a material is a RAMP, not a colour: five stops from bounce to specular */
  const MAT=b=>({deep:shade(b,.55),core:shade(b,.28),base:b,high:lit(b,.16),spec:lit(b,.42)});

  /* a contact shadow — the single cheapest thing that makes an object SIT rather than float */
  function contact(g,cx,cy,rx,ry,strength){
    const gr=g.createRadialGradient(cx,cy,0,cx,cy,rx);
    gr.addColorStop(0,"rgba(30,18,10,"+(strength||0.55)+")");
    gr.addColorStop(0.55,"rgba(30,18,10,"+(strength||0.55)*0.45+")");
    gr.addColorStop(1,"rgba(30,18,10,0)");
    g.save();g.translate(cx,cy);g.scale(1,ry/rx);g.translate(-cx,-cy);
    g.fillStyle=gr;g.beginPath();g.arc(cx,cy,rx,0,7);g.fill();g.restore();
  }
  /* a cast shadow, thrown away from the key */
  function cast(g,cx,cy,rx,ry){
    g.save();g.globalAlpha=0.34;
    contact(g,cx-KEY.x*rx*0.55,cy-KEY.y*ry*0.28,rx*1.25,ry*1.05,0.7);
    g.restore();
  }
  /* one specular sliver, on the side the key is on, never a symmetric shine */
  function spec(g,cx,cy,rx,ry,a){
    g.save();g.globalAlpha=a==null?0.75:a;g.fillStyle="#FFFFFF";
    g.beginPath();g.ellipse(cx+KEY.x*rx*0.52,cy+KEY.y*ry*0.55,rx*0.30,ry*0.34,-0.5,0,7);g.fill();
    g.restore();
  }
  /* grain, over the FRAME, so no surface is a flat fill. Cheap and it is most of the difference
     between "a shape" and "a thing". */
  let NOISE=null;
  /* SEEDED. The first version used Math.random(), so two loads of the same code produced two
     different pictures — measured, hash 3963922671 vs 695642613 — which breaks every pixel-diff
     test on these mocks and breaks the owner's own rule that a thing should be recreatable. */
  let SEED=0x9E3779B9;
  const rnd=()=>{SEED=(SEED*1664525+1013904223)>>>0;return SEED/4294967296;};
  function grain(g,W,H,amt){
    if(!NOISE){SEED=0x9E3779B9;const n=document.createElement("canvas");n.width=n.height=96;const q=n.getContext("2d");
      const d=q.createImageData(96,96);
      for(let i=0;i<d.data.length;i+=4){const v=200+rnd()*55;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255;}
      q.putImageData(d,0,0);NOISE=n;}
    g.save();g.globalAlpha=amt==null?0.085:amt;g.globalCompositeOperation="multiply";
    for(let y=0;y<H;y+=96)for(let x=0;x<W;x+=96)g.drawImage(NOISE,x,y);
    g.restore();
  }

  const px=(g,u)=>(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x*u),Math.round(y*u),Math.max(1,Math.round(w*u)),Math.max(1,Math.round(h*u)));};

  /* A VESSEL, in the one camera Pili settled: where your eyes are at a counter — you see the MOUTH
     from slightly above AND the FRONT wall straight on. So: an ellipse you look into, a body that
     narrows to its foot, and a rim where the two meet. Not a rectangle — the first render of these
     drew boxes and they read as toasters. */
  function vessel(g,cx,baseY,w,h,o){
    const ry=w*0.17, topY=baseY-h, M=MAT(o.body);
    g.save();
    /* 1 · the cast shadow, thrown away from the key, BEFORE anything else */
    cast(g,cx,baseY+ry*0.30,w*0.50,ry*0.85);
    /* 2 · the body, across the key axis: highlight, base, core shadow, and a bounce at the very edge */
    const bg=g.createLinearGradient(cx-w*0.55,topY-h*0.2,cx+w*0.55,baseY+h*0.1);
    bg.addColorStop(0,M.high);bg.addColorStop(0.34,M.base);bg.addColorStop(0.78,M.core);bg.addColorStop(1,M.deep);
    g.fillStyle=bg;
    g.beginPath();
    g.moveTo(cx-w/2,topY);
    g.bezierCurveTo(cx-w*0.52,topY+h*0.55, cx-w*0.46,baseY-h*0.12, cx-w*0.40,baseY);
    g.lineTo(cx+w*0.40,baseY);
    g.bezierCurveTo(cx+w*0.46,baseY-h*0.12, cx+w*0.52,topY+h*0.55, cx+w/2,topY);
    g.closePath();g.fill();
    g.beginPath();g.ellipse(cx,baseY,w*0.40,ry*0.52,0,0,7);g.fill();
    /* 3 · the bounce off the counter — a cool edge on the shadow side, which is what stops a
       gradient reading as plastic */
    g.strokeStyle="rgba(196,208,214,0.45)";g.lineWidth=2;
    g.beginPath();g.moveTo(cx+w*0.495,topY+h*0.12);
    g.bezierCurveTo(cx+w*0.50,topY+h*0.6, cx+w*0.45,baseY-h*0.12, cx+w*0.40,baseY-2);g.stroke();
    /* 4 · the contact shadow where it meets the counter */
    contact(g,cx,baseY+ry*0.12,w*0.50,ry*0.62,0.5);
    /* 5 · the mouth: dark interior, deepest at the far side, so you look INTO it */
    const ig=g.createRadialGradient(cx+KEY.x*w*0.18,topY+KEY.y*ry*0.5,ry*0.2,cx,topY,w*0.52);
    ig.addColorStop(0,shade(o.inside||"#1A1512",0.10));ig.addColorStop(1,shade(o.inside||"#1A1512",0.62));
    g.fillStyle=ig;g.beginPath();g.ellipse(cx,topY,w/2,ry,0,0,7);g.fill();
    /* 6 · what is in it, with its own light and a wet specular */
    if(o.fill){
      const F=MAT(o.fill);
      const fg=g.createLinearGradient(cx-w*0.4,topY-ry,cx+w*0.4,topY+ry);
      fg.addColorStop(0,F.high);fg.addColorStop(0.5,F.base);fg.addColorStop(1,F.core);
      g.fillStyle=fg;g.beginPath();g.ellipse(cx,topY+ry*0.16,w*0.43,ry*0.80,0,0,7);g.fill();
      if(o.wet!==false)spec(g,cx,topY+ry*0.16,w*0.43,ry*0.80,0.22);
    }
    if(o.top)o.top(g,cx,topY,w,ry);
    /* 7 · THE RIM, and it is not one colour: bright where the key hits, dark where it does not */
    const rg=g.createLinearGradient(cx-w/2,topY-ry,cx+w/2,topY+ry);
    const R=MAT(o.rim||P.steel);
    rg.addColorStop(0,R.spec);rg.addColorStop(0.42,R.base);rg.addColorStop(1,R.core);
    g.strokeStyle=rg;g.lineWidth=Math.max(3.5,w*0.052);
    g.beginPath();g.ellipse(cx,topY,w/2,ry,0,0,7);g.stroke();
    /* 8 · one specular sliver on the body, on the key side only */
    g.save();g.globalAlpha=0.17;g.fillStyle="#FFFFFF";
    g.beginPath();g.ellipse(cx-w*0.31,topY+h*0.30,w*0.035,h*0.19,0.20,0,7);g.fill();g.restore();
    g.restore();
  }
  /* A PIECE OF FOOD IS A FORM TOO. Once the pot had a light model and the tofu did not, the tofu
     looked WORSE than it had before — flat rectangles floating on a lit surface. Same six steps,
     smaller: a shadow in the liquid, a lit top plane, a shaded side, one specular. */
  function cube(g,x,y,w,h,base,o){
    o=o||{};const M=MAT(base);
    g.save();
    g.fillStyle="rgba(24,12,6,0.38)";                      /* it sits IN something */
    g.beginPath();g.ellipse(x+w*0.5,y+h*0.92,w*0.58,h*0.30,0,0,7);g.fill();
    const tg=g.createLinearGradient(x,y,x+w,y+h*0.55);
    tg.addColorStop(0,M.spec);tg.addColorStop(1,M.high);
    g.fillStyle=tg;g.fillRect(x,y,w,h*0.55);               /* the top plane, facing the key */
    g.fillStyle=M.core;g.fillRect(x,y+h*0.55,w,h*0.45);    /* the side, turned away */
    g.fillStyle="rgba(255,255,255,0.55)";g.fillRect(x+w*0.12,y+h*0.10,w*0.34,h*0.14);
    if(o.edge){g.strokeStyle=shade(base,0.45);g.lineWidth=1;g.strokeRect(x+0.5,y+0.5,w-1,h-1);}
    g.restore();
  }
  function sliver(g,x,y,w,h,base){ /* a scallion round, a sesame seed — small, but lit the same way */
    const M=MAT(base);g.save();
    g.fillStyle="rgba(24,12,6,0.30)";g.beginPath();g.ellipse(x+w/2,y+h*0.85,w*0.55,h*0.34,0,0,7);g.fill();
    const gr=g.createLinearGradient(x,y,x+w,y+h);gr.addColorStop(0,M.high);gr.addColorStop(1,M.core);
    g.fillStyle=gr;g.beginPath();g.ellipse(x+w/2,y+h/2,w/2,h/2,0,0,7);g.fill();
    g.restore();
  }
  /* her private mark: the page's own corner, turned over. One, two or three. Never a star, and big
     enough to see from the edge of a stack — the first render drew 12px triangles nobody could read. */
  function folds(g,W,H,n){
    const s=26;
    for(let i=0;i<n;i++){
      const x=W-12-i*(s+6), y=12;
      g.fillStyle="#E9E0C8";                      /* the back of the paper */
      g.beginPath();g.moveTo(x,y);g.lineTo(x-s,y);g.lineTo(x,y+s);g.closePath();g.fill();
      g.strokeStyle=P.gochu;g.lineWidth=2;        /* gochugaru on the PAGE, which is where it is allowed */
      g.beginPath();g.moveTo(x-s,y);g.lineTo(x,y+s);g.stroke();
    }
  }
  /* the frame: the kitchen's ACCENT, never its ground — an edge on either paper (§19.4) */
  function plate(draw){
    return function(g,W,H){
      const cy=H*0.46;
      /* the wall behind: not a flat fill — light falls off toward the bottom of it */
      const wall=g.createLinearGradient(0,0,0,cy);
      wall.addColorStop(0,lit(P.paper,0.05));wall.addColorStop(1,shade(P.paper,0.10));
      g.fillStyle=wall;g.fillRect(0,0,W,cy);
      /* the counter, running away from you: lit at the back edge, darker at the front */
      const top=g.createLinearGradient(0,cy,0,H);
      top.addColorStop(0,lit(P.onggi,0.16));top.addColorStop(0.35,P.onggi);top.addColorStop(1,shade(P.onggi,0.34));
      g.fillStyle=top;g.fillRect(0,cy,W,H-cy);
      g.fillStyle="rgba(255,236,200,0.5)";g.fillRect(0,cy,W,2);     /* the lit front edge of the wall join */
      /* the wall's own shadow where it meets the counter — the seam that makes two planes */
      const seam=g.createLinearGradient(0,cy,0,cy+26);
      seam.addColorStop(0,"rgba(26,16,10,0.42)");seam.addColorStop(1,"rgba(26,16,10,0)");
      g.fillStyle=seam;g.fillRect(0,cy,W,26);
      draw(g,W,H,cy);
      /* a vignette, so the eye goes to the middle */
      const vg=g.createRadialGradient(W/2,H*0.55,Math.min(W,H)*0.28,W/2,H*0.55,Math.max(W,H)*0.78);
      vg.addColorStop(0,"rgba(0,0,0,0)");vg.addColorStop(1,"rgba(28,18,10,0.30)");
      g.fillStyle=vg;g.fillRect(0,0,W,H);
      grain(g,W,H,0.09);
      g.fillStyle=P.steel;g.fillRect(0,0,W,6);g.fillRect(0,H-6,W,6);g.fillRect(0,0,6,H);g.fillRect(W-6,0,6,H);
    };
  }

  /* ---------- page 1 · doenjang jjigae, laid for two ---------- */
  const p1 = plate(function(g,W,H,cy){
    const base=cy+48;
    const rice=(g,cx,ty,w,ry)=>{ /* a mound, not a flat disc: white rice in a white bowl needs its own
        shadow or it is the bowl (the porcelain/paper Δ0.8 problem one layer further in) */
      const R=MAT("#F6F1E2");
      const gr=g.createLinearGradient(cx-w*0.3,ty-ry,cx+w*0.3,ty+ry);
      gr.addColorStop(0,R.spec);gr.addColorStop(0.55,R.base);gr.addColorStop(1,R.core);
      g.fillStyle=gr;g.beginPath();g.ellipse(cx,ty-2,w*0.35,ry*0.78,0,0,7);g.fill();
      g.fillStyle="rgba(255,255,255,0.5)";g.beginPath();g.ellipse(cx-w*0.10,ty-5,w*0.12,ry*0.26,-0.4,0,7);g.fill();};
    vessel(g, W*0.28, base, 78, 54, {body:P.porcelain, fill:P.porcelain, inside:"#DED8C8", edge:"#9A9382", top:rice});
    vessel(g, W*0.72, base, 78, 54, {body:P.porcelain, fill:P.porcelain, inside:"#DED8C8", edge:"#9A9382", top:rice});
    /* the pot: the biggest mass, a 2:1 ladder over the bowls, and the black ttukbaegi that was a hole
       in the page now carries a steel rim — the un-clichéd Korean note doing structural work */
    vessel(g, W*0.5, base+16, 132, 84, {body:"#33281F", fill:P.broth, inside:"#241C16", edge:"#15100C", top:(g,cx,ty,w,ry)=>{
      cube(g,cx-32,ty-11,22,14,"#F2ECDA",{edge:true});      /* tofu, breaking the rim line */
      cube(g,cx+6,ty-3,19,12,"#F2ECDA",{edge:true});
      sliver(g,cx-6,ty-14,9,6,P.scallion);
      sliver(g,cx+30,ty-6,9,6,P.scallion);
      g.save();g.globalAlpha=0.8;g.fillStyle=P.gochu;                                    /* chilli oil ON the broth, never on the brown */
      g.beginPath();g.ellipse(cx-8,ty+9,15,4,0.1,0,7);g.fill();g.restore();
    }});
    folds(g,W,H,2);
  });
  /* ---------- page 2 · kimbap, cut by hand ---------- */
  const p2 = plate(function(g,W,H,cy){
    const base=cy+62;
    g.fillStyle=P.steelLit;g.fillRect(W*0.07,base-8,W*0.86,11);      /* the steel board, standing on the counter */
    g.fillStyle=P.steel;g.fillRect(W*0.07,base+3,W*0.86,5);
    /* six rounds, DELIBERATELY uneven — her cuts, drawn faithfully and never marked (§17.2) */
    /* six rounds, and they must FIT: sum(d) + 5*gap has to clear the frame's inner width (W-12).
       The pass before this one sized them up without re-measuring and cut the sixth in half. */
    const d=[45,38,49,41,47,36], gap=4;
    let x=W*0.055;
    d.forEach(s=>{
      const cx=x+s/2, cyy=base-8-s*0.34;
      g.fillStyle=P.nori;g.beginPath();g.ellipse(cx,cyy,s/2,s/2*0.80,0,0,7);g.fill();
      g.fillStyle=P.porcelain;g.beginPath();g.ellipse(cx,cyy,s/2-5,(s/2-5)*0.80,0,0,7);g.fill();
      g.fillStyle=P.egg;g.fillRect(cx-5,cyy-4,10,7);
      g.fillStyle=P.scallion;g.fillRect(cx-9,cyy+1,6,4);
      g.fillStyle=P.gochu;g.fillRect(cx+3,cyy+2,5,3);
      g.strokeStyle=P.steel;g.lineWidth=2;g.beginPath();g.ellipse(cx,cyy,s/2,s/2*0.80,0,0,7);g.stroke();
      x+=s+gap;
    });
    folds(g,W,H,3);
  });
  /* ---------- page 3 · sigeumchi namul, one small dish ---------- */
  const p3 = plate(function(g,W,H,cy){
    const base=cy+40;
    vessel(g, W*0.44, base, 116, 58, {body:P.porcelain, fill:"#4E6B45", inside:"#DED8C8", edge:"#9A9382", top:(g,cx,ty,w,ry)=>{
      g.fillStyle="#6F8A5E";g.fillRect(cx-22,ty-3,18,6);g.fillRect(cx+4,ty+1,16,5);
      g.fillStyle=P.porcelain;[[-14,-1],[2,3],[14,-2],[-4,5]].forEach(([a,b])=>g.fillRect(cx+a,ty+b,3,3)); /* sesame, sprinkled */
    }});
    /* a steel spoon: the 2:1 ladder, and something in the frame that is not a circle */
    g.fillStyle="#5A3E2B";g.beginPath();g.ellipse(W*0.755,base-4,26,6,0,0,7);g.fill();  /* it touches the counter */
    g.save();g.translate(W*0.74,base-28);g.rotate(0.22);
    g.fillStyle=P.steelLit;g.beginPath();g.ellipse(0,0,13,9,0,0,7);g.fill();
    g.fillStyle=P.steel;g.fillRect(-3,6,6,44);
    g.strokeStyle=P.soft;g.lineWidth=1;g.beginPath();g.ellipse(0,0,13,9,0,0,7);g.stroke();
    g.restore();
    folds(g,W,H,1);
  });

  const page=(id,o)=>({ id, title:{en:o.t,es:o.t}, build:()=>{ const es=L(); return [
    {art:o.art, aspect:0.60},
    {kv:[[es?"Dibujo":"Drawn", o.drew]]},            /* an art block exports NOTHING, so the words exist too */
    {note:o.said},
    {kv:[[es?"Cómo salió":"How it went", o.mark]]},
    {h:es?"La receta, como llegó":"The recipe, as it came"},
    {kv:o.recipe},
    {blank:es?"En tu cocina":"In your kitchen"},
    {p:o.credit}
  ];}});

  D.simmerBook1=page("simmerBook1",{t:"Doenjang jjigae",
    drew:"one pot, two bowls — the table is laid for two because she cooked, not because a day passed",
    said:"\u201cMade it too salty and it was still the best thing all week. Less doenjang next time, or more water \u2014 one of the two.\u201d",
    mark:"again",
    recipe:[["Doenjang","a heaping spoonful"],["Water or anchovy stock","3 cups"],["Tofu","half a block, cubed"],["Courgette","a quarter, sliced"],["Scallion","one, at the end"]],
    credit:"Two cooks, two pots: she builds it on anchovy stock, he uses water and says the doenjang IS the stock. Cook whichever one you are.",
    art:p1});
  D.simmerBook2=page("simmerBook2",{t:"Kimbap",
    drew:"six rounds, cut by hand \u2014 uneven, and nothing in the game says so",
    said:"\u201cThe cutting is the good part. Mine are all different sizes and I don\u2019t care.\u201d",
    mark:"again",
    recipe:[["Short-grain rice","2 cups, cooked, still warm"],["Gim (seaweed sheets)","4"],["Egg","2, in a flat omelette"],["Spinach","a handful, blanched"],["Sesame oil","for the rice, and for your hands"]],
    credit:"Laid piece by piece, then cut. The pieces are the point; the line you cut along is yours.",
    art:p2});
  D.simmerBook3=page("simmerBook3",{t:"Sigeumchi namul",
    drew:"one small dish and a spoon \u2014 the whole thing is five minutes",
    said:"\u201cDidn\u2019t feel like cooking. Made this anyway and ate it standing up.\u201d",
    mark:"fine",
    recipe:[["Spinach","a big bunch, blanched 30 seconds"],["Garlic","one clove, minced"],["Sesame oil","a spoonful"],["Toasted sesame","a pinch, at the end"],["Salt","to taste"]],
    credit:"A namul is the cheapest, most repeatable thing in a kitchen \u2014 season a vegetable, eat it cold.",
    art:p3});
})();
