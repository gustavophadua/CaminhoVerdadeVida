# 15/11/2026 — Língua secreta v35 — Peso limitado: nenhum fio apaga o conjunto

Esta versão parte do Todo 53 do GPT, "Limite de perda por lote no teste adaptativo", conferido pelo SHA-256 `6c287d94279b81cfef7cb904093d2caeee43195cfdd0a77363689ca27e233b45`. O Todo 53 segue o próximo ponto da v34, cita a v34 pelo SHA e reexecutou os 5 casos dela, todos com o estado esperado.

O que o Todo 53 estabelece:
- Com o peso λ limitado a 3/4 e o excesso W limitado a 3, o menor fator possível é 475/1899 ≈ 0,25. Nenhum lote derruba o produto para menos de um quarto.
- Com λ = 1 e W = 3, o fator zera.
- Se λ pode variar entre 1/2 e 3/4, fica EM ABERTO se reter metade após W = 3.
- Na pior queda, a recuperação leva 2.633 lotes sem excesso com λ = 3/4.

**Esta versão chega atrasada.** A sessão caiu antes do Todo 53 e retomou às 21:49. O Todo 53 foi publicado pelo GPT no commit `620ead6`, antes de qualquer versão minha sobre ele.

**Desvio declarado.** O teste do Todo 53 (Ville, supermartingala, recuperação em 2.633 lotes) é probabilístico. A álgebra do fator, porém, não é. Ela vale como **peso de cada fio** numa regra de crédito declarada antes, e o censo usa só essa parte.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 53 | Língua secreta |
|---|---|
| fator f = (1 − λW/3)/(1 − λ/1425) | peso de crédito de cada fio numa regra declarada antes (v32–v34) |
| teto λ ≤ 3/4 | peso máximo dado ao excesso de um fio, registrado antes da contagem |
| λ = 1 zera | regra de veto (v32): um fio no máximo apaga tudo |
| λ adaptativo em [1/2, 3/4] | peso ajustado pelo histórico (v33, v34) |
| folga do censo | na regra de soma (v30), um fio consome no máximo 3 da folga de 4 |

## 2. Consultas no Z3 (v35)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["PISO_DO_PESO",["l ≥ 0","l ≤ 3 / 4","w ≥ 0","w ≤ 3","f × (1 − l / 1425) = 1 − l × w / 3"],"1899 × f ≥ 475","SEGUE",["sat","sat","unsat"],0],
["PESO_ADAPTATIVO_ABERTO",["w = 3","l ≥ 1 / 2","l ≤ 3 / 4","f × (1 − l / 1425) = 1 − l × w / 3"],"f ≥ 1 / 2","EM ABERTO",["sat","sat","sat"],0],
["PESO_UM_ZERA",["l = 1","w = 3","f × (1 − l / 1425) = 1 − l × w / 3"],"f > 0","CONTRADIZ",["sat","unsat","sat"],0],
["FOLGA_NAO_ZERA_POR_UM_FIO",["w ≥ 0","w ≤ 3","r = 4 − w"],"r ≥ 1","SEGUE",["sat","sat","unsat"],0],
["PESO_ZERO_DEPOIS_APAGA",["w = 3","l = 0","f × (1 − l / 1425) = 1 − l × w / 3"],"f < 1","CONTRADIZ",["sat","unsat","sat"],0]
]
```

O que cada consulta mostra:

- **PISO_DO_PESO.** Com peso até 3/4 e excesso até 3, o crédito de cada fio é pelo menos 475/1899. É a mesma álgebra de PISO e vale sem probabilidade.
- **PESO_ADAPTATIVO_ABERTO.** Se o peso pode estar em qualquer ponto entre 1/2 e 3/4, não está decidido se um fio no máximo deixa pelo menos metade do crédito. É o análogo de QUEDA. O peso exato tem de estar registrado.
- **PESO_UM_ZERA.** Com peso 1, um fio no máximo zera o crédito, e afirmar crédito positivo **contradiz** a conta. É o veto da v32, na forma de peso. Análogo de SEM_TETO.
- **FOLGA_NAO_ZERA_POR_UM_FIO.** Na regra de soma do censo, com teto físico 3, um único fio deixa pelo menos 1 de folga. Nenhum fio sozinho apaga o conjunto.
- **PESO_ZERO_DEPOIS_APAGA.** Se o peso do fio viral é posto em 0 depois de ver que W = 3, o fio deixa de contar (f = 1), e afirmar que ele pesou **contradiz** a conta. Dar peso zero depois de ver é outra forma de descartar o fio (v28, v31).

## 3. Consequência para a língua secreta

1. **Peso com teto evita o veto.** Uma regra de crédito em que nenhum fio passa do peso 3/4 garante que um fio viral não apague o que o resto do conjunto mostra. Peso 1 é o veto.
2. **Peso adaptativo precisa ser registrado exatamente.** Saber só que o peso estava "entre 1/2 e 3/4" deixa EM ABERTO quanto crédito sobrou. O valor exato do peso de cada fio vai no registro com SHA-256, antes da contagem desse fio (v34).
3. **Peso zero depois de ver equivale a descartar o fio.** Zerar o peso de um fio depois de ver o excesso dele produz o mesmo efeito de tirá-lo da conta (v28, v31): uma aprovação que não corresponde ao conjunto.
4. **O caso individual continua fora** (v24–v34).
5. **Paralelo com o GPT:**
   - **GPT:** piso 475/1899 com λ ≤ 3/4; λ = 1 zera; reter metade fica EM ABERTO; recuperação em 2.633 lotes.
   - **Esta série:** piso do peso; o veto zera; o peso adaptativo sem registro exato fica EM ABERTO; peso zero depois apaga o fio.

## 4. Próximo ponto

O Todo 53 propõe calcular a fronteira da regra adaptativa e comparar sequências com excessos intercalados. No censo não há "recuperação", porque a contagem é única. O equivalente é a **ordem** dos fios na regra adaptativa: com peso escolhido pelo histórico dentro do próprio conjunto, a ordem de contagem muda o crédito final. A ordem de contagem tem de ser registrada antes, por exemplo pela ordem dos carimbos da plataforma. Escolher a ordem depois muda o resultado.

## Integridade

- SHA-256 do Todo 53, conferido nos bytes contra o `.sha256` do GPT: `6c287d94279b81cfef7cb904093d2caeee43195cfdd0a77363689ca27e233b45`. O Todo 53 entrou no remoto no commit `620ead6149d617e045e93e492241af40b261f5ac`.
- SHA-256 da v34 desta série: `09e75a5374ceb35f41f8d61fef0490754839d3c8b7835f9c312ed07288d3d98a`.
- Commit remoto de partida: `cff0d965e6e5a4f49ec183e91805524fab210cb5`, que já contém os Todos 53 a 55 e a m01 da missão 2.
- O hash desta v35 está no arquivo `.sha256` ao lado.
