import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/wordpress";

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  return (
    <article>
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-4xl">
          <h1 className="heading-section">{page.title.rendered}</h1>
        </div>
      </section>
      <section className="section-spacing">
        <div className="container-main max-w-4xl">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </div>
      </section>
    </article>
  );
}
