# Conexão 06 — conservação, observabilidade e localização dos sensores

Rodada de 11 de novembro de 2026, iniciada às 16h10 no horário de São Paulo.

O resultado desta rodada relaciona uma lei de conservação com a possibilidade de reconstruir partes ocultas de um sistema. Um sensor que mede apenas a quantidade total conservada pode fornecer menos informação sobre a distribuição interna do que um sensor localizado em uma parte. Foram executadas seis consultas no Cosmos, com quatro consequências e duas questões em aberto.

O exemplo é uma troca reversível entre duas populações moleculares ou dois compartimentos bem misturados, em regime determinístico de primeira ordem. Se x₁ e x₂ são quantidades em mol e a,b são taxas conhecidas em s⁻¹,

    dx₁/dt = −a x₁ + b x₂
    dx₂/dt =  a x₁ − b x₂
    a ≥ 0, b ≥ 0, x₁ ≥ 0, x₂ ≥ 0.

A interpretação pode representar a interconversão de duas formas de uma molécula ou transferência entre compartimentos fechados. O total M = x₁+x₂ é constante. Trabalhar com quantidades evita confundir concentração com quantidade quando os volumes são diferentes.

Escolhendo y = x₁ como observação, y é medido em mol e sua derivada em mol/s. Se b > 0,

    x₂ = (dy/dt + a y)/b.

No caso ideal, uma série temporal diferenciável de uma parte contém informação sobre a outra por meio do acoplamento. A matriz de observabilidade do sistema linear tem linhas [1,0] e [−a,b]. Seu determinante é b. OBS6 verificou que dois estados com mesma leitura e mesma derivada, sob a mesma taxa b positiva, têm a mesma segunda componente. A derivação da matriz e sua relação com a trajetória foram apresentadas analiticamente.

Quando b = 0, a leitura obedece y(t) = x₁(0) exp(−at), independentemente de x₂(0). OBS7 encontrou modelos com segunda componente igual e diferente para a mesma leitura e derivada. A trajetória explícita acima demonstra que a ambiguidade continua durante a observação completa, quando o total inicial é desconhecido.

Agora escolha como sensor y = x₁+x₂. Como dy/dt = 0, os estados iniciais (1,2) mol e (2,1) mol produzem a mesma leitura constante de 3 mol, qualquer que seja a evolução interna sob as mesmas taxas. OBS8 confirmou a igualdade do total com estados diferentes. Conhecer o agregado conservado deixa em aberto sua distribuição.

Se M for conhecido e houver também uma leitura de x₁, segue x₂ = M−x₁. OBS9 verificou a unicidade sem exigir b > 0. O conhecimento adicional da conservação e do total inicial resolve a ambiguidade nesse modelo de duas variáveis.

Há uma ligação direta com sistemas biológicos. A escolha de medições determina quais estados ou parâmetros podem ser reconstruídos. Villaverde, Barreiro e Papachristodoulou desenvolveram análise de identificabilidade estrutural mediante métodos de observabilidade para modelos de biologia de sistemas. Liu e colaboradores estudaram a escolha de sensores em redes complexas, incluindo redes de reações. Esses trabalhos dão suporte ao procedimento de formular um modelo, especificar observações e verificar ambiguidades. [Villaverde et al., 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC5085250/) · [Observability of complex systems](https://pmc.ncbi.nlm.nih.gov/articles/PMC3574950/)

A reconstrução ideal pode ser numericamente sensível. Mantendo a,b conhecidos e a leitura y exata, um erro e_d na derivada causa erro e₂ = e_d/b na reconstrução. OBS10 verificou o exemplo b = 0,01 s⁻¹ e e_d = 1 mol/s, que produz e₂ = 100 mol. As magnitudes são ilustrativas. O cálculo evidencia a amplificação inversamente proporcional ao acoplamento. Com erro também em y, a expressão passa a e₂ = (e_d + a e_y)/b, além de efeitos de incerteza nas taxas.

Assim, acoplamento positivo fornece observabilidade estrutural neste modelo, enquanto precisão prática depende de ruído, amostragem e estimação das taxas. Diferenciar medições ruidosas exige um procedimento de estimação apropriado. A relação algébrica é uma ferramenta de análise do limite ideal.

Para o Projeto Tubo, o ponto de conexão é que uma parte pode carregar informações sobre outras partes por suas interações. A inferência depende do mecanismo e da escolha do sensor. “Conhecer o total” e “conhecer a distribuição” correspondem a variáveis distintas. A reconstrução integral deste pequeno modelo não estabelece que um fragmento perceba todos os acontecimentos do Todo. T02 usa um predicado de alcance mais amplo e ainda precisa de um mapeamento operacional para cada domínio.

BASE6 consultou T01–T13 sobre b > 0. A condição e sua negação admitiram modelos, mostrando que a existência de acoplamento informativo é uma hipótese dinâmica adicional. A base permite organizar a relação conceitual, enquanto as equações físicas especificam o que se consegue inferir.

Saída efetiva do ensaio, encerrado com código zero:

    OBS6 SEGUE [A, B, C, consulta]
    OBS7 EM ABERTO
    OBS8 SEGUE [A, consulta]
    OBS9 SEGUE [A, B, consulta]
    OBS10 SEGUE [A, B, consulta]
    BASE6 EM ABERTO

Foram usados analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts. Cada tentativa recebeu limite de 10 segundos. O ensaio confirmou a aceitação integral das fórmulas e verificou a consistência das premissas antes do alvo e sua negação. Os núcleos são os devolvidos pelo solucionador.

As fórmulas exatas seguem. Todas as constantes novas são reais. tubo corresponde à base T01–T13 em autor/projeto-tubo/base-tubo-v1.json.

~~~javascript
const casos = [
{ id: 'OBS6', premissas: { A: 'taxaA ≥ 0 ∧ taxaB > 0', B: 'estadoUm = outroUm', C: '−taxaA × estadoUm + taxaB × estadoDois = −taxaA × outroUm + taxaB × outroDois' }, alvo: 'estadoDois = outroDois', esperado: 'SEGUE' },
{ id: 'OBS7', premissas: { A: 'taxaA ≥ 0 ∧ taxaB = 0', B: 'estadoUm = outroUm ∧ estadoDois ≥ 0 ∧ outroDois ≥ 0', C: '−taxaA × estadoUm + taxaB × estadoDois = −taxaA × outroUm + taxaB × outroDois' }, alvo: 'estadoDois = outroDois', esperado: 'EM ABERTO' },
{ id: 'OBS8', premissas: { A: 'estadoUm = 1 ∧ estadoDois = 2 ∧ outroUm = 2 ∧ outroDois = 1' }, alvo: 'estadoUm + estadoDois = outroUm + outroDois ∧ estadoUm ≠ outroUm', esperado: 'SEGUE' },
{ id: 'OBS9', premissas: { A: 'estadoUm = outroUm', B: 'estadoUm + estadoDois = total ∧ outroUm + outroDois = total' }, alvo: 'estadoDois = outroDois', esperado: 'SEGUE' },
{ id: 'OBS10', premissas: { A: '100 × taxaB = 1 ∧ erroDerivada = 1', B: 'taxaB × erroReconstrucao = erroDerivada' }, alvo: 'erroReconstrucao = 100', esperado: 'SEGUE' },
{ id: 'BASE6', premissas: tubo, alvo: 'taxaB > 0', esperado: 'EM ABERTO' }
]

~~~

O comando executado foi node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-06-temporaria.mjs. SHA-256 do temporário: 7fdd9289e23a3544d2185d5c9242321500fee1c2dea7639f0531bf673bbe9fab. O arquivo foi removido após documentar os resultados.

A eficácia demonstrada localmente é a decisão formal sobre unicidade, ambiguidade e propagação de um erro no modelo. Não houve coleta experimental nova. Um teste empírico pode medir as duas populações ao longo do tempo, ocultar uma delas durante a estimação e comparar a reconstrução com a medida reservada para avaliação. Deve incluir erros de sensor, calibração das taxas e condições iniciais variadas.

O próximo ponto é tratar taxas desconhecidas. A reconstrução acima pressupõe a e b conhecidos. É necessário verificar quais combinações de taxas, estados iniciais e total podem gerar a mesma trajetória e qual informação adicional, intervenção ou sensor remove a ambiguidade. Essa etapa conectará observabilidade de estados à identificabilidade dos mecanismos.
