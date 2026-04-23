import Link from "next/link";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-gray-950 border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-xl bg-orange-600 text-white font-extrabold text-lg select-none">Z</span>
              <span className="text-white font-bold text-lg">Zynetra</span>
            </div>
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Building websites, backend systems, and AI automation that support real business growth.
            </p>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Zynetra. All rights reserved.</p>
          <p>Built with ❤️ by Rajesh Pachauri</p>
        </div>
      </div>
    </footer>
  );
}
