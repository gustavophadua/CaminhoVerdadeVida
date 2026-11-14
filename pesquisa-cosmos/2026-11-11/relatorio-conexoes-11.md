# 2026-11-11 — 11: Incerteza de calibração e taxas acopladas

O relatório 10 mostrou que a leitura de memória com ganho desconhecido deixa as taxas de adaptação ambíguas. Nesta etapa, uma calibração física com precisão finita fornece um intervalo para o ganho. A pergunta para o Tubo é como representar a incerteza restante sem admitir combinações de taxas incompatíveis com a atividade biológica observada.

A quimiotaxia bacteriana motiva o modelo de feedback integral por meio da análise do circuito de adaptação feita por [Yi et al., PNAS (2000)](https://pmc.ncbi.nlm.nih.gov/articles/PMC18287/). A técnica de procurar simetrias de escala em EDOs de sistemas biológicos foi estudada por [Castro e de Boer, PLOS Computational Biology (2020)](https://pmc.ncbi.nlm.nih.gov/articles/PMC7665633/). O conjunto de taxas abaixo é uma dedução para o modelo reduzido do Tubo.

## Hipóteses e resultado

Para t ≥ 0 em segundos, suponha estados adimensionais e e m, com e(0)=m(0)=0, e′=−ae+bm+d, m′=−ke, e leitura z=gm. As taxas a,b,k são positivas em s⁻¹. O degrau d, em s⁻¹, é constante e não nulo. O ganho g é adimensional, positivo e constante. A calibração independente fornece 0<L≤g≤U<∞. As saídas e,z são ideais, sem ruído. Do relatório 10, a saída identifica R=b/g>0 e H=gk>0 em s⁻¹. Aqui R e H são tratados como conhecidos exatamente.

O conjunto viável é {(Rg,H/g): L≤g≤U}. Equivalentemente, RL≤b≤RU e bk=RH. A necessidade decorre de b=Rg e k=H/g. Para a suficiência, escolha g=b/R, que pertence a [L,U], e use bk=RH para obter k=H/g. Os limites marginais exatos são RL≤b≤RU e H/U≤k≤H/L. Seus extremos são atingidos, mas de forma acoplada. O produto bk tem unidade s⁻² e permanece fixo.

Com L=2, U=4, R=1 s⁻¹ e H=12 s⁻¹, os extremos viáveis são (b,k)=(2,6) e (4,3), com ambas as coordenadas em s⁻¹. O par (4,6) pertence à caixa formada pelos intervalos marginais, mas seu produto é 24 s⁻², enquanto RH=12 s⁻². Isso exclui o par mesmo com as duas margens satisfeitas.

## Ensaio executado

Constantes reais. lo=L, hi=U, rr=R, hh=H, gg=g, bb=b e kk=k. Todas as fórmulas foram aceitas pelo analisador do Cosmos. O adaptador Z3 verificou consistência, consulta e negação, com limite de 10 s por checagem. As fórmulas evitam divisão usando a positividade do ganho.

```text
{"id":"LIM","premissas":{"A":"lo > 0 ∧ lo ≤ gg ∧ gg ≤ hi ∧ rr > 0 ∧ hh > 0 ∧ bb = rr × gg ∧ kk × gg = hh"},"alvo":"rr × lo ≤ bb ∧ bb ≤ rr × hi ∧ kk × lo ≤ hh ∧ hh ≤ kk × hi ∧ bb × kk = rr × hh","esperado":"SEGUE"}
{"id":"CAIXA","premissas":{"A":"lo = 2 ∧ hi = 4 ∧ rr = 1 ∧ hh = 12 ∧ bb = 4 ∧ kk = 6"},"alvo":"rr × lo ≤ bb ∧ bb ≤ rr × hi ∧ kk × lo ≤ hh ∧ hh ≤ kk × hi ∧ bb × kk ≠ rr × hh","esperado":"SEGUE"}
{"id":"INV","premissas":{"A":"lo > 0 ∧ lo ≤ hi ∧ rr > 0 ∧ hh > 0 ∧ rr × lo ≤ bb ∧ bb ≤ rr × hi ∧ bb × kk = rr × hh ∧ gg × rr = bb"},"alvo":"lo ≤ gg ∧ gg ≤ hi ∧ kk × gg = hh","esperado":"SEGUE"}
```

```text
LIM SEGUE [A, consulta]
CAIXA SEGUE [A, consulta]
INV SEGUE [A, consulta]
```

O comando node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-11-temporaria.mjs terminou com código zero. O resultado é condicional ao modelo cinético e à calibração. A eficácia experimental ainda não foi medida. Próximo ensaio: gerar amostras sintéticas com ruído conhecido, ajustar as trajetórias para obter uma região conjunta para (R,H) e avaliar a cobertura das taxas ao combinar essa região com a faixa de ganho.

