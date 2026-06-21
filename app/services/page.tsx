/**
 * Services Listing Page (/services)
 */

import { getServices } from "@/lib/wordpress";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesGrid from "@/components/services/ServicesGrid";

export const metadata = {
  title: "Services — Faisal Dev Hub",
  description: "Professional web development services including WordPress development, landing pages, website maintenance, and speed optimization.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <section className="section-spacing" style={{ paddingTop: 140 }}>
      <div className="container-main">
        <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>What I Offer</p>
        <h1 className="heading-section mb-4">Services</h1>
        <p className="text-body mb-14 max-w-xl">
          I offer a range of web development services to help businesses establish and grow their online presence.
        </p>

        {services.length > 0 ? (
          <ServicesGrid>
            {services.map((service) => (
              <ServiceCard key={service.id} slug={service.slug} icon={service.acf.icon} title={service.title.rendered} shortDescription={service.acf.short_description} pricing={service.acf.pricing} />
            ))}
          </ServicesGrid>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>No services found.</p>
        )}
      </div>
    </section>
  );
}
