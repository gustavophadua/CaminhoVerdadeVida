# Do autor

**English:** [README.en.md](README.en.md)

Obras do autor do Cosmos, públicas desde 11/11/2026 por decisão dele. Não são resultados do Cosmos: são o que o autor
pensa. O que o verificador já conferiu está marcado como conferido, e o resto continua sendo hipótese do autor.

| Pasta | O que é |
|---|---|
| `projeto-tubo/` | O modelo Alpha e Omega, o Tubo. O `PROMPT.md` reúne o que o autor disse (Apêndice A, como foi escrito), o que é suposição (S1 a S16), as decisões em aberto (D1 a D35) e o que foi conferido. Junto vêm a máquina (`maquina-do-tubo.html`), as conferências pelo Z3, as 22 pranchas (`ilustracoes/`) e a base `base-tubo-v1.json` para o verificador. |
| `principia/` | O Principia: o texto (`principia-texto.txt`, extraído do PDF original página por página) e as notas organizadas para o app (`principia.json`: 68 notas e 38 termos de dicionário, com as conferências feitas pelo app de 10 a 12/10/2026). |

## Em inglês

As traduções ficam ao lado dos originais, com `.en` no nome: `projeto-tubo/PROMPT.en.md`, `equacoes.en.md`,
`solucoes.en.md`, `multiverso.en.md` e `pi.en.md`; `principia/principia-texto.en.txt` e `principia/principia.en.json`
(a pasta `principia-en` no app, com as mesmas fórmulas e símbolos). O original em português prevalece. Continuam só em
português a máquina (`maquina-do-tubo.html`), as pranchas (`ilustracoes/`), os comentários do código e a base
`base-tubo-v1.json`, cujas frases o verificador lê em português.

## O que mudou na publicação

- O nome próprio do autor foi trocado por "[nome do autor]", no texto e no campo "titular" das notas. Nada mais foi
  alterado no texto.
- No `principia-texto.txt`, os 26 caracteres que a extração do PDF perdeu (índices como ⱼ) aparecem como "�".
- Nos testes do Tubo (`projeto-tubo/cosmos/`), o caminho da base passou a ser o deste repositório.

## Como usar

- **A máquina:** abra `projeto-tubo/maquina-do-tubo.html` no navegador. Os testes do motor, dentro da pasta:
  `node teste-do-motor.js maquina-do-tubo.html`.
- **As conferências em Python** (`confere-z3.py`, `equacoes-sem-solucao.py`, `solucoes-z3.py`, `multiverso-z3.py`,
  `pi-confere.py`, `comprovador.py`, `ponte.py`, `godel.py`) precisam do pacote `z3-solver` do Python.
- **O Tubo no verificador do Cosmos**, na raiz do repositório:
  `npx vitest run --config autor/projeto-tubo/cosmos/vitest.config.ts`. Cada arquivo de teste abre o Z3 (cerca de
  2 GB), por isso eles ficam fora da suíte da CI.
- **Conferir frases contra o Tubo na Conversa:** copie `projeto-tubo/base-tubo-v1.json` para `privado/bases/` e escolha
  "a base local tubo-v1" (`especificacao/bases-locais-v1.md`). A base soma a realidade registrada às regras do Tubo.

## Limites

- "Conferido pelo Z3" quer dizer que a conclusão segue das regras escritas, não que o modelo descreva o mundo.
- Muitas regras da máquina ainda são suposições à espera da decisão do autor.
- `Selo.pdf` traz as cinco imagens iniciais e quatro fotos do caderno. A quinta imagem usa um diagrama de onda
  eletromagnética de origem não registrada, que pode ser de terceiros.
- O `PROMPT.md` cita `graficos-gen.js`, que não está na pasta, e links de artefatos privados do autor, que não abrem para
  outras pessoas.
- O texto do colaborador (Apêndice A.2 do `PROMPT.md`) é citado, sem o nome dele, para a crítica da seção 3.4.

## Licença

O código das pastas segue a AGPL-3.0-or-later. Os textos e as imagens do autor estão sob CC BY 4.0 desde 11/11/2026
(`LICENSES/CC-BY-4.0.txt`): qualquer pessoa pode copiar, adaptar e reusar, inclusive comercialmente, desde que dê o
crédito e indique o que mudou. Crédito: "do autor do Cosmos (github.com/gustavophadua/Cosmos), CC BY 4.0".

Ficam fora dessa licença os elementos de terceiros: o diagrama de onda eletromagnética da quinta imagem do `Selo.pdf` e
o texto do colaborador (Apêndice A.2 do `PROMPT.md`). Detalhes em `LICENCAS.md`.
