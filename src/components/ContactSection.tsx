import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  PaperPlaneRight,
  GithubLogo,
  LinkedinLogo,
  TwitterLogo,
  Database,
  Camera,
  EnvelopeSimple, // ✅ Added email icon
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // === UPDATED SOCIAL LINKS (now includes email) ===
  const socialLinks = [
    {
      name: 'Email',
      icon: EnvelopeSimple,
      href: 'mailto:abhi.konjeti@gmail.com',
      colorClass: 'hover:text-red-500'
    },
    {
      name: 'GitHub',
      icon: GithubLogo,
      href: 'https://github.com/Abhinav-sai-k',
      colorClass: 'hover:text-primary'
    },
    {
      name: 'LinkedIn',
      icon: LinkedinLogo,
      href: 'https://www.linkedin.com/in/abhitheaidude/',
      colorClass: 'hover:text-[#0A66C2]'
    },
    {
      name: 'Kaggle',
      icon: Database,
      href: 'https://www.kaggle.com/hallohallo69',
      colorClass: 'hover:text-[#20BEFF]'
    },
    {
      name: 'Twitter (X)',
      icon: TwitterLogo,
      href: 'https://x.com/',
      colorClass: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'Instagram',
      icon: Camera,
      href: 'https://www.instagram.com/',
      colorClass: 'hover:text-pink-500'
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(formRef.current,
        { opacity: 0, x: -100, filter: "blur(20px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
      )
      .fromTo(socialRef.current,
        { opacity: 0, x: 100, filter: "blur(20px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
        "-=0.8"
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const btn = (e.currentTarget as HTMLFormElement).querySelector('button');
    if (btn) {
      gsap.to(btn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    }

    console.log('Form submitted:', formData);

    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="relative text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight text-center mb-6 glow-text relative z-10">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -z-10 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div ref={formRef}>
              <div className="glass-card p-8 space-y-6 relative overflow-hidden group">
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/30 to-accent/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    Start a Project
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Ready to transform your ideas into intelligent solutions? Let's discuss how AI can elevate your business.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg glass border border-border/30 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground"
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg glass border border-border/30 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-lg glass border border-border/30 focus:border-primary focus:glow-primary transition-all duration-300 bg-transparent text-foreground placeholder-muted-foreground resize-none"
                        placeholder="Tell me about your project, goals, and how I can help..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-glow py-4 rounded-lg text-lg font-medium text-primary-foreground inline-flex items-center justify-center gap-3 hover:gap-4 transition-all duration-300 group"
                      aria-label="Send message"
                    >
                      Send Message
                      <PaperPlaneRight
                        size={20}
                        className="group-hover:rotate-45 transition-transform duration-300"
                      />
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Contact Info & Social */}
            <div ref={socialRef} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-semibold mb-6 text-foreground">
                  Get in Touch
                </h3>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Response Time</h4>
                    <p className="text-muted-foreground">
                      I typically respond within 24 hours on weekdays
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Collaboration</h4>
                    <p className="text-muted-foreground">
                      Open to full-time, contract, and consulting opportunities
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Expertise</h4>
                    <p className="text-muted-foreground">
                      Specializing in Generative AI, MLOps, and scalable AI systems
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-semibold mb-6 text-foreground">
                  Connect on Social
                </h3>

                <div className="space-y-4">
                  {socialLinks.map((social) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${social.name}`}
                        className={`flex items-center gap-4 p-3 rounded-lg glass border border-border/30 hover:border-primary/50 transition-all duration-300 group ${social.colorClass}`}
                      >
                        <IconComponent
                          size={24}
                          className="group-hover:scale-110 transition-transform duration-300"
                        />
                        <span className="font-medium">{social.name}</span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
