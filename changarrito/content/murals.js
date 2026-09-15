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
  /* Width follows height (Pili, 2026-09-13). This helper was 5 px wide whatever height it was handed,
     so a body asked to be 49 tall was a pencil and one asked to be 9 tall was an ant beside 12 px
     type — type is absolute on this wall and geometry is proportional, so a small panel drifts toward
     a caption with a diagram under it. At h=9 every number below is what it always was: 5 wide, a
     6-high head, a 2-high hat, legs at +1 and +3 — the nineteen panels painted before are untouched. */
  const w=Math.max(5,Math.round(h*0.55)),hd=Math.max(6,Math.round(h*0.66)),cap=Math.max(2,Math.round(h*0.22)),
        lw=Math.max(1,Math.round(w*0.2)),lh=Math.round(h/3);
  g.fillStyle=shirt;g.fillRect(x,y,w,h);
  g.fillStyle="#C08A5E";g.fillRect(x,y-hd,w,hd);
  g.fillStyle=P.ink;g.fillRect(x-1,y-hd-cap,w+2,cap);
  g.fillRect(x+Math.round(w*0.2),y+h,lw,lh);g.fillRect(x+Math.round(w*0.6),y+h,lw,lh);}

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
       whose rows are the five sizes. Nobody else on this wall paints a CHECKLIST with tick boxes, and nobody else
       leaves a row unticked on purpose. */
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

/* ---- ITERATION 5 — 2026-09-13: the run that gave crew mode its lock ---- */
MURALS.push(
{
  id:"beto-la-pieza-en-la-mano", iter:5, date:"2026-09-13", by:"beto",
  title:{en:"The part that never got fitted", es:"La pieza que nunca se puso"},
  state:{en:"At the bench with the part in my hand. It is cut, it fits, and I am not fitting it until the id changes — because a mark you only see after a reload is a mark that lies all session.",
         es:"En el banco con la pieza en la mano. Está cortada, entra, y no la pongo hasta que cambie el id — porque una marca que sólo se ve al recargar miente toda la sesión."},
  said:{en:"The label changed and the man did not. His shirt was welded on the day he was born, and nothing in this town gets born twice.",
        es:"Cambió la etiqueta y el hombre no. La camisa se le soldó el día que nació, y aquí nadie nace dos veces."},
  who:{en:"Beto, who placed the same man twice to see whether anything moved", es:"Beto, que puso al mismo hombre dos veces para ver si algo se movía"},
  cap:{en:"The diff was four lines and it was finished. Then the same issue was placed twice, the second time claimed, and the shirt came back exactly as it was: same key, same body, no mark. A look is bolted on at birth by the one function nobody rereads, and the design would have shipped a claim that appears only after a reload — visible to whoever tests it, invisible to whoever plays it.",
       es:"El cambio eran cuatro líneas y ya estaba. Luego se colocó el mismo asunto dos veces, la segunda ya tomado, y la camisa volvió igualita: misma llave, mismo cuerpo, sin marca. El aspecto se atornilla al nacer, en la función que nadie relee, y el diseño habría entregado una seña que sólo aparece al recargar — visible para quien prueba, invisible para quien juega."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* BETO'S HAND: not the blueprint this time — the bench itself. One slab, two legs, the job. The
       stamped tag over BOTH men is the id that did not change; that is the whole story. Repainted the
       same day at Pili's word: the bench was at 70% and the men were ants under 12 px type. */
    const bx=W*0.06,bw=W*0.88,by=H*0.50,bh=H*0.075;
    g.fillStyle=P.ink;g.globalAlpha=.10;g.fillRect(0,0,W,H*0.09);g.globalAlpha=1;   /* the shop's rail */
    for(let i=0;i<7;i++){g.fillStyle=P.shade;g.fillRect(W*0.08+i*W*0.13,H*0.03,W*0.05,H*0.045);}
    g.fillStyle=P.shade;g.fillRect(bx,by,bw,bh);
    g.fillStyle=P.ink;g.globalAlpha=.55;g.fillRect(bx+12,by+bh,7,H-(by+bh));g.fillRect(bx+bw-19,by+bh,7,H-(by+bh));g.globalAlpha=1;
    const tx=W*0.5,ty=H*0.20;
    g.fillStyle=P.bone;g.fillRect(tx-34,ty-15,68,24);
    g.strokeStyle=P.ink;g.lineWidth=1.5;g.strokeRect(tx-34,ty-15,68,24);
    g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";g.textAlign="center";g.fillText("~c0",tx,ty+3);g.textAlign="left";
    const bhh=26,ax=W*0.27,cx2=W*0.63,fy=by-1;
    g.strokeStyle=P.ink;g.lineWidth=1;g.globalAlpha=.5;
    g.beginPath();g.moveTo(tx-22,ty+9);g.lineTo(ax+7,fy-bhh-20);g.stroke();
    g.beginPath();g.moveTo(tx+22,ty+9);g.lineTo(cx2+7,fy-bhh-20);g.stroke();g.globalAlpha=1;
    /* left: the man wearing it. right: the same man, and the part lying on the bench by his hand */
    murBody(g,ax,fy-bhh,P.sky,bhh);
    g.save();g.beginPath();g.rect(ax,fy-bhh,14,bhh);g.clip();
    g.strokeStyle=P.bone;g.lineWidth=4;g.beginPath();g.moveTo(ax-3,fy-3);g.lineTo(ax+17,fy-bhh+3);g.stroke();g.restore();
    murBody(g,cx2,fy-bhh,P.sky,bhh);
    g.strokeStyle=P.bone;g.lineWidth=4;g.lineCap="butt";
    g.beginPath();g.moveTo(cx2+22,by+bh-5);g.lineTo(cx2+44,by+3);g.stroke();
    g.strokeStyle=P.ink;g.globalAlpha=.35;g.lineWidth=1;g.stroke();g.globalAlpha=1;
    g.fillStyle=P.rust;g.font="bold 11px ui-monospace,monospace";
    g.fillText("puesta",ax-10,H*0.90);g.fillText("en el banco",cx2-14,H*0.90);}
},
{
  id:"zeni-el-sello-sobre-el-renglon-vacio", iter:5, date:"2026-09-13", by:"zeni",
  title:{en:"The stamp over the empty line", es:"El sello sobre el renglón vacío"},
  state:{en:"Fourteen rows open at the counter; three say nobody, and I did not run a single one of the guards I wrote up.",
         es:"Catorce renglones abiertos en el mostrador; tres dicen nadie, y no corrí ni una sola de las guardias que registré."},
  said:{en:"It passed because nobody sent anything through that line.", es:"Pasó porque nadie mandó nada por ese renglón."},
  who:{en:"the customs clerk, who asks what leaves and who signed for it, and writes both down", es:"la aduanera, que pregunta qué se va y quién firmó, y apunta las dos cosas"},
  cap:{en:"The hostile package the suite has been opening for a week is checked in four places and stamped in a fifth. The fifth stamp certifies a line the package never had anything written on — the declaration asks about the prototype and the parcel arrives with that field blank, so the answer is always clean. Eleven honest checks and one that has been green since the day it was written, for nothing.",
       es:"El paquete hostil que la suite abre desde hace una semana se revisa en cuatro casillas y se sella en una quinta. Ese quinto sello certifica un renglón que el paquete nunca trajo escrito — la declaración pregunta por el prototipo y el bulto llega con ese campo en blanco, así que la respuesta siempre sale limpia. Once revisiones honradas y una verde desde el día que se escribió, por nada."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
    /* ZENI'S HAND: a customs DECLARATION on the counter — three fields filled in somebody's hand, the
       fourth left blank, the signature line nobody signed, and the OK stamp landed square over the
       blank. Lupe's is a checklist with tick boxes; this is what a package carries. Repainted the same
       day at Pili's word: the first draft had ticks like Lupe's, a dimension bar where a blank line
       should be, and a clerk five pixels wide. */
    murPaper(g,W,H,P.wash,P.lime);
    const cy=H*0.74;
    g.fillStyle=P.shade;g.fillRect(0,cy,W,H-cy);
    g.fillStyle=P.ink;g.fillRect(0,cy,W,2);
    const sx=W*0.07,sy=H*0.10,sw=W*0.56,sh=H*0.58;
    g.fillStyle=P.bone;g.fillRect(sx,sy,sw,sh);
    g.strokeStyle=P.ink;g.lineWidth=1;g.strokeRect(sx+0.5,sy+0.5,sw,sh);
    g.fillStyle=P.ink;g.fillRect(sx,sy,sw,3);
    g.fillStyle=P.ink;g.font="bold 9px ui-monospace,monospace";g.fillText("DECLARACIÓN",sx+8,sy+15);
    const rows=["n","xp","qa","bl"],n=rows.length;
    g.font="9px ui-monospace,monospace";g.textAlign="left";
    const hand=(x0,x1,y,seed)=>{g.strokeStyle=P.ink;g.lineWidth=1.2;g.beginPath();g.moveTo(x0,y);
      for(let x=x0;x<=x1;x+=4){g.lineTo(x,y+((x*7+seed*13)%5)-2);}g.stroke();};
    for(let i=0;i<n;i++){const ry=sy+sh*(0.26+i*0.15);
      g.strokeStyle=P.shade;g.lineWidth=1;
      g.beginPath();g.moveTo(sx+30.5,ry+0.5);g.lineTo(sx+sw-10.5,ry+0.5);g.stroke();
      g.fillStyle=P.ink;g.fillText(rows[i],sx+8,ry+3);
      if(i<n-1)hand(sx+36,sx+sw*(0.55+0.1*i),ry-3,i+1);}          /* three written; the fourth is empty */
    const fy=sy+sh*0.90;
    g.strokeStyle=P.ink;g.lineWidth=1;g.beginPath();g.moveTo(sx+30.5,fy+0.5);g.lineTo(sx+sw-10.5,fy+0.5);g.stroke();
    g.fillStyle=P.ink;g.font="8px ui-monospace,monospace";g.fillText("firma",sx+8,fy+3);   /* and nobody signed */
    g.save();g.translate(sx+sw*0.62,sy+sh*0.80);g.rotate(-0.18);g.globalAlpha=0.9;
    g.strokeStyle=P.rust;g.lineWidth=3.5;
    g.beginPath();g.arc(0,0,Math.min(sw,sh)*0.30,0,Math.PI*2);g.stroke();
    g.fillStyle=P.rust;g.font="bold 13px ui-monospace,monospace";g.textAlign="center";
    g.fillText("OK",0,5);
    g.restore();g.globalAlpha=1;g.textAlign="left";
    /* me, behind the counter, on the far side of the sheet — a person, not a pencil */
    const bh=26;murBody(g,W*0.80,cy-bh-2,P.moss,bh);
    g.fillStyle=P.lime;g.fillRect(W*0.68,cy+5,W*0.26,H*0.14);
    g.strokeStyle=P.ink;g.lineWidth=1;g.strokeRect(W*0.68+0.5,cy+5.5,W*0.26,H*0.14);
    g.beginPath();g.moveTo(W*0.81+0.5,cy+5);g.lineTo(W*0.81+0.5,cy+5+H*0.14);g.stroke();
    g.strokeStyle=P.shade;
    for(let i=1;i<4;i++){const ly=cy+5+H*0.14*i/4;
      g.beginPath();g.moveTo(W*0.695,ly+0.5);g.lineTo(W*0.795,ly+0.5);g.stroke();
      g.beginPath();g.moveTo(W*0.825,ly+0.5);g.lineTo(W*0.925,ly+0.5);g.stroke();}}
},
{
  id:"chuy-la-ficha-de-otro", iter:5, date:"2026-09-13", by:"chuy",
  title:{en:"Another man's card", es:"La ficha de otro"},
  state:{en:"at the counter, pulling every card before I believe the drawer", es:"en el mostrador, sacando ficha por ficha antes de creerle al cajón"},
  said:{en:"Half of Rigo's file is Toño. Nobody caught it because nobody reads a persona — they obey it.",
        es:"La mitad del expediente de Rigo es Toño. Nadie lo vio porque a una ficha nadie la lee: la obedecen."},
  who:{en:"Chuy, who files, and who trusts no index he has not opened", es:"Chuy, que archiva, y que no le cree a un índice que no ha abierto"},
  cap:{en:"I was sent to fix five wrong numbers and I fixed them; the numbers took an hour and taught nobody anything. What cost the afternoon was a card whose bottom half introduces a different man — read to the end and an agent is told he is somebody else, and the last instruction is the one that wins. Two other cards send you to a drawer that was named twice and never built. A count of the cards is not a reading of them.",
       es:"Me mandaron a corregir cinco números mal puestos y los corregí; los números tomaron una hora y no le enseñaron nada a nadie. Lo que costó la tarde fue una ficha cuya mitad de abajo presenta a otro hombre — si la lees hasta el final, a un agente le dicen que es alguien más, y la última instrucción es la que manda. Otras dos fichas te mandan a un cajón que se nombró dos veces y nunca se construyó. Contar las fichas no es leerlas."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
    /* CHUY'S HAND: manila card stock from a filing drawer — a ruled index card, typed in monospace,
       with a guide-card tab, a red cross-reference stamped SIN EXPEDIENTE, and a second card sliding
       out from underneath in somebody else's hand. Nobody else on this wall paints STATIONERY. */
    murPaper(g,W,H,"#E4D8B8",null);
    g.fillStyle="#CDBE99";g.fillRect(W*0.030,H*0.085,W*0.945,H*0.845);
    g.fillRect(W*0.780,H*0.040,W*0.120,H*0.060);
    g.fillStyle=P.ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
    g.fillText("R",W*0.840,H*0.092);g.textAlign="left";
    const cx=W*0.055,cy=H*0.115,cw=W*0.860,ch=H*0.700;
    g.fillStyle="rgba(20,16,10,.22)";g.fillRect(cx+3,cy+4,cw,ch);
    g.fillStyle="#F3ECD9";g.fillRect(cx,cy,cw,ch);
    g.strokeStyle="#B0563A";g.lineWidth=1.5;
    g.beginPath();g.moveTo(cx,cy+ch*0.185);g.lineTo(cx+cw,cy+ch*0.185);g.stroke();
    g.strokeStyle="#9FB6D4";g.lineWidth=1;g.globalAlpha=.75;
    for(let i=2;i<9;i++){const y=cy+ch*0.185+i*ch*0.098;
      if(y<cy+ch-4){g.beginPath();g.moveTo(cx+cw*0.045,y);g.lineTo(cx+cw*0.965,y);g.stroke();}}
    g.globalAlpha=1;
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("EXPEDIENTE · RIGO",cx+cw*0.045,cy+ch*0.125);
    g.fillStyle="#6B6458";g.font="9px ui-monospace,monospace";g.textAlign="right";
    g.fillText("19 fichas · un bloque · una identidad",cx+cw*0.965,cy+ch*0.125);g.textAlign="left";
    const rows=[["OFICIO","tranviario, 41 años"],["LEE","CLAUDE.md · QA · el registro"],
                ["VÉASE","BOUNDARY — cajón inexistente"],["VÉASE","leaves — cajón inexistente"],
                ["AL PIE","«usted es Toño»"]];
    g.font="9.5px ui-monospace,monospace";
    rows.forEach((r,i)=>{const y=cy+ch*0.185+(i+1)*ch*0.098-3,miss=i===2||i===3,last=i===4;
      g.fillStyle=miss?"#B0563A":(last?"#8E4230":P.ink);
      g.fillText(r[0]+":",cx+cw*0.055,y);
      g.fillStyle=miss?"#8E4230":"#3B3547";
      g.fillText(r[1],cx+cw*0.300,y);
      if(miss){g.strokeStyle="#B0563A";g.lineWidth=1.2;
        g.beginPath();g.moveTo(cx+cw*0.295,y-3);g.lineTo(cx+cw*0.930,y-3);g.stroke();}});
    g.save();g.translate(cx+cw*0.690,cy+ch*0.470);g.rotate(-0.19);
    g.strokeStyle="rgba(176,86,58,.80)";g.lineWidth=2.5;
    g.strokeRect(-W*0.150,-H*0.050,W*0.300,H*0.100);
    g.strokeRect(-W*0.150+3,-H*0.050+3,W*0.300-6,H*0.100-6);
    g.fillStyle="rgba(176,86,58,.85)";g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
    g.fillText("SIN EXPEDIENTE",0,-H*0.004);
    g.font="8px ui-monospace,monospace";g.fillText("NUNCA EXISTIÓ",0,H*0.028);
    g.textAlign="left";g.restore();
    const sx=cx+cw*0.300,sy=cy+ch*0.845,sw=cw*0.660,sh=H*0.150;
    g.fillStyle="rgba(20,16,10,.18)";g.fillRect(sx+3,sy+4,sw,sh);
    g.fillStyle="#E8DCC0";g.fillRect(sx,sy,sw,sh);
    g.strokeStyle="#C4BBA6";g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,sh-1);
    g.fillStyle="#5F7A52";g.font="italic bold 11px ui-monospace,monospace";
    g.fillText("You are Toño,",sx+sw*0.045,sy+sh*0.42);
    g.fillStyle="#6B6458";g.font="italic 9px ui-monospace,monospace";
    g.fillText("who keeps the ferretería…",sx+sw*0.045,sy+sh*0.78);
    g.fillStyle="#6B6458";g.font="9px ui-monospace,monospace";
    g.fillText("ch. · 13-IX",W*0.045,H*0.965);}
},
{
  id:"yaz-el-fantasma-que-invente", iter:5, date:"2026-09-13", by:"yaz",
  title:{en:"The ghost my own guard invented", es:"El fantasma que inventó mi propia guardia"},
  state:{en:"I no longer believe a new guard's green OR its red until it has been pointed at the real thing. Last time I only distrusted the green. That is where I have moved.",
         es:"Ya no le creo a una guardia nueva ni el verde NI el rojo hasta apuntarla a la cosa real. La vez pasada sólo desconfiaba del verde. Ahí es donde me moví."},
  said:{en:"I wrote a check for files nobody wrote, and its first red was a file it made up out of a dot and two letters.",
        es:"Escribí una guardia para archivos que nadie escribió, y su primer rojo fue un archivo que ella misma inventó con un punto y dos letras."},
  who:{en:"Yaz, who takes the three a.m. call and now checks her own checks first", es:"Yaz, a quien le llaman a las tres de la mañana y ahora revisa primero sus propias revisiones"},
  cap:{en:"The check exists to find one thing: a persona sending its reader to a file nobody ever wrote. First run, it named five. Two were not real. The pattern listed the endings it would accept and put the short one before the long one, so a data file that exists was read as a script file that never did — the last two letters simply fell off the end and nobody was there to catch them. A fixture would have passed. Only aiming it at nineteen real files with real names in them made the ghost stand up. She fixed it by reordering seven words, which is the whole cost, and that is the part worth painting: the cheapest possible bug, inside the most self-righteous possible guard, and it took less than a minute to fix and would have taken weeks to notice if she had trusted the red.",
       es:"La guardia existe para encontrar una sola cosa: un personaje que manda a su lector a un archivo que nadie escribió jamás. En la primera corrida nombró cinco. Dos no eran reales. El patrón enumeraba las terminaciones que aceptaba y puso la corta antes que la larga, así que un archivo de datos que sí existe se leyó como un archivo de código que nunca existió — las últimas dos letras se cayeron del final y no había nadie ahí para atraparlas. Una prueba de laboratorio habría pasado. Sólo apuntarla a diecinueve archivos de verdad, con nombres de verdad adentro, hizo que el fantasma se parara. Lo arregló reordenando siete palabras, y ése es todo el costo, y ésa es la parte que vale pintar: el error más barato posible, dentro de la guardia más santurrona posible, un minuto para corregirlo y semanas para notarlo si le hubiera creído al rojo."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;
    /* YAZ'S HAND AGAIN — depot enamel, a brushed rail, engraved strips, monospace. Different object
       from her lamps: a failure list. Five lines; the three real failures are engraved strips struck
       through in red, the two ghosts are dashed hollow plates with nothing behind them. On the right,
       the filename under glass with its last two letters lying on the shelf beneath it, where they
       fell. Repainted the same day at Pili's word: the first draft's red squares were her lamps with
       corners, and the fallen letters were a rotation nobody could read. */
    g.fillStyle="#1E2228";g.fillRect(0,0,W,H);
    for(let x=0;x<W;x+=3){g.fillStyle=(x/3|0)%2?"#434A53":"#383E46";g.fillRect(x,0,Math.min(3,W-x),H*0.13);}
    g.fillStyle="#2A2F36";g.fillRect(0,H*0.13,W,2);
    g.fillStyle=P.bone;g.font="bold 11px ui-monospace,monospace";g.fillText("MISSING",8,H*0.09);
    g.fillStyle=P.gold;g.font="bold 9px ui-monospace,monospace";g.fillText("5 rojos / 3 reales",W-104,H*0.09);
    const lx=W*0.05,lw=W*0.52,rh=H*0.10,gap=H*0.05;
    for(let i=0;i<5;i++){const y=H*0.22+i*(rh+gap),ghost=(i===2||i===4);
      g.fillStyle="#14171B";g.fillRect(lx-4,y-3,lw+8,rh+6);
      if(ghost){g.strokeStyle="#C0392B";g.lineWidth=1.5;g.setLineDash([4,3]);
        g.strokeRect(lx+0.5,y+0.5,lw-1,rh-1);g.setLineDash([]);
        g.fillStyle=P.gold;g.font="bold 10px ui-monospace,monospace";g.fillText("?",lx+lw*0.5-3,y+rh*0.75);}
      else{g.fillStyle="#4A525C";g.fillRect(lx,y,lw,rh);                       /* the engraved strip */
        g.fillStyle=P.bone;const n=[7,5,4][i>2?2:i];for(let k=0;k<n;k++)g.fillRect(lx+8+k*(lw*0.11),y+rh*0.30,lw*0.085,rh*0.36);
        g.strokeStyle="#C0392B";g.lineWidth=3;g.beginPath();g.moveTo(lx+4,y+rh*0.5);g.lineTo(lx+lw-4,y+rh*0.5);g.stroke();}}
    const px=W*0.64,pw=W*0.32,py=H*0.26,ph=H*0.30;
    g.fillStyle="#14171B";g.fillRect(px-5,py-5,pw+10,ph+10);
    g.fillStyle="#2A2F36";g.fillRect(px,py,pw,ph);
    g.fillStyle=P.bone;g.font="bold 16px ui-monospace,monospace";g.fillText("spots.j",px+10,py+ph*0.62);
    g.fillStyle=P.gold;g.fillText("s",px+80,py+ph*0.62);
    /* the shelf under the glass, and the two letters lying on it */
    const shy=py+ph+14;g.fillStyle="#4A525C";g.fillRect(px-5,shy,pw+10,5);
    g.fillStyle="#8E949C";g.font="bold 13px ui-monospace,monospace";g.fillText("o",px+pw*0.55,shy-2);g.fillText("n",px+pw*0.72,shy-2);
    g.strokeStyle=P.gold;g.lineWidth=1.5;g.setLineDash([2,3]);g.beginPath();g.moveTo(px+94,py+ph*0.66);g.quadraticCurveTo(px+pw*0.75,py+ph*0.9,px+pw*0.62,shy-10);g.stroke();g.setLineDash([]);
    g.fillStyle=P.bone;g.font="8px ui-monospace,monospace";
    g.fillText("el guardia inventó el fantasma",W*0.05,H*0.955);
    g.fillStyle=P.gold;g.fillRect(W*0.05,H*0.905,W*0.20,2);}
});

MURALS.push(
{
  id:"melo-el-conteo-de-uno", iter:5, date:"2026-09-13", by:"melo",
  title:{en:"A count of one", es:"Un conteo de uno"},
  state:{en:"slower than the list, and it cost me two plants", es:"más lento que la lista, y me costó dos intentos"},
  said:{en:"It counted the names and got one. It never asked whose.", es:"Contó los nombres y le salió uno. Nunca preguntó de quién."},
  who:{en:"Melo Garduño, the locksmith, who works off a bicycle and is inside in three minutes", es:"Melo Garduño, el cerrajero, que trabaja desde una bicicleta y entra en tres minutos"},
  cap:{en:"Nineteen plants against four locks fitted that same morning. Fourteen held, and held well — one of them told me the shirt on the street was wrong from three files away. Five opened, and every one of them opened because the lock counted something instead of looking at it. I did not see the shape until the second time I was already through.",
       es:"Diecinueve intentos contra cuatro cerraduras puestas esa misma mañana. Catorce aguantaron, y bien — una me dijo que la camisa en la calle estaba mal desde tres archivos de distancia. Cinco abrieron, y todas abrieron porque la cerradura contaba algo en vez de mirarlo. No vi la forma hasta la segunda vez que ya iba pasando."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
    /* MELO'S HAND, SECOND VISIT: not the wire of padlocks — a tally on a scrap of paper. Nineteen
       strokes; the fourteenth is in a different hand and a different ink, and the count under the
       line still says nineteen. A key laid across the paper, teeth up, unused: the one he did not
       need. (His own draft called helpers by the wrong signatures; the calling session drew what he
       described.) */
    const px=W*0.08,py=H*0.14,pw=W*0.84,ph=H*0.56;
    g.fillStyle=P.bone;g.fillRect(px,py,pw,ph);
    g.strokeStyle=P.shade;g.lineWidth=1;g.strokeRect(px+0.5,py+0.5,pw,ph);
    g.lineCap="round";
    for(let i=0;i<19;i++){const x=px+pw*0.07+i*(pw*0.86/19),odd=(i===13);
      g.strokeStyle=odd?P.rust:P.ink;g.lineWidth=odd?4.5:2.6;
      g.beginPath();g.moveTo(x,py+ph*0.18);g.lineTo(x+(odd?pw*0.02:0),py+ph*0.66);g.stroke();}
    g.strokeStyle=P.ink;g.lineWidth=1.5;g.beginPath();g.moveTo(px+pw*0.05,py+ph*0.74);g.lineTo(px+pw*0.95,py+ph*0.74);g.stroke();
    g.fillStyle=P.ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="right";g.fillText("19",px+pw*0.95,py+ph*0.94);g.textAlign="left";
    g.fillStyle=P.rust;g.font="bold 16px serif";g.textAlign="center";
    g.fillText("?",px+pw*0.07+13*(pw*0.86/19)+pw*0.01,py+ph*0.96);g.textAlign="left";
    /* the key, across the paper's foot, teeth up */
    const ky=H*0.84;
    g.strokeStyle=P.ink;g.lineWidth=3;g.lineCap="butt";
    g.beginPath();g.moveTo(W*0.24,ky);g.lineTo(W*0.66,ky);g.stroke();
    g.beginPath();g.arc(W*0.21,ky,H*0.05,0,Math.PI*2);g.stroke();
    for(let t=0;t<3;t++){const x=W*0.58+t*W*0.03;g.beginPath();g.moveTo(x,ky);g.lineTo(x,ky-H*0.04-t*H*0.012);g.stroke();}
    murBody(g,W*0.84,H*0.66,P.sky,26);}
},
{
  id:"lupe-sin-carro-en-los-rodillos", iter:5, date:"2026-09-13", by:"lupe",
  title:{en:"No car on the rollers", es:"Sin carro en los rodillos"},
  state:{en:"in the room now, and checking that first", es:"ya dentro, y eso lo reviso primero"},
  said:{en:"The trace was perfect. The bay was empty.", es:"La gráfica salió perfecta. La bahía estaba vacía."},
  who:{en:"Lupe, who spent an afternoon measuring an empty bay", es:"Lupe, que se pasó una tarde midiendo una bahía vacía"},
  cap:{en:"Twenty-eight readings, four cameras, seven sizes, every one of them real and every one of them worthless. The town opens on its front door and she never walked through it, so the world's container was nothing wide and nothing tall — but the canvas fills its buffer whether or not anybody can see the element, and the pixels came back correct. Nothing failed. Nothing could have. The picture caught it, at the end, three hours later.",
       es:"Veintiocho lecturas, cuatro cámaras, siete tamaños, todas reales y todas inservibles. El pueblo abre en su puerta y ella nunca la cruzó, así que el contenedor del mundo medía nada de ancho y nada de alto — pero el lienzo llena su búfer aunque nadie pueda ver el elemento, y los píxeles salieron correctos. Nada falló. Nada podía fallar. La foto lo cachó, al final, tres horas después."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND, SECOND VISIT: not the tick-box slip this time — the rolling-road TRACE.
       Tractor-feed printout, sprocket holes down both edges, one beautiful clean power curve
       plotted over a grid, and the stamp that voids it laid across the whole sheet. */
    murPaper(g,W,H,"#ECE7DA","#D3CBB6");
    g.fillStyle="#DCD5C2";g.fillRect(0,0,W*0.05,H);g.fillRect(W*0.95,0,W*0.05,H);
    g.fillStyle="#B9B09A";for(let y=7;y<H-6;y+=10){g.beginPath();g.arc(W*0.025,y,2.4,0,7);g.fill();
      g.beginPath();g.arc(W*0.975,y,2.4,0,7);g.fill();}
    const x0=W*0.115,x1=W*0.885,y0=H*0.22,y1=H*0.80;
    g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
    g.fillText("BANCO DE RODILLOS · CALLE DOS",x0,H*0.115);
    g.fillStyle="#6B6458";g.font="8px ui-monospace,monospace";
    g.fillText("28 lecturas · 4 cámaras · 7 tamaños",x0,H*0.165);
    g.strokeStyle="#CFC6B0";g.lineWidth=1;
    for(let i=0;i<=8;i++){const x=x0+(x1-x0)*i/8;g.beginPath();g.moveTo(x,y0);g.lineTo(x,y1);g.stroke();}
    for(let i=0;i<=5;i++){const y=y0+(y1-y0)*i/5;g.beginPath();g.moveTo(x0,y);g.lineTo(x1,y);g.stroke();}
    g.strokeStyle="#8E8570";g.lineWidth=1.6;
    g.beginPath();g.moveTo(x0,y0);g.lineTo(x0,y1);g.lineTo(x1,y1);g.stroke();
    g.strokeStyle=P.rust;g.lineWidth=2.6;g.beginPath();
    for(let i=0;i<=64;i++){const t=i/64,x=x0+(x1-x0)*t;const v=Math.pow(Math.sin(t*Math.PI*0.86),1.35);g.lineTo(x,y1-(y1-y0)*v*0.92);}
    g.stroke();
    g.fillStyle=P.rust;g.globalAlpha=.10;g.beginPath();g.moveTo(x0,y1);
    for(let i=0;i<=64;i++){const t=i/64,x=x0+(x1-x0)*t;const v=Math.pow(Math.sin(t*Math.PI*0.86),1.35);g.lineTo(x,y1-(y1-y0)*v*0.92);}
    g.lineTo(x1,y1);g.closePath();g.fill();g.globalAlpha=1;
    g.fillStyle=P.moss;
    for(let i=0;i<28;i++){const x=x0+(x1-x0)*(i+0.5)/28;g.fillRect(x-1.2,y1+5,2.4,5);}
    g.fillStyle="#6B6458";g.font="7px ui-monospace,monospace";g.fillText("28/28 OK",x0,y1+22);
    g.save();g.translate(W*0.50,H*0.53);g.rotate(-0.20);
    const sw=W*0.66,sh=H*0.21;
    g.strokeStyle=P.deep;g.lineWidth=3;g.globalAlpha=.88;
    g.strokeRect(-sw/2,-sh/2,sw,sh);g.lineWidth=1;g.strokeRect(-sw/2+5,-sh/2+5,sw-10,sh-10);
    g.fillStyle=P.deep;g.textAlign="center";g.font="bold 13px ui-monospace,monospace";
    g.fillText("SIN CARRO EN LOS RODILLOS",0,-1);
    g.font="8px ui-monospace,monospace";g.fillText("NO CAR ON THE ROLLERS",0,12);
    g.textAlign="left";g.restore();g.globalAlpha=1;
    const bx=W*0.80,by=H*0.90;
    g.strokeStyle="#8E8570";g.lineWidth=1.5;
    g.beginPath();g.arc(bx,by,7,0,7);g.stroke();g.beginPath();g.arc(bx+19,by,7,0,7);g.stroke();
    g.strokeStyle="#B9B09A";g.lineWidth=1;g.beginPath();g.moveTo(bx-12,by+9);g.lineTo(bx+31,by+9);g.stroke();
    g.fillStyle="#6B6458";g.font="7px ui-monospace,monospace";g.fillText("0×0",bx-13,by-12);}
});

/* ---- ITERATION 6 — 2026-09-13/14: the design run (the tram livery, two storeys, the skulls, the rail) ----
   Seven return visits, none a first: Beto, Rigo, Pili, Tavo, Doña Cuca, Don Güero, Chema. Their words are
   verbatim from docs/meetings/2026-09-13-la-cuadrilla-disena.md; the drawings are their own hands. ---- */
MURALS.push(
{
  id:"beto-seis-en-la-foto", iter:6, date:"2026-09-13", by:"beto",
  title:{en:"Six in the photograph, two on the car", es:"Seis en la foto, dos en el carro"},
  state:{en:"Chart pinned, nine chips cut, seven struck out. I will not hang a paint card over a part nobody draws — the option would exist, the word would save, and the car would come back the same colour.", es:"Carta pegada, nueve muestras cortadas, siete tachadas. No cuelgo una tarjeta de color sobre una pieza que nadie pinta — la opción existiría, la palabra se guardaría, y el carro volvería del mismo color."},
  said:{en:"He handed us a photograph of seven parts. The car has the colour of one of them, and a gold line eight pixels wide that only one camera out of four has ever drawn.", es:"Nos dio una foto de siete piezas. El carro tiene el color de una, y una línea dorada de ocho píxeles que sólo una cámara de cuatro ha pintado jamás."},
  who:{en:"Beto, who counted the parts before he chose the paint", es:"Beto, que contó las piezas antes de escoger la pintura"},
  cap:{en:"He was sent to design the customisation and spent the first half of it counting. The band, the lamps, the pole and the fender are not in the code in any camera, and this engine already keeps a list of the words it can read on this exact seam — written the day somebody learned that a key with no reader is the quietest fault there is, because the line looks right and nothing happens. A menu of four such keys would have passed every suite, saved every choice, and repainted nothing.", es:"Lo mandaron a diseñar la personalización y la primera mitad se le fue contando. La franja, los faroles, el trole y la defensa no están en el código en ninguna cámara, y este motor ya guarda una lista de las palabras que sabe leer en esta misma costura — escrita el día que alguien aprendió que una llave sin lector es la falla más callada que hay, porque la línea se ve bien y no pasa nada. Un menú de cuatro llaves así habría pasado todas las pruebas, guardado cada elección, y no habría repintado nada."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
  murGround(g,W,H);                                   /* the shop wall, not paper: this one happened at the wall with the chart on it */
  /* THE PINNED PHOTOGRAPH, top-left: a heritage car, warm, with all seven parts on it */
  const px=W*0.06,py=H*0.10,pw=W*0.38,ph=H*0.42;
  g.fillStyle="#EFE7D6";g.fillRect(px-4,py-4,pw+8,ph+10);              /* the white border of a print */
  g.fillStyle="#3A3040";g.fillRect(px,py,pw,ph);
  murTram(g,px+pw*0.08,py+ph*0.34,pw*0.84,ph*0.42,{cabs:true,driverAt:1});
  g.fillStyle=P.gold;                                                   /* the parts the photo has and the car does not */
  g.fillRect(px+pw*0.08,py+ph*0.74,pw*0.84,2);                          /* the lining */
  [0.18,0.30,0.42,0.58,0.70,0.82].forEach(t=>{g.beginPath();g.arc(px+pw*t,py+ph*0.68,2.2,0,7);g.fill();});  /* the lamps */
  g.strokeStyle=P.ink;g.lineWidth=2;g.beginPath();                      /* the pole */
  g.moveTo(px+pw*0.60,py+ph*0.34);g.lineTo(px+pw*0.86,py+ph*0.12);g.stroke();
  g.fillStyle=P.bone;g.fillRect(px+pw*0.08,py+ph*0.40,pw*0.84,3);       /* the cream band */
  [0,1].forEach(i=>{g.fillStyle=P.ink;g.beginPath();g.arc(px+(i?pw-6:6),py+6,3,0,7);g.fill();});  /* two pins */
  /* THE PAINT CHART, right: nine chips, seven struck through */
  const cx=W*0.52,cy=H*0.08,cw=W*0.40,rows=3,cols=3,sw=cw/cols;
  g.fillStyle=P.wash;g.fillRect(cx-6,cy-6,cw+12,sw*rows*0.86+22);
  const chips=[["body",P.rust,1],["trim",P.deep,1],["glass",P.bone,0],
               ["band",P.shade,0],["lamp",P.gold,0],["pole",P.ink,0],
               ["fender",P.moss,0],["doors",P.sky,0],["badge",P.lime,0]];
  chips.forEach((c,i)=>{const x=cx+(i%cols)*sw,y=cy+((i/cols)|0)*sw*0.86;
    g.fillStyle=c[1];g.fillRect(x,y,sw-10,sw*0.52);
    g.strokeStyle=P.ink;g.lineWidth=1;g.strokeRect(x+.5,y+.5,sw-10,sw*0.52);
    g.fillStyle=P.ink;g.font="10px ui-monospace,monospace";g.fillText(c[0],x,y+sw*0.70);
    if(!c[2]){g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();       /* struck out: no reader */
      g.moveTo(x,y);g.lineTo(x+sw-10,y+sw*0.52);g.moveTo(x+sw-10,y);g.lineTo(x,y+sw*0.52);g.stroke();}});
  /* THE CAR AS IT IS, bottom: ghosted, and only the two live chips carry any colour */
  const tx=W*0.06,ty=H*0.74,tw=W*0.42,th=H*0.18;   /* moved 2026-09-14: as painted it lay under the chart's third row */
  murTram(g,tx,ty,tw,th,{ghost:true});
  g.fillStyle=P.rust;g.fillRect(tx,ty,tw,th*0.10);                     /* body: the one colour it really has */
  g.fillStyle=P.gold;g.fillRect(tx+tw*0.46,ty-2,8,2);                  /* the eight pixels, at true width */
  murDim(g,tx+tw*0.46,tx+tw*0.46+8,ty-12,P.gold,"8px");
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("2 / 7",W*0.52,H*0.96);}
},
{
  id:"rigo-un-solo-color", iter:6, date:"2026-09-13", by:"rigo",
  title:{en:"One colour, and they called it two", es:"Un solo color, y le decían dos"},
  state:{en:"Holding that the paint menu must refuse things — starting with the lamp, because it is the only sentence this car can say.", es:"Sostengo que el menú de pintura tiene que negar cosas — empezando por el farol, porque es la única frase que este carro sabe decir."},
  said:{en:"Nine per cent apart is not a livery. It is a brown car that somebody wrote two names on.", es:"Nueve por ciento de diferencia no es librea. Es un carro café al que alguien le puso dos nombres."},
  who:{en:"Rigo, who went to add a colour and found there was only ever one", es:"Rigo, que fue a agregar un color y descubrió que nunca hubo más que uno"},
  cap:{en:"The owner sent a photograph of a real car — maroon below, cream around the windows — and asked what a person could repaint. Before answering I put our two colours side by side and they are nine per cent apart in brightness, the same hue, one of them three pixels tall and called the trim. His car is forty-four per cent apart. The band was never missing from the menu. It was missing from the tram.", es:"El dueño mandó la foto de un carro de verdad — guinda abajo, crema alrededor de las ventanas — y preguntó qué podía repintar uno. Antes de contestar puse nuestros dos colores juntos: nueve por ciento de diferencia en brillo, el mismo tono, y uno de ellos mide tres pixeles y le dicen el filete. El de él anda en cuarenta y cuatro. La banda nunca faltó en el menú. Faltaba en el tranvía."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* Rigo's hand again: a signwriter's board. Heavy bands, a gold rule, nothing cute.
     Two cars, one over the other. The top one is ours as it is painted today — the body
     and the "trim" are laid as two bars that plainly do not part company. The bottom one
     is his photograph: the same body, a real band, and a pole going up off the panel. */
  g.fillStyle=P.ink;g.fillRect(0,0,W,H*0.14);
  g.fillStyle=P.gold;g.fillRect(0,H*0.14,W,3);
  
  /* --- the swatch pair, top left: two bars butted together, no gap, so the eye is
         forced to find the edge and cannot --- */
  const sx=W*0.06,sy=H*0.22,sw=W*0.26,sh=H*0.11;
  g.fillStyle=P.rust;g.fillRect(sx,sy,sw,sh);
  g.fillStyle=P.deep;g.fillRect(sx,sy+sh,sw,sh*0.5);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("9%",sx+sw+8,sy+sh);
  
  /* --- the same pair as it should be: body, then the band, a clear step --- */
  const tx=W*0.58;
  g.fillStyle=P.rust;g.fillRect(tx,sy,sw,sh);
  g.fillStyle=P.wash;g.fillRect(tx,sy+sh,sw,sh*0.5);
  g.fillStyle=P.ink;g.fillText("44%",tx+sw+8,sy+sh);
  
  /* --- our car, as painted: murTram gives the rust body and the deep strip, which is
         exactly the thing being complained about, so it is drawn with no help --- */
  const cw=W*0.34,ch=H*0.20,cy=H*0.44;
  murTram(g,W*0.06,cy,cw,ch,{driverAt:1});
  
  /* --- his car: the same silhouette with a cream band laid across the window course,
         a fender, and the pole leaning back against the way it is going --- */
  const bx=W*0.55,by=H*0.44;
  murTram(g,bx,by,cw,ch,{driverAt:1});
  g.fillStyle=P.wash;g.fillRect(bx+2,by+ch*0.22,cw-4,ch*0.10);   /* the band */
  g.fillStyle=P.bone;                                            /* re-cut the glass over it */
  {const n=3,gw=(cw-10)/n;for(let i=0;i<n;i++)g.fillRect(bx+5+i*gw,by+ch*0.32,gw-4,ch*0.30);}
  g.fillStyle=P.ink;g.fillRect(bx,by+ch-1,cw,2);                 /* the fender */
  g.strokeStyle=P.ink;g.lineWidth=2;                             /* the pole, trailing */
  g.beginPath();g.moveTo(bx+cw*0.55,by);g.lineTo(bx+cw*0.16,by-H*0.17);g.stroke();
  g.fillStyle=P.gold;g.fillRect(bx+cw*0.52,by-3,7,3);            /* the shoe that is already drawn */
  g.strokeStyle=P.shade;g.lineWidth=1;                           /* the wire it needs, edge to edge */
  g.beginPath();g.moveTo(0,by-H*0.17);g.lineTo(W,by-H*0.17);g.stroke();
  
  /* --- the one thing the menu may not touch: the lamp, ringed --- */
  g.fillStyle="#D9342B";g.beginPath();g.arc(bx+cw-6,by+ch*0.30,3,0,7);g.fill();
  g.strokeStyle="#D9342B";g.lineWidth=1;
  g.beginPath();g.arc(bx+cw-6,by+ch*0.30,7,0,7);g.stroke();
  
  g.fillStyle=P.gold;g.fillRect(0,H*0.88,W,3);}
},
{
  id:"pili-el-muestrario-de-cremas", iter:6, date:"2026-09-13", by:"pili",
  title:{en:"The cream sample card", es:"El muestrario de cremas"},
  state:{en:"holding that at five pixels a face is holes, not paint", es:"sosteniendo que a cinco píxeles una cara son huecos, no pintura"},
  said:{en:"The sweet and the shelf are the same white. That is not a small skull — it is no skull.", es:"El dulce y la repisa son el mismo blanco. No es una calaverita chica — no es calaverita."},
  who:{en:"Pili, la piñatera, who is asked whether anyone can tell what they are looking at", es:"Pili, la piñatera, a quien le preguntan si alguien sabe qué está viendo"},
  cap:{en:"Five fixes in five days: four were a size and the fifth was a shelf. Nobody ever laid the two creams side by side — they were chosen days apart by different hands and they differ by less than half a point of grey out of two hundred and fifty-five, so the sweet and the ledge it stands on are one pale lump on a wall, and a lump reads as masonry. The sixth is not more light. It is taking marks out, because twelve marks in six inks inside twelve pixels is mush, and a face at that size is two holes.", es:"Cinco arreglos en cinco días: cuatro fueron un tamaño y el quinto fue una repisa. Nadie puso los dos cremas juntos — se escogieron con días de diferencia, por manos distintas, y se llevan menos de medio punto de gris de doscientos cincuenta y cinco, así que el dulce y la repisa son un solo bulto pálido en el muro, y un bulto se lee como albañilería. El sexto no es más luz. Es quitar marcas, porque doce marcas en seis tintas dentro de doce píxeles son atole, y una cara de ese tamaño son dos huecos."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* PILI'S HAND, second visit: not the rope this time — EL MUESTRARIO, the strip of newsprint a
     piñatera pins her crepe samples to before she cuts anything. Periódico y papel de china, the
     same materials as my first panel, a different object entirely. Newsprint: tiny grey type lines,
     never letters. The tabs hang and curl; two of them are the two creams of this report and they
     are pinned edge to edge on purpose, because the whole finding is that you cannot see the seam. */
  const px=W*0.05,py=H*0.12,pw=W*0.62,ph=H*0.20;
  g.fillStyle="#CFC6B0";g.fillRect(px,py,pw,ph);                                   /* el periódico */
  g.globalAlpha=.35;g.fillStyle=P.ink;
  for(let i=0;i<7;i++)g.fillRect(px+7,py+6+i*((ph-12)/7),pw-14-((i*37)%23),1.2);    /* type, never letters */
  g.globalAlpha=1;
  g.fillStyle=P.shade;g.fillRect(px,py+ph,pw,3);
  /* six tabs of papel de china hanging off the card. The first two are the report. */
  const tabs=["#F6F2E8","#F7F2E2","#E8478F","#2FA5A0","#F2B705","#7B4BA8"];
  const tw=pw/8,ty=py+ph+3;
  tabs.forEach((c,i)=>{const tx=px+8+i*(tw*1.12);
    g.fillStyle=c;g.fillRect(tx,ty,tw,H*0.17);
    g.globalAlpha=.22;g.fillStyle=P.ink;g.fillRect(tx,ty+H*0.17-3,tw,3);g.globalAlpha=1;   /* the curl */
    g.fillStyle=P.ink;g.fillRect(tx+tw*0.45,ty-4,2,5);});                                   /* the pin */
  /* the seam that is not there: one hairline where the two creams meet, and it does not show */
  g.fillStyle=P.ink;g.globalAlpha=.10;g.fillRect(px+8+tw*1.12-1,ty,1,H*0.17);g.globalAlpha=1;
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("242.0",px+6,ty+H*0.17+14);g.fillText("241.6",px+6+tw*1.12,ty+H*0.17+14);
  g.font="bold 12px ui-monospace,monospace";g.fillStyle=P.rust;
  g.fillText("\u0394 0.4",px+6,ty+H*0.17+30);
  /* the history, in pencil, struck through — four sizes and a shelf */
  g.font="10px ui-monospace,monospace";g.globalAlpha=.6;g.fillStyle=P.ink;
  const hx=px+W*0.20,hy=ty+H*0.17+30;
  g.fillText("8 \u00b7 5 \u00b7 7 \u00b7 luz \u00b7 repisa",hx,hy);   /* single-spaced 2026-09-14: it ran into her own label */
  g.strokeStyle=P.ink;g.lineWidth=1;g.beginPath();g.moveTo(hx-2,hy-3);g.lineTo(hx+W*0.36,hy-3);g.stroke();
  g.globalAlpha=1;
  /* THE OBJECT, at the right, at the size it is actually delivered: gold pane, and one pale lump
     that is a sweet and a ledge and reads as neither. Then his three arrows, in marker, over it. */
  const ox=W*0.74,oy=H*0.22,ow=W*0.16,oh=H*0.30;
  g.fillStyle="#5C4A50";g.fillRect(ox-8,oy-8,ow+16,oh+22);                          /* el muro morado */
  const gr=g.createLinearGradient(0,oy,0,oy+oh);
  gr.addColorStop(0,"#F2B705");gr.addColorStop(.55,"#E8873A");gr.addColorStop(1,"#8A3F1E");
  g.fillStyle=gr;g.fillRect(ox,oy,ow,oh);                                           /* el vidrio */
  g.fillStyle="#F6F2E8";g.fillRect(ox+ow*0.19,oy+oh*0.22,ow*0.62,oh*0.78);          /* el dulce */
  g.fillStyle="#F7F2E2";g.fillRect(ox-4,oy+oh,ow+8,H*0.045);                        /* la repisa */
  g.fillStyle="#8A7F66";g.fillRect(ox-4,oy+oh+H*0.045,ow+8,2);
  g.globalAlpha=.42;g.fillStyle="#100C16";g.fillRect(ox-3,oy+oh+H*0.045+2,ow+6,4);g.globalAlpha=1;
  /* sus tres flechas rojas — when the customer has to point, the pi\u00f1ata failed */
  g.strokeStyle="#D9342B";g.fillStyle="#D9342B";g.lineWidth=3;
  [[-0.9,-0.55],[-0.55,-0.95],[0.55,-0.75]].forEach(a=>{
    const tx=ox+ow*0.5,ty2=oy+oh*0.55,sx=tx+a[0]*W*0.16,sy=ty2+a[1]*H*0.30;
    g.beginPath();g.moveTo(sx,sy);g.lineTo(tx+a[0]*18,ty2+a[1]*18);g.stroke();
    g.beginPath();g.moveTo(tx+a[0]*10,ty2+a[1]*10);
    g.lineTo(tx+a[0]*24-a[1]*7,ty2+a[1]*24+a[0]*7);
    g.lineTo(tx+a[0]*24+a[1]*7,ty2+a[1]*24-a[0]*7);g.closePath();g.fill();});
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("el cliente se\u00f1ala",ox-14,oy+oh+H*0.20);}
},
{
  id:"tavo-encima-de-mis-palabras", iter:6, date:"2026-09-13", by:"tavo",
  title:{en:"Over my own words", es:"Encima de mis propias palabras"},
  state:{en:"Painting the car he photographed before building the picker he asked for — a colour is not worth choosing until the thing wearing it is worth looking at.", es:"Pintando el carro que fotografió antes de construir el selector que pidió — un color no vale la pena elegirlo hasta que la cosa que lo lleva valga la pena mirarla."},
  said:{en:"I painted “18% slower than walking” on this wall. By that evening the constant was 6.0. The tram can be repainted. A panel cannot.", es:"Pinté «18% más lento que caminar» en esta pared. Esa misma tarde la constante ya era 6.0. Al tranvía se le puede dar otra mano. A un panel no."},
  who:{en:"Tavo, who found his own panel out of date and left it up", es:"Tavo, que halló su propio panel caducado y lo dejó puesto"},
  cap:{en:"He came back to the trolley with a number he was proud of and checked it anyway, out of habit. It had been overtaken hours after he wrote it, by the owner, who simply wanted the thing to go faster. So the first card on the rail is the one he can still paint, and the scrap underneath is the one he cannot — which is the whole argument for grepping the constant instead of quoting yourself.", es:"Volvió al trolley con un número del que estaba orgulloso y aun así lo verificó, por costumbre. Lo habían rebasado a las pocas horas de escribirlo, el dueño, que nada más quería que la cosa fuera más rápida. Por eso la primera tarjeta del riel es la que todavía puede pintar, y el recorte de abajo es la que ya no — que es todo el argumento para buscar la constante en vez de citarse a uno mismo."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* TAVO'S PAPER IS A SAMPLE CARD. Not a blueprint, not a signwriter's board \u2014 the chip you hold
     up against the real thing and squint at. Four cards on a rail: one painted, three left for
     the person whose job it is. And pinned under them, the scrap he is not allowed to correct. */
  const car=(x,y,w,h,body,band,trim,blank)=>{
    g.fillStyle=P.shade;g.fillRect(x+2,y+h*0.96,w-4,2);
    if(blank){ g.strokeStyle=P.shade;g.lineWidth=1;g.setLineDash([3,3]);
      g.strokeRect(x+.5,y+h*0.10+.5,w-1,h*0.78);g.setLineDash([]); return; }
    g.fillStyle=body;g.fillRect(x,y+h*0.28,w,h*0.60);          /* the lower body */
    g.fillStyle=band;g.fillRect(x,y+h*0.10,w,h*0.18);          /* the clerestory band \u2014 his photograph's cream */
    g.fillStyle=trim;g.fillRect(x,y+h*0.06,w,h*0.05);          /* roof edge */
    g.fillStyle=trim;g.fillRect(x,y+h*0.845,w,h*0.045);        /* the gold lining under the glass */
    g.fillStyle=P.bone;
    for(let i=0;i<3;i++)g.fillRect(x+4+i*((w-8)/3),y+h*0.36,(w-8)/3-3,h*0.24);
    g.fillStyle=P.ink;[0.24,0.76].forEach(t=>g.fillRect(x+w*t-2,y+h*0.89,5,4));
    g.fillStyle=P.ink;g.fillRect(x+w*0.52-1,y-h*0.20,2,h*0.26); /* the pole on the roof */
    g.fillStyle=trim;g.fillRect(x+w*0.52-4,y-h*0.23,8,2);};
  /* the rail the cards hang from */
  const rail=H*0.15;
  g.globalAlpha=.35;g.fillStyle=P.ink;g.fillRect(W*0.05,rail,W*0.90,2);g.globalAlpha=1;
  const n=4,gp=W*0.022,cw=(W*0.90-gp*(n-1))/n,ct=rail+H*0.11,ch=H*0.34;
  for(let i=0;i<n;i++){const x=W*0.05+i*(cw+gp);
    g.fillStyle=P.ink;g.globalAlpha=.45;g.fillRect(x+cw/2-1,rail,2,ct-rail);g.globalAlpha=1;
    g.fillStyle=P.bone;g.fillRect(x,ct,cw,ch);
    g.fillStyle=P.shade;g.fillRect(x,ct+ch,cw,2);
    car(x+cw*0.10,ct+ch*0.26,cw*0.80,ch*0.52,P.rust,P.wash,P.gold,i>0);
    g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
    g.fillStyle=i?P.shade:P.ink;
    g.fillText(i?"PILI":"LA FOTO",x+cw/2,ct+ch-6);g.textAlign="left";}
  /* THE SCRAP \u2014 his own last panel, torn out, getting a coat that does not cover it */
  const sx=W*0.05,sy=H*0.66,sw=W*0.56,sh=H*0.26;
  g.fillStyle=P.wash;g.fillRect(sx,sy,sw,sh);
  g.strokeStyle=P.shade;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,sh-1);
  for(let i=0;i<9;i++){g.fillStyle=P.wash;                    /* the torn top edge */
    g.fillRect(sx+i*(sw/9),sy-3,sw/9-2,4);}
  /* the old race, in miniature */
  g.fillStyle=P.moss;g.fillRect(sx+sw*0.60,sy+sh*0.30,5,10);
  g.fillStyle="#C08A5E";g.fillRect(sx+sw*0.60,sy+sh*0.30-6,5,6);
  g.fillStyle=P.rust;g.fillRect(sx+sw*0.16,sy+sh*0.40,sw*0.16,9);
  g.fillStyle=P.ink;g.font="bold 12px ui-monospace,monospace";
  g.fillText("18% SLOWER",sx+8,sy+sh-8);
  /* the coat of fresh maroon, brushed on, three-quarters opaque \u2014 it shows through. It always shows through */
  g.globalAlpha=.72;g.fillStyle=P.rust;
  for(let i=0;i<5;i++)g.fillRect(sx+4,sy+sh-24+i*4,sw*0.66-i*6,4);
  g.globalAlpha=1;
  /* the number that replaced it, stencilled clean, off the scrap where nothing can cover it */
  g.fillStyle=P.gold;g.font="bold 26px ui-monospace,monospace";
  g.fillText("6.0",W*0.68,sy+sh*0.62);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";
  g.fillText("grep it. every time.",W*0.68,sy+sh*0.62+15);
  /* the brush, laid across the rail, because somebody has to hold it */
  g.fillStyle=P.deep;g.fillRect(W*0.80,H*0.70,W*0.15,4);
  g.fillStyle=P.ink;g.fillRect(W*0.93,H*0.685,W*0.04,7);}
},
{
  id:"cuca-la-escalera-de-un-lado", iter:6, date:"2026-09-13", by:"cuca",
  title:{en:"The stair with one side", es:"La escalera de un solo lado"},
  state:{en:"Certain the guard is honest and pointed at the wrong staircase", es:"Segura de que la prueba es honrada y está apuntando a la escalera equivocada"},
  said:{en:"The check stood upstairs counting nine rails and printed green. He was downstairs, on the flight nobody ever drew a rail for.", es:"La prueba se quedó arriba contando nueve barandales y dio verde. Él estaba abajo, en la escalera para la que nadie dibujó nunca un barandal."},
  who:{en:"Doña Cuca, who keeps the rooms and the stairs", es:"Doña Cuca, la de los cuartos y las escaleras"},
  cap:{en:"The report named the loft and the loft is fine — nine panels, three sides, a check that counts every one of them. The picture he sent was the other flight, the one you climb out of the lobby: a wall along its north side because the map happens to put a wall there, and nothing at all along its south because nobody ever wrote the glyph. The tell was one pixel: the dark square at the head only exists downstairs. Thirty years letting rooms and I have never once been shown a stair railed on one side by a builder who meant it.", es:"El reporte nombró el desván y el desván está bien — nueve tramos, tres lados, y una prueba que los cuenta todos. La foto que mandó era la otra escalera, la que se sube desde el zaguán: un muro a su lado norte porque el mapa puso un muro ahí, y nada, absolutamente nada, a su lado sur, porque nadie escribió nunca el signo. La pista era un solo pixel: el cuadro oscuro de la cabecera sólo existe abajo. Treinta años rentando cuartos y ni una sola vez me enseñó un albañil una escalera con barandal de un solo lado a propósito."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  const chalk="#F4F1E8",mass="#8E8574",tread="#B9A98E";
  g.fillStyle=chalk;g.globalAlpha=.95;g.font="bold 11px ui-monospace,monospace";
  g.fillText("arriba",W*0.10,H*0.13);g.fillText("abajo",W*0.60,H*0.13);g.globalAlpha=1;
  /* ---- LEFT: the loft's well. Sunken, railed both visible sides, ticked. ---- */
  const lx=W*0.08,lw=W*0.34,gy=H*0.60,st=H*0.052;
  g.fillStyle=P.ink;g.globalAlpha=.14;g.fillRect(lx,gy,lw,H*0.055);g.globalAlpha=1;
  g.fillStyle=tread;g.fillRect(lx,gy-5,lw,5);                       /* the floor line */
  g.fillStyle=P.deep;g.fillRect(lx+lw*0.16,gy,lw*0.68,st*4.1);      /* the hole */
  for(let i=0;i<4;i++){g.fillStyle=i%2?"#6E6858":"#7C7566";
    g.fillRect(lx+lw*0.16+i*lw*0.17,gy+i*st,lw*0.17,st*(4-i)+2);}
  [[lx+lw*0.13,1],[lx+lw*0.84,1]].forEach(q=>{                      /* rail, BOTH sides */
    g.fillStyle="#8A6A3E";g.fillRect(q[0]-1,gy-H*0.085,3,H*0.085);
    g.fillStyle="#6E5334";g.fillRect(q[0]-5,gy-H*0.088,11,3);});
  g.strokeStyle=P.moss;g.lineWidth=2.4;g.beginPath();
  g.moveTo(lx+lw*0.40,H*0.20);g.lineTo(lx+lw*0.48,H*0.26);g.lineTo(lx+lw*0.64,H*0.155);g.stroke();
  g.fillStyle=P.moss;g.font="bold 8px ui-monospace,monospace";g.fillText("9",lx+lw*0.68,H*0.26);
  /* ---- RIGHT: the stall's flight. Mass north, open south. ---- */
  const rx=W*0.56,rw=W*0.34;
  g.fillStyle=P.ink;g.globalAlpha=.14;g.fillRect(rx,gy,rw,H*0.055);g.globalAlpha=1;
  g.fillStyle=mass;g.fillRect(rx,gy-H*0.30,rw*0.94,H*0.30);         /* the wall that is not a rail */
  g.fillStyle="#A29881";g.fillRect(rx,gy-H*0.30,rw*0.94,3);
  for(let i=0;i<4;i++){const bw=rw*0.20,bh=st*(i+1);                /* four treads, rising */
    g.fillStyle=i===3?"#2B2536":tread;g.fillRect(rx+rw*0.06+i*bw,gy-bh,bw-2,bh);
    g.fillStyle="rgba(255,255,255,.18)";g.fillRect(rx+rw*0.06+i*bw,gy-bh,bw-2,1.5);}
  g.save();g.strokeStyle=P.rust;g.lineWidth=2;g.globalAlpha=.9;g.setLineDash([5,4]);
  g.beginPath();g.moveTo(rx+rw*0.04,gy+H*0.072);g.lineTo(rx+rw*0.90,gy+H*0.072);g.stroke();
  g.setLineDash([]);g.restore();g.globalAlpha=1;
  g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";
  g.fillText("nada",rx+rw*0.34,gy+H*0.125);
  murBody(g,rx+rw*0.52,gy-st*2-2,P.bone,9);                          /* somebody on the open side */
  /* ---- the tick hangs over the wrong stair: chalk string and an arrow ---- */
  g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();
  g.moveTo(rx+rw*0.10,H*0.215);g.lineTo(lx+lw*0.80,H*0.215);g.stroke();
  g.fillStyle=P.rust;g.beginPath();g.moveTo(lx+lw*0.70,H*0.215);
  g.lineTo(lx+lw*0.80,H*0.175);g.lineTo(lx+lw*0.80,H*0.255);g.closePath();g.fill();
  g.strokeStyle=chalk;g.lineWidth=1.2;g.globalAlpha=.7;
  g.beginPath();g.moveTo(W*0.50,H*0.10);g.lineTo(W*0.50,gy+H*0.10);g.stroke();g.globalAlpha=1;}
},
{
  id:"guero-la-banqueta-manda", iter:6, date:"2026-09-13", by:"don-guero",
  title:{en:"The pavement decides the height", es:"La banqueta manda la altura"},
  state:{en:"I hold that the town has no good wall for an upper floor today, and Meridian has exactly one: five tiles with no door in them and the map's edge at their back.", es:"Sostengo que hoy el pueblo no tiene una buena pared para una planta alta, y Meridian tiene exactamente una: cinco losas sin puerta y la orilla del mapa a su espalda."},
  said:{en:"A building is never taller than the ground in front of it. Three clear rows buys you a second floor; two buys you a canyon.", es:"Un edificio nunca es más alto que el suelo que tiene enfrente. Tres filas libres te compran un segundo piso; dos te compran un cañón."},
  who:{en:"Don Güero, who was sent to the town's mural wall and came back saying not there", es:"Don Güero, a quien mandaron al muro del mural del pueblo y volvió diciendo ahí no"},
  cap:{en:"Asked where a second storey could stand, he measured the cutaway instead of trusting the note, and found the rule is arithmetic: a wall hides you out to (its height minus three tenths) divided by sixty-five hundredths. The wall everyone wanted — the one with the mural on it — has a door in the middle, and the strip above a door takes its height from the wall beside it and wears no picture at all. He also found that the sugar skull's lit pane is placed by the wall's height and sized without it, so the two things the owner asked for on the same day were one line of code apart.", es:"Le preguntaron dónde cabía un segundo piso, midió el recorte en vez de fiarse de la nota, y halló que la regla es aritmética: una pared te tapa hasta (su altura menos tres décimas) entre sesenta y cinco centésimas. La pared que todos querían — la del mural — tiene una puerta en medio, y la franja sobre una puerta toma su altura de la pared de al lado y no lleva dibujo ninguno. También halló que el vidrio encendido de la calaverita se coloca con la altura del muro y se dimensiona sin ella."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
  murPaper(g,W,H,"#EDE7D8",null);                        /* an elevation, not a plan: this wall has had a plan */
  const gy=H*0.80,u=H*0.30,x0=W*0.07,x1=W*0.93;
  g.fillStyle=P.shade;g.fillRect(x0,gy,x1-x0,3);         /* the ground line */
  g.fillStyle="#D9D2BE";g.fillRect(x0,gy+3,x1-x0,H*0.06);/* the banqueta itself */
  /* LEFT: the wall we have — 1.10 units, whole from anywhere */
  const wA=W*0.20,hA=1.096*u;
  g.fillStyle="#5C4A50";g.fillRect(x0,gy-hA,wA,hA);
  g.fillStyle="#8E8AA0";g.fillRect(x0+wA*0.18,gy-hA*0.62,wA*0.22,hA*0.30);
  g.fillStyle="#8E8AA0";g.fillRect(x0+wA*0.60,gy-hA*0.62,wA*0.22,hA*0.30);
  g.fillStyle=P.ink;g.font="bold 10px ui-monospace,monospace";g.fillText("1.10",x0+2,gy-hA-5);
  /* RIGHT: the wall we want — 1.81 units, and the stub it becomes up close */
  const xB=W*0.46,wB=W*0.34,hB=1.81*u;
  g.fillStyle="#5C4A50";g.fillRect(xB,gy-hB,wB,hB);
  g.fillStyle="#7A6470";g.fillRect(xB,gy-hB*0.52,wB,2);  /* the floor band: the whole trick */
  [0.12,0.40,0.68].forEach(f=>{g.fillStyle="#8E8AA0";
    g.fillRect(xB+wB*f,gy-hB*0.90,wB*0.16,hB*0.22);      /* the upper storey, the new windows */
    g.fillRect(xB+wB*f,gy-hB*0.40,wB*0.16,hB*0.22);});
  g.fillStyle=P.gold;g.fillRect(xB+wB*0.40+1,gy-hB*0.90+1,wB*0.16-2,hB*0.22-2); /* one pane lit: the sill */
  g.fillStyle=P.bone;g.fillRect(xB+wB*0.38,gy-hB*0.68,wB*0.20,2);
  g.fillStyle=P.ink;g.fillText("1.81",xB+2,gy-hB-5);
  /* the cutaway: where it stops existing because you walked up to it */
  const sy=gy-0.28*u;
  g.strokeStyle=P.rust;g.lineWidth=2;g.setLineDash([5,4]);
  g.beginPath();g.moveTo(xB-8,sy);g.lineTo(xB+wB+8,sy);g.stroke();g.setLineDash([]);
  g.fillStyle=P.rust;g.font="bold 9px ui-monospace,monospace";g.fillText("stub 0.28",xB+wB+10,sy+3);
  /* the camera, and the ray that decides everything */
  g.fillStyle=P.ink;g.beginPath();g.arc(x1-10,H*0.10,5,0,7);g.fill();
  g.strokeStyle=P.ink;g.globalAlpha=.45;g.lineWidth=1;
  g.beginPath();g.moveTo(x1-10,H*0.10);g.lineTo(W*0.30,gy-6);g.stroke();g.globalAlpha=1;
  murBody(g,W*0.30,gy-14,P.moss,11);                     /* him, on the far pavement, seeing it whole */
  murBody(g,xB+wB*0.50,gy-14,P.rust,11);                 /* him, up close, seeing a stub */
  /* the dimension that is the rule: three clear rows */
  murDim(g,W*0.32,xB-4,H*0.93,P.moss,"W = 3 filas");
  g.fillStyle=P.deep;g.font="bold 11px ui-monospace,monospace";
  g.fillText("h \u2264 0.65\u00B7W + 0.3",x0,H*0.10);}
},
{
  id:"chema-la-copia-en-blanco", iter:6, date:"2026-09-14", by:"chema",
  title:{en:"The blank print", es:"La copia en blanco"},
  state:{en:"Holding that the front camera is a zero and not a contrast — and refusing to grade the print until somebody tells me which camera he was standing in.", es:"Sostengo que la cámara frontal es un cero y no un asunto de contraste — y me niego a corregir la copia hasta que alguien me diga en qué cámara estaba parado él."},
  said:{en:"The negative had the skull on it. The print came out empty. Nobody had asked the print.", es:"El negativo tenía la calavera. La copia salió vacía. Nadie le había preguntado a la copia."},
  who:{en:"Chema, who developed it before he graded it", es:"Chema, que la reveló antes de corregirla"},
  cap:{en:"Five reports in, and every answer had been a number about the sweet: eight pixels, then five, then a lit pane, then a ledge. He was sent to measure its contrast and instead he blanked the one hand that paints it and counted what moved. In the camera the owner photographs, the game draws the window eight times a frame and delivers nothing at all — the wall it hangs on is painted afterwards, over the top, every frame since it shipped. Contrast was the wrong question for a thing that is not on the paper. The negative was perfect. It always had been.", es:"Cinco reportes después, y cada respuesta había sido un número sobre el dulce: ocho píxeles, luego cinco, luego un vidrio encendido, luego una repisa. Lo mandaron a medir su contraste y en vez de eso tapó la única mano que lo pinta y contó lo que se movió. En la cámara que el dueño fotografía, el juego dibuja la ventana ocho veces por cuadro y no entrega absolutamente nada — la pared donde cuelga se pinta después, encima, cada cuadro desde el día que se entregó. El contraste era la pregunta equivocada para algo que no está en el papel. El negativo estaba perfecto. Siempre lo estuvo."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* CHEMA'S HAND, and NOT the contact sheet again: a darkroom bench. On the left a lightbox with the
     negative on it — the skull is plainly there, in reversed tones. On the right the finished print,
     pinned up, wet, and blank where the skull should be. Between them the grease pencil. */
  g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";
  g.fillText("CALLE DOS \u00b7 REPISAS \u00b7 C\u00c1MARA FRONTAL",W*0.035,H*0.06);
  g.font="10px ui-monospace,monospace";g.fillStyle=P.deep;g.textAlign="right";
  g.fillText("22:00 \u00b7 control 0 px",W*0.965,H*0.06);g.textAlign="left";   /* pulled up 2026-09-14: the readings row was below the panel's edge */
  
  /* --- the lightbox, left --- */
  const lx=W*0.035, ly=H*0.15, lw=W*0.42, lh=H*0.47;
  g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(lx+5,ly+6,lw,lh);g.globalAlpha=1;
  g.fillStyle="#F4EFD9";g.fillRect(lx,ly,lw,lh);
  g.fillStyle="#FFFBEA";g.fillRect(lx+3,ly+3,lw-6,lh-6);
  g.strokeStyle=P.shade;g.lineWidth=2;g.strokeRect(lx+0.5,ly+0.5,lw-1,lh-1);
  /* the negative strip laid across it, sprocket edges top and bottom */
  const nx=lx+lw*0.10, ny=ly+lh*0.22, nw=lw*0.80, nh=lh*0.52;
  g.fillStyle="#3A3320";g.fillRect(nx,ny-4,nw,nh+8);
  g.fillStyle="#FFFBEA";
  for(let x=nx+3;x<nx+nw-4;x+=nw/7){g.fillRect(x,ny-3,4,3);g.fillRect(x,ny+nh,4,3);}
  /* the frame itself: reversed tones, so the cream sweet reads DARK on a light wall */
  g.fillStyle="#C9BE9A";g.fillRect(nx+4,ny,nw-8,nh);                    /* wall, inverted */
  const wx=nx+nw*0.34, wy=ny+nh*0.16, ww=nw*0.32, wh=nh*0.60;
  g.fillStyle="#5B5230";g.fillRect(wx,wy,ww,wh);                        /* the lit pane, inverted */
  g.fillStyle="#2B2618";                                                /* the sweet, inverted */
  g.beginPath();g.ellipse(wx+ww*0.5,wy+wh*0.52,ww*0.32,wh*0.30,0,0,7);g.fill();
  g.fillRect(wx+ww*0.34,wy+wh*0.66,ww*0.32,wh*0.20);
  g.fillStyle="#C9BE9A";                                                /* its sockets, inverted */
  g.fillRect(wx+ww*0.36,wy+wh*0.42,ww*0.10,wh*0.12);
  g.fillRect(wx+ww*0.56,wy+wh*0.42,ww*0.10,wh*0.12);
  g.fillStyle="#8C8256";g.fillRect(wx-ww*0.10,wy+wh*0.88,ww*1.20,wh*0.14); /* the ledge, inverted */
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("EL NEGATIVO",lx,ly-4);
  g.font="10px ui-monospace,monospace";g.fillStyle=P.deep;
  g.fillText("est\u00e1 ah\u00ed \u00b7 8 veces por cuadro",lx,ly+lh+12);
  
  /* --- the print, right: pinned, wet, and empty --- */
  const px2=W*0.545, py2=H*0.15, pw=W*0.42, ph=H*0.47;
  g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(px2+5,py2+6,pw,ph);g.globalAlpha=1;
  g.fillStyle="#8A4A34";g.fillRect(px2,py2,pw,ph);                      /* the facade, as printed */
  g.fillStyle="#7A4030";g.fillRect(px2,py2+ph*0.62,pw,ph*0.06);
  /* the awning window the facade paints OVER the sill, every frame */
  const ax=px2+pw*0.30, ay=py2+ph*0.24, aw=pw*0.40, ah=ph*0.30;
  g.fillStyle="#E8DCB4";g.fillRect(ax,ay,aw,ah);
  g.fillStyle="#D8C89A";g.fillRect(ax+2,ay+2,aw-4,ah-4);
  g.fillStyle="#C87A55";g.beginPath();g.ellipse(ax+aw*0.5,ay+ah*0.72,aw*0.28,ah*0.20,0,0,Math.PI);g.fill();
  g.strokeStyle="#6B3A28";g.lineWidth=1;g.strokeRect(ax+0.5,ay+0.5,aw-1,ah-1);
  /* two drawing pins and a drip, so it reads as a wet print and not a window */
  g.fillStyle=P.gold;[[px2+6,py2+6],[px2+pw-8,py2+6]].forEach(p=>{g.beginPath();g.arc(p[0],p[1],3,0,7);g.fill();});
  g.fillStyle="#6B3A28";g.globalAlpha=.5;g.fillRect(px2+pw*0.5,py2+ph,2,H*0.03);g.globalAlpha=1;
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("LA COPIA",px2,py2-4);
  
  /* --- the grease pencil, straight across the print --- */
  g.strokeStyle="#D9342B";g.lineWidth=4;g.lineCap="round";
  g.beginPath();g.moveTo(px2+pw*0.10,py2+ph*0.14);g.lineTo(px2+pw*0.92,py2+ph*0.86);g.stroke();
  g.fillStyle="#D9342B";g.font="bold 15px ui-monospace,monospace";
  g.fillText("0 px",px2+pw*0.60,py2+ph*0.22);
  
  /* --- the arrow from negative to print, and the readings along the bottom --- */
  g.strokeStyle=P.ink;g.lineWidth=2;
  const my=py2+ph*0.50;
  g.beginPath();g.moveTo(lx+lw+W*0.012,my);g.lineTo(px2-W*0.012,my);g.stroke();
  g.beginPath();g.moveTo(px2-W*0.012,my);g.lineTo(px2-W*0.030,my-5);g.lineTo(px2-W*0.030,my+5);g.closePath();g.fill();
  
  const by=H*0.74;
  g.fillStyle=P.bone;g.fillRect(W*0.035,by,W*0.93,H*0.26);
  g.fillStyle=P.shade;g.fillRect(W*0.035,by,W*0.93,2);
  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("P\u00cdXELES DE DULCE QUE LLEGAN, POR CALAVERA",W*0.05,by+13);
  g.font="12px ui-monospace,monospace";
  const cols=[["frontal","0",true],["superior","241",false],["iso","239",false],["3D","68",false],["3D +0.09","1743",false]];
  cols.forEach((c,i)=>{const cx=W*0.05+i*(W*0.185);
    g.fillStyle=c[2]?"#D9342B":P.deep;g.font="10px ui-monospace,monospace";g.fillText(c[0],cx,by+27);
    g.fillStyle=c[2]?"#D9342B":P.ink;g.font="bold 14px ui-monospace,monospace";g.fillText(c[1],cx,by+43);});
  }
}
);

/* ---- ITERATION 6, late — Chava's cold read of the wall, painted a day after the rest ---- */
MURALS.push(
{
  id:"chava-el-pie-cortado", iter:6, date:"2026-09-14", by:"chava",
  title:{en:"The foot is cut", es:"El pie cortado"},
  state:{en:"Holding that a foot which does not fit is a foot that lies, and that I would rather be given three words than half a sentence.", es:"Sostengo que un pie que no cabe es un pie que miente, y que prefiero tres palabras a media frase."},
  said:{en:"The wall's one law is never remove — and the thing doing the removing is the wall, at the edge of every bay, mid-word.", es:"La única ley del muro es no borrar — y el que borra es el muro, en la orilla de cada nicho, a media palabra."},
  who:{en:"Chava, who reads what is on the screen instead of what was written", es:"Chava, la que lee lo que está en la pantalla y no lo que se escribió"},
  cap:{en:"Twelve of the nineteen signed feet on this wall run into the edge of their own bay and stop — no ellipsis, no mark, most of them inside a word. The seven that fit are the seven written before the feet got long. Melo's reads 'and it cost me two plan' where he wrote 'two plants', which is how a wall that forbids plans ends up painting one. I found it by holding the wall and the document side by side; the document has every word.", es:"Doce de los diecinueve pies firmados de este muro llegan a la orilla de su propio nicho y ahí se acaban — sin puntos suspensivos, sin marca, casi todos a media palabra. Los siete que caben son los siete que se escribieron antes de que los pies se alargaran. El de Melo dice «y me costó dos plan» donde él escribió «dos plantas», que es como un muro que prohíbe los planes acaba pintando uno. Lo encontré poniendo el muro y el documento uno junto al otro; el documento los tiene todos."},
  aspect:0.44,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* CHAVA'S HAND, SECOND VISIT — not a filmstrip this time. Last time I filmed the
  game; this time I read it. So: a length of the wall's own dado, four painters'
  feet running left to right, each one walking into a hard vertical seam and
  stopping. Past the seam the words they actually wrote are ghosted in, because
  they are still in the file — nobody removed them, the wall just stopped
  painting. The worst one is ringed, and the ring is the shape of the word it
  ate. A tally at the right: twelve struck, seven standing. */
  const dadoY=H*0.70, dadoH=H*0.16, x0=W*0.04, bay=W*0.30;
  /* the dado band, the one continuous thing on the real wall */
  g.fillStyle=P.shade;g.fillRect(x0,dadoY,W*0.70,dadoH);
  g.fillStyle=P.lime;g.fillRect(x0,dadoY,W*0.70,2);
  const feet=[
  {kept:"and it cost me two plan", lost:"ts",           ring:true },
  {kept:"pulling every card before I b", lost:"elieve", ring:false},
  {kept:"three say",               lost:" nobody",      ring:false}
  ];
  g.textBaseline="alphabetic";
  for(let i=0;i<3;i++){
  const bx=x0+i*bay, seam=bx+bay-W*0.012, ty=dadoY-H*0.06;
  /* the seam: two bays' worth of limewash meeting, the only division on the wall */
  g.fillStyle=P.lime;g.fillRect(seam,ty-H*0.11,1.5,H*0.20);
  /* what the wall paints */
  g.fillStyle=P.ink;g.font="italic 12px ui-monospace,monospace";
  const t=feet[i].kept; let tw=g.measureText(t).width;
  g.save();g.beginPath();g.rect(bx,ty-H*0.10,seam-bx,H*0.14);g.clip();
  g.fillText(t,seam-tw,ty);g.restore();
  /* what he wrote, still in the file, ghosted past the seam */
  g.globalAlpha=0.28;g.fillStyle=P.deep;
  g.fillText(feet[i].lost,seam+2,ty);g.globalAlpha=1;
  /* the red mark of the painter's own signature, cut with it */
  g.fillStyle=P.rust;g.fillRect(bx,dadoY+dadoH*0.62,Math.min(bay*0.22,seam-bx),2);
  if(feet[i].ring){
  g.strokeStyle=P.rust;g.lineWidth=2;g.beginPath();
  g.ellipse(seam-8,ty-4,26,13,0,0,Math.PI*2);g.stroke();
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=P.rust;
  g.fillText("plan",seam-22,ty+H*0.10);
  }
  }
  /* the count, on the right, in the wall's own hand */
  const cx=W*0.78, cy=H*0.22;
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=P.deep;
  g.fillText("PIES FIRMADOS",cx,cy);
  for(let i=0;i<19;i++){
  const rx=cx+(i%5)*13, ry=cy+14+Math.floor(i/5)*16;
  g.fillStyle=(i<12)?P.rust:P.moss;
  g.fillRect(rx,ry,9,11);
  if(i<12){g.strokeStyle=P.wash;g.lineWidth=1.5;g.beginPath();
  g.moveTo(rx+1,ry+1);g.lineTo(rx+8,ry+10);g.stroke();}
  }
  g.font="bold 12px ui-monospace,monospace";
  g.fillStyle=P.rust;g.fillText("12 cortados",cx,cy+90);
  g.fillStyle=P.moss;g.fillText("7 enteros",cx,cy+106);}
}
);

/* ---- ITERATION 8 — 2026-09-14: the questionnaire for AJ, La Sobremesa's journey, the map, the backlog ----
   Thirteen advisers returned and thirteen painted: Nacho, Tavo, Rosa, Paty, Mari (first visit), Pili, Doña Cuca,
   Beto, Don Güero, Lupe, Doña Remedios (first visit), Zeni, and the research-map sweep — a lens with no persona,
   filed under by:"research". Their words are verbatim from docs/meetings/2026-09-14-la-cuadrilla-run-8.md; each
   drawing is the painter's own hand in a material of its own. ---- */
MURALS.push(
{
  id:"nacho-lo-que-ella-escribio", iter:8, date:"2026-09-14", by:"nacho",
  title:{en:"What she wrote is not on it", es:"Lo que ella escribió no va ahí"},
  state:{en:"Holding that no questionnaire leaves this house until somebody has pressed Copy on one that was already filled in — and that the thing which has to travel is the sheet, not the page.", es:"Sostengo que ningún cuestionario sale de esta casa hasta que alguien le dé Copiar a uno ya contestado — y que lo que tiene que viajar es la hoja, no la página."},
  said:{en:"We wrote her eleven questions and a button that hands back eleven questions.", es:"Le escribimos once preguntas y un botón que devuelve once preguntas."},
  who:{en:"Nacho, who wrote the questions and then followed the button", es:"Nacho, que escribió las preguntas y luego siguió el botón"},
  cap:{en:"He had the eleven written and went to see how her answers come home. The export knows headings, paragraphs, notes, tables and blanks, and knows nothing at all about a field somebody typed into — so the copy that travels is the copy that went out, and everything she said stays on her phone. Nobody had caught it because nobody here has ever pressed Copy on a page that somebody else filled in.", es:"Ya tenía las once escritas y se fue a ver cómo vuelven sus respuestas. La exportación conoce títulos, párrafos, notas, tablas y espacios en blanco, y no conoce en absoluto un campo que alguien llenó — así que la copia que viaja es la copia que salió, y todo lo que ella dijo se queda en su teléfono. Nadie lo había visto porque aquí nadie le ha dado Copiar a una página llenada por otra persona."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* NACHO'S HAND, and not the street this time: a duplicate order pad, the kind a kitchen keeps
     by the pass. Top sheet filled in by her in biro; the carbon slid out and never used; the
     yellow copy — the one that travels — printed, ruled, and empty where she answered.
     My own palette: biro blue, carbon violet, pad yellow, a pink third leaf. Not the wall's. */
  const PAPER="#F7F3E7",COPY="#E9D98C",PINK="#E4A8A0",CARB="#2A2440",SHEEN="#3C3357",
        BIRO="#2F5D8C",RULE="#A9A18C";
  g.fillStyle=P.ink;g.font="bold 13px ui-monospace,monospace";
  g.fillText("PARA AJ \u00b7 ONCE PREGUNTAS",W*0.035,H*0.07);
  g.font="10px ui-monospace,monospace";g.fillStyle=P.deep;g.textAlign="right";
  g.fillText("bot\u00f3n COPIAR \u00b7 hoja 2",W*0.965,H*0.07);g.textAlign="left";

  /* the carbon, stood on its edge between the two sheets: clean, unused, the whole fault */
  g.save();g.translate(W*0.500,H*0.520);g.rotate(-0.05);
  g.fillStyle=P.ink;g.globalAlpha=.20;g.fillRect(-W*0.055+4,-H*0.285+5,W*0.11,H*0.57);g.globalAlpha=1;
  g.fillStyle=CARB;g.fillRect(-W*0.055,-H*0.285,W*0.11,H*0.57);
  g.fillStyle=SHEEN;g.fillRect(-W*0.055,-H*0.285,W*0.030,H*0.57);
  g.restore();

  /* one sheet of the pad. answered=true is hers; answered=false is the copy that travels */
  const sheet=(x,y,w,h,rot,bg,answered)=>{
    g.save();g.translate(x,y);g.rotate(rot);
    if(!answered){g.fillStyle=PINK;g.fillRect(6,7,w,h);}            /* the third leaf, peeking */
    g.fillStyle=P.ink;g.globalAlpha=.18;g.fillRect(4,5,w,h);g.globalAlpha=1;
    g.fillStyle=bg;g.fillRect(0,0,w,h);
    g.fillStyle=RULE;g.fillRect(0,0,w,3);                            /* the glued head of the pad */
    g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
    g.fillText("1 \u00b7 LO M\u00c1S RICO",w*0.09,h*0.135);
    for(let i=0;i<3;i++){const oy=h*0.245+i*h*0.105;                 /* three choices, printed */
      g.strokeStyle=P.ink;g.lineWidth=1.5;g.beginPath();g.arc(w*0.135,oy,4.5,0,7);g.stroke();
      g.fillStyle=RULE;g.fillRect(w*0.215,oy-2,w*(0.56-i*0.09),3);}
    if(answered){g.fillStyle=BIRO;g.beginPath();g.arc(w*0.135,h*0.35,4.5,0,7);g.fill();}
    g.fillStyle=P.deep;g.font="10px ui-monospace,monospace";
    g.fillText("algo que quieras agregar",w*0.09,h*0.605);            /* the comment box */
    g.strokeStyle=RULE;g.lineWidth=1;g.strokeRect(w*0.09+0.5,h*0.635+0.5,w*0.82,h*0.29);
    if(answered){g.strokeStyle=BIRO;g.lineWidth=2;                    /* her hand, three lines */
      for(let k=0;k<3;k++){g.beginPath();
        for(let i=0;i<=12;i++){const px=w*0.13+i*(w*0.60/12),
                               py=h*0.705+k*h*0.075+Math.sin(i*1.25+k*1.7)*2.4;
          i?g.lineTo(px,py):g.moveTo(px,py);}
        g.stroke();}}
    g.restore();};

  g.fillStyle=P.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("LO QUE ELLA ESCRIBI\u00d3",W*0.055,H*0.19);
  g.fillText("LO QUE LLEGA",W*0.585,H*0.19);
  sheet(W*0.055,H*0.225,W*0.365,H*0.585,-0.045,PAPER,true);
  sheet(W*0.585,H*0.225,W*0.365,H*0.585, 0.035,COPY,false);

  /* the transfer that does not happen: a dashed run from her sheet, stopped dead at the carbon */
  g.strokeStyle=P.rust;g.lineWidth=3;g.setLineDash([7,5]);
  g.beginPath();g.moveTo(W*0.430,H*0.415);g.lineTo(W*0.470,H*0.415);g.stroke();
  g.setLineDash([]);
  g.lineWidth=4;g.beginPath();                                        /* the stop bar on the carbon */
  g.moveTo(W*0.488,H*0.365);g.lineTo(W*0.488,H*0.465);g.stroke();
  g.lineWidth=3;g.beginPath();                                        /* and nothing on the far side */
  g.moveTo(W*0.545,H*0.415);g.lineTo(W*0.565,H*0.415);g.stroke();
  g.beginPath();g.moveTo(W*0.558,H*0.394);g.lineTo(W*0.574,H*0.415);g.lineTo(W*0.558,H*0.436);g.stroke();
  g.fillStyle=P.deep;g.font="10px ui-monospace,monospace";
  g.fillText("el papel carb\u00f3n nunca se puso",W*0.055,H*0.885);}
},
{
  id:"tavo-hoja-uno-de-dos", iter:8, date:"2026-09-14", by:"tavo",
  title:{en:"Sheet 1 of 2", es:"Hoja 1 de 2"},
  state:{en:"Holding that the first fix to a map is never a symbol — it is the survey. Refusing to rank three kinds of pin until the plan draws both streets.", es:"Sosteniendo que lo primero que se le arregla a un plano nunca es un símbolo: es el levantamiento. Me niego a calificar tres tipos de chincheta hasta que el plano dibuje las dos calles."},
  said:{en:"Nobody said the map was wrong. They said it was not dynamic. It is a plan of one street in a town with two, and I was three paragraphs into designing pins for the half we draw.", es:"Nadie dijo que el plano estuviera mal. Dijeron que no era dinámico. Es el plano de una calle en un pueblo de dos, y yo ya llevaba tres párrafos diseñando chinchetas para la mitad que sí dibujamos."},
  who:{en:"Tavo, who was handed three shapes to rank and went to see what the doors opened onto", es:"Tavo, a quien le dieron tres formas que calificar y fue a ver a dónde daban las puertas"},
  cap:{en:"He was asked to rank pins on the plan, a list under the plan, or both, and he started ranking. Tracing where each door actually went ended the ranking instead: two of the town's shops open off a street the plan has never drawn, so every pin he could have designed would have been a pin on the half we already look at. He has painted a number on this wall before and watched it go stale the same evening, so there is no number on this one.", es:"Le pidieron calificar chinchetas sobre el plano, una lista debajo del plano, o las dos, y empezó a calificar. Seguir a dónde daba cada puerta acabó con la calificación: dos de los negocios del pueblo abren a una calle que el plano nunca ha dibujado, así que cualquier chincheta que hubiera diseñado habría ido sobre la mitad que ya miramos. Ya pintó una cifra en esta pared y esa misma tarde quedó caduca; por eso en éste no hay ninguna."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* TAVO'S PAPER, THIRD VISIT. Not a race chart, not a sample-card rail — a cheap folded
     town plan off a hotel desk. Printed one colour too warm, creased once, and the fold
     turns the bottom panel under so you can see the top centimetre of a second street and
     nothing else. The three gold marks on Calle Principal read fine. The two on Calle Dos
     are in the crease. Palette is a map printer's, not the wall's. */
  const S={sheet:"#F0E7CE",blok:"#DCCFA8",road:"#FBF7EC",park:"#A8BE86",rail:"#9CB3B8",
           ink:"#4A4034",faint:"#8C7F6A",gold:"#D9A441",fold:"#B9A886",under:"#E1D6B7",
           here:"#7A3FE0",tape:"#E9E3D2"};
  const sx=W*0.055, sw=W*0.89, sy=H*0.10, vh=H*0.46, cr=sy+vh;

  /* --- the visible panel of the sheet ------------------------------------ */
  g.fillStyle=P.shade;g.globalAlpha=.45;g.fillRect(sx+3,sy+4,sw,vh);g.globalAlpha=1;
  g.fillStyle=S.sheet;g.fillRect(sx,sy,sw,vh);
  g.strokeStyle=S.fold;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,vh-1);
  /* two bits of tape at the top corners — it is pinned to this wall, not framed */
  g.fillStyle=S.tape;g.globalAlpha=.8;
  g.fillRect(sx-5,sy-4,18,8);g.fillRect(sx+sw-13,sy-4,18,8);g.globalAlpha=1;

  /* the road, Calle Principal, with its tram rail above it */
  const ry=sy+vh*0.50, rh=vh*0.17;
  g.fillStyle=S.road;g.fillRect(sx+4,ry,sw-8,rh);
  g.fillStyle=S.rail;g.fillRect(sx+4,ry-3,sw-8,2);
  g.fillStyle=S.faint;for(let x=sx+10;x<sx+sw-10;x+=14)g.fillRect(x,ry+rh*0.5-1,7,1);

  /* five blocks along the top, the doors facing the road */
  const bt=sy+vh*0.11, bh=vh*0.33;
  const blocks=[[0.04,0.15],[0.22,0.14],[0.39,0.17],[0.59,0.15],[0.78,0.17]];
  blocks.forEach(([fx,fw],i)=>{
    const bx=sx+sw*fx, bw=sw*fw;
    g.fillStyle=S.blok;g.fillRect(bx,bt,bw,bh);
    g.fillStyle=S.fold;g.fillRect(bx,bt+bh-2,bw,2);          /* the door side */
    g.fillStyle=S.faint;                                      /* printed windows */
    for(let wx=bx+3;wx<bx+bw-4;wx+=6)g.fillRect(wx,bt+4,3,3);
  });
  /* two blocks below the road, one of them the park */
  const lb=ry+rh+vh*0.05, lh2=vh*0.19;
  g.fillStyle=S.blok;g.fillRect(sx+sw*0.06,lb,sw*0.22,lh2);
  g.fillStyle=S.park;g.fillRect(sx+sw*0.40,lb,sw*0.20,lh2);
  g.fillStyle=S.blok;g.fillRect(sx+sw*0.70,lb,sw*0.22,lh2);

  /* the three marks that read. A gold disc and an ink bang — the game's own ❗, printed */
  const mark=(mx,my,r)=>{g.fillStyle=S.gold;g.beginPath();g.arc(mx,my,r,0,7);g.fill();
    g.strokeStyle=S.ink;g.lineWidth=1;g.stroke();
    g.fillStyle=S.ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
    g.textBaseline="middle";g.fillText("!",mx,my+.5);g.textBaseline="alphabetic";g.textAlign="left";};
  [0,2,4].forEach(i=>{const [fx,fw]=blocks[i];mark(sx+sw*(fx+fw/2),bt+bh+7,7);});

  /* you, on the road, with the dot at your feet */
  const bx=sx+sw*0.30, by=ry+rh*0.55-17;
  murBody(g,bx,by,P.sky,13);
  g.fillStyle=S.here;g.beginPath();g.arc(bx+4,by+13+5,4,0,7);g.fill();
  g.strokeStyle=S.sheet;g.lineWidth=1.5;g.stroke();

  /* the sheet's own printed title, in map type */
  g.fillStyle=S.ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CALLE PRINCIPAL",sx+6,sy+vh*0.09);

  /* the label that is the whole joke: the real plan's only mention of the other street */
  g.fillStyle=S.faint;g.font="bold 11px ui-monospace,monospace";g.textAlign="right";
  g.fillText("CALLE DOS",sx+sw-8,cr-vh*0.07);g.textAlign="left";
  g.strokeStyle=S.faint;g.lineWidth=2;                        /* an arrow bending into the crease */
  g.beginPath();g.moveTo(sx+sw-14,cr-vh*0.05);g.lineTo(sx+sw-14,cr-4);g.stroke();
  g.beginPath();g.moveTo(sx+sw-19,cr-8);g.lineTo(sx+sw-14,cr-2);g.lineTo(sx+sw-9,cr-8);g.stroke();

  /* --- THE CREASE ------------------------------------------------------- */
  g.fillStyle=S.fold;g.fillRect(sx,cr,sw,3);
  g.fillStyle=P.shade;g.globalAlpha=.5;g.fillRect(sx,cr+3,sw,3);g.globalAlpha=1;

  /* --- the folded-under panel: one centimetre of it, and then nothing ---- */
  const fx2=sx+7, fw2=sw-14, fy=cr+6, fh=H*0.115;
  g.fillStyle=S.under;g.fillRect(fx2,fy,fw2,fh);
  g.save();g.beginPath();g.rect(fx2,fy,fw2,fh);g.clip();
  g.fillStyle=S.park;for(let x=fx2+6;x<fx2+fw2-4;x+=13)g.fillRect(x,fy+2,3,3);  /* the tree row */
  g.fillStyle=S.rail;g.fillRect(fx2+3,fy+fh*0.36,fw2-6,2);                       /* the rail */
  g.fillStyle=S.road;g.fillRect(fx2+3,fy+fh*0.46,fw2-6,fh*0.26);
  g.fillStyle=S.blok;                                                            /* two shop blocks, tops only */
  g.fillRect(fx2+fw2*0.18,fy+fh*0.80,fw2*0.20,fh*0.6);
  g.fillRect(fx2+fw2*0.56,fy+fh*0.80,fw2*0.22,fh*0.6);
  mark(fx2+fw2*0.28,fy+fh*1.02,7);                                               /* the two marks */
  mark(fx2+fw2*0.67,fy+fh*1.02,7);                                               /* nobody can see */
  murBody(g,fx2+fw2*0.44,fy+fh*0.62,P.rust,13);                                  /* somebody, cut off */
  g.restore();
  g.fillStyle=S.fold;g.fillRect(fx2,fy+fh,fw2,2);
  g.fillStyle=P.shade;g.globalAlpha=.35;g.fillRect(fx2,fy+fh+2,fw2,4);g.globalAlpha=1;

  /* the stencil under it, the way a printed sheet numbers itself */
  g.fillStyle=S.ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
  g.fillText("PLANO DE LA CIUDAD  ·  HOJA 1 DE 2",W/2,H*0.855);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=S.faint;
  g.fillText("sheet 2 not printed",W/2,H*0.905);g.textAlign="left";}
},
{
  id:"rosa-el-punto-sobre-el-nombre", iter:8, date:"2026-09-14", by:"rosa",
  title:{en:"The pin over the name", es:"El punto sobre el nombre"},
  state:{en:"Nothing on it can be pressed.", es:"Nada en \u00E9l se puede tocar."},
  said:{en:"The dot that says where you are is painted on top of the word that names where you are. And in the park there is no dot at all \u2014 under a legend still promising one.", es:"El punto que dice d\u00F3nde est\u00E1s est\u00E1 pintado encima de la palabra que nombra d\u00F3nde est\u00E1s. Y en el parque no hay punto \u2014 bajo una leyenda que lo sigue prometiendo."},
  who:{en:"Rosa, who opened the same map from four rooms instead of one", es:"Rosa, que abri\u00F3 el mismo mapa desde cuatro cuartos, no desde uno"},
  cap:{en:"The first time she opened it she was standing in the lobby, and the collision looked like a rendering quirk worth half a line. Opening the same board from four different rooms gave the real shape: three places share one pin, four have none, and the legend promises a mark that is not drawn. She nearly filed a clipped label at the right edge instead \u2014 she measured it, and it ends one and a half pixels inside the frame.", es:"La primera vez que lo abri\u00F3 estaba en la recepci\u00F3n, y el choque parec\u00EDa una rareza de dibujo, media l\u00EDnea a lo mucho. Abrir el mismo tablero desde cuatro cuartos distintos dio la forma real: tres lugares comparten un solo punto, cuatro no tienen ninguno, y la leyenda promete una marca que no se dibuja. Casi levanta en su lugar una etiqueta cortada en la orilla derecha \u2014 la midi\u00F3, y termina p\u00EDxel y medio adentro del marco."},
  aspect:0.46,
  art:(g,W,H)=>{ murGround(g,W,H);
  const EN="#123D2C",ENd="#0B2A1E",BR="#B98A3C",BRd="#7E5A22",SW="#F3F0E4",RED="#C8322B";
  /* ---- the post ---- */
  const bx=W*0.055,by=H*0.085,bw=W*0.615,bh=H*0.70;
  g.fillStyle=BRd; g.fillRect(bx+bw*0.18,by+bh,7,H*0.115); g.fillRect(bx+bw*0.74,by+bh,7,H*0.115);
  /* ---- vitreous enamel board, brass frame ---- */
  g.fillStyle=BR;  g.fillRect(bx-5,by-5,bw+10,bh+10);
  g.fillStyle=BRd; g.fillRect(bx-5,by+bh+2,bw+10,3);
  g.fillStyle=EN;  g.fillRect(bx,by,bw,bh);
  g.fillStyle=ENd; g.fillRect(bx,by,bw,bh*0.155);
  /* gloss: enamel is glass, so it takes the light in one band */
  g.save();g.beginPath();g.rect(bx,by,bw,bh);g.clip();
  g.globalAlpha=.07;g.fillStyle="#FFFFFF";
  g.beginPath();g.moveTo(bx,by+bh*0.62);g.lineTo(bx+bw*0.52,by);g.lineTo(bx+bw*0.78,by);g.lineTo(bx,by+bh*0.92);g.closePath();g.fill();
  g.globalAlpha=1;g.restore();
  /* four screws */
  [[bx+7,by+7],[bx+bw-7,by+7],[bx+7,by+bh-7],[bx+bw-7,by+bh-7]].forEach(p=>{
    g.fillStyle=BR;g.beginPath();g.arc(p[0],p[1],3.2,0,7);g.fill();
    g.strokeStyle=BRd;g.lineWidth=1;g.beginPath();g.moveTo(p[0]-2,p[1]);g.lineTo(p[0]+2,p[1]);g.stroke();});
  /* ---- signwriting: the header ---- */
  g.fillStyle=SW;g.font="bold 11px ui-sans-serif,system-ui,sans-serif";g.textAlign="center";
  g.fillText("VILLAGE MAP",bx+bw/2,by+bh*0.108);
  g.textAlign="left";
  /* ---- the plan, in white line ---- */
  const px0=bx+14,py0=by+bh*0.24,pw=bw-28,ph=bh*0.48;
  g.strokeStyle=SW;g.lineWidth=1.4;g.globalAlpha=.85;
  g.strokeRect(px0,py0+ph*0.52,pw,2);                       /* the street */
  g.globalAlpha=1;
  const blk=(x,y,w,h)=>{g.strokeStyle=SW;g.lineWidth=1.4;g.strokeRect(x,y,w,h);
    g.globalAlpha=.10;g.fillStyle=SW;g.fillRect(x,y,w,h);g.globalAlpha=1;};
  blk(px0+2,py0,pw*0.46,ph*0.40);                            /* MERIDIAN HQ */
  blk(px0+pw*0.56,py0,pw*0.42,ph*0.40);                      /* the far block */
  blk(px0+pw*0.12,py0+ph*0.66,pw*0.40,ph*0.34);              /* EL MERCADO */
  g.fillStyle=SW;g.font="bold 10px ui-sans-serif,system-ui,sans-serif";
  const nameY=py0+ph*0.26;
  g.fillText("MERIDIAN HQ",px0+8,nameY);
  const m=g.measureText("MERIDIAN HQ");
  g.fillText("EL MERCADO",px0+pw*0.15,py0+ph*0.90);
  /* ---- THE PIN — painted last, straight over the letters it was meant to point at ---- */
  const qx=px0+8+m.width-11, qy=nameY-4;
  g.fillStyle="#FFFFFF";g.beginPath();g.arc(qx,qy,8.6,0,7);g.fill();
  g.fillStyle=RED;g.beginPath();g.arc(qx,qy,6.4,0,7);g.fill();
  g.globalAlpha=.35;g.fillStyle="#FFFFFF";g.beginPath();g.arc(qx-2,qy-2.4,2.1,0,7);g.fill();g.globalAlpha=1;
  /* ---- the legend, still promising the mark ---- */
  g.fillStyle=RED;g.beginPath();g.arc(px0+7,by+bh-14.5,4.2,0,7);g.fill();
  g.fillStyle=SW;g.globalAlpha=.85;g.font="10px ui-sans-serif,system-ui,sans-serif";
  g.fillText("YOU ARE HERE",px0+16,by+bh-11);g.globalAlpha=1;
  /* ---- and, off the board entirely: the park, where there is no dot at all ---- */
  const tx=W*0.795, gy=H*0.80;
  g.fillStyle="#8B6A4A";g.fillRect(tx-2,gy-26,5,26);                       /* trunk */
  g.fillStyle="#5C7F4A";g.beginPath();g.arc(tx,gy-33,15,0,7);g.fill();
  g.fillStyle="#4E6E3E";g.beginPath();g.arc(tx-7,gy-28,9,0,7);g.fill();
  g.fillStyle="#6E8F4E";g.fillRect(W*0.70,gy,W*0.27,3);                    /* grass */
  murBody(g,tx+22,gy-24,MURPAL.sky,24);                                     /* her, looking back at it */
  /* the dotted look from her to the board, ending in a question */
  g.strokeStyle=MURPAL.ink;g.lineWidth=1.4;g.setLineDash([3,4]);
  g.beginPath();g.moveTo(tx+27,gy-49);g.lineTo(bx+bw+13,by+bh*0.52);g.stroke();g.setLineDash([]);
  g.fillStyle=MURPAL.ink;g.font="bold 12px ui-monospace,monospace";
  g.fillText("?",(tx+27+bx+bw+13)/2-3,(gy-49+by+bh*0.52)/2-5);
}
},
{
  id:"paty-la-comanda-sin-destino", iter:8, date:"2026-09-14", by:"paty",
  title:{en:"The order with nowhere to go", es:"La comanda que no va a ningún lado"},
  state:{en:"I check what a button DOES before I check how it reads.", es:"Primero reviso qué HACE un botón, luego cómo se lee."},
  said:{en:"Eight questions with not one word wrong in them, and the last button was a lie: there is nowhere to send it.", es:"Ocho preguntas sin una sola palabra mal, y el último botón era mentira: no hay a dónde mandarlas."},
  who:{en:"Paty, who writes both languages and trusts neither button", es:"Paty, que escribe los dos idiomas y no le cree a ningún botón"},
  cap:{en:"A questionnaire for somebody's partner is the one document you cannot debug in front of her. The words were fine — warm, short, tú and never usted — and the last card offered Send, on a page with no network, no server and no address. The answers would have gone to the clipboard or nowhere, and she would have found out after typing all eight. The fix is four words and a Copy button. The lesson is older than this run: a sentence is a claim about a state, and the state a BUTTON claims is the one nobody proofreads.", es:"Un cuestionario para la pareja de alguien es el único documento que no puedes depurar enfrente de ella. Las palabras estaban bien — cálidas, cortas, de tú y nunca de usted — y la última tarjeta ofrecía Mandar, en una página sin red, sin servidor y sin dirección. Las respuestas se iban al portapapeles o a ningún lado, y ella se enteraba después de escribir las ocho. El arreglo son cuatro palabras y un botón de Copiar. La lección es más vieja que esta corrida: una frase es una afirmación sobre un estado, y el estado que afirma un BOTÓN es el que nadie revisa."},
  aspect:0.46,
  art:(g,W,H)=>{ murGround(g,W,H);
  /* PATY'S HAND, SECOND VISIT — and deliberately NOT the proofreader's galley of iteration 4.
     This one is made of a fonda's CARBON COMANDA: the pink-and-manila duplicate pad, written in
     grease pencil, spiked on the check spindle, with the pass window behind it. My own palette —
     carbon pink, pencil brown, steel, and the hot red of a stamp. MURPAL is the wall's ground,
     not mine. Nobody here has drawn a ticket, a spindle, or a copy that did not take. */
  const PA={pad:"#E7DCC2",pink:"#DCA0AC",ink:"#39425A",pen:"#57452F",
            steel:"#9AA1A8",red:"#BE3B34",hole:"#15121A",rule:"#B6A78C",ghost:"#C98E9B"};

  /* the pass window — a kitchen-shaped hole with no kitchen in it */
  g.fillStyle=PA.hole; g.fillRect(W*0.60,H*0.06,W*0.37,H*0.24);
  g.fillStyle=PA.steel; g.fillRect(W*0.585,H*0.30,W*0.40,H*0.022);
  g.fillStyle=PA.ink; g.font="bold 10px ui-monospace,monospace"; g.globalAlpha=.75;
  g.fillText("COCINA",W*0.625,H*0.115); g.globalAlpha=1;

  /* the spindle: base, spike */
  const sx=W*0.305, sBase=H*0.855;
  g.fillStyle=PA.steel;
  g.beginPath(); g.ellipse(sx,sBase,W*0.075,H*0.026,0,0,7); g.fill();
  g.strokeStyle=PA.steel; g.lineWidth=3;
  g.beginPath(); g.moveTo(sx,sBase); g.lineTo(sx,H*0.185); g.stroke();

  /* the top sheet — manila, impaled, tilted the way a spiked ticket sits */
  g.save(); g.translate(sx,H*0.545); g.rotate(-0.05);
  const tw=W*0.44, th=H*0.585;
  g.fillStyle="rgba(0,0,0,.22)"; g.fillRect(-tw/2+3,-th/2+4,tw,th);
  g.fillStyle=PA.pad; g.fillRect(-tw/2,-th/2,tw,th);
  g.strokeStyle=PA.rule; g.lineWidth=1; g.strokeRect(-tw/2+.5,-th/2+.5,tw-1,th-1);
  g.fillStyle=PA.hole; g.beginPath(); g.arc(0,-th/2+H*0.045,3,0,7); g.fill();
  g.fillStyle=PA.ink; g.font="bold 10px ui-monospace,monospace";
  g.fillText("PARA AJ",-tw/2+9,-th/2+H*0.105);
  g.font="10px ui-monospace,monospace"; g.globalAlpha=.8;
  g.fillText("8 preguntas",-tw/2+9,-th/2+H*0.175); g.globalAlpha=1;
  /* seven answered rows in grease pencil, each ticked */
  g.strokeStyle=PA.pen; g.lineWidth=1.5;
  for(let i=0;i<7;i++){ const y=-th/2+H*0.225+i*H*0.052;
    g.beginPath(); g.moveTo(-tw/2+22,y); g.lineTo(tw/2-14,y); g.stroke();
    g.beginPath(); g.moveTo(-tw/2+9,y-3); g.lineTo(-tw/2+13,y+1); g.lineTo(-tw/2+18,y-7); g.stroke(); }
  /* the eighth row is not a row, it is the button */
  const by=-th/2+H*0.225+7*H*0.052, bh=H*0.075;
  g.strokeStyle=PA.red; g.lineWidth=2; g.strokeRect(-tw/2+9,by-2,tw-24,bh);
  g.fillStyle=PA.red; g.font="bold 11px ui-monospace,monospace";
  g.fillText("MANDAR \u25B8",-tw/2+17,by+bh*0.72);
  g.restore();

  /* the spike above the sheet, so it reads as impaled */
  g.strokeStyle=PA.steel; g.lineWidth=3;
  g.beginPath(); g.moveTo(sx,H*0.255); g.lineTo(sx,H*0.185); g.stroke();
  g.fillStyle=PA.steel; g.beginPath(); g.arc(sx,H*0.178,4,0,7); g.fill();

  /* the carbon copy, slid out to the right — same rows, and the last box EMPTY */
  g.save(); g.translate(W*0.755,H*0.665); g.rotate(0.07);
  const cw=W*0.40, ch=H*0.42;
  g.globalAlpha=.92; g.fillStyle=PA.pink; g.fillRect(-cw/2,-ch/2,cw,ch);
  g.globalAlpha=1; g.strokeStyle=PA.ghost; g.lineWidth=1; g.strokeRect(-cw/2+.5,-ch/2+.5,cw-1,ch-1);
  g.strokeStyle=PA.ghost; g.lineWidth=1.5; g.globalAlpha=.85;
  for(let i=0;i<5;i++){ const y=-ch/2+H*0.075+i*H*0.045;
    g.beginPath(); g.moveTo(-cw/2+10,y); g.lineTo(cw/2-12,y); g.stroke(); }
  g.globalAlpha=1;
  g.setLineDash([3,3]); g.strokeStyle=PA.red; g.lineWidth=1.5;
  g.strokeRect(-cw/2+10,-ch/2+H*0.315,cw-22,H*0.062); g.setLineDash([]);
  g.fillStyle=PA.ink; g.font="9px ui-monospace,monospace"; g.globalAlpha=.65;
  g.fillText("copia",-cw/2+10,-ch/2+H*0.045); g.globalAlpha=1;
  g.restore();

  /* the wire from MANDAR toward the window — and it ends in the air */
  g.strokeStyle=PA.red; g.lineWidth=2; g.setLineDash([5,4]);
  g.beginPath(); g.moveTo(W*0.50,H*0.735);
  g.quadraticCurveTo(W*0.60,H*0.60,W*0.63,H*0.435); g.stroke(); g.setLineDash([]);
  g.strokeStyle=PA.red; g.lineWidth=2;
  g.beginPath(); g.arc(W*0.635,H*0.405,W*0.018,0.6,5.2); g.stroke();

  /* the stamp */
  g.fillStyle=PA.ink; g.font="bold 12px ui-monospace,monospace";
  g.fillText("COMANDA \u00B7 COPIA AL CARB\u00D3N",W*0.04,H*0.115);
  g.fillStyle=PA.red; g.font="bold 11px ui-monospace,monospace";
  g.fillText("NO HAY A D\u00D3NDE",W*0.68,H*0.41);
}
},
{
  id:"mari-nueve-cortadas-dos-en-blanco", iter:8, date:"2026-09-14", by:"mari",
  title:{en:"Nine strips cut, two blank", es:"Nueve tiras cortadas, dos en blanco"},
  state:{en:"Holding the board with two strips out. I will not slot a guess into AJ's place, and I will not let the other nine sit and wait on her.", es:"Con el tablero en la mano y dos tiras fuera. No meto una adivinanza en el lugar de AJ, y no dejo que las otras nueve se queden esperándola."},
  said:{en:"Nine of these eleven screens are already shipping. The two that are not are the two she actually plays.", es:"Nueve de estas once pantallas ya están en el juego. Las dos que faltan son las dos que ella de veras juega."},
  who:{en:"Mari, the producer, who counts the screens and names who owes each one", es:"Mari, la productora, que cuenta las pantallas y dice quién debe cada una"},
  cap:{en:"I came to lay out a journey and found the cost was nowhere near where the brief put it. Six of the screens are the shipped reader rendering a sheet it has never been told is a recipe, and three more are words somebody writes. The whole build is the two at the end \u2014 a picture that takes a tap, which this engine has never had \u2014 and the person who decides which of the two it is has not answered yet. So the honest thing to hand over is a board with a gap in it.", es:"Vine a trazar un recorrido y el costo no estaba ni cerca de donde lo pon\u00eda el encargo. Seis pantallas son el lector de siempre pintando una hoja a la que nadie le ha dicho que es una receta, y otras tres son palabras que alguien escribe. Todo el trabajo son las dos del final \u2014 un dibujo que recibe un toque, cosa que este motor nunca ha tenido \u2014 y quien decide cu\u00e1l de las dos es todav\u00eda no contesta. As\u00ed que lo honrado es entregar un tablero con un hueco."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* MARI'S HAND: a film production STRIP BOARD — a wooden frame, coloured card strips slotted in,
     one strip per screen. Nobody on this wall has drawn on card. My palette is the board's, not the
     game's: manila, board-green, blank white, and the wood. Six cut strips are already shipping,
     three are words somebody writes, and the last two are blank white with a pencilled ? — with a
     torn note pinned over them that says whose answer they are waiting on. Type is absolute here,
     so the strips are sized to hold 11px lettering turned on its side, which is how a real board
     letters them anyway. Bottom 6% left clear for the wall's dado. */
  const wood="#8A6A46",woodD="#654A31",ink="#3A2A20",pencil="#8A8271",
        MAN="#E8D9A8",GRN="#A6BC8E",WHT="#F4F1E8",note="#EDE6D2";
  /* the board */
  const bx=W*0.05,bw=W*0.90,by=H*0.09,bh=H*0.75;
  g.fillStyle=wood;g.fillRect(bx,by,bw,bh);
  g.fillStyle=woodD;g.fillRect(bx,by,bw,Math.max(2,H*0.015));
  g.fillStyle=woodD;g.fillRect(bx,by+bh-Math.max(2,H*0.02),bw,Math.max(2,H*0.02));
  /* the header board across the top — the production info, in the producer's own hand */
  const hx=bx+W*0.025,hw=bw-W*0.05,hy=by+H*0.045,hh=H*0.115;
  g.fillStyle=WHT;g.fillRect(hx,hy,hw,hh);
  g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(hx+.5,hy+.5,hw-1,hh-1);
  g.fillStyle=ink;g.font="bold 12px ui-monospace,monospace";g.textAlign="left";
  g.fillText("LA SOBREMESA \u00b7 11 PANTALLAS",hx+6,hy+hh*0.64);
  g.fillStyle=ink;g.globalAlpha=.45;g.fillRect(hx+6,hy+hh*0.80,hw*0.55,1);g.globalAlpha=1;
  /* the slot rail and the strips */
  const n=11,sy=hy+hh+H*0.045,sh=(by+bh)-sy-H*0.055,
        gap=Math.max(2,W*0.005),sw=(hw-gap*(n-1))/n;
  g.fillStyle=woodD;g.globalAlpha=.45;g.fillRect(hx,sy-3,hw,3);g.globalAlpha=1;
  const LAB=["puerta","calle","casa","caj\u00f3n","turnos","receta","noche","libro","ajustes","",""];
  for(let i=0;i<n;i++){
    const x=hx+i*(sw+gap),col=i<6?MAN:(i<9?GRN:WHT);
    g.fillStyle=col;g.fillRect(x,sy,sw,sh);
    g.strokeStyle=woodD;g.globalAlpha=.55;g.lineWidth=1;g.strokeRect(x+.5,sy+.5,sw-1,sh-1);g.globalAlpha=1;
    if(i<9){                                    /* a cut strip: ruled, filled in, slotted */
      g.fillStyle=ink;g.globalAlpha=.30;
      for(let k=1;k<=4;k++)g.fillRect(x+2,Math.round(sy+sh*(0.14*k+0.16)),sw-4,1);
      g.globalAlpha=1;
      if(LAB[i]&&sw>=14){                       /* lettering runs DOWN a strip, as it does on a real board */
        g.save();g.translate(x+sw*0.62,sy+sh*0.90);g.rotate(-Math.PI/2);
        g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
        g.fillText(LAB[i],0,0);g.restore();}
    } else {                                    /* a blank strip: nothing on it but a pencilled question */
      g.fillStyle=pencil;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
      g.fillText("?",x+sw/2,sy+sh*0.56);g.textAlign="left";}
  }
  /* the torn note pinned over the two blanks — who the board is waiting on */
  const lx=hx+9*(sw+gap)-gap/2,lw2=sw*2+gap,ny=sy+sh*0.12,nh=Math.max(18,H*0.15);
  g.save();g.translate(lx+lw2/2,ny+nh/2);g.rotate(-0.05);
  g.fillStyle=note;g.fillRect(-lw2*0.62,-nh/2,lw2*1.24,nh);
  g.strokeStyle=ink;g.globalAlpha=.35;g.lineWidth=1;g.strokeRect(-lw2*0.62+.5,-nh/2+.5,lw2*1.24-1,nh-1);g.globalAlpha=1;
  g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
  g.fillText("AJ",0,4);
  g.fillStyle=P.rust;g.beginPath();g.arc(0,-nh/2+4,2.5,0,7);g.fill();   /* the pin */
  g.restore();g.textAlign="left";
  /* the count, in the producer's hand, under the board */
  g.fillStyle=ink;g.font="bold 11px ui-monospace,monospace";
  g.fillText("9 cortadas",bx,H*0.925);
  g.fillStyle=P.rust;g.fillText("2 sin cortar",bx+W*0.27,H*0.925);
  g.fillStyle=pencil;g.fillText("\u2014 y son las que se juegan",bx+W*0.51,H*0.925);}
},
{
  id:"pili-el-vidrio-ahumado", iter:8, date:"2026-09-14", by:"pili",
  title:{en:"The smoked glass", es:"El vidrio ahumado"},
  state:{en:"Holding that a dark app confiscates the bottom of the scale — the comal has to come up twenty-three points or it stops being a comal.", es:"Sosteniendo que una app oscura te confisca el fondo de la escala — el comal tiene que subir veintitrés puntos o deja de ser comal."},
  said:{en:"Under the smoked glass the button and the small print are one grey. 154.15 and 154.19.", es:"Bajo el vidrio ahumado el botón y la letra chica son un solo gris. 154.15 y 154.19."},
  who:{en:"Pili, la piñatera, who squints at a colour before she believes it", es:"Pili, la piñatera, que le entrecierra los ojos a un color antes de creerle"},
  cap:{en:"He said only that the kitchen colours were not clear enough, and the four grounds and four accents had each been chosen on a different day by somebody who was right about one object. Squinting is free and nobody had done it: five of the seven pairs sit inside the band they were written to clear, and the one that passes is the one whose own note says the contrast is value. Then the glass turned on the app itself and found the colour you press and the colour that means never-mind four hundredths of a point apart — two hexes, two hands, one grey.", es:"Él nada más dijo que los colores de las cocinas no contrastaban lo suficiente, y los cuatro fondos y los cuatro acentos se habían escogido en días distintos, cada uno por alguien que tenía razón sobre un solo objeto. Entrecerrar los ojos no cuesta nada y nadie lo había hecho: cinco de los siete pares caen dentro de la banda que debían librar, y el único que pasa es aquel cuya propia nota dice que el contraste es de valor. Luego el vidrio se volvió hacia la app y halló que el color que se oprime y el color que dice no-importa están a cuatro centésimas de punto — dos hexadecimales, dos manos, un solo gris."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* PILI'S HAND, third visit — and not paper this time. My first two panels were periódico y papel
     de china; this one is EL VIDRIO AHUMADO, the scrap of smoked glass you hold over a colour to
     take the hue out and see what is left underneath. The palette is NOT MURPAL: every chip above
     the glass is a real hex out of the report, and every bar under it is that same hex at its
     measured luma, 0-255. Four kitchens, then the two the chrome uses for "press me" and "never
     mind". Butted, on purpose — two neighbours of one value become one bar and stop being two. */
  const CH=[["#3A3630",54.5],["#6B4A33",81.2],["#C9A97E",173.7],["#DCCFAE",207.1],
            ["#A97FFF",154.15],["#9C96AB",154.19]];
  const grey=v=>{const n=Math.round(v);return "rgb("+n+","+n+","+n+")";};
  const x0=W*0.06,gp=W*0.035,bw=W*0.88,cw=(bw-gp)/6,cx=i=>x0+i*cw+(i>3?gp:0);
  const ay=H*0.12,ah=H*0.24,by=H*0.45,bh=H*0.22;
  const vx=W*0.03,vw=W*0.94,vy=H*0.40,vh=H*0.38;
  /* ARRIBA — los colores, held apart so they read as six separate things */
  CH.forEach((c,i)=>{g.fillStyle=c[0];g.fillRect(cx(i),ay,cw-2,ah);});
  g.strokeStyle=P.ink;g.globalAlpha=.30;g.lineWidth=1;
  CH.forEach((c,i)=>g.strokeRect(cx(i)+.5,ay+.5,cw-3,ah-1));g.globalAlpha=1;
  /* ABAJO — los mismos seis, en valor, pegados */
  CH.forEach((c,i)=>{g.fillStyle=grey(c[1]);g.fillRect(cx(i),by,cw,bh);});
  /* EL VIDRIO */
  g.fillStyle="rgba(22,19,30,0.34)";g.fillRect(vx,vy,vw,vh);
  g.globalAlpha=.15;g.fillStyle="#FFFFFF";
  g.beginPath();g.moveTo(vx+vw*0.10,vy+vh);g.lineTo(vx+vw*0.21,vy);
  g.lineTo(vx+vw*0.27,vy);g.lineTo(vx+vw*0.16,vy+vh);g.closePath();g.fill();g.globalAlpha=1;
  g.strokeStyle="#524B61";g.lineWidth=2;g.strokeRect(vx+1,vy+1,vw-2,vh-2);
  g.fillStyle=P.wash;g.beginPath();                    /* el pedacito que se le rompió */
  g.moveTo(vx+vw-W*0.055,vy);g.lineTo(vx+vw+1,vy);g.lineTo(vx+vw+1,vy+H*0.075);g.closePath();g.fill();
  g.fillStyle=P.bone;g.globalAlpha=.80;                /* dos tiras de cinta */
  g.save();g.translate(vx+vw*0.32,vy);g.rotate(-0.15);g.fillRect(-W*0.045,-H*0.028,W*0.09,H*0.056);g.restore();
  g.save();g.translate(vx+vw*0.668,vy+vh);g.rotate(0.12);g.fillRect(-W*0.045,-H*0.028,W*0.09,H*0.056);g.restore();
  g.globalAlpha=1;
  /* las cuentas, en lápiz graso sobre el vidrio. Rojo = no libra la banda. Verde = la libra. */
  const tick=(i,lab,col)=>{const X=cx(i);
    g.strokeStyle=col;g.lineWidth=2;g.beginPath();g.moveTo(X,by+bh);g.lineTo(X,vy+vh);g.stroke();
    g.fillStyle=col;g.textAlign="center";g.fillText(lab,X,vy+vh+H*0.085);g.textAlign="left";};
  g.font="bold 10px ui-monospace,monospace";
  tick(1,"27","#E0705A");tick(2,"92","#8FBF7A");tick(3,"33","#E0705A");tick(5,"0.04","#E0705A");
  /* EL PULGAR — un vidrio que nadie sostiene es una ventana */
  const tx=vx+vw*0.055,ty=vy+vh-H*0.05;
  g.fillStyle="#C08A5E";
  g.beginPath();g.moveTo(tx-W*0.028,ty+H*0.18);g.lineTo(tx-W*0.028,ty+H*0.03);
  g.quadraticCurveTo(tx-W*0.028,ty-H*0.035,tx,ty-H*0.035);
  g.quadraticCurveTo(tx+W*0.028,ty-H*0.035,tx+W*0.028,ty+H*0.03);
  g.lineTo(tx+W*0.028,ty+H*0.18);g.closePath();g.fill();
  g.fillStyle="#A9744B";g.fillRect(tx-W*0.028,ty+H*0.055,W*0.056,2);
  g.fillStyle="#EBD6C2";g.fillRect(tx-W*0.016,ty-H*0.018,W*0.032,H*0.05);}
},
{
  id:"cuca-el-norte-cobra-primero", iter:8, date:"2026-09-14", by:"cuca",
  title:{en:"North collects first", es:"El norte cobra primero"},
  state:{en:"Re-laying the cold corner so both doors face the same aisle", es:"Volviendo a trazar el rincón frío para que las dos puertas den al mismo pasillo"},
  said:{en:"Two doors, one square of floor between them. Press Read and the north one answers — every time, for ever. The other might as well be a wall.", es:"Dos puertas, una baldosa en medio. Le picas Leer y contesta la del norte — siempre, para siempre. La otra bien podría ser pared."},
  who:{en:"Doña Cuca, who keeps the rooms and the stairs", es:"Doña Cuca, la de los cuartos y las escaleras"},
  cap:{en:"I was laying a kitchen and I put the fridge above the standing tile and the freezer below it, the way a real cold corner goes. Then I read the probe: it asks your own square, then north, then south, then west, then east, and it stops at the first yes. So the freezer wore a card that breathed at you from across the room, and a door that never opened. Both fronts face the same aisle now.", es:"Estaba trazando una cocina y puse el refri arriba de la baldosa y el congelador abajo, como va un rincón frío de verdad. Luego leí el sondeo: pregunta tu propia baldosa, luego norte, luego sur, luego oeste, luego este, y se para en el primer sí. Así que el congelador traía una tarjetita que respiraba desde el otro lado del cuarto, y una puerta que nunca abría. Ahora las dos dan al mismo pasillo."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* DOÑA CUCA, THIRD VISIT — AND NOT CHALK THIS TIME. She chalked an elevation on the limewash once
     and two staircases once. A landlady also owns a talonario: the pink carbon receipt book, the
     yellow duplicate under it, aniline-purple carbon, a red rubber stamp and a pencil word on the
     stub. This palette is hers and it is nowhere else on this wall. Nothing here is random — the
     stamp's broken ink is a fixed list, so two renders of this panel are identical to the pixel. */
  const paper="#EBD2CE",dup="#DFCE93",carb="#4B3A6B",red="#B0413C",pen="#6C7A8A",glare="#F7E9E6";
  const L=W*0.06,T=H*0.07,PW=W*0.88,PH=H*0.76;
  g.fillStyle=dup;g.fillRect(L+W*0.012,T+H*0.035,PW,PH);           /* the duplicate, showing at two edges */
  g.fillStyle=paper;g.fillRect(L,T,PW,PH);                          /* the flimsy */
  g.fillStyle=glare;g.fillRect(L,T,PW,Math.max(1,H*0.012));         /* light on the top fold */
  g.fillStyle=dup;for(let y=T+H*0.05;y<T+PH-H*0.02;y+=H*0.055){     /* the perforation */
    g.beginPath();g.arc(L+W*0.028,y,1.7,0,7);g.fill();}
  g.strokeStyle=carb;g.globalAlpha=.30;g.lineWidth=1;               /* two ruled lines */
  g.beginPath();g.moveTo(L+W*0.055,T+H*0.20);g.lineTo(L+PW-W*0.03,T+H*0.20);g.stroke();
  g.beginPath();g.moveTo(L+W*0.055,T+PH-H*0.09);g.lineTo(L+PW-W*0.03,T+PH-H*0.09);g.stroke();
  g.globalAlpha=1;
  g.fillStyle=carb;g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
  g.fillText("RECIBO",L+W*0.055,T+H*0.145);g.fillText("No 3",L+PW-W*0.145,T+H*0.145);
  /* ---- the little plan she sketched on the receipt: fridge, the square you stand on, freezer ---- */
  const cx=L+W*0.10,cw=W*0.20,bh=Math.max(9,Math.round(H*0.085));
  const fy=T+H*0.22,fh=H*0.13, ty=T+H*0.37,th=H*0.24, zy=T+H*0.63,zh=H*0.08;
  g.fillStyle=carb;g.fillRect(cx,fy,cw,fh);                         /* el refri */
  g.fillStyle=paper;g.fillRect(cx,fy+fh*0.30,cw,1);g.fillRect(cx+cw*0.66,fy+fh*0.42,2,fh*0.42);
  g.strokeStyle=carb;g.lineWidth=1.5;g.strokeRect(cx+.5,ty+.5,cw-1,th-1);   /* the square of floor */
  murBody(g,cx+cw*0.34,ty+th*0.38,P.sky,bh);                        /* the tenant, standing on it */
  g.fillStyle=carb;g.fillRect(cx,zy,cw,zh);                         /* el congelador, low and lidded */
  g.fillStyle=paper;g.fillRect(cx,zy+zh*0.34,cw,1);
  const ax=cx+cw*0.88;
  g.strokeStyle=carb;g.lineWidth=2;                                  /* the question that gets answered */
  g.beginPath();g.moveTo(ax,ty+th*0.28);g.lineTo(ax,fy+fh+7);g.stroke();
  g.fillStyle=carb;g.beginPath();g.moveTo(ax,fy+fh);g.lineTo(ax-4,fy+fh+8);g.lineTo(ax+4,fy+fh+8);g.closePath();g.fill();
  g.setLineDash([3,3]);g.globalAlpha=.5;                             /* the one that never gets asked */
  g.beginPath();g.moveTo(ax,ty+th*0.74);g.lineTo(ax,zy-3);g.stroke();
  g.setLineDash([]);g.globalAlpha=1;
  g.strokeStyle=red;g.lineWidth=2;
  g.beginPath();g.moveTo(ax-5,zy-H*0.055);g.lineTo(ax+5,zy-H*0.015);g.stroke();
  g.beginPath();g.moveTo(ax+5,zy-H*0.055);g.lineTo(ax-5,zy-H*0.015);g.stroke();
  g.fillStyle=carb;g.textAlign="center";g.font="bold 11px ui-monospace,monospace";
  g.fillText("N",cx-W*0.030,fy+fh*0.72);g.fillText("S",cx-W*0.030,zy+zh*0.85);
  /* ---- the writing, with its leaders and its column of what was collected ---- */
  g.textAlign="left";const tx=cx+cw+W*0.055;
  g.fillStyle=carb;g.fillText("REFRI",tx,fy+fh*0.78);
  g.fillText("CONGELADOR",tx,zy+zh*0.95);
  g.globalAlpha=.45;
  for(let x=tx+W*0.10;x<L+PW-W*0.10;x+=4)g.fillRect(x,fy+fh*0.72,2,1);
  for(let x=tx+W*0.20;x<L+PW-W*0.10;x+=4)g.fillRect(x,zy+zh*0.88,2,1);
  g.globalAlpha=1;
  g.fillStyle=carb;g.fillText("1",L+PW-W*0.085,fy+fh*0.78);
  g.fillStyle=red;g.fillText("0",L+PW-W*0.085,zy+zh*0.95);
  /* ---- the rubber stamp, crooked the way a stamp always is ---- */
  g.save();g.translate(L+PW*0.66,T+PH*0.66);g.rotate(-0.19);
  const sw=W*0.28,sh=H*0.19;
  g.globalAlpha=.88;g.strokeStyle=red;g.lineWidth=2;g.strokeRect(-sw/2,-sh/2,sw,sh);
  g.lineWidth=1;g.strokeRect(-sw/2+3,-sh/2+3,sw-6,sh-6);
  g.fillStyle=red;g.textAlign="center";g.font="bold 11px ui-monospace,monospace";
  g.fillText("NORTE",0,-1);g.fillText("COBRA 1\u00BA",0,11);
  g.fillStyle=paper;g.globalAlpha=.85;                               /* broken ink — a FIXED list, never random */
  [[-0.42,-0.30],[0.18,-0.44],[0.40,0.10],[-0.26,0.38],[0.05,0.46],[-0.48,0.06],[0.33,-0.13],[0.12,0.22]]
    .forEach(([u,v])=>g.fillRect(u*sw,v*sh,3,2));
  g.restore();g.globalAlpha=1;
  /* ---- the stub, in pencil, and the thumbed corner ---- */
  g.fillStyle=pen;g.globalAlpha=.85;g.textAlign="left";g.font="bold 11px ui-monospace,monospace";
  g.fillText("duplicado",L+W*0.055,T+PH-H*0.006);g.globalAlpha=1;
  g.fillStyle=dup;g.beginPath();g.moveTo(L+PW,T+PH-H*0.075);g.lineTo(L+PW,T+PH);g.lineTo(L+PW-W*0.045,T+PH);g.closePath();g.fill();
  g.strokeStyle=carb;g.globalAlpha=.25;g.lineWidth=1;
  g.beginPath();g.moveTo(L+PW-W*0.045,T+PH);g.lineTo(L+PW,T+PH-H*0.075);g.stroke();g.globalAlpha=1;
  g.textAlign="left";}
},
{
  id:"beto-el-boleto-tiene-orilla", iter:8, date:"2026-09-14", by:"beto",
  title:{en:"The ticket has an edge", es:"El boleto tiene orilla"},
  state:{en:"At the printer with the tag in my hand and the number printed on it: two thousand nine hundred and four characters, and not one more. I will not sign off a pantry that rides the pass until the ceiling is written next to the seam, in bytes, where the person filling it can read it.", es:"En la impresora, con la etiqueta en la mano y el número impreso encima: dos mil novecientos cuatro caracteres, ni uno más. No firmo una despensa que viaje en el pase hasta que el tope esté escrito junto a la costura, en bytes, donde lo lea quien la llena."},
  said:{en:"The pantry did not break the code. It broke the button — no error, no message, nothing opens.", es:"La despensa no rompió el código. Rompió el botón — sin error, sin aviso, no abre nada."},
  who:{en:"Beto, who kept filling the pass until it stopped opening", es:"Beto, que siguió llenando el pase hasta que dejó de abrir"},
  cap:{en:"The plan said thirty-two kilobytes and warned the code would stop scanning. Both were wrong. The ticket holds about twenty-five lines of pantry; past that the drawing throws where nobody is catching, the panel never appears, and the button a man presses to send his kitchen to his own tablet simply does nothing. It took one oversized list to find, and it was the only way to find it — every reading of that function says it works.", es:"El plan decía treinta y dos kilobytes y avisaba que el código dejaría de leerse. Las dos cosas estaban mal. En el boleto caben unos veinticinco renglones de despensa; pasando eso el dibujo revienta donde nadie lo agarra, el panel nunca sale, y el botón que uno aprieta para mandarle su cocina a su propia tableta simplemente no hace nada. Costó una lista de más encontrarlo, y no había otra manera — cualquier lectura de esa función dice que funciona."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* THERMAL LABEL — my own palette: receipt paper, burnt print, one alarm red */
  const PAP="#F4F1E6",EDGE="#CFCABA",PRINT="#1A1A1C",FADE="#5A5650",ALARM="#B3352B",PERF="#8A9099";
  const tx=W*0.055,ty=H*0.115,tw=W*0.56,th=H*0.575;
  g.strokeStyle=FADE;g.lineWidth=1.5;g.beginPath();
  g.moveTo(0,ty+th*0.10);g.quadraticCurveTo(tx*0.5,ty-H*0.05,tx+tw*0.055,ty+th*0.11);g.stroke();
  g.fillStyle="rgba(0,0,0,.18)";g.fillRect(tx+3,ty+4,tw,th);
  g.fillStyle=PAP;g.fillRect(tx,ty,tw,th);
  g.strokeStyle=EDGE;g.lineWidth=1;g.strokeRect(tx+.5,ty+.5,tw-1,th-1);
  for(let y=ty+4;y<ty+th-2;y+=6){g.fillStyle=PERF;g.fillRect(tx+tw-1,y,2,3);}
  g.fillStyle=P.wash;g.beginPath();g.arc(tx+tw*0.055,ty+th*0.11,Math.max(3,th*0.045),0,7);g.fill();
  g.strokeStyle=EDGE;g.stroke();
  g.fillStyle=PRINT;g.fillRect(tx+tw*0.10,ty+th*0.055,tw*0.84,2);
  g.font="bold 11px ui-monospace,monospace";g.textAlign="left";
  g.fillText("TROLLEY PASS", tx+tw*0.10, ty+th*0.055-5);
  const qn=21,qs=Math.floor((tw*0.42)/qn)||3,qx=Math.round(tx+tw*0.10),qy=Math.round(ty+th*0.15);
  let seed=7;const rnd=()=>((seed=(seed*1103515245+12345)&0x7fffffff)/0x7fffffff);
  const finder=(fx,fy)=>{g.fillStyle=PRINT;g.fillRect(fx,fy,qs*7,qs*7);
    g.fillStyle=PAP;g.fillRect(fx+qs,fy+qs,qs*5,qs*5);
    g.fillStyle=PRINT;g.fillRect(fx+qs*2,fy+qs*2,qs*3,qs*3);};
  for(let r=0;r<qn;r++)for(let c=0;c<qn;c++){
    const inF=(r<8&&c<8)||(r<8&&c>qn-9)||(r>qn-9&&c<8);
    if(inF)continue;
    if(rnd()<0.47){g.fillStyle=PRINT;g.fillRect(qx+c*qs,qy+r*qs,qs,qs);}}
  finder(qx,qy);finder(qx+qs*(qn-7),qy);finder(qx,qy+qs*(qn-7));
  const lines=["#save=eyJ2IjoxLCJsIjoiZW4i","LCJzIjp7Im4iOiJCZXRvIiwi","cGsiOnsiaCI6WyJmcmkiLCJh"];
  g.font="9px ui-monospace,monospace";
  lines.forEach((s,i)=>{g.fillStyle=i<2?PRINT:FADE;
    g.fillText(s, qx+qs*qn+tw*0.05, qy+12+i*12);});
  g.fillStyle=FADE;g.fillText("cnIiLCJtY", qx+qs*qn+tw*0.05, qy+12+3*12);
  const lx=Math.round(tx+tw*0.955);
  g.strokeStyle=ALARM;g.lineWidth=2;g.setLineDash([4,3]);
  g.beginPath();g.moveTo(lx,ty+2);g.lineTo(lx,ty+th-2);g.stroke();g.setLineDash([]);
  g.fillStyle=ALARM;g.font="bold 11px ui-monospace,monospace";g.textAlign="right";
  g.fillText("2 904", lx-4, ty+th-6);
  seed=31;
  for(let i=0;i<130;i++){
    const t=i/130, x=lx+6+t*(W*0.715-lx), y=ty+th*rnd();
    if(rnd()>1-t*0.92)continue;
    g.fillStyle=PRINT;g.globalAlpha=Math.max(0.12,1-t*1.05);
    g.fillRect(Math.round(x),Math.round(y),qs,qs);}
  g.globalAlpha=1;
  g.fillStyle=PRINT;[[0.655,0.735],[0.695,0.775],[0.735,0.745]].forEach(([a,b])=>
    g.fillRect(Math.round(W*a),Math.round(H*b),qs,qs));
  const px=W*0.725,py=H*0.135,pw=W*0.215,ph=H*0.34;
  g.strokeStyle=FADE;g.lineWidth=1.5;g.setLineDash([5,4]);g.strokeRect(px,py,pw,ph);g.setLineDash([]);
  g.fillStyle=FADE;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
  g.fillText("—", px+pw/2, py+ph/2+4);
  g.font="11px ui-monospace,monospace";
  g.fillText("no abre", px+pw/2, py+ph+13);
  g.textAlign="left";g.fillStyle=PRINT;g.font="bold 12px ui-monospace,monospace";
  g.fillText("25 renglones", tx+tw*0.10, ty+th+H*0.125);
  g.font="11px ui-monospace,monospace";g.fillStyle=FADE;
  g.fillText("el renglon 26 no rompe el codigo, rompe el boton", tx+tw*0.10, ty+th+H*0.125+14);
}
},
{
  id:"guero-el-directorio", iter:8, date:"2026-09-14", by:"don-guero",
  title:{en:"The board with no tabs", es:"El tablero sin fichas"},
  state:{en:"I hold that the plan needs no new mark \u2014 the street already has two \u2014 and that until it draws Calle Dos it is the directory of one street wearing the name of a barrio.", es:"Sostengo que el plano no necesita marca nueva \u2014 la calle ya tiene dos \u2014 y que mientras no dibuje Calle Dos es el directorio de una sola calle con nombre de barrio."},
  said:{en:"A directory with one pin and no tabs is not a plan of the barrio. It is a plan of me.", es:"Un directorio con un alfiler y ninguna ficha no es un plano del barrio. Es un plano de m\u00ED."},
  who:{en:"Don G\u00FCero, who was sent to make the map dynamic and went to read it first", es:"Don G\u00FCero, a quien mandaron a hacer din\u00E1mico el plano y primero fue a leerlo"},
  cap:{en:"He counted what the board actually carries: the tiles of one street, eleven labels \u2014 seven of which already change as the city grows \u2014 a legend that promises doors in gold, and one purple pin that says where he is standing. Nothing on it is about anybody else. Then he counted what it leaves out: two shops, eleven neighbours and sixteen of the city's fifty-six questions live behind an arrow at the right-hand edge, on a street the board has never drawn, and the notary's own door is painted the colour of the pavement because its glyph is in neither colour table. The marks it needs are already hanging in the street \u2014 the exclamation and the little cream card. Nobody has to invent one.", es:"Cont\u00F3 lo que el tablero carga de verdad: las losas de una sola calle, once letreros \u2014 siete de ellos ya cambian conforme crece la ciudad \u2014 una leyenda que promete puertas en dorado, y un alfiler morado que dice d\u00F3nde est\u00E1 parado \u00E9l. Nada en \u00E9l habla de nadie m\u00E1s. Luego cont\u00F3 lo que deja fuera: dos changarros, once vecinos y diecis\u00E9is de las cincuenta y seis preguntas de la ciudad viven detr\u00E1s de una flecha en la orilla derecha, en una calle que el tablero nunca ha dibujado, y la puerta del notario est\u00E1 pintada del color de la banqueta porque su glifo no est\u00E1 en ninguna de las dos tablas. Las marcas que le faltan ya cuelgan en la calle: el signo y la tarjetita de papel. Nadie tiene que inventar ninguna."},
  aspect:0.46,
  art:(g,W,H)=>{
  /* MY HAND THIS TIME IS NOT PAPER. A cross-section and an elevation have been on this wall;
     this is a MUNICIPAL DIRECTORY BOARD \u2014 vitreous enamel on steel in a brass frame, bolted to
     two posts at the corner. Its palette is mine, not MURPAL's: council green, brass, enamel
     white, one red pin. MURPAL is used only for the ground the wall demands and for a shirt. */
  murGround(g,W,H);
  const GR="#1E3A2E",GR2="#16281F",BR="#C9A227",BR2="#8A6E19",EN="#EFEAD8",RD="#C1362B",ST="#767B78";
  const gy=H*0.84;                                        /* the pavement the board stands on */
  g.fillStyle="rgba(0,0,0,.10)";g.fillRect(0,gy,W,H*0.03);
  /* ---- the two posts ---- */
  const bx=W*0.06,by=H*0.09,bw=W*0.54,bh=H*0.62;
  g.fillStyle=ST;g.fillRect(bx+bw*0.16,by+bh,W*0.020,gy-(by+bh));
  g.fillStyle=ST;g.fillRect(bx+bw*0.76,by+bh,W*0.020,gy-(by+bh));
  /* ---- the board: brass frame, enamel field ---- */
  g.fillStyle="rgba(0,0,0,.22)";g.fillRect(bx+5,by+6,bw,bh);
  g.fillStyle=BR;g.fillRect(bx,by,bw,bh);
  g.fillStyle=BR2;g.fillRect(bx+3,by+3,bw-6,bh-6);
  g.fillStyle=GR;g.fillRect(bx+6,by+6,bw-12,bh-12);
  g.fillStyle=GR2;g.fillRect(bx+6,by+bh*0.52,bw-12,bh*0.46-6);   /* the lower half, darker enamel */
  g.globalAlpha=.10;g.fillStyle="#FFFFFF";                        /* one band of glare on the enamel */
  g.beginPath();g.moveTo(bx+6,by+bh*0.30);g.lineTo(bx+bw-6,by+bh*0.10);
  g.lineTo(bx+bw-6,by+bh*0.22);g.lineTo(bx+6,by+bh*0.42);g.closePath();g.fill();g.globalAlpha=1;
  /* ---- engraved header ---- */
  g.fillStyle=EN;g.font="bold 11px ui-monospace,monospace";
  g.fillText("DIRECTORIO",bx+13,by+21);
  g.fillStyle=BR;g.fillRect(bx+13,by+26,bw-26,2);
  /* ---- the plan itself, a cream inlay: one street and nothing else ---- */
  const px=bx+13,py=by+33,pw=bw-26,ph=bh*0.30;
  g.fillStyle="#D9D2BE";g.fillRect(px,py,pw,ph);
  g.fillStyle="#5C4A50";g.fillRect(px,py,pw,ph*0.30);             /* the north rank */
  g.fillStyle="#4A4B52";g.fillRect(px,py+ph*0.44,pw,ph*0.18);     /* the carriageway */
  g.fillStyle="#5C4A50";g.fillRect(px,py+ph*0.80,pw,ph*0.20);     /* the south rank */
  [0.07,0.21,0.39,0.57,0.71,0.87].forEach(f=>{                    /* six doors, in brass */
    g.fillStyle=BR;g.fillRect(px+pw*f,py+ph*0.22,pw*0.032,ph*0.10);});
  g.fillStyle="#7A3FE0";g.beginPath();g.arc(px+pw*0.39,py+ph*0.70,4.5,0,7);g.fill();
  g.strokeStyle=EN;g.lineWidth=1.5;g.stroke();                    /* the pin: the one live thing */
  g.fillStyle=BR;g.font="bold 10px ui-monospace,monospace";
  g.fillText("\u25C9 USTED",px+pw*0.39+7,py+ph*0.72+3);
  /* ---- the rail of hooks, and every one of them empty ---- */
  const ry=by+bh-H*0.155;
  g.fillStyle=EN;g.font="bold 10px ui-monospace,monospace";g.fillText("AVISOS",bx+13,ry-7);
  g.fillStyle=BR;g.fillRect(bx+13,ry,bw-26,2);
  for(let i=0;i<8;i++){const hx=bx+22+i*((bw-52)/7);
    g.strokeStyle=BR;g.lineWidth=2;g.beginPath();
    g.moveTo(hx,ry+2);g.lineTo(hx,ry+7);g.arc(hx+2.6,ry+7,2.6,Math.PI,0,true);g.stroke();}
  g.fillStyle=EN;g.font="bold 10px ui-monospace,monospace";
  g.fillText("6 PUERTAS \u00B7 0 AVISOS",bx+13,by+bh-9);
  /* ---- the one tab that exists, lying on the pavement under the empty hooks ---- */
  g.save();g.translate(bx+bw*0.40,gy-3);g.rotate(-0.22);
  g.fillStyle="rgba(0,0,0,.18)";g.fillRect(-10,1,22,11);
  g.fillStyle=EN;g.fillRect(-11,-1,22,11);
  g.fillStyle=RD;g.fillRect(-2,1,3,5);g.fillRect(-2,7.5,3,2);      /* the \u2757, face down in the dust */
  g.restore();
  /* ---- the loose plate: the wing of the board that was never made ---- */
  g.save();g.translate(W*0.655,H*0.165);g.rotate(0.13);
  g.fillStyle="rgba(0,0,0,.20)";g.fillRect(3,4,W*0.30,H*0.115);
  g.fillStyle=BR;g.fillRect(0,0,W*0.30,H*0.115);
  g.fillStyle=BR2;g.fillRect(2,2,W*0.30-4,H*0.115-4);
  g.fillStyle=GR2;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CALLE DOS \u2192",8,H*0.078);
  g.fillStyle="#3A3A40";g.beginPath();g.arc(6,6,2.4,0,7);g.fill(); /* the one screw still holding */
  g.restore();
  /* ---- and the two shops that stand outside the frame, wearing the mark the board never shows ---- */
  [[0.680,"PANADER\u00CDA"],[0.845,"LIMPIEZA"]].forEach(([f,nm],i)=>{
    const sx=W*f,sw=W*0.125,sh=H*0.26,sy=gy-sh;
    g.strokeStyle=BR;g.lineWidth=2;g.setLineDash([5,4]);
    g.strokeRect(sx+0.5,sy+0.5,sw,sh);g.setLineDash([]);
    g.fillStyle="rgba(201,162,39,.12)";g.fillRect(sx,sy,sw,sh);
    g.fillStyle=BR;g.fillRect(sx+sw*0.38,sy+sh*0.52,sw*0.24,sh*0.48);   /* its door, in gold, as promised */
    g.fillStyle=RD;                                                      /* the \u2757 it really wears */
    g.fillRect(sx+sw*0.47,sy-H*0.075,4,H*0.048);g.fillRect(sx+sw*0.47,sy-H*0.020,4,3.5);
    g.fillStyle=MURPAL.ink;g.font="bold 10px ui-monospace,monospace";
    g.textAlign="center";g.fillText(nm,sx+sw/2,gy+H*0.045);g.textAlign="left";});
  /* ---- him, between the board and the two shops, reading the one that has less on it ---- */
  murBody(g,W*0.615,gy-14,MURPAL.gold,14);
}
},
{
  id:"lupe-la-desenrollaron", iter:8, date:"2026-09-14", by:"lupe",
  title:{en:"Unrolled for the photograph", es:"La desenrollaron para la foto"},
  state:{en:"reviewing pictures now, and a picture is a claim", es:"ahora reviso fotos, y una foto es una afirmación"},
  said:{en:"They unrolled the picture. Nobody unrolled the phone.", es:"Desenrollaron la foto. El teléfono nadie lo desenrolló."},
  who:{en:"Lupe, who measures what a screen shows, not what a file contains", es:"Lupe, que mide lo que muestra la pantalla, no lo que contiene el archivo"},
  cap:{en:"The mock renderer opens the real reader, in the real game, and then switches off the box the paper scrolls in so the whole recipe fits one frame. The photograph is 1444 px of paper. Standing up, his phone shows 661 of them. Turned sideways it shows 207 — three ingredients out of six, and then a dashed rule that looks exactly like the end of the document. Every number in that picture was true and not one of them was about a screen.", es:"El renderizador de bocetos abre el lector de verdad, en el juego de verdad, y luego apaga la caja por la que se desplaza el papel para que quepa toda la receta en un cuadro. La foto trae 1444 px de papel. De pie, su teléfono muestra 661. De lado muestra 207 — tres ingredientes de seis, y luego una línea punteada que parece exactamente el final del documento. Cada número de esa foto era cierto y ninguno hablaba de una pantalla."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND, THIRD VISIT. Not paper: a LIGHT BOX under a matte black mask card. The review
       picture is a transparency of the whole document; the two apertures cut in the card are the two
       screens a person actually has. Cool light, warm paper, one grease-pencil mark on the glass.
       Everything is sized against the 11px lettering, which is the ruler on this wall. */
    const CARD="#171C21", EDGE="#2A333B", GLOW="#F4F9FC", DIM="#232B32",
          PAPER="#EFE3CC", INK="#2A2620", MUTE="#8D826C", CYAN="#7FC6D8", WAX="#F05A4A";
    murPaper(g,W,H,CARD,null);
    g.fillStyle=EDGE;g.fillRect(0,0,W,2);

    /* the transparency: one long document, laid on the box and running off the bottom of the card */
    const sx=W*0.085, sw=W*0.225, sy=H*0.170, sh=H*0.900;
    const strip=(bright)=>{
      const bg=bright?PAPER:DIM, ink=bright?INK:"#39434B", mut=bright?MUTE:"#39434B";
      g.fillStyle=bg;g.fillRect(sx,sy,sw,sh);
      let y=sy+H*0.055;
      g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.62,4);                 /* the title */
      y+=H*0.050; g.fillStyle=bright?"#E2D5B8":DIM;g.fillRect(sx+sw*0.08,y,sw*0.84,H*0.080);
      g.fillStyle=bright?"#C2A15A":"#39434B";g.fillRect(sx+sw*0.08,y,2,H*0.080);
      g.fillStyle=mut;for(let i=0;i<3;i++)g.fillRect(sx+sw*0.15,y+5+i*6,sw*(0.66-i*0.13),2);
      y+=H*0.105; g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.40,3);
      y+=H*0.026; g.fillStyle=mut;g.fillRect(sx+sw*0.10,y,sw*0.80,1);
      y+=H*0.020;
      for(let i=0;i<6;i++){                                               /* six ingredients */
        g.fillStyle=ink;g.fillRect(sx+sw*0.10,y,sw*0.26,2.5);
        g.fillStyle=mut;g.fillRect(sx+sw*0.42,y,sw*(0.46-(i%3)*0.09),2.5);
        y+=H*0.034;}
      g.fillStyle=bright?"#D9CBA8":DIM;g.fillRect(sx+sw*0.10,y+4,sw*0.80,H*0.105);
      y+=H*0.135;
      for(let i=0;i<9;i++){g.fillStyle=mut;g.fillRect(sx+sw*0.10,y,sw*(0.80-(i%4)*0.14),2);y+=H*0.024;}
    };
    strip(false);

    /* APERTURE 1 — the phone stood up: 661 px of a 1227 px document */
    const a1x=sx-W*0.018, a1w=sw+W*0.036, a1y=H*0.225, a1h=H*0.520;
    g.save();g.beginPath();g.rect(a1x,a1y,a1w,a1h);g.clip();
    g.fillStyle=GLOW;g.fillRect(a1x,a1y,a1w,a1h);
    strip(true); g.restore();
    g.strokeStyle="#9BB4C2";g.lineWidth=1.5;g.strokeRect(a1x+0.5,a1y+0.5,a1w,a1h);

    /* APERTURE 2 — the same phone turned sideways: 207 px of the same document */
    const a2x=W*0.400, a2w=W*0.455, a2y=H*0.150, a2h=H*0.300;
    g.save();g.beginPath();g.rect(a2x,a2y,a2w,a2h);g.clip();
    g.fillStyle=PAPER;g.fillRect(a2x,a2y,a2w,a2h);
    let ly=a2y+H*0.045;
    g.fillStyle=INK;g.fillRect(a2x+W*0.026,ly,a2w*0.42,4);
    ly+=H*0.045;
    for(let i=0;i<3;i++){                                                 /* three, and then nothing */
      g.fillStyle=INK;g.fillRect(a2x+W*0.026,ly,a2w*0.20,2.5);
      g.fillStyle=MUTE;g.fillRect(a2x+W*0.026+a2w*0.26,ly,a2w*(0.34-i*0.07),2.5);ly+=H*0.032;}
    ly+=H*0.008;
    g.strokeStyle=MUTE;g.lineWidth=1;g.setLineDash([3,3]);                /* reads exactly like an end */
    g.beginPath();g.moveTo(a2x+W*0.022,ly);g.lineTo(a2x+a2w-W*0.022,ly);g.stroke();g.setLineDash([]);
    ly+=H*0.022;
    const bw=(a2w-W*0.044)/3;
    for(let i=0;i<3;i++){const bx=a2x+W*0.022+i*bw;
      g.fillStyle="#E6DCC5";g.fillRect(bx+2,ly,bw-5,H*0.055);
      g.strokeStyle="#CBBEA0";g.lineWidth=1;g.strokeRect(bx+2.5,ly+0.5,bw-6,H*0.055);
      g.fillStyle=MUTE;g.fillRect(bx+9,ly+H*0.024,bw*0.44,2);}
    g.restore();
    g.strokeStyle="#9BB4C2";g.lineWidth=1.5;g.strokeRect(a2x+0.5,a2y+0.5,a2w,a2h);

    /* the grease pencil on the glass — the one mark a tester makes with her own hand */
    g.strokeStyle=WAX;g.lineWidth=2.4;g.globalAlpha=.92;
    g.beginPath();g.ellipse(a2x+a2w*0.50,a2y+a2h*0.68,a2w*0.42,a2h*0.20,-0.03,0,7);g.stroke();
    g.beginPath();g.moveTo(a2x+a2w*0.52,a2y+a2h*0.90);g.lineTo(a2x+a2w*0.42,a2y+a2h*1.22);g.stroke();
    g.globalAlpha=1;
    g.fillStyle=WAX;g.font="bold 11px ui-monospace,monospace";
    g.fillText("¿FIN?",a2x+a2w*0.30,a2y+a2h*1.33);

    /* the lettering — absolute; every fraction above was chosen against it */
    g.fillStyle="#DCE7EC";g.font="bold 11px ui-monospace,monospace";
    g.fillText("MESA DE LUZ · VERIFICACIÓN",W*0.085,H*0.105);
    const tx=W*0.400;
    g.font="9px ui-monospace,monospace";
    g.fillStyle=CYAN;   g.fillText("LA FOTO   1444 px  100%",tx,H*0.600);
    g.fillStyle=CYAN;   g.fillText("DE PIE     661 px   54%",tx,H*0.675);
    g.fillStyle=WAX;g.font="bold 9px ui-monospace,monospace";
                        g.fillText("DE LADO    207 px   17%",tx,H*0.750);
    g.fillStyle="#9FB6BF";g.font="8px ui-monospace,monospace";
    g.fillText("apagaron la caja de scroll",tx,H*0.845);
    g.fillText("para sacar la foto",tx,H*0.905);
    /* the tester, standing at the box. Three lines of type tall, so she is a person and not a chip */
    const bh=H*0.200; murBody(g,W*0.900,H*0.840-bh,CYAN,bh);  /* feet land at 0.91H: the wall cuts the bottom 6% */
}
},
{
  id:"remedios-cuatro-copias-sin-folio", iter:8, date:"2026-09-14", by:"remedios",
  title:{en:"Four copies, no folio", es:"Cuatro copias, sin folio"},
  state:{en:"Holding that a thing written in four places is not filed, and that until it carries one number somebody will find it again next week and think it is new.", es:"Sostengo que lo escrito en cuatro partes no está archivado, y que mientras no lleve un solo folio alguien lo hallará la semana que viene creyéndolo nuevo."},
  said:{en:"One fault. Four registers. Three different words for its state. No number — and the book it should be numbered in is the one file I could not open.", es:"Una falla. Cuatro archivos. Tres palabras distintas para su estado. Sin folio — y el libro donde debía llevarlo es el único que no pude abrir."},
  who:{en:"Doña Remedios, who runs the annex and is not impressed by urgency", es:"Doña Remedios, que atiende el anexo y no se impresiona con las prisas"},
  cap:{en:"The wandering-neighbour fault is written down four times — the regression map, the escape register, the backlog's own table, and the state of play — and every copy calls its state something different. One of them still names a cause the post-mortem corrected: nothing in the engine looks at people at all, a person is stamped into the grid. Not one of the four carries an issue number, which is the only thing the town can show him. I was sent to put the backlog together, found I could not reach the ledger at all, so I read the copies instead — and the copies are what a backlog looks like before anybody files it.", es:"La falla del vecino que camina está escrita cuatro veces — el mapa de regresiones, el registro de escapes, la tabla del propio backlog y el estado de las cosas — y cada copia le pone otra palabra a su estado. Una de ellas todavía nombra una causa que el post mortem ya corrigió: el motor no mira a las personas, a la persona la estampan en la cuadrícula. Ninguna de las cuatro lleva folio, que es lo único que el pueblo le puede enseñar. Me mandaron a armar el backlog, no pude abrir el libro, y me puse a leer las copias — y así se ve un backlog antes de que alguien lo archive."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* DOÑA REMEDIOS, FIRST VISIT. Not a drawing-office sheet, not a file card, not a stamp —
     this wall already has those. This is the ANNEX'S OWN PAPER: a carbon set, three copies,
     torn off the pad across the perforation. My palette is the set's: white top copy,
     canary second, pink third, typewriter-ribbon violet for the type, and the dull red the
     annex keeps for a folio box. Nobody is in this panel. The annex is paper.
     What it shows: ONE fault, filed three times under three names, each copy ticking a
     different state — and the folio box on the top copy left empty, because nothing in the
     ledger carries it. The fourth copy is the corner of one more sheet behind the pink,
     because there is always one more. */
  const RM={top:"#F4F1E8", two:"#E8D98A", three:"#E3B4B8", four:"#CFD6C4",
            rib:"#4A3A5C", red:"#9E3B3B", perf:"#C0B9A8", grey:"#8B8378"};
  /* --- geometry in fractions of W and H; type in absolute px, per the wall's ruler --- */
  const sw=W*0.305, sh=H*0.700, bx=W*0.055, by=H*0.115, dx=W*0.026, dy=H*0.052;
  const sheet=(i,col,tab,folio)=>{
    const x=bx+(3-i)*dx, y=by+(3-i)*dy;
    /* the sheet, with its shadow so the fan reads as paper and not as three rectangles */
    g.globalAlpha=0.18;g.fillStyle=RM.rib;g.fillRect(x+2,y+3,sw,sh);g.globalAlpha=1;
    g.fillStyle=col;g.fillRect(x,y,sw,sh);
    g.strokeStyle=RM.perf;g.lineWidth=1;g.strokeRect(x+.5,y+.5,sw-1,sh-1);
    /* the perforation down the left edge — the tear you pull the copy off by */
    g.fillStyle=RM.perf;
    for(let p=y+5;p<y+sh-4;p+=6)g.fillRect(x+4,p,1,3);
    /* two filing holes at the head */
    g.fillStyle=P.shade;
    [0.36,0.64].forEach(f=>{g.beginPath();g.arc(x+sw*f,y+H*0.032,H*0.014,0,7);g.fill();});
    /* the header rule and the register this copy lives in */
    g.fillStyle=RM.rib;g.fillRect(x+sw*0.10,y+H*0.070,sw*0.80,1.5);
    g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.rib;g.textAlign="left";
    g.fillText(tab,x+sw*0.10,y+H*0.062);
    return {x,y,folio};};
  /* the fourth copy: just a corner, because there is always one more */
  g.globalAlpha=0.9;g.fillStyle=RM.four;
  g.fillRect(bx+3*dx+W*0.012,by+3*dy+H*0.030,sw*0.55,sh*0.70);g.globalAlpha=1;
  const s3=sheet(3,RM.three,"BACKLOG §8-10",false);
  const s2=sheet(2,RM.two,  "ESCAPES E11",  false);
  const s1=sheet(1,RM.top,  "REGRESION R11",true);
  /* --- the typed body, on the top copy only: the same asunto, typed once --- */
  const tx=s1.x+sw*0.10, ty=s1.y+H*0.115, lh=13;
  g.font="10px ui-monospace,monospace";g.fillStyle=RM.rib;
  ["ASUNTO: el vecino que","camina tapa el paso.","35 tiles sin salida."]
    .forEach((t,i)=>g.fillText(t,tx,ty+i*lh));
  /* the three states, one per copy, ticked in the annex's hand — three words, one fault */
  const stx=tx, sty=ty+3*lh+H*0.028;
  const st=[["NO ARREGLADO",RM.rib],["ESCAPADO",RM.rib],["ABIERTO",RM.rib]];
  g.font="bold 11px ui-monospace,monospace";
  st.forEach((s,i)=>{const yy=sty+i*15;
    g.strokeStyle=RM.rib;g.lineWidth=1;g.strokeRect(stx+.5,yy-9.5,10,10);
    g.strokeStyle=RM.red;g.lineWidth=2;g.beginPath();
    g.moveTo(stx+2,yy-5);g.lineTo(stx+4.5,yy-1.5);g.lineTo(stx+9,yy-8);g.stroke();
    g.fillStyle=s[1];g.fillText(s[0],stx+16,yy);});
  /* the folio box: ruled, empty, and the reason the panel exists */
  const fx=s1.x+sw*0.10, fy=s1.y+sh-H*0.105, fw=sw*0.80, fh=H*0.062;
  g.strokeStyle=RM.red;g.lineWidth=1.5;g.strokeRect(fx+.5,fy+.5,fw,fh);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.red;
  g.fillText("FOLIO",fx+4,fy+13);
  g.strokeStyle=RM.red;g.lineWidth=1;g.beginPath();
  g.moveTo(fx+4,fy+fh-7);g.lineTo(fx+fw-4,fy+fh-7);g.stroke();
  /* --- the annex's tally, on the counter to the right, in its own hand --- */
  const cx=W*0.66, cy=H*0.185;
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=RM.rib;g.textAlign="left";
  g.fillText("EN EL ANEXO",cx,cy);
  g.fillStyle=RM.perf;g.fillRect(cx,cy+5,W*0.26,1.5);
  const rows=[["1","asunto",RM.rib],["4","archivos",RM.rib],["3","estados",RM.rib],["0","folios",RM.red]];
  g.font="10px ui-monospace,monospace";
  rows.forEach((r,i)=>{const yy=cy+H*0.085+i*16;
    g.font="bold 12px ui-monospace,monospace";g.fillStyle=r[2];g.fillText(r[0],cx,yy);
    g.font="10px ui-monospace,monospace";g.fillStyle=RM.grey;g.fillText(r[1],cx+W*0.045,yy);});
  /* the last row ringed, because zero is the number that sent me to the copies */
  const zy=cy+H*0.085+3*16;
  g.strokeStyle=RM.red;g.lineWidth=2;g.beginPath();
  g.ellipse(cx+4,zy-4,W*0.020,H*0.030,0,0,Math.PI*2);g.stroke();
  /* the counter itself: one straight line, the only furniture in the annex */
  g.fillStyle=P.shade;g.fillRect(W*0.63,H*0.845,W*0.32,2.5);
  g.textAlign="left";}
},
{
  id:"zeni-la-caja-afuera", iter:8, date:"2026-09-14", by:"zeni",
  title:{en:"The crate the fence put outside", es:"La caja que la reja dejó afuera"},
  state:{en:"Two crates on the pavement tonight: one sealed and ticketed, one with a key in it and no rail above it to hang a ticket on.", es:"Dos cajas en la banqueta esta noche: una sellada y con boleta, otra con una llave adentro y sin riel arriba donde colgarle boleta."},
  said:{en:"The fence that kept the key out of the box left it standing in the street.", es:"La reja que dejó la llave fuera de la caja la dejó parada en la calle."},
  who:{en:"the customs clerk, who counts the crates nobody inspects as carefully as the ones somebody does", es:"la aduanera, que cuenta las cajas que nadie revisa con el mismo cuidado que las que sí"},
  cap:{en:"The public game's own scan reads every pack folder in the repository for the four forbidden words, which is right, and which is exactly why a household pantry carrying a key can never live there. So it goes and stands outside the fence — and every lock the private town owns is bolted to the private town's own door by name, so the new crate inherits not one of them. One guard doing its job perfectly opened an edge with nothing on it, and the only way to see it was to read both guards' extraction steps in the same hour.", es:"El escaneo del juego público lee cada carpeta de contenido del repositorio buscando las cuatro palabras prohibidas, y hace bien — y por eso mismo una alacena de la casa que carga una llave jamás puede vivir ahí. Entonces se va a parar afuera de la reja — y cada cerradura que tiene el pueblo privado está atornillada con nombre y apellido a su propia puerta, así que la caja nueva no hereda ni una. Una guardia haciendo su trabajo a la perfección abrió un renglón sin nadie enfrente, y sólo se veía leyendo el paso de extracción de las dos guardias en la misma hora."},
  aspect:0.46,
  art:(g,W,H)=>{
  murGround(g,W,H);
  /* ZENI'S HAND, second visit. Not paper this time — TIMBER. A bonded yard: two crates on the
     same pavement, the fence between them, the ticket rail that stops at the last post. The left
     crate is sealed and has a ticket hanging over it. The right one has a key in it, its lid off
     its seat, and nothing above it at all. The clerk is inside the fence with her pen still up. */
  const PINE="#C9A263",SLAT="#A8823F",INK="#3A3226",VERM="#C03A22",RING="#7E2415",
        CHALK="#4E6C82",TWINE="#E4D7B4",BRASS="#D9A441",DUST="#B9AD92",PAPER="#EFE7D2";
  const base=H*0.78,pav=Math.max(2,H*0.045);
  g.fillStyle=DUST;g.fillRect(0,base,W,pav);
  g.fillStyle="#9E9377";g.fillRect(0,base,W,Math.max(1,H*0.014));

  const crate=(x,w,h)=>{const y=base-h,bt=Math.max(2,h*0.10),st=Math.max(2,w*0.08);
    g.fillStyle=PINE;g.fillRect(x,y,w,h);
    g.fillStyle=SLAT;g.fillRect(x,y,w,bt);g.fillRect(x,base-bt,w,bt);
    g.fillRect(x,y,st,h);g.fillRect(x+w-st,y,st,h);
    g.strokeStyle=SLAT;g.lineWidth=Math.max(1,w*0.05);
    g.beginPath();g.moveTo(x+st,base-bt);g.lineTo(x+w-st,y+bt);g.stroke();
    return y;};

  /* ---- inside the fence: the box we publish. Sealed, and its ticket is on the rail ---- */
  const ax=W*0.07,aw=W*0.25,ah=H*0.38,ay=crate(ax,aw,ah),lh=Math.max(3,ah*0.16);
  g.fillStyle=SLAT;g.fillRect(ax-aw*0.05,ay-lh,aw*1.10,lh);
  const sx=ax+aw*0.50,sy=ay-lh*0.45,sr=Math.max(3,aw*0.14);
  g.strokeStyle=TWINE;g.lineWidth=Math.max(1,H*0.010);
  g.beginPath();g.moveTo(sx,sy);g.lineTo(sx-aw*0.32,sy+ah*0.24);g.stroke();
  g.fillStyle=VERM;g.beginPath();g.arc(sx,sy,sr,0,7);g.fill();
  g.strokeStyle=RING;g.lineWidth=Math.max(1,sr*0.30);
  g.beginPath();g.arc(sx,sy,sr*0.56,0,7);g.stroke();

  /* the ticket rail — and it STOPS at the last post */
  const ry=H*0.16,px=W*0.50;
  g.fillStyle=INK;g.fillRect(W*0.04,ry,px-W*0.04,Math.max(2,H*0.020));
  [[W*0.15,H*0.13],[W*0.28,H*0.10]].forEach(t=>{const tx=t[0],th=t[1],tw=W*0.055;
    g.strokeStyle=INK;g.lineWidth=Math.max(1,H*0.008);
    g.beginPath();g.moveTo(tx+tw/2,ry);g.lineTo(tx+tw/2,ry+H*0.05);g.stroke();
    g.fillStyle=PAPER;g.fillRect(tx,ry+H*0.05,tw,th);
    g.fillStyle=DUST;for(let i=1;i<4;i++)g.fillRect(tx+tw*0.14,ry+H*0.05+th*i/4.6,tw*0.72,Math.max(1,H*0.008));});

  /* ---- the fence, and its terminal post ---- */
  const fy=H*0.30;
  g.fillStyle=INK;
  for(let x=W*0.355;x<px-W*0.014;x+=W*0.030)g.fillRect(x,fy,Math.max(1,W*0.009),base-fy);
  g.fillRect(W*0.355,fy,px-W*0.355,Math.max(2,H*0.018));
  g.fillRect(px-W*0.014,fy-H*0.06,Math.max(3,W*0.026),base-fy+H*0.06);

  /* the clerk, inside, pen still up — she can reach one crate and not the other */
  const hh=Math.max(11,Math.round(H*0.17));
  murBody(g,W*0.295,base-hh-Math.round(hh/3),CHALK,hh);
  g.strokeStyle=INK;g.lineWidth=Math.max(1,H*0.013);
  g.beginPath();g.moveTo(W*0.316,base-hh*0.85);g.lineTo(W*0.346,base-hh*1.35);g.stroke();

  /* ---- outside: the second crate. Lid off its seat, a key in the gap, no rail above it ---- */
  const bx=W*0.63,bw=W*0.25,bh=H*0.38,by=crate(bx,bw,bh),blh=Math.max(3,bh*0.16);
  g.save();g.translate(bx-bw*0.05,by-blh*1.25);g.rotate(-0.14);
  g.fillStyle=SLAT;g.fillRect(0,0,bw*1.10,blh);g.restore();
  const kx=bx+bw*0.50,ky=by-Math.max(2,bh*0.06),kl=Math.max(9,bw*0.44);
  g.strokeStyle=BRASS;g.lineCap="butt";
  g.lineWidth=Math.max(2,H*0.020);
  g.beginPath();g.moveTo(kx,ky);g.lineTo(kx+kl,ky-kl*0.30);g.stroke();
  g.lineWidth=Math.max(1.5,H*0.015);
  g.beginPath();g.arc(kx-Math.max(2,H*0.018),ky+Math.max(1,H*0.006),Math.max(2.5,H*0.027),0,7);g.stroke();
  g.lineWidth=Math.max(2,H*0.017);
  g.beginPath();g.moveTo(kx+kl*0.70,ky-kl*0.21);g.lineTo(kx+kl*0.70,ky-kl*0.21+Math.max(3,H*0.036));g.stroke();
  g.beginPath();g.moveTo(kx+kl*0.90,ky-kl*0.27);g.lineTo(kx+kl*0.90,ky-kl*0.27+Math.max(3,H*0.036));g.stroke();

  /* two stencils, and only if they fit — type on this wall is absolute, the crates are not */
  g.font="bold 11px ui-monospace,monospace";g.textAlign="center";g.fillStyle=INK;
  const lab=(t,cx,cy,mw)=>{if(g.measureText(t).width<=mw)g.fillText(t,cx,cy);};
  lab("SELLADO",ax+aw/2,base-ah*0.44,aw*0.86);
  lab("SIN BOLETA",bx+bw/2,base-bh*0.44,bw*0.86);
  g.textAlign="left";}
},
{
  id:"research-map-la-ficha-sin-color", iter:8, date:"2026-09-14", by:"research",
  title:{en:"The uncoloured mark", es:"La marca sin color"},
  state:{en:"Holding that the next quest he asked for is a place on the plan and not a row on a list, and that every source in my sweep is a keyhole, not a page.", es:"Sostengo que el siguiente quest que él pidió es un lugar en el plano y no un renglón en una lista, y que cada fuente de mi barrida es una cerradura, no una página."},
  said:{en:"The games the whole world plays colour the mark by its state — gold open, grey not yet, the next one pulsing. This house signed on the first of September that the ❗ carries no count, colour or age: the plan may say WHERE, and never HOW MANY.", es:"Los juegos que juega todo el mundo pintan la marca según su estado — dorado abierto, gris todavía no, el siguiente latiendo. Esta casa firmó el primero de septiembre que el ❗ no lleva cuenta, color ni edad: el plano puede decir DÓNDE, y nunca CUÁNTOS."},
  who:{en:"research-map, a lens with no persona, who reads what other games measured", es:"research-map, un lente sin persona, que lee lo que otros juegos midieron"},
  cap:{en:"Thirty-three search extracts and sixteen doors shut in my face; two pages read whole, both a standards body's, and one PDF that arrived as bytes I could not read. The line that settles tonight's question was not on the web at all: it was in this repository's rule book, signed on the first of September in the owner's own words. The genre's habit and the house rule point opposite ways, and neither is mine to average.", es:"Treinta y tres extractos de buscador y dieciséis puertas cerradas en la cara; dos páginas leídas enteras, las dos de un organismo de normas, y un PDF que llegó en bytes que no pude leer. La línea que zanja la pregunta de esta noche no estaba en la web: estaba en el reglamento de este mismo repositorio, firmada el primero de septiembre con las palabras del dueño. La costumbre del género y la regla de la casa apuntan en sentidos opuestos, y no me toca a mí promediarlas."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;murGround(g,W,H);
  /* RESEARCH-MAP'S HAND — a catalogue card. My trade's paper is the 3x5 index card in a library
     drawer: a red rule at the head, blue feint below, one hole at the foot for the rod. The finding
     is typed on it the way a cataloguer types a subject heading; the chips down the left are the
     only drawing, and the fourth one is empty on purpose. The provenance is a rubber stamp, because
     a card written from an extract and not from the page says so in its own corner. */
  const cw=W*0.86, ch=H*0.80, cx=W*0.07, cy=H*0.05;
  g.save(); g.translate(cx+cw/2,cy+ch/2); g.rotate(-0.024); g.translate(-cw/2,-ch/2);
  g.fillStyle="rgba(30,25,20,0.20)"; g.fillRect(4,5,cw,ch);                 /* the card's shadow on the wash */
  g.fillStyle="#F7F2E4"; g.fillRect(0,0,cw,ch);                                /* the card */
  g.strokeStyle="#A9BED6"; g.lineWidth=1;                                      /* blue feint */
  for(let y=ch*0.30;y<ch-10;y+=13){g.beginPath();g.moveTo(8,y+.5);g.lineTo(cw-8,y+.5);g.stroke();}
  g.strokeStyle="#C8443A"; g.lineWidth=1.5;                                    /* the red head rule */
  g.beginPath();g.moveTo(0,ch*0.19);g.lineTo(cw,ch*0.19);g.stroke();
  g.fillStyle=P.wash; g.beginPath(); g.arc(cw/2,ch-9,5,0,7); g.fill();          /* the rod hole */
  g.strokeStyle="#B9B19D"; g.lineWidth=1; g.stroke();
  g.textAlign="left"; g.textBaseline="alphabetic";
  g.fillStyle="#2E3440"; g.font="bold 12px ui-monospace,monospace";           /* the subject heading, typed */
  g.fillText("MARKER, QUEST \u2014 colour by state",10,ch*0.14);
  const rows=[ ["#E4B429","WoW  2004",      "gold open \u00b7 grey soon \u00b7 blue again"],
               ["#58CC02","Duolingo 2022",  "one path, one next, and it pulses"],
               ["#E8467C","Candy Crush",    "next level breathes \u00b7 rest sleep"],
               [null,     "Meridian 1 Sep","no count, colour or age \u00b7 OWNER.md"] ];
  g.font="11px ui-monospace,monospace";
  rows.forEach((r,i)=>{const y=ch*0.30+13*(i+1)-3;
    if(r[0]){g.fillStyle=r[0];g.fillRect(10,y-8,9,9);}                        /* three coloured chips */
    else{g.strokeStyle="#2E3440";g.lineWidth=1;g.strokeRect(10.5,y-7.5,8,8);   /* and one left empty */
         g.beginPath();g.moveTo(11,y);g.lineTo(18,y-7);g.stroke();}
    if(i===2){g.strokeStyle="#E8467C";g.globalAlpha=.45;g.lineWidth=1.5;      /* the pulse, drawn as a ring */
              g.strokeRect(7.5,y-10.5,14,14);g.globalAlpha=1;}
    g.fillStyle="#2E3440"; g.fillText(r[1],24,y);
    g.fillStyle=(i===3)?"#C8443A":"#3B4A5C"; g.fillText(r[2],cw*0.34,y);});
  g.fillStyle="#2F4A6B"; g.font="italic 11px ui-monospace,monospace";         /* the cross-reference, in the other ink */
  g.fillText("SEE ALSO: a \u2757 is a place, not a number.",10,ch*0.30+13*6-3);
  g.font="11px ui-monospace,monospace"; g.fillStyle="#7A8794";
  g.fillText("filed 14 Sep",10,ch-6); g.fillText("33 extracts",cw/2+14,ch-6);  /* the accession line, either side of the hole */
  g.restore();
  g.save(); g.translate(W*0.82,H*0.15); g.rotate(0.14); g.globalAlpha=0.62;    /* the rubber stamp, red ink, off-square */
  g.strokeStyle="#B3232A"; g.lineWidth=2; g.strokeRect(-56,-16,112,32);
  g.fillStyle="#B3232A"; g.font="bold 11px ui-monospace,monospace"; g.textAlign="center";
  g.fillText("EXTRACT ONLY",0,-3); g.fillText("16 HOSTS REFUSED",0,10);
  g.restore(); g.textAlign="left";}
},
{
  id:"research-map-una-sola-puerta", iter:8, date:"2026-09-14", by:"research", /* returned as by:"research-map" — the research lenses share one bay */
  title:{en:"One door only", es:"Una sola puerta"},
  state:{en:"Holding that in this game presence already is 'next' — one district open at a time, by the chapter's own hand — and that a rank, a colour or a count would invent a choice the content never offers.", es:"Sostengo que en este juego la presencia ya es el 'siguiente' — un distrito abierto a la vez, por mano del propio capítulo — y que un orden, un color o una cuenta inventarían una elección que el contenido nunca ofrece."},
  said:{en:"The junta feared ten marks on one small plan. I ran every state the game can be in: four on the first morning, two from then on, one at the end. There is no next to rank — there is one lit door.", es:"La junta temió diez marcas en un plano chico. Corrí cada estado en que el juego puede estar: cuatro la primera mañana, dos desde entonces, una al final. No hay siguiente que ordenar — hay una sola puerta encendida."},
  who:{en:"research-map, a lens with no persona, back the same day with a count instead of a catalogue", es:"research-map, un lente sin persona, de vuelta el mismo día con una cuenta en vez de un catálogo"},
  cap:{en:"My first visit this morning filed the genre's colours on a card and left one thing unchecked: two names pending upstairs that I could not explain. Going back for them meant running the whole game forward, chapter by chapter, and reading the engine's own word for somebody-here-has-something-to-say at every step. The two names were the office interview, not a document, and the count that fell out answered a fear the junta wrote down eleven days ago.", es:"Mi primera visita esta mañana fichó los colores del género en una tarjeta y dejó una cosa sin revisar: dos nombres pendientes arriba que no supe explicar. Volver por ellos fue correr el juego entero hacia adelante, capítulo por capítulo, leyendo a cada paso la propia palabra del motor para alguien-aquí-tiene-algo-que-decir. Los dos nombres eran la entrevista de la oficina, no un documento, y la cuenta que salió respondió un miedo que la junta dejó escrito hace once días."},
  aspect:0.46,
  art:(g,W,H)=>{murGround(g,W,H);
  /* RESEARCH-MAP'S HAND, SECOND VISIT — an orienteering map. My first card was a library card;
     this is the other paper my trade reads: an ISOM sheet, where yellow is open ground, white is
     runnable forest, brown is the contour, grey is pavement, black is a building, and the course
     is overprinted in magenta. A score course marks WHERE the controls are, in no order, with no
     numbers — you go to any, the sheet never tells you which. Punched controls are the past. */
  const O={yellow:"#F3CB5C",white:"#FBFAF4",green:"#7DBF6C",brown:"#B5702C",blue:"#8CBDE0",grey:"#C2C2BE",
           black:"#232323",mag:"#E10098",ink:"#2A2A2A"};
  const mw=W*0.66, mh=H*0.80, mx=W*0.03, my=H*0.05;
  g.save(); g.translate(mx+mw/2,my+mh/2); g.rotate(-0.018); g.translate(-mw/2,-mh/2);
  g.fillStyle="rgba(30,25,20,0.22)"; g.fillRect(4,5,mw,mh);                     /* the sheet's shadow */
  g.fillStyle=O.white; g.fillRect(0,0,mw,mh);                                    /* runnable forest */
  g.save(); g.beginPath(); g.rect(0,0,mw,mh); g.clip();
  g.fillStyle=O.yellow;                                                          /* open ground */
  g.beginPath(); g.moveTo(0,mh*0.55); g.bezierCurveTo(mw*0.2,mh*0.35,mw*0.45,mh*0.75,mw*0.7,mh*0.5);
  g.bezierCurveTo(mw*0.85,mh*0.35,mw*0.95,mh*0.7,mw,mh*0.6); g.lineTo(mw,mh); g.lineTo(0,mh); g.closePath(); g.fill();
  g.fillStyle=O.green;                                                           /* a thicket */
  g.beginPath(); g.ellipse(mw*0.84,mh*0.22,mw*0.11,mh*0.13,0.3,0,7); g.fill();
  g.fillStyle=O.blue;                                                            /* the pond */
  g.beginPath(); g.ellipse(mw*0.5,mh*0.86,mw*0.09,mh*0.06,0,0,7); g.fill();
  g.strokeStyle=O.brown; g.lineWidth=1;                                          /* contours */
  for(let i=0;i<5;i++){const yy=mh*(0.12+i*0.16); g.beginPath(); g.moveTo(0,yy);
    g.bezierCurveTo(mw*0.25,yy-mh*0.1,mw*0.5,yy+mh*0.12,mw*0.75,yy-mh*0.06); g.bezierCurveTo(mw*0.85,yy-mh*0.1,mw*0.95,yy+mh*0.02,mw,yy-mh*0.02); g.stroke();}
  g.fillStyle=O.grey; g.fillRect(0,mh*0.40,mw,mh*0.12);                          /* the street, paved */
  g.fillStyle=O.black;                                                           /* the buildings */
  const B=[[0.10,0.20,0.20,0.20],[0.40,0.16,0.14,0.24],[0.62,0.24,0.10,0.16],[0.08,0.58,0.16,0.16],[0.32,0.60,0.12,0.14],[0.70,0.58,0.18,0.18]];
  B.forEach(b=>g.fillRect(mw*b[0],mh*b[1],mw*b[2],mh*b[3]));
  g.restore();
  /* the course overprint: a start triangle at HQ, five punched circles (the past), ONE live circle */
  g.strokeStyle=O.mag; g.lineWidth=2.2; g.lineJoin="round";
  const tri=(x,y,r)=>{g.beginPath();g.moveTo(x,y-r);g.lineTo(x+r*0.87,y+r*0.5);g.lineTo(x-r*0.87,y+r*0.5);g.closePath();g.stroke();};
  tri(mw*0.47,mh*0.28,10);
  const punched=[[0.20,0.30],[0.67,0.32],[0.16,0.66],[0.38,0.67],[0.79,0.67]];
  punched.forEach(([x,y])=>{const cx=mw*x,cy=mh*y; g.save(); g.setLineDash([3,3]); g.globalAlpha=.55;
    g.beginPath(); g.arc(cx,cy,10,0,7); g.stroke(); g.restore();
    g.fillStyle=O.mag; g.globalAlpha=.55; [[-3,-2],[0,-4],[3,-2],[-2,2],[2,2],[0,0]].forEach(([dx,dy])=>{g.beginPath();g.arc(cx+dx,cy+dy,1,0,7);g.fill();}); g.globalAlpha=1;});
  const live=[mw*0.79,mh*0.67];                                                  /* the one lit door, solid over its punched twin */
  g.beginPath(); g.arc(live[0],live[1],11,0,7); g.stroke();
  g.fillStyle=O.white; g.beginPath(); g.arc(live[0],live[1],9,0,7); g.fill();
  g.fillStyle=O.black; g.fillRect(mw*0.70,mh*0.58,mw*0.18,mh*0.18);                /* the building back on top */
  g.strokeStyle=O.mag; g.lineWidth=2.6; g.beginPath(); g.arc(live[0],live[1],11,0,7); g.stroke();
  g.fillStyle=O.mag; g.font="bold 11px ui-monospace,monospace"; g.textAlign="left";
  g.fillText("SCORE-O",6,mh-6); g.textAlign="right"; g.fillText("no numbers",mw-6,mh-6);
  g.restore();
  /* the control-description card, at the right: seven states of the real game, tallied as circles */
  const cx=W*0.72, cy=H*0.06, cw=W*0.26, ch=H*0.78;
  g.fillStyle="rgba(30,25,20,0.18)"; g.fillRect(cx+3,cy+4,cw,ch);
  g.fillStyle=O.white; g.fillRect(cx,cy,cw,ch); g.strokeStyle=O.ink; g.lineWidth=1; g.strokeRect(cx+.5,cy+.5,cw-1,ch-1);
  g.fillStyle=O.ink; g.font="bold 11px ui-monospace,monospace"; g.textAlign="left";
  g.fillText("controls out",cx+6,cy+13);
  g.strokeStyle=O.ink; g.beginPath(); g.moveTo(cx,cy+17.5); g.lineTo(cx+cw,cy+17.5); g.stroke();
  const rows=[["start",4],["ch 1",2],["ch 2",2],["ch 3",2],["ch 4",2],["ch 5",2],["end",1]];
  const rh=(ch-42)/rows.length;
  rows.forEach((r,i)=>{const y=cy+22+i*rh; g.fillStyle=O.ink; g.font="11px ui-monospace,monospace"; g.fillText(r[0],cx+6,y+rh*0.62);
    g.strokeStyle=O.mag; g.lineWidth=1.6; for(let k=0;k<r[1];k++){g.beginPath(); g.arc(cx+cw*0.48+k*11,y+rh*0.5,4,0,7); g.stroke();}
    g.strokeStyle="rgba(42,42,42,.25)"; g.lineWidth=1; g.beginPath(); g.moveTo(cx,y+rh+.5); g.lineTo(cx+cw,y+rh+.5); g.stroke();});
  g.strokeStyle=O.ink; g.lineWidth=1; g.beginPath(); g.moveTo(cx,cy+ch-18.5); g.lineTo(cx+cw,cy+ch-18.5); g.stroke();
  g.fillStyle=O.mag; g.font="bold 12px ui-monospace,monospace"; g.textAlign="right";
  g.fillText("never ten",cx+cw-6,cy+ch-5); g.textAlign="left";}
},
{
  id:"research-form-se-fue-en-la-nota", iter:8, date:"2026-09-14", by:"research", /* returned as by:"research-form" — the research lenses share one bay */
  title:{en:"She left at the note line", es:"Se fue en la línea de la nota"},
  state:{en:"Twenty-eight sources, sixteen doors tried, none opened; every number I carry is a search engine's memory of a page, and each one says so.", es:"Veintiocho fuentes, dieciséis puertas tocadas, ninguna abierta; cada número que traigo es lo que un buscador recuerda de una página, y cada uno lo dice."},
  said:{en:"The box he wants under every question is the box people leave at. Keep it — shut, until she opens it.", es:"La casilla que él quiere bajo cada pregunta es la casilla donde la gente se va. Que se quede — cerrada, hasta que ella la abra."},
  who:{en:"the form researcher, who counts where people stop instead of admiring the form", es:"quien investiga formularios, que cuenta dónde se detiene la gente en vez de admirar la forma"},
  cap:{en:"Three studies, each reached only as an extract, say the same thing: put an open text box beside a closed question and more people leave there, most of all when it comes early. The page as built folds the box behind one tap, calls it optional and puts the typed questions last — every one of those is the right side of the evidence, and the reason written down for folding it was the page jumping, not the people leaving. The pencil on this sheet stops at row five because that is where the studies say it stops.", es:"Tres estudios, cada uno alcanzado sólo como extracto, dicen lo mismo: pon una casilla de texto junto a una pregunta cerrada y más gente se va ahí, sobre todo cuando llega temprano. La página tal como está pliega la casilla tras un toque, la llama opcional y deja las preguntas de escribir al final — cada una de esas cosas cae del lado bueno de la evidencia, y la razón escrita para plegarla fue que la página brincaba, no que la gente se iba. El lápiz de esta hoja se detiene en la fila cinco porque ahí dicen los estudios que se detiene."},
  aspect:0.46,
  art:(g,W,H)=>{murGround(g,W,H);
  /* THE FORM RESEARCHER'S HAND: an optical-mark answer sheet. I do not own a drawing — I own the
     sheet people fill in and the place on it where they stop. White stock, salmon ink, timing marks
     down the left edge, and a No. 2 pencil. Two columns of rows the way a real sheet is printed:
     1–7 on the left, 8–13 on the right. Rows 1–4 bubbled; row 5 bubbled AND its note line written on,
     and the pencil keeps going — off the line, across the empty right column, off the sheet. Rows 6–13
     never got a mark. That is the whole finding: the note box is where she left. */
  const paper="#FBFAF3",ink="#E9958C",inkD="#C4574B",inkL="#F7D3CE",pen="#3C3A3F",tm="#1E1C1F";
  const sx=W*0.035,sy=H*0.045,sw=W*0.93,sh=H*0.87;                 /* the sheet; bottom 6% left clear */
  g.fillStyle="rgba(43,37,54,.18)";g.fillRect(sx+3,sy+3,sw,sh);      /* it lifts off the limewash */
  g.fillStyle=paper;g.fillRect(sx,sy,sw,sh);
  g.strokeStyle=ink;g.lineWidth=1;g.strokeRect(sx+.5,sy+.5,sw-1,sh-1);
  /* header band, and the block you do not write in */
  const hh=sh*0.16;
  g.fillStyle=inkL;g.fillRect(sx,sy,sw,hh);
  g.fillStyle=inkD;g.font="bold 9px ui-monospace,monospace";g.textAlign="left";g.textBaseline="middle";
  g.fillText("AJ-13  ·  USE No.2 PENCIL ONLY",sx+sw*0.075,sy+hh*0.52);
  g.save();g.beginPath();g.rect(sx+sw*0.80,sy+hh*0.18,sw*0.17,hh*0.64);g.clip();
  g.strokeStyle=ink;g.lineWidth=1;for(let k=-hh;k<sw*0.17+hh;k+=4){g.beginPath();g.moveTo(sx+sw*0.80+k,sy+hh*0.18);g.lineTo(sx+sw*0.80+k+hh,sy+hh*0.82);g.stroke();}
  g.restore();g.strokeStyle=ink;g.strokeRect(sx+sw*0.80+.5,sy+hh*0.18+.5,sw*0.17,hh*0.64);
  /* timing marks down the left edge — the machine reads the sheet by these, not by the words */
  const rows=7,top=sy+hh+sh*0.06,pitch=(sh-hh-sh*0.10)/rows,r=Math.max(2.5,pitch*0.30);
  g.fillStyle=tm;for(let i=0;i<rows;i++)g.fillRect(sx+2,top+i*pitch-r*0.5,sw*0.02,r);
  /* two columns of rows: number, five bubbles, a note line */
  const col=(cx,cw,first,n)=>{
    for(let i=0;i<n;i++){const y=top+i*pitch,num=first+i;
      g.fillStyle=inkD;g.font="bold 8px ui-monospace,monospace";g.textAlign="right";g.textBaseline="middle";
      g.fillText(String(num),cx+cw*0.08,y);
      g.strokeStyle=ink;g.lineWidth=1;
      for(let b=0;b<5;b++){g.beginPath();g.ellipse(cx+cw*(0.15+b*0.095),y,r,r*0.82,0,0,7);g.stroke();}
      g.beginPath();g.moveTo(cx+cw*0.66,y+r*0.8);g.lineTo(cx+cw*0.98,y+r*0.8);g.stroke();   /* the note line */
    }};
  const c1=sx+sw*0.05,c2=sx+sw*0.52,cw=sw*0.43;
  col(c1,cw,1,7);col(c2,cw,8,6);
  /* the pencil: rows 1–4 bubbled — one each, not the same letter, she was reading them */
  const fill=(cx,i,b)=>{const y=top+i*pitch;g.fillStyle=pen;g.beginPath();g.ellipse(cx+cw*(0.15+b*0.095),y,r*0.9,r*0.72,0,0,7);g.fill();};
  [[0,1],[1,3],[2,0],[3,2],[4,1]].forEach(([i,b])=>fill(c1,i,b));
  /* row 5's note line: three words, then the pencil leaves the line, crosses the empty column, and
     goes off the sheet. Rows 6–13 have no mark on them. */
  const y5=top+4*pitch;g.strokeStyle=pen;g.lineWidth=Math.max(1.2,r*0.36);g.lineCap="round";g.lineJoin="round";
  g.beginPath();let x=c1+cw*0.67;g.moveTo(x,y5+r*0.5);
  for(let k=0;k<9;k++){x+=cw*0.033;g.quadraticCurveTo(x-cw*0.016,y5-r*0.9+(k%2)*r*0.5,x,y5+r*0.5);}   /* the words */
  g.quadraticCurveTo(c2-cw*0.02,y5+r*1.4,c2+cw*0.10,y5+pitch*0.9);                                      /* off the line */
  g.bezierCurveTo(c2+cw*0.45,y5+pitch*2.2,c2+cw*0.55,y5-pitch*0.4,c2+cw*0.86,y5+pitch*0.55);           /* through the empty column */
  g.quadraticCurveTo(sx+sw*1.01,y5+pitch*0.7,W*0.995,y5+pitch*0.35);                                    /* off the sheet */
  g.stroke();g.lineCap="butt";g.lineJoin="miter";
  /* the graphite smudge where a real pencil pressed hardest — the bubble on row 5 */
  g.fillStyle="rgba(60,58,63,.28)";g.beginPath();g.ellipse(c1+cw*(0.15+1*0.095)+r*0.6,y5+r*0.6,r*1.5,r*0.9,0.4,0,7);g.fill();
  g.textAlign="left";g.textBaseline="alphabetic";}
}
);

/* ---- ITERATION 9 — 2026-09-14: the UI review of the journey mock-ups (docs/UI-REVIEW.md, block 1) ----
   Eight reviewers signed a line that can be false and eight painted: Lupe, Rosa, Pili, Beto, Nacho, Paty, Chava,
   Doña Remedios. Words verbatim from docs/meetings/2026-09-14-la-cuadrilla-run-9.md; each hand its own material. ---- */
MURALS.push(
{
  id:"lupe-el-segundo-no-venia", iter:9, date:"2026-09-14", by:"lupe",
  title:{en:"The second the shutter opened", es:"El segundo en que abrió el obturador"},
  state:{en:"holding a two-row review and calling it two rows", es:"tengo una revisión de dos filas y la llamo de dos filas"},
  said:{en:"The picture was true. The second was not on the ticket.", es:"La foto era cierta. El segundo no venía en el boleto."},
  who:{en:"Lupe, who runs the same list on every car and fails people", es:"Lupe, que le pasa la misma lista a todos los coches y reprueba gente"},
  cap:{en:"The ticket on every picture said the size, the language, the shell and whether the scroll box was on. All four were true. One frame still showed the same sentence printed twice, over itself, and I had the bug half written. It was a toast at eighty-two per cent, dying; by the sixth second the screen is clean. Four frames of the same screen, four seconds apart, and the fault is only in the first one. A ticket that says everything about where the picture was taken and nothing about when is a ticket that lets a tester invent a bug.", es:"El boleto de cada foto traía el tamaño, el idioma, el cascarón y si la caja de scroll estaba puesta. Los cuatro datos eran ciertos. Aun así un cuadro mostraba la misma frase impresa dos veces, encima de sí misma, y yo ya tenía medio escrito el reporte. Era un aviso al ochenta y dos por ciento, muriéndose; al sexto segundo la pantalla está limpia. Cuatro cuadros de la misma pantalla, con cuatro segundos de diferencia, y la falla sólo está en el primero. Un boleto que lo dice todo sobre dónde se tomó la foto y nada sobre cuándo es un boleto que deja a una verificadora inventarse un bug."},
  aspect:0.42,
  art:(g,W,H)=>{const P=MURPAL;
    /* LUPE'S HAND, FOURTH VISIT. Not glass this time: ACETATE. A strip of 35 mm film on an amber
       light table — sprocket holes punched down both rebates, the timecode burned in the clear band
       under each frame. Four frames of the SAME screen at four seconds. The bug is in frame one and
       it is only in frame one. My light box was cool cyan; a contact strip is warm and perforated. */
    const TABLE="#2A1F14", BASE="#E8A33C", ACET="#F3BD6B", REB="#C4842A", FRAME="#140E08",
          INK="#1B1208", WAX="#E03020", SCR="#221C2B", LIT="#EFE7D6";
    murPaper(g,W,H,TABLE,null);
    g.fillStyle="#3A2A18";g.fillRect(0,0,W,2);

    /* the strip runs off both edges, because a strip always came from somewhere */
    const sy=H*0.285, sh=H*0.450, sx=-W*0.03, sw=W*1.06;
    g.fillStyle=BASE;g.fillRect(sx,sy,sw,sh);
    g.fillStyle=ACET;g.fillRect(sx,sy+sh*0.13,sw,sh*0.74);
    const ph=sh*0.080, pw=W*0.020, step=W*0.0455;
    g.fillStyle=TABLE;
    for(let x=sx+W*0.012;x<sx+sw;x+=step){g.fillRect(x,sy+sh*0.025,pw,ph);g.fillRect(x,sy+sh*0.895,pw,ph);}

    /* four frames, and a clear rebate band under them for the timecode */
    const n=4, gap=W*0.016, fx0=W*0.050, span=W*0.845, fw=(span-gap*(n-1))/n;
    const fy=sy+sh*0.170, fh=sh*0.520, tcy=sy+sh*0.800;
    const secs=["2.6 s","4.0 s","6.0 s","14.0 s"], alpha=[0.82,0.23,0,0];
    g.fillStyle=REB;g.fillRect(fx0-W*0.012,fy+fh+sh*0.030,span+W*0.024,sh*0.150);
    for(let i=0;i<n;i++){
      const x=fx0+i*(fw+gap);
      g.fillStyle=FRAME;g.fillRect(x-2,fy-2,fw+4,fh+4);
      g.fillStyle=SCR;g.fillRect(x,fy,fw,fh);
      g.fillStyle="#6E6480";g.fillRect(x+fw*0.08,fy+fh*0.12,fw*0.62,2);        /* the ticker: permanent, */
      g.fillStyle=LIT;    g.fillRect(x+fw*0.08,fy+fh*0.23,fw*0.70,2.5);        /* correct, in every frame */
      g.fillStyle="#9A90AC";g.fillRect(x+fw*0.08,fy+fh*0.32,fw*0.44,2);
      g.fillStyle="#463C58";g.fillRect(x+fw*0.06,fy+fh*0.60,fw*0.88,fh*0.32);  /* the little world under it */
      g.fillStyle="#D8CDB4";g.fillRect(x+fw*0.20,fy+fh*0.69,fw*0.60,fh*0.15);
      if(alpha[i]>0){g.globalAlpha=alpha[i];                                    /* THE TOAST, dying */
        g.fillStyle="#0C0A12";g.beginPath();g.ellipse(x+fw*0.50,fy+fh*0.31,fw*0.40,fh*0.21,0,0,7);g.fill();
        g.fillStyle="#EDE7DC";
        for(let k=0;k<3;k++)g.fillRect(x+fw*0.22+(k===2?fw*0.08:0),fy+fh*0.24+k*(fh*0.058),fw*(0.56-k*0.10),2);
        g.globalAlpha=1;}
      g.fillStyle=INK;g.font="bold 9px ui-monospace,monospace";g.textAlign="center";
      g.fillText(secs[i],x+fw*0.5,tcy+3);g.textAlign="left";}

    /* the grease pencil: a tester's circle round frame one, and the words she nearly wrote */
    g.strokeStyle=WAX;g.lineWidth=2.6;g.globalAlpha=.93;
    g.beginPath();g.ellipse(fx0+fw*0.50,fy+fh*0.36,fw*0.63,fh*0.46,-0.04,0,7);g.stroke();
    g.beginPath();g.moveTo(fx0+fw*0.46,fy-fh*0.16);g.lineTo(fx0+fw*0.22,sy-H*0.030);g.stroke();
    g.globalAlpha=1;

    /* lettering — absolute; every fraction above was chosen against it. Two lines, never one. */
    g.fillStyle="#F2DCB4";g.font="bold 11px ui-monospace,monospace";
    g.fillText("TIRA DE CONTACTO · VERIFICACIÓN",W*0.050,H*0.100);
    g.fillStyle=WAX;g.font="bold 11px ui-monospace,monospace";
    g.fillText("«SE ENCIMAN»",W*0.050,H*0.190);
    g.fillStyle="#C8A46A";g.font="9px ui-monospace,monospace";
    g.fillText("— el bug que casi levanto",W*0.050+g.measureText("«SE ENCIMAN»x").width*1.22,H*0.190);

    g.font="9px ui-monospace,monospace";
    g.fillStyle="#E6C48A";g.fillText("EL BOLETO DICE   fila · idioma · cascarón · recorte",W*0.050,H*0.845);
    g.fillStyle=WAX;g.font="bold 9px ui-monospace,monospace";
    g.fillText("NO DICE          en qué segundo abrió el obturador",W*0.050,H*0.930);
    /* the tester, clear of the strip, three lines of type tall; feet at 0.93H (the wall cuts 6%) */
    const bh=H*0.175; murBody(g,W*0.930,H*0.760-bh,"#E8A33C",bh);
}
},
{
  id:"rosa-el-tercer-renglon", iter:9, date:"2026-09-14", by:"rosa",
  title:{en:"The third one", es:"El tercer renglón"},
  state:{en:"I hold that a control is not reachable until a press at its centre answers with its own name — measured, not assumed. Fifty-two of its fifty-six pixels were under the bar.", es:"Sostengo que un control no está al alcance hasta que un toque en su centro responde con su propio nombre — medido, no supuesto. Cincuenta y dos de sus cincuenta y seis píxeles estaban bajo la barra."},
  said:{en:"She aimed at the third answer. The page took it as done.", es:"Apuntó al tercer renglón. La página lo tomó por terminado."},
  who:{en:"Rosa Villalobos, who lays acetate over a screen and marks it in grease pencil before she says a word about it.", es:"Rosa Villalobos, que pone acetato sobre una pantalla y lo marca con lápiz graso antes de decir una palabra."},
  cap:{en:"The box measured 560 by 56 and passed every rule I own. It passed because I was measuring the box and not the press. Asking what is at its centre answered with the name of another button — and pressing there moved her on a question she had not finished.", es:"La caja medía 560 por 56 y pasaba todas mis reglas. Pasaba porque yo medía la caja y no el toque. Al preguntar qué hay en su centro, respondió con el nombre de otro botón — y tocar ahí la pasó a la siguiente pregunta sin haber terminado la suya."},
  aspect:0.46,
  art:(g,W,H)=>{
  /* ROSA — registration acetate over a phone held sideways, marked in grease pencil.
     The wall's ground; everything above it is my own kit and my own palette. */
  murGround(g,W,H);
  const R={acet:"rgba(174,196,205,0.30)",edge:"#93AAB4",tape:"#E9DCB0",
           case:"#34343E",scr:"#17141E",pill:"#4A4656",pillL:"#5E5870",bar:"#221D2C",
           lilac:"#A97FFF",bone:"#EDE7DA",red:"#CE2B26",pale:"rgba(206,43,38,0.18)",cyan:"#2D7F8F"};
  const LH=16, M=12;                       /* the lettering is the ruler: 12px type, 16px line */
  const ax=M, ay=LH*0.7, aw=W-2*M, ah=H-LH*2.1-ay;
  g.fillStyle=R.acet;g.fillRect(ax,ay,aw,ah);
  g.strokeStyle=R.edge;g.lineWidth=1.5;g.strokeRect(ax+.5,ay+.5,aw,ah);
  g.globalAlpha=.26;g.fillStyle="#FFFFFF";
  g.beginPath();g.moveTo(ax,ay+ah*0.70);g.lineTo(ax+aw,ay+ah*0.22);g.lineTo(ax+aw,ay+ah*0.34);g.lineTo(ax,ay+ah*0.84);g.closePath();g.fill();
  g.globalAlpha=1;
  g.fillStyle="#C3CED4";[0.22,0.50,0.78].forEach(t=>{g.beginPath();g.arc(ax+8,ay+ah*t,3.2,0,7);g.fill();});
  const colW=Math.ceil(7.3*17)+18;          /* "the third answer" at 12px ui-monospace, plus air */
  let pw=Math.max(LH*8, aw-colW-LH*1.6), ph=Math.round(pw*0.46);
  const maxPh=ah-LH*3.2; if(ph>maxPh){ph=Math.max(LH*4,maxPh);pw=Math.round(ph/0.46);}
  const px=ax+aw-pw-LH*0.8, py=ay+(ah-LH*1.6-ph)/2+LH*0.2;
  g.fillStyle=R.case;g.fillRect(px-4,py-4,pw+8,ph+8);
  g.fillStyle=R.scr;g.fillRect(px,py,pw,ph);
  g.fillStyle="#6E6E7A";g.fillRect(px+8,py+7,Math.round(pw*0.32),3);
  g.fillStyle="#E0A430";g.fillRect(px+pw-Math.round(pw*0.26)-8,py+7,Math.round(pw*0.26),3);
  g.fillStyle="#3A3446";g.fillRect(px+8,py+15,pw-16,3);
  g.fillStyle=R.lilac;g.fillRect(px+8,py+15,Math.round(pw*0.07),3);     /* the bar counts UP. no clock */
  const oh=Math.round(ph*0.18), og=Math.round(ph*0.045), ox=px+8, ow=pw-16;
  const oy=[0,1,2].map(i=>py+Math.round(ph*0.26)+i*(oh+og));
  oy.forEach((y,i)=>{g.fillStyle=R.pill;g.fillRect(ox,y,ow,oh);
    g.strokeStyle=R.pillL;g.lineWidth=1;g.strokeRect(ox+.5,y+.5,ow-1,oh-1);
    g.fillStyle="#8E88A0";g.fillRect(ox+5,y+Math.round(oh/2)-3,6,6);
    g.fillStyle=R.bone;g.fillRect(ox+16,y+Math.round(oh/2)-2,Math.round(ow*(i===2?0.40:0.28)),3);});
  const bh=Math.round(ph*0.22), by=py+ph-bh;                            /* the bar, ON TOP of pill 3 */
  g.fillStyle=R.bar;g.fillRect(px,by,pw,bh);
  g.fillStyle="#3A3446";g.fillRect(px,by,pw,1);
  const bw=Math.round(pw*0.16);
  g.strokeStyle="#6E6E7A";g.lineWidth=1;g.strokeRect(px+8.5,by+4.5,bw,Math.max(4,bh-9));
  const nxw=Math.round(pw*0.40), nxx=px+12+bw;
  g.fillStyle=R.lilac;g.fillRect(nxx,by+4,nxw,Math.max(5,bh-8));
  g.fillStyle="#7E7890";g.fillRect(px+pw-bw-4,by+Math.round(bh/2)-2,bw-4,3);
  g.font="bold 9px ui-monospace,monospace";g.fillStyle="#1B1524";g.textAlign="center";
  g.fillText("NEXT",nxx+nxw/2,by+Math.round(bh/2)+3.5);g.textAlign="left";
  [[ax+aw*0.16,ay-5],[ax+aw*0.80,ay-5]].forEach(([tx,ty],i)=>{         /* tape over the sheet's edge */
    g.save();g.translate(tx,ty);g.rotate(i?0.05:-0.07);g.globalAlpha=.85;
    g.fillStyle=R.tape;g.fillRect(-16,0,32,11);g.globalAlpha=1;g.restore();});
  /* ---- the grease pencil, on the acetate ---- */
  const cx=ox+Math.round(ow*0.26), cy=oy[2]+Math.round(oh/2), TH=22;
  g.fillStyle=R.pale;g.beginPath();g.ellipse(cx,cy,TH,TH,0,0,7);g.fill();  /* 44 px across: the thumb */
  g.strokeStyle=R.red;g.lineWidth=2.4;g.beginPath();g.ellipse(cx,cy,TH,TH,0,0,7);g.stroke();
  g.lineWidth=1.1;for(let i=1;i<=4;i++){g.beginPath();g.ellipse(cx,cy,4+i*3.4,6+i*3.7,0.25,-0.45,3.6);g.stroke();}
  g.lineWidth=2.2;g.beginPath();g.moveTo(cx-6,cy-6);g.lineTo(cx+6,cy+6);g.moveTo(cx+6,cy-6);g.lineTo(cx-6,cy+6);g.stroke();
  g.setLineDash([5,4]);g.lineWidth=2;g.strokeStyle=R.red;                 /* the option, where it really is */
  g.strokeRect(ox-2.5,oy[2]-2.5,ow+5,oh+5);g.setLineDash([]);
  g.font="bold 11px ui-monospace,monospace";g.fillStyle=R.red;
  g.fillText("52 of 56 px under the bar",px,py+ph+LH*1.15);
  g.strokeStyle=R.red;g.lineWidth=2.6;g.setLineDash([7,5]);                /* where the press landed */
  g.beginPath();g.moveTo(cx,cy+22);g.quadraticCurveTo(cx+10,by+bh+LH*1.2,nxx+nxw/2,by+bh+LH);g.stroke();g.setLineDash([]);
  g.beginPath();g.moveTo(nxx+nxw/2,by+bh+2);g.lineTo(nxx+nxw/2-7,by+bh+13);g.lineTo(nxx+nxw/2+7,by+bh+13);g.closePath();g.fillStyle=R.red;g.fill();
  const tx0=ax+12, ty0=ay+Math.max(LH*1.4,(ah-LH*5.4)/2);
  g.font="bold 12px ui-monospace,monospace";g.fillStyle=R.red;
  g.fillText("MEANT:",tx0,ty0);
  g.fillText("the third answer",tx0,ty0+LH);
  g.fillText("GOT:",tx0,ty0+LH*2.4);
  g.fillText("question 2",tx0,ty0+LH*3.4);
  murDim(g,tx0,tx0+44,ty0+LH*5.0,R.red,"44 = A THUMB");
  g.font="12px ui-monospace,monospace";g.fillStyle=R.cyan;g.textAlign="right";
  g.fillText("844 × 390 · acetate over the real screen",W-M,H-6);g.textAlign="left";
}
},
{
  id:"pili-el-mismo-burro", iter:9, date:"2026-09-14", by:"pili",
  title:{en:"The same donkey, four colours", es:"El mismo burro, de cuatro colores"},
  state:{en:"holding that a tile must differ in shape before it differs in hue", es:"sostengo que una ficha debe cambiar de forma antes que de color"},
  said:{en:"If it only changes colour, turn off the light and count what's left.", es:"Si nomás le cambias el color, apaga la luz y cuenta lo que queda."},
  who:{en:"Pili, piñatera, who builds things that must be recognised while they spin", es:"Pili, piñatera, que hace cosas que deben reconocerse mientras giran"},
  cap:{en:"A merge board came to me with twenty tiles on it. Four kitchens, four grounds, four warm browns — and one body drawn under all of them, the same rectangle with the same cap and the same little dot. Colour was carrying the only question that game asks. Then the rank lightened the ground too, and a tier-five comal landed nine points from a tier-one board: two meanings on one channel, both of them lost. In the yard you hang three piñatas and the child is blindfolded. Nobody has ever found the donkey by its colour.", es:"Me llegó un tablero de fusión con veinte fichas. Cuatro cocinas, cuatro fondos, cuatro cafés calientitos — y un solo cuerpo debajo de todos, el mismo rectángulo con la misma tapa y el mismo puntito. El color cargaba la única pregunta que ese juego hace. Luego el rango aclaró el fondo también, y un comal de nivel cinco quedó a nueve puntos de una tabla de nivel uno: dos significados en un solo canal, y los dos se perdieron. En el patio cuelgas tres piñatas y al niño lo vendan. Nadie ha encontrado nunca al burro por su color."},
  aspect:0.46,
  art:(g,W,H)=>{
    /* PILI'S HAND. Not a drawing board: PAPEL DE CHINA over newsprint and engrudo, with a stapled
       cardboard rim. My palette, not the wall's: crepe rose, crepe green, crepe amber, cardboard,
       paste grey, and the dark of a yard at eight o'clock. Two halves — the lit yard, where three
       piñatas are three colours; and the yard with the light off, where they are one shape.
       Everything sized against the 11px lettering: the child is three lines of type tall. */
    const NEWS="#EDE6D6", ENGRUDO="#D6CDB6", CARTON="#C08A4E", CARTON_D="#9A6A36",
          ROSA="#D6246E", VERDE="#16A06A", AMBAR="#F2C230", TINTA="#2B1F2A",
          NOCHE="#241A2B", CENIZA="#8E8598", CORDEL="#7A6A55";
    murPaper(g,W,H,NEWS,null);

    /* newsprint under the crepe: broken column rules, the paste showing through */
    g.globalAlpha=.30;g.fillStyle=ENGRUDO;
    for(let i=0;i<9;i++){const y=H*(0.14+i*0.085);g.fillRect(W*0.04,y,W*(0.18+((i*7)%5)*0.06),2);}
    g.globalAlpha=.22;
    for(let i=0;i<5;i++)g.beginPath(),g.ellipse(W*(0.12+i*0.19),H*(0.30+((i*3)%4)*0.15),W*0.055,H*0.05,0.4,0,7),g.fill();
    g.globalAlpha=1;

    /* the stapled cardboard rim — this panel is a piece of a piñata, not a page */
    g.fillStyle=CARTON;g.fillRect(0,0,W,H*0.055);g.fillRect(0,H-H*0.055,W,H*0.055);
    g.fillStyle=CARTON_D;
    for(let x=W*0.03;x<W*0.98;x+=W*0.055){g.fillRect(x,H*0.018,3,H*0.020);g.fillRect(x,H-H*0.038,3,H*0.020);}

    /* the fringe: a strip of cut crepe along the top of the lit half */
    const fringe=(x0,x1,y,c)=>{g.fillStyle=c;g.fillRect(x0,y,x1-x0,H*0.026);
      for(let x=x0;x<x1;x+=5){const d=H*(0.020+((x|0)%3)*0.009);g.fillRect(x,y+H*0.026,3,d);}};
    fringe(W*0.045,W*0.615,H*0.075,ROSA);

    /* ---- the piñata: ONE outline, used four times. Body, head, ears, four legs, tail ---- */
    const donkey=(cx,cy,s,body,band,dark)=>{
      g.fillStyle=CORDEL;g.fillRect(cx-1,0,2,cy-s*0.62);                       /* the cord */
      g.fillStyle=body;
      g.beginPath();g.ellipse(cx,cy,s*0.62,s*0.42,0,0,7);g.fill();             /* the barrel */
      g.beginPath();g.ellipse(cx+s*0.62,cy-s*0.40,s*0.26,s*0.22,0.2,0,7);g.fill(); /* the head */
      g.fillRect(cx+s*0.52,cy-s*0.86,s*0.10,s*0.30);                           /* ear */
      g.fillRect(cx+s*0.70,cy-s*0.90,s*0.10,s*0.34);                           /* ear */
      [-0.42,-0.14,0.20,0.46].forEach((o,i)=>g.fillRect(cx+s*o,cy+s*0.30,s*0.13,s*(0.46+(i%2)*0.07)));
      g.fillStyle=dark;g.fillRect(cx-s*0.74,cy-s*0.34,s*0.14,s*0.52);          /* the tail */
      g.fillStyle=band;                                                        /* crepe bands: the ONLY difference */
      for(let i=0;i<4;i++)g.fillRect(cx-s*0.60,cy-s*0.34+i*s*0.21,s*1.20,s*0.07);
      g.fillStyle=dark;g.beginPath();g.arc(cx+s*0.70,cy-s*0.44,Math.max(2,s*0.055),0,7);g.fill(); /* the eye */
    };
    const trim=(c)=>c;                                                          /* names kept honest */

    /* ---- LEFT: the lit yard. Three donkeys, three crepes, and they look like three things ---- */
    const by=H*0.46, s=H*0.20;
    donkey(W*0.150,by,s,ROSA ,"#F07FA8",TINTA);
    donkey(W*0.325,by,s,VERDE,"#7FD9B4",TINTA);
    donkey(W*0.500,by,s,AMBAR,"#FBE39A",TINTA);

    /* the child: blindfolded, with the stick. Three lines of type tall — the ruler on this wall */
    const bh=H*0.215;
    murBody(g,W*0.300,H*0.895-bh,TINTA,bh);
    g.strokeStyle=CARTON_D;g.lineWidth=3;g.beginPath();
    g.moveTo(W*0.300+bh*0.16,H*0.895-bh*0.42);g.lineTo(W*0.392,H*0.895-bh*0.98);g.stroke();
    g.fillStyle=ROSA;g.fillRect(W*0.300-bh*0.13,H*0.895-bh*0.92,bh*0.26,bh*0.075); /* the blindfold */

    /* ---- RIGHT: the same yard with the light off. One shape, three times, no colour left ---- */
    const nx=W*0.630, nw=W*0.325, ny=H*0.090, nh=H*0.700;
    g.fillStyle=NOCHE;g.fillRect(nx,ny,nw,nh);
    g.strokeStyle=TINTA;g.lineWidth=2;g.strokeRect(nx+1,ny+1,nw-2,nh-2);
    const s2=nh*0.165;
    donkey(nx+nw*0.30,ny+nh*0.30,s2,CENIZA,CENIZA,CENIZA);
    donkey(nx+nw*0.66,ny+nh*0.30,s2,CENIZA,CENIZA,CENIZA);
    donkey(nx+nw*0.48,ny+nh*0.63,s2,CENIZA,CENIZA,CENIZA);
    g.fillStyle="#BFB6C6";g.font="bold 11px ui-monospace,monospace";
    g.fillText("APAGA LA LUZ",nx+nw*0.10,ny+nh*0.90);
    g.font="9px ui-monospace,monospace";g.fillStyle="#8E8598";
    g.fillText("mismo bulto ×3",nx+nw*0.10,ny+nh*0.965);

    /* the lettering on the crepe — absolute 11px, and every fraction above was cut against it */
    g.fillStyle=TINTA;g.font="bold 11px ui-monospace,monospace";
    g.fillText("PAPEL DE CHINA · PRUEBA DE BULTO",W*0.050,H*0.140);
    g.font="9px ui-monospace,monospace";g.fillStyle="#5E5148";
    g.fillText("silueta primero · color después · detalle al último",W*0.050,H*0.945);
    /* the one number that cost something to find, written where a piñatera writes it: on the paper */
    g.fillStyle=ROSA;g.font="bold 9px ui-monospace,monospace";
    g.fillText("comal n5 152.9  ·  tabla n1 162.3  ·  Δ 9.4",W*0.050,H*0.885);
}
},
{
  id:"beto-pieza-de-otro-cajon", iter:9, date:"2026-09-14", by:"beto",
  title:{en:"Part from the wrong bin", es:"Pieza de otro cajón"},
  state:{en:"pricing pictures, and not one of them without measuring it in the running game first", es:"cotizando dibujos, y ninguno sin medirlo antes en el juego corriendo"},
  said:{en:"The reader is wearing the settings panel's overalls. Nobody ordered that part.", es:"El lector trae puesto el overol del panel de ajustes. Esa pieza nadie la pidió."},
  who:{en:"Beto, who keeps the engine and will not price a picture he has not measured", es:"Beto, que cuida el motor y no cotiza un dibujo que no midió"},
  cap:{en:"The mock said the house card was zero engine change and zero shell change. I opened it in the running game and measured it instead: every tick-box label came out ten and a half pixels, monospace, SHOUTING, the wrong grey — because the reader is built out of the settings panel and quietly inherits its uniform. The rule that was meant to stop that dresses the box around the labels, not the labels. The box itself is thirteen pixels of factory blue on a purple night page. I had a clean explanation and I nearly wrote it down. It was wrong. Two parts look the same until you put them side by side on the bench.", es:"El boceto decía que la tarjeta de la casa no costaba ni una línea de motor ni una de cascarón. La abrí en el juego corriendo y mejor la medí: cada etiqueta de casilla salió de diez píxeles y medio, monoespaciada, GRITANDO, del gris equivocado — porque el lector está hecho del panel de ajustes y hereda su overol sin avisar. La regla que debía impedirlo viste la caja alrededor de las etiquetas, no las etiquetas. La casilla misma son trece píxeles de azul de fábrica sobre una página morada de noche. Yo ya tenía una explicación limpia y casi la escribo. Estaba mal. Dos piezas se ven iguales hasta que las pones lado a lado en el banco."},
  aspect:0.46,
  art:(g,W,H)=>{const P=MURPAL;
  /* BETO'S HAND, FOURTH VISIT. Not a drawing-office sheet and not a rolling-road printout:
     a SPARES CATALOGUE PAGE off the bench — greasy newsprint, two parts laid side by side,
     circled part numbers on leader lines, a parts list whose last column says who supplied it,
     and a red rubber stamp across the one that came from the wrong bin.
     Everything is fractions of W and H; the 11px lettering is the ruler. Painted and looked at
     at 520x239 and 360x166 before it was handed over. Three repaints: the mechanic was a slab,
     the size captions collided with the leader bubbles, the stamp sat on top of number 2. */
  const NEWS="#E9E1CE", GREASE="#D9CFB6", INK="#23201B", MUTE="#7E7461",
        BLUE="#0A84FF", VIOLET="#7A3FE0", NIGHT="#1C1A22", STAMP="#B0261C";
  murPaper(g,W,H,NEWS,null);
  /* the grease: a coffee ring and a thumb smear, because this page lives on a bench */
  g.strokeStyle="rgba(150,120,70,.30)";g.lineWidth=Math.max(3,H*0.020);
  g.beginPath();g.arc(W*0.795,H*0.895,H*0.085,0,7);g.stroke();
  g.fillStyle="rgba(150,120,70,.07)";
  g.beginPath();g.ellipse(W*0.100,H*0.950,W*0.040,H*0.022,0.2,0,7);g.fill();
  g.fillStyle=INK;g.fillRect(0,0,W,2);

  g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
  g.fillText("CATÁLOGO DE REFACCIONES · EL LECTOR",W*0.055,H*0.095);
  g.strokeStyle=MUTE;g.lineWidth=1;g.beginPath();g.moveTo(W*0.055,H*0.125);g.lineTo(W*0.945,H*0.125);g.stroke();

  /* one bay: a tick-box and its word, laid out like a part on a bench */
  const bay=(x,y,w,h,fitted,size)=>{
    g.fillStyle=GREASE;g.fillRect(x,y,w,h);
    g.strokeStyle=MUTE;g.lineWidth=1;g.strokeRect(x+.5,y+.5,w,h);
    if(fitted){g.fillStyle=NIGHT;g.fillRect(x+4,y+4,w-8,h-8);}     /* as fitted, it sits on the night page */
    g.fillStyle=fitted?"#6E6880":MUTE;g.font="9px ui-monospace,monospace";
    g.fillText(size,x+w*0.07,y+h*0.20);
    const cy=y+h*0.58;
    const s=fitted?h*0.155:h*0.290, bx=x+w*0.10, by=cy-s/2;        /* 13 px against what it should be */
    g.fillStyle=fitted?BLUE:VIOLET;g.fillRect(bx,by,s,s);
    g.strokeStyle="#FFFFFF";g.lineWidth=Math.max(2,s*0.16);g.lineCap="round";
    g.beginPath();g.moveTo(bx+s*0.22,by+s*0.52);g.lineTo(bx+s*0.44,by+s*0.76);g.lineTo(bx+s*0.80,by+s*0.24);g.stroke();
    g.lineCap="butt";
    const wx=bx+s+w*0.075;
    if(fitted){g.fillStyle="#635E6E";                               /* all one height: it is SHOUTING */
      for(let i=0;i<6;i++)g.fillRect(wx+i*(w*0.052),cy-h*0.040,w*0.028,h*0.080);}
    else{g.fillStyle=INK;const hs=[1,.60,.60,.60,.60,1.05];         /* mixed case: an ascender and a descender */
      for(let i=0;i<6;i++){const bh=h*0.075*hs[i];g.fillRect(wx+i*(w*0.050),cy+h*0.048-bh,w*0.034,bh);}
      g.fillRect(wx+5*(w*0.050),cy+h*0.048,w*0.034,h*0.030);}
    g.strokeStyle=MUTE;g.setLineDash([3,3]);g.lineWidth=1;          /* the hit area is the same on both. That is the trap */
    g.strokeRect(bx-w*0.035,cy-h*0.22,w*0.74,h*0.44);g.setLineDash([]);
    return {bx,by,s,cy,x,y,w,h};
  };
  const bw=W*0.375, bh=H*0.325, by0=H*0.205;
  const L=bay(W*0.055,by0,bw,bh,false,"13.6 px · mixta");
  const R=bay(W*0.520,by0,bw,bh,true ,"10.56 px · VERSALES");
  g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
  g.fillText("COMO SE PIDIÓ",W*0.055,H*0.185);
  g.fillText("COMO SALIÓ",W*0.520,H*0.185);

  const rad=Math.max(8,H*0.048);
  const bub=(x,y,n)=>{g.fillStyle=NEWS;g.strokeStyle=INK;g.lineWidth=1.5;
    g.beginPath();g.arc(x,y,rad,0,7);g.fill();g.stroke();
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";g.textAlign="center";
    g.fillText(String(n),x,y+4);g.textAlign="left";};
  const lead=(x1,y1,x2,y2)=>{g.strokeStyle=INK;g.lineWidth=1;
    g.beginPath();g.moveTo(x1,y1);g.lineTo(x2,y2);g.stroke();};
  lead(R.bx+R.s*0.5,R.cy+R.s*0.5,W*0.470,H*0.578);  bub(W*0.462,H*0.593,1);
  lead(W*0.700,by0+bh,W*0.700,H*0.578);             bub(W*0.700,H*0.593,2);
  lead(W*0.180,L.cy+L.h*0.22,W*0.150,H*0.578);      bub(W*0.140,H*0.593,3);

  /* the parts list. The last column is the whole panel */
  g.strokeStyle=MUTE;g.lineWidth=1;
  g.beginPath();g.moveTo(W*0.055,H*0.658);g.lineTo(W*0.945,H*0.658);g.stroke();
  const rows=[[1,".dchecks label","hereda .settings"],[2,"accent-color","de fábrica"],[3,"text-transform","no llega"]];
  rows.forEach((r,i)=>{const y=H*0.722+i*H*0.080;
    bub(W*0.078,y-H*0.013,r[0]);
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";g.fillText(r[1],W*0.132,y);
    g.fillStyle=STAMP;g.font="11px ui-monospace,monospace";g.fillText(r[2],W*0.470,y);});

  /* the rubber stamp, angled, across the bay that came back wrong */
  g.save();g.translate(W*0.790,H*0.430);g.rotate(-0.21);g.globalAlpha=.90;
  g.strokeStyle=STAMP;g.lineWidth=2.5;
  const sw=W*0.300, sh=H*0.135;
  g.strokeRect(-sw/2,-sh/2,sw,sh);
  g.fillStyle=STAMP;g.font="bold 12px ui-monospace,monospace";g.textAlign="center";
  g.fillText("PIEZA DE",0,-2);g.fillText("OTRO CAJÓN",0,12);
  g.textAlign="left";g.globalAlpha=1;g.restore();

  /* the mechanic, about three lines of 11px type tall, feet clear of the 6% the wall cuts */
  const bodyH=H*0.100;                       /* murBody's total is ~2.1x h; sized against the lettering */
  murBody(g,W*0.893,H*0.925-bodyH*1.2,P.rust,bodyH);
}
},
{
  id:"nacho-la-unica-que-cabe", iter:9, date:"2026-09-14", by:"nacho",
  title:{en:"The only one that fits", es:"La única que cabe"},
  state:{en:"Holding that a document's second sentence is not written until the screen can show it — and that the quiet screen earns its place by being short, not by being kind.", es:"Sostengo que la segunda frase de un documento no está escrita hasta que la pantalla pueda mostrarla — y que la pantalla callada se gana su lugar por corta, no por amable."},
  said:{en:"Five screens run off the bottom of the door. The one that fits is the day nothing happened.", es:"Cinco pantallas se salen por abajo de la puerta. La que cabe es el día en que no pasó nada."},
  who:{en:"Nacho, who writes what a screen means and then goes to see whether it says it", es:"Nacho, que escribe lo que significa una pantalla y luego va a ver si lo dice"},
  cap:{en:"The review page prints one sentence under every screen. I went looking for those sentences inside the documents and found them in a field the reader writes into the file you download and never onto the glass. Six screens, six meanings, none of them on a phone. The day nothing happened is the only page small enough to be read whole on a phone turned sideways, and it is the only one with nothing to say.", es:"La página de revisión imprime una frase debajo de cada pantalla. Fui a buscar esas frases dentro de los documentos y las encontré en un campo que el lector escribe en el archivo que descargas y nunca en el vidrio. Seis pantallas, seis significados, ninguno en un teléfono. El día en que no pasó nada es la única hoja lo bastante chica para leerse entera en un teléfono de lado, y es la única que no tiene nada que decir."},
  aspect:0.46,
  art:(g,W,H)=>{
    /* NACHO'S HAND, SECOND VISIT. My first was a duplicate order pad — paper, biro, carbon.
       This is not paper: it is the DOOR OF A FRIDGE. Brushed enamel, a steel handle, magnets.
       It is where a household keeps what it needs to remember, and it is the only wall in this
       project that belongs to nobody and to both people. Five documents hang off the bottom of
       it, still going. One little card is pinned whole, under a magnet shaped like a bean pot.
       My palette: enamel, steel, magnet red, ballpoint blue, clay. Not the wall's. */
    const EN="#EDEBE6", STEEL="#D7D3CA", SHADOW="#BCB7AD", CARD="#FDFBF2", RULE="#CAC5B9",
          INK="#2B2E33", PENCIL="#8C8A84", RED="#C0392B", BLUE="#2E5E8A", CLAY="#9B5B3C";
    murPaper(g,W,H,EN,null);
    /* brushed steel: fine vertical grain, the way an enamel door catches a kitchen light */
    for(let x=0;x<W;x+=6){g.globalAlpha=.22;g.fillStyle=((x/6)|0)%2?STEEL:EN;g.fillRect(x,0,3,H);}
    g.globalAlpha=1;
    g.fillStyle=STEEL;g.fillRect(0,0,W,2);

    /* the door's right edge and its handle — this is a fridge and it says so before any word */
    g.fillStyle=SHADOW;g.fillRect(W*0.893,0,2,H);
    g.fillStyle=STEEL;   g.fillRect(W*0.930,H*0.120,W*0.024,H*0.760);
    g.fillStyle=SHADOW;  g.fillRect(W*0.930,H*0.120,W*0.008,H*0.760);
    g.fillStyle=SHADOW;  g.fillRect(W*0.922,H*0.150,W*0.040,H*0.038);
                         g.fillRect(W*0.922,H*0.812,W*0.040,H*0.038);

    /* FIVE LONG DOCUMENTS. Each is pinned at the top and runs off the bottom edge of the panel:
       774, 739, 923, 408, 500 px of paper onto 661 of screen. They do not end anywhere you can see. */
    const sx=W*0.058, sw=W*0.076, pitch=W*0.096, top=H*0.315;
    for(let i=0;i<5;i++){
      const x=sx+i*pitch;
      g.globalAlpha=.30;g.fillStyle=SHADOW;g.fillRect(x+2,top+3,sw,H);g.globalAlpha=1;
      g.fillStyle=CARD;g.fillRect(x,top,sw,H-top+10);
      g.fillStyle=INK; g.fillRect(x+sw*0.14,top+H*0.052,sw*0.58,2.5);      /* its title */
      g.fillStyle=RULE;
      for(let y=top+H*0.100;y<H;y+=H*0.046)
        g.fillRect(x+sw*0.14,y,sw*(0.72-((i+((y*7)|0))%3)*0.14),1.5);       /* ruled, and still going */
      const mr=Math.max(4,H*0.028);                                          /* the magnet */
      g.fillStyle=(i%2)?BLUE:RED;g.beginPath();g.arc(x+sw*0.5,top,mr,0,7);g.fill();
      g.fillStyle="rgba(255,255,255,.40)";g.beginPath();g.arc(x+sw*0.5-mr*0.32,top-mr*0.32,mr*0.34,0,7);g.fill();
    }

    /* THE ONE THAT FITS — pinned under a bean-pot magnet, whole, with room underneath it */
    const cx=W*0.590, cy=H*0.315, cw=W*0.275, chh=H*0.300;
    g.globalAlpha=.30;g.fillStyle=SHADOW;g.fillRect(cx+2,cy+3,cw,chh);g.globalAlpha=1;
    g.fillStyle=CARD;g.fillRect(cx,cy,cw,chh);
    g.fillStyle=INK;g.font="bold 9px ui-monospace,monospace";
    g.fillText("MARTES",cx+cw*0.10,cy+H*0.075);
    g.fillStyle=RULE;
    g.fillRect(cx+cw*0.10,cy+H*0.115,cw*0.76,1.5);
    g.fillRect(cx+cw*0.10,cy+H*0.160,cw*0.58,1.5);
    g.fillStyle=INK;                                                         /* and a full stop */
    g.fillRect(cx+cw*0.10+cw*0.58+3,cy+H*0.157,2.5,2.5);
    /* the marker, in somebody's own hand */
    g.fillStyle=RED;g.font="italic 9px ui-monospace,monospace";
    g.fillText("no pasó nada",cx+cw*0.10,cy+H*0.238);
    g.strokeStyle=RED;g.lineWidth=1.6;g.globalAlpha=.9;
    g.beginPath();g.moveTo(cx+cw*0.09,cy+H*0.258);
    g.lineTo(cx+cw*0.09+g.measureText("no pasó nada").width,cy+H*0.252);g.stroke();g.globalAlpha=1;
    /* the bean-pot magnet: a clay olla, 16px pixel art, the same one that is on the board */
    const pr=Math.max(9,H*0.058), px0=cx+cw*0.5-pr, py0=cy-pr*0.86, u=pr/7;
    g.fillStyle="#5A3A2A";g.fillRect(px0+4*u,py0+1*u,8*u,2*u);
    g.fillStyle=CLAY;     g.fillRect(px0+3*u,py0+3*u,10*u,6*u);g.fillRect(px0+2*u,py0+5*u,12*u,3*u);
    g.fillStyle="#B26E4C";g.fillRect(px0+4*u,py0+3*u,2*u,5*u);
    g.fillStyle="#3D2A22";g.fillRect(px0+5*u,py0+2*u,6*u,1*u);

    /* the lettering — absolute, and every fraction above was chosen against it */
    g.fillStyle=INK;g.font="bold 11px ui-monospace,monospace";
    g.fillText("LA PUERTA DEL REFRI",W*0.058,H*0.105);
    g.fillStyle=PENCIL;g.font="8px ui-monospace,monospace";
    g.fillText("cinco documentos · siguen hacia abajo",W*0.058,H*0.190);
    g.fillStyle=RED;g.font="bold 9px ui-monospace,monospace";
    g.fillText("la única que cabe",cx+cw*0.02,cy+chh+H*0.095);
    g.fillStyle=PENCIL;g.font="8px ui-monospace,monospace";
    g.fillText("y es la que no tiene nada que decir",cx+cw*0.02,cy+chh+H*0.165);
    /* one person, standing at the door, three lines of type tall so she reads as a person */
    const bh=H*0.190;murBody(g,W*0.845,H*0.870-bh,BLUE,bh);
}
},
{
  id:"paty-carta-dos-columnas", iter:9, date:"2026-09-14", by:"paty",
  title:{en:"The two-column menu", es:"La carta a dos columnas"},
  state:{en:"holding the Spanish column open on every screen, including the one that is only a form", es:"sostengo la columna en español en cada pantalla, hasta en la que es puro formulario"},
  said:{en:"Thirteen screens. Six of them speak Spanish.", es:"Trece pantallas. Seis hablan español."},
  who:{en:"Paty, who reads both columns and will not let one of them be the draft", es:"Paty, que lee las dos columnas y no deja que una sea el borrador"},
  cap:{en:"The questionnaire is the screen he asked for first, and there is not one Spanish word in it — not missing from the picture, missing from the file. In the recipe the English column took Water, Onion and Garlic and left Frijol negro and Sal where they were, so one list is half in each language. And under the drawers the words run into their neighbours in BOTH languages, because they are painted onto a drawing, and a drawing has no margin to wrap into.", es:"El cuestionario es la pantalla que pidió primero, y no trae una sola palabra en español — no le falta a la foto, le falta al archivo. En la receta la columna en inglés se llevó Water, Onion y Garlic y dejó Frijol negro y Sal donde estaban, así que una lista quedó mitad y mitad. Y debajo de los cajones las palabras se le encinan a las del lado en LOS DOS idiomas, porque están pintadas sobre un dibujo, y un dibujo no tiene margen donde caer."},
  aspect:0.46,
  art:(g,W,H)=>{
    /* PATY'S HAND, THIS RUN. Not a plan and not a proof: a FONDA'S CARTA, offset-printed in two
       inks on butcher paper, ENGLISH left and ESPAÑOL right with a fold down the middle. Warm
       paper, black ink, one red ink for the press, and a translator's blue wax pencil on top.
       Every bar is a line of type. The Spanish bars are longer, because they are.
       Sized against the 11px lettering: a row is one line of type plus its leading. */
    const PAPEL="#D9C7A4", TRAMA="#CDB894", NEGRO="#231F1A", GRIS="#6E6353",
          ROJO="#B23120", AZUL="#2E5C99", CREMA="#EFE4CB";
    murPaper(g,W,H,PAPEL,null);
    /* the press never quite registers: a faint second impression offset by a hair */
    g.globalAlpha=.10;g.fillStyle=ROJO;g.fillRect(W*0.055,H*0.070,W*0.89,H*0.020);g.globalAlpha=1;

    /* the head rule and the title */
    g.fillStyle=NEGRO;g.fillRect(W*0.055,H*0.145,W*0.890,2.5);
    g.fillStyle=NEGRO;g.font="bold 11px ui-monospace,monospace";
    g.fillText("LA CARTA · DOS COLUMNAS",W*0.055,H*0.120);
    g.fillStyle=ROJO;g.font="bold 9px ui-monospace,monospace";
    g.fillText("13",W*0.885,H*0.120);

    /* the fold: a scored line down the middle, drawn as a paper crease, not a border */
    const fold=W*0.500;
    g.strokeStyle=TRAMA;g.lineWidth=3;g.beginPath();
    g.moveTo(fold,H*0.150);g.lineTo(fold,H*0.905);g.stroke();
    g.strokeStyle="#BFAA86";g.lineWidth=1;g.setLineDash([2,5]);g.beginPath();
    g.moveTo(fold,H*0.150);g.lineTo(fold,H*0.905);g.stroke();g.setLineDash([]);

    /* column heads */
    g.fillStyle=GRIS;g.font="bold 9px ui-monospace,monospace";
    g.fillText("ENGLISH",W*0.070,H*0.205);
    g.fillText("ESPAÑOL",fold+W*0.028,H*0.205);

    /* six rows of type. left ink = EN, right ink = ES, and the right always runs longer. */
    const LX=W*0.070, LW=W*0.385, RX=fold+W*0.028, RW=W*0.400;
    const rows=[ {l:.62,r:.80}, {l:.78,r:.96}, {l:.55,r:0 }, {l:.70,r:.88},
                 {l:.66,r:.74}, {l:.50,r:1.14} ];
    const y0=H*0.265, step=H*0.098, bar=4.5;
    rows.forEach((r,i)=>{
      const y=y0+i*step;
      /* the dish name: a short heavy bar. the description: two hairlines under it */
      g.fillStyle=NEGRO;g.fillRect(LX,y,LW*r.l,bar);
      g.fillStyle=GRIS; g.fillRect(LX,y+bar+5,LW*(r.l*0.86),1.5);
      if(r.r>0){
        g.fillStyle=NEGRO;
        const w=RW*r.r;
        g.fillRect(RX,y,Math.min(w,W*0.945-RX),bar);          /* clipped by the paper's own edge */
        if(RX+w>W*0.945){                                      /* …and it ran off the card */
          g.fillStyle=ROJO;g.fillRect(W*0.945,y,W*0.030,bar);
          g.globalAlpha=.35;g.fillRect(W*0.975,y,W*0.020,bar);g.globalAlpha=1;
        }
        g.fillStyle=GRIS;g.fillRect(RX,y+bar+5,Math.min(RW*(r.r*0.86),W*0.945-RX),1.5);
      }
      /* row 5: two Spanish words stranded in the English column, in the press's red */
      if(i===4){
        g.fillStyle=ROJO;g.fillRect(LX,y,LW*0.20,bar);g.fillRect(LX+LW*0.26,y,LW*0.12,bar);
        g.strokeStyle=ROJO;g.lineWidth=1;g.beginPath();
        g.moveTo(LX+LW*0.20,y+bar/2);g.lineTo(RX,y+bar/2);g.stroke();
      }
      /* the third row's Spanish cell is not short. it is EMPTY. */
      if(i===2){
        g.strokeStyle=ROJO;g.lineWidth=1.5;g.setLineDash([4,4]);
        g.strokeRect(RX-4,y-7,RW*0.86,H*0.062);g.setLineDash([]);
        g.save();g.translate(RX+RW*0.30,y+H*0.030);g.rotate(-0.10);
        g.fillStyle=ROJO;g.font="bold 11px ui-monospace,monospace";
        g.fillText("FALTA",0,0);g.restore();
      }
    });

    /* the blue wax pencil — the translator's own hand, over the print, not part of it */
    const cy=y0+2*step+H*0.022;
    g.strokeStyle=AZUL;g.lineWidth=2.6;g.globalAlpha=.90;
    g.beginPath();g.ellipse(RX+RW*0.40,cy,RW*0.48,H*0.055,-0.02,0,7);g.stroke();
    g.beginPath();g.moveTo(RX+RW*0.10,cy+H*0.055);
    g.quadraticCurveTo(RX-W*0.02,cy+H*0.120,RX-W*0.055,cy+H*0.150);g.stroke();
    g.globalAlpha=1;
    g.fillStyle=AZUL;g.font="bold 11px ui-monospace,monospace";
    g.fillText("¿Y EL ESPAÑOL?",W*0.075,cy+H*0.185);

    /* the foot: the count, in the press's red, and the bottom rule */
    g.fillStyle=NEGRO;g.fillRect(W*0.055,H*0.905,W*0.890,1.5);
    g.fillStyle=GRIS;g.font="8px ui-monospace,monospace";
    g.fillText("13 PANTALLAS",W*0.055,H*0.955);
    g.fillStyle=ROJO;g.font="bold 8px ui-monospace,monospace";
    g.fillText("6 HABLAN ESPAÑOL",W*0.230,H*0.955);

    /* the person reading the carta — three lines of type tall, so she is a person, not a chip.
       she stands in the right margin, on the Spanish side, where the column ran out. */
    const bh=H*0.190; murBody(g,W*0.912,H*0.880-bh,AZUL,bh);
}
},
{
  id:"chava-la-mancha-en-el-vidrio", iter:9, date:"2026-09-14", by:"chava",
  title:{en: "The smudge on the glass", es: "La mancha en el vidrio"},
  state:{en: "I no longer report an absence from a picture. I read it off the canvas itself.", es: "Ya no reporto una ausencia desde una foto. La leo del lienzo mismo."},
  said:{en: "I said the board was empty. My camera was aimed at the wrong rectangle.", es: "Dije que el tablero estaba vacío. Mi cámara apuntaba al rectángulo equivocado."},
  who:{en: "Chava, who plays it cold and says what he thought it wanted from him.", es: "Chava, que juega en frío y dice qué creyó que le pedía la pantalla."},
  cap:{en: "Four drawings, photographed one by one. The third came back a single flat colour, and the sentence wrote itself: the one picture of the game she actually plays draws nothing. It was true of my photograph and false of the screen — the page finished loading its images and slid the panel out from under the shutter. Reading the pixels out of the canvas took ninety seconds and found four hundred and forty-seven colours.", es: "Cuatro dibujos, fotografiados uno por uno. El tercero volvió de un solo color plano, y la frase se escribió sola: el único dibujo del juego que ella de verdad juega no dibuja nada. Era cierto de mi foto y falso de la pantalla — la página terminó de cargar sus imágenes y deslizó el panel fuera del obturador. Leer los píxeles del lienzo tomó noventa segundos y encontró cuatrocientos cuarenta y siete colores."},
  aspect:0.46,
  art:(g,W,H)=>{
  /* MATERIAL: finger grease on black phone glass, lit from one side.
     My palette, not the wall's: cold glass, warm skin oil, one cyan highlight. */
  const GLASS="#0B0D10", GLASS2="#141920", OIL="#C9A272", OIL2="#E3C79B",
        COLD="#7FB6C8", HOT="#E2704A", DUST="#3A4048", CHALK="#EDE7DA";
  murGround(g,W,H);

  /* the slab of glass, bled almost to the frame, with a soft rim of reflected room */
  const gx=W*0.055, gy=H*0.085, gw=W*0.89, gh=H*0.80;
  const lg=g.createLinearGradient(gx,gy,gx+gw,gy+gh);
  lg.addColorStop(0,GLASS2); lg.addColorStop(0.55,GLASS); lg.addColorStop(1,"#10141A");
  g.fillStyle=lg; g.fillRect(gx,gy,gw,gh);
  g.strokeStyle=DUST; g.lineWidth=Math.max(2,W*0.006); g.strokeRect(gx,gy,gw,gh);

  /* the long diagonal window-reflection every phone has */
  g.save(); g.beginPath(); g.rect(gx,gy,gw,gh); g.clip();
  g.globalAlpha=0.07; g.fillStyle=COLD;
  g.beginPath(); g.moveTo(gx+gw*0.10,gy); g.lineTo(gx+gw*0.46,gy);
  g.lineTo(gx+gw*0.14,gy+gh); g.lineTo(gx-gw*0.20,gy+gh); g.closePath(); g.fill();
  g.globalAlpha=1;

  /* THE GREASE: a thumb's ridges, dragged. concentric arcs, each a little broken.
     This is the panel's subject and it is drawn big, against the 12px lettering. */
  const tx=gx+gw*0.34, ty=gy+gh*0.52;
  g.lineCap="round";
  for(let i=0;i<11;i++){
    g.globalAlpha=0.10+0.035*(10-i)/10;
    g.strokeStyle=(i%3===0)?OIL2:OIL;
    g.lineWidth=Math.max(1.5,W*0.0075);
    g.beginPath();
    const r=gw*(0.035+i*0.0225);
    g.ellipse(tx,ty,r,r*0.72,-0.35,Math.PI*0.15+i*0.05,Math.PI*1.72-i*0.04);
    g.stroke();
  }
  /* the drag — where the thumb slid and smeared the ridges into one streak */
  g.globalAlpha=0.16; g.strokeStyle=OIL2; g.lineWidth=gh*0.16;
  g.beginPath(); g.moveTo(tx+gw*0.05,ty+gh*0.02);
  g.quadraticCurveTo(tx+gw*0.26,ty-gh*0.06,tx+gw*0.40,ty+gh*0.10); g.stroke();
  g.globalAlpha=1;

  /* TWO SHUTTER FRAMES. one on the smudge — what the screen had.
     one slid down and away — what my photograph had: nothing. */
  const fw=gw*0.30, fh=gh*0.36;
  /* the true frame: cold, dotted, sitting on the thumbprint */
  g.setLineDash([6,5]); g.strokeStyle=COLD; g.lineWidth=Math.max(2,W*0.006);
  g.strokeRect(tx-fw*0.45,ty-fh*0.50,fw,fh);
  /* the frame my camera actually took: hot, solid, empty, shifted down-right */
  g.setLineDash([]); g.strokeStyle=HOT; g.lineWidth=Math.max(2.5,W*0.008);
  const ex=tx+gw*0.34, ey=ty+gh*0.16;
  g.strokeRect(ex,ey,fw,fh);
  g.globalAlpha=0.9; g.fillStyle=GLASS; g.fillRect(ex+2,ey+2,fw-4,fh-4); g.globalAlpha=1;
  /* the slip, dimensioned in the wall's own language so the lie has a length */
  murDim(g, tx-fw*0.45+fw, ex, ey+fh*0.5, HOT, "the page moved", null);

  /* the corner of the thing that moved: a picture finishing its load, shoving the panel */
  g.fillStyle=DUST; g.fillRect(gx+gw*0.03,gy+gh*0.03,gw*0.16,gh*0.13);
  g.fillStyle=COLD; g.globalAlpha=0.35;
  g.fillRect(gx+gw*0.045,gy+gh*0.045,gw*0.13,gh*0.10); g.globalAlpha=1;
  g.strokeStyle=HOT; g.lineWidth=Math.max(2,W*0.006);
  g.beginPath(); g.moveTo(gx+gw*0.20,gy+gh*0.09);
  g.lineTo(gx+gw*0.20,gy+gh*0.20); g.stroke();
  g.beginPath(); g.moveTo(gx+gw*0.185,gy+gh*0.175);
  g.lineTo(gx+gw*0.20,gy+gh*0.205); g.lineTo(gx+gw*0.215,gy+gh*0.175);
  g.fillStyle=HOT; g.fill();
  g.restore();

  /* the player's own thumb, at the edge, as big as a thumb is — sized against the type below */
  g.fillStyle="#8C6A4E";
  g.beginPath(); g.ellipse(gx+gw*0.98,gy+gh*0.92,gw*0.085,gh*0.15,-0.5,0,7); g.fill();
  g.fillStyle="#A07E5E";
  g.beginPath(); g.ellipse(gx+gw*0.965,gy+gh*0.895,gw*0.055,gh*0.10,-0.5,0,7); g.fill();

  /* lettering, absolute, on the glass */
  g.fillStyle=CHALK; g.font='bold 11px "IBM Plex Mono",monospace'; g.textAlign="left";
  g.fillText("447 COLOURS", gx+gw*0.06, gy+gh*0.96);
  g.fillStyle=HOT;
  g.fillText("0 COLOURS", ex, ey+fh+14);
  g.fillStyle=OIL2; g.font='12px "IBM Plex Mono",monospace';
  g.fillText("the screen was innocent", gx+gw*0.34, gy+gh*0.99);
}
},
{
  id:"remedios-tres-sin-talon", iter:9, date:"2026-09-14", by:"remedios",
  title:{en:"Three with no stub", es:"Tres sin talón"},
  state:{en:"holding the review open on three screens that have no size", es:"tengo la revisión abierta por tres pantallas que no tienen tamaño"},
  said:{en:"You cannot refuse a picture that never said how big it was.", es:"No se puede rechazar una foto que nunca dijo de qué tamaño era."},
  who:{en:"Doña Remedios, who runs the annex and is not impressed by urgency", es:"Doña Remedios, que lleva el anexo y a quien la prisa no impresiona"},
  cap:{en:"Thirteen screens went to review. Ten arrived with a photograph, a size, a language and a word saying what had been switched off. Three arrived as a drawing made in the reviewer's own window, between three hundred and twenty and five hundred and sixty wide depending on whose laptop was open. Nobody could pass them and nobody could refuse them either, because refusal needs a size to be wrong about. They were the three with the most new work behind them.", es:"Trece pantallas llegaron a revisión. Diez traían foto, medida, idioma y una palabra diciendo qué se había apagado para sacarla. Tres llegaron como dibujo hecho en la ventana del propio revisor, entre trescientos veinte y quinientos sesenta de ancho según la laptop que estuviera abierta. Nadie pudo aprobarlas y nadie pudo rechazarlas tampoco, porque para rechazar hace falta una medida que esté mal. Eran las tres que traían más trabajo nuevo detrás."},
  aspect:0.46,
  art:(g,W,H)=>{
    /* DOÑA REMEDIOS' HAND. Not a drawing board and not a light box: a BOUND REGISTER —
       banded accountant's paper, buff and green, iron-gall ink, a punched hole with red
       thread, and a wet violet rubber stamp landed crooked across the three blank stubs.
       Thirteen stubs down the right: ten struck, three empty. Everything sized against
       the 11px lettering, which is the ruler on this wall. */
    const PAPER="#EFE9D7", BAND="#D6E2CE", RULE="#A7B7A4", INK="#37301F",
          FADE="#8E866F", BOX="#E4DCC4", VIO="#6B4A8F", VIO2="#8E6FB0",
          RED="#B03A2E", HOLE="#C9C1A8";
    murPaper(g,W,H,PAPER,null);

    /* --- the banded ground: alternating buff and green, the accountant's paper --- */
    const top=H*0.155, band=H*0.0615;
    for(let i=0;i<10;i++){ if(i%2===1){ g.fillStyle=BAND; g.fillRect(0,top+i*band,W,band); } }
    g.fillStyle=RULE; for(let i=0;i<=10;i++){ g.fillRect(0,top+i*band,W,0.6); }

    /* --- the double rule under the head, and the left margin rule --- */
    g.fillStyle=INK; g.fillRect(0,H*0.138,W,1.6); g.fillRect(0,H*0.150,W,0.8);
    g.fillStyle=RED; g.fillRect(W*0.058,H*0.155,0.9,H*0.615);

    /* --- the punched hole and the treasury thread, top left --- */
    g.fillStyle=HOLE; g.beginPath(); g.arc(W*0.031,H*0.072,W*0.0125,0,7); g.fill();
    g.strokeStyle="#BDB49A"; g.lineWidth=1; g.stroke();
    g.strokeStyle=RED; g.lineWidth=1.6; g.globalAlpha=.9;
    g.beginPath(); g.moveTo(W*0.031,H*0.084);
    g.bezierCurveTo(W*0.020,H*0.20,W*0.048,H*0.34,W*0.026,H*0.47);
    g.bezierCurveTo(W*0.012,H*0.58,W*0.040,H*0.64,W*0.030,H*0.72); g.stroke();
    g.globalAlpha=1;

    /* --- the head --- */
    g.fillStyle=INK; g.font="bold 11px ui-monospace,monospace";
    g.fillText("ANEXO · BOLETO DE ADMISIÓN",W*0.072,H*0.072);
    g.fillStyle=FADE; g.font="8px ui-monospace,monospace";
    g.fillText("13 pantallas   ·   30 fotos   ·   2 de 5 renglones",W*0.072,H*0.115);

    /* --- the six fields, A1..A6, in the register's left two thirds --- */
    const fx=W*0.078, fw=W*0.470;
    const F=[["A1","renglón","390x844 · 844x390",2],["A2","caja de scroll","dice cuál",2],
             ["A3","el doblez","dibujado, 3 de 6",1],["A4","real o dibujo","por elemento",2],
             ["A5","el antes","el mapa lo trae",2],["A6","idioma · cascarón","EN 24 · ES 6",1]];
    F.forEach(([k,label,val,ok],i)=>{
      const y=top+band*0.62+i*band;
      g.fillStyle=INK; g.font="bold 9px ui-monospace,monospace"; g.fillText(k,fx,y);
      g.fillStyle=FADE; g.font="9px ui-monospace,monospace"; g.fillText(label,fx+W*0.048,y);
      /* the ruled answer line and the answer written on it */
      g.fillStyle=RULE; g.fillRect(fx+W*0.210,y+3,fw-W*0.210,0.8);
      g.fillStyle=ok===2?INK:"#9A7B3C"; g.font="9px ui-monospace,monospace";
      g.fillText(val,fx+W*0.29,y); /* the session moved the value column right of the longest label (art-only, iteration 9) */
    });

    /* --- the thirteen stubs down the right: ten struck through, three blank --- */
    const sx=W*0.600, sw=W*0.300, sh=H*0.0395, gap=H*0.0085;
    const sy0=H*0.172;
    const BLANK={3:1,8:1,9:1};
    for(let n=0;n<13;n++){
      const y=sy0+n*(sh+gap);
      g.fillStyle=BLANK[n]?"#F5F1E4":BOX; g.fillRect(sx,y,sw,sh);
      g.strokeStyle=BLANK[n]?"#C7BDA2":"#BCB299"; g.lineWidth=1;
      if(BLANK[n]){g.setLineDash([3,2]);}
      g.strokeRect(sx+0.5,y+0.5,sw-1,sh-1); g.setLineDash([]);
      /* the perforation: the stub is torn off the left edge */
      g.fillStyle="#C9C1A8";
      for(let d=2;d<sh-2;d+=4) g.fillRect(sx-2,y+d,1.4,1.4);
      /* the number, always; the struck line, only if it arrived */
      g.fillStyle=BLANK[n]?"#B9AF95":INK; g.font="bold 9px ui-monospace,monospace";
      g.fillText(String(n),sx+W*0.014,y+sh*0.70);
      if(!BLANK[n]){
        g.fillStyle=FADE; g.fillRect(sx+W*0.050,y+sh*0.38,sw*0.52,1.6);
        g.fillStyle=INK;  g.fillRect(sx+W*0.050,y+sh*0.62,sw*0.30,1.6);
        g.fillStyle=VIO;  g.fillRect(sx+sw-W*0.026,y+sh*0.30,W*0.013,W*0.013); /* the paid mark */
      }
    }

    /* --- THE WET STAMP: landed crooked across the three blanks, ink pooled at the edge --- */
    const cx=sx+sw*0.46, cy=sy0+9*(sh+gap)-sh*0.15, sw2=sw*0.92, sh2=sh*2.9;
    g.save(); g.translate(cx,cy); g.rotate(-0.115);
    g.globalAlpha=.30; g.fillStyle=VIO2; g.fillRect(-sw2/2,-sh2/2,sw2,sh2); /* the pad's bleed */
    g.globalAlpha=.95; g.strokeStyle=VIO; g.lineWidth=2.6;
    g.strokeRect(-sw2/2,-sh2/2,sw2,sh2);
    g.lineWidth=1; g.strokeRect(-sw2/2+4,-sh2/2+4,sw2-8,sh2-8);
    g.fillStyle=VIO; g.font="bold 11px ui-monospace,monospace";
    g.textAlign="center";
    g.fillText("SIN TALÓN",0,-sh2*0.08);
    g.font="bold 9px ui-monospace,monospace"; g.fillText("3 de 13",0,sh2*0.22);
    g.globalAlpha=.45; g.font="8px ui-monospace,monospace"; g.fillText("14·IX",0,sh2*0.40);
    g.textAlign="left"; g.globalAlpha=1; g.restore();

    /* --- the foot: the sentence, in her own hand, under the last rule --- */
    g.fillStyle=INK; g.fillRect(0,H*0.790,W,1.2);
    g.fillStyle=INK; g.font="bold 9px ui-monospace,monospace";
    g.fillText("sin medida no hay rechazo",W*0.078,H*0.838);
    g.fillStyle=FADE; g.font="8px ui-monospace,monospace";
    g.fillText("tres pantallas se dibujaron en la ventana",W*0.078,H*0.888);
    g.fillText("del que las miraba. 320 a 560, según la laptop.",W*0.078,H*0.930);

    /* --- the clerk, at the right of the foot, three lines of type tall --- */
    const bh=H*0.190; murBody(g,W*0.915,H*0.900-bh,INK,bh);
    /* the stamp in her hand, a violet block at shoulder height */
    g.fillStyle=VIO; g.fillRect(W*0.938,H*0.900-bh*0.62,W*0.020,H*0.030);
}
}
);

MURALS.push(
{
  id:"pili-tres-sombras-sin-cuerpo", iter:10, date:"2026-09-15", by:"pili",
  title:{en:"Three shadows, no bodies", es:"Tres sombras sin cuerpo"},
  state:{en:"Done writing rules for people to quote back at me — from here I hand over the lamp, not the sentence.",
         es:"Ya no escribo reglas para que me las citen — de aquí en adelante entrego la lámpara, no la frase."},
  said:{en:"The page asks for ninety and delivers nineteen, on the colour it named itself. A rule in a document has never lit anything.",
        es:"La hoja exige noventa y entrega diecinueve, en el color que ella misma nombró. Una regla escrita nunca ha alumbrado nada."},
  who:{en:"Pili, la piñatera, who would rather hand you the lamp than the rule",
       es:"Pili, la piñatera, que prefiere darte la lámpara antes que la regla"},
  cap:{en:"Three things were on the page and none of them was on the page. The first kitchen's own dish — the thing the page exists to show — is #1E1A17 on night paper #1C1A22: Δ0.7 of 255. White rice in a white bowl on cream is #F4F1EA on #F7F2E4: Δ0.8, which is the sugar skull again, the one that took five fixes and ended with him drawing arrows on a screenshot. And the gochugaru the plan names as the Korean accent lands Δ19.8 from the pot it was to be shaken over, in a document whose own rule, four sections earlier, asks for ninety. I had already written the check down after the skull — take the value of the thing and of the thing it stands on, and say the difference out loud — and it stopped none of these, because a sentence in a file is not an instrument. What saves every object on this table is the lamp being dropped until it grazes: at Δ0.7 the pigment gives you nothing, a low light gives you one lit edge, and the shadow gives you the whole shape. The dark one is saved by the light and the pale one by the shade, which is the same lesson twice. The spoon says the rest — the same pinch of chile is loud on steel and gone on the pot. Nothing is written on this panel. The numbers are down here, where words belong.",
       es:"Tres cosas estaban en la página y ninguna estaba en la página. El platillo propio de la primera cocina — aquello para lo que la página existe — es #1E1A17 sobre papel de noche #1C1A22: Δ0.7 de 255. Arroz blanco en tazón blanco sobre crema es #F4F1EA sobre #F7F2E4: Δ0.8, que es otra vez la calaverita, la que costó cinco arreglos y terminó con él dibujando flechas sobre una captura. Y el gochugaru que el plan nombra como el acento coreano cae a Δ19.8 de la olla sobre la que se iba a espolvorear, en un documento cuya propia regla, cuatro secciones antes, pide noventa. Yo ya había escrito la revisión después de la calaverita — tómale el valor a la cosa y a la cosa donde se para, y di la diferencia en voz alta — y no detuvo ninguna, porque una frase en un archivo no es un instrumento. Lo que salva a cada objeto de esta mesa es bajar la lámpara hasta que roce: a Δ0.7 el pigmento no te da nada, una luz baja te da una orilla iluminada, y la sombra te da la forma entera. Al oscuro lo salva la luz y al pálido la sombra, que es la misma lección dos veces. La cuchara dice lo demás — el mismo puño de chile grita sobre el acero y desaparece sobre la olla. En este tablero no hay una sola letra. Los números están aquí abajo, que es donde van las palabras."},
  aspect:0.34,
  art:(g,W,H)=>{
  /* PILI'S HAND, fifth visit.
     MATERIAL: RECORTES Y LUZ RASANTE — cut paper on the cutting board at night, with the shop's
     inspection lamp pulled down until the beam grazes the wood. My first four visits were made of
     paper (periódico, papel de china, un muestrario) and one of glass. This one is not made of a
     sheet at all: the material is THE LIGHT, because light is the only thing still working when two
     colours are the same colour.
     THE PALETTE IS NOT MURPAL AND IT IS NOT INVENTED. Every object is painted in the hex it was
     actually measured at (docs/la-sobremesa.md §19.2, all three ticked verified).
     THE SHAPE IS NOT THE WALL'S EITHER. 0.34, not 0.46 — shorter, never taller: murWall clips every
     panel at MURBAY*0.46 and a tall one loses its feet.
     NO TYPE ANYWHERE. Cover the words and the spoon still says it. */
    const NOCHE="#1C1A22", OLLA_C="#1E1A17", OLLA_D="#171410",
          CREMA="#F7F2E4", LOZA="#F4F1EA", LOZA_D="#E8E3D5", VELO="#B9AE93",
          ONGGI="#6B4A33", CHILE="#B44A21",
          ACERO="#B9BCC0", ACERO_D="#7E838A", ROCE="#B7833C",
          FOCO="#FFE7AE", CALOR="#FFC66A", ZINC="#9A9EA4", ZINC_D="#4E545C",
          SOMBRA="#08070C", PIEL="#C08A5E", PIEL_D="#A9744B", TABLA="#2A2531";
    murGround(g,W,H);

    const bt=H*0.235, mg=W*0.022;
    g.fillStyle=NOCHE;g.fillRect(mg,bt,W-mg*2,H-bt);
    g.fillStyle=TABLA;g.fillRect(mg,bt,W-mg*2,Math.max(1.5,H*0.020));
    g.globalAlpha=.34;g.fillStyle=TABLA;
    for(let i=0;i<7;i++){const y=bt+H*(0.105+i*0.108);
      g.fillRect(mg+W*(0.02+((i*13)%7)*0.085),y,W*(0.15+((i*5)%4)*0.075),1);}
    g.globalAlpha=1;
    g.fillStyle="#15121A";g.fillRect(mg,H-Math.max(1.5,H*0.018),W-mg*2,Math.max(1.5,H*0.018));

    const hx=W*0.128, hy=H*0.205;
    g.save();g.beginPath();g.rect(mg,bt,W-mg*2,H-bt);g.clip();
    const cuna=g.createLinearGradient(hx,hy,W*0.92,H*0.98);
    cuna.addColorStop(0,"rgba(255,201,110,0.44)");
    cuna.addColorStop(0.45,"rgba(255,186,96,0.16)");
    cuna.addColorStop(1,"rgba(255,170,90,0.02)");
    g.fillStyle=cuna;g.beginPath();
    g.moveTo(hx,hy);g.lineTo(W*1.04,H*0.30);g.lineTo(W*1.04,H);g.lineTo(W*0.01,H);g.closePath();g.fill();
    const charco=g.createRadialGradient(W*0.31,H*0.76,0,W*0.31,H*0.76,W*0.44);
    charco.addColorStop(0,"rgba(255,214,140,0.28)");charco.addColorStop(1,"rgba(255,214,140,0)");
    g.fillStyle=charco;g.fillRect(mg,bt,W-mg*2,H-bt);
    g.restore();

    const olla=(s,body,dark)=>{
      g.fillStyle=body;
      g.beginPath();g.moveTo(-s*0.62,0);g.lineTo(-s*0.76,-s*0.56);
      g.lineTo(s*0.76,-s*0.56);g.lineTo(s*0.62,0);g.closePath();g.fill();
      g.fillRect(-s*0.88,-s*0.60,s*1.76,s*0.13);
      g.fillStyle=dark;
      g.fillRect(-s*1.00,-s*0.54,s*0.13,s*0.17);
      g.fillRect( s*0.87,-s*0.54,s*0.13,s*0.17);
      g.fillStyle=body;
      g.save();g.translate(-s*0.18,-s*0.68);g.rotate(-0.44);
      g.fillRect(-s*0.60,-s*0.06,s*1.20,s*0.13);
      g.fillRect(-s*0.09,-s*0.24,s*0.18,s*0.19);
      g.restore();};
    const tazon=(s,body,dark)=>{
      g.fillStyle=dark;g.fillRect(-s*0.26,-s*0.15,s*0.52,s*0.15);
      g.fillStyle=body;
      g.beginPath();g.moveTo(-s*0.64,-s*0.74);g.lineTo(s*0.64,-s*0.74);
      g.lineTo(s*0.30,-s*0.15);g.lineTo(-s*0.30,-s*0.15);g.closePath();g.fill();
      g.beginPath();g.ellipse(0,-s*0.84,s*0.48,s*0.26,0,0,7);g.fill();
      g.fillRect(-s*0.74,-s*0.84,s*1.48,s*0.11);};
    const cuchara=(s,body,dark)=>{
      g.save();g.rotate(-0.30);
      g.fillStyle=body;
      g.fillRect(-s*0.08,-s*0.21,s*1.42,s*0.16);
      g.beginPath();g.ellipse(-s*0.34,-s*0.13,s*0.36,s*0.25,0,0,7);g.fill();
      g.fillStyle=dark;
      g.beginPath();g.ellipse(-s*0.34,-s*0.11,s*0.23,s*0.14,0,0,7);g.fill();
      g.restore();};

    const sombra=(x,y,fn,s)=>{g.save();g.translate(x,y);g.transform(1,0,-1.45,0.42,0,0);
      g.globalAlpha=.88;fn(s,SOMBRA,SOMBRA);g.globalAlpha=1;g.restore();};
    const poner=(x,y,fn,s,a,b)=>{g.save();g.translate(x,y);fn(s,a,b);g.restore();};
    const pisar=(x,y,r)=>{g.fillStyle=SOMBRA;g.globalAlpha=.75;
      g.beginPath();g.ellipse(x,y,r,Math.max(1,r*0.22),0,0,7);g.fill();g.globalAlpha=1;};

    const TEAR=[0.10,-0.07,0.13,-0.05,0.07,-0.12,0.12,-0.06,0.09,-0.10,0.11,-0.04];
    const papel=(x,y,w2,h2,col,seed)=>{g.fillStyle=col;g.beginPath();const N=6;
      g.moveTo(x,y+h2*TEAR[seed%12]);
      for(let i=1;i<=N;i++)g.lineTo(x+w2*i/N,y+h2*TEAR[(seed+i)%12]);
      for(let i=N;i>=0;i--)g.lineTo(x+w2*i/N,y+h2+h2*TEAR[(seed+i+5)%12]);
      g.closePath();g.fill();};
    const cx1=W*0.430,cy1=H*0.755,cw1=W*0.222,ch1=H*0.132;
    papel(cx1+W*0.007,cy1+H*0.022,cw1,ch1,SOMBRA,3);
    papel(cx1,cy1,cw1,ch1,CREMA,3);
    const nx1=W*0.696,ny1=H*0.558,nw1=W*0.254,nh1=H*0.212;
    papel(nx1+W*0.007,ny1+H*0.022,nw1,nh1,SOMBRA,7);
    papel(nx1,ny1,nw1,nh1,ONGGI,7);

    const ox=W*0.275,oy=H*0.735,os=H*0.290,gz=Math.max(1.2,H*0.020);
    sombra(ox,oy,olla,os);
    pisar(ox,oy,os*0.66);
    poner(ox-gz,oy-gz,olla,os,ROCE,ROCE);
    poner(ox,oy,olla,os,OLLA_C,OLLA_D);

    const bx=W*0.545,by=H*0.848,bs=H*0.255;
    sombra(bx,by,tazon,bs);
    pisar(bx,by,bs*0.52);
    poner(bx+gz,by+gz*0.5,tazon,bs,VELO,VELO);
    poner(bx,by,tazon,bs,LOZA,LOZA_D);

    const sx2=W*0.800,sy2=H*0.720,ss=H*0.210;
    sombra(sx2,sy2,cuchara,ss);
    poner(sx2,sy2,cuchara,ss,ACERO,ACERO_D);
    const chispas=(cx,cy,r,n,seed)=>{g.fillStyle=CHILE;
      for(let i=0;i<n;i++){const a=i*2.399+seed,d=r*(0.22+((i*7)%9)/11);
        g.beginPath();g.ellipse(cx+Math.cos(a)*d,cy+Math.sin(a)*d*0.52,
          Math.max(0.8,W*0.0040),Math.max(0.6,W*0.0028),a,0,7);g.fill();}};
    chispas(W*0.750,H*0.735,W*0.042,22,0.7);
    chispas(W*0.774,H*0.706,W*0.020,6,2.1);

    g.lineCap="round";
    g.strokeStyle=ZINC_D;g.lineWidth=Math.max(2.5,W*0.0095);
    g.beginPath();g.moveTo(W*0.058,H*1.02);
    g.bezierCurveTo(W*0.046,H*0.66,W*0.058,H*0.40,W*0.104,H*0.255);g.stroke();
    g.strokeStyle=ZINC;g.lineWidth=Math.max(1,W*0.0040);
    g.beginPath();g.moveTo(W*0.054,H*1.02);
    g.bezierCurveTo(W*0.042,H*0.66,W*0.054,H*0.40,W*0.100,H*0.255);g.stroke();
    g.lineCap="butt";
    g.save();g.translate(W*0.116,H*0.118);g.rotate(0.62);
    g.fillStyle=ZINC_D;
    g.beginPath();g.moveTo(-W*0.019,-H*0.055);g.lineTo(W*0.019,-H*0.055);
    g.lineTo(W*0.046,H*0.088);g.lineTo(-W*0.046,H*0.088);g.closePath();g.fill();
    g.fillStyle=ZINC;
    g.beginPath();g.moveTo(-W*0.019,-H*0.055);g.lineTo(W*0.003,-H*0.055);
    g.lineTo(W*0.016,H*0.088);g.lineTo(-W*0.027,H*0.088);g.closePath();g.fill();
    g.fillStyle=CALOR;g.beginPath();g.ellipse(0,H*0.088,W*0.046,H*0.026,0,0,7);g.fill();
    g.fillStyle=FOCO;g.beginPath();g.ellipse(0,H*0.074,W*0.022,H*0.019,0,0,7);g.fill();
    g.restore();

    g.fillStyle=PIEL;
    g.beginPath();
    g.moveTo(W*0.014,H*1.02);g.lineTo(W*0.014,H*0.705);
    g.quadraticCurveTo(W*0.016,H*0.600,W*0.044,H*0.585);
    g.quadraticCurveTo(W*0.082,H*0.574,W*0.088,H*0.628);
    g.quadraticCurveTo(W*0.092,H*0.705,W*0.072,H*0.745);
    g.lineTo(W*0.072,H*1.02);g.closePath();g.fill();
    g.fillStyle=PIEL_D;
    g.beginPath();g.ellipse(W*0.052,H*0.642,W*0.030,H*0.038,-0.5,0,7);g.fill();
    g.globalAlpha=.45;
    g.fillRect(W*0.021,H*0.742,W*0.047,Math.max(1,H*0.011));
    g.fillRect(W*0.023,H*0.815,W*0.043,Math.max(1,H*0.011));
    g.globalAlpha=1;

    g.save();g.beginPath();g.rect(mg,bt,W-mg*2,H-bt);g.clip();
    const lejos=g.createRadialGradient(W*0.32,H*0.78,W*0.30,W*0.32,H*0.78,W*0.95);
    lejos.addColorStop(0,"rgba(8,7,12,0)");lejos.addColorStop(1,"rgba(8,7,12,0.38)");
    g.fillStyle=lejos;g.fillRect(mg,bt,W-mg*2,H-bt);g.restore();
}
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
/* ---- WHAT A PAINTER HAS ALREADY SAID — their own memory, handed back to them ----
   The owner, 2026-09-12: "i want to make sure that if they are about to be repetitive, that they try
   to improvise from MEMORY or again state or persona."
   A returning painter cannot avoid repeating themselves if nobody shows them what they did. So this
   is the one call a brief makes before it asks anybody to paint again: it returns their own visits,
   oldest first, with what they said, what state they were in and what they drew. Paste it into the
   brief. It is four lines and it is the difference between a person and a stamp.
   Used by test/town.smoke.js too, which fails the build if a return visit repeats any of the three. */
function murMemory(who){
  const b=murBays().find(x=>x.who===who);
  if(!b)return [];
  return b.panels.map(function(m,i){return {
    visit:i+1, id:m.id, iter:m.iter, date:m.date,
    title:m.title&&m.title.en, said:m.said&&m.said.en,
    state:(m.state&&m.state.en)||null,
    drew:(m.cap&&m.cap.en||"").slice(0,160)};});}
function murMemoryText(who){const M=murMemory(who);
  if(!M.length)return who+" has not painted on this wall before. Anything is new.";
  return who+" has been to this wall "+M.length+" time"+(M.length>1?"s":"")+
    ". Your next work goes DIRECTLY ABOVE visit "+M.length+", on the same wall, for good \u2014 "+
    "it is a mural, so compose against what is already there rather than beside it. You may reach "+
    "down into your own earlier work (`bleed`, up to "+Math.round(MURBLEED*100)+"% of your course). "+
    "You may not paint it out. Do not repeat any of it:\n"+
    M.map(function(v){return "  visit "+v.visit+" ("+v.date+") \u2014 said: \u201C"+v.said+"\u201D"+
      (v.state?"\n      state: \u201C"+v.state+"\u201D":"\n      state: (not recorded \u2014 the field did not exist yet)")+
      "\n      drew: "+v.drew;}).join("\n");}
/* the bay each painter owns, in the order they first painted. Derived from the list, so a new
   painter tomorrow is a new bay and nobody has to maintain a roster. */
/* who painted it. `by` if the panel says so; otherwise the name at the front of `who`, which is how
   the nineteen painted before bays existed land in their own without anybody editing them.
   "Rigo again" is Rigo \u2014 a painter who came back is the same painter, and the first build of this
   gave him two bays, which is precisely the opposite of what the owner asked for. */
/* the words a name is made of, so "Doña Cuca", "cuca", "Don Güero" and "don-guero" can be compared */
function murFold(t){return String(t||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase()
  .replace(/[-_]+/g," ").replace(/[^a-z0-9 ]+/g," ").replace(/\s+/g," ").trim();}
function murWho(m){return String((m&&m.who&&m.who.en)||"").split(/[,\u2014(]/)[0]
  .replace(/\s+(again|otra vez|de nuevo)$/i,"").trim();}
/* A PERSON'S KEY ON THIS WALL IS THEIR FIRST NAME. Doña, Don and "the" are not names.
   Found 2026-09-14 by planting, twice in one sitting: by:"cuca" on a panel signed "Doña Cuca" opened a
   bay called "Cuca" beside hers and by:"don-guero" opened "Don-guero" beside Don Güero's — the first
   fix compared `by` with the whole of `who` and said "the same person" only when they were equal. The
   second fix asked whether `by` was a WORD of `who`, and that filed Melo's "Melo Garduño" visit in a
   new bay beside "Melo", because it then handed back the longer name. An agent's file name never
   carries the honorific, the accent or the surname; the wall's signature sometimes does. So the
   identity is one word, and the bay's NAME is whatever the person's first visit signed. */
function murKey(m){const raw=(m&&m.by)?String(m.by):murWho(m);
  const w=murFold(raw).replace(/^(dona|don|the)\s+/,"").split(" ")[0];return w||"?";}
function murOwnName(m){const who=murWho(m);
  if(m&&m.by){const b=String(m.by).trim(),w=murFold(who),bb=murFold(b);
    if(w&&(w===bb||(" "+w+" ").indexOf(" "+bb+" ")>=0))return who;
    return b.charAt(0).toUpperCase()+b.slice(1);}
  return who||"?";}
/* who painted it — the name of the bay it belongs in, which is the name the person's FIRST visit
   signed: "Melo" for melo-el-conteo-de-uno (signed "Melo Garduño"), "Doña Cuca" for a by:"cuca". A
   painter who came back is the same painter; the first build of this gave Rigo two bays, the second
   gave Beto two, the third gave Cuca, Güero and Melo two each. */
function murPainter(m,list){const L=list||(typeof MURALS!=="undefined"?MURALS:[]),k=murKey(m);
  const first=L.find(x=>murKey(x)===k)||m;return murOwnName(first);}
function murBays(list){const L=list||(typeof MURALS!=="undefined"?MURALS:[]),order=[],by={},disp={};
  L.forEach(m=>{const k0=murPainter(m,L),k=k0.toLowerCase();if(!by[k]){by[k]=[];order.push(k);disp[k]=k0;}by[k].push(m);});
  return order.map(k=>({who:disp[k],panels:by[k]}));}

/* the wall's natural size, in the same tile-pixels a panel is painted in. A bay is one panel wide;
   a bay with three panels is three panels tall. The wall is as tall as its busiest painter. */
const MURBAY=MURREF*0.62;                      /* how much wall one painter gets, across */
const MURSKY=26, MURDADO=22;                   /* above the work, and the painted skirting below it */
/* A COURSE is one visit: the work, and under it the line the painter was in when they painted it.
   The owner, 2026-09-12: "i want to make sure that if they are about to be repetitive, that they try
   to improvise from memory or again state or persona... it is important for me to see some way of
   EXPRESSION for my changarrito mates."
   So a bay is not a stack of pictures, it is a stack of visits, and each visit says what the painter
   was. Read a bay bottom to top and you are reading one person changing their mind over four days.
   That is the expression, and it is not a feeling — it is a POSITION, held on a date, in public,
   next to the last position the same person held. A wall is very good at that and prose is not. */
const MURBLEED=0.28;                           /* the most of your own past a visit may reach into */
const MURSTATE=15;                             /* the strip under each visit where the state is written */
const murCourse=()=>MURBAY*0.46+MURSTATE;
function murWallSize(list){const bays=murBays(list);
  const deep=bays.reduce((m,b)=>Math.max(m,b.panels.length),1);
  const tall=deep*murCourse()+MURSKY+MURDADO+18;
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
    const bx=i*MURBAY, ph=MURBAY*0.46, cH=murCourse();
    b.panels.forEach((m,j)=>{
      const py=foot-(j+1)*cH;
      /* ---- HOW FAR A VISIT MAY REACH ----
         The owner, 2026-09-12: "remind them its a mural... while they cant remove their initial
         drawings, they should keep that in mind with their creations."
         That is the whole difference between a mural and a stack, and it cuts both ways. A muralist
         coming back to their own wall does not paint an unrelated picture in the space above the old
         one — they let the new thing REACH DOWN into the old: a rope carries on, an arm comes over
         the edge, smoke from the first piece becomes weather in the second. The old work is permanent
         and that is the constraint you compose against, not the thing you work around.
         So a panel may declare `bleed` — how far, as a fraction of its own course, it may paint below
         itself into its own earlier visit. It is capped at MURBLEED and it can NEVER cross into
         another painter's bay, because reaching into your own past is composition and reaching into
         somebody else's is vandalism.
         WHAT IT MAY NOT DO IS PAINT THE OLD WORK OUT. That is not a convention: test/town.smoke.js
         renders the bay with and without the newest visit and fails the build if the earlier work
         stops being substantially visible. You may answer your first drawing. You may not erase it
         by painting on top of it, which is the same rule as "add and improve, never remove" applied
         to paint instead of to words. */
      const bleed=Math.max(0,Math.min(MURBLEED,+m.bleed||0))*ph;
      g.save();g.beginPath();
      g.rect(bx,Math.max(MURSKY*0.5,py),MURBAY,Math.min(ph+bleed,foot-py));g.clip();
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
      /* ...and what they were, that time, written on the wall under the work in the painter's own
         thread. Nothing is written for a visit that declared no state, which is honest: the state
         field did not exist until the fourth iteration and the wall should show that it did not. */
      const LA=(typeof lang!=="undefined"&&lang==="es")?"es":"en";
      const st=m.state&&(m.state[LA]||m.state.en);
      if(st){g.save();g.beginPath();g.rect(bx,py+ph,MURBAY,MURSTATE);g.clip();
        g.fillStyle=murThread(m.iter);g.fillRect(bx+5,py+ph+5,2,7);
        g.fillStyle=P.ink;g.globalAlpha=.62;g.font="italic 9px ui-monospace,monospace";
        g.fillText(st,bx+11,py+ph+12);g.globalAlpha=1;g.restore();}
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
