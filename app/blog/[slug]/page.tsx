/**
 * Single Blog Post Page (/blog/[slug])
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlug, getCategories, getMediaById } from "@/lib/wordpress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, "").trim();
  return { title: `${post.title.rendered} — Faisal Blog`, description };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  let imageUrl: string | null = null;
  let imageAlt: string | null = null;
  if (post.featured_media > 0) {
    const media = await getMediaById(post.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  const categories = await getCategories();
  const categoryMap = new Map(categories.map((c) => [c.id, c.name]));
  const categoryNames = post.categories.map((id) => categoryMap.get(id)).filter((name): name is string => !!name);

  const formattedDate = new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <article>
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <time className="text-sm" style={{ color: "var(--text-muted)" }}>{formattedDate}</time>
            {categoryNames.map((cat) => (<span key={cat} className="tag" style={{ fontSize: 11, padding: "2px 8px" }}>{cat}</span>))}
          </div>
          <h1 className="heading-section mb-8">{post.title.rendered}</h1>
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
              <Image src={imageUrl} alt={imageAlt ?? post.title.rendered} fill className="object-cover" priority />
            </div>
          )}
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-main max-w-3xl">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          <div className="mt-12 pt-8 border-t" style={{ borderColor: "var(--border-default)" }}>
            <Link href="/blog" className="text-sm font-medium transition-colors duration-200" style={{ color: "var(--text-muted)" }}>← Back to Blog</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
