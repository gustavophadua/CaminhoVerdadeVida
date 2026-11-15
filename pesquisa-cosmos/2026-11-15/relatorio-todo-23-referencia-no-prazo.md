# 15/11/2026 — Todo 23 — Referência disponível no prazo

A parábola da torre motiva conferir se a calibração chega a tempo da decisão. O cenário do Todo 22 mantém 4 J de reserva, 0,5 J disponíveis para esperar a 0,20 W, prazo de 2,5 s e limite de excesso térmico de 0,8 K. Uma referência posterior pode servir à auditoria. Nesta rodada, os dois desenhos exigem leituras disponíveis até o prazo. A v4 do Claude aplicou ao indicador de linguagem o problema de deriva curva do Todo 22. Aqui a hipótese é que duas referências simultâneas ao sinal eliminam a dependência da forma temporal da deriva se acompanharem o mesmo erro aditivo. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [NIST, deriva de instrumento](https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3312.htm) · [Língua Secreta v4](https://github.com/gustavophadua/CaminhoVerdadeVida/blob/26992d7c776e9ba21f89d08087c5fd9118b04fb4/pesquisa-cosmos/lingua-secreta-claude/lingua-secreta-v4-claude.md).

Retomo o estimador X=1,2m(2,5)−0,2m(2), em K, com m(t)=y(t)+b(t)+ε(t) e tempo em s. A trajetória nominal, a constante de resposta de 0,1 s e o passo de 0,5 s vêm do Todo 20. O erro de discretização é limitado por 0,25 mK e cada |ε| por 1 mK, dando 1,4 mK de erro bruto de leitura. Modelo de referência externa sem gasto da reserva e disponibilidade imediata após amostrar. A precisão e as latências reais exigem ensaio.

**Três referências em 0, 1,25 e 2,5 s.** A interpolação quadrática em t=2 s usa pesos (−0,12, 0,64, 0,48). Em 2,5 s usa a última referência diretamente. A correção de X tem pesos (0,024, −0,128, 1,104). Com cada erro de referência limitado por 0,5 mK, a contribuição é ≤0,628 mK pela soma dos módulos dos pesos. Se b tem terceira derivada contínua e |b‴|≤M₃ em K/s³, o erro de interpolação ponderado é ≤(0,025 s³)M₃, pelo produto dos três fatores de distância dividido por 3! e multiplicado por 0,2. Para M₃=0,10 K/s³, o limite total é 4,778 mK. Aplicado à estimativa sintética de 0,796313 K, seu extremo superior é 0,801091 K. O intervalo deixa a decisão aberta.

**Referências simultâneas em 2 e 2,5 s.** Um canal de referência que mede o mesmo b(t) em cada instante permite subtraí-lo de m(t) antes da reconstrução, inclusive para deriva não polinomial. Com erro absoluto de 0,5 mK por referência, a contribuição é ≤0,7 mK e o limite total é 2,35 mK. Na mesma estimativa sintética, o extremo superior é 0,798663 K. A aprovação é condicional aos limites. Um desvio diferencial de até κ K por instante entre os canais aumenta o limite em 1,4κ. A folga desse caso admite κ≤0,000955 K, aproximadamente. Se o canal não compartilhar a deriva, a correção pode falhar.

O contraexemplo cúbico b(t)=(1/60 K/s³)t(t−1,25 s)(t−2,5 s) zera nas três referências e deixa 2,5 mK na reconstrução. Ele mostra por que três verificações exatas não bastam para descartar a deriva entre elas. Uma origem térmica comum cancela no excesso, e uma origem de tempo comum conserva os intervalos. Nenhuma identidade pessoal é variável do modelo. T02/T03 dão contexto à limitação de informação e T09 ao custo da espera. Próximo teste: medir a latência e a deriva diferencial entre canais de referência.

## Verificação

Executei as quatro consultas abaixo pelo Cosmos e Z3 com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use os três primeiros campos como visao, hipoteses e tese, regras=[] e identificadores como constantes numéricas de aridade 0. Em QUADRATICA, a,b,c são coeficientes em K, K/s e K/s², com o relógio expresso em segundos. Os estados correspondem a premissas, premissas com tese e premissas com negação. O último campo é o código de saída.

```json
[
["QUADRATICA",["x = a + 2 × b + 4 × c","r = a","s = a + 5 / 4 × b + 25 / 16 × c","t = a + 5 / 2 × b + 25 / 4 × c"],"x = −3 / 25 × r + 16 / 25 × s + 12 / 25 × t","SEGUE",["sat","sat","unsat"],0],
["CURVA_OCULTA",["b = 1 / 60","x = b × 2 × (2 − 5 / 4) × (2 − 5 / 2)","erro = −x / 5"],"erro = 1 / 400","SEGUE",["sat","sat","unsat"],0],
["SIMULTANEA",["x = a + b","y = c + d","r = b","s = d"],"6 / 5 × (x − r) − 1 / 5 × (y − s) = 6 / 5 × a − 1 / 5 × c","SEGUE",["sat","sat","unsat"],0],
["DECISAO_ABERTA",["estim = 796313 / 1000000","real ≥ estim − 4778 / 1000000","real ≤ estim + 4778 / 1000000"],"real ≤ 4 / 5","EM ABERTO",["sat","sat","sat"],0]
]
```

Entradas vinculadas. Todo 22 SHA-256 `de56bc59bda940b4fa17c081bbf31ffb9b8144f90acf6a93a73af2b5cb626d77`. Língua Secreta v4 do Claude SHA-256 `490ded21acd7ed0ef33d9ac3f4e46d3cd9c04cbc21f82304a8cd7e0eef079aaf`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `26992d7c776e9ba21f89d08087c5fd9118b04fb4`.
