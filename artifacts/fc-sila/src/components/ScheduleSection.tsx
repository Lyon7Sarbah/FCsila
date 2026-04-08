import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function ScheduleSection() {
  const { lang } = useLang();
  const t = translations[lang];

  const getStatusStyle = (status: string) => {
    if (status === 'Open') return { bg: 'rgba(253,225,0,0.12)', color: '#FDE100', label: t.schedule.open };
    if (status === 'Full') return { bg: 'rgba(255,60,60,0.12)', color: '#ff6b6b', label: t.schedule.full };
    if (status === 'Training') return { bg: 'rgba(253,225,0,0.12)', color: '#FDE100', label: t.schedule.training };
    return { bg: 'rgba(255,255,255,0.05)', color: '#666', label: status };
  };

  return (
    <section id="schedule" className="py-24" style={{ background: '#050505' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-bold uppercase tracking-widest mb-3 block"
            style={{ color: '#FDE100' }}
          >
            {lang === 'en' ? 'Weekly Sessions' : 'Еженедельные занятия'}
          </span>
          <h2
            className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title mb-4"
            style={{ color: '#ffffff' }}
          >
            {t.schedule.title}
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t.schedule.subtitle}
          </p>
        </div>

        {/* Schedule table */}
        <div
          className="rounded-2xl overflow-hidden border"
          style={{ borderColor: '#222' }}
        >
          {/* Header row */}
          <div
            className="grid grid-cols-12 gap-2 px-6 py-4 text-xs font-black uppercase tracking-widest"
            style={{ background: '#FDE100', color: '#000' }}
          >
            <div className="col-span-2">{t.schedule.day}</div>
            <div className="col-span-4">{t.schedule.groups_col}</div>
            <div className="col-span-2">{t.schedule.time}</div>
            <div className="col-span-3">{t.schedule.location}</div>
            <div className="col-span-1">{t.schedule.status}</div>
          </div>

          {/* Data rows */}
          {t.schedule.rows.map((row, i) => {
            const statusInfo = getStatusStyle(row.status);
            const isSaturday = row.status === 'Training';
            const isRest = row.status === '—';

            return (
              <div
                key={i}
                className="grid grid-cols-12 gap-2 px-6 py-5 border-t items-center transition-all duration-200 hover:bg-white/[0.02]"
                style={{
                  borderColor: '#1a1a1a',
                  background: isSaturday
                    ? 'rgba(253,225,0,0.04)'
                    : isRest
                    ? 'rgba(255,255,255,0.01)'
                    : 'transparent',
                }}
              >
                {/* Day */}
                <div className="col-span-2">
                  <span
                    className="font-black text-sm uppercase tracking-wide"
                    style={{ color: isSaturday ? '#FDE100' : isRest ? '#444' : '#fff' }}
                  >
                    {row.day}
                  </span>
                </div>

                {/* Groups */}
                <div className="col-span-4">
                  <span
                    className="text-sm"
                    style={{ color: isRest ? '#444' : '#bbb' }}
                  >
                    {row.groups}
                  </span>
                </div>

                {/* Time */}
                <div className="col-span-2">
                  {isSaturday ? (
                    <span className="text-sm text-gray-500 italic">
                      {lang === 'en' ? 'See coach' : 'Уточнить у тренера'}
                    </span>
                  ) : (
                    <span
                      className="text-sm font-mono font-semibold"
                      style={{ color: isRest ? '#444' : '#ccc' }}
                    >
                      {row.time}
                    </span>
                  )}
                </div>

                {/* Location */}
                <div className="col-span-3">
                  <span
                    className="text-sm"
                    style={{ color: isRest ? '#444' : '#888' }}
                  >
                    {row.location}
                  </span>
                </div>

                {/* Status badge */}
                <div className="col-span-1">
                  {!isRest && (
                    <span
                      className="inline-block px-2 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                      style={{ background: statusInfo.bg, color: statusInfo.color }}
                    >
                      {statusInfo.label}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <p
          className="mt-6 text-center text-sm"
          style={{ color: '#555' }}
        >
          {t.schedule.note}
        </p>

        {/* Location highlights */}
        <div className="mt-12 grid sm:grid-cols-2 gap-6">
          {[
            {
              icon: '🏟️',
              title: lang === 'en' ? 'Luzhniki Complex' : 'Лужники',
              desc: lang === 'en'
                ? 'Primary training venue with professional-grade pitches and facilities'
                : 'Основная тренировочная база с полями профессионального уровня',
            },
            {
              icon: '🏢',
              title: lang === 'en' ? 'CSKA Indoor Hall' : 'Крытый зал ЦСКА',
              desc: lang === 'en'
                ? 'All-weather indoor facility for technical sessions and winter training'
                : 'Крытый зал для технических занятий в любую погоду и в зимний период',
            },
          ].map((loc, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 border flex gap-5 items-start card-lift"
              style={{ background: '#0d0d0d', borderColor: '#222' }}
            >
              <span className="text-3xl">{loc.icon}</span>
              <div>
                <div className="font-bold text-white mb-1">{loc.title}</div>
                <div className="text-sm text-gray-400">{loc.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
