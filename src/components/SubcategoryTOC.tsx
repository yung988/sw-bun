"use client";

import { useEffect, useState } from "react";

type Subcategory = {
  id: string;
  name: string;
  serviceCount: number;
};

export default function SubcategoryTOC({ subcategories }: { subcategories: Subcategory[] }) {
  const [active, setActive] = useState<string | null>(subcategories[0]?.id ?? null);

  useEffect(() => {
    const handler = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      }
    };

    const observer = new IntersectionObserver(handler, {
      root: null,
      threshold: 0.4,
      rootMargin: "-64px 0px -60% 0px",
    });

    subcategories.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [subcategories]);

  return (
    <nav aria-label="Navigace podkategorií" className="space-y-2" role="navigation">
      {subcategories.map((s) => {
        const isActive = active === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`Přejít na podkategorii ${s.name}`}
            aria-current={isActive ? "true" : undefined}
            className={
              "block rounded-lg px-3 py-2 text-sm transition-colors " +
              (isActive
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-50 hover:text-slate-900")
            }
          >
            <span className="inline-flex items-center gap-2">
              <span>{s.name}</span>
              <span className={isActive ? "text-white/80" : "text-slate-400"}>({s.serviceCount})</span>
            </span>
          </a>
        );
      })}
    </nav>
  );
}

