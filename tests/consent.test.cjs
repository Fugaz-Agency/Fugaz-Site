'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const script = fs.readdirSync(path.join(__dirname, '../scripts')).find(n => /^consent\..*\.js$/.test(n));
const code = fs.readFileSync(path.join(__dirname, '../scripts', script), 'utf8');
const NOW = Date.now();
const stored = (accepted, project='test123', expires=NOW+86400000) => encodeURIComponent(JSON.stringify({ version:1, project, accepted, expires }));
function setup({id='test123', cookie='', mounted=true, intro=true, blocked=false}={}) {
  const events = {}, handlers = {}, scripts = [], timers = new Map(), cookies = new Map();
  if(cookie) cookies.set('fugaz_consent',cookie);
  let observer, observed=false, focus=0, legalClosed=0, reloads=0, now=NOW;
  const banner = { hidden:true,querySelector:selector=>({
    addEventListener:(_,fn)=>handlers[selector]=fn,focus:()=>focus++
  })};
  const preloader = {display:intro?'block':'none'};
  const document = {
    hidden:false, body:{},head:{appendChild:s=>scripts.push(s)},
    getElementById:()=>banner,
    querySelector:selector=>{if(selector==='[data-open-legal="privacy"]')return {isConnected:true,focus:()=>focus++};assert.equal(selector,'#fugaz-root [data-preloader]');return mounted?preloader:null;},
    createElement:()=>({dataset:{}}),addEventListener:(name,fn)=>events[name]=fn,
    get cookie(){return [...cookies].map(([k,v])=>k+'='+v).join('; ');},
    set cookie(value){if(blocked)throw new Error('Storage disabled');const [kv]=value.split(';');const i=kv.indexOf('=');const k=kv.slice(0,i),v=kv.slice(i+1);if(value.includes('Max-Age=0;'))cookies.delete(k);else cookies.set(k,v);}
  };
  let next=0;const frames=[];
  const context = {
    window:{FugazAnalyticsConfig:{clarityProjectId:id}},document,
    location:{hostname:'fugaz-agency.com',protocol:'https:',reload:()=>reloads++},
    Date:{now:()=>now},JSON,Number,Math,encodeURIComponent,decodeURIComponent,
    getComputedStyle:el=>el,
    MutationObserver:class { constructor(fn){observer=fn;}observe(){observed=true;}disconnect(){observed=false;} },
    requestAnimationFrame:fn=>{frames.push(fn);return ++next;},
    setTimeout:(fn,delay)=>{const n=++next;timers.set(n,{fn,delay});return n;},clearTimeout:n=>timers.delete(n)
  };
  vm.runInNewContext(code,context);
  return {banner,scripts,cookies,context,timers,
    get observed(){return observed;},get focus(){return focus;},get legalClosed(){return legalClosed;},get reloads(){return reloads;},
    finishIntro(){mounted=true;preloader.display='none';observer();while(frames.length)frames.shift()();},
    accept(){handlers['[data-cookie-accept]']();},decline(){handlers['[data-cookie-decline]']();},
    settings(fromPolicy=false){events.click({target:{closest:()=>({isConnected:true,closest:()=>fromPolicy?{querySelector:selector=>{assert.equal(selector,'[data-legal-close]');return {click:()=>legalClosed++};}}:null,focus:()=>focus++})}});},
    foreground(){events.visibilitychange();},advance(ms){now+=ms;},
    queue(){return Array.from(context.window.clarity?.q||[],args=>Array.from(args));}
  };
}
const first=setup();assert.equal(first.banner.hidden,true);assert.equal(first.scripts.length,0);
first.finishIntro();assert.equal(first.banner.hidden,false);assert.equal(first.observed,false);assert.equal(first.scripts.length,0);
first.accept();assert.equal(first.scripts.length,1);assert.equal(first.scripts[0].src,'https://www.clarity.ms/tag/test123');
assert.equal(first.scripts[0].async,true);assert.equal(first.queue()[0][0],'consentv2');assert.equal(first.queue()[0][1].analytics_Storage,'granted');assert.equal(first.queue()[0][1].ad_Storage,'denied');
assert.equal(JSON.parse(decodeURIComponent(first.cookies.get('fugaz_consent'))).accepted,true);
first.settings();assert.equal(first.banner.hidden,false);assert.equal(first.focus,1);first.accept();assert.equal(first.scripts.length,1);
first.settings();first.cookies.set('_clck','test');first.cookies.set('_clsk','test');first.decline();assert.equal(first.reloads,1);assert.equal(first.cookies.has('_clck'),false);assert.equal(first.cookies.has('_clsk'),false);assert.equal(first.queue().at(-1)[1].analytics_Storage,'denied');
const policy=setup({intro:false});policy.decline();policy.settings(true);assert.equal(policy.legalClosed,1);assert.equal(policy.banner.hidden,false);assert.equal(policy.focus,1);policy.decline();assert.equal(policy.focus,2);
const declined=setup({intro:false});declined.decline();assert.equal(declined.scripts.length,0);assert.equal(declined.reloads,0);assert.equal(declined.banner.hidden,true);
const rememberedDecline=setup({cookie:stored(false),intro:false});assert.equal(rememberedDecline.banner.hidden,true);assert.equal(rememberedDecline.scripts.length,0);
const remembered=setup({cookie:stored(true)});assert.equal(remembered.scripts.length,0);remembered.finishIntro();assert.equal(remembered.scripts.length,1);assert.equal(remembered.banner.hidden,true);
for (const cookie of ['bad json',stored(true,'different'),stored(true,'test123',NOW-1)]) {const e=setup({cookie,intro:false});assert.equal(e.scripts.length,0);assert.equal(e.banner.hidden,false);}
for (const id of ['', 'invalid/id']) {const e=setup({id,intro:false});e.accept();assert.equal(e.scripts.length,0);}
const blocked=setup({blocked:true,intro:false});blocked.accept();assert.equal(blocked.scripts.length,1);assert.equal(blocked.banner.hidden,true);
const blockedDecline=setup({blocked:true,intro:false});blockedDecline.decline();assert.equal(blockedDecline.scripts.length,0);assert.equal(blockedDecline.banner.hidden,true);
const delayed=setup({mounted:false});assert.equal(delayed.banner.hidden,true);delayed.finishIntro();assert.equal(delayed.banner.hidden,false);
const expired=setup({cookie:stored(true),intro:false});expired.advance(2*86400000);expired.foreground();assert.equal(expired.reloads,1);
const otherTab=setup({cookie:stored(true),intro:false});otherTab.cookies.set('fugaz_consent',stored(false));otherTab.foreground();assert.equal(otherTab.reloads,1);
assert.ok([...remembered.timers.values()].every(t=>t.delay<=86400000));
console.log('PASS: no tracking before consent, intro handoff, accept/decline, persisted preferences, privacy-policy reopening and focus restoration, withdrawal/unload, expiry, project changes, invalid IDs, delayed mounting, blocked storage, and cross-tab rejection.');
