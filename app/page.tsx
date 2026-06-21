import Hero from "@/components/Hero";
import AboutPreview from "@/components/AboutPreview";
import FeaturedProjects from "@/components/FeaturedProjects";
import FeaturedCaseStudies from "@/components/FeaturedCaseStudies";
import FeaturedServices from "@/components/FeaturedServices";
import FeaturedTestimonials from "@/components/FeaturedTestimonials";
import ContactCTA from "@/components/ContactCTA";
import {
  getAboutPage,
  getProjects,
  getCaseStudies,
  getTestimonials,
  getServices,
  getMediaById,
} from "@/lib/wordpress";

export default async function Home() {
  // Fetch all data sources in parallel
  const [aboutPage, allProjects, allCaseStudies, allTestimonials, allServices] =
    await Promise.all([
      getAboutPage(),
      getProjects(),
      getCaseStudies(),
      getTestimonials(),
      getServices(),
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

  // Take the latest 3 case studies and resolve their featured images in parallel
  const latestCaseStudies = allCaseStudies.slice(0, 3);

  const featuredCaseStudies = await Promise.all(
    latestCaseStudies.map(async (cs) => {
      let imageUrl: string | null = null;
      let imageAlt: string | null = null;

      if (cs.featured_media > 0) {
        const media = await getMediaById(cs.featured_media);
        imageUrl = media.source_url;
        imageAlt = media.alt_text;
      }

      return {
        id: cs.id,
        slug: cs.slug,
        title: cs.title.rendered,
        clientName: cs.acf.client_name,
        industry: cs.acf.industry,
        challenge: cs.acf.challenge,
        technologies: cs.acf.technologies_used,
        imageUrl,
        imageAlt,
      };
    })
  );

  // Take the latest 3 testimonials and resolve their client photos in parallel
  const latestTestimonials = allTestimonials.slice(0, 3);

  const featuredTestimonials = await Promise.all(
    latestTestimonials.map(async (t) => {
      let photoUrl: string | null = null;
      let photoAlt: string | null = null;

      if (t.featured_media > 0) {
        const media = await getMediaById(t.featured_media);
        photoUrl = media.source_url;
        photoAlt = media.alt_text;
      }

      return {
        id: t.id,
        quote: t.excerpt.rendered,
        clientName: t.acf.client_name,
        company: t.acf.company,
        designation: t.acf.designation,
        rating: t.acf.rating,
        photoUrl,
        photoAlt,
        linkedinUrl: t.acf.linkedin_url,
      };
    })
  );

  // Map services to flat props (no image resolution needed for cards)
  const featuredServicesList = allServices.map((s) => ({
    id: s.id,
    slug: s.slug,
    icon: s.acf.icon,
    title: s.title.rendered,
    shortDescription: s.acf.short_description,
    pricing: s.acf.pricing,
  }));

  return (
    <>
      <Hero />
      <AboutPreview
        content={aboutPage?.content.rendered ?? null}
        imageUrl={aboutImageUrl}
        imageAlt={aboutImageAlt}
      />
      <FeaturedProjects projects={featuredProjects} />
      <FeaturedCaseStudies caseStudies={featuredCaseStudies} />
      <FeaturedServices services={featuredServicesList} />
      <FeaturedTestimonials testimonials={featuredTestimonials} />
      <ContactCTA />
    </>
  );
}