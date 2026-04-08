import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function TrainingSection() {
  const { lang } = useLang();
  const t = translations[lang].training;

  const totalMinutes = 120;

  return (
    <section id="training" className="py-24 min-h-screen" style={{ background: '#0a0a0a' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left — schedule + gear */}
          <div>
            {/* Schedule */}
            <h3 className="font-black text-lg uppercase tracking-wide mb-5" style={{ color: '#FDE100' }}>
              {t.schedule_title}
            </h3>
            <div className="rounded-2xl overflow-hidden border mb-10" style={{ borderColor: '#1a1a1a' }}>
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
                  style={{ borderColor: '#111', background: i % 2 === 0 ? '#0d0d0d' : '#090909' }}
                >
                  <span className="font-black text-sm" style={{ color: '#FDE100' }}>{row.day}</span>
                  <span className="text-sm text-gray-300">{row.group}</span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-bold w-fit"
                    style={{ background: 'rgba(253,225,0,0.1)', color: '#FDE100' }}
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
            <div className="rounded-2xl p-6 border" style={{ background: '#0d0d0d', borderColor: '#1a1a1a' }}>
              <div className="space-y-3">
                {t.gear.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-b-0" style={{ borderColor: '#111' }}>
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-sm text-gray-300">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — infographic session plan */}
          <div>
            <h3 className="font-black text-lg uppercase tracking-wide mb-6" style={{ color: '#FDE100' }}>
              {t.plan_title}
            </h3>

            {/* Duration bar */}
            <div className="flex rounded-xl overflow-hidden mb-6 h-6">
              {t.plan.map((step, i) => {
                const parts = step.time.split('–');
                const start = parseInt(parts[0]);
                const end = parseInt(parts[1]);
                const width = ((end - start) / totalMinutes) * 100;
                return (
                  <div
                    key={i}
                    title={`${step.label} (${step.time} min)`}
                    style={{
                      width: `${width}%`,
                      background: step.color,
                      transition: 'opacity 0.2s',
                    }}
                    className="hover:opacity-90 cursor-default"
                  />
                );
              })}
            </div>

            {/* Step cards */}
            <div className="flex flex-col gap-3">
              {t.plan.map((step, i) => {
                const parts = step.time.split('–');
                const start = parseInt(parts[0]);
                const end = parseInt(parts[1]);
                const duration = end - start;

                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-xl px-4 py-3 border transition-all hover:scale-[1.01]"
                    style={{
                      background: '#0d0d0d',
                      borderColor: '#1a1a1a',
                      borderLeft: `4px solid ${step.color}`,
                    }}
                  >
                    {/* Icon */}
                    <div
                      className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                      style={{ background: `${step.color}18` }}
                    >
                      {step.icon}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline gap-2">
                        <span className="font-black text-sm text-white">{step.label}</span>
                        <span className="text-xs text-gray-600">{step.desc}</span>
                      </div>
                    </div>

                    {/* Time chip */}
                    <div className="flex-shrink-0 text-right">
                      <div className="font-black text-sm font-mono" style={{ color: step.color }}>
                        {step.time}
                        <span className="text-[10px]"> min</span>
                      </div>
                      <div className="text-[10px] text-gray-600">
                        {duration} {lang === 'en' ? 'min' : 'мин'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Total */}
            <div className="mt-4 rounded-xl px-4 py-3 flex items-center justify-between"
              style={{ background: 'rgba(253,225,0,0.05)', border: '1px solid rgba(253,225,0,0.15)' }}>
              <span className="text-sm font-black text-white uppercase tracking-wider">
                {lang === 'en' ? 'Total Session' : 'Итого занятие'}
              </span>
              <span className="font-black" style={{ color: '#FDE100' }}>
                {totalMinutes} {lang === 'en' ? 'minutes' : 'минут'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
