# Provenance of the training corpus

**Português:** [proveniencia-treino.md](proveniencia-treino.md). This is a translation; if the two differ, the
Portuguese text prevails.

Check of 2026-10-30. Origin: `scripts/gerar-frases.py`; exporter: `testes/exportar-treino.test.ts`.

## Counts and unit

The package `cosmos-treino/para-o-kaggle` contains 7,800 training **conversations**, corresponding to 3,900 arguments, and 300 validation conversations, corresponding to 150 arguments. Each argument produces two conversations: premises without the conclusion, and the conclusion with the vocabulary. They are not 7,800 different arguments.

The check of the ids found 6,000 T- conversations and 1,800 W- in training; 300 V- in validation. No other prefixes were found in these files. Only the ids were read for this count; the byte-by-byte derivation of the package was not redone.

## Generation

The generator uses templates of sentences and formulas, its own vocabulary and `random.Random` with a seed derived from the SHA-256 of the mode. Available modes: `validacao`, `treino`, `revisao`, `treino2`, `revisao2`, `visao`. T- identifies treino/treino2; V-, validation; W-, worldview; R-, revisao/revisao2. The modes actually used for each T- batch need their generation receipts: the prefix alone does not distinguish treino from treino2.

The answer key is built together with the sentences by the templates: formal premises, conclusion and expected class. The test `testes/frases-geradas.test.ts` checks this class with Z3 in slices, and may record rejected ones. The exporter excludes the ids in the indicated file of rejected items. The mere presence of a class in the JSON does not prove that the whole batch was checked in this run.

## Export and exclusions

The exporter only accepts ids matching `^[VTW]-\d+$`; it rejects the file if there is another prefix. So F- (closed), R- (review) and G- (evaluation sentences from another model) stay out. The exporter uses the answer key, the project's own prompts and public examples; it does not call an external model.

In the generation and export path examined, **no example contains output from a third-party model**. This statement describes the mechanism examined; it is not an independent reconstruction of all the bytes of the exported files. New templates may have been inspired by families of evaluation errors, as the comment in `treino2` declares; that is different from inserting external answers into the corpus.

## Licenses and base

The project's own data are declared CC BY 4.0, with attribution to the Cosmos project. The project's code is AGPL-3.0 or later. The planned base is `Qwen/Qwen3-4B`, Apache 2.0; an immutable revision still to be pinned before training. The Ollama digest used in the evaluation does not replace the commit of the base model in training.

Pending traceability items: receipts of the modes and parameters that produced each batch; hashes of the files; the log of rejected items and proof of a complete check of the answer key. The closed set was not accessed.
