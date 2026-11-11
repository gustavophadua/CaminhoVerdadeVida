// Desenha "a possibilidade" a partir da própria máquina (metade com força, padrão).
// Uso: node gerar-possibilidade.js maquina-do-tubo.html  -> possibilidade.svg
// Suposição S11 (pendente, D20): possibilidade = um par de fragmentos se encontrar numa das 12 horas.
// Vista de Alpha: horizontal = posição no perímetro (desenrolado), vertical = tempo subindo,
// largura = raio do Tubo (o cone). De dentro, o fragmento não nota o estreitamento (D17).
const fs = require('fs'), vm = require('vm');
const html = fs.readFileSync(process.argv[2] || 'maquina-do-tubo.html', 'utf8');
const m = html.match(/\/\* MOTOR-INICIO \*\/([\s\S]*?)\/\* MOTOR-FIM \*\//);
const ctx = {}; vm.createContext(ctx); vm.runInContext(m[1] + '\nthis.makeSim = makeSim;', ctx);
const TAU = Math.PI * 2, H = 12;
const s = ctx.makeSim({ E0: 800, P0: 12, Tclock: 60, phase: 180, N: 6, vRep: 0.1, vFor: 2, force: 1, loss: 0.5, alternate: true, modes: [true, true, true, false, false, false] });
const n = s.obs.length, amostras = [], eventos = [], visto = new Map();
let prox = 0;
while (!s.ended && s.t < 6000) {
  const antes = s.rel.slice(); s.step();
  let k = 0;
  for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++, k++) {
    const was = antes[k], now = s.rel[k];
    if (was * now < 0 && Math.abs(was) < 1.5 && Math.abs(now) < 1.5) {
      const ang = ((s.obs[i].phi % TAU) + TAU) % TAU, hora = Math.round(ang / TAU * H) % H, chave = k * H + hora;
      const nova = !visto.has(chave); if (nova) visto.set(chave, s.t);
      eventos.push({ t: s.t, ang, nova, r: Math.sqrt(s.frac) });
    }
  }
  if (s.t >= prox) { amostras.push({ t: s.t, r: Math.sqrt(s.frac), a: s.obs.map(o => ((o.phi % TAU) + TAU) % TAU) }); prox += 0.25; }
}
const tFim = s.t;
// ---- desenho ----
const W = 1400, HH = 1600, cx = 560, base = 1480, topo = 270, larg = 900;
const Y = t => base - (base - topo) * t / tFim;
const X = (ang, r) => cx + (ang / TAU - 0.5) * larg * r;
const out = [];
out.push(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${HH}" viewBox="0 0 ${W} ${HH}" font-family="Helvetica, Arial, sans-serif">`);
out.push(`<rect width="${W}" height="${HH}" fill="#fff"/>`);
// contorno do cone e colunas das 12 horas
for (let h = 0; h <= H; h++) {
  const pts = amostras.filter((_, q) => q % 8 === 0).map(a => `${X(h / H * TAU, a.r).toFixed(1)},${Y(a.t).toFixed(1)}`);
  const borda = h === 0 || h === H;
  out.push(`<polyline points="${pts.join(' ')} ${cx},${topo - 40}" fill="none" stroke="#000" stroke-width="${borda ? 2 : 0.5}" ${borda ? '' : 'stroke-dasharray="2 6"'}/>`);
}
// linhas dos fragmentos (quebra quando dá a volta no perímetro)
for (let i = 0; i < n; i++) {
  let seg = [], ant = null;
  const fecha = () => { if (seg.length > 1) out.push(`<polyline points="${seg.join(' ')}" fill="none" stroke="#000" stroke-opacity="${i < 3 ? 0.22 : 0.6}" stroke-width="${i < 3 ? 0.7 : 1.2}"/>`); seg = []; };
  for (const a of amostras) {
    const ang = a.a[i];
    if (ant !== null && Math.abs(ang - ant) > Math.PI) fecha();
    seg.push(`${X(ang, a.r).toFixed(1)},${Y(a.t).toFixed(1)}`); ant = ang;
  }
  fecha();
}
// encontros: possibilidade nova = ponto cheio; repetida = anel vazio
for (const e of eventos) {
  const x = X(e.ang, e.r).toFixed(1), y = Y(e.t).toFixed(1);
  out.push(e.nova ? `<circle cx="${x}" cy="${y}" r="6" fill="#000"/>` : `<circle cx="${x}" cy="${y}" r="2.4" fill="#fff" stroke="#000" stroke-opacity="0.55" stroke-width="0.8"/>`);
}
// fechamento
out.push(`<circle cx="${cx}" cy="${topo - 40}" r="7" fill="#000"/>`);
out.push(`<text x="${cx}" y="${topo - 62}" font-size="22" text-anchor="middle">o Tubo fecha: ${tFim.toFixed(0)} s</text>`);
out.push(`<text x="${cx}" y="${base + 40}" font-size="22" text-anchor="middle">início: perímetro inteiro (Alpha como Todo)</text>`);
for (const [h, rot] of [[0, '12 h'], [3, '3 h'], [6, '6 h'], [9, '9 h'], [12, '12 h']]) out.push(`<text x="${X(h / H * TAU, 1).toFixed(1)}" y="${base + 14}" font-size="15" text-anchor="middle" dy="0">${rot}</text>`);
// quadro das 180 possibilidades em três momentos
const cel = 13, gx = 1080;
const momentos = [60, 180, [...visto.values()].reduce((a, b) => Math.max(a, b), 0)];
momentos.forEach((tm, q) => {
  const gy = 330 + q * 360, feitos = [...visto.values()].filter(t => t <= tm + 1e-9).length;
  out.push(`<text x="${gx}" y="${gy - 18}" font-size="18">${tm.toFixed(0)} s: ${feitos} de 180 (${(100 * feitos / 180).toFixed(0)} %)</text>`);
  for (let k = 0; k < 15; k++) for (let h = 0; h < H; h++) {
    const t0 = visto.get(k * H + h), cheio = t0 !== undefined && t0 <= tm + 1e-9;
    out.push(`<rect x="${gx + h * (cel + 3)}" y="${gy + k * (cel + 3)}" width="${cel}" height="${cel}" fill="${cheio ? '#000' : '#fff'}" stroke="#000" stroke-width="0.8"/>`);
  }
});
out.push(`<text x="${gx}" y="${330 + 3 * 360 - 20}" font-size="15">colunas: as 12 horas</text>`);
out.push(`<text x="${gx}" y="${330 + 3 * 360 + 2}" font-size="15">linhas: os 15 pares de fragmentos</text>`);
// legenda
out.push(`<text x="40" y="50" font-size="30" font-weight="bold">A possibilidade</text>`);
out.push(`<text x="40" y="84" font-size="18">Uma possibilidade é um encontro: dois fragmentos no mesmo ponto, numa das 12 horas (suposição S11).</text>`);
out.push(`<text x="40" y="108" font-size="18" xml:space="preserve">●  possibilidade nova        ○  encontro repetido        linhas: o caminho de cada fragmento        vista de Alpha: o cone estreita até fechar</text>`);
out.push(`</svg>`);
fs.writeFileSync('possibilidade.svg', out.join('\n'));
console.log('fecha em', tFim.toFixed(1), 's;', eventos.length, 'encontros;', visto.size, 'possibilidades;', eventos.filter(e => e.nova).length, 'novas;', momentos.map(t => t.toFixed(0)).join(', '));
