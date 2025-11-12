'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Data služeb (převzato z vašeho vstupu)
const services = [
  {
    id: 'hifu-facelift',
    name: 'HIFU Facelift',
    slug: 'hifu-facelift',
    image: '/images/hifu/hifu-oblicej.jpeg'
  },
  {
    id: 'endos',
    name: 'Endos-roller',
    slug: 'endos',
    image: '/images/endos/endos-1.jpeg'
  },
  {
    id: 'ems',
    name: 'Budování svalů',
    slug: 'ems',
    image: '/images/ems/budovani-svalu-1.jpeg'
  },
  {
    id: 'kavitace',
    name: 'Kavitace',
    slug: 'kavitace',
    image: '/images/kavitace/kavitace-1.jpeg'
  },
  {
    id: 'lpg',
    name: 'LPG endermologie',
    slug: 'lpg',
    image: '/images/lpg/lpg-1.jpg'
  },
  {
    id: 'kosmetika',
    name: 'Kosmetika',
    slug: 'kosmetika',
    image: '/images/kosmetika/hydratational-1.jpg'
  },
  {
    id: 'kosmetika-osetreni',
    name: 'Klasická kosmetika',
    slug: 'kosmetika-osetreni',
    image: '/images/kosmetika/hydratational-3.jpg'
  },
  {
    id: 'dermapen',
    name: 'Dermapen',
    slug: 'dermapen',
    image: '/images/kosmetika/Kosmetika Detail 2.jpeg'
  },
  {
    id: 'oboci-a-rasy',
    name: 'Obočí a řasy',
    slug: 'oboci-a-rasy',
    image: '/images/kosmetika/rasy-1.jpg'
  }
];

// GSAP fallback pro nepodporující prohlížeče
let gsapRegistered = false;

export default function ScrollGalleryEffect() {
  const sectionRef = useRef<HTMLElement>(null);
  const hasScrollSupportRef = useRef<boolean | null>(null);

  useEffect(() => {
    // Kontrola podpory CSS scroll-driven animations
    hasScrollSupportRef.current = CSS.supports(
      '(animation-timeline: view()) and (animation-range: 0 100%)'
    );

    if (!hasScrollSupportRef.current && !gsapRegistered) {
      // Dynamický import GSAP pouze pro nepodporující prohlížeče
      const initGSAP = async () => {
        const gsapModule = await import('gsap');
        const scrollTriggerModule = await import('gsap/ScrollTrigger');
        
        const gsap = gsapModule.default;
        gsap.registerPlugin(scrollTriggerModule.default);

        // Scaler animace
        gsap.fromTo('.scaler-img',
          { 
            width: 'calc(90vw - 2rem)',
            height: 'calc(90vh - 2rem)'
          },
          {
            scrollTrigger: {
              trigger: '.scroll-section',
              start: 'top -10%',
              end: 'bottom 80%',
              scrub: true,
            },
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power2.out'
          }
        );

        // Vrstvy animace
        const layers = document.querySelectorAll('.layer');
        layers.forEach((layer, index) => {
          const ease = index === 1 ? 'power3.out' : 'power4.out';
          
          gsap.fromTo(layer,
            { opacity: 0, scale: 0 },
            {
              scrollTrigger: {
                trigger: '.scroll-section',
                start: 'top -40%',
                end: 'bottom bottom',
                scrub: true,
              },
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: ease
            }
          );
        });

        gsapRegistered = true;
      };

      initGSAP();
    }

    // Cleanup
    return () => {
      if (typeof window !== 'undefined' && (window as any).gsap) {
        (window as any).gsap.killTweensOf('.scaler-img, .layer');
      }
    };
  }, []);

  // Centrální služba
  const centerService = services[0];
  // Rozdělení do vrstev (zachování původní struktury)
  const layer1 = services.slice(0, 2);
  const layer2 = services.slice(2, 4);
  const layer3 = services.slice(4, 6);
  const layer4 = services.slice(6, 8);
  const layer5 = services.slice(8, 9);

  return (
    <>
      {/* Hlavní scroll sekce */}
      <section 
        ref={sectionRef}
        className="scroll-section relative bg-gradient-to-br from-slate-50 via-white to-slate-100"
        style={{ minHeight: '240vh', viewTimeline: '--runner' as any }}
      >
        
        {/* Sticky container */}
        <div 
          className="content" 
          style={{ 
            minHeight: '100vh', 
            width: '100vw', 
            display: 'flex', 
            placeItems: 'center', 
            alignContent: 'center', 
            position: 'sticky', 
            top: 0,
            overflow: 'hidden'
          }}
        >
          
          {/* Grid container (5×3) */}
          <div className="grid" style={{ 
            width: '1600px',
            maxWidth: 'calc(100% - 4rem)',
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gridTemplateRows: 'repeat(3, auto)',
            gap: 'clamp(10px, 7.35vw, 40px)',
            margin: '0 auto',
            alignContent: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            
            {/* Vrstva 1 - 2 obrázky v prvním řádku */}
            <div className="layer" style={{ 
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow: '1',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows: 'subgrid'
            }}>
              {layer1.map((service) => (
                <div key={service.id} style={{ 
                  gridColumn: service === layer1[0] ? '1' : '-2',
                  gridRow: '1'
                }}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {/* Vrstva 2 - 2 obrázky v druhém řádku */}
            <div className="layer" style={{ 
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow: '2',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows: 'subgrid'
            }}>
              {layer2.map((service, i) => (
                <div key={service.id} style={{ 
                  gridColumn: i === 0 ? '2' : '-3',
                  gridRow: '2'
                }}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {/* Vrstva 3 - centrální obrázek + 2 vedlejší */}
            <div className="layer" style={{ 
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow: '2',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows: 'subgrid'
            }}>
              {/* Centrální scaler obrázek */}
              <div className="scaler" style={{ 
                gridColumn: '3',
                gridRow: '2',
                position: 'relative',
                width: '100%',
                height: '100%',
                zIndex: 2
              }}>
                <Link href={`/sluzby/${centerService.slug}`} className="block group" style={{ 
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%'
                }}>
                  <Image
                    src={centerService.image}
                    alt={centerService.name}
                    fill
                    className="scaler-img"
                    priority
                    sizes="(max-width: 768px) 90vw, 33vw"
                    style={{ 
                      objectFit: 'cover',
                      borderRadius: '1rem'
                    }}
                  />
                </Link>
              </div>

              {layer3.map((service) => (
                <div key={service.id} style={{ 
                  gridColumn: '1',
                  gridRow: '2'
                }}>
                  <ServiceCard service={service} />
                </div>
              ))}
              {layer4.map((service) => (
                <div key={service.id} style={{ 
                  gridColumn: '-1',
                  gridRow: '2'
                }}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {/* Vrstva 4 - 1 obrázek ve třetím řádku */}
            <div className="layer" style={{ 
              display: 'grid',
              gridColumn: '1 / -1',
              gridRow: '3',
              gridTemplateColumns: 'subgrid',
              gridTemplateRows: 'subgrid'
            }}>
              {layer5.map((service) => (
                <div key={service.id} style={{ 
                  gridColumn: '3',
                  gridRow: '3'
                }}>
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      <style jsx global>{`
        /* CSS variables a keyframes */
        :root {
          --gutter: 2rem;
          --gap: clamp(10px, 7.35vw, 40px);
          --power-1-out: linear(
            0 0%,
            0.0027 3.64%,
            0.0106 7.29%,
            0.0425 14.58%,
            0.0957 21.87%,
            0.1701 29.16%,
            0.2477 35.19%,
            0.3401 41.23%,
            0.5982 55.18%,
            0.7044 61.56%,
            0.7987 68.28%,
            0.875 75%,
            0.9297 81.25%,
            0.9687 87.5%,
            0.9922 93.75%,
            1 100%
          );
          --power-2-out: linear(
            0 0%,
            0.0036 9.62%,
            0.0185 16.66%,
            0.0489 23.03%,
            0.0962 28.86%,
            0.1705 34.93%,
            0.269 40.66%,
            0.3867 45.89%,
            0.5833 52.95%,
            0.683 57.05%,
            0.7829 62.14%,
            0.8621 67.46%,
            0.8991 70.68%,
            0.9299 74.03%,
            0.9545 77.52%,
            0.9735 81.21%,
            0.9865 85%,
            0.9949 89.15%,
            1 100%
          );
          --sine: linear(
            0 0%,
            0.2861 18.47%,
            0.4829 32.08%,
            0.6437 44.52%,
            0.7712 56.07%,
            0.8722 67.47%,
            0.9115 73.02%,
            0.9434 78.49%,
            0.9682 83.91%,
            0.9859 89.3%,
            0.9965 94.66%,
            1 100%
          );
        }

        @media (max-width: 600px) {
          :root {
            --gutter: 1rem;
          }
          /* Na mobilech 3 sloupce místo 5 */
          .grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
          .grid > .layer > div:nth-child(1) {
            display: none;
          }
        }

        /* Scroll-driven animations (moderní prohlížeče) */
        @supports (animation-timeline: view()) {
          .scroll-section {
            view-timeline-name: --runner;
          }

          .scaler-img {
            animation: scale-x 1s var(--power-2-out) both,
                       scale-y 1s var(--power-1-out) both;
            animation-timeline: --runner, --runner;
            animation-range: entry 100% exit -20%;
          }

          .layer {
            animation: fade 1s var(--sine) both,
                       reveal 1s var(--power-1-out) both;
            animation-timeline: --runner, --runner;
          }

          /* Stagger pro různé vrstvy */
          .layer:nth-of-type(1) {
            animation-range: entry 100% exit 0%;
          }
          .layer:nth-of-type(2) {
            animation-range: entry 100% exit -10%;
          }
          .layer:nth-of-type(3) {
            animation-range: entry 100% exit -20%;
          }
          .layer:nth-of-type(4) {
            animation-range: entry 100% exit -30%;
          }
        }

        /* Fallback pro starší prohlížeče - GSAP se o to postará */
        @supports not (animation-timeline: view()) {
          .layer {
            opacity: 0;
            transform: scale(0);
          }
          .scaler-img {
            width: calc(90vw - 2rem);
            height: calc(90vh - 2rem);
          }
        }

        /* Přechodové efekty pro hover */
        .scaler-img, .layer img {
          transition: transform 0.5s ease;
        }

        /* Responzivní výška */
        .grid img {
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: 1rem;
        }
      `}</style>
    </>
  );
}

// Komponenta pro jednu kartu
function ServiceCard({ service }: { service: typeof services[0] }) {
  return (
    <Link href={`/sluzby/${service.slug}`} className="block group h-full" style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      borderRadius: '1rem',
      overflow: 'hidden'
    }}>
      <Image
        src={service.image}
        alt={service.name}
        fill
        className="layer-img"
        sizes="(max-width: 768px) 33vw, 20vw"
        style={{ 
          objectFit: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-3">
        <span className="text-white font-medium text-sm lg:text-base">{service.name}</span>
      </div>
    </Link>
  );
}