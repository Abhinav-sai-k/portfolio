import { useState, useEffect, useRef } from 'react';
import { List, X } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => setScrolled(window.scrollY > 50), 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);

    if (mobileMenuRef.current) {
      gsap.to(mobileMenuRef.current, {
        x: isOpen ? '100%' : 0,
        rotationY: isOpen ? 15 : 0,
        rotationX: isOpen ? 5 : 0,
        perspective: 800,
        duration: 0.6,
        ease: isOpen ? 'power2.in' : 'power2.out',
      });

      if (!isOpen) {
        gsap.fromTo(
          mobileMenuRef.current.children,
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(target, { rotationY: x * 0.05, rotationX: -y * 0.05, duration: 0.3, ease: 'power2.out' });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    gsap.to(e.currentTarget, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass py-4' : 'py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Left Logo */}
          <div className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent glow-text">
            Welcome
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary transition-colors duration-500 font-light tracking-wide hover:glow-text"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="btn-glow px-6 py-2 rounded-full text-sm font-medium text-primary-foreground"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          >
            {isOpen ? <X size={24} /> : <List size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="mobile-menu fixed top-0 left-0 h-full w-full bg-background/95 backdrop-blur-xl z-40 transform translate-x-full md:hidden flex flex-col items-center justify-center space-y-8 perspective-800"
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={toggleMenu}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="text-3xl font-light text-foreground hover:text-primary transition-colors duration-300 glow-text cursor-pointer"
          >
            {item.name}
          </a>
        ))}
        <a
          href="#contact"
          onClick={toggleMenu}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="btn-glow px-8 py-3 rounded-full text-lg font-medium text-primary-foreground mt-8"
        >
          Hire Me
        </a>
      </div>
    </>
  );
};

export default Navigation;
