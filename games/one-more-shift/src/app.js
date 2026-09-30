(function(){
'use strict';
const E=globalThis.OMS,$=id=>document.getElementById(id);
let state=E.create(),selected=new Set(),area='G',slow=false,sound=false,context=null,acc=0,last=performance.now(),logCount=0,resultShown=false;
const tokens=new Map(),orders=new Map();
const fmt=n=>{const seconds=Math.max(0,Math.ceil(n*60-1e-6));return `${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;};
function toast(message,error=false){$('toast').textContent=message;document.querySelector('.command-bar').classList.toggle('error',error);}
function ping(){if(!sound)return;try{context=context||new (window.AudioContext||window.webkitAudioContext)();context.resume();const o=context.createOscillator(),g=context.createGain();o.type='sine';o.frequency.setValueAtTime(440,context.currentTime);o.frequency.exponentialRampToValueAtTime(660,context.currentTime+.13);g.gain.setValueAtTime(.035,context.currentTime);g.gain.exponentialRampToValueAtTime(.001,context.currentTime+.25);o.connect(g);g.connect(context.destination);o.start();o.stop(context.currentTime+.26);}catch{}}
function select(ids){selected=new Set(ids);render();}
function ordinary(n){select(E.groups(state,area).filter(w=>!w.tech&&!w.forcedRest).slice(0,n).map(w=>w.id));}
function reset(){state=E.create();selected.clear();acc=0;logCount=0;resultShown=false;for(const d of document.querySelectorAll('dialog'))d.close();toast('Fresh shift. Same workshop. A different plan?');render();}
function showResults(){if(resultShown)return;resultShown=true;const r=E.result(state),all=r.onTime===r.commitments;
 $('result-heading').textContent=all?'You pulled it off.':'A shift worth another shot.';
 $('result-copy').textContent=all?'Every promise kept. What would you change to give your crew an easier finish?':'Some promises slipped. The next run is a chance to test a different recovery plan.';
 $('result-stats').replaceChildren();for(const [value,label] of [[`${r.onTime}/${r.commitments}`,'items on time'],[Math.round(r.energy),'mean crew energy'],[Math.round(r.lowest),'lowest crew energy']]){const d=document.createElement('div'),b=document.createElement('b'),span=document.createElement('span');b.textContent=value;span.textContent=label;d.append(b,span);$('result-stats').append(d);}
 $('result-orders').replaceChildren();for(const o of state.orders){if(!o.quantity)continue;const d=document.createElement('div');d.className='result-order';const name=document.createElement('b'),v=document.createElement('span');name.textContent=o.name;v.textContent=`${o.onTime} on time · ${o.delivered-o.onTime} late · ${o.quantity-o.delivered} unfinished`;d.append(name,v);$('result-orders').append(d);}
 const extra=document.createElement('p');extra.className='small-copy';extra.textContent=`Rush accepted: ${state.rushChoice||0}. Automatic rests: ${r.autoRests}. No combined score—deliveries and crew condition tell different parts of the story.`;$('result-orders').append(extra);
 $('result-timeline').replaceChildren();for(const event of state.log){const p=document.createElement('p');p.textContent=`${fmt(event.time)} · ${event.text}`;$('result-timeline').append(p);}
 $('results').showModal();ping();
}
function render(){
 document.body.classList.toggle('paused',state.paused);
 $('clock').textContent=fmt(45-state.time);$('pause').textContent=state.ended?'Shift complete':state.paused?(state.time?'Resume ▷':'Start shift ▷'):'Pause Ⅱ';$('pause').disabled=state.ended;
 $('pace').textContent=slow?'Slower pace':'Normal pace';$('board-status').textContent=state.ended?'Shift complete':state.paused?'Paused · make your plan':'Live · follow the flow';
 const open=state.orders.filter(o=>o.available&&o.quantity>o.delivered);const preferred=open.find(o=>o.id===state.priority)||open.filter(o=>state.time<=o.due).sort((a,b)=>a.due-b.due)[0]||open.sort((a,b)=>a.due-b.due)[0];
 for(const o of state.orders){let node=orders.get(o.id);if(!node){node=document.createElement('article');node.className='order';node.innerHTML='<div class="order-top"><span></span><span></span></div><h3></h3><div class="order-bottom"><span class="order-count"></span><button></button></div><div class="progress"><i></i></div>';$('orders').append(node);orders.set(o.id,node);node.querySelector('button').addEventListener('click',()=>{if(E.prioritize(state,o.id)){toast(`Next gadgets go to ${o.name}.`);render();}});}
 node.querySelector('.order-top span').textContent=o.id===3?'OPTIONAL RUSH':`PROMISE ${String(o.id+1).padStart(2,'0')}`;
 node.querySelector('.order-top span:last-child').textContent=o.id===3&&!o.available?(state.rushChoice===0?'PASSED':state.rushChoice!==null?'ARRIVES AT 12':'OFFER AT 10'):`DUE ${o.due}:00`;
 node.querySelector('h3').textContent=o.name;node.querySelector('.order-count').textContent=o.quantity?`${o.delivered} / ${o.quantity}`:'—';
 const b=node.querySelector('button');b.textContent=o.quantity&&o.delivered===o.quantity?'Complete':preferred?.id===o.id?'Up next':'Prioritize';b.disabled=!o.available||o.quantity<=o.delivered||state.ended;
 node.classList.toggle('active',preferred?.id===o.id);node.classList.toggle('late',o.closed&&o.onTime<o.quantity);node.classList.toggle('done',o.quantity>0&&o.onTime===o.quantity);node.querySelector('.progress i').style.width=`${o.quantity?100*o.delivered/o.quantity:0}%`;
 }
 for(const k of ['G','A','D']){$(`queue-${k}`).textContent=state.queue[k];$(`rate-${k}`).textContent=`${state.lastRates[k].toFixed(1)}/min capacity`;$(`count-${k}`).textContent=`${E.groups(state,k).length} CREW`;$(`flow-${k}`).classList.toggle('stopped',state.paused||!state.lastRates[k]||!state.queue[k]);document.querySelector(`[data-area="${k}"]`).classList.toggle('selected-area',area===k&&selected.size>0);}
 const machine=$('gadget-machine');machine.classList.toggle('broken',state.machine==='broken');machine.classList.toggle('warning',state.time>=6&&state.machine==='running');$('machine-caption').textContent=state.machine==='broken'?'DRIVE SEIZED':'GADGET-O-MATIC';
 $('machine-state').textContent=state.machine==='broken'?'Stopped. Choose your recovery.':state.machine==='fixed'?'Back in business. Find the next bottleneck.':state.time>=6?'Warning: drive failure at minute 8.':'A little weird. A lot of wonderful.';
 $('repair-bar').style.width=`${state.repair/4*100}%`;$('repair-status').textContent=state.machine==='fixed'?'Fixed. Your technicians are available.':state.repairActive?`Repairing · ${(4-state.repair).toFixed(1)} min remaining`:E.groups(state,'R').filter(w=>w.tech).length===2&&state.machine==='running'?'Technicians ready. Waiting for failure.':`Both technicians needed · ${(4-state.repair).toFixed(1)} min work left`;
 $('manual-status').textContent=state.machine!=='broken'?'A backup when the machine stops.':E.groups(state,'M').some(w=>w.tech)?'Working by hand · max 4 crew · 2× energy use.':'Needs 1 technician · max 4 crew.';
 for(const w of state.crew){let b=tokens.get(w.id);if(!b){b=document.createElement('button');b.className='crew-token';b.innerHTML='<span class="crew-face">•ᴗ•</span><span class="crew-energy"><i></i></span>';if(w.tech){const badge=document.createElement('span');badge.className='tech-badge';badge.textContent='⚒';b.append(badge);}tokens.set(w.id,b);b.addEventListener('click',event=>{if(event.shiftKey){if(selected.has(w.id))selected.delete(w.id);else selected.add(w.id);}else selected=new Set([w.id]);if(w.location!=='T')area=w.location;render();});}
 const parent=$(`crew-${w.location}`);if(b.parentElement!==parent)parent.append(b);b.classList.toggle('selected',selected.has(w.id));b.classList.toggle('tech',w.tech);b.classList.toggle('tired',w.energy<40);b.setAttribute('aria-pressed',String(selected.has(w.id)));b.setAttribute('aria-label',`${w.name}${w.tech?', technician':''}, ${E.label(w.location)}, energy ${Math.round(w.energy)}${w.location==='T'?`, arriving at ${E.label(w.target)} in ${Math.max(0,w.arrival-state.time).toFixed(1)} shift minutes`:''}`);b.title=b.getAttribute('aria-label');b.querySelector('.crew-energy i').style.width=`${w.energy}%`;
 }
 $('selection-title').textContent=selected.size?`${selected.size} crew selected`:'Select a crew';
 const chosen=state.crew.filter(w=>selected.has(w.id));$('selection-note').textContent=selected.size?`${chosen.map(w=>w.name).join(', ')}. ${chosen.filter(w=>w.tech).length} technician(s). Choose a destination below the workshop areas.`:'Choose an area’s crew, then a destination. Transfers take one shift minute.';
 for(const b of document.querySelectorAll('[data-dest]')){b.disabled=!selected.size||state.ended||b.dataset.dest==='M'&&state.machine!=='broken'||b.dataset.dest==='R'&&state.machine==='fixed';}
 $('delivered').textContent=state.delivered;$('energy').textContent=Math.round(E.result(state).energy);
 $('rush-open').hidden=!(state.rushOffered&&state.rushChoice===null&&state.time<12&&!state.ended);
 if(state.log.length!==logCount){const latest=state.log[state.log.length-1];if(logCount&&/complete|restored/.test(latest.text))ping();logCount=state.log.length;$('journal').replaceChildren();for(const e of state.log.slice(-8).reverse()){const d=document.createElement('div');d.className='journal-entry';const t=document.createElement('small');t.textContent=fmt(e.time);const span=document.createElement('span');span.textContent=e.text;d.append(t,span);$('journal').append(d);}}
 if(state.rushOffered&&state.rushChoice===null&&state.time===10&&!$('rush-dialog').open&&!state.rushSeen){state.rushSeen=true;$('rush-dialog').showModal();}
 if(state.ended)showResults();
}
for(const b of document.querySelectorAll('[data-group]'))b.addEventListener('click',()=>{area=b.dataset.group;ordinary(18);toast(`Ordinary crew in ${E.label(area)} selected. Technicians are selected separately.`);});
for(const b of document.querySelectorAll('[data-dest]'))b.addEventListener('click',()=>{const to=b.dataset.dest;const removing=state.crew.some(w=>selected.has(w.id)&&w.tech&&w.location==='R'&&to!=='R'&&state.machine==='broken'&&state.repairActive);if(removing&&!confirm('Moving a technician will pause the repair. Move them anyway?'))return;const result=E.assign(state,[...selected],to);toast(result.message,!result.ok);if(result.ok)selected.clear();render();});
document.querySelector('[data-tech]').addEventListener('click',()=>select(state.crew.filter(w=>w.tech&&w.location!=='T').map(w=>w.id)));
$('select-one').onclick=()=>ordinary(1);$('select-two').onclick=()=>ordinary(2);$('select-all').onclick=()=>ordinary(18);$('clear').onclick=()=>select([]);
function toggle(){if(state.ended)return;state.paused=!state.paused;acc=0;render();}
$('pause').onclick=toggle;$('pace').onclick=()=>{slow=!slow;acc=0;render();};
$('begin').onclick=()=>{$('welcome').close();state.paused=false;acc=0;render();};$('intro-slow').onclick=()=>{slow=true;$('intro-slow').textContent='Slower pace selected ✓';render();};
$('help').onclick=()=>{state.paused=true;acc=0;$('welcome').showModal();render();};
for(const b of document.querySelectorAll('[data-rush]'))b.onclick=()=>{if(E.chooseRush(state,+b.dataset.rush)){$('rush-dialog').close();toast('Commitment set. Resume when you’re ready.');render();}};
$('rush-inspect').onclick=()=>{$('rush-dialog').close();toast('Paused for inspection. You can resume and decide before minute 12.');};$('rush-open').onclick=()=>{state.paused=true;acc=0;$('rush-dialog').showModal();render();};
$('restart').onclick=()=>{if(confirm('Restart this shift? Your current progress will be cleared.'))reset();};$('rematch').onclick=()=>reset();$('rematch-slow').onclick=()=>{slow=true;reset();};
$('sound').onclick=()=>{sound=!sound;$('sound').textContent=sound?'Sound on':'Sound off';$('sound').setAttribute('aria-pressed',String(sound));ping();};$('motion').onchange=()=>document.body.classList.toggle('less-motion',$('motion').checked);
$('results').addEventListener('cancel',e=>e.preventDefault());$('rush-dialog').addEventListener('cancel',()=>toast('Rush remains undecided. Default is no additional work.'));
document.querySelector('.brand').onclick=e=>{e.preventDefault();state.paused=true;render();$('welcome').showModal();};
document.addEventListener('keydown',e=>{if(e.code==='Space'&&!document.querySelector('dialog[open]')&&!['BUTTON','INPUT','SELECT','TEXTAREA','SUMMARY'].includes(document.activeElement.tagName)){e.preventDefault();toggle();}if(e.key==='Escape'&&!document.querySelector('dialog[open]'))select([]);});
document.addEventListener('visibilitychange',()=>{if(document.hidden&&!state.ended){state.paused=true;acc=0;toast('Paused while you were away.');render();}});
function frame(now){const elapsed=Math.min((now-last)/1000,.25);last=now;if(!state.paused&&!state.ended){acc+=elapsed/(slow?16:8);while(acc>=E.STEP&&!state.paused&&!state.ended){E.advance(state);acc-=E.STEP;}render();}requestAnimationFrame(frame);}
render();$('welcome').showModal();requestAnimationFrame(frame);
// Local browser tests can inspect and advance the exact same simulation; no remote telemetry.
globalThis.OMSGame={get state(){return state;},render,reset,select};
})();
