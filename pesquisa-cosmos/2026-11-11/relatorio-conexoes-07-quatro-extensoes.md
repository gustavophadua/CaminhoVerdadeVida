# Relatório 07 — quatro extensões do Cosmos

11 de novembro de 2026. Investigação solicitada sobre identificabilidade, redes com N compartimentos, ganho temporal e custo crescente. Foram executadas seis consultas no Cosmos, enumeração exata dos sensores em duas redes de quatro nós e integração numérica de Riccati.

## Taxas desconhecidas e trajetórias indistinguíveis

Para o sistema fechado dx₁/dt = −a x₁ + b x₂, dx₂/dt = a x₁ − b x₂, com saída y=x₁, o total M=x₁+x₂ é constante. Defina s=a+b>0 e c=bM/s. Então

    y(t)=c+[y₀−c] exp(−st).

Taxas têm unidade s⁻¹ e quantidades têm unidade mol. Uma trajetória ideal não constante identifica y₀, s e c. A decomposição em a,b,M continua ambígua. Para y₀,c positivos e y₀≠c, toda escolha

    M ≥ max(y₀,c)
    b = sc/M
    a = s−b
    x₁(0)=y₀
    x₂(0)=M−y₀

produz a mesma trajetória, com taxas e quantidades não negativas. Se forem exigidas taxas e quantidades estritamente positivas, as desigualdades correspondentes devem ser estritas. Casos c=0 ou taxas nulas precisam ser tratados pela equação original.

Exemplo com y₀=1 mol e c=2 mol:

    (a,b,x₁(0),x₂(0)) = (1,1,1,3)
    (a,b,x₁(0),x₂(0)) = (1,5; 0,5; 1; 7)

As duas escolhas dão s=2 s⁻¹ e bM=4 mol/s, portanto y(t)=2−exp(−2t) mol. ID2 confirmou as combinações invariantes. ID1 rejeitou uma tentativa de alterar b e M sem compensar a, porque então a+b muda. Esses testes conferem as relações algébricas que entram na solução da equação diferencial.

Conhecer M>0 resolve a ambiguidade para uma trajetória não constante, pois b=sc/M e a=s−b. ID3 confirmou unicidade das taxas a partir de s e bM quando M é comum e positivo. Medir x₂ em um instante junto com x₁ determina M.

Na condição de equilíbrio y₀=c, a trajetória é constante. Ela fornece apenas bM=(a+b)y₀. Mesmo conhecer M não determina a escala temporal a+b. Uma perturbação conhecida que gere um transiente, com condições iniciais controladas, pode fornecer essa informação. Esse é um resultado de identificabilidade estrutural sob medidas ideais. Ruído e amostragem finita acrescentam problemas práticos.

O uso de observabilidade ampliada para estudar parâmetros é desenvolvido por Villaverde e colaboradores. A família indistinguível acima foi derivada especificamente para o modelo do projeto. [Fonte primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC5085250/)

## Quantos sensores para N compartimentos

Para dx/dt=A x e y=C x, com A conhecida, a reconstrução de estados requer posto N da matriz

    O = [C; CA; CA²; …; CA^(N−1)].

Foi considerada a seleção de sensores locais, cada qual medindo diretamente uma coordenada. O mínimo é o menor número de linhas de C, dentre essas escolhas, que produz posto N. A quantidade depende da dinâmica, das simetrias e das observações permitidas.

Duas redes com quatro compartimentos foram verificadas por eliminação de Gauss usando frações exatas, enumerando todos os 15 subconjuntos não vazios de sensores em cada rede.

    Cadeia irreversível, taxas iguais a 1 s⁻¹:
    A = [[−1,0,0,0],[1,−1,0,0],[0,1,−1,0],[0,0,1,0]]

    Rede completamente conectada, taxas iguais a 1 s⁻¹:
    A = J − 4I, com J contendo somente uns.

| Rede | Medição | Posto obtido |
|---|---|---:|
| Cadeia | somente x₁ | 1 |
| Cadeia | somente x₂ | 2 |
| Cadeia | somente x₃ | 3 |
| Cadeia | somente x₄ | 4 |
| Simétrica | qualquer coordenada | 2 |
| Simétrica | quaisquer duas coordenadas | 3 |
| Simétrica | quaisquer três coordenadas | 4 |

Portanto, o mínimo foi um sensor para a cadeia e três para a rede simétrica. As contagens presumem total inicial desconhecido. Se o total for conhecido, essa informação deve ser incluída no problema.

Para a rede simétrica geral A=k(J−NI), k>0, a matriz tem dois modos temporais distintos e um subespaço de diferenças com autovalor repetido −Nk. Com m sensores locais, 1≤m<N, o espaço observado tem dimensão m+1. São necessários N−1 sensores locais para N≥2. Com todos os nós isolados e A=0, cada coordenada desconhecida precisa de sua própria medição. Assim, N sozinho não determina o número de sensores.

Liu et al. estudam sensores a partir da estrutura e das leis dinâmicas. As condições gráficas devem ser confrontadas com a dinâmica efetiva, especialmente com simetrias e parâmetros especiais. [Fonte primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC3574950/)

## Kalman com ganho variável no tempo

Para dS=−S dt/L+√Q dW e dZ=S dt+√R dV, com ruídos independentes,

    dP/dt = −2P/L + Q − P²/R
    K(t) = P(t)/R(t)
    dŜ = −Ŝ dt/L + K(t)[dZ−Ŝ dt].

P tem unidade concentração², Q concentração²/s, R concentração²·s, K s⁻¹ e L s. Aqui Q=2A/L e R=2B recuperam o modelo das rodadas anteriores.

Se R aumenta instantaneamente, P permanece contínuo. K diminui naquele instante. KALG confirmou essa desigualdade. A mesma mudança aumenta dP/dt para P>0, confirmada em KALT. A estimativa passa a confiar menos na observação ruidosa e sua incerteza evolui até o novo regime.

Um ensaio usou A=L=1, Q=2 e estado inicial no regime de B=1/16, com P(0)=0,3903882032. Após elevar B para 1, R passou a 2.

| Instante após a mudança | P |
|---|---:|
| 0 s | 0,3903882032 |
| 1 s | 0,8005019272 |
| 5 s | 0,8284267822 |
| Limite estacionário analítico | 0,8284271247 |

K caiu de aproximadamente 3,1231 s⁻¹ para 0,19519 s⁻¹ na mudança e tende a 0,41421 s⁻¹. A integração RK4 foi feita com passos de 0,001 s e 0,0005 s. A diferença máxima entre os valores amostrados em 1 e 5 s foi 3,47 × 10⁻¹⁴. Essa é uma comparação de discretizações nos pontos registrados.

O filtro temporal pressupõe que as estatísticas e sua mudança sejam conhecidas. Aprender R ou Q a partir de dados exige um mecanismo adicional de adaptação. A associação com adaptação biológica é uma hipótese de implementação. O teste demonstra a resposta matemática a uma mudança conhecida. [Kalman e Bucy, fonte primária](https://people.duke.edu/~hpgavin/SystemID/References/KalmanBucy-ASME-JBE-1961.pdf)

## Custo crescente e otimização

É preciso especificar se q representa custo marginal ou médio. Para custo da j-ésima amostra q_j=q₀+α(j−1), com q₀>0 e α>0 em joules por incremento de contagem,

    C(n)=Σ q_j = n q₀ + α n(n−1)/2.

O orçamento é C(n)≤E. Se L_s é um limite inteiro de amostras disponíveis, e o benefício cresce com n,

    n_max = min(L_s, piso[r])
    r = [−(q₀−α/2)+√((q₀−α/2)²+2αE)]/α.

No limite α=0, recupera-se piso(E/q₀). Para q₀=2 J, α=1 J e E=20 J, C(5)=20 J e C(6)=27 J. O Cosmos confirmou a fronteira no caso CUSTO. Assim, o máximo é cinco quando L_s≥5. Multiplicar cinco pelo custo da quinta amostra daria 30 J, pois atribuiria retroativamente o último custo a todas as amostras.

Se q(n)=q₀+αn representar custo marginal contínuo, C(n)=q₀n+αn²/2. Já se q(n) for custo médio, C(n)=nq(n). Essas convenções geram problemas diferentes e precisam acompanhar o relatório.

Para explicitar um compromisso entre erro e consumo, uma proposta é minimizar

    F(n)=D/n+λ C(n), n>0,
    F'(n)=−D/n²+λ(q₀+αn).

Aqui D>0 parametriza o erro de amostragem e λ>0 converte joules em unidades desse erro. No modelo contínuo marginal, F''(n)=2D/n³+λα>0, portanto há um único mínimo sem restrições, dado por λ n²(q₀+αn)=D. Com limites sensorial e energético, restringe-se o domínio e, para contagem inteira, comparam-se os inteiros viáveis vizinhos. Essa derivação convexa foi analítica. O ensaio Z3 desta rodada verificou o exemplo discreto de orçamento.

O custo crescente e a função D/n são hipóteses de pesquisa. Govern e ten Wolde mostram como combustível, tempo/receptores e moléculas de leitura restringem arquiteturas de sensoriamento celular, fornecendo uma base para medir esses custos. [Fonte primária](https://pmc.ncbi.nlm.nih.gov/articles/PMC4267345/)

## Evidência e reprodução

Saída efetiva do Cosmos, encerrada com código zero:

    ID1 CONTRADIZ [A, consulta]
    ID2 SEGUE [A, consulta]
    ID3 SEGUE [A, B, consulta]
    KALT SEGUE [A, B, C, consulta]
    KALG SEGUE [A, B, consulta]
    CUSTO SEGUE [A, B, consulta]

Foi usado o analisador de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts, com limite de 10 segundos por tentativa, aceitação integral das fórmulas e consistência das premissas antes da consulta e de sua negação. As constantes novas foram declaradas reais.

~~~javascript
const casos = [
{ id: 'ID1', premissas: { A: 'aa = 1 ∧ bb = 1 ∧ mm = 4 ∧ aaOutro = 1 ∧ 2 × bbOutro = 1 ∧ mmOutro = 8' }, alvo: 'bb × mm = bbOutro × mmOutro ∧ aa + bb = aaOutro + bbOutro', esperado: 'CONTRADIZ' },
{ id: 'ID2', premissas: { A: 'aa = 1 ∧ bb = 1 ∧ mm = 4 ∧ 2 × aaOutro = 3 ∧ 2 × bbOutro = 1 ∧ mmOutro = 8' }, alvo: 'bb × mm = bbOutro × mmOutro ∧ aa + bb = aaOutro + bbOutro', esperado: 'SEGUE' },
{ id: 'ID3', premissas: { A: 'mm > 0 ∧ bb × mm = bbOutro × mm', B: 'aa + bb = aaOutro + bbOutro' }, alvo: 'aa = aaOutro ∧ bb = bbOutro', esperado: 'SEGUE' },
{ id: 'KALT', premissas: { A: 'pp > 0 ∧ rrNovo > rr ∧ rr > 0 ∧ ll > 0', B: 'velha × ll × rr = −2 × pp × rr + qq × ll × rr − pp × pp × ll', C: 'nova × ll × rrNovo = −2 × pp × rrNovo + qq × ll × rrNovo − pp × pp × ll' }, alvo: 'nova > velha', esperado: 'SEGUE' },
{ id: 'KALG', premissas: { A: 'pp > 0 ∧ rrNovo > rr ∧ rr > 0', B: 'velha × rr = pp ∧ nova × rrNovo = pp' }, alvo: 'nova < velha', esperado: 'SEGUE' },
{ id: 'CUSTO', premissas: { A: '2 × custo = 2 × 5 × 2 + 5 × 4', B: '2 × custoSeis = 2 × 6 × 2 + 6 × 5' }, alvo: 'custo = 20 ∧ custoSeis > 20', esperado: 'SEGUE' }
]

~~~

O ensaio temporário teve SHA-256 f61114e24ba5465e89391cf415bc9d32750f78e92cf131917b424966e7388067. Foi executado com node --preserve-symlinks --preserve-symlinks-main e removido após este registro.

Os postos das redes foram calculados separadamente com aritmética racional exata, e a evolução temporal por integração numérica. As famílias de trajetórias, fórmulas gerais de custo e extensão para N foram derivadas analiticamente. Essas distinções indicam o alcance de cada verificação. Não houve coleta experimental nova.

No Cosmos, as quatro extensões dão significados mensuráveis a mecanismo desconhecido, visão parcial, mudança de confiança e gasto acumulado. Sua aplicação empírica depende de calibrar o domínio de cada equação. Os próximos testes devem escolher uma arquitetura biológica concreta e dados de entrada, observação e consumo, mantendo dados separados para validação.
