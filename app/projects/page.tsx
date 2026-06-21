/**
 * Projects Listing Page (/projects)
 */

import { getProjects, getMediaById } from "@/lib/wordpress";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectsGrid from "@/components/projects/ProjectsGrid";

export const metadata = {
  title: "Projects — Faisal Dev Hub",
  description:
    "Explore my portfolio of web development projects built with modern technologies.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

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
    <section className="section-spacing" style={{ paddingTop: 140 }}>
      <div className="container-main">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>
          Portfolio
        </p>
        <h1 className="heading-section mb-4">Projects</h1>
        <p className="text-body mb-14 max-w-xl">
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
          <p style={{ color: "var(--text-muted)" }}>No projects found.</p>
        )}
      </div>
    </section>
  );
}
