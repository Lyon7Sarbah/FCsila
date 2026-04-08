import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import aboutBg from '@/assets/about-bg.png';

export default function AboutSection() {
  const { lang } = useLang();
  const t = translations[lang].about;

  return (
    <section id="about" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        {/* Banner image */}
        <div className="relative rounded-2xl overflow-hidden mb-14" style={{ height: '240px' }}>
          <img src={aboutBg} alt="" className="w-full h-full object-cover" style={{ opacity: 0.5 }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%, rgba(0,0,0,0.7) 100%)' }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-black uppercase tracking-widest text-center px-6" style={{ color: '#FDE100', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
              {lang === 'en' ? 'Football Is the Universal Language' : 'Футбол — Универсальный Язык'}
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-12">
          {/* Story */}
          <div>
            <h3 className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: '#FDE100' }}>
              {t.story_title}
            </h3>
            <div className="rounded-2xl p-7 border mb-6" style={{ background: '#111', borderColor: '#1a1a1a' }}>
              <p className="text-gray-300 leading-relaxed mb-4">{t.story1}</p>
              <p className="text-gray-300 leading-relaxed mb-4">{t.story2}</p>
              <p className="font-bold text-white">{t.story3}</p>
            </div>

            <h3 className="text-xl font-black uppercase tracking-wide mb-4" style={{ color: '#FDE100' }}>
              {t.history_title}
            </h3>
            <div className="rounded-2xl p-7 border mb-6" style={{ background: '#111', borderColor: '#1a1a1a' }}>
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
            <div className="flex flex-col gap-3">
              {t.values.map((v, i) => (
                <div
                  key={i}
                  className="card-lift rounded-xl p-4 border flex items-start gap-4"
                  style={{ background: '#111', borderColor: '#1a1a1a' }}
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
          </div>
        </div>
      </div>
    </section>
  );
}
