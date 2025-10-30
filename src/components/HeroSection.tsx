import Hero from '@/components/Hero'
import { getAvatars, getMoviesListServer } from '@/lib/server/images'

export default async function HeroSection() {
  const avatars = await getAvatars(3)
  const videos = await getMoviesListServer('movies')
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
