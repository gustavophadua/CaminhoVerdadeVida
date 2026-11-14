# 12/11/2026 — Relatório 15 — Instante de coleta quando a taxa de troca é incerta

O relatório 14 encontrou t=1/λ para medir a diferença de frações isotópicas, se a taxa nominal for correta. Aqui, escolhe-se um único instante que maximize a menor fração de informação retida quando a taxa real só é conhecida por um intervalo. A literatura já desenvolve desenhos maximin para regressões exponenciais. A aplicação abaixo é uma dedução específica para o protocolo de um instante do Tubo. [Pesquisa primária sobre desenho maximin em regressão exponencial](https://www.sciencedirect.com/science/article/abs/pii/S0378375805001813)

## Modelo e prova condicional

Mantêm-se os compartimentos fechados do relatório 13. As quantidades X,Y>0 em mol são fixas e conhecidas. A diferença de frações tem média μ(t)=A exp(−λt), com amplitude adimensional conhecida e não nula, λ=J(1/X+1/Y) em s⁻¹ e fluxo bruto J em mol/s. O ruído de uma leitura é gaussiano aditivo com variância conhecida σ²>0. O tempo t≥0 está em s e a taxa real pertence ao intervalo fechado [L,U] com 0<L<U em s⁻¹.

A eficiência relativa é η(λ,t)=I(λ,t)/I(λ,1/λ)=(λt)² exp(2−2λt), adimensional. O mesmo quociente vale para a informação sobre J. Para t>0, η cresce com λt até 1 e decresce depois. Portanto, o mínimo em λ está em L ou U. Para 1/U≤t≤1/L, η(L,t) cresce com t, enquanto η(U,t) decresce. Antes desse intervalo, ambas crescem e, depois, ambas decrescem. O máximo do mínimo ocorre no cruzamento, que resolve L² exp(−2Lt)=U² exp(−2Ut). Logo t*=ln(U/L)/(U−L), em s. O logaritmo é adimensional. A integral de 1/x entre L e U demonstra (U−L)/U<ln(U/L)<(U−L)/L, garantindo 1/U<t*<1/L.

Para [1,4] s⁻¹, a avaliação em JavaScript com Math.log e Math.exp deu t*=0,46209812037329684 s e eficiência de 0,6261581536818634 em ambos os extremos. Escolher apenas o ótimo local de U, t=0,25 s, retém 0,28010556689612903 no extremo L. Escolher o ótimo de L, t=1 s, retém 0,039660034826661736 no extremo U. São cálculos de informação sob o modelo, sem amostras biológicas.

## Ensaio executado no Cosmos

O analisador aceitou todas as fórmulas. Z3 verificou consistência, consulta e negação, com limite de 10 s por verificação. Constantes reais. lo=L, hi=U, tt=t e logRazao=ln(U/L). INTERVALO verifica a consequência algébrica das cotas do logaritmo. NOMINAL rejeita a proposição de que o ótimo local de U também é o de L no exemplo. O cruzamento e a monotonicidade foram deduzidos analiticamente, sem representar funções transcendentes no solucionador.

```text
{"id":"INTERVALO","premissas":{"A":"lo > 0 ∧ hi > lo ∧ tt × (hi − lo) = logRazao","B":"lo × logRazao < hi − lo ∧ hi × logRazao > hi − lo"},"alvo":"lo × tt < 1 ∧ hi × tt > 1","esperado":"SEGUE"}
{"id":"NOMINAL","premissas":{"A":"lo = 1 ∧ hi = 4 ∧ hi × tt = 1"},"alvo":"lo × tt = 1","esperado":"CONTRADIZ"}
```

```text
INTERVALO SEGUE [A, B, consulta]
NOMINAL CONTRADIZ [A, consulta]
```

O comando node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/rodada-15-temporaria.mjs terminou com código zero. A eficácia experimental ainda não foi medida. Próximo ponto: acrescentar tempo mínimo de coleta e testar a decisão quando a amplitude precisa ser estimada e a primeira leitura também é ruidosa.

