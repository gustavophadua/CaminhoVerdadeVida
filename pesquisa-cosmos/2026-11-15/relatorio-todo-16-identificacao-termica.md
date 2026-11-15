# 15/11/2026 — Todo 16 — O que três leituras identificam no Tubo

A parábola da torre sugere perguntar quais quantidades precisam ser conhecidas antes de estimar o custo. No orçamento de Todo 15, a tolerância ao aquecimento depende da condutância e da fração da potência que retorna como calor. A hipótese desta rodada é que uma única série curta de temperatura separa esses parâmetros quando a capacidade térmica é conhecida. A parábola motiva a pergunta experimental. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Modelo e identificação

Em um corpo isotérmico com banho fixo, o excesso θ=T_corpo−T_banho, em K, satisfaz C·dθ/dt=fP−Gθ. C>0 é a capacidade em J/K, G>0 a condutância em W/K, P>0 a potência conhecida em W e f∈[0,1] a fração adimensional dissipada no corpo. Os parâmetros são constantes no intervalo de medida. Supõe-se um termômetro ideal sem atraso. É o modelo de troca linear de Todo 15. O estudo de Pennes sobre temperaturas no antebraço é uma conexão biológica para o problema inverso de inferir mecanismos de troca a partir de temperatura. A hipótese de um corpo isotérmico vale para o dispositivo idealizado desta rodada. [Newton, manuscrito de 1701](https://newtonproject.ox.ac.uk/view/texts/normalized/NATP00333) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/) · [Bellman e Åström, 1970](https://lup.lub.lu.se/search/publication/8867202).

Faça três leituras de excesso θ₀, θ₁, θ₂ no mesmo ensaio com potência P constante, espaçadas de Δt>0 em s. Escreva k=G/C em s⁻¹, s=fP/G em K, r=exp(−kΔt)∈(0,1). Segue que θⱼ₊₁=rθⱼ+(1−r)s. Para θ₁≠θ₀, a segunda diferença é a primeira multiplicada por r. A inversão exata fica

    r = (θ₂−θ₁)/(θ₁−θ₀)
    k = −ln(r)/Δt
    s = (θ₁−rθ₀)/(1−r)
    G = Ck
    f = sG/P

A solução física exige 0<r<1, s≥0 e, se C é conhecido, f≤1. A primeira diferença deve ser diferente de zero e a segunda deve ter mesmo sinal e menor módulo. Com ruído, essas condições não bastam como teste de qualidade. Uma diferença inicial pequena amplifica erros na razão. O resultado é de identificabilidade estrutural para dados exatos.

Um protocolo alternativo usa dois ensaios em vez de três leituras no ensaio ativo. Primeiro desligue a potência, registre θ₀>0 e θ(t)>0 e calcule k=ln[θ₀/θ(t)]/t. Depois, com P>0 fixo, registre a temperatura inicial e uma leitura posterior a tempo conhecido para obter s pela recorrência. Com C conhecido, recupere G e f. O procedimento exige as mesmas condições de troca térmica nos dois ensaios.

## Contraexemplos e execução numérica

Duas leituras θ₀=1 K e θ₁=0,9 K admitem r=0,8 com s=0,5 K, ou r=0,5 com s=0,8 K. Ambos podem ocorrer com Δt=1 s, C=0,1 J/K e P=0,2 W, pois seus valores de f ficam em [0,1]. A terceira leitura prevista é, respectivamente, 0,82 K ou 0,85 K. Em equilíbrio, todas as leituras permanecem iguais a s e nenhuma quantidade de leituras no mesmo regime distingue r. 

Sem C conhecido, todas as curvas previstas em função de P dependem somente de G/C e f/C. Para qualquer multiplicador a>0 com af≤1, a transformação (C,G,f)→(aC,aG,af) preserva a equação para toda potência e condição inicial. Por exemplo, (0,5 J/K, 0,05 W/K, 2%) e (1 J/K, 0,10 W/K, 4%) produzem a mesma série para a mesma potência. O limiar percentual estimado em Todo 15 depende dos parâmetros adotados e não é universal. Para distinguir os dois dispositivos com dados térmicos, uma opção é calibrar C aplicando energia térmica Q conhecida e medindo a elevação Δθ sob a hipótese de perda desprezível durante o pulso e de temperatura uniforme na leitura. Nesse limite, C=Q/Δθ.

Para reproduzir os números em Python, calcule theta=[0.08+0.92*math.exp(-0.1*j) for j in range(3)] e aplique as fórmulas acima com Δt=1 s, P=0,20 W e C=0,5 J/K. A execução gerou θ=[1, 0,9124504245930828, 0,8332322928317433] K, r=0,9048374180359596, G≈0,05 W/K e f≈0,02. São leituras sintéticas do modelo.

## Cosmos e Z3

O comando foi executado cinco vezes, cada uma com JSON UTF-8 via stdin. Cada consulta de satisfatibilidade usa o limite de 10 s do script.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Para reproduzir, use os três primeiros campos como visao, hipoteses e tese. Envie regras=[] e declare cada identificador como símbolo numérico constante de aridade 0. z e a são as primeiras leituras, u e v são as diferenças sucessivas, r e rr os fatores candidatos, s e ss os equilíbrios candidatos. Nos casos de escala, cap e capb são capacidades, g e gb são condutâncias, f e fb são frações, k e kb são taxas de resfriamento e h e hb são razões f/C. Nas leituras com origem deslocada, banho é a temperatura do banho e o a constante somada às leituras. Os resultados sat/unsat correspondem a premissas, premissas com tese e premissas com negação da tese. O último número é o código de saída. A solução da equação diferencial e o logaritmo foram tratados analiticamente, fora do Z3.

```json
[
["PASSO_UNICO",["r > 0","r < 1","rr > 0","rr < 1","u ≠ 0","v = r × u","v = rr × u","a = r × z + (1 − r) × s","a = rr × z + (1 − rr) × ss"],"r = rr ∧ s = ss","SEGUE",["sat","sat","unsat"],0],
["DOIS_PONTOS_AMBIGUOS",["z = 1","a = 9 / 10","r = 4 / 5","rr = 1 / 2","a = r × z + (1 − r) × s","a = rr × z + (1 − rr) × ss"],"s = ss","CONTRADIZ",["sat","unsat","sat"],0],
["EQUILIBRIO_AMBIGUO",["z = 1 / 2","s = z","ss = z","r = 1 / 2","rr = 3 / 4","a = r × z + (1 − r) × s","aa = rr × z + (1 − rr) × ss"],"a = aa ∧ r ≠ rr","SEGUE",["sat","sat","unsat"],0],
["ESCALA_OCULTA",["cap = 1 / 2","g = 1 / 20","f = 1 / 50","capb = 2 × cap","gb = 2 × g","fb = 2 × f","k × cap = g","kb × capb = gb","h × cap = f","hb × capb = fb"],"k = kb ∧ h = hb ∧ f ≠ fb","SEGUE",["sat","sat","unsat"],0],
["MUDANCA_DE_ORIGEM",["z = m − banho","a = mm − banho","zc = (m + o) − (banho + o)","ac = (mm + o) − (banho + o)"],"zc = z ∧ ac − zc = a − z","SEGUE",["sat","sat","unsat"],0]
]
```

A mesma mudança de origem nas leituras do corpo e do banho preserva θ e suas diferenças. Um deslocamento galileano comum de corpo e banho também preserva a velocidade relativa que entra nas condições de troca, enquanto movimento relativo pode mudar G. A degenerescência permanece para qualquer observador que tenha acesso apenas à mesma série térmica.

Cobertura desta rodada. Todo 15 → identificação da troca térmica e da dissipação, com T01–T03 como contexto da observação parcial e T09 como contexto de gasto de reserva. As regras do Tubo não foram usadas como premissas físicas. Próximo passo: propagar incertezas de temperatura e de C até a decisão sobre a margem de 0,8 K, com atenção à diferença pequena entre f=2% e o limite nominal de 2,396%.

SHA-256 de Todo 15 conferido nos bytes. `d6b3991295cd2c9effb380b7a1354d3a3ec6d7bb6700aaa3326a4e5d1fff0b05`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `58ee389712cdaf5a478e9baf501cfaa73683cf90`. O verificador e a compilação anteriores passaram. A consulta do site Pages no deploy anterior retornou Not Found. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43673675374).
