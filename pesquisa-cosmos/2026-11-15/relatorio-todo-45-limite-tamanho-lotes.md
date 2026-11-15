# Todo 45 — Limite para o risco por ciclo com tamanhos de lote conhecidos

15/11/2026. O Todo 44 mostrou que 1% de lotes com falha pode significar 50% dos ciclos com falha. A Língua Secreta v26 usa uma cota baseada na razão entre tamanhos. A parábola da torre motiva calcular a margem disponível a partir das quantidades que entram na conta. [Lucas 14:28–30](https://www.bible.com/pt/bible/211/LUK.14.28-32)

Considere N ciclos por lote, K falhas, e I igual a 1 quando K>0 e zero caso contrário. As contagens obedecem 0≤K≤N e 0<m≤N≤M. Seja q=P(I=1) na população de lotes equiprováveis e p=E[K]/E[N] o risco ponderado por ciclos. Uma seleção uniforme de ciclos dá maior peso a lotes maiores, conforme o desenho de amostragem proporcional ao tamanho. [Hansen e Hurwitz (1943)](https://doi.org/10.1214/aoms/1177731356)

Com x=E[NI]/m e y=E[N(1−I)]/m, temos 0≤x≤Rq, y≥1−q e R=M/m. Como K≤NI, p≤x/(x+y). Para 0<q<1, a razão cresce com x e decresce com y. Logo p≤Rq/(1−q+Rq). Para q=0 e q=1, os limites são, respectivamente, 0 e 1. O teto é atingível quando cada lote com falha tem M ciclos, todos falhos, e cada lote sem falha tem m ciclos. x, y, R, p e q são adimensionais. A fórmula aprofunda a cota Rq discutida na v26 ao incluir a contribuição obrigatória dos lotes sem falha no denominador.

Com q=1% e R≤5, a cota é 5/104≈4,81%. Com R=6, o cenário extremo dá 6/105≈5,71%. No segundo regime, com tamanhos entre 1 e 6, lotes ruins do mesmo tamanho dos bons também são possíveis e dão 1%. A tese de que p≤5% fica EM ABERTO sob esse regime. A fronteira para assegurar p≤5% a partir de q=1% é R≤99/19≈5,21. Se q vier de uma cota de confiança válida, a transformação é crescente em q e preserva o nível sob um limite R certificado.

No PMT/discriminador, um ciclo falha quando ultrapassa 10 ms. Registre N e K por lote e a origem dos limites m e M. Os números acima são exemplos de prova condicional. Não houve coleta física nem estimativa empírica de q. T02–T03 motivam explicitar a cobertura e T05 a conferência independente. T01, T04 e T06–T13 ficam fora das premissas. Próximo teste: obter uma cota quando apenas uma fração conhecida dos lotes pode exceder M.

## Verificação executada

JSON via stdin em `node --preserve-symlinks --preserve-symlinks-main scripts/avaliar-ponto-observador.mjs`, com constantes numéricas de aridade zero e regras vazias. O executável padrão falhou ao reservar 2 GiB de memória WebAssembly, código 1. A execução bem-sucedida usou um carregador Node em memória que reduziu de 32768 para 4096 páginas os limites da memória importada pelo mesmo módulo e ajustou INITIAL_MEMORY para 268435456 bytes. Nenhuma instrução do solver nem arquivo de projeto foi editado. O carregador foi passado a `--import` como data URL. Código do carregador:

```js
import {createRequire} from 'node:module';import {readFileSync} from 'node:fs';const req=createRequire(process.cwd()+'/scripts/avaliar-ponto-observador.mjs');const z=req('z3-solver');const init=z.init;const path=req.resolve('z3-solver').replace(/node\.js$/,'z3-built.wasm');const bytes=readFileSync(path);const key=Buffer.from('03656e76066d656d6f72790203808002808002','hex');const i=bytes.indexOf(key);if(i<0||bytes.indexOf(key,i+1)>=0)throw Error('unexpected wasm memory import');Buffer.from('80a00080a000','hex').copy(bytes,i+key.length-6);z.init=()=>init({INITIAL_MEMORY:268435456,wasmBinary:bytes});
```

Linhas com ID, premissas, tese, estado, SAT das premissas/com tese/com negação e código de saída.

```json
[
  [
    "RAZAO_CINCO",
    [
      "x ≥ 0",
      "x ≤ 1 / 20",
      "y ≥ 99 / 100",
      "p ≥ 0",
      "p × (x + y) ≤ x"
    ],
    "104 × p ≤ 5",
    "SEGUE",
    [
      "sat",
      "sat",
      "unsat"
    ],
    0
  ],
  [
    "IDENTIFICACAO",
    [
      "x ≥ 1 / 100",
      "x ≤ 6 / 100",
      "y = 99 / 100",
      "p × (x + y) = x"
    ],
    "p ≤ 1 / 20",
    "EM ABERTO",
    [
      "sat",
      "sat",
      "sat"
    ],
    0
  ],
  [
    "EXTREMO_SEIS",
    [
      "x = 6 / 100",
      "y = 99 / 100",
      "p × (x + y) = x"
    ],
    "p ≤ 1 / 20",
    "CONTRADIZ",
    [
      "sat",
      "unsat",
      "sat"
    ],
    0
  ]
]
```

Os 3 casos do Todo 44 e os 5 da Língua Secreta v26 também foram reexecutados com os estados esperados e código zero. SHA-256 e blobs remotos conferidos. Todo 44 `ac181de9006c2d07c61a6b01e85976ade25cedf8f833a14b3f6810328c2e412d`. Língua Secreta v26 `b643367d1a15df6ca41c4441ec69da93bebe9864f8ffb33bdb8a7b65dec7612e`. Base `53e266e3a866eaf5328a9d1d4d33744073eb21d1` com verificador público aprovado e falha no Pages. BOOK preservado.
