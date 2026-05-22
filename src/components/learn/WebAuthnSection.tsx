export function WebAuthnSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        1. Web Authentication API (WebAuthn)
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
        WebAuthn is a W3C standard for <strong>public-key-based authentication</strong>.
        The browser talks to an <em>authenticator</em>—built into the device (Touch ID,
        Face ID, Windows Hello) or external (USB/NFC key). You do <strong>not</strong> get
        raw fingerprint data; the authenticator verifies the user and <strong>signs a
        challenge</strong> with a private key. The site only sees the signature and
        public key. This is phishing-resistant because the signature is bound to the
        origin.
      </p>
      <ul className="mt-4 list-disc list-inside text-stone-600 dark:text-stone-400 text-sm space-y-1">
        <li>
          <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">
            navigator.credentials.create(publicKey)
          </code>{' '}
          — register a new credential (key pair); triggers biometric/PIN.
        </li>
        <li>
          <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">
            navigator.credentials.get(publicKey)
          </code>{' '}
          — authenticate: sign a challenge; triggers biometric/PIN.
        </li>
        <li>
          Use <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">authenticatorAttachment: &quot;platform&quot;</code> and{' '}
          <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">userVerification: &quot;required&quot;</code> to prefer device biometrics.
        </li>
      </ul>
    </section>
  );
}
