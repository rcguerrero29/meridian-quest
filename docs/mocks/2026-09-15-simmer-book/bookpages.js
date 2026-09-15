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
  const px=(g,u)=>(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x*u),Math.round(y*u),Math.max(1,Math.round(w*u)),Math.max(1,Math.round(h*u)));};

  /* A VESSEL, in the one camera Pili settled: where your eyes are at a counter — you see the MOUTH
     from slightly above AND the FRONT wall straight on. So: an ellipse you look into, a body that
     narrows to its foot, and a rim where the two meet. Not a rectangle — the first render of these
     drew boxes and they read as toasters. */
  function vessel(g,cx,baseY,w,h,o){
    const ry=w*0.17, topY=baseY-h;
    g.save();
    /* the body, narrowing toward the foot */
    g.fillStyle=o.body;
    g.beginPath();
    g.moveTo(cx-w/2,topY);
    g.lineTo(cx+w/2,topY);
    g.lineTo(cx+w*0.40,baseY);
    g.lineTo(cx-w*0.40,baseY);
    g.closePath();g.fill();
    /* the foot it stands on */
    g.beginPath();g.ellipse(cx,baseY,w*0.40,ry*0.55,0,0,7);g.fill();
    /* the mouth: the dark inside first, so the contents sit IN something */
    g.fillStyle=o.inside||"#1A1512";
    g.beginPath();g.ellipse(cx,topY,w/2,ry,0,0,7);g.fill();
    if(o.fill){g.fillStyle=o.fill;g.beginPath();g.ellipse(cx,topY+ry*0.18,w*0.42,ry*0.78,0,0,7);g.fill();}
    if(o.top)o.top(g,cx,topY,w,ry);
    /* THE RIM — what makes it a bowl and not a lump. Stainless, and thick enough to survive 322px. */
    g.strokeStyle=o.rim||P.steel;g.lineWidth=Math.max(3,w*0.045);
    g.beginPath();g.ellipse(cx,topY,w/2,ry,0,0,7);g.stroke();
    /* and an outline on the body, or a white bowl on cream paper is Δ0.8 and disappears */
    g.strokeStyle=o.edge||P.soft;g.lineWidth=1.5;
    g.beginPath();g.moveTo(cx-w/2,topY);g.lineTo(cx-w*0.40,baseY);g.moveTo(cx+w/2,topY);g.lineTo(cx+w*0.40,baseY);g.stroke();
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
      g.fillStyle=P.paper;g.fillRect(0,0,W,H);
      const cy=H*0.46;
      g.fillStyle=P.onggi;g.fillRect(0,cy,W,H-cy);                 /* the counter, and things STAND on it */
      g.fillStyle="#7E5A40";g.fillRect(0,cy,W,3);                  /* its lit front edge */
      draw(g,W,H,cy);
      g.fillStyle=P.steel;g.fillRect(0,0,W,6);g.fillRect(0,H-6,W,6);g.fillRect(0,0,6,H);g.fillRect(W-6,0,6,H);
    };
  }

  /* ---------- page 1 · doenjang jjigae, laid for two ---------- */
  const p1 = plate(function(g,W,H,cy){
    const base=cy+48;
    const rice=(g,cx,ty,w,ry)=>{ /* a mound, not a flat disc: white rice in a white bowl needs its own
        shadow or it is the bowl (the porcelain/paper Δ0.8 problem one layer further in) */
      g.fillStyle="#FFFDF6";g.beginPath();g.ellipse(cx,ty-3,w*0.34,ry*0.72,0,0,7);g.fill();
      g.fillStyle="#E4DCC8";g.beginPath();g.ellipse(cx,ty+2,w*0.34,ry*0.5,0,0,7);g.fill();};
    vessel(g, W*0.28, base, 78, 54, {body:P.porcelain, fill:P.porcelain, inside:"#DED8C8", edge:"#9A9382", top:rice});
    vessel(g, W*0.72, base, 78, 54, {body:P.porcelain, fill:P.porcelain, inside:"#DED8C8", edge:"#9A9382", top:rice});
    /* the pot: the biggest mass, a 2:1 ladder over the bowls, and the black ttukbaegi that was a hole
       in the page now carries a steel rim — the un-clichéd Korean note doing structural work */
    vessel(g, W*0.5, base+16, 132, 84, {body:"#33281F", fill:P.broth, inside:"#241C16", edge:"#15100C", top:(g,cx,ty,w,ry)=>{
      /* two cubes of tofu, each with a lit top and a shaded side, because a flat white rectangle in
         brown broth reads as confetti — it did, in the first render */
      [[-30,-6],[8,0]].forEach(([a,b])=>{
        g.fillStyle="#FBF7EA";g.fillRect(cx+a,ty+b-8,20,7);
        g.fillStyle="#D9D0BA";g.fillRect(cx+a,ty+b-1,20,5);});
      g.fillStyle=P.scallion;g.fillRect(cx-4,ty-11,7,5);g.fillRect(cx+30,ty-4,7,5);
      g.fillStyle=P.gochu;g.fillRect(cx-16,ty+7,26,4);                                   /* chilli on pale broth, never on the brown */
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
