# 15/11/2026 — Todo 21 — Repetição de leituras e erro comum de calibração

A parábola da torre motiva perguntar se repetir uma medida melhora a decisão sobre o custo de iniciar o próximo ciclo. No Tubo, a hipótese é que ensaios repetidos que compartilham uma calibração reduzem o ruído de leitura, mas preservam a componente de erro da calibração. A relação com a parábola é interpretativa. [Lucas 14:28–30](https://www.biblegateway.com/passage/?search=Luke+14%3A28-30&version=KJV).

## Balanço e modelo

Retomo a sequência B→espera→A→C, com reserva inicial de 4 J, custo de espera de 0,20 W, prazo de 2,5 s e requisito θ≤0,8 K antes de iniciar A. θ é o excesso de temperatura do corpo em relação ao banho. Para compensar o atraso no termômetro, uso o estimador regressivo do Todo 20 com passo h=0,5 s e tempo de resposta τ=0,1 s. Defina a=τ/h=0,2. Em cada repetição i, as leituras m₀ᵢ e m₁ᵢ correspondem aos mesmos instantes relativos. A média é tomada sobre ensaios com a mesma trajetória térmica, evitando misturar temperaturas de tempos diferentes.

    m₀ᵢ = y₀ + B + E₀ᵢ
    m₁ᵢ = y₁ + B + E₁ᵢ
    Xᵢ = (1+a)m₀ᵢ − a m₁ᵢ
    Xᵢ = X₀ + B + (1+a)E₀ᵢ − a E₁ᵢ
    X₀ = (1+a)y₀ − a y₁.

Todas as temperaturas, os ruídos E e o erro B estão em K. y₀, y₁ e X₀ são valores ideais para a trajetória comum. B é o erro de nível no canal de excesso térmico. Um desvio aditivo que fosse rigorosamente igual nos canais de corpo e banho já seria eliminado ao formar o excesso. Aqui B representa o desvio que ainda resta nesse excesso. No modelo probabilístico, B é comum aos n ensaios sob uma mesma calibração, com média zero e variância u_B² entre calibrações hipotéticas. Os E são centrados, independentes entre si e independentes de B, com variância σ². Esses são pressupostos sobre o instrumento. A propagação por covariância é o mecanismo da comparação. A medição térmica em tecido de Pennes é uma conexão experimental em biologia para documentar referências e canais de temperatura. [JCGM 100:2008, §5.2](https://www.bipm.org/documents/20126/2071204/JCGM_100_2008_E.pdf) · [Pennes, 1948](https://pubmed.ncbi.nlm.nih.gov/18887578/).

Como os pesos somam um, B se cancela na diferença m₀ᵢ−m₁ᵢ e permanece na estimativa do nível. A variância da média de n estimativas, em K², é

    Var(X̄) = u_B² + σ²[(1+a)²+a²]/n
            = u_B² + 1,48 σ²/n.

O termo comum resulta das covariâncias Cov(Xᵢ,Xⱼ)=u_B² quando i≠j. Para um erro fixo b, em vez do modelo probabilístico de B, vale E[X̄ | B=b]=X₀+b. Por exemplo, b=+5 mK desloca uma estimativa nominal de 0,7963 K para 0,8013 K, ainda que a parte aleatória tenha média zero. O Z3 verificou que esses dois valores estão em lados opostos de 0,8 K.

## Correção por referência

Se uma referência com valor conhecido p mede R=p+B+E_ref na mesma calibração, a estimativa corrigida é X̄−(R−p). A componente B se cancela. Com E_ref independente dos demais erros, centrado e com variância u_ref², o desvio padrão da correção fica √(u_ref²+1,48σ²/n). A fórmula já inclui que uma única referência é compartilhada por todos os ensaios. Se os erros comuns no ensaio e na referência forem b e b_c, resta b−b_c. O solver confirmou que uma deriva de 4 mK entre os dois pode manter o valor corrigido acima de 0,8 K mesmo quando o nominal é 0,7963 K.

Para ilustrar, adotei σ=1 mK, u_B=2,5 mK e u_ref=0,5 mK. Usei X₀=0,7963127333 K e o limite de discretização d=0,25 mK, obtidos no Todo 20. Supondo gaussianos independentes B, E e E_ref, médias nulas e variâncias conhecidas, U=X̄+d+z₀․₉₅·sd(X̄), ou a forma corrigida correspondente, dá limite unilateral de cobertura de pelo menos 95% sobre o θ real em repetições que também renovam a calibração ou a referência. z₀․₉₅≈1,64485. A cobertura se apoia no limite de discretização e no modelo probabilístico completo. Para uma calibração do dia com b fixo e desconhecido, essa interpretação de cobertura requer hipóteses adicionais.

| Cenário sintético | n | Desvio padrão da estimativa | U quando a estimativa está no nominal |
|---|---:|---:|---:|
| Calibração compartilhada | 16 | 2,518 mK | 0,800705 K |
| Calibração compartilhada | 100 | 2,503 mK | 0,800680 K |
| Calibração compartilhada, limite de repetições | ∞ | 2,500 mK | 0,800675 K |
| Referência com o mesmo erro B, após correção | 16 | 0,585 mK | 0,797525 K |

A tabela mostra a decisão para uma estimativa observada igual ao valor nominal, não a probabilidade de aprovação de um ensaio. No cenário escolhido, aumentar n sempre deixa esse limite nominal acima de 0,8 K quando o erro comum de 2,5 mK permanece. A referência reduz o erro compartilhado sob a hipótese de mesma calibração. Os números são sintéticos.

## Execução verificável

Executei cinco consultas pelo analisador Cosmos e Z3, com JSON UTF-8 via stdin. O script tem timeout de 10 s por verificação de satisfatibilidade.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs

Use os três primeiros campos de cada linha como visao, hipoteses e tese. Use regras=[] e declare cada identificador como símbolo constante numérico de aridade 0. Os três estados são satisfatibilidade das premissas, das premissas com a tese e das premissas com sua negação. O último campo é o código de saída. Em PISO_VARIANCIA, comum é u_B², residuo é 1,48σ² e v é a variância total.

```json
[
["VIES_PERSISTE",["estim = (1 + a) × x − a × y","comvies = (1 + a) × (x + b) − a × (y + b)"],"comvies − estim = b","SEGUE",["sat","sat","unsat"],0],
["REFERENCIA_CANCELA",["ref = padrao + b + erro","estim = (1 + a) × (x + b) − a × (y + b)","real = (1 + a) × x − a × y"],"estim − (ref − padrao) = real − erro","SEGUE",["sat","sat","unsat"],0],
["PISO_VARIANCIA",["n > 0","comum > 0","residuo ≥ 0","n × (v − comum) = residuo"],"v ≥ comum","SEGUE",["sat","sat","unsat"],0],
["MEDIA_INVERTE_DECISAO",["ideal = 7963 / 10000","b = 5 / 1000","estim = ideal + b"],"ideal ≤ 4 / 5 ∧ estim > 4 / 5","SEGUE",["sat","sat","unsat"],0],
["REFERENCIA_COM_DERIVA",["b = 5 / 1000","bc = 1 / 1000","ideal = 7963 / 10000","corrigida = ideal + b − bc"],"corrigida > 4 / 5","SEGUE",["sat","sat","unsat"],0]
]
```

Em Python, usei statistics.NormalDist().inv_cdf(.95) e math.sqrt(uc**2+1.48e-6/n), com uc=0.0025 para calibração comum ou 0.0005 para a referência. Somei 0.00025 e 1,64485 desvios padrão ao nominal, usando o quantil calculado sem arredondamento. A expansão de variância e o cálculo do quantil ficaram fora do Z3. O solver verificou persistência do viés, eliminação por referência, limite inferior da variância e os dois contraexemplos.

A escolha comum de zero para as temperaturas do corpo, do banho e do padrão deixa as diferenças iguais. Na mesma trajetória, o erro de calibração ainda presente no excesso mantém coeficiente um, conforme VIES_PERSISTE. Um deslocamento galileano comum aos elementos mantém os tempos e velocidades relativos usados no modelo. Alterar o acoplamento, o instrumento ou sua referência pode mudar B, σ ou τ. A identidade de quem observa fica fora da equação.

Cobertura incremental. Lucas 14 → margem para iniciar A → erros compartilhados na reconstrução → limite por covariância → contraexemplo com referência que deriva. A conexão estende Todo 17–20. T02–T03 contextualizam a informação parcial e T09 a reserva. A rodada deixa aberta a medição da covariância real e a estabilidade da referência. Próximo ponto: testar um protocolo com referência antes e depois do ensaio para separar um desvio constante de uma deriva aproximadamente linear.

SHA-256 de Todo 20 conferido nos bytes. `a3c24f1569f4534ad3e9aed5e8279d0efefc0dff3f1a5e6063604c8db0cb13e4`.

SHA-256 do BOOK conferido nos bytes. `27d270c9f5268bf7be22c28d640aeba14b0f0e14c8836996e60921c7021dcab1`.

Commit remoto de partida `72691eae04dede16814d2bd3a6811e0461ca57c2`. O verificador anterior passou e o workflow de Pages anterior terminou cancelado. [Workflow anterior](https://github.com/gustavophadua/CaminhoVerdadeVida/actions/runs/43684519059).
