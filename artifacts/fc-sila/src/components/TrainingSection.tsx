import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function TrainingSection() {
  const { lang } = useLang();
  const t = translations[lang].training;

  return (
    <section id="training" className="py-24" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div>
            {/* Schedule */}
            <h3 className="font-black text-lg uppercase tracking-wide mb-5" style={{ color: '#FDE100' }}>
              {t.schedule_title}
            </h3>
            <div className="rounded-2xl overflow-hidden border mb-8" style={{ borderColor: '#222' }}>
              {/* Header */}
              <div
                className="grid grid-cols-3 px-5 py-3 text-xs font-black uppercase tracking-widest"
                style={{ background: '#FDE100', color: '#000' }}
              >
                <span>{lang === 'en' ? 'Day' : 'День'}</span>
                <span>{lang === 'en' ? 'Group' : 'Группа'}</span>
                <span>{lang === 'en' ? 'Status' : 'Статус'}</span>
              </div>
              {t.schedule_rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 px-5 py-4 border-t items-center"
                  style={{ borderColor: '#1a1a1a', background: i % 2 === 0 ? '#0d0d0d' : '#090909' }}
                >
                  <span className="font-black text-sm" style={{ color: '#FDE100' }}>{row.day}</span>
                  <span className="text-sm text-gray-300">{row.group}</span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold w-fit"
                    style={{ background: 'rgba(253,225,0,0.12)', color: '#FDE100' }}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>

            {/* What to bring */}
            <h3 className="font-black text-lg uppercase tracking-wide mb-5" style={{ color: '#FDE100' }}>
              {t.gear_title}
            </h3>
            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#222' }}>
              <div className="space-y-3">
                {t.gear.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: '#1a1a1a' }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column — session plan */}
          <div>
            <h3 className="font-black text-lg uppercase tracking-wide mb-5" style={{ color: '#FDE100' }}>
              {t.plan_title}
            </h3>
            <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#222' }}>
              {t.plan.map((step, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 px-5 py-4 border-b last:border-b-0 hover:bg-white/[0.02] transition-colors"
                  style={{ borderColor: '#1a1a1a' }}
                >
                  <span
                    className="flex-shrink-0 text-sm font-black font-mono w-20"
                    style={{ color: '#FDE100' }}
                  >
                    {step.time}
                  </span>
                  <span className="text-sm text-gray-300">{step.desc}</span>
                </div>
              ))}
            </div>

            {/* Note card */}
            <div
              className="mt-6 rounded-2xl p-5 border"
              style={{ background: 'rgba(253,225,0,0.04)', borderColor: 'rgba(253,225,0,0.2)' }}
            >
              <div className="text-2xl mb-2">📍</div>
              <p className="text-sm text-gray-400">
                {lang === 'en'
                  ? 'Sessions run every Saturday. All weather training – we only cancel in extreme conditions. Full details sent after registration.'
                  : 'Занятия проходят каждую субботу. Тренируемся при любой погоде — отменяем только в экстремальных условиях. Подробности отправляем после регистрации.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
