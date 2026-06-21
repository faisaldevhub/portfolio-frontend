/**
 * Contact Page (/contact)
 *
 * Displays contact information, social links, and a contact form.
 * The form uses a Server Action to handle submission.
 */

import type { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata: Metadata = {
  title: "Contact — Faisal Portfolio",
  description:
    "Get in touch to discuss your next web development project. I am available for freelance work and collaborations.",
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-6 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Get In Touch</h1>
          <p className="text-gray-600 max-w-2xl">
            Have a project in mind or want to discuss a collaboration? Fill out
            the form below or reach out through any of the channels listed. I
            will get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </section>
    </>
  );
}
