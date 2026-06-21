/**
 * FeaturedCaseStudies Component
 *
 * Displays a "Case Studies" section on the homepage.
 * Receives pre-resolved case study data as props.
 * Includes a "View All Case Studies" CTA link.
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
    <section className="px-6 py-16">
      <h2 className="text-3xl font-bold mb-2">Case Studies</h2>
      <p className="text-gray-600 mb-10 max-w-2xl">
        In-depth looks at how I helped clients solve real business challenges.
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

      <div className="mt-10 text-center">
        <Link
          href="/case-studies"
          className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          View All Case Studies
        </Link>
      </div>
    </section>
  );
}
