import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSecureContext, useEncryptForm, useDecryptForm, useHashForm } from '../hooks';
import { WEB_CRYPTO_CONSTANTS } from '../lib/webcrypto';
import {
  EncryptSection,
  DecryptSection,
  HashSection,
  EncryptTheorySection,
  SecureContextAlert,
} from '../components/encrypt';
import { SEO } from '../components/seo/SEO';

export function EncryptPage() {
  const secure = useSecureContext();
  const encrypt = useEncryptForm();
  const decrypt = useDecryptForm();
  const hash = useHashForm();

  useEffect(() => {
    if (encrypt.encResult) {
      decrypt.setCiphertext(encrypt.encResult.ciphertextBase64);
      decrypt.setSalt(encrypt.encResult.saltBase64);
      decrypt.setIv(encrypt.encResult.ivBase64);
    }
  }, [encrypt.encResult, decrypt, decrypt.setCiphertext, decrypt.setSalt, decrypt.setIv]);

  const handleEncrypt = async () => {
    await encrypt.encrypt();
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100">
      <SEO 
        title="Encrypt a Secret" 
        description="Password-based encryption in the browser using Web Crypto API. PBKDF2 + AES-GCM demo where keys never leave the page."
        canonical="https://SamyRai.github.io/web-crypto-auth-showcase/encrypt"
      />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <header className="mb-10">
          <Link
            to="/"
            className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300"
          >
            ← Back to home
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight">
            Encrypt a secret (Web Crypto)
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Password-based encryption in the browser: PBKDF2 + AES-GCM. Keys never leave this page.
          </p>
        </header>

        <SecureContextAlert secure={secure} />

        <EncryptSection
          password={encrypt.password}
          onPasswordChange={encrypt.setPassword}
          plaintext={encrypt.plaintext}
          onPlaintextChange={encrypt.setPlaintext}
          onEncrypt={handleEncrypt}
          status={encrypt.status}
          errorMessage={encrypt.errorMessage}
          encResult={encrypt.encResult}
          secure={secure}
          pbkdf2Iterations={WEB_CRYPTO_CONSTANTS.PBKDF2_ITERATIONS}
        />

        <DecryptSection
          password={decrypt.password}
          onPasswordChange={decrypt.setPassword}
          ciphertext={decrypt.ciphertext}
          onCiphertextChange={decrypt.setCiphertext}
          salt={decrypt.salt}
          onSaltChange={decrypt.setSalt}
          iv={decrypt.iv}
          onIvChange={decrypt.setIv}
          onDecrypt={decrypt.decrypt}
          secure={secure}
          error={decrypt.error}
          plaintext={decrypt.plaintext}
        />

        <HashSection
          input={hash.input}
          onInputChange={hash.setInput}
          onHash={hash.hash}
          secure={secure}
          output={hash.output}
        />

        <EncryptTheorySection />
      </div>
    </div>
  );
}
