"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import PageTransition from "./PageTransition";

type MainContentProps = {
  children: React.ReactNode;
};

export default function MainContent({ children }: MainContentProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);

  return <PageTransition>{children}</PageTransition>;
}
