# Conexão 08 — memória do erro, adaptação e limites de compensação

Rodada de 11 de novembro de 2026, iniciada às 17h06, horário de São Paulo.

A conexão desta rodada é a adaptação por realimentação integral. Ela aproxima uma arquitetura biológica estudada experimentalmente da ideia de que o fragmento guarda efeitos de interações anteriores e modifica sua resposta. O resultado é uma equação de memória que elimina, sob condições explícitas, o erro provocado por um estímulo constante.

Barkai e Leibler propuseram um mecanismo de adaptação robusta para a sinalização quimiotática. Yi e colaboradores formularam sua relação com controle integral. Alon e colaboradores apresentaram evidência experimental de robustez da precisão de adaptação em quimiotaxia bacteriana sob alterações de componentes da rede. Esses resultados fornecem um contexto empírico, enquanto o sistema linear abaixo é um modelo reduzido construído para análise. [Barkai e Leibler](https://www.nature.com/articles/43199) · [Yi et al.](https://pmc.ncbi.nlm.nih.gov/articles/PMC18287/) · [Alon et al., experimento](https://www.nature.com/articles/16483)

Defina e=y−r como o desvio da atividade y em relação à referência r. Use atividade e memória m em unidades normalizadas e constantes a,b,k positivas, em s⁻¹. Um estímulo constante d tem unidade s⁻¹ na equação da atividade. Considere

    de/dt = −a e + b m + d
    dm/dt = −k e.

A variável m acumula o desvio histórico, pois m(t)=m(0)−k∫₀ᵗe(u)du. O sinal negativo implementa correção. Uma memória de desvios pode ser assinada em uma linearização, embora quantidades moleculares absolutas tenham limites físicos.

No equilíbrio, dm/dt=0 exige e*=0. A primeira equação determina m*=−d/b. AD1 confirmou esse resultado para qualquer a,b,k positivos. O valor final da saída coincide com a referência, enquanto o estado interno da memória depende do estímulo. A igualdade da saída final pode coexistir com estados internos diferentes.

A existência de um equilíbrio é insuficiente para garantir chegada até ele. Para o sistema linear ideal, a matriz tem polinômio característico

    λ² + aλ + bk.

Como a>0 e bk>0, seus autovalores têm parte real negativa. O equilíbrio é assintoticamente estável. Outra verificação usa z=m−m* e a função

    V=(k e²+b z²)/2
    dV/dt=−ak e²≤0.

AD2 confirmou a identidade da derivada, com mm representando z nessa consulta. Quando e=0, a invariância exige z=0 porque de/dt=bz. Esse argumento completa a conclusão de estabilidade no modelo linear. V é uma função matemática de Lyapunov com as unidades decorrentes da normalização. Ela não foi identificada com energia termodinâmica ou com G do Tubo.

Há dois limites que mudam a conclusão. Se a memória tiver vazamento,

    dm/dt=−k e−ℓm, com ℓ>0,

o equilíbrio passa a obedecer

    e*=ℓd/(aℓ+bk).

AD3 confirmou a equação e o erro estritamente positivo para d>0. A memória com vazamento gera adaptação incompleta neste modelo. O caso ℓ tendendo a zero recupera a adaptação exata para estímulo constante.

Se a memória tiver faixa finita |m|≤M, uma compensação perfeita exige |d|≤bM. Para d>bM, AD4 rejeitou e=0 junto com o balanço estacionário. Um controlador saturado requer uma dinâmica adicional na fronteira para analisar seu comportamento. A consulta demonstra a impossibilidade de compensação exata dentro da faixa, independentemente do tempo de espera.

A conexão com observabilidade é concreta. Uma leitura apenas do valor final y=r perde a informação sobre d, que fica em m*=−d/b. Medir também o estado de memória, com b conhecido, permite recuperar d. Observar o transiente fornece outra via de investigação. Uma saída estável pode representar compensação ativa e armazenamento interno da perturbação.

A interpretação proposta no Cosmos é representar “colisões” passadas por um histórico de desvios que alimenta um mecanismo de correção. As condições a,b,k>0, estímulo constante, ausência de saturação e memória sem vazamento fazem parte do domínio da equação. A aplicação a sono, comportamento humano ou finalização do Todo exige um mapeamento e medidas próprios.

BASE8 consultou T01–T13 sobre a condição de equilíbrio 0=−k e. A afirmação e sua negação admitiram modelos. A base do Tubo, isoladamente, deixa em aberto esse mecanismo.

Saída real da execução, encerrada com código zero:

    AD1 SEGUE [A, B, C, consulta]
    AD2 SEGUE [A, B, C, consulta]
    AD3 SEGUE [A, B, C, consulta]
    AD4 CONTRADIZ [A, B, C, consulta]
    BASE8 EM ABERTO

O ensaio usou analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts. Cada tentativa recebeu 10 segundos. Todas as fórmulas foram aceitas e as premissas foram verificadas quanto à consistência antes da consulta e de sua negação. Os núcleos são os retornados pelo solucionador. Todas as constantes novas são reais.

~~~javascript
const casos = [
{ id: 'AD1', premissas: { A: 'aa > 0 ∧ bb > 0 ∧ kk > 0', B: '0 = −aa × ee + bb × mm + dd', C: '0 = −kk × ee' }, alvo: 'ee = 0 ∧ bb × mm = −dd', esperado: 'SEGUE' },
{ id: 'AD2', premissas: { A: 'aa > 0 ∧ bb > 0 ∧ kk > 0', B: 'velErro = −aa × ee + bb × mm ∧ velMemoria = −kk × ee', C: 'velEnergia = kk × ee × velErro + bb × mm × velMemoria' }, alvo: 'velEnergia = −aa × kk × ee × ee ∧ velEnergia ≤ 0', esperado: 'SEGUE' },
{ id: 'AD3', premissas: { A: 'aa > 0 ∧ bb > 0 ∧ kk > 0 ∧ vazamento > 0 ∧ dd > 0', B: '0 = −aa × ee + bb × mm + dd', C: '0 = −kk × ee − vazamento × mm' }, alvo: 'ee > 0 ∧ (aa × vazamento + bb × kk) × ee = vazamento × dd', esperado: 'SEGUE' },
{ id: 'AD4', premissas: { A: 'aa > 0 ∧ bb > 0 ∧ limite > 0 ∧ dd > bb × limite', B: 'mm ≥ −limite ∧ mm ≤ limite', C: '0 = −aa × ee + bb × mm + dd' }, alvo: 'ee = 0', esperado: 'CONTRADIZ' },
{ id: 'BASE8', premissas: tubo, alvo: '0 = −kk × ee', esperado: 'EM ABERTO' }
]

~~~

O comando executado foi node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-08-temporaria.mjs. O SHA-256 do temporário foi 0b17e8763dbf1de292a97ba1e1c87fba9e8aa2b72ad86b18c60c84c0afbc85b8. O arquivo foi removido após documentar os resultados.

A eficácia formal demonstrada foi a verificação de adaptação no equilíbrio, identidade de Lyapunov e limites por vazamento e saturação. A estabilidade global do sistema linear foi deduzida pelo polinômio característico e pelo argumento de invariância. Não houve experimento novo. A evidência bacteriana citada pertence às pesquisas publicadas e não valida quantitativamente os parâmetros deste modelo reduzido.

Uma validação pode aplicar degraus de estímulo, medir atividade e estado de memória, estimar taxas em um conjunto e testar erro residual em outro. O modelo prevê erro residual proporcional a d quando há vazamento, e um limite de amplitude para compensação perfeita quando há saturação. A precisão final e a velocidade da adaptação devem ser avaliadas separadamente.

O próximo ponto é combinar adaptação e identificabilidade. A saída final perde informação sobre o estímulo justamente quando a adaptação é perfeita. O próximo ensaio deve determinar quais medidas transitórias ou de memória permitem distinguir alteração do estímulo, mudança das taxas e perda de capacidade de compensação.
