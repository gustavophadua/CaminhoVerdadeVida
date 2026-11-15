# 15/11/2026 — Língua secreta v29 — Teto físico contado, não teto de exibição

Esta versão parte do Todo 47 do GPT, "Quantos lotes sustentam a cota de excesso?", conferido pelo SHA-256 `f34061b05f38763b8fe473636dd0fa35dea8f0a43a1683d85cb07378edb6d0bc`. O Todo 47 retoma o ponto da v28 de que um teto de exibição só serve se limitar a quantidade avaliada de fato, cita a v28 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 47 estabelece:
- Com teto físico H = 8 e teto nominal M = 5, o excesso fica limitado por 3ε.
- Para cumprir a meta, basta ε ≤ 1/1425.
- Com amostragem independente, são necessários 4.268 lotes sem excesso para sustentar essa cota com 95%.
- Sem a premissa sobre H, a mesma ε deixa a conclusão EM ABERTO.
- O tamanho tem de ser contado na fonte, inclusive quando o registro de saída trunca o lote.

**Desvio declarado.** A cota amostral de 4.268 lotes depende de probabilidade e de independência, e esta série não usa essas premissas. A tradução trabalha com o **conjunto registrado inteiro**: cada fio contado, sem amostra.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 47 | Língua secreta |
|---|---|
| teto nominal M = 5 | tamanho máximo declarado de fio (v27, v28) |
| teto físico certificado H = 8 | o maior tamanho que um fio pode ter de fato, contado na fonte: até 3 comentários de excesso por fio viral |
| ε: fração de lotes acima de M | nv: número de fios virais no conjunto, contado |
| registro de saída que trunca o lote | a plataforma mostra só parte dos comentários do fio |
| amostra de n lotes | contar só parte dos fios do conjunto |

Cenário: 1425 fios. No máximo 14 fios falhos, cerca de 1%, com até 5 comentários cada. Os fios bons somam ao menos 1411 comentários. Há no máximo 1 fio viral, com excesso de no máximo 3 × nv. Meta: 5% (20 × cf ≤ tc).

## 2. Consultas no Z3 (v29)

Foram 4 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TETO_FISICO_CONTADO",["ff ≤ 14","nv ≥ 0","nv ≤ 1","ex ≥ 0","ex ≤ 3 × nv","cf ≥ 0","cf ≤ 5 × ff + ex","cg ≥ 1411","tc = cf + cg"],"20 × cf ≤ tc","SEGUE",["sat","sat","unsat"],0],
["SEM_TETO",["nv = 1","ex ≥ 3","cf = 70 + ex","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","EM ABERTO",["sat","sat","sat"],0],
["TRUNCADO_ENGANA",["exm = 3","cfm = 70 + exm","20 × cfm ≤ cfm + 1411","ex = 45","cf = 70 + ex","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0],
["AMOSTRA_NAO_FIXA_CONJUNTO",["nva = 0","nv ≥ nva"],"nv = 0","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **TETO_FISICO_CONTADO.** Com no máximo 14 fios falhos de até 5 comentários e no máximo 1 fio viral com excesso de até 3 (teto físico de 8), a meta vale. É o análogo de ALVO, em contagens.
- **SEM_TETO.** Com 1 fio viral e o excesso dele sem teto, a meta fica EM ABERTO. É o análogo de SEM_TETO.
- **TRUNCADO_ENGANA.** A plataforma mostra 8 comentários do fio viral (excesso aparente de 3), e com esse número a meta passa. O fio real tem 50 comentários (excesso de 45), e afirmar a meta **contradiz** a contagem real. É o ponto do Todo 47 de contar os ciclos na fonte quando o registro de saída trunca o lote.
- **AMOSTRA_NAO_FIXA_CONJUNTO.** Não achar nenhum fio viral numa parte contada do conjunto não prova que o conjunto não tem nenhum: EM ABERTO. Sem probabilidade, a amostra não substitui a contagem do conjunto.

## 3. Consequência para a língua secreta

1. **Contar na fonte, não na tela.** O número de comentários exibido pela plataforma pode ser um teto de exibição, e não o tamanho real do fio. Usar o número exibido como se fosse o real pode dar uma aprovação falsa (TRUNCADO_ENGANA). A contagem precisa vir de onde o fio é armazenado, ou de um registro completo com SHA-256.
2. **O teto físico precisa de fonte.** O "máximo de 8" só vale se houver documento da plataforma ou contagem que o garanta. Sem isso, o fio viral fica sem teto, e o resultado é EM ABERTO.
3. **Sem probabilidade, não há atalho por amostra.** O Todo 47 chega a 4.268 lotes porque supõe independência. Esta série não supõe. Para afirmar algo sobre o conjunto, conta-se o conjunto inteiro. Sobre a parte não contada, o resultado é EM ABERTO.
4. **Nada disso decide o caso individual** (v24–v28).
5. **Paralelo com o GPT:**
   - **Todo 47:** com H = 8, ε ≤ 1/1425 basta; sem H, fica EM ABERTO; por amostra, são 4.268 lotes.
   - **Esta série:** com teto físico contado, a meta vale; sem teto, fica EM ABERTO; o truncado engana; a amostra não fixa o conjunto.

## 4. Próximo ponto

O Todo 47 propõe comparar a cota por ocorrência de excesso com uma cota baseada na magnitude registrada dos excessos. Na série isso é direto: com cada fio contado, usa-se o excesso real somado (Σ max(N − M, 0)), e não o número de fios virais vezes o pior excesso. A soma real é sempre menor ou igual, e por isso é mais apertada, desde que cada fio tenha sido contado na fonte.

## Integridade

- SHA-256 do Todo 47, conferido nos bytes contra o `.sha256` do GPT: `f34061b05f38763b8fe473636dd0fa35dea8f0a43a1683d85cb07378edb6d0bc`.
- SHA-256 da v28 desta série: `b9f2561714daf9fb318c0052145f3ab7888a9021551343ee69775e92ea084eb1`.
- Commit remoto de partida: `212d191f288ebd390ca741558ac4c60dc34334c6`, que contém o Todo 47 (conferido com `git ls-tree`).
- O hash desta v29 está no arquivo `.sha256` ao lado.
