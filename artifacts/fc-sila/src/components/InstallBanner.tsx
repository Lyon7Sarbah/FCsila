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

    const timer = setTimeout(() => setVisible(true), 3000);

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
    if (outcome === 'accepted') {
      setVisible(false);
    }
    setDeferredPrompt(null);
  };

  if (!visible) return null;

  const getMessage = () => {
    if (lang === 'ru') {
      if (isIPhone) return '📱 Добавь FC SILA Academy на экран iPhone!';
      if (isAndroid) return '📱 Установи FC SILA Academy на Android!';
      return '📱 Установи FC SILA Academy как приложение!';
    }
    if (isIPhone) return '📱 Add FC SILA Academy to your iPhone home screen!';
    if (isAndroid) return '📱 Install FC SILA Academy on your Android!';
    return '📱 Install FC SILA Academy as an app on your phone!';
  };

  return (
    <>
      {/* Install banner */}
      <div
        className="fixed bottom-5 left-4 right-4 z-50 rounded-2xl px-5 py-4 flex items-center justify-between flex-wrap gap-3 animate-slide-up"
        style={{
          background: '#FDE100',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          maxWidth: '600px',
          margin: '0 auto',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '20px',
        }}
      >
        <p className="font-semibold text-black text-sm flex-1">{getMessage()}</p>
        <div className="flex items-center gap-2 flex-wrap">
          {deferredPrompt && isAndroid && (
            <button
              onClick={handleAndroidInstall}
              className="bg-black text-yellow-400 font-black text-xs px-4 py-2 rounded-full hover:bg-gray-900 transition-colors"
            >
              📲 {lang === 'ru' ? 'Установить' : 'Install App'}
            </button>
          )}
          {(isIPhone || (!isAndroid && !deferredPrompt)) && (
            <button
              onClick={() => setIphoneModal(true)}
              className="bg-black text-yellow-400 font-black text-xs px-4 py-2 rounded-full hover:bg-gray-900 transition-colors"
            >
              🍎 {lang === 'ru' ? 'Инструкция для iPhone' : 'iPhone Guide'}
            </button>
          )}
          <button
            onClick={() => setVisible(false)}
            className="text-black text-xl font-bold leading-none px-1 hover:opacity-60 transition-opacity"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {/* iPhone modal */}
      {iphoneModal && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center px-4"
          style={{ background: 'rgba(0,0,0,0.85)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setIphoneModal(false); }}
        >
          <div className="rounded-3xl p-7 max-w-xs w-full text-center relative border-2" style={{ background: '#000', borderColor: '#FDE100' }}>
            <button
              onClick={() => setIphoneModal(false)}
              className="absolute top-3 right-4 text-2xl leading-none"
              style={{ color: '#FDE100' }}
            >
              ×
            </button>
            <h3 className="font-black text-xl mb-4" style={{ color: '#FDE100' }}>
              📱 {lang === 'ru' ? 'Установка на iPhone' : 'Install on iPhone'}
            </h3>
            <ol className="text-left space-y-3 mb-5">
              {(lang === 'ru' ? [
                ['Нажми кнопку', 'Поделиться', '⎔'],
                ['Прокрути вниз', '"Добавить на экран «Домой»"'],
                ['Нажми', '"Добавить"', 'в правом верхнем углу'],
              ] : [
                ['Tap the', 'Share', 'button ⎔'],
                ['Scroll down and tap', '"Add to Home Screen"'],
                ['Tap', '"Add"', 'in the top right'],
              ]).map((parts, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 w-6 h-6 rounded-full text-center text-xs font-black leading-6"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-300">
                    {parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white"> {p}</strong> : <span key={j}>{p} </span>)}
                  </span>
                </li>
              ))}
            </ol>
            <p className="text-xs" style={{ color: '#FDE100' }}>
              ✨ {lang === 'ru' ? 'FC SILA Academy появится на вашем экране!' : 'FC SILA Academy will appear on your home screen!'}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
