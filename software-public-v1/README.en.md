# COSMOS - sanitized public package v1

**Português:** [README.md](README.md). This is a translation, added on 2026-11-11; it is not one of the files of the
original selection, and if the two differ, the Portuguese text prevails.

Local preparation, without publication. Origin: `aacecce9f606fe73789fbd74135fc01abd5ea356`, branch `codex/fase4-b-5p4c`.

Includes SMT2 (20 variables, 75 clauses), WGSL source, Alethe proof, hashes and a derived receipt. The three artifacts were preserved byte for byte. Historical dispatch: 16,384 groups of 64 invocations. The receipt was rebuilt by explicit selection of fields and has its own hash. The origin identifies the code milestone; it does not claim that the final local receipt is inside that commit.

The originals already published remain in the branch history for checking. This package does not remove them or make them private. The historical artifact remains intact. Executables, binary witnesses, the complete Cargo.lock, workbench metadata and raw logs are not part of this directory.

## Consumption by SHA-256

hashes.json distinguishes included files from references without a file. A local loader must explicitly receive the authorized file, check its size and SHA-256 before handing it to the consumer, and reject divergences. Local Git reads must use the full commit above, never a moving branch, followed by SHA-256 verification of the bytes. No loader, automatic download or training is run or supplied in this delivery. The public consumer has the proof and the selected sources; for the witnesses, only size and hash. A hash alone does not allow training.

To check the formal proof, you must separately obtain the approved Carcara and verify its pin before running it. The results 1035/1035, 29/29 and Naga are historical, not a new suite of this package. The sanitized receipt is not a signature, an OTS stamp or an attestation of the hardware.

This directory is a distribution selection, not a cleanup of the whole repository. A future publication must select only these files, without automatically including the Git history.
