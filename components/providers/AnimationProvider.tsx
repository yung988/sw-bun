'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { animate, inView, scroll } from 'motion';

export default function AnimationProvider({ children }: { children: React.ReactNode }) {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // GSAP Setup
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.lagSmoothing(0);

    // Hero parallax
    const heroVideo = document.querySelector('header video');
    if (heroVideo) {
      scroll(animate(heroVideo, {
        transform: ["translateY(0%)", "translateY(20%)"]
      }), {
        target: document.querySelector("header") as Element,
        offset: ["start start", "end start"]
      });
    }

    // Other animations...
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}