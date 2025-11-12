import FadeIn from '@/components/animations/FadeIn'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { highlights } from '@/data/highlights'
import HighlightCard from './HighlightCard'
import HorizontalScrollCarousel from './HorizontalScrollCarousel'
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

        <div className="mt-16">
          <HorizontalScrollCarousel>
            {highlights.map((b, index) => (
              <HighlightCard key={b.t} icon={b.icon} title={b.t} description={b.d} index={index} />
            ))}
          </HorizontalScrollCarousel>
        </div>
      </Container>
    </Section>
  )
}
