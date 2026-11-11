# Leis da física no Projeto Tubo

Em 11 de novembro de 2026, a pesquisa cruzou as regras T01–T13 e as equações da Máquina do Tubo com a atualização do autor sobre sono, conservação e concentração em Omega.

O Cosmos verificou 16 cenários com o analisador de fórmulas e o módulo Z3 do próprio projeto. A base T01–T13 é satisfatível isoladamente. Nos outros casos, o motor primeiro confirmou que as premissas admitiam um modelo e então testou a afirmação e sua negação. **Segue** significa que a negação é impossível dentro das premissas. **Contradiz** significa que a afirmação é impossível. **Em aberto** significa que o motor encontrou um modelo para cada resposta. A evidência empírica vem dos estudos citados. As hipóteses novas foram avaliadas como propostas de pesquisa.

## 1. O fragmento humano e o sono

T11 classifica o humano como fragmento. Para testar o ponto observador, usei três variáveis para representar o acesso consciente ao ambiente, a resposta sensorial mensurável e a experiência interna. Interpretei “fechar” como redução do acesso consciente ao ambiente. No ensaio lógico, representei o caso-limite dessa leitura como ausência desse acesso durante o episódio. A formulação científica mais ampla admite gradação, a medir por estágio e estímulo.

- **Resposta ao ambiente.** Registros intracranianos encontraram respostas auditivas em sono REM e NREM, com redução em um marcador de feedback neural. O Cosmos rejeitou a versão que proíbe toda resposta sensorial enquanto o ponto está fechado (BIO3). O estudo distingue resposta neural de percepção consciente do som. [Hayat et al., Nature Neuroscience](https://doi.org/10.1038/s41593-022-01107-4)
- **Experiência interna.** Despertares experimentais produziram relatos de experiências oníricas em REM e NREM. Isso fornece o contraexemplo à regra universal que apaga toda experiência durante o sono (BIO4). O acesso ao sonho foi medido por relato, sujeito à capacidade de recordar. [Siclari et al., Nature Neuroscience](https://doi.org/10.1038/nn.4545)
- **Voltar ao que já colidiu.** Se “colisão” significa uma experiência que deixou um traço de memória, há uma ponte experimental. Conteúdos de uma tarefa de navegação apareceram em alguns relatos após o treino, e outra experiência usou sons durante o sono para reativar seletivamente memórias de objetos. Isso dá suporte à reativação de experiências anteriores. A regra “todo episódio de sono reativa uma memória específica” ficou em aberto (BIO6). [Wamsley et al., Current Biology](https://pmc.ncbi.nlm.nih.gov/articles/PMC2869395/) · [Rudoy et al., Science](https://pmc.ncbi.nlm.nih.gov/articles/PMC2990343/)
- **Por que parece embaçado.** O Cosmos encontrou modelos com e sem relato embaçado sob as mesmas premissas (BIO2). Um teste precisa medir separadamente a nitidez da experiência relatada, o detalhe recordado ao despertar e a incorporação de estímulos externos. A associação proposta é que menor acesso ao ambiente pode alterar o peso dos estímulos externos no sonho. A relação causal com a nitidez segue em aberto. [Siclari et al., Nature Neuroscience](https://doi.org/10.1038/nn.4545) · [Hayat et al., Nature Neuroscience](https://doi.org/10.1038/s41593-022-01107-4)

**Sono e descanso em T04.** O Cosmos rejeitou a regra que faz todo sono biológico implicar o “descanso” da T04, usando T01, T04 e T11 (BIO5). A leitura compatível com a atualização usa `Dorme` para o estado biológico e `Descansa` para a condição do fragmento após a finalização. O metabolismo cerebral permanece ativo durante o sono e varia com o estágio. Assim, o ponto observador pode mudar de estado enquanto o fragmento continua trocando energia. [Base T01–T13](../../autor/projeto-tubo/base-tubo-v1.json) · [Maquet et al., Brain Research](https://pubmed.ncbi.nlm.nih.gov/2350676/)

## 2. Energia que se conserva e energia que pode ser gasta

A Máquina do Tubo já tem a equação `E = R + K + G`. `R` é a reserva, `K` a energia cinética dos fragmentos e `G` o gasto acumulado. Para dar sentido físico ao gasto num ensaio de colisão, interpretei `G` como a energia que passou para formas internas ou canais dissipativos, contabilizados uma vez dentro da fronteira escolhida. Se parte do calor ou da radiação sai dessa fronteira, o balanço do sistema inclui esse fluxo. [Equações da Máquina do Tubo](../../autor/projeto-tubo/equacoes.md) · [Noether, Invariant Variation Problems](https://arxiv.org/abs/physics/0503066)

| Estado do ensaio | Reserva | Movimento | Energia dissipada contabilizada | Total |
|---|---:|---:|---:|---:|
| Antes | 50 J | 30 J | 20 J | 100 J |
| Depois | 50 J | 20 J | 30 J | 100 J |

ENE1 deduziu o balanço e ENE2 rejeitou o aumento do total. A frase “só acrescenta” encaixa nesse ensaio se o que aumenta é a dissipação acumulada ou o registro de possibilidades visitadas. O estoque disponível `R + K` diminuiu de 80 para 70 J. Quando a dissipação vira calor, a capacidade de recuperar trabalho útil depende também do ambiente, das temperaturas e da produção de entropia.

**Lei mecânica que já entra no Tubo.** Para massas iguais, choque unidimensional e impulso externo desprezível, o momento linear da dupla se conserva. Se `e` é o coeficiente de restituição, a redução de energia cinética relativa é `ΔG = (m/4)(1 − e²)(v₁ − v₂)²`. Isso explica por que o número de encontros sozinho não mede o gasto. Um encontro com o dobro da velocidade relativa transfere quatro vezes mais energia, mantendo massa e restituição fixas. Para usar essa ponte no Cosmos, a unidade de `G` deve ser joule e cada encontro deve informar massa, velocidade relativa e restituição. [Derivação e hipóteses da máquina](../../autor/projeto-tubo/equacoes.md)

**Limite cosmológico.** A relatividade geral impõe conservação local covariante, `∇μT^{μν} = 0`. A passagem dessa lei a uma energia total global conservada depende da geometria e de simetrias apropriadas. Para um volume comóvel idealizado no modelo FLRW, a radiação tem densidade proporcional a `a⁻⁴`, e o volume físico cresce como `a³`. Quando o fator de escala dobra, a densidade cai para 1/16 e a energia da radiação daquele volume cai à metade (FIS3). O Cosmos conferiu a aritmética dadas essas relações. Uma equação de reserva global para Alpha é uma premissa adicional do Tubo. [Carroll, Lecture Notes on General Relativity](https://arxiv.org/abs/gr-qc/9712019)

## 3. Cone, concentração e Omega

Há três grandezas que podem aparecer como “raio” no desenho. O **raio da máquina** é função do gasto acumulado. O **cone de luz** descreve quais eventos podem trocar sinais com um evento. O **fator de escala cosmológico** descreve a evolução das distâncias no modelo homogêneo. Cada interpretação dá uma previsão diferente para o que se estreita.

- **Raio da máquina.** Pela regra atual `r = r₀√(1 − G/E)`, o limiar simulado de 99% de gasto dá `r = r₀/10` (MAT2). Com `G = E`, o raio matemático zera. O Cosmos confirmou um cenário em que ele zera após visitar só 60 de 100 possibilidades (MAT1). A contagem precisa de uma definição de possibilidade, identidade de cada evento e regra que diga se repetir uma colisão conta. Um contador finito `n(t)` pode crescer até `N` e ser registrado junto com `G(t)`, em unidades distintas. [Equações e limiar da máquina](../../autor/projeto-tubo/equacoes.md)
- **Concentração local.** Para massa constante `M`, a densidade média é `M/V`. Uma esfera com metade do raio tem um oitavo do volume e oito vezes a densidade média. É uma interpretação física possível de “matéria engole matéria” num sistema que se concentra. Se houver acreção, ejeção ou conversão de massa em radiação, o balanço precisa incluir esses termos. Um Omega com massa positiva num raio literalmente zero é um limite singular desse cálculo. Se Omega representar a concentração de uma região, são necessários uma escala, uma distribuição de massa e um mecanismo dinâmico. [Carroll, capítulos sobre gravitação e cosmologia](https://ned.ipac.caltech.edu/level5/March01/Carroll3/Carroll_contents.html)
- **Concentração de todo o Universo.** No FLRW plano com matéria e radiação não negativas e constante cosmológica estritamente positiva, a equação de Friedmann dá `H² > 0`. Uma história inicialmente em expansão e contínua nesse modelo fica no ramo de expansão, pois a inversão exigiria passar por `H = 0` (FIS2). O DESI DR2 encontra preferência por energia escura variável em algumas combinações de dados. O DES Y6 também oferece medidas para comparar modelos. Esses resultados dão testes para uma hipótese de recontração, cuja previsão de `H(z)` e distâncias ainda precisa ser especificada no Tubo. [Planck](https://arxiv.org/abs/1807.06209) · [DESI DR2](https://arxiv.org/abs/2503.14738) · [DES Y6](https://arxiv.org/abs/2601.14559)
- **Cone do observador.** Na relatividade, o cone passado delimita os eventos dos quais um sinal poderia alcançar o observador. A hipótese do sono trata do acesso a informação externa e a traços internos no cérebro. É possível usar ambos no Cosmos com relações distintas, como `PodeReceberSinal` e `ReativaMemoria`. “Voltar” pode então significar reativar, no presente, um registro de um evento passado. [Carroll, Lecture Notes on General Relativity](https://arxiv.org/abs/gr-qc/9712019) · [Rudoy et al., Science](https://pmc.ncbi.nlm.nih.gov/articles/PMC2990343/)

## 4. Matéria, antimatéria e a regra dos 180°

1. **A anulação geométrica funciona no relógio.** `cos(θ + π) = −cos(θ)`. Duas componentes com a mesma amplitude e fases opostas cancelam a grandeza somada. Na máquina, isso dá uma projeção nula para Alpha.
2. **Aniquilação de partículas conserva energia e momento.** Os 180° do relógio descrevem uma fase do desenho. Os canais físicos dependem das partículas, dos estados e das leis de conservação. T10 é ampla se “vira luz” significar que toda energia vai diretamente a fótons. A descrição do CERN cita píons e raios gama entre produtos de aniquilação. Uma versão com domínio explícito pode representar elétron–pósitron no canal de dois fótons. [CERN, Antimatter](https://home.cern/science/physics/antimatter/)
3. **Quantidades iguais e remoção em pares preservam a igualdade.** Se as quantidades começam iguais e cada encontro subtrai a mesma quantidade das duas, `M − A` continua zero. O Cosmos rejeitou uma sobra de matéria nessas condições (FIS1). Explicar a predominância cósmica da matéria pede uma assimetria inicial ou dinâmica que produza essa diferença. [CERN, Matter–antimatter asymmetry](https://home.cern/largest-matter-antimatter-asymmetry-observed/)
4. **O alcance de “Alpha conhece os valores”.** O Cosmos conferiu que, para quatro resultados prévios `a, a′, b, b′ ∈ {−1,+1}`, o termo CHSH `a(b+b′)+a′(b−b′)` não excede 2 (FIS4). A comparação experimental usa a média sobre a mesma distribuição, com resultados locais e independência das escolhas de medição. Hensen et al. mediram `S = 2,42 ± 0,20`. Uma leitura em que Alpha atribui resultados prévios **locais**, sob essas hipóteses, enfrenta esse limite. A frase de Alpha por si só deixa a implementação física em aberto. [Hensen et al., Nature](https://www.nature.com/articles/nature15759)

## 5. O primeiro cruzamento reproduzível

Para seguir investigando dentro do Cosmos, a tabela indica o que registrar em cada escala e as perguntas que o motor pode responder.

| Domínio | O que registrar | Pergunta que o Cosmos pode checar |
|---|---|---|
| Biologia | Episódio, estágio, estímulo, resposta neural, traço de memória e relato | A hipótese do observador admite resposta auditiva e experiência interna durante o sono? |
| Mecânica | Fronteira do sistema, reserva, movimento, calor e fluxos | O balanço fecha após uma colisão? Quais canais receberam a energia? |
| Matemática do Tubo | Eventos distintos visitados, total de possibilidades, raio e critério de Omega | Zerar o raio força a cobertura completa com as regras propostas? |
| Cosmologia | Significado físico do raio, geometria, componentes e história de expansão | A evolução admite `H = 0`? Que história de expansão e distâncias ela prevê? |

A principal decisão em aberto é **o que define Omega**. Se ele for simultaneamente um estado geométrico e a cobertura de todas as possibilidades, o teste precisa de uma regra de ligação. Um candidato para investigação seria um conjunto finito `P` e um conjunto `V(t) ⊆ P` de possibilidades visitadas. Cobertura significa `V(t) = P`. Fechamento geométrico e cobertura podem ser testados lado a lado. Estabelecer que um implica o outro exigirá uma dinâmica que produza essa implicação.

### Como repetir

Execute este comando na raiz do projeto com as dependências locais instaladas.

```powershell
node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/conferir-tubo.mjs
```

O motor confirmou a consistência da base isolada e encontrou 5 consequências, 7 contradições e 3 casos em aberto. As contradições exibem os grupos retornados pelo solucionador. As regras de sono foram formuladas a partir de estudos separados, representados por episódios distintos. A checagem dos números trabalha com ensaios idealizados. O script registra as premissas de cada caso e falha caso o analisador descarte uma fórmula. [Script da pesquisa](conferir-tubo.mjs) · [Analisador do Cosmos](../../src/motor/motor.ts) · [Integração Z3 do Cosmos](../../src/motor/z3.ts)
