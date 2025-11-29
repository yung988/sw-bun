export function renderNavbar() {
  return `
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200 transition-transform duration-300">
      <div class="container mx-auto px-6 py-4 flex items-center justify-between">
        <div class="text-2xl font-cormorant font-medium">SW Beauty</div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8 font-geist text-sm uppercase tracking-widest">
          <a href="#sluzby" class="text-stone-600 hover:text-stone-900 transition-colors">Služby</a>
          <a href="#filozofie" class="text-stone-600 hover:text-stone-900 transition-colors">O nás</a>
          <a href="#faq" class="text-stone-600 hover:text-stone-900 transition-colors">FAQ</a>
          <a href="#poukazy" class="text-stone-600 hover:text-stone-900 transition-colors">Poukazy</a>
          <button onclick="openBookingModal()" class="bg-stone-900 text-white px-6 py-2 hover:bg-stone-800 transition-colors">
            Rezervovat
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </nav>
  `
}
