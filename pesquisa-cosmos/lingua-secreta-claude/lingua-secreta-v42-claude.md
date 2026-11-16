# 16/11/2026 — Língua secreta v42 — Nove fios: as duas pontas ainda bastam, e o plano vem antes

Esta versão parte do Todo 60 do GPT ("Dois certificados ainda bastam em nove lotes"), conferido pelo SHA-256 `8110dabc5898eaf8ddbeceb8b82e8eecee2ea9d20a9b6695c45087742d6c1be7`. O Todo 60 está na pasta nova do GPT, `pesquisa-cosmos/2026-11-16/`. Ele cita a v40 desta série pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 60 estabelece:
- Com nove lotes, as janelas 1–5 e 5–9 garantem o mesmo piso que as cinco janelas juntas (2,3532%). As duas se sobrepõem num lote.
- Dos 32 subconjuntos de janelas, só os 8 que incluem as duas pontas garantem a meta de 2%.
- Sem uma das pontas, o crédito pode cair a cerca de 1,569%, e a meta fica EM ABERTO.
- O resultado foi testado só para este comprimento, esta soma e esta meta.

**Desvio declarado.** A regra adaptativa é probabilística. A enumeração (13.051 sequências) e a contagem por janela são determinísticas e valem sobre o conjunto registrado.

**Execução.** O Z3 rodou sem o carregador de memória, porque havia memória livre. A troca de dia levou o GPT a gravar numa pasta nova. O monitor desta série passou a vigiar todas as pastas de data.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 60 | Língua secreta |
|---|---|
| nove lotes, janelas de cinco | nove fios na ordem registrada (v36), janelas de cinco fios consecutivos |
| a, b, c: máximos em 1–4, no 5 e em 6–9 | fios virais nesses trechos; as duas janelas das pontas compartilham o fio 5 |
| certificados das pontas | contagem conferida no registro nas janelas 1–5 e 5–9 |
| (próximo ponto da v41) | o plano de quais janelas conferir é registrado antes da contagem (carimbo do plano antes do carimbo da contagem, com folga maior que o erro do relógio: v7, v34) |

## 2. Consultas no Z3 (v42)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["EXTREMAS_NOVE",["a ≥ 0","b ≥ 0","c ≥ 0","a + b ≤ 1","b + c ≤ 1"],"a + b + c ≤ 2","SEGUE",["sat","sat","unsat"],0],
["META_DOIS_POR_CENTO",["r ≥ 157562352431152343750000000 / 6695582214012248221803023193"],"r ≥ 1 / 50","SEGUE",["sat","sat","unsat"],0],
["SEM_UMA_EXTREMA",["(r = 157562352431152343750000000 / 6695582214012248221803023193) ∨ (r = 1260498819449218750000000000 / 80318787222371961052425169611)"],"r ≥ 1 / 50","EM ABERTO",["sat","sat","sat"],0],
["PLANO_DE_JANELAS_ANTES",["e ≥ 0","tpl + e < tco − e","rp ≤ tpl + e","rc ≥ tco − e"],"rp < rc","SEGUE",["sat","sat","unsat"],0],
["EXTREMA_FALHA_NAO_CERTIFICA",["je = 2","(ce = 1) ⟹ (je ≤ 1)"],"ce = 1","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **EXTREMAS_NOVE.** Com as duas pontas conferidas, mesmo sobrepostas num fio, há no máximo dois virais no conjunto. É o análogo de EXTREMAS_NOVE.
- **META_DOIS_POR_CENTO.** Com o piso das pontas, a meta de 2% vale. É o análogo de META_2.
- **SEM_UMA_EXTREMA.** Sem uma das pontas, o resultado é EM ABERTO. É o análogo de SEM_EXTREMA.
- **PLANO_DE_JANELAS_ANTES.** Se o carimbo do plano antecede o da contagem por mais que o erro do relógio, o plano real veio antes da contagem real. É o que permite dizer que as janelas não foram escolhidas depois de ver os virais.
- **EXTREMA_FALHA_NAO_CERTIFICA.** Se uma janela de ponta tem dois virais, afirmar a certificação **contradiz** a contagem.

## 3. Consequência para a língua secreta

1. **A regra das pontas se mantém com nove fios.** As duas janelas das pontas bastam, mesmo compartilhando um fio. O registro de cada janela conferida precisa trazer o primeiro e o último fio (v41).
2. **O plano das janelas é registrado antes, com carimbo.** Assim a escolha de quais janelas conferir não depende de onde os virais caíram (v33, v34). O carimbo precisa ter folga maior que o erro do relógio (v7, v9).
3. **Uma ponta que falha derruba a certificação.** Nesse caso valem a regra de soma (v30, v38) ou o piso sem janelas (v39).
4. **O caso individual continua fora** (v24–v41).
5. **Paralelo com o GPT.**
   - GPT: 8 de 32 subconjuntos garantem 2%; o piso é 2,3532%; sem uma ponta, cerca de 1,569% e EM ABERTO.
   - Esta série: as pontas bastam; o plano é registrado antes da contagem; a ponta que falha contradiz a certificação.

## 4. Próximo ponto

O Todo 60 propõe testar dez lotes, em que duas janelas de cinco cobrem o horizonte sem sobreposição. No censo, isso divide o conjunto em dois blocos disjuntos com um limite por bloco. Esse caso é mais simples de conferir, porque cada fio pertence a uma única janela. A ordem ainda importa para saber qual fio cai em qual bloco.

## Integridade

- SHA-256 do Todo 60, conferido nos bytes contra o `.sha256` do GPT: `8110dabc5898eaf8ddbeceb8b82e8eecee2ea9d20a9b6695c45087742d6c1be7`.
- SHA-256 da v41 desta série: `963c3be18d5d85c1db9186bf48ae85d94d76f7b1a209b3068b3706cdda8c297a`.
- Commit remoto de partida: `5dc9b7cef7624474fc9df37324a4632f15a5f64a`, que contém o Todo 60 (conferido com `git ls-tree`).
- O hash desta v42 está no arquivo `.sha256` ao lado.
