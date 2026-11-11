// Medidas da máquina que as equações usam. Uso: node medidas.js maquina-do-tubo.html  -> JSON
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2] || 'maquina-do-tubo.html', 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
const ctx = {}; vm.createContext(ctx); vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const V = true, F = false;
function rodar(par, tMax, marcas) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() });
  const s = ctx.makeSim(p), pontos = [];
  while (!s.ended && s.t < tMax) { s.step(); for (const tm of marcas || []) if (!pontos.some(q => q.t === tm) && s.t >= tm) pontos.push({ t: tm, r: Math.sqrt(s.frac) }); }
  return { s, p, pontos };
}
const out = {};
const rep = rodar({ modes: [] }, 1);
out.keInit = rep.s.keInit; out.E0 = rep.p.E0;
const todos = rodar({ modes: [V, V, V, V, V, V] }, 6000);
out.todos = { t: todos.s.t, colisoes: todos.s.collisions, gasto: todos.s.spent, frac: todos.s.frac };
const metade = rodar({ modes: [V, V, V, F, F, F] }, 6000);
out.metade = { t: metade.s.t, colisoes: metade.s.collisions, gasto: metade.s.spent, frac: metade.s.frac };
const Tf = todos.s.t;
const cone = rodar({ modes: [V, V, V, V, V, V] }, 6000, [Tf / 4, Tf / 2, 3 * Tf / 4]);
out.cone = { pontos: [{ t: 0, r: 1 }].concat(cone.pontos).concat([{ t: cone.s.t, r: Math.sqrt(cone.s.frac) }]) };
const semPerda = rodar({ modes: [V, V, V, V, V, V], loss: 0 }, 600);
out.semPerda = { colisoes: semPerda.s.collisions, gasto: semPerda.s.spent, frac: semPerda.s.frac };
// possibilidades (S11) com velocidades iguais, sentidos alternados, sem perda, 30 voltas do relógio
{
  const p = Object.assign({}, PADRAO, { loss: 0, E0: 1e12, modes: [] }), s = ctx.makeSim(p), H = 12, TAU = Math.PI * 2, visto = new Set();
  s.obs.forEach(o => { o.v = o.dir * 2; }); s.Etot = p.E0 + s.kinetic();
  while (s.t < 1800) { const antes = s.rel.slice(); s.step(); let k = 0; for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++, k++) { if (antes[k] * s.rel[k] < 0 && Math.abs(antes[k]) < 1.5 && Math.abs(s.rel[k]) < 1.5) { const ang = ((s.obs[i].phi % TAU) + TAU) % TAU; visto.add(k * H + Math.round(ang / TAU * H) % H); } } }
  out.iguais = { testadas: visto.size, total: 15 * H };
}
console.log(JSON.stringify(out));
