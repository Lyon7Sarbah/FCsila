import { useEffect, useState } from 'react';
import { useLang } from '@/context/LangContext';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [iphoneModal, setIphoneModal] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIPhone, setIsIPhone] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    const iphone = /iPhone/i.test(ua);
    const android = /Android/i.test(ua);
    setIsIPhone(iphone);
    setIsAndroid(android);

    const timer = setTimeout(() => setVisible(true), 6000);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleAndroidInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setVisible(false);
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  return (
    <>
      {/* Compact install chip */}
      <div
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full pl-3 pr-1.5 py-1.5 animate-slide-up"
        style={{
          background: 'rgba(10,10,10,0.92)',
          border: '1px solid rgba(253,225,0,0.3)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          maxWidth: '260px',
        }}
      >
        <span className="text-xs font-semibold" style={{ color: '#aaa' }}>
          📲 {lang === 'ru' ? 'Добавить на экран' : 'Add to home screen'}
        </span>

        {deferredPrompt && isAndroid ? (
          <button
            onClick={handleAndroidInstall}
            className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110"
            style={{ background: '#FDE100', color: '#000' }}
          >
            {lang === 'ru' ? 'Установить' : 'Install'}
          </button>
        ) : (isIPhone || (!isAndroid && !deferredPrompt)) ? (
          <button
            onClick={() => setIphoneModal(true)}
            className="rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider transition-all hover:brightness-110"
            style={{ background: '#FDE100', color: '#000' }}
          >
            {lang === 'ru' ? 'Как?' : 'How?'}
          </button>
        ) : null}

        <button
          onClick={() => setVisible(false)}
          className="w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold transition-opacity hover:opacity-70 flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.08)', color: '#666' }}
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {/* iPhone guide modal — stays compact */}
      {iphoneModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center px-4 pb-6 sm:pb-0"
          style={{ background: 'rgba(0,0,0,0.8)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIphoneModal(false); }}
        >
          <div
            className="rounded-2xl p-5 w-full max-w-xs relative border"
            style={{ background: '#0d0d0d', borderColor: '#2a2200' }}
          >
            <button
              onClick={() => setIphoneModal(false)}
              className="absolute top-3 right-3 text-lg leading-none opacity-50 hover:opacity-100"
              style={{ color: '#FDE100' }}
            >
              ×
            </button>
            <h3 className="font-black text-sm mb-3 pr-5" style={{ color: '#FDE100' }}>
              📱 {lang === 'ru' ? 'Добавить на экран iPhone' : 'Add to iPhone Home Screen'}
            </h3>
            <ol className="space-y-2.5">
              {(lang === 'ru' ? [
                ['Нажми', '«Поделиться» ⎔', 'внизу Safari'],
                ['Выбери', '«На экран «Домой»»'],
                ['Нажми', '«Добавить»'],
              ] : [
                ['Tap the', 'Share ⎔', 'button in Safari'],
                ['Tap', '"Add to Home Screen"'],
                ['Tap', '"Add"', 'to confirm'],
              ]).map((parts, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full text-center text-[10px] font-black leading-5"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-xs text-gray-400">
                    {parts.map((p, j) => j % 2 === 1
                      ? <strong key={j} className="text-white"> {p}</strong>
                      : <span key={j}>{p} </span>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </>
  );
}
