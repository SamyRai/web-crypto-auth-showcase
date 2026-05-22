# web-crypto-auth-showcase

[![CI](https://github.com/SamyRai/web-crypto-auth-showcase/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/SamyRai/web-crypto-auth-showcase/actions/workflows/ci.yml)
[![Deploy to GitHub Pages](https://github.com/SamyRai/web-crypto-auth-showcase/actions/workflows/pages.yml/badge.svg?branch=main)](https://github.com/SamyRai/web-crypto-auth-showcase/actions/workflows/pages.yml)

**[Live Demo](https://SamyRai.github.io/web-crypto-auth-showcase/)**

A React + TypeScript + Vite app that demonstrates **browser security and cryptography**: passkeys (WebAuthn), Web Crypto (password-based and public-key encryption, hashing, key derivation, signatures), and secure context. All demos run in the browser; no server required.

## Stack

- **React 19** + **TypeScript** (Vite 7)
- **Tailwind CSS 4.1** (`@tailwindcss/vite`)
- **Zod 4** (schema validation at boundaries)
- **React Router 7**
- **Yarn** (package manager)

## Quick start

```bash
yarn install
yarn dev
```

Open [http://localhost:5173](http://localhost:5173). WebAuthn and Web Crypto require a **secure context** (HTTPS or `localhost`).

## App structure

| Route | Page | Description |
|-------|------|-------------|
| `/` | **Home** | Overview with links to Auth, Encrypt & keys, Learn. |
| `/auth` | **Auth** | Passkey demo: create and sign in with a device passkey (Touch ID, Face ID, Windows Hello). |
| `/encrypt` | **Encrypt** | Password-based encryption: PBKDF2 + AES-GCM, SHA-256 hash. |
| `/cert-chat` | **Cert / Chat** | Public-key encryption (RSA-OAEP), decrypt (with optional private-key paste), Theory tab, Security tab (digest, HKDF, sign/verify, cert & TLS). |
| `/learn` | **Learn** | Theory & best practices: WebAuthn, cross-device, master key storage, browser APIs, references. |

Navbar: **Home** | **Auth** | **Encrypt** | **Cert / Chat** | **Learn**.

## What each section does

### Home (`/`)

Overview of the demo: three cards — **Authenticate** (passkeys), **Encrypt & keys** (Encrypt + Cert/Chat), **Learn** (theory). Quick entry to any part of the app.

### Auth (`/auth`)

- **Create passkey** — `navigator.credentials.create({ publicKey })` to register a passkey for this origin. Touch ID / Face ID secures it.
- **Authenticate with passkey** — `navigator.credentials.get({ publicKey })` to sign in. After success, you’re taken to **Learn** with a “You’re signed in” note and credential ID. User verification is required; the assertion payload is explained.
- Links to Encrypt and Learn (theory without login).

### Encrypt (`/encrypt`)

- **PBKDF2** (310k iterations, SHA-256) + **AES-GCM** to encrypt/decrypt a message with a password. Salt and IV are random; stored with ciphertext. Theory notes: IV must be unique (reuse breaks confidentiality), vault-style derivation, secure context.
- **SHA-256** hash for integrity (not for passwords).

### Cert / Chat (`/cert-chat`)

- **My key pair** — Generate RSA-OAEP 2048-bit key pair. Share your **public key** (SPKI base64); keep **private key** secret. You can also **paste your private key** (PKCS#8 base64) in the Decrypt tab for decrypt-only (e.g. another device).
- **Encrypt** — Paste recipient’s public key, type message (max 190 bytes), encrypt. Copy ciphertext to Decrypt or another party.
- **Decrypt** — Paste ciphertext; decrypt with your private key (from key pair or from paste). Debug sidebar shows algorithm, key usages (encrypt/decrypt), fingerprint, step log.
- **Theory** — Key exchange (manual paste vs Signal/WhatsApp/PKI/TOFU/PGP), browser security primitives (secure context, digest, sign/verify, certs), JWK & hybrid encryption note, references.
- **Security** — Live demos: secure context + `crypto.subtle` + `getRandomValues`, SHA-256 digest, **HKDF** (derive bits from high-entropy secret), RSA-PSS sign/verify, Cert & TLS links.

### Learn (`/learn`)

After passkey sign-in or via “Learn” in nav: WebAuthn explanation, best practices, cross-device & Android, master key storage, **browser APIs** (Web Crypto with links to Encrypt and Cert/Chat, Credential Management, Storage Access, secure context), references.

## Why didn’t Touch ID / Face ID prompt?

1. **Registration** (`credentials.create`) — Create a passkey for this site; the OS stores it (e.g. iCloud Keychain). Touch ID authorizes creation.
2. **Authentication** (`credentials.get`) — Sign in with an existing passkey. The browser asks the OS for passkeys for this origin (`rpId`). If none exist, Touch ID is never called. **Create a passkey first**, then authenticate.

## Important for production

- **Challenges** must be generated on the **server** (crypto random, ≥16 bytes).
- **Assertions** must be sent to the server and **verified** with the stored public key and challenge.
- This demo uses client-generated challenges only to show the browser flow; it is **not** secure for real authentication.

## Project structure

Naming and ownership follow route/feature alignment and single responsibility:

- **`src/lib/`** — Pure logic: `secure-context.ts`, `webauthn.ts`, `webcrypto.ts`, `publicKeyCrypto.ts`, `signVerify.ts`, `hkdf.ts`. No React.
- **`src/context/`** — `EnvironmentContext`: `isSecureContext`, `webauthnSupport`.
- **`src/hooks/`** — Environment, passkey, encrypt form, cert-chat (`useKeyPair` with generate, loadFromPaste, loadPrivateKeyOnly; encrypt/decrypt with debug).
- **`src/components/`**
  - **`layout/`** — App shell: `AppLayout`, `AppNavbar`.
  - **`auth/`** — Auth route UI: `SecureContextAlert`, `WebAuthnSupportAlert`, `PasskeyCreateSection`, `PasskeyAuthSection`, `TouchIdNote`, `AuthNav`.
  - **`encrypt/`** — Encrypt route UI: password-based encrypt/decrypt sections, hash, theory, `SecureContextAlert`.
  - **`cert-chat/`** — Cert/Chat route UI: key pair, Encrypt/Decrypt/Theory/Security tabs and their sub-sections (e.g. `HashDemoSection`, `SignVerifySection`).
  - **`learn/`** — Learn route content: `PasskeyResultSection`, `WebAuthnSection`, `BestPracticesSection`, `CrossDeviceSection`, `MasterKeySection`, `BrowserApisSection`, `AdjacentApisSection`, `ReferencesSection`.
- **`src/pages/`** — One page per route: `OverviewPage` (/), `AuthPage` (/auth), `LearnPage` (/learn), `EncryptPage` (/encrypt), `CertChatPage` (/cert-chat).

## Scripts

| Command       | Description              |
|---------------|--------------------------|
| `yarn dev`    | Start dev server         |
| `yarn build`  | Production build         |
| `yarn preview`| Preview production build |
| `yarn lint`   | Run ESLint               |

## Context

Aligned with the vault project docs:

- `docs/fingerprint-biometric-authentication.md` — WebAuthn, platform authenticators, passkeys.
- `docs/master-key-storage-options.md` — Master key storage; client vs server; password-manager style.
