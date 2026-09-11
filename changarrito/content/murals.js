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
function murGround(g,W,H){const P=MURPAL;
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

