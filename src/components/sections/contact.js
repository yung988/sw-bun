export function renderContact() {
  return `
    <section id="kontakt" class="py-32 px-6 bg-[#FDFBF7]">
      <div class="container mx-auto max-w-4xl">
        <div class="mb-12 text-center">
          <span class="text-stone-400 uppercase tracking-widest text-xs font-geist">Kontakt</span>
          <h2 class="text-5xl font-cormorant mt-2">Napište nám</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <div>
            <h3 class="text-2xl font-cormorant mb-4">Kontaktní údaje</h3>
            <div class="space-y-3 text-stone-600 font-geist">
              <p>Email: info@swbeauty.cz</p>
              <p>Telefon: +420 XXX XXX XXX</p>
              <p>Adresa: Praha 1</p>
            </div>
          </div>

          <div>
            <h3 class="text-2xl font-cormorant mb-4">Otevírací doba</h3>
            <div class="space-y-2 text-stone-600 font-geist">
              <p>Po-Pá: 9:00 - 19:00</p>
              <p>So: 10:00 - 16:00</p>
              <p>Ne: Zavřeno</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <footer class="py-8 px-6 bg-stone-900 text-white">
      <div class="container mx-auto text-center">
        <p class="font-geist text-sm">© ${new Date().getFullYear()} SW Beauty. Všechna práva vyhrazena.</p>
      </div>
    </footer>
  `
}
