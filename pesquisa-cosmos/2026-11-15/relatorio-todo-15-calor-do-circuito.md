# 15/11/2026 — Todo 15 — O calor do circuito limita a espera

## Da parábola ao teste

A torre de Lucas 14:28–30 inspira incluir os custos auxiliares no orçamento. A hipótese desta rodada é que a energia consumida na espera, ao aquecer o dispositivo, pode impedir a recuperação térmica de duas formas distintas. A leitura bíblica fornece a pergunta. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Premissas e equações

O modelo retoma a sequência B→espera→A→C de Todo 14. B exige 4 J no pico e deixa 3,5 J de uma reserva inicial de 4 J. A e C exigem 3 J cada. A recupera todo esse valor se começar com excesso térmico θ<1 K e perde os 3 J caso contrário. C recupera tudo. Exigimos a mesma margem operacional de Todo 14, θ≤θ_m=0,8 K antes de iniciar A.

O corpo é descrito por uma temperatura uniforme e tem capacidade térmica C_th>0 em J/K. O banho fica à temperatura T_b fixa. O excesso θ=T_corpo−T_b começa em θ_0=1 K. O circuito usa potência constante P>0 em W durante a espera, com fração f∈[0,1] dissipada como calor no corpo. O restante sai do subsistema e o banho é idealmente mantido fixo. A remoção de calor é linear com condutância G>0 em W/K. Admitimos os mesmos ciclos ideais de Todo 14, sem perdas adicionais da reserva.

C_th·dθ/dt=fP−Gθ. Com k=G/C_th em s⁻¹ e θ_inf=fP/G em K, a solução é θ(t)=θ_inf+(θ_0−θ_inf) exp(−kt). A perda de reserva durante a espera é Pt em J. Como restam 3,5 J depois de B, a espera só pode consumir 0,5 J para que A e C ainda tenham seus 3 J disponíveis com recuperação completa de A.

A troca linear retoma o resfriamento de Newton. Em biologia, as medições de temperatura no antebraço de Pennes são uma conexão para o uso de balanços com fontes de calor e condições de troca. O modelo de um compartimento é uma hipótese do dispositivo. As grandezas e os limites numéricos desta rodada referem-se a esse modelo. [Newton, manuscritos sobre calor](https://newtonproject.ox.ac.uk/view/texts/normalized/NATP00333) · [Pennes, estudo original de 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

## Previsão

Se θ_inf≥θ_m, a margem é inalcançável em tempo finito para θ_0>θ_m. Isso inclui θ_inf=θ_m, pois exp(−kt)>0 em todo tempo finito. Se θ_inf<θ_m, o primeiro instante que atinge a margem é

    t_min = (1/k) ln[(θ_0−θ_inf)/(θ_m−θ_inf)]
    t_max = (0,5 J)/P

Existe uma espera admissível se e somente se θ(t_max)≤θ_m. De fato, quando o equilíbrio está abaixo da margem a trajetória é decrescente. Quando está na margem ou acima dela, tanto a condição de existência quanto a desigualdade no prazo falham. Com a=exp(−k t_max), a condição pode ser escrita

    f ≤ (G/P) (θ_m−aθ_0)/(1−a)

O limite vale junto com 0≤f≤1. Um lado direito negativo elimina todas as escolhas físicas de f, inclusive f=0.

Para C_th=0,5 J/K, G=0,05 W/K e P=0,20 W, resulta t_max=2,5 s e f máximo≈0,0239594. A margem exige que no máximo cerca de **2,396%** da potência consumida vire calor no corpo. O limite assintótico isolado exigiria f<20%, condição mais ampla porque permite espera sem restrição de duração.

| f | θ_inf (K) | θ após 2,5 s (K) | Primeiro instante com θ≤0,8 K (s) | Energia da espera até a margem (J) |
|---:|---:|---:|---:|---:|
| 0% | 0 | 0,7788008 | 2,2314355 | 0,4462871 |
| 2% | 0,08 | 0,7964967 | 2,4512246 | 0,4902449 |
| 5% | 0,20 | 0,8230406 | 2,8768207 | 0,5753641 |
| 20% | 0,80 | 0,9557602 | nenhum instante finito | — |
| 25% | 1,00 | 1,0000000 | nenhum instante | — |

A 5%, o limite de tempo ou de energia exclui a margem exigida. Nesse exemplo, o limiar ideal de recuperação de A, θ<1 K, ainda é satisfeito para qualquer espera positiva. A 25%, θ=1 K durante toda a espera e nem o limiar ideal é satisfeito. Os números foram obtidos por avaliação das fórmulas com math.exp e math.log em Python. Os parâmetros são ilustrativos e a rodada teve apenas cálculo e prova condicional.

## Verificação executada em Cosmos e Z3

O comando abaixo foi executado seis vezes, com JSON UTF-8 via stdin. Cada chamada de satisfatibilidade usa o limite de 10 segundos do script de projeto.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Inclua a premissa comum `theta = rho + (1 − rho) × piso`. Nas fórmulas, theta e piso são os valores numéricos em K de θ(t) e θ_inf, rho representa exp(−kt), limite representa exp(−k t_max), fim é a temperatura no prazo e fracao é o termo (1−rho)θ_inf em K. Nos casos de 2% e 5%, a série alternada de exp(−1/4) entre os graus 5 e 4 dá a inclusão racional a∈[7788/10000,7789/10000]. A relação exponencial e a série são justificativas analíticas externas ao Z3, que verifica somente as fórmulas algébricas sobre reais.

Na matriz, use os três primeiros campos como visao, hipoteses adicionais e tese. Use regras=[] e declare cada identificador da fórmula como símbolo numérico constante com aridade 0. Os três resultados de satisfatibilidade correspondem, em ordem, a premissas, conjunção com tese e conjunção com negação da tese. O último valor é o código de saída real.

```json
[
["EQUILIBRIO_IMPEDE",["rho > 0","rho ≤ 1","piso ≥ 4 / 5"],"theta > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["MENOR_NO_PRAZO",["rho ≥ limite","rho ≤ 1","limite > 0","piso ≥ 0","piso ≤ 1","fim = limite + (1 − limite) × piso"],"theta ≥ fim","SEGUE",["sat","sat","unsat"],0],
["DOIS_POR_CENTO",["rho ≥ 7788 / 10000","rho ≤ 7789 / 10000","piso = 2 / 25"],"theta ≤ 4 / 5","SEGUE",["sat","sat","unsat"],0],
["CINCO_POR_CENTO",["rho ≥ 7788 / 10000","rho ≤ 1","piso = 1 / 5"],"theta ≤ 4 / 5","CONTRADIZ",["sat","unsat","sat"],0],
["TESTE_EQUILIBRIO_E_PRAZO",["rho > 0","rho < 1","piso ≥ 0","fracao = (1 − rho) × piso"],"(theta ≤ 4 / 5 ⟹ rho + fracao ≤ 4 / 5) ∧ (rho + fracao ≤ 4 / 5 ⟹ theta ≤ 4 / 5)","SEGUE",["sat","sat","unsat"],0],
["ORIGEM_TERMICA",["medida = banho + theta","novamedida = medida + origem","novobanho = banho + origem"],"novamedida − novobanho = theta","SEGUE",["sat","sat","unsat"],0]
]
```

O resultado ORIGEM_TERMICA verifica que somar a mesma constante às duas leituras preserva a diferença. Um deslocamento galileano comum de dispositivo e banho deixa inalterado o movimento relativo e, nas condições do modelo, as grandezas internas. Deslocar o dispositivo em relação ao fluido pode alterar G. A identidade do observador não entra na condição de viabilidade, que depende de grandezas físicas e do requisito escolhido de 0,2 K.

## Cobertura e continuidade

A rodada liga Lucas 14 ao custo de espera, à dissipação local e aos dois contraexemplos de viabilidade. Avança Todo 13–14 na parte de balanço térmico, com T09 como tema de gasto de estoque e T01–T03/T11 como contexto da informação parcial. T01–T13 não integram as premissas físicas. Falta testar se G e f variam com θ e separar seus efeitos por ensaios com P=0 e com potência conhecida. O próximo passo é formalizar quais medições distinguem condutância térmica de aquecimento interno.

SHA-256 de Todo 14 conferido nos bytes. `2dd74ad730ac3e88e924b06300ae43edd4ed03572d052da147d40bcc0b5f2a27`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `09693f513023d37e03dc3e57ac105b29535ebf06`. O verificador e a compilação anterior passaram. O deploy anterior falhou em configure-pages. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43671457274).
