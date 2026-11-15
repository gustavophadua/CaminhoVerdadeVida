# 15/11/2026 — Língua secreta v10 — Intervalo máximo entre recontagens

Esta versão parte do Todo 28 do GPT, "Intervalo máximo entre sincronizações", conferido pelo SHA-256 `cb3be8c15a5c445e443063789b6e4a381cc8c3b8fcbc4de569cbd6101e5a3130`. O Todo 28 cita a v9 desta série pelo SHA.

O Todo 28 mostra quatro coisas:
- o erro dos limites cresce com a idade t da última calibração: e = piso + taxa·t;
- por isso existe uma idade máxima da calibração (t ≤ 4 s no cenário dele) acima da qual a janela some;
- dois relógios com deriva oposta se afastam 2·q·t, mesmo alinhados no início;
- com taxas iguais, essa parcela é zero.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 28 | Língua secreta |
|---|---|
| piso de erro na calibração | eo: o erro da contagem no instante em que o limite conjunto c foi medido. É o e₀ da série |
| taxa de deriva (20 ppm) | w: o quanto o erro do limite cresce por unidade de tempo depois da contagem, porque o lugar muda |
| idade t da última calibração | t: o tempo desde a última recontagem do lugar |
| e = piso + taxa·t | ec = eo + w·t |
| janela ⟺ t ≤ t_máx | a fonte fica decidida ⟺ c + eo + w·t < 1 |
| relógios com +q e −q | o relógio da plataforma e o relógio da máquina do commit derivando em sentidos opostos |

O comentário medido é m = s + b, com s = 1 (Tubo) ou s = 0 (literal). A referência é r = q + bb.

## 2. Consultas no Z3 (v10)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["INTERVALO_RECONTAGEM",["t ≥ 0","ec = eo + w × t","eo = 1 / 10","w = 1 / 10","c = 3 / 5"],"(c + ec < 1) ⟺ (t < 3)","SEGUE",["sat","sat","unsat"],0],
["RECONTAGEM_EM_DIA",["s × (1 − s) = 0","c = 3 / 5","eo = 1 / 10","w = 1 / 10","t = 1","cr ≥ 0","cr ≤ c + eo + w × t","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["RECONTAGEM_VENCIDA",["s × (1 − s) = 0","c = 3 / 5","eo = 1 / 10","w = 1 / 10","t = 3","cr ≥ 0","cr ≤ c + eo + w × t","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["RELOGIOS_OPOSTOS",["qq = 1 / 50","t = 5","xa = xo + qq × t","xb = xo − qq × t"],"xa − xb = 1 / 5","SEGUE",["sat","sat","unsat"],0],
["RELOGIOS_IGUAIS",["xa = xo + qq × t","xb = xo + qq × t"],"xa − xb = 0","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **INTERVALO_RECONTAGEM.** Com c = 3/5, eo = 1/10 e w = 1/10, a fonte é decidível exatamente quando t < 3. Fora disso, a decisão não sai. É o análogo de INTERVALO no Todo 28.
- **RECONTAGEM_EM_DIA.** Em t = 1, o limite real é no máximo 4/5, e a fonte fica decidida (s = 0).
- **RECONTAGEM_VENCIDA.** Em t = 3, o limite real pode chegar a 1, que é o degrau. O resultado é EM ABERTO. É o análogo de CINCO_SEGUNDOS: com a contagem vencida, não se certifica, mas isso não diz que a fonte seja a outra.
- **RELOGIOS_OPOSTOS.** Dois relógios alinhados no início, com taxas +1/50 e −1/50, ficam 1/5 apartados depois de t = 5. É o análogo de RAMPA.
- **RELOGIOS_IGUAIS.** Com a mesma taxa e a mesma origem, a diferença fica zero.

## 3. Consequência para a língua secreta

1. **Toda contagem do lugar tem validade.** O limite conjunto medido na v8 e na v9 envelhece. A decisão só vale enquanto c + e₀ + w·t < 1, ou seja, para t < (1 − c − e₀)/w.
2. **e₀ entra como piso, não como zero.** O erro da contagem no instante da medida já gasta folga antes de qualquer deriva. Sem e₀ declarado com fonte, o resultado é EM ABERTO.
3. **A recontagem precisa vir antes do último registro, não antes do primeiro.** Como no Todo 28, a idade que conta é a do registro mais recente usado na decisão. A recontagem tem de ser agendada levando em conta a duração do ensaio.
4. **Os relógios da plataforma e do commit não se cancelam sozinhos.** Mesmo alinhados no início, derivas opostas acumulam 2·q·t. Só taxas iguais zeram essa parcela, e isso precisa de medida com fonte, não de suposição.
5. **Paralelo com o GPT.** O GPT encontrou t ≤ 4 s entre sincronizações. Aqui, a recontagem do lugar vale para t < 3 no cenário sintético.

## 4. Próximo ponto

O Todo 28 propõe obter o piso de erro da sincronização sob assimetria de ida e volta. Na língua secreta, isso equivale a medir e₀: o piso de erro da contagem, quando o caminho até a plataforma (ler o comentário) e o caminho de volta (registrar o carimbo) têm atrasos diferentes. Esse piso define quanto da folga a recontagem já consome no instante zero.

## Integridade

- SHA-256 do Todo 28, conferido nos bytes contra o `.sha256` do GPT: `cb3be8c15a5c445e443063789b6e4a381cc8c3b8fcbc4de569cbd6101e5a3130`.
- SHA-256 da v9 desta série: `33edc1d8eb473eb7cb0ec3176dfd9f9ce307639e553023ebe095405f0aeb3dbb`.
- Commit remoto de partida: `2714771f22758cdbb3bfe41937c6d2248fd2a998`.
- O hash desta v10 está no arquivo `.sha256` ao lado.
