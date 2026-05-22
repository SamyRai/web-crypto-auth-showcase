export function MasterKeySection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        4. Master key storage (vaults & password managers)
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-3">
        For apps that protect a master key or encryption key:
      </p>
      <ul className="space-y-2 text-stone-600 dark:text-stone-400 text-sm">
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Never store the master key in plaintext</strong> in
          config, env, or source. Prefer OS keychain, HSM, or cloud KMS.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Web / zero-knowledge:</strong> Derive the key in the
          browser from the user password (strong KDF); optionally cache an encrypted key
          in IndexedDB and use WebAuthn as a second factor to release it.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Desktop/mobile:</strong> Store key or KEK in OS
          keychain/Keystore; require biometric (Touch ID, Face ID, Windows Hello) to
          access.
        </li>
        <li>
          Products like Bitwarden and 1Password do <strong>not</strong> store the master
          password; the encryption key is derived from it and exists only in memory
          while the vault is unlocked.
        </li>
      </ul>
    </section>
  );
}
