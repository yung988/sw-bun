'use client';

export default function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <header className="relative w-full h-[100dvh] flex flex-col lg:flex-row pt-24 lg:pt-0 lg:items-center overflow-hidden">
      <div className="max-w-screen-2xl mx-auto w-full h-full flex flex-col lg:flex-row lg:items-center">
        {/* Video Content - on mobile takes remaining space */}
        <div className="w-full lg:w-7/12 flex-1 lg:flex-none relative order-1 lg:order-2 flex items-center justify-center lg:py-32 lg:pr-16 px-6 lg:px-0">
          <div className="w-full lg:max-w-md aspect-[2/3] lg:shadow-2xl overflow-hidden">
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

        {/* Text Content - fixed height on mobile */}
        <div className="w-full lg:w-5/12 flex flex-col justify-end lg:justify-center px-6 md:px-16 lg:px-12 pb-8 lg:py-0 order-2 lg:order-1">
          <h1 className="w-full text-center lg:text-left text-4xl md:text-6xl xl:text-7xl leading-[1.1] font-medium text-stone-900 tracking-tighter font-cormorant mb-5 lg:mb-8">
            Místo kde se vnější a vnitřní krása propojí.
          </h1>

          <div className="flex flex-col sm:flex-row gap-3 lg:gap-4">
            <button onClick={onOpenBooking} className="w-full sm:w-auto min-w-[160px] lg:min-w-[180px] text-center bg-stone-900 text-white px-6 lg:px-8 py-3.5 lg:py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-xs lg:text-sm tracking-widest uppercase">
              Rezervovat termín
            </button>
            <a href="#sluzby" className="w-full sm:w-auto min-w-[160px] lg:min-w-[180px] text-center border border-stone-300 text-stone-900 px-6 lg:px-8 py-3.5 lg:py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-xs lg:text-sm tracking-widest uppercase">
              Prohlédnout služby
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}