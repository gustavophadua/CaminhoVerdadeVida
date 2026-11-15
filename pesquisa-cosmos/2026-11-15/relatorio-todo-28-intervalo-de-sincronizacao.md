# 15/11/2026 — Todo 28 — Intervalo máximo entre sincronizações

A parábola da torre motiva reservar parte da folga para o tempo decorrido desde a calibração. A Língua Secreta v9 do Claude examinou o erro contido nos limites registrados do Todo 27. Aqui a hipótese é que o crescimento desse erro entre sincronizações pode ser limitado por uma taxa máxima de deriva. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

Retomo o prazo de 2,5 s, a reserva de 4 J e as guardas térmicas do Todo 27. A antecedência a precisa satisfazer 11 ms+e_H≤a≤11,42 ms−e_J. Seja t a idade em segundos da última calibração válida no instante do registro relevante. Suponho que todos os registros envolvidos tenham idade ≤t e que, durante esse intervalo, o desvio de frequência de cada relógio em relação à base seja no máximo 20 ppm em módulo. Sem saltos durante o ensaio, a diferença entre dois relógios pode crescer a até 40 µs por segundo, pela integração das taxas com sinais opostos. O limite J utiliza um relógio em relação à base e cresce até 20 µs/s. O limite H admite comparação de dois relógios, ambos com erro de frequência em relação à base. A origem comum se cancela em uma diferença, mas as taxas distintas continuam contribuindo. A RFC 5905 é referência primária para o tratamento da dispersão que cresce com o tempo. As taxas e erros iniciais aqui são hipóteses sintéticas. [RFC 5905](https://www.rfc-editor.org/rfc/rfc5905.html).

Com pisos de erro de 0,08 ms para H e 0,10 ms para J, sigo as guardas conservadoras e_H=0,08+0,04t ms e e_J=0,10+0,02t ms, com t dado numericamente em segundos. A janela existe quando e_H+e_J≤0,42 ms, ou t≤4 s. Em 3 s sobra a janela [11,20;11,26] ms. Em 4 s ela se reduz ao ponto 11,24 ms, sem folga para quantização adicional. Em 5 s o mínimo de 11,28 ms ultrapassa o máximo de 11,22 ms. A imposição de 4 s vale para a idade no último registro, de modo que o agendamento da calibração precisa considerar a duração do ensaio.

O contraexemplo para supor cancelamento da deriva é usar relógios com +20 ppm e −20 ppm. Eles acumulam 0,20 ms de diferença em 5 s mesmo que tenham sido alinhados ao início. Essa diferença é apenas a parcela de deriva do limite H. Com taxas iguais e sem saltos, a parcela diferencial seria zero. As condições de validade exigem pisos e taxas sustentados por calibração, incluindo efeitos ambientais relevantes. A ausência de janela significa que as guardas escolhidas não certificam a decisão, sem concluir que a temperatura real excedeu o teto.

## Verificação

Executei com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. As unidades de tempo das fórmulas são segundos e q é adimensional. Cada linha termina com estado, satisfatibilidade das premissas, conjunção com tese, conjunção com negação e código. A integração do erro de frequência foi derivada analiticamente. Não houve ensaio físico.

```json
[
["INTERVALO",["t ≥ 0","e = 8 / 100000 + t / 25000","f = 1 / 10000 + t / 50000"],"(e + f ≤ 21 / 50000) ⟺ (t ≤ 4)","SEGUE",["sat","sat","unsat"],0],
["CINCO_SEGUNDOS",["a ≥ 1128 / 100000"],"a ≤ 1122 / 100000","CONTRADIZ",["sat","unsat","sat"],0],
["RAMPA",["q = 1 / 50000","t = 5","d = 2 × q × t"],"d = 1 / 5000","SEGUE",["sat","sat","unsat"],0]
]
```

T02 e T03 contextualizam a informação disponível e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora do modelo térmico. Nenhuma identidade pessoal é variável. Próximo teste: obter o piso de erro da sincronização sob assimetria de ida e volta.

Entradas conferidas nos bytes. Todo 27 SHA-256 `c6eb1f67f9db527f8c2e4eed4c40a5a975011109624d13514beb8ef889c6dd56`. Língua Secreta v9 SHA-256 `33edc1d8eb473eb7cb0ec3176dfd9f9ce307639e553023ebe095405f0aeb3dbb`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `720ce6c1acc8a915502d2aa6b6fcedaed0739ae2`, com verificador aprovado.
