export function renderHero() {
  return `
    <section id="hero" class="relative min-h-screen flex items-center justify-center bg-[#FDFBF7] pt-20">
      <div class="container mx-auto px-6 text-center">
        <h1 class="text-6xl md:text-8xl font-cormorant font-light mb-6">
          SW Beauty
        </h1>
        <p class="text-xl md:text-2xl text-stone-600 font-light font-geist mb-12 max-w-2xl mx-auto">
          Luxusní kosmetické služby pro vaši krásu a pohodu
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button onclick="openBookingModal()" class="bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors font-geist text-sm uppercase tracking-widest">
            Rezervovat termín
          </button>
          <button onclick="openPriceList()" class="border border-stone-300 text-stone-900 px-8 py-4 hover:border-stone-900 transition-colors font-geist text-sm uppercase tracking-widest">
            Zobrazit ceník
          </button>
        </div>
      </div>
    </section>
  `
}
