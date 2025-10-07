// components/Navbar.tsx
"use client";

import { useState } from "react";
import { Instagram, Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "#", active: true },
    { name: "Why Choose Us?", href: "#" },
    { name: "Products", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Faq", href: "#" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/60 py-4 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-xl font-light text-neutral-900 select-none">
          Okare<sup className="text-xs align-super">®</sup>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-neutral-800">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  link.active
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "hover:bg-neutral-100"
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="#"
              className="p-2 rounded-full hover:bg-neutral-100 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-neutral-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-neutral-800">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`block px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                link.active
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "hover:bg-neutral-100"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#"
            className="block p-2 rounded-full hover:bg-neutral-100 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
          </Link>
        </div>
      )}
    </nav>
  );
}
