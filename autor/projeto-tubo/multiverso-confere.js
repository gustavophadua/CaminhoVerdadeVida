// O Tubo e o multiverso: o que a máquina, como está, permite.
// Uso: node multiverso-confere.js maquina-do-tubo.html
// A. O motor tem acaso ou ramificação? (procura por fontes de aleatoriedade no código do motor)
// B. O "multiverso em série" do autor (A.6: testar todas as possibilidades numa história só, até esgotar o estoque):
//    quanto do estoque (S11: par x hora, 180) uma história só alcança, com e sem perda, com e sem força.
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2] || 'maquina-do-tubo.html', 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
const ctx = {}; vm.createContext(ctx); vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const TAU = Math.PI * 2, H = 12;
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const V = true, F = false;

console.log('A. Acaso no motor');
const fontes = ['Math.random', 'crypto', 'Date.now', 'performance.now'];
for (const f of fontes) console.log('   ' + f.padEnd(16) + (m[1].split(f).length - 1) + ' ocorrências');
{ // duas rodadas iguais dão o mesmo?
  const r = () => { const s = ctx.makeSim(Object.assign({}, PADRAO, { modes: [V, V, V, F, F, F] })); while (!s.ended && s.t < 6000) s.step(); return s.collisions + ' colisões, ' + s.t.toFixed(4) + ' s'; };
  const a = r(), b = r(); console.log('   duas rodadas iguais: ' + a + '  |  ' + b + '  -> ' + (a === b ? 'idênticas (uma história só por estado inicial)' : 'DIFERENTES'));
}

console.log('\nB. Uma história só alcança quanto do estoque de 180 possibilidades? (1800 s = 30 voltas do relógio)');
function cobertura(par, tMax) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() }), s = ctx.makeSim(p), n = s.obs.length, visto = new Set();
  let enc = 0;
  while (!s.ended && s.t < tMax) {
    const antes = s.rel.slice(); s.step(); let k = 0;
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++, k++) if (antes[k] * s.rel[k] < 0 && Math.abs(antes[k]) < 1.5 && Math.abs(s.rel[k]) < 1.5) { enc++; const ang = ((s.obs[i].phi % TAU) + TAU) % TAU; visto.add(k * H + Math.round(ang / TAU * H) % H); }
  }
  return { cob: visto.size, enc, fim: s.ended ? s.endReason + ' em ' + s.t.toFixed(0) + ' s' : 'segue', frac: s.frac };
}
for (const [nome, par] of [
  ['todos em repouso, sem perda (conservativo)', { loss: 0, E0: 1e12 }],
  ['todos em repouso, perda 50 % (dissipativo)', {}],
  ['todos em repouso, perda 50 %, saindo a 2 m/s', { vRep: 2, E0: 1e12 }],
  ['metade com força, perda 50 % (forçado)', { modes: [V, V, V, F, F, F] }],
  ['todos com força, perda 50 %', { modes: [V, V, V, V, V, V] }]
]) { const r = cobertura(par, 1800); console.log('   ' + nome.padEnd(46) + String(r.cob).padStart(3) + ' de 180 (' + (100 * r.cob / 180).toFixed(0).padStart(3) + ' %), ' + String(r.enc).padStart(5) + ' encontros, ' + r.fim); }
