# 15/11/2026 — Todo 20 — Reconstrução da temperatura com leituras imperfeitas

A parábola da torre orienta a pergunta sobre quanto pode custar um erro antes de iniciar a etapa seguinte. No Tubo, a hipótese é que a resposta calibrada do termômetro permite compensar o atraso em tempo hábil, desde que o intervalo entre amostras mantenha o erro da reconstrução abaixo da margem. O mecanismo testado é a diferenciação numérica com dados de precisão limitada. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo e limites

Nos cenários de Todo 17–19, usamos o prazo t*=2,5 s para uma espera de no máximo 0,5 J a 0,20 W, com reserva inicial de 4 J. O critério escolhido para iniciar A é o excesso térmico do corpo θ(t*)≤0,8 K. O sensor de primeira ordem mede o excesso y e tem constante de tempo calibrada τ>0 em s. A identidade θ=y+τy′ vem da equação τy′=θ−y. Leituras m(t)=y(t)+δ(t) têm erro absoluto |δ(t)|≤ε em K. O cálculo trata os erros de forma determinística, permitindo sinais opostos em amostras consecutivas. O banho, a potência e os tempos são fixos nesta rodada.

A estimativa com amostras até o prazo usa o passo h>0 em segundos e a diferença regressiva. Denote m₀=m(t*) e m₁=m(t*−h). Se |y″|≤M₂ em K/s² na janela, Taylor e a soma dos módulos dos pesos dão

    θ₁ = m₀ + τ(m₀−m₁)/h
    |θ₁−θ(t*)| ≤ B₁ = ε(1+2τ/h) + τ M₂ h/2.

O ganho exato do erro de leitura para dois valores independentes no intervalo [−ε,ε] é 1+2τ/h. Ele é alcançado com δ₀=+ε e δ₁=−ε. A ponta de Taylor cresce com h. Para ε e M₂ positivos, o mínimo de B₁ sem restrição de janela ocorre em h=√(4ε/M₂). Dentro de uma janela máxima, use o menor entre esse passo e o tamanho admissível.

Uma fórmula de ordem dois com m₂=m(t*−2h) usa

    θ₂ = m₀ + τ(3m₀−4m₁+m₂)/(2h)
    |θ₂−θ(t*)| ≤ B₂ = ε(1+4τ/h) + τ M₃ h²/3,

onde M₃ limita |y‴| em K/s³ na janela. O erro de truncamento segue da fórmula de interpolação quadrática em nós 0, h, 2h, ou do núcleo integral do resto de Taylor com sinal constante. Para ambos os métodos, se θ_estimado+B≤0,8 K, a margem está garantida pelos limites adotados. Se θ_estimado−B>0,8 K, a margem falhou. A região entre esses casos admite incerteza. Suavização e diferenciação aparecem no artigo original de Savitzky e Golay. O estudo de Pennes é uma conexão experimental para a medição de temperatura de tecidos, onde a resposta do instrumento também importa. As métricas e os passos da tabela abaixo são do Tubo. [Savitzky e Golay, 1964](https://doi.org/10.1021/ac60214a047) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

## Ensaio numérico e contraexemplo

Adote as condições nominais do Todo 18, s=0,08 K, A=0,92 K, taxa do corpo p=0,10 s⁻¹, τ=0,10 s e sensor inicialmente em equilíbrio com o corpo. Temos θ(t*)≈0,796496720 K e y(t*)≈0,803734061 K. A partir da fórmula de dois exponenciais de Todo 19, em [1,5 s, 2,5 s], limite exp(−pt) por 1 e exp(−t/τ) por exp(−15). Isso dá M₂=0,01 K/s² e M₃=0,001 K/s³ como limites superiores conservadores.

| Método | ε | h | Estimativa nominal (K) | B (mK) | Estimativa nominal + B (K) |
|---|---:|---:|---:|---:|---:|
| Dois pontos | 1 mK | 0,02 s | 0,796489478 | 11,010 | 0,807499478 |
| Dois pontos | 1 mK | 0,50 s | 0,796312733 | 1,650 | 0,797962733 |
| Dois pontos | 1 mK | 0,63246 s | 0,796262953 | 1,632 | 0,797895409 |
| Três pontos | 1 mK | 0,50 s | 0,796502983 | 1,808 | 0,798311316 |
| Dois pontos | 3 mK | 0,50 s | 0,796312733 | 4,450 | 0,800762733 |
| Dois pontos | 3 mK | 1,00 s | 0,796122484 | 4,100 | 0,800222484 |
| Três pontos | 3 mK | 0,50 s | 0,796502983 | 5,408 | 0,801911316 |

As linhas avaliam a regra com leituras sintéticas centradas na indicação ideal. Para garantir aprovação para qualquer erro de leitura no cenário nominal, some novamente à coluna final o ganho de erro de leitura vezes ε. Com dois pontos, h=0,5 s e ε=1 mK, isso dá 0,799362733 K, ainda abaixo de 0,8 K. Com h=0,02 s, sinais opostos de erro geram uma estimativa de 0,807489478 K, acima do limite apesar de o corpo satisfazê-lo. Na linha de 3 mK e h=0,5 s, o Z3 confirmou que o intervalo arredondado admite os dois lados da decisão. Cruzar o limite com uma faixa conservadora deixa a certificação em aberto.

A fórmula assume τ conhecido. Se a estimativa usa τ_hat e |τ_hat−τ|≤η, pode-se usar τ_hat na parte de diferenças finitas e acrescentar η·sup|y′| em K, com η em segundos. A validade dos limites M₂, M₃ e sup|y′| depende do domínio de calibração. O ensaio executado usa valores sintéticos.

## Verificação e cobertura

Executei cinco consultas com JSON UTF-8 via stdin. Cada verificação do motor tem timeout de 10 s.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Para reproduzir, passe os três primeiros campos de cada item como visao, hipoteses e tese. Use regras=[] e símbolos constantes numéricos de aridade 0. Em GANHO_ERRO e AMPLIFICACAO_ATINGIVEL, a=τ/h, e=ε, x e y são erros em K. Em ORIGEM, x e y são leituras numéricas em K antes de subtrair o banho. Os três retornos significam satisfatibilidade das premissas, de premissas com tese e de premissas com sua negação. O último campo é o código real de saída.

```json
[
["GUARDA",["lim ≥ 0","estim − real ≤ lim","real − estim ≤ lim","estim + lim ≤ 4 / 5"],"real ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["GANHO_ERRO",["a ≥ 0","e ≥ 0","x ≥ −e","x ≤ e","y ≥ −e","y ≤ e","erro = (1 + a) × x − a × y"],"erro ≤ (1 + 2 × a) × e ∧ erro ≥ −(1 + 2 × a) × e","SEGUE",["sat","sat","unsat"],0],
["AMPLIFICACAO_ATINGIVEL",["a = 5","e = 1 / 1000","x = e","y = −e","erro = (1 + a) × x − a × y"],"erro = 11 / 1000","SEGUE",["sat","sat","unsat"],0],
["ORIGEM",["a ≥ 0","z = (1 + a) × (x − banho) − a × (y − banho)","zz = (1 + a) × (x + origem − (banho + origem)) − a × (y + origem − (banho + origem))"],"z = zz","SEGUE",["sat","sat","unsat"],0],
["POUCA_FOLGA",["estim = 7963 / 10000","lim = 445 / 100000","estim − lim ≤ real","real ≤ estim + lim"],"real ≤ 4 / 5","EM ABERTO",["sat","sat","sat"],0]
]
```

Os números da tabela foram calculados em Python com y(t)=0.08+0.92*(10*math.exp(-0.1*t)-0.1*math.exp(-10*t))/9.9 e as expressões de θ₁, θ₂, B₁ e B₂. Os limites de Taylor e as exponenciais foram tratados analiticamente, fora do Z3. O solver verificou a regra de decisão, o limite e a realização do ganho de erro, a mudança de origem e o caso de decisão em aberto.

Uma origem comum adicionada às duas temperaturas deixa a reconstrução do excesso invariável, como verificado no Z3. Somar uma origem ao relógio também preserva os intervalos e o instante relativo ao início da espera. Uma translação galileana comum de corpo, sensor e banho preserva o movimento relativo no modelo e os coeficientes são considerados fixos. A incerteza instrumental e as propriedades de troca permanecem determinantes e independem da identidade de quem lê o sensor.

Cobertura incremental de Lucas 14 → margem de decisão → compensação da inércia → amplificação de erro → contraexemplo com amostras muito próximas. Dá continuidade a Todo 17–19. T02–T03 contextualizam a observação parcial e T09 contextualiza o consumo de reserva. Próxima questão: verificar se uma média de amostras melhora a decisão sob erros correlacionados ou sob um erro constante de calibração.

SHA-256 de Todo 19 conferido nos bytes. `4b03a256b7a35bdf70e5266277fbea10e1a6720871ea74c0d9e71e31cb91b36b`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `359130e223e567b5b3af461e6e344efcb7e0bf0b`. O verificador anterior passou e o workflow encerrou com falha na publicação Pages. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43682323112).
