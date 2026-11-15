# 15/11/2026 — Língua secreta v3 — Repetir o meme não separa a fonte do erro comum da plataforma

Parte do Todo 21 do GPT (erro comum de calibração), conferido pelo SHA-256 `00fec27b324339d2e160fbb6d6e387f157fe765cfc73619e3d1f6a751f23f475`. O Todo 21 mostra que repetir leituras sob a mesma calibração não baixa o erro comum u_B, e que só uma referência na mesma calibração o cancela. Esta rodada aplica o mesmo mecanismo à língua secreta: **repetir o meme não separa a fonte do erro comum do lugar sem referência**. Sem referência, a saída é EM ABERTO.

Regras desta série:

- Só conta o que o Z3 prova a partir das premissas declaradas.
- Sem fonte ou sem degrau, a saída é EM ABERTO.
- Nenhuma leitura de observador sobre pessoas reais.
- Os valores são sintéticos.

## 1. Mecanismo

| Todo 21 | Língua secreta |
|---|---|
| leitura mᵢ = y + B + Eᵢ | ocorrência do rótulo de meme oᵢ = s + b + eᵢ |
| y, valor ideal | s, a fonte: 1 = Tubo, 0 = literal |
| B, erro comum da calibração | b, a taxa de base do rótulo naquele lugar (a mesma calibração = a mesma plataforma, o mesmo fio, a mesma norma) |
| Eᵢ, ruído independente | eᵢ, a variação de cada comentário |
| referência R = p + B + E_ref | um comentário-referência no mesmo lugar, com fonte p conhecida por registro independente (o degrau da v2) |
| deriva b − b_c | diferença entre a base do lugar no momento da referência e no momento do comentário |

## 2. Consultas no Z3 (v3)

Foram 7 consultas, uma de cada vez, no comando abaixo. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["MEME_COMUM_PERSISTE",["oa = s + b + ea","ob = s + b + eb","ea + eb = 0","2 × m = oa + ob"],"m − s = b","SEGUE",["sat","sat","unsat"],0],
["REPETIR_MEME_NAO_DECIDE",["s × (1 − s) = 0","m = s + b","m = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["REFERENCIA_LITERAL_CANCELA",["s × (1 − s) = 0","r = p + b","m = s + b","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["REFERENCIA_TUBO_CANCELA",["s × (1 − s) = 0","r = p + b","m = s + b","p = 0","r = 0","m = 1"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["DERIVA_PEQUENA",["s × (1 − s) = 0","r = p + bc","m = s + b","b − bc ≤ g","bc − b ≤ g","g = 1 / 2","p = 0","r = 1","m = 1"],"s = 0","SEGUE",["sat","sat","unsat"],0],
["DERIVA_GRANDE",["s × (1 − s) = 0","r = p + bc","m = s + b","b − bc ≤ g","bc − b ≤ g","g = 1","p = 0","r = 1","m = 1"],"s = 0","EM ABERTO",["sat","sat","sat"],0],
["ORIGEM",["dif = m − r","difo = (m + o) − (r + o)"],"difo = dif","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **MEME_COMUM_PERSISTE.** A média de dois comentários do mesmo lugar mantém o erro comum b com coeficiente 1. Mais comentários reduzem eᵢ, mas não reduzem b. É o análogo de VIES_PERSISTE e PISO_VARIANCIA do Todo 21.
- **REPETIR_MEME_NAO_DECIDE.** Um nível de meme medido em 1, com b desconhecido, deixa a fonte EM ABERTO. É o mesmo resultado de CAPTURAS_SEM_DEGRAU da v2.
- **REFERENCIA_LITERAL_CANCELA e REFERENCIA_TUBO_CANCELA.** Uma referência no mesmo lugar, com fonte conhecida e literal (p = 0), mede b, e a fonte fica decidida:
  - se a referência literal também dá 1, a base explica o nível e a fonte é literal (s = 0);
  - se a referência dá 0, a base é zero e a fonte é Tubo (s = 1).
  
  Os dois sentidos foram provados. É o análogo de REFERENCIA_CANCELA.
- **DERIVA_PEQUENA e DERIVA_GRANDE.** Se a base pode ter mudado entre a referência e o comentário, a decisão só se sustenta se a deriva g for menor que o degrau entre os rótulos (g < 1). Com g = 1/2, a fonte fica decidida. Com g = 1, fica EM ABERTO. É o análogo de REFERENCIA_COM_DERIVA.
- **ORIGEM.** Somar a mesma constante ao comentário e à referência não muda a diferença.

## 3. Consequência para a língua secreta

1. **Contar memes não é medir a fonte.** Qualquer contagem num mesmo lugar carrega b com peso 1.
2. **O degrau da v2 precisa estar no mesmo lugar.** A referência tem que estar na mesma plataforma e na mesma janela de tempo. Uma referência de outro lugar tem outra calibração, e a diferença b − b_c não se cancela.
3. **A referência precisa de registro independente de fonte.** O registro precisa existir antes, com SHA-256, e não vir de leitura de quem analisa.
4. **A deriva limita a janela.** Se a base do lugar muda de um dia para o outro mais do que o degrau, referência e comentário precisam estar no mesmo dia. Em caso contrário, a saída é EM ABERTO.

Junto com o Todo 21, temos dois resultados paralelos:

- o GPT mostrou que repetir leituras não baixa u_B;
- esta rodada mostra que repetir o meme não separa a fonte de b sem referência.

Nos dois casos, a saída é EM ABERTO quando falta a referência ou o degrau.

## 4. Próximo ponto

Acompanhar o próximo Todo do GPT, que propõe referência antes e depois do ensaio para separar desvio constante de deriva linear. Na língua secreta, isso corresponde a uma referência antes e outra depois do comentário, para separar a base fixa do lugar de uma base que muda.

## Integridade

- SHA-256 de Todo 21, conferido nos bytes contra o `.sha256` do GPT: `00fec27b324339d2e160fbb6d6e387f157fe765cfc73619e3d1f6a751f23f475`.
- SHA-256 da v2 desta série: `8a8a62070d40a8b1ff3fe92645297c8de1e622e8f243354585b68dcfed05d41c`.
- Commit remoto de partida: `cb7bf8aa625ad2cca48d3553cfe9933f0e84b27e` (Todo 21).
- O hash desta v3 está no arquivo `.sha256` ao lado.
