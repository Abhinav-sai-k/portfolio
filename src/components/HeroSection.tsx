import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, FileText } from 'phosphor-react';
import { Typewriter } from 'react-simple-typewriter';

const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaPrimaryRef = useRef<HTMLAnchorElement>(null);
  const ctaSecondaryRef = useRef<HTMLAnchorElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const subtitleEl = subtitleRef.current;
    if (subtitleEl) {
      const words = subtitleEl.innerText.split(' ');
      subtitleEl.innerHTML = words
        .map((word) => `<span class="inline-block opacity-0">${word}&nbsp;</span>`)
        .join('');
    }

    const tl = gsap.timeline({ delay: 0.4 });

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 100, filter: 'blur(20px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power2.out' }
    )
      .fromTo(
        subtitleEl?.querySelectorAll('span'),
        { opacity: 0, y: 20, filter: 'blur(6px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out', stagger: 0.08 },
        '-=0.6'
      )
      .fromTo(
        ctaPrimaryRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.5'
      )
      .fromTo(
        ctaSecondaryRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.6'
      );

    gsap.to(ctaPrimaryRef.current, {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Spline subtle rotation animation
    gsap.to(splineRef.current, {
      rotateY: 5,
      rotateX: 2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/50"></div>

      {/* Floating orbs */}
      <div className="floating-orb w-96 h-96 top-20 -left-20 opacity-30"></div>
      <div className="floating-orb w-64 h-64 bottom-20 -right-20 opacity-20"></div>
      <div className="floating-orb w-32 h-32 top-1/2 left-1/4 opacity-25"></div>

      {/* Spline 3D Background */}
      <div ref={splineRef} className="spline-container">
        <iframe
          src="https://my.spline.design/chips-1AAX1ychyxClnZO1VSbMkxJP/"
          frameBorder="0"
          width="100%"
          height="100%"
          loading="lazy"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto px-6">
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight mb-6 glow-text"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-gradient-shimmer">
            Abhinav
          </span>
          <br />
          <span className="text-4xl md:text-6xl lg:text-7xl text-muted-foreground italic font-semibold font-mono">
            <Typewriter
              words={[
                'Gen AI Engineer',
                'LLM Engineer',
                'Machine Learning Engineer',
                'Agentic AI Engineer',
                'LLMOps/MLOps Expert',
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>

        </h1>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 font-light leading-relaxed"
        >
          
          Architecting advanced LLMs, RAG pipelines, and enterprise grade agentic AI frameworks 
          to deliver tangible impact at scale.
        </p>

        <div className="flex justify-center gap-6">
          <a
            ref={ctaPrimaryRef}
            href="#contact"
            aria-label="Hire me"
            className="group btn-glow px-8 py-4 rounded-full text-lg font-medium text-primary-foreground inline-flex items-center gap-3 hover:gap-4 transition-all duration-300"
          >
            Hire Me
            <ArrowRight
              size={20}
              className="group-hover:rotate-45 transition-transform duration-300"
            />
          </a>
            <a
            ref={ctaSecondaryRef}
            href="/resume.pdf"
            aria-label="View Resume"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full text-lg font-medium text-foreground border border-border/40 backdrop-blur-sm bg-background/30 hover:border-primary/60 hover:text-primary transition-all duration-300 inline-flex items-center gap-3"
          >
            <FileText size={20} />
            View Resume
          </a>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
