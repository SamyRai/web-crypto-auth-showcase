import { useState, useRef, useEffect } from 'react';
import { useChatConversation, type ChatMessage } from '../../hooks/useCertChat';
import { Tooltip } from '../ui/Tooltip';

interface ChatWindowProps {
  conversation: ReturnType<typeof useChatConversation>;
  hasMyKeyPair: boolean;
  myPublicKeyBase64: string | null;
}

export function ChatWindow({ conversation, hasMyKeyPair, myPublicKeyBase64 }: ChatWindowProps) {
  const [inputText, setInputText] = useState('');
  const [simulateText, setSimulateText] = useState('');
  const [showSimulate, setShowSimulate] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    sendMessage,
    simulateReceive,
    decryptMessage,
    isEncrypting,
    isDecrypting,
    contactPublicKeyBase64,
  } = conversation;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    await sendMessage(inputText);
    setInputText('');
  };

  const handleSimulateReceive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulateText.trim()) return;
    await simulateReceive(simulateText, myPublicKeyBase64);
    setSimulateText('');
    setShowSimulate(false);
  };

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-stone-950 relative">
      {/* Header */}
      <div className="h-14 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-6 bg-white/80 dark:bg-stone-950/80 backdrop-blur z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 font-bold">
            A
          </div>
          <div>
            <h2 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Alice</h2>
            <Tooltip topic={contactPublicKeyBase64 ? "keyDirectory" : "manualExchange"}>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 flex items-center gap-1 cursor-help hover:text-stone-700 dark:hover:text-stone-300">
                <span className={`w-1.5 h-1.5 rounded-full ${contactPublicKeyBase64 ? 'bg-green-500' : 'bg-red-500'}`}></span>
                {contactPublicKeyBase64 ? 'Key exchange complete' : 'Waiting for public key'}
              </p>
            </Tooltip>
          </div>
        </div>
        <button
          onClick={() => setShowSimulate(!showSimulate)}
          className="text-xs px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors text-stone-600 dark:text-stone-300"
        >
          {showSimulate ? 'Cancel Simulate' : 'Simulate Reply'}
        </button>
      </div>

      {/* Simulated Reply Panel */}
      {showSimulate && (
        <div className="absolute top-14 left-0 right-0 bg-stone-100 dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 p-4 z-10 shadow-lg animate-fade-in-up">
          <form onSubmit={handleSimulateReceive} className="flex gap-2 max-w-2xl mx-auto">
            <input
              type="text"
              value={simulateText}
              onChange={(e) => setSimulateText(e.target.value)}
              placeholder="Type a message for Alice to send you (will be encrypted with YOUR public key)..."
              disabled={!hasMyKeyPair || isEncrypting}
              className="flex-1 rounded-lg border border-stone-300 dark:border-stone-600 px-3 py-2 text-sm bg-white dark:bg-stone-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={!hasMyKeyPair || !simulateText.trim() || isEncrypting}
              className="px-4 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isEncrypting ? 'Encrypting...' : 'Send as Alice'}
            </button>
          </form>
          {!hasMyKeyPair && (
            <p className="text-xs text-red-500 text-center mt-2">You must generate your Key Pair first.</p>
          )}
        </div>
      )}

      {/* Message History */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-400 dark:text-stone-600">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-50"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            <Tooltip topic="rsaOaep">
              <p className="text-sm font-medium cursor-help hover:text-stone-500">End-to-End Encrypted</p>
            </Tooltip>
            <p className="text-xs mt-1 max-w-xs text-center">Messages are encrypted locally using Web Crypto (RSA-OAEP).</p>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onDecrypt={() => decryptMessage(msg.id)}
              isDecrypting={isDecrypting}
              hasMyKeyPair={hasMyKeyPair}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950">
        <form onSubmit={handleSend} className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type an E2EE message..."
            disabled={!contactPublicKeyBase64 || isEncrypting}
            className="flex-1 rounded-full border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            disabled={!contactPublicKeyBase64 || !inputText.trim() || isEncrypting}
            className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-50 transition-colors shrink-0"
            title="Encrypt and Send"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          </button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onDecrypt,
  isDecrypting,
  hasMyKeyPair,
}: {
  message: ChatMessage;
  onDecrypt: () => void;
  isDecrypting: boolean;
  hasMyKeyPair: boolean;
}) {
  const isMe = message.sender === 'me';
  const [showCipher, setShowCipher] = useState(false);

  return (
    <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-fade-in-up`}>
      {/* Sender Label */}
      <span className="text-[10px] text-stone-400 dark:text-stone-500 mb-1 px-1">
        {isMe ? 'You' : 'Alice'} • {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>

      {/* Bubble Container */}
      <div className="max-w-[80%] flex flex-col gap-1">
        {/* Main Content Bubble */}
        <div
          className={`px-4 py-2.5 rounded-2xl relative group ${
            isMe
              ? 'bg-blue-600 text-white rounded-br-sm'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 rounded-bl-sm'
          }`}
        >
          {isMe ? (
            <p className="text-sm">{message.plaintext}</p>
          ) : message.plaintext !== null ? (
            <p className="text-sm">{message.plaintext}</p>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="text-xs font-mono opacity-60 flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Encrypted Payload
                </span>
                <span className="text-[10px] opacity-40 truncate w-32 mt-0.5">
                  {message.ciphertextBase64.substring(0, 20)}...
                </span>
              </div>
              <button
                onClick={onDecrypt}
                disabled={isDecrypting || !hasMyKeyPair}
                className="ml-2 px-3 py-1.5 rounded bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 text-xs font-semibold hover:opacity-90 disabled:opacity-50"
              >
                Decrypt
              </button>
            </div>
          )}
        </div>

        {/* Inspect Ciphertext Toggle for Sent Messages or Decrypted Messages */}
        <button
          onClick={() => setShowCipher(!showCipher)}
          className={`text-[10px] flex items-center gap-1 ${
            isMe ? 'text-blue-500 justify-end self-end' : 'text-stone-500 justify-start self-start'
          } hover:underline`}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          {showCipher ? 'Hide payload' : 'Inspect payload'}
        </button>

        {/* Ciphertext Dropdown */}
        {showCipher && (
          <div className="mt-1 p-2 bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-lg text-[10px] font-mono text-stone-500 dark:text-stone-400 break-all w-full shadow-inner animate-fade-in-up">
            {message.ciphertextBase64}
          </div>
        )}
      </div>
    </div>
  );
}
