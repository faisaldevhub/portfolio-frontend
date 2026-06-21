"use client";

/**
 * Navbar Component
 *
 * Premium fixed navigation with glassmorphism on scroll.
 * Hardcoded links per DESIGN_SYSTEM.md for full design control.
 * Client component for scroll detection and mobile menu toggle.
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        height: 80,
        backgroundColor: scrolled ? "rgba(11, 11, 11, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--border-default)"
          : "1px solid transparent",
      }}
    >
      <div className="container-main h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-lg font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Faisal<span style={{ color: "var(--accent)" }}>.</span>dev
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium transition-colors duration-200"
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
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: 14 }}>
              Hire Me
            </Link>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ color: "var(--text-primary)" }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 border-t"
          style={{
            backgroundColor: "rgba(11, 11, 11, 0.95)",
            backdropFilter: "blur(20px)",
            borderColor: "var(--border-default)",
          }}
        >
          <div className="container-main py-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium py-2 transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary mt-2 text-center"
              onClick={() => setMobileOpen(false)}
            >
              Hire Me
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
