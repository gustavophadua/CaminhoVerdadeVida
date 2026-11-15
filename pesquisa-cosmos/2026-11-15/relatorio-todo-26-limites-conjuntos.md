# 15/11/2026 — Todo 26 — Limite conjunto para relógio e processamento

A parábola da torre motiva testar se as condições que consomem a folga podem ocorrer ao mesmo tempo. A Língua Secreta v7 do Claude transporta a janela do Todo 25 para o registro antes de um degrau. O Todo 26 testa a hipótese de que uma garantia conjunta de relógio e processamento recupera parte da janela térmica. O prazo fixo segue a noção de conclusão em tempo real estudada por Liu e Layland. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Liu e Layland, 1973](https://www.cis.upenn.edu/~lee/07cis505/Lec/liu73scheduling.pdf).

Retomo o prazo T=2,5 s, reserva de 4 J, teto θ_max=0,8 K, guarda de temperatura na aquisição U₀=0,799279 K e taxa térmica máxima S=0,05 K/s. Use a≥0 em segundos para a antecedência programada, j em segundos para o erro assinado comum de aquisição e p≥0 em segundos para o processamento e a entrega. A aquisição física ocorre em T−a+j. Para entregar até T é necessário a≥p+j. Para transferir a guarda até T, suponha |θ′|≤S no intervalo e use U=U₀+S(a−j). A guarda U₀ precisa valer para toda aquisição admitida e mantém as hipóteses de idade e erro entre canais do Todo 25.

Para um conjunto não vazio de pares admissíveis, defina J=inf(j) e H=sup(p+j). A janela robusta para as duas desigualdades é max(0,H)≤a≤J+(θ_max−U₀)/S. Isso vem de verificar entrega para o maior p+j e limite térmico para o menor j. A janela cobre as condições suficientes do modelo e não determina se um aparelho fora dela falharia fisicamente.

No cenário sintético, imponha p≤10 ms, |j|≤3 ms e p+j≤11 ms. Os pares (p,j)=(10,1) ms e (8,3) ms ilustram que ambos os máximos marginais podem ser atingidos sem coexistir. O mínimo j=−3 ms é admissível, por exemplo com p=8 ms. Assim a janela é [11;11,42] ms. Com a=11 ms, U≤0,799979 K. Se a relação conjunta for retirada, o par (10,3) ms passa a ser admissível e exige a≥13 ms. A guarda térmica no extremo j=−3 ms então dá U≥0,800079 K. Os limites marginais por si sós deixam EM ABERTO a garantia p+j≤11 ms. O limite conjunto é uma hipótese de projeto. Para sustentá-lo, os timestamps de aquisição e entrega devem ser registrados no mesmo ensaio em condições de carga representativas, com incerteza controlada. O máximo observado em uma amostra finita não constitui garantia universal.

Mudar a origem do relógio preserva a antecedência e o erro assinado, e mudar a origem térmica comum conserva o excesso de temperatura. A identidade pessoal fica fora das variáveis. T02 e T03 contextualizam a informação disponível e T09 o custo. Os axiomas do Tubo não entram nas premissas físicas. Próximo teste: incorporar erros nos próprios registros de tempo em uma guarda conjunta verificável.

## Verificação

Executei as consultas com JSON via stdin para `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese e regras=[] e declare identificadores constantes numéricas de aridade zero. Os estados são premissas, conjunção com tese e conjunção com negação. O último campo é o código de saída.

```json
[
["GARANTIA_CONJUNTA",["a ≥ 11 / 1000","a ≤ 571 / 50000","j ≥ −3 / 1000","j ≤ 3 / 1000","j + p ≤ 11 / 1000","u = 799279 / 1000000 + (a − j) / 20"],"j + p ≤ a ∧ u ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["LIMITE_SEPARADO",["a ≥ 13 / 1000","u = 799279 / 1000000 + (a + 3 / 1000) / 20"],"u ≤ 4 / 5","CONTRADIZ",["sat","unsat","sat"],0],
["MARGINAIS_NAO_BASTAM",["p ≥ 0","p ≤ 1 / 100","j ≥ −3 / 1000","j ≤ 3 / 1000"],"p + j ≤ 11 / 1000","EM ABERTO",["sat","sat","sat"],0]
]
```

Entradas conferidas nos bytes. Todo 25 SHA-256 `8d5712937b140bd47e2e7aa09054dfe2e3d3fead8037e0a55237b0e2d8989ad0`. Língua Secreta v7 do Claude SHA-256 `20d594d27aa113c9880ae215aebf1ece036e9a3b5b10435e97380df8f2ce37b8`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `09ec7808fd38e32965b8ec5dbe7d60084aa75cdd`, com verificador aprovado.
