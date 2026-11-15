# 15/11/2026 — Língua secreta v5 — Referência simultânea no mesmo instante

Esta versão parte do Todo 23 do GPT, "Referência disponível no prazo", conferido pelo SHA-256 `7caf2b30a038bbb26d73d6cdcaa8a1b284acaec0c5191b51ae149fbac6f78fdd`. O Todo 23 cita a v4 desta série pelo SHA, o que liga as duas séries.

O Todo 23 mostra três coisas:
- três referências que dão zero não excluem uma deriva entre elas (contraexemplo cúbico);
- uma referência simultânea que acompanha o mesmo erro aditivo cancela a deriva, qualquer que seja a forma dela no tempo;
- uma diferença entre os canais (κ) reduz a folga.

As regras da série continuam: só vale o que o Z3 prova a partir das premissas; sem fonte, degrau ou referência, a saída é EM ABERTO; nenhuma leitura de observador; valores sintéticos.

## 1. Mecanismo

| Todo 23 | Língua secreta |
|---|---|
| três referências em 0, 1,25 e 2,5 s | ra, rb, rc: comentários-referência de fonte literal conhecida em três instantes do mesmo lugar |
| curva cúbica que zera nas três | q: pico da base entre as referências, invisível a todas elas |
| canal simultâneo que mede o mesmo b(t) | r: comentário-referência no mesmo instante e no mesmo trecho do lugar, com fonte p conhecida por registro independente |
| desvio diferencial κ entre os canais | k: limite declarado para a diferença entre a base do comentário (b) e a base da referência (bb) |
| origem comum | somar o mesmo valor ao comentário e à referência não muda nada |

O comentário medido continua sendo m = s + b, em que s é a fonte (1 = Tubo, 0 = literal).

## 2. Consultas no Z3 (v5)

Foram cinco consultas, uma de cada vez, com o comando abaixo. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SIMULTANEA_CANCELA",["m = s + b","r = p + b","p = 0"],"m − r = s","SEGUE",["sat","sat","unsat"],0],
["SIMULTANEA_DECIDE",["s × (1 − s) = 0","m = s + b","r = p + bb","bb − b ≤ k","b − bb ≤ k","k = 1 / 2","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["DIFERENCIAL_GRANDE",["s × (1 − s) = 0","m = s + b","r = p + bb","bb − b ≤ k","b − bb ≤ k","k = 1","p = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["TRES_ZERAM_PICO",["s × (1 − s) = 0","ra = 0","rb = 0","rc = 0","bc = q","q ≤ hq","q ≥ −hq","hq = 1","m = s + bc","m = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["ORIGEM",["dif = m − r","difo = (m + o) − (r + o)"],"difo = dif","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **SIMULTANEA_CANCELA.** Se a referência compartilha exatamente a base do comentário, a diferença m − r é a própria fonte, sem nenhuma hipótese sobre a forma de b no tempo. É o análogo de SIMULTANEA no Todo 23.
- **SIMULTANEA_DECIDE.** Com uma diferença entre as bases limitada a k = 1/2, menor que o degrau entre os rótulos, a fonte fica decidida.
- **DIFERENCIAL_GRANDE.** Com k = 1, igual ao degrau, a saída é EM ABERTO. Se a referência estiver noutro trecho do lugar, com base diferente, ela não serve.
- **TRES_ZERAM_PICO.** Três referências literais iguais a zero não descartam um pico da base no instante do comentário (hq = 1). A saída é EM ABERTO. É o análogo de CURVA_OCULTA no Todo 23: mais referências espaçadas no tempo não substituem um limite de curvatura com fonte.
- **ORIGEM.** Um deslocamento comum ao comentário e à referência não muda a diferença entre eles.

## 3. Consequência para a língua secreta

1. **A referência mais forte é simultânea e vizinha.** Um comentário-referência com fonte conhecida, no mesmo instante e no mesmo trecho, cancela a base qualquer que seja o comportamento do lugar no tempo, como viralização, mudança de norma ou picos.
2. **O ponto fraco passa a ser k.** É preciso fonte para afirmar que referência e comentário compartilham a base, por exemplo a mesma postagem, a mesma janela de minutos e o mesmo público. Sem um limite de k medido, a saída é EM ABERTO.
3. **Mais referências no tempo não salvam sem limite de curvatura.** Isso vale tanto para a v4 (duas referências) quanto para esta v5 (três).
4. **O resultado é paralelo ao do GPT:**
   - no Todo 23, o canal simultâneo aprova a margem térmica só sob o limite κ;
   - aqui, a referência simultânea decide a fonte só sob o limite k.

## 4. Próximo ponto

O Todo 23 propõe medir latência e deriva diferencial entre canais. Na língua secreta, o equivalente é medir k: quanto a base varia entre trechos vizinhos de um mesmo lugar, no mesmo instante. Isso pede contagem com fonte, não leitura.

## Integridade

- SHA-256 do Todo 23, conferido nos bytes contra o `.sha256` do GPT: `7caf2b30a038bbb26d73d6cdcaa8a1b284acaec0c5191b51ae149fbac6f78fdd`.
- SHA-256 da v4 desta série: `490ded21acd7ed0ef33d9ac3f4e46d3cd9c04cbc21f82304a8cd7e0eef079aaf`.
- Commit remoto de partida, que contém o Todo 23: `3ff5cb3b6cc8e8f8901de3faa2ac83aaecade8c5`.
- O hash desta v5 está no arquivo `.sha256` ao lado.
