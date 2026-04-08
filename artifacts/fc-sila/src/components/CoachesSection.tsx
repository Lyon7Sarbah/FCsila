import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function CoachesSection() {
  const { lang } = useLang();
  const t = translations[lang];

  return (
    <section id="coaches" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: '#FDE100' }}
          >
            {lang === 'en' ? 'The Team Behind The Team' : 'Команда за командой'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title mb-4"
            style={{ color: '#ffffff' }}
          >
            {t.coaches.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.coaches.subtitle}
          </p>
        </div>

        {/* Coaches grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.coaches.staff.map((coach, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl p-6 border text-center relative overflow-hidden"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              {/* Number watermark */}
              <div
                className="absolute top-3 right-4 font-black text-5xl pointer-events-none select-none"
                style={{ color: 'rgba(253,225,0,0.06)', lineHeight: 1 }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 relative z-10"
                style={{
                  background: '#1a1a1a',
                  borderColor: '#FDE100',
                  boxShadow: '0 0 20px rgba(253,225,0,0.15)',
                }}
              >
                {coach.icon}
              </div>

              {/* Info */}
              <h3 className="font-black text-lg text-white mb-1">{coach.name}</h3>
              <div
                className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3"
                style={{ background: '#FDE100', color: '#000' }}
              >
                {coach.role}
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">{coach.bio}</p>
            </div>
          ))}
        </div>

        {/* CTA to join */}
        <div
          className="mt-16 rounded-2xl p-8 md:p-12 text-center border"
          style={{
            background: 'linear-gradient(135deg, #111 0%, #0d0d0d 100%)',
            borderColor: '#FDE100',
          }}
        >
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3 uppercase tracking-tight">
            {lang === 'en'
              ? 'Train With The Best'
              : 'Тренируйся с лучшими'}
          </h3>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            {lang === 'en'
              ? 'Our coaching staff brings together decades of professional football experience to help your child reach their full potential.'
              : 'Наш тренерский штаб объединяет десятилетия профессионального футбольного опыта, чтобы помочь вашему ребёнку раскрыть свой потенциал.'}
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('contact');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm transition-all duration-300 hover:scale-105 hover:brightness-90"
            style={{ background: '#FDE100', color: '#000' }}
          >
            {lang === 'en' ? 'Book a Trial Session' : 'Записаться на пробное занятие'}
          </button>
        </div>
      </div>
    </section>
  );
}
