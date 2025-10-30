"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
// Images are passed from the server to avoid referencing removed files

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type CategoryInput = {
  id: string;
  slug: string;
  name: string;
  description: string;
  priceRange: string;
  serviceCount: number;
};

const gradientColors = [
  "from-blue-500/20 to-cyan-500/20",
  "from-purple-500/20 to-pink-500/20",
  "from-rose-500/20 to-orange-500/20",
  "from-amber-500/20 to-yellow-500/20",
  "from-green-500/20 to-emerald-500/20",
  "from-red-500/20 to-pink-500/20",
  "from-pink-500/20 to-rose-500/20",
  "from-slate-500/20 to-gray-500/20",
];

export default function HorizontalScrollSection({ categories, coversByCategory }: { categories: CategoryInput[], coversByCategory: Record<string, string> }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const cards = cardsRef.current;
    const cursor = cursorRef.current;

    if (!container || !cards) return;

    const ctx = gsap.context(() => {
      // Calculate total width
      const totalWidth = cards.scrollWidth;
      const containerWidth = container.offsetWidth;
      const scrollDistance = totalWidth - containerWidth;

      // Horizontal scroll animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          pin: true,
          scrub: 1,
          start: "center center",
          end: () => `+=${scrollDistance * 1.5}`,
          anticipatePin: 1,
        },
      });

      // Horizontal movement
      tl.to(cards, {
        xPercent: -((scrollDistance / totalWidth) * 100),
        ease: "none",
      });

      // Staggered reveal animations for cards
      const cardElements = cards.querySelectorAll(".service-card");
      cardElements.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: tl,
              start: "left 80%",
              end: "left 50%",
              scrub: 1,
            },
          },
        );

        // Zoom effect on active card
        gsap.to(card, {
          scale: 1.02,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: "left 60%",
            end: "right 40%",
            scrub: 1,
          },
        });
      });
    });

    // Custom cursor
    const handleMouseMove = (e: MouseEvent) => {
      if (!cursor || !container) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        gsap.to(cursor, {
          x: x,
          y: y,
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.2,
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);

    return () => {
      ctx.revert();
      container.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Build card view models from categories
  const cards = (categories || []).map((c, idx) => ({
    title: c.name,
    slug: c.slug,
    claim: c.description,
    image: coversByCategory[c.id],
    color: gradientColors[idx % gradientColors.length],
  }));

  if (!cards.length) return null;

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-[70vh] bg-white overflow-hidden cursor-none"
    >
      {/* Header */}
      <div className="absolute top-10 left-10 z-20 text-slate-900">
        <div>
          <p className="text-sm uppercase tracking-wider text-slate-500 mb-2">
            Naše služby
          </p>
          <h2 className="text-4xl md:text-5xl font-light">
            Objevte <span className="font-serif italic">dokonalost</span>
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            Scroll horizontálně →
          </p>
        </div>
      </div>

      {/* Cards Container */}
      <div
        ref={cardsRef}
        className="absolute inset-0 flex items-center gap-8 px-12"
        style={{
          width: `${cards.length * 36}vw`,
        }}
      >
        {cards.map((category, index) => (
          <Link
            key={category.slug}
            href={`/sluzby/${category.slug}`}
            className="service-card relative flex-shrink-0 group"
            style={{
              width: "32vw",
              height: "60vh",
              clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            }}
          >
            {/* Card Content */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="absolute inset-0">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 32vw, (min-width: 1024px) 40vw, 100vw"
                  priority={index === 0}
                />
              </div>

              {/* Subtle light overlay for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                {/* Number */}
                <div className="text-slate-200 text-7xl md:text-8xl font-light mb-4 font-serif">
                  0{index + 1}
                </div>

                {/* Title */}
                <h3 className="text-4xl md:text-5xl font-light text-slate-900 mb-4 group-hover:translate-x-2 transition-transform duration-300">
                  {category.title}
                </h3>

                {/* Claim */}
                <p className="text-lg text-slate-700 mb-8 max-w-md leading-relaxed">
                  {category.claim}
                </p>

                {/* CTA */}
                <div className="inline-flex items-center gap-2 text-slate-900 group-hover:gap-4 transition-all duration-300">
                  <span className="text-sm font-medium uppercase tracking-wider">
                    Zjistit více
                  </span>
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-3xl border border-slate-200 group-hover:border-slate-300 transition-colors duration-300" />
            </div>
          </Link>
        ))}
      </div>

      {/* Custom Cursor */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 opacity-0"
        style={{
          width: "80px",
          height: "80px",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative w-full h-full">
          <div className="absolute inset-0 rounded-full bg-slate-900/10 backdrop-blur-sm flex items-center justify-center">
            <span className="text-slate-900 text-xs font-medium uppercase tracking-wider">
              Drag
            </span>
          </div>
          <div className="absolute inset-0 rounded-full border border-slate-400/40 animate-ping" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 right-10 text-slate-600 text-sm flex items-center gap-2">
        <span>Scroll</span>
        <svg
          className="w-4 h-4 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </div>
    </section>
  );
}
