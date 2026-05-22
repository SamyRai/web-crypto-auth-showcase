/**
 * Theory tab: how we "send" the key in this demo vs how real apps solve key exchange.
 */

export function TheoryTab() {
  return (
    <div className="flex-1 overflow-auto p-6 max-w-3xl">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
        Key exchange: how do you get the key to the other user?
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">
        In this demo you <strong>paste</strong> the public key (copy from one place, paste in another). Exchanging public keys lets others <strong>encrypt</strong> to you; the public key can only encode, not decode — only your private key can decrypt. Real apps rarely rely on manual paste. Here’s how keys are “sent” here vs in production.
      </p>

      {/* 1. This demo */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
          1. This demo: manual copy‑paste
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
          We don’t “send” the key over the network. You:
        </p>
        <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1 mb-3">
          <li>Generate a key pair and <strong>copy</strong> “My public key” (SPKI base64).</li>
          <li>Paste it into the <strong>Encrypt</strong> tab as “Recipient’s public key” (same browser, same tab flow), or</li>
          <li>Share that text with someone else (chat, email, link) and they paste it into their app.</li>
        </ul>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          So the key is exchanged <strong>out-of-band</strong> (by you copying it), not by the app sending it. That’s secure as long as the channel you use to share the key (e.g. meeting in person, verified chat) is trusted. No server is involved in the exchange.
        </p>
        <p className="text-stone-600 dark:text-stone-400 text-sm mt-2">
          We use <strong>SPKI</strong> (public) and <strong>PKCS#8</strong> (private) base64. Web Crypto also supports <strong>JWK</strong> (JSON Web Key) for import/export — see <a href="https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#jwk" target="_blank" rel="noopener noreferrer" className="underline">MDN</a>. RSA-OAEP has a small plaintext limit (~190 bytes for 2048-bit). For longer messages, apps use <strong>hybrid encryption</strong>: encrypt the data with a random AES key, then encrypt that key with the recipient’s RSA public key.
        </p>
      </section>

      {/* 2. The problem */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
          2. The key exchange problem
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
          If the app (or a server) sends “Bob’s public key” to Alice, how does Alice know it’s really Bob’s and not an attacker’s? An attacker could:
        </p>
        <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1 mb-3">
          <li>Replace Bob’s public key with their own (man-in-the-middle).</li>
          <li>Decrypt messages Alice encrypts “for Bob,” re-encrypt for Bob, and read everything.</li>
        </ul>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          So <strong>distribution</strong> (how the key gets to the user) and <strong>verification</strong> (how the user knows it’s the right key) are the two halves of the problem. Real apps combine both.
        </p>
      </section>

      {/* 3. How public apps solve it */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
          3. How public apps solve key exchange
        </h3>

        <div className="space-y-6">
          {/* 3a. Out-of-band */}
          <div>
            <h4 className="text-base font-medium text-stone-800 dark:text-stone-200 mb-1">
              A. Out-of-band verification
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
              The key (or a fingerprint) is delivered or checked through a channel separate from the app:
            </p>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
              <li><strong>In person</strong> — Show QR code or read fingerprint; no server in the loop.</li>
              <li><strong>QR code / safety numbers</strong> — Signal, WhatsApp: each device has a fingerprint; you scan the other’s QR or compare numbers. That’s out-of-band verification of the key the server already gave you.</li>
              <li><strong>Link / email</strong> — You send a link that contains or points to the public key; security depends on the link channel (e.g. verified email).</li>
            </ul>
          </div>

          {/* 3b. Key server + verify */}
          <div>
            <h4 className="text-base font-medium text-stone-800 dark:text-stone-200 mb-1">
              B. Key directory / server + optional verification
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
              Apps like Signal and WhatsApp use a <strong>central server</strong> to distribute public keys and relay ciphertext. You don’t paste keys; the app fetches “Bob’s key” from the server. The risk: a compromised server could give you a fake key (MITM). So:
            </p>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
              <li>They use protocols (e.g. <strong>X3DH / PQXDH</strong>) so that the server never sees the shared secret; it only stores and serves public keys.</li>
              <li>They offer <strong>manual verification</strong>: compare safety numbers or scan a QR code (out-of-band). If they match, the key you got from the server is the same as the other device’s key.</li>
              <li>In practice many users never verify; security then relies on server integrity and protocol design.</li>
            </ul>
          </div>

          {/* 3c. PKI / CAs */}
          <div>
            <h4 className="text-base font-medium text-stone-800 dark:text-stone-200 mb-1">
              C. PKI and certificate authorities (HTTPS, TLS)
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
              For websites, the “key” is the server’s certificate (which contains the server’s public key). It’s “sent” in the TLS handshake. You trust it because:
            </p>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
              <li>A <strong>Certificate Authority (CA)</strong> has signed the certificate. Your browser trusts a set of CA roots (pre-installed or configured).</li>
              <li>The CA (in theory) verified that the certificate belongs to the domain owner. So the “exchange” is: server sends cert → browser checks signature against a trusted CA → if valid, use the public key in the cert.</li>
              <li>No manual paste; the key is exchanged inside the TLS handshake, and <strong>trust</strong> is delegated to the CA.</li>
            </ul>
          </div>

          {/* 3d. TOFU */}
          <div>
            <h4 className="text-base font-medium text-stone-800 dark:text-stone-200 mb-1">
              D. Trust On First Use (TOFU)
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
              Used by SSH and some other tools:
            </p>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
              <li>First time you connect, you accept the server’s key (or the app stores it).</li>
              <li>Later, if the key <em>changes</em>, you get a warning (possible MITM). So “sending” is just the server sending its key; verification is “has this key changed since first use?”</li>
            </ul>
          </div>

          {/* 3e. PGP / keyservers */}
          <div>
            <h4 className="text-base font-medium text-stone-800 dark:text-stone-200 mb-1">
              E. PGP: keyservers and web of trust
            </h4>
            <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
              Public keys are uploaded to <strong>keyservers</strong> (e.g. keys.openpgp.org). Anyone can fetch “Alice’s key” by email or key ID. Verification is separate:
            </p>
            <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
              <li><strong>Web of trust</strong> — Others sign Alice’s key; if you trust the signers, you trust the key.</li>
              <li><strong>Fingerprint check</strong> — Out-of-band: Alice tells you her key fingerprint (e.g. in person, verified chat); you compare with what you downloaded.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Summary table */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
          4. Summary: who “sends” the key, and how it’s verified
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-stone-200 dark:border-stone-700">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800">
                <th className="text-left p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-800 dark:text-stone-200">
                  Example
                </th>
                <th className="text-left p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-800 dark:text-stone-200">
                  How the key reaches the user
                </th>
                <th className="text-left p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-800 dark:text-stone-200">
                  How the user verifies it
                </th>
              </tr>
            </thead>
            <tbody className="text-stone-600 dark:text-stone-400">
              <tr>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-700 dark:text-stone-300">
                  This demo
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  You copy/paste (or share the text). No server.
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  You control where you paste it; no separate verification step in the UI.
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-700 dark:text-stone-300">
                  Signal / WhatsApp
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  App fetches key from server (X3DH/PQXDH, key directory).
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Optional: compare safety numbers or scan QR (out-of-band).
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-700 dark:text-stone-300">
                  HTTPS (TLS)
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Server sends certificate in TLS handshake.
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Browser checks cert signature against trusted CAs (PKI).
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-700 dark:text-stone-300">
                  SSH
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Server sends its host key on first connect.
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  TOFU: accept once; warning if key changes later.
                </td>
              </tr>
              <tr>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700 font-medium text-stone-700 dark:text-stone-300">
                  PGP
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Download from keyserver or receive by email/link.
                </td>
                <td className="p-2 border-b border-stone-200 dark:border-stone-700">
                  Web of trust (signatures) or fingerprint check out-of-band.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. Browser security primitives */}
      <section className="mb-8">
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-3">
          5. Browser security primitives (Web Crypto & context)
        </h3>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
          Browsers expose cryptography and security through a few key mechanisms:
        </p>
        <ul className="list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1 mb-3">
          <li>
            <strong>Secure context</strong> — <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">window.isSecureContext</code> is true only on HTTPS or localhost. Web Crypto, WebAuthn, and Credential Management require it to limit exposure to MITM.
          </li>
          <li>
            <strong>Digest (hashing)</strong> — <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">crypto.subtle.digest()</code> provides SHA-256, SHA-384, SHA-512 for integrity and fingerprints. Same input → same output; one-way. Not for password storage (use PBKDF2/Argon2).
          </li>
          <li>
            <strong>Sign & verify</strong> — <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">sign()</code> / <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">verify()</code> with RSA-PSS or ECDSA prove authenticity: only the holder of the private key can produce a valid signature; anyone with the public key can verify.
          </li>
          <li>
            <strong>Certificates & TLS</strong> — HTTPS uses PKI: the server sends a certificate (signed by a CA); the browser checks it and uses the public key inside for the TLS handshake. Certificate Transparency logs make issued certs auditable.
          </li>
        </ul>
        <p className="text-stone-600 dark:text-stone-400 text-sm">
          Try the <strong>Security</strong> tab on this page for live demos: secure context check, SHA-256 digest, and RSA-PSS sign/verify.
        </p>
      </section>

      {/* 6. References */}
      <section>
        <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200 mb-2">
          6. References
        </h3>
        <ul className="text-sm text-stone-600 dark:text-stone-400 space-y-1">
          <li>
            <a href="https://signal.org/docs/specifications/x3dh/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              Signal: X3DH Key Agreement Protocol
            </a>
          </li>
          <li>
            <a href="https://signal.org/docs/specifications/pqxdh/" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              Signal: PQXDH (post-quantum)
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              MDN: Web Authentication API
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              MDN: Web Crypto API
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Glossary/PKI" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              MDN: Public Key Infrastructure (PKI)
            </a>
          </li>
          <li>
            <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts" target="_blank" rel="noopener noreferrer" className="underline hover:text-stone-900 dark:hover:text-stone-200">
              MDN: Secure contexts
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
