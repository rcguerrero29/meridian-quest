/* Where each borrowed icon's opening is — MEASURED, and then LOOKED AT.
   Writes icon-openings.json (the table render-borrowed.js reads) and openings-contact-sheet.png
   (every measured row drawn on its own icon, for a person to check with their eyes).
   node docs/mocks/2026-09-15-simmer-book/measure-openings.js

   Why the contact sheet exists, and it is the whole lesson of this file:
   the first version of this probe ran, produced a confident and stable number for `steaming-bowl`,
   and the number was WRONG — its predicate caught the chopsticks and the noodle tangle ABOVE the
   bowl, not the bowl's opening. It then sat in the repo looking exactly as trustworthy as the two
   correct rows. Automating a measurement without looking at it does not remove the guess, it
   launders it: a wrong number arrives wearing the authority of a measurement. So the probe now
   draws what it measured, and flags any row whose aspect ratio says it has measured the wrong
   thing. (Beto, 2026-09-15.) */
const path=require('path'),fs=require('fs');
const {chromium}=require('/home/user/meridian-quest/node_modules/playwright-core');
const SETPATH='/tmp/emojitest/node_modules/@iconify-json/fluent-emoji';
const SET=require(SETPATH+'/icons.json');
const PKG=JSON.parse(fs.readFileSync(SETPATH+'/package.json','utf8'));
const OUT=__dirname;
const src=n=>'data:image/svg+xml;base64,'+Buffer.from(
 `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SET.width} ${SET.height}" width="256" height="256">${SET.icons[n].body}</svg>`).toString('base64');

/* the predicate ships as CODE, not as prose — prose cannot be re-run */
const JOBS=[
 {icon:'pot-of-food',          pred:'a>200 && r>170 && r-b>60 && g>70 && g<190'},
 {icon:'shallow-pan-of-food',  pred:'a>200 && r>190 && g>150 && b<150 && r-b>60'},
];
(async()=>{
 const b=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
 const p=await b.newPage({viewport:{width:JOBS.length*280,height:300},deviceScaleFactor:2});
 const table={_measuredAgainst:{set:'@iconify-json/fluent-emoji',version:PKG.version},_rows:{}};
 for(const j of JOBS){
   const m=await p.evaluate(async([s,pred])=>{
     const im=new Image();await new Promise(r=>{im.onload=r;im.src=s;});
     const c=document.createElement('canvas');c.width=c.height=256;
     const g=c.getContext('2d');g.drawImage(im,0,0,256,256);
     const d=g.getImageData(0,0,256,256).data;
     const f=new Function('r','g','b','a','return ('+pred+');');
     let minX=256,maxX=0,minY=256,maxY=0,n=0;
     for(let y=0;y<256;y++)for(let x=0;x<256;x++){const k=(y*256+x)*4;
       if(f(d[k],d[k+1],d[k+2],d[k+3])){n++;
         if(x<minX)minX=x;if(x>maxX)maxX=x;if(y<minY)minY=y;if(y>maxY)maxY=y;}}
     if(!n)return {n:0};
     return {n, cx:+(((minX+maxX)/2)/256).toFixed(4), cy:+(((minY+maxY)/2)/256).toFixed(4),
       rx:+(((maxX-minX)/2)/256).toFixed(4), ry:+(((maxY-minY)/2)/256).toFixed(4)};
   },[src(j.icon),j.pred]);
   /* THE CHECK THAT WOULD HAVE KILLED THE BAD ROW: an opening seen from any camera is roughly as
      wide as it is tall in the icon's own space. 1.35 means the predicate found something else. */
   m.pred=j.pred;
   m.aspect=m.n?+(m.rx/m.ry).toFixed(3):null;
   m.suspect=m.n? (m.aspect>1.15||m.aspect<0.85) : true;
   table._rows[j.icon]=m;
   console.log(j.icon.padEnd(24), m.n?`cx ${m.cx} cy ${m.cy} rx ${m.rx} ry ${m.ry} aspect ${m.aspect}`:'NOTHING MATCHED',
     m.suspect?'  ← SUSPECT: this predicate has probably measured the wrong thing. LOOK at the contact sheet.':'');
 }
 /* the contact sheet: what was measured, drawn on what it was measured from */
 const sheet=await p.evaluate(async([rows,srcs])=>{
   const W=280,H=300,c=document.createElement('canvas');
   c.width=W*Object.keys(rows).length;c.height=H;
   const g=c.getContext('2d');g.fillStyle="#141118";g.fillRect(0,0,c.width,c.height);
   let i=0;
   for(const [name,m] of Object.entries(rows)){
     const im=new Image();await new Promise(r=>{im.onload=r;im.src=srcs[name];});
     const x0=i*W+20,y0=46,S=240;
     g.drawImage(im,x0,y0,S,S);
     if(m.n){
       g.strokeStyle="#E05A3A";g.lineWidth=3;
       g.beginPath();g.ellipse(x0+S*m.cx,y0+S*m.cy,S*m.rx,S*m.ry,0,0,7);g.stroke();
       g.strokeStyle="#7AA7E0";g.lineWidth=2;g.setLineDash([6,5]);
       g.beginPath();g.ellipse(x0+S*m.cx,y0+S*m.cy,S*m.rx*1.03,S*m.rx*1.03,0,0,7);g.stroke();g.setLineDash([]);
     }
     g.fillStyle=m.suspect?"#E05A3A":"#9ED39A";g.font="600 13px ui-monospace,monospace";
     g.fillText(name+(m.suspect?"  ← SUSPECT":""),x0,28);
     i++;
   }
   return c.toDataURL();
 },[table._rows,Object.fromEntries(JOBS.map(j=>[j.icon,src(j.icon)]))]);
 fs.writeFileSync(path.join(OUT,'openings-contact-sheet.png'),Buffer.from(sheet.split(',')[1],'base64'));
 fs.writeFileSync(path.join(OUT,'icon-openings.json'),JSON.stringify(table,null,1));
 console.log('\ncontact sheet written — LOOK AT IT before trusting any row above');
 await b.close();
})().catch(e=>{console.error('FAIL',e.message);process.exit(1);});
