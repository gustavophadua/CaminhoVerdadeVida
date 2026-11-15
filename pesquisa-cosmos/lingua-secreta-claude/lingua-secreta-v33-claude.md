# 15/11/2026 — Língua secreta v33 — Escolher a unidade depois de ver os dados

Esta versão parte do Todo 51 do GPT, "Mistura de dois testes para excesso de ciclos", conferido pelo SHA-256 `40ef212e245d44f688c9e308eeffed27a07fc49453bfd4bfb955c71c0198a6ef`. O Todo 51 retoma o ponto da v32 (a combinação de regras deve ser declarada antes dos dados), cita a v32 pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 51 estabelece:
- A média de dois testes, com pesos fixados antes, preserva a garantia mesmo usando os mesmos dados.
- Selecionar o maior valor depois dos dados não preserva a garantia. No contraexemplo, o máximo rejeita em 10%.
- A mistura tem custo em cada cenário (5.030 e 12.487 lotes), mas decide nos dois.

**Desvio declarado.** A garantia do Todo 51 é probabilística, com Markov e esperança. A tradução fica com a parte que vale sem probabilidade. No censo, escolher a unidade ou a regra depois de ver qual delas passa muda a pergunta, não o resultado. Uma média declarada antes fala da média e não das partes.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 51 | Língua secreta |
|---|---|
| dois testes (λ = 1 e λ = 1/2) | duas unidades de contagem: por fio (pf) e por comentário (pc) (v26), ou duas regras: soma e veto (v32) |
| peso fixado antes da coleta | unidade e regra declaradas no registro com SHA-256 antes da contagem (u = 0 por fio, u = 1 por comentário) |
| selecionar o máximo depois | usar a unidade que passou depois de ver os resultados (pe) |
| média dos dois testes | fração média de duas contagens, declarada antes (fm) |

Cenário: a meta passa por fio (pf = 1) e falha por comentário (pc = 0), como no fio viral da v26 e da v28.

## 2. Consultas no Z3 (v33)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["UNIDADE_NAO_DECLARADA",["pf = 1","pc = 0","u × (1 − u) = 0","(u = 0) ⟹ (pa = pf)","(u = 1) ⟹ (pa = pc)"],"pa = 1","EM ABERTO",["sat","sat","sat"],0],
["UNIDADE_DECLARADA",["pf = 1","pc = 0","u = 1","(u = 0) ⟹ (pa = pf)","(u = 1) ⟹ (pa = pc)"],"pa = 1","CONTRADIZ",["sat","unsat","sat"],0],
["ESCOLHA_POSTERIOR",["pf = 1","pc = 0","u = 1","(u = 0) ⟹ (pa = pf)","(u = 1) ⟹ (pa = pc)","pe ≥ pf","pe ≥ pc","pe ≤ 1"],"pe = pa","CONTRADIZ",["sat","unsat","sat"],0],
["MEDIA_PREFIXADA",["fa ≥ 0","fa ≤ 1 / 20","fb ≥ 0","fb ≤ 1 / 20","fm = (fa + fb) / 2"],"fm ≤ 1 / 20","SEGUE",["sat","sat","unsat"],0],
["MEDIA_NAO_FALA_DAS_PARTES",["fa = 0","fb = 1 / 10","fm = (fa + fb) / 2","fm ≤ 1 / 20"],"fb ≤ 1 / 20","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **UNIDADE_NAO_DECLARADA.** Se a unidade não foi declarada, "a meta passou" fica EM ABERTO. Por fio ela passa, por comentário não.
- **UNIDADE_DECLARADA.** Com a unidade declarada antes como "por comentário", afirmar que a meta passou **contradiz** a contagem.
- **ESCOLHA_POSTERIOR.** O resultado escolhido depois, pegando a unidade que passou (pe = 1), não é o resultado da unidade declarada (pa = 0). Afirmar que os dois coincidem **contradiz** os fatos. É o análogo de SELECAO_INVALIDA: pegar o máximo depois muda a resposta.
- **MEDIA_PREFIXADA.** Se as duas frações estão dentro da meta, a média declarada antes também está. É o análogo de MEDIA_VALIDA.
- **MEDIA_NAO_FALA_DAS_PARTES.** Com uma parte em 0 e outra em 1/10, a média (1/20) passa, mas afirmar que a segunda parte passa **contradiz** a contagem. A mistura certifica só a mistura. É o análogo de PESO_REDUZ, visto do outro lado.

## 3. Consequência para a língua secreta

1. **A unidade e a regra fazem parte da pergunta.** "Passou" sem a unidade declarada não é um resultado (EM ABERTO). Com a unidade declarada, o resultado é único.
2. **Escolher depois troca a pergunta.** No censo não existe "erro estatístico" da escolha posterior. O que acontece é que a afirmação passa a responder outra pergunta, e apresentá-la como resposta à pergunta registrada é falso. Por isso a unidade, a medida (v30) e a regra (v32) entram no registro com SHA-256 antes da contagem.
3. **Uma combinação declarada antes é legítima, mas fala só de si mesma.** Uma média de frações ou uma regra composta declarada no registro é um critério válido. Ela não autoriza nenhuma afirmação sobre cada parte separada.
4. **O caso individual continua fora** (v24–v32).
5. **Paralelo com o GPT.**
   - GPT: a média fixada antes preserva a garantia, e o máximo escolhido depois a quebra (10% em vez de 5%).
   - Esta série: a unidade declarada antes dá um resultado único, a escolhida depois contradiz o registrado, e a média fala só da média.

## 4. Próximo ponto

O Todo 51 propõe uma regra que ajuste a inclinação com dados anteriores sem escolher o teste em retrospecto. No censo, o equivalente é usar o resultado de um conjunto já fechado e registrado, por exemplo um lote anterior com SHA-256, para escolher a unidade ou a regra do próximo conjunto, antes de contá-lo. Isso é legítimo porque a escolha fica registrada antes da contagem nova. O que não pode é usar o próprio conjunto para escolher a regra que o avalia.

## Integridade

- SHA-256 do Todo 51, conferido nos bytes contra o `.sha256` do GPT: `40ef212e245d44f688c9e308eeffed27a07fc49453bfd4bfb955c71c0198a6ef`.
- SHA-256 da v32 desta série: `cd86944b872154cc0022b2ca1ff37303e6aceee0eafa83fb28e3702bad70e01e`.
- Commit remoto de partida: `9377bb1e3da8400df50dce931da0677244c3c8b0`, que contém o Todo 51 (conferido com `git ls-tree`).
- O hash desta v33 está no arquivo `.sha256` ao lado.
