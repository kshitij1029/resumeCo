// import React, { useEffect, useState } from 'react';
// import '../style/Home.scss';
// import AnimatedBackground from '../components/AnimatedBackground';
// import { Link, useNavigate } from 'react-router';

// const row1Testimonials = [
//   { name: 'Jordan Lee', handle: '@jordantalks', text: 'The custom interview plan completely streamlined my preparation process.' },
//   { name: 'Avery Johnson', handle: '@averywrites', text: 'Unbelievable accuracy with the AI-powered resumes. Landed three interviews in a week.' },
//   { name: 'Briar Martin', handle: '@neilstellar', text: 'The real-time analytics helped me track exactly where my portfolio needs improvement.' },
//   { name: 'Aniket Sharma', handle: '@sharma_codes', text: 'Incredible depth on the system design reviews. Highly recommend the premium tier.' },
// ];

// const row2Testimonials = [
//   { name: 'Deepak Rawat', handle: '@deepak_rawat', text: 'The distributed system questions matched my tier-1 company rounds perfectly.' },
//   { name: 'Sarah Jenkins', handle: '@sarahtech', text: 'Simple, clean, and highly secure. The end-to-end encryption gives peace of mind.' },
//   { name: 'Kshitij Jha', handle: '@kj_dev', text: 'Exceptional UX/UI custom options. Building and iterating on variants is flawless.' },
//   { name: 'Elena Rostova', handle: '@elena_codes', text: 'The behavioral engine caught cognitive assessment patterns I completely missed.' },
// ];

// export default function Home() {
//   const navigate = useNavigate();
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleScroll = (e, id) => {
//     e.preventDefault();
//     const element = document.getElementById(id);
//     if (!element) return;

//     const navbarOffset = 0; // Adjusted for your fixed navbar height
//     const startPosition = window.scrollY;
//     const targetPosition = element.getBoundingClientRect().top + startPosition - navbarOffset;
//     const distance = targetPosition - startPosition;
    
//     // Duration of the slide in milliseconds (Increase for a slower, more epic slide)
//     const duration = 1000; 
//     let startTimestamp = null;

//     // Premium Easing Function: Cubic-Bezier / EaseOutQuad variant for fluid mechanics
//     const easeOutCubic = (t) => {
//       return 1 - Math.pow(1 - t, 3);
//     };

//     const step = (timestamp) => {
//       if (!startTimestamp) startTimestamp = timestamp;
//       const elapsed = timestamp - startTimestamp;
      
//       // Calculate progress between 0 and 1
//       const progress = Math.min(elapsed / duration, 1);
      
//       // Apply the easing curve to the distance
//       window.scrollTo(0, startPosition + distance * easeOutCubic(progress));

//       if (elapsed < duration) {
//         window.requestAnimationFrame(step);
//       }
//     };

//     window.requestAnimationFrame(step);
//   };

//   return (
//     <div className={`landing-container ${isVisible ? 'fade-in' : ''}`}>
//       <AnimatedBackground/>    
//       {/* Top Banner */}
//       <div className="top-banner">
//         <span className="badge">New</span> AI Feature Added
//       </div>

//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">resume<span className="dot">.</span></div>
//         <div className="nav-links">
//           <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
//           <a href="#features" onClick={(e) => handleScroll(e, 'features')}>Features</a>
//           <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')}>Testimonials</a>
//         </div>
//         <div className="nav-actions">
//           <button className="btn-secondary">Get started</button>
//           <button className="btn-outline" onClick={() => navigate("/Login")}>Login</button>
//         </div>
//       </nav>

//       {/* Hero Section (Page 2) */}
//       <header className="hero-section" id="home">
//         <div className="user-count-badge">
//           <div className="avatar-group">
//             <span className="avatar">👤</span>
//             <span className="avatar">👤</span>
//             <span className="avatar">👤</span>
//           </div>
//           <p>⭐⭐⭐⭐⭐ Used by 10,000+ users</p>
//         </div>
//         <h1>Land your dream job with <br /><span className="highlight-text">AI-powered resumes.</span></h1>
//         <p className="hero-subtitle">Create, edit and download professional resumes with AI-powered assistance.</p>
        
//         <div className="hero-cta-group">
//           <button className="btn-primary-green">Get started →</button>
          
//         </div>
//         <div className="trust-footer">
//           <p>Trusting by leading brands, including</p>
//           <div className="brand-logos">
//             <span>Instagram</span>
//             <span>Framer</span>
//             <span>Microsoft</span>
//             <span>HUAWEI</span>
//             <span>Walmart</span>
//           </div>
//         </div>
//       </header>

//       {/* Features Section (Page 3) */}
      
//       <section className="features-section" id="features">
//         <span className="section-tag">⚡ Simple Process</span>
//         <h2>Build your resume</h2>
//         <p className="section-subtitle" style={{marginBottom: 8}}>Our streamlined process helps you create a professional resume in minutes with intelligent AI-powered tools and features.</p>

//         <div className="features-grid">
//           {/* Neon Showcase Panel with Active Radar Portal Ping */}
//           <div className="neon-portal-container">
//             {/* Live Exploding Radar Circle */}
//             <div className="portal-ping-ring"></div>
            
//             {/* Active Status Badge */}
//             <div className="portal-status-badge">
//               <span className="ping-dot"></span>
//               PORTAL CURRENTLY ACTIVE
//             </div>

//             {/* Floating Themed Neon Vector */}
//             <div className="floating-neon-graphic">
//               <img 
//                 src="https://images.pexels.com/photos/5439449/pexels-photo-5439449.jpeg" 
//                 alt="AI Resume Neon-Magnetic Dark Portal Platform" 
//               />
//             </div>
//           </div>
//           <div className="features-list">
//             <div className="feature-item transition-card">
//               <div className="feature-icon">🔑</div>
//               <div>
//                 <h3>Real-Time Analytics</h3>
//                 <p>Get instant insights into your finances with live dashboards.</p>
//               </div>
//             </div>
//             <div className="feature-item transition-card">
//               <div className="feature-icon">📝</div>
//               <div>
//                 <h3>Bank-Grade Security</h3>
//                 <p>End-to-end encryption, 2FA, compliance with GDPR standards.</p>
//               </div>
//             </div>
//             <div className="feature-item transition-card">
//               <div className="feature-icon">📥</div>
//               <div>
//                 <h3>Customizable Reports</h3>
//                 <p>Export professional, audit-ready financial reports for tax or internal review.</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section (Page 4) */}
//       <section className="testimonials-section" id="testimonials">
//         <span className="section-tag">📑 Testimonials</span>
//         <h2>Don't just take our words</h2>
//         <p className="section-subtitle">
//             Hear what our users say about us. We're always looking for ways to improve. 
//             If you have a positive experience with us, leave a review.
//         </p>

//         <div className="marquee-container-wrapper">
//             {/* Left and Right Blur Overlays */}
//             <div className="fade-overlay left"></div>
//             <div className="fade-overlay right"></div>

//             {/* Row 1: Scrolling Left */}
//             <div className="testimonials-row">
//             <div className="testimonials-track scroll-left">
//                 {[...row1Testimonials, ...row1Testimonials].map((item, idx) => (
//                 <div className="testimonial-card" key={`row1-${idx}`}>
//                     <div className="card-header">
//                     <div className="user-info">
//                         <div className="user-avatar">👤</div>
//                         <div>
//                         <h4>{item.name} <span className="verified-badge">✓</span></h4>
//                         <span>{item.handle}</span>
//                         </div>
//                     </div>
//                     </div>
//                     <p className="card-body">{item.text}</p>
//                 </div>
//                 ))}
//             </div>
//             </div>

//             {/* Row 2: Scrolling Right */}
//             <div className="testimonials-row">
//             <div className="testimonials-track scroll-right">
//                 {[...row2Testimonials, ...row2Testimonials].map((item, idx) => (
//                 <div className="testimonial-card" key={`row2-${idx}`}>
//                     <div className="card-header">
//                     <div className="user-info">
//                         <div className="user-avatar">👤</div>
//                         <div>
//                         <h4>{item.name} <span className="verified-badge">✓</span></h4>
//                         <span>{item.handle}</span>
//                         </div>
//                     </div>
//                     </div>
//                     <p className="card-body">{item.text}</p>
//                 </div>
//                 ))}
//             </div>
//             </div>
//         </div>
//         </section>

//         {/* Testimonials Section ends here */}
      
//       {/* Footer Section */}
//       <footer className="landing-footer">
//         <div className="footer-glow-overlay"></div>
        
//         <div className="footer-top">
//           {/* Brand Column */}
//           <div className="footer-brand-col">
//             <div className="logo">resume<span className="dot">.</span></div>
//             <p className="brand-desc">
//               Elevating career building with industrial-grade AI architecture. Land your dream technical and creative roles flawlessly.
//             </p>
//             <div className="footer-status-pill">
//               <span className="pulse-indicator"></span>
//               All Systems Operational
//             </div>
//           </div>

//           {/* Links Columns */}
//           <div className="footer-links-grid">
//             <div className="links-column">
//               <h4>Product</h4>
//               <a href="#features">AI Resume Builder</a>
//               <a href="#features">Real-Time Analytics</a>
//               <a href="#home">Premium Tiers</a>
//               <a href="#home">System Design Review</a>
//             </div>

//             <div className="links-column">
//               <h4>Resources</h4>
//               <a href="#home">ATS Optimization Guide</a>
//               <a href="#home">Interactive Demo</a>
//               <a href="#home">API Documentation</a>
//               <a href="#home">Tech Blog</a>
//             </div>

//             <div className="links-column">
//               <h4>Company</h4>
//               <a href="#contact">About Us</a>
//               <a href="#contact">Careers</a>
//               <a href="#contact">Security Stack</a>
//               <a href="#contact">Contact Support</a>
//             </div>
//           </div>

          
//         </div>

//         <hr className="footer-divider" />

//         <div className="footer-bottom">
//           <p className="copyright">
//             &copy; {new Date().getFullYear()} resume. All rights reserved. Built with secure end-to-end data pipelines.
//           </p>
//           <div className="footer-legal-links">
//             <a href="#privacy">Privacy Policy</a>
//             <a href="#terms">Terms of Service</a>
//             <a href="#security">GDPR Compliance</a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import '../style/Home.scss';
import AnimatedBackground from '../components/AnimatedBackground';
import { Link, useNavigate } from 'react-router';

const row1Testimonials = [
  { name: 'Jordan Lee', handle: '@jordantalks', text: 'The custom interview plan completely streamlined my preparation process.' },
  { name: 'Avery Johnson', handle: '@averywrites', text: 'Unbelievable accuracy with the AI-powered resumes. Landed three interviews in a week.' },
  { name: 'Briar Martin', handle: '@neilstellar', text: 'The real-time analytics helped me track exactly where my portfolio needs improvement.' },
  { name: 'Aniket Sharma', handle: '@sharma_codes', text: 'Incredible depth on the system design reviews. Highly recommend the premium tier.' },
];

const row2Testimonials = [
  { name: 'Deepak Rawat', handle: '@deepak_rawat', text: 'The distributed system questions matched my tier-1 company rounds perfectly.' },
  { name: 'Sarah Jenkins', handle: '@sarahtech', text: 'Simple, clean, and highly secure. The end-to-end encryption gives peace of mind.' },
  { name: 'Kshitij Jha', handle: '@kj_dev', text: 'Exceptional UX/UI custom options. Building and iterating on variants is flawless.' },
  { name: 'Elena Rostova', handle: '@elena_codes', text: 'The behavioral engine caught cognitive assessment patterns I completely missed.' },
];

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  // PLACEHOLDER AUTH STATE: 
  // Replace this with your actual global auth logic/context (e.g., checking token validity)
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    setIsVisible(true);
    
    // Optional check: read from localStorage if you handle basic login states there
    const token = localStorage.getItem('token'); 
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  // Handler for dynamic redirection based on Auth State
  const handleStartClick = () => {
    if (isLoggedIn) {
      navigate('/generate'); // Redirects straight to generate page if logged in
    } else {
      navigate('/login'); // Redirects to login page if not logged in
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
        <div className="logo">resume<span className="dot">.</span></div>
        <div className="nav-links">
          <a href="#home" onClick={(e) => handleScroll(e, 'home')}>Home</a>
          <a href="#features" onClick={(e) => handleScroll(e, 'features')}>Features</a>
          <a href="#testimonials" onClick={(e) => handleScroll(e, 'testimonials')}>Testimonials</a>
        </div>
        <div className="nav-actions">
          {/* Linked to Auth logic handler */}
          <button className="btn-secondary" onClick={handleStartClick}>Get started</button>
          {!isLoggedIn && (
            <button className="btn-outline" onClick={() => navigate("/Login")}>Login</button>
          )}
        </div>
      </nav>

      {/* Hero Section (Page 2) */}
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
          {/* Linked to Auth logic handler */}
          <button className="btn-primary-green" onClick={handleStartClick}>Get started →</button>
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

      {/* Features Section (Page 3) */}
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
                src="https://images.pexels.com/photos/5439449/pexels-photo-5439449.jpeg" 
                alt="AI Resume Neon-Magnetic Dark Portal Platform" 
              />
            </div>
          </div>
          <div className="features-list">
            <div className="feature-item transition-card">
              <div className="feature-icon">🔑</div>
              <div>
                <h3>Real-Time Analytics</h3>
                <p>Get instant insights into your finances with live dashboards.</p>
              </div>
            </div>
            <div className="feature-item transition-card">
              <div className="feature-icon">📝</div>
              <div>
                <h3>Bank-Grade Security</h3>
                <p>End-to-end encryption, 2FA, compliance with GDPR standards.</p>
              </div>
            </div>
            <div className="feature-item transition-card">
              <div className="feature-icon">📥</div>
              <div>
                <h3>Customizable Reports</h3>
                <p>Export professional, audit-ready financial reports for tax or internal review.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section (Page 4) */}
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