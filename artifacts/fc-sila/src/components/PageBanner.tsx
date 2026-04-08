interface PageBannerProps {
  imageSrc: string;
  overlayText?: string;
  height?: number;
}

export default function PageBanner({ imageSrc, overlayText, height = 200 }: PageBannerProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-12" style={{ height: `${height}px` }}>
      <img src={imageSrc} alt="" className="w-full h-full object-cover" style={{ opacity: 0.45 }} />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%)' }}
      />
      {overlayText && (
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p
            className="text-xl md:text-2xl font-black uppercase tracking-widest text-center"
            style={{ color: '#FDE100', textShadow: '0 2px 20px rgba(0,0,0,0.9)' }}
          >
            {overlayText}
          </p>
        </div>
      )}
    </div>
  );
}
