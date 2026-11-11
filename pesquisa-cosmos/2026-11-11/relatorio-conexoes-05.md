# Conexão 05 — ajuste da confiança no sensor e filtro de Kalman–Bucy

Rodada de 11 de novembro de 2026, iniciada às 15h08, horário de São Paulo.

A investigação resolve a limitação encontrada no relatório 04. Ao permitir ajustar o ganho da leitura, o modelo pode superar a estimativa constante da média mesmo em ruído elevado e finito. O resultado depende de um modelo linear gaussiano com parâmetros conhecidos. Foram executados cinco ensaios no Cosmos e quatro conferências numéricas.

Mantêm-se A > 0 como variância do desvio de concentração, L > 0 como tempo de correlação e B > 0 como intensidade do ruído de observação. A tem unidade concentração², L tem unidade segundo e B tem unidade concentração²·segundo. A formulação estocástica explícita é

    dS = −S dt/L + √(2A/L) dW
    dZ = S dt + √(2B) dV.

W e V são processos de Wiener independentes. S tem média zero conhecida. Z é a observação acumulada, evitando tratar ruído branco como um valor instantâneo ordinário. O estimador usa apenas o histórico disponível até o instante atual.

A teoria de Kalman–Bucy fornece, para esse sistema, a equação de Riccati da variância do erro P,

    dP/dt = −2P/L + 2A/L − P²/(2B).

No regime estacionário, com β = B/(A L) e e = P/A, resulta

    e² + 4βe = 4β
    e = 2/[1 + √(1 + 1/β)].

Foi usada a raiz não negativa. KAL1 demonstrou 0 < e < 1 para qualquer β > 0 finito. Isso significa erro menor que A, o erro da estimativa constante da média. A teoria clássica dá optimalidade quadrática entre estimadores causais no caso linear gaussiano. O Cosmos verificou as consequências algébricas da equação estacionária, sem reconstruir a prova probabilística completa da teoria. [Kalman e Bucy, artigo original de 1961](https://people.duke.edu/~hpgavin/SystemID/References/KalmanBucy-ASME-JBE-1961.pdf)

O estimador estacionário é

    dŜ = −Ŝ dt/L + K(dZ − Ŝ dt)
    K = P/(2B).

Seu núcleo de resposta é uma exponencial com tempo τ e ganho integrado g. Definindo u = τ/L,

    u = √[β/(β+1)]
    g = 1−u
    τ = L u
    e = 2u/(1+u).

KAL2 confirmou 0 < u < 1 e 0 < g < 1. Um ruído maior faz o ganho cair, enquanto τ aproxima-se de L. O sensor passa a influenciar menos a estimativa, que dá maior peso à média conhecida do processo.

A expressão do erro de um filtro exponencial com ganho g é

    J/A = 1 − 2g/(1+u) + g²/(1+u) + βg²/u.

KAL3 verificou que inserir o ganho e o tempo acima produz J/A = e. KAL4 rejeitou e ≥ 1 mesmo quando β ≥ 1. Isso resolve a restrição do relatório 04, cujo filtro tinha ganho fixo igual a um.

| β | τ/L | Ganho g | Erro P/A |
|---:|---:|---:|---:|
| 1/16 | 0,242535625 | 0,757464375 | 0,390388203 |
| 1 | 0,707106781 | 0,292893219 | 0,828427125 |
| 4 | 0,894427191 | 0,105572809 | 0,944271910 |
| 100 | 0,995037190 | 0,004962810 | 0,997512422 |

Os valores foram calculados em Python pela fórmula de u e substituídos na expressão de J/A. O maior resíduo observado foi 1,11 × 10⁻¹⁶, abaixo da tolerância de 10⁻¹². São quatro conferências numéricas, complementares às consultas simbólicas.

No exemplo β = 1/16, o relatório 04 obteve erro mínimo 0,4375 A na família de ganho unitário. O ganho ajustável produz aproximadamente 0,390388 A. Essa melhora é uma previsão matemática do modelo. Para β crescente sem limite, e tende a 1, coerentemente com a perda de informação útil na observação.

A ponte biológica tem precedente em pesquisa sobre circuitos moleculares para filtragem dinâmica. Zechner e colaboradores desenvolveram teoria de filtragem para redes bioquímicas ruidosas. A possibilidade de representar processamento celular por equações de estimação motiva buscar mecanismos que ajustem ganho e tempo de resposta. A realização bioquímica de um ganho ótimo exige uma arquitetura e parâmetros específicos. [Pesquisa primária, Molecular circuits for dynamic noise filtering](https://pubmed.ncbi.nlm.nih.gov/27078094/)

No vocabulário do Tubo, “o valor é limitado ao que se vê” pode receber uma hipótese operacional em termos de precisão da estimativa. O estado interno do fragmento combina informação do sensor com conhecimento sobre a evolução do ambiente. Esse é um mapeamento proposto para o projeto. O resultado não atribui automaticamente o filtro a humanos, sonhos ou Alpha.

A base T01–T13 foi consultada sobre a equação de Riccati estacionária em BASE5. A equação e sua negação admitiram modelos. Portanto, a dinâmica física e o significado mensurável de ganho, memória e erro precisam ser acrescentados como premissas de domínio.

Há uma previsão adicional de identificação de parâmetros. Se o sistema pertencer a essa família ótima, uma medida de g dá u = 1−g e β = u²/(1−u²). Medir também τ dá L = τ/u. Isso ainda fornece apenas B/A = βL. Separar A e B requer uma medida de amplitude ou ruído. Essas relações são rearranjos analíticos apresentados nesta rodada e ainda não foram conferidas em um experimento.

A execução final terminou com código zero e devolveu

    KAL1 SEGUE [K1, K2, consulta]
    KAL2 SEGUE [K1, K2, K3, consulta]
    KAL3 SEGUE [K1, K2, K3, K4, K5, consulta]
    KAL4 CONTRADIZ [K1, K2, consulta]
    BASE5 EM ABERTO

Foram usados analisar, nao e nomesNumericos de src/motor/motor.ts e checarZ3ComNucleo de src/motor/z3.ts. Cada tentativa recebeu 10 segundos. O ensaio verificou a aceitação integral das fórmulas e a consistência das premissas antes de consultar alvo e negação. Os núcleos são os retornados pelo solucionador.

As consultas exatas seguem. As constantes novas são reais. tubo corresponde a T01–T13 carregadas de autor/projeto-tubo/base-tubo-v1.json.

~~~javascript
const casos = [
{ id: 'KAL1', premissas: { K1: 'beta > 0 ∧ erro ≥ 0', K2: 'erro × erro + 4 × beta × erro = 4 × beta' }, alvo: 'erro > 0 ∧ erro < 1', esperado: 'SEGUE' },
{ id: 'KAL2', premissas: { K1: 'beta > 0 ∧ u > 0', K2: 'u × u × (beta + 1) = beta', K3: 'ganho = 1 − u' }, alvo: 'u < 1 ∧ ganho > 0 ∧ ganho < 1', esperado: 'SEGUE' },
{ id: 'KAL3', premissas: { K1: 'beta > 0 ∧ u > 0', K2: 'u × u × (beta + 1) = beta', K3: 'ganho = 1 − u', K4: 'erro × (1 + u) = 2 × u', K5: 'custo × u × (1 + u) = u × (1 + u) − 2 × ganho × u + ganho × ganho × u + beta × ganho × ganho × (1 + u)' }, alvo: 'custo = erro', esperado: 'SEGUE' },
{ id: 'KAL4', premissas: { K1: 'beta ≥ 1 ∧ erro ≥ 0', K2: 'erro × erro + 4 × beta × erro = 4 × beta' }, alvo: 'erro ≥ 1', esperado: 'CONTRADIZ' },
{ id: 'BASE5', premissas: tubo, alvo: 'erro × erro + 4 × beta × erro = 4 × beta', esperado: 'EM ABERTO' }
]

~~~

O comando foi node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-11/rodada-05-temporaria.mjs. SHA-256 do ensaio executado: 51886caf327ac27ac4297d337c74568dcbb5412c878605c24ef66be27c7500d1. O temporário foi removido após documentar seus resultados.

A eficácia demonstrada localmente é a verificação das relações matemáticas e a melhora prevista no modelo. Não houve medida biológica nova. Uma validação exigiria estimar A, B e L em calibração e comparar, em dados separados, erros de filtros com ganho fixo, ganho ajustável e estimativa constante da média. A incerteza dos parâmetros e a violação da hipótese gaussiana devem integrar essa avaliação.

O próximo ponto de pesquisa é a observabilidade. Mesmo um filtro ótimo pode deixar componentes do estado inacessíveis quando diferentes estados produzem a mesma medição. Uma investigação com duas variáveis e um sensor pode testar quais conexões permitem reconstruir o estado e quais deixam ambiguidades, aproximando quantitativamente a ideia do fragmento com acesso parcial ao Todo.
