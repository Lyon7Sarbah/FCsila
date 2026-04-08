import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import aboutBg from '@/assets/about-bg.png';

export default function GallerySection() {
  const { lang } = useLang();
  const t = translations[lang].gallery;

  return (
    <section id="gallery" className="py-24 min-h-screen" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <PageBanner
          imageSrc={aboutBg}
          overlayText={lang === 'en' ? 'Our Story in Pictures — Coming Soon' : 'Наша история в фотографиях — скоро'}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl border flex flex-col items-center justify-center text-center p-12 gap-4"
              style={{
                background: '#0d0d0d',
                borderColor: '#1a1a1a',
                aspectRatio: '4/3',
              }}
            >
              <span className="text-5xl">{item.icon}</span>
              <div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-xs text-gray-600 italic">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs" style={{ color: '#333' }}>{t.consent}</p>
      </div>
    </section>
  );
}
