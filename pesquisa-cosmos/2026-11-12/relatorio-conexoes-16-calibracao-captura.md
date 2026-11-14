# 12/11/2026 — Calibração de captura: contar mais não identifica concentração com ganho desconhecido

## Contexto e fontes primárias

Lidos o relatório 15 (incerteza de taxa), o relatório de winding (degenerescência), as ocorrências de sensoriamento nos relatórios 02/03/07 e a base T01–T13 do Projeto Tubo. A novidade desta rodada é uma intervenção de concentração conhecida para separar concentração e ganho; não repetir o ganho de precisão por tempo do relatório 02. As regras qualitativas do Tubo não são usadas como leis de difusão nem como prova de uma dinâmica biológica.

Berg e Purcell estudam limites físicos de quimiorrecepção e sua dependência de difusão, geometria e tempo: https://dash.harvard.edu/entities/publication/73120378-cafa-6bd4-e053-0100007fdf3b . Endres e Wingreen comparam sensores absorventes e monitores e mostram por que reencontros moleculares importam: https://arxiv.org/abs/0906.2468 (PNAS 105, 15749–15754, 2008; DOI 10.1073/pnas.0804688105). A aplicação de calibração abaixo é uma dedução para o projeto, não um resultado experimental desses artigos.

## Hipóteses, equações e unidades

Banho estacionário diluído, sensor ideal sem saturação nem fundo, chegadas independentes N~Poisson(λT). T>0 em s, λ=κc em s⁻¹, c>0 em moléculas/m³ (contagem adimensional), κ>0 em m³/s. κ resume captura física e eficiência de registro e é desconhecido. A difusão e os receptores motivam o modelo; não se presume que uma célula real tenha contagem Poisson sem testar religação e correlações.

Para qualquer s>0, (κ,c) e (sκ,c/s) geram exatamente a mesma λ e a mesma distribuição de N para todo T. A matriz de Fisher para (c,κ) é I=T/λ [[κ²,κc],[κc,c²]], com determinante zero. Mais tempo aumenta precisão da taxa, não remove essa não identificabilidade. A expressão de Fisher e a igualdade de distribuições são derivações analíticas; o Z3 testa a transformação algébrica, não a distribuição.

Intervenção: adicionar Δ>0 conhecido em moléculas/m³, mantendo κ constante e volume/diluição controlados. Medir taxas λ0=κc e λ+=κ(c+Δ). Então κ=(λ+−λ0)/Δ e c=Δλ0/(λ+−λ0). A igualdade é entre taxas populacionais; contagens finitas não determinam taxas exatas. Adaptação, saturação ou alteração da eficiência invalidam a hipótese de ganho constante. Não se atribui custo energético ou eficiência experimental a essa intervenção sem dados.

## Fórmulas exatas e ensaio

As constantes do Z3 são reais, representando valores numéricos em unidades coerentes. conc=c, kap=κ, delta=Δ, lam=λ0, lamMais=λ+. DOIS conjuntos A/B por teste. Todos passam pelo analisador do Cosmos e verificação de premissas, consulta e negação.

```json
[
  {
    "id": "ESCALA_INVISIVEL",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ lam = kap × conc",
      "B": "kapDois = 2 × kap ∧ 2 × concDois = conc"
    },
    "alvo": "kapDois × concDois = lam ∧ concDois < conc",
    "esperado": "SEGUE"
  },
  {
    "id": "CALIBRACAO",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ delta > 0 ∧ lam = kap × conc",
      "B": "lamMais = kap × (conc + delta)"
    },
    "alvo": "lamMais > lam ∧ (lamMais − lam) × conc = lam × delta",
    "esperado": "SEGUE"
  },
  {
    "id": "UNICIDADE",
    "premissas": {
      "A": "delta > 0 ∧ kap > 0 ∧ kapDois > 0 ∧ lam = kap × conc ∧ lam = kapDois × concDois",
      "B": "lamMais = kap × (conc + delta) ∧ lamMais = kapDois × (concDois + delta)"
    },
    "alvo": "kap = kapDois ∧ conc = concDois",
    "esperado": "SEGUE"
  },
  {
    "id": "GANHO_INSTAVEL",
    "premissas": {
      "A": "kap = 1 ∧ conc = 10 ∧ delta = 2 ∧ lam = kap × conc",
      "B": "kapDois = 2 ∧ lamMais = kapDois × (conc + delta)"
    },
    "alvo": "(lamMais − lam) × conc = lam × delta",
    "esperado": "CONTRADIZ"
  }
]
```

Comando executado: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-calibracao-2025-temporaria.mjs`. Código de saída 0. Saída:

```text
ESCALA_INVISIVEL: premissas=sat; consulta=sat; negacao=unsat
ESCALA_INVISIVEL SEGUE [A, B, consulta]
CALIBRACAO: premissas=sat; consulta=sat; negacao=unsat
CALIBRACAO SEGUE [A, B, consulta]
UNICIDADE: premissas=sat; consulta=sat; negacao=unsat
UNICIDADE SEGUE [A, B, consulta]
GANHO_INSTAVEL: premissas=sat; consulta=unsat; negacao=sat
GANHO_INSTAVEL CONTRADIZ [A, B, consulta]

```

GANHO_INSTAVEL é contraexemplo racional: κ=1 m³/s, c=10 m⁻³, Δ=2 m⁻³, mas κ+=2 m³/s. Taxas 10 e 24 s⁻¹; fórmula ingênua daria 20/14=10/7 m⁻³, não 10 m⁻³. Valores ilustrativos algébricos, não parâmetros celulares medidos.

## Classificação e continuação

Conhecido: ruído de captura molecular limita sensoriamento; identificabilidade depende do modelo observacional. Conexão nova para o projeto: a mesma ambiguidade entre mecanismo e observável encontrada no espectro reaparece no produto captura×concentração. Hipótese: ganho permanece constante após intervenção. Prova condicional: separação única de κ e c com duas taxas exatas e Δ conhecido. Eficácia experimental medida: nenhuma. Próximo teste: adicionar fundo desconhecido b em λ=κc+b; duas taxas identificam κ, mas não separam c de b, exigindo branco ou medida independente. O temporário desta rodada foi removido após registrar fórmulas e saída; os arquivos solicitados pelo usuário foram preservados.
