# 12/11/2026 — Destino 1: distinguir duas posições com tempo de voo

No relatório anterior, a diferença entre os tempos de chegada dos dois fótons permitiu localizar a emissão ao longo da linha no modelo ideal. Este ensaio quantifica como o erro temporal limita essa inferência. Surti e Karp mediram o efeito do tempo de voo em uma tarefa de detecção de lesões em um fantoma. O ensaio abaixo é uma classificação idealizada de duas posições, sem reconstrução de imagem ou validação em aparelho. [Estudo experimental de Surti e Karp](https://pmc.ncbi.nlm.nih.gov/articles/PMC2662381/)

## Hipóteses e previsão

Dois detectores calibrados estão nos extremos 0 e L de uma linha, em metros. Considere coincidências verdadeiras e duas posições equiprováveis x₁<x₂, ambas em [0,L]. A distância entre elas é d=x₂−x₁ em m. O atraso registrado Y, em segundos, é Y=(2x−L)/c+ε, com c=299792458 m/s e ε gaussiano de média zero e desvio padrão σₜ>0. A dispersão espacial de uma leitura é σₓ=cσₜ/2. O exemplo fixa σₜ=100 ps como desvio padrão do atraso do par, equivalente a aproximadamente 235,5 ps de largura a meia altura gaussiana.

As duas distribuições têm variância igual e médias separadas por 2d/c. Sob custos iguais de classificação, a regra de máxima verossimilhança escolhe a posição cuja média está mais próxima de Y. O limiar é o ponto médio das médias. A probabilidade de acerto é Φ(d/(cσₜ)), onde Φ é a distribuição acumulada normal padrão. Para 95% de acerto, d≥Φ⁻¹(0,95)cσₜ≈4,93 cm neste exemplo. Esse limite vale para uma coincidência e duas posições conhecidas. Ele não é a resolução de um tomógrafo.

Um desvio fixo b no atraso desloca a posição estimada em cb/2. Por exemplo, um desvio de 50 ps desloca a estimativa em aproximadamente 7,5 mm, mesmo após muitas leituras. Essa consequência separa o erro aleatório do erro de calibração no que o fragmento observa.

## Ensaio executado

O analisador do Cosmos aceitou as fórmulas e o Z3 verificou consistência, consulta e negação. As constantes são reais. luz=c, ll=L, xx e yy são posições, des=b, lim é o limiar, tt é o atraso e estim é a posição calculada sem corrigir o desvio.

```text
{"id":"LIMIAR","premissas":{"A":"xx < yy ∧ luz > 0 ∧ luz × tUm = 2 × xx − ll ∧ luz × tDois = 2 × yy − ll","B":"2 × lim = tUm + tDois"},"alvo":"tUm < lim ∧ lim < tDois ∧ luz × (tDois − tUm) = 2 × (yy − xx)","esperado":"SEGUE"}
{"id":"VIES","premissas":{"A":"luz > 0 ∧ des ≠ 0 ∧ luz × tt = 2 × xx − ll + luz × des","B":"luz × tt = 2 × estim − ll"},"alvo":"2 × (estim − xx) = luz × des ∧ estim ≠ xx","esperado":"SEGUE"}
```

O ensaio numérico usou 200.000 coincidências sintéticas por distância, com posições alternadas. O gerador congruencial começou em 20261112 e atualizou o estado por (1664525·estado+1013904223) módulo 2³². Cada uniforme foi (estado+0,5)/2³². Dois uniformes por coincidência geraram ruído via Box–Muller. Com o limiar transladado para zero, o atraso usado na classificação foi ±d/c+ε. A referência integrou a densidade normal entre 0 e d/(cσₜ) por 10.000 pontos médios e somou 0,5.

```text
LIMIAR SEGUE [A, B, consulta]
VIES SEGUE [A, B, consulta]
{"gap":0.01,"n":200000,"correct":126549,"simulated":0.632745,"analytic":0.6306457421314169}
{"gap":0.03,"n":200000,"correct":168578,"simulated":0.84289,"analytic":0.841512201033007}
{"gap":0.05,"n":200000,"correct":190553,"simulated":0.952765,"analytic":0.9523243152550571}
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-resolucao-temporario.mjs.

A conexão com o Tubo é dar um limite quantitativo à informação espacial do recibo. Detectar a emissão permite inferir a posição com uma taxa de acerto dependente da separação e da precisão temporal. A eficácia experimental deste modelo ainda não foi medida. Próximo teste: calibrar um desvio fixo com uma fonte de posição conhecida e verificar quanto essa calibração melhora a classificação sob ruído.

