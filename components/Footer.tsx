"use client";

/**
 * Footer Component
 *
 * Premium minimal footer with navigation, social links, and copyright.
 * Uses design tokens for consistent styling.
 */

import Link from "next/link";
import { ExternalLink, User, Mail } from "lucide-react";

const FOOTER_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const SOCIAL_LINKS = [
  { icon: ExternalLink, href: "https://github.com/faisaldevhub", label: "GitHub" },
  { icon: User, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@faisaldev.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="border-t"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-default)",
      }}
    >
      <div className="container-main py-16">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Faisal<span style={{ color: "var(--accent)" }}>.</span>dev
          </Link>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-lg transition-all duration-200"
                style={{
                  color: "var(--text-muted)",
                  border: "1px solid var(--border-default)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--accent)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "var(--text-muted)";
                  e.currentTarget.style.borderColor = "var(--border-default)";
                }}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap gap-6 mb-12">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm transition-colors duration-200"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom */}
        <div
          className="pt-8 border-t"
          style={{ borderColor: "var(--border-default)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-disabled)" }}>
            &copy; {new Date().getFullYear()} Faisal Dev Hub. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
