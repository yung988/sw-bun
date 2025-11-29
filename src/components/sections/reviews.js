export function renderReviews() {
  const reviews = [
    {
      name: 'Jana K.',
      text: 'Perfektní péče, krásné prostředí. Vřele doporučuji!',
      rating: 5
    },
    {
      name: 'Petra M.',
      text: 'Profesionální přístup a skvělé výsledky. Děkuji!',
      rating: 5
    },
    {
      name: 'Lucie S.',
      text: 'Nejlepší kosmetika v Praze. Vždy se těším na další návštěvu.',
      rating: 5
    }
  ]

  return `
    <section id="reviews" class="py-32 px-6 bg-[#FDFBF7]">
      <div class="container mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Reference</span>
          <h2 class="text-5xl font-cormorant mt-2">Co říkají naši klienti</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          ${reviews.map(review => `
            <div class="bg-white p-8 shadow-sm">
              <div class="flex gap-1 mb-4">
                ${Array(review.rating).fill('★').join('')}
              </div>
              <p class="text-stone-600 font-light font-geist mb-4">${review.text}</p>
              <p class="text-sm text-stone-400 font-geist">${review.name}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}
