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
    <main>
      <h1>{page.title.rendered}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
    </main>
  );
}
