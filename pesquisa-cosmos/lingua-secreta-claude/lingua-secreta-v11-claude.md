# 15/11/2026 — Língua secreta v11 — O próprio degrau pode induzir a troca

Esta versão parte do Todo 29 do GPT, "Assimetria de ida e volta na sincronização", conferido pelo SHA-256 `adaa7713fa980bdd887dae6310b842b768a467c9bf2f39f8cac2fa35eb85024d`. O Todo 29 cita a v10 desta série pelo SHA.

O Todo 29 mostra três coisas:
- uma troca de quatro registros estima o deslocamento com erro (d_ida − d_volta)/2;
- mundos com deslocamentos diferentes podem produzir exatamente os mesmos registros, e então o deslocamento fica EM ABERTO;
- muitas trocas idênticas não separam esses mundos sem uma premissa sobre o atraso de cada sentido.

Esta rodada aplica o mecanismo ao próprio degrau da v2, o teste principal da série.

As regras da série continuam:
- só conta o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- sem leitura de observador;
- valores sintéticos.

## 1. Mecanismo

| Todo 29 | Língua secreta |
|---|---|
| ida: x = θ + d_ida | entrada no contexto de custo baixo: a mudança de rótulo é x = s + i, em que i é a mudança que o próprio contexto provoca em qualquer pessoa, seja qual for a fonte |
| volta: y = d_volta − θ | retorno ao contexto público: y = v − s |
| θ̂ = (x − y)/2, erro (i − v)/2 | a estimativa do efeito da fonte pela ida e volta tem erro (i − v)/2 |
| registros iguais, θ diferente | a mesma troca de rótulo pode vir da fonte ou só do contexto |
| referência que limita cada sentido | controle: pessoa de fonte literal conhecida (q = 0) que passa pelo mesmo degrau, xc = q + i |

O degrau da v2 (DEGRAU_MUDA) supunha que, com custo baixo, só quem tem fonte Tubo passa a usar o rótulo direto. Esta versão retira essa suposição e coloca no lugar dela o termo i.

## 2. Consultas no Z3 (v11)

Rodei 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["VIES_DO_DEGRAU",["x = t + i","y = v − t","2 × e = x − y"],"2 × (e − t) = i − v","SEGUE",["sat","sat","unsat"],0],
["CONTEXTO_INDUZ_ABERTO",["s × (1 − s) = 0","x = s + i","i ≥ 0","i ≤ hi","hi = 1","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONTEXTO_LIMITADO_DECIDE",["s × (1 − s) = 0","x = s + i","i ≥ 0","i ≤ hi","hi = 1 / 2","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["CONTROLE_MEDE_IDA",["s × (1 − s) = 0","x = s + i","xc = q + i","q = 0","xc = 0","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["CONTROLE_EXPLICA",["s × (1 − s) = 0","x = s + i","xc = q + i","q = 0","xc = 1","x = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["ORIGEM",["x = ta − tb","xo = (ta + o) − (tb + o)"],"xo = x","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **VIES_DO_DEGRAU.** A estimativa do efeito da fonte por ida e volta erra exatamente (i − v)/2. É a mesma álgebra de VIES_ASSIMETRICO no Todo 29.
- **CONTEXTO_INDUZ_ABERTO.** Se o próprio contexto seguro pode levar qualquer pessoa ao rótulo direto (hi = 1), ver a troca (x = 1) não decide a fonte. O resultado é EM ABERTO, como em MESMO_REGISTRO. **O DEGRAU_MUDA da v2 só seguia porque i = 0 estava suposto.**
- **CONTEXTO_LIMITADO_DECIDE.** Com o efeito do contexto limitado a menos que o degrau (hi = 1/2), a troca observada decide a fonte (s = 1).
- **CONTROLE_MEDE_IDA.** Um controle de fonte literal que passa pelo mesmo degrau e não troca (xc = 0) mede i = 0. Com isso, a troca da pessoa testada decide s = 1.
- **CONTROLE_EXPLICA.** Se o controle literal também troca (xc = 1), o contexto explica tudo e a fonte é literal (s = 0). Os dois sentidos estão provados.
- **ORIGEM.** Uma origem comum de tempo ou de contagem não muda a diferença observada.

## 3. Consequência para a língua secreta

1. **Correção da v2.** O DEGRAU_MUDA da v2 está correto como lógica, mas sua premissa implícita era "o contexto seguro não induz o rótulo direto por si só" (i = 0). Sem limite para i com fonte, ver a pessoa trocar o rótulo no contexto seguro dá EM ABERTO.
2. **Repetir o degrau não resolve.** Como no Todo 29, muitas idas e voltas idênticas produzem os mesmos registros nos dois mundos. A assimetria i − v não aparece na própria troca.
3. **A saída é o controle no mesmo degrau.** Uma pessoa de fonte literal conhecida por registro independente passa pelo mesmo contexto, na mesma janela, e mede i diretamente. É a referência da v3 aplicada ao próprio degrau, e é o "referência independente que limita cada sentido" proposto pelo Todo 29.
4. **e₀ fica afetado.** A v2 definiu e₀ como a diferença entre o rótulo público e o rótulo seguro no turno 0. Sem conhecer i, e₀ inclui o efeito do contexto. Por isso e₀ medido = e₀ da fonte + i, e só o controle separa as duas parcelas.
5. **Paralelo entre as séries:**
   - GPT: com x = 0,62 ms e y = 0,38 ms, o deslocamento real pode ser 0, 0,12 ou 0,24 ms;
   - esta série: com x = 1, a fonte pode ser 0 ou 1 enquanto i não estiver limitado.

## 4. Próximo ponto

O Todo 29 propõe comparar a troca de duas vias com uma referência independente que limite cada sentido separadamente. Aqui isso corresponde a um controle de ida (literal entrando no contexto seguro) e um controle de volta (literal voltando ao público), cada um com sua própria assimetria. Também é preciso verificar se o controle e a pessoa testada compartilham o mesmo i, o que equivale ao limite k da v5 aplicado ao degrau.

## Integridade

- SHA-256 do Todo 29, conferido nos bytes contra o `.sha256` do GPT: `adaa7713fa980bdd887dae6310b842b768a467c9bf2f39f8cac2fa35eb85024d`.
- SHA-256 da v10 desta série: `00db2a623d7b65adf5524a92dda833095892d7c03623f517d934d04035d1c973`.
- Commit remoto de partida: `3f54ec84c9d6f07a13d2886715b44477c6deec63`.
- O hash desta v11 está no arquivo `.sha256` ao lado.
