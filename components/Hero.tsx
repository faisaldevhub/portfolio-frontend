/**
 * Hero Component
 *
 * The strongest visual section on the homepage.
 * Communicates: "WordPress Designer & Developer"
 * Features a strong headline, value proposition, dual CTAs,
 * and a professional portrait placeholder area.
 */

import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        paddingTop: 160,
        paddingBottom: 120,
        backgroundColor: "var(--bg-primary)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-main relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div>
            {/* Eyebrow */}
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "var(--accent)" }}
            >
              WordPress Designer &amp; Developer
            </p>

            {/* Main Heading */}
            <h1
              className="font-extrabold leading-[1.05] tracking-tight mb-6"
              style={{
                fontSize: "clamp(40px, 5vw, 72px)",
                color: "var(--text-primary)",
              }}
            >
              Helping Businesses Build Modern{" "}
              <span style={{ color: "var(--accent)" }}>High-Converting</span>{" "}
              Websites
            </h1>

            {/* Description */}
            <p
              className="text-lg leading-relaxed mb-10 max-w-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              I design and develop professional WordPress websites that help
              businesses establish trust, generate leads, and grow online.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">
                Hire Me
              </Link>
              <Link href="/projects" className="btn-secondary">
                View Projects
              </Link>
            </div>
          </div>

          {/* Right: Portrait Placeholder */}
          <div className="hidden lg:flex justify-end">
            <div
              className="relative w-[400px] h-[480px] flex items-center justify-center"
              style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-default)",
              }}
            >
              {/* Accent glow behind */}
              <div
                className="absolute -inset-4 rounded-[40px] opacity-20 blur-3xl -z-10"
                style={{ backgroundColor: "var(--accent)" }}
              />
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{
                    backgroundColor: "var(--bg-elevated)",
                    border: "1px solid var(--border-default)",
                  }}
                >
                  <span className="text-3xl">👤</span>
                </div>
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  Professional Portrait
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
