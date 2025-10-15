import Hero from '@/components/Hero'

export default function HeroSection() {
  return (
    <Hero
      title="Krása, která vám"
      titleItalic="sluší"
      subtitle="Profesionální kosmetika s moderními technologiemi v centru Hodonína."
      trustedText="Důvěřuje nám přes"
      trustedCount="500+ klientek"
      avatars={['/images/service-hifu.jpg', '/images/service-endosphere.jpg', '/images/service-hair.jpg']}
    />
  )
}
