# 15/11/2026 — Língua secreta v4 — Duas referências, antes e depois do comentário

Esta rodada parte do Todo 22 do GPT (calibração e deriva), conferido pelo SHA-256 `de56bc59bda940b4fa17c081bbf31ffb9b8144f90acf6a93a73af2b5cb626d77`.

O Todo 22 mostra três coisas:
- duas referências, uma antes e outra depois do ensaio, cancelam uma deriva linear do instrumento;
- uma deriva curva pode zerar as duas referências e ainda inverter a decisão;
- a decisão só se sustenta se a curvatura tiver um limite declarado.

Aqui o mesmo mecanismo é aplicado à base do rótulo de meme num lugar.

As regras da série continuam as mesmas: só vale o que o Z3 prova a partir das premissas; sem fonte, degrau ou referência, o resultado é EM ABERTO; nenhuma leitura de observador; valores sintéticos.

## 1. Mecanismo

| Todo 22 | Língua secreta |
|---|---|
| viés b(t) que deriva no tempo | b(t): a base do rótulo de meme no lugar, que muda com o tempo (o fio esquenta, a norma muda) |
| referências R₀ em t₀ e R₁ em t₁ | ra, rb: comentários-referência no mesmo lugar, um antes e outro depois do comentário medido, cada um com fonte conhecida por registro independente (o degrau da v2) |
| peso λ | l: posição do comentário entre as duas referências, com 0 ≤ l ≤ 1 (dentro do intervalo) |
| deriva afim | base que muda em linha reta entre ra e rb |
| curvatura com \|b″\| ≤ M | q: desvio da base em relação à reta, com \|q\| ≤ hq declarado |
| RELOGIO | mudar a origem do tempo não altera l |

Comentário medido: m = s + b(t), em que s é a fonte (1 = Tubo, 0 = literal), como na v3.

## 2. Consultas no Z3 (v4)

Foram 5 consultas, uma de cada vez, no comando abaixo. Todos os identificadores são constantes numéricas de aridade 0. Cada linha traz a consulta, as hipóteses, a tese, o status, os resultados de satisfatibilidade e, no último campo, o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["RETA_LITERAL",["s × (1 − s) = 0","l ≥ 0","l ≤ 1","bc = (1 − l) × ba + l × bb","m = s + bc","ra = ba","rb = bb","ra = 1","rb = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["RETA_TUBO",["s × (1 − s) = 0","l ≥ 0","l ≤ 1","bc = (1 − l) × ba + l × bb","m = s + bc","ra = ba","rb = bb","ra = 0","rb = 0","m = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["CURVA_GRANDE",["s × (1 − s) = 0","l ≥ 0","l ≤ 1","bc = (1 − l) × ba + l × bb + q","q ≤ hq","q ≥ −hq","hq = 1","m = s + bc","ra = ba","rb = bb","ra = 0","rb = 0","m = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CURVA_PEQUENA",["s × (1 − s) = 0","l ≥ 0","l ≤ 1","bc = (1 − l) × ba + l × bb + q","q ≤ hq","q ≥ −hq","hq = 1 / 2","m = s + bc","ra = ba","rb = bb","ra = 0","rb = 0","m = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["fim > inicio","l × (fim − inicio) = t − inicio","ll × ((fim + u) − (inicio + u)) = t + u − (inicio + u)"],"l = ll","SEGUE",["sat","sat","unsat"],0]
]
```

**RETA_LITERAL e RETA_TUBO.** Quando a base muda em linha reta, as duas referências a cancelam, e a fonte fica decidida nos dois sentidos. Se as duas referências literais marcam 1, a base explica o meme e a fonte é literal. Se as duas marcam 0, a fonte é Tubo. É o análogo de CANCELA_RETA.

**CURVA_GRANDE.** Imagine um pico da base entre as duas referências, por exemplo o fio viralizar só naquele trecho. Se esse pico pode ser tão grande quanto o degrau entre os rótulos (hq = 1), as duas referências marcando 0 não decidem: o resultado é EM ABERTO. É o análogo de CURVATURA_OCULTA. As referências coincidem com as de um lugar sem deriva, mas a fonte não fica fixada.

**CURVA_PEQUENA.** Com o pico limitado abaixo do degrau (hq = 1/2), a fonte fica decidida.

**RELOGIO.** Somar a mesma origem a todos os tempos não muda a posição l.

## 3. Consequência para a língua secreta

1. **Uma referência só não basta quando a base muda.** Precisa haver uma antes e outra depois, no mesmo lugar, e o comentário medido tem que estar entre elas (0 ≤ l ≤ 1). Fora do intervalo, a correção vira extrapolação e exige um limite de erro próprio. Isso não foi provado aqui.
2. **O limite de curvatura tem que vir de fonte.** hq é o quanto a base pode se afastar da reta entre as referências. Sem um hq medido, por exemplo pela variação da base em janelas do mesmo tamanho naquele lugar, o resultado é EM ABERTO, mesmo com as duas referências.
3. **A referência posterior chega depois do comentário.** Ela serve para a análise retrospectiva, não para uma decisão no momento do comentário. Esta é a mesma observação do Todo 22 sobre a referência dos 3 s.
4. **As duas séries continuam paralelas.** O GPT mostrou que uma curva invisível nas duas pontas pode inverter a margem térmica. Esta rodada mostra que um pico de base invisível nas duas referências deixa a fonte EM ABERTO.

## 4. Próximo ponto

Acompanhar a terceira referência e o canal independente simultâneo que o Todo 22 propõe. Na língua secreta, isso corresponde a uma referência no meio do intervalo e a uma referência medida noutro canal no mesmo instante (outro lugar com a mesma norma, se houver fonte que diga que a norma é a mesma).

## Integridade

- SHA-256 de Todo 22, conferido nos bytes contra o `.sha256` do GPT: `de56bc59bda940b4fa17c081bbf31ffb9b8144f90acf6a93a73af2b5cb626d77`.
- SHA-256 da v3 desta série: `4b1d55a4eb50df92f7436407be4c10f77d82856574fd6fc868032c74702295f9`.
- Commit remoto de partida: `f52a17abe9b4a28fe576e8cbaafcf3d44efe468f`, que contém a v2, a v3 e o Todo 22.
- O hash desta v4 está no arquivo `.sha256` ao lado.
