export function renderFounder() {
  return `
    <section id="majitelka" class="py-32 px-6 bg-white">
      <div class="container mx-auto max-w-6xl">
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="aspect-[3/4] bg-stone-200 overflow-hidden">
            <img src="/images/founder.jpg" alt="Zakladatelka" class="w-full h-full object-cover">
          </div>

          <div>
            <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Zakladatelka</span>
            <h2 class="text-5xl font-cormorant mt-2 mb-6">O mně</h2>
            <p class="text-lg text-stone-600 font-light font-geist leading-relaxed mb-6">
              Jsem certifikovaná kosmetička s mnohaletou praxí. Mou vášní je pomáhat lidem cítit se dobře ve své kůži.
            </p>
            <p class="text-lg text-stone-600 font-light font-geist leading-relaxed">
              V SW Beauty kombinuji tradiční metody s nejnovějšími technologiemi pro dosažení nejlepších výsledků.
            </p>
          </div>
        </div>
      </div>
    </section>
  `
}
