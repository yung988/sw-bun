"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import { useIntroCompleteContext } from "@/components/IntroProvider";

// Safe to register multiple times; GSAP ignores duplicates
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

const COUNTS = ["00", "27", "65", "98", "99"];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setIntroComplete] = useIntroCompleteContext();

  useLayoutEffect(() => {
    if (!isVisible || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        delay: 0.2,
        defaults: { ease: "hop" },
        onComplete: () => {
          setIntroComplete(true);
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            pointerEvents: "none",
            onComplete: () => setIsVisible(false),
          });
        },
      });

      const counts = gsap.utils.toArray<HTMLElement>(".count");

      counts.forEach((count, index) => {
        const digits = count.querySelectorAll(".digit h1");
        tl.to(
          digits,
          {
            y: "0%",
            duration: 1,
            stagger: 0.075,
          },
          index,
        );

        if (index < counts.length - 1) {
          tl.to(
            digits,
            {
              y: "-100%",
              duration: 1,
              stagger: 0.075,
            },
            index + 1,
          );
        }
      });

      tl.to(".spinner", { opacity: 0, duration: 0.3 });

      tl.to(".logo-fragment", { y: "0%", duration: 1 }, "<");

      tl.to(".divider", {
        scaleY: 1,
        duration: 1,
        transformOrigin: "center top",
        onComplete: () => {
          gsap.to(".divider", { opacity: 0, duration: 0.4, delay: 0.3 });
        },
      });

      tl.to(".logo-fragment--left", { y: "100%", duration: 1, delay: 0.3 });
      tl.to(".logo-fragment--right", { y: "-100%", duration: 1 }, "<");

      tl.to(".block", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.12,
        delay: 0.75,
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="loader fixed inset-0 z-[9999] overflow-hidden bg-neutral-900 text-white"
      aria-hidden="true"
    >
      <div className="overlay absolute inset-0 flex">
        <div
          className="block flex-1 bg-neutral-900"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />
        <div
          className="block flex-1 bg-neutral-900"
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
        />
      </div>

      <div className="intro-logo absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5">
        <div id="word-1" className="word relative -left-2 overflow-hidden pr-1">
          <div className="logo-fragment logo-fragment--left translate-y-full">
            <img
              src="/logo.svg"
              alt="S"
              className="h-[110px] w-auto md:h-[150px] lg:h-[180px] object-contain [clip-path:inset(0_50%_0_0)]"
            />
          </div>
        </div>
        <div id="word-2" className="word overflow-hidden">
          <div className="logo-fragment logo-fragment--right -translate-y-full">
            <img
              src="/logo.svg"
              alt="W"
              className="h-[110px] w-auto md:h-[150px] lg:h-[180px] object-contain [clip-path:inset(0_0_0_50%)]"
            />
          </div>
        </div>
      </div>

      <div
        className="divider absolute left-1/2 top-0 h-full w-px bg-white"
        style={{ transform: "translateX(-50%) scaleY(0)", transformOrigin: "center top" }}
      />

      <div className="spinner-container absolute bottom-[10%] left-1/2 -translate-x-1/2">
        <div className="spinner h-12 w-12 rounded-full border border-white border-t-white/20" />
      </div>

      <div className="counter pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        {COUNTS.map((sequence, sequenceIndex) => (
          <div
            key={`${sequence}-${sequenceIndex}`}
            className="count absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2"
          >
            {sequence.split("").map((digit, digitIndex) => (
              <div key={`${sequence}-${digit}-${digitIndex}`} className="digit overflow-hidden pt-4">
                <h1 className="translate-y-full text-[9rem] font-serif font-light text-white md:text-[13rem] lg:text-[15rem]">
                  {digit}
                </h1>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
