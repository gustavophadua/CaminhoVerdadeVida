# As soluções que a matemática e a física dão para as equações sem solução (equacoes.md), conferidas no Z3.
# Uso: python -I -X utf8 -B solucoes-z3.py
# "EXISTE" = a forma corrigida tem solução (o Z3 achou números). "PROVADO" = vale para todos os números.
# "SEM SOLUÇÃO" = continua impossível (usado só para mostrar o que NÃO se pode juntar).
from z3 import Reals, Real, Ints, Int, Solver, And, Or, Not, RealVal, unsat, sat

res = []
def existe(num, nome, eq, restr):
    s = Solver(); s.set('timeout', 60000); s.add(*restr); r = s.check()
    if r == sat:
        m = s.model(); res.append((num, nome, eq, 'EXISTE', ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()))))
    elif r == unsat: res.append((num, nome, eq, 'SEM SOLUÇÃO', ''))
    else: res.append((num, nome, eq, 'SEM RESPOSTA', str(s.reason_unknown())))
def provar(num, nome, eq, hip, tese):
    s = Solver(); s.set('timeout', 60000); s.add(*hip); s.add(Not(tese)); r = s.check()
    if r == unsat: res.append((num, nome, eq, 'PROVADO', ''))
    elif r == sat:
        m = s.model(); res.append((num, nome, eq, 'CONTRAEXEMPLO', ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()))))
    else: res.append((num, nome, eq, 'SEM RESPOSTA', str(s.reason_unknown())))

# ---- E1 -> Euler: 180° anula; 90° são os dois eixos de uma mesma rotação ----
c, s_ = Reals('c s')
circ = [c * c + s_ * s_ == 1]
provar('E1a', 'A 180° a soma é zero em todo instante (interferência destrutiva)', 'cos θ + cos(θ + 180°) = 0', circ, c + (0 - c) == 0)
provar('E1b', 'A 90° não anula: vira uma onda só, de amplitude √2, girada 45° (Euler: cos θ + i sen θ = e^{iθ})',
       '(cos θ − sen θ)² + (cos θ + sen θ)² = 2, logo (cos θ − sen θ, cos θ + sen θ) ÷ √2 é de novo um ponto do relógio',
       circ, (c - s_) * (c - s_) + (c + s_) * (c + s_) == 2)

# ---- E2 -> espiral logarítmica: o Tubo de raio exponencial visto por Alpha (de longe, ao longo do eixo) ----
Rm, q, k, r0, r1, r2 = Reals('Rm q k r0 r1 r2')
existe('E2', 'Fibonacci volta se o raio do Tubo cair por fator fixo a cada volta e quem olha for Alpha, de fora (projeção sem perspectiva)',
       'r_k = Rm · q^k, com r_0 = k·r_1 e r_1 = k·r_2 (k = 1/q; a áurea é k = φ⁴ ≈ 6,85 por volta)',
       [Rm > 0, q > 0, q < 1, r0 == Rm, r1 == Rm * q, r2 == Rm * q * q, k > 0, r0 == k * r1, r1 == k * r2, k == RealVal('685/100')])

# ---- E3 -> Sakharov: a perda não é simétrica entre matéria e antimatéria ----
M0, xM, xA, eps = Reals('M0 xM xA eps')
existe('E3', 'Sobra matéria se a aniquilação tirar um pouco mais da antimatéria (violação de CP, Sakharov 1967)',
       'M − A = x_A − x_M = ε, com ε ÷ M(0) = 6 ÷ 10¹⁰ (a sobra medida do universo)',
       [M0 == 1, xM >= 0, xA >= 0, xM <= 1, xA <= 1, eps == xA - xM, eps == RealVal('6/10000000000')])

# ---- E4 -> o valor total é coletivo: a soma dos fragmentos, não um fragmento ----
todo = Real('todo'); vis = Reals('v1 v2 v3 v4 v5 v6'); val = Reals('u1 u2 u3 u4 u5 u6')
existe('E4', 'O valor total existe como soma de todos os fragmentos, cada um vendo só a sua parte (A.6; na física: a parte tem menos informação que o todo)',
       'Σ valor(fᵢ) = Todo, com valor(fᵢ) ≤ visto(fᵢ) < Todo',
       [todo > 0] + [And(v > 0, v < todo) for v in vis] + [And(u >= 0, u <= v) for u, v in zip(val, vis)] + [sum(val) == todo])

# ---- E5 e E6 -> Newton (v ∝ 1/R) ou "não nota" (v ∝ R): nunca os dois ----
mss, v0, v1, R0, R1, T, n0, n1 = Reals('m v0 v1 R0 R1 T n0 n1')
newton = [mss > 0, v0 > 0, T > 0, R0 > R1, R1 > 0, mss * v1 * R1 == mss * v0 * R0]
provar('E6a', 'Newton: no anel que encolhe o fragmento acelera (momento angular)', 'v₁ = v₀ · R₀ ÷ R₁ > v₀', newton, v1 > v0)
provar('E6b', 'Newton: as voltas por volta do relógio sobem com o quadrado do encolhimento: o fragmento nota pelo calor (página 3)',
       'n₁ ÷ n₀ = (R₀ ÷ R₁)²', newton + [n0 == v0 * T / (2 * R0), n1 == v1 * T / (2 * R1)], n1 * R1 * R1 == n0 * R0 * R0)
existe('E5', '"Não nota" (D17) tem solução se a velocidade cair junto com o raio: v ∝ R (invariância de escala; só vale sem massa)',
       'v₁ ÷ R₁ = v₀ ÷ R₀ dá n₁ = n₀',
       [v0 > 0, T > 0, R0 > R1, R1 > 0, v1 * R0 == v0 * R1, n0 == v0 * T / (2 * R0), n1 == v1 * T / (2 * R1), n1 == n0])
existe('D31', 'Newton e "não nota" ao mesmo tempo', 'v₁·R₁ = v₀·R₀ e v₁ ÷ R₁ = v₀ ÷ R₀, com R₁ < R₀',
       [v0 > 0, R0 > R1, R1 > 0, v1 * R1 == v0 * R0, v1 * R0 == v0 * R1])

# ---- E7 e E8 -> a perda é o calor da colisão inelástica; com perda > 0 o Tubo fecha ----
u1, u2, e, perda, mu = Reals('u1 u2 e perda mu')
provar('E8a', 'A regra S5 é exatamente a colisão inelástica da física: calor Q = ½ · μ · (1 − e²) · (Δv)², com μ = m·m ÷ (m + m)',
       '(m ÷ 4)(1 − e²)(u₁ − u₂)² = ½ μ (1 − e²)(u₁ − u₂)²', [mss > 0, mu == mss * mss / (mss + mss)],
       mss / 4 * (1 - e * e) * (u1 - u2) * (u1 - u2) == mu / 2 * (1 - e * e) * (u1 - u2) * (u1 - u2))
Rr, K, G, Et, frac = Reals('R K G E frac')
existe('E8b', 'Com perda > 0 o gasto pode chegar a 99 % e o Tubo fecha (segunda lei: só a dissipação dá um fim)',
       '(R + K) ÷ E = 1 ÷ 100, com R + K + G = E e G = 0,99 · E', [Et > 0, Rr >= 0, K >= 0, Rr + K + G == Et, G == RealVal('99/100') * Et, frac == (Rr + K) / Et, frac == RealVal('1/100')])

# ---- E9 -> número de rotação: q pontos de encontro; irracional = infinitos (Weyl) ----
j, nn = Ints('j n')
existe('E9a', 'Par (2 m/s, 0,1 m/s): a/(a+b) = 20/21; voltar ao mesmo ponto antes de 21 encontros', '20 · j = 21 · n com 1 ≤ j ≤ 20', [j >= 1, j <= 20, 20 * j == 21 * nn])
existe('E9b', 'Depois de exatamente 21 encontros, volta', '20 · 21 = 21 · n', [nn == 20, 20 * 21 == 21 * nn])
a_, b_, P, x0, kk = Reals('a b P x0 k')
provar('E9c', 'O passo entre encontros é P · a ÷ (a + b): a razão das velocidades decide os pontos, não a rapidez',
       'x_{k+1} − x_k = P · a ÷ (a + b)', [a_ > 0, b_ > 0, P > 0],
       (x0 + a_ * ((kk + 1) * P) / (a_ + b_)) - (x0 + a_ * (kk * P) / (a_ + b_)) == P * a_ / (a_ + b_))

# ---- E10 -> a correlação quântica −cos(ângulo) de um estado do par chega a 2√2 (Tsirelson) ----
sq = Real('s'); S = Real('S')
existe('E10', 'Com correlações −cos(ângulo) de UM estado do par (não quatro valores fixos), S = 2√2',
       'S = 4 · (√2 ÷ 2), com s² = 1/2', [sq > 0, sq * sq == RealVal('1/2'), S == 4 * sq, S * S == 8])

# ---- E11 -> lei de Haff: K(t) = K₀ ÷ (1 + t/τ)² resolve dK/dt = −γ K^{3/2} ----
k0, tau, u = Reals('k0 tau u')
provar('E11', 'Lei de Haff (gás granular, 1983): K(t) = K₀ ÷ (1 + t ÷ τ)² satisfaz dK/dt = −(2 ÷ (τ √K₀)) · K^{3/2}',
       'com u = 1 + t ÷ τ: −2 K₀ ÷ (τ u³) = −(2 ÷ (τ √K₀)) · (√K₀)³ ÷ u³', [k0 > 0, tau > 0, u > 0],
       0 - 2 * (k0 * k0) / (tau * u * u * u) == 0 - (2 / (tau * k0)) * (k0 * k0 * k0) / (u * u * u))

# ---- E12 -> cone reto = raio pelo relógio (cone de luz: r = c · (T_f − t)) ----
c_, Tf, rr0 = Reals('c Tf r0')
existe('E12', 'O cone reto da imagem 3 é um cone de luz: raio = c · (T_f − t), fixado pelo relógio, não pela energia',
       'r(0) = r₀ e r(T_f) = 0 com r(t) = c (T_f − t), c = r₀ ÷ T_f', [rr0 > 0, Tf > 0, c_ == rr0 / Tf, c_ * (Tf - 0) == rr0, c_ * (Tf - Tf) == 0])

for num, nome, eq, ver, det in res:
    print(f'{num}. {nome}\n    equação: {eq}\n    Z3:      {ver}' + (f'  [{det}]' if det else '') + '\n')
