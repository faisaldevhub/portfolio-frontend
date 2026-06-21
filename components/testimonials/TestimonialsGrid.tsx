/**
 * TestimonialsGrid Component
 *
 * Layout component that renders TestimonialCard children in a responsive grid.
 * Reusable on the /testimonials page and homepage section.
 */

interface TestimonialsGridProps {
  children: React.ReactNode;
}

export default function TestimonialsGrid({ children }: TestimonialsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}
