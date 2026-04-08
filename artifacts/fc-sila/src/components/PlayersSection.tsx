import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function PlayersSection() {
  const { lang } = useLang();
  const t = translations[lang].players;

  return (
    <section id="players" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-8 md:gap-16 mb-14 flex-wrap">
          {t.stats.map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-5xl md:text-6xl font-black mb-2" style={{ color: '#FDE100' }}>{s.num}</div>
              <div className="text-sm text-gray-400 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Player of the Month */}
        <div
          className="rounded-2xl p-8 border text-center mb-12"
          style={{ background: '#0d0d0d', borderColor: '#222' }}
        >
          <div className="text-3xl mb-3">⚡</div>
          <h3 className="text-xl font-black uppercase tracking-wide text-white mb-3">{t.potm_title}</h3>
          <p className="text-gray-400 italic">{t.potm_text}</p>
        </div>

        {/* Testimonials */}
        <div>
          <h3 className="text-xl font-black uppercase tracking-wide mb-6" style={{ color: '#FDE100' }}>
            {t.testimonials_title}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {t.testimonials.map((test, i) => (
              <div
                key={i}
                className="card-lift rounded-2xl p-6 border italic"
                style={{ background: '#0d0d0d', borderColor: '#222' }}
              >
                <p className="text-gray-300 leading-relaxed mb-4">{test.text}</p>
                <p className="text-sm font-bold" style={{ color: '#FDE100' }}>— {test.author}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
