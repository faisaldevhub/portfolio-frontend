/**
 * ServiceCard Component
 *
 * Presentational card for displaying a single service.
 * Shows an icon, title, short description, and pricing.
 * Links to the full service detail page.
 * Designed for reuse on the /services page and homepage section.
 */

import Link from "next/link";

interface ServiceCardProps {
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  pricing: string;
}

export default function ServiceCard({
  slug,
  icon,
  title,
  shortDescription,
  pricing,
}: ServiceCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Icon */}
      {icon && <span className="text-3xl mb-4">{icon}</span>}

      {/* Title */}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>

      {/* Short Description */}
      <p className="text-gray-600 text-sm mb-4 flex-1">{shortDescription}</p>

      {/* Pricing */}
      {pricing && (
        <p className="text-sm font-medium text-gray-900 mb-4">{pricing}</p>
      )}

      {/* Learn More Link */}
      <Link
        href={`/services/${slug}`}
        className="inline-block px-4 py-2 bg-gray-900 text-white text-sm rounded hover:bg-gray-700 transition-colors text-center"
      >
        Learn More
      </Link>
    </article>
  );
}
