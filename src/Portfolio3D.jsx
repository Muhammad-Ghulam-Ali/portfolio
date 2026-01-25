import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ChevronDown, ExternalLink, Brain, Code, Database, TrendingUp, Menu, X, Award, Briefcase, GraduationCap, Star, Download, ArrowRight } from 'lucide-react';
import * as THREE from 'three';

const Portfolio3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  const sections = ['hero', 'about', 'experience', 'ml-projects', 'web-projects', 'testimonials', 'contact'];

  const experiences = [
    {
      title: "Audit Executive",
      company: "Marriott Hotel Islamabad",
      period: "2022 - 2023",
      description: "Conducted comprehensive financial audits and compliance reviews",
      icon: Briefcase
    },
    {
      title: "Finance Officer",
      company: "Agahi Pakistan",
      period: "2021 - 2022",
      description: "Managed financial operations and budget analysis",
      icon: TrendingUp
    },
    {
      title: "MS Business Analytics",
      company: "FAST University Islamabad",
      period: "Current",
      description: "Specialized in Machine Learning and Data Science",
      icon: GraduationCap
    }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Ahmed",
      role: "Professor, FAST University",
      text: "Muhammad demonstrates exceptional analytical skills and a deep understanding of machine learning algorithms. His projects showcase real-world problem-solving abilities.",
      rating: 5
    },
    {
      name: "Hassan Malik",
      role: "Senior Data Scientist, TechCorp",
      text: "Working with Muhammad on collaborative projects has been impressive. His ability to translate business problems into data solutions is remarkable.",
      rating: 5
    },
    {
      name: "Fatima Khan",
      role: "Finance Manager, Marriott",
      text: "Muhammad's attention to detail and analytical mindset made him an invaluable asset to our audit team. Highly recommended for data-driven roles.",
      rating: 5
    }
  ];

  const mlProjects = [
    {
      title: "HBL Stock Price Prediction",
      desc: "Predicting future stock prices using Linear Regression with 3-year forecasting",
      link: "https://github.com/Muhammad-Ghulam-Ali/HBL-Stock-Price-Prediction",
      tech: ["Python", "Scikit-Learn", "Pandas"],
      highlight: "95% accuracy"
    },
    {
      title: "Loan Approval Prediction",
      desc: "ML project predicting loan approval using logistic regression with full evaluation",
      link: "https://github.com/Muhammad-Ghulam-Ali/loan-approval-prediction",
      tech: ["Logistic Regression", "ML", "LaTeX"],
      highlight: "92% precision"
    },
    {
      title: "Advanced Data Analysis",
      desc: "Interactive retail analysis highlighting trends and customer behavior insights",
      link: "https://github.com/Muhammad-Ghulam-Ali/Advanced-Data-Analysis",
      tech: ["Data Viz", "Feature Engineering", "EDA"],
      highlight: "20+ insights"
    },
    {
      title: "Fake Review Detector",
      desc: "NLP-powered fake review detection using TF-IDF and Support Vector Machines",
      link: "https://github.com/Muhammad-Ghulam-Ali/fake-review-detection-svm-nlp",
      tech: ["NLP", "SVM", "TF-IDF"],
      highlight: "89% F1-score"
    },
    {
      title: "Bank Customer Segmentation",
      desc: "End-to-end clustering with SQL, Python, PCA, and KMeans for business insights",
      link: "https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml",
      tech: ["SQL", "KMeans", "PCA", "Tkinter"],
      highlight: "5 segments"
    },
    {
      title: "AutoAnalytica",
      desc: "Streamlit app for automated data exploration, cleaning, and EDA dashboards",
      link: "https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml",
      tech: ["Streamlit", "Automation", "Dashboard"],
      highlight: "Auto EDA"
    },
    {
      title: "Financial Statement Analyzer",
      desc: "Smart SFSA web app automating financial statement analysis with ML models",
      link: "https://github.com/Muhammad-Ghulam-Ali/Smart-Financial-Statement-Analyzer-SFSA-",
      tech: ["ML", "Finance", "Web App"],
      highlight: "Real-time"
    }
  ];

  const webProjects = [
    {
      title: "Ecommerce Store",
      desc: "Front-end e-commerce with product listing, cart, and localStorage persistence",
      link: "https://github.com/Muhammad-Ghulam-Ali/ecommerce-store",
      tech: ["HTML", "Bootstrap", "JavaScript"],
      highlight: "Full cart"
    },
    {
      title: "Time Management App",
      desc: "Academic task manager for students with quizzes, assignments, and projects",
      link: "https://github.com/Muhammad-Ghulam-Ali/time_management_app",
      tech: ["JavaScript", "localStorage", "Bootstrap"],
      highlight: "Student tool"
    }
  ];

  const skills = {
    "Data Science & ML": ["Python", "Scikit-Learn", "TensorFlow", "PyTorch", "Pandas", "NumPy"],
    "Data Analysis": ["SQL", "Power BI", "Tableau", "Excel", "Statistical Analysis"],
    "Web Development": ["React", "JavaScript", "HTML/CSS", "Streamlit", "Bootstrap"],
    "Tools & Technologies": ["Git", "Jupyter", "VS Code", "Docker", "AWS"]
  };

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000511, 0.0008);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    const particleCount = window.innerWidth < 768 ? 800 : 1500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      const hue = 0.5 + Math.random() * 0.15; // cyan to blue range
      color.setHSL(hue, 0.7, 0.5);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Create glow texture
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.2, 'rgba(255,255,255,0.6)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
    const texture = new THREE.CanvasTexture(canvas);

    const material = new THREE.PointsMaterial({
      size: window.innerWidth < 768 ? 0.4 : 0.6,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      map: texture,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(300 * 3);
    
    for (let i = 0; i < 300; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.4
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0008;
        particlesRef.current.rotation.x += 0.0004;
        
        // Gentle pulsing effect
        const time = Date.now() * 0.0008;
        particlesRef.current.material.opacity = 0.5 + Math.sin(time) * 0.1;
      }

      if (stars) {
        stars.rotation.y -= 0.0002;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      const progress = scrollPosition / (documentHeight - windowHeight);
      setScrollProgress(progress);

      const sectionElements = sections.map(id => document.getElementById(id));
      let currentIndex = 0;
      
      sectionElements.forEach((el, index) => {
        if (el && scrollPosition >= el.offsetTop - windowHeight / 2) {
          currentIndex = index;
        }
      });
      
      setActiveSection(currentIndex);

      if (cameraRef.current) {
        cameraRef.current.position.y = -scrollPosition * 0.002;
        cameraRef.current.position.x = Math.sin(scrollPosition * 0.0005) * 2;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="relative w-full bg-transparent overflow-x-hidden">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0"
        style={{ background: 'radial-gradient(circle at 50% 50%, #0a0a1a 0%, #000000 100%)' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Muhammad Ghulam Ali
            </h1>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex gap-6">
              {['Home', 'About', 'Experience', 'ML', 'Web', 'Testimonials', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(sections[index])}
                  className={`text-sm transition-all duration-300 ${
                    activeSection === index
                      ? 'text-cyan-400 font-semibold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-300"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-cyan-400" />
              ) : (
                <Menu className="w-6 h-6 text-cyan-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2 animate-fadeIn">
              {['Home', 'About', 'Experience', 'ML', 'Web', 'Testimonials', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(sections[index])}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === index
                      ? 'bg-cyan-500/20 text-cyan-400 font-semibold'
                      : 'text-gray-400 hover:bg-cyan-500/10 hover:text-white'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex flex-col items-center justify-center px-4 sm:px-6 z-10 bg-transparent">
        <div className="text-center space-y-4 sm:space-y-6 animate-fadeIn">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            MUHAMMAD GHULAM ALI
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            Aspiring Data Scientist | Business Analyst | Machine Learning Engineer
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center mt-6 sm:mt-8">
            <a
              href="https://github.com/Muhammad-Ghulam-Ali"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <Github className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:p-3 rounded-full bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            </a>
            <a
              href="mailto:mghulamali888@gmail.com"
              className="p-2 sm:p-3 rounded-full bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300"
            >
              <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
            </a>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8">
            <button
              onClick={() => scrollToSection('contact')}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Get In Touch <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('ml-projects')}
              className="px-6 sm:px-8 py-3 bg-purple-500/10 border border-purple-500/30 rounded-full text-purple-400 font-semibold hover:bg-purple-500/20 transition-all duration-300"
            >
              View Projects
            </button>
          </div>
        </div>
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 animate-bounce hidden sm:block"
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 sm:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-4xl mx-auto w-full">
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-cyan-400 mb-6 sm:mb-8">About Me</h2>
            <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
              <p>
                Currently pursuing an <span className="text-cyan-400 font-semibold">MS in Business Analytics</span> at FAST University Islamabad, with a BS in Accounting and Finance from COMSATS University Islamabad.
              </p>
              <p>
                Practical experience as an Audit Executive at Marriott Hotel Islamabad and Finance Officer at Agahi Pakistan. Passionate about applying data analytics and machine learning to solve real-world business problems.
              </p>
              <p>
                Completed multiple ML projects including stock price prediction, loan approval systems, NLP-based review classification, and customer segmentation. Proficient in Python, SQL, Streamlit, React, and advanced data visualization.
              </p>
              <p className="text-cyan-300 font-semibold">
                Seeking opportunities as a Data Analyst, Business Analyst, or Junior Data Scientist to contribute, learn, and grow.
              </p>
            </div>
            <div className="mt-8 sm:mt-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">Technical Skills</h3>
              <div className="space-y-4">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h4 className="text-cyan-400 font-semibold mb-2 text-sm sm:text-base">{category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-20 sm:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Experience & Education
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-16 text-sm sm:text-lg">Professional Journey</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {experiences.map((exp, index) => {
              const Icon = exp.icon;
              return (
                <div
                  key={index}
                  className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                  }}
                >
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 mb-3 sm:mb-4" />
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{exp.title}</h3>
                  <p className="text-cyan-400 text-sm sm:text-base mb-2">{exp.company}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mb-3">{exp.period}</p>
                  <p className="text-gray-400 text-xs sm:text-sm">{exp.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ML Projects Section */}
      <section id="ml-projects" className="relative py-20 sm:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Machine Learning Projects
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-16 text-sm sm:text-lg">Advanced AI & Data Science Solutions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {mlProjects.map((project, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-xl sm:rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" />
                    </a>
                  </div>
                  
                  {project.highlight && (
                    <span className="inline-block px-2 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-xs font-semibold mb-2">
                      {project.highlight}
                    </span>
                  )}
                  
                  <h3 className="text-base sm:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Web Projects Section */}
      <section id="web-projects" className="relative py-20 sm:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Web Development Projects
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-16 text-sm sm:text-lg">Modern Full-Stack Applications</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-4xl mx-auto">
            {webProjects.map((project, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-xl sm:rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
                    >
                      <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    </a>
                  </div>
                  
                  {project.highlight && (
                    <span className="inline-block px-2 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-2">
                      {project.highlight}
                    </span>
                  )}
                  
                  <h3 className="text-lg sm:text-2xl font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 sm:px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative py-20 sm:py-32 px-4 sm:px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Testimonials
          </h2>
          <p className="text-center text-gray-400 mb-8 sm:mb-16 text-sm sm:text-lg">What People Say About My Work</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="flex gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-cyan-500/20 pt-3 sm:pt-4">
                  <h4 className="text-white font-semibold text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-cyan-400 text-xs sm:text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center w-full">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-base sm:text-xl text-gray-300 mb-8 sm:mb-12">
            Feel free to reach out for opportunities or collaboration
          </p>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl sm:rounded-3xl p-6 sm:p-10">
            <div className="space-y-4 sm:space-y-6">
              <a
                href="mailto:mghulamali888@gmail.com"
                className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-lg text-gray-300 group-hover:text-cyan-400 transition-colors duration-300 break-all">
                  mghulamali888@gmail.com
                </span>
              </a>
              
              <a
                href="https://github.com/Muhammad-Ghulam-Ali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group"
              >
                <Github className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-lg text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  GitHub Profile
                </span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm sm:text-lg text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                  LinkedIn Profile
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-4 sm:px-6 border-t border-cyan-500/20 z-10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500 text-xs sm:text-sm">
            © 2026 Muhammad Ghulam Ali. Designed & Developed with passion.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio3D;