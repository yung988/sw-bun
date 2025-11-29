export function renderVouchers() {
  return `
    <section id="poukazy" class="py-32 px-6 bg-white">
      <div class="container mx-auto max-w-4xl text-center">
        <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Dárkové poukazy</span>
        <h2 class="text-5xl font-cormorant mt-2 mb-6">Potěšte své blízké</h2>
        <p class="text-xl text-stone-600 font-light font-geist mb-12 max-w-2xl mx-auto">
          Dárkové poukazy na kosmetické služby jsou perfektním dárkem pro každou příležitost.
        </p>

        <button onclick="openGiftModal()" class="bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors font-geist text-sm uppercase tracking-widest">
          Objednat poukaz
        </button>
      </div>
    </section>
  `
}
