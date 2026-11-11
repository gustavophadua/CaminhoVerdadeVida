# Gödel dentro do Tubo: o que se vê de dentro, o que só se vê de fora.
# Uso: python -I -X utf8 -B godel.py
# O Z3 roda em processo separado e é encerrado no prazo (o "timeout" interno dele não segura essa conta).
from z3 import Ints, Solver


def procurar(fila):
    from z3 import Ints, Solver
    X, Y, Z = Ints('x y z')
    s = Solver()
    s.add(X**3 + Y**3 + Z**3 == 33)
    fila.put(str(s.check()))


if __name__ == '__main__':
    import multiprocessing as mp

    print('A. Uma verdade que existe, mas que de dentro não se alcança a tempo')
    x, y, z = 8866128975287528, -8778405442862239, -2736111468807040   # Booker, 2019
    print(f'   x³ + y³ + z³ = {x**3 + y**3 + z**3}   (conta exata com inteiros: é verdade)', flush=True)
    fila = mp.Queue()
    proc = mp.Process(target=procurar, args=(fila,))
    proc.start()
    proc.join(30)
    if proc.is_alive():
        proc.terminate()
        proc.join()
        print('   o Z3 procurando sozinho, 30 s: não achou e não conseguiu dizer que não existe (encerrado no prazo)')
    else:
        print('   o Z3 procurando sozinho: ' + fila.get())
    X, Y, Z = Ints('x y z')
    s = Solver()
    s.add(X**3 + Y**3 + Z**3 == 33, X == x, Y == y, Z == z)
    print(f'   o Z3 recebendo a resposta de fora para conferir: {s.check()} (instantâneo)', flush=True)

    print('\nB. Num mundo finito, tudo se decide no fim (por inspeção completa)')
    pares, horas = 15, 12
    tabela = {(p, h) for p in range(pares) for h in range(horas)}   # o estoque inteiro testado (o Tubo fechou)
    afirm = [
        ('todo par se encontrou em todas as 12 horas', all((p, h) in tabela for p in range(pares) for h in range(horas))),
        ('existe uma hora em que nenhum par se encontrou', any(all((p, h) not in tabela for p in range(pares)) for h in range(horas))),
    ]
    for nome, val in afirm:
        print(f'   "{nome}": {"verdadeira" if val else "falsa"} (conferidos todos os {pares * horas} casos)')
    print('   Com o estoque finito e todo testado, nenhuma afirmação sobre ele fica sem resposta.')
