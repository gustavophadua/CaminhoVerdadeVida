// Frio, morno e quente: o que cada um faz na máquina, e quanto das "possibilidades" se testa.
// Uso: node possibilidades.js maquina-do-tubo.html
// SUPOSIÇÃO S11 (minha, para o autor decidir): uma possibilidade = um par de fragmentos se
// encontrar numa das 12 horas do relógio. Com 6 fragmentos: 15 pares x 12 horas = 180.
// O motor não foi alterado. Velocidades diferentes são postas à mão em fragmentos sem força
// (sem força e sem perda, cada um mantém a velocidade que recebeu).
const fs = require('fs'), vm = require('vm');
const file = process.argv[2] || 'maquina-do-tubo.html';
const html = fs.readFileSync(file, 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
if (!m) { console.error('Marcadores não encontrados'); process.exit(1); }
const ctx = {}; vm.createContext(ctx);
vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const TAU = Math.PI * 2, HORAS = 12;
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };

function rodar(par, tMax, vels) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() });
  const s = ctx.makeSim(p);
  if (vels) s.obs.forEach((o, i) => { o.v = o.dir * vels[i]; });
  const n = s.obs.length, total = n * (n - 1) / 2 * HORAS, visto = new Set();
  let encontros = 0, tCheio = null;
  while (!s.ended && s.t < tMax) {
    const antes = s.rel.slice();
    s.step();
    let k = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++, k++) {
      const was = antes[k], now = s.rel[k];
      if (was * now < 0 && Math.abs(was) < 1.5 && Math.abs(now) < 1.5) {
        encontros++;
        const ang = ((s.obs[i].phi % TAU) + TAU) % TAU;
        visto.add(k * HORAS + Math.round(ang / TAU * HORAS) % HORAS);  // hora mais próxima
        if (tCheio === null && visto.size === total) tCheio = s.t;
      }
    }
  }
  return { s, encontros, cob: visto.size / total, tCheio };
}
const fmt = r => (r.cob * 100).toFixed(0).padStart(4) + ' % testado, ' + String(r.encontros).padStart(5) + ' encontros, '
  + (r.tCheio !== null ? 'tudo testado em ' + r.tCheio.toFixed(0) + ' s' : 'nunca testa tudo')
  + (r.s.ended ? ' | Tubo fechou (' + r.s.endReason + ') em ' + r.s.t.toFixed(0) + ' s' : '');

console.log('A. Possibilidades, sem perda (nada se gasta, o raio não muda). 1800 s = 30 voltas do relógio.');
console.log('   Sentidos alternados, como na máquina. Velocidades em m/s, f1 a f6.');
const casos = [
  ['todos frios      0,1 0,1 0,1 0,1 0,1 0,1', [0.1, 0.1, 0.1, 0.1, 0.1, 0.1]],
  ['todos quentes    2   2   2   2   2   2  ', [2, 2, 2, 2, 2, 2]],
  ['todos fanáticos  5   5   5   5   5   5  ', [5, 5, 5, 5, 5, 5]],
  ['metade quente, metade fria  2 2 2 0,1 0,1 0,1', [2, 2, 2, 0.1, 0.1, 0.1]],
  ['quentes e mornos  2 2 2 1 1 1', [2, 2, 2, 1, 1, 1]],
  ['quentes, mornos e frios  2 2 1 1 0,1 0,1', [2, 2, 1, 1, 0.1, 0.1]],
  ['todos diferentes  2 1,7 1,3 1 0,6 0,1', [2, 1.7, 1.3, 1, 0.6, 0.1]]
];
for (const [nome, vels] of casos) console.log('   ' + nome.padEnd(46) + fmt(rodar({ loss: 0 }, 1800, vels)));

console.log('\nB. A máquina como está (perda 50 %, energia): quanto foi testado quando o Tubo fecha');
const V = true, F = false;
for (const [nome, modes] of [['metade com força', [V, V, V, F, F, F]], ['todos com força', [V, V, V, V, V, V]]])
  console.log('   ' + nome.padEnd(46) + fmt(rodar({ modes }, 6000)));

console.log('\nC. Quente, morno e frio na máquina como está (perda 50 %): todos com força, velocidade de cruzeiro variando');
for (const vFor of [0.5, 1, 2, 4]) {
  const r = rodar({ modes: [V, V, V, V, V, V], vFor }, 6000);
  console.log('   cruzeiro ' + String(vFor).padEnd(4) + ' m/s  ' + (r.s.ended ? 'fecha em ' + r.s.t.toFixed(0) + ' s' : 'não fecha em 6000 s') + ', ' + r.s.collisions + ' colisões');
}
