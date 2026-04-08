import { useLang } from '@/context/LangContext';
import { translations, NAV_ITEMS } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <footer style={{ background: '#030303', borderTop: '2px solid #FDE100' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={lang === 'en' ? logoEn : logoRu}
                alt="FC SILA"
                className="h-14 w-auto object-contain"
              />
              <div>
                <div className="font-black text-xl tracking-wider" style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'FC SILA' : 'ФК СИЛА'}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">
                  {lang === 'en' ? 'Moscow' : 'Москва'}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 mb-2">{t.footer.tagline}</p>
            <p className="text-xs" style={{ color: '#444' }}>{t.footer.legal_line}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-5" style={{ color: '#FDE100' }}>
              {lang === 'en' ? 'Quick Links' : 'Быстрые ссылки'}
            </h4>
            <ul className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => scrollTo(item)}
                    className="text-sm text-gray-500 hover:text-yellow-400 transition-colors duration-200 font-medium uppercase tracking-wide"
                  >
                    {t.nav[item]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-5" style={{ color: '#FDE100' }}>
              {lang === 'en' ? 'Contact' : 'Контакты'}
            </h4>
            <div className="space-y-2 text-sm text-gray-500">
              <div>
                <a href="mailto:info@fcsila.ru" className="hover:text-yellow-400 transition-colors">
                  info@fcsila.ru
                </a>
              </div>
              <div>
                <a href="https://www.fcsila.ru" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">
                  www.fcsila.ru
                </a>
              </div>
              <div className="text-gray-600 text-xs mt-4 leading-relaxed">
                OGRN: 1207700105073<br />
                INN: 9715380269 / KPP: 502701001<br />
                {lang === 'en' ? 'General Director: Shishelov V.O.' : 'ГД: Шишелов В.О.'}
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: '#1a1a1a' }}>
          <p className="text-xs text-gray-600">{t.footer.copyright}</p>
          <p className="text-xs" style={{ color: '#333' }}>
            {lang === 'en' ? '"Stronger together. Better every Saturday."' : '«Вместе сильнее. Лучше каждую субботу.»'}
          </p>
        </div>
      </div>
    </footer>
  );
}
