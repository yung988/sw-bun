"use client";
import Image from "next/image";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import WordReveal from "@/components/animations/WordReveal";
import { useIntroCompleteContext } from "@/components/IntroProvider";
import gsap from "gsap";

type HeroProps = {
  title: string;
  titleItalic: string;
  subtitle: string;
  trustedText: string;
  trustedCount: string;
  avatars: string[];
  videos?: string[];
};

export default function Hero({
  title,
  titleItalic,
  subtitle,
  trustedText,
  trustedCount,
  avatars,
  videos = [],
}: HeroProps) {
  const [introComplete] = useIntroCompleteContext();
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const trustedRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const videoList = useMemo<string[]>(
    () => (videos && videos.length ? videos : ["/movies/video-recepce.mp4"]),
    [videos],
  );

  const [index, setIndex] = useState(0);
  const [currentSrc, setCurrentSrc] = useState<string>(videoList[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    return () => {
      if (fadeTimeoutRef.current) {
        clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!introComplete) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let isVisible = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        if (!videoRef.current) return;
        if (isVisible) {
          const p = videoRef.current.play();
          if (p && typeof p.catch === "function") p.catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: [0, 0.5, 1] },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    const triggerFade = () => {
      setFade(true);
      if (fadeTimeoutRef.current) clearTimeout(fadeTimeoutRef.current);
      fadeTimeoutRef.current = setTimeout(() => setFade(false), 500);
    };

    const scheduleNext = () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (videoList.length <= 1) return;
      const delay = 7000 + Math.floor(Math.random() * 5000);
      timeoutId = setTimeout(() => {
        if (!isVisible) {
          scheduleNext();
          return;
        }

        triggerFade();

        setIndex((prev) => {
          if (videoList.length <= 1) return prev;
          let next = prev;
          for (let tries = 0; tries < 6; tries += 1) {
            const candidate = Math.floor(Math.random() * videoList.length);
            if (candidate !== prev) {
              next = candidate;
              break;
            }
          }
          return next;
        });

        scheduleNext();
      }, delay);
    };

    const playInitial = () => {
      if (!videoRef.current) return;
      const p = videoRef.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    playInitial();
    scheduleNext();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [introComplete, videoList]);

  // Při výměně zdroje přehrát
  useEffect(() => {
    setIndex(0);
    setCurrentSrc(videoList[0]);
  }, [videoList]);

  useEffect(() => {
    const src = videoList[index] ?? videoList[0];
    setCurrentSrc(src);
  }, [index, videoList]);

  useEffect(() => {
    if (!videoRef.current) return;
    try {
      videoRef.current.src = currentSrc;
      if (introComplete) {
        videoRef.current.load();
        const playPromise = videoRef.current.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {});
        }
      }
    } catch (_) {
      // no-op
    }
  }, [currentSrc, introComplete]);

  useEffect(() => {
    if (!videoRef.current) return;
    if (!introComplete) {
      videoRef.current.pause();
    }
  }, [introComplete]);

  useLayoutEffect(() => {
    if (!introComplete) return;

    const ctx = gsap.context(() => {
      const targets = [
        videoWrapperRef.current,
        titleGroupRef.current,
        subtitleRef.current,
        trustedRef.current,
      ].filter(Boolean) as HTMLElement[];

      if (targets.length) {
        gsap.set(targets, { autoAlpha: 0, y: 48 });
      }
      if (videoWrapperRef.current) {
        gsap.set(videoWrapperRef.current, { scale: 1.05, autoAlpha: 0 });
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 0.9 },
        delay: 0.15,
        onComplete: () => {
          if (typeof window !== "undefined") {
            window.__heroIntroReady = true;
            window.dispatchEvent(new Event("hero:intro:ready"));
          }
        },
      });

      if (videoWrapperRef.current) {
        tl.to(videoWrapperRef.current, { autoAlpha: 1, y: 0, scale: 1, duration: 1 }, 0);
      }
      if (titleGroupRef.current) {
        tl.to(titleGroupRef.current, { autoAlpha: 1, y: 0 }, "-=0.5");
      }
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { autoAlpha: 1, y: 0 }, "-=0.45");
      }
      if (trustedRef.current) {
        tl.to(trustedRef.current, { autoAlpha: 1, y: 0 }, "-=0.4");
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [introComplete]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="mx-auto max-w-[1250px] px-6 py-16 md:py-24 lg:py-28"
    >
      {/* Top Content - 3 Columns */}
      <div className="grid gap-12 lg:grid-cols-3 lg:gap-16 mb-20 lg:mb-24">
        {/* Column 1: Title */}
        <div
          ref={titleGroupRef}
          className="lg:col-span-1"
          style={{ opacity: introComplete ? undefined : 0 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-light leading-[1.15] tracking-tight text-slate-900">
            <WordReveal className="inline-block align-baseline" stagger={0.06}>
              {title}
            </WordReveal>{" "}
            <WordReveal className="inline-block align-baseline italic font-serif font-normal" stagger={0.08}>
              {titleItalic}
            </WordReveal>
          </h1>
        </div>

        {/* Column 2: Subtitle */}
        <div
          ref={subtitleRef}
          className="lg:col-span-1 flex items-center"
          style={{ opacity: introComplete ? undefined : 0 }}
        >
          <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-md">
            {subtitle}
          </p>
        </div>

        {/* Column 3: Trusted */}
        <div
          ref={trustedRef}
          className="lg:col-span-1 flex items-center lg:justify-end"
          style={{ opacity: introComplete ? undefined : 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {avatars.map((avatar, index) => (
                <div
                  key={avatar}
                  className="relative h-12 w-12 overflow-hidden rounded-full border-[3px] border-white shadow-md transition-transform hover:scale-110 hover:z-10"
                >
                  <Image
                    src={avatar}
                    alt={`Zákazník ${index + 1}`}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm text-slate-500 leading-tight">
                {trustedText}
              </p>
              <p className="text-lg font-semibold text-slate-900">
                {trustedCount}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Video */}
      <div
        ref={videoWrapperRef}
        className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-slate-100 shadow-2xl border border-slate-200/50"
        style={{ opacity: introComplete ? undefined : 0 }}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="metadata"
          poster="/images/salon/recepce.jpg"
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
          onError={(e) => {
            console.error("Video failed to load:", e);
            e.currentTarget.style.display = "none";
          }}
        />
        {/* Crossfade overlay */}
        {fade && <div className="absolute inset-0 bg-black/20 animate-[fade_0.6s_ease] pointer-events-none" />}
        {/* Jemný overlay pro lepší kontrast textu, pokud je potřeba */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
