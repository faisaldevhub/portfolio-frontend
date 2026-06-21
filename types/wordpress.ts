/**
 * WordPress Type Definitions
 *
 * Shared TypeScript interfaces that mirror the shapes returned by the
 * WordPress REST API.  Only the fields we actively consume are defined
 * here; extend these interfaces as the project grows.
 */

// ---------------------------------------------------------------------------
// Pages
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Page object (wp/v2/pages).
 *
 * The `title` and `content` fields use the "rendered" sub-property
 * because the REST API wraps them in `{ rendered: string }`.
 */
export interface WPPage {
  /** Unique identifier for the page. */
  id: number;

  /** URL-friendly slug (e.g. "about", "contact"). */
  slug: string;

  /** Page title returned by WordPress. */
  title: {
    rendered: string;
  };

  /** Full HTML content of the page. */
  content: {
    rendered: string;
  };

  /** ID of the featured media attachment (0 if none). */
  featured_media: number;
}

// ---------------------------------------------------------------------------
// Posts
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Post object (wp/v2/posts).
 *
 * Same rendered-wrapper convention as WPPage for `title` and `content`.
 */
export interface WPPost {
  /** Unique identifier for the post. */
  id: number;

  /** URL-friendly slug (e.g. "my-first-post"). */
  slug: string;

  /** ISO 8601 date string (e.g. "2026-06-19T19:05:57"). */
  date: string;

  /** Post title returned by WordPress. */
  title: {
    rendered: string;
  };

  /** Full HTML content of the post. */
  content: {
    rendered: string;
  };

  /** Short excerpt of the post. */
  excerpt: {
    rendered: string;
  };

  /** ID of the featured media attachment (0 if none). */
  featured_media: number;

  /** Array of category IDs assigned to this post. */
  categories: number[];
}

// ---------------------------------------------------------------------------
// Categories
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Category object (wp/v2/categories).
 */
export interface WPCategory {
  /** Unique identifier for the category. */
  id: number;

  /** Category name. */
  name: string;

  /** URL-friendly slug. */
  slug: string;

  /** Number of posts in this category. */
  count: number;
}

// ---------------------------------------------------------------------------
// Media
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Media object (wp/v2/media).
 */
export interface WPMedia {
  /** Unique identifier for the media item. */
  id: number;

  /** Original source URL of the media file. */
  source_url: string;

  /** Alt text for accessibility. */
  alt_text: string;

  /** Media title. */
  title: {
    rendered: string;
  };
}

// ---------------------------------------------------------------------------
// Projects (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Project object (wp/v2/project).
 *
 * Custom fields are managed by ACF and appear under the `acf`
 * object in the REST API response.
 */
export interface WPProject {
  /** Unique identifier for the project. */
  id: number;

  /** URL-friendly slug (e.g. "portfolio-website"). */
  slug: string;

  /** Project title. */
  title: {
    rendered: string;
  };

  /** Full HTML content/description of the project. */
  content: {
    rendered: string;
  };

  /** Short excerpt/summary of the project. */
  excerpt: {
    rendered: string;
  };

  /** ID of the featured media attachment (0 if none). */
  featured_media: number;

  /** Custom fields exposed by ACF via the REST API. */
  acf: {
    /** Live project URL. */
    project_url: string;

    /** GitHub repository URL. */
    github_url: string;

    /** Comma-separated list of technologies used. */
    tech_stack: string;

    /** Client or project owner name. */
    client_name: string;
  };
}

// ---------------------------------------------------------------------------
// Testimonials (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Testimonial object (wp/v2/testimonial).
 *
 * The testimonial quote is stored in `content.rendered`.
 * Client details are managed by ACF and appear under `acf`.
 */
export interface WPTestimonial {
  /** Unique identifier for the testimonial. */
  id: number;

  /** URL-friendly slug. */
  slug: string;

  /** Testimonial title (typically the project/company name). */
  title: {
    rendered: string;
  };

  /** The testimonial quote as HTML. */
  content: {
    rendered: string;
  };

  /** Short excerpt of the testimonial. */
  excerpt: {
    rendered: string;
  };

  /** ID of the featured media attachment — client photo (0 if none). */
  featured_media: number;

  /** Custom fields exposed by ACF via the REST API. */
  acf: {
    /** Client's full name. */
    client_name: string;

    /** Client's company name. */
    company: string;

    /** Client's role or designation. */
    designation: string;

    /** Rating from 1 to 5. */
    rating: number;

    /** Client's LinkedIn profile URL. */
    linkedin_url: string;
  };
}

// ---------------------------------------------------------------------------
// Services (Custom Post Type)
// ---------------------------------------------------------------------------

/**
 * Represents a WordPress Service object (wp/v2/service).
 *
 * The full service description is in `content.rendered`.
 * Summary fields are managed by ACF under `acf`.
 */
export interface WPService {
  /** Unique identifier for the service. */
  id: number;

  /** URL-friendly slug (e.g. "wordpress-website-development"). */
  slug: string;

  /** Service title. */
  title: {
    rendered: string;
  };

  /** Full HTML content/description of the service. */
  content: {
    rendered: string;
  };

  /** Short excerpt of the service. */
  excerpt: {
    rendered: string;
  };

  /** ID of the featured media attachment (0 if none). */
  featured_media: number;

  /** Custom fields exposed by ACF via the REST API. */
  acf: {
    /** Icon emoji or class name. */
    icon: string;

    /** One-line service description for cards. */
    short_description: string;

    /** Pricing info (e.g. "Starting at $400"). */
    pricing: string;
  };
}
