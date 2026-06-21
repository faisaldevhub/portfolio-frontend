/**
 * FeaturedTestimonials Component
 *
 * Homepage testimonials section with premium dark styling.
 */

import Link from "next/link";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";

interface TestimonialData {
  id: number;
  quote: string;
  clientName: string;
  company: string;
  designation: string;
  rating: number;
  photoUrl: string | null;
  photoAlt: string | null;
  linkedinUrl: string;
}

interface FeaturedTestimonialsProps {
  testimonials: TestimonialData[];
}

export default function FeaturedTestimonials({
  testimonials,
}: FeaturedTestimonialsProps) {
  if (testimonials.length === 0) return null;

  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-main">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Client Feedback
        </p>
        <h2 className="heading-section mb-4">What Clients Say</h2>
        <p className="text-body mb-14 max-w-xl">
          Feedback from clients I have had the pleasure of working with.
        </p>

        <TestimonialsGrid>
          {testimonials.map((t) => (
            <TestimonialCard
              key={t.id}
              quote={t.quote}
              clientName={t.clientName}
              company={t.company}
              designation={t.designation}
              rating={t.rating}
              photoUrl={t.photoUrl}
              photoAlt={t.photoAlt}
              linkedinUrl={t.linkedinUrl}
            />
          ))}
        </TestimonialsGrid>

        <div className="mt-14 text-center">
          <Link href="/testimonials" className="btn-secondary">
            View All Testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
