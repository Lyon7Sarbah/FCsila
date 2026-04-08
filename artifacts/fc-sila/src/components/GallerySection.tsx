import { useLang } from '@/context/LangContext';
import { translations } from '@/lib/i18n';
import PageBanner from '@/components/PageBanner';
import gallery1 from '@/assets/gallery-1.png';
import gallery2 from '@/assets/gallery-2.png';
import gallery3 from '@/assets/gallery-3.png';
import gallery4 from '@/assets/gallery-4.png';
import nikeBoot from '@/assets/nike-boots.png';
import heroBg from '@/assets/hero-bg.png';

const GALLERY_IMAGES = [
  { src: gallery1, labelEn: 'Training Session', labelRu: 'Тренировка' },
  { src: gallery2, labelEn: 'Team Spirit', labelRu: 'Командный дух' },
  { src: gallery4, labelEn: 'Ball Mastery', labelRu: 'Владение мячом' },
  { src: gallery3, labelEn: 'Kit & Equipment', labelRu: 'Форма и снаряжение' },
  { src: nikeBoot, labelEn: 'Academy Boots', labelRu: 'Бутсы академии' },
  { src: heroBg, labelEn: 'Our Team', labelRu: 'Наша команда' },
];

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
          imageSrc={gallery2}
          overlayText={lang === 'en' ? 'Our Story in Pictures' : 'Наша история в фотографиях'}
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {GALLERY_IMAGES.map((img, i) => (
            <div
              key={i}
              className="card-lift rounded-2xl border overflow-hidden relative group"
              style={{ borderColor: '#1a1a1a', aspectRatio: '4/3' }}
            >
              <img
                src={img.src}
                alt={lang === 'en' ? img.labelEn : img.labelRu}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }}
              >
                <span className="text-sm font-black uppercase tracking-wider" style={{ color: '#FDE100' }}>
                  {lang === 'en' ? img.labelEn : img.labelRu}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-xs" style={{ color: '#333' }}>{t.consent}</p>
      </div>
    </section>
  );
}
