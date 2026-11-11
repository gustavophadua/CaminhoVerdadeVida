// O que um fragmento consegue notar de dentro do Tubo?
// Uso: node dentro-do-tubo.js maquina-do-tubo.html
// Mede, em janelas de 10 s, o que dá para contar de dentro (voltas no perímetro, colisões)
// e compara com o que só Alpha vê (fração da reserva). Também roda dois universos com
// energias iniciais diferentes para ver se a diferença aparece do lado de dentro.
const fs = require('fs'), vm = require('vm');
const file = process.argv[2] || 'maquina-do-tubo.html';
const html = fs.readFileSync(file, 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
if (!m) { console.error('Marcadores não encontrados'); process.exit(1); }
const ctx = {}; vm.createContext(ctx);
vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const todos = [true, true, true, true, true, true];

function janelas(par, janela, tMax) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() });
  const s = ctx.makeSim(p);
  const linhas = [];
  let prox = janela, laps0 = 0, col0 = 0;
  while (!s.ended && s.t < tMax) {
    s.step();
    if (s.t >= prox) {
      const o = s.obs[0];
      linhas.push({ t: prox, frac: s.frac, voltas: (o.laps - laps0) * p.Tclock / janela, col: s.collisions - col0, gasto: s.spent });
      laps0 = o.laps; col0 = s.collisions; prox += janela;
    }
  }
  return { s, linhas };
}

console.log('A. Todos com força, padrão. O que f1 conta de dentro, a cada 10 s');
console.log('   tempo   reserva (só Alpha vê)   voltas de f1 por volta do relógio   colisões na janela');
const a = janelas({ modes: todos }, 10, 6000);
for (const l of a.linhas) console.log('   ' + String(l.t).padStart(4) + ' s' + (l.frac * 100).toFixed(1).padStart(14) + ' %' + l.voltas.toFixed(1).padStart(28) + String(l.col).padStart(26));
console.log('   fim: ' + a.s.endReason + ' em ' + a.s.t.toFixed(0) + ' s');

console.log('\nB. Dois universos: energia inicial 800 J e 8000 J. Mesmos observadores, mesma força.');
console.log('   Compara o que f1 conta nos primeiros 60 s.');
for (const E0 of [800, 8000]) {
  const r = janelas({ modes: todos, E0 }, 10, 60);
  console.log('   E0 = ' + String(E0).padStart(4) + ' J  voltas por janela: ' + r.linhas.map(l => l.voltas.toFixed(1)).join('  ') + '   colisões: ' + r.linhas.map(l => l.col).join(' '));
}

console.log('\nC. Transferência e gasto: uma colisão isolada (2 m/s contra -0,10 m/s)');
for (const perda of [0, 0.25, 0.5, 0.75, 1]) {
  const e = Math.sqrt(1 - perda), u1 = 2, u2 = -0.1;
  const v1 = ((1 + e) * u1 + (1 - e) * u2) / 2, v2 = ((1 - e) * u1 + (1 + e) * u2) / 2;
  const gasto = 0.25 * (1 - e * e) * (u1 - u2) * (u1 - u2);
  console.log('   perda ' + String(perda * 100).padStart(3) + ' %: f1 ' + u1.toFixed(2) + ' -> ' + v1.toFixed(3) + ' m/s, f2 ' + u2.toFixed(2) + ' -> ' + v2.toFixed(3) + ' m/s, movimento passado de f1 a f2 ' + (v2 - u2).toFixed(3) + ' kg.m/s, gasto ' + gasto.toFixed(3) + ' J');
}
