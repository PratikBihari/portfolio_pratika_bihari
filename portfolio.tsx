import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowUpRight, BrainCircuit, Cpu, Database, 
  Globe, Github, Linkedin, Mail, Layout, ChevronDown, 
  MapPin, Calendar, Terminal, Briefcase, Menu, X, Award
} from 'lucide-react';

// --- DATA ---

const DATA = {
  name: "Pratika Bihari",
  role: "Generative AI & ML Architect",
  tagline: "Building intelligent systems with LLMs, Computer Vision, and advanced NLP.",
  about: "Experienced Data Scientist with 6+ years of expertise in developing end-to-end solutions. Currently leading the charge in creating innovative PoCs and projects in Generative AI (LLM & Agentic workflows) at Velocis Systems. I am also available as a freelance consultant to architect and deliver custom AI solutions for forward-thinking businesses.",
  email: "pratikbihari@gmail.com",
  location: "Nagpur / Odisha, India",
  links: {
    github: "https://github.com/PratikBihari",
    linkedin: "https://www.linkedin.com/in/pratika-bihari-96a22a89/",
    medium: "https://medium.com/@pratik_py",
    youtube: "https://www.youtube.com/@pratik_py"
  }
};

const SKILLS = {
  genAi: ["LangGraph", "LangChain", "OpenAI API", "Groq API", "Prompt Engineering", "RAG", "CrewAI Agents", "Milvus DB", "Agentic AI Workflow", "Fine-tuning LLM", "MCP"],
  azure: ["Azure Content Safety", "AI Foundry", "CosmosDB Vector", "Azure OpenAI", "Copilot", "Document Intelligence", "AI Search", "AWS Bedrock"],
  ml: ["Transformers", "Bert", "GPT", "Deep Learning", "CNN", "Image Processing", "Object Detection", "OCR"],
  dev: ["Python", "FastAPI", "Flask", "Docker", "DVC/MLflow", "GitHub Actions", "Streamlit", "Chainlit"]
};

const EXPERIENCE = [
  {
    role: "Senior Consultant",
    company: "Velocis Systems Pvt. Ltd.",
    location: "Nagpur, India",
    date: "July 2022 - Present",
    desc: "Delivered AI/ML & GenAI solutions across 4+ domains, improving decision accuracy and automation efficiency by 30-45%. Architected multi-agent LangGraph workflows, RAG systems, and enterprise chatbots. Contributed to project wins through scalable AI architectures."
  },
  {
    role: "Software Developer",
    company: "Prava Associates Pvt. Ltd.",
    location: "Bhubaneswar, India",
    date: "Aug 2021 - June 2022",
    desc: "Analyzed sales and inventory data using SQL & Python. Built Power BI dashboards for KPI tracking. Automated data pipelines and reporting workflows to improve data quality and efficiency."
  },
  {
    role: "Software Engineer",
    company: "Espire System Pvt. Ltd.",
    location: "Mumbai, India",
    date: "Nov 2019 - July 2021",
    desc: "Built Python + OpenCV-based face attendance system for contactless biometric authentication. Improved face recognition accuracy and robustness during COVID-era deployments."
  }
];

const PROJECTS = [
  {
    title: "Material Procurement Forecasting System",
    org: "Western Coalfields Limited",
    date: "2025",
    tech: ["Flask", "ARIMA", "Prophet", "Streamlit", "Pandas"],
    desc: "End-to-end Demand Forecasting App predicting procurement needs. Automated data workflows, reducing manual analysis time by 80%. Built an interactive Streamlit dashboard for real-time decision support."
  },
  {
    title: "Procurement Sahayak",
    org: "Western Coalfields Limited",
    date: "2025",
    tech: ["LangGraph", "Azure OpenAI", "Agentic AI", "Python"],
    desc: "An AI-driven procurement decision support system utilizing agent workflows and RAG. Automated policy validation to ensure compliance with the Coal India Purchase Manual and GeM General Terms & Conditions."
  },
  {
    title: "AI/ML Based Tender Evaluation System",
    org: "Western Coalfields Limited",
    date: "2026",
    tech: ["LangChain", "Milvus DB", "Azure AI Search", "FastAPI"],
    desc: "Architected and deployed a highly scalable RAG-based system for tender evaluation using multi-agent workflows. Reduced manual document analysis effort by 40-60% and accelerated insight turnaround times by 2-3x."
  },
  {
    title: "Face Attendance System",
    org: "Espire System Pvt Ltd.",
    date: "2021",
    tech: ["Python", "OpenCV", "Haar Cascades", "NumPy"],
    desc: "Contactless face recognition system deployed during COVID-19. Real-time face detection ensuring compliance with health protocols."
  }
];

const CERTIFICATIONS = [
  {
    title: "Foundations of Prompt Engineering",
    issuer: "AWS Training & Certification",
    date: "May 2026",
  },
  {
    title: "AI for Business Professionals",
    issuer: "HP LIFE / HP Foundation",
    date: "May 2026",
  },
  {
    title: "Full Stack Data Science BootCamp 2.0",
    issuer: "iNeuron Intelligence",
    date: "Nov 2024",
  },
  {
    title: "Claude 101",
    issuer: "Anthropic",
    date: "June 2026",
  },
  {
    title: "AI Fluency: Framework & Foundations",
    issuer: "Anthropic",
    date: "June 2026",
  }
];

// --- UTILITY COMPONENTS ---

const FadeInSection = ({ children, className = "", delay = 0, variant = "up" }) => {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }); // Triggers slightly after coming into view
    
    if (domRef.current) observer.observe(domRef.current);
    return () => observer.disconnect();
  }, []);

  // Define our premium animation variants
  const getVariantClasses = () => {
    if (isVisible) return "translate-y-0 translate-x-0 scale-100 blur-none opacity-100";
    switch (variant) {
      case "left": return "-translate-x-16 opacity-0";
      case "right": return "translate-x-16 opacity-0";
      case "scale": return "scale-90 opacity-0";
      case "blur": return "translate-y-8 blur-xl opacity-0";
      case "up":
      default: return "translate-y-16 opacity-0";
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${getVariantClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const SpotlightCard = ({ children, className = "" }) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative overflow-hidden rounded-[2rem] bg-zinc-900/40 border border-zinc-800 transition-all duration-500 ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(16,185,129,.12), transparent 40%)`,
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const ROLES = ["Generative AI & ML Architect", "Data Scientist", "Generative AI Specialist"];

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(scroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false); // Close menu on click for mobile
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="bg-[#030303] min-h-screen text-zinc-300 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden relative">
      
      {/* Global Animations & Progress */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 15s infinite alternate ease-in-out; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
      
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 z-[60] origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${scrollProgress})`, width: '100%' }}
      />

      {/* Background Ambient Glows */}
      <div className="fixed top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-900/20 blur-[150px] rounded-full pointer-events-none animate-blob" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none animate-blob animation-delay-2000" />
      <div className="fixed top-[40%] left-[-10%] w-[500px] h-[500px] bg-purple-900/10 blur-[150px] rounded-full pointer-events-none animate-blob animation-delay-4000" />

      {/* Floating Modern Navbar */}
      <nav className={`fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? 'w-[90%] md:w-[600px] bg-black/60 backdrop-blur-xl border-white/10 shadow-2xl shadow-black' : 'w-[95%] md:w-[800px] bg-transparent border-transparent'
      } border rounded-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between`}>
        <span className="text-white font-bold tracking-tighter text-xl">PB.</span>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          {['About', 'Expertise', 'Experience', 'Work', 'Certifications'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-zinc-400 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => scrollTo('contact')}
            className="hidden md:block bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition-transform"
          >
            Hire Me
          </button>
          
          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-zinc-300 hover:text-white transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#030303]/98 backdrop-blur-3xl z-[100] flex flex-col items-center justify-center transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <button 
          className="absolute top-6 right-6 p-2 text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X className="w-8 h-8" />
        </button>
        <div className="flex flex-col gap-8 text-center">
          {['About', 'Expertise', 'Experience', 'Work', 'Certifications', 'Contact'].map((item, idx) => (
            <button 
              key={item} 
              onClick={() => scrollTo(item.toLowerCase())}
              className="text-3xl font-bold text-zinc-400 hover:text-white transition-colors"
              style={{ transitionDelay: `${idx * 100}ms`, transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(20px)', opacity: isMobileMenuOpen ? 1 : 0 }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 md:px-6 text-center z-10">
        <FadeInSection variant="blur">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium mb-6 md:mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Available for Freelance AI Solutions
          </div>
        </FadeInSection>

        <FadeInSection delay={150} variant="blur">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600 tracking-tighter mb-4 md:mb-6 leading-[1.1] md:leading-tight">
            Architecting the <br className="hidden sm:block"/> future with <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500">AI.</span>
          </h1>
        </FadeInSection>

        <FadeInSection delay={300} variant="blur" className="mb-8 md:mb-12">
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto font-light mb-4">
            I am <strong className="text-white">Pratika Bihari</strong>. {DATA.tagline}
          </p>
          <div className="h-12 md:h-10 text-lg sm:text-xl md:text-2xl font-medium flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
             <span className="text-zinc-500">Specializing as a </span>
             <span className="text-emerald-400 transition-opacity duration-500 ease-in-out text-center">{ROLES[roleIndex]}</span>
          </div>
        </FadeInSection>

        <FadeInSection delay={450} variant="up">
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 w-full sm:w-auto px-4 sm:px-0">
            <button onClick={() => scrollTo('work')} className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
              Explore Work <ArrowUpRight className="w-4 h-4" />
            </button>
            <a href={DATA.links.github} target="_blank" rel="noreferrer" className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 rounded-full font-semibold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors text-white">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </FadeInSection>

        <div className="absolute bottom-8 md:bottom-10 animate-bounce text-zinc-600">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ABOUT & QUICK STATS */}
      <section id="about" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <FadeInSection variant="left">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4 md:mb-6">
              Engineering Intelligence.
            </h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed mb-6 md:mb-8">
              {DATA.about}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm">
              <div className="flex items-center gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" /> {DATA.location}
              </div>
              <div className="flex items-center gap-2 text-zinc-300">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" /> 6+ Years Exp.
              </div>
            </div>
          </FadeInSection>
          
          {/* Bento Stats */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <FadeInSection delay={100} variant="scale" className="h-full">
              <div className="p-4 md:p-6 h-full rounded-2xl md:rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">4+</h3>
                <p className="text-zinc-500 text-xs md:text-sm">Enterprise Domains</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={200} variant="scale" className="h-full">
              <div className="p-4 md:p-6 h-full rounded-2xl md:rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-colors">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-1 md:mb-2">2-3x</h3>
                <p className="text-zinc-500 text-xs md:text-sm">Faster Insights</p>
              </div>
            </FadeInSection>
            <FadeInSection delay={300} variant="scale" className="col-span-2">
              <div className="p-5 md:p-6 rounded-2xl md:rounded-3xl bg-gradient-to-br from-emerald-900/20 to-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 transition-colors">
                <h3 className="text-2xl font-bold text-emerald-400 mb-2">60%</h3>
                <p className="text-zinc-400 text-sm">Reduction in manual analysis effort via automated RAG & Agentic workflows.</p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* EXPERTISE (STACKED LIST) */}
      <section id="expertise" className="py-16 md:py-24 px-4 md:px-6 max-w-5xl mx-auto z-10 relative">
        <FadeInSection variant="blur">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 md:mb-12 text-center md:text-left">Technical Arsenal.</h2>
        </FadeInSection>
        
        <div className="flex flex-col gap-4 md:gap-6">
          {/* Gen AI Row */}
          <FadeInSection delay={100} variant="up">
            <SpotlightCard className="p-6 md:p-8 hover:border-emerald-500/50 group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all pointer-events-none"></div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="w-full md:w-1/3 md:border-r border-zinc-800/50 pb-4 md:pb-0 md:pr-8 shrink-0 flex flex-col justify-center border-b md:border-b-0">
                  <BrainCircuit className="w-8 h-8 md:w-10 md:h-10 text-emerald-400 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Generative AI & LLMs</h3>
                </div>
                <div className="w-full md:w-2/3 flex flex-wrap gap-2">
                  {SKILLS.genAi.map(skill => (
                    <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs md:text-sm rounded-full hover:border-emerald-500/50 hover:text-white transition-colors cursor-default backdrop-blur-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>

          {/* Cloud & Azure Row */}
          <FadeInSection delay={200} variant="up">
            <SpotlightCard className="p-6 md:p-8 hover:border-blue-500/50 group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-all pointer-events-none"></div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="w-full md:w-1/3 md:border-r border-zinc-800/50 pb-4 md:pb-0 md:pr-8 shrink-0 flex flex-col justify-center border-b md:border-b-0">
                  <CloudIcon className="w-8 h-8 md:w-10 md:h-10 text-blue-400 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Cloud & Azure AI</h3>
                </div>
                <div className="w-full md:w-2/3 flex flex-wrap gap-2">
                  {SKILLS.azure.map(skill => (
                    <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs md:text-sm rounded-full hover:border-blue-500/50 hover:text-white transition-colors cursor-default backdrop-blur-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>

          {/* Core ML Row */}
          <FadeInSection delay={300} variant="up">
            <SpotlightCard className="p-6 md:p-8 hover:border-purple-500/50 group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500/5 blur-[80px] rounded-full group-hover:bg-purple-500/10 transition-all pointer-events-none"></div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="w-full md:w-1/3 md:border-r border-zinc-800/50 pb-4 md:pb-0 md:pr-8 shrink-0 flex flex-col justify-center border-b md:border-b-0">
                  <Cpu className="w-8 h-8 md:w-10 md:h-10 text-purple-400 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Core ML & Vision</h3>
                </div>
                <div className="w-full md:w-2/3 flex flex-wrap gap-2">
                  {SKILLS.ml.map(skill => (
                    <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs md:text-sm rounded-full hover:border-purple-500/50 hover:text-white transition-colors cursor-default backdrop-blur-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>

          {/* Dev & Engineering Row */}
          <FadeInSection delay={400} variant="up">
            <SpotlightCard className="p-6 md:p-8 hover:border-rose-500/50 group">
              <div className="absolute top-0 left-0 w-64 h-64 bg-rose-500/5 blur-[80px] rounded-full group-hover:bg-rose-500/10 transition-all pointer-events-none"></div>
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center relative z-10">
                <div className="w-full md:w-1/3 md:border-r border-zinc-800/50 pb-4 md:pb-0 md:pr-8 shrink-0 flex flex-col justify-center border-b md:border-b-0">
                  <Terminal className="w-8 h-8 md:w-10 md:h-10 text-rose-400 mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-bold text-white">Engineering & MLOps</h3>
                </div>
                <div className="w-full md:w-2/3 flex flex-wrap gap-2">
                  {SKILLS.dev.map(skill => (
                    <span key={skill} className="px-3 py-1.5 md:px-4 md:py-2 bg-zinc-900/80 border border-zinc-800 text-zinc-300 text-xs md:text-sm rounded-full hover:border-rose-500/50 hover:text-white transition-colors cursor-default backdrop-blur-sm shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE */}
      <section id="experience" className="py-16 md:py-24 px-4 md:px-6 max-w-4xl mx-auto z-10 relative">
        <FadeInSection variant="up">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-12 md:mb-16 text-center md:text-left">Journey.</h2>
        </FadeInSection>

        <div className="space-y-8 md:space-y-12 relative before:absolute before:inset-0 before:left-6 md:before:left-1/2 md:before:-translate-x-px before:h-full before:w-px before:bg-gradient-to-b before:from-emerald-500 before:via-zinc-800 before:to-transparent">
          {EXPERIENCE.map((exp, idx) => (
            <FadeInSection key={idx} delay={idx * 150} variant={idx % 2 === 0 ? "right" : "left"} className="relative flex items-start md:items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
              {/* Timeline Icon */}
              <div className="absolute left-1 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#030303] bg-zinc-800 text-emerald-400 shrink-0 z-10 group-hover:bg-emerald-500 group-hover:text-black transition-colors shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <Briefcase className="w-4 h-4" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-3.5rem)] ml-auto md:ml-0 md:w-[calc(50%-3rem)] p-6 md:p-8 rounded-2xl md:rounded-3xl bg-zinc-900/30 border border-zinc-800/50 hover:border-emerald-500/30 hover:bg-zinc-900/60 transition-all">
                <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase mb-2 block">{exp.date}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">{exp.role}</h3>
                <p className="text-zinc-400 text-sm font-medium mb-4">{exp.company}</p>
                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                  {exp.desc}
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* FEATURED WORK */}
      <section id="work" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <FadeInSection variant="up">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 md:mb-12 text-center md:text-left">Selected Work.</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {PROJECTS.map((project, idx) => (
            <FadeInSection key={idx} delay={idx * 200} variant="up" className="h-full">
              <SpotlightCard className="group h-full p-6 md:p-10 hover:border-zinc-600 flex flex-col justify-between">
                {/* Abstract bg element */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-[60px] group-hover:bg-emerald-500/10 transition-colors pointer-events-none" />
                
                <div className="relative z-10 mb-6 md:mb-8 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-black/50 border border-zinc-800 rounded-xl md:rounded-2xl group-hover:scale-110 group-hover:bg-emerald-500/10 transition-all duration-300">
                      <Layout className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="text-zinc-500 font-mono text-xs md:text-sm">{project.date}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-emerald-400 text-xs md:text-sm font-medium mb-4 md:mb-6">{project.org}</p>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {project.desc}
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                  {project.tech.map(t => (
                    <span key={t} className="text-[10px] md:text-xs font-medium px-2.5 py-1 md:px-3 bg-white/5 border border-white/10 rounded-full text-zinc-300">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certifications" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto z-10 relative">
        <FadeInSection variant="up">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-8 md:mb-12 text-center md:text-left">Certifications.</h2>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {CERTIFICATIONS.map((cert, idx) => (
            <FadeInSection key={idx} delay={idx * 150} variant="scale" className="h-full">
              <SpotlightCard className="group h-full p-6 md:p-8 hover:border-emerald-500/50 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full group-hover:bg-emerald-500/10 transition-all pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-2.5 md:p-3 bg-zinc-800/50 border border-zinc-700/50 rounded-xl group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all duration-300">
                      <Award className="w-5 h-5 md:w-6 md:h-6 text-zinc-400 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    {cert.date && (
                      <span className="text-zinc-500 font-mono text-xs px-2.5 py-1 bg-zinc-800/30 rounded-full">{cert.date}</span>
                    )}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">{cert.title}</h3>
                  <p className="text-emerald-400 text-sm font-medium mt-auto pt-4">{cert.issuer}</p>
                </div>
              </SpotlightCard>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <section id="contact" className="py-24 md:py-32 px-4 md:px-6 border-t border-zinc-900 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeInSection variant="blur">
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white tracking-tighter mb-6 md:mb-8 leading-tight">
              Let's build the <br/> <span className="text-emerald-400">future together.</span>
            </h2>
            <p className="text-zinc-400 text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto">
              Available for freelance projects, custom AI solutions, or consulting to help your business leverage Generative AI.
            </p>
            <a 
              href={`mailto:${DATA.email}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold text-base md:text-lg hover:scale-105 transition-transform"
            >
              <Mail className="w-5 h-5" /> pratikbihari@gmail.com
            </a>

            <div className="flex items-center justify-center gap-6 mt-12 md:mt-16 text-zinc-500">
              <a href={DATA.links.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href={DATA.links.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <span className="sr-only">GitHub</span>
                <Github className="w-5 h-5 md:w-6 md:h-6" />
              </a>
              <a href={DATA.links.medium} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <span className="sr-only">Medium</span>
                <BookOpenIcon className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            </div>
            <p className="text-zinc-600 text-xs md:text-sm mt-8">&copy; {new Date().getFullYear()} Pratika Bihari. Designed with intent.</p>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
};

// Internal icon components
const CloudIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>
);

const BookOpenIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
);

export default App;