# 12/11/2026 — Relatório 19: fundo compartilhado versus fundo que muda entre janelas

Relidos relatório 18 e regras T01–T13; continuação da robustez do teste Poisson. Não se alterou BOOK, scripts anteriores ou axiomas. T02/T03 motivam descrever observação parcial; não demonstram independência estatística. O novo ponto é que fundo aleatório comum pode preservar o teste condicional, enquanto fundos diferentes não têm essa garantia.

## Fonte científica e alcance

Swain, Elowitz e Siggia, Intrinsic and extrinsic contributions to stochasticity in gene expression, PNAS 99, 12795–12800 (2002), DOI 10.1073/pnas.162041399. Fonte primária consultada: https://swainlab.bio.ed.ac.uk/papers/pnas02.pdf . O trabalho distingue fontes intrínsecas e extrínsecas em expressão gênica. Essa distinção inspira aqui separar captura aleatória e ambiente variável; os autores não validaram este protocolo de cheiro. A transferência para um sensor de concentração é hipótese de modelagem do projeto.

## Modelo e derivação

Captura basal s=κc em s⁻¹, fundos B0,B1≥0 em s⁻¹ constantes dentro de cada janela, mas aleatórios entre realizações. Médias E[B0]=E[B1]=b; variâncias Var(B0)=Var(B1)=v em s⁻²; Cov(B0,B1)=g em s⁻². T>0 em s, λ=s+b. Condicionalmente aos fundos, N0,N1 são Poisson independentes de médias (s+B0)T e (s+B1)T, sob ausência de adição. A lei da variância total fornece:

Var(Ni)=λT+vT²; Cov(N0,N1)=gT²;
Var(N1−N0)=2λT+2(v−g)T²;
Var((N1−N0)/T)=2λ/T+2(v−g).

As contagens são adimensionais; a última variância tem unidade s⁻². As identidades probabilísticas são derivadas fora do Z3; o solver verifica as consequências algébricas declaradas.

Se B0=B1 em cada par, g=v, o termo extrínseco cancela na diferença. Mesmo sendo contagens marginais correlacionadas e sobredispersas, N1|(N0+N1),B é Binomial(total,1/2), que independe de B. Logo integrar B preserva o teste condicional do relatório 18 sob H0. Isso requer fundo realmente compartilhado, mesma duração, mesma taxa basal e independência condicional.

Se os fundos são independentes, g=0: há piso 2v na variância da diferença de taxas quando T cresce. Não é lícito continuar invocando Binomial(total,1/2) apenas porque as médias são iguais. A simulação abaixo verifica variâncias, não quantifica falso positivo. O piso é específico de fundo constante por janela: um processo de fundo com tempo de correlação finito precisa de integral de autocovariância e não necessariamente produz piso assintótico.

## Cosmos e resultados efetivamente executados

```json
[
  {
    "id": "FUNDO_COMUM_CANCELA",
    "premissas": {
      "A": "taxa > 0 ∧ tempo > 0 ∧ vari ≥ 0 ∧ covar = vari",
      "B": "varDif = 2 × taxa × tempo + 2 × tempo × tempo × (vari − covar)"
    },
    "alvo": "varDif = 2 × taxa × tempo",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_INDEPENDENTE",
    "premissas": {
      "A": "taxa > 0 ∧ tempo > 0 ∧ vari > 0 ∧ covar = 0",
      "B": "varDif = 2 × taxa × tempo + 2 × tempo × tempo × (vari − covar)"
    },
    "alvo": "varDif > 2 × taxa × tempo",
    "esperado": "SEGUE"
  },
  {
    "id": "PISO_TAXA",
    "premissas": {
      "A": "taxa > 0 ∧ tempo > 0 ∧ vari > 0",
      "B": "excesso × tempo = 2 × taxa + 2 × tempo × vari"
    },
    "alvo": "excesso > 2 × vari",
    "esperado": "SEGUE"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-19-temporaria.mjs`. Código 0, analisador e Z3:
```text
FUNDO_COMUM_CANCELA: premissas=sat; consulta=sat; negacao=unsat
FUNDO_COMUM_CANCELA SEGUE [A, B, consulta]
FUNDO_INDEPENDENTE: premissas=sat; consulta=sat; negacao=unsat
FUNDO_INDEPENDENTE SEGUE [A, B, consulta]
PISO_TAXA: premissas=sat; consulta=sat; negacao=unsat
PISO_TAXA SEGUE [A, B, consulta]

```

## Simulação

200.000 pares por cenário; s=10 s⁻¹, B em {3,7} s⁻¹ equiprováveis, b=5 s⁻¹, v=4 s⁻², λ=15 s⁻¹. NumPy 2.2.6, PCG64, semente fixa. Código Python executado com saída zero:
```python
import numpy as np
rng=np.random.Generator(np.random.PCG64(2026111222))
n=200000
for t in [1,25,90]:
 for comum in [True,False]:
  b0=rng.choice([3.,7.],n)
  b1=b0 if comum else rng.choice([3.,7.],n)
  a=rng.poisson((10+b0)*t); b=rng.poisson((10+b1)*t)
  d=(b-a)/t
  previsto=30/t+(0 if comum else 8)
  print(f'T={t}s; comum={comum}; var_taxa_sim={np.var(d):.6f}; teoria={previsto:.6f} s^-2')

```
```text
T=1s; comum=True; var_taxa_sim=29.914495; teoria=30.000000 s^-2
T=1s; comum=False; var_taxa_sim=37.882674; teoria=38.000000 s^-2
T=25s; comum=True; var_taxa_sim=1.196649; teoria=1.200000 s^-2
T=25s; comum=False; var_taxa_sim=9.179793; teoria=9.200000 s^-2
T=90s; comum=True; var_taxa_sim=0.334041; teoria=0.333333 s^-2
T=90s; comum=False; var_taxa_sim=8.323377; teoria=8.333333 s^-2

```

Classificação: distinção de ruídos é ciência conhecida; cancelamento do fundo comum neste protocolo é conexão nova para o projeto; distribuição de fundo e constância por janela são hipóteses; resultados Z3 são provas condicionais; simulação é verificação numérica, sem eficácia experimental medida. Próximo: executar teste binomial sob ambos os tipos de fundo e modelar branco simultâneo com eficiência de captura própria. Temporários próprios removidos após documentar código e saída.
