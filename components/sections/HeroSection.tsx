'use client';

export default function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <header
      className="relative w-full flex flex-col pt-16 lg:pt-0 lg:flex-row lg:items-center overflow-hidden"
      style={{ minHeight: '100svh', paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      {/* Mobile Layout */}
      <div className="flex flex-col w-full h-full flex-1 lg:hidden">
        {/* Video Content - Mobile */}
        <div className="w-full px-6 pt-2">
          <video
            src="https://omf77i7evqckneoq.public.blob.vercel-storage.com/hero_1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-auto opacity-90 animate-fade-in-up"
          />
        </div>

        {/* Text Content - Mobile */}
        <div className="w-full flex flex-col px-6 py-8">
          <h1 className="text-left text-[2.5rem] leading-[1.05] font-medium text-stone-900 tracking-tighter font-cormorant mb-6">
            Místo, kde se vnější krása spojí s vnitřní.
          </h1>

          <div className="flex flex-col w-full gap-3">
            <button onClick={onOpenBooking} className="w-full text-center bg-stone-900 text-white px-6 py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-xs tracking-widest uppercase">
              Rezervovat termín
            </button>
            <a href="#sluzby" className="w-full text-center border border-stone-300 text-stone-900 px-6 py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-xs tracking-widest uppercase">
              Prohlédnout služby
            </a>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex max-w-screen-2xl mx-auto w-full h-full flex-row items-center flex-1">
        {/* Text Content - Desktop */}
        <div className="w-5/12 flex flex-col justify-center px-12">
          <h1 className="text-left text-6xl xl:text-7xl leading-[1.1] font-medium text-stone-900 tracking-tighter font-cormorant mb-8">
            Místo, kde se vnější krása spojí s vnitřní.
          </h1>

          <div className="flex flex-row gap-4">
            <button onClick={onOpenBooking} className="min-w-[180px] text-center bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-sm tracking-widest uppercase">
              Rezervovat termín
            </button>
            <a href="#sluzby" className="min-w-[180px] text-center border border-stone-300 text-stone-900 px-8 py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-sm tracking-widest uppercase">
              Prohlédnout služby
            </a>
          </div>
        </div>

        {/* Video Content - Desktop */}
        <div className="w-7/12 flex items-center justify-center py-32 pr-16">
          <div className="max-w-md aspect-[2/3] shadow-2xl overflow-hidden">
            <video
              src="https://omf77i7evqckneoq.public.blob.vercel-storage.com/hero_1.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover object-center opacity-90 animate-fade-in-up"
            />
          </div>
        </div>
      </div>
    </header>
  );
}