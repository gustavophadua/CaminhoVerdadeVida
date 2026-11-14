# 12/11/2026 — Relatório 14 — Quando medir o marcador isotópico

O relatório 13 obteve o decaimento da diferença de frações isotópicas em dois compartimentos. Esta rodada determina quando observar essa diferença para estimar o fluxo de troca com ruído aditivo. O método segue a literatura de desenho ótimo para regressão exponencial e modelos compartimentais. [Dette, Melas e Wong, Statistica Sinica, 2006](https://www3.stat.sinica.edu.tw/statistica/j16n3/j16n36/j16n36.html)

Em t≥0, medido em s, a média da diferença observada é μ(t)=A exp(−λt), com A∈[−1,1] adimensional e diferente de zero. A taxa λ>0 em s⁻¹ se relaciona ao fluxo J em mol/s por λ=J(1/X+1/Y), com quantidades positivas X,Y em mol, conhecidas e constantes. Adota-se a dinâmica ideal do relatório 13 e erro gaussiano aditivo, independente entre leituras, com variância constante σ²>0. A aproximação permite que a leitura ruidosa ultrapasse os limites físicos da diferença de frações.

Com A conhecido, a informação de Fisher de uma leitura para λ é I(t)=A²t² exp(−2λt)/σ², em s². Sua derivada é [2A² exp(−2λt)/σ²] t(1−λt). Ela cresce até t=1/λ e decresce a partir daí. A informação para J difere pelo fator constante (1/X+1/Y)² e tem o mesmo máximo. Se λ=2 s⁻¹, o instante ótimo local é 0,5 s.

Se A também for desconhecido, uma leitura tem matriz de informação de posto no máximo um. Para duas leituras, o gradiente da média é exp(−λtᵢ)(1,−Atᵢ). Somando os produtos externos divididos por σ², obtém-se det I = A² exp[−2λ(t₁+t₂)](t₂−t₁)²/σ⁴, em s². Repetir o mesmo instante deixa o determinante em zero, mesmo com duas leituras. Para 0≤t₁≤t₂, fixar a distância τ=t₂−t₁ mostra que atrasar as duas leituras multiplica o determinante por exp(−4λt₁). Assim t₁=0 e, pela derivada anterior em τ, t₂=1/λ maximizam o determinante. A hipótese de acesso imediato a t=0 é parte do desenho.

O resultado para o Tubo é uma escolha local de instantes que separa amplitude inicial de taxa de troca. O ótimo depende da taxa nominal e do modelo de ruído. Não houve medição de eficácia experimental. O próximo ensaio pode comparar a sensibilidade a erro na taxa nominal e a um atraso mínimo de coleta.

## Ensaio no Cosmos

O analisador aceitou as fórmulas e Z3 verificou premissas, consulta e negação, com limite de 10 s por verificação. Constantes reais. peso é o fator positivo da derivada. wUm e wDois representam exp(−2λtᵢ)/σ². O solucionador verificou o sinal e a condição de posto na forma algébrica. A diferenciação, as exponenciais e a maximização foram deduzidas analiticamente.

```text
{"id":"ANTES","premissas":{"A":"tt > 0 ∧ taxa > 0 ∧ taxa × tt < 1 ∧ peso > 0 ∧ deriv = peso × tt × (1 − taxa × tt)"},"alvo":"deriv > 0","esperado":"SEGUE"}
{"id":"DEPOIS","premissas":{"A":"tt > 0 ∧ taxa > 0 ∧ taxa × tt > 1 ∧ peso > 0 ∧ deriv = peso × tt × (1 − taxa × tt)"},"alvo":"deriv < 0","esperado":"SEGUE"}
{"id":"RANK","premissas":{"A":"amp ≠ 0 ∧ wUm > 0 ∧ wDois > 0","B":"det = amp × amp × wUm × wDois × (tDois − tUm) × (tDois − tUm)"},"alvo":"(tDois = tUm ∧ det = 0) ∨ (tDois ≠ tUm ∧ det > 0)","esperado":"SEGUE"}
```

```text
ANTES SEGUE [A, consulta]
DEPOIS SEGUE [A, consulta]
RANK SEGUE [A, B, consulta]
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-14-temporaria.mjs.

