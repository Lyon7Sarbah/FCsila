import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

export default function HeroSection() {
  const { lang } = useLang();
  const t = translations[lang];

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
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, #FDE100 60px, #FDE100 61px)`,
        }}
      />

      {/* Background diagonal stripes */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FDE100 0, #FDE100 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      {/* Large background text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        style={{ opacity: 0.03 }}
      >
        <span
          className="font-black uppercase tracking-tighter text-white"
          style={{ fontSize: 'clamp(100px, 25vw, 300px)' }}
        >
          SILA
        </span>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 animate-float">
          <img
            src={lang === 'en' ? logoEn : logoRu}
            alt="FC SILA"
            className="h-36 md:h-48 w-auto object-contain drop-shadow-2xl"
            style={{ filter: 'drop-shadow(0 0 40px rgba(253,225,0,0.3))' }}
          />
        </div>

        {/* Tagline */}
        <div className="inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          style={{ background: 'rgba(253,225,0,0.15)', border: '1px solid rgba(253,225,0,0.3)', color: '#FDE100' }}
        >
          {t.hero.tagline}
        </div>

        {/* Main heading */}
        <h1
          className="font-black uppercase leading-none mb-4"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 5.5rem)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
          }}
        >
          {t.hero.subtitle}
        </h1>

        {/* Description */}
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
          style={{ color: '#aaaaaa' }}
        >
          {t.hero.description}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[t.hero.badge1, t.hero.badge2, t.hero.badge3].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#ccc', border: '1px solid rgba(255,255,255,0.12)' }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo('contact')}
            className="btn-pulse px-8 py-4 rounded-full text-base font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:brightness-110"
            style={{ background: '#FDE100', color: '#000' }}
          >
            {t.hero.cta_primary}
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="px-8 py-4 rounded-full text-base font-black uppercase tracking-wider transition-all duration-300 hover:scale-105"
            style={{
              background: 'transparent',
              color: '#FDE100',
              border: '2px solid #FDE100',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#FDE100';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#FDE100';
            }}
          >
            {t.hero.cta_secondary}
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="absolute bottom-0 left-0 right-0 border-t"
        style={{ borderColor: 'rgba(253,225,0,0.2)' }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}
          >
            {[
              { num: '200+', label: t.stats.players },
              { num: '8', label: t.stats.coaches },
              { num: '7', label: t.stats.years },
              { num: '24', label: t.stats.titles },
            ].map(({ num, label }) => (
              <div key={label} className="py-5 px-6 text-center" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                <div
                  className="text-2xl md:text-3xl font-black"
                  style={{ color: '#FDE100' }}
                >
                  {num}
                </div>
                <div className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-gray-400 uppercase tracking-widest">Scroll</span>
        <div
          className="w-px h-8 animate-pulse"
          style={{ background: '#FDE100' }}
        />
      </div>
    </section>
  );
}
