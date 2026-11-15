# 15/11/2026 — Todo 33 — Mudança de rota dentro da aquisição

A parábola da torre motiva verificar se a guarda é aplicável antes de concluir a decisão. A Língua Secreta v14 do Claude estendeu o Todo 32 ao identificador do formato. A hipótese testada aqui é que comparar apenas os nomes da rota nos extremos pode ocultar uma troca temporária, mas um contador que registre todas as mudanças elimina essa ambiguidade. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [RFC 9198, avaliação de rota unidirecional](https://www.rfc-editor.org/rfc/rfc9198.html).

Considere uma troca de aquisição com intervalo fechado [s,f] e uma guarda calibrada para o regime A. Ler A em s e em f é compatível com A durante toda a troca ou A→B→A, onde B é outro regime. Um pacote da aquisição pode atravessar B no segundo caso. A validade da guarda antiga fica EM ABERTO quando esses são os únicos dados. Um contador de geração inteiro não decrescente, que incremente a cada mudança relevante, distingue os casos. Se G(s)=G(f), então para todo t∈[s,f], G(s)≤G(t)≤G(f) implica G(t)=G(s). O argumento requer ausência de reinício ou transbordamento, associação dos extremos à troca exata e registro completo de mudanças no caminho e nas condições cobertas. Um contador de mudanças de rota não cobre sozinho o aumento de fila ou a mudança de classe de tráfego. A RFC fornece métodos de avaliação de rota, não um contador com essas garantias.

A regra do modelo é aceitar a guarda apenas se a geração conferida corresponder à calibração e houver confirmação de que os registros já cobrem todo o intervalo da aquisição. Sem confirmação até o prazo, a decisão térmica permanece EM ABERTO e o comando que depende da certificação fica suspenso. Se houver mudança registrada, o Todo 32 continua aplicável a uma nova calibração, se ainda houver prazo. Uma mudança posterior à aquisição fica fora desta guarda, mas pode afetar outras hipóteses, como o tempo de entrega.

Retomo T=2,5 s, a=11,25 ms e erro de aquisição j≤3 ms. Assumo que p≤8 ms limita processamento e entrega restantes e que w limita o custo extra, em sequência, de consolidar os registros até f. A entrega fica garantida se j+p+w≤a. Logo, para esses limites, w pode ser de até 0,25 ms. Em w=0,50 ms, com j=3 ms e p=8 ms, o pior caso perde o prazo em 0,25 ms, mesmo com a geração correta. Os valores são sintéticos e não houve ensaio físico.

A ordem do contador não muda com a origem de tempo. T02 e T03 contextualizam informação parcial e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora das premissas da análise. O modelo não usa identidade pessoal. Próximo teste: considerar perdas no registro e avaliar uma confirmação que declare quais eventos já estão cobertos.

## Verificação

Executei Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. As duas primeiras consultas usam identificadores adimensionais, e as duas últimas usam segundos. Os últimos campos registram estado, satisfatibilidade das premissas, da conjunção com tese e da conjunção com negação, e código de saída. A implicação para todos os instantes decorre da mesma desigualdade aplicada a um instante arbitrário.

```json
[
["ROTA_IGUAL",["a = b"],"a = c","EM ABERTO",["sat","sat","sat"],0],
["CONTADOR",["a ≤ b","b ≤ c","a = c"],"a = b","SEGUE",["sat","sat","unsat"],0],
["ENTREGA",["a = 9 / 800","j ≤ 3 / 1000","p ≤ 8 / 1000","w ≤ 1 / 4000"],"j + p + w ≤ a","SEGUE",["sat","sat","unsat"],0],
["SEM_FOLGA",["a = 9 / 800","j = 3 / 1000","p = 8 / 1000","w = 1 / 2000"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

Entradas conferidas nos bytes. Todo 32 SHA-256 `2a300c2c2fb9219ea3c0eccd6771962ea258ab11b42ff97f4969a00b43560ae2`. Língua Secreta v14 do Claude SHA-256 `e45f7e64788d74c221e15314866711f4ddace93d238ebc9568c12d1f5ee0812a`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `07f568360a49d5145a8a58040df1efdfdb844d4a`, com verificador aprovado.
