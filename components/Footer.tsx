/**
 * Footer Component
 *
 * Renders the site footer with copyright and links.
 * Will be expanded with dynamic content from WordPress.
 */

export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Portfolio. All rights reserved.</p>
    </footer>
  );
}
