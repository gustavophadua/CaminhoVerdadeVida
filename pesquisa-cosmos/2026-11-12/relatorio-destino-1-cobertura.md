# 12/11/2026 — Destino 1: o que dois observadores conseguem registrar

O relatório de aniquilação deduziu dois fótons antiparalelos de aproximadamente 511 keV cada no centro de momento de um par lento. O uso de coincidências de aniquilação na tomografia foi demonstrado por Ter-Pogossian et al. em um instrumento com detectores em arranjo hexagonal. A comparação geométrica abaixo é uma extensão idealizada para o Axioma 4 do Tubo. [Estudo primário sobre PETT, 1975](https://pubs.rsna.org/doi/10.1148/114.1.89)

## Hipóteses e dedução

A fonte está no centro de uma esfera. Cada evento produz dois fótons de energia Eγ=511 keV em direções u e −u, com u uniforme na esfera. A região sensível S tem área angular Ω em sr e cobre a fração f=Ω/(4π)∈[0,1]. O detector ideal registra integralmente o fóton se sua direção cai em S. Desprezam-se espalhamento, atenuação, tempo morto e resolução. Isso aproxima a seleção de coincidências em um sistema de imagem biológica, sem modelar tecido ou equipamento real.

Defina q como a área angular de S∩(−S) dividida por 4π. É a probabilidade de registrar dois fótons. Pela inclusão e exclusão, as probabilidades de registrar zero, um ou dois são p₀=1−2f+q, p₁=2(f−q), p₂=q. Logo max(0,2f−1)≤q≤f. A energia média registrada é Eγ(p₁+2p₂)=2Eγ f. A fração média de energia medida depende só de f. A probabilidade de coincidência depende de q.

Duas regiões com f=0,4 fornecem um contraexemplo à ideia de que a cobertura total determina a coincidência. Para z=cos θ∈[−1,1], uma calota z≥0,2 tem q=0. Duas calotas opostas com |z|≥0,6 têm q=0,4. Ambas produzem média de 408,8 keV por emissão, incluindo eventos sem leitura. Na primeira geometria, uma leitura positiva sempre registra 511 keV. Na segunda, toda leitura positiva registra 1.022 keV.

## Verificações executadas

O analisador do Cosmos aceitou as fórmulas e Z3 verificou a consistência, a consulta e sua negação. As constantes são reais, ff=f, pZero=p₀ e pUm=p₁. As áreas das calotas foram calculadas analiticamente usando a distribuição uniforme de z.

```text
{"id":"LIM","premissas":{"A":"ff ≥ 0 ∧ ff ≤ 1 ∧ q ≥ 0 ∧ pUm ≥ 0 ∧ pZero ≥ 0","B":"pUm = 2 × (ff − q) ∧ pZero + pUm + q = 1"},"alvo":"q ≤ ff ∧ q ≥ 2 × ff − 1 ∧ pUm + 2 × q = 2 × ff","esperado":"SEGUE"}
{"id":"CAP","premissas":{"A":"5 × ff = 2 ∧ q = 0","B":"pUm = 2 × (ff − q) ∧ pZero + pUm + q = 1"},"alvo":"5 × pUm = 4 ∧ 5 × pZero = 1","esperado":"SEGUE"}
{"id":"OPOS","premissas":{"A":"5 × ff = 2 ∧ q = ff","B":"pUm = 2 × (ff − q) ∧ pZero + pUm + q = 1"},"alvo":"pUm = 0 ∧ 5 × pZero = 3","esperado":"SEGUE"}
```

O ensaio numérico usou 100.000 valores determinísticos zᵢ=−1+(2i+1)/100000, com i=0,…,99999. Para cada máscara contou N=1_S(zᵢ)+1_S(−zᵢ) e calculou a média 511·(n₁+2n₂)/100000 em keV. O vetor counts registra [n₀,n₁,n₂]. Essa malha testa máscaras axissimétricas e não constitui amostragem experimental.

```text
LIM SEGUE [A, B, consulta]
CAP SEGUE [A, B, consulta]
OPOS SEGUE [A, B, consulta]
{"name":"calota","n":100000,"counts":[20000,80000,0],"meanKeV":408.8}
{"name":"opostas","n":100000,"counts":[60000,0,40000],"meanKeV":408.8}
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-cobertura-temporario.mjs.

A conexão nova para o Tubo é que dois observadores com a mesma cobertura e a mesma energia média registrada podem reconstruir eventos muito diferentes. A igualdade das médias e a diferença de coincidências são consequências condicionais. Não houve medição de eficácia em equipamento. Próximo teste: introduzir eficiência por fóton e desvio angular para ver como cada efeito altera as coincidências.

