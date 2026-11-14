# 2026-11-11 — 10: Adaptação e calibração do sensor de memória

O relatório 09 separou as taxas de adaptação quando a memória é medida em uma escala conhecida. Se um sensor biológico fornece apenas um sinal proporcional à memória, mesmo observar a trajetória inteira de atividade e a do sensor deixa uma ambiguidade exata. O resultado é uma aplicação ao Tubo da análise de simetrias de escala. Castro e de Boer estudaram o método em modelos de EDOs ([PLOS Computational Biology, 2020](https://pmc.ncbi.nlm.nih.gov/articles/PMC7665633/)). Villaverde e Massonis demonstraram por exemplos que procurar apenas simetrias de escala pode deixar outras ambiguidades passar ([PLOS Computational Biology, 2021](https://pmc.ncbi.nlm.nih.gov/articles/PMC8516234/)).

## Hipóteses e equações

Em t ≥ 0, em segundos, os estados reais adimensionais e (desvio de atividade) e m (desvio de memória) começam em zero. O modelo idealizado de adaptação por feedback integral, motivado pela quimiotaxia bacteriana ([Yi et al., PNAS, 2000](https://pmc.ncbi.nlm.nih.gov/articles/PMC18287/)), é e′ = −ae + bm + d e m′ = −ke. As taxas a,b,k são positivas, em s⁻¹, e d é um degrau constante não nulo, em s⁻¹. A leitura adimensional z = gm tem ganho constante desconhecido g > 0. Supõem-se leitura contínua sem ruído, ganho linear, zero conhecido e ausência de saturação.

As equações em grandezas observadas são e′ = −ae + (b/g)z + d e z′ = −gke. Das derivadas à direita em zero, d = e′(0+), a = −e″(0+)/d e gk = −z″(0+)/d. Além disso, bk = a² − e‴(0+)/d, de onde b/g = bk/(gk). Essas quatro combinações determinam e e z por unicidade da EDO linear. Se d=0, a trajetória nula não fornece essas informações.

Para qualquer λ > 0 adimensional, m̃ = λm, b̃ = b/λ, k̃ = λk e g̃ = g/λ preservam ambas as saídas em todo t. Basta substituir nas equações e preservar as condições iniciais. Reciprocamente, se as saídas coincidem sob as hipóteses acima, as quatro combinações coincidem, e λ = g/g̃ relaciona os parâmetros. A equivalência vale também para entradas d(t) compartilhadas, por substituição direta, logo repetir degraus com o mesmo sensor não quebra a simetria. Medir m independentemente em uma escala conhecida, num instante em que m ≠ 0, fixa g = z/m. Um exemplo de triplas indistinguíveis (b,k,g) é (2,3,4) e (1,6,2), com taxas em s⁻¹.

## Ensaio no Cosmos

O analisador aceitou as fórmulas e o adaptador Z3 verificou premissas, consulta e sua negação, com 10 s por verificação. As constantes são reais e os nomes Novo se referem ao segundo modelo. CAL1 verifica as invariâncias, CAL2 confere o contraexemplo e CAL3 verifica a recuperação das taxas quando o ganho é fixo. A unicidade das trajetórias foi deduzida pela EDO, separadamente do solucionador.

```text
{"id":"CAL1","premissas":{"A":"gg > 0 ∧ ll > 0 ∧ bNovo × ll = bb ∧ kNovo = ll × kk ∧ gNovo × ll = gg","B":"mNovo = ll × mm ∧ zz = gg × mm"},"alvo":"gNovo × mNovo = zz ∧ bNovo × mNovo = bb × mm ∧ gNovo × kNovo = gg × kk","esperado":"SEGUE"}
{"id":"CAL2","premissas":{"A":"bb = 2 ∧ kk = 3 ∧ gg = 4 ∧ bNovo = 1 ∧ kNovo = 6 ∧ gNovo = 2"},"alvo":"bb × gNovo = bNovo × gg ∧ gg × kk = gNovo × kNovo ∧ bb ≠ bNovo ∧ kk ≠ kNovo","esperado":"SEGUE"}
{"id":"CAL3","premissas":{"A":"gg > 0 ∧ gNovo = gg","B":"bb × gNovo = bNovo × gg ∧ gg × kk = gNovo × kNovo"},"alvo":"bb = bNovo ∧ kk = kNovo","esperado":"SEGUE"}
```

```text
CAL1 SEGUE [A, B, consulta]
CAL2 SEGUE [A, consulta]
CAL3 SEGUE [A, B, consulta]
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-10-temporaria.mjs. A conexão com o Tubo é tratar o ganho da observação como hipótese adicional explícita. A eficácia experimental do modelo ou da calibração ainda não foi medida. Próximo ensaio: propagar uma faixa g ∈ [gMin,gMax] para b e k e comparar com intervalos estimados a partir de amostras ruidosas.

