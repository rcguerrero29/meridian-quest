/* THE BAKER'S CARD — the whole verb of this world, and it is ONE press.

   You walk up to the tray. It wears a read mark, so you could see from the doorway that something
   there is for you (READS + DOCS; the mark never clears, because a thing you can read is a place).
   You press Read. A small sheet opens — PAPER'd, so it is a baker's card and not a municipal
   permit. Two buttons: vanilla, chocolate. You press one. The sheet closes and the three rounds on
   the tray are wearing a scored shell in the colour you chose, from every camera, because the
   button changed what the TILE IS and the three painters were already drawing whatever that is.

   WHY IT IS LIVE. docDef (engine.js, grep `function docDef`) returns the object itself when the id is an object, and
   docSections(:3835-3836) calls d.build(docCtx()) on EVERY open. So this build() runs again each
   time the card is opened, reads the grid, and says what is actually on the tray right now — which
   is how the card can tick the shell you already chose and offer you the other one. Nothing is
   cached and nothing has to be told to refresh.

   NO PUNISHMENT: you may change your mind for ever, and nothing is subtracted, ever.
   NO INVENTORY: nothing is picked up, carried or counted.
   NO TIMER: there is no wait. The verb is a CHOICE. */

const H_TRAY={w:"horno",x:4,y:3};

/* THE ONE SOURCE OF TRUTH. The renderers read the grid; so does the card. Not a variable beside
   the grid that could drift out of step with it — the grid itself. */
const hTrayGlyph=()=>{try{return WORLDS[H_TRAY.w].grid[H_TRAY.y][H_TRAY.x];}catch(e){return "p";}};

/* THE VERB. propSet (engine.js, grep `function propSet`) swaps the glyph, records the old one, and calls
   t3Invalidate() — which is the line that matters, because in 3D the scene is BAKED once per
   build and a tile that changes without it would keep its old shape until you walked out and back.

   AND THEN IT CLOSES THE READER BY PRESSING THE READER'S OWN CLOSE BUTTON, which is not a
   flourish — it is the bug this pack shipped in its first draft and it is worth the paragraph.
   The first version did `$("reader").hidden=true`, copied off changarrito/content/record.js.
   That HIDES the card and does nothing else. But OPENING the card ran exitFsForCard()
   (engine.js, grep `exitFsForCard`): it strips `.fs` off #vp, drops `noscroll` off the body, exits
   browser fullscreen, and records `wasFs=true`. Only restoreFs() puts any of that back, and only
   the engine's own close calls it (engine.js, grep `restoreFs();checkTalk`). So a player
   in fullscreen on a phone — which is how the game is meant to be played — pressed "vanilla",
   got the tray, and got thrown out of fullscreen with it, EVERY TIME, and `wasFs` stayed stuck
   true so the next honest close restored nothing either. MEASURED: set #vp.fs, open the card,
   press a shell -> fs=false, noscroll=false, wasFs=true.
   checkTalk() is the second half of the same debt: it is what re-lights the Read button over the
   tile you are standing on, and the tray is a thing you press Read on twice.
   So: press the button a person would press. The fallback stays because a pack may never assume
   an element is there, but it is a fallback now and not the path. */
function hBake(g){
  try{propSet(H_TRAY.w,H_TRAY.x,H_TRAY.y,g);}catch(e){}
  try{$("docClose").click();}
  catch(e){try{$("reader").hidden=true;}catch(e2){}}
}

const DOCS={
  charola:{
    title:{en:"Baker's card",es:"Tarjeta del panadero"},
    sub:{en:"three rounds, one tray",es:"tres bolas, una charola"},
    build:()=>{
      const es=(typeof lang!=="undefined"&&lang==="es"),g=hTrayGlyph(),baked=(g==="v"||g==="c");
      const s=[];
      s.push({h:es?"Conchas":"Conchas"});
      s.push({p:baked
        ? (es?"Ya salieron. Tres, de una misma masa dividida a mano — por eso no son del mismo tamaño — y la de la derecha se llevó la esquina caliente del horno."
            : "They are out. Three, off one dough divided by hand — which is why they are not the same size — and the one on the right took the oven's hot corner.")
        : (es?"Tres bolas leudadas, lisas, en la charola. La costra se pone antes del horno: se raja al crecer la masa y por eso se le ve la corteza por abajo."
            : "Three proved rounds, plain, on the tray. The shell goes on before the oven: it cracks as the dough rises under it, and that is why you see the crust through it.")});
      s.push({kv:[
        [es?"Masa":"Dough", es?"tres, de una":"three, off one"],
        [es?"Costra":"Shell", baked?(g==="v"?(es?"vainilla":"vanilla"):(es?"chocolate":"chocolate")):(es?"sin poner":"not on yet")],
        [es?"Horno":"Oven","210°"]
      ]});
      s.push({note:baked
        ? (es?"Puedes cambiar de opinión las veces que quieras. Aquí nada se te quita."
            : "Change your mind as often as you like. Nothing here is ever taken away from you.")
        : (es?"Escoge una. No hay reloj y no hay error que te cueste nada."
            : "Pick one. There is no clock, and no mistake here costs you anything.")});
      s.push({btn:(es?"vainilla":"vanilla")+(g==="v"?"   ✓":""),run:()=>hBake("v")});
      s.push({btn:(es?"chocolate":"chocolate")+(g==="c"?"   ✓":""),run:()=>hBake("c")});
      if(baked)s.push({btn:es?"quitarles la costra":"take the shells off",run:()=>hBake("p")});
      return s;
    }
  }
};

/* WHERE THE READ MARK STANDS. The coordinate never moves; only the glyph under it does, so the
   mark, the Read button and the card all keep working across the bake. */
const READS=[{world:"horno",x:H_TRAY.x,y:H_TRAY.y,doc:"charola"}];
