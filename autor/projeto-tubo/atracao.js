// Protótipo SEPARADO do motor: a força de atração que o autor chutou (A.7, 10/11/2026).
// Uso: node atracao.js
// SUPOSIÇÕES (minhas, para o autor decidir):
//  S12. A fatia vira plano (2D). O fanático F anda com força num círculo grande (raio 6, 2 m/s) e não é desviado.
//  S13. Atração do tipo gravidade: aceleração = G M / d^2 rumo a F (suavizada perto de 0). M = 20, os outros têm massa 1
//       e também se atraem entre si.
//  S14. Os em repouso não fazem força: começam a 0,1 m/s em linha reta (MRU) e só mudam por atração ou colisão.
//       Colisão com F: a velocidade de aproximação volta multiplicada por e = raiz(1 - perda).
// "Preso a F" = ficou a menos de 1,5 m de F nos últimos 100 s inteiros. Desses, "grudado" = mais da metade
// desse tempo encostado em F; "em órbita" = o resto (gira em volta sem encostar o tempo todo).
const TAU = Math.PI * 2, DT = 1 / 240, TMAX = 600, RF = 6, VF = 2, M = 20, EPS = 0.3, CONTATO = 0.4, PERTO = 1.5;
function rodar(G, perda, semente) {
  let s = semente >>> 0;
  const rnd = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const e = Math.sqrt(1 - perda), w = VF / RF;
  const fr = [];
  for (let i = 0; i < 5; i++) {
    const r = 8 * Math.sqrt(rnd()), a = rnd() * TAU, d = rnd() * TAU;
    fr.push({ x: r * Math.cos(a), y: r * Math.sin(a), vx: 0.1 * Math.cos(d), vy: 0.1 * Math.sin(d), perto: 0, colado: 0, col: 0, fora: false });
  }
  const acel = (t) => {
    const fx = RF * Math.cos(w * t), fy = RF * Math.sin(w * t);
    for (const p of fr) {
      let dx = fx - p.x, dy = fy - p.y, d2 = dx * dx + dy * dy + EPS * EPS, k = G * M / (d2 * Math.sqrt(d2));
      p.ax = k * dx; p.ay = k * dy;
      for (const q of fr) if (q !== p) {
        dx = q.x - p.x; dy = q.y - p.y; d2 = dx * dx + dy * dy + EPS * EPS; k = G / (d2 * Math.sqrt(d2));
        p.ax += k * dx; p.ay += k * dy;
      }
    }
  };
  let t = 0; acel(t);
  while (t < TMAX) {
    for (const p of fr) { p.vx += p.ax * DT / 2; p.vy += p.ay * DT / 2; p.x += p.vx * DT; p.y += p.vy * DT; }
    t += DT; acel(t);
    const fx = RF * Math.cos(w * t), fy = RF * Math.sin(w * t), fvx = -VF * Math.sin(w * t), fvy = VF * Math.cos(w * t);
    for (const p of fr) {
      p.vx += p.ax * DT / 2; p.vy += p.ay * DT / 2;
      const dx = p.x - fx, dy = p.y - fy, d = Math.hypot(dx, dy);
      if (d < CONTATO) {
        const nx = dx / d, ny = dy / d, vn = (p.vx - fvx) * nx + (p.vy - fvy) * ny;
        if (vn < 0) { p.vx -= (1 + e) * vn * nx; p.vy -= (1 + e) * vn * ny; if (vn < -0.02) p.col++; }
      }
      p.perto = d < PERTO ? p.perto + DT : 0;
      if (t > TMAX - 100 && d < CONTATO * 1.05) p.colado += DT;
      if (Math.hypot(p.x, p.y) > 60) p.fora = true;
    }
  }
  return fr;
}
console.log('5 fragmentos em repouso + 1 fanático, 600 s, 20 sorteios por linha (100 fragmentos)');
console.log('caso'.padEnd(30) + 'em órbita  grudado   fugiram   colisões por fragmento');
for (const [nome, G, perda] of [['sem atração, perda 50 %', 0, 0.5], ['atração, colisão sem perda', 1, 0], ['atração, perda 50 %', 1, 0.5], ['atração, perda 90 %', 1, 0.9]]) {
  let orb = 0, gru = 0, fug = 0, col = 0, n = 0;
  for (let k = 0; k < 20; k++) for (const p of rodar(G, perda, 20261110 + k)) { n++; if (p.perto >= 100) { if (p.colado > 50) gru++; else orb++; } if (p.fora) fug++; col += p.col; }
  console.log(nome.padEnd(30) + String(orb).padStart(6) + String(gru).padStart(10) + String(fug).padStart(10) + (col / n).toFixed(1).padStart(16));
}
