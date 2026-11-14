# 12/11/2026 — Destino 1 com dimensão compacta e canal invisível

## Modelo proposto

Adote uma dimensão espacial circular de raio R>0 em metros, com simetria de translação nessa coordenada. Para n inteiro, pₙ=nℏ/R, em kg·m/s. Para uma excitação sem massa na descrição de dimensão superior e com momento tridimensional nulo, o custo de repouso observado em quatro dimensões é εₙ=|n|ℏc/R, em joules. Para momento tridimensional de módulo p, a energia é √[(pc)²+εₙ²]. Trata-se de uma torre de Kaluza–Klein. O mesmo mecanismo existe em teorias de campos pontuais em uma dimensão compacta. Cordas fechadas também podem ter números de enrolamento, cujo custo em repouso é |w|ℏcR/α′ para uma corda ideal, com α′ em m². O espectro e os acoplamentos completos dependem da compactificação. [Discussão sobre momentos e enrolamento, CERN-TH/96-65](https://cds.cern.ch/record/298744/files/9603074.pdf)

Considere um par elétron–pósitron lento no centro de momento, com momento compacto total inicial zero, e energia total arredondada E=1022 keV. O canal proposto é dois fótons visíveis de modo zero e duas excitações invisíveis com números +n e −n. Essa escolha conserva o momento compacto. As equações de conservação por si só não fornecem uma amplitude de produção, taxa de eventos ou razão de ramificação.

## Espectro e balanço

Se os dois estados invisíveis têm momento tridimensional nulo, consomem E_extra=2εₙ. Os fótons ficam antiparalelos, com energias iguais Eγ=E/2−εₙ. Essa é uma configuração limite. No canal genérico, os invisíveis levam momento e energia cinética, de modo que a previsão é um **limite para a soma visível**, E₁+E₂≤E−2εₙ. Os fótons podem ter energias diferentes. Só uma dinâmica adicional que concentre eventos na configuração limite justificaria um pico em cada energia Eγ. Se o canal comum estiver presente, sua linha de 511 keV permanece.

Usei R=1 pm=10⁻¹² m como hipótese ilustrativa, n=1 e ℏc≈197,327 keV·pm. O custo de cada modo é 197,327 keV. O par invisível consome ao menos 394,654 keV e a soma visível fica no máximo em 627,346 keV. A configuração limite fornece 313,673 keV por fóton. Para dois fótons de energia positiva, exige-se R>2|n|ℏc/E, cerca de 0,38616 pm para n=1. Se uma borda na soma visível S fosse identificada com o limite deste canal e n fosse conhecido, R=2|n|ℏc/(E−S). Nenhum R foi medido no Tubo.

Energia visível faltante precisa ser medida em eventos com escala de energia calibrada e controle de fótons perdidos, espalhamento e outros canais. Uma coincidência incompleta do estudo anterior não conta como detecção de energia transferida para uma dimensão compacta.

## Tempo de voo

Um modo massivo detectável de energia E_m>εₙ teria velocidade de grupo vₙ=c√[1−(εₙ/E_m)²]. O desvio relativo é Δc/c=vₙ/c−1. Com R=1 pm, n=1 e E_m=300 keV, vₙ/c≈0,75323 e Δc/c≈−0,24677. Em 20 cm, o atraso em relação a um fóton é cerca de 218,6 ps.

Se dois sinais detectáveis têm essa mesma velocidade e mantêm o modelo de erro gaussiano, Y=(2x−L)/vₙ+ε e a probabilidade de acerto passa a Φ(d/(vₙσₜ)). Para σₜ=100 ps, a separação para 95% cai de 4,93 cm a cerca de 3,71 cm nesse exemplo. É uma previsão para **outro canal de observação**, que exigiria detectar os modos e conhecer suas energias. No canal invisível proposto, os dois fótons visíveis continuam no modo zero e viajam a c no vácuo. A fórmula Φ(d/(cσₜ)) continua válida sob as hipóteses anteriores de geometria e ruído. A mudança esperada no canal invisível está no balanço de energia e momento.

## Resultado efetivamente executado

O arquivo destino-1-corda-temporario.mjs contém as fórmulas exatas. O analisador do Cosmos aceitou todas. O Z3 verificou premissas, consulta e negação, com limite de 10 s por verificação. No exemplo numérico, as energias são expressas em keV e R em pm. ℏc é representado pela aproximação racional 197327/1000 em keV·pm. O modo é um real no solucionador, fixado em 1 no exemplo, e a condição n inteiro vem da hipótese física de periodicidade. SEM_CANAL é o nome da consulta que rejeita manter a linha de 511 keV no canal com custo invisível positivo e divisão simétrica.

```text
DOIS_R SEGUE [A, B, consulta]
PICO SEGUE [A, B, consulta]
SEM_CANAL CONTRADIZ [A, B, consulta]
TOF_MODO SEGUE [A, B, consulta]
```

Execução com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-corda-temporario.mjs.

O resultado SEGUE prova as consequências das premissas. Para atribuir uma assinatura a cordas, o próximo passo é especificar uma interação com acoplamentos e prever uma taxa e uma distribuição observáveis, incluindo algo que diferencie esse espectro de uma torre de campos pontuais. Nenhum pico, atraso ou canal invisível foi medido nesta rodada.

