import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import ServicesPreview from "@/components/ServicesPreview";
import ContactCTA from "@/components/ContactCTA";
import { getAboutPage, getMediaById } from "@/lib/wordpress";

export default async function Home() {
  const aboutPage = await getAboutPage();

  // Fetch featured image if the About page has one
  let imageUrl: string | null = null;
  let imageAlt: string | null = null;

  if (aboutPage && aboutPage.featured_media > 0) {
    const media = await getMediaById(aboutPage.featured_media);
    imageUrl = media.source_url;
    imageAlt = media.alt_text;
  }

  return (
    <>
      <Hero />
      <AboutPreview
        content={aboutPage?.content.rendered ?? null}
        imageUrl={imageUrl}
        imageAlt={imageAlt}
      />
      <ServicesPreview />
      <ContactCTA />
    </>
  );
}