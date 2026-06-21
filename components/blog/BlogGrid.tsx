/**
 * BlogGrid Component
 *
 * Layout component that renders BlogCard children in a responsive grid.
 * Reusable on the /blog listing page.
 */

interface BlogGridProps {
  children: React.ReactNode;
}

export default function BlogGrid({ children }: BlogGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {children}
    </div>
  );
}
