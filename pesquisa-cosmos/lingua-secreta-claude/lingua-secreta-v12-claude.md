# 15/11/2026 — Língua secreta v12 — Controles separados para a ida e para a volta

Esta versão parte do Todo 30 do GPT, "Restringir os atrasos em cada sentido", conferido pelo SHA-256 `f58c724bf34d5549e0c6aa574adb01be86913d07137c5d589ab4a9be7bfd9477`. O Todo 30 cita a v11 desta série pelo SHA e trata o degrau que induz troca como hipótese correspondente.

O que o Todo 30 estabelece:
- Com limites independentes para a ida (i) e para a volta (v), o deslocamento fica na interseção [x − i_max, x − i_min] ∩ [v_min − y, v_max − y].
- Interseção vazia indica dados e guardas incompatíveis.
- Usar os próprios relógios desconhecidos para declarar i ou v torna a inferência circular.
- Uma sonda que altera a fila invalida a guarda.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, o resultado é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 30 | Língua secreta |
|---|---|
| ida x = θ + i, com i ∈ [i_min, i_max] | entrada no contexto seguro: x = s + i, com i limitado por um **controle de ida** (pessoa de fonte literal conhecida que entra no mesmo contexto) |
| volta y = v − θ, com v ∈ [v_min, v_max] | retorno ao público: y = v − s, com v limitado por um **controle de volta** (pessoa de fonte literal conhecida que volta ao mesmo lugar público) |
| interseção dos dois intervalos | a fonte s precisa caber nos dois intervalos ao mesmo tempo |
| interseção vazia | os controles e os dados se contradizem, e nada se conclui sobre s |
| circularidade | declarar i a partir da própria troca da pessoa testada (i = x − s) |
| sonda que muda a fila | um controle cuja presença muda o contexto passa a medir outro i |

## 2. Consultas no Z3 (v12)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0. O último campo de cada linha é o código de saída.

    node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SO_IDA_ABERTA",["s × (1 − s) = 0","x = s + i","i ≥ 0","i ≤ 1","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0],
["VOLTA_FECHA",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 1","v ≥ 7 / 10","v ≤ 1","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["INTERSECAO_DECIDE",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 3 / 10","v ≥ 7 / 10","v ≤ 1","x = 1","y = 0"],"s = 1","SEGUE",["sat","sat","unsat"],0],
["GUARDAS_INCOMPATIVEIS",["s × (1 − s) = 0","x = s + i","y = v − s","i ≥ 0","i ≤ 1 / 10","v ≥ 0","v ≤ 1 / 10","x = 1","y = 0"],"s = 1","PREMISSAS INCOMPATÍVEIS",["unsat",null,null],0],
["CONTROLE_CIRCULAR",["s × (1 − s) = 0","x = s + i","i = x − s","x = 1"],"s = 1","EM ABERTO",["sat","sat","sat"],0]
]
```

**Leitura das consultas:**

- **SO_IDA_ABERTA.** Com o controle de ida fraco (i pode chegar ao degrau), a troca na entrada não decide a fonte: EM ABERTO. Repete a v11.
- **VOLTA_FECHA.** O mesmo controle de ida fraco, junto com um controle de volta forte (v ∈ [7/10, 1]) e a volta observada y = 0, decide s = 1. Um sentido bem limitado compensa o outro. É o análogo da volta que reduz a interseção no Todo 30.
- **INTERSECAO_DECIDE.** Com os dois controles limitados, a fonte fica no único valor binário da interseção (s = 1). É o análogo de INTERSECAO.
- **GUARDAS_INCOMPATIVEIS.** Com controles estreitos dos dois lados, a ida exige s ≥ 9/10 e a volta exige s ≤ 1/10. O Z3 acusa **premissas incompatíveis**. Pelo Todo 30, interseção vazia não decide a fonte; ela mostra que algum controle ou algum registro está errado.
- **CONTROLE_CIRCULAR.** Se o "limite" de i vem da própria troca da pessoa testada (i = x − s), a premissa não acrescenta nada e o resultado é EM ABERTO. Essa é a circularidade que o Todo 30 proíbe.

## 3. Consequência para a língua secreta

1. **Dois controles, um por sentido.** O controle de ida mede o quanto o contexto seguro empurra para o rótulo direto. O controle de volta mede o quanto o retorno ao público empurra de volta para o meme. A fonte só se decide na interseção.
2. **Um sentido forte pode bastar.** Se o efeito do contexto na entrada é mal conhecido, um controle de volta bem limitado ainda pode decidir (VOLTA_FECHA).
3. **Interseção vazia é alarme, não resultado.** Se os controles e a pessoa testada são incompatíveis, algo no protocolo está errado: o controle não era literal, o contexto mudou, ou o registro falhou. A saída é revisar o protocolo, nunca escolher uma fonte.
4. **O controle precisa ter fonte própria.** Declarar o efeito do contexto a partir da troca observada na própria pessoa testada é circular. O controle tem de ter fonte literal conhecida por registro independente, com SHA-256 anterior ao degrau (v7).
5. **O controle não pode mudar o contexto.** Como a sonda que muda a fila no Todo 30, um controle cuja presença altera o lugar (por exemplo, por ser visível para a pessoa testada) mede um i diferente do i que a pessoa enfrenta. Isso é o limite k da v5 aplicado ao controle.
6. **Paralelo entre as séries:**
   - no Todo 30, θ ∈ [0,05; 0,07] ms, e o ponto exato fica EM ABERTO;
   - aqui, a interseção decide porque s é binário e a faixa contém um só valor admissível.

## 4. Próximo ponto

O Todo 30 propõe verificar se a guarda unidirecional se mantém sob mudança de carga e rota. Na língua secreta, isso equivale a verificar se os limites dos controles de ida e de volta valem quando o lugar muda de carga (fio cheio ou vazio) ou de rota (outro formato de contexto seguro). Cada mudança exige refazer os controles, combinando com a validade das recontagens da v10.

## Integridade

- SHA-256 do Todo 30, conferido nos bytes contra o `.sha256` do GPT: `f58c724bf34d5549e0c6aa574adb01be86913d07137c5d589ab4a9be7bfd9477`.
- SHA-256 da v11 desta série: `a18550cd38712c17028d0300349e3df3636de669b9ea3e3e9221c03a56978510`.
- Commit remoto de partida: `94f5510675dc84a318cad41f156d33c66d3d9228`.
- O hash desta v12 está no arquivo `.sha256` ao lado.
