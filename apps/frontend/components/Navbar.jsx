'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/#services' },
  { label: 'About', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setProfileOpen(false);
    router.push('/');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 relative">

          {/* Logo left */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
            <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-orange-600 group-hover:bg-orange-500 text-white font-extrabold text-xl select-none transition-colors shadow-lg shadow-orange-900/40">
              Z
            </span>
            <span className="text-white font-bold text-lg tracking-tight">Zynetra</span>
          </Link>

          {/* Nav links - centered */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section - Auth or Profile */}
          <div className="hidden md:flex items-center gap-2.5 ml-auto">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="px-4 py-2 bg-orange-600/20 border border-orange-500/30 hover:border-orange-500 rounded-lg transition-colors flex items-center gap-2"
                >
                  <div className="text-right">
                    <div className="text-xs font-semibold text-white leading-none">{user.name}</div>
                    <div className="text-xs text-gray-400">{user.email}</div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                </button>

                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-white/[0.08] rounded-xl shadow-xl py-2 z-50">
                    <div className="px-4 py-3 border-b border-white/[0.08]">
                      <p className="text-sm font-semibold text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-400/10 transition-colors font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-1.5 text-sm text-gray-300 hover:text-white border border-white/[0.15] hover:border-white/30 rounded-lg transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm text-white bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors font-semibold shadow-md shadow-orange-900/30"
                >
                  Create Account
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto text-gray-300 hover:text-white p-2 rounded-lg hover:bg-white/[0.08] transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden bg-gray-950 border-t border-white/[0.08] px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-white/[0.08] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/[0.08] mt-2 space-y-2">
            {user ? (
              <>
                <div className="px-3 py-2.5 text-sm text-gray-300 bg-white/[0.05] rounded-lg">
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2.5 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="flex text-center px-4 py-2.5 text-sm text-gray-300 border border-white/[0.15] rounded-lg font-medium">
                  Login
                </Link>
                <Link href="/auth/signup" className="flex text-center px-4 py-2.5 text-sm text-white bg-orange-600 rounded-lg font-semibold">
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
