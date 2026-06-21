/**
 * Case Studies Listing Page (/case-studies)
 */

import { getCaseStudies, getMediaById } from "@/lib/wordpress";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

export const metadata = {
  title: "Case Studies — Faisal Dev Hub",
  description: "Detailed case studies showcasing the challenges, solutions, and results from client projects.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  const studiesWithImages = await Promise.all(
    caseStudies.map(async (cs) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;
      if (cs.featured_media > 0) {
        const media = await getMediaById(cs.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }
      return { cs, imageUrl, imageAlt };
    })
  );

  return (
    <section className="section-spacing" style={{ paddingTop: 140 }}>
      <div className="container-main">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>In-Depth Work</p>
        <h1 className="heading-section mb-4">Case Studies</h1>
        <p className="text-body mb-14 max-w-xl">
          In-depth looks at real client projects — the challenges faced, solutions delivered, and results achieved.
        </p>

        {studiesWithImages.length > 0 ? (
          <CaseStudiesGrid>
            {studiesWithImages.map(({ cs, imageUrl, imageAlt }) => (
              <CaseStudyCard key={cs.id} slug={cs.slug} title={cs.title.rendered} clientName={cs.acf.client_name} industry={cs.acf.industry} challenge={cs.acf.challenge} technologies={cs.acf.technologies_used} imageUrl={imageUrl} imageAlt={imageAlt} />
            ))}
          </CaseStudiesGrid>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No case studies found.</p>
        )}
      </div>
    </section>
  );
}
