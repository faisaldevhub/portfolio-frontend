/**
 * FeaturedTestimonials Component
 *
 * Displays a "What Clients Say" section on the homepage.
 * Receives pre-resolved testimonial data as props and renders them
 * using the shared TestimonialCard and TestimonialsGrid components.
 * Includes a "View All Testimonials" CTA link.
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
    <section className="px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">What Clients Say</h2>
      <p className="text-gray-600 mb-10 max-w-2xl">
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

      <div className="mt-10 text-center">
        <Link
          href="/testimonials"
          className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          View All Testimonials
        </Link>
      </div>
    </section>
  );
}
