/**
 * AboutPreview Component
 *
 * Displays the About Me section on the homepage.
 * Optionally renders a featured image above the content.
 * Receives WordPress page content as a prop and renders
 * it as HTML, with a fallback if no content is available.
 */

import Image from "next/image";

interface AboutPreviewProps {
  content: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
}

export default function AboutPreview({
  content,
  imageUrl,
  imageAlt,
}: AboutPreviewProps) {
  return (
    <section className="px-6 py-16">
      <h2 className="text-3xl font-bold mb-4">About Me</h2>
      {imageUrl && (
        <div className="mb-6">
          <Image
            src={imageUrl}
            alt={imageAlt ?? "About image"}
            width={800}
            height={450}
            className="rounded-lg object-cover"
          />
        </div>
      )}
      {content ? (
        <div
          className="max-w-2xl text-gray-600 prose"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <p className="max-w-2xl text-gray-600">About content not found.</p>
      )}
    </section>
  );
}
