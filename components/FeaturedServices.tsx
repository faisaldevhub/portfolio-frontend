/**
 * FeaturedServices Component
 *
 * Displays a WordPress-driven "Services" section on the homepage.
 * Replaces the previous hardcoded ServicesPreview component.
 * Receives pre-resolved service data as props and renders them
 * using the shared ServiceCard and ServicesGrid components.
 * Includes a "View All Services" CTA link.
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
    <section className="px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-2">Services</h2>
      <p className="text-gray-600 mb-10 max-w-2xl">
        Professional web development services to help your business grow online.
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

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-block px-6 py-3 border border-gray-900 text-gray-900 rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          View All Services
        </Link>
      </div>
    </section>
  );
}
