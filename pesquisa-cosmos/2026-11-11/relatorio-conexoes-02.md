# Conexão 02 — observação, encontros moleculares e memória correlacionada

Rodada de 11 de novembro de 2026, iniciada às 12h02 no horário de São Paulo.

A conexão investigada liga a visão limitada do fragmento à precisão de um sensor biológico. Uma célula observa concentração mediante encontros moleculares sujeitos a flutuações. A matemática da contagem permite quantificar uma limitação local. A relação com T02 e T03 é uma interpretação proposta para um domínio de observação. A quantidade “valor” do Tubo ainda precisa de definição operacional.

Berg e Purcell estudaram como difusão, tamanho da célula, concentração e tempo limitam a precisão da quimiorrecepção. A escala aproximada do erro relativo é proporcional a (T c a D)^(-1/2), com fatores dependentes da geometria e da estratégia sensorial. Esta rodada considera um sensor ideal que conta eventos independentes, permitindo uma dedução exata dentro desse modelo. [Berg e Purcell, artigo original](https://pmc.ncbi.nlm.nih.gov/articles/PMC1473391/)

Adote N ~ Poisson(λt), onde N é o número de eventos, λ a taxa em s⁻¹ e t o tempo de integração em segundos. Se λ = κc, c é a concentração em m⁻³ e κ tem unidade m³/s. Para o estimador ĉ = N/(κt), E[ĉ] = c e Var(ĉ)/c² = 1/(κct). Logo, definindo v como a variância relativa e ε como seu desvio padrão, v = 1/(λt) e ε = 1/√(λt).

A dedução usa média e variância da distribuição de Poisson iguais a λt. O Cosmos recebeu a forma polinomial v λ t = 1, com λ e t positivos. OBS1 demonstrou v > 0. OBS2 demonstrou que quadruplicar o tempo divide a variância relativa por quatro. A redução do desvio padrão à metade segue da definição ε = √v. O resultado fornece uma previsão mensurável para contagens independentes e concentração estacionária.

Um exemplo calculado usa λ = 100 s⁻¹. Em 1 s, ε = 10%. Em 4 s, ε = 5%. Esses números são previsões do modelo ideal, sem coleta experimental nesta rodada. Reencontros com a mesma molécula, adaptação, concentração variável e dinâmica dos receptores podem alterar a independência e a taxa efetiva.

A segunda ligação é entre repetição e conteúdo novo de observação. Se X₁,…,Xₙ têm variância σ² e covariância comum ρσ², então Var(média)/σ² = [1 + (n−1)ρ]/n = ρ + (1−ρ)/n. Aqui n é inteiro positivo, σ² > 0 e 0 ≤ ρ ≤ 1. O Cosmos testou a consequência num domínio real mais amplo n ≥ 1, que também cobre os inteiros.

OBS3 demonstrou que a variância normalizada da média é pelo menos ρ. OBS4 rejeitou uma redução abaixo de 1 quando ρ = 1. Portanto, repetir observações perfeitamente correlacionadas não reduz essa variância. Na construção equicorrelacionada com ρ fixo positivo, o limite para n crescente é ρ. O resultado distingue matematicamente um novo encontro informativo de repetir o mesmo conteúdo. Para processos temporais gerais, é preciso medir as covariâncias entre pares, que podem depender do intervalo.

A ponte com o sono é uma hipótese de pesquisa. Reativar um traço pode transformar sua representação, consolidá-lo ou combiná-lo com outros. A melhora de memória e a aquisição de evidência independente sobre o ambiente são variáveis distintas. A equação de covariância quantifica a precisão de uma média de medições sob as hipóteses acima. Sua aplicação a relatos de sonhos ou lembranças depende de uma escolha de variável, variância e protocolo de medida.

Govern e ten Wolde analisaram limites de sensores celulares que dependem de receptores e tempo, moléculas de leitura e consumo de energia. Isso aponta a continuação concreta da ligação com o gasto G do Tubo. É preciso medir o número efetivo de amostras independentes e o custo físico de registrá-las. A análise deles é teórica e considera arquiteturas bioquímicas específicas. [Govern e ten Wolde, pesquisa original](https://pmc.ncbi.nlm.nih.gov/articles/PMC4267345/)

Os cinco ensaios efetivamente executados deram:

    OBS1 SEGUE [P1, P2, consulta]
    OBS2 SEGUE [P2, P3, consulta]
    OBS3 SEGUE [C1, C2, consulta]
    OBS4 CONTRADIZ [C1, C2, consulta]
    OBS5 EM ABERTO

As fórmulas exatas enviadas ao Cosmos foram:

    OBS1
    P1: lambda > 0 ∧ tempo > 0
    P2: v × lambda × tempo = 1
    alvo: v > 0

    OBS2
    P1 e P2 acima
    P3: vQuatro × lambda × 4 × tempo = 1
    alvo: 4 × vQuatro = v

    OBS3
    C1: amostras ≥ 1 ∧ corr ≥ 0 ∧ corr ≤ 1
    C2: amostras × varMedia = 1 + (amostras − 1) × corr
    alvo: varMedia ≥ corr

    OBS4
    C1: amostras ≥ 1 ∧ corr = 1
    C2 acima
    alvo: varMedia < 1

    OBS5
    premissas: T01–T13 de autor/projeto-tubo/base-tubo-v1.json
    alvo: v × lambda × tempo = 1

OBS5 encontrou modelos para a equação e sua negação sob T01–T13. Assim, o modelo quantitativo de contagem exige premissas físicas adicionais. As três consequências verificadas têm validade condicional. A derivação probabilística e as hipóteses de Poisson foram fornecidas ao ensaio, e o solucionador conferiu suas consequências algébricas.

A execução usou analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts, com 10 segundos por tentativa. A consistência das premissas foi verificada antes de consultar cada afirmação e sua negação. Houve checagem explícita de que nenhuma fórmula foi descartada pelo analisador. O comando usado foi node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-02-temporaria.mjs. O arquivo temporário foi removido após o registro das fórmulas e dos resultados.

A eficácia demonstrada nesta rodada é a capacidade do Cosmos de verificar as cinco questões formais apresentadas. Não houve mensuração nova em organismos. Para testar a previsão sensorial, um experimento precisaria comparar variâncias de estimativas em tempos t e 4t, sob concentração controlada, estimando também as correlações. A previsão de razão 1/4 é falsificável para esse modelo de contagem.

O próximo ponto de pesquisa é o custo de manter registros independentes quando o receptor tem tempo de correlação finito. O trabalho deve derivar o número efetivo de amostras a partir da função de autocovariância e então verificar qual relação com energia é sustentada por uma arquitetura bioquímica especificada.
