import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import Image from 'next/image'
import { Quote, Star } from 'lucide-react'

const testimonials = [
  {
    name: 'Karolína M.',
    service: 'Prodlužování vlasů',
    text: 'Úžasné místo! Služby byly perfektní a prostředí naprosto luxusní. Sabina je profesionálka, která ví, co dělá. Vrátím se určitě!',
    image: '/images/clients/client-1.png',
    rating: 5,
  },
  {
    name: 'Tereza K.',
    service: 'Endosphere',
    text: 'Nejlepší procedura, jakou jsem kdy měla. Po šesti ošetřeních vidím obrovský rozdíl. Doporučuji všem, kdo chtějí viditelné výsledky!',
    image: '/images/clients/client-2.png',
    rating: 5,
  },
  {
    name: 'Martina V.',
    service: 'HIFU',
    text: 'Děkuji! Měla jsem skvělý zážitek a výsledky jsou úžasné. Pleť mám pevnější a mladší bez nutnosti invazivních zákroků.',
    image: '/images/clients/client-3.png',
    rating: 5,
  },
]

export default function TestimonialsSection() {
  return (
    <Section className="relative bg-white luxury-spacing overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-20 blur-3xl z-0" style={{ backgroundColor: 'var(--accent)' }} />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-pink-200 opacity-20 blur-3xl z-0" />

      <Container>
        <div className="relative z-10">
          {/* Giant Heading */}
          <div className="mb-12 lg:mb-20">
            <h2 className="text-[6rem] sm:text-[8rem] lg:text-[10rem] xl:text-[12rem] font-serif font-light text-center opacity-10 leading-none select-none">
              REFERENCE
            </h2>
          </div>

          {/* Section Title */}
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-sm sm:text-base uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
              NAŠI KLIENTI
            </p>
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gray-800 mb-4">
              Co říkají naše klientky
            </h3>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-light">
              Přečtěte si zkušenosti našich spokojených klientek a přesvědčte se sami o kvalitě našich služeb
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Quote Icon */}
                <Quote className="w-10 h-10 mb-4 opacity-20" style={{ color: 'var(--accent)' }} />

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-current"
                      style={{ color: 'var(--accent)' }}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-gray-700 mb-6 italic leading-relaxed flex-grow text-sm sm:text-base">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-gray-200">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {testimonial.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 lg:mt-16 text-center">
            <a
              href="#kontakt"
              className="inline-block py-3 px-8 rounded-xl border-2 font-semibold transition-all duration-200 hover:bg-gray-50 text-sm sm:text-base uppercase tracking-wide"
              style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
            >
              ZOBRAZIT VÍCE REFERENCÍ
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
