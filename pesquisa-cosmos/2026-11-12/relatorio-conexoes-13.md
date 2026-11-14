# 12/11/2026 — Relatório 13 — Marcação isotópica no equilíbrio

O relatório 12 mostrou que a troca entre dois compartimentos pode continuar com fluxo líquido zero. Aqui, uma diferença inicial de composição isotópica torna mensurável o fluxo bruto J, sem alterar a quantidade total de material. Como antecedente experimental, Heurteaux et al. acompanharam isótopos estáveis de lítio em camundongos sob concentração plasmática total estacionária e estimaram fluxos a partir da cinética. O estudo também considera processos renais e serve como exemplo de método, sem validar o sistema fechado idealizado abaixo. [Estudo primário, 1985](https://pubmed.ncbi.nlm.nih.gov/3922571/)

## Modelo e dedução

Sejam X,Y>0 as quantidades em mol nos dois compartimentos, fixas no equilíbrio. O fluxo de cada sentido é J=aX=bY>0 em mol/s, com a,b em s⁻¹. Para t≥0 em segundos, sejam f₁,f₂∈[0,1] as frações adimensionais de material marcado. Assume-se mistura homogênea em cada compartimento, ausência de saída, decaimento ou efeito cinético isotópico. Na preparação, substitui-se material não marcado pelo marcado em quantidade igual.

Os balanços são X f₁′=−J(f₁−f₂) e Y f₂′=J(f₁−f₂). Portanto X f₁+Y f₂ é constante. Para Δ=f₁−f₂, vale Δ′=−λΔ, com λ=J(1/X+1/Y)>0 em s⁻¹. A solução é Δ(t)=Δ(0)exp(−λt). Dados X,Y e Δ(0)≠0, uma segunda medida ideal da diferença em t>0 permite obter λ=ln[Δ(0)/Δ(t)]/t e J=λXY/(X+Y). O logaritmo usa uma razão adimensional positiva. A inferência de J também pode usar a inclinação inicial, J=−X f₁′(0)/Δ(0).

Se Δ(0)=0, ambas as leituras permanecem constantes para todo J. Esse é o contraexemplo que orienta o desenho do ensaio: a diferença inicial é necessária. Por exemplo, X=Y=2 mol e J=2 ou 6 mol/s dão λ=2 ou 6 s⁻¹, respectivamente, mas produzem a mesma trajetória de frações quando ambas começam iguais.

## Verificação no Cosmos

O analisador aceitou todas as fórmulas. Z3 testou a consistência, a consulta e sua negação, com limite de 10 s por verificação. Constantes reais: xx=X, yy=Y, dif=Δ, jj=J, velUm=f₁′, velDois=f₂′, velDif=Δ′ e taxa=λ. O caso CEGO verifica a igualdade das inclinações em Δ=0. A persistência temporal e a exponencial decorrem da solução analítica da EDO.

```text
{"id":"TAXA","premissas":{"A":"xx > 0 ∧ yy > 0 ∧ dif ≠ 0 ∧ jj > 0","B":"xx × velUm = −jj × dif ∧ yy × velDois = jj × dif","C":"velDif = velUm − velDois ∧ velDif = −taxa × dif"},"alvo":"xx × velUm + yy × velDois = 0 ∧ taxa × xx × yy = jj × (xx + yy)","esperado":"SEGUE"}
{"id":"UNICO","premissas":{"A":"xx > 0 ∧ yy > 0 ∧ dif ≠ 0","B":"xx × velUm = −jj × dif ∧ xx × velUm = −jNovo × dif"},"alvo":"jj = jNovo","esperado":"SEGUE"}
{"id":"CEGO","premissas":{"A":"xx = 2 ∧ yy = 2 ∧ dif = 0 ∧ jj = 2 ∧ jNovo = 6","B":"xx × velUm = −jj × dif ∧ xx × velNovo = −jNovo × dif"},"alvo":"velUm = velNovo ∧ jj ≠ jNovo","esperado":"SEGUE"}
```

```text
TAXA SEGUE [A, B, C, consulta]
UNICO SEGUE [A, B, consulta]
CEGO SEGUE [A, B, consulta]
```

Execução com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-13-temporaria.mjs.

A conexão nova para o Tubo é usar uma composição observável que varia enquanto as quantidades permanecem em equilíbrio. A recuperação de J é condicional às hipóteses e à qualidade da leitura. Nenhuma eficácia experimental nova foi medida. Próximo passo: testar a sensibilidade a ruído nas duas medidas e determinar em que instante vale a pena amostrar antes que Δ fique pequeno.

