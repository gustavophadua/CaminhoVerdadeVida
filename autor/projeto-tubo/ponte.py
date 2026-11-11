# O Tubo como ponte: conecta teorias que estão desconexas, sem contradição.
# Uso: python -I -X utf8 -B ponte.py
import math, random
from z3 import Reals, Real, Bool, Solver, And, Not, Implies, RealVal, unsat, sat

def provar(nome, hip, tese):
    s = Solver(); s.set('timeout', 60000); s.add(*hip); s.add(Not(tese)); r = s.check()
    print(('PROVADO     ' if r == unsat else 'NÃO PROVADO ') + ' ' + nome)
def checar(nome, restr):
    s = Solver(); s.set('timeout', 60000); s.add(*restr); r = s.check()
    print(('CONSISTENTE ' if r == sat else 'CONTRADIÇÃO ' if r == unsat else 'SEM RESPOSTA') + ' ' + nome)

print('A. π aparece onde não há círculo nenhum')
N = 3000
cop = sum(1 for a in range(1, N + 1) for b in range(1, N + 1) if math.gcd(a, b) == 1) / N / N
print(f'   dois inteiros até {N} sem divisor comum: {cop:.5f}   |   6/π² = {6 / math.pi ** 2:.5f}')
basel = sum(1 / k ** 2 for k in range(1, 200001))
print(f'   1 + 1/4 + 1/9 + 1/16 + ... (200 mil termos): {basel:.5f}   |   π²/6 = {math.pi ** 2 / 6:.5f}')
random.seed(20261111); L = D = 1.0; tiros = 1_000_000
cruza = sum(1 for _ in range(tiros) if (D / 2) * random.random() <= (L / 2) * math.sin(random.random() * math.pi / 2))
print(f'   agulha de Buffon ({tiros} lançamentos): π ≈ {2 * L * tiros / (D * cruza):.4f}   |   π = {math.pi:.4f}')

print('\nB. Newton e Einstein: juntos no mesmo lugar, explodem; cada um no seu domínio, convivem')
dt, dt2, g, beta = Reals('dt dt2 gamma beta')
einstein = [g > 0, g * g * (1 - beta * beta) == 1, beta >= 0, beta < 1, dt > 0, dt2 == g * dt]
checar('as duas como verdades absolutas, a qualquer velocidade (β = 1/2): Newton Δt′ = Δt e Einstein Δt′ = γ·Δt',
       einstein + [beta == RealVal('1/2'), dt2 == dt])
checar('cada uma no seu domínio: Einstein sempre; Newton só abaixo de β = 1/1000 e dentro da precisão 10⁻⁶',
       einstein + [Implies(beta <= RealVal('1/1000'), dt2 - dt <= RealVal('1/1000000') * dt)])
provar('a ponte: abaixo de β = 1/1000, Einstein e Newton diferem menos de uma parte em um milhão (γ − 1 ≤ 10⁻⁶)',
       einstein + [beta <= RealVal('1/1000')], g - 1 <= RealVal('1/1000000'))

print('\nC. O que "não há contradições" consegue provar')
print('   - para um conjunto finito de regras: sim, mostrando um modelo (a máquina, ou o "consistente" do comprovador)')
print('   - para "tudo", de dentro: não (Gödel, 1931: uma teoria que contém a aritmética, se for consistente, não prova a própria consistência)')
print('   - uma língua que contém a própria verdade: impossível (Tarski, 1933: o mentiroso) -> nenhuma língua universal dispensa as outras')
