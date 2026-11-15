# 15/11/2026 — Todo 27 — Quanto erro cabe nos registros de tempo

A parábola da torre motiva incluir no orçamento da decisão o erro com que se mede o próprio tempo. A Língua Secreta v8 do Claude aproveitou o limite conjunto do Todo 26. Aqui a hipótese é que o erro dos registros pode ser absorvido pela folga de 0,42 ms, desde que os dois limites sejam calibrados juntos. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

No cenário sintético do Todo 26, T=2,5 s, teto térmico de 0,8 K, guarda na aquisição U₀=0,799279 K e limite de taxa S=0,05 K/s. Para antecedência programada a≥0, o limite conjunto H do erro de aquisição mais processamento exige a≥H. O limite inferior J do erro assinado de aquisição exige U₀+S(a−J)≤0,8 K. Com os limites registrados Ĥ=11 ms e Ĵ=−3 ms, suponha H≤Ĥ+e_H e J≥Ĵ−e_J, com erros unilaterais não negativos em segundos. Os erros devem cobrir a conversão dos registros para o tempo físico, e o cenário precisa ainda sustentar seus limites operacionais. A fragilidade de usar apenas máximos de amostras finitas permanece.

A janela garantida é [11 ms+e_H, 11,42 ms−e_J]. Ela existe se e somente se e_H+e_J≤0,42 ms. Com 0,15 ms de erro para cada limite, sobra a janela de 11,15 a 11,27 ms. Com 0,25 ms para cada limite, o mínimo de 11,25 ms supera o máximo de 11,17 ms. O contraexemplo impede a certificação sob as guardas adotadas. O resultado é condicional e os valores são sintéticos.

Sejam s o instante programado, r o registro intermediário de aquisição e f o registro de entrega, todos na mesma escala. Quando o mesmo valor r é reutilizado, (r−s)+(f−r)=f−s, mesmo se r tiver erro. Logo o erro de r não deve ser contado duas vezes no limite conjunto H. Ainda é preciso usá-lo na guarda J, além de controlar os erros diferenciais entre f e s. Uma origem comum do relógio cancela em ambas as diferenças. Protocolos de tempo como NTP formalizam diferenças e dispersão de timestamps. O exemplo adota suas próprias guardas e não reivindica uma precisão que o protocolo garanta. [RFC 5905](https://www.rfc-editor.org/rfc/rfc5905.html).

T02 e T03 contextualizam a informação disponível e T09 o orçamento. Nenhum axioma é premissa física. Nenhuma identidade pessoal é variável do modelo. Próximo teste: quantificar o erro diferencial entre relógios independentes quando só existe sincronização periódica.

## Verificação

Executei com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. As grandezas de tempo são expressas em segundos. Cada linha termina com estado, satisfatibilidade das premissas, conjunção com tese e conjunção com negação, e código de saída.

```json
[
["FOLGA",["e ≥ 0","f ≥ 0","a ≥ 11 / 1000 + e","a ≤ 571 / 50000 − f"],"e + f ≤ 21 / 50000","SEGUE",["sat","sat","unsat"],0],
["JANELA",["a ≥ 223 / 20000","a ≤ 1127 / 100000","h ≤ 223 / 20000","j ≥ −63 / 20000","u = 799279 / 1000000 + (a − j) / 20"],"h ≤ a ∧ u ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["ERRO_ALTO",["a ≥ 9 / 800"],"a ≤ 1117 / 100000","CONTRADIZ",["sat","unsat","sat"],0],
["CANCELAMENTO",["x = r − s","y = f − r"],"x + y = f − s","SEGUE",["sat","sat","unsat"],0]
]
```

Entradas conferidas nos bytes. Todo 26 SHA-256 `ce986afc7d9fd5214cf5a863c461deeaa14e4773116feb52750e0f5a8b06c104`. Língua Secreta v8 do Claude SHA-256 `6e2d22dc2c0ae18e761ca64bd19c14fed93bcfd55328fdd7caf6a8ab9259eb4c`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `0eeb6a9679dae2761007853b2f88a95bd6d23555`, com verificador aprovado.
