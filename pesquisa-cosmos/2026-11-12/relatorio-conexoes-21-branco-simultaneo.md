# 12/11/2026 — Relatório 21: branco simultâneo remove fundo, mas acrescenta ruído de contagem

Data local America/Sao_Paulo: 12/11, 21:22 no disparo (13/11 00:22 UTC). Continuação dos relatórios 19–20, relidos; regras do Tubo consultadas sem alteração. BOOK preservado. T01–T03 orientam explicitar o observável parcial, mas não impõem o modelo de detecção.

## Fonte e conexão

Swain, Elowitz e Siggia (2002) demonstram teoricamente a separação de componentes de ruído por medições simultâneas em genes equivalentes: https://pubmed.ncbi.nlm.nih.gov/12237400/ (DOI 10.1073/pnas.162041399). Elowitz et al. (2002) construíram repórteres em E. coli para distinguir fontes de ruído: https://authors.library.caltech.edu/records/wsymf-b6c81 . O protocolo de branco abaixo é uma proposta matemática inspirada em observações simultâneas, não uma reprodução daqueles experimentos.

## Hipóteses e equações exatas

Sinal s=κc≥0 em s⁻¹, c concentração local em m⁻³, κ em m³/s. Fundo aleatório B≥0 em s⁻¹ compartilhado por detector principal e controle negativo SIMULTÂNEOS. E[B]=b, Var(B)=v em s⁻²; T>0 em s. Ganho relativo do controle β>0 conhecido e adimensional. Condicionalmente a B, N~Poisson((s+B)T) e M~Poisson(βBT) independentes. O controle não vê sinal, não perturba sua captura e vê exatamente o mesmo fundo escalado. São hipóteses físicas a verificar.

Estimador de taxa Z=(N−M/β)/T, em s⁻¹. E[Z|B]=s; Var(Z|B)=(s+B+B/β)/T. Pela variância total, E[Z]=s e Var(Z)=(s+b+b/β)/T: o termo v cancela, mas sobra ruído do próprio controle b/(βT). Z pode ser negativo; para β diferente de 1 nem sequer é contagem inteira, portanto não se pode tratá-lo como Poisson nem aplicar o teste binomial original sobre contagens subtraídas. κ conhecido permitiria estimar c por Z/κ.

Se a correção usa β_est errado, E[Z_est]=s+b(1−β/β_est). A componente extrínseca da variância reaparece como v(1−β/β_est)², além da componente média de Poisson [s+b+βb/β_est²]/T. Aumentar T não corrige esse viés. Se s também varia com B, se há contaminação de sinal no branco ou correlação residual entre N e M condicional a B, as fórmulas precisam ser refeitas.

## Z3 e simulação executados

As identidades probabilísticas acima são derivação analítica, não provas do solver. O analisador e Z3 verificam consequências algébricas nas unidades declaradas, com premissas, consulta e negação:
```json
[
  {
    "id": "BRANCO_SIMULTANEO",
    "premissas": {
      "A": "sinal ≥ 0 ∧ fundo ≥ 0 ∧ beta > 0 ∧ tempo > 0",
      "B": "mediaN = (sinal + fundo) × tempo ∧ mediaM = beta × fundo × tempo ∧ beta × tempo × media = beta × mediaN − mediaM"
    },
    "alvo": "media = sinal",
    "esperado": "SEGUE"
  },
  {
    "id": "CUSTO_DO_BRANCO",
    "premissas": {
      "A": "sinal ≥ 0 ∧ fundo > 0 ∧ beta > 0 ∧ tempo > 0",
      "B": "beta × tempo × variancia = beta × sinal + beta × fundo + fundo"
    },
    "alvo": "tempo × variancia > sinal + fundo",
    "esperado": "SEGUE"
  },
  {
    "id": "GANHO_ERRADO",
    "premissas": {
      "A": "sinal = 10 ∧ fundo = 5 ∧ beta = 2 ∧ betaEst = 1",
      "B": "betaEst × media = betaEst × (sinal + fundo) − beta × fundo"
    },
    "alvo": "media = sinal",
    "esperado": "CONTRADIZ"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-21-temporaria.mjs`. Código 0.
```text
BRANCO_SIMULTANEO: premissas=sat; consulta=sat; negacao=unsat
BRANCO_SIMULTANEO SEGUE [A, B, consulta]
CUSTO_DO_BRANCO: premissas=sat; consulta=sat; negacao=unsat
CUSTO_DO_BRANCO SEGUE [A, B, consulta]
GANHO_ERRADO: premissas=sat; consulta=unsat; negacao=sat
GANHO_ERRADO CONTRADIZ [A, B, consulta]

```
200.000 pares por cenário, NumPy 2.2.6, PCG64 semente fixa, B em {3,7} s⁻¹, s=10 s⁻¹, T=90 s; médias e variâncias estimadas, não medidas físicas. Python código 0:
```python
import numpy as np
rng=np.random.Generator(np.random.PCG64(2026111224))
for beta in [1.,2.,4.]:
 t=90.;n=200000
 fundo=rng.choice([3.,7.],n)
 a=rng.poisson((10+fundo)*t);m=rng.poisson(beta*fundo*t)
 z=(a-m/beta)/t
 print(f'beta={beta}; media={np.mean(z):.6f}; var={np.var(z):.6f}; var_teoria={(15+5/beta)/t:.6f}')

```
```text
beta=1.0; media=10.001728; var=0.221713; var_teoria=0.222222
beta=2.0; media=10.001112; var=0.193806; var_teoria=0.194444
beta=4.0; media=10.000367; var=0.180932; var_teoria=0.180556

```

Conhecido: dois observáveis simultâneos ajudam a decompor ruído sob hipóteses adequadas. Novo para o projeto: controle negativo escalado remove o fundo compartilhado do estimador, mas exige ganho calibrado e acrescenta ruído de captura. Hipótese: modelo Poisson condicional e fundo compartilhado. Prova condicional: três verificações acima. Eficácia experimental medida: nenhuma. Não se conclui que β possa crescer gratuitamente; geometria, receptores, volume e instrumentação impõem custo não modelado. Próximo: intervalo ou teste adequado para quatro contagens brutas (antes/depois, principal/controle), mantendo incerteza de β. Temporários próprios removidos após registrar código e saídas; somente este relatório datado foi acrescentado como artefato permanente.
