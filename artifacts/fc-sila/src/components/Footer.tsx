import { useLocation } from 'wouter';
import { useLang } from '@/context/LangContext';
import { translations, NAV_ITEMS, PAGE_ROUTES, SCROLL_SECTIONS } from '@/lib/i18n';
import logoEn from '@assets/football_club_strength_1775666267415.png';
import logoRu from '@assets/sila_logo__1775666431192.png';

export default function Footer() {
  const { lang } = useLang();
  const t = translations[lang];
  const [location, navigate] = useLocation();

  const handleNav = (item: string) => {
    if (SCROLL_SECTIONS.includes(item)) {
      navigate('/');
      setTimeout(() => {
        if (item === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
        else document.getElementById(item)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else if (PAGE_ROUTES[item]) {
      navigate(PAGE_ROUTES[item]);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <footer style={{ background: '#030303', borderTop: '2px solid #FDE100' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={lang === 'en' ? logoEn : logoRu} alt="FC SILA" className="h-12 w-auto object-contain" />
              <div>
                <div className="font-black text-xl tracking-wider" style={{ color: '#FDE100' }}>
                  {lang === 'en' ? 'FC SILA' : 'ФК СИЛА'}
                </div>
                <div className="text-xs text-gray-600 uppercase tracking-widest">
                  {lang === 'en' ? 'Moscow' : 'Москва'}
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{t.footer.tagline}</p>
            <p className="text-xs" style={{ color: '#333' }}>{t.footer.legal_line}</p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-5" style={{ color: '#FDE100' }}>
              {lang === 'en' ? 'Quick Links' : 'Быстрые ссылки'}
            </h4>
            <ul className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNav(item)}
                    className="text-xs text-gray-600 hover:text-yellow-400 transition-colors font-medium uppercase tracking-wide"
                  >
                    {t.nav[item]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-xs mb-5" style={{ color: '#FDE100' }}>
              {lang === 'en' ? 'Contact' : 'Контакты'}
            </h4>
            <div className="space-y-2 text-xs text-gray-600">
              <div><a href="mailto:fcsilamoscow@gmail.com" className="hover:text-yellow-400 transition-colors">fcsilamoscow@gmail.com</a></div>
              <div><a href="https://wa.me/79309630699" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">WhatsApp: +7 930 963 06 99</a></div>
              <div><a href="https://instagram.com/academyfcsila" target="_blank" rel="noreferrer" className="hover:text-yellow-400 transition-colors">@academyfcsila</a></div>
              <div className="mt-3" style={{ color: '#2a2a2a' }}>
                OGRN: 1207700105073<br />
                INN: 9715380269 / KPP: 502701001
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: '#111' }}>
          <p className="text-xs" style={{ color: '#333' }}>{t.footer.copyright}</p>
          <p className="text-xs" style={{ color: '#222' }}>
            {lang === 'en' ? '"Stronger together. Better every Saturday."' : '«Вместе сильнее. Лучше каждую субботу.»'}
          </p>
        </div>
      </div>
    </footer>
  );
}
