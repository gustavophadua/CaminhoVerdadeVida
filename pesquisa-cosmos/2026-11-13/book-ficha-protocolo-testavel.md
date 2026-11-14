# BOOK — ficha de protocolo testável, 13/11/2026

Proposta de bancada, não experimento realizado. Este anexo preserva os bytes do BOOK e seu SHA. Escolha: testar o submodelo de contagem/calibração com LED; não testar cordas nem aniquilação com esse arranjo.

1. SHA e arquivo
Arquivo: destino-1-book-final.mjs.
SHA-256 conferido: 27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1.
Comando a partir da raiz AI quantica: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/destino-1-book-final.mjs.

2. Parâmetro c
Nome: taxa média de pulsos ópticos incidentes na entrada do sensor, verificada por referência independente.
Unidade: s^-1; faixa planejada 20 a 24 s^-1, não observada. Não é concentração molecular: nesta aplicação κ é adimensional. Símbolos do submodelo são reinterpretados com unidades explícitas; o BOOK original permanece com suas unidades originais.

3. Observável λ
Sensor proposto: PMT 1 com discriminador e contador; existência/modelo do equipamento ainda não confirmados. Contagens N em T=90 s por condição. E[N]=T(κc+b), com κ probabilidade efetiva de registrar um pulso (adimensional, 0≤κ≤1) e b taxa de registros espúrios em s^-1. Assim κc, b e λ têm a mesma unidade. Escolhas de projeto: κ=0,5 e b=5 s^-1, a verificar em piloto independente. Disparos aleatórios Poisson, pulsos de amplitude fixa, um registro máximo por pulso, fundo Poisson independente, sem dead time relevante, afterpulsing ou saturação. Pulsos periódicos não justificam automaticamente o teste Poisson.

4. Intervenção Δ
LED e gerador com tempos aleatórios: adicionar fluxo independente de pulsos de taxa Δ=4 s^-1 ao fluxo basal de 20 s^-1. Mesma geometria, amplitude e limiar. Monitor óptico independente confirma que pulsos elétricos produzem pulsos ópticos. Com κ=0,5, incremento esperado de registro é 2 s^-1. Calibração e incerteza de Δ ainda pendentes. Não usar Cs-137 ou Na-22 para esse teste.
Correção: ε(1,1)=ε(2,0) depende da hipótese aditiva DE ENERGIAS e R²=α′; não depende desta intervenção Δ do sensor. Os dois modelos não devem ser confundidos.

5. Hipótese concorrente e números
H1 operacional: LED produz o incremento previsto, mantendo κ=0,5 e b=5 s^-1: λ0=15, λ+=17 s^-1, E[N0]=1350, E[N+]=1530 em 90 s.
H0 do teste unilateral: λ+≤λ0; na fronteira λ+=λ0=15 s^-1, médias 1350 e 1350. Hipótese física de nenhum incremento registrado corresponde à fronteira. O teste condicional usa N+|S~Binomial(S,1/2) sob igualdade, rejeitando cauda superior ≤0,05.
Isto distingue aumento de taxa total; não identifica sua causa sozinho. Mudança de fundo 5→7 s^-1 ou κ 0,5→0,6 com c=20 s^-1 também produz 17 s^-1 sem aumento de c. Medir branco com LED bloqueado, monitorar amplitude/ganho e verificar Δ com referência são condições de atribuição causal. Se estes controles falharem, não atribuir rejeição a H1. A potência calculada não inclui esses controles. A hipótese pontual λ+=17 deve também ser avaliada por intervalo/ajuste; rejeitar igualdade não valida exatamente 17.
UM/SEM_CANAL não são H1 deste experimento: este protocolo não os testa.

6. T95
BOOK final não calcula T95. Relatório 17 usa P(N+>N0); relatório 18 usa potência com teste unilateral α=0,05. Para λ0=15 e λ+=17 s^-1, o relatório 18 simulou 200.000 pares: T=90 s por janela, 180 s total, potência 0,955415 (SE Monte Carlo 0,000462); sob igualdade de taxas, rejeição 0,048665. Portanto 90 s é duração candidata que atingiu 95% na grade simulada, não mínimo T95 certificado. Não é tempo de mistura, aquecimento ou estabilização. Tempo total real inclui controles e piloto; não quantificado.

7. Contraexemplo automático
O Tubo pode usar estabilização automática; não há impedimento demonstrado nem necessidade universal de operação manual.
Os trabalhos de 1963/1964 contradizem o manual obrigatório: a exigência é referência e validação, que podem ser automatizadas.
Fontes: https://www.sciencedirect.com/science/article/abs/pii/0029554X63902015 e https://www.sciencedirect.com/science/article/abs/pii/0029554X6490179X .

Status: protocolo falsificável proposto para captura/calibração. Ainda depende de equipamento, calibração independente e verificação das hipóteses de contagem. Nenhuma validação física, assinatura de corda ou necessidade teológica decorre desta ficha.
