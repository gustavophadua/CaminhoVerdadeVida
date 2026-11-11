# Bases locais v1: conferir contra uma base de fatos que a pessoa mantém

Versão `cosmos-base-v1`, 11/11/2026. Código: `src/motor/bases.ts`, a rota `ollama/realidade` em
`src/integracoes/ollama-node.ts` e a escolha da base na Conversa (`src/interfaces/Produtos.tsx`). Testes:
`testes/bases.test.ts`, `testes/bases-consistencia.test.ts` e `testes/integracoes-ollama.test.ts`.

## 1. O problema

A camada de fatos (`especificacao/realidade-v1.md`) confere cada frase contra a realidade registrada, uma base pequena
e pública. Quem trabalha com um modelo próprio (uma teoria, um caderno, as regras de um projeto) quer conferir contra
as regras dele, com o mesmo rigor, sem publicá-las. A base local resolve isso: ela tem o mesmo formato da realidade-v1,
fica no computador da pessoa e nunca entra no repositório.

## 2. Onde a base fica e quem lê

- O serviço local (`npm` com `scripts/integracoes-p0.mjs --ollama`) lê os arquivos `*.json` da pasta `privado/bases/`.
  A pasta `privado/` está no `.gitignore`: nada dali vai para o Git.
- Até 20 bases, de até 2 MB cada. Arquivo que não confere fica de fora, com o motivo, e o estado da IA
  (`ollama/estado`) lista as bases lidas e as recusadas.
- A base não sai do computador: o Z3 roda no serviço local, e o navegador só recebe o nome da base e os fatos citados
  em cada resposta.

## 3. O formato

```json
{
  "formato": "cosmos-base-v1",
  "nome": "pomar",
  "descricao": "Um pomar de exemplo.",
  "juntarCom": ["realidade-v1"],
  "vocabulario": [
    { "simbolo": "Macieira", "tipo": "predicado", "aridade": 1, "leitura": "x é uma macieira", "sinonimos": ["macieira"] }
  ],
  "fatos": [
    { "id": "P01", "enunciado": "Toda macieira é uma árvore.", "formula": "∀x (Macieira(x) ⟹ Arvore(x))", "fonte": { "nome": "definição" } }
  ]
}
```

| Campo | Regra |
|---|---|
| `nome` | letras minúsculas, números e hífens, até 40; não pode ser `realidade-v1` |
| `descricao` | até 500 caracteres |
| `juntarCom` | opcional; só `["realidade-v1"]`: a base soma a realidade registrada às regras dela |
| `vocabulario` | de 1 a 200 predicados; símbolo com maiúscula, só letras e números; aridade de 1 a 3; leitura com `x`; até 40 sinônimos (a regra fixa de alinhamento da realidade-v1 usa os sinônimos) |
| `fatos` | de 1 a 500; id de até 10 caracteres; enunciado em português; fórmula em m2 que lê com o vocabulário; fonte com nome e, se houver, endereço `https://` |

Somada à realidade-v1, a base não pode redefinir nenhum símbolo nem nenhum fato dela (os ids `R01`…`R31` ficam
reservados). Campo desconhecido é recusado: o arquivo diz exatamente o que a base tem, nada mais.

## 4. Nenhuma contradição entra

Uma base contraditória tornaria tudo "fato": do impossível segue qualquer coisa. Por isso, no primeiro uso de cada
base, o Z3 confere que a base inteira tem um modelo (`conferirConsistencia`). Se não tem:

- a rota responde **409** (`cosmos-base-recusada-v1`) e não confronta nada;
- o estado da IA passa a mostrar `consistente: false` e os fatos que colidem;
- os fatos que colidem são um conjunto **mínimo por inclusão**: achado tirando um fato de cada vez; tirar qualquer um
  deles desfaz a contradição. Pode haver outro conjunto mínimo; este é o que a ordem da base produz.

Se o Z3 não decide, a base também não é usada, e a conferência é tentada de novo no pedido seguinte.

## 5. O confronto

Com uma base escolhida, a camada de fatos faz exatamente o mesmo de sempre (alinhamento por sinônimos, cada frase
como fato, contrária, observação ou fora, os fatos necessários, os mecanismos), só que contra essa base. A resposta
leva `base: { nome, fatos }`, com os fatos citados e as fontes, para a interface mostrar qualquer base. Sem base
escolhida, nada muda: é a realidade-v1.

Na Conversa, quando o serviço tem bases locais, aparece a escolha "Conferir os fatos contra": a realidade registrada
ou uma base local. A escolha fica neste aparelho.

## 6. O que a base local não é

- Não é verdade sobre o mundo: é o que a pessoa registrou. O cartão diz "a base de fatos *nome*", não "a realidade
  registrada".
- Não substitui a realidade-v1: quem quiser as duas usa `"juntarCom": ["realidade-v1"]`, e uma contradição entre a base
  e a realidade aparece na conferência da seção 4.
