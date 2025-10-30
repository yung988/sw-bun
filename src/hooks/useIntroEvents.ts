"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    __introComplete?: boolean;
    __heroIntroReady?: boolean;
  }
}

export function useIntroComplete(): boolean {
  const [introComplete, setIntroComplete] = useState<boolean>(
    () => (typeof window !== "undefined" ? Boolean(window.__introComplete) : false),
  );

  useEffect(() => {
    const handler = () => {
      window.__introComplete = true;
      setIntroComplete(true);
    };

    window.addEventListener("intro:complete", handler);

    return () => {
      window.removeEventListener("intro:complete", handler);
    };
  }, []);

  return introComplete;
}

export function useHeroIntroReady(): boolean {
  const [ready, setReady] = useState<boolean>(
    () => (typeof window !== "undefined" ? Boolean(window.__heroIntroReady) : false),
  );

  useEffect(() => {
    const handler = () => {
      window.__heroIntroReady = true;
      setReady(true);
    };

    window.addEventListener("hero:intro:ready", handler);

    return () => {
      window.removeEventListener("hero:intro:ready", handler);
    };
  }, []);

  return ready;
}

