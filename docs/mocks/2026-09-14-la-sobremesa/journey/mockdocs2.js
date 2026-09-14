/* La Sobremesa — the JOURNEY’s mock documents, 2026-09-14 (after crew run 8).
   Loaded AFTER ../mockdocs.js; extends window.MOCKDOCS. Every document here is a real reader document
   (engine/engine.js, grep `function docDef`): the pictures in this folder are the shipped reader
   drawing the shipped blocks — h · p · note · kv · blank · art · form · sel · btn. Where a picture
   contains a DRAWING (an `art` block), its caption says so. Nothing here is a pack and nothing is a
   decision — docs/la-sobremesa.md §9, §12.
   Palette inside the drawings: Pili’s re-cut kitchen grounds (run 8) — the ground is the identity.
   Re-render: node docs/mocks/2026-09-14-la-sobremesa/journey/render2.js */
(function(){
  const L=()=>(typeof lang!=="undefined"&&lang==="es");
  const D=window.MOCKDOCS;
  /* the night app palette (Pili §3A) — chrome owns no warm colour; the accent is a FILL, never a word */
  const N={surface:"#26232E",line:"#3B3546",ink:"#E8E4DC",muted:"#9C96AB",accent:"#A97FFF",ground:"#14121B"};
  /* the four kitchens, re-cut so the GROUNDS ladder ≥40 apart in Rec.601 value (Pili §3B) */
  const K={mx:{g:"#554C41",a:"#F0E6CC"},kr:{g:"#977150",a:"#D4D8DC"},it:{g:"#BC9E75",a:"#3B3A22"},jp:{g:"#DCCFAE",a:"#23301F"}};
  const px=(g,u)=>(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x*u),Math.round(y*u),Math.max(1,Math.round(w*u)),Math.max(1,Math.round(h*u)));};

  /* ---- 16-px dishes, drawn at ×4 = 64 CSS px, hard rim, no shadow, no rounded corner (Pili §4) ---- */
  function dish(g,kind,x0,y0,s){
    g.save();g.translate(x0,y0);const p=px(g,s);
    if(kind==="it"){ /* pasta e ceci in a white bowl, blue ring */
      p(2,7,12,6,"#F4F1EA");p(1,8,14,4,"#F4F1EA");p(2,7,12,1,"#5B7FA6");p(3,13,10,1,"#C9C4B8");
      p(4,8,8,3,"#D9B270");p(5,7,3,1,"#D9B270");p(9,8,2,1,"#B08A4A");p(6,10,2,1,"#9AA33F");p(10,9,1,1,"#9AA33F");p(4,9,1,1,"#F0D9A0");}
    if(kind==="mx"){ /* la olla, barro, beans, a tortilla leaning on it */
      p(4,3,8,2,"#5A3A2A");p(3,5,10,8,"#9B5B3C");p(2,7,12,4,"#9B5B3C");p(4,5,2,6,"#B26E4C");
      p(5,4,6,1,"#3D2A22");p(6,3,4,1,"#3D2A22");p(12,9,3,4,"#E8DCC0");p(12,9,3,1,"#D9C9A3");p(1,13,14,1,"#2B2724");}
    if(kind==="kr"){ /* doenjang-jjigae in a black ttukbaegi, tofu and scallion showing */
      p(2,6,12,7,"#1E1A17");p(1,7,14,4,"#1E1A17");p(3,6,10,1,"#4A3A2A");p(4,5,8,1,"#8A6A3A");
      p(5,4,2,2,"#F4F1EA");p(9,5,2,1,"#F4F1EA");p(7,4,1,1,"#5F7A52");p(11,4,1,1,"#5F7A52");p(6,6,4,1,"#B44A21");p(0,13,16,1,"#2B2724");}
    if(kind==="jp"){ /* onigiri, two, nori bands, on a hinoki board */
      p(1,12,14,2,"#DCCFAE");p(1,14,14,1,"#B8A98A");
      p(3,5,5,7,"#F4F1EA");p(2,7,7,5,"#F4F1EA");p(4,4,3,1,"#F4F1EA");p(3,10,5,2,"#23301F");
      p(9,6,5,6,"#F4F1EA");p(8,8,7,4,"#F4F1EA");p(10,5,3,1,"#F4F1EA");p(9,10,5,2,"#23301F");p(11,7,1,1,"#B44A21");}
    g.restore();
  }
  /* ---- the shifts board: four cards to Pili §E — 6-px ground stripe · 64-px dish · two lines · a turned corner on yours ---- */
  function shiftCards(g,W,H){
    const es=L();
    const rows=[
      {k:"it",dish:"Pasta e ceci",kitchen:es?"De Nello · italiana":"Nello’s · Italian",mine:true,note:es?"«jueves, saliendo del trabajo»":"“Thursday, after work”"},
      {k:"mx",dish:"Frijoles de la olla",kitchen:es?"De Cande · mexicana":"Cande’s · Mexican"},
      {k:"kr",dish:"Doenjang-jjigae",kitchen:es?"De Seo · coreana":"Seo’s · Korean"},
      {k:"jp",dish:es?"Onigiri, dos rellenos":"Onigiri, two ways",kitchen:es?"De Hana · japonesa":"Hana’s · Japanese"}];
    const ch=92,gap=10;g.textBaseline="alphabetic";
    rows.forEach((r,i)=>{const y=i*(ch+gap);
      g.fillStyle=N.surface;g.fillRect(0,y,W,ch);
      g.fillStyle=K[r.k].g;g.fillRect(0,y,6,ch);              /* the kitchen: its ground, nothing else */
      g.fillStyle=N.line;g.fillRect(6,y+ch-1,W-6,1);
      dish(g,r.k,18,y+14,4);                                  /* 16 px × 4, integer-scaled */
      g.fillStyle=N.ink;g.font="600 15px ui-monospace,monospace";g.fillText(r.dish,96,y+36);
      g.fillStyle=N.muted;g.font="12px ui-monospace,monospace";g.fillText(r.kitchen,96,y+56);
      if(r.mine){ /* taken: the same card with a turned-down corner and a hanging tag — a SHAPE, not a colour */
        g.fillStyle=N.ground;g.beginPath();g.moveTo(W-22,y);g.lineTo(W,y);g.lineTo(W,y+22);g.closePath();g.fill();
        g.fillStyle=N.line;g.beginPath();g.moveTo(W-22,y);g.lineTo(W-22,y+22);g.lineTo(W,y+22);g.closePath();g.fill();
        g.fillStyle=N.ink;g.font="italic 12px ui-monospace,monospace";g.fillText(r.note,96,y+76);
        g.fillStyle=N.accent;g.fillRect(96,y+80,g.measureText(r.note).width,2);}
    });
  }
  /* ---- the three drawers, told apart by MASS then by what breaks the top edge then by handle (Pili §D). ×2 = 64 wide ---- */
  function drawers(g,W,H){
    const es=L();
    const col=Math.floor(W/3),s=2;
    const spec=[
      {h:10,name:es?"1 · el bajo":"1 · shallow",what:es?"tortillas, especias":"tortillas, spices"},
      {h:16,name:es?"2 · el mediano":"2 · medium",what:es?"arroz, frijol":"rice, beans",cur:true},
      {h:24,name:es?"3 · el hondo":"3 · deep",what:es?"frascos, latas":"jars, tins"}];
    g.textBaseline="alphabetic";
    spec.forEach((d,i)=>{const cx=i*col+Math.round(col/2),base=H*0.60,w=32*s,h=d.h*s,x=cx-w/2,y=base-h;
      /* the one you are in is OPEN, not painted (Pili, run 9): its front is pulled 6 px proud and down, and the dark of the box shows above it */
      const pull=d.cur?6:0;
      if(d.cur){g.fillStyle="#1C1A22";g.fillRect(x,y,w,h);}
      g.fillStyle="#6B5A48";g.fillRect(x,y+pull,w,h);g.fillStyle="#8A7660";g.fillRect(x,y+pull,w,2);g.fillStyle="#4A3E32";g.fillRect(x,y+pull+h-2,w,2);
      if(i===0){g.fillStyle="#2E261E";g.fillRect(cx-14,y+h/2-1,28,4);}                                   /* a recessed slot */
      if(i===1){g.fillStyle="#2E261E";g.fillRect(cx-16,y+pull+h/2-3,6,6);g.fillRect(cx+10,y+pull+h/2-3,6,6);  /* two knobs */
        g.fillStyle="#D9C9A3";g.fillRect(x+6,y+pull-6,14,6);g.fillRect(x+24,y+pull-10,16,10);g.fillRect(x+44,y+pull-4,12,4);}  /* bags slump over the open edge */
      if(i===2){g.fillStyle="#2E261E";g.fillRect(cx-20,y+h/2-1,40,6);                                    /* one long bar */
        g.fillStyle="#3B3546";g.fillRect(x+6,y-14,10,14);g.fillRect(x+22,y-8,8,8);g.fillRect(x+40,y-18,12,18);   /* hard lids at different heights */
        g.fillStyle="#9C96AB";g.fillRect(x+6,y-14,10,3);g.fillRect(x+22,y-8,8,3);g.fillRect(x+40,y-18,12,3);}
      g.fillStyle=N.ink;g.font="600 12px ui-monospace,monospace";g.textAlign="center";g.fillText(d.name,cx,base+22);
      g.fillStyle=N.muted;g.font="9px ui-monospace,monospace";g.fillText(d.what,cx,base+35);g.textAlign="left";});
  }

  /* ================= THE DOCUMENTS ================= */
  const drawer={
    title:{en:"Drawer 2 · the bags",es:"Cajón 2 · las bolsas"},
    sub:{en:"Rice, beans, masa, pasta. Bags slump — that is how you know this drawer with the light off.",
         es:"Arroz, frijol, masa, pasta. Las bolsas se aplastan — así reconoces este cajón con la luz apagada."},
    build:()=>{const es=L();return [
      {art:drawers,aspect:0.36,cap:es?"Dibujo: los tres cajones por masa — bajo, mediano, hondo. Las fotos de sus cajones de verdad vienen después.":"Drawing: the three drawers by mass — shallow, medium, deep. The photos of his real drawers come later."},
      {form:{fields:[{k:"find",type:"text",label:es?"Buscar":"Find",placeholder:es?"masa, arroz, lo de la bolsa azul…":"masa, rice, the thing in the blue bag…"}],submit:es?"Buscar":"Find",noFocus:true}},
      {h:es?"En el cajón":"In the drawer"},
      {kv:[[es?"Arroz":"Rice",es?"2 kg, la bolsa grande, abierta":"2 kg, the big bag, opened"],[es?"Frijol negro":"Black beans","500 g"],[es?"Frijol pinto":"Pinto beans","1 kg"],["Masa harina",es?"1 kg, la mitad":"1 kg, half"],[es?"Pasta de garbanzo":"Chickpea pasta",es?"2 cajas":"2 boxes"],[es?"Lentejas":"Lentils",es?"un frasco, en el cajón equivocado":"a jar’s worth, in the wrong drawer"]]},
      {note:es?"Un renglón es una cosa que tienes. Lo que se acabó no es renglón — aparece en la receta como lo que falta, nunca aquí como una cruz.":"A line is a thing you have. What you ran out of is no line at all — it shows up on a recipe as what’s missing, never here as a cross."},
      {btn:es?"Anotar lo que compraste":"Add what you bought"}
    ];}};
  const shifts={
    title:{en:"The shifts board",es:"El tablero de turnos"},
    sub:{en:"Four kitchens post a dish each. A shift is one dish, it pays in leftovers, and it has no clock.",
         es:"Cuatro cocinas ponen un platillo cada una. Un turno es un platillo, paga con sobras y no tiene reloj."},
    build:()=>{const es=L();return [
      {art:shiftCards,aspect:(W)=>398/W,cap:es?"Dibujo, a la tarjeta de Pili: una franja de 6 px con el color de la cocina, el platillo a 64 px, dos renglones. La de la esquina doblada es tuya.":"Drawing, to Pili’s card: a 6-px stripe in the kitchen’s ground, the dish at 64 px, two lines of type. The one with the turned corner is yours."},
      {kv:[[es?"Tuyo":"Yours","Pasta e ceci — "+(es?"de Nello · «jueves, saliendo del trabajo»":"Nello’s · “Thursday, after work”")],[es?"Abierto":"Open","Frijoles de la olla — "+(es?"de Cande":"Cande’s")],[es?"Abierto":"Open","Doenjang-jjigae — "+(es?"de Seo":"Seo’s")],[es?"Abierto":"Open",(es?"Onigiri, dos rellenos — de Hana":"Onigiri, two ways — Hana’s")]]},
      {note:es?"Un turno que tomaste es tuyo hasta que lo cocinas. Nunca va tarde. Aquí nada lleva cuenta, nada corre y nada se apaga.":"A shift you took is yours until you cook it. It is never late. Nothing on this board counts, ticks or fades."},
      {btn:es?"Tomar un turno":"Take a shift"}
    ];}};
  /* the recipe as the HOUSE reads it: what you have is a line; what is missing is one sentence and a door */
  const recipeHome={
    title:D.recipe.title,sub:D.recipe.sub,
    build:()=>{const es=L();const s=D.recipe.build();
      const i=s.findIndex(b=>b.kv&&b.kv.length===6);
      s.splice(i-1,2,
        {h:es?"En la casa":"In the house"},
        {kv:[["Frijol negro",es?"500 g — cajón 2":"500 g — drawer 2"],[es?"Agua":"Water",es?"que cubra dos dedos":"to cover by two fingers"],[es?"Cebolla":"Onion",es?"media — el estante":"half — the shelf"],[es?"Ajo":"Garlic",es?"2 dientes — el estante":"2 cloves — the shelf"],["Sal","q.b."]]},
        {note:es?"Falta uno: el epazote. Cande tiene una mata junto a su puerta y Ofelia lo vende seco.":"One thing missing: epazote. Cande keeps a plant by her door, and Ofelia sells it dried."});
      return s.filter(b=>!b.form);}};
  const collection={
    title:{en:"The Collection · Mexican",es:"La colección · mexicana"},
    sub:{en:"Everything you have made, and the outline of what you haven’t. It fills itself in.",
         es:"Todo lo que has hecho, y el contorno de lo que no. Se llena solo."},
    build:()=>{const es=L();return [
      {h:"La olla"},
      {kv:[["Frijoles de la olla","Cande · "+(es?"dos veces":"twice")],["Frijoles refritos","Cande · "+(es?"una vez, de la olla del domingo":"once, from Sunday’s pot")]]},
      {blank:"Enfrijoladas"},{blank:"Sopa tarasca"},
      {h:"El comal"},
      {kv:[["Tortillas de maíz","Cande · "+(es?"una vez":"once")]]},
      {blank:"Quesadillas de flor"},{blank:"Tlacoyos"},
      {note:es?"Un renglón en blanco es todavía no, no está prohibido. Nada aquí está cerrado con llave; una cocinera ofrece el siguiente cuando le nace.":"A blank line is not yet, not denied. Nothing here is locked; a cook offers the next one when she feels like it."}
    ];}};
  const house={
    title:{en:"The house",es:"La casa"},
    sub:{en:"One house, nobody’s name on anything. The switches live on this card, not in the gear.",
         es:"Una casa, sin nombre en nada. Los interruptores viven en esta tarjeta, no en el engrane."},
    build:()=>{const es=L();return [
      {kv:[[es?"Quién cocina aquí":"Who cooks here",es?"Dos personas, una casa":"Two people, one household"],[es?"Cajones":"Drawers",es?"Tres, un estante y el refri":"Three, and a shelf, and a fridge"],[es?"Temporada":"Season",es?"Fin de verano · San Diego":"Late summer · San Diego"]]},
      {sel:es?"La calificación en el plato":"Grades on the plate",opts:[{v:"off",t:es?"Apagada — sólo la comida":"Off — just the food"},{v:"on",t:es?"Encendida — una letra, en voz baja":"On — a quiet letter"}],value:"off"},
      {form:{fields:[{k:"raw",type:"checks",label:es?"Crudas no — la casa las cocina":"Not raw — the house cooks these",opts:[{v:"carrot",t:es?"Zanahoria":"Carrot"},{v:"celery",t:es?"Apio":"Celery"},{v:"bell",t:es?"Pimiento":"Pepper"},{v:"apple",t:es?"Manzana":"Apple"}],value:["carrot","celery"]}],submit:es?"Guardar":"Keep",noFocus:true}},
      {note:es?"Ejemplos, no la lista de nadie. Una receta que pide una de éstas cruda la ofrece cocida, o te ofrece otra receta. Nunca dice «alergia» en un plato.":"Examples, not anyone’s list. A recipe that wants one of these raw offers it cooked, or offers another recipe. It never says “allergy” on a plate."}
    ];}};
  const quiet={
    title:{en:"Tuesday",es:"Martes"},
    sub:{en:"Nobody cooked since Friday. That is all that happened.",es:"Nadie cocinó desde el viernes. Eso es todo lo que pasó."},
    build:()=>{const es=L();return [
      {p:es?"La puerta de Cande está abierta, como siempre. El turno de Nello sigue en el tablero con tu nota.":"Cande’s door is open, same as always. Nello’s shift is still on the board with your note on it."},
      {kv:[[es?"En el tablero":"On the board","Pasta e ceci — "+(es?"«jueves, saliendo del trabajo»":"“Thursday, after work”")],[es?"En el refri":"In the fridge",es?"Media olla de frijoles del domingo":"Half a pot of beans from Sunday"]]},
      {note:es?"Nadie dice nada de los días de en medio. No hay racha, y no se rompió nada.":"Nobody says a word about the days between. There is no streak, and nothing broke."},
      {btn:es?"Ver el tablero":"See the board"}
    ];}};
  Object.assign(D,{drawer,shifts,recipeHome,collection,house,quiet});
})();
