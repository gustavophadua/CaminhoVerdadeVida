# 15/11/2026 — Todo 19 — Como distinguir a taxa do termômetro da taxa do dispositivo

A parábola da torre motiva verificar o instrumento usado para estimar o prazo. O Todo 18 mostrou que uma leitura atrasada pode alterar a decisão de margem. Esta rodada testa se a curva indicada permite atribuir o atraso ao sensor ou ao resfriamento do corpo. A conexão bíblica orienta a pergunta do projeto. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo e previsão

O excesso real acima de um banho fixo é θ(t)=s+A exp(−pt), com s e A em K, A>0 e p=G/C>0 em s⁻¹. O corpo tem capacidade C em J/K, condutância G em W/K e aquecimento constante fP em W, com s=fP/G. Sejam q=1/τ>0 em s⁻¹ a taxa do termômetro e y sua indicação em K. Assumimos y′=q(θ−y), y(0)=θ(0)=s+A, acoplamento que não altera a dinâmica do corpo e ausência de ruído na análise estrutural. Os parâmetros permanecem constantes no ensaio. Ensaios instrumentais do NIST e a medição de temperatura experimental em tecidos por Pennes dão referências para explicitar instrumento e condições de troca. A identificabilidade segue o conceito de Bellman e Åström. [NIST TN 1803](https://www.nist.gov/publications/thermal-exposure-sensor-fire-fighters-laboratory-scale-performance-experiments) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/) · [Bellman e Åström, 1970](https://lup.lub.lu.se/search/publication/8867202).

Da equação do sensor, para p≠q,

    y(t) = s + A [q exp(−pt) − p exp(−qt)]/(q−p).

Para p=q, o limite é y(t)=s+A(1+pt)exp(−pt). A expressão com taxas distintas é simétrica na troca p↔q. Os polos ou taxas podem ser determinados como um par não ordenado a partir da curva exata. De fato, s=lim y quando t vai ao infinito, A=y(0)−s, y″(0)=−Apq e y‴(0)=Apq(p+q). Logo o produto é −y″(0)/A e a soma é −y‴(0)/y″(0). As raízes do polinômio λ²−(p+q)λ+pq são {p,q}. Se A=0, ambas as derivadas desaparecem e a indicação constante não permite extrair as taxas. Se p=q, o par tem uma raiz dupla. Com dados ruidosos, derivadas na origem podem ser instáveis e taxas próximas dificultam a separação. A análise prova identificabilidade com dados ideais.

## Contraexemplo e calibração separada

No prazo t*=2,5 s, use s=0,08 K, A=0,92 K, p=−ln(0,9)/(2,5 s)≈0,0421442 s⁻¹ e q=4p. A exponencial do corpo vale 0,9 para a taxa p e 0,6561 para a taxa q. Os dois cenários abaixo têm exatamente a mesma indicação em todos os instantes.

| Taxa do corpo | Constante de tempo do sensor | θ real aos 2,5 s | y aos 2,5 s |
|---:|---:|---:|---:|
| 0,0421442 s⁻¹ | 5,9320 s | 0,908 K | 0,982796 K |
| 0,1685768 s⁻¹ | 23,7281 s | 0,683612 K | 0,982796 K |

O primeiro cenário falha no requisito θ≤0,8 K e o segundo atende. Com C=0,5 J/K e P=0,20 W, ambos permitem G=C p_corpo e f=sG/P em seu domínio físico. Os tempos escolhidos são ilustrativos. O resultado não depende de diferenças menores que a resolução do termômetro, pois a igualdade da indicação é estrutural.

Um degrau independente no meio que envolve o sensor resolve o rótulo sob a hipótese de mesmo acoplamento térmico. Aplique em t=0 um salto conhecido de θ_a para θ_b, com Δ=θ_b−θ_a≠0 em K e y(0)=θ_a. A fração observada é (y(t)−θ_a)/Δ=1−exp(−qt). A marca de 1−exp(−1)≈63,2% ocorre em τ. Para 0<r<1, uma medição exata de r=(y(t)−θ_a)/Δ em t>0 também dá q=−ln(1−r)/t. Conhecido q, p é determinado pela soma da curva original. No regime sem ruído, a mesma EDO permite reconstruir θ=y+y′/q. O degrau precisa ser conhecido por uma referência independente e reproduzir o meio, o escoamento e a fixação relevantes ao uso. A calibração, a diferenciação e suas incertezas ainda exigem medição física.

## Ensaios executados

Executei cinco consultas com JSON UTF-8 via stdin no comando abaixo. O script usa timeout de 10 s por verificação de satisfatibilidade.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Use os três primeiros campos abaixo como visao, hipoteses e tese. Use regras=[] e declare cada identificador como constante numérica de aridade 0. p,q,u,v são taxas em s⁻¹, ep e eq são fatores exponenciais, a,b,z em TROCA e na normalização do contraexemplo são adimensionais. Leituras, corpo, outro e banho são valores em K. Os três estados se referem às premissas, à conjunção com a tese e à conjunção com sua negação. O último campo é o código de saída real.

```json
[
["TROCA",["p > 0","q > 0","p ≠ q","(q − p) × a = q × ep − p × eq","(p − q) × b = p × eq − q × ep"],"a = b","SEGUE",["sat","sat","unsat"],0],
["IDENTIFICACAO_SEM_ROTULO",["p > 0","q > 0","u > 0","v > 0","p + q = u + v","p × q = u × v"],"(u = p ∧ v = q) ∨ (u = q ∧ v = p)","SEGUE",["sat","sat","unsat"],0],
["DEGRAU_ROTULA",["p > 0","q > 0","u > 0","v = q","p + q = u + v"],"u = p","SEGUE",["sat","sat","unsat"],0],
["INDICACAO_IGUAL_DECISAO_OPPOSTA",["ep = 9 / 10","eq = ep × ep × ep × ep","corpo = 2 / 25 + 23 / 25 × ep","outro = 2 / 25 + 23 / 25 × eq","3 × z = 4 × ep − eq","leitura = 2 / 25 + 23 / 25 × z"],"corpo > 4 / 5 ∧ outro ≤ 4 / 5 ∧ leitura > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["ORIGEM",["a = corpo − banho","b = (corpo + d) − (banho + d)"],"a = b","SEGUE",["sat","sat","unsat"],0]
]
```

Em Python, calculei p=−math.log(0.9)/2.5, q=4*p e avaliei as duas fórmulas de temperatura para (p,q) e (q,p). Os resultados foram [0,908 K, 0,982796 K, 5,932013488 s] e [0,683612 K, 0,982796 K, 23,7280539526 s] para θ, y e τ. O solver verificou a simetria algébrica, a identificação sem rótulo, a calibração do rótulo e o contraexemplo racional. A solução diferencial, os logaritmos e a avaliação numérica ficaram fora dele. Todos os valores são sintéticos.

A mesma origem adicionada às leituras do corpo e do banho preserva o excesso, como confirmado no Z3. Um deslocamento galileano comum mantém o movimento relativo entre sensor, corpo e banho e não modifica as taxas no modelo. Mudar o movimento em relação ao meio pode modificar o acoplamento. A ambiguidade decorre das equações e da disponibilidade de dados e independe de quem observa.

Cobertura incremental. Lucas 14 → decisão de 4 J → distinção entre corpo e instrumento → degrau de calibração → curvas idênticas com decisões opostas. Extensão de Todo 16–18. T02–T03 contextualizam observação parcial e T09 contextualiza a reserva. Próximo ponto: limitar o erro de reconstrução θ=y+y′/q com diferenças finitas e verificar se resta folga de 3,5 mK no cenário nominal.

SHA-256 de Todo 18 conferido nos bytes. `8c5fa67a67d09557cb05cbec0ea2a8c7ba2b69ab8d81467b8affb2a89e25283f`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `10f31234ab6e5eb3bbb4545bd6835053f6f989cb`. A compilação e o verificador anteriores passaram. O deploy anterior recebeu Not Found na consulta ao site Pages. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43680187597).
