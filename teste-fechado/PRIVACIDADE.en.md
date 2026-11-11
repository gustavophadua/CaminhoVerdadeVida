# Privacy notice of the Cosmos closed test

**Português:** [PRIVACIDADE.md](PRIVACIDADE.md). This is a translation; if the two differ, the Portuguese text prevails.

> **DRAFT for review.** Prepared to guide the test, in light of the LGPD (Brazil's General Data Protection Law, Law
> 13.709/2018); it is not a legal opinion. It needs to be reviewed by a lawyer and completed with the controller's
> details before using it with outside people.

**Controller:** [name of the person or company responsible] · **Privacy contact:** [channel]

## What stays on your computer (and only there)

- **The account:** a nickname and a key created on the device. The password is never stored or sent; it derives the key
  that encrypts the data.
- **The Conversation history and the error reports:** encrypted with your account's key, in the browser's storage.
- **The text you write:** translated by the AI model that runs on your computer (Ollama) and checked by Z3, also on your
  computer.

Cosmos has no automatic collection, telemetry, ads or tracking cookies. Nothing is sent to the person responsible for
the test unless you export and send a file.

## When something leaves the computer

- **Large model in the cloud (optional, starts off):** if you turn it on, the text of the argument is sent to the Groq
  service (Groq, Inc., in the United States) to be translated, and the screen warns you. Groq's privacy policy applies.
  The decision (Z3) stays on your computer.
  By turning the cloud on, you authorize sending the text to the United States, an international transfer.
  According to Groq's documentation checked on 2026-10-30, inference content is not retained by default,
  but usage metadata is collected and retained. There are content-retention exceptions for features that need
  persistence and for reliability and abuse investigation; the latter may last up to 30 days,
  or longer by legal obligation. This notice does not promise zero retention.
  Source: https://console.groq.com/docs/your-data. The actual conditions and controls need to be reviewed
  for the account used, along with the mechanism applicable to the international transfer.
- **Exported error reports:** only if you download the file and send it. It contains the question, the translation, the
  class and your comment; it does not contain your password, your key or the rest of the history.
- **Installation:** the downloads of Node.js, Ollama, the pieces of Cosmos and the model come from those projects'
  sites.

## What we use what you send for

Fixing Cosmos's errors and, without identifying you, training and measuring the project's own model (legal basis: your
consent when sending). We keep the reports for as long as development lasts, and you can ask for deletion at any time.

## Your rights

Under the LGPD, you can request confirmation, access, correction, anonymization, portability and deletion of the data you
sent us, and revoke your consent, through the contact above. The data that stays only on your computer is under your
control: deleting the Cosmos folder and the site's data in the browser deletes everything.
