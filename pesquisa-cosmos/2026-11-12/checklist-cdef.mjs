import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const html=readFileSync(new URL('../../autor/projeto-tubo/maquina-do-tubo.html',import.meta.url),'utf8');
const engine=html.split('/* MOTOR-INICIO */')[1].split('/* MOTOR-FIM */')[0];
const ctx=vm.createContext({});
vm.runInContext(engine+'\nglobalThis.api={makeSim,DT};',ctx);
const {makeSim,DT}=ctx.api;
const results=[];
for(const name of ['C','D','E','F']){
 const p={E0:1e8,P0:12,Tclock:60,N:1,vRep:5,vFor:1e6,force:0,loss:0,alternate:false,modes:[true]};
 const sim=makeSim(p);
 sim.obs[0].phi=0;
 const radius=sim.R;
 const duration=name==='F'?600:60;
 let displacement=0,maxVError=0,maxSError=0,maxEnergyError=0,maxRadiusError=0,maxAfterStop=0;
 const rows=[];
 for(let step=0;step<=duration/DT;step++){
  const t=step*DT,o=sim.obs[0],w=2*Math.PI/60;
  let vt,st;
  if(name==='C'){vt=5+t;st=5*t+t*t/2;}
  if(name==='D'){vt=Math.max(0,5-0.2*t);const u=Math.min(t,25);st=5*u-0.1*u*u;if(t>=25)maxAfterStop=Math.max(maxAfterStop,Math.abs(o.v));}
  if(name==='E'){vt=5+(1-Math.cos(w*t))/w;st=5*t+t/w-Math.sin(w*t)/(w*w);}
  if(name==='F'){vt=5*Math.cos(t);st=5*Math.sin(t);}
  maxVError=Math.max(maxVError,Math.abs(o.v-vt));
  maxSError=Math.max(maxSError,Math.abs(displacement-st));
  maxEnergyError=Math.max(maxEnergyError,Math.abs((o.v*o.v+displacement*displacement)/2-12.5)/12.5);
  maxRadiusError=Math.max(maxRadiusError,Math.abs(sim.R-radius));
  if(step%2400===0)rows.push({t,v:o.v,displacement,radius:sim.R});
  if(step===duration/DT)break;
  p.force=name==='C'?1:name==='D'?-0.2:name==='E'?Math.sin(w*t):-displacement;
  sim.step();
  displacement+=o.v*DT;
 }
 results.push({name,duration,maxVError,maxSError,maxEnergyError:name==='F'?maxEnergyError:null,maxAfterStop:name==='D'?maxAfterStop:null,maxRadiusError,rows});
}
const out={engineSha256:createHash('sha256').update(engine).digest('hex'),dt:DT,initialY:0,initialV:5,reserve:1e8,results};
writeFileSync(new URL('checklist-cdef-resultados.json',import.meta.url),JSON.stringify(out,null,2));
console.log(JSON.stringify({...out,results:results.map(({rows,...r})=>({...r,final:rows.at(-1)}))},null,2));
