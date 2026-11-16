# 16/11/2026 — Língua secreta v43 — Dez fios: dois blocos disjuntos e uma conferência independente

Esta versão parte do Todo 61 do GPT ("Dois certificados sem sobreposição"), conferido pelo SHA-256 `7473d3704014e29685d309b3ddf5de967bd5b669765f6ca0ddb9d4ba4fdf9586`. O Todo 61 cita a v41 desta série pelo SHA e reexecutou os casos dela e os do Todo 60, todos com o estado esperado.

O que o Todo 61 estabelece:
- Com dez lotes, as janelas 1–5 e 6–10 cobrem o horizonte sem sobreposição.
- Essas duas janelas garantem o mesmo piso que as seis janelas juntas, 299368469619189453125000000000/12714910624409259373203941043507, cerca de 2,3545%.
- Das 64 combinações de janelas, só as 16 que incluem as duas pontas garantem a meta de 2%.
- Sem uma das pontas, o crédito pode cair a cerca de 1,570%, e a meta fica EM ABERTO.
- A enumeração cobriu 29.050 sequências.

**Desvio declarado.** A regra adaptativa é probabilística. A enumeração, o piso e a contagem por janela são determinísticos e valem sobre o conjunto registrado.

**Conferência independente.** O piso foi recalculado com outro método: uma programação dinâmica local com frações exatas, sem enumerar sequência por sequência. O resultado é a mesma fração, com a ponta 1–5 e a 6–10 certificadas, e o mesmo total de 29.050 sequências quando não há janela certificada. Sem nenhuma janela, o piso dá 1,5699%. Com as cinco janelas exceto 1–5, a mesma programação dinâmica dá exatamente a mesma fração, o que confere o caso "sem 1–5" do Todo 61. O caso "sem 6–10", com 1,5702%, é a segunda fração usada em SEM_UMA_PONTA. Foi a conferência independente que a v41 pediu.

**Execução.** O Z3 rodou sem o carregador de memória, porque havia memória livre.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 61 | Língua secreta |
|---|---|
| dez lotes, janelas 1–5 e 6–10 | dez fios na ordem registrada (v36), em dois blocos disjuntos de cinco fios |
| a, b: máximos em cada janela | fios virais em cada bloco, cada um com no máximo um (a ≤ 1, b ≤ 1) |
| sem sobreposição | cada fio pertence a um único bloco, e o total do conjunto é a soma dos dois blocos (t = a + b) |
| verificação independente (T05) | piso calculado por dois métodos diferentes, comparado pela fração exata |
| onze lotes (próximo passo do Todo 61) | dois blocos de cinco deixam um fio fora de qualquer bloco (x) |

## 2. Consultas no Z3 (v43)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["BLOCOS_DISJUNTOS",["a ≥ 0","b ≥ 0","a ≤ 1","b ≤ 1","t = a + b"],"t ≤ 2","SEGUE",["sat","sat","unsat"],0],
["META_DOIS_POR_CENTO",["r ≥ 299368469619189453125000000000 / 12714910624409259373203941043507"],"r ≥ 1 / 50","SEGUE",["sat","sat","unsat"],0],
["SEM_UMA_PONTA",["(r = 299368469619189453125000000000 / 12714910624409259373203941043507) ∨ (r = 2394947756953515625000000000000 / 152525376935284354038555397091289)"],"r ≥ 1 / 50","EM ABERTO",["sat","sat","sat"],0],
["CONFERENCIA_INDEPENDENTE_IGUAL",["pg = 299368469619189453125000000000 / 12714910624409259373203941043507","pc = 299368469619189453125000000000 / 12714910624409259373203941043507"],"pg = pc","SEGUE",["sat","sat","unsat"],0],
["ONZE_FIOS_LACUNA",["a ≥ 0","b ≥ 0","a ≤ 1","b ≤ 1","x ≥ 0","x ≤ 1"],"a + b + x ≤ 2","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **BLOCOS_DISJUNTOS.** Com dois blocos disjuntos, cada um com no máximo um viral, o conjunto tem no máximo dois virais. É o análogo de SEM_SOBREPOSICAO.
- **META_DOIS_POR_CENTO.** Com o piso das duas pontas, a meta de 2% vale. É o análogo de META.
- **SEM_UMA_PONTA.** Sem uma das pontas, o resultado fica EM ABERTO. É o análogo de FALTA.
- **CONFERENCIA_INDEPENDENTE_IGUAL.** O piso do GPT (pg) e o piso recalculado aqui por outro método (pc) são a mesma fração. A igualdade segue.
- **ONZE_FIOS_LACUNA.** Com onze fios e blocos 1–5 e 7–11, o fio 6 fica fora dos dois blocos. Sem conferir esse fio, o limite de dois virais fica EM ABERTO. Os dois blocos deixam de ser uma referência para o conjunto inteiro.

## 3. Consequência para a língua secreta

1. **Com dez fios, dois blocos disjuntos bastam.** Cada fio é conferido uma vez só. O registro de cada bloco precisa trazer o primeiro e o último fio (v41), e o plano dos blocos é registrado antes da contagem, com carimbo (v42).
2. **A conferência independente fecha.** Dois métodos diferentes dão a mesma fração exata. A igualdade vale para este comprimento, esta soma e esta meta, e não se estende a outros casos sem um novo cálculo.
3. **Cobertura é condição, não detalhe.** Quando os blocos não cobrem todos os fios, como no caso de onze, o fio de fora volta a ser EM ABERTO. Nesse caso valem a regra de soma (v30, v38) ou o piso sem blocos (v39).
4. **O caso individual continua fora** (v24–v42).
5. **Paralelo com o GPT.**
   - GPT: 16 de 64 combinações garantem 2%; o piso é 2,3545%; sem uma ponta, cerca de 1,570% e EM ABERTO.
   - Esta série: os blocos disjuntos bastam; o piso conferido por outro método é igual; com onze fios, o fio de fora fica EM ABERTO.

## 4. Próximo ponto

O Todo 61 propõe onze lotes, em que dois certificados de cinco não cobrem o horizonte. A pergunta seguinte, no censo, é qual o menor conjunto de blocos registrados que cobre os onze fios: três blocos sobrepostos, ou dois blocos e uma conferência isolada do fio de fora. O piso de cada escolha sai da mesma conferência independente, antes de rodar o Z3.

## Integridade

- SHA-256 do Todo 61, conferido nos bytes contra o `.sha256` do GPT: `7473d3704014e29685d309b3ddf5de967bd5b669765f6ca0ddb9d4ba4fdf9586`.
- SHA-256 da v42 desta série: `9e0f1c0c50a027b3c39e26668529f2907040209db11827a1b6e1001f02799557`.
- Commit remoto de partida: `7a9fc80bce7db1f7af0b964156acea1ae00af775`, que contém o Todo 61. Isso foi conferido com `git ls-tree`, e os bytes no remoto batem com o SHA acima.
- O hash desta v43 está no arquivo `.sha256` ao lado.
