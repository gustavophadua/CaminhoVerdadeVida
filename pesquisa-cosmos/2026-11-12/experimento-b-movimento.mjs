import { readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';
import { createHash } from 'node:crypto';

const source = readFileSync(new URL('../../autor/projeto-tubo/maquina-do-tubo.html', import.meta.url), 'utf8');
const engine = source.split('/* MOTOR-INICIO */')[1].split('/* MOTOR-FIM */')[0];
const context = vm.createContext({});
vm.runInContext(engine + '\nglobalThis.engine = {makeSim, MASS, DT};', context);
const { makeSim, MASS, DT } = context.engine;
const params = { E0:800, P0:12, Tclock:60, N:1, vRep:5, vFor:10, force:0, loss:0, alternate:false, modes:[true] };
const sim = makeSim(params);
const c = 2;
const initialRadius = sim.R;
sim.obs[0].phi = c / sim.R;
const initialPhi = sim.obs[0].phi;
const rows = [];
let maxPositionError = 0;
let maxPositionErrorEngineTime = 0;
let maxVelocityError = 0;
let maxRadiusError = 0;
for (let step = 0; step <= 144000; step++) {
  const tNominal = step * DT;
  const o = sim.obs[0];
  const y = sim.R * o.phi;
  const error = Math.abs(y - (c + 5 * tNominal));
  maxPositionError = Math.max(maxPositionError, error);
  maxPositionErrorEngineTime = Math.max(maxPositionErrorEngineTime, Math.abs(y - (c + 5 * sim.t)));
  maxVelocityError = Math.max(maxVelocityError, Math.abs(o.v - 5));
  maxRadiusError = Math.max(maxRadiusError, Math.abs(sim.R - initialRadius));
  if (!Number.isFinite(y) || error > 1e-7 || o.v !== 5 || sim.collisions !== 0 || sim.ended) throw Error('Falha no movimento uniforme');
  if (step % 2400 === 0) rows.push({step, tNominal, tEngine:sim.t, y, v:o.v, distance:o.dist, laps:o.laps});
  if (step < 144000) sim.step();
}
const o = sim.obs[0];
const phaseError = Math.atan2(Math.sin(o.phi-initialPhi), Math.cos(o.phi-initialPhi));
const result = {
  experiment:'B movimento uniforme', engineSha256:createHash('sha256').update(engine).digest('hex'),
  mass:MASS, dt:DT, params, c, steps:144000, maxPositionError, maxPositionErrorEngineTime,
  maxVelocityError, maxRadiusError, finalY:sim.R*o.phi, distance:o.dist,
  laps:o.laps, phaseErrorRadians:phaseError, circleChordError:2*initialRadius*Math.abs(Math.sin(phaseError/2)),
  collisions:sim.collisions, energyInitial:sim.Etot, energyFinal:sim.reserve+sim.kinetic()+sim.spent,
  hypotheticalCentripetalAcceleration:25/initialRadius, rows
};
writeFileSync(new URL('experimento-b-movimento.json', import.meta.url), JSON.stringify(result,null,2));
console.log(JSON.stringify({...result, rows:[rows[0],rows.at(-1)]},null,2));
