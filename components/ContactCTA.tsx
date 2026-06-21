/**
 * ContactCTA Component
 *
 * Premium closing call-to-action with large heading and dual buttons.
 */

import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="section-spacing">
      <div className="container-main text-center">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "var(--accent)" }}
        >
          Start a Project
        </p>
        <h2
          className="font-bold tracking-tight mb-6"
          style={{
            fontSize: "clamp(32px, 4vw, 56px)",
            color: "var(--text-primary)",
          }}
        >
          Let&apos;s Build Something Great
        </h2>
        <p
          className="text-lg mb-10 max-w-xl mx-auto"
          style={{ color: "var(--text-secondary)" }}
        >
          Have a project in mind? I would love to hear about it. Let&apos;s
          create something that drives real results for your business.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Book a Call
          </Link>
          <Link href="/contact" className="btn-secondary">
            Send Message
          </Link>
        </div>
      </div>
    </section>
  );
}
