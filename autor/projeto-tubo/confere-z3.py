# Confere com o Z3 as regras do motor da Máquina do Tubo (maquina-do-tubo.html, s.step).
# Uso: python -I -X utf8 -B confere-z3.py
# "PROVADO" = vale para todos os números reais dentro das condições escritas (o Z3 não achou
# contraexemplo e a negação é insatisfazível). "CONTRAEXEMPLO" = o Z3 mostra números em que falha.
# O Z3 confere a álgebra das regras. Não confere se as regras descrevem o mundo.
from z3 import Reals, Real, Solver, And, Or, Not, Implies, If, unsat, sat, RealVal

resultados = []

def provar(nome, hipoteses, tese):
    s = Solver(); s.set('timeout', 60000)
    s.add(*hipoteses); s.add(Not(tese))
    r = s.check()
    if r == unsat:
        resultados.append(('PROVADO', nome, ''))
    elif r == sat:
        m = s.model()
        resultados.append(('CONTRAEXEMPLO', nome, ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()))))
    else:
        resultados.append(('SEM RESPOSTA', nome, str(s.reason_unknown())))

def existe(nome, restricoes):
    s = Solver(); s.set('timeout', 60000)
    s.add(*restricoes)
    r = s.check()
    if r == sat:
        m = s.model()
        resultados.append(('EXISTE', nome, ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()))))
    elif r == unsat:
        resultados.append(('IMPOSSÍVEL', nome, ''))
    else:
        resultados.append(('SEM RESPOSTA', nome, str(s.reason_unknown())))

# ---------- colisão (S5): e = raiz(1 - perda) ----------
u1, u2, e, perda, mss = Reals('u1 u2 e perda m')
col = [mss > 0, perda >= 0, perda <= 1, e >= 0, e * e == 1 - perda]
v1 = ((1 + e) * u1 + (1 - e) * u2) / 2
v2 = ((1 - e) * u1 + (1 + e) * u2) / 2
gasto = mss / 4 * (1 - e * e) * (u1 - u2) * (u1 - u2)
ke_antes = mss / 2 * (u1 * u1 + u2 * u2)
ke_depois = mss / 2 * (v1 * v1 + v2 * v2)
provar('1. Colisão conserva a quantidade de movimento', col, mss * v1 + mss * v2 == mss * u1 + mss * u2)
provar('2. Colisão: energia de movimento perdida = (m/4) x perda x (velocidade relativa)^2', col, ke_antes - ke_depois == gasto)
provar('3. Colisão: a velocidade relativa sai multiplicada por e (os dois se atravessam)', col, v1 - v2 == e * (u1 - u2))
provar('4. Colisão nunca cria energia (gasto >= 0)', col, gasto >= 0)
provar('5. Só gasta energia se houver perda e diferença de velocidade', col, (gasto > 0) == And(perda > 0, u1 != u2))
provar('6. AFIRMAÇÃO DO CADERNO: toda colisão gasta energia', col + [u1 != u2], gasto > 0)

# ---------- aceleração (S3, S4): três ramos do motor ----------
vd, nvd, reserva, dE = Reals('vd nvd reserva dE')
ac = [mss > 0, reserva > 0]
# ramo normal: dE = m/2 (nvd^2 - vd^2) > 0 e cabe na reserva: sai da reserva e vira movimento
provar('7. Acelerar: o que sai da reserva vira movimento (soma igual)',
       ac + [dE == mss / 2 * (nvd * nvd - vd * vd), dE > 0, dE <= reserva],
       (reserva - dE) + mss / 2 * nvd * nvd == reserva + mss / 2 * vd * vd)
# ramo da reserva curta: usa só o que resta; nvd'^2 = vd^2 + 2 dE / m
nv2 = Real('nv2')
provar('8. Acelerar com reserva curta: usa só o que resta (soma igual)',
       ac + [nv2 * nv2 == vd * vd + 2 * reserva / mss],
       0 + mss / 2 * nv2 * nv2 == reserva + mss / 2 * vd * vd)
# ramo da frenagem: dE < 0 (o observador vinha contra o próprio sentido): a diferença vai para "gasta"
provar('9. Frear contra o próprio sentido: a energia de movimento perdida vai para "gasta" (soma igual)',
       ac + [dE == mss / 2 * (nvd * nvd - vd * vd), dE <= 0],
       reserva + mss / 2 * nvd * nvd + (0 - dE) == reserva + mss / 2 * vd * vd)
existe('10. Existe gasto de energia SEM colisão (ramo da frenagem)',
       ac + [dE == mss / 2 * (nvd * nvd - vd * vd), dE < 0, vd < 0, nvd > vd])

# ---------- soma zero: a linha de Alpha (regra 2, decisão D1) ----------
c, s_, cf, sf = Reals('c s cf sf')   # (c, s) = cos e sen do ângulo do relógio; (cf, sf) = cos e sen da defasagem
circ = [c * c + s_ * s_ == 1, cf * cf + sf * sf == 1]
materia = c
anti = c * cf - s_ * sf              # cos(theta + fase)
provar('11. Leitura A (180 graus): matéria + antimatéria = 0 em todo instante', circ + [cf == -1, sf == 0], materia + anti == 0)
provar('12. Leitura C (90 graus, eixos vertical e horizontal): matéria + antimatéria = 0 em todo instante', circ + [cf == 0, sf == 1], materia + anti == 0)
# só 180 graus zera a soma em todo instante: basta exigir a soma zero em dois instantes (12 h e 3 h)
provar('13. Só a defasagem de 180 graus dá soma zero em todo instante',
       [cf * cf + sf * sf == 1, 1 + cf == 0, 0 - sf == 0], And(cf == -1, sf == 0))
provar('14. Leitura A: as duas nunca ocupam o mesmo ponto do relógio', circ + [cf == -1, sf == 0],
       Not(And(c == c * cf - s_ * sf, s_ == s_ * cf + c * sf)))

# ---------- n = f(v) e encontros (página 4, S9) ----------
v, T, P, n = Reals('v T P n')
provar('15. n = v x T / P: 10 voltas a 2 m/s e 0,5 a 0,10 m/s com T = 60 s e P = 12 m',
       [T == 60, P == 12], And(2 * T / P == 10, RealVal('1/10') * T / P == RealVal('1/2')))
existe('16. O caderno (2 m/s, 0,10 m/s, 60 s) fixa o perímetro? Outro perímetro também serve',
       [T == 60, P > 0, P != 12, n == 2 * T / P, n > 0])
w1, w2, n1, n2 = Reals('w1 w2 n1 n2')
enc = [T > 0, P > 0, w1 > 0, w2 > 0, n1 == w1 * T / P, n2 == w2 * T / P]
provar('17. Sentidos opostos: a distância relativa percorrida em T dá n1 + n2 voltas (encontros)', enc, (w1 - (0 - w2)) * T / P == n1 + n2)
provar('18. Mesmo sentido: dá n1 - n2 voltas (encontros)', enc, (w1 - w2) * T / P == n1 - n2)
provar('19. Mesma velocidade no mesmo sentido: zero encontros', enc + [w1 == w2], (w1 - w2) * T / P == 0)

# ---------- raio e energia (S6) ----------
r, frac, r2, frac2 = Reals('r frac r2 frac2')
rf = [r >= 0, r * r == frac, r2 >= 0, r2 * r2 == frac2, frac >= 0, frac2 >= 0]
provar('20. O tubo fecha (raio 0) se e só se a energia acaba', rf, (r == 0) == (frac == 0))
provar('21. Menos energia, menor o raio', rf + [frac2 < frac], r2 < r)

# ---------- espiral vista de dentro (D9) ----------
tau0, Tt, Rm, k = Reals('tau0 T Rm k')
def raio(tau): return Rm / (1 + tau / tau0)
existe('22. A espiral da máquina (raio = Rm / (1 + distância)) cresce pelo mesmo fator a cada volta, como a de Fibonacci?',
       [tau0 > 0, Tt > 0, Rm > 0, k > 0, raio(0) == k * raio(Tt), raio(Tt) == k * raio(2 * Tt)])

# ---------- "quanto mais colisões, mais energia gasta" (página 4, item 17) ----------
a1, a2, b1 = Reals('a1 a2 b1')   # velocidades relativas: história A tem 2 colisões, história B tem 1
existe('23. Existe história com MAIS colisões e MENOS energia gasta (mesma perda, mesma massa)',
       [perda > 0, perda < 1, mss > 0, a1 > 0, a2 > 0, b1 > 0,
        mss / 4 * perda * (a1 * a1 + a2 * a2) < mss / 4 * perda * (b1 * b1)])

# ---------- respostas do autor em 10/11/2026 (PROMPT.md, A.5) ----------
# "Toda colisão gasta energia em direção ao Todo": vira regra se a perda nunca for zero (suposição S10).
provar('24. Com perda > 0 (S10): toda colisão com diferença de velocidade gasta do estoque',
       col + [perda > 0, u1 != u2], gasto > 0)
provar('25. Com perda > 0, na mesma história: cada colisão a mais deixa o gasto acumulado maior',
       [perda > 0, perda <= 1, mss > 0, a1 != 0, a2 != 0],
       mss / 4 * perda * (a1 * a1 + a2 * a2) > mss / 4 * perda * (a1 * a1))
# Transferência entre os que estão dentro
provar('26. Sem perda não há transferência: cada um sai com a velocidade com que entrou',
       col + [perda == 0], And(v1 == u1, v2 == u2))
provar('27. Há transferência entre os dois se e só se há gasto do estoque',
       col + [u1 != u2], (v1 != u1) == (gasto > 0))
existe('28. Existe colisão em que um dos dois sai com MAIS energia de movimento do que entrou (transferência)',
       col + [v2 * v2 > u2 * u2])
# O que dá para notar de dentro: voltas no perímetro por volta do relógio
P0, rA, rB, fA, fB, nA, nB, kk, PA, PB = Reals('P0 rA rB fA fB nA nB k PA PB')
dentro = [v > 0, T > 0, P0 > 0, rA > 0, rB > 0, rA * rA == fA, rB * rB == fB,
          nA == v * T / (P0 * rA), nB == v * T / (P0 * rB)]
provar('29. De dentro, como a máquina está: a razão entre as reservas de dois instantes sai da contagem de voltas (fB x nB^2 = fA x nA^2)',
       dentro, fB * nB * nB == fA * nA * nA)
provar('30. Se a velocidade do fragmento encolhe junto com o perímetro (v = k x P): a contagem de voltas não muda nunca',
       [T > 0, kk > 0, PA > 0, PB > 0, nA == kk * PA * T / PA, nB == kk * PB * T / PB], nA == nB)

# ---------- frio, morno e quente (resposta do autor, 10/11/2026, A.6) ----------
# Dois fragmentos em sentidos opostos, velocidades a e b, distância inicial d0, perímetro P.
# O encontro k acontece em t_k = (d0 + k P) / (a + b). A posição do primeiro é x0 + a t.
a_, b_, d0, x0, kq = Reals('a b d0 x0 kq')
pos = lambda kk_: x0 + a_ * (d0 + kk_ * P) / (a_ + b_)
op = [a_ > 0, b_ > 0, P > 0]
provar('31. Mesma velocidade em sentidos opostos (todos frios ou todos quentes): a cada 2 encontros voltam ao mesmo ponto, só 2 pontos para sempre',
       op + [a_ == b_], pos(kq + 2) - pos(kq) == P)
provar('32. O ponto de encontro anda a x P / (a + b) por encontro: depende só da razão entre as velocidades, não de quão rápido',
       op + [kk > 0], (x0 + (kk * a_) * (d0 + (kq + 1) * P) / (kk * a_ + kk * b_)) - (x0 + (kk * a_) * (d0 + kq * P) / (kk * a_ + kk * b_)) == pos(kq + 1) - pos(kq))

# ---------- valor e mecanismo (A.10): os valores descem pelos mecanismos e são filtrados ----------
provar('33. Com perda < 100 %, quem conhece o mecanismo recupera os valores de antes da colisão a partir dos de depois',
       col + [perda < 1, e > 0], u1 == ((v1 + v2) + (v1 - v2) / e) / 2)
uu1, uu2 = Reals('uu1 uu2')
w1_ = ((1 + e) * uu1 + (1 - e) * uu2) / 2
w2_ = ((1 - e) * uu1 + (1 + e) * uu2) / 2
existe('34. Com perda de 100 %, valores diferentes antes dão o mesmo depois (o filtro apaga quem tinha o quê)',
       col + [perda == 1, uu1 != u1, v1 == w1_, v2 == w2_])

larg = max(len(t) for t, _, _ in resultados)
for tipo, nome, det in resultados:
    print(tipo.ljust(larg), ' ', nome)
    if det: print(' ' * larg, '   ', det)
