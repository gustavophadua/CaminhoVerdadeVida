# 15/11/2026 — Todo 18 — O atraso do termômetro na decisão de 4 J

A parábola da torre inspira considerar o tempo que o instrumento precisa para acompanhar a temperatura. A hipótese do projeto é que a inércia térmica do sensor pode inverter a decisão tomada em 2,5 s, prazo de espera imposto pela reserva. A leitura da parábola é interpretativa. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo

Retomamos a espera de Todo 15–17 com P=0,20 W, 0,5 J disponíveis, prazo t*=2,5 s e requisito θ(t*)≤0,8 K. O excesso real θ é a diferença entre a temperatura do corpo e a do banho. No corpo isotérmico com banho fixo, θ(t)=s+A exp(−kt), em K, com A=θ(0)−s>0, k=G/C>0 em s⁻¹ e equilíbrio s=fP/G em K. Os parâmetros de troca permanecem constantes durante a janela.

O sensor tem capacidade e condutância de acoplamento próprias, com razão τ>0 em segundos, e carga térmica desprezível sobre o corpo. Seu excesso indicado, antes do erro estático, é y em K e satisfaz τ y′=θ−y. Seja m=y+δ a leitura final, com erro estático |δ|≤ε em K. A resposta de primeira ordem é uma hipótese do instrumento. Um estudo técnico do NIST mostra por que a constante de tempo depende da construção do termopar. Pennes fornece a conexão com medição de temperatura em tecidos, onde também se precisa especificar o instrumento e as condições de troca. Os parâmetros do Tubo foram escolhidos para análise. [NIST TN 1803](https://nvlpubs.nist.gov/nistpubs/TechnicalNotes/NIST.TN.1803.pdf) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

## Previsão e contraexemplos

Com e=y−θ e e₀=y(0)−θ(0), vale e′+e/τ=−θ′. Integração dá

    e(t) = e₀ exp(−t/τ) + ∫₀ᵗ exp(−(t−u)/τ) [−θ′(u)] du
    e(t) = e₀ exp(−t/τ) + Ak [exp(−kt)−exp(−t/τ)]/(1/τ−k), se k≠1/τ
    e(t) = e₀ exp(−kt) + Ak t exp(−kt), se k=1/τ.

Se e₀=0 e 0≤−θ′≤L, com L em K/s, então 0≤e(t)≤Lτ(1−exp(−t/τ))≤Lτ. No resfriamento exponencial L=Ak. Seguem duas regras de decisão suficientes:

- Se m+ε≤0,8 K, a margem está garantida.
- Se m−ε−Lτ>0,8 K, a margem falhou.

Para e₀ com sinal desconhecido e |e₀|≤b, em K, some b exp(−t/τ) à folga do primeiro teste e subtraia a mesma quantidade no segundo. Um sensor já equilibrado inicialmente fornece uma leitura dinâmica por cima do excesso real durante a descida. Com inicialização arbitrária, uma decisão baseada só nesse sinal perde a garantia.

No cenário nominal de Todo 17, k=0,10 s⁻¹, s=0,08 K, A=0,92 K e θ(t*)≈0,796496720 K. A tabela foi calculada em Python para e₀=0 e δ=0.

| τ | Excesso lido no prazo | Atraso térmico y−θ |
|---:|---:|---:|
| 20 ms | 0,797932586 K | 1,436 mK |
| 38 ms | 0,799229794 K | 2,733 mK |
| 50 ms | 0,800097206 K | 3,600 mK |
| 100 ms | 0,803734061 K | 7,237 mK |

A 100 ms a leitura isolada reprovaria um corpo que está dentro da margem. A expressão integral mostra que e(t*) aumenta com τ quando e₀=0 e −θ′>0. A bisseção numérica deu τ≈48,657 ms para y(t*)=0,8 K. Com erro estático ε=1 mK e exigência y(t*)+ε≤0,8 K mesmo supondo leitura nominal δ=0, a fronteira é 34,816 ms. Se o próprio registro puder desviar até +ε da indicação nominal e ainda se exigir m+ε≤0,8 K para todo registro, a condição de projeto usa y(t*)+2ε≤0,8 K. O limite simples Lτ, aplicado a y+ε, dá τ≤38,079 ms com ε=0 e τ≤27,210 ms com ε=1 mK. Esses valores dizem respeito ao modelo e ao critério de aceitação indicado.

Contraexemplo de aprovação indevida. Configure θ(0)=1 K, s=0,64 K, k=1/τ=ln(2)/t* e y(0)=0,70 K. Então θ(t*)=0,82 K e y(t*)=0,67+0,18 ln(2)≈0,794766493 K, ainda abaixo de 0,8 K. O erro negativo vem da temperatura inicial do sensor. Com C=0,5 J/K e P=0,20 W, G=kC>0 e f=sG/P fica entre 0 e 1. O caso cabe no domínio térmico e viola o requisito escolhido.

## Ensaios executados

Foram feitas cinco chamadas ao analisador Cosmos com Z3, com JSON UTF-8 via stdin e timeout do motor de 10 s por verificação.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Use os três primeiros campos de cada item como visao, hipoteses e tese. Passe regras=[] e declare cada identificador como constante numérica com aridade 0. Real, leitura, atraso, desvio e erro são grandezas em K. Taxa é L em K/s e tempo é τ em s. Em SENSOR_FRIO, log representa ln(2), usando a inclusão analítica 0,69<ln(2)<0,70. Em FALHA_FALSA, os intervalos racionais envolvem os valores da avaliação numérica do cenário de 100 ms. O solver verificou as implicações algébricas dadas as inclusões. Os três resultados de satisfatibilidade se referem às premissas, à conjunção com a tese e à conjunção com sua negação. O último campo é o código de saída.

```json
[
["APROVACAO_CONSERVADORA",["atraso ≥ 0","erro ≥ 0","desvio ≥ −erro","leitura = real + atraso + desvio","leitura + erro ≤ 4 / 5"],"real ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["REJEICAO_COM_LIMITE",["atraso ≥ 0","atraso ≤ taxa × tempo","erro ≥ 0","desvio ≤ erro","leitura = real + atraso + desvio","leitura − erro − taxa × tempo > 4 / 5"],"real > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["FALHA_FALSA",["real ≥ 7964 / 10000","real ≤ 7966 / 10000","atraso ≥ 72 / 10000","atraso ≤ 74 / 10000","leitura = real + atraso"],"real ≤ 4 / 5 ∧ leitura > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["SENSOR_FRIO",["real = 82 / 100","log > 69 / 100","log < 7 / 10","leitura = 67 / 100 + 18 / 100 × log"],"real > 4 / 5 ∧ leitura < 4 / 5","SEGUE",["sat","sat","unsat"],0],
["MUDANCA_ORIGEM",["real = corpo − banho","y = sensor − banho","novoreal = (corpo + origem) − (banho + origem)","novoy = (sensor + origem) − (banho + origem)"],"novoy − novoreal = y − real","SEGUE",["sat","sat","unsat"],0]
]
```

Para reproduzir o cálculo em Python, use a=1/tau-k e e=A*k*exp(-k*t)*(-expm1(-t*a)/a), com o limite A*k*t*exp(-k*t) se a=0. Use a expressão do corpo para y=theta+e. Os limiares vieram de 60 passos de bisseção no intervalo de 0,001 s a 0,1 s para y(t*)+ε=0,8 K. As equações diferenciais foram resolvidas analiticamente. As avaliações em ponto flutuante e a bisseção ocorreram fora do solver. A rodada usa dados sintéticos.

Uma mudança comum de origem nas leituras de corpo, sensor e banho preserva y−θ, como verificado no Z3. Um deslocamento galileano comum preserva o movimento relativo sob as mesmas condições de acoplamento. Alterar o fluxo em relação ao sensor pode mudar τ. A decisão depende da calibração, da condição inicial e do limite escolhido, independentemente da identidade de quem lê o instrumento.

Cobertura incremental. Lucas 14 → custo e tempo de decisão → inércia do termômetro → faixa de guarda e contraexemplos. Estende Todo 15–17. T02–T03 contextualizam a observação parcial e T09 contextualiza a reserva. Próximo ponto: separar a constante do dispositivo da constante do termômetro com um degrau térmico independente e verificar quando uma curva de dois modos permite distingui-las.

SHA-256 de Todo 17 conferido nos bytes. `0dbef2ffab8ef5941f9dd4dc5849f08900e24368925477704fe5f80d21431101`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `90e5fc4532ff35a26eec883e6b4d63246f282acb`. O verificador e a compilação anteriores passaram. A consulta ao site Pages retornou Not Found no deploy anterior. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43678089581).
