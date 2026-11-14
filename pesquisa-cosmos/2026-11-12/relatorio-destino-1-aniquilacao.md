# 12/11/2026 — # 12/11/2026 — Destino 1: quando a energia do par sai como luz

Na lógica do Todo, o Destino 1 começa quando a interação deixa um “recibo” que o fragmento consegue observar fora da região da colisão. Um caso físico concreto é a aniquilação elétron–pósitron no canal de dois fótons. É uma referência experimental para a etapa de emissão do Axioma 6. A interpretação cosmológica do Destino 1 continua sendo uma hipótese do projeto.

## Um processo, uma previsão

Prepare conceitualmente um par isolado, com momento total zero no referencial do centro de momento. Considere o canal final de exatamente dois fótons e energia cinética inicial desprezível. A energia disponível é aproximadamente E=2mₑc², com massa em kg, c em m/s e energia em joules. Em espectroscopia, mₑc² ≈ 511 keV e E ≈ 1,022 MeV. Se o par tiver energia cinética apreciável, use a energia total E no centro de momento.

A conservação do momento exige **p**₁+**p**₂=0. Como Eᵢ=c|**p**ᵢ| para um fóton, segue que E₁=E₂=E/2. O recibo previsto é uma coincidência de dois fótons de aproximadamente 511 keV, em direções opostas no limite de par lento. Movimento do centro de momento e resposta dos detectores podem alargar a medida. O estudo primário abaixo mediu o desvio angular em um material absorvedor e o relacionou ao movimento dos pares. [DeBenedetti, Cowan, Konneker e Primakoff, Physical Review, 1950](https://journals.aps.org/pr/abstract/10.1103/PhysRev.77.205)

## O que o fragmento consegue inferir

Um detector pode registrar apenas um fóton. Essa leitura parcial não demonstra que a interação produziu um único fóton. Se todo o estado final do par isolado fosse um só fóton, ele precisaria carregar energia positiva e momento total zero ao mesmo tempo. Isso contradiz Eγ=c|**p**γ|. Um meio ou outro corpo de recuo mudaria as hipóteses.

Cada fóton tem massa de repouso zero. O par de fótons em direções opostas tem massa invariante M=E/c²>0, pois seu momento total é zero. Assim, a formulação física para este caso é **a energia sai da região como radiação**. A massa invariante do sistema completo se conserva. Essa distinção é importante para o Tubo: a energia pode deixar a região observada sem sair do Todo. O ensaio também não requer um estado de repouso da luz.

## Verificação executada

O analisador do Cosmos aceitou as fórmulas e o Z3 verificou as premissas, a consulta e sua negação. Os símbolos pUm e pDois representam módulos do momento. A condição de que os vetores são opostos foi deduzida da conservação vetorial e entra no caso DOIS como igualdade dos módulos. luz representa c>0 e mm é a massa invariante do par de fótons no caso MASSA.

```text
{"id":"DOIS","premissas":{"A":"ee > 0 ∧ luz > 0","B":"eUm + eDois = ee ∧ eUm = luz × pUm ∧ eDois = luz × pDois","C":"pUm = pDois ∧ pUm > 0"},"alvo":"2 × eUm = ee ∧ 2 × eDois = ee","esperado":"SEGUE"}
{"id":"UM","premissas":{"A":"ee > 0 ∧ luz > 0 ∧ eUm = ee","B":"eUm = luz × pUm ∧ pUm ≥ 0"},"alvo":"pUm = 0","esperado":"CONTRADIZ"}
{"id":"MASSA","premissas":{"A":"eUm > 0 ∧ luz > 0 ∧ mm ≥ 0","B":"mm × mm × luz × luz × luz × luz = 4 × eUm × eUm"},"alvo":"mm > 0 ∧ mm × luz × luz = 2 × eUm","esperado":"SEGUE"}
```

```text
DOIS SEGUE [B, C, consulta]
UM CONTRADIZ [A, B, consulta]
MASSA SEGUE [A, B, consulta]
```

Comando executado com código zero: node --preserve-symlinks --preserve-symlinks-main pesquisa-cosmos/2026-11-12/destino-1-ensaio-temporario.mjs.

## Próximo teste do Tubo

Usar a coincidência em energia e direção como referência para simular um observador com cobertura parcial. Comparar a soma das energias detectadas em eventos com dois fótons e com um só. A previsão é que a fração detectada pode ficar abaixo de 100% mesmo quando toda a energia do canal físico é radiativa. Para distinguir uma hipótese própria do Tubo ou ligá-la à teoria das cordas, será necessária uma previsão adicional observável que difira da descrição convencional. Nenhum experimento físico novo foi executado nesta rodada.

