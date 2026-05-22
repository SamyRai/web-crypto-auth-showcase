import { useKeyPair } from '../../hooks/useCertChat';
import { Tooltip } from '../ui/Tooltip';

interface IdentitySidebarProps {
  keyPair: ReturnType<typeof useKeyPair>;
  contactPublicKeyBase64: string;
  setContactPublicKeyBase64: (val: string) => void;
}

export function IdentitySidebar({ keyPair, contactPublicKeyBase64, setContactPublicKeyBase64 }: IdentitySidebarProps) {
  return (
    <div className="w-80 border-r border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-stone-200 dark:border-stone-700">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          My Identity
          <Tooltip topic="pki">
            <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </button>
          </Tooltip>
        </h2>
        
        {keyPair.hasKeyPair ? (
          <div className="space-y-4">
            <div className="rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/20 p-3">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M7 11h10"/><path d="M9 15h6"/></svg>
                <span className="text-xs font-semibold">RSA-OAEP Key Pair Ready</span>
                <Tooltip topic="rsaOaep">
                  <button className="text-blue-400 hover:text-blue-600 dark:hover:text-blue-300 -ml-1">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </button>
                </Tooltip>
              </div>
              <div className="text-[10px] font-mono text-stone-500 dark:text-stone-400 break-all bg-white dark:bg-stone-950 p-2 rounded border border-stone-200 dark:border-stone-800 relative group">
                FP: {keyPair.publicKeyFingerprint}
                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                   <Tooltip topic="outOfBand">
                    <button className="text-stone-400 hover:text-stone-600 bg-white dark:bg-stone-900 rounded-full p-0.5 shadow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
                    </button>
                  </Tooltip>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-stone-700 dark:text-stone-300 mb-1">
                Share this Public Key with contact:
                <Tooltip topic="spkiFormat">
                  <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
                  </button>
                </Tooltip>
              </label>
              <textarea
                readOnly
                value={keyPair.publicKeyBase64 || ''}
                rows={3}
                className="w-full text-[10px] font-mono bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg p-2 resize-none"
              />
            </div>

            <button
              onClick={keyPair.clearKeys}
              className="w-full text-xs font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-1.5 transition-colors border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Destroy Keys
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-stone-600 dark:text-stone-400">
              You need an RSA key pair to receive encrypted messages.
            </p>
            <button
              onClick={keyPair.generate}
              disabled={keyPair.loading}
              className="w-full rounded-lg bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-sm font-medium py-2 hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {keyPair.loading ? 'Generating...' : 'Generate Key Pair'}
            </button>
          </div>
        )}
      </div>

      <div className="p-4 flex-1">
        <h2 className="text-sm font-semibold text-stone-900 dark:text-stone-100 uppercase tracking-wider mb-4 flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          Contact (Alice)
          <Tooltip topic="keyDirectory">
            <button className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
            </button>
          </Tooltip>
        </h2>
        <div className="space-y-3">
          <p className="text-xs text-stone-600 dark:text-stone-400">
            Paste Alice's public key here to encrypt messages sent to her.
          </p>
          <textarea
            value={contactPublicKeyBase64}
            onChange={(e) => setContactPublicKeyBase64(e.target.value)}
            placeholder="Paste SPKI base64 key..."
            rows={5}
            className="w-full text-xs font-mono bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-600 rounded-lg p-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
}
