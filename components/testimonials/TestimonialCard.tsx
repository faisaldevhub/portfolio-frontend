"use client";

/**
 * TestimonialCard Component
 *
 * Premium dark testimonial card with orange stars, quote, and client info.
 */

import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  company: string;
  designation: string;
  rating: number;
  photoUrl: string | null;
  photoAlt: string | null;
  linkedinUrl: string;
}

export default function TestimonialCard({
  quote,
  clientName,
  company,
  designation,
  rating,
  photoUrl,
  photoAlt,
  linkedinUrl,
}: TestimonialCardProps) {
  return (
    <article className="card p-6 flex flex-col">
      {/* Star Rating */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className="text-sm"
            style={{
              color: i < rating ? "var(--accent)" : "var(--bg-elevated)",
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <div
        className="text-sm leading-relaxed mb-6 flex-1"
        style={{ color: "var(--text-secondary)" }}
        dangerouslySetInnerHTML={{ __html: quote }}
      />

      {/* Client Info */}
      <div
        className="flex items-center gap-3 pt-5 border-t"
        style={{ borderColor: "var(--border-default)" }}
      >
        {/* Photo */}
        {photoUrl && (
          <div className="relative w-11 h-11 rounded-full overflow-hidden flex-shrink-0 ring-2" style={{ borderColor: "var(--border-default)" }}>
            <Image
              src={photoUrl}
              alt={photoAlt ?? clientName}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Name & Role */}
        <div className="min-w-0">
          <p className="font-medium text-sm truncate" style={{ color: "var(--text-primary)" }}>
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: "var(--text-primary)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--accent)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
              >
                {clientName}
              </a>
            ) : (
              clientName
            )}
          </p>
          <p className="text-xs truncate" style={{ color: "var(--text-muted)" }}>
            {designation}, {company}
          </p>
        </div>
      </div>
    </article>
  );
}
