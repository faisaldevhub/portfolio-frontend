import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import ServicesPreview from "@/components/ServicesPreview";
import ContactCTA from "@/components/ContactCTA";
import { getAboutPage, getProjects, getMediaById } from "@/lib/wordpress";

export default async function Home() {
  // Fetch About page and all projects in parallel
  const [aboutPage, allProjects] = await Promise.all([
    getAboutPage(),
    getProjects(),
  ]);

  // Resolve About featured image
  let aboutImageUrl: string | null = null;
  let aboutImageAlt: string | null = null;

  if (aboutPage && aboutPage.featured_media > 0) {
    const media = await getMediaById(aboutPage.featured_media);
    aboutImageUrl = media.source_url;
    aboutImageAlt = media.alt_text;
  }

  // Take the latest 3 projects and resolve their featured images in parallel
  const latestProjects = allProjects.slice(0, 3);

  const featuredProjects = await Promise.all(
    latestProjects.map(async (project) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;

      if (project.featured_media > 0) {
        const media = await getMediaById(project.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }

      return {
        id: project.id,
        slug: project.slug,
        title: project.title.rendered,
        excerpt: project.excerpt.rendered,
        imageUrl,
        imageAlt,
        clientName: project.acf.client_name,
        techStack: project.acf.tech_stack,
      };
    })
  );

  return (
    <>
      <Hero />
      <AboutPreview
        content={aboutPage?.content.rendered ?? null}
        imageUrl={aboutImageUrl}
        imageAlt={aboutImageAlt}
      />
      <FeaturedProjects projects={featuredProjects} />
      <ServicesPreview />
      <ContactCTA />
    </>
  );
}