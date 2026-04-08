import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

const CATEGORIES = [
  {
    icon: '⚽',
    labelEn: 'Training Sessions',
    labelRu: 'Тренировки',
    descEn: 'Weekly drills, skills and fun',
    descRu: 'Еженедельные тренировки и занятия',
    count: 0,
    color: '#FDE100',
  },
  {
    icon: '🏟️',
    labelEn: 'Match Days',
    labelRu: 'Матч-дни',
    descEn: 'Friendly games and tournament action',
    descRu: 'Товарищеские матчи и турниры',
    count: 0,
    color: '#FDE100',
  },
  {
    icon: '👥',
    labelEn: 'Team Photos',
    labelRu: 'Командные фото',
    descEn: 'Our squad, together',
    descRu: 'Наша команда вместе',
    count: 0,
    color: '#FDE100',
  },
  {
    icon: '🏆',
    labelEn: 'Tournaments',
    labelRu: 'Турниры',
    descEn: 'Competition and camaraderie',
    descRu: 'Соревнования и братство',
    count: 0,
    color: '#FDE100',
  },
  {
    icon: '⭐',
    labelEn: 'Academy Events',
    labelRu: 'События академии',
    descEn: 'Special sessions and celebrations',
    descRu: 'Особые сборы и праздники',
    count: 0,
    color: '#FDE100',
  },
  {
    icon: '📸',
    labelEn: 'Behind the Scenes',
    labelRu: 'За кулисами',
    descEn: 'Candid moments from the pitch',
    descRu: 'Закулисные моменты с поля',
    count: 0,
    color: '#FDE100',
  },
];

export default function GallerySection() {
  const { lang } = useLang();
  const t = translations[lang].gallery;

  return (
    <section id="gallery" className="py-24 min-h-screen" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="text-center mb-14">
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title mb-4"
            style={{ color: '#ffffff' }}
          >
            {t.title}
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm leading-relaxed">
            {lang === 'en'
              ? 'We are just getting started. Photos will appear here as our academy grows — check back after every session!'
              : 'Мы только начинаем. Фотографии будут появляться здесь по мере роста академии — заходите после каждой тренировки!'}
          </p>
        </div>

        {/* Coming soon hero banner */}
        <div
          className="relative rounded-3xl overflow-hidden mb-12 flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, #111111 0%, #1a1500 50%, #111111 100%)',
            border: '1px solid #2a2200',
            minHeight: 200,
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                'repeating-linear-gradient(45deg, #FDE100 0, #FDE100 1px, transparent 0, transparent 50%)',
              backgroundSize: '20px 20px',
            }}
          />
          <div className="relative text-center py-14 px-6">
            <div className="text-6xl mb-4">📷</div>
            <h3 className="text-2xl md:text-3xl font-black uppercase tracking-wide mb-2" style={{ color: '#FDE100' }}>
              {lang === 'en' ? 'Our Story in Pictures' : 'Наша история в фотографиях'}
            </h3>
            <p className="text-gray-500 text-sm">
              {lang === 'en'
                ? 'Photos coming after our first sessions — stay tuned!'
                : 'Фото появятся после первых тренировок — следите за обновлениями!'}
            </p>
          </div>
        </div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden flex flex-col"
              style={{
                background: '#0d0d0d',
                border: '1px dashed #2a2200',
                aspectRatio: '4/3',
                transition: 'border-color 0.3s, transform 0.3s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#FDE100';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#2a2200';
                (e.currentTarget as HTMLElement).style.transform = 'none';
              }}
            >
              {/* Subtle diagonal stripes bg */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    'repeating-linear-gradient(-45deg, #FDE100 0, #FDE100 1px, transparent 0, transparent 12px)',
                }}
              />

              <div className="relative flex flex-col items-center justify-center h-full gap-3 p-6 text-center">
                <span className="text-4xl" style={{ filter: 'grayscale(0.3)' }}>{cat.icon}</span>
                <span
                  className="text-base font-black uppercase tracking-wide"
                  style={{ color: '#FDE100' }}
                >
                  {lang === 'en' ? cat.labelEn : cat.labelRu}
                </span>
                <span className="text-xs text-gray-600 leading-snug max-w-[180px]">
                  {lang === 'en' ? cat.descEn : cat.descRu}
                </span>
                <span
                  className="mt-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{ background: '#1a1a1a', color: '#444' }}
                >
                  {lang === 'en' ? 'Photos coming soon' : 'Фото скоро будут'}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-10 text-xs text-gray-700">{t.consent}</p>
      </div>
    </section>
  );
}
