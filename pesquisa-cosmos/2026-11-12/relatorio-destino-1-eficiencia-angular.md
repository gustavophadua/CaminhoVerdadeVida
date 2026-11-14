# 12/11/2026 — Destino 1: eficiência do detector e desvio angular

O relatório de cobertura encontrou 40% de coincidências para duas calotas opostas ideais. Esta rodada calcula quanto desse resultado resta ao incluir eficiência por fóton e desvio angular. Na física, DeBenedetti et al. mediram desvios do antiparalelismo de ordem 1/137 rad em um absorvedor de ouro. Na imagem biológica, Ter-Pogossian et al. usaram coincidências dos fótons para localizar emissões em tomografia. [Experimento angular](https://doi.org/10.1103/PhysRev.77.205) · [Instrumento PETT](https://doi.org/10.1148/114.1.89)

## Modelo e equações

A fonte é pontual e central. A primeira direção u é uniforme na esfera unitária. Para o teste de sensibilidade, a segunda direção é v=Rᵧ(δ)(−u), com rotação fixa em torno do eixo y, 0≤δ≤π rad. As duas marginais são uniformes. δ limita superiormente o desvio angular de v em relação a −u. O desvio efetivo depende da direção e δ não representa a média experimental. A energia de cada fóton é aproximada por 511 keV. A rotação é uma hipótese geométrica para testar a cobertura, sem reconstruir a cinemática do par ou modelar o tecido.

O detector cobre S={u: |u_z|≥0,6}, com fração f=0,4. Dentro de S, cada fóton tem probabilidade ε de ser registrado, independente da outra detecção, dado o par de direções. Fora de S, a probabilidade é zero. Com q=P(u∈S,v∈S), a coincidência vale P₂=ε²q e o número médio de fótons por evento vale 2εf. As probabilidades são adimensionais. Para ε=0,8 e δ=0, q=f e P₂=0,256. A fração de energia média registrada no modelo de energias iguais é εf=0,32.

A distância entre v e −u é no máximo d=2sin(δ/2), adimensional. Assim, se |u_z|≥0,6+d, as duas direções pertencem a S. Como u_z é uniforme em [−1,1], segue max(0,f−d)≤q≤f, e max(0,ε²(f−d))≤P₂≤ε²f. A cota inferior usa somente o limite angular. A eficiência quadrática usa a independência condicional, que deve ser testada separadamente em equipamento.

## Ensaios executados

O analisador do Cosmos aceitou todas as fórmulas e o Z3 verificou consistência, consulta e negação. ff=f, eps=ε, dd=d, pDois=P₂, media=número médio registrado. A geometria e o seno foram deduzidos fora do solucionador.

```text
{"id":"EF","premissas":{"A":"5 × ff = 2 ∧ 5 × eps = 4 ∧ q = ff","B":"pDois = eps × eps × q ∧ media = 2 × eps × q"},"alvo":"125 × pDois = 32 ∧ 25 × media = 16","esperado":"SEGUE"}
{"id":"COTA","premissas":{"A":"ff ≥ 0 ∧ dd ≥ 0 ∧ q ≥ 0 ∧ q ≤ ff ∧ q ≥ ff − dd","B":"eps ≥ 0 ∧ eps ≤ 1 ∧ pDois = eps × eps × q"},"alvo":"pDois ≥ 0 ∧ pDois ≥ eps × eps × (ff − dd) ∧ pDois ≤ eps × eps × ff","esperado":"SEGUE"}
```

A quadratura determinística usou 2.000 valores médios zᵢ=−1+(2i+1)/2000 e 720 ângulos φⱼ=2π(j+0,5)/720, contando pares que passam por ambas as calotas. Foram usados x=√(1−zᵢ²)cos φⱼ e v_z=x sin δ−zᵢ cos δ. As contagens foram divididas por 1.440.000 para estimar q. A eficiência foi aplicada analiticamente depois.

```text
EF SEGUE [A, B, consulta]
COTA SEGUE [A, B, consulta]
{"delta":0,"count":576000,"q":0.4,"coincidencia":0.256,"cota":0.256}
{"delta":0.0072992700729927005,"count":573300,"q":0.398125,"coincidencia":0.2548,"cota":0.25132847752395293}
{"delta":0.05,"count":557684,"q":0.3872805555555556,"coincidencia":0.24785955555555558,"cota":0.2240033332291682}
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-angular-temporario.mjs.

A conexão com o Tubo é quantificar como uma observação parcial pode perder o par mesmo quando a energia média registrada se mantém. Neste modelo, a eficiência de 80% por fóton reduz a coincidência de 40% para 25,6% no caso antiparalelo, e a rotação de 1/137 rad reduz a estimativa para 25,48%. São previsões condicionais de um ensaio numérico. Não houve medição de eficácia em detector real. Próximo passo: testar uma distribuição de desvio calibrada e comparar a previsão com eficiências dependentes de direção.

