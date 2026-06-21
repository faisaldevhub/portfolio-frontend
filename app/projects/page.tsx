/**
 * Projects Listing Page (/projects)
 *
 * Async Server Component that fetches all projects from WordPress,
 * resolves their featured images, and renders them in a card grid.
 */

import { getProjects, getMediaById } from "@/lib/wordpress";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = {
  title: "Projects — Faisal Portfolio",
  description:
    "Explore my portfolio of web development projects built with modern technologies.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  // Resolve featured images for all projects in parallel
  const projectsWithImages = await Promise.all(
    projects.map(async (project) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;

      if (project.featured_media > 0) {
        const media = await getMediaById(project.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }

      return { project, imageUrl, imageAlt };
    })
  );

  return (
    <section className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Projects</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        A selection of projects I have worked on, showcasing web development,
        design, and headless CMS solutions.
      </p>

      {projectsWithImages.length > 0 ? (
        <ProjectsGrid>
          {projectsWithImages.map(({ project, imageUrl, imageAlt }) => (
            <ProjectCard
              key={project.id}
              slug={project.slug}
              title={project.title.rendered}
              excerpt={project.excerpt.rendered}
              imageUrl={imageUrl}
              imageAlt={imageAlt}
              clientName={project.acf.client_name}
              techStack={project.acf.tech_stack}
            />
          ))}
        </ProjectsGrid>
      ) : (
        <p className="text-gray-600">No projects found.</p>
      )}
    </section>
  );
}
