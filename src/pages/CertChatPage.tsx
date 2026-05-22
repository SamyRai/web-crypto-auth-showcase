import { useSecureContext } from '../hooks';
import { useKeyPair, useChatConversation } from '../hooks/useCertChat';
import {
  IdentitySidebar,
  ChatWindow,
} from '../components/cert-chat';

export function CertChatPage() {
  const secure = useSecureContext();

  const keyPair = useKeyPair();
  const conversation = useChatConversation(keyPair.privateKeyBase64);

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
    <div className="h-[calc(100vh-3rem)] flex flex-col overflow-hidden bg-stone-100 dark:bg-stone-900">
      {/* Header */}
      <div className="shrink-0 border-b border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-6 py-3 flex items-center justify-between z-20">
        <div>
          <h1 className="text-lg font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
            Cert Chat
          </h1>
          <p className="text-[10px] uppercase tracking-wider font-semibold text-stone-500 dark:text-stone-400 mt-0.5">
            End-to-End Encrypted (RSA-OAEP)
          </p>
        </div>
      </div>

      {/* Main App Layout */}
      <div className="flex-1 flex min-h-0 relative">
        <IdentitySidebar
          keyPair={keyPair}
          contactPublicKeyBase64={conversation.contactPublicKeyBase64}
          setContactPublicKeyBase64={conversation.setContactPublicKeyBase64}
        />
        
        <ChatWindow
          conversation={conversation}
          hasMyKeyPair={keyPair.hasKeyPair}
          myPublicKeyBase64={keyPair.publicKeyBase64}
        />
      </div>
    </div>
  );
}
