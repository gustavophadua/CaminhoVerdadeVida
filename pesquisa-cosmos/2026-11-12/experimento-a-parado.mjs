import {readFileSync,writeFileSync} from 'node:fs';
import vm from 'node:vm';
import {createHash} from 'node:crypto';
const source=readFileSync(new URL('../../autor/projeto-tubo/maquina-do-tubo.html',import.meta.url),'utf8');
const engine=source.split('/* MOTOR-INICIO */')[1].split('/* MOTOR-FIM */')[0];
const context=vm.createContext({});
vm.runInContext(engine+'\nglobalThis.engine={makeSim,MASS,DT};',context);
const {makeSim,MASS,DT}=context.engine;
const params={E0:800,P0:12,Tclock:60,N:1,vRep:0,vFor:5,force:0,loss:0,alternate:false,modes:[true]};
const sim=makeSim(params);
const c=2;
sim.obs[0].phi=c/sim.R;
const rows=[];
let maxError=0;
for(let i=0;i<=144000;i++){
 const y=sim.R*sim.obs[0].phi;
 maxError=Math.max(maxError,Math.abs(y-c));
 if(!Number.isFinite(y)||sim.obs[0].v!==0||Math.abs(y-c)>1e-12||sim.collisions!==0||sim.ended) throw Error('Falha em repouso');
 if(i%2400===0)rows.push({step:i,t:sim.t,y,v:sim.obs[0].v,R:sim.R});
 if(i<144000)sim.step();
}
const result={experiment:'A parado',engineSha256:createHash('sha256').update(engine).digest('hex'),mass:MASS,dt:DT,params,c,steps:144000,maxError,collisions:sim.collisions,energyInitial:sim.Etot,energyFinal:sim.reserve+sim.kinetic()+sim.spent,rows};
writeFileSync(new URL('experimento-a-parado.json',import.meta.url),JSON.stringify(result,null,2));
console.log(JSON.stringify({...result,rows:[rows[0],rows.at(-1)]},null,2));

