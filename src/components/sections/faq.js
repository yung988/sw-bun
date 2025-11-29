export function renderFAQ() {
  const faqs = [
    {
      question: 'Jak dlouho trvá ošetření?',
      answer: 'Délka ošetření závisí na typu služby. Většina procedur trvá 60-90 minut.'
    },
    {
      question: 'Mohu si objednat dárkový poukaz?',
      answer: 'Ano, nabízíme dárkové poukazy na všechny naše služby. Poukaz lze objednat online.'
    },
    {
      question: 'Jak daleko dopředu si mohu rezervovat termín?',
      answer: 'Termíny je možné rezervovat až 3 měsíce dopředu.'
    }
  ]

  return `
    <section id="faq" class="py-32 px-6 bg-[#FDFBF7]">
      <div class="container mx-auto max-w-4xl">
        <div class="mb-12 text-center">
          <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Časté dotazy</span>
          <h2 class="text-5xl font-cormorant mt-2">FAQ</h2>
        </div>

        <div class="space-y-6">
          ${faqs.map((faq, index) => `
            <div class="border-b border-stone-200 pb-6">
              <h3 class="text-2xl font-cormorant mb-3">${faq.question}</h3>
              <p class="text-stone-600 font-light font-geist leading-relaxed">${faq.answer}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `
}
