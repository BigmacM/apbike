"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "All Bikes", href: "/bikes" },
  { label: "Why Us", href: "/#why-us" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Services", href: "/services" },
  { label: "Traffic Rules", href: "/traffic-rules" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar({ lightBg = false }: { lightBg?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // On pages with a light/white page header (no dark hero), always show the
  // dark-text navbar style so links aren't invisible against the background.
  const isScrolled = scrolled || lightBg;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-ocean flex items-center justify-center shadow-glow shrink-0">
              {/* Moped / scooter icon */}
              <svg viewBox="0 0 56 36" width="26" height="17" fill="none" aria-hidden>
                <circle cx="10" cy="27" r="8" stroke="white" strokeWidth="2.5"/>
                <circle cx="10" cy="27" r="3" fill="white"/>
                <circle cx="46" cy="27" r="8" stroke="white" strokeWidth="2.5"/>
                <circle cx="46" cy="27" r="3" fill="white"/>
                <path d="M16,22 C18,10 38,9 44,19 L45,24 C38,26 18,25 16,22Z" fill="white"/>
                <path d="M22,16 Q31,9 40,14 Q34,8 26,10 Z" fill="white" opacity="0.75"/>
                <line x1="43" y1="18" x2="48" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="46" y1="6" x2="53" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <line x1="16" y1="22" x2="11" y2="20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="leading-none">
              <p
                className={`font-display font-bold text-base transition-colors ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                AP Bike Center
              </p>
              <p
                className={`text-xs transition-colors ${
                  isScrolled ? "text-ocean" : "text-white/80"
                }`}
              >
                All Pattaya
              </p>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-ocean hover:bg-ocean/10"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a
              href="/bikes"
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-ocean text-white font-semibold text-sm px-5 py-2.5 rounded-xl hover:opacity-90 active:scale-[0.97] transition-all shadow-glow"
            >
              Book a Bike
              <span>🏍️</span>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-xl transition-colors ${
                isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
              }`}
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 rounded-xl text-gray-700 font-medium hover:bg-sand hover:text-ocean transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/bikes"
            onClick={() => setMobileOpen(false)}
            className="block mt-3 text-center bg-gradient-ocean text-white font-semibold py-3 px-6 rounded-xl"
          >
            Book a Bike 🏍️
          </a>
        </motion.div>
      )}
    </header>
  );
}
