/**
 * AboutPreview Component
 *
 * 50/50 split layout with image left, content + stats right.
 * Uses design tokens for premium dark styling.
 */

import Image from "next/image";

interface AboutPreviewProps {
  content: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
}

const STATS = [
  { value: "10+", label: "Projects" },
  { value: "10+", label: "Clients" },
  { value: "3+", label: "Years" },
];

export default function AboutPreview({
  content,
  imageUrl,
  imageAlt,
}: AboutPreviewProps) {
  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-main">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          {imageUrl && (
            <div
              className="relative aspect-[4/3] overflow-hidden"
              style={{ borderRadius: "var(--radius-img)" }}
            >
              <Image
                src={imageUrl}
                alt={imageAlt ?? "About image"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Right: Content */}
          <div>
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-4"
              style={{ color: "var(--accent)" }}
            >
              About Me
            </p>
            <h2 className="heading-section mb-6">
              Building Websites That Drive Results
            </h2>

            {content ? (
              <div
                className="text-body prose max-w-none mb-10"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-body mb-10">About content not found.</p>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderRadius: "var(--radius-btn)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <p
                    className="text-2xl md:text-3xl font-bold mb-1"
                    style={{ color: "var(--accent)" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-xs font-medium uppercase tracking-wider"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
