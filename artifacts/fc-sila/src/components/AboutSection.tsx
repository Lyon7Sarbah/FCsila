import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function AboutSection() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="about" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: '#FDE100' }}
          >
            {t.about.subtitle}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title"
            style={{ color: '#ffffff' }}
          >
            {t.about.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — story */}
          <div>
            {/* Story paragraphs */}
            <div
              className="rounded-2xl p-8 mb-8 border"
              style={{ background: '#111', borderColor: '#222' }}
            >
              <p className="text-lg leading-relaxed mb-5" style={{ color: '#cccccc' }}>
                {t.about.p1}
              </p>
              <p className="text-lg leading-relaxed" style={{ color: '#cccccc' }}>
                {t.about.p2}
              </p>
            </div>

            {/* Motto */}
            <div
              className="rounded-2xl p-6 text-center font-black text-xl uppercase tracking-wide"
              style={{ background: '#FDE100', color: '#000' }}
            >
              {t.about.motto}
            </div>

            {/* Visual element — football field */}
            <div
              className="mt-8 rounded-2xl p-6 border relative overflow-hidden"
              style={{ background: '#111', borderColor: '#333', minHeight: 180 }}
            >
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                <svg viewBox="0 0 400 280" className="w-full h-full" fill="none">
                  <rect x="10" y="10" width="380" height="260" stroke="#FDE100" strokeWidth="2" rx="4" />
                  <line x1="200" y1="10" x2="200" y2="270" stroke="#FDE100" strokeWidth="2" />
                  <circle cx="200" cy="140" r="40" stroke="#FDE100" strokeWidth="2" />
                  <rect x="10" y="90" width="60" height="100" stroke="#FDE100" strokeWidth="2" />
                  <rect x="330" y="90" width="60" height="100" stroke="#FDE100" strokeWidth="2" />
                  <rect x="10" y="110" width="30" height="60" stroke="#FDE100" strokeWidth="2" />
                  <rect x="360" y="110" width="30" height="60" stroke="#FDE100" strokeWidth="2" />
                  <circle cx="200" cy="140" r="3" fill="#FDE100" />
                  <circle cx="80" cy="140" r="3" fill="#FDE100" />
                  <circle cx="320" cy="140" r="3" fill="#FDE100" />
                </svg>
              </div>
              <div className="relative z-10 flex flex-col items-center justify-center h-full gap-2 py-4">
                <div className="text-5xl animate-float">⚽</div>
                <div
                  className="text-sm font-bold uppercase tracking-widest mt-2"
                  style={{ color: '#FDE100' }}
                >
                  FC SILA Moscow
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Est. 2017</div>
              </div>
            </div>
          </div>

          {/* Right — values */}
          <div>
            <h3
              className="text-2xl font-black uppercase tracking-wide mb-6"
              style={{ color: '#FDE100' }}
            >
              {t.about.values_title}
            </h3>
            <div className="flex flex-col gap-4">
              {t.about.values.map((v, i) => (
                <div
                  key={i}
                  className="card-lift rounded-xl p-5 border flex items-start gap-4"
                  style={{ background: '#111', borderColor: '#222' }}
                >
                  <div
                    className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="font-bold text-white mb-1">{v.label}</div>
                    <div className="text-sm" style={{ color: '#888' }}>{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative achievements */}
            <div
              className="mt-8 rounded-2xl p-6 border"
              style={{ background: '#111', borderColor: '#FDE100', borderWidth: 1 }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: '🏆', text: lang === 'en' ? 'Regional Champions 2023' : 'Чемпионы региона 2023' },
                  { icon: '🥇', text: lang === 'en' ? 'Moscow Cup Winners' : 'Обладатели Кубка Москвы' },
                  { icon: '⭐', text: lang === 'en' ? 'Top Youth Academy' : 'Лучшая юношеская академия' },
                  { icon: '🌍', text: lang === 'en' ? 'International Tournaments' : 'Международные турниры' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-lg"
                    style={{ background: 'rgba(253,225,0,0.05)' }}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="text-xs font-semibold text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
