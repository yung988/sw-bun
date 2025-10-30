// Images Manifest - Mapování fotek pro všechny kategorie služeb
export type CategoryImageSet = {
  hero: string // Hlavní hero obrázek pro kategorii
  subhero: string[] // Sekundární hero obrázky (min 2-3)
  mosaic: string[] // Obrázky pro mozaiku/galerii (min 6)
  cover: string // Large cover image pro horizontální scroll
  thumbnail: string // Malý náhled
}

export type ImagesManifest = {
  categories: Record<string, CategoryImageSet>
  general: {
    hero: string[]
    salon: string[]
    team: string[]
  }
}

export const imagesManifest: ImagesManifest = {
  categories: {
    // KOSMETIKA
    kosmetika: {
      hero: '/images/kosmetika/hydratational-1.jpg',
      subhero: [
        '/images/kosmetika/hydratational-2.jpg',
        '/images/kosmetika/hydratational-3.jpg',
        '/images/kosmetika/hydratational-4.jpg',
      ],
      mosaic: [
        '/images/kosmetika/hydratational-5.jpg',
        '/images/kosmetika/hydratational-6.jpg',
        '/images/kosmetika/hydratational-7.jpg',
        '/images/kosmetika/rasy8.jpg',
        '/images/kosmetika/rasy9.jpg',
        '/images/kosmetika/rasy10.jpg',
        '/images/kosmetika/skin-calming-with-propolis4.jpg',
        '/images/kosmetika/skin-calming-with-propolis5.jpg',
        '/images/kosmetika/problematic-skin4.jpg',
        '/images/kosmetika/problematic-skin5.jpg',
      ],
      cover: '/images/kosmetika/hydratational-1.jpg',
      thumbnail: '/images/service-cosmetic.jpg',
    },

    // HIFU FACELIFT
    hifu: {
      hero: '/images/hifu/hifu-1.jpg',
      subhero: ['/images/hifu/hifu-oblicej.jpeg', '/images/hifu/hifu-oblicej2.jpeg', '/images/hifu/hifu-2.jpeg'],
      mosaic: [
        '/images/hifu/hifu-3.jpeg',
        '/images/hifu/hifu-4.jpeg',
        '/images/hifu/hifu-1.jpg',
        '/images/hifu/hifu-oblicej.jpeg',
        '/images/hifu/hifu-oblicej2.jpeg',
        '/images/hifu/hifu-2.jpeg',
      ],
      cover: '/images/hifu/hifu-1.jpg',
      thumbnail: '/images/service-hifu.jpg',
    },

    // BUDOVÁNÍ SVALŮ (EMS)
    'budovani-svalu': {
      hero: '/images/ems/budovani-svalu-1.jpeg',
      subhero: [
        '/images/ems/budovani-svalu-2.png',
        '/images/ems/budovani-svalu-3.png',
        '/images/ems/budovani-svalu-4.png',
      ],
      mosaic: [
        '/images/ems/budovani-svalu-1.jpeg',
        '/images/ems/budovani-svalu-2.png',
        '/images/ems/budovani-svalu-3.png',
        '/images/ems/budovani-svalu-4.png',
        '/images/ems/budovani-svalu-1.jpeg',
        '/images/ems/budovani-svalu-2.png',
      ],
      cover: '/images/ems/budovani-svalu-1.jpeg',
      thumbnail: '/images/ems/budovani-svalu-1.jpeg',
    },

    // ENDOSPHERE ROLLER
    endosphere: {
      hero: '/images/stylizované/details-1.jpeg',
      subhero: [
        '/images/stylizované/details-1.jpeg',
        '/images/stylizované/details-2.jpg',
        '/images/stylizované/details-3.jpeg',
      ],
      mosaic: [
        '/images/stylizované/details-1.jpeg',
        '/images/stylizované/details-2.jpg',
        '/images/stylizované/details-3.jpeg',
        '/images/stylizované/details-4.jpeg',
        '/images/stylizované/details-5.jpeg',
        '/images/stylizované/details-6.jpeg',
      ],
      cover: '/images/stylizované/details-1.jpeg',
      thumbnail: '/images/stylizované/details-1.jpeg',
    },

    // KAVITACE
    kavitace: {
      hero: '/images/kavitace/kavitace-1.jpeg',
      subhero: [
        '/images/kavitace/kavitace-1.jpeg',
        '/images/kavitace/kavitace-2.jpeg',
        '/images/stylizované/details-8.jpeg',
      ],
      mosaic: [
        '/images/kavitace/kavitace-1.jpeg',
        '/images/kavitace/kavitace-2.jpeg',
        '/images/stylizované/details-9.jpeg',
        '/images/stylizované/details-10.jpeg',
        '/images/stylizované/details-11.jpeg',
        '/images/stylizované/details-1.jpeg',
      ],
      cover: '/images/kavitace/kavitace-1.jpeg',
      thumbnail: '/images/kavitace/kavitace-1.jpeg',
    },

    // RADIOFREKVENCE
    radiofrekvence: {
      hero: '/images/radiofrekvence/radiofrekvence.jpeg',
      subhero: [
        '/images/radiofrekvence/radiofrekvence.jpeg',
        '/images/stylizované/details-3.jpeg',
        '/images/stylizované/details-4.jpeg',
      ],
      mosaic: [
        '/images/radiofrekvence/radiofrekvence.jpeg',
        '/images/stylizované/details-5.jpeg',
        '/images/stylizované/details-6.jpeg',
        '/images/stylizované/details-7.jpeg',
        '/images/stylizované/details-8.jpeg',
        '/images/stylizované/details-9.jpeg',
      ],
      cover: '/images/radiofrekvence/radiofrekvence.jpeg',
      thumbnail: '/images/stylizované/details-1.jpeg',
    },

    // HYDRAFACIAL (použijeme kosmetické fotky)
    hydrafacial: {
      hero: '/images/kosmetika/hydratational-10.jpg',
      subhero: [
        '/images/kosmetika/hydratational-11.jpg',
        '/images/kosmetika/hydratational-12.jpg',
        '/images/kosmetika/hydratational-13.jpg',
      ],
      mosaic: [
        '/images/kosmetika/hydratational-14.jpg',
        '/images/kosmetika/hydratational-15.jpg',
        '/images/kosmetika/hydratational-16.jpg',
        '/images/kosmetika/hydratational-17.jpg',
        '/images/kosmetika/hydratational-18.jpg',
        '/images/kosmetika/hydratational-10.jpg',
      ],
      cover: '/images/kosmetika/hydratational-10.jpg',
      thumbnail: '/images/service-cosmetic.jpg',
    },

    // OSTATNÍ SLUŽBY
    'ostatni-sluzby': {
      hero: '/images/stylizované/details-1.jpeg',
      subhero: [
        '/images/stylizované/details-1.jpeg',
        '/images/stylizované/details-2.jpg',
        '/images/stylizované/details-3.jpeg',
      ],
      mosaic: [
        '/images/stylizované/details-1.jpeg',
        '/images/stylizované/details-2.jpg',
        '/images/stylizované/details-3.jpeg',
        '/images/stylizované/details-4.jpeg',
        '/images/stylizované/details-5.jpeg',
        '/images/stylizované/details-6.jpeg',
      ],
      cover: '/images/stylizované/details-1.jpeg',
      thumbnail: '/images/stylizované/details-1.jpeg',
    },

    // LPG (použijeme stylizované fotky)
    lpg: {
      hero: '/images/stylizované/details-1.jpeg',
      subhero: [
        '/images/stylizované/details-2.jpg',
        '/images/stylizované/details-3.jpeg',
        '/images/stylizované/details-4.jpeg',
      ],
      mosaic: [
        '/images/stylizované/details-5.jpeg',
        '/images/stylizované/details-6.jpeg',
        '/images/stylizované/details-7.jpeg',
        '/images/stylizované/details-8.jpeg',
        '/images/stylizované/details-9.jpeg',
        '/images/stylizované/details-10.jpeg',
      ],
      cover: '/images/stylizované/details-1.jpeg',
      thumbnail: '/images/service-ostatni.jpg',
    },

    // LYMFODRENÁŽ
    lymfodrenaz: {
      hero: '/images/stylizované/details-11.jpeg',
      subhero: [
        '/images/stylizované/details-10.jpeg',
        '/images/stylizované/details-9.jpeg',
        '/images/stylizované/details-8.jpeg',
      ],
      mosaic: [
        '/images/stylizované/details-7.jpeg',
        '/images/stylizované/details-6.jpeg',
        '/images/stylizované/details-5.jpeg',
        '/images/stylizované/details-4.jpeg',
        '/images/stylizované/details-3.jpeg',
        '/images/stylizované/details-2.jpg',
      ],
      cover: '/images/stylizované/details-11.jpeg',
      thumbnail: '/images/service-ostatni.jpg',
    },
  },

  // Obecné obrázky
  general: {
    hero: ['/images/salon/salon-main.jpeg', '/images/salon/recepce.jpg', '/images/salon/cekarna.jpg'],
    salon: [
      '/images/salon/salon-main.jpeg',
      '/images/salon/recepce.jpg',
      '/images/salon/cekarna.jpg',
      '/images/salon/cekarnaDetail.jpg',
      '/images/salon/stul_detail.jpg',
      '/images/salon/kreslomistnostnaprocedury.jpg',
    ],
    team: ['/images/team/sabina-main.jpeg', '/images/team/sabina.jpg', '/images/team/Enhanced Sabina.png'],
  },
}

// Helper funkce pro získání obrázků
export function getCategoryImages(categoryId: string): CategoryImageSet | null {
  return imagesManifest.categories[categoryId] || null
}

export function getCategoryHero(categoryId: string): string {
  const images = getCategoryImages(categoryId)
  return images?.hero || imagesManifest.general.hero[0]
}

export function getCategoryCover(categoryId: string): string {
  const images = getCategoryImages(categoryId)
  return images?.cover || images?.hero || imagesManifest.general.hero[0]
}

export function getCategoryMosaic(categoryId: string): string[] {
  const images = getCategoryImages(categoryId)
  return images?.mosaic || images?.subhero || [images?.hero || imagesManifest.general.hero[0]]
}
