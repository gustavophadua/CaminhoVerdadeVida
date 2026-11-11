// Caça a falhas da Máquina do Tubo: o que os testes da seção 9 não cobrem.
// Uso: node caca-falhas.js maquina-do-tubo.html
// A. o resultado depende do passo de tempo?  B. depende de perturbações mínimas?
// C. as afirmações gerais valem em toda a faixa dos controles da própria máquina?
const fs = require('fs'), vm = require('vm');
const file = process.argv[2] || 'maquina-do-tubo.html';
const html = fs.readFileSync(file, 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
if (!m) { console.error('Marcadores não encontrados'); process.exit(1); }
function motor(dtInv) {
  const src = m[1].replace('DT = 1 / 240', 'DT = 1 / ' + dtInv);
  if (dtInv !== 240 && src === m[1]) throw new Error('não achei DT no motor');
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src + '\nthis.makeSim = makeSim;', ctx);
  return ctx.makeSim;
}
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
function rodar(makeSim, par, tMax, mexer) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() });
  const s = makeSim(p);
  if (mexer) mexer(s);
  let erro = 0, k = 0;
  while (!s.ended && s.t < tMax) {
    s.step();
    if (++k % 16 === 0) { const e = Math.abs(s.reserve + s.kinetic() + s.spent - s.Etot); if (e > erro) erro = e; }
  }
  return { s, p, erro };
}
const metadeDe = n => Array.from({ length: n }, (_, i) => i < n / 2);
const todosDe = n => Array.from({ length: n }, () => true);
const res = r => (r.s.ended ? r.s.endReason + ' em ' + r.s.t.toFixed(0) + ' s' : 'não fechou') + ', ' + r.s.collisions + ' colisões, ' + (r.s.frac * 100).toFixed(1) + ' %';

console.log('A. Passo de tempo (parâmetros padrão)');
for (const d of [120, 240, 480, 960]) {
  const mk = motor(d);
  console.log('   dt = 1/' + d + '  metade: ' + res(rodar(mk, { modes: metadeDe(6) }, 6000)) + '  |  todos: ' + res(rodar(mk, { modes: todosDe(6) }, 6000)));
}

console.log('\nB. Perturbações mínimas (metade com força, dt = 1/240)');
const mk = motor(240);
const casosB = [
  ['padrão', {}, null],
  ['perímetro 12,000001 m', { P0: 12.000001 }, null],
  ['velocidade 2,000001 m/s', { vFor: 2.000001 }, null],
  ['energia 800,001 J', { E0: 800.001 }, null],
  ['f1 deslocado 0,000001 rad', {}, s => { s.obs[0].phi += 1e-6; }],
  ['f1 deslocado 0,001 rad', {}, s => { s.obs[0].phi += 1e-3; }]
];
for (const [nome, par, mexer] of casosB) console.log('   ' + nome.padEnd(28) + res(rodar(mk, Object.assign({ modes: metadeDe(6) }, par), 6000, mexer)));

console.log('\nC. Afirmações gerais em toda a faixa dos controles (40 sorteios, semente fixa)');
let seed = 20261110;
const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const entre = (a, b, passo) => { const v = a + rnd() * (b - a); return passo ? Math.round(v / passo) * passo : v; };
const cont = { conserva: 0, ordem: 0, ordemInv: [], mesmo: 0, mesmoFalha: [], repouso: 0, repousoFalha: [], total: 0, ambosFecham: 0 };
let erroMax = 0;
for (let i = 0; i < 40; i++) {
  const par = { E0: entre(100, 3000, 100), P0: entre(6, 24, 1), N: Math.round(entre(2, 12)), vRep: entre(0, 0.5, 0.05),
    vFor: entre(0.5, 5, 0.1), force: entre(0.2, 5, 0.2), loss: entre(0, 0.9, 0.05) };
  const tag = JSON.stringify(par);
  const t = rodar(mk, Object.assign({ modes: todosDe(par.N) }, par), 3000);
  const h = rodar(mk, Object.assign({ modes: metadeDe(par.N) }, par), 3000);
  const ms = rodar(mk, Object.assign({ modes: todosDe(par.N), alternate: false }, par), 300);
  const rp = rodar(mk, Object.assign({ modes: [] }, par), 600);
  cont.total++;
  erroMax = Math.max(erroMax, t.erro, h.erro, ms.erro, rp.erro);
  if (t.s.ended && h.s.ended && t.s.endReason === 'energia' && h.s.endReason === 'energia') {
    cont.ambosFecham++;
    if (t.s.t < h.s.t) cont.ordem++; else cont.ordemInv.push(tag + '  todos ' + t.s.t.toFixed(0) + ' s, metade ' + h.s.t.toFixed(0) + ' s');
  } else if (h.s.ended && h.s.endReason === 'energia' && !(t.s.ended && t.s.endReason === 'energia')) {
    cont.ordemInv.push(tag + '  metade fechou (' + h.s.t.toFixed(0) + ' s) e todos não: ' + res(t));
  }
  if (ms.s.collisions === 0) cont.mesmo++; else cont.mesmoFalha.push(tag + '  ' + ms.s.collisions + ' colisões');
  if (rp.s.frac > 0.999) cont.repouso++; else cont.repousoFalha.push(tag + '  sobrou ' + (rp.s.frac * 100).toFixed(2) + ' %');
}
console.log('   conservação: erro máximo ' + erroMax.toExponential(1) + ' J em ' + cont.total * 4 + ' simulações');
console.log('   "todos com força fecham antes de metade": vale em ' + cont.ordem + ' de ' + cont.ambosFecham + ' casos em que os dois fecham');
cont.ordemInv.forEach(x => console.log('      contraexemplo: ' + x));
console.log('   "mesmo sentido não colide": vale em ' + cont.mesmo + ' de ' + cont.total);
cont.mesmoFalha.slice(0, 5).forEach(x => console.log('      contraexemplo: ' + x));
console.log('   "repouso deixa mais de 99,9 %": vale em ' + cont.repouso + ' de ' + cont.total);
cont.repousoFalha.slice(0, 5).forEach(x => console.log('      contraexemplo: ' + x));

console.log('\nD. "Mais colisões, mais energia gasta" (padrão, até fechar)');
for (const [nome, modes] of [['metade com força', metadeDe(6)], ['todos com força', todosDe(6)]]) {
  const r = rodar(mk, { modes }, 6000);
  console.log('   ' + nome.padEnd(18) + r.s.collisions + ' colisões, ' + r.s.spent.toFixed(1) + ' J gastos, ' + (r.s.spent / r.s.collisions).toFixed(3) + ' J por colisão');
}
{
  const r = rodar(mk, { modes: todosDe(6), loss: 0 }, 600);
  console.log('   todos com força, perda 0 %: ' + r.s.collisions + ' colisões em 600 s, ' + r.s.spent.toFixed(3) + ' J gastos, ' + (r.s.frac * 100).toFixed(1) + ' % da energia');
}
