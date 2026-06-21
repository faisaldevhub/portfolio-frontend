/**
 * Services Listing Page (/services)
 *
 * Async Server Component that fetches all services from WordPress
 * and renders them in a card grid.
 */

import { getServices } from "@/lib/wordpress";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata = {
  title: "Services — Faisal Portfolio",
  description:
    "Professional web development services including WordPress development, landing pages, website maintenance, and speed optimization.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Services</h1>
      <p className="text-gray-600 mb-12 max-w-2xl">
        I offer a range of web development services to help businesses establish
        and grow their online presence.
      </p>

      {services.length > 0 ? (
        <ServicesGrid>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              slug={service.slug}
              icon={service.acf.icon}
              title={service.title.rendered}
              shortDescription={service.acf.short_description}
              pricing={service.acf.pricing}
            />
          ))}
        </ServicesGrid>
      ) : (
        <p className="text-gray-600">No services found.</p>
      )}
    </section>
  );
}
