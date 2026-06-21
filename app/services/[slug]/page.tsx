/**
 * Single Service Detail Page (/services/[slug])
 *
 * Async Server Component that fetches a single service by slug,
 * resolves its featured image, and renders the full service detail view.
 * Returns 404 if no service matches the slug.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getMediaById } from "@/lib/wordpress";

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title.rendered} — Faisal Portfolio`,
    description: service.acf.short_description,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Resolve featured image
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (service.featured_media > 0) {
    const media = await getMediaById(service.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

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
                alt={imageAlt ?? service.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Icon & Title */}
          <div className="flex items-center gap-3 mb-4">
            {service.acf.icon && (
              <span className="text-4xl">{service.acf.icon}</span>
            )}
            <h1 className="text-4xl font-bold">{service.title.rendered}</h1>
          </div>

          {/* Short Description */}
          <p className="text-gray-600 text-lg mb-4">
            {service.acf.short_description}
          </p>

          {/* Pricing */}
          {service.acf.pricing && (
            <p className="text-xl font-semibold text-gray-900">
              {service.acf.pricing}
            </p>
          )}
        </div>
      </section>

      {/* Full Content */}
      <section className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: service.content.rendered }}
          />

          {/* CTA */}
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="/services"
              className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-100 transition-colors"
            >
              ← Back to Services
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
