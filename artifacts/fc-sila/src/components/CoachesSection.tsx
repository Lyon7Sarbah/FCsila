import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import heroBg from '@/assets/hero-bg.png';

export default function CoachesSection() {
  const { lang } = useLang();
  const t = translations[lang].coaches;

  return (
    <section id="coaches" className="py-24 min-h-screen" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>
        <p className="text-center text-gray-500 mb-8 text-sm">{t.coming_soon}</p>

        <PageBanner
          imageSrc={heroBg}
          overlayText={lang === 'en' ? 'Shaping the Next Generation of Footballers' : 'Воспитываем следующее поколение футболистов'}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.staff.map((coach, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl border overflow-hidden flex flex-col"
              style={{
                background: '#0d0d0d',
                borderColor: coach.vacancy ? '#1e1e1e' : '#2a2a2a',
              }}
            >
              {/* Photo box */}
              <div
                className="relative flex items-center justify-center"
                style={{
                  height: '220px',
                  background: coach.vacancy
                    ? 'linear-gradient(135deg, #0f0f0f, #1a1a1a)'
                    : 'linear-gradient(135deg, #111100, #1a1600)',
                  borderBottom: `3px solid ${coach.vacancy ? '#222' : '#FDE100'}`,
                }}
              >
                {coach.vacancy ? (
                  <div className="flex flex-col items-center gap-3 text-center px-4">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-3xl border-2 border-dashed"
                      style={{ borderColor: '#333', background: '#111' }}
                    >
                      👤
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#444' }}>
                      {lang === 'en' ? 'Photo Coming' : 'Фото скоро'}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 text-center px-4">
                    <div
                      className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-3"
                      style={{
                        background: '#1a1500',
                        border: '3px solid #FDE100',
                        boxShadow: '0 0 24px rgba(253,225,0,0.2)',
                      }}
                    >
                      👨‍🏫
                    </div>
                    <span className="text-xs uppercase tracking-widest font-bold" style={{ color: '#FDE100' }}>
                      {lang === 'en' ? 'Head Coach' : 'Главный тренер'}
                    </span>
                  </div>
                )}

                {/* Vacancy badge */}
                {coach.vacancy && (
                  <div
                    className="absolute top-3 right-3 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                    style={{ background: '#1a1a1a', color: '#555', border: '1px solid #2a2a2a' }}
                  >
                    {lang === 'en' ? 'Open' : 'Вакансия'}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className={`font-black text-base mb-1 ${coach.vacancy ? 'text-gray-500' : 'text-white'}`}>
                  {coach.name}
                </h3>
                <div
                  className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider mb-3 w-fit"
                  style={{
                    background: coach.vacancy ? '#1a1a1a' : '#FDE100',
                    color: coach.vacancy ? '#555' : '#000',
                  }}
                >
                  {coach.role}
                </div>
                <p className={`text-xs leading-relaxed mb-3 flex-1 ${coach.vacancy ? 'text-gray-600' : 'text-gray-400'}`}>
                  {coach.bio}
                </p>
                <p className="text-xs italic" style={{ color: coach.vacancy ? '#3a3a3a' : '#FDE100' }}>
                  {coach.quote}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
