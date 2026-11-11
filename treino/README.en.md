# Training the I-AI (phases E and F of the closing plan)

**Português:** [README.md](README.md). This is a translation; if the two differ, the Portuguese text prevails.

Training only starts after the baseline (phase C) and the improvements without training (phase D), and only if the goal
has not been reached. Everything here is public and reproducible; the closed set never goes in.

The model is trained on sentences in Portuguese, and the data stay in Portuguese.

## 1. Data (on the PC, in the Cosmos folder)

Since 2026-10-30 training uses the blind translation (`cego-v2`, the same as the service and the Conversation): each
sentence becomes two conversations, the one for the premises (without the conclusion) and the one for the conclusion
(only the sentence and the vocabulary in use); one item in five goes with the vocabulary given, which is the path for
"correcting the terms". The test `testes/exportar-treino-alinhamento.test.ts` guarantees that the exported conversations
are exactly the ones the service sends to the model.

The batches (all from the public generator, with a fixed seed):

```
python -I -X utf8 -B scripts/gerar-frases.py treino2 privado/treino/treino2.jsonl
python -I -X utf8 -B scripts/gerar-frases.py visao privado/treino/visao.jsonl
```

`treino2` (3000) has all the training templates and those for the v3 errors; `visao` (900) has the worldview sentences
(formalizacao-v1.md §9). Each slice of 25 items is checked by Z3 in a process of its own; the rejected ones stay out:

```
$env:FRASES_ARQUIVO='privado/treino/visao.jsonl'; $env:FRASES_RECUSADOS='privado/treino/visao-recusados.jsonl'
foreach ($i in 0..35) { $env:FRASES_FATIA="$($i*25)-$($i*25+25)"; node node_modules/vitest/vitest.mjs run testes/frases-geradas.test.ts }
```

Then, against the closed set (and, to be careful, against the test half of the G- sentences):

```
python -I -X utf8 -B scripts/anti-vazamento.py privado/avaliacao-fechada-v1/conjunto.jsonl privado/treino/treino2.jsonl privado/treino/visao.jsonl avaliacao/validacao-v1.jsonl
```

Against the closed set it must give 0 on everything. Next, the export (one file per batch, joined afterwards) and the
validation:

```
$env:TREINO_ARQUIVO='privado/treino/treino2.jsonl'; $env:TREINO_SAIDA='privado/treino/treino2-chat.jsonl'; node node_modules/vitest/vitest.mjs run testes/exportar-treino.test.ts
$env:TREINO_ARQUIVO='privado/treino/visao.jsonl'; $env:TREINO_SAIDA='privado/treino/visao-chat.jsonl'; $env:TREINO_RECUSADOS='privado/treino/visao-recusados.jsonl'; node node_modules/vitest/vitest.mjs run testes/exportar-treino.test.ts
$env:TREINO_ARQUIVO='avaliacao/validacao-v1.jsonl'; $env:TREINO_SAIDA='privado/treino/validacao-chat.jsonl'; Remove-Item Env:TREINO_RECUSADOS; node node_modules/vitest/vitest.mjs run testes/exportar-treino.test.ts
```

`treino-chat.jsonl` is the shuffled union of the first two (seed 0). Before training: the owner's reading of a sample
(step E4) and the stamping of the SHA-256 of `treino-chat.jsonl` in Bitcoin (step E5).

### The published data (2026-11-11)

The files exported on 2026-10-30 are in `treino/dados/`, compressed with gzip. The SHA-256 is that of the uncompressed
file:

| File | Conversations | Uncompressed SHA-256 |
|---|---|---|
| `treino-chat.jsonl.gz` | 7800 | `7ef86c70f82d2ed050edd5ede8b1b4784f5619c52d6bc5fe57e422b094254c20` |
| `validacao-chat.jsonl.gz` | 300 | `90b3ce0cbd4d3214e82f31a0c6a40686f92bfdf55a1bf632caeda21631151912` |

`amostra-para-ler.md` carries the 30 examples for the reading in step E4. To decompress: `gzip -dk treino/dados/*.gz`.
Steps E4 and E5 are still pending.

## 2. Training (Kaggle or Colab, T4 GPU)

1. New notebook, **T4 GPU** accelerator, internet on.
2. Upload `treino-chat.jsonl`, `validacao-chat.jsonl`, `sft-qlora.py` and `mesclar.py`.
3. In a cell:
   ```
   !pip install -q peft bitsandbytes accelerate
   !python sft-qlora.py --treino treino-chat.jsonl --validacao validacao-chat.jsonl --saida adaptador --amostra 100 --epocas 1
   ```
   This is the end-to-end trial run with 100 examples. If it finishes without errors, run it without `--amostra` and
   with `--epocas 3`.
4. Send Claude what the script prints at the end and `adaptador/cosmos-treino.json` (loss per epoch, best
   checkpoint, hashes, revision of the base model).

The script computes the loss on the answer only, turns off "thinking mode", measures validation at each epoch and stops
early if it gets worse. The loss is not the score: the score is that of the final file, through Z3.

## 3. Final file (GGUF) and Ollama

In the same notebook:

```
!python mesclar.py --adaptador adaptador/final --saida mesclado
!git clone --depth 1 https://github.com/ggml-org/llama.cpp && pip install -q -r llama.cpp/requirements.txt
!git -C llama.cpp rev-parse HEAD
!python llama.cpp/convert_hf_to_gguf.py mesclado --outtype f16 --outfile cosmos-f16.gguf
!cmake -S llama.cpp -B llama.cpp/build -DGGML_CUDA=OFF && cmake --build llama.cpp/build --target llama-quantize -j
!llama.cpp/build/bin/llama-quantize cosmos-f16.gguf cosmos-iai-q4_k_m.gguf Q4_K_M
!sha256sum cosmos-iai-q4_k_m.gguf
```

Download `cosmos-iai-q4_k_m.gguf` (about 2.5 GB) to `privado/treino/`. On the PC, the `Modelfile` uses the same Qwen3
chat template that Ollama already has:

```
ollama show qwen3:4b --modelfile > privado/treino/Modelfile
```

In the file, replace the line `FROM …` with `FROM ./cosmos-iai-q4_k_m.gguf` and run:

```
cd privado/treino; ollama create cosmos-iai:v1 -f Modelfile
```

The score that counts is this model's, through the pilot with `PILOTO_MODELO=cosmos-iai:v1`: first on validation, and
only then, once, on the 120 (step F5).
