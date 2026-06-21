/**
 * Single Project Detail Page (/projects/[slug])
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getMediaById } from "@/lib/wordpress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  const description = project.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  return { title: `${project.title.rendered} — Faisal Dev Hub`, description };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  let imageUrl: string | null = null;
  let imageAlt: string | null = null;
  if (project.featured_media > 0) {
    const media = await getMediaById(project.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  const technologies = project.acf.tech_stack.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <article>
      {/* Hero */}
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-4xl">
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
              <Image src={imageUrl} alt={imageAlt ?? project.title.rendered} fill className="object-cover" priority />
            </div>
          )}
          {project.acf.client_name && (
            <p className="text-sm font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>{project.acf.client_name}</p>
          )}
          <h1 className="heading-section mb-6">{project.title.rendered}</h1>
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-main max-w-4xl">
          <div className="flex flex-wrap gap-4 mb-12">
            {project.acf.project_url && (
              <a href={project.acf.project_url} target="_blank" rel="noopener noreferrer" className="btn-primary">View Live Site ↗</a>
            )}
            {project.acf.github_url && (
              <a href={project.acf.github_url} target="_blank" rel="noopener noreferrer" className="btn-secondary">GitHub Repository ↗</a>
            )}
          </div>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: project.content.rendered }} />
          <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border-default)" }}>
            <Link href="/projects" className="text-sm font-medium transition-colors duration-200" style={{ color: "var(--text-muted)" }}>← Back to Projects</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
