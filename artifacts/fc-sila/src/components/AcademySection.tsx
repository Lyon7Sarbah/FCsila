import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function AcademySection() {
  const { lang } = useLang();
  const t = translations[lang].academy;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="academy" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {t.groups.map((group, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl p-8 border relative overflow-hidden"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              {/* Top yellow bar */}
              <div className="absolute top-0 left-0 right-0 h-1" style={{ background: '#FDE100' }} />

              <div className="flex items-start justify-between mb-6">
                <div>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {group.badge}
                  </span>
                  <h3 className="text-3xl font-black" style={{ color: '#FDE100' }}>{group.age}</h3>
                </div>
                <span className="text-5xl">{group.icon}</span>
              </div>

              <p className="text-gray-300 mb-6 leading-relaxed italic">{group.desc}</p>

              <ul className="mb-8 space-y-3">
                {group.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                    <span className="mt-1 flex-shrink-0 w-2 h-2 rounded-full" style={{ background: '#FDE100' }} />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between">
                <div className="text-2xl font-black" style={{ color: '#FDE100' }}>{group.price}</div>
                <button
                  onClick={() => scrollTo('contact')}
                  className="px-6 py-3 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 hover:brightness-90 hover:scale-[0.98]"
                  style={{ background: '#FDE100', color: '#000' }}
                >
                  {t.enroll} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Ticker */}
        <div className="mt-14 py-4 rounded-xl overflow-hidden" style={{ background: '#FDE100' }}>
          <div className="ticker-wrap">
            <div className="ticker-content">
              {Array(8).fill(null).map((_, i) => (
                <span key={i} className="inline-flex items-center gap-4 px-8 text-black font-black uppercase text-sm tracking-widest">
                  <span>FC SILA</span>
                  <span>⚽</span>
                  <span>{lang === 'en' ? 'Moscow Football Academy' : 'Футбольная академия Москвы'}</span>
                  <span>⚽</span>
                  <span>{lang === 'en' ? 'Ages 7–15' : 'Возраст 7–15'}</span>
                  <span>⚽</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
