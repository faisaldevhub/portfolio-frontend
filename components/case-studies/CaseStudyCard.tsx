/**
 * CaseStudyCard Component
 *
 * Premium dark card for case study summaries.
 * Should feel more important than project cards.
 */

import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  technologies: string;
  imageUrl: string | null;
  imageAlt: string | null;
}

export default function CaseStudyCard({
  slug,
  title,
  clientName,
  industry,
  challenge,
  technologies,
  imageUrl,
  imageAlt,
}: CaseStudyCardProps) {
  const techList = technologies
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  return (
    <article className="card overflow-hidden flex flex-col">
      {/* Featured Image */}
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
        {/* Industry Badge */}
        <span className="tag-accent self-start mb-3">{industry}</span>

        {/* Client Name */}
        <p className="text-xs font-medium uppercase tracking-wider mb-2" style={{ color: "var(--text-muted)" }}>
          {clientName}
        </p>

        {/* Title */}
        <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>
          {title}
        </h3>

        {/* Challenge */}
        <p className="text-sm leading-relaxed mb-5 flex-1 line-clamp-2" style={{ color: "var(--text-secondary)" }}>
          {challenge}
        </p>

        {/* Tech Tags */}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {techList.map((tech) => (
              <span key={tech} className="tag">
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          href={`/case-studies/${slug}`}
          className="btn-primary w-full text-center"
          style={{ padding: "10px 20px", fontSize: 14 }}
        >
          Read Case Study
        </Link>
      </div>
    </article>
  );
}
