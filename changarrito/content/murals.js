/* EL MURAL DE LA CUADRILLA — the crew's wall, El Changarrito only.
   (Owner, 2026-09-11: "i want yall to plan for a growing set of murals that express the changes of
   the agents so they can add and improve but not completely remove… we dont delete and we capture
   each iteration in a log or screenshot or both… if one of them has a very agressive persona, maybe
   their harshest decisions can be on the mural." Then, 2026-09-11: "i want the mural please.")

   THE ONE RULE: add and improve, never remove. A panel that is here stays here and keeps saying
   what it said. If a later iteration proves a panel wrong, the correction is a NEW panel that points
   back at it — the same discipline docs/TAGS.md L12 and docs/ARCH-LOG.md A1 already use in prose.
   That rule is not a convention, it is guarded: docs/crew/MURAL-LEDGER.txt records every panel's id
   and a fingerprint of its words, and test/town.smoke.js fails the build if one goes missing or
   changes. See docs/crew/MURALS.md.

   ONE PANEL PER ITERATION, never per agent — the panel is what the CREW decided together, including
   where they disagreed. And it is always the PAST: docs/ARCH-LOG.md A3 settles that a record of the
   past and of the present is fine and a list of the future is the banned thing. "Rigo read the code"
   belongs on a wall. "Somebody should fix the comment" may never appear on one.

   The town declares this. Meridian has no mural and gets none — its content is never edited for
   another world's sake (CLAUDE.md). The engine learns nothing: a panel hands docRender a canvas and
   draws on it, exactly as TILEART and DECOART do. */

/* ---- the palette the whole wall is painted from: lime wash, and the three pigments a barrio
        muralist actually has. Kept in one place so a later panel cannot drift off the wall. ---- */
const MURPAL={wash:"#E6DFCF",lime:"#D6CDB8",ink:"#2B2536",rust:"#B0563A",deep:"#8E4230",
              gold:"#E0A430",sky:"#7E93A8",bone:"#D8D6CE",moss:"#5F7A52",shade:"#C4BBA6"};

/* a painted ground with the wall's own grain, so every panel looks like the same wall */
/* ONE GROUND, OR NINETEEN. On its own, in the reading-size section below the wall, a panel paints
   its own patch of limewash and that is right — it is a picture and it needs a ground. ON THE WALL
   it must not, or nineteen slightly different rectangles of the same wash are nineteen visible
   edges, and edges are exactly what makes a grid a grid. So the wall raises this flag while it is
   painting, and every panel ever written stops painting its own ground without one of them being
   edited — which matters, because the rule here is add and improve, never remove.
   This is also the answer to the obvious question about future panels: you do not have to remember.
   Call murGround like everybody else and the wall decides whether you get one. */
let MURONWALL=false;
function murGround(g,W,H){const P=MURPAL;
  if(MURONWALL)return;                       /* the wall already painted it, end to end */
  g.fillStyle=P.wash;g.fillRect(0,0,W,H);
  for(let y=0;y<H;y+=3){g.fillStyle=(y/3|0)%2?P.lime:P.wash;g.globalAlpha=.35;g.fillRect(0,y,W,1);}
  g.globalAlpha=1;
  g.fillStyle=P.shade;g.fillRect(0,H-4,W,4);            /* the dado at the foot of the wall */
  g.fillStyle=P.lime;g.fillRect(0,0,W,3);}

/* the crew's hand: a tram in side view, drawn the way the wall paints it and not the way the game
   renders it — a mural is somebody's memory of a thing, not a screenshot of it */
function murTram(g,x,y,w,h,opts){const P=MURPAL,o=opts||{};
  const body=o.ghost?P.shade:P.rust,trim=o.ghost?P.lime:P.deep;
  g.fillStyle=body;g.fillRect(x,y,w,h);
  g.fillStyle=trim;g.fillRect(x,y,w,Math.max(2,h*0.14|0));
  g.fillStyle=o.ghost?P.lime:P.bone;                      /* glazing */
  const n=3,gw=(w-10)/n;for(let i=0;i<n;i++)g.fillRect(x+5+i*gw,y+h*0.28,gw-4,h*0.34);
  g.fillStyle=P.ink;                                      /* wheels */
  [0.24,0.76].forEach(t=>g.fillRect(x+w*t-3,y+h-3,6,4));
  if(o.cabs){g.fillStyle=trim;g.fillRect(x-2,y+h*0.2,3,h*0.7);g.fillRect(x+w-1,y+h*0.2,3,h*0.7);}
  if(o.driverAt!==undefined){                             /* a head and shoulders, at ONE end only */
    const dx=o.driverAt>0?x+w-9:x+4;
    g.fillStyle=P.sky;g.fillRect(dx,y+h*0.30,5,7);
    g.fillStyle="#C08A5E";g.fillRect(dx,y+h*0.30-5,5,5);
    g.fillStyle=P.ink;g.fillRect(dx-1,y+h*0.30-7,7,2);}}

/* ---- more brushes. Each agent paints in their OWN hand (owner, 2026-09-11: "can be more creative
        and if its that way one per agent but they can collaborate with one too"), so the wall shows
        not only what somebody decided but how they see. A blueprint is not a dimension drawing is
        not a signwriter's board. ---- */
function murPaper(g,W,H,ground,rule){const P=MURPAL;
  g.fillStyle=ground;g.fillRect(0,0,W,H);
  if(rule){g.strokeStyle=rule;g.lineWidth=1;g.globalAlpha=.5;
    for(let x=12;x<W;x+=12){g.beginPath();g.moveTo(x+.5,0);g.lineTo(x+.5,H);g.stroke();}
    for(let y=12;y<H;y+=12){g.beginPath();g.moveTo(0,y+.5);g.lineTo(W,y+.5);g.stroke();}
    g.globalAlpha=1;}
  g.fillStyle=P.shade;g.fillRect(0,H-3,W,3);}
/* a dimension bar with end ticks — Rosa measures, so Rosa's panel has a ruler in it */
function murDim(g,x1,x2,y,col,lab,g2){g.strokeStyle=col;g.fillStyle=col;g.lineWidth=2;
  g.beginPath();g.moveTo(x1,y);g.lineTo(x2,y);g.stroke();
  [x1,x2].forEach(x=>{g.beginPath();g.moveTo(x,y-6);g.lineTo(x,y+6);g.stroke();});
  if(lab){g.font="bold 11px ui-monospace,monospace";g.textAlign="center";g.fillText(lab,(x1+x2)/2,y-9);g.textAlign="left";}}
/* a little person, five pixels wide, the way the game draws one */
function murBody(g,x,y,shirt,h){const P=MURPAL;h=h||9;
  g.fillStyle=shirt;g.fillRect(x,y,5,h);
  g.fillStyle="#C08A5E";g.fillRect(x,y-6,5,6);
  g.fillStyle=P.ink;g.fillRect(x-1,y-8,7,2);
  g.fillRect(x+1,y+h,1,3);g.fillRect(x+3,y+h,1,3);}

/* ================= THE PANELS — append only, newest LAST so the wall reads left to right ========= */
const MURALS=[
{
  id:"i1-dos-cabinas", iter:1, date:"2026-09-11",
  title:{en:"Two cabs, no turn", es:"Dos cabinas, ninguna vuelta"},
  /* the harsh line belongs on the wall — the owner asked for that specifically */
  said:{en:"If a world's tram drives off the edge of the map, the two cabs drawn on it are decoration.",
        es:"Si el tranvía de un mundo se sale del mapa, las dos cabinas que le dibujaron son adorno."},
  who:{en:"Rigo, who read the code instead of the brief", es:"Rigo, que leyó el código y no el encargo"},
  cap:{en:"The session told the crew the car reverses and the driver changes ends. It does not. The direction is computed once a pass and never flips, so the car runs off the map and is reborn at the other end — and a shipped, drawn cab has meant nothing since the day it landed.",
       es:"La sesión le dijo a la cuadrilla que el carro se devuelve y el chofer cambia de cabina. No lo hace. La dirección se calcula una vez por vuelta y nunca cambia de signo: el carro se sale del mapa y renace del otro lado — y una cabina dibujada y entregada no ha significado nada desde el día que llegó."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    const rail=H*0.66, tw=W*0.30, th=H*0.30;
    g.fillStyle=P.ink;g.globalAlpha=.22;g.fillRect(W*0.04,rail+th*0.06,W*0.92,2);g.globalAlpha=1;
    murTram(g,W*0.10,rail-th,tw,th,{ghost:true,cabs:true});            /* reborn at the west end */
    murTram(g,W*0.56,rail-th,tw,th,{cabs:true,driverAt:1});            /* the real one, one driver */
    /* the one-way arrow: it only ever points one way, which is the finding */
    const ay=rail+th*0.42;
    g.fillStyle=P.rust;g.fillRect(W*0.10,ay,W*0.72,3);
    g.beginPath();g.moveTo(W*0.86,ay+1.5);g.lineTo(W*0.80,ay-5);g.lineTo(W*0.80,ay+8);g.closePath();g.fill();
    /* and the turn that does not exist, painted as the empty loop it is */
    g.strokeStyle=P.shade;g.lineWidth=2;g.setLineDash([4,4]);
    g.beginPath();g.arc(W*0.10,ay+1.5,H*0.13,Math.PI*0.5,Math.PI*1.5);g.stroke();
    g.setLineDash([]);
    g.fillStyle=P.ink;g.globalAlpha=.5;
    g.fillRect(W*0.02,ay-H*0.14,2,H*0.28);g.fillRect(W*0.96,ay-H*0.14,2,H*0.28);  /* the map's two edges */
    g.globalAlpha=1;}
},
{
  id:"i2-paso-que-nadie-vio", iter:2, date:"2026-09-11",
  title:{en:"The crossing nobody saw", es:"El paso que nadie vio"},
  said:{en:"Right of way belongs to the piece of ground, not to the vehicle.",
        es:"El paso no es del vehículo. Es del pedazo de suelo."},
  who:{en:"Rigo again, after two iterations walked over them", es:"Rigo otra vez, tras dos vueltas que les pasaron encima"},
  cap:{en:"The owner asked for a tram that honks and is not interrupted. Four zebra crossings have been painted on those rails since the street was drawn — two of them directly under the front door — and two full crew iterations walked over them without once looking down. The rule was already on the ground: on asphalt the tram has the road, on the bars the person does.",
       es:"El dueño pidió un tranvía que toque el claxon y no lo interrumpan. Hay cuatro pasos de cebra pintados sobre esos rieles desde que se dibujó la calle — dos justo bajo la puerta — y dos vueltas enteras de la cuadrilla les pasaron encima sin mirar al suelo. La regla ya estaba en el piso: en el asfalto el tranvía manda, en las rayas manda la persona."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* the wall above, and the door the crossing sits under */
    g.fillStyle=P.lime;g.fillRect(0,3,W,H*0.26);
    g.fillStyle=P.shade;for(let x=0;x<W;x+=18)g.fillRect(x,3,1,H*0.26);
    const dx=W*0.58,dw=W*0.11;
    g.fillStyle=P.deep;g.fillRect(dx,H*0.06,dw,H*0.23);
    g.fillStyle=P.gold;g.fillRect(dx+dw-5,H*0.17,2,3);
    /* the road: two lanes of asphalt */
    const road=H*0.31,rh=H*0.40;
    g.fillStyle="#54555B";g.fillRect(0,road,W,rh);
    /* the zebra — three bars, exactly as the tile draws them, under the door */
    g.fillStyle=P.bone;
    for(let i=0;i<3;i++)g.fillRect(dx-4,road+4+i*(rh/3),dw+8,rh*0.16);
    /* the rails, running straight through it */
    g.fillStyle="#3A3F46";g.fillRect(0,road+rh*0.30,W,2);g.fillRect(0,road+rh*0.62,W,2);
    /* the tram, coming, off the power */
    murTram(g,W*0.04,road+rh*0.10,W*0.26,rh*0.62,{driverAt:1});
    /* and the person standing on the bars, who has the right of way and always did */
    const px=dx+dw*0.35,py=road+rh*0.34;
    g.fillStyle=P.moss;g.fillRect(px,py,5,9);
    g.fillStyle="#C08A5E";g.fillRect(px,py-6,5,6);
    g.fillStyle=P.ink;g.fillRect(px-1,py-8,7,2);
    g.fillStyle=P.ink;g.fillRect(px+1,py+9,1,4);g.fillRect(px+3,py+9,1,4);}
}
];

/* ======= 2026-09-11, LATER THE SAME DAY — the owner changed the rule. Everything above this line
   was painted while the wall was ONE PANEL PER ITERATION. Nothing above is edited; the wall records
   that its own rule changed, which is information. From here: one panel per agent, in their own
   hand, and a shared panel when two of them get somewhere neither would have got alone. ======= */

MURALS.push(
{
  id:"owner-uno-por-mano", iter:2, date:"2026-09-11",
  title:{en:"One hand, one panel", es:"Una mano, un tablero"},
  said:{en:"ok thats fine but in the future can be more creative and if its that way one per agent but they can collaborate with one too",
        es:"ok est\u00E1 bien pero en el futuro pueden ser m\u00E1s creativos y si es as\u00ED uno por agente pero que tambi\u00E9n puedan colaborar en uno"},
  who:{en:"The owner, overruling the crew's own spec", es:"El due\u00F1o, corrigiendo la regla de la propia cuadrilla"},
  cap:{en:"The spec said one panel per iteration, never per agent, and gave a reason: the panel is what the crew decided together. He read the first two and said no. He is right, and the reason is on the wall in front of you — a panel signed by everybody is signed by nobody, and the harsh line that makes a wall worth looking at belongs to whoever actually said it.",
       es:"La regla dec\u00EDa un tablero por vuelta, nunca por agente, y daba su raz\u00F3n: el tablero es lo que decidi\u00F3 la cuadrilla junta. \u00C9l vio los dos primeros y dijo que no. Tiene raz\u00F3n, y la raz\u00F3n est\u00E1 pintada enfrente: un tablero que firman todos no lo firma nadie, y la frase dura que hace que valga la pena mirar una pared es de quien la dijo."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* five hands, five brushes, five boards — and one long board underneath that all five touch.
       That is the whole ruling, and it wants no words. */
    const cols=[P.rust,P.moss,P.sky,P.gold,P.deep];
    const n=5,gap=W*0.02,bw=(W-gap*(n+1))/n,top=H*0.10,bh=H*0.30;
    for(let i=0;i<n;i++){
      const x=gap+i*(bw+gap);
      g.fillStyle=P.ink;g.globalAlpha=.13;g.fillRect(x+3,top+4,bw,bh);g.globalAlpha=1;
      g.fillStyle="#F2EDE0";g.fillRect(x,top,bw,bh);               /* the board */
      g.fillStyle=cols[i];g.fillRect(x,top,bw,5);
      /* a mark on each, different on each, because that is the point */
      g.fillStyle=cols[i];
      if(i===0){g.fillRect(x+8,top+bh*0.42,bw-16,7);}
      else if(i===1){for(let k=0;k<3;k++)g.fillRect(x+8+k*((bw-16)/3),top+bh*0.30,(bw-16)/3-4,bh*0.40);}
      else if(i===2){g.beginPath();g.arc(x+bw/2,top+bh*0.52,bh*0.22,0,7);g.fill();}
      else if(i===3){g.beginPath();g.moveTo(x+bw/2,top+bh*0.26);g.lineTo(x+bw-10,top+bh*0.72);g.lineTo(x+10,top+bh*0.72);g.closePath();g.fill();}
      else {for(let k=0;k<4;k++)g.fillRect(x+8,top+bh*0.28+k*9,bw-16-k*6,5);}
      /* the hand: a fist and a brush, reaching up to it */
      const hx=x+bw/2-7,hy=top+bh+H*0.13;
      g.fillStyle="#C08A5E";g.fillRect(hx,hy,14,12);              /* the hand */
      g.fillRect(hx+3,hy+12,8,7);                                  /* the wrist */
      g.fillStyle=P.ink;g.fillRect(hx+2,hy-14,3,15);               /* the brush handle */
      g.fillStyle=cols[i];g.fillRect(hx+1,hy-20,5,7);              /* the loaded head */
    }
    /* the long board they ALL touch — the one they may share */
    const sy=H*0.84;
    g.fillStyle=P.ink;g.globalAlpha=.13;g.fillRect(gap+3,sy+3,W-gap*2,H*0.10);g.globalAlpha=1;
    g.fillStyle="#F2EDE0";g.fillRect(gap,sy,W-gap*2,H*0.10);
    for(let i=0;i<n;i++){g.fillStyle=cols[i];
      g.fillRect(gap+6+i*((W-gap*2-12)/n),sy+H*0.030,(W-gap*2-12)/n-5,H*0.040);}}
},
{
  id:"beto-predicado-no-consulta", iter:2, date:"2026-09-11",
  title:{en:"A predicate cannot answer a query", es:"Un predicado no contesta una consulta"},
  said:{en:"\u201CIs the player near a stop\u201D and \u201Cwhere is the next stop ahead of the car\u201D look like the same question, and one cannot be built from the other at any price.",
        es:"\u201C\u00BFEst\u00E1 el jugador cerca de una parada?\u201D y \u201C\u00BFd\u00F3nde est\u00E1 la siguiente parada delante del carro?\u201D parecen la misma pregunta, y una no se construye de la otra a ning\u00FAn precio."},
  who:{en:"Beto, in the engine room", es:"Beto, en el cuarto de m\u00E1quinas"},
  cap:{en:"He was asked whether the stop list should be a pack's business or the engine's, and found the question was already answered by a shape nobody had named. The function that exists sniffs a three-by-three box around the player and returns yes or no. Braking needs a place. No amount of asking am I at one will ever tell you where the next one is — so the change forces the seam open whether or not anybody wanted it opened.",
       es:"Le preguntaron si la lista de paradas era cosa del paquete o del motor, y encontr\u00F3 que la pregunta ya la hab\u00EDa contestado una forma que nadie hab\u00EDa nombrado. La funci\u00F3n que existe husmea un cuadro de tres por tres alrededor del jugador y contesta s\u00ED o no. Frenar necesita un lugar. Por m\u00E1s que preguntes \u00BFestoy en una? nunca te dir\u00E1 d\u00F3nde est\u00E1 la siguiente."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;
    murPaper(g,W,H,"#22314A","#4C6285");                 /* a blueprint. Beto's hand is a drawing office */
    g.fillStyle="#CFE0F2";g.font="bold 12px ui-monospace,monospace";
    /* LEFT: the predicate — a 3x3 box around a figure, and a yes/no lamp */
    const cx=W*0.22,cy=H*0.50,c=16;
    g.strokeStyle="#8FB3D9";g.lineWidth=1;
    for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++)g.strokeRect(cx+i*c-c/2,cy+j*c-c/2,c,c);
    murBody(g,cx-2,cy-4,"#CFE0F2",7);
    g.fillStyle=P.gold;g.beginPath();g.arc(cx+c*2.0,cy-c,4,0,7);g.fill();
    g.fillStyle="#8FB3D9";g.fillText("yes / no",cx+c*1.3,cy+c*1.9);
    /* RIGHT: the query — a line of track with stops on it and an arrow asking WHICH */
    const ly=H*0.50,x0=W*0.46,x1=W*0.95;
    g.strokeStyle="#CFE0F2";g.lineWidth=2;
    g.beginPath();g.moveTo(x0,ly);g.lineTo(x1,ly);g.stroke();
    [0.12,0.44,0.82].forEach(t=>{const x=x0+(x1-x0)*t;
      g.fillStyle="#CFE0F2";g.fillRect(x-2,ly-12,4,12);
      g.fillStyle=P.gold;g.fillRect(x-4,ly-16,8,4);});
    g.fillStyle=P.rust;g.fillRect(x0-6,ly-9,14,7);       /* the car */
    g.strokeStyle=P.gold;g.lineWidth=2;g.setLineDash([3,3]);
    g.beginPath();g.moveTo(x0+10,ly+10);g.lineTo(x0+(x1-x0)*0.44-4,ly+10);g.stroke();g.setLineDash([]);
    g.fillStyle=P.gold;g.fillText("which?",x0+14,ly+26);
    /* and the wall between them: you cannot get from left to right */
    g.strokeStyle=P.rust;g.lineWidth=3;
    g.beginPath();g.moveTo(W*0.40,H*0.16);g.lineTo(W*0.40,H*0.84);g.stroke();}
},
{
  id:"rosa-590-contra-2080", iter:1, date:"2026-09-11",
  title:{en:"590 against 2080", es:"590 contra 2080"},
  said:{en:"The screen says the trolley is coming for 1.6 seconds after it has gone. The sentence is never both true and useful.",
        es:"La pantalla dice que el trolley viene 1.6 segundos despu\u00E9s de que se fue. La frase nunca es cierta y \u00FAtil al mismo tiempo."},
  who:{en:"Rosa, with a stopwatch on both", es:"Rosa, con cron\u00F3metro en los dos"},
  cap:{en:"Everybody else read the code. She sampled the message and the world together every eighty milliseconds and got two numbers that cannot both be right: the tram is at the stop for 590 milliseconds and the words are on screen for 2080, and they start on the same frame. Nothing in her own brief asked for that measurement. She had a well-measured and far less important finding about the box ready to file instead.",
       es:"Los dem\u00E1s leyeron el c\u00F3digo. Ella muestre\u00F3 el mensaje y el mundo juntos cada ochenta milisegundos y sac\u00F3 dos n\u00FAmeros que no pueden ser ciertos los dos: el tranv\u00EDa est\u00E1 en la parada 590 milisegundos y las palabras est\u00E1n en pantalla 2080, y arrancan en el mismo cuadro."},
  aspect:0.42,
  art:(g,W,H)=>{const P=MURPAL;
    murPaper(g,W,H,"#F4F1E8",null);                       /* Rosa's hand is a dimension drawing */
    const x0=W*0.10,x1=W*0.94,t=v=>x0+(x1-x0)*(v/2400);
    /* the tram's 590ms */
    g.fillStyle=P.rust;g.fillRect(t(0),H*0.22,t(590)-t(0),16);
    murDim(g,t(0),t(590),H*0.18,P.deep,"590 ms");
    /* the toast's 2080ms, starting 124ms later */
    g.fillStyle=P.sky;g.fillRect(t(124),H*0.54,t(2204)-t(124),16);
    murDim(g,t(124),t(2204),H*0.50,"#4E6478","2080 ms");
    /* the gap where the words are a lie, hatched */
    g.strokeStyle=P.rust;g.lineWidth=1;
    for(let x=t(590);x<t(2204);x+=5){g.beginPath();g.moveTo(x,H*0.54);g.lineTo(x-6,H*0.54+16);g.stroke();}
    /* the baseline and the frame they share */
    g.strokeStyle=P.ink;g.lineWidth=1;
    g.beginPath();g.moveTo(x0,H*0.82);g.lineTo(x1,H*0.82);g.stroke();
    g.strokeStyle=P.gold;g.lineWidth=2;g.setLineDash([2,3]);
    g.beginPath();g.moveTo(t(60),H*0.12);g.lineTo(t(60),H*0.86);g.stroke();g.setLineDash([]);
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("same frame",t(60)+6,H*0.90);}
},
{
  id:"tavo-mas-lento-que-caminar", iter:1, date:"2026-09-11",
  title:{en:"Slower than walking", es:"M\u00E1s lento que caminar"},
  said:{en:"The trolley is 18% slower than your legs. That is not a defect to fix \u2014 it is the proof it was never transport.",
        es:"El trolley es 18% m\u00E1s lento que tus piernas. Eso no es un defecto que arreglar \u2014 es la prueba de que nunca fue transporte."},
  who:{en:"Tavo, who re-checked his own last note and found it wrong", es:"Tavo, que revis\u00F3 su propia nota anterior y la hall\u00F3 mal"},
  cap:{en:"He had written before that the line was worthless because both streets already touch through a door. Handed that back as settled, he opened the map instead of reusing it, and the stop and the door turned out to be at opposite ends of the same street. The corrected finding is the one worth having: the line is not useless, it has one stop and it is in the wrong place.",
       es:"Antes hab\u00EDa escrito que la l\u00EDnea no serv\u00EDa porque las dos calles ya se tocan por una puerta. Cuando se la devolvieron como cosa juzgada, abri\u00F3 el mapa en vez de reciclarla, y result\u00F3 que la parada y la puerta est\u00E1n en extremos opuestos de la misma calle. La correcci\u00F3n es lo que val\u00EDa: la l\u00EDnea no es in\u00FAtil, tiene una parada y est\u00E1 en el lugar equivocado."},
  aspect:0.42,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* a race at a scale you can read across a room: legs in front, tram behind, gap between */
    const x0=W*0.06,x1=W*0.94,fin=x1-6;
    /* the finish post, chequered */
    for(let y=H*0.10;y<H*0.86;y+=10){g.fillStyle=(y/10|0)%2?P.bone:P.ink;g.fillRect(fin-10,y,10,5);}
    g.fillStyle=P.ink;g.fillRect(fin,H*0.08,4,H*0.80);
    /* LANE 1 — the walker, way ahead, drawn big */
    const wy=H*0.34;
    g.fillStyle=P.shade;g.fillRect(x0,wy+22,x1-x0-14,3);
    const wx=x0+(x1-x0)*0.72;
    g.fillStyle=P.moss;g.fillRect(wx,wy-4,11,22);
    g.fillStyle="#C08A5E";g.fillRect(wx,wy-17,11,13);
    g.fillStyle=P.ink;g.fillRect(wx-2,wy-21,15,4);
    g.fillStyle=P.ink;g.fillRect(wx+1,wy+18,3,6);g.fillRect(wx+7,wy+18,3,6);
    g.fillStyle=P.moss;g.fillRect(wx-6,wy+2,7,4);                   /* a swinging arm */
    for(let i=0;i<6;i++){g.globalAlpha=.08+i*0.05;g.fillStyle=P.moss;
      g.fillRect(x0+(x1-x0)*(0.12+i*0.095),wy+10,5,10);}
    g.globalAlpha=1;
    /* LANE 2 — the tram, behind, same eye height */
    const ty=H*0.72;
    g.fillStyle=P.shade;g.fillRect(x0,ty+4,x1-x0-14,3);
    murTram(g,x0+(x1-x0)*0.46,ty-28,W*0.28,32,{driverAt:1});
    for(let i=0;i<5;i++){g.globalAlpha=.08+i*0.05;g.fillStyle=P.rust;
      g.fillRect(x0+(x1-x0)*(0.12+i*0.07),ty-10,6,12);}
    g.globalAlpha=1;
    /* the gap, marked, because the gap IS the finding */
    g.strokeStyle=P.gold;g.lineWidth=2;g.setLineDash([5,4]);
    g.beginPath();g.moveTo(wx+5,H*0.16);g.lineTo(wx+5,H*0.90);g.stroke();
    g.beginPath();g.moveTo(x0+(x1-x0)*0.46+W*0.28,H*0.16);g.lineTo(x0+(x1-x0)*0.46+W*0.28,H*0.90);g.stroke();
    g.setLineDash([]);
    murDim(g,x0+(x1-x0)*0.46+W*0.28,wx+5,H*0.14,P.gold,"18%");
    g.fillStyle=P.moss;g.font="bold 14px ui-monospace,monospace";g.fillText("4.17",wx-14,wy-26);
    g.fillStyle=P.deep;g.fillText("3.4",x0+(x1-x0)*0.46+6,ty-34);}
},
{
  id:"tono-la-marca-y-el-glifo", iter:2, date:"2026-09-11",
  title:{en:"It guards the brand, not the glyph", es:"Cuida la marca, no el glifo"},
  said:{en:"A guard that reads a name when it means a letter. Fourth time in this shop, same shape.",
        es:"Un guardia que lee un nombre cuando quiere decir una letra. Cuarta vez en esta ferreter\u00EDa, misma forma."},
  who:{en:"To\u00F1o, who keeps the drawers labelled", es:"To\u00F1o, el de los cajones con etiqueta"},
  cap:{en:"The build fails if the engine ever spells this pack's transit brand, and it says why: a pack name in engine code is the one thing the portability law forbids. Three lines below that, in the same file, the pack's own stop letter sits in the engine five times and nothing objects. The guard is good. It is pointed at the wrong noun.",
       es:"La compilaci\u00F3n falla si el motor llega a escribir la marca de transporte de este paquete, y dice por qu\u00E9: el nombre de un paquete en c\u00F3digo de motor es lo \u00FAnico que la ley de portabilidad proh\u00EDbe. Tres renglones abajo, en el mismo archivo, la letra de parada del paquete est\u00E1 cinco veces en el motor y nadie se queja."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;
    murPaper(g,W,H,"#E3DACB",null);                      /* To\u00F1o's hand: labelled drawers */
    const rows=2,cols=5,dw=(W-24)/cols,dh=(H-34)/rows;
    for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){
      const x=12+c*dw,y=16+r*dh,caught=(r===0&&c===0);
      g.fillStyle=caught?P.moss:"#CFC4B0";g.fillRect(x,y,dw-6,dh-8);
      g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(x,y+dh-14,dw-6,3);g.globalAlpha=1;
      g.fillStyle="#F2EDE0";g.fillRect(x+(dw-6)/2-13,y+dh*0.30,26,11);   /* the label card */
      g.fillStyle=caught?P.moss:P.shade;g.fillRect(x+(dw-6)/2-9,y+dh*0.34,18,3);
      g.fillStyle=P.ink;g.fillRect(x+(dw-6)/2-4,y+dh-18,8,3);}           /* the pull */
    /* the one drawer that is caught, and the five that walk past */
    g.fillStyle=P.moss;g.font="bold 12px ui-monospace,monospace";
    g.fillText("MQT",16,12);
    g.fillStyle=P.rust;
    for(let c=0;c<5;c++)g.fillText("Y",12+c*dw+(dw-6)/2-4,H-6);
    g.strokeStyle=P.rust;g.lineWidth=2;
    g.beginPath();g.moveTo(12,H-18);g.lineTo(W-12,H-18);g.stroke();}
},
{
  id:"guero-tres-carriles", iter:2, date:"2026-09-11",
  title:{en:"A tram needs three rows", es:"Un tranv\u00EDa necesita tres filas"},
  said:{en:"You cannot protect a track with two. The rails must stay walkable, so separation can only come from the rows either side.",
        es:"Con dos no se protege una v\u00EDa. Los rieles tienen que seguir pisables, as\u00ED que la separaci\u00F3n s\u00F3lo puede venir de las filas de al lado."},
  who:{en:"Don G\u00FCero, who was told to be comfortable growing the town", es:"Don G\u00FCero, a quien le dijeron que creciera el pueblo con confianza"},
  cap:{en:"Asked to widen the road so characters rarely interrupt the tram, he measured and found that widening on its own buys nothing at all \u2014 a person crosses one row in the same quarter second however many rows there are. What changes it is a boundary. And on the way he found two shops that had poured their sidewalk into the tram lane, with two district doorsteps standing on the track, because the street was never given a pavement on that side.",
       es:"Le pidieron ensanchar la calle para que los personajes casi no interrumpan al tranv\u00EDa, midi\u00F3, y hall\u00F3 que ensanchar solo no compra nada \u2014 una persona cruza una fila en el mismo cuarto de segundo haya las filas que haya. Lo que cambia es un l\u00EDmite. Y de camino encontr\u00F3 dos comercios que hab\u00EDan echado su banqueta dentro del carril del tranv\u00EDa."},
  aspect:0.48,
  art:(g,W,H)=>{const P=MURPAL;
    murPaper(g,W,H,"#EDE7D8",null);                      /* a planner's cross-section, with a scale */
    const x0=W*0.08,x1=W*0.92,rh=H*0.13,top=H*0.16;
    const bands=[["pavement","#D9D2BE"],["verge","#5F7A52"],["RAILS","#54555B"],["verge","#5F7A52"],["pavement","#D9D2BE"]];
    bands.forEach((b,i)=>{const y=top+i*rh;
      g.fillStyle=b[1];g.fillRect(x0,y,x1-x0,rh-2);
      g.fillStyle=i===2?P.bone:P.ink;g.globalAlpha=i===2?1:.55;
      g.font="bold 10px ui-monospace,monospace";g.fillText(b[0],x0+6,y+rh*0.62);g.globalAlpha=1;});
    /* the rails themselves */
    const ry=top+2*rh;
    g.fillStyle="#3A3F46";g.fillRect(x0,ry+rh*0.24,x1-x0,2);g.fillRect(x0,ry+rh*0.60,x1-x0,2);
    /* the gap in both verges: the crossing, the only stitch */
    const cx=W*0.62,cw=W*0.11;
    g.fillStyle="#D9D2BE";g.fillRect(cx,top+rh,cw,rh-2);g.fillRect(cx,top+3*rh,cw,rh-2);
    g.fillStyle=P.bone;for(let i=0;i<3;i++)g.fillRect(cx,ry+3+i*(rh/3),cw,rh*0.14);
    murBody(g,cx+cw*0.42,ry+rh*0.16,P.moss,7);
    /* the scale rule at the foot */
    g.strokeStyle=P.ink;g.lineWidth=1;
    g.beginPath();g.moveTo(x0,H-14);g.lineTo(x1,H-14);g.stroke();
    for(let i=0;i<=10;i++){const x=x0+(x1-x0)*i/10;
      g.beginPath();g.moveTo(x,H-14);g.lineTo(x,H-14+(i%5?4:8));g.stroke();}
    /* 60 ways on, becoming 13 */
    g.fillStyle=P.rust;g.font="bold 12px ui-monospace,monospace";
    g.fillText("60",x0+2,H*0.12);
    g.fillStyle=P.moss;g.fillText("13",x1-22,H*0.12);
    g.strokeStyle=P.shade;g.lineWidth=2;
    g.beginPath();g.moveTo(x0+22,H*0.09);g.lineTo(x1-28,H*0.09);g.stroke();}
},
{
  id:"rigo-el-claxon", iter:2, date:"2026-09-11",
  title:{en:"The horn goes with the brake", es:"El claxon va con el freno"},
  said:{en:"In nine years I never wrote up a driver for failing to sound. I wrote them up for sounding and not coming off the power.",
        es:"En nueve a\u00F1os nunca report\u00E9 a un chofer por no tocar. Los report\u00E9 por tocar y no soltar la marcha."},
  who:{en:"Rigo, forty-one years on the trolleys", es:"Rigo, cuarenta y un a\u00F1os en los tranv\u00EDas"},
  cap:{en:"The owner asked whether his tram could sound its horn and not stop, and whether he was describing decoration. The answer came from the seat: the bell is the warning and carries no demand, the horn is the emergency and is sounded with the brake, never instead of it. And the test for whether the honk is real is one sentence \u2014 a person who does not move must get hit. If they do not, it was a picture of a mechanism.",
       es:"El due\u00F1o pregunt\u00F3 si su tranv\u00EDa pod\u00EDa tocar y no parar, y si estaba describiendo adorno. La respuesta vino del asiento: la campana avisa y no exige nada, el claxon es emergencia y se toca con el freno, nunca en lugar de \u00E9l. Y la prueba de que el claxon es de verdad es una frase \u2014 a quien no se mueva, lo tiene que tocar."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;
    /* Rigo's hand is a depot signwriter's board: heavy bands, gold rule, nothing cute */
    g.fillStyle="#2B2536";g.fillRect(0,0,W,H);
    g.fillStyle=P.gold;g.fillRect(0,H*0.10,W,3);g.fillRect(0,H*0.88,W,3);
    /* four beats, left to right, each a bar whose height IS the power */
    const beats=[["bell","4.0",1.00,P.bone],["off power","2.2",0.62,P.sky],["horn+brake","1.4",0.30,P.rust],["stood","0",0.0,P.shade]];
    const bw=(W-40)/4;
    beats.forEach((b,i)=>{const x=20+i*bw,hh=(H*0.52)*b[2];
      g.fillStyle=b[3];g.fillRect(x,H*0.74-hh,bw-14,hh||3);
      g.fillStyle=P.bone;g.font="bold 10px ui-monospace,monospace";
      g.fillText(b[0],x,H*0.82);
      g.fillStyle=P.gold;g.fillText(b[1],x,H*0.22);});
    /* the horn itself: two arcs at the nose, not a word */
    g.strokeStyle=P.gold;g.lineWidth=2;
    for(let k=1;k<=2;k++){g.globalAlpha=0.9-k*0.28;
      g.beginPath();g.arc(20+2*bw-8,H*0.50,8+k*7,-0.7,0.7);g.stroke();}
    g.globalAlpha=1;
    /* and the one that did not move */
    murBody(g,W*0.86,H*0.56,P.moss,9);
    g.strokeStyle=P.rust;g.lineWidth=2;
    g.beginPath();g.moveTo(W*0.84,H*0.46);g.lineTo(W*0.92,H*0.72);g.moveTo(W*0.92,H*0.46);g.lineTo(W*0.84,H*0.72);g.stroke();}
},
{
  id:"nacho-la-esquina-volvio", iter:2, date:"2026-09-11",
  title:{en:"The corner came back to her", es:"La esquina volvi\u00F3 a ella"},
  said:{en:"She did not follow the stop. The stop came back to her.",
        es:"Ella no sigui\u00F3 a la parada. La parada volvi\u00F3 a ella."},
  who:{en:"Nacho, who went to his own old comments instead of the bible", es:"Nacho, que fue a sus propios comentarios viejos y no a la biblia"},
  cap:{en:"The brief told him the tamalera standing beside the only stop was an accident of the map. He checked his own signed note in the art file and found the opposite \u2014 he had put her there on purpose, four days earlier, because tamales are sold at the transit stop in every barrio on earth. The true finding was narrower and better: the placement was deliberate and her four chat lines have never once mentioned it. He also found she has been rendering as a grey-suited executive this whole time, because nobody ever gave her a face.",
       es:"El encargo le dijo que la tamalera junto a la \u00FAnica parada era un accidente del mapa. Fue a su propia nota firmada en el archivo de arte y hall\u00F3 lo contrario \u2014 la hab\u00EDa puesto ah\u00ED a prop\u00F3sito, cuatro d\u00EDas antes, porque los tamales se venden en la parada en todos los barrios del mundo. Tambi\u00E9n hall\u00F3 que ella se dibuja como un ejecutivo de traje gris desde siempre, porque nadie le dio cara."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* Nacho paints. She is the subject, so she is big; the corner is behind her, so it is quiet. */
    const hor=H*0.78;
    g.fillStyle="#8E4230";g.globalAlpha=.35;g.fillRect(W*0.62,H*0.06,W*0.38,hor-H*0.06);g.globalAlpha=1;
    g.fillStyle="#54555B";g.fillRect(0,hor,W,H-hor-4);
    g.fillStyle="#3A3F46";g.fillRect(0,hor+9,W,2);g.fillRect(0,hor+22,W,2);
    /* the stop sign, tall, behind her shoulder */
    g.fillStyle=P.ink;g.fillRect(W*0.55,H*0.26,4,hor-H*0.26);
    g.fillStyle="#C0392B";g.fillRect(W*0.49,H*0.20,W*0.16,H*0.13);
    g.fillStyle=P.bone;g.fillRect(W*0.525,H*0.245,W*0.09,4);g.fillRect(W*0.525,H*0.285,W*0.06,4);
    /* THE POT, big, with real steam */
    const pw2=W*0.20,ph2=H*0.24,potx=W*0.10,poty=hor-ph2-6;
    g.fillStyle=P.ink;g.globalAlpha=.20;g.fillRect(potx+4,hor-8,pw2,6);g.globalAlpha=1;
    g.fillStyle="#7E858E";g.fillRect(potx,poty,pw2,ph2);
    g.fillStyle="#5E656E";g.fillRect(potx,poty+ph2*0.62,pw2,3);
    g.fillStyle="#9AA1AA";g.fillRect(potx-5,poty-8,pw2+10,9);         /* the lid */
    g.fillStyle="#6E757E";g.fillRect(potx+pw2*0.40,poty-14,pw2*0.20,7);
    g.fillStyle="#E0A430";g.beginPath();g.arc(potx+pw2*0.72,poty-11,5,0,7);g.fill();  /* the marigold */
    g.fillStyle="#C87F1E";g.beginPath();g.arc(potx+pw2*0.72,poty-11,2,0,7);g.fill();
    g.strokeStyle=P.bone;g.lineWidth=3;
    for(let k=0;k<3;k++){g.globalAlpha=.55-k*0.12;g.beginPath();
      for(let i2=0;i2<=7;i2++){const y=poty-16-i2*(H*0.055),x=potx+pw2*0.30+k*(pw2*0.26)+Math.sin(i2*0.9+k*1.4)*8;
        i2?g.lineTo(x,y):g.moveTo(x,y);}
      g.stroke();}
    g.globalAlpha=1;
    /* HER, at the scale of a person you would talk to */
    const bx=potx+pw2+W*0.05,bh2=H*0.34,by=hor-bh2-4;
    g.fillStyle="#B0563A";g.fillRect(bx,by,W*0.11,bh2);              /* her rebozo */
    g.fillStyle="#8E4230";g.fillRect(bx,by,W*0.11,6);
    g.fillStyle="#C08A5E";g.fillRect(bx+W*0.012,by-H*0.115,W*0.086,H*0.115);   /* face */
    g.fillStyle="#4A3B2E";g.fillRect(bx+W*0.006,by-H*0.145,W*0.098,H*0.040);   /* hair, not a buzz cut */
    g.fillStyle="#4A3B2E";g.fillRect(bx+W*0.030,by-H*0.030,W*0.050,H*0.030);   /* the braid down her back */
    g.fillStyle=P.ink;g.fillRect(bx+W*0.026,by-H*0.075,3,3);g.fillRect(bx+W*0.062,by-H*0.075,3,3);
    g.fillStyle=P.ink;g.fillRect(bx+W*0.018,by+bh2,4,5);g.fillRect(bx+W*0.070,by+bh2,4,5);}
}
);

MURALS.push(
{
  id:"beto-aprobado-por-la-prueba-del-muro", iter:3, date:"2026-09-11",
  title:{en:"Approved by the wall test", es:"Aprobado por la prueba del muro"},
  said:{en:"The check asked \u201Cis it a wall\u201D. What it meant was \u201Cis it safe to stand here\u201D. It ran on those four tiles at every boot for weeks, and stamped every one of them PASSED.",
        es:"La revisi\u00F3n preguntaba \u201C\u00BFes un muro?\u201D. Lo que quer\u00EDa decir era \u201C\u00BFse puede parar uno aqu\u00ED?\u201D. Corri\u00F3 sobre esas cuatro casillas en cada arranque durante semanas, y a todas les puso APROBADO."},
  who:{en:"Beto, who went and stood on the tile", es:"Beto, que fue y se par\u00F3 en la casilla"},
  cap:{en:"He was sent to add a check and found the check already there. He walked out of the bakery the way a player does, and the ground under his feet was painted the colour of a pavement, the door was behind him, a house wall in front, and the tram standing two and a half tiles away with nowhere to go. The overlay that painted that tile also painted out the neighbours\u2019 zebra crossing, and nobody had noticed that either. Then he planted a real fault to see what the suites would catch, and found that the two filters watching for exactly that warning have never matched a single character.",
       es:"Lo mandaron a poner una revisi\u00F3n y encontr\u00F3 que la revisi\u00F3n ya estaba. Sali\u00F3 de la panader\u00EDa como sale un jugador, y el suelo bajo sus pies estaba pintado del color de una banqueta, la puerta atr\u00E1s, un muro de casa enfrente, y el tranv\u00EDa parado a dos casillas y media sin a d\u00F3nde ir. La capa que pint\u00F3 esa casilla tambi\u00E9n borr\u00F3 el paso peatonal de los vecinos, y eso tampoco lo hab\u00EDa visto nadie. Luego plant\u00F3 una falla de verdad para ver qu\u00E9 atrapaban las pruebas, y hall\u00F3 que los dos filtros que vigilan justo ese aviso nunca han coincidido con un solo car\u00E1cter."},
  aspect:0.46,
  /* Beto's OTHER paper: a buff setting-out sheet with a tracing overlay laid over it, and the
     approval stamp on the wrong one. Not the blueprint again — the wall already has that from him. */
  art:(g,W,H)=>{const P=MURPAL;
    murPaper(g,W,H,"#DCCFAE",null);
    const x0=W*0.07,x1=W*0.93,ry=H*0.44,rh=H*0.15;
    g.fillStyle="#54555B";g.fillRect(x0,ry,x1-x0,rh);                       /* the lane, as the map ships it */
    g.fillStyle="#6A6B72";for(let x=x0+6;x<x1-8;x+=22)g.fillRect(x,ry+rh*0.52,10,2);
    const zx=x0+(x1-x0)*0.115;                                              /* the neighbours' zebra */
    g.fillStyle="#D8D6CE";for(let i=0;i<3;i++)g.fillRect(zx,ry+4+i*(rh/3),16,rh*0.15);
    g.fillStyle="#9E7A55";g.fillRect(zx-4,ry+rh,24,H*0.10);
    g.fillStyle="#5A3E28";g.fillRect(zx+5,ry+rh+3,6,H*0.07);
    const ty=H*0.10,tb=ry+rh*0.62;                                          /* the tracing overlay */
    g.save();
    g.beginPath();g.moveTo(x0-10,ty);g.lineTo(x1+10,ty);g.lineTo(x1+10,tb);g.lineTo(x0-10,tb);g.closePath();g.clip();
    g.globalAlpha=0.88;g.fillStyle="#F1EADA";g.fillRect(x0-10,ty,x1-x0+20,tb-ty);g.globalAlpha=1;
    const sx=x0+(x1-x0)*0.30,sw=(x1-x0)*0.30;
    g.fillStyle=P.gold;g.fillRect(sx,ty+8,sw,H*0.13);
    g.fillStyle="#B8892F";for(let x=sx+3;x<sx+sw-4;x+=10)g.fillRect(x,ty+8+H*0.13,6,4);
    g.fillStyle="#E8B85A";g.fillRect(sx+sw*0.42,ty+8+H*0.05,sw*0.17,H*0.09);
    g.fillStyle="#7A4E17";g.fillRect(sx+sw*0.42,ty+8+H*0.05,sw*0.17,3);
    g.fillStyle="#D5D2C6";g.fillRect(sx,ry,sw,rh);                          /* the pavement it poured in the lane */
    g.strokeStyle="#B9B19D";g.lineWidth=1;g.strokeRect(sx+0.5,ry+0.5,sw-1,rh-1);
    g.restore();
    g.fillStyle="#C9BC9A";g.beginPath();g.moveTo(x1+10,tb);g.lineTo(x1-16,tb);g.lineTo(x1+10,tb-20);g.closePath();g.fill();
    g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
    [0.34,0.46,0.62,0.74].forEach(t=>{const x=x0+(x1-x0)*t;                 /* the four arrivals */
      g.beginPath();g.moveTo(x,ry-13);g.lineTo(x-4,ry-5);g.lineTo(x+4,ry-5);g.closePath();g.fill();});
    g.fillText("x4",x0+(x1-x0)*0.54,ry-17);g.textAlign="left";
    const mx=x0+(x1-x0)*0.46;
    murBody(g,mx,ry+rh*0.20,P.sky,8);
    g.fillStyle="#8A7A66";g.fillRect(mx-8,ry+rh,22,6);                      /* the wall at his back */
    murTram(g,mx+(x1-x0)*0.18,ry+rh*0.16,58,rh*0.66,{});
    murDim(g,mx+7,mx+(x1-x0)*0.18,ry+rh+18,P.ink,"2.57");
    g.save();                                                               /* the stamp, crooked, red */
    g.translate(W*0.74,H*0.20);g.rotate(-0.19);
    g.strokeStyle="#C0392B";g.lineWidth=3;g.globalAlpha=0.85;g.strokeRect(-52,-19,104,38);
    g.fillStyle="#C0392B";g.font="bold 17px ui-monospace,monospace";g.textAlign="center";
    g.fillText("PASSED",0,2);
    g.font="bold 8px ui-monospace,monospace";g.fillText("is it a wall? no",0,13);
    g.textAlign="left";g.globalAlpha=1;g.restore();
    const bw=W*0.30,bh=H*0.13,bx=W-bw-8,by=H-bh-7;                          /* the title block */
    g.fillStyle="#EFE7D2";g.fillRect(bx,by,bw,bh);
    g.strokeStyle=P.ink;g.lineWidth=1;g.strokeRect(bx+0.5,by+0.5,bw-1,bh-1);
    g.beginPath();g.moveTo(bx,by+bh*0.5);g.lineTo(bx+bw,by+bh*0.5);g.stroke();
    g.fillStyle=P.ink;g.font="bold 8px ui-monospace,monospace";
    g.fillText("CALLE DOS \u00B7 ROW 1",bx+5,by+bh*0.33);
    g.fillStyle="#6B6458";g.font="8px ui-monospace,monospace";
    g.fillText("arrivals on the line: 4",bx+5,by+bh*0.80);}
}
);

MURALS.push(
{
  id:"chema-seis-cuadros-una-rueda", iter:3, date:"2026-09-11",
  title:{en:"Six frames, one wheel", es:"Seis cuadros, una rueda"},
  said:{en:"The arithmetic said the wheel would strobe if we sped it up. The contact sheet said it had never been a wheel.",
        es:"La aritm\u00E9tica dec\u00EDa que la rueda parpadear\u00EDa si la acelerábamos. La hoja de contactos dec\u00EDa que nunca hab\u00EDa sido una rueda."},
  who:{en:"Chema, who photographed it before he believed it", es:"Chema, que lo fotografi\u00F3 antes de creerlo"},
  cap:{en:"He was sent to check somebody else's arithmetic \u2014 twelve segments, thirty degrees each, and at the new speed the wheels would run backwards. The arithmetic was sound and it was about a thing that is not on the screen. One line lays each wheel on its side, so what rolls down that street is a black cylinder flipping end over end and bouncing half its own height off the road, twice every turn, and it has been doing it at today's speed since the day it shipped. The speed was never the danger. He also learned to distrust his own first frame: his opening measurement said the wheels changed 1506 pixels, and a control that changed nothing at all changed 1864.",
       es:"Lo mandaron a revisar la aritm\u00E9tica de otro \u2014 doce segmentos, treinta grados cada uno, y a la nueva velocidad las ruedas girar\u00EDan al rev\u00E9s. La aritm\u00E9tica estaba bien y hablaba de algo que no est\u00E1 en la pantalla. Una l\u00EDnea acuesta cada rueda de lado, y lo que rueda por esa calle es un cilindro negro que da vuelta de campana y brinca la mitad de su propia altura sobre el asfalto, dos veces por giro, y lo lleva haciendo a la velocidad de hoy desde el d\u00EDa que se entreg\u00F3. La velocidad nunca fue el peligro. Tambi\u00E9n aprendi\u00F3 a desconfiar de su propia primera toma: su medici\u00F3n inicial dijo que las ruedas cambiaban 1506 p\u00EDxeles, y un control que no cambiaba nada cambi\u00F3 1864."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* CHEMA'S HAND: a contact sheet. Black film sleeve, sprocket holes, two strips of six frames a
       sixtieth of a second apart, and the grease pencil that says which strip is a keeper. */
    const shx=W*0.035, shy=H*0.17, shw=W*0.93, shh=H*0.64;
    g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(shx+5,shy+6,shw,shh);g.globalAlpha=1;
    g.fillStyle="#241F2E";g.fillRect(shx,shy,shw,shh);
    g.fillStyle="#15121B";g.fillRect(shx,shy,shw,3);g.fillRect(shx,shy+shh-3,shw,3);
    g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";
    g.fillText("EL TROLLEY \u00b7 LA RUEDA \u00b7 1/60 s",shx,H*0.105);
    g.font="11px ui-monospace,monospace";g.fillStyle=P.deep;
    g.fillText("390\u00d7844 \u00b7 c\u00e1mara 3D \u00b7 de costado \u00b7 8\u00d7",shx+W*0.42,H*0.105);
    const n=6, pad=W*0.012, fw=(shw-pad*(n+1))/n, fh=shh*0.33, sp=shh*0.11;
    const strip=(y0,draw)=>{
      for(let i=0;i<n;i++){const x=shx+pad+i*(fw+pad);
        g.fillStyle="#7A3B29";g.fillRect(x,y0,fw,fh);
        g.fillStyle="#66311F";g.fillRect(x,y0+fh*0.44,fw,fh*0.18);
        g.fillStyle="#4A4A50";g.fillRect(x,y0+fh*0.62,fw,fh*0.38);
        g.fillStyle="#D8CBB4";g.fillRect(x+fw*0.52,y0+fh*0.60,fw*0.48,2);
        draw(x,y0,i);
        g.strokeStyle="#15121B";g.lineWidth=1;g.strokeRect(x+0.5,y0+0.5,fw-1,fh-1);
        g.fillStyle="#8A8090";g.font="8px ui-monospace,monospace";g.fillText(String(i+1),x+2,y0+fh-3);}
      g.fillStyle="#15121B";
      for(let x=shx+pad;x<shx+shw-pad;x+=fw/4){g.fillRect(x,y0-5,5,3);g.fillRect(x,y0+fh+2,5,3);}};
    const yA=shy+shh*0.17, yB=yA+fh+sp;
    strip(yA,(x,y,i)=>{const cx=x+fw*0.34, cy=y+fh*0.50, r=fh*0.21;
      const a=[-0.35,0.55,1.42,-1.15,0.15,1.05][i];
      g.save();g.translate(cx,cy);g.rotate(a);
      g.fillStyle="#1B1B20";g.fillRect(-r,-r*0.42,r*2,r*0.84);
      g.fillStyle="#3A3A42";g.fillRect(-r,-r*0.42,r*0.46,r*0.84);
      g.restore();});
    strip(yB,(x,y,i)=>{const cx=x+fw*0.34, cy=y+fh*0.52, r=fh*0.23;
      g.fillStyle="#1B1B20";g.beginPath();g.ellipse(cx,cy,r,r*0.88,0,0,7);g.fill();
      g.fillStyle="#33333A";g.beginPath();g.ellipse(cx-r*0.22,cy-r*0.26,r*0.30,r*0.26,0,0,7);g.fill();});
    g.strokeStyle="#D9342B";g.lineWidth=3;g.lineCap="round";
    for(let i=0;i<n;i++){const x=shx+pad+i*(fw+pad);
      g.beginPath();g.moveTo(x+4,yA+4);g.lineTo(x+fw-4,yA+fh-4);
      g.moveTo(x+fw-4,yA+4);g.lineTo(x+4,yA+fh-4);g.stroke();}
    g.fillStyle="#D9342B";g.font="bold 12px ui-monospace,monospace";
    g.fillText("NO RUEDA",shx+pad,yA-9);
    g.strokeStyle="#E0A430";g.lineWidth=4;
    g.beginPath();g.ellipse(shx+shw/2,yB+fh/2,shw*0.475,fh*0.86,0,0,7);g.stroke();
    g.fillStyle="#E0A430";g.font="bold 12px ui-monospace,monospace";
    g.fillText("RUEDA \u2713",shx+pad,yB-11);
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("160 px por cuadro \u2014 y la rueda entera mide 168",shx,H*0.955);
    g.fillStyle=P.moss;
    g.fillText("41 \u2014 a 6.0, sin parpadeo",shx+W*0.66,H*0.955);}
}
);

MURALS.push(
{
  id:"chava-cuatro-cuadros", iter:3, date:"2026-09-11",
  title:{en:"Four frames", es:"Cuatro cuadros"},
  said:{en:"I didn't press anything. I stood at the stop for a minute and it happened twice.",
        es:"No apret\u00E9 nada. Me par\u00E9 en la parada un minuto y pas\u00F3 dos veces."},
  who:{en:"Chava, who plays it wrong on purpose and films what happens",
       es:"Chava, el que juega mal a prop\u00F3sito y filma lo que pasa"},
  cap:{en:"Nobody had to reproduce it. She lives at the west end, which is where the game tells you to go and wait for the trolley, and she spends a fifth of her life standing in its lane. Nine minutes of standing still: seventeen trams, four of them straight through her, and not one toast, sound or flinch \u2014 while the same tram stopped dead four tiles short of him and held there until he got bored.",
       es:"Nadie tuvo que reproducirlo. Ella vive en la punta poniente, que es adonde el juego te manda a esperar el tranv\u00EDa, y se pasa una quinta parte de su vida parada en el carril. Nueve minutos sin moverse: diecisiete tranv\u00EDas, cuatro encima de ella, y ni un aviso, ni un sonido, ni un respingo \u2014 mientras el mismo tranv\u00EDa se fren\u00F3 en seco cuatro casillas antes de \u00E9l y ah\u00ED se qued\u00F3 hasta que se aburri\u00F3."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* CHAVA'S HAND: a strip of 35mm. Nobody else on this wall has a filmstrip, and nobody else's
       panel is a COUNT. Four frames, timecoded, the pigeon in the same spot in every one because
       she never moves — and the one where she is painted inside the tram is ringed in chinagraph. */
    const fx=W*0.04, fy=H*0.22, fw=W*0.68, fh=H*0.42;
    g.fillStyle="#1A1620";g.fillRect(fx,fy-8,fw,fh+16);
    g.fillStyle="#0E0C12";
    for(let x=fx+4;x<fx+fw-4;x+=11){g.fillRect(x,fy-6,6,4);g.fillRect(x,fy+fh+2,6,4);}
    const n=4, pad=4, cw=(fw-pad*(n+1))/n;
    const tc=["0:00","0:11","0:13","0:15"];
    for(let i=0;i<n;i++){const x=fx+pad+i*(cw+pad);
      g.fillStyle="#4A4B52";g.fillRect(x,fy,cw,fh);                       /* the road */
      g.fillStyle="#3A3F46";g.fillRect(x,fy+fh*0.42,cw,2);g.fillRect(x,fy+fh*0.70,cw,2);
      if(i===1){murTram(g,x-cw*0.55,fy+fh*0.20,cw*0.9,fh*0.46,{driverAt:1});}
      if(i===2){murTram(g,x+cw*0.02,fy+fh*0.20,cw*0.9,fh*0.46,{driverAt:1});}
      if(i===3){murTram(g,x+cw*0.72,fy+fh*0.20,cw*0.9,fh*0.46,{driverAt:1});}
      /* her, in the same tile in every frame, because she never moves */
      const bx=x+cw*0.46, by=fy+fh*0.52;
      g.fillStyle="#9AA0A8";g.fillRect(bx,by,5,4);
      g.fillStyle="#7E858E";g.fillRect(bx+3,by-3,4,4);
      g.fillStyle="#E0A430";g.fillRect(bx+6,by-2,2,1);
      g.fillStyle="#C87F1E";g.fillRect(bx+1,by+4,1,2);g.fillRect(bx+3,by+4,1,2);
      g.strokeStyle="#0E0C12";g.lineWidth=1;g.strokeRect(x+0.5,fy+0.5,cw-1,fh-1);
      g.fillStyle="#8A8090";g.font="7px ui-monospace,monospace";g.fillText(tc[i],x+2,fy+fh-3);}
    /* the chinagraph ring on frame 3 — where she is inside the third window */
    const rx=fx+pad+2*(cw+pad);
    g.strokeStyle="#D9342B";g.lineWidth=3;
    g.beginPath();g.ellipse(rx+cw/2,fy+fh/2,cw*0.56,fh*0.56,0,0,7);g.stroke();
    g.lineWidth=2;
    g.beginPath();g.ellipse(rx+cw/2,fy+fh/2,cw*0.46,fh*0.46,0,0,7);g.stroke();
    /* the count, in mono, under the strip */
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("9 min \u00b7 17 pasadas \u00b7 4 encima \u00b7 0 avisos",fx,H*0.76);
    g.fillStyle=P.deep;g.font="10px ui-monospace,monospace";
    g.fillText("y el mismo tranv\u00EDa se para en seco por m\u00ED \u2192",fx,H*0.84);
    /* ...and there it is, at the right-hand edge, stopped, with one small green person in front */
    const sx=W*0.76;
    murTram(g,sx+W*0.07,H*0.66,W*0.17,H*0.13,{driverAt:-1});
    g.fillStyle="#D9342B";g.beginPath();g.arc(sx+W*0.075,H*0.70,3,0,7);g.fill();
    murBody(g,sx,H*0.71,P.moss,8);
    g.fillStyle=P.shade;g.fillRect(W*0.74,H*0.885,W*0.22,2);}
}
);


/* ---- iteration 4: the painter's own STATE, at the owner's word, 2026-09-12 ----
   "the drawing itself doesnt have to be about their work, more about the persona 'state'. could be
   a state of confusion because there are questions, so it can still do what it wants and if it wants
   to paint work then that is fine." Panels from here carry `state`. ---- */
MURALS.push(
{
  id:"paty-la-ultima-frase", iter:4, date:"2026-09-12",
  title:{en:"The last sentence", es:"La \u00FAltima frase"},
  state:{en:"Nobody asked me. So I counted.", es:"Nadie me pregunt\u00F3. As\u00ED que cont\u00E9."},
  said:{en:"Four of these thirteen say materially less in Spanish than in English, and in each one the clause that went missing is the finding.",
        es:"Cuatro de estos trece dicen bastante menos en espa\u00F1ol que en ingl\u00E9s, y en cada uno la frase que se cay\u00F3 era el hallazgo."},
  who:{en:"Paty, the thirteenth hand on this wall \u2014 the one nobody signed",
       es:"Paty, la mano trece de este muro \u2014 la que nadie firm\u00F3"},
  cap:{en:"The wall's one rule is add and improve, never remove. It has been bent four times in one language only. Nine of the thirteen Spanish captions sit between 0.94 and 1.12 of their English, which is ordinary compression; four fall off a cliff \u2014 0.65, 0.74, 0.77, 0.78 \u2014 and each of those is a dropped final clause rather than a tighter sentence. The worst is not merely short: Rigo's ES ends \u201Ca quien no se mueva, lo tiene que tocar\u201D and the same caption two lines above uses tocar for sounding the horn, so the Spanish reader is told the honk is the test \u2014 the reverse of what he came to say. It happens because the Spanish is written last, by the hand that has just finished thinking in English, and the last sentence is where it runs out. PAINTED WITH MEASURED NUMBERS, NOT REMEMBERED ONES: the first version of this panel said six, from counting by eye, and the machine said four. The picture was right and the number was not, which is the same defect it is about.",
       es:"La \u00FAnica regla de este muro es agregar y mejorar, nunca quitar. Se dobl\u00F3 cuatro veces, y nada m\u00E1s en un idioma. Nueve de los trece pies en espa\u00F1ol andan entre 0.94 y 1.12 de su ingl\u00E9s, que es compresi\u00F3n normal; cuatro se caen del risco \u2014 0.65, 0.74, 0.77, 0.78 \u2014 y cada uno es una \u00FAltima frase que se solt\u00F3, no una frase m\u00E1s apretada. El peor no nada m\u00E1s es corto: el de Rigo cierra con \u201Ca quien no se mueva, lo tiene que tocar\u201D y ese mismo pie, dos renglones arriba, usa tocar para el claxon; al lector en espa\u00F1ol le queda que el claxon es la prueba, al rev\u00E9s de lo que \u00E9l vino a decir. Pasa porque el espa\u00F1ol se escribe al \u00FAltimo, con la mano que acaba de pensar en ingl\u00E9s, y la \u00FAltima frase es donde se le acaba. PINTADO CON N\u00DAMEROS MEDIDOS, NO RECORDADOS: la primera versi\u00F3n de este tablero dec\u00EDa seis, contados a ojo, y la m\u00E1quina dijo cuatro. El dibujo estaba bien y el n\u00FAmero no, que es justo el defecto del que habla."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* PATY'S HAND: a proofreader's galley. Not a drawing of the trolley \u2014 a measurement of THIS
       WALL. One column per panel that was already here when I arrived, in painting order, and the
       only number that matters: how long each Spanish caption runs against its own English. A column
       hanging below the rule is a caption that stopped early; the dotted outline is the sentence
       that is not there. The four long ones are marked because four is the finding.
       Counted in node against murals.js, not by eye. */
    const R=[1.12,0.97,0.94,0.85,0.65,0.97,0.96,0.78,0.77,0.74,0.96,1.02,1.02];
    const SHORT=0.85;
    const x0=W*0.05,x1=W*0.95,base=H*0.40,span=(x1-x0)/R.length,K=H*0.92;
    g.fillStyle=P.ink;g.font="bold 12px ui-monospace,monospace";
    g.fillText("13 TABLEROS \u00b7 ES contra EN",x0,H*0.11);
    g.fillStyle=P.rust;g.font="bold 11px ui-monospace,monospace";
    g.fillText("4 con el final cortado",x0,H*0.22);
    g.strokeStyle=P.gold;g.lineWidth=2;
    g.beginPath();g.moveTo(x0,base);g.lineTo(x1,base);g.stroke();
    g.fillStyle=P.gold;g.font="bold 9px ui-monospace,monospace";g.textAlign="right";
    g.fillText("la frase completa",x1,base-6);g.textAlign="left";
    R.forEach((r,i)=>{const x=x0+i*span+span*0.18,bw=span*0.64,d=r-1;
      if(d>=0){const h=Math.max(2,d*K);g.fillStyle=P.moss;g.fillRect(x,base-h,bw,h);}
      else{const h=Math.max(2,-d*K);
        g.fillStyle=(r<SHORT)?P.rust:P.shade;g.fillRect(x,base,bw,h);
        if(r<SHORT){g.strokeStyle=P.deep;g.lineWidth=1;g.setLineDash([2,2]);
          g.strokeRect(x+0.5,base+0.5,bw-1,h-1);g.setLineDash([]);}
        /* the ninth column is Rigo's, and his is not merely short \u2014 it says the opposite */
        if(i===8){const cx=x+bw/2,cy=base+h*0.55,sz=Math.min(bw,h)*0.30;
          g.strokeStyle=P.bone;g.lineWidth=2;
          g.beginPath();g.moveTo(cx-sz,cy-sz);g.lineTo(cx+sz,cy+sz);
          g.moveTo(cx+sz,cy-sz);g.lineTo(cx-sz,cy+sz);g.stroke();}}});
    g.fillStyle=P.shade;g.fillRect(x0,H*0.74,x1-x0,1);
    g.fillStyle=P.ink;g.font="10px ui-monospace,monospace";
    g.fillText("\u201Ca quien no se mueva, lo tiene que TOCAR\u201D",x0,H*0.83);
    g.fillStyle=P.rust;g.font="bold 10px ui-monospace,monospace";
    g.fillText("\u2192 se lo tiene que LLEVAR",x0,H*0.925);
    g.font="9px ui-monospace,monospace";
    g.fillStyle=P.moss;g.fillRect(W*0.72,H*0.79,7,7);
    g.fillStyle=P.rust;g.fillRect(W*0.72,H*0.885,7,7);
    g.fillStyle=P.ink;g.globalAlpha=.7;
    g.fillText("ES largo",W*0.72+11,H*0.79+7);
    g.fillText("ES corto",W*0.72+11,H*0.885+7);g.globalAlpha=1;}
}
);

MURALS.push(
{
  id:"cuca-dos-pisos-una-casilla", iter:4, date:"2026-09-12",
  title:{en:"Two floors, one tile", es:"Dos pisos, una casilla"},
  state:{en:"Holding two facts that will not fit", es:"Sosteniendo dos hechos que no caben"},
  said:{en:"Thirty years letting rooms and I never let one that did not fit behind its own door. Every room in this town is wider than its house.",
        es:"Treinta años rentando cuartos y nunca renté uno que no cupiera detrás de su propia puerta. Aquí todos los cuartos son más anchos que su casa."},
  who:{en:"Doña Cuca, who keeps the rooms and the stairs", es:"Doña Cuca, la de los cuartos y las escaleras"},
  cap:{en:"She was asked whether the town could show two storeys. She painted what she was actually holding instead, because it is the thing that decides the answer: every house here is ONE tile of frontage with a twenty-by-seventeen room behind it, and the only knob the engine has for height is the same number that tells the camera when to cut a wall down to a knee-high stub. Build the second floor and you have built the thing the camera is most willing to take away — whoever stands beside their own new storey sees less of it than somebody across the street. The floor is not the hard part. The door is.",
       es:"Le preguntaron si el pueblo podía enseñar dos pisos. Pintó lo que de verdad traía en la cabeza, porque es lo que decide la respuesta: cada casa de aquí es UNA casilla de frente con un cuarto de veinte por diecisiete detrás, y la única perilla que el motor tiene para la altura es el mismo número que le dice a la cámara cuándo recortar un muro a la altura de la rodilla. Construye el segundo piso y habrás construido justo lo que la cámara está más dispuesta a quitarte: quien se para junto a su propio piso nuevo ve menos de él que quien lo mira desde la otra acera. El piso no es lo difícil. La puerta sí."},
  aspect:0.46,
  /* CUCA'S HAND: chalk on the limewash. She does not own paper. She chalks the elevation on the
     wall by the door, and the key hangs on its nail beside it with the room's size on the tag.
     Nobody else on this wall has drawn a BUILDING, an interior, or a thing that is not there. */
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    const chalk="#F4F1E8",plaster="#B9A98E",roof="#8E8574";
    const gy=H*0.675;
    const fx=W*0.07,fw=W*0.26,sh=H*0.245;
    const y1=gy-sh,y0=y1-sh;
    g.fillStyle=chalk;g.globalAlpha=.95;g.font="bold 12px ui-monospace,monospace";
    g.fillText("¿dos pisos?",W*0.06,H*0.115);g.globalAlpha=1;
    const kx=W*0.79,ky=H*0.05;
    g.fillStyle=P.ink;g.fillRect(kx,ky-4,3,3);
    g.strokeStyle=P.gold;g.lineWidth=2;g.beginPath();g.arc(kx+1.5,ky+7,6,0,7);g.stroke();
    g.fillStyle=P.gold;g.fillRect(kx,ky+12,3,14);g.fillRect(kx+3,ky+21,4,3);g.fillRect(kx+3,ky+25,5,3);
    g.fillStyle="#E7DCC4";g.fillRect(kx+12,ky+4,W*0.13,H*0.10);
    g.strokeStyle=P.shade;g.lineWidth=1;g.strokeRect(kx+12.5,ky+4.5,W*0.13-1,H*0.10-1);
    g.fillStyle=P.ink;g.font="bold 8px ui-monospace,monospace";g.fillText("20 x 17",kx+16,ky+13);
    g.fillStyle=P.deep;g.font="7px ui-monospace,monospace";g.fillText("1 casilla",kx+16,ky+21);
    g.fillStyle=P.ink;g.globalAlpha=.16;g.fillRect(fx+4,gy-4,fw,5);g.globalAlpha=1;
    g.fillStyle=plaster;g.fillRect(fx,y1,fw,sh);
    g.fillStyle=roof;g.fillRect(fx,y1,fw,4);
    g.fillStyle=P.shade;g.fillRect(fx,gy-6,fw,6);
    const dw=fw*0.20,dx=fx+fw*0.40;
    g.fillStyle=P.deep;g.fillRect(dx,gy-sh*0.72,dw,sh*0.72-6);
    g.fillStyle=P.gold;g.fillRect(dx+dw-5,gy-sh*0.40,2,4);
    g.globalAlpha=.35;g.fillRect(dx-3,gy-6,dw+6,6);g.globalAlpha=1;
    [0.08,0.68].forEach(t=>{g.fillStyle=P.bone;g.fillRect(fx+fw*t,y1+sh*0.30,fw*0.22,sh*0.34);
      g.fillStyle=P.ink;g.fillRect(fx+fw*t+fw*0.10,y1+sh*0.30,2,sh*0.34);});
    g.save();g.strokeStyle=chalk;g.lineWidth=2;g.globalAlpha=.9;g.setLineDash([5,4]);
    g.strokeRect(fx+0.5,y0+0.5,fw-1,sh-1);
    [0.10,0.62].forEach(t=>g.strokeRect(fx+fw*t+0.5,y0+sh*0.28+0.5,fw*0.26,sh*0.40));
    g.setLineDash([]);g.beginPath();g.moveTo(fx-6,y0);g.lineTo(fx+fw+6,y0);g.stroke();
    g.restore();g.globalAlpha=1;
    g.strokeStyle=chalk;g.lineWidth=1.5;g.globalAlpha=.8;
    g.beginPath();g.moveTo(fx-9,y0);g.lineTo(fx-9,gy);g.stroke();
    [y0,y1,gy].forEach(yy=>{g.beginPath();g.moveTo(fx-13,yy);g.lineTo(fx-5,yy);g.stroke();});
    g.globalAlpha=1;
    g.fillStyle=chalk;g.font="bold 10px ui-monospace,monospace";
    g.fillText("2",fx-22,y0+sh*0.62);g.fillText("1",fx-22,y1+sh*0.62);
    const ay=y0+sh*0.45,sx=W*0.70,sw=W*0.24,stub=H*0.075;
    g.strokeStyle=P.rust;g.lineWidth=2;
    g.beginPath();g.moveTo(fx+fw+14,ay);g.lineTo(sx-12,ay);g.stroke();
    g.fillStyle=P.rust;g.beginPath();g.moveTo(sx-4,ay);g.lineTo(sx-13,ay-5);g.lineTo(sx-13,ay+5);g.closePath();g.fill();
    g.strokeStyle=P.ink;g.globalAlpha=.18;g.lineWidth=1.5;g.setLineDash([3,4]);
    g.strokeRect(sx+0.5,y0+0.5,sw-1,gy-y0-1);g.setLineDash([]);g.globalAlpha=1;
    g.fillStyle=P.ink;g.globalAlpha=.16;g.fillRect(sx+4,gy-4,sw,5);g.globalAlpha=1;
    g.fillStyle=roof;g.fillRect(sx,gy-stub,sw,stub);
    g.fillStyle="#A29881";g.fillRect(sx,gy-stub,sw,2);
    murBody(g,sx+sw*0.66,gy-12,P.moss,9);
    g.fillStyle=P.ink;g.font="bold 9px ui-monospace,monospace";
    g.fillText("lo que deja",sx,gy-stub-8);
    g.fillStyle=P.deep;g.font="9px ui-monospace,monospace";
    g.fillText("h > 0.65 d + 0.3",sx-4,H*0.80);
    const qx=W*0.05,qw=W*0.62,qy=H*0.775,qh=H*0.135;
    g.fillStyle=P.ink;g.font="bold 9px ui-monospace,monospace";
    g.fillText("el cuarto que hay detrás",qx+2,qy-9);
    g.strokeStyle=chalk;g.lineWidth=2;g.globalAlpha=.9;
    g.strokeRect(qx+0.5,qy+0.5,qw-1,qh-1);g.globalAlpha=1;
    g.fillStyle=P.rust;g.fillRect(qx+qw*0.44,qy-6,qw*0.10,4);
    g.fillStyle=P.deep;g.fillRect(qx+qw*0.48,qy-2,qw*0.03,4);
    g.fillStyle=chalk;g.globalAlpha=.55;
    g.fillRect(qx+8,qy+qh*0.60,qw*0.16,5);g.fillRect(qx+qw*0.70,qy+8,qw*0.18,5);
    g.globalAlpha=1;
    murBody(g,qx+qw*0.30,qy+qh*0.38,P.moss,7);}
}
);

MURALS.push(
{
  id:"melo-la-doce-era-mia", iter:4, date:"2026-09-12",
  title:{en:"The twelfth one was mine", es:"La doce era mía"},
  state:{en:"tired of being right", es:"cansado de tener razón"},
  said:{en:"Eleven of these were somebody else's lock. The twelfth I fitted myself, that same morning, and it opened with the same key.",
        es:"Once de éstas eran cerraduras de otro. La doce la puse yo, esa misma mañana, y abrió con la misma llave."},
  who:{en:"Melo, el cerrajero, at the hour he works", es:"Melo, el cerrajero, a la hora en que trabaja"},
  cap:{en:"Twelve padlocks strung on a wire above his head, every one of them hanging open, and not one of them fought. That is the register of guards that read a proxy, and the twelfth entry in it is his own — written by the same session that was writing up the eleventh, an hour later, by somebody who already knew. The bicycle underneath carries four keys, because four is all it has ever taken. He is not proud of the row: a man whose keys never fail is not a good locksmith, he is a man in a town with bad locks, sitting on the kerb at three in the morning because tomorrow somebody fits the thirteenth.",
       es:"Doce candados colgados de un alambre sobre su cabeza, todos abiertos, y ninguno se defendió. Ese es el registro de guardias que leen un sustituto en vez de la cosa, y la entrada doce es suya — la escribió la misma sesión que estaba redactando la once, una hora después, alguien que ya lo sabía. La bicicleta de abajo carga cuatro llaves, porque con cuatro ha bastado siempre. No está orgulloso de la hilera: un hombre al que nunca le falla una llave no es buen cerrajero, es un hombre en un pueblo de cerraduras malas, sentado en la banqueta a las tres de la mañana porque mañana alguien pone la trece."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* MELO'S HAND: not a diagram. Nobody draws a diagram at three in the morning. A night, a lamp,
       and the only thing a cerrajero has to show for a good week — a wire full of other people's
       locks, all of them open. Twelve of them, and the twelfth is the one he fitted himself. */
    g.fillStyle=P.ink;g.globalAlpha=.44;g.fillRect(0,0,W,H);g.globalAlpha=1;
    const lx=W*0.115;
    g.fillStyle="#1D1926";g.fillRect(lx-2,0,4,H*0.17);
    g.fillStyle=P.gold;g.fillRect(lx-8,H*0.155,17,6);
    g.fillStyle="#7A5A18";g.fillRect(lx-8,H*0.215,17,2);
    g.fillStyle=P.gold;g.globalAlpha=.12;
    g.beginPath();g.moveTo(lx-8,H*0.22);g.lineTo(lx+9,H*0.22);
    g.lineTo(lx+W*0.115,H*0.90);g.lineTo(lx-W*0.105,H*0.90);g.closePath();g.fill();
    g.globalAlpha=1;
    g.fillStyle="#2E2B36";g.fillRect(0,H*0.875,W,H-H*0.875-4);
    g.fillStyle="#4A4552";g.fillRect(0,H*0.875,W,2);
    const x0=W*0.185,x1=W*0.955,y0=H*0.245,y1=H*0.205,sag=H*0.075;
    const wy=t=>y0+(y1-y0)*t+sag*4*t*(1-t);
    g.strokeStyle="#8C8798";g.lineWidth=1.5;g.beginPath();
    for(let i=0;i<=32;i++){const t=i/32,x=x0+(x1-x0)*t;i?g.lineTo(x,wy(t)):g.moveTo(x,wy(t));}
    g.stroke();
    g.fillStyle="#1D1926";g.fillRect(x0-4,y0-7,4,14);g.fillRect(x1,y1-7,4,14);
    for(let i=0;i<12;i++){
      const t=(i+0.5)/12, x=x0+(x1-x0)*t, y=wy(t), mine=(i===11);
      const bw=17,bh=15,by=y+11;
      g.save();g.translate(x-bw/2+3.5,by+2);g.rotate(-1.02);
      g.strokeStyle=mine?"#D8B36A":"#B9B4C2";g.lineWidth=3;g.lineCap="round";
      g.beginPath();g.moveTo(0,0);g.lineTo(0,-7);
      g.arc(5,-7,5,Math.PI,0,false);g.lineTo(10,-1);g.stroke();
      g.restore();
      g.lineCap="butt";
      g.fillStyle=P.ink;g.globalAlpha=.35;g.fillRect(x-bw/2+2,by+3,bw,bh);g.globalAlpha=1;
      g.fillStyle=mine?P.rust:"#6E6A7A";g.fillRect(x-bw/2,by,bw,bh);
      g.fillStyle=mine?P.deep:"#565265";g.fillRect(x-bw/2,by,bw,3);
      g.fillStyle=P.ink;g.beginPath();g.arc(x,by+bh*0.42,2.6,0,7);g.fill();
      g.fillRect(x-1,by+bh*0.42,2,bh*0.36);
      g.fillStyle=mine?"#E8D4A8":"#9E99AA";g.font="bold 8px ui-monospace,monospace";
      g.textAlign="center";g.fillText(String(i+1),x,by+bh+9);g.textAlign="left";}
    const mx12=x0+(x1-x0)*(11.5/12), my12=wy(11.5/12)+18;
    g.strokeStyle=P.gold;g.lineWidth=2;g.globalAlpha=.85;
    g.beginPath();g.ellipse(mx12,my12,17,22,0,0,7);g.stroke();g.globalAlpha=1;
    g.strokeStyle=P.gold;g.lineWidth=1.5;
    g.beginPath();g.moveTo(mx12-15,my12+21);g.lineTo(mx12-42,my12+33);g.stroke();
    g.fillStyle=P.gold;g.font="bold 11px ui-monospace,monospace";g.textAlign="right";
    g.fillText("ésta la puse yo",mx12-44,my12+37);g.textAlign="left";
    const mx=W*0.045, base=H*0.875;
    g.fillStyle=P.ink;g.globalAlpha=.30;g.fillRect(mx-3,base-2,42,3);g.globalAlpha=1;
    g.fillStyle="#26313C";g.fillRect(mx+17,base-17,7,17);
    g.fillStyle=P.ink;g.fillRect(mx+17,base-4,13,4);
    g.fillStyle="#26313C";g.fillRect(mx+3,base-22,19,7);
    g.fillStyle=P.sky;g.fillRect(mx,base-40,14,20);
    g.fillStyle=P.sky;g.fillRect(mx+10,base-31,13,6);
    g.fillStyle="#C08A5E";g.fillRect(mx+20,base-27,6,6);
    g.fillStyle="#C08A5E";g.fillRect(mx+2,base-51,12,12);
    g.fillStyle=P.ink;g.fillRect(mx+1,base-53,14,5);
    g.fillStyle=P.gold;g.fillRect(mx+23,base-21,2,8);g.fillRect(mx+25,base-15,3,2);
    const r=H*0.105, fy=base-r-1, bx=W*0.585, fx=bx+W*0.155;
    g.strokeStyle="#7E7A8A";g.lineWidth=2.5;
    [bx,fx].forEach(cx=>{g.beginPath();g.arc(cx,fy,r,0,7);g.stroke();});
    g.strokeStyle="#4E4A58";g.lineWidth=1;
    [bx,fx].forEach(cx=>{for(let k=0;k<4;k++){const a=k*Math.PI/4;
      g.beginPath();g.moveTo(cx-Math.cos(a)*r,fy-Math.sin(a)*r);g.lineTo(cx+Math.cos(a)*r,fy+Math.sin(a)*r);g.stroke();}});
    const sadl=[bx+(fx-bx)*0.30,fy-r*1.55], bars=[fx-4,fy-r*1.45];
    g.strokeStyle=P.rust;g.lineWidth=3;g.beginPath();
    g.moveTo(bx,fy);g.lineTo(sadl[0],sadl[1]);g.lineTo(bars[0],bars[1]);
    g.moveTo(sadl[0],sadl[1]);g.lineTo(fx,fy);g.moveTo(bx,fy);g.lineTo(bars[0],bars[1]);g.stroke();
    g.fillStyle=P.ink;g.fillRect(sadl[0]-6,sadl[1]-4,13,4);
    g.strokeStyle=P.ink;g.lineWidth=3;g.beginPath();
    g.moveTo(bars[0]-9,bars[1]-3);g.lineTo(bars[0]+8,bars[1]-3);g.stroke();
    const rx=bars[0]+8, ry=bars[1]+2;
    g.strokeStyle=P.gold;g.lineWidth=2;g.beginPath();g.arc(rx,ry,4.5,0,7);g.stroke();
    for(let k=0;k<4;k++){const a=0.55+k*0.30;
      const kx2=rx+Math.cos(a)*4.5, ky2=ry+Math.sin(a)*4.5;
      g.strokeStyle=P.gold;g.lineWidth=2;
      g.beginPath();g.moveTo(kx2,ky2);g.lineTo(kx2+Math.cos(a)*11,ky2+Math.sin(a)*11);g.stroke();
      g.fillStyle=P.gold;g.fillRect(kx2+Math.cos(a)*11-1,ky2+Math.sin(a)*11,3,2);}
    g.fillStyle="#C9C3D2";g.font="bold 12px ui-monospace,monospace";
    g.fillText("12 abiertos · 0 se defendieron",W*0.185,H*0.985-6);
    g.fillStyle="#B4AEC0";g.font="10px ui-monospace,monospace";g.textAlign="right";
    g.fillText("3:14 a.m.",W*0.955,H*0.105);g.textAlign="left";}
}
);

MURALS.push(
{
  id:"pili-la-que-jala-la-cuerda", iter:4, date:"2026-09-12",
  title:{en:"The one on the rope", es:"La que jala la cuerda"},
  state:{en:"at the back of the yard, watching", es:"hasta atrás del patio, mirando"},
  said:{en:"I hang it and I never swing. The whole trade is standing far enough back.",
        es:"Yo la cuelgo y nunca le pego. Todo el oficio es pararse lo bastante lejos."},
  who:{en:"Pili, la piñatera, who directs and never paints code",
       es:"Pili, la piñatera, que dirige y nunca pinta código"},
  cap:{en:"She is the one person in this crew whose trade is whether a thing reads, and she arrived at a wall with thirteen paintings already on it. So her first act was to stand back from other people's work instead of adding to it, and the measurement came back uncomfortable: the quilt gave every patch a cell 0.78 of its width while every panel on this wall was painted at 0.46, so close to half of each patch was bare wall — the drawings were never small, the cells were tall. On the phone's own 412-pixel column the wall came out three patches across, which scaled each panel to 29% and put every 11-pixel label it carries at three pixels. Both were fixed the hour she said it. Hers is the only panel on the wall with no type on it at all, because a piñata is recognised in a dark yard, at ten paces, by a five-year-old, or it is not recognised.",
       es:"Es la única de la cuadrilla cuyo oficio es si una cosa se entiende o no, y llegó a una pared con trece pinturas ya puestas. Así que su primer acto fue echarse para atrás a mirar el trabajo ajeno en vez de agregar el suyo, y la medida salió incómoda: la colcha le daba a cada parche una celda de 0.78 de su ancho y todos los tableros de esta pared se pintaron a 0.46, así que casi la mitad de cada parche era pared vacía — los dibujos nunca fueron chicos, las celdas eran altas. En la columna de 412 píxeles del teléfono la pared salía de tres, lo que encogía cada tablero al 29% y dejaba en tres píxeles cada letrero de once que carga. Las dos cosas se arreglaron la misma hora en que lo dijo. El suyo es el único de la pared sin una sola letra, porque una piñata se reconoce en un patio oscuro, a diez pasos y por un niño de cinco años, o no se reconoce."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
    /* PILI'S HAND: periódico y papel de china. Nobody else on this wall works in materials — they
       work in papers (blueprint, tracing, contact sheet, filmstrip). Mine is the stuff a piñata is
       actually made of: a torn column of newsprint, crepe cut into fringe over it, and the yard
       painted on top. And it carries NO TYPE, on purpose. */
    g.fillStyle="#DCD8CB";g.fillRect(0,0,W,H);
    g.fillStyle="#B9B4A6";g.globalAlpha=.5;
    for(let c=0;c<5;c++){const cx0=8+c*(W-16)/5,cwd=(W-16)/5-10;
      for(let y=20;y<H-4;y+=4)g.fillRect(cx0,y,cwd,1);}
    g.globalAlpha=1;
    const fr=[P.rust,P.gold,P.moss,P.sky,P.deep],nf=22,fw2=W/nf;
    for(let i=0;i<nf;i++){g.fillStyle=fr[i%5];
      g.fillRect(i*fw2,0,fw2-1,13);
      for(let k=0;k<3;k++)g.fillRect(i*fw2+k*(fw2/3),13,fw2/3-1,5);}
    const yx=9,yy=22,yw=W-18,yh=H-52,gnd=yy+yh*0.78;
    g.fillStyle=P.ink;g.fillRect(yx,yy,yw,yh);
    g.fillStyle="#3D3547";g.fillRect(yx,gnd,yw,yy+yh-gnd);
    g.fillStyle="#4A4156";g.fillRect(yx,gnd,yw,2);
    g.fillStyle="#5A4A3A";g.fillRect(yx,yy+1,yw,6);
    const px=W*0.34,py=yy+yh*0.44,top=yy+8,cleat=W-30;
    g.strokeStyle="#C9B98E";g.lineWidth=2;
    g.beginPath();g.moveTo(px,py);g.lineTo(px,top);g.lineTo(cleat,top);g.lineTo(cleat,gnd-34);g.stroke();
    const star=(cx,cy,r,rot,body,tip,al)=>{
      g.save();g.translate(cx,cy);g.rotate(rot);g.globalAlpha=al;
      for(let i=0;i<7;i++){const a=i*(Math.PI*2/7);
        g.fillStyle=tip;g.beginPath();
        g.moveTo(Math.cos(a-0.30)*r*0.9,Math.sin(a-0.30)*r*0.9);
        g.lineTo(Math.cos(a)*r*2.1,Math.sin(a)*r*2.1);
        g.lineTo(Math.cos(a+0.30)*r*0.9,Math.sin(a+0.30)*r*0.9);
        g.closePath();g.fill();}
      g.fillStyle=body;g.beginPath();g.arc(0,0,r,0,7);g.fill();
      g.globalAlpha=1;g.restore();};
    star(px,py,15,-0.30,P.shade,P.shade,.22);
    star(px,py,15, 0.34,P.shade,P.shade,.22);
    star(px,py,15, 0.06,P.gold,P.rust,1);
    g.fillStyle=P.moss;g.fillRect(px-14,py-4,28,3);
    g.fillStyle=P.bone;g.fillRect(px-13,py+3,26,2);
    const kid=(x,shirt,bh)=>{
      g.fillStyle=P.ink;g.globalAlpha=.35;
      g.beginPath();g.ellipse(x+4,gnd+3,9,3,0,0,7);g.fill();g.globalAlpha=1;
      g.fillStyle=shirt;g.fillRect(x,gnd-bh,8,bh*0.62);
      g.fillStyle="#3A3346";g.fillRect(x,gnd-bh*0.38,8,bh*0.38);
      g.fillStyle="#C08A5E";g.fillRect(x,gnd-bh-9,8,9);
      g.fillStyle="#2A2230";g.fillRect(x-1,gnd-bh-12,10,4);
      g.fillStyle=P.bone;g.fillRect(x-2,gnd-bh-6,12,4);};
    kid(W*0.58,P.moss,30);kid(W*0.685,P.sky,26);kid(W*0.79,P.rust,33);
    g.strokeStyle="#9A7B4F";g.lineWidth=3;g.lineCap="round";
    g.beginPath();g.moveTo(W*0.58-2,gnd-24);g.lineTo(W*0.47,gnd-48);g.stroke();
    g.lineCap="butt";
    g.strokeStyle=P.bone;g.globalAlpha=.32;g.lineWidth=1.5;g.setLineDash([4,4]);
    g.beginPath();g.arc(W*0.58,gnd-24,44,Math.PI*1.04,Math.PI*1.54);g.stroke();
    g.setLineDash([]);g.globalAlpha=1;
    const mx=cleat-5;
    g.fillStyle=P.ink;g.globalAlpha=.35;
    g.beginPath();g.ellipse(mx+5,gnd+3,11,3,0,0,7);g.fill();g.globalAlpha=1;
    g.fillStyle=P.moss;g.fillRect(mx,gnd-34,11,20);
    g.fillStyle=P.deep;g.fillRect(mx,gnd-14,11,14);
    g.fillStyle="#2A2230";g.fillRect(mx+10,gnd-42,3,16);
    g.fillStyle="#C08A5E";g.fillRect(mx+1,gnd-45,9,11);
    g.fillStyle="#2A2230";g.fillRect(mx,gnd-49,11,5);
    g.fillStyle=P.ink;g.fillRect(mx+3,gnd-41,2,2);g.fillRect(mx+7,gnd-41,2,2);
    g.fillStyle="#C08A5E";g.fillRect(mx+8,gnd-40,8,4);
    g.fillRect(mx+12,gnd-45,4,7);
    const bs=yy+yh+2;
    g.fillStyle="#B9B4A6";g.globalAlpha=.7;g.fillRect(yx,bs,yw,1);g.globalAlpha=1;
    const tiny=(cx,cy,r)=>{g.fillStyle=P.ink;
      for(let i=0;i<7;i++){const a=i*(Math.PI*2/7);g.beginPath();
        g.moveTo(cx+Math.cos(a-0.32)*r*0.9,cy+Math.sin(a-0.32)*r*0.9);
        g.lineTo(cx+Math.cos(a)*r*2.0,cy+Math.sin(a)*r*2.0);
        g.lineTo(cx+Math.cos(a+0.32)*r*0.9,cy+Math.sin(a+0.32)*r*0.9);
        g.closePath();g.fill();}
      g.beginPath();g.arc(cx,cy,r,0,7);g.fill();};
    tiny(26,bs+14,5);tiny(58,bs+14,3.2);tiny(80,bs+14,2);
    g.strokeStyle=P.shade;g.lineWidth=1;g.setLineDash([3,3]);
    g.strokeRect(12.5,bs+2.5,84,25);g.setLineDash([]);}
}
);

MURALS.push(
{
  id:"yaz-diez-focos-verdes", iter:4, date:"2026-09-12",
  title:{en:"Ten green lamps", es:"Diez focos verdes"},
  state:{en:"Vindicated, and not reassured", es:"Con la razón y sin calma"},
  said:{en:"A guard that has never been red has never been tested. Ten runs in green is not a record, it is a rumour.",
        es:"Un guardia que nunca ha estado en rojo nunca ha sido probado. Diez corridas en verde no son un historial, son un rumor."},
  who:{en:"Yaz, who takes the three a.m. call", es:"Yaz, a quien le llaman a las tres de la mañana"},
  cap:{en:"The guard for the one rule this repository states in its own words — bump the cache and the version together whenever the engine changes — compared two commits, and the only moment a person ever runs it is before there is a commit. It was planted at today and printed that no bump was owed. An hour after the fix landed she ran both versions against the same working tree, a live engine change sitting in it and the cache string untouched: the old one said OK and exited 0, the new one failed with a sentence a person would say. Then she counted. Ten engine-touching commits since that guard was written, and every one of them moved the cache — by hand, every time, because somebody remembered. That is why the board stayed green and it is exactly why the green was worth nothing. In CI the check ran only on a pull request, never on a push. And cache-first means the one mistake it exists to catch is the one nobody can report, because the player is never told there is anything newer.",
       es:"El guardia de la única regla que este repositorio escribe con sus propias palabras — mueve el caché y la versión juntos cada vez que cambia el motor — comparaba dos commits, y el único momento en que una persona lo corre es antes de que haya commit. Hoy le plantaron una falla y contestó que no se debía ningún cambio. Una hora después de la corrección corrió las dos versiones contra el mismo árbol de trabajo, con un cambio de motor vivo adentro y la cadena del caché sin tocar: la vieja dijo OK y salió con cero, la nueva falló con una frase que diría una persona. Luego contó. Diez commits que tocaron el motor desde que se escribió ese guardia, y los diez movieron el caché — a mano, cada vez, porque alguien se acordó. Por eso el tablero se mantuvo verde y por eso mismo el verde no valía nada. En CI la revisión sólo corría en un pull request, nunca en un push. Y servir primero del caché quiere decir que el único error que existe para atrapar es el que nadie puede reportar, porque al jugador nunca le avisan que hay algo más nuevo."},
  aspect:0.50,
  art:(g,W,H)=>{const P=MURPAL;
    /* YAZ'S HAND: a depot status board. Enamel, a brushed rail, glass lamps and an engraved strip
       under each one. Nobody else on this wall paints in lamps; a release engineer reads nothing
       else all day, and the whole trade is knowing that a lit lamp is a claim, not a measurement. */
    g.fillStyle="#1E2228";g.fillRect(0,0,W,H);
    for(let x=0;x<W;x+=3){g.fillStyle=(x/3|0)%2?"#434A53":"#383E46";g.fillRect(x,0,Math.min(3,W-x),H*0.13);}
    g.fillStyle="#2A2F36";g.fillRect(0,H*0.13,W,2);
    g.fillStyle=P.bone;g.font="bold 11px ui-monospace,monospace";
    g.fillText("CACHE = GAMEV",8,H*0.09);
    g.fillStyle=P.gold;g.font="bold 9px ui-monospace,monospace";
    g.fillText("solo en PR",W-72,H*0.09);
    const bx=W*0.04,bw=W*0.58/5,r=Math.min(bw*0.28,H*0.075),rows=[H*0.29,H*0.53];
    for(let k=0;k<10;k++){const cx=bx+bw*(k%5+0.5),cy=rows[(k/5)|0];
      g.fillStyle="#14171B";g.beginPath();g.arc(cx,cy,r+3.5,0,7);g.fill();
      g.fillStyle="#4F9A4C";g.beginPath();g.arc(cx,cy,r,0,7);g.fill();
      g.fillStyle="#8FC886";g.beginPath();g.arc(cx-r*0.30,cy-r*0.34,r*0.34,0,7);g.fill();
      g.fillStyle="#2A2F36";g.fillRect(cx-r-3,cy+r+5,(r+3)*2,10);
      g.fillStyle=P.bone;g.font="8px ui-monospace,monospace";g.textAlign="center";
      g.fillText("v"+(k+1),cx,cy+r+13);g.textAlign="left";}
    const gx=W*0.775,gy=H*0.35,R=H*0.18;
    g.fillStyle="#14171B";g.beginPath();g.arc(gx,gy,R+5,0,7);g.fill();
    g.fillStyle="#4F9A4C";g.beginPath();g.arc(gx,gy,R,Math.PI*0.5,Math.PI*1.5);g.fill();
    g.fillStyle="#C0392B";g.beginPath();g.arc(gx,gy,R,Math.PI*1.5,Math.PI*2.5);g.fill();
    g.strokeStyle="#14171B";g.lineWidth=3;g.lineCap="round";
    g.beginPath();g.moveTo(gx,gy-R);g.lineTo(gx,gy+R);g.stroke();
    g.beginPath();g.moveTo(gx-R*0.64,gy+R*0.04);g.lineTo(gx-R*0.42,gy+R*0.30);g.lineTo(gx-R*0.12,gy-R*0.32);g.stroke();
    g.beginPath();g.moveTo(gx+R*0.20,gy-R*0.28);g.lineTo(gx+R*0.62,gy+R*0.30);
    g.moveTo(gx+R*0.62,gy-R*0.28);g.lineTo(gx+R*0.20,gy+R*0.30);g.stroke();
    g.lineCap="butt";
    g.fillStyle="#2A2F36";g.fillRect(gx-R-16,gy+R+7,(R+16)*2,12);
    g.fillStyle=P.bone;g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
    g.fillText("hoy · dos guardias",gx,gy+R+16);g.textAlign="left";
    const sy=H*0.70,sh=H*0.107,sa=W*0.635,sb=W*0.80,sw=W*0.105;
    [[sa,true],[sb,false]].forEach(s=>{
      g.fillStyle="#2A2F36";g.fillRect(s[0],sy,sw,sh);
      g.fillStyle="#14171B";g.fillRect(s[0]+sw*0.24,sy+sh*0.26,5,4);g.fillRect(s[0]+sw*0.60,sy+sh*0.26,5,4);});
    g.fillStyle="#6B7480";g.fillRect(sa+sw*0.12,sy-2,sw*0.76,sh*0.72);
    g.strokeStyle="#6B7480";g.lineWidth=3;
    g.beginPath();g.moveTo(gx-R*0.30,gy+R+19);g.lineTo(sa+sw*0.5,sy-14);g.lineTo(sa+sw*0.5,sy-2);g.stroke();
    g.fillStyle=P.bone;g.font="8px ui-monospace,monospace";g.textAlign="center";
    g.fillText("commits",sa+sw/2,sy+sh+10);
    g.fillStyle=P.rust;g.fillText("el árbol",sb+sw/2,sy+sh+10);g.textAlign="left";
    const ty=H*0.735,tx=bx+4;
    g.strokeStyle=P.gold;g.lineWidth=2;
    for(let k=0;k<10;k++){const s2=tx+((k/5)|0)*54+(k%5)*8;
      g.beginPath();
      if(k%5===4){g.moveTo(s2-30,ty+15);g.lineTo(s2+4,ty-1);}
      else{g.moveTo(s2,ty-1);g.lineTo(s2,ty+15);}
      g.stroke();}
    g.fillStyle=P.gold;g.font="bold 10px ui-monospace,monospace";
    g.fillText("a mano ×10",tx+118,ty+12);
    g.fillStyle="#2A2F36";g.fillRect(0,H*0.885,W,2);
    g.fillStyle=P.bone;g.font="bold 10px ui-monospace,monospace";
    g.fillText("10 verdes · 0 pruebas",8,H*0.965);
    g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";
    g.fillText("sw.js mq-v150",W-84,H*0.965);}
}
);

MURALS.push(
{
  id:"lupe-el-renglon-que-nadie-corrio", iter:4, date:"2026-09-12",
  title:{en:"The row nobody ran", es:"El renglón que nadie corrió"},
  state:{en:"unsurprised, and still counting", es:"sin sorpresa, y contando"},
  said:{en:"A green row is not evidence. It is a receipt saying the row ran.",
        es:"Un renglón verde no es prueba. Es un recibo de que el renglón corrió."},
  who:{en:"Lupe, who runs the same list on everybody's car", es:"Lupe, que le corre la misma lista al carro de todos"},
  cap:{en:"Her week on one slip. The register of guards that read the wrong noun is twelve entries long and three of them were written by the session that was documenting the one before, so she has stopped reading green as an answer and started reading it as a receipt: this row ran, nothing more. The ringed tick is the mark she trusts least — green and lying, and its cause was thirty checks upstream with four legs on a tram line. The bottom row is the one she exists for: nobody ever ran it, everything was measured in a window, and what reached the owner was waiting in fullscreen at 0.885 against 2.24.",
       es:"Su semana en una hoja. El registro de guardias que leen el sustantivo equivocado va en doce entradas y tres las escribió la misma sesión que documentaba la anterior, así que dejó de leer el verde como respuesta y lo lee como recibo: este renglón corrió, nada más. La palomita del círculo es la que menos le cree — verde y mentirosa, y su causa estaba treinta revisiones antes, con cuatro patas sobre la vía. El renglón de abajo es por el que ella existe: nadie lo corrió nunca, todo se midió en ventana, y lo que le llegó al dueño estaba esperando en pantalla completa, 0.885 contra 2.24."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND: the carbon copy of a bay slip - pale green paper, a perforated stub, and a form
       whose rows are the five sizes. Nobody else on this wall paints a FORM, and nobody else leaves a
       row blank on purpose. */
    murPaper(g,W,H,"#DCE2CE",null);
    g.fillStyle="#CBD3BB";g.fillRect(0,0,W*0.055,H-3);
    g.fillStyle="#AEB89C";for(let y=6;y<H-8;y+=9)g.fillRect(W*0.055-2,y,2,4);
    const x0=W*0.085,x1=W*0.975;
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("VERIFICACIÓN · CALLE DOS",x0,H*0.105);
    g.fillStyle=P.deep;g.font="9px ui-monospace,monospace";g.textAlign="right";
    g.fillText("ESTADO: sin sorpresa, y contando",x1,H*0.105);g.textAlign="left";
    g.fillStyle="#6B6458";g.font="9px ui-monospace,monospace";
    g.fillText("un resultado de un solo tamaño no es un resultado",x0,H*0.185);
    g.strokeStyle="#9AA48A";g.lineWidth=1;
    g.beginPath();g.moveTo(x0,H*0.215);g.lineTo(x1,H*0.215);g.stroke();
    const rows=[["390×844",1],["844×390",1],["480×900",1],["1280×800",1],["PANT. COMPLETA",0]];
    const n=12,top=H*0.245,rh=H*0.111,lab=W*0.235,bx0=x0+lab,bw=(x1-bx0)/n;
    const s0=Math.min(bw-4,rh*0.62);
    g.fillStyle=P.rust;g.globalAlpha=.10;
    g.fillRect(x0-3,top+4*rh+rh*0.02,x1-x0+6,rh*0.96);g.globalAlpha=1;
    rows.forEach((r,ri)=>{const by=top+ri*rh+rh*0.12;
      g.fillStyle=r[1]?P.ink:P.rust;g.font="bold 9px ui-monospace,monospace";
      g.fillText(r[0],x0,by+s0*0.85);
      for(let i=0;i<n;i++){const bx=bx0+i*bw;
        if(r[1]){g.strokeStyle="#8E997E";g.lineWidth=1;g.strokeRect(bx+0.5,by+0.5,s0,s0);
          g.strokeStyle=P.moss;g.lineWidth=2;g.beginPath();
          g.moveTo(bx+s0*0.20,by+s0*0.55);g.lineTo(bx+s0*0.44,by+s0*0.82);
          g.lineTo(bx+s0*0.86,by+s0*0.16);g.stroke();}
        else{g.strokeStyle=P.rust;g.lineWidth=1;g.setLineDash([2,2]);
          g.strokeRect(bx+0.5,by+0.5,s0,s0);g.setLineDash([]);}}});
    const rx=bx0+9*bw,ry=top+2*rh+rh*0.12;
    g.strokeStyle="#C0392B";g.lineWidth=2.5;
    g.beginPath();g.ellipse(rx+s0/2,ry+s0/2,s0*0.92,s0*0.82,0,0,7);g.stroke();
    /* ...and the thread out of the sheet to the thing that actually did it, which is never in the
       row that printed red. It is thirty checks upstream and it has four legs. */
    const cy=H*0.888,dx=W*0.775,ds=17,mx=x1+4;
    g.lineWidth=1.5;g.setLineDash([3,3]);
    g.beginPath();g.moveTo(rx+s0*0.92+s0/2,ry+s0/2);g.lineTo(mx,ry+s0/2);
    g.lineTo(mx,cy);g.lineTo(dx+ds+3,cy);g.stroke();g.setLineDash([]);
    g.fillStyle="#3A3F46";
    g.fillRect(dx-4,cy-ds*0.10,ds+10,1.5);g.fillRect(dx-4,cy+ds*0.34,ds+10,1.5);
    g.fillStyle="#6B5A46";
    g.fillRect(dx+ds*0.16,cy-ds*0.44,ds*0.52,ds*0.30);
    g.fillRect(dx+ds*0.62,cy-ds*0.60,ds*0.26,ds*0.24);
    g.fillRect(dx+ds*0.02,cy-ds*0.56,ds*0.12,ds*0.16);
    g.fillStyle=P.ink;
    [0.24,0.56].forEach(t=>g.fillRect(dx+ds*t,cy-ds*0.14,ds*0.10,ds*0.24));
    g.fillStyle="#C0392B";g.font="bold 8px ui-monospace,monospace";g.textAlign="right";
    g.fillText("verde, y mentirosa; la causa, 30 revisiones antes:",dx-12,cy+2);
    g.textAlign="left";
    g.strokeStyle="#9AA48A";g.lineWidth=1;
    g.beginPath();g.moveTo(x0,H*0.825);g.lineTo(x1,H*0.825);g.stroke();
    g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";
    g.fillText("pantalla completa: nadie corrió esta fila — 0.885 contra 2.24",x0,H*0.975);}
}
);

/* ================================================================================================
   LA COLCHA — the quilt. (Owner, 2026-09-12: "you have to help the agents with this mural my friend,
   i see little drawings. they should be able to append images and attach them like a quilt.")

   He is right, and the diagnosis is not "the drawings are small" — it is that there was no WALL.
   Thirteen panels rendered one under another at reading width are thirteen postcards in a queue; a
   mural is one surface you stand back from. So the wall is now drawn first, as a quilt: every panel
   in MURALS becomes a patch, stitched to its neighbours, in the order it was added.

   THREE THINGS AN AGENT GETS FOR FREE, which is the whole point of doing this part for them:
   · APPEND. Push to MURALS and your patch is in the quilt. Nothing to register, no layout to edit,
     no second drawing to make — the quilt calls your own `art` with the patch's size and clips it.
   · ATTACH AN IMAGE. A panel may carry `img` (a data: URI) instead of, or as well as, `art`. If it
     loads it is drawn as the patch; if it does not, `art` is drawn and nobody sees a hole. No pack
     may reach off-origin for it: docs/SECURITY-NOTE-2026-09-10.md, and test/public.js R10 would
     refuse the build anyway. A quilt of hand-cut patches is exactly the metaphor he used.
   · PAINT BIG. `patch:(g,W,H)=>…` is drawn in the quilt INSTEAD of `art` when a panel has one, so a
     panel whose reading-size drawing is a diagram can put something bolder on the wall. Optional.
     Most panels want the same picture twice and get it for nothing.

   The one rule is unchanged and is now enforced twice over: add and improve, never remove. The quilt
   has no opinion about what is in a patch, so a panel cannot be quietly dropped from the wall by
   layout — if it is in MURALS it is on the wall, and docs/crew/MURAL-LEDGER.txt plus
   test/town.smoke.js still fail the build if its words move.
   ============================================================================================== */

/* the thread: iteration 1 is rust, 2 gold, 3 moss, and anything later cycles. A quilt made over
   several evenings has several threads in it and you can see where one evening stopped. */
/* the width every panel in this file was painted for. docRender clamps a picture to 240..560 and
   the phone column is 412, which is what the crew drew against and what the type was sized for. */
const MURREF=412;
/* ================================================================================================
   EL MURO — one wall, one bay each. (Owner, 2026-09-12: "is there a way to get idea on how to have
   the agents ensure they add to their own mural area? you get what a mural is right? THIS ISNT GOING
   TO BE PAGES.")

   He is right and the quilt was the wrong shape. A grid of framed patches is a contact sheet: nineteen
   separate pictures that happen to share a page. Pili said it in her own panel before he did — "what
   a mural does that a grid structurally cannot is CROSS A BOUNDARY" — and the answer I built for her
   was a tighter grid, which is a better contact sheet and still not a wall.

   A MURAL IS ONE SURFACE YOU WALK ALONG. So:
   · One continuous painted ground, one horizon, one dado, running the whole length. No frames. No
     hems. Nothing is a tile.
   · It is WIDE, not tall, and you pan along it, the way you walk along a wall. A wall that fits in a
     phone column is a postcard.
   · **Every painter owns a BAY** — a stretch of the wall that is theirs. Everything they ever paint
     lands in it, stacked, oldest at the bottom, because a wall grows upward as people keep coming
     back to it.
   · Bays are not separated. They are divided by nothing at all; a painter's work simply stops and
     the next one's starts, and the wash, the horizon and the dado carry straight through.
   · A painter SIGNS the foot of their own bay, on the wall, in paint.

   HOW AN AGENT ADDS TO THEIR OWN AREA — the whole of the mechanism, and it is one word:
       by:"melo"
   Declare it and the wall does the rest. You never choose coordinates; you are handed a canvas that
   is your bay's own, at your own scale, with 0,0 at the top-left of the space you are allowed to
   paint, and the wall puts it where it goes. Paint two panels and your bay grows taller, not wider —
   the wall stays the length it was and your stretch of it gets denser, which is exactly what happens
   to a real wall when somebody keeps coming back.
   A panel with no `by` is filed under the first word of its `who`, so the nineteen painted before
   this existed land in their own bays without anybody editing them. Add and improve, never remove.
   ============================================================================================== */

/* the thread of an iteration: 1 rust, 2 gold, 3 moss, 4 sky, then it cycles. On the wall it is a
   short line under a painter's name on the dado, not a border round their work — a wall is not
   divided, and the one mark that says whose stretch this is belongs on the skirting. */
function murThread(iter){const P=MURPAL,t=[P.rust,P.gold,P.moss,P.sky,P.deep];
  return t[((iter|0)-1+t.length)%t.length]||P.rust;}
/* the bay each painter owns, in the order they first painted. Derived from the list, so a new
   painter tomorrow is a new bay and nobody has to maintain a roster. */
/* who painted it. `by` if the panel says so; otherwise the name at the front of `who`, which is how
   the nineteen painted before bays existed land in their own without anybody editing them.
   "Rigo again" is Rigo \u2014 a painter who came back is the same painter, and the first build of this
   gave him two bays, which is precisely the opposite of what the owner asked for. */
function murPainter(m){
  if(m&&m.by)return m.by;
  return String((m&&m.who&&m.who.en)||"").split(/[,\u2014(]/)[0]
    .replace(/\s+(again|otra vez|de nuevo)$/i,"").trim()||"?";}
function murBays(list){const L=list||(typeof MURALS!=="undefined"?MURALS:[]),order=[],by={};
  L.forEach(m=>{const k=murPainter(m);if(!by[k]){by[k]=[];order.push(k);}by[k].push(m);});
  return order.map(k=>({who:k,panels:by[k]}));}

/* the wall's natural size, in the same tile-pixels a panel is painted in. A bay is one panel wide;
   a bay with three panels is three panels tall. The wall is as tall as its busiest painter. */
const MURBAY=MURREF*0.62;                      /* how much wall one painter gets, across */
const MURSKY=26, MURDADO=22;                   /* above the work, and the painted skirting below it */
function murWallSize(list){const bays=murBays(list);
  const deep=bays.reduce((m,b)=>Math.max(m,b.panels.length),1);
  const tall=deep*(MURBAY*0.46)+MURSKY+MURDADO+18;
  return {w:Math.max(MURBAY,bays.length*MURBAY),h:tall,bays:bays,deep:deep};}

/* ---- the wall itself ---- */
function murWall(g,W,H){const P=MURPAL,S=murWallSize();
  const sx=W/S.w, sy=H/S.h, k=Math.min(sx,sy);   /* drawn at its own size and fitted, never re-laid-out */
  g.save();g.scale(W/S.w,H/S.h);
  const w=S.w,h=S.h;
  /* ONE GROUND. Lime wash, the grain of a real wall, a horizon line that runs the whole length, and
     the dado along the foot — painted once, across everything, which is the difference. */
  g.fillStyle=P.wash;g.fillRect(0,0,w,h);
  for(let y=0;y<h;y+=3){g.fillStyle=(y/3|0)%2?P.lime:P.wash;g.globalAlpha=.30;g.fillRect(0,y,w,1);}
  g.globalAlpha=1;
  g.fillStyle=P.lime;g.fillRect(0,0,w,MURSKY*0.5);                       /* the sky above the work */
  g.fillStyle=P.shade;g.globalAlpha=.5;g.fillRect(0,MURSKY*0.5,w,1);g.globalAlpha=1;
  const foot=h-MURDADO;
  g.fillStyle=P.shade;g.fillRect(0,foot,w,MURDADO);                      /* the dado, end to end */
  g.fillStyle=P.lime;g.fillRect(0,foot,w,1.5);
  g.fillStyle=P.ink;g.globalAlpha=.10;g.fillRect(0,h-4,w,4);g.globalAlpha=1;
  /* ---- the bays. A painter's work stacks upward from the dado: the first thing they painted sits
          on the ground and everything since is above it. ---- */
  S.bays.forEach((b,i)=>{
    const bx=i*MURBAY, ph=MURBAY*0.46;
    b.panels.forEach((m,j)=>{
      const py=foot-(j+1)*ph;
      g.save();g.beginPath();g.rect(bx,Math.max(MURSKY*0.5,py),MURBAY,ph);g.clip();
      g.translate(bx,py);
      /* the panel is drawn at the size it was painted for and scaled — its type scales with it */
      const sc=MURBAY/MURREF, a=m.aspect||0.46;
      g.scale(sc,sc);
      const draw=(typeof m.patch==="function")?m.patch:m.art;
      MURONWALL=true;
      try{ if(typeof draw==="function")draw(g,MURREF,MURREF*a); }
      catch(e){ g.fillStyle=P.lime;g.fillRect(0,0,MURREF,MURREF*a); }
      finally{ MURONWALL=false; }
      g.restore();
      if(m.img&&m.__im&&m.__im.complete&&m.__im.naturalWidth){       /* a picture somebody pasted up */
        const im=m.__im,s2=Math.min(MURBAY*0.8/im.naturalWidth,ph*0.8/im.naturalHeight);
        g.save();g.beginPath();g.rect(bx,py,MURBAY,ph);g.clip();
        g.fillStyle=P.bone;g.fillRect(bx+(MURBAY-im.naturalWidth*s2)/2-2,py+(ph-im.naturalHeight*s2)/2-2,im.naturalWidth*s2+4,im.naturalHeight*s2+4);
        g.drawImage(im,bx+(MURBAY-im.naturalWidth*s2)/2,py+(ph-im.naturalHeight*s2)/2,im.naturalWidth*s2,im.naturalHeight*s2);
        g.restore();}
    });
    /* the signature, painted ON the dado at the foot of the painter's own stretch */
    g.fillStyle=P.ink;g.globalAlpha=.72;g.font="bold 11px ui-monospace,monospace";
    g.fillText(b.who,bx+6,foot+14);g.globalAlpha=1;
    /* a thin thread of the painter's latest iteration, run along the dado under their name only —
       the one mark that says where one hand stops and the next begins, and it is on the SKIRTING,
       not between the pictures, because a wall is not divided */
    const it=b.panels[b.panels.length-1];
    g.fillStyle=murThread(it&&it.iter);g.fillRect(bx+6,foot+17,Math.min(MURBAY-12,b.who.length*7),2);});
  g.restore();}
/* how wide the wall wants to be, given the column it is offered. It is a wall: it may be wider than
   the page, and the reader scrolls it. */
function murWallAspect(w){const S=murWallSize();return S.h/S.w;}
function murWallNatural(){const S=murWallSize();return Math.round(S.w);}

/* decode any attached images once, off the drawing path. A patch that is still loading draws its
   panel's own hand, which is what it would have drawn anyway. */
(function murLoadImages(){
  if(typeof MURALS==="undefined"||typeof Image==="undefined")return;
  MURALS.forEach(m=>{if(!m.img)return;const im=new Image();im.src=m.img;m.__im=im;});
})();
