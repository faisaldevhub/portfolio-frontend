/**
 * Blog Listing Page (/blog)
 */

import { getPosts, getCategories, getMediaById } from "@/lib/wordpress";
import BlogCard from "@/components/blog/BlogCard";
import BlogGrid from "@/components/blog/BlogGrid";

export const metadata = {
  title: "Blog — Faisal Dev Hub",
  description: "Insights, tutorials, and thoughts on web development, WordPress, and modern frontend technologies.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([getPosts(), getCategories()]);
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));

  const postsWithImages = await Promise.all(
    posts.map(async (post) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;
      if (post.featured_media > 0) {
        const media = await getMediaById(post.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }
      const categoryNames = post.categories.map((id) => categoryMap.get(id)).filter((name): name is string => !!name);
      return { post, imageUrl, imageAlt, categoryNames };
    })
  );

  return (
    <section className="section-spacing" style={{ paddingTop: 140 }}>
      <div className="container-main">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Insights</p>
        <h1 className="heading-section mb-4">Blog</h1>
        <p className="text-body mb-14 max-w-xl">
          Insights, tutorials, and thoughts on web development, design, and modern technologies.
        </p>

        {postsWithImages.length > 0 ? (
          <BlogGrid>
            {postsWithImages.map(({ post, imageUrl, imageAlt, categoryNames }) => (
              <BlogCard key={post.id} slug={post.slug} title={post.title.rendered} excerpt={post.excerpt.rendered} date={post.date} imageUrl={imageUrl} imageAlt={imageAlt} categories={categoryNames} />
            ))}
          </BlogGrid>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No blog posts found.</p>
        )}
      </div>
    </section>
  );
}
