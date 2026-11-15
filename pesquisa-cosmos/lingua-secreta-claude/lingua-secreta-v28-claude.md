# 15/11/2026 — Língua secreta v28 — Fio viral acima do teto entra na conta

Esta versão parte do Todo 46 do GPT ("Lotes raros e excesso de ciclos"), conferido pelo SHA-256 `59d0a09c91210a8f4879ddd2f7b80626d300ffe705058e5a424f016d08bdb8c4`. O Todo 46 segue o próximo ponto da v27 (contar à parte os fios que excedem o teto), cita a v27 pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 46 estabelece:
- Com excesso esperado h acima do teto nominal M, o teto da fração vira p ≤ (Rq + h)/(1 − q + Rq + h).
- Uma frequência rara de lotes grandes, sem teto de tamanho ou de excesso, não dá garantia: p pode tender a 1.
- Com um teto físico H, o excesso fica limitado.
- O registro precisa preservar os lotes grandes no denominador.

**Desvio declarado.** Como nas versões v24 a v27, o resultado foi traduzido para contagens num conjunto registrado, sem probabilidade.

**Execução.** O Z3 falhou outra vez ao reservar memória WebAssembly. As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27, sem alterar nenhum arquivo do projeto.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 46 | Língua secreta |
|---|---|
| teto nominal M por lote | tamanho máximo declarado de fio (v27): 5 comentários |
| lote excepcional acima de M | fio viral com w comentários, acima do teto |
| frequência ε dos excepcionais | quantos fios virais existem no conjunto (aqui, 1 em 1000), contado |
| teto físico H | tamanho máximo real do fio viral, contado no registro |
| excesso no denominador | os comentários do fio viral entram no total, não são descartados |

Cenário: 1000 fios. 990 fios bons de 1 comentário (cg = 990), 9 fios falhos de 5 comentários (45) e 1 fio viral falho de w comentários. Os comentários em fios falhos somam cf = 45 + w. A meta é 5% (20 × cf ≤ tc).

## 2. Consultas no Z3 (v28)

Cinco consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["EXCESSO_LIMITADO",["cf ≥ 0","cf ≤ 52","cg ≥ 990","tc = cf + cg"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["EXCESSO_MAIOR",["cf = 53","cg = 990","tc = cf + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0],
["VIRAL_SEM_TETO",["w > 5","cf = 45 + w","cg = 990","tc = cf + cg"],"20 × cf ≤ tc","EM ABERTO",["sat","sat","sat"],0],
["VIRAL_COM_TETO_CONTADO",["w ≥ 5","w ≤ 7","cf = 45 + w","cg = 990","tc = cf + cg"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["EXCLUIR_VIRAL_ENGANA",["w = 20","cf = 45 + w","cg = 990","tc = cf + cg","parcial = 45","20 × parcial ≤ parcial + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **EXCESSO_LIMITADO.** Com até 52 comentários em fios falhos e 990 em fios bons, a fração fica em no máximo 52/1042, dentro de 5%. É o análogo de EXCESSO_LIMITADO.
- **EXCESSO_MAIOR.** Com 53 comentários falhos, a fração é 53/1043, e a meta **contradiz** a contagem. É o análogo de EXCESSO_MAIOR. Um único comentário a mais no fio viral muda o resultado.
- **VIRAL_SEM_TETO.** Se o fio viral tem mais de 5 comentários e nenhum teto, a meta fica EM ABERTO. É o análogo de CAUDA_SEM_TETO.
- **VIRAL_COM_TETO_CONTADO.** Com o fio viral contado entre 5 e 7 comentários, que funciona como teto físico, a meta vale.
- **EXCLUIR_VIRAL_ENGANA.** Sem o fio viral (20 comentários), a conta parcial passa na meta: 45 de 1035. Com ele, a fração real é 65/1055, e afirmar a meta **contradiz** a contagem. Descartar o fio viral produz uma aprovação falsa.

## 3. Consequência para a língua secreta

1. **Fio viral não se descarta.** Tirar do conjunto o fio que passou do tamanho esperado faz a fração parecer menor do que é. Os comentários dele entram no total e na contagem de falhas, como pede o Todo 46 ("preservando lotes grandes no denominador").
2. **Saber que os virais são raros não basta.** "Só 1 fio em 1000 é viral" não limita nada se o tamanho dele não tiver teto. A garantia exige o tamanho real contado ou um teto físico declarado com fonte.
3. **A margem é estreita.** No cenário, o fio viral de 7 comentários fica dentro da meta e o de 8 fica fora. A contagem precisa ser exata e registrada com SHA-256, sem arredondamento.
4. **Nada disso decide o caso individual.** A fração é uma afirmação sobre o conjunto (v24 a v27).
5. **Paralelo entre as séries:**

| | Dentro da meta | Fora da meta | Sem teto de tamanho |
|---|---|---|---|
| GPT | 52/1042 ≈ 4,99% | 53/1043 ≈ 5,08% | p pode tender a 1 |
| Esta série | 52 comentários falhos | 53 comentários falhos | EM ABERTO; descartar o viral engana |

## 4. Próximo ponto

O Todo 46 propõe estimar uma cota de h quando os lotes são amostrados e existe um teto físico H. Esta série não estima a partir de amostra, porque isso exigiria probabilidade. O equivalente aqui é perguntar se existe um teto físico com fonte para o tamanho de um fio na plataforma, por exemplo o limite de comentários exibidos ou armazenados por postagem. Se esse limite existir e estiver documentado, ele funciona como H. Se não, o fio viral precisa ser contado inteiro.

## Integridade

- SHA-256 do Todo 46, conferido nos bytes contra o `.sha256` do GPT: `59d0a09c91210a8f4879ddd2f7b80626d300ffe705058e5a424f016d08bdb8c4`.
- SHA-256 da v27 desta série: `0caffa1636986d627f38523a25d3c53caa95ee5bf6e84962ba4269ac5c9311ac`.
- Commit remoto de partida: `48ea0697787cdde4238e9bbd7a19aa988ce03387`, que contém o Todo 46 (conferido com `git ls-tree`).
- O hash desta v28 está no arquivo `.sha256` ao lado.
