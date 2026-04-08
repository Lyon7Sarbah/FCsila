import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang].hero;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 20% 50%, #1a1400 0%, #000000 60%)',
        paddingTop: '80px',
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px)` }}
      />

      {/* Big watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ opacity: 0.025 }}>
        <span className="font-black uppercase tracking-tighter text-white" style={{ fontSize: 'clamp(80px, 22vw, 280px)' }}>
          SILA
        </span>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-float">
          <img
            src={lang === 'en' ? logoEn : logoRu}
            alt="FC SILA"
            className="h-36 md:h-52 w-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 40px rgba(253,225,0,0.25))' }}
          />
        </div>

        {/* Main heading */}
        <h1
          className="font-black uppercase leading-none mb-3"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 5rem)', letterSpacing: '-0.02em', color: '#ffffff' }}
        >
          {t.title}
        </h1>

        <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#FDE100' }}>
          {t.subtitle}
        </p>
        <p className="text-base md:text-lg mb-8" style={{ color: '#aaaaaa' }}>
          {t.tagline}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[t.badge1, t.badge2, t.badge3, t.badge4].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.07)', color: '#ccc', border: '1px solid rgba(255,255,255,0.10)' }}
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo('contact')}
          className="btn-pulse px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider mb-4 transition-all duration-300 hover:scale-105 hover:brightness-110"
          style={{ background: '#FDE100', color: '#000' }}
        >
          {t.cta} →
        </button>
        <p className="text-sm mt-3" style={{ color: '#666' }}>{t.trial_note}</p>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-0 left-0 right-0 border-t" style={{ borderColor: 'rgba(253,225,0,0.15)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '7–15', label: lang === 'en' ? 'Age Range' : 'Возраст' },
              { num: '12', label: lang === 'en' ? 'Max per Group' : 'Макс. в группе' },
              { num: '2', label: lang === 'en' ? 'Age Groups' : 'Группы' },
              { num: '2020', label: lang === 'en' ? 'Founded' : 'Основан' },
            ].map(({ num, label }) => (
              <div key={label} className="py-5 px-4 text-center border-r last:border-r-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                <div className="text-2xl md:text-3xl font-black" style={{ color: '#FDE100' }}>{num}</div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-30">
        <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
        <div className="w-px h-8 animate-pulse" style={{ background: '#FDE100' }} />
      </div>
    </section>
  );
}
