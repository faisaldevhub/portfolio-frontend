"use client";

/**
 * BlogCard Component
 *
 * Premium dark blog post card with image, date, categories, and excerpt.
 */

import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  imageUrl: string | null;
  imageAlt: string | null;
  categories: string[];
}

export default function BlogCard({
  slug,
  title,
  excerpt,
  date,
  imageUrl,
  imageAlt,
  categories,
}: BlogCardProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="card overflow-hidden flex flex-col">
      {/* Featured Image */}
      {imageUrl && (
        <Link href={`/blog/${slug}`}>
          <div className="img-zoom">
            <div className="relative w-full h-52">
              <Image
                src={imageUrl}
                alt={imageAlt ?? title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </Link>
      )}

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Date & Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <time className="text-xs" style={{ color: "var(--text-muted)" }}>
            {formattedDate}
          </time>
          {categories.map((cat) => (
            <span key={cat} className="tag" style={{ fontSize: 11, padding: "2px 8px" }}>
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3
            className="text-lg font-semibold mb-3 transition-colors duration-200"
            style={{ color: "var(--text-primary)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          >
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <div
          className="text-sm leading-relaxed mb-5 flex-1 line-clamp-3"
          style={{ color: "var(--text-secondary)" }}
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-medium transition-colors duration-200"
          style={{ color: "var(--accent)" }}
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
