/**
 * Single Case Study Detail Page (/case-studies/[slug])
 *
 * Async Server Component that fetches a single case study by slug,
 * resolves its featured image, and renders the full case study
 * with structured Challenge → Solution → Results sections.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCaseStudyBySlug, getMediaById } from "@/lib/wordpress";

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    return { title: "Case Study Not Found" };
  }

  return {
    title: `${study.title.rendered} — Case Study — Faisal Portfolio`,
    description: study.acf.challenge.substring(0, 160),
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  // Resolve featured image
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (study.featured_media > 0) {
    const media = await getMediaById(study.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  // Parse technologies
  const technologies = study.acf.technologies_used
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
                alt={imageAlt ?? study.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Industry Badge */}
          <span className="inline-block px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded mb-3">
            {study.acf.industry}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-4">{study.title.rendered}</h1>

          {/* Meta Row */}
          <div className="flex flex-wrap gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium text-gray-900">Client:</span>{" "}
              {study.acf.client_name}
            </div>
            <div>
              <span className="font-medium text-gray-900">Duration:</span>{" "}
              {study.acf.project_duration}
            </div>
          </div>
        </div>
      </section>

      {/* Challenge → Solution → Results */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Challenge */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">The Challenge</h2>
            <p className="text-gray-600 leading-relaxed">
              {study.acf.challenge}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">The Solution</h2>
            <p className="text-gray-600 leading-relaxed">
              {study.acf.solution}
            </p>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-2xl font-semibold mb-3">The Results</h2>
            <p className="text-gray-600 leading-relaxed">
              {study.acf.results}
            </p>
          </div>

          {/* Technologies */}
          {technologies.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Full WordPress Content (if any) */}
          {study.content.rendered && (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: study.content.rendered }}
            />
          )}

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-4">
            {study.acf.live_url && (
              <a
                href={study.acf.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
              >
                View Live Site ↗
              </a>
            )}
            <Link
              href="/case-studies"
              className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-100 transition-colors"
            >
              ← Back to Case Studies
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
