/**
 * ServicesPreview Component
 *
 * Displays the Services section on the homepage.
 * Renders a responsive grid of service offerings.
 */

export default function ServicesPreview() {
  return (
    <section className="px-6 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold mb-8">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Web Development</h3>
          <p className="text-gray-600">
            Custom websites built with modern frameworks and best practices.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Headless CMS</h3>
          <p className="text-gray-600">
            Decoupled WordPress solutions for speed and flexibility.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
          <p className="text-gray-600">
            Clean, intuitive interfaces that delight users.
          </p>
        </div>
      </div>
    </section>
  );
}
