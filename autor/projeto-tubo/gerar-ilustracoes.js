// Todas as ilustrações do Projeto Tubo, em preto e branco, calculadas (não desenhadas à mão).
// Uso: node gerar-ilustracoes.js maquina-do-tubo.html   -> pasta ilustracoes/ (P01..P17 .svg, album.html, contato.html)
// Cada prancha diz no rodapé o que é do autor, o que é suposição e o que foi medido ou provado.
const fs = require('fs'), vm = require('vm'), path = require('path');
const html = fs.readFileSync(process.argv[2] || 'maquina-do-tubo.html', 'utf8');
const mm = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
const ctx = {}; vm.createContext(ctx); vm.runInContext(mm[1] + '\nthis.makeSim = makeSim;', ctx);
const TAU = Math.PI * 2, PI = Math.PI;
const PADRAO = { E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [] };
const sim = par => ctx.makeSim(Object.assign({}, PADRAO, par, { modes: (par.modes || []).slice() }));
const DIR = path.join(__dirname, 'ilustracoes');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

// ---------- desenho ----------
const W = 1200, H = 900, INK = '#111', CINZA = '#8a8a8a', CLARO = '#d6d6d6';
const f1 = x => (Math.round(x * 10) / 10).toString();
const num = (x, c = 1) => x.toFixed(c).replace('.', ',');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const L = (x1, y1, x2, y2, o = {}) => `<line x1="${f1(x1)}" y1="${f1(y1)}" x2="${f1(x2)}" y2="${f1(y2)}" stroke="${o.c || INK}" stroke-width="${o.w || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.op ? ` stroke-opacity="${o.op}"` : ''}/>`;
const PL = (pts, o = {}) => pts.length < 2 ? '' : `<polyline points="${pts.map(p => f1(p[0]) + ',' + f1(p[1])).join(' ')}" fill="${o.f || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w || 1.5}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.op ? ` stroke-opacity="${o.op}"` : ''} stroke-linejoin="round"/>`;
const C = (x, y, r, o = {}) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${o.f || 'none'}" stroke="${o.c || INK}" stroke-width="${o.w === undefined ? 1.5 : o.w}"${o.d ? ` stroke-dasharray="${o.d}"` : ''}${o.op ? ` stroke-opacity="${o.op}"` : ''}/>`;
const T = (x, y, s, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-size="${o.s || 18}" text-anchor="${o.a || 'start'}" fill="${o.c || INK}"${o.b ? ' font-weight="bold"' : ''}${o.i ? ' font-style="italic"' : ''}>${esc(s)}</text>`;
const seta = (x1, y1, x2, y2, o = {}) => {
  const a = Math.atan2(y2 - y1, x2 - x1), h = o.h || 12;
  return L(x1, y1, x2, y2, o) + PL([[x2 - h * Math.cos(a - 0.4), y2 - h * Math.sin(a - 0.4)], [x2, y2], [x2 - h * Math.cos(a + 0.4), y2 - h * Math.sin(a + 0.4)]], o);
};
const DEFS = `<defs><pattern id="hach" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="8" stroke="${INK}" stroke-width="1.2"/></pattern>
<pattern id="pont" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="1" fill="${INK}"/></pattern></defs>`;
const pranchas = [];
function rodapeEm(s) {
  const max = 150;
  if (s.length <= max) return T(40, H - 26, s, { s: 14, c: '#555' });
  const corte = s.lastIndexOf(' ', max);
  return T(40, H - 34, s.slice(0, corte), { s: 14, c: '#555' }) + T(40, H - 14, s.slice(corte + 1), { s: 14, c: '#555' });
}
function prancha(id, titulo, sub, corpo, rodape) {
  const s = [`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" font-family="Helvetica, Arial, sans-serif">`,
    DEFS, `<rect width="${W}" height="${H}" fill="#fff"/>`,
    T(40, 56, titulo, { s: 30, b: true }), T(40, 88, sub, { s: 18, c: '#333' }),
    corpo, L(40, H - 56, W - 40, H - 56, { c: CLARO, w: 1 }), rodapeEm(rodape), '</svg>'].join('\n');
  fs.writeFileSync(path.join(DIR, id + '.svg'), s);
  pranchas.push({ id, titulo });
}
const eixos = (x0, y0, x1, y1, rx, ry) => L(x0, y0, x1, y0, { w: 1.2 }) + L(x0, y0, x0, y1, { w: 1.2 }) + T(x1, y0 + 46, rx, { s: 15, a: 'end', c: '#333' }) + T(x0 - 8, y1 - 10, ry, { s: 15, c: '#333' });
let semente = 7;
const rnd = () => { semente = (semente * 1664525 + 1013904223) >>> 0; return semente / 4294967296; };

// ---------- dados da máquina ----------
const V = true, F = false;
function trilha(par, tMax, passo, mexer) {
  const s = sim(par); if (mexer) mexer(s);
  const am = []; let prox = 0;
  while (!s.ended && s.t < tMax) { s.step(); if (s.t >= prox) { am.push({ t: s.t, r: Math.sqrt(s.frac), v: s.obs.map(o => o.v), a: s.obs.map(o => ((o.phi % TAU) + TAU) % TAU) }); prox += passo; } }
  return { s, am };
}
const metade = trilha({ modes: [V, V, V, F, F, F] }, 6000, 0.25);

// ===== P01 Alpha e Omega =====
{
  let b = '';
  b += C(330, 470, 230, { w: 2 });
  b += T(330, 750, 'Alpha', { s: 30, a: 'middle', b: true }) + T(330, 782, 'o Todo, por fora: conhece todos os valores e mecanismos', { s: 16, a: 'middle' });
  b += C(870, 470, 230, { f: INK, w: 0 });
  semente = 11;
  for (let i = 0; i < 70; i++) { const r = 215 * Math.sqrt(rnd()), a = rnd() * TAU; b += C(870 + r * Math.cos(a), 470 + r * Math.sin(a), 3.2, { f: '#fff', w: 0 }); }
  b += T(870, 750, 'Omega', { s: 30, a: 'middle', b: true }) + T(870, 782, 'por dentro, cheio de fragmentos (f): cada um só tem valor', { s: 16, a: 'middle' });
  prancha('P01', 'Alpha e Omega', 'O Todo visto de fora é um só. Visto de dentro, é feito de fragmentos.', b, 'Do autor: imagens 1 e 2, texto A.1. Cada ponto branco é um fragmento f.');
}

// ===== P02 O DNA: uma anula a outra =====
{
  let b = '';
  const x0 = 80, x1 = 1140, yc = 450, A = 230, Tf = metade.s.t;
  const X = t => x0 + (x1 - x0) * t / Tf;
  const pm = [], pa = [];
  for (const a of metade.am) { const th = TAU * a.t / 60; pm.push([X(a.t), yc - A * a.r * Math.cos(th)]); pa.push([X(a.t), yc - A * a.r * Math.cos(th + PI)]); }
  b += L(x0, yc, x1, yc, { w: 3.5 });
  b += PL(pm, { w: 2.2 }) + PL(pa, { w: 2.2, d: '9 6' });
  for (let t = 15; t < Tf; t += 30) b += C(X(t), yc, 5, { f: '#fff', w: 1.5 });
  b += T(x0, yc - A - 20, 'matéria (linha cheia)', { s: 16 }) + T(x0, yc + A + 34, 'antimatéria (tracejada)', { s: 16 });
  b += T(x1, yc - 14, 'linha de Alpha: a soma é zero', { s: 16, a: 'end', b: true });
  b += T(x0, yc + A + 64, 'explosão: os dois no nível mais alto', { s: 15, c: '#333' }) + T(x1, yc + A + 64, `o Tubo fecha (${num(Tf, 0)} s)`, { s: 15, a: 'end', c: '#333' });
  b += T(600, 150, '○ cruzamento: uma fatia é cortada (duas por volta do relógio)', { s: 15, a: 'middle', c: '#333' });
  prancha('P02', 'O DNA: uma anula a outra', 'Matéria e antimatéria em oposição. Nenhuma fica completa; a soma das duas é sempre zero.', b, `Do autor: página 1, itens 1 e 2. Suposições S1, S2. Amplitude: a máquina, metade com força (o nível cai até o Tubo fechar).`);
}

// ===== P03 O relógio =====
{
  let b = '';
  const cx = 600, cy = 480, R = 290;
  b += `<path d="M ${cx} ${cy - R} A ${R} ${R} 0 0 1 ${cx} ${cy + R} Z" fill="url(#pont)" stroke="none"/>`;
  b += `<path d="M ${cx} ${cy - R} A ${R} ${R} 0 0 0 ${cx} ${cy + R} Z" fill="url(#hach)" fill-opacity="0.35" stroke="none"/>`;
  b += C(cx, cy, R, { w: 2.5 });
  for (let h = 0; h < 12; h++) { const a = h / 12 * TAU, s = Math.sin(a), c = -Math.cos(a); b += L(cx + (R - 18) * s, cy + (R - 18) * c, cx + R * s, cy + R * c, { w: 2 }); b += T(cx + (R + 30) * s, cy + (R + 30) * c + 7, String(h === 0 ? 12 : h), { s: 20, a: 'middle' }); }
  b += L(cx, cy, cx, cy - R + 40, { w: 7 }) + L(cx, cy, cx, cy + R - 40, { w: 7, d: '14 8' }) + C(cx, cy, 9, { f: INK, w: 0 });
  b += T(cx + 22, cy - R + 70, 'matéria no 12', { s: 18, b: true }) + T(cx + 22, cy + R - 50, 'antimatéria no 6', { s: 18, b: true });
  b += T(80, 300, '180°: giram juntas,', { s: 18 }) + T(80, 326, 'sempre em oposição.', { s: 18 }) + T(80, 352, 'Nunca no mesmo ponto.', { s: 18 });
  b += T(1120, 300, 'pontilhado: metade da matéria', { s: 15, a: 'end', c: '#333' }) + T(1120, 324, 'hachurado: metade da antimatéria', { s: 15, a: 'end', c: '#333' });
  prancha('P03', 'O relógio', 'O Tubo visto de frente. A leitura decidida pelo autor: 180°, uma anula a outra.', b, 'Do autor: página 1, item 3; D1 fechada em 180° (A.5). Provado no Z3: só 180° dá soma zero em todo instante (itens 11 a 14).');
}

// ===== P04 O Tubo de lado =====
{
  let b = '';
  const x0 = 90, x1 = 1110, yc = 460, R0 = 220, Tf = metade.s.t, k = 0.42;
  const X = t => x0 + (x1 - x0) * t / Tf;
  const rAt = t => { const i = Math.min(metade.am.length - 1, Math.max(0, Math.round(t / 0.25))); return metade.am[i].r; };
  for (let t = 15; t < Tf; t += 30) { const r = R0 * rAt(t); b += `<ellipse cx="${f1(X(t))}" cy="${yc}" rx="${f1(k * r)}" ry="${f1(r)}" fill="none" stroke="${CINZA}" stroke-width="1"/>`; }
  b += L(x0, yc, x1 + 30, yc, { w: 3 });
  const fita = (off, d) => {
    const fr = [], tr = []; let seg = [], atras = null, out = '';
    for (let t = 0; t <= Tf; t += 0.25) {
      const th = TAU * t / 60 + off, r = R0 * rAt(t), x = X(t) + k * r * Math.sin(th), y = yc - r * Math.cos(th), tras = Math.sin(th) < 0;
      if (atras !== null && tras !== atras) { out += PL(seg, atras ? { w: 1, c: CINZA, d } : { w: 2.4, d }); seg = [seg[seg.length - 1]]; }
      seg.push([x, y]); atras = tras;
    }
    return out + PL(seg, atras ? { w: 1, c: CINZA, d } : { w: 2.4, d });
  };
  b += fita(0, null) + fita(PI, '9 6');
  for (let n = 0; n * 60 <= Tf; n++) b += T(X(n * 60), yc + R0 + 60, n === 0 ? '12 h' : `12 h (+${n})`, { s: 14, a: 'middle', c: '#333' });
  b += T(x1 + 30, yc - 14, 'linha de Alpha', { s: 16, a: 'end', b: true });
  b += T(x0, 150, 'O DNA entra no relógio: as duas fitas giram em volta da linha de Alpha. Cada elipse é uma fatia.', { s: 16, c: '#333' });
  b += T(x0, 176, 'Parte da frente em traço forte, parte de trás em cinza. O raio encolhe até o Tubo fechar.', { s: 16, c: '#333' });
  prancha('P04', 'O Tubo', 'O DNA dentro do relógio: o mesmo Tubo, visto de lado.', b, 'Do autor: página 1, item 4. Suposições S1, S2, S6. Raio: a máquina, metade com força.');
}

// ===== P05 O Tubo por dentro: do eixo e da parede =====
{
  let b = '';
  const z0 = 0.22, turns = 6, kk = z => 1 / (1 + z / z0);
  const A = (z, a) => [330 + 230 * kk(z) * Math.sin(a), 470 - 230 * kk(z) * Math.cos(a)];
  const P = (z, a) => [870 + 210 * kk(z) * Math.sin(a), 260 + 210 * kk(z) * (1 - Math.cos(a))];
  const curva = (f, off) => { const p = []; for (let i = 0; i <= 900; i++) { const z = turns * i / 900; p.push(f(z, TAU * z + off)); } return p; };
  for (let j = 0; j <= 2 * turns; j++) { const q = kk(j / 2); b += C(330, 470, 230 * q, { c: CINZA, w: 0.8 }); b += C(870, 260 + 210 * q, 210 * q, { c: CINZA, w: 0.8 }); }
  b += PL(curva(A, 0), { w: 2 }) + PL(curva(A, PI), { w: 2, d: '8 5' }) + PL(curva(P, 0), { w: 2 }) + PL(curva(P, PI), { w: 2, d: '8 5' });
  b += C(330, 470, 5, { f: INK, w: 0 }) + C(870, 260, 5, { f: INK, w: 0 });
  b += T(330, 750, 'Do eixo', { s: 22, a: 'middle', b: true }) + T(330, 778, 'espirais hiperbólicas (onde a máquina olha hoje)', { s: 15, a: 'middle' });
  b += T(870, 750, 'Da parede', { s: 22, a: 'middle', b: true }) + T(870, 778, 'laços que passam pelo ponto de fuga (onde o fragmento está)', { s: 15, a: 'middle' });
  prancha('P05', 'O Tubo visto de dentro', 'Quem está dentro vê outra curva. Nenhuma das duas é a de Fibonacci.', b, 'Do autor: página 2, A.5, A.11. Geometria: perspectiva de uma hélice. Provado no Z3: a espiral não cresce por fator constante (item 22). D30 em aberto.');
}

// ===== P06 Para Alpha uma linha; para o fragmento, fatias =====
{
  let b = '';
  b += L(80, 250, 1120, 250, { w: 4 }) + T(80, 225, 'Para Alpha: o Tubo é uma linha', { s: 20, b: true });
  for (let i = 0; i <= 20; i++) b += L(80 + i * 52, 242, 80 + i * 52, 258, { w: 1.2 });
  b += L(600 - 104, 262, 300, 380, { c: CINZA, w: 1, d: '4 4' }) + L(600 + 104, 262, 900, 380, { c: CINZA, w: 1, d: '4 4' });
  b += T(80, 420, 'Para quem está dentro: as fatias, uma de cada vez', { s: 20, b: true });
  for (let i = -3; i <= 3; i++) { const x = 600 + i * 120, r = 150; b += `<ellipse cx="${x}" cy="610" rx="${i === 0 ? 70 : 52}" ry="${r}" fill="${i === 0 ? 'url(#pont)' : 'none'}" stroke="${i === 0 ? INK : CINZA}" stroke-width="${i === 0 ? 3 : 1}"${i > 0 ? ' stroke-dasharray="5 5"' : ''}/>`; }
  b += C(600 + 70 * Math.sin(1.1), 610 - 150 * Math.cos(1.1), 9, { f: INK, w: 0 });
  b += T(600, 790, 'agora: a fatia do momento', { s: 17, a: 'middle', b: true }) + T(250, 790, 'já passou', { s: 15, a: 'middle', c: '#333' }) + T(950, 790, 'ainda não', { s: 15, a: 'middle', c: '#333' });
  b += T(690, 470, 'o fragmento', { s: 15, c: '#333' });
  prancha('P06', 'As fatias: o Tubo continua Tubo', 'O mesmo processo visto de fora (uma linha) e de dentro (fatias cortadas o tempo todo).', b, 'Do autor: página 2, itens 6 e 7 (o desenho laranja). Suposição S1 e D8: duas fatias por volta do relógio.');
}

// ===== P07 Repouso, força e colisão (espaço-tempo) =====
{
  let b = '';
  const x0 = 120, y0 = 790, sx = 40, sy = 52, X = x => x0 + sx * x, Y = t => y0 - sy * t;
  b += eixos(x0, y0, 1120, 130, 'posição no perímetro (m)', 'tempo (s)');
  for (let t = 0; t <= 12; t += 2) b += T(x0 - 12, Y(t) + 5, String(t), { s: 13, a: 'end', c: '#555' });
  for (let x = 0; x <= 24; x += 4) b += T(X(x), y0 + 22, String(x), { s: 13, a: 'middle', c: '#555' });
  // repouso puro
  b += PL([[X(1), Y(0)], [X(1 + 0.1 * 12), Y(12)]], { w: 2.5, d: '3 6' });
  // força e um em repouso que vem no sentido oposto; regras do motor (S4, S5, perda 50 %)
  const e = Math.sqrt(0.5); let xa = 0, va = 0.1, xb = 16, vb = -0.1, bateu = false; const pa = [[X(xa), Y(0)]], pb = [[X(xb), Y(0)]]; let tc = 0;
  for (let t = 0; t < 12; t += 0.001) {
    if (va < 2) va = Math.min(2, va + 0.001);
    xa += va * 0.001; xb += vb * 0.001;
    if (!bateu && xa >= xb) { const u1 = va, u2 = vb; va = ((1 + e) * u1 + (1 - e) * u2) / 2; vb = ((1 - e) * u1 + (1 + e) * u2) / 2; bateu = true; tc = t; b += C(X(xa), Y(t), 8, { f: INK, w: 0 }); }
    if (Math.round(t * 1000) % 50 === 0) { pa.push([X(xa), Y(t)]); pb.push([X(xb), Y(t)]); }
  }
  b += PL(pa, { w: 3 }) + PL(pb, { w: 2.5, d: '10 5' });
  b += T(X(1.6), Y(11.4), 'repouso: MRU, linha reta', { s: 16 });
  b += T(X(3.2), Y(1.2), 'força: curva enquanto acelera (1,9 s), depois reta', { s: 16 });
  b += T(X(15.2), Y(tc) + 30, `colisão (${num(tc, 1)} s): os dois mudam`, { s: 16 }) + T(X(15.2), Y(tc) + 52, 'de rota pela resistência', { s: 16 });
  b += T(X(14.6), Y(11.6), 'quem estava em repouso segue com o empurrão', { s: 16 });
  prancha('P07', 'Repouso, força e colisão', 'Linha de cada fragmento no tempo. Reta = MRU. Só a aceleração e o choque entortam a linha.', b, 'Do autor: páginas 3 e 4, A.7, A.8. Suposições S4, S5 (perda 50 %, força 1 N, 1 kg). D26 em aberto: de onde vem o empurrão da força.');
}

// ===== P08 n = f(v) =====
{
  let b = '';
  const x0 = 140, y0 = 780, X = v => x0 + 430 * v, Y = n => y0 - 58 * n;
  b += eixos(x0, y0, X(2.2) + 20, Y(11) - 10, 'velocidade v (m/s)', 'voltas no perímetro por volta do relógio (n)');
  for (let n = 0; n <= 10; n += 2) b += T(x0 - 12, Y(n) + 5, String(n), { s: 13, a: 'end', c: '#555' });
  for (let v = 0; v <= 2; v += 0.5) b += T(X(v), y0 + 22, num(v, 1), { s: 13, a: 'middle', c: '#555' });
  b += PL([[X(0), Y(0)], [X(2.2), Y(11)]], { w: 2.5 });
  b += C(X(2), Y(10), 9, { f: INK, w: 0 }) + C(X(0.1), Y(0.5), 9, { f: INK, w: 0 });
  b += T(X(2) - 16, Y(10) - 18, 'n = f(2 m/s) = 10', { s: 18, a: 'end', b: true }) + T(X(0.1) + 18, Y(0.5) - 14, 'n = f(0,10 m/s) = 0,5', { s: 18, b: true });
  b += T(X(1.15), Y(4.2), 'n = v × 60 s ÷ 12 m', { s: 22, i: true });
  b += T(X(1.15), Y(3.4), 'medido na máquina: 9,98 e 0,50', { s: 16, c: '#333' });
  prancha('P08', 'O ponto observador: n = f(v)', 'Quanto mais rápido, mais voltas no perímetro em cada volta do relógio.', b, 'Do autor: página 4 ("n = f(2 m/s)", "n = f(0,10 m/s)", "n• = 60 s"). Suposição S9 e D3 (perímetro 12 m). Provado no Z3 (item 15); o perímetro não é fixado pelo caderno (item 16).');
}

// ===== P09 Encontros =====
{
  let b = '';
  const Pm = 12, dur = 60;
  const painel = (px, titulo, va, vb) => {
    let o = ''; const w = 320, h = 560, y0 = 780, X = x => px + w * x / Pm, Y = t => y0 - h * t / dur;
    o += `<rect x="${px}" y="${y0 - h}" width="${w}" height="${h}" fill="none" stroke="${INK}" stroke-width="1.2"/>`;
    let xa = 0, xb = Pm / 2, ra = null, sa = [], sb = [], enc = 0, ant = null, segs = '';
    for (let t = 0; t <= dur + 1e-9; t += 0.01) {
      const pa = ((xa + va * t) % Pm + Pm) % Pm, pb = ((xb + vb * t) % Pm + Pm) % Pm;
      let d = pa - pb; if (d > Pm / 2) d -= Pm; if (d < -Pm / 2) d += Pm;
      if (ant !== null && ant * d < 0 && Math.abs(d) < 2) { enc++; o += C(X(pa), Y(t), 5, { f: INK, w: 0 }); }
      ant = d;
      if (sa.length && Math.abs(pa - sa[sa.length - 1][2]) > Pm / 2) { segs += PL(sa, { w: 2 }); sa = []; }
      if (sb.length && Math.abs(pb - sb[sb.length - 1][2]) > Pm / 2) { segs += PL(sb, { w: 2, d: '7 5' }); sb = []; }
      sa.push([X(pa), Y(t), pa]); sb.push([X(pb), Y(t), pb]);
    }
    segs += PL(sa, { w: 2 }) + PL(sb, { w: 2, d: '7 5' });
    o = segs + o;
    o += T(px, y0 - h - 46, titulo, { s: 18, b: true }) + T(px, y0 - h - 20, `${enc} encontros em 60 s`, { s: 16 });
    return o;
  };
  b += painel(70, 'Sentidos opostos (2 e 0,1 m/s)', 2, -0.1);
  b += painel(440, 'Mesmo sentido (2 e 0,1 m/s)', 2, 0.1);
  b += painel(810, 'Mesmo sentido, mesma velocidade', 2, 2);
  b += T(70, 812, 'horizontal: o perímetro (12 m), desenrolado     vertical: 60 s, uma volta do relógio     ● encontro', { s: 15, c: '#333' });
  prancha('P09', 'Encontros', 'Sentidos opostos: n₁ + n₂ encontros. Mesmo sentido: n₁ − n₂. Iguais no mesmo sentido: nenhum.', b, 'Do autor: página 4, item 16 (modelos de colisão). Provado no Z3 (itens 17 a 19). Medido na máquina: 105 encontros em 600 s nos sentidos opostos.');
}

// ===== P10 A colisão: o filtro =====
{
  let b = '';
  const u1 = 2, u2 = -0.1, sc = 120, A0 = 400, D0 = 840;
  b += T(A0 + 60, 160, 'antes', { s: 20, a: 'middle', b: true }) + T(D0 + 60, 160, 'depois', { s: 20, a: 'middle', b: true });
  [[0, 'perda 0 %'], [0.5, 'perda 50 %'], [1, 'perda 100 %']].forEach(([pd, rot], i) => {
    const y = 270 + i * 190, e = Math.sqrt(1 - pd), v1 = ((1 + e) * u1 + (1 - e) * u2) / 2, v2 = ((1 - e) * u1 + (1 + e) * u2) / 2;
    b += T(40, y - 18, rot, { s: 18, b: true });
    b += T(40, y + 10, `soma ${num(u1 + u2, 2)} → ${num(v1 + v2, 2)}`, { s: 16 });
    b += T(40, y + 34, `diferença ${num(u1 - u2, 2)} → ${num(v1 - v2, 2)}`, { s: 16 });
    b += L(A0, y - 40, A0, y + 40, { c: CLARO, w: 1 }) + L(D0, y - 40, D0, y + 40, { c: CLARO, w: 1 });
    b += seta(A0, y - 14, A0 + sc * u1, y - 14, { w: 4 }) + seta(A0, y + 14, A0 + sc * u2, y + 14, { w: 4, d: '6 4', h: 8 });
    b += seta(D0, y - 14, D0 + sc * v1, y - 14, { w: 4 }) + (Math.abs(v2) > 0.02 ? seta(D0, y + 14, D0 + sc * v2, y + 14, { w: 4, d: '6 4', h: 8 }) : '');
  });
  b += T(40, 820, 'Seta cheia: f1. Tracejada: f2. A soma passa intacta; a diferença sai multiplicada por e = √(1 − perda).', { s: 16, c: '#333' });
  prancha('P10', 'A colisão: os valores passam pelo filtro', 'O mecanismo guarda a soma e encolhe a diferença. Só com perda total apaga quem tinha o quê.', b, 'Do autor: A.10 ("os valores descem pelos mecanismos e são filtrados"). Suposição S5. Provado no Z3: itens 1, 3, 33; com perda 100 % o filtro apaga (item 34).');
}

// ===== P11 Frio, morno e quente: onde os pares se encontram =====
{
  let b = '';
  const casos = [['frio e frio', 0.1, 0.1], ['quente e quente', 2, 2], ['quente e morno', 2, 1], ['quente e frio', 2, 0.1]];
  casos.forEach(([nome, a, c], i) => {
    const cx = 165 + i * 290, cy = 420, R = 115;
    b += C(cx, cy, R, { w: 1.5 });
    for (let h = 0; h < 12; h++) { const ang = h / 12 * TAU; b += L(cx + (R - 8) * Math.sin(ang), cy - (R - 8) * Math.cos(ang), cx + R * Math.sin(ang), cy - R * Math.cos(ang), { w: 1 }); }
    const pts = new Set();
    for (let k = 0; k < 60; k++) { const f = ((a * (0.5 + k) / (a + c)) % 1 + 1) % 1; const key = Math.round(f * 1000) % 1000; if (!pts.has(key)) { pts.add(key); const ang = f * TAU; b += C(cx + R * Math.sin(ang), cy - R * Math.cos(ang), 7, { f: INK, w: 0 }); } }
    b += T(cx, cy + R + 50, nome, { s: 19, a: 'middle', b: true }) + T(cx, cy + R + 76, `${num(a, a < 1 ? 1 : 0)} e ${num(c, c < 1 ? 1 : 0)} m/s`, { s: 15, a: 'middle', c: '#333' });
    b += T(cx, cy + R + 104, `${pts.size} ${pts.size === 1 ? 'ponto' : 'pontos'} de encontro, para sempre`, { s: 15, a: 'middle' });
  });
  b += T(40, 190, 'Cada círculo é o perímetro. Os pontos são todos os lugares onde dois fragmentos em sentidos opostos', { s: 16, c: '#333' });
  b += T(40, 214, 'chegam a se encontrar. O que decide quantos lugares é a razão entre as velocidades, não a rapidez.', { s: 16, c: '#333' });
  b += T(40, 790, 'Medido (6 fragmentos, 30 voltas, sem perda): todos frios 10 %, todos quentes 10 %, metade quente e metade fria 64 %,', { s: 15, c: '#333' });
  b += T(40, 812, 'todos diferentes 77 % das possibilidades testadas.', { s: 15, c: '#333' });
  prancha('P11', 'Frio, morno e quente', 'O fanatismo acelera. A diferença entre os fragmentos é o que abre lugares novos.', b, 'Do autor: A.6, A.7. Suposição S11 (possibilidade = par numa das 12 horas). Provado no Z3: itens 31 e 32. Medido: possibilidades.js.');
}

// ===== P12 A possibilidade (cópia da prancha já feita) =====
{
  const src = path.join(__dirname, 'possibilidade.svg');
  if (fs.existsSync(src)) { fs.copyFileSync(src, path.join(DIR, 'P12.svg')); pranchas.push({ id: 'P12', titulo: 'A possibilidade' }); }
}

// ===== P13 O choque único =====
{
  let b = '';
  const ch = trilha({ modes: [] }, 600, 1, s => { s.obs[0].v = 2; s.Etot = s.p.E0 + s.kinetic(); });
  const x0 = 130, y0 = 760, X = t => x0 + 1.6 * t, Y = v => y0 - 250 * (v + 0.3);
  b += eixos(x0, y0, X(600), Y(2.2), 'tempo (s)', 'velocidade de cada fragmento (m/s)');
  for (let v = 0; v <= 2; v += 0.5) b += T(x0 - 12, Y(v) + 5, num(v, 1), { s: 13, a: 'end', c: '#555' }) + L(x0 - 5, Y(v), x0, Y(v), { w: 1 });
  for (let t = 0; t <= 600; t += 100) b += T(X(t), y0 + 22, String(t), { s: 13, a: 'middle', c: '#555' });
  b += L(x0, Y(0), X(600), Y(0), { c: CLARO, w: 1 });
  for (let i = 0; i < 6; i++) b += PL(ch.am.map(a => [X(a.t), Y(a.v[i])]), i === 0 ? { w: 2.6 } : { w: 1.2, c: '#555' });
  const media = ch.am[0].v.reduce((p, q) => p + q, 0) / 6;
  b += L(x0, Y(media), X(600), Y(media), { w: 2, d: '10 6' });
  b += L(X(520), Y(0.72), X(520), Y(media) - 6, { w: 1, c: CINZA, d: '3 3' }) + T(X(600), Y(0.75), `todos tendem a ${num(media, 3)} m/s = choque ÷ 6, para sempre`, { s: 16, a: 'end', b: true });
  b += T(X(8), Y(2) - 12, 'f1 recebe um choque (2 m/s) uma vez só', { s: 16 });
  prancha('P13', 'O choque único', 'Um choque nunca se apaga: alinha todos. Mas se dilui: cada um fica com 1/N dele.', b, `Do autor: A.9 ("o choque para outros fragmentos é o suficiente para durar muito"). Medido na máquina: 6 fragmentos, perda 50 %, sobra ~15 % do movimento do choque. D28 em aberto.`);
}

// ===== P14 Quem fecha o Tubo =====
{
  let b = '';
  const x0 = 130, y0 = 760, X = t => x0 + 2.4 * t, Y = r => y0 - 560 * r;
  b += eixos(x0, y0, X(420), Y(1.08), 'tempo (s)', 'raio do Tubo (1 = o do início)');
  for (let r = 0; r <= 1; r += 0.25) b += T(x0 - 12, Y(r) + 5, num(r, 2), { s: 13, a: 'end', c: '#555' });
  for (let t = 0; t <= 400; t += 100) b += T(X(t), y0 + 22, String(t), { s: 13, a: 'middle', c: '#555' });
  const cen = [['todos com força', [V, V, V, V, V, V], { w: 3 }], ['metade com força', [V, V, V, F, F, F], { w: 2.5, d: '12 6' }], ['um com força', [V], { w: 2, d: '3 5' }], ['todos em repouso', [], { w: 1.5, c: CINZA }]];
  cen.forEach(([nome, modes, est], i) => {
    const tr = trilha({ modes }, 420, 1);
    b += PL(tr.am.map(a => [X(a.t), Y(a.r)]), est);
    const ult = tr.am[tr.am.length - 1];
    b += tr.s.ended ? T(X(ult.t) - 10, Y(ult.r) - 14, `${nome}: fecha em ${num(tr.s.t, 0)} s`, { s: 16, a: 'end', b: true })
      : T(X(420) - 4, Y(ult.r) + (i === 3 ? 22 : -10), nome, { s: 16, a: 'end', b: true });
  });
  b += T(X(130), Y(0.25), 'um com força: após 6000 s sobra 98,8 %; não fecha', { s: 15, c: '#333' });
  b += T(X(130), Y(0.25) + 24, 'todos com força no mesmo sentido: 0 colisões, raio intacto', { s: 15, c: '#333' });
  prancha('P14', 'Quem fecha o Tubo', 'O que gasta não é a força: é a diferença de velocidade entre os fragmentos.', b, 'Do autor: página 4, itens 15 a 17. Suposições S3 a S8 (motor atual: o raio cai com a energia gasta). Com o estoque de probabilidades (D16), o raio passa a cair pelas possibilidades testadas.');
}

// ===== P15 A visão do fragmento =====
{
  let b = '';
  const cx = 600, cy = 480, R = 320, fx = 380, fy = 360, a1 = 0.95, a2 = 1.35;
  const borda = a => { const dx = Math.cos(a), dy = Math.sin(a), px = fx - cx, py = fy - cy, B = px * dx + py * dy, Cc = px * px + py * py - R * R, s = -B + Math.sqrt(B * B - Cc); return [fx + s * dx, fy + s * dy]; };
  const [p1x, p1y] = borda(a1), [p2x, p2y] = borda(a2);
  b += `<path d="M ${fx} ${fy} L ${f1(p1x)} ${f1(p1y)} A ${R} ${R} 0 0 1 ${f1(p2x)} ${f1(p2y)} Z" fill="url(#hach)" fill-opacity="0.55" stroke="${INK}" stroke-width="2"/>`;
  b += C(cx, cy, R, { w: 2.5 });
  b += C(fx, fy, 10, { f: INK, w: 0 }) + T(fx - 18, fy - 18, 'f', { s: 24, a: 'end', i: true, b: true });
  b += T(cx + 40, cy + 20, 'o resto de Alpha: fora da vista', { s: 16, c: '#555' });
  b += T(40, 560, 'campo de visão:', { s: 17, b: true }) + T(40, 584, 'só a escala do fragmento', { s: 17, b: true });
  b += L(250, 566, fx + (566 - fy) / Math.tan(a2) + 8, 566, { w: 1, c: CINZA, d: '4 4' });
  b += T(cx, cy - R - 16, 'Alpha: o Todo', { s: 20, a: 'middle', b: true });
  prancha('P15', 'A visão do fragmento', 'Dentro de Alpha, o fragmento só enxerga a sua parte. O valor dele é limitado ao que vê.', b, 'Do autor: imagem 4, texto A.1. D14 em aberto: o campo de visão ainda não entra na máquina.');
}

// ===== P16 Valor e mecanismo =====
{
  let b = '';
  const ch = trilha({ modes: [] }, 600, 600, s => { s.obs[0].v = 2; s.Etot = s.p.E0 + s.kinetic(); });
  const ini = [2, -0.1, 0.1, -0.1, 0.1, -0.1], fim = ch.s.obs.map(o => o.v);
  const barras = (x, vals, rot) => {
    let o = L(x - 10, 520, x + 6 * 46 + 4, 520, { w: 1.2 });
    vals.forEach((v, i) => { const h = 150 * v, xx = x + i * 46; o += `<rect x="${xx}" y="${f1(Math.min(520, 520 - h))}" width="34" height="${f1(Math.max(2, Math.abs(h)))}" fill="${INK}"/>`; o += T(xx + 17, 560, 'f' + (i + 1), { s: 14, a: 'middle', c: '#333' }); });
    return o + T(x + 138, 620, rot, { s: 18, a: 'middle', b: true });
  };
  b += barras(90, ini, 'valor próprio (o início)');
  b += `<rect x="470" y="330" width="260" height="240" fill="url(#pont)" stroke="${INK}" stroke-width="2"/>`;
  b += T(600, 300, 'mecanismo', { s: 22, a: 'middle', b: true }) + T(600, 600, 'colisões, perda 50 %', { s: 16, a: 'middle', c: '#333' });
  b += seta(390, 450, 460, 450, { w: 3 }) + seta(740, 450, 810, 450, { w: 3 });
  b += barras(830, fim, 'valor destinado (filtrado)');
  b += T(90, 700, `soma no início ${num(ini.reduce((a, c) => a + c, 0), 2)}; soma no fim ${num(fim.reduce((a, c) => a + c, 0), 2)}: a soma passa intacta.`, { s: 17 });
  b += T(90, 728, `maior diferença no início ${num(Math.max(...ini) - Math.min(...ini), 2)}; no fim ${num(Math.max(...fim) - Math.min(...fim), 3)}: a diferença foi filtrada.`, { s: 17 });
  b += T(90, 756, 'Alpha conhece o início e o mecanismo, então sabe o fim. O fragmento só tem o próprio valor.', { s: 17 });
  prancha('P16', 'Valor e mecanismo', 'Os valores dados no início descem pelos mecanismos e são filtrados.', b, 'Do autor: A.10. Proposta minha para D11 (valor próprio e destinado), pendente. Medido na máquina: um choque em f1, 600 s. Provado no Z3: itens 1, 3, 33, 34.');
}

// ===== P17 O cone =====
{
  let b = '';
  const cx = 600, base = 700, topo = 190, Tf = metade.s.t, Rb = 330;
  const Y = t => base - (base - topo) * t / Tf, rAt = t => metade.am[Math.min(metade.am.length - 1, Math.round(t / 0.25))].r;
  const esq = [], dir = [];
  for (let t = 0; t <= Tf; t += 1) { esq.push([cx - Rb * rAt(t), Y(t)]); dir.push([cx + Rb * rAt(t), Y(t)]); }
  b += PL(esq.concat([[cx, topo - 40]]), { w: 2.5 }) + PL(dir.concat([[cx, topo - 40]]), { w: 2.5 });
  for (let t = 0; t < Tf; t += 15) { const r = Rb * rAt(t); b += `<ellipse cx="${cx}" cy="${f1(Y(t))}" rx="${f1(r)}" ry="${f1(r * 0.12)}" fill="none" stroke="${CINZA}" stroke-width="1"/>`; }
  b += `<ellipse cx="${cx}" cy="${base}" rx="${Rb}" ry="${f1(Rb * 0.12)}" fill="none" stroke="${INK}" stroke-width="2.5"/>`;
  b += `<ellipse cx="${cx}" cy="${base + 10}" rx="${Rb + 170}" ry="${f1((Rb + 170) * 0.14)}" fill="none" stroke="${INK}" stroke-width="1.2" stroke-dasharray="6 6"/>`;
  b += C(cx, topo - 40, 7, { f: INK, w: 0 });
  b += T(cx, topo - 60, `o Tubo fecha (${num(Tf, 0)} s): só aí o fragmento descansa`, { s: 18, a: 'middle', b: true });
  b += T(cx, base + 118, 'Alpha como Todo, em volta', { s: 18, a: 'middle' });
  b += T(cx + Rb + 30, Y(Tf * 0.25), 'cada anel: uma fatia', { s: 16, c: '#333' });
  b += T(cx - Rb - 30, Y(Tf * 0.25), 'tempo ↑', { s: 18, a: 'end' });
  prancha('P17', 'O cone', 'O raio de cada fatia é função do tempo: o Tubo estreita até fechar.', b, 'Do autor: imagem 3, A.6 ("só descansa após a finalização do Todo"). Suposição S6: raio pela energia (com D16, pelas possibilidades). Raio: a máquina, metade com força.');
}

// ===== P18 Esfria e esquenta (página 3) =====
{
  let b = '';
  b += seta(200, 520, 200, 190, { w: 3 }) + seta(200, 560, 200, 800, { w: 3, d: '10 6' });
  b += T(230, 220, 'ausência sobe', { s: 20, b: true }) + T(230, 248, 'esfria  ·  positivo (+)', { s: 18 }) + T(230, 274, 'menos choques', { s: 16, c: '#333' });
  b += T(230, 760, 'presença desce', { s: 20, b: true }) + T(230, 788, 'esquenta  ·  negativo (−)', { s: 18 }) + T(230, 734, 'mais choques e colisões', { s: 16, c: '#333' });
  b += C(200, 540, 10, { f: INK, w: 0 }) + T(230, 546, 'repouso: ficar ou sair', { s: 17 });
  const jan = []; let c0 = 0, k = 1;
  { const s = sim({ modes: [V, V, V, V, V, V] }); let prox = 10; while (!s.ended) { s.step(); if (s.t >= prox) { jan.push({ t: prox, c: s.collisions - c0, r: s.frac }); c0 = s.collisions; prox += 10; } } }
  const x0 = 620, y0 = 780, bw = 40;
  b += L(x0, y0, x0 + jan.length * (bw + 6) + 10, y0, { w: 1.2 });
  jan.forEach((j, i) => { const h = 6 * j.c; b += `<rect x="${x0 + 8 + i * (bw + 6)}" y="${y0 - h}" width="${bw}" height="${h}" fill="${INK}"/>`; b += T(x0 + 8 + i * (bw + 6) + bw / 2, y0 - h - 8, String(j.c), { s: 13, a: 'middle' }); b += T(x0 + 8 + i * (bw + 6) + bw / 2, y0 + 20, String(j.t), { s: 12, a: 'middle', c: '#555' }); });
  b += T(x0, 180, 'Na máquina (todos com força):', { s: 18, b: true }) + T(x0, 206, 'colisões a cada 10 s enquanto o Tubo fecha', { s: 16 });
  b += T(x0 + 8, y0 + 44, 'tempo (s)', { s: 14, c: '#333' });
  prancha('P18', 'Esfria e esquenta', 'O repouso tratado pela ausência: quanto mais quente, mais choques. Na máquina, a fatia esquenta até fechar.', b, 'Do autor: página 3, itens 8 a 10. Física: "mais quente, mais colisões" é teoria cinética (Boltzmann); D10 em aberto. Medido na máquina, todos com força.');
}

// ===== P19 Alpha e Omega sobre a onda (imagem 5) =====
{
  let b = '';
  const onda = (y0, x0, x1) => {
    const e = [], m = []; for (let x = x0; x <= x1; x += 2) { const th = (x - x0) / 60 * TAU / 2; e.push([x, y0 - 80 * Math.sin(th)]); m.push([x + 26 * Math.sin(th), y0 + 26 * Math.sin(th)]); }
    return L(x0 - 20, y0, x1 + 30, y0, { w: 1.2, c: CINZA }) + PL(m, { w: 1.6, d: '6 4' }) + PL(e, { w: 2.2 });
  };
  b += onda(300, 340, 1100) + `<ellipse cx="300" cy="300" rx="44" ry="150" fill="none" stroke="${INK}" stroke-width="3"/>`;
  b += T(60, 180, 'alpha', { s: 26, b: true }) + T(60, 206, 'um anel: o Todo inteiro', { s: 15, c: '#333' });
  b += onda(640, 240, 1080);
  for (let i = 0; i < 9; i++) b += `<ellipse cx="${260 + i * 100}" cy="640" rx="36" ry="125" fill="none" stroke="${INK}" stroke-width="1.6"/>`;
  b += C(560 + 36 * Math.sin(2.2), 640 - 125 * Math.cos(2.2), 10, { f: INK, w: 0 }) + T(586, 790, 'f (pessoas)', { s: 18, b: true });
  b += T(60, 520, 'omega', { s: 26, b: true }) + T(60, 546, 'muitos anéis: as fatias', { s: 15, c: '#333' });
  b += T(1080, 410, 'linha cheia: campo E (vertical)   tracejada: campo B (horizontal)', { s: 15, a: 'end', c: '#333' });
  prancha('P19', 'Alpha e Omega sobre a onda', 'Para alpha, um anel em volta da onda inteira. Para omega, um anel em cada fatia, e o fragmento num deles.', b, 'Do autor: imagem 5 (diagrama de onda eletromagnética editado). A onda real tem E e B a 90°; a 180° do relógio (D1) é outra coisa: não confundir.');
}

// ===== P20 O que se conta de dentro =====
{
  let b = '';
  const s = sim({ modes: [V, V, V, V, V, V] }); const jan = []; let prox = 10, l0 = 0, c0 = 0;
  while (!s.ended) { s.step(); if (s.t >= prox) { jan.push({ t: prox, r: s.frac, v: (s.obs[0].laps - l0) * 6, c: s.collisions - c0 }); l0 = s.obs[0].laps; c0 = s.collisions; prox += 10; } }
  const x0 = 200, X = t => x0 + 8 * t;
  const faixa = (y0, h, vals, max, rot, fmt) => {
    let o = L(x0, y0, X(115), y0, { w: 1 }) + T(x0 - 60, y0 - h - 24, rot, { s: 16, b: true });
    o += PL(vals.map((v, i) => [X(jan[i].t), y0 - h * v / max]), { w: 2.5 });
    vals.forEach((v, i) => { o += C(X(jan[i].t), y0 - h * v / max, 4.5, { f: INK, w: 0 }); if (i === 0 || i === vals.length - 1) o += T(X(jan[i].t), y0 - h * v / max - 12, fmt(v), { s: 14, a: 'middle' }); });
    return o;
  };
  b += faixa(330, 170, jan.map(j => j.r * 100), 100, 'reserva (só Alpha vê)', v => num(v, 1) + ' %');
  b += faixa(560, 170, jan.map(j => j.v), 30, 'voltas de f1 por volta do relógio', v => num(v, 1));
  b += faixa(790, 170, jan.map(j => j.c), 90, 'colisões a cada 10 s', v => String(v));
  b += T(X(115), 812, 'tempo (s), todos com força', { s: 14, a: 'end', c: '#333' });
  prancha('P20', 'O que o fragmento conta de dentro', 'Na máquina atual, a queda da reserva aparece de dentro: mais voltas e mais colisões.', b, 'Do autor: A.5, A.6 ("de dentro é impossível notar"; D17 fechada: não nota). A máquina ainda contradiz isso: falta a regra (a velocidade encolher com o perímetro, Z3 item 30).');
}

// ===== P21 A física de referência =====
{
  let b = '';
  const pan = (px, py, tit) => `<rect x="${px}" y="${py}" width="540" height="330" fill="none" stroke="${CLARO}" stroke-width="1"/>` + T(px + 16, py + 28, tit, { s: 18, b: true });
  // Newton
  let px = 40, py = 120;
  b += pan(px, py, 'Newton: tempo absoluto');
  for (let i = 0; i < 5; i++) b += L(px + 20, py + 80 + i * 55, px + 520, py + 80 + i * 55, { c: CLARO, w: 1 });
  b += L(px + 120, py + 300, px + 120, py + 60, { w: 2.5 }) + T(px + 128, py + 70, 'repouso', { s: 14 });
  b += L(px + 200, py + 300, px + 330, py + 60, { w: 2.5 }) + T(px + 300, py + 100, 'sem força: reta', { s: 14, a: 'end' });
  const cv = []; for (let t = 0; t <= 1; t += 0.02) cv.push([px + 360 + 150 * t * t, py + 300 - 240 * t]); b += PL(cv, { w: 2.5, d: '8 5' }) + T(px + 515, py + 100, 'com força: curva', { s: 14, a: 'end' });
  b += T(px + 30, py + 318, 'linhas cinzas: o mesmo instante para todos', { s: 13, c: '#555' });
  // Relatividade restrita
  px = 620;
  b += pan(px, py, 'Einstein (1905): cone de luz');
  const ex = px + 270, ey = py + 195;
  b += `<path d="M ${ex} ${ey} L ${ex - 120} ${ey - 120} L ${ex + 120} ${ey - 120} Z" fill="url(#pont)" stroke="none"/>` + `<path d="M ${ex} ${ey} L ${ex - 120} ${ey + 120} L ${ex + 120} ${ey + 120} Z" fill="url(#hach)" fill-opacity="0.3" stroke="none"/>`;
  b += L(ex - 125, ey - 125, ex + 125, ey + 125, { w: 2 }) + L(ex + 125, ey - 125, ex - 125, ey + 125, { w: 2 }) + C(ex, ey, 6, { f: INK, w: 0 });
  b += L(ex - 240, ey, ex + 240, ey, { w: 1.5, c: CINZA }) + L(ex - 240, ey + 60, ex + 240, ey - 60, { w: 1.5, d: '6 5' });
  b += T(ex, ey - 130, 'futuro', { s: 14, a: 'middle' }) + T(ex, ey + 146, 'passado', { s: 14, a: 'middle' }) + T(ex + 250, ey + 26, '"agora" de quem está parado', { s: 12, a: 'end', c: '#555' }) + T(ex + 250, ey - 70, '"agora" de quem se move', { s: 12, a: 'end', c: '#555' });
  // Relatividade geral
  px = 40; py = 490;
  b += pan(px, py, 'Einstein (1915): gravidade é geometria');
  const mx = px + 300;
  b += L(mx, py + 310, mx, py + 50, { w: 6 }) + T(mx + 10, py + 60, 'massa', { s: 14 });
  [[-200, 230], [-120, 150], [120, 230], [200, 150]].forEach(([dx, dy]) => { const cx = mx + dx, cy = py + dy, tilt = -Math.sign(dx) * (80 / Math.abs(dx)) * 18; b += L(cx, cy, cx - 22 + tilt, cy - 26, { w: 1.5 }) + L(cx, cy, cx + 22 + tilt, cy - 26, { w: 1.5 }); });
  const g1 = [], g2 = []; for (let t = 0; t <= 1; t += 0.02) { g1.push([mx - 230 + 200 * t * t, py + 300 - 240 * t]); g2.push([mx + 230 - 200 * t * t, py + 300 - 240 * t]); }
  b += PL(g1, { w: 2, d: '8 5' }) + PL(g2, { w: 2, d: '8 5' }) + T(px + 30, py + 318, 'cones inclinam para a massa; corpos livres caem sem força (geodésicas)', { s: 13, c: '#555' });
  // Quântica
  px = 620;
  b += pan(px, py, 'Mecânica quântica: a medição');
  const qx = px + 200, qy = py + 300;
  const reg = (x, y, h, lar) => { const e = [], d = []; for (let t = 0; t <= 1; t += 0.05) { e.push([x - lar * Math.sqrt(t), y - h * t]); d.push([x + lar * Math.sqrt(t), y - h * t]); } return `<path d="M ${e.map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L ')} L ${d.slice().reverse().map(p => f1(p[0]) + ' ' + f1(p[1])).join(' L ')} Z" fill="url(#hach)" fill-opacity="0.45" stroke="${INK}" stroke-width="1.5"/>`; };
  b += reg(qx, qy, 130, 110) + L(qx - 140, qy - 130, qx + 140, qy - 130, { w: 1.5, c: CINZA, d: '4 4' }) + C(qx + 50, qy - 130, 7, { f: INK, w: 0 }) + reg(qx + 50, qy - 130, 120, 90);
  b += T(qx + 150, qy - 124, 'medição: um resultado só', { s: 13 }) + T(px + 30, py + 318, 'a região onde pode estar se alarga; medir dá um ponto e ela recomeça dali', { s: 13, c: '#555' });
  prancha('P21', 'A física de referência', 'Os quatro desenhos da seção 6.3, no mesmo formato: espaço na horizontal, tempo na vertical.', b, 'Física estabelecida (PROMPT, seção 4). Serve para pôr Alpha e os fragmentos nos mesmos eixos e ver em qual estrutura o modelo se encaixa.');
}

// ===== P22 A aniquilação vira luz =====
{
  let b = '';
  const cx = 600, cy = 470;
  b += C(cx - 300, cy, 40, { w: 2.5 }) + T(cx - 300, cy + 9, '+', { s: 34, a: 'middle', b: true }) + T(cx - 300, cy + 76, 'antimatéria', { s: 16, a: 'middle' });
  b += C(cx + 300, cy, 40, { f: INK, w: 0 }) + T(cx + 300, cy + 11, '−', { s: 34, a: 'middle', b: true, c: '#fff' }) + T(cx + 300, cy + 76, 'matéria', { s: 16, a: 'middle' });
  b += seta(cx - 250, cy, cx - 70, cy, { w: 3 }) + seta(cx + 250, cy, cx + 70, cy, { w: 3 });
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; b += L(cx + 14 * Math.cos(a), cy + 14 * Math.sin(a), cx + 36 * Math.cos(a), cy + 36 * Math.sin(a), { w: 2 }); }
  const foton = (sgn) => { const p = []; for (let s = 50; s <= 250; s += 2) p.push([cx + sgn * s * 0.35 + 9 * Math.sin(s / 8) * 0.94, cy - sgn * s * 0.94 + 9 * Math.sin(s / 8) * 0.35 * sgn]); return PL(p, { w: 2.2 }); };
  b += foton(1) + foton(-1);
  b += T(cx + 110, cy - 236, 'fóton (511 keV)', { s: 17, b: true }) + T(cx - 110, cy + 262, 'fóton (511 keV)', { s: 17, a: 'end', b: true });
  b += T(cx + 160, cy - 120, 'os dois saem a 180°', { s: 16 }) + T(cx - 160, cy + 140, 'a carga se anula (+1 − 1 = 0)', { s: 16, a: 'end' });
  b += T(60, 790, 'No início do universo quase tudo se aniquilou: sobrou ~1 partícula de matéria para 1,6 bilhão de fótons,', { s: 15, c: '#333' });
  b += T(60, 812, 'e essa luz ainda é medida (radiação cósmica de fundo, 2,7 K).', { s: 15, c: '#333' });
  prancha('P22', 'A aniquilação vira luz', 'O que se anula é o sinal, não a energia: ela sai inteira como luz.', b, 'Física estabelecida (elétron + pósitron → dois fótons; é o exame PET). Do autor: A.5 ("vira luz"). D18 em aberto: a luz fica no Tubo ou vai para o Todo?');
}

// ---------- álbum e folha de contato ----------
pranchas.sort((a, b) => a.id.localeCompare(b.id));
fs.writeFileSync(path.join(DIR, 'album.html'), `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Projeto Tubo: ilustrações</title>
<style>@page{size:1200px 900px;margin:0}body{margin:0;background:#fff}img{display:block;width:1200px;height:900px;page-break-after:always;object-fit:contain}</style></head><body>
${pranchas.map(p => `<img src="${p.id}.svg" alt="${esc(p.titulo)}">`).join('\n')}
</body></html>`);
fs.writeFileSync(path.join(DIR, 'contato.html'), `<!doctype html><html><head><meta charset="utf-8"><style>body{margin:0;background:#fff;display:grid;grid-template-columns:repeat(4,400px);gap:6px}img{width:400px;height:300px;border:1px solid #ccc}</style></head><body>
${pranchas.map(p => `<img src="${p.id}.svg">`).join('\n')}</body></html>`);
console.log(pranchas.length + ' pranchas: ' + pranchas.map(p => p.id).join(' '));
