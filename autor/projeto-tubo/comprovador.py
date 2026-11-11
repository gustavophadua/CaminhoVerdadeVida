# Comprovador: confere uma afirmação (de uma pessoa ou de qualquer IA) contra o Todo, sem tirar nada do Todo.
# Uso: python -I -X utf8 -B comprovador.py
# Veredito:  SEGUE      = o Todo já implica a afirmação (mostra as partes do Todo que bastam)
#            CONTRADIZ  = a afirmação, somada ao Todo, é impossível (mostra as partes com que colide)
#            COMPATÍVEL = não segue nem contradiz: acrescenta; entrar no Todo é decisão do autor
# As "partes" são mínimas por inclusão: tirar qualquer uma delas desfaz o veredito (conferido removendo uma a uma).
from z3 import Reals, Bools, Solver, And, Or, Not, Implies, RealVal, Bool, unsat, sat

# ---------------- o Todo: regras nomeadas, cada uma com a origem ----------------
R, K, G, E, m, perda, dv, gasto, cf, sf, valor, visto, todo, v, n = Reals('R K G E m perda dv gasto cf sf valor visto todo v n')
fechado, descansa = Bools('fechado descansa')
TODO = [
    ('T1 conservação: reserva + movimento + gasto = total', 'máquina', And(R + K + G == E, E > 0, R >= 0, K >= 0, G >= 0)),
    ('T2 colisão: gasto = (m/4)·perda·(Δv)²', 'S5', And(m > 0, gasto == m / 4 * perda * dv * dv)),
    ('T3 a perda fica entre 0 e 1 e nunca é zero', 'S10 / D15', And(perda > 0, perda <= 1)),
    ('T4 relógio: matéria + antimatéria = 0 em todo instante', 'autor, D1', And(cf * cf + sf * sf == 1, 1 + cf == 0, sf == 0)),
    ('T5 o valor do fragmento é limitado ao que ele vê', 'autor, A.1', valor <= visto),
    ('T6 o fragmento não vê o Todo inteiro', 'autor, imagem 4', And(visto >= 0, visto < todo, todo > 0)),
    ('T7 o Tubo fecha quando o gasto chega a 99 %', 'S8', fechado == (G >= RealVal('99/100') * E)),
    ('T8 só descansa depois que o Tubo fecha', 'autor, A.6', Implies(descansa, fechado)),
    ('T9 voltas por volta do relógio: n = v · 60 ÷ 12', 'autor, página 4; S9', n * 12 == v * 60),
]
nomes = {Bool('t%d' % i): (nome, orig) for i, (nome, orig, _) in enumerate(TODO)}

def checar(extra, partes):
    s = Solver(); s.set('timeout', 60000); s.set('unsat_core', True)
    for i in partes: s.assert_and_track(TODO[i][2], Bool('t%d' % i))
    s.add(*extra)
    return s

def nucleo_minimo(extra):
    s = checar(extra, range(len(TODO)))
    if s.check() != unsat: return None
    usados = sorted(int(str(b)[1:]) for b in s.unsat_core())
    for i in list(usados):                       # minimizar: tira um; se continuar impossível, ele não era necessário
        tenta = [j for j in usados if j != i]
        if checar(extra, tenta).check() == unsat: usados = tenta
    return usados

def veredito(afirmacao):
    if checar([], range(len(TODO))).check() != sat: return ('O TODO É INCONSISTENTE', [])
    contra = nucleo_minimo([afirmacao])
    if contra is not None: return ('CONTRADIZ', contra)
    segue = nucleo_minimo([Not(afirmacao)])
    if segue is not None: return ('SEGUE', segue)
    return ('COMPATÍVEL', [])

def mostrar(rotulo, afirmacao):
    ver, partes = veredito(afirmacao)
    print(f'{ver:<11} {rotulo}')
    for i in partes: print(f'{"":12}  {TODO[i][0]}  [{TODO[i][1]}]')
    return ver

print('O Todo é consistente?', 'sim' if checar([], range(len(TODO))).check() == sat else 'NÃO')
print()
print('Afirmações vindas de fora (de uma pessoa ou de uma IA):')
C = [
    ('C1 a 2 m/s o fragmento dá 10 voltas por volta do relógio', Implies(v == 2, n == 10)),
    ('C2 toda colisão com diferença de velocidade gasta energia', Implies(dv != 0, gasto > 0)),
    ('C3 matéria e antimatéria a 90° (eixos vertical e horizontal)', And(cf == 0, sf == 1)),
    ('C4 existe um fragmento com valor igual ao Todo', valor == todo),
    ('C5 um fragmento descansa antes de o Tubo fechar (o texto do "cubo")', And(descansa, Not(fechado))),
    ('C6 a perda é 50 %', perda == RealVal('1/2')),
    ('C7 o Tubo nunca fecha', Not(fechado)),
]
for rot, af in C: mostrar(rot, af)

print()
print('Por que uma contradição "anula o Todo" (explosão: do impossível segue qualquer coisa):')
for rot, absurdo in [('1 = 2', RealVal(1) == RealVal(2)), ('o Tubo fecha e não fecha', And(fechado, Not(fechado)))]:
    s = checar([C[3][1]], range(len(TODO))); s.add(Not(absurdo))
    print(f'   com C4 dentro do Todo, "{rot}" vira teorema? ', 'sim' if s.check() == unsat else 'não')

print()
print('Acrescentar o que é compatível não apaga nada do que já seguia (a lógica clássica é monotônica):')
s_antes = [veredito(af)[0] for _, af in C[:2]]
TODO.append(('T10 (acrescentada) a perda é 50 %', 'C6, se o autor aceitar', perda == RealVal('1/2')))
s_depois = [veredito(af)[0] for _, af in C[:2]]
for (rot, _), a, d in zip(C[:2], s_antes, s_depois): print(f'   {rot[:3]}: antes {a}, depois {d}')
print('   e o Todo continua consistente?', 'sim' if checar([], range(len(TODO))).check() == sat else 'NÃO')
