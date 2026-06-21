/**
 * CaseStudyCard Component
 *
 * Presentational card for displaying a case study summary.
 * Shows client name, industry, challenge snippet, technologies,
 * and a link to the full case study.
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
  // Split comma-separated tech into tags
  const techList = technologies
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
        {/* Industry Badge */}
        <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded mb-2">
          {industry}
        </span>

        {/* Client Name */}
        <p className="text-sm text-gray-500 mb-1">{clientName}</p>

        {/* Title */}
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        {/* Challenge snippet */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{challenge}</p>

        {/* Tech Tags */}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {techList.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Read Case Study */}
        <Link
          href={`/case-studies/${slug}`}
          className="inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 transition-colors"
        >
          Read Case Study
        </Link>
      </div>
    </article>
  );
}
