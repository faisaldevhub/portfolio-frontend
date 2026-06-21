/**
 * Blog Listing Page (/blog)
 *
 * Async Server Component that fetches all blog posts and categories,
 * resolves featured images, and renders them in a card grid.
 */

import { getPosts, getCategories, getMediaById } from "@/lib/wordpress";
import BlogCard from "@/components/blog/BlogCard";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog — Faisal Portfolio",
  description:
    "Insights, tutorials, and thoughts on web development, WordPress, and modern frontend technologies.",
};

export default async function BlogPage() {
  // Fetch posts and categories in parallel
  const [posts, categories] = await Promise.all([
    getPosts(),
    getCategories(),
  ]);

  // Build a category ID → name map for display
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  // Resolve featured images in parallel
  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;

      if (post.featured_media > 0) {
        const media = await getMediaById(post.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }

      // Resolve category names from IDs
      const categoryNames = post.categories
        .map((id) => categoryMap.get(id))
        .filter((name): name is string => !!name);

      return { post, imageUrl, imageAlt, categoryNames };
    })
  );

  return (
    <section className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        Insights, tutorials, and thoughts on web development, design, and
        modern technologies.
      </p>

      {postsWithImages.length > 0 ? (
        <BlogGrid>
          {postsWithImages.map(
            ({ post, imageUrl, imageAlt, categoryNames }) => (
              <BlogCard
                key={post.id}
                slug={post.slug}
                title={post.title.rendered}
                excerpt={post.excerpt.rendered}
                date={post.date}
                imageUrl={imageUrl}
                imageAlt={imageAlt}
                categories={categoryNames}
              />
            )
          )}
        </BlogGrid>
      ) : (
        <p className="text-gray-600">No blog posts found.</p>
      )}
    </section>
  );
}
