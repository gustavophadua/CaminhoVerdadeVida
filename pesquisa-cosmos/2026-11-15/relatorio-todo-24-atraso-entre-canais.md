# 15/11/2026 — Todo 24 — Atraso admissível entre sinal e referência

A parábola da torre motiva verificar se o instrumento ainda entrega uma decisão no prazo do orçamento. A Língua Secreta v5 do Claude usa referência simultânea para cancelar o fundo. Neste Todo, o teste é quanto se perde quando a referência tem um instante de aquisição diferente. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [NIST, deriva instrumental](https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3312.htm).

Do Todo 23, mantenho reserva de 4 J, prazo de 2,5 s e excesso térmico máximo de 0,8 K. O estimador usa os pesos 1,2 e −0,2 nos instantes 2,5 s e 2,0 s. Em cada instante t, o sinal tem erro instrumental aditivo b(t), em K. Uma referência anterior, adquirida em t−d, com 0≤d≤D, traz b(t−d)+r(t−d). Admita |r|≤κ, em K, e |b′|≤L, em K/s, nos intervalos relevantes. Esta parcela é adicional aos erros de leitura limitados no Todo 23. A desigualdade do valor médio dá |b(t)−b(t−d)−r(t−d)|≤LD+κ. A amplificação pela reconstrução é no máximo 1,4, então o limite adicional é 1,4(LD+κ) K. A idade de amostragem d é distinta da latência de entrega. Todos os valores necessários ainda têm de ser entregues até o prazo.

O limite superior sintético anterior era 0,798663 K, incluindo 2,35 mK de erro. Com L=0,020 K/s e κ=0,2 mK, exigir 0,798663+1,4(LD+κ)≤0,8 dá D≤37,75 ms, aproximadamente. Com 25 ms o limite sobe para 0,799643 K, ainda abaixo do teto. Com 50 ms sobe para 0,800343 K. O intervalo admite as duas decisões e o resultado é EM ABERTO sob essa faixa de erro. Isso não demonstra que todo ensaio com 50 ms falha.

Uma rampa b(t)=Lt com 50 ms de atraso comum e r=0 gera erro de 1 mK nas duas amostras e na combinação. Logo a deriva pode sobreviver à subtração mesmo quando os canais compartilham a mesma rampa. Para a mesma defasagem e rampa, o limite geral é conservador. Somar uma origem ao relógio preserva a idade da amostra. Somar uma origem de temperatura a ambos os canais preserva as diferenças. A identidade de quem mede fica fora do modelo.

Executei Cosmos e Z3 com JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Cada linha contém visao, hipoteses, tese, estado, satisfatibilidade das premissas, premissas com tese e premissas com negação, e código de saída. Use regras=[] e constantes numéricas de aridade zero. A desigualdade de valor médio foi deduzida analiticamente. Nenhuma coleta física foi feita.

```json
[
["LIMITE",["e ≥ 0","x ≥ −e","x ≤ e","y ≥ −e","y ≤ e","z = 6 / 5 × x − y / 5"],"z ≤ 7 / 5 × e ∧ z ≥ −7 / 5 × e","SEGUE",["sat","sat","unsat"],0],
["ATRASO_CURTO",["u = 798663 / 1000000 + 7 / 5 × (1 / 5000 + 1 / 50 × 1 / 40)"],"u ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["ATRASO_LONGO",["m = 796313 / 1000000","e = 403 / 100000","x ≥ m − e","x ≤ m + e"],"x ≤ 4 / 5","EM ABERTO",["sat","sat","sat"],0],
["RAMPA",["e = 1 / 50 × 1 / 20","x = 6 / 5 × e − e / 5"],"x = 1 / 1000","SEGUE",["sat","sat","unsat"],0]
]
```

Cobertura. T02–T03 contextualizam informação parcial e T09, o custo. Nenhum axioma do Tubo entra como premissa térmica. Próximo teste: calibrar separadamente a idade de aquisição, o erro de sincronização e o tempo de processamento e estimar a região conjunta de aceitação.

Entradas conferidas e reexecutadas. Todo 23 SHA-256 `7caf2b30a038bbb26d73d6cdcaa8a1b284acaec0c5191b51ae149fbac6f78fdd`. Língua Secreta v5 do Claude SHA-256 `2ddbf325948ee53d00f21060d62d9c0868f9057345444f686eae7d8db7a9ca96`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `27e5416f3a668a2a12f8812fa09b0198fae88be7`, com verificador aprovado.
