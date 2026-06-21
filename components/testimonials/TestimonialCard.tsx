/**
 * TestimonialCard Component
 *
 * Presentational card for displaying a single client testimonial.
 * Shows the quote, star rating, client photo, name, designation, and company.
 * Designed for reuse on the /testimonials page and homepage section.
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
    <article className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < rating ? "text-yellow-400" : "text-gray-200"}
          >
            ★
          </span>
        ))}
      </div>

      {/* Quote */}
      <div
        className="text-gray-600 text-sm leading-relaxed mb-6 flex-1"
        dangerouslySetInnerHTML={{ __html: quote }}
      />

      {/* Client Info */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        {/* Photo */}
        {photoUrl && (
          <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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
          <p className="font-medium text-sm text-gray-900 truncate">
            {linkedinUrl ? (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-600 transition-colors"
              >
                {clientName}
              </a>
            ) : (
              clientName
            )}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {designation}, {company}
          </p>
        </div>
      </div>
    </article>
  );
}
