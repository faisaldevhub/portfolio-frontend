import { WPPage, WPPost, WPCategory, WPMedia, WPProject, WPTestimonial, WPService, WPCaseStudy } from "@/types/wordpress";

/**
 * WordPress API Communication Layer
 *
 * This file centralises all communication with the WordPress REST API.
 * Every data-fetching function in the project should call `fetchAPI()`
 * so that headers, error handling, and the base URL are managed in one place.
 *
 * Usage (future):
 *   import { fetchAPI } from "@/lib/wordpress";
 *   const posts = await fetchAPI<WPPost[]>("/posts");
 */

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/**
 * Base URL for the WordPress REST API.
 * Replace with your actual WordPress site URL when ready to connect.
 *
 * Example: "https://your-wordpress-site.com/wp-json/wp/v2"
 */
const WORDPRESS_API_URL: string =
  process.env.WORDPRESS_API_URL ?? "https://your-wordpress-site.com/wp-json/wp/v2";

// ---------------------------------------------------------------------------
// Core fetch helper
// ---------------------------------------------------------------------------

/**
 * Generic, reusable fetch wrapper for the WordPress REST API.
 *
 * @template T - The expected shape of the JSON response.
 * @param endpoint - The API endpoint path (e.g. "/posts", "/pages/42").
 * @param options  - Optional `RequestInit` overrides (headers, method, etc.).
 * @returns The parsed JSON response typed as `T`.
 *
 * @throws {Error} If the network request fails or the response is not OK.
 *
 * @example
 *   // Fetch all published posts
 *   const posts = await fetchAPI<WPPost[]>("/posts");
 *
 *   // Fetch a single page by slug
 *   const [page] = await fetchAPI<WPPage[]>("/pages?slug=about");
 */
export async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${WORDPRESS_API_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `WordPress API error: ${response.status} ${response.statusText} — ${url}`,
    );
  }

  const data: T = await response.json();
  return data;
}

// ---------------------------------------------------------------------------
// Page helpers
// ---------------------------------------------------------------------------

/**
 * Fetch all published WordPress pages.
 *
 * Calls the /pages endpoint and returns an array of WPPage objects.
 * Use this anywhere you need to list or reference WordPress pages
 * (e.g. navigation menus, sitemap generation, static path building).
 *
 * @returns An array of all published pages.
 *
 * @example
 *   const pages = await getPages();
 *   pages.forEach(p => console.log(p.title.rendered));
 */
export async function getPages(): Promise<WPPage[]> {
  return fetchAPI<WPPage[]>("/pages");
}

/**
 * Fetch a single WordPress page by its URL slug.
 *
 * Queries the /pages endpoint filtered by slug and returns the first
 * matching page, or `null` if no page with that slug exists.
 *
 * @param slug - The URL-friendly slug to look up (e.g. "about", "contact").
 * @returns The matching WPPage, or `null` if not found.
 *
 * @example
 *   const about = await getPageBySlug("about");
 *   if (about) console.log(about.title.rendered);
 */
export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const pages = await fetchAPI<WPPage[]>(`/pages?slug=${slug}`);
  return pages.length > 0 ? pages[0] : null;
}

/**
 * Fetch the "About" page from WordPress.
 *
 * Convenience wrapper around `getPageBySlug` that targets the
 * page with slug "about". Returns the page object or `null`
 * if no About page exists in WordPress.
 *
 * @returns The About WPPage, or `null` if not found.
 *
 * @example
 *   const about = await getAboutPage();
 *   if (about) console.log(about.content.rendered);
 */
export async function getAboutPage(): Promise<WPPage | null> {
  return getPageBySlug("about");
}

// ---------------------------------------------------------------------------
// Media helpers
// ---------------------------------------------------------------------------

/**
 * Fetch a single WordPress media item by its ID.
 *
 * Calls the /media/:id endpoint and returns the full media object,
 * including `source_url` and `alt_text` for rendering images.
 *
 * @param id - The numeric ID of the media attachment.
 * @returns The WPMedia object for the given ID.
 *
 * @example
 *   const image = await getMediaById(42);
 *   console.log(image.source_url);
 */
export async function getMediaById(id: number): Promise<WPMedia> {
  return fetchAPI<WPMedia>(`/media/${id}`);
}

// ---------------------------------------------------------------------------
// Project helpers (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Fetch all published projects.
 *
 * Calls the /project endpoint (CPT REST base) and returns an array
 * of WPProject objects including ACF custom fields.
 *
 * @returns An array of all published projects.
 *
 * @example
 *   const projects = await getProjects();
 *   projects.forEach(p => console.log(p.acf.tech_stack));
 */
export async function getProjects(): Promise<WPProject[]> {
  return fetchAPI<WPProject[]>("/project");
}

/**
 * Fetch a single project by its URL slug.
 *
 * Queries the /project endpoint filtered by slug and returns the first
 * matching project, or `null` if no project with that slug exists.
 *
 * @param slug - The URL-friendly slug (e.g. "portfolio-website").
 * @returns The matching WPProject, or `null` if not found.
 *
 * @example
 *   const project = await getProjectBySlug("portfolio-website");
 *   if (project) console.log(project.acf.github_url);
 */
export async function getProjectBySlug(slug: string): Promise<WPProject | null> {
  const projects = await fetchAPI<WPProject[]>(`/project?slug=${slug}`);
  return projects.length > 0 ? projects[0] : null;
}

// ---------------------------------------------------------------------------
// Testimonial helpers (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Fetch all published testimonials.
 *
 * Calls the /testimonial endpoint and returns an array
 * of WPTestimonial objects including ACF custom fields.
 *
 * @returns An array of all published testimonials.
 *
 * @example
 *   const testimonials = await getTestimonials();
 *   testimonials.forEach(t => console.log(t.acf.client_name));
 */
export async function getTestimonials(): Promise<WPTestimonial[]> {
  return fetchAPI<WPTestimonial[]>("/testimonial");
}

// ---------------------------------------------------------------------------
// Service helpers (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Fetch all published services.
 *
 * Calls the /service endpoint and returns an array
 * of WPService objects including ACF custom fields.
 *
 * @returns An array of all published services.
 *
 * @example
 *   const services = await getServices();
 *   services.forEach(s => console.log(s.acf.short_description));
 */
export async function getServices(): Promise<WPService[]> {
  return fetchAPI<WPService[]>("/service");
}

/**
 * Fetch a single service by its URL slug.
 *
 * Queries the /service endpoint filtered by slug and returns the first
 * matching service, or `null` if no service with that slug exists.
 *
 * @param slug - The URL-friendly slug (e.g. "wordpress-website-development").
 * @returns The matching WPService, or `null` if not found.
 *
 * @example
 *   const service = await getServiceBySlug("wordpress-website-development");
 *   if (service) console.log(service.acf.pricing);
 */
export async function getServiceBySlug(slug: string): Promise<WPService | null> {
  const services = await fetchAPI<WPService[]>(`/service?slug=${slug}`);
  return services.length > 0 ? services[0] : null;
}

// ---------------------------------------------------------------------------
// Blog helpers (WordPress Posts)
// ---------------------------------------------------------------------------

/**
 * Fetch all published blog posts.
 *
 * @returns An array of all published posts, newest first.
 *
 * @example
 *   const posts = await getPosts();
 *   posts.forEach(p => console.log(p.title.rendered));
 */
export async function getPosts(): Promise<WPPost[]> {
  return fetchAPI<WPPost[]>("/posts");
}

/**
 * Fetch a single blog post by its URL slug.
 *
 * @param slug - The URL-friendly slug (e.g. "my-first-post").
 * @returns The matching WPPost, or `null` if not found.
 *
 * @example
 *   const post = await getPostBySlug("my-first-post");
 *   if (post) console.log(post.content.rendered);
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const posts = await fetchAPI<WPPost[]>(`/posts?slug=${slug}`);
  return posts.length > 0 ? posts[0] : null;
}

/**
 * Fetch all categories.
 *
 * @returns An array of all categories.
 *
 * @example
 *   const categories = await getCategories();
 *   categories.forEach(c => console.log(c.name));
 */
export async function getCategories(): Promise<WPCategory[]> {
  return fetchAPI<WPCategory[]>("/categories");
}

// ---------------------------------------------------------------------------
// Case Study helpers (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Fetch all published case studies.
 *
 * @returns An array of all published case studies.
 *
 * @example
 *   const studies = await getCaseStudies();
 *   studies.forEach(s => console.log(s.acf.challenge));
 */
export async function getCaseStudies(): Promise<WPCaseStudy[]> {
  return fetchAPI<WPCaseStudy[]>("/case-study");
}

/**
 * Fetch a single case study by its URL slug.
 *
 * @param slug - The URL-friendly slug.
 * @returns The matching WPCaseStudy, or `null` if not found.
 *
 * @example
 *   const study = await getCaseStudyBySlug("aj-oracle-music-website");
 *   if (study) console.log(study.acf.results);
 */
export async function getCaseStudyBySlug(slug: string): Promise<WPCaseStudy | null> {
  const studies = await fetchAPI<WPCaseStudy[]>(`/case-study?slug=${slug}`);
  return studies.length > 0 ? studies[0] : null;
}
