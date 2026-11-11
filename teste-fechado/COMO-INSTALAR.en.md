# Cosmos: how to install and use it (closed test)

**Português:** [COMO-INSTALAR.md](COMO-INSTALAR.md). This is a translation; if the two differ, the Portuguese text
prevails.

**What it is.** Cosmos reads a line of reasoning written in Portuguese, draws the argument (the facts, the missing link
and the conclusion) and says, with a computer proof, whether the conclusion follows from what was said. The one that
decides is a logic verifier (Z3), not the AI. This is a test version: it can make mistakes, and your error report is
what helps most.

**What you need.** Windows 10 or 11, 8 GB of memory (16 GB is better), about 4 GB free and internet only during
installation.

## Installing (once, about 10 minutes)

1. Copy the `Cosmos` folder to the computer (for example, to the Desktop).
2. Double-click **`Instalar-Cosmos.cmd`**. It checks and, if missing, installs Node.js and Ollama (Windows may ask for
   confirmation), the pieces of Cosmos and the AI model (about 2.5 GB).
3. At the end, the **Cosmos** shortcut appears on the Desktop.

To only check, without installing anything: `powershell -ExecutionPolicy Bypass -File scripts\instalar-windows.ps1 -Conferir`.

## Using it

1. Open the **Cosmos** shortcut. A black window starts the service (leave it open) and the browser opens the
   Conversation.
2. The first time, create your account: a nickname and a password of 12 characters or more. **Keep the password**: it
   encrypts your history and there is no way to recover it. The AI stays tied to your account.
3. Write a line of reasoning, for example: *"Toda pessoa é necessária ao todo. Nenhuma pessoa é dona da sua função.
   Logo, nenhuma pessoa invalida a existência de outra."* (Every person is necessary to the whole. No person owns their
   function. Therefore, no person invalidates the existence of another.) Cosmos answers with the map of the argument.
4. Check the **"entendi:"** (I understood) under each sentence. If a term was read wrongly, use **Corrigir os termos**
   (Correct the terms).
5. Found an error? Click **Isso está errado** (This is wrong) and say what it was. To send it to us, use **exportar**
   (export) in the sidebar and send the file `cosmos-relatos-de-erro.json` through the agreed channel.

## Good to know

- Without internet, everything runs on your computer: the text does not leave it. Each question takes from 30 seconds
  to 3 minutes, depending on the computer.
- The **large model in the cloud** option (when available) answers in seconds and reads abstract sentences better, but
  then the text of the argument goes to an external service (Groq). It starts off.
- The account locks by itself after 10 minutes idle; just sign in again.
- If the AI says it is tied to another account, let us know: the service accepts one owner account per computer.
