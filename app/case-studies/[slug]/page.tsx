/**
 * Single Case Study Detail Page (/case-studies/[slug])
 */

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCaseStudyBySlug, getMediaById } from "@/lib/wordpress";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) return { title: "Case Study Not Found" };
  return { title: `${study.title.rendered} — Case Study — Faisal Dev Hub`, description: study.acf.challenge.substring(0, 160) };
}

export default async function CaseStudyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = await getCaseStudyBySlug(slug);
  if (!study) notFound();

  let imageUrl: string | null = null;
  let imageAlt: string | null = null;
  if (study.featured_media > 0) {
    const media = await getMediaById(study.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  const technologies = study.acf.technologies_used.split(",").map((t) => t.trim()).filter(Boolean);

  return (
    <article>
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-4xl">
          {imageUrl && (
            <div className="relative w-full h-64 md:h-96 mb-8 overflow-hidden" style={{ borderRadius: "var(--radius-img)" }}>
              <Image src={imageUrl} alt={imageAlt ?? study.title.rendered} fill className="object-cover" priority />
            </div>
          )}
          <span className="tag-accent mb-4 inline-block">{study.acf.industry}</span>
          <h1 className="heading-section mb-6">{study.title.rendered}</h1>
          <div className="flex flex-wrap gap-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            <div><span className="font-medium" style={{ color: "var(--text-primary)" }}>Client:</span> {study.acf.client_name}</div>
            <div><span className="font-medium" style={{ color: "var(--text-primary)" }}>Duration:</span> {study.acf.project_duration}</div>
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-main max-w-4xl space-y-14">
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>The Challenge</h2>
            <p className="text-body">{study.acf.challenge}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>The Solution</h2>
            <p className="text-body">{study.acf.solution}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>The Results</h2>
            <p className="text-body">{study.acf.results}</p>
          </div>
          {technologies.length > 0 && (
            <div>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: "var(--text-primary)" }}>Technologies Used</h2>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (<span key={tech} className="tag">{tech}</span>))}
              </div>
            </div>
          )}
          {study.content.rendered && (
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: study.content.rendered }} />
          )}
          <div className="flex flex-wrap gap-4 pt-4">
            {study.acf.live_url && (
              <a href={study.acf.live_url} target="_blank" rel="noopener noreferrer" className="btn-primary">View Live Site ↗</a>
            )}
            <Link href="/case-studies" className="btn-secondary">← Back to Case Studies</Link>
          </div>
        </div>
      </section>
    </article>
  );
}
