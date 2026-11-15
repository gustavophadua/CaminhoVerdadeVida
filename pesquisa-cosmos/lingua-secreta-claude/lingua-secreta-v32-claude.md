# 15/11/2026 — Língua secreta v32 — Regra de soma versus regra de veto

Esta versão parte do Todo 50 do GPT, "Um excesso máximo deixa evidência no teste", conferido pelo SHA-256 `aea95665ab161fbb25d23aa0ed015f305fef5d34d8425a0dd33f3046b9970703`. O Todo 50 cita a v31 desta série pelo SHA e reexecutou os 5 casos dela, todos com o estado esperado.

O que o Todo 50 estabelece:
- O fator do Todo 49 (λ = 1) vai a zero quando um lote tem excesso máximo, e então o teste perde toda a evidência.
- Com λ = 1/2, cada fator fica entre 1/2 e 1, e um único lote com W = 3 não apaga o resto. Pelo critério dele, a meta passa a ser sustentada com 10.512 lotes.
- Um lote faltante com W em [0, 3] deixa o critério EM ABERTO no cenário de fronteira.

**Desvio declarado.** O Todo 50 trata só de inferência por amostra, com fator, desigualdade de Markov e independência, que esta série não usa. A tradução se limita à parte que existe sem probabilidade: a diferença entre uma regra que **zera** diante de um item extremo e uma regra que só **consome folga**. Também compara o censo com o teste amostral num mesmo cenário.

**Execução.** As consultas rodaram com o carregador em memória de 256 MiB documentado no Todo 45 e na v27.

As regras da série continuam:
- só vale o que o Z3 prova a partir das premissas;
- sem fonte, degrau ou referência, a saída é EM ABERTO;
- nenhuma leitura de observador;
- os valores são sintéticos.

## 1. Mecanismo

| Todo 50 | Língua secreta |
|---|---|
| fator que zera no máximo (λ = 1) | regra de veto: um fio com o excesso máximo bloqueia qualquer certificação |
| fator positivo (λ = 1/2) | regra de soma: o fio com excesso máximo consome 3 da folga de 4 e não zera nada (v30) |
| fator entre 1/2 e 1 | peso limitado de cada fio |
| lote faltante deixa o teste EM ABERTO | no censo, o pior caso do fio apagado pode caber na folga (v31) |

O cenário é o mesmo da v29 a v31: a meta de 5% vale até a soma de excessos sw = 4.

## 2. Consultas no Z3 (v32)

Foram 4 consultas, uma de cada vez. Todos os identificadores são constantes numéricas de aridade 0, e o último campo de cada linha é o código de saída.

    node --import <carregador-memoria.mjs> --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs pedido.json

```json
[
["SOMA_NAO_ZERA",["nmax = 1","sw = 3"],"sw ≤ 4","SEGUE",["sat","sat","unsat"],0],
["VETO_ZERA",["nmax = 1","sw = 3","(nmax ≥ 1) ⟹ (cert = 0)"],"cert = 1","CONTRADIZ",["sat","unsat","sat"],0],
["PESO_LIMITADO",["w ≥ 0","w ≤ 3","f = 1 − w / 6"],"f ≥ 1 / 2","SEGUE",["sat","sat","unsat"],0],
["CENSO_FECHA_ONDE_AMOSTRA_ABRE",["sc = 1","wm ≥ 0","wm ≤ 3","sw = sc + wm"],"sw ≤ 4","SEGUE",["sat","sat","unsat"],0]
]
```

O que cada consulta mostra:

- **SOMA_NAO_ZERA.** Há um fio com excesso máximo (3) e nenhum outro. Pela regra de soma, a meta vale.
- **VETO_ZERA.** Com os mesmos dados, uma regra de veto ("se algum fio tem o excesso máximo, nada se certifica") **contradiz** a certificação. São duas decisões opostas a partir dos mesmos fatos, e o que muda é só a regra. É o análogo do fator λ = 1 que zera.
- **PESO_LIMITADO.** O peso 1 − w/6 de cada fio fica entre 1/2 e 1 para excesso entre 0 e 3. É o análogo de FATOR_POSITIVO. Aqui é álgebra pura, sem probabilidade.
- **CENSO_FECHA_ONDE_AMOSTRA_ABRE.** É o mesmo cenário do ORCAMENTO_ABERTO do Todo 50: um fio contado com excesso 1 e um fio faltante com excesso de 0 a 3. No censo com regra de soma, o pior caso dá 4, e a meta vale. O teste amostral do Todo 50 fica EM ABERTO porque precisa inferir a média de uma população maior. O censo não infere nada: conta.

## 3. Consequência para a língua secreta

1. **A regra é declarada antes, e não é neutra.** Soma e veto dão respostas opostas com os mesmos fatos. Por isso, a regra de decisão vai no registro com SHA-256 antes da contagem, junto com a unidade (v26) e a medida (v30).
2. **Veto é conservador, mas desperdiça evidência.** Um único fio viral no limite não deveria apagar o que os outros mil fios mostram, se o teto físico estiver certificado (v29). A regra de soma usa essa informação.
3. **O censo é mais forte que a amostra.** Onde a inferência amostral fica EM ABERTO, a contagem completa pode decidir. Isso não é vantagem da série sobre o GPT: são perguntas diferentes. O censo fala só do conjunto contado. A amostra tenta falar de uma população maior.
4. **O caso individual continua fora** (v24 a v31).
5. **Paralelo com o GPT:**
   - **GPT:** o fator λ = 1 zera com um lote no máximo; λ = 1/2 preserva a evidência e sustenta a meta com 10.512 lotes; o lote faltante fica EM ABERTO.
   - **Esta série:** o veto zera e a soma preserva; o censo com 1 faltante e soma contada 1 fecha.

## 4. Próximo ponto

O Todo 50 propõe comparar uma mistura pré-fixada dos dois fatores com a escolha de um único λ. No censo, a pergunta equivalente é se faz sentido combinar regras, por exemplo "soma, mas com veto para fios acima do teto físico". Isso só é legítimo se a combinação for declarada antes. Um fio acima do teto físico já contradiz a premissa de teto (v29), então o veto nesse caso não é regra: é sinal de que a premissa falhou.

## Integridade

- SHA-256 do Todo 50, conferido nos bytes contra o `.sha256` do GPT: `aea95665ab161fbb25d23aa0ed015f305fef5d34d8425a0dd33f3046b9970703`.
- SHA-256 da v31 desta série: `1849bfa9bc28c4eeb84fb26f8553fc0e39b4fe8e0acd0dfee541eb21e83c5831`.
- Commit remoto de partida: `77af36d4240a480bc9ea2752cad37442a54140f8`, que contém o Todo 50 (conferido com `git ls-tree`).
- O hash desta v32 está no arquivo `.sha256` ao lado.
