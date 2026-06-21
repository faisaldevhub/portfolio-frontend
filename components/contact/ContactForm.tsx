/**
 * ContactForm Component
 *
 * Client component with dark-themed form inputs.
 */

"use client";

import { useState } from "react";

const inputStyles: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  backgroundColor: "var(--bg-elevated)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-btn)",
  color: "var(--text-primary)",
  fontSize: 15,
  outline: "none",
  transition: "border-color 200ms ease",
};

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setStatus("sent");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6" style={{ color: "var(--text-primary)" }}>Send a Message</h2>

      {status === "sent" && (
        <div className="mb-6 p-4 rounded-xl text-sm" style={{ backgroundColor: "rgba(34, 197, 94, 0.1)", border: "1px solid rgba(34, 197, 94, 0.2)", color: "#22c55e" }}>
          Thank you! Your message has been sent successfully.
        </div>
      )}

      {status === "error" && (
        <div className="mb-6 p-4 rounded-xl text-sm" style={{ backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1px solid rgba(239, 68, 68, 0.2)", color: "#ef4444" }}>
          Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Name</label>
          <input id="contact-name" name="name" type="text" required style={inputStyles} placeholder="Your name" onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")} />
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Email</label>
          <input id="contact-email" name="email" type="email" required style={inputStyles} placeholder="you@example.com" onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")} />
        </div>

        <div>
          <label htmlFor="contact-subject" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Subject</label>
          <input id="contact-subject" name="subject" type="text" required style={inputStyles} placeholder="Project inquiry" onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")} />
        </div>

        <div>
          <label htmlFor="contact-message" className="block text-sm font-medium mb-2" style={{ color: "var(--text-secondary)" }}>Message</label>
          <textarea id="contact-message" name="message" rows={5} required style={{ ...inputStyles, resize: "vertical" as const }} placeholder="Tell me about your project..." onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")} onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")} />
        </div>

        <button type="submit" disabled={status === "sending"} className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed">
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
