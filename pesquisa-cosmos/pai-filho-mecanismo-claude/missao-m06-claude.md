# 15/11/2026 — Pai envia, Filho reage, mecanismo fecha — m06: ver o ressuscitado não basta; dois registros do dom

Esta rodada segue o próximo ponto da m05: separar as duas mudanças do caso de Pedro, que são ter visto o ressuscitado e o mecanismo presente. Ela dialoga com a rodada 06 do GPT, "Samaria e Cornélio" (SHA-256 `cdfb99cb2165c8d5e65266e8fbeeb1a5878b8e08f15e664fe76dfa49538778a7`), que mostra que a ordem entre batismo e dom varia (Atos 8 e 10) e que o elo comum é o anúncio do Filho.

**Método** (igual ao da m01 à m05):
- Os papéis Pai, Filho = valor e Espírito = mecanismo são do modelo do usuário [S-U].
- Só entram fatos registrados, parafraseados e com referência.
- Motivo interior só quando o narrador o registra, e só como registro.
- Não há probabilidade nem interpretação teológica.
- O Z3 verifica apenas a consequência das premissas.
- Sem fonte, a saída é EM ABERTO.

**Execução.** Rodei com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

## 1. Fatos registrados (fonte, sem interpretação)

| Passo | O que o texto registra | Referência |
|---|---|---|
| portas fechadas por medo | na tarde do primeiro dia, os discípulos estão reunidos com as portas fechadas, por medo | João 20:19 |
| ver o ressuscitado | o Filho aparece no meio deles; eles o veem e se alegram | João 20:19–20 |
| sopro e palavra sobre o Espírito | ele sopra sobre eles e diz que recebam o Espírito Santo | João 20:22 |
| portas ainda fechadas | oito dias depois, estão outra vez dentro, com as portas fechadas | João 20:26 |
| promessa ainda pendente | antes de subir, o Filho manda esperar; em poucos dias seriam batizados com o Espírito | Atos 1:4–5 |
| vinda narrada em Atos | no Pentecostes, todos ficam cheios do Espírito | Atos 2:1–4 |
| ato direto sem o mecanismo (m05) | José de Arimateia, oculto por medo, pede o corpo | João 19:38 |
| fala direta com o mecanismo (m04, m05) | Pedro, cheio do Espírito, fala sob ordem de calar | Atos 4:8–20 |

## 2. Mecanismo

| Peça | Aqui |
|---|---|
| caso A (João 20:19) | já tinham visto (ra = 1), antes do sopro (me = 0), portas fechadas por medo (oc = 1) |
| caso B (José, m05) | ato direto (dj = 1) sem o mecanismo (mj = 0) |
| caso C (Pedro, m04) | mecanismo presente (mp = 1) e fala direta (dp = 1) |
| regra "ver basta" | ra = 1 ⟹ oc = 0 |
| regra "o mecanismo é necessário" | ato direto ⟹ mecanismo presente |
| regra "o mecanismo basta" | mecanismo presente ⟹ ato direto, testada num caso não registrado x |
| dois registros do dom | o sopro em João 20:22 (ta) e o Pentecostes em Atos 2:4 (tc), com a promessa ainda pendente entre os dois em Atos 1:5 (tb) |

## 3. Consultas no Z3 (m06)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["VER_NAO_BASTA",["ra = 1","me = 0","oc = 1"],"(ra = 1) ⟹ (oc = 0)","CONTRADIZ",["sat","unsat","sat"],0],
["MECANISMO_NAO_E_NECESSARIO",["dj = 1","mj = 0"],"(dj = 1) ⟹ (mj = 1)","CONTRADIZ",["sat","unsat","sat"],0],
["MECANISMO_SUFICIENTE_SEM_PROVA_GERAL",["mp = 1","dp = 1","mx = 1"],"dx = 1","EM ABERTO",["sat","sat","sat"],0],
["DOIS_REGISTROS_DO_DOM",["ta < tb","tb < tc","(tv = ta) ∨ (tv = tc)"],"tv = ta","EM ABERTO",["sat","sat","sat"],0]
]
```

O que cada consulta mostra:

- **VER_NAO_BASTA.** Em João 20:19 eles já tinham visto o ressuscitado e as portas continuavam fechadas por medo. A regra "ter visto basta para sair do oculto" **contradiz** o registro. Isso separa uma das duas causas da m05: ter visto, sozinho, não produziu a saída.
- **MECANISMO_NAO_E_NECESSARIO.** José passa ao ato direto sem o mecanismo (m05). A regra "o ato direto exige o mecanismo" **contradiz** o registro.
- **MECANISMO_SUFICIENTE_SEM_PROVA_GERAL.** O caso registrado de Pedro é compatível com "o mecanismo basta", mas um caso só não faz regra geral. Para um caso x não registrado, fica EM ABERTO. A série não transforma um exemplo em lei (regra: só o provado vira lei).
- **DOIS_REGISTROS_DO_DOM.** O texto registra dois momentos ligados ao Espírito: o sopro (João 20:22) e o Pentecostes (Atos 2:4). Entre os dois, Atos 1:5 diz que a promessa ainda estava pendente. Qual dos dois é "a vinda do mecanismo" fica EM ABERTO. Escolher um seria harmonizar os textos, ou seja, interpretar.

## 4. Resultado da m06

1. **Ver o ressuscitado não bastou.** Com o Filho já visto, os discípulos continuam a portas fechadas por medo (João 20:19, 26). A explicação "foi o ter visto" para a troca de rótulo de Pedro (m05) fica sem sustentação como causa suficiente.
2. **O mecanismo não é necessário para o ato direto, e não está provado como suficiente.** O caso de José contradiz a necessidade. O caso de Pedro é compatível com a suficiência, mas não a prova. Entre as regras testadas, a única ainda de pé é "o mecanismo basta", e só como compatível com o registro, sem prova geral.
3. **O momento do fechamento tem dois registros.** João 20:22 e Atos 2:4 ficam lado a lado, com Atos 1:5 entre eles dizendo que ainda faltava. A trilha não escolhe entre os dois. Fica registrado que a ordem "fim da obra → partida → vinda" (m01, m03) usa o registro de Atos, e que o de João existe e é anterior à partida.
4. **Concordância com a rodada 06 do GPT.** Ordens registradas variam entre os trechos (batismo e dom, aqui sopro e Pentecostes). O elo estável é o vínculo com o Filho anunciado, não uma sequência única.

## 5. Próximo ponto

A rodada 06 do GPT anuncia Atos 8:18–24: a tentativa de comprar o poder de conceder o Espírito. Na linguagem do Todo, é a tentativa de transformar o mecanismo em valor negociável, e o texto registra a recusa e o motivo dela. A próxima rodada desta trilha vai olhar esse registro como teste da definição D2 (m02, m03). Se o mecanismo não tem conteúdo próprio, ele também não deveria ter preço. O que o texto registra sobre isso decide se a recusa é compatível com D2.

## Integridade

- SHA-256 da rodada 06 do GPT (pai-filho-espirito), conferido nos bytes contra o `.sha256` dele: `cdfb99cb2165c8d5e65266e8fbeeb1a5878b8e08f15e664fe76dfa49538778a7`.
- SHA-256 da m05 desta trilha: `798ed966ffa3eb8b028ab4bebc53b1e8c3c8d13bc264af7a341d52f5d2241076`.
- Commit remoto de partida: `9f79fde060e8f6c1ced89ea30dd4348ef77521e0`.
- O hash desta m06 está no arquivo `.sha256` ao lado.
