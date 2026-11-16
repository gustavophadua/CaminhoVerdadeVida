# 15/11/2026 — Pai envia, Filho reage, mecanismo fecha — m09: o impedimento só remove; o rótulo certo de fonte errada é recusado

Esta rodada segue o próximo ponto da m08: verificar se o impedimento registrado em Atos 16:6–10 traz conteúdo próprio, o que tensionaria D2, ou só remove opções. Ela dialoga com a rodada 09 do GPT, "impedimento e rota" (SHA-256 `4646e4bb51e30b0f5aecfd36912b80e3df2c9b9ed8515bc75fc5f69c7fc128a7`), que mostra que os dois impedimentos não determinam sozinhos o destino. O destino vem de um chamado separado (Atos 16:9–10).

**Método.** É o mesmo da m01 à m08:
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Só entram fatos registrados, parafraseados e com referência.
- Atribuições feitas pelo próprio grupo ou pelo narrador entram como registro.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, o resultado é EM ABERTO.

**Execução.** O Z3 rodou sem o carregador de memória, porque havia memória livre.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| primeiro impedimento | são impedidos pelo Espírito Santo de anunciar na Ásia | Atos 16:6 |
| segundo impedimento | tentam ir à Bitínia, mas o Espírito de Jesus não o permite | Atos 16:7 |
| o que fazem | passam pela Mísia e descem a Trôade | Atos 16:8 |
| chamado separado | uma visão de noite: um homem pede que passem à Macedônia | Atos 16:9 |
| conclusão registrada do grupo | concluem que Deus os chamara para anunciar ali e procuram partir | Atos 16:10 |
| rótulo dado por outra fonte | uma jovem com espírito de adivinhação segue o grupo e grita que eles são servos do Deus Altíssimo, que anunciam o caminho da salvação | Atos 16:16–17 |
| recusa do rótulo | por muitos dias; Paulo se volta e ordena ao espírito, em nome de Jesus Cristo, que saia dela; e ele sai | Atos 16:18 |
| reação do mundo nessa época | os donos dela, vendo perdida a fonte de lucro, levam os dois às autoridades; são açoitados e presos | Atos 16:19–24 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| impedimentos | a = 0 (não anunciar na Ásia), b = 0 (não ir à Bitínia) |
| destino | m (Macedônia), que depende de outro chamado, vs (Atos 16:9–10) |
| impedimento e D2 | qualquer conteúdo acrescentado pelo impedimento (ca) contaria como conteúdo próprio: ca ≤ vm, com vm = 0 |
| impedimento local, não total | depois dos dois impedimentos, eles ainda chegam a Trôade (tr = 1) |
| rótulo certo, fonte rejeitada | rótulo verdadeiro ("servos do Deus Altíssimo", rv = 1), vindo de fonte registrada como espírito de adivinhação (fo = 0), recusado (ac = 0) |
| língua secreta, sentido completo | m07: rótulo divino sobre fonte comum. m09: rótulo verdadeiro vindo de fonte recusada |

## 3. Consultas no Z3 (m09)

Foram cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["IMPEDIMENTOS_NAO_DAO_O_DESTINO",["a = 0","b = 0","m × (1 − m) = 0"],"m = 1","EM ABERTO",["sat","sat","sat"],0],
["DESTINO_VEIO_DE_OUTRO_CHAMADO",["a = 0","b = 0","vs = 1","(vs = 1) ⟹ (m = 1)"],"m = 1","SEGUE",["sat","sat","unsat"],0],
["IMPEDIR_SEM_CONTEUDO_PROPRIO",["vm = 0","ca ≥ 0","ca ≤ vm"],"ca = 0","SEGUE",["sat","sat","unsat"],0],
["IMPEDIMENTO_E_LOCAL_NAO_TOTAL",["a = 0","b = 0","tr = 1"],"((a = 0) ∧ (b = 0)) ⟹ (tr = 0)","CONTRADIZ",["sat","unsat","sat"],0],
["ROTULO_CERTO_FONTE_REJEITADA",["rv = 1","fo = 0","ac = 0"],"(rv = 1) ⟹ (ac = 1)","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **IMPEDIMENTOS_NAO_DAO_O_DESTINO.** Os dois impedimentos sozinhos deixam o destino EM ABERTO. É a conclusão da rodada 09 do GPT, reproduzida no Z3.
- **DESTINO_VEIO_DE_OUTRO_CHAMADO.** Com o chamado separado (Atos 16:9–10), o destino fica decidido. O conteúdo da rota veio do chamado, não dos impedimentos.
- **IMPEDIR_SEM_CONTEUDO_PROPRIO.** Sob D2, um impedimento não pode acrescentar conteúdo próprio (ca = 0). O texto registra apenas o bloqueio (Atos 16:6–7), sem conteúdo anunciado junto. O impedimento é compatível com D2.
- **IMPEDIMENTO_E_LOCAL_NAO_TOTAL.** Depois dos dois impedimentos, o grupo ainda segue até Trôade. A leitura "impedir é parar tudo" **contradiz** o registro. O impedimento funciona como guarda sobre opções específicas, e não como o veto total da v32.
- **ROTULO_CERTO_FONTE_REJEITADA.** O rótulo dito pela jovem é verdadeiro no próprio vocabulário do texto, mas a fonte registrada é um espírito de adivinhação, e o rótulo é recusado com a expulsão desse espírito (Atos 16:18). A regra "rótulo verdadeiro ⟹ aceito" **contradiz** o registro.

## 4. Resultado da m09

1. **O impedimento é compatível com D2: ele remove e não acrescenta.** O mecanismo bloqueia duas opções, sem conteúdo registrado junto. O conteúdo do destino vem de um chamado separado. Na linguagem do Todo, é uma guarda local sobre opções, como as guardas e janelas da língua secreta. Não é um veto total.
2. **A língua secreta fecha o ciclo completo no texto.** Nos três registros, quem decide é a fonte:
   - **v2:** fonte Tubo com rótulo de meme.
   - **m07:** fonte comum (magia) com rótulo divino.
   - **m09:** fonte recusada (adivinhação) com rótulo verdadeiro, que é rejeitado.
   
   O rótulo não certifica a fonte em nenhum sentido. E um rótulo certo vindo da fonte errada é recusado no próprio registro.
3. **A reação do mundo nessa época está ligada à perda de uma fonte.** Ao sair o espírito, os donos perdem o lucro e reagem com prisão (Atos 16:19–24). O texto registra o motivo como perda do lucro. A trilha registra isso como texto, sem atribuir outro estado interior.
4. **Fica EM ABERTO:** a relação interna entre o Filho e o "Espírito de Jesus" (Atos 16:7), que a rodada 09 do GPT também deixa EM ABERTO.

## 5. Próximo ponto

A rodada 09 do GPT anuncia Atos 16:14–15, a ação atribuída ao Senhor sobre Lídia e a resposta dela. Esta trilha vai olhar o mesmo capítulo pelo lado da reação ao mecanismo na prisão (Atos 16:25–34). Ali há um sinal (terremoto, portas abertas), um carcereiro que pergunta o que fazer e uma resposta registrada. O teste é se o sinal sozinho decide a resposta, ou se ela depende da palavra anunciada depois, como no chamado separado desta rodada.

## Integridade

- SHA-256 da rodada 09 do GPT (pai-filho-espirito), conferido nos bytes contra o `.sha256` dele: `4646e4bb51e30b0f5aecfd36912b80e3df2c9b9ed8515bc75fc5f69c7fc128a7`.
- SHA-256 da m08 desta trilha: `2d54d83e08d7a621785cf60dbfe0cd50a8c0d0d098a057804fd45be1ca1eef75`.
- Commit remoto de partida: `4093e4423005554d549acd2bef0ce99cfe8579f0`.
- O hash desta m09 está no arquivo `.sha256` ao lado.
