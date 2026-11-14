# 12/11/2026 — Relatório 23: cobertura conjunta para quatro taxas e ganho limitado

Data local do disparo 23:30, America/Sao_Paulo. Relidos relatório 22 e regras do Tubo. Continuação da incerteza de calibração; BOOK preservado. T01–T03 motivam explicitar limites observacionais, mas não demonstram cobertura estatística.

## Fonte e conexão

Garwood (1936), Fiducial Limits for the Poisson Distribution, Biometrika 28, 437–442, https://doi.org/10.1093/biomet/28.3-4.437 ; cópia primária encontrada: https://jhanley.biostat.mcgill.ca/bios601/Intensity-Rate/Garwood1936.pdf . Registro bibliográfico verificado nesta rodada. Contexto biológico primário já consultado: Rhee, Cheong e Levchenko (2014), repórteres não equivalentes, https://doi.org/10.1073/pnas.1411932111 . O vínculo proposto é entre captura molecular física, controle simultâneo em sensores biológicos e inferência com erro conjunto explícito.

## Protocolo e equações

Quatro contagens N0,N1,M0,M1, com durações conhecidas Ti>0 em s. Taxas ai=si+bi, qi=βbi em s⁻¹; si=κci, κ m³/s, ci concentração local m⁻³. Assume-se captura Poisson por canal, fundo constante dentro de cada janela e ganho comum β∈[L,U], 0<L≤U. As taxas podem ser condicionais ao fundo realizado; não aplicar os intervalos de Poisson a uma mistura marginal sem declarar esse condicionamento. Se o sinal é fixo e o modelo vale condicionalmente para todo fundo, a cobertura resultante também vale ao integrar o fundo. Não é necessária independência entre canais para a união de erros.

Escolha erro conjunto α=0,05. Cada um dos quatro intervalos bilaterais usa erro η=α/4=0,0125. Para contagem k em tempo T, limites de taxa de Garwood:
L(k)=0 se k=0, senão χ²_(2k,η/2)/(2T);
U(k)=χ²_(2(k+1),1−η/2)/(2T).
χ²_(ν,p) denota quantil p da distribuição qui-quadrado de ν graus de liberdade. Limites em s⁻¹. Cada cobertura é ≥1−η; união de erros implica cobertura simultânea ≥1−4η=0,95. A prova probabilística é analítica, não realizada pelo Z3. Nenhum quantil foi calculado numericamente nesta rodada.

Das quatro faixas obtêm-se u=a1−a0∈[a1Lo−a0Hi,a1Hi−a0Lo]=[uLo,uHi] e v=q1−q0∈[q1Lo−q0Hi,q1Hi−q0Lo]=[vLo,vHi]. Como d=s1−s0=u−v/β, defina r=1/β∈[1/U,1/L]. Os extremos conservadores são
Dlo=uLo−max{vLo/U,vLo/L,vHi/U,vHi/L};
Dhi=uHi−min{vLo/U,vLo/L,vHi/U,vHi/L}.
A fórmula por vértices cobre qualquer sinal de v. Se vLo≥0, simplifica para Dlo=uLo−vHi/L e Dhi=uHi−vLo/U. Multiplicações são taxas vezes número adimensional. O intervalo contém d no evento de cobertura conjunta e com β dentro da faixa. Se [L,U] vier de calibração aleatória com falha γ, garantia mínima cai para 1−α−γ; para manter 95% é preciso repartir o orçamento total. Não assumir gratuitamente cobertura certa de β.

## Verificação executada

Z3 prova a propagação no ramo vLo≥0, a aritmética do orçamento (não o teorema probabilístico) e uma caixa ilustrativa. Premissas, consulta e negação:
```json
[
  {
    "id": "CAIXA_V_POSITIVO",
    "premissas": {
      "A": "uLo ≤ u ∧ u ≤ uHi ∧ 0 ≤ vLo ∧ vLo ≤ v ∧ v ≤ vHi ∧ 0 < qLo ∧ qLo ≤ q ∧ q ≤ qHi",
      "B": "d = u − v × q ∧ baixo = uLo − vHi × qHi ∧ alto = uHi − vLo × qLo"
    },
    "alvo": "baixo ≤ d ∧ d ≤ alto",
    "esperado": "SEGUE"
  },
  {
    "id": "ORCAMENTO_COBERTURA",
    "premissas": {
      "A": "eps > 0 ∧ 4 × erro ≤ eps",
      "B": "erro ≥ 0"
    },
    "alvo": "1 − 4 × erro ≥ 1 − eps",
    "esperado": "SEGUE"
  },
  {
    "id": "EXEMPLO_INCONCLUSIVO",
    "premissas": {
      "A": "uLo = 1 ∧ uHi = 3 ∧ vLo = 3 ∧ vHi = 5 ∧ 11 × qLo = 5 ∧ 9 × qHi = 5",
      "B": "baixo = uLo − vHi × qHi ∧ alto = uHi − vLo × qLo"
    },
    "alvo": "baixo < 0 ∧ alto > 0 ∧ 9 × baixo = −16 ∧ 11 × alto = 18",
    "esperado": "SEGUE"
  }
]
```
Comando: `node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-23-temporaria.mjs`. Código 0:
```text
CAIXA_V_POSITIVO: premissas=sat; consulta=sat; negacao=unsat
CAIXA_V_POSITIVO SEGUE [A, B, consulta]
ORCAMENTO_COBERTURA: premissas=sat; consulta=sat; negacao=unsat
ORCAMENTO_COBERTURA SEGUE [A, consulta]
EXEMPLO_INCONCLUSIVO: premissas=sat; consulta=sat; negacao=unsat
EXEMPLO_INCONCLUSIVO SEGUE [A, B, consulta]

```
Exemplo ilustrativo, NÃO intervalo obtido de dados: u∈[1,3] s⁻¹, v∈[3,5] s⁻¹, β∈[9/5,11/5]. Resulta d∈[−16/9,18/11] s⁻¹: sinal inconclusivo. Evitar chamar as cotas ilustrativas de confiança 95%, pois não vieram de contagens e quantis.

## Classificação e próximo teste

Conhecido: intervalos Poisson e cobertura por união de erros. Novo no projeto: faixa conjunta que combina contagem finita e ganho incerto sem fingir que quatro estimativas pontuais são taxas exatas. Hipóteses: modelo condicional e calibração válida. Provas condicionais: três consultas acima. Eficácia experimental: nenhuma. Próximo: implementar e verificar numericamente quantis, incluindo contagens zero, antes de simular cobertura e potência desta decisão conservadora. O ramo de v com sinais mistos também requer ensaio próprio. Temporário da rodada removido após documentar fórmulas e resultado; somente este relatório foi salvo permanentemente.
