import React, { useEffect, useState } from 'react';
import '../style/Home.scss';
import AnimatedBackground from '../components/AnimatedBackground';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../auth/hooks/useAuth';
import features from '../../../../public/features.jpg'

const row1Testimonials = [
  { 
    name: 'Jordan Lee', 
    handle: '@jordantalks', 
    text: 'The resume builder alone is incredible, but the custom interview preparation plan completely streamlined my entire application process.' 
  },
  { 
    name: 'Avery Johnson', 
    handle: '@averywrites', 
    text: 'Unbelievable accuracy with the tailored AI resumes. Landed three technical interviews in a week because my profile finally aligned with what recruiters wanted.' 
  },
  { 
    name: 'Briar Martin', 
    handle: '@neilstellar', 
    text: 'The real-time analytics and skill gap report pinpointed exactly where my portfolio was falling short. Absolute game-changer for engineering roles.' 
  },
  { 
    name: 'Aniket Sharma', 
    handle: '@sharma_codes', 
    text: 'The depth of the interview prep questions generated for my specific stack was brilliant. Highly recommend resumeCO. for technical track preparation.' 
  },
];

const row2Testimonials = [
  { 
    name: 'Deepak Rawat', 
    handle: '@deepak_rawat', 
    text: 'The technical questions matched my tier-1 company rounds perfectly. The step-by-step preparation roadmap is structured incredibly well.' 
  },
  { 
    name: 'Sarah Jenkins', 
    handle: '@sarahtech', 
    text: 'I loved how the action plan broke down complex technical topics into daily, manageable milestones. Took away all my prep anxiety!' 
  },
  { 
    name: 'Kshitij Jha', 
    handle: '@kj_dev', 
    text: 'Exceptional UI/UX flow. Being able to compare my resume against job descriptions and get an instant severity-coded skill gap analysis is flawless.' 
  },
  { 
    name: 'Elena Rostova', 
    handle: '@elena_codes', 
    text: 'The behavioral evaluation caught critical blind spots in my communication patterns that I completely missed during previous mock rounds.' 
  },
];

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const { user } = useAuth(); 

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setIsVisible(true);
    
    if (user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [user]); 

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate('/generate');
    } else {
      navigate('/login', { state: { from: '/generate' } });
    }
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (!element) return;

    const navbarOffset = 0; 
    const startPosition = window.scrollY;
    const targetPosition = element.getBoundingClientRect().top + startPosition - navbarOffset;
    const distance = targetPosition - startPosition;
    
    const duration = 1000; 
    let startTimestamp = null;

    const easeOutCubic = (t) => {
      return 1 - Math.pow(1 - t, 3);
    };

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      const progress = Math.min(elapsed / duration, 1);
      
      window.scrollTo(0, startPosition + distance * easeOutCubic(progress));

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  };

  return (
    <div className={`landing-container ${isVisible ? 'fade-in' : ''}`}>
      <AnimatedBackground/>    
      {/* Top Banner */}
      <div className="top-banner">
        <span className="badge">New</span> AI Feature Added
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">resume<span className="dot">CO.</span></div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
          <a href="#features" onClick={(e) => handleScroll(e, 'features')}>Features</a>
          <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')}>Testimonials</a>
        </div>
        <div className="nav-actions">
          {!isLoggedIn ? (
            <>
              {/* Added hide-on-mobile utility class */}
              <button className="btn-secondary hide-on-mobile" onClick={handleGetStarted}>
                Get started
              </button>
              <button className="btn-outline" onClick={() => navigate("/login")}>
                Login
              </button>
            </>
          ) : (
            <div className="profile-container" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="profile-icon">
                {user?.username ? user.username.charAt(0) : 'U'}
              </div>
              <span className="profile-username" style={{ fontWeight: '500', color: '#8d9cb0' }}>
                {user?.username || "User"}
              </span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section" id="home">
        <div className="user-count-badge">
          <div className="avatar-group">
            <span className="avatar">👤</span>
            <span className="avatar">👤</span>
            <span className="avatar">👤</span>
          </div>
          <p>⭐⭐⭐⭐⭐ Used by 10,000+ users</p>
        </div>
        <h1>Land your dream job with <br /><span className="highlight-text">AI-powered resumes.</span></h1>
        <p className="hero-subtitle">Create, edit and download professional resumes with AI-powered assistance.</p>
        
        <div className="hero-cta-group">
          <button className="btn-primary-green" onClick={handleGetStarted}>Generate Report →</button>
        </div>

        <div className="trust-footer">
          <p>Trusting by leading brands, including</p>
          <div className="brand-logos">
            <span>Instagram</span>
            <span>Framer</span>
            <span>Microsoft</span>
            <span>HUAWEI</span>
            <span>Walmart</span>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="features-section" id="features">
        <span className="section-tag">⚡ Simple Process</span>
        <h2>Build your resume</h2>
        <p className="section-subtitle" style={{marginBottom: 8}}>Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.</p>

        <div className="features-grid">
          <div className="neon-portal-container">
            <div className="portal-ping-ring"></div>
            <div className="portal-status-badge">
              <span className="ping-dot"></span>
              PORTAL CURRENTLY ACTIVE
            </div>
            <div className="floating-neon-graphic">
              <img 
                src={features}
                alt="AI Resume Neon-Magnetic Dark Portal Platform" 
              />
            </div>
          </div>
          <div className="features-list">
            <div className="feature-item transition-card">
              <div className="feature-icon">🔑</div>
              <div>
                <h3>AI Match Analytics</h3>
                <p>Get instant insights on how well your resume matches target job roles.</p>
              </div>
            </div>
            <div className="feature-item transition-card">
              <div className="feature-icon">📝</div>
              <div>
                <h3>Skill Gap Analysis</h3>
                <p>Pinpoint missing technical and behavioral skills with instant reports.</p>
              </div>
            </div>
            <div className="feature-item transition-card">
              <div className="feature-icon">📥</div>
              <div>
                <h3>Custom Roadmaps</h3>
                <p>Get structured, phase-by-phase action plans and interview questions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <span className="section-tag">📑 Testimonials</span>
        <h2>Don't just take our words</h2>
        <p className="section-subtitle">
            Hear what our users say about us. We're always looking for ways to improve. 
            If you have a positive experience with us, leave a review.
        </p>

        <div className="marquee-container-wrapper">
            <div className="fade-overlay left"></div>
            <div className="fade-overlay right"></div>

            {/* Row 1 */}
            <div className="testimonials-row">
            <div className="testimonials-track scroll-left">
                {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
                <div className="testimonial-card" key={`row1-${idx}`}>
                    <div className="card-header">
                    <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <div>
                        <h4>{item.name} <span className="verified-badge">✓</span></h4>
                        <span>{item.handle}</span>
                        </div>
                    </div>
                    </div>
                    <p className="card-body">{item.text}</p>
                </div>
                ))}
            </div>
            </div>

            {/* Row 2 */}
            <div className="testimonials-row">
            <div className="testimonials-track scroll-right">
                {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
                <div className="testimonial-card" key={`row2-${idx}`}>
                    <div className="card-header">
                    <div className="user-info">
                        <div className="user-avatar">👤</div>
                        <div>
                        <h4>{item.name} <span className="verified-badge">✓</span></h4>
                        <span>{item.handle}</span>
                        </div>
                    </div>
                    </div>
                    <p className="card-body">{item.text}</p>
                </div>
                ))}
            </div>
            </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="landing-footer">
        <div className="footer-glow-overlay"></div>
        
        <div className="footer-top">
          <div className="footer-brand-col">
            <div className="logo">resume<span className="dot">.</span></div>
            <p className="brand-desc">
              Elevating career building with industrial-grade AI architecture. Land your dream technical and creative roles flawlessly.
            </p>
            <div className="footer-status-pill">
              <span className="pulse-indicator"></span>
              All Systems Operational
            </div>
          </div>

          <div className="footer-links-grid">
            <div className="links-column">
              <h4>Product</h4>
              <a href="#features">AI Resume Builder</a>
              <a href="#features">Real-Time Analytics</a>
              <a href="#home">Premium Tiers</a>
              <a href="#home">System Design Review</a>
            </div>

            <div className="links-column">
              <h4>Resources</h4>
              <a href="#home">ATS Optimization Guide</a>
              <a href="#home">Interactive Demo</a>
              <a href="#home">API Documentation</a>
              <a href="#home">Tech Blog</a>
            </div>

            <div className="links-column">
              <h4>Company</h4>
              <a href="#contact">About Us</a>
              <a href="#contact">Careers</a>
              <a href="#contact">Security Stack</a>
              <a href="#contact">Contact Support</a>
            </div>
          </div>
        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p className="copyright">
            &copy; {new Date().getFullYear()} resume. All rights reserved. Built with secure end-to-end data pipelines.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#security">GDPR Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}