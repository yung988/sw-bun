'use client';

export default function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <header className="relative w-full min-h-[100dvh] flex flex-col lg:flex-row pt-20 lg:pt-0 lg:items-center">
      <div className="max-w-screen-2xl mx-auto w-full flex flex-col lg:flex-row lg:items-center h-full">
        {/* Text Content */}
        <div className="w-full lg:w-5/12 flex flex-col justify-center px-6 md:px-16 lg:px-12 py-6 lg:py-0 order-2 lg:order-1">
          <h1 className="text-4xl md:text-6xl xl:text-7xl leading-[1.1] font-medium text-stone-900 tracking-tighter font-cormorant mb-6 lg:mb-8">
            Místo kde se vnější a vnitřní krása propojí
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button onClick={onOpenBooking} className="min-w-[160px] lg:min-w-[180px] text-center bg-stone-900 text-white px-6 lg:px-8 py-3.5 lg:py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-xs lg:text-sm tracking-widest uppercase">
              Rezervovat termín
            </button>
            <a href="#sluzby" className="min-w-[160px] lg:min-w-[180px] text-center border border-stone-300 text-stone-900 px-6 lg:px-8 py-3.5 lg:py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-xs lg:text-sm tracking-widest uppercase">
              Prohlédnout služby
            </a>
          </div>
        </div>

        {/* Video Content */}
        <div className="w-full lg:w-7/12 flex-1 lg:flex-none relative order-1 lg:order-2 flex items-center justify-center lg:py-32 lg:pr-16 px-6 lg:px-0">
          <div className="w-full max-w-[200px] sm:max-w-[240px] lg:max-w-md aspect-[2/3] lg:shadow-2xl overflow-hidden">
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