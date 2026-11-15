# 15/11/2026 — Todo 32 — Invalidar a guarda quando a rota muda

A parábola da torre motiva verificar se ainda há tempo para refazer a calibração antes da decisão. A Língua Secreta v13 do Claude transporta a guarda entre contextos com um limite explícito. Aqui a hipótese é que um identificador confiável do regime efetivamente usado pela amostra permite rejeitar uma calibração de outro regime mesmo que o total de ida e volta tenha permanecido constante. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [RFC 9198, avaliação de rota unidirecional](https://www.rfc-editor.org/rfc/rfc9198.html).

Associo à calibração um identificador de regime que inclui as condições cobertas de rota, carga e classe de tráfego. A guarda estreita só é aplicável quando o regime da troca usada está certificado como o mesmo, ou quando há um limite de transferência validado para o regime novo, conforme Todo 31. Se a identificação estiver ausente ou incerta, a simples igualdade da ida e volta deixa a validade EM ABERTO. A identificação precisa se referir aos pacotes que produziram o resultado. Uma sonda feita antes ou depois pode seguir rota diferente, e um identificador lido apenas na chegada pode ocultar mudança durante a troca. A RFC documenta métodos de medição de rota. Ela não garante a identificação por pacote assumida aqui.

No modelo sintético, T=2,5 s é o prazo, a=11,25 ms é a antecedência escolhida dentro das guardas do Todo 31 para idade de até 3 s e margem g=0,04 ms, e j=3 ms limita o erro de aquisição. O instante físico mais cedo da última aquisição é A_min=T−a−j=2,48575 s. Assumo que a leitura anterior da reconstrução já foi validada com sua própria referência, que a última aquisição exige uma guarda pronta antes dela e que não há perda adicional de reserva. Se ambas as leituras precisarem de nova calibração, vale o primeiro prazo relevante, que é mais cedo.

Se uma mudança ocorre em t_c e detectar, calibrar e validar levam no máximo d, c e v segundos em sequência, a recuperação é garantida até a aquisição quando t_c+d+c+v≤A_min e a rota validada se mantém coberta para a troca. Com t_c=2,43 s, restam 55,75 ms. Usando 10 ms para detectar, 30 ms para calibrar e 5 ms para validar, a guarda termina até 2,475 s, com 10,75 ms de folga. Como contraexemplo, se a validação por si só exige pelo menos 20 ms e as duas primeiras etapas ocupam 10 e 30 ms, a recuperação termina a partir de 2,490 s e perde a primeira aquisição possível. Limites superiores que somem mais do que a folga apenas retiram a garantia para execução pior, sem provar que toda execução falha. Os tempos são sintéticos e não houve medição.

Somar a mesma origem ao relógio conserva a folga. O teste usa registros e condições técnicas, sem identidade pessoal. T02 e T03 contextualizam a informação disponível e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora das premissas da análise. Próximo teste: tratar uma mudança ocorrida durante a aquisição com identificação incompleta e explicitar a resposta em caso de guarda suspensa.

## Verificação

Executei Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. Nas consultas de regime, a é o identificador do certificado, b o regime registrado e c o regime real. Em SEM_VINCULO, r é a ida e volta em segundos. Nas consultas de prazo, os números estão em segundos e z é A_min. O penúltimo campo informa a satisfatibilidade das premissas, da conjunção com tese e da conjunção com negação. O último campo é o código de saída.

```json
[
["GUARDA_EPOCA",["a = b","c ≠ b"],"a = c","CONTRADIZ",["sat","unsat","sat"],0],
["RECALIBRA",["t = 243 / 100","d = 1 / 100","c = 3 / 100","v = 1 / 200","z = 5 / 2 − 9 / 800 − 3 / 1000"],"t + d + c + v ≤ z","SEGUE",["sat","sat","unsat"],0],
["ORCAMENTO",["t = 243 / 100","d = 1 / 100","c = 3 / 100","z = 5 / 2 − 9 / 800 − 3 / 1000","v ≥ 2 / 100"],"t + d + c + v ≤ z","CONTRADIZ",["sat","unsat","sat"],0],
["SEM_VINCULO",["a = b","r = 1 / 1000"],"a = c","EM ABERTO",["sat","sat","sat"],0]
]
```

Entradas conferidas nos bytes. Todo 31 SHA-256 `9ff068095014456b0f45bf4375eda70db0ea79ee5ee474b59e73a17be0a7851c`. Língua Secreta v13 do Claude SHA-256 `8830f749ca02bb0b2e1478b4e98137ff34da15b3f85841c77b363befbccdac85`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `0d02f54ab37970c97f2192af4ae883a0295a7ccf`, com verificador aprovado.
