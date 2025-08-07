import React, { useState, useEffect } from 'react';
import AuthModal from '../components/AuthModal';
import AuthPage from './AuthPage';
import './LandingPage.css';

const LandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const [showAuthPage, setShowAuthPage] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Check authentication status on component mount
    const checkAuthStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const email = localStorage.getItem('userEmail');
      setIsLoggedIn(loggedIn);
      setUserEmail(email || '');
    };

    checkAuthStatus();

    // Listen for storage changes (for when user logs in/out in modal)
    const handleStorageChange = () => {
      checkAuthStatus();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check every second for auth changes (for same-tab updates)
    const interval = setInterval(checkAuthStatus, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const openAuthModal = (mode) => {
    // Check if user is already logged in before opening modal
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      // If already logged in, redirect to dashboard
      window.open('../../../freeTrail.html', '_blank');
      return;
    }
    
    setAuthMode(mode);
    setShowAuthPage(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const closeAuthPage = () => {
    setShowAuthPage(false);
  };

  const handleWatchDemo = () => {
    window.open('https://youtu.be/VtQb1X1qHe8?si=3h9p_ZfjFA0e9OCy', '_blank');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUserEmail('');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // If auth page should be shown, render it instead of landing page
  if (showAuthPage) {
    return <AuthPage onClose={closeAuthPage} />;
  }

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="nav-brand">
            <i className="fas fa-map-marker-alt brand-icon"></i>
            <span className="brand-text">GeoSell</span>
          </div>
          <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <li><a href="#features" onClick={() => scrollToSection('features')}>Features</a></li>
            <li><a href="#how-it-works" onClick={() => scrollToSection('how-it-works')}>How It Works</a></li>
            <li><a href="#pricing" onClick={() => scrollToSection('pricing')}>Pricing</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
          <div className="nav-buttons">
            {isLoggedIn ? (
              <>
                <span className="user-welcome">Welcome, {userEmail}</span>
                <button 
                  className="btn btn-primary" 
                  onClick={() => window.open('../../../freeTrail.html', '_blank')}
                >
                  Go to Dashboard
                </button>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-outline" onClick={() => openAuthModal('signin')}>
                  Sign In
                </button>
                <button className="btn btn-primary" onClick={() => openAuthModal('signup')}>
                  Get Started
                </button>
              </>
            )}
          </div>
          <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient"></div>
          <div className="hero-particles"></div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Make <span className="highlight">Smarter</span> Business Decisions with 
                <span className="highlight"> AI-Powered</span> Market Intelligence
              </h1>
              <p className="hero-subtitle">
                Discover what to sell, where to sell it, and why — using real-time market data, 
                competitor analysis, and AI-driven insights tailored to your region.
              </p>
              <div className="hero-buttons">
                {isLoggedIn ? (
                  <>
                    <button 
                      className="btn btn-primary btn-large"
                      onClick={() => window.open('../../../freeTrail.html', '_blank')}
                    >
                      <i className="fas fa-rocket"></i>
                      Go to Dashboard
                    </button>
                    <button 
                      className="btn btn-outline btn-large"
                      onClick={handleWatchDemo}
                    >
                      <i className="fas fa-play"></i>
                      Watch Demo
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="btn btn-primary btn-large"
                      onClick={() => openAuthModal('signup')}
                    >
                      <i className="fas fa-rocket"></i>
                      Start Free Trial
                    </button>
                    <button 
                      className="btn btn-outline btn-large"
                      onClick={handleWatchDemo}
                    >
                      <i className="fas fa-play"></i>
                      Watch Demo
                    </button>
                  </>
                )}
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Businesses</span>
                </div>
                <div className="stat">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Cities</span>
                </div>
                <div className="stat">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="dashboard-preview">
                <div className="preview-header">
                  <div className="preview-dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <div className="preview-title">GeoSell Dashboard</div>
                </div>
                <div className="preview-content">
                  <div className="chart-container">
                    <div className="chart-bars">
                      <div className="bar" style={{height: '60%'}}></div>
                      <div className="bar" style={{height: '80%'}}></div>
                      <div className="bar" style={{height: '45%'}}></div>
                      <div className="bar" style={{height: '90%'}}></div>
                      <div className="bar" style={{height: '65%'}}></div>
                    </div>
                    <div className="chart-pulse"></div>
                  </div>
                  <div className="metrics-grid">
                    <div className="metric-card">
                      <div className="metric-icon">📊</div>
                      <div className="metric-value">73%</div>
                      <div className="metric-label">Demand Score</div>
                    </div>
                    <div className="metric-card">
                      <div className="metric-icon">🎯</div>
                      <div className="metric-value">12</div>
                      <div className="metric-label">Competitors</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2>Powerful Features for Smart Business Decisions</h2>
            <p>Everything you need to analyze markets and make data-driven decisions</p>
          </div>
          <div className="features-grid">
            {[
              {
                icon: 'fas fa-map-marked-alt',
                title: 'Region Intelligence',
                description: 'Visualize demand heatmaps, competitor analysis, and market trends across different regions with interactive maps.',
                highlight: 'Real-time data updates'
              },
              {
                icon: 'fas fa-brain',
                title: 'AI Business Plans',
                description: 'Generate comprehensive business plans with market analysis, risk assessment, and growth strategies using advanced AI.',
                highlight: 'Powered by GPT-4'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Sales Trend Analysis',
                description: 'Track product performance with detailed charts, growth metrics, and predictive analytics for better forecasting.',
                highlight: 'Predictive insights'
              },
              {
                icon: 'fas fa-users',
                title: 'Competitor Insights',
                description: 'Analyze competitor strategies, pricing, and market positioning to stay ahead of the competition.',
                highlight: 'Live monitoring'
              },
              {
                icon: 'fas fa-flask',
                title: 'Scenario Simulator',
                description: 'Test different business scenarios with what-if analysis to minimize risks and maximize opportunities.',
                highlight: 'Risk assessment'
              },
              {
                icon: 'fas fa-bullseye',
                title: 'Marketing Intelligence',
                description: 'Optimize your marketing campaigns with region-specific insights and performance tracking.',
                highlight: 'ROI optimization'
              }
            ].map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div className="feature-highlight">{feature.highlight}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2>How GeoSell Works</h2>
            <p>Simple steps to transform your business intelligence</p>
          </div>
          <div className="steps-container">
            {[
              {
                number: '1',
                title: 'Connect Your Data',
                description: 'Integrate with your existing systems or upload your data to get started instantly.'
              },
              {
                number: '2',
                title: 'Analyze Markets',
                description: 'Our AI analyzes market trends, competitor data, and regional demand patterns.'
              },
              {
                number: '3',
                title: 'Get Insights',
                description: 'Receive actionable recommendations and AI-generated business strategies.'
              },
              {
                number: '4',
                title: 'Make Decisions',
                description: 'Execute data-driven decisions with confidence using our intelligent insights.'
              }
            ].map((step, index) => (
              <div key={index} className="step">
                <div className="step-number">{step.number}</div>
                <div className="step-content">
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-header">
            <h2>Choose Your Plan</h2>
            <p>Flexible pricing for businesses of all sizes</p>
          </div>
          <div className="pricing-grid">
            {[
              {
                name: 'Starter',
                price: '29',
                features: [
                  '5 Region Analysis',
                  'Basic Market Trends',
                  '10 AI Business Plans',
                  'Email Support'
                ],
                buttonText: 'Get Started',
                buttonClass: 'btn-outline'
              },
              {
                name: 'Professional',
                price: '79',
                featured: true,
                badge: 'Most Popular',
                features: [
                  'Unlimited Regions',
                  'Advanced Analytics',
                  'Unlimited AI Plans',
                  'Scenario Simulator',
                  'Priority Support'
                ],
                buttonText: 'Get Started',
                buttonClass: 'btn-primary'
              },
              {
                name: 'Enterprise',
                price: '199',
                features: [
                  'Everything in Pro',
                  'Custom Integrations',
                  'White-label Options',
                  'Dedicated Support',
                  'Custom Training'
                ],
                buttonText: 'Contact Sales',
                buttonClass: 'btn-outline'
              }
            ].map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.featured ? 'featured' : ''}`}>
                {plan.badge && <div className="pricing-badge">{plan.badge}</div>}
                <div className="pricing-header">
                  <h3>{plan.name}</h3>
                  <div className="price">
                    <span className="currency">$</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period">/month</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <i className="fas fa-check"></i> {feature}
                    </li>
                  ))}
                </ul>
                <button 
                  className={`btn ${plan.buttonClass} pricing-btn`}
                  onClick={() => plan.buttonText === 'Contact Sales' ? null : openAuthModal('signup')}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Transform Your Business?</h2>
            <p>Join thousands of entrepreneurs making smarter decisions with GeoSell</p>
            <div className="cta-buttons">
              {isLoggedIn ? (
                <>
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={() => window.open('../../../freeTrail.html', '_blank')}
                  >
                    <i className="fas fa-rocket"></i>
                    Go to Dashboard
                  </button>
                  <button 
                    className="btn btn-outline btn-large"
                    onClick={handleWatchDemo}
                  >
                    <i className="fas fa-play"></i>
                    Watch Demo
                  </button>
                </>
              ) : (
                <>
                  <button 
                    className="btn btn-primary btn-large"
                    onClick={() => openAuthModal('signup')}
                  >
                    <i className="fas fa-rocket"></i>
                    Start Free Trial
                  </button>
                  <button 
                    className="btn btn-outline btn-large"
                    onClick={handleWatchDemo}
                  >
                    <i className="fas fa-play"></i>
                    Watch Demo
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section brand-section">
              <div className="footer-brand">
                <i className="fas fa-map-marker-alt brand-icon"></i>
                <span className="brand-text">GeoSell</span>
              </div>
              <p className="footer-description">
                AI-powered business intelligence for smarter market decisions. 
                Transform your business with data-driven insights.
              </p>
              <div className="social-links">
                <a href="#" className="social-link twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-link linkedin">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="#" className="social-link github">
                  <i className="fab fa-github"></i>
                </a>
                <a href="#" className="social-link instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
              <div className="newsletter">
                <h4>Stay Updated</h4>
                <div className="newsletter-form">
                  <input type="email" placeholder="Enter your email" />
                  <button className="btn btn-primary">
                    <i className="fas fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="footer-section">
              <h4>Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">API Documentation</a></li>
                <li><a href="#">Integrations</a></li>
                <li><a href="#">Mobile App</a></li>
                <li><a href="#">Enterprise</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Press Kit</a></li>
                <li><a href="#">Partners</a></li>
                <li><a href="#">Investors</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Community Forum</a></li>
                <li><a href="#">Live Chat</a></li>
                <li><a href="#">System Status</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
                <li><a href="#">Cookie Policy</a></li>
                <li><a href="#">GDPR</a></li>
                <li><a href="#">Compliance</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <p>&copy; 2025 GeoSell. All rights reserved.</p>
              <div className="footer-badges">
                <span className="badge">SOC 2 Certified</span>
                <span className="badge">ISO 27001</span>
                <span className="badge">GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={closeAuthModal}
        initialMode={authMode}
      />
    </div>
  );
};

export default LandingPage;