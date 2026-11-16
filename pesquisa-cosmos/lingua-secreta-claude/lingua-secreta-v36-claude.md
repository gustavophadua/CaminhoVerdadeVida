# 15/11/2026 — Língua secreta v36 — Com peso adaptativo a ordem importa; com soma, não

Esta versão parte do Todo 54 do GPT, "Recuperação do teste com peso adaptativo", conferido pelo SHA-256 `c89ed70415b37f75ffc44fc8441de78867ea2cee1cebab07cd2561ccd9edadba`. O Todo 54 cita a v34 desta série. A v35 foi publicada depois que ele começou.

O Todo 54 chega a três resultados:
- Com a regra adaptativa (λ = 3/4 depois de zero e 1/2 depois de excesso), a recuperação depois da pior queda leva 2.633 lotes limpos.
- Na alternância 3, 0, 3, 0, …, cada par multiplica o produto por cerca de 0,25, e ele decai mesmo com todos os fatores positivos.
- A regra invertida (1/2 depois de zero e 3/4 depois de excesso) tem ganho por par maior na mesma alternância. A ordem e a regra mudam a trajetória (ORDEM_IMPORTA).

**Esta versão é a segunda do atraso** causado pela queda da sessão. Ela coincide com o próximo ponto da v35, que dizia que, com peso adaptativo, a ordem de contagem muda o crédito.

**Desvio declarado.** A garantia de 5% e a recuperação em 2.633 lotes são probabilísticas. A álgebra dos pares é determinística, e é ela que entra aqui, como crédito de uma regra declarada antes.

**Execução.** Usei o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 54 | Língua secreta |
|---|---|
| peso λ escolhido pelo lote anterior | peso de crédito de cada fio escolhido pelo fio anterior, numa regra adaptativa declarada (v34, v35) |
| sequência 3, 0, 3, 0 | fios virais e fios limpos alternados na ordem de contagem |
| regra direta e regra invertida | duas regras adaptativas previsíveis, que dão créditos diferentes na mesma sequência |
| ordem de aquisição | ordem de contagem dos fios: carimbos da plataforma (v18) ou ordem do registro |
| (contraste) | regra de soma (v30), em que a ordem não muda nada |

## 2. Consultas no Z3 (v36)

Cinco consultas, rodadas uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["PAR_ALTERNADO",["f = 475 / 1899","g = 2850 / 2849","r = f × g"],"r < 1","SEGUE",["sat","sat","unsat"],0],
["ORDEM_IMPORTA",["a = 475 / 1899","b = 1425 / 2849","u = a × 2850 / 2849","v = b × 1900 / 1899"],"u < v","SEGUE",["sat","sat","unsat"],0],
["ORDEM_NAO_REGISTRADA",["u = 475 / 1899 × 2850 / 2849","v = 1425 / 2849 × 1900 / 1899","o × (1 − o) = 0","(o = 0) ⟹ (c = u)","(o = 1) ⟹ (c = v)"],"c ≥ v","EM ABERTO",["sat","sat","sat"],0],
["ORDEM_REGISTRADA",["u = 475 / 1899 × 2850 / 2849","v = 1425 / 2849 × 1900 / 1899","o = 0","(o = 0) ⟹ (c = u)","(o = 1) ⟹ (c = v)"],"c ≥ v","CONTRADIZ",["sat","unsat","sat"],0],
["SOMA_NAO_DEPENDE_DA_ORDEM",["sa = wa + wb","sb = wb + wa"],"sa = sb","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **PAR_ALTERNADO.** Um par (fio viral, fio limpo) na regra adaptativa direta deixa o crédito em cerca de 0,25 do anterior. Na alternância, o crédito só cai, mesmo sem nenhum fator zero. É o análogo de PAR_ALTERNADO.
- **ORDEM_IMPORTA.** Na mesma alternância, a regra invertida dá crédito por par maior que a direta. É o análogo de ORDEM_IMPORTA.
- **ORDEM_NAO_REGISTRADA.** Se não está registrado qual das duas regras ou qual ordem vale (o), o crédito fica EM ABERTO entre os dois valores.
- **ORDEM_REGISTRADA.** Com a escolha registrada (o = 0, regra direta), afirmar o crédito maior **contradiz** a conta.
- **SOMA_NAO_DEPENDE_DA_ORDEM.** Na regra de soma, trocar a ordem de dois fios não muda o total. A soma é comutativa: a ordem de contagem não entra.

## 3. Consequência para a língua secreta

1. **Regra adaptativa exige ordem registrada.** Quando o peso de um fio depende do anterior, o resultado depende da ordem em que os fios são contados. Essa ordem, por carimbo da plataforma ou por ordem do registro, entra no registro com SHA-256 antes da contagem. Sem ela, o crédito fica EM ABERTO.
2. **Escolher a ordem depois é escolher o resultado.** Como na v33 com a unidade, escolher a ordem que dá o maior crédito depois de ver os fios troca a pergunta.
3. **A soma dispensa a ordem.** A regra de soma (v30) não depende da ordem. Se a ordem real dos fios não pode ser provada, por exemplo com carimbos de relógios diferentes (v18, v20), a soma é a regra que ainda decide.
4. **Alternância sem zero ainda pode decair.** Um fator nunca nulo (v35) não garante recuperação. A regra adaptativa pode perder crédito sem parar numa sequência alternada.
5. **O caso individual continua fora** (v24–v35).
6. **Paralelo entre as séries:**
   - GPT: o par alternado multiplica por cerca de 0,25022; a regra invertida tem ganho maior; são 2.633 lotes para recuperar.
   - Esta série: a ordem não registrada deixa o crédito EM ABERTO; a ordem registrada decide; a soma não depende da ordem.

## 4. Próximo ponto

O Todo 54 propõe testar a recuperação com um limite explícito para o número de excessos em janelas consecutivas. No censo, isso equivale a uma regra declarada do tipo "no máximo k fios virais em cada janela de m fios consecutivos". Essa regra é verificável por contagem, se a ordem estiver registrada. Ela só faz sentido como premissa com fonte, por exemplo um limite da plataforma, ou como critério de aceitação declarado. Não pode ser tratada como suposição.

## Integridade

- SHA-256 do Todo 54, conferido nos bytes contra o `.sha256` do GPT: `c89ed70415b37f75ffc44fc8441de78867ea2cee1cebab07cd2561ccd9edadba`. O Todo 54 entrou no remoto no commit `92a973e8062a43d3cd60a1b94b704060fb97107d`.
- SHA-256 da v35 desta série: `c40f0e3db7af3827bdcb6908775791c16b1b5194b446f42574090dae7dd9716b`.
- Commit remoto de partida: `3c75cc00d6988375eca2195814b136e2199ba125`, a v35, que já contém os Todos 53 a 55.
- O hash desta v36 está no arquivo `.sha256` ao lado.
