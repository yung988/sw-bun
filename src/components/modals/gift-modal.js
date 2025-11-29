export function renderGiftModal() {
  return `
    <div id="giftModal" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="modal-backdrop" onclick="closeGiftModal()"></div>

      <div class="relative bg-white w-full max-w-2xl max-h-[90vh] shadow-2xl overflow-hidden flex flex-col" onclick="event.stopPropagation()">
        <button onclick="closeGiftModal()" class="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>

        <div class="overflow-y-auto flex-1 p-8" data-lenis-prevent>
          <h2 class="text-4xl font-cormorant mb-6">Dárkový poukaz</h2>

          <form class="space-y-6">
            <div>
              <label class="block text-sm font-geist mb-2">Vaše jméno</label>
              <input type="text" class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist">
            </div>

            <div>
              <label class="block text-sm font-geist mb-2">Váš email</label>
              <input type="email" class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist">
            </div>

            <div>
              <label class="block text-sm font-geist mb-2">Jméno obdarovaného</label>
              <input type="text" class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist">
            </div>

            <div>
              <label class="block text-sm font-geist mb-2">Služba</label>
              <select class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist">
                <option>Vyberte službu</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-geist mb-2">Částka (Kč)</label>
              <input type="number" class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist">
            </div>

            <div>
              <label class="block text-sm font-geist mb-2">Věnování (volitelné)</label>
              <textarea rows="3" class="w-full px-4 py-3 border border-stone-300 focus:border-stone-900 focus:outline-none transition-colors font-geist"></textarea>
            </div>

            <button type="submit" class="w-full bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors font-geist text-sm uppercase tracking-widest">
              Objednat poukaz
            </button>
          </form>
        </div>
      </div>
    </div>
  `
}
