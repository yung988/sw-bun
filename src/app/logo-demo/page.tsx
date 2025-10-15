import AnimatedLogo from '@/components/AnimatedLogo'

export default function LogoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-8">
      <div className="max-w-4xl mx-auto text-center space-y-12">
        <h1 className="text-4xl md:text-6xl font-light text-slate-900 mb-8">SW Beauty Logo Animations</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sequential Animation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Sekvenční animace</h2>
            <p className="text-slate-600 mb-6">Postupné vykreslování jednotlivých částí loga</p>
            <div className="flex justify-center">
              <AnimatedLogo animationType="sequential" duration={2} className="w-64 h-auto" />
            </div>
          </div>

          {/* Center Out Animation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Zprostředka ven</h2>
            <p className="text-slate-600 mb-6">Animace začíná uprostřed každé cesty</p>
            <div className="flex justify-center">
              <AnimatedLogo animationType="centerOut" duration={2.5} className="w-64 h-auto" />
            </div>
          </div>

          {/* Wave Animation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Vlnová animace</h2>
            <p className="text-slate-600 mb-6">Rychlá animace s bounce efektem</p>
            <div className="flex justify-center">
              <AnimatedLogo animationType="wave" duration={1.5} className="w-64 h-auto" />
            </div>
          </div>

          {/* Morph Animation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Barevné morphing</h2>
            <p className="text-slate-600 mb-6">Animace s barevnou změnou</p>
            <div className="flex justify-center">
              <AnimatedLogo animationType="morph" duration={2} className="w-64 h-auto" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200 mt-12">
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">Jak to funguje</h2>
          <div className="text-left space-y-4 text-slate-600">
            <p>
              <strong>DrawSVGPlugin</strong> animuje SVG cesty pomocí CSS vlastností
              <code className="bg-slate-100 px-2 py-1 rounded text-sm">stroke-dashoffset</code> a
              <code className="bg-slate-100 px-2 py-1 rounded text-sm">stroke-dasharray</code>.
            </p>
            <p>
              Každá cesta v logu je převedena z <code className="bg-slate-100 px-2 py-1 rounded text-sm">fill</code>
              na <code className="bg-slate-100 px-2 py-1 rounded text-sm">stroke</code> pro možnost animace.
            </p>
            <p>Animace se spouští automaticky při načtení komponenty a používá GSAP pro plynulé přechody.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
