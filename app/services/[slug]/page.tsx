/**
 * Single Service Detail Page (/services/[slug])
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getServiceBySlug, getMediaById } from "@/lib/wordpress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return { title: `${service.title.rendered} — Faisal Dev Hub`, description: service.acf.short_description };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  let imageUrl: string | null = null;
  let imageAlt: string | null = null;
  if (service.featured_media > 0) {
    const media = await getMediaById(service.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  return (
    <article>
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-4xl">
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
              <Image src={imageUrl} alt={imageAlt ?? service.title.rendered} fill className="object-cover" priority />
            </div>
          )}
          <div className="flex items-center gap-3 mb-4">
            {service.acf.icon && <span className="text-4xl">{service.acf.icon}</span>}
            <h1 className="heading-section">{service.title.rendered}</h1>
          </div>
          <p className="text-body mb-4">{service.acf.short_description}</p>
          {service.acf.pricing && (
            <p className="text-xl font-semibold" style={{ color: "var(--accent)" }}>{service.acf.pricing}</p>
          )}
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-main max-w-4xl">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: service.content.rendered }} />
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">Get Started</Link>
            <Link href="/services" className="btn-secondary">← Back to Services</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
