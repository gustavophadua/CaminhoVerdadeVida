# 15/11/2026 — Todo 22 — O que duas referências corrigem entre o início e o fim

A parábola da torre motiva verificar a referência usada para decidir se resta margem antes da próxima etapa. No Tubo, a hipótese desta rodada é que duas verificações com um padrão conhecido, antes e depois do ensaio, removem do cálculo uma deriva linear do instrumento. Uma deriva curva pode gerar a mesma leitura das referências e ainda alterar a decisão. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo de calibração

Da sequência B→espera→A→C, retomo a reserva de 4 J, os 0,5 J disponíveis para a espera a 0,20 W e o limite θ(2,5 s)≤0,8 K antes de A. O excesso θ é a temperatura do corpo menos a do banho. No estimador regressivo do Todo 20, a=τ/h=0,2, com τ=0,1 s e h=0,5 s. As leituras m(t)=y(t)+b(t)+ε(t) têm indicação ideal y, viés aditivo b e erro de leitura ε, todos em K. Os tempos da última leitura e da anterior são t*=2,5 s e t*−h=2,0 s. A estimativa bruta é X=(1+a)m(t*)−a m(t*−h). O erro de discretização do cenário nominal do Todo 20 é limitado por d=0,25 mK.

Suponha duas leituras de um padrão conhecido, em t₀<t₁, que sondam o mesmo processo b(t) sem perturbar a trajetória térmica. Ao subtrair o valor conhecido do padrão, obtêm-se R₀=b(t₀)+e₀ e R₁=b(t₁)+e₁, em K. Os termos e₀ e e₁ incluem a incerteza da referência. Com λ(t)=(t−t₀)/(t₁−t₀), a correção por interpolação é

    b_hat(t)=(1−λ(t))R₀+λ(t)R₁
    X_corr=X−[(1−w)R₀+wR₁]
    w=(1+a)λ(t*)−aλ(t*−h)=(t*+τ−t₀)/(t₁−t₀).

Se b(t)=β₀+β₁t, com β₀ em K e β₁ em K/s, o estimador corrigido cancela a deriva afim exatamente quando e₀=e₁=0. O cálculo de X_corr pondera a referência como se a avaliasse em t*+τ. Com t₀=0 e t₁=3 s, os pesos são 2/15 e 13/15. Se t₁<t*+τ, w>1 e o primeiro peso fica negativo. Para |e₀|,|e₁|≤η, a contribuição da referência é limitada por η(|1−w|+|w|). Com erros independentes centrados e mesmo desvio padrão u, o desvio padrão da combinação é u√[(1−w)²+w²], igual a 0,43843 mK se u=0,5 mK e w=13/15.

O guia de calibração do NIST descreve esquemas que eliminam deriva linear por meio da ordem das medições. O JCGM explicita a incerteza remanescente após corrigir o efeito sistemático. A conexão biológica é a medição experimental de temperatura de tecido com condições de referência especificadas, como no estudo de Pennes. O modelo de deriva e os pesos do Tubo são hipóteses próprias desta análise. [NIST, deriva instrumental](https://www.itl.nist.gov/div898/handbook/mpc/section3/mpc3312.htm) · [JCGM 100:2008, §3.2](https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

## Limite com curvatura e contraexemplo

Se b é duas vezes continuamente diferenciável e |b″|≤M em K/s², o resto da interpolação linear em t∈[t₀,t₁] satisfaz

    |b(t)−[(1−λ)b(t₀)+λb(t₁)]| ≤ (M/2)(t−t₀)(t₁−t).

Para t₀=0 e t₁=3 s, com t*=2,5 s e h=0,5 s, a desigualdade triangular dá um limite conservador de (0,95 s²)M sobre o erro do estimador corrigido devido à curvatura. Se B_leitura limita o ruído da reconstrução, um critério suficiente para garantir a margem é

    X_corr + d + B_leitura + η(|1−w|+|w|) + (0,95 s²)M ≤ 0,8 K.

No cálculo ilustrativo com X_corr nominal=0,7963127333 K, d=0,25 mK, η=0,5 mK e B_leitura=0, sobra espaço para M≤0,00309186 K/s². Esse valor usa limites absolutos. O cálculo probabilístico com desvio padrão u acima responde a uma pergunta diferente. O orçamento de 4 J pressupõe que a referência externa não gaste energia da reserva do dispositivo.

Como contraexemplo, adote b(t)=(0,004 K/s²)t(3 s−t). As duas referências indicam desvio zero em 0 e 3 s. Porém, b(2,0 s)=8 mK e b(2,5 s)=5 mK. A combinação do estimador deixa 1,2·5−0,2·8=4,4 mK após a correção. A estimativa nominal de 0,7963127333 K passa a 0,8007127333 K com os demais erros nulos. Os dados das referências coincidem com os de um instrumento sem deriva, mas as duas decisões calculadas são opostas. A curvatura neste exemplo é |b″|=0,008 K/s² e está acima da condição suficiente do cenário nominal.

A referência obtida em 3 s serve para a análise retrospectiva do ensaio. A decisão de iniciar A aos 2,5 s exige uma referência disponível até esse prazo ou um método de extrapolação com limite de erro próprio. O teorema algébrico sobre deriva linear permanece para extrapolação, enquanto o limite de erro das referências aumenta se algum peso for negativo. A regra de curvatura foi aplicada aqui apenas dentro do intervalo das referências.

## Verificação executada

Cinco consultas foram executadas no Cosmos com Z3 e JSON UTF-8 via stdin. O script usa timeout de 10 s por verificação de satisfatibilidade.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Use os três primeiros campos como visao, hipoteses e tese. Declare cada identificador como constante de aridade 0 com numerico=true e use regras=[]. Em CANCELA_RETA, l e r são λ nos dois instantes da reconstrução, a é τ/h e w é o peso da segunda referência. Na consulta de curvatura, k é o coeficiente de 0,004 K/s² e x é a estimativa nominal arredondada. Os três estados correspondem a premissas, premissas com tese e premissas com sua negação. O último campo é o código observado.

```json
[
["CANCELA_RETA",["w = l + a × (l − r)","d = (1 − l) × b + l × c","e = (1 − r) × b + r × c","j = (1 − w) × b + w × c"],"(1 + a) × d − a × e = j","SEGUE",["sat","sat","unsat"],0],
["PESOS_CALIBRACAO",["a = 1 / 5","l = 5 / 6","r = 2 / 3","w = l + a × (l − r)"],"w = 13 / 15 ∧ 1 − w = 2 / 15","SEGUE",["sat","sat","unsat"],0],
["CURVATURA_OCULTA",["k = 1 / 250","b = k × 0 × (3 − 0)","c = k × 3 × (3 − 3)","d = k × (5 / 2) × (3 − 5 / 2)","e = k × 2 × (3 − 2)","x = 7963 / 10000","y = x + 6 / 5 × d − 1 / 5 × e"],"b = 0 ∧ c = 0 ∧ x ≤ 4 / 5 ∧ y > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["RELOGIO",["fim > inicio","w × (fim − inicio) = t + tau − inicio","ww × ((fim + u) − (inicio + u)) = t + u + tau − (inicio + u)"],"w = ww","SEGUE",["sat","sat","unsat"],0],
["REFERENCIAS_RUIDOSAS",["erro ≥ 0","w ≥ 0","w ≤ 1","b ≥ −erro","b ≤ erro","c ≥ −erro","c ≤ erro","r = (1 − w) × b + w × c"],"r ≥ −erro ∧ r ≤ erro","SEGUE",["sat","sat","unsat"],0]
]
```

Calculei em Python t*+τ=2,6 s, w=(t*+τ)/3, o limite de curvatura pela fórmula acima e a contribuição de desvio padrão com math.hypot(1-w,w). O programa encerrou com código zero e produziu w=0,8666666667, coeficiente de curvatura=0,95 s², erro do contraexemplo=0,0044 K e M nominal máximo=0,0030918597 K/s². A dedução pelo resto da interpolação e as avaliações decimais ocorreram fora do solver. Os resultados são sintéticos.

Somar uma origem comum ao relógio conserva os pesos, como verificado em RELOGIO. Uma origem térmica comum aos valores do padrão e da leitura também conserva a diferença usada para a referência. Esses resultados independem da identidade de quem mede e dependem do instrumento compartilhar a mesma deriva na medição e no padrão. Uma referência que troca o estado térmico do aparelho pode violar essa hipótese.

Cobertura incremental de Lucas 14 → prazo de decisão → deriva do instrumento → correção por referência → curva invisível aos dois extremos. Estende Todo 19–21. T02–T03 contextualizam a informação parcial e T09 a reserva. Próximo ponto: comparar uma terceira referência e uma referência simultânea por canal independente, incluindo disponibilidade até o prazo e os efeitos do erro de cada canal.

SHA-256 de Todo 21 conferido nos bytes. `00fec27b324339d2e160fbb6d6e387f157fe765cfc73619e3d1f6a751f23f475`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `cb7bf8aa625ad2cca48d3553cfe9933f0e84b27e`. O verificador anterior passou e a consulta ao site Pages retornou Not Found. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43686778146).
