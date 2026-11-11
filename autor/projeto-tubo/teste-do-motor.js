// Testes do motor da Máquina do Tubo.
// Uso: node teste-do-motor.js maquina-do-tubo.html
// Lê o motor de dentro do html, entre os comentários MOTOR-INICIO e MOTOR-FIM.
const fs = require('fs'), vm = require('vm');
const file = process.argv[2] || 'maquina-do-tubo.html';
const html = fs.readFileSync(file, 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
if (!m) { console.error('Marcadores MOTOR-INICIO / MOTOR-FIM não encontrados em ' + file); process.exit(1); }
const ctx = {};
vm.createContext(ctx);
vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);

const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const V = true, F = false;
function rodar(par, tMax) {
  const p = Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() });
  const s = ctx.makeSim(p);
  let erro = 0;
  while (!s.ended && s.t < tMax) {
    s.step();
    const e = Math.abs(s.reserve + s.kinetic() + s.spent - s.Etot);
    if (e > erro) erro = e;
  }
  return { s, p, erro };
}

let falhas = 0;
function confere(nome, ok, detalhe) {
  console.log((ok ? 'PASSOU  ' : 'FALHOU  ') + nome + (detalhe ? '  [' + detalhe + ']' : ''));
  if (!ok) falhas++;
}
const perto = (x, alvo, tol) => Math.abs(x - alvo) <= tol;

// Cenários com os parâmetros padrão
const repouso = rodar({ modes: [] }, 600);
const um = rodar({ modes: [V] }, 6000);
const metade = rodar({ modes: [V, V, V, F, F, F] }, 6000);
const todos = rodar({ modes: [V, V, V, V, V, V] }, 6000);
const mesmo = rodar({ modes: [V, V, V, V, V, V], alternate: false }, 600);

// 1. Conservação
const erroMax = Math.max(repouso.erro, um.erro, metade.erro, todos.erro, mesmo.erro);
confere('1. Conservação: reserva + movimento + gasta = total', erroMax < 1e-6, 'erro máximo ' + erroMax.toExponential(1) + ' J');

// 2 e 3. n = f(v) e encontros, com raio fixo (energia enorme) e sem perda
{
  const r = rodar({ N: 2, modes: [V, F], loss: 0, E0: 1e12 }, 600);
  const voltas = r.s.t / r.p.Tclock;
  const nFor = r.s.obs[0].laps / voltas, nRep = r.s.obs[1].laps / voltas;
  confere('2. n = f(v): 10 voltas a 2 m/s e 0,5 a 0,10 m/s', perto(nFor, 10, 0.1) && perto(nRep, 0.5, 0.01), 'medido ' + nFor.toFixed(2) + ' e ' + nRep.toFixed(2));
  confere('3. Encontros em sentidos opostos: 105 em 600 s', perto(r.s.collisions, 105, 1), 'medido ' + r.s.collisions);
}

// 4. Mesmo sentido
confere('4. Todos com força no mesmo sentido não colidem', mesmo.s.collisions === 0, mesmo.s.collisions + ' colisões');

// 5. Repouso
confere('5. Todos em repouso deixam mais de 99,9 % da energia', repouso.s.frac > 0.999, (repouso.s.frac * 100).toFixed(2) + ' %');

// 6. Ordem
confere('6. Todos com força fecham o Tubo antes de metade com força',
  todos.s.ended && metade.s.ended && todos.s.t < metade.s.t, todos.s.t.toFixed(0) + ' s contra ' + metade.s.t.toFixed(0) + ' s');

// 7. Regressão (versão de 10/11/2026). Se uma regra mudar de propósito, atualize estes números e a tabela do PROMPT.md.
confere('7a. Regressão: metade com força', metade.s.endReason === 'energia' && perto(metade.s.t, 351, 7) && perto(metade.s.collisions, 1292, 26),
  metade.s.t.toFixed(0) + ' s, ' + metade.s.collisions + ' colisões');
confere('7b. Regressão: todos com força', todos.s.endReason === 'energia' && perto(todos.s.t, 110, 3) && perto(todos.s.collisions, 456, 10),
  todos.s.t.toFixed(0) + ' s, ' + todos.s.collisions + ' colisões');
confere('7c. Regressão: um com força', !um.s.ended && perto(um.s.collisions, 152, 4) && perto(um.s.frac * 100, 98.8, 0.3),
  um.s.collisions + ' colisões, ' + (um.s.frac * 100).toFixed(1) + ' % da energia');
confere('7d. Regressão: todos em repouso', perto(repouso.s.collisions, 21, 1), repouso.s.collisions + ' colisões em 600 s');

console.log(falhas ? '\n' + falhas + ' teste(s) falharam.' : '\nTodos os testes passaram.');
process.exit(falhas ? 1 : 0);
