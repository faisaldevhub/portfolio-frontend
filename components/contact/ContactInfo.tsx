/**
 * ContactInfo Component
 *
 * Displays contact information and social media links.
 * Server component — no client-side interactivity needed.
 */

import Link from "next/link";

export default function ContactInfo() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

      <div className="space-y-6">
        {/* Email */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Email</h3>
          <a
            href="mailto:hello@faisaldev.com"
            className="text-gray-900 hover:text-gray-600 transition-colors"
          >
            hello@faisaldev.com
          </a>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">Location</h3>
          <p className="text-gray-900">Available for remote work worldwide</p>
        </div>

        {/* Availability */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-1">
            Availability
          </h3>
          <p className="text-gray-900">Open to freelance and contract work</p>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">
            Social Links
          </h3>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/faisaldevhub"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                GitHub ↗
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/faisaldev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                LinkedIn ↗
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/faisaldev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                Twitter / X ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8 p-5 bg-gray-50 rounded-lg">
        <p className="text-gray-700 text-sm mb-3">
          Prefer to discuss in detail? Check out my work first.
        </p>
        <Link
          href="/projects"
          className="inline-block px-4 py-2 border border-gray-900 text-gray-900 text-sm rounded hover:bg-gray-900 hover:text-white transition-colors"
        >
          View Projects
        </Link>
      </div>
    </div>
  );
}
