/**
 * FeaturedServices Component
 *
 * Homepage services section with WordPress-driven content.
 */

import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesGrid from "@/components/services/ServicesGrid";

interface ServiceData {
  id: number;
  slug: string;
  icon: string;
  title: string;
  shortDescription: string;
  pricing: string;
}

interface FeaturedServicesProps {
  services: ServiceData[];
}

export default function FeaturedServices({ services }: FeaturedServicesProps) {
  if (services.length === 0) return null;

  return (
    <section className="section-spacing">
      <div className="container-main">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          What I Offer
        </p>
        <h2 className="heading-section mb-4">Services</h2>
        <p className="text-body mb-14 max-w-xl">
          Professional web development services to help your business grow
          online.
        </p>

        <ServicesGrid>
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              slug={s.slug}
              icon={s.icon}
              title={s.title}
              shortDescription={s.shortDescription}
              pricing={s.pricing}
            />
          ))}
        </ServicesGrid>

        <div className="mt-14 text-center">
          <Link href="/services" className="btn-secondary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
