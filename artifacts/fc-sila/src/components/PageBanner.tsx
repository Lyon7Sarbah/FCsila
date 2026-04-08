interface PageBannerProps {
  imageSrc: string;
  overlayText?: string;
  height?: number;
}

export default function PageBanner({ imageSrc, overlayText, height = 220 }: PageBannerProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden mb-12"
      style={{ height: `${height}px` }}
    >
      <img
        src={imageSrc}
        alt=""
        className="w-full h-full object-cover"
        style={{ opacity: 0.4 }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.2) 100%)',
        }}
      />
      {overlayText && (
        <div className="absolute inset-0 flex items-center px-8 md:px-12">
          <div>
            <div
              className="w-10 h-1 mb-3 rounded-full"
              style={{ background: '#FDE100' }}
            />
            <p
              className="text-xl md:text-2xl font-black uppercase tracking-widest"
              style={{ color: '#FDE100', textShadow: '0 2px 20px rgba(0,0,0,0.9)', maxWidth: '600px' }}
            >
              {overlayText}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
