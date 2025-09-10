import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, TwitterLogo, InstagramLogo, Brain } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com/Abhinav-sai-k' },
    { icon: LinkedinLogo, href: 'https://www.linkedin.com/in/abhitheaidude/' },
    { icon: TwitterLogo, href: 'https://x.com/' },
    { icon: InstagramLogo, href: 'https://www.instagram.com/' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(footerRef.current,
        { opacity: 0, y: 60, filter: "blur(20px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)", 
          duration: 1.2, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.to(particlesRef.current?.children, {
        y: "-=20",
        rotate: "15deg",
        scale: 1.05,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.6
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="relative py-16 bg-gradient-to-t from-background to-background/50 border-t border-border/30">
      {/* Floating particles background */}
      <div ref={particlesRef} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-orb w-32 h-32 top-8 left-8 opacity-20"></div>
        <div className="floating-orb w-24 h-24 top-16 right-16 opacity-15"></div>
        <div className="floating-orb w-16 h-16 bottom-8 left-1/3 opacity-25"></div>
        <div className="floating-orb w-20 h-20 bottom-16 right-1/4 opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-tight glow-text flex items-center gap-2">
              <Brain size={24} className="text-primary" /> Abhinav Sai Konjeti
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Generative AI Engineer & Agentic AI Specialist. 
              Designing scalable LLM, RAG, and AI-driven solutions that power enterprise innovation.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <div className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-muted-foreground hover:text-primary transition-all duration-300 hover:underline underline-offset-4"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Let's Connect</h4>
            <div className="space-y-4 text-muted-foreground">
              <p>Open for collaborations & projects</p>
              <a
                href="#contact"
                className="inline-block btn-glass px-6 py-2 rounded-full text-sm font-medium hover:glow-primary transition-all duration-300"
              >
                Start a Project
              </a>
              <div className="flex space-x-4">
                {socialLinks.map(({ icon: Icon, href }, idx) => (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon size={22} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              Hire me 
              <Heart size={16} className="text-primary animate-pulse" /> 
              
            </p>
            
            <div className="flex items-center space-x-6">
              <a
                href="#privacy"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Privacy
              </a>
              <a
                href="#terms"
                className="text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
