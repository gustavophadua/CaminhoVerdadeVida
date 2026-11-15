# 15/11/2026 — Língua secreta v31 — Fio apagado antes da contagem

Esta versão parte do Todo 49 do GPT, "Teste da magnitude sem sorteio adicional", conferido pelo SHA-256 `e1a06245875c4fda1e9890ef1e8a7aa904bc6015a8be0b55c22004f4d6f6ece6`. O Todo 49 retoma o próximo ponto da v30 (lotes sem registro), cita a v30 pelo SHA e reexecutou os 4 casos dela com o estado esperado.

O que o Todo 49 estabelece:
- Um teste por fator linear e pela desigualdade de Markov controla o erro sem sorteio. Pelo critério da soma, são precisos 4.846 lotes com S = 1.
- Um lote conhecido mas sem contagem pode ter qualquer W em [0, 3], e a decisão fica EM ABERTO.
- Preencher o lote faltante com W = 3 é conservador.
- Descartar lotes ausentes muda a amostra.

**Desvio declarado.** O teste de Markov e o número de 4.846 lotes dependem de probabilidade e de independência. Esta série fica só com o **censo**: o conjunto registrado, em que alguns fios foram apagados antes de serem contados.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- não entra leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 49 | Língua secreta |
|---|---|
| lote conhecido sem contagem | fio que existia (aparece no registro de fios) mas foi apagado antes de os comentários serem contados |
| W do lote faltante em [0, 3] | wm: excesso do fio apagado, entre 0 e 3 pelo teto físico (v29) |
| preencher com W = 3 | contar o fio apagado com o pior excesso possível |
| descartar o lote | tirar o fio apagado do conjunto |
| registrar antes da filtragem | registrar e carimbar o fio (SHA-256) antes de qualquer apagamento |

Cenário da v29 e da v30. A meta de 5% vale até uma soma de excessos sw = 4. sc é a soma dos excessos já contados.

## 2. Consultas no Z3 (v31)

Foram 5 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["FIO_APAGADO_ABERTO",["sc = 2","wm ≥ 0","wm ≤ 3","sw = sc + wm"],"sw ≤ 4","EM ABERTO",["sat","sat","sat"],0],
["PIOR_CASO_APROVA",["sc = 1","wm ≥ 0","wm ≤ 3","sw = sc + wm"],"sw ≤ 4","SEGUE",["sat","sat","unsat"],0],
["PIOR_CASO_NAO_CERTIFICA",["sc = 2","wm = 3","sw = sc + wm"],"sw ≤ 4","CONTRADIZ",["sat","unsat","sat"],0],
["DESCARTAR_ENGANA",["sc = 2","parcial = 70 + sc","20 × parcial ≤ parcial + 1411","wm = 3","cf = parcial + 5 + wm","cg = 1411","tc = cf + cg"],"20 × cf ≤ tc","CONTRADIZ",["sat","unsat","sat"],0],
["CONTADO_ANTES_DE_APAGAR",["sc = 2","wm = 1","sw = sc + wm"],"sw ≤ 4","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **FIO_APAGADO_ABERTO.** Com soma contada de 2 e um fio apagado de excesso desconhecido entre 0 e 3, a meta fica EM ABERTO. É o análogo de LOTE_FALTANTE.
- **PIOR_CASO_APROVA.** Com soma contada de 1, mesmo o pior caso do fio apagado (3) cabe na meta. O preenchimento conservador decide a favor.
- **PIOR_CASO_NAO_CERTIFICA.** Com soma contada de 2, o pior caso dá 5, e afirmar a meta sob esse preenchimento **contradiz** a conta. A certificação cai, mas isso não prova que a meta falha de fato, porque o fio apagado pode ter tido excesso menor.
- **DESCARTAR_ENGANA.** Sem o fio apagado, a conta parcial (72 comentários falhos) passa na meta. Se ele era um fio falho com 8 comentários, a conta real (80) **contradiz** a meta. Descartar gera aprovação falsa, como na v28 com o fio viral.
- **CONTADO_ANTES_DE_APAGAR.** Se o fio foi contado e registrado antes de ser apagado (excesso 1), a meta vale com o valor real.

## 3. Consequência para a língua secreta

1. **Fio apagado não sai do conjunto.** Se o registro mostra que o fio existia, ele entra na conta. Tirá-lo muda o conjunto e pode aprovar o que não passa.
2. **Sem contagem, vale o pior caso ou EM ABERTO.** O fio apagado entra com o maior excesso que o teto físico permite. Se a meta passa assim, passa de verdade. Se não passa, o resultado é EM ABERTO, não "reprovado": o valor real pode ter sido menor.
3. **Registrar antes do apagamento.** A saída prática é registrar os fios, com contagem e SHA-256, antes de qualquer filtragem ou apagamento da plataforma. É o "registrar lotes completos antes da filtragem do contador" do Todo 49.
4. **O caso individual continua fora** (v24 a v30).
5. **Paralelo com o GPT.**
   - No Todo 49, o lote faltante em [0, 3] deixa a decisão EM ABERTO, W = 3 é conservador e descartar o lote muda a amostra.
   - Aqui, o mesmo vale em censo. Com soma contada 1 aprova, com 2 fica EM ABERTO, e o descarte engana.

## 4. Próximo ponto

O Todo 49 propõe comparar o fator linear fixo com um fator que continue informativo quando há um lote no excesso máximo. Isso pertence ao lado amostral, que fica fora da série. No censo, a pergunta equivalente é quantos fios apagados o conjunto aguenta. Cada fio apagado consome até 3 da folga de 4. Com 1 fio apagado, a meta se certifica pelo pior caso se a soma contada for no máximo 1. Com 2 ou mais, o pior caso já passa de 4, e a meta não se certifica dessa forma nem com soma contada zero. Só a contagem prévia resolve. Essa conta exige o número de fios apagados registrado com fonte.

## Integridade

- SHA-256 do Todo 49, conferido nos bytes contra o `.sha256` do GPT: `e1a06245875c4fda1e9890ef1e8a7aa904bc6015a8be0b55c22004f4d6f6ece6`.
- SHA-256 da v30 desta série: `a4023177a46bd1042074c49b01338a89059d9547289fadc8ff94850f2b224689`.
- Commit remoto de partida: `b78e809661605eb0c31d636b9beda48b9a2ffda4`, que contém o Todo 49 (conferido com `git ls-tree`).
- O hash desta v31 está no arquivo `.sha256` ao lado.
