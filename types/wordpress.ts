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

  /** Post title returned by WordPress. */
  title: {
    rendered: string;
  };

  /** Full HTML content of the post. */
  content: {
    rendered: string;
  };
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
