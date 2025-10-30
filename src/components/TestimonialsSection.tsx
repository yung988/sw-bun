import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import TestimonialCard from './TestimonialCard'
import RatingSummary from './RatingSummary'
import { testimonials } from '@/data/testimonials'
import FadeIn from '@/components/animations/FadeIn'

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
              {testimonials.map((testimonial, index) => (
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
