# Conexão 03 — correlação temporal e memória sensorial

Rodada de 11 de novembro de 2026, iniciada às 13h04, horário de São Paulo.

A investigação continua o relatório 02 e quantifica quando observar por mais tempo fornece novas amostras. Para um sinal estacionário X(t) com variância σ² e autocovariância C(u), a média temporal de duração T tem

    Var(X̄_T) = (2/T²) ∫₀ᵀ (T−u) C(u) du.

A identidade resulta da integral dupla da covariância. Assumindo C(u) = σ² exp(−u/τ), obtém-se por integração

    v = Var(X̄_T)/σ² = 2[x−1+exp(−x)]/x², com x = T/τ.
    N_efetivo = 1/v.

T e τ são medidos em segundos. v, x e N_efetivo são adimensionais. N_efetivo é o número equivalente de observações independentes de mesma variância. A definição compara variâncias e pode assumir valores fracionários.

Para um receptor de dois estados em banho bem misturado e concentração constante, taxas de ligação k₊c e desligamento k₋ dão τ = 1/(k₊c+k₋), p = k₊c/(k₊c+k₋) e σ² = p(1−p). Exige-se σ² > 0. A difusão e a religação podem alterar a forma da autocovariância. Berezhkovskii e Szabo relacionam a precisão da estimativa de concentração à integral dessa função e analisam os efeitos da difusão. [Pesquisa primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC3739832/)

A expressão fechada foi comparada com quadratura de Simpson composta, com 20.000 subintervalos, nos quatro casos abaixo.

| T/τ | v | N_efetivo | Excesso relativo de 2τ/T sobre v |
|---:|---:|---:|---:|
| 0,1 | 0,967483607 | 1,033609 | 1967,2185% |
| 1 | 0,735758882 | 1,359141 | 171,8282% |
| 10 | 0,180000908 | 5,555528 | 11,1106% |
| 100 | 0,019800000 | 50,505051 | 1,0101% |

A maior diferença absoluta entre quadratura e expressão foi aproximadamente 7,14 × 10⁻¹⁴. O critério de conferência era 10⁻¹⁰. Essa checagem cobre os quatro pontos. A expressão geral resulta da integração analítica.

Quando T cresce muito em relação a τ, v ≈ 2τ/T e N_efetivo ≈ T/(2τ). COR1 e COR2 verificaram no Cosmos uma cota para o uso dessa aproximação. Com a = 2/x, x > 1 e z em [0,1), impondo v x² = 2(x−1+z), resulta

    0 < v < a
    (a−v)/v ≤ 1/(x−1).

A escolha física z = exp(−x) pertence a esse intervalo. O solucionador verificou uma consequência algébrica válida no intervalo mais amplo. A exponencial e sua integral foram tratadas na derivação externa.

A cota fornece um critério suficiente e mensurável. T/τ ≥ 101 garante excesso relativo de no máximo 1% para a aproximação da variância. T/τ ≥ 21 garante no máximo 5%. Esse critério torna preciso o uso do regime de observação longa. COR3 rejeitou N_efetivo = T/τ quando se assume N_efetivo = T/(2τ) e tempos positivos, conferindo o fator dois dessa aproximação.

A ligação energética depende do mecanismo que grava a observação. Sob a hipótese adicional de custo fixo q > 0 por amostra armazenada, orçamento E ≥ 0 e oferta sensorial L, temos q n ≤ E e n ≤ L, portanto n ≤ min(L,E/q). ENE4 verificou diretamente a impossibilidade de exceder esse orçamento. O valor q foi assumido como parâmetro. A consulta não estima seu valor nem demonstra que ele seja constante em células.

Govern e ten Wolde analisam redes push–pull nas quais receptores/tempo, moléculas de leitura e combustível impõem restrições distintas. A comparação com dados de E. coli sustenta investigar conjuntamente esses recursos. O modelo de custo fixo acima é uma simplificação proposta para ensaios do Tubo. [Pesquisa primária](https://ir.amolf.nl/pub/6320/15816OA.pdf)

No Tubo, uma colisão registra um evento, e sua contribuição como observação independente depende das correlações. T02 e T03 motivam investigar esse limite. BASE3 encontrou modelos para a relação assintótica e sua negação sob T01–T13. A base precisa de premissas adicionais para quantificar precisão.

Uma aplicação ao sono humano exigiria escolher um sinal X(t), medir a autocovariância e justificar estacionariedade durante a janela. Não houve medida nova de eficácia biológica nesta rodada. As consequências matemáticas são condicionais aos modelos declarados. A relação entre correlação e precisão é conhecida na literatura, e sua organização no vocabulário do Tubo é a contribuição desta rodada.

A saída final da execução com código zero foi

    COR1 SEGUE [A, B, C, consulta]
    COR2 SEGUE [A, B, C, consulta]
    COR3 CONTRADIZ [A, B, consulta]
    ENE4 CONTRADIZ [B, consulta]
    BASE3 EM ABERTO

A primeira execução detectou um conflito de nomes. A constante numérica x colidiu com a variável quantificada x da base. O ensaio foi interrompido porque o analisador descartou fórmulas. Renomear a constante para duracaoRel permitiu analisar integralmente e executar as cinco consultas. A saída acima pertence à execução corrigida.

Foram reutilizados analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts. Cada tentativa teve limite de 10 segundos, com consistência das premissas verificada antes do alvo e de sua negação. Os núcleos registrados são os devolvidos pelo solucionador.

As fórmulas exatas seguem. As constantes novas são reais e tubo corresponde ao arquivo autor/projeto-tubo/base-tubo-v1.json.

~~~javascript
const casos = [
{ id: 'COR1', premissas: { A: 'duracaoRel > 1 ∧ z ≥ 0 ∧ z < 1', B: 'v × duracaoRel × duracaoRel = 2 × (duracaoRel − 1 + z)', C: 'aprox × duracaoRel = 2' }, alvo: 'v > 0 ∧ v < aprox', esperado: 'SEGUE' },
{ id: 'COR2', premissas: { A: 'duracaoRel > 1 ∧ z ≥ 0 ∧ z < 1', B: 'v × duracaoRel × duracaoRel = 2 × (duracaoRel − 1 + z)', C: 'aprox × duracaoRel = 2' }, alvo: '(aprox − v) × (duracaoRel − 1) ≤ v', esperado: 'SEGUE' },
{ id: 'COR3', premissas: { A: 'tempo > 0 ∧ tau > 0', B: '2 × tau × efetivas = tempo' }, alvo: 'efetivas × tau = tempo', esperado: 'CONTRADIZ' },
{ id: 'ENE4', premissas: { A: 'qAmostra > 0 ∧ orcamento ≥ 0 ∧ capturadas ≥ 0', B: 'qAmostra × capturadas ≤ orcamento', C: 'capturadas ≤ limiteSensor' }, alvo: 'qAmostra × capturadas > orcamento', esperado: 'CONTRADIZ' },
{ id: 'BASE3', premissas: tubo, alvo: '2 × tau × efetivas = tempo', esperado: 'EM ABERTO' }
]

~~~

O arquivo temporário foi executado com node --preserve-symlinks --preserve-symlinks-main e removido após documentar as fórmulas. Seu SHA-256 é bba2512222d908888c061bbfb46adbce3170fc1c384d145c032b10d831866305.

O próximo ponto é o compromisso entre reduzir ruído e acompanhar um ambiente variável. Uma memória longa pode atrasar a estimativa de uma concentração que muda. O trabalho deverá derivar um tempo ótimo sob uma dinâmica de entrada explícita e comparar com a pesquisa primária https://elifesciences.org/articles/62574.
