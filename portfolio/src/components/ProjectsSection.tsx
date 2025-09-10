import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Eye } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<HTMLDivElement[]>([]);

  const projects = [
    {
      id: 1,
      title: "LLM Document Summarization",
      description: "Advanced document processing system using large language models for intelligent summarization and analysis. ",
      image: "/lovable-uploads/4c4104c3-2c9f-47e9-9ff1-f4878af0f352.png",
      tech: ["Python", "Transformers", "LangChain", "openAI","Pypdf", "FAISS"],
      category: "Generative AI"
    },
    {
      id: 2,
      title: "RAG Knowledge Base",
      description: "Retrieval augmented generation system for enhanced document processing and cross encoder ranking.",
      image: "/lovable-uploads/ee5e2a54-dc32-40aa-bbc0-6dafed87b052.png",
      tech: ["OpenAI", "Embedding Models", "Vector DB", "Python"],
      category: "RAG"
    },
    {
      id: 3,
      title: "Linear Regression using Neural Nets",
      description: "This FMCG Dataset is fitted using neural nets and various optimizers to predict sales, Frontend : Real-time demand forecasting system with interactive dashboard for product sales analytics.",
      image: "/lovable-uploads/2d72c106-6f3e-436b-849b-4f077e700d1e.png",
      tech: ["PyTorch","ANN","Huber vs MSE loss","dropouts","Scikit learn", "Reduce on plateau", "Matplotlib"],
      category: "Deep Learning"
    },
    {
      id: 4,
      title: "Next word prediction",
      description: "This LSTM based model predicts the next word based on the previous sequence of words in a sentence. Trained on a large corpus of text data.",
      image: "/lovable-uploads/project6.jpg",
      tech: ["streamlit", "Python", "LSTM", "GRU","NLP","Deep Learning","PyTorch"],
      category: "Recurrent Neural Nets"
    },
    {
      id: 5,
      title: "Multi-Variable Analysis",
      description: "Comprehensive correlation analysis platform for complex multi-dimensional dataset exploration.",
      image: "/lovable-uploads/33a55f09-740b-40ac-a9da-8ba90109b0c6.png",
      tech: ["Pandas", "Seaborn", "Statistical Analysis", "Data Viz"],
      category: "Data Science"
    },
    {
      id: 6,
      title: "Air Quality Classifier",
      description: "Environmental monitoring system using machine learning to classify air quality types and patterns using real world data and predict type of city.",
      image: "/lovable-uploads/ea3db8d9-ad5b-4289-b6af-e96197a562e3.png",
      tech: ["Classification","Neural Nets","BCE loss fn","Environmental ML", "streamlit", "API"],
      category: "classification using NNs"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 100, filter: "blur(20px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "power2.out", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }}
      );

      // Animate cards
      if (cardsRef.current) {
        gsap.fromTo(cardsRef.current.children,
          { opacity: 0, y: 50, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse"
          }}
        );
      }

      // Animate floating particles
      particleRefs.current.forEach((p, i) => {
        gsap.to(p, {
          y: `+=${10 + i * 5}`,
          x: `+=${10 + i * 5}`,
          duration: 4 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-32 bg-gradient-to-b from-background/50 to-background">
      {/* Floating Particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => { if (el) particleRefs.current[i] = el! }}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: `${15 + i * 5}px`,
            height: `${15 + i * 5}px`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
            opacity: 0.2,
            zIndex: 0,
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <h2 ref={titleRef} className="text-5xl md:text-6xl font-light tracking-tight mb-16 text-center glow-text">
          Featured <span className="text-primary">Projects</span>
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass-card group cursor-pointer hover:glow-primary transition-all duration-500 hover:-translate-y-4 relative z-10">
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="p-3 rounded-full glass-card hover:glow-secondary transition-all duration-300">
                    <Eye size={20} className="text-primary" />
                  </button>
                  <button className="p-3 rounded-full glass-card hover:glow-secondary transition-all duration-300">
                    <ArrowUpRight size={20} className="text-primary" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs px-3 py-1 rounded-full glass text-primary font-medium">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="btn-glass px-8 py-3 rounded-full text-lg font-medium inline-flex items-center gap-3 hover:gap-4 transition-all duration-300">
            View All Projects
            <ArrowUpRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
