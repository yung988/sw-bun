// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { Instagram, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { id: "why", label: "Proč" },
    { id: "o-nas", label: "O nás" },
    { id: "sluzby", label: "Služby" },
    { id: "poukazy", label: "Poukazy" },
    { id: "kontakt", label: "Kontakt" },
  ];

  // Smooth scroll handler
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    
    if (id === "home") {
      const homeElement = document.getElementById("home");
      if (homeElement) {
        homeElement.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    
    // Close mobile menu after click
    setMenuOpen(false);
  };

  // Scroll spy using Intersection Observer
  useEffect(() => {
    const sectionIds = ["home", "why", "o-nas", "sluzby", "poukazy", "kontakt"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most visible section
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/60 py-4 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Domů" className="group">
          <div className="relative h-12 w-12 md:h-14 md:w-14">
            <Image
              src="/logo.svg"
              alt="SW Beauty"
              fill
              className="object-contain group-hover:opacity-80 transition-opacity"
              priority
            />
          </div>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-6 text-neutral-800">
          {links.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={(e) => handleScroll(e, link.id)}
                aria-label={link.label}
                aria-current={activeSection === link.id ? "page" : undefined}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection === link.id
                    ? "bg-neutral-900 text-white shadow-sm"
                    : "hover:bg-neutral-100"
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="https://www.instagram.com/swbeautysalons/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full hover:bg-neutral-100 transition-all duration-300"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-neutral-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3 text-neutral-800">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleScroll(e, link.id)}
              aria-label={link.label}
              aria-current={activeSection === link.id ? "page" : undefined}
              className={`block px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                activeSection === link.id
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "hover:bg-neutral-100"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://www.instagram.com/swbeautysalons/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-neutral-100 transition-all duration-300"
          >
            <Instagram className="w-5 h-5" />
            <span className="text-sm">Instagram</span>
          </a>
        </div>
      )}
    </nav>
  );
}
