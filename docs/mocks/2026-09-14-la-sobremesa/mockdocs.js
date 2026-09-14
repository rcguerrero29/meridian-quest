/* La Sobremesa — the mock documents, 2026-09-14.
   These are REAL reader documents (the engine's docOpen accepts a document object as well as a DOCS
   id — engine/engine.js, grep `function docDef`), so every picture of them in this folder is the
   shipped reader drawing the shipped blocks: h · p · note · kv · t · art · form. Nothing here is
   a pack, nothing is registered anywhere, and nothing is a decision — docs/la-sobremesa.md §9.
   Re-render: node docs/mocks/2026-09-14-la-sobremesa/render.js (needs playwright-core and CHROMIUM_PATH). */
(function(){
  const L=()=>(typeof lang!=="undefined"&&lang==="es");
  /* ---- the one call every screen inherits: THE PLATE IS VESSELS ON A TRAY, never a divided circle (Pili) ---- */
  function plate(g,W,H){
    const u=W/80; const px=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(Math.round(x*u),Math.round(y*u),Math.max(1,Math.round(w*u)),Math.max(1,Math.round(h*u)));};
    const disc=(cx,cy,r,c)=>{g.fillStyle=c;g.beginPath();g.arc(cx*u,cy*u,r*u,0,7);g.fill();};
    const oval=(cx,cy,rx,ry,c)=>{g.fillStyle=c;g.beginPath();g.ellipse(cx*u,cy*u,rx*u,ry*u,0,0,7);g.fill();};
    /* el petate — a woven mat, the ground */
    px(0,0,80,40,"#D6C49A");
    for(let y=0;y<40;y+=4)px(0,y,80,1,"#C9B486");
    for(let x=0;x<80;x+=6)px(x,0,1,40,"#CDB98C");
    /* el comal — the black disc is the loudest thing in this kitchen */
    disc(22,22,14.5,"#2B2724");disc(22,22,13.2,"#3A3630");disc(19,19,7,"#423D39");
    /* tortillas, a stack of three, toasted spots */
    oval(22,24,8,3,"#D9C9A3");oval(22,22.6,8,3,"#E8DCC0");oval(22,21.2,8,3,"#EFE4C8");
    px(18,20,1.5,1,"#B8895A");px(25,21,1.5,1,"#B8895A");px(21,22,1,1,"#C99A66");
    /* la olla — barro, with the beans in it */
    oval(53,29,10,3,"#2B2724");                         /* its shadow on the mat */
    px(44,15,18,13,"#9B5B3C");px(43,17,20,9,"#9B5B3C");  /* the body */
    px(44,15,18,2,"#5A3A2A");                            /* the dark slip rim */
    oval(53,17,8,2.6,"#3D2A22");                         /* the beans */
    px(48,16.5,2,1,"#5A3E33");px(52,17.5,2,1,"#5A3E33");px(56,16.8,2,1,"#5A3E33");px(50,18,1,1,"#6B4A3A");
    px(45,20,2,5,"#B26E4C");                             /* light on the barro */
    /* la salsa — a small dish, dried-chile brick, never the flag's red */
    px(64,23,11,6,"#9B5B3C");px(65,22,9,1,"#5A3A2A");px(65,23.5,9,3,"#8E3320");px(68,24,2,1,"#5F7A52");
    /* un verde — quelites */
    px(46,32,14,5,"#5F7A52");px(48,31,4,2,"#7A9A6A");px(54,31,3,2,"#7A9A6A");px(50,34,3,1,"#4A6340");px(57,33,2,1,"#4A6340");
    /* a wedge of lime and a wooden spoon */
    px(66,33,6,4,"#9AA33F");px(67,34,4,2,"#D9E08C");
    px(40,35,20,1.5,"#C9A97E");px(38,34,4,3,"#C9A97E");px(39,34.7,2,1.5,"#A9895E");
  }
  /* ---- the week: a strip you walk along; yesterday keeps its colour; an empty bay is empty of MARKS too ---- */
  function week(g,W,H){
    const es=L();
    const days=es?["lun","mar","mié","jue","vie","sáb","dom"]:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
    const bay=W/7;
    g.fillStyle="#F3ECDC";g.fillRect(0,0,W,H);
    g.fillStyle="#9B5B3C";g.fillRect(0,0,W,3);                     /* the one ruled edge */
    for(let i=1;i<7;i++){g.fillStyle="#DCD2BC";g.fillRect(Math.round(i*bay),12,1,H-24);}
    g.textBaseline="alphabetic";
    days.forEach((d,i)=>{const x=i*bay+10;
      g.fillStyle="#2A2620";g.font="bold 12px ui-monospace,monospace";g.fillText(d,x,26);
      if(i===3){g.fillStyle="#9B5B3C";g.beginPath();g.moveTo(x+38,16);g.lineTo(x+44,16);g.lineTo(x+41,22);g.closePath();g.fill();}
      /* the faint baseline every bay has, filled or not — no X, no red, ever */
      g.fillStyle="#DCD2BC";for(let k=x;k<(i+1)*bay-10;k+=6)g.fillRect(k,H-22,3,1);});
    const vessel=(x,y,kind)=>{ /* small lumps, counted not scored */
      if(kind==="olla"){g.fillStyle="#2B2724";g.beginPath();g.ellipse(x+22,y+34,20,4,0,0,7);g.fill();
        g.fillStyle="#9B5B3C";g.fillRect(x+6,y+8,32,24);g.fillRect(x+4,y+12,36,16);g.fillStyle="#5A3A2A";g.fillRect(x+6,y+8,32,3);
        g.fillStyle="#3D2A22";g.beginPath();g.ellipse(x+22,y+11,14,3,0,0,7);g.fill();g.fillStyle="#B26E4C";g.fillRect(x+8,y+16,3,10);}
      if(kind==="pasta"){g.fillStyle="#2B2724";g.beginPath();g.ellipse(x+22,y+32,22,4,0,0,7);g.fill();
        g.fillStyle="#F4F1EA";g.beginPath();g.ellipse(x+22,y+22,22,10,0,0,7);g.fill();
        g.strokeStyle="#5B7FA6";g.lineWidth=1.5;g.beginPath();g.ellipse(x+22,y+22,19,8,0,0,7);g.stroke();
        g.fillStyle="#D9B270";g.beginPath();g.ellipse(x+22,y+21,13,5,0,0,7);g.fill();g.fillStyle="#9AA33F";g.fillRect(x+18,y+18,3,2);g.fillRect(x+26,y+22,3,2);}
      if(kind==="crock"){g.fillStyle="#2B2724";g.beginPath();g.ellipse(x+22,y+36,18,4,0,0,7);g.fill();
        g.fillStyle="#6B4A33";g.fillRect(x+8,y+10,28,26);g.fillRect(x+5,y+16,34,14);g.fillStyle="#4E3626";g.fillRect(x+10,y+6,24,5);
        g.fillStyle="#8A6448";g.fillRect(x+10,y+18,3,10);g.fillStyle="#B44A21";g.fillRect(x+16,y+24,12,3);}
    };
    const fill=(i,kind,dish,when)=>{const x=i*bay+10;vessel(x+(bay-20)/2-22,Math.round(H*0.36),kind);
      g.fillStyle="#2A2620";g.font="11px ui-monospace,monospace";g.fillText(dish,x,H-42);
      g.fillStyle="#6B6458";g.font="10px ui-monospace,monospace";g.fillText(when,x,H-30);};
    if(es){fill(1,"olla","Frijoles de la olla","comida · Cande");fill(3,"pasta","Pasta e ceci","cena · después del trabajo");fill(6,"crock","Kimjang, la salada","todo el día · el patio");}
    else{fill(1,"olla","Frijoles de la olla","comida · Cande");fill(3,"pasta","Pasta e ceci","dinner · after work");fill(6,"crock","Kimjang, the salting","all day · the patio");}
  }
  /* ---- the badge: the mock that exists to be refused ---- */
  function badges(g,W,H){
    g.fillStyle="#F3ECDC";g.fillRect(0,0,W,H);
    const pill=(x,y,w,c,t)=>{g.fillStyle=c;g.beginPath();g.roundRect(x,y,w,26,13);g.fill();g.fillStyle="#FFFFFF";g.font="bold 12px ui-monospace,monospace";g.fillText(t,x+12,y+17);};
    pill(10,12,142,"#3E8E5A","HEALTHY  8.4 / 10");pill(162,12,118,"#C0392B","SODIUM  ▲ 31%");
    pill(10,46,96,"#7F8C8D","NOVA  1");pill(116,46,150,"#E67E22","CALORIES  227");
    g.fillStyle="#6B6458";g.font="10px ui-monospace,monospace";g.fillText(L()?"lo que hace un número cuando se pinta":"what a number does once it is coloured",10,H-6);
  }
  const recipe={
    title:{en:"Frijoles de la olla",es:"Frijoles de la olla"},
    sub:{en:"Cande's — from tía Herminia (with lard) and her mother (with chard). Both are the recipe.",
         es:"De Cande — de la tía Herminia (con manteca) y de su mamá (con acelgas). Las dos son la receta."},
    build:()=>{const es=L();return [
      {note:es?"Cande te la dictó el día de la mudanza. Donde dijo «hasta que sepa» dice q.b. — cuanto baste.":"Cande dictated it on moving day. Where she said “until it tastes right” it says q.b. — as much as is enough."},
      {h:es?"Lo que lleva":"What you need"},
      {kv:[["Frijol negro",es?"500 g, limpiado":"500 g, picked over"],["Agua",es?"que cubra dos dedos":"to cover by two fingers"],["Cebolla",es?"media, entera":"half, whole"],["Ajo",es?"2 dientes":"2 cloves"],["Epazote",es?"una rama — Cande dice que ESO es la receta":"one sprig — Cande says THIS is the recipe"],["Sal","q.b."]]},
      {art:plate,aspect:0.5,cap:es?"El plato como se sirve: olla, tortillas, salsa y un verde. Nada está sobre cien.":"The plate as it is served: pot, tortillas, salsa and a green. Nothing is out of a hundred."},
      {h:es?"Cómo va":"How it goes"},
      {p:es?"Sábado en la noche: en remojo. Si es domingo, se ponen a hervir con la cebolla y el ajo.":"Saturday night: soaking. If it’s Sunday, they go on to boil with the onion and the garlic."},
      {p:es?"Bajas la lumbre y te vas. Están cuando uno se rompe con la cuchara — hora y media, dos. No se apura.":"Turn it down and walk away. They’re done when a spoon breaks one — an hour and a half, two. It does not hurry."},
      {p:es?"El epazote al final, con la sal. Pruebas. q.b.":"The epazote at the end, with the salt. Taste. q.b."},
      {kv:[[es?"Quién te la enseñó":"Who taught you this one","Cande Bustos · "+(es?"puerta 2":"door 2")],[es?"De dónde sale":"Where this comes from",es?"Su cuaderno; la tía Herminia, 1998":"Her notebook; tía Herminia, 1998"]]},
      {form:{fields:[{k:"paste",type:"area",label:es?"Pega aquí una receta que te hayan dado":"Paste a recipe somebody gave you",placeholder:es?"Los ingredientes primero, luego los pasos. Quién te la dio.":"Ingredients first, then the steps. Who gave it to you."}],submit:es?"Guardar":"Keep it",cancel:true,noFocus:true}}
    ];}
  };
  const weekDoc={
    title:{en:"This week’s menu",es:"El menú de la semana"},
    sub:{en:"Three lines is a full week. Yesterday keeps its colour.",es:"Tres renglones son una semana entera. Ayer no cambia de color."},
    build:()=>{const es=L();return [
      {p:es?"¿Qué hay de comer el martes?":"What are we eating Tuesday?"},
      {art:week,wide:840,aspect:0.30,cap:es?"Recorres la semana. Un hueco es un hueco donde nadie puso nada — no es rojo, y nunca lo será.":"Scroll along the week. An empty bay is a bay nobody put anything in — it is not red, and it never will be."},
      {kv:[[es?"Van":"So far",es?"3 comidas esta temporada":"3 dinners this season"],[es?"Martes · comida":"Tuesday · comida","Frijoles de la olla — Cande"],[es?"Jueves · cena":"Thursday · dinner","Pasta e ceci — Nello"],[es?"Domingo · todo el día":"Sunday · all day",es?"Kimjang, la salada — Seo, en el patio":"Kimjang, the salting — Seo, in the patio"]]},
      {btn:es?"Copiar la lista del mandado":"Copy the shopping list"}
    ];}
  };
  const factA={title:{en:"Frijoles — what Ofelia’s sheet says",es:"Frijoles — lo que dice la hoja de Ofelia"},
    build:()=>{const es=L();return [
      {note:es?"Una taza de frijol negro cocido tiene unos 15 g de proteína y 15 g de fibra. Ése es todo el dato.":"A cup of cooked black beans has about 15 g of protein and 15 g of fibre. That is the whole fact."},
      {kv:[[es?"Fuente":"Source","USDA FoodData Central · Beans, black, mature seeds, cooked, boiled, without salt · FDC 175237"],[es?"Dónde verlo":"Read it at",es?"Ofelia guarda la hoja impresa detrás del mostrador":"Ofelia keeps the printed sheet behind the counter"],[es?"Dos cocineras no están de acuerdo":"Two cooks disagree",es?"Seo: la sal se esconde en la sopa. Cande: la sal es el punto de la salsa.":"Seo: the salt hides in the soup. Cande: the salt is the point of the salsa."]]}
    ];}};
  const factB={title:{en:"Frijoles — as a table",es:"Frijoles — como tabla"},
    build:()=>{const es=L();return [
      {p:es?"Frijoles de la olla, una taza.":"Frijoles de la olla, one cup."},
      {t:{head:["",es?"Proteína":"Protein",es?"Fibra":"Fibre",es?"Energía":"Energy"],rows:[[es?"Por taza":"Per cup","15 g","15 g","227 kcal"],[es?"Tu día hasta ahora":"Your day so far","31 g","19 g","1,840 kcal"]]}},
      {note:es?"En cuanto aparece la segunda fila, la tabla es un libro de cuentas, y las cuentas son de ti.":"The moment a second row appears, the table is a ledger, and the ledger is about you."}
    ];}};
  const factC={title:{en:"Frijoles — as a badge",es:"Frijoles — como sello"},
    build:()=>{const es=L();return [
      {p:"Frijoles de la olla"},
      {art:badges,aspect:0.36},
      {note:es?"Una calificación sobre un platillo es un veredicto sobre quien lo cocinó. Esta maqueta existe para rechazarla.":"A score on a dish is a verdict on whoever cooked it. This mock exists to be refused."}
    ];}};
  window.MOCKDOCS={recipe,week:weekDoc,factA,factB,factC};
})();
