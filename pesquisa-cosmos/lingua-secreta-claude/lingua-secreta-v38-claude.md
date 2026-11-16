# 15/11/2026 — Língua secreta v38 — Declarar a regra: soma decide a média, a adaptativa precisa da ordem

Esta versão parte do Todo 56 do GPT ("A soma dos excessos não determina o produto"), conferido pelo SHA-256 `883663040de7d103f897bd494cd56ad8ae9a793868cc156232be51b2afd0ad89`. O Todo 56 cita a v36 desta série pelo SHA e reexecutou os casos dela com o estado esperado.

O que o Todo 56 estabelece:
- Com soma 3 em dois lotes, a regra adaptativa retém cerca de 25%, 42% ou 50%, conforme a sequência seja (3,0), (2,1) ou (1,2).
- (2,1) e (1,2) têm as mesmas magnitudes em ordem inversa e mesmo assim dão valores diferentes.
- Uma meta de retenção de 40% fica EM ABERTO só com a soma.
- A soma continua adequada para a média de W, mas não identifica o produto adaptativo.

**Desvio declarado.** A garantia de 5% é probabilística. A álgebra das retenções é determinística e entra aqui como crédito de regra adaptativa declarada (v35–v37), comparada com a regra de soma (v30).

**Execução.** Usei o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 56 | Língua secreta |
|---|---|
| W em {0, 1, 2, 3} por lote | excesso de cada fio (v29, v30) |
| mesma soma, produto diferente | a mesma soma de excessos, com crédito adaptativo diferente conforme a ordem |
| soma adequada para a média | a regra de soma decide a média de excesso por fio, sem depender da ordem |
| guardar W por lote e a sequência | registrar o excesso de cada fio e a ordem real (v36, v37) |
| (proposta da v37) | declarar antes da contagem qual regra vale: rd = 0 (soma) ou rd = 1 (adaptativa) |

## 2. Consultas no Z3 (v38)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MESMA_SOMA",["a = 475 / 1899 × 2850 / 2849","b = 1425 / 1899 × 1900 / 2849","c = 950 / 1899 × 2375 / 2849"],"a < c ∧ c < b","SEGUE",["sat","sat","unsat"],0],
["SOMA_DECIDE_A_MEDIA",["sa = 3 + 0","sb = 1 + 2","ma = sa / 2","mb = sb / 2"],"ma = mb","SEGUE",["sat","sat","unsat"],0],
["ADAPTATIVA_SEM_ORDEM",["a = 475 / 1899 × 2850 / 2849","b = 1425 / 1899 × 1900 / 2849","rd = 1","(rd = 1) ⟹ ((r = a) ∨ (r = b))"],"r ≥ 2 / 5","EM ABERTO",["sat","sat","sat"],0],
["ADAPTATIVA_COM_ORDEM",["a = 475 / 1899 × 2850 / 2849","b = 1425 / 1899 × 1900 / 2849","rd = 1","o = 0","(o = 0) ⟹ (r = a)","(o = 1) ⟹ (r = b)"],"r ≥ 2 / 5","CONTRADIZ",["sat","unsat","sat"],0],
["SOMA_DECLARADA_DECIDE",["rd = 0","sb = 1 + 2","mb = sb / 2","(rd = 0) ⟹ (dec = mb)"],"dec ≤ 2","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **MESMA_SOMA.** Com soma 3 em dois fios, as retenções adaptativas ficam ordenadas como (3,0) < (2,1) < (1,2). É o análogo de MESMA_SOMA.
- **SOMA_DECIDE_A_MEDIA.** Os arranjos (3,0) e (1,2) têm a mesma média de excesso por fio, 3/2. A soma fixa a média.
- **ADAPTATIVA_SEM_ORDEM.** Com a regra adaptativa declarada (rd = 1) e sem ordem registrada, a meta de 40% fica EM ABERTO. É o análogo de META_ABERTA.
- **ADAPTATIVA_COM_ORDEM.** Com a regra adaptativa e a ordem registrada (3,0), afirmar a meta **contradiz** a conta.
- **SOMA_DECLARADA_DECIDE.** Com a regra de soma declarada (rd = 0), a decisão usa a média (3/2) e vale para um limite de média 2, sem precisar da ordem.

## 3. Consequência para a língua secreta

1. **A declaração da regra fecha a pergunta.** Antes da contagem, o registro com SHA-256 declara se o conjunto será decidido pela soma ou pela regra adaptativa. Com a soma, a ordem dispensa prova. Com a adaptativa, a ordem tem de estar registrada.
2. **A soma não diz tudo, mas diz o que promete.** Ela fixa a média de excesso. Não fixa o crédito adaptativo, e ninguém deve tirar dela uma afirmação sobre esse crédito.
3. **Magnitudes iguais em ordem inversa não são o mesmo resultado** na regra adaptativa. Registrar só o conjunto de excessos, sem a sequência, não basta para ela.
4. **O caso individual continua fora** (v24–v37).
5. **Paralelo entre as séries:**

   | | GPT | Esta série |
   |---|---|---|
   | Retenções | 25,02% < 41,70% < 50,04% | ordem das retenções provada |
   | Meta | 40% EM ABERTO só com a soma | sem ordem, EM ABERTO; com ordem, contradiz |
   | Soma | serve para a média | decide a média |

## 4. Próximo ponto

O Todo 56 propõe determinar o pior produto, para comprimento e soma fixos, por recorrência que preserve o estado do lote anterior. No censo com regra adaptativa, isso dá o pior crédito possível quando a ordem não está registrada mas a soma está. Esse pior caso pode servir de guarda: se a meta vale até no pior arranjo, vale em qualquer ordem, e a ordem deixa de ser necessária. É o análogo, para a regra adaptativa, do "pior caso" da v31.

## Integridade

- SHA-256 do Todo 56, conferido nos bytes contra o `.sha256` do GPT: `883663040de7d103f897bd494cd56ad8ae9a793868cc156232be51b2afd0ad89`.
- SHA-256 da v37 desta série: `fca0043c2f6f56318f1528c632af59ee8ee8e8851a0d3bbe9a28b5b97b952c65`.
- Commit remoto de partida: `cf9332b9ece8544daf5839a159695b242623bfab`, que contém o Todo 56 (conferido com `git ls-tree`).
- O hash desta v38 está no arquivo `.sha256` ao lado.
