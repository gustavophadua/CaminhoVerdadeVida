# Conjunto fechado v1, revelado

**English:** [LEIA-ME.en.md](LEIA-ME.en.md)

Revelado em 11/11/2026, por decisão do dono, antes da terceira medição. Até então só os compromissos estavam publicados
(`avaliacao/conjunto-fechado-v1.json`), com a raiz carimbada no Bitcoin no bloco 973304 (26/10/2026), antes de
qualquer treino.

| Arquivo | O que é |
|---|---|
| `conjunto.jsonl` | os 120 itens, cada um com o sal de 32 bytes e o padrão de raciocínio |
| `gerar.py` | o gerador que fez o conjunto; o vocabulário é sorteado com `os.urandom`, então rodar de novo dá outro conjunto |
| `medicao-1-linha-de-base/` | medição 1: qwen3:4b, pedido formalizacao-v1, 28/10/2026 (respostas, notas, relatório) |
| `medicao-2-pedido-v3/` | medição 2: pedido v3, 29/10/2026 |
| `medicao-2-interrompida/LEIA.txt` | a tentativa interrompida antes de gravar qualquer resposta |
| `medicoes-no-fechado.jsonl` | o registro das medições (o limite combinado era de três) |

## Como conferir

`npx vitest run testes/avaliacao-revelada.test.ts` refaz os 120 compromissos a partir dos itens e dos sais e refaz a
raiz. Também confere que as respostas e as notas das duas medições têm os SHA-256 declarados nos resumos carimbados
(blocos 973562 e 973687). A CI roda esse teste a cada mudança.

Os gabaritos pelo Z3, uma fatia por processo:
`AVALIACAO_PRIVADA=avaliacao/fechado-v1/conjunto.jsonl AVALIACAO_FATIA=0-20 npx vitest run testes/avaliacao.test.ts`,
depois `20-40` e assim por diante.

## O que muda com a revelação

- O conjunto deixa de ser fechado. A terceira medição, reservada ao modelo treinado, não pode mais ser feita às cegas
  nele: uma medição final honesta precisa de um conjunto novo, gerado e carimbado antes do treino.
- As medições 1 e 2 continuam valendo: foram feitas com o conjunto ainda fechado, e os resultados foram carimbados
  antes da revelação.
- Os dados de treino (`treino/dados/`) foram conferidos contra este conjunto antes da revelação, pelo
  `scripts/anti-vazamento.py` (`treino/README.md`).

O que foi mudado: no `medicoes-no-fechado.jsonl`, o campo `saida_pasta` tinha o caminho da pasta no computador do dono e
passou a ter o caminho desta pasta. Os outros arquivos são cópias byte a byte, e o `.gitattributes` os protege de
conversão de fim de linha.
