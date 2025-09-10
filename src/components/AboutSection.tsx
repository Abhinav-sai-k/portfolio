import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Brain, Robot, Code, Database, Lightning, Cpu } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const skills = [
    { name: 'Generative AI', icon: Brain, color: 'text-primary' },
    { name: 'Agentic AI', icon: Robot, color: 'text-accent' },
    { name: 'LLM Fine-Tuning', icon: Code, color: 'text-primary' },
    { name: 'Retrieval-Augmented Generation', icon: Database, color: 'text-accent' },
    { name: 'MLOps & LLMOps', icon: Lightning, color: 'text-primary' },
    { name: 'Neural Networks', icon: Cpu, color: 'text-accent' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll animation for section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      });

      tl.fromTo(imageRef.current,
        { opacity: 0, x: -100, filter: "blur(20px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" }
      )
      .fromTo(contentRef.current,
        { opacity: 0, x: 100, filter: "blur(20px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out" },
        "-=0.8"
      )
      .fromTo(skillsRef.current?.children,
        { opacity: 0, y: 50, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: "back.out(1.7)" 
        },
        "-=0.5"
      );

      // Glow pulsing
      gsap.to(glowRef.current, {
        scale: 1.1,
        opacity: 0.8,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });

      // Floating orbs animation
      gsap.to(".floating-orb", {
        y: "-=10",
        x: "+=10",
        duration: 6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto">
              {/* Pulsing Circular Glow */}
              <div
                ref={glowRef}
                className="absolute inset-0 rounded-full"
                style={{
                  background: "radial-gradient(circle, rgba(0,123,255,0.25) 0%, rgba(0,123,255,0) 70%)",
                  boxShadow: "0 0 60px rgba(0,123,255,0.3), 0 0 100px rgba(0,123,255,0.2)",
                  zIndex: -10
                }}
              ></div>

              <div className="relative w-full h-full rounded-full glass-card overflow-hidden group cursor-pointer">
                <img
                  src="/lovable-uploads/9b8ac01e-553f-427f-a331-46ba1dd66239.png"
                  alt="Abhinav Sai Konjeti"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
              </div>

              {/* Floating Orbs */}
              <div className="floating-orb w-16 h-16 -top-8 -right-8 opacity-50 rounded-full" style={{background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)", filter: "blur(12px)"}}></div>
              <div className="floating-orb w-12 h-12 -bottom-6 -left-6 opacity-30 rounded-full" style={{background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)", filter: "blur(10px)"}}></div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6 glow-text">
                About <span className="text-primary">Me</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  I am a <span className="text-primary font-medium">Generative AI Engineer</span> and 
                  <span className="text-accent font-medium"> Agentic AI Specialist</span> with 7+ years of experience designing 
                  and deploying intelligent systems that transform data into actionable insights.
                </p>
                <p>
                  My expertise spans <span className="text-primary font-medium">Large Language Models (LLMs)</span>, 
                  <span className="text-accent font-medium"> Retrieval Augmented Generation (RAG)</span>, 
                  <span className="text-primary font-medium"> MLOps & LLMOps</span>, and enterprise AI architectures. 
                  I build scalable AI solutions that drive innovation and solve complex, real-world challenges.
                </p>
                <p>
                  I am passionate about leveraging advanced neural architectures, agentic AI frameworks, and AI orchestration to 
                  accelerate decision making and deliver tangible business impact.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skills.map((skill) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={skill.name}
                    className="glass-card text-center p-4 hover:glow-primary transition-all duration-300 cursor-pointer group"
                  >
                    <IconComponent 
                      size={32} 
                      className={`${skill.color} mx-auto mb-2 group-hover:scale-110 transition-transform duration-300`} 
                    />
                    <span className="text-sm font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                      {skill.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
