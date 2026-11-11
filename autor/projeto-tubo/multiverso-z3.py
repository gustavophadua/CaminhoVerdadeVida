# A lógica do multiverso, conferida no Z3 e em contas simples.
# Uso: python -I -X utf8 -B multiverso-z3.py
# M1: um mundo só com valores fixos não reproduz a correlação medida (Bell).
# M2: muitos ramos com pesos, sem sinal entre os lados, reproduzem S = 2√2 (a saída de Everett para Bell).
# M3: a mesma lógica dos ramos aceita S = 4, que a natureza não faz: ramificar não explica sozinho o limite 2√2.
# M4: espaço infinito com estados finitos repete configurações (gaveta de pombos): o multiverso de nível 1.
# M5: num conjunto infinito, "a fração dos casos" depende da ordem de contagem: o problema da medida (nível 2).
from z3 import Reals, Real, Ints, Solver, And, Or, Not, RealVal, unsat, sat

res = []
def existe(num, nome, eq, restr):
    s = Solver(); s.set('timeout', 60000); s.add(*restr); r = s.check()
    if r == sat:
        m = s.model(); res.append((num, nome, eq, 'EXISTE', ', '.join(f'{d.name()} = {m[d]}' for d in sorted(m.decls(), key=lambda d: d.name()) if not d.name().startswith('p_'))))
    elif r == unsat: res.append((num, nome, eq, 'SEM SOLUÇÃO', ''))
    else: res.append((num, nome, eq, 'SEM RESPOSTA', str(s.reason_unknown())))
def provar(num, nome, eq, hip, tese):
    s = Solver(); s.set('timeout', 60000); s.add(*hip); s.add(Not(tese)); r = s.check()
    res.append((num, nome, eq, 'PROVADO' if r == unsat else ('CONTRAEXEMPLO' if r == sat else 'SEM RESPOSTA'), ''))

# ---- M1: um mundo, um resultado por medição, fixado antes ----
a, a1, b, b1 = Ints('a a1 b b1')
S1 = a * b + a * b1 + a1 * b - a1 * b1
existe('M1', 'Um mundo só: cada medição tem um resultado, fixado antes e local', 'S = a·b + a·b′ + a′·b − a′·b′ com S² = 8',
       [Or(z == -1, z == 1) for z in (a, a1, b, b1)] + [S1 * S1 == 8])

# ---- M2 e M3: ramos com pesos (todos os resultados acontecem), sem sinal entre os lados ----
# p_{xy}_{uv}: peso do ramo em que, com a escolha x de um lado e y do outro, saem os resultados u e v (0 = +1, 1 = −1)
p = {(x, y, u, v): Real(f'p_{x}{y}_{u}{v}') for x in (0, 1) for y in (0, 1) for u in (0, 1) for v in (0, 1)}
cons = [w >= 0 for w in p.values()]
for x in (0, 1):
    for y in (0, 1):
        cons.append(sum(p[(x, y, u, v)] for u in (0, 1) for v in (0, 1)) == 1)
for x in (0, 1):            # o que um lado vê não depende da escolha do outro (sem sinal)
    for u in (0, 1):
        cons.append(sum(p[(x, 0, u, v)] for v in (0, 1)) == sum(p[(x, 1, u, v)] for v in (0, 1)))
for y in (0, 1):
    for v in (0, 1):
        cons.append(sum(p[(0, y, u, v)] for u in (0, 1)) == sum(p[(1, y, u, v)] for u in (0, 1)))
sg = lambda o: 1 if o == 0 else -1
def E(x, y): return sum(sg(u) * sg(v) * p[(x, y, u, v)] for u in (0, 1) for v in (0, 1))
S = E(0, 0) + E(0, 1) + E(1, 0) - E(1, 1)
s = Real('s')
existe('M2', 'Muitos ramos com pesos, sem sinal entre os lados (Everett): a correlação medida',
       'S = E(a,b) + E(a,b′) + E(a′,b) − E(a′,b′) = 2√2, com pesos ≥ 0 que somam 1 e sem sinal',
       cons + [s > 0, s * s == RealVal('1/2'), S == 4 * s])
existe('M3', 'A mesma lógica aceita S = 4 (a "caixa PR"), que nenhum experimento dá',
       'S = 4 com os mesmos pesos e sem sinal', cons + [S == 4])

# ---- M4: gaveta de pombos (nível 1) ----
v1, v2, v3, v4 = Ints('v1 v2 v3 v4')
provar('M4', 'Mais regiões do que estados possíveis: duas regiões ficam idênticas (nível 1, Tegmark)',
       '4 regiões, 3 estados cada: alguma repete', [And(z >= 1, z <= 3) for z in (v1, v2, v3, v4)],
       Or(v1 == v2, v1 == v3, v1 == v4, v2 == v3, v2 == v4, v3 == v4))

for num, nome, eq, ver, det in res:
    print(f'{num}. {nome}\n    equação: {eq}\n    Z3:      {ver}' + (f'  [{det}]' if det else '') + '\n')

# ---- M5: o problema da medida: a mesma lista infinita, duas frações ----
def natural(n): return list(range(1, n + 1))
def dois_pares_um_impar(n):
    out, e, o = [], 2, 1
    while len(out) < n:
        out += [e, e + 2, o]; e += 4; o += 2
    return out[:n]
n = 3000
f1 = sum(1 for k in natural(n) if k % 2 == 0) / n
f2 = sum(1 for k in dois_pares_um_impar(n) if k % 2 == 0) / n
print('M5. O problema da medida (nível 2): "que fração dos números inteiros é par?"')
print(f'    contando na ordem 1, 2, 3, 4, ...:           {f1:.3f}')
print(f'    contando na ordem 2, 4, 1, 6, 8, 3, ...:     {f2:.3f}')
print('    as duas listas contêm exatamente os mesmos números, todos, uma vez cada. A fração depende da ordem de contagem.')
print('    Num multiverso infinito, "a probabilidade de X" fica indefinida até alguém escolher a ordem (a medida).')
