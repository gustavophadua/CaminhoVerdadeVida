# Destino 1 — momento e enrolamento: ensaio condicional

Pasta e título datados 13/11/2026 conforme pedido; execução na sessão de 12/11/2026. Nenhuma medição física.

Hipótese aditiva escolhida: ε(n,w)=|n|ℏc/R+|w|ℏcR/α′. É o modelo solicitado, não uma derivação do espectro de cordas. R>0 em pm, α′>0 em pm², n,w inteiros, c=299792458 m/s, ℏc=197327/1000 keV·pm, E=1022 keV. Estes valores arredondados de energia são racionais exatos no ensaio. Para SI, R_m=10^-12 R_pm e α′_m²=10^-24 α′_pm². p_n=nℏ/R tem unidade kg·m/s. A energia de cada modo com momento tridimensional p é sqrt((pc)²+ε²), em unidades compatíveis. Os módulos são reais não negativos no teorema geral (que assim abrange inteiros); os testemunhos numéricos são inteiros fixados.

O par (+n,+w),(-n,-w) conserva as duas cargas por construção. E1+E2+2ε+K=E, K≥0, implica E1+E2≤E−2ε. No limite K=0, fótons antiparalelos e simétricos: Eγ=511−ε keV. Nenhuma amplitude ou taxa de produção foi estabelecida: “PICO” nomeia somente essa borda cinemática.

DOIS_RW prova a desigualdade; PICO_RW prova os valores mistos; DEGENERESCENCIA prova igualdade das torres unitárias em R²=α′; DISTINCAO verifica um testemunho explícito R=1, α′=1 onde o modo misto difere dos dois modos unitários. Premissas satisfatíveis estabelecem existência desse testemunho, não exclusividade em relação a toda torre de momento. RECUPERA_MOMENTO verifica o caso anterior.

## Saída efetivamente executada

Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/destino-1-corda-winding-temporario.mjs`
Código de saída: 0.

```text
DOIS_RW: premissas=sat; consulta=sat; negacao=unsat
DOIS_RW SEGUE [B, consulta]
PICO_RW: premissas=sat; consulta=sat; negacao=unsat
PICO_RW SEGUE [A, B, consulta]
DEGENERESCENCIA: premissas=sat; consulta=sat; negacao=unsat
DEGENERESCENCIA SEGUE [A, B, consulta]
DISTINCAO: premissas=sat; consulta=sat; negacao=unsat
DISTINCAO SEGUE [A, B, consulta]
RECUPERA_MOMENTO: premissas=sat; consulta=sat; negacao=unsat
RECUPERA_MOMENTO SEGUE [A, B, consulta]
EXCLUSIVIDADE_CONTRAEXEMPLO: premissas=sat; consulta=unsat; negacao=sat
EXCLUSIVIDADE_CONTRAEXEMPLO CONTRADIZ [A, B, consulta]
n,w | epsilon keV | soma maxima keV | Egamma simetrico keV
1,0 | 197.327 | 627.346 | 313.673
0,1 | 197.327 | 627.346 | 313.673
1,1 | 394.654 | 232.692 | 116.346

```

## Nota de três linhas sobre o observável
O modelo aditivo tem escalas R e α′; as energias unitárias variam como 1/R e R/α′.
O estado rotulado (1,1) não existe sem enrolamento, mas sua energia coincide aqui com (2,0): 394,654 keV, mesma borda visível de 116,346 keV por fóton.
Assim, as provas não estabelecem uma assinatura exclusiva de corda; é necessário observar algo que também exclua a torre de momento e outros canais concorrentes.

## Alcance e próximo teste

EXCLUSIVIDADE_CONTRAEXEMPLO refuta ε(1,1)≠ε(2,0) neste testemunho. Mais geralmente, em R²=α′, ε(n,w)=(|n|+|w|)ℏc/R, de modo que toda a torre aditiva coincide energeticamente com níveis da torre de momento. Dois parâmetros escritos na fórmula não são dois parâmetros experimentalmente identificados. Próximo teste: razões de energias fora do ponto degenerado e comparação com todos os níveis cinemáticos permitidos, incluindo multiplicidades e canais; só depois, dinâmica de produção e identificação de parâmetros. Não há eficácia experimental medida.

Fonte das hipóteses e dos números: especificação do usuário nesta tarefa. Referência primária previamente usada no projeto: https://cds.cern.ch/record/298744/files/9603074.pdf ; acesso nesta execução bloqueado por desafio de navegador, portanto não houve nova verificação do conteúdo. Nenhuma conclusão de espectro completo de cordas é atribuída a essa fonte neste ensaio.
