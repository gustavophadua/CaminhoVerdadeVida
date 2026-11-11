"""Gera o conjunto fechado de avaliação de frases curtas (avaliacao-frases-v1) ou os exemplos públicos.

Uso:
  python -I -X utf8 -B gerar.py fechado SAIDA.jsonl   (120 itens, 40 por classe, vocabulário de profissões)
  python -I -X utf8 -B gerar.py publico SAIDA.jsonl   (12 itens, vocabulário de animais, para o repositório)

Cada linha: {"sal": hex, "padrao": nome, "item": {...}}. O sal (32 bytes) e a escolha das palavras vêm de os.urandom:
o gerador não guarda semente, e o arquivo de saída é a única cópia do conjunto. A classe de cada padrão é a esperada;
a conferência pelo Z3 (testes/avaliacao.test.ts com AVALIACAO_PRIVADA) é a que vale.
Este arquivo fica em privado/ (fora do Git): com ele e a semente, o conjunto se refaria.
"""
import json, os, random, sys

FECHADO = {
    'classes': [  # símbolo, masculino, feminino
        ('Medico', 'médico', 'médica'), ('Engenheiro', 'engenheiro', 'engenheira'), ('Professor', 'professor', 'professora'),
        ('Cozinheiro', 'cozinheiro', 'cozinheira'), ('Pintor', 'pintor', 'pintora'), ('Advogado', 'advogado', 'advogada'),
        ('Enfermeiro', 'enfermeiro', 'enfermeira'), ('Musico', 'músico', 'música'), ('Escritor', 'escritor', 'escritora'),
        ('Fotografo', 'fotógrafo', 'fotógrafa'), ('Bailarino', 'bailarino', 'bailarina'), ('Pescador', 'pescador', 'pescadora'),
        ('Juiz', 'juiz', 'juíza'), ('Atleta', 'atleta', 'atleta'), ('Cientista', 'cientista', 'cientista'),
        ('Arquiteto', 'arquiteto', 'arquiteta'), ('Jardineiro', 'jardineiro', 'jardineira'), ('Aluno', 'aluno', 'aluna'),
        ('Vizinho', 'vizinho', 'vizinha'), ('Carteiro', 'carteiro', 'carteira'), ('Padeiro', 'padeiro', 'padeira'),
        ('Marinheiro', 'marinheiro', 'marinheira'), ('Dentista', 'dentista', 'dentista'), ('Ator', 'ator', 'atriz'),
    ],
    'adjetivos': [
        ('Alegre', 'alegre'), ('Gentil', 'gentil'), ('Veloz', 'veloz'), ('Feliz', 'feliz'), ('Leal', 'leal'),
        ('Capaz', 'capaz'), ('Forte', 'forte'), ('Jovem', 'jovem'), ('Inteligente', 'inteligente'), ('Paciente', 'paciente'),
        ('Humilde', 'humilde'), ('Nobre', 'nobre'), ('Livre', 'livre'), ('Sensivel', 'sensível'), ('Agil', 'ágil'),
        ('Fiel', 'fiel'), ('Prudente', 'prudente'), ('Elegante', 'elegante'), ('Valente', 'valente'), ('Cordial', 'cordial'),
        ('Tenaz', 'tenaz'), ('Eficiente', 'eficiente'), ('Competente', 'competente'), ('Sociavel', 'sociável'),
    ],
    'pessoas': [
        ('ana', 'Ana', 'f'), ('bruno', 'Bruno', 'm'), ('carla', 'Carla', 'f'), ('davi', 'Davi', 'm'), ('elisa', 'Elisa', 'f'),
        ('fabio', 'Fábio', 'm'), ('gabriela', 'Gabriela', 'f'), ('hugo', 'Hugo', 'm'), ('iris', 'Íris', 'f'), ('joao', 'João', 'm'),
        ('lara', 'Lara', 'f'), ('marcos', 'Marcos', 'm'), ('nina', 'Nina', 'f'), ('otavio', 'Otávio', 'm'), ('paula', 'Paula', 'f'),
        ('rui', 'Rui', 'm'), ('sara', 'Sara', 'f'), ('tiago', 'Tiago', 'm'), ('vera', 'Vera', 'f'), ('caio', 'Caio', 'm'),
    ],
    'relacoes': [('Admira', 'admira'), ('Conhece', 'conhece'), ('Ajuda', 'ajuda'), ('Respeita', 'respeita'), ('Visita', 'visita'), ('Ensina', 'ensina')],
}
PUBLICO = {
    'classes': [
        ('Gato', 'gato', 'gata'), ('Cachorro', 'cachorro', 'cachorra'), ('Coelho', 'coelho', 'coelha'), ('Lobo', 'lobo', 'loba'),
        ('Pato', 'pato', 'pata'), ('Cavalo', 'cavalo', 'égua'), ('Urso', 'urso', 'ursa'), ('Macaco', 'macaco', 'macaca'),
    ],
    'adjetivos': [('Manso', 'manso'), ('Ruidoso', 'ruidoso'), ('Curioso', 'curioso'), ('Esperto', 'esperto')],
    'pessoas': [('rex', 'Rex', 'm'), ('mel', 'Mel', 'f'), ('tom', 'Tom', 'm'), ('luna', 'Luna', 'f'), ('bob', 'Bob', 'm'), ('nala', 'Nala', 'f')],
    'relacoes': [('Persegue', 'persegue'), ('Segue', 'segue')],
}


class Frase:
    """Monta frases e fórmulas com as palavras escolhidas para um item."""

    def __init__(self, vocab, rnd):
        self.rnd, self.vocab = rnd, vocab
        self.usados = {}

    def classe(self):
        return self._tirar('classes', lambda c: {'simbolo': c[0], 'tipo': 'predicado', 'aridade': 1, 'leitura': f'x é {c[1]}' + (f' ({c[2]})' if c[2] != c[1] else ''), 'm': c[1], 'f': c[2], 'sub': True})

    def adjetivo(self):
        if self.vocab is PUBLICO:  # os adjetivos dos exemplos públicos variam em gênero
            return self._tirar('adjetivos', lambda a: {'simbolo': a[0], 'tipo': 'predicado', 'aridade': 1, 'leitura': f'x é {a[1]}', 'm': a[1], 'f': a[1][:-1] + 'a', 'sub': False})
        return self._tirar('adjetivos', lambda a: {'simbolo': a[0], 'tipo': 'predicado', 'aridade': 1, 'leitura': f'x é {a[1]}', 'm': a[1], 'f': a[1], 'sub': False})

    def predicado(self):
        return self.classe() if self.rnd.random() < 0.5 else self.adjetivo()

    def pessoa(self):
        return self._tirar('pessoas', lambda p: {'simbolo': p[0], 'tipo': 'constante', 'aridade': 0, 'leitura': p[1], 'nome': p[1], 'g': p[2]})

    def relacao(self):
        return self._tirar('relacoes', lambda r: {'simbolo': r[0], 'tipo': 'predicado', 'aridade': 2, 'leitura': f'x {r[1]} y', 'verbo': r[1]})

    def _tirar(self, grupo, fazer):
        livres = [x for x in self.vocab[grupo] if x[0] not in self.usados]
        x = fazer(self.rnd.choice(livres))
        self.usados[x['simbolo']] = x
        return x

    def vocabulario(self):
        return [{k: t[k] for k in ('simbolo', 'tipo', 'aridade', 'leitura')} for t in self.usados.values()]


def _o(p, g='m'):  # predicado no gênero
    return p[g]


def todo(a, b): return f'Todo {a["m"]} é {b["m"]}.', f'∀x ({a["simbolo"]}(x) ⟹ {b["simbolo"]}(x))'
def nenhum(a, b): return f'Nenhum {a["m"]} é {b["m"]}.', f'∀x ({a["simbolo"]}(x) ⟹ ¬{b["simbolo"]}(x))'
def algum(a, b): return f'Algum {a["m"]} é {b["m"]}.', f'∃x ({a["simbolo"]}(x) ∧ {b["simbolo"]}(x))'
def algum_nao(a, b): return f'Algum {a["m"]} não é {b["m"]}.', f'∃x ({a["simbolo"]}(x) ∧ ¬{b["simbolo"]}(x))'
def nem_todo(a, b): return f'Nem todo {a["m"]} é {b["m"]}.', f'¬∀x ({a["simbolo"]}(x) ⟹ {b["simbolo"]}(x))'
def eh(c, p): return f'{c["nome"]} é {p[c["g"]]}.', f'{p["simbolo"]}({c["simbolo"]})'
def nao_eh(c, p): return f'{c["nome"]} não é {p[c["g"]]}.', f'¬{p["simbolo"]}({c["simbolo"]})'
def nao_verdade_nao(c, p): return f'Não é verdade que {c["nome"]} não é {p[c["g"]]}.', f'¬¬{p["simbolo"]}({c["simbolo"]})'
def ou(c, p, q): return f'{c["nome"]} é {p[c["g"]]} ou {q[c["g"]]}.', f'{p["simbolo"]}({c["simbolo"]}) ∨ {q["simbolo"]}({c["simbolo"]})'
def se(c, p, d, q): return f'Se {c["nome"]} é {p[c["g"]]}, então {d["nome"]} é {q[d["g"]]}.', f'{p["simbolo"]}({c["simbolo"]}) ⟹ {q["simbolo"]}({d["simbolo"]})'
def so_se(c, p, q): return f'{c["nome"]} é {p[c["g"]]} só se é {q[c["g"]]}.', f'{p["simbolo"]}({c["simbolo"]}) ⟹ {q["simbolo"]}({c["simbolo"]})'
def rel(c, r, d): return f'{c["nome"]} {r["verbo"]} {d["nome"]}.', f'{r["simbolo"]}({c["simbolo"]}, {d["simbolo"]})'
def todo_rel_algum(a, r, b): return f'Todo {a["m"]} {r["verbo"]} algum {b["m"]}.', f'∀x ({a["simbolo"]}(x) ⟹ ∃y ({b["simbolo"]}(y) ∧ {r["simbolo"]}(x, y)))'
def algum_todos(a, r, b): return f'Há um {b["m"]} que todo {a["m"]} {r["verbo"]}.', f'∃y ({b["simbolo"]}(y) ∧ ∀x ({a["simbolo"]}(x) ⟹ {r["simbolo"]}(x, y)))'


def padroes(f):
    """Cada padrão: (classe esperada, nome, função que devolve premissas e conclusão)."""
    C, P, X, R = f.classe, f.predicado, f.pessoa, f.relacao
    def p(classe, nome, montar): return (classe, nome, montar)
    return [
        p('segue', 'barbara', lambda: (lambda a, b, c: ([todo(a, b), todo(b, c)], todo(a, c)))(C(), C(), P())),
        p('segue', 'modus-ponens', lambda: (lambda a, b, c: ([todo(a, b), eh(c, a)], eh(c, b)))(C(), P(), X())),
        p('segue', 'modus-tollens', lambda: (lambda a, b, c: ([todo(a, b), nao_eh(c, b)], nao_eh(c, a)))(C(), P(), X())),
        p('segue', 'celarent', lambda: (lambda a, b, c: ([nenhum(a, b), todo(c, a)], nenhum(c, b)))(C(), P(), C())),
        p('segue', 'silogismo-disjuntivo', lambda: (lambda c, a, b: ([ou(c, a, b), nao_eh(c, a)], eh(c, b)))(X(), P(), P())),
        p('segue', 'conversao-algum', lambda: (lambda a, b: ([algum(a, b)], algum(b, a)))(C(), C())),
        p('segue', 'algum-nao-nem-todo', lambda: (lambda a, b: ([algum_nao(a, b)], nem_todo(a, b)))(C(), P())),
        p('segue', 'dupla-negacao', lambda: (lambda c, a: ([nao_verdade_nao(c, a)], eh(c, a)))(X(), P())),
        p('segue', 'escopo-forte', lambda: (lambda a, r, b: ([algum_todos(a, r, b)], todo_rel_algum(a, r, b)))(C(), R(), C())),
        p('segue', 'contrapositiva', lambda: (lambda c, a, d, b: ([se(c, a, d, b), nao_eh(d, b)], nao_eh(c, a)))(X(), P(), X(), P())),
        p('segue', 'so-se', lambda: (lambda c, a, b: ([so_se(c, a, b), eh(c, a)], eh(c, b)))(X(), P(), P())),
        p('segue', 'instancia-existe', lambda: (lambda a, b, c: ([todo(a, b), eh(c, a)], algum(a, b)))(C(), P(), X())),
        p('segue', 'conversao-nenhum', lambda: (lambda a, b: ([nenhum(a, b)], nenhum(b, a)))(C(), C())),
        p('contradiz', 'todo-instancia-negada', lambda: (lambda a, b, c: ([todo(a, b), eh(c, a)], nao_eh(c, b)))(C(), P(), X())),
        p('contradiz', 'nenhum-instancia', lambda: (lambda a, b, c: ([nenhum(a, b), eh(c, a)], eh(c, b)))(C(), P(), X())),
        p('contradiz', 'todo-nem-todo', lambda: (lambda a, b: ([todo(a, b)], nem_todo(a, b)))(C(), P())),
        p('contradiz', 'algum-nenhum', lambda: (lambda a, b: ([algum(a, b)], nenhum(a, b)))(C(), P())),
        p('contradiz', 'disjuntivo-negado', lambda: (lambda c, a, b: ([ou(c, a, b), nao_eh(c, a)], nao_eh(c, b)))(X(), P(), P())),
        p('contradiz', 'cadeia-negada', lambda: (lambda a, b, c, d: ([todo(a, b), todo(b, c), eh(d, a)], nao_eh(d, c)))(C(), C(), P(), X())),
        p('contradiz', 'condicional-negado', lambda: (lambda c, a, d, b: ([se(c, a, d, b), eh(c, a)], nao_eh(d, b)))(X(), P(), X(), P())),
        p('contradiz', 'algum-nao-todo', lambda: (lambda a, b: ([algum_nao(a, b)], todo(a, b)))(C(), P())),
        p('contradiz', 'nenhum-algum', lambda: (lambda a, b: ([nenhum(a, b)], algum(a, b)))(C(), P())),
        p('independente', 'afirmar-consequente', lambda: (lambda a, b, c: ([todo(a, b), eh(c, b)], eh(c, a)))(C(), P(), X())),
        p('independente', 'negar-antecedente', lambda: (lambda a, b, c: ([todo(a, b), nao_eh(c, a)], nao_eh(c, b)))(C(), P(), X())),
        p('independente', 'conversao-ilicita', lambda: (lambda a, b: ([todo(a, b)], todo(b, a)))(C(), C())),
        p('independente', 'import-existencial', lambda: (lambda a, b: ([todo(a, b)], algum(a, b)))(C(), P())),
        p('independente', 'escopo-fraco', lambda: (lambda a, r, b: ([todo_rel_algum(a, r, b)], algum_todos(a, r, b)))(C(), R(), C())),
        p('independente', 'relacao-nao-transitiva', lambda: (lambda c, r, d, e: ([rel(c, r, d), rel(d, r, e)], rel(c, r, e)))(X(), R(), X(), X())),
        p('independente', 'algum-todo', lambda: (lambda a, b: ([algum(a, b)], todo(a, b)))(C(), P())),
        p('independente', 'termo-medio-nao-distribuido', lambda: (lambda a, b, c: ([todo(a, b), todo(c, b)], todo(a, c)))(C(), P(), C())),
        p('independente', 'so-se-invertido', lambda: (lambda c, a, b: ([so_se(c, a, b), eh(c, b)], eh(c, a)))(X(), P(), P())),
        p('independente', 'ou-inclusivo', lambda: (lambda c, a, b: ([ou(c, a, b), eh(c, a)], nao_eh(c, b)))(X(), P(), P())),
        p('independente', 'dois-algum', lambda: (lambda a, b, c: ([algum(a, b), algum(b, c)], algum(a, c)))(C(), C(), P())),
    ]


def gerar(vocab, por_classe, prefixo):
    rnd = random.Random(os.urandom(32))
    linhas, n = [], 0
    for classe in ('segue', 'contradiz', 'independente'):
        nomes = [nome for c, nome, _ in padroes(Frase(vocab, rnd)) if c == classe]
        rnd.shuffle(nomes)
        for i in range(por_classe):
            f = Frase(vocab, rnd)
            _, nome, montar = next(x for x in padroes(f) if x[1] == nomes[i % len(nomes)])
            premissas, conclusao = montar()
            n += 1
            item = {'id': f'{prefixo}-{n:03d}', 'texto': {'premissas': [p[0] for p in premissas], 'conclusao': conclusao[0]},
                    'vocabulario': f.vocabulario(), 'gabarito': {'premissas': [p[1] for p in premissas], 'conclusao': conclusao[1], 'classe': classe}}
            linhas.append({'sal': os.urandom(32).hex(), 'padrao': nome, 'item': item})
    rnd.shuffle(linhas)
    for i, l in enumerate(linhas):  # ids na ordem final, para a ordem não denunciar a classe
        l['item']['id'] = f'{prefixo}-{i + 1:03d}'
    return linhas


if __name__ == '__main__':
    modo, saida = sys.argv[1], sys.argv[2]
    if os.path.exists(saida):
        sys.exit(f'{saida} já existe: o conjunto não se refaz por cima')
    linhas = gerar(FECHADO, 40, 'F') if modo == 'fechado' else gerar(PUBLICO, 4, 'P')
    with open(saida, 'w', encoding='utf-8', newline='\n') as arq:
        for l in linhas:
            arq.write(json.dumps(l, ensure_ascii=False) + '\n')
    print(len(linhas), 'itens em', saida)
