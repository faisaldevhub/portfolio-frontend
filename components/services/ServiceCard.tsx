/**
 * ServiceCard Component
 *
 * Premium dark service card with icon, description, pricing, and accent CTA.
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
    <article className="card p-6 flex flex-col">
      {/* Icon */}
      {icon && (
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
          style={{
            backgroundColor: "var(--accent-glow)",
            border: "1px solid rgba(255, 122, 0, 0.15)",
          }}
        >
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--text-primary)" }}>
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed mb-5 flex-1" style={{ color: "var(--text-secondary)" }}>
        {shortDescription}
      </p>

      {/* Pricing */}
      {pricing && (
        <p className="text-sm font-semibold mb-5" style={{ color: "var(--accent)" }}>
          {pricing}
        </p>
      )}

      {/* CTA */}
      <Link
        href={`/services/${slug}`}
        className="btn-secondary w-full text-center"
        style={{ padding: "10px 20px", fontSize: 14 }}
      >
        Learn More
      </Link>
    </article>
  );
}
