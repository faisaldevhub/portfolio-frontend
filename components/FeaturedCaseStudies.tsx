/**
 * FeaturedCaseStudies Component
 *
 * Homepage case studies section with premium styling.
 */

import Link from "next/link";
import CaseStudyCard from "@/components/case-studies/CaseStudyCard";
import CaseStudiesGrid from "@/components/case-studies/CaseStudiesGrid";

interface CaseStudyData {
  id: number;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  challenge: string;
  technologies: string;
  imageUrl: string | null;
  imageAlt: string | null;
}

interface FeaturedCaseStudiesProps {
  caseStudies: CaseStudyData[];
}

export default function FeaturedCaseStudies({
  caseStudies,
}: FeaturedCaseStudiesProps) {
  if (caseStudies.length === 0) return null;

  return (
    <section
      className="section-spacing"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <div className="container-main">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          In-Depth Work
        </p>
        <h2 className="heading-section mb-4">Case Studies</h2>
        <p className="text-body mb-14 max-w-xl">
          How I helped clients solve real business challenges.
        </p>

        <CaseStudiesGrid>
          {caseStudies.map((cs) => (
            <CaseStudyCard
              key={cs.id}
              slug={cs.slug}
              title={cs.title}
              clientName={cs.clientName}
              industry={cs.industry}
              challenge={cs.challenge}
              technologies={cs.technologies}
              imageUrl={cs.imageUrl}
              imageAlt={cs.imageAlt}
            />
          ))}
        </CaseStudiesGrid>

        <div className="mt-14 text-center">
          <Link href="/case-studies" className="btn-secondary">
            View All Case Studies
          </Link>
        </div>
      </div>
    </section>
  );
}
