# Conexão 04 — quando guardar mais passado piora a observação do presente

Rodada de 11 de novembro de 2026, iniciada às 13h59 no horário de São Paulo.

A investigação continua o relatório 03. O resultado é um tempo ótimo de memória para um modelo explícito de sinal variável e ruído. O Cosmos verificou três consequências, uma contradição e uma questão em aberto. O resultado é matemático e condicional. A ligação com o Tubo e o sono é uma proposta de interpretação quantitativa.

Malaguti e ten Wolde estudam sistemas celulares que estimam sinais variáveis. O trabalho distingue o erro de amostragem do erro introduzido quando o histórico usado pela célula se afasta da concentração atual. A teoria encontra um compromisso entre esses efeitos e analisa sua aplicação à quimiotaxia de E. coli. Nesta rodada foi construído um modelo linear simplificado, cuja função de erro foi derivada explicitamente. [Pesquisa primária de 2021](https://arxiv.org/abs/1902.09332) · [Publicação](https://elifesciences.org/articles/62574)

Considere o desvio S(t) de uma concentração em relação à média conhecida, com média zero e autocovariância A exp(−|u|/L). A > 0 é a variância, em unidades de concentração ao quadrado, e L > 0 o tempo de correlação, em segundos. Uma realização possível é um processo de Ornstein–Uhlenbeck estacionário. A representação admite flutuações negativas do desvio, sendo apropriada à linearização em torno de uma concentração positiva.

A medição é S(t)+η(t), onde η é ruído branco independente de S, com covariância 2B δ(u), B > 0 em concentração²·segundo. O ruído branco é uma idealização para frequências relevantes do filtro, cujos tempos devem superar a escala microscópica do ruído físico.

O fragmento guarda o passado por uma média exponencial causal de ganho unitário

    Y(t) = ∫₀∞ h(a)[S(t−a)+η(t−a)] da
    h(a) = exp(−a/τ)/τ, τ > 0.

O alvo é a concentração atual S(t). O critério é o erro quadrático médio J(τ) = E[(Y(t)−S(t))²]. Para esse processo, Cov(S,Y_sinal) = Var(Y_sinal) = A L/(L+τ). A contribuição do ruído é 2B ∫h(a)² da = B/τ. Logo,

    J(τ) = A τ/(L+τ) + B/τ.

O primeiro termo aumenta com a duração da memória. O segundo diminui. A derivação usa estacionariedade, independência, filtro linear e concentração média conhecida. O Cosmos recebeu as relações algébricas decorrentes dessa derivação. A integral estocástica não foi provada pelo solucionador.

Com u = τ/L, β = B/(A L) e f = J/A, todos adimensionais, temos

    f(u) = u/(1+u) + β/u.

Para 0 < β < 1, escreva r = √β. O mínimo global entre filtros dessa família ocorre em

    u* = r/(1−r)
    τ* = L √β/(1−√β)
    J_min/A = 2√β − β.

A identidade que demonstra a optimalidade é

    f(u) − (2r−r²) = [(1−r)u−r]²/[u(1+u)].

DIN1 verificou que o custo é sempre pelo menos o mínimo proposto. DIN2 confirmou que a igualdade é alcançada em u(1−r)=r. Assim, o tempo ótimo foi verificado por comparação global, além do argumento de derivada.

A família considerada tem ganho unitário e média exponencial. Um estimador que ajuste também o ganho, ou empregue outra estrutura de memória, pode obter outro ótimo. A conclusão acima é específica da família descrita.

Um exemplo usa A = 1 unidade², L = 1 s e B = 1/16 unidade²·s. Assim, τ* = 1/3 s e J_min = 7/16 unidade².

| Tempo de memória | Erro quadrático médio |
|---|---:|
| τ = 1/6 s | 29/56 ≈ 0,517857 unidade² |
| τ = 1/3 s | 7/16 = 0,4375 unidade² |
| τ = 2/3 s | 79/160 = 0,49375 unidade² |

DIN4 verificou que dobrar o tempo ótimo nesse exemplo eleva o erro acima de 7/16. Esses valores foram calculados por substituição direta na equação. São previsões de um modelo, sem medição nova em células ou humanos.

Para β ≥ 1, DIN3 demonstrou f(u) > 1 em qualquer u positivo finito. O limite com τ crescente é 1, e a derivada é negativa nessa faixa. Dentro dessa família, a melhor precisão é aproximada quando a memória cresce indefinidamente. Uma estimativa constante igual à média conhecida já tem erro A. Isso expõe o limite da escolha de filtro e do nível de ruído assumido, e orienta investigar estimadores com ganho ajustável.

A conexão nova para a organização do projeto é que “retornar ao que já colidiu” pode produzir dois efeitos mensuráveis. O histórico reduz flutuações de medição, mas também mistura estados antigos com o atual. A pergunta quantitativa passa a ser qual tempo de memória corresponde à dinâmica do ambiente e à intensidade do ruído. O sono, por si só, não fornece valores para A, B ou L. A aplicação exigiria um sinal observável e dados próprios.

BASE4 encontrou modelos para a função de custo e para sua negação sob T01–T13. Essa função depende das hipóteses de sinal e filtro adicionadas, e continua em aberto na base ontológica isolada. Nenhuma lei física nova ou eficácia terapêutica foi demonstrada. A eficácia formal medida foi a capacidade do Cosmos de decidir as cinco consultas descritas.

Saída real da execução, encerrada com código zero:

    DIN1 SEGUE [D1, D2, D3, consulta]
    DIN2 SEGUE [D1, D2, D3, D4, consulta]
    DIN3 CONTRADIZ [D1, D2, consulta]
    DIN4 SEGUE [D1, D2, consulta]
    BASE4 EM ABERTO

Foram usados analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts. O limite foi 10 segundos por tentativa. O ensaio verificou consistência antes de testar alvo e negação, e verificou que todas as fórmulas foram aceitas. Os núcleos são aqueles retornados pelo solucionador. tubo abaixo corresponde às fórmulas T01–T13 do arquivo autor/projeto-tubo/base-tubo-v1.json. As constantes novas foram declaradas reais.

~~~javascript
const casos = [
{ id: 'DIN1', premissas: { D1: 'u > 0 ∧ raiz > 0 ∧ raiz < 1 ∧ beta = raiz × raiz', D2: 'custo × u × (1 + u) = u × u + beta × (1 + u)', D3: 'minimo = 2 × raiz − raiz × raiz' }, alvo: 'custo ≥ minimo', esperado: 'SEGUE' },
{ id: 'DIN2', premissas: { D1: 'u > 0 ∧ raiz > 0 ∧ raiz < 1 ∧ beta = raiz × raiz', D2: 'custo × u × (1 + u) = u × u + beta × (1 + u)', D3: 'minimo = 2 × raiz − raiz × raiz', D4: 'u × (1 − raiz) = raiz' }, alvo: 'custo = minimo', esperado: 'SEGUE' },
{ id: 'DIN3', premissas: { D1: 'u > 0 ∧ beta ≥ 1', D2: 'custo × u × (1 + u) = u × u + beta × (1 + u)' }, alvo: 'custo ≤ 1', esperado: 'CONTRADIZ' },
{ id: 'DIN4', premissas: { D1: '3 × u = 2 ∧ 16 × beta = 1', D2: 'custo × u × (1 + u) = u × u + beta × (1 + u)' }, alvo: '16 × custo > 7', esperado: 'SEGUE' },
{ id: 'BASE4', premissas: tubo, alvo: 'custo × u × (1 + u) = u × u + beta × (1 + u)', esperado: 'EM ABERTO' }
]

~~~

O comando usado foi node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-04-temporaria.mjs. O temporário foi removido depois de registrar seu conteúdo relevante e o resultado. SHA-256 do arquivo executado: 3500ebb5e77574936c4177d4415c2b7327c50fd2d55cee6fc7785663290a901b.

Uma avaliação experimental do modelo precisaria estimar A e L da dinâmica do estímulo e B do ruído de leitura em dados de calibração. Em dados separados, deve comparar a curva de erro contra τ com a previsão e localizar seu mínimo. A regra de eficácia seria redução de erro fora da amostra, com incerteza estatística e comparação com a estimativa constante da média.

O próximo ponto é permitir um ganho g ajustável em Y e verificar se o melhor par (g,τ) se relaciona ao filtro de Kalman–Bucy para esse processo. Isso resolve diretamente a limitação encontrada em β ≥ 1 e pode mostrar quais aspectos do modelo de memória são identificáveis por dados.
