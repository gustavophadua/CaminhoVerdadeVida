# 12/11/2026 — Destino 1: atenuação e localização do sinal

A rodada sobre eficiência angular tratou a geometria do detector. Aqui, o Axioma 4 do Tubo ganha outro limite observável: os fótons podem ser removidos do feixe no material entre a fonte e o detector. Em tomografia por emissão de pósitrons, a atenuação afeta a reconstrução do traçador. O tempo de voo acrescenta informação ao problema inverso, conforme estudado por Defrise, Rezaei e Nuyts. [Estudo primário, Physics in Medicine & Biology, 2012](https://doi.org/10.1088/0031-9155/57/4/885)

## Hipóteses e dedução

Considere um par antiparalelo de aproximadamente 511 keV já selecionado em uma linha entre detectores ideais. As extremidades estão em 0 e L>0, e a emissão em x∈[0,L], com distâncias em metros. Adote propagação retilínea a c, atenuação local μ(s)≥0 integrável em m⁻¹ e sobrevivências independentes, condicionadas à linha e à emissão. Os eventos espalhados são descartados. As profundidades ópticas são τ₁(x)=∫₀ˣμ(s)ds e τ₂(x)=∫ₓᴸμ(s)ds, ambas adimensionais. As transmissões são Tᵢ=exp(−τᵢ).

A probabilidade de registrar o par é T₁T₂=exp(−∫₀ᴸμ(s)ds). A probabilidade de coincidência permanece igual em qualquer posição x na mesma linha, mesmo para μ não uniforme. Já a diferença de chegada Δt=t_esquerda−t_direita=(2x−L)/c em s determina x=(L+cΔt)/2 no modelo ideal. Uma incerteza de 100 ps no atraso corresponde a cerca de 1,50 cm de incerteza na posição, para a mesma medida de dispersão. A inferência requer relógios calibrados.

Se N é o número esperado de pares emitidos nessa linha e A a transmissão do par, C=NA é a contagem esperada de coincidências. Sem A conhecido, C sozinho é ambíguo. N=100 com A=1/2 e N=200 com A=1/4 dão C=50. A ambiguidade demonstrada é de uma única linha e uma única contagem. A prova geral de reconstrução tomográfica exige outras hipóteses e outros dados.

## Ensaio executado

O Cosmos aceitou as fórmulas e Z3 verificou a consistência, a consulta e a negação. ll=L, xx e yy são posições alternativas, luz=c e atraso=Δt. LINHA verifica a soma de profundidades no caso homogêneo. A extensão ao caso heterogêneo decorre da aditividade da integral. AMB verifica o contraexemplo da contagem.

```text
{"id":"LINHA","premissas":{"A":"ll > 0 ∧ xx ≥ 0 ∧ xx ≤ ll ∧ yy ≥ 0 ∧ yy ≤ ll ∧ mu ≥ 0","B":"tUm = mu × xx ∧ tDois = mu × (ll − xx) ∧ tTres = mu × yy ∧ tQuatro = mu × (ll − yy)"},"alvo":"tUm + tDois = tTres + tQuatro","esperado":"SEGUE"}
{"id":"TOF","premissas":{"A":"luz > 0 ∧ luz × atraso = 2 × xx − ll ∧ luz × atraso = 2 × yy − ll"},"alvo":"xx = yy","esperado":"SEGUE"}
{"id":"AMB","premissas":{"A":"fonte = 100 ∧ outra = 200 ∧ 2 × fator = 1 ∧ 4 × fatorNovo = 1","B":"conta = fonte × fator ∧ contaNovo = outra × fatorNovo"},"alvo":"conta = contaNovo ∧ fonte ≠ outra","esperado":"SEGUE"}
```

Em JavaScript, foi avaliado um meio homogêneo ilustrativo com L=0,20 m, μ=9,6 m⁻¹ e c=299792458 m/s. Para cada posição foram calculados exp(−μx), exp(−μ(L−x)), seu produto e Δt em ps. O coeficiente foi escolhido para ilustrar o modelo e não foi estimado de amostras biológicas.

```text
LINHA SEGUE [B, consulta]
TOF SEGUE [A, consulta]
AMB SEGUE [A, B, consulta]
{"x":0.05,"left":0.6187833918061408,"right":0.2369277586821217,"pair":0.1466069621303501,"delayPs":-333.5640951981521}
{"x":0.1,"left":0.38289288597511206,"right":0.38289288597511206,"pair":0.14660696213035015,"delayPs":0}
{"x":0.15,"left":0.23692775868212176,"right":0.6187833918061407,"pair":0.1466069621303501,"delayPs":333.56409519815196}
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-atenuacao-temporario.mjs.

Para o Tubo, o “recibo” tem dois observáveis com papéis distintos. A coincidência indica que o par atravessou o material. A diferença de chegada localiza a emissão ao longo da linha. Os resultados são condicionais e não houve medição de eficácia em equipamento. Próximo teste: simular erro temporal e verificar quando duas posições próximas podem ser distinguidas.

