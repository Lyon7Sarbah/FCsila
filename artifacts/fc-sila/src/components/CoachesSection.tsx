import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function CoachesSection() {
  const { lang } = useLang();
  const t = translations[lang].coaches;

  return (
    <section id="coaches" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {t.staff.map((coach, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl p-8 border text-center relative overflow-hidden"
              style={{
                background: '#0d0d0d',
                borderColor: coach.vacancy ? '#333' : '#222',
                opacity: coach.vacancy ? 0.75 : 1,
              }}
            >
              {/* Number watermark */}
              <div className="absolute top-3 right-4 font-black text-6xl pointer-events-none select-none"
                style={{ color: 'rgba(253,225,0,0.05)', lineHeight: 1 }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Avatar */}
              <div
                className="w-28 h-28 rounded-full mx-auto mb-5 flex items-center justify-center text-5xl border-4"
                style={{
                  background: '#1a1a1a',
                  borderColor: coach.vacancy ? '#333' : '#FDE100',
                  boxShadow: coach.vacancy ? 'none' : '0 0 24px rgba(253,225,0,0.15)',
                }}
              >
                {coach.icon}
              </div>

              <h3 className="font-black text-xl text-white mb-1">{coach.name}</h3>

              {coach.vacancy ? (
                <div className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ background: '#333', color: '#888' }}>
                  {coach.role}
                </div>
              ) : (
                <div className="inline-block px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                  style={{ background: '#FDE100', color: '#000' }}>
                  {coach.role}
                </div>
              )}

              <p className="text-sm text-gray-400 leading-relaxed mb-4">{coach.bio}</p>

              <p className="text-sm italic" style={{ color: coach.vacancy ? '#555' : '#FDE100' }}>
                {coach.quote}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
