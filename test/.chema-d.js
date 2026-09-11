const { chromium } = require('playwright-core');const fs=require('fs'),path=require('path');
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
const pg=await b.newPage({viewport:{width:480,height:900}});const errs=[];pg.on('pageerror',e=>errs.push(e.message));
await pg.route('**',r=>r.request().url().startsWith('file://')?r.continue():r.abort());
await pg.goto('file://'+path.resolve('/home/user/meridian-quest',process.argv[2]));await pg.waitForTimeout(1500);
try{await pg.click('.classes button[data-c="architect"]',{timeout:1500});await pg.click('#begin',{timeout:1500});}catch(e){console.log('no picker');}
await pg.waitForTimeout(800);
console.log(await pg.evaluate(()=>({wk:Object.keys(WORLDS), anProps:WORLDS.an?Object.keys(WORLDS.an):null, cw:typeof CW, cwlen:CW()&&CW().length})));
console.log(errs.slice(0,3));await b.close();})();
