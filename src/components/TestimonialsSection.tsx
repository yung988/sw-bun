import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'
import SectionTitle from './SectionTitle'
import Carousel from './Carousel'
import TestimonialCard from './TestimonialCard'
import RatingSummary from './RatingSummary'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <SectionTitle
          center={false}
          title={
            <>
              Co říkají naše <em className="italic">klientky</em>
            </>
          }
        />

        <div className="mt-12">
          <RatingSummary />
        </div>

        <div className="mt-16">
          <Carousel>
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.name} className="w-[340px] md:w-[380px] shrink-0">
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </Carousel>
        </div>
      </Container>
    </Section>
  )
}
