'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type ServiceCategory = {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceRange: string;
  serviceCount: number;
};

type Props = {
  categories: ServiceCategory[];
  coversByCategory: Record<string, string>;
};

export default function ScrollGalleryEffect({ categories, coversByCategory }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const scalerRef = useRef<HTMLDivElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const services = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description,
    image: coversByCategory[c.id] || '/images/salon/recepce.jpg',
  }));

  // Zajistíme minimálně 15 služeb pro správné zobrazení (duplikovat pokud je jich méně)
  const allServices = [...services];
  while (allServices.length < 15) {
    allServices.push(...services.slice(0, Math.min(services.length, 15 - allServices.length)));
  }

  // Rozdělení do vrstev přesně jako v původním kódu
  const layer1 = allServices.slice(0, 6);   // 6 obrázků v krajních sloupcích
  const layer2 = allServices.slice(6, 12);  // 6 obrázků v prostředních sloupcích
  const layer3 = allServices.slice(12, 14); // 2 obrázky ve středním sloupci
  const centerImage = allServices[14] || allServices[0]; // Centrální obrázek

  useEffect(() => {
    if (!sectionRef.current || !scalerRef.current) return;

    const ctx = gsap.context(() => {
      // Nadpis animace
      if (headingRef.current) {
        gsap.to(headingRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 20%',
            end: 'top top',
            scrub: 1,
          },
          opacity: 0,
          scale: 0.8,
          y: -50,
        });
      }

      // Centrální obrázek - scaling efekt přesně jako v originálu
      const scalerImg = scalerRef.current!.querySelector('img');
      if (scalerImg) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'top -80%',
            scrub: 1,
          },
        })
          .from(scalerImg, {
            height: window.innerHeight - 64,
            ease: 'power1.inOut',
          }, 0)
          .from(scalerImg, {
            width: window.innerWidth - 64,
            ease: 'power2.inOut',
          }, 0);
      }

      // Vrstva 1 - fade + reveal
      if (layer1Ref.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top -20%',
            end: 'top -60%',
            scrub: 1,
          },
        })
          .from(layer1Ref.current, {
            opacity: 0,
            ease: 'sine.out',
          }, 0)
          .from(layer1Ref.current, {
            scale: 0,
            ease: 'power1.out',
          }, 0);
      }

      // Vrstva 2 - fade + reveal (s jiným easingem)
      if (layer2Ref.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top -30%',
            end: 'top -70%',
            scrub: 1,
          },
        })
          .from(layer2Ref.current, {
            opacity: 0,
            ease: 'sine.out',
          }, 0)
          .from(layer2Ref.current, {
            scale: 0,
            ease: 'power3.out',
          }, 0);
      }

      // Vrstva 3 - fade + reveal (s nejpomalejším easingem)
      if (layer3Ref.current) {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top -40%',
            end: 'top -80%',
            scrub: 1,
          },
        })
          .from(layer3Ref.current, {
            opacity: 0,
            ease: 'sine.out',
          }, 0)
          .from(layer3Ref.current, {
            scale: 0,
            ease: 'power4.out',
          }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (!services.length) return null;

  return (
    <div className="bg-white">
      {/* Hero nadpis */}
      <header className="min-h-screen flex items-center justify-center px-8">
        <h1 className="font-display font-light text-6xl md:text-8xl lg:text-9xl text-slate-900 text-left leading-[0.8] tracking-tight">
          let&apos;s<br />scroll.
        </h1>
      </header>

      {/* Hlavní scroll sekce */}
      <section ref={sectionRef} className="min-h-[240vh] relative bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Dekorativní grid pozadí */}
        <div 
          className="fixed inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '45px 45px',
            maskImage: 'linear-gradient(-20deg, transparent 50%, white)',
          }}
        />

        {/* Sticky content */}
        <div className="sticky top-0 min-h-screen w-full flex items-center overflow-hidden">
          {/* Floating nadpis */}
          <h2
            ref={headingRef}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 font-display font-light text-5xl md:text-7xl lg:text-8xl text-slate-900 text-center tracking-tight leading-[0.85] pointer-events-none"
          >
            Naše<br />služby
          </h2>

          <div className="w-full max-w-[1600px] mx-auto px-8">
            {/* Hlavní grid container */}
            <div className="grid grid-cols-5 grid-rows-3 gap-[clamp(10px,7.35vw,80px)] items-center">
              
              {/* Vrstva 1 - krajní sloupce */}
              <div ref={layer1Ref} className="contents">
                {layer1.map((service, idx) => (
                  <div
                    key={`l1-${idx}`}
                    className={idx % 2 === 0 ? 'col-start-1' : 'col-start-5'}
                    style={{ gridRow: Math.floor(idx / 2) + 1 }}
                  >
                    <ServiceCard service={service} priority={idx < 2} />
                  </div>
                ))}
              </div>

              {/* Vrstva 2 - prostřední sloupce */}
              <div ref={layer2Ref} className="contents">
                {layer2.map((service, idx) => (
                  <div
                    key={`l2-${idx}`}
                    className={idx % 2 === 0 ? 'col-start-2' : 'col-start-4'}
                    style={{ gridRow: Math.floor(idx / 2) + 1 }}
                  >
                    <ServiceCard service={service} priority={false} />
                  </div>
                ))}
              </div>

              {/* Vrstva 3 - střední sloupec (horní a dolní) */}
              <div ref={layer3Ref} className="contents">
                {layer3.map((service, idx) => (
                  <div
                    key={`l3-${idx}`}
                    className="col-start-3"
                    style={{ gridRow: idx === 0 ? 1 : 3 }}
                  >
                    <ServiceCard service={service} priority={false} />
                  </div>
                ))}
              </div>

              {/* Centrální scaler obrázek */}
              <div
                ref={scalerRef}
                className="col-start-3 row-start-2 relative z-20"
              >
                <Link href={`/sluzby/${centerImage.slug}`} className="block group">
                  <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                    <Image
                      src={centerImage.image}
                      alt={centerImage.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      priority
                      sizes="(max-width: 768px) 80vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                      <h3 className="font-display text-2xl lg:text-3xl font-light text-white mb-2 tracking-tight leading-tight">
                        {centerImage.name}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed line-clamp-2 mb-4">
                        {centerImage.description}
                      </p>
                      <div className="inline-flex items-center gap-2 text-xs font-medium text-white uppercase tracking-wider group-hover:gap-3 transition-all">
                        <span>Zjistit více</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4-4 4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Finální sekce */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <h2 className="font-display font-light text-5xl md:text-7xl lg:text-8xl text-slate-900 tracking-tight">
          fin.
        </h2>
      </section>

      {/* Footer */}
      <footer className="sticky bottom-0 -z-10 p-16 text-center bg-slate-900 text-white">
        <span aria-hidden="true" className="inline-flex items-center gap-1">
          ʕ<span className="inline-block">ノ</span>•ᴥ•ʔ<span className="inline-block">ノ</span>
          {' '}<span className="inline-block"><span>︵</span></span>{' '}
          <span className="inline-block">┻━┻</span>
        </span>
        &nbsp;&copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

// Komponenta pro kartu služby
function ServiceCard({
  service,
  priority,
}: {
  service: { id: string; slug: string; name: string; description: string; image: string };
  priority: boolean;
}) {
  return (
    <Link href={`/sluzby/${service.slug}`} className="block group">
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={priority}
          sizes="(max-width: 768px) 50vw, 20vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h4 className="text-white font-display text-lg font-light mb-1">{service.name}</h4>
          <p className="text-white/80 text-xs line-clamp-2">{service.description}</p>
        </div>
      </div>
    </Link>
  );
}