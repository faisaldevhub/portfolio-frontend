/**
 * Contact Page (/contact)
 */

import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact — Faisal Dev Hub",
  description: "Get in touch to discuss your next web development project. I am available for freelance work and collaborations.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="section-spacing" style={{ paddingTop: 140, backgroundColor: "var(--bg-secondary)" }}>
        <div className="container-main max-w-4xl">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: "var(--accent)" }}>Contact</p>
          <h1 className="heading-section mb-4">Get In Touch</h1>
          <p className="text-body max-w-2xl">
            Have a project in mind or want to discuss a collaboration? Fill out the form below or reach out through any of the channels listed.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-spacing">
        <div className="container-main max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
