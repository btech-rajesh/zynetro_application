import Link from "next/link";
import { navigationLinks } from "../lib/siteContent";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="brand-mark">Zynetra</div>
      <nav className="topnav" aria-label="Primary navigation">
        {navigationLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
        <a className="nav-cta" href="/#consultation-form">
          Book Call
        </a>
      </nav>
    </header>
  );
}