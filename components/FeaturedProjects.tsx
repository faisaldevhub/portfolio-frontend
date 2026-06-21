/**
 * FeaturedProjects Component
 *
 * Homepage featured projects section with premium dark styling.
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
    <section className="section-spacing">
      <div className="container-main">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Portfolio
        </p>
        <h2 className="heading-section mb-4">Featured Projects</h2>
        <p className="text-body mb-14 max-w-xl">
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

        <div className="mt-14 text-center">
          <Link href="/projects" className="btn-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
