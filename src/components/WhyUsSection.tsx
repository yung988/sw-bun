import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import HighlightCard from './HighlightCard'
import { highlights } from '@/data/highlights'

export default function WhyUsSection() {
  return (
    <Section id="why">
      <Container>
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

        <div className="mt-16">
          <Carousel auto autoSpeed={25}>
            {highlights.map((b, index) => (
              <HighlightCard key={b.t} icon={b.icon} title={b.t} description={b.d} index={index} />
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
