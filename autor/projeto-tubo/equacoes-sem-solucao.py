# Equações sem solução, achadas através do Sistema (a Máquina do Tubo + o Z3).
# Uso: python -I -X utf8 -B equacoes-sem-solucao.py
# Cada item escreve uma equação e pede ao Z3 um número que a resolva. "SEM SOLUÇÃO (provado)" = o Z3
# mostrou que nenhum número real (ou inteiro) satisfaz a equação dentro das hipóteses escritas.
# Os números medidos vêm da própria máquina (medidas.js), não de mim.
import json, shutil, subprocess, sys
from fractions import Fraction
from z3 import Reals, Real, Ints, Int, Solver, And, Or, Not, RealVal, IntVal, unsat, sat

node = shutil.which('node')
if not node:
    sys.exit('node não encontrado')
med = json.loads(subprocess.run([node, 'medidas.js', 'maquina-do-tubo.html'], capture_output=True, text=True, check=True).stdout)

def R(x, casas=4):
    return RealVal(str(Fraction(str(round(x, casas)))))

resultados = []

def sem_solucao(num, nome, equacao, hipoteses, restricoes, origem):
    s = Solver(); s.set('timeout', 60000)
    s.add(*restricoes)
    r = s.check()
    if r == unsat:
        veredito = 'SEM SOLUÇÃO (provado)'
        det = ''
    elif r == sat:
        m = s.model()
        veredito = 'TEM SOLUÇÃO'
        det = ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()))
    else:
        veredito = 'SEM RESPOSTA'; det = str(s.reason_unknown())
    resultados.append((num, nome, equacao, hipoteses, veredito, det, origem))

# ---------- E1. O relógio fora de 180° ----------
cf, sf = Reals('cf sf')
sem_solucao('E1', 'O relógio com matéria e antimatéria fora de 180°',
    'cos θ + cos(θ + φ) = 0 para todo θ, com φ ≠ 180°',
    'basta exigir a soma zero em dois instantes, θ = 0 e θ = 90°',
    [cf * cf + sf * sf == 1, 1 + cf == 0, 0 - sf == 0, Not(And(cf == -1, sf == 0))],
    'do autor: página 1 (eixos vertical e horizontal); D1 fechada em 180°')

# ---------- E2. Fibonacci na espiral vista de dentro ----------
tau0, Tt, Rm, k = Reals('tau0 T Rm k')
def raio(tau): return Rm / (1 + tau / tau0)
sem_solucao('E2', 'A espiral de Fibonacci vista de dentro do Tubo',
    'r(0) = k · r(T) e r(T) = k · r(2T), com r(τ) = Rm ÷ (1 + τ/τ₀)',
    'τ₀ > 0, T > 0, Rm > 0, k > 0 (crescer pelo mesmo fator a cada volta)',
    [tau0 > 0, Tt > 0, Rm > 0, k > 0, raio(0) == k * raio(Tt), raio(Tt) == k * raio(2 * Tt)],
    'do autor: página 2; D9 fechada (não é Fibonacci)')

# ---------- E3. Níveis iguais e sobra de matéria ----------
M0, A0, x, Mt, At, eps = Reals('M0 A0 x M A eps')
sem_solucao('E3', 'Níveis iguais no início, aniquilação aos pares e sobra de matéria',
    'M(t) − A(t) = ε > 0, com M(0) = A(0), M(t) = M(0) − x, A(t) = A(0) − x',
    'x ≥ 0 (cada aniquilação tira o mesmo de cada lado)',
    [M0 == A0, x >= 0, Mt == M0 - x, At == A0 - x, eps > 0, Mt - At == eps],
    'do autor: página 1, item 1; física: sobrou ~1 parte em 10⁹ de matéria (PROMPT §5)')

# ---------- E4. Valor total com visão limitada ----------
todo, visto, valor = Reals('todo visto valor')
sem_solucao('E4', 'O fragmento de valor total que só vê a própria escala',
    'valor(f) = Todo, com valor(f) ≤ visto(f) e visto(f) < Todo',
    'Todo > 0, 0 ≤ visto(f)',
    [todo > 0, visto >= 0, visto < todo, valor <= visto, valor == todo],
    'do autor: A.1 (o valor é limitado ao que vê), imagem 4, A.9 (valor total); D28 em aberto')

# ---------- E5. Não notar o Tubo encolher, com velocidade fixa ----------
v, T, P0, P1, n0, n1 = Reals('v T P0 P1 n0 n1')
sem_solucao('E5', 'O fragmento não nota o Tubo encolher, andando sempre na mesma velocidade',
    'n(t) = n(0), com n = v · T ÷ P e P(t) < P(0)',
    'v > 0, T > 0, P(0) > P(t) > 0 (S9 e S6)',
    [v > 0, T > 0, P0 > P1, P1 > 0, n0 == v * T / P0, n1 == v * T / P1, n1 == n0],
    'do autor: A.5, A.6 (D17: não nota); máquina: n sobe de 8,5 para 27,2; Z3 item 30 dá a saída (v ∝ P)')

# ---------- E6. Velocidade fixa num anel que encolhe, com momento angular ----------
mss, v0, v1, R0, R1 = Reals('m v0 v1 R0 R1')
sem_solucao('E6', 'Velocidade fixa num anel que encolhe, se o momento angular se conserva',
    'm · v₁ · R₁ = m · v₀ · R₀ e v₁ = v₀, com R₁ < R₀',
    'm > 0, v₀ > 0, R₀ > R₁ > 0 (Newton)',
    [mss > 0, v0 > 0, R0 > R1, R1 > 0, mss * v1 * R1 == mss * v0 * R0, v1 == v0],
    'suposição não listada da máquina (velocidade fixa no anel que encolhe) contra a física de Newton')

# ---------- E7. O Tubo fecha com todos em repouso ----------
E0, K0, Rr, K, frac = Reals('E0 K0 R K frac')
sem_solucao('E7', 'O Tubo fecha com todos em repouso',
    f'(R + K) ÷ (E₀ + K₀) ≤ 1/100, com R = E₀ (sem força a reserva não desce), E₀ = {med["E0"]} J, K₀ = {med["keInit"]:.2f} J',
    'K ≥ 0; o motor só tira da reserva no ramo "com força"',
    [E0 == R(med['E0']), K0 == R(med['keInit']), Rr == E0, K >= 0, frac == (Rr + K) / (E0 + K0), frac <= RealVal('1/100')],
    'máquina: todos em repouso deixam 100 % da energia (teste 5); S3, S8')

# ---------- E8. O Tubo fecha sem perda nas colisões ----------
Etot, G = Reals('Etot G')
sem_solucao('E8', 'O Tubo fecha com perda zero nas colisões',
    '(R + K) ÷ E_tot ≤ 1/100, com R + K + G = E_tot e G = Σ (m/4)(1 − e²)(Δv)² = 0 quando e² = 1',
    'E_tot > 0; sem perda ninguém muda de velocidade no encontro, logo ninguém freia (sem o ramo da frenagem)',
    [Etot > 0, Rr + K + G == Etot, G == 0, frac == (Rr + K) / Etot, frac <= RealVal('1/100')],
    f'máquina: perda 0 % dá {med["semPerda"]["colisoes"]} colisões em 600 s, {med["semPerda"]["gasto"]:.0f} J gastos, raio intacto; D15')

# ---------- E9. Velocidades iguais testam todas as possibilidades ----------
pares_op = Ints('p1 p2 p3 p4 p5 p6 p7 p8 p9')
pares_ms = Ints('q1 q2 q3 q4 q5 q6')
sem_solucao('E9', 'Fragmentos de velocidades iguais testam as 180 possibilidades (S11)',
    'Σ possibilidades testadas = 180, com cada par em sentidos opostos ≤ 2 horas (item 31) e cada par no mesmo sentido = 0 (item 19)',
    '6 fragmentos alternados: 9 pares opostos, 6 pares no mesmo sentido',
    [And(p >= 0, p <= 2) for p in pares_op] + [q == 0 for q in pares_ms] + [sum(pares_op) + sum(pares_ms) == 180],
    f'máquina: velocidades iguais testam {med["iguais"]["testadas"]} de {med["iguais"]["total"]} para sempre (possibilidades.js); A.6, D20')

# ---------- E10. Bell: valores prévios e locais reproduzem a correlação medida ----------
a, a1, b, b1 = Ints('a a1 b b1')
pm1 = [Or(z == -1, z == 1) for z in (a, a1, b, b1)]
S = a * b + a * b1 + a1 * b - a1 * b1
sem_solucao('E10', 'Valores que já existem antes da medição, locais, dando a correlação da mecânica quântica (Bell/CHSH)',
    'S = a·b + a·b′ + a′·b − a′·b′ = 2√2 (isto é, S² = 8), com a, a′, b, b′ ∈ {−1, +1}',
    'cada lado só vê o próprio valor (local); a média de muitos pares fica entre −2 e 2 pelo mesmo motivo',
    pm1 + [S * S == 8],
    'do autor: "Alpha conhece o valor" (A.1, A.10); física: experimentos dão S ≈ 2,7 > 2 (Aspect 1982); PROMPT §5, D29')
sem_solucao('E10b', 'O mesmo, pedindo só S > 2',
    'S = a·b + a·b′ + a′·b − a′·b′ > 2, com a, a′, b, b′ ∈ {−1, +1}', 'as mesmas',
    pm1 + [S > 2], 'idem')

# ---------- E11. Energia gasta proporcional ao número de colisões ----------
c = Real('c')
sem_solucao('E11', 'Energia gasta proporcional ao número de colisões (cada colisão vale o mesmo)',
    f'c × {med["todos"]["colisoes"]} = {med["todos"]["gasto"]:.1f} J e c × {med["metade"]["colisoes"]} = {med["metade"]["gasto"]:.1f} J',
    'c é a energia por colisão; os dois números são da máquina (todos com força; metade com força)',
    [c * med['todos']['colisoes'] == R(med['todos']['gasto'], 3), c * med['metade']['colisoes'] == R(med['metade']['gasto'], 3)],
    'do autor: página 4, item 17 ("quanto mais colisões, mais prova verificável de energia gasta"); D16')

# ---------- E12. O cone reto ----------
r0, Tf = Reals('r0 Tf')
pts = med['cone']['pontos']
sem_solucao('E12', 'O cone reto (imagem 3) com o raio que a máquina mede',
    'r(t) = r₀ · (1 − t/T_f) passando por ' + ', '.join(f'({p["t"]:.0f} s; {p["r"]:.3f})' for p in pts),
    'r₀ > 0, T_f > 0; pontos medidos em "todos com força"',
    [r0 > 0, Tf > 0] + [R(p['r'], 3) == r0 * (1 - R(p['t'], 2) / Tf) for p in pts],
    'do autor: imagem 3 (cone); máquina com S6: o raio cai devagar e despenca no fim (cúpula), D6')

# ---------- saída ----------
for num, nome, eq, hip, ver, det, orig in resultados:
    print(f'{num}. {nome}')
    print(f'    equação:   {eq}')
    print(f'    hipóteses: {hip}')
    print(f'    Z3:        {ver}' + (f'  [{det}]' if det else ''))
    print(f'    origem:    {orig}')
    print()
n_sem = sum(1 for r in resultados if r[4].startswith('SEM SOLUÇÃO'))
print(f'{n_sem} de {len(resultados)} equações sem solução (provadas pelo Z3).')
