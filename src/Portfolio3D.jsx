import React, { useState, useEffect, useRef } from 'react';
import { Mail, Github, Linkedin, ChevronDown, ExternalLink, Brain, Code, Database, TrendingUp } from 'lucide-react';
import * as THREE from 'three';

const Portfolio3D = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const particlesRef = useRef(null);
  const animationFrameRef = useRef(null);

  const sections = ['hero', 'about', 'ml-projects', 'web-projects', 'contact'];

  const mlProjects = [
    {
      title: "HBL Stock Price Prediction",
      desc: "Predicting future stock prices using Linear Regression with 3-year forecasting",
      link: "https://github.com/Muhammad-Ghulam-Ali/HBL-Stock-Price-Prediction",
      tech: ["Python", "Scikit-Learn", "Pandas"]
    },
    {
      title: "Loan Approval Prediction",
      desc: "ML project predicting loan approval using logistic regression with full evaluation",
      link: "https://github.com/Muhammad-Ghulam-Ali/loan-approval-prediction",
      tech: ["Logistic Regression", "ML", "LaTeX"]
    },
    {
      title: "Advanced Data Analysis",
      desc: "Interactive retail analysis highlighting trends and customer behavior insights",
      link: "https://github.com/Muhammad-Ghulam-Ali/Advanced-Data-Analysis",
      tech: ["Data Viz", "Feature Engineering", "EDA"]
    },
    {
      title: "Fake Review Detector",
      desc: "NLP-powered fake review detection using TF-IDF and Support Vector Machines",
      link: "https://github.com/Muhammad-Ghulam-Ali/fake-review-detection-svm-nlp",
      tech: ["NLP", "SVM", "TF-IDF"]
    },
    {
      title: "Bank Customer Segmentation",
      desc: "End-to-end clustering with SQL, Python, PCA, and KMeans for business insights",
      link: "https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml",
      tech: ["SQL", "KMeans", "PCA", "Tkinter"]
    },
    {
      title: "AutoAnalytica",
      desc: "Streamlit app for automated data exploration, cleaning, and EDA dashboards",
      link: "https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml",
      tech: ["Streamlit", "Automation", "Dashboard"]
    },
    {
      title: "Financial Statement Analyzer",
      desc: "Smart SFSA web app automating financial statement analysis with ML models",
      link: "https://github.com/Muhammad-Ghulam-Ali/Smart-Financial-Statement-Analyzer-SFSA-",
      tech: ["ML", "Finance", "Web App"]
    }
  ];

  const webProjects = [
    {
      title: "Ecommerce Store",
      desc: "Front-end e-commerce with product listing, cart, and localStorage persistence",
      link: "https://github.com/Muhammad-Ghulam-Ali/ecommerce-store",
      tech: ["HTML", "Bootstrap", "JavaScript"]
    },
    {
      title: "Time Management App",
      desc: "Academic task manager for students with quizzes, assignments, and projects",
      link: "https://github.com/Muhammad-Ghulam-Ali/time_management_app",
      tech: ["JavaScript", "localStorage", "Bootstrap"]
    }
  ];

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000511, 0.0008);
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create Particle System
    const particleCount = 2000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

      const color = new THREE.Color();
      color.setHSL(0.6 + Math.random() * 0.2, 0.8, 0.6);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Add ambient stars
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = new Float32Array(1000 * 3);
    
    for (let i = 0; i < 1000; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 200;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.6
    });
    
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Animation Loop
    const animate = () => {
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
        particlesRef.current.rotation.x += 0.0002;
      }

      if (stars) {
        stars.rotation.y -= 0.0001;
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
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

      // Update active section
      const sectionIndex = Math.floor((scrollPosition / windowHeight) * 0.8);
      setActiveSection(Math.min(sectionIndex, sections.length - 1));

      // Animate camera based on scroll
      if (cameraRef.current) {
        cameraRef.current.position.y = -scrollPosition * 0.002;
        cameraRef.current.position.x = Math.sin(scrollPosition * 0.0005) * 2;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (index) => {
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: windowHeight * index,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative w-full bg-black overflow-x-hidden">
      {/* Three.js Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        style={{ background: 'radial-gradient(circle at 50% 50%, #0a0a1a 0%, #000000 100%)' }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Muhammad Ghulam Ali
          </h1>
          <div className="flex gap-6">
            {['Home', 'About', 'ML', 'Web', 'Contact'].map((item, index) => (
              <button
                key={item}
                onClick={() => scrollToSection(index)}
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
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center space-y-6 animate-fadeIn">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
            MUHAMMAD GHULAM ALI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Aspiring Data Scientist | Business Analyst | Machine Learning Engineer
          </p>
          <div className="flex gap-4 justify-center mt-8">
            <a
              href="https://github.com/Muhammad-Ghulam-Ali"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-300"
            >
              <Github className="w-6 h-6 text-cyan-400" />
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 transition-all duration-300"
            >
              <Linkedin className="w-6 h-6 text-blue-400" />
            </a>
            <a
              href="mailto:mghulamali888@gmail.com"
              className="p-3 rounded-full bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 transition-all duration-300"
            >
              <Mail className="w-6 h-6 text-purple-400" />
            </a>
          </div>
        </div>
        <button
          onClick={() => scrollToSection(1)}
          className="absolute bottom-10 animate-bounce"
        >
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </button>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-8 md:p-12 shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-8">About Me</h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
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
            <div className="mt-10 flex flex-wrap gap-3">
              {['Python', 'SQL', 'Machine Learning', 'Data Analysis', 'React', 'Streamlit', 'NLP', 'Deep Learning'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ML Projects Section */}
      <section className="relative min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Machine Learning Projects
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Advanced AI & Data Science Solutions</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mlProjects.map((project, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Brain className="w-8 h-8 text-cyan-400" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-cyan-400" />
                    </a>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300"
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
      <section className="relative min-h-screen px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Web Development Projects
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">Modern Full-Stack Applications</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {webProjects.map((project, index) => (
              <div
                key={index}
                className="group relative backdrop-blur-xl bg-gradient-to-br from-purple-500/5 to-pink-500/5 border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 rounded-2xl transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <Code className="w-8 h-8 text-purple-400" />
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300"
                    >
                      <ExternalLink className="w-5 h-5 text-purple-400" />
                    </a>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    {project.desc}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300"
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

      {/* Contact Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Feel free to reach out for opportunities or collaboration
          </p>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-3xl p-10">
            <div className="space-y-6">
              <a
                href="mailto:mghulamali888@gmail.com"
                className="flex items-center justify-center gap-4 p-4 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 group"
              >
                <Mail className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-300 group-hover:text-cyan-400 transition-colors duration-300">
                  mghulamali888@gmail.com
                </span>
              </a>
              
              <a
                href="https://github.com/Muhammad-Ghulam-Ali"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 p-4 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 group"
              >
                <Github className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-300 group-hover:text-purple-400 transition-colors duration-300">
                  GitHub Profile
                </span>
              </a>
              
              <a
                href="https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-4 p-4 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 group"
              >
                <Linkedin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg text-gray-300 group-hover:text-blue-400 transition-colors duration-300">
                  LinkedIn Profile
                </span>
              </a>
            </div>
          </div>
          
          <p className="mt-12 mb-0 text-gray-500 text-sm">
            Designed & Developed by Muhammad Ghulam Ali
          </p>
        </div>
      </section>

      <style jsx>{`
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
          animation: fadeIn 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Portfolio3D;