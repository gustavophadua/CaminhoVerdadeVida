# 15/11/2026 — Todo 35 — Cobertura de fontes com relógios diferentes

A parábola da torre motiva confirmar todas as partes da evidência antes da decisão. A Língua Secreta v16 do Claude levou o fechamento sem lacunas do Todo 34 ao registro de mudanças de formato. Aqui a hipótese é que fechamentos completos em fontes diferentes podem ser combinados pelo mais antigo depois de considerar o erro de cada relógio. A distinção entre tempo do evento e tempo de processamento aparece no artigo Dataflow. Esta análise exige confirmação verificável de cobertura. Uma marca de progresso heurística não basta para essa finalidade. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) · [Akidau et al., The Dataflow Model](https://research.google/pubs/the-dataflow-model-a-practical-approach-to-balancing-correctness-latency-and-cost-in-massive-scale-unbounded-out-of-order-data-processing/).

Para cada fonte indispensável i, suponho prefixo contínuo recebido até a sequência de fechamento k_i e captura completa conforme Todo 34. Converto o carimbo de fechamento em Ĉ_i na escala comum, com erro absoluto comprovado ε_i. O fechamento real C_i então é pelo menos Ĉ_i−ε_i. Para fim de aquisição F, com leitura F̂ e erro absoluto ε_F, uma regra suficiente é

    min_i(Ĉ_i−ε_i) ≥ F̂+ε_F.

Todas as grandezas estão em segundos. Sem vínculos adicionais entre erros, se os intervalos de cada carimbo admitem seus extremos independentemente, essa condição também é necessária para a garantia universal dada apenas pelos intervalos. A confirmação de uma fonte não cobre lacunas em outra. O conjunto de fontes deve incluir todos os pontos que podem registrar mudanças relevantes para a aquisição. Transladar todos os carimbos por uma mesma constante conserva a desigualdade.

Contraexemplo sintético. Tome o fim real de aquisição como zero na escala relativa, com erro zero. Uma fonte anuncia fechamento 0,12 ms depois, mas com erro de até 0,15 ms. O fechamento real vai de −0,03 a +0,27 ms. Mesmo com prefixo contínuo, a cobertura até zero fica EM ABERTO. O caso permanece se outra fonte tiver cobertura suficiente. O limite de erro deve valer para o instante da troca, incluindo a deriva desde a sincronização.

No orçamento sintético do Todo 34, há 0,25 ms para consolidar os registros. Se duas confirmações correm em paralelo, com custos w₁ e w₂ contados a partir da aquisição, seguidas de agregação de custo v, o atraso adicional é max(w₁,w₂)+v. Com limites de 0,18 ms, 0,23 ms e 0,02 ms, a entrega cabe no prazo no limite, sem folga. Se a segunda confirmação levar 0,26 ms e a agregação 0,02 ms, a entrega fica pelo menos 0,03 ms além do orçamento. A análise pressupõe que contenção e retransmissões relevantes estejam incluídas nas guardas individuais. Se faltar cobertura confirmada até o prazo, a decisão dependente fica suspensa. Os casos são sintéticos e nenhum tempo foi medido em aparelho.

T02 e T03 contextualizam a informação disponível e T09 o orçamento. T01, T04–T08 e T10–T13 ficam fora das premissas. Nenhuma identidade pessoal é variável. Próximo teste: verificar quando um erro comum de relógio pode ser eliminado nas diferenças entre fonte e aquisição.

## Verificação

Executei com JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`. Use visao, hipoteses, tese, regras=[] e constantes numéricas de aridade zero. Em COBERTURA, a,b são fechamentos reais, x,y são estimados, e,g são erros, z é o fim real e f,d são sua estimativa e erro. Nas consultas de entrega, x,y são custos de confirmação e z o custo de agregação. Todas as grandezas numéricas de tempo estão em segundos. Os últimos campos são estado, testes das premissas, da conjunção com tese e da conjunção com negação, e código de saída.

```json
[
["COBERTURA",["a ≥ x − e","b ≥ y − g","x − e ≥ f + d","y − g ≥ f + d","z ≤ f + d"],"a ≥ z ∧ b ≥ z","SEGUE",["sat","sat","unsat"],0],
["CARIMBO_AMBIGUO",["f = 0","x = 12 / 100000","e = 15 / 100000","a ≥ x − e","a ≤ x + e"],"a ≥ f","EM ABERTO",["sat","sat","sat"],0],
["PARALELO",["x ≤ 18 / 100000","y ≤ 23 / 100000","z ≤ 2 / 100000"],"x + z ≤ 1 / 4000 ∧ y + z ≤ 1 / 4000","SEGUE",["sat","sat","unsat"],0],
["FONTE_TARDE",["y = 26 / 100000","z = 2 / 100000"],"y + z ≤ 1 / 4000","CONTRADIZ",["sat","unsat","sat"],0]
]
```

Entradas conferidas nos bytes. Todo 34 SHA-256 `f76d0e744a52a68ad9f41a1ef0eebfd9fab453f2ae5edd5adc931e3c85393277`. Língua Secreta v16 do Claude SHA-256 `eda70b611322b39fbb1431be763f14e03191ef9f08b95643fbf08759c52e80fb`. BOOK SHA-256 `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`. Base remota `5f02b5a059d0488747cb94dcea27d8a31201a11e`, com verificador aprovado.
