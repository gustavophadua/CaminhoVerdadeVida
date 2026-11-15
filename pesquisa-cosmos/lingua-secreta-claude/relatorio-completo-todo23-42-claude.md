# 15/11/2026 — Língua secreta: relatório completo das versões v5 a v24 (Todo 23 a 42)

Junta, sem alterar nenhum byte do conteúdo, as 20 versões da série Claude que acompanham os Todos 23 a 42 do GPT. Cada versão segue íntegra abaixo e pode ser conferida pelo SHA-256 do seu arquivo .sha256 na mesma pasta. O commit é o que adicionou o arquivo no remoto.

| Versão | Todo | SHA-256 da versão | Commit |
|---|---|---|---|
| v5 — Referência simultânea no mesmo instante | 23 | `2ddbf325948ee53d00f21060d62d9c0868f9057345444f686eae7d8db7a9ca96` | 27e5416 |
| v6 — Idade da referência | 24 | `ec887e53c5e8be52179c09e479d21e6357bd7cce5a552404e24b6857056e4a9a` | 8c0ed43 |
| v7 — Janela de registro antes do degrau | 25 | `20d594d27aa113c9880ae215aebf1ece036e9a3b5b10435e97380df8f2ce37b8` | 09ec780 |
| v8 — Limite conjunto em vez de limites somados | 26 | `6e2d22dc2c0ae18e761ca64bd19c14fed93bcfd55328fdd7caf6a8ab9259eb4c` | 0eeb6a9 |
| v9 — Erro dentro do próprio limite registrado | 27 | `33edc1d8eb473eb7cb0ec3176dfd9f9ce307639e553023ebe095405f0aeb3dbb` | 720ce6c |
| v10 — Intervalo máximo entre recontagens | 28 | `00db2a623d7b65adf5524a92dda833095892d7c03623f517d934d04035d1c973` | 27bc069 |
| v11 — O próprio degrau pode induzir a troca | 29 | `a18550cd38712c17028d0300349e3df3636de669b9ea3e3e9221c03a56978510` | 355d169 |
| v12 — Controles separados para a ida e para a volta | 30 | `80abe30f46afe3e152948a9b5124993c8699ea75132be726ed86c742bb30c534` | 34eefde |
| v13 — Controles levados para outro contexto | 31 | `8830f749ca02bb0b2e1478b4e98137ff34da15b3f85841c77b363befbccdac85` | 0d02f54 |
| v14 — Identificador do formato e prazo para recalibrar | 32 | `e45f7e64788d74c221e15314866711f4ddace93d238ebc9568c12d1f5ee0812a` | 07f5683 |
| v15 — Formato que muda no meio do degrau | 33 | `e6f5caefb11843ffe0e7ced86f83fa1997db86e039b7ac4c6d0fccf63019d7ab` | 2897b10 |
| v16 — Registro de mudanças de formato sem lacunas | 34 | `eda70b611322b39fbb1431be763f14e03191ef9f08b95643fbf08759c52e80fb` | 5f02b5a |
| v17 — Fechamento das três fontes de mudança de formato | 35 | `4ed9c7053f240efb8d2e2e90c292ffc8a2fc52bb11e196280dd48f1a216cb424` | af35473 |
| v18 — Mesmo relógio para o fim da conversa e o fechamento | 36 | `87ee05c9a36ad58520b903a0d47a642058186a44684ee6e9df25945c953cc38f` | 197d217 |
| v19 — Idade da guarda depois que o relógio perde a referência | 37 | `fba37a341c9444e484626e020a28dbe4b43f613137a829ae4a5e66a627523742` | 43ac4eb |
| v20 — Salto do relógio da plataforma ao voltar à referência | 38 | `64d1b7e7a71e9748dbe86fae2eddfd871a4ac0430b1b07f4ff95d29fc830bd6a` | 7d9a40c |
| v21 — Migração da plataforma: ordem decidida, idade aberta | 39 | `dd20a4c2029b42b42e5d372722af78707a08352d60ba3bc91ac8a4dd7ee199af` | e34c466 |
| v22 — Duas âncoras externas em volta da migração | 40 | `f8dae5a6e7ccfa4e4d910eb1428286b227a68c814f3737b8dbd21ff0a0b79c31` | fdc507f |
| v23 — Atraso de registro das âncoras externas | 41 | `82fc9c2c2f7b88d2246d366c410930b420c3069c0448b0bb194f3ef0ef80b9b5` | d3e8ec2 |
| v24 — Cobertura do lote não decide o caso | 42 | `a21e506a8858ecdd036a2e1b14e1bbc8f6a173d3e3662499af506cc8dc19885a` | be6d43d |


---

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

---

# 15/11/2026 — Língua secreta v6 — Idade da referência

Esta versão parte do Todo 24 do GPT, "Atraso admissível entre sinal e referência". O Todo foi conferido pelo SHA-256 `1c92b816e51f245ce1acf26b63a52f9a742797b74398e5ccd155ec913c392abc`, e ele cita a v5 desta série pelo SHA.

O Todo 24 mostra três coisas:
- uma referência adquirida d segundos antes do sinal deixa um erro de até L·D + κ, em que L é a taxa máxima de variação do viés;
- uma rampa compartilhada pelos dois canais não se cancela quando há atraso;
- existe uma idade máxima D acima da qual a decisão fica EM ABERTO.

As regras da série continuam:
- só conta o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 24 | Língua secreta |
|---|---|
| referência adquirida em t−d | r: comentário-referência com fonte literal conhecida, publicado dd unidades de tempo antes do comentário medido, no mesmo trecho do lugar |
| \|b′\| ≤ L | lv: limite declarado para a velocidade com que a base do rótulo de meme muda naquele lugar |
| \|r\| ≤ κ | k: diferença entre as bases da referência e do comentário que não depende do tempo (v5) |
| erro ≤ L·D + κ | \|b − bb\| ≤ lv·dd + k |
| rampa comum com atraso | a base sobe em linha reta para os dois, e mesmo assim sobra lv·dd |
| origem do relógio | a idade dd não depende da origem do tempo |

O comentário medido continua sendo m = s + b, com s = 1 para fonte Tubo e s = 0 para fonte literal.

## 2. Consultas no Z3 (v6)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["IDADE_GERAL_DECIDE",["s × (1 − s) = 0","lv ≥ 0","dd ≥ 0","k ≥ 0","lv × dd + k < 1","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["IDADE_CURTA",["s × (1 − s) = 0","lv = 1 / 10","dd = 2","k = 1 / 10","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["IDADE_LONGA",["s × (1 − s) = 0","lv = 1 / 10","dd = 9","k = 1 / 10","m = s + b","r = p + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","p = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["RAMPA_COMUM",["b = lv × t","bb = lv × (t − dd)"],"b − bb = lv × dd","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["idade = t − ta","idadeo = (t + o) − (ta + o)"],"idadeo = idade","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **IDADE_GERAL_DECIDE.** Vale para quaisquer lv, dd e k não negativos: se lv·dd + k < 1, que é o degrau entre os rótulos, a referência decide a fonte. Essa é a condição de idade admissível, análoga a D ≤ 37,75 ms no Todo 24.
- **IDADE_CURTA.** Com lv·dd + k = 0,3, a fonte fica decidida.
- **IDADE_LONGA.** Com lv·dd + k = 1, a saída é EM ABERTO, análoga a ATRASO_LONGO.
- **RAMPA_COMUM.** Se a base sobe em linha reta igual para os dois, a diferença ainda é exatamente lv·dd. O fato de compartilharem a mesma tendência não cancela a defasagem, análogo a RAMPA.
- **RELOGIO.** Somar uma origem ao relógio não altera a idade da referência.

## 3. Consequência para a língua secreta

1. **Uma referência "simultânea" na prática tem idade.** Um comentário-referência publicado minutos antes já vem de uma base possivelmente diferente. A decisão só se sustenta enquanto lv·dd + k < 1.
2. **lv precisa de fonte.** A velocidade de mudança da base do lugar, por exemplo a variação do rótulo por janela de tempo, precisa ser contada. Sem lv medido, nenhuma idade é admissível e a saída é EM ABERTO.
3. **Seguir a mesma tendência não basta.** Num lugar em que o meme está subindo, a referência mais velha subestima a base em lv·dd.
4. **A idade de publicação não é o tempo de leitura.** Como no Todo 24, a idade dd conta a partir do momento em que o comentário-referência foi feito, e não de quando quem analisa o leu.
5. **Os resultados correm em paralelo:**
   - o GPT encontrou D ≤ 37,75 ms para a margem térmica;
   - aqui, dd < (1 − k)/lv para a fonte.

## 4. Próximo ponto

O Todo 24 propõe separar a idade de aquisição, o erro de sincronização e o tempo de processamento. Na língua secreta, os equivalentes são:
- a idade de publicação do comentário-referência;
- a incerteza do carimbo de tempo da plataforma;
- o tempo até o registro com SHA-256.

Cada um desses entra no limite como mais uma parcela, somada a lv·dd + k.

## Integridade

- SHA-256 do Todo 24, conferido nos bytes contra o `.sha256` do GPT: `1c92b816e51f245ce1acf26b63a52f9a742797b74398e5ccd155ec913c392abc`.
- SHA-256 da v5 desta série: `2ddbf325948ee53d00f21060d62d9c0868f9057345444f686eae7d8db7a9ca96`.
- Commit remoto de partida: `83cc95d7dc995098c7525ef3204c93973ebf0dc2`.
- O hash desta v6 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v7 — Janela de registro antes do degrau

Esta versão parte do Todo 25 do GPT, "Janela de aquisição e processamento". O Todo foi conferido pelo SHA-256 `8d5712937b140bd47e2e7aa09054dfe2e3d3fead8037e0a55237b0e2d8989ad0` e cita a v6 desta série pelo SHA.

O Todo 25 tem dois limites que apertam a janela de lados opostos:
- **mínimo:** a aquisição precisa ser antecipada pelo menos a ≥ j + p para a decisão chegar ao prazo (j = incerteza de sincronização, p = processamento);
- **máximo:** cada segundo de antecedência acrescenta S·(a + j) ao erro.

Se o mínimo passa do máximo, não existe janela. Nesse caso a certificação é impossível com esses limites, o que não quer dizer que a temperatura real esteja acima do teto. Para o relógio, uma leitura com incerteza e só garante o prazo se lida ≤ limite − e.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- valores sintéticos.

## 1. Mecanismo

| Todo 25 | Língua secreta |
|---|---|
| prazo T | o instante do degrau: o momento em que o custo é baixado de forma conhecida (v2) |
| antecedência a | quanto antes do degrau a referência é capturada e o protocolo é registrado com SHA-256 |
| sincronização j | incerteza do carimbo de tempo da plataforma |
| processamento p | tempo para capturar, calcular o SHA-256 e fazer o commit |
| S·(a + j) | lv·(a + j): quanto a base pode mudar entre o registro e o degrau (v6) |
| a ≥ j + p | o registro precisa existir antes do degrau |
| INCERTEZA_RELOGIO | carimbo lido com incerteza e |

O comentário medido continua sendo m = s + b, com s = 1 (Tubo) ou s = 0 (literal). A fonte da referência passa a se chamar q, porque p agora é o processamento.

## 2. Consultas no Z3 (v7)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["JANELA_EXISTE",["a ≥ 3 / 10","a ≤ 1","j = 1 / 10","p = 1 / 5","lv = 1 / 2","k = 1 / 10"],"a ≥ j + p ∧ lv × (a + j) + k < 1","SEGUE",["sat","sat","unsat"],0],
["SEM_JANELA",["j = 1 / 10","p = 2","lv = 1 / 2","k = 1 / 10","a ≥ j + p"],"lv × (a + j) + k < 1","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_NA_JANELA",["s × (1 − s) = 0","a ≥ 3 / 10","a ≤ 1","j = 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × (a + j) + k","b − bb ≤ lv × (a + j) + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["CARIMBO_ANTES",["e ≥ 0","real ≤ lido + e","lido ≤ prazo − e"],"real ≤ prazo","SEGUE",["sat","sat","unsat"],0],
["CARIMBO_SEM_FOLGA",["e > 0","real ≤ lido + e","real ≥ lido − e","lido = prazo − e / 2"],"real ≤ prazo","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **JANELA_EXISTE.** Com o registro feito entre 0,3 e 1 unidade de tempo antes do degrau, as duas condições valem juntas:
  - o registro fica pronto antes do degrau (a ≥ j + p);
  - a deriva acumulada fica abaixo do degrau entre os rótulos (lv·(a + j) + k < 1).
  
  É o análogo de JANELA.
- **SEM_JANELA.** Se registrar leva p = 2, toda antecedência suficiente deixa a base derivar além do degrau. A certificação no prazo **contradiz** os limites. É o análogo de SEM_JANELA. A fonte não fica decidida em nenhum sentido: o que falha é a certificação.
- **DECIDE_NA_JANELA.** Dentro da janela, com a referência literal (q = 0) e r = m = 1, a fonte é decidida (s = 0).
- **CARIMBO_ANTES.** Um registro com carimbo lido até prazo − e é garantidamente anterior ao degrau. É o análogo de INCERTEZA_RELOGIO.
- **CARIMBO_SEM_FOLGA.** Um carimbo a menos de e do degrau deixa EM ABERTO se o registro foi feito antes. Sem essa ordem garantida, o registro não vale como pré-registro.

## 3. Consequência para a língua secreta

1. **Pré-registro só conta com folga de relógio.** O SHA-256 do protocolo precisa ter carimbo anterior ao degrau por mais do que a incerteza do carimbo (e). Um carimbo encostado no degrau não prova a ordem dos eventos.
2. **A antecedência tem teto.** Registrar cedo demais deixa a base do lugar mudar entre o registro e o degrau. O limite é lv·(a + j) + k < 1, ou seja, a < (1 − k)/lv − j.
3. **Processamento lento fecha a janela.** Se capturar, gerar o hash e fazer o commit leva mais que a folga, nenhuma escolha de a certifica. Nesse caso não se troca a regra: o caminho é acelerar o registro (p menor) ou medir a base mais perto do degrau.
4. **Paralelo com o GPT:**

| Série | Janela encontrada |
|---|---|
| GPT, margem térmica | 9 ms ≤ a ≤ 13,42 ms |
| Esta série, fonte | j + p ≤ a < (1 − k)/lv − j |

## 4. Próximo ponto

O Todo 25 propõe obter limites conjuntos por calibração de latência e de inclinação térmica. Na língua secreta, isso equivale a medir juntos, no mesmo lugar e período:
- p: tempo real de captura, SHA e commit;
- e: incerteza do carimbo da plataforma e do carimbo do commit;
- lv: velocidade de mudança da base.

Só com os três medidos a janela sai de sintética para fonte.

## Integridade

- SHA-256 do Todo 25, conferido nos bytes contra o `.sha256` do GPT: `8d5712937b140bd47e2e7aa09054dfe2e3d3fead8037e0a55237b0e2d8989ad0`.
- SHA-256 da v6 desta série: `ec887e53c5e8be52179c09e479d21e6357bd7cce5a552404e24b6857056e4a9a`.
- Commit remoto de partida: `b04ac76e30a93f7d887fa409f02b9831bb922c4e`.
- O hash desta v7 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v8 — Limite conjunto em vez de limites somados

Esta versão parte do Todo 26 do GPT, "Limite conjunto para relógio e processamento". O Todo 26 foi conferido pelo SHA-256 `ce986afc7d9fd5214cf5a863c461deeaa14e4773116feb52750e0f5a8b06c104` e cita a v7 desta série pelo SHA.

O Todo 26 mostra três coisas:
- os máximos marginais de p e de j podem não acontecer juntos;
- um limite conjunto (p + j ≤ 11 ms) recupera uma janela que os limites separados fecham;
- sem o limite conjunto, a garantia fica EM ABERTO.

O limite conjunto só vale se for medido no mesmo ensaio. O máximo de uma amostra finita não é uma garantia universal.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 26 | Língua secreta |
|---|---|
| p e j com máximos marginais | k (desvio entre trechos, v5) e dv = lv·dd (deriva pela idade da referência, v6), cada um com seu máximo |
| limite conjunto p + j ≤ H | k + dv ≤ limite conjunto, medido no mesmo lugar e no mesmo período |
| j assinado, mínimo J | erro assinado do carimbo de tempo: pode adiantar ou atrasar |
| janela max(0, H) ≤ a ≤ J + folga/S | registro: j + p ≤ a e lv·(a − j) + k < 1 |
| máximo amostral ≠ garantia | um k + dv observado não é um limite sem uma regra com fonte |

O comentário medido é m = s + b, com s = 1 (Tubo) ou s = 0 (literal). A referência é r = q + bb, com a fonte q conhecida.

## 2. Consultas no Z3 (v8)

Cinco consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MARGINAIS_NAO_BASTAM",["k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2"],"k + dv < 1","EM ABERTO",["sat","sat","sat"],0],
["SEPARADO_ABERTO",["s × (1 − s) = 0","k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2","m = s + b","r = q + bb","bb − b ≤ k + dv","b − bb ≤ k + dv","q = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["CONJUNTO_DECIDE",["s × (1 − s) = 0","k ≥ 0","k ≤ 1 / 2","dv ≥ 0","dv ≤ 1 / 2","k + dv ≤ 3 / 5","m = s + b","r = q + bb","bb − b ≤ k + dv","b − bb ≤ k + dv","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["JANELA_CONJUNTA",["a ≥ 3 / 10","a ≤ 1","j ≥ −1 / 10","j ≤ 1 / 10","p ≥ 0","j + p ≤ 3 / 10","lv = 1 / 2","k = 1 / 10"],"j + p ≤ a ∧ lv × (a − j) + k < 1","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["ap = t − tr","apo = (t + o) − (tr + o)"],"apo = ap","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **MARGINAIS_NAO_BASTAM.** Com k ≤ 1/2 e dv ≤ 1/2 tomados em separado, a soma pode chegar a 1, que é o degrau entre os rótulos. A garantia k + dv < 1 fica EM ABERTO. É o análogo direto do MARGINAIS_NAO_BASTAM do Todo 26.
- **SEPARADO_ABERTO.** Só com esses limites marginais, a referência literal não decide a fonte: EM ABERTO.
- **CONJUNTO_DECIDE.** Com os mesmos marginais mais o limite conjunto k + dv ≤ 3/5, a fonte fica decidida (s = 0). É o análogo de GARANTIA_CONJUNTA.
- **JANELA_CONJUNTA.** Com erro de carimbo assinado |j| ≤ 1/10 e o limite conjunto j + p ≤ 3/10, a janela de registro [3/10, 1] satisfaz as duas condições: o registro fica pronto antes do degrau, e a deriva até o degrau fica abaixo do degrau. A v7 somava os piores casos; aqui o limite conjunto recupera a janela.
- **RELOGIO.** Somar a mesma origem ao relógio não muda a antecedência.

## 3. Consequência para a língua secreta

1. **Somar os piores casos pode fechar uma decisão que existe.** Se o trecho mais desviado (k máximo) e a referência mais velha (dv máximo) não acontecem juntos, somar os dois máximos joga fora a decisão. Para recuperá-la, é preciso medir os dois juntos.
2. **O limite conjunto precisa de fonte no mesmo ensaio.** k e dv têm de ser contados na mesma janela, no mesmo lugar e com o mesmo registro. Um limite conjunto tirado de lugares diferentes não vale.
3. **O máximo observado não é garantia.** Como no Todo 26, o maior k + dv visto numa amostra finita não prova que o próximo comentário fique abaixo dele. O limite conjunto entra como regra declarada, com fonte e marcada como tal, e o SEGUE vale condicionado a essa regra.
4. **Resultado paralelo nas duas séries:**
   - o GPT recuperou a janela [11; 11,42] ms com p + j ≤ 11 ms;
   - aqui, k + dv ≤ 3/5 recupera a decisão que k ≤ 1/2 e dv ≤ 1/2, tomados em separado, deixavam EM ABERTO.

## 4. Próximo ponto

O Todo 26 propõe incluir os erros dos próprios registros de tempo numa guarda conjunta verificável. Na língua secreta, isso significa tratar o carimbo da plataforma, o carimbo do commit e o carimbo do bloco (se houver OTS) como três relógios com erros próprios. A ordem "registro antes do degrau" passa a exigir um limite conjunto entre esses erros, e não três limites separados.

## Integridade

- SHA-256 do Todo 26, conferido nos bytes contra o `.sha256` do GPT: `ce986afc7d9fd5214cf5a863c461deeaa14e4773116feb52750e0f5a8b06c104`.
- SHA-256 da v7 desta série: `20d594d27aa113c9880ae215aebf1ece036e9a3b5b10435e97380df8f2ce37b8`.
- Commit remoto de partida: `44dfaaf0c7fa25e8b4ac2a9ac4e8c411fc082db0`.
- O hash desta v8 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v9 — Erro dentro do próprio limite registrado

Esta versão parte do Todo 27 do GPT, "Quanto erro cabe nos registros de tempo", conferido pelo SHA-256 `c6eb1f67f9db527f8c2e4eed4c40a5a975011109624d13514beb8ef889c6dd56`. O Todo 27 cita a v8 desta série pelo SHA.

O Todo 27 mostra três coisas:
- os limites registrados Ĥ e Ĵ também têm erro (e_H, e_J);
- a janela garantida passa a ser [Ĥ + e_H, teto − e_J] e só existe se e_H + e_J ≤ folga;
- quando um registro intermediário é reutilizado, ele se cancela na soma das diferenças. Por isso o erro dele não deve ser contado duas vezes.

Regras da série, que continuam valendo:
- só conta o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- valores sintéticos.

## 1. Mecanismo

| Todo 27 | Língua secreta |
|---|---|
| Ĥ registrado, erro e_H | h: antecedência mínima registrada para o pré-registro (v7), com erro eh |
| Ĵ registrado, erro e_J | g: antecedência máxima antes que a base derive além do degrau (v7), com erro ej |
| janela existe ⟺ e_H + e_J ≤ folga | a janela de registro existe ⟺ eh + ej ≤ g − h |
| limite conjunto registrado | c: limite conjunto k + dv registrado (v8), com erro de contagem ec; o limite real cr ≤ c + ec |
| (r − s) + (f − r) = f − s | carimbo da plataforma (pl) → carimbo do commit (cm) → carimbo do bloco (bl): o commit intermediário se cancela na diferença total |

Comentário medido: m = s + b, com s = 1 (Tubo) ou s = 0 (literal). Referência: r = q + bb.

## 2. Consultas no Z3 (v9)

Foram cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FOLGA_REGISTRO",["eh ≥ 0","ej ≥ 0","a ≥ h + eh","a ≤ g − ej"],"eh + ej ≤ g − h","SEGUE",["sat","sat","unsat"],0],
["ERRO_ALTO_REGISTRO",["a ≥ 3 / 10 + 3 / 20"],"a ≤ 1 / 2 − 3 / 20","CONTRADIZ",["sat","unsat","sat"],0],
["LIMITE_MEDIDO_DECIDE",["s × (1 − s) = 0","c = 3 / 5","ec = 1 / 5","cr ≥ 0","cr ≤ c + ec","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["LIMITE_MEDIDO_ABERTO",["s × (1 − s) = 0","c = 3 / 5","ec = 2 / 5","cr ≥ 0","cr ≤ c + ec","m = s + b","r = q + bb","bb − b ≤ cr","b − bb ≤ cr","q = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["CADEIA_CARIMBOS",["x = cm − pl","y = bl − cm"],"x + y = bl − pl","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **FOLGA_REGISTRO.** Para quaisquer h, g e erros não negativos, só existe antecedência a válida se eh + ej ≤ g − h. A folga da janela é o orçamento total dos dois erros. É o análogo de FOLGA no Todo 27.
- **ERRO_ALTO_REGISTRO.** Com h = 3/10, g = 1/2 e erro de 3/20 em cada lado, o mínimo (0,45) passa do máximo (0,35). A certificação **contradiz** os limites. É o análogo de ERRO_ALTO. A fonte não fica decidida em nenhum sentido.
- **LIMITE_MEDIDO_DECIDE.** O limite conjunto registrado c = 3/5, com erro de contagem 1/5, dá um limite real de no máximo 4/5, ainda menor que o degrau. A fonte fica decidida (s = 0).
- **LIMITE_MEDIDO_ABERTO.** Com erro de contagem 2/5, o limite real pode chegar a 1, que é o degrau, e o resultado é EM ABERTO. O SEGUE da v8 vale só enquanto c + ec < 1.
- **CADEIA_CARIMBOS.** Na cadeia plataforma → commit → bloco, a soma das duas diferenças é a diferença total, qualquer que seja o carimbo do commit. É o análogo de CANCELAMENTO.

## 3. Consequência para a língua secreta

1. **O limite com fonte também tem erro.** Um limite contado (k + dv ≤ c) carrega o erro da contagem. A decisão exige c + ec < 1, e não só c < 1.
2. **A janela de pré-registro tem orçamento de erro.** O erro do mínimo e o do máximo saem da mesma folga g − h. Se o carimbo da plataforma e o do commit têm erros grandes, a janela fecha antes de a decisão ser possível.
3. **Não contar o carimbo intermediário duas vezes.** Para provar que o registro veio antes do degrau, o carimbo do commit cancela na cadeia plataforma → commit → bloco. O erro dele entra só uma vez, na guarda em que ele é usado diretamente. O que sobra são os erros diferenciais entre o primeiro e o último relógio.
4. **Resultado paralelo nas duas séries.**
   - GPT: a janela [11,15; 11,27] ms existe com 0,15 ms de erro em cada lado e some com 0,25 ms.
   - Esta série: a decisão existe com ec = 1/5 e fica EM ABERTO com ec = 2/5.

## 4. Próximo ponto

O Todo 27 propõe quantificar o erro diferencial entre relógios independentes com sincronização só periódica. Na língua secreta, os relógios independentes são três, cada um com a sua sincronização:
- o carimbo da plataforma do comentário;
- o relógio da máquina que faz o commit;
- o tempo do bloco Bitcoin, se houver carimbo OTS, que só existe com sim explícito.

A ordem "registro antes do degrau" depende do erro diferencial entre o primeiro e o último desses relógios.

## Integridade

- SHA-256 do Todo 27, conferido nos bytes contra o `.sha256` do GPT: `c6eb1f67f9db527f8c2e4eed4c40a5a975011109624d13514beb8ef889c6dd56`.
- SHA-256 da v8 desta série: `6e2d22dc2c0ae18e761ca64bd19c14fed93bcfd55328fdd7caf6a8ab9259eb4c`.
- Commit remoto de partida: `c019a04e4d9351e848bfc3e64bbfb7d9564213f7`.
- O hash desta v9 está no arquivo `.sha256` ao lado.

---

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

---

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

---

# 15/11/2026 — Língua secreta v12 — Controles separados para a ida e para a volta

Esta versão parte do Todo 30 do GPT, "Restringir os atrasos em cada sentido", conferido pelo SHA-256 `f58c724bf34d5549e0c6aa574adb01be86913d07137c5d589ab4a9be7bfd9477`. O Todo 30 cita a v11 desta série pelo SHA e trata o degrau que induz troca como hipótese correspondente.

O que o Todo 30 estabelece:
- Com limites independentes para a ida (i) e para a volta (v), o deslocamento fica na interseção [x − i_max, x − i_min] ∩ [v_min − y, v_max − y].
- Interseção vazia indica dados e guardas incompatíveis.
- Usar os próprios relógios desconhecidos para declarar i ou v torna a inferência circular.
- Uma sonda que altera a fila invalida a guarda.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 30 | Língua secreta |
|---|---|
| ida x = θ + i, com i ∈ [i_min, i_max] | entrada no contexto seguro: x = s + i, com i limitado por um **controle de ida** (pessoa de fonte literal conhecida que entra no mesmo contexto) |
| volta y = v − θ, com v ∈ [v_min, v_max] | retorno ao público: y = v − s, com v limitado por um **controle de volta** (pessoa de fonte literal conhecida que volta ao mesmo lugar público) |
| interseção dos dois intervalos | a fonte s precisa caber nos dois intervalos ao mesmo tempo |
| interseção vazia | os controles e os dados se contradizem, e nada se conclui sobre s |
| circularidade | declarar i a partir da própria troca da pessoa testada (i = x − s) |
| sonda que muda a fila | um controle cuja presença muda o contexto passa a medir outro i |

## 2. Consultas no Z3 (v12)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SO_IDA_ABERTA",["s × (1 − s) = 0","x = s + i","i ≥ 0","i ≤ 1","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["VOLTA_FECHA",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 1","v ≥ 7 / 10","v ≤ 1","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["INTERSECAO_DECIDE",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10","v ≥ 7 / 10","v ≤ 1","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["GUARDAS_INCOMPATIVEIS",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 1 / 10","v ≥ 0","v ≤ 1 / 10","x = 1","y = 0"],"s = 1","PREMISSAS INCOMPATÍVEIS",["unsat",null,null],0],
["CONTROLE_CIRCULAR",["s × (1 − s) = 0","x = s + i","i = x − s","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

**Leitura das consultas:**

- **SO_IDA_ABERTA.** Com o controle de ida fraco (i pode chegar ao degrau), a troca na entrada não decide a fonte: EM ABERTO. Repete a v11.
- **VOLTA_FECHA.** O mesmo controle de ida fraco, junto com um controle de volta forte (v ∈ [7/10, 1]) e a volta observada y = 0, decide s = 1. Um sentido bem limitado compensa o outro. É o análogo da volta que reduz a interseção no Todo 30.
- **INTERSECAO_DECIDE.** Com os dois controles limitados, a fonte fica no único valor binário da interseção (s = 1). É o análogo de INTERSECAO.
- **GUARDAS_INCOMPATIVEIS.** Com controles estreitos dos dois lados, a ida exige s ≥ 9/10 e a volta exige s ≤ 1/10. O Z3 acusa **premissas incompatíveis**. Pelo Todo 30, interseção vazia não decide a fonte; ela mostra que algum controle ou algum registro está errado.
- **CONTROLE_CIRCULAR.** Se o "limite" de i vem da própria troca da pessoa testada (i = x − s), a premissa não acrescenta nada e o resultado é EM ABERTO. Essa é a circularidade que o Todo 30 proíbe.

## 3. Consequência para a língua secreta

1. **Dois controles, um por sentido.** O controle de ida mede o quanto o contexto seguro empurra para o rótulo direto. O controle de volta mede o quanto o retorno ao público empurra de volta para o meme. A fonte só se decide na interseção.
2. **Um sentido forte pode bastar.** Se o efeito do contexto na entrada é mal conhecido, um controle de volta bem limitado ainda pode decidir (VOLTA_FECHA).
3. **Interseção vazia é alarme, não resultado.** Se os controles e a pessoa testada são incompatíveis, algo no protocolo está errado: o controle não era literal, o contexto mudou, ou o registro falhou. A saída é revisar o protocolo, nunca escolher uma fonte.
4. **O controle precisa ter fonte própria.** Declarar o efeito do contexto a partir da troca observada na própria pessoa testada é circular. O controle tem de ter fonte literal conhecida por registro independente, com SHA-256 anterior ao degrau (v7).
5. **O controle não pode mudar o contexto.** Como a sonda que muda a fila no Todo 30, um controle cuja presença altera o lugar (por exemplo, por ser visível para a pessoa testada) mede um i diferente do i que a pessoa enfrenta. Isso é o limite k da v5 aplicado ao controle.
6. **Paralelo entre as séries:**
   - no Todo 30, θ ∈ [0,05; 0,07] ms, e o ponto exato fica EM ABERTO;
   - aqui, a interseção decide porque s é binário e a faixa contém um só valor admissível.

## 4. Próximo ponto

O Todo 30 propõe verificar se a guarda unidirecional se mantém sob mudança de carga e rota. Na língua secreta, isso equivale a verificar se os limites dos controles de ida e de volta valem quando o lugar muda de carga (fio cheio ou vazio) ou de rota (outro formato de contexto seguro). Cada mudança exige refazer os controles, combinando com a validade das recontagens da v10.

## Integridade

- SHA-256 do Todo 30, conferido nos bytes contra o `.sha256` do GPT: `f58c724bf34d5549e0c6aa574adb01be86913d07137c5d589ab4a9be7bfd9477`.
- SHA-256 da v11 desta série: `a18550cd38712c17028d0300349e3df3636de669b9ea3e3e9221c03a56978510`.
- Commit remoto de partida: `94f5510675dc84a318cad41f156d33c66d3d9228`.
- O hash desta v12 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v13 — Controles levados para outro contexto

Esta versão parte do Todo 31 do GPT, "Quando a calibração vale em outra rota", conferido pelo SHA-256 `9ff068095014456b0f45bf4375eda70db0ea79ee5ee474b59e73a17be0a7851c`. O Todo 31 cita a v12 desta série pelo SHA.

O Todo 31 mostra três coisas:
- uma calibração feita numa rota só vale em outra rota se houver um limite g, externo e explícito, para o quanto cada atraso pode mudar;
- o intervalo de cada sentido se amplia em g, e a interseção continua sendo a regra de decisão;
- repetir o mesmo total de ida e volta não valida a calibração antiga, como mostra o contraexemplo ROTA_MUDOU.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 31 | Língua secreta |
|---|---|
| calibração de ida e volta numa rota | controles de ida e de volta (v12) medidos num formato de contexto seguro |
| nova rota ou carga | outro formato de contexto seguro, ou o mesmo formato com outro público ou volume |
| ampliação g em cada extremo | limite externo g para o quanto o efeito do contexto (i) e o da volta (v) podem mudar ao trocar de formato |
| interseção ampliada | a fonte precisa caber nos dois intervalos ampliados |
| mesmo total de ida e volta | a mesma troca observada (x = 1, y = 0) não prova que o efeito do contexto continuou o mesmo |

A troca observada na entrada é x = s + i, e na volta é y = v − s, com s = 1 para Tubo e s = 0 para literal.

## 2. Consultas no Z3 (v13)

Foram 5 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRANSFERIDA_DECIDE",["s × (1 − s) = 0","g = 1 / 10","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10 + g","v ≥ 7 / 10 − g","v ≤ 1 + g","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["TRANSFERIDA_LARGA",["s × (1 − s) = 0","g = 7 / 10","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10 + g","v ≥ 7 / 10 − g","v ≤ 1 + g","x = 1","y = 0"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["LIMITE_DE_G",["g ≥ 0"],"((3 / 10 + g < 1) ∧ (7 / 10 − g > 0)) ⟺ (g < 7 / 10)","SEGUE",["sat","sat","unsat"],0],
["ROTA_MUDOU",["s × (1 − s) = 0","i = 1","x = s + i","x = 1"],"s = 1","CONTRADIZ",["sat","unsat","sat"],0],
["ORIGEM",["x = ta − tb","xo = (ta + o) − (tb + o)"],"xo = x","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **TRANSFERIDA_DECIDE.** Os controles da v12 (i ≤ 3/10 e v ≥ 7/10) são levados para o formato novo com g = 1/10. A interseção ampliada ainda contém um só valor binário, e a fonte fica decidida (s = 1). É o análogo de GUARDA_TRANSFERIDA.
- **TRANSFERIDA_LARGA.** Com g = 7/10, os intervalos ampliados admitem os dois valores, e o resultado é EM ABERTO.
- **LIMITE_DE_G.** Os controles transferidos decidem exatamente quando g < 7/10. Esse é o orçamento de mudança de contexto que a calibração aguenta.
- **ROTA_MUDOU.** No formato novo, o próprio contexto pode levar uma pessoa de fonte literal ao rótulo direto (i = 1). Ela produz a mesma troca x = 1. Nesse caso, afirmar s = 1 **contradiz** os fatos. Usar os controles antigos sem g daria a resposta errada. É o análogo de ROTA_MUDOU.
- **ORIGEM.** Uma origem comum não muda a troca observada.

## 3. Consequência para a língua secreta

1. **Um controle vale para um formato de contexto.** Os controles de ida e de volta da v12 foram medidos num formato de contexto seguro. Em outro formato, como outra plataforma, outra pergunta ou outro público, eles só valem com um g declarado com fonte.
2. **g não sai da repetição.** Ver a mesma troca (x = 1, y = 0) no formato novo não prova que o efeito do contexto continuou o mesmo. O ROTA_MUDOU mostra que um efeito de contexto novo, sozinho, reproduz a troca. O g precisa vir de medida externa, por exemplo um controle literal passando também pelo formato novo.
3. **O orçamento é finito.** Com os controles da v12, a decisão aguenta g < 7/10. Acima disso, o resultado é EM ABERTO, e é preciso recalibrar os controles no formato novo.
4. **Sem g, o resultado é EM ABERTO, e não "vale o antigo".** Essa é a regra do 0 confident wrong: um controle transferido sem limite pode produzir uma afirmação falsa com cara de prova (ROTA_MUDOU).
5. **Paralelo com o GPT:**
   - no Todo 31, com g = 0,04 ms a idade admissível cai para cerca de 3,17 s;
   - aqui, com g = 1/10 a decisão se mantém, e com g ≥ 7/10 ela se perde.

## 4. Próximo ponto

O Todo 31 propõe um critério de invalidação quando a rota muda sem aviso, e medir o tempo de recalibração. Na língua secreta, o equivalente é um critério para detectar que o formato do contexto mudou. Exemplos: mudança de regra da plataforma, novo público, novo formato de pergunta. Ao detectar a mudança, a decisão volta a EM ABERTO até que os controles sejam refeitos. O tempo de recalibração entra na validade das recontagens (v10).

## Integridade

- SHA-256 do Todo 31, conferido nos bytes contra o `.sha256` do GPT: `9ff068095014456b0f45bf4375eda70db0ea79ee5ee474b59e73a17be0a7851c`.
- SHA-256 da v12 desta série: `80abe30f46afe3e152948a9b5124993c8699ea75132be726ed86c742bb30c534`.
- Commit remoto de partida: `34eefde3158f537b20f6a2bae238164f22bc6048`. Na hora desta rodada, o Todo 31 estava na pasta local do GPT, conferido pelo SHA, mas ainda não tinha sido enviado ao remoto.
- O hash desta v13 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v14 — Identificador do formato e prazo para recalibrar

Esta versão parte do Todo 32 do GPT, "Invalidar a guarda quando a rota muda". O Todo foi conferido pelo SHA-256 `2a300c2c2fb9219ea3c0eccd6771962ea258ab11b42ff97f4969a00b43560ae2` e cita a v13 desta série pelo SHA.

O Todo 32 estabelece três pontos:
- **Regime certificado.** A guarda só se aplica se o identificador do regime da troca usada estiver certificado como igual ao da calibração. Se o identificador faltar ou for incerto, a validade fica EM ABERTO, mesmo que o total de ida e volta seja igual.
- **Identificação da própria troca.** O identificador precisa se referir aos pacotes que produziram o resultado. Uma sonda feita antes ou depois não serve.
- **Prazo de recuperação.** Detectar, recalibrar e validar precisam caber antes da decisão: t_c + d + c + v ≤ A_min.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nada de leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 32 | Língua secreta |
|---|---|
| identificador de regime (rota, carga, classe) | fc: identificador do formato do contexto em que os controles foram medidos (plataforma, regra, público, forma da pergunta), registrado com SHA-256 junto com os controles |
| regime registrado b, regime real c | fr: formato registrado; fx: formato real do degrau aplicado à pessoa testada |
| identificação por pacote | o identificador precisa ser do mesmo degrau, da mesma conversa, e não de uma sonda antes ou depois |
| t_c + d + c + v ≤ A_min | se o formato muda em tc, as etapas detectar (d), refazer os controles (cc) e validar (vv) precisam terminar antes do momento da decisão (z) |

A troca observada é x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O limite i ≤ 3/10 é o controle de ida da v12, válido só no formato fc.

## 2. Consultas no Z3 (v14)

Foram 6 consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FORMATO_DIFERENTE",["fc = fr","fx ≠ fr"],"fc = fx","CONTRADIZ",["sat","unsat","sat"],0],
["SEM_VINCULO_ABERTO",["fc = fr"],"fc = fx","EM ABERTO",["sat","sat","sat"],0],
["MESMO_FORMATO_DECIDE",["s × (1 − s) = 0","fx = fc","(fx = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["FORMATO_NAO_VINCULADO",["s × (1 − s) = 0","(fx = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["RECALIBRA_A_TEMPO",["tc = 2","d = 1 / 10","cc = 3 / 10","vv = 1 / 10","z = 3"],"tc + d + cc + vv ≤ z","SEGUE",["sat","sat","unsat"],0],
["RECALIBRA_TARDE",["tc = 2","d = 1 / 10","cc = 3 / 10","z = 3","vv ≥ 7 / 10"],"tc + d + cc + vv ≤ z","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **FORMATO_DIFERENTE.** Se o formato real do degrau difere do formato registrado, afirmar que os controles valem ali **contradiz** os registros. É o análogo de GUARDA_EPOCA.
- **SEM_VINCULO_ABERTO.** Saber só que os controles foram registrados no formato fr, sem identificar o formato do degrau real, deixa a validade EM ABERTO. É o análogo de SEM_VINCULO.
- **MESMO_FORMATO_DECIDE.** Com o formato certificado igual (fx = fc), o controle de ida vale e a troca observada decide a fonte (s = 1).
- **FORMATO_NAO_VINCULADO.** As mesmas premissas sem a certificação do formato: o controle não se aplica, o efeito do contexto pode chegar ao degrau, e a saída é EM ABERTO. A diferença entre esta consulta e a anterior é só o vínculo.
- **RECALIBRA_A_TEMPO.** Com mudança em tc = 2, as três etapas (0,1 + 0,3 + 0,1) terminam em 2,5, antes da decisão em 3. É o análogo de RECALIBRA.
- **RECALIBRA_TARDE.** Se só validar já leva pelo menos 0,7, a recuperação passa do prazo e **contradiz** a garantia. É o análogo de ORCAMENTO. Isso retira a garantia, mas não prova que a fonte seja a outra.

## 3. Consequência para a língua secreta

1. **Os controles carregam um identificador.** Junto com os controles de ida e volta (v12), registra-se com SHA-256 o identificador do formato do contexto. Sem esse identificador, nenhum degrau posterior pode usá-los.
2. **O identificador é do degrau real.** O formato precisa ser o da própria conversa em que a pessoa foi testada. Uma conferência feita antes ou depois pode ter outro formato (por exemplo, uma regra da plataforma que mudou no meio).
3. **Mudança detectada suspende a decisão.** Se o formato mudou e não houve tempo para refazer e validar os controles antes do momento da decisão, a saída é EM ABERTO, nunca a decisão anterior. Isso fecha a v13: transferir com g, ou recalibrar a tempo, ou suspender.
4. **A recuperação tem orçamento.** tc + d + cc + vv ≤ z. Detectar rápido não basta se validar demora. A soma dos limites superiores precisa caber.
5. **Paralelo com o GPT:**
   - **Todo 32:** com 55,75 ms de folga, a recuperação de 45 ms cabe; com validação ≥ 20 ms, não cabe.
   - **Esta série:** recuperação de 0,5 cabe numa folga de 1; com validação ≥ 0,7, não cabe.

## 4. Próximo ponto

O Todo 32 propõe tratar uma mudança que ocorre durante a aquisição, com identificação incompleta, e dizer explicitamente qual é a resposta quando a guarda fica suspensa. Na língua secreta, o caso equivalente é o formato do contexto mudar no meio da conversa do degrau, por exemplo quando a plataforma altera a regra enquanto a pessoa responde. A resposta com a guarda suspensa precisa ser declarada antes, no registro com SHA-256, e por esta série ela é EM ABERTO.

## Integridade

- SHA-256 do Todo 32, conferido nos bytes contra o `.sha256` do GPT: `2a300c2c2fb9219ea3c0eccd6771962ea258ab11b42ff97f4969a00b43560ae2`.
- SHA-256 da v13 desta série: `8830f749ca02bb0b2e1478b4e98137ff34da15b3f85841c77b363befbccdac85`.
- Commit remoto de partida: `be4f96f02cbc954f83abde94d8862a5c37ae62b7`.
- O hash desta v14 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v15 — Formato que muda no meio do degrau

Parte do Todo 33 do GPT ("Mudança de rota dentro da aquisição"), conferido pelo SHA-256 `4bbf3aa565eabe6a88c362437a78031ace857791a9d38a9baa82b0aade967bd6`. O Todo 33 cita a v14 desta série pelo SHA.

O Todo 33 mostra que ler o mesmo regime no início e no fim da troca não exclui A→B→A no meio, então a guarda fica EM ABERTO. Um contador de geração não decrescente, com G(s) = G(f), fecha o caso, desde que cumpra três condições:

- não pode reiniciar nem transbordar;
- precisa estar associado à troca exata;
- precisa registrar todas as mudanças relevantes.

Um contador de rota sozinho não cobre fila nem classe. A confirmação da cobertura também tem custo (w) e precisa caber no prazo (j + p + w ≤ a).

Regras da série, que continuam valendo:

- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não há leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 33 | Língua secreta |
|---|---|
| regime lido em s e em f | formato do contexto lido no início (fa) e no fim (fb) da conversa do degrau |
| A→B→A escondido | a regra ou o público muda no meio da conversa e volta antes do fim |
| contador de geração G | gerações registradas do formato: ga no início, gm no meio, gb no fim, gc na calibração dos controles. Exemplo: a versão da regra da plataforma, se houver registro com fonte |
| contador que não cobre fila/classe | um contador de regra que não registra mudança de público (pm ≠ pc) |
| j + p + w ≤ a | carimbo (j), registro (p) e confirmação de cobertura (w) cabem antes da decisão |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). Controle de ida da v12: i ≤ 3/10, válido só no formato da calibração.

## 2. Consultas no Z3 (v15)

Foram 7 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["EXTREMOS_IGUAIS",["fa = fb"],"fa = fm","EM ABERTO",["sat","sat","sat"],0],
["CONTADOR_FECHA",["ga ≤ gm","gm ≤ gb","ga = gb"],"ga = gm","SEGUE",["sat","sat","unsat"],0],
["CONTADOR_DECIDE",["s × (1 − s) = 0","ga ≤ gm","gm ≤ gb","ga = gb","gc = ga","(gm = gc) ⟹ (i ≤ 3 / 10)","i ≥ 0","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["SEM_CONTADOR",["s × (1 − s) = 0","fa = fb","fc = fa","(fm = fc) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONTADOR_INCOMPLETO",["s × (1 − s) = 0","gm = gc","((gm = gc) ∧ (pm = pc)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONSOLIDA_A_TEMPO",["a = 1","j ≤ 1 / 5","p ≤ 1 / 2","w ≤ 3 / 10"],"j + p + w ≤ a","SEGUE",["sat","sat","unsat"],0],
["CONSOLIDA_TARDE",["a = 1","j = 1 / 5","p = 1 / 2","w = 1 / 2"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **EXTREMOS_IGUAIS.** Mesmo formato no início e no fim não fixa o formato no meio: EM ABERTO. É o análogo de ROTA_IGUAL.
- **CONTADOR_FECHA.** Com o contador não decrescente e igual nos extremos, o valor do meio é o mesmo. É o análogo de CONTADOR.
- **CONTADOR_DECIDE.** Se a geração da calibração for igual à do início, o controle de ida vale durante toda a conversa, e a troca observada decide a fonte (s = 1).
- **SEM_CONTADOR.** As mesmas premissas só com os extremos iguais, sem contador: o controle pode não valer no meio, e o resultado é EM ABERTO.
- **CONTADOR_INCOMPLETO.** O contador cobre a regra (gm = gc), mas não o público (pm). A guarda exige os dois, e o resultado é EM ABERTO. É o análogo de "um contador de rota não cobre fila nem classe".
- **CONSOLIDA_A_TEMPO / CONSOLIDA_TARDE.** A confirmação da cobertura cabe no prazo com w ≤ 3/10. Com w = 1/2 e os demais no pior caso, **contradiz** a entrega. É o análogo de ENTREGA / SEM_FOLGA: o contador pode estar correto e mesmo assim chegar tarde.

## 3. Consequência para a língua secreta

1. **Os extremos não bastam.** Ver o mesmo formato antes e depois do degrau não prova que ele ficou igual durante a conversa. Uma mudança de regra ou de público que volta antes do fim passa despercebida.
2. **É preciso um contador de gerações do formato.** Ele precisa de três propriedades:
   - não decrescente e sem reinício;
   - ligado à conversa exata;
   - cobrindo tudo o que o controle exige, ou seja, regra, público e forma da pergunta.
   
   Se o contador cobre só a regra, a decisão fica EM ABERTO.
3. **A confirmação da cobertura entra no orçamento.** Confirmar que os registros cobrem toda a conversa custa tempo (w). Se não couber antes do momento da decisão, o resultado é EM ABERTO e qualquer ação que dependa dele fica suspensa.
4. **Sem contador com fonte, nada muda em relação à v14.** A guarda fica suspensa e o resultado é EM ABERTO, que é a resposta declarada no registro.
5. **Paralelo com o GPT:**
   - GPT: w ≤ 0,25 ms cabe; w = 0,50 ms perde o prazo por 0,25 ms.
   - Aqui: w ≤ 3/10 cabe; w = 1/2 passa do prazo.

## 4. Próximo ponto

O Todo 33 propõe tratar perdas no registro e uma confirmação que declare quais eventos já estão cobertos. Na língua secreta, isso equivale a um contador de formato com lacunas: um evento de mudança de regra ou de público que não chegou ao registro. A confirmação precisa listar o que cobre. O que ela não declarar coberto fica EM ABERTO.

## Integridade

- SHA-256 do Todo 33, conferido nos bytes contra o `.sha256` do GPT: `4bbf3aa565eabe6a88c362437a78031ace857791a9d38a9baa82b0aade967bd6`.
- SHA-256 da v14 desta série: `e45f7e64788d74c221e15314866711f4ddace93d238ebc9568c12d1f5ee0812a`.
- Commit remoto de partida: `12232dc0236bf5a3e3f5aca5a6913c6eee84d857`.
- O hash desta v15 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v16 — Registro de mudanças de formato sem lacunas

Esta versão parte do Todo 34 do GPT, "Confirmar cobertura sem lacunas". O Todo foi conferido pelo SHA-256 `f76d0e744a52a68ad9f41a1ef0eebfd9fab453f2ae5edd5adc931e3c85393277` e cita a v15 desta série pelo SHA.

O Todo 34 mostra cinco pontos:
- Um marcador (k, C) declara: "todos os eventos com tempo até C já foram numerados até k".
- A cobertura até o fim f é certificável quando C ≥ f e W ≥ k, em que W é o prefixo contínuo recebido.
- Receber o número k não basta. O 120 pode chegar com o 119 faltando.
- Um registro faltante pode esconder uma mudança temporária.
- Uma captura que falha antes de numerar invalida a premissa.

As regras da série continuam:
- Só vale o que o Z3 prova a partir das premissas.
- Sem fonte, degrau ou referência, a saída é EM ABERTO.
- Não há leitura de observador.
- Os valores são sintéticos.

## 1. Mecanismo

| Todo 34 | Língua secreta |
|---|---|
| eventos numerados consecutivamente | cada mudança de formato (regra, público, forma da pergunta) recebe um número consecutivo no registro com SHA-256 |
| marcador (k, C) | quem registra declara: "todas as mudanças com tempo até cf estão numeradas até k" |
| W, prefixo contínuo recebido | wp: maior número até o qual quem analisa tem todas as mudanças, sem buraco |
| m, maior número recebido | o último registro visto, que pode ter buracos antes |
| C ≥ f | o fechamento cobre até o fim da conversa do degrau (ff) |
| captura que falha antes de numerar | mudança que nunca entrou no registro, que nenhum prefixo detecta |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale com cobertura certificada.

## 2. Consultas no Z3 (v16)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ULTIMO_NAO_BASTA",["m = 9","k = 9","wp = 7"],"wp ≥ k","CONTRADIZ",["sat","unsat","sat"],0],
["PREFIXO_FECHA",["wp ≥ k","cf ≥ ff","n ≤ k","wp ≥ n ⟹ got = 1"],"got = 1","SEGUE",["sat","sat","unsat"],0],
["LACUNA_ABERTA",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 7","k = 9","cf = ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["COBERTO_DECIDE",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 9","k = 9","cf ≥ ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["FECHAMENTO_CEDO",["s × (1 − s) = 0","((wp ≥ k) ∧ (cf ≥ ff)) ⟹ (i ≤ 3 / 10)","wp = 9","k = 9","cf < ff","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CONFIRMA_TARDE",["a = 1","j = 1 / 5","p = 1 / 2","w = 2 / 5"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **ULTIMO_NAO_BASTA.** O último registro visto é o 9, mas o prefixo contínuo só vai até 7. Afirmar cobertura **contradiz** os dados. É o análogo de MAXIMO_NAO_BASTA.
- **PREFIXO_FECHA.** Com prefixo contínuo até k e fechamento cobrindo o fim, todo evento n ≤ k foi recebido. É o análogo de MARCADOR_COMPLETO.
- **LACUNA_ABERTA.** Com buraco no prefixo (7 < 9), o controle não pode ser usado e a troca observada não decide a fonte: EM ABERTO. A mudança de formato que falta pode estar justamente no buraco.
- **COBERTO_DECIDE.** Com prefixo completo e fechamento até o fim da conversa, o controle vale e a fonte fica decidida (s = 1).
- **FECHAMENTO_CEDO.** Prefixo completo, mas o fechamento é anterior ao fim da conversa (cf < ff). Mudanças depois de cf não estão cobertas, e o resultado é EM ABERTO.
- **CONFIRMA_TARDE.** Se confirmar a cobertura e recuperar as lacunas custa 2/5, a soma passa do prazo e a garantia **contradiz** o orçamento. É o análogo de TARDE.

## 3. Consequência para a língua secreta

1. **O registro de mudanças de formato é numerado e fechado.** Cada mudança de regra, público ou forma da pergunta recebe número consecutivo. Quem registra emite um fechamento com tempo e número, e esse fechamento também é registrado com SHA-256.
2. **Ver o último número não é ver tudo.** Quem analisa precisa do prefixo contínuo até o número do fechamento. Um buraco basta para deixar a decisão EM ABERTO, porque a mudança que falta pode ser exatamente a que invalida o controle.
3. **O fechamento precisa cobrir o fim da conversa do degrau.** Um fechamento emitido antes do fim deixa o final sem cobertura.
4. **O que a captura nunca viu nenhum prefixo detecta.** Se a mudança de formato não entrou no registro na origem, por exemplo uma regra da plataforma alterada sem aviso, todo o raciocínio cai. Essa premissa precisa de fonte própria, como a regra pública versionada da plataforma. Sem essa fonte, o resultado é EM ABERTO.
5. **Paralelo com o GPT.**
   - **Todo 34:** o 120 chega com o 119 faltando, W = 118; com w = 0,32 ms, faltam 0,07 ms.
   - **Esta versão:** o 9 chega com o 8 faltando, wp = 7; com w = 2/5, passa do prazo.

## 4. Próximo ponto

O Todo 34 propõe compor fechamentos de várias fontes, com relógios diferentes e uma confirmação atrasada. Na língua secreta, as fontes de mudança de formato são várias: a regra da plataforma, o público do fio e a forma da pergunta de quem aplica o degrau. Cada uma tem seu próprio registro e seu próprio relógio (v9, v10). A cobertura só se certifica quando todas fecham até o fim da conversa.

## Integridade

- SHA-256 do Todo 34, conferido nos bytes contra o `.sha256` do GPT: `f76d0e744a52a68ad9f41a1ef0eebfd9fab453f2ae5edd5adc931e3c85393277`.
- SHA-256 da v15 desta série: `e6f5caefb11843ffe0e7ced86f83fa1997db86e039b7ac4c6d0fccf63019d7ab`.
- Commit remoto de partida: `9c2c71227bb9176c873e7b7a1a49c7246b821858`.
- O hash desta v16 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v17 — Fechamento das três fontes de mudança de formato

Esta rodada parte do Todo 35 do GPT, "Cobertura de fontes com relógios diferentes", conferido pelo SHA-256 `422e5c2c023c763c3d34b80d4e2e71a0bac32c6db341b73f7f73641f7225a424`. O Todo 35 cita a v16 desta série pelo SHA.

O Todo 35 estabelece quatro pontos:
- Com várias fontes indispensáveis, a cobertura exige min_i(Ĉ_i − ε_i) ≥ F̂ + ε_F.
- A confirmação de uma fonte não cobre a lacuna de outra.
- Uma única fonte com carimbo ambíguo (erro maior que a folga) deixa a cobertura EM ABERTO, mesmo que as demais estejam completas.
- Quando as confirmações correm em paralelo, o custo é max(w₁, w₂) + v.

Regras da série, que continuam valendo:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 35 | Língua secreta |
|---|---|
| fontes indispensáveis i | as três fontes de mudança de formato da v16: regra da plataforma (a), público do fio (b), forma da pergunta de quem aplica o degrau (p) |
| fechamento estimado Ĉ_i com erro ε_i | carimbo de fechamento de cada fonte (xa, xb, xp), com erro do relógio dela (ea, eb, ep), já incluindo a deriva desde a sincronização (v10) |
| fim da aquisição F̂ ± ε_F | fim da conversa do degrau (ff ± df); fim real zf |
| uma fonte não cobre a outra | o fechamento da regra da plataforma não diz nada sobre mudanças de público |
| max(w₁, w₂) + v | confirmações das fontes em paralelo, seguidas da agregação |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale com as três fontes cobrindo o fim da conversa.

## 2. Consultas no Z3 (v17)

Seis consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["TRES_FONTES_COBREM",["ca ≥ xa − ea","cb ≥ xb − eb","cp ≥ xp − ep","xa − ea ≥ ff + df","xb − eb ≥ ff + df","xp − ep ≥ ff + df","zf ≤ ff + df"],"ca ≥ zf ∧ cb ≥ zf ∧ cp ≥ zf","SEGUE",["sat","sat","unsat"],0],
["UMA_AMBIGUA",["ff = 0","df = 0","zf = 0","ca ≥ 1","cb ≥ 1","xp = 1 / 10","ep = 3 / 10","cp ≥ xp − ep","cp ≤ xp + ep"],"ca ≥ zf ∧ cb ≥ zf ∧ cp ≥ zf","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_COM_TRES",["s × (1 − s) = 0","zf = 0","ca ≥ 1","cb ≥ 1","cp ≥ 1 / 2","((ca ≥ zf) ∧ (cb ≥ zf) ∧ (cp ≥ zf)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["AMBIGUA_NAO_DECIDE",["s × (1 − s) = 0","zf = 0","ca ≥ 1","cb ≥ 1","cp ≥ −1 / 5","cp ≤ 2 / 5","((ca ≥ zf) ∧ (cb ≥ zf) ∧ (cp ≥ zf)) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["PARALELO_CABE",["wa ≤ 1 / 5","wb ≤ 1 / 4","v ≤ 1 / 20"],"wa + v ≤ 3 / 10 ∧ wb + v ≤ 3 / 10","SEGUE",["sat","sat","unsat"],0],
["FONTE_TARDE",["wb = 3 / 10","v = 1 / 20"],"wb + v ≤ 3 / 10","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **TRES_FONTES_COBREM.** Se cada fonte, descontado o erro do seu relógio, fecha depois do fim da conversa somado ao erro do fim, as três cobrem o fim real. É o análogo de COBERTURA no Todo 35.
- **UMA_AMBIGUA.** A regra da plataforma e o público cobrem com folga. A forma da pergunta anuncia fechamento 1/10 depois do fim, mas com erro de 3/10, então o fechamento real fica entre −1/5 e 2/5. A cobertura conjunta fica EM ABERTO. É o análogo de CARIMBO_AMBIGUO: a folga das outras fontes não compensa.
- **DECIDE_COM_TRES.** Com as três fontes cobrindo o fim, o controle vale e a fonte fica decidida (s = 1).
- **AMBIGUA_NAO_DECIDE.** Mesmo cenário, mas com a forma da pergunta ambígua: a fonte fica EM ABERTO.
- **PARALELO_CABE.** As confirmações em paralelo (até 1/5 e até 1/4), mais a agregação (até 1/20), cabem num orçamento de 3/10, sem folga no pior caso. É o análogo de PARALELO.
- **FONTE_TARDE.** Se a segunda confirmação leva 3/10, a soma passa do orçamento e **contradiz** a entrega. É o análogo de FONTE_TARDE.

## 3. Consequência para a língua secreta

1. **Cada fonte de mudança de formato fecha por conta própria.** A regra da plataforma, o público do fio e a forma da pergunta têm registros e relógios diferentes. Um fechamento completo de uma delas não cobre as outras.
2. **Vale o fechamento mais antigo, já descontado o erro.** A cobertura é tão boa quanto a fonte com o menor fechamento menos erro. Uma fonte ambígua basta para deixar o resultado EM ABERTO.
3. **A fonte mais fraca é a pergunta de quem aplica o degrau.** O registro da forma da pergunta é o que costuma ter o relógio menos controlado (registro manual). É ela que tende a limitar a cobertura e precisa de carimbo com erro declarado.
4. **O conjunto de fontes precisa estar completo.** Se houver uma quarta fonte de mudança relevante, por exemplo um moderador do fio que não foi registrado, a cobertura das três não basta. Essa lista precisa ser declarada com antecedência, no registro com SHA-256.
5. **Paralelo com o GPT.**
   - No Todo 35, há uma fonte com fechamento real entre −0,03 e +0,27 ms, e o caso de 0,26 + 0,02 ms passa do orçamento de 0,25 ms.
   - Aqui, a pergunta fecha entre −1/5 e 2/5, e o caso de 3/10 + 1/20 passa de 3/10.

## 4. Próximo ponto

O Todo 35 propõe verificar quando um erro comum de relógio pode ser eliminado nas diferenças entre fonte e aquisição. Na língua secreta, isso vale para fontes que usam o mesmo relógio que marca o fim da conversa. Por exemplo, quando a plataforma carimba o comentário e a mudança de regra com o mesmo relógio, o erro comum cancela na diferença (ORIGEM). Só sobra o erro diferencial, o que pode recuperar a cobertura de uma fonte ambígua.

## Integridade

- SHA-256 do Todo 35, conferido nos bytes contra o `.sha256` do GPT: `422e5c2c023c763c3d34b80d4e2e71a0bac32c6db341b73f7f73641f7225a424`.
- SHA-256 da v16 desta série: `eda70b611322b39fbb1431be763f14e03191ef9f08b95643fbf08759c52e80fb`.
- Commit remoto de partida: `5f02b5a059d0488747cb94dcea27d8a31201a11e`. No momento desta rodada, o Todo 35 estava na pasta local do GPT, conferido pelo SHA, mas ainda não tinha sido enviado ao remoto.
- O hash desta v17 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v18 — Mesmo relógio para o fim da conversa e o fechamento

Esta versão parte do Todo 36 do GPT, "Quando o erro comum de relógio cancela", conferido pelo SHA-256 `b5d41184c96a86c66b123b1496e6c3f14ba4ddcc5448893e48ce840d4278c822`. O Todo 36 cita a v17 desta série pelo SHA e reexecutou seus 6 casos com o estado previsto e código zero.

O Todo 36 estabelece três resultados:
- **Relógio comum.** Com x = a + b + e e y = f + b + d, o offset b cancela, e a − f = (x − y) − (e − d). Uma guarda unilateral e − d ≤ B garante a ordem quando x − y ≥ B.
- **Offsets distintos.** Sem um limite para a diferença entre os offsets, a ordem fica EM ABERTO.
- **Deriva entre eventos.** Uma deriva r entre os dois eventos pode inverter a ordem.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 36 | Língua secreta |
|---|---|
| carimbo do fechamento x | xc: carimbo do fechamento do registro de mudanças de formato (v16, v17) |
| carimbo do fim da aquisição y | yf: carimbo do fim da conversa do degrau |
| offset comum b | bo: offset do relógio da plataforma, quando ela carimba os dois eventos |
| offsets distintos b, g | o fechamento foi carimbado pela máquina do commit e o fim da conversa pela plataforma (v10) |
| resíduos e, d com e − d ≤ B | erro diferencial entre os dois carimbos do mesmo relógio |
| deriva r entre eventos | o offset do relógio da plataforma muda entre o fim da conversa e o fechamento |
| mesmo pulso nos dois canais | um comentário-referência carimbado pelo mesmo relógio que o registro de mudanças, que mede o erro diferencial |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). Controle de ida da v12: i ≤ 3/10, válido só se o fechamento vier depois do fim da conversa (ac ≥ af).

## 2. Consultas no Z3 (v18)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MESMO_RELOGIO",["xc = ac + bo + ec","yf = af + bo + df","ec − df ≤ 1 / 10","xc − yf = 3 / 10"],"ac − af ≥ 1 / 5","SEGUE",["sat","sat","unsat"],0],
["RELOGIOS_DISTINTOS",["xc = ac + bo","yf = af + go","xc − yf = 3 / 10"],"ac ≥ af","EM ABERTO",["sat","sat","sat"],0],
["DERIVA_ENTRE_EVENTOS",["xc − yf = 3 / 10","xc − yf = ac − af + rr + ec","rr = 1 / 4","ec = 1 / 10"],"ac ≥ af","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_MESMO_RELOGIO",["s × (1 − s) = 0","xc = ac + bo + ec","yf = af + bo + df","ec − df ≤ 1 / 10","xc − yf = 3 / 10","(ac ≥ af) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["DISTINTOS_NAO_DECIDE",["s × (1 − s) = 0","xc = ac + bo","yf = af + go","xc − yf = 3 / 10","(ac ≥ af) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **MESMO_RELOGIO.** Quando o mesmo relógio carimba o fechamento e o fim da conversa, o offset bo cancela. Com diferença carimbada de 3/10 e erro diferencial de no máximo 1/10, o fechamento vem pelo menos 1/5 depois do fim. É o análogo de OFFSET_COMUM.
- **RELOGIOS_DISTINTOS.** Com relógios diferentes e sem limite para a diferença entre eles, a mesma diferença carimbada é compatível com as duas ordens: EM ABERTO. É o análogo de OFFSET_DISTINTO.
- **DERIVA_ENTRE_EVENTOS.** Se o offset deriva 1/4 entre os eventos e o resíduo é 1/10, a diferença carimbada de 3/10 esconde uma diferença física de −1/20. Afirmar que o fechamento cobre o fim **contradiz** os dados. É o análogo de DERIVA.
- **DECIDE_MESMO_RELOGIO.** Com o mesmo relógio e a ordem garantida, o controle vale e a fonte fica decidida (s = 1).
- **DISTINTOS_NAO_DECIDE.** Com relógios distintos, a fonte fica EM ABERTO.

## 3. Consequência para a língua secreta

1. **O carimbo da plataforma é o melhor relógio para comparar.** Se a própria plataforma carimba o comentário, o fim da conversa e a mudança de regra, o erro comum dela cancela na diferença. Só sobra o erro diferencial, e isso pode recuperar a cobertura que a v17 deixou EM ABERTO.
2. **Misturar relógios exige limite diferencial.** Comparar o carimbo da plataforma com o horário da máquina do commit (ou com o bloco Bitcoin) sem um limite entre eles deixa a ordem EM ABERTO. É o mesmo ponto da v10, agora na pergunta "o fechamento veio depois?".
3. **Um relógio comum não basta se ele deriva entre os eventos.** Se o offset da plataforma muda entre o fim da conversa e o fechamento, a guarda tem de somar a deriva: r + e − d ≤ B.
4. **O erro diferencial se mede com um pulso comum.** Um comentário-referência carimbado pela plataforma e registrado no mesmo instante no registro de mudanças mede o erro diferencial. É o "mesmo pulso nos dois canais" do Todo 36.
5. **Paralelo entre as séries.**

   | Série | Diferença carimbada | Limite B | Folga garantida | Contraexemplo |
   |---|---|---|---|---|
   | GPT | 0,12 ms | 0,05 ms | 0,07 ms | deriva de 0,10 ms gera −0,03 ms |
   | Esta | 3/10 | 1/10 | 1/5 | deriva de 1/4 gera −1/20 |

## 4. Próximo ponto

O Todo 36 propõe derivar uma guarda de tempo depois da perda do sinal de sincronismo. Na língua secreta, isso equivale a uma queda ou mudança do relógio da plataforma no meio do período, por exemplo uma reindexação ou uma migração de servidor. Depois da queda, o erro diferencial cresce com a idade (v10) até uma nova referência. A decisão só se sustenta enquanto a guarda acumulada couber.

## Integridade

- SHA-256 do Todo 36, conferido nos bytes contra o `.sha256` do GPT: `b5d41184c96a86c66b123b1496e6c3f14ba4ddcc5448893e48ce840d4278c822`.
- SHA-256 da v17 desta série: `4ed9c7053f240efb8d2e2e90c292ffc8a2fc52bb11e196280dd48f1a216cb424`.
- Commit remoto de partida: `91f120677623740ab29b9b4551019a835a3af4ff`.
- O hash desta v18 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v19 — Idade da guarda depois que o relógio perde a referência

Esta versão parte do Todo 37 do GPT, "Prazo da guarda após perda de sincronismo", conferido pelo SHA-256 `31a31c44db95f82890869da0d55c3c62e35f63e6922c51c8fdb6186a31280661`. O Todo 37 cita a v18 desta série pelo SHA e reexecutou os 5 casos dela, todos com o estado esperado e código zero.

Pontos do Todo 37:
- Depois de perder a referência, a guarda cresce: B(t) = B₀ + ρt.
- A ordem só está garantida enquanto D ≥ B(t). A idade máxima é (D − B₀)/ρ.
- Passado esse ponto, a ordem fica EM ABERTO, e o resíduo máximo dá um contraexemplo.
- Com dois relógios livres, é preciso limitar a frequência diferencial (por exemplo, pela soma dos limites). Não se pode reaproveitar a guarda de um relógio só.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 37 | Língua secreta |
|---|---|
| perda do sincronismo (GPS) | o relógio da plataforma perde a referência comum, por exemplo numa migração de servidor ou reindexação, e passa a correr livre |
| B₀ | guarda diferencial no momento da última referência válida (v18) |
| ρ | limite da deriva do relógio livre por unidade de tempo |
| t | tempo desde a última referência válida |
| D | diferença carimbada entre o fechamento do registro de mudanças e o fim da conversa do degrau |
| dois relógios livres | o relógio da plataforma e o da máquina do commit, ambos sem referência |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale se a ordem z ≥ 0 estiver garantida.

## 2. Consultas no Z3 (v19)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída. No cenário sintético, B₀ = 1/5, ρ = 1/20 e D = 11/20, o que dá idade máxima (D − B₀)/ρ = 7.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ATE_A_IDADE",["t ≥ 0","t ≤ 7","bb = 1 / 5 + t / 20","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","SEGUE",["sat","sat","unsat"],0],
["ALEM_ABERTO",["t = 8","bb = 1 / 5 + t / 20","e ≥ −bb","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","EM ABERTO",["sat","sat","sat"],0],
["INVERSAO",["t = 8","e = 1 / 5 + t / 20","z = 11 / 20 − e"],"z ≥ 0","CONTRADIZ",["sat","unsat","sat"],0],
["DOIS_RELOGIOS_LIVRES",["t = 4","bb = 1 / 5 + 2 × t / 20","e ≥ −bb","e ≤ bb","z = 11 / 20 − e"],"z ≥ 0","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_ATE_A_IDADE",["s × (1 − s) = 0","t ≥ 0","t ≤ 7","bb = 1 / 5 + t / 20","e ≤ bb","z = 11 / 20 − e","(z ≥ 0) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ATE_A_IDADE.** Até t = 7, a guarda B(t) não passa de D, e a ordem fica garantida. É o análogo de ATE_SETE.
- **ALEM_ABERTO.** Em t = 8, a guarda (3/5) passa de D (11/20), e a ordem fica EM ABERTO. É o análogo de OITO_ABERTO.
- **INVERSAO.** Em t = 8, com o desvio no máximo, a diferença física é −1/20, e afirmar a ordem **contradiz** os dados. É o análogo de INVERSAO. Isso retira a garantia, mas não prova que a ordem esteja invertida em geral.
- **DOIS_RELOGIOS_LIVRES.** Se a plataforma e a máquina do commit correm livres, cada uma com ρ = 1/20, a deriva diferencial pode chegar a 2ρ. Em t = 4, a guarda de um relógio só daria 2/5 < D. A guarda diferencial, porém, é 3/5 > D, e a ordem fica EM ABERTO. Reaproveitar a guarda de um relógio teria dado uma certeza falsa.
- **DECIDE_ATE_A_IDADE.** Dentro da idade garantida, o controle vale e a fonte fica decidida (s = 1).

## 3. Consequência para a língua secreta

1. **Toda queda de referência do relógio da plataforma abre um prazo.** A partir da queda, a comparação entre o fechamento e o fim da conversa só se sustenta até (D − B₀)/ρ. Passado esse prazo, a saída é EM ABERTO.
2. **O instante da última referência válida precisa ficar registrado.** Ele vai junto com os carimbos e o estado do relógio, no registro com SHA-256. Sem saber quando foi a última referência, não dá para calcular t, e a saída é EM ABERTO.
3. **Dois relógios livres somam derivas.** Quando a plataforma e a máquina do commit ficam sem referência ao mesmo tempo, a guarda usa a deriva diferencial e não a de um relógio só (DOIS_RELOGIOS_LIVRES).
4. **ρ precisa vir de medida, não de suposição.** O limite de deriva do relógio livre da plataforma não é público. Sem fonte, nenhuma idade é garantida.
5. **Paralelo com o GPT:**
   - **GPT:** D = 120 µs, B₀ = 50 µs, ρ = 10 ppm, idade máxima de 7 s; em 8 s, z vai de −10 a +250 µs.
   - **Esta série:** D = 11/20, B₀ = 1/5, ρ = 1/20, idade máxima de 7; em 8, z vai de −1/20 a 23/20.

## 4. Próximo ponto

O Todo 37 propõe testar a reentrada em sincronismo quando ocorre um salto de fase ou uma correção gradual (slewing). Na língua secreta, isso é o relógio da plataforma voltando à referência depois da migração. Se ele salta, carimbos de antes e de depois do salto não podem ser comparados diretamente. Se a correção é gradual, a deriva continua por um tempo, e a guarda só volta a B₀ quando a correção termina.

## Integridade

- SHA-256 do Todo 37, conferido nos bytes contra o `.sha256` do GPT: `31a31c44db95f82890869da0d55c3c62e35f63e6922c51c8fdb6186a31280661`.
- SHA-256 da v18 desta série: `87ee05c9a36ad58520b903a0d47a642058186a44684ee6e9df25945c953cc38f`.
- Commit remoto de partida: `80b26f2f244bc5476f7eb64efc16d07bc11b873e`.
- O hash desta v19 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v20 — Salto do relógio da plataforma ao voltar à referência

Esta versão parte do Todo 38 do GPT ("Ordem dos carimbos na reentrada em sincronismo"), conferido pelo SHA-256 `dc56362fd08409e6c94a494c18589d4a13542c54c84141aa01d64c46b33f225a`. O Todo 38 responde à pergunta da v19 sobre registros em lados diferentes de uma correção de fase, cita a v19 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 38 estabelece:
- A diferença de carimbos é d = z + j + e, em que z é a diferença física, j o salto de fase assinado e e o resíduo.
- Um salto para trás pode inverter a ordem dos carimbos brutos.
- Uma ponte que limita j decide a ordem.
- Saber só a direção do salto deixa EM ABERTO.
- Uma correção gradual com inclinação mínima m > 0 preserva a ordem.
- Voltar a sincronizar não torna confiáveis, sozinho, as comparações que atravessam a transição.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 38 | Língua secreta |
|---|---|
| reentrada em sincronismo com salto j | o relógio da plataforma volta à referência depois de uma migração ou reindexação e salta |
| corte num segmento, fechamento em outro | o fim da conversa do degrau foi carimbado antes do salto, e o fechamento do registro de mudanças depois dele |
| ponte certificada (limite de j) | registro com fonte do tamanho do salto, por exemplo uma nota da plataforma ou um comentário-referência carimbado nos dois lados |
| correção gradual com inclinação ≥ m | a plataforma ajusta o relógio aos poucos, sem salto |
| contador monotônico do instrumento | a numeração de comentários da plataforma, se ela refletir a ordem real de chegada |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle de ida da v12 (i ≤ 3/10) só vale com a ordem zz ≥ 0 garantida.

## 2. Consultas no Z3 (v20)

Foram 6 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SALTO_INVERTE",["zz = 2 / 5","jj = −3 / 5","dd = zz + jj"],"dd ≥ 0","CONTRADIZ",["sat","unsat","sat"],0],
["PONTE",["dd = −1 / 5","jj ≥ −7 / 10","jj ≤ −1 / 2","ee ≤ 1 / 20","dd = zz + jj + ee"],"zz ≥ 1 / 4","SEGUE",["sat","sat","unsat"],0],
["SO_A_DIRECAO",["dd = −1 / 5","dd = zz + jj","jj ≤ 0"],"zz ≥ 0","EM ABERTO",["sat","sat","sat"],0],
["CORRECAO_GRADUAL",["a ≥ 9 / 10","dd = a × zz","zz > 0"],"dd > 0","SEGUE",["sat","sat","unsat"],0],
["DECIDE_COM_PONTE",["s × (1 − s) = 0","dd = −1 / 5","jj ≥ −7 / 10","jj ≤ −1 / 2","ee ≤ 1 / 20","dd = zz + jj + ee","(zz ≥ 0) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["SEM_PONTE_NAO_DECIDE",["s × (1 − s) = 0","dd = −1 / 5","dd = zz + jj","jj ≤ 0","(zz ≥ 0) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **SALTO_INVERTE.** O fechamento veio fisicamente 2/5 depois do fim da conversa. Com um salto de −3/5 entre os dois, os carimbos brutos dão −1/5. Ordenar pelos carimbos **contradiz** a ordem real. É o análogo de SALTO_INVERTE.
- **PONTE.** Com a diferença carimbada de −1/5, o salto limitado entre −7/10 e −1/2 e o resíduo até 1/20, o fechamento vem pelo menos 1/4 depois do fim. É o análogo de PONTE.
- **SO_A_DIRECAO.** Saber só que o salto foi para trás, sem o tamanho, deixa a ordem EM ABERTO. É o análogo de SEM_PONTE.
- **CORRECAO_GRADUAL.** Com ajuste gradual de inclinação ao menos 9/10, uma diferença física positiva continua positiva nos carimbos. É o análogo de RAMPA. A consulta não inclui quantização: diferenças pequenas ainda exigem guarda residual.
- **DECIDE_COM_PONTE.** Com a ponte, o controle vale e a fonte fica decidida (s = 1).
- **SEM_PONTE_NAO_DECIDE.** Sem a ponte, a fonte fica EM ABERTO.

## 3. Consequência para a língua secreta

1. **Os carimbos de antes e de depois de um salto não se comparam diretamente.** Se a plataforma reindexou ou migrou entre o fim da conversa e o fechamento, ordenar pelos horários brutos pode inverter a ordem real.
2. **A ponte precisa de fonte.** O tamanho do salto tem de vir de registro independente: uma nota da plataforma ou um comentário-referência carimbado nos dois lados da transição. Saber só que "o relógio voltou para trás" não basta.
3. **Correção gradual preserva a ordem, mas não a diferença exata.** Se a plataforma ajusta aos poucos, a ordem se mantém. Diferenças pequenas ainda exigem guarda residual (v18).
4. **A numeração da plataforma pode ordenar, mas não medir.** Se a plataforma numera os comentários na ordem de chegada, essa numeração ordena eventos do mesmo segmento sem depender do relógio. Ela não dá duração e não liga segmentos diferentes sem ponte.
5. **Paralelo entre as séries:**

   | | Todo 38 (GPT) | Esta série |
   |---|---|---|
   | Inversão | z = 80 µs e j = −120 µs dão d = −40 µs | 2/5 e −3/5 dão −1/5 |
   | Com ponte | z ≥ 50 µs | zz ≥ 1/4 |

## 4. Próximo ponto

O Todo 38 propõe separar a ordem dada pelo contador monotônico da duração física, para o caso em que o contador é reiniciado. Na língua secreta, isso equivale a uma plataforma que renumera comentários depois de uma migração, de modo que o mesmo número passa a apontar outro comentário. A numeração só ordena dentro de uma mesma época. Entre épocas, é preciso um identificador da época, com o mesmo papel do identificador de formato da v14.

## Integridade

- SHA-256 do Todo 38, conferido nos bytes contra o `.sha256` do GPT: `dc56362fd08409e6c94a494c18589d4a13542c54c84141aa01d64c46b33f225a`.
- SHA-256 da v19 desta série: `fba37a341c9444e484626e020a28dbe4b43f613137a829ae4a5e66a627523742`.
- Commit remoto de partida: `8f43d4ada2a6e161d2059f8f92ea9e8f1db09d99`.
- O hash desta v20 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v21 — Migração da plataforma: ordem decidida, idade aberta

Esta versão parte do Todo 39 do GPT, "Um reinício separa ordem de duração", conferido pelo SHA-256 `241dba3e947b2859d2fdb61e7d871020791b615b5a957fdddf021f8595e7c1a2`. O Todo 39 continua a v20 desta série (numeração reiniciada após migração), cita a v20 pelo SHA e reexecutou os 6 casos dela, todos com o estado esperado.

O que o Todo 39 estabelece:
- Com épocas encadeadas (x ≤ a ≤ b ≤ y), a ordem fica decidida mesmo que o número posterior seja menor.
- A duração d = u + g + v inclui o intervalo cego g da reinicialização.
- Sem um limite para g, o prazo fica EM ABERTO.
- Com g limitado, o prazo é decidido; com g grande demais, a garantia é contraditada.
- Não se deve contar g como zero na ausência de uma ponte.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 39 | Língua secreta |
|---|---|
| época anterior e posterior | a plataforma antes e depois de uma migração que renumera comentários (v20) |
| x ≤ a ≤ b ≤ y | comentário-referência na época antiga (xa), fim certificado da época antiga (fa), início certificado da nova (ib), comentário medido na época nova (yb) |
| número posterior menor | o comentário novo tem número menor que o antigo, porque a numeração reiniciou |
| u, g, v | trecho medido antes da migração, intervalo cego da migração e trecho medido depois |
| prazo de 10 ms | idade admissível da referência pela v6: lv·dd + k < 1 |
| ponte que mede g | registro externo da duração da migração, como uma nota pública da plataforma com horários ou um relógio independente |

Comentário medido: m = s + b. Referência: r = q + bb, com |b − bb| ≤ lv·dd + k, como na v6. Aqui dd = u + g + v atravessa a migração.

## 2. Consultas no Z3 (v21)

Seis consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ORDEM_ENTRE_EPOCAS",["xa ≤ fa","fa ≤ ib","ib ≤ yb"],"xa ≤ yb","SEGUE",["sat","sat","unsat"],0],
["NUMERO_NAO_ORDENA",["nx > ny"],"xa ≤ yb","EM ABERTO",["sat","sat","sat"],0],
["IDADE_ABERTA",["g ≥ 0","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","EM ABERTO",["sat","sat","sat"],0],
["PONTE_LIMITA_IDADE",["g ≥ 0","g ≤ 3 / 2","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","SEGUE",["sat","sat","unsat"],0],
["PONTE_TARDE",["g = 8 / 5","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10"],"lv × dd + k < 1","CONTRADIZ",["sat","unsat","sat"],0],
["DECIDE_COM_PONTE",["s × (1 − s) = 0","g ≥ 0","g ≤ 3 / 2","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ORDEM_ENTRE_EPOCAS.** Com o fim da época antiga e o início da nova certificados, a referência antiga vem antes do comentário novo. Análogo de ORDEM.
- **NUMERO_NAO_ORDENA.** Saber só que o número do comentário antigo é maior que o do novo não fixa a ordem dos eventos: EM ABERTO. Números de épocas diferentes não se comparam.
- **IDADE_ABERTA.** A referência foi feita antes da migração e o comentário depois. Sem limite para o intervalo cego g, a idade dd não tem teto, e a condição de idade da v6 fica EM ABERTO. Análogo de DURACAO_ABERTA.
- **PONTE_LIMITA_IDADE.** Com a migração limitada a g ≤ 3/2, a idade fica abaixo de 1,7 e lv·dd + k < 1. A referência vale. Análogo de PONTE_LIMITE.
- **PONTE_TARDE.** Com g = 8/5, lv·dd + k = 1, que é o degrau, e a condição **contradiz** os dados. Análogo de PONTE_TARDE. A garantia cai, mas isso não prova a outra fonte.
- **DECIDE_COM_PONTE.** Com a ponte, a referência literal decide a fonte (s = 0).

## 3. Consequência para a língua secreta

1. **Ordem e idade são perguntas diferentes.** Uma migração com fronteiras certificadas permite dizer que a referência veio antes do comentário. Não permite dizer quanto tempo passou. A idade é o que a v6 exige para a referência valer.
2. **Não contar a migração como zero.** O tempo em que a plataforma esteve fora do ar ou migrando entra na idade da referência. Sem uma ponte com fonte para esse tempo, uma referência anterior à migração não decide a fonte de um comentário posterior.
3. **A numeração nova não se compara com a antiga.** Depois de uma migração, um número menor não quer dizer "antes". A ordem entre épocas exige a cadeia certificada fim antigo → início novo.
4. **Melhor ter uma referência do mesmo lado da migração.** Uma referência na época nova, vizinha ao comentário (v5), dispensa a ponte. Ela vale mais que uma referência antiga com migração no meio.
5. **Paralelo com o GPT:**

   | | Sem limite para g | g permitido | g que derruba a garantia |
   |---|---|---|---|
   | Todo 39 | prazo EM ABERTO | ≤ 7 ms | 8 ms |
   | Esta série | idade EM ABERTO | ≤ 3/2 | 8/5 |

## 4. Próximo ponto

O Todo 39 propõe testar os limites da ponte com duas âncoras externas incertas, incluindo o caso em que ambas compartilham o mesmo deslocamento. Na língua secreta, as duas âncoras para medir a duração da migração podem ser a nota pública da plataforma e o carimbo do bloco Bitcoin de um commit feito durante a migração. O OTS só entra com sim explícito. Se as duas âncoras compartilham o mesmo deslocamento, o erro comum cancela na duração (v18). Se não compartilham, os erros se somam.

## Integridade

- SHA-256 do Todo 39, conferido nos bytes contra o `.sha256` do GPT: `241dba3e947b2859d2fdb61e7d871020791b615b5a957fdddf021f8595e7c1a2`.
- SHA-256 da v20 desta série: `64d1b7e7a71e9748dbe86fae2eddfd871a4ac0430b1b07f4ff95d29fc830bd6a`.
- Commit remoto de partida: `491ed4315b362dc75aeaf40789ca385e3d1b832f`.
- O hash desta v21 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v22 — Duas âncoras externas em volta da migração

Esta versão parte do Todo 40 do GPT, "Duas âncoras externas podem limitar o intervalo cego", conferido pelo SHA-256 `5ca845cd8caa30453a0b3861db53a42860e05d291cb225389bdfd144f59d1bc1`. O Todo 40 segue a proposta das duas âncoras feita na v21 desta série, cita a v21 pelo SHA e reexecutou os 6 casos dela com o estado esperado.

O que o Todo 40 estabelece:
- Com p ≤ a ≤ b ≤ q e carimbos de deslocamento comum, o intervalo cego tem o limite g ≤ (y − x) + (e − f), mesmo com o deslocamento desconhecido.
- Marcas dentro da parada dão só limite inferior, e g fica EM ABERTO.
- Offsets distintos sem guarda diferencial também deixam EM ABERTO.
- A direção do vínculo causal conta: uma publicação tardia sobre o início não prova que foi carimbada antes da parada.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 40 | Língua secreta |
|---|---|
| a, b: parada e retorno | fa: fim certificado da época antiga da plataforma; ib: início certificado da nova (v21) |
| p, q: eventos testemunhados por fora | pa: registro externo feito antes da parada; qa: registro externo feito depois do retorno |
| deslocamento comum k | os dois registros externos são carimbados pelo mesmo relógio fora da plataforma (o mesmo serviço) |
| resíduos e, f | erro diferencial entre os dois carimbos externos |
| marcas internas | registros feitos durante a migração, que só mostram que ela durou pelo menos aquilo |
| publicação tardia | um aviso publicado depois da parada falando do início dela |

Comentário medido: m = s + b. Referência: r = q + bb. Como na v6/v21, |b − bb| ≤ lv·dd + k, com dd = 1/10 + g + 1/10.

## 2. Consultas no Z3 (v22)

Cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["ANCORAS_EXTERNAS",["pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk + ea","ya = qa + kk + fe","ya − xa = 6 / 5","ea − fe ≤ 1 / 10"],"ib − fa ≤ 13 / 10","SEGUE",["sat","sat","unsat"],0],
["ANCORAS_INTERNAS",["fa ≤ pa","pa ≤ qa","qa ≤ ib","qa − pa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["RELOGIOS_DISTINTOS",["pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk","ya = qa + ll","ya − xa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["PUBLICACAO_TARDIA",["fa < pa","fa ≤ ib","ib ≤ qa","qa − pa = 6 / 5"],"ib − fa ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["DECIDE_COM_ANCORAS",["s × (1 − s) = 0","pa ≤ fa","fa ≤ ib","ib ≤ qa","xa = pa + kk + ea","ya = qa + kk + fe","ya − xa = 6 / 5","ea − fe ≤ 1 / 10","g = ib − fa","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + b","r = q + bb","bb − b ≤ lv × dd + k","b − bb ≤ lv × dd + k","q = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **ANCORAS_EXTERNAS.** Um registro externo antes da parada e outro depois do retorno, os dois do mesmo relógio, ficam 6/5 apartados nos carimbos, com erro diferencial de até 1/10. Isso limita a migração a g ≤ 13/10, abaixo do 3/2 exigido pela v21, mesmo sem conhecer o deslocamento kk. É o análogo de LIMITE_EXTERNO.
- **ANCORAS_INTERNAS.** Se os registros foram feitos durante a migração, 6/5 é só um mínimo, e o limite de 3/2 fica EM ABERTO. É o análogo de MARCAS_INTERNAS.
- **RELOGIOS_DISTINTOS.** Registros externos em relógios diferentes, sem guarda entre eles, deixam o resultado EM ABERTO. É o análogo de OFFSET_DESCONHECIDO.
- **PUBLICACAO_TARDIA.** O primeiro registro foi publicado depois da parada, mesmo falando do início dela. Ele não delimita a borda, e o resultado fica EM ABERTO.
- **DECIDE_COM_ANCORAS.** A cadeia completa vale assim: âncoras externas → g ≤ 13/10 → idade dd ≤ 3/2 → lv·dd + k ≤ 17/20 < 1 → a referência literal decide a fonte (s = 0).

## 3. Consequência para a língua secreta

1. **A migração se mede de fora, cercando-a.** São precisos dois registros fora da plataforma, um antes de ela parar e outro depois de voltar, carimbados pelo mesmo relógio externo. O deslocamento desse relógio cancela na diferença (v18), e sobra só o erro diferencial.
2. **"Antes" e "depois" precisam ser causais, não só declarados.** O registro de antes precisa ter sido carimbado antes da parada. Um aviso publicado depois falando do início não serve. O registro de depois precisa vir de quando a plataforma já tinha voltado.
3. **Registros durante a migração não fecham o intervalo.** Eles só mostram que ela durou pelo menos aquilo, e o máximo continua EM ABERTO.
4. **A cadeia inteira fecha.** Âncoras externas limitam a migração (v22), a migração limita a idade da referência (v21), a idade limita a deriva da base (v6) e a referência decide a fonte (v3). Cada elo tem fonte própria. Se um faltar, o resultado é EM ABERTO.
5. **Paralelo com o GPT:**
   - Todo 40: carimbos com 6 ms de diferença e guarda de 1 ms dão g ≤ 7 ms.
   - Esta série: diferença de 6/5 e guarda de 1/10 dão g ≤ 13/10.

## 4. Próximo ponto

O Todo 40 propõe deduzir quanto atraso de testemunho, com sinal desconhecido, se tolera sem perder o prazo. Na língua secreta, isso é o atraso entre o evento real (a parada ou o retorno da plataforma) e o registro externo que o testemunha. Se esse atraso tem sinal desconhecido, o registro pode estar do lado errado da borda. A guarda precisa absorver esse atraso nos dois sentidos.

## Integridade

- SHA-256 do Todo 40, conferido nos bytes contra o `.sha256` do GPT: `5ca845cd8caa30453a0b3861db53a42860e05d291cb225389bdfd144f59d1bc1`.
- SHA-256 da v21 desta série: `dd20a4c2029b42b42e5d372722af78707a08352d60ba3bc91ac8a4dd7ee199af`.
- Commit remoto de partida: `e217f26419ff261717a34045cb9c180b3e5e7e1b`.
- O hash desta v22 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v23 — Atraso de registro das âncoras externas

Esta versão parte do Todo 41 do GPT, "Quanto atraso nas âncoras cabe no prazo", conferido pelo SHA-256 `3fa643c73d6221669b5d5d6e8c46301cfad92b363f623c77bc1cb669a90a7801`. O Todo 41 retoma o próximo ponto da v22 (atraso de testemunho com sinal desconhecido), cita a v22 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O que o Todo 41 estabelece:
- A relação básica é g = d + r + a − b, em que a é o atraso da marca de início e b o da marca de fim.
- Com r ≤ B, a ≤ A e b ≥ −C, o teto fica g ≤ d + B + A + C.
- Só dois casos aumentam o teto: a marca de início chegar tarde e a marca de fim chegar adiantada.
- Atraso igual nas duas marcas cancela.
- Usar o mesmo registrador não basta para provar que os atrasos são iguais.
- Um percentil de atraso não serve como limite determinístico.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 41 | Língua secreta |
|---|---|
| parada T₀ e retomada T₁ da plataforma | fim da época antiga e início da nova (v21, v22) |
| marca de início em T₀ + a | o registro externo anterior à migração demora a para ser carimbado, e com a > 0 a marca entra no intervalo |
| marca de fim em T₁ + b | o registro externo posterior, com b < 0, foi carimbado antes de a plataforma voltar de fato |
| r: correção diferencial dos carimbos | erro diferencial entre os carimbos externos (v18, v22) |
| atraso igual nas duas marcas | o mesmo serviço externo, com o mesmo atraso comprovado nas duas pontas |
| percentil de atraso | "o serviço costuma carimbar em menos de X", o que não é limite |

Comentário medido: m = s + bs, com s = 1 (Tubo) ou s = 0 (literal). Referência: rf = q + bb, com |bb − bs| ≤ lv·dd + k, como na v6. A idade é dd = 1/10 + g + 1/10 (v21), e a condição exige g ≤ 3/2.

## 2. Consultas no Z3 (v23)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["GUARDA_UNILATERAL",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 1 / 10","b ≥ −1 / 10"],"g ≤ 3 / 2","SEGUE",["sat","sat","unsat"],0],
["LIMITE_EXCEDIDO",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 3 / 20","b ≥ −3 / 20"],"g ≤ 3 / 2","EM ABERTO",["sat","sat","sat"],0],
["ATRASO_COMUM",["d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a = b"],"g ≤ 13 / 10","SEGUE",["sat","sat","unsat"],0],
["DECIDE_COM_ATRASO",["s × (1 − s) = 0","d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 1 / 10","b ≥ −1 / 10","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + bs","rf = q + bb","bb − bs ≤ lv × dd + k","bs − bb ≤ lv × dd + k","q = 0","rf = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["ATRASO_EXCEDIDO_NAO_DECIDE",["s × (1 − s) = 0","d = 6 / 5","r ≤ 1 / 10","g ≥ 0","g = d + r + a − b","a ≤ 3 / 20","b ≥ −3 / 20","dd = 1 / 10 + g + 1 / 10","lv = 1 / 2","k = 1 / 10","m = s + bs","rf = q + bb","bb − bs ≤ lv × dd + k","bs − bb ≤ lv × dd + k","q = 0","rf = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **GUARDA_UNILATERAL.** A diferença carimbada é 6/5, com erro diferencial de até 1/10. Com atraso de no máximo 1/10 em cada borda, no sentido que aumenta o intervalo, a migração fica limitada a 3/2. É o análogo do teste de mesmo nome no Todo 41.
- **LIMITE_EXCEDIDO.** Com 3/20 em cada borda, o teto passa para 8/5 e o limite de 3/2 fica EM ABERTO. É o análogo de LIMITE_EXCEDIDO.
- **ATRASO_COMUM.** Com atraso comprovadamente igual nas duas marcas, a contribuição cancela e o teto cai para 13/10. É o análogo de ATRASO_COMUM.
- **DECIDE_COM_ATRASO.** A cadeia completa, com atraso de até 1/10 por borda: g ≤ 3/2, depois dd ≤ 17/10, depois lv·dd + k ≤ 19/20 < 1. A referência literal decide a fonte (s = 0).
- **ATRASO_EXCEDIDO_NAO_DECIDE.** A mesma cadeia com 3/20 por borda leva lv·dd + k a até 1, que é o degrau, e a fonte fica EM ABERTO.

## 3. Consequência para a língua secreta

1. **Cada âncora externa tem o seu próprio atraso.** O registro de antes da migração pode ser carimbado depois do momento em que foi feito. O registro de depois pode ter sido carimbado quando a plataforma ainda não tinha voltado de fato. Os dois atrasos entram na guarda, cada um no sentido que aumenta o intervalo.
2. **Mesmo serviço não garante mesmo atraso.** A igualdade dos atrasos precisa de calibração com fonte, como no Todo 41. Sem ela, os dois atrasos somam, e não cancelam.
3. **"Costuma carimbar rápido" não é limite.** Um percentil de atraso do serviço externo não serve como guarda determinística. Para usá-lo, é preciso declarar a cobertura que ele dá e aceitar que o resultado deixa de ser prova.
4. **A folga da cadeia é pequena.** Neste cenário, 1/10 por borda fecha a decisão e 3/20 a deixa aberta. O atraso das âncoras compete pela mesma folga que a idade da referência (v6) e o erro diferencial (v18).
5. **Paralelo entre as séries:**

| | Fecha | Fica EM ABERTO | Com atraso igual |
|---|---|---|---|
| Todo 41 | 0,25 ms por borda | 0,30 ms por borda | teto de 6,5 ms |
| Esta série | 1/10 por borda | 3/20 por borda | teto de 13/10 |

## 4. Próximo ponto

O Todo 41 propõe transformar limites probabilísticos por borda em cobertura conjunta, sem presumir independência. Na língua secreta, isso vale para quando só existem percentis do serviço externo, por exemplo "95% dos carimbos em menos de X". A cobertura conjunta das duas bordas, sem supor independência, usa a desigualdade da união: no mínimo 90% para as duas juntas. Mesmo assim, o resultado fica declarado como cobertura, e não como prova. Pela regra da série, ele não vira lei.

## Integridade

- SHA-256 do Todo 41, conferido nos bytes contra o `.sha256` do GPT: `3fa643c73d6221669b5d5d6e8c46301cfad92b363f623c77bc1cb669a90a7801`.
- SHA-256 da v22 desta série: `f8dae5a6e7ccfa4e4d910eb1428286b227a68c814f3737b8dbd21ff0a0b79c31`.
- Commit remoto de partida: `fdc3706fb50659f3d496424e3311313a31a2d89a`.
- O hash desta v23 está no arquivo `.sha256` ao lado.

---

# 15/11/2026 — Língua secreta v24 — Cobertura do lote não decide o caso

Esta versão parte do Todo 42 do GPT, "Cobertura conjunta das duas bordas", conferido pelo SHA-256 `60e48b192dbd2250c8b1ac3bf486419ae5b2db614feab0654db4033fb690140b`. O Todo 42 segue o próximo ponto da v23, cita a v23 pelo SHA e reexecutou os 5 casos dela com o estado esperado.

O Todo 42 mostra três coisas sobre as duas bordas:
- Com falha marginal de no máximo α₁ e α₂, a cobertura conjunta é de pelo menos 1 − α₁ − α₂, sem supor independência.
- Duas marginais de 95% garantem 90%, mas deixam 95% EM ABERTO. Falhas disjuntas contradizem os 95%.
- Duas marginais de 97,5% garantem 95%.

**Desvio declarado desta série.** O Todo 42 é probabilístico, e a regra desta série proíbe probabilidade como premissa. A tradução usa **contagens num lote finito e registrado**, ou seja, degraus já feitos, cada um com SHA-256. A mesma álgebra (massas não negativas que somam um total fixo) vale para contagens sem nenhuma hipótese de probabilidade. Esta rodada acrescenta uma consulta que o Todo 42 não tem: **a cobertura de um lote não decide um caso individual.**

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 42 | Língua secreta |
|---|---|
| massas a, b, c, d (nenhuma falha, só início, só fim, ambas) | contagens na, nb, nc, nd num lote de 20 degraus registrados |
| P(Fᵢ) ≤ αᵢ | no máximo 1 degrau do lote falhou na âncora de início, e no máximo 1 falhou na de fim (v22, v23) |
| cobertura conjunta ≥ 1 − α₁ − α₂ | pelo menos 20 − 1 − 1 = 18 degraus tiveram as duas âncoras dentro da guarda |
| falhas disjuntas | os dois degraus com falha são diferentes |
| percentil não garante o regime de uso | a contagem de um lote passado não se transfere sozinha para o próximo degrau (v13, v14) |

Comentário medido: x = s + i, com s = 1 (Tubo) ou s = 0 (literal). O controle (i ≤ 3/10) só vale se as guardas daquele degrau passaram (gu = 1).

## 2. Consultas no Z3 (v24)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["CONTAGEM_UNIAO",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb + nd ≤ 1","nc + nd ≤ 1"],"na ≥ 18","SEGUE",["sat","sat","unsat"],0],
["CONJUNTA_ABERTA",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb + nd = 1","nc + nd = 1"],"na ≥ 19","EM ABERTO",["sat","sat","sat"],0],
["FALHAS_DISJUNTAS",["na ≥ 0","nb ≥ 0","nc ≥ 0","nd ≥ 0","na + nb + nc + nd = 20","nb = 1","nc = 1","nd = 0"],"na ≥ 19","CONTRADIZ",["sat","unsat","sat"],0],
["CASO_INDIVIDUAL_ABERTO",["s × (1 − s) = 0","gu × (1 − gu) = 0","na ≥ 18","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["CASO_INDIVIDUAL_VERIFICADO",["s × (1 − s) = 0","gu = 1","(gu = 1) ⟹ (i ≤ 3 / 10)","i ≥ 0","i ≤ 1","x = s + i","x = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **CONTAGEM_UNIAO.** Num lote de 20, com no máximo uma falha em cada borda, pelo menos 18 degraus tiveram as duas guardas dentro do limite, sem nenhuma hipótese sobre como as falhas se distribuem. É o análogo de MARGINAIS_95, em contagens.
- **CONJUNTA_ABERTA.** Com exatamente uma falha em cada borda, a afirmação de que 19 degraus passaram fica EM ABERTO, porque depende de as falhas terem caído no mesmo degrau. É o análogo de CONJUNTA_95_ABERTA.
- **FALHAS_DISJUNTAS.** Se as falhas caíram em degraus diferentes, só 18 passaram, e afirmar 19 **contradiz** a contagem. É o análogo de FALHAS_DISJUNTAS.
- **CASO_INDIVIDUAL_ABERTO.** Saber que pelo menos 18 de 20 degraus passaram não diz se *este* degrau passou. A fonte deste comentário fica EM ABERTO. A cobertura do lote não chega ao indivíduo.
- **CASO_INDIVIDUAL_VERIFICADO.** Com as guardas deste degrau verificadas (gu = 1), a fonte fica decidida (s = 1).

## 3. Consequência para a língua secreta

1. **Lote e caso são perguntas diferentes.** "Pelo menos 18 de 20 degraus tiveram as âncoras dentro da guarda" é uma afirmação sobre o lote e pode ser provada por contagem. Ela não autoriza dizer, para uma pessoa específica, que a fonte é Tubo ou literal. Isso exige as guardas daquele degrau verificadas. É o 0 confident wrong aplicado à cobertura.
2. **Não somar falhas como se fossem independentes.** Sem saber se as falhas das duas bordas caem nos mesmos degraus, vale a soma (o pior caso disjunto). Supor que as falhas coincidem seria otimismo sem fonte.
3. **Contagem de lote passado não é limite do próximo.** Como no Todo 42, um percentil ou uma contagem amostral precisa de garantia própria para valer no regime de uso. Na série, isso quer dizer: mesmo formato (v14), mesmo período (v10) e controles válidos (v12, v13).
4. **Sem probabilidade, sem perda.** Toda a álgebra do Todo 42 se transfere para contagens com fonte. O que não se transfere é a leitura "a chance de este caso estar certo é 90%". A série não faz essa leitura: o resultado de cada caso é SEGUE, CONTRADIZ ou EM ABERTO.
5. **Paralelo com o GPT:**
   - **Todo 42:** 95% + 95% garantem 90%; os 95% conjuntos ficam EM ABERTO; com 97,5% + 97,5% se chega a 95%.
   - **Esta série:** 1 + 1 falhas em 20 garantem 18; 19 fica EM ABERTO; o caso individual fica EM ABERTO sem a verificação dele mesmo.

## 4. Próximo ponto

O Todo 42 propõe calcular quantas tentativas de validação com zero falhas sustentam uma cota unilateral do risco. Na série, isso entra só como **cobertura declarada do lote**, nunca como prova de um caso. A pergunta equivalente sem probabilidade é: quantos degraus registrados, todos com as guardas verificadas, são necessários antes de transferir os controles para um novo formato com o g da v13? A resposta depende de uma regra declarada com fonte, não de uma taxa estimada.

## Integridade

- SHA-256 do Todo 42, conferido nos bytes contra o `.sha256` do GPT: `60e48b192dbd2250c8b1ac3bf486419ae5b2db614feab0654db4033fb690140b`.
- SHA-256 da v23 desta série: `82fc9c2c2f7b88d2246d366c410930b420c3069c0448b0bb194f3ef0ef80b9b5`.
- Commit remoto de partida: `4e979547eb9c555c9c43c2114c5b9244fa7c951f`.
- O hash desta v24 está no arquivo `.sha256` ao lado.
