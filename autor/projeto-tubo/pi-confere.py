# Pi é matéria e antimatéria ao mesmo tempo? Dois sentidos: o número π e o píon (partícula π).
# Uso: python -I -X utf8 -B pi-confere.py
from fractions import Fraction as Fr
from z3 import Reals, Real, Solver, And, Or, Not, unsat, sat

def provar(nome, hip, tese):
    s = Solver(); s.set('timeout', 60000); s.add(*hip); s.add(Not(tese)); r = s.check()
    print(('PROVADO      ' if r == unsat else 'CONTRAEXEMPLO' if r == sat else 'SEM RESPOSTA ') + '  ' + nome)

print('A. O número π no Tubo')
c, s_, cf, sf = Reals('c s cf sf')
circ = [c * c + s_ * s_ == 1, cf * cf + sf * sf == 1]
rot = lambda x, y: (x * cf - y * sf, x * sf + y * cf)          # girar o ponto (x, y) pelo ângulo φ
provar('A1. Girar por π leva matéria em antimatéria: (c, s) -> (−c, −s)  [e^{iπ} = −1]',
       circ + [cf == -1, sf == 0], And(rot(c, s_)[0] == -c, rot(c, s_)[1] == -s_))
provar('A2. Matéria + (matéria girada por π) = 0  [e^{iπ} + 1 = 0: a linha de Alpha]',
       circ + [cf == -1, sf == 0], And(c + rot(c, s_)[0] == 0, s_ + rot(c, s_)[1] == 0))
x2, y2 = rot(*rot(Real('one'), Real('zero')))
provar('A3. π é o único giro que, feito duas vezes, volta ao início sem ser nulo: a antimatéria da antimatéria é matéria',
       [cf * cf + sf * sf == 1, Real('one') == 1, Real('zero') == 0, x2 == 1, y2 == 0, Not(And(cf == 1, sf == 0))], And(cf == -1, sf == 0))

print('\nB. O píon (partícula π): conteúdo de quarks')
Q = {'u': Fr(2, 3), 'd': Fr(-1, 3)}; B = Fr(1, 3)
def carga(q): return -Q[q[0]] if q.endswith('~') else Q[q]
def barion(q): return -B if q.endswith('~') else B
def conj(q): return q[:-1] if q.endswith('~') else q + '~'
pions = {'π+': [('u', 'd~')], 'π-': [('d', 'u~')], 'π0': [('u', 'u~'), ('d', 'd~')]}
for nome, termos in pions.items():
    par = termos[0]
    Qt, Bt = sum(carga(q) for q in par), sum(barion(q) for q in par)
    conjugado = sorted(tuple(sorted(conj(q) for q in t)) for t in termos)
    original = sorted(tuple(sorted(t)) for t in termos)
    proprio = conjugado == original
    alvo = [k for k, v in pions.items() if sorted(tuple(sorted(t)) for t in v) == conjugado][0]
    print(f'   {nome}: ' + ' e '.join(' '.join(t) for t in termos).replace('~', '̄') +
          f' | 1 quark (matéria) + 1 antiquark (antimatéria) | carga {Qt} | número bariônico {Bt} | antipartícula: {alvo}' + (' (ele mesmo)' if proprio else ''))

print('\nC. Quem pode ser a própria antipartícula')
q = Real('q')
provar('C1. A conjugação troca o sinal de toda carga aditiva; ser a própria antipartícula exige q = −q, isto é, q = 0',
       [q == -q], q == 0)

print('\nD. O π0 vira luz')
print('   paridade C do π0 = +1; cada fóton tem C = −1')
for n in (2, 3, 4):
    print(f'   π0 -> {n} fótons: C final = (−1)^{n} = {(-1) ** n:+d} -> ' + ('permitido' if (-1) ** n == 1 else 'proibido pela conservação de C'))
E1, E2, p1x, p1y, p2x, p2y, M = Reals('E1 E2 p1x p1y p2x p2y M')
fot = [M > 0, E1 >= 0, E2 >= 0, E1 * E1 == p1x * p1x + p1y * p1y, E2 * E2 == p2x * p2x + p2y * p2y, E1 + E2 == M, p1x + p2x == 0, p1y + p2y == 0]
provar('D1. π0 parado -> 2 fótons: cada um leva metade da massa (67,49 MeV) e saem a 180° um do outro',
       fot, And(E1 == M / 2, E2 == M / 2, p1x * p2x + p1y * p2y == -(M / 2) * (M / 2)))
