import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';

export default function GallerySection() {
  const { lang } = useLang();
  const t = translations[lang].gallery;

  return (
    <section id="gallery" className="py-24" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight section-title" style={{ color: '#ffffff' }}>
            {t.title}
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.items.map((item, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl border flex flex-col items-center justify-center text-center p-8 gap-3"
              style={{
                background: '#0d0d0d',
                borderColor: '#222',
                aspectRatio: '1 / 1',
              }}
            >
              <span className="text-5xl">{item.icon}</span>
              <div className="font-bold text-white text-sm">{item.title}</div>
              <div className="text-xs text-gray-500 italic">{item.sub}</div>
            </div>
          ))}
        </div>

        <p className="text-center mt-6 text-xs" style={{ color: '#555' }}>{t.consent}</p>
      </div>
    </section>
  );
}
