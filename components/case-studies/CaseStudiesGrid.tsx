/**
 * CaseStudiesGrid Component
 *
 * Layout component that renders CaseStudyCard children in a responsive grid.
 */

interface CaseStudiesGridProps {
  children: React.ReactNode;
}

export default function CaseStudiesGrid({ children }: CaseStudiesGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}
