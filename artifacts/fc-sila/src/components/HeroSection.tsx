import { useLocation } from 'wouter';
import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';
import heroBg from '@/assets/hero-new.png';
import heroVideo from '@/assets/hero-video.mp4';

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
      {/* Video background — with image fallback for all devices */}
      <div className="absolute inset-0">
        {/* Fallback image — shown when video hasn't loaded yet */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        {/* Video — autoplay muted loop works on iOS/Android with playsInline */}
        <video
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        >
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Opacity overlay on the video/image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0,0,0,0.45)',
          }}
        />
        {/* Gradient fade to black at bottom */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 30%, rgba(0,0,0,0.7) 70%, #000000 100%)',
          }}
        />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(253,225,0,0.025) 60px, rgba(253,225,0,0.025) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(253,225,0,0.025) 60px, rgba(253,225,0,0.025) 61px)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 text-center py-12">
        {/* Logo */}
        <div className="mb-6 animate-float">
          {lang === 'en' ? (
            <img
              src={logoEn}
              alt="FC SILA"
              className="h-32 md:h-52 w-auto object-contain mx-auto"
              style={{ filter: 'drop-shadow(0 0 50px rgba(253,225,0,0.45))' }}
            />
          ) : (
            <img
              src={logoRu}
              alt="ФК Сила"
              className="w-auto object-contain mx-auto"
              style={{
                height: 'clamp(9rem, 18vw, 15rem)',
                transform: 'scale(1.15)',
                mixBlendMode: 'screen',
                filter: 'drop-shadow(0 0 50px rgba(253,225,0,0.45))',
              }}
            />
          )}
        </div>

        <h1
          className="font-black uppercase leading-none mb-3 max-w-4xl"
          style={{
            fontSize: 'clamp(2rem, 6.5vw, 5rem)',
            letterSpacing: '-0.02em',
            color: '#ffffff',
            textShadow: '0 2px 30px rgba(0,0,0,0.95)',
          }}
        >
          {t.title}
        </h1>

        <p
          className="text-lg md:text-xl font-semibold mb-2"
          style={{ color: '#FDE100', textShadow: '0 1px 15px rgba(0,0,0,0.9)' }}
        >
          {t.subtitle}
        </p>
        <p className="text-base md:text-lg mb-8" style={{ color: '#aaaaaa', textShadow: '0 1px 8px rgba(0,0,0,0.8)' }}>
          {t.tagline}
        </p>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[t.badge1, t.badge2, t.badge3, t.badge4].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full text-sm font-semibold"
              style={{
                background: 'rgba(0,0,0,0.65)',
                color: '#ccc',
                border: '1px solid rgba(255,255,255,0.2)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            navigate('/contact');
            window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
          }}
          className="btn-pulse px-8 py-4 rounded-full text-sm font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:brightness-110 mb-3"
          style={{
            background: '#FDE100',
            color: '#000',
            boxShadow: '0 4px 30px rgba(253,225,0,0.5)',
          }}
        >
          {t.cta} →
        </button>
        <p className="text-xs" style={{ color: '#666', textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>{t.trial_note}</p>
      </div>

      {/* Stats strip */}
      <div
        className="relative z-10 border-t"
        style={{
          borderColor: 'rgba(253,225,0,0.2)',
          background: 'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { num: '7–15', label: lang === 'en' ? 'Age Range' : 'Возраст' },
              { num: '15', label: lang === 'en' ? 'Max per Group' : 'Макс. в группе' },
              { num: '2', label: lang === 'en' ? 'Age Groups' : 'Группы' },
              { num: '2020', label: lang === 'en' ? 'Founded' : 'Основан' },
            ].map(({ num, label }) => (
              <div
                key={label}
                className="py-5 px-4 text-center border-r last:border-r-0"
                style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              >
                <div className="text-2xl md:text-3xl font-black" style={{ color: '#FDE100' }}>
                  {num}
                </div>
                <div className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
