"use client";

/**
 * ContactInfo Component
 *
 * Dark-themed contact information and social links.
 */

import Link from "next/link";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Contact Information</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>Email</h3>
          <a href="mailto:hello@faisaldev.com" className="transition-colors duration-200" style={{ color: "var(--text-primary)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-primary)")}>
            hello@faisaldev.com
          </a>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>Location</h3>
          <p style={{ color: "var(--text-primary)" }}>Available for remote work worldwide</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-1" style={{ color: "var(--text-muted)" }}>Availability</h3>
          <p style={{ color: "var(--text-primary)" }}>Open to freelance and contract work</p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3" style={{ color: "var(--text-muted)" }}>Social Links</h3>
          <ul className="space-y-2">
            {[
              { label: "GitHub ↗", href: "https://github.com/faisaldevhub" },
              { label: "LinkedIn ↗", href: "https://linkedin.com/in/faisaldev" },
              { label: "Twitter / X ↗", href: "https://twitter.com/faisaldev" },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors duration-200" style={{ color: "var(--text-secondary)" }} onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")} onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 p-5" style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-card)", border: "1px solid var(--border-default)" }}>
        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
          Prefer to discuss in detail? Check out my work first.
        </p>
        <Link href="/projects" className="btn-secondary" style={{ padding: "8px 16px", fontSize: 13 }}>
          View Projects
        </Link>
      </div>
    </div>
  );
}
