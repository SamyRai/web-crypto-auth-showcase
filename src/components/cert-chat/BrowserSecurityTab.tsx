/**
 * Browser security tab: secure context, digest, HKDF, sign/verify, cert & TLS links.
 */

import { SecurityContextSection } from './SecurityContextSection';
import { HashDemoSection } from './HashDemoSection';
import { HkdfDemoSection } from './HkdfDemoSection';
import { SignVerifySection } from './SignVerifySection';
import { CertTlsSection } from './CertTlsSection';

export function BrowserSecurityTab() {
  return (
    <div className="flex-1 overflow-auto p-6 max-w-3xl">
      <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
        Browser security APIs
      </h2>
      <p className="text-stone-600 dark:text-stone-400 text-sm mb-6">
        These demos use the Web Crypto API (SubtleCrypto): digest, key derivation (HKDF), sign/verify,
        and the secure context that gates access to crypto and other sensitive APIs.
      </p>

      <SecurityContextSection />
      <HashDemoSection />
      <HkdfDemoSection />
      <SignVerifySection />
      <CertTlsSection />
    </div>
  );
}
