/**
 * Navbar Component
 *
 * Async Server Component that fetches WordPress pages
 * and renders a dynamic horizontal navigation menu.
 */

import Link from "next/link";
import { getPages } from "@/lib/wordpress";

export default async function Navbar() {
  const pages = await getPages();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <Link href="/" className="text-xl font-bold">
        Faisal Portfolio
      </Link>
      <ul className="flex gap-6">
        <li>
          <Link href="/" className="hover:text-gray-300 transition-colors">
            Home
          </Link>
        </li>
        {pages
          .filter((page) => page.slug !== "home")
          .map((page) => (
            <li key={page.id}>
              <Link
                href={`/${page.slug}`}
                className="hover:text-gray-300 transition-colors"
              >
                {page.title.rendered}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  );
}
