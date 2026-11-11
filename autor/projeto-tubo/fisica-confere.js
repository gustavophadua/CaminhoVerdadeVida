// Confere na máquina duas leis que a física e a matemática dão como "solução" das equações sem solução.
// Uso: node fisica-confere.js maquina-do-tubo.html
// A. Lei de Haff (gás granular, 1983): sem força e com perda, a energia de movimento cai como K0 / (1 + t/τ)²,
//    isto é, 1/√K cresce em linha reta com o tempo.
// B. Número de rotação (Weyl/Kronecker): dois fragmentos em sentidos opostos, velocidades a e b, se encontram
//    em exatamente q pontos do perímetro, onde a/(a+b) = p/q em termos mínimos; se a razão for irracional, em infinitos.
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2] || 'maquina-do-tubo.html', 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
const ctx = {}; vm.createContext(ctx); vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const TAU = Math.PI * 2;
const PADRAO = { E0: 1e12, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const sim = par => ctx.makeSim(Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() }));

console.log('A. Lei de Haff: todos em repouso (sem força), perda 50 %, raio fixo (E0 enorme), velocidade inicial 2 m/s');
for (const N of [6, 12, 24]) {
  const s = sim({ N, vRep: 2 }); const ts = [], ys = []; let prox = 0;
  while (s.t < 400) { s.step(); if (s.t >= prox) { const K = s.kinetic(); if (K > 1e-9) { ts.push(s.t); ys.push(1 / Math.sqrt(K)); } prox += 2; } }
  const n = ts.length, mx = ts.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  let sxy = 0, sxx = 0, syy = 0; for (let i = 0; i < n; i++) { sxy += (ts[i] - mx) * (ys[i] - my); sxx += (ts[i] - mx) ** 2; syy += (ys[i] - my) ** 2; }
  const b = sxy / sxx, a = my - b * mx, r2 = sxy * sxy / (sxx * syy), K0 = s.keInit, tau = 1 / (b * Math.sqrt(K0));
  const Kfim = s.kinetic(), previsto = K0 / (1 + 400 / tau) ** 2;
  const i50 = ts.findIndex(x => x >= 50), incl = (Math.log(1 / ys[n - 1] ** 2) - Math.log(1 / ys[i50] ** 2)) / (Math.log(ts[n - 1]) - Math.log(ts[i50]));
  console.log(`   N = ${String(N).padStart(2)}: K(t) em J: ` + [0, 2, 10, 50, 100, 200, 400].map(tt => { const i = ts.findIndex(x => x >= tt); return `${tt} s: ${(1 / ys[i] ** 2).toExponential(2)}`; }).join('  ') + `;  K ∝ t^${incl.toFixed(2)} entre 50 e 400 s (Haff: t^-2)`);
  console.log(`   N = ${String(N).padStart(2)}: 1/√K em linha reta com R² = ${r2.toFixed(4)}; τ = ${tau.toFixed(1)} s; K(400 s) medido ${Kfim.toExponential(2)} J, Haff prevê ${previsto.toExponential(2)} J; ${s.collisions} colisões`);
}

console.log('\nB. Pontos de encontro de um par em sentidos opostos (sem perda, raio fixo, 3600 s)');
function mdc(a, b) { return b ? mdc(b, a % b) : a; }
function fracao(x) { // menor q com p/q = x (até 2000); se não há, a razão é irracional para a máquina
  for (let q = 1; q <= 2000; q++) { const p = Math.round(x * q); if (Math.abs(x - p / q) < 1e-9) return [p, q]; }
  return [0, 0];
}
for (const [a, b, nome] of [[2, 2, 'iguais'], [2, 1, 'quente e morno'], [2, 0.5, '4 para 1'], [2, 0.1, 'quente e frio'], [1.3, 0.6, 'morno e morno'], [2, Math.SQRT2, '2 e √2 (irracional)']]) {
  const s = sim({ N: 2, loss: 0 }); s.obs[0].v = a; s.obs[1].v = -b; s.Etot = s.p.E0 + s.kinetic();
  const pontos = new Set(), horas = new Set(); let enc = 0;
  while (s.t < 3600) { const antes = s.rel[0]; s.step(); const agora = s.rel[0]; if (antes * agora < 0 && Math.abs(antes) < 1.5 && Math.abs(agora) < 1.5) { enc++; const ang = ((s.obs[0].phi % TAU) + TAU) % TAU; pontos.add(Math.round(ang / TAU * 600) % 600); horas.add(Math.round(ang / TAU * 12) % 12); } }
  const [p, q] = fracao(a / (a + b));
  const prev = q === 0 ? 'infinitos (densos)' : `q = ${q} (a/(a+b) = ${p}/${q})`;
  console.log(`   ${nome.padEnd(22)} a = ${String(a).padEnd(5)} b = ${b.toFixed(3).padEnd(6)} previsto: ${prev.padEnd(28)} medido: ${pontos.size} pontos distintos em ${enc} encontros; horas do relógio cobertas: ${horas.size} de 12`);
}
