/**
 * BlogCard Component
 *
 * Presentational card for displaying a single blog post.
 * Shows the featured image, date, title, excerpt, and categories.
 * Designed for reuse on the /blog listing page.
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
  // Format date to a readable string
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Featured Image */}
      {imageUrl && (
        <Link href={`/blog/${slug}`}>
          <div className="relative w-full h-52">
            <Image
              src={imageUrl}
              alt={imageAlt ?? title}
              fill
              className="object-cover"
            />
          </div>
        </Link>
      )}

      {/* Card Body */}
      <div className="p-5">
        {/* Date & Categories */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <time className="text-xs text-gray-500">{formattedDate}</time>
          {categories.map((cat) => (
            <span
              key={cat}
              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blog/${slug}`}>
          <h3 className="text-xl font-semibold mb-2 hover:text-gray-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <div
          className="text-gray-600 text-sm mb-4 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

        {/* Read More */}
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
        >
          Read More →
        </Link>
      </div>
    </article>
  );
}
