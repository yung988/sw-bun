import FAQ from '@/components/FAQ'
import SectionTitle from '@/components/SectionTitle'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { faqs } from '@/data/faq'

// Zobrazit pouze nejdůležitější FAQ - celkem 6 (3+3)
const faqsLeft = faqs.slice(0, 3)
const faqsRight = faqs.slice(3, 6)

export default function FAQSection() {
  return (
    <Section id="faq">
      <Container>
        <SectionTitle
          center={false}
          title={
            <>
              Máte <em className="italic">dotaz?</em>
            </>
          }
          subtitle="Připravili jsme odpovědi na nejčastější otázky."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <FAQ items={faqsLeft} />
          <FAQ items={faqsRight} />
        </div>
      </Container>
    </Section>
  )
}

