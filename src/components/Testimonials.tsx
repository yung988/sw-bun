'use client'

import { useState } from 'react'

type Testimonial = {
  name: string
  service: string
  rating: number
  text: string
  date: string
  age?: string
}

const testimonials: Testimonial[] = [
  {
    name: 'Jana K.',
    age: '42 let',
    service: 'HIFU Facelift',
    rating: 5,
    text: 'Úžasné výsledky! Po 2 měsících vidím obrovský rozdíl. Pokožka je pevnější, kontury obličeje výraznější. Sabina je profesionálka a salon je nádherný. Vřele doporučuji!',
    date: 'Září 2024',
  },
  {
    name: 'Petra M.',
    age: '35 let',
    service: 'Endos-roller',
    rating: 5,
    text: 'Po kuře 10 ošetření mám viditelně menší celulitidu a stehna jsou pevnější. Procedura je příjemná, téměř jako masáž. Konečně jsem našla něco, co opravdu funguje!',
    date: 'Srpen 2024',
  },
  {
    name: 'Martina S.',
    age: '29 let',
    service: 'Budování svalů EMS',
    rating: 5,
    text: 'Za 8 týdnů jsem zpevnila břicho a zadek bez posilovny. 30 minut 2x týdně a výsledky jsou patrné. Skvělá alternativa k cvičení pro zaneprázdněné maminky!',
    date: 'Říjen 2024',
  },
  {
    name: 'Lucie V.',
    age: '38 let',
    service: 'Kosmetické ošetření',
    rating: 5,
    text: 'Pravidelně docházím každý měsíc. Pleť je hydratovaná, bez akné a výrazně mladší. Sabina vždy doporučí to nejlepší pro můj typ pleti. Nejlepší kosmetička v Hodoníně!',
    date: 'Listopad 2024',
  },
  {
    name: 'Kateřina N.',
    age: '45 let',
    service: 'HIFU + Endos-roller',
    rating: 5,
    text: 'Kombinace HIFU na obličej a Endos-roller na tělo je perfektní! Za půl roku vypadám o 10 let mladší. Všichni se ptají, co jsem udělala. Děkuji SW Beauty!',
    date: 'Srpen 2024',
  },
  {
    name: 'Barbora H.',
    age: '31 let',
    service: 'Dárkový poukaz',
    rating: 5,
    text: 'Dostala jsem poukaz k narozeninám a je to nejlepší dárek! Využila jsem ho na HIFU a výsledek mě nadchl. Krásný salon, profesionální přístup, určitě se vrátím!',
    date: 'Září 2024',
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="bg-gradient-to-br from-slate-50 to-white py-20">
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-600 mb-2">Recenze</p>
          <h2 className="font-display text-4xl font-light text-slate-900 mb-4">
            Co říkají naše <em className="italic">klientky</em>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Přečtěte si zkušenosti skutečných klientek, které navštívily náš salon a vyzkoušely naše služby
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 md:p-12">
            {/* Stars */}
            <div className="flex gap-1 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <svg
                  key={i}
                  className="h-6 w-6 text-amber-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote */}
            <blockquote className="text-lg text-slate-700 leading-relaxed mb-6">
              "{current.text}"
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between border-t border-slate-200 pt-6">
              <div>
                <p className="font-medium text-slate-900">{current.name}</p>
                {current.age && <p className="text-sm text-slate-500">{current.age}</p>}
                <p className="text-sm text-slate-600 mt-1">{current.service}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500">{current.date}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              type="button"
              onClick={prevTestimonial}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
              aria-label="Předchozí recenze"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex ? 'w-8 bg-slate-900' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Přejít na recenzi ${index + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={nextTestimonial}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:border-slate-300"
              aria-label="Další recenze"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-light text-slate-900">500+</p>
              <p className="text-sm text-slate-600 mt-1">Spokojených klientek</p>
            </div>
            <div>
              <p className="text-3xl font-light text-slate-900">4.9/5</p>
              <p className="text-sm text-slate-600 mt-1">Průměrné hodnocení</p>
            </div>
            <div>
              <p className="text-3xl font-light text-slate-900">98%</p>
              <p className="text-sm text-slate-600 mt-1">Doporučí nás dál</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
