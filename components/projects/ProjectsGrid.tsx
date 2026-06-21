/**
 * ProjectsGrid Component
 *
 * Layout component that renders ProjectCard children in a responsive grid.
 * Reusable on the /projects listing page and homepage preview section.
 */

interface ProjectsGridProps {
  children: React.ReactNode;
}

export default function ProjectsGrid({ children }: ProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}
