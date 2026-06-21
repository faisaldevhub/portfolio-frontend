/**
 * FeaturedProjects Component
 *
 * Displays a "Featured Projects" section on the homepage.
 * Receives pre-resolved project data as props and renders them
 * using the shared ProjectCard and ProjectsGrid components.
 * Includes a "View All Projects" CTA link.
 */

import Link from "next/link";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

interface ProjectData {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  imageAlt: string | null;
  clientName: string;
  techStack: string;
}

interface FeaturedProjectsProps {
  projects: ProjectData[];
}

export default function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) return null;

  return (
    <section className="px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
      <p className="text-gray-600 mb-10 max-w-2xl">
        A selection of recent projects built for clients and businesses.
      </p>

      <ProjectsGrid>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            slug={project.slug}
            title={project.title}
            excerpt={project.excerpt}
            imageUrl={project.imageUrl}
            imageAlt={project.imageAlt}
            clientName={project.clientName}
            techStack={project.techStack}
          />
        ))}
      </ProjectsGrid>

      <div className="mt-10 text-center">
        <Link
          href="/projects"
          className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          View All Projects
        </Link>
      </div>
    </section>
  );
}
