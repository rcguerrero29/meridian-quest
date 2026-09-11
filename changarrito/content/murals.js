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
