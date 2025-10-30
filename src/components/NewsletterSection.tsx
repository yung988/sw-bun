import SubscribeForm from '@/components/SubscribeForm'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import FadeIn from '@/components/animations/FadeIn'

export default function NewsletterSection() {
  return (
    <Section>
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SubscribeForm />
        </FadeIn>
      </Container>
    </Section>
  )
}
