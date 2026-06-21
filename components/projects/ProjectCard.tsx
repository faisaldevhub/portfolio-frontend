/**
 * ProjectCard Component
 *
 * Presentational card component for displaying a single project.
 * Receives pre-resolved data as props — no data fetching here.
 * Designed for reuse on both the /projects listing and the homepage preview.
 */

import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string | null;
  imageAlt: string | null;
  clientName: string;
  techStack: string;
}

export default function ProjectCard({
  slug,
  title,
  excerpt,
  imageUrl,
  imageAlt,
  clientName,
  techStack,
}: ProjectCardProps) {
  // Split comma-separated tech stack into individual tags
  const technologies = techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {imageUrl && (
        <div className="relative w-full h-52">
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Card Body */}
      <div className="p-5">
        {/* Client Name */}
        {clientName && (
          <p className="text-sm text-gray-500 mb-1">{clientName}</p>
        )}

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        {/* Excerpt */}
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Tech Stack Tags */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* View Project Link */}
        <Link
          href={`/projects/${slug}`}
          className="inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          View Project
        </Link>
      </div>
    </article>
  );
}
