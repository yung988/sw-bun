import FadeIn from '@/components/animations/FadeIn'
import ScrollReveal from '@/components/animations/ScrollReveal'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { highlights } from '@/data/highlights'
import Carousel from './Carousel'
import HighlightCard from './HighlightCard'
import SectionTitle from './SectionTitle'

export default function WhyUsSection() {
  return (
    <Section id="why">
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle
            center={false}
            eyebrow="Proč přijít právě k nám"
            title={
              <>
                Co nás <em className="italic">odlišuje</em>
              </>
            }
            subtitle="Nejsme jen další kosmetický salon. Kombinujeme osobní přístup s nejmodernějšími technologiemi a péčí, která přináší viditelné výsledky."
          />
        </FadeIn>

        <ScrollReveal direction="up" duration={0.8}>
          <div className="mt-16">
            <Carousel auto autoSpeed={25}>
              {highlights.map((b, index) => (
                <HighlightCard key={b.t} icon={b.icon} title={b.t} description={b.d} index={index} />
              ))}
            </Carousel>
          </div>
        </ScrollReveal>
      </Container>
    </Section>
  )
}
