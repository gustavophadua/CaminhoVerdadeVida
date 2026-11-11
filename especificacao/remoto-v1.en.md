# Remote v1: Cosmos from the phone, with login

**Português:** [remoto-v1.md](remoto-v1.md). This is a translation; if the two differ, the Portuguese text prevails.

Version `remoto-v1`, 2026-11-02. Code: `src/integracoes/remoto-node.ts`, `scripts/cosmos-remoto.mjs`,
`src/interfaces/modo-remoto.ts`. Tests: `testes/remoto.test.ts` and the fallback test in
`testes/integracoes-ollama.test.ts`.

## 1. What changes

Until now, the Conversation only opened on the computer itself (`127.0.0.1`), tied to the device's encrypted account.
Now there are two modes:

| | Local mode (as before) | Remote mode (new) |
|---|---|---|
| How it opens | `Abrir-Cosmos-IA.cmd` | `Abrir-Cosmos-Remoto.cmd` |
| From where | only from this computer | from the phone, from anywhere, through the tunnel |
| Who gets in | the device's encrypted account (seed, signature) | login with the owner's password |
| Translation | local Ollama; Groq if the person turns it on | Groq first, local Ollama as a fallback |
| Where Z3 decides | on this computer | on this computer |
| History | encrypted in the device's account | encrypted on this computer, with the key from the password |
| Account, wallet and test coin | yes | no: they stay in local mode only |

The computer is still the server: the phone only shows the screen and sends the text.

## 2. The owner's decisions (2026-11-02)

- Server: the computer itself, behind a Cloudflare tunnel (without opening a port on the router).
- Login: a single account, the owner's. There is no sign-up over the network.
- Translation: Groq (gpt-oss-120b) first; when it fails, the computer's Ollama.

## 3. How it works

```
phone ──https──▶ Cloudflare ──tunnel──▶ remote port (127.0.0.1:4180) ──secret──▶ internal bridge ──▶ Ollama / Groq / Z3
```

1. **Remote port** (`remoto-node.ts`): the only point the tunnel reaches. It checks the Host, does the login and keeps
   the sessions.
2. **Internal bridge**: the same bridge as local mode, unchanged. It listens on any port of `127.0.0.1` and only serves
   whoever brings a 32-byte secret created each time the program opens. Another program on the computer cannot reach
   the AI without it.
3. **The page**: the same as local mode. The remote port puts the mark `<meta name="cosmos-remoto">` on it, and the
   Conversation swaps the device's account for the login.

## 4. Security

| Threat | Defense |
|---|---|
| Guessing the password | scrypt (N = 2^15); 5 errors in 15 minutes block the login |
| Password leaked over the network | only over https (tunnel); the password is never stored, only the scrypt digest |
| Session theft | `__Host-` cookie with Secure, HttpOnly and SameSite=Strict; 12 hours idle or 7 days in total; in memory only |
| Another site acting on the owner's behalf | SameSite=Strict and, on every request that changes something, the exact origin |
| The page inside another | `X-Frame-Options: DENY` and `frame-ancestors 'none'` |
| A forged header reaching the bridge | only a fixed list of headers passes; cookie, Forwarded and Cloudflare's stay at the port |
| Another program on the computer using the AI | the internal bridge requires the process secret |
| Reading the history on disk | AES-256-GCM, with the key derived from the password at login; the file name goes in as associated data |
| History key left behind in memory | it leaves memory when there is no live session anymore |

The Groq key stays only in the computer's process (variable `GROQ_API_KEY`), never on the phone.

## 5. How to use

1. Install the tunnel, once: `winget install --id Cloudflare.cloudflared`.
2. Open `Abrir-Cosmos-Remoto.cmd`. The first time, it asks for the owner's password (12 to 256 characters), typed in the
   terminal without being shown.
3. The terminal shows the address, for example `https://palavras-aleatorias.trycloudflare.com/cosmos/`. Open it on the
   phone and sign in with the password.

4. To have Cosmos on the phone's home screen, tap **Baixar o app** (Get the app), in the top bar:
   - on Android, the button installs directly when the browser offers it; otherwise, it shows the way through the ⋮
     menu;
   - on iPhone, it shows the way: Safari → Share → Add to Home Screen.

   The installed app opens directly on the Conversation. The remote port serves the manifest and the icons without
   login, because the phone fetches them without the cookie; they contain nothing of the owner's.

On the computer, the same button downloads the Cosmos package for Windows, the repository's `.zip` with
`Instalar-Cosmos.cmd`.

To change the password: `node scripts/cosmos-remoto.mjs --definir-senha`. The new password generates another key, and
the old remote history can no longer be read.

## 6. Limits

- **The computer needs to be on,** with the program open. Without that, the phone has no one to ask.
- **The quick tunnel's address changes each time the program opens.** A fixed address requires a named Cloudflare
  tunnel, with a domain of your own (`--host=cosmos.your-domain.com`).
- **Cloudflare cuts off a response that takes more than 100 seconds.** Groq answers in seconds. But Ollama on the CPU,
  when it steps in as a fallback, can go past that, and then the phone receives an error. The solution is for the
  translation to become a background task, like the reviewer; this has not been done yet.
- **In remote mode, the text of the argument goes out to Groq,** as in local mode with the cloud turned on. Whoever
  wants nothing to leave the computer uses local mode.
- **Sessions are kept in memory only:** when the program closes, you have to sign in again.

## 7. Verified on 2026-11-02

- `testes/remoto.test.ts` (6 tests): Host, login, origin, cookie, blocking, header forwarding, the internal bridge's
  secret and the history encrypted and bound to the file name.
- `testes/integracoes-ollama.test.ts`: Groq without quota hands over to Ollama; a refusal by the provider does not.
- End to end, in the browser at phone size (375 × 812), with `--sem-tunel` and a test password:
  1. the login opens;
  2. "Every person is part of the whole. Therefore, every person is limited in what they see" was translated by Groq in
     about 10 seconds, with the reality layer (premise is fact R05, R11 and R31; conclusion is fact R27 to R30);
  3. the history comes back after reloading the page;
  4. "Sair" (Sign out) ends the session.
- The Cloudflare tunnel has **not** been tested yet: `cloudflared` was not installed on this computer.
