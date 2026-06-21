/**
 * Case Studies Listing Page (/case-studies)
 *
 * Async Server Component that fetches all case studies,
 * resolves featured images, and renders them in a card grid.
 */

import { getCaseStudies, getMediaById } from "@/lib/wordpress";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

export const metadata = {
  title: "Case Studies — Faisal Portfolio",
  description:
    "Detailed case studies showcasing the challenges, solutions, and results from client projects.",
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  // Resolve featured images in parallel
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
    <section className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Case Studies</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        In-depth looks at real client projects — the challenges faced, the
        solutions delivered, and the results achieved.
      </p>

      {studiesWithImages.length > 0 ? (
        <CaseStudiesGrid>
          {studiesWithImages.map(({ cs, imageUrl, imageAlt }) => (
            <CaseStudyCard
              key={cs.id}
              slug={cs.slug}
              title={cs.title.rendered}
              clientName={cs.acf.client_name}
              industry={cs.acf.industry}
              challenge={cs.acf.challenge}
              technologies={cs.acf.technologies_used}
              imageUrl={imageUrl}
              imageAlt={imageAlt}
            />
          ))}
        </CaseStudiesGrid>
      ) : (
        <p className="text-gray-600">No case studies found.</p>
      )}
    </section>
  );
}
