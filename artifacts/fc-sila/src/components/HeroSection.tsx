import { useLocation } from 'wouter';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';
import heroBg from '@/assets/hero-bg.png';

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang].hero;
  const [, navigate] = useLocation();

  return (
    <section
      id="home"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: 'calc(100vh - 64px)' }}
    >
      {/* Background image — faded */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.85) 75%, #000 100%)'
        }} />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px)` }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center py-12">
        {/* Logo */}
        <div className="mb-8 animate-float">
          <img
            src={lang === 'en' ? logoEn : logoRu}
            alt="FC SILA"
            className="h-36 md:h-52 w-auto object-contain mx-auto"
            style={{ filter: 'drop-shadow(0 0 50px rgba(253,225,0,0.35))' }}
          />
        </div>

        <h1
          className="font-black uppercase leading-none mb-3 max-w-4xl"
          style={{ fontSize: 'clamp(2rem, 6.5vw, 5rem)', letterSpacing: '-0.02em', color: '#ffffff', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}
        >
          {t.title}
        </h1>

        <p className="text-lg md:text-xl font-semibold mb-2" style={{ color: '#FDE100', textShadow: '0 1px 10px rgba(0,0,0,0.8)' }}>
          {t.subtitle}
        </p>
        <p className="text-base md:text-lg mb-8" style={{ color: '#aaaaaa' }}>
          {t.tagline}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[t.badge1, t.badge2, t.badge3, t.badge4].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(0,0,0,0.5)', color: '#ccc', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)' }}
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => { navigate('/contact'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
          className="btn-pulse px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:brightness-110 mb-3"
          style={{ background: '#FDE100', color: '#000', boxShadow: '0 4px 30px rgba(253,225,0,0.4)' }}
        >
          {t.cta} →
        </button>
        <p className="text-xs" style={{ color: '#555' }}>{t.trial_note}</p>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 border-t" style={{ borderColor: 'rgba(253,225,0,0.15)', background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)' }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '7–15', label: lang === 'en' ? 'Age Range' : 'Возраст' },
              { num: '15', label: lang === 'en' ? 'Max per Group' : 'Макс. в группе' },
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
    </section>
  );
}
