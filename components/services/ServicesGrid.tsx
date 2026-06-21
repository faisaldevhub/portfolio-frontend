/**
 * ServicesGrid Component
 *
 * Layout component that renders ServiceCard children in a responsive grid.
 * Reusable on the /services page and homepage section.
 */

interface ServicesGridProps {
  children: React.ReactNode;
}

export default function ServicesGrid({ children }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {children}
    </div>
  );
}
