"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useBrand } from "./BrandProvider";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { logoSrc } = useBrand();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Domů" },
    { href: "/sluzby", label: "Služby" },
    { href: "/cenik", label: "Ceník" },
    { href: "/kontakt", label: "Kontakt" },
  ];

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-full z-50"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
          <motion.div
            animate={{
              backgroundColor: scrolled
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(255, 255, 255, 0.3)",
            }}
            transition={{ duration: 0.3 }}
            className={`
              relative overflow-hidden rounded-full
              backdrop-blur-3xl backdrop-saturate-150
              border border-black/5
              shadow-[0_8px_32px_rgba(0,0,0,0.08)]
              ${scrolled ? "shadow-[0_12px_40px_rgba(0,0,0,0.12)]" : ""}
            `}
            style={{
              boxShadow: scrolled
                ? "0 12px 40px rgba(0,0,0,0.12), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.05)"
                : "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 1px rgba(0,0,0,0.05)",
            }}
          >
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/30 to-white/10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

            <div className="relative flex items-center px-4 sm:px-6 py-2">
              {/* Logo - vlevo */}
              <Link href="/" className="relative z-10 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center"
                >
                  <Image
                    src={logoSrc}
                    alt="SW Beauty"
                    width={70}
                    height={70}
                    className="transition-all duration-500"
                    priority
                  />
                </motion.div>
              </Link>

              {/* Spacer - zabere zbytek místa */}
              <div className="flex-1" />

              {/* Desktop Navigation - zprava */}
              <div className="hidden lg:flex items-center gap-1 mr-4">
                {links.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href}>
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative px-4 py-1.5 rounded-full text-[14px] font-medium transition-all duration-300 ${
                          isActive
                            ? "bg-white/20 text-white shadow-sm backdrop-blur-sm"
                            : "text-white/80 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {link.label}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* CTA Buttons - úplně vpravo */}
              <div className="hidden lg:flex items-center gap-2 flex-shrink-0">
                <Link href="/kontakt">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-1.5 rounded-full text-[14px] font-medium border border-white/20 text-white/90 hover:border-white/30 hover:bg-white/10 transition-all duration-300"
                  >
                    Rezervace
                  </motion.button>
                </Link>
                <Link href="/kontakt">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-1.5 rounded-full text-[14px] font-medium bg-white/20 text-white hover:bg-white/30 transition-all duration-300 shadow-sm backdrop-blur-sm"
                  >
                    +420 773 577 899
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/10 backdrop-blur-md" />

            {/* Menu Content */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-20 left-4 right-4 bg-black/70 backdrop-blur-3xl rounded-2xl shadow-lg p-5 border border-white/10"
              style={{
                boxShadow:
                  "0 12px 40px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -1px 1px rgba(0,0,0,0.2)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Glassmorphism overlay for mobile menu */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10 pointer-events-none rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none rounded-2xl" />

              <nav className="relative space-y-1">
                {links.map((link, index) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link href={link.href}>
                        <div
                          className={`block px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                            isActive
                              ? "bg-white/20 text-white shadow-sm backdrop-blur-sm"
                              : "text-white/80 hover:bg-white/10 hover:text-white"
                          }`}
                        >
                          {link.label}
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Mobile CTA */}
              <div className="relative mt-5 pt-5 border-t border-white/10 space-y-2">
                <Link href="/kontakt">
                  <button className="w-full px-4 py-2.5 rounded-xl text-[14px] font-medium border border-white/20 text-white/90 hover:bg-white/10 transition-all">
                    Rezervovat termín
                  </button>
                </Link>
                <a href="tel:+420773577899">
                  <button className="w-full px-4 py-2.5 rounded-xl text-[14px] font-medium bg-white/20 text-white hover:bg-white/30 transition-all shadow-sm backdrop-blur-sm">
                    +420 773 577 899
                  </button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}