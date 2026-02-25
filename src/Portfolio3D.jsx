import React, { useState, useEffect, useRef } from 'react';
import {
  Mail, Github, Linkedin, ChevronDown, ExternalLink,
  Brain, Code, TrendingUp, Menu, X,
  Briefcase, GraduationCap, Star, ArrowRight, MapPin, Phone
} from 'lucide-react';

/* ─── Scroll reveal ─────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setV(true); obs.unobserve(el); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, v];
}

const Reveal = ({ children, delay = 0, direction = 'up' }) => {
  const [ref, v] = useReveal();
  const transforms = {
    up:    v ? 'translateY(0)'   : 'translateY(48px)',
    left:  v ? 'translateX(0)'   : 'translateX(-48px)',
    right: v ? 'translateX(0)'   : 'translateX(48px)',
    scale: v ? 'scale(1)'        : 'scale(0.92)',
  };
  return (
    <div ref={ref} style={{
      opacity: v ? 1 : 0,
      transform: transforms[direction] || transforms.up,
      transition: `opacity .8s cubic-bezier(.22,1,.36,1) ${delay}s, transform .8s cubic-bezier(.22,1,.36,1) ${delay}s`,
    }}>{children}</div>
  );
};

/* ─── Tokens ─────────────────────────────────────────────── */
const BLUE       = '#0057FF';
const BLUE_LIGHT = '#EEF3FF';
const BLUE_MID   = '#D0DDFF';
const DARK       = '#0A0F1E';
const BODY       = '#374151';
const MUTED      = '#9CA3AF';
const WHITE      = '#FFFFFF';
const OFF        = '#F8F9FF';   /* very faint blue tint */
const CARD_BG    = '#FFFFFF';
const BORDER     = '#E8ECFF';

/* card shadow — soft blue-tinted, multi-layer */
const cardShadow   = '0 2px 8px rgba(0,87,255,0.04), 0 8px 24px rgba(0,87,255,0.08), 0 24px 48px rgba(0,87,255,0.06)';
const cardHoverShadow = '0 4px 12px rgba(0,87,255,0.08), 0 16px 40px rgba(0,87,255,0.16), 0 32px 64px rgba(0,87,255,0.10)';

/* ─── Skill badge ────────────────────────────────────────── */
const Skill = ({ label }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '7px 16px', borderRadius: 99,
        background: hov ? BLUE : BLUE_LIGHT,
        color: hov ? WHITE : BLUE,
        fontSize: 13, fontWeight: 600,
        border: `1.5px solid ${hov ? BLUE : BLUE_MID}`,
        transition: 'all .22s ease',
        boxShadow: hov ? '0 4px 16px rgba(0,87,255,0.25)' : 'none',
      }}
    >
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: hov ? WHITE : BLUE, flexShrink: 0 }} />
      {label}
    </span>
  );
};

/* ─── Section heading ────────────────────────────────────── */
const SectionHead = ({ tag, title, subtitle, center }) => (
  <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 64 }}>
    <span style={{
      display: 'inline-block', padding: '4px 14px', borderRadius: 99,
      background: BLUE_LIGHT, color: BLUE, fontSize: 12, fontWeight: 700,
      letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16,
      border: `1px solid ${BLUE_MID}`,
    }}>{tag}</span>
    <h2 style={{
      fontSize: 'clamp(32px,4vw,52px)', fontWeight: 800,
      color: DARK, letterSpacing: '-0.03em', lineHeight: 1.1,
      marginBottom: subtitle ? 16 : 0,
      fontFamily: "'Plus Jakarta Sans', sans-serif",
    }}>{title}</h2>
    {subtitle && <p style={{ fontSize: 17, color: MUTED, maxWidth: 520, margin: center ? '0 auto' : 0, lineHeight: 1.7 }}>{subtitle}</p>}
  </div>
);

/* ─── Project Card ───────────────────────────────────────── */
const ProjectCard = ({ project, accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov && accent ? BLUE : CARD_BG,
        borderRadius: 20,
        border: `1.5px solid ${hov ? (accent ? BLUE : BLUE_MID) : BORDER}`,
        padding: '28px 28px 24px',
        height: '100%', display: 'flex', flexDirection: 'column',
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all .32s cubic-bezier(.22,1,.36,1)',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {/* top gradient bar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: hov ? (accent ? WHITE : `linear-gradient(90deg, ${BLUE}, #6366F1)`) : `linear-gradient(90deg, ${BLUE_MID}, transparent)`,
        transition: 'all .32s',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12,
          background: hov && accent ? 'rgba(255,255,255,0.2)' : BLUE_LIGHT,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: `1px solid ${hov && accent ? 'rgba(255,255,255,0.3)' : BLUE_MID}`,
        }}>
          <Brain size={20} color={hov && accent ? WHITE : BLUE} />
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{
          display: 'flex', alignItems: 'center', gap: 4,
          padding: '6px 12px', borderRadius: 99,
          background: hov && accent ? 'rgba(255,255,255,0.15)' : BLUE_LIGHT,
          border: `1px solid ${hov && accent ? 'rgba(255,255,255,0.3)' : BLUE_MID}`,
          color: hov && accent ? WHITE : BLUE,
          textDecoration: 'none', fontSize: 12, fontWeight: 700,
          transition: 'all .22s',
        }}>
          View <ExternalLink size={12} />
        </a>
      </div>

      <span style={{
        display: 'inline-block', alignSelf: 'flex-start',
        padding: '3px 12px', borderRadius: 99, marginBottom: 10,
        background: hov && accent ? 'rgba(255,255,255,0.2)' : '#DCFCE7',
        color: hov && accent ? WHITE : '#16A34A',
        fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
      }}>{project.badge}</span>

      <h3 style={{
        fontSize: 17, fontWeight: 800, lineHeight: 1.3,
        color: hov && accent ? WHITE : DARK,
        marginBottom: 8, letterSpacing: '-0.01em',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        transition: 'color .22s',
      }}>{project.title}</h3>

      <p style={{
        fontSize: 13, lineHeight: 1.75,
        color: hov && accent ? 'rgba(255,255,255,0.8)' : MUTED,
        marginBottom: 18, flex: 1, transition: 'color .22s',
      }}>{project.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tech.map(t => (
          <span key={t} style={{
            fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 99,
            background: hov && accent ? 'rgba(255,255,255,0.15)' : BLUE_LIGHT,
            border: `1px solid ${hov && accent ? 'rgba(255,255,255,0.25)' : BLUE_MID}`,
            color: hov && accent ? WHITE : BLUE,
            transition: 'all .22s',
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   MAIN
══════════════════════════════════════════════ */
export default function Portfolio3D() {
  const [active, setActive]   = useState(0);
  const [menu, setMenu]       = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [loaded, setLoaded]   = useState(false);

  const sections  = ['hero','about','experience','projects','web-projects','testimonials','contact'];
  const navLabels = ['Home','About','Experience','ML Projects','Web Projects','Testimonials','Contact'];

  const experiences = [
    { title:'Audit Executive',        company:'Marriott Hotel Islamabad', period:'2022 – 2023', desc:'Conducted financial audits, compliance reviews, and risk assessments across hotel departments.', icon: Briefcase, color:'#F0FDF4', iconBg:'#DCFCE7', iconColor:'#16A34A' },
    { title:'Finance Officer',        company:'Agahi Pakistan',            period:'2021 – 2022', desc:'Managed budget analysis, financial reporting, and end-to-end operational finance.',              icon: TrendingUp, color:'#FFF7ED', iconBg:'#FFEDD5', iconColor:'#EA580C' },
    { title:'MS Business Analytics',  company:'FAST University Islamabad', period:'Current',     desc:'Specialising in Machine Learning, statistical modelling, and business intelligence systems.',    icon: GraduationCap, color: BLUE_LIGHT, iconBg: BLUE_MID, iconColor: BLUE },
  ];

  const testimonials = [
    { name:'Dr. Sarah Ahmed', role:'Professor, FAST University',      text:'Exceptional analytical skills and deep ML understanding. His projects showcase real-world problem-solving at a genuinely high level.', rating:5 },
    { name:'Hassan Malik',    role:'Senior Data Scientist, TechCorp', text:'His ability to translate complex business problems into clean data solutions is remarkable. Impressive on every single project.',       rating:5 },
    { name:'Fatima Khan',     role:'Finance Manager, Marriott',       text:'Attention to detail and analytical mindset made him invaluable to our audit team. Highly recommended for data-driven roles.',          rating:5 },
  ];

  const mlProjects = [
    { title:'HBL Stock Price Prediction',   desc:'Linear Regression model with 3-year forward forecasting on HBL historical market data.',             link:'https://github.com/Muhammad-Ghulam-Ali/HBL-Stock-Price-Prediction',                tech:['Python','Scikit-Learn','Pandas'],      badge:'95% Accuracy' },
    { title:'Loan Approval Prediction',     desc:'Logistic regression with full statistical evaluation suite, confusion matrix, and LaTeX report.',     link:'https://github.com/Muhammad-Ghulam-Ali/loan-approval-prediction',                  tech:['Logistic Reg','ML','LaTeX'],           badge:'92% Precision' },
    { title:'Advanced Data Analysis',       desc:'Interactive retail analysis surfacing customer behaviour trends and hidden revenue opportunities.',    link:'https://github.com/Muhammad-Ghulam-Ali/Advanced-Data-Analysis',                    tech:['Data Viz','Feature Eng','EDA'],        badge:'20+ Insights'  },
    { title:'Fake Review Detector',         desc:'NLP pipeline using TF-IDF vectorisation and SVM classification to detect and flag fake reviews.',    link:'https://github.com/Muhammad-Ghulam-Ali/fake-review-detection-svm-nlp',            tech:['NLP','SVM','TF-IDF'],                  badge:'89% F1 Score'  },
    { title:'Bank Customer Segmentation',   desc:'Full clustering pipeline: SQL → PCA dimensionality reduction → KMeans → interactive Tkinter UI.',    link:'https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml',            tech:['SQL','KMeans','PCA','Tkinter'],        badge:'5 Clusters'    },
    { title:'AutoAnalytica',                desc:'Streamlit app for one-click automated EDA, data cleaning, and dashboard generation.',                link:'https://github.com/Muhammad-Ghulam-Ali/bank-customer-segmentation-ml',            tech:['Streamlit','Automation','Dashboard'],  badge:'Auto EDA'      },
    { title:'Financial Statement Analyzer', desc:'Smart SFSA web app automating ratio analysis and ML-based financial health score forecasting.',       link:'https://github.com/Muhammad-Ghulam-Ali/Smart-Financial-Statement-Analyzer-SFSA-', tech:['ML','Finance','Web App'],              badge:'Real-time'      },
  ];

  const webProjects = [
    { title:'Ecommerce Store',     desc:'Full front-end e-commerce with product listing, cart logic, and localStorage persistence.',   link:'https://github.com/Muhammad-Ghulam-Ali/ecommerce-store',       tech:['HTML','Bootstrap','JavaScript'],         badge:'Full Cart'    },
    { title:'Time Management App', desc:'Student productivity planner tracking assignments, quizzes, and deadlines with smart alerts.', link:'https://github.com/Muhammad-Ghulam-Ali/time_management_app', tech:['JavaScript','localStorage','Bootstrap'], badge:'Student Tool' },
  ];

  const skills = {
    'ML & AI':       ['Python','Scikit-Learn','TensorFlow','PyTorch','Pandas','NumPy','NLP'],
    'Data & BI':     ['SQL','Power BI','Tableau','Excel','Statistical Analysis'],
    'Web Dev':       ['React','JavaScript','HTML/CSS','Streamlit','Bootstrap'],
    'Tools':         ['Git','Jupyter','VS Code','Docker','AWS'],
  };

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const els = sections.map(id => document.getElementById(id));
      let cur = 0;
      els.forEach((el, i) => { if (el && window.scrollY >= el.offsetTop - window.innerHeight * 0.45) cur = i; });
      setActive(cur);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goto = id => { document.getElementById(id)?.scrollIntoView({ behavior:'smooth' }); setMenu(false); };

  return (
    <div style={{ background: WHITE, color: DARK, fontFamily:"'Plus Jakarta Sans', sans-serif", overflowX:'hidden' }}>

      {/* ══ NAV ══════════════════════════════════════════════ */}
      <nav style={{
        position:'fixed', top:0, left:0, right:0, zIndex:200,
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? `1px solid ${BORDER}` : '1px solid transparent',
        transition: 'all .4s ease',
      }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 28px', height:68, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {/* logo */}
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{
              width:38, height:38, borderRadius:10,
              background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`,
              display:'flex', alignItems:'center', justifyContent:'center',
              boxShadow:`0 4px 12px rgba(0,87,255,0.35)`,
            }}>
              <span style={{ color:WHITE, fontSize:13, fontWeight:900, letterSpacing:'-0.04em' }}>MG</span>
            </div>
            <span style={{ fontSize:16, fontWeight:800, color:DARK, letterSpacing:'-0.02em' }}>Muhammad Ghulam Ali</span>
          </div>

          {/* desktop nav */}
          <div className="hidden lg:flex" style={{ gap:2 }}>
            {navLabels.map((lbl, i) => (
              <button key={lbl} onClick={() => goto(sections[i])} style={{
                padding:'8px 16px', borderRadius:99, border:'none', cursor:'pointer',
                background: active===i ? BLUE_LIGHT : 'transparent',
                color: active===i ? BLUE : BODY,
                fontSize:14, fontWeight: active===i ? 700 : 500,
                transition:'all .2s', fontFamily:'inherit',
              }}>{lbl}</button>
            ))}
          </div>

          {/* hire me */}
          <button onClick={() => goto('contact')} className="hidden lg:flex" style={{
            padding:'10px 22px', borderRadius:99,
            background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`,
            color:WHITE, border:'none', cursor:'pointer',
            fontSize:14, fontWeight:700,
            boxShadow:`0 4px 16px rgba(0,87,255,0.35)`,
            transition:'transform .2s, box-shadow .2s', fontFamily:'inherit',
          }}
          onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,87,255,0.45)'; }}
          onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,87,255,0.35)'; }}>
            Hire Me →
          </button>

          <button className="lg:hidden" onClick={() => setMenu(!menu)} style={{ background:'none', border:'none', cursor:'pointer', color:DARK }}>
            {menu ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>

        {menu && (
          <div style={{ background:WHITE, borderTop:`1px solid ${BORDER}`, padding:'8px 20px 20px' }}>
            {navLabels.map((lbl, i) => (
              <button key={lbl} onClick={() => goto(sections[i])} style={{
                display:'block', width:'100%', textAlign:'left',
                padding:'12px 8px', background:'none', border:'none',
                borderBottom:`1px solid ${BORDER}`, cursor:'pointer',
                fontSize:15, fontWeight: active===i ? 700 : 400,
                color: active===i ? BLUE : DARK, fontFamily:'inherit',
              }}>{lbl}</button>
            ))}
          </div>
        )}
      </nav>

      {/* ══ HERO ═════════════════════════════════════════════ */}
      <section id="hero" style={{
        minHeight:'100vh', display:'flex', alignItems:'center',
        padding:'100px 28px 80px', position:'relative', overflow:'hidden',
        background:`linear-gradient(160deg, ${WHITE} 0%, ${OFF} 50%, ${BLUE_LIGHT} 100%)`,
      }}>
        {/* background orbs */}
        <div style={{ position:'absolute', top:'-10%', right:'-5%', width:600, height:600, borderRadius:'50%', background:`radial-gradient(circle, rgba(0,87,255,0.08) 0%, transparent 70%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-5%', left:'-5%',  width:400, height:400, borderRadius:'50%', background:`radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)`, pointerEvents:'none' }} />
        {/* grid */}
        <div style={{ position:'absolute', inset:0, backgroundImage:`radial-gradient(circle at 1px 1px, ${BLUE_MID} 1px, transparent 0)`, backgroundSize:'36px 36px', opacity:0.4, pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', width:'100%', position:'relative', zIndex:1 }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr auto', gap:60, alignItems:'center' }}>
            {/* left */}
            <div>
              {/* badge */}
              <div style={{
                opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(20px)',
                transition:'all .7s cubic-bezier(.22,1,.36,1) .1s',
              }}>
                <span style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'8px 18px', borderRadius:99,
                  background:WHITE, border:`1.5px solid ${BLUE_MID}`,
                  fontSize:13, color:BODY, fontWeight:600, marginBottom:28,
                  boxShadow: cardShadow,
                }}>
                  <span style={{ width:8, height:8, borderRadius:'50%', background:'#22C55E', boxShadow:'0 0 8px #22C55E99' }} />
                  Available for opportunities
                </span>
              </div>

              <h1 style={{
                fontFamily:"'Plus Jakarta Sans', sans-serif",
                fontSize:'clamp(44px,6.5vw,80px)', fontWeight:900,
                lineHeight:1.05, letterSpacing:'-0.04em', color:DARK,
                marginBottom:12,
                opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(28px)',
                transition:'all .8s cubic-bezier(.22,1,.36,1) .2s',
              }}>
                Turning Data into<br />
                <span style={{ background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`, WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
                  Decisions.
                </span>
              </h1>

              <p style={{
                fontSize:18, color:BODY, lineHeight:1.75, maxWidth:520,
                marginBottom:40,
                opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(20px)',
                transition:'all .8s cubic-bezier(.22,1,.36,1) .35s',
              }}>
                MS Business Analytics student at FAST University. Finance professional turned ML Engineer — I build models, pipelines, and apps that make data actionable.
              </p>

              <div style={{
                display:'flex', gap:14, flexWrap:'wrap',
                opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(20px)',
                transition:'all .8s cubic-bezier(.22,1,.36,1) .45s',
              }}>
                <button onClick={() => goto('contact')} style={{
                  padding:'14px 32px', borderRadius:99,
                  background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`,
                  color:WHITE, border:'none', cursor:'pointer',
                  fontSize:15, fontWeight:700,
                  boxShadow:`0 6px 24px rgba(0,87,255,0.4)`,
                  display:'flex', alignItems:'center', gap:8,
                  transition:'transform .22s, box-shadow .22s', fontFamily:'inherit',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 12px 36px rgba(0,87,255,0.5)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 6px 24px rgba(0,87,255,0.4)'; }}>
                  Get In Touch <ArrowRight size={17}/>
                </button>
                <button onClick={() => goto('projects')} style={{
                  padding:'14px 32px', borderRadius:99,
                  background:WHITE, color:DARK,
                  border:`1.5px solid ${BORDER}`, cursor:'pointer',
                  fontSize:15, fontWeight:700,
                  boxShadow: cardShadow,
                  transition:'all .22s', fontFamily:'inherit',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=cardHoverShadow; e.currentTarget.style.borderColor=BLUE_MID; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow=cardShadow; e.currentTarget.style.borderColor=BORDER; }}>
                  View Projects
                </button>
              </div>

              {/* social links */}
              <div style={{
                display:'flex', gap:12, marginTop:44,
                opacity: loaded?1:0, transform: loaded?'translateY(0)':'translateY(20px)',
                transition:'all .8s cubic-bezier(.22,1,.36,1) .55s',
              }}>
                {[
                  { href:'https://github.com/Muhammad-Ghulam-Ali', icon:<Github size={18}/>, label:'GitHub' },
                  { href:'https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216', icon:<Linkedin size={18}/>, label:'LinkedIn' },
                  { href:'mailto:mghulamali888@gmail.com', icon:<Mail size={18}/>, label:'Email' },
                ].map(({ href, icon, label }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{
                    display:'flex', alignItems:'center', gap:8, padding:'10px 18px', borderRadius:99,
                    background:WHITE, border:`1.5px solid ${BORDER}`,
                    color:BODY, textDecoration:'none', fontSize:14, fontWeight:600,
                    boxShadow: cardShadow, transition:'all .22s',
                  }}
                  onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.color=BLUE; e.currentTarget.style.borderColor=BLUE_MID; e.currentTarget.style.boxShadow=cardHoverShadow; }}
                  onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.color=BODY; e.currentTarget.style.borderColor=BORDER; e.currentTarget.style.boxShadow=cardShadow; }}>
                    {icon}{label}
                  </a>
                ))}
              </div>
            </div>

            {/* right — floating stat cards */}
            <div className="hidden lg:block" style={{
              display:'flex', flexDirection:'column', gap:16, alignItems:'flex-end',
              opacity: loaded?1:0, transform: loaded?'translateX(0)':'translateX(40px)',
              transition:'all 1s cubic-bezier(.22,1,.36,1) .5s',
            }}>
              {[
                { num:'7+',   label:'ML Projects',     sub:'Production-grade',     color:'#EEF3FF', accent: BLUE },
                { num:'95%',  label:'Best Accuracy',   sub:'Stock prediction model', color:'#F0FDF4', accent:'#16A34A' },
                { num:'2+',   label:'Years Experience',sub:'Finance & data roles',  color:'#FFF7ED', accent:'#EA580C' },
                { num:'MS',   label:'Business Analytics', sub:'FAST University',    color:'#F5F3FF', accent:'#7C3AED' },
              ].map(({ num, label, sub, color, accent }) => (
                <StatCard key={label} num={num} label={label} sub={sub} color={color} accent={accent} />
              ))}
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <button onClick={() => goto('about')} style={{
          position:'absolute', bottom:36, left:'50%', transform:'translateX(-50%)',
          background:'none', border:'none', cursor:'pointer',
          display:'flex', flexDirection:'column', alignItems:'center', gap:6,
          color:MUTED, fontSize:12, fontWeight:600, letterSpacing:'0.06em', textTransform:'uppercase',
          animation:'bounceY 2.2s infinite',
        }}>
          Scroll <ChevronDown size={20}/>
        </button>
      </section>

      {/* ══ ABOUT ════════════════════════════════════════════ */}
      <section id="about" style={{ padding:'120px 28px', background:OFF }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'start' }}>
            <Reveal direction="left">
              <SectionHead tag="About Me" title={<>Finance background.<br />Data science brain.</>} />
              <p style={{ fontSize:17, color:BODY, lineHeight:1.85, marginBottom:32 }}>
                I'm an MS Business Analytics student at FAST University with real-world experience as an <strong style={{ color:DARK }}>Audit Executive at Marriott</strong> and <strong style={{ color:DARK }}>Finance Officer at Agahi Pakistan</strong>. I sit at the intersection of finance and machine learning — translating complex data into clear business decisions.
              </p>
              <div style={{ display:'flex', gap:12 }}>
                <button onClick={() => goto('projects')} style={{
                  padding:'12px 24px', borderRadius:99,
                  background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`,
                  color:WHITE, border:'none', cursor:'pointer',
                  fontSize:14, fontWeight:700,
                  boxShadow:`0 4px 16px rgba(0,87,255,0.35)`,
                  transition:'all .22s', fontFamily:'inherit',
                }}>View Projects</button>
              </div>
            </Reveal>

            <Reveal direction="right" delay={0.1}>
              <div style={{ marginBottom:8 }}>
                <span style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:MUTED }}>Skills & Technologies</span>
              </div>
              {Object.entries(skills).map(([cat, list], ci) => (
                <div key={cat} style={{ marginBottom:20 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10 }}>
                    <span style={{ fontSize:12, fontWeight:800, color:BLUE, letterSpacing:'0.06em', textTransform:'uppercase' }}>{cat}</span>
                    <div style={{ flex:1, height:1, background:BORDER }} />
                  </div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                    {list.map((s, si) => (
                      <Reveal key={s} delay={ci * 0.05 + si * 0.03}>
                        <Skill label={s} />
                      </Reveal>
                    ))}
                  </div>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ EXPERIENCE ═══════════════════════════════════════ */}
      <section id="experience" style={{ padding:'120px 28px', background:WHITE }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <SectionHead tag="Journey" title="Experience & Education" subtitle="From finance floors to machine learning pipelines." center />
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {experiences.map(({ title, company, period, desc, icon: Icon, color, iconBg, iconColor }, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <ExpCard title={title} company={company} period={period} desc={desc} Icon={Icon} color={color} iconBg={iconBg} iconColor={iconColor} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ML PROJECTS ══════════════════════════════════════ */}
      <section id="projects" style={{ padding:'120px 28px', background:OFF }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <SectionHead tag="Machine Learning" title="ML & Data Science Projects" subtitle="Real-world models with measurable impact." center />
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))', gap:22 }}>
            {mlProjects.map((p, i) => (
              <Reveal key={i} delay={(i % 3) * 0.1}>
                <ProjectCard project={p} accent={i % 4 === 0} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WEB PROJECTS ═════════════════════════════════════ */}
      <section id="web-projects" style={{ padding:'120px 28px', background:WHITE }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <SectionHead tag="Web Development" title="Web Projects" subtitle="Clean, functional front-end applications." center />
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(340px,1fr))', gap:24, maxWidth:860, margin:'0 auto' }}>
            {webProjects.map((p, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <WebCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ═════════════════════════════════════ */}
      <section id="testimonials" style={{ padding:'120px 28px', background:OFF }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <SectionHead tag="Testimonials" title="What People Say" subtitle="Words from colleagues, professors, and managers." center />
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:24 }}>
            {testimonials.map((t, i) => (
              <Reveal key={i} delay={i * 0.12}>
                <TestiCard t={t} featured={i === 1} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CONTACT ══════════════════════════════════════════ */}
      <section id="contact" style={{ padding:'120px 28px', background:WHITE }}>
        <div style={{ maxWidth:900, margin:'0 auto' }}>
          <Reveal>
            <SectionHead tag="Contact" title={<>Let's Work<br />Together.</>} subtitle="Open to data analyst, ML engineer, and business analyst roles. Let's build something meaningful." />
          </Reveal>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            {/* contact info */}
            <Reveal direction="left" delay={0.1}>
              <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
                {[
                  { href:'mailto:mghulamali888@gmail.com', icon:<Mail size={20}/>, label:'mghulamali888@gmail.com', sub:'Send an email' },
                  { href:'https://github.com/Muhammad-Ghulam-Ali', icon:<Github size={20}/>, label:'Muhammad-Ghulam-Ali', sub:'GitHub Profile' },
                  { href:'https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216', icon:<Linkedin size={20}/>, label:'Muhammad Ghulam Ali', sub:'LinkedIn Profile' },
                ].map(({ href, icon, label, sub }) => (
                  <ContactCard key={href} href={href} icon={icon} label={label} sub={sub} />
                ))}
              </div>
            </Reveal>

            {/* big CTA card */}
            <Reveal direction="right" delay={0.15}>
              <div style={{
                background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`,
                borderRadius:24, padding:'48px 40px',
                boxShadow:`0 24px 64px rgba(0,87,255,0.35)`,
                height:'100%', display:'flex', flexDirection:'column', justifyContent:'center',
              }}>
                <span style={{ fontSize:12, fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', marginBottom:16 }}>Ready to collaborate</span>
                <h3 style={{ fontSize:36, fontWeight:900, color:WHITE, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:16, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>
                  I'm just one<br />message away.
                </h3>
                <p style={{ fontSize:15, color:'rgba(255,255,255,0.75)', lineHeight:1.75, marginBottom:32 }}>
                  Whether you have a project, a role, or just want to connect — I'd love to hear from you.
                </p>
                <a href="mailto:mghulamali888@gmail.com" style={{
                  display:'inline-flex', alignItems:'center', gap:8,
                  padding:'14px 28px', borderRadius:99, background:WHITE,
                  color:BLUE, textDecoration:'none', fontSize:15, fontWeight:800,
                  alignSelf:'flex-start', transition:'all .22s',
                  boxShadow:'0 4px 16px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 8px 32px rgba(0,0,0,0.2)'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='0 4px 16px rgba(0,0,0,0.15)'; }}>
                  Say Hello <ArrowRight size={17}/>
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer style={{ background:DARK, padding:'32px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:32, height:32, borderRadius:8, background:`linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <span style={{ color:WHITE, fontSize:11, fontWeight:900 }}>MG</span>
          </div>
          <span style={{ color:'rgba(255,255,255,0.8)', fontSize:14, fontWeight:600 }}>Muhammad Ghulam Ali</span>
        </div>
        <span style={{ color:'rgba(255,255,255,0.4)', fontSize:13 }}>© 2026 · Data Scientist · ML Engineer</span>
        <div style={{ display:'flex', gap:16 }}>
          {[
            { href:'https://github.com/Muhammad-Ghulam-Ali', icon:<Github size={18}/> },
            { href:'https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216', icon:<Linkedin size={18}/> },
            { href:'mailto:mghulamali888@gmail.com', icon:<Mail size={18}/> },
          ].map(({ href, icon }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" style={{ color:'rgba(255,255,255,0.4)', transition:'color .2s' }}
              onMouseEnter={e=>e.currentTarget.style.color=WHITE}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.4)'}>
              {icon}
            </a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; }
        .hidden { display:none !important; }
        @media(min-width:1024px){ .hidden.lg\\:flex{ display:flex !important; } .hidden.lg\\:block{ display:block !important; } }
        @media(max-width:768px){
          #about > div > div,
          #contact > div > div:last-child { grid-template-columns:1fr !important; }
        }
        @keyframes bounceY {
          0%,100% { transform:translateX(-50%) translateY(0); }
          50%      { transform:translateX(-50%) translateY(9px); }
        }
      `}</style>
    </div>
  );
}

/* ─── Stat card ──────────────────────────────────────────── */
const StatCard = ({ num, label, sub, color, accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? WHITE : color,
        border:`1.5px solid ${hov ? BLUE_MID : BORDER}`,
        borderRadius:16, padding:'16px 22px', minWidth:200,
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateY(-4px) translateX(-4px)' : 'none',
        transition:'all .28s cubic-bezier(.22,1,.36,1)',
      }}>
      <div style={{ fontSize:30, fontWeight:900, color:accent, letterSpacing:'-0.04em', lineHeight:1, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{num}</div>
      <div style={{ fontSize:14, fontWeight:700, color:DARK, marginTop:4 }}>{label}</div>
      <div style={{ fontSize:12, color:MUTED, marginTop:2 }}>{sub}</div>
    </div>
  );
};

/* ─── Experience card ────────────────────────────────────── */
const ExpCard = ({ title, company, period, desc, Icon, color, iconBg, iconColor }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: hov ? color : WHITE,
        border:`1.5px solid ${hov ? BLUE_MID : BORDER}`,
        borderRadius:20, padding:'32px',
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateY(-8px)' : 'none',
        transition:'all .32s cubic-bezier(.22,1,.36,1)',
        height:'100%',
      }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:24 }}>
        <div style={{ width:50, height:50, borderRadius:14, background:iconBg, display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 4px 12px ${iconBg}88` }}>
          <Icon size={24} color={iconColor}/>
        </div>
        <span style={{ fontSize:12, fontWeight:700, color:MUTED, background:OFF, padding:'5px 12px', borderRadius:99, border:`1px solid ${BORDER}` }}>{period}</span>
      </div>
      <h3 style={{ fontSize:19, fontWeight:800, color:DARK, marginBottom:6, letterSpacing:'-0.01em', fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{title}</h3>
      <p style={{ fontSize:13, fontWeight:700, color:iconColor, marginBottom:14, letterSpacing:'0.02em' }}>{company}</p>
      <p style={{ fontSize:14, color:BODY, lineHeight:1.75 }}>{desc}</p>
    </div>
  );
};

/* ─── Web card ───────────────────────────────────────────── */
const WebCard = ({ project: p }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: WHITE, borderRadius:20, padding:'32px',
        border:`1.5px solid ${hov ? BLUE_MID : BORDER}`,
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateY(-8px)' : 'none',
        transition:'all .32s cubic-bezier(.22,1,.36,1)',
        height:'100%', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden',
      }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background: hov ? `linear-gradient(90deg, ${BLUE}, #6366F1)` : `linear-gradient(90deg, ${BLUE_MID}, transparent)`, transition:'all .32s' }} />
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:20 }}>
        <div style={{ width:50, height:50, borderRadius:14, background:BLUE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', border:`1px solid ${BLUE_MID}` }}>
          <Code size={24} color={BLUE}/>
        </div>
        <a href={p.link} target="_blank" rel="noopener noreferrer" style={{
          display:'flex', alignItems:'center', gap:5, padding:'8px 16px', borderRadius:99,
          background: hov ? BLUE : BLUE_LIGHT, border:`1px solid ${hov ? BLUE : BLUE_MID}`,
          color: hov ? WHITE : BLUE, textDecoration:'none',
          fontSize:13, fontWeight:700, transition:'all .22s',
        }}>View <ExternalLink size={13}/></a>
      </div>
      <span style={{ display:'inline-block', padding:'4px 12px', borderRadius:99, background:'#DCFCE7', color:'#16A34A', fontSize:11, fontWeight:700, marginBottom:14, alignSelf:'flex-start' }}>{p.badge}</span>
      <h3 style={{ fontSize:20, fontWeight:800, color:DARK, marginBottom:10, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{p.title}</h3>
      <p style={{ fontSize:14, color:BODY, lineHeight:1.75, marginBottom:20, flex:1 }}>{p.desc}</p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {p.tech.map(t => (
          <span key={t} style={{ fontSize:12, fontWeight:600, padding:'5px 12px', borderRadius:99, background:BLUE_LIGHT, border:`1px solid ${BLUE_MID}`, color:BLUE }}>{t}</span>
        ))}
      </div>
    </div>
  );
};

/* ─── Testimonial card ───────────────────────────────────── */
const TestiCard = ({ t, featured }) => {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background: featured ? `linear-gradient(135deg, ${BLUE} 0%, #6366F1 100%)` : WHITE,
        border:`1.5px solid ${hov&&!featured ? BLUE_MID : BORDER}`,
        borderRadius:20, padding:'32px',
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateY(-8px)' : 'none',
        transition:'all .32s cubic-bezier(.22,1,.36,1)',
        height:'100%',
      }}>
      <div style={{ display:'flex', gap:3, marginBottom:20 }}>
        {[...Array(t.rating)].map((_,j)=>(
          <Star key={j} size={16} style={{ fill: featured?'#FCD34D':'#FBBF24', color: featured?'#FCD34D':'#FBBF24' }}/>
        ))}
      </div>
      <p style={{ fontSize:15, lineHeight:1.8, color: featured?'rgba(255,255,255,0.9)':BODY, marginBottom:28, fontStyle:'italic' }}>"{t.text}"</p>
      <div style={{ borderTop:`1px solid ${featured?'rgba(255,255,255,0.2)':BORDER}`, paddingTop:20 }}>
        <h4 style={{ fontSize:16, fontWeight:800, color: featured?WHITE:DARK, marginBottom:4, fontFamily:"'Plus Jakarta Sans', sans-serif" }}>{t.name}</h4>
        <p style={{ fontSize:13, color: featured?'rgba(255,255,255,0.65)':MUTED, fontWeight:500 }}>{t.role}</p>
      </div>
    </div>
  );
};

/* ─── Contact card ───────────────────────────────────────── */
const ContactCard = ({ href, icon, label, sub }) => {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        display:'flex', alignItems:'center', gap:16, padding:'20px 24px', borderRadius:16,
        background: hov ? BLUE_LIGHT : WHITE,
        border:`1.5px solid ${hov ? BLUE_MID : BORDER}`,
        textDecoration:'none', color:DARK,
        boxShadow: hov ? cardHoverShadow : cardShadow,
        transform: hov ? 'translateX(6px)' : 'none',
        transition:'all .28s cubic-bezier(.22,1,.36,1)',
      }}>
      <div style={{ width:46, height:46, borderRadius:12, background: hov ? BLUE : BLUE_LIGHT, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, transition:'all .22s', boxShadow: hov ? `0 4px 16px rgba(0,87,255,0.3)` : 'none' }}>
        {React.cloneElement(icon, { color: hov ? WHITE : BLUE })}
      </div>
      <div>
        <div style={{ fontSize:15, fontWeight:700, color:DARK, wordBreak:'break-all' }}>{label}</div>
        <div style={{ fontSize:12, color:MUTED, marginTop:2, fontWeight:500 }}>{sub}</div>
      </div>
    </a>
  );
};