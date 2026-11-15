# 15/11/2026 — Todo 17 — A precisão necessária para decidir a margem térmica

A parábola da torre de Lucas 14:28–30 motiva calcular a margem disponível antes de comprometer a reserva. No Tubo, a hipótese é que se pode certificar a execução da sequência B→espera→A→C com 4 J testando diretamente o excesso térmico no último instante permitido. A comparação com uma previsão de três leituras mede o efeito do erro da amostragem. A parábola motiva a pergunta. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo e medição no prazo

Retomamos C·dθ/dt=fP−Gθ e θ=T_corpo−T_banho, em K, com banho fixo, C>0 em J/K, G>0 em W/K, P=0,20 W constante, f∈[0,1], e excesso inicial nominal de 1 K. O sensor mede diretamente o excesso, com atraso desprezível e erro absoluto total por leitura limitado por ε em K. O relógio e a potência são tratados como exatos nesta rodada. Sem perdas adicionais, restam 0,5 J para esperar. Logo o prazo é t*=2,5 s, e o critério térmico escolhido para A é θ(t*)≤0,8 K.

Se a leitura no prazo é m, aprovação garantida requer m+ε≤0,8 K, e falha garantida requer m−ε>0,8 K. Nas demais situações, o intervalo de erro admite ambas as possibilidades. A forma é uma faixa de guarda determinística. O relatório metrológico JCGM descreve faixas de guarda no contexto de avaliação da conformidade, também com regras probabilísticas. Aqui ε é uma hipótese sobre limite absoluto, não desvio padrão nem resolução do instrumento. O estudo de Pennes sobre temperatura de tecidos serve como conexão biológica para planejar medições de excesso térmico com referência explícita. A margem de 0,8 K pertence ao modelo do Tubo. [JCGM 106, §8.3.2](https://www.bipm.org/documents/20126/2071204/JCGM_106_2012_E.pdf/fe9537d2-e7d7-e146-5abb-2649c3450b25) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

## Previsão a partir de três leituras

Na trajetória decrescente, sejam x₀,x₁,x₂ os excessos reais aos 0, 1 e 2 s. Ponha d₁=x₀−x₁>0 e d₂=x₁−x₂>0, ambos em K. Para a resposta exponencial do Todo 16, r=d₂/d₁=exp(−G·(1 s)/C)∈(0,1). A partir da distância ao equilíbrio no terceiro instante, a previsão no prazo reduz-se a

    θ(2,5 s) = x₂ − d₂ r/(1+√r).

Denote as leituras por yⱼ e as diferenças medidas por D₁=y₀−y₁ e D₂=y₁−y₂. Cada dᵢ fica em [Dᵢ−2ε,Dᵢ+2ε]. Quando os dois limites inferiores de diferença são positivos, use

    r_min=(D₂−2ε)/(D₁+2ε)
    r_max=min{1, (D₂+2ε)/(D₁−2ε)}
    A(r)=r/(1+√r)
    θ_min=y₂−ε−(D₂+2ε) A(r_max)
    θ_max=y₂+ε−(D₂−2ε) A(r_min).

A(r) cresce para r>0, portanto o intervalo é conservador. Os extremos podem não corresponder a um mesmo conjunto de leituras reais porque d₁, d₂ e x₂ compartilham dados. A rotina deixa o caso sem diferenças estritamente positivas fora do domínio da fórmula.

Usando como leituras sintéticas os valores nominais de f=2%, C=0,5 J/K e G=0,05 W/K do Todo 16, o cálculo gerou:

| ε por leitura | Intervalo de θ previsto aos 2,5 s (K) | Conclusão pelo intervalo |
|---:|---:|---|
| 1 mK | [0,793178545; 0,799707326], aproximadamente | Aprovação garantida no modelo |
| 5 mK | [0,783623227; 0,811573524], aproximadamente | Intervalo cruza a margem |

Uma leitura direta centrada no valor sintético θ(2,5 s)=0,796496720 K admite erro limitado de até cerca de 3,503 mK para garantir a margem. Com 5 mK, a leitura arredondada de 0,7965 K admite um excesso tanto acima quanto abaixo do limite.

Contraexemplo exato para três leituras. Dois casos têm r=(19/20)², x₀=1 K e equilíbrios de 0,08 K e 0,14 K. Seus pares de leituras reais aos 1 e 2 s são (0,9103; 0,82934575) K e (0,91615; 0,840475375) K. Os pontos médios fornecem registros idênticos com erro individual de até 6 mK. Aos 2,5 s, os casos dão 0,7918784625 K e 0,80545160625 K, em lados opostos da margem. Com P=0,20 W e C=0,5 J/K, ambos correspondem a f em [0,1] por G=−C ln(r)/(1 s) e f=sG/P.

A capacidade térmica afeta a estimativa absoluta de f. Com C entre 0,45 e 0,55 J/K e k e s nominais fixos, f fica entre 1,8% e 2,2% por f=sCk/P. O limite de f de Todo 15 escala pelo mesmo fator C, porque G=Ck, mantendo fixos k, P e prazo. A decisão térmica prevista pela série depende de k e s. Comparar extremo de f com extremo do limite como se viessem de capacidades independentes perde essa dependência.

## Execução e cobertura

Foram executadas cinco consultas em Cosmos e Z3, com JSON UTF-8 via stdin. Cada verificação do script tem limite de 10 s.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Use os três primeiros campos abaixo como visao, hipoteses e tese. Use regras=[] e declare cada identificador como símbolo numérico constante de aridade 0. x, xx, y e yy são excessos reais em K, m e mm os pontos médios, raiz=√r e fim e outro os resultados no prazo. Na consulta de escala, taxa é G/C em s⁻¹, h é f/C, pot é P em W e s e ss são equilíbrios em K. Os três retornos sat/unsat correspondem a premissas, conjunção com tese e conjunção com negação da tese. Ao final aparece o código de saída observado.

```json
[
["GARANTIA_DIRETA",["erro ≥ 0","real ≥ lida − erro","real ≤ lida + erro","lida + erro ≤ 4 / 5"],"real ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["LEITURA_AMBIGUA",["lida = 7965 / 10000","erro = 5 / 1000","real ≥ lida − erro","real ≤ lida + erro"],"real ≤ 4 / 5","EM ABERTO",["sat","sat","sat"],0],
["MESMA_SERIE_DECISOES_OPOSTAS",["raiz = 19 / 20","r = raiz × raiz","s = 2 / 25","ss = 7 / 50","x = r + (1 − r) × s","xx = r + (1 − r) × ss","y = r × x + (1 − r) × s","yy = r × xx + (1 − r) × ss","2 × m = x + xx","2 × mm = y + yy","m − x ≤ 3 / 500","xx − m ≤ 3 / 500","mm − y ≤ 3 / 500","yy − mm ≤ 3 / 500","fim = raiz × y + (1 − raiz) × s","outro = raiz × yy + (1 − raiz) × ss"],"fim ≤ 4 / 5 ∧ outro > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["PRAZO_SEM_ESCALA_CALORIMETRICA",["cap > 0","capb > 0","taxa × cap = g","taxa × capb = gb","h × cap = f","h × capb = fb","g > 0","gb > 0","s × g = f × pot","ss × gb = fb × pot"],"s = ss","SEGUE",["sat","sat","unsat"],0],
["ORIGEM_COMUM",["theta = med − banho","nova = (med + origem) − (banho + origem)"],"nova = theta","SEGUE",["sat","sat","unsat"],0]
]
```

Para reproduzir os números fora do Z3, use Python com math.exp e math.sqrt e yⱼ=0.08+0.92*math.exp(-0.1*j), para j=0,1,2. Avalie o intervalo com ε de 0.001 e 0.005 K. Para a leitura direta use 0.08+0.92*math.exp(-0.25). A primeira execução numérica exigia indevidamente r_max<1 mesmo para o intervalo externo e falhou na linha de 5 mK. A execução corrigida usa o limite físico r<1, aceitando 1 como extremo do intervalo externo, e terminou com código zero. As relações exponenciais, a monotonicidade de A e a aritmética numérica ficaram fora do Z3. Todos os dados são sintéticos.

Uma mudança de origem comum ao termômetro do corpo e ao do banho preserva o excesso e a decisão, como verificado no solver. Um erro diferencial entre os canais precisa entrar em ε. Um deslocamento galileano comum preserva o movimento relativo de dispositivo e banho e, no modelo, a troca térmica. A condição independe da identidade do observador e depende da calibração e das condições físicas.

A rodada liga Lucas 14 ao custo com margem, à incerteza de medição e ao contraexemplo com decisões opostas. Avança Todo 15–16 e usa T02–T03 como contexto de observação parcial e T09 como contexto de consumo de reserva. Próximo ponto: introduzir atraso do termômetro. Comparar o excesso indicado com o real em um modelo de sensor de primeira ordem e estimar quanto erro adicional essa dinâmica introduz no prazo de 2,5 s.

SHA-256 de Todo 16 conferido nos bytes. `c5413a4759c79aa3cedc97fe64f6cf3c85805dc936d179dd1963c9d2bdb3c515`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `c414ca6d9b27de52b0d8fd3cc20138a5e4ecd1bb`. O verificador e a compilação anteriores passaram. O deploy anterior retornou Not Found ao consultar o site Pages. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43675830335).
