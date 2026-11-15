# 15/11/2026 — Todo 14 — A janela entre resfriar e gastar a reserva

A parábola da torre em [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV) motiva calcular também o custo da espera. Hipótese testável do projeto: pode existir uma janela de espera que recupere margem térmica para A sem consumir a reserva necessária a C. A leitura da parábola é interpretativa.

## Modelo e fontes

Em Todo 13, B consome 4 J no pico, devolve 3,5 J e aquece o dispositivo em 1 K acima de um banho fixo. A e C exigem 3 J cada. A devolve tudo se começa abaixo de 1 K de excesso e perde 3 J caso contrário; C devolve tudo. A ordem é B→espera→A→C. Estado térmico concentrado, capacidade Cth=0,5 J/K, condutância G>0 em W/K, ambiente uniforme, ausência de outras perdas e de limites de potência ou curso durante os ciclos. O custo de espera D=Pτ, em J, usa P>0 em W e τ≥0 em s. Supõe-se que a dissipação do circuito de espera vai para fora do corpo modelado e não altera a temperatura do banho.

A troca de calor linear segue o modelo clássico de [Newton, 1701, transcrição dos manuscritos e experimento](https://newtonproject.ox.ac.uk/view/texts/normalized/NATP00333): Cth·dθ/dt=−Gθ; k=G/Cth em s⁻¹; θ(τ)=(1 K)exp(−kτ). Em biologia, [Hodgkin e Katz, 1949](https://pmc.ncbi.nlm.nih.gov/articles/PMC1392577/) mediram mudanças na atividade elétrica do axônio de lula com temperatura. Isso fundamenta investigar a resposta dinâmica de dispositivos e sistemas biológicos à temperatura; não transfere o limiar de 1 K, os coeficientes ou o modelo de recuperação deste atuador ao axônio.

## Previsão e contraexemplos

Picos de B, A e C em J: 4; 3,5+D; 3,5+D+L_A. Como L_A≥0, exigir pico≤4 J equivale a exigir L_A=0 e D≤0,5 J. Para margem operacional de 0,2 K, impõe-se θ≤0,8 K; logo **ln(5/4)/k ≤ τ ≤ (0,5 J)/P**. A janela existe se e somente se **k ≥ P ln(5/4)/(0,5 J)**. Sem margem adicional, qualquer espera positiva com τ≤(0,5 J)/P atende ao degrau ideal, pois θ parte exatamente de 1 K. Portanto, perder a margem operacional não equivale a quebrar o degrau ideal.

| P (W) | k (s⁻¹) | Espera mínima para margem (s) | Espera máxima para 4 J (s) | θ na espera máxima (K) | Pico requerido na espera mínima (J) |
|---:|---:|---:|---:|---:|---:|
| 0,20 | 0,10 | 2,2314355 | 2,5 | 0,7788008 | 4 |
| 0,20 | 0,08 | 2,7892944 | 2,5 | 0,8187308 | 4,0578589 |

Em P=0,20 W, k crítico=0,08925742 s⁻¹. No primeiro exemplo, a espera mínima gasta 0,4462871 J e deixa 0,0537129 J de folga para os ciclos posteriores a B; o pico da sequência continua 4 J por causa de B. No segundo, a margem de 0,2 K e o orçamento são incompatíveis, embora o limiar puro ainda possa ser atendido. Resfriar e gastar mais de 0,5 J também falha, mesmo com A totalmente recuperável. Os números foram avaliados em Python com math.log e math.exp; são avaliação de fórmulas, sem simulação de trajetória e sem coleta.

## Execução e cobertura

Comando executado cinco vezes, com JSON UTF-8 via stdin, por subprocess.run em Python:

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Para reproduzir, em cada linha abaixo use visao, hipoteses adicionais e tese como campos do JSON. Use regras=[], ponha as três premissas comuns no início de hipoteses e declare cada identificador como {simbolo: nome, tipo: "constante", aridade: 0, numerico: true}. Identificadores comuns: theta, gasto, perda, picoa, picoc. Só no último caso acrescente tm, tamb, tmnova, tanova, shift. Grandezas são representadas pelos seus valores em J ou K, conforme indicado no modelo. Os resultados listam satisfatibilidade de premissas, premissas com tese e premissas com negação da tese, nessa ordem.

Premissas comuns, copiadas do ensaio:
- (theta < 1 ∧ perda = 0) ∨ (theta ≥ 1 ∧ perda = 3)
- 2 × picoa = 7 + 2 × gasto
- picoc = picoa + perda

```json
["MARGEM_E_RESERVA",["theta ≥ 0","5 × theta ≤ 4","gasto ≥ 0","2 × gasto ≤ 1"],"perda = 0 ∧ picoa ≤ 4 ∧ picoc ≤ 4","SEGUE",["sat","sat","unsat"],0]
["ESPERA_NAO_BASTA",["gasto > 0","theta ≥ 1"],"picoc ≤ 4","CONTRADIZ",["sat","unsat","sat"],0]
["FRIO_NAO_BASTA",["theta ≥ 0","5 × theta ≤ 4","2 × gasto > 1"],"picoc ≤ 4","CONTRADIZ",["sat","unsat","sat"],0]
["LIMITE",["5 × theta = 4","2 × gasto = 1"],"perda = 0 ∧ picoa = 4 ∧ picoc = 4","SEGUE",["sat","sat","unsat"],0]
["MESMA_ORIGEM_TERMICA",["5 × theta ≤ 4","theta ≥ 0","gasto ≥ 0","2 × gasto ≤ 1","tm = tamb + theta","tmnova = tm + shift","tanova = tamb + shift"],"5 × (tmnova − tanova) ≤ 4 ∧ picoc ≤ 4","SEGUE",["sat","sat","unsat"],0]
```

O Z3 verificou o balanço algébrico; a solução exponencial, a existência da janela e o cálculo em ponto flutuante são etapas distintas. A mudança comum de origem dos dois termômetros preserva θ e a decisão porque ambas as leituras mudam pelo mesmo deslocamento. Isso não representa aquecer o instrumento e o banho: parâmetros físicos podem depender da temperatura absoluta. Um deslocamento galileano comum do dispositivo e do banho preserva as velocidades relativas e, sob as hipóteses do modelo, os balanços internos; não se presume invariância ao mover apenas o dispositivo em relação ao banho.

Cobertura incremental: Lucas 14 → custo acumulado com tempo de espera → troca térmica e consumo auxiliar → janela mensurável → resfriamento insuficiente ou perda de reserva. Continuidade com Todo 13 e T09 como tema de perda, e T01–T03/T11 como contexto da informação parcial; as regras T01–T13 foram revisadas, mas não são premissas das consultas físicas. Próximo ponto: incluir calor dissipado pelo próprio circuito no dispositivo. Separar falha porque a janela é curta de falha porque o equilíbrio térmico não alcança a margem. Medir G e P e testar o degrau de recuperação seriam etapas experimentais futuras.

SHA-256 de Todo 13 conferido nos bytes: c7fc72661bf6e8638bff1e6f910e06e6ffeffc57faec9094cc32fcd824007428. BOOK preservado: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1. Commit remoto de partida: 459a673797bdf2162bb666338c0801a63767809d.
