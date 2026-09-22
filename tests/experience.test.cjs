const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const scripts = path.join(__dirname, '../scripts');
const experience = fs.readdirSync(scripts).find(name => /^experience\.[a-f0-9]+\.js$/.test(name));
const code = fs.readFileSync(path.join(scripts, experience), 'utf8');
function environment({fontsPending=false, imagesFail=false, hidden=false, outsideRoot=false, logoPending=false}={}) {
  let next=1, started=0, skipped=0;
  const timers=new Map(), frames=new Map(), events=new Map();
  const document={hidden,documentElement:{dataset:{}},fonts:{load:()=>fontsPending?new Promise(()=>{}):Promise.resolve([]),ready:Promise.resolve()},
    addEventListener:(k,f)=>events.set(k,f),removeEventListener:(k,f)=>{if(events.get(k)===f)events.delete(k)}};
  let preparing = true, logoDecoded = false, resolveLogo;
  const logoReady = logoPending ? new Promise(resolve => { resolveLogo = resolve; }) : Promise.resolve();
  const logo = {decode:() => { logoDecoded = true; return logoReady; }};
  const pre={removeAttribute:name=>{if(name==='data-preparing')preparing=false;},querySelectorAll:()=>[logo]};
  document.querySelector=()=>pre;
  const root={querySelector:()=>outsideRoot?null:pre,querySelectorAll:()=>[{decode:()=>imagesFail?Promise.reject(new Error('image failed')):Promise.resolve()}]};
  const context={window:{},document,Intl,Date,Promise,Number,
    setTimeout:(f,ms)=>{const n=next++;timers.set(n,{f,ms});return n;},clearTimeout:n=>timers.delete(n),
    requestAnimationFrame:f=>{const n=next++;frames.set(n,f);return n;},cancelAnimationFrame:n=>frames.delete(n)};
  vm.runInNewContext(code,context);
  return {api:context.window.FugazExperience,document,events,timers,frames,root,
    start:()=>started++,skip:()=>skipped++,get started(){return started},get skipped(){return skipped},
    get preparing(){return preparing},get logoDecoded(){return logoDecoded},resolveLogo:()=>resolveLogo(),
    paint(){const batch=[...frames.values()];frames.clear();batch.forEach(f=>f());}};
}
const flush=async()=>{for(let i=0;i<12;i++)await Promise.resolve();};
(async()=>{
 const e=environment();
 const months=['Q1','Q1','Q2','Q2','Q2','Q3','Q3','Q3','Q4','Q4','Q4','Q1 2027'];
 months.forEach((q,m)=>{const a=e.api.availability(new Date(Date.UTC(2026,m,15)));assert.equal(a.quarter,q);assert.equal(a.spots,3);});
 assert.equal(e.api.availability(new Date('2026-08-31T22:00:00Z')).quarter,'Q4');
 assert.equal(e.api.availability(new Date('2026-08-31T21:59:59Z')).quarter,'Q3');
 assert.equal(e.api.availability(new Date('2026-12-31T23:00:00Z')).quarter,'Q1');
 assert.equal(e.api.availability(new Date(),0).spots,0);
 assert.equal(e.api.availability(new Date(),1,'Q2').label,'1 spot left for Q2');
 assert.equal(e.api.availability(new Date(),'invalid').spots,3);
 for(const options of [{},{imagesFail:true},{outsideRoot:true}]){
  const t=environment(options);t.api.prepareIntro(t.root,t.start,t.skip);await flush();assert.equal(t.started,0);t.paint();assert.equal(t.started,0);t.paint();assert.equal(t.started,1);assert.equal(t.timers.size,0);assert.equal(t.preparing,false);assert.equal(t.logoDecoded,true);
 }
 // Reproduce the real page: the intro is outside the main root and its image is still loading.
 const sibling=environment({outsideRoot:true,logoPending:true});
 sibling.api.prepareIntro(sibling.root,()=>{assert.equal(sibling.preparing,false);sibling.start();},sibling.skip);
 await flush();assert.equal(sibling.logoDecoded,true);assert.equal(sibling.frames.size,0);assert.equal(sibling.preparing,true);
 sibling.resolveLogo();await flush();sibling.paint();sibling.paint();assert.equal(sibling.started,1);assert.equal(sibling.preparing,false);
 const siblingEscape=environment({outsideRoot:true,logoPending:true});siblingEscape.api.prepareIntro(siblingEscape.root,siblingEscape.start,siblingEscape.skip);
 siblingEscape.events.get('keydown')({key:'Escape'});siblingEscape.resolveLogo();await flush();siblingEscape.paint();siblingEscape.paint();assert.equal(siblingEscape.skipped,1);assert.equal(siblingEscape.started,0);assert.equal(siblingEscape.preparing,false);
 const slow=environment({fontsPending:true});slow.api.prepareIntro(slow.root,slow.start,slow.skip);await flush();assert.equal(slow.frames.size,0);assert.equal([...slow.timers.values()][0].ms,3500);[...slow.timers.values()][0].f();await flush();slow.paint();slow.paint();assert.equal(slow.started,1);
 const cancel=environment();const cleanup=cancel.api.prepareIntro(cancel.root,cancel.start,cancel.skip);cleanup();await flush();cancel.paint();cancel.paint();assert.equal(cancel.started,0);assert.equal(cancel.events.size,0);
 const escape=environment({fontsPending:true});escape.api.prepareIntro(escape.root,escape.start,escape.skip);escape.events.get('keydown')({key:'Escape'});await flush();assert.equal(escape.skipped,1);assert.equal(escape.started,0);assert.equal(escape.timers.size,0);
 const hidden=environment({hidden:true});hidden.api.prepareIntro(hidden.root,hidden.start,hidden.skip);await flush();assert.equal(hidden.frames.size,0);hidden.document.hidden=false;hidden.events.get('visibilitychange')();hidden.paint();hidden.paint();assert.equal(hidden.started,1);
 const mode=environment();const stop=mode.api.trackInputMode();assert.equal(mode.document.documentElement.dataset.inputMode,'pointer');mode.events.get('keydown')({key:'Tab'});assert.equal(mode.document.documentElement.dataset.inputMode,'keyboard');mode.events.get('pointerdown')();assert.equal(mode.document.documentElement.dataset.inputMode,'pointer');stop();assert.equal(mode.events.size,0);
 console.log('PASS: 12 planning months, Amsterdam date boundaries, year rollover, manual capacity (including zero), sibling intro visibility and logo decoding, two-frame readiness, asset failures, bounded wait, cancellation, Escape, background tabs, and input modality.');
})().catch(e=>{console.error(e);process.exit(1)});
