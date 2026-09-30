/* One More Shift: deterministic simulation, independent of its presentation. */
(function (root) {
'use strict';
const STEP = 1 / 60, EPS = 1e-8;
const names = ['Milo','Bea','Otis','Cleo','Finn','Pip','Ada','Kit','Juno','Remy','Nell','Sol','Lou','Ivy','Zig','Wren','Ash','Bo'];
const config = { duration:45, initial:48, rates:{G:.25,A:.2,D:.32,M:.1}, slots:{G:8,A:8,D:6,M:4}, deadlines:[14,30,45,42] };
function create() {
 return {version:'0.3.0',time:0,tick:0,paused:true,ended:false,queue:{G:30,A:12,D:6},credit:{G:0,A:0,D:0},
 crew:names.map((name,id)=>({id,name,tech:id===6||id===7,location:id<6?'G':id<12?'A':'D',origin:null,target:null,arrival:null,energy:75,forcedRest:false})),
 machine:'running',repair:0,rushChoice:null,rushOffered:false,rushArrived:false,priority:null,delivered:0,autoRests:0,
 orders:[{id:0,name:'Parade lanterns',quantity:16,due:14,delivered:0,onTime:0,available:true,closed:false},
 {id:1,name:'Dancing gizmos',quantity:16,due:30,delivered:0,onTime:0,available:true,closed:false},
 {id:2,name:'Firefly spinners',quantity:16,due:45,delivered:0,onTime:0,available:true,closed:false},
 {id:3,name:'Festival rush',quantity:0,due:42,delivered:0,onTime:0,available:false,closed:false}],log:[{time:0,text:'Festival Finish. Your crew is ready.'}],lastOutput:{G:0,A:0,D:0},lastRates:{G:1.5,A:1.2,D:1.92},repairActive:false};
}
function note(s,text){s.log.push({time:s.time,text});}
function groups(s,k){return s.crew.filter(w=>w.location===k);}
function assign(s,ids,to){
 if(s.ended)return {ok:false,message:'This shift has ended. Try a rematch.'};
 if(!['G','A','D','M','R','B'].includes(to))return {ok:false,message:'Choose a workshop destination.'};
 const workers=[...new Set(ids)].map(id=>s.crew.find(w=>w.id===id)).filter(Boolean);
 if(!workers.length)return {ok:false,message:'Select some crew first.'};
 if(workers.some(w=>w.location==='T'))return {ok:false,message:'Those crew are still traveling. Let them arrive first.'};
 if(workers.some(w=>w.forcedRest&&w.energy<40&&to!=='B'))return {ok:false,message:'This crew needs to recover to 40 energy before returning.'};
 if(to==='R'&&workers.some(w=>!w.tech))return {ok:false,message:'Only the two technicians can work in Repair.'};
 if(to==='R'&&s.machine==='fixed')return {ok:false,message:'The machine is already repaired.'};
 if(to==='M'&&s.machine!=='broken')return {ok:false,message:'Manual assembly is available when the machine fails.'};
 let moved=0;
 for(const w of workers){if(w.location===to)continue;w.origin=w.location;w.location='T';w.target=to;w.arrival=s.time+1;moved++;}
 if(!moved)return {ok:false,message:'That crew is already there.'};
 note(s,`${moved} crew sent to ${label(to)}. One shift minute to arrive.`);
 return {ok:true,message:`${moved} on the way to ${label(to)}.`};
}
function chooseRush(s,n){
 if(!s.rushOffered||s.time>=12-EPS||s.rushChoice!==null||s.ended||![0,6,12].includes(n))return false;
 s.rushChoice=n;s.orders[3].quantity=n;note(s,n?`Accepted ${n} festival rush items, due at minute 42.`:'Passed on the rush. Keep the original promises.');return true;
}
function prioritize(s,id){const o=s.orders.find(o=>o.id===id);if(!o||!o.available||o.quantity<=o.delivered||s.ended)return false;s.priority=id;note(s,`Next departures prioritize ${o.name}.`);return true;}
function label(k){return {G:'Gather',A:'Assemble',D:'Dispatch',M:'Manual assembly',R:'Repair',B:'Break area',T:'Travel'}[k]||k;}
function allocate(s,n,time){
 while(n>0){
  const open=s.orders.filter(o=>o.available&&o.delivered<o.quantity);
  const manual=open.find(o=>o.id===s.priority);
  const ontime=open.filter(o=>time<=o.due+EPS);
  const pool=ontime.length?ontime:open;
  const o=manual||pool.sort((a,b)=>a.due-b.due||a.id-b.id)[0];if(!o)throw new Error('Output without an available order');
  const take=Math.min(n,o.quantity-o.delivered);o.delivered+=take;if(time<=o.due+EPS)o.onTime+=take;n-=take;
  if(o.delivered===o.quantity){note(s,`${o.name} complete${time>o.due+EPS?' (late)':''}.`);if(s.priority===o.id)s.priority=null;}
 }
}
function advance(s,ignorePause=false){
 if(s.ended||s.paused&&!ignorePause)return;
 const t=s.tick*STEP,end=Math.min(45,(s.tick+1)*STEP);s.time=t;
 for(const w of s.crew){if(w.location==='T'&&w.arrival<=t+EPS){w.location=w.target;w.target=null;w.origin=null;w.arrival=null;}}
 for(const w of s.crew){if(w.location==='B'){w.energy=Math.min(100,w.energy+4*STEP);if(w.energy>=40)w.forcedRest=false;}}
 const activeRepair=groups(s,'R').filter(w=>w.tech);s.repairActive=s.machine==='broken'&&activeRepair.length===2;
 if(s.repairActive){s.repair=Math.min(4,s.repair+STEP);activeRepair.forEach(w=>w.energy-=STEP);}
 const out={G:0,A:0,D:0};s.lastRates={G:0,A:0,D:0};
 for(const k of ['G','A','D']){
  let workers=groups(s,k),rate=config.rates[k],cap=config.slots[k],manual=false;
  if(k==='A'&&s.machine==='broken'){
   workers=groups(s,'M').sort((a,b)=>Number(b.tech)-Number(a.tech)||a.id-b.id);manual=true;rate=config.rates.M;cap=4;
   if(!workers.some(w=>w.tech))workers=[];
  }
  workers=workers.slice(0,cap);
  const power=workers.reduce((sum,w)=>sum+rate*(w.energy>=40?1:.75),0);s.lastRates[k]=power;
  if(s.queue[k]<=0||!power)continue;
  const work=Math.min(power*STEP,Math.max(0,s.queue[k]-s.credit[k]));s.credit[k]+=work;
  const n=Math.min(s.queue[k],Math.floor(s.credit[k]+EPS));s.queue[k]-=n;s.credit[k]-=n;
  if(s.credit[k]<EPS)s.credit[k]=0;
  const fraction=work/(power*STEP);
  workers.forEach(w=>{w.energy=Math.max(0,w.energy-STEP*fraction*(manual?2:1));});out[k]=n;
 }
 s.queue.A+=out.G;s.queue.D+=out.A;s.delivered+=out.D;s.time=end;allocate(s,out.D,end);s.lastOutput=out;
 if(s.repair>=4-EPS&&s.machine==='broken'){
  s.machine='fixed';s.repair=4;s.repairActive=false;groups(s,'M').forEach(w=>w.location='A');note(s,'Machine restored! Manual crew switch to powered assembly. Technicians are available in Repair.');
 }
 for(const w of s.crew){if(w.location!=='B'&&w.location!=='T'&&w.energy<20-EPS){w.forcedRest=true;s.autoRests++;assign(s,[w.id],'B');note(s,`${w.name} needs recovery and is heading to rest.`);}}
 s.tick++;s.time=s.tick*STEP;
 if(s.tick===360)note(s,'Machine warning: assembly drive fails at minute 8. Get your technicians ready.');
 if(s.tick===480){s.machine='broken';note(s,'Assembly drive seized. Repair needs both technicians; manual assembly needs one.');}
 if(s.tick===600){s.rushOffered=true;s.paused=true;note(s,'A festival rush is offered. Choose 0, 6 or 12 by minute 12.');}
 if(s.tick===720){if(s.rushChoice===null){s.rushChoice=0;note(s,'Rush offer expired; no additional work accepted.');}s.rushArrived=true;s.queue.G+=s.rushChoice;s.orders[3].available=s.rushChoice>0;if(s.rushChoice)note(s,`${s.rushChoice} rush items arrived at Gather.`);}
 for(const o of s.orders){if(!o.closed&&s.time>=o.due-EPS){o.closed=true;if(o.quantity)note(s,`${o.name} deadline: ${o.onTime}/${o.quantity} on time.`);}}
 if(s.tick>=2700){s.time=45;s.ended=true;s.paused=true;note(s,'Shift complete. See what your choices made possible.');}
 assertState(s);
}
function assertState(s){
 const total=Object.values(s.queue).reduce((a,b)=>a+b,0)+s.delivered;
 if(total!==48+(s.rushArrived?s.rushChoice:0))throw new Error('Item conservation failed');
 if(s.crew.length!==18||new Set(s.crew.map(w=>w.id)).size!==18)throw new Error('Crew conservation failed');
 if(Object.values(s.queue).some(n=>n<0||!Number.isInteger(n)))throw new Error('Invalid inventory');
 if(s.orders.reduce((a,o)=>a+o.delivered,0)!==s.delivered)throw new Error('Delivery allocation failed');
 if(s.crew.some(w=>w.energy<0||w.energy>100+EPS))throw new Error('Invalid energy');
 return true;
}
function result(s){return {total:s.delivered,commitments:48+(s.rushChoice||0),onTime:s.orders.reduce((a,o)=>a+o.onTime,0),energy:s.crew.reduce((a,w)=>a+w.energy,0)/18,lowest:Math.min(...s.crew.map(w=>w.energy)),autoRests:s.autoRests};}
const api={STEP,config,create,assign,chooseRush,prioritize,advance,assertState,result,label,groups};
root.OMS=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
