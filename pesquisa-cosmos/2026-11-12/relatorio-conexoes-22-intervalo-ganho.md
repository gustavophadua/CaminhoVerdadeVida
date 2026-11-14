# 12/11/2026 — Relatório 22: identificação parcial com ganho do branco incerto

Data local do disparo: 12/11/2026 22:22 America/Sao_Paulo. Continuação do relatório 21; consultadas regras T01–T13. Não altera BOOK nem atribui às regras qualitativas uma lei de estatística. A conexão concreta é entre captura física, sensores biológicos não equivalentes e identificação por intervalos.

## Fonte primária

Rhee, Cheong e Levchenko, Noise decomposition of intracellular biochemical signaling networks using nonequivalent reporters, PNAS 111, 17330–17335 (2014), DOI 10.1073/pnas.1411932111: https://pubmed.ncbi.nlm.nih.gov/25404303/ e https://pmc.ncbi.nlm.nih.gov/articles/PMC4260601/ . Os autores generalizam decomposição de ruído para repórteres não equivalentes e aplicam a vias de sinalização. A pesquisa motiva explicitar a relação entre respostas dos sensores; não demonstra o intervalo específico derivado aqui.

## Modelo e domínio

Em cada condição i=0,1, taxas populacionais do detector principal ai=si+bi e do controle qi=β bi, todas em s⁻¹ salvo β>0 adimensional. si=κci com κ em m³/s e concentração LOCAL ci em m⁻³. O controle não registra sinal; β é constante nas duas condições, mas conhecido apenas por β∈[L,U], 0<L≤U. O fundo pode mudar entre condições; dentro de cada par, principal e controle compartilham o mesmo fundo. Dados finitos são contagens Poisson condicionais, como no relatório 21, mas nesta rodada trabalha-se com taxas populacionais exatas para isolar incerteza de calibração.

Defina u=a1−a0, v=q1−q0, d=s1−s0, em s⁻¹. Então d=u−v/β. Se v≥0, d cresce com β, logo:

u−v/L ≤ d ≤ u−v/U.

Se v<0, invertem-se os extremos. Aumento robusto para v≥0 exige u−v/L>0; se o intervalo cruza zero, o sinal da mudança não está identificado pelas taxas e limites dados. Estas cotas são conservadoras caso os vínculos físicos si≥0 excluam parte dos ganhos. Neste exemplo, todos os ganhos usados dão taxas não negativas, portanto a ambiguidade é realizável.

Exemplo exato: a0=15, a1=17, q0=10, q1=14 s⁻¹, β∈[9/5,11/5]. Assim u=2, v=4 s⁻¹, d∈[−2/9,2/11] s⁻¹. Para β=9/5: b0=50/9, b1=70/9, s0=85/9, s1=83/9 s⁻¹. Para β=11/5: b0=50/11, b1=70/11, s0=115/11, s1=117/11 s⁻¹. Ambas as descrições reproduzem as mesmas quatro taxas positivas, mas uma diminui sinal e outra aumenta. Mais contagens não elimina a ambiguidade de β. É necessário calibrá-lo melhor ou obter observável independente.

## Analisador Cosmos e Z3

As constantes são reais e em unidades coerentes. As equações não incluem incerteza amostral e não são intervalo de confiança. Z3 checa premissas, consulta e negação com 10 s por verificação:
```json
[
  {
    "id": "INTERVALO_GANHO",
    "premissas": {
      "A": "lo > 0 ∧ hi ≥ lo ∧ beta ≥ lo ∧ beta ≤ hi ∧ v ≥ 0",
      "B": "beta × d = beta × u − v ∧ lo × baixo = lo × u − v ∧ hi × alto = hi × u − v"
    },
    "alvo": "baixo ≤ d ∧ d ≤ alto",
    "esperado": "SEGUE"
  },
  {
    "id": "AUMENTO_ROBUSTO",
    "premissas": {
      "A": "lo > 0 ∧ beta ≥ lo ∧ v ≥ 0 ∧ lo × u > v",
      "B": "beta × d = beta × u − v"
    },
    "alvo": "d > 0",
    "esperado": "SEGUE"
  },
  {
    "id": "GANHO_BAIXO_INVERTE",
    "premissas": {
      "A": "u = 2 ∧ v = 4 ∧ 5 × beta = 9",
      "B": "beta × d = beta × u − v"
    },
    "alvo": "d > 0",
    "esperado": "CONTRADIZ"
  },
  {
    "id": "GANHO_ALTO_INVERTE",
    "premissas": {
      "A": "u = 2 ∧ v = 4 ∧ 5 × beta = 11",
      "B": "beta × d = beta × u − v"
    },
    "alvo": "d > 0",
    "esperado": "SEGUE"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-22-temporaria.mjs`. Código 0:
```text
INTERVALO_GANHO: premissas=sat; consulta=sat; negacao=unsat
INTERVALO_GANHO SEGUE [A, B, consulta]
AUMENTO_ROBUSTO: premissas=sat; consulta=sat; negacao=unsat
AUMENTO_ROBUSTO SEGUE [A, B, consulta]
GANHO_BAIXO_INVERTE: premissas=sat; consulta=unsat; negacao=sat
GANHO_BAIXO_INVERTE CONTRADIZ [A, B, consulta]
GANHO_ALTO_INVERTE: premissas=sat; consulta=sat; negacao=unsat
GANHO_ALTO_INVERTE SEGUE [A, B, consulta]

```

## Classificação e próxima investigação

Conhecido: medições com sensores não equivalentes precisam de relação de resposta especificada. Conexão nova para o projeto: quatro taxas e controle simultâneo não garantem sequer o sinal de mudança se o ganho relativo permanece incerto. Hipóteses: fundo compartilhado por par, controle sem sinal, ganho comum entre condições. Prova condicional: intervalo e testemunhos acima. Eficácia experimental medida: nenhuma; nenhuma nova simulação probabilística nesta rodada. Próximo: combinar intervalos simultâneos para as quatro taxas com [L,U], garantindo cobertura conjunta e não tratando estimativas pontuais como taxas verdadeiras. Temporário próprio removido depois de salvar as fórmulas e a saída; somente este relatório foi acrescentado permanentemente.
