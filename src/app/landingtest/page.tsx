'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import CustomEase from 'gsap/CustomEase'

gsap.registerPlugin(CustomEase)
CustomEase.create('hop', '0.9, 0, 0.1, 1')

export default function LandingTest() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({
      delay: 0.3,
      defaults: {
        ease: 'hop',
      },
    })

    const counts = document.querySelectorAll('.count')

    counts.forEach((count, index) => {
      const digits = count.querySelectorAll('.digit h1')

      tl.to(
        digits,
        {
          y: '0%',
          duration: 1,
          stagger: 0.075,
        },
        index * 1
      )

      if (index < counts.length) {
        tl.to(
          digits,
          {
            y: '-100%',
            duration: 1,
            stagger: 0.075,
          },
          index * 1 + 1
        )
      }
    })

    tl.to('.spinner', {
      opacity: 0,
      duration: 0.3,
    })

    tl.to(
      '.word h1',
      {
        y: '0%',
        duration: 1,
      },
      '<'
    )

    tl.to('.divider', {
      scaleY: '100%',
      duration: 1,
      onComplete: () => {
        gsap.to('.divider', {
          opacity: 0,
          duration: 0.4,
          delay: 0.3,
        })
      },
    })

    tl.to('#word-1 h1', {
      y: '100%',
      duration: 1,
      delay: 0.3,
    })

    tl.to(
      '#word-2 h1',
      {
        y: '-100%',
        duration: 1,
      },
      '<'
    )

    tl.to('.block', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
      duration: 1,
      stagger: 0.1,
      delay: 0.75,
      onStart: () => {
        gsap.to('.hero-video', { scale: 1, duration: 2, ease: 'hop' })
        // Start video playback
        if (videoRef.current) {
          videoRef.current.play().catch(() => {})
        }
      },
    })

    tl.to(
      ['.nav', '.line h1', '.line p'],
      {
        y: '0%',
        duration: 1.5,
        stagger: 0.2,
      },
      '<'
    )

    tl.to(
      ['.cta', '.cta-icon'],
      {
        scale: 1,
        duration: 1.5,
        stagger: 0.75,
        delay: 0.75,
      },
      '<'
    )

    tl.to(
      '.cta-label p',
      {
        y: '0%',
        duration: 1.5,
        delay: 0.5,
      },
      '<'
    )
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.cdnfonts.com/css/pp-neue-montreal-4');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'PP Neue Montreal', sans-serif;
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .landing-h1 {
          text-align: center;
          color: #fff;
          font-size: 5rem;
          font-weight: 500;
          line-height: 1;
        }

        .landing-h1 span {
          font-family: 'PP Editorial Old', 'PP Neue Montreal';
          font-weight: 500;
          font-style: italic;
          -webkit-font-smoothing: antialiased;
        }

        .landing-a,
        .landing-p {
          text-decoration: none;
          text-transform: uppercase;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          line-height: 1;
          -webkit-font-smoothing: antialiased;
        }

        .landing-container {
          position: relative;
          width: 100vw;
          height: 100svh;
          overflow: hidden;
        }

        .hero-video {
          position: absolute;
          top: 0;
          width: 100vw;
          height: 100svh;
          overflow: hidden;
          z-index: -1;
          transform: scale(1.5);
          will-change: transform;
        }

        .nav {
          position: absolute;
          top: 0;
          width: 100vw;
          padding: 1.25em 1.5em;
          display: flex;
          align-items: center;
          gap: 1.5em;
          will-change: transform;
          transform: translateY(-120%);
        }

        .nav > div {
          flex: 1;
        }

        .logo .landing-a {
          text-transform: capitalize;
          font-size: 14px;
          font-weight: bolder;
        }

        .nav-links {
          display: flex;
          gap: 1.5em;
          justify-content: center;
        }

        .btn {
          display: flex;
          justify-content: flex-end;
        }

        .btn .landing-a {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          width: 60px;
          height: 40px;
          color: #000;
          background-color: #fff;
          border-radius: 40px;
        }

        .header {
          width: 100%;
          height: 100%;
          padding-top: 25svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5em;
        }

        .cta {
          position: absolute;
          left: 50%;
          bottom: 3em;
          transform: translateX(-50%) scale(0);
          width: 50%;
          height: 60px;
          padding: 0.5rem;
          display: flex;
          justify-content: flex-end;
          background-color: #fff;
          border-radius: 4rem;
          will-change: transform;
        }

        .cta-label {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .cta-label .landing-p {
          color: #000;
        }

        .cta-icon {
          position: relative;
          height: 100%;
          aspect-ratio: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          background-color: #303030;
          border-radius: 60px;
          will-change: transform;
          transform: scale(0);
        }

        .loader {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100svh;
          overflow: hidden;
          z-index: 2;
        }

        .overlay {
          position: absolute;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
        }

        .block {
          width: 100%;
          height: 100%;
          background-color: #303030;
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .intro-logo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 0.25rem;
        }

        #word-1 {
          position: relative;
          left: -0.5rem;
          padding-right: 0.25rem;
        }

        .divider {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%) scaleY(0%);
          transform-origin: center top;
          width: 1px;
          height: 100%;
          background-color: #fff;
        }

        .spinner-container {
          position: absolute;
          bottom: 10%;
          left: 50%;
          transform: translateX(-50%);
        }

        .spinner {
          width: 50px;
          height: 50px;
          border: 1.4px solid #fff;
          border-top-color: rgba(255, 255, 255, 0.125);
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        .counter {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .count {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
        }

        .digit {
          flex: 1;
          padding-top: 1rem;
        }

        .count .digit .landing-h1 {
          font-family: 'PP Editorial Old', 'PP Neue Montreal';
          font-size: 15rem;
          font-weight: 400;
        }

        .line,
        .cta-label,
        .word,
        .count .digit {
          clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
        }

        .line .landing-h1,
        .line .landing-p,
        .cta-label .landing-p,
        .count .digit .landing-h1 {
          position: relative;
          transform: translateY(120%);
          will-change: transform;
        }

        #word-1 .landing-h1 {
          transform: translateY(-120%);
        }

        #word-2 .landing-h1 {
          transform: translateY(120%);
        }

        @media (max-width: 900px) {
          .landing-h1 {
            font-size: 2.5rem;
          }

          .nav-links {
            display: none;
          }

          .cta {
            width: 90%;
          }
        }
      `}</style>

      <div className="loader">
        <div className="overlay">
          <div className="block"></div>
          <div className="block"></div>
        </div>

        <div className="intro-logo">
          <div className="word" id="word-1">
            <h1 className="landing-h1">
              <span>SW</span>
            </h1>
          </div>
          <div className="word" id="word-2">
            <h1 className="landing-h1">Beauty</h1>
          </div>
        </div>

        <div className="divider"></div>

        <div className="spinner-container">
          <div className="spinner"></div>
        </div>

        <div className="counter">
          <div className="count">
            <div className="digit">
              <h1 className="landing-h1">0</h1>
            </div>
            <div className="digit">
              <h1 className="landing-h1">0</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1 className="landing-h1">2</h1>
            </div>
            <div className="digit">
              <h1 className="landing-h1">7</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1 className="landing-h1">6</h1>
            </div>
            <div className="digit">
              <h1 className="landing-h1">5</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1 className="landing-h1">9</h1>
            </div>
            <div className="digit">
              <h1 className="landing-h1">8</h1>
            </div>
          </div>
          <div className="count">
            <div className="digit">
              <h1 className="landing-h1">9</h1>
            </div>
            <div className="digit">
              <h1 className="landing-h1">9</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="landing-container">
        <div className="hero-video">
          <video ref={videoRef} loop muted playsInline preload="auto">
            <source src="/movies/hero_1.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="nav">
          <div className="logo">
            <a href="#" className="landing-a">
              SW Beauty
            </a>
          </div>
          <div className="nav-links">
            <a href="#" className="landing-a">
              Služby
            </a>
            <a href="#" className="landing-a">
              O nás
            </a>
            <a href="#" className="landing-a">
              Galerie
            </a>
            <a href="#" className="landing-a">
              Kontakt
            </a>
          </div>
          <div className="btn">
            <a href="#" className="landing-a">
              Rezervace
            </a>
          </div>
        </div>

        <div className="header">
          <div className="hero-copy">
            <div className="line">
              <h1 className="landing-h1">
                <span>Krása</span>, která vám
              </h1>
            </div>
            <div className="line">
              <h1 className="landing-h1">
                přirozeně <span>sluší</span>
              </h1>
            </div>
          </div>
          <div className="line">
            <p className="landing-p">Profesionální kosmetika s moderními technologiemi</p>
          </div>
        </div>

        <div className="cta">
          <div className="cta-label">
            <p className="landing-p">Objevte naše služby</p>
          </div>
          <div className="cta-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
