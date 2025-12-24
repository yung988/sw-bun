"use client"

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function HeroSection({ onOpenBooking }: { onOpenBooking: () => void }) {
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Responsive video loading: faster for mobile, slower for desktop
    const isMobile = window.innerWidth < 1024;
    const delay = isMobile ? 0 : 300; // Mobile: 0ms for better SI, Desktop: 300ms for CLS

    const timer = setTimeout(() => {
      setVideoLoaded(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);
  return (
    <header
      className="relative w-full flex flex-col pt-16 lg:pt-0 lg:flex-row lg:items-center overflow-hidden bg-transparent"
      style={{ minHeight: "100dvh" }}
    >
      {/* Mobile: Poster Image or Video */}
      {!videoLoaded ? (
        <div className="absolute inset-0 -z-10 lg:hidden">
          <Image
            src="/images/hero-image.jpg"
            alt="SW Beauty"
            fill
            priority
            quality={85}
            className="object-cover object-center"
          />
        </div>
      ) : (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster="/images/hero-image.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center -z-10 lg:hidden"
        >
          <source src="/images/hero_1_mobile.mp4" type="video/mp4" />
          Váš prohlížeč nepodporuje video.
        </video>
      )}

      {/* Mobile: Dark overlay */}
      <div className="absolute inset-0 bg-black/30 -z-[5] lg:hidden" />

      {/* Mobile: Content wrapper - above video */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 flex flex-col px-6 lg:hidden"
        style={{ paddingBottom: "max(5rem, env(safe-area-inset-bottom, 5rem))" }}
      >
        <h1 className="text-5xl leading-[1.1] font-medium text-white tracking-tighter font-cormorant mb-6">
          Místo, kde se vnější krása spojí s <em className="italic">vnitřní</em>.
        </h1>

        <button
          onClick={onOpenBooking}
          className="w-full text-center bg-white text-stone-900 px-4 py-4 hover:bg-stone-100 active:bg-stone-200 transition-colors duration-300 font-geist text-sm md:text-xs tracking-widest uppercase min-h-[52px]"
        >
          Rezervovat termín
        </button>
      </div>

      {/* Mobile: Spacer for document flow */}
      <div className="lg:hidden w-full" style={{ minHeight: "100dvh" }} />

      {/* TABLET Layout (1024px - 1280px) */}
      <div className="hidden lg:flex xl:hidden max-w-screen-xl mx-auto w-full h-full flex-row items-center flex-1">
        {/* Text Content - Tablet */}
        <div className="w-1/2 flex flex-col justify-center px-8">
          <h1 className="text-left text-5xl leading-[1.1] font-medium text-stone-900 tracking-tighter font-cormorant mb-8">
            Místo, kde se vnější krása spojí s vnitřní.
          </h1>

          <div className="flex flex-row gap-4">
            <button
              onClick={onOpenBooking}
              className="min-w-[160px] text-center bg-stone-900 text-white px-6 py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-sm tracking-widest uppercase"
            >
              Rezervovat termín
            </button>
            <a
              href="#sluzby"
              className="min-w-[160px] text-center border border-stone-300 text-stone-900 px-6 py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-sm tracking-widest uppercase"
            >
              Prohlédnout služby
            </a>
          </div>
        </div>

        {/* Video Content - Tablet */}
        <div className="w-1/2 flex items-center justify-center py-24 pr-8">
          <div className="w-full max-w-sm aspect-[2/3] shadow-2xl overflow-hidden bg-stone-100">
            {videoLoaded ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/images/hero-image.jpg"
                className="w-full h-full object-cover object-center opacity-90 animate-fade-in-up"
              >
                <source src="/images/hero_1.mp4" type="video/mp4" />
                Váš prohlížeč nepodporuje video.
              </video>
            ) : (
              <Image
                src="/images/hero-image.jpg"
                alt="SW Beauty"
                fill
                priority
                className="object-cover object-center opacity-90"
              />
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP Layout (1280px+) */}
      <div className="hidden xl:flex max-w-screen-2xl mx-auto w-full h-full flex-row items-center flex-1">
        {/* Text Content - Desktop */}
        <div className="w-5/12 flex flex-col justify-center px-12">
          <h1 className="text-left text-6xl xl:text-7xl leading-[1.1] font-medium text-stone-900 tracking-tighter font-cormorant mb-8">
            Místo, kde se vnější krása spojí s vnitřní.
          </h1>

          <div className="flex flex-row gap-4">
            <button
              onClick={onOpenBooking}
              className="min-w-[180px] text-center bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors duration-300 font-geist text-sm tracking-widest uppercase"
            >
              Rezervovat termín
            </button>
            <a
              href="#sluzby"
              className="min-w-[180px] text-center border border-stone-300 text-stone-900 px-8 py-4 hover:border-stone-900 transition-colors duration-300 font-geist text-sm tracking-widest uppercase"
            >
              Prohlédnout služby
            </a>
          </div>
        </div>

        {/* Video Content - Desktop */}
        <div className="w-7/12 flex items-center justify-center py-32 pr-16">
          <div className="w-full max-w-md aspect-[2/3] shadow-2xl overflow-hidden bg-stone-100">
            {videoLoaded ? (
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                poster="/images/hero-image.jpg"
                className="w-full h-full object-cover object-center opacity-90 animate-fade-in-up"
              >
                <source src="/images/hero_1.mp4" type="video/mp4" />
                Váš prohlížeč nepodporuje video.
              </video>
            ) : (
              <Image
                src="/images/hero-image.jpg"
                alt="SW Beauty"
                fill
                priority
                className="object-cover object-center opacity-90"
              />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
