# 12/11/2026 — Calibração com fundo e custo temporal

## Modelo e prova

λ0=κc+b; λ+=κ(c+Δ)+b. c≥0 e Δ>0 em m⁻³ (moléculas contadas como número), κ>0 em m³/s, b≥0 e λ em s⁻¹. O ganho κ é um coeficiente dimensional de captura e registro, não uma probabilidade. Δ é conhecido; κ e b devem permanecer constantes durante a intervenção. Subtrair as taxas fornece κ=(λ+−λ0)/Δ. Isso identifica κ nas taxas populacionais, não o mede exatamente em amostras finitas.

Para 0<h<c, c'=c−h e b'=b+κh conservam ambas as taxas. Portanto c e b não se separam em geral. Exemplo κ=1 m³/s, Δ=2 m⁻³: (c,b)=(10 m⁻³,5 s⁻¹) e (9 m⁻³,6 s⁻¹) produzem (λ0,λ+)=(15,17) s⁻¹. A fronteira λ0=0 com κ>0 e c,b≥0 é exceção: força c=b=0. Um branco independente com c=0, mantendo o mesmo b, mede b e permite c=(λ0−b)/κ. Mais adições de Δ com o mesmo ganho e fundo identificam a mesma inclinação e intercepto; não separam o intercepto κc+b.

## Execução Cosmos/Z3

Premissas, consulta e negação checadas; código zero. O arquivo solicitado foi mantido. Fórmulas exatas:
```json
[
  {
    "id": "FUNDO_KAPPA_SEGUE",
    "premissas": {
      "A": "kap > 0 ∧ conc ≥ 0 ∧ fundo ≥ 0 ∧ delta > 0",
      "B": "lam = kap × conc + fundo ∧ lamMais = kap × (conc + delta) + fundo"
    },
    "alvo": "kap × delta = lamMais − lam ∧ lamMais > lam",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE",
    "premissas": {
      "A": "kap > 0 ∧ conc > 0 ∧ fundo ≥ 0 ∧ delta > 0 ∧ h > 0 ∧ h < conc",
      "B": "cc = conc − h ∧ bb = fundo + kap × h"
    },
    "alvo": "cc ≥ 0 ∧ bb ≥ 0 ∧ cc < conc ∧ bb > fundo ∧ kap × cc + bb = kap × conc + fundo ∧ kap × (cc + delta) + bb = kap × (conc + delta) + fundo",
    "esperado": "SEGUE"
  },
  {
    "id": "FUNDO_UNICIDADE_KAPPA",
    "premissas": {
      "A": "delta > 0 ∧ lam = kap × conc + fundo ∧ lamMais = kap × (conc + delta) + fundo",
      "B": "lam = kk × cc + bb ∧ lamMais = kk × (cc + delta) + bb"
    },
    "alvo": "kap = kk",
    "esperado": "SEGUE"
  },
  {
    "id": "BRANCO_FECHA",
    "premissas": {
      "A": "kap > 0 ∧ lam = kap × conc + fundo",
      "B": "bb = fundo ∧ kap × cc = lam − bb"
    },
    "alvo": "cc = conc",
    "esperado": "SEGUE"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-calibracao-b-temporaria.mjs`
```text
FUNDO_KAPPA_SEGUE: premissas=sat; consulta=sat; negacao=unsat
FUNDO_KAPPA_SEGUE SEGUE [A, B, consulta]
FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE: premissas=sat; consulta=sat; negacao=unsat
FUNDO_CB_NAO_IDENTIFICAVEL_SEGUE SEGUE [A, B, consulta]
FUNDO_UNICIDADE_KAPPA: premissas=sat; consulta=sat; negacao=unsat
FUNDO_UNICIDADE_KAPPA SEGUE [A, B, consulta]
BRANCO_FECHA: premissas=sat; consulta=sat; negacao=unsat
BRANCO_FECHA SEGUE [A, B, consulta]

```

## Custo temporal: 200.000 pares por cenário

Critério definido: probabilidade de a contagem após adição ser estritamente maior que a contagem anterior, em duas janelas independentes de duração T. Isto NÃO é potência de um teste com falso positivo de 5%. Sob a hipótese nula, o critério de sinal teria probabilidade próxima de 1/2. Para projeto de teste formal, faltam nível de significância e potência desejados.

N0~Poisson(λ0T), N+~Poisson(λ+T). D=N+−N0 tem média (λ+−λ0)T e variância (λ++λ0)T. Aproximação normal: P(D>0)≈Φ((λ+−λ0)√[T/(λ++λ0)]). Logo T95≈z_0.95²(λ++λ0)/(λ+−λ0)² em segundos por janela. A discretização e os empates tornam esse valor aproximado. Não foi apresentado como mínimo exato. Parâmetros ilustrativos λ0=15 e λ+=17 s⁻¹, não dados biológicos. Tempo total 2T exclui mistura, preparação e estabilização.

Python, NumPy 2.2.6, PCG64 com semente 20261112, execução código zero:
```python
import numpy as np
from statistics import NormalDist
rng=np.random.Generator(np.random.PCG64(20261112))
n=200000
l0,lp=15.,17.
t95=NormalDist().inv_cdf(.95)**2*(l0+lp)/(lp-l0)**2
print('T95 normal aproximado por janela:',t95)
for t in [1.,t95,25.,50.]:
 a=rng.poisson(l0*t,n)
 b=rng.poisson(lp*t,n)
 prob=float(np.mean(b>a)); empate=float(np.mean(b==a))
 se=(prob*(1-prob)/n)**.5
 print(f'T={t:.9f}s; total={2*t:.9f}s; P(Nmais>N0)={prob:.6f}; empate={empate:.6f}; MC_SE={se:.6f}')

```
```text
T95 normal aproximado por janela: 21.644347632763285
T=1.000000000s; total=2.000000000s; P(Nmais>N0)=0.604550; empate=0.066840; MC_SE=0.001093
T=21.644347633s; total=43.288695266s; P(Nmais>N0)=0.948245; empate=0.003960; MC_SE=0.000495
T=25.000000000s; total=50.000000000s; P(Nmais>N0)=0.959365; empate=0.003100; MC_SE=0.000441
T=50.000000000s; total=100.000000000s; P(Nmais>N0)=0.993405; empate=0.000430; MC_SE=0.000181

```

Custo de material para volume V em m³: ΔV moléculas adicionadas em média. Custo energético e tempo de mistura não foram estimados: exigem mecanismo, volume e protocolo. O ensaio mede apenas desempenho numérico do critério sob Poisson; não eficácia física. Religação, adaptação e flutuação do fundo exigiriam outro modelo.

## Mapeamento para o BOOK

Correspondência proposta pelo autor: Axioma 4 → limitação de captura/registro resumida por κ; c → concentração LOCAL da espécie observada, não concentração universal de todo conteúdo do Todo; Axioma 5 → fundo b. Aqui b é média de eventos espúrios por segundo, e o ruído são flutuações das contagens, não a própria constante b. A correspondência interpreta os axiomas, não deriva as equações a partir deles. T01–T03 descrevem observação parcial e limitação do acesso; T09 inspira investigar custo, mas não dá seu valor. T10 é a ponte com emissão no exemplo de luz. Os números dos axiomas não são IDs T04/T05: estes, na base atual, tratam de descanso e fechamento do Tubo. Não foram modificados.

Luz: Evis≤Etotal−2ε limita energia disponível, mas energia faltante não identifica o canal por si só. Tempo: Φ(d/(c_luz σt)) depende da razão distância/resolução, de modo que ambos desconhecidos não se separam por uma única probabilidade. Cheiro: λ=κc+b confunde captura, concentração e fundo; Δ conhecido identifica κ se o fundo for estável. São três ilustrações de limites e ambiguidades observacionais em modelos distintos; não provas de uma única lei universal. c_luz em m/s não é c_concentração em m⁻³.

## Fontes, classificação e pendências

Pesquisa primária: Berg e Purcell, Physics of chemoreception (1977), DOI 10.1016/S0006-3495(77)85544-6, https://dash.harvard.edu/entities/publication/73120378-cafa-6bd4-e053-0100007fdf3b ; Endres e Wingreen, Accuracy of direct gradient sensing by single cells (2008), https://arxiv.org/abs/0906.2468 . Sustentam contexto físico de captura e limitações sensoriais, não a validação experimental deste protocolo.

Conhecido: limites de sensoriamento molecular. Novo para o projeto: prova com fundo e custo temporal ilustrativo. Hipóteses: Poisson independente e ganho/fundo estáveis. Prova condicional: consultas acima. Eficácia experimental: nenhuma medida. BOOK: itens de álgebra e mapeamento documentados; custo temporal calculado para critério explícito, custo material/energético permanece dependente do protocolo. Próximo: teste exato condicional binomial para falso positivo 5% e potência 95%, acrescido de branco e tempo de mistura. Script Python temporário removido após incorporar código e saída ao relatório.
