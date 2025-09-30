import type { Service } from '@/types'

export const services: Service[] = [
  {
    image: '/images/service-hifu.jpg',
    price: 5500,
    title: 'HIFU Facelift',
    category: 'Omlazení',
    href: '/sluzby/hifu-facelift',
  },
  {
    image: '/images/service-endosphere.jpg',
    price: 1900,
    title: 'Endos-roller celé tělo',
    category: 'Formování',
    href: '/sluzby/endos-roller',
  },
  {
    image: '/images/ems.png',
    price: 1300,
    title: 'Budování svalů EMS',
    category: 'Fitness',
    href: '/sluzby/ems-budovani-svalu',
  },
  {
    image: '/images/cosmetic.png',
    price: 1550,
    title: 'Hydrafacial',
    category: 'Kosmetika',
    href: '/sluzby/kosmetika',
  },
  { image: '/images/cavitace.png', price: 1100, title: 'Kavitace', category: 'Zeštíhlení', href: '/sluzby/kavitace' },
  { image: '/images/service-hair.jpg', price: 26, title: 'Prodlužování vlasů', category: 'Vlasy', href: '/cenik' },
]
