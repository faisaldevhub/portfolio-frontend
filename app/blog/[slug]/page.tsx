/**
 * Single Blog Post Page (/blog/[slug])
 *
 * Async Server Component that fetches a single blog post by slug,
 * resolves its featured image and category names, and renders
 * the full post detail view. Returns 404 if the slug doesn't exist.
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getCategories, getMediaById } from "@/lib/wordpress";

// ---------------------------------------------------------------------------
// Dynamic SEO metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const description = post.excerpt.rendered
    .replace(/<[^>]*>/g, "")
    .trim();

  return {
    title: `${post.title.rendered} — Faisal Blog`,
    description,
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Resolve featured image
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (post.featured_media > 0) {
    const media = await getMediaById(post.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  // Resolve category names
  const categories = await getCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const categoryNames = post.categories
    .map((id) => categoryMap.get(id))
    .filter((name): name is string => !!name);

  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      {/* Hero Section */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          {/* Date & Categories */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <time className="text-sm text-gray-500">{formattedDate}</time>
            {categoryNames.map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold mb-6">{post.title.rendered}</h1>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt ?? post.title.rendered}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Post Content */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {/* Back Link */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
