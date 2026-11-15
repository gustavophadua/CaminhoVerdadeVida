# 15/11/2026 — Língua secreta v34 — Regra registrada antes de contar; média geral não fixa subgrupo

Esta versão parte do Todo 52 do GPT, "Ajustar o teste com os lotes anteriores", conferido pelo SHA-256 `87fa903ac6c415bf967edc48368050b4ccce39adbeff2ad01ac5ce69fe5d9698`. O Todo 52 segue o próximo ponto da v33 (usar um conjunto já fechado para escolher a regra do seguinte), cita a v33 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 52 estabelece:
- Uma regra λₜ fixada só com o histórico registrado antes do lote preserva a garantia em qualquer instante (Ville).
- Escolher a regra depois de ver o lote atual quebra a garantia.
- A média marginal não garante a média condicional: duas condições podem ter médias 0 e 2/475 com média geral 1/475.
- λₜ deve ser gravado com o identificador do lote antes de se obter o W dele.

**Desvio declarado.** A supermartingala e a desigualdade de Ville do Todo 52 são probabilísticas. A tradução fica com o que vale no censo:
- a regra tem de estar registrada antes da contagem, e a ordem se prova pelos carimbos (v7);
- escolher a regra no próprio lote troca o resultado;
- a média geral de dois subgrupos não decide cada subgrupo, só a contagem separada decide.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 52 | Língua secreta |
|---|---|
| λₜ fixado com Fₜ₋₁ | regra (soma ou veto, v32) escolhida com o histórico de conjuntos já fechados (v33) |
| gravar λₜ antes de obter Wₜ | carimbo da regra (tl) antes do carimbo da contagem (tcc), com folga maior que o erro e do relógio (v7, v9) |
| escolher λ depois de ver o lote | aplicar ao conjunto atual a regra que o certifica, em vez da registrada |
| média marginal vs. condicional | fração geral de dois subgrupos (por exemplo, duas plataformas ou dois públicos) vs. fração de cada subgrupo |

## 2. Consultas no Z3 (v34)

Cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["REGRA_ANTES_DA_CONTAGEM",["e ≥ 0","tl + e < tcc − e","rr ≤ tl + e","rc ≥ tcc − e"],"rr < rc","SEGUE",["sat","sat","unsat"],0],
["REGRA_NO_PROPRIO_LOTE",["sw = 3","nmax = 1","rv = 1","(rv = 1) ⟹ (cr = 0)","(nmax ≥ 1) ⟹ (cv = 0)","(sw ≤ 4) ⟹ (cs = 1)","ce = cs"],"ce = cr","CONTRADIZ",["sat","unsat","sat"],0],
["MEDIA_GERAL_NAO_FIXA_SUBGRUPO",["fa ≥ 0","fb ≥ 0","fa ≤ 1","fb ≤ 1","(fa + fb) / 2 = 1 / 20"],"fa ≤ 1 / 20","EM ABERTO",["sat","sat","sat"],0],
["SUBGRUPO_CONTADO",["fa = 1 / 50","fb = 2 / 25","(fa + fb) / 2 = 1 / 20"],"fa ≤ 1 / 20","SEGUE",["sat","sat","unsat"],0],
["SUBGRUPO_CONTADO_FALHA",["fa = 1 / 50","fb = 2 / 25","(fa + fb) / 2 = 1 / 20"],"fb ≤ 1 / 20","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **REGRA_ANTES_DA_CONTAGEM.** Quando o carimbo da regra antecede o da contagem por mais que o erro do relógio, a regra real foi fixada antes da contagem real. É a forma do "gravar λₜ antes de obter Wₜ", provada pelos carimbos (v7).
- **REGRA_NO_PROPRIO_LOTE.** A regra registrada a partir do histórico é veto (rv = 1). No conjunto atual, com um fio no máximo, ela dá cr = 0. A regra escolhida depois de ver o conjunto, a soma, dá ce = 1. Afirmar que as duas certificações coincidem **contradiz** os fatos. É o análogo de ESCOLHA_ATUAL.
- **MEDIA_GERAL_NAO_FIXA_SUBGRUPO.** Com fração geral de 1/20 entre dois subgrupos, a afirmação "o subgrupo A está dentro da meta" fica EM ABERTO. É o análogo de MEDIA_MARGINAL.
- **SUBGRUPO_CONTADO e SUBGRUPO_CONTADO_FALHA.** Com os subgrupos contados separadamente (1/50 e 2/25), A está dentro da meta e afirmar o mesmo de B **contradiz** a contagem, embora a média geral seja exatamente 1/20.

## 3. Consequência para a língua secreta

1. **Usar o histórico para escolher a regra é legítimo, se a regra for registrada antes.** O registro da regra, com identificador do conjunto e carimbo, precisa anteceder a contagem por mais que o erro do relógio. Sem essa ordem provada, o resultado fica EM ABERTO (v7, v9).
2. **A regra do conjunto não é escolhida no próprio conjunto.** Mesmo que a regra escolhida depois pareça "melhor", o resultado registrado é o da regra fixada antes.
3. **Média geral não protege subgrupos.** Uma meta cumprida no agregado pode esconder um subgrupo fora dela, como uma plataforma, um público ou uma janela de tempo. Se a pergunta é sobre um subgrupo, ele é contado separadamente, e os subgrupos são declarados antes (v26, v33).
4. **O caso individual continua fora** (v24 a v33).
5. **Paralelo com o GPT:**
   - **GPT:** λ fixado com o histórico preserva a garantia; escolher no lote atual dá esperança 1 + 1/1425 > 1; a média marginal deixa a condicional EM ABERTO.
   - **Esta série:** regra carimbada antes; a regra do próprio lote contradiz a registrada; a média geral deixa o subgrupo EM ABERTO e a contagem separada decide.

## 4. Próximo ponto

O Todo 52 propõe uma variante com teto λ < 1 que preserve um fator positivo em todo lote. No censo, o equivalente é uma regra adaptativa que nunca vire veto total. O histórico pode mudar o peso dos fios no limite, mas a regra declarada continua sendo de soma (v32). Assim, um único fio viral depois de conjuntos limpos não apaga o conjunto inteiro.

## Integridade

- SHA-256 do Todo 52, conferido nos bytes contra o `.sha256` do GPT: `87fa903ac6c415bf967edc48368050b4ccce39adbeff2ad01ac5ce69fe5d9698`.
- SHA-256 da v33 desta série: `0ca1ae08c718e572669148518346ffa340593853e3a3277225a8a3bfc4bd7b10`.
- Commit remoto de partida: `906a3d98ee5674974debe4bdbc2adf2b77413778`, que contém o Todo 52 (conferido com `git ls-tree`).
- O hash desta v34 está no arquivo `.sha256` ao lado.
