import { useState } from 'react';
import { useSecureContext } from '../hooks';
import { useKeyPair, useEncryptWithDebug, useDecryptWithDebug } from '../hooks/useCertChat';
import {
  KeyPairSection,
  EncryptTab,
  DecryptTab,
  TheoryTab,
  BrowserSecurityTab,
} from '../components/cert-chat';

type TabId = 'encrypt' | 'decrypt' | 'theory' | 'security';

export function CertChatPage() {
  const secure = useSecureContext();
  const [activeTab, setActiveTab] = useState<TabId>('encrypt');

  const keyPair = useKeyPair();
  const encrypt = useEncryptWithDebug();
  const decrypt = useDecryptWithDebug();

  if (!secure) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-12">
        <div
          className="rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/50 px-4 py-3 text-sm text-amber-800 dark:text-amber-200"
          role="alert"
        >
          Web Crypto requires a secure context (HTTPS or localhost). Use{' '}
          <code className="font-mono">http://localhost:5173</code> to try this.
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-3rem)] flex flex-col">
      <div className="flex-1 flex flex-col min-h-0">
        <div className="border-b border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 px-6 pt-4 pb-2">
          <h1 className="text-xl font-semibold text-stone-900 dark:text-stone-100">
            Cert / Chat — public key encryption
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1">
            RSA-OAEP key exchange: generate keys, share your public key, encrypt for others, decrypt with your private key.
          </p>
          <KeyPairSection
            publicKeyBase64={keyPair.publicKeyBase64}
            publicKeyFingerprint={keyPair.publicKeyFingerprint}
            hasKeyPair={keyPair.hasKeyPair}
            loading={keyPair.loading}
            error={keyPair.error}
            onGenerate={keyPair.generate}
            onClear={keyPair.clearKeys}
          />
          <div className="flex gap-2 mt-2 flex-wrap" role="tablist" aria-label="Encrypt, Decrypt, Theory, Security">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'encrypt'}
              aria-controls="cert-chat-encrypt-panel"
              id="cert-chat-encrypt-tab"
              onClick={() => setActiveTab('encrypt')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'encrypt'
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Encrypt
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'decrypt'}
              aria-controls="cert-chat-decrypt-panel"
              id="cert-chat-decrypt-tab"
              onClick={() => setActiveTab('decrypt')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'decrypt'
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Decrypt
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'theory'}
              aria-controls="cert-chat-theory-panel"
              id="cert-chat-theory-tab"
              onClick={() => setActiveTab('theory')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'theory'
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Theory
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'security'}
              aria-controls="cert-chat-security-panel"
              id="cert-chat-security-tab"
              onClick={() => setActiveTab('security')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === 'security'
                  ? 'bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900'
                  : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-700'
              }`}
            >
              Security
            </button>
          </div>
        </div>

        <div
          className="flex-1 flex min-h-0"
          role="tabpanel"
          id="cert-chat-encrypt-panel"
          aria-labelledby="cert-chat-encrypt-tab"
          hidden={activeTab !== 'encrypt'}
          style={{ display: activeTab === 'encrypt' ? 'flex' : 'none' }}
        >
          <EncryptTab
            encrypt={encrypt}
            myPublicKeyFingerprint={keyPair.publicKeyFingerprint}
          />
        </div>
        <div
          className="flex-1 flex min-h-0"
          role="tabpanel"
          id="cert-chat-decrypt-panel"
          aria-labelledby="cert-chat-decrypt-tab"
          hidden={activeTab !== 'decrypt'}
          style={{ display: activeTab === 'decrypt' ? 'flex' : 'none' }}
        >
          <DecryptTab
            decrypt={decrypt}
            privateKeyBase64={keyPair.privateKeyBase64}
            publicKeyFingerprint={keyPair.publicKeyFingerprint}
            hasKeyPair={keyPair.hasKeyPair}
            onLoadPrivateKeyOnly={keyPair.loadPrivateKeyOnly}
            loadingKey={keyPair.loading}
          />
        </div>
        <div
          className="flex-1 flex min-h-0"
          role="tabpanel"
          id="cert-chat-theory-panel"
          aria-labelledby="cert-chat-theory-tab"
          hidden={activeTab !== 'theory'}
          style={{ display: activeTab === 'theory' ? 'flex' : 'none' }}
        >
          <TheoryTab />
        </div>
        <div
          className="flex-1 flex min-h-0"
          role="tabpanel"
          id="cert-chat-security-panel"
          aria-labelledby="cert-chat-security-tab"
          hidden={activeTab !== 'security'}
          style={{ display: activeTab === 'security' ? 'flex' : 'none' }}
        >
          <BrowserSecurityTab />
        </div>
      </div>
    </div>
  );
}
