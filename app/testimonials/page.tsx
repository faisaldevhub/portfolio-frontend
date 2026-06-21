/**
 * Testimonials Listing Page (/testimonials)
 */

import { getTestimonials, getMediaById } from "@/lib/wordpress";
import TestimonialCard from "@/components/testimonials/TestimonialCard";
import TestimonialsGrid from "@/components/testimonials/TestimonialsGrid";

export const metadata = {
  title: "Testimonials — Faisal Dev Hub",
  description: "Read what clients say about working with me on their web development projects.",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

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
    <section className="section-spacing" style={{ paddingTop: 140 }}>
      <div className="container-main">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Client Feedback</p>
        <h1 className="heading-section mb-4">Testimonials</h1>
        <p className="text-body mb-14 max-w-xl">
          Kind words from clients I have worked with on various web development and design projects.
        </p>

        {testimonialsWithPhotos.length > 0 ? (
          <TestimonialsGrid>
            {testimonialsWithPhotos.map(({ testimonial, photoUrl, photoAlt }) => (
              <TestimonialCard key={testimonial.id} quote={testimonial.excerpt.rendered} clientName={testimonial.acf.client_name} company={testimonial.acf.company} designation={testimonial.acf.designation} rating={testimonial.acf.rating} photoUrl={photoUrl} photoAlt={photoAlt} linkedinUrl={testimonial.acf.linkedin_url} />
            ))}
          </TestimonialsGrid>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No testimonials found.</p>
        )}
      </div>
    </section>
  );
}
