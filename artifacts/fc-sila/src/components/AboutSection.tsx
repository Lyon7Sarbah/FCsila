import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function AboutSection() {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Story */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: '#FDE100' }}>
              {t.story_title}
            </h3>
            <div className="rounded-2xl p-7 border mb-6" style={{ background: '#111', borderColor: '#222' }}>
              <p className="text-gray-300 leading-relaxed mb-4">{t.story1}</p>
              <p className="text-gray-300 leading-relaxed mb-4">{t.story2}</p>
              <p className="font-bold text-white">{t.story3}</p>
            </div>

            <h3 className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: '#FDE100' }}>
              {t.history_title}
            </h3>
            <div className="rounded-2xl p-7 border mb-6" style={{ background: '#111', borderColor: '#222' }}>
              <p className="text-gray-300 leading-relaxed">{t.history_text}</p>
            </div>

            <div className="rounded-2xl p-6 font-black text-lg uppercase tracking-wide text-center" style={{ background: '#FDE100', color: '#000' }}>
              {t.motto}
            </div>
          </div>

          {/* Values */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wide mb-5" style={{ color: '#FDE100' }}>
              {t.values_title}
            </h3>
            <div className="flex flex-col gap-3 mb-8">
              {t.values.map((v, i) => (
                <div
                  key={i}
                  className="card-lift rounded-xl p-4 border flex items-start gap-4"
                  style={{ background: '#111', borderColor: '#222' }}
                >
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-black text-sm"
                    style={{ background: '#FDE100', color: '#000' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{v.label}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{v.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Legal info box */}
            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#FDE100' }}>
              <h3 className="font-black text-base uppercase tracking-wide mb-4" style={{ color: '#FDE100' }}>
                📜 {t.legal_title}
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {Object.values(t.legal).map((item, i) => {
                  const [key, ...rest] = item.split(': ');
                  return (
                    <div key={i} className="py-2 border-b" style={{ borderColor: '#222' }}>
                      <span className="text-xs font-bold" style={{ color: '#FDE100' }}>{key}:</span>
                      <span className="text-xs text-gray-400 ml-1">{rest.join(': ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
