import Hero from '@/components/Hero'
import { getAvatars } from '@/lib/server/images'

export default async function HeroSection() {
  const avatars = await getAvatars(3)
  // Explicitly set hero_1.mp4 as the main hero video
  const videos = ['/movies/hero_1.mp4']
  return (
    <Hero
      title="Krása, která vám"
      titleItalic="sluší"
      subtitle="Profesionální kosmetika s moderními technologiemi v centru Hodonína."
      trustedText="Důvěřuje nám přes"
      trustedCount="500+ klientek"
      avatars={avatars}
      videos={videos}
    />
  )
}
