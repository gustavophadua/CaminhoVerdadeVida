# The owner's decisions

**Português:** [decisoes-do-dono.md](decisoes-do-dono.md). This is a translation; if the two differ, the Portuguese text
prevails.

The decisions on the project's direction, taken by the owner when asked directly, with the date. Changing one of them is a
new decision, recorded here.

## 2026-10-25

- **Initial fragment for verification:** that of Cosmos (logic m2, translation t1, cvc5 and Carcara), not Lean.
- **Test coin:** the rules recommended in `moeda-teste.md` (genesis of 100 per participant, 10 per accepted
  record, a cap of 100 per week, a 5% burn, a 30-day lock, a 90-day term, invited participants only).

## 2026-10-26

All following the recommendation presented:

| Decision | Choice |
| --- | --- |
| Task for the I-AI pilot | Short sentences in Portuguese formalized in m2, with the conclusion classified (follows, contradicts, independent); see `avaliacao-v1.md` |
| Who approves the text → formula translations | The owner approves each translation in the pilot; an automatic judge only does triage, never approves |
| Axiom policy | Only what is declared in the record counts (explicit premises, in the hash of the theory); nothing is a global axiom |
| Data licenses | Own data and data under permissive licenses (Apache-2.0, MIT, CC BY), with attribution and the license recorded per batch; out: non-commercial, unlicensed and the Principia |
| GPU spending cap | Up to US$ 50 on the first training experiment, and only if the pilot without training shows it is worth it |
| Name of a real coin | Postponed until there is a legal opinion; the test network uses the "test unit", with no value |
| Caderno Lógico | Stays as legacy inside Cosmos, with no new work; what is new goes to Labs |

On the same day, the 502426c seal seed, which was in clear text on the owner's machine (outside Git), was encrypted and the
original deleted.

## 2026-10-28

- **Goal of I-AI v1:** 85% faithful formulas on the closed set, following the recommendation presented after the
  baseline (115/120 = 95.8%, 95% interval from 90.6 to 98.2%). Since the goal has already been reached, the plan goes
  straight to closing: without the improvements without training, without training and without rounds with the verifier;
  2 of the 3 allowed measurements remain. See `avaliacao-v1.md` §7.

## 2026-11-11

- **Publish what was only on the owner's machine, except the API keys and personal data:** the Projeto Tubo
  (`autor/projeto-tubo/`), the Principia without the personal name (`autor/principia/`), the closed evaluation set, which
  is now revealed (`avaliacao/fechado-v1/`; the third measurement is no longer blind), and the training data
  (`treino/dados/`).
- **The old commits stay as they are.** The new ones go out with the private address that GitHub gives the account,
  instead of the personal e-mail.
- **License of the author's texts and images (`autor/`): CC BY 4.0**, the same as the repository's other texts. The
  code stays AGPL. The third-party elements listed in `autor/README.md` are left out.
- **Everything also in English:** each text gets an English translation next to it (`.en.md`), and the app gets an
  English version. The Portuguese original prevails. The sentences the AI reads, the normative examples and the
  evaluation sets stay in Portuguese, because that is the language the model was measured on.
