/**
 * ContactCTA Component
 *
 * Displays the Contact call-to-action section on the homepage.
 * Encourages visitors to reach out via the contact page.
 */

export default function ContactCTA() {
  return (
    <section className="px-6 py-16 text-center">
      <h2 className="text-3xl font-bold mb-4">Get In Touch</h2>
      <p className="text-gray-600 mb-8 max-w-xl mx-auto">
        Have a project in mind? I would love to hear from you. Let us build
        something great together.
      </p>
      <a
        href="/contact"
        className="inline-block px-6 py-3 bg-gray-900 text-white rounded hover:bg-gray-700 transition-colors"
      >
        Contact Me
      </a>
    </section>
  );
}
