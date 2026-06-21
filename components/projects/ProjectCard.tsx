/**
 * ProjectCard Component
 *
 * Premium dark card with image zoom on hover, tech tags, and accent button.
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
  const technologies = techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="card overflow-hidden flex flex-col">
      {/* Featured Image with hover zoom */}
      {imageUrl && (
        <div className="img-zoom">
          <div className="relative w-full h-56">
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Client Name */}
        {clientName && (
          <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
            {clientName}
          </p>
        )}

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>

        {/* Excerpt */}
        <div
          className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
          style={{ color: "var(--text-secondary)" }}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Tech Stack Tags */}
        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {technologies.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/projects/${slug}`}
          className="btn-primary w-full text-center"
          style={{ padding: "10px 20px", fontSize: 14 }}
        >
          View Project
        </Link>
      </div>
    </article>
  );
}
