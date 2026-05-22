/**
 * Cert & TLS: educational links for Certificate Transparency and secure contexts.
 */

export function CertTlsSection() {
  return (
    <section className="rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 mb-6">
      <h3 className="text-base font-semibold text-stone-800 dark:text-stone-200 mb-2">
        Certificates & TLS (HTTPS)
      </h3>
      <p className="text-xs text-stone-600 dark:text-stone-400 mb-3">
        In HTTPS, the server sends its <strong>certificate</strong> (containing its public key) during the TLS
        handshake. Browsers trust it when a <strong>Certificate Authority (CA)</strong> has signed it. Certificate
        Transparency logs make issued certs visible so mis-issuance can be detected.
      </p>
      <ul className="space-y-2 text-xs">
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/Security/Certificate_Transparency"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-900 dark:hover:text-stone-200 text-stone-600 dark:text-stone-400"
          >
            MDN: Certificate Transparency
          </a>
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-900 dark:hover:text-stone-200 text-stone-600 dark:text-stone-400"
          >
            MDN: Secure contexts
          </a>
        </li>
        <li>
          <a
            href="https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-900 dark:hover:text-stone-200 text-stone-600 dark:text-stone-400"
          >
            MDN: window.isSecureContext
          </a>
        </li>
      </ul>
    </section>
  );
}
