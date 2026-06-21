/**
 * Single Project Detail Page (/projects/[slug])
 *
 * Async Server Component that fetches a single project by slug,
 * resolves its featured image, and renders the full project detail view.
 * Returns 404 if no project matches the slug.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug, getMediaById } from "@/lib/wordpress";

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  // Strip HTML tags from excerpt for a clean meta description
  const description = project.excerpt.rendered
    .replace(/<[^>]*>/g, "")
    .trim();

  return {
    title: `${project.title.rendered} — Faisal Portfolio`,
    description,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Resolve featured image
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (project.featured_media > 0) {
    const media = await getMediaById(project.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  // Parse tech stack into individual tags
  const technologies = project.acf.tech_stack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article>
      {/* Hero Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt ?? project.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Client Name */}
          {project.acf.client_name && (
            <p className="text-sm text-gray-500 mb-2">
              {project.acf.client_name}
            </p>
          )}

          {/* Project Title */}
          <h1 className="text-4xl font-bold mb-4">
            {project.title.rendered}
          </h1>

          {/* Tech Stack Tags */}
          {technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Details */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 mb-12">
            {/* Live URL */}
            {project.acf.project_url && (
              <a
                href={project.acf.project_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
              >
                View Live Site ↗
              </a>
            )}

            {/* GitHub URL */}
            {project.acf.github_url && (
              <a
                href={project.acf.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-5 py-2 border border-gray-900 text-gray-900 rounded hover:bg-gray-100 transition-colors"
              >
                GitHub Repository ↗
              </a>
            )}
          </div>

          {/* Full WordPress Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: project.content.rendered }}
          />

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/projects"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Projects
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
