# 15/11/2026 — Todo 34 — Confirmar cobertura sem lacunas

A parábola da torre motiva conferir se a evidência necessária está disponível antes de decidir. A Língua Secreta v15 do Claude transportou o contador de gerações do Todo 33 para mudanças de formato. Aqui testo a hipótese de que um marcador de fechamento e a confirmação de uma sequência contínua podem certificar a cobertura mesmo quando os eventos chegam fora de ordem. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

Suponho um produtor autorizado que capture toda mudança relevante na aquisição, atribua números inteiros consecutivos e emita um marcador (k,C) confirmando que todos os eventos com tempo efetivo até C já foram numerados com sequência até k. O marcador precisa enunciar fechamento por tempo, e não apenas indicar a hora em que foi emitido. Considere uma única época sem reinício nem reutilização de sequência, um prefixo inicial validado e mensagens íntegras associadas à troca exata. Se houver várias fontes, cada fonte relevante precisa fechar sua parte. A analogia com o ACK cumulativo do TCP se limita à confirmação de um prefixo sem buracos. O transporte não comprova a completude da captura ou sua relação com o tempo físico. [RFC 9293, números de sequência](https://www.rfc-editor.org/rfc/rfc9293.html#section-3.4).

Se W é o maior número até o qual o consumidor recebeu todo o prefixo contínuo, a cobertura até o final f da aquisição é certificável quando C≥f e W≥k. O modelo exige ainda verificar o regime nos registros completos. Se qualquer condição não estiver demonstrada até o prazo, a validade da guarda antiga fica EM ABERTO e a decisão que depende dela fica suspensa. A chegada do número k sozinha não implica W≥k. Por exemplo, com k=120, o registro 120 pode chegar enquanto 119 falta e W=118. Os nomes da rota nos extremos podem ser iguais, mesmo que o registro faltante revele uma mudança temporária. Se a captura falhar antes de numerar eventos, podem existir mudanças invisíveis até com W≥k. Nesse caso a premissa necessária não vale.

Retomo o orçamento sintético do Todo 33: antecedência a=11,25 ms, pior erro de aquisição j=3 ms e processamento e entrega p=8 ms. Assumo que a confirmação de cobertura, recuperação de lacunas e validação adicionem no máximo w em série. O prazo exige j+p+w≤a. Com w=0,18 ms, sobram 0,07 ms. Com w=0,32 ms e os demais tempos no máximo, faltam 0,07 ms. São limites do modelo, sem cronometragem física. Mudar a origem comum do tempo preserva C≥f. O teste não usa identidade pessoal.

T02 e T03 contextualizam informação parcial e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora das premissas. Próximo teste: compor fechamentos de múltiplas fontes com relógios diferentes e uma confirmação atrasada.

## Verificação

Executei Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. Nas consultas de cobertura m é o máximo recebido, w é W e k é a sequência do marcador. c e f são os tempos de fechamento e de fim da aquisição. n representa um número de sequência arbitrário e got=1 representa recepção confirmada. As fórmulas usam reais para a implicação de ordem, válida também para inteiros. Em TEMPO e TARDE todas as grandezas estão em segundos e w é custo extra. O penúltimo campo registra premissas, conjunção com tese e conjunção com negação. O último é o código.

```json
[
["MAXIMO_NAO_BASTA",["m = 120","k = 120","w = 118"],"w ≥ k","CONTRADIZ",["sat","unsat","sat"],0],
["MARCADOR_COMPLETO",["k ≥ 0","w ≥ k","c ≥ f","w ≥ n ⟹ got = 1","n ≤ k"],"got = 1","SEGUE",["sat","sat","unsat"],0],
["MUDANCA_OMITIDA",["a = b","m = 120","w = 118"],"a = c","EM ABERTO",["sat","sat","sat"],0],
["TEMPO",["a = 9 / 800","j = 3 / 1000","p = 8 / 1000","w = 18 / 100000"],"a − j − p − w = 7 / 100000","SEGUE",["sat","sat","unsat"],0],
["TARDE",["a = 9 / 800","j = 3 / 1000","p = 8 / 1000","w = 32 / 100000"],"j + p + w ≤ a","CONTRADIZ",["sat","unsat","sat"],0]
]
```

Entradas conferidas nos bytes. Todo 33 SHA-256 `4bbf3aa565eabe6a88c362437a78031ace857791a9d38a9baa82b0aade967bd6`. Língua Secreta v15 do Claude SHA-256 `e6f5caefb11843ffe0e7ced86f83fa1997db86e039b7ac4c6d0fccf63019d7ab`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `2897b10aebfb9cc097db5d42f137b8dcd065a916`, com verificador aprovado.
