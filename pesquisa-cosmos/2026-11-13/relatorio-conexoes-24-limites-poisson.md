# 13/11/2026 — Relatório 24: limites de contagem implementados e caixa com sinais mistos

Disparo local 00:31 America/Sao_Paulo. Relidos relatório 23 e regras do Tubo. Avanço técnico do protocolo de captura molecular com controle biológico: transformar contagens finitas em limites de taxa. BOOK não alterado.

## Fonte primária e hipótese

Garwood, Fiducial Limits for the Poisson Distribution (1936), DOI 10.1093/biomet/28.3-4.437. Texto primário acessado nesta execução: https://jhanley.biostat.mcgill.ca/bios601/Intensity-Rate/Garwood1936.pdf . O artigo inverte probabilidades Poisson e discute cobertura conservadora por discretização. A aplicação a quatro canais de captura e ganho incerto é construção do projeto, não resultado experimental do artigo. A ligação biológica permanece o uso de controles não equivalentes, como Rhee et al. (2014), DOI 10.1073/pnas.1411932111, consultado na rodada 22.

Mantenha hipóteses do relatório 23: quatro canais com taxas condicionais constantes, Ni~Poisson(λiTi), Ti>0 em s; λi em s⁻¹. Fundo compartilhado por principal/controle em cada condição, β comum e dentro de [1,8;2,2]. κ traduz captura física para taxa; não é deduzido de T01–T13. Não se aplica automaticamente a mistura marginal ou sensores com religação.

## Implementação numérica efetivamente executada

Erro por intervalo η=0,0125, cauda p=η/2=0,00625. Para k=0, μLo=0; para k>0 resolver F_Poisson(k−1;μLo)=1−p. Resolver F_Poisson(k;μHi)=p. Taxas [μLo/T,μHi/T]. Estas equações são equivalentes aos quantis qui-quadrado do relatório 23. Inversão por bisseção com somas em escala logarítmica; sem SciPy, sem aproximação normal. Verificados resíduos <10^-10 e casos fechados μHi(0)=−ln(p), μLo(1)=−ln(1−p). Isso é validação numérica local, não prova certificada de arredondamento para todas as contagens possíveis.

```python
import math
eta=.05/4
p=eta/2
def cdf(k,mu):
 if k<0:return 0.
 if mu==0:return 1.
 logs=[-mu+j*math.log(mu)-math.lgamma(j+1) for j in range(k+1)]
 top=max(logs)
 return math.exp(top)*math.fsum(math.exp(x-top) for x in logs)
def inverse(k,target):
 lo=0.;hi=max(1.,k+1.)
 while cdf(k,hi)>target:hi*=2
 for _ in range(80):
  mid=(lo+hi)/2
  if cdf(k,mid)>target:lo=mid
  else:hi=mid
 return (lo+hi)/2
def interval(k):
 low=0. if k==0 else inverse(k-1,1-p)
 high=inverse(k,p)
 assert abs(cdf(k,high)-p)<1e-10
 if k:assert abs(cdf(k-1,low)-(1-p))<1e-10
 return low,high
assert abs(interval(0)[1]+math.log(p))<1e-12
assert abs(interval(1)[0]+math.log(1-p))<1e-12
for k in [0,1,5,10,900,1260,1350,1530]:
 print('k=',k,' limites_mu=',interval(k))
a0,a1,q0,q1=[tuple(x/90 for x in interval(k)) for k in [1350,1530,900,1260]]
u=(a1[0]-a0[1],a1[1]-a0[0]);v=(q1[0]-q0[1],q1[1]-q0[0])
prod=[x/beta for x in v for beta in [1.8,2.2]]
print('u=',u,'v=',v,'d=',(u[0]-max(prod),u[1]-min(prod)),'s^-1')
print('verificacoes_de_residuo_e_casos_fechados=PASS')

```
Executado com Python, código 0:
```text
k= 0  limites_mu= (0.0, 5.075173815233827)
k= 1  limites_mu= (0.006269613013595318, 7.176429362271207)
k= 5  limites_mu= (1.1381666440480913, 13.818357179852978)
k= 10  limites_mu= (3.8429726189817206, 21.000265770156332)
k= 900  limites_mu= (826.8165725647818, 977.7170042198563)
k= 1260  limites_mu= (1173.087773005292, 1351.4394751563846)
k= 1350  limites_mu= (1259.9759222574444, 1444.550152421346)
k= 1530  limites_mu= (1434.0491247947111, 1630.4749200168271)
u= (-0.11667808474038566, 4.116655530659809) v= (2.170786319838175, 5.829143362128919) d= (-3.355091063700896, 3.1299344761879113) s^-1
verificacoes_de_residuo_e_casos_fechados=PASS

```

Contagens 1350,1530,900,1260 em T=90 s são exemplo sintético fixo; não amostra experimental, nem simulação de cobertura. Os intervalos resultam agora de uma regra estatística definida. A cobertura conjunta ≥95% vem da hipótese Poisson e união de erros, conforme relatório 23; não é a probabilidade posterior de o valor verdadeiro estar neste intervalo particular. A faixa de β foi assumida garantida; se estimada com erro, deve entrar no orçamento de falha.

## Cosmos/Z3 — ramo de sinal misto

Quando vLo<0<vHi e r=1/β>0 com r≤rHi, os extremos vLo*rHi e vHi*rHi limitam vr. Com u∈[uLo,uHi], d=u−vr está em [uLo−vHi*rHi,uHi−vLo*rHi]. Aqui q no solver representa r adimensional, não taxa do controle. O ramo v≥0 já foi verificado na rodada 23. Fórmulas:
```json
[
  {
    "id": "CAIXA_SINAIS_MISTOS",
    "premissas": {
      "A": "uLo ≤ u ∧ u ≤ uHi ∧ vLo < 0 ∧ vHi > 0 ∧ vLo ≤ v ∧ v ≤ vHi ∧ q > 0 ∧ q ≤ qHi",
      "B": "d = u − v × q ∧ baixo = uLo − vHi × qHi ∧ alto = uHi − vLo × qHi"
    },
    "alvo": "baixo ≤ d ∧ d ≤ alto",
    "esperado": "SEGUE"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-13/rodada-24-temporaria.mjs`, código 0:
```text
CAIXA_SINAIS_MISTOS: premissas=sat; consulta=sat; negacao=unsat
CAIXA_SINAIS_MISTOS SEGUE [A, B, consulta]

```

Conhecido: inversão Poisson. Novo para projeto: avaliação numérica dos limites e prova do ramo misto. Hipóteses: contagem condicional e faixa válida de ganho. Prova condicional: Z3 acima. Eficácia experimental medida: nenhuma. Próximo: simular cobertura repetida da decisão para quatro canais e testar contagens raras, sem chamar resíduos numéricos de prova universal do algoritmo. Scripts temporários próprios removidos após incorporar código e resultados neste relatório.
