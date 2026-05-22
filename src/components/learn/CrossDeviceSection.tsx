export function CrossDeviceSection() {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-4">
        3. Cross-device & Android: one passkey, bio on both
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-3">
        The same WebAuthn flow works on Android (and any supported browser). Whether you can use <strong>one passkey with biometrics on both Mac and Android</strong> depends on <strong>where the passkey is stored</strong>.
      </p>
      <ul className="space-y-2 text-stone-600 dark:text-stone-400 text-sm mb-4">
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Synced passkeys</strong> — Stored in a credential manager that syncs (e.g. Google Password Manager, 1Password, Bitwarden). One passkey is synced to all your devices; each device uses its own biometric to unlock it. So: create on Mac (Touch ID) → syncs → sign in on Android (fingerprint). <strong>Best way for &quot;bio on two devices&quot;</strong> is to use a synced manager that works on both (e.g. Chrome + Google Password Manager on Mac and Android, or 1Password/Bitwarden on both).
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Device-bound passkeys</strong> — Stored only on one device (e.g. security key or Windows default before Win11). No sync; to use on another device you&apos;d need the physical key or a different passkey per device.
        </li>
        <li>
          <strong className="text-stone-800 dark:text-stone-200">Apple vs Google</strong> — iCloud Keychain syncs only across Apple devices. Google Password Manager syncs across Chrome on Android, Windows, macOS, Linux, and (with settings) iOS. So for Mac + Android with one passkey and bio on both: use Google Password Manager (Chrome on both) or a third-party manager (1Password, Bitwarden, etc.).
        </li>
      </ul>
      <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
        As a developer you don&apos;t change anything: same <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">rpId</code>, same <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">create</code> / <code className="font-mono text-xs bg-stone-200 dark:bg-stone-700 px-1 rounded">get</code>. The user&apos;s choice of credential manager decides storage and sync. If a device has no passkey, the OS can offer <strong>cross-device sign-in</strong> (e.g. QR code on laptop, scan with phone, authenticate on phone with bio).
      </p>
    </section>
  );
}
