import FadeIn from '@/components/animations/FadeIn'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import { testimonials } from '@/data/testimonials'
import Carousel from './Carousel'
import RatingSummary from './RatingSummary'
import SectionTitle from './SectionTitle'
import TestimonialCard from './TestimonialCard'

export default function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <FadeIn y={20} duration={0.7}>
          <SectionTitle
            center={false}
            title={
              <>
                Co říkají naše <em className="italic">klientky</em>
              </>
            }
          />
        </FadeIn>

        <FadeIn y={16} duration={0.6}>
          <div className="mt-12">
            <RatingSummary />
          </div>
        </FadeIn>

        <FadeIn y={20} duration={0.8}>
          <div className="mt-16">
            <Carousel>
              {testimonials.map((testimonial, _index) => (
                <div key={testimonial.name} className="w-[340px] md:w-[380px] shrink-0">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </Carousel>
          </div>
        </FadeIn>
      </Container>
    </Section>
  )
}
