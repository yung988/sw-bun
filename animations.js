// ====================
// AWWWARDS-STYLE GSAP ANIMATIONS (Scroll-Driven Only)
// SW Beauty - Luxury Scroll Experience
// ====================

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Integrate with Lenis
    if (typeof lenis !== 'undefined') {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
    }

    // Check for mobile device
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    // ====================
    // UTILITY: TEXT SPLITTING
    // ====================
    function splitTextIntoSpans(element, type = 'chars') {
        if (!element) return;
        
        const text = element.textContent.trim();
        element.innerHTML = '';
        
        if (type === 'chars') {
            // Split into characters, preserve spaces as &nbsp;
            text.split('').forEach(char => {
                const span = document.createElement('span');
                span.className = 'char';
                span.style.display = 'inline-block';
                span.innerHTML = char === ' ' ? '&nbsp;' : char;
                element.appendChild(span);
            });
        } else if (type === 'words') {
            // Split into words
            text.split(' ').forEach((word, i, arr) => {
                const span = document.createElement('span');
                span.className = 'word';
                span.style.display = 'inline-block';
                span.textContent = word;
                element.appendChild(span);
                if (i < arr.length - 1) {
                    element.appendChild(document.createTextNode(' '));
                }
            });
        }
        
        return element;
    }

    // ====================
    // HERO SECTION
    // ====================
    function initHeroAnimations() {
        const hero = document.querySelector('header');
        if (!hero) return;

        const heroTitle = hero.querySelector('h1');
        const heroButtons = hero.querySelectorAll('button, a.min-w-\\[180px\\]');
        const heroImage = hero.querySelector('img');
        const heroImageContainer = hero.querySelector('.aspect-\\[2\\/3\\]') || hero.querySelector('.lg\\:aspect-\\[3\\/4\\]');

        // Initial states
        if (heroTitle) gsap.set(heroTitle, { opacity: 1 }); // Ensure visible for split
        if (heroButtons) gsap.set(heroButtons, { opacity: 0, y: 30 });
        
        if (heroImageContainer) {
            gsap.set(heroImageContainer, { 
                clipPath: 'inset(100% 0% 0% 0%)'
            });
        }
        if (heroImage) gsap.set(heroImage, { scale: 1.2 });

        // Master timeline for hero entrance
        const heroTL = gsap.timeline({
            delay: 0.2,
            defaults: { ease: 'power3.out' }
        });

        // Image reveal
        if (heroImageContainer) {
            heroTL.to(heroImageContainer, {
                clipPath: 'inset(0% 0% 0% 0%)',
                duration: 1.5,
                ease: 'power4.inOut'
            });
        }

        if (heroImage) {
            heroTL.to(heroImage, {
                scale: 1,
                duration: 1.5,
                ease: 'power2.out'
            }, '-=1.5');
        }

        // Title reveal
        if (heroTitle) {
            splitTextIntoSpans(heroTitle, 'words');
            const words = heroTitle.querySelectorAll('.word');
            
            gsap.set(words, { 
                opacity: 0, 
                y: 50
            });

            heroTL.to(words, {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.05,
                ease: 'power3.out'
            }, '-=1.0');
        }

        // Buttons slide up
        if (heroButtons.length > 0) {
            heroTL.to(heroButtons, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            }, '-=0.5');
        }

        // Scroll Parallax
        if (!isMobile && heroImage) {
            gsap.to(heroImage, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }

        if (!isMobile && heroTitle) {
            gsap.to(heroTitle, {
                opacity: 0,
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: hero,
                    start: 'top top',
                    end: '50% top',
                    scrub: true
                }
            });
        }
    }

    // ====================
    // PHILOSOPHY SECTION
    // ====================
    function initPhilosophyAnimations() {
        const section = document.getElementById('filozofie');
        if (!section) return;

        const image = section.querySelector('img');
        const textContent = section.querySelector('.lg\\:w-1\\/2.lg\\:pr-12');
        const decorElement = section.querySelector('.absolute.-bottom-6');

        // Image fade in
        if (image) {
            gsap.from(image, {
                opacity: 0,
                scale: 1.1,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true
                }
            });

            // Parallax
            if (!isMobile) {
                gsap.to(image, {
                    yPercent: 20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        }

        // Decor element
        if (decorElement) {
            gsap.from(decorElement, {
                x: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    once: true
                }
            });
        }

        // Text content
        if (textContent) {
            const heading = textContent.querySelector('h2');
            const paragraphs = textContent.querySelectorAll('p');

            if (heading) {
                splitTextIntoSpans(heading, 'words');
                const words = heading.querySelectorAll('.word');
                
                gsap.from(words, {
                    opacity: 0,
                    y: 30,
                    duration: 0.8,
                    stagger: 0.05,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: heading,
                        start: 'top 80%',
                        once: true
                    }
                });
            }

            if (paragraphs.length > 0) {
                gsap.from(paragraphs, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: textContent,
                        start: 'top 75%',
                        once: true
                    }
                });
            }
        }
    }

    // ====================
    // FOUNDER SECTION
    // ====================
    function initFounderAnimations() {
        const section = document.getElementById('majitelka');
        if (!section) return;

        const portrait = section.querySelector('.aspect-\\[3\\/4\\] img');
        const textContent = section.querySelector('.md\\:w-7\\/12');

        // Portrait reveal
        if (portrait) {
            gsap.from(portrait, {
                opacity: 0,
                y: 50,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    once: true
                }
            });

            // Parallax
            if (!isMobile) {
                gsap.to(portrait, {
                    yPercent: 15,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        }

        // Text content
        if (textContent) {
            const elements = textContent.children;
            gsap.from(elements, {
                opacity: 0,
                y: 30,
                duration: 1,
                stagger: 0.15,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: textContent,
                    start: 'top 70%',
                    once: true
                }
            });
        }
    }

    // ====================
    // FAQ SECTION
    // ====================
    function initFAQAnimations() {
        const section = document.getElementById('faq');
        if (!section) return;

        const heading = section.querySelector('h2');
        const items = section.querySelectorAll('details');

        // Heading
        if (heading) {
            gsap.from(heading, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        // Items
        if (items.length > 0) {
            gsap.from(items, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section.querySelector('.space-y-4'),
                    start: 'top 85%',
                    once: true
                }
            });

            // Smooth accordion
            items.forEach(item => {
                item.addEventListener('toggle', () => {
                    const content = item.querySelector('p');
                    if (item.open && content) {
                        gsap.from(content, {
                            height: 0,
                            opacity: 0,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    }
                });
            });
        }
    }

    // ====================
    // GIFT CARDS SECTION
    // ====================
    function initGiftCardsAnimations() {
        const section = document.getElementById('poukazy');
        if (!section) return;

        const image = section.querySelector('.sticky img');
        const content = section.querySelector('.max-w-lg');

        // Image reveal
        if (image) {
            gsap.from(image, {
                scale: 0.9,
                opacity: 0,
                duration: 1.5,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 60%',
                    once: true
                }
            });

            // Parallax
            if (!isMobile) {
                gsap.to(image, {
                    yPercent: 10,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                });
            }
        }

        // Content
        if (content) {
            const heading = content.querySelector('h2');
            const otherElements = content.querySelectorAll('span, p, button');

            if (heading) {
                gsap.from(heading, {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: heading,
                        start: 'top 80%',
                        once: true
                    }
                });
            }

            if (otherElements.length > 0) {
                gsap.from(otherElements, {
                    opacity: 0,
                    y: 20,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: content,
                        start: 'top 75%',
                        once: true
                    }
                });
            }
        }
    }

    // ====================
    // REVIEWS SECTION
    // ====================
    function initReviewsAnimations() {
        const section = document.getElementById('reviews');
        if (!section) return;

        const container = section.querySelector('.max-w-3xl');
        const quoteMark = section.querySelector('.text-\\[120px\\]');

        if (container) {
            gsap.from(container, {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true
                }
            });
        }

        if (quoteMark) {
            gsap.from(quoteMark, {
                scale: 1.5,
                opacity: 0,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 70%',
                    once: true
                }
            });
        }

        // Background parallax
        if (!isMobile) {
            gsap.to(section, {
                backgroundPosition: '50% 100%',
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        }
    }

    // ====================
    // INSTAGRAM SECTION
    // ====================
    function initInstagramAnimations() {
        const section = document.getElementById('instagram');
        if (!section) return;

        const heading = section.querySelector('h2');
        const items = section.querySelectorAll('.instagram-item');

        if (heading) {
            gsap.from(heading, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: heading,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        if (items.length > 0) {
            gsap.from(items, {
                opacity: 0,
                scale: 0.95,
                y: 30,
                duration: 0.8,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section.querySelector('.grid'),
                    start: 'top 80%',
                    once: true
                }
            });

            // Hover effects (no rotation)
            if (!isMobile) {
                items.forEach(item => {
                    item.addEventListener('mouseenter', () => {
                        gsap.to(item, {
                            y: -10,
                            scale: 1.05,
                            duration: 0.3,
                            ease: 'power2.out'
                        });
                    });

                    item.addEventListener('mouseleave', () => {
                        gsap.to(item, {
                            y: 0,
                            scale: 1,
                            duration: 0.4,
                            ease: 'power2.out'
                        });
                    });
                });
            }
        }
    }

    // ====================
    // FOOTER
    // ====================
    function initFooterAnimations() {
        const footer = document.querySelector('footer');
        if (!footer) return;

        const columns = footer.querySelectorAll('.md\\:col-span-1');
        const giantText = footer.querySelector('.text-\\[20vw\\]');

        if (columns.length > 0) {
            gsap.from(columns, {
                opacity: 0,
                y: 40,
                duration: 1,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: footer,
                    start: 'top 85%',
                    once: true
                }
            });
        }

        if (giantText && !isMobile) {
            gsap.fromTo(giantText, 
                { yPercent: 50 },
                {
                    yPercent: -20,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: footer,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true
                    }
                }
            );
        }
    }

    // ====================
    // NAVBAR - SMART HIDE/SHOW
    // ====================
    function initNavbarAnimations() {
        const navbar = document.getElementById('navbar');
        const navbarLogo = document.getElementById('navbarLogo');
        if (!navbar) return;

        let isNavHidden = false;

        ScrollTrigger.create({
            start: 0,
            end: 'max',
            onUpdate: (self) => {
                const currentScroll = self.scroll();
                const direction = self.direction;
                const velocity = Math.abs(self.getVelocity());

                // Hide on fast scroll down, show on scroll up
                if (direction === 1 && currentScroll > 150 && velocity > 100 && !isNavHidden) {
                    gsap.to(navbar, {
                        yPercent: -100,
                        duration: 0.3,
                        ease: 'power2.in'
                    });
                    isNavHidden = true;
                } else if (direction === -1 && isNavHidden) {
                    gsap.to(navbar, {
                        yPercent: 0,
                        duration: 0.4,
                        ease: 'power2.out'
                    });
                    isNavHidden = false;
                }

                // Background blur effect
                const progress = Math.min(currentScroll / 150, 1);
                if (progress > 0.1) {
                    navbar.style.backgroundColor = `rgba(255, 255, 255, ${0.9 * progress})`;
                    navbar.style.backdropFilter = `blur(${12 * progress}px)`;
                } else {
                    navbar.style.backgroundColor = 'transparent';
                    navbar.style.backdropFilter = 'none';
                }

                // Logo scale
                if (navbarLogo) {
                    const scale = 1 - (progress * 0.4); // Scale down to 0.6
                    navbarLogo.style.transform = `scale(${Math.max(0.6, scale)})`;
                }
            }
        });
    }

    // ====================
    // MAGNETIC BUTTONS
    // ====================
    function initMagneticButtons() {
        if (isMobile) return;

        const buttons = document.querySelectorAll('button, a.min-w-\\[180px\\], .border.border-stone-900');
        
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                gsap.to(btn, {
                    x: x * 0.2,
                    y: y * 0.2,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            btn.addEventListener('mouseleave', () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: 'elastic.out(1, 0.5)'
                });
            });
        });
    }

    // ====================
    // CUSTOM CURSOR
    // ====================
    function initCustomCursor() {
        if (isMobile) return;

        // Create cursor elements
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = '<div class="cursor-dot"></div><div class="cursor-ring"></div>';
        document.body.appendChild(cursor);

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            .cursor-dot {
                position: absolute;
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                transform: translate(-50%, -50%);
            }
            .cursor-ring {
                position: absolute;
                width: 40px;
                height: 40px;
                border: 1px solid white;
                border-radius: 50%;
                transform: translate(-50%, -50%);
                opacity: 0.5;
                transition: width 0.3s, height 0.3s, opacity 0.3s;
            }
            body {
                cursor: none;
            }
            a, button, .cursor-pointer {
                cursor: none;
            }
        `;
        document.head.appendChild(style);

        const dot = cursor.querySelector('.cursor-dot');
        const ring = cursor.querySelector('.cursor-ring');

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Animate cursor
        gsap.ticker.add(() => {
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;

            dot.style.left = dotX + 'px';
            dot.style.top = dotY + 'px';
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
        });

        // Hover effects
        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(ring, { width: 60, height: 60, opacity: 1, duration: 0.3 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(ring, { width: 40, height: 40, opacity: 0.5, duration: 0.3 });
            });
        });
    }

    // ====================
    // INITIALIZE
    // ====================
    function init() {
        // Wait a frame for everything to be ready
        requestAnimationFrame(() => {
            initHeroAnimations();
            // initServicesAnimations(); // Skipped as requested
            initPhilosophyAnimations();
            initFounderAnimations();
            initFAQAnimations();
            initGiftCardsAnimations();
            initReviewsAnimations();
            initInstagramAnimations();
            initFooterAnimations();
            initNavbarAnimations();
            initMagneticButtons();
            initCustomCursor();

            console.log('✨ Scroll-driven animations initialized');
        });
    }

    // Run initialization
    init();
});
