/**
 * Testimonials Listing Page (/testimonials)
 *
 * Async Server Component that fetches all testimonials from WordPress,
 * resolves their client photos, and renders them in a card grid.
 */

import { getTestimonials, getMediaById } from "@/lib/wordpress";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";

export const metadata = {
  title: "Testimonials — Faisal Portfolio",
  description:
    "Read what clients say about working with me on their web development projects.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  // Resolve client photos in parallel
  const testimonialsWithPhotos = await Promise.all(
    testimonials.map(async (t) => {
      let photoUrl: string | null = null;
      let photoAlt: string | null = null;

      if (t.featured_media > 0) {
        const media = await getMediaById(t.featured_media);
        photoUrl = media.source_url;
        photoAlt = media.alt_text;
      }

      return { testimonial: t, photoUrl, photoAlt };
    })
  );

  return (
    <section className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Testimonials</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Kind words from clients I have worked with on various web development
        and design projects.
      </p>

      {testimonialsWithPhotos.length > 0 ? (
        <TestimonialsGrid>
          {testimonialsWithPhotos.map(({ testimonial, photoUrl, photoAlt }) => (
            <TestimonialCard
              key={testimonial.id}
              quote={testimonial.excerpt.rendered}
              clientName={testimonial.acf.client_name}
              company={testimonial.acf.company}
              designation={testimonial.acf.designation}
              rating={testimonial.acf.rating}
              photoUrl={photoUrl}
              photoAlt={photoAlt}
              linkedinUrl={testimonial.acf.linkedin_url}
            />
          ))}
        </TestimonialsGrid>
      ) : (
        <p className="text-gray-600">No testimonials found.</p>
      )}
    </section>
  );
}
