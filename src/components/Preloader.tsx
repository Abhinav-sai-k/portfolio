import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Title entrance animation
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' }
    );

    // Floating orbs entrance
    tl.fromTo(
      '.floating-orb',
      { opacity: 0, scale: 0.5 },
      { opacity: 0.3, scale: 1, stagger: 0.2, duration: 1, ease: 'power2.out' },
      '-=0.8'
    );

    // Animate progress bar
    tl.to(
      progressBarRef.current,
      { width: '100%', duration: 2.5, ease: 'power2.out' },
      '-=0.5'
    );

    // Exit animation
    tl.to(
      titleRef.current,
      { opacity: 0, y: -30, scale: 1.05, duration: 0.8, ease: 'power2.in' },
      '+=0.3'
    );

    tl.to(
      preloaderRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => onComplete(),
      },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div ref={preloaderRef} className="preloader">
      <div ref={titleRef} className="text-center will-change-transform will-change-opacity">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight glow-text mb-2">
          Abhinav Sai Konjeti
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light glow-text">
          Portfolio
        </p>
      </div>

      <div className="progress-container mt-6 sm:mt-8">
        <div
          ref={progressBarRef}
          className="progress-bar rounded-full h-1.5 sm:h-2"
        ></div>
      </div>

      {/* Floating orbs for ambiance */}
      <div className="floating-orb w-32 h-32 top-1/4 left-1/4 animate-float"></div>
      <div className="floating-orb w-24 h-24 top-3/4 right-1/4 animate-float delay-2s"></div>
      <div className="floating-orb w-20 h-20 top-1/2 right-1/3 animate-float delay-1s"></div>
    </div>
  );
};

export default Preloader;
